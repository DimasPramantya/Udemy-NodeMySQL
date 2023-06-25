const { ObjectId } = require('mongodb');
const {getDb} = require('../utils/db');

class Product{
    constructor(title,price,description,imageUrl, user_id, id){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.user_id = new ObjectId(user_id);
        if(id){
            console.log(id);
            this._id = new ObjectId(id);
        }
    }

    save(){
        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db.collection('products').updateOne({_id: this._id},{$set: this});
        }else{
            dbOp = db.collection('products').insertOne(this);
        }
        return(
            dbOp
            .then(result=>{
                console.log(result);
            })
            .catch(err=>{
                console.log(err);
            })
        )
    }

    static fetchAll(){
        const db = getDb();
        return(
            db.collection('products').find().toArray()
                .then(products=>{
                    return products;
                })
                .catch(err=>{
                    console.log(err);
                })
        )
    }

    static fetchOne(id){
        const db = getDb();
        id = new ObjectId(id);
        return(
            db.collection('products').find({_id:id}).next()
            .then(product=>{
                return product;
            })
            .catch(err=>{
                console.log(err);
            })
        )
    }

    static delete(id){
        const db = getDb();
        id = new ObjectId(id);
        return(
            db.collection('products').deleteOne({_id:id})
            .catch(err=>{
                console.log(err);
            })
        )
    }

    update(id){
        const db = getDb();
        id = new ObjectId(id);
        return(
            db.collection('products').updateOne({
                _id: id
            },{
                $set:{
                    title: this.title, 
                    price: this.price, 
                    imageUrl: this.imageUrl, 
                    description: this.description
                }
            }).catch(err=>{
                console.log(err);
            })
        )
    }
}

module.exports = Product