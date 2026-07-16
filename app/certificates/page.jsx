import Header from "../components/Header";
import FloatingContact from "../components/FloatingContact";
import { Icon } from "../components/Icons";
import { getContent } from "../lib/content";

const certificateSections = [
  ["Licensed Professionals", "Qualified technicians complete work with responsible supervision and clear service standards.", "shield"],
  ["Commitment to Quality", "Every job is handled with attention to finish, durability and customer expectations.", "check"],
  ["Safety Standards", "Work is planned with practical safety checks for people, property and equipment.", "worker"],
  ["Industry Best Practices", "Montex follows proven methods for installation, maintenance, repair and site coordination.", "building"],
  ["Professional Workforce", "Our team communicates clearly, respects site conditions and keeps work areas organized.", "users"],
  ["Customer Satisfaction", "We focus on reliable response, transparent scope and consistent support after completion.", "chat"],
  ["Quality Assurance", "Completed work is reviewed before handover to confirm performance and neat finishing.", "shield"]
];

export const metadata = {
  title: "Certificates & Quality Standards | Montex Technical Services L.L.C",
  description: "Learn about Montex Technical Services quality standards, licensed professionals, safety practices and professional workforce."
};

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const { company } = await getContent();

  return (
    <>
      <Header company={company} />
      <main>
        <section className="simpleHero">
          <div className="container">
            <p className="label"><Icon name="shield" /> Certificates</p>
            <h1>Professional Standards You Can Trust</h1>
            <p>
              Montex Technical Services L.L.C maintains a professional service approach built on
              responsible workmanship, safety awareness and consistent quality assurance.
            </p>
          </div>
        </section>

        <section className="section altSection">
          <div className="container certificateGrid">
            {certificateSections.map(([title, text, icon]) => (
              <article className="infoCard certificateCard" key={title}>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <FloatingContact />
    </>
  );
}
