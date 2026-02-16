"use client";

import { useMemo, useState } from "react";
import {
  Scissors,
  Sparkles,
  User,
  Baby,
  Palette,
  Wand2,
  Droplets,
} from "lucide-react";

type LocationKey = "dearborn" | "farmington";

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
  const [location, setLocation] = useState<LocationKey>("farmington");

  // ✅ Booksy links per location (Services button will open the selected one directly)
  const bookingLinks: Record<LocationKey, string> = {
    dearborn:
      "http://booksy.com/en-us/638291_kass-kuts_barber-shop_23794_dearborn#ba_s=seo",
    farmington:
      "https://booksy.com/en-us/1584930_kass-kuts_barber-shop_23574_farmington?do=invite&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnHNQz1a0vOV-IxiLNZYb4X5pY6eGiHWuIHEbGgPgGYjAjy9fWtQdtjlsjHlc_aem_zH2O7U6-csmVXkxqBnxQ3g&utm_content=link_in_bio&utm_medium=social&utm_source=ig#ba_s=dl_1",
  };

  const openSelectedLocation = () => {
    const url = bookingLinks[location];
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const data: Record<LocationKey, { label: string; items: ServiceItem[] }> =
    useMemo(
      () => ({
        dearborn: {
          label: "Dearborn",
          items: [
            {
              name: "Hair cut",
              price: 20,
              duration: "20 min",
              desc: "Clean cut finished sharp and natural.",
              icon: "cut",
            },
            {
              name: "Hair cut & lineup",
              price: 30,
              duration: "15 min",
              desc: "Fresh cut with crisp line-up detailing.",
              icon: "cut",
            },
            {
              name: "Zero fade",
              price: 25,
              duration: "25 min",
              desc: "Skin-close fade with smooth blend.",
              icon: "fade",
            },
            {
              name: "Kids haircut",
              price: 20,
              duration: "20 min",
              desc: "Gentle, clean cut for kids.",
              icon: "kids",
            },
            {
              name: "Eyebrows",
              price: 10,
              duration: "5 min",
              desc: "Quick shape-up for a cleaner look.",
              icon: "brows",
            },
            {
              name: "Mens HairColor",
              price: 25,
              duration: "30 min",
              desc: "Natural color refresh and blend.",
              icon: "color",
            },
            {
              name: "Nose/ears wax",
              price: 5,
              duration: "5 min",
              desc: "Fast, clean add-on service.",
              icon: "wax",
            },
            {
              name: "Low/high taper",
              price: 25,
              duration: "30 min",
              desc: "Tapered sides with a sharp finish.",
              icon: "fade",
            },
            {
              name: "Hairwash",
              price: 5,
              duration: "10 min",
              desc: "Quick wash to finish the service.",
              icon: "wash",
            },
          ],
        },
        farmington: {
          label: "Farmington Hills",
          items: [
            {
              name: "Haircut",
              price: 40,
              duration: "30 min",
              desc: "Precision cut tailored to your style.",
              icon: "cut",
            },
            {
              name: "Beard",
              price: 20,
              duration: "15 min",
              desc: "Clean shaping and sharp detailing.",
              icon: "beard",
            },
            {
              name: "Haircut & beard",
              price: 50,
              duration: "45 min",
              desc: "Full grooming package, clean and sharp.",
              icon: "beard",
            },
            {
              name: "Kid's haircut",
              price: 30,
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
        },
      }),
      []
    );

  const active = data[location];

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
              Select a location to see services, prices, and timing.
            </p>
          </div>

          {/* Right side: Toggle only */}
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            <div className="flex w-full md:w-auto rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setLocation("dearborn")}
                className={[
                  "flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer text-center whitespace-nowrap",
                  location === "dearborn"
                    ? "bg-[#4f8dff] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                Dearborn
              </button>
              <button
                type="button"
                onClick={() => setLocation("farmington")}
                className={[
                  "flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer text-center whitespace-nowrap",
                  location === "farmington"
                    ? "bg-[#4f8dff] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                Farmington Hills
              </button>
            </div>
          </div>
        </div>

        {/* Subheader line */}
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="inline-block">
            <div className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
              {active.label}
            </div>

            <div className="relative mt-2 h-[3px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff]/70 to-transparent blur-xl" />
            </div>
          </div>

          {/* ✅ Opens Booksy for selected toggle */}
          <button
            type="button"
            onClick={openSelectedLocation}
            className="cursor-pointer inline-flex items-center justify-center rounded-xl
              bg-[#4f8dff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3f7df5]
              shadow-[0_18px_50px_rgba(79,141,255,0.22)]
              hover:shadow-[0_22px_70px_rgba(79,141,255,0.28)]
              hover:-translate-y-[1px]
              transition-all"
          >
            Book this location
          </button>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.items.map((s) => (
            <div
              key={`${location}-${s.name}`}
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
