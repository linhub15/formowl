import type { FileRouteTypes } from "@/routeTree.gen";
import type { Sitemap } from "tanstack-router-sitemap";

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes["fullPaths"];

// Define your sitemap
export const sitemap: Sitemap<TRoutes> = {
  siteUrl: "https://formowl.dev",
  defaultPriority: 0.5,
  routes: {
    "/": {
      priority: 1,
      changeFrequency: "daily",
    },
    "/pricing": {},
    "/login": {},
    "/privacy": {},
    "/terms": {},
    "/waitlist": {},
    // Dynamic route example
    // "/posts/$postId": async (route) => {
    //   const postsResponse = await fetch("https://example.com/api/posts");
    //   const posts = await postsResponse.json();

    //   return posts.map((post) => ({
    //     path: `/posts/${post.id}`,
    //     priority: 0.8,
    //     changeFrequency: "daily",
    //   }));
    // },
  },
};
