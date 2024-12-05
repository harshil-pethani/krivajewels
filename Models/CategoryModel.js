import Mongoose from "mongoose";

const CategorySchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        categoryImage: {
            type: String,
            required: false
        }
    }, { timestamps: true }
)

const Category = Mongoose.model("Category", CategorySchema);
export default Category;