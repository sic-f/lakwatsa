'use server';

import { Error as AuthError } from '@/interfaces/account';
import { AccountError as FieldError } from '@/constants/account-error';

export async function parseErrors(errors: Object): Promise<AuthError> {
  const keys = Object.keys(errors);

  if (hasNormalErrors(keys)) {
    return parsedNormalErrors(errors);
  } else if (hasPasswordRequirementErrors(keys)) {
    return parsedOtherErrors(errors, FieldError.Password);
  } else if (hasOldPasswordError(keys)) {
    return parsedOtherErrors(errors, FieldError.PasswordMismatch);
  } else if (hasDuplicateUserNameError(keys)) {
    return parsedOtherErrors(errors, FieldError.Email);
  }

  throw new Error("Unreachable");
};

function hasNormalErrors(keys: string[]): boolean {
  return errorFieldsDoesNotIncludeNonNormalErrors(keys);
}

function errorFieldsDoesNotIncludeNonNormalErrors(keys: string[]) {
  return (
    !keys.includes(FieldError.PasswordRequiresUpper) &&
    !keys.includes(FieldError.DuplicateUserName) &&
    !keys.includes(FieldError.PasswordMismatch)
  );
};

function hasPasswordRequirementErrors(keys: string[]): boolean {
  return keys.includes(FieldError.PasswordRequiresUpper);
}

function hasOldPasswordError(keys: string[]): boolean {
  return keys.includes(FieldError.PasswordMismatch);
}

function hasDuplicateUserNameError(keys: string[]): boolean {
  return keys.includes(FieldError.DuplicateUserName);
}

function parsedNormalErrors(errors: any): AuthError {
  return errors;
}

function parsedOtherErrors(errors: any, field: string): AuthError {
  const keys = Object.keys(errors);
  const errorsCollection: string[] = [];

  keys.forEach((key) =>
    errorsCollection.push(errors[key].errors[0].errorMessage)
  );

  return { [field]: errorsCollection };
};