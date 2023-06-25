module.exports = class CreateNewPost {
  constructor(success_message, email, user_id, message) {
    this.success_message = success_message;
    this.email = email;
    this.user_id = user_id;
    this.message = message;
  }

  getSuccessMessage() {
    return this.success_message;
  }
  getEmail() {
    return this.email;
  }
  getUserId() {
    return this.user_id;
  }
  getPost() {
    return this.message;
  }
};
