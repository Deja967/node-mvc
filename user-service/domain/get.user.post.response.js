module.exports = class getUserPosts {
  constructor(
    post_id,
    created_at,
    updated_at,
    message,
    user_id,
    comment_id,
    likes
  ) {
    this.post_id = post_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.message = message;
    this.user_id = user_id;
    this.comment_id = comment_id;
    this.likes = likes;
  }
};
