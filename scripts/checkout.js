import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js';

new Promise((resolve) => {
    loadProducts(() => {
        resolve() 
    })
    //resolve let us go to the second step
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
