import { cart } from "../../data/cart.js"
import { products } from "../../data/products.js"
import { deliveryOptions } from "../../data/deliveryOptions.js"
import { centsToDolar } from "../../utis/money.js"

export function renderPaymentSummary() {
  let paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cart.renderCartQuantity()}):</div>
    <div class="payment-summary-money">$${centsToDolar(cartItemsPrice())}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${centsToDolar(shippingHandlingPrice())}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${centsToDolar(totalBeforeTaxPrice())}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${centsToDolar(estimatedTaxPrice())}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${centsToDolar(totalPrice())}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}

function cartItemsPrice() {
  let totalPrice = 0
  cart.items.forEach((cartItem)=>{
   const matchingItem = products.find(product=>product.id === cartItem.id)
   totalPrice += (matchingItem.priceCents * cartItem.qtd)
  })
  return totalPrice
}

function shippingHandlingPrice() {
  let totalPrice = 0
  cart.items.forEach((cartItem)=>{
    const matchingItem = deliveryOptions.find(option=>option.id === cartItem.deliveryOptionId)
    totalPrice += matchingItem.priceCents
  })
  return totalPrice
}

function totalBeforeTaxPrice() {
  return cartItemsPrice() + shippingHandlingPrice()
}

function estimatedTaxPrice() {
  return (totalBeforeTaxPrice() * 10)/100
}

function totalPrice() {
  return totalBeforeTaxPrice() + estimatedTaxPrice()
}