const router = require("express").Router();
let Salary = require("../models/Salary");

http://Localhost:8070/Salary/add

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const position = req.body.position;
    const workDays = req.body.workDays; 
    const salary = req.body.salary

    const newSalary = new Salary ({
        name,
        position,
        workDays,
        salary
    }) 

    newSalary.save().then(()=>{
        res.json("Salary Added")
    }).catch((err)=>{
        console.log(err);
    })

}) 

http://Localhost:8070/Salary

router.route("/").get((req,res)=>{

    Salary.find().then((showSalary)=>{
        res.json(showSalary)
    }).catch((err)=>{
        console.log(err)
    })
})

http://Localhost:8070/Salary/update/${id}

router.route("/update/:Salaryid").put(async (req,res)=>{
    let SalId = req.params.Salaryid;
    const {name, position, workDays, salary} = req.body;

    const updateSalary = {
        name,
          position,
          workDays,
          salary
    }

    const update = await Salary.findByIdAndUpdate(SalId, updateSalary)
    .then(()=>{
        res.status(200).send({status: "Salary Updated!"});
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Can not update the review",error: err.message});
    })  
})

http://Localhost:8070/Salary/delete/${id}

router.route("/delete/:id").delete(async(req,res)=>{
    let SalId=req.params.id;

    await Salary.findByIdAndDelete(SalId)
    .then(()=>{
        res.status(200).send({status:"Salary deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting the Salary",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let SalId=req.params.id;
    const Salary=await Salary.findById(SalId)
    .then((Salary)=>{
        res.status(200).send({status:"Salary fetched",Salary})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting the Salary",error:err.message});
    })
})


module.exports = router;