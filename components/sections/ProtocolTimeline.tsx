import React from 'react';

interface TimelineCard {
  upgrade: string;
  title: string;
  desc: string;
  img: string;
}

const timelineCards: TimelineCard[] = [
  {
    upgrade: "PECTRA",
    title: "The Pectra Upgrade",
    desc: "The Pectra upgrade to the execution and consensus layers introduced Smart Accounts, EIP-7702, and other powerful features making wallets more programmable and secure.",
    img: "/assets/cloned/pectra.png"
  },
  {
    upgrade: "DENCUN",
    title: "The Dencun Upgrade",
    desc: "The Dencun Upgrade introduced proto-danksharding and blobs (EIP-4844), drastically reducing transaction fees on Layer 2 rollups and enhancing scalability.",
    img: "/assets/cloned/dencun.png"
  },
  {
    upgrade: "THE MERGE",
    title: "The Merge Milestone",
    desc: "The historic transition of Ethereum from Proof of Work to Proof of Stake, cutting energy usage by 99.9% and establishing consensus-driven validators.",
    img: "/assets/cloned/the-merge.png"
  }
];

export default function ProtocolTimeline() {
  return (
    <section className="w-full bg-section-bg-dark text-bg-primary py-24 border-b border-bg-primary">
      
      {/* Introduction Block */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-20">
        <div className="border-t border-bg-primary pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-bg-primary/60 uppercase">Building Ethereum</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.04em] mt-2">The Protocol Powering the Future of Finance</h2>
          </div>
          <div className="lg:col-span-8 lg:pl-12 flex flex-col justify-end">
            <p className="font-sans text-lg md:text-xl text-bg-primary/80 tracking-[-0.04em] leading-relaxed mb-6">
              From Block 0 through The Merge and beyond, Consensys has been instrumental in Ethereum's evolution into the world's most vital public blockchain — the core trust infrastructure for the global economy.
            </p>
            <p className="font-sans text-sm text-bg-primary/60 tracking-[-0.04em] leading-relaxed">
              Ethereum enables instant settlement, transparent transactions, and programmable financial services. Consensys contributes to every major protocol upgrade, building and maintaining execution and consensus clients that secure the network.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Cards Stack */}
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {timelineCards.map((card, idx) => (
            <div key={idx} className="flex flex-col border border-bg-primary/30 bg-section-bg-dark hover:border-bg-primary transition-all duration-300">
              
              {/* Card Media */}
              <div className="aspect-[16/9] w-full overflow-hidden border-b border-bg-primary/30">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-300" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-accent-text tracking-wider uppercase">{card.upgrade}</span>
                  <h3 className="font-heading text-xl font-bold tracking-[-0.04em] mt-2 mb-3">{card.title}</h3>
                  <p className="font-sans text-sm text-bg-primary/80 tracking-[-0.04em] leading-relaxed mb-6">{card.desc}</p>
                </div>
                <a href={`/ethereum-${card.upgrade.toLowerCase().replace(" ", "-")}`} className="inline-flex items-center gap-1 text-sm font-semibold tracking-[-0.04em] text-bg-primary hover:text-accent-text transition-colors">
                  Learn More &rarr;
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
