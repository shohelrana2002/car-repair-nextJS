import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import React from "react";

const ServicesDetails = async ({ params }) => {
  const { id } = await params;
  const data = await dbConnect("services").findOne({ _id: new ObjectId(id) });

  return (
    <div>
      <div></div>
      <div>
        <Image src={data?.img} width={752} height={400} alt={data?.title} />
        <p>{data?.title}</p>
      </div>
      <div></div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default ServicesDetails;
