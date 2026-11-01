class Cart {
 
  items;
  localStorageKey;

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey
    this.items = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
  }
  addToCart(id, qtd){
   const matchingItem = this.items.find((item)=>{
    return item.id === id
    
   })
   if (matchingItem) {
    matchingItem.qtd += qtd
   } else {
    this.items.push(
      {
        id: id,
        qtd: qtd,
        deliveryOptionId: 1
      }
    )  
   }
   this.saveToLocalStorage()
  }

  renderCartQuantity(){
    let totalQuantity = 0
    this.items.forEach((item)=>{
      totalQuantity += item.qtd;
    })
    return totalQuantity;
  }

  updateDeliveryOption1(cartItemId, newDeliveryOptionId){
    let matchingItem = this.items.find(matchingItem=>matchingItem.id === cartItemId)
    if (matchingItem) {
      matchingItem.deliveryOptionId = newDeliveryOptionId   
    } else {
      console.warn(`the item with id ${cartItemId} was not found in the cart`);
    }
    this.saveToLocalStorage()
  }

  updateCartQuantity(cartItemId, newQtd){
    const matchingItem = this.items.find(cartItem=>cartItem.id === cartItemId)
    matchingItem.qtd = newQtd
    this.saveToLocalStorage()
  }

  deleteItem(cartItemId){
    let newItemsList = this.items.filter((item)=>{
      return item.id !== cartItemId
    })
    this.items = newItemsList
    this.saveToLocalStorage()
  }


  saveToLocalStorage(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.items))
  }

  
}




export let cart = new Cart('cart')