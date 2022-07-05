// const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser =require('body-parser')
const app= new express()
// const cors = require('cors')
const {wishdata} = require ('./src/model.js/model')




// db connection
//mongodb password: SmcrOgAD6iNQAImJ
const mongoose = require('mongoose')
const req = require('express/lib/request')
const db = 'mongodb+srv://Vin_challenge:SmcrOgAD6iNQAImJ@cluster0.dfdbqrn.mongodb.net/?retryWrites=true&w=majority'
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

// greetings({

// })
// const req = require('express/lib/request');
const nodemailer = require("nodemailer")
function sendmail(){

}

    var to = req.body.Email
    // var subject = "http://localhost:3000/greetings/<%=data._id%>"
    const mailTransporter = nodemailer.createTransport({
        port:465,
        service : "gmail",
        secure:true,
        auth : {
          user:  "vinesh161099@gmail.com",
          pass: "aqoenwrlpdxpxrry"}
    
    })
    var mailOptions = {
    
        from : "vinesh161099@gmail.com",
        to   :"vineshmm26@gmail.com",
        subject :'hellooooo',
        text:"he he he ready aaayi"
    
    }
    mailTransporter.sendMail(mailOptions,function(err,info){
        if (err){
            console.log(err);
        }else{
            console.log("Email Sent :" + info.response);
        }
    })

     

    








app.listen(process.env.PORT || 3000)