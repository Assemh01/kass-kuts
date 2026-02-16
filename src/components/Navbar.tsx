"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Instagram } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const bookingLinks = {
    dearborn:
      "http://booksy.com/en-us/638291_kass-kuts_barber-shop_23794_dearborn#ba_s=seo",
    farmington:
      "https://booksy.com/en-us/1584930_kass-kuts_barber-shop_23574_farmington?do=invite&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnHNQz1a0vOV-IxiLNZYb4X5pY6eGiHWuIHEbGgPgGYjAjy9fWtQdtjlsjHlc_aem_zH2O7U6-csmVXkxqBnxQ3g&utm_content=link_in_bio&utm_medium=social&utm_source=ig#ba_s=dl_1",
  };

  const IG_URL = "https://instagram.com/kass.kuts";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
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
    return () => window.removeEventListener("open-booking", openBooking);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const links = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const brandBlue =
    "bg-[#4f8dff] hover:bg-[#3f7df5] active:bg-[#356ae6] cursor-pointer";

  const desktopLinkClass = (isScrolled: boolean) =>
    [
      "text-sm font-semibold tracking-wide transition-colors",
      isScrolled
        ? "text-white/70 hover:text-white"
        : "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]",
    ].join(" ");

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
        <Link href="/" className="text-xl font-bold tracking-wide text-white">
          KASS
          <span className="ml-0.5 bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            KUTS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={desktopLinkClass(scrolled)}
            >
              {link.name}
            </a>
          ))}

          {/* Instagram icon */}
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram"
            className={[
              "h-10 w-10 grid place-items-center rounded-full transition",
              scrolled ? "bg-white/5 hover:bg-white/10" : "bg-black/20 hover:bg-black/35",
              "border border-white/10 hover:border-[#4f8dff]/45",
            ].join(" ")}
          >
            <Instagram className="h-5 w-5 text-white/85" />
          </a>

          <button
            onClick={() => setBookingOpen(true)}
            className={`${brandBlue} text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors`}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/85 hover:text-white transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/55 backdrop-blur-2xl transition-opacity duration-200">
          <div className="px-6 py-10 flex flex-col items-center gap-6 text-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-semibold text-white/85 hover:text-white transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
              >
                {link.name}
              </a>
            ))}

            <div className="h-px w-full bg-white/10 my-2" />

            {/* Instagram row */}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="
                w-full max-w-sm mx-auto
                inline-flex items-center justify-center gap-2
                rounded-lg border border-white/10 bg-white/5
                py-3 text-white/85
                hover:text-white hover:border-[#4f8dff]/45 hover:bg-white/10
                transition
              "
              aria-label="Open Instagram"
            >
              <Instagram className="h-5 w-5 text-[#4f8dff]" />
              <span className="font-semibold">@kass.kuts</span>
            </a>


            <button
              className={`${brandBlue} w-full max-w-sm mx-auto text-center text-white py-3 rounded-lg font-semibold`}
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
