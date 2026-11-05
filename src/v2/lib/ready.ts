/**
 * Piccolo segnale condiviso: il preloader lo accende quando ha finito,
 * la hero aspetta questo segnale prima di animare l'ingresso.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markReady() {
  if (ready) return;
  ready = true;
  // Rimandato al frame successivo: così i listener non vengono eseguiti
  // dentro il callback GSAP del preloader (che altrimenti "cattura"
  // le animazioni create lì nel suo context e ne limita i selettori).
  const fns = Array.from(listeners);
  listeners.clear();
  requestAnimationFrame(() => fns.forEach((fn) => fn()));
}

export function onReady(fn: () => void): () => void {
  if (ready) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isReady() {
  return ready;
}
