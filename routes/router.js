

const express =require('express')

// import product controller
const productController =require('../controllers/productControllers')
const cartController =require('../controllers/cartControllers')
const userController =require('../controllers/userContoller')
// const loginController =require('../controllers/loginController')



const router =new express.Router()



router.post('/products/register',userController.signup)

// router.post('/products/login',loginController.login)


// get-all products
router.get('/products/all-products',productController.getallproducts)

// / view-products/id
router.get('/products/view-product/:id',productController.viewproduct)

router.post('/cart/add-item',cartController.addtocart)

router.get('/cart/get-item',cartController.getCart)

// remove-cart-item
router.delete('/cart/remove-item/:id',cartController.removecartItem)

// empty cart
router.delete('/cart/remove-all-item',cartController.emptycart)

// incrementquantity
router.get('/cart/increment-item/:id',cartController.incrementCount)

// decrementquantity
router.get('/cart/decrement-item/:id',cartController.decrementCount)



module.exports = router
