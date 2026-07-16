import Header from "../components/Header";
import FloatingContact from "../components/FloatingContact";
import GalleryClient from "../components/GalleryClient";
import { getContent } from "../lib/content";

export const metadata = {
  title: "Project Gallery | Montex Technical Services L.L.C",
  description: "Browse Montex Technical Services project gallery across AC, electrical, plumbing, painting, gypsum, cleaning and AMC works."
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const { company, galleryItems } = await getContent();

  return (
    <>
      <Header company={company} />
      <main>
        <section className="simpleHero">
          <div className="container">
            <p className="label arrow">Gallery</p>
            <h1>Montex Project Gallery</h1>
            <p>Explore completed technical works across residential and commercial properties in Dubai.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <GalleryClient items={galleryItems} />
          </div>
        </section>
      </main>
      <FloatingContact />
    </>
  );
}
