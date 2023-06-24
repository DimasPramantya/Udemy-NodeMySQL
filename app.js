const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const {mongoConnect} = require('./utils/db');

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const notFound = require("./middleware/404");
const errorController = require('./controllers/error')

const app = express();

app.set("view engine","ejs");

app.use((req,res,next)=>{
    // User.findOne({where: {id:1}})
    //     .then(user=>{
    //         if(user){
    //             req.user = user;
    //             return user.getCart()
    //         }
    //     }).then(cart=>{
    //         if(!cart){
    //             req.user.createCart()
    //         }
    //         next();
    //     })
    next();
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use('/404', errorController.get404);

app.use(notFound);

mongoConnect(()=>{
    app.listen(5000);
})

