// const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser =require('body-parser')
const app= new express()
// const cors = require('cors')
const {wishdata} = require ('./src/model.js/model')
const nodemailer = require("nodemailer")
// db connection
//mongodb password: aNoo2poRxFRQ2HzQ
const mongoose = require('mongoose')
const req = require('express/lib/request')
const { response } = require('express')
const db = 'mongodb+srv://Vin_challenge:aNoo2poRxFRQ2HzQ@cluster0.dfdbqrn.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db,{
    useNewUrlParser : true

})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))
app.set('views','./src/views'); 
app.set('view engine','ejs'); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


// route sendmail page
app.get('/',(req,res)=>{
    res.render('landing')

})
// route to add user data
app.post('/sendmail',(req,res)=>{
    console.log(req.body.Email);
    data={
          Name : req.body.Name,
          FName: req.body.FName,
          Email : req.body.Email

    }
    console.log(data);
    var data =new wishdata(data);
    console.log(data);
    data.save((err,result)=>{
        console.log(result);

        if(err){
            console.log(err);

        }
        else{
            res.render('sendmail',{data})
        }
    });
})
app.get('/greetings/:id',(req,res)=>{

    var id = req.params.id;
    wishdata.findOne({_id:id})
    .then(function(data){
        res.render('greetings',{data})

    })

})

// nodemailer
app.get('/submit/:id',(req,res)=>{
  var id = req.params.id
wishdata.findOne({_id:id})
.then((user1)=>{
    console.log(user1);

  var transporter = nodemailer.createTransport({

    service : "hotmail",
    auth :{
        user : 'wishesforu123@outlook.com',
        pass:"Vinwish@123"
    }
  });
  var mailOptions = {
    from: "wishesforu123@outlook.com",
    to : user1.Email,
    subject : ' Happy NewYear'+ user1.FName,
    text:'send You a Gift ' + user1.Name +' Click on this link http://localhost:3000/greetings/<%=data._id%>'
  }
  transporter.sendMail(mailOptions, function(err,info){
    if (err){
        console.log(err)
    }else {
        alert('Email Sent')
        console.log("Email sent:" + info.response)
    }
    response.redirect("/sendmail")
  })
})
})



    








app.listen(process.env.PORT || 3000)