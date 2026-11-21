# Architecture Système & Guide de Maintenance

Ce document décrit l'organisation du code source de l'application de formation interactive **Formation IA Territoriale** (hébergée sur `lecontrole.fr`). Il sert de carte de repérage pour la maintenance et les évolutions futures.

---

## 1. Structure Générale des Fichiers

L'application est entièrement construite avec des technologies web standards (HTML5, CSS3, JavaScript ES6) sans étape de build ni dépendances npm obligatoires, afin de pouvoir être exécutée aussi bien en ligne (GitHub Pages) qu'en mode autonome hors-ligne via le protocole `file://` (double-clic sur `index.html`).

```mermaid
graph TD
    index.html --> style.css
    index.html --> content.js
    index.html --> exercises.js
    index.html --> slide_renderer.js
    index.html --> qrcode_local.js
    index.html --> app.js
    index.html --> app_slides.js
    index.html --> app_supabase.js
    index.html --> app_interactivity.js
```

### Répartition des Fichiers :

| Fichier | Rôle | Description |
| :--- | :--- | :--- |
| [index.html](./index.html) | Structure | Squelette HTML5 (Sidebar, Visionneuse de slides, Overlays d'authentification, Projecteur HTML sandboxé, Panneau d'interactivité). |
| [style.css](./style.css) | Style | Feuilles de styles complètes (Thèmes par catégorie, responsive mobile, animations, pillule de ré-entrée stagiaire). |
| [content.js](./content.js) | Données (Slides) | Base de cours `THEMES` (**12 thèmes**, **55 diapositives**, **50 types de rendus**), évaluation finale (`eval-stage` à 5 questions) et banque `INTERACTIVE_QUESTIONS` (**10 quiz interactifs** à 4 options A/B/C/D). |
| [exercises.js](./exercises.js) | Données (Exercices) | Banque de **60 exercices pratiques** (`EXERCISES_DATABASE` : 30 PC / 30 Papier, 35 individuels / 25 groupes) avec énoncés, corrigés et buts pédagogiques. |
| [slide_renderer.js](./slide_renderer.js) | Rendu UI | Moteur de génération HTML dynamique (`getSlideHTML()`) selon `slide.type`. |
| [qrcode_local.js](./qrcode_local.js) | QR Code Local | Générateur de QR Code 100 % autonome en JavaScript pur (SVG local, zéro appel réseau externe). |
| [app.js](./app.js) | Noyau Applicatif | Cycle de vie de la classe `TrainingApp`, routage des diapositives, navigation clavier protégée pendant la saisie, barre latérale et progression. |
| [app_slides.js](./app_slides.js) | Outils Diapos | Évènements et simulateurs des diapositives (Tokenisation, Anonymiseur, Calculateur VRAM & Singularité, Calculateur TCO SecNumCloud, Matrice Modèles, Filtres catalogue). |
| [app_supabase.js](./app_supabase.js) | Synchro Base | Client Supabase, détection des rôles, état atomique `sessions.state` (JSONB avec repli legacy automatique), heartbeats de présence et projecteur `index.html`. |
| [app_interactivity.js](./app_interactivity.js) | Drawer d'Interaction | Pilotage formateur et participation stagiaire (Quiz, Tests Généraux, Tests Libres / Sondages Express, Ateliers, Zoom Grand Écran, bouton de ré-entrée stagiaire). |
| [supabase_setup.sql](./supabase_setup.sql) | Schéma BDD | Script complet d'installation des tables `sessions`, `presences`, `votes`, Realtime et politiques RLS durcies. |
| [supabase_migration_v2_9.sql](./supabase_migration_v2_9.sql) | Migration BDD | Migration SQL non-destructive ajoutant `sessions.state` (`jsonb`) et durcissant les politiques RLS sur une base existante. |

---

## 2. Cycle de Vie de la Classe `TrainingApp`

L'application repose sur la classe globale `TrainingApp` instanciée au `DOMContentLoaded`. Sa logique est modulaire sur le prototype partagé :

