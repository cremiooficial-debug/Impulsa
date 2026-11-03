-- Estructura de Costos: costos fijos (personal, equipos, servicios), productos (recetas) and purchase unit.
-- The app uses a custom login (public.usuarios + localStorage), so requests reach
-- Supabase with the anon role. Policies allow anon and authenticated roles, same as
-- the materiales, empaques and etiquetas tables.

-- ===== Purchase unit for empaques and etiquetas (materiales already has "unidad") =====
ALTER TABLE public.empaques
ADD COLUMN IF NOT EXISTS unidad TEXT NOT NULL DEFAULT 'und';

ALTER TABLE public.etiquetas
ADD COLUMN IF NOT EXISTS unidad TEXT NOT NULL DEFAULT 'und';

-- ===== Costos fijos: Personal =====
CREATE TABLE IF NOT EXISTS public.costos_fijos_personal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario TEXT NOT NULL,
  dependencia TEXT NOT NULL DEFAULT '',
  nombre TEXT NOT NULL,
  cargo TEXT NOT NULL DEFAULT '',
  costo_mensual NUMERIC NOT NULL DEFAULT 0,
  fecha TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ===== Costos fijos: Equipos =====
CREATE TABLE IF NOT EXISTS public.costos_fijos_equipos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario TEXT NOT NULL,
  dependencia TEXT NOT NULL DEFAULT '',
  equipo TEXT NOT NULL,
  precio_compra NUMERIC NOT NULL DEFAULT 0,
  vida_util_meses NUMERIC NOT NULL DEFAULT 12,
  costo_mensual NUMERIC NOT NULL DEFAULT 0,
  fecha TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ===== Costos fijos: Servicios =====
CREATE TABLE IF NOT EXISTS public.costos_fijos_servicios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario TEXT NOT NULL,
  dependencia TEXT NOT NULL DEFAULT '',
  servicio TEXT NOT NULL,
  proveedor TEXT NOT NULL DEFAULT '',
  costo_mensual NUMERIC NOT NULL DEFAULT 0,
  fecha TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ===== Productos (recetas) =====
CREATE TABLE IF NOT EXISTS public.productos_receta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario TEXT NOT NULL,
  dependencia TEXT NOT NULL DEFAULT '',
  nombre TEXT NOT NULL,
  rendimiento NUMERIC NOT NULL DEFAULT 1,
  costo_fijo_unitario NUMERIC NOT NULL DEFAULT 0,
  ganancia_unitaria NUMERIC NOT NULL DEFAULT 0,
  impuesto_unitario NUMERIC NOT NULL DEFAULT 0,
  fecha TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ===== Ingredientes de cada receta =====
CREATE TABLE IF NOT EXISTS public.producto_ingredientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producto_id UUID NOT NULL REFERENCES public.productos_receta(id) ON DELETE CASCADE,
  usuario TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('material', 'empaque', 'etiqueta')),
  item_id UUID NOT NULL,
  cantidad NUMERIC NOT NULL DEFAULT 0,
  unidad TEXT NOT NULL DEFAULT 'und',
  fecha TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ===== Indexes =====
CREATE INDEX IF NOT EXISTS idx_costos_fijos_personal_usuario ON public.costos_fijos_personal(usuario);
CREATE INDEX IF NOT EXISTS idx_costos_fijos_equipos_usuario ON public.costos_fijos_equipos(usuario);
CREATE INDEX IF NOT EXISTS idx_costos_fijos_servicios_usuario ON public.costos_fijos_servicios(usuario);
CREATE INDEX IF NOT EXISTS idx_productos_receta_usuario ON public.productos_receta(usuario);
CREATE INDEX IF NOT EXISTS idx_producto_ingredientes_producto ON public.producto_ingredientes(producto_id);

-- ===== Enable RLS =====
ALTER TABLE public.costos_fijos_personal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.costos_fijos_equipos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.costos_fijos_servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos_receta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.producto_ingredientes ENABLE ROW LEVEL SECURITY;

-- ===== Policies: costos_fijos_personal =====
DROP POLICY IF EXISTS "cf_personal_select" ON public.costos_fijos_personal;
CREATE POLICY "cf_personal_select" ON public.costos_fijos_personal
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "cf_personal_insert" ON public.costos_fijos_personal;
CREATE POLICY "cf_personal_insert" ON public.costos_fijos_personal
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "cf_personal_update" ON public.costos_fijos_personal;
CREATE POLICY "cf_personal_update" ON public.costos_fijos_personal
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "cf_personal_delete" ON public.costos_fijos_personal;
CREATE POLICY "cf_personal_delete" ON public.costos_fijos_personal
FOR DELETE TO anon, authenticated USING (true);

-- ===== Policies: costos_fijos_equipos =====
DROP POLICY IF EXISTS "cf_equipos_select" ON public.costos_fijos_equipos;
CREATE POLICY "cf_equipos_select" ON public.costos_fijos_equipos
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "cf_equipos_insert" ON public.costos_fijos_equipos;
CREATE POLICY "cf_equipos_insert" ON public.costos_fijos_equipos
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "cf_equipos_update" ON public.costos_fijos_equipos;
CREATE POLICY "cf_equipos_update" ON public.costos_fijos_equipos
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "cf_equipos_delete" ON public.costos_fijos_equipos;
CREATE POLICY "cf_equipos_delete" ON public.costos_fijos_equipos
FOR DELETE TO anon, authenticated USING (true);

-- ===== Policies: costos_fijos_servicios =====
DROP POLICY IF EXISTS "cf_servicios_select" ON public.costos_fijos_servicios;
CREATE POLICY "cf_servicios_select" ON public.costos_fijos_servicios
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "cf_servicios_insert" ON public.costos_fijos_servicios;
CREATE POLICY "cf_servicios_insert" ON public.costos_fijos_servicios
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "cf_servicios_update" ON public.costos_fijos_servicios;
CREATE POLICY "cf_servicios_update" ON public.costos_fijos_servicios
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "cf_servicios_delete" ON public.costos_fijos_servicios;
CREATE POLICY "cf_servicios_delete" ON public.costos_fijos_servicios
FOR DELETE TO anon, authenticated USING (true);

-- ===== Policies: productos_receta =====
DROP POLICY IF EXISTS "productos_receta_select" ON public.productos_receta;
CREATE POLICY "productos_receta_select" ON public.productos_receta
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "productos_receta_insert" ON public.productos_receta;
CREATE POLICY "productos_receta_insert" ON public.productos_receta
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "productos_receta_update" ON public.productos_receta;
CREATE POLICY "productos_receta_update" ON public.productos_receta
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "productos_receta_delete" ON public.productos_receta;
CREATE POLICY "productos_receta_delete" ON public.productos_receta
FOR DELETE TO anon, authenticated USING (true);

-- ===== Policies: producto_ingredientes =====
DROP POLICY IF EXISTS "producto_ingredientes_select" ON public.producto_ingredientes;
CREATE POLICY "producto_ingredientes_select" ON public.producto_ingredientes
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "producto_ingredientes_insert" ON public.producto_ingredientes;
CREATE POLICY "producto_ingredientes_insert" ON public.producto_ingredientes
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "producto_ingredientes_update" ON public.producto_ingredientes;
CREATE POLICY "producto_ingredientes_update" ON public.producto_ingredientes
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "producto_ingredientes_delete" ON public.producto_ingredientes;
CREATE POLICY "producto_ingredientes_delete" ON public.producto_ingredientes
FOR DELETE TO anon, authenticated USING (true);
