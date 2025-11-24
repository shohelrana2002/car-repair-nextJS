import BookingUpdateForm from "@/components/Form/BookingUpdateForm";
import { headers } from "next/headers";

export default async function BookingUpdatePage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/my-booking/${id}`, {
    headers: await headers(),
  });
  const data = await res.json();

  return (
    <>
      <BookingUpdateForm data={data} />
    </>
  );
}
