// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-green-600 border-t-2 border-green-600 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-400">
            Products
          </Link>
          <Link href="/components/About" className="hover:text-gray-400">
            About
          </Link>
          <Link href="/components/Contact" className="hover:text-gray-400">
            Contact
          </Link>
          <Link href="/#popular" className="hover:text-gray-400">
            Popular
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/ali-hassan-16a5682b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/al1hk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
