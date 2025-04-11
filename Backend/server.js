const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv=require("dotenv");
const cors = require('cors');
require("dotenv").config();
const router = require('./routes/route.js');

// const morgan = require('morgan');
// const connect = require('./database/conn.js');


const app = express();


const PORT =process.env.PORT || 8070;


/** Middlewares */
app.use(cors());
app.use(bodyParser.json());
// app.use(morgan('tiny'));
// app.disable('x-powered-by'); // less hackers know about our stack

//products-yashodara
const productRouter=require("./routes/products.js");
const orderRouter = require("./routes/orders.js");
//reviews-samadhi
const Workout_reviewRouter = require("./routes/Workout_reviews.js");
const Product_reviewRouter = require("./routes/Product_reviews.js");
const Instruct_reviewRouter = require("./routes/Instruct_reviews.js");

//payment-chamika
const CardRouter = require("./routes/Cards.js");
const SalaryRouter = require("./routes/SalaryS.js")

//workouts-limeth
const exercisesRouter = require('./routes/exercises.js');
const workoutRouter=require('./routes/workouts.js');

//booking
const bookingsRouter = require('./routes/bookings.js')



const URL=process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connection success!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});


/** API routes */
app.use('/api', router)

//product-yashodara
app.use("/product",productRouter);
app.use("/order",orderRouter);
//reviews-samadhi
app.use("/Workout_review", Workout_reviewRouter);
app.use("/Product_review", Product_reviewRouter);
app.use("/Instruct_review", Instruct_reviewRouter);

//payment-chamika
app.use("/Card",CardRouter );
app.use("/Salary", SalaryRouter)

//workouts-limeth
app.use('/exercises', exercisesRouter);
app.use('/workouts',workoutRouter);

//booking
app.use('/bookings',bookingsRouter);




/** Start server only when we have a valid connection */

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})
