require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Roshan = require('./config/db');

const userRoutess= require('./routes/userRoutess')

// database connection

// middlewares
app.use(express.json());
app.use( express.static("public/upload"));

app.use(
    cors({
       origin: ["http://192.168.1.8:3000/"],
       methods: ["GET", "POST","PUT","DELETE"],
       credentials: true,
     })
   );


// routes
app.use('/', userRoutess);
// Port 
try {
    app.listen(process.env.PORT);
    console.log("Code Run Sucessfully")
} catch (error) {
    console.log(""+""+error)
    
}
