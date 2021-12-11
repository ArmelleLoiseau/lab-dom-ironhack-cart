function updateSubtotal(product) {
  // Retrieving the price and the quantity inputs
  const price = product.querySelector('.price span');
  const quantity = product.querySelector('.quantity input').value;

  // product of price and quantity to get the subtotal
  let subTotal = Number(price.innerHTML) * quantity;

  // print the subtotal
  const subTotalElement = product.querySelector('.subtotal span');
  subTotalElement.textContent = subTotal;
  return subTotal;
}

function calculateAll() {
  // apply the subtotal method to each new product
  const products = document.querySelectorAll('.product');
  let total = 0;
  for (product of products) {
    updateSubtotal(product);
    total += updateSubtotal(product);
  }

  // update the total
  const totalElement = document.querySelector('#total-value span');
  totalElement.textContent = total;
}

function removeProduct(event) {
  // get the target of the click
  const target = event.currentTarget;
  // get the all row for the product to be removed, and it's parent element (the whole table)
  const row = target.parentElement.parentElement;
  const tableBody = row.parentElement;

  // remove the row from the table
  tableBody.removeChild(row);
  // recacul the total
  calculateAll();
}

function createProduct() {
  // get the table (to append the new row later) & the new inputs passed
  const tableBodyElement = document.querySelector('tbody');
  const newProduct = document.querySelector('#new-product-name').value;
  const newPrice = document.querySelector('#new-product-price').value;

  // Padding the price input if necessary
  let newPadedPrice = String(newPrice);
  if (newPadedPrice.length === 1) newPadedPrice += '.00';
  else if (newPadedPrice.length === 3) newPadedPrice += '0';

  // Append a new <tr> in the table body with template
  if ('content' in document.createElement('template')) {
    const templateElement = document.querySelector('#newProductRow');
    const tablebodyElement = document.querySelector('tbody');
    const clone = document.importNode(templateElement.content, true);
    const spanElements = clone.querySelectorAll('td span');
    spanElements[0].textContent = newProduct;
    spanElements[1].textContent = newPadedPrice;
    tablebodyElement.appendChild(clone);
    const btnsRemove = document.querySelectorAll('.btn-remove');
    const newBtnRemove = btnsRemove[btnsRemove.length - 1];
    newBtnRemove.addEventListener('click', removeProduct);
  } else {
    // innerHTML method in case template doesn't work in the browser
    const newTr = document.createElement('tr');
    newTr.innerHTML = `<tr class="product">
      <td class="name">
        <span>${newProduct}</span>
      </td>
      <td class="price">$<span>${newPadedPrice}</span></td>
      <td class="quantity">
        <input type="number" value="0" min="0" placeholder="Quantity" />
      </td>
      <td class="subtotal">$<span>0</span></td>
      <td class="action">
      <button class="btn btn-remove last">Remove</button>
      </td>
      </tr>`;

    tableBodyElement.appendChild(newTr);
    const btnsRemove = document.querySelectorAll('.btn-remove');
    const newBtnRemove = btnsRemove[btnsRemove.length - 1];
    newBtnRemove.addEventListener('click', removeProduct);
  }

  // First, very long, try...
  // const newTr = document.createElement('tr');
  // newTr.className = 'product';
  // const newTdName = document.createElement('td');
  // newTdName.className = 'name';
  // const newSpanName = document.createElement('span');
  // newSpanName.textContent = newProduct;
  // newTdName.appendChild(newSpanName);
  // newTr.appendChild(newTdName);
  // const newTdPrice = document.createElement('td');
  // newTdPrice.className = 'price';
  // newTdPrice.textContent = '$';
  // const newSpanPrice = document.createElement('span');
  // newSpanPrice.textContent = newPadedPrice;
  // newTdPrice.appendChild(newSpanPrice);
  // newTr.appendChild(newTdPrice);
  // const newTdQuantity = document.createElement('td');
  // newTdQuantity.className = 'quantity';
  // const newInputQuantity = document.createElement('input');
  // newInputQuantity.setAttribute('type', 'number');
  // newInputQuantity.setAttribute('value', '0');
  // newInputQuantity.setAttribute('min', '0');
  // newInputQuantity.setAttribute('placeholder', 'Quantity');
  // newTdQuantity.appendChild(newInputQuantity);
  // newTr.appendChild(newTdQuantity);
  // const newTdSubtotal = document.createElement('td');
  // newTdSubtotal.className = 'subtotal';
  // newTdSubtotal.textContent = '$';
  // const newSpanSubtotal = document.createElement('span');
  // newSpanSubtotal.textContent = '0';
  // newTdSubtotal.appendChild(newSpanSubtotal);
  // newTr.appendChild(newTdSubtotal);
  // const newTdButton = document.createElement('td');
  // newTdButton.className = 'action';
  // const newButtonRemove = document.createElement('button');
  // newButtonRemove.classList.add('btn', 'btn-remove');
  // newButtonRemove.textContent = 'Remove';
  // newTdButton.appendChild(newButtonRemove);
  // newTr.appendChild(newTdButton);
  // tableBodyElement.appendChild(newTr);
  // newButtonRemove.addEventListener('click', removeProduct)

  // clearing the input fields after creating a new product
  const newProductField = document.querySelector('#new-product-name');
  const newPriceField = document.querySelector('#new-product-price');
  newProductField.value = '';
  newPriceField.value = '';
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  const createBtnLement = document.querySelector('#create');
  createBtnLement.addEventListener('click', createProduct);
  const removeBtnElements = document.querySelectorAll('.btn-remove');
  for (let removeBtn of removeBtnElements) {
    removeBtn.addEventListener('click', removeProduct);
  }
});
