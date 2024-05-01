const { CURSOR_FLAGS } = require("mongodb");
const UserModel = require("../../models/user.model");
const {encryptPassword} = require("../../middlewares/JWT")

const updateUserName = async (req, res) => {
    try {
        const { userName, newUserName } = req.body;
        const anotherUser = await UserModel.findOne({ newUserName });
        const existingUser = await UserModel.findOne({ userName })

        if (anotherUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        else if (!existingUser) {
            return res.status(404).json({ message: "Username Not Found" });
        }
        await UserModel.updateOne({ userName }, { $set: { userName: newUserName } });

        return res.status(200).json({ message: "Update Successful" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};

const updateNameSurname = async (req, res) => {
    try {
        const { newNameSurname, userName } = req.body;
        const existingUser = await UserModel.findOne({ userName })
        if(!existingUser){
            res.status(404).json({message: "User Not Found"})
        }
        await UserModel.updateOne({ userName }, { $set: { nameSurname: newNameSurname } });

        return res.status(200).json({ message: "Update Successful" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};
const updatePassword = async (req,res) =>{
    try {
    const {newPassword,rePassword,userName} = req.body;
    if(newPassword !== rePassword){
        return res.status(400).json({message:"Passwords Do Not Match"})
    }
    if(newPassword < 4 ){
        return res.status(400).json({ message: "Password must be at least 4 characters long" });
    }
    const existingUser = await UserModel.findOne({userName})
    if(!existingUser){
        return res.status(404).json({message:"User Not Found"})
    }
    const hashedPassword  = encryptPassword(newPassword);
    await UserModel.updateOne({userName},{$set: {password : hashedPassword }})

    return res.status(200).json({message:"Update Successful"})
    } catch (error) {
        return res
        .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
}


const updateEmail = async (req,res) => {
    try {
        const {newEmail,userName} = req.body;
        const anotherUser = await UserModel.findOne( { email: newEmail })

          if (anotherUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const existingUser = await UserModel.findOne({ userName })
        if(!existingUser){
            return res.status(404).json({ message: "Username Not Found" });
        }
        await UserModel.updateOne({ userName }, { $set: { email: newEmail } }) 
        
        return res.status(200).json({ message: "Update Successful" });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
}

const addFriend = async (req, res) => {
    try {
        const { userId, friendUserName } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User Not Found");
        }

        const friend = await UserModel.findOne({ userName: friendUserName });
        if (!friend) {
            throw new Error("Friend Not Found");
        }

        if (user.friendsUserName.includes(friendUserName)) {
            throw new Error("You Are Already Friends");
        }

        user.friendsUserName.push(friendUserName);
        await user.save();

        const friendsList = user.friendsUserName;

        return res.status(200).json({ message: "Successful", friendsList })
    } catch (error) {
        return res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
}

module.exports = { updateUserName, addFriend,updateEmail,updateNameSurname,updatePassword};
