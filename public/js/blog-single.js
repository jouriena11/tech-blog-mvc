const editBlogBtn = document.getElementById('edit-blog-btn');
const deleteBlogBtn = document.getElementById('delete-blog-btn');
const blogCommentEl = document.getElementById('blog-comment-field');
const publishCommentBtn = document.getElementById('publish-comment-btn')

editBlogBtn.addEventListener('click', editBlog);

deleteBlogBtn.addEventListener('click', deleteBlog);

publishCommentBtn.addEventListener('click', publishComment);

async function publishComment(event) {

    event.preventDefault();

    const blogId = event.target.dataset.blogId;
    const userId = event.target.dataset.userId

    console.log('userId => ', userId)
    
    try {
    const blogComment = {
        comment_content: blogCommentEl.value,
        user_id: userId,
        blog_id: blogId
    };

    console.log('blogComment => ', blogComment)

    const saveComment = await axios.post('/api/comment/create-new', blogComment);

    if(saveComment.status = 201) {
        alert('Your comment has been published');
        location.reload();
    }

    } catch(err) {
        console.log(err);
    }
}

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
            const response = await axios.delete(`/api/blog/delete/${blogId}`);

            if(response.status === 200) {
                alert('Your blog has been deleted.');
                window.location.href = '/dashboard';
            }
            
        } catch(err) {
            alert('Error deleting a blog.')
            console.log(err);
        }
    }
};