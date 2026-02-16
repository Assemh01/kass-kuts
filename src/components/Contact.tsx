"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";

type LocationBlock = {
  key: "dearborn" | "farmington";
  labelTop: string;
  name: string;
  addressLines: string[];
  phoneDisplay: string;
  phoneHref: string;
  bookingUrl: string;
  directionsUrl: string;
  mapEmbedSrc: string;
  hours: { label: string; value: string }[];
};

export function Contact() {
  const LOCATIONS: LocationBlock[] = [
    {
      key: "dearborn",
      labelTop: "DEARBORN LOCATION",
      name: "Kass Kuts — Dearborn",
      addressLines: ["6601 Appoline St, Dearborn, Michigan 48126"],
      phoneDisplay: "(313) 675-4086",
      phoneHref: "tel:+13136754086",
      bookingUrl:
        "http://booksy.com/en-us/638291_kass-kuts_barber-shop_23794_dearborn#ba_s=seo",
      directionsUrl: "https://maps.app.goo.gl/bUFrrohcBQSyrhZ98",
      mapEmbedSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5898.267500313579!2d-83.16831069999999!3d42.33967169999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b34a8eff67233%3A0xba2ee4a11aebf31!2s6601%20Appoline%20St%2C%20Dearborn%2C%20MI%2048126!5e0!3m2!1sen!2sus!4v1771263149534!5m2!1sen!2sus",
      hours: [
        { label: "Mon–Fri", value: "10:00 AM – 7:00 PM" },
        { label: "Saturday", value: "9:00 AM – 6:00 PM" },
        { label: "Sunday", value: "Closed" },
      ],
    },
    {
      key: "farmington",
      labelTop: "FARMINGTON HILLS LOCATION",
      name: "Kass Kuts — Farmington Hills",
      addressLines: ["32408 W 8 Mile Rd, Farmington Hills, MI 48336"],
      phoneDisplay: "(313) 675-4086",
      phoneHref: "tel:+13136754086",
      bookingUrl:
        "https://booksy.com/en-us/1584930_kass-kuts_barber-shop_23574_farmington?do=invite&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnHNQz1a0vOV-IxiLNZYb4X5pY6eGiHWuIHEbGgPgGYjAjy9fWtQdtjlsjHlc_aem_zH2O7U6-csmVXkxqBnxQ3g&utm_content=link_in_bio&utm_medium=social&utm_source=ig#ba_s=dl_1",
      directionsUrl: "https://maps.app.goo.gl/JrCkkJUvywyoKs2b7",
      mapEmbedSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5888.730579162291!2d-83.3661896!3d42.441243300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824b1630d2a26a5%3A0xebb3a241841c674!2s32408%20W%208%20Mile%20Rd%2C%20Farmington%20Hills%2C%20MI%2048336!5e0!3m2!1sen!2sus!4v1771263216459!5m2!1sen!2sus",
      hours: [
        { label: "Mon–Fri", value: "9:00 AM – 8:00 PM" },
        { label: "Saturday", value: "9:00 AM – 6:00 PM" },
        { label: "Sunday", value: "10:00 AM – 4:00 PM" },
      ],
    },
  ];

  const brandBlue =
    "bg-[#4f8dff] hover:bg-[#3f7df5] active:bg-[#356ae6] cursor-pointer";

  return (
    <section id="contact" className="relative scroll-mt-28 bg-black overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-16">
        {/* Premium Glow Divider */}
        <div className="mt-0 mb-10 flex justify-center">
          <div className="relative w-full max-w-7xl">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4f8dff] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f8dff]/80 to-transparent blur-3xl opacity-60" />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs tracking-[0.22em] text-white/60">
              VISIT US
            </div>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Contact & Locations
            </h2>
            <p className="mt-3 text-white/75 max-w-2xl">
              Two locations. Same precision. Pick your closest shop and book in
              seconds.
            </p>
          </div>
        </div>

        {/* Locations */}
        <div className="mt-12 space-y-10">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.key}
              className="
                relative
                rounded-2xl border border-white/10
                bg-gradient-to-b from-white/7 to-white/3
                backdrop-blur-md
                shadow-[0_18px_60px_rgba(0,0,0,0.45)]
                overflow-hidden
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4f8dff]/10 via-transparent to-transparent" />

              <div className="relative p-6">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
                  {/* LEFT: Info */}
                  <div className="lg:col-span-5 min-w-0 flex flex-col h-full">
                    <div className="text-xs tracking-[0.22em] text-white/55">
                      {loc.labelTop}
                    </div>

                    <div className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {loc.name}
                    </div>

                    <div className="relative mt-3 h-[3px] w-44">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff] to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff]/70 to-transparent blur-xl" />
                    </div>

                    <div className="mt-6 space-y-4">
                      {/* Address */}
                      <div className="flex gap-4">
                        <div className="shrink-0 rounded-xl bg-[#4f8dff]/12 ring-1 ring-[#4f8dff]/25 p-3">
                          <MapPin className="h-5 w-5 text-[#4f8dff]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white">
                            Address
                          </div>
                          <div className="mt-1 text-sm text-white/70">
                            {loc.addressLines.map((line, i) => (
                              <div key={i} className="whitespace-normal break-words">
                                {line}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex gap-4">
                        <div className="shrink-0 rounded-xl bg-[#4f8dff]/12 ring-1 ring-[#4f8dff]/25 p-3">
                          <Phone className="h-5 w-5 text-[#4f8dff]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white">
                            Phone
                          </div>
                          <a
                            href={loc.phoneHref}
                            className="mt-1 inline-block text-sm text-white/70 hover:text-white"
                          >
                            {loc.phoneDisplay}
                          </a>
                        </div>
                      </div>

                      {/* Hours */}
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="shrink-0 flex items-center justify-center h-11 w-11 rounded-xl bg-[#4f8dff]/12 ring-1 ring-[#4f8dff]/25">
                            <Clock className="h-5 w-5 text-[#4f8dff]" />
                          </div>
                          <div className="text-sm font-semibold text-white">
                            Opening hours
                          </div>
                        </div>

                        <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-3">
                          <div className="space-y-2">
                            {loc.hours.map((h) => (
                              <div
                                key={h.label}
                                className="flex items-center justify-between gap-4"
                              >
                                <div className="text-sm text-white/65">
                                  {h.label}
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  {h.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          window.open(loc.bookingUrl, "_blank", "noopener,noreferrer")
                        }
                        className={`${brandBlue} text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors shadow-[0_18px_50px_rgba(79,141,255,0.22)]`}
                      >
                        Book Now
                      </button>

                      <a
                        href={loc.phoneHref}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all"
                      >
                        Call
                        <Phone className="h-4 w-4 opacity-80" />
                      </a>

                      <a
                        href={loc.directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all"
                      >
                        Directions <Navigation className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* RIGHT: Map */}
                  <div className="lg:col-span-7 min-w-0 flex flex-col lg:min-h-[420px]">
                    <div className="relative w-full flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/25 min-h-[320px]">
                      <iframe
                        title={`${loc.name} map`}
                        src={loc.mapEmbedSrc}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black/5" />
                    </div>
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
