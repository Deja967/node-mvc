const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const short = require('short-uuid');

module.exports = class CommentRepository {
  async createComment(userId, postId, comment) {
    try {
      const findPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!findPost) {
        console.log('its not here');
        return 'Post does not exist';
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
      return 'Comment added to post';
    } catch (err) {
      console.log(err);
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
      if (response.count === 1) {
        return 'Comment updated';
      }
      return 'Comment not found';
    } catch (err) {
      console.log(err);
    }
  }

  async deleteComment(userId, commentId) {
    const likes = await prisma.likesOnComments.findMany({
      where: {
        commentId: commentId,
      },
      select: {
        likeId: true,
      },
    });

    //deleting likes and comments will both delete the LikesOnComments but LikesOnComments wont delete them
    const removeAssociatedLikes = await prisma.$transaction(
      async (transaction) => {
        await transaction.likes.deleteMany({
          where: { id: { in: likes.map((like) => like.likeId) } },
        });
      }
    );

    if (!removeAssociatedLikes) {
      await prisma.comment.deleteMany({
        where: {
          id: commentId,
          userId: userId,
        },
      });
      return 'Comment deleted';
    }
    return 'Something went wrong, comment not deleted';
  }
};
