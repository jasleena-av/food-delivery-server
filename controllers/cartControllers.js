const cartitems =require('../models/cartSchema')


// add to cart
exports.addtocart =async (req,res)=>{
    // get product details from req
    const {id,title,image,price,quantity} =req.body

    // logic
    try{
        // check product is in cart collection
        const product =await cartitems.findOne({id})


        if(product){
            // product is in cart
            // increment product quantity
            product.quantity+=1
            // update grandtotal
            product.grandTotal =product.price *product.quantity
            // to save change in mongodb
            product.save()
            // send response to client
            res.status(200).json('Items added to your cart')
        }
        else{
            // product is not in cart
            // add product to cart
            const newProduct =new cartitems({
                id,title,price,image,quantity,grandTotal:price
            })
            // save
            await newProduct.save()
            res.status(200).json('item added to your cart')




        }


    }
    catch(error){
        res.status(401).json(error)

    }

}

// get cart
exports.getCart =async(req,res)=>{
    try{
        // get all items from cart
    const allItems =await cartitems.find()
    res.status(200).json(allItems)
    }
    catch(error){
        res.status(401).json(error)

    }

}

// remove cartitem
exports.removecartItem =async (req,res)=>{
    // get product id from request
    const{id}=req.params

    try{
        // remove product with given id from cartcollection
        const removeitem =await cartitems.deleteOne({id})
        if(removeitem){
            // get all wishlist item after removing the particular item
            const allItems =await cartitems.find()
            res.status(200).json(allItems)

        }
        else{
            res.status(404).json("item not present in your wishlist")
        }

    }
    catch(error){
        res.status(401).json(error)

    }

}

// emptycart
exports.emptycart =async (req,res)=>{
    try{
        await cartitems.deleteMany({})
        res.status(200).json("your cart is empty now!!!")

    }
    catch(error){
        res.status(401).json(error)

    }
}

// increment quantity
exports.incrementCount =async (req,res)=>{
    // get product id from  req
    const{id} =req.params
    try{
        // check product is in collection
        const product =await cartitems.findOne({id})
        if(product){
            // update quantity,grandtotal
            product.quantity+=1
            product.grandTotal =product.price*product.quantity

            await product.save()
            // get all cart collection after update the particular item count
            const allItems =await cartitems.find()
            res.status(200).json(allItems)
        }
        else{
            res.status(404).json("product is not in your cart....")
        }

    }
    catch(error){
        res.status(401).json(error)

    }
}

// decrement
exports.decrementCount =async (req,res)=>{
    // get product id from  req
    const{id} =req.params
    try{
        // check product is in collection
        const product =await cartitems.findOne({id})
        if(product){
            // update quantity,grandtotal
            product.quantity-=1
            // check quantity is zero
            if(product.quantity==0){
                await cartitems.deleteOne({id})

                const  allItems =await cartitems.find()
                res.status(200).json(allItems)
            }
            else{
                product.grandTotal =product.price*product.quantity

                await product.save()
                // get all cart collection after update the particular item count
                const allItems =await cartitems.find()
                 res.status(200).json(allItems)

            }
            
        }
        else{
            res.status(404).json("product is not in your cart....")
        }

    }
    catch(error){
        res.status(401).json(error)

    }
}

