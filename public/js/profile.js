const usernameField = document.getElementById('username-input-field');
const firstNameField = document.getElementById('first-name-input-field');
const lastNameField = document.getElementById('last-name-input-field');
const emailField = document.getElementById('email-input-field');
const updateProfileBtn = document.getElementById('profile-update-submit-btn');
const deleteProfileBtn = document.getElementById('profile-delete-submit-btn');

updateProfileBtn.addEventListener('click', updateProfile)

async function updateProfile() {
    const id = userId;
    const username = usernameField.value.trim();
    const firstName = firstNameField.value.trim();
    const lastName = lastNameField.value.trim();
    const email = emailField.value.trim();

    const newUserProfile = {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email
    };

    try {
        const response = await axios.put(`/api/user/update/${id}`, newUserProfile);

        if(response.status === 200) {
            alert('Your profile has been updated.');
        }

    } catch(err) {
        console.log(err);
        alert('Cannot update your user profile.')
    }
}



