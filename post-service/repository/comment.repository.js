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
};
