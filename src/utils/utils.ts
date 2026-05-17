import { CurrencyDisplayParts, currencyDisplayPartsSchema } from '../schemas/basic.schema'
import * as v from 'valibot'

export function getEnumValue<T extends string | number>(value: string | null, defaultValue: T): T {
  if (!value) {
    return defaultValue
  }

  if (Object.values(defaultValue).includes(value as T)) {
    return value as T
  }

  return defaultValue
}

const POW10: Record<number, number> = {
  0: 1,
  1: 10,
  2: 100,
  3: 1000,
  4: 10000,
}

export function createCurrencyDisplayParts(value: string, fractionDigits: number = 2, currency?: string): CurrencyDisplayParts {
  const result = {
    sign: '',
    intPart: '',
    decimalSeparator: '',
    decPart: '',
    currencySymbol: currency || 'GDD',
  }
  const numericValue = parseFloat(value)
  if (fractionDigits > 4) {
    throw new Error('fractionDigits must be less than or equal to 4')
  }
  if (!Number.isNaN(numericValue)) {
    const truncatedValue = Math.round(numericValue * POW10[fractionDigits]) / POW10[fractionDigits]
    const parts = new Intl.NumberFormat(t.getLocale(), {
      style: 'decimal',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
      useGrouping: true, 
    }).formatToParts(truncatedValue)
    if (truncatedValue > 0) {
      result.sign = t.__('+')
    } else if (truncatedValue < 0) {
      result.sign = t.__('−')
    }
    for (const part of parts) {
      switch (part.type) {
        case 'integer':
        case 'group':
          result.intPart += part.value
          break
        case 'decimal':
          result.decimalSeparator = part.value
          break
        case 'fraction':
          result.decPart = part.value
          break
      }
    }
  }
  
  return v.parse(currencyDisplayPartsSchema, result)
}


export function combineElementWithClasses(element: string, classes?: string[]) {
  let elementWithClasses = element
  if (classes?.length) {
    elementWithClasses += combineClasses(classes)
  }
  return elementWithClasses
}

export function combineClasses(classes?: string[]) {
  if (!classes || classes.length === 0) {
    return ''
  }
  return `.${classes.join('.')}`
}

export function stringToBoolean(str: string): boolean {
  return str.toLowerCase() === 'true' || str === '1' || str.toLowerCase() === 'yes'
}

// formatDistance from chatgpt without using date-fns
type FormatDistanceOptions = {
  addSuffix?: boolean // "before x minutes" or "x minutes later"
}

export function formatDistance(
  date1: Date,
  date2: Date,
  options: FormatDistanceOptions = {},
): string {
  const intervals = [
    {
      unit: (count: number) => (count > 1 ? `${count} ${t.__('years')}` : t.__('1 year')),
      seconds: 31536000,
    },
    {
      unit: (count: number) => (count > 1 ? `${count} ${t.__('months')}` : t.__('1 month')),
      seconds: 2592000,
    },
    {
      unit: (count: number) => (count > 1 ? `${count} ${t.__('weeks')}` : t.__('1 week')),
      seconds: 2 * 604800,
    },
    {
      unit: (count: number) => (count > 1 ? `${count} ${t.__('days')}` : t.__('1 day')),
      seconds: 86400,
    },
    {
      unit: (count: number) => (count > 1 ? `${count} ${t.__('hours')}` : t.__('1 hour')),
      seconds: 3600,
    },
    {
      unit: (count: number) => (count > 1 ? `${count} ${t.__('minutes')}` : t.__('1 minute')),
      seconds: 60,
    },
    {
      unit: (count: number) => (count > 1 ? `${count} ${t.__('seconds')}` : t.__('1 second')),
      seconds: 1,
    },
  ]
  const diffInSeconds = Math.abs((date2.getTime() - date1.getTime()) / 1000)
  // console.log('diff in seconds', diffInSeconds)
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      const result = `${t.__('about')} ${interval.unit(count)}`

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
