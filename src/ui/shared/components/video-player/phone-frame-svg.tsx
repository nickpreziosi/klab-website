/**
 * Decorative phone bezel overlay. viewBox 400×671: inner glass 356×633 = 576:1024 video aspect.
 * Insets must match `.phoneScreen` in video-player.module.css.
 */
export function PhoneFrameSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 671"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="phoneFrameOuterStroke" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="currentColor" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.38" />
        </linearGradient>
        <filter id="phoneFrameDrop" x="-12%" y="-6%" width="124%" height="112%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#000" floodOpacity="0.42" />
        </filter>
      </defs>

      <g filter="url(#phoneFrameDrop)">
        {/* Outer chassis — height 659 so 6 + 659 + 6 = 671 */}
        <rect
          x="6"
          y="6"
          width="388"
          height="659"
          rx="42"
          stroke="url(#phoneFrameOuterStroke)"
          strokeWidth="12"
          fill="none"
        />
        {/* Inner glass — 356×633 ≈ 576:1024 */}
        <rect
          x="22"
          y="22"
          width="356"
          height="633"
          rx="30"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="2"
          fill="none"
        />
      </g>

      {/* Dynamic Island — always black (reads like hardware, not theme chrome) */}
      <rect x="128" y="32" width="144" height="36" rx="18" fill="#0a0a0a" />
      {/* Lens / reflection highlight: pill (rx = height/2), not a flat ellipse */}
      <rect x="172" y="46" width="56" height="8" rx="4" fill="#ffffff" fillOpacity="0.08" />

      {/* Side controls — positions scaled from prior 820px-tall layout */}
      <rect x="0" y="137" width="5" height="52" rx="2.5" fill="currentColor" fillOpacity="0.32" />
      <rect x="0" y="193" width="5" height="88" rx="2.5" fill="currentColor" fillOpacity="0.32" />
      <rect x="395" y="203" width="5" height="120" rx="2.5" fill="currentColor" fillOpacity="0.32" />

      {/* Bottom speaker */}
      <g opacity="0.22">
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={158 + i * 16} y="652" width="10" height="4" rx="2" fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}
