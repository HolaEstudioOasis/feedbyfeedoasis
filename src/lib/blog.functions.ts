import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchPublishedPosts, fetchPostBySlug, type BlogListItem } from "./blog.server";
import type { BlogPost } from "./blog";

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogListItem[]> => {
    return await fetchPublishedPosts();
  },
);

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<BlogPost | null> => {
    return await fetchPostBySlug(data.slug);
  });
