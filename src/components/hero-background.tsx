/**
 * Ambient backdrop for the landing hero.
 *
 * Server component on purpose: the previous version was a client component that
 * rendered `null` until `useEffect` fired, so the background popped in after
 * hydration. Everything here is theme-aware through CSS variables, so no theme
 * hook and no mount gate are needed.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[46rem] overflow-hidden"
    >
      {/* Fine engineering grid, faded out towards the bottom so it never fights
          the article content below the fold. */}
      <div
        className="absolute inset-0 opacity-[0.55] dark:opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 0%, black 20%, transparent 78%)',
        }}
      />

      {/* A single wash of the brand accent, kept very low so it reads as
          atmosphere rather than as a gradient blob. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 18% -10%, color-mix(in oklch, var(--brand) 14%, transparent), transparent 70%)',
        }}
      />

      {/* Hairline that anchors the grid to the page instead of letting it
          dissolve into nothing. */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
