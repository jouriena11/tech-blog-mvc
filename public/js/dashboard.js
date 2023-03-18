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
        window.location.href = `/blog/${blogId}`
    } catch(err) {
        console.log(err);
    }
};


// Assigns addEventListener to 'Profile' menu in navbar
profileMenu.addEventListener('click', clickProfile);

function clickProfile() { 
    window.location.href = 'profile';
}
