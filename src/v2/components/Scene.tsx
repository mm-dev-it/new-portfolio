"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/v2/lib/gsap";
import { onReady } from "@/v2/lib/ready";
import { monitorSnippets } from "@/v2/data/code";
import { highlight, TOKEN_COLORS } from "@/v2/lib/highlight";

/* ------------------------------------------------------------------ */
/*  Coreografia scroll                                                 */
/*  Un canvas fisso dietro al contenuto. Ogni sezione è un fotogramma  */
/*  chiave; GSAP interpola con lo scroll, R3F legge ogni frame.        */
/*  m = scala del monitor, n = scala dei nodi di architettura.         */
/* ------------------------------------------------------------------ */

type SectionId = "top" | "about" | "work" | "promis" | "contact";
type Pose = {
  x: number; y: number; z: number;
  rx: number; ry: number; rz: number;
  s: number; m: number; n: number;
};

const SECTION_IDS: SectionId[] = ["top", "about", "work", "promis", "contact"];

// Camera a z=6.5, fov 36: a z=0 si vede circa ±2.1 in verticale e ±3.4 in orizzontale.
const POSES: Record<SectionId, Pose> = {
  top:     { x: 1.75, y: -0.05, z: 0,    rx: -0.08, ry: -0.42, rz: 0.02, s: 1,    m: 1, n: 0 },
  about:   { x: 2.25, y: 0.95,  z: -0.6, rx: -0.3,  ry: -0.75, rz: 0.06, s: 0.72, m: 1, n: 0 },
  work:    { x: 2.45, y: 1.2,   z: -1.4, rx: -0.15, ry: -1.1,  rz: 0,    s: 0.55, m: 1, n: 0 },
  promis:  { x: 2.2,  y: 0.7,   z: -0.4, rx: 0.15,  ry: -0.35, rz: 0,    s: 1,    m: 0, n: 1 },
  contact: { x: 2.0,  y: 0.8,   z: -1.0, rx: -0.12, ry: -0.5,  rz: 0,    s: 0.8,  m: 1, n: 0 },
};

const ICE = "#7fe3ff";
const SCREEN_BG = "#0e0f13";

/* ------------------------------------------------------------------ */
/*  Monitor: pannello flottante con texture canvas su cui il codice    */
/*  si digita da solo. Cambia snippet in base alla sezione.            */
/* ------------------------------------------------------------------ */

const TEX_W = 1024;
const TEX_H = 640;
const SCREEN_W = 2.6;
const SCREEN_H = SCREEN_W * (TEX_H / TEX_W);

