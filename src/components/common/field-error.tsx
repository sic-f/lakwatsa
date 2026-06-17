import { ReactNode } from 'react';
import { Error } from '@/interfaces/error';
import { isEmpty } from 'lodash';

interface Props {
  errors?: Error | undefined;
  field: string;
}

const FieldError = ({ errors, field }: Props): ReactNode | undefined => {
  if (isEmpty(errors)) return;
  if (isEmpty(errors[field])) return;

  const hasMultipleErrorsPerField = (errors: Error, field: string) => errors[field].length > 1;

  const renderMultipleErrors = (errors: Array<string>) => {
    return (
      <ul className="mb-3">
        {errors.map((error, index) => {
          return <li className="validator-hint" key={index}>{error}</li>;
        })}
      </ul>
    );
  }

  if (hasMultipleErrorsPerField(errors, field)) renderMultipleErrors(errors[field]);

  const renderFieldError = (errors: Error, field: string) => errors[field][0];

  return (
    <p className="text-red-400">
      {renderFieldError(errors, field)}
    </p>
  );
}

export default FieldError;