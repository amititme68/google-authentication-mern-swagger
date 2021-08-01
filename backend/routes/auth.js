const express = require('express');
const router = express.Router();

// Import Controller
const { googlelogin } = require("../controllers/auth");


router.post('/googlelogin', googlelogin);
router.get('/success',(req,res)=>{
    res.send(`<h1>You have logged in successfully </h1>`);
});

module.exports = router;    