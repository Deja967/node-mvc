const CommentRepository = require('../repository/comment.repository');
const repository = new CommentRepository();

module.exports = class CommentService {
  async addComment(userId, postId, comment) {
    const response = await repository.createComment(userId, postId, comment);
    return response;
  }

  async updateComment(userId, commentId, editedComment) {
    const response = await repository.updateComment(
      userId,
      commentId,
      editedComment
    );
    return response;
  }

  async deleteComment(userId, commentId) {
    const response = await repository.deleteComment(userId, commentId);
    return response;
  }
};
