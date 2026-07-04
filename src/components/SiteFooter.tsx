import { siteConfig } from "@/data/site";
import "./site-footer.css";

export default function SiteFooter() {
  return (
    <footer className="mat-contact-footer">
      <p>{siteConfig.footerText}</p>
    </footer>
  );
}
