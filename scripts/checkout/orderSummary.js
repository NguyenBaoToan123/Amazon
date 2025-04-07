import {cart, removeFromCart, updateDeliveryOption, updateCartQuantityItems} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

import { deliveryOptions, getDeliveryDate, getDeliveryOption } from '../../data/deliverOptions.js'
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary() {
    if(cart.length === 0) {
        document.querySelector('.js-page-title')
            .innerHTML = "You do not have any orders"    
    return

    } else {

        document.querySelector('.js-page-title')
            .innerHTML = "Review your order"

        let cartSummaryHTML = '';

        cart.forEach((cartItem) =>{
            const productId = cartItem.productId;

            let matchingProduct = getProduct(productId)

            const deliverOptionId = cartItem.deliveryOptionId

            let deliveryOption = getDeliveryOption(deliverOptionId)
            
            const dateString = getDeliveryDate(deliveryOption);

            cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src= ${matchingProduct.image}>

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity">
                            <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link"
                                data-product-id = "${matchingProduct.id}">
                                Update
                            </span>
                            <input class = "quantity-input">
                            <span class = "save-quantity-link link-primary">Save</span>
                            <span class="delete-quantity-link link-primary js-delete-link" 
                            data-product-id = "${matchingProduct.id}">
                                Delete
                            </span>
                            
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
            `;
        });

        function deliveryOptionsHTML(matchingProduct, cartItem) {
            let html = '';
            deliveryOptions.forEach((deliveryOption) => {
                
                const dateString = getDeliveryDate(deliveryOption);

                const priceString = deliveryOption.priceCents === 0 ? 'FREE':`$${formatCurrency(deliveryOption.priceCents)}`

                const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

                html += 
                `
                <div class="delivery-option js-delivery-option"
                    data-product-id = "${matchingProduct.id}"
                    data-delivery-option-id = "${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
                `
            })
            return html
        }
        

        document.querySelector('.js-order-summary')
            .innerHTML = cartSummaryHTML;

        function updateQuantityItems (){ 
            let cartQuantity = updateCartQuantityItems()
            document.querySelector('.js-cart-quantity-items').innerHTML = `${cartQuantity} Items`;
        }

        updateQuantityItems()

        document.querySelectorAll('.js-delete-link')
            .forEach((link) => {
                link.addEventListener('click', () => {
                    const productId = link.dataset.productId;
                    removeFromCart(productId);

                    const container = document.querySelector(
                        `.js-cart-item-container-${productId}`);
                        
                    container.remove();
                    updateQuantityItems();
                    renderPaymentSummary();
                })
            })


        document.querySelectorAll('.js-delivery-option')
            .forEach((element) => {
                element.addEventListener('click',() => {
                    const {productId, deliveryOptionId} = element.dataset;
                    updateDeliveryOption(productId, deliveryOptionId)
                    renderOrderSummary()
                    renderPaymentSummary()
                })
            })
        }

        document.querySelectorAll(".js-update-link")
            .forEach((link) => {
                link.addEventListener('click', () => {
                const productId = link.dataset.productId
                console.log(productId);

                })
            })

        
}


