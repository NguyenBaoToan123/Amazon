import { updateCartQuantityItems } from "../data/cart.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

const productDetails = JSON.parse(localStorage.getItem('trackingProduct'))||[]


export async function productTracking(productId, productQuantity, deliveryDate) {
    await loadProductsFetch()

    let trackingHTML = ''
    let matchingProduct = getProduct(productId)
        
    trackingHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${deliveryDate}
            </div>

            <div class="product-info">
                ${matchingProduct.name}
            </div>

            <div class="product-info">
                Quantity: ${productQuantity}
            </div>

            <img class="product-image" src= ${matchingProduct.image}>

            <div class="progress-labels-container">
                <div class="progress-label">
                Preparing
                </div>
                <div class="progress-label current-status">
                Shipped
                </div>
                <div class="progress-label">
                Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>`
            
    document.querySelector('.js-order-tracking')
        .innerHTML = trackingHTML;
    
    const cartQuantity = updateCartQuantityItems() 
    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity
    
}



if(window.location.pathname === "/tracking.html") {
    productTracking(productDetails.productId, productDetails.productQuantity, productDetails.deliveryDate)}