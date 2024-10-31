import mongoose from '../services/DBconnect.service';
import { Schema } from "mongoose";

const business_schema = new Schema({
    name: { type: String },
    adress: { type: String },
    phone: { type: String },
});

export default mongoose.model("business_model", business_schema);