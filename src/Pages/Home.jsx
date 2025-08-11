// src/Pages/Home.jsx
import React, { useState } from "react";
import Beams from "../components/Beams";
import TextType from "../components/TextType";
import TimelineDemo from "../components/ui/timeline-demo";
import { Navbar } from "../components/Navbar";
import Projects from "../components/Projects";
import About from "../components/About";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";

export const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target;
      const formData = new FormData(form);
      
      // Using FormSubmit.co for email delivery
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      setShowPopup(true);
      form.reset();
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* background beams */}
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

      {/* styles scoped to this file */}
      <style>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }

        /* container for hero content */
        .hero-content {
          position: relative;
          z-index: 1;
        }

        /* Title: balanced shadow + outer glow */
        .hero-title {
          text-shadow:
            0 3px 6px rgba(0, 0, 0, 0.6),   /* dark shadow for light backgrounds */
            0 -1px 1px rgba(0, 0, 0, 0.4),
            0 0 8px rgba(255, 255, 255, 0.4); /* light glow for dark backgrounds */
          line-height: 1.02;
        }

        /* typed line: subtle outline + inner glow */
        .hero-type {
          position: relative;
          display: inline-block;
          padding: 0.25rem 0.5rem;
          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 6px rgba(255, 255, 255, 0.35);
        }

        /* subtext paragraph shadow to increase legibility */
        .hero-desc {
          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 4px rgba(255, 255, 255, 0.25);
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        <Navbar />

        <section
          id="home"
          className="hero-section min-h-screen flex flex-col items-center justify-center p-8 text-white"
        >
          <div className="hero-content w-full max-w-5xl text-center">
            <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-white">
              Hi, I'm <span className="text-neutral-200">Nevil Biju</span>
            </h1>

            <div className="mt-4 hero-type">
              <TextType
                text={[
                  "Web Developer",
                  "Cloud & DevOps Engineer",
                  "Software Engineer",
                  "Full Stack Developer",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-xl sm:text-2xl md:text-3xl text-neutral-200"
                textColors={["#9aa1a8", "#bfc7cf", "#dfe6ea", "#eaeef0"]}
                startOnVisible={true}
              />
            </div>

            <p className="mt-8 hero-desc text-neutral-200 max-w-2xl mx-auto text-lg">
              I build polished, responsive web apps and tooling — focusing on
              reliable systems, delightful UI and pragmatic engineering.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-white/90 text-black rounded-md font-medium shadow-sm hover:scale-[1.02] transition-transform"
              >
                View Work
              </a>
              <a
                href="#about"
                className="px-6 py-3 border border-white/10 text-white rounded-md hover:bg-white/5 transition-colors"
              >
                About
              </a>
            </div>
          </div>
        </section>

        {/* About (component below) */}
        <About />

        {/* Timeline section */}
        <section id="timeline" className="min-h-screen p-8 bg-transparent">
          <TimelineDemo />
        </section>

        {/* Projects section */}
        <section id="projects" className="min-h-screen p-8 bg-transparent">
          <Projects />
        </section>

        {/* New Contact Section */}
        <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-silver-300 to-silver-500">
                Get In Touch
              </h2>
              <p className="mt-4 text-silver-300 text-lg max-w-2xl mx-auto">
                Have a project in mind or want to discuss opportunities? Reach out to me directly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Contact Form */}
              <div className="bg-neutral-900/70 backdrop-blur-md p-8 rounded-2xl border border-silver-500/30 shadow-xl shadow-neutral-900/30">
                <form 
                  action={`https://formsubmit.co/nevilbiju9497@gmail.com`} 
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New message from portfolio!" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-silver-200 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full bg-neutral-800/60 border border-silver-500/40 rounded-lg py-3 px-4 text-silver-100 focus:outline-none focus:ring-2 focus:ring-silver-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-silver-200 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full bg-neutral-800/60 border border-silver-500/40 rounded-lg py-3 px-4 text-silver-100 focus:outline-none focus:ring-2 focus:ring-silver-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-silver-200 mb-2">Subject</label>
                    <input
                      type="text"
                      name="_subject"
                      id="subject"
                      required
                      className="w-full bg-neutral-800/60 border border-silver-500/40 rounded-lg py-3 px-4 text-silver-100 focus:outline-none focus:ring-2 focus:ring-silver-500"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-silver-200 mb-2">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      className="w-full bg-neutral-800/60 border border-silver-500/40 rounded-lg py-3 px-4 text-silver-100 focus:outline-none focus:ring-2 focus:ring-silver-500"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                    <motion.button
                      type="submit"
                      className="w-full py-3 px-6 bg-gradient-to-r from-silver-600 to-silver-800 text-white font-medium rounded-lg relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 0 15px rgba(192, 192, 192, 0.7)"
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        boxShadow: "0 0 10px rgba(192, 192, 192, 0.5)"
                      }}
                      disabled={isSubmitting}
                    >
                      {/* Glow effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-silver-400/20 to-silver-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                      
                      {/* Button content */}
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </span>
                    </motion.button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-silver-200 mb-4">Direct Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-silver-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-medium text-silver-200">Email</p>
                        <a href="mailto:nevilbiju9497@gmail.com" className="text-silver-300 hover:text-silver-100 transition-colors">
                          nevilbiju9497@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-silver-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-medium text-silver-200">Location</p>
                        <p className="text-silver-300">Kerala, India</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-silver-200 mb-4">Let's Connect</h3>
                  <p className="text-silver-300 mb-6">
                    Feel free to reach out through any platform. I'm always open to discussing new projects, creative ideas, or opportunities.
                  </p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/JOSU10xD" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-silver-300 hover:text-silver-100 transition-colors"
                      aria-label="GitHub"
                    >
                      <SiGithub className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://www.instagram.com/josu10_03" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-silver-300 hover:text-silver-100 transition-colors"
                      aria-label="Instagram"
                    >
                      <SiInstagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Message Sent Popup */}
        {showPopup && (
          <motion.div 
            className="fixed top-4 right-4 bg-gradient-to-r from-silver-500 to-silver-700 text-black p-4 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Message sent successfully!</span>
            </div>
          </motion.div>
        )}

        {/* New Footer */}
        <footer className="py-12 bg-neutral-900/70 backdrop-blur-md border-t border-silver-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold text-silver-200">Nevil Biju</h2>
                <p className="mt-2 text-silver-300">
                  Full Stack Developer & Cloud Engineer
                </p>
              </div>
              
              <div className="flex space-x-6">
                <a 
                  href="https://github.com/JOSU10xD" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver-300 hover:text-silver-100 transition-colors"
                  aria-label="GitHub"
                >
                  <SiGithub className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/josu10_03" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver-300 hover:text-silver-100 transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div className="mt-8 border-t border-silver-500/30 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-silver-300 text-sm">
                © {new Date().getFullYear()} Nevil Biju. All rights reserved.
              </p>
              
              <div className="mt-4 md:mt-0">
                <nav className="flex space-x-6">
                  <a href="#home" className="text-silver-300 hover:text-silver-100 text-sm transition-colors">
                    Home
                  </a>
                  <a href="#about" className="text-silver-300 hover:text-silver-100 text-sm transition-colors">
                    About
                  </a>
                  <a href="#projects" className="text-silver-300 hover:text-silver-100 text-sm transition-colors">
                    Projects
                  </a>
                  <a href="#contact" className="text-silver-300 hover:text-silver-100 text-sm transition-colors">
                    Contact
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;