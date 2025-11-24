"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { User, Mail, MapPin, Phone, Flag, Home, Database } from "lucide-react";
import { useSession } from "next-auth/react";
import { CiMoneyBill } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function BookingUpdateForm({ data }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { name, email } = session?.data?.user || [];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const checkoutData = {
      postal: form.postal.value,
      address: form.address.value,
      city: form.city.value,
      delivery: form.delivery.value,
      date: form.date.value,
      phone: form.phone.value,
      crete_at: new Date().toISOString(),
    };

    setLoading(true);
    const id = data?._id;
    try {
      const res = await fetch(`http://localhost:3000/api/my-booking/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });
      const data = await res.json();
      console.log(data);
      if (data?.modifiedCount > 0) {
        router.push("/my-bookings");
        toast.success("Updated successfully");
        form.reset();
      }
    } catch (err) {
      toast.error("Something went wrong");
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
            Updated Form – {data?.title}
          </h3>
          <p className="text-gray-500">Update your information below</p>
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
                defaultValue={`${data?.price}`}
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
                required
                name="date"
                type="date"
                defaultValue={
                  data?.date
                    ? new Date(data.date).toISOString().split("T")[0]
                    : ""
                }
                className="input w-full bg-transparent focus:outline-none"
              />
            </label>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
              <Phone size={18} className="text-gray-600" />
              <input
                defaultValue={data?.phone}
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
                defaultValue={data?.postal}
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
              defaultValue={data?.address}
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
                defaultValue={data?.city}
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
              defaultValue={data?.delivery}
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
              {loading ? "Processing..." : "Updated Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
