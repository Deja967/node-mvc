const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const short = require('short-uuid');
const { ErrorMessages, ResponseMessages } = require('../utils/constants');
const httpStatusCodes = require('../utils/httpStatusCodes');
const Api404Error = require('../utils/errors/404');
module.exports = class CommentRepository {
  async createComment(userId, postId, comment) {
    try {
      const findPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!findPost) {
        const error = new Api404Error();
        error.description = ErrorMessages.POST_NOT_FOUND;
        throw error;
      }
      const addComment = await prisma.comment.create({
        data: {
          id: short.generate(),
          userId: userId,
          message: comment,
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
      return ResponseMessages.COMMENT_ADD_SUCCESS;
    } catch (err) {
      throw err;
    }
  }

  async updateComment(userId, commentId, newComment) {
    try {
      const response = await prisma.comment.updateMany({
        where: {
          id: commentId,
          userId: userId,
        },
        data: {
          message: newComment,
        },
      });
      if (response.count === 0) {
        const error = new Api404Error();
        error.description = ErrorMessages.COMMENT_NOT_FOUND;
        throw error;
      }
      return ResponseMessages.COMMENT_UPDATE_SUCCESS;
    } catch (err) {
      throw err;
    }
  }

  async deleteComment(userId, commentId) {
    try {
      const likes = await prisma.likesOnComments.findMany({
        where: {
          commentId: commentId,
        },
        select: {
          likeId: true,
        },
      });

      if (likes.length === 0) {
        const comment = await prisma.comment.deleteMany({
          where: {
            id: commentId,
            userId: userId,
          },
        });

        if (comment.count === 0) {
          const error = new Api404Error();
          error.description = ErrorMessages.COMMENT_NOT_FOUND;
          throw error;
        }
        return ResponseMessages.COMMENT_DELETE_SUCCESS;
      }

      if (likes.length > 0) {
        //deleting likes and comments will both delete the LikesOnComments but LikesOnComments wont delete them
        const removeAssociatedLikes = await prisma.$transaction(
          async (transaction) => {
            await transaction.likes.deleteMany({
              where: { id: { in: likes.map((like) => like.likeId) } },
            });
          }
        );

        const comment = await prisma.comment.deleteMany({
          where: {
            id: commentId,
            userId: userId,
          },
        });

        if (comment.count === 0) {
          const error = new Api404Error();
          error.description = ErrorMessages.COMMENT_NOT_FOUND;
          throw error;
        }
        return ResponseMessages.COMMENT_DELETE_SUCCESS;
      }
    } catch (err) {
      throw err;
    }
  }
};
