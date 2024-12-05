import { Router } from 'express';
const router = Router();
import VerifyToken from "../Middlewares/VerifyToken.js";
import { categoryCreate, categoryDelete, categoryUpdate, getAllCategories, getSingleCategory } from '../Controllers/CategoryController.js';


// Route for creating a category
router.post("/create", VerifyToken, categoryCreate.validator, categoryCreate.controller);

router.put('/update/:id', VerifyToken, categoryUpdate.validator, categoryUpdate.controller);

router.get("/find/:id", getSingleCategory.validator, getSingleCategory.controller);

router.delete("/:id", VerifyToken, categoryDelete.validator, categoryDelete.controller);

router.get("/", getAllCategories.controller);

export default router;