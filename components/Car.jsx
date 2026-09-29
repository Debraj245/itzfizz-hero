export default function Car({ className = "" }) {
  return (
    <svg
      viewBox="0 0 520 200"
      role="img"
      aria-label="Top view of a red sports car"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF8388" />
          <stop offset="0.5" stopColor="#FF5A5F" />
          <stop offset="1" stopColor="#E63E45" />
        </linearGradient>
      </defs>

      <ellipse cx="262" cy="112" rx="226" ry="66" fill="#000" opacity="0.28" style={{ filter: "blur(8px)" }} />

      <g fill="#0E0F12">
        <rect x="88" y="12" width="82" height="36" rx="11" />
        <rect x="88" y="152" width="82" height="36" rx="11" />
        <rect x="340" y="12" width="82" height="36" rx="11" />
        <rect x="340" y="152" width="82" height="36" rx="11" />
      </g>
      <g fill="#E63E45">
        <ellipse cx="352" cy="26" rx="14" ry="9" />
        <ellipse cx="352" cy="174" rx="14" ry="9" />
      </g>

      <path
        d="M40 70 C40 45 90 38 150 36 L330 32 C400 32 470 55 492 86 C496 95 496 105 492 114 C470 145 400 168 330 168 L150 164 C90 162 40 155 40 130 Z"
        fill="url(#car-body)"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="2"
      />

      <path
        d="M44 92 H488 M44 108 H488"
        stroke="#fff"
        strokeOpacity="0.85"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <g fill="#1B1E24" opacity="0.8">
        <path d="M250 40 L330 38 L322 54 L258 54 Z" />
        <path d="M250 160 L330 162 L322 146 L258 146 Z" />
      </g>

      <path
        d="M190 74 C215 60 300 58 345 76 L345 124 C300 142 215 140 190 126 Z"
        fill="#1B1E24"
      />
      <path
        d="M205 78 C235 68 290 68 330 80 L330 90 C290 80 235 80 205 88 Z"
        fill="#fff"
        opacity="0.16"
      />

      <g fill="#FFF3D1">
        <path d="M452 62 L486 82 L478 88 L448 72 Z" />
        <path d="M452 138 L486 118 L478 112 L448 128 Z" />
      </g>
      
      <rect x="468" y="93" width="24" height="14" rx="5" fill="#1B1E24" opacity="0.85" />
      <rect x="30" y="54" width="22" height="92" rx="6" fill="#B92F36" />
      <g fill="#FFD2D4">
        <rect x="30" y="58" width="22" height="6" rx="2" />
        <rect x="30" y="136" width="22" height="6" rx="2" />
      </g>
    </svg>
  );
}
