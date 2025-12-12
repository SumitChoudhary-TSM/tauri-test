/**
 * Name validation:
 * - Allows letters, spaces, apostrophes, hyphens
 * - 2 to 50 characters
 */
export const NAME_REGEX = /^[A-Za-z\s'-]{2,50}$/;

/**
 * Email validation:
 * - Standard email pattern (case-insensitive)
 */
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Numeric validation:
 * - Only digits
 */
export const NUMERIC_REGEX = /^\d+$/;

/**
 * Alphanumeric & hyphen validation:
 * - Allows A–Z, 0–9, hyphen
 */
export const VENDOR_CODE_REGEX = /^[A-Z0-9-]+$/i;
