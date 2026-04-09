//@desc get all contacts
//@route get/api/contact
const asyncHandler = require("express-async-handler")
const contact = require("../models/contactModel")

const getContact = asyncHandler(async (req,res) => {
    const Contacts = await contact.find({user_id:req.user.id})
    res.status(200).json(Contacts)
})

const newContact = asyncHandler(async (req,res) => {
    console.log("The the request body is: ", req.body);
    const {name,phone,email} = req.body
    if (!name || !phone || !email) {
        res.status(400);
        throw new Error("all fields are necessary")
    }
      const existingContact = await contact.findOne({
        $or: [
            { email: email },
            { phone: phone }
        ]
    });

    if (existingContact) {
        res.status(400);
        throw new Error("Contact already exists with this email or phone number");
    }
    const created_contact = await contact.create({
        name,
        phone,
        email,
        user_id:req.user.id
    })
    console.log("message received is: ", req.body)
    res.status(200).json(created_contact)
})

const updateContact = asyncHandler(async (req,res) =>{
    const contact_by_id = await contact.findById(req.params.id);
     if (contact_by_id.user_id.toString() !== req.user.id)
    {
        res.status(403)
        throw new Error("The user doesn't have permission to update other user contacts")
    }
    const updatedContact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
})

const getContactbyId = asyncHandler(async (req,res)=>{
    const contact_by_id = await contact.findById(req.params.id)
    if (!contact_by_id)
    {
        res.status(404);
        throw new Error("Contact not found")
    }

   

    res.status(200).json(contact_by_id)
})

const deleteContact = asyncHandler(async (req,res)=>{
    const contact_id = await contact.findById(req.params.id);
    if (!contact_id)
    {
        res.status(400);
        throw new Error("Contact not found")
    }
    await contact.deleteOne(contact_id);
    res.status(200).json(contact_id)
})

module.exports = {getContact, newContact, updateContact, getContactbyId, deleteContact}