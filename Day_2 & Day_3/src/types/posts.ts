import { Document, Types } from "mongoose";

export interface IPost {
  author: Types.ObjectId;
  title: string;
  content: string;
  tags?: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostDocument extends IPost, Document {}
