const router=require("express").Router();
let Product = require("../models/Product");

router.route("/add").post((req,res)=>{

    console.log(req.body);
    const productName=req.body.productName;
    const imageUrl=req.body.imageUrl;
    const price=Number(req.body.price);
    const quantity=Number(req.body.quantity);
    const description=req.body.description;
    const productCategory=req.body.productCategory;
    const amount=Number(req.body.amount);


    const newProduct =new Product({
        productName,
        imageUrl,
        price,
        quantity,
        description,
        productCategory,
        amount
    })

    newProduct.save().then(()=>{
        res.json("Product Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Product.find().then((product)=>{
        res.json(product)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{
    let productId=req.params.id;
    const {  productName, imageUrl, price,quantity,description,productCategory,amount}=req.body; 

    const updateProduct={
        productName: req.body.productName,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        productCategory: req.body.productCategory,
        amount: req.body.amount
    }

    const update=await Product.findByIdAndUpdate(productId,updateProduct)
    .then(()=>{
        res.status(200).send({status: "Product updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updateing data",error:err.message});
    })
})


router.route("/delete/:id").delete(async(req,res)=>{
    let productId=req.params.id;

    await Product.findByIdAndDelete(productId)
    .then(()=>{
        res.status(200).send({status:"Product deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete Product",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let productId=req.params.id;
    const prod=await Product.findById(productId)
    .then((product)=>{
        if (!product) {
            return res.status(404).send({status: "Product not found", error: "Product with the given ID was not found"});
        }
        res.status(200).send({status:"Product fetched", product});
     }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error:err.message});
    })
})


router.route("/decrementProductQ").put(async (req, res) => {
    try {
      const cart = req.body.cart;
      console.log(cart);
      if (!Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: 'Invalid cart data' });
      }
  
      for (const item of cart) {
        const productId = item._id;
        const amount = item.amount;
   
        if (typeof productId !== 'string' || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid cart item data' });
          }
        console.log(productId);
        console.log(amount);
        const product = await Product.findById(productId);
  
        if (product && product.quantity >= amount) {
          product.quantity -= amount;
          await product.save();
        } else {
          console.log(`Product not found or insufficient quantity for product with ID ${productId}`);
          return res.status(404).send({ status: 'Product not found or insufficient quantity', error: `Product with ID ${productId} not found or quantity is not sufficient` });
        }
      }
  
      res.status(200).json({ message: 'Product quantities decremented successfully' });
      
    } catch (error) {
      console.error('Error while decrementing product quantities:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


module.exports=router;


// router.route("/decrementProductQ").put(async (req, res) => {
//     try {
//       const cart = req.body.cart;
  
//       if (!Array.isArray(cart) || cart.length === 0) {
//         return res.status(400).json({ error: 'Invalid cart data' });
//       }
  
//       for (const item of cart) {
//         const productId = item._id;
//         const amount = item.amount;
  
//         if (typeof productId !== 'string' || typeof amount !== 'number' || amount <= 0) {
//           return res.status(400).json({ error: 'Invalid cart item data' });
//         }
  
//         const product = await Product.findById(productId);
  
//         if (!product) {
//           return res.status(404).json({ error: `Product with ID ${productId} not found` });
//         }
  
//         if (product.quantity < amount) {
//           return res.status(400).json({ error: `Insufficient quantity for product with ID ${productId}` });
//         }
  
//         product.quantity -= amount;
//         await product.save();
//       }
  
//       res.status(200).json({ message: 'Product quantities decremented successfully' });
//     } catch (error) {
//       console.error('Error while decrementing product quantities:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });














