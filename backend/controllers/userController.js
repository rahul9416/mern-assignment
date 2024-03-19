const User = require("../model/userModel")

// Controller to register the client
module.exports.register = async (req, res, next) => {
    try {
        const {uid, firstName, lastName, email, mobileNumber, projectDetail} = req.body;
        const emailCheck = await User.findOne({ email: email })
        if (emailCheck) {
            return res.json({msg: "Username already used", status: false});
        }
        const user = await User.create({
            uid: uid,
            email: email,
            mobileNumber: mobileNumber, 
            firstName: firstName,
            lastName: lastName,
            projectDetail: projectDetail
        });
        return res.json({status: true, user})
    } catch (error) {
        console.log(error)
    }
};

// Controller to retrieve all the users
module.exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select(["_id", "email", "firstName", "lastName", "mobileNumber", "projectDetail"])
        return res.json({status: true, data: users})
    } catch (error) {
        console.log(error)
    }
}

// Controller to update the User
module.exports.updateUser = async (req, res, next) => {
    try {
        const {id, firstName, lastName, mobileNumber, email, projectDetail} = req.body;
        const updatedUser = {
            _id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: mobileNumber,
            projectDetail: projectDetail
        }
        const user = await User.findByIdAndUpdate(id, {$set: updatedUser}, {new: true})
        return res.json({status: true, data: user})
    } catch (error) {
        console.log(error)
    }
}

// Controller to delete the user
module.exports.deleteUser = async (req, res, next) => {
    try {
        const {id} = req.body;
        await User.findByIdAndDelete(id)
        return res.json({status: true})
    } catch (error) {
        console.log(error)
    }
}
