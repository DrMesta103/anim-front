export default function RobinLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%" className={`w-full h-full`}>
      <defs>
        <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#669186" />
          <stop offset="100%" stopColor="#52796f" />
        </linearGradient>
      </defs>

      <rect width="256" height="256" rx="56" fill="url(#themeGradient)" />

      <g fill="none" stroke="#ffffff" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
        <path d="M128,50 L128,206" />
        <path d="M64,75 C64,150 90,150 128,150" />
        <path d="M128,75 C190,75 190,150 128,150" />
        <path d="M145,150 L184,206" />
        <circle cx="128" cy="38" r="4" fill="#ffffff" stroke="none" />
      </g>
    </svg>
  );
}
