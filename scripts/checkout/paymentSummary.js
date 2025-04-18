import {cart, updateCartQuantityItems} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliverOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../orders.js';


export function renderPaymentSummary() {
        const paymentSummary = document.querySelector('.js-payment-summary');
        if (cart.length === 0) {
            paymentSummary.classList.remove('payment-summary');
            paymentSummary.classList.remove('js-payment-summary');
            paymentSummary.innerHTML = '';

            return
        } else {
                paymentSummary.classList.add('payment-summary');
                paymentSummary.classList.add('js-payment-summary');
                let productPriceCents = 0;
                let shippingPriceCents = 0;

                cart.forEach((cartItem) => {
                    const product = getProduct(cartItem.productId)
                    productPriceCents += product.priceCents*cartItem.quantity
                    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
                    shippingPriceCents += deliveryOption.priceCents;
                });

                const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
                const taxCents = totalBeforeTaxCents*0.1;
                const totalCents = totalBeforeTaxCents + taxCents;
                
                const paymentSummaryHTML = `
                    <div class="payment-summary-title">
                        Order Summary
                    </div>

                    <div class="payment-summary-row">
                        <div class = "js-items">3</div>
                        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
                    </div>

                    <div class="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
                    </div>

                    <div class="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
                    </div>
                    
                    <button class="place-order-button button-primary js-place-order">
                        Place your order
                    </button>
                    `
                document.querySelector('.js-payment-summary')
                    .innerHTML = paymentSummaryHTML;

                let cartQuantity = updateCartQuantityItems()
                document.querySelector('.js-items')
                    .innerHTML = `Items (${cartQuantity}):`

                document.querySelector('.js-place-order')
                    .addEventListener('click', async () => {
                        if(cart.length !== 0){
                            try {
                                const response = await fetch('https://supersimplebackend.dev/orders', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                    
                                    },
                                    body : JSON.stringify({
                                        cart: cart
                                    })
                    
                                })
                                const order = await response.json()
                                
                                addOrder(order)
                                localStorage.removeItem("cart")
                                

                            }catch(error) {
                                console.log('Unexpected error. Try again later')
                            }
                        navigate('orders.html');
                    }
                    })
        }

        function navigate(page) {
            const isGitHub = window.location.hostname.includes('github.io');
            const basePath = isGitHub ? '/Amazon/' : '/';
            window.location.href = `${basePath}${page}`;
          }

}


  
  