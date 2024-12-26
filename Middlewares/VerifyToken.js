import JWT from 'jsonwebtoken';
import User from "../Models/UserModel.js";

const VerifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.krivajewels;

        if (token) {
            const verified = JWT.verify(token, process.env.JWT_SEC_KEY);
            const currUser = await User.findOne({
                _id: verified.id
            });

            if (!currUser) {
                return res.status(400).send("Unauthorized User")
            }

            req.token = token;
            let { password, ...rest } = currUser._doc;

            req.currUser = rest;
            req.userId = currUser._id;

            next();

        } else {
            return res.status(400).send("Admin not Logged In")
        }
    } catch (err) {
        res.status(400).send("Unauthorized User");
    }
}

export default VerifyToken;