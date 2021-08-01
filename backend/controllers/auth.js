const {User} = require('../models/user');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const {OAuth2Client} = require('google-auth-library');

// Enter your google client id here
const client = new OAuth2Client({GOOGLE_CLIENT_ID});

exports.googlelogin = (req,res) => {
    const {tokenId} = req.body;
 // Enter your google client id here
    client.verifyIdToken({idToken : tokenId, audience: {{GOOGLE_CLIENT_ID}}}).then(response =>{
        const {email_verified, name, email} = response.payload;
        if(email_verified){
            User.findOne({email}).exec((err, user)=>{
                if(err){
                    return res.status(400).json({
                        error : "Something went wrong ..."
                    })
                } else{
                    if(user){
                        const token = jwt.sign({_id : user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn:'7d'});
                        const {_id, name, email} = user;
                        res.json({
                            token,
                            user: {_id, name, email}
                        })
                    }else{
                        let password = email + process.env.JWT_SIGNIN_KEY;
                        let newUser = new User({name, email, password});

                        newUser.save((err, data)=>{
                            if(err){
                                return res.status(400).json({
                                    error: "Something went wrong..."
                                })
                            }
                            const token = jwt.sign({_id : data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn:'7d'});
                            const {_id, name, email} = newUser;

                            res.json({
                            token,
                            user: {_id, name, email}
                        })
                        })
                    }
                }
            })
        }
        console.log(response.payload);
    })
    console.log();
}