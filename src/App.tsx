import HeroSection from "./components/HeroSection";
import { AboutUs } from "./components/AboutUs";
import "locomotive-scroll/src/locomotive-scroll.scss";
import ScrollCTXProvider from "./context/scrollCTX";

export const MAIN_CONTAINER = "main-container";
function App() {
  return (
    <ScrollCTXProvider>
      <div className={`${MAIN_CONTAINER} overflow-hidden`}>
        <HeroSection />
        <AboutUs />
      </div>
    </ScrollCTXProvider>
  );
}

export default App;
