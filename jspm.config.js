SystemJS.config({
  devConfig: {
    'map': {
      'react-addons-test-utils': 'npm:react-addons-test-utils@15.4.0',
      'babel-preset-react': 'npm:babel-preset-react@6.16.0'
    },
    'packages': {
      'npm:babel-preset-react@6.16.0': {
        'map': {
          'babel-plugin-syntax-flow': 'npm:babel-plugin-syntax-flow@6.18.0',
          'babel-plugin-transform-react-jsx': 'npm:babel-plugin-transform-react-jsx@6.8.0',
          'babel-plugin-transform-react-jsx-source': 'npm:babel-plugin-transform-react-jsx-source@6.9.0',
          'babel-plugin-transform-react-jsx-self': 'npm:babel-plugin-transform-react-jsx-self@6.11.0',
          'babel-plugin-transform-react-display-name': 'npm:babel-plugin-transform-react-display-name@6.8.0',
          'babel-plugin-transform-flow-strip-types': 'npm:babel-plugin-transform-flow-strip-types@6.18.0',
          'babel-plugin-syntax-jsx': 'npm:babel-plugin-syntax-jsx@6.18.0'
        }
      },
      'npm:babel-plugin-transform-react-jsx@6.8.0': {
        'map': {
          'babel-plugin-syntax-jsx': 'npm:babel-plugin-syntax-jsx@6.18.0',
          'babel-runtime': 'npm:babel-runtime@6.18.0',
          'babel-helper-builder-react-jsx': 'npm:babel-helper-builder-react-jsx@6.18.0'
        }
      },
      'npm:babel-plugin-transform-react-jsx-source@6.9.0': {
        'map': {
          'babel-plugin-syntax-jsx': 'npm:babel-plugin-syntax-jsx@6.18.0',
          'babel-runtime': 'npm:babel-runtime@6.18.0'
        }
      },
      'npm:babel-plugin-transform-react-jsx-self@6.11.0': {
        'map': {
          'babel-plugin-syntax-jsx': 'npm:babel-plugin-syntax-jsx@6.18.0',
          'babel-runtime': 'npm:babel-runtime@6.18.0'
        }
      },
      'npm:babel-plugin-transform-flow-strip-types@6.18.0': {
        'map': {
          'babel-plugin-syntax-flow': 'npm:babel-plugin-syntax-flow@6.18.0',
          'babel-runtime': 'npm:babel-runtime@6.18.0'
        }
      },
      'npm:babel-plugin-transform-react-display-name@6.8.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.18.0'
        }
      },
      'npm:babel-helper-builder-react-jsx@6.18.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.18.0',
          'lodash': 'npm:lodash@4.17.2',
          'esutils': 'npm:esutils@2.0.2',
          'babel-types': 'npm:babel-types@6.19.0'
        }
      },
      'npm:babel-types@6.19.0': {
        'map': {
          'babel-runtime': 'npm:babel-runtime@6.18.0',
          'esutils': 'npm:esutils@2.0.2',
          'lodash': 'npm:lodash@4.17.2',
          'to-fast-properties': 'npm:to-fast-properties@1.0.2'
        }
      }
    }
  },
  packages: {
    'src': {
      'defaultExtension': 'tsx',
      'main': 'index'
    },
    'typings': {
      'defaultExtension': 'ts'
    }
  },
  transpiler: 'ts',
  typescriptOptions: {
    'sourceMap': true,
    'emitDecoratorMetadata': true,
    'experimentalDecorators': true,
    'removeComments': false,
    'noImplicitAny': false,
    'jsx': 2
  }
});

