import { Schema, models, model } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String }, // URL or path to the cover image
    author: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // reference to admin/owner
    chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }], // array of chapter IDs
    status: { type: String, enum: ["published", "draft"], default: "draft" },
  },
  { timestamps: true }
);

export default models.Book || model("Book", BookSchema);
