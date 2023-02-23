const User = require('./User');
const Post = require('./Post');

// users can have many posts,
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// but a post only has one poster.
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };