import { cart, updateCartQuantityItems } from "../data/cart.js";
import { getDeliveryDate, getDeliveryOption } from "../data/deliverOptions.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order) {
    orders.unshift(order);
    //unshift add items at the front of the array
    saveOrderToStorage()
}






function saveOrderToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders))
}



export async function returnOrderSummary() {
    try {
        await loadProductsFetch()

        let orderHTML = ''
        orders.forEach((order) => {
            try {
                order.products.forEach((orderItem) => {
                    const productId = orderItem.productId;
        
                    let matchingProduct = getProduct(productId)
        
                    const deliveryOptionId = orderItem.deliveryOptionId;
                    let deliveryOption = getDeliveryOption(deliveryOptionId);
        
                    const today = dayjs();
                    const todayFormat = today.format('dddd, MMMM D');
        
                    const dateString = getDeliveryDate(deliveryOption);
                    orderHTML += `
                        <div class="order-container">
        
                        <div class="order-header">
                            <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">Order Placed:</div>
                                <div>${todayFormat}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>${matchingProduct.getPrice()}</div>
                            </div>
                            </div>
        
                            <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${matchingProduct.id}</div>
                            </div>
                        </div>
        
                        <div class="order-details-grid">
                            <div class="product-image-container">
                            <img src=${matchingProduct.image}>
                            </div>
        
                            <div class="product-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-delivery-date">
                                Arriving on: ${dateString}
                            </div>
                            <div class="product-quantity">
                                Quantity: ${orderItem.quantity}
                            </div>
                            <button class="buy-again-button button-primary">
                                <img class="buy-again-icon" src="images/icons/buy-again.png">
                                <span class="buy-again-message">Buy it again</span>
                            </button>
                            </div>
        
                            <div class="product-actions">
                            <a href="tracking.html">
                                <button class="track-package-button button-secondary js-track-package"
                                data-product-id = "${matchingProduct.id}"
                                data-product-quantity = "${orderItem.quantity}"
                                data-product-delivery-date = "${dateString}">
                                Track package
                                </button>
                            </a>
                            </div>
                        </div>
                        </div>`
                })
            } catch (error) {
                console.error("Error processing order products:", error);
            }
        })

        document.querySelector('.js-order-grid')
            .innerHTML = orderHTML

        let cartQuantity = updateCartQuantityItems()
        document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity

        document.querySelectorAll('.js-track-package')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId
                const productQuantity = link.dataset.productQuantity
                const deliveryDate = link.dataset.productDeliveryDate
                localStorage.setItem('trackingProduct', JSON.stringify({productId: `${productId}`, productQuantity: `${productQuantity}`, deliveryDate: `${deliveryDate}`})); 
            })
        })
    } catch (error) {
        console.error("Error generating order summary:", error);
    }
    console.log(cart)
    console.log(orders)
}

document.addEventListener("DOMContentLoaded", () => {
    returnOrderSummary();
});
