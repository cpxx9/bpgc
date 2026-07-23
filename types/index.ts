import { z } from "zod";
import {
  createMatchSchema,
  createTwoManTeamSchema,
  updateEventSchema,
  updateGolferSchema,
  updateImageSchema,
  updateMatchupSchema,
  updateScoreSchema,
  updateTwoManTeamSchema,
  updateUserSchema,
} from "@/lib/validators";

export type ActionResult<T> =
  | { success: true; data: T; totalPages?: number; year?: number }
  | { success: false; message: string };

export type ActionResultMessage = { success: boolean; message: string };

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UpdateGolfer = z.infer<typeof updateGolferSchema>;
export type TwoManTeam = z.infer<typeof createTwoManTeamSchema>;
export type Match = z.infer<typeof createMatchSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type UpdateScore = z.infer<typeof updateScoreSchema>;
export type UpdateMatchup = z.infer<typeof updateMatchupSchema>;
export type UpdateTwoManTeam = z.infer<typeof updateTwoManTeamSchema>;
export type UpdateImage = z.infer<typeof updateImageSchema>;

export type ContestWinnersPublic = {
  birdies: {
    id: string;
    firstName: string;
    lastName: string;
    average: number;
  }[];
  closestToPin: {
    id: string;
    firstName: string;
    lastName: string;
    lowest: number;
  }[];
  snowmen: {
    id: string;
    firstName: string;
    lastName: string;
    average: number;
  }[];
};

export type TwoManTeamList = {
  golfers: Golfer[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
};

export type TwoManTeamPublic = {
  id: string;
  number: number;
  golfers: { firstName: string; lastName: string }[];
};

export type TwoManTeamStandingsPublic = {
  id: string;
  number: number;
  golfers: { firstName: string; lastName: string }[];
  weeklyScores: {
    week: number;
    score: number | null | "DNP";
  }[];
  total: number;
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
  isChampionship: boolean;
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
  // new changes, remove twoManTeam
  // twoManTeamId: string | null;
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

export type ScoreWithGolfer = Score & {
  golfer: { firstName: string; lastName: string };
};

export type EventWithScoreAverage = {
  id: string;
  leagueWeek: number;
  location: string;
  avgScore: number | "dnp";
  date: Date;
};

export type GolferWithScoreAverage = {
  id: string;
  firstName: string;
  lastName: string;
  avgScore: number;
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
  } | null;
  // new changes, added | null
};

export type EventWithScores = Event & {
  scores: ScoreWithGolfer[];
};

export type WeeklyMatchupsPublic = {
  week: number;
  completed: boolean;
  matchups: {
    id: string;
    teamOne: number;
    teamTwo: number;
  }[];
};

export type DbImage = {
  id: string;
  url: string;
  displayed: boolean;
  key: string;
  fileName: string;
};

export type DbImageAdmin = DbImage & {
  isHomeSplash: boolean;
  isScheduleSplash: boolean;
  isWeeklyScoresSplash: boolean;
  isScoringAveragesSplash: boolean;
  isTwoManLeagueSplash: boolean;
  isClubChampionshipSplash: boolean;
  isContestsSplash: boolean;
  isVideoOfTheWeek: boolean;
  isTwoManChamps: boolean;
  isBpgcTv: boolean;
};

export type BgImagesPublic = {
  home: DbImage;
  schedule: DbImage;
  weeklyScores: DbImage;
  scoringAverages: DbImage;
  twoManLeague: DbImage;
  clubChampionship: DbImage;
  contests: DbImage;
};

export type CardImagesPublic = {
  isVideoOfTheWeek: DbImage;
  isTwoManChamps: DbImage;
  isBpgcTv: DbImage;
};
