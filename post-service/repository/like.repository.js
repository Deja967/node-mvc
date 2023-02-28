const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const short = require('short-uuid');

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
        return 'Post does not exist';
      }
      //TODO: fix check, its not doing and but or

      const like = await prisma.likesOnPosts.findMany({
        where: {
          postId: postId,
          assignedBy: userId,
        },
      });
      //   if (like) {
      //     return 'User already liked this post';
      //   }
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
      return 'Like added to post';
    } catch (err) {
      console.log(err);
    }
  }

  async removePostLikes(userId, likeId, postId) {
    //todo: add extra query to check if like exists
    const response = await prisma.$transaction(async (transaction) => {
      await transaction.likes.delete({
        where: { id: likeId },
      });
      return transaction.likesOnPosts.deleteMany({
        where: {
          likeId: likeId,
          postId: postId,
          assignedBy: userId,
        },
      });
    });
    console.log('res :', response);

    if (response.count === 0) {
      return 'Like does not exist';
    }
    return 'Like removed from post';
  }

  async updateCommentLikes(userId, commentId) {
    try {
      const findComment = await prisma.comment.findMany({
        where: {
          id: commentId,
        },
      });
      if (findComment.length === 0) {
        return 'comment does not exist';
      }

      //todo: check this logic later
      // await prisma.likesOnComments.findMany({
      //   where: {
      //     commentId: commentId,
      //     assignedBy: userId,
      //   },
      // });
      // if (findComment) {
      //   return 'You already liked this comment';
      // }

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
      return 'Like added to comment';
    } catch (err) {
      console.log(err);
    }
  }

  async removeCommentLikes(userId, likeId, commentId) {
    //todo: add extra query to check if like exists
    const response = await prisma.$transaction(async (transaction) => {
      const doesLikeExist = await transaction.likes.delete({
        where: { id: likeId },
      });
      //todo: check this logic later
      process.on('unhandledRejection', (error) => {
        return 'like does not exist';
      });
      return transaction.likesOnComments.deleteMany({
        where: {
          //make sure id comes comments
          likeId: likeId,
          commentId: commentId,
          assignedBy: userId,
        },
      });
    });
    return 'Like removed from comment';
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
