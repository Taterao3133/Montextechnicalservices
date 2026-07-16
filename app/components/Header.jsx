"use client";

import Image from "next/image";
import { useState } from "react";
import { serviceGroups } from "../data/siteData";
import { Icon } from "./Icons";

const fallbackCompany = {
  name: "Montex Technical Services L.L.C",
  phone: "+97143595835",
  whatsapp: "+971524269939",
  email: "montextechnicals9@gmail.com",
  hours: "Mon - Sat 8:00 AM - 6:00 PM"
};

const navItems = [
  ["Home", "/#home"],
  ["About Us", "/#about"],
  ["Projects", "/#projects"],
  ["Gallery", "/gallery"],
  ["Certificates", "/certificates"],
  ["Contact Us", "/#contact"]
];

export default function Header({ admin = false, company = fallbackCompany }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenus = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  return (
    <header className="site-header">
      {!admin ? <div className="topbar">
        <div className="container topbarInner">
          <div className="topbarLeft">
            <span>Dubai, UAE</span>
            <span>{company.hours}</span>
            <span>{company.whatsapp}</span>
            <span>{company.phone}</span>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div className="topbarRight">
            <span>Follow Us:</span>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="TikTok">♪</a>
          </div>
        </div>
      </div> : null}

      <nav className="navbar" aria-label="Main navigation">
        <div className="container navbarInner">
          <a className="brand" href={admin ? "/admin" : "/#home"} aria-label="Montex home">
            <Image src="/assets/logo.jpg" alt="Montex Technical Services L.L.C" width={251} height={60} priority />
            {admin ? <span className="adminBrandTitle">Admin Panel</span> : null}
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
            {admin ? (
              <>
                <a className="active" href="/" onClick={closeMenus}>Home</a>
                <form className="headerLogoutForm" action="/api/admin/logout" method="post">
                  <button className="quoteLink" type="submit">Logout</button>
                </form>
              </>
            ) : (
              <>
            {navItems.slice(0, 2).map(([label, href], index) => (
              <a
                className={index === 0 ? "active" : undefined}
                href={href}
                key={href}
                onClick={closeMenus}
              >
                {label}
              </a>
            ))}
            <div
              className={`servicesNav ${servicesOpen ? "isExpanded" : ""}`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="servicesTrigger"
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((current) => !current)}
              >
                Services <span aria-hidden="true">⌄</span>
              </button>
              <div className="megaDropdown" aria-label="Services">
                <div className="megaGrid">
                  {serviceGroups.map((group) => (
                    <section className="megaGroup" key={group.title}>
                      <h3><Icon name={group.icon} /> {group.title}</h3>
                      <div>
                        {group.items.map((item) => (
                          <a href={`/services/${item.slug}`} key={item.slug} onClick={closeMenus}>
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
            {navItems.slice(2).map(([label, href]) => (
              <a href={href} key={href} onClick={closeMenus}>
                {label}
              </a>
            ))}
            <a className="quoteLink" href="/#contact" onClick={closeMenus}>
              Get a Quote <span aria-hidden="true">→</span>
            </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
