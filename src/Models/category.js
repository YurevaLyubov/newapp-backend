const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryScheme = new Schema({
  name : { type : String , required : true },
}, {versionKey: false});

const productScheme = new Schema({
  category : { type: Schema.Types.ObjectId, ref: 'Category'},
  name : { type : String },
  price : { type : String },
  discountPrice : { type : String },
  imagePath: { type : String },
}, {versionKey: false});

module.exports.category = mongoose.model("Category", categoryScheme);
module.exports.product = mongoose.model("Product", productScheme);