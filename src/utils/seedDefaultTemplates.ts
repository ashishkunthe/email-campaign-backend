// scripts/seedTemplates.ts
import mongoose from "mongoose";
import { Template } from "../models/templateModel";

const templates = [
  {
    name: "Welcome Email",
    subject: "Welcome to Our Platform!",
    body: "<h1>Hello!</h1><p>Thanks for joining us!</p>",
    global: true,
  },
  {
    name: "Product Launch",
    subject: "We’re Live! 🚀",
    body: "<p>Exciting news! Our product is now live.</p>",
    global: true,
  },
  {
    name: "Newsletter",
    subject: "Your Weekly Digest",
    body: "<p>Here’s what’s new this week...</p>",
    global: true,
  },
  {
    name: "Thank You",
    subject: "Thanks for Your Support",
    body: "<p>We appreciate your business and trust in us.</p>",
    global: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    for (const template of templates) {
      const exists = await Template.findOne({ name: template.name });
      if (!exists) {
        await Template.create(template);
        console.log(`✅ Inserted: ${template.name}`);
      } else {
        console.log(`⚠️ Skipped: ${template.name} already exists`);
      }
    }

    console.log("🎉 Templates seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
