"use server";

import { signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";
import type { UpdateUser, User } from "@/types";
import { revalidatePath } from "next/cache";
import { PAGE_SIZE } from "@/lib/constants";
import { requireAdminAction } from "@/lib/auth-guard";
import { Prisma } from "@prisma/client";

export async function signInWithCredentials(
  previousState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", { ...user, redirect: false });
    return { success: true, message: "Sign in success." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid credentials" };
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function createUser(prevState: unknown, formData: FormData) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    user.password = hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User registered successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

export async function getUserCount() {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const userCount = await prisma.user.count();

    return { success: true, userCount };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getUserById(userId: string | undefined) {
  if (!userId) throw new Error("No id passed");
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query?: string;
}) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    const queryTrimmed = query?.trim();

    const where: Prisma.UserWhereInput = queryTrimmed
      ? {
          OR: [
            { name: { contains: queryTrimmed, mode: "insensitive" } },
            { email: { contains: queryTrimmed, mode: "insensitive" } },
          ],
        }
      : {};

    const currentPage = Math.max(1, Math.floor(page) || 1);

    const [data, dataCount] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (currentPage - 1) * limit,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      success: true,
      data,
      totalCount: dataCount,
      totalPages: Math.ceil(dataCount / limit),
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
      data: [] as User[],
      totalCount: 0,
      totalPages: 1,
    };
  }
}

export async function deleteUser(id: string) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function updateUser(user: UpdateUser) {
  try {
    const admin = await requireAdminAction();
    if (!admin) throw new Error("You are not authorized!");
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
