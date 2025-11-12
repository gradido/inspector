const po2json = require('po2json')
const fs = require('fs')
const path = require('path')

const languageDir = path.join(__dirname, '..', 'src', 'locales')
const languages = fs.readdirSync(languageDir)
  .filter(file => fs.statSync(path.join(languageDir, file)).isDirectory())

languages.forEach(lang => {
  const langPath = path.join(languageDir, lang)
  const publicLangDir = path.join(__dirname, '..', 'public', 'locales', lang)
  const json = po2json.parseFileSync(path.join(langPath, 'messages.po'), { format: 'mf' })
  if (!fs.existsSync(publicLangDir)) {
    fs.mkdirSync(publicLangDir, { recursive: true })
  }
  fs.writeFileSync(path.join(publicLangDir, 'messages.json'), JSON.stringify(json))
})

