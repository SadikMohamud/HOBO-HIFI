import React from 'react';

interface Stat {
  label: string;
  val: string;
}

interface ShowcaseProduct {
  name: string;
  desc: string;
  cta: string;
  url: string;
  stats: Stat[];
  img: string;
}

interface EcoProduct {
  name: string;
  desc: string;
  img: string;
}

const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    name: "MetaMask",
    desc: "MetaMask is the world's most widely adopted self-custodial finance platform, with over millions of users and billions of dollars in digital assets secured. Users send, trade, earn, pay, and connect — all through a single interface backed by integrated transaction security.",
    cta: "Download MetaMask",
    url: "https://metamask.io/download",
    stats: [
      { label: "Users", val: "M" },
      { label: "Connected Dapps", val: "k" }
    ],
    img: "/assets/cloned/product-card-metamask.webp"
  },
  {
    name: "MetaMask Developer",
    desc: "MetaMask Developer enables third-party application builders and agents to integrate with MetaMask and distribute digital asset experiences to millions of users — from wallet connections via the Connect SDK to embedded wallet functionality.",
    cta: "Explore Developer Products",
    url: "https://metamask.io/developer",
    stats: [
      { label: "Users", val: "M" },
      { label: "Dapps", val: "k+" }
    ],
    img: "/assets/cloned/product-card-metamask-dev.webp"
  },
  {
    name: "Infura",
    desc: "Infura is the Internet Service Provider for Ethereum and other blockchain networks — scalable API infrastructure so developers can read and write to supported chains without operating their own nodes. Infura powers thousands of decentralized applications.",
    cta: "Build with Infura",
    url: "https://docs.metamask.io/services/",
    stats: [
      { label: "Requests / Year", val: "T" },
      { label: "Developers", val: "k" }
    ],
    img: "/assets/cloned/product-card-infura.webp"
  }
];

const ECO_PRODUCTS: EcoProduct[] = [
  {
    name: "Linea",
    desc: "An Ethereum-equivalent Layer 2 network built with zero-knowledge technology.",
    img: "/assets/cloned/linea-prod-card.png"
  },
  {
    name: "Consensys Staking",
    desc: "Secure, reliable staking infrastructure for institutions.",
    img: "/assets/cloned/consesnsys.png"
  },
  {
    name: "Teku",
    desc: "A full Ethereum client built for institutional staking requirements.",
    img: "/assets/cloned/teku.png"
  },
  {
    name: "Besu",
    desc: "An open source Ethereum client for public and private network deployments.",
    img: "/assets/cloned/besu.png"
  }
];

/**
 * ProductGrid component displaying Consensys core products and infrastructure.
 * Built using semantic HTML and Tailwind CSS v4, matching the site's editorial design.
 * Defaults to a React Server Component (RSC).
 */
export default function ProductGrid() {
  return (
    <section className="w-full bg-bg-primary text-text-primary py-24 border-b border-text-primary">
      
      {/* Header Section */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-16">
        <div className="border-t border-text-primary pt-6 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-text-primary/60 uppercase">
              The Trustware Finance Stack
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.04em] mt-2">
              Our Core Products
            </h2>
          </div>
          <a 
            href="/products" 
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-[-0.04em] border-b border-text-primary pb-1 hover:text-accent-text hover:border-accent-text transition-all duration-200"
          >
            See all products &rarr;
          </a>
        </div>
      </div>

      {/* Large Showcase Cards Stack */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col gap-12 mb-24">
        {SHOWCASE_PRODUCTS.map((prod, idx) => (
          <div 
            key={idx} 
            className="grid grid-cols-1 lg:grid-cols-2 border border-text-primary transition-all hover:shadow-[8px_8px_0px_0px_rgba(18,18,18,0.05)] duration-300"
          >
            {/* Info Column */}
            <div className="flex flex-col justify-between p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-text-primary">
              <div>
                <h3 className="font-heading text-3xl font-bold tracking-[-0.04em] mb-4">
                  {prod.name}
                </h3>
                <p className="font-sans text-base text-text-primary/80 tracking-[-0.04em] leading-relaxed mb-8">
                  {prod.desc}
                </p>
                <a 
                  href={prod.url} 
                  className="inline-flex items-center gap-2 border border-text-primary px-6 py-2.5 text-sm font-semibold tracking-[-0.04em] hover:bg-text-primary hover:text-bg-primary transition-all duration-300"
                >
                  {prod.cta} &rarr;
                </a>
              </div>
              
              {/* Stats Bar */}
              <div className="flex gap-8 border-t border-text-primary pt-8 mt-12">
                {prod.stats.map((st, i) => (
                  <div key={i}>
                    <span className="text-xs text-text-primary/60 tracking-[-0.04em] uppercase">
                      {st.label}
                    </span>
                    <div className="font-heading text-4xl font-bold tracking-[-0.04em] mt-1">
                      {st.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Carousel / Image Column */}
            <div className="relative aspect-[4/3] bg-[#f8f8f8] flex items-center justify-center overflow-hidden">
              <img 
                src={prod.img} 
                alt={prod.name} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/20 to-transparent pointer-events-none" />
            </div>

          </div>
        ))}
      </div>

      {/* Ecosystem & Infrastructure Grid (4-Up) */}
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="border-t border-text-primary pt-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-text-primary/60 uppercase block mb-8">
            ECOSYSTEM & INFRASTRUCTURE
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ECO_PRODUCTS.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col border border-text-primary p-6 hover:shadow-[4px_4px_0px_0px_rgba(18,18,18,0.05)] transition-all duration-300"
              >
                <h4 className="font-heading text-xl font-bold tracking-[-0.04em] mb-3">
                  {item.name}
                </h4>
                <p className="font-sans text-sm text-text-primary/80 tracking-[-0.04em] leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>
                <div className="aspect-[2/1] relative border border-text-primary/20 bg-[#fbfbfb] flex items-center justify-center p-4">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
