const items = require('../models/productSchema')


// get all products api
exports.getallproducts = async (req,res)=>{
    // logic
    try{
        // get all products from products collection in mongodb
    const allProducts =await items.find()
    res.status(200).json(allProducts)

    }
    catch(error){
        res.status(401).json(error)

    }
    
}

// view product api
exports.viewproduct = async (req,res)=>{
    const id =req.params.id

    try{
        const product=await items.findOne({id})
        if(product){
            // send to client
            res.status(200).json(product)

        }
        else{
            res.status(404).json("Product not found!!!")
        }

    }
    catch(error){
        res.status(401).json(error)

    }

}