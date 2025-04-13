import React from "react";
import { useRef } from "react";
import { TiltCard } from "./TiltCard";

export const FeatureCard = ({
  title,
  description,
  video,
  className = " ",
}: {
  title?: string;
  description?: string;
  video: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (
    <div
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
      className={`  relative h-96 md:h-full mb-7 w-full overflow-hidden rounded-md  !cursor-pointer  md:min-h-[50vh] border border-white/20  ${className}`}
    >
      <div className="  absolute size-full">
        <video
          ref={videoRef}
          src={video}
          loop
          muted
          className=" absolute inset-0 size-full object-cover object-center"
        />

        <div className=" relative z-10 flex size-full flex-col  p-5  text-blue-50">
          <h1 className="bento-title">{title}</h1>
          {description && (
            <p className=" mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
