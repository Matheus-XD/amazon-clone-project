import {products } from "../data/products.js"
import { cart } from "../data/cart.js";

let productsListHTML = '';
products.forEach((product)=>{
  productsListHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${(product.rating.stars) * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${product.priceCents}
    </div>

    <div class="product-quantity-container">
      <select class= "js-quantity-container"
      data-product-id = "${product.id}">
        <option selected value="1">1</option>
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
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button js-add-to-cart-button button-primary"
    data-product-id = "${product.id}">
      Add to Cart
    </button>
  </div>
  `
})

document.querySelector('.js-products-grid')
.innerHTML = productsListHTML

document.querySelectorAll('.js-add-to-cart-button')
.forEach((addToCartButtonElement)=>{
  addToCartButtonElement.addEventListener('click', ()=>{
    const productId = addToCartButtonElement.dataset.productId
    let qtd = 0;
    document.querySelectorAll('.js-quantity-container')
    .forEach((quantityContainerElement)=>{
      if (quantityContainerElement.dataset.productId === productId) {
        qtd = quantityContainerElement.value
      }
    })

    cart.addToCart(productId, qtd)
    console.log(cart);
    
    
    
  })
})


