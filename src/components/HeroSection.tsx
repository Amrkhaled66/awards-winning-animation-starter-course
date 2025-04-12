import Button from "./ui/Button";
import { RiArrowRightSFill } from "react-icons/ri";

import { useEffect, useRef, useState } from "react";

import { getVideoSrc } from "../utils/heroHelpers";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAIN_CONTAINER } from "../App";

const TOTAL_VIDEO_COUNT = 4;
export default function HeroSection() {
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const nextVideo = (currentVideo + 1) % TOTAL_VIDEO_COUNT;

  const isLoading = loadedVideos < TOTAL_VIDEO_COUNT;

  const handleNextVideo = () => {
    const animatedVideo = `#video-${nextVideo}`;
    const videosId = ["#video-0", "#video-1", "#video-2", "#video-3"].filter(
      (id) => id !== animatedVideo
    );

    gsap.set(videosId, { zIndex: 10 });
    gsap.set(animatedVideo, { zIndex: 20, width: "16rem", height: "16rem" });

    const currentVideo: HTMLVideoElement | null =
      document.querySelector(animatedVideo);

    gsap.to(animatedVideo, {
      width: "100%",
      height: "100%",
      transformOrigin: "center",
    });
    // reset video
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
      currentVideo.play();
    }
    setCurrentVideo(nextVideo);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundVideoRef.current) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        gsap.to(backgroundVideoRef.current, {
          autoAlpha: 0,
          duration: 0.3,
        });
      }, 1000);

      gsap.to(backgroundVideoRef.current, {
        autoAlpha: 1,
      });

      const { clientX, clientY } = e;
      const maxOffsetX = 300;
      const maxOffsetY = 200;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const constrainedX = Math.min(
        Math.max(clientX, centerX - maxOffsetX),
        centerX + maxOffsetX
      );
      const constrainedY = Math.min(
        Math.max(clientY, centerY - maxOffsetY),
        centerY + maxOffsetY
      );

      const polygonClipPath = `polygon(
      ${Math.max(constrainedX - 100, 0)}px ${Math.max(constrainedY - 100, 0)}px,
      ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.max(
        constrainedY - 100,
        0
      )}px,
      ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.min(
        constrainedY + 100,
        window.innerHeight
      )}px,
      ${Math.max(constrainedX - 100, 0)}px ${Math.min(
        constrainedY + 100,
        window.innerHeight
      )}px
    )`;

      backgroundVideoRef.current.style.clipPath = polygonClipPath;
    };

    const heroDiv = heroRef.current;
    if (!heroDiv) return;
    heroDiv.addEventListener("mousemove", handleMouseMove);
    return () => {
      heroDiv.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.set("#video-frame", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      });
      gsap.to("#video-frame", {
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center 40%",
          end: "bottom center",
          scrub: true,
          scroller: `.${MAIN_CONTAINER}`,
        },
        clipPath: "polygon(28% 0, 72% 0, 89% 97%, 9% 97%)",
      });
    });
    return () => context.revert();
  }, []);
  return (
    <section className=" h-dvh  bg-blue-50  relative">
      {isLoading && (
        <div className=" flex-center z-[60] h-dvh w-screen bg-violet-50 absolute">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div ref={heroRef} id="video-frame" className=" relative z-50 h-dvh">
        <video
          className="h-full cursor-pointer w-full z-50 absolute inset-0 object-cover"
          src={getVideoSrc(nextVideo)}
          autoPlay
          muted
          loop
          ref={backgroundVideoRef}
          onClick={handleNextVideo}
        ></video>
        {Array.from({ length: TOTAL_VIDEO_COUNT }, (_, index) => (
          <video
            key={index}
            className="h-full w-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 object-cover"
            src={getVideoSrc(index)}
            id={`video-${index}`}
            autoPlay
            muted
            loop
            onLoadedData={() => setLoadedVideos((prev) => prev + 1)}
          ></video>
        ))}

        <h1 className="lg:text-[12rem] z-50 sm:text-7xl md:text-9xl special-font  text-blue-75   color absolute bottom-8  right-8 font-zentry">
          G<b>A</b>MING
        </h1>
        <div className="absolute top-10 z-50 flex flex-col left-8  gap-y-4 ">
          <h2 className="lg:text-[12rem] sm:text-7xl md:text-9xl  special-font  text-blue-75   color  font-zentry">
            R<b>E</b>DFINE
          </h2>
          <p className=" text-blue-75   font-robert-regular ">
            Enter the Metagame <br />
            Unleash the Play Economy
          </p>
          <Button
            leftIcon={<RiArrowRightSFill className="text-2xl" />}
            text="watch trailer"
          />
        </div>
      </div>
      <h1 className="lg:text-[12rem] z-40 sm:text-7xl md:text-9xl special-font  text-black   color absolute bottom-8  right-8 font-zentry">
        G<b>A</b>MING
      </h1>
    </section>
  );
}
