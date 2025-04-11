const router = require("express").Router();
const Instruct_Review = require("../models/Instruct_review");

router.route("/add").post((req, res) => {
    const { name, description,  } = req.body;
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

    const newInstruct_Review = new Instruct_Review ({
        name,
        description,
        stars, 
        percent // Include percentage in the newInstruct_Review object
    });

    newInstruct_Review.save().then(()=>{
        res.json("Instructor Review Added")
    }).catch((err)=>{
        console.log(err);
    });
});

router.route("/").get((req, res) => {
    Instruct_Review.find().then((showInstruct_review)=>{
        res.json(showInstruct_review)
    }).catch((err)=>{
        console.log(err)
    });
});

// Rest of the routes remain the same


router.route("/update/:Instruct_reviewid").put(async (req, res) => {
    let Instruct_revId = req.params.Instruct_reviewid;
    const { name, description, } = req.body;

    const updateInstruct_Review = {
        name,
        description,
    }

    const update = await Instruct_Review.findByIdAndUpdate(Instruct_revId, updateInstruct_Review)
    .then(()=>{
        res.status(200).send({status: "Instructor Review Updated!"});
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Can not update the review", error: err.message});
    });
});

router.route("/delete/:id").delete(async(req, res) => {
    let Instruct_revId = req.params.id;

    await Instruct_Review.findByIdAndDelete(Instruct_revId)
    .then(()=>{
        res.status(200).send({status:"Instructor Review deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the review",error: err.message});
    });
});

router.route("/get/:id").get(async(req, res) => {
    let Instruct_revId = req.params.id;
    const Instruct_review = await Instruct_Review.findById(Instruct_revId)
    .then((Instruct_review)=>{
        res.status(200).send({status:"Instructor Review fetched", Instruct_review})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting the review", error: err.message});
    });
});

module.exports = router;