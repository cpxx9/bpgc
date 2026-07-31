import { SERVER_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${SERVER_URL}/`,
    },
    {
      url: `${SERVER_URL}/about`,
    },
    {
      url: `${SERVER_URL}/schedule`,
    },
    {
      url: `${SERVER_URL}/scoring-info/weekly-scores`,
    },
    {
      url: `${SERVER_URL}/scoring-info/scoring-averages`,
    },
    {
      url: `${SERVER_URL}/events/two-man-league`,
    },
    {
      url: `${SERVER_URL}/events/club-championship`,
    },
    {
      url: `${SERVER_URL}/contests`,
    },
    {
      url: `${SERVER_URL}/gallery`,
    },
  ];
}
