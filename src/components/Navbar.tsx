"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  // Spiral-inspired blue (tweak later if needed)
 const brandBlue =
  "bg-[#4f8dff] hover:bg-[#3f7df5] active:bg-[#356ae6]";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          KASS
          <span
            className="
              ml-0.5
              bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-500
              bg-clip-text text-transparent
              drop-shadow-[0_0_6px_rgba(255,255,255,0.12)]
            "
          >
            KUTS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://booksy.com/en-us/dl/show-business/1584930?utm_medium=c2c_referral"
            target="_blank"
            rel="noopener noreferrer"
            className={`${brandBlue} text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105`}
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg text-gray-300 hover:text-white"
              >
                {link.name}
              </a>
            ))}

            <a
              href="https://YOUR_BOOKING_LINK_HERE"
              className={`${brandBlue} text-center text-white py-3 rounded-lg font-semibold`}
              onClick={() => setOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
