import { SERVER_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${SERVER_URL}/`,
      changeFrequency: "weekly",
    },
    {
      url: `${SERVER_URL}/about`,
    },
    {
      url: `${SERVER_URL}/schedule`,
      changeFrequency: "yearly",
    },
    {
      url: `${SERVER_URL}/scoring-info/weekly-scores`,
      changeFrequency: "weekly",
    },
    {
      url: `${SERVER_URL}/scoring-info/scoring-averages`,
      changeFrequency: "weekly",
    },
    {
      url: `${SERVER_URL}/events/two-man-league`,
      changeFrequency: "weekly",
    },
    {
      url: `${SERVER_URL}/events/club-championship`,
      changeFrequency: "yearly",
    },
    {
      url: `${SERVER_URL}/contests`,
      changeFrequency: "weekly",
    },
    {
      url: `${SERVER_URL}/gallery`,
    },
  ];
}
