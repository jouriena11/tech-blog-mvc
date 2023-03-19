const readMore = document.querySelectorAll('.read-more');

readMore.forEach((elem) => {
    elem.addEventListener('click', readMoreHandler)
})

function readMoreHandler(event) {
    const blogId = event.target.dataset.blogId;
    console.log(blogId);

    try {
        window.location.href = `/blog/${blogId}`; // TODO: to continue working on API route

    } catch(err) {
        console.log(err);
    }
}