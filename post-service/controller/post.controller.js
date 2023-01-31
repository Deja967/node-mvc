const { verifyToken } = require('../middleware/verify.jwt.js');
const PostService = require('../service/post.service.js');
const service = new PostService();
const router = require('express').Router();
const constants = require('../utils/constants.js');

router.get(constants.getSinglePost, verifyToken, async (req, res) => {
  const post_id = req.query.postId;
  const response = await service.getOnePost(post_id);
  return res.status(200).send({ data: response });
});

router.get(constants.getAllPostsFromAllUsers, verifyToken, async (req, res) => {
  const response = await service.getAllPostsFromAllUsers();
  return res.status(200).send({ data: response });
});

router.get(constants.getAllPostsFromSingleUser, async (req, res) => {
  const userId = req.query.userId;
  const response = await service.getAllPostsFromSingleUser(userId);
  return res.status(200).send({ data: response });
});

router.post(constants.addNewPost, verifyToken, async (req, res) => {
  const { email, id, message } = req.body;
  const response = await service.addPost(email, id, message);
  return res.status(200).send(response);
});

router.put(constants.updatePost, verifyToken, async (req, res) => {
  const { user_id, post_id, new_message } = req.body;
  const response = await service.updatePost(user_id, post_id, new_message);
  return res.status(200).send(response);
});

router.delete(constants.deletePost, verifyToken, async (req, res) => {
  const { user_id, post_id, message } = req.body;
  const response = await service.deletePost(user_id, post_id, message);
  return res.status(200).send({ response });
});

module.exports = router;