```
[app.js] ➔ Déclare TrainingApp et son constructeur
    │
    ├── [app_slides.js] ➔ Attache TrainingApp.prototype.runTokenSandbox, bindSlideInteractivity, etc.
    ├── [app_supabase.js] ➔ Attache initSupabase, persistSessionState, syncToPresenterState, projecteur HTML
    └── [app_interactivity.js] ➔ Attache startPoll, toggleRevealState, updateStagiaireReopenButton ➔ Lance new TrainingApp()
```

### Initialisation (Constructeur) :
1. `this.detectRole()` : Détermine le rôle (`public`, `stagiaire` ou `formateur`) et le code de session à 4 chiffres via l'URL (`?role=...&session=...`) ou `localStorage`.
2. `this.initSupabase()` : Initialise le client Supabase (avec repli hors-ligne via `localStorage` si indisponible).
3. `this.initElements()` & `this.initEvents()` : Lie la navigation, la barre de progression et les raccourcis clavier (ignorés lors de la saisie dans un champ texte).
4. `this.renderSidebar()` & `this.renderHomeDashboard()` : Construit les menus à partir de `getVisibleThemes()` (11 thèmes en mode `public`, 12 en `formateur`/`stagiaire`).
5. `this.initInteractivity()` : Initialise les overlays de connexion, les écouteurs temps réel (`sessions`, `presences`, `votes`, `html-projector-<sessionId>`) et les contrôles du panneau interactif.

---

## 3. Rôles et Comportements Applicatifs

### A. Rôle Public (`public`)
*   **But :** Lecture autonome des diapositives hors-session.
*   **Fonctionnalités :** Navigation libre sur les 11 thèmes publics (`exercices-ateliers` masqué), accès complet aux simulateurs locaux. Aucune écriture ni pollution des sessions en direct.

### B. Rôle Stagiaire (`stagiaire`)
*   **But :** Suivre le formateur en direct et participer aux quiz, sondages et ateliers sur smartphone ou PC.
*   **Fonctionnalités :** Navigation verrouillée sur l'écran du formateur. À l'ouverture d'un quiz, sondage ou atelier, le panneau plein écran s'ouvre ; si le stagiaire le ferme par inadvertance (`✕`), un bouton pilule pulsant (`Revenir au sondage` / `Revenir à l'atelier`) reste visible en bas de l'écran et restaure son brouillon non soumis.

### C. Rôle Formateur (`formateur`)
*   **But :** Animer et piloter la session en temps réel (authentification Supabase Auth requise).
*   **Fonctionnalités :** Navigation libre diffusée en direct, génération locale du QR Code d'accès, gestion de l'émargement, lancement de quiz/tests généraux/tests libres/ateliers, révélation progressive (`hidden` ➔ `votes` ➔ `answer`), zoom grand écran, et projection plein écran sécurisée d'un `index.html` dans une `iframe` sandboxée (`allow-scripts allow-modals allow-forms`, sans `allow-same-origin`).

---

## 4. Synchronisation Supabase & Sécurité (RLS)

*   **État Atomique (`sessions.state`) :** `persistSessionState()` enregistre un objet JSONB complet (`themeId`, `slideIndex`, `closed`, `showResults`, `revealState`, `poll`, `exerciseId`, `zoomPrenom`, `zoomOption`, `projectedHtml`) tout en maintenant les colonnes legacy pour la rétrocompatibilité automatique.
*   **Isolation par Session :** Toutes les requêtes sur `presences` et `votes` filtrent explicitement sur `session_id`.
*   **Politiques RLS Durcies :**
    *   `sessions` : lecture publique, écriture strictement réservée au formateur `authenticated`.
    *   `presences` : inscription/heartbeat publics, `DELETE` réservé au formateur `authenticated`.
    *   `votes` : lecture/vote publics (avec interdiction d'usurper `prenom = '__HOST__'`), `DELETE` réservé au formateur `authenticated`.
