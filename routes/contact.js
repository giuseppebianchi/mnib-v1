var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");





/* GET home page. */
router.post('/send', function(req, res, next) {
  var transporter = nodemailer.createTransport()

  var options = {
    from: 'message@bianchii.com',
    to: 'gppbianchi@gmail.com',
    subject: 'New message on bianchii.com',
    text: 'you have a neew message; name = ' + req.body.name + '; email = ' + req.body.email + '; message = ' + req.body.message,
    html: '<p>you have a neew message</p><h1>name = ' + req.body.name + '</h1><h2> email = ' + req.body.email + '</h2><h3> message = ' + req.body.message + '</h3>'
  } 

  transporter.sendMail(options, function(error, info){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log('Message sent by ' + req.body.email)
      res.end("sent");
    }
  })
});
module.exports = router;
