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
};
