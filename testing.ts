const XLSX = require('xlsx')
const fs = require('fs')

class Helper {
  constructor() {}
  async excelHelper(excelFileName, lang, resultFileName, data) {
    const workbook = XLSX.readFile('SM-21 – Ald Lease Journey.xlsx')
    const worksheet = workbook.Sheets['Light Trigger 4']

    const content = XLSX.utils.sheet_to_json(worksheet)
    console.log(content)

    let urls = []
    let alts = []
    let text = []

    const language = ['en', 'de']

    for (let i = 0; i < language.length; i += 1) {
      for (const key of content) {
        const keys = key['key']
        const lang = key[language[i]]

        if (keys.includes('URL')) {
          urls.push(lang, '\n')
        } else if (keys.includes('_SL') || keys.includes('_HL') || keys.includes('_Text')) {
          text.push(lang, '\n')
        } else if (keys.includes('_Alt')) {
          alts.push(lang, '\n')
        }

        //   console.log(keys, '', i)
        //   if (keys.includes('URL')) {
        //     console.log('im awesome')
        //   }
        //   console.log(lang)
        //   i += 1
      }
    }

    //for (const keys of Object.keys(urls)) {
    //}

    //console.log(content)

    fs.writeFile(
      `./excel-results/${resultFileName}-Result.txt`,
      data.toString().replaceAll(',', ''),
      (err) => {
        if (err) {
          return console.log(err)
        }
        console.log('Saved!')
      }
    )
  }
}

module.exports = { Helper }
// const urls1 = writeFile('urls', urls)
// const text1 = writeFile('text', text)
// const alts1 = writeFile('alt', alts)
