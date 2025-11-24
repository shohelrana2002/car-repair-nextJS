"use client";
import { DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    // SweetAlert Confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/services/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        router.refresh();
      } else {
        Swal.fire("Error!", "Delete failed!", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <DeleteIcon
      onClick={handleDelete}
      size={30}
      className="cursor-pointer text-red-500 hover:text-red-700"
    />
  );
}
