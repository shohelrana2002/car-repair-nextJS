import authOptions from "@/lib/authOptions";
import dbConnect, { collectionName } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  const query = { _id: new ObjectId(id) };
  const { postal, address, city, delivery, phone, date } = await req.json();
  const updateDoc = {
    $set: {
      phone,
      postal,
      address,
      city,
      delivery,
      date,
    },
  };
  const session = await getServerSession(authOptions);
  const bookingCollection = dbConnect(collectionName.CHECKOUT);
  const findEmail = await bookingCollection.findOne(query);
  const isOwner = session?.user?.email === findEmail?.email;
  if (isOwner) {
    const result = await bookingCollection.updateOne(query, updateDoc);
    revalidatePath("/my-bookings");
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
};

export const GET = async (req, { params }) => {
  const { id } = await params;
  const bookingCollection = dbConnect(collectionName.CHECKOUT);
  const session = await getServerSession(authOptions);
  const findEmail = await bookingCollection.findOne({ _id: new ObjectId(id) });
  const isOwner = session?.user?.email === findEmail?.email;
  if (isOwner) {
    const result = await bookingCollection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } else {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
};
