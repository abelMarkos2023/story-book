import Book from "./Book";

type Chapter = {
  _id: string;
  title: string;
  content: string;
  book: Book;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export default Chapter;