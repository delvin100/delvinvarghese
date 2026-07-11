interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
  accent?: boolean;
}

export default function SectionLabel({
  index,
  label,
  className = '',
  accent = false,
}: SectionLabelProps) {
  return (
    <div className={`section-label ${className}`}>
      <span style={{ opacity: 0.35 }}>{index}</span>
      <span className={accent ? 'label-blue' : ''}>{label}</span>
    </div>
  );
}
