import { z } from "zod";
import {
  createMatchSchema,
  createTwoManTeamSchema,
  updateEventSchema,
  updateGolferSchema,
  updateMatchupSchema,
  updateScoreSchema,
  updateUserSchema,
} from "@/lib/validators";

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateGolfer = z.infer<typeof updateGolferSchema>;
export type TwoManTeam = z.infer<typeof createTwoManTeamSchema>;
export type Match = z.infer<typeof createMatchSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type UpdateScore = z.infer<typeof updateScoreSchema>;
export type UpdateMatchup = z.infer<typeof updateMatchupSchema>;

export type TwoManTeamList = {
  golfers: Golfer[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
};

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
  active: boolean;
  twoManTeamId: string | null;
};

export type Score = {
  id: string;
  score: number;
  birdies: number;
  snowmen: number;
  closestToPin: number | null;
  golferId: string;
  eventId: string;
  createdAt?: Date;
  updatedAt?: Date;
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
