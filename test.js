const test = require('tape')
const pullGrpc = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(pullGrpc)
})
