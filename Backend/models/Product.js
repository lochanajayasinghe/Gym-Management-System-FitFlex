const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema =new Schema({
    
    productName :{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }, description :{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }


})

const Product =mongoose.model("Product",productSchema);

module.exports=Product;
