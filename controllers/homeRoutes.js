const router = require('express').Router();
const axios = require('axios');
const dayjs = require('dayjs');
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');
const { limitCharacters } = require('../utils/helpers');

// GET request - get all blogs on homepage regardless of the login status
router.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ],
            required: true
        });

        const mappedBlogs = allBlogs.map((blog) => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            created_date: blog.createdAt,
            updated_date: blog.updatedAt,
            username: blog.user.username
        }));

        mappedBlogs.forEach((blog) => {
            blog.content = limitCharacters(blog.content, 300);
            blog.created_date = dayjs(blog.created_date).format('DD-MM-YYYY HH:mm:ss')
        });

        res.render('homepage', { 
            blogs: mappedBlogs,
            loginStatus: req.session.logged_in
        })

    } catch(err) {
        console.error(err)
        res.status(500).json(err);
    }
});

// redirect to dashboad page when logged in
// redirect to login page if logged out
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login', {user: {logged_in: false}});
});

// redirect to homepage page when logged in
// redirect to signup page when logged out
router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});


router.get('/dashboard', withAuth, async (req, res) => {
    const userData = {
        userId: req.session.user_id,
        logged_in: req.session.logged_in
    }
    // console.log(userData);
    const userBlogs = await Blog.findAll({
        where: {
          user_id: userData.userId,
        },
        include: [
          {
            model: User,
            attributes: ['id', 'username']
          }
        ],
        required: true,
        raw: true
    });

    userBlogs.forEach((blog) => {
        blog.content = limitCharacters(blog.content, 300),
        blog.createdAt = dayjs(blog.createdAt).format('DD/MM/YYYY HH:mm:ss'),
        blog.updatedAt = dayjs(blog.updatedAt).format('DD/MM/YYYY HH:mm:ss')
    })
    
    // console.log('userBlogs => ', userBlogs);
    res.render('dashboard', {
        loginStatus: req.session.logged_in, 
        userData: userData, 
        userBlogs: userBlogs});
});

// redirect to profile page when logged in
// redirect to login page when logged out
// TODO: to display user data in the field
router.get('/profile', withAuth, async (req, res) => {
    try { // TODO: to receive req.session.user_id from dashboard.js
        const profile = await User.findByPk(req.session.user_id, {
            raw: true
        });
        console.log('profile => ', profile);
        res.render('profile', {
            profile: profile,
            loginStatus: req.session.logged_in
        });

    } catch(err) {
        console.error(err);
    }
});

router.get('/create-new-blog', withAuth, async(req, res) => {
    res.render('blog-new', {
        userId: req.session.user_id,
        loginStatus: req.session.logged_in
    })
});

// when logged in as a creator and clicking on a particular blog from the dashboard, redirect to update-or-delete form
// TODO: if no change, then don't save?
// TODO: when press delete, confirm()
router.get('/blog-update-delete', withAuth, async(req, res) => {
    res.render('blog-update-delete')
});

router.get('/blog/:blogId', withAuth, async (req, res) => {
    try {
        const blogId = req.params.blogId;

        const userBlog = await Blog.findByPk(blogId, {
            include: [
              {
                model: User,
                attributes: ['id', 'username']
              }
            ],
            required: true, 
            raw: true
        }); // {}


        if(Object.keys(userBlog).length > 0) {
            userBlog.createdAt = dayjs(userBlog.created_date).format('DD-MM-YYYY HH:mm:ss');
            userBlog.updatedAt = dayjs(userBlog.updated_date).format('DD-MM-YYYY HH:mm:ss');
        }
        res.render('blog-render', {userBlog: userBlog});

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;