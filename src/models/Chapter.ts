import mongoose, {  InferSchemaType, Schema, models } from 'mongoose';
import Book from './Book';

console.log(Book)

const ChapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  book: {
  type: Schema.Types.ObjectId, 
  ref: "Book", 
  required: true
  
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// 👇 Automatically infers the type from the schema
export type ChapterType = InferSchemaType<typeof ChapterSchema>;

const Chapter = models.Chapter || mongoose.model('Chapter', ChapterSchema);

export default Chapter;
