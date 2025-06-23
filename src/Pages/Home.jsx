import Beams from '@/components/Beams'
import SplitText from "@/components/SplitText";
import TimelineDemo from "@/components/ui/timeline-demo";


export const Home = () => {
  return (
    // This outer div will grow to fit all your content,
    // so its height = total scrollable height.
    <div className="relative">
      {/* 
        1) Absolutely fill the parent’s full height (not just 1 viewport).
        2) z-0 so it lives behind your content.
      */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Beams
          beamWidth={1.8}
          beamHeight={40}
          beamNumber={10}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* 
        3) Your scrollable content goes here. 
           As you add more sections, the parent’s height grows,
           and so does the background div—so scrolling reveals
           lower parts of your 3D scene.
      */}
      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center p-8 text-white">
        <SplitText
          text="Welcome To The Portfolio"
          className="text-7xl font-poppins font-bold text-center tracking-wide text-neutral-200"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        </section>

        <section className="min-h-screen flex items-center justify-center p-8 text-white">
          <h2 className="text-3xl">About Me</h2>
        </section>

 {/* —— Timeline section —— */}
      <section className="min-h-screen p-8 bg-transparent">
        <TimelineDemo />
      </section>

        <section className="min-h-screen flex items-center justify-center p-8 text-white">
          <h2 className="text-3xl">Projects</h2>
        </section>

        {/* add as many sections as you like… */}
      </div>
    </div>
  )
}
