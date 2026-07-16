interface LtrTextProps {
  children: React.ReactNode;
  className?: string;
}

/** Keeps Latin physical addresses readable inside RTL layouts (e.g. fa locale). */
export default function LtrText({ children, className }: LtrTextProps) {
  return (
    <span dir="ltr" className={className}>
      {children}
    </span>
  );
}
