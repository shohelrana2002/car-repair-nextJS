import React from "react";
import ServicesDetails from "./components/ServicesDetails";

export default function ServiceDetailsPage({ params }) {
  return (
    <div>
      <ServicesDetails params={params} />
    </div>
  );
}
