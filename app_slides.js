// ==========================================
// OUTILS INTERACTIFS DES SLIDES (FORMATION IA)
// ==========================================


TrainingApp.prototype.runTokenSandbox = function() {
        const input = document.getElementById('sandbox-input').value;
        const tokensContainer = document.getElementById('sandbox-tokens');
        
        if (!input) {
            tokensContainer.innerHTML = '<span style="color:var(--text-muted); font-style:italic;">Saisissez du texte ci-dessus pour simuler la découpe...</span>';
            document.getElementById('sandbox-count-gpt').innerText = '0';
            document.getElementById('sandbox-count-gemini').innerText = '0';
            document.getElementById('sandbox-cost-gpt').innerText = '0.000 $';
            document.getElementById('sandbox-cost-gemini').innerText = '0.000 $';
            document.getElementById('sandbox-energy-gpt').innerText = '0.00 kWh';
            document.getElementById('sandbox-energy-gemini').innerText = '0.00 kWh';
            return;
        }
        
        // Simple regex-based visual tokenization simulator for French/English
        const words = input.match(/[a-zA-ZÀ-ÿ\d]+|[\s]+|[^\s\w]/g) || [];
        const tokens = [];
        
        words.forEach(word => {
            if (word.trim().length > 6) {
                const mid = Math.floor(word.length / 2);
                tokens.push(word.substring(0, mid));
                tokens.push(word.substring(mid));
            } else {
                tokens.push(word);
            }
        });
        
        tokensContainer.innerHTML = tokens.map((tok, idx) => {
            const bg = idx % 2 === 0 ? 'rgba(14, 165, 233, 0.12)' : 'rgba(139, 92, 246, 0.12)';
            const border = idx % 2 === 0 ? 'var(--accent-sky)' : 'var(--accent-purple)';
            const color = idx % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)';
            return `<span style="display:inline-block; padding: 2px 6px; margin: 2px; border-radius: 4px; background: ${bg}; border: 1px solid ${border}; color: ${color}; font-family: monospace; font-size: 0.82rem; font-weight:700;">${this.escapeHtml(tok)}</span>`;
        }).join('');
        
        const rawWordCount = input.split(/\s+/).filter(w => w.length > 0).length;
        
        // ChatGPT tokenization overhead (French is less efficient)
        const gptCount = Math.ceil(rawWordCount * 1.35 + (tokens.length - rawWordCount) * 0.5);
        // Gemini tokenization is more multilingually compressed
        const geminiCount = Math.ceil(rawWordCount * 1.1 + (tokens.length - rawWordCount) * 0.4);
        
        document.getElementById('sandbox-count-gpt').innerText = gptCount;
        document.getElementById('sandbox-count-gemini').innerText = geminiCount;
        
        // Cost estimation for 100k queries
        const gptCost = ((gptCount * 100000) / 1000000) * 5.00; // GPT-4o input cost is $5.00/M
        const geminiCost = ((geminiCount * 100000) / 1000000) * 1.25; // Gemini Pro input is $1.25/M
        
        document.getElementById('sandbox-cost-gpt').innerText = gptCost.toFixed(3) + ' $';
        document.getElementById('sandbox-cost-gemini').innerText = geminiCost.toFixed(3) + ' $';
        
        // Energy consumption estimation in kWh for 100k queries
        // OpenAI (standard GPU architectures): ~0.01 Wh per token
        // Gemini (high-density customized TPU clusters): ~0.0025 Wh per token
        const gptEnergy = ((gptCount * 100000) * 0.01) / 1000;
        const geminiEnergy = ((geminiCount * 100000) * 0.0025) / 1000;
        
        document.getElementById('sandbox-energy-gpt').innerText = gptEnergy.toFixed(2) + ' kWh';
        document.getElementById('sandbox-energy-gemini').innerText = geminiEnergy.toFixed(2) + ' kWh';
    }


TrainingApp.prototype.runAnonymizer = function() {
        const input = document.getElementById('anonymizer-input').value;
        const outputArea = document.getElementById('anonymizer-output');
        
        if (!input) {
            outputArea.value = '';
            return;
        }
        
        let text = input;
        
        // 1. Email pattern
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        let emailCount = 0;
        text = text.replace(emailRegex, () => {
            emailCount++;
            return `[ADRESSE_EMAIL_${emailCount}]`;
        });
        
        // 2. Phone pattern (French format)
        const phoneRegex = /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g;
        let phoneCount = 0;
        text = text.replace(phoneRegex, () => {
            phoneCount++;
            return `[TELEPHONE_${phoneCount}]`;
        });
        
        // 3. Names pattern (Salutations check)
        const salutations = /(?:M\.|Mme|Monsieur|Madame)\s+([A-ZÀ-ÖØ-ß][a-zà-öø-ÿ]+)/g;
        let nameCount = 0;
        text = text.replace(salutations, (match) => {
            nameCount++;
            const firstWord = match.split(/\s+/)[0];
            return `${firstWord} [NOM_${nameCount}]`;
        });
        
        // 4. Name pairs (Capitalized Word + Capitalized Word)
        const namePairRegex = /\b([A-ZÀ-ÖØ-ß][a-zà-öø-ÿ]+)\s+([A-ZÀ-ÖØ-ß]{2,}|[A-ZÀ-ÖØ-ß][a-zà-öø-ÿ]+)\b/g;
        text = text.replace(namePairRegex, (match, first) => {
            const blacklist = ["Le", "La", "Les", "Ce", "Cette", "Dans", "Pour", "Mairie", "Conseil", "Commune", "Maire", "État", "Règlement", "France", "Europe", "GitHub", "Supabase"];
            if (blacklist.includes(first)) return match;
            nameCount++;
            return `[PRENOM_${nameCount}] [NOM_${nameCount}]`;
        });

        outputArea.value = text;
    }


