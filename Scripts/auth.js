document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginButton = document.querySelector('.cta');

    if (loggedInUser && loginButton) {
        loginButton.innerHTML = loggedInUser; // Remove the login/register button if the user is logged in
    }
});

