REVOKE EXECUTE ON FUNCTION public.is_cms_user(uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.is_cms_owner(uuid) FROM anon, authenticated, public;