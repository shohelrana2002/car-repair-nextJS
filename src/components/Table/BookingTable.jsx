import DeleteButton from "@/app/my-bookings/components/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const BookingTable = ({ data }) => {
  if (data?.length > 0) {
    return (
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center my-3">
          All Bookings
        </h2>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Service Price</th>
              <th>Contact</th>
              <th>Service Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <Image
                    className="rounded-2xl"
                    src={item?.image}
                    width={60}
                    height={50}
                    alt={item?.title}
                  />
                </td>
                <td>{item?.price}</td>
                <td>{item?.phone}</td>
                <td>{new Date(item?.date).toLocaleDateString()}</td>

                <td className="cursor-pointer">
                  <Link href={`/my-bookings/${item?._id}`}>
                    <FaEdit size={24} />
                  </Link>
                </td>
                <td className="cursor-pointer">
                  <DeleteButton id={item?._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <p className="text-red-400 text-center">No Data Found</p>;
  }
};

export default BookingTable;
