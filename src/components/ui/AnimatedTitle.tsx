import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAIN_CONTAINER } from "../../App";
import gsap from "gsap";
export const AnimatedTitle = ({
  text,
  className = " ",
}: {
  text: string;
  className?: string;
}) => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!titleRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            // markers: true,
            start: "top bottom",
            scroller: `.${MAIN_CONTAINER}`,
            toggleActions: "play none none reverse",
          },
        })
        .to(titleRef.current?.querySelectorAll(".animated-word"), {
          opacity: 1,
          transform: "translate3d(0,0,0) rotateX(0deg) rotateY(0deg)",
          stagger:.05
        });
    });

    return () => context.revert();
  }, []);
  return (
    <div
      ref={titleRef}
      id="animated-title"
      className={`flex flex-col flex-center font-zentry text-3xl md:text-5xl lg:text-8xl ${className} `}
    >
      {text.split("<br/>").map((line: string, index: number) => {
        return (
          <div
            key={index}
            className="flex flex-center special-font gap-2 md:gap-3"
          >
            {line.split(" ").map((word: string, index: number) => (
              <span
                key={index}
                className="inline-block animated-word opacity-0"
                dangerouslySetInnerHTML={{ __html: word }}
              ></span>
            ))}
          </div>
        );
      })}
    </div>
  );
};
