import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions, renderDaysToDelivery } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

let today = dayjs()
export function renderOrderSummary(params) {
  let orderSummaryHTML = '';
  cart.items.forEach((cartItem)=>{
    let matchingItem = products.find(product=>product.id===cartItem.id)
  

    orderSummaryHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: ${today.add(renderDaysToDelivery(cartItem.deliveryOptionId), 'days').format('dddd, MMMM D')}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${matchingItem.priceCents}
          </div>
          <div class="product-quantity js-product-quantity"
          data-cart-item-id = "${cartItem.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.qtd}</span>
            </span>
            <span class="update-quantity-link js-update-quantity-link link-primary"
            data-cart-item-id = "${cartItem.id}"
            data-cart-item-qtd = "${cartItem.qtd}">
              Update
            </span>
            <span class="delete-quantity-link js-delete-from-cart link-primary"
            data-cart-item-id = "${cartItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          
          ${renderDeliveryOption(cartItem)}

        </div>
      </div>
    </div>
    `
  })

  function renderDeliveryOption(cartItem) {
    let deliveryOptionsHTML = ''
    deliveryOptions.forEach((option)=>{
      let price = 0;
      if (option.priceCents > 0) {
        price = `$${option.priceCents}`
      } else {
        price = 'FREE'
      }

      let isChecked = ''
      if (cartItem.deliveryOptionId === option.id) {
        isChecked = 'checked'
      }

      deliveryOptionsHTML += `
      <div class="delivery-option js-delivery-option"   
      data-cart-item-id = "${cartItem.id}"
      data-delivery-option-id = "${option.id}">
        <input type="radio" ${isChecked}
          class="delivery-option-input"
          name="${cartItem.id}">
        <div>
          <div class="delivery-option-date">
            ${today.add(option.daysToDelivery, 'days').format('dddd, MMMM D')}
          </div>
          <div class="delivery-option-price">
            ${price} - Shipping
          </div>
        </div>
      </div>
      `
    })
    return deliveryOptionsHTML
  }

  function renderUpdateSection(cartItemId, cartItemQtd){
    const updateSectionHTML = `
    <span>
      Quantity: 
      <select class="js-quantity-container">
        <option value="${cartItemQtd}">${cartItemQtd}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </span>
    <span class="update-quantity-link js-save-link link-primary">
      Save
    </span>
    <span class="delete-quantity-link js-cancel-link link-primary"
>
      Cancel
    </span>
    `
    document.querySelector(`.js-product-quantity[data-cart-item-id="${cartItemId}"]`).innerHTML = updateSectionHTML

    document.querySelector('.js-save-link')
    .addEventListener('click', ()=>{
      const newQtd = Number(document.querySelector('.js-quantity-container').value)
      cart.updateCartQuantity(cartItemId, newQtd)
      renderOrderSummary()
      
    })

    document.querySelector('.js-cancel-link').addEventListener('click', ()=>{
      renderOrderSummary()
    })
  }


  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML

  document.querySelectorAll('.js-delivery-option')
  .forEach((deliveryOptionElement)=>{
    deliveryOptionElement.addEventListener('click', ()=>{
      const cartItemId = deliveryOptionElement.dataset.cartItemId
      const deliveryOptionId = Number(deliveryOptionElement.dataset.deliveryOptionId)     
      cart.updateDeliveryOption1(cartItemId, deliveryOptionId)
      renderOrderSummary()
    })
  })

  document.querySelectorAll('.js-update-quantity-link')
  .forEach((updateLinkElement)=>{
    const cartItemId = updateLinkElement.dataset.cartItemId
    const cartItemQtd = Number(updateLinkElement.dataset.cartItemQtd)
    updateLinkElement.addEventListener('click', ()=>{
      renderOrderSummary()
      renderUpdateSection(cartItemId, cartItemQtd)     
    })
  })

  document.querySelectorAll('.js-delete-from-cart')
  .forEach((deleteLinkElement)=>{
    const cartItemId = deleteLinkElement.dataset.cartItemId
    deleteLinkElement.addEventListener('click', ()=>{
    
    cart.deleteItem(cartItemId)
    renderOrderSummary()
    })
  })
}
  