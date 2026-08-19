import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type Props = {
  time: Date;
  label: string;
  labelClassName: string;
  unmodified?: boolean;
};

export default function RelativeTime({
  time,
  label,
  labelClassName,
  unmodified,
}: Props) {
  if (unmodified) return;
  dayjs.extend(relativeTime);

  return (
    <small className="text-primary-content text-1px cursor-default">
      {dayjs(time).fromNow()}&nbsp;
      <span className={labelClassName}>{label}</span>
    </small>
  );
}
