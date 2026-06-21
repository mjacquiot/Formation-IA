# Corpus de Formation : Intelligence Artificielle dans la Fonction Publique Territoriale

Ce document contient l'intégralité du contenu pédagogique, des diapositives de cours, de la charte déontologique municipale, des quiz interactifs et des 60 exercices pratiques de la formation CNFPT d'introduction à l'IA territoriale.

Il sert de base de connaissances (source d'ancrage) pour NotebookLM afin de concevoir d'autres supports de formation, des évaluations de fin de stage, des études de cas personnalisées et des exercices complémentaires adaptés aux différents services municipaux.

### Métadonnées du Projet
- **Auteur / Organisation :** CNFPT (Centre National de la Fonction Publique Territoriale)
- **Version :** 2.0 (Version Simplifiée & Interactive)
- **Technologies de l'application :** Interface HTML/CSS/JS (GitHub Pages) + Base de données synchronisée en temps réel (Supabase PostgreSQL Europe/Francfort) + Agent d'ingénierie autonome (Antigravity de Google DeepMind) pour l'accompagnement technique.

---

## Charte Déontologique et Réglementaire d'Usage de l'IA dans la Collectivité
*Cette charte s'impose à tous les agents administratifs et stagiaires de la commune.*

# Charte d'Utilisation de l'Intelligence Artificielle
## Commune de [Nom de la Commune] • Cadre Réglementaire et Déontologique des Agents Publics

---

## Préambule
La transition numérique de notre collectivité territoriale intègre désormais l'usage d'outils d'Intelligence Artificielle Générative (comme les Large Language Models - LLM). Si ces technologies représentent des opportunités d'efficacité et d'aide à la décision, elles posent des défis juridiques et éthiques majeurs concernant la protection des données des citoyens et la souveraineté nationale. 

La présente charte fixe les règles d'utilisation obligatoires pour l'ensemble des agents administratifs et des stagiaires au sein de la collectivité.

---

## Article 1 : Usages Autorisés et Règle d'Or du "Contrôle Humain"
1. **Aide à la productivité** : Les agents sont autorisés à utiliser l'IA pour la rédaction de brouillons, la correction orthographique, la structuration de comptes-rendus non confidentiels, la synthèse de longs articles publics ou l'aide au remue-méninges (brainstorming).
2. **Décision Administrative** : L'IA ne doit en aucun cas prendre de décision unilatérale ou automatique concernant un usager (permis de construire, octroi d'aide sociale, etc.). **La validation humaine (Dernier Mot)** reste le principe fondamental de responsabilité publique. L'agent est l'unique auteur légal et responsable des écrits qu'il signe.

---

## Article 2 : Interdictions de Saisie et Protection des Données (RGPD)
Il est strictement interdit de copier-coller dans une invite de saisie (prompt) d'une IA publique :
*   Toute information permettant d'identifier directement ou indirectement un citoyen ou un agent (noms, prénoms, courriels, numéros de téléphone, numéros de sécurité sociale).
*   Toute information sensible protégée par le secret professionnel ou médical.
*   Des données budgétaires ou des délibérations confidentielles non encore publiées de la commune.

---

## Article 3 : Souveraineté Juridique face au Cloud Act
1. **Rappel Juridique** : Les entreprises américaines éditrices d'IA (OpenAI, Microsoft, Anthropic, Amazon, etc.) sont soumises au **Cloud Act**. Cette loi autorise les autorités judiciaires et de renseignement américaines à réclamer l'accès aux données stockées sur leurs serveurs, y compris ceux situés physiquement en Europe.
2. **Obligation d'Hébergement** : Pour le stockage de bases de données internes ou la création d'applications municipales, la collectivité impose l'utilisation de serveurs localisés en Europe (choix impératif de la région **Europe/Francfort** sur des bases comme Supabase) pour garantir le respect du RGPD.

---

## Article 4 : Recours Obligatoire à un Module Libre d'Anonymisation ou de Pseudonymisation
Pour toutes les situations de travail où l'utilisation d'un LLM soumis au Cloud Act est indispensable pour analyser un dossier :
1. **Filtrage Préalable** : L'agent public a l'obligation légale de passer son texte dans un **module libre d'anonymisation ou de pseudonymisation** s'exécutant localement avant toute soumission à l'IA.
2. **Fonctionnement Local** : Cet outil s'exécute entièrement en local (dans le navigateur ou sur la machine de l'agent). Les données ne doivent être transmises à aucun serveur distant lors du traitement. Les données privées (noms, emails, téléphones) y sont remplacées par des balises génériques (ex: `[NOM_1]`).
3. **Copie Sécurisée** : Seul le texte ainsi anonymisé et expurgé de toute donnée personnelle peut être envoyé au modèle d'IA externe.

---

## Article 5 : Lutte contre les Hallucinations et Vigilance Factuelle
Les grands modèles de langage sont des calculateurs probabilistes et non des encyclopédies de vérité. L'agent doit :
*   Effectuer une vérification systématique de toutes les sources citées par l'IA (textes de loi du CGCT, décrets, jurisprudence).
*   Privilégier la technique d'**Ancrage** en insérant lui-même la documentation officielle de travail comme ressource dans le prompt pour empêcher l'IA d'inventer des faits.

---

Lu et approuvé par l'agent :

**Date :** _____________________
**Nom et Signature :** _____________________


---

# Thématique : 1. L'Histoire de l'IA
- **ID unique :** `histoire-ia`
- **Catégorie :** `hist`
- **Icône visuelle :** ⏳
- **Objectifs d'apprentissage :** Les grandes étapes de l'IA d'Alan Turing à nos jours, avec des comparatifs historiques et des graphiques d'adoption.

### Diapositives et Fiches Théoriques du Module `histoire-ia`

### Diapositive : L'Arbre de l'IA (Symbolique vs Numérique)

- **Type d'affichage :** `comparison-cards`

*Introduction :* L'histoire de l'IA est marquée par l'affrontement de deux visions philosophiques et techniques : l'IA Symbolique (basée sur la logique) et l'IA Numérique (basée sur l'apprentissage par les données).

#### 🤖 L'IA Symbolique (1950 - 1990)
- **Type / Approche :** Approche descendante (Top-Down)
- **Description :** Les ingénieurs codent manuellement toutes les règles logiques de l'intelligence. L'ordinateur applique des arbres de décisions stricts.
- **Formule / Logique :** `SI (Revenu < X) ET (Enfants >= Y) ALORS Aide = OUI`
- **Avantage majeur :** Explicabilité totale : on sait exactement pourquoi la machine prend une décision.
- **Inconvénient / Limite :** Impossible de coder toutes les exceptions du monde réel. S'effondre face à l'ambiguïté.

#### 🧠 L'IA Numérique (1990 - Présent)
- **Type / Approche :** Approche ascendante (Bottom-Up)
- **Description :** On ne donne aucune règle logique à la machine. On lui injecte des millions d'exemples de données, et elle ajuste ses poids statistiques pour apprendre seule.
- **Formule / Logique :** `Entrée [Données] ➔ Réseau de Neurones ➔ Prédiction`
- **Avantage majeur :** Excellente pour reconnaître des motifs complexes (images, voix, textes flous).
- **Inconvénient / Limite :** Effet 'boîte noire' : très difficile de justifier précisément la formule mathématique interne.

---

### Diapositive : La Frise Chronologique des 6 Tournants

- **Type d'affichage :** `timeline`

| Année / Étape | Événement | Description / Impact |
| :--- | :--- | :--- |
| **1950** | Alan Turing & Le Test d'Imitation | Turing publie 'Computing Machinery and Intelligence' et pose la question : 'Les machines peuvent-elles penser ?' Il théorise que l'intelligence réside dans le traitement logique de l'information. |
| **1956** | Le Séminaire de Dartmouth | John McCarthy, Marvin Minsky, Claude Shannon et d'autres se réunissent durant un été. Ils créent officiellement le terme d'Intelligence Artificielle et prédisent avec un optimisme fou que l'IA sera résolue en quelques années. |
| **1974 - 1990** | Les Hivers de l'IA | Face aux échecs répétés des traducteurs automatiques et à l'incapacité des machines à comprendre le sens commun, les gouvernements coupent les budgets de recherche. C'est l'époque de la traversée du désert. |
| **1997** | Deep Blue bat Kasparov | Le supercalculateur d'IBM bat le champion du monde d'échecs. C'est le triomphe de la recherche de force brute statistique et de la puissance de calcul sur l'intuition humaine. |
| **2017** | L'Invention du Transformer | Google publie l'article 'Attention Is All You Need'. Il introduit le mécanisme d'attention permettant d'analyser le contexte global d'une phrase d'un coup, posant les bases des LLM modernes. |
| **2022** | L'Explosion de ChatGPT | OpenAI met en ligne une interface de dialogue gratuite. L'IA générative devient un outil de productivité grand public mondial en moins d'une semaine. |

---

### Diapositive : La Vitesse d'Adoption (Le choc de 2022)

- **Type d'affichage :** `bar-chart`

Ce qui rend la révolution de l'IA générative inédite, ce n'est pas seulement la technologie, c'est la **vitesse phénoménale** à laquelle la société l'a adoptée. Ce graphique compare le nombre de mois requis pour atteindre **100 millions d'utilisateurs actifs** :

| Technologie / Service | Temps pour atteindre 100 millions d'utilisateurs (en mois) |
| :--- | :--- |
| Téléphone fixe | 900 |
| Téléphone portable | 192 |
| Netflix | 120 |
| Facebook | 54 |
| Instagram | 30 |
| ChatGPT | 2 |

*Implication stratégique :* <strong>Implication pour les collectivités :</strong> Jamais une transition technologique n'a été si rapide. Les agents publics et les usagers se sont emparés de ces outils de façon autonome, obligeant les administrations à adapter leurs politiques de sécurité et d'efficacité à toute vitesse.

---

### Diapositive : Le Paradoxe de Moravec

- **Type d'affichage :** `moravec-paradox`

Formulé par Hans Moravec dans les années 1980, ce paradoxe décrit une réalité contre-intuitive de l'IA : ce qui est le plus difficile pour un humain est facile pour la machine, et inversement.

#### 🤖 Facile pour la machine / Difficile pour l'humain
*Les tâches logiques, mathématiques et algorithmiques formelles qui demandent des années d'études à un humain.*
- 🤖 Calculs mathématiques hyper-complexes en millisecondes
- 🤖 Programmation informatique et génération de code
- 🤖 Traduction instantanée de contrats ou rapports financiers de 100 pages
- 🤖 Mémorisation et recherche dans des millions de documents textuels

#### 👩‍💼 Facile pour l'humain / Difficile pour la machine
*Les tâches d'interaction physique, de perception et de relations sociales innées chez l'humain dès le plus jeune âge.*
- 👩‍💼 Saisir un objet fragile dans un environnement désordonné
- 👩‍💼 Marcher de manière fluide dans une rue bondée ou un hall d'accueil
- 👩‍💼 Faire preuve de bon sens et s'adapter à une situation imprévue
- 👩‍💼 Ressentir de l'empathie face à un citoyen ou un usager en détresse

*Intérêt pédagogique et débrief :* <strong>Intérêt pédagogique :</strong> Très rassurant pour les agents territoriaux ! L'IA ne remplacera pas leur rôle d'accueil physique, de gestion des cas sociaux complexes et de décision humaine.<br>➔ <strong>L'IA gère la paperasse, l'humain gère la relation.</strong>

---

### Questions de Vote Interactif & Quiz du Module `histoire-ia`

#### Question n°q1 (Quiz à réponse unique)
**Énoncé :** En quelle année Alan Turing a-t-il proposé son fameux Test d'Imitation pour tester l'intelligence d'une machine ?

