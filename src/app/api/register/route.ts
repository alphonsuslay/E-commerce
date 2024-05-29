import User from "@/models/User";
import connectMongoDB from "@/utils/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, password, firstName, lastName } = await request.json();
  await connectMongoDB();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
