"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

type Source = "Google" | "Yelp";

type Testimonial = {
  name: string;
  rating: 5 | 4 | 3 | 2 | 1;
  text: string;
  source: Source;
  date?: string;
  location?: string;
};

type FilterTab = "All" | Source;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={["h-4 w-4", i < rating ? "text-[#4f8dff]" : "text-white/15"].join(" ")}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const GOOGLE_REVIEWS_URL =
    "https://www.google.com/search?q=kass+kuts+farmington+hills+reviews";
  const YELP_URL = "https://www.yelp.com/biz/kass-kuts-farmington";

  const ALL: Testimonial[] = useMemo(
    () => [
      {
        name: "Ramsy S.",
        rating: 5,
        text: "I had an amazing experience at Kass Kuts! Kass is professional, skilled, and really knows how to give a sharp, clean cut.",
        source: "Yelp",
        date: "Jan 5, 2026",
        location: "Dearborn, MI",
      },
      {
        name: "Jawad Assaf",
        rating: 5,
        text: "This is the best haircut place I've been kass does a fantastic job every time, would definitely recommend, clean salon Booking was easy no wait great experience!!!",
        source: "Google",
        date: "a month ago",
      },
      {
        name: "Mostapha Farris",
        rating: 5,
        text: "I finally found my personal barber in Farmington 👌 He’s professional and a real stylist, booked him through booksy app and didn’t need to wait. Highly recommended",
        source: "Google",
        date: "a month ago",
      },
      {
        name: "Gonzalo Migoya",
        rating: 5,
        text: "Best barber in town! Kass is friendly, meticulous, and great with kids. We’ve been loyal customers for over 6 years and recommend him to everyone. You won't be disappointed.",
        source: "Google",
        date: "a week ago",
      },
    ],
    []
  );

  const [tab, setTab] = useState<FilterTab>("All");
  const filtered = useMemo(() => {
    if (tab === "All") return ALL;
    return ALL.filter((r) => r.source === tab);
  }, [ALL, tab]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(0);

  // internal “truth”
  const perPageRef = useRef(1);
  const pageLeftsRef = useRef<number[]>([0]);

  const rafRef = useRef<number | null>(null);
  
  const programmaticRef = useRef(false);

  const targetLeftRef = useRef<number | null>(null);

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  const isMobile = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 767px)").matches;

  const computePages = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-tcard]"));
    const total = cards.length;

    // fallback
    if (total === 0) {
      pageLeftsRef.current = [0];
      setPageCount(1);
      setPage(0);
      return;
    }

    // ✅ Mobile: 1 card per page (fast + smooth on phone)
    if (isMobile()) {
      const lefts = cards.map((c) => c.offsetLeft);
      pageLeftsRef.current = lefts.length ? lefts : [0];

      setPageCount(pageLeftsRef.current.length);
      setPage((cur) => clamp(cur, 0, pageLeftsRef.current.length - 1));
      return;
    }

    // ✅ Desktop: viewport pages (stable, no "fit" rounding bugs)
    const cw = el.clientWidth || 1;
    const sw = el.scrollWidth || 1;

    const pages = Math.max(1, Math.ceil(sw / cw));
    const lefts = Array.from({ length: pages }, (_, i) => i * cw);

    pageLeftsRef.current = lefts;
    setPageCount(pages);
    setPage((cur) => clamp(cur, 0, pages - 1));
  };

  const syncFromScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    // ✅ if we're doing a programmatic scroll, unlock ONLY when we reach the target
    if (programmaticRef.current) {
      const t = targetLeftRef.current;
      if (t != null && Math.abs(el.scrollLeft - t) <= 8) {
        programmaticRef.current = false;
        targetLeftRef.current = null;
      } else {
        return; // still traveling, don't overwrite page
      }
    }

    const lefts = pageLeftsRef.current;
    const pages = Math.max(1, lefts.length);

    if (!isMobile()) {
      const cw = el.clientWidth || 1;
      const current = clamp(Math.round(el.scrollLeft / cw), 0, pages - 1);
      setPageCount(pages);
      setPage(current);
      return;
    }

    const x = el.scrollLeft;

    let bestIdx = 0;
    let best = Number.POSITIVE_INFINITY;

    for (let i = 0; i < lefts.length; i++) {
      const d = Math.abs(lefts[i] - x);
      if (d < best) {
        best = d;
        bestIdx = i;
      }
    }

    setPageCount(pages);
    setPage(bestIdx);
  };


  const goToPage = (p: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    computePages();

    const lefts = pageLeftsRef.current;
    const pages = Math.max(1, lefts.length);
    const target = clamp(p, 0, pages - 1);
    const targetLeft = lefts[target] ?? 0;

    setPageCount(pages);
    setPage(target);

    // lock until we actually reach the target
    programmaticRef.current = true;
    targetLeftRef.current = targetLeft;

    el.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  // attach scroll tracking (trackpad, wheel, swipe, drag, scrollbar)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const cancelProgrammatic = () => {
      programmaticRef.current = false;
      targetLeftRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        syncFromScroll();
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", cancelProgrammatic, { passive: true });
    el.addEventListener("touchstart", cancelProgrammatic, { passive: true });

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        computePages();
        syncFromScroll();
      });
    });
    ro.observe(el);

    requestAnimationFrame(() => {
      computePages();
      syncFromScroll();
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", cancelProgrammatic);
      el.removeEventListener("touchstart", cancelProgrammatic);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // reset on tab/filter changes
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    el.scrollTo({ left: 0, behavior: "auto" });
    setPage(0);

    requestAnimationFrame(() => {
      computePages();
      syncFromScroll();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, filtered.length]);

  const canLeft = page > 0;
  const canRight = page < pageCount - 1;

  // pointer drag (mouse + touch). trackpad scrolling already handled by scroll listener.
  const startX = useRef<number | null>(null);
  const startScroll = useRef<number>(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    programmaticRef.current = false;
    targetLeftRef.current = null;

    const el = scrollerRef.current;
    if (!el) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (startX.current == null) return;

    const dx = e.clientX - startX.current;
    el.scrollLeft = startScroll.current - dx;
  };

  const onPointerUp = () => {
    startX.current = null;
    // let CSS snap do its thing, scroll listener will update page
  };

  return (
    <section id="testimonials" className="relative scroll-mt-28 bg-black">
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-16">
        {/* Premium Glow Divider */}
        <div className="mt-0 mb-10 flex justify-center">
          <div className="relative w-full max-w-7xl">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4f8dff] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f8dff]/80 to-transparent blur-3xl opacity-60" />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Testimonials
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              Real clients. Real results. Consistent quality.
            </p>
          </div>
        </div>

        {/* Tabs + External buttons row */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", "Google", "Yelp"] as FilterTab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 transform-gpu",
                  tab === t
                    ? "border-[#4f8dff] bg-[#4f8dff]/15 text-white scale-[1.06] shadow-[0_0_0_1px_rgba(79,141,255,0.25)]"
                    : "border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 scale-100",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl border border-white/15 bg-white/6
                px-5 py-3 text-sm font-semibold text-white/80
                hover:text-white hover:bg-white/10
                hover:border-white/25
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                transition-all whitespace-nowrap
              "
            >
              Google <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href={YELP_URL}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl border border-white/15 bg-white/6
                px-5 py-3 text-sm font-semibold text-white/80
                hover:text-white hover:bg-white/10
                hover:border-white/25
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                transition-all whitespace-nowrap
              "
            >
              Yelp <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-6">
          <div className="relative overflow-visible">
            <div
              ref={scrollerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch",
              } as React.CSSProperties
            }
              className="
                flex gap-6 overflow-x-auto overflow-y-visible
                pt-8 pb-6
                snap-x snap-mandatory
                [-ms-overflow-style:none] [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {filtered.map((t, idx) => (
                <div
                  data-tcard
                  key={`${t.source}-${t.name}-${idx}`}
                  className="
                    snap-start
                    min-w-[86%] sm:min-w-[340px] lg:min-w-[380px]
                    rounded-2xl border border-white/10
                    bg-gradient-to-b from-white/7 to-white/3
                    backdrop-blur-md
                    p-6
                    transition-all duration-200
                    hover:-translate-y-[3px]
                    hover:border-white/20
                    hover:bg-gradient-to-b hover:from-[#4f8dff]/10 hover:to-white/3
                    hover:shadow-[0_18px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(79,141,255,0.22)]
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-white font-semibold truncate">{t.name}</div>
                      {t.location && (
                        <div className="mt-1 text-xs text-white/45">{t.location}</div>
                      )}
                      <div className="mt-2">
                        <Stars rating={t.rating} />
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-xs text-white/60">{t.source}</div>
                      {t.date && <div className="text-xs text-white/40">{t.date}</div>}
                    </div>
                  </div>

                  <div className="mt-4 h-px w-full bg-white/8" />
                  <p className="mt-4 text-white/75 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>

            {pageCount > 1 && (
              <div className="mt-4 flex items-center justify-center gap-5">
                <div className="w-10 flex justify-center">
                  {canLeft && (
                    <button
                      onClick={() => goToPage(page - 1)}
                      className="
                        h-10 w-10 rounded-full flex items-center justify-center
                        bg-white/8 border border-white/10
                        hover:bg-white/12 hover:border-white/20
                        transition
                      "
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      aria-label={`Go to page ${i + 1}`}
                      className={[
                        "h-2.5 w-2.5 rounded-full transition",
                        i === page ? "bg-[#4f8dff]" : "bg-white/20 hover:bg-white/30",
                      ].join(" ")}
                    />
                  ))}
                </div>

                <div className="w-10 flex justify-center">
                  {canRight && (
                    <button
                      onClick={() => goToPage(page + 1)}
                      className="
                        h-10 w-10 rounded-full flex items-center justify-center
                        bg-white/8 border border-white/10
                        hover:bg-white/12 hover:border-white/20
                        transition
                      "
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