**Options proposées aux stagiaires :**
- **Option [A] :** 1950 (Publication de 'Computing Machinery and Intelligence')
- **Option [B] :** 1956 (Séminaire de Dartmouth)
- **Option [C] :** 1974 (Début du premier hiver de l'IA)
- **Option [D] :** 1997 (Deep Blue bat Kasparov aux échecs)

- **Réponse correcte :** **[A]**
- **Explication pédagogique :** Alan Turing a publié son article fondateur en 1950, posant la question philosophique et logique du test d'imitation.

---

# Thématique : 2. La Technique Simplifiée
- **ID unique :** `technique-llm`
- **Catégorie :** `tech`
- **Icône visuelle :** ⚙️
- **Objectifs d'apprentissage :** Démystifier le fonctionnement interne d'un LLM : de la découpe des mots à la projection géométrique.

### Diapositives et Fiches Théoriques du Module `technique-llm`

### Diapositive : Voyage au cœur du mot (La Tokenisation)

- **Type d'affichage :** `schema-steps`

Une IA ne sait pas lire le texte comme nous. Elle doit d'abord le hacher en petits morceaux numériques. Voici le parcours de la phrase <em>'M. le Maire vote la délibération'</em> :

**Étape 1 : Texte Brut**
- *Description :* L'utilisateur saisit la phrase en français dans le chat.
- *Contenu textuel ou numérique :* `"M. le Maire vote la délibération."`

**Étape 2 : Tokenisation**
- *Description :* Le texte est découpé par l'algorithme. Les mots courants restent entiers, les mots rares ou complexes sont scindés.
- *Contenu textuel ou numérique :* `['M.', ' le', ' Maire', ' vote', ' la', ' dé', 'lib', 'ération', '.']`

**Étape 3 : Numérisation**
- *Description :* Chaque token est remplacé par son identifiant numérique unique dans le dictionnaire de l'IA.
- *Contenu textuel ou numérique :* `[1209, 312, 4521, 1420, 290, 782, 9034, 1145, 13]`

> ⚠️ **Piège pour l'administration :** <strong>⚠️ Piège pour l'administration :</strong> Les sigles (P.L.U., R.G.P.D., D.G.T.) consomment beaucoup plus de tokens car l'IA doit traiter chaque lettre séparément. De plus, les IA sont facturées au nombre de tokens, et le français consomme environ 30% de tokens de plus que l'anglais pour la même idée !

---

### Diapositive : La Carte des Mots (Les Embeddings)

- **Type d'affichage :** `semantic-map`

Une fois numérisés, comment l'IA comprend-elle le sens des mots ? Elle utilise les **Embeddings** : chaque mot devient un vecteur situé dans un espace géométrique géant. Les mots ayant un sens proche sont placés très près les uns des autres.

**Positionnement vectoriel des concepts sémantiques (Axe X : Pouvoir, Axe Y : Contexte Territorial) :**
| Mot / Concept | Coordonnée X (Pouvoir ➔) | Coordonnée Y (Territoire ➔) | Groupe sémantique |
| :--- | :--- | :--- | :--- |
| Maire | 80 | 75 | gov |
| Mairie | 30 | 80 | gov |
| Conseil Municipal | 75 | 85 | gov |
| Délibération | 50 | 70 | gov |
| Secrétaire | 20 | 55 | gov |
| Tondeuse | 15 | 15 | tools |
| Pelle | 10 | 20 | tools |
| Banane | 90 | 10 | food |

*Explication mathématique et pédagogique :* <strong>L'Algèbre du sens :</strong> L'espace vectoriel permet à l'IA d'effectuer des calculs mathématiques sur le sens des mots (ex: <code>Maire - Homme + Femme = Mairesse</code>).<br><br><strong>🍌 Pourquoi 'Banane' est-il en bas à droite ?</strong><br>Le mot 'Banane' est un fruit. N'ayant aucun rapport logique avec la gestion municipale ('Mairie') ou les outils techniques des espaces verts ('Pelle'), le réseau de neurones l'exclut géométriquement et le repousse à l'extrême périphérie de sa carte sémantique.

---

### Diapositive : Bac à sable : Expérimenter la tokenisation

- **Type d'affichage :** `token-sandbox`

La tokenisation influence directement la vitesse, le coût et l'empreinte écologique des modèles d'IA. Tapez votre propre texte ci-dessous pour voir comment l'IA le découpe et comparer les architectures de Google et OpenAI.

*Explication comparative (OpenAI vs Google Gemini) :* <strong>💡 Comparatif Technique :</strong><br>• <strong>Modèle ChatGPT (OpenAI)</strong> : Utilise un dictionnaire de tokens moins optimisé pour le français (1 mot ≈ 1.35 tokens). Exécute ses calculs sur des GPU standard (Nvidia) très énergivores.<br>• <strong>Modèle Gemini (Google)</strong> : Utilise un tokenizer multilingue très optimisé (1 mot ≈ 1.1 tokens). Exécute ses calculs sur des processeurs TPU (Google) conçus pour l'IA, quatre fois plus sobres en électricité.<br>➔ <strong>Résultat :</strong> Pour les administrations publiques, utiliser un modèle européen ou optimisé comme Gemini permet de réduire les factures d'API et la pollution numérique.

---

### Questions de Vote Interactif & Quiz du Module `technique-llm`

#### Question n°q2 (Quiz à réponse unique)
**Énoncé :** Comment l'IA comprend-elle le sens des mots et leurs relations ?

**Options proposées aux stagiaires :**
- **Option [A] :** Elle applique des dictionnaires de synonymes codés par des linguistes.
- **Option [B] :** Elle projette les mots sous forme de vecteurs géométriques (Embeddings) où les termes de sens proche sont géographiquement regroupés.
- **Option [C] :** Elle effectue une recherche en temps réel sur Wikipédia pour chaque mot.
- **Option [D] :** Elle ne s'intéresse qu'à l'ordre alphabétique des lettres.

- **Réponse correcte :** **[B]**
- **Explication pédagogique :** Les embeddings sémantiques permettent à l'IA d'effectuer des calculs mathématiques de proximité sur les mots (ex: Maire - Homme + Femme = Mairesse).

---

# Thématique : 3. Prompt vs Homme
- **ID unique :** `prompt-homme`
- **Catégorie :** `prompt`
- **Icône visuelle :** 🧠
- **Objectifs d'apprentissage :** L'analogie narrative complète pour comprendre l'absence de sens inné chez l'IA et l'exigence de contexte.

### Diapositives et Fiches Théoriques du Module `prompt-homme`

### Diapositive : Le Parallèle des Contextes

- **Type d'affichage :** `analogy`

#### Parallèle des Contextes : Humain vs Machine

| Variables contextuelles | Contexte Humain | Contexte de l'IA (Le Prompt) |
| :--- | :--- | :--- |
| **Structure de base (innée)** | **Situation Familiale de Naissance** : La situation familiale dans laquelle on naît, nos parents, notre éducation, notre histoire personnelle et les barrières morales que la société nous a inculquées en grandissant. | **Consignes Système (System Prompt)** : Les garde-fous programmés par les créateurs de l'IA (règles de sécurité, interdiction de donner des recettes de bombes, style poli, neutralité politique). |
| **Situation immédiate** | **Ce qui se passe maintenant** : La situation immédiate qui se produit autour de nous à cet instant précis, perçue par nos yeux, nos oreilles et notre corps (le vent, le froid, une personne qui s'énerve). | **Contexte Utilisateur (Le Prompt)** : Toutes les descriptions, consignes et informations de travail que l'utilisateur tape explicitement dans le champ textuel de l'IA pour lui décrire sa situation. |

*Conclusion sur l'absence de sens inné :* L'Homme réagit beaucoup plus vite à la situation immédiate car il n'a pas besoin qu'on lui décrive la pièce, le bruit ou l'urgence : ses capteurs biologiques s'en chargent. En revanche, l'IA est enfermée dans un serveur aveugle. Sans une description méticuleuse et rédigée de votre part (le contexte utilisateur), l'IA ne sait rien de votre urgence ni de vos contraintes.

---

### Diapositive : Mise en Situation : L'Alarme Incendie

- **Type d'affichage :** `comparison-cards`

*Introduction :* Pour comprendre l'importance d'un prompt complet, imaginons qu'une alarme incendie se déclenche dans le hall d'accueil de la mairie.

#### 👩‍💼 Réaction de l'Agent d'Accueil (Homme)
- **Type / Approche :** Instantanée mais stressée
- **Description :** L'agent n'a pas besoin qu'on lui explique la situation. Il entend la sirène, il sent l'odeur de fumée. Il réagit en 2 secondes en ordonnant l'évacuation.
- **Formule / Logique :** `Sens Biologiques ➔ Action de Sécurité`
- **Avantage majeur :** Réaction réflexe immédiate sans aucune perte de temps d'analyse écrite.
- **Inconvénient / Limite :** Sous le coup du stress, l'agent peut oublier de vérifier si la réserve est fermée ou paniquer face aux usagers.

#### 🤖 Réaction de l'IA (Sans contexte complet)
- **Type / Approche :** Précise mais aveugle
- **Description :** Si vous tapez juste : <em>'L'alarme sonne, je fais quoi ?'</em>, l'IA va vous répondre par des généralités inutiles (ex: appeler les pompiers). Elle ne sait pas où vous êtes, ni de quelle alarme il s'agit.
- **Formule / Logique :** `Prompt Vague ➔ Conseils Génériques et Flous`
- **Avantage majeur :** L'IA conserve son sang-froid mathématique absolu.
- **Inconvénient / Limite :** Incapable d'agir utilement sans que vous lui précisiez le protocole interne de la mairie et la nature de l'incident.

---

### Diapositive : Le Pont Sensoriel du Prompt

- **Type d'affichage :** `bridge-schema`

Rédiger un bon prompt consiste à construire un **pont sensoriel** pour l'IA. Puisqu'elle n'a pas d'yeux ni d'oreilles, votre texte doit simuler son environnement pour qu'elle puisse réagir avec pertinence.

**Les composants du pont sensoriel du prompt :**
- **🧠 Vos Capteurs :** Vous observez la situation réelle (ex: un usager en colère refuse de payer son amende de stationnement).
- **🌉 Le Pont du Prompt :** Vous transmettez cette scène par écrit à l'IA : description de l'usager, règlement municipal, profil de votre commune.
- **💾 Le Cerveau de l'IA :** L'IA applique ses capacités logiques sur ce contexte précis pour vous générer une réponse de désescalade sur-mesure.

---

### Questions de Vote Interactif & Quiz du Module `prompt-homme`

#### Question n°q3 (Quiz à réponse unique)
**Énoncé :** Dans le parallèle des contextes, par quoi remplace-t-on le contexte sensoriel (les yeux, les oreilles, l'urgence de la pièce) chez l'IA ?

**Options proposées aux stagiaires :**
- **Option [A] :** Par de la puissance de calcul brute sur des puces graphiques (GPU).
- **Option [B] :** Par la description textuelle méticuleuse de la situation dans le prompt utilisateur.
- **Option [C] :** Par l'installation d'une webcam connectée aux serveurs d'IA.
- **Option [D] :** Par les consignes système pré-configurées (System Prompt).

- **Réponse correcte :** **[B]**
- **Explication pédagogique :** L'IA est enfermée dans un serveur aveugle. Le prompt utilisateur est son unique pont sensoriel avec la réalité de votre problème.

---

# Thématique : 4. La Méthode M.A.I.R.E.
- **ID unique :** `methode-maire`
- **Catégorie :** `prompt`
- **Icône visuelle :** 📋
- **Objectifs d'apprentissage :** La méthodologie de structuration des invites professionnelles pour le secteur public.

### Diapositives et Fiches Théoriques du Module `methode-maire`

### Diapositive : Le Tableau de Bord M.A.I.R.E.

- **Type d'affichage :** `maire`

#### Le Tableau de Bord Méthodologique M.A.I.R.E.

- **[M] Moi :** Qui êtes-vous ? (Ex: Chef de projet transition écologique dans une métropole de 150 000 habitants).
- **[A] Agent :** Quel rôle donnez-vous à l'IA ? (Ex: Agis en tant qu'expert en aménagement urbain durable).
- **[I] Information :** Quelle est la tâche ou le problème ? (Ex: Je dois rédiger le cahier des charges pour l'installation d'îlots de fraîcheur).
- **[R] Ressources :** Quelles données fournissez-vous ? (Ex: Voici le plan du parvis et la liste des essences d'arbres autorisées par notre charte).
- **[E] Exigence :** Quel est le livrable attendu ? (Ex: Rédige une liste structurée en 5 points clés sous format tableau Markdown, ton technique).

*Exemple de prompt structuré M.A.I.R.E. :* La méthode M.A.I.R.E. permet d'éviter l'effet 'page blanche' et garantit que l'IA dispose de tous les éléments nécessaires dès son premier calcul.

---

### Diapositive : Exemple Réel Décortiqué

- **Type d'affichage :** `color-coded-prompt`

#### Prompt pour la rédaction d'un discours municipal

Analyse colorée et découpée d'un prompt municipal de discours :

- **[M] - Moi :** *Je suis le directeur de cabinet du maire d'une petite commune rurale de 1200 habitants.*
- **[A] - Agent :** *Tu es une plume politique expérimentée, spécialisée dans les discours républicains de proximité.*
- **[I] - Information :** *Le Maire doit prononcer un discours d'inauguration pour la réouverture de la bibliothèque municipale après travaux.*
- **[R] - Ressources :** *Appuie-toi sur ces éléments : travaux financés à 40% par l'État et 30% par la Région, création d'un espace numérique pour les jeunes, bibliothèque nommée 'Espace George Sand'.*
- **[E] - Exigence :** *Rédige un discours de 400 mots. Structure avec : salutations officielles, remerciements aux partenaires financiers, focus sur George Sand et conclusion républicaine. Évite les phrases trop longues.*

---

### Diapositive : Gabarit Prêt à Remplir (Copier-Coller)

- **Type d'affichage :** `gabarit`

Voici un modèle universel que vous pouvez copier et conserver. Remplissez simplement les crochets avant de soumettre votre demande à l'IA.

**Gabarit universel prêt à remplir (à copier) :**
```text
[MOI] : Je suis [votre poste/rôle] au sein de la collectivité [nom/type de collectivité].

[AGENT] : Agis en tant que [expert/rôle attribué à l'IA] spécialisé en [domaine précis].

[INFORMATION] : Ta tâche consiste à [décrire précisément le travail, le document à rédiger ou le problème à analyser].

[RESSOURCES] : Pour ce faire, base-toi uniquement sur les données suivantes : [coller vos textes, chiffres, extraits de règlements ou lois]. Ne fais pas de suppositions en dehors de ces informations.

[EXIGENCE] : Le livrable doit être rédigé sous forme de [format attendu : mail, tableau, note de synthèse]. Le ton doit être [professionnel, technique, neutre] et la longueur maximale de [nombre de mots/paragraphes].
```

*Conseils pratiques d'utilisation :* <strong>💡 Conseil de pro :</strong> Si vos ressources sont très longues (ex: un rapport PDF de 50 pages), n'hésitez pas à utiliser des outils dotés d'une grande fenêtre de contexte (comme Claude ou Gemini) pour y glisser le fichier entier.

---

### Questions de Vote Interactif & Quiz du Module `methode-maire`

#### Question n°q4 (Quiz à réponse unique)
**Énoncé :** Dans la méthode M.A.I.R.E. de rédaction d'invites, à quoi correspond la lettre R ?

**Options proposées aux stagiaires :**
- **Option [A] :** Le Rôle assigné à l'IA (le persona expert).
- **Option [B] :** Les Règles de sécurité et de conformité RGPD.
- **Option [C] :** Les Ressources fournies comme ancrage de données (textes, règlements, chiffres bruts).
- **Option [D] :** Le Résultat attendu (format du livrable, ton, longueur).

- **Réponse correcte :** **[C]**
- **Explication pédagogique :** Les Ressources sont les données d'ancrage que vous fournissez pour empêcher l'IA d'halluciner et lui donner la matière brute à travailler.

---

# Thématique : 5. Sécurité & Réglementation
- **ID unique :** `securite-reglementation`
- **Catégorie :** `reg`
- **Icône visuelle :** 🛡️
- **Objectifs d'apprentissage :** La protection des données dans le secteur public : concilier RGPD, souveraineté et conformité de l'AI Act.

### Diapositives et Fiches Théoriques du Module `securite-reglementation`

### Diapositive : Le Conflit Juridique : RGPD vs Cloud Act

- **Type d'affichage :** `conflict-table`

Les données de notre administration sont soumises à deux législations de souveraineté opposées. Comprendre ce conflit est essentiel avant d'utiliser une IA hébergée aux États-Unis.

**Tableau de Conflit Juridique Souverain :**

| Critère | 🇪🇺 RGPD (Europe) | 🇺🇸 Cloud Act (États-Unis) |
| :--- | :--- | :--- |
| Philosophie | Protéger la vie privée et la souveraineté des données des citoyens. | Autoriser l'accès aux données pour la sécurité nationale américaine. |
| Portée | S'applique à toute entité traitant les données de résidents européens. | S'applique à toutes les données stockées par des entreprises US, même à l'étranger. |
| Données Sensibles | Interdiction stricte de traitement sans accord de l'usager ou anonymisation préalable. | Les agences de renseignement US peuvent réclamer l'accès aux serveurs de secours (ex: OpenAI/Azure). |
| Solution | Privilégier des modèles hébergés sur le sol européen ou en local. | Limiter drastiquement la saisie d'informations internes ou confidentielles. |

---

### Diapositive : Les 5 Principes Clés du RGPD (Métier)

- **Type d'affichage :** `rgpd-principles`

Pour un agent territorial, manipuler des données d'identité (noms, prénoms) exige de respecter 5 obligations fondamentales. Ce cadre juridique strict explique <strong>pourquoi il est interdit de copier ces informations dans un LLM externe</strong> (ex. ChatGPT) ou d'y charger un PV de conseil municipal non anonymisé.

#### 1. Le principe de finalité (Le 'Pourquoi')
Vous ne devez pas utiliser ces noms et prénoms pour n'importe quoi. Ils doivent être collectés et manipulés pour un objectif précis, légitime et nécessaire à l'exercice de votre mission (par exemple : gérer un dossier d'usager, établir un acte d'état civil, envoyer une convocation).
- **Interdiction stricte :** Interdiction absolue : Vous ne devez jamais utiliser ces données à des fins personnelles, politiques, ou pour une mission qui n'est pas la vôtre.

#### 2. Le secret professionnel & la confidentialité
En tant qu'agent public, vous êtes soumis à une obligation de discrétion professionnelle. Dans le cadre du RGPD, cela se traduit par :
- <strong>Le besoin d'en connaître</strong> : Vous ne devez partager ces identités qu'avec les collègues ou services qui en ont strictement besoin pour travailler.
- <strong>Le verrouillage des accès</strong> : Ne laissez jamais votre session informatique ouverte sans surveillance et ne partagez pas vos identifiants.

#### 3. La sécurité des données (Bon sens)
La manipulation de listes de noms et prénoms (souvent sur Excel ou dans des logiciels métiers) exige une hygiène informatique stricte :
- <strong>Pas de stockage sauvage</strong> : Ne copiez pas ces fichiers sur une clé USB personnelle ou sur le bureau d'un ordinateur non sécurisé.
- <strong>Attention aux envois de mails</strong> : Si vous devez envoyer un mail à un groupe d'usagers, utilisez obligatoirement la copie cachée (<strong>Cci</strong>) pour éviter que chaque usager ne voie le nom et le prénom des autres.

#### 4. La durée de conservation limitée
Les prénoms et noms ne peuvent pas être conservés indéfiniment dans vos outils de travail quotidiens. Une fois que le dossier de l'usager est traité et que les délais légaux sont expirés, ces données doivent être :
- Soit supprimées.
- Soit archivées selon les règles propres aux Archives publiques (tri, versement ou élimination réglementée).

#### 5. Le respect des droits des usagers
Les citoyens ont des droits sur leurs données (droit d'accès, de rectification, d'opposition dans certains cas). Si un usager vous contacte pour modifier son nom mal orthographié ou pour savoir quelles données votre service détient sur lui, votre administration a l'obligation de lui répondre dans un <strong>délai d'un mois</strong>.

💡 **Réflexe DPO :** **💡 Votre meilleur réflexe : le DPO** - Chaque administration, collectivité ou ministère a l'obligation de nommer un <strong>DPO (Data Protection Officer)</strong> ou Délégué à la Protection des Données. Si vous avez un doute sur un transfert de fichier, un formulaire de collecte ou une demande d'un usager, c'est cette personne qu'il faut contacter. Elle est là pour vous guider et sécuriser vos pratiques.

---

### Diapositive : L'AI Act : La Pyramide des Risques

- **Type d'affichage :** `risk-pyramid`

Adopté en 2024, le règlement européen sur l'IA (AI Act) classe les applications selon leur niveau de danger pour les citoyens. Voici la pyramide appliquée aux collectivités :

**Pyramide de Classification des Risques de l'AI Act européen (2024) :**
| Niveau de Risque / Classification | Exemples concrets en Collectivité Territoriale |
| :--- | :--- |
| **Inacceptable (Interdit)** | Notation sociale à la chinoise, vidéosurveillance biométrique en temps réel dans l'espace public (hors dérogations graves). |
| **Haut Risque (Très Régulé)** | Algorithmes de tri des CV pour le recrutement des agents, systèmes de décision d'attribution d'aides sociales ou de places en crèche. |
| **Risque Limité (Transparence)** | Chatbots d'accueil des usagers sur le site internet de la mairie (obligation de mentionner clairement 'Contenu généré par IA'). |
| **Risque Minimal (Libre)** | Filtres anti-spam de la messagerie des agents municipaux, outils de correction d'orthographe. |

---

### Diapositive : Le Biais d'Automatisation & Responsabilité

- **Type d'affichage :** `automation-bias`

Le biais d'automatisation est un piège psychologique majeur dans lequel les agents publics risquent de tomber en utilisant des outils d'IA.

- **🤖 Le Biais d'Automatisation :** La tendance humaine à faire une confiance excessive et aveugle aux suggestions fournies par des systèmes automatisés (comme les textes générés par une IA), même lorsqu'elles sont grossièrement erronées ou inappropriées. Face à un écrit propre et fluide, notre esprit critique baisse sa garde.
- **✍️ La Responsabilité de Signature :** Si un agent envoie un courrier officiel erroné, diffamatoire ou illégal rédigé par une IA, **c'est la responsabilité de la collectivité et de l'agent** qui est légalement engagée, pas celle de l'éditeur d'IA (ex: OpenAI, Google) qui décline toute responsabilité contractuelle.

*Intérêt pédagogique et mise en garde :* <strong>Intérêt pédagogique :</strong> Sensibiliser à la relecture critique. Un courrier officiel engage la signature publique de l'administration. <strong>La validation humaine (Dernier Mot) est obligatoire et non négociable.</strong>

---

### Diapositive : Souveraineté vs Cloud : Alternatives & Coûts

- **Type d'affichage :** `collectivite-couts`

*(Format de diapositive spécifique non-détaillé : collectivite-couts)*

Pour déployer l'IA, une collectivité fait face à un arbitrage stratégique : investir dans sa propre infrastructure locale sécurisée, ou s'abonner aux services cloud des géants de la Tech.

---

### Diapositive : Charte Municipale & Outil d'Anonymisation Libre

- **Type d'affichage :** `anonymizer-tool`

<strong>Charte Municipale d'usage de l'IA (Art. 4) :</strong> Les agents publics sont autorisés à utiliser des LLM externes soumis au Cloud Act uniquement si les données d'usagers ont été préalablement anonymisées. <br>Utilisez un outil libre d'anonymisation ou de pseudonymisation s'exécutant en local (comme le module ci-dessous) pour nettoyer vos textes avant de les envoyer.

*Garantie de sécurité locale :* <strong>🔒 Garantie de confidentialité locale :</strong> Aucune donnée collée ci-dessus ne quitte votre ordinateur. L'anonymiseur s'exécute entièrement en JavaScript local dans votre navigateur. Les noms, courriels et téléphones y sont remplacés par des balises anonymes.

---

### Diapositive : Charte d'Utilisation de l'IA (Prête à l'emploi)

- **Type d'affichage :** `charte-text`

*Préambule officiel :* La transition numérique de notre collectivité territoriale intègre désormais l'usage d'outils d'Intelligence Artificielle Générative (comme les Large Language Models - LLM). Si ces technologies représentent des opportunités d'efficacité et d'aide à la décision, elles posent des défis juridiques et éthiques majeurs concernant la protection des données des citoyens et la souveraineté nationale.<br><br>La présente charte fixe les règles d'utilisation obligatoires pour l'ensemble des agents administratifs et des stagiaires au sein de la collectivité.

#### Article 1 : Usages Autorisés et Règle d'Or du "Contrôle Humain"
- <strong>Aide à la productivité</strong> : Les agents sont autorisés à utiliser l'IA pour la rédaction de brouillons, la correction orthographique, la structuration de comptes-rendus non confidentiels, la synthèse de longs articles publics ou l'aide au remue-méninges (brainstorming).
- <strong>Décision Administrative</strong> : L'IA ne doit en aucun cas prendre de décision unilatérale ou automatique concernant un usager (permis de construire, octroi d'aide sociale, etc.). <strong>La validation humaine (Dernier Mot)</strong> reste le principe fondamental de responsabilité publique. L'agent est l'unique auteur légal et responsable des écrits qu'il signe.

#### Article 2 : Interdictions de Saisie et Protection des Données (RGPD)
*Il est strictement interdit de copier-coller dans une invite de saisie (prompt) d'une IA publique :*
- Toute information permettant d'identifier directement ou indirectement un citoyen ou un agent (noms, prénoms, courriels, numéros de téléphone, numéros de sécurité sociale).
- Toute information sensible protégée par le secret professionnel ou médical.
- Des données budgétaires ou des délibérations confidentielles non encore publiées de la commune.

#### Article 3 : Souveraineté Juridique face au Cloud Act
- <strong>Rappel Juridique</strong> : Les entreprises américaines éditrices d'IA (OpenAI, Microsoft, Anthropic, Amazon, etc.) sont soumises au <strong>Cloud Act</strong>. Cette loi autorise les autorités judiciaires et de renseignement américaines à réclamer l'accès aux données stockées sur leurs serveurs, y compris ceux situés physiquement en Europe.
- <strong>Obligation d'Hébergement</strong> : Pour le stockage de bases de données internes ou la création d'applications municipales, la collectivité impose l'utilisation de serveurs localisés en Europe (choix impératif de la région <strong>Europe/Francfort</strong> sur des bases comme Supabase) pour garantir le respect du RGPD.

#### Article 4 : Recours Obligatoire à un Module Libre d'Anonymisation ou de Pseudonymisation
*Pour toutes les situations de travail où l'utilisation d'un LLM soumis au Cloud Act est indispensable pour analyser un dossier :*
- <strong>Filtrage Préalable</strong> : L'agent public a l'obligation légale de passer son texte dans un <strong>module libre d'anonymisation ou de pseudonymisation</strong> s'exécutant localement avant toute soumission à l'IA.
- <strong>Fonctionnement Local</strong> : Cet outil s'exécute entièrement dans le navigateur de l'agent. Les données ne sont transmises à aucun serveur distant lors du nettoyage. Les données privées (noms, emails, téléphones) y sont remplacées par des balises génériques (ex: <code>[NOM_1]</code>).
- <strong>Copie Sécurisée</strong> : Seul le texte ainsi anonymisé et expurgé de toute donnée personnelle peut être envoyé au modèle d'IA externe.

#### Article 5 : Lutte contre les Hallucinations et Vigilance Factuelle
- Les grands modèles de langage sont des calculateurs probabilistes et non des encyclopédies de vérité. L'agent doit effectuer une vérification systématique de toutes les sources citées par l'IA (textes de loi du CGCT, décrets, jurisprudence).
- Privilégier la technique d'<strong>Ancrage</strong> en insérant lui-même la documentation officielle de travail comme ressource dans le prompt pour empêcher l'IA d'inventer des faits.

---

### Questions de Vote Interactif & Quiz du Module `securite-reglementation`

#### Question n°q5 (Quiz à réponse unique)
**Énoncé :** Quel règlement européen adopté en 2024 classe les applications d'IA selon leur niveau de risque (Inacceptable, Haut, Limité, Minimal) ?

**Options proposées aux stagiaires :**
- **Option [A] :** Le Cloud Act américain
- **Option [B] :** Le RGPD (Règlement Général sur la Protection des Données)
- **Option [C] :** L'AI Act (Règlement sur l'Intelligence Artificielle)
- **Option [D] :** La Charte nationale de déontologie des agents territoriaux

- **Réponse correcte :** **[C]**
- **Explication pédagogique :** L'AI Act européen régule spécifiquement les déploiements d'IA en fonction de leurs risques démocratiques et discriminatoires.

---

# Thématique : 6. Les Hallucinations
- **ID unique :** `hallucinations-ia`
- **Catégorie :** `reg`
- **Icône visuelle :** 🌀
- **Objectifs d'apprentissage :** Analyser scientifiquement pourquoi l'IA invente des faits et apprendre les techniques d'ancrage.

### Diapositives et Fiches Théoriques du Module `hallucinations-ia`

### Diapositive : Pourquoi l'IA ment-elle avec aplomb ?

- **Type d'affichage :** `comparison-cards`

*Introduction :* Une hallucination n'est pas un bug technique temporaire. C'est une conséquence directe de la nature mathématique des LLMs, conçus pour générer du texte fluide, pas pour vérifier la réalité historique.

#### 🔍 Comment travaille un Moteur de Recherche
- **Type / Approche :** Indexation de Base de Données
- **Description :** Il parcourt internet pour trouver des pages réelles correspondant à vos mots clés. Il renvoie vers des liens existants.
- **Formule / Logique :** `Requête ➔ Recherche dans l'index ➔ Liens véridiques`
- **Avantage majeur :** Pas d'invention. Les sources sont réelles et vérifiables directement.
- **Inconvénient / Limite :** Incapable de rédiger une synthèse sur-mesure ou d'adapter le ton.

#### 🔮 Comment travaille un LLM (ChatGPT/Claude)
- **Type / Approche :** Réseau Génératif Probabiliste
- **Description :** Il n'interroge pas de base de données. Il écrit mot après mot en évaluant ce qui paraît statistiquement correct et fluide selon ses milliards de paramètres.
- **Formule / Logique :** `Prompt ➔ Calcul de probabilités ➔ Texte généré`
- **Avantage majeur :** Capacité d'analyse, de synthèse et d'adaptation du ton infinie.
- **Inconvénient / Limite :** Si l'information est rare ou absente de sa mémoire de calcul, il comblera le vide en inventant des détails plausibles.

---

### Diapositive : Le Curseur de Température

- **Type d'affichage :** `hallucination`

La température est le paramètre qui contrôle l'audace statistique du modèle. Plus elle est élevée, plus l'IA prend des risques d'association de mots originaux, augmentant le risque d'hallucinations.

*   **Curseur de température de génération (paramètre d'audace statistique) :** par défaut réglé à `20`.
*   **Recommandations pour les administrations publiques :**
    - <strong>Température 0.1 à 0.3 (Factuel) :</strong> Recommandé pour l'administration. L'IA reste ultra-prudente et choisit toujours les termes les plus standardisés. Idéal pour résumer un décret ou analyser des chiffres.
    - <strong>Température 0.7 à 1.0 (Créatif) :</strong> Recommandé pour le brainstorming ou la rédaction de slogans de communication touristique. Le modèle s'autorise des détours sémantiques poétiques mais peut inventer des faits.

---

### Diapositive : L'Arme Absolue : L'Ancrage (R.A.G.)

- **Type d'affichage :** `bridge-schema`

Pour éradiquer les hallucinations dans votre travail administratif, utilisez la technique de l'**Ancrage** (RAG - Retrieval Augmented Generation). Cela consiste à interdire à l'IA d'utiliser sa mémoire générale.

**Les composants du pont sensoriel du prompt :**
- **📥 1. L'Entrée brute :** Vous posez votre question juridique ou technique (ex. 'Puis-je accorder un congé spécial à cet agent ?').
- **🔒 2. L'Ancrage (Ressource) :** Vous copiez-collez l'intégralité du règlement intérieur de votre mairie ou le texte de loi du CGCT.
- **🛡️ 3. La Consigne de Verrouillage :** Vous terminez le prompt par : 'Réponds exclusivement en t'appuyant sur le règlement ci-dessus. Si la réponse n'y figure pas, réponds : Je ne sais pas'.

---

### Questions de Vote Interactif & Quiz du Module `hallucinations-ia`

#### Question n°q6 (Quiz à réponse unique)
**Énoncé :** Pourquoi les IA génératives (LLM) souffrent-elles 'd'hallucinations sémantiques' (invention de faits) ?

**Options proposées aux stagiaires :**
- **Option [A] :** C'est une surchauffe passagère de leurs puces Nvidia.
- **Option [B] :** Ce sont des modèles statistiques probabilistes entraînés à prédire le mot suivant le plus fluide, pas à vérifier des faits réels.
- **Option [C] :** Elles ont été programmées délibérément pour mentir aux usagers.
- **Option [D] :** Elles manquent de mémoire vive (RAM) au moment du calcul.

- **Réponse correcte :** **[B]**
- **Explication pédagogique :** L'IA cherche la fluidité de parole et la probabilité d'association des mots. Si l'information est rare, elle comble le vide de façon plausible.

---

# Thématique : 7. La Guerre des IA & Matériel
- **ID unique :** `guerre-ia`
- **Catégorie :** `tech`
- **Icône visuelle :** ⚔️
- **Objectifs d'apprentissage :** Les coulisses géopolitiques : la cartographie des acteurs, la physique des puces et les datacenters de demain.

### Diapositives et Fiches Théoriques du Module `guerre-ia`

### Diapositive : La Carte des Alliances Mondiales

- **Type d'affichage :** `alliance-map`

Le marché de l'IA est une guerre de capitaux et d'infrastructures contrôlée par quelques géants de la technologie :

**Alliances stratégiques et géopolitiques mondiales :**
- **OpenAI + Microsoft** (Gamme de modèles : `GPT`) ➔ Positionnement : *Domination du marché bureautique et intégration dans Windows / Office.*
- **Google (Gemini)** (Gamme de modèles : `Gemini`) ➔ Positionnement : *Écosystème natif Android, Workspace et recherche en ligne.*
- **Anthropic + Amazon** (Gamme de modèles : `Claude`) ➔ Positionnement : *Modèles sécurisés et hautement qualitatifs pour les entreprises via AWS.*
- **Mistral AI (France)** (Gamme de modèles : `Mistral / Codestral`) ➔ Positionnement : *Alternative de souveraineté européenne avec des modèles efficaces et hébergeables localement.*

---

### Diapositive : La Physique de l'IA (Puces & Électricité)

- **Type d'affichage :** `hardware-comparison`

L'IA n'est pas immatérielle. Elle repose sur des fonderies de puces silicium ultra-précises (TSMC à Taïwan produit 90% des puces avancées) et des parcs de calcul surchargés.

**Comparatif de l'infrastructure physique et matérielle :**

| Type de processeur spécialisé | Rôle et optimisation sémantique | Consommation électrique |
| :--- | :--- | :--- |
| **GPU (Nvidia)** | Processeur graphique de forte consommation pour l'entraînement intensif. | Très énergivore (~700W par carte) |
| **TPU (Google)** | Puces tenso-vectorielles optimisées pour exécuter les calculs de Gemini. | Consommation modérée |
| **LPU (Groq)** | Puces ultra-rapides spécialisées dans l'inférence textuelle en temps réel. | Très économe en énergie |

*Fait et impact écologique :* <strong>Le saviez-vous ?</strong> Une seule requête complexe sur un modèle d'IA générative consomme environ 10 fois plus d'électricité qu'une simple recherche sur Google. C'est un défi écologique majeur pour la neutralité carbone des territoires.

---

### Diapositive : Calcul du Coût GPU : L'Équation VRAM

- **Type d'affichage :** `datacenter-cost`

Pour héberger une IA souveraine en local, la collectivité doit acquérir des cartes graphiques (GPU). Voici l'équation de dimensionnement de la mémoire vidéo (VRAM) et l'évaluation budgétaire associée.

**Équation de dimensionnement VRAM :**
$$\text{VRAM Totale Recommandée (Go)} = \left( \frac{\text{Taille du Modèle (en B)} \times \text{Bits de quantification}}{8} \right) + \left( \text{Nb Salariés actifs simultanés} \times \text{Contexte (en k)} \times 0,5 \right)$$

*Note budgétaire :* L'investissement matériel moyen est estimé à **450 € HT par Go de VRAM** pour des puces de calcul professionnelles.

**Exemples de configurations et coûts :**

1. **Mairie Standard (Modèle compact : Mistral 7B)**
   - Modèle : **Mistral 7B** (7 milliards de paramètres), quantifié en **4 bits**.
   - Usage : **10 agents actifs simultanés**, avec un contexte de **8k tokens**.
   - Calcul : Poids du modèle ($\frac{7 \times 4}{8} = 3,5\text{ Go}$) + KV Cache ($10 \times 8 \times 0,5 = 40\text{ Go}$) = **43,5 Go de VRAM**.
   - Investissement estimé : $43,5\text{ Go} \times 450\text{ €} = \mathbf{19\ 575\text{ € HT}}$ (ex: 1 carte Nvidia RTX A6000 Ada de 48 Go).

2. **DSI Intermédiaire (Modèle équilibré : Mistral NeMo 12B)**
   - Modèle : **Mistral NeMo 12B** (12 milliards de paramètres), quantifié en **8 bits**.
   - Usage : **15 agents actifs simultanés**, avec un contexte de **8k tokens**.
   - Calcul : Poids du modèle ($\frac{12 \times 8}{8} = 12\text{ Go}$) + KV Cache ($15 \times 8 \times 0,5 = 60\text{ Go}$) = **72 Go de VRAM**.
   - Investissement estimé : $72\text{ Go} \times 450\text{ €} = \mathbf{32\ 400\text{ € HT}}$ (ex: 3 cartes Nvidia L40S de 48 Go).

3. **Métropole Expert (Modèle puissant : Llama 3 70B)**
   - Modèle : **Llama 3 70B** (70 milliards de paramètres), quantifié en **4 bits**.
   - Usage : **5 agents actifs simultanés** (DSI/Juristes), avec un contexte de **16k tokens**.
   - Calcul : Poids du modèle ($\frac{70 \times 4}{8} = 35\text{ Go}$) + KV Cache ($5 \times 16 \times 0,5 = 40\text{ Go}$) = **75 Go de VRAM**.
   - Investissement estimé : $75\text{ Go} \times 450\text{ €} = \mathbf{33\ 750\text{ € HT}}$ (ex: 2 cartes Nvidia RTX 6000 Ada).

---

### Diapositive : Datacenters Spatiaux (L'IA en Orbite)

- **Type d'affichage :** `satellite-datacenter`

Face à la saturation énergétique et aux restrictions foncières terrestres, des consortiums spatiaux développent des serveurs d'IA en orbite terrestre basse (LEO).

**Option technologique : Datacenters Spatiaux (IA en orbite LEO)**
**Avantages :**
- <strong>Refroidissement naturel :</strong> Le vide de l'espace profond évite l'utilisation de millions de litres d'eau potable terrestres.
- <strong>Énergie gratuite :</strong> Les panneaux solaires des satellites captent une énergie solaire constante sans atmosphère pour la filtrer.
- <strong>Souveraineté juridique :</strong> Situés dans l'espace international, ils échappent aux réglementations nationales terrestres (comme l'AI Act).
**Inconvénients et contraintes :**
- <strong>Maintenance impossible :</strong> Si un disque dur grille à 500 km d'altitude, on ne peut pas le remplacer manuellement.
- <strong>Tempêtes solaires :</strong> Les radiations cosmiques peuvent corrompre les données ou griller les circuits des puces sensibles.
- <strong>Temps de latence :</strong> Les données doivent monter et descendre par ondes radio ou liaisons laser, ralentissant les réponses immédiates.

---

### Questions de Vote Interactif & Quiz du Module `guerre-ia`

#### Question n°q7 (Sondage d'opinion)
**Énoncé :** À votre avis, quel est le principal frein pour le déploiement d'une IA locale souveraine sur serveur interne dans votre mairie ?

**Options proposées aux stagiaires :**
- **Option [A] :** Le coût élevé d'investissement initial de matériel GPU.
- **Option [B] :** La complexité technique d'administration système en interne.
- **Option [C] :** L'absence d'accès internet qui limite les recherches en direct.
- **Option [D] :** L'obsolescence rapide des modèles locaux face aux géants américains.

- **Type :** Sondage d'opinion collective (aucune bonne réponse de droit)
- **Explication pédagogique :** C'est un sondage d'opinion : chaque réponse correspond à une contrainte réelle d'arbitrage pour les services de la commune.

---

# Thématique : 8. Exercices Métiers
- **ID unique :** `exercices-metiers`
- **Catégorie :** `prompt`
- **Icône visuelle :** 🛠️
- **Objectifs d'apprentissage :** Entraînements concrets avec corrections pour les différents services d'une commune.

### Diapositives et Fiches Théoriques du Module `exercices-metiers`

### Diapositive : Exercices : Services Techniques & Espaces Verts

- **Type d'affichage :** `exercise-list`

**Liste d'exercices intégrée pour la catégorie :** `ST_EV`

##### Exercice : Services Techniques (Niveau : débutant)
*   **Mise en situation :** Vous recevez un mail d'un habitant en colère : <em>'Il y a un énorme trou au milieu de la chaussée devant le 14 avenue Pasteur, ma voiture a failli y laisser un pneu ! Et les branches du saule du voisin dépassent sur le trottoir et obligent les enfants à marcher sur la route. Bougez-vous !'</em>. Créez un prompt pour extraire et catégoriser les incidents.
*   **Solution / Prompt type d'ancrage :**
    ```text
[M] Je suis agent technique municipal.
[A] Agis en tant qu'assistant de gestion des signalements urbains.
[I] Analyse le courriel reçu et extrais les incidents.
[R] Catégorise selon : Adresse de l'incident, Type de problème (Chaussée / Végétation), Niveau d'urgence (Urgent / Normal).
[E] Fournis un tableau structuré avec ces données, sans commentaires.
    ```

##### Exercice : Espaces Verts (Niveau : intermédiaire)
*   **Mise en situation :** Vous devez proposer un plan de végétalisation à faible consommation d'eau pour réaménager le parvis bétonné de la mairie.
*   **Solution / Prompt type d'ancrage :**
    ```text
[M] Je suis responsable des espaces verts d'une mairie du Sud de la France.
[A] Tu es un paysagiste éco-responsable expert en biodiversité locale et sécheresse.
[I] Conçois une palette végétale de 5 plantes adaptées.
[R] Critères requis : besoin d'eau minimal, mellifère, résistant au gel hivernal et à la chaleur estivale.
[E] Présente les plantes sous forme de fiche avec : nom commun, nom latin, période de floraison et hauteur maximale.
    ```

---

### Diapositive : Exercices : Secrétariat & Comptabilité

- **Type d'affichage :** `exercise-list`

**Liste d'exercices intégrée pour la catégorie :** `SEC_COMPTA`

##### Exercice : Secrétariat / DGA (Niveau : débutant)
*   **Mise en situation :** Vous devez synthétiser ces notes rapides prises en réunion de projet : <em>'Début réunion 14h. Présent : Maire, Adjoint Travaux, DGS. Sujet : Rénovation toiture école. Budget estimé : 80 000€. Subvention État espérée : 30%. Travaux prévus en octobre pendant les vacances. Vote prévu prochain conseil municipal.'</em>
*   **Solution / Prompt type d'ancrage :**
    ```text
[M] Je suis collaborateur de cabinet municipal.
[A] Agis comme un secrétaire de séance professionnel.
[I] Rédige une note de synthèse claire à partir de mes notes brutes.
[R] S'appuyer uniquement sur le texte fourni.
[E] Structure la note en 4 sections : Objet de la réunion, Participants, Aspect Financier, Calendrier des opérations. Rédige de manière formelle.
    ```

##### Exercice : Comptabilité (Niveau : intermédiaire)
*   **Mise en situation :** Comparez ces deux devis pour l'achat de matériel informatique de mairie : Offre 1 (10 ordinateurs fixes à 600€ HT l'unité, garantie 1 an, installation offerte). Offre 2 (10 ordinateurs fixes à 550€ HT l'unité, garantie 3 ans, frais d'installation de 800€ HT).
*   **Solution / Prompt type d'ancrage :**
    ```text
[M] Je suis comptable public au sein d'une collectivité.
[A] Agis en tant qu'analyste de gestion financière.
[I] Calcule le coût global TTC (TVA 20%) de chaque offre et compare la valeur de la garantie.
[R] Applique la TVA de 20% sur l'ensemble des montants HT.
[E] Rédige une conclusion de 100 mots indiquant quelle offre est la plus avantageuse financièrement à court terme et à long terme.
    ```

