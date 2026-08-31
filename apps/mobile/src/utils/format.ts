/**
 * TRAVIA DUBAI — Format Utilities
 */

/**
 * Format currency (e.g., "18.500 AED")
 */
export function formatCurrency(amount: number, currency: string = 'AED'): string {
  const formatted = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formatted} ${currency}`;
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  // Remove non-digits
  const clean = phone.replace(/\D/g, '');

  // Format +971 XX XXX XXXX
  if (clean.startsWith('971') && clean.length === 12) {
    return `+971 ${clean.slice(3, 5)} ${clean.slice(5, 8)} ${clean.slice(8)}`;
  }

  // Format +90 5XX XXX XX XX
  if (clean.startsWith('90') && clean.length === 12) {
    return `+90 ${clean.slice(2, 5)} ${clean.slice(5, 8)} ${clean.slice(8, 10)} ${clean.slice(10)}`;
  }

  return phone;
}

/**
 * Get initials from name (e.g., "EM" from "Edip Mangtay")
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * File size formatting (e.g., "2.4 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
