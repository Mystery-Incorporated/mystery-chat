require('dotenv').config()

var Users = require("../models/User");
const withAuth = require('./middleware');
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET);
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var cookie = require('cookie');

function encode(email) {
    if (!email) return "";
    return cryptr.encrypt(email);
}

function decode(email) {
    if (!email) return "";
    return cryptr.decrypt(email);
}

function createSession(req, res, data) {
    var payload = {
        // hashedID: encode(identifier),
        hashedID: encode(data.username),
        emailHash: encode(data.email),
        // hashedPlayerNickName: encode(data.playerNickName),
        // hashedVerified: encode(data.verified),
        // hashedPassword: data.isGuest ? encode(data.password) : null
    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: 60*60*100
    });
    
    findByUsername(data.username, function(err, data) {

        return res.cookie('token', token, { httpOnly: true }).status(200).json({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            avatar: data.avatar,
            verified: data.verified,
            avatarType:data.avatarType
        });        
    });
}

function killSession(req, res) {
    return res.clearCookie("token").status(200).json({success:true});;
}

function login(err, data, password, req, res) {
    if (!err && data) {
        var user = {
            username: data.username,
            email: data.email,
            // playerNickName: data.playerNickName,
            // verified: data.verified
        };
        if (verifyPass(data, password)) return createSession(req, res, user);
        else res.status(400).json({ error: 0, msg: "Incorrect Password" });
    } 
    else return res.status(400).json({ error: 1, msg: "Email does not exists" });
}


function verifyPass(data, password) {
    if (!data || !password) return false;
    return bcrypt.compareSync(password, data.password);;
}

function findByEmail(email, callback) {
    Users.findOne({email: email}, callback);
}

function findByUsername(tag, callback) {
    Users.findOne({username: tag}, callback);
}

function getAll(callback) {
    Users.find({}, callback);
}

function verifyEmail(email, callback) {
    Users.findOne({email: email}, (err, data) => {
        if (err | data) {
            callback(null, {msg: "Email not found!"});
        }
        else {
            if (data.verified){
                callback(null, {msg: "Email already verified!"});
            }
            else {
                Users.updateOne({ email: email }, { $set: { verified: true } }, callback);
            }
        }
    });
    
}

function generateVerificationToken(email) {
    var date = new Date();
    var toEncode = "verification/"+email+"/"+date;
    return Buffer(toEncode, 'ascii').toString('base64');
}

function verificationTokenValid(email, token) {
    if (!token) return false;

    var data = Buffer(token, 'base64').toString('ascii').split("/");
    if (data.length != 3) {
        return false;
    }
    else {
        return (email === data[1] && Math.ceil((new Date() - new Date(data[2])) / (1000*60*60)) <= 72);
    }
}

function sendEmail(email, token, req, res) {
    var transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: process.env.MAIL_USER, 
            pass: process.env.MAIL_PASS 
        } 
    });

    var mailOptions = { 
        from: 'no-reply@shgang.com', 
        to: email, 
        subject: 'Account Verification Token', 
        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/verify\/?token=' + token + '\n\nBest,\nMystery Inc\n' 
    };

    transporter.sendMail(mailOptions, function (err) {
        if (err) { console.log(err); }
    });
}

function createUser(data, callback) {
    var salt = bcrypt.genSaltSync(15);
    var pass = bcrypt.hashSync(data.password, salt);
    var user = {
        email: data.email,
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        dob: data.dob,
        password: pass
    };
    Users.create(user, callback);
}

function updateUserInfo(email, formData, callback) {
    findByEmail(email, (err, data) => {
        if (data) {
            var user = formData;
            if (formData.password) {
                if (formData.password){
                    var salt = bcrypt.genSaltSync(15);
                    var pass = bcrypt.hashSync(formData.password, salt);
                    user.password = pass;
                }
            }

            Users.updateOne({ email: email }, { $set: user }, callback);
        }
    })

    
}

