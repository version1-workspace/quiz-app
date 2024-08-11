import styles from "./index.module.css";
import { join } from "@/lib/className";

type Variant =
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "danger"
  | "success";

type Props = {
  variant?: Variant;
  children: React.ReactNode;
};

export default function Button({ variant, children }: Props) {
  const variantStyle = styles[variant || "default"];

  return (
    <button className={join(styles.container, variantStyle)}>{children}</button>
  );
}
