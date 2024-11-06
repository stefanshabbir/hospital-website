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

function updateQuantity(action, input) {
    let currentValue = parseInt(input.value);

    if (action === 'increase') {
        input.value = currentValue + 1;
    }
    else if (action === 'decrease' && currentValue > 0) {
        input.value = currentValue - 1;
    }

    updateQuantityColor();
}

function updateQuantityColor(input) {
    // input.style.color = parseInt(number.value) === 0 ? "white" : "#000";
}

document.querySelectorAll(".drug-card").forEach(card => {
    const input = card.querySelector(".quantityInput");
    const increaseButton = card.querySelector(".increase-btn");
    const decreaseButton = card.querySelector(".decrease-btn");

    increaseButton.addEventListener("click", () => updateQuantity("increase", input));
    decreaseButton.addEventListener("click", () => updateQuantity("decrease", input));
})