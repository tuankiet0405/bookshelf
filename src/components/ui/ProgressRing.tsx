type ProgressRingProps = {
  value: number;
  label: string;
  size?: number;
  tone?: "accent" | "warning";
};

export function ProgressRing({ value, label, size = 116, tone = "accent" }: ProgressRingProps) {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  const color = tone === "warning" ? "var(--color-amber)" : "var(--color-forest)";

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} aria-label={`${label}: ${value}%`}>
      <svg className="-rotate-90" width={size} height={size} role="img" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(24,32,24,0.12)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <strong className="block text-2xl text-[var(--color-ink)]">{value}%</strong>
        <span className="text-xs text-[var(--color-ink-muted)]">{label}</span>
      </div>
    </div>
  );
}
