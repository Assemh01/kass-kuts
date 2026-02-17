"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
};

const ITEMS: GalleryItem[] = [
  { src: "/gallery/cut-1.jpeg", alt: "Kids skin fade with sharp lineup" },
  { src: "/gallery/cut-2.jpeg", alt: "Mid fade with textured top and beard blend" },
  { src: "/gallery/cut-3.jpg", alt: "Low taper fade with textured layered top" },
  { src: "/gallery/cut-4.jpg", alt: "Classic slick back with mid fade and full beard" },
  { src: "/gallery/cut-5.jpg", alt: "Skin fade with straight fringe and sharp blend" },
  { src: "/gallery/cut-6.jpg", alt: "Mid skin fade with smooth back blend" },
  { src: "/gallery/cut-7.jpg", alt: "Side part with mid fade and clean beard trim" },
  { src: "/gallery/cut-8.jpeg", alt: "Mid skin fade with sharp beard line-up and clean blend" },
];

const IG_URL = "https://instagram.com/kass.kuts";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Mobile carousel state
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const pageCount = ITEMS.length;

  const open = (idx: number) => setOpenIndex(idx);
  const close = () => setOpenIndex(null);

  const prev = () =>
    setOpenIndex((cur) => (cur === null ? cur : (cur - 1 + ITEMS.length) % ITEMS.length));

  const next = () =>
    setOpenIndex((cur) => (cur === null ? cur : (cur + 1) % ITEMS.length));

  // Lightbox keyboard + body lock
  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  // Mobile: keep current page indicator updated on swipe/scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const width = el.clientWidth || 1;
        const idx = Math.round(el.scrollLeft / width);
        setMobileIndex(Math.max(0, Math.min(pageCount - 1, idx)));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [pageCount]);

  const scrollToMobileIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const width = el.clientWidth || 0;
    el.scrollTo({ left: idx * width, behavior: "smooth" });
  };

  const dots = useMemo(() => Array.from({ length: pageCount }), [pageCount]);

  return (
    <section id="gallery" className="relative scroll-mt-28 bg-black">
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-16">
        {/* Premium Glow Divider */}
        <div className="mt-0 mb-10 flex justify-center">
          <div className="relative w-full max-w-7xl">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4f8dff] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f8dff]/80 to-transparent blur-3xl opacity-60" />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Gallery
          </h2>

          <p className="text-white/70 max-w-2xl">
            A quick look at recent work. Tap any photo to view.
          </p>

          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-fit
              inline-flex items-center gap-3
              px-5 py-3
              rounded-xl
              bg-white/5 hover:bg-white/10
              border border-white/10 hover:border-[#4f8dff]/40
              text-white text-sm font-semibold
              transition-all duration-300
              backdrop-blur-md
            "
            aria-label="Open Kass Kuts Instagram"
          >
            <svg
              className="w-5 h-5 text-[#4f8dff]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17" cy="7" r="1.5" />
            </svg>

            <span>See more on Instagram</span>
            <span className="hidden sm:inline text-white/55">@kass.kuts</span>
          </a>
        </div>

        {/* ===== Mobile Carousel (only < sm) ===== */}
        <div className="mt-10 sm:hidden">
          <div
            ref={scrollerRef}
            className="
              flex overflow-x-auto
              snap-x snap-mandatory
              scroll-smooth
              gap-4
              -mx-6 px-6
              pb-4
              [scrollbar-width:none] [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {ITEMS.map((item, idx) => (
              <button
                key={`${item.src}-${idx}`}
                type="button"
                onClick={() => open(idx)}
                className="
                  snap-center
                  shrink-0
                  w-full
                  overflow-hidden rounded-2xl
                  border border-white/10
                  bg-white/5 backdrop-blur-md
                  transition-all duration-300
                  active:scale-[0.99]
                "
                aria-label={`Open image: ${item.alt}`}
              >
                <div className="relative h-[360px] w-full bg-black">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/18 to-transparent" />

                <div className="relative px-4 py-3 bg-gradient-to-b from-black/35 to-black/15">
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-[#4f8dff]/70 opacity-60" />
                  <p className="pl-2 text-sm font-semibold text-white/80 leading-snug">
                    {item.alt}
                  </p>
                  <p className="pl-2 mt-1 text-[11px] text-white/45">
                    Swipe for more • Tap to view
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {dots.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToMobileIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={[
                  "h-2.5 rounded-full transition-all",
                  i === mobileIndex
                    ? "w-6 bg-[#4f8dff]"
                    : "w-2.5 bg-white/20 hover:bg-white/30",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
        {/* ===== Desktop Grid (sm+) ===== */}
        <div className="mt-10 hidden sm:grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {ITEMS.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              type="button"
              onClick={() => open(idx)}
              className="
                group w-full text-left
                overflow-hidden rounded-2xl
                border border-white/10
                bg-white/5 backdrop-blur-md
                transition-all duration-300
                hover:-translate-y-[4px]
                hover:border-[#4f8dff]/45
                hover:shadow-[0_22px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(79,141,255,0.18)]
              "
              aria-label={`Open image: ${item.alt}`}
            >
              <div className="relative h-[320px] w-full bg-black">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain transition duration-300 group-hover:scale-[1.015]"
                />
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/18 to-transparent" />

              <div className="relative px-4 py-3 bg-gradient-to-b from-black/35 to-black/15">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[#4f8dff]/70 opacity-60 group-hover:opacity-100 transition" />
                <p className="pl-2 text-sm font-semibold text-white/80 leading-snug group-hover:text-white transition">
                  {item.alt}
                </p>
                <p className="pl-2 mt-1 text-[11px] text-white/45 group-hover:text-white/55 transition">
                  Tap to view full size
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openIndex !== null && ITEMS[openIndex] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-[min(92vw,980px)] h-[min(88vh,820px)]">
            <div className="pointer-events-none absolute -inset-8 rounded-[28px] bg-[#4f8dff]/10 blur-3xl opacity-35" />

            <div
              className="
                relative h-full w-full overflow-hidden rounded-2xl bg-black
                ring-1 ring-white/10
                shadow-[0_40px_100px_rgba(0,0,0,0.85)]
              "
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#4f8dff]/15" />

              <Image
                src={ITEMS[openIndex].src}
                alt={ITEMS[openIndex].alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 py-5 pr-24 sm:pr-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
                <p className="relative text-white text-[15px] font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
                  {ITEMS[openIndex].alt}
                </p>
              </div>
            </div>

            <div className="absolute right-4 top-4 sm:top-auto sm:bottom-4 flex gap-2">
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>

              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>

              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
