import { Error } from '@/interfaces/account';
import { isEmpty } from 'lodash';

interface Props {
  errors?: Error | null;
  field: string;
}

const FieldError = ({ errors, field }: Props) => {
  if (isEmpty(errors)) return null;
  if (isEmpty(errors[field])) return null;

  if (hasMultipleErrorsPerField(errors, field)) renderMultipleErrors(errors[field]);

  return (
    <p className="validator-hint">
      {renderFieldError(errors, field)}
    </p>
  );
}

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

const renderFieldError = (errors: Error, field: string) => errors[field][0];

export default FieldError;