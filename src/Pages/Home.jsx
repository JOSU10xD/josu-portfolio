import Beams from '@/components/Beams'

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
          noiseIntensity={1.75}
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
          <h1 className="text-4xl font-bold">Welcome to my portfolio</h1>
        </section>

        <section className="min-h-screen flex items-center justify-center p-8 text-white">
          <h2 className="text-3xl">About Me</h2>
        </section>

        <section className="min-h-screen flex items-center justify-center p-8 text-white">
          <h2 className="text-3xl">Projects</h2>
        </section>

        {/* add as many sections as you like… */}
      </div>
    </div>
  )
}
