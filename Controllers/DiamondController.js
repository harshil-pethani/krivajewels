import Diamond from "../Models/DiamondModel.js";
import Product from "../Models/ProductModel.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import { deleteFileFromBucket } from "../Routes/S3Route.js";


const deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diamond APIs
export const diamondCreate = {
    validator: async (req, res, next) => {
        if (
            !req.body.title ||
            !req.body.diamondImage
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
            const newDiamond = await Diamond.create({
                title: req.body.title,
                diamondImage: req.body.diamondImage
            });

            return res.status(201).send({
                "success": true,
                "message": "Diamond Creation Successful",
                ...newDiamond._doc
            });
        } catch (error) {
            return res.status(500).json({
                "success": false,
                "message": "Diamond Creation Failed Internal server error"
            });
        }
    }
}

export const diamondCreateMany = {
    controller: async (req, res) => {
        try {
            const newDiamond = await Product.insertMany([
                {
                    "title": "Luxury Diamond Earrings",
                    "description": "Dazzling earrings crafted with the finest diamonds and gold.",
                    "category": "6739e5e56ed455bb1df2c2d4",
                    "diamond": "673a17d79d70e3b43dbd6d37",
                    "goldBannerImage": "ProductImages/TempRin_goldbanner_1732357996726",
                    "goldOtherImages": [
                        "ProductImages/TempRin_gold1_1732357996726",
                        "ProductImages/TempRin_gold2_1732357996726"
                    ],
                    "goldVideo": "ProductVideos/TempRin_goldvideo_1732357996726",
                    "silverBannerImage": "ProductImages/TempRin_silver2_1732357996726",
                    "silverOtherImages": [
                        "ProductImages/TempRin_silver1_1732357996726",
                        "ProductImages/TempRin_silver0_1732357996726"
                    ],
                    "silverVideo": "ProductVideos/TempRinsilvervideo_1732357996726",
                    "roseGoldBannerImage": "ProductImages/TempRin_rosegoldbanner_1732357996726",
                    "roseGoldOtherImages": [
                        "ProductImages/TempRin_rosegold1_1732357996726",
                        "ProductImages/TempRin_rosegold2_1732357996726"
                    ],
                    "roseGoldVideo": "ProductVideos/TempRin_rosegoldvideo_1732357996726"
                },
                {
                    "title": "Elegant Rose Gold Necklace",
                    "description": "A sophisticated necklace with a touch of modern rose gold elegance.",
                    "category": "6739e5f76ed455bb1df2c2d8",
                    "diamond": "673a17e19d70e3b43dbd6d3b",
                    "goldBannerImage": "ProductImages/TempRin_gold1_1732357996726",
                    "goldOtherImages": [
                        "ProductImages/TempRin_gold0_1732357996726",
                        "ProductImages/TempRin_gold2_1732357996726"
                    ],
                    "goldVideo": "ProductVideos/TempRin_goldvideo_1732357996726",
                    "silverBannerImage": "ProductImages/TempRin_silver0_1732357996726",
                    "silverOtherImages": [
                        "ProductImages/TempRin_silver2_1732357996726",
                        "ProductImages/TempRin_silver1_1732357996726"
                    ],
                    "silverVideo": "ProductVideos/TempRinsilvervideo_1732357996726",
                    "roseGoldBannerImage": "ProductImages/TempRin_rosegold2_1732357996726",
                    "roseGoldOtherImages": [
                        "ProductImages/TempRin_rosegold0_1732357996726",
                        "ProductImages/TempRin_rosegoldbanner_1732357996726"
                    ],
                    "roseGoldVideo": "ProductVideos/TempRin_rosegoldvideo_1732357996726"
                },
                {
                    "title": "Timeless Silver Ring",
                    "description": "A timeless piece of jewelry designed for elegance and grace.",
                    "category": "673e2282c22422f32e3b01b4",
                    "diamond": "673a17ba9d70e3b43dbd6d2b",
                    "goldBannerImage": "ProductImages/TempRin_gold2_1732357996726",
                    "goldOtherImages": [
                        "ProductImages/TempRin_gold1_1732357996726",
                        "ProductImages/TempRin_goldbanner_1732357996726"
                    ],
                    "goldVideo": "ProductVideos/TempRin_goldvideo_1732357996726",
                    "silverBannerImage": "ProductImages/TempRin_silverbanner_1732357996726",
                    "silverOtherImages": [
                        "ProductImages/TempRin_silver2_1732357996726",
                        "ProductImages/TempRin_silver1_1732357996726"
                    ],
                    "silverVideo": "ProductVideos/TempRinsilvervideo_1732357996726",
                    "roseGoldBannerImage": "ProductImages/TempRin_rosegoldbanner_1732357996726",
                    "roseGoldOtherImages": [
                        "ProductImages/TempRin_rosegold0_1732357996726",
                        "ProductImages/TempRin_rosegold1_1732357996726"
                    ],
                    "roseGoldVideo": "ProductVideos/TempRin_rosegoldvideo_1732357996726"
                },
                {
                    "title": "Glamorous Gold Bracelet",
                    "description": "Add a touch of glamour to your look with this exquisite gold bracelet.",
                    "category": "6739e5c26ed455bb1df2c2cc",
                    "diamond": "673a179f9d70e3b43dbd6d1f",
                    "goldBannerImage": "ProductImages/TempRin_gold0_1732357996726",
                    "goldOtherImages": [
                        "ProductImages/TempRin_gold2_1732357996726",
                        "ProductImages/TempRin_goldbanner_1732357996726"
                    ],
                    "goldVideo": "ProductVideos/TempRin_goldvideo_1732357996726",
                    "silverBannerImage": "ProductImages/TempRin_silverbanner_1732357996726",
                    "silverOtherImages": [
                        "ProductImages/TempRin_silver1_1732357996726",
                        "ProductImages/TempRin_silver0_1732357996726"
                    ],
                    "silverVideo": "ProductVideos/TempRinsilvervideo_1732357996726",
                    "roseGoldBannerImage": "ProductImages/TempRin_rosegold1_1732357996726",
                    "roseGoldOtherImages": [
                        "ProductImages/TempRin_rosegold2_1732357996726",
                        "ProductImages/TempRin_rosegold0_1732357996726"
                    ],
                    "roseGoldVideo": "ProductVideos/TempRin_rosegoldvideo_1732357996726"
                },
                {
                    "title": "Modern Rose Gold Earrings",
                    "description": "A stylish pair of rose gold earrings designed for modern fashion.",
                    "category": "6739e5d46ed455bb1df2c2d0",
                    "diamond": "673a17c59d70e3b43dbd6d2f",
                    "goldBannerImage": "ProductImages/TempRin_goldbanner_1732357996726",
                    "goldOtherImages": [
                        "ProductImages/TempRin_gold0_1732357996726",
                        "ProductImages/TempRin_gold1_1732357996726"
                    ],
                    "goldVideo": "ProductVideos/TempRin_goldvideo_1732357996726",
                    "silverBannerImage": "ProductImages/TempRin_silver2_1732357996726",
                    "silverOtherImages": [
                        "ProductImages/TempRin_silver0_1732357996726",
                        "ProductImages/TempRin_silverbanner_1732357996726"
                    ],
                    "silverVideo": "ProductVideos/TempRinsilvervideo_1732357996726",
                    "roseGoldBannerImage": "ProductImages/TempRin_rosegold2_1732357996726",
                    "roseGoldOtherImages": [
                        "ProductImages/TempRin_rosegold0_1732357996726",
                        "ProductImages/TempRin_rosegold1_1732357996726"
                    ],
                    "roseGoldVideo": "ProductVideos/TempRin_rosegoldvideo_1732357996726"
                }
            ]
            );
            return res.status(201).send({
                "success": true,
                "message": "Diamond Creation Successful",
                ...newDiamond._doc
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Diamond creation failed Internal server error"
            });
        }
    }
}

