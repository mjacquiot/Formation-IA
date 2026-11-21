-- ==========================================
-- FORMATION IA TERRITORIALE - MIGRATION NON-DESTRUCTIVE (v2.9)
-- ==========================================
-- À exécuter dans l'éditeur SQL de votre projet Supabase (SQL Editor).
-- Ce script ajoute la colonne JSONB `state` sans perdre vos données existantes
-- et durcit les politiques RLS (Row Level Security).

-- 1. Ajout de la colonne atomique `state` sur `sessions`
ALTER TABLE public.sessions
    ADD COLUMN IF NOT EXISTS state jsonb DEFAULT '{}'::jsonb;

-- 2. Durcissement des politiques RLS sur `sessions`
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tout le monde peut voir la session active" ON public.sessions;
DROP POLICY IF EXISTS "Seul le formateur connecté peut modifier la session" ON public.sessions;

CREATE POLICY "Tout le monde peut voir la session active"
    ON public.sessions FOR SELECT
    USING (true);

CREATE POLICY "Seul le formateur connecté peut modifier la session"
    ON public.sessions FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. Durcissement des politiques RLS sur `presences`
ALTER TABLE public.presences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tout le monde peut voir les presences" ON public.presences;
DROP POLICY IF EXISTS "Tout le monde peut s'inscrire en presence" ON public.presences;
DROP POLICY IF EXISTS "Chacun peut modifier son etat de presence" ON public.presences;
DROP POLICY IF EXISTS "Stagiaires peuvent mettre a jour presence" ON public.presences;
DROP POLICY IF EXISTS "Seul le formateur peut supprimer des presences" ON public.presences;
DROP POLICY IF EXISTS "Le formateur gere les presences" ON public.presences;

CREATE POLICY "Tout le monde peut voir les presences"
    ON public.presences FOR SELECT
    USING (true);

CREATE POLICY "Tout le monde peut s'inscrire en presence"
    ON public.presences FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Stagiaires peuvent mettre a jour presence"
    ON public.presences FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Seul le formateur peut supprimer des presences"
    ON public.presences FOR DELETE
    TO authenticated
    USING (true);

-- 4. Durcissement des politiques RLS sur `votes`
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Le formateur peut lire tous les votes" ON public.votes;
DROP POLICY IF EXISTS "Tout le monde peut lire les votes" ON public.votes;
DROP POLICY IF EXISTS "Tout le monde peut voter" ON public.votes;
DROP POLICY IF EXISTS "Tout le monde peut modifier son vote" ON public.votes;
DROP POLICY IF EXISTS "Tout le monde peut supprimer des votes" ON public.votes;
DROP POLICY IF EXISTS "Le formateur gere tous les votes" ON public.votes;

CREATE POLICY "Tout le monde peut lire les votes"
    ON public.votes FOR SELECT
    USING (true);

CREATE POLICY "Tout le monde peut voter"
    ON public.votes FOR INSERT
    WITH CHECK (prenom <> '__HOST__');

CREATE POLICY "Tout le monde peut modifier son vote"
    ON public.votes FOR UPDATE
    USING (prenom <> '__HOST__')
    WITH CHECK (prenom <> '__HOST__');

CREATE POLICY "Le formateur gere tous les votes"
    ON public.votes FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
