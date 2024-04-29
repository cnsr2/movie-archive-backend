const UserModel = require("../../models/user.model");

const { generateToken, encryptPassword } = require("../../middlewares/JWT");

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
        const newUser = await UserModel.updateOne({ userName }, { $set: { userName: newUserName } });

        return res.status(200).json({ message: "Update Successful" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "An error occurred", error: error.message });
    }
};

module.exports = { updateUserName };
