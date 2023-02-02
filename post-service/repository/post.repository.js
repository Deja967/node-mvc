const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const short = require('short-uuid');
const PostResponse = require('../domain/get.post.response');
const GetLikes = require('../domain/get.likes.response');
const { all } = require('../controller/post.controller');
const GetComments = require('../domain/get.comments.response');

module.exports = class PostRepository {
  async getOnePost(postId) {
    try {
      const allPost = await prisma.post.findMany({
        where: {
          id: postId,
        },
        include: {
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
              user.commentId,
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
    console.log('response', response);
    if (response.count === 1) {
      return 'post deleted successfully';
    }
    return 'post does not exist / post not deleted';
  }
};
