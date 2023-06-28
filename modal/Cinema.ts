import mongoose, { Schema, Document, Model } from "mongoose";

 interface ICinema extends Document {
  name: string;
  seats: number;
  seatsAvailable: number[];
  seatsOccupied: number[];
}

const cinemaSchema: Schema<ICinema> = new Schema({
  name: {
    type: String,
    require: true,
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
  },
  seatsAvailable: {
    type: [Number],
    default: [],
  },
  seatsOccupied: {
    type: [Number],
    default: [],
  },
});

export const Cinema: Model<ICinema> = mongoose.model<ICinema>("Cinema", cinemaSchema);

