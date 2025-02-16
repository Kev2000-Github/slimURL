import { isValidURL } from '../../src/utils/iv-valid-url';

describe('Unit Testing | utils | isValidURL', () => {
  it('should return true for a valid HTTP URL', () => {
    const url = 'http://example.com';
    expect(isValidURL(url)).toBe(true);
  });

  it('should return true for a valid HTTPS URL', () => {
    const url = 'https://example.com';
    expect(isValidURL(url)).toBe(true);
  });

  it('should return true for a valid domain name', () => {
    const url = 'example.com';
    expect(isValidURL(url)).toBe(true);
  });

  it('should return false for an invalid URL', () => {
    const url = 'invalid-url';
    expect(isValidURL(url)).toBe(false);
  });

  it('should return false for an url with space', () => {
    const url = 'exam ple.com';
    expect(isValidURL(url)).toBe(false);
  });

  it('should return false for a string with double dots', () => {
    const url = 'example..com';
    expect(isValidURL(url)).toBe(false);
  });

  it('should return false for an empty string', () => {
    const url = '';
    expect(isValidURL(url)).toBe(false);
  });

  it('should return false for numeric strings', () => {
    const url = '12345';
    expect(isValidURL(url)).toBe(false);
  });
});
