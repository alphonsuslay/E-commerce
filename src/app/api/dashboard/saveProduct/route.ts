import { NextResponse } from "next/server";
import connectMongoDB from "@/utils/mongodb";
import ProductModel from "@/models/Product";
import { ProductDocument } from "@/models/ProductDocument";

// Define a function to update product data
const updateProductData = async (updatedData: ProductDocument) => {
  try {
    // Find the product by ID and update its data
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id: updatedData.id },
      { $set: updatedData },
      { new: true }
    );

    // Log the updated product data
    console.log("Updated product:", updatedProduct);
  } catch (error) {
    console.error("Error updating product data:", error);
  }
};

export const POST = async (request: any) => {
  try {
    const req = await request.json();
    console.log(req);

    await connectMongoDB();
    await updateProductData(req);

    // Respond with a success message
    return new NextResponse("Recieved", { status: 200 });
  } catch (error) {
    return new NextResponse(" Error", { status: 405 });
  }
}
