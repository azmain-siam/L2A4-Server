import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add password"] },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not valid, please provide a valid role",
      },
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
