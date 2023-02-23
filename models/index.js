const User = require('./User');
const Post = require('./Post');

// users can have many posts,
User.hasMany(Post, {
    foreignKey: 'creator',
    onDelete: 'CASCADE'
});

// but a post only has one poster.
Post.belongsTo(User, {
    foreignKey: 'creator'
});

module.exports = { User, Post };