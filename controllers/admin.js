const Product = require('../models/product');

const getAddProduct = (req,res,next)=>{
    try {
        res.render("admin/edit-product",{pageTitle: "Add Product", 
            editMode: false,
            product: null
        })   
    } catch (error) {
        console.log(error);
    }
}

const getProducts = (req,res,next)=>{
    // const loggedUser = req.user;
    Product.fetchAll()
        .then(products=>{
            res.render("admin/products",{products, pageTitle: "Admin Products"});
        })
        .catch(err=>{
            console.log(err);
        })
}

const getEditProducts = (req,res,next)=>{
    const {productId} = req.params;
    const editMode = Boolean(req.query.edit);
    // const loggedUser = req.user;
    Product.fetchOne(productId)
    .then(product=>{
        res.render("admin/edit-product",{pageTitle: "Edit Product", product, editMode})
    })
}

const postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product  = new Product(title, price, description, imageUrl);
    product.save()
        .then(result=>{
            console.log(result);
            res.redirect("/");
        })
        .catch(err=>{
            console.log(err);
        })
}

const postEditProduct = (req,res,next)=>{
    const {productId} = req.params;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(title,price,description,imageUrl, productId);
    product.save()
    .then(result=>{
        console.log("Product is updated");
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
    })
}

const deleteProduct = (req,res,next)=>{
    const {productId} = req.body;
    Product.delete(productId)
    .then(()=>{
        res.redirect("/")
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = {
    getAddProduct,
    postAddProduct, 
    getProducts, 
    getEditProducts, 
    postEditProduct, 
    deleteProduct
};