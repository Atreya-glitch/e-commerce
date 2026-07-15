import connectDB from '../../../db/db.js';
import Product from '../../../models/schema.js';
import { GoogleGenAI } from '@google/genai';

function getApiKey() {
  return process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
}

function getAiClient() {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error('Missing GOOGLE_API_KEY / GEMINI_API_KEY');
  }

  return new GoogleGenAI({ apiKey });
}

async function getEmbedding(text) {
  const ai = getAiClient();
  const response = await ai.models.embedContent({
    model: 'text-embedding-004',
    contents: text,
  });
  return response.embeddings[0].values;
}

const seedProducts = [
  { title: 'Sneakers', description: 'Comfortable and stylish sneakers', price: 99.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60' },
  { title: 'Running Shoes', description: 'Lightweight running shoes for daily workouts', price: 119.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
  { title: 'Hiking Boots', description: 'Durable hiking boots with strong grip', price: 149.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1543076447-2152f94f54b7?w=500&auto=format&fit=crop&q=60' },
  { title: 'Canvas Sneakers', description: 'Classic casual sneakers for everyday wear', price: 84.99, category: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60' },
  { title: 'Premium Tee', description: 'Soft cotton t-shirt with modern fit', price: 24.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60' },
  { title: 'Oversized Hoodie', description: 'Cozy oversized hoodie for all seasons', price: 59.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60' },
  { title: 'Denim Jacket', description: 'Classic denim jacket with a clean finish', price: 89.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60' },
  { title: 'Cotton Polo', description: 'Smart casual polo in premium cotton', price: 39.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60' },
  { title: 'Travel Backpack', description: 'Spacious backpack for business and travel', price: 69.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60' },
  { title: 'Leather Wallet', description: 'Slim leather wallet with card slots', price: 44.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627124118303-622c1d8c48f5?w=500&auto=format&fit=crop&q=60' },
  { title: 'Sunglasses', description: 'UV-protective sunglasses with matte frame', price: 54.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60' },
  { title: 'Minimal Watch', description: 'Modern watch with clean analog design', price: 79.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
  { title: 'Smartwatch Pro', description: 'Feature-packed smartwatch with health tracking', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60' },
  { title: 'Wireless Earbuds', description: 'Compact earbuds with rich bass and clear calls', price: 89.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60' },
  { title: 'Bluetooth Speaker', description: 'Portable speaker with deep sound output', price: 59.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60' },
  { title: 'Gaming Mouse', description: 'Ergonomic gaming mouse with RGB lighting', price: 64.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60' },
  { title: 'Ceramic Mug', description: 'Everyday ceramic mug for coffee and tea', price: 14.99, category: 'Home', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60' },
  { title: 'Desk Lamp', description: 'Minimal desk lamp with warm light', price: 34.99, category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60' },
  { title: 'Throw Pillow', description: 'Soft textured pillow for cozy interiors', price: 19.99, category: 'Home', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=60' },
  { title: 'Aroma Diffuser', description: 'Stylish diffuser for relaxation and ambiance', price: 49.99, category: 'Home', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60' },
  { title: 'Skincare Kit', description: 'Gentle skincare kit for daily hydration', price: 42.99, category: 'Beauty', image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&auto=format&fit=crop&q=60' },
  { title: 'Face Serum', description: 'Vitamin-rich serum for healthy glow', price: 29.99, category: 'Beauty', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60' },
  { title: 'Lip Balm Set', description: 'Moisturizing balm set with natural ingredients', price: 16.99, category: 'Beauty', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60' },
  { title: 'Hair Care Bundle', description: 'Hair care essentials for smooth styling', price: 38.99, category: 'Beauty', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60' },
  { title: 'Yoga Mat', description: 'Comfortable non-slip yoga mat', price: 32.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60' },
  { title: 'Gym Bottle', description: 'Insulated hydration bottle for workouts', price: 22.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60' },
  { title: 'Resistance Bands', description: 'Portable resistance bands for home fitness', price: 26.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60' },
  { title: 'Training Backpack', description: 'High-capacity pack for gear and essentials', price: 58.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60' },
  { title: 'Leather Backpack', description: 'Minimal everyday backpack in premium leather', price: 99.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60' },
  { title: 'Travel Mug', description: 'Insulated mug for commuting and travel', price: 18.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=500&auto=format&fit=crop&q=60' },
  { title: 'Bluetooth Headset', description: 'Comfortable headset with crystal clear audio', price: 74.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
  { title: 'Fitness Tracker', description: 'Track activity, sleep, and heart rate', price: 69.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60' },
  { title: 'Desk Organizer', description: 'Neat organizer for pens, notes, and essentials', price: 27.99, category: 'Home', image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?w=500&auto=format&fit=crop&q=60' },
  { title: 'Linen Shirt', description: 'Relaxed linen shirt for summer days', price: 45.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60' },
  { title: 'Cargo Pants', description: 'Functional cargo pants built for comfort', price: 52.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=500&auto=format&fit=crop&q=60' },
  { title: 'Shorts Set', description: 'Lightweight shorts set with breathable fabric', price: 31.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60' },
  { title: 'Striped Tee', description: 'A playful striped tee for casual styling', price: 21.99, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60' },
  { title: 'Retro Camera', description: 'Compact retro-inspired digital camera', price: 159.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60' },
  { title: 'Kitchen Blender', description: 'Powerful personal blender for smoothies', price: 57.99, category: 'Home', image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=500&auto=format&fit=crop&q=60' },
  { title: 'Notebook Set', description: 'Premium notebook set with hardbound pages', price: 17.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=60' },
  { title: 'Scented Candle', description: 'Warm scented candle for relaxing evenings', price: 16.99, category: 'Home', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=60' },
  { title: 'Travel Toiletry Case', description: 'Organized case for grooming essentials', price: 29.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60' },
  { title: 'Performance Cap', description: 'Lightweight cap with athletic comfort', price: 19.99, category: 'Sports', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60' },
];

const unsplashImages = {
  Footwear: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60',
  ],
  Apparel: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60',
  ],
  Accessories: [
    'https://images.unsplash.com/photo-1627124118303-622c1d8c48f5?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8da?w=500&auto=format&fit=crop&q=60',
  ],
  Electronics: [
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60',
  ],
  Home: [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1591123720164-de1348028a82?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=60',
  ],
  Beauty: [
    'https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60',
  ],
  Sports: [
    'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60',
  ]
};

export async function GET() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return Response.json({ message: 'Missing GOOGLE_API_KEY / GEMINI_API_KEY' }, { status: 500 });
    }

    await connectDB();
    await Product.deleteMany({});

    const categories = ['Footwear', 'Apparel', 'Accessories', 'Electronics', 'Home', 'Beauty', 'Sports'];
    const adjectives = ['Premium', 'Classic', 'Modern', 'Sleek', 'Minimal', 'Durable', 'Luxury', 'Essential', 'Pro', 'Smart', 'Cozy', 'Ergonomic', 'Vintage', 'Elite', 'Ultra'];
    const nouns = ['Collection', 'Edition', 'Series', 'Kit', 'Bundle', 'Pack', 'Gear', 'Set', 'Design', 'Model', 'Version', 'Essential', 'Piece', 'Item'];
    
    const generatedProducts = [];
    for (let i = 0; i < 50; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const price = (Math.random() * 200 + 10).toFixed(2);
      
      const title = `${adj} ${category} ${noun} ${i + 1}`;
      const categoryImages = unsplashImages[category] || [];
      const image = categoryImages[i % categoryImages.length] || 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60';

      generatedProducts.push({
        title,
        description: `A highly sought-after ${category.toLowerCase()} item featuring ${adj.toLowerCase()} design and exceptional quality.`,
        price: parseFloat(price),
        category: category,
        image
      });
    }

    const allProducts = [...seedProducts, ...generatedProducts];
    const productsWithEmbeddings = [];
    for (const p of allProducts) {
      try {
        const textToEmbed = `${p.title}\n${p.description}\n${p.category}`;
        const embedding = await getEmbedding(textToEmbed);
        productsWithEmbeddings.push({ ...p, Embeddings: embedding });
      } catch (e) {
        console.error(`Failed to embed product: ${p.title}`, e);
        productsWithEmbeddings.push(p);
      }
    }

    const insertedProducts = await Product.insertMany(productsWithEmbeddings);

    return Response.json({
      message: 'Products inserted successfully with embeddings',
      count: insertedProducts.length,
    }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to insert products', error: error.message }, { status: 500 });
  }
}
