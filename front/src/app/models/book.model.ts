import Author from "./author.model";

export default interface Book {
  id: number;
  title: string;
  coverText: string;
  author: Author;
  comment: string;
}
