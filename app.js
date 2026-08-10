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

    getVisibleThemes() {
        if (this.role === 'public') {
            return THEMES.filter(t => t.id !== 'exercices-ateliers');
        }
        return THEMES;
    }

    renderSidebar() {
        this.sidebarThemesList.innerHTML = '';
        const visibleThemes = this.getVisibleThemes();
        visibleThemes.forEach((theme) => {
            const realThemeIdx = THEMES.indexOf(theme);
            const themeItem = document.createElement('div');
            themeItem.className = 'accordion-theme-item';
            themeItem.id = `sidebar-theme-${realThemeIdx}`;

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
                this.selectSlide(realThemeIdx, 0);
            });

            // Create Slides List (Accordion Content)
            const list = document.createElement('ul');
            list.className = 'accordion-slides-list';

            theme.slides.forEach((slide, slideIdx) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'slide-nav-link';
                a.innerText = slide.title;
                a.id = `sidebar-link-${realThemeIdx}-${slideIdx}`;
                a.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.role === 'stagiaire') return;
                    this.selectSlide(realThemeIdx, slideIdx);
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
        const visibleThemes = this.getVisibleThemes();
        visibleThemes.forEach((theme) => {
            const realThemeIdx = THEMES.indexOf(theme);
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
                const themeItem = document.getElementById(`sidebar-theme-${realThemeIdx}`);
                this.closeAllAccordions();
                if (themeItem) {
                    themeItem.classList.add('expanded');
                }
                this.selectSlide(realThemeIdx, 0);
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
        const visibleThemes = this.getVisibleThemes();

        visibleThemes.forEach((theme, idx) => {
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
            this.slideIndicator.innerText = `Thème ${this.currentThemeIndex + 1}/${visibleThemes.length} • Slide ${this.currentSlideIndex + 1}/${theme.slides.length}`;
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

        
        // Appeler la liaison d'interactivité des slides spécifique (définie dans app_slides.js)
        if (typeof this.bindSlideInteractivity === 'function') {
            this.bindSlideInteractivity(slide);
        }
    }
}
