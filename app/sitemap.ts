import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://printmoney-purple.vercel.app";

const routes = [
  "",
  "/printing",
  "/money-creation",
  "/inflation-lab",
  "/learn",
  "/invest",
  "/crypto",
  "/glossary",
  "/resources",
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
