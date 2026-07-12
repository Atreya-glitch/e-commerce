import connectDB from '../../db/db.js';
import product from '../../models/schema.js';
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function getEmbedding(text) {
    const response = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: text,
    });
    return response.embeddings[0].values;
}

const seedProducts = [
    { title: 'Sneakers', description: 'Comfortable and stylish sneakers', price: 99.99, category: 'Footwear', image: 'https://picsum.photos/seed/sneakers/600/600' },
    { title: 'Running Shoes', description: 'Lightweight running shoes for daily workouts', price: 119.99, category: 'Footwear', image: 'https://picsum.photos/seed/running-shoes/600/600' },
    { title: 'Hiking Boots', description: 'Durable hiking boots with strong grip', price: 149.99, category: 'Footwear', image: 'https://picsum.photos/seed/hiking-boots/600/600' },
    { title: 'Canvas Sneakers', description: 'Classic casual sneakers for everyday wear', price: 84.99, category: 'Footwear', image: 'https://picsum.photos/seed/canvas-sneakers/600/600' },
    { title: 'Premium Tee', description: 'Soft cotton t-shirt with modern fit', price: 24.99, category: 'Apparel', image: 'https://picsum.photos/seed/premium-tee/600/600' },
    { title: 'Oversized Hoodie', description: 'Cozy oversized hoodie for all seasons', price: 59.99, category: 'Apparel', image: 'https://picsum.photos/seed/oversized-hoodie/600/600' },
    { title: 'Denim Jacket', description: 'Classic denim jacket with a clean finish', price: 89.99, category: 'Apparel', image: 'https://picsum.photos/seed/denim-jacket/600/600' },
    { title: 'Cotton Polo', description: 'Smart casual polo in premium cotton', price: 39.99, category: 'Apparel', image: 'https://picsum.photos/seed/cotton-polo/600/600' },
    { title: 'Travel Backpack', description: 'Spacious backpack for business and travel', price: 69.99, category: 'Accessories', image: 'https://picsum.photos/seed/travel-backpack/600/600' },
    { title: 'Leather Wallet', description: 'Slim leather wallet with card slots', price: 44.99, category: 'Accessories', image: 'https://picsum.photos/seed/leather-wallet/600/600' },
    { title: 'Sunglasses', description: 'UV-protective sunglasses with matte frame', price: 54.99, category: 'Accessories', image: 'https://picsum.photos/seed/sunglasses/600/600' },
    { title: 'Minimal Watch', description: 'Modern watch with clean analog design', price: 79.99, category: 'Accessories', image: 'https://picsum.photos/seed/minimal-watch/600/600' },
    { title: 'Smartwatch Pro', description: 'Feature-packed smartwatch with health tracking', price: 199.99, category: 'Electronics', image: 'https://picsum.photos/seed/smartwatch-pro/600/600' },
    { title: 'Wireless Earbuds', description: 'Compact earbuds with rich bass and clear calls', price: 89.99, category: 'Electronics', image: 'https://picsum.photos/seed/wireless-earbuds/600/600' },
    { title: 'Bluetooth Speaker', description: 'Portable speaker with deep sound output', price: 59.99, category: 'Electronics', image: 'https://picsum.photos/seed/bluetooth-speaker/600/600' },
    { title: 'Gaming Mouse', description: 'Ergonomic gaming mouse with RGB lighting', price: 64.99, category: 'Electronics', image: 'https://picsum.photos/seed/gaming-mouse/600/600' },
    { title: 'Ceramic Mug', description: 'Everyday ceramic mug for coffee and tea', price: 14.99, category: 'Home', image: 'https://picsum.photos/seed/ceramic-mug/600/600' },
    { title: 'Desk Lamp', description: 'Minimal desk lamp with warm light', price: 34.99, category: 'Home', image: 'https://picsum.photos/seed/desk-lamp/600/600' },
    { title: 'Throw Pillow', description: 'Soft textured pillow for cozy interiors', price: 19.99, category: 'Home', image: 'https://picsum.photos/seed/throw-pillow/600/600' },
    { title: 'Aroma Diffuser', description: 'Stylish diffuser for relaxation and ambiance', price: 49.99, category: 'Home', image: 'https://picsum.photos/seed/aroma-diffuser/600/600' },
    { title: 'Skincare Kit', description: 'Gentle skincare kit for daily hydration', price: 42.99, category: 'Beauty', image: 'https://picsum.photos/seed/skincare-kit/600/600' },
    { title: 'Face Serum', description: 'Vitamin-rich serum for healthy glow', price: 29.99, category: 'Beauty', image: 'https://picsum.photos/seed/face-serum/600/600' },
    { title: 'Lip Balm Set', description: 'Moisturizing balm set with natural ingredients', price: 16.99, category: 'Beauty', image: 'https://picsum.photos/seed/lip-balm-set/600/600' },
    { title: 'Hair Care Bundle', description: 'Hair care essentials for smooth styling', price: 38.99, category: 'Beauty', image: 'https://picsum.photos/seed/hair-care-bundle/600/600' },
    { title: 'Yoga Mat', description: 'Comfortable non-slip yoga mat', price: 32.99, category: 'Sports', image: 'https://picsum.photos/seed/yoga-mat/600/600' },
    { title: 'Gym Bottle', description: 'Insulated hydration bottle for workouts', price: 22.99, category: 'Sports', image: 'https://picsum.photos/seed/gym-bottle/600/600' },
    { title: 'Resistance Bands', description: 'Portable resistance bands for home fitness', price: 26.99, category: 'Sports', image: 'https://picsum.photos/seed/resistance-bands/600/600' },
    { title: 'Training Backpack', description: 'High-capacity pack for gear and essentials', price: 58.99, category: 'Sports', image: 'https://picsum.photos/seed/training-backpack/600/600' },
    { title: 'Leather Backpack', description: 'Minimal everyday backpack in premium leather', price: 99.99, category: 'Accessories', image: 'https://picsum.photos/seed/leather-backpack/600/600' },
    { title: 'Travel Mug', description: 'Insulated mug for commuting and travel', price: 18.99, category: 'Accessories', image: 'https://picsum.photos/seed/travel-mug/600/600' },
    { title: 'Bluetooth Headset', description: 'Comfortable headset with crystal clear audio', price: 74.99, category: 'Electronics', image: 'https://picsum.photos/seed/bluetooth-headset/600/600' },
    { title: 'Fitness Tracker', description: 'Track activity, sleep, and heart rate', price: 69.99, category: 'Electronics', image: 'https://picsum.photos/seed/fitness-tracker/600/600' },
    { title: 'Desk Organizer', description: 'Neat organizer for pens, notes, and essentials', price: 27.99, category: 'Home', image: 'https://picsum.photos/seed/desk-organizer/600/600' },
    { title: 'Linen Shirt', description: 'Relaxed linen shirt for summer days', price: 45.99, category: 'Apparel', image: 'https://picsum.photos/seed/linen-shirt/600/600' },
    { title: 'Cargo Pants', description: 'Functional cargo pants built for comfort', price: 52.99, category: 'Apparel', image: 'https://picsum.photos/seed/cargo-pants/600/600' },
    { title: 'Shorts Set', description: 'Lightweight shorts set with breathable fabric', price: 31.99, category: 'Apparel', image: 'https://picsum.photos/seed/shorts-set/600/600' },
    { title: 'Striped Tee', description: 'A playful striped tee for casual styling', price: 21.99, category: 'Apparel', image: 'https://picsum.photos/seed/striped-tee/600/600' },
    { title: 'Retro Camera', description: 'Compact retro-inspired digital camera', price: 159.99, category: 'Electronics', image: 'https://picsum.photos/seed/retro-camera/600/600' },
    { title: 'Kitchen Blender', description: 'Powerful personal blender for smoothies', price: 57.99, category: 'Home', image: 'https://picsum.photos/seed/kitchen-blender/600/600' },
    { title: 'Notebook Set', description: 'Premium notebook set with hardbound pages', price: 17.99, category: 'Accessories', image: 'https://picsum.photos/seed/notebook-set/600/600' },
    { title: 'Scented Candle', description: 'Warm scented candle for relaxing evenings', price: 16.99, category: 'Home', image: 'https://picsum.photos/seed/scented-candle/600/600' },
    { title: 'Travel Toiletry Case', description: 'Organized case for grooming essentials', price: 29.99, category: 'Accessories', image: 'https://picsum.photos/seed/travel-toiletry-case/600/600' },
    { title: 'Performance Cap', description: 'Lightweight cap with athletic comfort', price: 19.99, category: 'Sports', image: 'https://picsum.photos/seed/performance-cap/600/600' },
];

export async function GET() {
    await connectDB();
    await product.deleteMany();
    const productwithvectors = await Promise.all(seedProducts.map(async (p) => ({
        ...p,Embeddings:await getEmbedding(`${p.title}\n${p.description}\n${p.category}`)
    })));
    const insertedProducts = await product.insertMany(productwithvectors);

    return Response.json({
        message: 'Products inserted successfully',
        count: insertedProducts.length,
    }, { status: 200 });
}