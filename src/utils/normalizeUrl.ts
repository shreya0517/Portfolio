const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

export function normalizeUrl(value?: string | null): string {
  const trimmedValue = value?.trim() ?? '';

  if (!trimmedValue) {
    return '';
  }

  if (trimmedValue.startsWith('//')) {
    return `https:${trimmedValue}`;
  }

  if (trimmedValue.startsWith('/') || trimmedValue.startsWith('#')) {
    return trimmedValue;
  }

  if (ABSOLUTE_URL_PATTERN.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}
