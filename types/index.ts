import { z } from "zod";
import { updateProfileSchema, updateUserSchema } from "@/lib/validators";

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
