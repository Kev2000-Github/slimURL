import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Check if the provided http/https link is a valid url
 */
@ValidatorConstraint({ name: 'isValidURL', async: false })
export class isValidURL implements ValidatorConstraintInterface {
  validate(url: string) {
    // Regular expression to validate HTTP/HTTPS URLs
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*(\?[\/\w \.-=&]*)?(\#[\w \.-]*)?$/;

    // Test the URL against the pattern
    return urlPattern.test(url);
  }

  defaultMessage() {
    return `$value is not a valid url`;
  }
}
