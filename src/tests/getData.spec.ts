import { test } from '@playwright/test'
import PreviewLink from '../pageObjects/previewLink'
import { text } from 'stream/consumers'

//////////////////////////////////
// PASTE YOUR PREVIEW LINK HERE //
let pl = [
  'https://mercury.feed.xyz/api/clients/ada7618f-3afc-4541-bc9b-cb5ddd9d9e5b/emails/738a44f0-a4c8-478a-a0a9-2aa3009fad67/html?var=en',
  'https://mercury.feed.xyz/api/clients/ada7618f-3afc-4541-bc9b-cb5ddd9d9e5b/emails/6a2f0b5b-89e9-4a46-bf69-fbe990810aeb/html?var=en',
  'https://mercury.feed.xyz/api/clients/ada7618f-3afc-4541-bc9b-cb5ddd9d9e5b/emails/738a44f0-a4c8-478a-a0a9-2aa3009fad67/html?var=de',
  'https://mercury.feed.xyz/api/clients/ada7618f-3afc-4541-bc9b-cb5ddd9d9e5b/emails/6a2f0b5b-89e9-4a46-bf69-fbe990810aeb/html?var=de',
]
//////////////////////////////////

let prevLink: PreviewLink
let altsPL: any[] = []
let urlsPL: any[] = []
let textPL: any[] = []
let urlsEx: any[] = []
let txtEx: any[] = []
let altEx: any[] = []
// comment
test.describe.serial('FEED SMART HELPER', () => {
  test.beforeEach(async ({ page }) => {
    prevLink = new PreviewLink(page)
  })
  test('GET ALT TAGS FROM Preview Link', async ({ page }) => {
    for (let i = 0; i < pl.length; i += 1) {
      await prevLink.goTo(pl[i])
      // let language = pl[i].split('var=')[1]
      // altsPL.push('\n', language, '\n')
      await prevLink.altTags(altsPL)
      altsPL.push('\n')
    }
  })

  test('GET COPIES FROM Preview Link', async ({ page }) => {
    for (var i = 0; i < pl.length; i += 1) {
      await prevLink.goTo(pl[i])
      // console.log(pl[i].split('var=')[1])
      await prevLink.getAllText(textPL)
    }
  })

  test('GET URLs FROM Preview Link', async ({ page }) => {
    for (var i = 0; i < pl.length; i += 1) {
      await prevLink.goTo(pl[i])
      // let language = pl[i].split('var=')[1]
      // urlsPL.push('\n', language, '\n')
      await prevLink.getAllUrls(urlsPL)
    }
  })

  test('GET URLs FROM Excel File', async () => {
    for (var i = 0; i < pl.length; i += 1) {
      let language = pl[i].split('var=')[1]
      //console.log(language)
      prevLink.excelHelper('sm-12 Pre-order to Real-order.xlsx', language, 'urlData', urlsEx)
      urlsEx.push('\n')
    }
  })

  test('GET COPIES FROM Excel File', async () => {
    for (var i = 0; i < pl.length; i += 1) {
      let language = pl[i].split('var=')[1]
      //console.log(language)
      prevLink.excelHelper('sm-12 Pre-order to Real-order.xlsx', language, 'textData', txtEx)
    }
  })

  test('GET ALT TAGS FROM Excel File', async () => {
    for (var i = 0; i < pl.length; i += 1) {
      let language = pl[i].split('var=')[1]
      //console.log(language)
      prevLink.excelHelper('sm-12 Pre-order to Real-order.xlsx', language, 'altData', altEx)
      altEx.push('\n')
    }
  })

  test('URLs Comparion', async () => {
    console.log('this is the length of urlsEX ', urlsEx.length)
    console.log('this is the length of urlsPL ', urlsPL.length)
    for (let x = 0; x < urlsEx.length; x++) {
      for (let y = 0; y < urlsPL.length; y++) {
        if (urlsEx[x] === '\n') break
        else if (urlsEx[x] === urlsPL[y]) {
          console.log('Match: Excel Data ', x, ' PL Data ', y)
          break
        }
      }
    }
  })

  test('COPIES Comparion', async () => {})

  test('ALT Tags Comparion', async () => {
    console.log('this is the length of altsEX ', altEx.length)
    console.log('this is the length of altsPL ', altsPL.length)
    for (let x = 0; x < altEx.length; x++) {
      for (let y = 0; y < altsPL.length; y++) {
        if (altEx[x] === '\n') break
        else if (altEx[x] === altsPL[y]) {
          console.log('Match: Excel Data ', x, ' PL Data ', y)
          break
        }
      }
    }
  })
})
