"use client";

import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { User, Mail, MapPin, Phone, Flag, Home, Database } from "lucide-react";
import { useSession } from "next-auth/react";
import { CiMoneyBill } from "react-icons/ci";

export default function CheckoutForm({ data }) {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { name, email } = session?.data?.user || [];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const checkoutData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      postal: form.postal.value,
      address: form.address.value,
      city: form.city.value,
      country: form.country.value,
      delivery: form.delivery.value,
      price: form.price.value,
      date: form.date.value,
      //   data
      service_id: data?._id,
      title: data?.title,
      image: data?.img,
      services_price: data?.price,
      crete_at: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });
      const data = await res.json();
      console.log(data);
      if (data?.acknowledged > 0) {
        toast.success("Order placed — thank you!");
        form.reset();
      }
    } catch (err) {
      toast.error("Payment failed — try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-6">
      <Toaster />

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800">
            Checkout – {data?.title}
          </h3>
          <p className="text-gray-500">Complete your information below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <User size={18} className="text-gray-600" />
              <input
                readOnly
                defaultValue={name}
                name="name"
                placeholder="Full Name"
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>

            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <Mail size={18} className="text-gray-600" />
              <input
                defaultValue={email}
                readOnly
                name="email"
                placeholder="Email"
                type="email"
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <CiMoneyBill size={18} className="text-gray-600" />
              <input
                defaultValue={`$ ${data?.price}`}
                readOnly
                name="price"
                placeholder="price"
                type="text"
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <Database size={18} className="text-gray-600" />
              <input
                name="date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <Phone size={18} className="text-gray-600" />
              <input
                name="phone"
                required
                placeholder="Phone Number"
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>

            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <MapPin size={18} className="text-gray-600" />
              <input
                required
                name="postal"
                placeholder="Postal Code"
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>
          </div>

          {/* Address */}
          <label className="flex items-start gap-2 bg-gray-100 p-3 rounded-lg border">
            <Home size={18} className="text-gray-600 mt-1" />
            <textarea
              required
              name="address"
              placeholder="Street Address"
              className="textarea w-full bg-transparent focus:outline-none"
            />
          </label>

          {/* City / Country / Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <MapPin size={18} className="text-gray-600" />
              <input
                required
                name="city"
                placeholder="City"
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>

            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <Flag size={18} className="text-gray-600" />
              <input
                required
                readOnly
                defaultValue={"Bangladesh"}
                name="country"
                placeholder="Country"
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>

            <select
              name="delivery"
              className="select select-bordered w-full bg-gray-100"
            >
              <option>Standard Delivery</option>
              <option>Express Delivery</option>
              <option>Premium Delivery</option>
            </select>
          </div>

          <div className="divider"></div>

          {/* Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full text-lg rounded-xl shadow-md ${
                loading ? "loading" : ""
              }`}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
