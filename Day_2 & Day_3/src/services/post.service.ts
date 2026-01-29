import Post from "../models/posts";
import { IPost } from "../types/posts";

// import APIError from "../utils/APIError";

class PostService {
  static async getAllPosts() {
    const posts = await Post.find({}, { author: 0 });
    return posts;
  }

  static async createPost(post: IPost) {
    const { title, content, tags, published } = post;

    const newPost = await Post.create({ title, content, tags, published });
    return newPost;
  }

  static async getPostById(id: string) {
    const post = await Post.findOne({ _id: id });
    return post;
  }

  static async updatePost(id: string, post: Partial<IPost>) {
    const { title, content } = post;
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { title, content },
      { new: true },
    );
    return updatedPost;
  }

  static async deletePost(id: string) {
    const deletedPost = await Post.findOneAndDelete({ _id: id });
    return deletedPost;
  }
}

export default PostService;
