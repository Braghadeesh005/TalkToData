const express = require('express');
const cors = require("cors");
const app = express();

//Dotenv config
const dotenv = require('dotenv')
dotenv.config({path: './config.env' })


const passport = require("passport");
const passportStrategy = require("./passport");
const mongoose =require("mongoose") 

// Google Auth - passport
app.use(passport.initialize());
 
app.use(  
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Router 
const authRoute = require("./router/auth");
app.use("/", authRoute);

//Port Configuration
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});