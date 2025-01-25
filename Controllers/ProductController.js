import mongoose from "mongoose";
import Product from "../Models/ProductModel.js";
import Category from "../Models/CategoryModel.js";
import Material from "../Models/MaterialModel.js";
import Diamond from "../Models/DiamondModel.js";
import { deleteFileFromBucket } from "../Routes/S3Route.js";

// Product APIs

export const ProductCreate = {
    validator: async (req, res, next) => {
        if (
            !req.body.title ||
            !req.body.description ||
            !req.body.category ||
            !req.body.diamond
        ) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        } else if (!(req.body.goldBannerImage || req.body.silverBannerImage || req.body.roseGoldBannerImage)) {
            return res.status(400).json({
                "success": false,
                "message": "Upload Atleast one Banner Image!"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const { title, description, subCategory, category, diamond, goldBannerImage, goldOtherImages, goldVideo, silverBannerImage, silverOtherImages, silverVideo, roseGoldBannerImage, roseGoldOtherImages, roseGoldVideo } = req.body;

            // Create new product
            const product = new Product({
                title,
                description,
                subCategory,
                category: new mongoose.Types.ObjectId(String(category)),
                diamond: new mongoose.Types.ObjectId(String(diamond)),
                goldBannerImage,
                goldOtherImages,
                goldVideo,
                silverBannerImage,
                silverOtherImages,
                silverVideo,
                roseGoldBannerImage,
                roseGoldOtherImages,
                roseGoldVideo
            });

            await product.save();
            return res.status(201).send({
                "success": true,
                "message": "Product Creation Successful",
                product
            });

        } catch (error) {
            // console.log(error);
            return res.status(500).json({
                "success": false,
                "message": "Product Creation Failed Internal server error"
            });
        }
    }
}

export const getSingleProduct = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Product"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const findProduct = await Product.findById(req.params.id)
                .populate({
                    path: "category",
                    select: "title categoryImage"
                }).populate({
                    path: "diamond",
                    select: "title diamondImage"
                })

            if (!findProduct) {
                return res.status(400).json({
                    "success": false,
                    "message": "Product not found"
                });
            }

            return res.status(200).json({
                "success": true,
                "message": "Product found",
                "product": findProduct
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Product fetching failed",
            });
        }
    }
}

export const productUpdate = {
    validator: async (req, res, next) => {
        if (
            !req.body.title ||
            !req.body.description ||
            !req.body.category ||
            !req.body.diamond
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

            const { title, description, subCategory, category, diamond } = req.body;

            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({
                    "success": false,
                    "message": "Product not found"
                });
            }

            product.title = title;
            product.description = description;
            product.subCategory = subCategory;
            product.category = new mongoose.Types.ObjectId(String(category));
            product.diamond = new mongoose.Types.ObjectId(String(diamond));

            await product.save();

            return res.status(200).send({
                "success": true,
                "message": "Product updation Successful",
                product
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Product updation failed Internal server error"
            });
        }
    }
}

export const productDelete = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Product"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({
                    "success": false,
                    "message": "Product not found"
                });
            }

            let allFiles = [...product.goldOtherImages, ...product.silverOtherImages, ...product.roseGoldOtherImages, product.goldVideo, product.goldBannerImage, product.silverVideo, product.silverBannerImage, product.roseGoldVideo, product.roseGoldBannerImage].filter(Boolean);

            const requests = allFiles.map((file) =>
                deleteFileFromBucket(file)
            );

            if (await Promise.all(requests)) {
                await Product.findByIdAndDelete(id);
                return res.status(200).json({
                    "success": true,
                    "message": "Product deleted Successfully"
                });
            } else {
                return res.status(500).json({
                    "success": false,
                    "message": "Product deletion failed"
                });
            }
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Product deletion failed"
            });
        }
    }
}

