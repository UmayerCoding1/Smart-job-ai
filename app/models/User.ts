import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export const ROLE = {
  JOBSEEKER: "jobseeker",
  REQRUITER: "reqruiter",
  ADMIN: "admin",
}as const;

export const VERIFIED = {
  UNVERIFIED: "unverified",
  VERIFIED: "verified",
} as const;


export interface  IEducation{
  degree: string;
  institution: string;
  year: number
}

export interface IAppliedJob {
  jodId: mongoose.Types.ObjectId;
  appliedAt: Date;
  status: string;
}

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  education: IEducation[];
  savejobs?: mongoose.Types.ObjectId[];
  appliedjobs?: IAppliedJob[];
  company?: mongoose.Types.ObjectId;
  postJobs?: mongoose.Types.ObjectId[];
  profileComplete: number;
  isVerified: string;
  createdAt?: Date;
  updatedAt?: Date;
}



const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
     required: true,
      enum: Object.values(ROLE),
      
    },
    avatar: {
      type: String,
      default: "", // or a default avatar URL
    },
    education: [
      {
        degree: { type: String, required: false },
        institution: { type: String, required: false },
        year: { type: Number, required: false },
      },
    ],
    savejobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    appliedjobs: [
      {
        jodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          default: "pending",
        },
      },
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    postJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    profileComplete: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: String,
      default: VERIFIED.UNVERIFIED,
      enum: Object.values(VERIFIED),
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = models.User || model<IUser>("User", userSchema);
