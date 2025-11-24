"use server";

import authOptions from "@/lib/authOptions";
import dbConnect, { collectionName } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = await params;
  const query = { _id: new ObjectId(id) };
  const checkoutCollection = dbConnect(collectionName.CHECKOUT);
  // validation here
  const session = await getServerSession(authOptions);
  const currentBooking = await checkoutCollection.findOne(query);
  const isOwner = session?.user?.email == currentBooking.email;

  if (isOwner) {
    const result = await checkoutCollection.deleteOne(query);
    revalidatePath("/my-bookings");
    return NextResponse.json(result);
  } else {
    return NextResponse.json(
      { success: false, message: "unauthorized" },
      { status: 401 }
    );
  }
};

export const GET = async (req, { params }) => {
  const { id } = await params;
  const userCollection = dbConnect(collectionName.SERVICES);
  const result = await userCollection.findOne({ _id: new ObjectId(id) });
  return NextResponse.json(result);
};
