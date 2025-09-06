export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || "Beaver Point Golf Club";
export const APP_NAME_ABR = process.env.NEXT_PUBLIC_APP_NAME_ABR || "BPGC";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "E-commerce store to test payments and NextJS";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"];
