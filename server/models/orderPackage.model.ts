import mongoose from '../services/DBconnect.service';
import { Schema } from "mongoose";

import date from 'date-and-time';
const datePattern = date.compile('YYYY/MM/DD');
const hourPattern = date.compile('hh:mm');

const orderPackage_schema = new Schema({
    id: { type: Number },
    userId: { type: Number },
    packageId: { type: Number },
    date: { type: datePattern },
    beginingHour: { type: hourPattern },
    endHour: { type: hourPattern },
});

export default mongoose.model("orderPackage_model", orderPackage_schema);