import { Locator, Page, Browser } from 'playwright'
import * as fs from 'fs'

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
    fs.writeFile(`./${fileName}-Result.txt`, data.replaceAll(',', ''), (err) => {
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
        alts.push(await this.imgAltTags.nth(i).getAttribute('alt'), '\n')
    }
    const altTags = alts.toString()
    this.writeToFile('Alt-Tags', altTags)
  }

  async getAllText() {
    console.log('MAIN Copies:')
    console.log(await this.text.allInnerTexts())
    console.log('BULLETED TEXT:')
    console.log(await this.bulletedText.allInnerTexts(), '\n')
  }

  async getAllUrls(urls) {
    for (let i = 0; i < (await this.clickableItems.count()) - 11; i += 1) {
      await this.clickableItems.nth(i).click()
      urls.push(await this.page.url(), '\n')
      await this.page.goBack()
    }
    const allUrls = urls.toString()
    this.writeToFile('All-Urls', allUrls)
  }
}
