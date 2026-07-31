import { SERVER_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${SERVER_URL}/about`,
    },
  ];
}
