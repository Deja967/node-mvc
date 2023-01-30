module.exports = class DeletePost {
  constructor(success_message, user_id, message) {
    this.success_message = success_message;
    this.user_id = user_id;
    this.message = message;
  }

  getSuccessMessage() {
    return this.success_message;
  }
  getUserId() {
    return this.user_id;
  }
  getPost() {
    return this.message;
  }
};
