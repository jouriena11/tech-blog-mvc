const usernameEl = document.getElementById('login-username-input-field');
const passwordEl = document.getElementById('login-password-input-field');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', login);

async function login(event) {
    event.preventDefault();
    const username = usernameEl.value.trim();
    const password = passwordEl.value;

    if(!username || !password) {
        // TODO: to change alert to modal
        alert('Please enter your username and password.')
    } else {
        usernameEl.value = '';
        passwordEl.value = '';

        try {
            const response = await axios.post('api/user/login', {
                username: username,
                password: password
            }, {
                headers: { 'Content-Type': 'application/json'},
            });

            if(response.status === 200) {
                console.log('login sucessful');
                console.log('response.data =>', response.data)
                const dataString = JSON.stringify(response.data.user)
                console.log('JSON String => ', dataString)
                window.location.href = "/dashboard";
            }
        } catch(err) {
            console.log(err);
        }
    }
};