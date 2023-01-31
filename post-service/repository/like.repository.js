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
      const like = await prisma.likesOnPosts.findMany({
        where: {
          postId: postId,
          assignedBy: userId,
        },
      });
      if (like) {
        return 'User already liked this post';
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
      return 'Like added to post';
    } catch (err) {
      console.log(err);
    }
  }

  async removePostLikes(userId, postId) {
    const response = await prisma.post.findUnique({
      where: {
        id: '1VZpQufT4mCOU4',
      },
      data: {
        //camel case so this corresponds to LikesOnPost
        likes: {
          delete: [
            {
              //camel case so this corresponds to Likes
              assignedBy: userId,
              assignedAt: new Date(),
              //corresponds to actual Likes in schema
              like: {
                delete: {
                  where: {
                    id: postId,
                    userId: userId,
                  },
                },
              },
            },
          ],
        },
      },
    });
    console.log(response);
  }
};
