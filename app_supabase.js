// ==========================================
// SYNCHRONISATION SUPABASE ET TEMPS RÉEL (FORMATION IA)
// ==========================================


TrainingApp.prototype.detectRole = function() {
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('role');
        const sessionParam = params.get('session') || params.get('code');
        
        if (roleParam === 'formateur') {
            this.role = 'formateur';
            if (sessionParam && !isNaN(parseInt(sessionParam, 10))) {
                this.sessionId = parseInt(sessionParam, 10);
            } else {
                const savedFormateurSession = localStorage.getItem('active_formateur_session_id');
                if (savedFormateurSession && !isNaN(parseInt(savedFormateurSession, 10))) {
                    this.sessionId = parseInt(savedFormateurSession, 10);
                } else {
                    // Générer un code de session à 4 chiffres (1000 à 9999)
                    this.sessionId = Math.floor(1000 + Math.random() * 9000);
                }
            }
            localStorage.setItem('active_formateur_session_id', this.sessionId);
        } else if (roleParam === 'stagiaire') {
            this.role = 'stagiaire';
            this.prenom = localStorage.getItem('stagiaire_prenom') || '';
            if (sessionParam && !isNaN(parseInt(sessionParam, 10))) {
                this.sessionId = parseInt(sessionParam, 10);
                localStorage.setItem('stagiaire_session_id', this.sessionId);
            } else {
                const savedStagiaireSession = localStorage.getItem('stagiaire_session_id');
                if (savedStagiaireSession && !isNaN(parseInt(savedStagiaireSession, 10))) {
                    this.sessionId = parseInt(savedStagiaireSession, 10);
                } else {
                    this.sessionId = null; // Un modal demandera le code au stagiaire
                }
            }
        } else {
            this.role = 'public';
            this.sessionId = null;
        }
        document.body.classList.add('role-' + this.role);
    }

TrainingApp.prototype.initSupabase = function() {
        const supabaseUrl = 'https://nkdgmxwznrrywwjwcsfk.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZGdteHd6bnJyeXd3andjc2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTU3MDgsImV4cCI6MjA5NTg5MTcwOH0.PHEA2ngQkln67Vm55Cb8YtDc_RlbVadsGiZ4aNmMd3U';
        
        if (typeof supabase !== 'undefined') {
            this.supabase = supabase.createClient(supabaseUrl, supabaseKey);
        } else {
            console.warn("Supabase library not loaded. Running in local fallback mode.");
        }
    }

