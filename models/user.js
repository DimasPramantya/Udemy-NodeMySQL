const { ObjectId } = require('mongodb');
const {getDb} = require('../utils/db')

class User{
    constructor(username, email, cart, id){
        this.name = username;
        this.email = email;
        this.cart = cart;
        this.id = new ObjectId(id);
    }

    save(){
        const db = getDb();
        return(
            db.collection('users').insertOne(this)
                .then(user=>{
                    return user;
                })
                .catch(err=>{
                    console.log(err);
                })
        )
    }

    addToCart(product, cart){
        const updatedCart = cart;
        const currCartItems = cart.items;
        const prodIdx = currCartItems.findIndex(e=>{
            return e.productId.toString() === product._id.toString();
        })
        if(prodIdx===-1){
            updatedCart.items.push({productId: product._id, quantity:1});
        }else{
            updatedCart.items[prodIdx].quantity += 1;
        }
        const db = getDb();
        return(
            db.collection('users').updateOne({_id: this.id} ,{$set: {cart: updatedCart}})
            .catch(err=>{
                console.log(err);
            })
        )
    }

    getCart(){
        const productIds = this.cart.items.map(e=>{
            return e.productId;
        })
        const db = getDb();
        return(
            db.collection('products').find({_id:{$in: productIds}}).toArray()
            .then(products=>{
                return products.map(product=>{
                    return{...product, quantity: this.cart.items.find(e=>{
                        return e.productId.toString() === product._id.toString();
                    }).quantity}
                })
            })
        )
    }

    static findById(id){
        id = new ObjectId(id);
        const db = getDb();
        return(
            db.collection('users').find({_id:id}).next()
                .then(user=>{
                    return user;
                })
                .catch(err=>{
                    console.log(err);
                })
        )
    }
}

module.exports = User