import { formatNumberWithDecimal } from "@/lib/utils";
import { z } from "zod";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );
const threeCharError = " must be at least 3 characters";
const isRequiredError = " is required";
const nameString = z.string().min(1, "Name cannot be empty");

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirmed password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z.object({
  id: z.string().min(1, `ID${isRequiredError}`),
  role: z.string().min(1, `Role${isRequiredError}`),
  name: z.string().min(3, `Name${threeCharError}`),
  email: z.string().min(3, `Email${threeCharError}`),
});

export const updateProfileSchema = z.object({
  name: z.string().min(3, `Name${threeCharError}`),
  email: z.string().min(3, `Email${threeCharError}`),
});

export const playerSchema = z.object({
  firstName: nameString,
  lastName: nameString,
  hci: z.number({ message: "HCI must be a number!" }),
  twoManTeam: z.string().uuid("Must be a valid UUID!"),
});
