const mongoose =require("mongoose");


const productSchema =  new mongoose.Schema({
    name: String,
    price: Number,
    color: String,
    category:{type: mongoose.Schema.Types.ObjectId, ref:'Category'},
    description: String,
    stock:Number
})

module.exports = mongoose.model("Product", productSchema)