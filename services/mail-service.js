var nodemailer = require("nodemailer");
var mailgun = require("mailgun.js");

var MAILGUN_API_KEY = "key-86dddc7036481ddbbf0083e9e52aaa37";
var MAILGUN_DOMAIN = "portal.srjca.com"

var _service = {};

_service.init = function(){

    var mg = mailgun.client({
        username: 'api',
        key: MAILGUN_API_KEY
    })

    // var transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true, // use SSL
    //     auth: {
    //         user: 'sameid.usmani@gmail.com',
    //         pass: 'Samon89svsip'
    //     }
    // });
    // _service.mailer = transporter;

    _service.mg = mg;
};

var service = {};

service.sendMail = function(mailOptions){
    return new Promise(function (resolve, reject){
        _service.mg.messages.create(MAILGUN_DOMAIN, mailOptions)
        .then(function(msg){
            console.log(msg);
            resolve(msg);
        })
        .catch(function(err){
            console.log(err);
            reject(err);
        });
    });

    // return new Promise(function(resolve, reject){
    //     _service.mailer.sendMail(mailOptions, function(err, info){
    //         if (err) reject(err);
    //         else resolve(info.response);
    //     });
    // });
};

function constructService(){
    _service.init();
    return service;
}

module.exports = constructService();
