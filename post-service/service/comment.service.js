const CommentRepository = require('../repository/comment.repository');
const repository = new CommentRepository();

module.exports = class CommentService {
  async addComment(userId, postId, comment) {
    const response = await repository.createComment(userId, postId, comment);
    return response;
  }
};
