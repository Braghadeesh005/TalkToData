const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser");
const mysql = require('mysql');
const { connectToDatabase } = require('../db/mysqlConnection');
const { connectToDatabase2 } = require('../db/mongodbConnection');
const router = express.Router();
//DB
require('../db/conn')

router.use(cookieParser());
const authenticate = require('../middleware/authenticate')
const User = require('../schema/userSchema')

const passport = require("passport");

 

// ---------------------------------------------------------------------------------   GOOGLE OAUTH 2     --------------------------------------------------------------------------------------

//signup - strategy
router.get("/auth/google/signup", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/auth/google/signup/callback",
	passport.authenticate("google",{session: false}),
	(req,res) => {
		// successRedirect: process.env.CLIENT_URL,
		// failureRedirect: "/signup/failed",
		const token = req.user.token
		res.cookie("jwtoken", token, { path: '/' },{ expires:new Date(Date.now()+ 25892000),httpOnly: true });
		console.log("Cookie stored");
		console.log("========================");
    	res.redirect(process.env.CLIENT_URL);

	}
);


// -------------------------------------------------------------------------------------    ROUTES     ----------------------------------------------------------------------------------------


router.post('/api/sql-connection', authenticate, async (req, res) => {
	const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = req.body;
  
	// Validate the input
	if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE || !MYSQL_PORT) {
	  return res.status(400).json({ error: 'All fields are required' });
	}
  
	const config = {
	  host: MYSQL_HOST,
	  user: MYSQL_USER,
	  password: MYSQL_PASSWORD,
	  database: MYSQL_DATABASE,
	  port: MYSQL_PORT || 3306
	};
  
	try {
	  // Create MySQL connection to validate the connection details
	  await connectToDatabase(config);
  
	  // Update the user's document with the new SQL connection details
	  const user = req.rootUser;
  
	  user.sqlConnections.push({
		host: MYSQL_HOST,
		user: MYSQL_USER,
		password: MYSQL_PASSWORD,
		database: MYSQL_DATABASE,
		port: MYSQL_PORT
	  });
  
	  user.currentDbConnection = {
		type: 'sql',
		sqlParams: {
		  host: MYSQL_HOST,
		  user: MYSQL_USER,
		  password: MYSQL_PASSWORD,
		  database: MYSQL_DATABASE,
		  port: MYSQL_PORT
		}
	  };
  
	  await user.save();
	  console.log("DB CREDENTIALS UPDATED FOR MYSQL");
  
	  res.status(200).json({ message: 'SUCCESS' });
	} catch (error) {
	  console.error('Error connecting to MySQL or updating user connections:', error);
	  res.status(500).json({ error: 'Failed to connect to MySQL or update user connections' });
	}
  });



router.post('/api/mongo-connection', authenticate, async (req, res) => {
	const { connectionString } = req.body;
  
	// Validate the input
	if (!connectionString) {
	  return res.status(400).json({ error: 'Connection string is required' });
	}
  
	try {
	  // Create MongoDB connection to validate the connection string
	  await connectToDatabase2(connectionString);
  
	  // Update the user's document with the new MongoDB connection details
	  const user = req.rootUser;
  
	  user.mongoConnections.push({ connectionString });
  
	  user.currentDbConnection = {
		type: 'mongo',
		mongoConnectionString: connectionString
	  };
  
	  await user.save();
	  console.log("Db credentials updated for user's mongodb");
  
	  res.status(200).json({ message: 'SUCCESS' });
	} catch (error) {
	  console.error('Error connecting to MongoDB or updating user connections:', error);
	  res.status(500).json({ error: 'Failed to connect to MongoDB or update user connections' });
	}
  });
   
  router.get('/api/get-connections', authenticate, async (req, res) => {
	try {
	  const user = req.rootUser;
  
	  const sqlConnections = user.sqlConnections || [];
	  const mongoConnections = user.mongoConnections || [];
  
	  res.status(200).json({
		sqlConnections,
		mongoConnections,
	  });
	} catch (error) {
	  console.error('Error fetching connections:', error);
	  res.status(500).json({ error: 'Failed to fetch connections' });
	}
  });








  router.post('/api/existing-sql-connection', authenticate, async (req, res) => {
	const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = req.body;
  
	// Validate the input
	if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE || !MYSQL_PORT) {
	  return res.status(400).json({ error: 'All fields are required' });
	}
  
	const config = {
	  host: MYSQL_HOST,
	  user: MYSQL_USER,
	  password: MYSQL_PASSWORD,
	  database: MYSQL_DATABASE,
	  port: MYSQL_PORT || 3306
	};
  
	try {
	  // Create MySQL connection to validate the connection details
	  await connectToDatabase(config);
  
	  // Update the user's document with the new SQL connection details
	  const user = req.rootUser;
  
	  
  
	  user.currentDbConnection = {
		type: 'sql',
		sqlParams: {
		  host: MYSQL_HOST,
		  user: MYSQL_USER,
		  password: MYSQL_PASSWORD,
		  database: MYSQL_DATABASE,
		  port: MYSQL_PORT
		}
	  };
  
	  await user.save();
	  console.log("DB CREDENTIALS UPDATED FOR MYSQL");
  
	  res.status(200).json({ message: 'SUCCESS' });
	} catch (error) {
	  console.error('Error connecting to MySQL or updating user connections:', error);
	  res.status(500).json({ error: 'Failed to connect to MySQL or update user connections' });
	}
  });



router.post('/api/existing-mongo-connection', authenticate, async (req, res) => {
	const { connectionString } = req.body;
  
	// Validate the input
	if (!connectionString) {
	  return res.status(400).json({ error: 'Connection string is required' });
	}
  
	try {
	  // Create MongoDB connection to validate the connection string
	  await connectToDatabase2(connectionString);
  
	  // Update the user's document with the new MongoDB connection details
	  const user = req.rootUser;
  
	  user.currentDbConnection = {
		type: 'mongo',
		mongoConnectionString: connectionString
	  };
  
	  await user.save();
	  console.log("Db credentials updated for user's mongodb");
  
	  res.status(200).json({ message: 'SUCCESS' });
	} catch (error) {
	  console.error('Error connecting to MongoDB or updating user connections:', error);
	  res.status(500).json({ error: 'Failed to connect to MongoDB or update user connections' });
	}
  });

  router.post('/api/chat', (req, res) => {
	const { message } = req.body;
  
	// Mock response from the backend
	const botResponse = `You said: ${message}`;
	console.log(message);
	res.json({ reply: botResponse });
  });

module.exports = router;  