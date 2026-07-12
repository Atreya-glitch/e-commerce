import mongoose from 'mongoose';


const productschema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    Embeddings: {type: [Number], index: "vector"}
});

const Product = mongoose.models.product || mongoose.model('product', productschema);

export default Product;