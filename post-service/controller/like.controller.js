const { verifyToken } = require('../middleware/verify.jwt.js');
const LikeService = require('../service/like.service');
const { RouteEndPoints } = require('../utils/constants');
const service = new LikeService();
const router = require('express').Router();
const constants = require('../utils/constants');

router.put(RouteEndPoints.UPDATE_POST_LIKE, verifyToken, async (req, res) => {
  const { user_id, post_id } = req.body;
  const response = await service.updatePostLikes(user_id, post_id);
  return res.status(200).send({ message: response });
});

router.delete(
  RouteEndPoints.DELETE_POST_LIKE,
  verifyToken,
  async (req, res) => {
    const { user_id, like_id, post_id } = req.body;
    const response = await service.removePostLikes(user_id, like_id, post_id);
    return res.status(200).send({ message: response });
  }
);

router.put(
  RouteEndPoints.UPDATE_COMMENT_LIKE,
  verifyToken,
  async (req, res) => {
    const { user_id, comment_id } = req.body;
    const response = await service.updateCommentLikes(user_id, comment_id);
    return res.status(200).send({ message: response });
  }
);

router.delete(
  RouteEndPoints.DELETE_COMMENT_LIKE,
  verifyToken,
  async (req, res) => {
    const { user_id, like_id, comment_id } = req.body;
    const response = await service.removeCommentLikes(
      user_id,
      like_id,
      comment_id
    );
    return res.status(200).send({ message: response });
  }
);
module.exports = router;