module.exports = function(app) {
    app.post('/api/signup', (req, res) => {
        var formData = req.body;
        if (!formData.email || !formData.username || !formData.password || !formData.firstname || !formData.lastname || !formData.dob) {
            return res.status(400).json({ error: 1, msg: "Missing fields." });
        }
        else {
            findByEmail(formData.email, (err, data) => {
                if (err || !data) {
                    // email doesn't exist we are good
                    findByUsername(formData.username, (err, data) => {
                        if (err || !data) {
                            // tag doesn't exist we are good
                            createUser(formData, (err, data) => {
                                if (err) {
                                    var errType = err.name;
                                    if (errType === 'ValidationError') {
                                        // go through each error ( there will only be one but still)
                                        var msg = ""
                                        var validationErrors = err.errors;
                                        for (var error in validationErrors) {
                                            if (validationErrors[error].kind === 'minlength') {
                                                msg += 'Username needs to be atleast 4 characters long. '
                                            } else {
                                                msg += 'Username cannot contain any special symbols other than _ or -. '
                                            }
                                        }
                                        return res.status(400).json({error: err, msg:msg});
                                    } else {
                                        return res.status(400).json({error: err, msg:"Failed to create user."});
                                    }
                                } else {
                                    var userData = {
                                        username: data.username,
                                        email: data.email
                                    }
                                    return createSession(req, res, userData);
                                }
                            });
                        } 
                        else {
                            return res.status(400).json({ error: 1, msg: "Username exists" });
                        }
                    });
                } 
                else {
                    return res.status(400).json({ error: 1, msg: "Email exists" });
                }
                
            });
        }
        
    });


    app.post('/api/signout', (req, res) => {
        // delete player associated with this user
        return killSession(req, res);
    });

    app.post('/api/signin', (req, res) => {
        const formData = req.body;
        if (!formData.email || !formData.password) {
            return res.status(400).json({ error: 1, msg: "Missing fields." });
        }
        else {
            findByEmail(formData.email, (err, data) => {
                return login(err, data, formData.password, req, res);
            });
        }
    });

    app.get('/api/checkToken', withAuth, function(req, res) {
        var cookies = cookie.parse(req.headers.cookie);
        var token = cookies.token;
        var decoded = jwt.verify(token, process.env.SECRET);

        var payload = {
            identifier: decode(decoded.hashedID),
            emailHash: decode(decoded.email),
            // playerName: decode(decoded.hashedPlayerName),
            // playerNickName: decode(decoded.hashedPlayerNickName),
            // verified: decode(decoded.hashedVerfied),
        }   

        findByUsername(payload.identifier, function(err, data) {

            return res.status(200).json({
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                avatar: data.avatar,
                verified: data.verified,
                avatarType:data.avatarType,
                following: data.following
            });
            
        });
        
    });

    app.get('/api/users/:user', function(req, res) {
        var user = req.params.user;
        findByUsername(user, (err, data) => {
            if (err || !data) {
                return res.status(404).json({ error: 1, msg: "Could not find user!" });
            }
            else {

                var result = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    avatar: data.avatar,
                    verified: data.verified,
                    dob:data.dob,
                    bio:data.bio,
                    avatarType:data.avatarType,
                    sent:data.sent
                };
                return res.status(200).json(data);
            }
        });
    });

    app.post('/api/users/update', withAuth, function(req, res) {

        var cookies = cookie.parse(req.headers.cookie);
        var token = cookies.token;
        var decoded = jwt.verify(token, process.env.SECRET);
        var email = decode(decoded.emailHash);
        var id = decode(decoded.hashedID);

        var formData = req.body;

        console.log(formData, id, email)
        if (formData.submitFor && formData.submitFor == id) {

            updateUserInfo(email, formData, (err, data) => {
                if (err || !data) {
                    console.log(err, data)
                    return res.status(500).json({ error: 1, msg: "Could not update user!" });
                }
                else {
                    return res.status(200).json({data: "success"});
                }
            });
        }
        else {
            return res.status(401).json({ error: 1, msg: "Unauthorized!" });
        }

        
    });

    app.post('/api/sendVerification', (req, res) => {
        var cookies = cookie.parse(req.headers.cookie);
        var token = cookies.token;
        var decoded = jwt.verify(token, process.env.SECRET);
        var email = decode(decoded.emailHash);

        sendEmail(email, generateVerificationToken(email), req, res);

        return res.status(200).json({ msg: 'success' });
    });

    app.post('/api/verifyEmail/:token', (req, res) => {

        if (!req.params.token) return res.status(400).json({ error: 1, msg: "Token expired or Invalid token!" });

        var data = Buffer(req.params.token, 'base64').toString('ascii').split("/");

        if (verificationTokenValid(data[1], req.params.token)) {
            verifyEmail(data[1], (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 1, msg: "Could not verify email!" });
                }
                else {
                    return res.status(200).json({ msg: data.msg }); 
                }
            });
        }
        else {

            return res.status(400).json({ error: 1, msg: "Token expired or Invalid token!" });
        }
    });

};