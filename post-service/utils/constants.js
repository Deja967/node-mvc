const RouteEndPoints = {
  ADD_POST: '/api/add-post',
  ADD_COMMENT: '/api/add-comment',
  ADD_POST_LIKE: '/api/update-post-likes',

  UPDATE_POST: '/api/update-post',
  UPDATE_POST_LIKE: '/api/update-post-likes',
  UPDATE_COMMENT: '/api/update-comment',
  UPDATE_COMMENT_LIKE: '/api/update-comment-likes',

  DELETE_POST: '/api/delete-post',
  DELETE_COMMENT: '/api/delete-comment',

  DELETE_POST_LIKE: '/api/remove-post-likes',
  DELETE_COMMENT_LIKE: '/api/remove-comment-likes',

  GET_ALL_POSTS: '/api/get-all-post',
  GET_ALL_POSTS_FROM_USER: '/api/get-all-user-post',
  GET_POST: '/api/get-one-post',
};

const ResponseMessages = {
  POST_ADD_SUCCESS: 'Post added successfully',
  POST_UPDATE_SUCCESS: 'Post updated successfully',
  POST_DELETE_SUCCESS: 'Post deleted successfully',

  COMMENT_ADD_SUCCESS: 'Comment added successfully',
  COMMENT_UPDATE_SUCCESS: 'Comment updated successfully',
  COMMENT_DELETE_SUCCESS: 'Comment deleted successfully',
};

const ErrorMessages = {
  BAD_REQUEST: 'Bad Request',
  AUTH_ERROR: 'Authorization Error',
  EXIST_ERROR: 'Already Exist',
  NOT_FOUND_ERROR: 'Not Found',

  USER_EXISTS: 'User with this email already exists',
  USER_NOT_FOUND: 'No user found with this email',

  POST_EXISTS: 'Post already exists',
  POST_NOT_FOUND: 'Post not found',

  COMMENT_EXISTS: 'Comment already exists',
  COMMENT_NOT_FOUND: 'Comment not found',

  LIKE_EXISTS: 'like already exists',
  LIKE_NOT_FOUND: 'like not found',
};

const nodeDate = new Date().toJSON().slice(0, 19).replace('T', ' ');
module.exports = {
  RouteEndPoints,
  nodeDate: nodeDate,
  RouteEndPoints,
  ResponseMessages,
  ErrorMessages,
};
