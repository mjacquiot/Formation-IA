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
