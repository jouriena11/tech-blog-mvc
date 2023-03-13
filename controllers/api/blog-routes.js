const router = require("express").Router();
const { Blog } = require("../../models");
const { update } = require("../../models/User");

// GET request - get all blogs that belong to a user_id
// api/blog/
router.get("/:id", async (req, res) => {
  try {
    const userBlogs = await Blog.findAll({
      where: {
        user_id: req.params.id,
      },
    });

    if (!userBlogs) {
      res.status(404).json({
        message: "No blog found.",
      });
      return;
    }
    res.status(200).json(userBlogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST request - create a new blog
// api/blog/create-new
router.post("/create-new", async (req, res) => {
  try {
    // console.log('newBlog =>', newBlog);
    const newBlog = await Blog.create(req.body);
    res.status(200).json(newBlog);
    // res.status(200).json({
    //     message: 'Your new blog has been created.'
    // });

    // TODO: to display a modal?
    
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT request -- update blog by its ID
// api/blog/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    console.log(req.body)
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
