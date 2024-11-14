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
            const itemPrice = this.calculateTotalPrice();
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
        
        const totalValueCell = document.createElement("td");
        totalValueCell.textContent = "LKR " + cartTotal;
        
        const emptyCell1 = document.createElement("td");
        const emptyCell2 = document.createElement("td");

        totalCartRow.appendChild(totalLabelCell);
        totalCartRow.appendChild(emptyCell1);
        totalCartRow.appendChild(emptyCell2);
        totalCartRow.appendChild(totalValueCell);

        tableBody.appendChild(totalCartRow);
    }

    static calculateTotalPrice() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    static calculateCartPrice() {}

    static displayCartPrice() {}

    static checkout() {
        console.log("checking out");
    }
}

document.querySelectorAll(".drug-card").forEach(card => new DrugCard(card));
