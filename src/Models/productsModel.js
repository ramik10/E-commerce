import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    quantity: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;