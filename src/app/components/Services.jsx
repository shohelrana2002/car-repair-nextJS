import dbConnect, { collectionName } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
const Services = async () => {
  const data = await dbConnect(collectionName.SERVICES).find({}).toArray();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 gap-3">
      {data?.map((i) => (
        <div
          key={i?._id}
          className="card bg-base-100 shadow-xl border-2 border-amber-100 h-full"
        >
          <figure className="w-full h-full p-1">
            <Image
              className="object-cover rounded-2xl"
              width={314}
              height={208}
              src={i?.img}
              alt={i?.title}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title font-extrabold text-red-400">
              $ {i?.price}
            </h2>
            <h2 className="card-title">{i?.title}</h2>
            <p>{i?.description.slice(0, 200)}...</p>
            <div className="card-actions justify-end">
              <Link href={`/services/${i?._id}`} className="btn btn-primary">
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
