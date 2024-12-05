import Material from "../Models/MaterialModel.js";

// Material APIs
export const materialCreate = {
    validator: async (req, res, next) => {
        if (
            !req.body.title
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
            const newmaterial = await Material.create({
                title: req.body.title
            });
            return res.status(201).send({
                "success": true,
                "message": "Material Creation Successful",
                ...newmaterial._doc
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Material creation failed Internal server error"
            });
        }
    }
}

export const getSinglematerial = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Material"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const findmaterial = await Material.findById(req.params.id);

            if (!findmaterial) {
                return res.status(400).json({
                    "success": false,
                    "message": "Material not found"
                });
            }

            return res.status(200).json({
                "success": true,
                "message": "Material found",
                "product": findmaterial
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Material fetching failed",
            });
        }
    }
}

export const materialUpdate = {
    validator: async (req, res, next) => {
        if (
            !req.body.title
        ) {
            return res.status(400).json({
                "success": false,
                "message": "Please Fill all the Fields"
            });
        } else if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Material"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            const findmaterial = await Material.findById(req.params.id);

            if (!findmaterial) {
                return res.status(400).json({
                    "success": false,
                    "message": "Material not found"
                });
            }

            const updatematerial = await Material.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                materialImage: req.body.materialImage
            }, { new: true })
            return res.status(200).send({
                "success": true,
                "message": "Material updation Successful",
                ...updatematerial._doc
            });
        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "Material updation failed internal server error"
            });
        }
    }
}

export const materialDelete = {
    validator: async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid Material"
            });
        }
        next();
    },
    controller: async (req, res) => {
        try {
            await Material.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                "success": true,
                "message": "Material deleted Successfully"
            });

        } catch (e) {
            return res.status(500).json({
                "success": false,
                "message": "Material deletion failed"
            });
        }
    }
}

export const getAllmaterials = {
    controller: async (req, res) => {
        try {
            const findmaterials = await Material.find();

            if (findmaterials.length == 0) {
                return res.status(200).json({
                    "success": true,
                    "message": "materials not available"
                });
            }

            return res.status(201).json({
                "success": true,
                "message": "Material found",
                "data": findmaterials
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json({
                "success": false,
                "message": "materials fetching failed"
            });
        }
    }
}