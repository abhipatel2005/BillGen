function generateBill() {
    let checkboxes = document.querySelectorAll('.price-checkbox:checked');

    if (checkboxes.length === 0) {
        alert('Please select at least one option before generating the bill.');
        return;
    }
    
    let rows = document.querySelectorAll('tbody tr');
    let finalTotal = 0;

    rows.forEach((row, index) => {

        if (index < rows.length - 1) {
            let prices = row.querySelectorAll('.price-checkbox:checked');
            let totalPrice = 0;

            prices.forEach(priceCheckbox => {
                totalPrice += parseFloat(priceCheckbox.value);
            });

            row.querySelector('.item-total').textContent = totalPrice.toFixed(2) // " ₹";
            finalTotal += totalPrice;
        }
    });

    document.getElementById('final-total').textContent = finalTotal.toFixed(2) // " ₹";
    
    // Increment and display the bill count
    incrementBillCount();
    document.getElementById('bill-count').textContent = 'Bills Generated: ' + getBillCount();
    document.getElementById('selected-count').textContent = checkboxes.length;
}

function generateNewBill() {
    location.reload();
}

function getBillCount() {
    return localStorage.getItem('billCount') || 0;
}

function incrementBillCount() {
    let count = getBillCount();
    count++;
    localStorage.setItem('billCount', count);
}

// Display the initial bill count
document.getElementById('bill-count').textContent = 'Bills Generated: ' + getBillCount();
