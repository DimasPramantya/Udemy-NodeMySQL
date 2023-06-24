const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect('mongodb+srv://Dimas:Dimas@cluster0.c40ruub.mongodb.net/?retryWrites=true&w=majority')
        .then((client)=>{
            console.log("Connected to Mongo");
            _db = client.db('shop');
            callback();
        })
        .catch(err=>{
            console.log(err);
        })
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw "No Databases Found"
}

module.exports = {mongoConnect, getDb};