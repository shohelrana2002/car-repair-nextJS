import { DeleteIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaEdit } from "react-icons/fa";

const BookingTable = ({ data }) => {
  const handleDelete = async (id) => {
    alert(id);
  };
  const handleUpdate = async (id) => {
    alert(id);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Price</th>
            <th>Date</th>
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
              <td>
                {new Date(item?.crete_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td
                className="cursor-pointer"
                onClick={() => handleUpdate(item?._id)}
              >
                <FaEdit size={24} />
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleDelete(item?._id)}
              >
                <DeleteIcon size={30} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
