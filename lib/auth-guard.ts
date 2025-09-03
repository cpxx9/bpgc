import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  console.log(session?.user);
  if (session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }
  return session;
}
