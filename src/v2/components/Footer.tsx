import { v2Site } from "@/v2/data/content";

export default function Footer() {
  return (
    <footer className="v2-footer v2-mono">
      <div className="v2-container v2-footer-inner">
        <span>
          <span className="tk-prompt">$</span> echo © {new Date().getFullYear()} {v2Site.name} · P.IVA 02514710447
        </span>
        <span className="v2-footer-meta">
          <span>{v2Site.version}</span>
          <span>{v2Site.coords}</span>
          <span className="tk-string">✓ build passing</span>
        </span>
        <a href="#top">cd ~ ↑</a>
      </div>
    </footer>
  );
}
