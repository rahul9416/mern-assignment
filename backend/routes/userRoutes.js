const {register, allUsers, updateUser, deleteUser} = require("../controllers/userController")

const router = require("express").Router();

router.post("/register", register)
router.post("/updateUser", updateUser)
router.post("/deleteUser", deleteUser)
router.get("/allUsers", allUsers)

module.exports = router