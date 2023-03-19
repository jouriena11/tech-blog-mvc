const editBlogBtn = document.getElementById('edit-blog-btn');
const deleteBlogBtn = document.getElementById('delete-blog-btn');

editBlogBtn.addEventListener('click', editBlog);

deleteBlogBtn.addEventListener('click', deleteBlog);

async function editBlog(event) {
    const blogId = event.target.dataset.blogId;
    try {
        window.location.href = `update/${blogId}`;
    } catch(err) {
        console.log(err);
    }
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