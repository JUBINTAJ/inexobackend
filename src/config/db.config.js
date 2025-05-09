import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const DB_URL=process.env.DB_URL;
export async function main() {
    await mongoose.connect(DB_URL);
  console.log(`connected to mongodb`)
  }
