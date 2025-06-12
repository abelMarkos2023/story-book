// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },  // remove `required: true`
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
