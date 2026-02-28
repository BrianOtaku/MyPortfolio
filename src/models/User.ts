import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String, // chỉ có nếu credentials
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: String,
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