TrainingApp.prototype.bindSlideInteractivity = function(slide) {
    // Pipeline SecNumCloud Flow simulation
    if (slide.type === 'pipeline-secnumcloud') {
        const btnFlow = this.slideContainer.querySelector('#btn-demo-secnumcloud-flow');
        if (btnFlow) {
            btnFlow.onclick = () => {
                btnFlow.disabled = true;
                btnFlow.innerText = "Simulation en cours...";
                
                for (let i = 1; i <= 5; i++) {
                    const stepCard = this.slideContainer.querySelector(`#secnum-step-${i}`);
                    if (stepCard) {
                        stepCard.style.borderColor = 'var(--border-color)';
                        stepCard.style.background = 'white';
                        stepCard.style.transform = 'scale(1)';
                    }
                }
                
                let currentStep = 1;
                const interval = setInterval(() => {
                    if (currentStep > 5) {
                        clearInterval(interval);
                        btnFlow.disabled = false;
                        btnFlow.innerText = "🚀 Recommencer la Simulation (5 Étapes)";
                        return;
                    }
                    
                    for (let i = 1; i <= 5; i++) {
                        const stepCard = this.slideContainer.querySelector(`#secnum-step-${i}`);
                        if (stepCard) {
                            if (i === currentStep) {
                                stepCard.style.borderColor = 'var(--accent-purple)';
                                stepCard.style.background = 'rgba(168,85,247,0.08)';
                                stepCard.style.transform = 'scale(1.04)';
                            } else {
                                stepCard.style.borderColor = 'var(--border-color)';
                                stepCard.style.background = 'white';
                                stepCard.style.transform = 'scale(1)';
                            }
                        }
                    }
                    currentStep++;
                }, 900);
            };
        }
    }

    // Pipeline Cost Calculator interaction
    if (slide.type === 'pipeline-cost-calculator') {
        const rangeAgents = this.slideContainer.querySelector('#pipeline-cost-agents-range');
        const rangeReq = this.slideContainer.querySelector('#pipeline-cost-req-range');
        const selectCluster = this.slideContainer.querySelector('#pipeline-cost-cluster-select');

        const valAgents = this.slideContainer.querySelector('#pipeline-cost-agents-val');
        const valReq = this.slideContainer.querySelector('#pipeline-cost-req-val');

        const resSecnum = this.slideContainer.querySelector('#res-cost-secnum-year');
        const resTokens = this.slideContainer.querySelector('#res-cost-tokens-year');
        const resPerAgent = this.slideContainer.querySelector('#res-cost-per-agent');

        const calculateCost = () => {
            if (!rangeAgents || !rangeReq || !selectCluster) return;

            const agents = parseInt(rangeAgents.value, 10);
            const reqs = parseInt(rangeReq.value, 10);
            const cluster = selectCluster.value;

            if (valAgents) valAgents.innerText = `${agents} Agents`;
            if (valReq) valReq.innerText = `${reqs} Requêtes / jour`;

            const banner = this.slideContainer.querySelector('#cluster-desc-banner');
            let secnumCostYear = 18000;
            if (cluster === 'small') {
                secnumCostYear = 2400;
                if (banner) banner.innerHTML = `💡 <strong>Cluster S (Mistral NeMo 12B) :</strong> Serveur 1x RTX 6000 Ada (48GB VRAM). Économique, adapté pour les petites structures (5-50 agents) effectuant du traitement de texte simple.`;
            } else if (cluster === 'med') {
                secnumCostYear = 7200;
                if (banner) banner.innerHTML = `💡 <strong>Cluster M (Mistral Small 3 24B) :</strong> Serveur 1x Nvidia A100 (80GB VRAM). Standard équilibré pour les collectivités moyennes (50-300 agents).`;
            } else if (cluster === 'large') {
                secnumCostYear = 18000;
                if (banner) banner.innerHTML = `💡 <strong>Cluster L Recommandé (Mistral Large 2 123B) :</strong> Cluster dédié 2x H100 (160GB VRAM). Puissance maximale pour analyser des dossiers municipaux volumineux et exécuter la pseudonymisation sémantique sans hallucination.`;
            }

            // Token calculation: 1500 tokens per prompt (in/out avg) * reqs * 220 workdays * agents
            const totalTokensYear = agents * reqs * 220 * 1500;
            // Mixed API cost rate: ~0.000002 € per token (Gemini / Mistral API hybrid)
            const tokenCostYear = Math.round((totalTokensYear / 1000000) * 2.5);

            const totalYear = secnumCostYear + tokenCostYear;
            const costPerAgentMonth = (totalYear / (agents * 12)).toFixed(2);

            if (resSecnum) resSecnum.innerText = `${secnumCostYear.toLocaleString('fr-FR')} € HT`;
            if (resTokens) resTokens.innerText = `${tokenCostYear.toLocaleString('fr-FR')} € HT`;
            if (resPerAgent) resPerAgent.innerText = `${costPerAgentMonth} €`;
        };

        if (rangeAgents) rangeAgents.oninput = calculateCost;
        if (rangeReq) rangeReq.oninput = calculateCost;
        if (selectCluster) selectCluster.onchange = calculateCost;
        
        calculateCost();
    }
    // Post-render bindings
        if (slide.type === 'datacenter-cost') {
            const tabs = this.slideContainer.querySelectorAll('.datacenter-tab-btn');
            const panes = this.slideContainer.querySelectorAll('.datacenter-tab-pane');
            tabs.forEach(tab => {
                tab.onclick = () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    panes.forEach(p => {
                        p.classList.remove('active');
                        p.style.display = 'none';
                    });
                    
                    tab.classList.add('active');
                    const idx = tab.getAttribute('data-idx');
                    const pane = this.slideContainer.querySelector(`#datacenter-pane-${idx}`);
                    if (pane) {
                        pane.classList.add('active');
                        pane.style.display = 'block';
                    }
                };
            });
        }

        if (slide.type === 'dsi-agent-ultime') {
            const btnSimulate = this.slideContainer.querySelector('#btn-simulate-pipeline');
            const colRaw = this.slideContainer.querySelector('#col-folder-raw');
            const colPseudo = this.slideContainer.querySelector('#col-folder-pseudo');
            const colRestored = this.slideContainer.querySelector('#col-folder-restored');
            
            const listRaw = this.slideContainer.querySelector('#list-raw-files');
            const listPseudo = this.slideContainer.querySelector('#list-pseudo-files');
            const listRestored = this.slideContainer.querySelector('#list-restored-files');
            const actionSent = this.slideContainer.querySelector('#action-pseudo-sent');
            
            btnSimulate.onclick = () => {
                btnSimulate.disabled = true;
                btnSimulate.innerText = "Traitement en cours...";
                
                // Step 1: Pseudonymize raw files
                setTimeout(() => {
                    colRaw.classList.remove('active');
                    colPseudo.classList.add('active');
                    listPseudo.innerHTML = `
                        <div class="pipeline-file-item" style="color:var(--accent-sky); font-weight:700;">📄 signalement_henri_dupont.txt (Substitué)</div>
                        <div class="pipeline-file-item" style="color:var(--accent-sky); font-weight:700;">📄 demande_aide_claire_martin.pdf (Substitué)</div>
                    `;
                    actionSent.style.display = 'block';
                    
                    // Step 2: Send to Cloud API
                    setTimeout(() => {
                        actionSent.innerText = "⚡ Traitement IA Gemini...";
                        actionSent.style.background = 'rgba(14, 165, 233, 0.1)';
                        actionSent.style.color = 'var(--accent-sky)';
                        actionSent.style.borderColor = 'rgba(14, 165, 233, 0.3)';
                        
                        // Step 3: De-pseudonymize and restore
                        setTimeout(() => {
                            colPseudo.classList.remove('active');
                            colRestored.classList.add('active');
                            listRestored.innerHTML = `
                                <div class="pipeline-file-item" style="color:#34d399; font-weight:700; border-color:#34d399;">📄 réponse_officielle_dufour.txt</div>
                                <div class="pipeline-file-item" style="color:#34d399; font-weight:700; border-color:#34d399;">📄 projet_decision_aide.pdf</div>
                            `;
                            btnSimulate.innerText = "✔️ Simulation terminée !";
                        }, 1800);
                        
                    }, 1500);
                    
                }, 1200);
            };
        }

        // Post-render bindings
        if (slide.type === 'exercises-dashboard') {
            if (this.role === 'stagiaire') {
                return;
            }
            const catalogList = this.slideContainer.querySelector('#ex-cards-catalog-list');
            const searchInput = this.slideContainer.querySelector('#ex-search-input');
            const counterText = this.slideContainer.querySelector('#ex-counter-text');
            
            let supportVal = 'all';
            let formatVal = 'all';
            let typeVal = 'all';
            let searchVal = '';

            const renderList = () => {
                let filtered = EXERCISES_DATABASE;

                if (supportVal !== 'all') {
                    filtered = filtered.filter(ex => ex.support === supportVal);
                }
                if (formatVal !== 'all') {
                    filtered = filtered.filter(ex => ex.format === formatVal);
                }
                if (typeVal !== 'all') {
                    filtered = filtered.filter(ex => ex.type === typeVal);
                }
                if (searchVal) {
                    const q = searchVal.toLowerCase();
                    filtered = filtered.filter(ex => 
                        ex.title.toLowerCase().includes(q) || 
                        ex.objective.toLowerCase().includes(q) || 
                        ex.instructions.toLowerCase().includes(q)
                    );
                }

                counterText.innerText = `${filtered.length} exercice${filtered.length > 1 ? 's' : ''}`;

                if (filtered.length === 0) {
                    catalogList.innerHTML = `<div style="text-align:center; padding:3rem; color:var(--text-muted); font-style:italic;">Aucun exercice ne correspond à vos filtres...</div>`;
                    return;
                }

                catalogList.innerHTML = filtered.map(ex => {
                    const supportBadge = ex.support === 'pc' ? '🖥️ PC' : '📝 Papier';
                    const formatBadge = ex.format === 'individuel' ? '👤 Individuel' : '👥 Groupe';
                    const typeBadge = ex.type === 'pratique' ? '🛠️ Pratique' : ex.type === 'efficacite' ? '⚡ Efficacité' : '🎲 Jeu';
                    
                    const showLaunchBtn = this.role === 'formateur';
                    
                    return `
                        <div class="ex-card-premium" id="ex-card-${ex.id}">
                            <div class="ex-card-header-row">
                                <h3>${ex.title}</h3>
                                <div class="ex-card-badges-row">
                                    <span class="ex-badge badge-support">${supportBadge}</span>
                                    <span class="ex-badge badge-format">${formatBadge}</span>
                                    <span class="ex-badge badge-type">${typeBadge}</span>
                                    <span class="ex-badge badge-time">⏱️ ${ex.time} min</span>
                                </div>
                            </div>
                            <div class="ex-card-body-content">
                                <p class="ex-obj-text"><strong>Objectif :</strong> ${ex.objective}</p>
                                <div class="ex-instructions-box">
                                    <strong>Énoncé de l'atelier :</strong>
                                    <p>${ex.instructions.replace(/\n/g, '<br>')}</p>
                                </div>
                                <div style="display:flex; gap:0.5rem; margin-top:1rem; flex-wrap:wrap;">
                                    <button class="btn btn-secondary btn-toggle-ex-solution" data-id="${ex.id}">Voir la correction & le cheminement</button>
                                    ${showLaunchBtn ? `<button class="btn btn-primary btn-launch-live-ex" data-id="${ex.id}">🚀 Lancer en Direct</button>` : ''}
                                </div>
                                
                                <div class="ex-solution-box" id="ex-solution-${ex.id}" style="display:none; margin-top:1rem;">
                                    <div class="solution-pane-inner">
                                        <h5 style="color:#166534; font-weight:800; font-size:0.85rem; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.5px;">💡 Solution proposée / Prompt type :</h5>
                                        <pre style="background:white; border:1px solid #dcfce7; padding:0.75rem; border-radius:4px; font-family:monospace; font-size:0.78rem; white-space:pre-wrap; color:#14532d; line-height:1.5; margin-bottom:0.75rem;">${ex.solution}</pre>
                                        
                                        <h5 style="color:var(--accent-blue); font-weight:800; font-size:0.85rem; margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.5px;">🧠 Intérêt & Cheminement pédagogique :</h5>
                                        <p style="font-size:0.8rem; line-height:1.45; color:var(--text-body); margin:0;">${ex.pedagogy}</p>
                                        <p style="font-size:0.76rem; line-height:1.4; color:var(--text-muted); margin-top:0.4rem; border-top:1px solid #e2e8f0; padding-top:0.4rem;"><strong>Raisonnement :</strong> ${ex.reasoning}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                catalogList.querySelectorAll('.btn-toggle-ex-solution').forEach(btn => {
                    btn.onclick = (e) => {
                        const id = e.currentTarget.dataset.id;
                        const box = catalogList.querySelector(`#ex-solution-${id}`);
                        const isShown = box.style.display === 'block';
                        box.style.display = isShown ? 'none' : 'block';
                        e.currentTarget.innerText = isShown ? 'Voir la correction & le cheminement' : 'Masquer la correction';
                    };
                });

                if (this.role === 'formateur') {
                    catalogList.querySelectorAll('.btn-launch-live-ex').forEach(btn => {
                        btn.onclick = async (e) => {
                            const id = parseInt(e.currentTarget.dataset.id, 10);
                            const ex = EXERCISES_DATABASE.find(item => item.id === id);
                            if (ex) {
                                await this.launchLiveExercise(ex);
                            }
                        };
                    });
                }
            };

            const bindFilterGroup = (groupId, callback) => {
                const btns = this.slideContainer.querySelectorAll(`#${groupId} .btn-filter`);
                btns.forEach(btn => {
                    btn.onclick = (e) => {
                        btns.forEach(b => b.classList.remove('active'));
                        e.currentTarget.classList.add('active');
                        callback(e.currentTarget.dataset.val);
                    };
                });
            };

            bindFilterGroup('filter-support', (val) => { supportVal = val; renderList(); });
            bindFilterGroup('filter-format', (val) => { formatVal = val; renderList(); });
            bindFilterGroup('filter-type', (val) => { typeVal = val; renderList(); });

            searchInput.oninput = (e) => {
                searchVal = e.target.value;
                renderList();
            };

            renderList();

            const btnCalc = this.slideContainer.querySelector('#btn-calc-run');
            btnCalc.onclick = () => {
                const humanH = parseFloat(this.slideContainer.querySelector('#calc-human-time').value) || 0;
                const iaH = parseFloat(this.slideContainer.querySelector('#calc-ia-time').value) || 0;
                const rate = parseFloat(this.slideContainer.querySelector('#calc-rate').value) || 0;
                const agents = parseFloat(this.slideContainer.querySelector('#calc-agents').value) || 0;
                const resultsPanel = this.slideContainer.querySelector('#calc-results');
                
                if (humanH <= 0 || rate <= 0 || agents <= 0) return;

                const savedH = Math.max(0, humanH - iaH);
                const economy = savedH * rate * agents;
                const productivityGain = iaH > 0 ? Math.round((savedH / humanH) * 100) : 100;

                this.slideContainer.querySelector('#res-hours').innerText = `${savedH.toFixed(1)} h`;
                this.slideContainer.querySelector('#res-money').innerText = `${economy.toLocaleString()} €`;
                this.slideContainer.querySelector('#res-pct').innerText = `+${productivityGain}%`;
                resultsPanel.style.display = 'block';
            };

            const btnSimHuman = this.slideContainer.querySelector('#btn-sim-human');
            const btnSimIa = this.slideContainer.querySelector('#btn-sim-ia');
            const simInput = this.slideContainer.querySelector('#sim-input-text');
            const simResults = this.slideContainer.querySelector('#sim-results');
            const simOutput = this.slideContainer.querySelector('#sim-output-text');
            const simBadge = this.slideContainer.querySelector('#sim-fidelity-badge');

            btnSimHuman.onclick = () => {
                const val = simInput.value.trim();
                if (!val) return;

                const words = val.split(/\s+/);
                let textResult = val;
                
                if (words.length > 5) {
                    textResult = val
                        .replace(/\d+\s*€/g, "quelques sous")
                        .replace(/\d+\s*h\d*/g, "plus tard")
                        .replace(/l'ordre du jour/gi, "les potins")
                        .replace(/rénovation/gi, "travaux")
                        .replace(/salle des fêtes/gi, "quelque part");
                    
                    const wordsModified = textResult.split(/\s+/);
                    const dropped = wordsModified.filter(() => Math.random() > 0.3);
                    textResult = dropped.join(' ') + "... (Perte d'informations en cours de transmission)";
                } else {
                    textResult = "Euh... je ne me rappelle plus de tout, c'était vers midi.";
                }

                simOutput.innerText = `"${textResult}"`;
                simBadge.innerText = "Fidélité Humaine : ~30% (Perte de données)";
                simBadge.style.background = '#fef2f2';
                simBadge.style.color = 'var(--accent-red)';
                simBadge.style.border = '1px solid rgba(239, 68, 68, 0.2)';
                simResults.style.display = 'block';
            };

            btnSimIa.onclick = () => {
                const val = simInput.value.trim();
                if (!val) return;

                simOutput.innerText = `"${val}"`;
                simBadge.innerText = "Fidélité IA : 100% (Réplication exacte)";
                simBadge.style.background = '#f0fdf4';
                simBadge.style.color = 'var(--accent-green)';
                simBadge.style.border = '1px solid rgba(16, 185, 129, 0.2)';
                simResults.style.display = 'block';
            };
        } else if (slide.type === 'collectivite-couts') {
            const tabs = this.slideContainer.querySelectorAll('.scenario-tab-btn');
            const descBox = this.slideContainer.querySelector('#scenario-desc-text');
            const localInvest = this.slideContainer.querySelector('#local-invest');
            const localFixed = this.slideContainer.querySelector('#local-fixed');
            const localTco = this.slideContainer.querySelector('#local-tco');
            const localBreakdown = this.slideContainer.querySelector('#local-breakdown');
            const localUserCost = this.slideContainer.querySelector('#local-user-cost');
            const localUserCostDesc = this.slideContainer.querySelector('#local-user-cost-desc');
            const cloudInvest = this.slideContainer.querySelector('#cloud-invest');
            const cloudFixed = this.slideContainer.querySelector('#cloud-fixed');
            const cloudTco = this.slideContainer.querySelector('#cloud-tco');
            const cloudBreakdown = this.slideContainer.querySelector('#cloud-breakdown');
            const cloudUserCost = this.slideContainer.querySelector('#cloud-user-cost');
            const cloudUserCostDesc = this.slideContainer.querySelector('#cloud-user-cost-desc');

            tabs.forEach(tab => {
                tab.onclick = (e) => {
                    tabs.forEach(t => t.classList.remove('active'));
                    const btn = e.currentTarget;
                    btn.classList.add('active');
                    
                    const idx = parseInt(btn.dataset.idx, 10);
                    const sc = slide.scenarios[idx];

                    // Smooth transition effect
                    const elementsToFade = [descBox, localInvest, localFixed, localTco, localBreakdown, localUserCost, localUserCostDesc, cloudInvest, cloudFixed, cloudTco, cloudBreakdown, cloudUserCost, cloudUserCostDesc];
                    elementsToFade.forEach(el => {
                        if (el) {
                            el.style.opacity = 0;
                            el.style.transform = 'translateY(2px)';
                            el.style.transition = 'all 0.15s ease';
                        }
                    });

                    setTimeout(() => {
                        if (descBox) descBox.innerText = sc.desc;
                        if (localInvest) localInvest.innerText = sc.local.invest;
                        if (localFixed) localFixed.innerText = sc.local.fixed;
                        if (localTco) localTco.innerText = sc.local.tco3y;
                        if (localBreakdown) localBreakdown.innerText = sc.local.breakdown;
                        if (localUserCost) localUserCost.innerText = sc.local.userCost;
                        if (localUserCostDesc) localUserCostDesc.innerText = sc.local.userCostDesc;
                        if (cloudInvest) cloudInvest.innerText = sc.cloud.invest;
                        if (cloudFixed) cloudFixed.innerText = sc.cloud.fixed;
                        if (cloudTco) cloudTco.innerText = sc.cloud.tco3y;
                        if (cloudBreakdown) cloudBreakdown.innerText = sc.cloud.breakdown;
                        if (cloudUserCost) cloudUserCost.innerText = sc.cloud.userCost;
                        if (cloudUserCostDesc) cloudUserCostDesc.innerText = sc.cloud.userCostDesc;

                        elementsToFade.forEach(el => {
                            if (el) {
                                el.style.opacity = 1;
                                el.style.transform = 'translateY(0)';
                            }
                        });
                    }, 150);
                };
            });
        } else if (slide.type === 'risk-pyramid') {
            const updateTierDetails = (idx) => {
                const panel = this.slideContainer.querySelector('#tier-detail-panel');
                if (panel) {
                    const tier = slide.tiers[idx];
                    panel.innerHTML = `
                        <div class="tier-detail-title" style="color: ${tier.color}">
                            <span>⚠️</span> Niveaux de risques : ${tier.level}
                        </div>
                        <div class="tier-detail-desc">
                            <strong>Exemples administratifs :</strong> ${tier.example}
                        </div>
                    `;
                }
            };
            // Default show first tier details
            updateTierDetails(0);
            
            // Bind pyramid tier clicks
            this.slideContainer.querySelectorAll('.pyramid-tier').forEach(btn => {
                btn.onclick = (e) => {
                    const idx = parseInt(e.target.dataset.idx, 10);
                    updateTierDetails(idx);
                };
            });
        } else if (slide.type === 'exercise-list') {
            // Bind exercise correction toggles
            this.slideContainer.querySelectorAll('.btn-toggle-correction').forEach(btn => {
                btn.onclick = (e) => {
                    const idx = e.target.dataset.idx;
                    const box = this.slideContainer.querySelector(`#correction-${idx}`);
                    const isShown = box.style.display === 'block';
                    box.style.display = isShown ? 'none' : 'block';
                    e.target.innerText = isShown ? 'Voir la correction' : 'Masquer la correction';
                };
            });
        } else if (slide.type === 'token-sandbox') {
            const textarea = this.slideContainer.querySelector('#sandbox-input');
            if (textarea) {
                const run = () => this.runTokenSandbox();
                textarea.oninput = run;
                run();
            }
        } else if (slide.type === 'anonymizer-tool') {
            const btn = this.slideContainer.querySelector('#btn-anonymize-run');
            if (btn) {
                btn.onclick = () => this.runAnonymizer();
            }
        } else if (slide.type === 'eval-stage') {
            const btn = this.slideContainer.querySelector('.btn-toggle-correction');
            if (btn) {
                btn.onclick = (e) => {
                    const box = this.slideContainer.querySelector('.exercise-correction-box');
                    const isShown = box.style.display === 'block';
                    box.style.display = isShown ? 'none' : 'block';
                    e.target.innerText = isShown ? 'Voir la correction officielle & la grille de notation' : 'Masquer la correction & la grille';
                };
            }
        }

        // Bind VRAM Calculator
        if (slide.type === 'vram-calculator') {
            const selectModel = this.slideContainer.querySelector('#vram-select-model');
            const selectQuant = this.slideContainer.querySelector('#vram-select-quant');
            const sliderContext = this.slideContainer.querySelector('#vram-slider-context');
            const sliderUsers = this.slideContainer.querySelector('#vram-slider-users');
            
            [selectModel, selectQuant, sliderContext, sliderUsers].forEach(el => {
                if (el) el.oninput = () => this.runVramCalculator();
            });
            this.runVramCalculator();
        }

        // Bind Eco Calculator
        if (slide.type === 'eco-calculator') {
            const sliderAgents = this.slideContainer.querySelector('#eco-slider-agents');
            const sliderReqs = this.slideContainer.querySelector('#eco-slider-reqs');
            const toggleBtns = this.slideContainer.querySelectorAll('.eco-model-toggle');

            if (sliderAgents) sliderAgents.oninput = () => this.runEcoCalculator();
            if (sliderReqs) sliderReqs.oninput = () => this.runEcoCalculator();

            toggleBtns.forEach(btn => {
                btn.onclick = () => {
                    toggleBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.runEcoCalculator();
                };
            });
            this.runEcoCalculator();
        }

        // Bind Hallucination Detector
        if (slide.type === 'hallucination') {
            const scBtns = this.slideContainer.querySelectorAll('.btn-sc-select');
            const textInput = this.slideContainer.querySelector('#hallu-input-text');
            const btnAnalyze = this.slideContainer.querySelector('#btn-analyze-hallu');

            if (scBtns.length > 0 && slide.scenarios) {
                scBtns.forEach(btn => {
                    btn.onclick = () => {
                        scBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const idx = parseInt(btn.dataset.idx, 10);
                        if (textInput && slide.scenarios[idx]) {
                            textInput.value = slide.scenarios[idx].text;
                            this.runHallucinationDetector(slide);
                        }
                    };
                });
                // Initialize with scenario 0 text
                if (textInput && slide.scenarios[0]) {
                    textInput.value = slide.scenarios[0].text;
                    this.runHallucinationDetector(slide);
                }
            }

            if (btnAnalyze) {
                btnAnalyze.onclick = () => this.runHallucinationDetector(slide);
            }
        }

        // Bind Multimodal Demo
        if (slide.type === 'multimodal-demo') {
            const tabs = this.slideContainer.querySelectorAll('.btn-mm-tab');
            const panes = this.slideContainer.querySelectorAll('.mm-case-pane');
            const simBtns = this.slideContainer.querySelectorAll('.btn-run-mm-sim');

            tabs.forEach(tab => {
                tab.onclick = () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    panes.forEach(p => {
                        p.classList.remove('active');
                        p.style.display = 'none';
                    });
                    tab.classList.add('active');
                    const idx = tab.dataset.idx;
                    const pane = this.slideContainer.querySelector(`#mm-pane-${idx}`);
                    if (pane) {
                        pane.classList.add('active');
                        pane.style.display = 'block';
                    }
                };
            });

            simBtns.forEach(btn => {
                btn.onclick = (e) => {
                    const idx = e.currentTarget.dataset.idx;
                    const resDiv = this.slideContainer.querySelector(`#mm-sim-results-${idx}`);
                    if (resDiv) {
                        const originalText = e.currentTarget.innerText;
                        e.currentTarget.innerText = "⏳ Traitement par l'Agent IA...";
                        e.currentTarget.disabled = true;
                        
                        setTimeout(() => {
                            e.currentTarget.innerText = "✔️ Analyse terminée !";
                            e.currentTarget.style.background = "#10b981";
                            e.currentTarget.style.borderColor = "#10b981";
                            setTimeout(() => {
                                e.currentTarget.innerText = originalText;
                                e.currentTarget.style.background = "";
                                e.currentTarget.style.borderColor = "";
                                e.currentTarget.disabled = false;
                            }, 2000);
                        }, 800);
                    }
                };
            });
        }

        // Bind Model Arbitrage Matrix
        if (slide.type === 'model-arbitrage') {
            const ucBtns = this.slideContainer.querySelectorAll('.btn-arb-uc');
            const cards = this.slideContainer.querySelectorAll('.model-mat-card');

            ucBtns.forEach(btn => {
                btn.onclick = () => {
                    ucBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const uc = btn.dataset.uc;

                    cards.forEach(card => {
                        if (uc === 'all') {
                            card.style.display = 'block';
                        } else if (uc === 'delib') {
                            const name = card.dataset.model;
                            card.style.display = (name.includes('Large') || name.includes('Claude') || name.includes('DeepSeek') || name.includes('GPT')) ? 'block' : 'none';
                        } else if (uc === 'mail') {
                            const name = card.dataset.model;
                            card.style.display = (name.includes('Small') || name.includes('70B') || name.includes('9B')) ? 'block' : 'none';
                        } else if (uc === 'dsi') {
                            const name = card.dataset.model;
                            card.style.display = (name.includes('DeepSeek') || name.includes('Claude') || name.includes('GPT') || name.includes('72B')) ? 'block' : 'none';
                        } else if (uc === 'incident') {
                            const name = card.dataset.model;
                            card.style.display = (name.includes('Small') || name.includes('70B') || name.includes('GLM')) ? 'block' : 'none';
                        }
                    });
                };
            });
        }

        // Bind poll opening from slides
        const btnOpenPoll = this.slideContainer.querySelector('.btn-open-poll-from-slide');
        if (btnOpenPoll) {
            btnOpenPoll.onclick = () => {
                const pollId = btnOpenPoll.dataset.pollId;
                const poll = INTERACTIVE_QUESTIONS.find(q => q.id === pollId);
                if (poll) {
                    if (this.role === 'formateur') {
                        this.startPoll(poll);
                    } else if (this.role === 'stagiaire') {
                        this.showStagiairePollPanel(poll, this.revealState);
                    } else {
                        this.showPublicPollPanel(poll, this.revealState);
                    }
                    const panel = document.getElementById('interactivity-panel');
                    if (panel) panel.classList.add('open');
                }
            };
        }

        // Always bind copy buttons if they exist
        this.bindCopyButtons();

        // Bind formateur slide-level buttons
        if (this.role === 'formateur') {
            const theme = THEMES[this.currentThemeIndex];
            const poll = INTERACTIVE_QUESTIONS.find(q => q.themeId === theme.id);
            
            const btnSlidePoll = this.slideContainer.querySelector('#btn-slide-launch-poll');
            if (btnSlidePoll && poll) {
                btnSlidePoll.onclick = () => {
                    this.startPoll(poll);
                    document.getElementById('interactivity-panel').classList.add('open');
                };
            }
            
            const btnSlideTest = this.slideContainer.querySelector('#btn-slide-launch-test');
            if (btnSlideTest) {
                btnSlideTest.onclick = () => {
                    this.startGeneralTest(this.currentThemeIndex);
                    document.getElementById('interactivity-panel').classList.add('open');
                };
            }
            
            const btnSlideFree = this.slideContainer.querySelector('#btn-slide-launch-free-test');
            if (btnSlideFree) {
                btnSlideFree.onclick = () => {
                    this.startFreeTest();
                    document.getElementById('interactivity-panel').classList.add('open');
                };
            }
        }
};

