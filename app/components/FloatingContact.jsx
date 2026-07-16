import { getContent } from "../lib/content";
import { Icon } from "./Icons";
import styles from "./Hero.module.css";

export default async function FloatingContact() {
  const { company } = await getContent();

  return (
    <div className={styles.floatingActions} aria-label="Quick contact">
      <a className={styles.whatsapp} href={`https://wa.me/${company.whatsapp.replace("+", "")}`} aria-label="Chat with Montex on WhatsApp">
        <Icon name="chat" />
        <span>WhatsApp</span>
      </a>
      <a className={styles.call} href={`tel:${company.whatsapp}`} aria-label="Call Montex Technical Services">
        <Icon name="phone" />
        <span>Call Us</span>
      </a>
    </div>
  );
}
