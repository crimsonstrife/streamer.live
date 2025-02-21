(() => {
  const Ci = Object.create
  const he = Object.defineProperty
  const Ti = Object.getOwnPropertyDescriptor
  const Pi = Object.getOwnPropertyNames
  const xi = Object.getPrototypeOf
  const Oi = Object.prototype.hasOwnProperty
  const Ai = (l, h) => () => (
    h || l((h = { exports: {} }).exports, h), h.exports
  )
  const Ei = (l, h, a, c) => {
    if ((h && typeof h === 'object') || typeof h === 'function') {
      for (const s of Pi(h)) {
        !Oi.call(l, s) &&
                    s !== a &&
                    he(l, s, {
                      get: () => h[s],
                      enumerable: !(c = Ti(h, s)) || c.enumerable
                    })
      }
    }
    return l
  }
  const Li = (l, h, a) => (
    (a = l != null ? Ci(xi(l)) : {}),
    Ei(
      h || !l || !l.__esModule
        ? he(a, 'default', { value: l, enumerable: !0 })
        : a,
      l
    )
  )
  const me = Ai((vt, It) => {
    (function (h, a) {
      typeof vt === 'object' && typeof It === 'object'
        ? (It.exports = a())
        : typeof define === 'function' && define.amd
          ? define([], a)
          : typeof vt === 'object'
            ? (vt.Pusher = a())
            : (h.Pusher = a())
    })(window, function () {
      return (function (l) {
        const h = {}
        function a (c) {
          if (h[c]) return h[c].exports
          const s = (h[c] = { i: c, l: !1, exports: {} })
          return (
            l[c].call(s.exports, s, s.exports, a),
            (s.l = !0),
            s.exports
          )
        }
        return (
          (a.m = l),
          (a.c = h),
          (a.d = function (c, s, f) {
            a.o(c, s) ||
                            Object.defineProperty(c, s, {
                              enumerable: !0,
                              get: f
                            })
          }),
          (a.r = function (c) {
            typeof Symbol < 'u' &&
                            Symbol.toStringTag &&
                            Object.defineProperty(c, Symbol.toStringTag, {
                              value: 'Module'
                            }),
            Object.defineProperty(c, '__esModule', {
              value: !0
            })
          }),
          (a.t = function (c, s) {
            if (
              (s & 1 && (c = a(c)),
              s & 8 ||
                                (s & 4 &&
                                    typeof c === 'object' &&
                                    c &&
                                    c.__esModule))
            ) {
              return c
            }
            const f = Object.create(null)
            if (
              (a.r(f),
              Object.defineProperty(f, 'default', {
                enumerable: !0,
                value: c
              }),
              s & 2 && typeof c !== 'string')
            ) {
              for (const d in c) {
                a.d(
                  f,
                  d,
                  function (N) {
                    return c[N]
                  }.bind(null, d)
                )
              }
            }
            return f
          }),
          (a.n = function (c) {
            const s =
                            c && c.__esModule
                              ? function () {
                                return c.default
                              }
                              : function () {
                                return c
                              }
            return a.d(s, 'a', s), s
          }),
          (a.o = function (c, s) {
            return Object.prototype.hasOwnProperty.call(c, s)
          }),
          (a.p = ''),
          a((a.s = 2))
        )
      })([
        function (l, h, a) {
          'use strict'
          const c =
                        (this && this.__extends) ||
                        (function () {
                          let b = function (v, y) {
                            return (
                              (b =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (w, O) {
                                              w.__proto__ = O
                                            }) ||
                                        function (w, O) {
                                          for (const I in O) {
                                            O.hasOwnProperty(I) &&
                                                    (w[I] = O[I])
                                          }
                                        }),
                              b(v, y)
                            )
                          }
                          return function (v, y) {
                            b(v, y)
                            function w () {
                              this.constructor = v
                            }
                            v.prototype =
                                    y === null
                                      ? Object.create(y)
                                      : ((w.prototype = y.prototype),
                                        new w())
                          }
                        })()
          Object.defineProperty(h, '__esModule', { value: !0 })
          const s = 256
          const f = (function () {
            function b (v) {
              v === void 0 && (v = '='),
              (this._paddingCharacter = v)
            }
            return (
              (b.prototype.encodedLength = function (v) {
                return this._paddingCharacter
                  ? (((v + 2) / 3) * 4) | 0
                  : ((v * 8 + 5) / 6) | 0
              }),
              (b.prototype.encode = function (v) {
                for (
                  var y = '', w = 0;
                  w < v.length - 2;
                  w += 3
                ) {
                  var O =
                                        (v[w] << 16) |
                                        (v[w + 1] << 8) |
                                        v[w + 2];
                  (y += this._encodeByte(
                    (O >>> (3 * 6)) & 63
                  )),
                  (y += this._encodeByte(
                    (O >>> (2 * 6)) & 63
                  )),
                  (y += this._encodeByte(
                    (O >>> (1 * 6)) & 63
                  )),
                  (y += this._encodeByte(
                    (O >>> (0 * 6)) & 63
                  ))
                }
                const I = v.length - w
                if (I > 0) {
                  var O =
                                        (v[w] << 16) |
                                        (I === 2 ? v[w + 1] << 8 : 0);
                  (y += this._encodeByte(
                    (O >>> (3 * 6)) & 63
                  )),
                  (y += this._encodeByte(
                    (O >>> (2 * 6)) & 63
                  )),
                  I === 2
                    ? (y += this._encodeByte(
                        (O >>> (1 * 6)) & 63
                      ))
                    : (y +=
                                                  this._paddingCharacter || ''),
                  (y += this._paddingCharacter || '')
                }
                return y
              }),
              (b.prototype.maxDecodedLength = function (v) {
                return this._paddingCharacter
                  ? ((v / 4) * 3) | 0
                  : ((v * 6 + 7) / 8) | 0
              }),
              (b.prototype.decodedLength = function (v) {
                return this.maxDecodedLength(
                  v.length - this._getPaddingLength(v)
                )
              }),
              (b.prototype.decode = function (v) {
                if (v.length === 0) {
                  return new Uint8Array(0)
                }
                for (
                  var y = this._getPaddingLength(v),
                    w = v.length - y,
                    O = new Uint8Array(
                      this.maxDecodedLength(w)
                    ),
                    I = 0,
                    q = 0,
                    M = 0,
                    J = 0,
                    F = 0,
                    z = 0,
                    B = 0;
                  q < w - 4;
                  q += 4
                ) {
                  (J = this._decodeChar(v.charCodeAt(q + 0))),
                  (F = this._decodeChar(
                    v.charCodeAt(q + 1)
                  )),
                  (z = this._decodeChar(
                    v.charCodeAt(q + 2)
                  )),
                  (B = this._decodeChar(
                    v.charCodeAt(q + 3)
                  )),
                  (O[I++] = (J << 2) | (F >>> 4)),
                  (O[I++] = (F << 4) | (z >>> 2)),
                  (O[I++] = (z << 6) | B),
                  (M |= J & s),
                  (M |= F & s),
                  (M |= z & s),
                  (M |= B & s)
                }
                if (
                  (q < w - 1 &&
                                        ((J = this._decodeChar(
                                          v.charCodeAt(q)
                                        )),
                                        (F = this._decodeChar(
                                          v.charCodeAt(q + 1)
                                        )),
                                        (O[I++] = (J << 2) | (F >>> 4)),
                                        (M |= J & s),
                                        (M |= F & s)),
                  q < w - 2 &&
                                        ((z = this._decodeChar(
                                          v.charCodeAt(q + 2)
                                        )),
                                        (O[I++] = (F << 4) | (z >>> 2)),
                                        (M |= z & s)),
                  q < w - 3 &&
                                        ((B = this._decodeChar(
                                          v.charCodeAt(q + 3)
                                        )),
                                        (O[I++] = (z << 6) | B),
                                        (M |= B & s)),
                  M !== 0)
                ) {
                  throw new Error(
                    'Base64Coder: incorrect characters for decoding'
                  )
                }
                return O
              }),
              (b.prototype._encodeByte = function (v) {
                let y = v
                return (
                  (y += 65),
                  (y += ((25 - v) >>> 8) & 6),
                  (y += ((51 - v) >>> 8) & -75),
                  (y += ((61 - v) >>> 8) & -15),
                  (y += ((62 - v) >>> 8) & 3),
                  String.fromCharCode(y)
                )
              }),
              (b.prototype._decodeChar = function (v) {
                let y = s
                return (
                  (y +=
                                        (((42 - v) & (v - 44)) >>> 8) &
                                        (-s + v - 43 + 62)),
                  (y +=
                                        (((46 - v) & (v - 48)) >>> 8) &
                                        (-s + v - 47 + 63)),
                  (y +=
                                        (((47 - v) & (v - 58)) >>> 8) &
                                        (-s + v - 48 + 52)),
                  (y +=
                                        (((64 - v) & (v - 91)) >>> 8) &
                                        (-s + v - 65 + 0)),
                  (y +=
                                        (((96 - v) & (v - 123)) >>> 8) &
                                        (-s + v - 97 + 26)),
                  y
                )
              }),
              (b.prototype._getPaddingLength = function (v) {
                let y = 0
                if (this._paddingCharacter) {
                  for (
                    let w = v.length - 1;
                    w >= 0 &&
                                        v[w] === this._paddingCharacter;
                    w--
                  ) {
                    y++
                  }
                  if (v.length < 4 || y > 2) {
                    throw new Error(
                      'Base64Coder: incorrect padding'
                    )
                  }
                }
                return y
              }),
              b
            )
          })()
          h.Coder = f
          const d = new f()
          function N (b) {
            return d.encode(b)
          }
          h.encode = N
          function P (b) {
            return d.decode(b)
          }
          h.decode = P
          const T = (function (b) {
            c(v, b)
            function v () {
              return (
                (b !== null && b.apply(this, arguments)) || this
              )
            }
            return (
              (v.prototype._encodeByte = function (y) {
                let w = y
                return (
                  (w += 65),
                  (w += ((25 - y) >>> 8) & 6),
                  (w += ((51 - y) >>> 8) & -75),
                  (w += ((61 - y) >>> 8) & -13),
                  (w += ((62 - y) >>> 8) & 49),
                  String.fromCharCode(w)
                )
              }),
              (v.prototype._decodeChar = function (y) {
                let w = s
                return (
                  (w +=
                                        (((44 - y) & (y - 46)) >>> 8) &
                                        (-s + y - 45 + 62)),
                  (w +=
                                        (((94 - y) & (y - 96)) >>> 8) &
                                        (-s + y - 95 + 63)),
                  (w +=
                                        (((47 - y) & (y - 58)) >>> 8) &
                                        (-s + y - 48 + 52)),
                  (w +=
                                        (((64 - y) & (y - 91)) >>> 8) &
                                        (-s + y - 65 + 0)),
                  (w +=
                                        (((96 - y) & (y - 123)) >>> 8) &
                                        (-s + y - 97 + 26)),
                  w
                )
              }),
              v
            )
          })(f)
          h.URLSafeCoder = T
          const S = new T()
          function C (b) {
            return S.encode(b)
          }
          h.encodeURLSafe = C
          function x (b) {
            return S.decode(b)
          }
          (h.decodeURLSafe = x),
          (h.encodedLength = function (b) {
            return d.encodedLength(b)
          }),
          (h.maxDecodedLength = function (b) {
            return d.maxDecodedLength(b)
          }),
          (h.decodedLength = function (b) {
            return d.decodedLength(b)
          })
        },
        function (l, h, a) {
          'use strict'
          Object.defineProperty(h, '__esModule', { value: !0 })
          const c = 'utf8: invalid string'
          const s = 'utf8: invalid source encoding'
          function f (P) {
            for (
              var T = new Uint8Array(d(P)), S = 0, C = 0;
              C < P.length;
              C++
            ) {
              let x = P.charCodeAt(C)
              x < 128
                ? (T[S++] = x)
                : x < 2048
                  ? ((T[S++] = 192 | (x >> 6)),
                    (T[S++] = 128 | (x & 63)))
                  : x < 55296
                    ? ((T[S++] = 224 | (x >> 12)),
                      (T[S++] = 128 | ((x >> 6) & 63)),
                      (T[S++] = 128 | (x & 63)))
                    : (C++,
                      (x = (x & 1023) << 10),
                      (x |= P.charCodeAt(C) & 1023),
                      (x += 65536),
                      (T[S++] = 240 | (x >> 18)),
                      (T[S++] = 128 | ((x >> 12) & 63)),
                      (T[S++] = 128 | ((x >> 6) & 63)),
                      (T[S++] = 128 | (x & 63)))
            }
            return T
          }
          h.encode = f
          function d (P) {
            for (var T = 0, S = 0; S < P.length; S++) {
              const C = P.charCodeAt(S)
              if (C < 128) T += 1
              else if (C < 2048) T += 2
              else if (C < 55296) T += 3
              else if (C <= 57343) {
                if (S >= P.length - 1) throw new Error(c)
                S++, (T += 4)
              } else throw new Error(c)
            }
            return T
          }
          h.encodedLength = d
          function N (P) {
            for (var T = [], S = 0; S < P.length; S++) {
              let C = P[S]
              if (C & 128) {
                let x = void 0
                if (C < 224) {
                  if (S >= P.length) throw new Error(s)
                  var b = P[++S]
                  if ((b & 192) !== 128) throw new Error(s);
                  (C = ((C & 31) << 6) | (b & 63)), (x = 128)
                } else if (C < 240) {
                  if (S >= P.length - 1) throw new Error(s)
                  var b = P[++S]
                  var v = P[++S]
                  if (
                    (b & 192) !== 128 ||
                                        (v & 192) !== 128
                  ) {
                    throw new Error(s)
                  }
                  (C =
                                        ((C & 15) << 12) |
                                        ((b & 63) << 6) |
                                        (v & 63)),
                  (x = 2048)
                } else if (C < 248) {
                  if (S >= P.length - 2) throw new Error(s)
                  var b = P[++S]
                  var v = P[++S]
                  const y = P[++S]
                  if (
                    (b & 192) !== 128 ||
                                        (v & 192) !== 128 ||
                                        (y & 192) !== 128
                  ) {
                    throw new Error(s)
                  }
                  (C =
                                        ((C & 15) << 18) |
                                        ((b & 63) << 12) |
                                        ((v & 63) << 6) |
                                        (y & 63)),
                  (x = 65536)
                } else throw new Error(s)
                if (C < x || (C >= 55296 && C <= 57343)) {
                  throw new Error(s)
                }
                if (C >= 65536) {
                  if (C > 1114111) throw new Error(s);
                  (C -= 65536),
                  T.push(
                    String.fromCharCode(
                      55296 | (C >> 10)
                    )
                  ),
                  (C = 56320 | (C & 1023))
                }
              }
              T.push(String.fromCharCode(C))
            }
            return T.join('')
          }
          h.decode = N
        },
        function (l, h, a) {
          l.exports = a(3).default
        },
        function (l, h, a) {
          'use strict'
          a.r(h)
          const c = (function () {
            function e (t, n) {
              (this.lastId = 0),
              (this.prefix = t),
              (this.name = n)
            }
            return (
              (e.prototype.create = function (t) {
                this.lastId++
                const n = this.lastId
                const r = this.prefix + n
                const i = this.name + '[' + n + ']'
                let o = !1
                const u = function () {
                  o || (t.apply(null, arguments), (o = !0))
                }
                return (
                  (this[n] = u),
                  {
                    number: n,
                    id: r,
                    name: i,
                    callback: u
                  }
                )
              }),
              (e.prototype.remove = function (t) {
                delete this[t.number]
              }),
              e
            )
          })()
          const s = new c(
            '_pusher_script_',
            'Pusher.ScriptReceivers'
          )
          const f = {
            VERSION: '7.6.0',
            PROTOCOL: 7,
            wsPort: 80,
            wssPort: 443,
            wsPath: '',
            httpHost: 'sockjs.pusher.com',
            httpPort: 80,
            httpsPort: 443,
            httpPath: '/pusher',
            stats_host: 'stats.pusher.com',
            authEndpoint: '/pusher/auth',
            authTransport: 'ajax',
            activityTimeout: 12e4,
            pongTimeout: 3e4,
            unavailableTimeout: 1e4,
            cluster: 'mt1',
            userAuthentication: {
              endpoint: '/pusher/user-auth',
              transport: 'ajax'
            },
            channelAuthorization: {
              endpoint: '/pusher/auth',
              transport: 'ajax'
            },
            cdn_http: 'http://js.pusher.com',
            cdn_https: 'https://js.pusher.com',
            dependency_suffix: ''
          }
          const d = f
          const N = (function () {
            function e (t) {
              (this.options = t),
              (this.receivers = t.receivers || s),
              (this.loading = {})
            }
            return (
              (e.prototype.load = function (t, n, r) {
                const i = this
                if (i.loading[t] && i.loading[t].length > 0) {
                  i.loading[t].push(r)
                } else {
                  i.loading[t] = [r]
                  const o = m.createScriptRequest(
                    i.getPath(t, n)
                  )
                  var u = i.receivers.create(function (p) {
                    if (
                      (i.receivers.remove(u),
                      i.loading[t])
                    ) {
                      const _ = i.loading[t]
                      delete i.loading[t]
                      for (
                        let g = function (E) {
                            E || o.cleanup()
                          },
                          k = 0;
                        k < _.length;
                        k++
                      ) {
                        _[k](p, g)
                      }
                    }
                  })
                  o.send(u)
                }
              }),
              (e.prototype.getRoot = function (t) {
                let n
                const r = m.getDocument().location.protocol
                return (
                  (t && t.useTLS) || r === 'https:'
                    ? (n = this.options.cdn_https)
                    : (n = this.options.cdn_http),
                  n.replace(/\/*$/, '') +
                                        '/' +
                                        this.options.version
                )
              }),
              (e.prototype.getPath = function (t, n) {
                return (
                  this.getRoot(n) +
                                    '/' +
                                    t +
                                    this.options.suffix +
                                    '.js'
                )
              }),
              e
            )
          })()
          const P = N
          const T = new c(
            '_pusher_dependencies',
            'Pusher.DependenciesReceivers'
          )
          const S = new P({
            cdn_http: d.cdn_http,
            cdn_https: d.cdn_https,
            version: d.VERSION,
            suffix: d.dependency_suffix,
            receivers: T
          })
          const C = {
            baseUrl: 'https://pusher.com',
            urls: {
              authenticationEndpoint: {
                path: '/docs/channels/server_api/authenticating_users'
              },
              authorizationEndpoint: {
                path: '/docs/channels/server_api/authorizing-users/'
              },
              javascriptQuickStart: {
                path: '/docs/javascript_quick_start'
              },
              triggeringClientEvents: {
                path: '/docs/client_api_guide/client_events#trigger-events'
              },
              encryptedChannelSupport: {
                fullUrl:
                                    'https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support'
              }
            }
          }
          const x = function (e) {
            const t = 'See:'
            const n = C.urls[e]
            if (!n) return ''
            let r
            return (
              n.fullUrl
                ? (r = n.fullUrl)
                : n.path && (r = C.baseUrl + n.path),
              r ? t + ' ' + r : ''
            )
          }
          const b = { buildLogSuffix: x }
          let v;
          (function (e) {
            (e.UserAuthentication = 'user-authentication'),
            (e.ChannelAuthorization = 'channel-authorization')
          })(v || (v = {}))
          const y = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const w = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const O = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const I = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const q = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const M = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const J = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const F = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const z = (function (e) {
            y(t, e)
            function t (n) {
              const r = this.constructor
              const i = e.call(this, n) || this
              return Object.setPrototypeOf(i, r.prototype), i
            }
            return t
          })(Error)
          const B = (function (e) {
            y(t, e)
            function t (n, r) {
              const i = this.constructor
              const o = e.call(this, r) || this
              return (
                (o.status = n),
                Object.setPrototypeOf(o, i.prototype),
                o
              )
            }
            return t
          })(Error)
          const ke = function (e, t, n, r, i) {
            const o = m.createXHR()
            o.open('POST', n.endpoint, !0),
            o.setRequestHeader(
              'Content-Type',
              'application/x-www-form-urlencoded'
            )
            for (var u in n.headers) {
              o.setRequestHeader(u, n.headers[u])
            }
            if (n.headersProvider != null) {
              const p = n.headersProvider()
              for (var u in p) o.setRequestHeader(u, p[u])
            }
            return (
              (o.onreadystatechange = function () {
                if (o.readyState === 4) {
                  if (o.status === 200) {
                    let _ = void 0
                    let g = !1
                    try {
                      (_ = JSON.parse(o.responseText)),
                      (g = !0)
                    } catch {
                      i(
                        new B(
                          200,
                          'JSON returned from ' +
                                                        r.toString() +
                                                        ' endpoint was invalid, yet status code was 200. Data was: ' +
                                                        o.responseText
                        ),
                        null
                      )
                    }
                    g && i(null, _)
                  } else {
                    let k = ''
                    switch (r) {
                      case v.UserAuthentication:
                        k = b.buildLogSuffix(
                          'authenticationEndpoint'
                        )
                        break
                      case v.ChannelAuthorization:
                        k =
                                                    'Clients must be authorized to join private or presence channels. ' +
                                                    b.buildLogSuffix(
                                                      'authorizationEndpoint'
                                                    )
                        break
                    }
                    i(
                      new B(
                        o.status,
                        'Unable to retrieve auth string from ' +
                                                    r.toString() +
                                                    ' endpoint - ' +
                                                    ('received status: ' +
                                                        o.status +
                                                        ' from ' +
                                                        n.endpoint +
                                                        '. ' +
                                                        k)
                      ),
                      null
                    )
                  }
                }
              }),
              o.send(t),
              o
            )
          }
          const Se = ke
          function Ce (e) {
            return Ee(Oe(e))
          }
          for (
            var nt = String.fromCharCode,
              Z =
                                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
              Te = {},
              ct = 0,
              Pe = Z.length;
            ct < Pe;
            ct++
          ) {
            Te[Z.charAt(ct)] = ct
          }
          const xe = function (e) {
            const t = e.charCodeAt(0)
            return t < 128
              ? e
              : t < 2048
                ? nt(192 | (t >>> 6)) + nt(128 | (t & 63))
                : nt(224 | ((t >>> 12) & 15)) +
                                nt(128 | ((t >>> 6) & 63)) +
                                nt(128 | (t & 63))
          }
          var Oe = function (e) {
            return e.replace(/[^\x00-\x7F]/g, xe)
          }
          const Ae = function (e) {
            const t = [0, 2, 1][e.length % 3]
            const n =
                            (e.charCodeAt(0) << 16) |
                            ((e.length > 1 ? e.charCodeAt(1) : 0) << 8) |
                            (e.length > 2 ? e.charCodeAt(2) : 0)
            const r = [
              Z.charAt(n >>> 18),
              Z.charAt((n >>> 12) & 63),
              t >= 2 ? '=' : Z.charAt((n >>> 6) & 63),
              t >= 1 ? '=' : Z.charAt(n & 63)
            ]
            return r.join('')
          }
          var Ee =
                        window.btoa ||
                        function (e) {
                          return e.replace(/[\s\S]{1,3}/g, Ae)
                        }
          const Le = (function () {
            function e (t, n, r, i) {
              const o = this;
              (this.clear = n),
              (this.timer = t(function () {
                o.timer && (o.timer = i(o.timer))
              }, r))
            }
            return (
              (e.prototype.isRunning = function () {
                return this.timer !== null
              }),
              (e.prototype.ensureAborted = function () {
                this.timer &&
                                    (this.clear(this.timer),
                                    (this.timer = null))
              }),
              e
            )
          })()
          const jt = Le
          const Nt = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          function Re (e) {
            window.clearTimeout(e)
          }
          function Ie (e) {
            window.clearInterval(e)
          }
          const Q = (function (e) {
            Nt(t, e)
            function t (n, r) {
              return (
                e.call(this, setTimeout, Re, n, function (i) {
                  return r(), null
                }) || this
              )
            }
            return t
          })(jt)
          const je = (function (e) {
            Nt(t, e)
            function t (n, r) {
              return (
                e.call(this, setInterval, Ie, n, function (i) {
                  return r(), i
                }) || this
              )
            }
            return t
          })(jt)
          const Ne = {
            now: function () {
              return Date.now ? Date.now() : new Date().valueOf()
            },
            defer: function (e) {
              return new Q(0, e)
            },
            method: function (e) {
              for (let t = [], n = 1; n < arguments.length; n++) {
                t[n - 1] = arguments[n]
              }
              const r = Array.prototype.slice.call(arguments, 1)
              return function (i) {
                return i[e].apply(i, r.concat(arguments))
              }
            }
          }
          const j = Ne
          function U (e) {
            for (var t = [], n = 1; n < arguments.length; n++) {
              t[n - 1] = arguments[n]
            }
            for (let r = 0; r < t.length; r++) {
              const i = t[r]
              for (const o in i) {
                i[o] &&
                                i[o].constructor &&
                                i[o].constructor === Object
                  ? (e[o] = U(e[o] || {}, i[o]))
                  : (e[o] = i[o])
              }
            }
            return e
          }
          function qe () {
            for (
              var e = ['Pusher'], t = 0;
              t < arguments.length;
              t++
            ) {
              typeof arguments[t] === 'string'
                ? e.push(arguments[t])
                : e.push(ut(arguments[t]))
            }
            return e.join(' : ')
          }
          function qt (e, t) {
            const n = Array.prototype.indexOf
            if (e === null) return -1
            if (n && e.indexOf === n) return e.indexOf(t)
            for (let r = 0, i = e.length; r < i; r++) {
              if (e[r] === t) return r
            }
            return -1
          }
          function W (e, t) {
            for (const n in e) {
              Object.prototype.hasOwnProperty.call(e, n) &&
                                t(e[n], n, e)
            }
          }
          function Ut (e) {
            const t = []
            return (
              W(e, function (n, r) {
                t.push(r)
              }),
              t
            )
          }
          function Ue (e) {
            const t = []
            return (
              W(e, function (n) {
                t.push(n)
              }),
              t
            )
          }
          function rt (e, t, n) {
            for (let r = 0; r < e.length; r++) {
              t.call(n || window, e[r], r, e)
            }
          }
          function Dt (e, t) {
            for (var n = [], r = 0; r < e.length; r++) {
              n.push(t(e[r], r, e, n))
            }
            return n
          }
          function De (e, t) {
            const n = {}
            return (
              W(e, function (r, i) {
                n[i] = t(r)
              }),
              n
            )
          }
          function Ht (e, t) {
            t =
                            t ||
                            function (i) {
                              return !!i
                            }
            for (var n = [], r = 0; r < e.length; r++) {
              t(e[r], r, e, n) && n.push(e[r])
            }
            return n
          }
          function Mt (e, t) {
            const n = {}
            return (
              W(e, function (r, i) {
                ((t && t(r, i, e, n)) || r) && (n[i] = r)
              }),
              n
            )
          }
          function He (e) {
            const t = []
            return (
              W(e, function (n, r) {
                t.push([r, n])
              }),
              t
            )
          }
          function zt (e, t) {
            for (let n = 0; n < e.length; n++) {
              if (t(e[n], n, e)) return !0
            }
            return !1
          }
          function Me (e, t) {
            for (let n = 0; n < e.length; n++) {
              if (!t(e[n], n, e)) return !1
            }
            return !0
          }
          function ze (e) {
            return De(e, function (t) {
              return (
                typeof t === 'object' && (t = ut(t)),
                encodeURIComponent(Ce(t.toString()))
              )
            })
          }
          function Fe (e) {
            const t = Mt(e, function (r) {
              return r !== void 0
            })
            const n = Dt(He(ze(t)), j.method('join', '=')).join(
              '&'
            )
            return n
          }
          function Be (e) {
            const t = []
            const n = []
            return (function r (i, o) {
              let u, p, _
              switch (typeof i) {
                case 'object':
                  if (!i) return null
                  for (u = 0; u < t.length; u += 1) {
                    if (t[u] === i) return { $ref: n[u] }
                  }
                  if (
                    (t.push(i),
                    n.push(o),
                    Object.prototype.toString.apply(i) ===
                                            '[object Array]')
                  ) {
                    for (
                      _ = [], u = 0;
                      u < i.length;
                      u += 1
                    ) {
                      _[u] = r(i[u], o + '[' + u + ']')
                    }
                  } else {
                    _ = {}
                    for (p in i) {
                      Object.prototype.hasOwnProperty.call(
                        i,
                        p
                      ) &&
                                                (_[p] = r(
                                                  i[p],
                                                  o +
                                                        '[' +
                                                        JSON.stringify(p) +
                                                        ']'
                                                ))
                    }
                  }
                  return _
                case 'number':
                case 'string':
                case 'boolean':
                  return i
              }
            })(e, '$')
          }
          function ut (e) {
            try {
              return JSON.stringify(e)
            } catch {
              return JSON.stringify(Be(e))
            }
          }
          const Xe = (function () {
            function e () {
              this.globalLog = function (t) {
                window.console &&
                                    window.console.log &&
                                    window.console.log(t)
              }
            }
            return (
              (e.prototype.debug = function () {
                for (
                  var t = [], n = 0;
                  n < arguments.length;
                  n++
                ) {
                  t[n] = arguments[n]
                }
                this.log(this.globalLog, t)
              }),
              (e.prototype.warn = function () {
                for (
                  var t = [], n = 0;
                  n < arguments.length;
                  n++
                ) {
                  t[n] = arguments[n]
                }
                this.log(this.globalLogWarn, t)
              }),
              (e.prototype.error = function () {
                for (
                  var t = [], n = 0;
                  n < arguments.length;
                  n++
                ) {
                  t[n] = arguments[n]
                }
                this.log(this.globalLogError, t)
              }),
              (e.prototype.globalLogWarn = function (t) {
                window.console && window.console.warn
                  ? window.console.warn(t)
                  : this.globalLog(t)
              }),
              (e.prototype.globalLogError = function (t) {
                window.console && window.console.error
                  ? window.console.error(t)
                  : this.globalLogWarn(t)
              }),
              (e.prototype.log = function (t) {
                for (
                  let n = [], r = 1;
                  r < arguments.length;
                  r++
                ) {
                  n[r - 1] = arguments[r]
                }
                const i = qe.apply(this, arguments)
                if (Pt.log) Pt.log(i)
                else if (Pt.logToConsole) {
                  const o = t.bind(this)
                  o(i)
                }
              }),
              e
            )
          })()
          const A = new Xe()
          const Je = function (e, t, n, r, i) {
            (n.headers !== void 0 || n.headersProvider != null) &&
                            A.warn(
                              'To send headers with the ' +
                                    r.toString() +
                                    ' request, you must use AJAX, rather than JSONP.'
                            )
            const o = e.nextAuthCallbackID.toString()
            e.nextAuthCallbackID++
            const u = e.getDocument()
            const p = u.createElement('script')
            e.auth_callbacks[o] = function (k) {
              i(null, k)
            }
            const _ = "Pusher.auth_callbacks['" + o + "']"
            p.src =
                            n.endpoint +
                            '?callback=' +
                            encodeURIComponent(_) +
                            '&' +
                            t
            const g =
                            u.getElementsByTagName('head')[0] ||
                            u.documentElement
            g.insertBefore(p, g.firstChild)
          }
          const We = Je
          const Ve = (function () {
            function e (t) {
              this.src = t
            }
            return (
              (e.prototype.send = function (t) {
                const n = this
                const r = 'Error loading ' + n.src;
                (n.script = document.createElement('script')),
                (n.script.id = t.id),
                (n.script.src = n.src),
                (n.script.type = 'text/javascript'),
                (n.script.charset = 'UTF-8'),
                n.script.addEventListener
                  ? ((n.script.onerror = function () {
                      t.callback(r)
                    }),
                    (n.script.onload = function () {
                      t.callback(null)
                    }))
                  : (n.script.onreadystatechange =
                                              function () {
                                                (n.script.readyState ===
                                                      'loaded' ||
                                                      n.script.readyState ===
                                                          'complete') &&
                                                      t.callback(null)
                                              }),
                n.script.async === void 0 &&
                                    document.attachEvent &&
                                    /opera/i.test(navigator.userAgent)
                  ? ((n.errorScript =
                                              document.createElement('script')),
                    (n.errorScript.id = t.id + '_error'),
                    (n.errorScript.text =
                                              t.name + "('" + r + "');"),
                    (n.script.async =
                                              n.errorScript.async =
                                                  !1))
                  : (n.script.async = !0)
                const i =
                                    document.getElementsByTagName('head')[0]
                i.insertBefore(n.script, i.firstChild),
                n.errorScript &&
                                        i.insertBefore(
                                          n.errorScript,
                                          n.script.nextSibling
                                        )
              }),
              (e.prototype.cleanup = function () {
                this.script &&
                                    ((this.script.onload = this.script.onerror =
                                        null),
                                    (this.script.onreadystatechange = null)),
                this.script &&
                                        this.script.parentNode &&
                                        this.script.parentNode.removeChild(
                                          this.script
                                        ),
                this.errorScript &&
                                        this.errorScript.parentNode &&
                                        this.errorScript.parentNode.removeChild(
                                          this.errorScript
                                        ),
                (this.script = null),
                (this.errorScript = null)
              }),
              e
            )
          })()
          const Ge = Ve
          const Qe = (function () {
            function e (t, n) {
              (this.url = t), (this.data = n)
            }
            return (
              (e.prototype.send = function (t) {
                if (!this.request) {
                  const n = Fe(this.data)
                  const r =
                                        this.url + '/' + t.number + '?' + n;
                  (this.request = m.createScriptRequest(r)),
                  this.request.send(t)
                }
              }),
              (e.prototype.cleanup = function () {
                this.request && this.request.cleanup()
              }),
              e
            )
          })()
          const Ke = Qe
          const Ye = function (e, t) {
            return function (n, r) {
              const i = 'http' + (t ? 's' : '') + '://'
              const o =
                                i + (e.host || e.options.host) + e.options.path
              const u = m.createJSONPRequest(o, n)
              var p = m.ScriptReceivers.create(function (_, g) {
                s.remove(p),
                u.cleanup(),
                g && g.host && (e.host = g.host),
                r && r(_, g)
              })
              u.send(p)
            }
          }
          const $e = { name: 'jsonp', getAgent: Ye }
          const Ze = $e
          function yt (e, t, n) {
            const r = e + (t.useTLS ? 's' : '')
            const i = t.useTLS ? t.hostTLS : t.hostNonTLS
            return r + '://' + i + n
          }
          function gt (e, t) {
            const n = '/app/' + e
            const r =
                            '?protocol=' +
                            d.PROTOCOL +
                            '&client=js&version=' +
                            d.VERSION +
                            (t ? '&' + t : '')
            return n + r
          }
          const tn = {
            getInitial: function (e, t) {
              const n = (t.httpPath || '') + gt(e, 'flash=false')
              return yt('ws', t, n)
            }
          }
          const en = {
            getInitial: function (e, t) {
              const n = (t.httpPath || '/pusher') + gt(e)
              return yt('http', t, n)
            }
          }
          const nn = {
            getInitial: function (e, t) {
              return yt('http', t, t.httpPath || '/pusher')
            },
            getPath: function (e, t) {
              return gt(e)
            }
          }
          const rn = (function () {
            function e () {
              this._callbacks = {}
            }
            return (
              (e.prototype.get = function (t) {
                return this._callbacks[_t(t)]
              }),
              (e.prototype.add = function (t, n, r) {
                const i = _t(t);
                (this._callbacks[i] = this._callbacks[i] || []),
                this._callbacks[i].push({
                  fn: n,
                  context: r
                })
              }),
              (e.prototype.remove = function (t, n, r) {
                if (!t && !n && !r) {
                  this._callbacks = {}
                  return
                }
                const i = t ? [_t(t)] : Ut(this._callbacks)
                n || r
                  ? this.removeCallback(i, n, r)
                  : this.removeAllCallbacks(i)
              }),
              (e.prototype.removeCallback = function (t, n, r) {
                rt(
                  t,
                  function (i) {
                    (this._callbacks[i] = Ht(
                      this._callbacks[i] || [],
                      function (o) {
                        return (
                          (n && n !== o.fn) ||
                                                    (r && r !== o.context)
                        )
                      }
                    )),
                    this._callbacks[i].length === 0 &&
                                                delete this._callbacks[i]
                  },
                  this
                )
              }),
              (e.prototype.removeAllCallbacks = function (t) {
                rt(
                  t,
                  function (n) {
                    delete this._callbacks[n]
                  },
                  this
                )
              }),
              e
            )
          })()
          const on = rn
          function _t (e) {
            return '_' + e
          }
          const sn = (function () {
            function e (t) {
              (this.callbacks = new on()),
              (this.global_callbacks = []),
              (this.failThrough = t)
            }
            return (
              (e.prototype.bind = function (t, n, r) {
                return this.callbacks.add(t, n, r), this
              }),
              (e.prototype.bind_global = function (t) {
                return this.global_callbacks.push(t), this
              }),
              (e.prototype.unbind = function (t, n, r) {
                return this.callbacks.remove(t, n, r), this
              }),
              (e.prototype.unbind_global = function (t) {
                return t
                  ? ((this.global_callbacks = Ht(
                      this.global_callbacks || [],
                      function (n) {
                        return n !== t
                      }
                    )),
                    this)
                  : ((this.global_callbacks = []), this)
              }),
              (e.prototype.unbind_all = function () {
                return (
                  this.unbind(), this.unbind_global(), this
                )
              }),
              (e.prototype.emit = function (t, n, r) {
                for (
                  var i = 0;
                  i < this.global_callbacks.length;
                  i++
                ) {
                  this.global_callbacks[i](t, n)
                }
                const o = this.callbacks.get(t)
                const u = []
                if (
                  (r ? u.push(n, r) : n && u.push(n),
                  o && o.length > 0)
                ) {
                  for (var i = 0; i < o.length; i++) {
                    o[i].fn.apply(
                      o[i].context || window,
                      u
                    )
                  }
                } else {
                  this.failThrough && this.failThrough(t, n)
                }
                return this
              }),
              e
            )
          })()
          const V = sn
          const an = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const cn = (function (e) {
            an(t, e)
            function t (n, r, i, o, u) {
              const p = e.call(this) || this
              return (
                (p.initialize =
                                    m.transportConnectionInitializer),
                (p.hooks = n),
                (p.name = r),
                (p.priority = i),
                (p.key = o),
                (p.options = u),
                (p.state = 'new'),
                (p.timeline = u.timeline),
                (p.activityTimeout = u.activityTimeout),
                (p.id = p.timeline.generateUniqueID()),
                p
              )
            }
            return (
              (t.prototype.handlesActivityChecks = function () {
                return !!this.hooks.handlesActivityChecks
              }),
              (t.prototype.supportsPing = function () {
                return !!this.hooks.supportsPing
              }),
              (t.prototype.connect = function () {
                const n = this
                if (
                  this.socket ||
                                    this.state !== 'initialized'
                ) {
                  return !1
                }
                const r = this.hooks.urls.getInitial(
                  this.key,
                  this.options
                )
                try {
                  this.socket = this.hooks.getSocket(
                    r,
                    this.options
                  )
                } catch (i) {
                  return (
                    j.defer(function () {
                      n.onError(i),
                      n.changeState('closed')
                    }),
                    !1
                  )
                }
                return (
                  this.bindListeners(),
                  A.debug('Connecting', {
                    transport: this.name,
                    url: r
                  }),
                  this.changeState('connecting'),
                  !0
                )
              }),
              (t.prototype.close = function () {
                return this.socket
                  ? (this.socket.close(), !0)
                  : !1
              }),
              (t.prototype.send = function (n) {
                const r = this
                return this.state === 'open'
                  ? (j.defer(function () {
                      r.socket && r.socket.send(n)
                    }),
                    !0)
                  : !1
              }),
              (t.prototype.ping = function () {
                this.state === 'open' &&
                                    this.supportsPing() &&
                                    this.socket.ping()
              }),
              (t.prototype.onOpen = function () {
                this.hooks.beforeOpen &&
                                    this.hooks.beforeOpen(
                                      this.socket,
                                      this.hooks.urls.getPath(
                                        this.key,
                                        this.options
                                      )
                                    ),
                this.changeState('open'),
                (this.socket.onopen = void 0)
              }),
              (t.prototype.onError = function (n) {
                this.emit('error', {
                  type: 'WebSocketError',
                  error: n
                }),
                this.timeline.error(
                  this.buildTimelineMessage({
                    error: n.toString()
                  })
                )
              }),
              (t.prototype.onClose = function (n) {
                n
                  ? this.changeState('closed', {
                    code: n.code,
                    reason: n.reason,
                    wasClean: n.wasClean
                  })
                  : this.changeState('closed'),
                this.unbindListeners(),
                (this.socket = void 0)
              }),
              (t.prototype.onMessage = function (n) {
                this.emit('message', n)
              }),
              (t.prototype.onActivity = function () {
                this.emit('activity')
              }),
              (t.prototype.bindListeners = function () {
                const n = this;
                (this.socket.onopen = function () {
                  n.onOpen()
                }),
                (this.socket.onerror = function (r) {
                  n.onError(r)
                }),
                (this.socket.onclose = function (r) {
                  n.onClose(r)
                }),
                (this.socket.onmessage = function (r) {
                  n.onMessage(r)
                }),
                this.supportsPing() &&
                                        (this.socket.onactivity = function () {
                                          n.onActivity()
                                        })
              }),
              (t.prototype.unbindListeners = function () {
                this.socket &&
                                    ((this.socket.onopen = void 0),
                                    (this.socket.onerror = void 0),
                                    (this.socket.onclose = void 0),
                                    (this.socket.onmessage = void 0),
                                    this.supportsPing() &&
                                        (this.socket.onactivity = void 0))
              }),
              (t.prototype.changeState = function (n, r) {
                (this.state = n),
                this.timeline.info(
                  this.buildTimelineMessage({
                    state: n,
                    params: r
                  })
                ),
                this.emit(n, r)
              }),
              (t.prototype.buildTimelineMessage = function (n) {
                return U({ cid: this.id }, n)
              }),
              t
            )
          })(V)
          const un = cn
          const hn = (function () {
            function e (t) {
              this.hooks = t
            }
            return (
              (e.prototype.isSupported = function (t) {
                return this.hooks.isSupported(t)
              }),
              (e.prototype.createConnection = function (
                t,
                n,
                r,
                i
              ) {
                return new un(this.hooks, t, n, r, i)
              }),
              e
            )
          })()
          const tt = hn
          const ln = new tt({
            urls: tn,
            handlesActivityChecks: !1,
            supportsPing: !1,
            isInitialized: function () {
              return !!m.getWebSocketAPI()
            },
            isSupported: function () {
              return !!m.getWebSocketAPI()
            },
            getSocket: function (e) {
              return m.createWebSocket(e)
            }
          })
          const Ft = {
            urls: en,
            handlesActivityChecks: !1,
            supportsPing: !0,
            isInitialized: function () {
              return !0
            }
          }
          const Bt = U(
            {
              getSocket: function (e) {
                return m.HTTPFactory.createStreamingSocket(e)
              }
            },
            Ft
          )
          const Xt = U(
            {
              getSocket: function (e) {
                return m.HTTPFactory.createPollingSocket(e)
              }
            },
            Ft
          )
          const Jt = {
            isSupported: function () {
              return m.isXHRSupported()
            }
          }
          const fn = new tt(U({}, Bt, Jt))
          const pn = new tt(U({}, Xt, Jt))
          const dn = { ws: ln, xhr_streaming: fn, xhr_polling: pn }
          const ht = dn
          const vn = new tt({
            file: 'sockjs',
            urls: nn,
            handlesActivityChecks: !0,
            supportsPing: !1,
            isSupported: function () {
              return !0
            },
            isInitialized: function () {
              return window.SockJS !== void 0
            },
            getSocket: function (e, t) {
              return new window.SockJS(e, null, {
                js_path: S.getPath('sockjs', {
                  useTLS: t.useTLS
                }),
                ignore_null_origin: t.ignoreNullOrigin
              })
            },
            beforeOpen: function (e, t) {
              e.send(JSON.stringify({ path: t }))
            }
          })
          const Wt = {
            isSupported: function (e) {
              const t = m.isXDRSupported(e.useTLS)
              return t
            }
          }
          const yn = new tt(U({}, Bt, Wt))
          const gn = new tt(U({}, Xt, Wt));
          (ht.xdr_streaming = yn),
          (ht.xdr_polling = gn),
          (ht.sockjs = vn)
          const _n = ht
          const bn = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const mn = (function (e) {
            bn(t, e)
            function t () {
              const n = e.call(this) || this
              const r = n
              return (
                window.addEventListener !== void 0 &&
                                    (window.addEventListener(
                                      'online',
                                      function () {
                                        r.emit('online')
                                      },
                                      !1
                                    ),
                                    window.addEventListener(
                                      'offline',
                                      function () {
                                        r.emit('offline')
                                      },
                                      !1
                                    )),
                n
              )
            }
            return (
              (t.prototype.isOnline = function () {
                return window.navigator.onLine === void 0
                  ? !0
                  : window.navigator.onLine
              }),
              t
            )
          })(V)
          const wn = new mn()
          const kn = (function () {
            function e (t, n, r) {
              (this.manager = t),
              (this.transport = n),
              (this.minPingDelay = r.minPingDelay),
              (this.maxPingDelay = r.maxPingDelay),
              (this.pingDelay = void 0)
            }
            return (
              (e.prototype.createConnection = function (
                t,
                n,
                r,
                i
              ) {
                const o = this
                i = U({}, i, {
                  activityTimeout: this.pingDelay
                })
                const u = this.transport.createConnection(
                  t,
                  n,
                  r,
                  i
                )
                let p = null
                const _ = function () {
                  u.unbind('open', _),
                  u.bind('closed', g),
                  (p = j.now())
                }
                var g = function (k) {
                  if (
                    (u.unbind('closed', g),
                    k.code === 1002 || k.code === 1003)
                  ) {
                    o.manager.reportDeath()
                  } else if (!k.wasClean && p) {
                    const E = j.now() - p
                    E < 2 * o.maxPingDelay &&
                                            (o.manager.reportDeath(),
                                            (o.pingDelay = Math.max(
                                              E / 2,
                                              o.minPingDelay
                                            )))
                  }
                }
                return u.bind('open', _), u
              }),
              (e.prototype.isSupported = function (t) {
                return (
                  this.manager.isAlive() &&
                                    this.transport.isSupported(t)
                )
              }),
              e
            )
          })()
          const Sn = kn
          var Vt = {
            decodeMessage: function (e) {
              try {
                const t = JSON.parse(e.data)
                let n = t.data
                if (typeof n === 'string') {
                  try {
                    n = JSON.parse(t.data)
                  } catch {}
                }
                const r = {
                  event: t.event,
                  channel: t.channel,
                  data: n
                }
                return t.user_id && (r.user_id = t.user_id), r
              } catch (i) {
                throw {
                  type: 'MessageParseError',
                  error: i,
                  data: e.data
                }
              }
            },
            encodeMessage: function (e) {
              return JSON.stringify(e)
            },
            processHandshake: function (e) {
              const t = Vt.decodeMessage(e)
              if (t.event === 'pusher:connection_established') {
                if (!t.data.activity_timeout) {
                  throw 'No activity timeout specified in handshake'
                }
                return {
                  action: 'connected',
                  id: t.data.socket_id,
                  activityTimeout:
                                        t.data.activity_timeout * 1e3
                }
              } else {
                if (t.event === 'pusher:error') {
                  return {
                    action: this.getCloseAction(t.data),
                    error: this.getCloseError(t.data)
                  }
                }
                throw 'Invalid handshake'
              }
            },
            getCloseAction: function (e) {
              return e.code < 4e3
                ? e.code >= 1002 && e.code <= 1004
                  ? 'backoff'
                  : null
                : e.code === 4e3
                  ? 'tls_only'
                  : e.code < 4100
                    ? 'refused'
                    : e.code < 4200
                      ? 'backoff'
                      : e.code < 4300
                        ? 'retry'
                        : 'refused'
            },
            getCloseError: function (e) {
              return e.code !== 1e3 && e.code !== 1001
                ? {
                    type: 'PusherError',
                    data: {
                      code: e.code,
                      message: e.reason || e.message
                    }
                  }
                : null
            }
          }
          const K = Vt
          const Cn = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const Tn = (function (e) {
            Cn(t, e)
            function t (n, r) {
              const i = e.call(this) || this
              return (
                (i.id = n),
                (i.transport = r),
                (i.activityTimeout = r.activityTimeout),
                i.bindListeners(),
                i
              )
            }
            return (
              (t.prototype.handlesActivityChecks = function () {
                return this.transport.handlesActivityChecks()
              }),
              (t.prototype.send = function (n) {
                return this.transport.send(n)
              }),
              (t.prototype.send_event = function (n, r, i) {
                const o = { event: n, data: r }
                return (
                  i && (o.channel = i),
                  A.debug('Event sent', o),
                  this.send(K.encodeMessage(o))
                )
              }),
              (t.prototype.ping = function () {
                this.transport.supportsPing()
                  ? this.transport.ping()
                  : this.send_event('pusher:ping', {})
              }),
              (t.prototype.close = function () {
                this.transport.close()
              }),
              (t.prototype.bindListeners = function () {
                const n = this
                const r = {
                  message: function (o) {
                    let u
                    try {
                      u = K.decodeMessage(o)
                    } catch (p) {
                      n.emit('error', {
                        type: 'MessageParseError',
                        error: p,
                        data: o.data
                      })
                    }
                    if (u !== void 0) {
                      switch (
                        (A.debug('Event recd', u),
                        u.event)
                      ) {
                        case 'pusher:error':
                          n.emit('error', {
                            type: 'PusherError',
                            data: u.data
                          })
                          break
                        case 'pusher:ping':
                          n.emit('ping')
                          break
                        case 'pusher:pong':
                          n.emit('pong')
                          break
                      }
                      n.emit('message', u)
                    }
                  },
                  activity: function () {
                    n.emit('activity')
                  },
                  error: function (o) {
                    n.emit('error', o)
                  },
                  closed: function (o) {
                    i(),
                    o &&
                                                o.code &&
                                                n.handleCloseEvent(o),
                    (n.transport = null),
                    n.emit('closed')
                  }
                }
                var i = function () {
                  W(r, function (o, u) {
                    n.transport.unbind(u, o)
                  })
                }
                W(r, function (o, u) {
                  n.transport.bind(u, o)
                })
              }),
              (t.prototype.handleCloseEvent = function (n) {
                const r = K.getCloseAction(n)
                const i = K.getCloseError(n)
                i && this.emit('error', i),
                r &&
                                        this.emit(r, {
                                          action: r,
                                          error: i
                                        })
              }),
              t
            )
          })(V)
          const Pn = Tn
          const xn = (function () {
            function e (t, n) {
              (this.transport = t),
              (this.callback = n),
              this.bindListeners()
            }
            return (
              (e.prototype.close = function () {
                this.unbindListeners(), this.transport.close()
              }),
              (e.prototype.bindListeners = function () {
                const t = this;
                (this.onMessage = function (n) {
                  t.unbindListeners()
                  let r
                  try {
                    r = K.processHandshake(n)
                  } catch (i) {
                    t.finish('error', { error: i }),
                    t.transport.close()
                    return
                  }
                  r.action === 'connected'
                    ? t.finish('connected', {
                      connection: new Pn(
                        r.id,
                        t.transport
                      ),
                      activityTimeout:
                                                  r.activityTimeout
                    })
                    : (t.finish(r.action, {
                        error: r.error
                      }),
                      t.transport.close())
                }),
                (this.onClosed = function (n) {
                  t.unbindListeners()
                  const r =
                                            K.getCloseAction(n) || 'backoff'
                  const i = K.getCloseError(n)
                  t.finish(r, { error: i })
                }),
                this.transport.bind(
                  'message',
                  this.onMessage
                ),
                this.transport.bind(
                  'closed',
                  this.onClosed
                )
              }),
              (e.prototype.unbindListeners = function () {
                this.transport.unbind(
                  'message',
                  this.onMessage
                ),
                this.transport.unbind(
                  'closed',
                  this.onClosed
                )
              }),
              (e.prototype.finish = function (t, n) {
                this.callback(
                  U(
                    {
                      transport: this.transport,
                      action: t
                    },
                    n
                  )
                )
              }),
              e
            )
          })()
          const On = xn
          const An = (function () {
            function e (t, n) {
              (this.timeline = t), (this.options = n || {})
            }
            return (
              (e.prototype.send = function (t, n) {
                this.timeline.isEmpty() ||
                                    this.timeline.send(
                                      m.TimelineTransport.getAgent(this, t),
                                      n
                                    )
              }),
              e
            )
          })()
          const En = An
          const Ln = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const Rn = (function (e) {
            Ln(t, e)
            function t (n, r) {
              const i =
                                e.call(this, function (o, u) {
                                  A.debug(
                                    'No callbacks on ' + n + ' for ' + o
                                  )
                                }) || this
              return (
                (i.name = n),
                (i.pusher = r),
                (i.subscribed = !1),
                (i.subscriptionPending = !1),
                (i.subscriptionCancelled = !1),
                i
              )
            }
            return (
              (t.prototype.authorize = function (n, r) {
                return r(null, { auth: '' })
              }),
              (t.prototype.trigger = function (n, r) {
                if (n.indexOf('client-') !== 0) {
                  throw new w(
                    "Event '" +
                                            n +
                                            "' does not start with 'client-'"
                  )
                }
                if (!this.subscribed) {
                  const i = b.buildLogSuffix(
                    'triggeringClientEvents'
                  )
                  A.warn(
                    "Client event triggered before channel 'subscription_succeeded' event . " +
                                            i
                  )
                }
                return this.pusher.send_event(n, r, this.name)
              }),
              (t.prototype.disconnect = function () {
                (this.subscribed = !1),
                (this.subscriptionPending = !1)
              }),
              (t.prototype.handleEvent = function (n) {
                const r = n.event
                const i = n.data
                if (
                  r ===
                                    'pusher_internal:subscription_succeeded'
                ) {
                  this.handleSubscriptionSucceededEvent(n)
                } else if (
                  r === 'pusher_internal:subscription_count'
                ) {
                  this.handleSubscriptionCountEvent(n)
                } else if (
                  r.indexOf('pusher_internal:') !== 0
                ) {
                  const o = {}
                  this.emit(r, i, o)
                }
              }),
              (t.prototype.handleSubscriptionSucceededEvent =
                                function (n) {
                                  (this.subscriptionPending = !1),
                                  (this.subscribed = !0),
                                  this.subscriptionCancelled
                                    ? this.pusher.unsubscribe(this.name)
                                    : this.emit(
                                      'pusher:subscription_succeeded',
                                      n.data
                                    )
                                }),
              (t.prototype.handleSubscriptionCountEvent =
                                function (n) {
                                  n.data.subscription_count &&
                                        (this.subscriptionCount =
                                            n.data.subscription_count),
                                  this.emit(
                                    'pusher:subscription_count',
                                    n.data
                                  )
                                }),
              (t.prototype.subscribe = function () {
                const n = this
                this.subscribed ||
                                    ((this.subscriptionPending = !0),
                                    (this.subscriptionCancelled = !1),
                                    this.authorize(
                                      this.pusher.connection.socket_id,
                                      function (r, i) {
                                        r
                                          ? ((n.subscriptionPending = !1),
                                            A.error(r.toString()),
                                            n.emit(
                                              'pusher:subscription_error',
                                              Object.assign(
                                                {},
                                                {
                                                  type: 'AuthError',
                                                  error: r.message
                                                },
                                                r instanceof B
                                                  ? {
                                                      status: r.status
                                                    }
                                                  : {}
                                              )
                                            ))
                                          : n.pusher.send_event(
                                            'pusher:subscribe',
                                            {
                                              auth: i.auth,
                                              channel_data:
                                                              i.channel_data,
                                              channel: n.name
                                            }
                                          )
                                      }
                                    ))
              }),
              (t.prototype.unsubscribe = function () {
                (this.subscribed = !1),
                this.pusher.send_event(
                  'pusher:unsubscribe',
                  { channel: this.name }
                )
              }),
              (t.prototype.cancelSubscription = function () {
                this.subscriptionCancelled = !0
              }),
              (t.prototype.reinstateSubscription = function () {
                this.subscriptionCancelled = !1
              }),
              t
            )
          })(V)
          const bt = Rn
          const In = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const jn = (function (e) {
            In(t, e)
            function t () {
              return (
                (e !== null && e.apply(this, arguments)) || this
              )
            }
            return (
              (t.prototype.authorize = function (n, r) {
                return this.pusher.config.channelAuthorizer(
                  { channelName: this.name, socketId: n },
                  r
                )
              }),
              t
            )
          })(bt)
          const mt = jn
          const Nn = (function () {
            function e () {
              this.reset()
            }
            return (
              (e.prototype.get = function (t) {
                return Object.prototype.hasOwnProperty.call(
                  this.members,
                  t
                )
                  ? { id: t, info: this.members[t] }
                  : null
              }),
              (e.prototype.each = function (t) {
                const n = this
                W(this.members, function (r, i) {
                  t(n.get(i))
                })
              }),
              (e.prototype.setMyID = function (t) {
                this.myID = t
              }),
              (e.prototype.onSubscription = function (t) {
                (this.members = t.presence.hash),
                (this.count = t.presence.count),
                (this.me = this.get(this.myID))
              }),
              (e.prototype.addMember = function (t) {
                return (
                  this.get(t.user_id) === null &&
                                        this.count++,
                  (this.members[t.user_id] = t.user_info),
                  this.get(t.user_id)
                )
              }),
              (e.prototype.removeMember = function (t) {
                const n = this.get(t.user_id)
                return (
                  n &&
                                        (delete this.members[t.user_id],
                                        this.count--),
                  n
                )
              }),
              (e.prototype.reset = function () {
                (this.members = {}),
                (this.count = 0),
                (this.myID = null),
                (this.me = null)
              }),
              e
            )
          })()
          const qn = Nn
          const Un = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const Dn = function (e, t, n, r) {
            function i (o) {
              return o instanceof n
                ? o
                : new n(function (u) {
                  u(o)
                })
            }
            return new (n || (n = Promise))(function (o, u) {
              function p (k) {
                try {
                  g(r.next(k))
                } catch (E) {
                  u(E)
                }
              }
              function _ (k) {
                try {
                  g(r.throw(k))
                } catch (E) {
                  u(E)
                }
              }
              function g (k) {
                k.done ? o(k.value) : i(k.value).then(p, _)
              }
              g((r = r.apply(e, t || [])).next())
            })
          }
          const Hn = function (e, t) {
            let n = {
              label: 0,
              sent: function () {
                if (o[0] & 1) throw o[1]
                return o[1]
              },
              trys: [],
              ops: []
            }
            let r
            let i
            let o
            let u
            return (
              (u = { next: p(0), throw: p(1), return: p(2) }),
              typeof Symbol === 'function' &&
                                (u[Symbol.iterator] = function () {
                                  return this
                                }),
              u
            )
            function p (g) {
              return function (k) {
                return _([g, k])
              }
            }
            function _ (g) {
              if (r) {
                throw new TypeError(
                  'Generator is already executing.'
                )
              }
              for (; n;) {
                try {
                  if (
                    ((r = 1),
                    i &&
                                            (o =
                                                g[0] & 2
                                                  ? i.return
                                                  : g[0]
                                                    ? i.throw ||
                                                        ((o = i.return) &&
                                                            o.call(i),
                                                        0)
                                                    : i.next) &&
                                            !(o = o.call(i, g[1])).done)
                  ) {
                    return o
                  }
                  switch (
                    ((i = 0),
                    o && (g = [g[0] & 2, o.value]),
                    g[0])
                  ) {
                    case 0:
                    case 1:
                      o = g
                      break
                    case 4:
                      return (
                        n.label++,
                        { value: g[1], done: !1 }
                      )
                    case 5:
                      n.label++, (i = g[1]), (g = [0])
                      continue
                    case 7:
                      (g = n.ops.pop()), n.trys.pop()
                      continue
                    default:
                      if (
                        ((o = n.trys),
                        !(o =
                                                    o.length > 0 &&
                                                    o[o.length - 1]) &&
                                                    (g[0] === 6 || g[0] === 2))
                      ) {
                        n = 0
                        continue
                      }
                      if (
                        g[0] === 3 &&
                                                (!o ||
                                                    (g[1] > o[0] &&
                                                        g[1] < o[3]))
                      ) {
                        n.label = g[1]
                        break
                      }
                      if (g[0] === 6 && n.label < o[1]) {
                        (n.label = o[1]), (o = g)
                        break
                      }
                      if (o && n.label < o[2]) {
                        (n.label = o[2]), n.ops.push(g)
                        break
                      }
                      o[2] && n.ops.pop(), n.trys.pop()
                      continue
                  }
                  g = t.call(e, n)
                } catch (k) {
                  (g = [6, k]), (i = 0)
                } finally {
                  r = o = 0
                }
              }
              if (g[0] & 5) throw g[1]
              return {
                value: g[0] ? g[1] : void 0,
                done: !0
              }
            }
          }
          const Mn = (function (e) {
            Un(t, e)
            function t (n, r) {
              const i = e.call(this, n, r) || this
              return (i.members = new qn()), i
            }
            return (
              (t.prototype.authorize = function (n, r) {
                const i = this
                e.prototype.authorize.call(
                  this,
                  n,
                  function (o, u) {
                    return Dn(
                      i,
                      void 0,
                      void 0,
                      function () {
                        let p, _
                        return Hn(this, function (g) {
                          switch (g.label) {
                            case 0:
                              return o
                                ? [3, 3]
                                : ((u = u),
                                  u.channel_data ==
                                                                  null
                                    ? [3, 1]
                                    : ((p =
                                                                            JSON.parse(
                                                                              u.channel_data
                                                                            )),
                                      this.members.setMyID(
                                        p.user_id
                                      ),
                                      [
                                        3,
                                        3
                                      ]))
                            case 1:
                              return [
                                4,
                                this.pusher.user
                                  .signinDonePromise
                              ]
                            case 2:
                              if (
                                (g.sent(),
                                this.pusher.user
                                  .user_data !=
                                                                    null)
                              ) {
                                this.members.setMyID(
                                  this.pusher
                                    .user
                                    .user_data
                                    .id
                                )
                              } else {
                                return (
                                  (_ =
                                                                        b.buildLogSuffix(
                                                                          'authorizationEndpoint'
                                                                        )),
                                  A.error(
                                    "Invalid auth response for channel '" +
                                                                            this
                                                                              .name +
                                                                            "', " +
                                                                            ("expected 'channel_data' field. " +
                                                                                _ +
                                                                                ', ') +
                                                                            'or the user should be signed in.'
                                  ),
                                  r(
                                    'Invalid auth response'
                                  ),
                                  [2]
                                )
                              }
                              g.label = 3
                            case 3:
                              return r(o, u), [2]
                          }
                        })
                      }
                    )
                  }
                )
              }),
              (t.prototype.handleEvent = function (n) {
                const r = n.event
                if (r.indexOf('pusher_internal:') === 0) {
                  this.handleInternalEvent(n)
                } else {
                  const i = n.data
                  const o = {}
                  n.user_id && (o.user_id = n.user_id),
                  this.emit(r, i, o)
                }
              }),
              (t.prototype.handleInternalEvent = function (n) {
                const r = n.event
                const i = n.data
                switch (r) {
                  case 'pusher_internal:subscription_succeeded':
                    this.handleSubscriptionSucceededEvent(
                      n
                    )
                    break
                  case 'pusher_internal:subscription_count':
                    this.handleSubscriptionCountEvent(n)
                    break
                  case 'pusher_internal:member_added':
                    var o = this.members.addMember(i)
                    this.emit('pusher:member_added', o)
                    break
                  case 'pusher_internal:member_removed':
                    var u = this.members.removeMember(i)
                    u &&
                                            this.emit(
                                              'pusher:member_removed',
                                              u
                                            )
                    break
                }
              }),
              (t.prototype.handleSubscriptionSucceededEvent =
                                function (n) {
                                  (this.subscriptionPending = !1),
                                  (this.subscribed = !0),
                                  this.subscriptionCancelled
                                    ? this.pusher.unsubscribe(this.name)
                                    : (this.members.onSubscription(
                                        n.data
                                      ),
                                      this.emit(
                                        'pusher:subscription_succeeded',
                                        this.members
                                      ))
                                }),
              (t.prototype.disconnect = function () {
                this.members.reset(),
                e.prototype.disconnect.call(this)
              }),
              t
            )
          })(mt)
          const zn = Mn
          const Fn = a(1)
          const wt = a(0)
          const Bn = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const Xn = (function (e) {
            Bn(t, e)
            function t (n, r, i) {
              const o = e.call(this, n, r) || this
              return (o.key = null), (o.nacl = i), o
            }
            return (
              (t.prototype.authorize = function (n, r) {
                const i = this
                e.prototype.authorize.call(
                  this,
                  n,
                  function (o, u) {
                    if (o) {
                      r(o, u)
                      return
                    }
                    const p = u.shared_secret
                    if (!p) {
                      r(
                        new Error(
                          'No shared_secret key in auth payload for encrypted channel: ' +
                                                        i.name
                        ),
                        null
                      )
                      return
                    }
                    (i.key = Object(wt.decode)(p)),
                    delete u.shared_secret,
                    r(null, u)
                  }
                )
              }),
              (t.prototype.trigger = function (n, r) {
                throw new J(
                  'Client events are not currently supported for encrypted channels'
                )
              }),
              (t.prototype.handleEvent = function (n) {
                const r = n.event
                const i = n.data
                if (
                  r.indexOf('pusher_internal:') === 0 ||
                                    r.indexOf('pusher:') === 0
                ) {
                  e.prototype.handleEvent.call(this, n)
                  return
                }
                this.handleEncryptedEvent(r, i)
              }),
              (t.prototype.handleEncryptedEvent = function (
                n,
                r
              ) {
                const i = this
                if (!this.key) {
                  A.debug(
                    'Received encrypted event before key has been retrieved from the authEndpoint'
                  )
                  return
                }
                if (!r.ciphertext || !r.nonce) {
                  A.error(
                    'Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: ' +
                                            r
                  )
                  return
                }
                const o = Object(wt.decode)(r.ciphertext)
                if (
                  o.length <
                                    this.nacl.secretbox.overheadLength
                ) {
                  A.error(
                    'Expected encrypted event ciphertext length to be ' +
                                            this.nacl.secretbox.overheadLength +
                                            ', got: ' +
                                            o.length
                  )
                  return
                }
                const u = Object(wt.decode)(r.nonce)
                if (
                  u.length < this.nacl.secretbox.nonceLength
                ) {
                  A.error(
                    'Expected encrypted event nonce length to be ' +
                                            this.nacl.secretbox.nonceLength +
                                            ', got: ' +
                                            u.length
                  )
                  return
                }
                let p = this.nacl.secretbox.open(
                  o,
                  u,
                  this.key
                )
                if (p === null) {
                  A.debug(
                    'Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...'
                  ),
                  this.authorize(
                    this.pusher.connection.socket_id,
                    function (_, g) {
                      if (_) {
                        A.error(
                          'Failed to make a request to the authEndpoint: ' +
                                                            g +
                                                            '. Unable to fetch new key, so dropping encrypted event'
                        )
                        return
                      }
                      if (
                        ((p = i.nacl.secretbox.open(
                          o,
                          u,
                          i.key
                        )),
                        p === null)
                      ) {
                        A.error(
                          'Failed to decrypt event with new key. Dropping encrypted event'
                        )
                        return
                      }
                      i.emit(n, i.getDataToEmit(p))
                    }
                  )
                  return
                }
                this.emit(n, this.getDataToEmit(p))
              }),
              (t.prototype.getDataToEmit = function (n) {
                const r = Object(Fn.decode)(n)
                try {
                  return JSON.parse(r)
                } catch {
                  return r
                }
              }),
              t
            )
          })(mt)
          const Jn = Xn
          const Wn = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const Vn = (function (e) {
            Wn(t, e)
            function t (n, r) {
              const i = e.call(this) || this;
              (i.state = 'initialized'),
              (i.connection = null),
              (i.key = n),
              (i.options = r),
              (i.timeline = i.options.timeline),
              (i.usingTLS = i.options.useTLS),
              (i.errorCallbacks = i.buildErrorCallbacks()),
              (i.connectionCallbacks =
                                    i.buildConnectionCallbacks(
                                      i.errorCallbacks
                                    )),
              (i.handshakeCallbacks =
                                    i.buildHandshakeCallbacks(
                                      i.errorCallbacks
                                    ))
              const o = m.getNetwork()
              return (
                o.bind('online', function () {
                  i.timeline.info({ netinfo: 'online' }),
                  (i.state === 'connecting' ||
                                            i.state === 'unavailable') &&
                                            i.retryIn(0)
                }),
                o.bind('offline', function () {
                  i.timeline.info({ netinfo: 'offline' }),
                  i.connection && i.sendActivityCheck()
                }),
                i.updateStrategy(),
                i
              )
            }
            return (
              (t.prototype.connect = function () {
                if (!(this.connection || this.runner)) {
                  if (!this.strategy.isSupported()) {
                    this.updateState('failed')
                    return
                  }
                  this.updateState('connecting'),
                  this.startConnecting(),
                  this.setUnavailableTimer()
                }
              }),
              (t.prototype.send = function (n) {
                return this.connection
                  ? this.connection.send(n)
                  : !1
              }),
              (t.prototype.send_event = function (n, r, i) {
                return this.connection
                  ? this.connection.send_event(n, r, i)
                  : !1
              }),
              (t.prototype.disconnect = function () {
                this.disconnectInternally(),
                this.updateState('disconnected')
              }),
              (t.prototype.isUsingTLS = function () {
                return this.usingTLS
              }),
              (t.prototype.startConnecting = function () {
                const n = this
                const r = function (i, o) {
                  i
                    ? (n.runner = n.strategy.connect(0, r))
                    : o.action === 'error'
                      ? (n.emit('error', {
                          type: 'HandshakeError',
                          error: o.error
                        }),
                        n.timeline.error({
                          handshakeError: o.error
                        }))
                      : (n.abortConnecting(),
                        n.handshakeCallbacks[o.action](o))
                }
                this.runner = this.strategy.connect(0, r)
              }),
              (t.prototype.abortConnecting = function () {
                this.runner &&
                                    (this.runner.abort(), (this.runner = null))
              }),
              (t.prototype.disconnectInternally = function () {
                if (
                  (this.abortConnecting(),
                  this.clearRetryTimer(),
                  this.clearUnavailableTimer(),
                  this.connection)
                ) {
                  const n = this.abandonConnection()
                  n.close()
                }
              }),
              (t.prototype.updateStrategy = function () {
                this.strategy = this.options.getStrategy({
                  key: this.key,
                  timeline: this.timeline,
                  useTLS: this.usingTLS
                })
              }),
              (t.prototype.retryIn = function (n) {
                const r = this
                this.timeline.info({
                  action: 'retry',
                  delay: n
                }),
                n > 0 &&
                                        this.emit(
                                          'connecting_in',
                                          Math.round(n / 1e3)
                                        ),
                (this.retryTimer = new Q(
                  n || 0,
                  function () {
                    r.disconnectInternally(),
                    r.connect()
                  }
                ))
              }),
              (t.prototype.clearRetryTimer = function () {
                this.retryTimer &&
                                    (this.retryTimer.ensureAborted(),
                                    (this.retryTimer = null))
              }),
              (t.prototype.setUnavailableTimer = function () {
                const n = this
                this.unavailableTimer = new Q(
                  this.options.unavailableTimeout,
                  function () {
                    n.updateState('unavailable')
                  }
                )
              }),
              (t.prototype.clearUnavailableTimer = function () {
                this.unavailableTimer &&
                                    this.unavailableTimer.ensureAborted()
              }),
              (t.prototype.sendActivityCheck = function () {
                const n = this
                this.stopActivityCheck(),
                this.connection.ping(),
                (this.activityTimer = new Q(
                  this.options.pongTimeout,
                  function () {
                    n.timeline.error({
                      pong_timed_out:
                                                    n.options.pongTimeout
                    }),
                    n.retryIn(0)
                  }
                ))
              }),
              (t.prototype.resetActivityCheck = function () {
                const n = this
                this.stopActivityCheck(),
                this.connection &&
                                        !this.connection.handlesActivityChecks() &&
                                        (this.activityTimer = new Q(
                                          this.activityTimeout,
                                          function () {
                                            n.sendActivityCheck()
                                          }
                                        ))
              }),
              (t.prototype.stopActivityCheck = function () {
                this.activityTimer &&
                                    this.activityTimer.ensureAborted()
              }),
              (t.prototype.buildConnectionCallbacks = function (
                n
              ) {
                const r = this
                return U({}, n, {
                  message: function (i) {
                    r.resetActivityCheck(),
                    r.emit('message', i)
                  },
                  ping: function () {
                    r.send_event('pusher:pong', {})
                  },
                  activity: function () {
                    r.resetActivityCheck()
                  },
                  error: function (i) {
                    r.emit('error', i)
                  },
                  closed: function () {
                    r.abandonConnection(),
                    r.shouldRetry() && r.retryIn(1e3)
                  }
                })
              }),
              (t.prototype.buildHandshakeCallbacks = function (
                n
              ) {
                const r = this
                return U({}, n, {
                  connected: function (i) {
                    (r.activityTimeout = Math.min(
                      r.options.activityTimeout,
                      i.activityTimeout,
                      i.connection.activityTimeout ||
                                                1 / 0
                    )),
                    r.clearUnavailableTimer(),
                    r.setConnection(i.connection),
                    (r.socket_id = r.connection.id),
                    r.updateState('connected', {
                      socket_id: r.socket_id
                    })
                  }
                })
              }),
              (t.prototype.buildErrorCallbacks = function () {
                const n = this
                const r = function (i) {
                  return function (o) {
                    o.error &&
                                            n.emit('error', {
                                              type: 'WebSocketError',
                                              error: o.error
                                            }),
                    i(o)
                  }
                }
                return {
                  tls_only: r(function () {
                    (n.usingTLS = !0),
                    n.updateStrategy(),
                    n.retryIn(0)
                  }),
                  refused: r(function () {
                    n.disconnect()
                  }),
                  backoff: r(function () {
                    n.retryIn(1e3)
                  }),
                  retry: r(function () {
                    n.retryIn(0)
                  })
                }
              }),
              (t.prototype.setConnection = function (n) {
                this.connection = n
                for (const r in this.connectionCallbacks) {
                  this.connection.bind(
                    r,
                    this.connectionCallbacks[r]
                  )
                }
                this.resetActivityCheck()
              }),
              (t.prototype.abandonConnection = function () {
                if (this.connection) {
                  this.stopActivityCheck()
                  for (const n in this.connectionCallbacks) {
                    this.connection.unbind(
                      n,
                      this.connectionCallbacks[n]
                    )
                  }
                  const r = this.connection
                  return (this.connection = null), r
                }
              }),
              (t.prototype.updateState = function (n, r) {
                const i = this.state
                if (((this.state = n), i !== n)) {
                  let o = n
                  o === 'connected' &&
                                        (o +=
                                            ' with new socket ID ' +
                                            r.socket_id),
                  A.debug(
                    'State changed',
                    i + ' -> ' + o
                  ),
                  this.timeline.info({
                    state: n,
                    params: r
                  }),
                  this.emit('state_change', {
                    previous: i,
                    current: n
                  }),
                  this.emit(n, r)
                }
              }),
              (t.prototype.shouldRetry = function () {
                return (
                  this.state === 'connecting' ||
                                    this.state === 'connected'
                )
              }),
              t
            )
          })(V)
          const Gn = Vn
          const Qn = (function () {
            function e () {
              this.channels = {}
            }
            return (
              (e.prototype.add = function (t, n) {
                return (
                  this.channels[t] ||
                                        (this.channels[t] = Yn(t, n)),
                  this.channels[t]
                )
              }),
              (e.prototype.all = function () {
                return Ue(this.channels)
              }),
              (e.prototype.find = function (t) {
                return this.channels[t]
              }),
              (e.prototype.remove = function (t) {
                const n = this.channels[t]
                return delete this.channels[t], n
              }),
              (e.prototype.disconnect = function () {
                W(this.channels, function (t) {
                  t.disconnect()
                })
              }),
              e
            )
          })()
          const Kn = Qn
          function Yn (e, t) {
            if (e.indexOf('private-encrypted-') === 0) {
              if (t.config.nacl) {
                return G.createEncryptedChannel(
                  e,
                  t,
                  t.config.nacl
                )
              }
              const n =
                                'Tried to subscribe to a private-encrypted- channel but no nacl implementation available'
              const r = b.buildLogSuffix(
                'encryptedChannelSupport'
              )
              throw new J(n + '. ' + r)
            } else {
              if (e.indexOf('private-') === 0) {
                return G.createPrivateChannel(e, t)
              }
              if (e.indexOf('presence-') === 0) {
                return G.createPresenceChannel(e, t)
              }
              if (e.indexOf('#') === 0) {
                throw new O(
                  'Cannot create a channel with name "' +
                                        e +
                                        '".'
                )
              }
              return G.createChannel(e, t)
            }
          }
          const $n = {
            createChannels: function () {
              return new Kn()
            },
            createConnectionManager: function (e, t) {
              return new Gn(e, t)
            },
            createChannel: function (e, t) {
              return new bt(e, t)
            },
            createPrivateChannel: function (e, t) {
              return new mt(e, t)
            },
            createPresenceChannel: function (e, t) {
              return new zn(e, t)
            },
            createEncryptedChannel: function (e, t, n) {
              return new Jn(e, t, n)
            },
            createTimelineSender: function (e, t) {
              return new En(e, t)
            },
            createHandshake: function (e, t) {
              return new On(e, t)
            },
            createAssistantToTheTransportManager: function (
              e,
              t,
              n
            ) {
              return new Sn(e, t, n)
            }
          }
          var G = $n
          const Zn = (function () {
            function e (t) {
              (this.options = t || {}),
              (this.livesLeft = this.options.lives || 1 / 0)
            }
            return (
              (e.prototype.getAssistant = function (t) {
                return G.createAssistantToTheTransportManager(
                  this,
                  t,
                  {
                    minPingDelay: this.options.minPingDelay,
                    maxPingDelay: this.options.maxPingDelay
                  }
                )
              }),
              (e.prototype.isAlive = function () {
                return this.livesLeft > 0
              }),
              (e.prototype.reportDeath = function () {
                this.livesLeft -= 1
              }),
              e
            )
          })()
          const Gt = Zn
          const tr = (function () {
            function e (t, n) {
              (this.strategies = t),
              (this.loop = !!n.loop),
              (this.failFast = !!n.failFast),
              (this.timeout = n.timeout),
              (this.timeoutLimit = n.timeoutLimit)
            }
            return (
              (e.prototype.isSupported = function () {
                return zt(
                  this.strategies,
                  j.method('isSupported')
                )
              }),
              (e.prototype.connect = function (t, n) {
                const r = this
                const i = this.strategies
                let o = 0
                let u = this.timeout
                let p = null
                const _ = function (g, k) {
                  k
                    ? n(null, k)
                    : ((o = o + 1),
                      r.loop && (o = o % i.length),
                      o < i.length
                        ? (u &&
                                                    ((u = u * 2),
                                                    r.timeoutLimit &&
                                                        (u = Math.min(
                                                          u,
                                                          r.timeoutLimit
                                                        ))),
                          (p = r.tryStrategy(
                            i[o],
                            t,
                            {
                              timeout: u,
                              failFast: r.failFast
                            },
                            _
                          )))
                        : n(!0))
                }
                return (
                  (p = this.tryStrategy(
                    i[o],
                    t,
                    {
                      timeout: u,
                      failFast: this.failFast
                    },
                    _
                  )),
                  {
                    abort: function () {
                      p.abort()
                    },
                    forceMinPriority: function (g) {
                      (t = g), p && p.forceMinPriority(g)
                    }
                  }
                )
              }),
              (e.prototype.tryStrategy = function (t, n, r, i) {
                let o = null
                let u = null
                return (
                  r.timeout > 0 &&
                                        (o = new Q(r.timeout, function () {
                                          u.abort(), i(!0)
                                        })),
                  (u = t.connect(n, function (p, _) {
                    (p &&
                                            o &&
                                            o.isRunning() &&
                                            !r.failFast) ||
                                            (o && o.ensureAborted(), i(p, _))
                  })),
                  {
                    abort: function () {
                      o && o.ensureAborted(), u.abort()
                    },
                    forceMinPriority: function (p) {
                      u.forceMinPriority(p)
                    }
                  }
                )
              }),
              e
            )
          })()
          const Y = tr
          const er = (function () {
            function e (t) {
              this.strategies = t
            }
            return (
              (e.prototype.isSupported = function () {
                return zt(
                  this.strategies,
                  j.method('isSupported')
                )
              }),
              (e.prototype.connect = function (t, n) {
                return nr(this.strategies, t, function (r, i) {
                  return function (o, u) {
                    if (((i[r].error = o), o)) {
                      rr(i) && n(!0)
                      return
                    }
                    rt(i, function (p) {
                      p.forceMinPriority(
                        u.transport.priority
                      )
                    }),
                    n(null, u)
                  }
                })
              }),
              e
            )
          })()
          const kt = er
          function nr (e, t, n) {
            const r = Dt(e, function (i, o, u, p) {
              return i.connect(t, n(o, p))
            })
            return {
              abort: function () {
                rt(r, ir)
              },
              forceMinPriority: function (i) {
                rt(r, function (o) {
                  o.forceMinPriority(i)
                })
              }
            }
          }
          function rr (e) {
            return Me(e, function (t) {
              return !!t.error
            })
          }
          function ir (e) {
            !e.error && !e.aborted && (e.abort(), (e.aborted = !0))
          }
          const or = (function () {
            function e (t, n, r) {
              (this.strategy = t),
              (this.transports = n),
              (this.ttl = r.ttl || 1800 * 1e3),
              (this.usingTLS = r.useTLS),
              (this.timeline = r.timeline)
            }
            return (
              (e.prototype.isSupported = function () {
                return this.strategy.isSupported()
              }),
              (e.prototype.connect = function (t, n) {
                const r = this.usingTLS
                const i = ar(r)
                const o = [this.strategy]
                if (i && i.timestamp + this.ttl >= j.now()) {
                  const u = this.transports[i.transport]
                  u &&
                                        (this.timeline.info({
                                          cached: !0,
                                          transport: i.transport,
                                          latency: i.latency
                                        }),
                                        o.push(
                                          new Y([u], {
                                            timeout: i.latency * 2 + 1e3,
                                            failFast: !0
                                          })
                                        ))
                }
                let p = j.now()
                var _ = o.pop().connect(t, function g (k, E) {
                  k
                    ? (Qt(r),
                      o.length > 0
                        ? ((p = j.now()),
                          (_ = o.pop().connect(t, g)))
                        : n(k))
                    : (cr(r, E.transport.name, j.now() - p),
                      n(null, E))
                })
                return {
                  abort: function () {
                    _.abort()
                  },
                  forceMinPriority: function (g) {
                    (t = g), _ && _.forceMinPriority(g)
                  }
                }
              }),
              e
            )
          })()
          const sr = or
          function St (e) {
            return 'pusherTransport' + (e ? 'TLS' : 'NonTLS')
          }
          function ar (e) {
            const t = m.getLocalStorage()
            if (t) {
              try {
                const n = t[St(e)]
                if (n) return JSON.parse(n)
              } catch {
                Qt(e)
              }
            }
            return null
          }
          function cr (e, t, n) {
            const r = m.getLocalStorage()
            if (r) {
              try {
                r[St(e)] = ut({
                  timestamp: j.now(),
                  transport: t,
                  latency: n
                })
              } catch {}
            }
          }
          function Qt (e) {
            const t = m.getLocalStorage()
            if (t) {
              try {
                delete t[St(e)]
              } catch {}
            }
          }
          const ur = (function () {
            function e (t, n) {
              const r = n.delay;
              (this.strategy = t), (this.options = { delay: r })
            }
            return (
              (e.prototype.isSupported = function () {
                return this.strategy.isSupported()
              }),
              (e.prototype.connect = function (t, n) {
                const r = this.strategy
                let i
                const o = new Q(
                  this.options.delay,
                  function () {
                    i = r.connect(t, n)
                  }
                )
                return {
                  abort: function () {
                    o.ensureAborted(), i && i.abort()
                  },
                  forceMinPriority: function (u) {
                    (t = u), i && i.forceMinPriority(u)
                  }
                }
              }),
              e
            )
          })()
          const lt = ur
          const hr = (function () {
            function e (t, n, r) {
              (this.test = t),
              (this.trueBranch = n),
              (this.falseBranch = r)
            }
            return (
              (e.prototype.isSupported = function () {
                const t = this.test()
                  ? this.trueBranch
                  : this.falseBranch
                return t.isSupported()
              }),
              (e.prototype.connect = function (t, n) {
                const r = this.test()
                  ? this.trueBranch
                  : this.falseBranch
                return r.connect(t, n)
              }),
              e
            )
          })()
          const it = hr
          const lr = (function () {
            function e (t) {
              this.strategy = t
            }
            return (
              (e.prototype.isSupported = function () {
                return this.strategy.isSupported()
              }),
              (e.prototype.connect = function (t, n) {
                var r = this.strategy.connect(
                  t,
                  function (i, o) {
                    o && r.abort(), n(i, o)
                  }
                )
                return r
              }),
              e
            )
          })()
          const fr = lr
          function ot (e) {
            return function () {
              return e.isSupported()
            }
          }
          const pr = function (e, t, n) {
            const r = {}
            function i (ce, mi, wi, ki, Si) {
              const ue = n(e, ce, mi, wi, ki, Si)
              return (r[ce] = ue), ue
            }
            const o = Object.assign({}, t, {
              hostNonTLS: e.wsHost + ':' + e.wsPort,
              hostTLS: e.wsHost + ':' + e.wssPort,
              httpPath: e.wsPath
            })
            const u = Object.assign({}, o, { useTLS: !0 })
            const p = Object.assign({}, t, {
              hostNonTLS: e.httpHost + ':' + e.httpPort,
              hostTLS: e.httpHost + ':' + e.httpsPort,
              httpPath: e.httpPath
            })
            const _ = {
              loop: !0,
              timeout: 15e3,
              timeoutLimit: 6e4
            }
            const g = new Gt({
              lives: 2,
              minPingDelay: 1e4,
              maxPingDelay: e.activityTimeout
            })
            const k = new Gt({
              lives: 2,
              minPingDelay: 1e4,
              maxPingDelay: e.activityTimeout
            })
            const E = i('ws', 'ws', 3, o, g)
            const X = i('wss', 'ws', 3, u, g)
            const vi = i('sockjs', 'sockjs', 1, p)
            const ne = i('xhr_streaming', 'xhr_streaming', 1, p, k)
            const yi = i('xdr_streaming', 'xdr_streaming', 1, p, k)
            const re = i('xhr_polling', 'xhr_polling', 1, p)
            const gi = i('xdr_polling', 'xdr_polling', 1, p)
            const ie = new Y([E], _)
            const _i = new Y([X], _)
            const bi = new Y([vi], _)
            const oe = new Y([new it(ot(ne), ne, yi)], _)
            const se = new Y([new it(ot(re), re, gi)], _)
            const ae = new Y(
              [
                new it(
                  ot(oe),
                  new kt([oe, new lt(se, { delay: 4e3 })]),
                  se
                )
              ],
              _
            )
            const xt = new it(ot(ae), ae, bi)
            let Ot
            return (
              t.useTLS
                ? (Ot = new kt([
                    ie,
                    new lt(xt, { delay: 2e3 })
                  ]))
                : (Ot = new kt([
                    ie,
                    new lt(_i, { delay: 2e3 }),
                    new lt(xt, { delay: 5e3 })
                  ])),
              new sr(new fr(new it(ot(E), Ot, xt)), r, {
                ttl: 18e5,
                timeline: t.timeline,
                useTLS: t.useTLS
              })
            )
          }
          const dr = pr
          const vr = function () {
            const e = this
            e.timeline.info(
              e.buildTimelineMessage({
                transport:
                                    e.name + (e.options.useTLS ? 's' : '')
              })
            ),
            e.hooks.isInitialized()
              ? e.changeState('initialized')
              : e.hooks.file
                ? (e.changeState('initializing'),
                  S.load(
                    e.hooks.file,
                    { useTLS: e.options.useTLS },
                    function (t, n) {
                      e.hooks.isInitialized()
                        ? (e.changeState('initialized'),
                          n(!0))
                        : (t && e.onError(t),
                          e.onClose(),
                          n(!1))
                    }
                  ))
                : e.onClose()
          }
          const yr = {
            getRequest: function (e) {
              const t = new window.XDomainRequest()
              return (
                (t.ontimeout = function () {
                  e.emit('error', new I()), e.close()
                }),
                (t.onerror = function (n) {
                  e.emit('error', n), e.close()
                }),
                (t.onprogress = function () {
                  t.responseText &&
                                        t.responseText.length > 0 &&
                                        e.onChunk(200, t.responseText)
                }),
                (t.onload = function () {
                  t.responseText &&
                                        t.responseText.length > 0 &&
                                        e.onChunk(200, t.responseText),
                  e.emit('finished', 200),
                  e.close()
                }),
                t
              )
            },
            abortRequest: function (e) {
              (e.ontimeout =
                                e.onerror =
                                e.onprogress =
                                e.onload =
                                    null),
              e.abort()
            }
          }
          const gr = yr
          const _r = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const br = 256 * 1024
          const mr = (function (e) {
            _r(t, e)
            function t (n, r, i) {
              const o = e.call(this) || this
              return (
                (o.hooks = n), (o.method = r), (o.url = i), o
              )
            }
            return (
              (t.prototype.start = function (n) {
                const r = this;
                (this.position = 0),
                (this.xhr = this.hooks.getRequest(this)),
                (this.unloader = function () {
                  r.close()
                }),
                m.addUnloadListener(this.unloader),
                this.xhr.open(this.method, this.url, !0),
                this.xhr.setRequestHeader &&
                                        this.xhr.setRequestHeader(
                                          'Content-Type',
                                          'application/json'
                                        ),
                this.xhr.send(n)
              }),
              (t.prototype.close = function () {
                this.unloader &&
                                    (m.removeUnloadListener(this.unloader),
                                    (this.unloader = null)),
                this.xhr &&
                                        (this.hooks.abortRequest(this.xhr),
                                        (this.xhr = null))
              }),
              (t.prototype.onChunk = function (n, r) {
                for (;;) {
                  const i = this.advanceBuffer(r)
                  if (i) {
                    this.emit('chunk', {
                      status: n,
                      data: i
                    })
                  } else break
                }
                this.isBufferTooLong(r) &&
                                    this.emit('buffer_too_long')
              }),
              (t.prototype.advanceBuffer = function (n) {
                const r = n.slice(this.position)
                const i = r.indexOf(`
`)
                return i !== -1
                  ? ((this.position += i + 1), r.slice(0, i))
                  : null
              }),
              (t.prototype.isBufferTooLong = function (n) {
                return (
                  this.position === n.length && n.length > br
                )
              }),
              t
            )
          })(V)
          const wr = mr
          let Ct;
          (function (e) {
            (e[(e.CONNECTING = 0)] = 'CONNECTING'),
            (e[(e.OPEN = 1)] = 'OPEN'),
            (e[(e.CLOSED = 3)] = 'CLOSED')
          })(Ct || (Ct = {}))
          const $ = Ct
          let kr = 1
          const Sr = (function () {
            function e (t, n) {
              (this.hooks = t),
              (this.session = Yt(1e3) + '/' + xr(8)),
              (this.location = Cr(n)),
              (this.readyState = $.CONNECTING),
              this.openStream()
            }
            return (
              (e.prototype.send = function (t) {
                return this.sendRaw(JSON.stringify([t]))
              }),
              (e.prototype.ping = function () {
                this.hooks.sendHeartbeat(this)
              }),
              (e.prototype.close = function (t, n) {
                this.onClose(t, n, !0)
              }),
              (e.prototype.sendRaw = function (t) {
                if (this.readyState === $.OPEN) {
                  try {
                    return (
                      m
                        .createSocketRequest(
                          'POST',
                          Kt(
                            Tr(
                              this.location,
                              this.session
                            )
                          )
                        )
                        .start(t),
                      !0
                    )
                  } catch {
                    return !1
                  }
                } else return !1
              }),
              (e.prototype.reconnect = function () {
                this.closeStream(), this.openStream()
              }),
              (e.prototype.onClose = function (t, n, r) {
                this.closeStream(),
                (this.readyState = $.CLOSED),
                this.onclose &&
                                        this.onclose({
                                          code: t,
                                          reason: n,
                                          wasClean: r
                                        })
              }),
              (e.prototype.onChunk = function (t) {
                if (t.status === 200) {
                  this.readyState === $.OPEN &&
                                        this.onActivity()
                  let n
                  const r = t.data.slice(0, 1)
                  switch (r) {
                    case 'o':
                      (n = JSON.parse(
                        t.data.slice(1) || '{}'
                      )),
                      this.onOpen(n)
                      break
                    case 'a':
                      n = JSON.parse(
                        t.data.slice(1) || '[]'
                      )
                      for (let i = 0; i < n.length; i++) {
                        this.onEvent(n[i])
                      }
                      break
                    case 'm':
                      (n = JSON.parse(
                        t.data.slice(1) || 'null'
                      )),
                      this.onEvent(n)
                      break
                    case 'h':
                      this.hooks.onHeartbeat(this)
                      break
                    case 'c':
                      (n = JSON.parse(
                        t.data.slice(1) || '[]'
                      )),
                      this.onClose(n[0], n[1], !0)
                      break
                  }
                }
              }),
              (e.prototype.onOpen = function (t) {
                this.readyState === $.CONNECTING
                  ? (t &&
                                          t.hostname &&
                                          (this.location.base = Pr(
                                            this.location.base,
                                            t.hostname
                                          )),
                    (this.readyState = $.OPEN),
                    this.onopen && this.onopen())
                  : this.onClose(
                    1006,
                    'Server lost session',
                    !0
                  )
              }),
              (e.prototype.onEvent = function (t) {
                this.readyState === $.OPEN &&
                                    this.onmessage &&
                                    this.onmessage({ data: t })
              }),
              (e.prototype.onActivity = function () {
                this.onactivity && this.onactivity()
              }),
              (e.prototype.onError = function (t) {
                this.onerror && this.onerror(t)
              }),
              (e.prototype.openStream = function () {
                const t = this;
                (this.stream = m.createSocketRequest(
                  'POST',
                  Kt(
                    this.hooks.getReceiveURL(
                      this.location,
                      this.session
                    )
                  )
                )),
                this.stream.bind('chunk', function (n) {
                  t.onChunk(n)
                }),
                this.stream.bind('finished', function (n) {
                  t.hooks.onFinished(t, n)
                }),
                this.stream.bind(
                  'buffer_too_long',
                  function () {
                    t.reconnect()
                  }
                )
                try {
                  this.stream.start()
                } catch (n) {
                  j.defer(function () {
                    t.onError(n),
                    t.onClose(
                      1006,
                      'Could not start streaming',
                      !1
                    )
                  })
                }
              }),
              (e.prototype.closeStream = function () {
                this.stream &&
                                    (this.stream.unbind_all(),
                                    this.stream.close(),
                                    (this.stream = null))
              }),
              e
            )
          })()
          function Cr (e) {
            const t = /([^\?]*)\/*(\??.*)/.exec(e)
            return { base: t[1], queryString: t[2] }
          }
          function Tr (e, t) {
            return e.base + '/' + t + '/xhr_send'
          }
          function Kt (e) {
            const t = e.indexOf('?') === -1 ? '?' : '&'
            return e + t + 't=' + +new Date() + '&n=' + kr++
          }
          function Pr (e, t) {
            const n = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(e)
            return n[1] + t + n[3]
          }
          function Yt (e) {
            return m.randomInt(e)
          }
          function xr (e) {
            for (var t = [], n = 0; n < e; n++) {
              t.push(Yt(32).toString(32))
            }
            return t.join('')
          }
          const Or = Sr
          const Ar = {
            getReceiveURL: function (e, t) {
              return (
                e.base +
                                '/' +
                                t +
                                '/xhr_streaming' +
                                e.queryString
              )
            },
            onHeartbeat: function (e) {
              e.sendRaw('[]')
            },
            sendHeartbeat: function (e) {
              e.sendRaw('[]')
            },
            onFinished: function (e, t) {
              e.onClose(
                1006,
                'Connection interrupted (' + t + ')',
                !1
              )
            }
          }
          const Er = Ar
          const Lr = {
            getReceiveURL: function (e, t) {
              return e.base + '/' + t + '/xhr' + e.queryString
            },
            onHeartbeat: function () {},
            sendHeartbeat: function (e) {
              e.sendRaw('[]')
            },
            onFinished: function (e, t) {
              t === 200
                ? e.reconnect()
                : e.onClose(
                  1006,
                  'Connection interrupted (' + t + ')',
                  !1
                )
            }
          }
          const Rr = Lr
          const Ir = {
            getRequest: function (e) {
              const t = m.getXHRAPI()
              const n = new t()
              return (
                (n.onreadystatechange = n.onprogress =
                                    function () {
                                      switch (n.readyState) {
                                        case 3:
                                          n.responseText &&
                                                    n.responseText.length > 0 &&
                                                    e.onChunk(
                                                      n.status,
                                                      n.responseText
                                                    )
                                          break
                                        case 4:
                                          n.responseText &&
                                                    n.responseText.length > 0 &&
                                                    e.onChunk(
                                                      n.status,
                                                      n.responseText
                                                    ),
                                          e.emit(
                                            'finished',
                                            n.status
                                          ),
                                          e.close()
                                          break
                                      }
                                    }),
                n
              )
            },
            abortRequest: function (e) {
              (e.onreadystatechange = null), e.abort()
            }
          }
          const jr = Ir
          const Nr = {
            createStreamingSocket: function (e) {
              return this.createSocket(Er, e)
            },
            createPollingSocket: function (e) {
              return this.createSocket(Rr, e)
            },
            createSocket: function (e, t) {
              return new Or(e, t)
            },
            createXHR: function (e, t) {
              return this.createRequest(jr, e, t)
            },
            createRequest: function (e, t, n) {
              return new wr(e, t, n)
            }
          }
          const $t = Nr
          $t.createXDR = function (e, t) {
            return this.createRequest(gr, e, t)
          }
          const qr = $t
          const Ur = {
            nextAuthCallbackID: 1,
            auth_callbacks: {},
            ScriptReceivers: s,
            DependenciesReceivers: T,
            getDefaultStrategy: dr,
            Transports: _n,
            transportConnectionInitializer: vr,
            HTTPFactory: qr,
            TimelineTransport: Ze,
            getXHRAPI: function () {
              return window.XMLHttpRequest
            },
            getWebSocketAPI: function () {
              return window.WebSocket || window.MozWebSocket
            },
            setup: function (e) {
              const t = this
              window.Pusher = e
              const n = function () {
                t.onDocumentBody(e.ready)
              }
              window.JSON ? n() : S.load('json2', {}, n)
            },
            getDocument: function () {
              return document
            },
            getProtocol: function () {
              return this.getDocument().location.protocol
            },
            getAuthorizers: function () {
              return { ajax: Se, jsonp: We }
            },
            onDocumentBody: function (e) {
              const t = this
              document.body
                ? e()
                : setTimeout(function () {
                  t.onDocumentBody(e)
                }, 0)
            },
            createJSONPRequest: function (e, t) {
              return new Ke(e, t)
            },
            createScriptRequest: function (e) {
              return new Ge(e)
            },
            getLocalStorage: function () {
              try {
                return window.localStorage
              } catch {}
            },
            createXHR: function () {
              return this.getXHRAPI()
                ? this.createXMLHttpRequest()
                : this.createMicrosoftXHR()
            },
            createXMLHttpRequest: function () {
              const e = this.getXHRAPI()
              return new e()
            },
            createMicrosoftXHR: function () {
              return new ActiveXObject('Microsoft.XMLHTTP')
            },
            getNetwork: function () {
              return wn
            },
            createWebSocket: function (e) {
              const t = this.getWebSocketAPI()
              return new t(e)
            },
            createSocketRequest: function (e, t) {
              if (this.isXHRSupported()) {
                return this.HTTPFactory.createXHR(e, t)
              }
              if (
                this.isXDRSupported(t.indexOf('https:') === 0)
              ) {
                return this.HTTPFactory.createXDR(e, t)
              }
              throw 'Cross-origin HTTP requests are not supported'
            },
            isXHRSupported: function () {
              const e = this.getXHRAPI()
              return !!e && new e().withCredentials !== void 0
            },
            isXDRSupported: function (e) {
              const t = e ? 'https:' : 'http:'
              const n = this.getProtocol()
              return !!window.XDomainRequest && n === t
            },
            addUnloadListener: function (e) {
              window.addEventListener !== void 0
                ? window.addEventListener('unload', e, !1)
                : window.attachEvent !== void 0 &&
                                  window.attachEvent('onunload', e)
            },
            removeUnloadListener: function (e) {
              window.addEventListener !== void 0
                ? window.removeEventListener('unload', e, !1)
                : window.detachEvent !== void 0 &&
                                  window.detachEvent('onunload', e)
            },
            randomInt: function (e) {
              const t = function () {
                const n = window.crypto || window.msCrypto
                const r = n.getRandomValues(
                  new Uint32Array(1)
                )[0]
                return r / Math.pow(2, 32)
              }
              return Math.floor(t() * e)
            }
          }
          var m = Ur
          let Tt;
          (function (e) {
            (e[(e.ERROR = 3)] = 'ERROR'),
            (e[(e.INFO = 6)] = 'INFO'),
            (e[(e.DEBUG = 7)] = 'DEBUG')
          })(Tt || (Tt = {}))
          const ft = Tt
          const Dr = (function () {
            function e (t, n, r) {
              (this.key = t),
              (this.session = n),
              (this.events = []),
              (this.options = r || {}),
              (this.sent = 0),
              (this.uniqueID = 0)
            }
            return (
              (e.prototype.log = function (t, n) {
                t <= this.options.level &&
                                    (this.events.push(
                                      U({}, n, { timestamp: j.now() })
                                    ),
                                    this.options.limit &&
                                        this.events.length >
                                            this.options.limit &&
                                        this.events.shift())
              }),
              (e.prototype.error = function (t) {
                this.log(ft.ERROR, t)
              }),
              (e.prototype.info = function (t) {
                this.log(ft.INFO, t)
              }),
              (e.prototype.debug = function (t) {
                this.log(ft.DEBUG, t)
              }),
              (e.prototype.isEmpty = function () {
                return this.events.length === 0
              }),
              (e.prototype.send = function (t, n) {
                const r = this
                const i = U(
                  {
                    session: this.session,
                    bundle: this.sent + 1,
                    key: this.key,
                    lib: 'js',
                    version: this.options.version,
                    cluster: this.options.cluster,
                    features: this.options.features,
                    timeline: this.events
                  },
                  this.options.params
                )
                return (
                  (this.events = []),
                  t(i, function (o, u) {
                    o || r.sent++, n && n(o, u)
                  }),
                  !0
                )
              }),
              (e.prototype.generateUniqueID = function () {
                return this.uniqueID++, this.uniqueID
              }),
              e
            )
          })()
          const Hr = Dr
          const Mr = (function () {
            function e (t, n, r, i) {
              (this.name = t),
              (this.priority = n),
              (this.transport = r),
              (this.options = i || {})
            }
            return (
              (e.prototype.isSupported = function () {
                return this.transport.isSupported({
                  useTLS: this.options.useTLS
                })
              }),
              (e.prototype.connect = function (t, n) {
                const r = this
                if (this.isSupported()) {
                  if (this.priority < t) {
                    return Zt(new q(), n)
                  }
                } else return Zt(new z(), n)
                let i = !1
                const o = this.transport.createConnection(
                  this.name,
                  this.priority,
                  this.options.key,
                  this.options
                )
                let u = null
                const p = function () {
                  o.unbind('initialized', p), o.connect()
                }
                const _ = function () {
                  u = G.createHandshake(o, function (X) {
                    (i = !0), E(), n(null, X)
                  })
                }
                const g = function (X) {
                  E(), n(X)
                }
                const k = function () {
                  E()
                  let X;
                  (X = ut(o)), n(new M(X))
                }
                var E = function () {
                  o.unbind('initialized', p),
                  o.unbind('open', _),
                  o.unbind('error', g),
                  o.unbind('closed', k)
                }
                return (
                  o.bind('initialized', p),
                  o.bind('open', _),
                  o.bind('error', g),
                  o.bind('closed', k),
                  o.initialize(),
                  {
                    abort: function () {
                      i ||
                                                (E(),
                                                u ? u.close() : o.close())
                    },
                    forceMinPriority: function (X) {
                      i ||
                                                (r.priority < X &&
                                                    (u
                                                      ? u.close()
                                                      : o.close()))
                    }
                  }
                )
              }),
              e
            )
          })()
          const zr = Mr
          function Zt (e, t) {
            return (
              j.defer(function () {
                t(e)
              }),
              {
                abort: function () {},
                forceMinPriority: function () {}
              }
            )
          }
          const Fr = m.Transports
          const Br = function (e, t, n, r, i, o) {
            const u = Fr[n]
            if (!u) throw new F(n)
            const p =
                            (!e.enabledTransports ||
                                qt(e.enabledTransports, t) !== -1) &&
                            (!e.disabledTransports ||
                                qt(e.disabledTransports, t) === -1)
            let _
            return (
              p
                ? ((i = Object.assign(
                    {
                      ignoreNullOrigin: e.ignoreNullOrigin
                    },
                    i
                  )),
                  (_ = new zr(
                    t,
                    r,
                    o ? o.getAssistant(u) : u,
                    i
                  )))
                : (_ = Xr),
              _
            )
          }
          var Xr = {
            isSupported: function () {
              return !1
            },
            connect: function (e, t) {
              const n = j.defer(function () {
                t(new z())
              })
              return {
                abort: function () {
                  n.ensureAborted()
                },
                forceMinPriority: function () {}
              }
            }
          }
          const Jr = function (e, t) {
            let n = 'socket_id=' + encodeURIComponent(e.socketId)
            for (var r in t.params) {
              n +=
                                '&' +
                                encodeURIComponent(r) +
                                '=' +
                                encodeURIComponent(t.params[r])
            }
            if (t.paramsProvider != null) {
              const i = t.paramsProvider()
              for (var r in i) {
                n +=
                                    '&' +
                                    encodeURIComponent(r) +
                                    '=' +
                                    encodeURIComponent(i[r])
              }
            }
            return n
          }
          const Wr = function (e) {
            if (typeof m.getAuthorizers()[e.transport] > 'u') {
              throw (
                "'" +
                                e.transport +
                                "' is not a recognized auth transport"
              )
            }
            return function (t, n) {
              const r = Jr(t, e)
              m.getAuthorizers()[e.transport](
                m,
                r,
                e,
                v.UserAuthentication,
                n
              )
            }
          }
          const Vr = Wr
          const Gr = function (e, t) {
            let n = 'socket_id=' + encodeURIComponent(e.socketId)
            n +=
                            '&channel_name=' +
                            encodeURIComponent(e.channelName)
            for (var r in t.params) {
              n +=
                                '&' +
                                encodeURIComponent(r) +
                                '=' +
                                encodeURIComponent(t.params[r])
            }
            if (t.paramsProvider != null) {
              const i = t.paramsProvider()
              for (var r in i) {
                n +=
                                    '&' +
                                    encodeURIComponent(r) +
                                    '=' +
                                    encodeURIComponent(i[r])
              }
            }
            return n
          }
          const Qr = function (e) {
            if (typeof m.getAuthorizers()[e.transport] > 'u') {
              throw (
                "'" +
                                e.transport +
                                "' is not a recognized auth transport"
              )
            }
            return function (t, n) {
              const r = Gr(t, e)
              m.getAuthorizers()[e.transport](
                m,
                r,
                e,
                v.ChannelAuthorization,
                n
              )
            }
          }
          const Kr = Qr
          const Yr = function (e, t, n) {
            const r = {
              authTransport: t.transport,
              authEndpoint: t.endpoint,
              auth: { params: t.params, headers: t.headers }
            }
            return function (i, o) {
              const u = e.channel(i.channelName)
              const p = n(u, r)
              p.authorize(i.socketId, o)
            }
          }
          let et = function () {
            return (
              (et =
                                Object.assign ||
                                function (e) {
                                  for (
                                    var t, n = 1, r = arguments.length;
                                    n < r;
                                    n++
                                  ) {
                                    t = arguments[n]
                                    for (const i in t) {
                                      Object.prototype.hasOwnProperty.call(
                                        t,
                                        i
                                      ) && (e[i] = t[i])
                                    }
                                  }
                                  return e
                                }),
              et.apply(this, arguments)
            )
          }
          function $r (e, t) {
            const n = {
              activityTimeout:
                                e.activityTimeout || d.activityTimeout,
              cluster: e.cluster || d.cluster,
              httpPath: e.httpPath || d.httpPath,
              httpPort: e.httpPort || d.httpPort,
              httpsPort: e.httpsPort || d.httpsPort,
              pongTimeout: e.pongTimeout || d.pongTimeout,
              statsHost: e.statsHost || d.stats_host,
              unavailableTimeout:
                                e.unavailableTimeout || d.unavailableTimeout,
              wsPath: e.wsPath || d.wsPath,
              wsPort: e.wsPort || d.wsPort,
              wssPort: e.wssPort || d.wssPort,
              enableStats: ni(e),
              httpHost: Zr(e),
              useTLS: ei(e),
              wsHost: ti(e),
              userAuthenticator: ri(e),
              channelAuthorizer: oi(e, t)
            }
            return (
              'disabledTransports' in e &&
                                (n.disabledTransports = e.disabledTransports),
              'enabledTransports' in e &&
                                (n.enabledTransports = e.enabledTransports),
              'ignoreNullOrigin' in e &&
                                (n.ignoreNullOrigin = e.ignoreNullOrigin),
              'timelineParams' in e &&
                                (n.timelineParams = e.timelineParams),
              'nacl' in e && (n.nacl = e.nacl),
              n
            )
          }
          function Zr (e) {
            return e.httpHost
              ? e.httpHost
              : e.cluster
                ? 'sockjs-' + e.cluster + '.pusher.com'
                : d.httpHost
          }
          function ti (e) {
            return e.wsHost
              ? e.wsHost
              : e.cluster
                ? te(e.cluster)
                : te(d.cluster)
          }
          function te (e) {
            return 'ws-' + e + '.pusher.com'
          }
          function ei (e) {
            return m.getProtocol() === 'https:'
              ? !0
              : e.forceTLS !== !1
          }
          function ni (e) {
            return 'enableStats' in e
              ? e.enableStats
              : 'disableStats' in e
                ? !e.disableStats
                : !1
          }
          function ri (e) {
            const t = et(
              et({}, d.userAuthentication),
              e.userAuthentication
            )
            return 'customHandler' in t && t.customHandler != null
              ? t.customHandler
              : Vr(t)
          }
          function ii (e, t) {
            let n
            return (
              'channelAuthorization' in e
                ? (n = et(
                    et({}, d.channelAuthorization),
                    e.channelAuthorization
                  ))
                : ((n = {
                    transport:
                                          e.authTransport || d.authTransport,
                    endpoint:
                                          e.authEndpoint || d.authEndpoint
                  }),
                  'auth' in e &&
                                      ('params' in e.auth &&
                                          (n.params = e.auth.params),
                                      'headers' in e.auth &&
                                          (n.headers = e.auth.headers)),
                  'authorizer' in e &&
                                      (n.customHandler = Yr(
                                        t,
                                        n,
                                        e.authorizer
                                      ))),
              n
            )
          }
          function oi (e, t) {
            const n = ii(e, t)
            return 'customHandler' in n && n.customHandler != null
              ? n.customHandler
              : Kr(n)
          }
          const si = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const ai = (function (e) {
            si(t, e)
            function t (n) {
              const r =
                                e.call(this, function (i, o) {
                                  A.debug(
                                    'No callbacks on watchlist events for ' +
                                            i
                                  )
                                }) || this
              return (
                (r.pusher = n),
                r.bindWatchlistInternalEvent(),
                r
              )
            }
            return (
              (t.prototype.handleEvent = function (n) {
                const r = this
                n.data.events.forEach(function (i) {
                  r.emit(i.name, i)
                })
              }),
              (t.prototype.bindWatchlistInternalEvent =
                                function () {
                                  const n = this
                                  this.pusher.connection.bind(
                                    'message',
                                    function (r) {
                                      const i = r.event
                                      i ===
                                                'pusher_internal:watchlist_events' &&
                                                n.handleEvent(r)
                                    }
                                  )
                                }),
              t
            )
          })(V)
          const ci = ai
          function ui () {
            let e
            let t
            const n = new Promise(function (r, i) {
              (e = r), (t = i)
            })
            return { promise: n, resolve: e, reject: t }
          }
          const hi = ui
          const li = (function () {
            let e = function (t, n) {
              return (
                (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (r, i) {
                                          r.__proto__ = i
                                        }) ||
                                    function (r, i) {
                                      for (const o in i) {
                                        i.hasOwnProperty(o) &&
                                                (r[o] = i[o])
                                      }
                                    }),
                e(t, n)
              )
            }
            return function (t, n) {
              e(t, n)
              function r () {
                this.constructor = t
              }
              t.prototype =
                                n === null
                                  ? Object.create(n)
                                  : ((r.prototype = n.prototype), new r())
            }
          })()
          const fi = (function (e) {
            li(t, e)
            function t (n) {
              const r =
                                e.call(this, function (i, o) {
                                  A.debug('No callbacks on user for ' + i)
                                }) || this
              return (
                (r.signin_requested = !1),
                (r.user_data = null),
                (r.serverToUserChannel = null),
                (r.signinDonePromise = null),
                (r._signinDoneResolve = null),
                (r._onAuthorize = function (i, o) {
                  if (i) {
                    A.warn('Error during signin: ' + i),
                    r._cleanup()
                    return
                  }
                  r.pusher.send_event('pusher:signin', {
                    auth: o.auth,
                    user_data: o.user_data
                  })
                }),
                (r.pusher = n),
                r.pusher.connection.bind(
                  'state_change',
                  function (i) {
                    const o = i.previous
                    const u = i.current
                    o !== 'connected' &&
                                            u === 'connected' &&
                                            r._signin(),
                    o === 'connected' &&
                                                u !== 'connected' &&
                                                (r._cleanup(),
                                                r._newSigninPromiseIfNeeded())
                  }
                ),
                (r.watchlist = new ci(n)),
                r.pusher.connection.bind(
                  'message',
                  function (i) {
                    const o = i.event
                    o === 'pusher:signin_success' &&
                                            r._onSigninSuccess(i.data),
                    r.serverToUserChannel &&
                                                r.serverToUserChannel.name ===
                                                    i.channel &&
                                                r.serverToUserChannel.handleEvent(
                                                  i
                                                )
                  }
                ),
                r
              )
            }
            return (
              (t.prototype.signin = function () {
                this.signin_requested ||
                                    ((this.signin_requested = !0),
                                    this._signin())
              }),
              (t.prototype._signin = function () {
                this.signin_requested &&
                                    (this._newSigninPromiseIfNeeded(),
                                    this.pusher.connection.state ===
                                        'connected' &&
                                        this.pusher.config.userAuthenticator(
                                          {
                                            socketId:
                                                    this.pusher.connection
                                                      .socket_id
                                          },
                                          this._onAuthorize
                                        ))
              }),
              (t.prototype._onSigninSuccess = function (n) {
                try {
                  this.user_data = JSON.parse(n.user_data)
                } catch {
                  A.error(
                    'Failed parsing user data after signin: ' +
                                            n.user_data
                  ),
                  this._cleanup()
                  return
                }
                if (
                  typeof this.user_data.id !== 'string' ||
                                    this.user_data.id === ''
                ) {
                  A.error(
                    "user_data doesn't contain an id. user_data: " +
                                            this.user_data
                  ),
                  this._cleanup()
                  return
                }
                this._signinDoneResolve(),
                this._subscribeChannels()
              }),
              (t.prototype._subscribeChannels = function () {
                const n = this
                const r = function (i) {
                  i.subscriptionPending &&
                                    i.subscriptionCancelled
                    ? i.reinstateSubscription()
                    : !i.subscriptionPending &&
                                          n.pusher.connection.state ===
                                              'connected' &&
                                          i.subscribe()
                };
                (this.serverToUserChannel = new bt(
                  '#server-to-user-' + this.user_data.id,
                  this.pusher
                )),
                this.serverToUserChannel.bind_global(
                  function (i, o) {
                    i.indexOf('pusher_internal:') ===
                                                0 ||
                                                i.indexOf('pusher:') === 0 ||
                                                n.emit(i, o)
                  }
                ),
                r(this.serverToUserChannel)
              }),
              (t.prototype._cleanup = function () {
                (this.user_data = null),
                this.serverToUserChannel &&
                                        (this.serverToUserChannel.unbind_all(),
                                        this.serverToUserChannel.disconnect(),
                                        (this.serverToUserChannel = null)),
                this.signin_requested &&
                                        this._signinDoneResolve()
              }),
              (t.prototype._newSigninPromiseIfNeeded =
                                function () {
                                  if (
                                    this.signin_requested &&
                                        !(
                                          this.signinDonePromise &&
                                            !this.signinDonePromise.done
                                        )
                                  ) {
                                    const n = hi()
                                    const r = n.promise
                                    const i = n.resolve
                                    const o = n.reject
                                    r.done = !1
                                    const u = function () {
                                      r.done = !0
                                    }
                                    r.then(u).catch(u),
                                    (this.signinDonePromise = r),
                                    (this._signinDoneResolve = i)
                                  }
                                }),
              t
            )
          })(V)
          const pi = fi
          const ee = (function () {
            function e (t, n) {
              const r = this
              if (
                (di(t),
                (n = n || {}),
                !n.cluster && !(n.wsHost || n.httpHost))
              ) {
                const i = b.buildLogSuffix(
                  'javascriptQuickStart'
                )
                A.warn(
                  'You should always specify a cluster when connecting. ' +
                                        i
                )
              }
              'disableStats' in n &&
                                A.warn(
                                  'The disableStats option is deprecated in favor of enableStats'
                                ),
              (this.key = t),
              (this.config = $r(n, this)),
              (this.channels = G.createChannels()),
              (this.global_emitter = new V()),
              (this.sessionID = m.randomInt(1e9)),
              (this.timeline = new Hr(
                this.key,
                this.sessionID,
                {
                  cluster: this.config.cluster,
                  features: e.getClientFeatures(),
                  params:
                                            this.config.timelineParams || {},
                  limit: 50,
                  level: ft.INFO,
                  version: d.VERSION
                }
              )),
              this.config.enableStats &&
                                    (this.timelineSender =
                                        G.createTimelineSender(this.timeline, {
                                          host: this.config.statsHost,
                                          path:
                                                '/timeline/v2/' +
                                                m.TimelineTransport.name
                                        }))
              const o = function (u) {
                return m.getDefaultStrategy(r.config, u, Br)
              };
              (this.connection = G.createConnectionManager(
                this.key,
                {
                  getStrategy: o,
                  timeline: this.timeline,
                  activityTimeout:
                                        this.config.activityTimeout,
                  pongTimeout: this.config.pongTimeout,
                  unavailableTimeout:
                                        this.config.unavailableTimeout,
                  useTLS: !!this.config.useTLS
                }
              )),
              this.connection.bind('connected', function () {
                r.subscribeAll(),
                r.timelineSender &&
                                            r.timelineSender.send(
                                              r.connection.isUsingTLS()
                                            )
              }),
              this.connection.bind('message', function (u) {
                const p = u.event
                const _ =
                                        p.indexOf('pusher_internal:') === 0
                if (u.channel) {
                  const g = r.channel(u.channel)
                  g && g.handleEvent(u)
                }
                _ || r.global_emitter.emit(u.event, u.data)
              }),
              this.connection.bind('connecting', function () {
                r.channels.disconnect()
              }),
              this.connection.bind(
                'disconnected',
                function () {
                  r.channels.disconnect()
                }
              ),
              this.connection.bind('error', function (u) {
                A.warn(u)
              }),
              e.instances.push(this),
              this.timeline.info({
                instances: e.instances.length
              }),
              (this.user = new pi(this)),
              e.isReady && this.connect()
            }
            return (
              (e.ready = function () {
                e.isReady = !0
                for (
                  let t = 0, n = e.instances.length;
                  t < n;
                  t++
                ) {
                  e.instances[t].connect()
                }
              }),
              (e.getClientFeatures = function () {
                return Ut(
                  Mt({ ws: m.Transports.ws }, function (t) {
                    return t.isSupported({})
                  })
                )
              }),
              (e.prototype.channel = function (t) {
                return this.channels.find(t)
              }),
              (e.prototype.allChannels = function () {
                return this.channels.all()
              }),
              (e.prototype.connect = function () {
                if (
                  (this.connection.connect(),
                  this.timelineSender &&
                                        !this.timelineSenderTimer)
                ) {
                  const t = this.connection.isUsingTLS()
                  const n = this.timelineSender
                  this.timelineSenderTimer = new je(
                    6e4,
                    function () {
                      n.send(t)
                    }
                  )
                }
              }),
              (e.prototype.disconnect = function () {
                this.connection.disconnect(),
                this.timelineSenderTimer &&
                                        (this.timelineSenderTimer.ensureAborted(),
                                        (this.timelineSenderTimer = null))
              }),
              (e.prototype.bind = function (t, n, r) {
                return this.global_emitter.bind(t, n, r), this
              }),
              (e.prototype.unbind = function (t, n, r) {
                return (
                  this.global_emitter.unbind(t, n, r), this
                )
              }),
              (e.prototype.bind_global = function (t) {
                return this.global_emitter.bind_global(t), this
              }),
              (e.prototype.unbind_global = function (t) {
                return (
                  this.global_emitter.unbind_global(t), this
                )
              }),
              (e.prototype.unbind_all = function (t) {
                return this.global_emitter.unbind_all(), this
              }),
              (e.prototype.subscribeAll = function () {
                let t
                for (t in this.channels.channels) {
                  this.channels.channels.hasOwnProperty(t) &&
                                        this.subscribe(t)
                }
              }),
              (e.prototype.subscribe = function (t) {
                const n = this.channels.add(t, this)
                return (
                  n.subscriptionPending &&
                                    n.subscriptionCancelled
                    ? n.reinstateSubscription()
                    : !n.subscriptionPending &&
                                          this.connection.state ===
                                              'connected' &&
                                          n.subscribe(),
                  n
                )
              }),
              (e.prototype.unsubscribe = function (t) {
                let n = this.channels.find(t)
                n && n.subscriptionPending
                  ? n.cancelSubscription()
                  : ((n = this.channels.remove(t)),
                    n && n.subscribed && n.unsubscribe())
              }),
              (e.prototype.send_event = function (t, n, r) {
                return this.connection.send_event(t, n, r)
              }),
              (e.prototype.shouldUseTLS = function () {
                return this.config.useTLS
              }),
              (e.prototype.signin = function () {
                this.user.signin()
              }),
              (e.instances = []),
              (e.isReady = !1),
              (e.logToConsole = !1),
              (e.Runtime = m),
              (e.ScriptReceivers = m.ScriptReceivers),
              (e.DependenciesReceivers = m.DependenciesReceivers),
              (e.auth_callbacks = m.auth_callbacks),
              e
            )
          })()
          var Pt = (h.default = ee)
          function di (e) {
            if (e == null) {
              throw 'You must pass your app key when you instantiate Pusher.'
            }
          }
          m.setup(ee)
        }
      ])
    })
  })
  function st (l) {
    '@babel/helpers - typeof'
    return (
      (st =
                typeof Symbol === 'function' &&
                typeof Symbol.iterator === 'symbol'
                  ? function (h) {
                    return typeof h
                  }
                  : function (h) {
                    return h &&
                              typeof Symbol === 'function' &&
                              h.constructor === Symbol &&
                              h !== Symbol.prototype
                      ? 'symbol'
                      : typeof h
                  }),
      st(l)
    )
  }
  function L (l, h) {
    if (!(l instanceof h)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }
  function le (l, h) {
    for (let a = 0; a < h.length; a++) {
      const c = h[a];
      (c.enumerable = c.enumerable || !1),
      (c.configurable = !0),
      'value' in c && (c.writable = !0),
      Object.defineProperty(l, c.key, c)
    }
  }
  function R (l, h, a) {
    return (
      h && le(l.prototype, h),
      a && le(l, a),
      Object.defineProperty(l, 'prototype', { writable: !1 }),
      l
    )
  }
  function at () {
    return (
      (at =
                Object.assign ||
                function (l) {
                  for (let h = 1; h < arguments.length; h++) {
                    const a = arguments[h]
                    for (const c in a) {
                      Object.prototype.hasOwnProperty.call(a, c) &&
                                (l[c] = a[c])
                    }
                  }
                  return l
                }),
      at.apply(this, arguments)
    )
  }
  function D (l, h) {
    if (typeof h !== 'function' && h !== null) {
      throw new TypeError(
        'Super expression must either be null or a function'
      )
    }
    (l.prototype = Object.create(h && h.prototype, {
      constructor: { value: l, writable: !0, configurable: !0 }
    })),
    Object.defineProperty(l, 'prototype', { writable: !1 }),
    h && At(l, h)
  }
  function pt (l) {
    return (
      (pt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (a) {
          return a.__proto__ || Object.getPrototypeOf(a)
        }),
      pt(l)
    )
  }
  function At (l, h) {
    return (
      (At =
                Object.setPrototypeOf ||
                function (c, s) {
                  return (c.__proto__ = s), c
                }),
      At(l, h)
    )
  }
  function Ri () {
    if (
      typeof Reflect > 'u' ||
            !Reflect.construct ||
            Reflect.construct.sham
    ) {
      return !1
    }
    if (typeof Proxy === 'function') return !0
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      )
    } catch {
      return !1
    }
  }
  function Ii (l) {
    if (l === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    }
    return l
  }
  function ji (l, h) {
    if (h && (typeof h === 'object' || typeof h === 'function')) return h
    if (h !== void 0) {
      throw new TypeError(
        'Derived constructors may only return object or undefined'
      )
    }
    return Ii(l)
  }
  function H (l) {
    const h = Ri()
    return function () {
      const c = pt(l)
      let s
      if (h) {
        const f = pt(this).constructor
        s = Reflect.construct(c, arguments, f)
      } else s = c.apply(this, arguments)
      return ji(this, s)
    }
  }
  const Et = (function () {
    function l () {
      L(this, l)
    }
    return (
      R(l, [
        {
          key: 'listenForWhisper',
          value: function (a, c) {
            return this.listen('.client-' + a, c)
          }
        },
        {
          key: 'notification',
          value: function (a) {
            return this.listen(
              '.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
              a
            )
          }
        },
        {
          key: 'stopListeningForWhisper',
          value: function (a, c) {
            return this.stopListening('.client-' + a, c)
          }
        }
      ]),
      l
    )
  })()
  const de = (function () {
    function l (h) {
      L(this, l), (this.namespace = h)
    }
    return (
      R(l, [
        {
          key: 'format',
          value: function (a) {
            return ['.', '\\'].includes(a.charAt(0))
              ? a.substring(1)
              : (this.namespace && (a = this.namespace + '.' + a),
                a.replace(/\./g, '\\'))
          }
        },
        {
          key: 'setNamespace',
          value: function (a) {
            this.namespace = a
          }
        }
      ]),
      l
    )
  })()
  function Ni (l) {
    try {
      new l()
    } catch (h) {
      if (h.message.includes('is not a constructor')) return !1
    }
    return !0
  }
  const Lt = (function (l) {
    D(a, l)
    const h = H(a)
    function a (c, s, f) {
      let d
      return (
        L(this, a),
        (d = h.call(this)),
        (d.name = s),
        (d.pusher = c),
        (d.options = f),
        (d.eventFormatter = new de(d.options.namespace)),
        d.subscribe(),
        d
      )
    }
    return (
      R(a, [
        {
          key: 'subscribe',
          value: function () {
            this.subscription = this.pusher.subscribe(this.name)
          }
        },
        {
          key: 'unsubscribe',
          value: function () {
            this.pusher.unsubscribe(this.name)
          }
        },
        {
          key: 'listen',
          value: function (s, f) {
            return this.on(this.eventFormatter.format(s), f), this
          }
        },
        {
          key: 'listenToAll',
          value: function (s) {
            const f = this
            return (
              this.subscription.bind_global(function (d, N) {
                if (!d.startsWith('pusher:')) {
                  const P = f.options.namespace.replace(
                    /\./g,
                    '\\'
                  )
                  const T = d.startsWith(P)
                    ? d.substring(P.length + 1)
                    : '.' + d
                  s(T, N)
                }
              }),
              this
            )
          }
        },
        {
          key: 'stopListening',
          value: function (s, f) {
            return (
              f
                ? this.subscription.unbind(
                  this.eventFormatter.format(s),
                  f
                )
                : this.subscription.unbind(
                  this.eventFormatter.format(s)
                ),
              this
            )
          }
        },
        {
          key: 'stopListeningToAll',
          value: function (s) {
            return (
              s
                ? this.subscription.unbind_global(s)
                : this.subscription.unbind_global(),
              this
            )
          }
        },
        {
          key: 'subscribed',
          value: function (s) {
            return (
              this.on(
                'pusher:subscription_succeeded',
                function () {
                  s()
                }
              ),
              this
            )
          }
        },
        {
          key: 'error',
          value: function (s) {
            return (
              this.on('pusher:subscription_error', function (f) {
                s(f)
              }),
              this
            )
          }
        },
        {
          key: 'on',
          value: function (s, f) {
            return this.subscription.bind(s, f), this
          }
        }
      ]),
      a
    )
  })(Et)
  const ve = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'whisper',
          value: function (s, f) {
            return (
              this.pusher.channels.channels[this.name].trigger(
                'client-'.concat(s),
                f
              ),
              this
            )
          }
        }
      ]),
      a
    )
  })(Lt)
  const qi = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'whisper',
          value: function (s, f) {
            return (
              this.pusher.channels.channels[this.name].trigger(
                'client-'.concat(s),
                f
              ),
              this
            )
          }
        }
      ]),
      a
    )
  })(Lt)
  const Ui = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'here',
          value: function (s) {
            return (
              this.on(
                'pusher:subscription_succeeded',
                function (f) {
                  s(
                    Object.keys(f.members).map(
                      function (d) {
                        return f.members[d]
                      }
                    )
                  )
                }
              ),
              this
            )
          }
        },
        {
          key: 'joining',
          value: function (s) {
            return (
              this.on('pusher:member_added', function (f) {
                s(f.info)
              }),
              this
            )
          }
        },
        {
          key: 'whisper',
          value: function (s, f) {
            return (
              this.pusher.channels.channels[this.name].trigger(
                'client-'.concat(s),
                f
              ),
              this
            )
          }
        },
        {
          key: 'leaving',
          value: function (s) {
            return (
              this.on('pusher:member_removed', function (f) {
                s(f.info)
              }),
              this
            )
          }
        }
      ]),
      a
    )
  })(ve)
  const ye = (function (l) {
    D(a, l)
    const h = H(a)
    function a (c, s, f) {
      let d
      return (
        L(this, a),
        (d = h.call(this)),
        (d.events = {}),
        (d.listeners = {}),
        (d.name = s),
        (d.socket = c),
        (d.options = f),
        (d.eventFormatter = new de(d.options.namespace)),
        d.subscribe(),
        d
      )
    }
    return (
      R(a, [
        {
          key: 'subscribe',
          value: function () {
            this.socket.emit('subscribe', {
              channel: this.name,
              auth: this.options.auth || {}
            })
          }
        },
        {
          key: 'unsubscribe',
          value: function () {
            this.unbind(),
            this.socket.emit('unsubscribe', {
              channel: this.name,
              auth: this.options.auth || {}
            })
          }
        },
        {
          key: 'listen',
          value: function (s, f) {
            return this.on(this.eventFormatter.format(s), f), this
          }
        },
        {
          key: 'stopListening',
          value: function (s, f) {
            return (
              this.unbindEvent(this.eventFormatter.format(s), f),
              this
            )
          }
        },
        {
          key: 'subscribed',
          value: function (s) {
            return (
              this.on('connect', function (f) {
                s(f)
              }),
              this
            )
          }
        },
        {
          key: 'error',
          value: function (s) {
            return this
          }
        },
        {
          key: 'on',
          value: function (s, f) {
            const d = this
            return (
              (this.listeners[s] = this.listeners[s] || []),
              this.events[s] ||
                                ((this.events[s] = function (N, P) {
                                  d.name === N &&
                                        d.listeners[s] &&
                                        d.listeners[s].forEach(function (T) {
                                          return T(P)
                                        })
                                }),
                                this.socket.on(s, this.events[s])),
              this.listeners[s].push(f),
              this
            )
          }
        },
        {
          key: 'unbind',
          value: function () {
            const s = this
            Object.keys(this.events).forEach(function (f) {
              s.unbindEvent(f)
            })
          }
        },
        {
          key: 'unbindEvent',
          value: function (s, f) {
            (this.listeners[s] = this.listeners[s] || []),
            f &&
                                (this.listeners[s] = this.listeners[s].filter(
                                  function (d) {
                                    return d !== f
                                  }
                                )),
            (!f || this.listeners[s].length === 0) &&
                                (this.events[s] &&
                                    (this.socket.removeListener(
                                      s,
                                      this.events[s]
                                    ),
                                    delete this.events[s]),
                                delete this.listeners[s])
          }
        }
      ]),
      a
    )
  })(Et)
  const ge = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'whisper',
          value: function (s, f) {
            return (
              this.socket.emit('client event', {
                channel: this.name,
                event: 'client-'.concat(s),
                data: f
              }),
              this
            )
          }
        }
      ]),
      a
    )
  })(ye)
  const Di = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'here',
          value: function (s) {
            return (
              this.on('presence:subscribed', function (f) {
                s(
                  f.map(function (d) {
                    return d.user_info
                  })
                )
              }),
              this
            )
          }
        },
        {
          key: 'joining',
          value: function (s) {
            return (
              this.on('presence:joining', function (f) {
                return s(f.user_info)
              }),
              this
            )
          }
        },
        {
          key: 'whisper',
          value: function (s, f) {
            return (
              this.socket.emit('client event', {
                channel: this.name,
                event: 'client-'.concat(s),
                data: f
              }),
              this
            )
          }
        },
        {
          key: 'leaving',
          value: function (s) {
            return (
              this.on('presence:leaving', function (f) {
                return s(f.user_info)
              }),
              this
            )
          }
        }
      ]),
      a
    )
  })(ge)
  const dt = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        { key: 'subscribe', value: function () {} },
        { key: 'unsubscribe', value: function () {} },
        {
          key: 'listen',
          value: function (s, f) {
            return this
          }
        },
        {
          key: 'listenToAll',
          value: function (s) {
            return this
          }
        },
        {
          key: 'stopListening',
          value: function (s, f) {
            return this
          }
        },
        {
          key: 'subscribed',
          value: function (s) {
            return this
          }
        },
        {
          key: 'error',
          value: function (s) {
            return this
          }
        },
        {
          key: 'on',
          value: function (s, f) {
            return this
          }
        }
      ]),
      a
    )
  })(Et)
  const _e = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'whisper',
          value: function (s, f) {
            return this
          }
        }
      ]),
      a
    )
  })(dt)
  const Hi = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'whisper',
          value: function (s, f) {
            return this
          }
        }
      ]),
      a
    )
  })(dt)
  const Mi = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      return L(this, a), h.apply(this, arguments)
    }
    return (
      R(a, [
        {
          key: 'here',
          value: function (s) {
            return this
          }
        },
        {
          key: 'joining',
          value: function (s) {
            return this
          }
        },
        {
          key: 'whisper',
          value: function (s, f) {
            return this
          }
        },
        {
          key: 'leaving',
          value: function (s) {
            return this
          }
        }
      ]),
      a
    )
  })(_e)
  const Rt = (function () {
    function l (h) {
      L(this, l),
      (this._defaultOptions = {
        auth: { headers: {} },
        authEndpoint: '/broadcasting/auth',
        userAuthentication: {
          endpoint: '/broadcasting/user-auth',
          headers: {}
        },
        broadcaster: 'pusher',
        csrfToken: null,
        bearerToken: null,
        host: null,
        key: null,
        namespace: 'App.Events'
      }),
      this.setOptions(h),
      this.connect()
    }
    return (
      R(l, [
        {
          key: 'setOptions',
          value: function (a) {
            this.options = at(this._defaultOptions, a)
            let c = this.csrfToken()
            return (
              c &&
                                ((this.options.auth.headers['X-CSRF-TOKEN'] =
                                    c),
                                (this.options.userAuthentication.headers[
                                  'X-CSRF-TOKEN'
                                ] = c)),
              (c = this.options.bearerToken),
              c &&
                                ((this.options.auth.headers.Authorization =
                                    'Bearer ' + c),
                                (this.options.userAuthentication.headers.Authorization =
                                    'Bearer ' + c)),
              a
            )
          }
        },
        {
          key: 'csrfToken',
          value: function () {
            let a
            return typeof window < 'u' &&
                            window.Laravel &&
                            window.Laravel.csrfToken
              ? window.Laravel.csrfToken
              : this.options.csrfToken
                ? this.options.csrfToken
                : typeof document < 'u' &&
                                  typeof document.querySelector ===
                                      'function' &&
                                  (a = document.querySelector(
                                    'meta[name="csrf-token"]'
                                  ))
                  ? a.getAttribute('content')
                  : null
          }
        }
      ]),
      l
    )
  })()
  const fe = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      let c
      return (
        L(this, a), (c = h.apply(this, arguments)), (c.channels = {}), c
      )
    }
    return (
      R(a, [
        {
          key: 'connect',
          value: function () {
            typeof this.options.client < 'u'
              ? (this.pusher = this.options.client)
              : this.options.Pusher
                ? (this.pusher = new this.options.Pusher(
                    this.options.key,
                    this.options
                  ))
                : (this.pusher = new Pusher(
                    this.options.key,
                    this.options
                  ))
          }
        },
        {
          key: 'signin',
          value: function () {
            this.pusher.signin()
          }
        },
        {
          key: 'listen',
          value: function (s, f, d) {
            return this.channel(s).listen(f, d)
          }
        },
        {
          key: 'channel',
          value: function (s) {
            return (
              this.channels[s] ||
                                (this.channels[s] = new Lt(
                                  this.pusher,
                                  s,
                                  this.options
                                )),
              this.channels[s]
            )
          }
        },
        {
          key: 'privateChannel',
          value: function (s) {
            return (
              this.channels['private-' + s] ||
                                (this.channels['private-' + s] = new ve(
                                  this.pusher,
                                  'private-' + s,
                                  this.options
                                )),
              this.channels['private-' + s]
            )
          }
        },
        {
          key: 'encryptedPrivateChannel',
          value: function (s) {
            return (
              this.channels['private-encrypted-' + s] ||
                                (this.channels['private-encrypted-' + s] =
                                    new qi(
                                      this.pusher,
                                      'private-encrypted-' + s,
                                      this.options
                                    )),
              this.channels['private-encrypted-' + s]
            )
          }
        },
        {
          key: 'presenceChannel',
          value: function (s) {
            return (
              this.channels['presence-' + s] ||
                                (this.channels['presence-' + s] = new Ui(
                                  this.pusher,
                                  'presence-' + s,
                                  this.options
                                )),
              this.channels['presence-' + s]
            )
          }
        },
        {
          key: 'leave',
          value: function (s) {
            const f = this
            const d = [
              s,
              'private-' + s,
              'private-encrypted-' + s,
              'presence-' + s
            ]
            d.forEach(function (N, P) {
              f.leaveChannel(N)
            })
          }
        },
        {
          key: 'leaveChannel',
          value: function (s) {
            this.channels[s] &&
                            (this.channels[s].unsubscribe(),
                            delete this.channels[s])
          }
        },
        {
          key: 'socketId',
          value: function () {
            return this.pusher.connection.socket_id
          }
        },
        {
          key: 'disconnect',
          value: function () {
            this.pusher.disconnect()
          }
        }
      ]),
      a
    )
  })(Rt)
  const pe = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      let c
      return (
        L(this, a), (c = h.apply(this, arguments)), (c.channels = {}), c
      )
    }
    return (
      R(a, [
        {
          key: 'connect',
          value: function () {
            const s = this
            const f = this.getSocketIO()
            return (
              (this.socket = f(this.options.host, this.options)),
              this.socket.on('reconnect', function () {
                Object.values(s.channels).forEach(function (d) {
                  d.subscribe()
                })
              }),
              this.socket
            )
          }
        },
        {
          key: 'getSocketIO',
          value: function () {
            if (typeof this.options.client < 'u') {
              return this.options.client
            }
            if (typeof io < 'u') return io
            throw new Error(
              'Socket.io client not found. Should be globally available or passed via options.client'
            )
          }
        },
        {
          key: 'listen',
          value: function (s, f, d) {
            return this.channel(s).listen(f, d)
          }
        },
        {
          key: 'channel',
          value: function (s) {
            return (
              this.channels[s] ||
                                (this.channels[s] = new ye(
                                  this.socket,
                                  s,
                                  this.options
                                )),
              this.channels[s]
            )
          }
        },
        {
          key: 'privateChannel',
          value: function (s) {
            return (
              this.channels['private-' + s] ||
                                (this.channels['private-' + s] = new ge(
                                  this.socket,
                                  'private-' + s,
                                  this.options
                                )),
              this.channels['private-' + s]
            )
          }
        },
        {
          key: 'presenceChannel',
          value: function (s) {
            return (
              this.channels['presence-' + s] ||
                                (this.channels['presence-' + s] = new Di(
                                  this.socket,
                                  'presence-' + s,
                                  this.options
                                )),
              this.channels['presence-' + s]
            )
          }
        },
        {
          key: 'leave',
          value: function (s) {
            const f = this
            const d = [s, 'private-' + s, 'presence-' + s]
            d.forEach(function (N) {
              f.leaveChannel(N)
            })
          }
        },
        {
          key: 'leaveChannel',
          value: function (s) {
            this.channels[s] &&
                            (this.channels[s].unsubscribe(),
                            delete this.channels[s])
          }
        },
        {
          key: 'socketId',
          value: function () {
            return this.socket.id
          }
        },
        {
          key: 'disconnect',
          value: function () {
            this.socket.disconnect()
          }
        }
      ]),
      a
    )
  })(Rt)
  const zi = (function (l) {
    D(a, l)
    const h = H(a)
    function a () {
      let c
      return (
        L(this, a), (c = h.apply(this, arguments)), (c.channels = {}), c
      )
    }
    return (
      R(a, [
        { key: 'connect', value: function () {} },
        {
          key: 'listen',
          value: function (s, f, d) {
            return new dt()
          }
        },
        {
          key: 'channel',
          value: function (s) {
            return new dt()
          }
        },
        {
          key: 'privateChannel',
          value: function (s) {
            return new _e()
          }
        },
        {
          key: 'encryptedPrivateChannel',
          value: function (s) {
            return new Hi()
          }
        },
        {
          key: 'presenceChannel',
          value: function (s) {
            return new Mi()
          }
        },
        { key: 'leave', value: function (s) {} },
        { key: 'leaveChannel', value: function (s) {} },
        {
          key: 'socketId',
          value: function () {
            return 'fake-socket-id'
          }
        },
        { key: 'disconnect', value: function () {} }
      ]),
      a
    )
  })(Rt)
  const be = (function () {
    function l (h) {
      L(this, l),
      (this.options = h),
      this.connect(),
      this.options.withoutInterceptors || this.registerInterceptors()
    }
    return (
      R(l, [
        {
          key: 'channel',
          value: function (a) {
            return this.connector.channel(a)
          }
        },
        {
          key: 'connect',
          value: function () {
            if (this.options.broadcaster == 'reverb') {
              this.connector = new fe(
                at(at({}, this.options), { cluster: '' })
              )
            } else if (this.options.broadcaster == 'pusher') {
              this.connector = new fe(this.options)
            } else if (this.options.broadcaster == 'socket.io') {
              this.connector = new pe(this.options)
            } else if (this.options.broadcaster == 'null') {
              this.connector = new zi(this.options)
            } else if (
              typeof this.options.broadcaster === 'function' &&
                            Ni(this.options.broadcaster)
            ) {
              this.connector = new this.options.broadcaster(
                this.options
              )
            } else {
              throw new Error(
                'Broadcaster '
                  .concat(st(this.options.broadcaster), ' ')
                  .concat(
                    this.options.broadcaster,
                    ' is not supported.'
                  )
              )
            }
          }
        },
        {
          key: 'disconnect',
          value: function () {
            this.connector.disconnect()
          }
        },
        {
          key: 'join',
          value: function (a) {
            return this.connector.presenceChannel(a)
          }
        },
        {
          key: 'leave',
          value: function (a) {
            this.connector.leave(a)
          }
        },
        {
          key: 'leaveChannel',
          value: function (a) {
            this.connector.leaveChannel(a)
          }
        },
        {
          key: 'leaveAllChannels',
          value: function () {
            for (const a in this.connector.channels) {
              this.leaveChannel(a)
            }
          }
        },
        {
          key: 'listen',
          value: function (a, c, s) {
            return this.connector.listen(a, c, s)
          }
        },
        {
          key: 'private',
          value: function (a) {
            return this.connector.privateChannel(a)
          }
        },
        {
          key: 'encryptedPrivate',
          value: function (a) {
            if (this.connector instanceof pe) {
              throw new Error(
                'Broadcaster '
                  .concat(st(this.options.broadcaster), ' ')
                  .concat(
                    this.options.broadcaster,
                    ' does not support encrypted private channels.'
                  )
              )
            }
            return this.connector.encryptedPrivateChannel(a)
          }
        },
        {
          key: 'socketId',
          value: function () {
            return this.connector.socketId()
          }
        },
        {
          key: 'registerInterceptors',
          value: function () {
            typeof Vue === 'function' &&
                            Vue.http &&
                            this.registerVueRequestInterceptor(),
            typeof axios === 'function' &&
                                this.registerAxiosRequestInterceptor(),
            typeof jQuery === 'function' &&
                                this.registerjQueryAjaxSetup(),
            (typeof Turbo > 'u' ? 'undefined' : st(Turbo)) ===
                                'object' &&
                                this.registerTurboRequestInterceptor()
          }
        },
        {
          key: 'registerVueRequestInterceptor',
          value: function () {
            const a = this
            Vue.http.interceptors.push(function (c, s) {
              a.socketId() &&
                                c.headers.set('X-Socket-ID', a.socketId()),
              s()
            })
          }
        },
        {
          key: 'registerAxiosRequestInterceptor',
          value: function () {
            const a = this
            axios.interceptors.request.use(function (c) {
              return (
                a.socketId() &&
                                    (c.headers['X-Socket-Id'] = a.socketId()),
                c
              )
            })
          }
        },
        {
          key: 'registerjQueryAjaxSetup',
          value: function () {
            const a = this
            typeof jQuery.ajax < 'u' &&
                            jQuery.ajaxPrefilter(function (c, s, f) {
                              a.socketId() &&
                                    f.setRequestHeader(
                                      'X-Socket-Id',
                                      a.socketId()
                                    )
                            })
          }
        },
        {
          key: 'registerTurboRequestInterceptor',
          value: function () {
            const a = this
            document.addEventListener(
              'turbo:before-fetch-request',
              function (c) {
                c.detail.fetchOptions.headers['X-Socket-Id'] =
                                    a.socketId()
              }
            )
          }
        }
      ]),
      l
    )
  })()
  const we = Li(me(), 1)
  window.EchoFactory = be
  window.Pusher = we.default
})()
/*! Bundled license information:

pusher-js/dist/web/pusher.js:
  (*!
   * Pusher JavaScript Library v7.6.0
   * https://pusher.com/
   *
   * Copyright 2020, Pusher
   * Released under the MIT licence.
   *)
*/