// ==========================================
// OUTILS INTERACTIFS (VRAM, ECO, HALLUCINATIONS)
// ==========================================

TrainingApp.prototype.runVramCalculator = function() {
    const modelParams = parseFloat(document.getElementById('vram-select-model')?.value || 12);
    const quantBits = parseInt(document.getElementById('vram-select-quant')?.value || 4, 10);
    const contextK = parseInt(document.getElementById('vram-slider-context')?.value || 8, 10);
    const users = parseInt(document.getElementById('vram-slider-users')?.value || 15, 10);

    const contextValEl = document.getElementById('vram-val-context');
    const usersValEl = document.getElementById('vram-val-users');
    if (contextValEl) contextValEl.innerText = contextK + 'k tokens';
    if (usersValEl) usersValEl.innerText = users + ' agents';

    // Weights VRAM (GB) = (Params in B * bits) / 8
    const weightsGb = (modelParams * quantBits) / 8;
    // KV Cache VRAM (GB) = users * (contextK) * 0.5
    const cacheGb = users * contextK * 0.5;
    const totalVram = weightsGb + cacheGb;

    const cost = totalVram * 450;

    let hw = '1x Mac Studio M3 Ultra (64 GB)';
    if (totalVram <= 24) {
        hw = '1x Nvidia RTX 4090 (24 Go VRAM)';
    } else if (totalVram <= 48) {
        hw = '1x Nvidia RTX A6000 Ada (48 Go VRAM)';
    } else if (totalVram <= 96) {
        hw = '2x Nvidia RTX 6000 Ada (96 Go VRAM)';
    } else if (totalVram <= 192) {
        hw = '4x Nvidia L40S (192 Go VRAM total)';
    } else {
        hw = 'Cluster 8x Nvidia H100 SXM (640 Go VRAM total)';
    }

    const outTotal = document.getElementById('vram-out-total');
    const outBreakdown = document.getElementById('vram-out-breakdown');
    const outCost = document.getElementById('vram-out-cost');
    const outHw = document.getElementById('vram-out-hardware');

    if (outTotal) outTotal.innerText = totalVram.toFixed(1) + ' Go VRAM';
    if (outBreakdown) outBreakdown.innerText = `Poids: ${weightsGb.toFixed(1)} Go | Cache KV: ${cacheGb.toFixed(1)} Go`;
    if (outCost) outCost.innerText = Math.round(cost).toLocaleString('fr-FR') + ' € HT';
    if (outHw) outHw.innerText = hw;
};

