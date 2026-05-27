/**
 * Formation IA Territoriale - Corpus de Cours Détaillé (30 Slides + Évaluation)
 * Fiches théoriques complètes, schémas HTML et exemples d'administration
 */

const THEMES = [
    {
        id: "histoire-ia",
        category: "hist",
        title: "1. L'Histoire de l'IA",
        icon: "⏳",
        desc: "Les grandes étapes de l'IA d'Alan Turing à nos jours, avec des comparatifs historiques et des graphiques d'adoption.",
        slides: [
            {
                title: "L'Arbre de l'IA (Symbolique vs Numérique)",
                type: "comparison-cards",
                intro: "L'histoire de l'IA est marquée par l'affrontement de deux visions philosophiques et techniques : l'IA Symbolique (basée sur la logique) et l'IA Numérique (basée sur l'apprentissage par les données).",
                cardLeft: {
                    title: "🤖 L'IA Symbolique (1950 - 1990)",
                    subtitle: "Approche descendante (Top-Down)",
                    desc: "Les ingénieurs codent manuellement toutes les règles logiques de l'intelligence. L'ordinateur applique des arbres de décisions stricts.",
                    formula: "SI (Revenu < X) ET (Enfants >= Y) ALORS Aide = OUI",
                    advantage: "Explicabilité totale : on sait exactement pourquoi la machine prend une décision.",
                    drawback: "Impossible de coder toutes les exceptions du monde réel. S'effondre face à l'ambiguïté."
                },
                cardRight: {
                    title: "🧠 L'IA Numérique (1990 - Présent)",
                    subtitle: "Approche ascendante (Bottom-Up)",
                    desc: "On ne donne aucune règle logique à la machine. On lui injecte des millions d'exemples de données, et elle ajuste ses poids statistiques pour apprendre seule.",
                    formula: "Entrée [Données] ➔ Réseau de Neurones ➔ Prédiction",
                    advantage: "Excellente pour reconnaître des motifs complexes (images, voix, textes flous).",
                    drawback: "Effet 'boîte noire' : très difficile de justifier précisément la formule mathématique interne."
                }
            },
            {
                title: "La Frise Chronologique des 6 Tournants",
                type: "timeline",
                events: [
                    { year: "1950", title: "Alan Turing & Le Test d'Imitation", desc: "Turing publie 'Computing Machinery and Intelligence' et pose la question : 'Les machines peuvent-elles penser ?' Il théorise que l'intelligence réside dans le traitement logique de l'information." },
                    { year: "1956", title: "Le Séminaire de Dartmouth", desc: "John McCarthy, Marvin Minsky, Claude Shannon et d'autres se réunissent durant un été. Ils créent officiellement le terme d'Intelligence Artificielle et prédisent avec un optimisme fou que l'IA sera résolue en quelques années." },
                    { year: "1974 - 1990", title: "Les Hivers de l'IA", desc: "Face aux échecs répétés des traducteurs automatiques et à l'incapacité des machines à comprendre le sens commun, les gouvernements coupent les budgets de recherche. C'est l'époque de la traversée du désert." },
                    { year: "1997", title: "Deep Blue bat Kasparov", desc: "Le supercalculateur d'IBM bat le champion du monde d'échecs. C'est le triomphe de la recherche de force brute statistique et de la puissance de calcul sur l'intuition humaine." },
                    { year: "2017", title: "L'Invention du Transformer", desc: "Google publie l'article 'Attention Is All You Need'. Il introduit le mécanisme d'attention permettant d'analyser le contexte global d'une phrase d'un coup, posant les bases des LLM modernes." },
                    { year: "2022", title: "L'Explosion de ChatGPT", desc: "OpenAI met en ligne une interface de dialogue gratuite. L'IA générative devient un outil de productivité grand public mondial en moins d'une semaine." }
                ]
            },
            {
                title: "La Vitesse d'Adoption (Le choc de 2022)",
                type: "bar-chart",
                desc: "Ce qui rend la révolution de l'IA générative inédite, ce n'est pas seulement la technologie, c'est la **vitesse phénoménale** à laquelle la société l'a adoptée. Ce graphique compare le nombre de mois requis pour atteindre **100 millions d'utilisateurs actifs** :",
                data: [
                    { label: "Téléphone fixe", value: 900, color: "var(--accent-blue)" },
                    { label: "Téléphone portable", value: 192, color: "var(--text-muted)" },
                    { label: "Netflix", value: 120, color: "var(--text-muted)" },
                    { label: "Facebook", value: 54, color: "var(--text-muted)" },
                    { label: "Instagram", value: 30, color: "var(--text-muted)" },
                    { label: "ChatGPT", value: 2, color: "var(--accent-sky)" }
                ],
                implication: "<strong>Implication pour les collectivités :</strong> Jamais une transition technologique n'a été si rapide. Les agents publics et les usagers se sont emparés de ces outils de façon autonome, obligeant les administrations à adapter leurs politiques de sécurité et d'efficacité à toute vitesse."
            }
        ]
    },
    {
        id: "technique-llm",
        category: "tech",
        title: "2. La Technique Simplifiée",
        icon: "⚙️",
        desc: "Démystifier le fonctionnement interne d'un LLM : de la découpe des mots à la projection géométrique.",
        slides: [
            {
                title: "Voyage au cœur du mot (La Tokenisation)",
                type: "schema-steps",
                intro: "Une IA ne sait pas lire le texte comme nous. Elle doit d'abord le hacher en petits morceaux numériques. Voici le parcours de la phrase <em>'M. le Maire vote la délibération'</em> :",
                steps: [
                    { num: "1", title: "Texte Brut", desc: "L'utilisateur saisit la phrase en français dans le chat.", content: "\"M. le Maire vote la délibération.\"" },
                    { num: "2", title: "Tokenisation", desc: "Le texte est découpé par l'algorithme. Les mots courants restent entiers, les mots rares ou complexes sont scindés.", content: "['M.', ' le', ' Maire', ' vote', ' la', ' dé', 'lib', 'ération', '.']" },
                    { num: "3", title: "Numérisation", desc: "Chaque token est remplacé par son identifiant numérique unique dans le dictionnaire de l'IA.", content: "[1209, 312, 4521, 1420, 290, 782, 9034, 1145, 13]" }
                ],
                warning: "<strong>⚠️ Piège pour l'administration :</strong> Les sigles (P.L.U., R.G.P.D., D.G.T.) consomment beaucoup plus de tokens car l'IA doit traiter chaque lettre séparément. De plus, les IA sont facturées au nombre de tokens, et le français consomme environ 30% de tokens de plus que l'anglais pour la même idée !"
            },
            {
                title: "La Carte des Mots (Les Embeddings)",
                type: "semantic-map",
                desc: "Une fois numérisés, comment l'IA comprend-elle le sens des mots ? Elle utilise les **Embeddings** : chaque mot devient un vecteur situé dans un espace géométrique géant. Les mots ayant un sens proche sont placés très près les uns des autres.",
                grid: {
                    xLabel: "Pouvoir / Hiérarchie ➔",
                    yLabel: "Contextes Territoriaux ➔",
                    points: [
                        { name: "Maire", x: 80, y: 75, group: "gov" },
                        { name: "Mairie", x: 30, y: 80, group: "gov" },
                        { name: "Conseil Municipal", x: 75, y: 85, group: "gov" },
                        { name: "Délibération", x: 50, y: 70, group: "gov" },
                        { name: "Secrétaire", x: 20, y: 55, group: "gov" },
                        { name: "Tondeuse", x: 15, y: 15, group: "tools" },
                        { name: "Pelle", x: 10, y: 20, group: "tools" },
                        { name: "Banane", x: 90, y: 10, group: "food" }
                    ]
                },
                mathExplanation: "<strong>L'Algèbre du sens :</strong> L'espace vectoriel permet à l'IA d'effectuer des calculs mathématiques sur le sens des mots (ex: <code>Maire - Homme + Femme = Mairesse</code>).<br><br><strong>🍌 Pourquoi 'Banane' est-il en bas à droite ?</strong><br>Le mot 'Banane' est un fruit. N'ayant aucun rapport logique avec la gestion municipale ('Mairie') ou les outils techniques des espaces verts ('Pelle'), le réseau de neurones l'exclut géométriquement et le repousse à l'extrême périphérie de sa carte sémantique."
            },
            {
                title: "Bac à sable : Expérimenter la tokenisation",
                type: "token-sandbox",
                desc: "La tokenisation influence directement la vitesse, le coût et l'empreinte écologique des modèles d'IA. Tapez votre propre texte ci-dessous pour voir comment l'IA le découpe et comparer les architectures de Google et OpenAI.",
                explanation: "<strong>💡 Comparatif Technique :</strong><br>• <strong>Modèle ChatGPT (OpenAI)</strong> : Utilise un dictionnaire de tokens moins optimisé pour le français (1 mot ≈ 1.35 tokens). Exécute ses calculs sur des GPU standard (Nvidia) très énergivores.<br>• <strong>Modèle Gemini (Google)</strong> : Utilise un tokenizer multilingue très optimisé (1 mot ≈ 1.1 tokens). Exécute ses calculs sur des processeurs TPU (Google) conçus pour l'IA, quatre fois plus sobres en électricité.<br>➔ <strong>Résultat :</strong> Pour les administrations publiques, utiliser un modèle européen ou optimisé comme Gemini permet de réduire les factures d'API et la pollution numérique."
            }
        ]
    },
    {
        id: "prompt-homme",
        category: "prompt",
        title: "3. Prompt vs Homme",
        icon: "🧠",
        desc: "L'analogie narrative complète pour comprendre l'absence de sens inné chez l'IA et l'exigence de contexte.",
        slides: [
            {
                title: "Le Parallèle des Contextes",
                type: "analogy",
                humanCreator: {
                    title: "Situation Familiale de Naissance",
                    desc: "La situation familiale dans laquelle on naît, nos parents, notre éducation, notre histoire personnelle et les barrières morales que la société nous a inculquées en grandissant."
                },
                humanSituation: {
                    title: "Ce qui se passe maintenant",
                    desc: "La situation immédiate qui se produit autour de nous à cet instant précis, perçue par nos yeux, nos oreilles et notre corps (le vent, le froid, une personne qui s'énerve)."
                },
                iaCreator: {
                    title: "Consignes Système (System Prompt)",
                    desc: "Les garde-fous programmés par les créateurs de l'IA (règles de sécurité, interdiction de donner des recettes de bombes, style poli, neutralité politique)."
                },
                iaSituation: {
                    title: "Contexte Utilisateur (Le Prompt)",
                    desc: "Toutes les descriptions, consignes et informations de travail que l'utilisateur tape explicitement dans le champ textuel de l'IA pour lui décrire sa situation."
                },
                conclusion: "L'Homme réagit beaucoup plus vite à la situation immédiate car il n'a pas besoin qu'on lui décrive la pièce, le bruit ou l'urgence : ses capteurs biologiques s'en chargent. En revanche, l'IA est enfermée dans un serveur aveugle. Sans une description méticuleuse et rédigée de votre part (le contexte utilisateur), l'IA ne sait rien de votre urgence ni de vos contraintes."
            },
            {
                title: "Mise en Situation : L'Alarme Incendie",
                type: "comparison-cards",
                intro: "Pour comprendre l'importance d'un prompt complet, imaginons qu'une alarme incendie se déclenche dans le hall d'accueil de la mairie.",
                cardLeft: {
                    title: "👩‍💼 Réaction de l'Agent d'Accueil (Homme)",
                    subtitle: "Instantanée mais stressée",
                    desc: "L'agent n'a pas besoin qu'on lui explique la situation. Il entend la sirène, il sent l'odeur de fumée. Il réagit en 2 secondes en ordonnant l'évacuation.",
                    formula: "Sens Biologiques ➔ Action de Sécurité",
                    advantage: "Réaction réflexe immédiate sans aucune perte de temps d'analyse écrite.",
                    drawback: "Sous le coup du stress, l'agent peut oublier de vérifier si la réserve est fermée ou paniquer face aux usagers."
                },
                cardRight: {
                    title: "🤖 Réaction de l'IA (Sans contexte complet)",
                    subtitle: "Précise mais aveugle",
                    desc: "Si vous tapez juste : <em>'L'alarme sonne, je fais quoi ?'</em>, l'IA va vous répondre par des généralités inutiles (ex: appeler les pompiers). Elle ne sait pas où vous êtes, ni de quelle alarme il s'agit.",
                    formula: "Prompt Vague ➔ Conseils Génériques et Flous",
                    advantage: "L'IA conserve son sang-froid mathématique absolu.",
                    drawback: "Incapable d'agir utilement sans que vous lui précisiez le protocole interne de la mairie et la nature de l'incident."
                }
            },
            {
                title: "Le Pont Sensoriel du Prompt",
                type: "bridge-schema",
                desc: "Rédiger un bon prompt consiste à construire un **pont sensoriel** pour l'IA. Puisqu'elle n'a pas d'yeux ni d'oreilles, votre texte doit simuler son environnement pour qu'elle puisse réagir avec pertinence.",
                elements: [
                    { title: "🧠 Vos Capteurs", desc: "Vous observez la situation réelle (ex: un usager en colère refuse de payer son amende de stationnement)." },
                    { title: "🌉 Le Pont du Prompt", desc: "Vous transmettez cette scène par écrit à l'IA : description de l'usager, règlement municipal, profil de votre commune." },
                    { title: "💾 Le Cerveau de l'IA", desc: "L'IA applique ses capacités logiques sur ce contexte précis pour vous générer une réponse de désescalade sur-mesure." }
                ]
            }
        ]
    },
    {
        id: "methode-maire",
        category: "prompt",
        title: "4. La Méthode M.A.I.R.E.",
        icon: "📋",
        desc: "La méthodologie de structuration des invites professionnelles pour le secteur public.",
        slides: [
            {
                title: "Le Tableau de Bord M.A.I.R.E.",
                type: "maire",
                steps: [
                    { letter: "M", label: "Moi", desc: "Qui êtes-vous ? (Ex: Chef de projet transition écologique dans une métropole de 150 000 habitants)." },
                    { letter: "A", label: "Agent", desc: "Quel rôle donnez-vous à l'IA ? (Ex: Agis en tant qu'expert en aménagement urbain durable)." },
                    { letter: "I", label: "Information", desc: "Quelle est la tâche ou le problème ? (Ex: Je dois rédiger le cahier des charges pour l'installation d'îlots de fraîcheur)." },
                    { letter: "R", label: "Ressources", desc: "Quelles données fournissez-vous ? (Ex: Voici le plan du parvis et la liste des essences d'arbres autorisées par notre charte)." },
                    { letter: "E", label: "Exigence", desc: "Quel est le livrable attendu ? (Ex: Rédige une liste structurée en 5 points clés sous format tableau Markdown, ton technique)." }
                ],
                example: "La méthode M.A.I.R.E. permet d'éviter l'effet 'page blanche' et garantit que l'IA dispose de tous les éléments nécessaires dès son premier calcul."
            },
            {
                title: "Exemple Réel Décortiqué",
                type: "color-coded-prompt",
                promptTitle: "Prompt pour la rédaction d'un discours municipal",
                parts: [
                    { key: "M", color: "var(--accent-blue)", label: "Moi", text: "Je suis le directeur de cabinet du maire d'une petite commune rurale de 1200 habitants." },
                    { key: "A", color: "var(--accent-purple)", label: "Agent", text: "Tu es une plume politique expérimentée, spécialisée dans les discours républicains de proximité." },
                    { key: "I", color: "var(--accent-sky)", label: "Information", text: "Le Maire doit prononcer un discours d'inauguration pour la réouverture de la bibliothèque municipale après travaux." },
                    { key: "R", color: "var(--accent-green)", label: "Ressources", text: "Appuie-toi sur ces éléments : travaux financés à 40% par l'État et 30% par la Région, création d'un espace numérique pour les jeunes, bibliothèque nommée 'Espace George Sand'." },
                    { key: "E", color: "var(--accent-gold)", label: "Exigence", text: "Rédige un discours de 400 mots. Structure avec : salutations officielles, remerciements aux partenaires financiers, focus sur George Sand et conclusion républicaine. Évite les phrases trop longues." }
                ]
            },
            {
                title: "Gabarit Prêt à Remplir (Copier-Coller)",
                type: "gabarit",
                desc: "Voici un modèle universel que vous pouvez copier et conserver. Remplissez simplement les crochets avant de soumettre votre demande à l'IA.",
                template: "[MOI] : Je suis [votre poste/rôle] au sein de la collectivité [nom/type de collectivité].\n\n[AGENT] : Agis en tant que [expert/rôle attribué à l'IA] spécialisé en [domaine précis].\n\n[INFORMATION] : Ta tâche consiste à [décrire précisément le travail, le document à rédiger ou le problème à analyser].\n\n[RESSOURCES] : Pour ce faire, base-toi uniquement sur les données suivantes : [coller vos textes, chiffres, extraits de règlements ou lois]. Ne fais pas de suppositions en dehors de ces informations.\n\n[EXIGENCE] : Le livrable doit être rédigé sous forme de [format attendu : mail, tableau, note de synthèse]. Le ton doit être [professionnel, technique, neutre] et la longueur maximale de [nombre de mots/paragraphes].",
                tips: "<strong>💡 Conseil de pro :</strong> Si vos ressources sont très longues (ex: un rapport PDF de 50 pages), n'hésitez pas à utiliser des outils dotés d'une grande fenêtre de contexte (comme Claude ou Gemini) pour y glisser le fichier entier."
            }
        ]
    },
    {
        id: "securite-reglementation",
        category: "reg",
        title: "5. Sécurité & Réglementation",
        icon: "🛡️",
        desc: "La protection des données dans le secteur public : concilier RGPD, souveraineté et conformité de l'AI Act.",
        slides: [
            {
                title: "Le Conflit Juridique : RGPD vs Cloud Act",
                type: "conflict-table",
                desc: "Les données de notre administration sont soumises à deux législations de souveraineté opposées. Comprendre ce conflit est essentiel avant d'utiliser une IA hébergée aux États-Unis.",
                headers: ["Critère", "🇪🇺 RGPD (Europe)", "🇺🇸 Cloud Act (États-Unis)"],
                rows: [
                    ["Philosophie", "Protéger la vie privée et la souveraineté des données des citoyens.", "Autoriser l'accès aux données pour la sécurité nationale américaine."],
                    ["Portée", "S'applique à toute entité traitant les données de résidents européens.", "S'applique à toutes les données stockées par des entreprises US, même à l'étranger."],
                    ["Données Sensibles", "Interdiction stricte de traitement sans accord de l'usager ou anonymisation préalable.", "Les agences de renseignement US peuvent réclamer l'accès aux serveurs de secours (ex: OpenAI/Azure)."],
                    ["Solution", "Privilégier des modèles hébergés sur le sol européen ou en local.", "Limiter drastiquement la saisie d'informations internes ou confidentielles."]
                ]
            },
            {
                title: "L'AI Act : La Pyramide des Risques",
                type: "risk-pyramid",
                desc: "Adopté en 2024, le règlement européen sur l'IA (AI Act) classe les applications selon leur niveau de danger pour les citoyens. Voici la pyramide appliquée aux collectivités :",
                tiers: [
                    { level: "Inacceptable (Interdit)", color: "var(--accent-red)", example: "Notation sociale à la chinoise, vidéosurveillance biométrique en temps réel dans l'espace public (hors dérogations graves)." },
                    { level: "Haut Risque (Très Régulé)", color: "var(--accent-gold)", example: "Algorithmes de tri des CV pour le recrutement des agents, systèmes de décision d'attribution d'aides sociales ou de places en crèche." },
                    { level: "Risque Limité (Transparence)", color: "var(--accent-sky)", example: "Chatbots d'accueil des usagers sur le site internet de la mairie (obligation de mentionner clairement 'Contenu généré par IA')." },
                    { level: "Risque Minimal (Libre)", color: "var(--accent-green)", example: "Filtres anti-spam de la messagerie des agents municipaux, outils de correction d'orthographe." }
                ]
            },
            {
                title: "Charte Municipale & Outil d'Anonymisation Libre",
                type: "anonymizer-tool",
                desc: "<strong>Charte Municipale d'usage de l'IA (Art. 4) :</strong> Les agents publics sont autorisés à utiliser des LLM externes soumis au Cloud Act uniquement si les données d'usagers ont été préalablement anonymisées. <br>Utilisez un outil libre d'anonymisation ou de pseudonymisation s'exécutant en local (comme le module ci-dessous) pour nettoyer vos textes avant de les envoyer.",
                explanation: "<strong>🔒 Garantie de confidentialité locale :</strong> Aucune donnée collée ci-dessus ne quitte votre ordinateur. L'anonymiseur s'exécute entièrement en JavaScript local dans votre navigateur. Les noms, courriels et téléphones y sont remplacés par des balises anonymes."
            },
            {
                title: "Charte d'Utilisation de l'IA (Prête à l'emploi)",
                type: "charte-text",
                preamble: "La transition numérique de notre collectivité territoriale intègre désormais l'usage d'outils d'Intelligence Artificielle Générative (comme les Large Language Models - LLM). Si ces technologies représentent des opportunités d'efficacité et d'aide à la décision, elles posent des défis juridiques et éthiques majeurs concernant la protection des données des citoyens et la souveraineté nationale.<br><br>La présente charte fixe les règles d'utilisation obligatoires pour l'ensemble des agents administratifs et des stagiaires au sein de la collectivité.",
                articles: [
                    {
                        num: "1",
                        title: "Usages Autorisés et Règle d'Or du \"Contrôle Humain\"",
                        points: [
                            "<strong>Aide à la productivité</strong> : Les agents sont autorisés à utiliser l'IA pour la rédaction de brouillons, la correction orthographique, la structuration de comptes-rendus non confidentiels, la synthèse de longs articles publics ou l'aide au remue-méninges (brainstorming).",
                            "<strong>Décision Administrative</strong> : L'IA ne doit en aucun cas prendre de décision unilatérale ou automatique concernant un usager (permis de construire, octroi d'aide sociale, etc.). <strong>La validation humaine (Dernier Mot)</strong> reste le principe fondamental de responsabilité publique. L'agent est l'unique auteur légal et responsable des écrits qu'il signe."
                        ]
                    },
                    {
                        num: "2",
                        title: "Interdictions de Saisie et Protection des Données (RGPD)",
                        intro: "Il est strictement interdit de copier-coller dans une invite de saisie (prompt) d'une IA publique :",
                        points: [
                            "Toute information permettant d'identifier directement ou indirectement un citoyen ou un agent (noms, prénoms, courriels, numéros de téléphone, numéros de sécurité sociale).",
                            "Toute information sensible protégée par le secret professionnel ou médical.",
                            "Des données budgétaires ou des délibérations confidentielles non encore publiées de la commune."
                        ]
                    },
                    {
                        num: "3",
                        title: "Souveraineté Juridique face au Cloud Act",
                        points: [
                            "<strong>Rappel Juridique</strong> : Les entreprises américaines éditrices d'IA (OpenAI, Microsoft, Anthropic, Amazon, etc.) sont soumises au <strong>Cloud Act</strong>. Cette loi autorise les autorités judiciaires et de renseignement américaines à réclamer l'accès aux données stockées sur leurs serveurs, y compris ceux situés physiquement en Europe.",
                            "<strong>Obligation d'Hébergement</strong> : Pour le stockage de bases de données internes ou la création d'applications municipales, la collectivité impose l'utilisation de serveurs localisés en Europe (choix impératif de la région <strong>Europe/Francfort</strong> sur des bases comme Supabase) pour garantir le respect du RGPD."
                        ]
                    },
                    {
                        num: "4",
                        title: "Recours Obligatoire à un Module Libre d'Anonymisation ou de Pseudonymisation",
                        intro: "Pour toutes les situations de travail où l'utilisation d'un LLM soumis au Cloud Act est indispensable pour analyser un dossier :",
                        points: [
                            "<strong>Filtrage Préalable</strong> : L'agent public a l'obligation légale de passer son texte dans un <strong>module libre d'anonymisation ou de pseudonymisation</strong> s'exécutant localement avant toute soumission à l'IA.",
                            "<strong>Fonctionnement Local</strong> : Cet outil s'exécute entièrement dans le navigateur de l'agent. Les données ne sont transmises à aucun serveur distant lors du nettoyage. Les données privées (noms, emails, téléphones) y sont remplacées par des balises génériques (ex: <code>[NOM_1]</code>).",
                            "<strong>Copie Sécurisée</strong> : Seul le texte ainsi anonymisé et expurgé de toute donnée personnelle peut être envoyé au modèle d'IA externe."
                        ]
                    },
                    {
                        num: "5",
                        title: "Lutte contre les Hallucinations et Vigilance Factuelle",
                        points: [
                            "Les grands modèles de langage sont des calculateurs probabilistes et non des encyclopédies de vérité. L'agent doit effectuer une vérification systématique de toutes les sources citées par l'IA (textes de loi du CGCT, décrets, jurisprudence).",
                            "Privilégier la technique d'<strong>Ancrage</strong> en insérant lui-même la documentation officielle de travail comme ressource dans le prompt pour empêcher l'IA d'inventer des faits."
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "hallucinations-ia",
        category: "reg",
        title: "6. Les Hallucinations",
        icon: "🌀",
        desc: "Analyser scientifiquement pourquoi l'IA invente des faits et apprendre les techniques d'ancrage.",
        slides: [
            {
                title: "Pourquoi l'IA ment-elle avec aplomb ?",
                type: "comparison-cards",
                intro: "Une hallucination n'est pas un bug technique temporaire. C'est une conséquence directe de la nature mathématique des LLMs, conçus pour générer du texte fluide, pas pour vérifier la réalité historique.",
                cardLeft: {
                    title: "🔍 Comment travaille un Moteur de Recherche",
                    subtitle: "Indexation de Base de Données",
                    desc: "Il parcourt internet pour trouver des pages réelles correspondant à vos mots clés. Il renvoie vers des liens existants.",
                    formula: "Requête ➔ Recherche dans l'index ➔ Liens véridiques",
                    advantage: "Pas d'invention. Les sources sont réelles et vérifiables directement.",
                    drawback: "Incapable de rédiger une synthèse sur-mesure ou d'adapter le ton."
                },
                cardRight: {
                    title: "🔮 Comment travaille un LLM (ChatGPT/Claude)",
                    subtitle: "Réseau Génératif Probabiliste",
                    desc: "Il n'interroge pas de base de données. Il écrit mot après mot en évaluant ce qui paraît statistiquement correct et fluide selon ses milliards de paramètres.",
                    formula: "Prompt ➔ Calcul de probabilités ➔ Texte généré",
                    advantage: "Capacité d'analyse, de synthèse et d'adaptation du ton infinie.",
                    drawback: "Si l'information est rare ou absente de sa mémoire de calcul, il comblera le vide en inventant des détails plausibles."
                }
            },
            {
                title: "Le Curseur de Température",
                type: "hallucination",
                desc: "La température est le paramètre qui contrôle l'audace statistique du modèle. Plus elle est élevée, plus l'IA prend des risques d'association de mots originaux, augmentant le risque d'hallucinations.",
                temperature: 20,
                tips: [
                    "<strong>Température 0.1 à 0.3 (Factuel) :</strong> Recommandé pour l'administration. L'IA reste ultra-prudente et choisit toujours les termes les plus standardisés. Idéal pour résumer un décret ou analyser des chiffres.",
                    "<strong>Température 0.7 à 1.0 (Créatif) :</strong> Recommandé pour le brainstorming ou la rédaction de slogans de communication touristique. Le modèle s'autorise des détours sémantiques poétiques mais peut inventer des faits."
                ]
            },
            {
                title: "L'Arme Absolue : L'Ancrage (R.A.G.)",
                type: "bridge-schema",
                desc: "Pour éradiquer les hallucinations dans votre travail administratif, utilisez la technique de l'**Ancrage** (RAG - Retrieval Augmented Generation). Cela consiste à interdire à l'IA d'utiliser sa mémoire générale.",
                elements: [
                    { title: "📥 1. L'Entrée brute", desc: "Vous posez votre question juridique ou technique (ex. 'Puis-je accorder un congé spécial à cet agent ?')." },
                    { title: "🔒 2. L'Ancrage (Ressource)", desc: "Vous copiez-collez l'intégralité du règlement intérieur de votre mairie ou le texte de loi du CGCT." },
                    { title: "🛡️ 3. La Consigne de Verrouillage", desc: "Vous terminez le prompt par : 'Réponds exclusivement en t'appuyant sur le règlement ci-dessus. Si la réponse n'y figure pas, réponds : Je ne sais pas'." }
                ]
            }
        ]
    },
    {
        id: "guerre-ia",
        category: "tech",
        title: "7. La Guerre des IA & Matériel",
        icon: "⚔️",
        desc: "Les coulisses géopolitiques : la cartographie des acteurs, la physique des puces et les datacenters de demain.",
        slides: [
            {
                title: "La Carte des Alliances Mondiales",
                type: "alliance-map",
                desc: "Le marché de l'IA est une guerre de capitaux et d'infrastructures contrôlée par quelques géants de la technologie :",
                alliances: [
                    { leader: "OpenAI + Microsoft", models: "GPT", target: "Domination du marché bureautique et intégration dans Windows / Office." },
                    { leader: "Google (Gemini)", models: "Gemini", target: "Écosystème natif Android, Workspace et recherche en ligne." },
                    { leader: "Anthropic + Amazon", models: "Claude", target: "Modèles sécurisés et hautement qualitatifs pour les entreprises via AWS." },
                    { leader: "Mistral AI (France)", models: "Mistral / Codestral", target: "Alternative de souveraineté européenne avec des modèles efficaces et hébergeables localement." }
                ]
            },
            {
                title: "La Physique de l'IA (Puces & Électricité)",
                type: "hardware-comparison",
                desc: "L'IA n'est pas immatérielle. Elle repose sur des fonderies de puces silicium ultra-précises (TSMC à Taïwan produit 90% des puces avancées) et des parcs de calcul surchargés.",
                chips: [
                    { type: "GPU (Nvidia)", role: "Processeur graphique de forte consommation pour l'entraînement intensif.", power: "Très énergivore (~700W par carte)" },
                    { type: "TPU (Google)", role: "Puces tenso-vectorielles optimisées pour exécuter les calculs de Gemini.", power: "Consommation modérée" },
                    { type: "LPU (Groq)", role: "Puces ultra-rapides spécialisées dans l'inférence textuelle en temps réel.", power: "Très économe en énergie" }
                ],
                fact: "<strong>Le saviez-vous ?</strong> Une seule requête complexe sur un modèle d'IA générative consomme environ 10 fois plus d'électricité qu'une simple recherche sur Google. C'est un défi écologique majeur pour la neutralité carbone des territoires."
            },
            {
                title: "Datacenters Spatiaux (L'IA en Orbite)",
                type: "satellite-datacenter",
                desc: "Face à la saturation énergétique et aux restrictions foncières terrestres, des consortiums spatiaux développent des serveurs d'IA en orbite terrestre basse (LEO).",
                pros: [
                    "<strong>Refroidissement naturel :</strong> Le vide de l'espace profond évite l'utilisation de millions de litres d'eau potable terrestres.",
                    "<strong>Énergie gratuite :</strong> Les panneaux solaires des satellites captent une énergie solaire constante sans atmosphère pour la filtrer.",
                    "<strong>Souveraineté juridique :</strong> Situés dans l'espace international, ils échappent aux réglementations nationales terrestres (comme l'AI Act)."
                ],
                cons: [
                    "<strong>Maintenance impossible :</strong> Si un disque dur grille à 500 km d'altitude, on ne peut pas le remplacer manuellement.",
                    "<strong>Tempêtes solaires :</strong> Les radiations cosmiques peuvent corrompre les données ou griller les circuits des puces sensibles.",
                    "<strong>Temps de latence :</strong> Les données doivent monter et descendre par ondes radio ou liaisons laser, ralentissant les réponses immédiates."
                ]
            }
        ]
    },
    {
        id: "exercices-metiers",
        category: "prompt",
        title: "8. Exercices Métiers",
        icon: "🛠️",
        desc: "Entraînements concrets avec corrections pour les différents services d'une commune.",
        slides: [
            {
                title: "Exercices : Services Techniques & Espaces Verts",
                type: "exercise-list",
                categoryFilter: "ST_EV",
                exercises: [
                    {
                        department: "Services Techniques",
                        level: "débutant",
                        description: "Vous recevez un mail d'un habitant en colère : <em>'Il y a un énorme trou au milieu de la chaussée devant le 14 avenue Pasteur, ma voiture a failli y laisser un pneu ! Et les branches du saule du voisin dépassent sur le trottoir et obligent les enfants à marcher sur la route. Bougez-vous !'</em>. Créez un prompt pour extraire et catégoriser les incidents.",
                        solution: "[M] Je suis agent technique municipal.\n[A] Agis en tant qu'assistant de gestion des signalements urbains.\n[I] Analyse le courriel reçu et extrais les incidents.\n[R] Catégorise selon : Adresse de l'incident, Type de problème (Chaussée / Végétation), Niveau d'urgence (Urgent / Normal).\n[E] Fournis un tableau structuré avec ces données, sans commentaires."
                    },
                    {
                        department: "Espaces Verts",
                        level: "intermédiaire",
                        description: "Vous devez proposer un plan de végétalisation à faible consommation d'eau pour réaménager le parvis bétonné de la mairie.",
                        solution: "[M] Je suis responsable des espaces verts d'une mairie du Sud de la France.\n[A] Tu es un paysagiste éco-responsable expert en biodiversité locale et sécheresse.\n[I] Conçois une palette végétale de 5 plantes adaptées.\n[R] Critères requis : besoin d'eau minimal, mellifère, résistant au gel hivernal et à la chaleur estivale.\n[E] Présente les plantes sous forme de fiche avec : nom commun, nom latin, période de floraison et hauteur maximale."
                    }
                ]
            },
            {
                title: "Exercices : Secrétariat & Comptabilité",
                type: "exercise-list",
                categoryFilter: "SEC_COMPTA",
                exercises: [
                    {
                        department: "Secrétariat / DGA",
                        level: "débutant",
                        description: "Vous devez synthétiser ces notes rapides prises en réunion de projet : <em>'Début réunion 14h. Présent : Maire, Adjoint Travaux, DGS. Sujet : Rénovation toiture école. Budget estimé : 80 000€. Subvention État espérée : 30%. Travaux prévus en octobre pendant les vacances. Vote prévu prochain conseil municipal.'</em>",
                        solution: "[M] Je suis collaborateur de cabinet municipal.\n[A] Agis comme un secrétaire de séance professionnel.\n[I] Rédige une note de synthèse claire à partir de mes notes brutes.\n[R] S'appuyer uniquement sur le texte fourni.\n[E] Structure la note en 4 sections : Objet de la réunion, Participants, Aspect Financier, Calendrier des opérations. Rédige de manière formelle."
                    },
                    {
                        department: "Comptabilité",
                        level: "intermédiaire",
                        description: "Comparez ces deux devis pour l'achat de matériel informatique de mairie : Offre 1 (10 ordinateurs fixes à 600€ HT l'unité, garantie 1 an, installation offerte). Offre 2 (10 ordinateurs fixes à 550€ HT l'unité, garantie 3 ans, frais d'installation de 800€ HT).",
                        solution: "[M] Je suis comptable public au sein d'une collectivité.\n[A] Agis en tant qu'analyste de gestion financière.\n[I] Calcule le coût global TTC (TVA 20%) de chaque offre et compare la valeur de la garantie.\n[R] Applique la TVA de 20% sur l'ensemble des montants HT.\n[E] Rédige une conclusion de 100 mots indiquant quelle offre est la plus avantageuse financièrement à court terme et à long terme."
                    }
                ]
            },
            {
                title: "Exercice Expert : Finance & Budget",
                type: "exercise-list",
                categoryFilter: "FINANCE",
                exercises: [
                    {
                        department: "Finance / Budget",
                        level: "expert",
                        description: "Analysez l'impact d'une hausse prévisionnelle de 5% du coût des fluides (électricité/gaz) sur le budget d'une commune de 5000 habitants sachant que la facture actuelle est de 250 000€ et que le budget total de fonctionnement de la commune est de 3 500 000€.",
                        solution: "[M] Je suis directeur des services financiers de la commune.\n[A] Agis en tant qu'auditeur budgétaire spécialisé en finances publiques.\n[I] Calcule l'impact de la hausse et propose des mesures.\n[R] Facture fluides = 250k€. Hausse = 5%. Budget global = 3.5M€.\n[E] Calcule : 1) Le surcoût annuel en euros, 2) Le nouveau montant de la facture, 3) Le pourcentage que représente ce surcoût dans le budget global de fonctionnement. Termine en listant 3 mesures réalistes de sobriété énergétique applicables immédiatement en mairie pour compenser cette somme."
                    }
                ]
            }
        ]
    },
    {
        id: "agentique-territorial",
        category: "agent",
        title: "9. L'Agentique",
        icon: "🤖",
        desc: "Comprendre pourquoi la boucle agentique dépasse largement l'utilisation passive d'un chat d'intelligence artificielle.",
        slides: [
            {
                title: "La Révolution des Rôles (Chat vs Agent)",
                type: "agentic-comparison",
                desc: "Le Chat classique est une interaction linéaire. L'Agentique est une boucle d'autonomie où la machine planifie, agit et évalue son propre travail.",
                chatWorkflow: {
                    title: "Interaction Classique (Chat)",
                    steps: [
                        { role: "Humain", text: "Tape un prompt vague." },
                        { role: "LLM", text: "Calcule et répond d'une seule traite sans tester." },
                        { role: "Humain", text: "Détecte les erreurs et doit ré-expliquer manuellement pour corriger." }
                    ]
                },
                agenticWorkflow: {
                    title: "Workflow Agentique",
                    steps: [
                        { role: "Humain", text: "Définit l'objectif global ('Créer un site de signalement public')." },
                        { role: "Agent", text: "Planifie la liste des tâches nécessaires de manière logique." },
                        { role: "Agent", text: "Exécute des outils (lit des fichiers, écrit du code)." },
                        { role: "Agent", text: "Teste le code, observe les bugs et réécrit pour corriger." },
                        { role: "Agent", text: "Livre le résultat final 100% testé et fonctionnel." }
                    ]
                }
            },
            {
                title: "Le Cerveau d'un Agent (Plan - Outils - Action)",
                type: "agentic-loop",
                desc: "Un agent d'IA s'appuie sur une boucle de raisonnement appelée **ReAct** (Reasoning + Acting). Il n'invente pas au hasard : il analyse son action avant de la lancer.",
                phases: [
                    { step: "1. Pensée (Thought)", desc: "L'IA analyse son objectif. 'Je dois écrire une fonction Javascript pour envoyer un mail. Pour cela, j'ai besoin d'un outil de communication.'" },
                    { step: "2. Action (Action)", desc: "L'IA utilise un outil externe. Elle écrit le code dans un fichier ou effectue une recherche sur internet." },
                    { step: "3. Observation (Observation)", desc: "L'IA analyse le retour de l'outil. 'La console renvoie une erreur de syntaxe à la ligne 12 : point-virgule manquant.'" },
                    { step: "4. Correction (Feedback)", desc: "L'IA ajuste son plan de pensée. 'Je vais corriger la ligne 12 en rajoutant le point-virgule et relancer le test.'" }
                ]
            },
            {
                title: "Antigravity au Service de la Fonction Publique",
                type: "antigravity-details",
                desc: "Antigravity est un agent d'ingénierie logicielle autonome conçu par Google DeepMind. Pour les fonctionnaires territoriaux, il résout une barrière majeure : **la compétence technique**.",
                benefits: [
                    "<strong>Autonomie complète :</strong> Vous ne lui demandez pas de vous expliquer comment faire ; vous lui demandez de le faire pour vous dans votre dossier de travail.",
                    "<strong>Sécurisation du code :</strong> Antigravity teste le code qu'il produit en boucle sur des consoles locales. Il s'assure que l'application ne contient aucune faille de sécurité.",
                    "<strong>Outil d'inclusion :</strong> Il permet à un agent administratif sans aucune notion de programmation de concevoir des petits logiciels fonctionnels sur-mesure pour son service."
                ]
            }
        ]
    },
    {
        id: "tuto-technique",
        category: "agent",
        title: "10. Tuto : Créer une Application",
        icon: "💻",
        desc: "Créer et héberger un site de manière gratuite et sécurisée en conformité avec le RGPD.",
        slides: [
            {
                title: "L'Architecture Client-Serveur Souveraine",
                type: "architecture-diagram",
                desc: "Pour créer un logiciel fonctionnel et sécurisé sans budget, nous allons associer deux outils complémentaires. Le code de l'interface est public et gratuit, tandis que les données des usagers sont cryptées et confinées en Europe.",
                frontend: {
                    title: "🖥️ Front-end (GitHub Pages)",
                    desc: "Héberge les fichiers HTML, CSS et JavaScript. C'est l'interface visuelle sur laquelle l'usager clique. L'hébergement est statique et entièrement gratuit."
                },
                backend: {
                    title: "🗄️ Back-end (Supabase)",
                    desc: "Héberge la base de données relationnelle SQL. Elle stocke les signalements, les comptes usagers et applique les règles de sécurité. Les serveurs sont localisés à Francfort (Europe) pour le RGPD."
                },
                security: "<strong>Le Cadenas RLS (Row Level Security) :</strong> La connexion se fait par des appels d'API directs depuis le navigateur du citoyen vers Supabase, sécurisés par des politiques d'accès strictes."
            },
            {
                title: "Tuto 1 : Interface Web sur GitHub Pages",
                type: "tuto-step",
                stepNum: "1",
                goal: "Mettre son premier site en ligne gratuitement",
                steps: [
                    "Créez un compte gratuit sur <strong>GitHub.com</strong>.",
                    "Créez un nouveau dépôt public (Repository) nommé <code>signalement-mairie</code>.",
                    "Créez un fichier nommé obligatoirement <code>index.html</code> et collez-y le code HTML minimal fourni ci-dessous.",
                    "Allez dans l'onglet <strong>Settings</strong> (Paramètres) de votre dépôt ➔ menu <strong>Pages</strong> à gauche.",
                    "Sous 'Build and deployment', sélectionnez la branche <code>main</code> (ou <code>master</code>) et le dossier <code>/root</code>, puis cliquez sur <strong>Save</strong>.",
                    "Attendez 1 minute : votre site est accessible en HTTPS à l'adresse <code>https://votre-pseudo.github.io/signalement-mairie/</code> !"
                ],
                code: "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Signalement Mairie</title>\n    <style>\n        body { font-family: sans-serif; padding: 2rem; background: #f3f6fc; }\n        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }\n    </style>\n</head>\n<body>\n    <div class=\"card\">\n        <h1>Signaler une anomalie dans la commune</h1>\n        <p>Ce portail permet de remonter des dysfonctionnements techniques aux agents municipaux.</p>\n    </div>\n</body>\n</html>"
            },
            {
                title: "Tuto 2 : Base Supabase en Europe (RGPD)",
                type: "tuto-step",
                stepNum: "2",
                goal: "Créer une base de données SQL hébergée en Europe",
                steps: [
                    "Créez un compte gratuit sur <strong>Supabase.com</strong>.",
                    "Cliquez sur <strong>New Project</strong>. Choisissez un nom (ex: <code>BDD Mairie</code>) et définissez un mot de passe sécurisé pour la base de données.",
                    "IMPORTANT : Dans le champ <strong>Region</strong>, sélectionnez impérativement <strong>Europe (Frankfurt)</strong>. Cela garantit que les données des usagers restent protégées par le RGPD et ne traversent pas l'Atlantique.",
                    "Allez dans l'onglet <strong>Table Editor</strong> (icône de tableau) ➔ cliquez sur <strong>Create a new table</strong>.",
                    "Nommez la table <code>incidents</code>. Ajoutez les colonnes : <code>adresse</code> (type text), <code>nature</code> (type text), et <code>urgence</code> (type text). Décochez 'Is Nullable' si la colonne est obligatoire.",
                    "Cliquez sur <strong>Save</strong> pour générer votre base de données SQL en ligne."
                ],
                code: "// Exemple de connexion JS à intégrer dans votre index.html\nimport { createClient } from 'https://esm.sh/@supabase/supabase-js@2'\n\nconst supabaseUrl = 'https://votre-id-projet.supabase.co'\nconst supabaseKey = 'votre-cle-publique-api-anon'\nconst supabase = createClient(supabaseUrl, supabaseKey)\n\n// Envoyer un signalement depuis l'interface vers la BDD\nconst { data, error } = await supabase\n  .from('incidents')\n  .insert([\n    { adresse: '12 rue des Fleurs', nature: 'Nid-de-poule', urgence: 'Urgent' }\n  ])"
            },
            {
                title: "Tuto 3 : Sécurisation Absolue par RLS",
                type: "tuto-step",
                stepNum: "3",
                goal: "Verrouiller les accès en écriture et en lecture",
                steps: [
                    "Par défaut, n'importe qui accédant à votre site peut lire ou altérer toute votre base de données Supabase car les clés sont stockées dans le code JavaScript du navigateur.",
                    "Pour éviter cela, activez le **Row Level Security (RLS)** : allez dans l'onglet <strong>Authentication</strong> ou <strong>Database</strong> ➔ menu <strong>Policies</strong>.",
                    "Cliquez sur **Enable RLS** à côté de votre table <code>incidents</code>.",
                    "Créez une nouvelle politique (Policy) d'autorisation d'écriture : autorisez l'action <code>INSERT</code> de manière publique pour que tous les citoyens puissent envoyer un signalement.",
                    "Créez une seconde politique pour l'action <code>SELECT</code> (lecture) : restreignez-la uniquement aux utilisateurs authentifiés (les agents de la mairie ayant un compte agent)."
                ],
                code: "-- Requête SQL de sécurité RLS exécutée par Supabase\n-- 1. Autoriser le dépôt de signalements par tout le monde\nCREATE POLICY \"Dépôt public\" \nON public.incidents \nFOR INSERT \nTO public \nWITH CHECK (true);\n\n-- 2. Restreindre la consultation uniquement aux agents connectés\nCREATE POLICY \"Lecture réservée aux agents\" \nON public.incidents \nFOR SELECT \nTO authenticated \nUSING (true);"
            }
        ]
    },
    {
        id: "eval-stage-bilan",
        category: "prompt",
        title: "11. Évaluation Stage",
        icon: "📝",
        desc: "Mise en situation d'évaluation initiale (début de stage) et finale (fin de stage) à faire sur papier.",
        slides: [
            {
                title: "Évaluation Individuelle : Début & Fin de Stage",
                type: "eval-stage",
                desc: "Ce test individuel permet de mesurer et comparer l'évolution des compétences de rédaction de prompts et de conformité aux règles de sécurité chez le stagiaire.",
                scenario: "Vous êtes agent administratif au service de l'état civil. Un citoyen vous envoie un mail confus (nom de famille : M. Charles Dufour, mail: charles.dufour@example.com, tél: 06 99 88 77 66) demandant comment obtenir un extrait d'acte de naissance pour son fils né à l'étranger. Rédigez un prompt papier pour demander à un LLM de concevoir un brouillon de réponse officiel basé sur les lois consulaires françaises.",
                dos: [
                    "Définir clairement son rôle d'agent [M] (ex: 'Je suis secrétaire de mairie en charge de l'état civil')",
                    "Attribuer un rôle expert à l'IA [A] (ex: 'Tu es un juriste spécialisé en droit civil français')",
                    "Décrire explicitement la tâche [I] (ex: 'Rédige une note d'information par courriel')",
                    "Préciser les ressources de loi à utiliser [R] (ex: 'Appuie-toi sur le Code Civil')",
                    "Exiger un format court, poli et neutre [E] (ex: '3 paragraphes maximum, ton formel')",
                    "Anonymiser impérativement les données nominatives avant toute saisie : remplacer 'Charles Dufour' par <code>[NOM_1]</code>, le mail par <code>[EMAIL_1]</code>, le numéro par <code>[TELEPHONE_1]</code>"
                ],
                donts: [
                    "Saisir le nom de famille 'Charles Dufour' ou le mail de l'usager brut dans le prompt (Violation majeure du RGPD / Cloud Act !)",
                    "Donner des instructions floues sans contrainte de format (ex: 'réponds à ce mail')",
                    "Laisser l'IA agir en autonomie sans validation humaine (l'IA ne doit proposer qu'un brouillon)"
                ],
                modelAnswer: "[MOI] : Je suis agent administratif en charge du service de l'état civil municipal.\n\n[AGENT] : Agis en tant qu'expert juridique de l'état civil des Français à l'étranger.\n\n[INFORMATION] : Conçois un brouillon de réponse par mail destiné à l'administré [NOM_1] (contact: [EMAIL_1]) qui souhaite obtenir l'acte de naissance de son fils né hors de France.\n\n[RESSOURCES] : Base-toi uniquement sur les articles 47 et 48 du Code Civil français.\n\n[EXIGENCE] : Rédige une réponse claire de 3 paragraphes maximum. Explique de manière neutre et polie la procédure et les pièces justificatives à fournir. Précise que la demande doit être adressée directement au Service central d'état civil de Nantes (ministère des Affaires étrangères)."
            }
        ]
    }
];
