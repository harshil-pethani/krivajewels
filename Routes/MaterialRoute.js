import { Router } from 'express';
const router = Router();
import VerifyToken from "../Middlewares/VerifyToken.js";
import { materialCreate, materialDelete, materialUpdate, getAllmaterials, getSinglematerial } from '../Controllers/MaterialController.js';

// material Routers
router.post("/create", VerifyToken, materialCreate.validator, materialCreate.controller);

router.get("/find/:id", getSinglematerial.validator, getSinglematerial.controller);

router.put("/update/:id", VerifyToken, materialUpdate.validator, materialUpdate.controller);

router.delete("/delete/:id", VerifyToken, materialDelete.validator, materialDelete.controller);

router.get("/findall", VerifyToken, getAllmaterials.controller);

export default router;