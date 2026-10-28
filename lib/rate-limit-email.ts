import "server-only";
import { createHmac } from "crypto";
import { prisma } from "@/db/prisma";

const HOUR = 60 * 60 * 1000;
const PER_IP_PER_HOUR = 5;
const GLOBAL_PER_HOUR = 30;

const hashIp = (ip: string) =>
  createHmac("sha256", process.env.NEXTAUTH_SECRET ?? "").update(ip).digest("hex");

export async function allowMailAttempt(ip: string): Promise<boolean> {
  const ipHash = hashIp(ip);
  const since = new Date(Date.now() - HOUR);

  await prisma.mailAttempt.create({ data: { ipHash } });

  const [mine, all] = await Promise.all([
    prisma.mailAttempt.count({ where: { ipHash, createdAt: { gte: since } } }),
    prisma.mailAttempt.count({ where: { createdAt: { gte: since } } }),
  ]);

  if (Math.random() < 0.05) {
    await prisma.mailAttempt.deleteMany({
      where: { createdAt: { lt: new Date(Date.now() - 24 * HOUR) } },
    });
  }

  return mine <= PER_IP_PER_HOUR && all <= GLOBAL_PER_HOUR;
}