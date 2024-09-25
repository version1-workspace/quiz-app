import {
  IoHeart,
  IoMenuOutline,
  IoEllipsisVertical,
  IoPerson,
  IoNotificationsSharp,
  IoCheckmarkCircle,
  IoAlarmOutline,
  IoCalendarNumberOutline,
  IoLayers,
  IoAlertCircleOutline,
  IoInformationCircleOutline
} from "react-icons/io5";

const icons = {
  calendar: IoCalendarNumberOutline,
  clock: IoAlarmOutline,
  menu: IoMenuOutline,
  kebabMenu: IoEllipsisVertical,
  layer: IoLayers,
  like: IoHeart,
  person: IoPerson,
  notification: IoNotificationsSharp,
  check: IoCheckmarkCircle,
  info: IoInformationCircleOutline,
  error: IoAlertCircleOutline,
  warning: IoAlertCircleOutline,
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
