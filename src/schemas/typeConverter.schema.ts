import * as v from 'valibot'

/**
 * dateSchema for creating a date from string or Date object
 */
export const dateSchema = v.pipe(
  v.union([v.string('expect valid date string'), v.instance(Date, 'expect Date object')]),
  v.transform<string | Date, Date>((input) => {
    let date: Date
    if (input instanceof Date) {
      date = input
    } else {
      date = new Date(input)
    }
    if (Number.isNaN(date.getTime())) {
      throw new Error(`invalid date: ${input}`)
    }
    return date
  }),
)

export const dateStringSchema = v.pipe(
  v.union([v.string('expect string type'), v.instance(Date, 'expect Date object')]),
  v.transform<string | Date, string>((input) => {
    if (input instanceof Date) {
      return input.toISOString()
    } else {
      return new Date(input).toISOString()
    }
  }),
)

export const stringToNumberSchema = v.pipe(
  v.union([v.string('expect valid number string'), v.number('expect valid number')]),
  v.transform<string | number, number>((input: string | number) => {
    if (typeof input === 'number') {
      return input
    }
    const portNumber = parseInt(input)
    if (Number.isNaN(portNumber)) {
      throw new Error(`invalid number: ${input}`)
    }
    return portNumber
  }),
)
