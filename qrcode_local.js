/**
 * Générateur de QR Code 100% local (ISO/IEC 18004, Mode Byte UTF-8, ECC M, Versions 1 à 10).
 * Autonome, zéro dépendance réseau, compatible file:// et navigateurs hors-ligne.
 */
(function (global) {
    'use strict';

    // Paramètres ECC Niveau M pour Versions 1 à 10 :
    // [totalCodewords, eccPerBlock, group1Blocks, group1DataCw, group2Blocks, group2DataCw]
    const VERSION_PARAMS_M = {
        1:  [26,  10, 1, 16, 0, 0],
        2:  [44,  16, 1, 28, 0, 0],
        3:  [70,  26, 1, 44, 0, 0],
        4:  [100, 18, 2, 32, 0, 0],
        5:  [134, 24, 2, 43, 0, 0],
        6:  [172, 16, 4, 27, 0, 0],
        7:  [196, 18, 4, 31, 0, 0],
        8:  [242, 22, 2, 38, 2, 39],
        9:  [292, 22, 3, 36, 2, 37],
        10: [346, 26, 4, 43, 1, 44]
    };

    const ALIGNMENT_CENTERS = {
        1: [],
        2: [6, 18],
        3: [6, 22],
        4: [6, 26],
        5: [6, 30],
        6: [6, 34],
        7: [6, 22, 38],
        8: [6, 24, 42],
        9: [6, 26, 46],
        10: [6, 28, 50]
    };

    // Tables GF(256) avec polynôme primitif 0x11d
    const GF_EXP = new Uint8Array(512);
    const GF_LOG = new Uint8Array(256);
    (function initGalois() {
        let x = 1;
        for (let i = 0; i < 255; i++) {
            GF_EXP[i] = x;
            GF_LOG[x] = i;
            x <<= 1;
            if (x & 0x100) x ^= 0x11d;
        }
        for (let i = 255; i < 512; i++) {
            GF_EXP[i] = GF_EXP[i - 255];
        }
    })();

    function gfMul(a, b) {
        if (a === 0 || b === 0) return 0;
        return GF_EXP[GF_LOG[a] + GF_LOG[b]];
    }

    function rsGeneratorPoly(degree) {
        let poly = [1];
        for (let i = 0; i < degree; i++) {
            const next = new Array(poly.length + 1).fill(0);
            const root = GF_EXP[i];
            for (let j = 0; j < poly.length; j++) {
                next[j] ^= poly[j];
                next[j + 1] ^= gfMul(poly[j], root);
            }
            poly = next;
        }
        return poly;
    }

    function rsComputeEcc(data, eccLen) {
        const gen = rsGeneratorPoly(eccLen);
        const rem = new Uint8Array(eccLen);
        for (let i = 0; i < data.length; i++) {
            const factor = data[i] ^ rem[0];
            rem.copyWithin(0, 1);
            rem[eccLen - 1] = 0;
            for (let j = 0; j < eccLen; j++) {
                rem[j] ^= gfMul(gen[j + 1], factor);
            }
        }
        return rem;
    }

    function toUtf8Bytes(str) {
        if (typeof TextEncoder !== 'undefined') {
            return Array.from(new TextEncoder().encode(str));
        }
        const utf8 = unescape(encodeURIComponent(str));
        const bytes = new Array(utf8.length);
        for (let i = 0; i < utf8.length; i++) {
            bytes[i] = utf8.charCodeAt(i);
        }
        return bytes;
    }

    function pickVersion(byteLen) {
        for (let v = 1; v <= 10; v++) {
            const p = VERSION_PARAMS_M[v];
            const totalDataCw = p[2] * p[3] + p[4] * p[5];
            const charCountBits = v <= 9 ? 8 : 16;
            const availableBits = totalDataCw * 8;
            const neededBits = 4 + charCountBits + byteLen * 8;
            if (neededBits <= availableBits) return v;
        }
        throw new Error('Contenu trop long pour le générateur QR local (max ~213 octets).');
    }

    function buildCodewords(bytes, version) {
        const p = VERSION_PARAMS_M[version];
        const [, eccLen, g1Blocks, g1DataCw, g2Blocks, g2DataCw] = p;
        const totalDataCw = g1Blocks * g1DataCw + g2Blocks * g2DataCw;
        const bits = [];

        const pushBits = (val, len) => {
            for (let i = len - 1; i >= 0; i--) {
                bits.push((val >>> i) & 1);
            }
        };

        // Mode Byte (0100) + Longueur + Données
        pushBits(0b0100, 4);
        pushBits(bytes.length, version <= 9 ? 8 : 16);
        for (let i = 0; i < bytes.length; i++) {
            pushBits(bytes[i], 8);
        }

        // Terminateur (jusqu'à 4 bits à 0)
        const maxBits = totalDataCw * 8;
        const termLen = Math.min(4, maxBits - bits.length);
        pushBits(0, termLen);

        // Alignement sur octet
        while (bits.length % 8 !== 0) bits.push(0);

        // Octets de bourrage alternés 0xEC / 0x11
        const padBytes = [0xec, 0x11];
        let padIdx = 0;
        while (bits.length < maxBits) {
            pushBits(padBytes[padIdx % 2], 8);
            padIdx++;
        }

        const dataCw = new Uint8Array(totalDataCw);
        for (let i = 0; i < totalDataCw; i++) {
            let b = 0;
            for (let j = 0; j < 8; j++) {
                b = (b << 1) | bits[i * 8 + j];
            }
            dataCw[i] = b;
        }

        // Découpage en blocs + calcul Reed-Solomon
        const dataBlocks = [];
        const eccBlocks = [];
        let offset = 0;
        for (let i = 0; i < g1Blocks; i++) {
            const slice = dataCw.slice(offset, offset + g1DataCw);
            dataBlocks.push(slice);
            eccBlocks.push(rsComputeEcc(slice, eccLen));
            offset += g1DataCw;
        }
        for (let i = 0; i < g2Blocks; i++) {
            const slice = dataCw.slice(offset, offset + g2DataCw);
            dataBlocks.push(slice);
            eccBlocks.push(rsComputeEcc(slice, eccLen));
            offset += g2DataCw;
        }

        // Entrelacement des blocs de données puis ECC
        const result = [];
        const maxDataLen = Math.max(g1DataCw, g2DataCw);
        for (let i = 0; i < maxDataLen; i++) {
            for (let b = 0; b < dataBlocks.length; b++) {
                if (i < dataBlocks[b].length) result.push(dataBlocks[b][i]);
            }
        }
        for (let i = 0; i < eccLen; i++) {
            for (let b = 0; b < eccBlocks.length; b++) {
                result.push(eccBlocks[b][i]);
            }
        }
        return result;
    }

    function createMatrix(version) {
        const size = 17 + 4 * version;
        const modules = Array.from({ length: size }, () => new Int8Array(size)); // 0/1
        const isFunction = Array.from({ length: size }, () => new Uint8Array(size));

        const setFunc = (r, c, val) => {
            if (r >= 0 && r < size && c >= 0 && c < size) {
                modules[r][c] = val ? 1 : 0;
                isFunction[r][c] = 1;
            }
        };

        const drawFinder = (row, col) => {
            for (let dr = -1; dr <= 7; dr++) {
                for (let dc = -1; dc <= 7; dc++) {
                    const r = row + dr;
                    const c = col + dc;
                    if (r < 0 || r >= size || c < 0 || c >= size) continue;
                    const inOuter = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
                    const onBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6;
                    const inCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
                    setFunc(r, c, inOuter && (onBorder || inCore));
                }
            }
        };

        drawFinder(0, 0);
        drawFinder(0, size - 7);
        drawFinder(size - 7, 0);

        // Motifs d'alignement
        const centers = ALIGNMENT_CENTERS[version];
        for (let i = 0; i < centers.length; i++) {
            for (let j = 0; j < centers.length; j++) {
                const cr = centers[i];
                const cc = centers[j];
                if (isFunction[cr][cc]) continue;
                for (let dr = -2; dr <= 2; dr++) {
                    for (let dc = -2; dc <= 2; dc++) {
                        const isDark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
                        setFunc(cr + dr, cc + dc, isDark);
                    }
                }
            }
        }

        // Motifs de synchronisation (timing)
        for (let i = 8; i < size - 8; i++) {
            const val = i % 2 === 0;
            if (!isFunction[6][i]) setFunc(6, i, val);
            if (!isFunction[i][6]) setFunc(i, 6, val);
        }

        // Module sombre fixe
        setFunc(size - 8, 8, true);

        // Réserver les zones d'information de format
        for (let i = 0; i <= 8; i++) {
            if (i !== 6) {
                if (!isFunction[8][i]) setFunc(8, i, false);
                if (!isFunction[i][8]) setFunc(i, 8, false);
            }
        }
        for (let i = size - 8; i < size; i++) {
            if (!isFunction[8][i]) setFunc(8, i, false);
        }
        for (let i = size - 7; i < size; i++) {
            if (!isFunction[i][8]) setFunc(i, 8, false);
        }

        // Réserver et écrire l'information de version (V >= 7)
        if (version >= 7) {
            let rem = version;
            for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
            const verBits = (version << 12) | rem;
            for (let i = 0; i < 18; i++) {
                const bit = ((verBits >>> i) & 1) === 1;
                const a = size - 11 + (i % 3);
                const b = Math.floor(i / 3);
                setFunc(a, b, bit);
                setFunc(b, a, bit);
            }
        }

        return { size, modules, isFunction };
    }

    function placeCodewords(matrix, codewords) {
        const { size, modules, isFunction } = matrix;
        const bits = [];
        for (let i = 0; i < codewords.length; i++) {
            for (let b = 7; b >= 0; b--) {
                bits.push((codewords[i] >>> b) & 1);
            }
        }

        let bitIdx = 0;
        let upward = true;
        for (let col = size - 1; col >= 1; col -= 2) {
            if (col === 6) col--; // Sauter la colonne de timing verticale
            for (let step = 0; step < size; step++) {
                const r = upward ? size - 1 - step : step;
                for (let dc = 0; dc < 2; dc++) {
                    const c = col - dc;
                    if (!isFunction[r][c]) {
                        modules[r][c] = bitIdx < bits.length ? bits[bitIdx++] : 0;
                    }
                }
            }
            upward = !upward;
        }
    }

    function writeFormatBits(modules, size, mask) {
        // ECC M = 00
        const data = (0b00 << 3) | mask;
        let rem = data;
        for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
        const fmt = ((data << 10) | rem) ^ 0x5412;

        // Copie 1 (autour du repère haut-gauche) : bit 0 (LSB) en haut, bit 14 (MSB) à gauche
        for (let i = 0; i <= 5; i++) modules[i][8] = (fmt >>> i) & 1;
        modules[7][8] = (fmt >>> 6) & 1;
        modules[8][8] = (fmt >>> 7) & 1;
        modules[8][7] = (fmt >>> 8) & 1;
        for (let i = 9; i < 15; i++) modules[8][14 - i] = (fmt >>> i) & 1;

        // Copie 2 (repère haut-droite et bas-gauche)
        for (let i = 0; i < 8; i++) modules[8][size - 1 - i] = (fmt >>> i) & 1;
        for (let i = 8; i < 15; i++) modules[size - 15 + i][8] = (fmt >>> i) & 1;
    }

    function applyMask(modules, isFunction, size, mask) {
        const out = modules.map(row => new Int8Array(row));
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (isFunction[r][c]) continue;
                let invert = false;
                switch (mask) {
                    case 0: invert = (r + c) % 2 === 0; break;
                    case 1: invert = r % 2 === 0; break;
                    case 2: invert = c % 3 === 0; break;
                    case 3: invert = (r + c) % 3 === 0; break;
                    case 4: invert = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; break;
                    case 5: invert = ((r * c) % 2) + ((r * c) % 3) === 0; break;
                    case 6: invert = (((r * c) % 2) + ((r * c) % 3)) % 2 === 0; break;
                    case 7: invert = (((r + c) % 2) + ((r * c) % 3)) % 2 === 0; break;
                }
                if (invert) out[r][c] ^= 1;
            }
        }
        writeFormatBits(out, size, mask);
        return out;
    }

    function computePenalty(modules, size) {
        let penalty = 0;

        // Règle 1 : suites horizontales/verticales de 5+ modules identiques
        for (let r = 0; r < size; r++) {
            let run = 1;
            for (let c = 1; c < size; c++) {
                if (modules[r][c] === modules[r][c - 1]) {
                    run++;
                } else {
                    if (run >= 5) penalty += 3 + (run - 5);
                    run = 1;
                }
            }
            if (run >= 5) penalty += 3 + (run - 5);
        }
        for (let c = 0; c < size; c++) {
            let run = 1;
            for (let r = 1; r < size; r++) {
                if (modules[r][c] === modules[r - 1][c]) {
                    run++;
                } else {
                    if (run >= 5) penalty += 3 + (run - 5);
                    run = 1;
                }
            }
            if (run >= 5) penalty += 3 + (run - 5);
        }

        // Règle 2 : blocs 2x2 identiques
        for (let r = 0; r < size - 1; r++) {
            for (let c = 0; c < size - 1; c++) {
                const v = modules[r][c];
                if (v === modules[r][c + 1] && v === modules[r + 1][c] && v === modules[r + 1][c + 1]) {
                    penalty += 3;
                }
            }
        }

        // Règle 3 : motifs similaires aux repères (1:1:3:1:1 + 4 blancs)
        const checkFinderLike = (arr) => {
            let score = 0;
            for (let i = 0; i <= arr.length - 11; i++) {
                const isPatA = arr[i] && !arr[i + 1] && arr[i + 2] && arr[i + 3] && arr[i + 4] && !arr[i + 5] && arr[i + 6] && !arr[i + 7] && !arr[i + 8] && !arr[i + 9] && !arr[i + 10];
                const isPatB = !arr[i] && !arr[i + 1] && !arr[i + 2] && !arr[i + 3] && arr[i + 4] && !arr[i + 5] && arr[i + 6] && arr[i + 7] && arr[i + 8] && !arr[i + 9] && arr[i + 10];
                if (isPatA || isPatB) score += 40;
            }
            return score;
        };
        for (let r = 0; r < size; r++) penalty += checkFinderLike(modules[r]);
        for (let c = 0; c < size; c++) {
            const colArr = new Int8Array(size);
            for (let r = 0; r < size; r++) colArr[r] = modules[r][c];
            penalty += checkFinderLike(colArr);
        }

        // Règle 4 : équilibre modules sombres / clairs
        let darkCount = 0;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (modules[r][c]) darkCount++;
            }
        }
        const pct = (darkCount * 100) / (size * size);
        const prev5 = Math.abs(Math.floor(pct / 5) * 5 - 50) / 5;
        const next5 = Math.abs(Math.ceil(pct / 5) * 5 - 50) / 5;
        penalty += Math.min(prev5, next5) * 10;

        return penalty;
    }

    function encodeQrMatrix(text) {
        const bytes = toUtf8Bytes(String(text || ''));
        const version = pickVersion(bytes.length);
        const codewords = buildCodewords(bytes, version);
        const matrix = createMatrix(version);
        placeCodewords(matrix, codewords);

        let bestModules = null;
        let bestPenalty = Infinity;
        for (let mask = 0; mask < 8; mask++) {
            const masked = applyMask(matrix.modules, matrix.isFunction, matrix.size, mask);
            const p = computePenalty(masked, matrix.size);
            if (p < bestPenalty) {
                bestPenalty = p;
                bestModules = masked;
            }
        }
        return { size: matrix.size, modules: bestModules, version };
    }

    function generateQrCodeSvg(text, sizePx) {
        const px = sizePx || 180;
        const { size, modules } = encodeQrMatrix(text);
        const quietZone = 3;
        const viewSize = size + quietZone * 2;
        const paths = [];
        for (let r = 0; r < size; r++) {
            let runStart = -1;
            for (let c = 0; c <= size; c++) {
                const isDark = c < size && modules[r][c] === 1;
                if (isDark && runStart === -1) {
                    runStart = c;
                } else if (!isDark && runStart !== -1) {
                    paths.push(`M${runStart + quietZone},${r + quietZone}h${c - runStart}v1h-${c - runStart}z`);
                    runStart = -1;
                }
            }
        }
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewSize} ${viewSize}" width="${px}" height="${px}" shape-rendering="crispEdges"><rect width="${viewSize}" height="${viewSize}" fill="#ffffff"/><path d="${paths.join('')}" fill="#0f172a"/></svg>`;
    }

    function generateQrCodeDataUrl(text, sizePx) {
        const svg = generateQrCodeSvg(text, sizePx);
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }

    global.generateQrCodeSvg = generateQrCodeSvg;
    global.generateQrCodeDataUrl = generateQrCodeDataUrl;
    global.encodeQrMatrix = encodeQrMatrix;
})(typeof window !== 'undefined' ? window : globalThis);
