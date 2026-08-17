interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

const SectionLabel = ({ number, label, className = '' }: SectionLabelProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground ${className}`}
  >
    <span className="text-foreground/40">{number}</span>
    <span className="h-1 w-1 rounded-full bg-foreground" />
    <span className="text-foreground/70">{label}</span>
  </span>
);

export default SectionLabel;
