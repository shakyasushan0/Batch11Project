import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { z } from "zod";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const userAddSchema = z.object({
  fullname: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false),
});

const User = mongoose.model("User", userSchema);

export default User;

// authentication && authorization
// jwt -> json web token
