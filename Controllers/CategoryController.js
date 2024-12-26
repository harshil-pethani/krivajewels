import Category from "../Models/CategoryModel.js";
import Product from "../Models/ProductModel.js";
import { deleteFileFromBucket } from "../Routes/S3Route.js";

export const categoryCreate = {
    validator: async (req, res, next) => {
        if (
            !req.body.title ||
            !req.body.categoryImage
        ) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const newCategory = await Category.create({
                title: req.body.title,
                categoryImage: req.body.categoryImage
            });
            return res.status(201).send({
                "success": true,
                "message": "Category Creation Successful",
                ...newCategory._doc
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Category Creation Failed Internal server error"
            });
        }
    }
}

export const getSingleCategory = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Category"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const findCategory = await Category.findById(req.params.id);

            if (!findCategory) {
                return res.status(400).json({
                    "success": false,
                    "message": "Category not found"
                });
            }

            return res.status(200).json({
                "success": true,
                "message": "Category found",
                "product": findCategory
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Category fetching failed",
            });
        }
    }
}

export const categoryUpdate = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Category"
            });
        } else if (
            !req.body.title ||
            !req.body.categoryImage
        ) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, categoryImage } = req.body;

            // Find existing category by ID
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({
                    "success": false,
                    "message": "Category not found"
                });
            }

            if (title) {
                category.title = title;
            }
            if (categoryImage) {
                category.categoryImage = categoryImage;
            }

            // Save the updated category
            await category.save();

            return res.status(200).send({
                "success": true,
                "message": "Category updation Successful",
                category
            });
        } catch (error) {
            return res.status(500).json({
                "success": false,
                "message": "Category updation failed internal server error"
            });
        }
    }
}

export const categoryDelete = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Category"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({
                    "success": false,
                    "message": "Category not found"
                });
            }
            await Product.updateMany(
                { category: id },
                { isActive: false }
            );

            const fileDeleted = await deleteFileFromBucket(category.categoryImage);
            if (!fileDeleted) {
                return res.status(500).json({
                    success: false,
                    message: "Category deletion failed due to image deletion error",
                });
            }
            await Category.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: "Category and associated products updated successfully",
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Category deletion failed"
            });
        }
    }
}

export const getAllCategories = {
    controller: async (req, res) => {
        try {
            const findCategories = await Category.find().sort({ _id: -1 });
            if (findCategories.length == 0) {
                return res.status(200).json({
                    "success": true,
                    "message": "Category not available"
                });
            }
            return res.status(200).json({
                "success": true,
                "message": "Category found",
                "data": findCategories
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Category Fetching failed"
            });
        }
    }
}