---

### Diapositive : Exercice Expert : Finance & Budget

- **Type d'affichage :** `exercise-list`

**Liste d'exercices intégrée pour la catégorie :** `FINANCE`

##### Exercice : Finance / Budget (Niveau : expert)
*   **Mise en situation :** Analysez l'impact d'une hausse prévisionnelle de 5% du coût des fluides (électricité/gaz) sur le budget d'une commune de 5000 habitants sachant que la facture actuelle est de 250 000€ et que le budget total de fonctionnement de la commune est de 3 500 000€.
*   **Solution / Prompt type d'ancrage :**
    ```text
[M] Je suis directeur des services financiers de la commune.
[A] Agis en tant qu'auditeur budgétaire spécialisé en finances publiques.
[I] Calcule l'impact de la hausse et propose des mesures.
[R] Facture fluides = 250k€. Hausse = 5%. Budget global = 3.5M€.
[E] Calcule : 1) Le surcoût annuel en euros, 2) Le nouveau montant de la facture, 3) Le pourcentage que représente ce surcoût dans le budget global de fonctionnement. Termine en listant 3 mesures réalistes de sobriété énergétique applicables immédiatement en mairie pour compenser cette somme.
    ```

---

### Questions de Vote Interactif & Quiz du Module `exercices-metiers`

#### Question n°q8 (Quiz à réponse unique)
**Énoncé :** Que devez-vous obligatoirement faire avant d'envoyer un signalement d'usager à un LLM hébergé sur le Cloud américain ?

**Options proposées aux stagiaires :**
- **Option [A] :** Demander une autorisation d'écriture écrite à votre chef de service.
- **Option [B] :** Anonymiser ou pseudonymiser en local (noms, emails, téléphones) les données nominatives.
- **Option [C] :** Rédiger le prompt uniquement en anglais pour ne pas irriter le système.
- **Option [D] :** Ne saisir que les signalements survenant après 17 heures.

- **Réponse correcte :** **[B]**
- **Explication pédagogique :** L'article 4 de la Charte Municipale impose le recours à un anonymiseur local pour éviter de violer le RGPD et le Cloud Act.

---

# Thématique : 9. L'Agentique
- **ID unique :** `agentique-territorial`
- **Catégorie :** `agent`
- **Icône visuelle :** 🤖
- **Objectifs d'apprentissage :** Comprendre pourquoi la boucle agentique dépasse largement l'utilisation passive d'un chat d'intelligence artificielle.

### Diapositives et Fiches Théoriques du Module `agentique-territorial`

### Diapositive : La Révolution des Rôles (Chat vs Agent)

- **Type d'affichage :** `agentic-comparison`

Le Chat classique est une interaction linéaire. L'Agentique est une boucle d'autonomie où la machine planifie, agit et évalue son propre travail.

#### Interaction Classique (Chat) (Interaction Linéaire)
- **Humain :** Tape un prompt vague.
- **LLM :** Calcule et répond d'une seule traite sans tester.
- **Humain :** Détecte les erreurs et doit ré-expliquer manuellement pour corriger.

#### Workflow Agentique (Boucle Autonome d'Ingénierie)
- **Humain :** Définit l'objectif global ('Créer un site de signalement public').
- **Agent :** Planifie la liste des tâches nécessaires de manière logique.
- **Agent :** Exécute des outils (lit des fichiers, écrit du code).
- **Agent :** Teste le code, observe les bugs et réécrit pour corriger.
- **Agent :** Livre le résultat final 100% testé et fonctionnel.

---

### Diapositive : Le Cerveau d'un Agent (Plan - Outils - Action)

- **Type d'affichage :** `agentic-loop`

Un agent d'IA s'appuie sur une boucle de raisonnement appelée **ReAct** (Reasoning + Acting). Il n'invente pas au hasard : il analyse son action avant de la lancer.

#### Les 4 phases de la boucle sémantique ReAct :
- **1. Pensée (Thought) :** L'IA analyse son objectif. 'Je dois écrire une fonction Javascript pour envoyer un mail. Pour cela, j'ai besoin d'un outil de communication.'
- **2. Action (Action) :** L'IA utilise un outil externe. Elle écrit le code dans un fichier ou effectue une recherche sur internet.
- **3. Observation (Observation) :** L'IA analyse le retour de l'outil. 'La console renvoie une erreur de syntaxe à la ligne 12 : point-virgule manquant.'
- **4. Correction (Feedback) :** L'IA ajuste son plan de pensée. 'Je vais corriger la ligne 12 en rajoutant le point-virgule et relancer le test.'

---

### Diapositive : Antigravity au Service de la Fonction Publique

- **Type d'affichage :** `antigravity-details`

Antigravity est un agent d'ingénierie logicielle autonome conçu par Google DeepMind. Pour les fonctionnaires territoriaux, il résout une barrière majeure : **la compétence technique**.

#### Spécificités d'Antigravity (DeepMind) pour l'administration :
- <strong>Autonomie complète :</strong> Vous ne lui demandez pas de vous expliquer comment faire ; vous lui demandez de le faire pour vous dans votre dossier de travail.
- <strong>Sécurisation du code :</strong> Antigravity teste le code qu'il produit en boucle sur des consoles locales. Il s'assure que l'application ne contient aucune faille de sécurité.
- <strong>Outil d'inclusion :</strong> Il permet à un agent administratif sans aucune notion de programmation de concevoir des petits logiciels fonctionnels sur-mesure pour son service.

---

### Diapositive : Sécurité & Confinement : Les Risques de l'Agentique

- **Type d'affichage :** `agentic-warning`

*Introduction :* Contrairement à un simple Chat passif, un Agent IA est actif : il dispose d'outils lui permettant de lire, écrire, exécuter des scripts et installer des programmes directement sur le système d'exploitation.

#### 1. Risques et vulnérabilités de l'agentique :
- **💻 Prise de contrôle du PC :** L'agent accède directement au terminal et au disque dur. Il agit avec les mêmes privilèges que l'utilisateur qui l'a lancé, pouvant exécuter des commandes système réelles.
- **🌀 Erreur ou Hallucination fatale :** Une commande mal interprétée ou une hallucination sémantique de l'agent peut entraîner la suppression accidentelle de bases de données, de fichiers système ou de documents de travail.
- **📡 Injection de prompt indirecte :** Si l'agent lit un courriel ou un document externe piégé par un hacker, il peut être manipulé pour exécuter des scripts malveillants, voler des données ou installer un rançongiciel.

