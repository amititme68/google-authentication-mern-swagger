const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

// user schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        max: 32
    },
    email: {
        type : String,
        trim : true,
        required : true,
        unique: true,
        lowercase: true,
    },
    password: {
        type : String,
        required : true,
    },
},{timestamps: true})

const User = mongoose.model("User", userSchema);


exports.User = User;
exports.userSchema = userSchema;