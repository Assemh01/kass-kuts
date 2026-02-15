"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Kass Kuts Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Side darkening */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/70" />

        {/* Edge vignette */}
        <div className="absolute inset-0 [background:radial-gradient(80%_70%_at_35%_45%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.8)_100%)]" />

        {/* 👇 NEW spotlight behind headline */}
        <div className="absolute inset-0 [background:radial-gradient(55%_40%_at_50%_45%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0)_75%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Precision Cuts.
          <br />
          <span
            className="text-[#4f8dff] drop-shadow-[0_12px_34px_rgba(79,141,255,0.55)]"
            style={{ WebkitTextStroke: "0.7px rgba(0,0,0,0.55)" }}
          >
            Premium Style.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl font-semibold text-white max-w-3xl mx-auto leading-relaxed tracking-wide drop-shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
        >
          Experience modern grooming crafted with precision, detail, and style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
        >
          <a
            href="https://booksy.com/en-us/dl/show-business/1584930?utm_medium=c2c_referral"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#4f8dff] hover:bg-[#3f7df5] active:bg-[#356ae6] text-white font-semibold rounded-lg transition-all hover:scale-105"
          >
            Book Appointment
          </a>

          <a
            href="#services"
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-all"
          >
            View Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
