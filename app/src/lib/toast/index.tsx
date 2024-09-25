"use client";

import { createContext, useEffect, useState, useRef } from "react";
import styles from "./index.module.css";
import { cls } from "@/lib/className";
import {
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoInformationCircleOutline,
  IoCloseOutline,
} from "react-icons/io5";

type Position = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

type Props = {
  variant: "success" | "error" | "info" | "warning";
  title: string;
  body: string;
  duration?: number;
  padding?: Position;
  onClose?: () => void;
};

const icons = {
  info: {
    component: IoInformationCircleOutline,
    color: "var(--info-color)",
  },
  success: {
    component: IoCheckmarkCircleOutline,
    color: "var(--success-color)",
  },
  error: {
    component: IoAlertCircleOutline,
    color: "var(--danger-color)",
  },
  warning: {
    component: IoAlertCircleOutline,
    color: "var(--warning-color)",
  },
};

const positions: Record<"top" | "right" | "left" | "bottom", Position> = {
  right: {
    top: 16,
    right: 32,
  },
  top: {
    top: 16,
  },
  left: {
    top: 16,
    left: 32,
  },
  bottom: {
    bottom: 16,
  },
};

export const Toast = ({ variant, padding, title, body, onClose }: Props) => {
  const spot = positions.right;
  const _positions = {
    top: spot.top ? spot.top + (padding?.top || 0) : undefined,
    right: spot.right ? spot.right + (padding?.right || 0) : undefined,
    bottom: spot.bottom ? spot.bottom + (padding?.bottom || 0) : undefined,
    left: spot.left ? spot.left + (padding?.left || 0) : undefined,
  };

  const icon = icons[variant] || icons.info;
  const IconComponent = icon.component;

  return (
    <div
      className={cls({
        [styles.container]: true,
        [styles.info]: variant === "info",
        [styles.success]: variant === "success",
        [styles.error]: variant === "error",
        [styles.warning]: variant === "warning",
      })}
      style={{ ..._positions }}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.icon}>
            <IconComponent name={variant} color={icon.color} />
          </div>
          {title}
        </div>
        <div className={styles.close} onClick={onClose}>
          <IoCloseOutline />
        </div>
      </div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};

const marginBetweenItem = 100;
const defaultDuration = 3000;
let queue: Props[] = [];
let renderTrigger = () => {};

type ContainerProps = {
  padding?: Position;
};

export const ToastContainer = ({ padding }: ContainerProps) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    renderTrigger = () => setTick((prev) => prev + 1);
  }, []);

  return (
    <div className={styles.listContainer}>
      {queue.map((props, index) => {
        const paddingTop = (padding?.top || 0) + index * marginBetweenItem;

        return (
          <Toast
            key={`toast-${index}`}
            padding={{
              top: paddingTop,
            }}
            onClose={() => remove(index)}
            {...props}
          />
        );
      })}
    </div>
  );
};

const enqueue = (props: Props) => {
  queue.push(props);
  renderTrigger();
  setTimeout(() => {
    if (queue.length > 0) {
      remove(0);
    }
  }, props.duration || defaultDuration);
};

const dequeue = (props: Props) => {
  queue.pop();
  renderTrigger();
};

const remove = (index: number) => {
  queue.splice(index, 1);
  renderTrigger();
};

export const show = enqueue;
