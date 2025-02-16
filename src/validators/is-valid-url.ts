import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidURL as isValidURLFunction } from '../utils/iv-valid-url';

/**
 * Check if the provided http/https link is a valid url
 */
@ValidatorConstraint({ name: 'isValidURL', async: false })
export class isValidURL implements ValidatorConstraintInterface {
  validate(url: string) {
    return isValidURLFunction(url);
  }

  defaultMessage() {
    return `$value is not a valid url`;
  }
}
