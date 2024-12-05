import Mongoose from "mongoose";

const DiamondSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        diamondImage: {
            type: String,
            required: false
        }
    }, { timestamps: true }
)

const Diamond = Mongoose.model("Diamond", DiamondSchema);
export default Diamond;