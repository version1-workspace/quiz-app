import React from 'react';
import styles from './index.module.css';

type Props = {
  row: number;
  value: string;
  onChange?: (value: string) => void;
};

export default function Textarea({ row, value, onChange }: Props) {
  return (
    <textarea
      className={styles.container}
      rows={row}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
