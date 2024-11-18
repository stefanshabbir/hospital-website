// document.addEventListener("DOMContentLoaded", () => {
//     const registerForm = document.querySelector(".registerForm");
//     const loginForm = document.querySelector(".loginForm");

//     registerForm.addEventListener("submit", (e) => {
//         const name = registerForm.name.value;
//         const birthday = registerForm.birthday.value;
//         const sex = registerForm.sex.value;
//         const email = registerForm.email.value;
//         const phoneNumber = registerForm.phoneNumber.value;
//         const address = registerForm.address.value;
//         const province = registerForm.province.value;
//         const postalCode = registerForm["postal-code"].value;
//         const username = registerForm.uname.value;
//         const password = registerForm.password.value;

//         if (localStorage.getItem(username)) {
//             alert("Username already exists");
//             return;
//         }

//         const userData = {
//             name,
//             birthday,
//             sex,
//             email,
//             phoneNumber,
//             address,
//             province,
//             postalCode,
//             password // Store password with the username
//         };

//         localStorage.setItem(username, JSON.stringify(userData));
//         alert("Registration successful!");

//         // Clear form after successful registration
//         registerForm.reset();
//     });

//     loginForm.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const username = loginForm.uname.value;
//         const password = loginForm.password.value;

//         const storedUserData = localStorage.getItem(username);
//         console.log(storedUserData);

//         if (!storedUserData) {
//             alert("User does not exist");
//             return;
//         }

//         const userData = JSON.parse(storedUserData);

//         if (userData.password === password) {
//             alert("login success");
//             return;
//         } else {
//             alert("incorrect password");
//         }

//         loginForm.reset();
//     }, { once: true})
// })

class AuthManager {
    constructor(registerFormSelector, loginFormSelector) {
        this.registerForm = document.querySelector(registerFormSelector);
        this.loginForm = document.querySelector(loginFormSelector);
        this.loggedInUser = localStorage.getItem('loggedInUser');
        this.init();
    }

    init() {
        this.registerForm.addEventListener("submit", (e) => this.handleRegister(e));
        this.loginForm.addEventListener("submit", (e) => this.handleLogin(e));
    }

    handleRegister(e) {
        e.preventDefault();

        const name = this.registerForm.name.value;
        const birthday = this.registerForm.birthday.value;
        const sex = this.registerForm.sex.value;
        const email = this.registerForm.email.value;
        const phoneNumber = this.registerForm.phoneNumber.value;
        const address = this.registerForm.address.value;
        const province = this.registerForm.province.value;
        const postalCode = this.registerForm["postal-code"].value;
        const username = this.registerForm.uname.value;
        const password = this.registerForm.password.value;

        if (localStorage.getItem(username)) {
            alert("Username already exists");
            return;
        }

        const userData = {
            name,
            birthday,
            sex,
            email,
            phoneNumber,
            address,
            province,
            postalCode,
            password // Store password with the username
        };

        localStorage.setItem(username, JSON.stringify(userData));
        alert("Registration successful!");
        localStorage.setItem('loggedInUser', username);
        this.registerForm.reset();
    }

    handleLogin(e) {
        e.preventDefault();

        const username = this.loginForm.uname.value;
        const password = this.loginForm.password.value;

        const storedUserData = localStorage.getItem(username);
        console.log(storedUserData);

        if (!storedUserData) {
            alert("User does not exist");
            return;
        }

        const userData = JSON.parse(storedUserData);

        if (userData.password === password) {
            alert("login success");
            localStorage.setItem('loggedInUser', username);
            window.location.reload();
        } else {
            alert("incorrect password");
        }

        this.loginForm.reset();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new AuthManager(".registerForm", ".loginForm");
});