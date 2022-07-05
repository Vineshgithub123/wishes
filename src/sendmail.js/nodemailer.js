// const req = require('express/lib/request');
const nodemailer = require("nodemailer")

// function sendmail(){
//     var to = req.body.Email
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

     

    