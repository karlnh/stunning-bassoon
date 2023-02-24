const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {model: User, attributes: ["username"]}
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        // console.log("Hi there:", posts);
        res.render('homepage', { posts });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: req.session.user_id
        });
        // const commentData = await Comment.findAll({
        //     where: 
        // })
        // const userData = await User.findByPk({});
        // })
        const posts = postData.map((post) => post.get({ plain: true}));
        res.render('dashboard', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;