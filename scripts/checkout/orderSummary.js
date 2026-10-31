import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderOrderSummary(params) {
  let orderSummaryHTML = '';
  cart.items.forEach((cartItem)=>{
    let matchingItem = products.find(product=>product.id===cartItem.id)
  

    orderSummaryHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
          
          ${renderDeliveryOption()}

        </div>
      </div>
    </div>
    `
  })

  function renderDeliveryOption() {
    let deliveryOptionsHTML = ''
    deliveryOptions.forEach((option)=>{
      deliveryOptionsHTML += `
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-1">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      `
    })
    return deliveryOptionsHTML
  }
  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML
}