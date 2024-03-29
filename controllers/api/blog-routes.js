const router = require("express").Router();
const { User, Blog } = require("../../models");
const dayjs = require('dayjs');

// GET request - get blog data by blog id
// api/blog/:id
router.get("/:id", async (req, res) => {
  try {
    const userBlog = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        }
      ],
      required: true, 
      raw: true
    });
    
    if (!userBlog) {
      res.status(404).json({
        message: "No blog found.",
      });
      return;
    }

    userBlog.createdAt = dayjs(userBlog.created_date).format('DD-MM-YYYY HH:mm:ss');
    userBlog.updatedAt = dayjs(userBlog.updated_date).format('DD-MM-YYYY HH:mm:ss');

    console.log('backend userBlog => ', userBlog)

    res.json({ 
      user_blog: userBlog,
      username: userBlog.user.username
    });

    console.log('checkpoint')
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST request - create a new blog
// api/blog/create-new
router.post("/create-new", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    console.log('newBlog =>', newBlog);
    res.status(201).json(newBlog);
    
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT request -- update blog by its ID
// api/blog/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedBlog) {
      res.status(404).json({
        message: "Blog not found",
      });
      return;
    }

    res.status(200).json({
      message: "Your blog has been updated.",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE request -- delete blog by its ID
// api/blog/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const delBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    //console.log(req.params.id);

    if (!delBlog) {
      res.status(404).json({
        message: "Blog not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Your blog has been deleted.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
