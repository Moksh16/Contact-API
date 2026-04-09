const express = require("express")
const router = express.Router()
const {
    getContact,newContact,getContactbyId,updateContact,deleteContact
} = require("../controller/contactController")
const validateToken = require("../middleware/validateTokenHandler")


router.use(validateToken)
router.route("/").get(getContact).post(newContact)

router.route("/:id").put(updateContact).get(getContactbyId).delete(deleteContact)

module.exports = router