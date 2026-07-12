import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import connectDB from "@/db/db";
import Product from "@/models/schema";

function getApiKey() {
  return process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
}

function getModel() {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("Missing GOOGLE_API_KEY / GEMINI_API_KEY");
  }

  return new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    temperature: 0.7,
    apiKey,
  });
}

export async function POST(req) {
  try {
    const { query } = await req.json();
    if (!query) {
      return Response.json({ products: [] }, { status: 200 });
    }

    const model = getModel();
    await connectDB();
   
    const messages = [
      new SystemMessage(`You are an e-commerce search assistant. Your task is to extract the core product intent from the user's query and provide 1 to 3 highly relevant search keywords. 
If the user provides a direct item name (like "shoes" or "laptop"), include that exact word as the first keyword, followed by synonyms or related categories (like "footwear", "electronics").
Output ONLY a comma-separated list of keywords. Do not use quotes, punctuation, or any extra text`),
      new HumanMessage(" query: " + query)
    ];

    const aiRes = await model.invoke(messages);
    const rawContent = aiRes.content.trim().replace(/['"`]/g, ""); 
    const keywords = rawContent.split(',').map(k => k.trim()).filter(k => k.length > 0);
    
    console.log("AI generated keywords:", keywords);

    const searchConditions = keywords.flatMap(keyword => [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } }
    ]);

    const result = await Product.find({ $or: searchConditions });
    
    return Response.json({ products: result }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    return Response.json({ message: "Error fetching products", products: [] }, { status: 500 });
  } 
}