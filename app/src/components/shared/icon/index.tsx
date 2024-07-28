import { IoMenuOutline } from "react-icons/io5";

const icons = {
  menu: IoMenuOutline,
};

type IconNames = keyof typeof icons;

type Props = {
  name: IconNames;
  color?: string;
  size?: string;
  className?: string;
};

export default function Icon({ name, color, size, className }: Props) {
  const Icon = icons[name];

  return <Icon className={className} color={color} size={size} />;
}
