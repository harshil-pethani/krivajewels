import { Router } from 'express';
const router = Router();
import VerifyToken from "../Middlewares/VerifyToken.js";
import { diamondCreate, diamondCreateMany, diamondDelete, diamondUpdate, getAllDiamonds, getSingleDiamond } from '../Controllers/DiamondController.js';

// Diamond Routers
router.post("/create", VerifyToken, diamondCreate.validator, diamondCreate.controller);

router.post("/createmany", VerifyToken, diamondCreateMany.controller);

router.get("/find/:id", getSingleDiamond.validator, getSingleDiamond.controller);

router.put('/update/:id', VerifyToken, diamondUpdate.validator, diamondUpdate.controller);


router.delete("/:id", VerifyToken, diamondDelete.validator, diamondDelete.controller);

router.get("/", getAllDiamonds.controller);

export default router;