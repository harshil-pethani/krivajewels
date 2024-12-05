import { Router } from 'express';
import { getAllFilters, getAllProducts, getRecent5Products, getSingleProduct, ProductCreate, productDelete, productUpdate } from '../Controllers/ProductController.js';
const router = Router();
import VerifyToken from "../Middlewares/VerifyToken.js";

// Product Routers
router.post("/create", VerifyToken, ProductCreate.validator, ProductCreate.controller);

router.get("/find/:id", getSingleProduct.validator, getSingleProduct.controller);

router.get("/recent5", getRecent5Products.controller);

router.put("/update/:id", VerifyToken, productUpdate.validator, productUpdate.controller);

router.delete("/:id", VerifyToken, productDelete.validator, productDelete.controller);

router.get("/allfilters", getAllFilters.controller);

router.post("/", getAllProducts.controller);

export default router;