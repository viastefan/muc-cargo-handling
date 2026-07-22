type Props = {
  className?: string;
  light?: boolean;
};

export function ButtonArrowIcon({ className = "", light = false }: Props) {
  return (
    <span
      className={`material-symbols-outlined btn-arrow-symbol ${light ? "btn-arrow-symbol-light" : ""} ${className}`}
      aria-hidden="true"
    >
      arrow_forward_ios
    </span>
  );
}
