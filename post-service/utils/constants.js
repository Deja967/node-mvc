//endpoints
const getAllPostsFromAllUsers = '/api/get-all-post';
const getAllPostsFromSingleUser = '/api/get-all-user-post';
const getSinglePost = '/api/get-one-post';
const addNewPost = '/api/add-post';
const deletePost = '/api/delete-post';
const updatePost = '/api/update-post';
const updatePostLikes = '/api/update-post-likes';
const removePostLikes = '/api/remove-post-likes';

module.exports = {
  getAllPostsFromAllUsers: getAllPostsFromAllUsers,
  getAllPostsFromSingleUser: getAllPostsFromSingleUser,
  getSinglePost: getSinglePost,
  addNewPost: addNewPost,
  deletePost: deletePost,
  updatePost: updatePost,
  updatePostLikes: updatePostLikes,
  removePostLikes: removePostLikes,
};
