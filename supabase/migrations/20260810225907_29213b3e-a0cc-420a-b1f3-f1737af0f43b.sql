CREATE TABLE public.cms_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('owner','collaborator')),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_users TO authenticated;
GRANT ALL ON public.cms_users TO service_role;
ALTER TABLE public.cms_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_cms_user(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.cms_users WHERE id = _user_id)
$$;

CREATE OR REPLACE FUNCTION public.is_cms_owner(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.cms_users WHERE id = _user_id AND role = 'owner')
$$;

CREATE POLICY "Owners can read all cms users" ON public.cms_users
  FOR SELECT TO authenticated USING (public.is_cms_owner(auth.uid()));
CREATE POLICY "Users can read their own cms row" ON public.cms_users
  FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Owners can insert cms users" ON public.cms_users
  FOR INSERT TO authenticated WITH CHECK (public.is_cms_owner(auth.uid()));
CREATE POLICY "Owners can update cms users" ON public.cms_users
  FOR UPDATE TO authenticated USING (public.is_cms_owner(auth.uid())) WITH CHECK (public.is_cms_owner(auth.uid()));
CREATE POLICY "Owners can delete cms users" ON public.cms_users
  FOR DELETE TO authenticated USING (public.is_cms_owner(auth.uid()));

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text,
  excerpt text,
  featured_image_url text,
  category text,
  tags text[],
  meta_title text,
  meta_description text,
  author_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are public" ON public.blog_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
CREATE POLICY "CMS users can read all posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users can insert posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users can update posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (public.is_cms_user(auth.uid())) WITH CHECK (public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users can delete posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (public.is_cms_user(auth.uid()));

CREATE INDEX blog_posts_published_idx ON public.blog_posts (published_at DESC);
CREATE INDEX blog_posts_status_idx ON public.blog_posts (status);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER blog_posts_set_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Blog images are readable" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'blog-images');
CREATE POLICY "CMS users can upload blog images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images' AND public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users can update blog images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'blog-images' AND public.is_cms_user(auth.uid()));
CREATE POLICY "CMS users can delete blog images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'blog-images' AND public.is_cms_user(auth.uid()));