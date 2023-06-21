const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const notFound = require("./middleware/404");
const errorController = require('./controllers/error')

const sequelize = require('./utils/db');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set("view engine","ejs");

app.use((req,res,next)=>{
    User.findOne({where: {id:1}})
        .then(user=>{
            if(user){
                req.user = user;
                return user.getCart()
            }
        }).then(cart=>{
            if(!cart){
                req.user.createCart()
            }
            next();
        })
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use('/404', errorController.get404)
app.use(notFound);

Product.belongsTo(User, {constraint: true, onDelete: "CASCADE"});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {through:CartItem})
Product.belongsToMany(Cart, {through:CartItem})

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

sequelize.sync()
    .then(()=>{
        return User.findOne({
            where: {
                id: 1
            }
        })
    })
    .then((user)=>{
        if(!user){
            return User.create({
                name: "Dimas",
                email: "igkdimas@gmail.com"
            })
        }
        return user
    })
    .then((result)=>{
        app.listen(3000, () => {
            console.log(`Server is listening on PORT 3000`);
        })
    })
    .catch((err)=>{
        console.log(err);
    })