TrainingApp.prototype.runEcoCalculator = function() {
    const agents = parseInt(document.getElementById('eco-slider-agents')?.value || 50, 10);
    const reqsPerDay = parseInt(document.getElementById('eco-slider-reqs')?.value || 15, 10);
    const activeToggle = document.querySelector('.eco-model-toggle.active');
    const isHeavy = activeToggle?.dataset.model === 'heavy';

    const agentsValEl = document.getElementById('eco-val-agents');
    const reqsValEl = document.getElementById('eco-val-reqs');
    if (agentsValEl) agentsValEl.innerText = agents + ' agents';
    if (reqsValEl) reqsValEl.innerText = reqsPerDay + ' req/jour';

    const annualReqs = agents * reqsPerDay * 220;

    const waterPerReq = isHeavy ? 0.25 : 0.05;
    const co2PerReq = isHeavy ? 9.0 : 1.8;
    const kwhPerReq = isHeavy ? 0.015 : 0.003;

    const totalWater = annualReqs * waterPerReq;
    const totalBottles = Math.round(totalWater / 0.5);
    const totalCo2Kg = (annualReqs * co2PerReq) / 1000;
    const totalKmElectric = Math.round(totalCo2Kg * 7.6);
    const totalKwh = annualReqs * kwhPerReq;
    const totalCharges = Math.round(totalKwh / 0.012);

    const outWater = document.getElementById('eco-out-water');
    const outBottles = document.getElementById('eco-out-bottles');
    const outCo2 = document.getElementById('eco-out-co2');
    const outKm = document.getElementById('eco-out-km');
    const outKwh = document.getElementById('eco-out-kwh');
    const outCharges = document.getElementById('eco-out-charges');

    if (outWater) outWater.innerText = Math.round(totalWater).toLocaleString('fr-FR') + ' L';
    if (outBottles) outBottles.innerText = `~${totalBottles.toLocaleString('fr-FR')} bouteilles de 50cl`;
    if (outCo2) outCo2.innerText = totalCo2Kg.toFixed(1).toLocaleString('fr-FR') + ' kg CO₂';
    if (outKm) outKm.innerText = `~${totalKmElectric.toLocaleString('fr-FR')} km en voiture élec.`;
    if (outKwh) outKwh.innerText = totalKwh.toFixed(1).toLocaleString('fr-FR') + ' kWh';
    if (outCharges) outCharges.innerText = `Soit ~${totalCharges.toLocaleString('fr-FR')} recharges de smartphone`;
};

