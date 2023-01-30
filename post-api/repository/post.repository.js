const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const short = require('short-uuid');
const PostResponse = require('../domain/get.post.response');

module.exports = class PostRepository {
  async getOnePost(postId) {
    try {
      console.log(postId);
      const allPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      return new PostResponse(
        allPost.id,
        allPost.createdAt,
        allPost.updatedAt,
        allPost.message,
        allPost.userId,
        allPost.commentId,
        allPost.likeId
      );
    } catch (err) {
      console.log(err);
    }
  }

  async getAllPostsFromAllUsers() {
    try {
      const allPost = await prisma.post.findMany();
      return allPost.map((postData) => {
        return new PostResponse(
          postData.id,
          postData.createdAt,
          postData.updatedAt,
          postData.message,
          postData.userId,
          postData.commentId,
          postData.likeId
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getPostsFromSingleUser(userId) {
    try {
      const allUserPost = await prisma.post.findMany({
        where: {
          userId: userId,
        },
      });
      return allUserPost.map((postData) => {
        return new PostResponse(
          postData.id,
          postData.createdAt,
          postData.updatedAt,
          postData.message,
          postData.userId,
          postData.commentId,
          postData.likeId
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  async createNewPost(email, userId, message) {
    try {
      const newPost = await prisma.post.create({
        data: {
          id: short.generate(),
          message: message,
          userId: userId,
        },
      });
      return newPost;
    } catch (err) {
      console.log(err);
    }
  }

  async updatePost(userId, postId, new_message) {
    try {
      //Multiple clause in .update not supported, so have to use updateMany
      const response = await prisma.post.updateMany({
        data: {
          message: new_message,
        },
        where: {
          id: postId,
          userId: userId,
        },
      });
      if (response.count === 0) {
        return 'Post does not exist';
      }
      return 'Post updated successfully';
    } catch (err) {
      console.log(err);
    }
  }

  async destroyPost(userId, postId) {
    try {
      //Multiple clause in .delete not supported, so have to use deleteMany
      const response = await prisma.post.deleteMany({
        where: {
          id: postId,
          userId: userId,
        },
      });
      if (response.count === 0) {
        return 'Post does not exist';
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  }
};
