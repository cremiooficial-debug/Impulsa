-- Costos Variables: RLS policies for materiales, empaques and etiquetas.
-- The app uses a custom login (public.usuarios + localStorage), so requests
-- reach Supabase with the anon role. Policies therefore allow anon and
-- authenticated roles to read, insert, update and delete rows.

-- ===== materiales =====
ALTER TABLE public.materiales ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "costos_materiales_select" ON public.materiales;
CREATE POLICY "costos_materiales_select"
ON public.materiales
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "costos_materiales_insert" ON public.materiales;
CREATE POLICY "costos_materiales_insert"
ON public.materiales
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "costos_materiales_update" ON public.materiales;
CREATE POLICY "costos_materiales_update"
ON public.materiales
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "costos_materiales_delete" ON public.materiales;
CREATE POLICY "costos_materiales_delete"
ON public.materiales
FOR DELETE
TO anon, authenticated
USING (true);

-- ===== empaques =====
ALTER TABLE public.empaques ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "costos_empaques_select" ON public.empaques;
CREATE POLICY "costos_empaques_select"
ON public.empaques
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "costos_empaques_insert" ON public.empaques;
CREATE POLICY "costos_empaques_insert"
ON public.empaques
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "costos_empaques_update" ON public.empaques;
CREATE POLICY "costos_empaques_update"
ON public.empaques
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "costos_empaques_delete" ON public.empaques;
CREATE POLICY "costos_empaques_delete"
ON public.empaques
FOR DELETE
TO anon, authenticated
USING (true);

-- ===== etiquetas =====
ALTER TABLE public.etiquetas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "costos_etiquetas_select" ON public.etiquetas;
CREATE POLICY "costos_etiquetas_select"
ON public.etiquetas
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "costos_etiquetas_insert" ON public.etiquetas;
CREATE POLICY "costos_etiquetas_insert"
ON public.etiquetas
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "costos_etiquetas_update" ON public.etiquetas;
CREATE POLICY "costos_etiquetas_update"
ON public.etiquetas
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "costos_etiquetas_delete" ON public.etiquetas;
CREATE POLICY "costos_etiquetas_delete"
ON public.etiquetas
FOR DELETE
TO anon, authenticated
USING (true);
