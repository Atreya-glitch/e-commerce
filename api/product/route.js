import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import product from "@models/product";
async function get(){
        await connectToDB();
        const products= product.find({});
        return NextResponse.json(products,{status:200});
        if(!products) return NextResponse.json({message:"No products found"},{status:404});
}