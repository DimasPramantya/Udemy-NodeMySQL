const Product = require('../models/product');
// const Cart = require('../models/cart');
// const User = require('../models/user');
// const CartItem = require('../models/cart-item');
// const Order = require('../models/order');

const getProducts = (req,res,next)=>{
    Product.fetchAll()
        .then(products=>{
            res.render("shop/product-list",{products, pageTitle: "All Products"});
        })
        .catch(err=>{
            console.log(err);
        })
}

const getIndex = (req,res,next)=>{
    Product.fetchAll()
        .then(products=>{
            res.render("shop/index",{products, pageTitle: "Shop"});
        })
        .catch(err=>{
            console.log(err);
        })
}

// const getCart = (req,res,next)=>{
//     const loggedUser = req.user;
//     loggedUser.getCart()
//         .then(cart=>{
//             if(cart){
//                 return cart.getProducts();
//             }
//             return null;
//         }).then(products=>{
//             res.render("shop/cart",{
//                 pageTitle: "Cart",
//                 products
//             })
//         })
// }

// const getOrders = (req,res,next)=>{
//     const loggedUser = req.user;
//     loggedUser.getOrders()
//     .then((order)=>{
//         const lastOrder = order[order.length-1]
//         return lastOrder.getProducts();
//     }).then(products=>{
//         console.log(products);
//         res.render("shop/orders",{
//             pageTitle: "Your Orders",
//             products
//         })
//     })
// }

// const getCheckout = (req,res,next)=>{
//     res.render("shop/checkout",{
//         pageTitle: "Checkout"
//     })
// }

const getProductDetail = (req,res,next)=>{
    const {id: productId} = req.params;
    Product.fetchOne(productId)
        .then(product=>{
            res.render("shop/product-detail", {
                product,
                pageTitle: product.title
            })
        })
        .catch(err=>{
            console.log(err);
        })
}


// const postCart = (req,res,next)=>{
//     const loggedUser = req.user;
//     const prodId = req.body.productId;
//     Promise.all([loggedUser.getCart(), Product.findOne({where:{id:prodId}}),CartItem.findOne({where:{productId:prodId}})])
//         .then(([cart, product, cartItem])=>{
//             let newQuantity = 1;
//             if(cartItem){
//                 newQuantity++;
//                 return cartItem.update({
//                     prodQuantity: newQuantity
//                 })
//             }
//             return cart.addProduct(product, { through: { prodQuantity: newQuantity} })
//         }).then((result)=>{
//             res.redirect("/cart")
//         })
//         .catch(err=>{
//             console.log(err);
//         })
// }

// const deleteCartItem = (req,res,next)=>{
//     const productId = req.body.productId;
//     const loggedUser = req.user;
//     loggedUser.getCart()
//     .then(cart=>{
//         return cart.getProducts({where: {id:productId}})
//     })
//     .then(product=>{
//         let cartItem = product[0].cartItem;
//         cartItem.destroy();
//         res.redirect("/cart");
//     })
//     .catch(err=>{
//         console.log(err);
//     })
// }

// const postOrder = (req,res,next)=>{
//     const loggedUser = req.user;
//     let fetchedCart;
//     loggedUser.getCart()
//     .then(cart=>{
//         fetchedCart = cart;
//         return Promise.all([cart.getProducts(), loggedUser.createOrder()])
//     })
//     .then(([products, order])=>{
//         products.forEach(product=>{
//             order.addProduct(product, {through: {prodQuantity: product.cartItem.prodQuantity}});
//         })
//         return fetchedCart.setProducts(null);
//     })
//     .then((result)=>{
//         res.redirect('/order')
//     })
//     .catch(err=>{
//         console.log(err);
//     })
// }

module.exports = {
    getProducts, 
    // getCart, 
    getIndex, 
    // getCheckout, 
    // getOrders, 
    getProductDetail, 
    // postCart, 
    // deleteCartItem,
    // postOrder
};