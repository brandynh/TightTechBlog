const router = require('express').Router();
const { Topic, User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all topics and JOIN with user data
    const topicData = await Topic.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const topics = topicData.map((topic) => topic.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      topics,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/topic/:id', async (req, res) => {
  try {
    const topicData = await Topic.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'username'],
          // model: Post, 
          // attributes: ['description']
        },
      ],
    });
  

    const topic = topicData.get({ plain: true });

    -    res.render('topic', {
      ...topic,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/allPosts', async (req, res) => {
  try{
    const allPosts = await Post.findAll({
      include: {
        model: User,
        attributes: ['username']
      }
    });

    res.status(200).json(allPosts);
  } catch(err) {
    res.status(500).json(err);
  }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Topic }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
