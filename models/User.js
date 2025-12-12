import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },  // UUID Field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
