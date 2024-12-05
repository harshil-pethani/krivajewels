import Mongoose from "mongoose";

const MaterialSchema = new Mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        }
    }, { timestamps: true }
)

const Material = Mongoose.model("Material", MaterialSchema);
export default Material;