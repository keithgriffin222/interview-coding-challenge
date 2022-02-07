// This variable 'let carts' targets the buttons with the class "add-cart".
let carts = document.querySelectorAll('.add-cart')

// This variable is an array which contains the app's items, quantity and cost.
let products = [
    {
        name: "Chair",
        tag: "chair",
        price: 60,
        inCart: 0
    },
    {
        name: "Gloves",
        tag: "gloves",
        price: 20,
        inCart: 0
    },
    {
        name: "Phone",
        tag: "phone",
        price: 100,
        inCart: 0
    },
]

//This 'for loop', loops through from 0 to 3 buttons which have a class of "add-cart".
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        //This line of code keeps track of each items price and quantity whenever they are clicked and added to the cart.
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


//NOTE: This function shown between 17:00-18:50 (Part 2/5) is irrelvant and not used.
//This function checks how many items are added to the local storage (in case the page is refreshed while shopping).
// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');
// }

// This function tracks how many items are being added to the cart.
function cartNumbers(products) {
    //console.log("Product clicked:", products)
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if ( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }

    setItems(products);
}

//This function keeps track of each DIFFERENT item added to the cart.
function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //console.log("My items are", cartItems);

    if (cartItems != null) {

        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }

        cartItems[products.tag].inCart += 1;
    } else {
    products.inCart = 1;
    cartItems = {
        [products.tag]: products
    }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//This function will calculate the total cost of all the items in the shopping cart. It will also store the cost of each item in the console and application browser.
function totalCost(products) {
    //console.log("the product price is:", products.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("Cart cost:", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}