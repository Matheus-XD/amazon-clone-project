class Cart {

  cartItems = []
  
  addToCart(id, qtd){
   const matchingItem = this.cartItems.find((item)=>{
    item.id === id
   })
   if (matchingItem) {
    matchingItem.qtd += qtd
   } else {
    this.cartItems.push(
      {
        id: id,
        qtd: qtd,
        deliveryOption: 1
      }
    )  
   }
  }
}

export let cart = new Cart()