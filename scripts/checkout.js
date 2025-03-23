import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js"
import { /*loadProducts,*/ loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js';

//await = lets us wait for a promise to finish, before going to the next line.
//async makes a function return a promise
async function loadPage() {
    console.log('load page')
    await loadProductsFetch();
    
    const value = await new Promise((resolve) => {
        loadCart(() => {
            resolve('value3') 
        });
        //resolve let us go to the second step
    });

    renderOrderSummary();
    renderPaymentSummary();

    return 'value2'
    //= resolve 'value2' 
}
loadPage().then((value) => {
    console.log('next step');
});

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1') 
        })
    
        //resolve let us go to the second step
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1') 
    })

    //resolve let us go to the second step
}).then((value) => {
    console.log(value)
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
    
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/
/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/
