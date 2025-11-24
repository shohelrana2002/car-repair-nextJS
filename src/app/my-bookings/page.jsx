import BookingTable from "@/components/Table/BookingTable";
import { headers } from "next/headers";

const fetchingData = async () => {
  const res = await fetch("http://localhost:3000/api/services", {
    headers: await headers(),
  });
  const result = await res.json();
  return result;
};
const MyBookingsPage = async () => {
  const data = await fetchingData();
  return (
    <div>
      <BookingTable data={data} />
    </div>
  );
};

export default MyBookingsPage;