#### 2. Réponses et protocoles de cloisonnement sécurisé :
- **🖥️ Recommandation : Cloisonnement en Machine Virtuelle (VM) :** Pour écarter tout risque, il est <strong>impératif de n'exécuter un agent IA autonome que dans un environnement isolé</strong> : une Machine Virtuelle (ex. VirtualBox) ou un conteneur sécurisé (sandbox). En cas de bug ou d'attaque, seul l'environnement virtuel est affecté, le PC hôte reste intact.
- **🔒 Validation Humaine (Human-in-the-Loop) :** Ne jamais utiliser de mode '100% autonome' pour des tâches système. L'agent doit obligatoirement s'arrêter et solliciter votre validation manuelle (comme le système de validation d'Antigravity) avant chaque commande d'écriture ou d'exécution de script.

---

### Questions de Vote Interactif & Quiz du Module `agentique-territorial`

#### Question n°q9 (Quiz à réponse unique)
**Énoncé :** Quelle est la principale différence opérationnelle entre un chatbot d'IA classique et un 'Agent Autonome' ?

**Options proposées aux stagiaires :**
- **Option [A] :** L'agent autonome est capable de formuler ses propres pensées et de déclencher des outils tiers (lecture, écriture, commandes) en boucle fermée.
- **Option [B] :** L'agent autonome est plus poli et utilise moins de mots familiers.
- **Option [C] :** L'agent autonome s'exécute uniquement sur des téléphones.
- **Option [D] :** Le chatbot classique est plus intelligent.

- **Réponse correcte :** **[A]**
- **Explication pédagogique :** L'agent applique une boucle de raisonnement active (ReAct) pour planifier, exécuter et ajuster ses actions en fonction des résultats d'outils tiers.

---

# Thématique : 10. Tuto : Créer une Application
- **ID unique :** `tuto-technique`
- **Catégorie :** `agent`
- **Icône visuelle :** 💻
- **Objectifs d'apprentissage :** Créer et héberger un site de manière gratuite et sécurisée en conformité avec le RGPD.

### Diapositives et Fiches Théoriques du Module `tuto-technique`

### Diapositive : L'Architecture Client-Serveur Souveraine

- **Type d'affichage :** `architecture-diagram`

Pour créer un logiciel fonctionnel et sécurisé sans budget, nous allons associer deux outils complémentaires. Le code de l'interface est public et gratuit, tandis que les données des usagers sont cryptées et confinées en Europe.

- **🖥️ Front-end (GitHub Pages) :** Héberge les fichiers HTML, CSS et JavaScript. C'est l'interface visuelle sur laquelle l'usager clique. L'hébergement est statique et entièrement gratuit.
- **🗄️ Back-end (Supabase) :** Héberge la base de données relationnelle SQL. Elle stocke les signalements, les comptes usagers et applique les règles de sécurité. Les serveurs sont localisés à Francfort (Europe) pour le RGPD.
- **Sécurité de transaction :** <strong>Le Cadenas RLS (Row Level Security) :</strong> La connexion se fait par des appels d'API directs depuis le navigateur du citoyen vers Supabase, sécurisés par des politiques d'accès strictes.

---

### Diapositive : Tuto 1 : Interface Web sur GitHub Pages

- **Type d'affichage :** `tuto-step`

#### Tutoriel Étape n°1 : Mettre son premier site en ligne gratuitement

**Étapes de configuration et actions requises :**
- Créez un compte gratuit sur <strong>GitHub.com</strong>.
- Créez un nouveau dépôt public (Repository) nommé <code>signalement-mairie</code>.
- Créez un fichier nommé obligatoirement <code>index.html</code> et collez-y le code HTML minimal fourni ci-dessous.
- Allez dans l'onglet <strong>Settings</strong> (Paramètres) de votre dépôt ➔ menu <strong>Pages</strong> à gauche.
- Sous 'Build and deployment', sélectionnez la branche <code>main</code> (ou <code>master</code>) et le dossier <code>/root</code>, puis cliquez sur <strong>Save</strong>.
- Attendez 1 minute : votre site est accessible en HTTPS à l'adresse <code>https://votre-pseudo.github.io/signalement-mairie/</code> !

**Code source / Requête SQL associée :**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Signalement Mairie</title>
    <style>
        body { font-family: sans-serif; padding: 2rem; background: #f3f6fc; }
        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="card">
        <h1>Signaler une anomalie dans la commune</h1>
        <p>Ce portail permet de remonter des dysfonctionnements techniques aux agents municipaux.</p>
    </div>
</body>
</html>
```

---

### Diapositive : Tuto 2 : Base Supabase en Europe (RGPD)

- **Type d'affichage :** `tuto-step`

#### Tutoriel Étape n°2 : Créer une base de données SQL hébergée en Europe

**Étapes de configuration et actions requises :**
- Créez un compte gratuit sur <strong>Supabase.com</strong>.
- Cliquez sur <strong>New Project</strong>. Choisissez un nom (ex: <code>BDD Mairie</code>) et définissez un mot de passe sécurisé pour la base de données.
- IMPORTANT : Dans le champ <strong>Region</strong>, sélectionnez impérativement <strong>Europe (Frankfurt)</strong>. Cela garantit que les données des usagers restent protégées par le RGPD et ne traversent pas l'Atlantique.
- Allez dans l'onglet <strong>Table Editor</strong> (icône de tableau) ➔ cliquez sur <strong>Create a new table</strong>.
- Nommez la table <code>incidents</code>. Ajoutez les colonnes : <code>adresse</code> (type text), <code>nature</code> (type text), et <code>urgence</code> (type text). Décochez 'Is Nullable' si la colonne est obligatoire.
- Cliquez sur <strong>Save</strong> pour générer votre base de données SQL en ligne.

**Code source / Requête SQL associée :**
```html
// Exemple de connexion JS à intégrer dans votre index.html
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://votre-id-projet.supabase.co'
const supabaseKey = 'votre-cle-publique-api-anon'
const supabase = createClient(supabaseUrl, supabaseKey)

// Envoyer un signalement depuis l'interface vers la BDD
const { data, error } = await supabase
  .from('incidents')
  .insert([
    { adresse: '12 rue des Fleurs', nature: 'Nid-de-poule', urgence: 'Urgent' }
  ])
```

---

### Diapositive : Tuto 3 : Sécurisation Absolue par RLS

- **Type d'affichage :** `tuto-step`

#### Tutoriel Étape n°3 : Verrouiller les accès en écriture et en lecture

**Étapes de configuration et actions requises :**
- Par défaut, n'importe qui accédant à votre site peut lire ou altérer toute votre base de données Supabase car les clés sont stockées dans le code JavaScript du navigateur.
- Pour éviter cela, activez le **Row Level Security (RLS)** : allez dans l'onglet <strong>Authentication</strong> ou <strong>Database</strong> ➔ menu <strong>Policies</strong>.
- Cliquez sur **Enable RLS** à côté de votre table <code>incidents</code>.
- Créez une nouvelle politique (Policy) d'autorisation d'écriture : autorisez l'action <code>INSERT</code> de manière publique pour que tous les citoyens puissent envoyer un signalement.
- Créez une seconde politique pour l'action <code>SELECT</code> (lecture) : restreignez-la uniquement aux utilisateurs authentifiés (les agents de la mairie ayant un compte agent).

**Code source / Requête SQL associée :**
```html
-- Requête SQL de sécurité RLS exécutée par Supabase
-- 1. Autoriser le dépôt de signalements par tout le monde
CREATE POLICY "Dépôt public" 
ON public.incidents 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 2. Restreindre la consultation uniquement aux agents connectés
CREATE POLICY "Lecture réservée aux agents" 
ON public.incidents 
FOR SELECT 
TO authenticated 
USING (true);
```

---

### Questions de Vote Interactif & Quiz du Module `tuto-technique`

#### Question n°q10 (Quiz à réponse unique)
**Énoncé :** Lors du paramétrage d'un projet Supabase pour une mairie, pourquoi est-il impératif de choisir la région 'Europe (Frankfurt)' ?

**Options proposées aux stagiaires :**
- **Option [A] :** Pour accélérer le temps de chargement du site internet de 5 secondes.
- **Option [B] :** Pour garantir la conformité au RGPD en conservant les données des usagers sur le territoire européen (hors Cloud Act).
- **Option [C] :** Car les serveurs situés aux États-Unis sont payants contrairement aux serveurs européens.
- **Option [D] :** Pour éviter de devoir écrire des politiques de sécurité RLS.

- **Réponse correcte :** **[B]**
- **Explication pédagogique :** Le stockage en Europe garantit le respect du RGPD et évite le transfert extraterritorial des données citoyennes sous la juridiction du Cloud Act.

---

# Thématique : 11. Stratégie & Déploiement
- **ID unique :** `guide-dsi-ultime`
- **Catégorie :** `reg`
- **Icône visuelle :** 🧭
- **Objectifs d'apprentissage :** L'arbre décisionnel d'accès aux LLM, la matrice de valorisation IFSE et le fonctionnement de l'Agent Territorial Parfait.

### Diapositives et Fiches Théoriques du Module `guide-dsi-ultime`

### Diapositive : La Loi d'Amara & Tempo de l'IA

- **Type d'affichage :** `amara-law`

> **Loi de Roy Amara :** *"« Nous avons tendance à surestimer les effets d'une technologie à court terme et à les sous-estimer à long terme. »"*
> — *Roy Amara (Futuriste)*

Comprendre le tempo d'adoption de l'IA est crucial pour planifier les investissements et éviter deux erreurs stratégiques : la panique court-termiste et l'inaction long-termiste.

- **💥 Le Court Terme (1 à 2 ans) : Surestimation :** La tendance à vouloir tout réformer en 6 mois, à paniquer face aux bouleversements annoncés, puis à être déçu par les premières limites ou hallucinations de l'IA. C'est la phase de déception où l'on pense que 'le soufflé retombe'.
- **📈 Le Long Terme (5 à 10 ans) : Sous-estimation :** L'IA s'intègre discrètement mais profondément dans nos outils. Les bases posées (charte, sécurité, formation) portent leurs fruits et modifient de manière irréversible le fonctionnement de toute l'administration territoriale.

*Intérêt pédagogique et stratégique :* <strong>Implication pour la DSI et les Cadres :</strong> Il est inutile d'essayer de tout bouleverser en 6 mois. En revanche, <strong>il est capital de poser les bases saines (charte, règles de sécurité) dès maintenant</strong>, car l'impact cumulé sur 5 à 10 ans sera colossal.

---

### Diapositive : L'Arbre Décisionnel des Droits & DSI

- **Type d'affichage :** `dsi-decision-tree`

Pour savoir où vous vous situez dans votre collectivité et quelles démarches entreprendre, suivez cet arbre décisionnel interactif.
Cliquez sur les choix ci-dessous pour identifier les actions réglementaires et organisationnelles adaptées à votre situation administrative.

#### Les 4 Niveaux de Droits et Actions Réglementaires (DSI) :

##### 🔒 Niveau 1 : Blocage Total (Aucun accès internet aux LLMs)
- **Compétences / Expertise de l'agent :** Débutant formé
- **Bénéfice de productivité :** +30% à +40% de gain de temps
- **Impact IFSE :** Éligibilité IFSE de base (socle)
- **Situation DSI :** Le poste de travail de l'agent est bridé et l'accès réseau aux services cloud étrangers (ChatGPT, Gemini) est censuré.
- **💡 Démarche administrative :** Présenter la Charte d'usage (Thème 5) à la direction. Solliciter de la DSI un accès aux modules libres nationaux souverains d'État comme Albert (déployé par la DINUM).

##### 🌐 Niveau 2 : Accès Web Régulé (Interfaces en ligne autorisées)
- **Compétences / Expertise de l'agent :** Praticien Averti
- **Bénéfice de productivité :** +45% à +55% de gain de temps
- **Impact IFSE :** Éligibilité IFSE de niveau intermédiaire
- **Situation DSI :** L'ordinateur de l'agent est bridé localement (installation impossible) mais les navigateurs autorisent l'accès aux interfaces web IA.
- **💡 Démarche administrative :** Utiliser les IA uniquement sur des données anonymisées. Mettre en œuvre obligatoirement une extension de navigateur de pseudonymisation locale ou le formulaire JS de l'application pour purger les écrits avant copier-coller.

##### 📜 Niveau 3 : Poste Ouvert & Pionnier (Droits locaux débridés)
- **Compétences / Expertise de l'agent :** Référent IA
- **Bénéfice de productivité :** +60% à +70% de gain de temps
- **Impact IFSE :** Éligibilité IFSE avancée + NBI (Nouvelle Bonification Indiciaire)
- **Situation DSI :** L'agent dispose des droits d'administration sur son PC local (installation d'outils autorisée) mais aucun cadre d'usage formel n'a été défini par la mairie.
- **💡 Démarche administrative :** Rédiger et faire voter la Charte municipale en conseil municipal. Installer des applications desktop autonomes s'exécutant à 100% hors ligne locale (comme LM Studio avec des modèles comme Mistral ou Llama) pour confiner totalement les données sensibles.

##### 🚀 Niveau 4 : L'Agent Territorial Parfait (Déploiement Souverain Réseau)
- **Compétences / Expertise de l'agent :** Concepteur
- **Bénéfice de productivité :** +80% à +100% (Rendement maximal)
- **Impact IFSE :** Éligibilité IFSE expert + prime exceptionnelle de projet
- **Situation DSI :** DSI ouverte et collaborative. Déploiement d'un cadre cloud de confiance souverain (SecNumCloud) intégrant des clés d'API bridées budgétairement.
- **💡 Démarche administrative :** Mettre en œuvre l'architecture sécurisée des 3 Dossiers (Bruts ➔ Pseudonymisation automatique locale ➔ Conteneur Cloud API Gemini ➔ Dé-pseudonymisation automatique locale ➔ Dossier final) pour automatiser en toute sécurité les requêtes citoyennes sans fuite de données.

---

### Diapositive : La Matrice IFSE & Productivité

- **Type d'affichage :** `dsi-ifse-matrix`

L'utilisation professionnelle de l'IA doit être valorisée à la hauteur des gains de productivité et de la responsabilité réglementaire (RGPD/sécurité) portée par l'agent.
Ce tableau de correspondance croise le niveau de compétence, le gain de temps moyen estimé et l'impact potentiel sur le régime indemnitaire (IFSE) ou la NBI.

#### Matrice d'évaluation IFSE, Compétences et Productivité :

| Niveau & Titre | Descriptif des usages | Gain de temps | Responsabilité RGPD | Impact Régime Indemnitaires (IFSE) |
| :--- | :--- | :--- | :--- | :--- |
| **Niveau 1 : Débutant formé**<br>*(Utilisateur Occasionnel)* | Correction d'orthographe, résumés de textes publics, brainstorming. | **+30% à 40%** | Initiale (données publiques, anonymisation de base) | Revalorisation Socle (+80€ à 120€ / mois) |
| **Niveau 2 : Intermédiaire**<br>*(Praticien Averti)* | Méthode M.A.I.R.E., pseudonymisation par extension Chrome, gestion régulière de rédactions. | **+45% à 55%** | Moyenne (anonymisation locale rigoureuse) | Revalorisation Pratique (+130€ à 180€ / mois) |
| **Niveau 3 : Avancé**<br>*(Référent IA de Direction)* | Garant de la conformité du service, aide aux collègues, test d'applications locales, audit des usages. | **+60% à 70%** | Forte (garant des règles du service) | Revalorisation Référent (+200€ à 300€ / mois + NBI) |
| **Niveau 4 : Expert**<br>*(Concepteur Agentique)* | Conception et paramétrage du pipeline local des 3 dossiers, configuration API souveraine, gestion de boucle et du budget. | **+80% à 100%** | Très Forte (gestionnaire technique de l'API) | Revalorisation Expert (+350€ à 500€ / mois + Prime projet) |

---

### Diapositive : Le Pipeline de l'Agent Parfait (Les 3 Dossiers)

- **Type d'affichage :** `dsi-agent-ultime`

La solution technique ultime pour allier la puissance sémantique de Gemini, l'hébergement souverain en Europe et la conformité RGPD absolue.
Voici comment fonctionne le système de pseudonymisation locale par dossier, avec boucle agentique sécurisée sur serveur SecNumCloud.

#### La Solution Technique Ultime : Le Pipeline de l'Agent Parfait (Les 3 Dossiers)

Ce workflow s'appuie sur un partitionnement strict des dossiers locaux pour garantir le respect absolu de la souveraineté des données :

1. **📁 Dossier 1 : Fichiers Bruts (PC Local)**
   - *Usage :* L'agent public y dépose ses documents de travail bruts contenant des données nominatives ou sensibles réelles (courriels d'usagers, dossiers sociaux, rapports financiers internes).
   - *Traitement :* Un script s'exécute en local. Il détecte les fichiers, identifie les données d'identité (noms, téléphones, emails) et les remplace par des balises anonymes (ex: `[NOM_1]`). Il stocke la table de correspondance (clé de décryptage) en local dans la mémoire chiffrée de la machine de l'agent.

2. **📁 Dossier 2 : Fichiers Pseudonymisés (Prêts pour l'API Cloud)**
   - *Usage :* Contient uniquement les documents où toutes les données identifiantes ont été purgées. **Une étape de contrôle humain manuel facultative mais recommandée permet de vérifier le nettoyage.**
   - *Traitement :* L'application locale transmet ces fichiers chiffrés et anonymes vers un conteneur sécurisé d'agent d'IA sur serveur souverain (SecNumCloud en Europe), qui interroge ensuite l'API Gemini par jeton sécurisé pour générer la réponse. L'IA ne voit jamais l'identité des citoyens.

3. **📁 Dossier 3 : Fichiers Restitués (PC Local)**
   - *Usage :* Contient les réponses rédigées et formatées finalisées.
   - *Traitement :* Dès que la réponse anonyme revient de l'API Cloud de Gemini dans le dossier de retour, le script local du PC de l'agent utilise la clé de correspondance pour remplacer automatiquement les balises (`[NOM_1]`) par les véritables prénoms et noms d'origine. L'agent dispose d'un courrier parfaitement rédigé, personnalisé, sans qu'aucune donnée RGPD ne soit sortie sur le réseau américain.

4. **🌩️ Serveur SecNumCloud (Orchestrateur) & API Souveraine (Gemini/Mistral)**
   - *Usage :* Le conteneur d'IA en cloud de confiance exécute la boucle agentique et l'ancrage documentaire documentaire de manière sécurisée. Les limitations budgétaires de l'API (quota de tokens) y sont gérées de façon centralisée par la DSI.

---

### Questions de Vote Interactif & Quiz du Module `guide-dsi-ultime`

#### Question n°q_dsi (Quiz à réponse unique)
**Énoncé :** Dans le pipeline de l'Agent Parfait, pourquoi la pseudonymisation et la dé-pseudonymisation s'effectuent-elles exclusivement sur le PC local de l'agent ?

**Options proposées aux stagiaires :**
- **Option [A] :** Pour s'assurer qu'aucune donnée identifiante (RGPD) ou confidentielle ne quitte le réseau local ou ne soit envoyée vers un cloud non souverain.
- **Option [B] :** Parce que les serveurs SecNumCloud ne disposent pas d'assez d'espace de stockage temporaire.
- **Option [C] :** Afin de réduire la consommation d'électricité des serveurs Gemini de Google.
- **Option [D] :** Pour obliger l'agent à superviser manuellement la reconstruction grammaticale.

- **Réponse correcte :** **[A]**
- **Explication pédagogique :** La pseudonymisation et la dé-pseudonymisation locales garantissent le respect du RGPD et du Cloud Act, car aucun élément d'identité réel ne sort sur le réseau.

---

# Thématique : 12. Évaluation Stage
- **ID unique :** `eval-stage-bilan`
- **Catégorie :** `prompt`
- **Icône visuelle :** 📝
- **Objectifs d'apprentissage :** Mise en situation d'évaluation initiale (début de stage) et finale (fin de stage) à faire sur papier.

### Diapositives et Fiches Théoriques du Module `eval-stage-bilan`

### Diapositive : Évaluation Individuelle : Début & Fin de Stage

- **Type d'affichage :** `eval-stage`

Ce test individuel permet de mesurer et comparer l'évolution des compétences de rédaction de prompts et de conformité aux règles de sécurité chez le stagiaire.

#### Grille d'Évaluation de Fin de Stage (Individuelle, sur Papier)

**Mise en situation et consigne d'examen :**
> *Vous êtes agent administratif au service de l'état civil. Un citoyen vous envoie un mail confus (nom de famille : M. Charles Dufour, mail: charles.dufour@example.com, tél: 06 99 88 77 66) demandant comment obtenir un extrait d'acte de naissance pour son fils né à l'étranger. Rédigez un prompt papier pour demander à un LLM de concevoir un brouillon de réponse officiel basé sur les lois consulaires françaises.*

##### ✅ Bonnes Pratiques d'évaluation (Grille DOs) :
- Définir clairement son rôle d'agent [M] (ex: 'Je suis secrétaire de mairie en charge de l'état civil')
- Attribuer un rôle expert à l'IA [A] (ex: 'Tu es un juriste spécialisé en droit civil français')
- Décrire explicitement la tâche [I] (ex: 'Rédige une note d'information par courriel')
- Préciser les ressources de loi à utiliser [R] (ex: 'Appuie-toi sur le Code Civil')
- Exiger un format court, poli et neutre [E] (ex: '3 paragraphes maximum, ton formel')
- Anonymiser impérativement les données nominatives avant toute saisie : remplacer 'Charles Dufour' par <code>[NOM_1]</code>, le mail par <code>[EMAIL_1]</code>, le numéro par <code>[TELEPHONE_1]</code>

##### ❌ Fautes d'évaluation éliminatoires (Grille DONTs) :
- Saisir le nom de famille 'Charles Dufour' ou le mail de l'usager brut dans le prompt (Violation majeure du RGPD / Cloud Act !)
- Donner des instructions floues sans contrainte de format (ex: 'réponds à ce mail')
- Laisser l'IA agir en autonomie sans validation humaine (l'IA ne doit proposer qu'un brouillon)

##### 💡 Réponse modèle attendue (Prompt parfait M.A.I.R.E) :
```text
[MOI] : Je suis agent administratif en charge du service de l'état civil municipal.

[AGENT] : Agis en tant qu'expert juridique de l'état civil des Français à l'étranger.

[INFORMATION] : Conçois un brouillon de réponse par mail destiné à l'administré [NOM_1] (contact: [EMAIL_1]) qui souhaite obtenir l'acte de naissance de son fils né hors de France.

[RESSOURCES] : Base-toi uniquement sur les articles 47 et 48 du Code Civil français.

[EXIGENCE] : Rédige une réponse claire de 3 paragraphes maximum. Explique de manière neutre et polie la procédure et les pièces justificatives à fournir. Précise que la demande doit être adressée directement au Service central d'état civil de Nantes (ministère des Affaires étrangères).
```

---

### Questions de Vote Interactif & Quiz du Module `eval-stage-bilan`

#### Question n°q11 (Sondage d'opinion)
**Énoncé :** À l'issue de ce parcours de formation, comment évaluez-vous votre niveau de confiance pour intégrer l'IA dans votre travail territorial ?

**Options proposées aux stagiaires :**
- **Option [A] :** Prêt ! Je maîtrise la méthode M.A.I.R.E, la sécurité des données et l'anonymisation.
- **Option [B] :** Intéressé, mais je souhaite faire d'autres tests encadrés par ma DSI.
- **Option [C] :** Prudent, les enjeux juridiques et la sécurité agentique me font hésiter.
- **Option [D] :** Non convaincu, je préfère conserver mes méthodes de travail traditionnelles.

- **Type :** Sondage d'opinion collective (aucune bonne réponse de droit)
- **Explication pédagogique :** Ce sondage de fin de formation permet de mesurer l'acceptabilité technologique chez les agents formés.

---

# Thématique : 13. Exercices & Ateliers
- **ID unique :** `exercices-ateliers`
- **Catégorie :** `prompt`
- **Icône visuelle :** 🎯
- **Objectifs d'apprentissage :** Une banque complète de plus de 60 exercices pratiques et théoriques, individuels et collectifs, sur PC ou sur papier.

### Diapositives et Fiches Théoriques du Module `exercices-ateliers`

### Diapositive : Le Catalogue des Ateliers & Exercices

- **Type d'affichage :** `exercises-dashboard`

Sélectionnez, filtrez et préparez vos ateliers de formation. Ce module interactif regroupe l'ensemble des exercices pratiques sur PC ou sur papier avec leurs corrections détaillées.

*Remarque :* Ce module intègre des outils interactifs sur le poste du formateur, notamment un calculateur financier d'efficacité, un simulateur de perte de transmission (téléphone arabe) et un moteur de filtrage pour le catalogue d'exercices.

---

### Questions de Vote Interactif & Quiz du Module `exercices-ateliers`

#### Question n°q_ateliers (Quiz à réponse unique)
**Énoncé :** Quel est l'intérêt principal de s'exercer en équipe (ateliers collectifs) sur des cas d'usage réels de sa collectivité ?

**Options proposées aux stagiaires :**
- **Option [A] :** Rédiger des prompts plus rapidement en divisant le travail entre collègues.
- **Option [B] :** Confronter les approches de prompt, repérer collectivement les risques de fuite de données et valider ensemble le contrôle humain.
- **Option [C] :** Installer plus de logiciels non autorisés sur les postes de travail.
- **Option [D] :** Éviter d'avoir à relire les documents générés par l'IA.

- **Réponse correcte :** **[B]**
- **Explication pédagogique :** Les ateliers collectifs permettent d'échanger sur les meilleures formulations de prompts et de standardiser des pratiques sécurisées (RGPD, contrôle humain) partagées au sein du service.

---

## Base de Données des 60 Exercices & Ateliers Pratiques CNFPT

La banque d'exercices ci-dessous regroupe les 60 ateliers créés pour cette formation. Ils sont conçus pour être alternés tout au long du stage :

*   **Exercices 1 à 30 (💻 Sur PC) :** Axés sur la manipulation des prompts dans un LLM et l'utilisation d'outils.
*   **Exercices 31 à 60 (📝 Sur Papier) :** Axés sur les jeux de rôles, le respect déontologique du RGPD, la réflexion logique et la modélisation.

### Exercice 1 : Atelier Discours Municipal (Méthode M.A.I.R.E.)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Rédiger un discours d'inauguration de gymnase structuré et calibré.
- **Intérêt d'animation :** Apprendre à formuler des consignes de rôle (persona), de ressources et de format pour un livrable de qualité publique.

**Consigne / Instructions pour le stagiaire :**
> Rédigez un prompt pour demander à l'IA d'écrire le discours d'inauguration du gymnase municipal après sa rénovation énergétique. Intégrez les contraintes suivantes : travaux financés à 60% par la Région et 40% par la commune, focus sur la réduction de l'empreinte carbone, durée de lecture de 3 minutes.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Je suis le directeur de la communication d'une commune de 10 000 habitants.
[AGENT] : Agis en plume politique expérimentée et spécialiste des discours républicains de proximité.
[INFORMATION] : Rédige le discours que le Maire prononcera pour la réouverture du gymnase municipal rénové.
[RESSOURCES] : Données de travaux : isolation par l'extérieur, chauffage biomasse, réduction de 50% de l'empreinte carbone. Financement : 60% Région, 40% Commune.
[EXIGENCE] : Rédige un texte de 400 mots (environ 3 min de parole). Structure : Salutations officielles, remerciements aux financeurs, focus sur la transition écologique locale, conclusion républicaine positive. Ton solennel mais chaleureux.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Définir la plume politique donne le ton adéquat. Les ressources chiffrées évitent les inventions budgétaires. L'exigence de mots garantit le calibrage du temps de parole.*

---

### Exercice 2 : Synthèse de Compte-Rendu de Réunion (DGS)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Résumer 2 pages de notes en 5 décisions clés et un tableau d'actions.
- **Intérêt d'animation :** Comprendre comment l'IA peut structurer des notes désorganisées en documents de synthèse professionnels et exploitables.

**Consigne / Instructions pour le stagiaire :**
> Prenez des notes de réunion municipales brutes et demandez à l'IA de concevoir une note de synthèse avec 5 décisions stratégiques et un tableau d'actions (Qui, Quoi, Quand).

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : DGS de la collectivité.
[AGENT] : Assistant administratif de direction expert en rédaction de synthèses.
[INFORMATION] : Synthétise mes notes brutes de la réunion de projet 'Piste cyclable centre-ville' ci-dessous.
[RESSOURCES] : [Copier-coller les notes brutes de réunion]
[EXIGENCE] : Structure en 2 parties : 1) Les 5 décisions clés prises (sous forme de liste à puces), 2) Un tableau récapitulatif des actions avec les colonnes : Responsable, Action à mener, Échéance. Évite le jargon inutile, reste ultra-synthétique.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'IA excelle à re-structurer le texte non ordonné. Demander un tableau d'actions force l'IA à extraire des responsabilités précises de manière opérationnelle.*

---

### Exercice 3 : Traduction de la Charte d'Accueil en 3 langues
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Traduire un texte administratif en anglais, espagnol et arabe en conservant la politesse.
- **Intérêt d'animation :** Maîtriser les capacités multilingues des LLM pour améliorer l'accueil du public non francophone.

**Consigne / Instructions pour le stagiaire :**
> Rédigez un prompt pour traduire le protocole d'accueil de la mairie (gestion des files d'attente, pièces justificatives à préparer) en 3 langues, en veillant à ce que le ton reste courtois et accueillant.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Responsable du service des relations aux usagers.
[AGENT] : Traducteur professionnel spécialisé dans les administrations publiques.
[INFORMATION] : Traduis la charte d'accueil ci-dessous en anglais, espagnol et arabe.
[RESSOURCES] : [Coller le texte de la charte d'accueil municipal]
[EXIGENCE] : Conserve un ton très poli, chaleureux et institutionnel. Présente les traductions les unes à la suite des autres, séparées par des titres clairs.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Préciser le contexte d'administration publique empêche l'IA d'utiliser des termes trop commerciaux ou familiers lors de la traduction sémantique.*

---

### Exercice 4 : Analyse Comparative de 3 Devis Informatiques
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Établir un tableau comparatif financier et technique de 3 offres d'achat.
- **Intérêt d'animation :** Gagner du temps sur l'analyse de dossiers de marchés publics en structurant les écarts d'offres.

**Consigne / Instructions pour le stagiaire :**
> Collez le résumé de 3 devis d'achat d'ordinateurs pour les écoles dans le prompt et demandez à l'IA de générer un tableau comparatif HT/TTC, durée de garantie et points d'attention.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Acheteur public de la collectivité.
[AGENT] : Analyste financier et expert en marchés publics.
[INFORMATION] : Analyse et compare les 3 offres d'ordinateurs scolaires fournies en ressources.
[RESSOURCES] : Offre A (15 ordinateurs, 500€ HT/unité, garantie 1 an). Offre B (15 ordinateurs, 530€ HT/unité, garantie 3 ans, livraison offerte). Offre C (15 ordinateurs, 480€ HT/unité, garantie 1 an, installation 500€ HT).
[EXIGENCE] : Génère un tableau comparatif avec : Nom de l'offre, Coût unitaire HT, Coût total HT, Coût total TTC (TVA 20%), Durée de la garantie, Avantages techniques, Inconvénients. Termine par une recommandation motivée de 3 lignes.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Les calculs financiers de base et l'analyse de critères multiples permettent à l'IA de dégager l'offre économiquement la plus avantageuse (ici l'Offre B sur 3 ans).*

---

### Exercice 5 : Désescalade Écrite (Réponse à un administré agressif)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Rédiger un courriel de réponse ferme mais apaisant et neutre.
- **Intérêt d'animation :** Apprendre à désamorcer les conflits écrits en utilisant l'IA pour reformuler des sentiments hostiles en termes factuels et professionnels.

**Consigne / Instructions pour le stagiaire :**
> Copiez un e-mail d'administré en colère se plaignant d'un retard de travaux. Demandez à l'IA d'analyser ses griefs et de rédiger une réponse constructive en évitant les termes défensifs.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Responsable de la relation usagers.
[AGENT] : Expert en médiation de conflits et communication non violente en secteur public.
[INFORMATION] : Rédige un courriel de réponse à l'e-mail d'insatisfaction ci-dessous.
[RESSOURCES] : [Coller l'e-mail énervé de l'administré]
[EXIGENCE] : Ne réponds pas sur le ton de la colère. Reste factuel, exprime de l'empathie pour la gêne occasionnée sans rejeter la faute sur les agents. Explique que les travaux se terminent le 15 juin. Longueur max : 150 mots.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Le filtre d'empathie de l'IA élimine la réactivité émotionnelle de l'agent fatigué et permet de rédiger un texte conforme à la charte de neutralité publique.*

---

### Exercice 6 : Communication Événementielle (Fête de la Musique)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Concevoir une série de posts accrocheurs et humoristiques pour les réseaux sociaux.
- **Intérêt d'animation :** Utiliser la créativité (température élevée) de l'IA pour diversifier les styles de communication sur les réseaux sociaux municipaux.

**Consigne / Instructions pour le stagiaire :**
> Créez 3 variantes de posts Facebook pour annoncer la Fête de la Musique municipale : un ton officiel, un ton jeune et décalé, et un ton sous forme de devinettes.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Chargé de communication numérique de la ville.
[AGENT] : Community manager créatif spécialisé dans le secteur territorial.
[INFORMATION] : Génère 3 propositions de posts pour promouvoir la fête de la musique du 21 juin sur la place de la mairie.
[EXIGENCE] : Post 1 : Institutionnel et informatif (horaires, sécurité). Post 2 : Humour et références musicales décalées. Post 3 : Sous forme de rébus ou de devinette pour engager les habitants. Utilise des emojis adaptés.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Varier les personas et les styles éditoriaux montre que l'IA peut s'adapter à des cibles très différentes (de l'élu aux adolescents de la commune).*

---

### Exercice 7 : Extraction de Données Budgétaires Brutes
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Nettoyer un texte budgétaire pour en faire un tableau CSV propre.
- **Intérêt d'animation :** Apprendre à faire extraire des entités structurées à partir d'un flux de texte désordonné.

**Consigne / Instructions pour le stagiaire :**
> Collez un paragraphe décousu de chiffres budgétaires de fonctionnement et demandez à l'IA d'en extraire les recettes et dépenses dans un format tabulaire prêt pour Excel.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Comptable de la collectivité.
[AGENT] : Data analyst expert en comptabilité publique (M57).
[INFORMATION] : Extrais toutes les données financières du texte brut en ressources pour en faire un tableau structuré.
[RESSOURCES] : [Coller le texte budgétaire brut, ex: 'On note 12k€ de fournitures scolaires, 45k€ de chauffage et une recette de subvention de 18k€...']
[EXIGENCE] : Structure en tableau avec : Catégorie (Dépense/Recette), Poste comptable, Montant en euros. Ne rajoute aucun commentaire introductif ou conclusif.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'IA applique des filtres regex internes pour extraire les valeurs associées à des concepts, évitant la saisie manuelle fastidieuse.*

---

### Exercice 8 : Atelier FAQ d'Accueil (Demandes de Passeport)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Générer une foire aux questions claire sur les démarches administratives.
- **Intérêt d'animation :** Utiliser l'IA pour vulgariser des textes administratifs complexes (du site Service-Public) en questions-réponses simples pour les usagers.

**Consigne / Instructions pour le stagiaire :**
> Prenez les règles officielles d'obtention du passeport pour un mineur et demandez à l'IA de rédiger une FAQ de 5 questions courantes sous forme de dépliant.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Agent d'accueil en mairie.
[AGENT] : Rédacteur web spécialisé dans la simplification des démarches administratives (FALC).
[INFORMATION] : Rédige une FAQ de 5 questions sur l'obtention d'un passeport pour un mineur à partir des règles officielles ci-dessous.
[RESSOURCES] : [Coller le texte officiel ou le lien de documentation]
[EXIGENCE] : Rédige des questions du point de vue du parent (ex: 'Mon enfant doit-il être présent ?'). Les réponses doivent être courtes, à puces et très claires. Indique la liste des documents requis.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La vulgarisation (rendre simple ce qui est légalement complexe) est une des forces majeures des LLM, à condition de leur fournir la ressource légale de départ (ancrage).*

---

### Exercice 9 : Poème du Tri Sélectif (Sensibilisation Écoles)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Créer une chanson ou un poème court pour sensibiliser les enfants au tri des déchets.
- **Intérêt d'animation :** Explorer les capacités poétiques et métaphoriques de l'IA pour créer des supports d'animation ludiques.

**Consigne / Instructions pour le stagiaire :**
> Demandez à l'IA d'écrire une poésie rimée de 4 strophes expliquant aux enfants de CM1 pourquoi le plastique va dans la poubelle jaune et le verre dans le bac vert.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Animateur périscolaire.
[AGENT] : Poète pour enfants et éducateur en développement durable.
[INFORMATION] : Rédige un poème rimé pédagogique pour apprendre le tri sélectif aux enfants de 8-10 ans.
[EXIGENCE] : 4 strophes en rimes croisées (ABAB). Explique la destination de la poubelle jaune (plastique, carton) et du bac vert (bouteilles en verre). Utilise un vocabulaire joyeux et mémorisable.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Les contraintes de rimes et de rythme forcent l'IA à piocher dans ses vecteurs lexicaux de sonorité, montrant sa flexibilité créative.*

---

### Exercice 10 : Plan de Végétalisation d'un Parvis Municipal
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Établir une liste de plantes adaptées à la sécheresse avec leurs fiches techniques.
- **Intérêt d'animation :** Associer des contraintes d'aménagement urbain et environnemental pour générer un plan technique structuré.

**Consigne / Instructions pour le stagiaire :**
> Concevez un prompt pour demander une palette végétale de 5 plantes méditerranéennes ou résistantes, mellifères, nécessitant peu d'eau, pour réaménager le parvis de la mairie du Sud.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Responsable des espaces verts d'une commune soumise aux restrictions d'eau d'été.
[AGENT] : Architecte paysagiste expert en xéropaysagisme (jardin sans eau) et biodiversité.
[INFORMATION] : Propose 5 espèces de plantes pour notre parvis ensoleillé.
[EXIGENCE] : Pour chaque plante, indique : Nom commun, Nom latin, Besoins en eau (sur 5), Période de floraison, Rôle écologique (ex. pollinisateurs). Présente sous forme de tableau Markdown.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Le typage des sorties (tableau Markdown) permet d'insérer directement le rendu dans une note technique d'élus.*

---

### Exercice 11 : Note de Cadrage Projet (Raccordement Fibre)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Rédiger une note de cadrage technique et méthodologique de 2 pages.
- **Intérêt d'animation :** Utiliser l'IA pour générer la structure et le premier jet d'une note de projet complexe en interne.

**Consigne / Instructions pour le stagiaire :**
> Demandez à l'IA de concevoir le plan détaillé et le contenu d'une note de cadrage pour les travaux de raccordement de la fibre optique dans le hameau isolé de la commune.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Directeur des Services Techniques.
[AGENT] : Consultant en gestion de projets d'infrastructures télécoms.
[INFORMATION] : Rédige le plan et le texte de cadrage pour le projet de déploiement de la fibre au Hameau des Chênes.
[RESSOURCES] : Longueur du câble : 2 km, 50 foyers concernés, budget estimé de 40k€, début des travaux en septembre, durée 3 mois.
[EXIGENCE] : Rédige une note structurée en 5 parties : 1) Contexte et objectifs, 2) Spécifications techniques et calendrier, 3) Budget et partenaires financiers, 4) Risques identifiés (intempéries, retards de livraison), 5) Plan de communication aux habitants. Ton professionnel et neutre.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Définir les risques (intempéries/délais) montre la capacité de l'IA à projeter des variables externes sur un projet à partir de sa base générale de connaissances.*

---

### Exercice 12 : Requête SQL pour listing Cantines Scolaires
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Écrire une requête de base de données sans compétence de code préalable.
- **Intérêt d'animation :** Démontrer comment un agent non technicien peut générer du code informatique (SQL) pour extraire des informations d'un progiciel métier.

**Consigne / Instructions pour le stagiaire :**
> Vous devez extraire la liste des élèves allergiques inscrits à la cantine de l'école Pasteur. Rédigez un prompt pour demander à l'IA de concevoir la requête SQL correspondante à partir de la structure de vos tables.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Agent administratif du service scolaire de la mairie.
[AGENT] : Développeur SQL sénior spécialisé dans les bases de données de gestion éducative.
[INFORMATION] : Rédige une requête SQL pour lister les élèves.
[RESSOURCES] : Tables : 'eleves' (colonnes: id, nom, prenom, classe, ecole) et 'cantine' (colonnes: id_eleve, inscrit_oui_non, allergie_details).
[EXIGENCE] : La requête SQL doit lister le nom, prénom et classe des élèves de l'école 'Pasteur' inscrits à la cantine (inscrit_oui_non = 'OUI') et ayant des allergies (allergie_details non vide). Ajoute des commentaires explicatifs pour chaque ligne de code SQL.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'IA traduit le langage naturel en syntaxe logique stricte (SQL), ce qui permet à des agents non techniques de dialoguer avec la DSI pour obtenir des extractions spécifiques.*

---

### Exercice 13 : Chasse aux Hallucinations Juridiques (CGCT)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Identifier des erreurs insérées délibérément dans une réponse d'IA sur le code des collectivités.
- **Intérêt d'animation :** Développer le réflexe d'esprit critique et de vérification des sources légales (recherche sur Légifrance) face à une réponse d'IA.

**Consigne / Instructions pour le stagiaire :**
> Demandez à l'IA de citer l'article du Code Général des Collectivités Territoriales (CGCT) régissant le droit d'expression des élus d'opposition dans le magazine municipal. Allez vérifier sur Légifrance si le numéro d'article et la citation exacte correspondent à la réalité.

**Proposition de Correction / Solution de référence :**
```text
Prompt type : 'Quel article du CGCT régit le droit d'expression des élus minoritaires dans les bulletins d'information ? Donne le texte exact.'
Résultat attendu : L'IA peut citer l'article L. 2121-27-1. Le stagiaire doit ouvrir Légifrance, taper cet article et comparer mot à mot la réponse de l'IA pour vérifier s'il n'y a pas d'hallucination (ex: invention de l'obligation pour les communes de moins de 1000 habitants).
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice confronte les stagiaires à la réalité physique de la génération statistique : l'IA peut affirmer un numéro d'article faux avec une assurance rédactionnelle totale.*

---

### Exercice 14 : Atelier Charte de Télétravail Interne
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Créer un accord-cadre de télétravail conforme aux règles de la fonction publique.
- **Intérêt d'animation :** Utiliser l'IA pour structurer un document de ressources humaines complexe nécessitant de respecter des règles législatives préexistantes.

**Consigne / Instructions pour le stagiaire :**
> Rédigez un prompt pour concevoir une charte du télétravail pour les agents de votre commune. Intégrez les règles suivantes : 2 jours maximum par semaine, obligation de présence le mardi, non-éligibilité des agents d'accueil physique.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Responsable des Ressources Humaines en mairie.
[AGENT] : Expert en droit du travail de la fonction publique territoriale.
[INFORMATION] : Rédige une charte de télétravail pour notre collectivité.
[RESSOURCES] : Accord national cadre de 2021 sur le télétravail dans la fonction publique. Contraintes internes : Max 2 jours/semaine, mardi présentiel obligatoire, agents d'accueil physique exclus.
[EXIGENCE] : Rédige le texte sous forme d'articles de loi structurés (Art. 1 : Éligibilité, Art. 2 : Demande et acceptation, Art. 3 : Temps de travail et déconnexion, Art. 4 : Équipements). Ton neutre et juridique.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'IA utilise sa connaissance des formats juridiques classiques pour structurer un accord RH clair et exploitable lors des comités sociaux territoriaux (CST).*

---

### Exercice 15 : Brainstorming Noms d'Éco-Quartiers
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Générer des idées de noms évocateurs pour un nouveau projet d'urbanisme durable.
- **Intérêt d'animation :** Utiliser l'IA comme outil d'idéation et de créativité pour sortir des sentiers battus.

**Consigne / Instructions pour le stagiaire :**
> Demandez à l'IA de proposer 15 noms poétiques et évocateurs pour un éco-quartier construit autour d'une ancienne filature de coton, valorisant l'eau et la biodiversité locale.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Chef de projet urbanisme.
[AGENT] : Concepteur-rédacteur créatif spécialisé en branding et marketing territorial.
[INFORMATION] : Propose 15 noms originaux pour notre futur éco-quartier.
[RESSOURCES] : Contexte : ancienne usine de coton historique, présence d'un canal, chaufferie bois, parc urbain de 2 hectares.
[EXIGENCE] : Propose des noms qui lient l'histoire industrielle et la transition écologique (ex: 'Les Tissages Verts', 'Le Parvis du Canal'). Classe-les par thématiques (Historique, Nature, Avenir).
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'IA combine des concepts éloignés (industrie textile et écologie) pour créer des métaphores verbales nouvelles, ce qui stimule la créativité des équipes projets.*

---

### Exercice 16 : Rédaction d'un Communiqué d'Alerte Canicule
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Concevoir un communiqué de crise clair destiné à la presse et aux habitants.
- **Intérêt d'animation :** Apprendre à réagir dans l'urgence en créant un document de communication publique officiel en quelques minutes.

**Consigne / Instructions pour le stagiaire :**
> Le département passe en alerte rouge canicule. Créez un prompt pour générer le communiqué officiel de la mairie listant les mesures de sécurité et l'ouverture des salles climatisées.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Directeur de cabinet du Maire.
[AGENT] : Responsable de la communication de crise publique.
[INFORMATION] : Rédige en urgence un communiqué de presse d'alerte canicule.
[RESSOURCES] : Préfecture : alerte rouge. Mesures mairie : ouverture du foyer climatisé des aînés de 10h à 18h, activation du registre des personnes vulnérables, annulation des activités sportives extérieures.
[EXIGENCE] : Rédige un texte court de 250 mots maximum. Utilise des consignes de sécurité claires sous forme de liste. Donne le numéro de téléphone d'urgence de la mairie. Ton calme, protecteur et rigoureux.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*En cas d'urgence, la rapidité d'exécution de l'IA évite le stress de la mise en page et de la formulation de base, laissant aux agents le temps de valider et de diffuser.*

---

### Exercice 17 : Simplification administrative (FALC) d'un décret
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Traduire un texte législatif complexe en français Facile à Lire et à Comprendre.
- **Intérêt d'animation :** Garantir l'accessibilité de l'information publique en utilisant l'IA comme traductrice simplifiée pour les usagers en situation de handicap ou allophones.

**Consigne / Instructions pour le stagiaire :**
> Prenez l'article de loi concernant l'attribution de l'Allocation Personnalisée d'Autonomie (APA) et demandez à l'IA de le réécrire en respectant la charte européenne du FALC (mots simples, phrases courtes, une idée par ligne).

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Conseiller en espace d'accès aux droits sociaux.
[AGENT] : Rédacteur expert en accessibilité et en méthodologie FALC (Facile à Lire et à Comprendre).
[INFORMATION] : Réécris le texte officiel en ressources en français simplifié FALC.
[RESSOURCES] : [Coller le décret officiel sur l'attribution de l'APA]
[EXIGENCE] : Fais des phrases de maximum 10 mots. Utilise des verbes d'action au présent. Supprime les termes juridiques complexes ou explique-les immédiatement entre parenthèses. Fais une liste à puces pour les critères d'âge et de santé.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La simplification sémantique est un processus mécanique de réduction de complexité syntaxique pour lequel l'IA obtient d'excellents résultats, facilitant l'accès universel aux droits.*

---

### Exercice 18 : Gabarits de Mail pour l'État Civil (Mariages)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Créer un ensemble de mails types pour relancer les dossiers de mariage incomplets.
- **Intérêt d'animation :** Gagner du temps sur les tâches répétitives en automatisant les courriels quotidiens tout en préservant la cordialité du service public.

**Consigne / Instructions pour le stagiaire :**
> Concevez un prompt pour générer 3 modèles de mails types à destination des futurs époux : dossier incomplet (pièce d'identité manquante), confirmation de la date et de l'heure, et rappel des règles de sécurité (retards, stationnement).

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Agent d'état civil.
[AGENT] : Rédacteur en relations publiques courtoises.
[INFORMATION] : Génère 3 gabarits de mails types pour les dossiers de mariage.
[EXIGENCE] : Mail 1 : Demande polie mais ferme de la pièce d'identité manquante pour valider le dossier. Mail 2 : Message de félicitations et confirmation du créneau (Samedi 14 septembre à 11h). Mail 3 : Rappel des consignes de civilité (pas de jets de riz en plastique sur le parvis, stationnement limité). Conserve des balises modifiables comme [NOM_EPOUX] ou [DATE] dans les textes.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Les modèles de courriels rédigés par l'IA permettent d'unifier la qualité de la relation usagers au sein de l'équipe d'état civil.*

---

### Exercice 19 : Atelier RAG : Règlement Cantine Incassable
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Forcer l'IA à répondre à une question uniquement à l'aide d'un texte fourni, sans inventer.
- **Intérêt d'animation :** Comprendre et appliquer le mécanisme d'ancrage (RAG) pour éviter les hallucinations et garantir la fidélité légale.

**Consigne / Instructions pour le stagiaire :**
> Collez le règlement de la cantine scolaire dans le prompt. Posez la question : 'Un enfant peut-il manger de la viande s'il a un certificat médical d'allergie au poisson ?' Ajoutez la consigne stricte de verrouillage de recherche.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Agent d'accueil scolaire.
[AGENT] : Assistant d'information factuelle qui se base uniquement sur le texte ci-dessous.
[INFORMATION] : Réponds à la question suivante : 'Quel est le protocole si un enfant arrive en retard à la cantine ?'
[RESSOURCES] : [Coller l'intégralité du règlement cantine]
[EXIGENCE] : Ne réponds que si la réponse exacte figure dans le règlement ci-dessus. Si l'information n'y est pas écrite, réponds exclusivement : 'Je ne sais pas car cela n'est pas précisé dans le document'. N'invente rien.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'ancrage strict montre comment inhiber la mémoire générale du réseau de neurones au profit d'une base de connaissances documentaire de confiance.*

---

### Exercice 20 : Recherche de subventions d'État (Comparatif)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Trouver et comparer les dispositifs d'aides de l'État pour l'achat de vélos électriques municipaux.
- **Intérêt d'animation :** Utiliser les fonctions de recherche connectée au web de l'IA (ex. Gemini/ChatGPT Web) pour effectuer une veille sur les aides publiques régionales et étatiques.

**Consigne / Instructions pour le stagiaire :**
> Utilisez une IA avec accès internet pour chercher les dispositifs d'aide financière actuels en France pour l'achat d'une flotte de vélos à assistance électrique (VAE) par une collectivité territoriale. Synthétisez sous forme de liste.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Directeur financier de commune.
[AGENT] : Veilleur stratégique spécialisé en subventions publiques et transition écologique.
[INFORMATION] : Recherche sur internet les subventions nationales et régionales actives en 2026 pour l'achat de vélos à assistance électrique par une mairie.
[EXIGENCE] : Fais la liste des aides (ex: Bonus Vélo, aides ADEME, subventions de la Région). Indique pour chaque aide : le taux de cofinancement maximum, les critères d'éligibilité et le lien officiel vers le guichet de dépôt. Cite tes sources.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La recherche active avec l'IA permet d'agréger des informations dispersées sur plusieurs sites étatiques en un seul tableau de synthèse à jour.*

---

### Exercice 21 : Atelier Groupe : L'Organisateur de Séminaire
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Concevoir le programme logistique d'une journée d'intégration pour 50 agents.
- **Intérêt d'animation :** Travailler la planification collaborative en confiant la logistique et les plannings à l'IA pour libérer le temps de réflexion stratégique de l'équipe.

**Consigne / Instructions pour le stagiaire :**
> En équipe de 3, utilisez l'IA pour planifier la journée d'intégration des 50 nouveaux agents de la métropole. Demandez un déroulé horaire, la gestion des repas, un atelier brise-glace et la gestion du budget global (limité à 2000 €).

**Proposition de Correction / Solution de référence :**
```text
Cheminement du groupe :
1. Écrire le prompt d'objectifs (50 agents, budget 2000€, 9h-17h, thématique cohésion).
2. Demander à l'IA des propositions d'ateliers et de traiteur.
3. Affiner en demandant à l'IA d'optimiser le budget (ex: réduire le coût du traiteur pour acheter des lots de récompenses).
4. Exporter le planning horaire final sous forme de tableau.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'IA agit comme un secrétaire de projet instantané qui calcule la répartition des enveloppes budgétaires et propose des déroulés d'ateliers logiques (alternance théorie/pratique).*

---

### Exercice 22 : Atelier Groupe : Le Prompt Système d'un Chatbot d'Accueil
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Écrire les consignes système (garde-fous) d'une IA d'accueil usagers pour le site web.
- **Intérêt d'animation :** Comprendre comment configurer l'identité d'un agent public virtuel (Chatbot) pour qu'il reste neutre, poli et ne donne pas de faux conseils juridiques.

**Consigne / Instructions pour le stagiaire :**
> En groupe, rédigez le 'System Prompt' (le rôle invisible de base) d'un agent conversationnel de mairie. L'IA doit guider l'usager sur les horaires, ne jamais prendre de décision de droit, et s'adresser poliment aux citoyens.

**Proposition de Correction / Solution de référence :**
```text
Proposition de System Prompt rédigé par les stagiaires :
'Tu es l'agent virtuel officiel de la Mairie de [Nom]. Ta mission est d'orienter les usagers sur les horaires d'ouverture (Lu-Ve, 8h30-17h00) et les pièces à fournir pour les démarches courantes. Règle 1 : Reste toujours poli, neutre politiquement et bienveillant. Règle 2 : Ne donne jamais d'avis juridique ou de promesse d'attribution d'aide. Règle 3 : Si tu ne sais pas, renvoie vers le numéro d'accueil standard.'
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice montre l'importance des consignes racines (System Prompt) pour brider les réponses d'un robot orienté vers le grand public.*

---

### Exercice 23 : Atelier Groupe : Le Hackathon de l'Efficacité Administrative
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 45 minutes
- **Objectif de l'exercice :** Mesurer et optimiser le temps passé sur une tâche administrative classique en binôme.
- **Intérêt d'animation :** Comparer l'efficacité humaine brute et l'efficacité augmentée par l'IA sur un travail concret de rédaction de délibération.

**Consigne / Instructions pour le stagiaire :**
> Un stagiaire rédige une délibération d'attribution de subvention de manière classique (en cherchant les modèles de textes sur son PC). L'autre utilise l'IA pour générer le brouillon à partir d'un prompt structuré. Comparez le temps nécessaire et la qualité finale du document.

**Proposition de Correction / Solution de référence :**
```text
Cheminement de l'atelier :
1. Agent A (sans IA) : Ouvre Word, cherche un vieux modèle, modifie les champs. Temps moyen observé : 20 minutes.
2. Agent B (avec IA) : Rédige un prompt avec la méthode MAIRE en insérant les données financières. Relecture et ajustement. Temps moyen : 5 minutes.
3. Analyse : Gain de temps de 75%. Discussion sur le fait que la relecture humaine par l'Agent B est l'étape cruciale pour valider les formules de visas légaux (ex. 'Vu le Code Général...').
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La preuve par la pratique : les stagiaires constatent physiquement la réduction drastique du temps de rédaction administrative et le déplacement de leur valeur ajoutée de la saisie vers la relecture.*

---

### Exercice 24 : Atelier Groupe : Co-Rédaction d'un Plan Climat Local
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 40 minutes
- **Objectif de l'exercice :** Élaborer une note d'orientation stratégique environnementale en mode interactif avec l'IA.
- **Intérêt d'animation :** Apprendre à dialoguer par itérations successives avec l'IA pour affiner un projet de service public.

**Consigne / Instructions pour le stagiaire :**
> En groupes de 3, concevez les 5 axes majeurs du Plan Climat Air Énergie Territorial (PCAET) de votre commune. Ne demandez pas tout en un seul prompt : commencez par brainstormer les axes généraux, puis demandez des détails sur l'axe 1, puis des idées d'indicateurs financiers.

**Proposition de Correction / Solution de référence :**
```text
Déroulement de la co-rédaction :
1. Étape 1 : Rédiger un prompt d'idées générales. L'IA propose 10 axes.
2. Étape 2 : Le groupe choisit 5 axes et demande à l'IA d'approfondir l'axe 'Rénovation thermique des bâtiments publics'.
3. Étape 3 : Demander à l'IA des indicateurs de suivi (ex. m3 d'eau économisés, tonnes de CO2 évitées).
4. Étape 4 : Demander la synthèse finale sous forme de note de présentation pour le Conseil Municipal.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Le mode itératif évite le syndrome du 'prompt magique' unique. Il montre que l'IA fonctionne comme un copilote de réflexion avec qui on affine un document étape par étape.*

---

### Exercice 25 : Atelier Groupe : Le Jeu de l'IA Stupide
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Comprendre les limites sémantiques de l'IA en jouant le rôle de la machine.
- **Intérêt d'animation :** Prendre conscience du fait que l'IA n'a aucune intuition humaine et applique les prompts de manière littérale et parfois absurde.

**Consigne / Instructions pour le stagiaire :**
> Le Groupe A rédige un prompt pour demander à dessiner ou écrire une procédure (ex: 'Faire une tasse de café'). Le Groupe B joue le rôle de l'IA et doit appliquer le prompt de manière strictement littérale, sans utiliser le bon sens (si le prompt ne mentionne pas d'ouvrir le placard pour prendre la tasse, le Groupe B fait mine de verser le café sur la table). Estimez les oublis du prompt.

**Proposition de Correction / Solution de référence :**
```text
Exemple d'exercice :
Si le prompt dit : 'Prends la cafetière, verse l'eau dans le filtre et mets le café en route'. L'IA humaine va verser l'eau sur le café moulu sec sans l'avoir mis dans la cafetière, car le prompt a oublié de dire 'ouvre le couvercle de la cafetière'.
Leçon : Un prompt doit guider l'IA étape par étape, sans présupposer qu'elle connaît le contexte implicite de la pièce.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cette expérience ludique montre que l'ordinateur est un exécutant aveugle. Plus les instructions manquent de précision contextuelle, plus le résultat est erroné.*

---

### Exercice 26 : Atelier Groupe : Nettoyage de Prompts (Audit RGPD)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Identifier et supprimer les données nominatives dans des prompts complexes.
- **Intérêt d'animation :** Renforcer le respect du RGPD en apprenant à détecter les fuites potentielles de données personnelles dans les invites rédigées par l'équipe.

**Consigne / Instructions pour le stagiaire :**
> En équipe, examinez une liste de 5 prompts rédigés par d'autres services contenant des informations sensibles (noms d'usagers en litige de cantine, adresses, plaques d'immatriculation). Modifiez ces prompts pour qu'ils soient conformes à la Charte Municipale d'usage de l'IA.

**Proposition de Correction / Solution de référence :**
```text
Exemple de prompt audité :
Avant : 'Aide-moi à répondre à Mme Sophie Martin, habitant au 12 rue des Pins, qui conteste son amende pour chien sans laisse du 12 mars...'
Après : 'Aide-moi à répondre à l'administré [NOM_1] (commune de 5000 hab.) qui conteste un procès-verbal d'infraction à la réglementation des animaux domestiques dans l'espace public...'
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La pseudonymisation des prompts protège l'identité des citoyens tout en permettant à l'IA d'analyser la structure légale du litige.*

---

### Exercice 27 : Atelier Groupe : Le Duel de Rédaction d'Élus
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Faire comparer à l'aveugle un texte rédigé par un agent et un texte rédigé par l'IA.
- **Intérêt d'animation :** Évaluer la qualité stylistique de l'IA et déterminer si l'humain reste indispensable pour la touche finale et l'ancrage local.

**Consigne / Instructions pour le stagiaire :**
> Divisez le groupe en deux. Le Groupe A rédige manuellement une note de bienvenue pour les nouveaux résidents de la commune. Le Groupe B conçoit un prompt pour que l'IA rédige cette même note. Mélangez les copies et faites voter l'ensemble des stagiaires à l'aveugle sur la version la plus chaleureuse et pertinente.

**Proposition de Correction / Solution de référence :**
```text
Débriefing de l'exercice :
Souvent, le texte de l'IA est jugé plus fluide et grammaticalement parfait, mais manque d'anecdotes locales ou de chaleur humaine. Les stagiaires concluent que la solution idéale est hybride : utiliser l'IA pour structurer et rédiger le brouillon, puis ajouter la touche humaine locale manuellement.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice montre que l'IA est un excellent assistant rédactionnel mais ne peut pas remplacer la sensibilité culturelle et la connaissance fine des spécificités locales d'un agent public.*

---

### Exercice 28 : Atelier Groupe : Le Livret d'Accueil du Service
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 40 minutes
- **Objectif de l'exercice :** Rédiger en équipe le livret d'accueil des nouveaux stagiaires de la collectivité.
- **Intérêt d'animation :** Utiliser l'IA pour compiler des informations disparates du service en un document d'accueil unique cohérent.

**Consigne / Instructions pour le stagiaire :**
> En groupes de 4, rassemblez les informations de base de vos services (horaires, codes d'accès, emplacement des bureaux, outils informatiques principaux). Demandez à l'IA de concevoir la structure générale et le contenu rédigé du guide d'accueil du service.

**Proposition de Correction / Solution de référence :**
```text
Cheminement de l'atelier :
1. Rassembler les notes éparses sur un fichier bloc-notes.
2. Écrire le prompt en fournissant ces notes en ressources.
3. Exiger un ton professionnel, encourageant et clair.
4. Demander à l'IA d'insérer des listes de contrôle (checklist) pour le premier jour du stagiaire.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice collaboratif montre comment centraliser les connaissances tacites d'une équipe pour en faire un document de transmission officiel clair.*

---

### Exercice 29 : Atelier Groupe : Modélisation de Workflow (DSI)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 35 minutes
- **Objectif de l'exercice :** Créer le schéma logique du parcours de traitement des demandes d'urbanisme.
- **Intérêt d'animation :** Apprendre à formaliser des processus administratifs complexes sous forme de diagrammes logiques structurés par l'IA.

**Consigne / Instructions pour le stagiaire :**
> En équipe, décrivez par écrit les étapes de validation d'une demande de permis de construire. Demandez à l'IA de traduire cette description textuelle en code Mermaid.js pour générer un organigramme visuel.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Chef de projet urbanisme et organisation.
[AGENT] : Expert en cartographie des processus et diagrammes Mermaid.js.
[INFORMATION] : Génère le code d'un diagramme de flux vertical (graph TD) représentant le traitement d'un permis de construire.
[RESSOURCES] : Étapes : Réception dossier ➔ Vérification complétude (si incomplet ➔ renvoi usager) ➔ Instruction technique ➔ Avis du Maire ➔ Notification finale.
[EXIGENCE] : Utilise exclusivement la syntaxe Mermaid.js standard, sans commentaires textuels en dehors du code.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La modélisation de processus par l'IA sous forme de code visualisable (Mermaid) permet de créer des organigrammes professionnels instantanément pour les manuels de procédure de la mairie.*

---

### Exercice 30 : Atelier Groupe : Campagne de Civisme (Humour)
- **Support requis :** 💻 Ordinateur avec accès internet/LLM
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 25 minutes
- **Objectif de l'exercice :** Créer 3 slogans municipaux percutants contre les incivilités canines.
- **Intérêt d'animation :** Apprendre à générer des idées de communication engageantes en exploitant le registre de l'humour ou de la surprise sémantique.

**Consigne / Instructions pour le stagiaire :**
> En équipe, créez un prompt demandant à l'IA de concevoir 5 slogans humoristiques et percutants pour une campagne d'affichage municipale incitant les propriétaires de chiens à ramasser les déjections sur les trottoirs.

**Proposition de Correction / Solution de référence :**
```text
Prompt modèle :
[MOI] : Chargé de communication d'une commune touristique.
[AGENT] : Concepteur-rédacteur publicitaire réputé pour son humour bienveillant et ses slogans accrocheurs.
[INFORMATION] : Génère 5 slogans courts pour notre campagne d'affichage 'Trottoirs Propres'.
[EXIGENCE] : Les slogans doivent être drôles, sans être agressifs ni vulgaires (ex: 'Votre chien ne peut pas ramasser, mais il compte sur vous'). Longueur maximale par slogan : 10 mots.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La créativité de l'IA (en température élevée) permet de renouveler les discours municipaux traditionnels souvent jugés trop austères ou moralisateurs.*

---

### Exercice 31 : Anatomie d'un Prompt M.A.I.R.E. (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Structurer un prompt complet sur papier en remplissant le gabarit officiel.
- **Intérêt d'animation :** Ancrer la méthodologie de structuration des invites professionnelles en s'affranchissant du PC pour se concentrer sur la logique d'écriture.

**Consigne / Instructions pour le stagiaire :**
> Sur votre feuille, complétez le gabarit M.A.I.R.E. pour demander à une IA de rédiger un courrier aux parents d'élèves annonçant la fermeture exceptionnelle de l'école Pasteur le vendredi suivant pour cause de travaux de chauffage.

**Proposition de Correction / Solution de référence :**
```text
Correction type rédigée sur papier :
[M] : Je suis le directeur de l'école publique Pasteur.
[A] : Assistant administratif spécialisé dans la communication scolaire.
[I] : Rédige une lettre d'information aux parents.
[R] : Motif : Travaux urgents sur la chaudière centrale. Date : Vendredi 24 novembre. Repas de cantine non facturé. Accueil minimum assuré à la maison de l'enfance.
[E] : Lettre claire de 150 mots maximum, ton poli, rassurant mais informatif. Balise [NOM_PARENT] à conserver.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice papier garantit que l'agent a compris l'intérêt de structurer ses consignes avant de se précipiter sur l'ordinateur.*

---

### Exercice 32 : Dessine-moi un Embedding (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Placer 10 mots municipaux sur un graphique vectoriel 2D.
- **Intérêt d'animation :** Visualiser spatialement le fonctionnement mathématique d'un espace vectoriel de mots (Embeddings) et comprendre la proximité sémantique.

**Consigne / Instructions pour le stagiaire :**
> Tracez un repère avec deux axes sur votre feuille : Axe X (Hiérarchie/Pouvoir) et Axe Y (Services Techniques vs Administratifs). Positionnez les 10 mots suivants : 'Maire', 'Mairie', 'Balai', 'Pelle', 'Secrétaire', 'Adjoint', 'Tondeuse', 'Délibération', 'Nid-de-poule', 'Banane'. Expliquez pourquoi 'Banane' est rejeté.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- En haut à droite (Pouvoir + Admin) : 'Maire', 'Adjoint', 'Délibération'.
- En haut à gauche (Pouvoir + Technique) : 'DGS Technique' (si ajouté) ou 'Adjoint aux travaux'.
- En bas à droite (Admin + Faible pouvoir) : 'Secrétaire', 'Mairie'.
- En bas à gauche (Technique + Faible pouvoir) : 'Pelle', 'Balai', 'Tondeuse', 'Nid-de-poule'.
- Banane doit être positionné à l'extrême périphérie (coordonnées neutres ou hors-sujet) car il ne partage aucune relation sémantique avec la vie administrative municipale.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Faire dessiner la carte sémantique permet aux stagiaires de comprendre visuellement que l'IA ne 'comprend' pas les mots comme un humain, mais calcule des distances géométriques entre eux.*

---

### Exercice 33 : Anonymisation de Courrier Public (RGPD Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Identifier et caviarder manuellement les données personnelles d'un texte.
- **Intérêt d'animation :** Prendre l'habitude d'anonymiser systématiquement les données sensibles avant toute saisie dans une IA publique.

**Consigne / Instructions pour le stagiaire :**
> Sur la feuille distribuée contenant le mail de demande de logement social d'un habitant (contenant : Nom, Prénom, adresse, numéro de téléphone, situation de handicap, composition familiale), barrez au feutre noir toutes les données nominatives et remplacez-les par des balises génériques (ex: [NOM_1], [TEL_1]).

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- 'Monsieur Jean Deprez' ➔ 'Monsieur [NOM_1]'
- 'demeurant au 14 rue des Ormes' ➔ 'demeurant au [ADRESSE_1]'
- 'joignable au 06 12 34 56 78' ➔ 'joignable au [TELEPHONE_1]'
- La mention de la maladie ou du handicap doit être généralisée en 'situation de fragilité médicale' pour préserver le secret médical.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*L'anonymisation papier ancre le respect du secret professionnel et du RGPD dans l'esprit des agents comme une étape préalable non négociable.*

---

### Exercice 34 : L'Arbre de Décision Logique d'Aide Sociale (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Écrire un algorithme symbolique strict sous forme de règles 'SI / ALORS'.
- **Intérêt d'animation :** Comprendre la différence entre l'IA symbolique (règles codées par l'humain) et l'IA numérique (apprentissage statistique).

**Consigne / Instructions pour le stagiaire :**
> Sur papier, concevez un arbre de décision strict pour l'attribution d'une aide financière communale de cantine. L'aide est accordée SI le quotient familial est inférieur à 600€, ET SI la famille réside dans la commune, ET SI l'enfant est scolarisé en primaire. Tracez les flèches de décision.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- Étape 1 : Quotient < 600€ ? ➔ OUI (continuer) / NON (Aide refusée).
- Étape 2 : Résident de la commune ? ➔ OUI (continuer) / NON (Aide refusée).
- Étape 3 : Scolarisé en primaire ? ➔ OUI (Aide accordée) / NON (Aide refusée).
Leçon : C'est de l'IA symbolique. Si une règle change (ex. 601€ de quotient), la machine refuse l'aide de manière stricte sans étudier le contexte global humain.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice montre les limites de la logique pure codée à la main face à la complexité des dossiers sociaux du monde réel.*

---

### Exercice 35 : Le Devineur de Température de l'IA (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Identifier la température d'une réponse d'IA à partir de deux textes fournis.
- **Intérêt d'animation :** Comprendre le rôle du curseur de température sur la créativité et la fiabilité factuelle des textes générés.

**Consigne / Instructions pour le stagiaire :**
> On vous distribue deux réponses d'une IA à qui on a demandé d'écrire un slogan pour la bibliothèque municipale. Réponse A : 'La bibliothèque : votre espace de lecture public ouvert du lundi au vendredi'. Réponse B : 'Voyagez à travers les galaxies de l'esprit, là où les livres chuchotent des secrets éternels'. Déterminez quelle réponse correspond à une température basse (0.1) et quelle réponse correspond à une température élevée (0.9).

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- Réponse A ➔ Température basse (0.1). L'IA est restée ultra-factuelle, prévisible et standard.
- Réponse B ➔ Température élevée (0.9). L'IA a choisi des mots plus rares et métaphoriques, s'autorisant de l'audace poétique au détriment de l'information brute (les horaires).
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Comprendre ce paramètre permet d'ajuster l'outil informatique : température basse pour le juridique et le budget, température haute pour la communication et le brainstorming.*

---

### Exercice 36 : Fact-checking Juridique de Note d'Instruction (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Repérer des doutes factuels dans un rapport de synthèse fourni.
- **Intérêt d'animation :** Développer le sens critique indispensable de l'auditeur public. L'IA ne doit jamais être crue sur parole pour les textes réglementaires.

**Consigne / Instructions pour le stagiaire :**
> On vous distribue une note rédigée par une IA sur les règles d'abattage d'arbres remarquables sur l'espace public. Lisez la note et entourez en rouge toutes les affirmations juridiques, numéros d'articles ou pourcentages qui vous semblent nécessiter une vérification manuelle obligatoire.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
Le stagiaire doit entourer : les références d'articles de loi (ex: 'Selon l'article L.123-4...'), les pourcentages d'amende (ex: 'amende de 135 €'), et les exceptions d'urgence. Il doit écrire en marge la source officielle à consulter pour valider ces points (ex: Code de l'Urbanisme, site Légifrance).
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Ancrer la posture de responsabilité de l'agent : l'IA propose, l'humain dispose et valide légalement le texte final.*

---

### Exercice 37 : Calcul de Coût en Tokens d'une API Municipale (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Calculer le coût financier d'une campagne de requêtes automatiques.
- **Intérêt d'animation :** Comprendre l'économie des modèles d'IA facturés à l'usage (au token) pour évaluer la rentabilité d'un projet d'API municipale.

**Consigne / Instructions pour le stagiaire :**
> Une commune souhaite envoyer 5 000 courriels personnalisés de relance fiscale en utilisant l'API de ChatGPT. Chaque courriel généré consomme 500 tokens d'entrée (le prompt) et 300 tokens de sortie (le mail rédigé). Le coût de l'API est de 5$ par million de tokens d'entrée, et de 15$ par million de tokens de sortie. Calculez le coût total de la campagne sur papier.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
1. Calcul des tokens d'entrée : 5 000 x 500 = 2 500 000 tokens. Coût entrée : (2 500 000 / 1 000 000) x 5$ = 12,50$.
2. Calcul des tokens de sortie : 5 000 x 300 = 1 500 000 tokens. Coût sortie : (1 500 000 / 1 000 000) x 15$ = 22,50$.
3. Coût total : 12,50$ + 22,50$ = 35,00$.
Leçon : C'est très économique par rapport au coût de saisie humaine, mais attention à la gestion des prompts longs.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice de calcul concret démystifie la tarification invisible du cloud public pour les gestionnaires administratifs.*

---

### Exercice 38 : Écriture de System Prompt de Guidage (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Écrire les consignes de cadrage d'un assistant virtuel de bibliothèque.
- **Intérêt d'animation :** Apprendre à formuler des contraintes d'exclusion ('ne pas faire') pour maîtriser le comportement d'une IA.

**Consigne / Instructions pour le stagiaire :**
> Rédigez sur papier le System Prompt d'un assistant IA chargé d'aider les usagers de la bibliothèque à trouver des livres. L'assistant ne doit jamais parler de politique, ne doit jamais recommander de livres à caractère violent, et doit s'exprimer dans un langage adapté aux enfants.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
'Tu es l'assistant de lecture de la bibliothèque municipale. Ta mission est de recommander des livres adaptés à l'âge de l'usager. Contraintes strictes : 1) Ne réponds à aucune question sur la politique ou les religions. 2) Interdiction absolue de suggérer des ouvrages d'horreur ou de violence extrême. 3) Si l'usager a moins de 12 ans, utilise des phrases courtes, simples et enthousiastes. 4) Reste neutre et courtois.'
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Formuler des interdits clairs évite les dérives sémantiques ou les réponses hors-sujet de la machine.*

---

### Exercice 39 : Le Traducteur Stupide des Années 70 (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Traduire littéralement des expressions françaises idiomatiques pour comprendre la supériorité des Transformers.
- **Intérêt d'animation :** Comprendre l'évolution historique des modèles d'IA : d'une traduction mot-à-mot logique à une analyse contextuelle globale (Transformers).

**Consigne / Instructions pour le stagiaire :**
> Traduisez littéralement en anglais sur votre feuille les expressions suivantes comme le ferait une vieille IA sans contexte : 'Poser un lapin', 'Mettre la clé sous la porte', 'Avoir du pain sur la planche'. Expliquez la différence avec les IA modernes.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- Traduction littérale : 'To put a rabbit', 'To put the key under the door', 'To have bread on the board'. Cela ne veut rien dire en anglais.
- IA Moderne (Transformer) : Traduit le sens et le contexte : 'To stand someone up', 'To go out of business', 'To have a lot on one's plate'.
Explication : Les IA modernes analysent l'ensemble de la phrase d'un coup grâce au mécanisme d'attention (2017), là où les anciens systèmes traduisaient mot après mot de manière logique mais aveugle.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cette analogie amusante illustre le saut technologique qui a permis l'émergence des LLM récents.*

---

### Exercice 40 : Désescalade Factuelle de Conflit de Voisinage (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Nettoyer un signalement agressif pour n'en garder que la substance technique exploitable par les services.
- **Intérêt d'animation :** Apprendre à extraire des faits objectifs d'un texte chargé d'émotions négatives.

**Consigne / Instructions pour le stagiaire :**
> On vous donne le mot papier d'un riverain agressif : 'Vos éboueurs sont des bons à rien, ils ont renversé ma poubelle devant le 10 rue des Fleurs et mon allée est dégueulasse ! C'est inadmissible, je paie mes impôts !'. Réécrivez ce message sur votre feuille de manière totalement neutre et technique pour le transmettre aux agents de collecte.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
'Signalement : Incident de collecte des déchets.
Lieu : Devant le 10 rue des Fleurs.
Problème : Conteneur à ordures ménagères renversé sur la chaussée lors du passage de la benne de collecte. Déchets éparpillés sur le trottoir.
Action requise : Passage d'une équipe de nettoyage de la voirie.'
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Ce travail d'épuration sémantique est identique à ce qu'on demande à l'IA d'exécuter pour préserver le calme et l'efficacité des agents opérationnels.*

---

### Exercice 41 : Correction d'Erreurs de Prompt (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Identifier les manques de structure dans 3 exemples de prompts réels inefficaces.
- **Intérêt d'animation :** Diagnostiquer pourquoi un prompt échoue pour apprendre à rédiger des requêtes performantes du premier coup.

**Consigne / Instructions pour le stagiaire :**
> Sur votre feuille, analysez ces 3 prompts : 1) 'Fais-moi un rapport sur le budget', 2) 'Rédige une lettre de refus de crèche polie', 3) 'Corrige ce texte : [Texte]'. Indiquez pour chacun l'élément manquant de la méthode MAIRE et réécrivez-les pour les corriger.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
1. Manque : [Moi], [Ressources], [Exigence]. Correction : 'Je suis adjoint aux finances, rédige une note de synthèse à partir de ce fichier Excel budgétaire...'
2. Manque : [Ressources] (pourquoi refuse-t-on le dossier ? barème, manque de places ?). Correction : 'Refuse le dossier en indiquant que la capacité maximale de la crèche Pasteur (60 places) est atteinte...'
3. Manque : [Exigence] (quelle correction ? orthographe simple, style, longueur ?). Correction : 'Corrige uniquement les fautes d'orthographe et de grammaire sans modifier le style ni le vocabulaire.'
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Apprendre à repérer les prompts vagues permet aux stagiaires de comprendre l'origine des réponses floues ou hors-sujet de l'IA.*

