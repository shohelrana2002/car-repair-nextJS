"use client";
import Image from "next/image";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
const Navbar = () => {
  const navItems = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/about"}>About</Link>
      </li>
      <li>
        <Link href={"/services"}>Services</Link>
      </li>
      <li>
        <Link href={"/blog"}>Blog</Link>
      </li>
      <li>
        <Link href={"/contact"}>Contact</Link>
      </li>
    </>
  );
  return (
    <div className="navbar fixed w-full top-0 z-40 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <CiMenuBurger size={24} />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>

        <button className="btn btn-ghost text-xl">
          <Image
            className="object-cover rounded-2xl"
            width={80}
            height={35}
            src="/logo.svg"
            alt={"navbar logo"}
          />
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end gap-x-5">
        <div className="flex items-center cursor-pointer gap-x-5">
          <FaShoppingBag size={26} />
          <FaSearch size={26} />
        </div>

        <Link href={"/appointment"} className="btn btn-outline">
          Appointment
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
