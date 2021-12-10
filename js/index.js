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

  // Should add a conditional here because that this only works if the number has no decimals ( newPrice % 1 !== 0)
  const newPadedPrice = String(newPrice) + '.00';

  // Testing different methods to append a new <tr> in the table body

  // Adding a new row with innerHTML - Still have to figure out why the removeBtn doesn't work
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
      <button class="btn btn-remove">Remove</button>
      </td>
      </tr>`;

  tableBodyElement.appendChild(newTr);
  const newButtonRemove = document.querySelector('.btn-remove:last-child');
  newButtonRemove.addEventListener('click', removeProduct);

  // this is the template method from MDN, cced, I'd like to come back to it later to make it work but right now it doesn't
  // if ('content' in document.querySelector('template')) {
  //   const templateRow = document.querySelector('#newProductRow');

  //   const tablebodyElement = document.querySelector('tbody');
  //   const clone = document.importNode(template.content, true);
  //   const tableDataElements = clone.querySelectorAll('td');
  //   td[0].textContent = newProduct;
  //   td[1].textContent = newPadedPrice;

  //   tbody.appendChild(clone);
  //   const newButtonRemove = document.querySelector('.btn-remove');
  //   newButtonRemove.addEventListener('click', removeProduct);
  // }
  // else {
  //   // Une autre méthode pour ajouter les lignes
  //   // car l'élément HTML n'est pas pris en charge.
  // }

  // First try, very long method (but it works)
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
