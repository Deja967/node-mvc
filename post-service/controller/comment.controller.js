const router = require('express').Router();
const constants = require('../utils/constants');

const CommentService = require('../service/comment.service');
const service = new CommentService();

router.post(constants.addComment, async (req, res) => {
  const { user_id, post_id, comment } = req.body;
  try {
    const response = await service.addComment(user_id, post_id, comment);
    res.status(200).json({ message: response });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(constants.updateComment, async (req, res) => {
  const { user_id, comment_id, edit_comment } = req.body;

  try {
    const response = await service.updateComment(
      user_id,
      comment_id,
      edit_comment
    );
    return res.status(200).send({ message: response });
  } catch (err) {
    console.log(err);
  }
});

router.delete(constants.deleteComment, async (req, res) => {
  const { user_id, comment_id } = req.body;
  try {
    const response = await service.deleteComment(user_id, comment_id);
    return res.status(200).send({ message: response });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
