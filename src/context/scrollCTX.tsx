import useLocoScroll from "../hooks/useLocoScroll";
import { createContext, useContext } from "react";
import locomotiveScroll from "locomotive-scroll";
import { ReactNode } from "react";

const scrollCTX = createContext<{
  locoScroll: locomotiveScroll | null;
  progress: number;
}>({
  locoScroll: null,
  progress: 0,
});

export default function ScrollCTXProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { locoScroll, progress } = useLocoScroll();

  return (
    <scrollCTX.Provider value={{ locoScroll, progress }}>
      {children}
    </scrollCTX.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useScrollCTX = () => useContext(scrollCTX);
