/**
 * Formation IA Territoriale - Application Logic
 * Navigation & Visual Rendering Engine (30 Slides + Tools & Sandbox Version)
 */

class TrainingApp {
    constructor() {
        this.currentThemeIndex = -1; // -1 represents the Home Screen
        this.currentSlideIndex = 0;
        
        this.initElements();
        this.initEvents();
        this.renderSidebar();
        this.renderHomeDashboard();
        this.showScreen('home');
    }

    initElements() {
        // Screens
        this.homeScreen = document.getElementById('home-screen');
        this.presentationScreen = document.getElementById('presentation-screen');
        
        // Navigation & Layout
        this.sidebarThemesList = document.getElementById('sidebar-themes-list');
        this.themesGrid = document.getElementById('themes-grid');
        this.slideContainer = document.getElementById('slide-container');
        
        this.btnHome = document.getElementById('btn-home');
        this.logoHome = document.getElementById('logo-home');
        
        this.btnPrev = document.getElementById('nav-prev');
        this.btnNext = document.getElementById('nav-next');
        this.progressFill = document.getElementById('progress-fill');
        this.slideIndicator = document.getElementById('slide-indicator');
    }

    initEvents() {
        // Home navigation
        const goHome = () => {
            this.currentThemeIndex = -1;
            this.currentSlideIndex = 0;
            this.showScreen('home');
        };
        this.btnHome.addEventListener('click', goHome);
        this.logoHome.addEventListener('click', goHome);

        // Previous/Next slide
        this.btnPrev.addEventListener('click', () => this.navigate(-1));
        this.btnNext.addEventListener('click', () => this.navigate(1));

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.navigate(-1);
            } else if (e.key === 'ArrowRight') {
                this.navigate(1);
            } else if (e.key === 'Escape') {
                goHome();
            }
        });
    }

    showScreen(screenName) {
        if (screenName === 'home') {
            this.presentationScreen.classList.remove('active');
            this.homeScreen.classList.add('active');
            this.btnHome.classList.add('active');
            this.deactivateSidebarLinks();
            this.closeAllAccordions();
            this.updateProgressIndicator();
        } else {
            this.homeScreen.classList.remove('active');
            this.presentationScreen.classList.add('active');
            this.btnHome.classList.remove('active');
        }
    }

    deactivateSidebarLinks() {
        document.querySelectorAll('.slide-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelectorAll('.accordion-theme-item').forEach(item => {
            item.classList.remove('active-theme');
        });
    }

    closeAllAccordions() {
        document.querySelectorAll('.accordion-theme-item').forEach(item => {
            item.classList.remove('expanded');
        });
    }

    renderSidebar() {
        this.sidebarThemesList.innerHTML = '';
        THEMES.forEach((theme, themeIdx) => {
            const themeItem = document.createElement('div');
            themeItem.className = 'accordion-theme-item';
            themeItem.id = `sidebar-theme-${themeIdx}`;

            // Create Header
            const header = document.createElement('button');
            header.className = 'accordion-header';
            header.innerHTML = `
                <div class="accordion-header-left">
                    <span class="icon">${theme.icon}</span>
                    <span class="title-text">${theme.title}</span>
                </div>
                <span class="accordion-chevron">▶</span>
            `;

            // Clicking header opens/collapses accordion and selects first slide
            header.addEventListener('click', () => {
                const isExpanded = themeItem.classList.contains('expanded');
                this.closeAllAccordions();
                if (!isExpanded) {
                    themeItem.classList.add('expanded');
                }
                this.selectSlide(themeIdx, 0);
            });

            // Create Slides List (Accordion Content)
            const list = document.createElement('ul');
            list.className = 'accordion-slides-list';

            theme.slides.forEach((slide, slideIdx) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'slide-nav-link';
                a.innerText = slide.title;
                a.id = `sidebar-link-${themeIdx}-${slideIdx}`;
                a.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectSlide(themeIdx, slideIdx);
                });
                li.appendChild(a);
                list.appendChild(li);
            });

            themeItem.appendChild(header);
            themeItem.appendChild(list);
            this.sidebarThemesList.appendChild(themeItem);
        });
    }

    renderHomeDashboard() {
        this.themesGrid.innerHTML = '';
        THEMES.forEach((theme, themeIdx) => {
            const card = document.createElement('div');
            card.className = `theme-card cat-${theme.category}`;
            
            const categoryLabels = {
                'hist': 'Histoire & Origines',
                'tech': 'Technique & Fonctionnement',
                'prompt': 'Méthode & Pratique',
                'reg': 'Régulation & Sécurité',
                'agent': 'Futur & Autonomie'
            };
            const catLabel = categoryLabels[theme.category] || 'Général';

            card.innerHTML = `
                <div>
                    <div class="theme-card-header">
                        <span class="theme-card-icon">${theme.icon}</span>
                        <span class="theme-card-tag">${catLabel}</span>
                    </div>
                    <h3 class="theme-card-title">${theme.title}</h3>
                    <p class="theme-card-desc">${theme.desc}</p>
                </div>
                <div class="theme-card-footer">
                    <span>Commencer le module</span>
                    <span>→</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                const themeItem = document.getElementById(`sidebar-theme-${themeIdx}`);
                this.closeAllAccordions();
                if (themeItem) {
                    themeItem.classList.add('expanded');
                }
                this.selectSlide(themeIdx, 0);
            });

            this.themesGrid.appendChild(card);
        });
    }

    selectSlide(themeIdx, slideIdx) {
        this.currentThemeIndex = themeIdx;
        this.currentSlideIndex = slideIdx;
        
        this.showScreen('presentation');
        this.updateSidebarActiveState();
        this.renderSlide();
        this.updateProgressIndicator();
    }

    updateSidebarActiveState() {
        this.deactivateSidebarLinks();
        
        // Highlight active theme container
        const themeItem = document.getElementById(`sidebar-theme-${this.currentThemeIndex}`);
        if (themeItem) {
            themeItem.classList.add('active-theme');
            themeItem.classList.add('expanded');
        }

        // Highlight active slide link
        const link = document.getElementById(`sidebar-link-${this.currentThemeIndex}-${this.currentSlideIndex}`);
        if (link) {
            link.classList.add('active');
        }
    }

    navigate(direction) {
        if (this.currentThemeIndex === -1) {
            // If on home, clicking next goes to first slide of first theme
            if (direction === 1) {
                const themeItem = document.getElementById('sidebar-theme-0');
                if (themeItem) themeItem.classList.add('expanded');
                this.selectSlide(0, 0);
            }
            return;
        }

        const theme = THEMES[this.currentThemeIndex];
        let newSlideIndex = this.currentSlideIndex + direction;

        if (newSlideIndex >= 0 && newSlideIndex < theme.slides.length) {
            // Navigate within the same theme
            this.selectSlide(this.currentThemeIndex, newSlideIndex);
        } else if (newSlideIndex < 0) {
            // Go to previous theme
            if (this.currentThemeIndex > 0) {
                const prevThemeIdx = this.currentThemeIndex - 1;
                const prevThemeLastSlideIdx = THEMES[prevThemeIdx].slides.length - 1;
                this.selectSlide(prevThemeIdx, prevThemeLastSlideIdx);
            } else {
                // Go back to home screen
                this.currentThemeIndex = -1;
                this.currentSlideIndex = 0;
                this.showScreen('home');
            }
        } else if (newSlideIndex >= theme.slides.length) {
            // Go to next theme
            if (this.currentThemeIndex < THEMES.length - 1) {
                this.selectSlide(this.currentThemeIndex + 1, 0);
            } else {
                // End of course, go back to home dashboard
                this.currentThemeIndex = -1;
                this.currentSlideIndex = 0;
                this.showScreen('home');
            }
        }
    }

    updateProgressIndicator() {
        let totalSlides = 0;
        let absoluteIndex = 0;

        THEMES.forEach((theme, idx) => {
            if (idx < this.currentThemeIndex) {
                absoluteIndex += theme.slides.length;
            }
            totalSlides += theme.slides.length;
        });

        if (this.currentThemeIndex !== -1) {
            absoluteIndex += this.currentSlideIndex;
        }

        const percent = this.currentThemeIndex === -1 ? 0 : ((absoluteIndex + 1) / totalSlides) * 100;
        this.progressFill.style.width = `${percent}%`;

        if (this.currentThemeIndex === -1) {
            this.slideIndicator.innerText = '';
            this.btnPrev.style.opacity = '0.2';
            this.btnPrev.style.pointerEvents = 'none';
        } else {
            const theme = THEMES[this.currentThemeIndex];
            this.slideIndicator.innerText = `Thème ${this.currentThemeIndex + 1}/${THEMES.length} • Slide ${this.currentSlideIndex + 1}/${theme.slides.length}`;
            this.btnPrev.style.opacity = '1';
            this.btnPrev.style.pointerEvents = 'all';
        }
    }

    escapeHtml(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    bindCopyButtons() {
        this.slideContainer.querySelectorAll('.btn-copy-code').forEach(copyBtn => {
            copyBtn.onclick = (e) => {
                const box = copyBtn.closest('.gabarit-box');
                const codeElement = box.querySelector('pre code');
                const textareaElement = box.querySelector('textarea');
                const textToCopy = codeElement ? codeElement.innerText : (textareaElement ? textareaElement.value : '');
                
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const oldText = e.target.innerText;
                        e.target.innerText = "Copié !";
                        e.target.style.background = "#dcfce7";
                        setTimeout(() => {
                            e.target.innerText = oldText;
                            e.target.style.background = "";
                        }, 2000);
                    });
                }
            };
        });
    }

    runTokenSandbox() {
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

    runAnonymizer() {
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

    renderSlide() {
        if (this.currentThemeIndex === -1) return;

        const theme = THEMES[this.currentThemeIndex];
        const slide = theme.slides[this.currentSlideIndex];

        // Core HTML card structure
        let html = `
            <div class="slide">
                <div class="theme-tag">${theme.title}</div>
                <h2>${slide.title}</h2>
                <div class="slide-content">
        `;

        // Render based on slide type
        if (slide.type === 'timeline') {
            html += `<div class="timeline-vertical">`;
            slide.events.forEach(event => {
                html += `
                    <div class="timeline-step">
                        <div class="timeline-marker"></div>
                        <div class="timeline-body">
                            <div class="timeline-year">${event.year}</div>
                            <div class="timeline-info">
                                <h4>${event.title}</h4>
                                <p>${event.desc}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        } else if (slide.type === 'comparison-cards') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.intro}</p>
                <div class="comparison-cards-container">
                    <div class="comp-card" style="border-top: 4px solid var(--accent-blue)">
                        <h3>${slide.cardLeft.title}</h3>
                        <div class="comp-card-sub">${slide.cardLeft.subtitle}</div>
                        <p class="comp-card-desc">${slide.cardLeft.desc}</p>
                        <div class="comp-card-formula">${slide.cardLeft.formula}</div>
                        <div class="comp-card-pro"><strong>Avantage :</strong> ${slide.cardLeft.advantage}</div>
                        <div class="comp-card-con"><strong>Inconvénient :</strong> ${slide.cardLeft.drawback}</div>
                    </div>
                    <div class="comp-card" style="border-top: 4px solid var(--accent-purple)">
                        <h3>${slide.cardRight.title}</h3>
                        <div class="comp-card-sub">${slide.cardRight.subtitle}</div>
                        <p class="comp-card-desc">${slide.cardRight.desc}</p>
                        <div class="comp-card-formula">${slide.cardRight.formula}</div>
                        <div class="comp-card-pro"><strong>Avantage :</strong> ${slide.cardRight.advantage}</div>
                        <div class="comp-card-con"><strong>Inconvénient :</strong> ${slide.cardRight.drawback}</div>
                    </div>
                </div>
            `;
        } else if (slide.type === 'bar-chart') {
            html += `
                <p>${slide.desc}</p>
                <div class="bar-chart-container">
            `;
            slide.data.forEach(item => {
                const widthPercent = (item.value / 900) * 100;
                html += `
                    <div class="bar-chart-row">
                        <div class="bar-chart-label">${item.label}</div>
                        <div class="bar-chart-track">
                            <div class="bar-chart-bar" style="width: ${widthPercent}%; background: ${item.color};"></div>
                        </div>
                        <div class="bar-chart-value-label">${item.value} mois</div>
                    </div>
                `;
            });
            html += `
                </div>
                <div class="maire-example-box" style="border-left-color: var(--accent-sky)">
                    ${slide.implication}
                </div>
            `;
        } else if (slide.type === 'schema-steps') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.intro}</p>
                <div class="schema-steps-container">
            `;
            slide.steps.forEach(step => {
                html += `
                    <div class="schema-step-item">
                        <div class="schema-step-bubble">${step.num}</div>
                        <div class="schema-step-details">
                            <h4>${step.title}</h4>
                            <p>${step.desc}</p>
                            <div class="schema-step-box">
                                <code>${step.content}</code>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += `
                </div>
                <div class="maire-example-box" style="border-left-color: var(--accent-red); margin-top:1.5rem;">
                    ${slide.warning}
                </div>
            `;
        } else if (slide.type === 'semantic-map') {
            html += `
                <p>${slide.desc}</p>
                <div class="semantic-map-container">
                    <div class="semantic-axis-x">${slide.grid.xLabel}</div>
                    <div class="semantic-axis-y">${slide.grid.yLabel}</div>
            `;
            slide.grid.points.forEach(pt => {
                html += `
                    <div class="semantic-node node-group-${pt.group}" style="left: ${pt.x}%; top: ${100 - pt.y}%;">
                        ${pt.name}
                    </div>
                `;
            });
            html += `
                </div>
                <div class="maire-example-box">
                    ${slide.mathExplanation}
                </div>
            `;
        } else if (slide.type === 'probability-cascade') {
            html += `
                <p>${slide.desc}</p>
                <div class="maire-example-box" style="margin-bottom:1.5rem;">
                    <strong>Phrase en cours de génération :</strong><br>
                    <span style="font-family:monospace; color:var(--accent-blue); font-size:1.05rem;">"${slide.inputPhrase}"</span>
                </div>
                <div class="cascade-container">
            `;
            slide.options.forEach(opt => {
                html += `
                    <div class="cascade-item">
                        <div class="cascade-word">${opt.word}</div>
                        <div class="cascade-track">
                            <div class="cascade-bar" style="width: ${opt.prob}%; background: ${opt.color};"></div>
                        </div>
                        <div class="cascade-prob">${opt.prob}%</div>
                        <div class="cascade-status status-${opt.status}">${opt.status === 'chosen' ? 'Choisi' : opt.status === 'possible' ? 'Possible' : 'Improbable'}</div>
                    </div>
                `;
            });
            html += `
                </div>
                <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">${slide.explanation}</p>
            `;
        } else if (slide.type === 'analogy') {
            html += `
                <div class="prompt-analogy-container">
                    <div class="analogy-pane analogy-pane-human">
                        <div class="analogy-pane-title">👩‍💼 Contexte de l'Homme</div>
                        <div class="analogy-content">
                            <div class="analogy-block creator">
                                <h4>Contexte Créateur</h4>
                                <p><strong>${slide.humanCreator.title} :</strong> ${slide.humanCreator.desc}</p>
                            </div>
                            <div class="analogy-block situation">
                                <h4>Contexte de Situation</h4>
                                <p><strong>${slide.humanSituation.title} :</strong> ${slide.humanSituation.desc}</p>
                            </div>
                        </div>
                    </div>
                    <div class="analogy-pane analogy-pane-ia">
                        <div class="analogy-pane-title">🤖 Contexte de l'IA (Prompt)</div>
                        <div class="analogy-content">
                            <div class="analogy-block creator">
                                <h4>Contexte Créateur</h4>
                                <p><strong>${slide.iaCreator.title} :</strong> ${slide.iaCreator.desc}</p>
                            </div>
                            <div class="analogy-block situation">
                                <h4>Contexte de Situation</h4>
                                <p><strong>${slide.iaSituation.title} :</strong> ${slide.iaSituation.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="analogy-conclusion">
                    <div class="analogy-conclusion-icon">💡</div>
                    <div>
                        <p>${slide.conclusion}</p>
                    </div>
                </div>
            `;
        } else if (slide.type === 'maire') {
            html += `
                <div class="maire-grid">
            `;
            slide.steps.forEach(step => {
                html += `
                    <div class="maire-col">
                        <div class="maire-letter">${step.letter}</div>
                        <div class="maire-word">${step.label}</div>
                        <div class="maire-desc">${step.desc}</div>
                    </div>
                `;
            });
            html += `
                </div>
                <div class="maire-example-box">
                    <h4>📝 Exemple de Prompt M.A.I.R.E :</h4>
                    <p>${slide.example}</p>
                </div>
            `;
        } else if (slide.type === 'color-coded-prompt') {
            html += `
                <p style="margin-bottom:1rem;">${slide.promptTitle} :</p>
                <div class="coded-prompt-container">
            `;
            slide.parts.forEach(part => {
                html += `
                    <div class="coded-prompt-line" style="border-left-color: ${part.color}">
                        <div class="coded-prompt-badge" style="background: ${part.color}">${part.key}</div>
                        <div class="coded-prompt-text">
                            <strong>${part.label} :</strong> ${part.text}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        } else if (slide.type === 'gabarit') {
            html += `
                <p style="margin-bottom:1rem;">${slide.desc}</p>
                <div class="gabarit-box">
                    <div class="gabarit-header">
                        <span>Gabarit de prompt M.A.I.R.E.</span>
                        <button class="gabarit-copy-btn btn-copy-code">Copier le gabarit</button>
                    </div>
                    <pre class="gabarit-pre"><code>${this.escapeHtml(slide.template)}</code></pre>
                </div>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.75rem;">${slide.tips}</p>
            `;
        } else if (slide.type === 'conflict-table') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            ${slide.headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${slide.rows.map(row => `
                            <tr>
                                <td style="font-weight:700; color:var(--text-title);">${row[0]}</td>
                                <td style="font-size:0.85rem;">${row[1]}</td>
                                <td style="font-size:0.85rem;">${row[2]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (slide.type === 'risk-pyramid') {
            html += `
                <p>${slide.desc}</p>
                <div class="pyramid-container">
            `;
            slide.tiers.forEach((tier, idx) => {
                html += `
                    <button class="pyramid-tier pyramid-tier-${idx + 1}" data-idx="${idx}">
                        ${tier.level}
                    </button>
                `;
            });
            html += `
                </div>
                <div class="tier-detail-box" id="tier-detail-panel">
                    <!-- Dynamic details loaded by JS -->
                </div>
            `;
        } else if (slide.type === 'charte-checklist') {
            html += `
                <p>${slide.desc}</p>
                <div class="charte-columns">
                    <div class="charte-pane charte-pane-dos">
                        <h4>✅ À faire (Recommandations)</h4>
                        <ul class="charte-list">
                            ${slide.dos.map(item => `<li class="charte-list-item">${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="charte-pane charte-pane-donts">
                        <h4>❌ À ne pas faire (Interdictions)</h4>
                        <ul class="charte-list">
                            ${slide.donts.map(item => `<li class="charte-list-item">${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } else if (slide.type === 'hallucination') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div class="hallucination-diagram">
                    <div class="temp-bar-container">
                        <div class="temp-label-row">
                            <span style="color:var(--accent-blue)">Factuel / Précis (0.0)</span>
                            <span style="color:var(--accent-red)">Créatif / Libre (1.0)</span>
                        </div>
                        <div class="temp-bar">
                            <div class="temp-indicator" style="left: ${slide.temperature}%;"></div>
                        </div>
                        <p style="font-size:0.75rem; text-align:center; margin-top:0.25rem; font-weight:700; color:var(--text-muted)">
                            Curseur recommandé pour l'administration : Température basse (~0.1 - 0.2)
                        </p>
                    </div>
                    <div class="temp-meanings">
                        <div class="temp-meaning-box" style="border-left:4px solid var(--accent-blue)">
                            <h4>🔬 Température basse</h4>
                            <p>L'IA choisit les mots les plus probables. Réponses fiables, répétitives, idéales pour l'analyse de textes officiels.</p>
                        </div>
                        <div class="temp-meaning-box" style="border-left:4px solid var(--accent-red)">
                            <h4>🎨 Température élevée</h4>
                            <p>L'IA choisit des mots plus rares. Réponses originales et imaginatives, sujettes aux hallucinations.</p>
                        </div>
                    </div>
                </div>
                <div class="maire-example-box" style="margin-top:1.5rem; border-left-color:var(--accent-green)">
                    <h4>💡 Bonnes pratiques anti-hallucination :</h4>
                    <ul style="margin-left: 1.5rem; font-size: 0.88rem; line-height: 1.6; margin-top: 0.5rem;">
                        ${slide.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else if (slide.type === 'alliance-map') {
            html += `
                <p>${slide.desc}</p>
                <div class="alliance-grid">
            `;
            slide.alliances.forEach(al => {
                html += `
                    <div class="alliance-card">
                        <h4>${al.leader}</h4>
                        <div class="alliance-card-models">Modèles : ${al.models}</div>
                        <p class="alliance-card-desc">${al.target}</p>
                    </div>
                `;
            });
            html += `</div>`;
        } else if (slide.type === 'hardware-comparison') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div class="hardware-container">
            `;
            slide.chips.forEach((chip, idx) => {
                const energyWidths = [100, 45, 15]; 
                html += `
                    <div class="hard-chip-row">
                        <div class="hard-chip-info">
                            <h4>${chip.type}</h4>
                            <p>${chip.role}</p>
                        </div>
                        <div class="hard-chip-bar-container">
                            <div class="hard-chip-bar" style="width: ${energyWidths[idx]}%; background: ${idx === 0 ? 'var(--accent-red)' : idx === 1 ? 'var(--accent-purple)' : 'var(--accent-green)'}"></div>
                            <div class="hard-chip-power-label">Consommation : ${chip.power}</div>
                        </div>
                    </div>
                `;
            });
            html += `
                </div>
                <div class="maire-example-box" style="margin-top:1.5rem;">
                    ${slide.fact}
                </div>
            `;
        } else if (slide.type === 'satellite-datacenter') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div class="satellite-visual" style="font-size: 3.5rem; text-align:center; margin-bottom: 1.5rem;">🛰️☁️🌌</div>
                <div class="satellite-pros-cons">
                    <div class="sat-pane sat-pane-pros">
                        <h4>👍 Avantages théoriques</h4>
                        <ul class="sat-list">
                            ${slide.pros.map(p => `<li class="sat-list-item">${p}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="sat-pane sat-pane-cons">
                        <h4>👎 Limites et contraintes</h4>
                        <ul class="sat-list">
                            ${slide.cons.map(c => `<li class="sat-list-item">${c}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } else if (slide.type === 'exercise-list') {
            html += `<div class="exercises-container">`;
            slide.exercises.forEach((ex, idx) => {
                const levelClass = ex.level === 'débutant' ? 'level-debutant' : 
                                   ex.level === 'intermédiaire' ? 'level-intermediaire' : 'level-expert';
                html += `
                    <div class="exercise-card">
                        <div class="exercise-card-header">
                            <div class="exercise-card-badges">
                                <span class="exercise-badge-dept">${ex.department}</span>
                                <span class="exercise-badge-level ${levelClass}">${ex.level}</span>
                            </div>
                            <button class="btn btn-secondary btn-toggle-correction" data-idx="${idx}">Voir la correction</button>
                        </div>
                        <div class="exercise-prompt-req">
                            <strong>Mise en situation :</strong><br>
                            ${ex.description}
                        </div>
                        <div class="exercise-correction-box" id="correction-${idx}">
                            <h4>💡 Prompt type & correction :</h4>
                            <p>${this.escapeHtml(ex.solution)}</p>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        } else if (slide.type === 'agentic-comparison') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div class="agentic-flow-container">
                    <div class="flow-block">
                        <h4>${slide.chatWorkflow.title}</h4>
                        ${slide.chatWorkflow.steps.map((s, idx) => `
                            <div class="flow-step-item">
                                <span style="color:var(--accent-blue); font-weight:800;">${s.role} :</span> ${s.text}
                            </div>
                            ${idx < slide.chatWorkflow.steps.length - 1 ? '<div class="flow-arrow-down">▼</div>' : ''}
                        `).join('')}
                    </div>
                    <div class="flow-block" style="border-color:var(--accent-green)">
                        <h4>${slide.agenticWorkflow.title}</h4>
                        ${slide.agenticWorkflow.steps.map((s, idx) => `
                            <div class="flow-step-item" style="border-color:var(--accent-green); background:#f0fdf4;">
                                <span style="color:var(--accent-green); font-weight:800;">${s.role} :</span> ${s.text}
                            </div>
                            ${idx < slide.agenticWorkflow.steps.length - 1 ? '<div class="flow-arrow-down" style="color:var(--accent-green)">▼</div>' : ''}
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (slide.type === 'agentic-loop') {
            html += `
                <p>${slide.desc}</p>
                <div class="agentic-loop-grid">
            `;
            slide.phases.forEach(ph => {
                html += `
                    <div class="loop-step-card">
                        <div class="loop-step-num">${ph.step}</div>
                        <div class="loop-step-desc">${ph.desc}</div>
                    </div>
                `;
            });
            html += `</div>`;
        } else if (slide.type === 'antigravity-details') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div class="satellite-visual" style="font-size: 3.5rem; text-align:center; margin-bottom: 1.5rem;">🤖💻🛡️</div>
                <div class="maire-example-box" style="border-left-color:var(--accent-green);">
                    <h4>💡 Pourquoi Antigravity est unique pour le secteur public :</h4>
                    <ul style="margin-left:1.5rem; font-size:0.9rem; line-height:1.6; margin-top:0.5rem;">
                        ${slide.benefits.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else if (slide.type === 'architecture-diagram') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div class="tuto-architecture">
                    <div class="tuto-arch-box" style="border-color: var(--accent-blue)">
                        <h5>${slide.frontend.title}</h5>
                        <p>${slide.frontend.desc}</p>
                    </div>
                    <div class="tuto-flow-arrow">⇄</div>
                    <div class="tuto-arch-box" style="border-color: var(--accent-green)">
                        <h5>${slide.backend.title}</h5>
                        <p>${slide.backend.desc}</p>
                    </div>
                </div>
                <div class="maire-example-box" style="border-left-color: var(--accent-purple); margin-top:1.5rem;">
                    ${slide.security}
                </div>
            `;
        } else if (slide.type === 'tuto-step') {
            html += `
                <div class="schema-step-item" style="border-color:var(--accent-blue)">
                    <div class="schema-step-bubble">${slide.stepNum}</div>
                    <div class="schema-step-details">
                        <h4>Objectif : ${slide.goal}</h4>
                        <ol style="margin-left:1.25rem; font-size:0.88rem; line-height:1.6; margin-top:0.5rem;">
                            ${slide.steps.map(s => `<li>${s}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            `;
            if (slide.code) {
                const escapedCode = this.escapeHtml(slide.code);
                html += `
                    <div class="gabarit-box" style="margin-top:1.5rem;">
                        <div class="gabarit-header">
                            <span>Exemple de code ou requête SQL</span>
                            <button class="gabarit-copy-btn btn-copy-code">Copier le code</button>
                        </div>
                        <pre class="gabarit-pre"><code>${escapedCode}</code></pre>
                    </div>
                `;
            }
        } else if (slide.type === 'bridge-schema') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div class="tuto-architecture" style="margin-top: 2rem;">
                    ${slide.elements.map((el, idx) => `
                        <div class="tuto-arch-box" style="border-color: ${idx === 0 ? 'var(--accent-blue)' : idx === 1 ? 'var(--accent-purple)' : 'var(--accent-green)'}">
                            <h5 style="margin-bottom: 0.5rem;">${el.title}</h5>
                            <p>${el.desc}</p>
                        </div>
                        ${idx < slide.elements.length - 1 ? '<div class="tuto-flow-arrow" style="font-size:1.5rem;">➔</div>' : ''}
                    `).join('')}
                </div>
            `;
        } else if (slide.type === 'token-sandbox') {
            html += `
                <p style="margin-bottom:1.25rem;">${slide.desc}</p>
                <div style="background:var(--bg-main); border: 1px solid var(--border-color); padding: 1.5rem; border-radius:var(--radius-md); margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom:0.75rem; color:var(--text-title); font-size: 0.95rem;">✍️ Zone d'expérimentation en temps réel :</h4>
                    <textarea id="sandbox-input" placeholder="Tapez ici le nom de votre commune ou un sigle (ex: PLU, CCAS, M. le Maire)..." style="width:100%; height:80px; padding:0.75rem; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-size:0.9rem; resize:vertical; outline:none; margin-bottom:1rem;"></textarea>
                    
                    <h5 style="margin-bottom:0.5rem; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-muted);">Visualisation des Tokens (Simulation) :</h5>
                    <div id="sandbox-tokens" style="background:white; border:1px solid var(--border-color); padding:0.75rem; min-height:50px; border-radius:var(--radius-sm); margin-bottom:1.5rem; line-height:2.2;">
                        <span style="color:var(--text-muted); font-style:italic;">Saisissez du texte ci-dessus pour simuler la découpe...</span>
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                        <div style="background:white; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); border-top:4px solid var(--accent-purple);">
                            <h4 style="font-family:'Outfit',sans-serif; font-size:0.95rem; margin-bottom:0.75rem;">🤖 Modèle ChatGPT (OpenAI)</h4>
                            <ul style="list-style:none; font-size:0.82rem; line-height:1.6; padding:0;">
                                <li>Tokens générés : <strong id="sandbox-count-gpt" style="color:var(--accent-purple); font-size: 1rem;">0</strong></li>
                                <li>Coût estimé (100k requêtes) : <strong id="sandbox-cost-gpt" style="color:var(--accent-purple); font-size: 1rem;">0.000 $</strong></li>
                                <li>Consommation d'énergie : <strong id="sandbox-energy-gpt" style="color:var(--accent-purple); font-size: 1rem;">0.00 kWh</strong></li>
                                <li style="font-size:0.72rem; color:var(--text-muted); margin-top:0.5rem; border-top:1px solid var(--bg-main); padding-top:0.5rem;">Calculs sur puces graphiques (GPU) standard de forte consommation électrique.</li>
                            </ul>
                        </div>
                        <div style="background:white; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); border-top:4px solid var(--accent-blue);">
                            <h4 style="font-family:'Outfit',sans-serif; font-size:0.95rem; margin-bottom:0.75rem;">🚀 Modèle Gemini (Google)</h4>
                            <ul style="list-style:none; font-size:0.82rem; line-height:1.6; padding:0;">
                                <li>Tokens générés : <strong id="sandbox-count-gemini" style="color:var(--accent-blue); font-size: 1rem;">0</strong></li>
                                <li>Coût estimé (100k requêtes) : <strong id="sandbox-cost-gemini" style="color:var(--accent-blue); font-size: 1rem;">0.000 $</strong></li>
                                <li>Consommation d'énergie : <strong id="sandbox-energy-gemini" style="color:var(--accent-blue); font-size: 1rem;">0.00 kWh</strong></li>
                                <li style="font-size:0.72rem; color:var(--text-muted); margin-top:0.5rem; border-top:1px solid var(--bg-main); padding-top:0.5rem;">Calculs sur puces optimisées (TPU) à très haute efficacité énergétique.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="maire-example-box" style="border-left-color:var(--accent-gold);">
                    ${slide.explanation}
                </div>
            `;
        } else if (slide.type === 'anonymizer-tool') {
            html += `
                <p style="margin-bottom:1.25rem;">${slide.desc}</p>
                <div style="background:var(--bg-main); border: 1px solid var(--border-color); padding: 1.5rem; border-radius:var(--radius-md); margin-bottom:1.5rem;">
                    <h4 style="margin-bottom:0.75rem; color:var(--text-title); font-size: 0.95rem;">📋 Collez le texte brut à anonymiser :</h4>
                    <textarea id="anonymizer-input" placeholder="Collez ici le mail de l'usager, compte-rendu ou document administratif (ex: Jean Dupont, j.dupont@mail.fr, 06 12 34 56 78)..." style="width:100%; height:100px; padding:0.75rem; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-size:0.9rem; resize:vertical; outline:none; margin-bottom:1rem;"></textarea>
                    
                    <button class="btn btn-primary" id="btn-anonymize-run" style="margin-bottom:1.5rem; width:100%; justify-content:center;">🛡️ Anonymiser localement (Données protégées)</button>
                    
                    <h5 style="margin-bottom:0.5rem; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-muted);">Résultat anonymisé (Prêt à copier-coller dans un LLM externe) :</h5>
                    <div class="gabarit-box" style="margin-top:0.5rem;">
                        <div class="gabarit-header">
                            <span>Texte Anonymisé</span>
                            <button class="gabarit-copy-btn btn-copy-code">Copier le texte</button>
                        </div>
                        <textarea id="anonymizer-output" readonly class="gabarit-pre" style="width:100%; height:120px; border:none; resize:none; font-family:monospace; font-size:0.82rem; color:#1e293b; padding:1.25rem; outline:none; cursor:text;"></textarea>
                    </div>
                </div>
                <div class="maire-example-box" style="border-left-color:var(--accent-red)">
                    ${slide.explanation}
                </div>
            `;
        } else if (slide.type === 'charte-text') {
            html += `
                <div class="charte-decree-wrapper">
                    <div class="charte-decree-header">
                        <div class="charte-decree-crest">🇫🇷</div>
                        <div class="charte-decree-title">Charte d'Utilisation de l'IA Générative</div>
                        <div class="charte-decree-subtitle">Commune de [Nom de la Commune] • Cadre Professionnel et Déontologique</div>
                    </div>
                    
                    <div class="charte-decree-body">
                        <div class="charte-decree-section-title">Préambule</div>
                        <p>${slide.preamble}</p>
                        
                        ${slide.articles.map(art => `
                            <div class="charte-decree-article">
                                <h4>Article ${art.num} : ${art.title}</h4>
                                ${art.intro ? `<p style="margin-bottom:0.5rem; font-style:italic;">${art.intro}</p>` : ''}
                                <ul style="margin-left: 1.5rem; font-size: 0.85rem; line-height: 1.6;">
                                    ${art.points.map(pt => `<li style="margin-bottom:0.4rem;">${pt}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="charte-decree-signature-block">
                        <div style="flex: 1;">
                            <strong>Date de signature :</strong>
                            <div class="charte-decree-signature-line"></div>
                        </div>
                        <div style="flex: 1; margin-left: 2rem;">
                            <strong>Nom et Signature de l'Agent :</strong>
                            <div class="charte-decree-signature-line"></div>
                        </div>
                    </div>
                </div>
            `;
        } else if (slide.type === 'eval-stage') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div style="background:var(--bg-main); border: 1px solid var(--border-color); padding: 1.5rem; border-radius:var(--radius-md); margin-bottom: 1.5rem;">
                    <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; margin-bottom:1rem; color:var(--text-title); display:flex; align-items:center; gap:0.5rem;">📝 Fiche d'Évaluation Individuelle (À faire sur papier)</h3>
                    <div style="background:white; border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-sm); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        <strong>Mise en situation de l'évaluation :</strong><br>
                        <em>${slide.scenario}</em>
                    </div>
                    
                    <button class="btn btn-secondary btn-toggle-correction" style="width:100%; justify-content:center;">Voir la correction officielle & la grille de notation</button>
                    
                    <div class="exercise-correction-box" style="display:none; margin-top:1.5rem; background:white; border:1px solid #bbf7d0; border-radius:var(--radius-sm); padding:1.25rem;">
                        <h4 style="color:#166534; font-weight:800; font-size:0.95rem; margin-bottom:0.75rem;">💡 Grille de Correction & Bonnes Pratiques</h4>
                        
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;">
                            <div style="background:#f0fdf4; border:1px solid #dcfce7; padding:1rem; border-radius:6px; font-size:0.82rem; line-height:1.5; color:#14532d;">
                                <strong style="color:#166534; font-size:0.9rem;">✅ Choses à faire (DOs) :</strong>
                                <ul style="margin-left:1.25rem; margin-top:0.4rem; padding:0;">
                                    ${slide.dos.map(doItem => `<li style="margin-bottom:0.4rem;">${doItem}</li>`).join('')}
                                </ul>
                            </div>
                            <div style="background:#fef2f2; border:1px solid #fee2e2; padding:1rem; border-radius:6px; font-size:0.82rem; line-height:1.5; color:#991b1b;">
                                <strong style="color:#b91c1c; font-size:0.9rem;">❌ Choses à ne pas faire (DONTs) :</strong>
                                <ul style="margin-left:1.25rem; margin-top:0.4rem; padding:0;">
                                    ${slide.donts.map(dontItem => `<li style="margin-bottom:0.4rem;">${dontItem}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <h5 style="font-weight:700; font-size:0.88rem; color:var(--text-title); margin-bottom:0.4rem;">Exemple de Prompt Parfait attendu (Méthode M.A.I.R.E. anonymisée) :</h5>
                        <pre style="background:var(--bg-main); border:1px solid var(--border-color); padding:1rem; border-radius:6px; font-family:monospace; font-size:0.82rem; white-space:pre-wrap; color:#1e293b; line-height:1.5;">${slide.modelAnswer}</pre>
                    </div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        this.slideContainer.innerHTML = html;

        // Post-render bindings
        if (slide.type === 'risk-pyramid') {
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

        // Always bind copy buttons if they exist
        this.bindCopyButtons();
    }
}

// Instantiate App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TrainingApp();
});
