const userModel =require( "../models/blogs.js");
const path = require("path");
require("dotenv").config()



exports.createUser = async (req, res) => {
    const { title, des } = req.body
    
   
  
    try {
      // Set active to false if not provided in the request body const isActive = typeof active !== 'undefined' ? active : false;
  
      if (title && des ) {
        const newUser = new userModel({
          title,
          des,
    // Set to the value of isActive
        })
  
        const new_user = await newUser.save();
        if (new_user) {
          return res.status(200).json(new_user);
        } else {
          return res.status(400).json({ message: "Failed to create user" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  


    exports.getAllUser = async (req, res) => {

      try {
        const allUsers=await userModel.find({  active: true });
        if(allUsers){
          return res.status(200).json(allUsers)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }



    exports.getAllUserapi = async (req, res) => {

      try {
        const allUsers=await userModel.find();
        if(allUsers){
          return res.status(200).json(allUsers)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }



    exports.getUserById = async (req, res) => {
      const { id } = req.params;
      try {
          const user = await userModel.findById(id);
          if (user) {
              return res.status(200).json(user);
          } else {
              return res.status(404).json({ message: "User not found" });
          }
      } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }
  
  
  exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { title, des, active } = req.body;

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

    

        user.title = title || user.title;
        user.des = des || user.des;
        
        // Set active to true if not provided in the request body
        user.active = active !== undefined ? active : true;

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

  
  exports.deleteUserById = async (req, res) => {
      const { id } = req.params;
      try {
          const deletedUser = await userModel.findByIdAndDelete(id)
          if (!deletedUser) {
              return res.status(404).json({ message: "User not found" })
          }
          return res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }
