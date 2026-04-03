import { z } from "zod";
import {
  createTwoManTeamSchema,
  updateEventSchema,
  updateGolferSchema,
  updateScoreSchema,
  updateUserSchema,
} from "@/lib/validators";

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateGolfer = z.infer<typeof updateGolferSchema>;
export type TwoManTeam = z.infer<typeof createTwoManTeamSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type UpdateScore = z.infer<typeof updateScoreSchema>;

export type Event = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  time: Date;
  location: string;
  description: string;
  leagueWeek: number;
  isTwoManMatch: boolean;
};

export type FormEvent = Omit<Event, "date" | "time"> & {
  date: string;
  time: string;
};

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

export type Score = {
  id: string;
  score: number;
  year: number;
  birdies: number;
  snowmen: number;
  closestToPin: number;
  golferId: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GolferWithScores = Golfer & {
  scores: Score[];
};

export type GolferWithTeammate = Golfer & {
  twoManTeam: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    golfers: Golfer[];
  };
};
