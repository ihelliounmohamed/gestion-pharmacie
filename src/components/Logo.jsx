// Small pharmacy cross. light=true -> white square (for the dark sidebar)
export default function Logo({ light = false, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" rx="9" fill={light ? "#fff" : "#0f766e"} />
      <path d="M18 10v16M10 18h16" stroke={light ? "#0f766e" : "#fff"} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
