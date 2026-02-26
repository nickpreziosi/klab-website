/**
 * Shared contact form validation (Zod).
 * Used by sales, careers, and support forms (client + server) for consistent rules.
 */

import { z } from "zod";

/** Minimum length for first/last name */
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;

/** Minimum digits for a valid phone (after stripping non-digits) */
const PHONE_MIN_DIGITS = 10;
/** E.164 / ITU-T max length */
const PHONE_MAX_DIGITS = 15;

/** Minimum length for message/description fields */
const MESSAGE_MIN_LENGTH = 10;

const phoneDigitCount = (val: string) => val.replace(/\D/g, "").length;

/**
 * Phone: allow common separators and + prefix; require 10–15 digits.
 */
export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine(
    (val) => {
      const digits = phoneDigitCount(val);
      return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
    },
    { message: "Please enter a valid phone number (at least 10 digits)" }
  );

export const firstNameSchema = z
  .string()
  .min(NAME_MIN_LENGTH, "First name must be at least 2 characters")
  .max(NAME_MAX_LENGTH, "First name is too long");

export const lastNameSchema = z
  .string()
  .min(NAME_MIN_LENGTH, "Last name must be at least 2 characters")
  .max(NAME_MAX_LENGTH, "Last name is too long");

export const emailSchema = z.string().email("Please enter a valid email address");

/** Message/description field used across contact forms */
export const messageSchema = z
  .string()
  .min(MESSAGE_MIN_LENGTH, `Message must be at least ${MESSAGE_MIN_LENGTH} characters`);

export const recaptchaSchema = z
  .string()
  .min(1, "Please complete the reCAPTCHA verification");
