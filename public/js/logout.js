const logoutLink = document.getElementById('navbar-logout-menu');

logoutLink.addEventListener('click', logout)

async function logout() {
    try {
        const logoutResponse = await axios.post('/api/user/logout', 
        {}, // second argument = no data sent with the request
        {
            headers: { 'Content-Type': 'application/json'},
        });

        if(logoutResponse.status === 204) {
            document.location.replace('/');

        } else {
            alert('Logout Failed');
            return;
        }
    } catch(err) {
        console.log(err);
    }
}