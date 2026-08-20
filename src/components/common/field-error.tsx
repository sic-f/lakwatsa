import { ReactNode } from 'react';
import { Error } from '@/interfaces/error';
import { isEmpty } from 'lodash';
import classnames from 'classnames';

interface Props {
  errors?: Error | undefined;
  field: string;
  className?: string;
}

export default function FieldError({
  errors,
  field,
  className,
}: Props): ReactNode | undefined {
  if (isEmpty(errors)) return;
  if (isEmpty(errors[field])) return;

  const classNames = classnames('text-error', className);

  function hasMultipleErrorsPerField(errors: Error, field: string) {
    return errors[field].length > 1;
  }

  function renderMultipleErrors(errors: Array<string>) {
    return (
      <ul className="mb-3">
        {errors.map((error, index) => {
          return (
            <li className="validator-hint" key={index}>
              {error}
            </li>
          );
        })}
      </ul>
    );
  }

  function renderFieldError(errors: Error, field: string) {
    if (hasMultipleErrorsPerField(errors, field))
      renderMultipleErrors(errors[field]);

    return <p className={classNames}>{errors[field][0]}</p>;
  }

  return renderFieldError(errors, field);
}