TrainingApp.prototype.initInteractivity = async function() {
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

TrainingApp.prototype.bindAdminLoginEvents = function() {
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

TrainingApp.prototype.bindStagiaireLoginEvents = function() {
        const btnLogin = document.getElementById('btn-stagiaire-login');
        const nameInput = document.getElementById('stagiaire-name-input');
        const pinInput = document.getElementById('stagiaire-pin-input');
        const errorDiv = document.getElementById('stagiaire-login-error');

        if (!this.sessionId && pinInput) {
            pinInput.style.display = 'block';
        }

        const attemptLogin = async () => {
            const name = nameInput ? nameInput.value.trim() : '';
            if (!name) {
                errorDiv.innerText = 'Le prénom ne peut pas être vide.';
                return;
            }
            if (name.length < 2) {
                errorDiv.innerText = 'Le prénom doit faire au moins 2 caractères.';
                return;
            }

            if (!this.sessionId && pinInput) {
                const pinVal = parseInt(pinInput.value.trim(), 10);
                if (isNaN(pinVal) || pinVal < 1000 || pinVal > 9999) {
                    errorDiv.innerText = 'Le code de session doit être un nombre à 4 chiffres (ex: 7492).';
                    return;
                }
                this.sessionId = pinVal;
                localStorage.setItem('stagiaire_session_id', this.sessionId);
            }
            
            localStorage.setItem('stagiaire_prenom', name);
            this.prenom = name;
            document.getElementById('stagiaire-login-overlay').style.display = 'none';
            this.setupStagiaireMode();
        };

        if (btnLogin) btnLogin.onclick = attemptLogin;
        if (nameInput) nameInput.onkeydown = (e) => {
            if (e.key === 'Enter') attemptLogin();
        };
        if (pinInput) pinInput.onkeydown = (e) => {
            if (e.key === 'Enter') attemptLogin();
        };
    }

TrainingApp.prototype.setupFormateurMode = async function() {
        console.log("Formateur connecté avec succès ! Session active :", this.sessionId);
        
        // S'assurer que la session existe dans la table Supabase
        if (this.supabase) {
            await this.supabase.from('sessions').upsert({
                id: this.sessionId,
                active_theme_id: 'home',
                show_results: false
            });
        }

        // Afficher le QR Code et le Code PIN sur la page d'accueil
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
            const joinUrl = baseUrl + '?role=stagiaire&session=' + this.sessionId;
            
            const linkEl = document.getElementById('live-session-url');
            if (linkEl) {
                linkEl.href = joinUrl;
                linkEl.innerHTML = `<strong>${joinUrl}</strong> (Code PIN : <span style="color:var(--accent-purple); font-weight:800; font-size:1.1rem;">${this.sessionId}</span>)`;
            }
            const qrEl = document.getElementById('live-session-qr');
            if (qrEl) {
                qrEl.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(joinUrl);
            }
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
                        await this.supabase.from('votes').delete().eq('session_id', this.sessionId);
                        // Supprimer toutes les présences pour la session 1
                        await this.supabase.from('presences').delete().eq('session_id', this.sessionId);
                        // Réinitialiser la session en base de données
                        await this.supabase.from('sessions').update({
                            active_poll_id: null,
                            active_exercise_id: null,
                            show_results: false
                        }).eq('id', this.sessionId);
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

        const btnHomeClose = document.getElementById('btn-home-close-session');
        if (btnHomeClose) {
            btnHomeClose.onclick = () => this.closeFormateurSession();
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

TrainingApp.prototype.setupStagiaireMode = function() {
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

TrainingApp.prototype.setupPublicMode = function() {
        console.log("Mode public autonome actif (déconnecté de Supabase & sans pollution de session).");
        this.renderSidebar();
        this.themesGrid.innerHTML = '';
        this.renderHomeDashboard();
        // Ne PAS s'abonner aux canaux temps réel Supabase en mode public autonome
    }

TrainingApp.prototype.syncSessionState = async function() {
        if (!this.supabase || this.role !== 'formateur') return;
        const theme = this.currentThemeIndex === -1 ? null : THEMES[this.currentThemeIndex];
        const activeThemeId = theme ? theme.id : 'home';

        // Charger l'état actuel de show_results pour conserver la valeur en base de données
        const { data } = await this.supabase.from('sessions').select('show_results').eq('id', this.sessionId).single();
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
        }).eq('id', this.sessionId);
    }

TrainingApp.prototype.updateHeartbeat = async function() {
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
                session_id: this.sessionId,
                prenom: this.prenom,
                last_seen_at: now
            }).select();
            
            if (data && data[0]) {
                localStorage.setItem('stagiaire_presence_id', data[0].id);
            }
        }
    }

TrainingApp.prototype.subscribeToSession = function() {
        if (!this.supabase) return;
        
        // Listen to browser network changes for offline fallback
        window.addEventListener('offline', () => {
            const cached = localStorage.getItem('last_known_session_state');
            if (cached) {
                this.syncToPresenterState(JSON.parse(cached));
            }
        });
        
        this.supabase.from('sessions').select('*').eq('id', this.sessionId).single().then(({ data }) => {
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

        // Nettoyer tous les canaux préexistants sur l'instance Supabase pour éviter les erreurs de re-subscription
        if (this.supabase.getChannels) {
            try {
                const activeChannels = this.supabase.getChannels();
                activeChannels.forEach(ch => {
                    if (ch.topic === 'realtime:presences-channel' || ch.topic === 'realtime:session-state-channel') {
                        this.supabase.removeChannel(ch);
                    }
                });
            } catch (e) {}
        }

        try {
            this.sessionSubscription = this.supabase.channel('session-state-channel')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sessions', filter: 'id=eq.' + this.sessionId }, (payload) => {
                if (payload.new) {
                    localStorage.setItem('last_known_session_state', JSON.stringify(payload.new));
                    this.syncToPresenterState(payload.new);
                }
            });
            this.sessionSubscription.subscribe((status, err) => {
                if (err) console.log("Canal session en mode local/hors-ligne.");
            });

            // S'abonner aux présences pour voir la liste de la classe
            this.presenceChannel = this.supabase.channel('presences-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'presences' }, () => {
                this.refreshPresenceList();
            });
            this.presenceChannel.subscribe((status, err) => {
                if (err) console.log("Canal presences en mode local/hors-ligne.");
            });
        } catch (e) {
            console.log("Canaux temps réel Supabase réduits (mode local ou hors-ligne).");
        }
        this.refreshPresenceList();
    }

