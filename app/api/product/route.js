import connectDB from '../../../db/db.js';
import Product from '../../../models/schema.js';

const fallbackProducts = [
  { title: 'Sneakers', description: 'Comfortable and stylish sneakers', price: 99.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60' },
  { title: 'Premium Tee', description: 'Soft cotton t-shirt with modern fit', price: 24.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60' },
  { title: 'Travel Backpack', description: 'Spacious backpack for business and travel', price: 69.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60' },
  { title: 'Smartwatch Pro', description: 'Feature-packed smartwatch with health tracking', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60' },
  { title: 'Ceramic Mug', description: 'Everyday ceramic mug for coffee and tea', price: 14.99, category: 'Home', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60' },
  { title: 'Skincare Kit', description: 'Gentle skincare kit for daily hydration', price: 42.99, category: 'Beauty', image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&auto=format&fit=crop&q=60' },
  { title: 'Yoga Mat', description: 'Comfortable non-slip yoga mat', price: 32.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60' },
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
