"use client";

import Link from "next/link";
import { Instagram, MapPin, Clock, ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10 text-white/70 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="text-lg font-bold tracking-wide">
            <span className="text-white">KASS</span>
            <span
              className="
                ml-0.5
                bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-500
                bg-clip-text text-transparent
                drop-shadow-[0_0_6px_rgba(255,255,255,0.18)]
              "
            >
              KUTS
            </span>
          </div>
          <p className="mt-3 text-sm leading-6">
            Precision Cuts. Modern Style. Real Confidence.
          </p>

          <a
            href="https://booksy.com/en-us/dl/show-business/1584930"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-5 py-3 bg-[#4f8dff] hover:bg-[#3f7df5] text-white text-sm font-semibold rounded-lg transition-all hover:scale-105"
          >
            Book Appointment
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide">
            Quick Links
          </h4>

          <ul className="mt-4 space-y-2 text-sm leading-6">
            <li>
              <a href="#services" className="hover:text-[#4f8dff] transition">
                Services
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-[#4f8dff] transition">
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-[#4f8dff] transition"
              >
                Reviews
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#4f8dff] transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide">
            Locations
          </h4>

          <div className="mt-4 space-y-5 text-sm leading-6">
            <div>
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <MapPin size={16} />
                Dearborn
              </div>
              <p className="mt-1">
                12345 Michigan Ave
                <br />
                Dearborn, MI
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <MapPin size={16} />
                Farmington Hills
              </div>
              <p className="mt-1">
                67890 Orchard Lake Rd
                <br />
                Farmington Hills, MI
              </p>
            </div>
          </div>
        </div>

        {/* Hours + Social */}
        <div>
          <h4 className="text-white text-sm font-semibold tracking-wide">
            Hours
          </h4>

          <div className="mt-4 flex items-start gap-2 text-sm leading-6">
            <Clock size={16} className="mt-1 text-white/70" />
            <div>
              Mon – Sat: 9AM – 7PM
              <br />
              Sunday: Closed
            </div>
          </div>

          <h5 className="mt-4 text-white text-sm font-semibold tracking-wide">
            Follow Us
          </h5>

          <a
            href="https://www.instagram.com/kass.kuts"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm leading-6 hover:text-[#4f8dff] transition"
          >
            <Instagram size={18} />
            Instagram
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-white/50 leading-5">
          © {year} Kass Kuts. All rights reserved.
          <span className="mx-2">•</span>
          Built by{" "}
          <Link
            href="https://assem-alhomsi.vercel.app"
            target="_blank"
            className="hover:text-[#4f8dff] transition"
          >
            Assem Alhomsi
          </Link>
        </div>
      </div>
    </footer>
  );
}
