// src/types/globals.d.ts
import { i18n } from 'gettext.js'
import { Community } from '../client/output.schema'

declare global {
  // global instances
  var t: i18n.Gettext
  var toaster: Toaster
  var communities: Map<string, Community>
}
