const LikeRepository = require('../repository/like.repository');
const repository = new LikeRepository();

module.exports = class LikeService {
  async updatePostLikes(userId, postId) {
    const response = await repository.updatePostLikes(userId, postId);
    if (response === 'Post does not exist') {
      return 'Post does not exist';
    }
    return response;
  }

  async removePostLikes(userId, likeId, postId) {
    const response = await repository.removePostLikes(userId, likeId, postId);
    if (response === 'Post does not exist') {
      return 'Post does not exist';
    }
    return response;
  }

  async updateCommentLikes(userId, commentId) {
    const response = await repository.updateCommentLikes(userId, commentId);
    if (response === 'Comment does not exist') {
      return 'Comment does not exist';
    }
    return response;
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
