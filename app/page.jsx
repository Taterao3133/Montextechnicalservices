import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Icon } from "./components/Icons";

const services = [
  ["ac", "Air Conditioning", "Installation, Repair & Maintenance"],
  ["electric", "Electrical Works", "All Types of Electrical Installation & Repair"],
  ["plumbing", "Plumbing & Sanitary", "Plumbing, Fixtures & Pipe Works"],
  ["paint", "Painting Services", "Interior & Exterior Painting"],
  ["ceiling", "False Ceiling & Gypsum", "Gypsum, POP & False Ceiling Works"],
  ["cleaning", "Building Cleaning", "Professional Cleaning Services"]
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

export default function Home() {
  return (
    <>
      <Header />

      <main id="home">
        <Hero services={services} />

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
            <a className="outlineLink" href="#contact">View All Projects <span>→</span></a>
          </div>
          <div className="container projectGrid">
            {[
              ["project-house.jpg", "Villa - Technical Maintenance"],
              ["quality-ac.jpg", "Villa - Air Conditioning"],
              ["quality-electrical.jpg", "Commercial - Electrical Works"],
              ["quality-plumbing.jpg", "Residential - Plumbing Works"],
              ["project-paint-work.jpg", "Villa - Painting Project"]
            ].map(([src, title]) => (
              <article key={title}>
                <Image src={`/assets/${src}`} alt={title} width={344} height={190} />
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>

        {/* <section className="license section" id="certificates">
          <div className="container licenseGrid">
            <div className="sectionCopy">
              <p className="label"><Icon name="shield" /> Certificates</p>
              <h2>Government Registered Technical Services</h2>
              <p>
                Montex is listed for active license activities covering installation, maintenance,
                finishing and cleaning services in Dubai.
              </p>
              <ul className="activityList">
                {licenseActivities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <a className="licenseProof" href="/assets/trade-license.jpg" aria-label="Open trade license image">
              <Image src="/assets/trade-license.jpg" alt="Dubai Economy and Tourism license activities document for Montex" width={900} height={1639} /> 
            </a>
          </div>
        </section> */}

        <section className="contact section" id="contact">
          <div className="container contactGrid">
            <div className="sectionCopy">
              <p className="label">Contact Us</p>
              <h2>Request a Free Quote</h2>
              <p style={{color:'#e9c260'}}>Send your requirement and our team will respond with the right technical service solution.</p>
              <div className="contactLines">
                <a href="tel:+97143595835">+97143595835</a>
                <a href="mailto:montextechnicals9@gmail.com">montextechnicals9@gmail.com</a>
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>

            <form className="quoteForm" action="mailto:info@montex.ae" method="post" encType="text/plain">
              <label>Name<input name="name" type="text" autoComplete="name" required /></label>
              <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
              <label>
                Service
                <select name="service" required defaultValue="">
                  <option value="" disabled>Select service</option>
                  {services.map(([, title]) => <option key={title}>{title}</option>)}
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
          <p><span style={{ color: "#e9c260", fontWeight: "700" ,fontSize:"16px" }}>Address : </span> 101, BMI building, near Sharaf DG Metro Station Bur Dubai.</p>
          <p>© 2026 Montex Technical Services L.L.C. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
