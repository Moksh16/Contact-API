const asyncHandler = require("express-async-handler")
const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const registerUser = asyncHandler (async (req,res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }


    const user_available = await Users.findOne({email});
    if (user_available)
    {
        res.status(400)
        throw new Error("User already registered")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await Users.create({
        username,
        email,
        password:hashedPassword
    })

    console.log("User created: ", newUser)
    res.status(201).json({_id:newUser.id, email:newUser.email})
});

const loginUser =  asyncHandler (async (req,res) => {
    const {email,password} = req.body;
    const user = await Users.findOne({email});
    if (!user)
    {
        res.status(404)
        throw new Error("User with this email does not exist")
    }
    if (user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"}
    )
    res.status(200).json({accessToken: accessToken})
    } else{
        res.status(400)
        throw new Error("Password is invalid")
    }
})

const currentUser = asyncHandler ( async (req,res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}

