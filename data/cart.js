class Cart {
 
  cartItems;
  localStorageKey;

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
  }
  addToCart(id, qtd){
   const matchingItem = this.cartItems.find((item)=>{
    return item.id === id
    
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
   this.saveToLocalStorage()
  }

  showlocalstorageKey(){
    console.log(this.localStorageKey);
    
  }

  saveToLocalStorage(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
  }
}



export let cart = new Cart('cart')