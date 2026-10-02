/**
 * Error messages from email providers can echo the request back. Before one
 * reaches a log, swap out anything that looks like an email address or a
 * phone number.
 */
export const redactPii = (message: string): string =>
  message
    .replace(/[^\s<>()"',;:]+@[^\s<>()"',;:]+/g, '[email]')
    .replace(/\+?\d[\d\s().-]{5,}\d/g, '[number]');

export const errorMessageOf = (error: unknown): string =>
  redactPii(error instanceof Error ? error.message : String(error));
