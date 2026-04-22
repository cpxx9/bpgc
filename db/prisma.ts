import { PrismaClient } from "@prisma/client";
import { CLIENT_PUBLIC_FILES_PATH } from "next/dist/shared/lib/constants";

let prisma: PrismaClient;

console.log(process.env.NODE_ENV);

if (process.env.LOCATION !== "local") {
  // ✅ Neon ONLY in production/preview
  const { Pool, neonConfig } = require("@neondatabase/serverless");
  const { PrismaNeon } = require("@prisma/adapter-neon");
  const ws = require("ws");

  neonConfig.webSocketConstructor = ws;

  let pool: any;

  if (process.env.NODE_ENV === "production") {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  } else {
    pool = new Pool({
      connectionString: process.env.DEVDB_DATABASE_URL,
    });
  }

  const adapter = new PrismaNeon(pool);
  prisma = new PrismaClient({ adapter });
} else {
  // ✅ Local dev: NORMAL Postgres connection
  prisma = new PrismaClient();
}

export { prisma };
