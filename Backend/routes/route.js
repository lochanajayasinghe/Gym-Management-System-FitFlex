// import { Router } from "express";
// const router = Router();
const express = require('express');
const router = express.Router();

/** import all controllers */
const  controller =require( '../controllers/appController.js');
const  {registerMail}  = require("../controllers/mailer.js");
const {Auth} = require('../middleware/auth.js');
const localVariables = require('../middleware/auth.js').localVariables;



/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser,localVariables, controller.generateOTP) // generate random OTP  localVariables,
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables

router.route('/users/:role').get(controller.getU) 


router.route('/getUsers').get(controller.getUsers)//get user details
router.route('/update').put(controller.updateUsers)//update user details

/** DELETE Methods */
router.route('/delete/:id').delete(controller.deleteUser)//delete user details


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile 
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password



module.exports = router;
