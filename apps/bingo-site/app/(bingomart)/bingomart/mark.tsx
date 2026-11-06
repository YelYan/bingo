export function Mark({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-display font-bold ${
        inverted ? "bg-mart-saffron text-mart-ink" : "bg-mart-ink text-mart-saffron"
      } ${className}`}
    >
      Bm
    </span>
  );
}
