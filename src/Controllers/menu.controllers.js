const schemes = require('../Models/category');

const Category = schemes.category;
const Product = schemes.product;

const allCategory = function (req, res) {
    Category.find({}, function (err, categ) {
        if (err) return res.status(400).send('Something broke!');
        res.send(categ);
    });
};

const newCategory = function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const nameCategory = req.body.name;
    const category = new Category({
        name: nameCategory,
    });

    category.save(function (err, categ) {
        if (err) return res.status(400).send('Something broke!');
        res.send(categ);
    });
};

const changeNameCategory = function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = req.body._id;
    const categoryName = req.body.name;
    const newCategory = { name: categoryName };

    Category.findOneAndUpdate({ _id: id }, newCategory, { new: true }, function (err, categ) {
        if (err) return res.status(400).send('Something broke!');
        res.send(categ);
    });
};

const deleteCategory = function (req, res) {
    const id = req.body._id;

    Category.deleteOne({ _id: id }, function (err) {
        if (err) return res.status(400).send('Something broke!');

        Product.deleteMany({ category: id }, function (err, prod) {
            if (err) return res.status(400).send('Something broke!');
            res.send(prod);
        });
    });
};

module.exports = {
    allCategory,
    newCategory,
    changeNameCategory,
    deleteCategory,
};
