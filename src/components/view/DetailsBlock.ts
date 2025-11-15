import m from 'mithril'
import { CollapseArrow } from './CollapseArrow'
import { formatGDD } from '../../utils/utils'
import { Collapse } from './bootstrap/Collapse'

export interface DetailsBlockAttrs {
  firstRow: m.Child
  secondRow: {
    text: string
    link?: string
    date: Date
  },
  thirdRow: {
    label: string
    amount: string
    sub?: {
      label: string
      icon?: m.Child
    }
  }
  id: number
  details: m.Child
  detailClasses?: string[]
}

export class DetailsBlock implements m.ClassComponent<DetailsBlockAttrs> {

  isAmountPositive(amount: string): boolean {
    return Number(amount) > 0
  }

  amountView(amount: string): m.Child {
    if (this.isAmountPositive(amount)) {
      return m('.fw-bold.gradido-global-color-accent', formatGDD(amount))
    } else {
      return m('.fw-bold', formatGDD(amount))
    }
  }

  infoView(isOpen: boolean, attrs: DetailsBlockAttrs) {
    const printTitle = attrs.secondRow.text.length > 30 ? attrs.secondRow.text.substring(0, 30) + '...' : attrs.secondRow.text
    return m('.row.align-items-center', [
        m('.col-md-2.col-lg-2.col-3', attrs.firstRow),
        m('.col', [
          m('.fw-bold', { 'aria-label': attrs.secondRow.text, title: attrs.secondRow.text }, 
            attrs.secondRow.link 
            ? m('a', { href: attrs.secondRow.link }, printTitle) 
            : printTitle
          ),
          m('span.small', attrs.secondRow.date.toLocaleDateString()),
          m('span.small.ms-4', attrs.secondRow.date.toLocaleTimeString(undefined, {timeStyle: 'short'}))
        ]),
        m('.col-sm-8.col-md-3.col-lg-3.offset-3.offset-lg-0.offset-md-0.col-8.offset-3', [
          m('.small.mb-2', attrs.thirdRow.label),
          this.amountView(attrs.thirdRow.amount),
          attrs.thirdRow.sub 
            ? m('.small', [
              m('span', attrs.thirdRow.sub.label),
              attrs.thirdRow.sub.icon ? attrs.thirdRow.sub.icon : undefined
            ]) 
            : undefined,
        ]),
        m('.col-md-1.col-lg-1.col-12.text-end', 
          m('.collapse-icon.text-end', 
            m(CollapseArrow, { open: isOpen })
          )
        )
      ])
    }
  
  view({attrs}: m.CVnode<DetailsBlockAttrs>) {
    return m(Collapse, {
      info: (isOpen) => this.infoView(isOpen, attrs),
      details: attrs.details,
      detailClasses: attrs.detailClasses,
      containerClasses: ['pointer', 'mb-3', 'bg-white', 'app-box-shadow', 'gradido-border-radius', 'p-3'],
      id: attrs.id
    })    
  }
}
