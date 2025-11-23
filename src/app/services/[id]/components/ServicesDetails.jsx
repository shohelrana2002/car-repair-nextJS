import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ServicesDetails = async ({ params }) => {
  const { id } = await params;
  const data = await dbConnect("services").findOne({ _id: new ObjectId(id) });

  return (
    <div className="container mx-auto">
      <div className="relative w-full my-12 h-[300px]">
        <Image
          src="/banner.jpg"
          alt="banner image"
          width={1137}
          height={300}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          {/* Heading */}
          <h3 className="text-white text-3xl mt-1 md:mt-36 font-semibold text-left ">
            Service Details
          </h3>

          {/* Breadcrumb / Button at bottom */}
          <div className="mt-auto mb-4 mx-auto">
            <Link
              href={"/services"}
              className="bg-blue-600 cursor-pointer p-4 text-white  rounded-tl-full  rounded-tr-full  rounded-t-none rounded-tr-0"
            >
              Home / Service Details
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-2">
        <div className="col-span-8">
          <Image
            className="rounded-2xl"
            src={data?.img}
            width={802}
            height={400}
            alt={data?.title}
          />
          <div>
            <p className="text-2xl font-semibold my-2">{data?.title}</p>
            <p>{data?.description}</p>
            <div className="grid grid-cols-2 gap-2">
              {data?.facility.map((i, index) => (
                <div
                  className="card bg-[#f0eded] border-t-2 p-4 border-orange-400"
                  key={index}
                >
                  <h4 className="text-xl font-semibold">{i?.name}</h4>
                  <p className="font-normal text-xs">{i?.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-blend-hue col-span-4">
          <h3 className="text-xl font-extrabold my-6 text-center md:text-5xl ">
            Services
          </h3>
          {data?.facility?.map((i, index) => (
            <div key={index}>
              <div className="flex justify-between flex-col">
                <button className="btn my-5 btn-info w-full">
                  {i?.name}
                  <span>
                    <FaArrowRight size={20} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesDetails;
