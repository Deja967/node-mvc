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
};

//notes
//The onDelete: Cascade directive in Prisma defines the deletion behavior of one side of the relation. If you set onDelete: Cascade on the Likes side of the LikesOnPosts or LikesOnComments relation, it means that if you delete a Likes instance,
//its associated LikesOnPosts or LikesOnComments instances will be automatically deleted as well.
//However, if you set onDelete: Cascade on the LikesOnPosts or LikesOnComments side of the relation,
//it means that if you delete a LikesOnPosts or LikesOnComments instance, the associated Likes instance will not be deleted.
//This behavior is consistent with the relational database theory and the idea of referential integrity.
//The onDelete: Cascade directive specifies which side of the relation should be deleted in case the referenced side is deleted.
//By convention, if you want to delete the referenced side as well, you set onDelete: Cascade on the referencing side.
