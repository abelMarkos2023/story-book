type Book = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: string;
  author?: string;
  createdBy: string;
  chapters: string[];
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
};

export default Book;