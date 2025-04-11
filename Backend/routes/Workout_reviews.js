const router = require("express").Router();
let Workout_Review = require("../models/Workout_review");

http://Localhost:8070/Workout_review/add

router.route("/add").post((req,res)=>{

    const category = req.body.category;
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

    const newWorkout_Review = new Workout_Review ({

        category,
        description,
        stars,
        percent
    }) 

    newWorkout_Review.save().then(()=>{
        res.json("Workout Review Added")
    }).catch((err)=>{
        console.log(err);
    })

}) 

http://Localhost:8070/Workout_review

router.route("/").get((req,res)=>{

    Workout_Review.find().then((showWorkout_review)=>{
        res.json(showWorkout_review)
    }).catch((err)=>{
        console.log(err)
    })
})

http://Localhost:8070/Workout_review/update/${id}

router.route("/update/:Workout_reviewid").put(async (req,res)=>{
    let Workout_revId = req.params.Workout_reviewid;
    const {category, description} = req.body;

    const updateWorkout_Review = {
        category,
        description
    }

    const update = await Workout_Review.findByIdAndUpdate(Workout_revId, updateWorkout_Review)
    .then(()=>{
        res.status(200).send({status: "Workout Review Updated!"});
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Can not update the review",error: err.message});
    })  
})

http://Localhost:8070/Workout_review/delete/${id}

router.route("/delete/:id").delete(async(req,res)=>{
    let Workout_revId=req.params.id;

    await Workout_Review.findByIdAndDelete(Workout_revId)
    .then(()=>{
        res.status(200).send({status:"Workout Review deleted"});

    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the review",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let Workout_revId=req.params.id;
    const W_review=await Workout_Review.findById(Workout_revId)
    .then((Workout_review)=>{
        res.status(200).send({status:"Workout Review fetched",Workout_review})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting the review",error:err.message});
    })
})


module.exports = router;


