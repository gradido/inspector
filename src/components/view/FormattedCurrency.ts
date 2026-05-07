import m from 'mithril'
import { createCurrencyDisplayParts } from '../../utils/utils'

export interface FormattedCurrencyAttrs {
  value: string
  decimalPlaces?: number
  currency?: string // default to GDD
}

export class FormattedCurrency implements m.ClassComponent<FormattedCurrencyAttrs> {
  formatDecimalPart(decimalPart: string, decimalPlaces: number): m.Child[] {
    if (decimalPlaces > 2) {      
      return [
        decimalPart.slice(0, 2),
        m('span.gdd-precision-fractional-places', decimalPart.slice(2 - decimalPlaces))
      ]
    } else {
      return [decimalPart]
    }
  }
  view({ attrs: { value, decimalPlaces, currency } }: m.CVnode<FormattedCurrencyAttrs>) {
    // ?? instead of || to allow 0 value for decimalPlaces
    const localDecimalPlaces = decimalPlaces ?? 2
    const currencyParts = createCurrencyDisplayParts(value, localDecimalPlaces, currency)
    const decimalPart = this.formatDecimalPart(currencyParts.decPart, localDecimalPlaces)
    return m('span', [
      currencyParts.sign,
      ' ',
      currencyParts.intPart,
      currencyParts.decimalSeparator,
      ...decimalPart
    ])
  }
}