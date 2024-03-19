const User = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        console.log('hey')
        const {uid, firstName, lastName, email, password, projectDetail} = req.body;
        const emailCheck = await User.findOne({ email: email })
        if (emailCheck) {
            return res.json({msg: "Username already used", status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            uid: uid,
            email: email,
            password: hashedPassword, 
            firstName: firstName,
            lastName: lastName,
            projectDetail: projectDetail
        });
        return res.json({status: true, user})
    } catch (error) {
        console.log(error)
    }
};


module.exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select(["_id", "email", "firstName", "lastName", "projectDetail"])
        return res.json({status: true, data: users})
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const {id, firstName, lastName, email, projectDetail} = req.body;
        console.log(id)
        const users = await User.find({_id: {$ne: id}}).select(["email", "firstName", "lastName", "projectDetail"])[0]
        const updatedUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: users.password,
            projectDetail: projectDetail
        }
        const user = await User.findByIdAndUpdate(users._id, {$set: updatedUser}, {new: true})
        return res.json({status: true, data: user})
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const {id} = req.body;
        const deleteUser = await User.findByIdAndDelete(id)
        return res.json({status: true})
    } catch (error) {
        console.log(error)
    }
}
