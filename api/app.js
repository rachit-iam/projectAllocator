var http = require('http');
const express=require('express');
const app=express();
require ('dotenv').config()
var cors                = require('cors');
const bodyParser        = require("body-parser");
const cookieParser      = require("cookie-parser");
const expressValidators = require("express-validator");
const facultyRoutes     = require("./routes/facultyRoutes");
const projectRoutes     = require("./routes/projectRoutes");
const studentRoutes     = require("./routes/studentRoutes");
const workRoutes        = require("./routes/workRoutes");
const userRoutes        = require("./routes/userRoutes");

// middilewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//app.use(expressValidators());

// Routes
app.use("/api", facultyRoutes);
app.use("/api", projectRoutes);
app.use("/api", studentRoutes);
app.use("/api", workRoutes);
app.use("/api", userRoutes);

const port=process.env.PORT || 8000

app.listen(port,()=>{
console.log(`Server is running on port ${port}`);
});
