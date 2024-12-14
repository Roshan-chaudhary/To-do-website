// models/Item.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  des: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const userModel = mongoose.model('blogs', userSchema);

module.exports = userModel

console.log(" Api Connected");