const router = require('express').Router();
const { Topic, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTopic = await Topic.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTopic);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/topicPost', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const topicData = await Topic.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!topicData) {
      res.status(404).json({ message: 'No topic found with this id!' });
      return;
    }

    res.status(200).json(topicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/topicPost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        topic_id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
