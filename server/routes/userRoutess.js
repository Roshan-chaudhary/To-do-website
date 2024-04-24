const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/blogs.js');
const userModel =require( "../models/blogs");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null,`public/upload/`);     // For Direct Image in Upload remove uploads/
    },
    filename: (req, file, cb) => {
      cb(null,file.originalname);     // Uploaded path
    },
  });
  
  const upload = multer({ storage });
  


router.post("/users",upload.single("image"),userController.createUser)
router.get("/users",userController.getAllUser);
router.get("/usersapi",userController.getAllUserapi);
router.get("/users/:id", userController.getUserById);
router.put("/users/update/:id", upload.single("image"), userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);


module.exports=router;

