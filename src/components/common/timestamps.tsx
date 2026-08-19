import RelativeTime from './relative-time';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

type Props = {
  createdAt: Date;
  lastModified: Date;
};

export default function Timestamps({ createdAt, lastModified }: Props) {
  dayjs.extend(customParseFormat);

  function unmodified(): boolean {
    const created = dayjs(createdAt, 'YYYY-MM-DD HH:mm:ss');
    const modified = dayjs(lastModified, 'YYYY-MM-DD HH:mm:ss');

    return created.isSame(modified);
  }

  return (
    <div className="flex gap-2">
      <RelativeTime
        time={createdAt}
        label="ca"
        labelClassName="text-xs text-warning italic"
      />
      <RelativeTime
        time={lastModified}
        label="lm"
        labelClassName="text-xs text-secondary italic"
        unmodified={unmodified()}
      />
    </div>
  );
}
