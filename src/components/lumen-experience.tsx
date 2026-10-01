"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Asterisk, MoveDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraTarget } from "@/components/three/museum-canvas";

const MuseumCanvas = dynamic(() => import("@/components/three/museum-canvas").then((module) => module.MuseumCanvas), {
  ssr: false,
  loading: () => <div className="scene-fallback" aria-hidden="true" />,
});

const exhibits = [
  { number: "01", title: "Continuous Edge", type: "Möbius / memory metal", note: "One face. No reverse. A surface that returns every touch from the other side." },
  { number: "02", title: "Held Weather", type: "Liquid cube / unstable volume", note: "A square vessel containing a storm that has forgotten gravity." },
  { number: "03", title: "After the Impact", type: "Fractured sphere / ceramic void", note: "The break arrived first. The object grew carefully around it." },
  { number: "04", title: "Future Mineral", type: "Crystal / recursive growth", note: "Every edge rehearses a structure that matter has not learned to hold." },
];

export function LumenExperience() {
  const root = useRef<HTMLDivElement>(null);
  const hall = useRef<HTMLElement>(null);
  const galleryTrack = useRef<HTMLDivElement>(null);
  const target = useRef<CameraTarget>({ x: 0, y: 0, z: 8.4, focus: 0 });
  const [ready, setReady] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.matchMedia("(max-width: 760px)").matches;
    const constrainedDevice = (navigator.hardwareConcurrency || 4) <= 4 || Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    const render3D = !compactViewport && !constrainedDevice && !reduceMotion;
    const modeFrame = window.requestAnimationFrame(() => {
      setCanRender3D(render3D);
      if (compactViewport || reduceMotion) setReady(true);
    });
    if (compactViewport) target.current.z = 11.5;
    const context = gsap.context(() => {
      if (!compactViewport && !reduceMotion) {
        gsap.set(".lumen-letter", { yPercent: 112 });
        gsap.to(".lumen-letter", { yPercent: 0, duration: 1.05, stagger: 0.055, ease: "cubic-bezier(0.23, 1, 0.32, 1)", delay: 0.18, onComplete: () => setReady(true) });
      }

      gsap.to(".threshold__artifact-note", {
        opacity: 0,
        transform: "translateY(-18px)",
        ease: "none",
        scrollTrigger: { trigger: ".threshold", start: "top top", end: "55% top", scrub: true },
      });

      ScrollTrigger.create({
        trigger: ".manifesto",
        start: "top 75%",
        end: "bottom 25%",
        onUpdate: (self) => {
          target.current.y = gsap.utils.interpolate(0, -7.2, self.progress);
          target.current.x = gsap.utils.interpolate(0, -1.5, self.progress);
          target.current.z = gsap.utils.interpolate(8.4, 9.5, self.progress);
          target.current.focus = 0.75;
        },
      });

      gsap.from(".manifesto__line > span", {
        yPercent: reduceMotion ? 0 : 105,
        opacity: 0,
        duration: reduceMotion ? 0.2 : 1,
        stagger: reduceMotion ? 0 : 0.1,
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
        scrollTrigger: { trigger: ".manifesto", start: "top 68%", once: true },
      });

      const copies = gsap.utils.toArray<HTMLElement>(".exhibit-copy");
      const hallTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hall.current,
          start: "top top",
          end: "bottom bottom",
          scrub: reduceMotion ? false : 1,
          onUpdate: (self) => {
            target.current.x = self.progress * 21;
            target.current.y = -15.2;
            target.current.z = 8.2;
            target.current.focus = 1 + self.progress * 3;
            galleryTrack.current?.style.setProperty("--hall-progress", String(self.progress));
          },
          onEnter: () => { target.current.y = -15.2; },
          onLeaveBack: () => { target.current.y = -7.2; },
        },
      });

      copies.forEach((copy, index) => {
        const start = index / copies.length;
        const hold = 1 / copies.length;
        hallTimeline
          .fromTo(copy, { opacity: 0, transform: "translate3d(6vw, 28px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)", duration: 0.13, ease: "cubic-bezier(0.23, 1, 0.32, 1)" }, start)
          .to(copy, { opacity: index === copies.length - 1 ? 1 : 0, transform: index === copies.length - 1 ? "translate3d(0, 0, 0)" : "translate3d(-4vw, -18px, 0)", duration: 0.1, ease: "cubic-bezier(0.77, 0, 0.175, 1)" }, start + hold * 0.72);
      });

      ScrollTrigger.create({
        trigger: ".studio",
        start: "top 70%",
        end: "bottom 30%",
        onUpdate: (self) => {
          target.current.x = gsap.utils.interpolate(21, 4, self.progress);
          target.current.y = gsap.utils.interpolate(-15.2, -24, self.progress);
          target.current.z = gsap.utils.interpolate(8.2, 10.5, self.progress);
          target.current.focus = 4.2;
        },
      });

      gsap.from(".studio__datum", {
        opacity: 0,
        transform: "translateY(24px)",
        duration: reduceMotion ? 0.2 : 0.8,
        stagger: reduceMotion ? 0 : 0.07,
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
        scrollTrigger: { trigger: ".studio", start: "top 62%", once: true },
      });

      ScrollTrigger.create({
        trigger: ".colophon",
        start: "top 70%",
        onEnter: () => { target.current.x = 0; target.current.y = -31.5; target.current.z = 11; target.current.focus = 5; },
      });
    }, root);
    return () => {
      window.cancelAnimationFrame(modeFrame);
      context.revert();
    };
  }, []);

  const jumpTo = (selector: string) => document.querySelector(selector)?.scrollIntoView({ behavior: "auto" });

  return (
    <div ref={root} className={ready ? "lumen is-ready" : "lumen"}>
      <a className="skip-link" href="#collection">Skip to the collection</a>
      <div className="museum-canvas" aria-hidden="true">{canRender3D ? <MuseumCanvas target={target} /> : <div className="scene-fallback" />}</div>

      <header className="museum-header">
        <button className="museum-mark" onClick={() => jumpTo(".threshold")} aria-label="Return to the threshold"><Asterisk aria-hidden="true" /><span>L / 000</span></button>
        <nav aria-label="Exhibition">
          <button onClick={() => jumpTo(".manifesto")}>Statement</button>
          <button onClick={() => jumpTo("#collection")}>Collection</button>
          <button onClick={() => jumpTo(".studio")}>Studio</button>
        </nav>
        <span className="museum-header__status">Open / perpetual</span>
      </header>

      <main>
        <section className="threshold" aria-labelledby="threshold-title">
          <div className="threshold__index mono"><span>THE IMPOSSIBLE MUSEUM</span><span>LAGOS / 06°31′N</span></div>
          <h1 id="threshold-title" className="lumen-title" aria-label="Lumen">
            {"LUMEN".split("").map((letter, index) => <span className="lumen-letter-mask" key={`${letter}-${index}`}><span className="lumen-letter">{letter}</span></span>)}
          </h1>
          <p className="threshold__artifact-note mono"><span>UNNUMBERED ARTIFACT</span><span>seeded topology / responsive matter</span></p>
          <div className="scroll-trace" aria-hidden="true"><span>Cross the threshold</span><MoveDown /></div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <p className="section-number mono">00 / STATEMENT</p>
          <h2 id="manifesto-title">
            <span className="manifesto__line"><span>We do not imitate</span></span>
            <span className="manifesto__line manifesto__line--indent"><span>the physical world.</span></span>
            <span className="manifesto__line"><span>We give the impossible</span></span>
            <span className="manifesto__line manifesto__line--quiet"><span>somewhere to stand.</span></span>
          </h2>
          <p className="manifesto__aside">Digital matter has no weight, no scarcity, no obligation to remain still. LUMEN is a collection of forms built from that freedom.</p>
        </section>

        <section id="collection" ref={hall} className="hall" aria-labelledby="collection-title">
          <h2 id="collection-title" className="sr-only">The collection</h2>
          <div className="hall__sticky">
            <div className="hall__ruler mono" aria-hidden="true"><span>COLLECTION / 01—04</span><span className="hall__line" /><span>SCROLL TO TRAVERSE</span></div>
            <div ref={galleryTrack} className="hall__copies">
              {exhibits.map((exhibit, index) => (
                <article className="exhibit-copy" key={exhibit.number}>
                  <div className="exhibit-copy__number mono"><span>{exhibit.number}</span><span>OF 04</span></div>
                  <div className="exhibit-copy__body"><p className="mono">{exhibit.type}</p><h3>{exhibit.title}</h3><p>{exhibit.note}</p></div>
                  <span className="exhibit-copy__position mono">X {String(index * 7).padStart(2, "0")}.00</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="studio" aria-labelledby="studio-title">
          <div className="studio__heading"><p className="section-number mono">05 / THE STUDIO</p><h2 id="studio-title">Matter is a set<br />of instructions.</h2></div>
          <div className="studio__grid">
            <div className="studio__datum studio__datum--method"><p className="mono">METHOD / VERTEX DISPLACEMENT</p><p>Geometry begins disciplined. A field bends every vertex with time, position, and touch until the surface forgets its primitive.</p></div>
            <pre className="studio__datum studio__code" aria-label="Shader study"><code>{`float pulse = sin(\n  position.y * 3.0 + uTime\n);\n\nvec3 impossible = position\n  + normal * pulse * 0.08;\n\n// matter, briefly persuaded`}</code></pre>
            <div className="studio__datum studio__wire" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
            <dl className="studio__datum studio__spec mono">
              <div><dt>Vertices</dt><dd>36,864</dd></div><div><dt>Gravity</dt><dd>refused</dd></div><div><dt>Half-life</dt><dd>∞</dd></div><div><dt>Material</dt><dd>unclassified</dd></div>
            </dl>
          </div>
        </section>

        <footer className="colophon">
          <div className="colophon__flare" aria-hidden="true" />
          <p className="section-number mono">06 / COLOPHON</p>
          <p className="colophon__statement">The collection remains open after you leave.</p>
          <div className="colophon__base mono"><span>LUMEN © 2026</span><a href="mailto:archive@lumen.place">ARCHIVE@LUMEN.PLACE</a><button onClick={() => jumpTo(".threshold")}>RETURN TO VOID <ArrowDown aria-hidden="true" /></button></div>
        </footer>
      </main>
    </div>
  );
}
