# Architecture Système & Guide de Maintenance (Antigravity 2.0)

Ce document décrit l'organisation du code source de l'application de formation interactive **Formation IA Territoriale**. Il sert de carte de repérage pour les développeurs et les assistants de codage autonomes (comme Antigravity) afin d'optimiser les modifications futures.

---

## 1. Structure Générale des Fichiers

L'application est entièrement construite avec des technologies web standards (HTML5, CSS3, JavaScript ES6) sans dépendances de compilation ou de packaging complexes, afin de pouvoir être exécutée directement hors ligne via le protocole `file://` (double-clic sur `index.html`).

```mermaid
graph TD
    index.html --> style.css
    index.html --> content.js
    index.html --> exercises.js
    index.html --> slide_renderer.js
    index.html --> app.js
    index.html --> app_slides.js
    index.html --> app_supabase.js
    index.html --> app_interactivity.js
```

### Répartition des Fichiers :

| Fichier | Rôle | Description |
| :--- | :--- | :--- |
| [index.html](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/index.html) | Structure | Squelette HTML5 (Sidebar, Visionneuse de slides, Overlays d'authentification, Panneau d'interactivité). |
| [style.css](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/style.css) | Style | Feuilles de styles complètes (Premium, Thèmes de couleurs HSL, animations, responsive design). |
| [content.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/content.js) | Données (Slides) | Base de données de cours `THEMES` (12 thèmes), les 25+ types de rendus de slides (dont `vram-hardware-singularity` et `legal-charter-risks`), et les questions interactives standardisées `INTERACTIVE_QUESTIONS` (4 options : juste, piège, blague, neutre). |
| [exercises.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/exercises.js) | Données (Exercices) | Banque de 60 exercices pratiques (`EXERCISES_DATABASE`) avec énoncés, corrigés et buts pédagogiques. |
| [slide_renderer.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/slide_renderer.js) | Rendu UI | Moteur de génération HTML dynamique (`getSlideHTML()`) selon le type de diapositive (`slide.type`). |
| [app.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/app.js) | Noyau Applicatif | Cycle de vie de la classe `TrainingApp`, routage des diapositives, navigation globale et barre latérale. |
| [app_slides.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/app_slides.js) | Outils Diapos | Évènements et comportements des slides interactives (Tokenisation, Anonymiseur 3 dossiers, Calculateur VRAM & Singularité, Matrice Risques & Charte IA, Calculateur SecNumCloud, Filtres catalogue). |
| [app_supabase.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/app_supabase.js) | Synchro Base | Connexion Supabase Client, Heartbeats de présence des participants, abonnements Realtime aux sessions. |
| [app_interactivity.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/app_interactivity.js) | Drawer d'Interaction | Contrôle et vote des Sondages/Quiz/Tests interactifs pour le formateur et les stagiaires (4 options standardisées A, B, C, D). Instanciation globale de l'App. |

---

## 2. Cycle de Vie de la Classe `TrainingApp`

L'application repose sur la classe globale `TrainingApp` instanciée au chargement du document (`DOMContentLoaded`). Sa logique est fragmentée sur le prototype partagé :

```
[app.js] ➔ Déclare la classe et son constructeur
    │
    ├── [app_slides.js] ➔ Attache TrainingApp.prototype.runTokenSandbox, etc.
    ├── [app_supabase.js] ➔ Attache TrainingApp.prototype.initSupabase, etc.
    └── [app_interactivity.js] ➔ Attache TrainingApp.prototype.startPoll, etc. ➔ Lance new TrainingApp()
```

### Initialisation (Constructeur) :
1. `this.detectRole()` : Détermine le rôle de l'utilisateur (`public`, `stagiaire` ou `formateur`) selon l'URL (ex. `?role=stagiaire` ou `?role=formateur`) ou le stockage local.
2. `this.initSupabase()` : Initialise le client Supabase (connexion à la base distante). En cas d'échec ou d'absence de réseau, l'application bascule automatiquement en mode autonome (Heartbeat simulé localement).
3. `this.initElements()` & `this.initEvents()` : Lie les boutons de navigation et les écouteurs de touches clavier (Flèches Gauche/Droite).
4. `this.renderSidebar()` & `this.renderHomeDashboard()` : Construit dynamiquement les menus à partir du tableau `THEMES` (12 thèmes).
5. `this.initInteractivity()` : Déclenche les abonnements Realtime si un canal Supabase est disponible.

---

## 3. Rôles et Comportements Applicatifs

L'application adapte ses contrôles et son affichage selon trois rôles :

### A. Rôle Public (`public`)
*   **But :** Lecture autonome des diapositives.
*   **Fonctionnalités :** Navigation libre, accès à tous les modules interactifs locaux (tokeniseur, anonymiseur 3 dossiers, calculateur VRAM/Singularité, matrice juridique Charte IA, calculateur de coût SecNumCloud), accès au catalogue des 60 exercices et leurs solutions en lecture seule. Pas de synchronisation distante.

### B. Rôle Stagiaire (`stagiaire`)
*   **But :** Suivre le formateur en direct et voter aux questions posées.
*   **Fonctionnalités :** Navigation et clavier bloqués. L'écran de diapositive suit automatiquement les actions du formateur en temps réel. Lorsque le formateur ouvre un quiz ou un atelier, le tiroir d'interactivité s'ouvre automatiquement pour que le stagiaire vote ou rédige sa réponse (parmi les 4 choix A, B, C, D).

### C. Rôle Formateur (`formateur`)
*   **But :** Animer et piloter la session de formation.
*   **Fonctionnalités :** Navigation libre. L'emplacement de sa slide est diffusé en direct à tous les stagiaires connectés. Il dispose d'un bouton pour lancer des quiz/sondages ou pousser des exercices d'ateliers sur l'écran des stagiaires, clôturer les votes et afficher les statistiques de réponses.

---

## 4. Guide de Maintenance et Bonnes Pratiques

### Modification des Données de Cours (Slides) :
*   Pour modifier le texte d'un cours ou ajouter des diapositives, éditez uniquement [content.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/content.js).
*   Si vous ajoutez un nouveau type d'affichage sémantique (ex: `vram-hardware-singularity`, `legal-charter-risks`), implémentez son rendu HTML dans [slide_renderer.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/slide_renderer.js) et ses évènements interactifs éventuels dans [app_slides.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/app_slides.js).

### Modification des Quiz & Questions Interactives :
*   Les 12 questionnaires interactifs de thème ainsi que l'évaluation de stage se trouvent dans `INTERACTIVE_QUESTIONS` et la slide `eval-stage` dans [content.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/content.js). Chaque question doit systématiquement comporter 4 options (1 juste, 1 piège, 1 blague, 1 neutre).

### Modification des Exercices :
*   La banque d'exercices se trouve dans [exercises.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/exercises.js). Chaque exercice possède un format (`individuel`/`groupe`), un type (`pratique`/`efficacite`/`fun`), un support (`pc`/`papier`), et son corrigé.

### Modification du pilotage temps réel :
*   Toute la gestion des tables PostgreSQL (`sessions`, `presences`, `votes`) et des canaux de communication realtime de Supabase s'effectue dans [app_supabase.js](file:///c:/Users/mjacquiot/Documents/Tests%20index.html/Formation%20IA/app_supabase.js).
