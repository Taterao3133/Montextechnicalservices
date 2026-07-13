"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Certificates", "#certificates"],
  ["Contact Us", "#contact"]
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbarInner">
          <div className="topbarLeft">
            <span>Dubai, UAE</span>
            <span>Mon - Sat 8:00 AM - 6:00 PM</span>
            <span>+971524269939</span>
            <a href="montextechnicals9@gmail.com">montextechnicals9@gmail.com</a>
          </div>
          <div className="topbarRight">
            <span>Follow Us:</span>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="TikTok">♪</a>
          </div>
        </div>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <div className="container navbarInner">
          <a className="brand" href="#home" aria-label="Montex home">
            <Image src="/assets/logo.jpg" alt="Montex Technical Services L.L.C" width={251} height={60} priority />
          </a>

          <button
            className="menuToggle"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`navLinks ${open ? "isOpen" : ""}`}>
            {navItems.map(([label, href], index) => (
              <a
                className={index === 0 ? "active" : undefined}
                href={href}
                key={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a className="quoteLink" href="#contact" onClick={() => setOpen(false)}>
              Get a Quote <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
