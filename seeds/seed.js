const sequelize = require('../config/connection');
const { User, Topic, Post } = require('../models');
const postData = require('./postData.json');
const userData = require('./userData.json');
const topicData = require('./topicData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
 
  for (const topic of topicData) {
    await Topic.create({
      ...topic,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    };
  
    const topics = await Topic.findAll({
      individualHooks: true,
      returning: true,
    });


    for (const post of postData) {
      await Post.create({
        ...post,
        topic_id: topics[Math.floor(Math.random() * topics.length)].id,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        users: users.username
        
      });
    };



  

  

  process.exit(0);
};

seedDatabase();
