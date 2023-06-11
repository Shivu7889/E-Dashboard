const express = require('express');
require('./db/config');
const cors = require("cors");
const User = require("./db/User");
const Product = require('./db/Product');
const app = express();
const Jwt = require('jsonwebtoken');
const Jwtkey = "e-comm";
app.use(express.json());
app.use(cors());

app.post("/register",async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},Jwtkey,{expiresIn:"2h"},(err,token)=>{
      if(err){
        res.status(404).send('Something went wrong , Please try again');
      }
      res.send({result,auth:token});
  })
})

app.post('/login',async (req , res)=>{
    if(req.body.password && req.body.email){


    let user = await User.findOne(req.body).select('-password');
    if(user)
    {
      Jwt.sign({user},Jwtkey,{expiresIn:"2h"},(err,token)=>{
          if(err){
            res.status(404).send('Something went wrong , Please try again');
          }
          res.send({user,auth:token});
      })
       
    }
  else {
    res.status(404).send('User not found');
  }
}
else {
    res.status(404).send('User not found');
  }
})

app.post('/add-product' , verifyToken,async (req,res) =>{
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})

app.get('/products' , verifyToken,async (req,res)=>{
  let products = await Product.find();
  if(products.length>0){
  res.send(products);
  }
  else{
    res.status(404).send('No product found');
  }
})

app.delete('/product/:id',verifyToken,async (req,res)=>{
  const result = await Product.deleteOne({_id:req.params.id});
  res.send(result); 
});

app.get('/product/:id',verifyToken, async(req , res)=>{
  let result = await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }
  else{
    res.status(404).send('No product found');
  }
})

app.put('/product/:id',verifyToken, async (req,res)=>{
  let result = await Product.updateOne(
    {_id:req.params.id},
    {
      $set:req.body
    }
    )
    res.send(result); 
})

app.get("/search/:key" , verifyToken,async (req , res)=>{
  let result = await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {price:{$regex:req.params.key}}
    ]
  });
  res.send(result);
})

function verifyToken(req,res,next){
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    Jwt.verify(token,Jwtkey,(err,valid)=>{
      if(err){
        res.send({result:"Please provide valid token"})
      }
      else{
        next();
      }
    })
  } else{
    res.send({result:"Please add token with header"})
  }

}

app.listen(5000)