import SiteHeader, { type NavKey } from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import MatFeatures from "./MatFeatures";
import MatCursor from "./MatCursor";
import WhatsAppFloat from "./WhatsAppFloat";

type SiteLayoutProps = {
  active?: NavKey;
  matPreloader?: boolean;
  children: React.ReactNode;
};

export default function SiteLayout({
  active,
  matPreloader = false,
  children,
}: SiteLayoutProps) {
  return (
    <main id="body-inner">
      <MatFeatures showPreloader={matPreloader} />
      <MatCursor />
      <WhatsAppFloat />

      <div className="bg-noise"></div>
      <SiteHeader active={active} />

      <div id="scroll-container">
        <div id="content-wrap">{children}</div>
      </div>
    </main>
  );
}

export { SiteFooter };
