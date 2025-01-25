import Mongoose from "mongoose";

const ProductSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 3,
        },
        description: {
            type: String,
        },
        subCategory: {
            type: String,
            default: ""
        },
        diamond: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Diamond',
            required: true,
        },
        category: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        goldBannerImage: {
            type: String
        },
        goldOtherImages: [{ type: String }],
        goldVideo: {
            type: String
        },
        silverBannerImage: {
            type: String
        },
        silverOtherImages: [{ type: String }],
        silverVideo: {
            type: String
        },
        roseGoldBannerImage: {
            type: String
        },
        roseGoldOtherImages: [{ type: String }],
        roseGoldVideo: {
            type: String
        },
        defaultSelected: {
            type: String,
            default: "Gold"
        },
        price: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }, { timestamps: true }
)

const Product = Mongoose.model("Product", ProductSchema);
export default Product;


