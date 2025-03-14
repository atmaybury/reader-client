import { describe, expect, it } from 'vitest';
import { validateEmail } from './helpers';

// TODO validationToken

describe('validateEmail', () => {
  it("returns 'Invalid email address' on invalid email", () => {
    expect(validateEmail('test')).toBe('Invalid email address');
  });

  it("returns 'Invalid email address' on empty string", () => {
    expect(validateEmail('')).toBe('Invalid email address');
  });

  it("returns 'Invalid email address' on undefined", () => {
    expect(validateEmail(undefined)).toBe('Invalid email address');
  });

  it('returns undefined on valid email', () => {
    expect(validateEmail('test@test.com')).toBeUndefined();
  });
});
