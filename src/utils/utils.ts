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
  
  return new Intl.NumberFormat(t.getLocale(), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue).replace('-', t.__('− '))
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
      elementWithClasses += '.' + classes.join('.')
    } 
    return elementWithClasses
}