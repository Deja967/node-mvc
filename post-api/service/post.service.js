const CreateNewPost = require('../domain/create.post.response.js');
const DeletePost = require('../domain/delete.post.response.js');
const UpdatePost = require('../domain/update.post.response');

const PostRepository = require('../repository/post.repository.js');
const repository = new PostRepository();
const axios = require('axios');

module.exports = class PostService {
  async getOnePost(postId) {
    const response = await repository.getOnePost(postId);
    return response;
  }

  async getAllPostsFromAllUsers() {
    const response = await repository.getAllPostsFromAllUsers();
    return response;
  }

  async getAllPostsFromSingleUser(userId) {
    const response = await repository.getPostsFromSingleUser(userId);
    return response;
  }

  async addPost(email, userId, message) {
    const response = await repository.createNewPost(email, userId, message);
    return new CreateNewPost(
      'Post created successfully',
      email,
      userId,
      response.message
    );
  }

  async updatePost(userId, postId, new_message) {
    const response = await repository.updatePost(userId, postId, new_message);
    if (response === 'Post does not exist') {
      return 'Post does not exist';
    }
    return new UpdatePost(response, postId, userId, new_message);
  }

  async deletePost(userId, postId, message) {
    const response = await repository.destroyPost(userId, postId);
    if (response === 'Post does not exist') {
      return 'Post does not exist';
    }
    return new DeletePost('Post successfully deleted', userId, message);
  }
};
