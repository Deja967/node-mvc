const GetLikes = require('./get.likes.response');

module.exports = class GetComments {
  constructor(user_id, created_at, comment, likes = new GetLikes()) {
    this.user_id = user_id;
    this.created_at = created_at;
    this.comment = comment;
    this.likes = likes;
  }

  getUserId() {
    return this.user_id;
  }
  getCreatedAt() {
    return this.created_at;
  }
  GetComments() {
    return this.comments;
  }
  GetLikes() {
    return this.likes;
  }
};
