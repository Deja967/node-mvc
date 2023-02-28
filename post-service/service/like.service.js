const LikeRepository = require('../repository/like.repository');
const repository = new LikeRepository();

module.exports = class LikeService {
  async updatePostLikes(userId, postId) {
    try {
      const response = await repository.updatePostLikes(userId, postId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async removePostLikes(userId, likeId, postId) {
    try {
      const response = await repository.removePostLikes(userId, likeId, postId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateCommentLikes(userId, commentId) {
    try {
      const response = await repository.updateCommentLikes(userId, commentId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async removeCommentLikes(userId, likeId, commentId) {
    const response = await repository.removeCommentLikes(
      userId,
      likeId,
      commentId
    );
    if (response === 'Comment does not exist') {
      return 'Comment does not exist';
    }
    return response;
  }
};
