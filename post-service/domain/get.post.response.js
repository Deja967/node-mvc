module.exports = class AllPostResponse {
  constructor(
    post_id,
    created_at,
    updated_at,
    message,
    user_id,
    comment_id,
    like_id
  ) {
    //TODO: comment_id, like_id should be list
    this.post_id = post_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.message = message;
    this.user_id = user_id;
    this.comment_id = comment_id;
    this.like_id = like_id;
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
    return this.comment_id;
  }

  getLikeId() {
    return this.like_id;
  }
};
