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
        deliveryOption: 1
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

  saveToLocalStorage(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.items))
  }
}



export let cart = new Cart('cart')