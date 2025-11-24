"use client";
import BookingTable from "@/components/Table/BookingTable";
import React, { useEffect, useState } from "react";

const MyBookingsPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("http://localhost:3000/api/services");
      const json = await res.json();
      setData(json);
    };
    loadData();
  }, []);
  return (
    <div>
      <BookingTable data={data} />
    </div>
  );
};

export default MyBookingsPage;
