/**
 * Formation IA Territoriale - Application Logic
 * Navigation & Visual Rendering Engine (30 Slides + Tools & Sandbox Version)
 */

class TrainingApp {
    constructor() {
        this.currentThemeIndex = -1; // -1 represents the Home Screen
        this.currentSlideIndex = 0;
        
        // Roles and live session variables
        this.role = 'public';
        this.prenom = '';
        this.sessionId = 1;
        this.supabase = null;
        this.activePoll = null;
        this.activeExercise = null;
        this.votesSubscription = null;
        this.sessionSubscription = null;
        this.presenceInterval = null;
        this.sessionState = { show_results: false };

        this.detectRole();
        this.initSupabase();
        this.initElements();
        this.initEvents();
        this.renderSidebar();
        this.renderHomeDashboard();
        this.showScreen('home');
        this.initInteractivity();
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
            if (this.role === 'stagiaire') return;
            this.currentThemeIndex = -1;
            this.currentSlideIndex = 0;
            this.activePoll = null;
            this.activeExercise = null;
            this.showScreen('home');
            this.syncSessionState();
        };
        this.btnHome.addEventListener('click', goHome);
        this.logoHome.addEventListener('click', goHome);

        // Previous/Next slide
        this.btnPrev.addEventListener('click', () => {
            if (this.role === 'stagiaire') return;
            this.navigate(-1);
        });
        this.btnNext.addEventListener('click', () => {
            if (this.role === 'stagiaire') return;
            this.navigate(1);
        });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (this.role === 'stagiaire') return;
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
            if (this.role === 'public' && theme.id === 'exercices-ateliers') {
                return; // Masquer les exercices en public
            }
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
                if (this.role === 'stagiaire') return;
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
                    if (this.role === 'stagiaire') return;
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
            if (this.role === 'public' && theme.id === 'exercices-ateliers') {
                return; // Masquer les exercices en public
            }
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
                if (this.role === 'stagiaire') return;
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
        } else if (slide.type === 'collectivite-couts') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.intro}</p>
                
                <div class="scenarios-selector-container">
                    <div class="scenarios-selector-title">Niveau d'engagement de la collectivité :</div>
                    <div class="scenarios-selector-tabs">
                        ${slide.scenarios.map((sc, idx) => `
                            <button class="scenario-tab-btn ${idx === 1 ? 'active' : ''}" data-idx="${idx}">
                                ${sc.label} <span class="user-badge">${sc.users} agents</span>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="horizon-info-banner">
                    💡 <strong>Horizon financier fixé à 3 ans :</strong> Au-delà de 3 ans, l'obsolescence technologique (lois exponentielles de l'IA) et l'évolution rapide des tarifs rendent toute projection financière incertaine. 3 ans est le standard de prévisibilité publique.
                </div>

                <div class="scenario-desc-box" id="scenario-desc-text">
                    ${slide.scenarios[1].desc}
                </div>

                <div class="comparison-cards-container">
                    <!-- Option A -->
                    <div class="comp-card" style="border-top: 4px solid var(--accent-blue)">
                        <h3>${slide.localSpecs.title}</h3>
                        <div class="comp-card-sub">${slide.localSpecs.subtitle}</div>
                        
                        <div class="costs-grid-container">
                            <h4 class="costs-section-title">📊 Plan de financement (Sur 3 ans)</h4>
                            <div class="costs-indicators">
                                <div class="cost-indicator-item">
                                    <span class="cost-val" id="local-invest">${slide.scenarios[1].local.invest}</span>
                                    <span class="cost-lbl">Investissement Initial</span>
                                </div>
                                <div class="cost-indicator-item">
                                    <span class="cost-val" id="local-fixed">${slide.scenarios[1].local.fixed}</span>
                                    <span class="cost-lbl">Fonctionnement / an</span>
                                </div>
                                <div class="cost-indicator-item highlight-blue">
                                    <span class="cost-val" id="local-tco">${slide.scenarios[1].local.tco3y}</span>
                                    <span class="cost-lbl">Total sur 3 ans (TCO)</span>
                                </div>
                            </div>
                            
                            <div class="cost-breakdown-box">
                                <strong>Détail du coût :</strong> <span id="local-breakdown">${slide.scenarios[1].local.breakdown}</span>
                            </div>

                            <div class="cost-amortized-banner">
                                <div class="amortized-badge">
                                    Coût amorti : <strong id="local-user-cost">${slide.scenarios[1].local.userCost}</strong>
                                </div>
                                <p class="cost-explanation-note" id="local-user-cost-desc">${slide.scenarios[1].local.userCostDesc}</p>
                            </div>
                        </div>

                        <div class="specs-box-container">
                            <div class="specs-pane pro">
                                <h5>👍 Avantages</h5>
                                <ul>
                                    ${slide.localSpecs.pros.map(p => `<li>${p}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="specs-pane con">
                                <h5>👎 Inconvénients</h5>
                                <ul>
                                    ${slide.localSpecs.cons.map(c => `<li>${c}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Option B -->
                    <div class="comp-card" style="border-top: 4px solid var(--accent-purple)">
                        <h3>${slide.cloudSpecs.title}</h3>
                        <div class="comp-card-sub">${slide.cloudSpecs.subtitle}</div>
                        
                        <div class="costs-grid-container">
                            <h4 class="costs-section-title">📊 Plan de financement (Sur 3 ans)</h4>
                            <div class="costs-indicators">
                                <div class="cost-indicator-item">
                                    <span class="cost-val" id="cloud-invest">${slide.scenarios[1].cloud.invest}</span>
                                    <span class="cost-lbl">Frais de départ</span>
                                </div>
                                <div class="cost-indicator-item">
                                    <span class="cost-val" id="cloud-fixed">${slide.scenarios[1].cloud.fixed}</span>
                                    <span class="cost-lbl">Abonnements / an</span>
                                </div>
                                <div class="cost-indicator-item highlight-purple">
                                    <span class="cost-val" id="cloud-tco">${slide.scenarios[1].cloud.tco3y}</span>
                                    <span class="cost-lbl">Total sur 3 ans (TCO)</span>
                                </div>
                            </div>

                            <div class="cost-breakdown-box">
                                <strong>Détail du coût :</strong> <span id="cloud-breakdown">${slide.scenarios[1].cloud.breakdown}</span>
                            </div>

                            <div class="cost-amortized-banner">
                                <div class="amortized-badge">
                                    Coût amorti : <strong id="cloud-user-cost">${slide.scenarios[1].cloud.userCost}</strong>
                                </div>
                                <p class="cost-explanation-note" id="cloud-user-cost-desc">${slide.scenarios[1].cloud.userCostDesc}</p>
                            </div>
                        </div>

                        <div class="specs-box-container">
                            <div class="specs-pane pro">
                                <h5>👍 Avantages</h5>
                                <ul>
                                    ${slide.cloudSpecs.pros.map(p => `<li>${p}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="specs-pane con">
                                <h5>👎 Inconvénients</h5>
                                <ul>
                                    ${slide.cloudSpecs.cons.map(c => `<li>${c}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
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
        } else if (slide.type === 'agentic-warning') {
            html += `
                <p style="margin-bottom:1.5rem;">${slide.intro}</p>
                <div class="agentic-warning-container">
                    <div class="warning-block-risks">
                        <h4>⚠️ Les Menaces pour le Système (Prise de contrôle)</h4>
                        <div class="risks-grid">
                            ${slide.risks.map(r => `
                                <div class="risk-card">
                                    <h5>${r.title}</h5>
                                    <p>${r.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="warning-block-solutions">
                        <h4>🛡️ Protocoles de Sécurisation Obligatoires</h4>
                        <div class="solutions-list">
                            ${slide.solutions.map(s => `
                                <div class="solution-item">
                                    <h5>${s.title}</h5>
                                    <p>${s.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (slide.type === 'exercises-dashboard') {
            html += `
                <p style="margin-bottom:1rem;">${slide.intro}</p>
                
                <div class="ex-dashboard-wrapper">
                    <!-- Left Sidebar: Filters & Interactive Tools -->
                    <aside class="ex-dashboard-sidebar">
                        <div class="ex-filter-panel">
                            <h4>🔍 Filtres de recherche</h4>
                            
                            <div class="filter-group">
                                <label>Support de formation :</label>
                                <div class="filter-buttons" id="filter-support">
                                    <button class="btn-filter active" data-val="all">Tous</button>
                                    <button class="btn-filter" data-val="pc">🖥️ Sur PC</button>
                                    <button class="btn-filter" data-val="papier">📝 Sur Papier</button>
                                </div>
                            </div>

                            <div class="filter-group">
                                <label>Format de travail :</label>
                                <div class="filter-buttons" id="filter-format">
                                    <button class="btn-filter active" data-val="all">Tous</button>
                                    <button class="btn-filter" data-val="individuel">👤 Individuel</button>
                                    <button class="btn-filter" data-val="groupe">👥 En Groupe</button>
                                </div>
                            </div>

                            <div class="filter-group">
                                <label>Objectif d'apprentissage :</label>
                                <div class="filter-buttons" id="filter-type">
                                    <button class="btn-filter active" data-val="all">Tous</button>
                                    <button class="btn-filter" data-val="pratique">🛠️ Pratique</button>
                                    <button class="btn-filter" data-val="efficacite">⚡ Efficacité</button>
                                    <button class="btn-filter" data-val="fun">🎲 Fun / Jeu</button>
                                </div>
                            </div>
                        </div>

                        <!-- Tool 1: Calculateur d'Efficacité -->
                        <div class="interactive-tool-box">
                            <h4>⚡ Calculateur d'Efficacité</h4>
                            <p class="tool-desc">Simulez le gain de temps et d'argent d'une équipe territoriale utilisant l'IA.</p>
                            <div class="tool-form">
                                <div class="form-row">
                                    <label>Tâche humaine (heures) :</label>
                                    <input type="number" id="calc-human-time" value="4" min="0.1" step="0.1">
                                </div>
                                <div class="form-row">
                                    <label>Tâche IA + relecture (h) :</label>
                                    <input type="number" id="calc-ia-time" value="0.5" min="0.1" step="0.1">
                                </div>
                                <div class="form-row">
                                    <label>Taux horaire moyen (€/h) :</label>
                                    <input type="number" id="calc-rate" value="25" min="1">
                                </div>
                                <div class="form-row">
                                    <label>Nombre d'agents :</label>
                                    <input type="number" id="calc-agents" value="10" min="1">
                                </div>
                                <button class="btn btn-primary" id="btn-calc-run" style="width:100%; justify-content:center; margin-top:0.5rem;">Calculer le Gain</button>
                            </div>
                            <div class="tool-results" id="calc-results" style="display:none;">
                                <div class="result-item">Temps gagné : <strong id="res-hours">0 h</strong> / tâche</div>
                                <div class="result-item">Économie financière : <strong id="res-money" style="color:var(--accent-green)">0 €</strong></div>
                                <div class="result-item">Productivité : <strong id="res-pct" style="color:var(--accent-blue)">0%</strong></div>
                            </div>
                        </div>

                        <!-- Tool 2: Simulateur de Téléphone Arabe -->
                        <div class="interactive-tool-box">
                            <h4>🎲 Simulateur de Téléphone Arabe</h4>
                            <p class="tool-desc">Illustrez la perte sémantique humaine vs la fidélité de l'IA lors des transmissions.</p>
                            <div class="tool-form">
                                <textarea id="sim-input-text" placeholder="Entrez une consigne complexe (ex: dates, horaires, budgets)..." style="width:100%; height:60px; font-size:0.8rem; padding:0.5rem; border-radius:4px; border:1px solid var(--border-color); outline:none; resize:none;"></textarea>
                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-top:0.5rem;">
                                    <button class="btn btn-secondary" id="btn-sim-human" style="font-size:0.75rem; justify-content:center;">Simuler Humain</button>
                                    <button class="btn btn-primary" id="btn-sim-ia" style="font-size:0.75rem; justify-content:center;">Simuler IA</button>
                                </div>
                            </div>
                            <div class="tool-results" id="sim-results" style="display:none;">
                                <strong>Message final après 5 transmissions :</strong>
                                <p id="sim-output-text" style="font-size:0.8rem; font-style:italic; margin-top:0.25rem; line-height:1.4; padding:0.5rem; background:white; border-radius:4px; border:1px solid var(--border-color);"></p>
                                <span id="sim-fidelity-badge" style="font-size:0.7rem; font-weight:800; padding:0.15rem 0.4rem; border-radius:4px; margin-top:0.25rem; display:inline-block;"></span>
                            </div>
                        </div>
                    </aside>

                    <!-- Right Column: Catalog of Exercises -->
                    <main class="ex-dashboard-content">
                        <div class="ex-search-bar-row">
                            <input type="text" id="ex-search-input" placeholder="🔍 Rechercher un exercice par mot-clé (ex: RGPD, DGS, cantine)...">
                            <span class="ex-counter-badge" id="ex-counter-text">60 exercices</span>
                        </div>

                        <div class="ex-cards-catalog" id="ex-cards-catalog-list">
                            <!-- Injected by Javascript -->
                        </div>
                    </main>
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
            const showCorrection = this.role !== 'public';
            html += `
                <p style="margin-bottom:1.5rem;">${slide.desc}</p>
                <div style="background:var(--bg-main); border: 1px solid var(--border-color); padding: 1.5rem; border-radius:var(--radius-md); margin-bottom: 1.5rem;">
                    <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; margin-bottom:1rem; color:var(--text-title); display:flex; align-items:center; gap:0.5rem;">📝 Fiche d'Évaluation Individuelle (À faire sur papier)</h3>
                    <div style="background:white; border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-sm); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
                        <strong>Mise en situation de l'évaluation :</strong><br>
                        <em>${slide.scenario}</em>
                    </div>
                    
                    ${showCorrection ? `
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
                    ` : `
                    <div style="text-align:center; padding:1.5rem; background:rgba(0,86,179,0.03); border:1px dashed rgba(0,86,179,0.15); border-radius:6px; color:var(--text-muted); font-size:0.85rem; font-style:italic;">
                        🔒 La correction de l'examen est réservée à l'espace formateur actif.
                    </div>
                    `}
                </div>
            `;
        }

        if (this.role === 'formateur') {
            const theme = THEMES[this.currentThemeIndex];
            const poll = INTERACTIVE_QUESTIONS.find(q => q.themeId === theme.id);
            
            html += `
                <div class="slide-interactivity-controls">
                    <span class="controls-label">Console Formateur 🔐 :</span>
                    ${poll ? `
                        <button class="btn btn-sm btn-control-poll" id="btn-slide-launch-poll">
                            📊 Activer le Quiz de ce Thème
                        </button>
                    ` : ''}
                    <button class="btn btn-sm btn-control-test" id="btn-slide-launch-test">
                        📝 Lancer un Test Général (Thèmes 1 à ${this.currentThemeIndex + 1})
                    </button>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        this.slideContainer.innerHTML = html;

        // Post-render bindings
        if (slide.type === 'exercises-dashboard') {
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
        }
    }

    // ==========================================
    // INTERACTIVITÉ EN TEMPS RÉEL (SUPABASE)
    // ==========================================

    detectRole() {
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('role');
        if (roleParam === 'formateur') {
            this.role = 'formateur';
        } else if (roleParam === 'stagiaire') {
            this.role = 'stagiaire';
            this.prenom = localStorage.getItem('stagiaire_prenom') || '';
        } else {
            this.role = 'public';
        }
    }

    initSupabase() {
        const supabaseUrl = 'https://nkdgmxwznrrywwjwcsfk.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZGdteHd6bnJyeXd3andjc2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTU3MDgsImV4cCI6MjA5NTg5MTcwOH0.PHEA2ngQkln67Vm55Cb8YtDc_RlbVadsGiZ4aNmMd3U';
        
        if (typeof supabase !== 'undefined') {
            this.supabase = supabase.createClient(supabaseUrl, supabaseKey);
        } else {
            console.warn("Supabase library not loaded. Running in local fallback mode.");
        }
    }

    async initInteractivity() {
        if (!this.supabase) return;

        // Bind panel close button
        const btnClosePanel = document.getElementById('btn-close-panel');
        if (btnClosePanel) {
            btnClosePanel.onclick = () => {
                document.getElementById('interactivity-panel').classList.remove('open');
            };
        }

        if (this.role === 'formateur') {
            const { data: { session } } = await this.supabase.auth.getSession();
            if (!session) {
                document.getElementById('admin-login-overlay').style.display = 'flex';
                this.bindAdminLoginEvents();
            } else {
                this.setupFormateurMode();
            }
        } else if (this.role === 'stagiaire') {
            if (!this.prenom) {
                document.getElementById('stagiaire-login-overlay').style.display = 'flex';
                this.bindStagiaireLoginEvents();
            } else {
                this.setupStagiaireMode();
            }
        } else {
            this.setupPublicMode();
        }
    }

    bindAdminLoginEvents() {
        const btnLogin = document.getElementById('btn-admin-login');
        const btnCancel = document.getElementById('btn-admin-cancel');
        const passwordInput = document.getElementById('admin-password-input');
        const errorDiv = document.getElementById('admin-login-error');

        const attemptLogin = async () => {
            const password = passwordInput.value;
            errorDiv.innerText = '';
            
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: 'admin@admin.fr',
                password: password
            });

            if (error) {
                errorDiv.innerText = 'Mot de passe incorrect.';
            } else {
                document.getElementById('admin-login-overlay').style.display = 'none';
                this.setupFormateurMode();
            }
        };

        btnLogin.onclick = attemptLogin;
        passwordInput.onkeydown = (e) => {
            if (e.key === 'Enter') attemptLogin();
        };

        btnCancel.onclick = () => {
            document.getElementById('admin-login-overlay').style.display = 'none';
            this.role = 'public';
            this.setupPublicMode();
            window.history.replaceState({}, document.title, window.location.pathname);
        };
    }

    bindStagiaireLoginEvents() {
        const btnLogin = document.getElementById('btn-stagiaire-login');
        const nameInput = document.getElementById('stagiaire-name-input');
        const errorDiv = document.getElementById('stagiaire-login-error');

        const attemptLogin = () => {
            const name = nameInput.value.trim();
            if (!name) {
                errorDiv.innerText = 'Le prénom ne peut pas être vide.';
                return;
            }
            if (name.length < 2) {
                errorDiv.innerText = 'Le prénom doit faire au moins 2 caractères.';
                return;
            }
            
            localStorage.setItem('stagiaire_prenom', name);
            this.prenom = name;
            document.getElementById('stagiaire-login-overlay').style.display = 'none';
            this.setupStagiaireMode();
        };

        btnLogin.onclick = attemptLogin;
        nameInput.onkeydown = (e) => {
            if (e.key === 'Enter') attemptLogin();
        };
    }

    setupFormateurMode() {
        console.log("Formateur connecté avec succès !");
        
        // Afficher le QR Code sur la page d'accueil
        const liveCard = document.getElementById('live-session-home-card');
        if (liveCard) {
            liveCard.style.display = 'block';
            const joinUrl = window.location.origin + window.location.pathname + '?role=stagiaire';
            document.getElementById('live-session-url').href = joinUrl;
            document.getElementById('live-session-url').innerText = joinUrl;
            document.getElementById('live-session-qr').src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(joinUrl);
        }

        // Afficher le bouton flottant de contrôle des votes
        const btnFloating = document.getElementById('btn-floating-poll');
        if (btnFloating) {
            btnFloating.style.display = 'flex';
            btnFloating.onclick = () => {
                const panel = document.getElementById('interactivity-panel');
                panel.classList.toggle('open');
                if (panel.classList.contains('open')) {
                    this.refreshFormateurPanel();
                }
            };
        }

        // Nettoyage périodique des absences (stagiaires déconnectés depuis 30s)
        const cleanOldPresences = async () => {
            if (!this.supabase) return;
            const cutoff = new Date(Date.now() - 30 * 1000).toISOString();
            await this.supabase.from('presences').delete().lt('last_seen_at', cutoff);
        };
        cleanOldPresences();
        setInterval(cleanOldPresences, 15000);

        this.selectSlide = ((originalSelectSlide) => {
            return (themeIdx, slideIdx) => {
                // Clear active states on slide change
                this.activePoll = null;
                this.activeExercise = null;
                
                originalSelectSlide.call(this, themeIdx, slideIdx);
                this.syncSessionState();
                this.refreshFormateurPanel();
            };
        })(this.selectSlide);

        this.syncSessionState();
        this.listenToPresenceAndVotes();
    }

    setupStagiaireMode() {
        console.log("Stagiaire connecté :", this.prenom);

        // Masquer la barre latérale pour la concentration
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = 'none';

        // Masquer les boutons de navigation
        this.btnPrev.style.display = 'none';
        this.btnNext.style.display = 'none';

        // Lancer les battements de coeur de présence (toutes les 10s)
        this.updateHeartbeat();
        this.presenceInterval = setInterval(() => this.updateHeartbeat(), 10000);

        // S'abonner aux changements de sessions du formateur
        this.subscribeToSession();
    }

    setupPublicMode() {
        console.log("Mode public actif.");
        this.renderSidebar();
        this.themesGrid.innerHTML = '';
        this.renderHomeDashboard();
    }

    async syncSessionState() {
        if (!this.supabase || this.role !== 'formateur') return;
        const theme = this.currentThemeIndex === -1 ? null : THEMES[this.currentThemeIndex];
        const activeThemeId = theme ? theme.id : 'home';

        // Charger l'état actuel de show_results pour conserver la valeur en base de données
        const { data } = await this.supabase.from('sessions').select('show_results').eq('id', 1).single();
        const showResults = data ? data.show_results : false;
        this.sessionState.show_results = showResults;

        await this.supabase.from('sessions').update({
            active_theme_id: activeThemeId,
            active_slide_index: this.currentSlideIndex,
            active_poll_id: this.activePoll ? this.activePoll.id : null,
            active_exercise_id: this.activeExercise ? this.activeExercise.id : null,
            show_results: this.activePoll || this.activeExercise ? showResults : false
        }).eq('id', 1);
    }

    async updateHeartbeat() {
        if (!this.supabase || this.role !== 'stagiaire' || !this.prenom) return;
        
        let presenceId = localStorage.getItem('stagiaire_presence_id');
        const now = new Date().toISOString();
        
        if (presenceId) {
            const { error } = await this.supabase.from('presences').update({
                last_seen_at: now
            }).eq('id', presenceId);
            
            if (error) {
                localStorage.removeItem('stagiaire_presence_id');
                this.updateHeartbeat();
            }
        } else {
            const { data } = await this.supabase.from('presences').insert({
                session_id: 1,
                prenom: this.prenom,
                last_seen_at: now
            }).select();
            
            if (data && data[0]) {
                localStorage.setItem('stagiaire_presence_id', data[0].id);
            }
        }
    }

    subscribeToSession() {
        if (!this.supabase) return;
        
        this.supabase.from('sessions').select('*').eq('id', 1).single().then(({ data }) => {
            if (data) this.syncToPresenterState(data);
        });

        this.sessionSubscription = this.supabase.channel('session-state-channel')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sessions', filter: 'id=eq.1' }, (payload) => {
            this.syncToPresenterState(payload.new);
        })
        .subscribe();

        // S'abonner aux présences pour voir la liste de la classe
        this.supabase.channel('presences-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'presences' }, () => {
            this.refreshPresenceList();
        })
        .subscribe();
        this.refreshPresenceList();
    }

    syncToPresenterState(data) {
        const themeId = data.active_theme_id;
        const slideIdx = data.active_slide_index;
        this.sessionState.show_results = data.show_results;

        // 1. Synchroniser le positionnement
        if (themeId === 'home') {
            if (this.currentThemeIndex !== -1) {
                this.currentThemeIndex = -1;
                this.currentSlideIndex = 0;
                this.showScreen('home');
            }
        } else {
            const themeIdx = THEMES.findIndex(t => t.id === themeId);
            if (themeIdx !== -1 && (this.currentThemeIndex !== themeIdx || this.currentSlideIndex !== slideIdx)) {
                this.currentThemeIndex = themeIdx;
                this.currentSlideIndex = slideIdx;
                this.showScreen('presentation');
                this.updateSidebarActiveState();
                this.renderSlide();
                this.updateProgressIndicator();
            }
        }

        // 2. Synchroniser le sondage ou quiz
        this.activePoll = null;
        this.activeExercise = null;

        if (data.active_poll_id) {
            if (data.active_poll_id.startsWith('test-idx-')) {
                const maxThemeIdx = parseInt(data.active_poll_id.replace('test-idx-', ''), 10);
                const testQuestions = INTERACTIVE_QUESTIONS.filter(q => {
                    const tIdx = THEMES.findIndex(t => t.id === q.themeId);
                    return tIdx >= 0 && tIdx <= maxThemeIdx;
                });
                const testObj = {
                    id: data.active_poll_id,
                    type: 'test-complet',
                    title: `Test Général (Thèmes 1 à ${maxThemeIdx + 1})`,
                    questions: testQuestions
                };
                this.activePoll = testObj;
                if (this.role === 'stagiaire') {
                    this.showStagiaireTestPanel(testObj, data.show_results);
                } else if (this.role === 'formateur') {
                    this.refreshFormateurPanel();
                }
            } else {
                const poll = INTERACTIVE_QUESTIONS.find(q => q.id === data.active_poll_id);
                if (poll) {
                    this.activePoll = poll;
                    if (this.role === 'stagiaire') {
                        this.showStagiairePollPanel(poll, data.show_results);
                    } else if (this.role === 'formateur') {
                        this.refreshFormateurPanel();
                    }
                }
            }
        } else if (data.active_exercise_id) {
            const ex = EXERCISES_DATABASE.find(e => e.id === data.active_exercise_id);
            if (ex) {
                this.activeExercise = ex;
                if (this.role === 'stagiaire') {
                    this.showStagiaireExercisePanel(ex, data.show_results);
                } else if (this.role === 'formateur') {
                    this.refreshFormateurPanel();
                }
            }
        } else {
            this.closeInteractivityPanel();
        }
    }

    closeInteractivityPanel() {
        document.getElementById('interactivity-panel').classList.remove('open');
    }

    async refreshFormateurPanel() {
        if (!this.supabase || this.role !== 'formateur') return;

        const panelTitle = document.getElementById('panel-title');
        const qSection = document.getElementById('panel-question-section');
        const actionsSection = document.getElementById('panel-actions-section');
        const resultsSection = document.getElementById('panel-results-section');
        const voteFormSection = document.getElementById('panel-vote-form-section');

        voteFormSection.style.display = 'none';

        if (this.activePoll && this.activePoll.type === 'test-complet') {
            panelTitle.innerText = this.activePoll.title;
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Test Composite Actif 📝</p>
                    <h4 style="margin: 0.5rem 0; font-size:1.05rem;">Questions incluses (${this.activePoll.questions.length})</h4>
                    <div style="max-height: 180px; overflow-y: auto; background: var(--bg-main); padding: 0.65rem; border-radius: 6px; font-size: 0.75rem; border: 1px solid var(--border-color); margin-top: 0.5rem;">
                        ${this.activePoll.questions.map((q, idx) => `
                            <div style="margin-bottom: 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <strong>Q${idx + 1}.</strong> ${this.escapeHtml(q.question)}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            actionsSection.style.display = 'flex';
            const btnToggle = document.getElementById('btn-panel-toggle-results');
            btnToggle.style.display = 'block';
            btnToggle.innerText = this.sessionState.show_results ? "Masquer les notes" : "Dévoiler les scores";
            btnToggle.onclick = () => this.toggleResultsVisibility();
            
            const btnStop = document.getElementById('btn-panel-stop');
            btnStop.innerText = "Clôturer le Test";
            btnStop.onclick = () => this.stopPoll();

            resultsSection.style.display = 'block';
            await this.loadTestResults(this.activePoll);
            return;
        }

        if (this.activeExercise) {
            panelTitle.innerText = `Atelier : ${this.activeExercise.title}`;
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Thème 12 • Exercice ${this.activeExercise.support === 'pc' ? '🖥️ PC' : '📝 Papier'}</p>
                    <h4 style="margin: 0.5rem 0; font-size:1.05rem;">${this.activeExercise.title}</h4>
                    <p style="font-size: 0.8rem; font-weight: 700; color: var(--accent-sky);">Objectif : ${this.activeExercise.objective}</p>
                    <div style="background: var(--bg-main); padding: 0.85rem; border-radius: 6px; font-size: 0.8rem; line-height: 1.4; border: 1px solid var(--border-color); margin-top: 0.5rem;">
                        ${this.activeExercise.instructions.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
            
            actionsSection.style.display = 'flex';
            document.getElementById('btn-panel-toggle-results').style.display = 'none';
            document.getElementById('btn-panel-stop').innerText = "Clôturer l'exercice";
            document.getElementById('btn-panel-stop').onclick = () => this.stopActiveExercise();

            resultsSection.style.display = 'block';
            await this.loadExerciseSubmissions();
            return;
        }

        const theme = this.currentThemeIndex === -1 ? null : THEMES[this.currentThemeIndex];
        const poll = theme ? INTERACTIVE_QUESTIONS.find(q => q.themeId === theme.id) : null;

        if (!poll) {
            panelTitle.innerText = "Sondages & Quiz";
            qSection.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted); font-style:italic;">Pas de sondage configuré pour ce Thème.</div>`;
            actionsSection.style.display = 'none';
            resultsSection.style.display = 'none';
            return;
        }

        panelTitle.innerText = poll.type === 'quiz' ? "Quiz de Validation 🎯" : "Sondage d'Opinion 📊";
        
        qSection.innerHTML = `
            <div class="poll-question-wrapper">
                <p class="poll-category">${theme.title}</p>
                <h4 style="margin:0.5rem 0; font-size: 1rem;">${poll.question}</h4>
                <div class="poll-options-preview" style="margin-top: 0.75rem;">
                    ${Object.entries(poll.options).map(([key, val]) => `
                        <div class="poll-preview-option" style="font-size:0.78rem; margin-bottom:0.35rem; color:var(--text-body);">
                            <strong style="color:var(--accent-blue)">${key} :</strong> ${val}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        if (!this.activePoll) {
            actionsSection.style.display = 'none';
            resultsSection.style.display = 'block';
            resultsSection.innerHTML = `
                <button class="btn btn-primary" id="btn-start-poll" style="width:100%; justify-content:center; margin-top:1rem; font-size:0.9rem; padding: 0.8rem;">🚀 Activer le Vote Stagiaires</button>
            `;
            document.getElementById('btn-start-poll').onclick = () => this.startPoll(poll);
        } else {
            actionsSection.style.display = 'flex';
            
            const btnToggle = document.getElementById('btn-panel-toggle-results');
            const btnStop = document.getElementById('btn-panel-stop');
            
            btnToggle.style.display = 'block';
            btnToggle.innerText = this.sessionState.show_results ? "Masquer les choix" : "Dévoiler les résultats";
            btnToggle.onclick = () => this.toggleResultsVisibility();
            
            btnStop.innerText = "Clôturer le Quiz";
            btnStop.onclick = () => this.stopPoll();

            resultsSection.style.display = 'block';
            await this.loadPollResults(poll);
        }
    }

    async startPoll(poll) {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activePoll = poll;
        this.sessionState.show_results = false;
        
        await this.supabase.from('votes').delete().eq('session_id', 1).eq('poll_id', poll.id);
        
        await this.supabase.from('sessions').update({
            active_poll_id: poll.id,
            show_results: false,
            active_exercise_id: null
        }).eq('id', 1);

        this.refreshFormateurPanel();
    }

    async stopPoll() {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activePoll = null;
        
        await this.supabase.from('sessions').update({
            active_poll_id: null,
            show_results: false
        }).eq('id', 1);

        this.refreshFormateurPanel();
    }

    async toggleResultsVisibility() {
        if (!this.supabase || this.role !== 'formateur') return;
        const nextShow = !this.sessionState.show_results;
        
        await this.supabase.from('sessions').update({
            show_results: nextShow
        }).eq('id', 1);
        
        this.sessionState.show_results = nextShow;
        this.refreshFormateurPanel();
    }

    async stopActiveExercise() {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activeExercise = null;
        
        await this.supabase.from('sessions').update({
            active_exercise_id: null,
            show_results: false
        }).eq('id', 1);

        this.refreshFormateurPanel();
    }

    async loadPollResults(poll) {
        if (!this.supabase) return;
        const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', poll.id);
        const votesList = votes || [];
        
        const votersCountSpan = document.getElementById('voters-count');
        const votersListDiv = document.getElementById('voters-names-list');
        
        votersCountSpan.innerText = votesList.length;
        votersListDiv.innerHTML = votesList.map(v => `
            <span class="voter-badge-name voted">✅ ${this.escapeHtml(v.prenom)}</span>
        `).join('');

        const resultsSection = document.getElementById('panel-results-section');
        
        if (this.sessionState.show_results) {
            const counts = { A: 0, B: 0, C: 0, D: 0 };
            votesList.forEach(v => {
                if (counts[v.reponse] !== undefined) counts[v.reponse]++;
            });

            const total = votesList.length || 1;
            
            resultsSection.innerHTML = `
                <div class="results-chart" style="margin-top: 1rem;">
                    ${Object.entries(poll.options).map(([key, label]) => {
                        const count = counts[key] || 0;
                        const pct = Math.round((count / total) * 100);
                        const isCorrect = poll.type === 'quiz' && poll.correct === key;
                        const barColor = isCorrect ? 'var(--accent-green)' : 'var(--accent-blue)';
                        const borderStyle = isCorrect ? 'border: 2px solid var(--accent-green);' : '';
                        
                        return `
                            <div class="results-chart-row" style="${borderStyle} padding: 0.4rem; border-radius: 4px; margin-bottom: 0.5rem; background: ${isCorrect ? 'rgba(16,185,129,0.05)' : 'transparent'};">
                                <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; margin-bottom:0.2rem;">
                                    <span>${key}. ${label}</span>
                                    <span>${count} vote${count > 1 ? 's' : ''} (${pct}%)</span>
                                </div>
                                <div style="background:#e2e8f0; height:8px; border-radius:100px; overflow:hidden;">
                                    <div style="background:${barColor}; height:100%; width:${pct}%; transition:width 0.5s ease;"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                ${poll.type === 'quiz' && poll.explanation ? `
                    <div style="background:rgba(0,86,179,0.05); padding:0.75rem; border-radius:6px; font-size:0.78rem; border-left:3px solid var(--accent-blue); margin-top:0.75rem; line-height:1.4;">
                        <strong>Explication :</strong> ${poll.explanation}
                    </div>
                ` : ''}
            `;
        } else {
            resultsSection.innerHTML = `
                <div style="text-align:center; padding:1.5rem; background:var(--bg-main); border:1px dashed var(--border-color); border-radius:6px; color:var(--text-muted); font-size:0.82rem; font-style:italic; margin-top:1rem;">
                    🔒 Les choix des réponses sont masqués. <br>Attente du formateur pour révéler les statistiques détaillées.
                </div>
            `;
        }
    }

    async loadExerciseSubmissions() {
        if (!this.supabase || !this.activeExercise) return;
        const pollId = `ex-${this.activeExercise.id}`;
        
        const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', pollId);
        const submissions = votes || [];

        const votersCountSpan = document.getElementById('voters-count');
        const votersListDiv = document.getElementById('voters-names-list');
        
        votersCountSpan.innerText = submissions.length;
        votersListDiv.innerHTML = submissions.map(s => `
            <span class="voter-badge-name voted">✅ ${this.escapeHtml(s.prenom)}</span>
        `).join('');

        const resultsSection = document.getElementById('panel-results-section');

        if (this.activeExercise.support === 'pc') {
            if (submissions.length === 0) {
                resultsSection.innerHTML = `
                    <div style="text-align:center; padding:2rem; color:var(--text-muted); font-style:italic; font-size:0.82rem;">
                        En attente des soumissions des stagiaires (Prompts)...
                    </div>
                `;
            } else {
                resultsSection.innerHTML = `
                    <h4 style="font-size:0.8rem; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-muted);">Propositions des stagiaires :</h4>
                    <div class="submissions-grid" style="display:flex; flex-direction:column; gap:0.65rem; max-height:260px; overflow-y:auto;">
                        ${submissions.map(sub => `
                            <div class="submission-item-card" style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:6px; padding:0.6rem 0.85rem; box-shadow:var(--shadow-sm);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
                                    <strong style="font-size:0.78rem; color:var(--accent-blue)">👤 ${this.escapeHtml(sub.prenom)}</strong>
                                    <span style="font-size:0.65rem; color:var(--text-muted);">${new Date(sub.created_at).toLocaleTimeString()}</span>
                                </div>
                                <pre style="background:white; border:1px solid var(--border-color); padding:0.5rem; border-radius:4px; font-family:monospace; font-size:0.74rem; white-space:pre-wrap; color:var(--text-body); margin:0;">${this.escapeHtml(sub.reponse)}</pre>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        } else {
            const completedCount = submissions.length;
            resultsSection.innerHTML = `
                <div style="text-align:center; padding:1.5rem; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.15); border-radius:6px; margin-top:1rem;">
                    <div style="font-size:1.5rem; margin-bottom:0.5rem;">📝👥 Papier</div>
                    <p style="font-size:0.8rem; line-height:1.4; color:var(--text-body); margin:0;">
                        Exercice à réaliser individuellement ou en groupe sur feuille.<br>
                        <strong>${completedCount}</strong> stagiaire${completedCount > 1 ? 's ont' : ' a'} validé la fin de l'exercice sur smartphone.
                    </p>
                </div>
            `;
        }
    }

    async launchLiveExercise(ex) {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activeExercise = ex;
        this.activePoll = null;
        
        const pollId = `ex-${ex.id}`;
        await this.supabase.from('votes').delete().eq('session_id', 1).eq('poll_id', pollId);
        
        await this.supabase.from('sessions').update({
            active_exercise_id: ex.id,
            active_poll_id: null,
            show_results: false
        }).eq('id', 1);

        const panel = document.getElementById('interactivity-panel');
        panel.classList.add('open');
        this.refreshFormateurPanel();
    }

    listenToPresenceAndVotes() {
        if (!this.supabase) return;
        
        if (this.votesSubscription) this.supabase.removeChannel(this.votesSubscription);

        this.votesSubscription = this.supabase.channel('votes-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'votes' }, () => {
            if (this.activePoll) {
                if (this.activePoll.type === 'test-complet') {
                    this.loadTestResults(this.activePoll);
                } else {
                    this.loadPollResults(this.activePoll);
                }
            } else if (this.activeExercise) {
                this.loadExerciseSubmissions();
            }
        })
        .subscribe();

        // Écouter les présences stagiaires
        this.supabase.channel('presences-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'presences' }, () => {
            this.refreshPresenceList();
        })
        .subscribe();
        this.refreshPresenceList();
    }

    async refreshPresenceList() {
        if (!this.supabase) return;
        const { data } = await this.supabase.from('presences').select('prenom');
        if (data) {
            const countEl = document.getElementById('voters-count');
            const listEl = document.getElementById('voters-names-list');
            if (countEl) countEl.innerText = data.length;
            if (listEl) {
                listEl.innerHTML = data.map(p => `<span class="voter-badge-name">👤 ${this.escapeHtml(p.prenom)}</span>`).join('');
            }
        }
    }

    async showStagiairePollPanel(poll, showResults) {
        const panel = document.getElementById('interactivity-panel');
        panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        panelTitle.innerText = poll.type === 'quiz' ? "Quiz de Validation 🎯" : "Sondage d'Opinion 📊";

        const qSection = document.getElementById('panel-question-section');
        qSection.innerHTML = `
            <div class="poll-question-wrapper">
                <h4 style="margin: 0.5rem 0; font-size:0.95rem; line-height: 1.45;">${poll.question}</h4>
            </div>
        `;

        const voteFormSection = document.getElementById('panel-vote-form-section');
        const resultsSection = document.getElementById('panel-results-section');
        
        // Charger mon vote
        const { data: myVote } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', poll.id).eq('prenom', this.prenom).maybeSingle();

        if (!myVote) {
            voteFormSection.style.display = 'block';
            resultsSection.style.display = 'none';
            
            const optionsGrid = document.getElementById('vote-options-grid');
            optionsGrid.innerHTML = Object.entries(poll.options).map(([key, label]) => `
                <button class="btn-vote-option" data-key="${key}">
                    <span class="option-key">${key}</span>
                    <span class="option-label">${label}</span>
                </button>
            `).join('');

            optionsGrid.querySelectorAll('.btn-vote-option').forEach(btn => {
                btn.onclick = async () => {
                    const key = btn.dataset.key;
                    const isCorrect = poll.type === 'quiz' ? (key === poll.correct) : null;
                    await this.supabase.from('votes').insert({
                        session_id: 1,
                        poll_id: poll.id,
                        prenom: this.prenom,
                        reponse: key,
                        is_correct: isCorrect
                    });
                    this.showStagiairePollPanel(poll, showResults);
                };
            });
        } else {
            voteFormSection.style.display = 'none';
            resultsSection.style.display = 'block';
            
            if (showResults) {
                const counts = { A: 0, B: 0, C: 0, D: 0 };
                const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', poll.id);
                const votesList = allVotes || [];
                votesList.forEach(v => { if (counts[v.reponse] !== undefined) counts[v.reponse]++; });
                
                const total = votesList.length || 1;
                const myChoice = myVote.reponse;
                
                let scoreHtml = '';
                if (poll.type === 'quiz') {
                    const isCorrect = myChoice === poll.correct;
                    scoreHtml = isCorrect ? `
                        <div class="score-banner correct" style="background:#f0fdf4; border:1px solid #bbf7d0; color:#14532d; padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">🎉 Bravo, c'est correct ! (Réponse : ${myChoice})</div>
                    ` : `
                        <div class="score-banner incorrect" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">❌ Incorrect... La bonne réponse était ${poll.correct} (Votre réponse : ${myChoice})</div>
                    `;
                } else {
                    scoreHtml = `<div class="score-banner general" style="background:var(--bg-main); border:1px solid var(--border-color); padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">Votre vote a été pris en compte : ${myChoice}</div>`;
                }

                resultsSection.innerHTML = `
                    ${scoreHtml}
                    <div class="results-chart">
                        ${Object.entries(poll.options).map(([key, label]) => {
                            const count = counts[key] || 0;
                            const pct = Math.round((count / total) * 100);
                            const isCorrect = poll.type === 'quiz' && poll.correct === key;
                            const barColor = isCorrect ? 'var(--accent-green)' : (key === myChoice ? 'var(--accent-purple)' : 'var(--accent-blue)');
                            
                            return `
                                <div class="results-chart-row" style="margin-bottom:0.5rem;">
                                    <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; margin-bottom:0.2rem;">
                                        <span>${key}. ${label}</span>
                                        <span>${count} vote${count > 1 ? 's' : ''} (${pct}%)</span>
                                    </div>
                                    <div style="background:#e2e8f0; height:6px; border-radius:100px; overflow:hidden;">
                                        <div style="background:${barColor}; height:100%; width:${pct}%; transition:width 0.5s ease;"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            } else {
                resultsSection.innerHTML = `
                    <div style="text-align:center; padding:1.5rem; background:var(--bg-main); border:1px dashed var(--border-color); border-radius:6px; color:var(--text-muted); font-size:0.8rem;">
                        🚀 Votre réponse (<strong>Option ${myVote.reponse}</strong>) a bien été envoyée ! <br>
                        <span style="font-size:0.72rem; font-style:italic; display:inline-block; margin-top:0.4rem;">En attente de la fin des votes par le formateur pour afficher les résultats de la classe.</span>
                    </div>
                `;
            }
        }
    }

    async showStagiaireExercisePanel(ex, showResults) {
        const panel = document.getElementById('interactivity-panel');
        panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        panelTitle.innerText = `Atelier : ${ex.title}`;

        const qSection = document.getElementById('panel-question-section');
        qSection.innerHTML = `
            <div class="poll-question-wrapper">
                <p class="poll-category">Thème 12 • Exercice ${ex.support === 'pc' ? '🖥️ PC' : '📝 Papier'}</p>
                <h4 style="margin: 0.4rem 0; font-size:0.95rem;">${ex.title}</h4>
                <p style="font-size: 0.78rem; font-style:italic; line-height: 1.45; border-top:1px solid #e2e8f0; padding-top:0.5rem; margin-top:0.5rem; color:var(--text-body);">
                    ${ex.instructions.replace(/\n/g, '<br>')}
                </p>
            </div>
        `;

        const voteFormSection = document.getElementById('panel-vote-form-section');
        const resultsSection = document.getElementById('panel-results-section');
        
        voteFormSection.style.display = 'none';

        const pollId = `ex-${ex.id}`;
        const { data: mySub } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', pollId).eq('prenom', this.prenom).maybeSingle();

        if (!mySub) {
            resultsSection.style.display = 'block';
            if (ex.support === 'pc') {
                resultsSection.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
                        <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">Saisissez votre proposition (Prompt ou texte) :</label>
                        <textarea id="ex-student-input" placeholder="Rédigez votre réponse ici..." style="width:100%; height:90px; border:1px solid var(--border-color); border-radius:4px; padding:0.5rem; font-size:0.8rem; resize:none; outline:none; font-family:sans-serif;"></textarea>
                        <div id="ex-student-error" style="color:var(--accent-red); font-size:0.7rem; font-weight:700;"></div>
                        <button id="btn-submit-ex" class="btn btn-primary" style="justify-content:center; margin-top: 0.25rem;">Soumettre ma réponse</button>
                    </div>
                `;
                
                document.getElementById('btn-submit-ex').onclick = async () => {
                    const textVal = document.getElementById('ex-student-input').value.trim();
                    if (!textVal) {
                        document.getElementById('ex-student-error').innerText = "Veuillez saisir votre proposition.";
                        return;
                    }
                    
                    await this.supabase.from('votes').insert({
                        session_id: 1,
                        poll_id: pollId,
                        prenom: this.prenom,
                        reponse: textVal
                    });
                    
                    this.showStagiaireExercisePanel(ex, showResults);
                };
            } else {
                resultsSection.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.75rem; text-align:center;">
                        <p style="font-size:0.78rem; color:var(--text-body);">Réalisez cet exercice sur papier/tableau avec votre groupe.</p>
                        <button id="btn-submit-ex-paper" class="btn btn-primary" style="justify-content:center; padding: 0.8rem 1.5rem; margin-top: 0.5rem;">✅ J'ai terminé l'exercice !</button>
                    </div>
                `;
                
                document.getElementById('btn-submit-ex-paper').onclick = async () => {
                    await this.supabase.from('votes').insert({
                        session_id: 1,
                        poll_id: pollId,
                        prenom: this.prenom,
                        reponse: "Terminé sur papier"
                    });
                    this.showStagiaireExercisePanel(ex, showResults);
                };
            }
        } else {
            resultsSection.style.display = 'block';
            resultsSection.innerHTML = `
                <div style="text-align:center; padding:1rem; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.15); border-radius:6px; color:#14532d; font-size:0.8rem; font-weight:700;">
                    🎯 Votre participation a bien été enregistrée ! <br>
                    <span style="font-size:0.72rem; color:var(--text-muted); font-weight:normal; display:inline-block; margin-top:0.25rem;">Attente de la correction par le formateur.</span>
                </div>
                ${ex.support === 'pc' ? `
                    <div style="margin-top:0.75rem;">
                        <label style="font-size:0.7rem; font-weight:700; color:var(--text-muted);">Votre réponse soumise :</label>
                        <pre style="background:var(--bg-main); border:1px solid var(--border-color); padding:0.5rem; border-radius:4px; font-family:monospace; font-size:0.74rem; white-space:pre-wrap; color:var(--text-body); margin:0; max-height: 80px; overflow-y:auto;">${this.escapeHtml(mySub.reponse)}</pre>
                    </div>
                ` : ''}
            `;
        }
    }

    async startGeneralTest(maxThemeIdx) {
        if (!this.supabase || this.role !== 'formateur') return;
        const testId = 'test-idx-' + maxThemeIdx;
        
        const testQuestions = INTERACTIVE_QUESTIONS.filter(q => {
            const tIdx = THEMES.findIndex(t => t.id === q.themeId);
            return tIdx >= 0 && tIdx <= maxThemeIdx;
        });
        const questionIds = testQuestions.map(q => q.id);
        
        if (questionIds.length > 0) {
            await this.supabase.from('votes').delete().eq('session_id', 1).in('poll_id', questionIds);
        }
        
        this.sessionState.show_results = false;
        
        await this.supabase.from('sessions').update({
            active_poll_id: testId,
            show_results: false,
            active_exercise_id: null
        }).eq('id', 1);

        this.refreshFormateurPanel();
    }

    async loadTestResults(testObj) {
        if (!this.supabase) return;
        
        const questionIds = testObj.questions.map(q => q.id);
        const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', 1).in('poll_id', questionIds);
        const votesList = votes || [];
        
        const voterData = {};
        votesList.forEach(v => {
            if (!voterData[v.prenom]) {
                voterData[v.prenom] = {
                    prenom: v.prenom,
                    answered: 0,
                    correct: 0,
                    votes: {}
                };
            }
            voterData[v.prenom].answered++;
            voterData[v.prenom].votes[v.poll_id] = v.reponse;
            if (v.is_correct) {
                voterData[v.prenom].correct++;
            }
        });

        const totalQuestions = testObj.questions.length;
        const voters = Object.values(voterData);
        const completedCount = voters.filter(v => v.answered >= totalQuestions).length;

        const votersCountSpan = document.getElementById('voters-count');
        const votersListDiv = document.getElementById('voters-names-list');
        
        if (votersCountSpan) votersCountSpan.innerText = `${completedCount}/${voters.length}`;
        if (votersListDiv) {
            votersListDiv.innerHTML = voters.map(v => {
                const isCompleted = v.answered >= totalQuestions;
                const scoreText = this.sessionState.show_results ? ` (${v.correct}/${totalQuestions})` : ` (${v.answered}/${totalQuestions})`;
                const badgeClass = isCompleted ? 'voter-badge-name voted' : 'voter-badge-name';
                const icon = isCompleted ? '✅' : '⏳';
                return `<span class="${badgeClass}">${icon} ${this.escapeHtml(v.prenom)}${scoreText}</span>`;
            }).join('');
        }

        const resultsSection = document.getElementById('panel-results-section');
        if (!resultsSection) return;
        
        if (this.sessionState.show_results) {
            let html = `<div class="test-detailed-results" style="margin-top: 1rem; max-height: 400px; overflow-y: auto; padding-right: 5px;">`;
            
            testObj.questions.forEach((q, idx) => {
                const qVotes = votesList.filter(v => v.poll_id === q.id);
                const counts = { A: 0, B: 0, C: 0, D: 0 };
                qVotes.forEach(v => {
                    if (counts[v.reponse] !== undefined) counts[v.reponse]++;
                });
                
                const qTotal = qVotes.length || 1;
                
                html += `
                    <div class="test-question-result" style="border: 1px solid var(--border-color); background: rgba(255,255,255,0.02); border-radius: 6px; padding: 0.65rem; margin-bottom: 0.75rem; text-align: left;">
                        <div style="font-size: 0.76rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--accent-sky);">
                            Q${idx + 1}. ${this.escapeHtml(q.question)}
                        </div>
                        <div class="options-chart" style="display:flex; flex-direction:column; gap:0.25rem;">
                            ${Object.entries(q.options).map(([key, label]) => {
                                const count = counts[key] || 0;
                                const pct = Math.round((count / qTotal) * 100);
                                const isCorrect = q.type === 'quiz' && q.correct === key;
                                const barColor = isCorrect ? 'var(--accent-green)' : 'var(--accent-blue)';
                                const textWeight = isCorrect ? 'bold' : 'normal';
                                const checkIcon = isCorrect ? '🟢' : '';
                                
                                return `
                                    <div style="font-size: 0.68rem; line-height: 1.3;">
                                        <div style="display:flex; justify-content:space-between; font-weight:${textWeight}; margin-bottom: 0.1rem;">
                                            <span>${checkIcon} <strong>${key}</strong>: ${label}</span>
                                            <span>${count} vote${count > 1 ? 's' : ''} (${pct}%)</span>
                                        </div>
                                        <div style="background: rgba(255,255,255,0.05); height: 4px; border-radius: 4px; overflow: hidden; margin-bottom: 0.2rem;">
                                            <div style="background: ${barColor}; height: 100%; width: ${pct}%;"></div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
            resultsSection.innerHTML = html;
        } else {
            resultsSection.innerHTML = `
                <div style="text-align:center; padding:1.5rem; background:var(--bg-main); border:1px dashed var(--border-color); border-radius:6px; color:var(--text-muted); font-size:0.82rem; font-style:italic; margin-top:1rem;">
                    🔒 Les scores détaillés du test sont masqués. <br>Attente du formateur pour dévoiler les résultats de la classe.
                </div>
            `;
        }
    }

    async showStagiaireTestPanel(testObj, showResults) {
        const panel = document.getElementById('interactivity-panel');
        if (panel) panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        if (panelTitle) panelTitle.innerText = testObj.title;

        const qSection = document.getElementById('panel-question-section');
        if (qSection) {
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Test Général 📝</p>
                    <h4 style="margin: 0.3rem 0; font-size:0.95rem; line-height:1.4;">Répondez à l'ensemble des questions ci-dessous pour valider votre test.</h4>
                </div>
            `;
        }

        const voteFormSection = document.getElementById('panel-vote-form-section');
        const resultsSection = document.getElementById('panel-results-section');
        
        if (voteFormSection) voteFormSection.style.display = 'none';
        if (!resultsSection) return;
        resultsSection.style.display = 'block';

        const questionIds = testObj.questions.map(q => q.id);
        const { data: myVotes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('prenom', this.prenom).in('poll_id', questionIds);
        const myVotesList = myVotes || [];
        
        const myVotesMap = {};
        myVotesList.forEach(v => {
            myVotesMap[v.poll_id] = v.reponse;
        });

        const answeredCount = myVotesList.length;
        const totalCount = testObj.questions.length;
        const isCompleted = answeredCount >= totalCount;

        if (!isCompleted) {
            let html = `
                <div style="margin-bottom: 0.75rem; font-size: 0.78rem; font-weight: 700; color: var(--accent-sky); display:flex; justify-content:space-between; align-items:center;">
                    <span>Progression :</span>
                    <span>${answeredCount} / ${totalCount} questions répondues</span>
                </div>
                <div class="progress-track" style="background: rgba(255,255,255,0.05); height: 6px; border-radius: 3px; margin-bottom: 1rem; overflow:hidden;">
                    <div style="background: var(--accent-blue); height:100%; width: ${(answeredCount / totalCount) * 100}%; transition: width 0.3s ease;"></div>
                </div>
                <div class="stagiaire-test-questions" style="max-height: 380px; overflow-y: auto; display:flex; flex-direction:column; gap:0.85rem; padding-right:5px; text-align: left;">
            `;

            testObj.questions.forEach((q, idx) => {
                const myAnswer = myVotesMap[q.id];
                const hasAnsweredQ = !!myAnswer;
                
                html += `
                    <div class="test-question-card" style="background: rgba(255,255,255,0.03); border: 1px solid ${hasAnsweredQ ? 'rgba(16,185,129,0.15)' : 'var(--border-color)'}; border-radius: 6px; padding: 0.65rem;">
                        <div style="font-size:0.78rem; font-weight:700; color:#f8fafc; margin-bottom: 0.4rem;">
                            Q${idx + 1}. ${this.escapeHtml(q.question)}
                        </div>
                        
                        ${hasAnsweredQ ? `
                            <div style="font-size: 0.74rem; color: var(--accent-green); font-weight: 600; display:flex; align-items:center; gap:0.25rem;">
                                <span>✅ Votre réponse :</span>
                                <strong style="background:rgba(16,185,129,0.1); padding: 2px 6px; border-radius:4px;">${myAnswer}. ${this.escapeHtml(q.options[myAnswer])}</strong>
                            </div>
                        ` : `
                            <div style="display:flex; flex-direction:column; gap:0.35rem; margin-top:0.5rem;">
                                ${Object.entries(q.options).map(([key, label]) => `
                                    <button class="btn-vote-option btn-vote-option-sm" data-qid="${q.id}" data-key="${key}" style="padding: 0.45rem 0.65rem; font-size: 0.75rem; border-radius: 6px; text-align: left; display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; cursor: pointer; transition: all 0.15s ease;">
                                        <span class="option-key" style="background:var(--accent-blue); color:white; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; font-weight:800; font-size:0.65rem; flex-shrink:0;">${key}</span>
                                        <span class="option-label">${this.escapeHtml(label)}</span>
                                    </button>
                                `).join('')}
                            </div>
                        `}
                    </div>
                `;
            });

            html += `</div>`;
            resultsSection.innerHTML = html;

            resultsSection.querySelectorAll('.btn-vote-option').forEach(btn => {
                btn.onclick = async () => {
                    const qid = btn.dataset.qid;
                    const key = btn.dataset.key;
                    const question = testObj.questions.find(q => q.id === qid);
                    const isCorrect = question.type === 'quiz' ? (key === question.correct) : null;
                    
                    await this.supabase.from('votes').insert({
                        session_id: 1,
                        poll_id: qid,
                        prenom: this.prenom,
                        reponse: key,
                        is_correct: isCorrect
                    });
                    
                    this.showStagiaireTestPanel(testObj, showResults);
                };
            });
        } else {
            if (showResults) {
                let score = 0;
                myVotesList.forEach(v => {
                    if (v.is_correct) score++;
                });

                let scoreBannerHtml = `
                    <div class="score-banner" style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); color:#34d399; padding:0.75rem; border-radius:6px; font-weight:700; font-size:0.85rem; text-align:center; margin-bottom:1rem;">
                        🎉 Test terminé ! Votre score : ${score} / ${totalCount} réponses correctes
                    </div>
                `;

                let html = `
                    ${scoreBannerHtml}
                    <div class="test-detailed-results" style="max-height: 380px; overflow-y: auto; display:flex; flex-direction:column; gap:0.75rem; padding-right:5px; text-align: left;">
                `;

                testObj.questions.forEach((q, idx) => {
                    const myAnswer = myVotesMap[q.id];
                    const isCorrect = myAnswer === q.correct;
                    
                    html += `
                        <div class="test-question-card" style="background: rgba(255,255,255,0.03); border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; border-radius: 6px; padding: 0.65rem;">
                            <div style="font-size:0.78rem; font-weight:700; color:#f8fafc; margin-bottom: 0.4rem;">
                                Q${idx + 1}. ${this.escapeHtml(q.question)}
                            </div>
                            
                            <div style="font-size: 0.72rem; line-height: 1.4;">
                                <div style="display:flex; justify-content:space-between; margin-bottom: 0.2rem; font-weight: 600;">
                                    <span style="color: ${isCorrect ? '#34d399' : '#f87171'};">
                                        ${isCorrect ? '✅' : '❌'} Votre choix : ${myAnswer}
                                    </span>
                                    ${!isCorrect ? `<span style="color: #34d399;">Correction : ${q.correct}</span>` : ''}
                                </div>
                                <div style="color: var(--text-muted); font-size: 0.7rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.25rem; margin-top: 0.25rem;">
                                    <strong>Explication:</strong> ${this.escapeHtml(q.explanation)}
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += `</div>`;
                resultsSection.innerHTML = html;
            } else {
                resultsSection.innerHTML = `
                    <div style="text-align:center; padding:1.5rem; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.15); border-radius:6px; color:#34d399; font-size:0.8rem; font-weight:700; margin-top:1rem;">
                        🚀 Test terminé ! Vos réponses ont été envoyées. <br>
                        <span style="font-size:0.72rem; color:var(--text-muted); font-weight:normal; display:inline-block; margin-top:0.4rem;">En attente de la fin des votes par le formateur pour afficher votre score et les corrections détaillées.</span>
                    </div>
                `;
            }
        }
    }
}

// Instantiate App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TrainingApp();
});
