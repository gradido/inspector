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

// formatDistance from chatgpt without using date-fns
type FormatDistanceOptions = {
  addSuffix?: boolean, // "before x minutes" or "x minutes later"
};

export function formatDistance(
  date1: Date,
  date2: Date,
  options: FormatDistanceOptions = {}
): string {
  const diffInSeconds = Math.abs((date2.getTime() - date1.getTime()) / 1000);

  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      const unit = t.__(count === 1 ? interval.unit : `${interval.unit}s`);
      const result = `${count} ${unit}`;

      if (options.addSuffix) {
        if (date2 > date1) {
          return t.__(`${result} later`);
        } else {
          return t.__(`${result} ago`);
        }
      }

      return result;
    }
  }

  return t.__('just now');
}