import styles from "./index.module.css";
import { join } from "@/lib/className";

type Variant =
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "danger"
  | "success"
  | "outline";

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  variant,
  className,
  onClick,
  children,
}: Props) {
  const variantStyle = styles[variant || "default"];
  const _className = className || "";

  return (
    <button
      className={join(styles.container, variantStyle, _className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
