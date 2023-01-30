module.exports = class UpdatePost {
  constructor(success_message, post_id, user_id, new_message) {
    this.success_message = success_message;
    this.post_id = post_id;
    this.user_id = user_id;
    this.new_message = new_message;
  }

  getSuccessMessage() {
    return this.success_message;
  }
  getPostId() {
    return this.post_id;
  }
  getUserId() {
    return this.user_id;
  }
  getNewMessage() {
    return this.new_message;
  }
};
