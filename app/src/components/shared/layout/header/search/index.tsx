import styles from "./index.module.css";

type Props = {
  value: string;
  placeholder?: string;
};

export default function SearchInput({ value, placeholder }: Props) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
}
