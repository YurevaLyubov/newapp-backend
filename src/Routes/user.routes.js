const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });
const authenticateToken = require('../Middleware/checkAuth.middleware');
const authControllers = require('../Controllers/auth.controllers');
const userControllers = require('../Controllers/user.controllers');
const menuControllers = require('../Controllers/menu.controllers');
const productControllers = require('../Controllers/product.controllers');
const allUsersControllers = require('../Controllers/allUsers.controllers');

const router = express.Router();

router.post('/auth', authControllers.auth);
router.post('/login', authControllers.login);
router.get('/me', authenticateToken, userControllers.me);
router.put('/changeUsers', authenticateToken, userControllers.changeUsers);
router.put('/changePassword', authenticateToken, userControllers.changePassword);

router.get('/allCategory', authenticateToken, menuControllers.allCategory);
router.post('/newCategory', authenticateToken, menuControllers.newCategory);
router.put('/changeNameCategory', authenticateToken, menuControllers.changeNameCategory);
router.delete('/deleteCategory', authenticateToken, menuControllers.deleteCategory);

router.post(
    '/newProduct',
    upload.single('image'),
    authenticateToken,
    productControllers.newProduct,
);
router.get('/allProduct/:id', authenticateToken, productControllers.allProduct);
router.put(
    '/changeProduct',
    upload.single('image'),
    authenticateToken,
    productControllers.changeProduct,
);
router.delete('/deleteProduct', authenticateToken, productControllers.deleteProduct);

router.get('/allUsers', authenticateToken, allUsersControllers.allUsers);
router.post('/newUser', authenticateToken, allUsersControllers.newUser);
router.delete('/deleteUser', authenticateToken, allUsersControllers.deleteUser);
router.put('/changeUser', authenticateToken, allUsersControllers.changeUser);

module.exports = router;
