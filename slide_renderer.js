// ==========================================
// MODULE DE RENDU DES DIAPOSITIVES (FORMATION IA)
// ==========================================
function getSlideHTML(slide, theme) {
    let html = '';
            if (slide.type === 'moravec-paradox') {
                const cardLeft = slide.cardLeft || {
                    title: slide.hardForHuman ? slide.hardForHuman.title : "Difficile pour l'Homme",
                    desc: slide.hardForHuman ? slide.hardForHuman.desc : "",
                    items: slide.hardForHuman ? [slide.hardForHuman.result] : []
                };
                const cardRight = slide.cardRight || {
                    title: slide.easyForHuman ? slide.easyForHuman.title : "Facile pour l'Homme",
                    desc: slide.easyForHuman ? slide.easyForHuman.desc : "",
                    items: slide.easyForHuman ? [slide.easyForHuman.result] : []
                };
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || slide.intro || ''}</p>
                    <div class="moravec-container">
                        <div class="moravec-card card-machine">
                            <h3>${cardLeft.title}</h3>
                            <p class="moravec-card-desc">${cardLeft.desc}</p>
                            <ul class="moravec-list">
                                ${(cardLeft.items || []).map(item => `<li><span class="bullet">🤖</span> <span>${item}</span></li>`).join('')}
                            </ul>
                        </div>
                        <div class="moravec-card card-human">
                            <h3>${cardRight.title}</h3>
                            <p class="moravec-card-desc">${cardRight.desc}</p>
                            <ul class="moravec-list">
                                ${(cardRight.items || []).map(item => `<li><span class="bullet">👩‍💼</span> <span>${item}</span></li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    ${slide.pedagogy ? `<div class="maire-example-box" style="margin-top:1.5rem; border-left-color: var(--accent-blue);">${slide.pedagogy || ''}</div>` : (slide.conclusion ? `<div class="maire-example-box" style="margin-top:1.5rem; border-left-color: var(--accent-blue);">${slide.conclusion || ''}</div>` : '')}
                `;
            } else if (slide.type === 'automation-bias') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.intro || ''}</p>
                    <div class="bias-grid">
                        <div class="bias-card bias-concept">
                            <h3>${(slide.biasConcept && slide.biasConcept.title) || ''}</h3>
                            <p>${(slide.biasConcept && slide.biasConcept.desc) || ''}</p>
                        </div>
                        <div class="bias-card bias-responsibility">
                            <h3>${(slide.responsibility && slide.responsibility.title) || ''}</h3>
                            <p>${(slide.responsibility && slide.responsibility.desc) || ''}</p>
                        </div>
                    </div>
                    <div class="maire-example-box" style="margin-top:1.5rem; border-left-color: var(--accent-red); background: rgba(239, 68, 68, 0.02);">
                        ${slide.pedagogy || ''}
                    </div>
                `;
            } else if (slide.type === 'legal-charter-risks') {
                const sc = slide.charterComparison || {};
                html += `
                    <p style="margin-bottom:1.5rem; font-size:1.05rem; line-height:1.6;">${slide.intro || ''}</p>
                    
                    <!-- Comparative Cards: Without vs With Charter -->
                    <div class="legal-charter-grid">
                        <div class="legal-card sans-charte">
                            <h3 class="legal-card-title danger">${(sc.sansCharte && sc.sansCharte.title) || ''}</h3>
                            <div class="legal-card-subtitle danger">${(sc.sansCharte && sc.sansCharte.subtitle) || ''}</div>
                            <div class="legal-card-section">${(sc.sansCharte && sc.sansCharte.agent) || ''}</div>
                            <div class="legal-card-section footer">${(sc.sansCharte && sc.sansCharte.collectivite) || ''}</div>
                        </div>

                        <div class="legal-card avec-charte">
                            <h3 class="legal-card-title success">${(sc.avecCharte && sc.avecCharte.title) || ''}</h3>
                            <div class="legal-card-subtitle success">${(sc.avecCharte && sc.avecCharte.subtitle) || ''}</div>
                            <div class="legal-card-section">${(sc.avecCharte && sc.avecCharte.agent) || ''}</div>
                            <div class="legal-card-section footer">${(sc.avecCharte && sc.avecCharte.collectivite) || ''}</div>
                        </div>
                    </div>

                    <!-- Risk & Sanction Matrix -->
                    <h3 class="matrix-section-title">⚖️ Échelle des Risques & Sanctions Juridiques</h3>
                    <div class="risks-matrix-container">
                        ${(slide.risksMatrix || []).map(r => `
                            <div class="risk-matrix-card">
                                <div class="risk-matrix-col-level">
                                    <span class="risk-level-tag">${r.level}</span>
                                    <div class="risk-law-container"><span class="risk-law-badge">${r.law}</span></div>
                                </div>
                                <div class="risk-matrix-col-desc">
                                    <div class="risk-title">${r.title}</div>
                                    <div class="risk-desc">${r.desc}</div>
                                </div>
                                <div class="risk-matrix-col-agent">
                                    <div class="risk-col-label agent">👤 Sanctions Agent</div>
                                    <div class="risk-col-text">${r.agentSanction}</div>
                                </div>
                                <div class="risk-matrix-col-coll">
                                    <div class="risk-col-label coll">🏛️ Impact Collectivité</div>
                                    <div class="risk-col-text">${r.collectiviteSanction}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    ${slide.pedagogy ? `<div class="maire-example-box" style="margin-top:1.25rem; border-left-color: var(--accent-green); background: rgba(16, 185, 129, 0.03);">${slide.pedagogy}</div>` : ''}
                `;
            } else if (slide.type === 'vram-hardware-singularity') {
                const b = slide.basics || {};
                const w = slide.whyNot10YearsAgo || {};
                const s = slide.singularity || {};
                html += `
                    <p style="margin-bottom:1.5rem; font-size:1.05rem; line-height:1.6;">${slide.intro || ''}</p>
                    
                    <!-- Basics Bar -->
                    <div style="background: rgba(139, 92, 246, 0.06); border: 1px solid rgba(139, 92, 246, 0.25); border-radius: 12px; padding: 1.1rem; margin-bottom: 1.5rem;">
                        <h4 style="margin-top:0; color: var(--accent-purple); font-size: 1rem; margin-bottom: 0.75rem;">${b.title || ''}</h4>
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
                            ${(b.items || []).map(item => `
                                <div style="background: var(--bg-card, rgba(255,255,255,0.04)); padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid var(--border-color, rgba(255,255,255,0.08));">
                                    <div style="font-size:0.78rem; font-weight:700; color: var(--accent-sky);">${item.label}</div>
                                    <div style="font-size:0.88rem; font-weight:600; color: var(--text-title);">${item.val}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Models & Costs Cards -->
                    <div class="legal-charter-grid" style="margin-bottom: 1.5rem;">
                        ${(slide.modelsComparison || []).map((m, idx) => `
                            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-top: 4px solid ${idx === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)'}; border-radius: 12px; padding: 1.25rem; box-shadow: var(--shadow-sm);">
                                <h4 style="margin-top:0; font-size:1.05rem; color: var(--text-title); margin-bottom:0.5rem;">${m.title}</h4>
                                <p style="font-size:0.83rem; color: var(--text-muted); margin-bottom:0.85rem;">${m.desc}</p>
                                <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.85rem; background: rgba(0,0,0,0.03); padding:0.75rem; border-radius:8px; border:1px solid rgba(0,0,0,0.05);">
                                    <div><strong>💾 Poids du Modèle :</strong> ${m.vramWeights}</div>
                                    <div><strong>⚡ Mémoire Contexte (1M tokens) :</strong> ${m.vramContext}</div>
                                    <div style="padding-top:0.4rem; border-top: 1px dashed rgba(0,0,0,0.1); color:${idx === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)'}; font-weight:700;">
                                        📦 VRAM Totale : ${m.totalVram}
                                    </div>
                                    <div style="font-size:0.95rem; font-weight:800; color: var(--accent-gold);">
                                        💰 Investissement Matériel VRAM : ${m.cost}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Why Not 10 Years Ago -->
                    <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.25); border-left: 4px solid var(--accent-gold); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
                        <h4 style="margin-top:0; color: var(--accent-gold); font-size: 1.05rem; margin-bottom: 0.65rem;">${w.title || ''}</h4>
                        <ul style="margin:0; padding-left: 1.2rem; font-size: 0.88rem; line-height: 1.6; color: var(--text-body);">
                            ${(w.bullets || []).map(b => `<li style="margin-bottom:0.4rem;">${b}</li>`).join('')}
                        </ul>
                    </div>

                    <!-- Singularity Box -->
                    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 1.25rem;">
                        <h4 style="margin-top:0; color: var(--accent-purple); font-size: 1.1rem; margin-bottom: 0.65rem; display:flex; align-items:center; gap:0.5rem;">${s.title || ''}</h4>
                        <div style="font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.65rem;">${s.bio || ''}</div>
                        <div style="font-size: 0.9rem; line-height: 1.5; padding-top: 0.65rem; border-top: 1px dashed rgba(139, 92, 246, 0.25);">${s.projection || ''}</div>
                    </div>
                `;
            } else if (slide.type === 'amara-law') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || slide.intro || ''}</p>
                    ${slide.quote ? `
                    <div class="amara-quote-block">
                        <blockquote>${slide.quote || ''}</blockquote>
                        ${slide.author ? `<cite>— ${slide.author || ''}</cite>` : ''}
                    </div>` : ''}
                    <div class="amara-grid">
                        <div class="amara-card amara-short">
                            <h3>${(slide.shortTerm && slide.shortTerm.title) || ''}</h3>
                            <p>${(slide.shortTerm && slide.shortTerm.desc) || ''}</p>
                        </div>
                        <div class="amara-card amara-long">
                            <h3>${(slide.longTerm && slide.longTerm.title) || ''}</h3>
                            <p>${(slide.longTerm && slide.longTerm.desc) || ''}</p>
                        </div>
                    </div>
                    ${slide.pedagogy ? `<div class="maire-example-box" style="margin-top:1.5rem; border-left-color: var(--accent-gold);">${slide.pedagogy || ''}</div>` : ''}
                `;
            } else if (slide.type === 'timeline') {
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
                    <p style="margin-bottom:1.5rem;">${slide.intro || ''}</p>
                    
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
                            <h3>${(slide.localSpecs && slide.localSpecs.title) || ''}</h3>
                            <div class="comp-card-sub">${(slide.localSpecs && slide.localSpecs.subtitle) || ''}</div>
                            
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
                            <h3>${(slide.cloudSpecs && slide.cloudSpecs.title) || ''}</h3>
                            <div class="comp-card-sub">${(slide.cloudSpecs && slide.cloudSpecs.subtitle) || ''}</div>
                            
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
                    <p style="margin-bottom:1.5rem;">${slide.intro || ''}</p>
                    <div class="comparison-cards-container">
                        <div class="comp-card" style="border-top: 4px solid var(--accent-blue)">
                            <h3>${(slide.cardLeft && slide.cardLeft.title) || ''}</h3>
                            <div class="comp-card-sub">${(slide.cardLeft && slide.cardLeft.subtitle) || ''}</div>
                            <p class="comp-card-desc">${(slide.cardLeft && slide.cardLeft.desc) || ''}</p>
                            <div class="comp-card-formula">${(slide.cardLeft && slide.cardLeft.formula) || ''}</div>
                            <div class="comp-card-pro"><strong>Avantage :</strong> ${(slide.cardLeft && slide.cardLeft.advantage) || ''}</div>
                            <div class="comp-card-con"><strong>Inconvénient :</strong> ${(slide.cardLeft && slide.cardLeft.drawback) || ''}</div>
                        </div>
                        <div class="comp-card" style="border-top: 4px solid var(--accent-purple)">
                            <h3>${(slide.cardRight && slide.cardRight.title) || ''}</h3>
                            <div class="comp-card-sub">${(slide.cardRight && slide.cardRight.subtitle) || ''}</div>
                            <p class="comp-card-desc">${(slide.cardRight && slide.cardRight.desc) || ''}</p>
                            <div class="comp-card-formula">${(slide.cardRight && slide.cardRight.formula) || ''}</div>
                            <div class="comp-card-pro"><strong>Avantage :</strong> ${(slide.cardRight && slide.cardRight.advantage) || ''}</div>
                            <div class="comp-card-con"><strong>Inconvénient :</strong> ${(slide.cardRight && slide.cardRight.drawback) || ''}</div>
                        </div>
                    </div>
                `;
            } else if (slide.type === 'bar-chart') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                    <div class="bar-chart-container">
                `;
                (slide.data || []).forEach(item => {
                    const widthPercent = item.percent !== undefined ? item.percent : (item.value ? (item.value / 900) * 100 : 50);
                    const displayVal = item.time || (item.value ? `${item.value} mois` : '');
                    html += `
                        <div class="bar-chart-row">
                            <div class="bar-chart-label">${item.label || ''}</div>
                            <div class="bar-chart-track">
                                <div class="bar-chart-bar" style="width: ${widthPercent}%; background: ${item.color || 'var(--accent-blue)'};"></div>
                            </div>
                            <div class="bar-chart-value-label">${displayVal}</div>
                        </div>
                    `;
                });
                const noteText = slide.conclusion || slide.implication || '';
                if (noteText) {
                    html += `
                        </div>
                        <div class="maire-example-box" style="border-left-color: var(--accent-sky); margin-top:1.5rem;">
                            ${noteText}
                        </div>
                    `;
                } else {
                    html += `</div>`;
                }
            } else if (slide.type === 'schema-steps') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.intro || ''}</p>
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
                        ${slide.warning || ''}
                    </div>
                `;
            } else if (slide.type === 'semantic-map') {
                html += `
                    <p>${slide.desc || ''}</p>
                    <div class="semantic-map-container">
                        <div class="semantic-axis-x">${(slide.grid && slide.grid.xLabel) || ''}</div>
                        <div class="semantic-axis-y">${(slide.grid && slide.grid.yLabel) || ''}</div>
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
                        ${slide.mathExplanation || ''}
                    </div>
                `;
            } else if (slide.type === 'probability-cascade') {
                html += `
                    <p>${slide.desc || ''}</p>
                    <div class="maire-example-box" style="margin-bottom:1.5rem;">
                        <strong>Phrase en cours de génération :</strong><br>
                        <span style="font-family:monospace; color:var(--accent-blue); font-size:1.05rem;">"${slide.inputPhrase || ''}"</span>
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
                    <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">${slide.explanation || ''}</p>
                `;
            } else if (slide.type === 'analogy') {
                html += `
                    <div class="prompt-analogy-container">
                        <div class="analogy-pane analogy-pane-human">
                            <div class="analogy-pane-title">👩‍💼 Contexte de l'Homme</div>
                            <div class="analogy-content">
                                <div class="analogy-block creator">
                                    <h4>Contexte Créateur</h4>
                                    <p><strong>${(slide.humanCreator && slide.humanCreator.title) || ''} :</strong> ${(slide.humanCreator && slide.humanCreator.desc) || ''}</p>
                                </div>
                                <div class="analogy-block situation">
                                    <h4>Contexte de Situation</h4>
                                    <p><strong>${(slide.humanSituation && slide.humanSituation.title) || ''} :</strong> ${(slide.humanSituation && slide.humanSituation.desc) || ''}</p>
                                </div>
                            </div>
                        </div>
                        <div class="analogy-pane analogy-pane-ia">
                            <div class="analogy-pane-title">🤖 Contexte de l'IA (Prompt)</div>
                            <div class="analogy-content">
                                <div class="analogy-block creator">
                                    <h4>Contexte Créateur</h4>
                                    <p><strong>${(slide.iaCreator && slide.iaCreator.title) || ''} :</strong> ${(slide.iaCreator && slide.iaCreator.desc) || ''}</p>
                                </div>
                                <div class="analogy-block situation">
                                    <h4>Contexte de Situation</h4>
                                    <p><strong>${(slide.iaSituation && slide.iaSituation.title) || ''} :</strong> ${(slide.iaSituation && slide.iaSituation.desc) || ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="analogy-conclusion">
                        <div class="analogy-conclusion-icon">💡</div>
                        <div>
                            <p>${slide.conclusion || ''}</p>
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
                        <p>${slide.example || ''}</p>
                    </div>
                `;
            } else if (slide.type === 'color-coded-prompt') {
                html += `
                    <p style="margin-bottom:1rem;">${slide.promptTitle || ''} :</p>
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
                    <p style="margin-bottom:1rem;">${slide.desc || ''}</p>
                    <div class="gabarit-box">
                        <div class="gabarit-header">
                            <span>Gabarit de prompt M.A.I.R.E.</span>
                            <button class="gabarit-copy-btn btn-copy-code">Copier le gabarit</button>
                        </div>
                        <pre class="gabarit-pre"><code>${this.escapeHtml(slide.template)}</code></pre>
                    </div>
                    <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.75rem;">${slide.tips || ''}</p>
                `;
            } else if (slide.type === 'conflict-table') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
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
            } else if (slide.type === 'rgpd-principles') {
                html += `
                    <p style="margin-bottom:1.25rem; font-size:0.92rem; line-height:1.5; color:var(--text-body);">${slide.intro || ''}</p>
                    <div class="rgpd-container">
                        <div class="rgpd-grid">
                            ${slide.principles.map(p => `
                                <div class="rgpd-card rgpd-card-${p.num}">
                                    <div>
                                        <h3>
                                            <span class="num-badge">${p.num}</span>
                                            <span>${p.title}</span>
                                        </h3>
                                        <div class="rgpd-card-desc">${p.desc}</div>
                                        ${p.bulletPoints ? `
                                            <ul class="rgpd-card-bullets">
                                                ${p.bulletPoints.map(bp => `<li>${bp}</li>`).join('')}
                                            </ul>
                                        ` : ''}
                                    </div>
                                    ${p.prohibition ? `
                                        <div class="rgpd-card-prohibition">${p.prohibition}</div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                        <div class="rgpd-dpo-card">
                            <div class="rgpd-dpo-icon">🛡️</div>
                            <div class="rgpd-dpo-content">
                                <h4>${(slide.dpoReflex && slide.dpoReflex.title) || ''}</h4>
                                <p>${(slide.dpoReflex && slide.dpoReflex.desc) || ''}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slide.type === 'risk-pyramid') {
                html += `
                    <p>${slide.desc || ''}</p>
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
                    <p>${slide.desc || ''}</p>
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
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                    <div class="hallucination-diagram">
                        <div class="temp-bar-container">
                            <div class="temp-label-row">
                                <span style="color:var(--accent-blue)">Factuel / Précis (0.0)</span>
                                <span style="color:var(--accent-red)">Créatif / Libre (1.0)</span>
                            </div>
                            <div class="temp-bar">
                                <div class="temp-indicator" style="left: ${slide.temperature || ''}%;"></div>
                            </div>
                            <p style="font-size:0.75rem; text-align:center; margin-top:0.25rem; font-weight:700; color:var(--text-muted)">
                                Curseur recommandé pour l'administration : Température basse (~0.1 - 0.2)
                            </p>
                        </div>
                    </div>

                    <!-- Hallucination & Bias Interactive Detector Widget -->
                    <div class="interactive-widget-box" style="margin-top:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem;">
                        <h4 style="margin:0 0 0.75rem 0; font-family:'Outfit',sans-serif; color:var(--accent-gold); font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;">
                            🛡️ Détecteur & Surligneur d'Hallucinations et de Biais (Interactif)
                        </h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                            Choisissez un scénario administratif ci-dessous ou saisissez votre propre texte pour analyser en direct les zones d'hallucinations juridiques et de biais discriminatoires.
                        </p>
                        
                        <div class="scenario-buttons-row" style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem;">
                            ${(slide.scenarios || []).map((sc, idx) => `
                                <button class="btn btn-secondary btn-sc-select ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="font-size:0.82rem; padding:6px 12px;">
                                    ${sc.title}
                                </button>
                            `).join('')}
                        </div>

                        <div style="margin-bottom:1rem;">
                            <textarea id="hallu-input-text" rows="4" style="width:100%; background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:0.75rem; color:#f8fafc; font-family:inherit; font-size:0.88rem; line-height:1.5; resize:vertical;" placeholder="Collez ou tapez votre texte ici..."></textarea>
                        </div>

                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
                            <button class="btn btn-primary" id="btn-analyze-hallu" style="font-weight:700; font-size:0.88rem; padding:8px 18px;">
                                🔍 Analyser le texte
                            </button>
                            <div style="display:flex; gap:0.75rem; font-size:0.78rem;">
                                <span><strong style="color:#f87171;">● Rouge :</strong> Hallucination</span>
                                <span><strong style="color:#fb923c;">● Orange :</strong> Biais / Incohérence</span>
                                <span><strong style="color:#38bdf8;">● Bleu :</strong> Flou sans source</span>
                            </div>
                        </div>

                        <div id="hallu-output-results" style="background:rgba(0,0,0,0.3); border:1px dashed rgba(255,255,255,0.15); border-radius:8px; padding:1rem; font-size:0.9rem; line-height:1.7; min-height:80px;">
                            <span style="color:var(--text-muted); font-style:italic;">Cliquez sur 'Analyser le texte' pour voir le surlignage interactif...</span>
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
                    <p>${slide.desc || ''}</p>
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
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
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
                        ${slide.fact || ''}
                    </div>
                `;
            } else if (slide.type === 'eco-calculator') {
                html += `
                    <p style="margin-bottom:1.25rem; font-size:0.95rem; line-height:1.5;">${slide.desc || ''}</p>
                    <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">${slide.intro || ''}</p>

                    <div class="eco-sandbox-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem;">
                        <!-- Left Panel: Controls -->
                        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem;">
                            <h4 style="margin:0 0 1rem 0; font-family:'Outfit',sans-serif; color:var(--accent-green); font-size:1.05rem; display:flex; align-items:center; gap:0.5rem;">
                                ⚙️ Paramètres de la Collectivité
                            </h4>
                            
                            <div style="margin-bottom:1.25rem;">
                                <label style="display:flex; justify-justify:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-title);">
                                    <span>Nombre d'agents utilisateurs :</span>
                                    <span id="eco-val-agents" style="color:var(--accent-sky); font-family:monospace; font-size:0.95rem;">50 agents</span>
                                </label>
                                <input type="range" id="eco-slider-agents" min="5" max="500" step="5" value="50" style="width:100%; accent-color:var(--accent-sky);">
                            </div>

                            <div style="margin-bottom:1.25rem;">
                                <label style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-title);">
                                    <span>Requêtes quotidiennes par agent :</span>
                                    <span id="eco-val-reqs" style="color:var(--accent-purple); font-family:monospace; font-size:0.95rem;">15 req/jour</span>
                                </label>
                                <input type="range" id="eco-slider-reqs" min="1" max="100" step="1" value="15" style="width:100%; accent-color:var(--accent-purple);">
                            </div>

                            <div style="margin-bottom:1rem;">
                                <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem; color:var(--text-title);">
                                    Choix de l'Architecture IA :
                                </label>
                                <div style="display:flex; gap:0.5rem;">
                                    <button class="btn btn-secondary eco-model-toggle active" data-model="frugal" style="flex:1; font-size:0.8rem; padding:8px;">
                                        🌱 Modèle Frugal / TPU
                                    </button>
                                    <button class="btn btn-secondary eco-model-toggle" data-model="heavy" style="flex:1; font-size:0.8rem; padding:8px;">
                                        ⚡ Méga-Modèle Cloud
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Right Panel: Dynamic Results -->
                        <div style="background:rgba(16,185,129,0.03); border:1px solid rgba(16,185,129,0.2); border-radius:12px; padding:1.25rem;">
                            <h4 style="margin:0 0 1rem 0; font-family:'Outfit',sans-serif; color:#34d399; font-size:1.05rem; display:flex; align-items:center; gap:0.5rem;">
                                📊 Bilan Écologique Annuel Estimé
                            </h4>

                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
                                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:0.85rem; border-radius:8px; text-align:center;">
                                    <div style="font-size:2rem; margin-bottom:0.25rem;">💧</div>
                                    <div style="font-size:1.3rem; font-weight:800; color:#38bdf8; font-family:'Outfit',sans-serif;" id="eco-out-water">1 350 L</div>
                                    <div style="font-size:0.75rem; color:var(--text-muted);" id="eco-out-bottles">~2 700 bouteilles de 50cl</div>
                                    <div style="font-size:0.7rem; color:var(--text-muted); margin-top:0.2rem;">Refroidissement Datacenters</div>
                                </div>
                                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:0.85rem; border-radius:8px; text-align:center;">
                                    <div style="font-size:2rem; margin-bottom:0.25rem;">🚗</div>
                                    <div style="font-size:1.3rem; font-weight:800; color:#f43f5e; font-family:'Outfit',sans-serif;" id="eco-out-co2">48.5 kg CO₂</div>
                                    <div style="font-size:0.75rem; color:var(--text-muted);" id="eco-out-km">~370 km en voiture élec.</div>
                                    <div style="font-size:0.7rem; color:var(--text-muted); margin-top:0.2rem;">Émissions Équivalentes</div>
                                </div>
                            </div>

                            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:0.85rem; border-radius:8px; text-align:center;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-size:0.85rem; color:var(--text-title); font-weight:700;">⚡ Électricité consommée :</span>
                                    <span style="font-size:1.1rem; font-weight:800; color:var(--accent-gold); font-family:monospace;" id="eco-out-kwh">324.0 kWh</span>
                                </div>
                                <div style="font-size:0.76rem; color:var(--text-muted); text-align:right; margin-top:0.2rem;" id="eco-out-charges">
                                    Soit ~27 000 recharges de smartphone
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slide.type === 'vram-calculator') {
                html += `
                    <p style="margin-bottom:1.25rem; font-size:0.95rem; line-height:1.5;">${slide.desc || ''}</p>

                    <div class="vram-sandbox-container" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem;">
                        <h4 style="margin:0 0 1rem 0; font-family:'Outfit',sans-serif; color:var(--accent-purple); font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;">
                            🧮 Simulateur Matériel & VRAM (Temps Réel)
                        </h4>

                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
                            <!-- Column 1: Model & Quantization -->
                            <div>
                                <div style="margin-bottom:1rem;">
                                    <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-title);">
                                        1. Taille du Modèle (Paramètres en B) :
                                    </label>
                                    <select id="vram-select-model" style="width:100%; background:rgba(15,23,42,0.9); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:8px 12px; color:#f8fafc; font-size:0.88rem;">
                                        <option value="8">Mistral / Llama 3.1 (8B - Petit & Frugal)</option>
                                        <option value="12" selected>Mistral NeMo (12B - Intermédiaire)</option>
                                        <option value="14">Qwen 2.5 (14B - Polyvalent)</option>
                                        <option value="32">Qwen 2.5 (32B - Avancé)</option>
                                        <option value="70">Llama 3.3 / Qwen 2.5 (70B - Expert)</option>
                                        <option value="405">Llama 3.1 (405B - Géant Mégalopole)</option>
                                    </select>
                                </div>

                                <div>
                                    <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-title);">
                                        2. Précision / Quantification :
                                    </label>
                                    <select id="vram-select-quant" style="width:100%; background:rgba(15,23,42,0.9); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:8px 12px; color:#f8fafc; font-size:0.88rem;">
                                        <option value="4" selected>4-bit INT4 (Standard Local compact)</option>
                                        <option value="8">8-bit INT8 (Haute fidélité)</option>
                                        <option value="16">16-bit FP16 (Précision native non compressée)</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Column 2: Context & Concurrency -->
                            <div>
                                <div style="margin-bottom:1rem;">
                                    <label style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-title);">
                                        <span>3. Fenêtre de Contexte par session :</span>
                                        <span id="vram-val-context" style="color:var(--accent-sky); font-family:monospace;">8k tokens</span>
                                    </label>
                                    <input type="range" id="vram-slider-context" min="4" max="128" step="4" value="8" style="width:100%; accent-color:var(--accent-sky);">
                                </div>

                                <div>
                                    <label style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-title);">
                                        <span>4. Agents actifs simultanés :</span>
                                        <span id="vram-val-users" style="color:var(--accent-gold); font-family:monospace;">15 agents</span>
                                    </label>
                                    <input type="range" id="vram-slider-users" min="1" max="100" step="1" value="15" style="width:100%; accent-color:var(--accent-gold);">
                                </div>
                            </div>
                        </div>

                        <!-- Results Dashboard -->
                        <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:1.25rem;">
                            <div style="display:grid; grid-template-columns:1fr 1fr 1.2fr; gap:1rem; align-items:center;">
                                <div>
                                    <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Poids Modèle + Cache KV</div>
                                    <div style="font-size:1.8rem; font-weight:800; color:var(--accent-purple); font-family:'Outfit',sans-serif;" id="vram-out-total">66.0 Go VRAM</div>
                                    <div style="font-size:0.72rem; color:var(--text-muted);" id="vram-out-breakdown">Poids: 6 Go | Cache: 60 Go</div>
                                </div>

                                <div>
                                    <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Investissement GPU Estimé</div>
                                    <div style="font-size:1.8rem; font-weight:800; color:#10b981; font-family:'Outfit',sans-serif;" id="vram-out-cost">29 700 € HT</div>
                                    <div style="font-size:0.72rem; color:var(--text-muted);">Basé sur ~450€ / Go VRAM Pro</div>
                                </div>

                                <div style="background:rgba(168,85,247,0.08); border:1px solid rgba(168,85,247,0.25); border-radius:8px; padding:0.75rem;">
                                    <div style="font-size:0.75rem; color:#c084fc; font-weight:800; text-transform:uppercase; margin-bottom:0.2rem;">🖥️ Configuration Matérielle Déduite</div>
                                    <div style="font-size:0.85rem; font-weight:700; color:#f8fafc;" id="vram-out-hardware">2x Nvidia RTX 6000 Ada (96 Go VRAM)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slide.type === 'satellite-datacenter') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                    <div class="satellite-visual" style="font-size: 3.5rem; text-align:center; margin-bottom: 1.5rem;">🛰️☁️🌌</div>
                `;
                if (slide.pros && slide.cons) {
                    html += `
                        <div class="satellite-pros-cons">
                            <div class="sat-pane sat-pane-pros">
                                <h4>👍 Avantages théoriques</h4>
                                <ul class="sat-list">
                                    ${(slide.pros || []).map(p => `<li class="sat-list-item">${p}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="sat-pane sat-pane-cons">
                                <h4>👎 Limites et contraintes</h4>
                                <ul class="sat-list">
                                    ${(slide.cons || []).map(c => `<li class="sat-list-item">${c}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                } else if (slide.details) {
                    html += `
                        <div class="maire-example-box" style="margin-top:1.5rem; border-left-color: var(--accent-sky);">
                            ${slide.details || ''}
                        </div>
                    `;
                }
            } else if (slide.type === 'model-arbitrage') {
                html += `
                    <p style="margin-bottom:1.25rem; font-size:0.95rem; line-height:1.5;">${slide.intro || ''}</p>

                    <!-- Interactive Use-case Filters -->
                    <div style="margin-bottom:1.5rem;">
                        <div style="font-size:0.85rem; font-weight:700; color:var(--text-title); margin-bottom:0.5rem;">
                            🎯 Filtrer par Besoin Métier Territorial :
                        </div>
                        <div class="arbitrage-usecase-filters" style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                            ${(slide.useCases || []).map((uc, idx) => `
                                <button class="btn btn-secondary btn-arb-uc ${idx === 0 ? 'active' : ''}" data-uc="${uc.id}" style="font-size:0.82rem; padding:6px 12px;">
                                    ${uc.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Recent Models Interactive Matrix -->
                    <div class="models-matrix-grid" id="models-matrix-cards" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1rem;">
                        ${(slide.models || []).map(m => `
                            <div class="model-mat-card" data-model="${m.name}" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1rem; transition:all 0.2s;">
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                                    <h4 style="margin:0; font-family:'Outfit',sans-serif; color:var(--text-title); font-size:0.95rem;">${m.name}</h4>
                                    <span style="font-size:0.72rem; padding:2px 6px; border-radius:4px; font-weight:700; ${m.provider.includes('🇫🇷') ? 'background:rgba(14,165,233,0.15); color:var(--accent-sky); border:1px solid rgba(14,165,233,0.3);' : 'background:rgba(255,255,255,0.05); color:var(--text-muted);'}">
                                        ${m.provider}
                                    </span>
                                </div>
                                
                                <div style="display:flex; gap:0.4rem; margin-bottom:0.75rem; flex-wrap:wrap;">
                                    <span style="font-size:0.7rem; background:rgba(255,255,255,0.04); padding:2px 6px; border-radius:4px; color:var(--text-muted);">${m.type}</span>
                                    <span style="font-size:0.7rem; background:rgba(168,85,247,0.1); padding:2px 6px; border-radius:4px; color:#c084fc; font-weight:700;">${m.speed}</span>
                                </div>

                                <div style="font-size:0.8rem; line-height:1.45; margin-bottom:0.75rem; color:var(--text-body);">
                                    <div><strong>Coût API :</strong> $${m.costInput.toFixed(2)} / $${m.costOutput.toFixed(2)} par 1M tokens</div>
                                    <div><strong>Raisonnement :</strong> ${m.scoreReasoning}/100</div>
                                    <div style="color:var(--accent-green); font-size:0.76rem; margin-top:0.2rem;"><strong>RGPD / Souveraineté :</strong> ${m.rgpd}</div>
                                </div>

                                <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:0.5rem; font-size:0.76rem; color:var(--accent-sky);">
                                    💡 <strong>Idéal pour :</strong> ${m.bestFor}
                                </div>
                            </div>
                        `).join('')}
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
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                    <div class="agentic-flow-container">
                        <div class="flow-block">
                            <h4>${(slide.chatWorkflow && slide.chatWorkflow.title) || ''}</h4>
                            ${slide.chatWorkflow.steps.map((s, idx) => `
                                <div class="flow-step-item">
                                    <span style="color:var(--accent-blue); font-weight:800;">${s.role} :</span> ${s.text}
                                </div>
                                ${idx < slide.chatWorkflow.steps.length - 1 ? '<div class="flow-arrow-down">▼</div>' : ''}
                            `).join('')}
                        </div>
                        <div class="flow-block" style="border-color:var(--accent-green)">
                            <h4>${(slide.agenticWorkflow && slide.agenticWorkflow.title) || ''}</h4>
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
                    <p>${slide.desc || ''}</p>
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
            } else if (slide.type === 'multimodal-demo') {
                html += `
                    <p style="margin-bottom:1.25rem; font-size:0.95rem; line-height:1.5;">${slide.desc || ''}</p>
                    
                    <div class="multimodal-demo-container" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem;">
                        <h4 style="margin:0 0 1rem 0; font-family:'Outfit',sans-serif; color:var(--accent-sky); font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;">
                            📷🎙️ Démonstrateur Multimodal (Vision, OCR & Audio)
                        </h4>

                        <div class="multimodal-tabs-row" style="display:flex; gap:0.5rem; margin-bottom:1.25rem; flex-wrap:wrap;">
                            ${(slide.cases || []).map((cs, idx) => `
                                <button class="btn btn-secondary btn-mm-tab ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="font-size:0.85rem; padding:8px 14px;">
                                    ${cs.icon} ${cs.title.split(':')[0]}
                                </button>
                            `).join('')}
                        </div>

                        ${(slide.cases || []).map((cs, idx) => `
                            <div class="mm-case-pane ${idx === 0 ? 'active' : ''}" id="mm-pane-${idx}" style="display: ${idx === 0 ? 'block' : 'none'};">
                                <div style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:1.25rem;">
                                    <h4 style="margin:0 0 0.5rem 0; font-family:'Outfit',sans-serif; color:var(--text-title); font-size:1.05rem; display:flex; align-items:center; gap:0.5rem;">
                                        <span>${cs.icon}</span> <span>${cs.title}</span>
                                    </h4>
                                    
                                    <div style="font-size:0.88rem; color:var(--text-body); margin-bottom:0.75rem;">
                                        <strong>Mise en situation :</strong> ${cs.scenario}
                                    </div>
                                    <div style="font-size:0.88rem; color:var(--accent-sky); margin-bottom:1.25rem; background:rgba(14,165,233,0.08); border-left:3px solid var(--accent-sky); padding:8px 12px; border-radius:4px;">
                                        <strong>⚡ Traitement par l'IA :</strong> ${cs.iaAction}
                                    </div>

                                    <!-- Interactive Simulation Box -->
                                    <div style="background:rgba(0,0,0,0.4); border:1px dashed rgba(255,255,255,0.15); border-radius:8px; padding:1rem;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                                            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
                                                Simulateur de flux entrant :
                                            </span>
                                            <button class="btn btn-primary btn-run-mm-sim" data-idx="${idx}" style="font-size:0.82rem; padding:6px 14px;">
                                                🚀 Simuler l'analyse de l'Agent IA
                                            </button>
                                        </div>

                                        <div id="mm-sim-results-${idx}" style="font-size:0.85rem; line-height:1.6; color:#f8fafc;">
                                            ${idx === 0 ? `
                                                <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:1rem;">
                                                    <div style="background:rgba(255,255,255,0.05); padding:0.75rem; border-radius:6px; font-family:monospace; font-size:0.78rem; color:var(--text-muted);">
                                                        ${cs.demoData.inputDoc}<br><br>
                                                        [Document Numérisé]<br>
                                                        "Monsieur le Maire, je vous écris concernant ma demande d'aide pour l'isolation..."
                                                    </div>
                                                    <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); padding:0.75rem; border-radius:6px;">
                                                        <strong style="color:#34d399; font-size:0.8rem;">Extraction JSON Structurée :</strong>
                                                        <pre style="margin:0.4rem 0 0 0; font-family:monospace; font-size:0.76rem; color:#a7f3d0; white-space:pre-wrap;">${JSON.stringify(cs.demoData.extractedFields, null, 2)}</pre>
                                                    </div>
                                                </div>
                                            ` : idx === 1 ? `
                                                <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:1rem;">
                                                    <div style="background:rgba(255,255,255,0.05); padding:0.75rem; border-radius:6px; text-align:center;">
                                                        <div style="font-size:2.5rem; margin-bottom:0.4rem;">📷🗑️</div>
                                                        <div style="font-size:0.78rem; color:var(--text-muted);">${cs.demoData.photoName}</div>
                                                    </div>
                                                    <div style="background:rgba(14,165,233,0.08); border:1px solid rgba(14,165,233,0.2); padding:0.75rem; border-radius:6px; font-size:0.8rem; line-height:1.5;">
                                                        <div><strong style="color:var(--accent-sky);">Détection Objet :</strong> ${cs.demoData.detectedObject} (Confiance: ${cs.demoData.confidenceScore})</div>
                                                        <div style="margin-top:0.3rem;"><strong>Routage Automatique :</strong> ${cs.demoData.dispatchService}</div>
                                                        <div style="margin-top:0.3rem; color:var(--accent-gold);"><strong>Urgence :</strong> ${cs.demoData.priorityLevel}</div>
                                                    </div>
                                                </div>
                                            ` : `
                                                <div style="background:rgba(168,85,247,0.08); border:1px solid rgba(168,85,247,0.2); padding:0.85rem; border-radius:6px; font-size:0.8rem; line-height:1.5;">
                                                    <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#c084fc; font-weight:700;">
                                                        <span>${cs.demoData.audioFile}</span>
                                                        <span>Synthèse Whisper v3</span>
                                                    </div>
                                                    <div style="font-style:italic; color:var(--text-muted); margin-bottom:0.5rem; background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:4px;">
                                                        ${cs.demoData.transcriptionSample}
                                                    </div>
                                                    <div style="color:#34d399; font-weight:700;">✔️ ${cs.demoData.summaryGenerated}</div>
                                                </div>
                                            `}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (slide.type === 'antigravity-details') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
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
                    <p style="margin-bottom:1.5rem;">${slide.intro || ''}</p>
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
                if (this.role === 'stagiaire') {
                    html += `
                        <div class="ex-waiting-wrapper" style="text-align: center; padding: 4rem 2rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: var(--radius-lg); margin-top: 1.5rem;">
                            <div style="font-size: 3.5rem; margin-bottom: 1.5rem; animation: pulse 2s infinite;">🎯</div>
                            <h3 style="font-size: 1.5rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.75rem;">Atelier de Groupe en Direct</h3>
                            <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 500px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
                                Le formateur va lancer un exercice sur votre écran. Tenez-vous prêt à participer et à proposer vos solutions !
                            </p>
                            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.04); padding: 0.5rem 1rem; border-radius: 100px; border: 1px solid rgba(255,255,255,0.08); font-size: 0.8rem; color: var(--accent-sky);">
                                <span style="display:inline-block; width: 8px; height: 8px; background: var(--accent-green); border-radius: 50%; animation: blink 1.5s infinite;"></span>
                                En attente du lancement par le formateur...
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <p style="margin-bottom:1rem;">${slide.intro || ''}</p>
                        
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
                }
            } else if (slide.type === 'architecture-diagram') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                    <div class="tuto-architecture">
                        <div class="tuto-arch-box" style="border-color: var(--accent-blue)">
                            <h5>${(slide.frontend && slide.frontend.title) || ''}</h5>
                            <p>${(slide.frontend && slide.frontend.desc) || ''}</p>
                        </div>
                        <div class="tuto-flow-arrow">⇄</div>
                        <div class="tuto-arch-box" style="border-color: var(--accent-green)">
                            <h5>${(slide.backend && slide.backend.title) || ''}</h5>
                            <p>${(slide.backend && slide.backend.desc) || ''}</p>
                        </div>
                    </div>
                    ${slide.security ? `
                    <div class="maire-example-box" style="border-left-color: var(--accent-purple); margin-top:1.5rem;">
                        ${slide.security || ''}
                    </div>` : ''}
                `;
            } else if (slide.type === 'tuto-step') {
                html += `
                    <div class="schema-step-item" style="border-color:var(--accent-blue)">
                        <div class="schema-step-bubble">${slide.stepNum || ''}</div>
                        <div class="schema-step-details">
                            <h4>Objectif : ${slide.goal || ''}</h4>
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
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
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
                    <p style="margin-bottom:1.25rem;">${slide.desc || ''}</p>
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
                        ${slide.explanation || ''}
                    </div>
                `;
            } else if (slide.type === 'anonymizer-tool') {
                html += `
                    <p style="margin-bottom:1.25rem;">${slide.desc || ''}</p>
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
                        ${slide.explanation || ''}
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
                            <p>${slide.preamble || ''}</p>
                            
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
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                `;
                if (slide.questions && slide.questions.length > 0) {
                    html += `<div class="eval-questions-grid" style="display:flex; flex-direction:column; gap:1.25rem;">`;
                    slide.questions.forEach((qItem, qIdx) => {
                        html += `
                            <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem;">
                                <h4 style="margin:0 0 0.75rem 0; font-family:'Outfit',sans-serif; color:var(--text-title); font-size:0.95rem;">
                                    ${qItem.q}
                                </h4>
                                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:0.75rem;">
                                    ${(qItem.choices || []).map((ch, cIdx) => `
                                        <div style="font-size:0.85rem; padding:6px 12px; border-radius:6px; background:${showCorrection && cIdx === qItem.correct ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${showCorrection && cIdx === qItem.correct ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)'}; color:${showCorrection && cIdx === qItem.correct ? '#34d399' : 'var(--text-body)'};">
                                            ${ch} ${showCorrection && cIdx === qItem.correct ? '✔️ (Réponse Correcte)' : ''}
                                        </div>
                                    `).join('')}
                                </div>
                                ${showCorrection && qItem.exp ? `
                                    <div style="font-size:0.8rem; color:var(--accent-sky); background:rgba(14,165,233,0.08); padding:8px 12px; border-radius:6px;">
                                        💡 <strong>Explication :</strong> ${qItem.exp}
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    });
                    html += `</div>`;
                } else if (slide.scenario) {
                    html += `
                    <div style="background:var(--bg-main); border: 1px solid var(--border-color); padding: 1.5rem; border-radius:var(--radius-md); margin-bottom: 1.5rem;">
                        <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; margin-bottom:1rem; color:var(--text-title); display:flex; align-items:center; gap:0.5rem;">📝 Fiche d'Évaluation Individuelle (À faire sur papier)</h3>
                        <div style="background:white; border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-sm); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
                            <strong>Mise en situation de l'évaluation :</strong><br>
                            <em>${slide.scenario || ''}</em>
                        </div>
                        
                        ${showCorrection ? `
                        <button class="btn btn-secondary btn-toggle-correction" style="width:100%; justify-content:center;">Voir la correction officielle & la grille de notation</button>
                        
                        <div class="exercise-correction-box" style="display:none; margin-top:1.5rem; background:white; border:1px solid #bbf7d0; border-radius:var(--radius-sm); padding:1.25rem;">
                            <h4 style="color:#166534; font-weight:800; font-size:0.95rem; margin-bottom:0.75rem;">💡 Grille de Correction & Bonnes Pratiques</h4>
                            
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;">
                                <div style="background:#f0fdf4; border:1px solid #dcfce7; padding:1rem; border-radius:6px; font-size:0.82rem; line-height:1.5; color:#14532d;">
                                    <strong style="color:#166534; font-size:0.9rem;">✅ Choses à faire (DOs) :</strong>
                                    <ul style="margin-left:1.25rem; margin-top:0.4rem; padding:0;">
                                        ${(slide.dos || []).map(doItem => `<li style="margin-bottom:0.4rem;">${doItem}</li>`).join('')}
                                    </ul>
                                </div>
                                <div style="background:#fef2f2; border:1px solid #fee2e2; padding:1rem; border-radius:6px; font-size:0.82rem; line-height:1.5; color:#991b1b;">
                                    <strong style="color:#b91c1c; font-size:0.9rem;">❌ Choses à ne pas faire (DONTs) :</strong>
                                    <ul style="margin-left:1.25rem; margin-top:0.4rem; padding:0;">
                                        ${(slide.donts || []).map(dontItem => `<li style="margin-bottom:0.4rem;">${dontItem}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                            
                            ${slide.modelAnswer ? `
                            <h5 style="font-weight:700; font-size:0.88rem; color:var(--text-title); margin-bottom:0.4rem;">Exemple de Prompt Parfait attendu (Méthode M.A.I.R.E. anonymisée) :</h5>
                            <pre style="background:var(--bg-main); border:1px solid var(--border-color); padding:1rem; border-radius:6px; font-family:monospace; font-size:0.82rem; white-space:pre-wrap; color:#1e293b; line-height:1.5;">${slide.modelAnswer || ''}</pre>
                            ` : ''}
                        </div>
                        ` : `
                        <div style="text-align:center; padding: 1.5rem; color: var(--text-muted);">
                            <em>La grille de correction et les réponses attendues sont réservées au formateur.</em>
                        </div>
                        `}
                    </div>
                    `;
                }
            } else if (slide.type === 'dsi-decision-tree') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.intro || ''}</p>
                    <div class="dsi-tree-static">
                        <!-- Level 1 -->
                        <div class="dsi-level-card dsi-card-level-1">
                            <div class="dsi-card-left">
                                <h4 class="dsi-level-title">🔒 Niveau 1 : Blocage Total</h4>
                                <div class="dsi-badge-group">
                                    <span class="dsi-badge dsi-badge-exp">🎓 Expertise : Débutant formé</span>
                                    <span class="dsi-badge dsi-badge-prod">⚡ Productivité : +30% à 40% (Gain immédiat)</span>
                                    <span class="dsi-badge dsi-badge-ifse">💰 IFSE : Éligible IFSE (Socle)</span>
                                </div>
                            </div>
                            <div class="dsi-card-right">
                                <div class="dsi-card-situation">
                                    <strong>Situation DSI :</strong> Le poste de travail est bridé (installation d'applications interdite) et l'accès internet aux LLM grand public (ChatGPT, Gemini) est bloqué.
                                </div>
                                <div class="dsi-card-action">
                                    <strong>💡 Démarche à suivre :</strong> Sensibiliser la direction de la collectivité. Proposer la <strong>Charte d'usage de l'IA (Thème 5)</strong> et demander à la DSI le déploiement d'outils publics d'État comme <strong>Albert (IA Souveraine de la DINUM)</strong>.
                                </div>
                                <div class="dsi-card-tools">
                                    ⚙️ <strong>Outils associés :</strong> Formation de base requise • Sensibilisation à la sécurité et réglementation
                                </div>
                            </div>
                        </div>
    
                        <!-- Level 2 -->
                        <div class="dsi-level-card dsi-card-level-2">
                            <div class="dsi-card-left">
                                <h4 class="dsi-level-title">🌐 Niveau 2 : Accès Web Régulé</h4>
                                <div class="dsi-badge-group">
                                    <span class="dsi-badge dsi-badge-exp">🎓 Expertise : Praticien Averti</span>
                                    <span class="dsi-badge dsi-badge-prod">⚡ Productivité : +45% à 55%</span>
                                    <span class="dsi-badge dsi-badge-ifse">💰 IFSE : Éligible IFSE (Pratique)</span>
                                </div>
                            </div>
                            <div class="dsi-card-right">
                                <div class="dsi-card-situation">
                                    <strong>Situation DSI :</strong> Ordinateur bridé en local (pas d'installation de logiciels), mais l'accès web aux interfaces de dialogue (Gemini, ChatGPT) est débloqué par la DSI.
                                </div>
                                <div class="dsi-card-action">
                                    <strong>💡 Démarche à suivre :</strong> Utiliser l'IA uniquement sur données publiques ou fictives. Pour analyser des dossiers réels, utiliser obligatoirement une **extension Chrome de pseudonymisation** (approuvée par la DSI) ou des modules de nettoyage en ligne locaux.
                                </div>
                                <div class="dsi-card-tools">
                                    ⚙️ <strong>Outils associés :</strong> Extensions de navigateur de nettoyage de texte • Formulaire d'anonymisation locale JS
                                </div>
                            </div>
                        </div>
    
                        <!-- Level 3 -->
                        <div class="dsi-level-card dsi-card-level-3">
                            <div class="dsi-card-left">
                                <h4 class="dsi-level-title">📜 Niveau 3 : Poste Ouvert & Pionnier</h4>
                                <div class="dsi-badge-group">
                                    <span class="dsi-badge dsi-badge-exp">🎓 Expertise : Référent IA</span>
                                    <span class="dsi-badge dsi-badge-prod">⚡ Productivité : +60% à 70%</span>
                                    <span class="dsi-badge dsi-badge-ifse">💰 IFSE : Éligible IFSE (Référent)</span>
                                </div>
                            </div>
                            <div class="dsi-card-right">
                                <div class="dsi-card-situation">
                                    <strong>Situation DSI :</strong> Poste débridé (droits d'installation), DSI ouverte, mais absence de cadre réglementaire (pas de charte IA ni de directive officielle).
                                </div>
                                <div class="dsi-card-action">
                                    <strong>💡 Démarche à suivre :</strong> Faire valider la **Charte IA** en conseil municipal pour officialiser les usages. Utiliser des **applications de pseudonymisation locales autonomes** (ex. scripts Electron/Python locaux) et des modèles open-source locaux (LM Studio / Mistral local) pour un confinement total des données.
                                </div>
                                <div class="dsi-card-tools">
                                    ⚙️ <strong>Outils associés :</strong> Applications desktop d'anonymisation • IA hors ligne locale (Llama/Mistral)
                                </div>
                            </div>
                        </div>
    
                        <!-- Level 4 -->
                        <div class="dsi-level-card dsi-card-level-4">
                            <div class="dsi-card-left">
                                <h4 class="dsi-level-title">🚀 Niveau 4 : L'Agent Territorial Parfait</h4>
                                <div class="dsi-badge-group">
                                    <span class="dsi-badge dsi-badge-exp">🎓 Expertise : Concepteur</span>
                                    <span class="dsi-badge dsi-badge-prod">⚡ Productivité : +80% à 100% (Rendement maximal)</span>
                                    <span class="dsi-badge dsi-badge-ifse">💰 IFSE : Éligible IFSE (Expert + Prime)</span>
                                </div>
                            </div>
                            <div class="dsi-card-right">
                                <div class="dsi-card-situation">
                                    <strong>Situation DSI :</strong> DSI collaborative et ouverte. Utilisation d'un cadre cloud souverain (SecNumCloud) avec clés d'API bridées budgétairement et de la formation avancée pour l'agent.
                                </div>
                                <div class="dsi-card-action">
                                    <strong>💡 Démarche à suivre :</strong> Mettre en œuvre **l'architecture des 3 Dossiers** (Bruts ➔ Pseudonymisation automatique locale ➔ Serveur SecNumCloud + API Gemini ➔ Dé-pseudonymisation ➔ Restitués) pour automatiser en temps réel les flux d'usagers en sécurité totale.
                                </div>
                                <div class="dsi-card-tools">
                                    ⚙️ <strong>Outils associés :</strong> Logiciel local à 3 dossiers connecté à des agents autonomes • Proxy d'API avec limiteur de coût
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slide.type === 'dsi-ifse-matrix') {
                html += `
                    <p style="margin-bottom:1.25rem;">${slide.intro || ''}</p>
                    <div class="ifse-matrix-container">
                        <div class="ifse-card">
                            <div>
                                <span class="ifse-card-level ifse-level-1">Niveau 1 : Débutant formé</span>
                                <h3 class="ifse-card-title">Utilisateur Occasionnel</h3>
                                <p class="ifse-card-desc">L'agent utilise ponctuellement les LLM en ligne pour de la correction orthographique, des synthèses ou de la recherche. Tout agent formé et utilisant l'IA à ce niveau est éligible de plein droit à l'IFSE (+80€ à 120€ / mois) en raison de gains de productivité massifs dès la première utilisation.</p>
                            </div>
                            <div>
                                <div class="ifse-card-metric">⚡ Gain de temps : <strong>+30% à 40%</strong></div>
                                <div class="ifse-card-metric">🔒 Responsabilité RGPD : <strong>Initiale (données publiques, anonymisation de base)</strong></div>
                                <div class="ifse-card-impact">💼 IFSE : Revalorisation Socle (+80€ à 120€ / mois)</div>
                            </div>
                        </div>
                        
                        <div class="ifse-card">
                            <div>
                                <span class="ifse-card-level ifse-level-2">Niveau 2 : Intermédiaire</span>
                                <h3 class="ifse-card-title">Praticien Averti</h3>
                                <p class="ifse-card-desc">L'agent maîtrise la méthode M.A.I.R.E, le filtrage par extension Chrome ou formulaire JS, et gère de manière récurrente des tâches de rédaction de dossiers. Tout agent formé à ce niveau prétend à l'IFSE.</p>
                            </div>
                            <div>
                                <div class="ifse-card-metric">⚡ Gain de temps : <strong>+45% à 55%</strong></div>
                                <div class="ifse-card-metric">🔒 Responsabilité RGPD : <strong>Moyenne (anonymisation locale rigoureuse)</strong></div>
                                <div class="ifse-card-impact">💼 IFSE : Revalorisation Pratique (+130€ à 180€ / mois)</div>
                            </div>
                        </div>
                        
                        <div class="ifse-card">
                            <div>
                                <span class="ifse-card-level ifse-level-3">Niveau 3 : Avancé</span>
                                <h3 class="ifse-card-title">Référent IA de Direction</h3>
                                <p class="ifse-card-desc">L'agent est le garant de la conformité du service, aide ses collègues à formuler des requêtes sûres, teste des applications locales et audite les usages.</p>
                            </div>
                            <div>
                                <div class="ifse-card-metric">⚡ Gain de temps : <strong>+60% à 70%</strong></div>
                                <div class="ifse-card-metric">🔒 Responsabilité RGPD : <strong>Forte (garant des règles du service)</strong></div>
                                <div class="ifse-card-impact">💼 IFSE : Revalorisation Référent (+200€ à 300€ / mois + NBI)</div>
                            </div>
                        </div>
                        
                        <div class="ifse-card">
                            <div>
                                <span class="ifse-card-level ifse-level-4">Niveau 4 : Expert</span>
                                <h3 class="ifse-card-title">Concepteur Agentique</h3>
                                <p class="ifse-card-desc">L'agent conçoit et configure le pipeline local des 3 dossiers, optimise l'API souveraine, gère la boucle agentique et surveille le budget API.</p>
                            </div>
                            <div>
                                <div class="ifse-card-metric">⚡ Gain de temps : <strong>+80% à 100%</strong></div>
                                <div class="ifse-card-metric">🔒 Responsabilité RGPD : <strong>Très Forte (paramétrage des flux et API)</strong></div>
                                <div class="ifse-card-impact">💼 IFSE : Revalorisation Expert (+350€ à 500€ / mois + Prime projet)</div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (slide.type === 'dsi-agent-ultime') {
                html += `
                    <p style="margin-bottom:1rem;">${slide.intro || ''}</p>
                    
                    <div class="pipeline-wrapper">
                        <!-- Column 1: Folder 1 Raw -->
                        <div class="pipeline-col" id="col-folder-raw">
                            <div class="pipeline-col-header">
                                <span class="pipeline-col-num">1</span>
                                📁 Dossier 1 : Fichiers Bruts
                            </div>
                            <p class="pipeline-file-desc">L'agent glisse ses documents de travail contenant des données réelles et sensibles (courriels, fiches usagers).</p>
                            <div class="pipeline-files-list" id="list-raw-files">
                                <div class="pipeline-file-item">📄 signalement_dufour.txt</div>
                                <div class="pipeline-file-item">📄 demande_aide_sociale.pdf</div>
                            </div>
                            <button class="btn btn-secondary btn-sm" id="btn-simulate-pipeline" style="width:100%; justify-content:center; margin-top:auto;">🚀 Lancer la Pseudonymisation</button>
                        </div>
                        
                        <!-- Column 2: Folder 2 Pseudo -->
                        <div class="pipeline-col" id="col-folder-pseudo">
                            <div class="pipeline-col-header">
                                <span class="pipeline-col-num">2</span>
                                📁 Dossier 2 : Pseudonymisé
                            </div>
                            <p class="pipeline-file-desc">Les données nominatives réelles (ex: Maxime JACQUIOT) sont converties en identités fictives plausibles (ex: Henri DUPONT) via un dictionnaire JSON de substitution. <strong>Conserve la qualité linguistique du LLM !</strong></p>
                            <div class="pipeline-files-list" id="list-pseudo-files">
                                <div style="font-size:0.74rem; color:var(--text-muted); text-align:center; padding:1.25rem; font-style:italic;">Dossier vide</div>
                            </div>
                            <div class="pipeline-step-action" style="display:none;" id="action-pseudo-sent">
                                🔒 Envoyé via API bridée
                            </div>
                        </div>
                        
                        <!-- Column 3: Folder 3 Restored -->
                        <div class="pipeline-col" id="col-folder-restored">
                            <div class="pipeline-col-header">
                                <span class="pipeline-col-num">3</span>
                                📁 Dossier 3 : Restitué
                            </div>
                            <p class="pipeline-file-desc">Le résultat généré par l'IA est ré-associé automatiquement aux données d'identité originales via la clé locale du PC.</p>
                            <div class="pipeline-files-list" id="list-restored-files">
                                <div style="font-size:0.74rem; color:var(--text-muted); text-align:center; padding:1.25rem; font-style:italic;">Dossier vide</div>
                            </div>
                        </div>
                        
                        <!-- Center/Bottom: Cloud server bubble -->
                        <div class="pipeline-cloud-bubble">
                            <h4>🌩️ Serveur SecNumCloud (Orchestrateur) ➔ API Gemini (Bridage budgétaire)</h4>
                            <p>L'agent d'IA s'exécute dans un conteneur cloud souverain et interroge Gemini par API avec un jeton sécurisé. L'IA ne voit et ne traite <strong>QUE</strong> les fichiers du dossier 2 (anonymes), garantissant le respect du RGPD et l'immunité face au Cloud Act.</p>
                        </div>
                    </div>
                `;
            } else if (slide.type === 'pipeline-secnumcloud') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.25rem; margin-bottom:1.5rem;">
                        <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:1.25rem; border-radius:var(--radius-md);">
                            <h4 style="font-family:'Outfit',sans-serif; color:var(--accent-blue); font-size:1rem; margin-bottom:0.75rem;">
                                ${(slide.agentView && slide.agentView.title) || ''}
                            </h4>
                            <p style="font-size:0.88rem; line-height:1.6; color:var(--text-body);">
                                ${(slide.agentView && slide.agentView.desc) || ''}
                            </p>
                            <div style="margin-top:1rem; background:rgba(14,165,233,0.08); border:1px solid rgba(14,165,233,0.2); padding:0.88rem; border-radius:6px; font-size:0.82rem; color:var(--text-title);">
                                ✨ <strong>Bénéfice Agent :</strong> Aucun tri de fichier à faire soi-même. 0 risque d'amende CNIL ou de fuite RGPD.
                            </div>
                        </div>

                        <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:1.25rem; border-radius:var(--radius-md);">
                            <h4 style="font-family:'Outfit',sans-serif; color:var(--accent-purple); font-size:1rem; margin-bottom:0.75rem;">
                                ${(slide.dsiView && slide.dsiView.title) || ''}
                            </h4>
                            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
                                Déroulé de l'isolation VM et du routage anonymisé :
                            </p>
                            <button class="btn btn-primary btn-sm" id="btn-demo-secnumcloud-flow" style="width:100%; justify-content:center;">
                                🚀 Lancer la Simulation du Flux (5 Étapes)
                            </button>
                        </div>
                    </div>

                    <!-- Flow Diagram Grid -->
                    <div class="secnumcloud-flow-grid" style="display:grid; grid-template-columns: repeat(5, 1fr); gap:0.75rem; margin-top:1rem;">
                        ${((slide.dsiView && slide.dsiView.steps) || []).map((st, idx) => `
                            <div class="secnum-step-card" id="secnum-step-${idx+1}" style="background:white; border:1px solid var(--border-color); padding:0.88rem; border-radius:8px; transition:all 0.3s ease;">
                                <div style="font-size:0.75rem; font-weight:800; color:var(--accent-purple); margin-bottom:0.25rem;">${st.step}</div>
                                <h5 style="font-size:0.85rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-title);">${st.label}</h5>
                                <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.4; margin:0;">${st.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (slide.type === 'pipeline-cost-calculator') {
                html += `
                    <p style="margin-bottom:1.5rem;">${slide.desc || ''}</p>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:1.5rem; background:var(--bg-main); border:1px solid var(--border-color); padding:1.5rem; border-radius:var(--radius-md); margin-bottom:1.5rem;">
                        <!-- Left controls -->
                        <div>
                            <h4 style="font-family:'Outfit',sans-serif; font-size:1.05rem; margin-bottom:1.25rem; color:var(--text-title);">⚙️ Paramètres de la Collectivité</h4>
                            
                            <div style="margin-bottom:1.25rem;">
                                <label style="font-size:0.85rem; font-weight:700; color:var(--text-title); display:flex; justify-content:space-between;">
                                    <span>👥 Nombre d'Agents Utilisateurs :</span>
                                    <span id="pipeline-cost-agents-val" style="color:var(--accent-purple); font-weight:800;">50 Agents</span>
                                </label>
                                <input type="range" id="pipeline-cost-agents-range" min="5" max="1000" step="5" value="50" style="width:100%; margin-top:0.5rem;">
                            </div>

                            <div style="margin-bottom:1.25rem;">
                                <label style="font-size:0.85rem; font-weight:700; color:var(--text-title); display:flex; justify-content:space-between;">
                                    <span>⚡ Prompts / Jour Moyens par Agent :</span>
                                    <span id="pipeline-cost-req-val" style="color:var(--accent-blue); font-weight:800;">15 Requêtes / jour</span>
                                </label>
                                <input type="range" id="pipeline-cost-req-range" min="1" max="50" step="1" value="15" style="width:100%; margin-top:0.5rem;">
                            </div>

                            <div style="margin-bottom:1rem;">
                                <label style="font-size:0.85rem; font-weight:700; color:var(--text-title); display:block; margin-bottom:0.4rem;">
                                    🌩️ Instance SecNumCloud & Modèle Mistral :
                                </label>
                                <select id="pipeline-cost-cluster-select" class="form-select" style="width:100%; padding:0.5rem; font-size:0.85rem; border-radius:6px; background:white;">
                                    <option value="large" selected>🏆 Cluster L (Recommandé) : Mistral Large 2 123B (1 500€/mois - 2x H100 GPU)</option>
                                    <option value="med">Cluster M : Mistral Small 3 24B (600€/mois - 1x A100 GPU)</option>
                                    <option value="small">Cluster S : Mistral NeMo 12B (200€/mois - 1x RTX 6000 Ada)</option>
                                </select>
                                <div id="cluster-desc-banner" style="margin-top:0.5rem; font-size:0.78rem; color:var(--text-muted); background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.2); padding:0.6rem; border-radius:6px;">
                                    💡 <strong>Cluster L Recommandé :</strong> Embarque <strong>Mistral Large 2 (123 Milliards de paramètres)</strong> sur un cluster dédié 2x H100 (160GB VRAM). Garantit une puissance maximale pour analyser des dossiers municipaux volumineux et exécuter la pseudonymisation sans aucune hallucination.
                                </div>
                            </div>
                        </div>

                        <!-- Right results -->
                        <div style="background:white; border:1px solid var(--border-color); padding:1.25rem; border-radius:var(--radius-sm); display:flex; flex-direction:column; justify-content:space-between;">
                            <h4 style="font-family:'Outfit',sans-serif; font-size:1.05rem; margin-bottom:1rem; color:var(--text-title);">📊 Budget & Amortissement Prévisionnel (TCO)</h4>
                            
                            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem; margin-bottom:1rem;">
                                <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:0.75rem; border-radius:6px;">
                                    <span style="font-size:0.75rem; color:var(--text-muted); display:block;">Hébergement SecNumCloud / an :</span>
                                    <strong id="res-cost-secnum-year" style="font-size:1rem; color:#1e293b;">18 000 € HT</strong>
                                </div>
                                <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:0.75rem; border-radius:6px;">
                                    <span style="font-size:0.75rem; color:var(--text-muted); display:block;">API LLM Externe (Tokens) / an :</span>
                                    <strong id="res-cost-tokens-year" style="font-size:1rem; color:#1e293b;">1 620 € HT</strong>
                                </div>
                            </div>

                            <div style="background:linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1)); border:1px solid rgba(99,102,241,0.3); padding:1rem; border-radius:8px; margin-bottom:1rem; text-align:center;">
                                <div style="font-size:0.8rem; font-weight:700; color:var(--accent-purple); text-transform:uppercase; letter-spacing:0.5px;">Coût Global Amorti</div>
                                <div id="res-cost-per-agent" style="font-size:1.75rem; font-weight:800; color:#4f46e5; margin:0.2rem 0;">32.70 €</div>
                                <div style="font-size:0.78rem; color:var(--text-muted);">HT / Agent / Mois</div>
                            </div>

                            <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; background:#f1f5f9; padding:0.6rem; border-radius:6px;">
                                💡 <strong>Comparatif Cloud Direct :</strong> Un abonnement ChatGPT Plus grand public non sécurisé coûte 22 € HT/mois/agent. Cette architecture souveraine 100% RGPD est <strong>plus rentable dès 30 agents</strong>.
                            </div>
                        </div>
                    </div>

                    <!-- Quotas & Crédits par Métier / Catégorie -->
                    <div style="background:white; border:1px solid var(--border-color); padding:1.25rem; border-radius:var(--radius-md);">
                        <h4 style="font-family:'Outfit',sans-serif; font-size:1rem; color:var(--text-title); margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                            💳 Allocation des Crédits & Quotas par Catégorie Métier
                        </h4>
                        <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1rem;">
                            Pour optimiser le budget sans restreindre les utilisateurs clés, la DSI peut attribuer des quotas de requêtes quotidiens différenciés selon le rôle de l'agent :
                        </p>
                        
                        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1rem;">
                            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-top:4px solid var(--accent-sky); padding:1rem; border-radius:8px;">
                                <div style="font-size:0.75rem; font-weight:800; color:var(--accent-sky); text-transform:uppercase;">Catégorie C (Terrain)</div>
                                <div style="font-size:1.2rem; font-weight:800; color:var(--text-title); margin:0.3rem 0;">10 Requêtes / jour</div>
                                <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; margin:0;">
                                    Dictée vocale rapide, signalements d'incidents voirie, synthèses de fiches d'intervention.
                                </p>
                            </div>

                            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-top:4px solid var(--accent-blue); padding:1rem; border-radius:8px;">
                                <div style="font-size:0.75rem; font-weight:800; color:var(--accent-blue); text-transform:uppercase;">Catégorie B (Rédacteurs)</div>
                                <div style="font-size:1.2rem; font-weight:800; color:var(--text-title); margin:0.3rem 0;">35 Requêtes / jour</div>
                                <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; margin:0;">
                                    Rédaction de courriers aux usagers, procès-verbaux de réunion, synthèse de dossiers sociaux.
                                </p>
                            </div>

                            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-top:4px solid var(--accent-purple); padding:1rem; border-radius:8px;">
                                <div style="font-size:0.75rem; font-weight:800; color:var(--accent-purple); text-transform:uppercase;">Catégorie A / DSI (Conception)</div>
                                <div style="font-size:1.2rem; font-weight:800; color:var(--text-title); margin:0.3rem 0;">100 Requêtes / jour</div>
                                <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; margin:0;">
                                    Rédaction de délibérations municipales, analyse de marchés publics, audit juridique complexe.
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            }
    return html;
}
