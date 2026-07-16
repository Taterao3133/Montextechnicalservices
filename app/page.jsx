import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Icon } from "./components/Icons";
import { projects, services } from "./data/siteData";
import { getContent } from "./lib/content";

const homeServices = [
  { ...services.find((service) => service.slug === "ac-installation"), title: "Air Conditioning" },
  { ...services.find((service) => service.slug === "electrical-installation"), title: "Electrical Works" },
  { ...services.find((service) => service.slug === "plumbing-services"), title: "Plumbing & Sanitary" },
  { icon: "paint", title: "Painting Services", slug: "painting-services", href: "/#contact", excerpt: "Interior & Exterior Painting" },
  services.find((service) => service.slug === "false-ceiling-gypsum"),
  services.find((service) => service.slug === "building-cleaning")
];

const qualityPoints = [
  "Dubai Licensed & Certified Company",
  "Skilled & Experienced Technicians",
  "On-time Service & Fast Response",
  "Quality Workmanship Guaranteed"
];

const stats = [
  ["users", "200+", "Happy Clients"],
  ["building", "220+", "Projects Completed"],
  ["worker", "20+", "Skilled Professionals"],
  ["shield", "100%", "Satisfaction Guarantee"]
];

const licenseActivities = [
  "Air-Conditioning, Ventilations & Air Filtration Systems Installation & Maintenance",
  "Carpentry & Wood Flooring Works",
  "Plumbing & Sanitary Installation",
  "Building Cleaning Services",
  "False Ceiling & Light Partitions Installation",
  "Electromechanical Equipment Installation and Maintenance",
  "Floor & Wall Tiling Works",
  "Painting Contracting"
];

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  const { company } = await getContent();
  const params = await searchParams;
  const contactStatus = params?.contact;

  return (
    <>
      <Header company={company} />

      <main id="home">
        <Hero services={homeServices} />

        <section className="quality section">
          <div className="container qualityGrid">
            <div className="sectionCopy">
              <p className="label"><Icon name="shield" /> Why Choose Us</p>
              <h2>Quality Service. <span>Every Time.</span></h2>
              <p>
                We are committed to providing reliable, efficient and cost effective technical
                solutions with a focus on safety, quality and customer satisfaction.
              </p>
              <ul className="checkList">
                {qualityPoints.map((point) => (
                  <li key={point}><Icon name="check" /> {point}</li>
                ))}
              </ul>
              <a className="btn btnDark" href="#about">More About Us <span>→</span></a>
            </div>
            <div className="qualityMedia">
              <Image className="qualityMain" src="/assets/quality-ac.jpg" alt="Technician repairing air conditioning unit" width={267} height={341} />
              <div className="qualitySide">
                <Image src="/assets/quality-electrical.jpg" alt="Electrical technician at panel" width={211} height={160} />
                <Image src="/assets/quality-plumbing.jpg" alt="Plumbing technician repairing sink" width={211} height={161} />
              </div>
              <div className="experience">
                <Icon name="shield" />
                <strong>5+</strong>
                <span>Years of Experience</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container statsGrid">
            {stats.map(([icon, value, label]) => (
              <div key={label}>
                <Icon name={icon} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container aboutGrid">
            <div className="aboutImages">
              <Image className="wideImage" src="/assets/project-house.jpg" alt="Modern villa technical services project" width={344} height={162} />
              <Image src="/assets/project-ceiling-work.jpg" alt="False ceiling installation work" width={170} height={130} />
              <Image src="/assets/project-paint-work.jpg" alt="Villa painting work" width={168} height={130} />
            </div>
            <div className="sectionCopy">
              <p className="label arrow">About Montex</p>
              <h2>Delivering Excellence Across <span>Dubai</span></h2>
              <p>
                Montex Technical Services L.L.C is a fully licensed technical service company in Dubai.
                We provide end-to-end solutions for residential, commercial and industrial clients.
              </p>
              <p>
                From small maintenance to large scale projects, we ensure quality, reliability and
                professionalism in everything we do.
              </p>
              <div className="valueGrid">
                <span>Licensed Company</span>
                <span>Quality Work</span>
                <span>Customer Focused</span>
                <span>Safe & Reliable</span>
              </div>
              <a className="btn btnDark" href="#projects">View Our Projects <span>→</span></a>
            </div>
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="container sectionHead">
            <div>
              <p className="label arrow">Our Projects</p>
              <h2>Recent Technical Work</h2>
            </div>
            <a className="outlineLink" href="/gallery">View All Projects <span>→</span></a>
          </div>
          <div className="container projectGrid">
            {projects.map((project) => (
              <article key={project.slug}>
                <a href={`/projects/${project.slug}`} aria-label={`View ${project.title} project`}>
                  <Image src={`/assets/${project.image}`} alt={project.title} width={344} height={190} />
                  <h3>{project.title}</h3>
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="contact section" id="contact">
          <div className="container contactGrid">
            <div className="sectionCopy">
              <p className="label">Contact Us</p>
              <h2>Request a Free Quote</h2>
              <p style={{color:'#e9c260'}}>Send your requirement and our team will respond with the right technical service solution.</p>
              <div className="contactLines">
                <div className="contaLines_inner">
                 <a href={`tel:${company.phone}`}>{company.phone}</a> , <a href={`tel:${company.whatsapp}`}>{company.whatsapp}</a>
                </div>
                
                
                <a href={`mailto:${company.email}`}>{company.email}</a>
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>

            <form className="quoteForm" action="/api/contact" method="post">
              {contactStatus === "sent" ? <p className="formNotice">Thank you. Your enquiry has been received.</p> : null}
              {contactStatus === "invalid" ? <p className="formNotice error">Please check the form details and try again.</p> : null}
              {contactStatus === "limited" ? <p className="formNotice error">Too many enquiries were sent. Please try again later.</p> : null}
              <label className="formTrap">Website<input name="website" type="text" tabIndex="-1" autoComplete="off" /></label>
              <label>Name<input name="name" type="text" autoComplete="name" required /></label>
              <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
              <label>
                Service
                <select name="service" required defaultValue="">
                  <option value="" disabled>Select service</option>
                  {services.map((service) => <option key={service.title}>{service.title}</option>)}
                  <option>Other Technical Service</option>
                </select>
              </label>
              <label>Message<textarea name="message" rows="4" required /></label>
              <button className="btn btnGold" type="submit">Send Enquiry <span>→</span></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <Image src="/assets/logo.jpg" alt="Montex Technical Services L.L.C" width={180} height={43} />
          <p><span style={{ color: "#e9c260", fontWeight: "700" ,fontSize:"16px" }}>Address : </span> {company.address}</p>
          <p>© 2026 Montex Technical Services L.L.C. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
