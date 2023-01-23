import { test } from '@playwright/test'
import PreviewLink from '../pageObjects/previewLink'

//////////////////////////////////
// PASTE YOUR PREVIEW LINK HERE //
const pl = ['https://google.com']
//////////////////////////////////

let prevLink: PreviewLink

test.describe('FEED SMART HELPER', () => {
  test.beforeEach(async ({ page }) => {
    prevLink = new PreviewLink(page)
  })
  test('GET ALT TAGS', async ({ page }) => {
    let alts: any[] = []
    for (let i = 0; i < pl.length; i += 1) {
      await prevLink.goTo(pl[i])
      let language = pl[i].split('var=')[1]
      alts.push('\n', language, '\n')
      await prevLink.altTags(alts)
      alts.push('\n')
    }
  })

  test('GET COPIES', async ({ page }) => {
    for (var i = 0; i < pl.length; i += 1) {
      await prevLink.goTo(pl[i])
      console.log(pl[i].split('var=')[1])
      await prevLink.getAllText()
    }
  })

  test('GET URLs', async ({ page }) => {
    let urls: any[] = []
    for (var i = 0; i < pl.length; i += 1) {
      await prevLink.goTo(pl[i])
      let language = pl[i].split('var=')[1]
      console.log(language)
      urls.push('\n', language, '\n')
      await prevLink.getAllUrls(urls)
    }
  })
})
