// ==========================================
// TIROIR D'INTERACTIVITÉ : SONDAGES, QUIZ, EVALUATIONS (FORMATION IA)
// ==========================================


TrainingApp.prototype.closeInteractivityPanel = function() {
        document.getElementById('interactivity-panel').classList.remove('open');
    }

TrainingApp.prototype.zoomResponse = async function(prenom) {
    if (!this.supabase || this.role !== 'formateur') return;
    
    if (this.currentZoomedPrenom === prenom) {
        this.clearZoom();
        return;
    }
    
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
        this.currentZoomedPrenom = prenom;
        await this.supabase.from('sessions').update({
            active_poll_id: targetPollId
        }).eq('id', this.sessionId);
    }
};

TrainingApp.prototype.clearZoom = async function() {
    this.currentZoomedPrenom = null;
    if (!this.supabase || this.role !== 'formateur') {
        this.hideZoomOverlay();
        return;
    }
    
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
    }).eq('id', this.sessionId);

    this.hideZoomOverlay();
};

TrainingApp.prototype.showZoomOverlay = function(prenom, responseText) {
    this.currentZoomedPrenom = prenom;
    let overlay = document.getElementById('zoom-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'zoom-overlay';
        overlay.className = 'zoom-response-overlay';
        document.body.appendChild(overlay);
    }
    
    const isFormateur = (this.role === 'formateur');
    
    overlay.innerHTML = `
        <div class="zoom-overlay-content" style="max-width: 750px; width:92%; background:#0f172a; border:2px solid var(--accent-purple); border-radius:16px; padding:2rem; text-align:center; color:white; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); position:relative;">
            ${isFormateur ? `<button class="zoom-overlay-close" id="btn-close-zoom" style="position:absolute; top:1rem; right:1.2rem; background:rgba(255,255,255,0.1); border:none; color:white; font-size:1.5rem; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>` : ''}
            
            <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem; margin-bottom:1rem;">
                <span style="font-size:2rem;">👤</span>
                <h3 style="font-size:1.5rem; font-weight:800; color:#f8fafc; margin:0;">
                    Réponse de <span style="color:var(--accent-sky);">${this.escapeHtml(prenom)}</span>
                </h3>
            </div>
            
            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); padding:1.5rem; border-radius:12px; max-height:50vh; overflow-y:auto; text-align:left; font-size:1.1rem; line-height:1.6; color:#f1f5f9; white-space:pre-wrap; font-family:'Outfit', sans-serif;">
                ${this.escapeHtml(responseText || 'Aucune réponse fournie')}
            </div>
            
            ${isFormateur ? `<div style="font-size:0.75rem; color:#64748b; margin-top:1.25rem; font-style:italic;">Cliquez sur ✖️ ou appuyez sur Échap pour fermer l'affichage grand écran pour toute la classe.</div>` : ''}
        </div>
    `;
    
    overlay.classList.add('visible');
    
    if (isFormateur) {
        const btnClose = overlay.querySelector('#btn-close-zoom');
        if (btnClose) {
            btnClose.onclick = () => this.clearZoom();
        }
    }
};


TrainingApp.prototype.zoomOption = async function(key, poll) {
    const currentPoll = poll || this.activePoll;
    if (!currentPoll) return;
    
    if (this.role !== 'formateur') {
        this.showOptionZoomOverlay(currentPoll, key, this.revealState);
        return;
    }
    
    if (this.currentZoomedOption === key) {
        this.closeOptionZoom();
        return;
    }
    
    const baseId = currentPoll.id;
    const rev = this.revealState || 'hidden';
    const newActivePollId = `${baseId}:${rev}:opt:${key}`;
    
    await this.supabase.from('sessions').update({
        active_poll_id: newActivePollId
    }).eq('id', this.sessionId);
};

TrainingApp.prototype.closeOptionZoom = async function() {
    this.currentZoomedOption = null;
    if (!this.supabase || this.role !== 'formateur') {
        this.hideZoomOverlay();
        return;
    }
    const currentPoll = this.activePoll;
    if (!currentPoll) {
        this.hideZoomOverlay();
        return;
    }
    const baseId = currentPoll.id;
    const rev = this.revealState || 'hidden';
    const newActivePollId = (rev !== 'hidden') ? `${baseId}:${rev}` : baseId;
    
    await this.supabase.from('sessions').update({
        active_poll_id: newActivePollId
    }).eq('id', this.sessionId);
};

TrainingApp.prototype.showOptionZoomOverlay = async function(poll, key, revealState) {
    this.currentZoomedOption = key;
    let overlay = document.getElementById('zoom-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'zoom-overlay';
        overlay.className = 'zoom-response-overlay';
        document.body.appendChild(overlay);
    }
    
    const currentPoll = poll || this.activePoll;
    let count = 0;
    let total = 0;
    let pct = 0;
    
    if (this.supabase && this.sessionId && currentPoll) {
        const { data: votes } = await this.supabase.from('votes')
            .select('*')
            .eq('session_id', this.sessionId)
            .eq('poll_id', currentPoll.id);
        const votesList = votes || [];
        total = votesList.length;
        count = votesList.filter(v => v.reponse === key).length;
        pct = total > 0 ? Math.round((count / total) * 100) : 0;
    }
    
    const label = (currentPoll && currentPoll.options && currentPoll.options[key]) ? currentPoll.options[key] : key;
    const isQuiz = currentPoll && currentPoll.type === 'quiz';
    const isAnswerRevealed = revealState === 'answer';
    const isCorrect = isQuiz && isAnswerRevealed && currentPoll.correct === key;
    const isIncorrect = isQuiz && isAnswerRevealed && currentPoll.correct !== key;
    
    let badgeHtml = '';
    if (isAnswerRevealed && isQuiz) {
        if (isCorrect) {
            badgeHtml = `<div style="display:inline-block; background:#dcfce7; color:#15803d; border:1px solid #86efac; padding:0.4rem 1.2rem; border-radius:20px; font-weight:800; font-size:0.95rem; margin-top:0.75rem;">🎉 RÉPONSE CORRECTE</div>`;
        } else {
            badgeHtml = `<div style="display:inline-block; background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5; padding:0.4rem 1.2rem; border-radius:20px; font-weight:800; font-size:0.95rem; margin-top:0.75rem;">❌ RÉPONSE INCORRECTE (La bonne réponse est : Option ${currentPoll.correct})</div>`;
        }
    }
    
    const isFormateur = (this.role === 'formateur');
    
    overlay.innerHTML = `
        <div class="zoom-overlay-content" style="max-width: 750px; width:92%; background:#0f172a; border:2px solid ${isCorrect ? '#22c55e' : (isIncorrect ? '#ef4444' : '#6366f1')}; border-radius:16px; padding:2rem; text-align:center; color:white; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); position:relative;">
            ${isFormateur ? `<button class="zoom-overlay-close" id="btn-close-zoom" style="position:absolute; top:1rem; right:1.2rem; background:rgba(255,255,255,0.1); border:none; color:white; font-size:1.5rem; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>` : ''}
            
            <div style="font-size:0.8rem; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem;">
                ${currentPoll ? this.escapeHtml(currentPoll.question || '') : 'Question'}
            </div>
            
            <div style="font-size:2.2rem; font-weight:900; color:${isCorrect ? '#4ade80' : (isIncorrect ? '#f87171' : '#60a5fa')}; margin-bottom:0.75rem;">
                Option ${key}
            </div>
            
            <div style="font-size:1.35rem; font-weight:700; color:#f8fafc; line-height:1.5; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:1.25rem; border-radius:12px; margin-bottom:1.25rem;">
                "${this.escapeHtml(label)}"
            </div>
            
            ${(revealState === 'votes' || revealState === 'answer') ? `
                <div style="background:linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15)); border:1px solid rgba(99,102,241,0.3); padding:1rem; border-radius:12px; display:inline-block; min-width:200px;">
                    <div style="font-size:2.5rem; font-weight:800; color:#818cf8; line-height:1;">${pct}%</div>
                    <div style="font-size:0.85rem; color:#cbd5e1; margin-top:0.3rem;">${count} vote${count > 1 ? 's' : ''} sur ${total}</div>
                </div>
            ` : ''}
            
            ${badgeHtml}
            
            ${(isAnswerRevealed && isQuiz && currentPoll.explanation) ? `
                <div style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); padding:1rem; border-radius:10px; font-size:0.85rem; color:#e2e8f0; text-align:left; margin-top:1.25rem; line-height:1.5;">
                    💡 <strong>Explication :</strong> ${this.escapeHtml(currentPoll.explanation)}
                </div>
            ` : ''}
            
            ${isFormateur ? `<div style="font-size:0.75rem; color:#64748b; margin-top:1rem; font-style:italic;">Cliquez sur ✖️ ou appuyez sur Échap pour fermer l'affichage grand écran pour toute la classe.</div>` : ''}
        </div>
    `;
    
    overlay.classList.add('visible');
    
    if (isFormateur) {
        const btnClose = overlay.querySelector('#btn-close-zoom');
        if (btnClose) {
            btnClose.onclick = () => this.closeOptionZoom();
        }
    }
};

TrainingApp.prototype.hideZoomOverlay = function() {
    this.currentZoomedOption = null;
    const overlay = document.getElementById('zoom-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
    }
};

TrainingApp.prototype.refreshFormateurPanel = async function() {
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
                    <div style="background:rgba(14,165,233,0.08); border:1px solid rgba(14,165,233,0.25); padding:0.85rem; border-radius:8px; margin-top:0.4rem; text-align:left;">
                        <span style="font-size:0.75rem; font-weight:800; color:var(--accent-sky); text-transform:uppercase;">📌 Énoncé diffusé aux stagiaires :</span>
                        <h4 style="margin:0.3rem 0 0.6rem 0; font-size:1rem; font-weight:700; color:var(--text-title); line-height:1.4;">${this.escapeHtml(this.activePoll.question)}</h4>
                        <button class="btn btn-secondary btn-sm" id="btn-edit-free-test-prompt" style="font-size:0.75rem; padding:0.3rem 0.65rem;">✏️ Modifier l'énoncé de la question</button>
                    </div>
                </div>
            `;
            
            const btnEditPrompt = qSection.querySelector('#btn-edit-free-test-prompt');
            if (btnEditPrompt) {
                btnEditPrompt.onclick = () => {
                    this.startFreeTest(this.activePoll.question);
                };
            }
            
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
                    <p class="poll-category">Thème ${THEMES.findIndex(t => t.id === 'exercices-ateliers') !== -1 ? THEMES.findIndex(t => t.id === 'exercices-ateliers') + 1 : 13} • Exercice ${this.activeExercise.support === 'pc' ? '🖥️ PC' : '📝 Papier'}</p>
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
                await this.supabase.from('sessions').update({ show_results: nextShow }).eq('id', this.sessionId);
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
                        <div class="poll-preview-option btn-zoom-poll-preview" data-key="${key}" style="font-size:0.78rem; margin-bottom:0.35rem; color:var(--text-body); padding:0.4rem 0.6rem; border-radius:6px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); cursor:pointer; transition:all 0.15s ease;" title="Cliquer pour afficher l'Option ${key} en Grand Écran pour toute la classe">
                            <strong style="color:var(--accent-blue)">Option ${key} :</strong> ${val} <span style="float:right; opacity:0.6;">🔍 Grand Écran</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        qSection.querySelectorAll('.btn-zoom-poll-preview').forEach(optEl => {
            optEl.onclick = () => {
                const key = optEl.dataset.key;
                this.zoomOption(key, poll);
            };
        });

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

