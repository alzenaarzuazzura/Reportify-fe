/**
 * Format phone number untuk display di UI
 * Input: "6281234567890" atau "081234567890"
 * Output: "(+62) 812-3456-7890"
 */
export const formatPhoneDisplay = (phone: string | null | undefined): string => {
  if (!phone) return '-';
  
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Convert 08xxx to 628xxx
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.substring(1);
  }
  
  // Ensure it starts with 62
  if (!cleaned.startsWith('62')) {
    return phone; // Return original if format is unexpected
  }
  
  // Remove country code for formatting
  const withoutCountryCode = cleaned.substring(2);
  
  // Format: (+62) 812-3456-7890
  if (withoutCountryCode.length >= 10) {
    const part1 = withoutCountryCode.substring(0, 3);
    const part2 = withoutCountryCode.substring(3, 7);
    const part3 = withoutCountryCode.substring(7);
    return `(+62) ${part1}-${part2}-${part3}`;
  }
  
  // If less than 10 digits, just format with country code
  return `(+62) ${withoutCountryCode}`;
};

/**
 * Format phone number untuk input (saat user mengetik)
 * Automatically adds formatting as user types
 * Input: "81234567890"
 * Output: "(+62) 812-3456-7890"
 */
export const formatPhoneInput = (value: string): string => {
  if (!value) return '';
  
  // Remove all non-numeric characters
  let cleaned = value.replace(/\D/g, '');
  
  // Remove leading 62 or 0 if present (we'll add it back)
  if (cleaned.startsWith('62')) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Limit to 12 digits (Indonesian phone numbers)
  cleaned = cleaned.substring(0, 12);
  
  // Format progressively as user types
  let formatted = '(+62) ';
  
  if (cleaned.length > 0) {
    formatted += cleaned.substring(0, 3);
  }
  
  if (cleaned.length > 3) {
    formatted += '-' + cleaned.substring(3, 7);
  }
  
  if (cleaned.length > 7) {
    formatted += '-' + cleaned.substring(7);
  }
  
  return formatted;
};

/**
 * Parse formatted phone untuk kirim ke backend
 * Input: "(+62) 812-3456-7890" atau "081234567890"
 * Output: "6281234567890"
 */
export const parsePhoneForBackend = (phone: string | null | undefined): string => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Convert 08xxx to 628xxx
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.substring(1);
  }
  
  // Ensure it starts with 62
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  
  return cleaned;
};

/**
 * Validate Indonesian phone number
 * Returns true if valid
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if starts with 62 or 08
  if (!cleaned.startsWith('62') && !cleaned.startsWith('08')) {
    return false;
  }
  
  // Check length (Indonesian phone: 10-13 digits with country code)
  const withCountryCode = cleaned.startsWith('62') ? cleaned : '62' + cleaned.substring(1);
  return withCountryCode.length >= 12 && withCountryCode.length <= 15;
};
