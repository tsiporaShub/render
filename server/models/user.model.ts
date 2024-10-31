import mongoose from '../services/DBconnect.service';
import { Schema } from "mongoose";

const user_schema = new Schema({
    id: { type: Number },
    name: { type: String },
    password: { type: String },
    phone: { type: String },
    email: { type: String },
    isAdmin: { type: Boolean }
});

export default mongoose.model("user_model", user_schema);