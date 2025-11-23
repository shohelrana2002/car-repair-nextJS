"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionName } from "@/lib/dbConnect";

export default async function loginUser(payload) {
  const { email, password } = payload;
  const userCollection = dbConnect(collectionName.USERS);
  const user = await userCollection.findOne({ email });
  if (!user) return null;
  const isPasswordOk = await bcrypt.compare(password, user.password);

  if (!isPasswordOk) return null;
  return user;
}
