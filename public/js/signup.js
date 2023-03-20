const usernameEl = document.getElementById('signup-username-input-field');
const passwordEl = document.getElementById('signup-password-input-field');
const signupSubmitBtn = document.getElementById('signup-submit-btn');

async function signup(event) {
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
            const response = await axios.post('/api/user/signup', {
                username: username,
                password: password
            }, {
                headers: { 'Content-Type': 'application/json'},
            });

            if(response.status === 201) {
                alert('Your account has been created');
                window.location.href = '/dashboard';
            };

        } catch(err) {
            alert('Invalid username or password. Either your username has been used or your password is less than 8 characters. Please try again.')
            console.log(err);
        }
    }
}


// TODO: change addEventLister('click') to ('submit') + move element id to Form
// reference: blog-new.js
signupSubmitBtn.addEventListener('click', signup);