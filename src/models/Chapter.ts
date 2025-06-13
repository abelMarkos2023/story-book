import mongoose, { Schema, models } from 'mongoose';

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

const Chapter = models.Chapter || mongoose.model('Chapter', ChapterSchema);

export default Chapter;
