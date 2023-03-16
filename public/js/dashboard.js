const userBlogEl = document.querySelectorAll('.user-blog');

userBlogEl.forEach((el) => {
    el.addEventListener('click', openBlog)
});

async function openBlog(event) {
    const blogId = event.target.dataset.blogId
    console.log('blogId => ', blogId);
    try {
        window.location.href = `/blog/${blogId}`
    } catch(err) {
        console.log(err);
    }
};