import { services } from "../data/siteData";
import { getContent } from "../lib/content";

export default async function ContactSection({ title = "Request a Free Quote", service }) {
  const { company } = await getContent();

  return (
    <section className="contact section" id="contact">
      <div className="container contactGrid">
        <div className="sectionCopy">
          <p className="label">Contact Us</p>
          <h2>{title}</h2>
          <p style={{ color: "#e9c260" }}>
            Share your requirement and our team will respond with a practical technical service solution.
          </p>
          <div className="contactLines">
            <div className="contaLines_inner">
              <a href={`tel:${company.phone}`}>{company.phone}</a> , <a href={`tel:${company.whatsapp}`}>{company.whatsapp}</a>
            </div>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>Dubai, United Arab Emirates</span>
          </div>
          <div className="contactActions">
            <a className="btn btnGold" href={`https://wa.me/${company.whatsapp.replace("+", "")}`}>WhatsApp <span>→</span></a>
            <a className="btn btnLight" href={`tel:${company.whatsapp}`}>Call Now <span>→</span></a>
          </div>
        </div>

        <form className="quoteForm" action="/api/contact" method="post">
          <label className="formTrap">Website<input name="website" type="text" tabIndex="-1" autoComplete="off" /></label>
          <label>Name<input name="name" type="text" autoComplete="name" required /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
          <label>
            Service
            <select name="service" required defaultValue={service ?? ""}>
              <option value="" disabled>Select service</option>
              {services.map((item) => <option key={item.title}>{item.title}</option>)}
              <option>Other Technical Service</option>
            </select>
          </label>
          <label>Message<textarea name="message" rows="4" required /></label>
          <button className="btn btnGold" type="submit">Send Enquiry <span>→</span></button>
        </form>
      </div>
    </section>
  );
}
