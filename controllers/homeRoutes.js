const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

// GET request - get all blogs
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

        // console.log(allBlogs[0])

        const mappedBlogs = allBlogs.map((blog) => ({
            id: blog.id,
            title: blog.title,
            created_date: blog.createdAt,
            updated_date: blog.updatedAt,
            username: blog.user.username
        }))

        // console.log('mappedBlogs => ', mappedBlogs)

        // res.status(200).json(mappedBlogs)

    } catch(err) {
        console.error(err)
        res.status(500).json(err);
    }
})

// login
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
})

// logout
router.get('/logout', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('homepage');
})

// signup
router.get('/signup', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('signup');
})

// profile
router.get('/profile', async (req, res) => {
    if(req.session.logged_in) {
        const profile = await User.findByPk(req.session.user_id);
        
        res.render('/profile',profile);

        return;
    };
    res.redirect('/login');
})

module.exports = router;