TrainingApp.prototype.toggleRevealState = async function(poll) {
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
        }).eq('id', this.sessionId);
        
        this.revealState = nextPollIdWithSuffix.includes(':') ? nextPollIdWithSuffix.split(':')[1] : 'hidden';
        this.sessionState.show_results = nextShowResults;
        
        this.refreshFormateurPanel();
    }

TrainingApp.prototype.startPoll = async function(poll) {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activePoll = poll;
        this.revealState = 'hidden';
        this.sessionState.show_results = false;
        
        await this.supabase.from('votes').delete().eq('session_id', this.sessionId).eq('poll_id', poll.id);
        
        await this.supabase.from('sessions').update({
            active_poll_id: poll.id,
            show_results: false,
            active_exercise_id: null
        }).eq('id', this.sessionId);

        this.refreshFormateurPanel();
    }

TrainingApp.prototype.stopPoll = async function() {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activePoll = null;
        this.revealState = 'hidden';
        
        await this.supabase.from('sessions').update({
            active_poll_id: null,
            show_results: false
        }).eq('id', this.sessionId);

        this.refreshFormateurPanel();
    }

TrainingApp.prototype.stopActiveExercise = async function() {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activeExercise = null;
        this.revealState = 'hidden';
        
        await this.supabase.from('sessions').update({
            active_exercise_id: null,
            show_results: false
        }).eq('id', this.sessionId);

        this.refreshFormateurPanel();
    }

