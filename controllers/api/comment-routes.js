const router = require("express").Router();
const { Comment, Blog } = require("../../models");

// GET Request - get all comments by blog_id
// api/comment/:id
router.get("/:id", async (req, res) => {
  try {
    const blogComments = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
      ],
    });

    if (!blogComments) {
      res.status(404).json({
        message: "No comments found",
      });
      return;
    }

    res.status(200).json(blogComments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST Request - create a new comment
// api/comment/create-new
router.post("/create-new", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json({
      message: "Your comment has been posted.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT Request - update a comment by comment_id
// api/comment/update/:id
router.put('/update/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id
      },
    });

    if (!updatedComment) {
      res.status(404).json({
        message: 'Comment not found',
      });
      return;
    };

    res.status(200).json({
      message: 'Your comment has been updated.',
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE Request - delete a comment by comment_id
// api/comment/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const delComment = await Comment.destroy({
        where: {
            id: req.params.id
        }
    })

    if(!delComment) {
        res.status(404).json({
            message: 'Comment not found'
        });
        return;
    };

    res.status(200).json({
        message: 'Your message has been deleted.'
    })

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
