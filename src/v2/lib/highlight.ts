/**
 * Evidenziatore di sintassi minimale (TS/TSX/shell) condiviso fra i blocchi
 * di codice nel DOM e la texture del monitor 3D.
 */
export type Token = { text: string; cls: TokenClass };
export type TokenClass =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "tag"
  | "attr"
  | "number"
  | "fn"
  | "punct"
  | "prompt";

const KEYWORDS = new Set([
  "import", "from", "export", "const", "let", "var", "return", "async", "await",
  "function", "default", "new", "if", "else", "type", "interface", "true", "false",
  "null", "undefined", "as", "extends", "satisfies",
]);

const RE =
  /(\/\/.*$)|(`[^`]*`|"[^"\n]*"|'[^'\n]*')|(<\/?[A-Za-z][\w.]*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*)(?=\()|(\b[A-Za-z_$][\w$]*\b)|([{}()[\];,.<>=/+\-*!?:&|]+)|(\s+)|(.)/gm;

export function highlightLine(line: string): Token[] {
  if (line.startsWith("$ ")) {
    return [
      { text: "$", cls: "prompt" },
      { text: line.slice(1), cls: "plain" },
    ];
  }
  if (line.startsWith("✓") || line.startsWith("→")) {
    return [{ text: line, cls: "string" }];
  }
  const out: Token[] = [];
  let m: RegExpExecArray | null;
  RE.lastIndex = 0;
  while ((m = RE.exec(line))) {
    const [t, comment, str, tag, num, fn, ident, punct] = m;
    if (comment) out.push({ text: t, cls: "comment" });
    else if (str) out.push({ text: t, cls: "string" });
    else if (tag) out.push({ text: t, cls: "tag" });
    else if (num) out.push({ text: t, cls: "number" });
    else if (fn) out.push({ text: t, cls: "fn" });
    else if (ident) {
      if (KEYWORDS.has(t)) out.push({ text: t, cls: "keyword" });
      else if (/^[A-Z]/.test(t)) out.push({ text: t, cls: "tag" });
      else {
        // attributo JSX: identificatore seguito da "="
        const next = line.slice(RE.lastIndex, RE.lastIndex + 1);
        out.push({ text: t, cls: next === "=" ? "attr" : "plain" });
      }
    } else if (punct) out.push({ text: t, cls: "punct" });
    else out.push({ text: t, cls: "plain" });
    if (t.length === 0) RE.lastIndex++;
  }
  return out;
}

export function highlight(code: string): Token[][] {
  return code.split("\n").map(highlightLine);
}

/** Colori dei token: usati dalla texture canvas (il DOM usa le classi CSS). */
export const TOKEN_COLORS: Record<TokenClass, string> = {
  plain: "#e6e3dc",
  comment: "#6b7280",
  string: "#a8d8a0",
  keyword: "#c7a4ff",
  tag: "#7fe3ff",
  attr: "#ffd58a",
  number: "#ffb86b",
  fn: "#ffb86b",
  punct: "#9aa0ab",
  prompt: "#7fe3ff",
};
