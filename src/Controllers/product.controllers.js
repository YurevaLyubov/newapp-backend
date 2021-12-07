const schemes = require('../Models/category');
const Product = schemes.product;
const fs = require('fs');

const newProduct = function(req, res) {
  if(!req.body) return res.sendStatus(400);

  const nameProduct = req.body.name;
  const priceProduct = req.body.price;
  const discountPriceProduct =req.body.discountPrice;
  const id = req.body.id;

  const product = new Product({
    category: id,
    name: nameProduct,
    price: priceProduct,
    discountPrice: discountPriceProduct,
    imagePath: req.file && req.file.filename ?  '/images/' + req.file.filename : '',
  });

  product.save(function(err, prod) {
    if(err) return res.status(400).send('Something broke!');
      res.send(prod);
    });  
};


const allProduct = function(req, res) {
  const { id } = req.params;
  Product.find({ category: id }, function(err, prod){
    if(err) return res.status(400).send('Something broke!');
    res.send(prod);  
  });
};


const deleteProduct = function(req, res) {
  const id = req.body._id;
  Product.deleteOne({_id: id}, function(err, prod){
    if(err) return res.status(400).send('Something broke!');
    res.send(prod);
  });
};


const changeProduct = function(req, res) {
  if(!req.body) return res.sendStatus(400);

  const id = req.body._id;
  const categoryProduct = req.body.category;
  const nameProduct = req.body.name;
  const priceProduct = req.body.price;
  const discountPriceProduct = req.body.discountPrice;
  const imagePathProduct = req.body.imagePath;
  const filePath = '/home/user/lyuba/serverExpress' + req.body.imagePath;
  
  const newProduct = {
    category: categoryProduct,
    name: nameProduct,
    price: priceProduct,
    discountPrice: discountPriceProduct,
    imagePath: req.file && req.file.filename ?  '/images/' + req.file.filename : imagePathProduct,
  };

 if (req.file) {
   fs.unlink(filePath,function(err){
     if(err) return console.log(err);
   });
 }

  Product.findOneAndUpdate({_id: id}, newProduct, {new: true}, function(err, prod){
    if(err) return res.status(400).send('Something broke!');
    res.send(prod);
  });
};

module.exports = {
  newProduct,
  allProduct,
  deleteProduct,
  changeProduct,
};