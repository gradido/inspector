// src/types/globals.d.ts
import { i18n } from 'gettext.js'

declare global {
  // global instances
  var t: i18n.Gettext
  var toaster: Toaster
  
}

export {}
