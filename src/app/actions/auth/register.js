"use server";
import dbConnect, { collectionName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
export default async function register(payload) {
  try {
    const { email, password } = payload;
    if (!email || !password) return null;

    const userCollection = dbConnect(collectionName.USERS);
    const isExist = await userCollection.findOne({ email });

    if (!isExist) {
      const passwordHash = await bcrypt.hash(password, 10);
      payload.password = passwordHash;
      const result = await userCollection.insertOne(payload);
      result.insertedId = result.insertedId.toString();
      return result;
    }
    return null;
  } catch (error) {
    console.log("register actions error", error);
  }
}
