const router=require("express").Router();
const Order = require("../models/Order");


router.route("/add").post((req,res)=>{

    console.log(req.body);
    const productID = req.body.productID;
    const orderName=req.body.orderName;
    const imageUrl=req.body.imageUrl;
    const totalPrice=Number(req.body.totalPrice);
    const amount=Number(req.body.amount);


    const newOrder =new Order({
        productID,
        orderName,
        totalPrice,
        amount
    })

    newOrder.save().then(()=>{
        res.json("Order Done")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/get/:id").get(async(req,res)=>{
    let orderId=req.params.id;
    const ord=await Order.findById(orderId)
    .then((order)=>{
        if (!order) {
            return res.status(404).send({status: "Order not found", error: "Order with the given ID was not found"});
        }
        res.status(200).send({status:"Order fetched", order});
     }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Order",error:err.message});
    })
})


module.exports=router;









