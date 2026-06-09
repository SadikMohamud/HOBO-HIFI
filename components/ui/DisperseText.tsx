"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface DisperseTextProps {
  text: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

// Preset subtle translations and rotations for character scattering on hover
const transforms = [
  { x: -0.6, y: -0.4, rotationZ: -20 },
  { x: -0.15, y: -0.3, rotationZ: -5 },
  { x: -0.03, y: 0.08, rotationZ: 8 },
  { x: -0.03, y: -0.08, rotationZ: -6 },
  { x: -0.08, y: 0.4, rotationZ: 2 },
  { x: 0, y: -0.08, rotationZ: 6 },
  { x: 0, y: 0.1, rotationZ: -8 },
  { x: 0, y: 0.1, rotationZ: -12 },
  { x: 0, y: -0.45, rotationZ: 6 },
  { x: 0.08, y: 0.3, rotationZ: 8 },
  { x: 0, y: -0.1, rotationZ: -6 },
  { x: 0.15, y: 0.1, rotationZ: 8 },
  { x: 0.6, y: 0.4, rotationZ: 15 }
];

export default function DisperseText({ text, className = "", onClick, active }: DisperseTextProps) {
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".disperse-char");
    chars.forEach((char, i) => {
      const t = transforms[i % transforms.length];
      gsap.to(char, {
        x: `${t.x * 0.3}em`, // subtle scaling factor for elegant micro-animation
        y: `${t.y * 0.3}em`,
        rotation: t.rotationZ * 0.4,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".disperse-char");
    gsap.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-pointer inline-flex items-center select-none outline-none ${className}`}
    >
      {[...text].map((char, i) => (
        <span
          key={i}
          className="disperse-char inline-block relative will-change-transform"
          style={{ 
            whiteSpace: char === " " ? "pre" : "normal",
            transition: "color 0.3s ease"
          }}
        >
          {char}
        </span>
      ))}
    </button>
  );
}
