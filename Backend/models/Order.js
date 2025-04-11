const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const orderSchema =new Schema({
    productID:{
        type:String,
        required:true
    },
    orderName :{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }


})

const Order =mongoose.model("Order",orderSchema);

module.exports=Order;
