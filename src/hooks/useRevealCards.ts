import { useEffect } from 'react';

/**
 * Lets a tap or click fill a `.reveal-card` with the near-black ground, the
 * same state its `:hover` produces.
 *
 * Hover does not exist on touch, so without this the effect is invisible on
 * every phone. One delegated listener rather than per-card React state: there
 * are ~77 of these across the location pages alone, and none of them need to
 * own state for a decorative flourish.
 *
 * Cards that are links are skipped — those navigate on click, and toggling
 * would just flash the wash on the way out.
 */
export function useRevealCards() {
  useEffect(() => {
    const onPointerUp = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest<HTMLElement>('.reveal-card');
      if (!card) return;

      // Anything that navigates keeps its normal behaviour.
      if (card.tagName === 'A' || target.closest('a, button')) return;

      card.classList.toggle('is-active');
    };

    // pointerup rather than click so it fires the same way for touch and mouse
    // without waiting on the synthetic click that follows a tap.
    document.addEventListener('pointerup', onPointerUp);
    return () => document.removeEventListener('pointerup', onPointerUp);
  }, []);
}
