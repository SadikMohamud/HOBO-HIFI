"use client";

import React, { useState, useEffect, useRef } from "react";

// Types for Navigation Structure
interface MenuItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface FeaturedCard {
  title: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imagePath?: string;
}

// Chevron Icon with dynamic rotation
const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

// Toggle Menu Icon (Hamburger)
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
  </svg>
);

// Close Icon
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<"products" | "ecosystem" | "company" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordions, setMobileAccordions] = useState<{ [key: string]: boolean }>({
    products: false,
    ecosystem: false,
    company: false,
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard escape key to close menus
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menu: "products" | "ecosystem" | "company") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleDropdown = (menu: "products" | "ecosystem" | "company") => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const toggleMobileAccordion = (section: string) => {
    setMobileAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Navigation Data Definitions
  const productsData: MenuSection[] = [
    {
      title: "Core Platform",
      items: [
        {
          title: "MetaMask",
          description: "Self-custodial Web3 wallet used by millions globally.",
          href: "/products/metamask",
          badge: "Popular",
        },
        {
          title: "Linea",
          description: "An Ethereum L2 zkEVM network to scale your dapps.",
          href: "/products/linea",
          badge: "zkEVM",
        },
      ],
    },
    {
      title: "Developer Infrastructure",
      items: [
        {
          title: "Infura",
          description: "Instant, high-performance API access to Ethereum and other chains.",
          href: "/products/infura",
        },
        {
          title: "Diligence",
          description: "Smart contract security audits and automated analysis tools.",
          href: "/products/diligence",
        },
      ],
    },
    {
      title: "Protocol Clients",
      items: [
        {
          title: "Teku",
          description: "Enterprise-grade Ethereum consensus client for stakers and nodes.",
          href: "/products/teku",
        },
        {
          title: "Besu",
          description: "Ethereum execution client for public and private permissioned networks.",
          href: "/products/besu",
        },
      ],
    },
  ];

  const productsFeatured: FeaturedCard = {
    title: "MetaMask Developer",
    tagline: "BUILD WITHOUT LIMITS",
    description: "Build robust, cross-chain applications with MetaMask SDK, Snaps, and developer tools.",
    ctaText: "Explore MetaMask Dev",
    ctaHref: "/products/metamask-developer",
    imagePath: "/assets/cloned/product-card-metamask-dev.webp",
  };

  const ecosystemData: MenuSection[] = [
    {
      title: "Developers",
      items: [
        {
          title: "Documentation",
          description: "Deep dive into APIs, guides, and SDK reference manuals.",
          href: "/ecosystem/docs",
        },
        {
          title: "Bounties & Grants",
          description: "Get funded for building open-source infrastructure and tooling.",
          href: "/ecosystem/grants",
        },
      ],
    },
    {
      title: "Ecosystem Programs",
      items: [
        {
          title: "Partner Network",
          description: "Integrate, co-market, and collaborate with Consensys products.",
          href: "/ecosystem/partners",
        },
        {
          title: "Linea Ecosystem",
          description: "Explore the collection of decentralized apps built on Linea.",
          href: "/ecosystem/linea-apps",
        },
      ],
    },
    {
      title: "Research & Standards",
      items: [
        {
          title: "Ethereum Standards",
          description: "Contribute to EIPs, ERCs, and developer-level specifications.",
          href: "/ecosystem/standards",
        },
        {
          title: "Research Lab",
          description: "Technical breakthroughs and insights on decentralized consensus.",
          href: "/ecosystem/research",
        },
      ],
    },
  ];

  const ecosystemFeatured: FeaturedCard = {
    title: "Linea Builders Program",
    tagline: "SCALE YOUR DAPPS",
    description: "Join the next cohort of developers launching scalable, gas-efficient decentralized applications.",
    ctaText: "Apply for Support",
    ctaHref: "/ecosystem/linea-builders",
    imagePath: "/assets/cloned/linea-prod-card.png",
  };

  const companyData: MenuSection[] = [
    {
      title: "About Us",
      items: [
        {
          title: "Our Mission",
          description: "Learn about our commitment to decentralization and user empowerment.",
          href: "/company/about",
        },
        {
          title: "Leadership",
          description: "Meet the pioneers driving Ethereum infrastructure forward.",
          href: "/company/leadership",
        },
      ],
    },
    {
      title: "Careers",
      items: [
        {
          title: "Join Our Team",
          description: "We are a fully remote, global, decentralized team. Work from anywhere.",
          href: "/company/careers",
          badge: "Hiring",
        },
        {
          title: "Our Values",
          description: "How we practice autonomy, trust, and alignment in our work.",
          href: "/company/values",
        },
      ],
    },
    {
      title: "Newsroom",
      items: [
        {
          title: "Press Releases",
          description: "Official statements, announcements, and media assets.",
          href: "/company/press",
        },
        {
          title: "Brand Guidelines",
          description: "Download verified logo assets and visual stylesheets.",
          href: "/company/brand",
        },
      ],
    },
  ];

  const companyFeatured: FeaturedCard = {
    title: "Building Ethereum",
    tagline: "OUR VISION",
    description: "Read Joe Lubin's perspective on the decentralization of global systems and human agency.",
    ctaText: "Read the Essay",
    ctaHref: "/company/vision",
    imagePath: "/assets/cloned/3d-logo.png",
  };

  // Helper function to render a desktop dropdown panel
  const renderDropdownPanel = (
    menuKey: "products" | "ecosystem" | "company",
    sections: MenuSection[],
    featured: FeaturedCard
  ) => {
    const isVisible = activeDropdown === menuKey;

    return (
      <div
        className={`absolute left-0 right-0 top-16 z-40 w-full border-b border-text-primary bg-bg-primary transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={() => handleMouseEnter(menuKey)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Featured Visual Column */}
            <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-text-primary/10 pb-6 md:pb-0 md:pr-8 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-accent-text">
                  {featured.tagline}
                </span>
                <h4 className="mt-2 font-heading text-2xl font-bold tracking-tight text-text-primary">
                  {featured.title}
                </h4>
                <p className="mt-2 text-sm text-text-primary/75 leading-relaxed">
                  {featured.description}
                </p>
              </div>

              <div className="mt-6">
                {featured.imagePath && (
                  <div className="relative mb-6 h-36 w-full overflow-hidden border border-text-primary/10 bg-bg-secondary flex items-center justify-center">
                    <img
                      src={featured.imagePath}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        // Fallback in case the PNG fails to load
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
                <a
                  href={featured.ctaHref}
                  className="inline-flex items-center justify-center border border-text-primary px-4 py-2 text-xs font-semibold tracking-[-0.04em] text-text-primary hover:bg-text-primary hover:text-bg-primary transition-all duration-200"
                >
                  {featured.ctaText}
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 md:pl-4">
              {sections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-5">
                  <h5 className="font-sans text-[10px] font-bold uppercase tracking-widest text-text-primary/55 border-b border-text-primary/10 pb-2">
                    {section.title}
                  </h5>
                  <ul className="flex flex-col gap-4">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          href={item.href}
                          className="group block"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="font-sans text-sm font-bold text-text-primary group-hover:text-accent-text transition-colors duration-150">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="border border-text-primary px-1.5 py-0.5 text-[8px] uppercase font-bold tracking-tight bg-text-primary text-bg-primary">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-text-primary/70 leading-normal group-hover:text-text-primary transition-colors duration-150">
                            {item.description}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={headerRef} className="relative w-full">
      <header className="sticky top-0 z-50 w-full border-b border-text-primary bg-bg-primary/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
          {/* Logo Link */}
          <a
            href="/"
            className="flex items-center gap-2 text-text-primary hover:text-accent-text transition-colors duration-200"
            aria-label="Consensys Home"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 transition-colors duration-200"
            >
              <path
                d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M35.8694 24.0755V20.8226V12.1484H27.1895H23.9344C17.3432 12.1484 12 17.488 12 24.0748C12 30.6616 17.3439 36.0018 23.9351 36.0018C30.5262 36.0018 35.8694 30.6622 35.8694 24.0755ZM21.2223 18.1116L27.1895 12.1484V20.8226H35.8694L29.9009 26.7885H21.2223V18.1116Z"
                fill="var(--color-bg-primary)"
              />
            </svg>
            <span className="font-heading text-xl font-bold tracking-[-0.04em]">Consensys</span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            <button
              onClick={() => toggleDropdown("products")}
              onMouseEnter={() => handleMouseEnter("products")}
              onMouseLeave={handleMouseLeave}
              aria-expanded={activeDropdown === "products"}
              className="flex items-center gap-1 font-sans text-sm font-medium tracking-[-0.04em] text-text-primary hover:text-accent-text transition-colors cursor-pointer py-5"
            >
              Products
              <ChevronDownIcon isOpen={activeDropdown === "products"} />
            </button>

            <button
              onClick={() => toggleDropdown("ecosystem")}
              onMouseEnter={() => handleMouseEnter("ecosystem")}
              onMouseLeave={handleMouseLeave}
              aria-expanded={activeDropdown === "ecosystem"}
              className="flex items-center gap-1 font-sans text-sm font-medium tracking-[-0.04em] text-text-primary hover:text-accent-text transition-colors cursor-pointer py-5"
            >
              Ecosystem
              <ChevronDownIcon isOpen={activeDropdown === "ecosystem"} />
            </button>

            <button
              onClick={() => toggleDropdown("company")}
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={handleMouseLeave}
              aria-expanded={activeDropdown === "company"}
              className="flex items-center gap-1 font-sans text-sm font-medium tracking-[-0.04em] text-text-primary hover:text-accent-text transition-colors cursor-pointer py-5"
            >
              Company
              <ChevronDownIcon isOpen={activeDropdown === "company"} />
            </button>

            <a
              href="/blog"
              className="font-sans text-sm font-medium tracking-[-0.04em] text-text-primary hover:text-accent-text transition-colors py-5"
            >
              Blog
            </a>
          </nav>

          {/* Call to Action Button */}
          <div className="flex items-center gap-4">
            <a
              href="/products"
              className="hidden sm:inline-flex items-center justify-center border border-text-primary px-5 py-2 text-sm font-medium tracking-[-0.04em] text-text-primary hover:bg-text-primary hover:text-bg-primary transition-all duration-300"
            >
              Explore products
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-primary hover:text-accent-text transition-colors cursor-pointer focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Dropdown Panels */}
      {renderDropdownPanel("products", productsData, productsFeatured)}
      {renderDropdownPanel("ecosystem", ecosystemData, ecosystemFeatured)}
      {renderDropdownPanel("company", companyData, companyFeatured)}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 w-full bg-bg-primary border-t border-text-primary transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        <div className="flex flex-col min-h-[calc(100vh-4rem)] p-6 justify-between">
          <nav className="flex flex-col divide-y divide-text-primary/10">
            {/* Mobile Products Accordion */}
            <div className="py-4">
              <button
                onClick={() => toggleMobileAccordion("products")}
                className="flex w-full items-center justify-between font-heading text-lg font-bold text-text-primary hover:text-accent-text transition-colors"
              >
                Products
                <ChevronDownIcon isOpen={mobileAccordions.products} />
              </button>
              <div
                className={`mt-4 overflow-hidden transition-all duration-300 ${
                  mobileAccordions.products ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-6 pl-4 border-l border-text-primary/10 py-2">
                  {productsData.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-text-primary/50">
                        {section.title}
                      </span>
                      <ul className="flex flex-col gap-4">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a href={item.href} className="group block">
                              <span className="font-sans text-sm font-bold text-text-primary group-hover:text-accent-text transition-colors">
                                {item.title}
                              </span>
                              <p className="mt-1 text-xs text-text-primary/70">
                                {item.description}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Ecosystem Accordion */}
            <div className="py-4">
              <button
                onClick={() => toggleMobileAccordion("ecosystem")}
                className="flex w-full items-center justify-between font-heading text-lg font-bold text-text-primary hover:text-accent-text transition-colors"
              >
                Ecosystem
                <ChevronDownIcon isOpen={mobileAccordions.ecosystem} />
              </button>
              <div
                className={`mt-4 overflow-hidden transition-all duration-300 ${
                  mobileAccordions.ecosystem ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-6 pl-4 border-l border-text-primary/10 py-2">
                  {ecosystemData.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-text-primary/50">
                        {section.title}
                      </span>
                      <ul className="flex flex-col gap-4">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a href={item.href} className="group block">
                              <span className="font-sans text-sm font-bold text-text-primary group-hover:text-accent-text transition-colors">
                                {item.title}
                              </span>
                              <p className="mt-1 text-xs text-text-primary/70">
                                {item.description}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Company Accordion */}
            <div className="py-4">
              <button
                onClick={() => toggleMobileAccordion("company")}
                className="flex w-full items-center justify-between font-heading text-lg font-bold text-text-primary hover:text-accent-text transition-colors"
              >
                Company
                <ChevronDownIcon isOpen={mobileAccordions.company} />
              </button>
              <div
                className={`mt-4 overflow-hidden transition-all duration-300 ${
                  mobileAccordions.company ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-6 pl-4 border-l border-text-primary/10 py-2">
                  {companyData.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-text-primary/50">
                        {section.title}
                      </span>
                      <ul className="flex flex-col gap-4">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a href={item.href} className="group block">
                              <span className="font-sans text-sm font-bold text-text-primary group-hover:text-accent-text transition-colors">
                                {item.title}
                              </span>
                              <p className="mt-1 text-xs text-text-primary/70">
                                {item.description}
                              </p>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Blog Link */}
            <div className="py-4">
              <a
                href="/blog"
                className="block font-heading text-lg font-bold text-text-primary hover:text-accent-text transition-colors"
              >
                Blog
              </a>
            </div>
          </nav>

          {/* Mobile CTA */}
          <div className="mt-8 flex flex-col gap-4 border-t border-text-primary/10 pt-6">
            <a
              href="/products"
              className="flex w-full items-center justify-center border border-text-primary py-3 text-sm font-bold tracking-[-0.04em] text-text-primary hover:bg-text-primary hover:text-bg-primary transition-all duration-200"
            >
              Explore products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
