import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { IUser } from "@/types/api";
import { NextResponse } from "next/server";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must contain at least 3 characters."],
      maxlength: [32, "Name must contain at most 32 characters."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Email must contain at least 3 characters."],
      maxlength: [64, "Email must contain at most 32 characters."],
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      required: true,
      select: false,
      trim: true,
      minlength: [8, "Password must contain at least 8 characters."],
    },
    dob: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      token: { type: String },
      expires: {
        type: Date,
      },
    },
  },
  { timestamps: true },
);

/// hashing Password
UserSchema.pre<IUser>("save", async function (next) {
  if ((this as any).isModified("password")) {
    try {
      const pass = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
      this.password = pass;
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }
  }
  next();
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