TrainingApp.prototype.syncToPresenterState = function(data) {
        if (data.active_poll_id === 'session-closed') {
            if (this.role === 'stagiaire') {
                localStorage.removeItem('stagiaire_session_id');
                alert(`🔒 La session N° ${this.sessionId} a été clôturée par le formateur. Merci pour votre participation !`);
                window.location.href = window.location.pathname;
                return;
            }
        }

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
        let zoomedOptionKey = null;

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
        } else {
            if (activePollId && activePollId.includes(':opt:')) {
                const optParts = activePollId.split(':opt:');
                activePollId = optParts[0];
                zoomedOptionKey = optParts[1];
            }
            if (activePollId && activePollId.includes(':')) {
                const parts = activePollId.split(':');
                activePollId = parts[0];
                this.revealState = parts[1];
            } else if (activePollId) {
                this.revealState = data.show_results ? 'answer' : 'hidden';
            }
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
                let customQuestion = "Proposez vos réponses ou remarques par écrit suite aux échanges en cours.";
                let cleanTestId = activePollId;
                let revState = this.revealState || 'hidden';
                
                if (cleanTestId.includes(':q:')) {
                    const qParts = cleanTestId.split(':q:');
                    cleanTestId = qParts[0];
                    let rest = qParts[1];
                    if (rest.includes(':')) {
                        const rParts = rest.split(':');
                        try { customQuestion = decodeURIComponent(rParts[0]); } catch(e) {}
                        revState = rParts[1];
                    } else {
                        try { customQuestion = decodeURIComponent(rest); } catch(e) {}
                    }
                } else if (cleanTestId.includes(':')) {
                    const parts = cleanTestId.split(':');
                    cleanTestId = parts[0];
                    revState = parts[1];
                }
                
                this.revealState = revState;
                
                const testObj = {
                    id: activePollId,
                    baseId: cleanTestId,
                    type: 'test-libre',
                    title: `Atelier libre / Échanges improvisés ✏️`,
                    question: customQuestion
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

        // 3. Gérer l'affichage du Zoom en temps réel (Stagiaire réponse OU Option Grand Écran)
        if (zoomedOptionKey) {
            this.showOptionZoomOverlay(this.activePoll, zoomedOptionKey, this.revealState);
        } else if (zoomedPrenom) {
            let pollIdForQuery = null;
            if (activePollId) {
                pollIdForQuery = activePollId;
            } else if (data.active_exercise_id) {
                pollIdForQuery = `ex-${data.active_exercise_id}`;
            }
            
            if (pollIdForQuery) {
                this.supabase.from('votes')
                    .select('reponse')
                    .eq('session_id', this.sessionId)
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
TrainingApp.prototype.closeFormateurSession = async function() {
    if (!this.supabase || this.role !== 'formateur') return;
    if (confirm(`Êtes-vous sûr de vouloir clôturer la session de formation N° ${this.sessionId} ? Tous les stagiaires connectés seront basculés en mode public autonome.`)) {
        try {
            await this.supabase.from('sessions').update({
                active_theme_id: 'home',
                active_poll_id: 'session-closed',
                show_results: false
            }).eq('id', this.sessionId);
            
            await this.supabase.from('presences').delete().eq('session_id', this.sessionId);
        } catch (e) {}
        
        localStorage.removeItem('active_formateur_session_id');
        alert(`La session N° ${this.sessionId} a été clôturée avec succès.`);
        window.location.href = window.location.pathname + '?role=formateur';
    }
};
