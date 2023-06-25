module.exports = class GetLikes {
  constructor(user_id, created_at) {
    this.user_id = user_id;
    this.created_at = created_at;
  }

  getUserId() {
    return this.user_id;
  }
  getCreatedAt() {
    return this.created_at;
  }
};
