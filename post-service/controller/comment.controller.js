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

module.exports = router;
