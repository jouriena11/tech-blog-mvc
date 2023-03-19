const editBlogBtn = document.getElementById('edit-blog-btn');
const deleteBlogBtn = document.getElementById('delete-blog-btn');

editBlogBtn.addEventListener('click', editBlog);

deleteBlogBtn.addEventListener('click', deleteBlog);

async function editBlog() {
    const editedBlog = await Blog.findByPk(req.params.id);

};

async function deleteBlog(event) {
    const blogId = event.target.dataset.blogId;
    if(confirm('Are you sure you want to delete this blog?')) {
        try{
            window.location.href = `delete/${blogId}`;
        } catch(err) {
            console.log(err);
        }
    }
};