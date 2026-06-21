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
        this.revealState = 'hidden';

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
        if (typeof getSlideHTML === 'function') {
            html += getSlideHTML.call(this, slide, theme);
        } else {
            html += `<p style='color:var(--accent-red)'>Erreur : Module de rendu des slides non chargé.</p>`;
        }

        if (this.role === 'formateur') {
            const theme = THEMES[this.currentThemeIndex];
            const poll = INTERACTIVE_QUESTIONS.find(q => q.themeId === theme.id);
            
            html += `
                <div class="slide-interactivity-controls">
                    <span class="controls-label">Console Formateur 🔐 :</span>
                    ${poll ? `
                        <button class="btn btn-sm btn-control-poll" id="btn-slide-launch-poll">
                            📊 Lancer le Quiz de ce Thème
                        </button>
                    ` : ''}
                    <button class="btn btn-sm btn-control-test" id="btn-slide-launch-test">
                        📝 Lancer un Test Général (Thèmes 1 à ${this.currentThemeIndex + 1})
                    </button>
                    <button class="btn btn-sm btn-control-free" id="btn-slide-launch-free-test">
                        ✏️ Lancer un Test Libre
                    </button>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        this.slideContainer.innerHTML = html;

        // Auto-render LaTeX math formulas if KaTeX is loaded
        if (window.renderMathInElement) {
            window.renderMathInElement(this.slideContainer, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\[', display: true}
                ],
                throwOnError : false
            });
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
                        <div class="pipeline-file-item" style="color:var(--accent-sky); font-weight:700;">📄 signalement_[NOM_1].txt</div>
                        <div class="pipeline-file-item" style="color:var(--accent-sky); font-weight:700;">📄 demande_aide_[NOM_2].pdf</div>
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
            if (this.role === 'stagiaire' || this.role === 'public') {
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
        document.body.classList.add('role-' + this.role);
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
            btnClosePanel.onclick = async () => {
                document.getElementById('interactivity-panel').classList.remove('open');
                if (this.role === 'formateur') {
                    if (this.activePoll) {
                        await this.stopPoll();
                    } else if (this.activeExercise) {
                        await this.stopActiveExercise();
                    }
                }
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
            
            let baseUrl = window.location.origin + window.location.pathname;
            if (baseUrl.startsWith('file:') || baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
                baseUrl = 'https://lecontrole.fr/';
            }
            if (!baseUrl.endsWith('/') && !baseUrl.endsWith('.html')) {
                baseUrl += '/';
            }
            const joinUrl = baseUrl + '?role=stagiaire';
            
            document.getElementById('live-session-url').href = joinUrl;
            document.getElementById('live-session-url').innerText = joinUrl;
            document.getElementById('live-session-qr').src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(joinUrl);
        }

        // Afficher le bouton flottant de contrôle des votes
        const btnFloating = document.getElementById('btn-floating-poll');
        if (btnFloating) {
            btnFloating.style.display = 'flex';
            btnFloating.onclick = async () => {
                const panel = document.getElementById('interactivity-panel');
                const willOpen = !panel.classList.contains('open');
                if (willOpen) {
                    panel.classList.add('open');
                    
                    // Auto-start poll if we are on a theme with a quiz and nothing is active
                    if (!this.activePoll && !this.activeExercise) {
                        const theme = this.currentThemeIndex === -1 ? null : THEMES[this.currentThemeIndex];
                        const poll = theme ? INTERACTIVE_QUESTIONS.find(q => q.themeId === theme.id) : null;
                        if (poll) {
                            await this.startPoll(poll);
                        }
                    }
                    this.refreshFormateurPanel();
                } else {
                    panel.classList.remove('open');
                    // Auto-stop active poll or exercise when closing
                    if (this.activePoll) {
                        await this.stopPoll();
                    } else if (this.activeExercise) {
                        await this.stopActiveExercise();
                    }
                }
            };
        }

        // Afficher le tableau de bord formateur d'accueil
        const formateurDashboard = document.getElementById('formateur-dashboard-container');
        if (formateurDashboard) {
            formateurDashboard.style.display = 'block';
        }

        // Activer le bouton de réinitialisation de session sur la page d'accueil
        const btnHomeReset = document.getElementById('btn-home-reset-session');
        if (btnHomeReset) {
            btnHomeReset.onclick = async () => {
                if (confirm("Êtes-vous sûr de vouloir réinitialiser la session ? Cela déconnectera tous les stagiaires et supprimera tous les votes de la session courante.")) {
                    if (this.supabase) {
                        // Supprimer tous les votes pour la session 1
                        await this.supabase.from('votes').delete().eq('session_id', 1);
                        // Supprimer toutes les présences pour la session 1
                        await this.supabase.from('presences').delete().eq('session_id', 1);
                        // Réinitialiser la session en base de données
                        await this.supabase.from('sessions').update({
                            active_poll_id: null,
                            active_exercise_id: null,
                            show_results: false
                        }).eq('id', 1);
                    }
                    this.activePoll = null;
                    this.activeExercise = null;
                    this.sessionState.show_results = false;
                    const panel = document.getElementById('interactivity-panel');
                    if (panel) panel.classList.remove('open');
                    this.refreshFormateurPanel();
                    this.refreshPresenceList();
                }
            };
        }

        // Nettoyage périodique des absences (stagiaires déconnectés depuis 5 minutes pour éviter les déconnexions en arrière-plan)
        const cleanOldPresences = async () => {
            if (!this.supabase) return;
            const cutoff = new Date(Date.now() - 300 * 1000).toISOString();
            await this.supabase.from('presences').delete().lt('last_seen_at', cutoff);
        };
        cleanOldPresences();
        setInterval(cleanOldPresences, 15000);

        this.selectSlide = ((originalSelectSlide) => {
            return (themeIdx, slideIdx) => {
                // Clear active states and reset reveal state on slide change
                this.activePoll = null;
                this.activeExercise = null;
                this.revealState = 'hidden';
                
                // Fermer le panneau sur changement de slide
                const panel = document.getElementById('interactivity-panel');
                if (panel) panel.classList.remove('open');
                
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

        // Mettre à jour immédiatement la présence dès que l'onglet redevient actif/visible
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.updateHeartbeat();
            }
        });

        // S'abonner aux changements de sessions du formateur
        this.subscribeToSession();
        this.listenToPresenceAndVotes();
    }

    setupPublicMode() {
        console.log("Mode public actif.");
        this.renderSidebar();
        this.themesGrid.innerHTML = '';
        this.renderHomeDashboard();
        this.subscribeToSession();
        this.listenToPresenceAndVotes();
    }

    async syncSessionState() {
        if (!this.supabase || this.role !== 'formateur') return;
        const theme = this.currentThemeIndex === -1 ? null : THEMES[this.currentThemeIndex];
        const activeThemeId = theme ? theme.id : 'home';

        // Charger l'état actuel de show_results pour conserver la valeur en base de données
        const { data } = await this.supabase.from('sessions').select('show_results').eq('id', 1).single();
        const showResults = data ? data.show_results : false;
        this.sessionState.show_results = showResults;

        let activePollIdVal = null;
        if (this.activePoll) {
            const suffix = this.revealState === 'answer' ? ':answer' : (this.revealState === 'votes' ? ':votes' : '');
            activePollIdVal = `${this.activePoll.id}${suffix}`;
        }

        await this.supabase.from('sessions').update({
            active_theme_id: activeThemeId,
            active_slide_index: this.currentSlideIndex,
            active_poll_id: activePollIdVal,
            active_exercise_id: this.activeExercise ? this.activeExercise.id : null,
            show_results: this.activePoll || this.activeExercise ? showResults : false
        }).eq('id', 1);
    }

    async updateHeartbeat() {
        if (!this.supabase || this.role !== 'stagiaire' || !this.prenom) return;
        
        let presenceId = localStorage.getItem('stagiaire_presence_id');
        const now = new Date().toISOString();
        
        if (presenceId) {
            const { data, error } = await this.supabase.from('presences').update({
                last_seen_at: now
            }).eq('id', presenceId).select();
            
            if (error || !data || data.length === 0) {
                // L'utilisateur a été supprimé par le formateur
                localStorage.removeItem('stagiaire_presence_id');
                localStorage.removeItem('stagiaire_prenom');
                window.location.reload();
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
        
        // Listen to browser network changes for offline fallback
        window.addEventListener('offline', () => {
            const cached = localStorage.getItem('last_known_session_state');
            if (cached) {
                this.syncToPresenterState(JSON.parse(cached));
            }
        });
        
        this.supabase.from('sessions').select('*').eq('id', 1).single().then(({ data }) => {
            if (data) {
                localStorage.setItem('last_known_session_state', JSON.stringify(data));
                this.syncToPresenterState(data);
            }
        }).catch(() => {
            const cached = localStorage.getItem('last_known_session_state');
            if (cached) {
                this.syncToPresenterState(JSON.parse(cached));
            }
        });

        this.sessionSubscription = this.supabase.channel('session-state-channel')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sessions', filter: 'id=eq.1' }, (payload) => {
            if (payload.new) {
                localStorage.setItem('last_known_session_state', JSON.stringify(payload.new));
                this.syncToPresenterState(payload.new);
            }
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
        this.revealState = 'hidden';

        let activePollId = data.active_poll_id;
        let zoomedPrenom = null;

        if (activePollId && activePollId.includes(':zoom:')) {
            const zoomParts = activePollId.split(':zoom:');
            const pollIdAndReveal = zoomParts[0];
            zoomedPrenom = zoomParts[1];
            
            if (pollIdAndReveal.includes(':')) {
                const parts = pollIdAndReveal.split(':');
                activePollId = parts[0];
                this.revealState = parts[1];
            } else {
                activePollId = pollIdAndReveal;
                this.revealState = 'hidden';
            }
        } else if (activePollId && activePollId.startsWith('exercise-zoom:')) {
            zoomedPrenom = activePollId.replace('exercise-zoom:', '');
            activePollId = null;
            this.revealState = 'hidden';
        } else if (activePollId && activePollId.includes(':')) {
            const parts = activePollId.split(':');
            activePollId = parts[0];
            this.revealState = parts[1];
        } else if (activePollId) {
            this.revealState = data.show_results ? 'answer' : 'hidden';
        }

        if (activePollId) {
            if (activePollId.startsWith('test-idx-')) {
                const maxThemeIdx = parseInt(activePollId.replace('test-idx-', ''), 10);
                const testQuestions = INTERACTIVE_QUESTIONS.filter(q => {
                    const tIdx = THEMES.findIndex(t => t.id === q.themeId);
                    return tIdx >= 0 && tIdx <= maxThemeIdx;
                });
                const testObj = {
                    id: activePollId,
                    type: 'test-complet',
                    title: `Test Général (Thèmes 1 à ${maxThemeIdx + 1})`,
                    questions: testQuestions
                };
                this.activePoll = testObj;
                if (this.role === 'stagiaire') {
                    this.showStagiaireTestPanel(testObj, this.revealState);
                } else if (this.role === 'formateur') {
                    this.refreshFormateurPanel();
                } else if (this.role === 'public') {
                    this.showPublicTestPanel(testObj, this.revealState);
                }
            } else if (activePollId.startsWith('test-libre-')) {
                const testObj = {
                    id: activePollId,
                    type: 'test-libre',
                    title: `Atelier libre / Échanges improvisés ✏️`,
                    question: `Saisissez votre réponse, note ou proposition ci-dessous :`
                };
                this.activePoll = testObj;
                if (this.role === 'stagiaire') {
                    this.showStagiaireFreeTestPanel(testObj, this.revealState);
                } else if (this.role === 'formateur') {
                    this.refreshFormateurPanel();
                } else if (this.role === 'public') {
                    this.showPublicFreeTestPanel(testObj, this.revealState);
                }
            } else {
                const poll = INTERACTIVE_QUESTIONS.find(q => q.id === activePollId);
                if (poll) {
                    this.activePoll = poll;
                    if (this.role === 'stagiaire') {
                        this.showStagiairePollPanel(poll, this.revealState);
                    } else if (this.role === 'formateur') {
                        this.refreshFormateurPanel();
                    } else if (this.role === 'public') {
                        this.showPublicPollPanel(poll, this.revealState);
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
                } else if (this.role === 'public') {
                    this.showPublicExercisePanel(ex, data.show_results);
                }
            }
        } else {
            this.closeInteractivityPanel();
        }

        // 3. Gérer l'affichage du Zoom en temps réel
        if (zoomedPrenom) {
            let pollIdForQuery = null;
            if (activePollId) {
                pollIdForQuery = activePollId;
            } else if (data.active_exercise_id) {
                pollIdForQuery = `ex-${data.active_exercise_id}`;
            }
            
            if (pollIdForQuery) {
                this.supabase.from('votes')
                    .select('reponse')
                    .eq('session_id', 1)
                    .eq('poll_id', pollIdForQuery)
                    .eq('prenom', zoomedPrenom)
                    .maybeSingle()
                    .then(({ data: vote }) => {
                        if (vote) {
                            this.showZoomOverlay(zoomedPrenom, vote.reponse);
                        }
                    });
            }
        } else {
            this.hideZoomOverlay();
        }
    }

    closeInteractivityPanel() {
        document.getElementById('interactivity-panel').classList.remove('open');
    }

    async zoomResponse(prenom) {
        if (!this.supabase || this.role !== 'formateur') return;
        
        let targetPollId = null;
        let pollIdForQuery = null;
        if (this.activePoll) {
            targetPollId = this.activePoll.id;
            const suffix = this.revealState === 'answer' ? ':answer' : (this.revealState === 'votes' ? ':votes' : '');
            targetPollId = `${targetPollId}${suffix}:zoom:${prenom}`;
            pollIdForQuery = this.activePoll.id;
        } else if (this.activeExercise) {
            targetPollId = `exercise-zoom:${prenom}`;
            pollIdForQuery = `ex-${this.activeExercise.id}`;
        }
        
        if (targetPollId) {
            // Mise à jour en base de données pour les stagiaires
            await this.supabase.from('sessions').update({
                active_poll_id: targetPollId
            }).eq('id', 1);

            // Récupérer et afficher la réponse localement sur l'écran du formateur
            const { data: vote } = await this.supabase.from('votes')
                .select('reponse')
                .eq('session_id', 1)
                .eq('poll_id', pollIdForQuery)
                .eq('prenom', prenom)
                .maybeSingle();
            if (vote) {
                this.showZoomOverlay(prenom, vote.reponse);
            }
        }
    }

    async clearZoom() {
        if (!this.supabase || this.role !== 'formateur') return;
        
        let targetPollId = null;
        if (this.activePoll) {
            targetPollId = this.activePoll.id;
            const suffix = this.revealState === 'answer' ? ':answer' : (this.revealState === 'votes' ? ':votes' : '');
            targetPollId = `${targetPollId}${suffix}`;
        } else if (this.activeExercise) {
            targetPollId = null;
        }
        
        await this.supabase.from('sessions').update({
            active_poll_id: targetPollId
        }).eq('id', 1);

        // Masquer localement sur l'écran du formateur
        this.hideZoomOverlay();
    }

    showZoomOverlay(prenom, responseText) {
        let overlay = document.getElementById('zoom-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'zoom-overlay';
            overlay.className = 'zoom-response-overlay';
            document.body.appendChild(overlay);
        }
        
        const isFormateur = this.role === 'formateur';
        overlay.innerHTML = `
            <div class="zoom-overlay-content">
                ${isFormateur ? `<button class="zoom-overlay-close" id="btn-close-zoom">&times;</button>` : ''}
                <div class="zoom-overlay-header">
                    <span class="zoom-overlay-avatar">👤</span>
                    <h3 class="zoom-overlay-title">Réponse de <span class="zoom-overlay-name">${this.escapeHtml(prenom)}</span></h3>
                </div>
                <div class="zoom-overlay-body">
                    <pre class="zoom-overlay-text">${this.escapeHtml(responseText)}</pre>
                </div>
            </div>
        `;
        
        overlay.classList.add('visible');
        
        if (isFormateur) {
            const btnClose = overlay.querySelector('#btn-close-zoom');
            if (btnClose) {
                btnClose.onclick = () => this.clearZoom();
            }
        }
    }

    hideZoomOverlay() {
        const overlay = document.getElementById('zoom-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
        }
    }

    async refreshFormateurPanel() {
        if (!this.supabase || this.role !== 'formateur') return;

        const panelTitle = document.getElementById('panel-title');
        const qSection = document.getElementById('panel-question-section');
        const actionsSection = document.getElementById('panel-actions-section');
        const resultsSection = document.getElementById('panel-results-section');
        const voteFormSection = document.getElementById('panel-vote-form-section');

        voteFormSection.style.display = 'none';

        if (this.activePoll && this.activePoll.type === 'test-libre') {
            panelTitle.innerText = this.activePoll.title;
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Test Libre Actif ✏️</p>
                    <h4 style="margin: 0.5rem 0; font-size:1.05rem;">Atelier / Échanges improvisés</h4>
                    <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.45; margin-top:0.4rem;">
                        Les stagiaires écrivent librement leurs réponses ou remarques. Leurs réponses s'affichent ci-dessous en temps réel. Cliquer sur une réponse pour l'afficher en grand à tout le monde.
                    </p>
                </div>
            `;
            
            actionsSection.style.display = 'flex';
            const btnToggle = document.getElementById('btn-panel-toggle-results');
            btnToggle.style.display = 'block';
            
            if (this.revealState === 'hidden') {
                btnToggle.innerText = "👁️ Afficher les réponses";
            } else if (this.revealState === 'votes') {
                btnToggle.innerText = "🔒 Figer & Publier les réponses";
            } else {
                btnToggle.innerText = "🙈 Masquer les réponses";
            }
            btnToggle.onclick = () => this.toggleRevealState(this.activePoll);
            
            const btnStop = document.getElementById('btn-panel-stop');
            btnStop.style.display = 'block';
            btnStop.innerText = "🛑 Clôturer le test";
            btnStop.onclick = () => this.stopPoll();

            resultsSection.style.display = 'block';
            await this.loadFreeTestResults(this.activePoll);
            return;
        }

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
            
            if (this.revealState === 'hidden') {
                btnToggle.innerText = "👁️ Afficher les votes";
            } else if (this.revealState === 'votes') {
                btnToggle.innerText = "🎯 Révéler les corrections";
            } else {
                btnToggle.innerText = "🙈 Masquer les résultats";
            }
            btnToggle.onclick = () => this.toggleRevealState(this.activePoll);
            
            const btnStop = document.getElementById('btn-panel-stop');
            btnStop.style.display = 'block';
            btnStop.innerText = "🛑 Clôturer le test";
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
            const btnToggle = document.getElementById('btn-panel-toggle-results');
            btnToggle.style.display = 'block';
            btnToggle.innerText = this.sessionState.show_results ? "👁️ Masquer les réponses" : "👁️ Afficher les réponses";
            btnToggle.onclick = async () => {
                const nextShow = !this.sessionState.show_results;
                await this.supabase.from('sessions').update({ show_results: nextShow }).eq('id', 1);
                this.sessionState.show_results = nextShow;
                this.refreshFormateurPanel();
            };
            
            const btnStop = document.getElementById('btn-panel-stop');
            btnStop.style.display = 'block';
            btnStop.innerText = "🛑 Clôturer l'exercice";
            btnStop.onclick = () => this.stopActiveExercise();

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
                <div style="text-align:center; padding: 1rem 0; color: var(--text-muted); font-style:italic; font-size:0.8rem;">
                    Aucune activité interactive n'est lancée pour ce thème.<br><br>
                    <button class="btn btn-primary" id="btn-restart-poll" style="width:100%; justify-content:center; margin-top:0.5rem; font-size:0.85rem; padding: 0.7rem;">🚀 Lancer le Quiz de ce thème</button>
                </div>
            `;
            document.getElementById('btn-restart-poll').onclick = () => this.startPoll(poll);
        } else {
            actionsSection.style.display = 'flex';
            
            const btnToggle = document.getElementById('btn-panel-toggle-results');
            const btnStop = document.getElementById('btn-panel-stop');
            
            btnToggle.style.display = 'block';
            if (poll.type === 'quiz') {
                if (this.revealState === 'hidden') {
                    btnToggle.innerText = "👁️ Afficher les votes";
                } else if (this.revealState === 'votes') {
                    btnToggle.innerText = "🎯 Révéler la bonne réponse";
                } else {
                    btnToggle.innerText = "🙈 Masquer les résultats";
                }
            } else {
                btnToggle.innerText = (this.revealState === 'votes') ? "🙈 Masquer les résultats" : "👁️ Afficher les votes";
            }
            btnToggle.onclick = () => this.toggleRevealState(poll);

            btnStop.style.display = 'block';
            btnStop.innerText = "🛑 Clôturer le quiz";
            btnStop.onclick = () => this.stopPoll();

            resultsSection.style.display = 'block';
            await this.loadPollResults(poll);
        }
    }

    async toggleRevealState(poll) {
        if (!this.supabase || this.role !== 'formateur') return;
        
        let nextPollIdWithSuffix = poll.id;
        let nextShowResults = false;
        
        if (poll.type === 'quiz' || poll.type === 'test-complet' || poll.type === 'test-libre') {
            // Cycle à 3 états pour les quiz et tests : hidden -> votes -> answer -> hidden
            if (this.revealState === 'hidden') {
                nextPollIdWithSuffix = `${poll.id}:votes`;
                nextShowResults = true;
            } else if (this.revealState === 'votes') {
                nextPollIdWithSuffix = `${poll.id}:answer`;
                nextShowResults = true;
            } else {
                nextPollIdWithSuffix = poll.id;
                nextShowResults = false;
            }
        } else {
            // Cycle à 2 états pour les sondages simples : hidden -> votes -> hidden
            if (this.revealState === 'hidden') {
                nextPollIdWithSuffix = `${poll.id}:votes`;
                nextShowResults = true;
            } else {
                nextPollIdWithSuffix = poll.id;
                nextShowResults = false;
            }
        }
        
        await this.supabase.from('sessions').update({
            active_poll_id: nextPollIdWithSuffix,
            show_results: nextShowResults
        }).eq('id', 1);
        
        this.revealState = nextPollIdWithSuffix.includes(':') ? nextPollIdWithSuffix.split(':')[1] : 'hidden';
        this.sessionState.show_results = nextShowResults;
        
        this.refreshFormateurPanel();
    }

    async startPoll(poll) {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activePoll = poll;
        this.revealState = 'hidden';
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
        this.revealState = 'hidden';
        
        await this.supabase.from('sessions').update({
            active_poll_id: null,
            show_results: false
        }).eq('id', 1);

        this.refreshFormateurPanel();
    }

    async stopActiveExercise() {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activeExercise = null;
        this.revealState = 'hidden';
        
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
        
        if (this.revealState === 'votes' || this.revealState === 'answer') {
            const counts = { A: 0, B: 0, C: 0, D: 0 };
            votesList.forEach(v => {
                if (counts[v.reponse] !== undefined) counts[v.reponse]++;
            });

            const total = votesList.length || 1;
            const revealAnswer = this.revealState === 'answer';
            
            resultsSection.innerHTML = `
                <div class="results-chart" style="margin-top: 1rem;">
                    ${Object.entries(poll.options).map(([key, label]) => {
                        const count = counts[key] || 0;
                        const pct = Math.round((count / total) * 100);
                        const isCorrect = revealAnswer && poll.type === 'quiz' && poll.correct === key;
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
                ${revealAnswer && poll.type === 'quiz' && poll.explanation ? `
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

        let correctionHtml = '';
        if (this.sessionState.show_results) {
            correctionHtml = `
                <div class="ex-solution-box" style="margin-bottom: 1.5rem; text-align: left;">
                    <div class="solution-pane-inner" style="background: rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.15); padding: 1rem; border-radius: 8px;">
                        <h5 style="color:#34d399; font-weight:800; font-size:0.88rem; margin:0 0 0.5rem 0; text-transform:uppercase; letter-spacing:0.5px;">💡 Solution proposée / Prompt type :</h5>
                        <pre style="background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.1); padding:0.75rem; border-radius:4px; font-family:monospace; font-size:0.8rem; white-space:pre-wrap; color:#34d399; line-height:1.5; margin-bottom:1rem;">${this.activeExercise.solution}</pre>
                        
                        <h5 style="color:var(--accent-sky); font-weight:800; font-size:0.88rem; margin:0 0 0.5rem 0; text-transform:uppercase; letter-spacing:0.5px;">🧠 Intérêt & Cheminement pédagogique :</h5>
                        <p style="font-size:0.85rem; line-height:1.5; color:#cbd5e1; margin:0;">${this.activeExercise.pedagogy}</p>
                        <p style="font-size:0.8rem; line-height:1.45; color:var(--text-muted); margin-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:0.5rem;"><strong>Raisonnement :</strong> ${this.activeExercise.reasoning}</p>
                    </div>
                </div>
            `;
        }

        if (this.activeExercise.support === 'pc') {
            if (submissions.length === 0) {
                resultsSection.innerHTML = `
                    ${correctionHtml}
                    <div style="text-align:center; padding:2rem; color:var(--text-muted); font-style:italic; font-size:0.82rem;">
                        En attente des soumissions des stagiaires (Prompts)...
                    </div>
                `;
            } else {
                resultsSection.innerHTML = `
                    ${correctionHtml}
                    <h4 style="font-size:0.8rem; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-muted);">Propositions des stagiaires :</h4>
                    <div class="submissions-grid" style="display:flex; flex-direction:column; gap:0.65rem; max-height:260px; overflow-y:auto;">
                        ${submissions.map(sub => `
                            <div class="submission-item-card trainee-card-clickable" data-prenom="${this.escapeHtml(sub.prenom)}" style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:6px; padding:0.6rem 0.85rem; box-shadow:var(--shadow-sm); cursor:pointer;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem; pointer-events:none;">
                                    <strong style="font-size:0.78rem; color:var(--accent-blue)">👤 ${this.escapeHtml(sub.prenom)}</strong>
                                    <span style="font-size:0.65rem; color:var(--text-muted);">${new Date(sub.created_at).toLocaleTimeString()}</span>
                                </div>
                                <pre style="background:white; border:1px solid var(--border-color); padding:0.5rem; border-radius:4px; font-family:monospace; font-size:0.74rem; white-space:pre-wrap; color:var(--text-body); margin:0; pointer-events:none;">${this.escapeHtml(sub.reponse)}</pre>
                            </div>
                        `).join('')}
                    </div>
                `;

                resultsSection.querySelectorAll('.trainee-card-clickable').forEach(card => {
                    card.onclick = () => {
                        const prenom = card.dataset.prenom;
                        this.zoomResponse(prenom);
                    };
                });
            }
        } else {
            const completedCount = submissions.length;
            resultsSection.innerHTML = `
                ${correctionHtml}
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
        this.revealState = 'hidden';
        
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
                if (this.role === 'formateur') {
                    if (this.activePoll.type === 'test-complet') {
                        this.loadTestResults(this.activePoll);
                    } else if (this.activePoll.type === 'test-libre') {
                        this.loadFreeTestResults(this.activePoll);
                    } else {
                        this.loadPollResults(this.activePoll);
                    }
                } else {
                    // Pour les stagiaires et visiteurs publics
                    const isRevealed = (this.revealState === 'votes' || this.revealState === 'answer');
                    if (isRevealed) {
                        if (this.activePoll.type === 'test-complet') {
                            if (this.role === 'stagiaire') {
                                this.showStagiaireTestPanel(this.activePoll, this.revealState);
                            } else {
                                this.showPublicTestPanel(this.activePoll, this.revealState);
                            }
                        } else if (this.activePoll.type === 'test-libre') {
                            if (this.role === 'stagiaire') {
                                this.showStagiaireFreeTestPanel(this.activePoll, this.revealState);
                            } else {
                                this.showPublicFreeTestPanel(this.activePoll, this.revealState);
                            }
                        } else {
                            if (this.role === 'stagiaire') {
                                this.showStagiairePollPanel(this.activePoll, this.revealState);
                            } else {
                                this.showPublicPollPanel(this.activePoll, this.revealState);
                            }
                        }
                    }
                }
            } else if (this.activeExercise) {
                if (this.role === 'formateur') {
                    this.loadExerciseSubmissions();
                } else if (this.role === 'public') {
                    this.showPublicExercisePanel(this.activeExercise, this.sessionState.show_results);
                }
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

            // Mettre à jour le tableau de bord formateur d'accueil si l'utilisateur est formateur
            if (this.role === 'formateur') {
                const homeGrid = document.getElementById('formateur-trainees-grid');
                if (homeGrid) {
                    if (data.length === 0) {
                        homeGrid.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">Aucun participant connecté pour le moment.</div>`;
                    } else {
                        homeGrid.innerHTML = data.map(p => `
                            <div class="trainee-manage-badge">
                                <span>👤 ${this.escapeHtml(p.prenom)}</span>
                                <button class="btn-kick-trainee" data-prenom="${this.escapeHtml(p.prenom)}" title="Déconnecter ${this.escapeHtml(p.prenom)}">✕</button>
                            </div>
                        `).join('');

                        // Associer le kick individuel
                        homeGrid.querySelectorAll('.btn-kick-trainee').forEach(btn => {
                            btn.onclick = async (e) => {
                                const prenomToKick = e.currentTarget.dataset.prenom;
                                if (confirm(`Êtes-vous sûr de vouloir déconnecter le stagiaire "${prenomToKick}" ? Ses réponses et votes de session seront également supprimés.`)) {
                                    // 1. Supprimer de presences
                                    await this.supabase.from('presences').delete().eq('session_id', 1).eq('prenom', prenomToKick);
                                    // 2. Supprimer de votes
                                    await this.supabase.from('votes').delete().eq('session_id', 1).eq('prenom', prenomToKick);
                                    
                                    // Le client de l'utilisateur concerné se déconnectera au prochain heartbeat (dans les 10 secondes)
                                    this.refreshPresenceList();
                                }
                            };
                        });
                    }
                }
            }
        }
    }

    async showStagiairePollPanel(poll, revealState) {
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
        const hasEnded = (revealState === 'answer');

        if (!myVote && !hasEnded) {
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
                    this.showStagiairePollPanel(poll, revealState);
                };
            });
        } else {
            voteFormSection.style.display = 'none';
            resultsSection.style.display = 'block';
            
            if (revealState === 'votes' || revealState === 'answer') {
                const counts = { A: 0, B: 0, C: 0, D: 0 };
                const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', poll.id);
                const votesList = allVotes || [];
                votesList.forEach(v => { if (counts[v.reponse] !== undefined) counts[v.reponse]++; });
                
                const total = votesList.length || 1;
                const myChoice = myVote ? myVote.reponse : null;
                const revealAnswer = revealState === 'answer';
                
                let scoreHtml = '';
                if (poll.type === 'quiz') {
                    if (revealAnswer) {
                        if (myVote) {
                            const isCorrect = myChoice === poll.correct;
                            scoreHtml = isCorrect ? `
                                <div class="score-banner correct" style="background:#f0fdf4; border:1px solid #bbf7d0; color:#14532d; padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">🎉 Bravo, c'est correct ! (Réponse : ${myChoice})</div>
                            ` : `
                                <div class="score-banner incorrect" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">❌ Incorrect... La bonne réponse était ${poll.correct} (Votre réponse : ${myChoice})</div>
                            `;
                        } else {
                            scoreHtml = `
                                <div class="score-banner incorrect" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">🔒 Le quiz est terminé (Vous n'avez pas voté). La bonne réponse était ${poll.correct}</div>
                            `;
                        }
                    } else {
                        scoreHtml = `<div class="score-banner general" style="background:rgba(30,41,59,0.6); border:1px solid rgba(255,255,255,0.15); padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">Votre vote a été enregistré : Option ${myChoice}</div>`;
                    }
                } else {
                    if (myVote) {
                        scoreHtml = `<div class="score-banner general" style="background:rgba(30,41,59,0.6); border:1px solid rgba(255,255,255,0.15); padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">Votre vote a été pris en compte : ${myChoice}</div>`;
                    } else {
                        scoreHtml = `<div class="score-banner general" style="background:rgba(30,41,59,0.6); border:1px solid rgba(255,255,255,0.15); padding:0.5rem 0.75rem; border-radius:4px; font-size:0.78rem; font-weight:700; margin-bottom:0.75rem;">Le vote est clôturé (Vous n'avez pas voté).</div>`;
                    }
                }

                resultsSection.innerHTML = `
                    ${scoreHtml}
                    <div class="results-chart">
                        ${Object.entries(poll.options).map(([key, label]) => {
                            const count = counts[key] || 0;
                            const pct = Math.round((count / total) * 100);
                            const isCorrect = revealAnswer && poll.type === 'quiz' && poll.correct === key;
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
                    ${revealAnswer && poll.type === 'quiz' && poll.explanation ? `
                        <div style="background:rgba(0,86,179,0.05); padding:0.75rem; border-radius:6px; font-size:0.78rem; border-left:3px solid var(--accent-blue); margin-top:0.75rem; line-height:1.4;">
                            <strong>Explication :</strong> ${poll.explanation}
                        </div>
                    ` : ''}
                `;
            } else {
                resultsSection.innerHTML = `
                    <div style="text-align:center; padding:1.5rem; background:rgba(30,41,59,0.6); border:1px dashed rgba(255,255,255,0.15); border-radius:6px; color:#cbd5e1; font-size:0.8rem;">
                        🚀 Votre réponse (<strong>Option ${myVote.reponse}</strong>) a bien été envoyée ! <br>
                        <span style="font-size:0.72rem; color:#94a3b8; font-style:italic; display:inline-block; margin-top:0.4rem;">En attente de la fin des votes par le formateur pour afficher les résultats de la classe.</span>
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

        let correctionHtml = '';
        if (showResults) {
            correctionHtml = `
                <div class="ex-solution-box" style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; text-align: left;">
                    <div class="solution-pane-inner" style="background: rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.15); padding: 0.75rem; border-radius: 6px;">
                        <h5 style="color:#34d399; font-weight:800; font-size:0.85rem; margin:0 0 0.4rem 0; text-transform:uppercase; letter-spacing:0.5px;">💡 Solution proposée / Prompt type :</h5>
                        <pre style="background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.1); padding:0.75rem; border-radius:4px; font-family:monospace; font-size:0.78rem; white-space:pre-wrap; color:#34d399; line-height:1.5; margin-bottom:0.75rem;">${ex.solution}</pre>
                        
                        <h5 style="color:var(--accent-sky); font-weight:800; font-size:0.85rem; margin:0 0 0.4rem 0; text-transform:uppercase; letter-spacing:0.5px;">🧠 Intérêt & Cheminement pédagogique :</h5>
                        <p style="font-size:0.8rem; line-height:1.45; color:#cbd5e1; margin:0;">${ex.pedagogy}</p>
                        <p style="font-size:0.76rem; line-height:1.4; color:var(--text-muted); margin-top:0.4rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:0.4rem;"><strong>Raisonnement :</strong> ${ex.reasoning}</p>
                    </div>
                </div>
            `;
        }

        if (!mySub) {
            resultsSection.style.display = 'block';
            if (showResults) {
                resultsSection.innerHTML = `
                    <div style="text-align:center; padding:1rem; background:#fef2f2; border:1px solid #fecaca; color:#991b1b; font-size:0.8rem; font-weight:700; border-radius:6px; margin-bottom:0.75rem;">
                        🔒 L'exercice est clos (Le temps de réponse est écoulé).
                    </div>
                    ${correctionHtml}
                `;
            } else if (ex.support === 'pc') {
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
                <div style="text-align:center; padding:1rem; background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.15); border-radius:6px; color:#34d399; font-size:0.8rem; font-weight:700; margin-bottom: 0.75rem;">
                    🎯 Votre participation a bien été enregistrée ! <br>
                    <span style="font-size:0.72rem; color:var(--text-muted); font-weight:normal; display:inline-block; margin-top:0.25rem;">Attente de la correction par le formateur.</span>
                </div>
                ${ex.support === 'pc' ? `
                    <div style="margin-top:0.75rem; text-align: left;">
                        <label style="font-size:0.7rem; font-weight:700; color:var(--text-muted);">Votre réponse soumise :</label>
                        <pre style="background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.1); padding:0.5rem; border-radius:4px; font-family:monospace; font-size:0.74rem; white-space:pre-wrap; color:#f8fafc; margin:0; max-height: 80px; overflow-y:auto;">${this.escapeHtml(mySub.reponse)}</pre>
                    </div>
                ` : ''}
                ${correctionHtml}
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
        this.revealState = 'hidden';
        
        this.activePoll = {
            id: testId,
            type: 'test-complet',
            title: `Test Général (Thèmes 1 à ${maxThemeIdx + 1})`,
            questions: testQuestions
        };
        
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
        
        const showScoreText = (this.revealState === 'votes' || this.revealState === 'answer');
        
        if (votersCountSpan) votersCountSpan.innerText = `${completedCount}/${voters.length}`;
        if (votersListDiv) {
            votersListDiv.innerHTML = voters.map(v => {
                const isCompleted = v.answered >= totalQuestions;
                const scoreText = showScoreText ? ` (${v.correct}/${totalQuestions})` : ` (${v.answered}/${totalQuestions})`;
                const badgeClass = isCompleted ? 'voter-badge-name voted' : 'voter-badge-name';
                const icon = isCompleted ? '✅' : '⏳';
                return `<span class="${badgeClass}">${icon} ${this.escapeHtml(v.prenom)}${scoreText}</span>`;
            }).join('');
        }

        const resultsSection = document.getElementById('panel-results-section');
        if (!resultsSection) return;
        
        if (this.revealState === 'votes' || this.revealState === 'answer') {
            let html = `<div class="test-detailed-results" style="margin-top: 1rem; max-height: 400px; overflow-y: auto; padding-right: 5px;">`;
            const revealAnswer = this.revealState === 'answer';
            
            testObj.questions.forEach((q, idx) => {
                const qVotes = votesList.filter(v => v.poll_id === q.id);
                const counts = { A: 0, B: 0, C: 0, D: 0 };
                qVotes.forEach(v => {
                    if (counts[v.reponse] !== undefined) counts[v.reponse]++;
                });
                
                const qTotal = qVotes.length || 1;
                
                html += `
                    <div class="test-question-result" style="border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(15, 23, 42, 0.4); border-radius: 6px; padding: 0.65rem; margin-bottom: 0.75rem; text-align: left;">
                        <div style="font-size: 0.76rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--accent-sky);">
                            Q${idx + 1}. ${this.escapeHtml(q.question)}
                        </div>
                        <div class="options-chart" style="display:flex; flex-direction:column; gap:0.25rem;">
                            ${Object.entries(q.options).map(([key, label]) => {
                                const count = counts[key] || 0;
                                const pct = Math.round((count / qTotal) * 100);
                                const isCorrect = revealAnswer && q.type === 'quiz' && q.correct === key;
                                const barColor = isCorrect ? 'var(--accent-green)' : 'var(--accent-blue)';
                                const textWeight = isCorrect ? 'bold' : 'normal';
                                const checkIcon = isCorrect ? '🟢' : '';
                                
                                return `
                                    <div style="font-size: 0.68rem; line-height: 1.3;">
                                        <div style="display:flex; justify-content:space-between; font-weight:${textWeight}; margin-bottom: 0.1rem; color: #e2e8f0;">
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
                <div style="text-align:center; padding:1.5rem; background:rgba(30, 41, 59, 0.6); border:1px dashed rgba(255, 255, 255, 0.15); border-radius:6px; color:#cbd5e1; font-size:0.82rem; font-style:italic; margin-top:1rem;">
                    🔒 Les scores détaillés du test sont masqués. <br>Attente du formateur pour dévoiler les résultats de la classe.
                </div>
            `;
        }
    }

    async showStagiaireTestPanel(testObj, revealState) {
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
        const showResults = (revealState === 'votes' || revealState === 'answer');
        const showDetailedAnswers = (revealState === 'answer');

        const hasEnded = (revealState === 'answer');

        if (!isCompleted && !hasEnded) {
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
                    
                    this.showStagiaireTestPanel(testObj, revealState);
                };
            });
        } else {
            if (showResults) {
                let score = 0;
                myVotesList.forEach(v => {
                    if (v.is_correct) score++;
                });

                let scoreBannerHtml = '';
                if (isCompleted) {
                    scoreBannerHtml = `
                        <div class="score-banner" style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); color:#34d399; padding:0.75rem; border-radius:6px; font-weight:700; font-size:0.85rem; text-align:center; margin-bottom:1rem;">
                            🎉 Test terminé ! Votre score : ${score} / ${totalCount} réponses correctes
                        </div>
                    `;
                } else {
                    scoreBannerHtml = `
                        <div class="score-banner" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:0.75rem; border-radius:6px; font-weight:700; font-size:0.85rem; text-align:center; margin-bottom:1rem;">
                            🔒 Le test est clos. Vous avez répondu à ${answeredCount} / ${totalCount} questions. Votre score : ${score} / ${totalCount} réponses correctes.
                        </div>
                    `;
                }

                let html = `
                    ${scoreBannerHtml}
                    <div class="test-detailed-results" style="max-height: 380px; overflow-y: auto; display:flex; flex-direction:column; gap:0.75rem; padding-right:5px; text-align: left;">
                `;

                testObj.questions.forEach((q, idx) => {
                    const myAnswer = myVotesMap[q.id];
                    const isCorrect = myAnswer === q.correct;
                    
                    if (showDetailedAnswers) {
                        html += `
                            <div class="test-question-card" style="background: rgba(255,255,255,0.03); border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; border-radius: 6px; padding: 0.65rem;">
                                <div style="font-size:0.78rem; font-weight:700; color:#f8fafc; margin-bottom: 0.4rem;">
                                    Q${idx + 1}. ${this.escapeHtml(q.question)}
                                </div>
                                
                                <div style="font-size: 0.72rem; line-height: 1.4;">
                                    <div style="display:flex; justify-content:space-between; margin-bottom: 0.2rem; font-weight: 600;">
                                        <span style="color: ${isCorrect ? '#34d399' : '#f87171'};">
                                            ${myAnswer ? `${isCorrect ? '✅' : '❌'} Votre choix : ${myAnswer}` : '❌ Pas de réponse'}
                                        </span>
                                        ${!isCorrect ? `<span style="color: #34d399;">Correction : ${q.correct}</span>` : ''}
                                    </div>
                                    <div style="color: var(--text-muted); font-size: 0.7rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.25rem; margin-top: 0.25rem;">
                                        <strong>Explication:</strong> ${this.escapeHtml(q.explanation)}
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        html += `
                            <div class="test-question-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 0.65rem;">
                                <div style="font-size:0.78rem; font-weight:700; color:#f8fafc; margin-bottom: 0.4rem;">
                                    Q${idx + 1}. ${this.escapeHtml(q.question)}
                                </div>
                                <div style="font-size: 0.72rem; color: var(--accent-sky); font-weight: 600;">
                                    <span>Votre réponse enregistrée : <strong>Option ${myAnswer}</strong></span>
                                </div>
                            </div>
                        `;
                    }
                });

                html += `</div>`;
                resultsSection.innerHTML = html;
            } else {
                resultsSection.innerHTML = `
                    <div style="text-align:center; padding:1.5rem; background:rgba(30,41,59,0.6); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#34d399; font-size:0.8rem; font-weight:700; margin-top:1rem;">
                        🚀 Test terminé ! Vos réponses ont été envoyées. <br>
                        <span style="font-size:0.72rem; color:#cbd5e1; font-weight:normal; display:inline-block; margin-top:0.4rem;">En attente de la fin des votes par le formateur pour afficher votre score et les corrections détaillées.</span>
                    </div>
                `;
            }
        }
    }

    async showPublicPollPanel(poll, revealState) {
        const panel = document.getElementById('interactivity-panel');
        if (panel) panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        if (panelTitle) panelTitle.innerText = poll.type === 'quiz' ? "Quiz de Validation 🎯" : "Sondage d'Opinion 📊";

        const qSection = document.getElementById('panel-question-section');
        const theme = THEMES.find(t => t.id === poll.themeId);
        const categoryTitle = theme ? theme.title : '';
        if (qSection) {
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">${categoryTitle}</p>
                    <h4 style="margin: 0.5rem 0; font-size:0.95rem; line-height: 1.45;">${poll.question}</h4>
                    <div class="poll-options-preview" style="margin-top: 0.75rem;">
                        ${Object.entries(poll.options).map(([key, val]) => `
                            <div class="poll-preview-option" style="font-size:0.78rem; margin-bottom:0.35rem; color:var(--text-body);">
                                <strong style="color:var(--accent-blue)">${key} :</strong> ${val}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        const voteFormSection = document.getElementById('panel-vote-form-section');
        if (voteFormSection) voteFormSection.style.display = 'none';

        const resultsSection = document.getElementById('panel-results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            await this.loadPollResults(poll);
        }
    }

    async showPublicTestPanel(testObj, revealState) {
        const panel = document.getElementById('interactivity-panel');
        if (panel) panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        if (panelTitle) panelTitle.innerText = testObj.title;

        const qSection = document.getElementById('panel-question-section');
        if (qSection) {
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Test Composite 📝</p>
                    <h4 style="margin: 0.5rem 0; font-size:0.95rem; line-height: 1.45;">Questions du test (${testObj.questions.length})</h4>
                    <div style="max-height: 150px; overflow-y: auto; background: var(--bg-main); padding: 0.65rem; border-radius: 6px; font-size: 0.75rem; border: 1px solid var(--border-color); margin-top: 0.5rem;">
                        ${testObj.questions.map((q, idx) => `
                            <div style="margin-bottom: 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <strong>Q${idx + 1}.</strong> ${this.escapeHtml(q.question)}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        const voteFormSection = document.getElementById('panel-vote-form-section');
        if (voteFormSection) voteFormSection.style.display = 'none';

        const resultsSection = document.getElementById('panel-results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            await this.loadTestResults(testObj);
        }
    }

    async startFreeTest() {
        if (!this.supabase || this.role !== 'formateur') return;
        const theme = THEMES[this.currentThemeIndex];
        const testId = 'test-libre-' + theme.id;
        
        await this.supabase.from('votes').delete().eq('session_id', 1).eq('poll_id', testId);
        
        this.sessionState.show_results = false;
        this.revealState = 'hidden';
        
        this.activePoll = {
            id: testId,
            type: 'test-libre',
            title: `Atelier libre / Échanges improvisés ✏️`,
            question: `Proposez vos réponses ou remarques par écrit suite aux échanges en cours.`
        };
        
        await this.supabase.from('sessions').update({
            active_poll_id: testId,
            show_results: false,
            active_exercise_id: null
        }).eq('id', 1);

        this.refreshFormateurPanel();
    }

    async loadFreeTestResults(testObj) {
        if (!this.supabase) return;
        const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', testObj.id);
        const votesList = votes || [];
        
        const votersCountSpan = document.getElementById('voters-count');
        const votersListDiv = document.getElementById('voters-names-list');
        
        if (votersCountSpan) votersCountSpan.innerText = `${votesList.length}`;
        
        const showResults = (this.revealState === 'votes' || this.revealState === 'answer');
        
        if (votersListDiv) {
            if (votesList.length === 0) {
                votersListDiv.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted); font-style:italic;">En attente des réponses des stagiaires...</div>`;
            } else {
                votersListDiv.innerHTML = votesList.map(v => {
                    return `
                        <div class="free-test-response-card trainee-card-clickable" data-prenom="${this.escapeHtml(v.prenom)}" style="background:rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem; margin-bottom: 0.5rem; text-align:left; cursor:pointer;">
                            <div style="font-weight:700; color:var(--accent-sky); font-size:0.8rem; margin-bottom:0.25rem; display:flex; justify-content:space-between; pointer-events:none;">
                                <span>👤 ${this.escapeHtml(v.prenom)}</span>
                                <span style="font-size:0.7rem; color:var(--text-muted); font-weight:normal;">${new Date(v.created_at).toLocaleTimeString('fr-FR')}</span>
                            </div>
                            <div style="font-size:0.82rem; line-height:1.4; color:#f8fafc; white-space:pre-wrap; pointer-events:none;">${this.escapeHtml(v.reponse)}</div>
                        </div>
                    `;
                }).join('');

                votersListDiv.querySelectorAll('.trainee-card-clickable').forEach(card => {
                    card.onclick = () => {
                        const prenom = card.dataset.prenom;
                        this.zoomResponse(prenom);
                    };
                });
            }
        }
    }

    async showStagiaireFreeTestPanel(testObj, revealState) {
        const panel = document.getElementById('interactivity-panel');
        if (panel) panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        if (panelTitle) panelTitle.innerText = testObj.title;

        const qSection = document.getElementById('panel-question-section');
        if (qSection) {
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Test Libre ✏️</p>
                    <h4 style="margin: 0.3rem 0; font-size:0.95rem; line-height:1.4;">${testObj.question}</h4>
                </div>
            `;
        }

        const voteFormSection = document.getElementById('panel-vote-form-section');
        const resultsSection = document.getElementById('panel-results-section');
        
        if (voteFormSection) voteFormSection.style.display = 'none';
        if (!resultsSection) return;
        resultsSection.style.display = 'block';

        const { data: myVote } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', testObj.id).eq('prenom', this.prenom).maybeSingle();
        const hasEnded = (revealState === 'answer');
        const showAllResults = (revealState === 'votes' || revealState === 'answer');

        if (!myVote && !hasEnded) {
            resultsSection.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:0.75rem; text-align:left;">
                    <textarea id="free-test-response-input" placeholder="Saisissez votre réponse ici..." style="width:100%; min-height:120px; background:rgba(30,41,59,0.5); border:1px solid var(--border-color); border-radius:6px; color:white; padding:0.75rem; font-family:inherit; font-size:0.85rem; outline:none; resize:vertical;"></textarea>
                    <button class="btn btn-primary" id="btn-submit-free-test" style="justify-content:center; width:100%;">🚀 Soumettre ma réponse</button>
                </div>
            `;
            
            const btnSubmit = resultsSection.querySelector('#btn-submit-free-test');
            const textarea = resultsSection.querySelector('#free-test-response-input');
            btnSubmit.onclick = async () => {
                const responseText = textarea.value.trim();
                if (!responseText) return;
                
                await this.supabase.from('votes').insert({
                    session_id: 1,
                    poll_id: testObj.id,
                    prenom: this.prenom,
                    reponse: responseText,
                    is_correct: null
                });
                
                this.showStagiaireFreeTestPanel(testObj, revealState);
            };
        } else {
            let html = '';
            if (myVote) {
                html += `
                    <div class="score-banner correct" style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); color:#34d399; padding:0.75rem; border-radius:6px; font-weight:700; font-size:0.8rem; text-align:left; margin-bottom:1rem; line-height:1.45;">
                        <strong>Votre réponse a été enregistrée :</strong><br>
                        <p style="margin: 0.4rem 0 0 0; font-weight:normal; font-size:0.82rem; white-space:pre-wrap; color:#f8fafc;">${this.escapeHtml(myVote.reponse)}</p>
                    </div>
                `;
            } else {
                html += `
                    <div class="score-banner incorrect" style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:0.75rem; border-radius:6px; font-weight:700; font-size:0.8rem; text-align:center; margin-bottom:1rem;">
                        🔒 Le test libre est clos (Vous n'avez pas répondu).
                    </div>
                `;
            }

            if (showAllResults) {
                const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', testObj.id);
                const votesList = allVotes || [];
                
                html += `
                    <h5 style="text-align:left; font-size:0.82rem; font-weight:700; margin-bottom:0.5rem; color:#f8fafc;">Réponses des participants :</h5>
                    <div class="free-test-responses-container" style="max-height: 250px; overflow-y:auto; display:flex; flex-direction:column; gap:0.5rem; padding-right:4px;">
                `;
                
                if (votesList.length === 0) {
                    html += `<p style="text-align:center; color:var(--text-muted); font-size:0.78rem; font-style:italic;">Aucune réponse pour le moment...</p>`;
                } else {
                    votesList.forEach(v => {
                        html += `
                            <div class="free-test-response-card" style="background:rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.6rem 0.75rem; text-align:left;">
                                <span style="font-weight:700; color:var(--accent-sky); font-size:0.76rem; display:block; margin-bottom:0.2rem;">👤 ${this.escapeHtml(v.prenom)}</span>
                                <p style="font-size:0.78rem; color:#f8fafc; line-height:1.4; margin:0; white-space:pre-wrap;">${this.escapeHtml(v.reponse)}</p>
                            </div>
                        `;
                    });
                }
                html += `</div>`;
            } else {
                html += `
                    <div style="text-align:center; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:6px; color:var(--text-muted); font-size:0.8rem; font-style:italic;">
                        🕒 En attente de la publication des réponses des autres stagiaires par le formateur.
                    </div>
                `;
            }
            resultsSection.innerHTML = html;
        }
    }

    async showPublicFreeTestPanel(testObj, revealState) {
        const panel = document.getElementById('interactivity-panel');
        if (panel) panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        if (panelTitle) panelTitle.innerText = testObj.title;

        const qSection = document.getElementById('panel-question-section');
        if (qSection) {
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Test Libre (Visiteur) ✏️</p>
                    <h4 style="margin: 0.3rem 0; font-size:0.95rem; line-height:1.4;">${testObj.question}</h4>
                </div>
            `;
        }

        const voteFormSection = document.getElementById('panel-vote-form-section');
        const resultsSection = document.getElementById('panel-results-section');
        
        if (voteFormSection) voteFormSection.style.display = 'none';
        if (!resultsSection) return;
        resultsSection.style.display = 'block';

        const showAllResults = (revealState === 'votes' || revealState === 'answer');

        if (showAllResults) {
            const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', 1).eq('poll_id', testObj.id);
            const votesList = allVotes || [];
            
            let html = `
                <h5 style="text-align:left; font-size:0.82rem; font-weight:700; margin-bottom:0.5rem; color:#f8fafc;">Réponses des participants :</h5>
                <div class="free-test-responses-container" style="max-height: 250px; overflow-y:auto; display:flex; flex-direction:column; gap:0.5rem; padding-right:4px;">
            `;
            
            if (votesList.length === 0) {
                html += `<p style="text-align:center; color:var(--text-muted); font-size:0.78rem; font-style:italic;">Aucune réponse pour le moment...</p>`;
            } else {
                votesList.forEach(v => {
                    html += `
                        <div class="free-test-response-card" style="background:rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.6rem 0.75rem; text-align:left;">
                            <span style="font-weight:700; color:var(--accent-sky); font-size:0.76rem; display:block; margin-bottom:0.2rem;">👤 ${this.escapeHtml(v.prenom)}</span>
                            <p style="font-size:0.78rem; color:#f8fafc; line-height:1.4; margin:0; white-space:pre-wrap;">${this.escapeHtml(v.reponse)}</p>
                        </div>
                    `;
                });
            }
            html += `</div>`;
            resultsSection.innerHTML = html;
        } else {
            resultsSection.innerHTML = `
                <div style="text-align:center; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:6px; color:var(--text-muted); font-size:0.8rem; font-style:italic;">
                    🕒 Le test libre est en cours. Les réponses s'afficheront ici une fois publiées par le formateur.
                </div>
            `;
        }
    }

    async showPublicExercisePanel(ex, showResults) {
        const panel = document.getElementById('interactivity-panel');
        if (panel) panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        if (panelTitle) panelTitle.innerText = `Atelier : ${ex.title}`;

        const qSection = document.getElementById('panel-question-section');
        if (qSection) {
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Thème 12 • Exercice ${ex.support === 'pc' ? '🖥️ PC' : '📝 Papier'}</p>
                    <h4 style="margin: 0.4rem 0; font-size:0.95rem;">${ex.title}</h4>
                    <p style="font-size: 0.78rem; font-style:italic; line-height: 1.45; border-top:1px solid #e2e8f0; padding-top:0.5rem; margin-top:0.5rem; color:var(--text-body);">
                        ${ex.instructions.replace(/\n/g, '<br>')}
                    </p>
                </div>
            `;
        }

        const voteFormSection = document.getElementById('panel-vote-form-section');
        if (voteFormSection) voteFormSection.style.display = 'none';

        const resultsSection = document.getElementById('panel-results-section');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            await this.loadExerciseSubmissions();
        }
    }
}

// Instantiate App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TrainingApp();
});
