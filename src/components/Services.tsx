"use client";

import { useMemo } from "react";
import {
  Scissors,
  Sparkles,
  User,
  Baby,
  Palette,
  Wand2,
  Droplets,
} from "lucide-react";

type ServiceIcon =
  | "cut"
  | "fade"
  | "beard"
  | "kids"
  | "brows"
  | "color"
  | "wax"
  | "wash"
  | "shave";

type ServiceItem = {
  name: string;
  price: number;
  duration: string;
  desc: string;
  icon: ServiceIcon;
};

function ServiceIcon({ type }: { type: ServiceIcon }) {
  const baseClass = "w-5 h-5 text-[#4f8dff]";

  switch (type) {
    case "cut":
      return <Scissors className={baseClass} />;
    case "fade":
      return <Sparkles className={baseClass} />;
    case "beard":
      return <User className={baseClass} />;
    case "kids":
      return <Baby className={baseClass} />;
    case "brows":
      return <Wand2 className={baseClass} />;
    case "color":
      return <Palette className={baseClass} />;
    case "wash":
      return <Droplets className={baseClass} />;
    case "shave":
      return <Scissors className={baseClass} />;
    default:
      return <Scissors className={baseClass} />;
  }
}

export function Services() {
  const BOOKING_URL =
    "https://booksy.com/en-us/1584930_kass-kuts_barber-shop_23574_farmington?do=invite&utm_content=link_in_bio&utm_medium=social&utm_source=ig#ba_s=dl_1";

  const data: { label: string; items: ServiceItem[] } = useMemo(
    () => ({
      label: "Farmington Hills",
      items: [
        {
          name: "Haircut",
          price: 30,
          duration: "30 min",
          desc: "Precision cut tailored to your style.",
          icon: "cut",
        },
        {
          name: "Beard",
          price: 15,
          duration: "15 min",
          desc: "Clean shaping and sharp detailing.",
          icon: "beard",
        },
        {
          name: "Haircut & beard",
          price: 40,
          duration: "45 min",
          desc: "Full grooming package, clean and sharp.",
          icon: "beard",
        },
        {
          name: "Kid's haircut",
          price: 20,
          duration: "30 min",
          desc: "Comfortable cut for younger clients.",
          icon: "kids",
        },
        {
          name: "Line up",
          price: 20,
          duration: "20 min",
          desc: "Crisp edges and clean finish.",
          icon: "fade",
        },
        {
          name: "Men's haircut",
          price: 40,
          duration: "30 min",
          desc: "Classic cut with a modern finish.",
          icon: "cut",
        },
        {
          name: "Eyebrow shaping",
          price: 10,
          duration: "10 min",
          desc: "Refined shape for a sharper look.",
          icon: "brows",
        },
        {
          name: "Skin fade",
          price: 40,
          duration: "30 min",
          desc: "Smooth fade with tight blend work.",
          icon: "fade",
        },
        {
          name: "Buzz cut",
          price: 30,
          duration: "30 min",
          desc: "Clean, even cut with sharp edges.",
          icon: "cut",
        },
        {
          name: "Head shave & beard trim",
          price: 50,
          duration: "45 min",
          desc: "Polished head shave with beard cleanup.",
          icon: "shave",
        },
        {
          name: "Hair wash",
          price: 10,
          duration: "10 min",
          desc: "Quick wash to finish fresh.",
          icon: "wash",
        },
      ],
    }),
    []
  );

  return (
    <section id="services" className="relative scroll-mt-28 bg-black -mt-20 md:-mt-2">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-12 pb-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Services & Pricing
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              Explore services, prices, and timing.
            </p>
          </div>
        </div>

        {/* Subheader line + Book Now */}
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="inline-block">
            <div className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
              {data.label}
            </div>

            <div className="relative mt-2 h-[3px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff]/70 to-transparent blur-xl" />
            </div>
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center justify-center rounded-xl
              bg-[#4f8dff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3f7df5]
              shadow-[0_18px_50px_rgba(79,141,255,0.22)]
              hover:shadow-[0_22px_70px_rgba(79,141,255,0.28)]
              hover:-translate-y-[1px]
              transition-all"
          >
            Book Now
          </a>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((s) => (
            <div
              key={s.name}
              className="
                rounded-2xl border border-white/10
                bg-gradient-to-b from-white/7 to-white/3
                backdrop-blur-md
                p-5
                transition-all
                hover:-translate-y-[2px]
                hover:border-white/20
                hover:bg-gradient-to-b hover:from-[#4f8dff]/10 hover:to-white/3
                hover:shadow-[0_18px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(79,141,255,0.18)]
              "
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-[#4f8dff]/12 ring-1 ring-[#4f8dff]/25 shadow-[0_10px_30px_rgba(79,141,255,0.12)] p-3">
                  <ServiceIcon type={s.icon} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white truncate">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/60 line-clamp-2">
                    {s.desc}
                  </p>

                  <div className="mt-4 h-px w-full bg-white/8" />

                  <div className="mt-4 flex items-end justify-between">
                    <div className="text-lg font-bold text-white">${s.price}</div>
                    <div className="text-xs text-white/50">{s.duration}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
