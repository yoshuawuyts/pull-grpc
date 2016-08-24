# pull-grpc [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

GRPC pull stream interface.

## Usage
```js
const pull = require('pull-stream')
const grpc = require('pull-grpc')

const uri = 'localhost:50051'
const schema = `
  syntax = "proto3";
  package messages;

  service MessageThing {
    rpc EchoHello (stream Sup) returns (stream Sup) {}
  }

  message Sup {
    required string msg = 1;
  }
`

// server: echo each request back as the response
const server = grpc.server(schema, {
  echoHello: (call) => pull(call, call)
})
server.listen(uri, { secure: false })

// client: send the message "hey world" once
const sink = grpc.client(uri, { secure: false }, (err, source) => {
  if (err) throw err
  pull(source, pull.drain(write, end))

  function write (data) {
    console.log(`data: ${data}`)
    // => "data: hey world"
  }

  function end (err) {
    if (err) throw err
    console.log('server done!')
    server.close()
  }
})

pull(pull.once({ msg: 'hey world' }), sink)
```

## API
### pullGrpc

## Installation
```sh
$ npm install pull-grpc
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/pull-grpc.svg?style=flat-square
[3]: https://npmjs.org/package/pull-grpc
[4]: https://img.shields.io/travis/yoshuawuyts/pull-grpc/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/pull-grpc
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/pull-grpc/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/pull-grpc
[8]: http://img.shields.io/npm/dm/pull-grpc.svg?style=flat-square
[9]: https://npmjs.org/package/pull-grpc
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
