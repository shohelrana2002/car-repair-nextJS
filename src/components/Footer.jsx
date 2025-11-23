"use client";
import Link from "next/link";
import { FaFacebook, FaHashtag, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className=" flex flex-col justify-center items-center bg-neutral text-neutral-content p-10">
        <div>
          <nav>
            <h6 className="footer-title">Social Contact</h6>
            <div className="flex  gap-4">
              <Link href={"/"}>
                <FaFacebook size={30} />
              </Link>
              <Link href={"/"}>
                <FaTwitter size={30} />
              </Link>
              <Link href={"/"}>
                <FaYoutube size={30} />
              </Link>
            </div>
          </nav>
        </div>
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <strong className="cursor-pointer hover:text-green-500">
              Md. Shohel Rana
            </strong>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
