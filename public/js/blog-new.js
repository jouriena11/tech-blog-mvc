const blogTitleField = document.getElementById('blog-title-field');
const blogContentField = document.getElementById('blog-content-field');
const publishBlogBtn = document.getElementById('publish-blog-btn');

publishBlogBtn.addEventListener('click', createNewBlog);

async function createNewBlog() {
    try {
    const blogTitle = blogTitleField.value.trim();
    const blogContent = blogContentField.value;
    const userId = sessionUserId;

    const newBlogData = {
        title: blogTitle,
        content: blogContent,
        user_id: userId
    };

    console.log('newBlogdata => ', newBlogData);

    const response = await axios.post('/api/blog/create-new', newBlogData)
    
    } catch(err) {
        console.log('error => ', err);
    }
}
