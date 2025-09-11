import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "admincole",
      email: "admin@cjplabs.com",
      password: hashSync("kaL1nb9*&lDF", 10),
      role: "admin",
    },
  ],
};

export default sampleData;
