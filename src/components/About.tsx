"use client";

import Image from "next/image";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-28 bg-black">
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-16">
        {/* Premium Glow Divider */}
        <div className="mt-0 mb-10 flex justify-center">
          <div className="relative w-full max-w-7xl">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4f8dff] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f8dff]/80 to-transparent blur-3xl opacity-60" />
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* LEFT — Brand Story */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">About </span>
              <span className="text-white">KASS</span>
              <span className="ml-2 text-zinc-400">KUTS</span>
            </h2>

            <p className="mt-6 text-white/75 leading-[1.75] text-lg md:text-xl max-w-2xl">
              Kass Kuts is known for precision, consistency, and a clean finish
              every single time. Clients don’t just come in for a haircut — they
              come for a sharp, detailed experience built on skill,
              professionalism, and attention to detail.
            </p>

            <p className="mt-6 text-white/75 leading-[1.75] text-lg md:text-xl max-w-2xl">
              From skin fades to crisp lineups and full grooming sessions, every
              cut is handled with care and craftsmanship in a premium, modern
              atmosphere that keeps clients coming back.
            </p>
          </div>

          {/* RIGHT — Card */}
          <div className="relative">
            <div
              className="
                relative overflow-hidden rounded-2xl
                border border-white/10
                bg-gradient-to-b from-white/7 to-white/3
                backdrop-blur-md
                p-6
                shadow-[0_18px_60px_rgba(0,0,0,0.45)]
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4f8dff]/10 via-transparent to-transparent" />

              {/* Image */}
              <div className="relative h-[300px] md:h-[340px] w-full bg-black overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/about-image.jpeg"
                  alt="Kass Kuts barber at work"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[60%_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>

              {/* Subtle Premium Flair */}
              <div className="relative mt-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Meet Kassem
                </div>
                <div className="relative mt-3 h-[2px] w-32 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f8dff] to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4f8dff]/70 to-transparent blur-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
