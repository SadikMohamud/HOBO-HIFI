"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import 3D and UI components to completely bypass SSR problems
const SceneStudio = dynamic(() => import("@/components/3d/SceneStudio"), { ssr: false });
const OverlayUI = dynamic(() => import("@/components/ui/OverlayUI"), { ssr: false });

export default function Home() {
  const [activeFinish, setActiveFinish] = useState("walnut");
  const [activeSection, setActiveSection] = useState(0);
  const scrollProxy = useRef({ progress: 0 });

  useEffect(() => {
    let lenisInstance: any = null;
    let scrollTriggerInstances: any[] = [];
    let scrollAnimation: any = null;

    // Load GSAP, ScrollTrigger, and Lenis dynamically only in the client browser environment
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const Lenis = lenisModule.default;

      // Register the plugin
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      const raf = (time: number) => {
        if (lenisInstance) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
      };
      requestAnimationFrame(raf);

      // Bind ScrollTrigger to transition the scrollProxy.current.progress from 0 to 1
      scrollAnimation = gsap.to(scrollProxy.current, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Set up checkpoints to update activeSection index
      const sectionIds = ["#hero-sec", "#tweeter-sec", "#finish-sec", "#specs-sec"];
      sectionIds.forEach((id, index) => {
        const trigger = ScrollTrigger.create({
          trigger: id,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(index),
          onEnterBack: () => setActiveSection(index),
        });
        scrollTriggerInstances.push(trigger);
      });
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (scrollAnimation) {
        scrollAnimation.scrollTrigger?.kill();
        scrollAnimation.kill();
      }
      scrollTriggerInstances.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main id="scroll-container" className="relative w-full bg-[#121212] font-sans antialiased text-[#EAEAEA]">
      {/* 3D WebGL Canvas Layer (Fixed in viewport background) */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Canvas
          shadows
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            toneMappingExposure: 1.0,
          }}
          camera={{ position: [0, 0.4, 4.5], fov: 40 }}
        >
          <color attach="background" args={["#121212"]} />
          <Suspense fallback={null}>
            <SceneStudio
              scrollProxy={scrollProxy}
              activeFinish={activeFinish}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Transparent Scroll Spacers to define scroll height */}
      <div className="relative z-10 w-full flex flex-col">
        <section id="hero-sec" className="w-full h-screen pointer-events-none" />
        <section id="tweeter-sec" className="w-full h-screen pointer-events-none" />
        <section id="finish-sec" className="w-full h-screen pointer-events-none" />
        <section id="specs-sec" className="w-full h-screen pointer-events-none" />
      </div>

      {/* Swiss Editorial Typographic Grid Overlay */}
      <OverlayUI
        activeFinish={activeFinish}
        setActiveFinish={setActiveFinish}
        activeSection={activeSection}
      />
    </main>
  );
}
