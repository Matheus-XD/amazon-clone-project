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
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.qtd}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
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
}