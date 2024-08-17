import styles from "./index.module.css";
import { join } from "@/lib/className";

type Variant =
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "danger"
  | "success"
  | "outline"

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export default function Button({ variant, className, children }: Props) {
  const variantStyle = styles[variant || "default"];

  return (
    <button className={join(styles.container, variantStyle, className)}>{children}</button>
  );
}
