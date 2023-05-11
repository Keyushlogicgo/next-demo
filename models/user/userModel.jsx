import mongoose from "mongoose";

const modelSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, require: true },
    email: { type: String, trim: true, require: true, unique: true },
    password: { type: String, trim: true, require: true },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", modelSchema);

export default userModel;
