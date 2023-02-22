const mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FarmServer',{
    useNewUrlParser:true
});
const User = mongoose.model('User',{
    uid: String,
    firstname: String,
    lastname:String,
    mobno:Number,
    password: String,
    wishlist:[],
    cart:[],
    order:[]
});
const Admin = mongoose.model('Admin',{
    id:String,
    password:String
})
const Product = mongoose.model('Product',{
    pname:String,
    type:String,
    age:String,
    description:String,
    quality:String,
    price: Number,
    image:String
})
module.exports={
    User,
    Product,
    Admin
}