"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { FaSearch, FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "My-Bookings", path: "/my-bookings" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="navbar fixed w-full top-0 z-40 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <CiMenuBurger size={24} />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? "bg-blue-600 text-white rounded-md"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn btn-ghost text-xl">
          <Image
            className="object-cover rounded-2xl"
            width={80}
            height={35}
            src="/logo.svg"
            alt="navbar logo"
          />
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`px-3 py-2 rounded-md ${
                  pathname === item.path ? "bg-blue-600 text-white" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-x-5">
        {session?.data?.user ? (
          <>
            <div className="flex items-center cursor-pointer gap-x-5">
              <FaShoppingBag size={26} />
              <FaSearch size={26} />
            </div>
            {session?.data?.user.image && (
              <Image
                width={36}
                height={24}
                className="rounded-full"
                src={session?.data?.user.image}
                alt="profile user"
              />
            )}
            <button onClick={() => signOut()} className="btn btn-warning">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-info" href={"/login"}>
              Login
            </Link>
            <Link className="btn btn-outline" href={"/register"}>
              Register
            </Link>
          </>
        )}
        <Link href={"/appointment"} className="btn btn-outline">
          Appointment
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
