import mongoose, { Schema, model, models } from "mongoose";

export interface ISalary {
  min: number;
  max: number;
}

export interface IJob {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  company: mongoose.Types.ObjectId;
  reqruiter: mongoose.Types.ObjectId;
  location: string;
  salaryrange: ISalary;
  jobtype: string;
  requiredSkills: string[];
  education: string[];
  experience: string;
  dedline: Date;
  category: string;
  holidayPolicy: string;
  workTime: {
    start: string;
    end: string;
  };
  shift: string;
  benefits: string[];
  vacancies: number;
  isRemoteAvailable: boolean;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  reqruiter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  salaryrange: { type: Object, required: true },
  jobtype: {
    type: String,
    required: true,
    enum: [
      "full-time",
      "part-time",
      "remote",
      "hybrid",
      "freelance",
      "internship",
      "contract",
    ],
  },
  requiredSkills: { type: [String], default: [], required: true },
  education: { type: [String], default: [], required: true },
  experience: {
    type: String,
    required: true,
    enum: ["internship", "entry", "mid", "senior", "lead"],
  },
  dedline: { type: Date, required: true },
  category: { type: String, required: true },
  holidayPolicy: {
    type: String,
    default: "Standard national holidays and company holidays apply.",
  },
  workTime: {
    start: { type: String, default: "09:00 AM" },
    end: { type: String, default: "05:00 PM" },
  },
  shift: { type: String, enum: ["day", "night", "flexble"], default: "day" },
  benefits: { type: [String], default: ["Medical", "Festiva Bonus"] },
  vacancies: { type: Number, default: 1 },
  isRemoteAvailable: { type: Boolean, default: false },
  status: {
    type: String,
    default: "active",
    enum: ["active", "closed", "paused"],
  },
});

export const Job = models.Job || model<IJob>("Job", JobSchema);