---

### Exercice 42 : Calcul de TCO sur 3 ans : Local vs Cloud (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Calculer et comparer la trajectoire financière de deux options de déploiement de l'IA.
- **Intérêt d'animation :** Ancrer les notions de budget d'investissement (CapEx) et de fonctionnement (OpEx) appliquées à l'IA.

**Consigne / Instructions pour le stagiaire :**
> Une collectivité de 100 agents hésite entre : Option A (Achat d'un serveur local pour 20 000 € d'investissement de départ + 3 000 €/an de maintenance et électricité) et Option B (100 abonnements cloud à 15 €/agent/mois, sans investissement initial). Calculez le coût cumulé de chaque option sur 3 ans et déterminez l'option la plus économique.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- Option A (IA Locale) : 20 000 € (Investissement) + (3 ans x 3 000 €) = 29 000 € sur 3 ans.
- Option B (IA Cloud) : 100 agents x 15 € x 12 mois x 3 ans = 54 000 € sur 3 ans.
Conclusion : L'Option A (IA Locale) est plus économique sur 3 ans, permettant d'économiser 25 000 € tout en garantissant la souveraineté totale des données (RGPD).
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cette démonstration mathématique sur papier montre l'intérêt financier à moyen terme des architectures souveraines pour les collectivités d'une certaine taille.*

