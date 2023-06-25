const GetLikes = require('../domain/get.likes.response');
const GetComments = require('../domain/get.comments.response');
module.exports = class AllPostResponse {
  constructor(
    post_id,
    created_at,
    updated_at,
    message,
    user_id,
    comments = new GetComments(),
    likes = new GetLikes()
  ) {
    //TODO: comment_id,  should be list
    this.post_id = post_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.message = message;
    this.user_id = user_id;
    this.comments = comments;
    this.likes = likes;
  }

  getPostId() {
    return this.post_id;
  }
  getCreatedAt() {
    return this.created_at;
  }
  getUpdatedAt() {
    return this.updated_at;
  }
  getMessage() {
    return this.message;
  }

  getUserId() {
    return this.user_id;
  }

  getCommentId() {
    return this.comments;
  }

  getLikes() {
    return this.likes;
  }
};
