//endpoints
const getAllPostsFromAllUsers = '/api/get-all-post';
const getAllPostsFromSingleUser = '/api/get-all-user-post';
const getSinglePost = '/api/get-one-post';
const addNewPost = '/api/add-post';
const deletePost = '/api/delete-post';
const updatePost = '/api/update-post';

//endpoints for likes
const updateCommentLikes = '/api/update-comment-likes';
const removeCommentLikes = '/api/remove-comment-likes';
const updatePostLikes = '/api/update-post-likes';
const removePostLikes = '/api/remove-post-likes';

//endpoints for comments
const addComment = '/api/add-comment';
const updateComment = '/api/update-comment';
const deleteComment = '/api/delete-comment';

module.exports = {
  getAllPostsFromAllUsers: getAllPostsFromAllUsers,
  getAllPostsFromSingleUser: getAllPostsFromSingleUser,
  getSinglePost: getSinglePost,
  addNewPost: addNewPost,
  deletePost: deletePost,
  updatePost: updatePost,
  updatePostLikes: updatePostLikes,
  removePostLikes: removePostLikes,
  updateCommentLikes: updateCommentLikes,
  addComment: addComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  removeCommentLikes: removeCommentLikes,
};
