const { verifyToken } = require('../middleware/verify.jwt.js');
const LikeService = require('../service/like.service');
const service = new LikeService();
const router = require('express').Router();
const constants = require('../utils/constants');

router.put(constants.updatePostLikes, verifyToken, async (req, res) => {
  const { user_id, post_id } = req.body;
  const response = await service.updatePostLikes(user_id, post_id);
  return res.status(200).send({ message: response });
});

router.delete(constants.removePostLikes, verifyToken, async (req, res) => {
  const { user_id, like_id } = req.body;
  const response = await service.removePostLikes(user_id, like_id);
  return res.status(200).send({ message: response });
});
module.exports = router;
