-- Secure public.usuarios: enable RLS and block direct anon/authenticated access.
-- Login now goes through public.login_usuario(), a SECURITY DEFINER function
-- that returns the profile WITHOUT the password column.

-- 1. Function (before anything that depends on it)
CREATE OR REPLACE FUNCTION public.login_usuario(p_email TEXT, p_password TEXT)
RETURNS TABLE(
    id UUID,
    email TEXT,
    rol TEXT,
    dependencia TEXT,
    nombre TEXT,
    created_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT u.id, u.email, u.rol, u.dependencia, u.nombre, u.created_at
    FROM public.usuarios u
    WHERE u.email = p_email
      AND u.password = p_password
    LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.login_usuario(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.login_usuario(TEXT, TEXT) TO anon, authenticated;

-- 2. Enable RLS
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- 3. Remove any permissive policies so anon/authenticated cannot access rows directly
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'usuarios'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.usuarios', pol.policyname);
    END LOOP;
END $$;

-- 4. Defense in depth: revoke direct table privileges from API roles
REVOKE ALL ON TABLE public.usuarios FROM anon, authenticated;