export const getAllProducts = {
    controller: async (req, res) => {
        try {
            const { page = 1, limit = 10, searchQuery = "" } = req.query;
            const [category = "All", diamond = "All", subCategory = "All"] = req.body.filters || [];
            const skip = (page - 1) * limit;


            const categories = Array.isArray(category) ? category.map(id => new mongoose.Types.ObjectId(String(id))) : [];
            const diamonds = Array.isArray(diamond) ? diamond.map(id => new mongoose.Types.ObjectId(String(id))) : [];
            const subCategories = Array.isArray(subCategory) ? subCategory.map(id => (String(id))) : [];

            // const [sortField, sortOrder = "asc"] = sort.split(",");
            // const sortBy = { [sortField]: sortOrder === "asc" ? 1 : -1 };

            const pipeline = [
                {
                    $match: {
                        $and: [
                            {
                                $or: [
                                    { title: { $regex: searchQuery, $options: 'i' } },
                                    { description: { $regex: searchQuery, $options: 'i' } }
                                ],
                            },
                            subCategories.length > 0
                                ? { subCategory: { $in: subCategories } }
                                : {},
                            categories.length > 0
                                ? { category: { $in: categories } }
                                : {},
                            diamonds.length > 0
                                ? { diamond: { $in: diamonds } }
                                : {},
                            { isActive: true }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_detail",
                    },
                },
                {
                    $lookup: {
                        from: "diamonds",
                        localField: "diamond",
                        foreignField: "_id",
                        as: "diamond_detail",
                    },
                },
                // {
                //     $lookup: {
                //         from: "materials",
                //         localField: "material",
                //         foreignField: "_id",
                //         as: "material_detail",
                //     },
                // },
                { $unwind: '$category_detail' },
                { $unwind: '$diamond_detail' },
                // { $unwind: '$material_detail' },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        subCategory: 1,
                        productImage: 1,
                        goldBannerImage: 1,
                        goldOtherImages: 1,
                        goldVideo: 1,
                        silverBannerImage: 1,
                        silverOtherImages: 1,
                        silverVideo: 1,
                        roseGoldBannerImage: 1,
                        roseGoldOtherImages: 1,
                        roseGoldVideo: 1,
                        isActive: 1,
                        defaultSelected: 1,
                        "category_detail.title": 1,
                        "category_detail.categoryImage": 1,
                        "category_detail._id": 1,
                        "diamond_detail.title": 1,
                        "diamond_detail.diamondImage": 1,
                        "diamond_detail._id": 1,
                        // "material_detail.title": 1,
                        price: 1,
                        createdAt: 1
                    },
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: parseInt(limit) + 1
                }
            ]

            const products = await Product.aggregate(pipeline);

            const hasMoreProduct = products.length > limit;

            if (hasMoreProduct) products.pop();

            res.status(200).json({
                "success": true,
                // total,
                // sortBy,
                searchQuery,
                categories,
                diamonds,
                page,
                limit,
                products,
                hasMoreProduct
            });
        } catch (err) {
            // console.error(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
}

export const getRecent5Products = {
    controller: async (req, res) => {
        try {
            const pipeline = [
                {
                    $match: {
                        isActive: true
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $group: {
                        _id: "$category",
                        product: { $first: "$$ROOT" }
                    }
                },
                {
                    $replaceRoot: { newRoot: "$product" }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_detail",
                    },
                },
                {
                    $lookup: {
                        from: "diamonds",
                        localField: "diamond",
                        foreignField: "_id",
                        as: "diamond_detail",
                    },
                },
                { $unwind: '$category_detail' },
                { $unwind: '$diamond_detail' },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        productImage: 1,
                        goldBannerImage: 1,
                        goldOtherImages: 1,
                        goldVideo: 1,
                        silverBannerImage: 1,
                        silverOtherImages: 1,
                        silverVideo: 1,
                        roseGoldBannerImage: 1,
                        roseGoldOtherImages: 1,
                        roseGoldVideo: 1,
                        isActive: 1,
                        defaultSelected: 1,
                        "category_detail.title": 1,
                        "category_detail.categoryImage": 1,
                        "category_detail._id": 1,
                        "diamond_detail.title": 1,
                        "diamond_detail.diamondImage": 1,
                        "diamond_detail._id": 1,
                        price: 1,
                        createdAt: 1
                    }
                },
                {
                    $limit: 5
                }
            ];

            const products = await Product.aggregate(pipeline);

            res.status(200).json({
                "success": true,
                products,
            });
        } catch (err) {
            // console.error(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
}

export const getAllFilters = {
    controller: async (req, res) => {
        try {

            const filters = await Promise.all([
                Category.find(),
                Diamond.find(),
                Material.find()
            ]);

            return res.status(200).json({
                "success": true,
                "message": "Filter found",
                "data": filters
            });
        } catch (err) {
            // console.error(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
}