export const getSingleDiamond = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Diamond"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const findDiamond = await Diamond.findById(req.params.id);

            if (!findDiamond) {
                return res.status(400).json({
                    "success": false,
                    "message": "Diamond not found"
                });
            }

            return res.status(200).json({
                "success": true,
                "message": "Diamond found",
                "product": findDiamond
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Diamond fetching failed",
            });
        }
    }
}

export const diamondUpdate = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Diamond"
            });
        } else if (
            !req.body.title ||
            !req.body.diamondImage
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
            const { title, diamondImage } = req.body;

            // Find existing diamond by ID
            const diamond = await Diamond.findById(id);
            if (!diamond) {
                return res.status(404).json({
                    "success": false,
                    "message": "Diamond not found"
                });
            }

            if (title) {
                diamond.title = title;
            }
            if (diamondImage) {
                diamond.diamondImage = diamondImage;
            }

            // Save the updated category
            await diamond.save();

            return res.status(200).send({
                "success": true,
                "message": "Diamond updation Successful",
                diamond
            });
        } catch (error) {
            // console.error(error);
            return res.status(500).json({
                "success": false,
                "message": "Diamond updation failed internal server error"
            });
        }
    }
}

export const diamondDelete = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Diamond"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const { id } = req.params;

            const diamond = await Diamond.findById(id);
            if (!diamond) {
                return res.status(404).json({
                    "success": false,
                    "message": "Diamond not found"
                });
            }
            await Product.updateMany(
                { category: id },
                { isActive: false }
            );

            const fileDeleted = await deleteFileFromBucket(diamond.diamondImage);
            if (!fileDeleted) {
                return res.status(500).json({
                    success: false,
                    message: "Diamond deletion failed due to image deletion error",
                });
            }
            await Diamond.findByIdAndDelete(id);

            return res.status(500).json({
                "success": false,
                "message": "Diamond and associated products updated successfully"
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Diamond deletion failed"
            });
        }
    }
}

export const getAllDiamonds = {
    controller: async (req, res) => {
        try {
            const findDiamonds = await Diamond.find();

            if (findDiamonds.length == 0) {
                return res.status(200).json({
                    "success": true,
                    "message": "Diamonds not available"
                });
            }

            return res.status(200).json({
                "success": true,
                "message": "Diamond found",
                "data": findDiamonds
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Diamonds fetching failed"
            });
        }
    }
}