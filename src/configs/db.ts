import mongoose from "mongoose";

export async function MongoDBConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "email-campaign",
    });
    console.log("MongoDB Connection is Ready");
  } catch (error) {
    console.log("MongoDB Connection is Failed");
  }
}
