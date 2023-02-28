const CommentRepository = require('../repository/comment.repository');
const repository = new CommentRepository();

module.exports = class CommentService {
  async addComment(userId, postId, comment) {
    try {
      const response = await repository.createComment(userId, postId, comment);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async updateComment(userId, commentId, editedComment) {
    try {
      const response = await repository.updateComment(
        userId,
        commentId,
        editedComment
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteComment(userId, commentId) {
    try {
      const response = await repository.deleteComment(userId, commentId);
      return response;
    } catch (err) {
      throw err;
    }
  }
};
