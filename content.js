// ==========================================
// CORPUS DE FORMATION IA TERRITORIALE (CONTENT.JS)
// ==========================================

const THEMES = [
    {
        id: "histoire-ia",
        category: "histoire",
        title: "1. L'Histoire de l'IA",
        icon: "📜",
        desc: "Comprendre les origines de l'IA, de la théorie d'Alan Turing aux réseaux de neurones modernes.",
        slides: [
            {
                title: "L'Arbre de l'IA (Symbolique vs Numérique)",
                type: "comparison-cards",
                intro: "L'histoire de l'intelligence artificielle est séparée en deux grandes écoles de pensée qui se sont affrontées pendant 50 ans avant de fusionner aujourd'hui.",
                cardLeft: {
                    title: "🧠 IA Symbolique (1950 - 1990)",
                    subtitle: "L'approche par la Logique et les Règles",
                    desc: "On programmait à la main toutes les règles logiques (ex: 'SI le feu est rouge ET que la voiture avance ALORS c'est une infraction'). Les ingénieurs écrivaient des milliers de lignes de conditions 'SI / ALORS'.",
                    formula: "Règles Humaines + Données ➔ Réponses",
                    advantage: "100% explicable et prévisible. Pas de risque d'erreur au hasard.",
                    drawback: "Incapable de gérer la complexité du monde réel, les exceptions, le langage naturel ou la vision."
                },
                cardRight: {
                    title: "⚡ IA Numérique / Connexionniste (2010 - Présent)",
                    subtitle: "L'apprentissage par l'Exemple (Machine Learning)",
                    desc: "On ne donne plus de règles à la machine. On lui injecte des milliards d'exemples (textes, photos) et le réseau de neurones ajuste lui-même ses poids mathématiques pour apprendre seul.",
                    formula: "Données + Réponses Attendues ➔ Détection des Règles",
                    advantage: "Compréhension du langage humain, reconnaissance d'images et créativité inédite.",
                    drawback: "Effet 'Boîte Noire'. Difficile de savoir exactement pourquoi le réseau a pris telle décision."
                }
            },
            {
                title: "Frise Chronologique (1950 - 2022)",
                type: "timeline",
                desc: "Découvrez les 5 grandes étapes de la révolution de l'intelligence artificielle.",
                events: [
                    { year: "1950", title: "Test d'Imitation de Turing", desc: "Alan Turing pose la question fondamentale : 'Les machines peuvent-elles penser ?' et invente son test d'imitation." },
                    { year: "1956", title: "Séminaire de Dartmouth", desc: "Naissance officielle de l'expression 'Intelligence Artificielle' lors de la conférence réunissant McCarthy, Minsky et Shannon." },
                    { year: "1974 - 1990", title: "Les Hivers de l'IA", desc: "Coupure des budgets de recherche suite à l'incapacité des machines à comprendre le sens commun." },
                    { year: "1997", title: "Deep Blue bat Kasparov", desc: "Le supercalculateur d'IBM bat le champion du monde d'échecs grâce à la puissance de calcul." },
                    { year: "2017", title: "L'Architecture Transformer", desc: "Google publie 'Attention Is All You Need', posant les fondations des LLM modernes comme ChatGPT." },
                    { year: "2022", title: "Révolution ChatGPT", desc: "L'IA générative devient un outil grand public accessible à tous en quelques clics." }
                ]
            },
            {
                title: "La Vitesse d'Adoption Mondiale",
                type: "bar-chart",
                desc: "Comparaison du temps nécessaire pour atteindre 100 millions d'utilisateurs actifs à travers le monde :",
                data: [
                    { label: "Téléphone Fixe", time: "75 Ans", percent: 100, color: "var(--accent-blue)" },
                    { label: "Internet", time: "7 Ans", percent: 60, color: "var(--accent-purple)" },
                    { label: "Facebook", time: "4.5 Ans", percent: 45, color: "var(--accent-sky)" },
                    { label: "Instagram", time: "2.5 Ans", percent: 30, color: "var(--accent-gold)" },
                    { label: "ChatGPT (IA)", time: "2 Mois", percent: 10, color: "var(--accent-green)" }
                ],
                conclusion: "ChatGPT est la technologie ayant connu la croissance la plus rapide de l'histoire de l'humanité. Cette vitesse impose une acculturation urgente pour tous les agents publics."
            },
            {
                title: "Le Paradoxe de Moravec",
                type: "moravec-paradox",
                desc: "Formulé par Hans Moravec dans les années 1980, ce paradoxe scientifique explique pourquoi l'IA nous surprend là où on ne l'attendait pas :",
                hardForHuman: {
                    title: "Difficile pour l'Homme",
                    desc: "Calculer la racine carrée de 849 302, mémoriser le Code Général des Collectivités Territoriales par cœur, analyser 10 000 lignes de comptabilité en 1 seconde.",
                    result: "⚡ Très Facile pour l'IA"
                },
                easyForHuman: {
                    title: "Facile pour l'Homme",
                    desc: "Reconnaître un visage dans une foule, faire preuve d'empathie face à un administré en détresse, lacer ses chaussures, sentir une ambiance dans une salle de réunion.",
                    result: "🤖 Ultra-Difficile pour l'IA"
                },
                conclusion: "L'IA ne remplace pas l'humain : elle excelle là où nous sommes lents (calcul, mémoire), et échoue là où nous sommes naturellement doués (empathie, bon sens, présence physique)."
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
            },
            {
                title: "Le Verrou Technique : VRAM, Coûts & Singularité",
                type: "vram-hardware-singularity",
                intro: "Pourquoi l'IA générative n'a-t-elle pas émergé il y a 10 ans ? La réponse réside dans la <strong>physique du matériel</strong> : la quantité de mémoire VRAM, la taille des paramètres et le coût des infrastructures.",
                basics: {
                    title: "📐 Les Mathématiques de la Mémoire",
                    items: [
                        { label: "1 Go de VRAM", val: "1 000 000 000 d'octets (8 bits par octet)" },
                        { label: "Poids par Paramètre", val: "2 octets (Précision FP16 / BF16)" },
                        { label: "Mémoire du Contexte (KV Cache)", val: "~2 Mo par token (attention croisée)" }
                    ]
                },
                modelsComparison: [
                    {
                        title: "🌐 Modèle Open Source Géant (ex. Llama 3.1 405B)",
                        vramWeights: "800 Go VRAM",
                        vramContext: "+2 To VRAM (pour 1M tokens)",
                        totalVram: "2,8 Téraoctets",
                        cost: "280 000 € HT",
                        desc: "Modèle en accès libre nécessitant un cluster dédié de 35 cartes GPU d'entreprise."
                    },
                    {
                        title: "🔒 Modèle Propriétaire Ultra-Puissant (ex. GPT-4 / Gemini)",
                        vramWeights: "5 à 10 To VRAM (Architecture MoE)",
                        vramContext: "+2 To VRAM (pour 1M tokens)",
                        totalVram: "jusqu'à 12 Téraoctets",
                        cost: "1 200 000 € HT (1,2 M€)",
                        desc: "Cluster multi-serveurs interconnectés réservé aux géants de la Tech."
                    }
                ],
                whyNot10YearsAgo: {
                    title: "⏳ Pourquoi c'était IMPOSSIBLE il y a 10 ans (2014 vs 2024)",
                    bullets: [
                        "<strong>Capacité VRAM :</strong> En 2014, les puces graphiques phares (ex: NVIDIA K80) plafonnaient à 12 Go. Il aurait fallu relier des milliers de cartes physiques.",
                        "<strong>Vitesse de communication inter-processeurs :</strong> En 2014, le bus PCIe 3.0 (~16 Go/s) créait une saturation totale. L'émergence des bus ultra-rapides modernes (<strong>NVLink / TPU Interconnect</strong> à 900 Go/s - 1,8 To/s) permet désormais de fusionner des milliers de puces en un seul super-cerveau unifié.",
                        "<strong>Architecture Transformer (2017) :</strong> Invention algorithmique permettant de paralléliser simultanément les calculs sur des milliers de cœurs GPU."
                    ]
                },
                singularity: {
                    title: "🌌 Projection vers la Singularité (AGI / Superintelligence)",
                    bio: "<strong>🧠 Comparatif Biologique :</strong> Le cerveau humain compte environ <strong>86 milliards de neurones</strong> et <strong>100 000 milliards de connexions synaptiques</strong>.",
                    projection: "<strong>⚡ Puissance requise pour l'Omniscience :</strong> Pour égaler ou dépasser la connaissance et le raisonnement humain (AGI/ASI), les chercheurs estiment qu'il faudra une infrastructure réunissant entre <strong>100 et 500 Téraoctets de VRAM ultra-rapide</strong>, exécutant <strong>10¹⁸ à 10²⁰ opérations par seconde (Exaflops)</strong>. Une telle puissance nécessite des datacenters alimentés directement par des réacteurs nucléaires SMR."
                }
            }
        ]
    },
    {
        id: "hallucinations-ia",
        category: "reg",
        title: "3. Les Hallucinations & L'Ancrage",
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
                title: "Le Curseur de Température & Détecteur d'Hallucinations",
                type: "hallucination",
                desc: "La température contrôle l'audace statistique du modèle. Testez ci-dessous la détection d'hallucinations juridiques et de biais sur des exemples réels de l'administration.",
                temperature: 20,
                tips: [
                    "<strong>Température 0.1 à 0.3 (Factuel) :</strong> Recommandé pour l'administration. L'IA reste ultra-prudente et choisit toujours les termes les plus standardisés.",
                    "<strong>Température 0.7 à 1.0 (Créatif) :</strong> Recommandé pour le brainstorming ou les slogans de communication. Le modèle peut inventer des faits."
                ],
                scenarios: [
                    {
                        id: "sc-cgct",
                        title: "📜 Faux Décret & Date Fictive",
                        text: "Conformément au décret n°2025-9999 du 32 décembre 2024 modifiant l'article L.2121-888 du CGCT, le Maire d'une commune de moins de 500 habitants peut annuler sans délibération toutes les décisions d'urbanisme votées depuis 10 ans.",
                        highlights: [
                            { match: "décret n°2025-9999", type: "red", label: "Hallucination", desc: "Le numéro de décret 2025-9999 est fictif et n'existe dans aucun Journal Officiel." },
                            { match: "32 décembre 2024", type: "red", label: "Date Impossible", desc: "Le 32 décembre n'existe pas dans le calendrier !" },
                            { match: "article L.2121-888", type: "red", label: "Fausse référence", desc: "L'article L.2121-888 du CGCT est une invention complète du LLM." },
                            { match: "annuler sans délibération toutes les décisions", type: "orange", label: "Incohérence Juridique", desc: "Un maire ne peut pas annuler rétroactivement 10 ans de décisions d'urbanisme sans délibération." }
                        ]
                    },
                    {
                        id: "sc-bias",
                        title: "👥 Biais de Genre & Recrutement",
                        text: "Pour le poste d'agent d'accueil du public, la candidate de 52 ans sera parfaite pour apporter de la douceur et du thé aux administrés. Pour le poste d'ingénieur DSI, il faut privilégier un jeune homme passionné d'informatique capable de faire des heures supplémentaires.",
                        highlights: [
                            { match: "douceur et du thé aux administrés", type: "orange", label: "Stéréotype de Genre", desc: "Réduire les compétences d'accueil d'une femme à 'apporter du thé' est un biais de genre discriminant." },
                            { match: "privilégier un jeune homme", type: "red", label: "Discrimination Illégale", desc: "Spécifier le genre et le jeune âge pour un poste technique viole le Code du Travail et l'AI Act." }
                        ]
                    },
                    {
                        id: "sc-vague",
                        title: "🔵 Affirmations Vagues sans Source",
                        text: "La plupart des collectivités territoriales ont réduit leur budget de 40% l'année dernière. Il est prouvé que l'IA résout 99% des litiges d'usagers instantanément.",
                        highlights: [
                            { match: "réduit leur budget de 40%", type: "blue", label: "Chiffre non étayé", desc: "Statistique spectaculaire inventée sans aucune citation d'étude ou de rapport de la Cour des Comptes." },
                            { match: "résout 99% des litiges", type: "blue", label: "Affirmation Vague", desc: "Affirmation fantaisiste sans preuve ni méthodologie de mesure." }
                        ]
                    }
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
        id: "prompt-homme",
        category: "prompt",
        title: "4. Prompt vs Homme",
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
        title: "5. La Méthode M.A.I.R.E.",
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
                template: `[MOI] : Je suis [votre poste/rôle] au sein de la collectivité [nom/type de collectivité].

[AGENT] : Agis en tant que [expert/rôle attribué à l'IA] spécialisé en [domaine précis].

[INFORMATION] : Ta tâche consiste à [décrire précisément le travail, le document à rédiger ou le problème à analyser].

[RESSOURCES] : Pour ce faire, base-toi uniquement sur les données suivantes : [coller vos textes, chiffres, extraits de règlements ou lois]. Ne fais pas de suppositions en dehors de ces informations.

[EXIGENCE] : Le livrable doit être rédigé sous forme de [format attendu : mail, tableau, note de synthèse]. Le ton doit être [professionnel, technique, neutre] et la longueur maximale de [nombre de mots/paragraphes].`,
                tips: "<strong>💡 Conseil de pro :</strong> Si vos ressources sont très longues (ex: un rapport PDF de 50 pages), n'hésitez pas à utiliser des outils dotés d'une grande fenêtre de contexte (comme Claude ou Gemini) pour y glisser le fichier entier."
            }
        ]
    },
    {
        id: "securite-reglementation",
        category: "reg",
        title: "6. Sécurité & Réglementation",
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
                title: "Les 5 Principes Clés du RGPD (Métier)",
                type: "rgpd-principles",
                intro: "Pour un agent territorial, manipuler des données d'identité (noms, prénoms) exige de respecter 5 obligations fondamentales. Ce cadre juridique strict explique <strong>pourquoi il est interdit de copier ces informations dans un LLM externe</strong> (ex. ChatGPT) ou d'y charger un PV de conseil municipal non anonymisé.",
                principles: [
                    {
                        num: "1",
                        title: "Le principe de finalité (Le 'Pourquoi')",
                        desc: "Vous ne devez pas utiliser ces noms et prénoms pour n'importe quoi. Ils doivent être collectés et manipulés pour un objectif précis, légitime et nécessaire à l'exercice de votre mission (par exemple : gérer un dossier d'usager, établir un acte d'état civil, envoyer une convocation).",
                        prohibition: "Interdiction absolue : Vous ne devez jamais utiliser ces données à des fins personnelles, politiques, ou pour une mission qui n'est pas la vôtre."
                    },
                    {
                        num: "2",
                        title: "Le secret professionnel & la confidentialité",
                        desc: "En tant qu'agent public, vous êtes soumis à une obligation de discrétion professionnelle. Dans le cadre du RGPD, cela se traduit par :",
                        bulletPoints: [
                            "<strong>Le besoin d'en connaître</strong> : Vous ne devez partager ces identités qu'avec les collègues ou services qui en ont strictly besoin pour travailler.",
                            "<strong>Le verrouillage des accès</strong> : Ne laissez jamais votre session informatique ouverte sans surveillance et ne partagez pas vos identifiants."
                        ]
                    },
                    {
                        num: "3",
                        title: "La sécurité des données (Bon sens)",
                        desc: "La manipulation de listes de noms et prénoms (souvent sur Excel ou dans des logiciels métiers) exige une hygiène informatique stricte :",
                        bulletPoints: [
                            "<strong>Pas de stockage sauvage</strong> : Ne copiez pas ces fichiers sur une clé USB personnelle ou sur le bureau d'un ordinateur non sécurisé.",
                            "<strong>Attention aux envois de mails</strong> : Si vous devez envoyer un mail à un groupe d'usagers, utilisez obligatoirement la copie cachée (<strong>Cci</strong>) pour éviter que chaque usager ne voie le nom et le prénom des autres."
                        ]
                    },
                    {
                        num: "4",
                        title: "La durée de conservation limitée",
                        desc: "Les prénoms et noms ne peuvent pas être conservés indéfiniment dans vos outils de travail quotidiens. Une fois que le dossier de l'usager est traité et que les délais légaux sont expirés, ces données doivent être :",
                        bulletPoints: [
                            "Soit supprimées.",
                            "Soit archivées selon les règles propres aux Archives publiques (tri, versement ou élimination réglementée)."
                        ]
                    },
                    {
                        num: "5",
                        title: "Le respect des droits des usagers",
                        desc: "Les citoyens ont des droits sur leurs données (droit d'accès, de rectification, d'opposition dans certains cas). Si un usager vous contacte pour modifier son nom mal orthographié ou pour savoir quelles données votre service détient sur lui, votre administration a l'obligation de lui répondre dans un <strong>délai d'un mois</strong>."
                    }
                ],
                dpoReflex: {
                    title: "💡 Votre meilleur réflexe : le DPO",
                    desc: "Chaque administration, collectivité ou ministère a l'obligation de nommer un <strong>DPO (Data Protection Officer)</strong> ou Délégué à la Protection des Données. Si vous avez un doute sur un transfert de fichier, un formulaire de collecte ou une demande d'un usager, c'est cette personne qu'il faut contacter. Elle est là pour vous guider et sécuriser vos pratiques."
                }
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
                title: "Cadre Juridique & Charte IA : Risques & Sanctions",
                type: "legal-charter-risks",
                intro: "L'utilisation d'IA générative dans les services publics expose l'agent et la collectivité à des risques juridiques distincts. L'adoption d'une <strong>Charte d'Utilisation IA</strong> transforme le flou juridique en un cadre clair et protecteur.",
                charterComparison: {
                    sansCharte: {
                        title: "❌ SANS Charte d'Utilisation",
                        subtitle: "Zone de Flou & Vulnérabilité Juridique",
                        agent: "<strong>Agent Public :</strong> Absence de consignes explicites. En cas de fuite de données ou d'erreur, risque de basculer en <em>faute personnelle</em> sans soutien protecteur de l'administration.",
                        collectivite: "<strong>Collectivité :</strong> Défaut d'encadrement (*accountability* RGPD). Présomption de négligence devant la CNIL et le Tribunal Administratif."
                    },
                    avecCharte: {
                        title: "✅ AVEC Charte d'Utilisation",
                        subtitle: "Cadre Sécurisé & Protecteur",
                        agent: "<strong>Agent Public :</strong> Périmètre clair (outils validés, données interdites). Les erreurs de bonne foi restent couvertes par la <em>protection fonctionnelle</em>.",
                        collectivite: "<strong>Collectivité :</strong> Conformité RGPD/AI Act démontrée. En cas de violation volontaire par un agent, la faute disciplinaire individuelle est nette et caractérisée."
                    }
                },
                risksMatrix: [
                    {
                        level: "🟢 Risque Minimal",
                        title: "Erreur matérielle / Coquille sans donnée sensible",
                        desc: "Formulation maladroite ou contresens dans une note interne sans impact tiers.",
                        agentSanction: "Rappel à l'ordre, cadrage managérial interne.",
                        collectiviteSanction: "Aucun impact juridique direct.",
                        law: "Règlement intérieur & Management"
                    },
                    {
                        level: "🟡 Risque Moyen",
                        title: "Défaut de mention IA / Transparence usager",
                        desc: "Publication d'une réponse usager par chatbot sans mention d'information IA.",
                        agentSanction: "Avertissement formel de la hiérarchie.",
                        collectiviteSanction: "Mise en demeure CNIL / Avertissement AI Act (Art. 50).",
                        law: "AI Act & CRPA (Code des Relations entre le Public et l'Administration)"
                    },
                    {
                        level: "🔴 Risque Maximal",
                        title: "Fuite RGPD / Secret professionnel / Acte administratif vicié",
                        desc: "Injecter des données de santé/NIR dans un LLM Cloud externe US ou valider sans relecture un arrêté vicié.",
                        agentSanction: "<strong>Sanction disciplinaire grave</strong> (du blâme à la <strong>révocation</strong> - Statut CGFP) + <strong>Poursuites pénales</strong> (Secret pro Art. 226-13 du Code Pénal : 1 an prison, 15k€ amende ; RGPD Art. 226-21).",
                        collectiviteSanction: "<strong>Amendes lourdes CNIL</strong>, annulation de l'acte au <strong>Tribunal Administratif</strong> (défaut de décision humaine, CRPA L.311-3-1).",
                        law: "Code Général de la Fonction Publique, Code Pénal, RGPD Art. 83"
                    }
                ],
                pedagogy: "<strong>💡 À retenir :</strong> La Charte d'Utilisation IA n'est pas un frein, c'est le <strong>bouclier juridique</strong> indispensable de l'agent et de l'institution. Elle garantit l'alignement sur la loi et préserve le principe fondamental : <em>la décision finale reste 100% humaine</em>."
            },
            {
                title: "Le Biais d'Automatisation & Responsabilité",
                type: "automation-bias",
                intro: "Le biais d'automatisation est un piège psychologique majeur dans lequel les agents publics risquent de tomber en utilisant des outils d'IA.",
                biasConcept: {
                    title: "🤖 Le Biais d'Automatisation",
                    desc: "La tendance humaine à faire une confiance excessive et aveugle aux suggestions fournies par des systèmes automatisés (comme les textes générés par une IA), même lorsqu'elles sont grossièrement erronées ou inappropriées. Face à un écrit propre et fluide, notre esprit critique baisse sa garde."
                },
                responsibility: {
                    title: "✍️ La Responsabilité de Signature",
                    desc: "Si un agent envoie un courrier officiel erroné, diffamatoire ou illégal rédigé par une IA, **c'est la responsabilité de la collectivité et de l'agent** qui est légalement engagée, pas celle de l'éditeur d'IA (ex: OpenAI, Google) qui décline toute responsabilité contractuelle."
                },
                pedagogy: "<strong>Intérêt pédagogique :</strong> Sensibiliser à la relecture critique. Un courrier officiel engage la signature publique de l'administration. <strong>La validation humaine (Dernier Mot) est obligatoire et non négociable.</strong>"
            },
            {
                title: "Souveraineté vs Cloud : Alternatives & Coûts",
                type: "collectivite-couts",
                intro: "Pour déployer l'IA, une collectivité fait face à un arbitrage stratégique : investir dans sa propre infrastructure locale sécurisée, ou s'abonner aux services cloud des géants de la Tech.",
                scenarios: [
                    {
                        id: "low",
                        label: "1. Expérimentation (Faible)",
                        users: 15,
                        desc: "Usage restreint à un petit groupe d'agents testeurs (ex. Services techniques ou DSI) pour évaluer les usages.",
                        local: {
                            invest: "15 000 €",
                            fixed: "3 000 € / an",
                            tco3y: "24 000 €",
                            userCost: "533 € / salarié / an",
                            breakdown: "Achat Serveur GPU : 15 000 € | Électricité & Climatisation : ~500 €/an | Maintenance IT & Mises à jour : ~2 500 €/an",
                            userCostDesc: "Investissement matériel initial lourd amorti sur seulement 15 testeurs, d'où un coût unitaire très élevé."
                        },
                        cloud: {
                            invest: "0 €",
                            fixed: "3 600 € / an",
                            tco3y: "10 800 €",
                            userCost: "240 € / salarié / an",
                            breakdown: "Licences Pro (Gemini/ChatGPT Plus) : 15 x 240 €/an | Installation de départ : 0 € | Formation : 0 €",
                            userCostDesc: "Formule flexible, idéale pour démarrer des tests immédiats sans immobilisation de budget d'investissement."
                        }
                    },
                    {
                        id: "medium",
                        label: "2. Transition (Moyen)",
                        users: 60,
                        desc: "Déploiement progressif dans plusieurs services (Secrétariat, Compta, Communication) pour des tâches quotidiennes.",
                        local: {
                            invest: "15 000 €",
                            fixed: "4 000 € / an",
                            tco3y: "27 000 €",
                            userCost: "150 € / salarié / an",
                            breakdown: "Achat Serveur GPU : 15 000 € | Électricité & Climatisation : ~800 €/an | Support technique & Audits : ~3 200 €/an",
                            userCostDesc: "Le serveur commence à être rentabilisé en étant partagé. Le coût par agent devient inférieur aux licences Cloud."
                        },
                        cloud: {
                            invest: "1 500 €",
                            fixed: "10 200 € / an",
                            tco3y: "32 100 €",
                            userCost: "178 € / salarié / an",
                            breakdown: "30 Licences Pro : 7 200 €/an | Consommation API widgets intranet : ~3 000 €/an | Formation & Setup initial : 1 500 €",
                            userCostDesc: "Facturation hybride pour limiter les coûts. Nécessite une surveillance des appels d'API (tokens) pour éviter les dérives."
                        }
                    },
                    {
                        id: "high",
                        label: "3. Intégration (Fort)",
                        users: 150,
                        desc: "Usage généralisé à l'ensemble de la collectivité, intégré en profondeur dans les outils de travail quotidiens.",
                        local: {
                            invest: "30 000 €",
                            fixed: "8 000 € / an",
                            tco3y: "54 000 €",
                            userCost: "120 € / salarié / an",
                            breakdown: "2 Serveurs GPU redondés : 30 000 € | Électricité & Climatisation : ~2 000 €/an | Administration système IT : ~6 000 €/an",
                            userCostDesc: "Excellent retour sur investissement. L'infrastructure est mutualisée à grande échelle, divisant par deux le coût par agent."
                        },
                        cloud: {
                            invest: "3 000 €",
                            fixed: "27 000 € / an",
                            tco3y: "84 000 €",
                            userCost: "187 € / salarié / an",
                            breakdown: "Licences Entreprise : 150 x 180 €/an (remise volume) | Audit conformité RGPD & DPO : 2 000 € | Formation : 1 000 €",
                            userCostDesc: "Coût cumulé sur 3 ans très élevé. Une dépense de fonctionnement (OpEx) pure qui pèse de plus en plus sur les budgets."
                        }
                    }
                ],
                localSpecs: {
                    title: "🖥️ Option A : IA Locale (Serveur Interne)",
                    subtitle: "Hébergement physique sans connexion Internet",
                    pros: [
                        "<strong>Souveraineté totale (RGPD) :</strong> Zéro fuite de données, aucune dépendance juridique ou géopolitique (Cloud Act).",
                        "<strong>Ancrage documentaire (Avantage) :</strong> Possibilité d'injecter tous les documents internes et confidentiels sans aucun risque.",
                        "<strong>Pas d'accès Internet (Avantage sécurité) :</strong> Confinement absolu qui évite les cyberattaques et l'extraction de données."
                    ],
                    cons: [
                        "<strong>Pas d'accès Internet (Inconvénient usage) :</strong> Incapable de faire des recherches en ligne en temps réel ou de mettre à jour ses connaissances.",
                        "<strong>Système à la traîne (Inconvénient performance) :</strong> Modèles open-source locaux rapidement obsolètes face à la puissance d'évolution des géants du Cloud.",
                        "<strong>Maintenance lourde :</strong> Nécessite des compétences d'administration système en interne et une gestion de la climatisation des serveurs."
                    ]
                },
                cloudSpecs: {
                    title: "☁️ Option B : IA Cloud (Géants - Gemini, ChatGPT, Claude)",
                    subtitle: "Abonnements SaaS et APIs de pointe",
                    pros: [
                        "<strong>À la pointe tout le temps (Avantage) :</strong> Accès instantané aux modèles d'IA les plus intelligents et mis à jour en continu.",
                        "<strong>Accès Internet (Avantage) :</strong> Recherche d'informations sur le web en temps réel (ex. derniers décrets officiels).",
                        "<strong>Coût initial nul (Avantage) :</strong> Aucun investissement dans des serveurs physiques coûteux."
                    ],
                    cons: [
                        "<strong>RGPD & Cloud Act (Inconvénient) :</strong> Risque d'accès par les autorités étrangères (Cloud Act US) et conformité RGPD très difficile à garantir sans anonymisation.",
                        "<strong>AI Act (Inconvénient) :</strong> Obligation de surveiller la conformité européenne des prestataires tiers.",
                        "<strong>Évolution rapide :</strong> Instabilité des tarifs, des APIs et des conditions d'utilisation qui évoluent tous les six mois."
                    ]
                }
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
                        title: 'Usages Autorisés et Règle d\'Or du "Contrôle Humain"',
                        points: [
                            "<strong>Aide à la productivité</strong> : Les agents sont autorisés à utiliser l'IA pour la rédaction de brouillons, la correction orthographique, la structuration de comptes-rendus non confidentiels, la synthèse de longs articles publics ou l'aide au remue-méninges (brainstorming).",
                            "<strong>Décision Administrative</strong> : L'IA ne doit en aucun cas prendre de décision unilatérale ou automatique concernant un usager (permis de construire, octroi d'aide sociale, etc.). <strong>La validation humaine (Dernier Mot)</strong> reste le principe fondamental de responsabilité publique. L'agent est l'unique auteur légal et responsable des écrits qu'il signe."
                        ]
                    },
                    {
                        num: "2",
                        title: "Interdictions de Saisie et Protection des Données (RGPD)",
                        intro: "Il est strictly interdit de copier-coller dans une invite de saisie (prompt) d'une IA publique :",
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
                        title: 'Recours Obligatoire à un Module Libre d\'Anonymisation ou de Pseudonymisation',
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
                title: "Physique des Puces : GPU vs TPU vs LPU",
                type: "hardware-comparison",
                desc: "Tous les processeurs d'IA ne se valent pas. Selon l'architecture choisie, la vitesse d'exécution et la facture énergétique varient du simple au quadruple :",
                hardwareTypes: [
                    { type: "GPU (Nvidia)", role: "Processeur graphique de forte consommation pour l'entraînement intensif.", power: "Très énergivore (~700W par carte)" },
                    { type: "TPU (Google)", role: "Puces tenso-vectorielles optimisées pour exécuter les calculs de Gemini.", power: "Consommation modérée" },
                    { type: "LPU (Groq)", role: "Puces ultra-rapides spécialisées dans l'inférence textuelle en temps réel.", power: "Très économe en énergie" }
                ]
            },
            {
                title: "Calculateur d'Empreinte Écologique & Eau des Prompts",
                type: "eco-calculator",
                desc: "Chaque requête soumise à une IA consomme de l'électricité et de l'eau pour refroidir les Datacenters. Ajustez les paramètres ci-dessous pour calculer l'empreinte environnementale de votre collectivité.",
                scenarios: [
                    { id: "frugal", label: "🌱 Modèle Frugal / TPU (Gemini / Mistral 8B)", waterPerReq: 0.05, co2PerReq: 0.15, kwhPerReq: 0.001 },
                    { id: "heavy", label: "🏭 Méga-Modèle Cloud (GPT-4o / Claude 3.5)", waterPerReq: 0.50, co2PerReq: 1.20, kwhPerReq: 0.008 }
                ]
            },
            {
                title: "Simulateur Interactif VRAM & Choix du Matériel GPU",
                type: "vram-calculator",
                desc: "Pour exécuter un modèle d'IA localement dans votre mairie (sans envoyer de données sur Internet), vous devez calculer la mémoire vidéo (VRAM) nécessaire sur vos serveurs.",
                models: [
                    { label: "8B Paramètres (ex: Llama 3 / Mistral 8B)", baseParams: 8 },
                    { label: "14B Paramètres (ex: Qwen 2.5 14B)", baseParams: 14 },
                    { label: "32B Paramètres (ex: DeepSeek R1 32B)", baseParams: 32 },
                    { label: "70B Paramètres (ex: Llama 3.3 70B)", baseParams: 70 },
                    { label: "405B Paramètres (ex: Llama 3 405B)", baseParams: 405 }
                ],
                quantizations: [
                    { label: "4-bit (Quantifié Frugal)", bytesPerParam: 0.65 },
                    { label: "8-bit (Précision Moyenne)", bytesPerParam: 1.10 },
                    { label: "16-bit (Précision FP16 Totale)", bytesPerParam: 2.00 }
                ]
            },
            {
                title: "Les Datacenters Spatiaux & Nucléaires",
                type: "satellite-datacenter",
                desc: "Face à l'explosion de la consommation électrique de l'IA, les géants de la Tech réactivent des centrales nucléaires (ex: Three Mile Island pour Microsoft) et projettent de déployer des Datacenters en orbite solaire.",
                details: "Les datacenters spatiaux bénéficient d'un rayonnement solaire ininterrompu 24h/24 et du froid absolu du vide spatial pour refroidir les puces sans consommer une seule goutte d'eau."
            },
            {
                title: "Matrice Comparative des Modèles Récents",
                type: "model-arbitrage",
                intro: "Ajustez les cas d'usages administratifs ci-dessous pour filtrer les modèles d'IA les plus performants et conformes au RGPD.",
                useCases: [
                    { id: "all", label: "Tous les Cas d'Usages" },
                    { id: "delib", label: "📑 Synthèse de Délibérations (50p)" },
                    { id: "mail", label: "✉️ Rédaction de Courriels & Courriers" },
                    { id: "incident", label: "🚨 Routage d'Incidents de Voirie" },
                    { id: "dsi", label: "💻 Code & Intranet DSI" }
                ],
                models: [
                    { name: "Mistral Small 24B", provider: "Mistral AI 🇫🇷", type: "Open-Source / Souverain", params: "24B", speed: "110 t/s", costInput: 0.20, costOutput: 0.60, scoreReasoning: 85, rgpd: "100% Souverain / Local", bestFor: "Courriels, Notes & Intranet municipal" },
                    { name: "Mistral Large 2", provider: "Mistral AI 🇫🇷", type: "Open-Source / Cloud", params: "123B", speed: "45 t/s", costInput: 2.00, costOutput: 6.00, scoreReasoning: 93, rgpd: "Conforme SecNumCloud", bestFor: "Analyse juridique & Délibérations complexes" },
                    { name: "Llama 3.3 70B", provider: "Meta 🇺🇸", type: "Open-Source", params: "70B", speed: "65 t/s", costInput: 0.35, costOutput: 0.90, scoreReasoning: 92, rgpd: "Hébergeable en Local", bestFor: "Raisonnement général & Métiers" },
                    { name: "DeepSeek V3 / R1", provider: "DeepSeek 🇨🇳", type: "Open-Weights", params: "671B (MoE)", speed: "55 t/s", costInput: 0.14, costOutput: 0.55, scoreReasoning: 96, rgpd: "Hébergeable sur serveur privé", bestFor: "Maths, Code DSI & Raisonnement complexe" },
                    { name: "Qwen 2.5 72B", provider: "Alibaba 🇨🇳", type: "Open-Source", params: "72B", speed: "70 t/s", costInput: 0.30, costOutput: 0.80, scoreReasoning: 91, rgpd: "Hébergeable en Local", bestFor: "Traitement multilingue & Données" },
                    { name: "GPT-4o", provider: "OpenAI 🇺🇸", type: "Propriétaire Cloud", params: "Inconnu", speed: "80 t/s", costInput: 2.50, costOutput: 10.00, scoreReasoning: 95, rgpd: "Cloud Act (Nécessite anonymisation)", bestFor: "Multimodal (Vision/Voix) & Généraliste" },
                    { name: "Claude 3.5 Sonnet", provider: "Anthropic 🇺🇸", type: "Propriétaire Cloud", params: "Inconnu", speed: "75 t/s", costInput: 3.00, costOutput: 15.00, scoreReasoning: 97, rgpd: "Cloud Act (Nécessite anonymisation)", bestFor: "Rédaction littéraire & Code haute qualité" },
                    { name: "Kimi K3 / Moonshot", provider: "Moonshot 🇨🇳", type: "Propriétaire Cloud", params: "Inconnu", speed: "90 t/s", costInput: 0.40, costOutput: 1.20, scoreReasoning: 93, rgpd: "Cloud externe", bestFor: "Ultra-long contexte (Documents 2M tokens)" },
                    { name: "GLM-4 9B / 130B", provider: "Zhipu AI 🇨🇳", type: "Open / Cloud", params: "9B-130B", speed: "100 t/s", costInput: 0.25, costOutput: 0.70, scoreReasoning: 89, rgpd: "Hébergeable en Local (9B)", bestFor: "Frugalité & Automatisation rapide" }
                ]
            }
        ]
    },
    {
        id: "agentique-territorial",
        category: "agent",
        title: "8. L'IA Agentique & Antigravity",
        icon: "🤖",
        desc: "Comprendre pourquoi la boucle agentique dépasse largement l'utilisation passive d'un chat d'intelligence artificielle.",
        slides: [
            {
                title: "Chatbot vs Agent IA (La boucle d'autonomie)",
                type: "agentic-comparison",
                desc: "Le Chat classique est une interaction linéaire. L'Agentique est une boucle d'autonomie où la machine planifie, agit et évalue son propre travail.",
                chatWorkflow: {
                    title: "💬 Chatbot Passif (Linéaire)",
                    steps: [
                        { role: "Humain", text: "Tape un prompt vague." },
                        { role: "LLM", text: "Calcule et répond d'une seule traite sans tester." },
                        { role: "Humain", text: "Détecte les erreurs et doit ré-expliquer manuellement pour corriger." }
                    ]
                },
                agenticWorkflow: {
                    title: "🤖 Agent Autonome (Boucle)",
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
                title: "La Boucle de Raisonnement ReAct",
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
                title: "L'IA Multimodale : Vision, OCR & Transcription Vocale",
                type: "multimodal-demo",
                desc: "Les agents IA modernes ne traitent pas uniquement du texte : ils disposent d'yeux (Vision/OCR) et d'oreilles (Audio Whisper) pour traiter automatiquement tous les flux d'entrées physiques de la collectivité.",
                cases: [
                    {
                        id: "case-ocr",
                        icon: "📄",
                        title: "1. OCR Intelligente de Courriers & PDF Scannés",
                        scenario: "Un usager envoie un courrier manuscrit ou un formulaire PDF numérisé de travers.",
                        iaAction: "L'IA Vision (VLM) 'lit' le document scanné, extrait les données clés (Nom, Adresse, Objet de la demande, Urgence) et génère un JSON propre pour le logiciel métier.",
                        demoData: {
                            inputDoc: "📄 Courrier_Scanné_Mr_Dufour.pdf (3.4 Mo)",
                            extractedFields: {
                                "Administré": "Charles DUFOUR",
                                "Adresse": "14 Rue des Lilas, 75011 Paris",
                                "Objet": "Demande de subvention d'aide à la rénovation thermique",
                                "Urgence": "Haute (Échéance 15 mars)",
                                "Statut": "Numérisé & Pré-rempli automatiquement dans la BDD Mairie"
                            }
                        }
                    },
                    {
                        id: "case-vision",
                        icon: "📸",
                        title: "2. Analyse d'Images de Voirie (Signalements Citoyens)",
                        scenario: "Un habitant prend une photo d'un nid-de-poule ou d'un dépôt sauvage via l'application municipale.",
                        iaAction: "L'IA analyse les pixels de la photo, identifie le type de dégradation ('Dépôt sauvage de gravats'), estime la gravité et catégorise l'intervention pour les services techniques.",
                        demoData: {
                            photoName: "📷 Signalement_Photo_8849.jpg",
                            detectedObject: "Dépôt sauvage encombrants (Gravats + Bois)",
                            confidenceScore: "98.4%",
                            dispatchService: "Service Espaces Verts & Propreté Urbaine",
                            priorityLevel: "Priorité 2 (Enlèvement sous 48h)"
                        }
                    },
                    {
                        id: "case-audio",
                        icon: "🎙️",
                        title: "3. Transcription & Procès-Verbaux de Conseils Municipaux (Whisper)",
                        scenario: "3 heures d'enregistrement audio d'une séance de conseil municipal à retranscrire.",
                        iaAction: "Transcription vocale ultra-précise (modèle Whisper), identification des prises de parole et génération automatique de la synthèse structurée par délibération.",
                        demoData: {
                            audioFile: "🎙️ Conseil_Municipal_10_Fevrier.mp3 (180 min)",
                            transcriptionSample: "\"M. le Maire ouvre la séance à 19h02. La délibération n°4 concernant la rénovation de la cantine est adoptée à l'unanimité...\"",
                            summaryGenerated: "PV Officiel généré en 4 pages avec indexation horodatée des débats"
                        }
                    }
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
            },
            {
                title: "Sécurité & Confinement : Les Risques de l'Agentique",
                type: "agentic-warning",
                intro: "Contrairement à un simple Chat passif, un Agent IA est actif : il dispose d'outils lui permettant de lire, écrire, exécuter des scripts et installer des programmes directement sur le système d'exploitation.",
                risks: [
                    {
                        title: "💻 Prise de contrôle du PC",
                        desc: "L'agent accède directement au terminal et au disque dur. Il agit avec les mêmes privilèges que l'utilisateur qui l'a lancé, pouvant exécuter des commandes système réelles."
                    },
                    {
                        title: "🌀 Erreur ou Hallucination fatale",
                        desc: "Une commande mal interprétée ou une hallucination sémantique de l'agent peut entraîner la suppression accidentelle de bases de données, de fichiers système ou de documents de travail."
                    },
                    {
                        title: "📡 Injection de prompt indirecte",
                        desc: "Si l'agent lit un courriel ou un document externe piégé par un hacker, il peut être manipulé pour exécuter des scripts malveillants, voler des données ou installer un rançongiciel."
                    }
                ],
                solutions: [
                    {
                        title: "🖥️ Recommandation : Cloisonnement en Machine Virtuelle (VM)",
                        desc: "Pour écarter tout risque, il est <strong>impératif de n'exécuter un agent IA autonome que dans un environnement isolé</strong> : une Machine Virtuelle (ex. VirtualBox) ou un conteneur sécurisé (sandbox). En cas de bug ou d'attaque, seul l'environnement virtuel est affecté, le PC hôte reste intact."
                    },
                    {
                        title: "🔒 Validation Humaine (Human-in-the-Loop)",
                        desc: "Ne jamais utiliser de mode '100% autonome' pour des tâches système. L'agent doit obligatoirement s'arrêter et solliciter votre validation manuelle (comme le système de validation d'Antigravity) avant chaque commande d'écriture ou d'exécution de script."
                    }
                ]
            }
        ]
    },
    {
        id: "tuto-technique",
        category: "agent",
        title: "9. Tuto : Créer une Application",
        icon: "💻",
        desc: "Créer et héberger un site de manière gratuite et sécurisée en conformité avec le RGPD.",
        slides: [
            {
                title: "Architecture Client-Serveur Souveraine",
                type: "architecture-diagram",
                desc: "Pour déployer une application web au sein d'une collectivité sans budget d'infrastructure lourd, l'architecture recommandée sépare l'interface publique de la base de données sécurisée.",
                frontend: {
                    title: "🌐 Interface Utilisateur (Frontend)",
                    tech: "HTML5 / CSS3 / JavaScript Vanille",
                    host: "GitHub Pages (Gratuit)",
                    desc: "Les fichiers statiques du site (pages, styles, scripts) sont hébergés gratuitement et distribués via un réseau CDN mondial rapide."
                },
                backend: {
                    title: "🗄️ Base de Données & Sécurité (Backend)",
                    tech: "Supabase (PostgreSQL + RLS)",
                    host: "Serveur Francfort (Europe)",
                    desc: "Les données des usagers et les réponses aux sondages sont stockées sur un serveur PostgreSQL situé en Allemagne pour respecter 100% le RGPD."
                }
            },
            {
                title: "Tuto 1 : Hébergement Gratuit sur GitHub Pages",
                type: "tuto-step",
                stepNum: "1",
                titleStep: "Publier son site en 3 clics sur GitHub Pages",
                desc: "GitHub Pages permet d'héberger gratuitement n'importe quel site web statique sous une adresse sécurisée HTTPS.",
                code: `<!-- Structure minimale d'un fichier index.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Application Mairie</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Bienvenue sur le Portail Municipal</h1>
    <script src="app.js"></script>
</body>
</html>`,
                instructions: [
                    "Créez un compte gratuit sur <strong>GitHub.com</strong> et créez un nouveau dépôt public (ex: <code>mairie-app</code>).",
                    "Déposez vos fichiers <code>index.html</code>, <code>style.css</code> et <code>app.js</code> sur le dépôt.",
                    "Allez dans <em>Settings ➔ Pages</em>, choisissez la branche <code>main</code> et validez. Votre site est en ligne sous l'adresse <code>https://votre-compte.github.io/mairie-app/</code>."
                ]
            },
            {
                title: "Tuto 2 : Base de Données Supabase (Francfort)",
                type: "tuto-step",
                stepNum: "2",
                titleStep: "Connecter son application à une base Supabase",
                desc: "Supabase est l'alternative open-source souveraine à Firebase. Créez votre projet en choisissant le centre de données de <strong>Francfort (EU-Central-1)</strong>.",
                code: `// Exemple de connexion JS à intégrer dans votre index.html
const supabaseUrl = 'https://votre-projet.supabase.co';
const supabaseKey = 'votre-cle-anon-publique';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Enregistrer une réponse d'usager dans la BDD
async function enregistrerVote(questionId, reponseTexte) {
    const { data, error } = await supabaseClient
        .from('votes')
        .insert([
            { poll_id: questionId, reponse: reponseTexte }
        ]);
}`,
                instructions: [
                    "Connectez-vous sur <strong>Supabase.com</strong> et créez un projet en sélectionnant la région <strong>Europe (Francfort)</strong>.",
                    "Allez dans l'Éditeur SQL (<em>SQL Editor</em>) et exécutez le script d'initialisation des tables <code>sessions</code>, <code>votes</code> et <code>presences</code>.",
                    "Copiez votre clef API publique (<code>anon key</code>) dans votre code Javascript pour activer le temps réel."
                ]
            },
            {
                title: "Tuto 3 : Sécuriser la BDD avec Row Level Security (RLS)",
                type: "tuto-step",
                stepNum: "3",
                titleStep: "Verrouiller les accès avec la sécurité au niveau des lignes (RLS)",
                desc: "Par défaut, une base de données web est vulnérable aux injections et modifiations non autorisées. La fonctionnalité **Row Level Security (RLS)** de PostgreSQL garantit la protection stricte.",
                code: `-- Requête SQL de sécurité RLS exécutée par Supabase
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Autoriser tout le monde à INSÉRER un vote (Stagiaires / Usagers)
CREATE POLICY "Insertion publique des votes" ON votes 
FOR INSERT WITH CHECK (true);

-- Autoriser uniquement les administrateurs connectés à LIRE et SUPPRIMER
CREATE POLICY "Lecture réservée aux administrateurs" ON votes 
FOR SELECT USING (auth.role() = 'authenticated');`,
                instructions: [
                    "Activez le commutateur <strong>Enable RLS</strong> sur chaque table de votre base de données Supabase.",
                    "Définissez une politique <code>INSERT</code> autorisant les utilisateurs anonymes à soumettre des données.",
                    "Restreignez les requêtes <code>SELECT</code> et <code>DELETE</code> aux seuls comptes administrateurs identifiés via <code>auth.role()</code>."
                ]
            }
        ]
    },
    {
        id: "guide-dsi-ultime",
        category: "dsi",
        title: "10. Stratégie & Déploiement",
        icon: "🚀",
        desc: "Accompagner la gouvernance numérique, valoriser les compétences des agents et structurer la feuille de route DSI.",
        slides: [
            {
                title: "La Loi d'Amara & L'Adoption Territoriale",
                type: "amara-law",
                desc: "La loi de Roy Amara énonce que nous avons tendance à **surestimer l'effet d'une technologie à court terme** et à **sous-estimer son effet à long terme**.",
                shortTerm: {
                    title: "🔴 Court Terme (0 - 18 mois)",
                    desc: "Superficialité et surestimation. On imagine que l'IA va remplacer les agents dès demain. Déceptions face aux erreurs et hésitations sur le RGPD."
                },
                longTerm: {
                    title: "🟢 Long Terme (3 - 5 ans)",
                    desc: "Transformation profonde sous-estimée. L'IA devient une infrastructure invisible intégrée dans tous les logiciels administratifs (GRC, RH, Compta)."
                }
            },
            {
                title: "L'Arbre Décisionnel du DSI / Directeur Général",
                type: "dsi-decision-tree",
                desc: "Avant d'autoriser un outil d'IA au sein de la collectivité, appliquez ce filtre décisionnel en 4 étapes :",
                nodes: [
                    { step: "1", title: "Nature de la Donnée", desc: "Le texte contient-il des données à caractère personnel (RGPD) ou des secrets administratifs ?" },
                    { step: "2", title: "Option Anonymisation", desc: "SI OUI ➔ Passage obligatoire dans le module d'anonymisation local avant envoi." },
                    { step: "3", title: "Choix de l'Hébergement", desc: "SI NON ➔ Préférer un modèle souverain européen (ex: Mistral AI) ou un serveur privé local." },
                    { step: "4", title: "Validation Humaine", desc: "Validation obligatoire de tout livrable par un agent titulaire avant signature officielle." }
                ]
            },
            {
                title: "Matrice de Compétences IA & Valorisation IFSE / NBI",
                type: "dsi-ifse-matrix",
                desc: "Pour encourager la montée en compétences des fonctionnaires territoriaux sans créer de blocages RH, intégrez la maîtrise des outils d'IA dans les fiches de poste et la valorisation indemnitaire (IFSE) :",
                levels: [
                    { level: "Niveau 1 : Agent Sensibilisé", skills: "Compréhension de la charte IA municipale, utilisation des règles de sécurité RGPD et correction des hallucinations basiques.", ifseBonus: "Validation des compétences numériques de base" },
                    { level: "Niveau 2 : Agent Praticien (Prompt Master)", skills: "Maîtrise de la méthode M.A.I.R.E., création de prompts de synthèse complexes, anonymisation autonome des dossiers.", ifseBonus: "Revalorisation du coefficient de technicité IFSE" },
                    { level: "Niveau 3 : Agent Référent / Concevant", skills: "Création d'agents autonomes sur-mesure (ex: via Antigravity), formation des collègues du service, audit des flux de données.", ifseBonus: "Attribution de la NBI (Nouvelle Bonification Indiciaire) Référent Numérique" }
                ]
            },
            {
                title: "L'Architecture Souveraine \"Zero-Clic\" (SecNumCloud + Proxy Mistral)",
                type: "pipeline-secnumcloud",
                desc: "La solution idéale combine l'isolation par Machine Virtuelle (VM), un Proxy Mistral sur serveur SecNumCloud (ANSSI) avec anonymisation RegEx/JSON automatique, et l'appel sécurisé aux modèles Cloud.",
                agentView: {
                    title: "👩‍💼 Pour l'Agent Public (Simplicité 100% Automatique)",
                    desc: "L'agent tape son prompt et glisse ses fichiers/photos directement dans son espace. L'anonymisation, le chiffrement éphémère et les contrôles juridiques (RGPD / Cloud Act) s'exécutent de façon transparente en arrière-plan sans aucun effort manuel."
                },
                dsiView: {
                    title: "💻 Pour le DSI / RSI (Architecture Technique Détaillée)",
                    steps: [
                        { step: "1. VM Confinée", label: "Isolation Poste Agent", desc: "L'agent travaille dans une VM étanche (VirtualBox) qui empêche toute fuite de données ou injection de code malveillant vers le réseau physique de la mairie." },
                        { step: "2. Proxy SecNumCloud", label: "Mistral Souverain (ANSSI)", desc: "Le prompt et les documents sont envoyés à un modèle Mistral hébergé sur serveur certifié SecNumCloud en France (immunité absolue au Cloud Act)." },
                        { step: "3. Substitution Vraisemblable", label: "Mistral + Dictionnaire JSON", desc: "Plutôt que des balises brutes [NOM_1], Mistral remplace les données réelles (ex: Maxime JACQUIOT) par des identités fictives plausibles (ex: Henri DUPONT) via une base de données de substitution. Le prompt reste 100% naturel pour le LLM tout en préservant le RGPD." },
                        { step: "4. Appel API Externe", label: "Modèle Cloud Généraliste", desc: "Le prompt nettoyé et anonymisé est envoyé via API sécurisée aux géants (Gemini, Claude, ChatGPT) pour exécuter les calculs complexes." },
                        { step: "5. Dé-pseudonymisation", label: "Restitution 0-Clic", desc: "Le résultat renvoyé par l'IA externe est ré-associé automatiquement aux vrais noms grâce à la clé JSON stockée en mémoire volatile. L'agent reçoit son document complet." }
                    ]
                }
            },
            {
                title: "Calculateur de Coûts & Financement DSI (TCO 3 Ans)",
                type: "pipeline-cost-calculator",
                desc: "Estimez le budget annuel global, le dimensionnement des modèles Mistral souverains et la gestion des quotas de crédits par catégorie d'agents (Catégorie A, B, C).",
                infraTiers: [
                    { id: "tier-small", name: "Cluster S : Mistral NeMo 12B (200€/mois)", model: "Mistral NeMo 12B", gpu: "1x RTX 6000 Ada (48GB VRAM)", baseServerCostYear: 2400, desc: "Adapté pour petites structures (5-50 agents). Traitement de textes simples." },
                    { id: "tier-med", name: "Cluster M : Mistral Small 3 24B (600€/mois)", model: "Mistral Small 3 24B", gpu: "1x Nvidia A100 (80GB VRAM)", baseServerCostYear: 7200, desc: "Standard moyen (50-300 agents). Pseudonymisation sémantique rapide." },
                    { id: "tier-large", name: "Cluster L (Recommandé) : Mistral Large 2 123B (1 500€/mois)", model: "Mistral Large 2 123B", gpu: "Cluster Dedié 2x Nvidia H100 (160GB VRAM)", baseServerCostYear: 18000, desc: "Puissance maximale pour Métropoles/Départements. Précision parfaite sur documents volumineux." }
                ],
                roleQuotas: [
                    { category: "Catégorie C (Agents Techniques & Terrain)", reqPerDay: 10, label: "10 requêtes / jour", usage: "Dictée vocale, signalements voirie, photos encombrants." },
                    { category: "Catégorie B (Agents Administratifs & Rédacteurs)", reqPerDay: 35, label: "35 requêtes / jour", usage: "Rédaction de courriers, comptes-rendus, synthèses usagers." },
                    { category: "Catégorie A / DSI (Cadres & Directeurs)", reqPerDay: 100, label: "100 requêtes / jour", usage: "Rédaction de délibérations, marchés publics, audit réglementaire." }
                ]
            }
        ]
    },
    {
        id: "eval-stage-bilan",
        category: "eval",
        title: "11. Évaluation Stage",
        icon: "🎓",
        desc: "Mesurer la progression des connaissances théoriques et pratiques acquises durant la formation.",
        slides: [
            {
                title: "Test d'Évaluation de Fin de Stage (Corrigé)",
                type: "eval-stage",
                desc: "Évaluez votre niveau de maîtrise sur les 10 notions clés de la formation IA Territoriale.",
                questions: [
                    { 
                        q: "1. Qu'est-ce qu'un Token en IA ?", 
                        choices: [
                            "Une pièce de monnaie virtuelle réservée aux transactions sur le Dark Web", 
                            "Un morceau de mot, de syllabe ou de symbole numérisé par le modèle", 
                            "Un script de sécurité installé par le DSI sur l'ordinateur de l'agent", 
                            "Un composant physique situé à l'intérieur du processeur graphique (GPU)"
                        ], 
                        correct: 1, 
                        exp: "Le token est la plus petite unité de texte numérisée et traitée par un LLM." 
                    },
                    { 
                        q: "2. Quel texte de loi américain autorise l'accès aux données des entreprises US même situées en Europe ?", 
                        choices: [
                            "Le Cloud Act américain", 
                            "Le Règlement Général sur la Protection des Données (RGPD)", 
                            "La Loi de Roy Amara sur les révolutions technologiques", 
                            "Le Code de la Route des Autoroutes de l'Information"
                        ], 
                        correct: 0, 
                        exp: "Le Cloud Act permet aux autorités US d'exiger les données gérées par des entreprises américaines, même hébergées sur le sol européen." 
                    },
                    { 
                        q: "3. Dans la méthode M.A.I.R.E. de rédaction de prompt, que garantit l'étape 'R' (Ressources) ?", 
                        choices: [
                            "Elle garantit la rédaction automatique du document en format PDF final imprimable", 
                            "Elle fournit les données et textes officiels de travail pour ancrer l'IA et éliminer les hallucinations", 
                            "Elle vérifie la vitesse de connexion réseau du serveur avant de lancer le calcul", 
                            "Elle réserve automatiquement une salle de réunion et des chouquettes pour le conseil municipal"
                        ], 
                        correct: 1, 
                        exp: "Fournir des ressources de travail (ancrage RAG) empêche l'IA d'inventer des faits ou de fausses références juridiques." 
                    }
                ]
            }
        ]
    },
    {
        id: "exercices-ateliers",
        category: "eval",
        title: "12. Exercices & Ateliers",
        icon: "🏋️",
        desc: "Une banque complète de 60 exercices pratiques et théoriques, individuels et collectifs, sur PC ou sur papier.",
        slides: [
            {
                title: "Tableau de Bord des 60 Exercices Pratiques",
                type: "exercises-dashboard",
                intro: "Sélectionnez, filtrez et préparez vos ateliers de formation. Ce module interactif regroupe l'ensemble des exercices pratiques sur PC ou sur papier avec leurs corrections détaillées."
            }
        ]
    }
];

// Base de données des questions interactives (Sondages & Quiz) associées à chaque thème
const INTERACTIVE_QUESTIONS = [
    {
        themeId: "histoire-ia",
        id: "q1",
        type: "quiz",
        question: "En 1950, Alan Turing publie son célèbre 'Test d'Imitation'. Quel était le principe fondamental de ce test pour évaluer l'intelligence d'une machine ?",
        options: {
            A: "Vérifier si un supercalculateur peut résoudre un problème de mathématiques complexes plus vite qu'un être humain",
            B: "Demander à la machine d'obtenir une augmentation de salaire auprès de sa hiérarchie sans trembler",
            C: "Évaluer si un juge humain dialoguant à aveugle par texte est incapable de distinguer les réponses de la machine de celles d'un humain",
            D: "Mesurer le temps de réponse d'un processeur pour traduire instantanément un texte administratif en cinq langues"
        },
        correct: "C",
        explanation: "Le Test de Turing (1950) repose sur le dialogue textuel en aveugle : si l'évaluateur humain ne peut pas distinguer la machine de l'humain, le test est réussi."
    },
    {
        themeId: "technique-llm",
        id: "q2",
        type: "quiz",
        question: "Pourquoi les sigles et acronymes de l'administration (ex: P.L.U., R.G.P.D., D.G.S.) consomment-ils proportionnellement plus de tokens et coûtent-ils plus cher ?",
        options: {
            A: "Parce que les termes rares et les lettres séparées par des points ne figurent pas dans le dictionnaire du tokenizer, qui doit les découper lettre par lettre",
            B: "Parce que la législation européenne AI Act impose une taxe fiscale supplémentaire sur l'usage des sigles publics",
            C: "Parce que l'IA traduit obligatoirement les abréviations françaises en anglais avant d'exécuter son calcul",
            D: "Parce que les serveurs d'OpenAI appliquent un tarif de punition chaque fois qu'on utilise du jargon administratif"
        },
        correct: "A",
        explanation: "Le tokenizer scinde les mots rares et les lettres isolées par des points en multiples tokens individuels, ce qui augmente la consommation de tokens."
    },
    {
        themeId: "hallucinations-ia",
        id: "q3",
        type: "quiz",
        question: "Quelle est la cause scientifique première d'une 'hallucination' lorsqu'un LLM génère un texte administratif ou juridique ?",
        options: {
            A: "Un dysfonctionnement temporaire de la connexion réseau entre le poste de l'agent et le datacenter",
            B: "Une erreur d'indexation dans la base de données de jurisprudence du Journal Officiel consultée par l'IA",
            C: "Une surchauffe des cartes graphiques qui pousse le serveur à prendre des initiatives créatives",
            D: "La nature probabiliste du réseau de neurones, qui prédit la suite de mots la plus fluide sans consulter de base de faits réels"
        },
        correct: "D",
        explanation: "Un LLM est un moteur de prédiction statistique de mots : il vise la fluidité rédactionnelle et non la vérité factuelle. Sans ancrage (RAG), il comble les manques en inventant."
    },
    {
        themeId: "prompt-homme",
        id: "q4",
        type: "quiz",
        question: "Si une alarme incendie retentit dans l'accueil de la mairie, pourquoi l'IA est-elle incapable d'ordonner l'évacuation de son propre chef ?",
        options: {
            A: "Parce qu'elle attend systématiquement une délibération votée à l'unanimité en conseil municipal",
            B: "Parce qu'elle n'a ni corps ni capteurs biologiques : sans prompt textuel décrivant l'urgence, elle reste complètement aveugle au monde réel",
            C: "Parce que les consignes de sécurité (System Prompt) d'OpenAI lui interdisent de donner des conseils de secourisme",
            D: "Parce que son algorithme de traitement est limité par le nombre maximal de requêtes autorisées par minute"
        },
        correct: "B",
        explanation: "L'humain perçoit l'urgence par ses sens. L'IA est enfermée dans un serveur aveugle et dépend entièrement du contexte rédigé dans le prompt."
    },
    {
        themeId: "methode-maire",
        id: "q5",
        type: "quiz",
        question: "Dans la méthodologie M.A.I.R.E. recommandée pour le secteur public, quel est l'objectif clé de la lettre 'R' (Ressources) ?",
        options: {
            A: "Rappel réglementaire : exiger que l'IA cite les articles du Code du Travail à la fin de sa réponse",
            B: "Ressources : fournir les textes, arrêtés et données exactes de la collectivité pour verrouiller l'IA et éliminer les hallucinations",
            C: "Rédaction automatique : demander à l'IA de générer le document directement au format PDF imprimable",
            D: "Pause RTT : autoriser l'agent à aller prendre un café pendant que l'ordinateur travaille à sa place"
        },
        correct: "B",
        explanation: "Le 'R' de M.A.I.R.E. représente les 'Ressources' (technique d'ancrage RAG). Transmettre la documentation exacte empêche l'IA d'inventer des faits."
    },
    {
        themeId: "securite-reglementation",
        id: "q6",
        type: "quiz",
        question: "En quoi le 'Cloud Act' américain constitue-t-il un risque majeur de souveraineté pour les collectivités territoriales européennes ?",
        options: {
            A: "Il interdit aux éditeurs américains de vendre des abonnements logiciels aux mairies françaises de moins de 10 000 habitants",
            B: "Il oblige les collectivités à payer une taxe foncière sur les serveurs informatiques situés en Europe",
            C: "Il permet aux autorités judiciaires US de réclamer l'accès aux données stockées chez les Big Tech US, même sur leurs serveurs situés en Europe",
            D: "Il impose aux agents publics de rédiger tous leurs courriels administratifs en anglais américain"
        },
        correct: "C",
        explanation: "Le Cloud Act extraterritorial permet aux autorités US d'exiger les données détenues par des entreprises américaines, d'où le besoin d'anonymisation ou d'outils souverains."
    },
    {
        themeId: "guerre-ia",
        id: "q7",
        type: "quiz",
        question: "Pourquoi les géants de la Tech développent-ils des puces sur-mesure (TPU Google, LPU Groq) comme alternatives aux GPU Nvidia ?",
        options: {
            A: "Parce que ces puces spécialisées accélèrent considérablement la vitesse de génération de texte tout en réduisant la facture énergétique",
            B: "Parce que les GPU Nvidia sont en rupture de stock suite à des commandes massives du Ministère de la Magie",
            C: "Parce que le règlement européen AI Act va interdire l'usage des cartes graphiques Nvidia sur le sol européen d'ici 2026",
            D: "Parce que ces puces permettent d'utiliser les intelligences artificielles entièrement sans connexion Internet"
        },
        correct: "A",
        explanation: "Les TPU et LPU sont des processeurs optimisés spécifiquement pour l'inférence des LLM, offrant une sobriété énergétique et une vitesse de texte supérieures."
    },
    {
        themeId: "agentique-territorial",
        id: "q8",
        type: "quiz",
        question: "Quelle est la différence fondamentale entre un simple Chatbot et un Agent IA autonome (comme Antigravity) ?",
        options: {
            A: "Le Chatbot fonctionne uniquement sur smartphone alors que l'Agent IA s'installe uniquement sur serveur Linux",
            B: "Le Chatbot est un outil gratuit alors que l'Agent IA autonome est obligatoirement payant et sous licence privée",
            C: "Le Chatbot génère du texte de façon linéaire sans tester, tandis que l'Agent s'appuie sur une boucle ReAct pour planifier, exécuter des outils et corriger ses propres erreurs",
            D: "Le Chatbot a besoin d'une pause déjeuner à midi alors que l'Agent IA se nourrit uniquement d'électricité"
        },
        correct: "C",
        explanation: "Un Agent IA autonome dispose d'outils et fonctionne en boucle de raisonnement (Planifier -> Agir -> Observer -> Corriger) pour réaliser des projets complexes."
    },
    {
        themeId: "tuto-technique",
        id: "q9",
        type: "quiz",
        question: "Dans une architecture web souveraine pour collectivité, pourquoi héberger sa base de données (ex: Supabase) en région Europe (Francfort) ?",
        options: {
            A: "Parce que les serveurs allemands sont équipés de saucisses et de bières gratuites pour les développeurs",
            B: "Parce que la vitesse de la fibre optique est physiquement deux fois plus rapide entre Paris et Francfort qu'entre Paris et Lyon",
            C: "Pour garantir la localisation physique des données au sein de l'UE et assurer la conformité stricte avec le RGPD et le DPO",
            D: "Parce que GitHub Pages exige obligatoirement une connexion à une base de données allemande pour fonctionner"
        },
        correct: "C",
        explanation: "Localiser la BDD en région Europe (Francfort) garantit le respect de la souveraineté et des règles de protection des données du RGPD."
    },
    {
        themeId: "guide-dsi-ultime",
        id: "q10",
        type: "quiz",
        question: "Que préconise la célèbre 'Loi d'Amara' concernant la vision stratégique d'une DSI sur l'adoption de l'IA ?",
        options: {
            A: "Elle stipule qu'une collectivité doit remplacer 50% de ses logiciels métiers par des IA génératives dans un délai maximal de 12 mois",
            B: "Elle rappelle que l'on surestime toujours l'impact d'une technologie à court terme, mais qu'on sous-estime sa transformation profonde à long terme",
            C: "Elle interdit l'usage des outils d'IA pour la rédaction des documents budgétaires et comptables des mairies",
            D: "Elle exige que tous les directeurs informatiques portent une cape de super-héros lors des réunions de crise"
        },
        correct: "B",
        explanation: "La Loi d'Amara explique pourquoi les premières expérimentations déçoivent parfois (surestimation court terme) avant de métamorphoser les organisations (long terme)."
    },
    {
        themeId: "eval-stage-bilan",
        id: "q11",
        type: "quiz",
        question: "Quelle est la règle d'or juridique concernant la responsabilité d'un courrier administratif officiel rédigé avec l'aide d'une IA ?",
        options: {
            A: "La responsabilité est partagée à 50/50 entre la mairie et le fournisseur d'accès à Internet",
            B: "La validation humaine est obligatoire : l'agent public titulaire qui valide et signe le document en conserve la responsabilité juridique exclusive",
            C: "C'est l'éditeur de l'outil d'IA (OpenAI, Google ou Anthropic) qui est légalement responsable en cas d'erreur dans le texte généré",
            D: "En cas de litige, c'est le robot serveur du datacenter qui est convoqué à la barre du Tribunal Administratif"
        },
        correct: "B",
        explanation: "La validation humaine ('Dernier Mot') est non négociable dans la fonction publique : l'agent public signataire est l'unique auteur légalement responsable."
    },
    {
        themeId: "exercices-ateliers",
        id: "q12",
        type: "sondage",
        question: "À l'issue de cette formation interactive, quelle est votre priorité pour intégrer l'IA dans votre collectivité ?",
        options: {
            A: "🚀 Expérimenter la méthode M.A.I.R.E. dès cette semaine pour mes rédactions quotidiennes",
            B: "🛡️ Proposer la Charte d'Utilisation IA et mettre en place l'anonymisation locale au sein de mon service",
            C: "💻 Échanger avec ma DSI pour étudier le déploiement d'outils souverains (ex: Albert ou Mistral local)",
            D: "🎓 Organiser des ateliers pratiques approfondis pour former l'ensemble de mon équipe"
        }
    }
];