TrainingApp.prototype.loadPollResults = async function(poll) {
        if (!this.supabase) return;
        const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', poll.id);
        const votesList = votes || [];
        
        const votersCountSpan = document.getElementById('voters-count');
        const votersListDiv = document.getElementById('voters-names-list');
        
        votersCountSpan.innerText = votesList.length;
        votersListDiv.innerHTML = votesList.map(v => `
            <span class="voter-badge-name voted trainee-card-clickable" data-prenom="${this.escapeHtml(v.prenom)}" style="cursor:pointer; display:inline-flex; align-items:center; gap:0.3rem;" title="Cliquer pour afficher la réponse de ${this.escapeHtml(v.prenom)} en Grand Écran">✅ ${this.escapeHtml(v.prenom)} 🔍</span>
        `).join('');

        votersListDiv.querySelectorAll('.trainee-card-clickable').forEach(badge => {
            badge.onclick = () => {
                const prenom = badge.dataset.prenom;
                this.zoomResponse(prenom);
            };
        });

        const resultsSection = document.getElementById('panel-results-section');
        
        if (this.revealState === 'votes' || this.revealState === 'answer') {
            const counts = { A: 0, B: 0, C: 0, D: 0 };
            votesList.forEach(v => {
                if (counts[v.reponse] !== undefined) counts[v.reponse]++;
            });

            const total = votesList.length || 1;
            const revealAnswer = this.revealState === 'answer';
            
            resultsSection.innerHTML = `
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.5rem; margin-bottom:0.4rem; font-style:italic;">💡 Cliquez sur une option ci-dessous pour l'afficher en grand à tout l'amphithéâtre.</div>
                <div class="results-chart">
                    ${Object.entries(poll.options).map(([key, label]) => {
                        const count = counts[key] || 0;
                        const pct = Math.round((count / total) * 100);
                        const isCorrect = revealAnswer && poll.type === 'quiz' && poll.correct === key;
                        const barColor = isCorrect ? 'var(--accent-green)' : 'var(--accent-blue)';
                        const borderStyle = isCorrect ? 'border: 2px solid var(--accent-green);' : 'border: 1px solid var(--border-color);';
                        
                        return `
                            <div class="results-chart-row btn-zoom-poll-option" data-key="${key}" data-label="${this.escapeHtml(label)}" data-count="${count}" data-pct="${pct}" style="${borderStyle} padding: 0.5rem; border-radius: 6px; margin-bottom: 0.5rem; background: ${isCorrect ? 'rgba(16,185,129,0.08)' : 'var(--bg-main)'}; cursor:pointer; transition:transform 0.15s ease;">
                                <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:700; margin-bottom:0.3rem;">
                                    <span>${key}. ${label} ${isCorrect ? '✔️' : ''}</span>
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

            resultsSection.querySelectorAll('.btn-zoom-poll-option').forEach(row => {
                row.onclick = () => {
                    const key = row.dataset.key;
                    this.zoomOption(key, poll);
                };
            });
        } else {
            resultsSection.innerHTML = `
                <div style="text-align:center; padding:1.5rem; background:var(--bg-main); border:1px dashed var(--border-color); border-radius:6px; color:var(--text-muted); font-size:0.82rem; font-style:italic; margin-top:1rem;">
                    🔒 Les choix des réponses sont masqués. <br>Attente du formateur pour révéler les statistiques détaillées.
                </div>
            `;
        }
    }

