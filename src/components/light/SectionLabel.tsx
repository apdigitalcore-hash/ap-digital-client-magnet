interface SectionLabelProps {
  label: string;
  className?: string;
}

const SectionLabel = ({ label, className = '' }: SectionLabelProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/70 ${className}`}
  >
    <span className="h-1 w-1 rounded-full bg-foreground" />
    {label}
  </span>
);

export default SectionLabel;
