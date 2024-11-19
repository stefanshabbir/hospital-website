class DrugCard {
    constructor(element) {
        this.element = element;
        this.input = element.querySelector(".quantityInput");
        this.increaseButton = element.querySelector(".increase-btn");
        this.decreaseButton = element.querySelector(".decrease-btn");
        this.addToCartButton = element.querySelector(".add-to-cart");

        this.min = parseInt(this.input.getAttribute("min")) || 0;
        this.max = parseInt(this.input.getAttribute("max")) || 100;

        this.initialize();
    }

    initialize() {
        this.increaseButton.addEventListener("click", () => this.updateQuantity("increase"));
        this.decreaseButton.addEventListener("click", () => this.updateQuantity("decrease"));
        this.addToCartButton.addEventListener("click", () => this.addToCart());
    }

    updateQuantity(action) {
        let currentValue = parseInt(this.input.value);
    
        if (currentValue > 100) {
            const quantityWarning = document.querySelector(".quantity-warning");
            quantityWarning.style.display = "block";
        }

        if (action === 'increase' && currentValue < 100) {
            this.input.value = Math.min(currentValue + 1, this.max)
        }
        else if (action === 'decrease' && currentValue > 0) {
            this.input.value = Math.max(currentValue - 1, this.min);
        }  
    }

    addToCart() {
        const quantity = parseFloat(this.input.value);
        const quantityWarning = this.element.querySelector(".quantity-warning");
        const decimalCheck = quantity % 1;

        if (quantity > 0 && quantity < 100 && decimalCheck === 0) {
            const drugName = this.element.querySelector(".drug-name h3").textContent;
            const drugPrice = parseFloat(this.element.querySelector("#drugPrice").textContent);
            Cart.addItems({name: drugName, quantity, price: drugPrice});
            console.log(`${quantity} item(s) of ${drugName} added to cart for ${drugPrice}`);
        } else {
            quantityWarning.style.display = "block";
            this.input.value = 0;
        }
    }
}

class Cart {
    static items = [];
    static popup = null;
    static popupInView = false;

