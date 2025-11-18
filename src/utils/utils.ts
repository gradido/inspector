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

export function formatCurrency4(value: string, currency: string = 'GDD'): string {
  const numericValue = parseFloat(value)
  if (isNaN(numericValue)) {
    return ''
  }

  const truncatedValue = Math.floor(numericValue * 10000) / 10000;
  
  return new Intl.NumberFormat(t.getLocale(), {
    style: 'currency',
    currency,
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
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
export function combineElementWithClasses(element: string, classes?: string[]) {
  let elementWithClasses = element
    if(classes && classes.length) {
      elementWithClasses += combineClasses(classes)
    } 
    return elementWithClasses
}

export function combineClasses(classes?: string[]) {
  if (!classes || classes.length === 0) {
    return ''
  }
  return '.' + classes.join('.')
}

export function stringToBoolean(str: string): boolean {
  return str.toLowerCase() === 'true' || str === '1' || str.toLowerCase() === 'yes';
}

// formatDistance from chatgpt without using date-fns
type FormatDistanceOptions = {
  addSuffix?: boolean, // "before x minutes" or "x minutes later"
}

export function formatDistance(
  date1: Date,
  date2: Date,
  options: FormatDistanceOptions = {}
): string {

  const intervals = [
    { unit: (count: number) => t._n('%1 year', '%1 years', count, count), seconds: 31536000 },
    { unit: (count: number) => t._n('%1 month', '%1 months', count, count), seconds: 2592000 },
    { unit: (count: number) => t._n('%1 week', '%1 weeks', count, count), seconds: 604800 },
    { unit: (count: number) => t._n('%1 day', '%1 days', count, count), seconds: 86400 },
    { unit: (count: number) => t._n('%1 hour', '%1 hours', count, count), seconds: 3600 },
    { unit: (count: number) => t._n('%1 minute', '%1 minutes', count, count), seconds: 60 },
    { unit: (count: number) => t._n('%1 second', '%1 seconds', count, count), seconds: 1 },
  ]
  const diffInSeconds = Math.abs((date2.getTime() - date1.getTime()) / 1000)
  // console.log('diff in seconds', diffInSeconds)
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      const result = interval.unit(count)

      if (options.addSuffix) {
        const suffix = date2 > date1 ? t.__('later') : t.__('ago')
        return `${result} ${suffix}`
      }

      return result
    }
  }

  return t.__('less than 1 minute')
}

export function formatDayMonthYear(date: Date): string {
  return new Intl.DateTimeFormat(t.getLocale(), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}