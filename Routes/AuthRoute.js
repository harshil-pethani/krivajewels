import { Router } from 'express';
import { register, login, logout, updateAdmin, updateAdminPassword, forgotPassword, resetTokenVerify, resetPassword, checkAdmin } from '../Controllers/AuthController.js';
import VerifyToken from '../Middlewares/VerifyToken.js';

const router = Router();

router.post("/register", register.validator, register.controller);

router.post("/login", login.validator, login.controller);

router.get("/checkadmin", VerifyToken, checkAdmin.controller);

router.get("/logout", logout.controller);

router.post("/updatedata", VerifyToken, updateAdmin.validator, updateAdmin.controller);

router.post("/updatepassword", VerifyToken, updateAdminPassword.validator, updateAdminPassword.controller);

router.post("/forgotpassword", forgotPassword.validator, forgotPassword.controller);

router.post("/reset_token_verify", resetTokenVerify.validator, resetTokenVerify.controller);

router.put("/resetpassword", resetPassword.validator, resetPassword.controller);

export default router;