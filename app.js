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


//extra

// Load items from localStorage on page load
// document.addEventListener('DOMContentLoaded', function () {
//     loadItems();
// });

// // Function to load items from localStorage
// function loadItems() {
//     var storedItems = JSON.parse(localStorage.getItem('billgen_items')) || [];

//     storedItems.forEach(function (item) {
//         addItemToTable(item.name, item.quantity, item.price);
//     });
// }

// // Function to save items to localStorage
// function saveItems(items) {
//     localStorage.setItem('billgen_items', JSON.stringify(items));
// }

// // Function to add a new item dynamically
// function addItem() {
//     var itemName = document.getElementById('item-name').value;
//     var itemQuantity = document.getElementById('item-quantity').value;
//     var itemPrice = document.getElementById('item-price').value;

//     if (itemName && itemQuantity && itemPrice) {
//         // Save the new item to localStorage
//         var storedItems = JSON.parse(localStorage.getItem('billgen_items')) || [];
//         storedItems.push({ name: itemName, quantity: itemQuantity, price: itemPrice });
//         saveItems(storedItems);

//         // Add the new item to the table
//         addItemToTable(itemName, itemQuantity, itemPrice);
//     }
// }

// Function to add a new item to the table
// function addItemToTable(itemName, itemQuantity, itemPrice) {
//     var newRow = document.createElement('tr');

//     // Create cells for the new item
//     newRow.innerHTML = `
//         <td>${itemName}</td>
//         <td>
//             <input type="checkbox" class="btn-check price-checkbox" value="${itemPrice * 2}" autocomplete="off">
//             <label class="btn btn-outline-primary">${itemQuantity} Kg</label>
//         </td>
//         <td>
//             <input type="checkbox" class="btn-check price-checkbox" value="${itemPrice}" autocomplete="off">
//             <label class="btn btn-outline-primary">${itemQuantity / 2} Kg</label>
//         </td>
//         <td>
//             <input type="checkbox" class="btn-check price-checkbox" value="${itemPrice / 2}" autocomplete="off">
//             <label class="btn btn-outline-primary">${itemQuantity / 4} Kg</label>
//         </td>
//         <td class="item-total">0 &#8377;</td>
//         <td>
//             <button onclick="editItem(this)">Edit</button>
//             <button onclick="deleteItem(this)">Delete</button>
//         </td>
//     `;

//     // Insert the new row before the last row (total row)
//     var tableBody = document.querySelector('tbody');
//     tableBody.insertBefore(newRow, tableBody.lastElementChild);

//     // Update the total amount
//     updateTotalAmount();
// }

// // Function to edit an existing item
// function editItem(button) {
//     var row = button.parentNode.parentNode;
//     var itemName = row.cells[0].innerText;
//     var itemQuantity = row.cells[1].querySelector('label').innerText.split(' ')[0];
//     var itemPrice = row.cells[3].querySelector('.btn-check').value;

//     // Set the values in the input fields
//     document.getElementById('item-name').value = itemName;
//     document.getElementById('item-quantity').value = itemQuantity;
//     document.getElementById('item-price').value = itemPrice;

//     // Delete the existing item from localStorage
//     deleteItemFromStorage(itemName);

//     // Delete the existing item from the table
//     deleteItem(button);
// }

// // Function to delete an item
// function deleteItem(button) {
//     var row = button.parentNode.parentNode;
//     var itemName = row.cells[0].innerText;

//     // Delete the item from localStorage
//     deleteItemFromStorage(itemName);

//     // Remove the row from the table
//     row.remove();

//     // Update the total amount
//     updateTotalAmount();
// }

// // Function to delete an item from localStorage
// function deleteItemFromStorage(itemName) {
//     var storedItems = JSON.parse(localStorage.getItem('billgen_items')) || [];
//     var updatedItems = storedItems.filter(function (item) {
//         return item.name !== itemName;
//     });
//     saveItems(updatedItems);
// }

// document.querySelector('table').addEventListener('change', function (event) {
//     var target = event.target;

//     // Check if the changed element is a checkbox with the specified class
//     if (target.matches('.price-checkbox')) {
//         updateTotalAmount(); // Update the total amount when a checkbox changes
//     }
// });