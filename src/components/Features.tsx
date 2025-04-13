import { FeatureCard } from "./ui/FeatureCard";
import { FaLocationArrow } from "react-icons/fa";

import { TiltCard } from "./ui/TiltCard";
export const Features = () => {
  return (
    <div className=" h-fit min-h-dvh px-38 bg-black p-[120px]  ">
      <div className="font-circular-web text-lg ">
        <h1 className="text-blue-75 ">Explore the Zentry Universe</h1>
        <p className="text-gray-300/50   leading-5 max-w-md">
          Immerse yourself in an IP-rich product universe where players, agentic
          AI and blockchain lead the new economic paradigm.
        </p>
      </div>

      <div className="grid gird-cols-1 grid-rows-3 px-3   md:grid-cols-2 gap-8 mt-10">
        <TiltCard className="  col-span-2 row-span-1 ">
          <FeatureCard
            title="Radiant"
            video="/videos/feature-1.mp4"
            description="The game of games app transforming moments across Web2 & Web3 titles into rewards"
          />
        </TiltCard>

        <TiltCard className="row-span-2 col-span-1">
          <FeatureCard
            title="Radiant"
            video="/videos/feature-2.mp4"
            description="The game of games app transforming moments across Web2 & Web3 titles into rewards"
          />
        </TiltCard>

        <TiltCard className="grid-2 ">
          <FeatureCard
            title="Radiant"
            video="/videos/feature-3.mp4"
            description="The game of games app transforming moments across Web2 & Web3 titles into rewards"
          />
        </TiltCard>

        <TiltCard>
          <FeatureCard
            title="Radiant"
            video="/videos/feature-4.mp4"
            description="The game of games app transforming moments across Web2 & Web3 titles into rewards"
          />
        </TiltCard>

        <TiltCard>
          <FeatureCard video="/videos/feature-5.mp4" />
        </TiltCard>

        <TiltCard className=" p-5 grid-2 relative bg-violet-300 rounded-md ">
          <p className="bento-title w-[10%]  !leading-[50px]  ">
            MORE COMING SOON.
          </p>
          <div className=" absolute bottom-7 right-7 text-5xl z-10 text-black ">
            <FaLocationArrow />
          </div>
        </TiltCard>
      </div>
    </div>
  );
};
