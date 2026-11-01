import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/work", priority: 0.9, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "monthly" as const },
    { path: "/tools", priority: 0.8, freq: "monthly" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.8, freq: "monthly" as const },
    { path: "/privacy", priority: 0.2, freq: "yearly" as const },
  ];

  return [
    ...routes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
