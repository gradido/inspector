import m, { type ClassComponent } from 'mithril'
import type * as v from 'valibot'

export const ValibotError: ClassComponent<{
  error: v.ValiError<v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>
}> = {
  view({ attrs }) {
    // flatten?
    return m('pre.text-danger', JSON.stringify(attrs.error, null, 2))
  },
}
