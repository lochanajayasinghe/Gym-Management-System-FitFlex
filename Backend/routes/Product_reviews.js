const router = require("express").Router();
let Product_Review = require("../models/Product_review");

http://Localhost:8070/Product_review/add

router.route("/add").post((req,res)=>{

    const type = req.body.type;
    const description = req.body.description;
    const stars = req.body.stars; // New code to get stars from the request body
    const percent = req.body.percent;

    // Calculate percentage based on stars
    let percentage = 0;
    switch(stars) {
        case "one":
            percentage = 20;
            break;
        case "two":
            percentage = 40;
            break;
        case "three":
            percentage = 60;
            break;
        case "four":
            percentage = 80;
            break;
        case "five":
            percentage = 100;
            break;
        default:
            percentage = 0;
    }

    const newProduct_Review = new Product_Review ({

        type,
        description,
        stars, // Include stars in the newInstruct_Review object
        percent
    }) 

    newProduct_Review.save().then(()=>{
        res.json("Product Review Added")
    }).catch((err)=>{
        console.log(err);
    })

}) 

http://Localhost:8070/Product_review

router.route("/").get((req,res)=>{

    Product_Review.find().then((showProduct_review)=>{
        res.json(showProduct_review)
    }).catch((err)=>{
        console.log(err)
    })
})

http://Localhost:8070/Product_review/update/${id}

router.route("/update/:Product_reviewid").put(async (req,res)=>{
    let Product_revId = req.params.Product_reviewid;
    const {type, description} = req.body;

    const updateProduct_Review = {
        type,
        description
    }

    const update = await Product_Review.findByIdAndUpdate(Product_revId, updateProduct_Review)
    .then(()=>{
        res.status(200).send({status: "Product Review Updated!"});
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Can not update the review",error: err.message});
    })  
})

http://Localhost:8070/Product_review/delete/${id}

router.route("/delete/:id").delete(async(req,res)=>{
    let Product_revId=req.params.id;

    await Product_Review.findByIdAndDelete(Product_revId)
    .then(()=>{
        res.status(200).send({status:"Product Review deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the review",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let Product_revId=req.params.id;
    const Product_review=await Product_Review.findById(Product_revId)
    .then((Product_review)=>{
        res.status(200).send({status:"Product Review fetched",Product_review})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting the review",error:err.message});
    })
})


module.exports = router;