const mongoose= require('mongoose');
const dotenv =require('dotenv');
require('dotenv').config();


try {
    mongoose.connect(process.env.URL);
    console.log('Mongodb Connected Sucessfully');
} catch (error) {
    console.log("Error is "+""+error);
    
}

module.exports=mongoose;