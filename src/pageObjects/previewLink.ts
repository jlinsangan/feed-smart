import { Locator, Page, Browser } from 'playwright'
import * as fs from 'fs'
import XLSX from 'xlsx'

export default class PreviewLink {
  readonly page: Page
  readonly clickableItems: Locator
  readonly imgAltTags: Locator
  readonly text: Locator
  readonly bulletedText: any

  constructor(page) {
    this.page = page
    this.clickableItems = page.locator('a:visible')
    this.imgAltTags = page.locator('img[alt]:visible')
    this.text = page.locator('p')
    this.bulletedText = page.locator('li')
  }

  async writeToFile(fileName, data) {
    fs.writeFile(`./previewlink-${fileName}-Result.txt`, data.replaceAll(',', '\n'), (err) => {
      if (err) {
        return console.log(err)
      }
      console.log('Saved!')
    })
  }

  async goTo(url) {
    await this.page.goto(url)
  }

  async altTags(alts) {
    const imgCount = await this.imgAltTags.count()
    for (let i = 0; i < imgCount; i += 1) {
      if ((await this.imgAltTags.nth(i).getAttribute('alt')) !== '')
        alts.push(await this.imgAltTags.nth(i).getAttribute('alt'))
    }
    const altTags = alts.toString()
    this.writeToFile('Alt-Tags', altTags)
  }

  async getAllText(text) {
    const textCount = await this.text.count()
    for (let i = 0; i < textCount - 6; i += 1) {
      text.push(await this.text.nth(i).innerText(), '\n')
      console.log(await this.text.nth(i).innerText())
    }
    const bulletCount = await this.bulletedText.count()
    for (let x = 0; x < bulletCount; x += 1) {
      text.push(await this.bulletedText.nth(x).innerText(), '\n')
      console.log(await this.bulletedText.nth(x).innerText())
    }

    const allText = text.toString().replaceAll(',', '')
    this.writeToFile('Text', allText)
    // console.log('MAIN Copies:')
    // console.log(await this.text.allInnerTexts())
    // console.log('BULLETED TEXT:')
    // console.log(await this.bulletedText.allInnerTexts(), '\n')
  }

  async getAllUrls(urls) {
    for (let i = 0; i < (await this.clickableItems.count()) - 11; i += 1) {
      await this.clickableItems.nth(i).click()
      urls.push(await this.page.url())
      await this.page.goBack()
    }
    const allUrls = urls.toString()
    this.writeToFile('All-Urls', allUrls)
  }

  async excelHelper(excelFileName, language, resultFileName, type) {
    const workbook = XLSX.readFile(excelFileName)
    const worksheet = workbook.Sheets['Countdown email - Voucher']

    const content = XLSX.utils.sheet_to_json(worksheet)

    for (let i = 0; i < 1; i += 1) {
      for (const key of content) {
        const keys = key['key']
        const lang = key[language]

        if (resultFileName.includes('url')) {
          if (keys.includes('URL')) {
            type.push(lang.toString())
          }
        } else if (resultFileName.includes('text')) {
          if (keys.includes('_SL') || keys.includes('_HL') || keys.includes('_Text'))
            type.push(lang.toString().replaceAll(',', ''))
        } else if (resultFileName.includes('alt')) {
          if (keys.includes('_Alt') || keys.includes('alt'))
            type.push(lang.toString().replaceAll(',', '\n'))
        }
      }
    }

    fs.writeFile(
      `./excel-results/excel-${resultFileName}-Result.txt`,
      type.toString().replaceAll(',', '\n'),
      (err) => {
        if (err) {
          return console.log(err)
        }
        console.log('Saved!')
      }
    )
  }

  async readFromFile() {}
}
