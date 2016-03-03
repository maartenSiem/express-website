/**
 * Created by Maarten on 14-12-2015.
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res){
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'maartensiem@gmail.com',
            pass: 'F100ntj3'
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Maarten Siem <maartensiem@gmail.com', // sender address
        to: 'maarten_siem@hotmail.com',  // list of receivers
        subject: 'Submission on Website', // Subject line
        text: 'You submitted a post on our website. Name: '+ req.body.name + 'Email: '+ req.body.email + 'Message: '+ req.body.message, // plaintext body
        html: '<p>You submitted a post on our website.</p><ul><li> Name: '+ req.body.name + '</li><li>Email: '+ req.body.email + '</li><li>Message: '+ req.body.message +'</li></ul>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.redirect('/');
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.redirect('/');
    });
});

module.exports = router;