import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Comment || model("Comment", CommentSchema);
