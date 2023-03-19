const updateBlogBtn = document.getElementById('update-blog-btn');

updateBlogBtn.addEventListener('click', editBlog);

async function editBlog(event) {
    try {
        const blogTitle = document.getElementById('blog-title-field').value;
        const blogContent = document.getElementById('blog-content-field').value;
        const blogId = event.target.dataset.blogId;
    
        const updateBlogData = {
            title: blogTitle,
            content: blogContent
        }

        console.log('updateBlogData', updateBlogData)

        const updateBlog = await axios.put(`/api/blog/update/${blogId}`, updateBlogData);

        if(updateBlog.status === 200) {
            alert('Your blog has been updated.');
            location.assign('/dashboard');
        }
        
    } catch(err) {
        console.log(err);
    }

};