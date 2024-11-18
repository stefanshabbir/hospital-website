document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginButton = document.querySelector('.cta');

    if (loggedInUser && loginButton) {
        loginButton.innerHTML = loggedInUser; // Remove the login/register button if the user is logged in
    }

    if (loggedInUser && window.location.href.includes("/checkout.html")) {
    }
});



// static populateCheckoutCart() {
//     const totalCartQuantity = document.getElementById("totalCartQuantity");
//     totalCartQuantity.textContent = `${this.items.length}`;

//     const productCart = document.querySelector(".cart-display-container");
//     productCart.innerHTML = "";

//     let cartTotal = 0;
//     this.items.forEach(item => {
//         const itemElement = document.createElement("p");

//         const productName = document.createElement("a");
//         productName.textContent = `${item.name} (x${item.quantity})`;

//         const priceSpan = document.createElement("span");
//         priceSpan.className = "price";
//         const itemPrice = item.price * item.quantity
//         priceSpan.textContent = `LKR ${itemPrice}`;
//         cartTotal += itemPrice;

//         itemElement.appendChild(productName);
//         itemElement.appendChild(priceSpan);

//         productCart.appendChild(itemElement);
//     });

//     const hrElement = document.createElement("hr");
//     productCart.appendChild(hrElement);

//     const totalLine = document.createElement("p");
//     totalLine.textContent = "Total ";

//     const totalSpan = document.createElement("span");
//     totalSpan.className = "price";

//     const totalPrice = document.createElement("b");
//     totalPrice.textContent = `LKR ${cartTotal}`;

//     totalSpan.appendChild(totalPrice);
//     totalLine.appendChild((totalSpan));
//     productCart.appendChild(totalLine);
// }