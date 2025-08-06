// src/Pages/Home.jsx
import Beams from '@/components/Beams';
import SplitText from "@/components/SplitText";
import TimelineDemo from "@/components/ui/timeline-demo";
import { Navbar } from '@/components/Navbar';

export const Home = () => {
  return (
    <div className="relative">
      {/* 3D background canvas */}
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

      {/* Scrollable content wrapped in one responsive container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        <Navbar />

        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center p-8 text-white"
        >
          <SplitText
            text="Hi, I'm Nevil Biju!"
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

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center p-8 text-white"
        >
          <h2 className="text-3xl">About Me</h2>
        </section>

        {/* Timeline Section */}
        <section
          id="timeline"
          className="min-h-screen p-8 bg-transparent"
        >
          <TimelineDemo />
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center p-8 text-white"
        >
          <h2 className="text-3xl">Projects :</h2>
        </section>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
};
