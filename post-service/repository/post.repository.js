const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const short = require('short-uuid');
const PostResponse = require('../domain/get.post.response');
const GetLikes = require('../domain/get.likes.response');
const { all } = require('../controller/post.controller');
const GetComments = require('../domain/get.comments.response');
const { ErrorMessages, ResponseMessages } = require('../utils/constants');
const Api404Error = require('../utils/errors/404');

module.exports = class PostRepository {
  async getOnePost(postId) {
    try {
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
        },
        include: {
          comment: { include: { likes: true } },
          likes: { include: { like: true } },
        },
      });
      if (!post) {
        const error = new Api404Error();
        error.description = ErrorMessages.POST_NOT_FOUND;
        throw error;
      }
      const response = JSON.parse(
        JSON.stringify(
          new PostResponse(
            post.id,
            post.createdAt,
            post.updatedAt,
            post.message,
            post.userId,
            post.comment.map(
              (getComment) =>
                new GetComments(
                  getComment.userId,
                  getComment.createdAt,
                  getComment.message,
                  getComment.likes.map(
                    (like) => new GetLikes(like.assignedBy, like.assignedAt)
                  )
                )
            ),
            post.likes.map(
              (like) => new GetLikes(like.like.userId, like.like.createdAt)
            )
          )
        )
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllPostsFromAllUsers() {
    try {
      const allPost = await prisma.post.findMany();
      console.log(allPost);
      return allPost;
    } catch (err) {
      console.log(err);
    }
  }

  async getPostsFromSingleUser(userId) {
    try {
      const allPost = await prisma.post.findMany({
        where: {
          userId: userId,
        },
        include: {
          comment: { include: { likes: true } },
          likes: { include: { like: true } },
        },
      });
      const response = JSON.parse(
        JSON.stringify(
          allPost.map((user) => {
            return new PostResponse(
              user.id,
              user.createdAt,
              user.updatedAt,
              user.message,
              user.userId,
              user.comment.map(
                (getComment) =>
                  new GetComments(
                    getComment.userId,
                    getComment.createdAt,
                    getComment.message,
                    getComment.likes.map(
                      (like) => new GetLikes(like.assignedBy, like.assignedAt)
                    )
                  )
              ),
              user.likes.map(
                (like) => new GetLikes(like.like.userId, like.like.createdAt)
              )
            );
          })
        )
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async createNewPost(email, userId, message) {
    // todo: get id from email
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
        const error = new Api404Error();
        error.description = ErrorMessages.POST_NOT_FOUND;
        throw error;
      }
      return ResponseMessages.POST_UPDATE_SUCCESS;
    } catch (err) {
      throw err;
    }
  }

  async destroyPost(userId, postId) {
    const comment = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      select: { id: true },
    });

    const commentLikes = await prisma.likesOnComments.findMany({
      where: {
        commentId: { in: comment.map((like) => like.id) },
      },
      select: {
        likeId: true,
      },
    });
    const likeSetOne = commentLikes.map((like) => like.likeId);
    const postLikes = await prisma.likesOnPosts.findMany({
      where: {
        postId: postId,
      },
      select: {
        likeId: true,
      },
    });
    const likeSetTwo = postLikes.map((like) => like.likeId);
    const deleteLikes = likeSetOne.concat(likeSetTwo);

    const deleteAssociatedLikes = await prisma.likes.deleteMany({
      where: {
        id: { in: deleteLikes.map((like) => like) },
      },
    });
    const response = await prisma.post.deleteMany({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (response.count === 1) {
      return ResponseMessages.POST_DELETE_SUCCESS;
    }
    return ErrorMessages.POST_NOT_FOUND;
  }
};