---

### Exercice 43 : Schéma d'une Boucle Agentique ReAct (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Dessiner le logigramme de fonctionnement d'un agent autonome d'IA.
- **Intérêt d'animation :** Comprendre les étapes de pensée et d'exécution d'un agent pour mieux collaborer avec lui et comprendre ses temps de calcul.

**Consigne / Instructions pour le stagiaire :**
> Tracez un schéma circulaire représentant les 4 étapes de la boucle ReAct de l'agent : 1) Pensée (Thought), 2) Action (Action), 3) Observation (Observation), 4) Correction/Ajustement (Feedback). Donnez un exemple d'application pour chaque étape.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- 1. Pensée : 'Pour créer le fichier, je dois utiliser l'outil d'écriture de fichier.'
- 2. Action : Exécution de l'outil d'écriture de code dans `app.js`.
- 3. Observation : Le système renvoie un message 'Erreur de syntaxe à la ligne 5'.
- 4. Correction : 'Je vais corriger la ligne 5 en ajoutant le caractère manquant.'
Le schéma doit former une boucle fermée montrant l'évaluation autonome.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Dessiner la boucle permet d'assimiler le concept de boucle de rétroaction active, qui différencie un agent d'un simple chat linéaire.*

---

### Exercice 44 : Le Bilan Carbone d'une Requête d'IA (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Calculer l'empreinte environnementale comparée d'une recherche simple et d'une requête IA.
- **Intérêt d'animation :** Sensibiliser les stagiaires aux enjeux d'éco-responsabilité liés au numérique et à l'usage raisonné des technologies génératives.

