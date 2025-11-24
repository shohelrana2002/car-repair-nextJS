"use server";

import authOptions from "@/lib/authOptions";
import dbConnect, { collectionName } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  const session = await getServerSession(authOptions);
  if (session) {
    const email = session?.user?.email;
    const checkoutCollection = dbConnect(collectionName.CHECKOUT);
    const findEmail = await checkoutCollection.find({ email }).toArray();
    return NextResponse.json(findEmail);
  }
  //
  return NextResponse.json({});
};
export const POST = async (req) => {
  const data = await req.json();
  const servicesCollection = dbConnect(collectionName.CHECKOUT);
  const result = await servicesCollection.insertOne(data);
  return NextResponse.json(result);
};
