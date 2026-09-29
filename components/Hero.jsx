"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = ["WELCOME", "ITZFIZZ"];
const TOP_TEXT = {
  eyebrow: "Our impact",
  line: "See how ITZFIZZ is improving pick up points and customer support.",
};
const SCROLL_HINT = "Scroll to explore \u2193";
const STATS = [
  { value: 58, label: "Increase in pick up point use", style: "bg-card-lemon text-ink" },
  { value: 27, label: "Increase in pick up point use", style: "bg-card-peach text-ink" },
  { value: 23, label: "Decrease in customer phone calls", style: "bg-card-sky text-ink" },
  { value: 40, label: "Decrease in customer phone calls", style: "bg-card-lilac text-ink" },
];

function Headline({ tone }) {
  const color = tone === "road" ? "text-[#EDEDED]" : "text-ink";
  return (
    <div
      aria-hidden="true"
      data-tone={tone}
      className={`flex h-full w-full items-center justify-center whitespace-nowrap pl-[0.06em] text-[clamp(1.9rem,8.6vw,9rem)] font-extrabold leading-none tracking-[0.06em] ${color}`}
    >
      {HEADLINE.map((word, wi) => (
        <span key={word} className={wi === 0 ? "mr-[0.3em]" : ""}>
          {[...word].map((ch, i) => (
            <span key={i} data-slot className="inline-block overflow-hidden py-[0.1em] align-top">
              <span data-letter className="inline-block">
                {ch}
              </span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

function Stats() {
  return (
    <ul className="grid w-full grid-cols-2 gap-3 px-4 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-12">
      {STATS.map((s) => (
        <li key={s.value} data-stat className={`rounded-2xl p-4 lg:p-5 ${s.style}`}>
          <p className="text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-none tabular-nums tracking-tight">
            <span data-count={s.value}>{s.value}</span>%
          </p>
          <p className="mt-2 text-[clamp(0.75rem,1.05vw,0.95rem)] leading-snug lg:mt-3">
            {s.label}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function Hero({ carSrc = null }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        full: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce } = context.conditions;
        const el = root.current;
        const $ = gsap.utils.selector(el);
        const roadLetters = $('[data-tone="road"] [data-letter]');
        const trailLetters = $('[data-tone="trail"] [data-letter]');
        const roadSlots = $('[data-tone="road"] [data-slot]');
        const trailSlots = $('[data-tone="trail"] [data-slot]');
        const hint = $("[data-hint]")[0];
        const stats = $("[data-stat]");
        const track = $("[data-car-track]")[0];
        const carBody = $("[data-car-body]")[0];
        const trail = $("[data-trail]")[0];
        const trailInner = $("[data-trail-inner]")[0];

        if (reduce) {
          gsap.set([...roadLetters, ...trailLetters, ...stats, carBody, trail], {
            autoAlpha: 1,
          });
          gsap.set(track, { left: "50%", xPercent: -50 });
          return;
        }

        const dims = { W: 0, tailOffset: 0 };
        const measure = () => {
          dims.W = el.clientWidth;
  
          dims.tailOffset = track.offsetWidth * (carSrc ? 0.18 : 0.2);
        };
        measure();

        const startX = () => dims.W * 0.04;
        const endX = () => dims.W; 

        const setTrailX = gsap.quickSetter(trail, "x", "px");
        const setInnerX = gsap.quickSetter(trailInner, "x", "px");
        const syncTrail = () => {
          const carEdge = gsap.getProperty(track, "x") + dims.tailOffset;
          const wx = Math.min(carEdge - dims.W, 0);
          setTrailX(wx);
          setInnerX(-wx);
        };

        gsap.set([...roadLetters, ...trailLetters], { yPercent: 110, autoAlpha: 1 });
        gsap.set(carBody, { scale: 0.94, autoAlpha: 0 });
        gsap.set(trail, { autoAlpha: 1 });

        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        roadLetters.forEach((letter, i) => {
          intro.to([letter, trailLetters[i]], { yPercent: 0, duration: 1.3 }, i * 0.055);
        });

        intro.to(carBody, { autoAlpha: 1, scale: 1, duration: 1.4 }, 0.3);
        const scroll = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              measure();
              syncTrail();
            },
          },
          onUpdate: syncTrail,
        });

        scroll.fromTo(track, { x: startX }, { x: endX }, 0);
        scroll.to(hint, { autoAlpha: 0, duration: 0.1 }, 0);
        const mid = (roadSlots.length - 1) / 2;
        roadSlots.forEach((slot, i) => {
          scroll.fromTo(
            [slot, trailSlots[i]],
            { x: 0 },
            { x: () => (i - mid) * el.clientWidth * 0.0065 },
            0
          );
        });

        stats.forEach((stat, i) => {
          const at = 0.12 + i * 0.2; 
          const num = stat.querySelector("[data-count]");
          const target = Number(num.dataset.count);
          const state = { v: 0 };
          num.textContent = "0";

          scroll.fromTo(
            stat,
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.2, ease: "power2.out" },
            at
          );
          scroll.to(
            state,
            {
              v: target,
              duration: 0.2,
              onUpdate: () => {
                num.textContent = Math.round(state.v);
              },
            },
            at
          );
        });

        syncTrail();
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      }
    );

    return () => mm.revert();
  }, [carSrc]);

  return (
    <section
      ref={root}
      style={{
        "--band": "clamp(120px, min(26svh, 22vw), 300px)",
        "--car-w": carSrc ? "calc(var(--band) * 2.09)" : "calc(var(--band) * 2.34)",
      }}
      className="relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-ground"
    >
      <h1 className="sr-only">Welcome Itzfizz</h1>

      <div className="flex flex-[0.75] flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/70">
          {TOP_TEXT.eyebrow}
        </p>
        <p className="mt-3 max-w-xl text-[clamp(0.95rem,1.4vw,1.15rem)] leading-snug text-ink/80">
          {TOP_TEXT.line}
        </p>
      </div>
      <div
        className="relative w-full overflow-hidden bg-road"
        style={{ height: "var(--band)" }}
      >
        <div className="absolute inset-0">
          <Headline tone="road" />
        </div>

        <div data-trail className="absolute inset-0 overflow-hidden will-change-transform">
          <div data-trail-inner className="absolute inset-0 bg-trail will-change-transform">
            <Headline tone="trail" />
          </div>
        </div>

        <div
          data-car-track
          className="absolute left-0 top-0 flex h-full items-center will-change-transform"
          style={{ width: "var(--car-w)" }}
        >
          <div data-car-body className="w-full">
            {carSrc ? (
          
              <img
                src={carSrc}
                alt="Top view of the sports car"
                draggable={false}
                className="block h-auto w-full select-none"
              />
            ) : (
              <Car className="block h-auto w-full" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-[1.25] items-end pb-[8svh]">
        <Stats />
      </div>
      <p
        data-hint
        className="absolute inset-x-0 bottom-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-ink/70"
      >
        {SCROLL_HINT}
      </p>
    </section>
  );
}
