import Image from "next/image";
import { Icon } from "./Icons";
import styles from "./Hero.module.css";

const avatars = ["A", "B", "C", "D"];

const serviceLabels = {
  "Air Conditioning": ["Air Conditioning", "Installation, Repair & Maintenance"],
  "Electrical Works": ["Electrical Works", "All Types of Electrical Installation & Repair"],
  "Plumbing & Sanitary": ["Plumbing & Sanitary", "Plumbing, Fixtures & Pipe Works"],
  "Painting Services": ["Painting Services", "Interior & Exterior Painting"],
  "False Ceiling & Gypsum": ["False Ceiling & Gypsum", "Gypsum, POP & False Ceiling Works"],
  "Building Cleaning": ["Building Cleaning", "Professional Cleaning Services"]
};

export default function Hero({ services }) {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <Image
          className={styles.heroImage}
          src="/assets/hero-light.png"
          alt="Montex service van outside a luxury Dubai villa"
          fill
          priority
          sizes="70vw"
        />
        <div className={styles.overlay} aria-hidden="true" />

        <div className={`container ${styles.inner}`}>
          <div className={styles.content}>
            <p className={styles.badge}>
              <Icon name="shield" />
              Licensed. Reliable. Professional.
            </p>

            <h1 id="hero-title" className={styles.title}>
              Your Trusted Partner for <br />
              All <span>Technical Services</span>
            </h1>

            <p className={styles.subtitle}>
              Montex Technical Services L.L.C is a Dubai based technical service provider delivering
              high quality solutions for homes, offices & industries.
            </p>

            <div className={styles.actions} aria-label="Hero actions">
              <a className={`${styles.button} ${styles.primary}`} href="#contact">
                Request a Free Quote
                <span aria-hidden="true">→</span>
              </a>
              <a className={`${styles.button} ${styles.secondary}`} href="#services">
                Our Services
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className={styles.trust}>
              <div className={styles.avatars} aria-hidden="true">
                {avatars.map((avatar) => (
                  <span key={avatar} />
                ))}
              </div>
              <div>
                <strong>Trusted by 500+ Clients</strong>
                <span>Dubai & Across UAE</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.floatingActions} aria-label="Quick contact">
          <a className={styles.whatsapp} href="https://wa.me/971525322481" aria-label="Chat with Montex on WhatsApp">
            <Icon name="chat" />
            <span>WhatsApp</span>
          </a>
          <a className={styles.call} href="tel:+971525322481" aria-label="Call Montex Technical Services">
            <Icon name="phone" />
            <span>Call Us</span>
          </a>
        </div>
      </section>

      <section className={styles.serviceFloat} id="services" aria-label="Main services">
        <div className={`container ${styles.serviceGrid}`}>
          {services.map(([icon, title]) => (
            <a className={styles.serviceCard} href="#contact" key={title} aria-label={`Request ${title} service`}>
              <Icon name={icon} />
              <h3>{serviceLabels[title]?.[0] ?? title}</h3>
              <p>{serviceLabels[title]?.[1] ?? "Professional technical service"}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
