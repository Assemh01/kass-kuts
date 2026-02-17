"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";

type LocationBlock = {
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
  const LOCATION: LocationBlock = {
    labelTop: "FARMINGTON HILLS LOCATION",
    name: "Kass Kuts — Farmington Hills",
    addressLines: ["32408 W 8 Mile Rd, Farmington Hills, MI 48336"],
    phoneDisplay: "(313) 675-4086",
    phoneHref: "tel:+13136754086",
    bookingUrl:
      "https://booksy.com/en-us/1584930_kass-kuts_barber-shop_23574_farmington?do=invite&utm_content=link_in_bio&utm_medium=social&utm_source=ig#ba_s=dl_1",
    directionsUrl: "https://maps.app.goo.gl/JrCkkJUvywyoKs2b7",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5888.730579162291!2d-83.3661896!3d42.441243300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824b1630d2a26a5%3A0xebb3a241841c674!2s32408%20W%208%20Mile%20Rd%2C%20Farmington%20Hills%2C%20MI%2048336!5e0!3m2!1sen!2sus!4v1771263216459!5m2!1sen!2sus",
    hours: [
      { label: "Monday", value: "Closed" },
      { label: "Tuesday", value: "11:00 AM – 7:00 PM" },
      { label: "Wednesday", value: "11:00 AM – 6:00 PM" },
      { label: "Thursday", value: "11:00 AM – 6:00 PM" },
      { label: "Friday", value: "Closed" },
      { label: "Saturday", value: "11:00 AM – 7:00 PM" },
      { label: "Sunday", value: "Closed" },
    ],
  };

  const brandBlue =
    "bg-[#4f8dff] hover:bg-[#3f7df5] active:bg-[#356ae6] cursor-pointer";

  return (
    <section id="contact" className="relative scroll-mt-28 bg-black overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-16">
        <div className="mt-0 mb-10 flex justify-center">
          <div className="relative w-full max-w-7xl">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4f8dff] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f8dff]/80 to-transparent blur-3xl opacity-60" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs tracking-[0.22em] text-white/60">VISIT US</div>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Contact & Location
            </h2>
            <p className="mt-3 text-white/75 max-w-2xl">
              One location. Same precision. Book in seconds.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/7 to-white/3 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4f8dff]/10 via-transparent to-transparent" />

            <div className="relative p-6">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
                <div className="lg:col-span-5 flex flex-col h-full">
                  <div className="text-xs tracking-[0.22em] text-white/55">
                    {LOCATION.labelTop}
                  </div>

                  <div className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {LOCATION.name}
                  </div>

                  <div className="relative mt-3 h-[3px] w-44">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff] to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4f8dff]/70 to-transparent blur-xl" />
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="shrink-0 rounded-xl bg-[#4f8dff]/12 ring-1 ring-[#4f8dff]/25 p-3">
                        <MapPin className="h-5 w-5 text-[#4f8dff]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Address</div>
                        <div className="mt-1 text-sm text-white/70">
                          {LOCATION.addressLines[0]}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0 rounded-xl bg-[#4f8dff]/12 ring-1 ring-[#4f8dff]/25 p-3">
                        <Phone className="h-5 w-5 text-[#4f8dff]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Phone</div>
                        <a
                          href={LOCATION.phoneHref}
                          className="mt-1 inline-block text-sm text-white/70 hover:text-white"
                        >
                          {LOCATION.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 flex items-center justify-center h-11 w-11 rounded-xl bg-[#4f8dff]/12 ring-1 ring-[#4f8dff]/25">
                          <Clock className="h-5 w-5 text-[#4f8dff]" />
                        </div>
                        <div className="text-sm font-semibold text-white">Opening hours</div>
                      </div>

                      <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-3 space-y-2">
                        {LOCATION.hours.map((h) => (
                          <div
                            key={h.label}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-white/65">{h.label}</span>
                            <span className="font-semibold text-white">
                              {h.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                      href={LOCATION.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${brandBlue} inline-flex items-center justify-center text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors`}
                    >
                      Book Now
                    </a>

                    <a
                      href={LOCATION.phoneHref}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all"
                    >
                      Call <Phone className="h-4 w-4 opacity-80" />
                    </a>

                    <a
                      href={LOCATION.directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all"
                    >
                      Directions <Navigation className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col lg:min-h-[420px]">
                  <div className="relative w-full flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/25 min-h-[320px]">
                    <iframe
                      title={`${LOCATION.name} map`}
                      src={LOCATION.mapEmbedSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
