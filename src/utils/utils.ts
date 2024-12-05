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
    return ''
  }

  const truncatedValue = Math.floor(numericValue * 100) / 100;
  
  return new Intl.NumberFormat(t.getLocale(), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(truncatedValue).replace('-', t.__('− '))
}

export function formatGDD(value: string): string {
  const firstStep = formatCurrency(value)
  if(firstStep.length) {
    const numericValue = parseFloat(value)
    if(numericValue > 0) {
      return t.__('+') + ' ' + firstStep
    } 
  }
  return firstStep  
}
export function combineElementWithClasses(element: string, classes: string[]) {
  let elementWithClasses = element
    if(classes.length) {
      elementWithClasses += combineClasses(classes)
    } 
    return elementWithClasses
}

export function combineClasses(classes: string[]) {
  return '.' + classes.join('.')
}

export function stringToBoolean(str: string): boolean {
  return str.toLowerCase() === 'true' || str === '1' || str.toLowerCase() === 'yes';
}
