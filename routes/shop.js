const express = require("express");
const router = express.Router();
const shopController = require('../controllers/shop');

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts) 
// router.get("/checkout", shopController.getCheckout);
// router.get("/order", shopController.getOrders);
router.get("/product/:id", shopController.getProductDetail);
// router.get("/cart", shopController.getCart)
// router.post("/cart", shopController.postCart);
// router.post("/delete-cart-item", shopController.deleteCartItem);
// router.post("/create-order", shopController.postOrder);
   
module.exports = router;