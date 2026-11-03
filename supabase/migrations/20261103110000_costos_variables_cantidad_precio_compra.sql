-- Costos Variables: purchased quantity and purchase price for materiales, empaques and etiquetas.
-- Cost (costo_unitario / costo) is now calculated as precio_compra / cantidad_comprada.
-- Existing rows are kept: their current cost is converted to cantidad_comprada = 1 and precio_compra = cost.

-- ===== materiales =====
ALTER TABLE public.materiales
ADD COLUMN IF NOT EXISTS cantidad_comprada NUMERIC NOT NULL DEFAULT 1;

ALTER TABLE public.materiales
ADD COLUMN IF NOT EXISTS precio_compra NUMERIC NOT NULL DEFAULT 0;

UPDATE public.materiales
SET cantidad_comprada = 1,
    precio_compra = COALESCE(costo_unitario, 0)
WHERE precio_compra = 0
  AND COALESCE(costo_unitario, 0) > 0;

-- ===== empaques =====
ALTER TABLE public.empaques
ADD COLUMN IF NOT EXISTS cantidad_comprada NUMERIC NOT NULL DEFAULT 1;

ALTER TABLE public.empaques
ADD COLUMN IF NOT EXISTS precio_compra NUMERIC NOT NULL DEFAULT 0;

UPDATE public.empaques
SET cantidad_comprada = 1,
    precio_compra = COALESCE(costo, 0)
WHERE precio_compra = 0
  AND COALESCE(costo, 0) > 0;

-- ===== etiquetas =====
ALTER TABLE public.etiquetas
ADD COLUMN IF NOT EXISTS cantidad_comprada NUMERIC NOT NULL DEFAULT 1;

ALTER TABLE public.etiquetas
ADD COLUMN IF NOT EXISTS precio_compra NUMERIC NOT NULL DEFAULT 0;

UPDATE public.etiquetas
SET cantidad_comprada = 1,
    precio_compra = COALESCE(costo, 0)
WHERE precio_compra = 0
  AND COALESCE(costo, 0) > 0;

-- ===== Functions: automatic cost calculation =====
CREATE OR REPLACE FUNCTION public.calcular_costo_unitario_materiales()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $func$
BEGIN
  IF COALESCE(NEW.cantidad_comprada, 0) > 0 THEN
    NEW.costo_unitario := ROUND(COALESCE(NEW.precio_compra, 0) / NEW.cantidad_comprada, 4);
  ELSE
    NEW.costo_unitario := 0;
  END IF;
  RETURN NEW;
END;
$func$;

CREATE OR REPLACE FUNCTION public.calcular_costo_empaques_etiquetas()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $func$
BEGIN
  IF COALESCE(NEW.cantidad_comprada, 0) > 0 THEN
    NEW.costo := ROUND(COALESCE(NEW.precio_compra, 0) / NEW.cantidad_comprada, 4);
  ELSE
    NEW.costo := 0;
  END IF;
  RETURN NEW;
END;
$func$;

-- ===== Triggers =====
DROP TRIGGER IF EXISTS trg_calcular_costo_materiales ON public.materiales;
CREATE TRIGGER trg_calcular_costo_materiales
BEFORE INSERT OR UPDATE OF cantidad_comprada, precio_compra ON public.materiales
FOR EACH ROW EXECUTE FUNCTION public.calcular_costo_unitario_materiales();

DROP TRIGGER IF EXISTS trg_calcular_costo_empaques ON public.empaques;
CREATE TRIGGER trg_calcular_costo_empaques
BEFORE INSERT OR UPDATE OF cantidad_comprada, precio_compra ON public.empaques
FOR EACH ROW EXECUTE FUNCTION public.calcular_costo_empaques_etiquetas();

DROP TRIGGER IF EXISTS trg_calcular_costo_etiquetas ON public.etiquetas;
CREATE TRIGGER trg_calcular_costo_etiquetas
BEFORE INSERT OR UPDATE OF cantidad_comprada, precio_compra ON public.etiquetas
FOR EACH ROW EXECUTE FUNCTION public.calcular_costo_empaques_etiquetas();
