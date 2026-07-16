import Image from "next/image";
import Header from "../components/Header";
import { services, projects } from "../data/siteData";
import { getContent, getImageSrc } from "../lib/content";

const socialLinks = [ "Instagram", "LinkedIn",];

export const metadata = {
  title: "Admin Panel | Montex Technical Services L.L.C"
};

export const dynamic = "force-dynamic";

function getNotice(params) {
  if (params?.settings === "saved") {
    return "Settings saved successfully.";
  }

  if (params?.gallery === "uploaded") {
    return "Gallery image uploaded successfully.";
  }

  if (params?.gallery === "deleted") {
    return "Gallery image deleted successfully.";
  }

  if (params?.settings === "invalid" || params?.gallery === "invalid") {
    return "Please check the submitted details and try again.";
  }

  return "";
}

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const { company, galleryItems } = await getContent();
  const notice = getNotice(params);
  const dashboardCards = [
    ["Total Projects", projects.length],
    ["Gallery Images", galleryItems.length],
    ["Messages", 0],
    ["Services", services.length],
    ["Testimonials", 0],
    ["Quote Requests", 0]
  ];

  return (
    <>
      <Header admin company={company} />
      <main className="adminPage">
        <section className="simpleHero">
          <div className="container">
            <p className="label arrow"> admin panel ~ </p>
            <h1>Dashboard</h1>
            <p>Manage company information, services, projects, gallery content and quote activity.</p>
          </div>
        </section>

        <section className="section">
          <div className="container adminCards">
            {dashboardCards.map(([label, value]) => (
              <article className="adminCard" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section altSection">
          <div className="container">
            <div className="sectionHead">
              <div>
                <p className="label arrow">Company Settings</p>
                <h2>Editable Information</h2>
              </div>
              <form action="/api/admin/logout" method="post">
                <button className="outlineLink" type="submit">Logout</button>
              </form>
            </div>
            {notice ? <p className="adminNotice">{notice}</p> : null}
            <form className="settingsForm" action="/api/admin/settings" method="post">
              <label>Company Name<input name="name" defaultValue={company.name} required /></label>
              <label>Phone Number<input name="phone" defaultValue={company.phone} required /></label>
              <label>WhatsApp Number<input name="whatsapp" defaultValue={company.whatsapp} required /></label>
              <label>Email<input name="email" type="email" defaultValue={company.email} required /></label>
              <label>Office Address<textarea name="address" rows="3" defaultValue={company.address} required /></label>
              <label>Google Maps Link<input name="maps" placeholder="https://maps.google.com/..." /></label>
              <label>Working Hours<input name="hours" defaultValue={company.hours} required /></label>
              {socialLinks.map((link) => (
                <label key={link}>{link} Link<input name={link.toLowerCase()} defaultValue={company[link.toLowerCase()] ?? ""} placeholder={`${link} URL`} /></label>
              ))}
              <div className="settingsPreview">
                <Image src="/assets/logo.jpg" alt="Current Montex logo" width={180} height={43} />
                <button className="btn btnGold" type="submit">Save Settings <span>→</span></button>
              </div>
            </form>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <p className="label arrow">Gallery</p>
                <h2>Upload or Delete Images</h2>
              </div>
            </div>

            <form className="settingsForm galleryUploadForm" action="/api/admin/gallery" method="post" encType="multipart/form-data">
              <label>Image Title<input name="title" type="text" required /></label>
              <label>
                Category
                <select name="category" required defaultValue="">
                  <option value="" disabled>Select category</option>
                  {["Air Conditioning", "Electrical", "Plumbing", "Painting", "Gypsum", "Cleaning", "AMC", "Maintenance"].map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="fullField">Image File<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required /></label>
              <div className="settingsPreview">
                <span className="adminHelp">Allowed: JPG, PNG, WebP up to 5 MB.</span>
                <button className="btn btnGold" type="submit">Upload Image <span>→</span></button>
              </div>
            </form>

            <div className="adminGalleryGrid">
              {galleryItems.map((item) => (
                <article className="adminGalleryItem" key={item.id}>
                  <Image src={getImageSrc(item.image)} alt={item.title} width={320} height={210} />
                  <div>
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                  </div>
                  <form action="/api/admin/gallery" method="post">
                    <input name="action" type="hidden" value="delete" />
                    <input name="id" type="hidden" value={item.id} />
                    <button className="outlineLink dangerLink" type="submit">Delete</button>
                  </form>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
