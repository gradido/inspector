import m, { ClassComponent } from 'mithril'
import { ValiError } from 'valibot'

export const ValibotError: ClassComponent<{error: ValiError<any>}> = {
  view({attrs}) {
    return m('pre.text-danger', JSON.stringify(attrs.error, null, 2))
  },
}
