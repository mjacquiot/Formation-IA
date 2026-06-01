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