TrainingApp.prototype.loadExerciseSubmissions = async function() {
        if (!this.supabase || !this.activeExercise) return;
        const pollId = `ex-${this.activeExercise.id}`;
        
        const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', pollId);
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

TrainingApp.prototype.launchLiveExercise = async function(ex) {
        if (!this.supabase || this.role !== 'formateur') return;
        this.activeExercise = ex;
        this.activePoll = null;
        this.revealState = 'hidden';
        
        const pollId = `ex-${ex.id}`;
        await this.supabase.from('votes').delete().eq('session_id', this.sessionId).eq('poll_id', pollId);
        
        await this.supabase.from('sessions').update({
            active_exercise_id: ex.id,
            active_poll_id: null,
            show_results: false
        }).eq('id', this.sessionId);

        const panel = document.getElementById('interactivity-panel');
        panel.classList.add('open');
        this.refreshFormateurPanel();
    }

TrainingApp.prototype.listenToPresenceAndVotes = function() {
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

TrainingApp.prototype.refreshPresenceList = async function() {
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
                                    await this.supabase.from('presences').delete().eq('session_id', this.sessionId).eq('prenom', prenomToKick);
                                    // 2. Supprimer de votes
                                    await this.supabase.from('votes').delete().eq('session_id', this.sessionId).eq('prenom', prenomToKick);
                                    
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

TrainingApp.prototype.showStagiairePollPanel = async function(poll, revealState) {
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
        const { data: myVote } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', poll.id).eq('prenom', this.prenom).maybeSingle();
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
                        session_id: this.sessionId,
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
                const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', poll.id);
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

TrainingApp.prototype.showStagiaireExercisePanel = async function(ex, showResults) {
        const panel = document.getElementById('interactivity-panel');
        panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        panelTitle.innerText = `Atelier : ${ex.title}`;

        const qSection = document.getElementById('panel-question-section');
        qSection.innerHTML = `
            <div class="poll-question-wrapper">
                <p class="poll-category">Thème ${THEMES.findIndex(t => t.id === 'exercices-ateliers') !== -1 ? THEMES.findIndex(t => t.id === 'exercices-ateliers') + 1 : 13} • Exercice ${ex.support === 'pc' ? '🖥️ PC' : '📝 Papier'}</p>
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
        const { data: mySub } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', pollId).eq('prenom', this.prenom).maybeSingle();

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
                        session_id: this.sessionId,
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
                        session_id: this.sessionId,
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

TrainingApp.prototype.startGeneralTest = async function(maxThemeIdx) {
        if (!this.supabase || this.role !== 'formateur') return;
        const testId = 'test-idx-' + maxThemeIdx;
        
        const testQuestions = INTERACTIVE_QUESTIONS.filter(q => {
            const tIdx = THEMES.findIndex(t => t.id === q.themeId);
            return tIdx >= 0 && tIdx <= maxThemeIdx;
        });
        const questionIds = testQuestions.map(q => q.id);
        
        if (questionIds.length > 0) {
            await this.supabase.from('votes').delete().eq('session_id', this.sessionId).in('poll_id', questionIds);
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
        }).eq('id', this.sessionId);

        this.refreshFormateurPanel();
    }

TrainingApp.prototype.loadTestResults = async function(testObj) {
        if (!this.supabase) return;
        
        const questionIds = testObj.questions.map(q => q.id);
        const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).in('poll_id', questionIds);
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
                const badgeClass = isCompleted ? 'voter-badge-name voted trainee-card-clickable' : 'voter-badge-name trainee-card-clickable';
                const icon = isCompleted ? '✅' : '⏳';
                return `<span class="${badgeClass}" data-prenom="${this.escapeHtml(v.prenom)}" style="cursor:pointer; display:inline-flex; align-items:center; gap:0.3rem;" title="Cliquer pour afficher les réponses de ${this.escapeHtml(v.prenom)} en Grand Écran">${icon} ${this.escapeHtml(v.prenom)}${scoreText} 🔍</span>`;
            }).join('');

            votersListDiv.querySelectorAll('.trainee-card-clickable').forEach(badge => {
                badge.onclick = () => {
                    const prenom = badge.dataset.prenom;
                    this.zoomResponse(prenom);
                };
            });
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

TrainingApp.prototype.showStagiaireTestPanel = async function(testObj, revealState) {
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
        const { data: myVotes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('prenom', this.prenom).in('poll_id', questionIds);
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
                        session_id: this.sessionId,
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

TrainingApp.prototype.showPublicPollPanel = async function(poll, revealState) {
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

TrainingApp.prototype.showPublicTestPanel = async function(testObj, revealState) {
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

TrainingApp.prototype.startFreeTest = function(initialQuestion) {
    if (!this.supabase || this.role !== 'formateur') return;
    
    let modal = document.getElementById('modal-start-free-test');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-start-free-test';
        modal.className = 'zoom-response-overlay';
        document.body.appendChild(modal);
    }
    
    const theme = (this.currentThemeIndex >= 0 && THEMES[this.currentThemeIndex]) ? THEMES[this.currentThemeIndex] : { id: 'general', title: 'Général' };
    const defaultQuestion = initialQuestion || "Proposez vos réponses, réflexions ou cas pratiques suite aux récents échanges.";
    
    modal.innerHTML = `
        <div class="zoom-overlay-content" style="max-width: 620px; width:92%; background:#0f172a; border:2px solid var(--accent-blue); border-radius:16px; padding:2rem; color:white; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); position:relative; text-align:left;">
            <button class="zoom-overlay-close" id="btn-close-free-test-modal" style="position:absolute; top:1rem; right:1.2rem; background:rgba(255,255,255,0.1); border:none; color:white; font-size:1.5rem; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;">&times;</button>
            
            <h3 style="font-size:1.3rem; font-weight:800; color:#f8fafc; margin:0 0 0.5rem 0; display:flex; align-items:center; gap:0.5rem;">
                ✏️ Lancer un Test Libre (${this.escapeHtml(theme.title)})
            </h3>
            
            <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:1.25rem; line-height:1.4;">
                Saisissez l'énoncé de la question ci-dessous. Elle sera diffusée instantanément en temps réel sur les écrans de l'ensemble des stagiaires.
            </p>
            
            <div style="margin-bottom:1.25rem;">
                <label style="font-size:0.8rem; font-weight:700; color:var(--accent-sky); display:block; margin-bottom:0.4rem;">
                    📌 Énoncé de la question :
                </label>
                <textarea id="free-test-prompt-input" style="width:100%; min-height:100px; background:rgba(30,41,59,0.8); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:white; padding:0.88rem; font-family:inherit; font-size:0.9rem; outline:none; resize:vertical;">${this.escapeHtml(defaultQuestion)}</textarea>
            </div>
            
            <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
                <button class="btn btn-secondary" id="btn-cancel-free-test-modal" style="padding:0.6rem 1rem; font-size:0.85rem;">Annuler</button>
                <button class="btn btn-primary" id="btn-confirm-free-test-modal" style="padding:0.6rem 1.25rem; font-size:0.85rem;">🚀 Diffuser la question (Temps Réel)</button>
            </div>
        </div>
    `;
    
    modal.classList.add('visible');
    
    const closeModal = () => modal.classList.remove('visible');
    modal.querySelector('#btn-close-free-test-modal').onclick = closeModal;
    modal.querySelector('#btn-cancel-free-test-modal').onclick = closeModal;
    
    modal.querySelector('#btn-confirm-free-test-modal').onclick = async () => {
        const questionText = modal.querySelector('#free-test-prompt-input').value.trim() || defaultQuestion;
        closeModal();
        await this.executeStartFreeTest(questionText);
    };
};

TrainingApp.prototype.executeStartFreeTest = async function(questionText) {
    if (!this.supabase || this.role !== 'formateur') return;
    const theme = (this.currentThemeIndex >= 0 && THEMES[this.currentThemeIndex]) ? THEMES[this.currentThemeIndex] : { id: 'general', title: 'Général' };
    const baseId = 'test-libre-' + theme.id;
    
    await this.supabase.from('votes').delete().eq('session_id', this.sessionId).eq('poll_id', baseId);
    
    this.sessionState.show_results = false;
    this.revealState = 'hidden';
    
    const encodedQ = encodeURIComponent(questionText);
    const fullActivePollId = `${baseId}:q:${encodedQ}`;
    
    this.activePoll = {
        id: fullActivePollId,
        baseId: baseId,
        type: 'test-libre',
        title: `Atelier libre / Échanges improvisés ✏️`,
        question: questionText
    };
    
    await this.supabase.from('sessions').update({
        active_poll_id: fullActivePollId,
        show_results: false,
        active_exercise_id: null
    }).eq('id', this.sessionId);

    this.refreshFormateurPanel();
};

TrainingApp.prototype.loadFreeTestResults = async function(testObj) {
    if (!this.supabase) return;
    const baseQueryId = testObj.baseId || testObj.id.split(':q:')[0].split(':')[0];
    const { data: votes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', baseQueryId);
    const votesList = votes || [];
    
    const votersCountSpan = document.getElementById('voters-count');
    const votersListDiv = document.getElementById('voters-names-list');
    
    if (votersCountSpan) votersCountSpan.innerText = `${votesList.length}`;
    
    if (votersListDiv) {
        if (votesList.length === 0) {
            votersListDiv.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--text-muted); font-style:italic;">En attente des réponses des stagiaires...</div>`;
        } else {
            votersListDiv.innerHTML = votesList.map(v => {
                return `
                    <div class="free-test-response-card trainee-card-clickable" data-prenom="${this.escapeHtml(v.prenom)}" style="background:rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem; margin-bottom: 0.5rem; text-align:left; cursor:pointer;" title="Cliquer pour afficher la réponse de ${this.escapeHtml(v.prenom)} en Grand Écran">
                        <div style="font-weight:700; color:var(--accent-sky); font-size:0.8rem; margin-bottom:0.25rem; display:flex; justify-content:space-between; pointer-events:none;">
                            <span>👤 ${this.escapeHtml(v.prenom)} 🔍</span>
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
};

TrainingApp.prototype.showStagiaireFreeTestPanel = async function(testObj, revealState) {
    const panel = document.getElementById('interactivity-panel');
    if (panel) panel.classList.add('open');

    const panelTitle = document.getElementById('panel-title');
    if (panelTitle) panelTitle.innerText = testObj.title;

    const qSection = document.getElementById('panel-question-section');
    if (qSection) {
        qSection.innerHTML = `
            <div class="poll-question-wrapper">
                <p class="poll-category">Test Libre ✏️</p>
                <div style="background:linear-gradient(135deg, rgba(14,165,233,0.12), rgba(99,102,241,0.12)); border:1px solid rgba(14,165,233,0.3); padding:1rem; border-radius:8px; margin-top:0.4rem; text-align:left;">
                    <span style="font-size:0.75rem; font-weight:800; color:var(--accent-sky); text-transform:uppercase;">📌 Énoncé de la question :</span>
                    <h4 style="margin:0.4rem 0 0 0; font-size:1.05rem; font-weight:700; color:white; line-height:1.45;">${this.escapeHtml(testObj.question)}</h4>
                </div>
            </div>
        `;
    }

    const voteFormSection = document.getElementById('panel-vote-form-section');
    const resultsSection = document.getElementById('panel-results-section');
    
    if (voteFormSection) voteFormSection.style.display = 'none';
    if (!resultsSection) return;
    resultsSection.style.display = 'block';

    const baseQueryId = testObj.baseId || testObj.id.split(':q:')[0].split(':')[0];
    const { data: myVote } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', baseQueryId).eq('prenom', this.prenom).maybeSingle();
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
                session_id: this.sessionId,
                poll_id: baseQueryId,
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
            const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', baseQueryId);
            const votesList = allVotes || [];
            
            html += `
                <h5 style="text-align:left; font-size:0.82rem; font-weight:700; margin-bottom:0.5rem; color:#f8fafc;">Réponses des participants :</h5>
                <div class="free-test-responses-container" style="max-height: 250px; overflow-y:auto; display:flex; flex-direction:column; gap:0.5rem; padding-right:4px;">
            `;
            
            if (votesList.length === 0) {
                html += `<p style="text-align:center; color:var(--text-muted); font-size:0.78rem; font-style:italic;">Aucune réponse pour le moment...</p>`;
            } else {
                html += votesList.map(v => `
                    <div class="free-test-response-card" style="background:rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.6rem 0.75rem; text-align:left;">
                        <div style="font-weight:700; color:var(--accent-sky); font-size:0.78rem; margin-bottom:0.2rem; display:flex; justify-content:space-between;">
                            <span>👤 ${this.escapeHtml(v.prenom)}</span>
                            <span style="font-size:0.68rem; color:var(--text-muted); font-weight:normal;">${new Date(v.created_at).toLocaleTimeString('fr-FR')}</span>
                        </div>
                        <div style="font-size:0.8rem; line-height:1.4; color:#f8fafc; white-space:pre-wrap;">${this.escapeHtml(v.reponse)}</div>
                    </div>
                `).join('');
            }
            html += `</div>`;
        }
        
        resultsSection.innerHTML = html;
    }
};

TrainingApp.prototype.showPublicFreeTestPanel = async function(testObj, revealState) {
    const panel = document.getElementById('interactivity-panel');
    if (panel) panel.classList.add('open');

    const panelTitle = document.getElementById('panel-title');
    if (panelTitle) panelTitle.innerText = testObj.title;

    const qSection = document.getElementById('panel-question-section');
    if (qSection) {
        qSection.innerHTML = `
            <div class="poll-question-wrapper">
                <p class="poll-category">Test Libre (Visiteur) ✏️</p>
                <div style="background:linear-gradient(135deg, rgba(14,165,233,0.12), rgba(99,102,241,0.12)); border:1px solid rgba(14,165,233,0.3); padding:1rem; border-radius:8px; margin-top:0.4rem; text-align:left;">
                    <span style="font-size:0.75rem; font-weight:800; color:var(--accent-sky); text-transform:uppercase;">📌 Énoncé de la question :</span>
                    <h4 style="margin:0.4rem 0 0 0; font-size:1.05rem; font-weight:700; color:white; line-height:1.45;">${this.escapeHtml(testObj.question)}</h4>
                </div>
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
        const baseQueryId = testObj.baseId || testObj.id.split(':q:')[0].split(':')[0];
        const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', baseQueryId);
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
                🕒 En attente de la publication des réponses des autres stagiaires par le formateur.
            </div>
        `;
    }
};

        const voteFormSection = document.getElementById('panel-vote-form-section');
        const resultsSection = document.getElementById('panel-results-section');
        
        if (voteFormSection) voteFormSection.style.display = 'none';
        if (!resultsSection) return;
        resultsSection.style.display = 'block';

        const showAllResults = (revealState === 'votes' || revealState === 'answer');

        if (showAllResults) {
            const { data: allVotes } = await this.supabase.from('votes').select('*').eq('session_id', this.sessionId).eq('poll_id', testObj.id);
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

TrainingApp.prototype.showPublicExercisePanel = async function(ex, showResults) {
        const panel = document.getElementById('interactivity-panel');
        if (panel) panel.classList.add('open');

        const panelTitle = document.getElementById('panel-title');
        if (panelTitle) panelTitle.innerText = `Atelier : ${ex.title}`;

        const qSection = document.getElementById('panel-question-section');
        if (qSection) {
            qSection.innerHTML = `
                <div class="poll-question-wrapper">
                    <p class="poll-category">Thème ${THEMES.findIndex(t => t.id === 'exercices-ateliers') !== -1 ? THEMES.findIndex(t => t.id === 'exercices-ateliers') + 1 : 13} • Exercice ${ex.support === 'pc' ? '🖥️ PC' : '📝 Papier'}</p>
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


// ==========================================
// INSTANCIATION DE L'APPLICATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TrainingApp();
});
