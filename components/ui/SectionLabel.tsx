export default function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="label mb-6 flex items-center gap-3">
      <span className="text-accent">({index})</span>
      {children}
    </p>
  );
}
