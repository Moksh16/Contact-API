const mongoose= require("mongoose")

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Userid"
    },
    name: {
        type: String,
        required : [true, "Please add your name"]
    },
    email: {
        type: String,
        required: [true, "please add your email"]
    },
    phone:{
        type: String,
        required : [true, "Please add your contact number"]
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Contact",contactSchema)