function useCodeTexture(section: React.RefObject<SectionId>) {
  // Canvas e texture vivono in un ref: vengono mutati ogni frame.
  const [{ canvas, texture }] = useState(() => {
    const c = document.createElement("canvas");
    c.width = TEX_W;
    c.height = TEX_H;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return { canvas: c, texture: t };
  });

  const state = useRef({ section: "top" as SectionId, chars: 0, lastDrawn: -1, blink: 0 });

  // eslint-disable-next-line react-hooks/immutability -- useFrame gira dopo il render: mutare il ref qui è corretto
  useFrame((_, delta) => {
    const st = state.current;
    const target = section.current;
    if (target !== st.section) {
      st.section = target;
      st.chars = 0;
    }
    const snippet = monitorSnippets[st.section];
    const total = snippet.code.length;
    if (st.chars < total) st.chars = Math.min(total, st.chars + delta * 260);
    st.blink += delta;
    const caretOn = Math.floor(st.blink * 2) % 2 === 0;
    const key = Math.round(st.chars) * 2 + (caretOn ? 1 : 0);
    if (key === st.lastDrawn) return;
    st.lastDrawn = key;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = SCREEN_BG;
    ctx.fillRect(0, 0, TEX_W, TEX_H);

    // barra titolo
    ctx.fillStyle = "#15171d";
    ctx.fillRect(0, 0, TEX_W, 56);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(34 + i * 30, 28, 8, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = "500 22px 'JetBrains Mono', ui-monospace, monospace";
    ctx.fillStyle = "#9aa0ab";
    ctx.textBaseline = "middle";
    ctx.fillText(snippet.file, 140, 29);
    ctx.textAlign = "right";
    ctx.fillStyle = ICE;
    ctx.fillText(snippet.lang.toUpperCase(), TEX_W - 34, 29);
    ctx.textAlign = "left";

    // codice
    const visible = snippet.code.slice(0, Math.round(st.chars));
    const lines = highlight(visible);
    const lineH = 34;
    const x0 = 92;
    ctx.font = "400 24px 'JetBrains Mono', ui-monospace, monospace";
    lines.forEach((tokens, i) => {
      const y = 92 + i * lineH;
      if (y > TEX_H - 20) return;
      ctx.fillStyle = "#3b3f49";
      ctx.textAlign = "right";
      ctx.fillText(String(i + 1), 60, y);
      ctx.textAlign = "left";
      let x = x0;
      tokens.forEach((t) => {
        ctx.fillStyle = TOKEN_COLORS[t.cls];
        ctx.fillText(t.text, x, y);
        x += ctx.measureText(t.text).width;
      });
      if (i === lines.length - 1 && caretOn) {
        ctx.fillStyle = ICE;
        ctx.fillRect(x + 2, y - 13, 12, 26);
      }
    });
    // eslint-disable-next-line react-hooks/immutability -- three.js richiede questo flag imperativo
    texture.needsUpdate = true;
  });

  return texture;
}

function Monitor({ section, scale }: { section: React.RefObject<SectionId>; scale: React.RefObject<number> }) {
  const texture = useCodeTexture(section);
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-delta * 6);
    const s = Math.max(0.0001, scale.current);
    g.scale.x += (s - g.scale.x) * k;
    g.scale.y += (s - g.scale.y) * k;
    g.scale.z += (s - g.scale.z) * k;
    g.visible = g.scale.x > 0.02;
    // fluttuazione leggera
    g.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
  });

  return (
    <group ref={group}>
      {/* cornice */}
      <RoundedBox args={[SCREEN_W + 0.14, SCREEN_H + 0.14, 0.08]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#1a1c22" roughness={0.35} metalness={0.6} />
      </RoundedBox>
      {/* schermo */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* bordo luminoso */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[SCREEN_W + 0.22, SCREEN_H + 0.22]} />
        <meshBasicMaterial color={ICE} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Nodi di architettura: blocchi collegati da linee su cui viaggiano  */
/*  "pacchetti" di dati. Compare nella sezione Promis Music.           */
/* ------------------------------------------------------------------ */

const NODES: { id: string; label: string; pos: [number, number, number] }[] = [
  { id: "web", label: "Next.js · web", pos: [0, 0.9, 0] },
  { id: "api", label: "Supabase · api", pos: [-1.3, 0.1, 0.3] },
  { id: "db", label: "Postgres · db", pos: [-0.9, -0.95, -0.2] },
  { id: "media", label: "Stream · media", pos: [1.3, 0.15, -0.3] },
  { id: "pay", label: "Stripe · payments", pos: [0.95, -0.9, 0.3] },
  { id: "edge", label: "Netlify · edge", pos: [0, -0.1, 0.9] },
];
const LINKS: [number, number][] = [
  [0, 1], [0, 3], [0, 5], [1, 2], [1, 5], [3, 4], [3, 5], [2, 4], [4, 5],
];
const PACKETS = LINKS.map((_, i) => ({ link: i, offset: (i * 0.37) % 1, speed: 0.25 + (i % 3) * 0.08 }));

function Label({ text, position }: { text: string; position: [number, number, number] }) {
  const [texture] = useState(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 96;
    const ctx = c.getContext("2d")!;
    ctx.font = "500 36px 'JetBrains Mono', ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const w = ctx.measureText(text).width + 44;
    ctx.fillStyle = "rgba(21,22,26,0.85)";
    ctx.beginPath();
    ctx.roundRect((512 - w) / 2, 16, w, 64, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(236,233,226,0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#b8b5ad";
    ctx.fillText(text, 256, 49);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
  return (
    <sprite position={position} scale={[1.1, 0.206, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} />
    </sprite>
  );
}

function Nodes({ scale }: { scale: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const packets = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const vecA = useMemo(() => new THREE.Vector3(), []);
  const vecB = useMemo(() => new THREE.Vector3(), []);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(LINKS.length * 6);
    LINKS.forEach(([a, b], i) => {
      arr.set(NODES[a].pos, i * 6);
      arr.set(NODES[b].pos, i * 6 + 3);
    });
    return arr;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-delta * 6);
    const s = Math.max(0.0001, scale.current);
    g.scale.x += (s - g.scale.x) * k;
    g.scale.y += (s - g.scale.y) * k;
    g.scale.z += (s - g.scale.z) * k;
    g.visible = g.scale.x > 0.02;
    g.rotation.y = state.clock.elapsedTime * 0.15;

    const pm = packets.current;
    if (!pm) return;
    const t = state.clock.elapsedTime;
    PACKETS.forEach((p, i) => {
      const [a, b] = LINKS[p.link];
      const u = (t * p.speed + p.offset) % 1;
      vecA.set(...NODES[a].pos);
      vecB.set(...NODES[b].pos);
      dummy.position.lerpVectors(vecA, vecB, u);
      const pulse = 0.6 + 0.4 * Math.sin(u * Math.PI);
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      pm.setMatrixAt(i, dummy.matrix);
    });
    pm.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group} scale={0.0001}>
      {NODES.map((n) => (
        <group key={n.id} position={n.pos}>
          <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.04} smoothness={3} castShadow>
            <meshStandardMaterial color="#1c1e25" roughness={0.3} metalness={0.5} />
          </RoundedBox>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.31, 0.31, 0.31)]} />
            <lineBasicMaterial color={ICE} transparent opacity={0.9} />
          </lineSegments>
          <Label text={n.label} position={[0, -0.36, 0]} />
        </group>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={ICE} transparent opacity={0.3} />
      </lineSegments>
      <instancedMesh ref={packets} args={[undefined, undefined, PACKETS.length]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={ICE} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */

function Rig({ pose, section }: { pose: React.RefObject<Pose>; section: React.RefObject<SectionId> }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const mScale = useRef(1);
  const nScale = useRef(0);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = pose.current;
    const k = 1 - Math.exp(-delta * 6);
    g.position.x += (p.x + mouse.current.x * 0.12 - g.position.x) * k;
    g.position.y += (p.y + mouse.current.y * 0.08 - g.position.y) * k;
    g.position.z += (p.z - g.position.z) * k;
    g.rotation.x += (p.rx - mouse.current.y * 0.1 - g.rotation.x) * k;
    g.rotation.y += (p.ry + mouse.current.x * 0.15 - g.rotation.y) * k;
    g.rotation.z += (p.rz - g.rotation.z) * k;
    g.scale.x += (p.s - g.scale.x) * k;
    g.scale.y += (p.s - g.scale.y) * k;
    g.scale.z += (p.s - g.scale.z) * k;
    mScale.current = p.m;
    nScale.current = p.n;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} castShadow />
      <pointLight position={[-4, 2, 2]} intensity={10} color={ICE} />
      <group ref={group} position={[POSES.top.x, POSES.top.y, POSES.top.z]}>
        <Monitor section={section} scale={mScale} />
        <Nodes scale={nScale} />
      </group>
    </>
  );
}

export default function Scene() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const pose = useRef<Pose>({ ...POSES.top });
  const section = useRef<SectionId>("top");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    return onReady(() => setVisible(true));
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const triggers: ScrollTrigger[] = [];

    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (i > 0) {
        const from = POSES[SECTION_IDS[i - 1]];
        const tween = gsap.fromTo(pose.current, { ...from }, {
          ...POSES[id],
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 20%", scrub: 0.6 },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
      // Lo snippet sul monitor cambia quando la sezione occupa il centro.
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) section.current = id;
          },
        }),
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`v2-scene ${visible ? "is-visible" : ""}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 0, 6.5], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Rig pose={pose} section={section} />
        </Suspense>
      </Canvas>
    </div>
  );
}
