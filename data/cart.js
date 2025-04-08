export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


export function addToCart(productId,itemQuantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem
        }
    });

    if (matchingItem) {
        matchingItem.quantity += Number(itemQuantity)
    } else {
    cart.push({
        productId: productId,
        quantity: Number(itemQuantity),
        deliveryOptionId: '1'
    });
    }
    saveToStorage();
  }

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })
    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest()

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    fun();
  })

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}


export function updateCartQuantityItems (){ 
    let cartQuantity = 0
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
    let matchingItem;

    cart.forEach((cartItem) =>{
        if (productId === cartItem.productId){
            matchingItem = cartItem
        }
    })

    matchingItem.quantity = newQuantity;
    saveToStorage()
}