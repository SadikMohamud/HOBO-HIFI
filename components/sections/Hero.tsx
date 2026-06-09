import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full bg-section-bg-dark text-bg-primary flex items-center justify-center border-b border-bg-primary py-24 overflow-hidden">
      
      {/* Editorial Grid Backing lines */}
      <div className="absolute inset-0 grid grid-cols-12 gap-6 px-6 md:px-8 opacity-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-l border-bg-primary" />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full flex flex-col items-center justify-center text-center">
        
        {/* Eyebrow or category marker */}
        <span className="mb-4 text-xs font-semibold tracking-[0.2em] text-bg-primary/60 uppercase">
          The Next Era of Finance
        </span>

        {/* Hero Heading */}
        <h1 className="max-w-5xl font-heading text-6xl md:text-8xl font-bold tracking-[-0.04em] leading-[1.05] mb-8">
          Building the era of <br className="hidden md:inline" />
          <span className="text-bg-primary underline decoration-accent-text decoration-4 underline-offset-8">
            Decentralized Finance
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl font-sans text-lg md:text-xl text-bg-primary/80 tracking-[-0.04em] leading-relaxed mb-12">
          Consensys builds the consumer platform, developer, enterprise, and agentic infrastructure, and protocol software powering the transition to decentralized finance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="/products" className="w-full sm:w-auto inline-flex items-center justify-center border border-bg-primary bg-bg-primary text-text-primary px-8 py-3.5 text-base font-medium tracking-[-0.04em] hover:bg-transparent hover:text-bg-primary transition-all duration-300">
            Explore our products
          </a>
          <a href="/ethereum/trust" className="w-full sm:w-auto inline-flex items-center justify-center border border-bg-primary px-8 py-3.5 text-base font-medium tracking-[-0.04em] text-bg-primary hover:bg-bg-primary hover:text-text-primary transition-all duration-300">
            Learn about Trustware
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bg-primary/60 animate-bounce">
          <span className="text-xs font-semibold tracking-[0.1em] uppercase">Scroll to explore</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Floating Trustware PopUp Element */}
        <div className="absolute right-8 bottom-12 hidden lg:flex items-center gap-4 max-w-sm border border-bg-primary bg-section-bg-dark p-4 text-left shadow-2xl transition-all hover:translate-y-[-4px] duration-300">
          <img 
            src="/assets/cloned/Consensys-Trustware-PopUp.png" 
            alt="Ethereum Trustware" 
            className="w-16 h-16 object-contain border border-bg-primary/20"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-accent-text tracking-wider uppercase">Ethereum is Trustware</span>
            <p className="text-xs text-bg-primary/80 line-clamp-2">
              The transition from analog to digital trust is underway. Learn how Ethereum powers the core trust infrastructure.
            </p>
            <a href="/ethereum/trust" className="text-xs font-bold text-bg-primary hover:underline flex items-center gap-1 mt-1">
              Read report &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
