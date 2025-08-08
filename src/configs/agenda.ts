import Agenda from "agenda";
import dotenv from "dotenv";

dotenv.config();

export const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URI as string,
    collection: "agendaJobs",
  },
});
