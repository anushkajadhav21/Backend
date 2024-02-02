const productModel = require("./productModel");
const mongoose = require('mongoose')

exports.getProduct = (req, res, next) => {
    productModel.find({})
    .select("name price _id")
    .exec()
    .then(result => {
        const response ={
            count: result.length,
            product: result.map(result => {
                return{
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request:{
                        type:"GET",
                        url: "http://localhost:3000/product/"+result._id
                    }
                };

            })
        };
        res.status(200).json(response)
    })
   .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};

exports.addProduct = (req, res, next) => {
    const product = new productModel({
        _id:  new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price
    });
    product
    .save()
    .then(doc => {
        console.log(doc);
        res.status(201).json({
        msg: 'Created product successfully...',
        createdProduct: {
            name: doc.name,
            price:doc.price,
            _id:doc._id,
            request:{
                type:'GET',
                url: "http://localhost:3000/product" +doc._id
            }
        } //product
      });             
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });                                                                           
};

exports.productId = (req, res, next) =>{
    const id = req.params.id;
    productModel.findById(id)
    .select('name price _id')
    .exec()
    .then(result => {
        console.log("From database",result);
        if(result){
        res.status(200).json({
            product: result,
            request:{
                type: 'GET',
                description: 'Get all products',
                url: "http://localhost:3000/product" 
            }
        });
        }else{
        res.status(404).json({msg: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

exports.deleteProduct = (req, res, next) =>{
    const id = req.params.id;
    productModel.findByIdAndDelete({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            msg: 'Product Deleted',
            request: {
                type:'POST',
                url: "http://localhost:3000/product",
                body: { name:'String', price: 'Number'}
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.updateProduct = (req, res, next) => {
   productModel.findByIdAndUpdate(req.params.id,
    {
    "name":req.body.name,
    "price":req.body.price
   }).then((result)=>{
    res.status(200).json(result);
    console.log("Updated Successfully...");
   }).catch(err => {
    res.status(404).json({
        error:err
    });
   });                                                                                   
};