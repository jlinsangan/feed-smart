const fs = require('fs')

let oldFile = fs.readFile('excel-results/urlData-Result.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})

const newFile = fs.readFile('excel-results/textData-Result.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