**Consigne / Instructions pour le stagiaire :**
> Une recherche sur Google consomme 0,0003 kWh. Une requête complexe sur un grand modèle d'IA (type GPT-4) consomme environ 0,01 kWh (soit 30 fois plus). Calculez la consommation électrique annuelle d'un service de 20 agents effectuant chacun 30 requêtes par jour (220 jours travaillés par an) sur l'IA par rapport à Google. Déduisez-en l'équivalent en km parcourus en voiture électrique (1 kWh = 6 km).

**Proposition de Correction / Solution de référence :**
```text
Correction type :
1. Nombre de requêtes totales par an : 20 agents x 30 requêtes/jour x 220 jours = 132 000 requêtes/an.
2. Consommation IA : 132 000 x 0,01 kWh = 1 320 kWh/an.
3. Consommation Google : 132 000 x 0,0003 kWh = 39,6 kWh/an.
4. Surconsommation de l'IA : 1 280,4 kWh/an.
5. Équivalent en voiture électrique : 1 320 kWh x 6 km = 7 920 km (soit un aller-retour Paris-Moscou).
Leçon : Utiliser l'IA de manière ciblée pour des tâches complexes et non pour des recherches simples de définition.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Le calcul de l'impact écologique ancre la sobriété numérique dans la pratique quotidienne des agents publics territoriaux.*

---

### Exercice 45 : Le QCM de Conformité de l'AI Act (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👤 Travail individuel de l'agent
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 10 minutes
- **Objectif de l'exercice :** Classer 5 cas d'usage d'IA dans les catégories de risque de la réglementation européenne.
- **Intérêt d'animation :** Assimiler les obligations légales du règlement européen sur l'IA (AI Act) avant de lancer un projet municipal.

**Consigne / Instructions pour le stagiaire :**
> Pour chacun des 5 projets municipaux suivants, indiquez s'il est classé en risque 'Inacceptable' (Interdit), 'Haut Risque' (Très régulé), 'Risque Limité' (Transparence obligatoire) ou 'Risque Minimal' (Libre) : 1) Tri automatique des candidatures de recrutement des agents de mairie, 2) Vidéosurveillance algorithmique de détection des dépôts sauvages, 3) Chatbot d'accueil des usagers du site web, 4) Correcteur d'orthographe des mails de cabinet, 5) Système de notation sociale des citoyens selon leur civisme.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
1. Recrutement automatique ➔ Haut Risque (Régulé : risque de discrimination sexiste/raciste).
2. Vidéosurveillance algorithmique ➔ Haut Risque / Inacceptable (très encadré par dérogation préfectorale).
3. Chatbot d'accueil usager ➔ Risque Limité (obligation d'afficher la mention 'Vous discutez avec une IA').
4. Correcteur orthographe ➔ Risque Minimal (Usage libre).
5. Notation sociale ➔ Inacceptable (Strictement interdit en Europe).
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Ce test valide la compréhension du cadre éthique et légal européen régissant les déploiements d'IA par les pouvoirs publics.*

---

### Exercice 46 : Atelier Groupe : Le Téléphone Arabe de l'Information (Fun)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Mesurer la perte de fidélité de la transmission d'information humaine.
- **Intérêt d'animation :** Mettre en évidence notre faillibilité biologique de mémorisation et de transmission pour apprécier la rigueur de réplication textuelle de l'IA.

**Consigne / Instructions pour le stagiaire :**
> Le formateur chuchote à l'oreille d'un premier stagiaire une consigne complexe de 4 lignes contenant des dates, des lieux et des contraintes d'horaires. Chaque stagiaire doit la chuchoter à son voisin à l'oreille sans répéter. Le dernier stagiaire écrit le message final sur la feuille. Comparez le message de départ et le message d'arrivée. Calculez le taux de perte.

**Proposition de Correction / Solution de référence :**
```text
Correction / Analyse de l'atelier :
- Message initial : 'Le Conseil Municipal se tiendra le 14 novembre à 18h30 dans la salle des fêtes de Pasteur, avec à l'ordre du jour la rénovation de l'église (budget 150 000€) et les travaux du pont des Fleurs.'
- Message final type : 'Réunion Pasteur le 14 pour des fleurs et l'église à 15 000€.'
Analyse : Perte de 70% des informations et falsification du budget (divisé par 10). L'humain filtre et déforme l'information involontairement sous l'effet de l'attention sélective. L'IA, elle, réplique et transmet l'information textuelle brute avec une fidélité de 100%.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice physique et ludique prouve aux stagiaires qu'ils ont besoin d'outils structurés (comme l'IA) pour archiver, synthétiser et transmettre des données complexes sans distorsion sémantique.*

---

### Exercice 47 : Atelier Groupe : L'Ordinateur Humain (Jeu de rôle)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Comprendre le fonctionnement d'un processeur et de la mémoire vive.
- **Intérêt d'animation :** Démystifier le matériel informatique en faisant mimer le parcours d'une donnée par les stagiaires.

**Consigne / Instructions pour le stagiaire :**
> Divisez le groupe de 4 : un joueur joue le Rôle de l'Utilisateur (qui donne une consigne papier), un joueur joue le CPU (qui applique des calculs logiques simples), un joueur joue la RAM (qui stocke les résultats temporaires sur des post-its), et un joueur joue le Disque Dur (qui conserve la base de données finale). Exécutez le calcul d'une moyenne de notes sur papier.

**Proposition de Correction / Solution de référence :**
```text
Déroulement de l'exercice :
1. L'Utilisateur donne les notes : 12, 14, 16.
2. Le CPU demande à la RAM de noter les chiffres sur des post-its séparés.
3. Le CPU calcule la somme (12+14+16 = 42) et demande à la RAM de l'écrire.
4. Le CPU divise par 3 (42/3 = 14).
5. Le CPU demande au Disque Dur d'écrire de manière permanente le résultat 'Moyenne = 14' dans le cahier.
Leçon : Un ordinateur fonctionne de manière séquentielle et segmentée, chaque composant ayant un rôle physique strict.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Comprendre l'architecture matérielle aide à saisir le concept d'inférence et les limites physiques (comme le goulot d'étranglement de la mémoire).*

---

### Exercice 48 : Atelier Groupe : Débat Mouvant Éthique & IA
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Débattre et se positionner sur les risques démocratiques et de souveraineté de l'IA.
- **Intérêt d'animation :** Développer une posture réflexive et nuancée face aux bouleversements technologiques dans le service public.

**Consigne / Instructions pour le stagiaire :**
> Le formateur énonce une affirmation polémique (ex: 'L'IA va remplacer 30% des agents administratifs d'ici 5 ans' ou 'Utiliser ChatGPT en mairie devrait être interdit par la loi'). Les stagiaires se déplacent physiquement sur une ligne tracée au sol : à gauche s'ils sont 'D'accord', à droite s'ils sont 'Désaccord', au centre s'ils sont 'Neutres'. Chacun leur tour, ils expliquent leur position et peuvent faire bouger les autres.

**Proposition de Correction / Solution de référence :**
```text
Déroulement du débat :
L'objectif n'est pas d'avoir une réponse unique, mais de confronter les arguments : gains de productivité pour se recentrer sur l'accueil humain vs risques de déshumanisation, souveraineté numérique européenne (Mistral) vs hégémonie américaine (OpenAI/Cloud Act). Le formateur note les arguments sur le tableau.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La confrontation bienveillante d'idées permet d'accompagner le changement technologique en écoutant les craintes des agents.*

---

### Exercice 49 : Atelier Groupe : Tri de Projets AI Act (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 25 minutes
- **Objectif de l'exercice :** Évaluer la faisabilité réglementaire de 4 projets d'IA municipaux.
- **Intérêt d'animation :** Appliquer concrètement le cadre de l'AI Act européen sur des projets d'urbanisme, de sécurité et d'éducation de la commune.

**Consigne / Instructions pour le stagiaire :**
> En groupe, tracez la pyramide des risques de l'AI Act sur une grande feuille. Positionnez des cartes décrivant 4 projets municipaux réels : 1) Analyse automatique de la fatigue des agents routiers par caméra thermique, 2) Attribution automatisée des logements sociaux par algorithme prédictif, 3) Caméra intelligente de comptage des vélos pour les pistes cyclables, 4) Détection des fuites d'eau par capteurs de pression intelligents. Justifiez vos choix de classification réglementaire.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- Projet 1 (Fatigue agents) ➔ Haut Risque (Surveillance de l'emploi, risque d'atteinte aux droits des travailleurs).
- Projet 2 (Logement social) ➔ Haut Risque (Attribution d'aides sociales et accès à des services essentiels).
- Projet 3 (Comptage vélos) ➔ Risque Minimal (Données anonymes de trafic, pas d'identification de personnes).
- Projet 4 (Fuites d'eau) ➔ Risque Minimal (Maintenance d'infrastructure non humaine).
Conclusion : Les projets 1 et 2 nécessiteront un audit de conformité lourd et une supervision humaine stricte avant tout déploiement.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice opérationnel évite de lancer des projets d'IA municipaux illégaux ou soumis à des amendes européennes majeures.*

---

### Exercice 50 : Atelier Groupe : Duel de Vitesse Écrite (IA vs Humain)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Prendre conscience du gain de temps de rédaction sur un document administratif simple.
- **Intérêt d'animation :** Comparer physiquement la vitesse de génération et le coût humain de production de documents administratifs.

**Consigne / Instructions pour le stagiaire :**
> Divisez la table en deux. À gauche, un stagiaire rédige à la main une note d'excuse pour fermeture de cantine scolaire. À droite, un binôme rédige un prompt MAIRE, le soumet à l'IA, et imprime le résultat. Chronométrez les deux approches. Calculez le coût en temps de travail (salaire horaire moyen de 25€/h) de chaque version.

**Proposition de Correction / Solution de référence :**
```text
Correction / Débriefing type :
- Version manuelle : Rédigée en 12 minutes. Coût agent : (12/60) x 25 € = 5,00 €.
- Version IA : Rédigée en 3 minutes (prompt + génération + impression). Coût agent : (3/60) x 25 € = 1,25 €.
- Gain : 3,75 € d'économie de temps de travail par note rédigée. Multiplié par le nombre de courriers annuels, le gain de productivité pour le service s'élève à plusieurs milliers d'euros, réaffectable à l'accompagnement physique des usagers.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Traduire les minutes gagnées en coût horaire réel pour la collectivité donne une assise budgétaire concrète aux formations IA.*

---

### Exercice 51 : Atelier Groupe : Rédaction Collaborative de la Charte IA
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Rédiger et négocier en groupe les 3 règles d'or de l'usage de l'IA dans leur service.
- **Intérêt d'animation :** Créer un consensus d'équipe sur les limites éthiques et la sécurité des données applicables à leur propre service quotidien.

**Consigne / Instructions pour le stagiaire :**
> En groupe de 4, identifiez les 3 risques majeurs liés à l'usage de l'IA dans votre service (ex: secrétariat ou espaces verts). Rédigez sur une affiche les 3 règles d'or de comportement obligatoires pour y faire face (ex: 'Règle 1 : Anonymisation stricte...').

**Proposition de Correction / Solution de référence :**
```text
Correction type :
Affiche finale de groupe contenant par exemple :
'1. Tout texte collé dans l'IA externe doit être expurgé de tout nom d'usager.
2. L'IA ne sert que de brouillon : interdiction de copier-coller une réponse sans relecture complète.
3. Chaque source juridique citée par l'IA doit être vérifiée sur Légifrance ou le règlement intérieur de la mairie.'
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La charte rédigée par les agents eux-mêmes est beaucoup mieux acceptée et appliquée au quotidien que des consignes imposées par la direction.*

---

### Exercice 52 : Atelier Groupe : Le Jeu des Hallucinations (Piéger l'équipe)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Apprendre à repérer les biais d'autorité et les faux arguments techniques de l'IA.
- **Intérêt d'animation :** Comprendre à quel point une hallucination peut paraître crédible en faisant créer de fausses informations plausibles par les stagiaires.

**Consigne / Instructions pour le stagiaire :**
> Chaque groupe doit rédiger sur papier 3 affirmations sur l'histoire de la commune ou sur le règlement municipal : 2 vraies et 1 fausse mais rédigée dans un style administratif ultra-crédible et convaincant (ex. citant un faux article du CGCT L. 999-99). Le groupe adverse doit identifier la fausse. Comparez les techniques de manipulation sémantique.

**Proposition de Correction / Solution de référence :**
```text
Débriefing de l'exercice :
Les stagiaires constatent qu'il est très facile de se faire piéger par un ton formel et autoritaire (le biais d'autorité), ce qui est exactement la manière dont l'IA commet des hallucinations sémantiques.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Ce jeu développe l'esprit critique et l'attention lors de la relecture des textes générés par la machine.*

---

### Exercice 53 : Atelier Groupe : Cartographie des Tâches Éligibles
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Établir la liste des missions du service à automatiser vs à conserver à la main.
- **Intérêt d'animation :** Identifier de manière pragmatique les gains d'efficacité possibles au sein du service pour réorganiser le travail des agents.

**Consigne / Instructions pour le stagiaire :**
> Sur une grande feuille, listez toutes les tâches hebdomadaires de votre service. Divisez la feuille en 3 colonnes : 1) Tâches 100% Humaines (Relation humaine, accueil physique, arbitrage légal), 2) Tâches Hybrides (Rédaction de courriers, rapports, synthèses, programmation), 3) Tâches à Automatiser par l'IA (Correction d'orthographe, tri de données brutes, traductions). Débâtez de la répartition.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- 100% Humain : Médiation de conflit usager, célébration des mariages, signature officielle des marchés.
- Hybride : Rédaction de notes d'orientation, élaboration du budget initial, création de grilles d'évaluation.
- Automatisation IA : Traduction de brochures touristiques, correction orthographique de masse, formatage CSV.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet audit interne des processus rassure les agents : l'IA ne remplace pas leur cœur de métier social mais absorbe les tâches répétitives.*

---

### Exercice 54 : Atelier Groupe : La Traduction du Silence (Prompt Vague)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Analyser et lister les malentendus générés par un prompt trop court.
- **Intérêt d'animation :** Comprendre pourquoi le manque de contexte force l'IA à piocher dans des généralités moyennes (hallucinations ou clichés).

**Consigne / Instructions pour le stagiaire :**
> Prenez le prompt suivant écrit sur papier : 'Rédige une lettre pour un problème de stationnement'. Listez sur votre feuille les 10 questions sans réponse auxquelles l'IA va devoir répondre au hasard (ex: Qui écrit ? À qui ? Quel est le problème de stationnement ? Y a-t-il une amende ? Quel est le ton ?...). Écrivez le prompt corrigé.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
Les 10 inconnues du prompt vague : 1) Qui est l'expéditeur (maire, citoyen, policier municipal) ? 2) Qui est le destinataire ? 3) Quelle est l'infraction ? 4) Quel est le montant de l'amende ? 5) Dans quelle rue ? 6) Quel est le ton attendu ? 7) Quel est le format (lettre recommandée, mail) ? 8) Quel est le délai de recours ? 9) Quelles pièces joindre ? 10) Quelle est la décision de la mairie ?
Leçon : Sans ces réponses, l'IA va inventer (halluciner) 10 faits pour combler le vide.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet exercice démontre de manière logique l'exigence de contexte (le pont sensoriel du prompt) pour obtenir une réponse exploitable.*

---

### Exercice 55 : Atelier Groupe : Le Procès de l'IA Municipale (Jeu de rôle)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 40 minutes
- **Objectif de l'exercice :** Débattre de la souveraineté juridique et de l'efficacité opérationnelle à travers un procès fictif.
- **Intérêt d'animation :** Confronter de manière théâtrale et stimulante les visions opposées de l'IA souveraine locale vs l'IA cloud américaine.

**Consigne / Instructions pour le stagiaire :**
> Organisez un jeu de rôle sur papier : Le Procès de l'IA. Un groupe joue l'Accusation (défenseurs de la souveraineté, du RGPD strict et de l'IA locale sur serveur physique). Un groupe joue la Défense (défenseurs du gain de temps maximal, de la flexibilité financière et de l'IA cloud des géants). Un groupe joue les Juges municipaux et doit rendre sa délibération de compromis.

**Proposition de Correction / Solution de référence :**
```text
Déroulement du jeu de rôle :
Chaque groupe rédige ses plaidoiries sur papier (durée 15 minutes), puis passe à la plaidoirie orale (3 minutes par groupe). Les juges délibèrent et rédigent un compromis : ex. adoption d'une solution hybride (serveur local pour les données de santé et l'urbanisme sensible, abonnements cloud anonymisés via passerelle pour la communication et le secrétariat général).
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Le jeu de rôle théâtralisé désinhibe la parole des stagiaires et permet d'assimiler des contraintes juridiques complexes de manière mémorable.*

---

### Exercice 56 : Atelier Groupe : L'Arbre des Conséquences (RH)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 25 minutes
- **Objectif de l'exercice :** Évaluer l'impact social et humain du déploiement de l'IA sur l'organisation des services.
- **Intérêt d'animation :** Projeter les mutations de compétences au sein des équipes administratives pour anticiper les besoins de formation.

**Consigne / Instructions pour le stagiaire :**
> Tracez un tronc sur votre feuille représentant l'affirmation : 'Intégration massive de l'IA dans le service administratif'. Dessinez des branches pour les conséquences positives (gain de temps, réduction du stress de saisie, plus de temps de contact usager) et des racines pour les conditions requises (formation obligatoire, équipement, conformité RGPD). Dessinez à droite les branches mortes (tâches supprimées, ex. classement manuel).

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- Branches positives : recentrage sur l'accueil humain, revalorisation des postes d'agents, réduction des erreurs de saisie.
- Branches mortes (obsolètes) : saisie manuelle de données brutes, rédaction de courriers administratifs répétitifs à partir de zéro.
- Racines (conditions d'accès) : formation aux prompts, mise en place de serveurs en Europe, définition d'une charte d'utilisation claire.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Cet outil d'analyse visuelle aide les managers de collectivités à anticiper l'impact de l'IA sur leurs équipes en le visualisant.*

---

### Exercice 57 : Calculateur de Gain Financier Annuel d'Équipe (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 20 minutes
- **Objectif de l'exercice :** Calculer le retour sur investissement d'une formation IA sur une équipe de 10 agents.
- **Intérêt d'animation :** Calculer concrètement le gain financier indirect d'une montée en compétences technologiques.

**Consigne / Instructions pour le stagiaire :**
> Une formation à l'IA fait gagner en moyenne 3 heures de saisie et de rédaction par semaine à un agent administratif. Pour une équipe de 10 agents payés en moyenne 22 € bruts de l'heure (charges comprises), calculez le gain de temps annuel en heures et en équivalent financier (sur 44 semaines travaillées par an). Comparez cela au coût d'achat d'une licence Pro annuelle à 240 € par agent.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
1. Gain de temps hebdomadaire de l'équipe : 10 agents x 3 heures = 30 heures/semaine.
2. Gain de temps annuel de l'équipe : 30 heures x 44 semaines = 1 320 heures de travail économisées par an.
3. Gain financier annuel indirect : 1 320 heures x 22 € = 29 040 € d'économie de temps de travail par an.
4. Coût des licences Pro pour l'équipe : 10 agents x 240 € = 2 400 € / an.
Conclusion : Le gain de productivité annuel (29 040 €) est plus de 12 fois supérieur au coût d'acquisition des licences d'IA Pro (2 400 €). Le retour sur investissement est immédiat pour la collectivité.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La traduction des gains de temps en indicateurs financiers objectifs permet de valider le budget de formation auprès des élus et du DGS.*

---

### Exercice 58 : Le Jeu de Cartes des Alliances d'IA (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `fun` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 15 minutes
- **Objectif de l'exercice :** Associer correctement les acteurs mondiaux de l'IA à leurs modèles et spécificités juridiques.
- **Intérêt d'animation :** Cartographier la géopolitique de l'IA de manière ludique sur table pour retenir qui fait quoi et sous quelle souveraineté.

**Consigne / Instructions pour le stagiaire :**
> Sur des post-its découpés sur table, associez chaque 'Acteur' (OpenAI, Microsoft, Google, Anthropic, Mistral AI) à sa 'Nationalité/Hébergement' (États-Unis/Cloud Act vs France/Souverain), son 'Modèle' (GPT, Gemini, Claude, Mistral) et sa 'Cible' (Bureautique intégrée, Grand public, Entreprises sécurisées, Hébergement local).

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- OpenAI ➔ États-Unis ➔ GPT ➔ Grand public & Grand volume.
- Microsoft ➔ États-Unis ➔ Copilot ➔ Bureautique Office / Windows.
- Google ➔ États-Unis ➔ Gemini ➔ Recherche web & Efficacité TPU.
- Anthropic ➔ États-Unis ➔ Claude ➔ Sécurité d'écriture & Contextes longs.
- Mistral AI ➔ France ➔ Codestral / Mistral Large ➔ Souveraineté européenne & Modèles hébergeables localement.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*La manipulation de post-its sur table ancre la mémoire visuelle et clarifie le marché géopolitique de l'IA pour les décideurs.*

---

### Exercice 59 : Cartographie RGPD du Trajet de la Donnée (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `pratique` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 30 minutes
- **Objectif de l'exercice :** Dessiner le trajet d'un courriel d'administré pour vérifier sa conformité RGPD.
- **Intérêt d'animation :** Comprendre où voyagent les données des citoyens lors de l'utilisation de serveurs cloud et identifier les fuites de souveraineté.

**Consigne / Instructions pour le stagiaire :**
> Dessinez sur une grande feuille le trajet d'un courriel contenant un nom et un numéro d'usager. Tracez la ligne de passage à l'étranger dans deux cas : Cas A (L'agent copie-colle le texte dans ChatGPT Plus américain) et Cas B (L'agent utilise l'anonymiseur local puis envoie le texte à un serveur d'IA souverain hébergé en Europe).

**Proposition de Correction / Solution de référence :**
```text
Correction type :
- Cas A (ChatGPT brut) : Écran PC agent ➔ Box internet ➔ Câble sous-marin Atlantique ➔ Serveurs OpenAI (États-Unis). Donnée soumise au Cloud Act et accessible par le renseignement US. Non-conforme RGPD.
- Cas B (Anonymisé + Souverain) : Écran PC agent ➔ Anonymiseur JS local (les noms deviennent [NOM_1], la donnée ne sort pas du PC) ➔ Envoi du texte anonymisé vers un serveur hébergé à Francfort (Europe). Conforme RGPD.
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Visualiser physiquement le voyage des octets à travers l'océan Atlantique responsabilise les agents sur le geste du copier-coller.*

---

### Exercice 60 : Atelier Groupe : La Co-correction d'Évaluation (Papier)
- **Support requis :** 📝 Feuille papier et crayons
- **Format d'animation :** 👥 Atelier collectif en sous-groupes
- **Type pédagogique :** `efficacite` (pratique = écriture de prompt, efficacite = processus administratifs, fun = ludique / apprentissage indirect)
- **Durée estimée :** 25 minutes
- **Objectif de l'exercice :** Corriger en équipe les erreurs d'un prompt rédigé en fin de formation.
- **Intérêt d'animation :** Clore la formation en jouant le rôle de correcteurs d'invites pour consolider l'ensemble des acquis pédagogiques de la journée.

**Consigne / Instructions pour le stagiaire :**
> On vous distribue un prompt papier rédigé par un élève fictif en fin de stage contenant plusieurs fautes graves (manque d'anonymisation d'usager, consigne floue sans contraintes de format, ton inadapté). Corrigez le texte en rouge et réécrivez le prompt d'examen parfait.

**Proposition de Correction / Solution de référence :**
```text
Correction type :
Le prompt fautif contenait : 'Rédige une lettre de relance de facture de cantine de 50€ pour Mme Deprez Julie'.
Les stagiaires doivent entourer et corriger : 1) 'Mme Deprez Julie' ➔ Doit être remplacé par '[NOM_1]'. 2) 'Rédige une lettre' ➔ Manque [Moi], [Agent], [Exigence].
Réécriture correcte : '[MOI] Je suis comptable en mairie... [AGENT] Agis en médiateur financier... [INFORMATION] Conçois une lettre de rappel de paiement pour l'administré [NOM_1]... [RESSOURCES] Facture de cantine scolaire impayée de 50€... [EXIGENCE] Lettre de 150 mots maximum, ton ferme mais respectueux. Indique les modes de paiement (chèque, virement, TIPI).'
```

**Raisonnement pédagogique / Commentaire du formateur :**
*Devenir correcteur d'invites est le meilleur moyen de valider l'autonomie rédactionnelle des agents à l'issue de leur parcours de formation.*

---

## Architecture de la Base de Données (Supabase SQL Schema)

Pour assurer le pilotage interactif en temps réel (synchronisation formateur-stagiaires, presences et soumission des quiz), l'application s'appuie sur le schéma PostgreSQL suivant exécuté sur Supabase :

### Script SQL de Déploiement et RLS (Supabase Setup)
```sql
-- ==========================================
-- FORMATION IA TERRITORIALE - SUPABASE SETUP
-- ==========================================
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase (https://supabase.com)
-- N'oubliez pas de sélectionner la région Europe/Francfort pour la conformité RGPD.

-- 1. Nettoyage (optionnel si ré-installation)
DROP TABLE IF EXISTS public.votes CASCADE;
DROP TABLE IF EXISTS public.presences CASCADE;
DROP TABLE IF EXISTS public.sessions CASCADE;

-- 2. Table des Sessions (Contrôle de l'état de la formation par le formateur)
CREATE TABLE public.sessions (
    id integer PRIMARY KEY,
    active_theme_id text,
    active_slide_index integer DEFAULT 0,
    active_poll_id text,
    show_results boolean DEFAULT false,
    active_exercise_id integer,
    updated_at timestamp with time zone DEFAULT now()
);

-- Insérer la session par défaut n°1
INSERT INTO public.sessions (id, active_theme_id, active_slide_index, show_results) 
VALUES (1, 'histoire-ia', 0, false) 
ON CONFLICT (id) DO NOTHING;

-- 3. Table des Présences (Liste des stagiaires connectés)
CREATE TABLE public.presences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id integer REFERENCES public.sessions(id) ON DELETE CASCADE,
    prenom text NOT NULL,
    last_seen_at timestamp with time zone DEFAULT now()
);

-- Index pour accélérer le nettoyage
CREATE INDEX idx_presences_last_seen ON public.presences(last_seen_at);

-- 4. Table des Votes (Comptabilisation des réponses et soumissions d'exercices)
CREATE TABLE public.votes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id integer REFERENCES public.sessions(id) ON DELETE CASCADE,
    poll_id text NOT NULL, -- Peut être un ID de quiz (ex. "Q1") ou d'exercice (ex. "ex-5")
    prenom text NOT NULL,
    reponse text NOT NULL, -- Option A/B/C/D ou texte libre rédigé pour un exercice
    is_correct boolean DEFAULT NULL, -- NULL pour les sondages et les exercices, TRUE/FALSE pour les quiz
    created_at timestamp with time zone DEFAULT now(),
    -- Contrainte d'unicité pour empêcher de voter plusieurs fois pour la même question
    CONSTRAINT unique_session_poll_user UNIQUE(session_id, poll_id, prenom)
);

-- ==========================================
-- 5. ACTIVATION DU TEMPS RÉEL (REALTIME)
-- ==========================================
-- Indique à Supabase de diffuser les modifications de ces tables aux navigateurs abonnés.

-- Créer la publication si elle n'existe pas
do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
end $$;

-- Retirer les anciennes tables de la publication si elles y étaient déjà (évite les doublons)
do $$
begin
  alter publication supabase_realtime drop table public.sessions, public.presences, public.votes;
exception when others then
  -- Ignore les erreurs si les tables n'y sont pas associées
end $$;

alter publication supabase_realtime add table public.sessions, public.presences, public.votes;

-- ==========================================
-- 6. POLITIQUES DE SÉCURITÉ (RLS)
-- ==========================================
-- Active la protection au niveau de la base de données.

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- POLITIQUES SUR LA TABLE SESSIONS
-- Tout le monde peut voir la slide active
CREATE POLICY "Tout le monde peut voir la session active" 
ON public.sessions FOR SELECT USING (true);

-- Seul le formateur authentifié (admin@admin.fr) peut modifier la session
CREATE POLICY "Seul le formateur connecté peut modifier la session" 
ON public.sessions FOR ALL TO authenticated USING (true);


-- POLITIQUES SUR LA TABLE PRESENCES
-- Tout le monde peut voir qui est connecté
CREATE POLICY "Tout le monde peut voir les presences" 
ON public.presences FOR SELECT USING (true);

-- Les stagiaires anonymes peuvent déclarer leur prénom
CREATE POLICY "Tout le monde peut s'inscrire en presence" 
ON public.presences FOR INSERT WITH CHECK (true);

-- Les stagiaires peuvent mettre à jour leur battement de coeur (last_seen_at)
CREATE POLICY "Chacun peut modifier son etat de presence" 
ON public.presences FOR ALL USING (true);


-- POLITIQUES SUR LA TABLE VOTES
-- L'admin authentifié (formateur) peut lire tous les votes en détail
CREATE POLICY "Le formateur peut lire tous les votes" 
ON public.votes FOR SELECT TO authenticated USING (true);

-- Les stagiaires anonymes peuvent lire les votes (pour voir les statistiques ou leur propre vote)
CREATE POLICY "Tout le monde peut lire les votes" 
ON public.votes FOR SELECT USING (true);

-- Les stagiaires anonymes peuvent insérer leur vote
CREATE POLICY "Tout le monde peut voter" 
ON public.votes FOR INSERT WITH CHECK (true);

-- Les stagiaires anonymes peuvent corriger leur vote si la session le permet
CREATE POLICY "Tout le monde peut modifier son vote" 
ON public.votes FOR UPDATE USING (true);

-- Tout le monde peut supprimer des votes (requis pour réinitialiser et relancer les quiz/exercices)
CREATE POLICY "Tout le monde peut supprimer des votes" 
ON public.votes FOR DELETE USING (true);

```

