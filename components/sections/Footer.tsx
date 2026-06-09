import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-section-bg-dark text-bg-primary py-16 border-t border-bg-primary">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Grid Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Newsletter Column */}
          <div className="col-span-2 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-bg-primary">
                  <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M35.8694 24.0755V20.8226V12.1484H27.1895H23.9344C17.3432 12.1484 12 17.488 12 24.0748C12 30.6616 17.3439 36.0018 23.9351 36.0018C30.5262 36.0018 35.8694 30.6622 35.8694 24.0755ZM21.2223 18.1116L27.1895 12.1484V20.8226H35.8694L29.9009 26.7885H21.2223V18.1116Z" fill="var(--color-bg-primary)"/>
                </svg>
                <span className="font-heading text-lg font-bold tracking-[-0.04em]">Consensys</span>
              </div>
              <p className="font-sans text-sm text-bg-primary/60 tracking-[-0.04em] max-w-xs leading-relaxed">
                Consensys is the leading blockchain software technology company building developer tools, enterprise solutions, and decentralized consumer platforms.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="max-w-xs">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.1em] text-bg-primary/60 mb-2">Subscribe to our newsletter</label>
              <div className="flex border border-bg-primary/30 focus-within:border-bg-primary transition-colors">
                <input type="email" id="email" placeholder="Your Email" className="bg-transparent border-0 px-3 py-2 text-sm text-bg-primary focus:outline-none flex-grow" />
                <button className="border-l border-bg-primary/30 px-4 py-2 hover:bg-bg-primary hover:text-text-primary transition-colors text-sm font-semibold tracking-[-0.04em]">Sign Up</button>
              </div>
            </div>
          </div>

          {/* Directory Columns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-bg-primary/55 mb-4">Products</h4>
            <ul className="flex flex-col gap-2.5 text-sm tracking-[-0.04em] text-bg-primary/80">
              <li><a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="hover:text-bg-primary transition-colors">MetaMask</a></li>
              <li><a href="https://infura.io" target="_blank" rel="noopener noreferrer" className="hover:text-bg-primary transition-colors">Infura</a></li>
              <li><a href="https://linea.build" target="_blank" rel="noopener noreferrer" className="hover:text-bg-primary transition-colors">Linea</a></li>
              <li><a href="/staking" className="hover:text-bg-primary transition-colors">Staking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-bg-primary/55 mb-4">Ecosystem</h4>
            <ul className="flex flex-col gap-2.5 text-sm tracking-[-0.04em] text-bg-primary/80">
              <li><a href="/ethereum" className="hover:text-bg-primary transition-colors">Ethereum Core</a></li>
              <li><a href="/developers" className="hover:text-bg-primary transition-colors">Developer Portal</a></li>
              <li><a href="/grants" className="hover:text-bg-primary transition-colors">Grants & Funding</a></li>
              <li><a href="/security" className="hover:text-bg-primary transition-colors">Audit & Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-bg-primary/55 mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5 text-sm tracking-[-0.04em] text-bg-primary/80">
              <li><a href="/about" className="hover:text-bg-primary transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-bg-primary transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-bg-primary transition-colors">Press & News</a></li>
              <li><a href="/contact" className="hover:text-bg-primary transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Metadata & Copyright Bar */}
        <div className="border-t border-bg-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bg-primary/50 tracking-[-0.04em]">
          <div>
            &copy; {currentYear} Consensys. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/cookies" className="hover:underline">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
