import CheckoutForm from "@/components/Form/CheckoutForm";
import React from "react";

export default async function CheckoutPage({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/services/${id}`);
  const data = await res.json();
  return (
    <div>
      <CheckoutForm data={data} />
    </div>
  );
}
