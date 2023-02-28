const router = require('express').Router();
const CommentService = require('../service/comment.service');
const BaseError = require('../utils/baseError');

const { RouteEndPoints } = require('../utils/constants');
const service = new CommentService();

router.post(RouteEndPoints.ADD_COMMENT, async (req, res) => {
  const { user_id, post_id, comment } = req.body;
  try {
    const response = await service.addComment(user_id, post_id, comment);
    res.status(200).json({ message: response });
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

router.put(RouteEndPoints.UPDATE_COMMENT, async (req, res) => {
  const { user_id, comment_id, edit_comment } = req.body;

  try {
    const response = await service.updateComment(
      user_id,
      comment_id,
      edit_comment
    );
    return res.status(200).send({ message: response });
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

router.delete(RouteEndPoints.DELETE_COMMENT, async (req, res) => {
  const { user_id, comment_id } = req.body;
  try {
    const response = await service.deleteComment(user_id, comment_id);
    return res.status(200).send({ message: response });
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

module.exports = router;
