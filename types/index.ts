import { z } from "zod";
import { updateGolferSchema, updateUserSchema } from "@/lib/validators";

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateGolfer = z.infer<typeof updateGolferSchema>;

export type User = {
  id: string;
  role: string;
  name: string;
  password: string | null;
  email: string;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Golfer = {
  id: string;
  firstName: string;
  lastName: string;
  hci: number;
  createdAt: Date;
  updatedAt: Date;
  twoManTeamId: string | null;
};