TrainingApp.prototype.runHallucinationDetector = function(slide) {
    const textInput = document.getElementById('hallu-input-text');
    const outputDiv = document.getElementById('hallu-output-results');
    if (!textInput || !outputDiv) return;

    let text = textInput.value;
    if (!text.trim()) {
        outputDiv.innerHTML = '<span style="color:var(--text-muted); font-style:italic;">Saisissez du texte ci-dessus puis cliquez sur "Analyser le texte"...</span>';
        return;
    }

    let htmlResult = this.escapeHtml(text);

    const activeScBtn = document.querySelector('.btn-sc-select.active');
    const scIdx = parseInt(activeScBtn?.dataset.idx || 0, 10);
    const activeSc = slide && slide.scenarios ? slide.scenarios[scIdx] : null;

    if (activeSc && activeSc.highlights) {
        activeSc.highlights.forEach(h => {
            const escapedMatch = this.escapeHtml(h.match);
            const badgeColor = h.type === 'red' ? '#ef4444' : h.type === 'orange' ? '#f97316' : '#0284c7';
            const bg = h.type === 'red' ? 'rgba(239, 68, 68, 0.2)' : h.type === 'orange' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(2, 132, 199, 0.2)';
            
            const replacement = `<mark style="background:${bg}; border-bottom:2px solid ${badgeColor}; color:#f8fafc; padding:2px 6px; border-radius:4px; cursor:help; font-weight:700;" title="${h.label} : ${h.desc}">
                ${escapedMatch} <sup style="color:${badgeColor}; font-size:0.75rem;">[${h.label}]</sup>
            </mark>`;
            
            htmlResult = htmlResult.replace(escapedMatch, replacement);
        });
    }

    outputDiv.innerHTML = `<div style="line-height:1.8;">${htmlResult}</div>`;
};