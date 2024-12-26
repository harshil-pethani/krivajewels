import User from "../Models/UserModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import sendForgotPassMail from "../Mails/ForgotPassword.js";
dotenv.config();

export const register = {
    validator: async (req, res, next) => {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const encryptedPass = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC_KEY);
            // console.log(encryptedPass);
            const newAdmin = await User.create({
                username: req.body.username.toLowerCase(),
                email: req.body.email.toLowerCase(),
                password: encryptedPass,
            });

            return res.status(200).json({
                "success": true,
                "message": "Registration Successful"
            });
        }
        catch (e) {
            if (e.keyValue?.username) {
                return res.status(409).json({
                    "success": false,
                    "message": "Username Already Exists"
                });
            }
            else if (e.keyValue?.email) {
                return res.status(409).json({
                    "success": false,
                    "message": "Email Address Already Exists"
                });
            }
            else {
                return res.status(500).json({
                    "success": false,
                    "message": "Reqistration Failed Internal Server Error"
                });
            }
        }
    }
}

export const login = {
    validator: async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const findUser = await User.findOne({
                email: req.body.email.toLowerCase()
            });


            if (!findUser) {
                return res.status(400).json({
                    "success": false,
                    "message": "Invalid Credentials "
                });
            }

            const decryptedPass = CryptoJS.AES.decrypt(
                findUser.password,
                process.env.AES_SEC_KEY
            ).toString(CryptoJS.enc.Utf8);

            if (decryptedPass !== req.body.password) {
                return res.status(400).json({
                    "success": false,
                    "message": "Invalid Credentials"
                });
            }

            const accessToken = JWT.sign(
                {
                    id: findUser._id,
                },
                process.env.JWT_SEC_KEY,
                { expiresIn: "24h" }
            );

            res.cookie('krivajewels', accessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

            const { password, ...others } = findUser._doc;

            return res.status(200).json({
                "success": true,
                "accessToken": accessToken,
                ...others,
            });

        }
        catch (e) {
            return res.status(500).json({
                "success": false,
                "message": "Login Failed Internal Server Error"
            });
        }
    }
}

export const checkAdmin = {
    controller: async (req, res) => {
        try {
            return res.status(200).json({
                "success": true,
                admin: req.currUser
            });
        }
        catch (e) {
            return res.status(500).send("Admin Check Failed Internal Server Error");
        }
    }
}

export const logout = {
    controller: async (req, res) => {
        try {
            res.cookie('krivajewels', '', { maxAge: 0, httpOnly: true });

            return res.status(200).json({
                "success": true,
                "message": "Logout Successfull"
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Logout Failed"
            });
        }
    }
}

export const updateAdmin = {
    validator: async (req, res, next) => {
        if (!req.body.email || !req.body.username) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const updateData = await User.findByIdAndUpdate(req.userId, {
                email: req.body.email.toLowerCase(),
                username: req.body.username
            }, { new: true })

            const { password, ...others } = updateData._doc;

            return res.status(200).json({
                "success": true,
                "message": "User Updation success",
                "data": others
            });
        }
        catch (e) {
            // console.log(e);
            if (e.keyValue?.username) {
                return res.status(409).json({
                    "success": false,
                    "message": "Username Already Exists"
                });
            }
            else if (e.keyValue?.email) {
                return res.status(409).json({
                    "success": false,
                    "message": "Email Address Already Exists"
                });
            }
            else {
                return res.status(500).json({
                    "success": false,
                    "message": "User Updation Failed Internal Server Error"
                });
            }
        }
    }
}

export const updateAdminPassword = {
    validator: async (req, res, next) => {
        if (!req.body.curPassword || !req.body.newPassword || !req.body.retypePassword) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        } else if (req.body.newPassword !== req.body.retypePassword) {
            return res.status(400).json({
                "success": false,
                "message": "New password and retype password must be same"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const findUser = await User.findById(req.userId);

            const decryptedPass = CryptoJS.AES.decrypt(
                findUser.password,
                process.env.AES_SEC_KEY
            ).toString(CryptoJS.enc.Utf8);

            if (decryptedPass !== req.body.curPassword) {
                return res.status(400).json({
                    "success": false,
                    "message": "Invalid Credintials"
                });
            }

            const encryptedPassword = CryptoJS.AES.encrypt(req.body.newPassword, process.env.AES_SEC_KEY).toString()

            const updatePassword = await User.findByIdAndUpdate(req.userId, {
                password: encryptedPassword
            }, { new: true })

            const { password, ...others } = updatePassword._doc;

            return res.status(200).json({
                "success": true,
                "message": "Password Updation Successful",
                "data": others
            });
        }
        catch (e) {
            return res.status(500).json({
                "success": false,
                "message": "Passowrd Updation Failed"
            });
        }
    }
}

export const forgotPassword = {
    validator: async (req, res, next) => {
        if (!req.body.email) {
            return res.status(400).json({
                "success": false,
                "message": "Please Enter the Email Id"
            });
        }
        //  else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
        //     return res.status(400).send("Please Enter Valid Email Address");
        // }
        next();
    },
    controller: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email.toLowerCase() });

            if (!user) {
                return res.status(400).json({
                    "success": false,
                    "message": "Invalid Credentials"
                });
            }

            const accessToken = JWT.sign(
                {
                    id: user._id,
                    username: user.username
                },
                process.env.JWT_SEC_KEY,
                { expiresIn: 60 * 15 }
            );

            // sendMail(accessToken, req.body.email);
            await sendForgotPassMail({ email: req.body.email, url: `${process.env.CLIENT_URL}/admin/reset_password?reset_password_token=${accessToken}` });

            return res.status(200).json({
                "success": true,
                "message": "Password Reset Email Has been Sent."
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Password Reset Failed"
            });
        }
    }
}

export const resetTokenVerify = {
    validator: async (req, res, next) => {
        if (!req.body.token) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Password Reset URL"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const verified = JWT.verify(req.body.token, process.env.JWT_SEC_KEY);
            const rootUser = await User.findOne({
                _id: verified.id
            });

            if (!rootUser) {
                return res.status(400).json({
                    "success": false,
                    "message": "User Not Found For Password Reset"
                });
            }

            return res.status(200).json({
                "success": true,
                "message": "Token Verified",
                "userId": verified.id
            });
        }
        catch (e) {
            if (e.name == "TokenExpiredError") {
                return res.status(500).json({
                    "success": false,
                    "message": "Password Reset URL is Expired"
                });
            } else {
                return res.status(500).json({
                    "success": false,
                    "message": "Password Reset Failed Internal Server Error"
                });
            }
        }
    }
}

export const resetPassword = {
    validator: async (req, res, next) => {
        if (!req.body.token) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Password Reset URL"
            });
        } else if (!req.body.newPassword || !req.body.retypePassword) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        } else if (req.body.newPassword !== req.body.retypePassword) {
            return res.status(400).json({
                "success": false,
                "message": "New password and retype password must be same"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const verified = JWT.verify(req.body.token, process.env.JWT_SEC_KEY);
            const rootUser = await User.findById(verified.id);

            if (!rootUser) {
                return res.status(400).json({
                    "success": false,
                    "message": "User Not Found For Password Reset"
                });
            }

            const encryptedPassword = CryptoJS.AES.encrypt(req.body.newPassword, process.env.AES_SEC_KEY).toString()

            const updatePassword = await User.findByIdAndUpdate(rootUser._id, {
                password: encryptedPassword
            }, { new: true })

            return res.status(200).json({
                "success": true,
                "message": "Password is Updated Successfully"
            });
        }
        catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Admin Data Update Failed"
            });
        }
    }
}