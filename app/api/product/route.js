import connectDB from '../../../db/db.js';
import Product from '../../../models/schema.js';

const fallbackProducts = [
  { title: 'Sneakers', description: 'Comfortable and stylish sneakers', price: 99.99, category: 'Footwear', image: 'https://picsum.photos/seed/sneakers/600/600' },
  { title: 'Premium Tee', description: 'Soft cotton t-shirt with modern fit', price: 24.99, category: 'Apparel', image: 'https://picsum.photos/seed/premium-tee/600/600' },
  { title: 'Travel Backpack', description: 'Spacious backpack for business and travel', price: 69.99, category: 'Accessories', image: 'https://picsum.photos/seed/travel-backpack/600/600' },
  { title: 'Smartwatch Pro', description: 'Feature-packed smartwatch with health tracking', price: 199.99, category: 'Electronics', image: 'https://picsum.photos/seed/smartwatch-pro/600/600' },
  { title: 'Ceramic Mug', description: 'Everyday ceramic mug for coffee and tea', price: 14.99, category: 'Home', image: 'https://picsum.photos/seed/ceramic-mug/600/600' },
  { title: 'Skincare Kit', description: 'Gentle skincare kit for daily hydration', price: 42.99, category: 'Beauty', image: 'https://picsum.photos/seed/skincare-kit/600/600' },
  { title: 'Yoga Mat', description: 'Comfortable non-slip yoga mat', price: 32.99, category: 'Sports', image: 'https://picsum.photos/seed/yoga-mat/600/600' },
];

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();

    if (!products.length) {
      return Response.json({ message: 'Products fetched successfully from fallback list', products: fallbackProducts }, { status: 200 });
    }

    return Response.json({ message: 'Products fetched successfully', products }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products:', error.message);
    return Response.json({ message: 'Using demo products while MongoDB is unavailable', products: fallbackProducts }, { status: 200 });
  }
}
