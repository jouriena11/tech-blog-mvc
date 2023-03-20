const router = require('express').Router();
const dayjs = require('dayjs');
const { User, Blog, Comment } = require('../models');
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
router.get('/profile', withAuth, async (req, res) => {
    try {
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

router.get('/blog/:blogId', async (req, res) => {
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
        });

        const blogComments = await Comment.findAll({
            where: {
                blog_id: blogId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                }
            ],
            raw: true
        });

        if(Object.keys(userBlog).length > 0) { // to apply dayjs formatting if userBlog object contains any property key
            userBlog.createdAt = dayjs(userBlog.created_date).format('DD-MM-YYYY HH:mm:ss');
            userBlog.updatedAt = dayjs(userBlog.updated_date).format('DD-MM-YYYY HH:mm:ss');
        }

        blogComments.forEach((obj) => {
            obj.createdAt = dayjs(blogComments.createdAt).format('DD-MM-YYYY HH:mm:ss');
            obj.updatedAt = dayjs(blogComments.updatedAt).format('DD-MM-YYYY HH:mm:ss');
        })

        console.log('userBlog => ', userBlog)
        console.log('blogComments => ', blogComments)
        console.log('req.session.user_id => ', req.session.user_id)
        console.log('userBlog.id => ', userBlog.id)

        res.render('blog-render', {
            userBlog: userBlog,
            blogComments: blogComments,
            userId: req.session.user_id,
            loginStatus: req.session.logged_in,
        });

    } catch (err) {
        console.error(err);
    }
});

router.get('/blog/update/:blogId', withAuth, async (req, res) => {
    try {
        const blogId = req.params.blogId;

        const currentBlogData = await Blog.findByPk(blogId, {
            raw: true
        });

        // console.log('currentBlogData => ', currentBlogData)

        res.render('blog-update', {
            blogId: blogId,
            blogData: currentBlogData,
            loginStatus: req.session.logged_in
        });

    } catch(err) {
        console.error(err);
    }
})

module.exports = router;