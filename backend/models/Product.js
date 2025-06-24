const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true,
        min : 0
    },
    category: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    stock: {
        type : Number,
        required : true,
        min : 0
    },
    imageURLs: {
        type : String,
        required : true
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
},
{
    timestamps: true,
}
);
module.exports = mongoose.model("Product", productSchema);