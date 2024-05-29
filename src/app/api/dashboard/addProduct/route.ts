import { NextResponse } from "next/server";
import connectMongoDB from "@/utils/mongodb";
import ProductModel from "@/models/Product";
import { ProductDocument } from "@/models/ProductDocument";

// Define a function to add product data
const addProductData = async (newData: ProductDocument) => {
  try {
    // Create a new product document using the provided data
    const newProduct = new ProductModel(newData);

    // Save the new product document to the database
    await newProduct.save();

    // Log the newly added product data
    console.log("New product added:", newProduct);
  } catch (error) {
    console.error("Error adding product data:", error);
    throw error; // Throw the error to handle it at the caller level
  }
};

export const POST = async (request: any) => {
  try {
    // Parse the request body as JSON
    const req = await request.json();
    console.log(req);

    // Connect to the MongoDB database
    await connectMongoDB();

    // Add the new product data to the database
    await addProductData(req);

    // Respond with a success message
    return new NextResponse("Product added successfully", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    // Respond with an error message
    return new NextResponse("Error adding product", { status: 500 });
  }
};