SystemJS.config({
  packageConfigPaths: [
    'npm:@*/*.json',
    'npm:*.json',
    'github:*/*.json'
  ],
  map: {
    '@types/firebase': 'npm:@types/firebase@2.4.30',
    '@types/lodash': 'npm:@types/lodash@4.14.41',
    'assert': 'npm:jspm-nodelibs-assert@0.2.0',
    'babel-polyfill': 'npm:babel-polyfill@6.16.0',
    'bcrypt-pbkdf': 'npm:bcrypt-pbkdf@1.0.0',
    'bootstrap': 'github:twbs/bootstrap@3.3.7',
    'buffer': 'npm:jspm-nodelibs-buffer@0.2.0',
    'child_process': 'npm:jspm-nodelibs-child_process@0.2.0',
    'classnames': 'npm:classnames@2.2.5',
    'constants': 'npm:jspm-nodelibs-constants@0.2.0',
    'crypto': 'npm:jspm-nodelibs-crypto@0.2.0',
    'css': 'github:systemjs/plugin-css@0.1.32',
    'dgram': 'npm:jspm-nodelibs-dgram@0.2.0',
    'dns': 'npm:jspm-nodelibs-dns@0.2.0',
    'domain': 'npm:jspm-nodelibs-domain@0.2.0',
    'ecc-jsbn': 'npm:ecc-jsbn@0.1.1',
    'es6-shim': 'npm:es6-shim@0.35.1',
    'events': 'npm:jspm-nodelibs-events@0.2.0',
    'firebase': 'npm:firebase@3.6.1',
    'firebase-tools': 'npm:firebase-tools@3.2.0',
    'fs': 'npm:jspm-nodelibs-fs@0.2.0',
    'graceful-fs': 'npm:graceful-fs@4.1.11',
    'history': 'npm:history@3.2.1',
    'http': 'npm:jspm-nodelibs-http@0.2.0',
    'https': 'npm:jspm-nodelibs-https@0.2.0',
    'immutable': 'npm:immutable@3.8.1',
    'jodid25519': 'npm:jodid25519@1.0.2',
    'jsbn': 'npm:jsbn@0.1.0',
    'lodash': 'npm:lodash@4.17.2',
    'module': 'npm:jspm-nodelibs-module@0.2.0',
    'moment': 'npm:moment@2.17.1',
    'net': 'npm:jspm-nodelibs-net@0.2.0',
    'os': 'npm:jspm-nodelibs-os@0.2.0',
    'path': 'npm:jspm-nodelibs-path@0.2.0',
    'process': 'npm:jspm-nodelibs-process@0.2.0',
    'querystring': 'npm:jspm-nodelibs-querystring@0.2.0',
    'rc-calendar': 'npm:rc-calendar@7.5.1',
    'rc-time-picker': 'npm:rc-time-picker@2.2.1',
    'react': 'npm:react@15.4.0',
    'react-bootstrap': 'npm:react-bootstrap@0.30.7',
    'react-dom': 'npm:react-dom@15.4.0',
    'react-google-maps': 'npm:react-google-maps@4.11.0',
    'react-mixin': 'npm:react-mixin@3.0.5',
    'react-redux': 'npm:react-redux@4.4.6',
    'react-router': 'npm:react-router@3.0.0',
    'react-router-scroll': 'npm:react-router-scroll@0.4.1',
    'reactfire': 'npm:reactfire@1.0.0',
    'readline': 'npm:jspm-nodelibs-readline@0.2.0',
    'redux': 'npm:redux@3.6.0',
    'redux-logger': 'npm:redux-logger@2.7.4',
    'redux-promise': 'npm:redux-promise@0.5.3',
    'redux-promise-middleware': 'npm:redux-promise-middleware@4.2.0',
    'redux-thunk': 'npm:redux-thunk@2.1.0',
    'stream': 'npm:jspm-nodelibs-stream@0.2.0',
    'string_decoder': 'npm:jspm-nodelibs-string_decoder@0.2.0',
    'tls': 'npm:jspm-nodelibs-tls@0.2.0',
    'ts': 'github:frankwallis/plugin-typescript@5.1.2',
    'tty': 'npm:jspm-nodelibs-tty@0.2.0',
    'tweetnacl': 'npm:tweetnacl@0.14.4',
    'url': 'npm:jspm-nodelibs-url@0.2.0',
    'util': 'npm:jspm-nodelibs-util@0.2.0',
    'vm': 'npm:jspm-nodelibs-vm@0.2.0',
    'zlib': 'npm:jspm-nodelibs-zlib@0.2.0'
  },
  packages: {
    'npm:react@15.4.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0',
        'object-assign': 'npm:object-assign@4.1.0',
        'fbjs': 'npm:fbjs@0.8.6'
      }
    },
    'npm:react-redux@4.4.6': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0',
        'invariant': 'npm:invariant@2.2.2',
        'hoist-non-react-statics': 'npm:hoist-non-react-statics@1.2.0',
        'lodash': 'npm:lodash@4.17.2'
      }
    },
    'npm:react-dom@15.4.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0',
        'object-assign': 'npm:object-assign@4.1.0',
        'fbjs': 'npm:fbjs@0.8.6'
      }
    },
    'npm:redux@3.6.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0',
        'symbol-observable': 'npm:symbol-observable@1.0.4',
        'lodash-es': 'npm:lodash-es@4.17.2',
        'lodash': 'npm:lodash@4.17.2'
      }
    },
    'npm:babel-polyfill@6.16.0': {
      'map': {
        'regenerator-runtime': 'npm:regenerator-runtime@0.9.6',
        'babel-runtime': 'npm:babel-runtime@6.18.0',
        'core-js': 'npm:core-js@2.4.1'
      }
    },
    'npm:warning@3.0.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0'
      }
    },
    'npm:invariant@2.2.2': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0'
      }
    },
    'npm:fbjs@0.8.6': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0',
        'object-assign': 'npm:object-assign@4.1.0',
        'core-js': 'npm:core-js@1.2.7',
        'promise': 'npm:promise@7.1.1',
        'ua-parser-js': 'npm:ua-parser-js@0.7.12',
        'isomorphic-fetch': 'npm:isomorphic-fetch@2.2.1'
      }
    },
    'npm:babel-runtime@6.18.0': {
      'map': {
        'regenerator-runtime': 'npm:regenerator-runtime@0.9.6',
        'core-js': 'npm:core-js@2.4.1'
      }
    },
    'npm:loose-envify@1.3.0': {
      'map': {
        'js-tokens': 'npm:js-tokens@2.0.0'
      }
    },
    'npm:warning@2.1.0': {
      'map': {
        'loose-envify': 'npm:loose-envify@1.3.0'
      }
    },
    'npm:promise@7.1.1': {
      'map': {
        'asap': 'npm:asap@2.0.5'
      }
    },
    'github:frankwallis/plugin-typescript@5.1.2': {
      'map': {
        'typescript': 'npm:typescript@2.1.1'
      }
    },
    'npm:isomorphic-fetch@2.2.1': {
      'map': {
        'node-fetch': 'npm:node-fetch@1.6.3',
        'whatwg-fetch': 'npm:whatwg-fetch@2.0.1'
      }
    },
    'npm:node-fetch@1.6.3': {
      'map': {
        'is-stream': 'npm:is-stream@1.1.0',
        'encoding': 'npm:encoding@0.1.12'
      }
    },
    'npm:typescript@2.1.1': {
      'map': {
        'source-map-support': 'npm:source-map-support@0.4.6'
      }
    },
    'npm:encoding@0.1.12': {
      'map': {
        'iconv-lite': 'npm:iconv-lite@0.4.15'
      }
    },
    'npm:buffer@4.9.1': {
      'map': {
        'ieee754': 'npm:ieee754@1.1.8',
        'base64-js': 'npm:base64-js@1.2.0',
        'isarray': 'npm:isarray@1.0.0'
      }
    },
    'npm:source-map-support@0.4.6': {
      'map': {
        'source-map': 'npm:source-map@0.5.6'
      }
    },
    'npm:stream-browserify@2.0.1': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'readable-stream': 'npm:readable-stream@2.2.2'
      }
    },
    'npm:readable-stream@2.2.2': {
      'map': {
        'isarray': 'npm:isarray@1.0.0',
        'inherits': 'npm:inherits@2.0.3',
        'string_decoder': 'npm:string_decoder@0.10.31',
        'buffer-shims': 'npm:buffer-shims@1.0.0',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'util-deprecate': 'npm:util-deprecate@1.0.2'
      }
    },
    'npm:crypto-browserify@3.11.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'browserify-sign': 'npm:browserify-sign@4.0.0',
        'create-ecdh': 'npm:create-ecdh@4.0.0',
        'browserify-cipher': 'npm:browserify-cipher@1.0.0',
        'create-hash': 'npm:create-hash@1.1.2',
        'create-hmac': 'npm:create-hmac@1.1.4',
        'public-encrypt': 'npm:public-encrypt@4.0.0',
        'pbkdf2': 'npm:pbkdf2@3.0.9',
        'randombytes': 'npm:randombytes@2.0.3',
        'diffie-hellman': 'npm:diffie-hellman@5.0.2'
      }
    },
    'npm:browserify-sign@4.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'create-hash': 'npm:create-hash@1.1.2',
        'create-hmac': 'npm:create-hmac@1.1.4',
        'browserify-rsa': 'npm:browserify-rsa@4.0.1',
        'parse-asn1': 'npm:parse-asn1@5.0.0',
        'bn.js': 'npm:bn.js@4.11.6',
        'elliptic': 'npm:elliptic@6.3.2'
      }
    },
    'npm:create-hash@1.1.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'cipher-base': 'npm:cipher-base@1.0.3',
        'ripemd160': 'npm:ripemd160@1.0.1',
        'sha.js': 'npm:sha.js@2.4.8'
      }
    },
    'npm:create-hmac@1.1.4': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'create-hash': 'npm:create-hash@1.1.2'
      }
    },
    'npm:public-encrypt@4.0.0': {
      'map': {
        'browserify-rsa': 'npm:browserify-rsa@4.0.1',
        'create-hash': 'npm:create-hash@1.1.2',
        'parse-asn1': 'npm:parse-asn1@5.0.0',
        'bn.js': 'npm:bn.js@4.11.6',
        'randombytes': 'npm:randombytes@2.0.3'
      }
    },
    'npm:pbkdf2@3.0.9': {
      'map': {
        'create-hmac': 'npm:create-hmac@1.1.4'
      }
    },
    'npm:create-ecdh@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'elliptic': 'npm:elliptic@6.3.2'
      }
    },
    'npm:browserify-rsa@4.0.1': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'randombytes': 'npm:randombytes@2.0.3'
      }
    },
    'npm:parse-asn1@5.0.0': {
      'map': {
        'create-hash': 'npm:create-hash@1.1.2',
        'pbkdf2': 'npm:pbkdf2@3.0.9',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0',
        'browserify-aes': 'npm:browserify-aes@1.0.6',
        'asn1.js': 'npm:asn1.js@4.9.0'
      }
    },
    'npm:browserify-cipher@1.0.0': {
      'map': {
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0',
        'browserify-des': 'npm:browserify-des@1.0.0',
        'browserify-aes': 'npm:browserify-aes@1.0.6'
      }
    },
    'npm:browserify-des@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'cipher-base': 'npm:cipher-base@1.0.3',
        'des.js': 'npm:des.js@1.0.0'
      }
    },
    'npm:cipher-base@1.0.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:elliptic@6.3.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'bn.js': 'npm:bn.js@4.11.6',
        'brorand': 'npm:brorand@1.0.6',
        'hash.js': 'npm:hash.js@1.0.3'
      }
    },
    'npm:browserify-aes@1.0.6': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'cipher-base': 'npm:cipher-base@1.0.3',
        'create-hash': 'npm:create-hash@1.1.2',
        'evp_bytestokey': 'npm:evp_bytestokey@1.0.0',
        'buffer-xor': 'npm:buffer-xor@1.0.3'
      }
    },
    'npm:evp_bytestokey@1.0.0': {
      'map': {
        'create-hash': 'npm:create-hash@1.1.2'
      }
    },
    'npm:sha.js@2.4.8': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:des.js@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:hash.js@1.0.3': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:asn1.js@4.9.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'bn.js': 'npm:bn.js@4.11.6',
        'minimalistic-assert': 'npm:minimalistic-assert@1.0.0'
      }
    },
    'npm:diffie-hellman@5.0.2': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'randombytes': 'npm:randombytes@2.0.3',
        'miller-rabin': 'npm:miller-rabin@4.0.0'
      }
    },
    'npm:miller-rabin@4.0.0': {
      'map': {
        'bn.js': 'npm:bn.js@4.11.6',
        'brorand': 'npm:brorand@1.0.6'
      }
    },
    'npm:stream-http@2.5.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'readable-stream': 'npm:readable-stream@2.2.2',
        'to-arraybuffer': 'npm:to-arraybuffer@1.0.1',
        'builtin-status-codes': 'npm:builtin-status-codes@2.0.0',
        'xtend': 'npm:xtend@4.0.1'
      }
    },
    'npm:url@0.11.0': {
      'map': {
        'querystring': 'npm:querystring@0.2.0',
        'punycode': 'npm:punycode@1.3.2'
      }
    },
    'npm:browserify-zlib@0.1.4': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.2.2',
        'pako': 'npm:pako@0.2.9'
      }
    },
    'github:twbs/bootstrap@3.3.7': {
      'map': {
        'jquery': 'npm:jquery@3.1.1'
      }
    },
    'npm:react-bootstrap@0.30.7': {
      'map': {
        'babel-runtime': 'npm:babel-runtime@6.18.0',
        'invariant': 'npm:invariant@2.2.2',
        'uncontrollable': 'npm:uncontrollable@4.0.3',
        'keycode': 'npm:keycode@2.1.7',
        'react-prop-types': 'npm:react-prop-types@0.4.0',
        'react-overlays': 'npm:react-overlays@0.6.10',
        'classnames': 'npm:classnames@2.2.5',
        'dom-helpers': 'npm:dom-helpers@2.4.0',
        'warning': 'npm:warning@3.0.0'
      }
    },
    'npm:uncontrollable@4.0.3': {
      'map': {
        'invariant': 'npm:invariant@2.2.2'
      }
    },
    'npm:react-overlays@0.6.10': {
      'map': {
        'classnames': 'npm:classnames@2.2.5',
        'dom-helpers': 'npm:dom-helpers@2.4.0',
        'react-prop-types': 'npm:react-prop-types@0.4.0',
        'warning': 'npm:warning@3.0.0'
      }
    },
    'npm:react-prop-types@0.4.0': {
      'map': {
        'warning': 'npm:warning@3.0.0'
      }
    },
    'npm:react-google-maps@4.11.0': {
      'map': {
        'can-use-dom': 'npm:can-use-dom@0.1.0',
        'marker-clusterer-plus': 'npm:marker-clusterer-plus@2.1.4',
        'google-maps-infobox': 'npm:google-maps-infobox@1.1.13',
        'lodash.isequal': 'npm:lodash.isequal@3.0.4',
        'scriptjs': 'npm:scriptjs@2.5.8',
        'react-prop-types-element-of-type': 'npm:react-prop-types-element-of-type@2.2.0',
        'invariant': 'npm:invariant@2.2.2',
        'warning': 'npm:warning@2.1.0'
      }
    },
    'npm:lodash.isequal@3.0.4': {
      'map': {
        'lodash._bindcallback': 'npm:lodash._bindcallback@3.0.1',
        'lodash._baseisequal': 'npm:lodash._baseisequal@3.0.7'
      }
    },
    'npm:lodash._baseisequal@3.0.7': {
      'map': {
        'lodash.isarray': 'npm:lodash.isarray@3.0.4',
        'lodash.istypedarray': 'npm:lodash.istypedarray@3.0.6',
        'lodash.keys': 'npm:lodash.keys@3.1.2'
      }
    },
    'npm:lodash.keys@3.1.2': {
      'map': {
        'lodash.isarray': 'npm:lodash.isarray@3.0.4',
        'lodash._getnative': 'npm:lodash._getnative@3.9.1',
        'lodash.isarguments': 'npm:lodash.isarguments@3.1.0'
      }
    },
    'npm:firebase@3.6.1': {
      'map': {
        'rsvp': 'npm:rsvp@3.2.1',
        'jsonwebtoken': 'npm:jsonwebtoken@5.7.0',
        'dom-storage': 'npm:dom-storage@2.0.2',
        'xmlhttprequest': 'npm:xmlhttprequest@1.8.0',
        'faye-websocket': 'npm:faye-websocket@0.9.3'
      }
    },
    'npm:jsonwebtoken@5.7.0': {
      'map': {
        'xtend': 'npm:xtend@4.0.1',
        'jws': 'npm:jws@3.1.4',
        'ms': 'npm:ms@0.7.2'
      }
    },
    'npm:faye-websocket@0.9.3': {
      'map': {
        'websocket-driver': 'npm:websocket-driver@0.6.5'
      }
    },
    'npm:jws@3.1.4': {
      'map': {
        'base64url': 'npm:base64url@2.0.0',
        'jwa': 'npm:jwa@1.1.5',
        'safe-buffer': 'npm:safe-buffer@5.0.1'
      }
    },
    'npm:websocket-driver@0.6.5': {
      'map': {
        'websocket-extensions': 'npm:websocket-extensions@0.1.1'
      }
    },
    'npm:react-mixin@3.0.5': {
      'map': {
        'smart-mixin': 'npm:smart-mixin@2.0.0',
        'object-assign': 'npm:object-assign@4.1.0'
      }
    },
    'npm:react-router-scroll@0.4.1': {
      'map': {
        'warning': 'npm:warning@3.0.0',
        'scroll-behavior': 'npm:scroll-behavior@0.9.1'
      }
    },
    'npm:history@3.2.1': {
      'map': {
        'warning': 'npm:warning@3.0.0',
        'invariant': 'npm:invariant@2.2.2',
        'loose-envify': 'npm:loose-envify@1.3.0',
        'query-string': 'npm:query-string@4.2.3'
      }
    },
    'npm:query-string@4.2.3': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.0',
        'strict-uri-encode': 'npm:strict-uri-encode@1.1.0'
      }
    },
    'npm:scroll-behavior@0.9.1': {
      'map': {
        'invariant': 'npm:invariant@2.2.2',
        'dom-helpers': 'npm:dom-helpers@3.1.0'
      }
    },
    'npm:react-router@3.0.0': {
      'map': {
        'history': 'npm:history@3.2.1',
        'invariant': 'npm:invariant@2.2.2',
        'warning': 'npm:warning@3.0.0',
        'loose-envify': 'npm:loose-envify@1.3.0',
        'hoist-non-react-statics': 'npm:hoist-non-react-statics@1.2.0'
      }
    },
    'npm:firebase-tools@3.2.0': {
      'map': {
        'chalk': 'npm:chalk@1.1.3',
        'JSONStream': 'npm:JSONStream@1.2.1',
        'cli-table': 'npm:cli-table@0.3.1',
        'archiver': 'npm:archiver@0.16.0',
        'commander': 'npm:commander@2.9.0',
        'configstore': 'npm:configstore@1.4.0',
        'cross-spawn': 'npm:cross-spawn@4.0.2',
        'cjson': 'npm:cjson@0.3.3',
        'csv-streamify': 'npm:csv-streamify@3.0.4',
        'fstream-ignore': 'npm:fstream-ignore@1.0.5',
        'firebase': 'npm:firebase@2.4.2',
        'exit-code': 'npm:exit-code@1.0.2',
        'jsonschema': 'npm:jsonschema@1.1.0',
        'filesize': 'npm:filesize@3.3.0',
        'portfinder': 'npm:portfinder@0.4.0',
        'inquirer': 'npm:inquirer@0.12.0',
        'open': 'npm:open@0.0.5',
        'fs-extra': 'npm:fs-extra@0.23.1',
        'progress': 'npm:progress@1.1.8',
        'tar': 'npm:tar@2.2.1',
        'didyoumean': 'npm:didyoumean@1.2.1',
        'node-uuid': 'npm:node-uuid@1.4.7',
        'request': 'npm:request@2.79.0',
        'semver': 'npm:semver@5.3.0',
        'universal-analytics': 'npm:universal-analytics@0.3.11',
        'update-notifier': 'npm:update-notifier@0.5.0',
        'jsonwebtoken': 'npm:jsonwebtoken@5.7.0',
        'winston': 'npm:winston@1.1.2',
        'rsvp': 'npm:rsvp@3.3.3',
        'lodash': 'npm:lodash@4.17.2',
        'user-home': 'npm:user-home@2.0.0',
        'tmp': 'npm:tmp@0.0.27',
        'superstatic': 'npm:superstatic@4.0.3',
        'uuid': 'npm:uuid@2.0.3'
      }
    },
    'npm:inquirer@0.12.0': {
      'map': {
        'chalk': 'npm:chalk@1.1.3',
        'lodash': 'npm:lodash@4.17.2',
        'through': 'npm:through@2.3.8',
        'ansi-escapes': 'npm:ansi-escapes@1.4.0',
        'cli-cursor': 'npm:cli-cursor@1.0.2',
        'cli-width': 'npm:cli-width@2.1.0',
        'ansi-regex': 'npm:ansi-regex@2.0.0',
        'figures': 'npm:figures@1.7.0',
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'readline2': 'npm:readline2@1.0.1',
        'string-width': 'npm:string-width@1.0.2',
        'rx-lite': 'npm:rx-lite@3.1.2',
        'run-async': 'npm:run-async@0.1.0'
      }
    },
    'npm:archiver@0.16.0': {
      'map': {
        'lodash': 'npm:lodash@3.10.1',
        'async': 'npm:async@1.4.2',
        'buffer-crc32': 'npm:buffer-crc32@0.2.13',
        'lazystream': 'npm:lazystream@0.1.0',
        'tar-stream': 'npm:tar-stream@1.2.2',
        'zip-stream': 'npm:zip-stream@0.6.0',
        'glob': 'npm:glob@5.0.15',
        'readable-stream': 'npm:readable-stream@1.0.34'
      }
    },
    'npm:JSONStream@1.2.1': {
      'map': {
        'jsonparse': 'npm:jsonparse@1.2.0',
        'through': 'npm:through@2.3.8'
      }
    },
    'npm:portfinder@0.4.0': {
      'map': {
        'async': 'npm:async@0.9.0',
        'mkdirp': 'npm:mkdirp@0.5.1'
      }
    },
    'npm:cli-table@0.3.1': {
      'map': {
        'colors': 'npm:colors@1.0.3'
      }
    },
    'npm:request@2.79.0': {
      'map': {
        'uuid': 'npm:uuid@3.0.1',
        'aws-sign2': 'npm:aws-sign2@0.6.0',
        'aws4': 'npm:aws4@1.5.0',
        'caseless': 'npm:caseless@0.11.0',
        'extend': 'npm:extend@3.0.0',
        'combined-stream': 'npm:combined-stream@1.0.5',
        'json-stringify-safe': 'npm:json-stringify-safe@5.0.1',
        'isstream': 'npm:isstream@0.1.2',
        'form-data': 'npm:form-data@2.1.2',
        'http-signature': 'npm:http-signature@1.1.1',
        'hawk': 'npm:hawk@3.1.3',
        'forever-agent': 'npm:forever-agent@0.6.1',
        'har-validator': 'npm:har-validator@2.0.6',
        'is-typedarray': 'npm:is-typedarray@1.0.0',
        'oauth-sign': 'npm:oauth-sign@0.8.2',
        'qs': 'npm:qs@6.3.0',
        'tough-cookie': 'npm:tough-cookie@2.3.2',
        'stringstream': 'npm:stringstream@0.0.5',
        'tunnel-agent': 'npm:tunnel-agent@0.4.3',
        'mime-types': 'npm:mime-types@2.1.13'
      }
    },
    'npm:commander@2.9.0': {
      'map': {
        'graceful-readlink': 'npm:graceful-readlink@1.0.1'
      }
    },
    'npm:cross-spawn@4.0.2': {
      'map': {
        'lru-cache': 'npm:lru-cache@4.0.2',
        'which': 'npm:which@1.2.12'
      }
    },
    'npm:cjson@0.3.3': {
      'map': {
        'json-parse-helpfulerror': 'npm:json-parse-helpfulerror@1.0.3'
      }
    },
    'npm:csv-streamify@3.0.4': {
      'map': {
        'through2': 'npm:through2@2.0.1'
      }
    },
    'npm:fs-extra@0.23.1': {
      'map': {
        'graceful-fs': 'npm:graceful-fs@4.1.11',
        'path-is-absolute': 'npm:path-is-absolute@1.0.1',
        'jsonfile': 'npm:jsonfile@2.4.0',
        'rimraf': 'npm:rimraf@2.5.4'
      }
    },
    'npm:tar@2.2.1': {
      'map': {
        'block-stream': 'npm:block-stream@0.0.9',
        'fstream': 'npm:fstream@1.0.10',
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:chalk@1.1.3': {
      'map': {
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'ansi-styles': 'npm:ansi-styles@2.2.1',
        'has-ansi': 'npm:has-ansi@2.0.0',
        'escape-string-regexp': 'npm:escape-string-regexp@1.0.5',
        'supports-color': 'npm:supports-color@2.0.0'
      }
    },
    'npm:configstore@1.4.0': {
      'map': {
        'graceful-fs': 'npm:graceful-fs@4.1.11',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'uuid': 'npm:uuid@2.0.3',
        'os-tmpdir': 'npm:os-tmpdir@1.0.2',
        'write-file-atomic': 'npm:write-file-atomic@1.2.0',
        'osenv': 'npm:osenv@0.1.3',
        'xdg-basedir': 'npm:xdg-basedir@2.0.0',
        'object-assign': 'npm:object-assign@4.1.0'
      }
    },
    'npm:fstream-ignore@1.0.5': {
      'map': {
        'fstream': 'npm:fstream@1.0.10',
        'inherits': 'npm:inherits@2.0.3',
        'minimatch': 'npm:minimatch@3.0.3'
      }
    },
    'npm:universal-analytics@0.3.11': {
      'map': {
        'async': 'npm:async@0.2.10',
        'request': 'npm:request@2.79.0',
        'node-uuid': 'npm:node-uuid@1.4.7',
        'underscore': 'npm:underscore@1.8.3'
      }
    },
    'npm:firebase@2.4.2': {
      'map': {
        'faye-websocket': 'npm:faye-websocket@0.11.0'
      }
    },
    'npm:update-notifier@0.5.0': {
      'map': {
        'chalk': 'npm:chalk@1.1.3',
        'configstore': 'npm:configstore@1.4.0',
        'latest-version': 'npm:latest-version@1.0.1',
        'is-npm': 'npm:is-npm@1.0.0',
        'repeating': 'npm:repeating@1.1.3',
        'string-length': 'npm:string-length@1.0.1',
        'semver-diff': 'npm:semver-diff@2.1.0'
      }
    },
    'npm:winston@1.1.2': {
      'map': {
        'async': 'npm:async@1.0.0',
        'colors': 'npm:colors@1.0.3',
        'isstream': 'npm:isstream@0.1.2',
        'stack-trace': 'npm:stack-trace@0.0.9',
        'cycle': 'npm:cycle@1.0.3',
        'pkginfo': 'npm:pkginfo@0.3.1',
        'eyes': 'npm:eyes@0.1.8'
      }
    },
    'npm:superstatic@4.0.3': {
      'map': {
        'async': 'npm:async@1.5.2',
        'fs-extra': 'npm:fs-extra@0.30.0',
        'glob': 'npm:glob@7.1.1',
        'update-notifier': 'npm:update-notifier@1.0.3',
        'lodash': 'npm:lodash@4.17.2',
        'chalk': 'npm:chalk@1.1.3',
        'mime-types': 'npm:mime-types@2.1.13',
        'rsvp': 'npm:rsvp@3.3.3',
        'minimatch': 'npm:minimatch@3.0.3',
        'string-length': 'npm:string-length@1.0.1',
        'as-array': 'npm:as-array@2.0.0',
        'basic-auth-connect': 'npm:basic-auth-connect@1.0.0',
        'char-spinner': 'npm:char-spinner@1.0.1',
        'connect-query': 'npm:connect-query@0.2.0',
        'compare-semver': 'npm:compare-semver@1.1.0',
        'glob-slasher': 'npm:glob-slasher@1.0.1',
        'destroy': 'npm:destroy@1.0.4',
        'is-url': 'npm:is-url@1.2.2',
        'home-dir': 'npm:home-dir@1.0.0',
        'on-headers': 'npm:on-headers@1.0.1',
        'join-path': 'npm:join-path@1.1.0',
        'on-finished': 'npm:on-finished@2.3.0',
        'fast-url-parser': 'npm:fast-url-parser@1.1.3',
        'try-require': 'npm:try-require@1.2.1',
        'morgan': 'npm:morgan@1.7.0',
        'nash': 'npm:nash@2.0.4',
        'compression': 'npm:compression@1.6.2',
        'router': 'npm:router@1.1.4',
        'path-to-regexp': 'npm:path-to-regexp@1.7.0',
        'connect': 'npm:connect@3.5.0'
      }
    },
    'npm:through2@2.0.1': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.0.6',
        'xtend': 'npm:xtend@4.0.1'
      }
    },
    'npm:rimraf@2.5.4': {
      'map': {
        'glob': 'npm:glob@7.1.1'
      }
    },
    'npm:tar-stream@1.2.2': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.2.2',
        'bl': 'npm:bl@1.1.2',
        'end-of-stream': 'npm:end-of-stream@1.1.0',
        'xtend': 'npm:xtend@4.0.1'
      }
    },
    'npm:glob@5.0.15': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'path-is-absolute': 'npm:path-is-absolute@1.0.1',
        'minimatch': 'npm:minimatch@3.0.3',
        'inflight': 'npm:inflight@1.0.6',
        'once': 'npm:once@1.4.0'
      }
    },
    'npm:block-stream@0.0.9': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:fstream@1.0.10': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'graceful-fs': 'npm:graceful-fs@4.1.11',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'rimraf': 'npm:rimraf@2.5.4'
      }
    },
    'npm:lazystream@0.1.0': {
      'map': {
        'readable-stream': 'npm:readable-stream@1.0.34'
      }
    },
    'npm:zip-stream@0.6.0': {
      'map': {
        'lodash': 'npm:lodash@3.10.1',
        'readable-stream': 'npm:readable-stream@1.0.34',
        'compress-commons': 'npm:compress-commons@0.3.0'
      }
    },
    'npm:strip-ansi@3.0.1': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.0.0'
      }
    },
    'npm:string-width@1.0.2': {
      'map': {
        'strip-ansi': 'npm:strip-ansi@3.0.1',
        'is-fullwidth-code-point': 'npm:is-fullwidth-code-point@1.0.0',
        'code-point-at': 'npm:code-point-at@1.1.0'
      }
    },
    'npm:form-data@2.1.2': {
      'map': {
        'combined-stream': 'npm:combined-stream@1.0.5',
        'mime-types': 'npm:mime-types@2.1.13',
        'asynckit': 'npm:asynckit@0.4.0'
      }
    },
    'npm:har-validator@2.0.6': {
      'map': {
        'chalk': 'npm:chalk@1.1.3',
        'commander': 'npm:commander@2.9.0',
        'pinkie-promise': 'npm:pinkie-promise@2.0.1',
        'is-my-json-valid': 'npm:is-my-json-valid@2.15.0'
      }
    },
    'npm:tmp@0.0.27': {
      'map': {
        'os-tmpdir': 'npm:os-tmpdir@1.0.2'
      }
    },
    'npm:figures@1.7.0': {
      'map': {
        'escape-string-regexp': 'npm:escape-string-regexp@1.0.5',
        'object-assign': 'npm:object-assign@4.1.0'
      }
    },
    'npm:readable-stream@1.0.34': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'stream-browserify': 'npm:stream-browserify@1.0.0',
        'isarray': 'npm:isarray@0.0.1',
        'string_decoder': 'npm:string_decoder@0.10.31',
        'core-util-is': 'npm:core-util-is@1.0.2'
      }
    },
    'npm:update-notifier@1.0.3': {
      'map': {
        'configstore': 'npm:configstore@2.1.0',
        'latest-version': 'npm:latest-version@2.0.0',
        'is-npm': 'npm:is-npm@1.0.0',
        'semver-diff': 'npm:semver-diff@2.1.0',
        'chalk': 'npm:chalk@1.1.3',
        'xdg-basedir': 'npm:xdg-basedir@2.0.0',
        'lazy-req': 'npm:lazy-req@1.1.0',
        'boxen': 'npm:boxen@0.6.0'
      }
    },
    'npm:user-home@2.0.0': {
      'map': {
        'os-homedir': 'npm:os-homedir@1.0.2'
      }
    },
    'npm:glob@7.1.1': {
      'map': {
        'inflight': 'npm:inflight@1.0.6',
        'minimatch': 'npm:minimatch@3.0.3',
        'path-is-absolute': 'npm:path-is-absolute@1.0.1',
        'once': 'npm:once@1.4.0',
        'fs.realpath': 'npm:fs.realpath@1.0.0',
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:json-parse-helpfulerror@1.0.3': {
      'map': {
        'jju': 'npm:jju@1.3.0'
      }
    },
    'npm:mkdirp@0.5.1': {
      'map': {
        'minimist': 'npm:minimist@0.0.8'
      }
    },
    'npm:readline2@1.0.1': {
      'map': {
        'is-fullwidth-code-point': 'npm:is-fullwidth-code-point@1.0.0',
        'mute-stream': 'npm:mute-stream@0.0.5',
        'code-point-at': 'npm:code-point-at@1.1.0'
      }
    },
    'npm:lru-cache@4.0.2': {
      'map': {
        'pseudomap': 'npm:pseudomap@1.0.2',
        'yallist': 'npm:yallist@2.0.0'
      }
    },
    'npm:cli-cursor@1.0.2': {
      'map': {
        'restore-cursor': 'npm:restore-cursor@1.0.1'
      }
    },
    'npm:fs-extra@0.30.0': {
      'map': {
        'graceful-fs': 'npm:graceful-fs@4.1.11',
        'jsonfile': 'npm:jsonfile@2.4.0',
        'path-is-absolute': 'npm:path-is-absolute@1.0.1',
        'rimraf': 'npm:rimraf@2.5.4',
        'klaw': 'npm:klaw@1.3.1'
      }
    },
    'npm:has-ansi@2.0.0': {
      'map': {
        'ansi-regex': 'npm:ansi-regex@2.0.0'
      }
    },
    'npm:run-async@0.1.0': {
      'map': {
        'once': 'npm:once@1.4.0'
      }
    },
    'npm:which@1.2.12': {
      'map': {
        'isexe': 'npm:isexe@1.1.2'
      }
    },
    'npm:write-file-atomic@1.2.0': {
      'map': {
        'graceful-fs': 'npm:graceful-fs@4.1.11',
        'imurmurhash': 'npm:imurmurhash@0.1.4',
        'slide': 'npm:slide@1.1.6'
      }
    },
    'npm:osenv@0.1.3': {
      'map': {
        'os-homedir': 'npm:os-homedir@1.0.2',
        'os-tmpdir': 'npm:os-tmpdir@1.0.2'
      }
    },
    'npm:xdg-basedir@2.0.0': {
      'map': {
        'os-homedir': 'npm:os-homedir@1.0.2'
      }
    },
    'npm:tough-cookie@2.3.2': {
      'map': {
        'punycode': 'npm:punycode@1.4.1'
      }
    },
    'npm:faye-websocket@0.11.0': {
      'map': {
        'websocket-driver': 'npm:websocket-driver@0.6.5'
      }
    },
    'npm:configstore@2.1.0': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.0',
        'graceful-fs': 'npm:graceful-fs@4.1.11',
        'mkdirp': 'npm:mkdirp@0.5.1',
        'os-tmpdir': 'npm:os-tmpdir@1.0.2',
        'osenv': 'npm:osenv@0.1.3',
        'uuid': 'npm:uuid@2.0.3',
        'write-file-atomic': 'npm:write-file-atomic@1.2.0',
        'xdg-basedir': 'npm:xdg-basedir@2.0.0',
        'dot-prop': 'npm:dot-prop@3.0.0'
      }
    },
    'npm:end-of-stream@1.1.0': {
      'map': {
        'once': 'npm:once@1.3.3'
      }
    },
    'npm:combined-stream@1.0.5': {
      'map': {
        'delayed-stream': 'npm:delayed-stream@1.0.0'
      }
    },
    'npm:http-signature@1.1.1': {
      'map': {
        'assert-plus': 'npm:assert-plus@0.2.0',
        'jsprim': 'npm:jsprim@1.3.1',
        'sshpk': 'npm:sshpk@1.10.1'
      }
    },
    'npm:string-length@1.0.1': {
      'map': {
        'strip-ansi': 'npm:strip-ansi@3.0.1'
      }
    },
    'npm:semver-diff@2.1.0': {
      'map': {
        'semver': 'npm:semver@5.3.0'
      }
    },
    'npm:bl@1.1.2': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.0.6'
      }
    },
    'npm:inflight@1.0.6': {
      'map': {
        'once': 'npm:once@1.4.0',
        'wrappy': 'npm:wrappy@1.0.2'
      }
    },
    'npm:compress-commons@0.3.0': {
      'map': {
        'buffer-crc32': 'npm:buffer-crc32@0.2.13',
        'readable-stream': 'npm:readable-stream@1.0.34',
        'node-int64': 'npm:node-int64@0.4.0',
        'crc32-stream': 'npm:crc32-stream@0.3.4'
      }
    },
    'npm:readable-stream@2.0.6': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'isarray': 'npm:isarray@1.0.0',
        'string_decoder': 'npm:string_decoder@0.10.31',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'process-nextick-args': 'npm:process-nextick-args@1.0.7',
        'util-deprecate': 'npm:util-deprecate@1.0.2'
      }
    },
    'npm:connect-query@0.2.0': {
      'map': {
        'qs': 'npm:qs@1.1.0'
      }
    },
    'npm:hawk@3.1.3': {
      'map': {
        'cryptiles': 'npm:cryptiles@2.0.5',
        'sntp': 'npm:sntp@1.0.9',
        'hoek': 'npm:hoek@2.16.3',
        'boom': 'npm:boom@2.10.1'
      }
    },
    'npm:minimatch@3.0.3': {
      'map': {
        'brace-expansion': 'npm:brace-expansion@1.1.6'
      }
    },
    'npm:compare-semver@1.1.0': {
      'map': {
        'semver': 'npm:semver@5.3.0'
      }
    },
    'npm:join-path@1.1.0': {
      'map': {
        'as-array': 'npm:as-array@2.0.0',
        'is-url': 'npm:is-url@1.2.2',
        'url-join': 'npm:url-join@0.0.1'
      }
    },
    'npm:stream-browserify@1.0.0': {
      'map': {
        'inherits': 'npm:inherits@2.0.3',
        'readable-stream': 'npm:readable-stream@1.1.14'
      }
    },
    'npm:repeating@1.1.3': {
      'map': {
        'is-finite': 'npm:is-finite@1.0.2'
      }
    },
    'npm:latest-version@1.0.1': {
      'map': {
        'package-json': 'npm:package-json@1.2.0'
      }
    },
    'npm:latest-version@2.0.0': {
      'map': {
        'package-json': 'npm:package-json@2.4.0'
      }
    },
    'npm:once@1.4.0': {
      'map': {
        'wrappy': 'npm:wrappy@1.0.2'
      }
    },
    'npm:once@1.3.3': {
      'map': {
        'wrappy': 'npm:wrappy@1.0.2'
      }
    },
    'npm:fast-url-parser@1.1.3': {
      'map': {
        'punycode': 'npm:punycode@1.4.1'
      }
    },
    'npm:is-fullwidth-code-point@1.0.0': {
      'map': {
        'number-is-nan': 'npm:number-is-nan@1.0.1'
      }
    },
    'npm:nash@2.0.4': {
      'map': {
        'minimist': 'npm:minimist@1.2.0',
        'async': 'npm:async@1.5.2',
        'lodash': 'npm:lodash@3.10.1',
        'flat-arguments': 'npm:flat-arguments@1.0.2'
      }
    },
    'npm:restore-cursor@1.0.1': {
      'map': {
        'exit-hook': 'npm:exit-hook@1.1.1',
        'onetime': 'npm:onetime@1.1.0'
      }
    },
    'npm:morgan@1.7.0': {
      'map': {
        'on-finished': 'npm:on-finished@2.3.0',
        'on-headers': 'npm:on-headers@1.0.1',
        'basic-auth': 'npm:basic-auth@1.0.4',
        'depd': 'npm:depd@1.1.0',
        'debug': 'npm:debug@2.2.0'
      }
    },
    'npm:router@1.1.4': {
      'map': {
        'path-to-regexp': 'npm:path-to-regexp@0.1.7',
        'setprototypeof': 'npm:setprototypeof@1.0.0',
        'array-flatten': 'npm:array-flatten@2.0.0',
        'utils-merge': 'npm:utils-merge@1.0.0',
        'parseurl': 'npm:parseurl@1.3.1',
        'methods': 'npm:methods@1.1.2',
        'debug': 'npm:debug@2.2.0'
      }
    },
    'npm:readable-stream@1.1.14': {
      'map': {
        'string_decoder': 'npm:string_decoder@0.10.31',
        'inherits': 'npm:inherits@2.0.3',
        'core-util-is': 'npm:core-util-is@1.0.2',
        'isarray': 'npm:isarray@0.0.1',
        'stream-browserify': 'npm:stream-browserify@1.0.0'
      }
    },
    'npm:compression@1.6.2': {
      'map': {
        'on-headers': 'npm:on-headers@1.0.1',
        'vary': 'npm:vary@1.1.0',
        'bytes': 'npm:bytes@2.3.0',
        'compressible': 'npm:compressible@2.0.9',
        'debug': 'npm:debug@2.2.0',
        'accepts': 'npm:accepts@1.3.3'
      }
    },
    'npm:mime-types@2.1.13': {
      'map': {
        'mime-db': 'npm:mime-db@1.25.0'
      }
    },
    'npm:path-to-regexp@1.7.0': {
      'map': {
        'isarray': 'npm:isarray@0.0.1'
      }
    },
    'npm:is-finite@1.0.2': {
      'map': {
        'number-is-nan': 'npm:number-is-nan@1.0.1'
      }
    },
    'npm:package-json@2.4.0': {
      'map': {
        'semver': 'npm:semver@5.3.0',
        'registry-url': 'npm:registry-url@3.1.0',
        'registry-auth-token': 'npm:registry-auth-token@3.1.0',
        'got': 'npm:got@5.7.1'
      }
    },
    'npm:glob-slasher@1.0.1': {
      'map': {
        'toxic': 'npm:toxic@1.0.0',
        'glob-slash': 'npm:glob-slash@1.0.0',
        'lodash.isobject': 'npm:lodash.isobject@2.4.1'
      }
    },
    'npm:boxen@0.6.0': {
      'map': {
        'repeating': 'npm:repeating@2.0.1',
        'chalk': 'npm:chalk@1.1.3',
        'object-assign': 'npm:object-assign@4.1.0',
        'string-width': 'npm:string-width@1.0.2',
        'cli-boxes': 'npm:cli-boxes@1.0.0',
        'ansi-align': 'npm:ansi-align@1.1.0',
        'widest-line': 'npm:widest-line@1.0.0',
        'camelcase': 'npm:camelcase@2.1.1',
        'filled-array': 'npm:filled-array@1.1.0'
      }
    },
    'npm:sshpk@1.10.1': {
      'map': {
        'assert-plus': 'npm:assert-plus@1.0.0',
        'asn1': 'npm:asn1@0.2.3',
        'getpass': 'npm:getpass@0.1.6',
        'dashdash': 'npm:dashdash@1.14.1'
      }
    },
    'npm:is-my-json-valid@2.15.0': {
      'map': {
        'xtend': 'npm:xtend@4.0.1',
        'generate-object-property': 'npm:generate-object-property@1.2.0',
        'generate-function': 'npm:generate-function@2.0.0',
        'jsonpointer': 'npm:jsonpointer@4.0.0'
      }
    },
    'npm:crc32-stream@0.3.4': {
      'map': {
        'readable-stream': 'npm:readable-stream@1.0.34',
        'buffer-crc32': 'npm:buffer-crc32@0.2.13'
      }
    },
    'npm:sntp@1.0.9': {
      'map': {
        'hoek': 'npm:hoek@2.16.3'
      }
    },
    'npm:brace-expansion@1.1.6': {
      'map': {
        'balanced-match': 'npm:balanced-match@0.4.2',
        'concat-map': 'npm:concat-map@0.0.1'
      }
    },
    'npm:cryptiles@2.0.5': {
      'map': {
        'boom': 'npm:boom@2.10.1'
      }
    },
    'npm:toxic@1.0.0': {
      'map': {
        'lodash': 'npm:lodash@2.4.2'
      }
    },
    'npm:on-finished@2.3.0': {
      'map': {
        'ee-first': 'npm:ee-first@1.1.1'
      }
    },
    'npm:pinkie-promise@2.0.1': {
      'map': {
        'pinkie': 'npm:pinkie@2.0.4'
      }
    },
    'npm:repeating@2.0.1': {
      'map': {
        'is-finite': 'npm:is-finite@1.0.2'
      }
    },
    'npm:boom@2.10.1': {
      'map': {
        'hoek': 'npm:hoek@2.16.3'
      }
    },
    'npm:jsprim@1.3.1': {
      'map': {
        'extsprintf': 'npm:extsprintf@1.0.2',
        'json-schema': 'npm:json-schema@0.2.3',
        'verror': 'npm:verror@1.3.6'
      }
    },
    'npm:package-json@1.2.0': {
      'map': {
        'registry-url': 'npm:registry-url@3.1.0',
        'got': 'npm:got@3.3.1'
      }
    },
    'npm:flat-arguments@1.0.2': {
      'map': {
        'array-flatten': 'npm:array-flatten@1.1.1',
        'as-array': 'npm:as-array@1.0.0',
        'lodash.isobject': 'npm:lodash.isobject@3.0.2',
        'lodash.isarguments': 'npm:lodash.isarguments@3.1.0'
      }
    },
    'npm:dot-prop@3.0.0': {
      'map': {
        'is-obj': 'npm:is-obj@1.0.1'
      }
    },
    'npm:compressible@2.0.9': {
      'map': {
        'mime-db': 'npm:mime-db@1.25.0'
      }
    },
    'npm:as-array@1.0.0': {
      'map': {
        'lodash.isobject': 'npm:lodash.isobject@2.4.1',
        'lodash.isarguments': 'npm:lodash.isarguments@2.4.1',
        'lodash.values': 'npm:lodash.values@2.4.1'
      }
    },
    'npm:ansi-align@1.1.0': {
      'map': {
        'string-width': 'npm:string-width@1.0.2'
      }
    },
    'npm:widest-line@1.0.0': {
      'map': {
        'string-width': 'npm:string-width@1.0.2'
      }
    },
    'npm:accepts@1.3.3': {
      'map': {
        'mime-types': 'npm:mime-types@2.1.13',
        'negotiator': 'npm:negotiator@0.6.1'
      }
    },
    'npm:verror@1.3.6': {
      'map': {
        'extsprintf': 'npm:extsprintf@1.0.2'
      }
    },
    'npm:bcrypt-pbkdf@1.0.0': {
      'map': {
        'tweetnacl': 'npm:tweetnacl@0.14.4'
      }
    },
    'npm:ecc-jsbn@0.1.1': {
      'map': {
        'jsbn': 'npm:jsbn@0.1.0'
      }
    },
    'npm:getpass@0.1.6': {
      'map': {
        'assert-plus': 'npm:assert-plus@1.0.0'
      }
    },
    'npm:jodid25519@1.0.2': {
      'map': {
        'jsbn': 'npm:jsbn@0.1.0'
      }
    },
    'npm:debug@2.2.0': {
      'map': {
        'ms': 'npm:ms@0.7.1'
      }
    },
    'npm:got@3.3.1': {
      'map': {
        'object-assign': 'npm:object-assign@3.0.0',
        'is-redirect': 'npm:is-redirect@1.0.0',
        'infinity-agent': 'npm:infinity-agent@2.0.3',
        'prepend-http': 'npm:prepend-http@1.0.4',
        'nested-error-stacks': 'npm:nested-error-stacks@1.0.2',
        'lowercase-keys': 'npm:lowercase-keys@1.0.0',
        'duplexify': 'npm:duplexify@3.5.0',
        'read-all-stream': 'npm:read-all-stream@3.1.0',
        'timed-out': 'npm:timed-out@2.0.0',
        'is-stream': 'npm:is-stream@1.1.0'
      }
    },
    'npm:lodash.isobject@2.4.1': {
      'map': {
        'lodash._objecttypes': 'npm:lodash._objecttypes@2.4.1'
      }
    },
    'npm:got@5.7.1': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.0',
        'readable-stream': 'npm:readable-stream@2.2.2',
        'pinkie-promise': 'npm:pinkie-promise@2.0.1',
        'is-redirect': 'npm:is-redirect@1.0.0',
        'lowercase-keys': 'npm:lowercase-keys@1.0.0',
        'read-all-stream': 'npm:read-all-stream@3.1.0',
        'create-error-class': 'npm:create-error-class@3.0.2',
        'timed-out': 'npm:timed-out@3.0.0',
        'duplexer2': 'npm:duplexer2@0.1.4',
        'node-status-codes': 'npm:node-status-codes@1.0.0',
        'is-retry-allowed': 'npm:is-retry-allowed@1.1.0',
        'parse-json': 'npm:parse-json@2.2.0',
        'url-parse-lax': 'npm:url-parse-lax@1.0.0',
        'is-stream': 'npm:is-stream@1.1.0',
        'unzip-response': 'npm:unzip-response@1.0.2',
        'node-unzip-response': 'npm:unzip-response@1.0.2'
      }
    },
    'npm:dashdash@1.14.1': {
      'map': {
        'assert-plus': 'npm:assert-plus@1.0.0'
      }
    },
    'npm:jwa@1.1.5': {
      'map': {
        'base64url': 'npm:base64url@2.0.0',
        'safe-buffer': 'npm:safe-buffer@5.0.1',
        'buffer-equal-constant-time': 'npm:buffer-equal-constant-time@1.0.1',
        'ecdsa-sig-formatter': 'npm:ecdsa-sig-formatter@1.0.9'
      }
    },
    'npm:registry-url@3.1.0': {
      'map': {
        'rc': 'npm:rc@1.1.6'
      }
    },
    'npm:registry-auth-token@3.1.0': {
      'map': {
        'rc': 'npm:rc@1.1.6'
      }
    },
    'npm:generate-object-property@1.2.0': {
      'map': {
        'is-property': 'npm:is-property@1.0.2'
      }
    },
    'npm:rc@1.1.6': {
      'map': {
        'minimist': 'npm:minimist@1.2.0',
        'ini': 'npm:ini@1.3.4',
        'strip-json-comments': 'npm:strip-json-comments@1.0.4',
        'deep-extend': 'npm:deep-extend@0.4.1'
      }
    },
    'npm:connect@3.5.0': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'parseurl': 'npm:parseurl@1.3.1',
        'utils-merge': 'npm:utils-merge@1.0.0',
        'finalhandler': 'npm:finalhandler@0.5.0'
      }
    },
    'npm:nested-error-stacks@1.0.2': {
      'map': {
        'inherits': 'npm:inherits@2.0.3'
      }
    },
    'npm:duplexify@3.5.0': {
      'map': {
        'end-of-stream': 'npm:end-of-stream@1.0.0',
        'inherits': 'npm:inherits@2.0.3',
        'readable-stream': 'npm:readable-stream@2.2.2',
        'stream-shift': 'npm:stream-shift@1.0.0'
      }
    },
    'npm:read-all-stream@3.1.0': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.2.2',
        'pinkie-promise': 'npm:pinkie-promise@2.0.1'
      }
    },
    'npm:lodash.values@2.4.1': {
      'map': {
        'lodash.keys': 'npm:lodash.keys@2.4.1'
      }
    },
    'npm:duplexer2@0.1.4': {
      'map': {
        'readable-stream': 'npm:readable-stream@2.2.2'
      }
    },
    'npm:end-of-stream@1.0.0': {
      'map': {
        'once': 'npm:once@1.3.3'
      }
    },
    'npm:ecdsa-sig-formatter@1.0.9': {
      'map': {
        'base64url': 'npm:base64url@2.0.0',
        'safe-buffer': 'npm:safe-buffer@5.0.1'
      }
    },
    'npm:url-parse-lax@1.0.0': {
      'map': {
        'prepend-http': 'npm:prepend-http@1.0.4'
      }
    },
    'npm:lodash.keys@2.4.1': {
      'map': {
        'lodash.isobject': 'npm:lodash.isobject@2.4.1',
        'lodash._isnative': 'npm:lodash._isnative@2.4.1',
        'lodash._shimkeys': 'npm:lodash._shimkeys@2.4.1'
      }
    },
    'npm:create-error-class@3.0.2': {
      'map': {
        'capture-stack-trace': 'npm:capture-stack-trace@1.0.0'
      }
    },
    'npm:finalhandler@0.5.0': {
      'map': {
        'debug': 'npm:debug@2.2.0',
        'on-finished': 'npm:on-finished@2.3.0',
        'unpipe': 'npm:unpipe@1.0.0',
        'statuses': 'npm:statuses@1.3.1',
        'escape-html': 'npm:escape-html@1.0.3'
      }
    },
    'npm:parse-json@2.2.0': {
      'map': {
        'error-ex': 'npm:error-ex@1.3.0'
      }
    },
    'npm:lodash._shimkeys@2.4.1': {
      'map': {
        'lodash._objecttypes': 'npm:lodash._objecttypes@2.4.1'
      }
    },
    'npm:error-ex@1.3.0': {
      'map': {
        'is-arrayish': 'npm:is-arrayish@0.2.1'
      }
    },
    'npm:jspm-nodelibs-buffer@0.2.0': {
      'map': {
        'buffer-browserify': 'npm:buffer@4.9.1'
      }
    },
    'npm:jspm-nodelibs-domain@0.2.0': {
      'map': {
        'domain-browserify': 'npm:domain-browser@1.1.7'
      }
    },
    'npm:jspm-nodelibs-crypto@0.2.0': {
      'map': {
        'crypto-browserify': 'npm:crypto-browserify@3.11.0'
      }
    },
    'npm:jspm-nodelibs-http@0.2.0': {
      'map': {
        'http-browserify': 'npm:stream-http@2.5.0'
      }
    },
    'npm:jspm-nodelibs-os@0.2.0': {
      'map': {
        'os-browserify': 'npm:os-browserify@0.2.1'
      }
    },
    'npm:jspm-nodelibs-stream@0.2.0': {
      'map': {
        'stream-browserify': 'npm:stream-browserify@2.0.1'
      }
    },
    'npm:jspm-nodelibs-url@0.2.0': {
      'map': {
        'url-browserify': 'npm:url@0.11.0'
      }
    },
    'npm:jspm-nodelibs-string_decoder@0.2.0': {
      'map': {
        'string_decoder-browserify': 'npm:string_decoder@0.10.31'
      }
    },
    'npm:jspm-nodelibs-zlib@0.2.0': {
      'map': {
        'zlib-browserify': 'npm:browserify-zlib@0.1.4'
      }
    },
    'npm:rc-calendar@7.5.1': {
      'map': {
        'classnames': 'npm:classnames@2.2.5',
        'rc-util': 'npm:rc-util@3.4.1',
        'rc-trigger': 'npm:rc-trigger@1.8.1',
        'babel-runtime': 'npm:babel-runtime@6.20.0',
        'moment': 'npm:moment@2.17.1'
      }
    },
    'npm:rc-util@3.4.1': {
      'map': {
        'classnames': 'npm:classnames@2.2.5',
        'shallowequal': 'npm:shallowequal@0.2.2',
        'add-dom-event-listener': 'npm:add-dom-event-listener@1.0.1'
      }
    },
    'npm:rc-trigger@1.8.1': {
      'map': {
        'rc-util': 'npm:rc-util@4.0.2',
        'babel-runtime': 'npm:babel-runtime@6.20.0',
        'rc-align': 'npm:rc-align@2.3.3',
        'rc-animate': 'npm:rc-animate@2.3.1'
      }
    },
    'npm:rc-util@4.0.2': {
      'map': {
        'shallowequal': 'npm:shallowequal@0.2.2',
        'add-dom-event-listener': 'npm:add-dom-event-listener@1.0.1'
      }
    },
    'npm:rc-align@2.3.3': {
      'map': {
        'rc-util': 'npm:rc-util@4.0.2',
        'dom-align': 'npm:dom-align@1.5.2'
      }
    },
    'npm:babel-runtime@6.20.0': {
      'map': {
        'regenerator-runtime': 'npm:regenerator-runtime@0.10.1',
        'core-js': 'npm:core-js@2.4.1'
      }
    },
    'npm:shallowequal@0.2.2': {
      'map': {
        'lodash.keys': 'npm:lodash.keys@3.1.2'
      }
    },
    'npm:rc-animate@2.3.1': {
      'map': {
        'css-animation': 'npm:css-animation@1.3.0'
      }
    },
    'npm:add-dom-event-listener@1.0.1': {
      'map': {
        'object-assign': 'npm:object-assign@4.1.0'
      }
    },
    'npm:css-animation@1.3.0': {
      'map': {
        'component-classes': 'npm:component-classes@1.2.6'
      }
    },
    'npm:component-classes@1.2.6': {
      'map': {
        'component-indexof': 'npm:component-indexof@0.0.3'
      }
    },
    'npm:rc-time-picker@2.2.1': {
      'map': {
        'rc-trigger': 'npm:rc-trigger@1.8.1',
        'moment': 'npm:moment@2.17.1',
        'babel-runtime': 'npm:babel-runtime@6.20.0',
        'classnames': 'npm:classnames@2.2.5'
      }
    },
    'npm:redux-logger@2.7.4': {
      'map': {
        'deep-diff': 'npm:deep-diff@0.3.4'
      }
    },
    'npm:redux-promise@0.5.3': {
      'map': {
        'flux-standard-action': 'npm:flux-standard-action@0.6.1'
      }
    },
    'npm:flux-standard-action@0.6.1': {
      'map': {
        'lodash.isplainobject': 'npm:lodash.isplainobject@3.2.0'
      }
    },
    'npm:lodash.isplainobject@3.2.0': {
      'map': {
        'lodash.isarguments': 'npm:lodash.isarguments@3.1.0',
        'lodash.keysin': 'npm:lodash.keysin@3.0.8',
        'lodash._basefor': 'npm:lodash._basefor@3.0.3'
      }
    },
    'npm:lodash.keysin@3.0.8': {
      'map': {
        'lodash.isarguments': 'npm:lodash.isarguments@3.1.0',
        'lodash.isarray': 'npm:lodash.isarray@3.0.4'
      }
    }
  }
});
