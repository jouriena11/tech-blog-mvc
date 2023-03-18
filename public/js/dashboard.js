const userBlogEl = document.querySelectorAll('.user-blog');
const profileMenu = document.getElementById('navbar-profile-menu');

// Assigns addEventListener to each 'read more...' text link in each blog card
userBlogEl.forEach((el) => {
    el.addEventListener('click', openBlog)
});

async function openBlog(event) {
    const blogId = event.target.dataset.blogId
    console.log('blogId => ', blogId);
    try {
        window.location.href = `/blog/${blogId}` // http://localhost:3001/blog/1
    } catch(err) {
        console.log(err);
    }
};


// Assigns addEventListener to 'Profile' menu in navbar
profileMenu.addEventListener('click', clickProfile);

function clickProfile() { 
    // TODO: how to pass req.session.user_id as parameter?    
    window.location.href = 'profile'; // http://localhost:3001/profile
}
