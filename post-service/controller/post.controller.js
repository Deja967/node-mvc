const { verifyToken } = require('../middleware/verify.jwt.js');
const PostService = require('../service/post.service.js');
const service = new PostService();
const router = require('express').Router();
const { RouteEndPoints } = require('../utils/constants');
const BaseError = require('../utils/baseError');

router.get(RouteEndPoints.GET_POST, verifyToken, async (req, res) => {
  try {
    const post_id = req.query.post_id;
    const response = await service.getOnePost(post_id);
    return res.status(200).send({ data: response });
  } catch (err) {
    if (err instanceof BaseError) {
      res.status(err.code).send({
        title: err.title,
        status: err.code,
        error: err.description,
      });
    }
  }
});

router.get(RouteEndPoints.GET_ALL_POSTS, verifyToken, async (req, res) => {
  const response = await service.getAllPostsFromAllUsers();
  return res.status(200).send({ data: response });
});

router.get(RouteEndPoints.GET_ALL_POSTS_FROM_USER, async (req, res) => {
  const userId = req.query.userId;
  const response = await service.getAllPostsFromSingleUser(userId);
  return res.status(200).send({ data: response });
});

router.post(RouteEndPoints.ADD_POST, verifyToken, async (req, res) => {
  const { email, id, message } = req.body;
  const response = await service.addPost(email, id, message);
  return res.status(200).send(response);
});

router.put(RouteEndPoints.UPDATE_POST, verifyToken, async (req, res) => {
  try {
    const { user_id, post_id, new_message } = req.body;
    const response = await service.updatePost(user_id, post_id, new_message);
    return res.status(200).send(response);
  } catch (err) {
    if (err instanceof BaseError) {
      res.status(err.code).send({
        title: err.title,
        status: err.code,
        error: err.description,
      });
    }
  }
});

router.delete(RouteEndPoints.DELETE_POST, verifyToken, async (req, res) => {
  const { user_id, post_id } = req.body;
  const response = await service.deletePost(user_id, post_id);
  return res.status(200).send({ response });
});

module.exports = router;
