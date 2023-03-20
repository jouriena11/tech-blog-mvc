const blogTitleField = document.getElementById('blog-title-field');
const blogContentField = document.getElementById('blog-content-field');

const blogNewForm = document.getElementById('blog-new-form');

blogNewForm.addEventListener('submit', createNewBlog);

async function createNewBlog(event) {
    event.preventDefault();
    try {
        const blogTitle = blogTitleField.value.trim();
        const blogContent = blogContentField.value;
        const userId = sessionUserId;

        const newBlogData = {
            title: blogTitle,
            content: blogContent,
            user_id: userId
        };

        // console.log('newBlogdata => ', newBlogData);

        const response = await axios.post('/api/blog/create-new', newBlogData);
        
        if(response.status === 201) {
            window.location.href = 'dashboard';
        }

    } catch(err) {
        alert('Failed to create a new blog.')
        console.log('error => ', err);
    }
}
