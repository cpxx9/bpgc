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
  golfers: [
    {
      firstName: "Cole",
      lastName: "Pratte",
      hci: 15.8,
    },
    {
      firstName: "Matt",
      lastName: "Roberts",
      hci: 10.2,
    },
    {
      firstName: "Brian",
      lastName: "Westermeyer",
      hci: 8.4,
    },
    {
      firstName: "Justin",
      lastName: "Pratte",
      hci: 12,
    },
    {
      firstName: "Marc",
      lastName: "Pratte",
      hci: 15.1,
    },
    {
      firstName: "Dale",
      lastName: "Laprise",
      hci: 8.1,
    },
    {
      firstName: "Rich",
      lastName: "Breski",
      hci: 11.9,
    },
    {
      firstName: "Jon",
      lastName: "Breski",
      hci: 15.2,
    },
  ],
};

export default sampleData;
