import { AnimatedTitle } from "./ui/AnimatedTitle";
import { useRef, useEffect } from "react";
import { MAIN_CONTAINER } from "../App";
import gsap from "gsap";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
export const AboutUs = () => {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!aboutSectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#about",
            scroller: `.${MAIN_CONTAINER}`,
            start: "62% center",
            pin: aboutSectionRef.current,
            end: "+=1000px top",
            // markers: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const clip = `polygon(
              ${gsap.utils.interpolate(14, 0, progress)}% 0%,
              ${gsap.utils.interpolate(82, 100, progress)}% 0%,
              ${gsap.utils.interpolate(80, 100, progress)}% 100%,
              ${gsap.utils.interpolate(6, 0, progress)}% 100%
              )`;
              gsap.to("#pinningSection", {
                clipPath: clip,
              });
            },
          },
        })
        .to("#pinningSection", { width: "100vw", height: "100vh" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={aboutSectionRef}
      className="min-h-dvh bg-blue-75 overflow-hidden pt-28 w-full relative"
    >
      <div className="text-center space-y-8 ">
        <p className="text-[10px] font-general">Welcome To Zentry</p>
        <AnimatedTitle
          text={`Disc<b>o</b>ver the world's <br/> largest shared <b>a</b>dventure`}
        />
      </div>
        <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
          <MouseParallaxChild factorX={0.5} factorY={0.3}>
      <div className="w-full text-center flex  items-center justify-center relative h-dvh">
            <div className="relative mt-10 w-full h-full">
              {/* Border wrapper */}
              <div
                id="pinningSection"
                style={{
                  clipPath: "polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)",
                  backgroundColor: "black", // This acts as the border color
                  padding: "2px", // Thickness of the border
                }}
                className="w-[30%] z-50 overflow-hidden inline-block  absolute left-1/2 -translate-x-1/2 h-96"
              >
                {/* Inner clipped image */}
                <img
                  src="/img/about.webp"
                  alt="About"
                  className="h-full  overflow-hidden w-full object-cover"
                  style={{
                    clipPath: "inherit",
                  }}
                />
              </div>
            </div>

            <div className="  w-[35%] absolute bottom-56 ">
              <div className="font-circular-web text-gray-400">
                <p className="text-black ">
                  Lorem ipsum dolor sit amet consectetur
                </p>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam numquam aspernatur necessitatibus fugit blanditiis
                  doloremque
                </p>
              </div>
            </div>
      </div>
          </MouseParallaxChild>
        </MouseParallaxContainer>
    </section>
  );
};
