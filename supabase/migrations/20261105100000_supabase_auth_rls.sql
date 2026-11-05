-- Replace the public custom-password login with Supabase Auth and isolate
-- application data by authenticated user.

DROP FUNCTION IF EXISTS public.login_usuario(TEXT, TEXT);
REVOKE ALL ON TABLE public.usuarios FROM anon, authenticated;
ALTER TABLE public.usuarios DROP COLUMN IF EXISTS password;

DO $$
DECLARE
  table_name TEXT;
  policy_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'materiales',
    'empaques',
    'etiquetas',
    'costos_fijos_personal',
    'costos_fijos_equipos',
    'costos_fijos_servicios',
    'productos_receta',
    'producto_ingredientes'
  ]
  LOOP
    EXECUTE format(
      'ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL',
      table_name
    );
    EXECUTE format(
      'ALTER TABLE public.%I ALTER COLUMN owner_id SET DEFAULT auth.uid()',
      table_name
    );
    EXECUTE format(
      'UPDATE public.%I AS data SET owner_id = auth_user.id, usuario = auth_user.email FROM auth.users AS auth_user WHERE data.owner_id IS NULL AND lower(data.usuario) = lower(auth_user.email)',
      table_name
    );
    EXECUTE format(
      'CREATE INDEX IF NOT EXISTS %I ON public.%I(owner_id)',
      'idx_' || table_name || '_owner_id',
      table_name
    );
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);

    FOR policy_name IN
      SELECT policyname
      FROM pg_policies AS policies
      WHERE policies.schemaname = 'public' AND policies.tablename = table_name
    LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', policy_name, table_name);
    END LOOP;

    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR SELECT TO authenticated USING (owner_id = (SELECT auth.uid()))',
      table_name || '_owner_select',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR INSERT TO authenticated WITH CHECK (owner_id = (SELECT auth.uid()))',
      table_name || '_owner_insert',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR UPDATE TO authenticated USING (owner_id = (SELECT auth.uid())) WITH CHECK (owner_id = (SELECT auth.uid()))',
      table_name || '_owner_update',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR DELETE TO authenticated USING (owner_id = (SELECT auth.uid()))',
      table_name || '_owner_delete',
      table_name
    );
  END LOOP;
END $$;

DROP POLICY IF EXISTS producto_ingredientes_owner_select ON public.producto_ingredientes;
DROP POLICY IF EXISTS producto_ingredientes_owner_insert ON public.producto_ingredientes;
DROP POLICY IF EXISTS producto_ingredientes_owner_update ON public.producto_ingredientes;
DROP POLICY IF EXISTS producto_ingredientes_owner_delete ON public.producto_ingredientes;

CREATE POLICY producto_ingredientes_owner_select
ON public.producto_ingredientes
FOR SELECT TO authenticated
USING (
  owner_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.productos_receta
    WHERE productos_receta.id = producto_ingredientes.producto_id
      AND productos_receta.owner_id = (SELECT auth.uid())
  )
);

CREATE POLICY producto_ingredientes_owner_insert
ON public.producto_ingredientes
FOR INSERT TO authenticated
WITH CHECK (
  owner_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.productos_receta
    WHERE productos_receta.id = producto_ingredientes.producto_id
      AND productos_receta.owner_id = (SELECT auth.uid())
  )
  AND (
    (tipo = 'material' AND EXISTS (
      SELECT 1 FROM public.materiales
      WHERE materiales.id = producto_ingredientes.item_id
        AND materiales.owner_id = (SELECT auth.uid())
    ))
    OR (tipo = 'empaque' AND EXISTS (
      SELECT 1 FROM public.empaques
      WHERE empaques.id = producto_ingredientes.item_id
        AND empaques.owner_id = (SELECT auth.uid())
    ))
    OR (tipo = 'etiqueta' AND EXISTS (
      SELECT 1 FROM public.etiquetas
      WHERE etiquetas.id = producto_ingredientes.item_id
        AND etiquetas.owner_id = (SELECT auth.uid())
    ))
  )
);

CREATE POLICY producto_ingredientes_owner_update
ON public.producto_ingredientes
FOR UPDATE TO authenticated
USING (
  owner_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.productos_receta
    WHERE productos_receta.id = producto_ingredientes.producto_id
      AND productos_receta.owner_id = (SELECT auth.uid())
  )
)
WITH CHECK (
  owner_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.productos_receta
    WHERE productos_receta.id = producto_ingredientes.producto_id
      AND productos_receta.owner_id = (SELECT auth.uid())
  )
  AND (
    (tipo = 'material' AND EXISTS (
      SELECT 1 FROM public.materiales
      WHERE materiales.id = producto_ingredientes.item_id
        AND materiales.owner_id = (SELECT auth.uid())
    ))
    OR (tipo = 'empaque' AND EXISTS (
      SELECT 1 FROM public.empaques
      WHERE empaques.id = producto_ingredientes.item_id
        AND empaques.owner_id = (SELECT auth.uid())
    ))
    OR (tipo = 'etiqueta' AND EXISTS (
      SELECT 1 FROM public.etiquetas
      WHERE etiquetas.id = producto_ingredientes.item_id
        AND etiquetas.owner_id = (SELECT auth.uid())
    ))
  )
);

CREATE POLICY producto_ingredientes_owner_delete
ON public.producto_ingredientes
FOR DELETE TO authenticated
USING (
  owner_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.productos_receta
    WHERE productos_receta.id = producto_ingredientes.producto_id
      AND productos_receta.owner_id = (SELECT auth.uid())
  )
);