    static addItems(item) {
        const existingItem = this.items.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity = item.quantity;
        } else {
            this.items.push(item);
        }
        this.saveToSessionStorage();
        this.updateCartTable();
        this.updatePopup();
    }

    static removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.updateCartTable();
        this.updatePopup();
    }

    static updatePopup() {
        if (!this.popup) return;
        if (this.items.length > 0 && this.popupInView) {
            this.popup.classList.add("visible");
            console.log("success");
        } else {
            this.popup.classList.remove("visible");
            console.log("test");
        }
    }

    static saveToSessionStorage() {
        sessionStorage.setItem("cartItems", JSON.stringify(this.items));
    }

    static loadFromSessionStorage() {
        const savedItems = sessionStorage.getItem("cartItems");
        if (savedItems) {
            this.items = JSON.parse(savedItems);
        }
    }

    static populateCheckoutCart() {
        const totalCartQuantity = document.getElementById("totalCartQuantity");
        totalCartQuantity.textContent = `${this.items.length}`;
    
        const productCart = document.querySelector(".cart-display-container");
        productCart.innerHTML = "";
    
        let cartTotal = 0;
        this.items.forEach(item => {
            const itemElement = document.createElement("p");
    
            const productName = document.createElement("a");
            productName.textContent = `${item.name} (x${item.quantity})`;
    
            const priceSpan = document.createElement("span");
            priceSpan.className = "price";
            const itemPrice = item.price * item.quantity
            priceSpan.textContent = `LKR ${itemPrice}`;
            cartTotal += itemPrice;
    
            itemElement.appendChild(productName);
            itemElement.appendChild(priceSpan);
    
            productCart.appendChild(itemElement);
        });
    
        const hrElement = document.createElement("hr");
        productCart.appendChild(hrElement);
    
        const totalLine = document.createElement("p");
        totalLine.textContent = "Total ";
    
        const totalSpan = document.createElement("span");
        totalSpan.className = "price";
    
        const totalPrice = document.createElement("b");
        totalPrice.textContent = `LKR ${cartTotal}`;
    
        totalSpan.appendChild(totalPrice);
        totalLine.appendChild((totalSpan));
        productCart.appendChild(totalLine);
    }

    static populateCheckoutTable() {
        const tableBody = document.querySelector("#checkoutTable tbody");
        let cartTotal = 0;

        this.items.forEach(item => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const priceCell = document.createElement("td");
            const itemPrice = item.price * item.quantity;
            priceCell.textContent = "LKR " + itemPrice.toFixed(2);
            cartTotal += itemPrice;
            row.appendChild(priceCell);

            tableBody.appendChild(row);


        });

        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `<td colspan="2" style="font-weight:bold;">Total</td><td>LKR ${cartTotal.toFixed(2)}</td>`;
        tableBody.appendChild(totalRow);
    }    

    static checkout() {
        console.log("checking out");
        this.saveToSessionStorage();
        window.location.href = "./checkout.html";
    }

    static updateCartTable() {
        const tableBody = document.getElementById("cartTable").querySelector("tbody");
        const cartTable = document.querySelector(".cart-display");
        tableBody.innerHTML = "";
    
        if (this.items.length === 0) {
            cartTable.style.display = "none";
        } else {
            cartTable.style.display = 'block';
        }
    
        let cartTotal = 0;
    
        this.items.forEach(item => {
            const row = document.createElement("tr");
    
            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            row.appendChild(nameCell);
    
            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);
    
            const priceCell = document.createElement("td");
            const itemPrice = item.price * item.quantity;
            priceCell.textContent = "LKR " + itemPrice;
            cartTotal += itemPrice;
            row.appendChild(priceCell);
    
            const actionCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.setAttribute("class", "remove-button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => this.removeItem(item.name))
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);
    
            tableBody.appendChild(row);
        });
    
        const totalCartRow = document.createElement("tr");
        totalCartRow.setAttribute("class", "cart-total-row");
        
        const totalLabelCell = document.createElement("td");
        totalLabelCell.textContent = "Total";
        totalLabelCell.style.fontWeight = "bolder";
        
        const totalValueCell = document.createElement("td");
        totalValueCell.textContent = "LKR " + cartTotal;
        
        const emptyCell1 = document.createElement("td");
    
        const actionCell = document.createElement("td");
        const checkoutButton = document.createElement("button");
        checkoutButton.setAttribute("class", "checkout-button");
        checkoutButton.textContent = "Proceed To Checkout";
        checkoutButton.addEventListener("click", () => Cart.checkout());
        actionCell.appendChild(checkoutButton);
    
        totalCartRow.appendChild(totalLabelCell);
        totalCartRow.appendChild(emptyCell1);
        totalCartRow.appendChild(totalValueCell);
        totalCartRow.appendChild(actionCell);
    
        tableBody.appendChild(totalCartRow);
    }

    static favoriteCart() {
        const savedItems = sessionStorage.getItem("cartItems");
        if (savedItems) {
            localStorage.setItem("cartItems", JSON.stringify(savedItems));
        }
        alert("Success!");
        }
    }


document.querySelectorAll(".drug-card").forEach(card => new DrugCard(card))

if (window.location.href.includes("/checkout.html")) {
    console.log("hello");
    Cart.loadFromSessionStorage();
    Cart.populateCheckoutCart();
}

const favoriteCartButton = document.getElementById("favoriteCart")
if (favoriteCartButton) {
    favoriteCartButton.addEventListener("click", Cart.favoriteCart);
}

document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.getElementById("cartTable");
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = "Your cart is at the bottom. Click here to view.";

    
    popup.addEventListener("click", () => {
        cartTable.scrollIntoView({ behavior: "smooth", block: "start" });
        popup.classList.remove("visible");
    });
    
    document.body.appendChild(popup);

    Cart.popup = popup;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                Cart.popupInView = true;
                Cart.updatePopup();
            } else {
                Cart.popupInView = false;
                Cart.updatePopup();
            }
        });
    });

    observer.observe(cartTable);
    Cart.updatePopup();
});


const applyFavorites = document.getElementById("applyFavouritesBtn");