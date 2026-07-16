import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import ContactSection from "../../components/ContactSection";
import FloatingContact from "../../components/FloatingContact";
import { Icon } from "../../components/Icons";
import { getService, services } from "../../data/siteData";
import { getContent } from "../../lib/content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} in Dubai | Montex Technical Services L.L.C`,
    description: service.excerpt
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  const { company } = await getContent();

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header company={company} />
      <main>
        <section className="pageHero">
          <Image src={`/assets/${service.image}`} alt={service.title} fill priority sizes="100vw" />
          <div className="pageHeroOverlay" />
          <div className="container pageHeroInner">
            <p className="label"><Icon name={service.icon} /> {service.group}</p>
            <h1>{service.title} in Dubai</h1>
            <p>{service.excerpt}</p>
            <div className="heroButtons">
              <a className="btn btnGold" href="#contact">Request Quote <span>→</span></a>
              <a className="btn btnLight" href="tel:+971524269939">Call Now <span>→</span></a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container splitGrid">
            <div className="sectionCopy">
              <p className="label arrow">Service Overview</p>
              <h2>Reliable {service.title}</h2>
              <p>{service.overview}</p>
            </div>
            <div className="infoPanel">
              <h3>Residential & Commercial Solutions</h3>
              <p>
                We support apartments, villas, offices, shops and managed buildings with neat,
                well-coordinated technical execution.
              </p>
              <div className="miniHighlights">
                {service.highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section altSection">
          <div className="container cardColumns">
            <InfoList title="Why Choose This Service" items={service.whyChoose} />
            <InfoList title="Benefits" items={service.benefits} />
            <InfoList title="Features" items={service.features} />
          </div>
        </section>

        <section className="section">
          <div className="container splitGrid">
            <div>
              <p className="label arrow">Working Process</p>
              <h2>How We Deliver</h2>
              <div className="processGrid">
                {service.process.map((step, index) => (
                  <div className="processStep" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
            <InfoList title="Industries Served" items={service.industries} />
          </div>
        </section>

        <section className="section premiumDetail">
          <div className="container premiumDetailInner">
            <div>
              <p className="label arrow">Premium Service Detail</p>
              <h2>Built for Dubai Properties</h2>
              <p>
                Every {service.title.toLowerCase()} request is handled with a balance of technical
                accuracy, clean execution and practical communication. Montex keeps the work focused,
                organized and suitable for occupied homes, active offices and commercial facilities.
              </p>
            </div>
            <div className="premiumMetricGrid">
              <span><strong>01</strong>Inspection-led scope</span>
              <span><strong>02</strong>Clear quotation</span>
              <span><strong>03</strong>Professional execution</span>
              <span><strong>04</strong>Quality handover</span>
            </div>
          </div>
        </section>

        <section className="projects section">
          <div className="container sectionHead">
            <div>
              <p className="label arrow">Project Gallery</p>
              <h2>Recent Work Quality</h2>
            </div>
            <a className="outlineLink" href="/gallery">Open Gallery <span>→</span></a>
          </div>
          <div className="container galleryGrid compact">
            {[service.image, "project-house.jpg", "project-ceiling-work.jpg"].map((image, index) => (
              <Image key={`${image}-${index}`} src={`/assets/${image}`} alt={`${service.title} project ${index + 1}`} width={344} height={220} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container splitGrid">
            <div className="faqList">
              <p className="label arrow">Frequently Asked Questions</p>
              {service.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
            <div className="infoPanel">
              <h3>Related Services</h3>
              <div className="relatedLinks">
                {service.related.map((item) => (
                  <a href={`/services/${item.slug}`} key={item.slug}>{item.title}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="ctaBand">
          <div className="container ctaInner">
            <h2>Need {service.title}?</h2>
            <p>Speak with Montex for a clear scope, reliable scheduling and professional execution.</p>
            <a className="btn btnGold" href="#contact">Get a Quote <span>→</span></a>
          </div>
        </section>

        <ContactSection service={service.title} />
      </main>
      <FloatingContact />
    </>
  );
}

function InfoList({ title, items }) {
  return (
    <article className="infoCard">
      <h3>{title}</h3>
      <ul className="checkList">
        {items.map((item) => (
          <li key={item}><Icon name="check" /> {item}</li>
        ))}
      </ul>
    </article>
  );
}
