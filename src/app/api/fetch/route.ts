import connectMongoDB from "@/utils/mongodb";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    await connectMongoDB();
    const products = await ProductModel.find();

    // Cache-Control header with revalidate set to the desired interval in seconds
    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate", // Example: Cache for 60 seconds, then revalidate
      },
    });
  } catch (error) {
    return new NextResponse("Error: " + error, { status: 500 });
  }
}
