export function getEnumValue<T extends string | number>(
  value: string | null,
  defaultValue: T
): T {
  if (!value) {
    return defaultValue;
  }

  if (Object.values(defaultValue).includes(value as T)) {
    return value as T;
  }

  return defaultValue
}

export function formatCurrency(value: string, currency: string = 'GDD'): string {
  const numericValue = parseFloat(value)
  if (isNaN(numericValue)) {
    return 'NaN'
  }
  
  return new Intl.NumberFormat(t.getLocale(), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}