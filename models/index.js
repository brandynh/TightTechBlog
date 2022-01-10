const User = require('./User');
const Topic = require('./Topic');
const Post = require('./Post');

User.hasMany(Topic, {
  foreignKey: 'user_id',
});

Topic.belongsTo(User), {
  foreignKey: "user_id",
};

Post.belongsToMany(User, {
  through: 'topic_id'
})

module.exports = { User, Topic, Post };
