import { ListBlogProps } from "./listBlogs.interface";

export interface categoryBlogItem {
  id: number;
  attributes: {
    category: string;
    blogs: {
      data: ListBlogProps[];
    };
    createdAt: string;
    updatedAt: string;
  };
}
