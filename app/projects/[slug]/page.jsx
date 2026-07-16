import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import ContactSection from "../../components/ContactSection";
import FloatingContact from "../../components/FloatingContact";
import { projects, getProject } from "../../data/siteData";
import { getContent } from "../../lib/content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Montex Project Details`,
    description: project.description
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  const { company } = await getContent();

  if (!project) {
    notFound();
  }

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Header company={company} />
      <main>
        <section className="pageHero projectHero">
          <Image src={`/assets/${project.image}`} alt={project.title} fill priority sizes="100vw" />
          <div className="pageHeroOverlay" />
          <div className="container pageHeroInner">
            <p className="label">{project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
        </section>

        <section className="section">
          <div className="container splitGrid">
            <div className="sectionCopy">
              <p className="label arrow">Project Description</p>
              <h2>Delivered with Montex Quality</h2>
              <p>{project.description}</p>
            </div>
            <div className="projectFacts">
              <span><strong>Service Category</strong>{project.category}</span>
              <span><strong>Location</strong>{project.location}</span>
              <span><strong>Completion Date</strong>{project.date}</span>
            </div>
          </div>
        </section>

        <section className="projects section">
          <div className="container sectionHead">
            <div>
              <p className="label arrow">Project Images</p>
              <h2>Site Highlights</h2>
            </div>
          </div>
          <div className="container galleryGrid compact">
            {[project.image, "project-house.jpg", "quality-ac.jpg"].map((image, index) => (
              <Image key={`${image}-${index}`} src={`/assets/${image}`} alt={`${project.title} image ${index + 1}`} width={344} height={220} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container cardColumns two">
            <article className="infoCard">
              <h3>Challenges</h3>
              <p>{project.challenges}</p>
            </article>
            <article className="infoCard">
              <h3>Solution</h3>
              <p>{project.solution}</p>
            </article>
          </div>
        </section>

        <section className="section altSection">
          <div className="container sectionHead">
            <div>
              <p className="label arrow">Related Projects</p>
              <h2>More Montex Work</h2>
            </div>
            <a className="outlineLink" href="/gallery">View Gallery <span>→</span></a>
          </div>
          <div className="container projectGrid">
            {related.map((item) => (
              <article key={item.slug}>
                <a href={`/projects/${item.slug}`}>
                  <Image src={`/assets/${item.image}`} alt={item.title} width={344} height={190} />
                  <h3>{item.title}</h3>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="ctaBand">
          <div className="container ctaInner">
            <h2>Planning a Similar Project?</h2>
            <p>Request a quote from Montex and get practical technical guidance for your property.</p>
            <a className="btn btnGold" href="#contact">Request Quote <span>→</span></a>
          </div>
        </section>

        <ContactSection title="Request a Project Quote" service={project.category} />
      </main>
      <FloatingContact />
    </>
  );
}
