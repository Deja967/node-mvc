const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const short = require('short-uuid');
const { post } = require('../controller/like.controller');
const { ResponseMessages, ErrorMessages } = require('../utils/constants');

const Api404Error = require('../utils/errors/404');
const Api409Error = require('../utils/errors/409');
const httpStatusCodes = require('../utils/httpStatusCodes');

module.exports = class LikeRepository {
  async updatePostLikes(userId, postId) {
    try {
      const generatedId = short.generate();
      //so if the post exist we can add a like with corresponding userId in the query
      const post = await prisma.post.findMany({
        where: {
          id: postId,
        },
        include: {
          likes: { include: { like: true } },
        },
      });
      if (post.length === 0) {
        const error = new Api404Error();
        error.description = ErrorMessages.POST_NOT_FOUND;
        throw error;
      }
      const like = await prisma.likesOnPosts.findMany({
        where: {
          postId: postId,
          assignedBy: userId,
        },
      });
      if (like.length > 0) {
        const error = new Api409Error();
        error.description = ErrorMessages.LIKE_EXISTS;
        throw error;
      }
      //Multiple clause in .update not supported, so have to use updateMany
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          //camel case so this corresponds to LikesOnPost
          likes: {
            create: [
              {
                //camel case so this corresponds to Likes
                assignedBy: userId,
                assignedAt: new Date(),
                //corresponds to actual Likes in schema
                like: {
                  create: {
                    id: generatedId,
                    userId: userId,
                  },
                },
              },
            ],
          },
        },
      });
      return ResponseMessages.LIKE_ADD_SUCCESS;
    } catch (err) {
      throw err;
    }
  }

  async removePostLikes(userId, likeId, postId) {
    try {
      const postLike = await prisma.likes.deleteMany({
        where: { id: likeId, userId: userId },
      });

      if (postLike.count === 0) {
        const error = new Api404Error();
        error.description = ErrorMessages.LIKE_NOT_FOUND;
        throw error;
      }
      return ResponseMessages.LIKE_DELETE_SUCCESS;
    } catch (err) {
      throw err;
    }
  }

  async updateCommentLikes(userId, commentId) {
    try {
      const findCommentLike = await prisma.likesOnComments.findMany({
        where: {
          commentId: commentId,
          assignedBy: userId,
        },
      });

      if (findCommentLike.length > 0) {
        const error = new Api409Error();
        error.description = ErrorMessages.LIKE_EXISTS;
        throw error;
      }

      //is .update comment necessary? probably could just create a new LikesOnComment
      await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likes: {
            create: {
              assignedAt: new Date(),
              assignedBy: userId,
              like: {
                create: {
                  id: short.generate(),
                  userId: userId,
                },
              },
            },
          },
        },
      });
      return ResponseMessages.LIKE_ADD_SUCCESS;
    } catch (err) {
      throw err;
    }
  }

  async removeCommentLikes(userId, likeId, commentId) {
    try {
      const doesLikeExist = await prisma.likes.deleteMany({
        where: { id: likeId, userId: userId },
      });
      console.log(doesLikeExist);
      if (doesLikeExist.count === 0) {
        throw new Api404Error(
          ErrorMessages.NOT_FOUND_ERROR,
          httpStatusCodes.NOT_FOUND,
          ErrorMessages.DOES_NOT_EXIST
        );
      }
      return ResponseMessages.LIKE_DELETE_SUCCESS;
    } catch (err) {
      throw err;
    }
  }
};

//notes
//The onDelete: Cascade directive in Prisma defines the deletion behavior of one side of the relation. If you set onDelete: Cascade on the Likes side of the LikesOnPosts or LikesOnComments relation, it means that if you delete a Likes instance,
//its associated LikesOnPosts or LikesOnComments instances will be automatically deleted as well.
//However, if you set onDelete: Cascade on the LikesOnPosts or LikesOnComments side of the relation,
//it means that if you delete a LikesOnPosts or LikesOnComments instance, the associated Likes instance will not be deleted.
//This behavior is consistent with the relational database theory and the idea of referential integrity.
//The onDelete: Cascade directive specifies which side of the relation should be deleted in case the referenced side is deleted.
//By convention, if you want to delete the referenced side as well, you set onDelete: Cascade on the referencing side.
