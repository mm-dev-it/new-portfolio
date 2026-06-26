import type { MetadataRoute } from "next";
import { projectSlugs } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/i-miei-lavori", "/about-me", "/contact"];
  const projectPages = projectSlugs.map((slug) => `/${slug}`);

  return [...staticPages, ...projectPages].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
