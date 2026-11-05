import type { ReactNode } from "react";

/** Trasforma "testo *corsivo* testo" in <em>. Usato nei titoli. */
export function richLine(line: string): ReactNode[] {
  return line.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function RichTitle({
  lines,
  as: Tag = "h2",
  className,
}: {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span className="v2-title-line" key={i}>
          {richLine(line)}
        </span>
      ))}
    </Tag>
  );
}
