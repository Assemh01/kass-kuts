"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [bookingOpen, setBookingOpen] = useState(false);

  const bookingLinks = {
    dearborn: "http://booksy.com/en-us/638291_kass-kuts_barber-shop_23794_dearborn#ba_s=seo",
    farmington: "https://booksy.com/en-us/1584930_kass-kuts_barber-shop_23574_farmington?do=invite&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnHNQz1a0vOV-IxiLNZYb4X5pY6eGiHWuIHEbGgPgGYjAjy9fWtQdtjlsjHlc_aem_zH2O7U6-csmVXkxqBnxQ3g&utm_content=link_in_bio&utm_medium=social&utm_source=ig#ba_s=dl_1",
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll(); // set correct state on load/refresh
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false); // close mobile menu on desktop
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const openBooking = () => setBookingOpen(true);

    window.addEventListener("open-booking", openBooking);

    return () => {
      window.removeEventListener("open-booking", openBooking);
    };
  }, []);



  const links = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  // Spiral-inspired blue (tweak later if needed)
 const brandBlue =
  "bg-[#4f8dff] hover:bg-[#3f7df5] active:bg-[#356ae6] cursor-pointer";

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/55 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      {scrolled && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      )}
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

          <button
            onClick={() => setBookingOpen(true)}
            className={`${brandBlue} text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors`}
          >
            Book Now
          </button>
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

            <button
              className={`${brandBlue} text-center text-white py-3 rounded-lg font-semibold`}
              onClick={() => {
                setOpen(false);
                setBookingOpen(true);
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        links={bookingLinks}
      />
    </nav>
  );
}
