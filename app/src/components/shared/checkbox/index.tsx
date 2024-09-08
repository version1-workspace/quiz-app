import React, { useRef, useState } from "react";
import styles from "./index.module.css";

type Props = {
  variant?: "primary" | "success" | "danger";
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const variantStyles = {
  primary: {
    border: {
      border: "1px solid var(--primary-color)",
    },
    inner: {
      backgroundColor: "var(--primary-color)",
    },
  },
  success: {
    border: {
      border: "1px solid var(--correct-color)",
    },
    inner: {
      backgroundColor: "var(--correct-color)",
    },
  },
  danger: {
    border: {
      border: "1px solid var(--danger-color)",
    },
    inner: {
      backgroundColor: "var(--danger-color)",
    },
  },
};

export default function Checkbox({
  name,
  checked: forceChecked,
  variant,
  value,
  onChange,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const variantKey = variant || "primary";
  const variantStyle = variantStyles[variantKey];

  const _checked = forceChecked ?? checked;

  return (
    <div
      className={styles.container}
      style={_checked ? variantStyle.border : undefined}
      onClick={() => {
        setChecked(!checked);
        ref.current?.click();
      }}
    >
      {_checked ? (
        <div className={styles.inner} style={variantStyle.inner} />
      ) : null}
      <input
        ref={ref}
        className={styles.input}
        type="checkbox"
        name={name}
        value={value}
        onChange={(event) => {
          onChange?.(event);
        }}
      />
    </div>
  );
}
