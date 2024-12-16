document.addEventListener("DOMContentLoaded", () => {
    const paymentMethodDropdown = document.getElementById("paymentMethod");
    const cardPaymentSection = document.getElementById("cardPaymentSection");
    const cashPaymentSection = document.getElementById("cashPaymentSection");
  
    paymentMethodDropdown.addEventListener("change", () => {
        const selectedValue = paymentMethodDropdown.value;
        cardPaymentSection.style.display = selectedValue === "card" ? "block" : "none";
        cashPaymentSection.style.display = selectedValue === "cash" ? "block" : "none";
    });

    // Form Validation 
    document.querySelector("form").addEventListener("submit", function (event) {
        const paymentMethod = document.getElementById("paymentMethod").value;
        let isValid = true;

        const showError = (input, message) => {
            alert(message);
            isValid = false;
        };

        const validateField = (id, regex = null, errorMessage = "This field is required") => {
            const input = document.getElementById(id);
            if (!input.value.trim() || (regex && !regex.test(input.value.trim()))) {
                showError(input,errorMessage);    
            }
        };

        validateField("fname", /^[A-Za-z\s]+$/, "Full Name should only contain letters and spaces.");
        validateField("email", /^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Please enter a valid email address.");
        validateField("adr", null);
        validateField("city", null);

    // Ensure a payment method is selected
        if (paymentMethod === "card") {
            validateField("cname", /^[A-Za-z\s]+$/, "Name on Card should only contain letters and spaces.");
            validateField("ccnum", /^\d{16}$/, "Card number must be 16 digits.");
            validateField("expmonth", null, "Expiration month is required.");

            const expyear = document.getElementById("expyear").value;
            if (expyear && expyear <= 2024) {
                showError(document.getElementById("expyear"), "Expiration year must be greater than 2024.")
            }

            validateField("expyear", /^\d{4}$/, "Expiration year must be 4 digits.");
            validateField("cvv", /^\d{3}$/, "CVV must be 3 digits.");
        } else if (!paymentMethod) {
            showError(paymentMethodDropdown, "Please select a payment method.");
        }

        if (!isValid) {
            event.preventDefault(); //prevents submitting form if there are errors
        } else {
            alert("Your Order has been confirmed. You will receive your order within 5 Business Days!");
            window.location.href = "/pharmacy.html"
        }

})})
