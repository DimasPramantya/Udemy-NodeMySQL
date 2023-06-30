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

const getCart = (req,res,next)=>{
    req.user.getCart()
    .then(products=>{
        res.render("shop/cart",{
            pageTitle: "Cart",
            products
        })
    })
}

const getOrders = (req,res,next)=>{
    req.user.getOrders()
    .then((orders)=>{
        console.log(orders);
        res.render("shop/orders",{
            pageTitle: "Your Orders",
            orders
        })
    })
}

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


const postCart = (req,res,next)=>{
    const productId = req.body.productId;
    Product.fetchOne(productId)
    .then(product=>{
        req.user.addToCart(product, req.user.cart)
        .then(result=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(err);
        })
    })
}

const deleteCartItem = (req,res,next)=>{
    const productId = req.body.productId;
    console.log(productId);
    req.user.removeCartItem(productId)
    .then(()=>{
        res.redirect("/cart")
    })
    .catch(err=>{
        console.log(err);
    })
}

const postOrder = (req,res,next)=>{
   req.user.addOrder()
    .then((result)=>{
        res.redirect('/order')
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = {
    getProducts, 
    getCart, 
    getIndex, 
    // getCheckout, 
    getOrders, 
    getProductDetail, 
    postCart, 
    deleteCartItem,
    postOrder
};