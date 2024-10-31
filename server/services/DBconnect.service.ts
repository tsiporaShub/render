import dotenv from 'dotenv'
dotenv.config()
const DATABASEURL = process.env.DATABASEURL

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const mongoDB = DATABASEURL || '5000';

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

export default mongoose;
