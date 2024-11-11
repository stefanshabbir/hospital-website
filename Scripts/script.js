// function increase() {
//     let number = document.getElementById("quantityInput");
//     number.value = parseInt(number.value) + 1;
// }

// function decrease() {
//     let number = document.getElementById("quantityInput");
//     if (parseInt(number.value) > 0) {
//         number.value = parseInt(number.value) - 1;
//     }
// }

// function validateQuantity(input) {
//     if (isNaN(input.value)) {
//         input.value = 0;
//     } else if (input.value < 0) { 
//         input.value = 0;
//     }
// }

// function updateQuantity(action, input) {
//     let currentValue = parseInt(input.value);

//     if (isNaN(input.value)) {
//         input.value = 0;
//     }

//     if (action === 'increase') {
//         input.value = currentValue < 1 ? 1 : currentValue + 1;
//     }
//     else if (action === 'decrease' && currentValue > 0) {
//         input.value = currentValue - 1;
//     }

//     if (isNaN(currentValue)) {
//         currentValue = 0;
//     }

//     updateQuantityColor();
// }

// function updateQuantityColor(input) {
//     // input.style.color = parseInt(number.value) === 0 ? "white" : "#000";
// }

// document.querySelectorAll(".drug-card").forEach(card => {
//     const input = card.querySelector(".quantityInput");
//     const increaseButton = card.querySelector(".increase-btn");
//     const decreaseButton = card.querySelector(".decrease-btn");

//     increaseButton.addEventListener("click", () => updateQuantity("increase", input));
//     decreaseButton.addEventListener("click", () => updateQuantity("decrease", input));
//     input.addEventListener("input", () => validateQuantity(input));
// })

// function addToCart() {
//     const quantity = parseInt(input.value) {
//         if (quantity > 0) {
//             Cart.addItems({name: this.document.querySelector(".drug-name h3").textContent, quantity});
//         }
//     }
// }

class DrugCard {
    constructor(element) {
        this.element = element;
        this.input = element.querySelector(".quantityInput");
        this.increaseButton = element.querySelector(".increase-btn");
        this.decreaseButton = element.querySelector(".decrease-btn");
        this.addToCartButton = element.querySelector(".add-to-cart");

        this.min = parseInt(this.input.getAttribute("min")) || 1;
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
    
        if (action === 'increase') {
            this.input.value = Math.min(currentValue + 1, this.max)
        }
        else if (action === 'decrease' && currentValue > 0) {
            this.input.value = Math.max(currentValue - 1, this.min);
        }  
    }

    addToCart() {
        const quantity = parseInt(this.input.value);

        if (quantity > 0) {
            const drugName = this.element.querySelector(".drug-name h3").textContent;
            Cart.addItems({name: drugName, quantity});
            console.log(`${quantity} item(s) of ${drugName} added to cart.`);
        }
    }
}

class Cart {
    static items = [];

    static addItems(item) {
        const existingItem = this.items.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity = item.quantity;
        } else {
            this.items.push(item);
        }
        this.updateCartTable();
    }
    static getItems() {
        return this.items;
    }

    static removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.updateCartTable();
    }

    static updateCartTable() {
        const tableBody = document.getElementById("cartTable").querySelector("tbody");
        tableBody.innerHTML = "";

        this.items.forEach(item => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const actionCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.setAttribute("class", "remove-button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => this.removeItem(item.name))
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    }
    static checkout() {
        console.log("checking out");
    }
}

document.querySelectorAll(".drug-card").forEach(card => new DrugCard(card));
