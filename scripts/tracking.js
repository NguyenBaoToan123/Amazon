import { getDeliveryDate, getDeliveryOption } from "../data/deliverOptions.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

const productDetails = JSON.parse(localStorage.getItem('trackingProduct'))||[]


export async function productTracking(productId, productQuantity) {
    await loadProductsFetch()

    let trackingHTML = ''
    let matchingProduct = getProduct(productId)

    let deliveryOption = getDeliveryOption(productId)

    const dateString = getDeliveryDate(deliveryOption)
    
    trackingHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${dateString}
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
    
}


productTracking(productDetails.productId, productDetails.productQuantity)