var fs = require('fs')
var path = require('path')
var jsonFormat = require('json-format')
var walk = function(dir, done) {
  var results = []
  fs.readdir(dir, function(err, list) {
    if (err) return done(err)
    var i = 0
    ;(function next() {
      var file = list[i++]
      if (!file) return done(null, results)
      file = path.resolve(dir, file)
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res)
            next()
          })
        } else {
          results.push(file)
          next()
        }
      })
    })()
  })
}

walk('./src/locales', function(err, results) {
  if (err) throw err
  results.forEach(json => {
    const j = jsonFormat(require(json), { type: 'space', size: 2 }) + '\n'
    fs.writeFile(json, j, err => {
      if (err) throw err
    })
  })
})
