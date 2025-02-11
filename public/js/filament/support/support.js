(() => {
  const zo = Object.create
  const Ti = Object.defineProperty
  const Yo = Object.getOwnPropertyDescriptor
  const Xo = Object.getOwnPropertyNames
  const qo = Object.getPrototypeOf
  const Go = Object.prototype.hasOwnProperty
  const Kr = (e, t) => () => (
    t || e((t = { exports: {} }).exports, t), t.exports
  )
  const Ko = (e, t, r, n) => {
    if ((t && typeof t === 'object') || typeof t === 'function') {
      for (const i of Xo(t)) {
        !Go.call(e, i) &&
                    i !== r &&
                    Ti(e, i, {
                      get: () => t[i],
                      enumerable: !(n = Yo(t, i)) || n.enumerable
                    })
      }
    }
    return e
  }
  const Jo = (e, t, r) => (
    (r = e != null ? zo(qo(e)) : {}),
    Ko(
      t || !e || !e.__esModule
        ? Ti(r, 'default', { value: e, enumerable: !0 })
        : r,
      e
    )
  )
  const uo = Kr(() => {})
  const po = Kr(() => {})
  const ho = Kr((Bs, yr) => {
    (function () {
      'use strict'
      const e = 'input is invalid type'
      const t = 'finalize already called'
      let r = typeof window === 'object'
      let n = r ? window : {}
      n.JS_MD5_NO_WINDOW && (r = !1)
      const i = !r && typeof self === 'object'
      const o =
                !n.JS_MD5_NO_NODE_JS &&
                typeof process === 'object' &&
                process.versions &&
                process.versions.node
      o ? (n = global) : i && (n = self)
      const a =
                !n.JS_MD5_NO_COMMON_JS && typeof yr === 'object' && yr.exports
      const d = typeof define === 'function' && define.amd
      const f = !n.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer < 'u'
      const u = '0123456789abcdef'.split('')
      const w = [128, 32768, 8388608, -2147483648]
      const m = [0, 8, 16, 24]
      const E = [
        'hex',
        'array',
        'digest',
        'buffer',
        'arrayBuffer',
        'base64'
      ]
      const O =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split(
                  ''
                )
      let S = []
      let R
      if (f) {
        const I = new ArrayBuffer(68);
        (R = new Uint8Array(I)), (S = new Uint32Array(I))
      }
      let $ = Array.isArray;
      (n.JS_MD5_NO_NODE_JS || !$) &&
                ($ = function (l) {
                  return (
                    Object.prototype.toString.call(l) === '[object Array]'
                  )
                })
      let A = ArrayBuffer.isView
      f &&
                (n.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !A) &&
                (A = function (l) {
                  return (
                    typeof l === 'object' &&
                        l.buffer &&
                        l.buffer.constructor === ArrayBuffer
                  )
                })
      const k = function (l) {
        const h = typeof l
        if (h === 'string') return [l, !0]
        if (h !== 'object' || l === null) throw new Error(e)
        if (f && l.constructor === ArrayBuffer) {
          return [new Uint8Array(l), !1]
        }
        if (!$(l) && !A(l)) throw new Error(e)
        return [l, !1]
      }
      const Y = function (l) {
        return function (h) {
          return new X(!0).update(h)[l]()
        }
      }
      const ne = function () {
        let l = Y('hex')
        o && (l = J(l)),
        (l.create = function () {
          return new X()
        }),
        (l.update = function (p) {
          return l.create().update(p)
        })
        for (let h = 0; h < E.length; ++h) {
          const v = E[h]
          l[v] = Y(v)
        }
        return l
      }
      var J = function (l) {
        const h = uo()
        const v = po().Buffer
        let p
        v.from && !n.JS_MD5_NO_BUFFER_FROM
          ? (p = v.from)
          : (p = function (P) {
              return new v(P)
            })
        const j = function (P) {
          if (typeof P === 'string') {
            return h
              .createHash('md5')
              .update(P, 'utf8')
              .digest('hex')
          }
          if (P == null) throw new Error(e)
          return (
            P.constructor === ArrayBuffer &&
                            (P = new Uint8Array(P)),
            $(P) || A(P) || P.constructor === v
              ? h.createHash('md5').update(p(P)).digest('hex')
              : l(P)
          )
        }
        return j
      }
      const V = function (l) {
        return function (h, v) {
          return new Z(h, !0).update(v)[l]()
        }
      }
      const de = function () {
        const l = V('hex');
        (l.create = function (p) {
          return new Z(p)
        }),
        (l.update = function (p, j) {
          return l.create(p).update(j)
        })
        for (let h = 0; h < E.length; ++h) {
          const v = E[h]
          l[v] = V(v)
        }
        return l
      }
      function X (l) {
        if (l) {
          (S[0] =
                        S[16] =
                        S[1] =
                        S[2] =
                        S[3] =
                        S[4] =
                        S[5] =
                        S[6] =
                        S[7] =
                        S[8] =
                        S[9] =
                        S[10] =
                        S[11] =
                        S[12] =
                        S[13] =
                        S[14] =
                        S[15] =
                            0),
          (this.blocks = S),
          (this.buffer8 = R)
        } else if (f) {
          const h = new ArrayBuffer(68);
          (this.buffer8 = new Uint8Array(h)),
          (this.blocks = new Uint32Array(h))
        } else {
          this.blocks = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
          ]
        }
        (this.h0 =
                    this.h1 =
                    this.h2 =
                    this.h3 =
                    this.start =
                    this.bytes =
                    this.hBytes =
                        0),
        (this.finalized = this.hashed = !1),
        (this.first = !0)
      }
      (X.prototype.update = function (l) {
        if (this.finalized) throw new Error(t)
        const h = k(l)
        l = h[0]
        for (
          var v = h[1],
            p,
            j = 0,
            P,
            M = l.length,
            Q = this.blocks,
            ze = this.buffer8;
          j < M;

        ) {
          if (
            (this.hashed &&
                            ((this.hashed = !1),
                            (Q[0] = Q[16]),
                            (Q[16] =
                                Q[1] =
                                Q[2] =
                                Q[3] =
                                Q[4] =
                                Q[5] =
                                Q[6] =
                                Q[7] =
                                Q[8] =
                                Q[9] =
                                Q[10] =
                                Q[11] =
                                Q[12] =
                                Q[13] =
                                Q[14] =
                                Q[15] =
                                    0)),
            v)
          ) {
            if (f) {
              for (P = this.start; j < M && P < 64; ++j) {
                (p = l.charCodeAt(j)),
                p < 128
                  ? (ze[P++] = p)
                  : p < 2048
                    ? ((ze[P++] = 192 | (p >>> 6)),
                      (ze[P++] = 128 | (p & 63)))
                    : p < 55296 || p >= 57344
                      ? ((ze[P++] = 224 | (p >>> 12)),
                        (ze[P++] =
                                                  128 | ((p >>> 6) & 63)),
                        (ze[P++] = 128 | (p & 63)))
                      : ((p =
                                                  65536 +
                                                  (((p & 1023) << 10) |
                                                      (l.charCodeAt(++j) &
                                                          1023))),
                        (ze[P++] = 240 | (p >>> 18)),
                        (ze[P++] =
                                                  128 | ((p >>> 12) & 63)),
                        (ze[P++] =
                                                  128 | ((p >>> 6) & 63)),
                        (ze[P++] = 128 | (p & 63)))
              }
            } else {
              for (P = this.start; j < M && P < 64; ++j) {
                (p = l.charCodeAt(j)),
                p < 128
                  ? (Q[P >>> 2] |= p << m[P++ & 3])
                  : p < 2048
                    ? ((Q[P >>> 2] |=
                                                (192 | (p >>> 6)) <<
                                                m[P++ & 3]),
                      (Q[P >>> 2] |=
                                                (128 | (p & 63)) << m[P++ & 3]))
                    : p < 55296 || p >= 57344
                      ? ((Q[P >>> 2] |=
                                                  (224 | (p >>> 12)) <<
                                                  m[P++ & 3]),
                        (Q[P >>> 2] |=
                                                  (128 | ((p >>> 6) & 63)) <<
                                                  m[P++ & 3]),
                        (Q[P >>> 2] |=
                                                  (128 | (p & 63)) <<
                                                  m[P++ & 3]))
                      : ((p =
                                                  65536 +
                                                  (((p & 1023) << 10) |
                                                      (l.charCodeAt(++j) &
                                                          1023))),
                        (Q[P >>> 2] |=
                                                  (240 | (p >>> 18)) <<
                                                  m[P++ & 3]),
                        (Q[P >>> 2] |=
                                                  (128 | ((p >>> 12) & 63)) <<
                                                  m[P++ & 3]),
                        (Q[P >>> 2] |=
                                                  (128 | ((p >>> 6) & 63)) <<
                                                  m[P++ & 3]),
                        (Q[P >>> 2] |=
                                                  (128 | (p & 63)) <<
                                                  m[P++ & 3]))
              }
            }
          } else if (f) {
            for (P = this.start; j < M && P < 64; ++j) {
              ze[P++] = l[j]
            }
          } else {
            for (P = this.start; j < M && P < 64; ++j) {
              Q[P >>> 2] |= l[j] << m[P++ & 3]
            }
          }
          (this.lastByteIndex = P),
          (this.bytes += P - this.start),
          P >= 64
            ? ((this.start = P - 64),
              this.hash(),
              (this.hashed = !0))
            : (this.start = P)
        }
        return (
          this.bytes > 4294967295 &&
                        ((this.hBytes += (this.bytes / 4294967296) << 0),
                        (this.bytes = this.bytes % 4294967296)),
          this
        )
      }),
      (X.prototype.finalize = function () {
        if (!this.finalized) {
          this.finalized = !0
          const l = this.blocks
          const h = this.lastByteIndex;
          (l[h >>> 2] |= w[h & 3]),
          h >= 56 &&
                                (this.hashed || this.hash(),
                                (l[0] = l[16]),
                                (l[16] =
                                    l[1] =
                                    l[2] =
                                    l[3] =
                                    l[4] =
                                    l[5] =
                                    l[6] =
                                    l[7] =
                                    l[8] =
                                    l[9] =
                                    l[10] =
                                    l[11] =
                                    l[12] =
                                    l[13] =
                                    l[14] =
                                    l[15] =
                                        0)),
          (l[14] = this.bytes << 3),
          (l[15] = (this.hBytes << 3) | (this.bytes >>> 29)),
          this.hash()
        }
      }),
      (X.prototype.hash = function () {
        let l
        let h
        let v
        let p
        let j
        let P
        const M = this.blocks
        this.first
          ? ((l = M[0] - 680876937),
            (l = (((l << 7) | (l >>> 25)) - 271733879) << 0),
            (p =
                              (-1732584194 ^ (l & 2004318071)) +
                              M[1] -
                              117830708),
            (p = (((p << 12) | (p >>> 20)) + l) << 0),
            (v =
                              (-271733879 ^ (p & (l ^ -271733879))) +
                              M[2] -
                              1126478375),
            (v = (((v << 17) | (v >>> 15)) + p) << 0),
            (h = (l ^ (v & (p ^ l))) + M[3] - 1316259209),
            (h = (((h << 22) | (h >>> 10)) + v) << 0))
          : ((l = this.h0),
            (h = this.h1),
            (v = this.h2),
            (p = this.h3),
            (l += (p ^ (h & (v ^ p))) + M[0] - 680876936),
            (l = (((l << 7) | (l >>> 25)) + h) << 0),
            (p += (v ^ (l & (h ^ v))) + M[1] - 389564586),
            (p = (((p << 12) | (p >>> 20)) + l) << 0),
            (v += (h ^ (p & (l ^ h))) + M[2] + 606105819),
            (v = (((v << 17) | (v >>> 15)) + p) << 0),
            (h += (l ^ (v & (p ^ l))) + M[3] - 1044525330),
            (h = (((h << 22) | (h >>> 10)) + v) << 0)),
        (l += (p ^ (h & (v ^ p))) + M[4] - 176418897),
        (l = (((l << 7) | (l >>> 25)) + h) << 0),
        (p += (v ^ (l & (h ^ v))) + M[5] + 1200080426),
        (p = (((p << 12) | (p >>> 20)) + l) << 0),
        (v += (h ^ (p & (l ^ h))) + M[6] - 1473231341),
        (v = (((v << 17) | (v >>> 15)) + p) << 0),
        (h += (l ^ (v & (p ^ l))) + M[7] - 45705983),
        (h = (((h << 22) | (h >>> 10)) + v) << 0),
        (l += (p ^ (h & (v ^ p))) + M[8] + 1770035416),
        (l = (((l << 7) | (l >>> 25)) + h) << 0),
        (p += (v ^ (l & (h ^ v))) + M[9] - 1958414417),
        (p = (((p << 12) | (p >>> 20)) + l) << 0),
        (v += (h ^ (p & (l ^ h))) + M[10] - 42063),
        (v = (((v << 17) | (v >>> 15)) + p) << 0),
        (h += (l ^ (v & (p ^ l))) + M[11] - 1990404162),
        (h = (((h << 22) | (h >>> 10)) + v) << 0),
        (l += (p ^ (h & (v ^ p))) + M[12] + 1804603682),
        (l = (((l << 7) | (l >>> 25)) + h) << 0),
        (p += (v ^ (l & (h ^ v))) + M[13] - 40341101),
        (p = (((p << 12) | (p >>> 20)) + l) << 0),
        (v += (h ^ (p & (l ^ h))) + M[14] - 1502002290),
        (v = (((v << 17) | (v >>> 15)) + p) << 0),
        (h += (l ^ (v & (p ^ l))) + M[15] + 1236535329),
        (h = (((h << 22) | (h >>> 10)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + M[1] - 165796510),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + M[6] - 1069501632),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + M[11] + 643717713),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + M[0] - 373897302),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + M[5] - 701558691),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + M[10] + 38016083),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + M[15] - 660478335),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + M[4] - 405537848),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + M[9] + 568446438),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + M[14] - 1019803690),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + M[3] - 187363961),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + M[8] + 1163531501),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + M[13] - 1444681467),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + M[2] - 51403784),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + M[7] + 1735328473),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + M[12] - 1926607734),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + M[5] - 378558),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + M[8] - 2022574463),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + M[11] + 1839030562),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + M[14] - 35309556),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + M[1] - 1530992060),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + M[4] + 1272893353),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + M[7] - 155497632),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + M[10] - 1094730640),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + M[13] + 681279174),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + M[0] - 358537222),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + M[3] - 722521979),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + M[6] + 76029189),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + M[9] - 640364487),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + M[12] - 421815835),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + M[15] + 530742520),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + M[2] - 995338651),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (l += (v ^ (h | ~p)) + M[0] - 198630844),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + M[7] + 1126891415),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + M[14] - 1416354905),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + M[5] - 57434055),
        (h = (((h << 21) | (h >>> 11)) + v) << 0),
        (l += (v ^ (h | ~p)) + M[12] + 1700485571),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + M[3] - 1894986606),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + M[10] - 1051523),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + M[1] - 2054922799),
        (h = (((h << 21) | (h >>> 11)) + v) << 0),
        (l += (v ^ (h | ~p)) + M[8] + 1873313359),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + M[15] - 30611744),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + M[6] - 1560198380),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + M[13] + 1309151649),
        (h = (((h << 21) | (h >>> 11)) + v) << 0),
        (l += (v ^ (h | ~p)) + M[4] - 145523070),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + M[11] - 1120210379),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + M[2] + 718787259),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + M[9] - 343485551),
        (h = (((h << 21) | (h >>> 11)) + v) << 0),
        this.first
          ? ((this.h0 = (l + 1732584193) << 0),
            (this.h1 = (h - 271733879) << 0),
            (this.h2 = (v - 1732584194) << 0),
            (this.h3 = (p + 271733878) << 0),
            (this.first = !1))
          : ((this.h0 = (this.h0 + l) << 0),
            (this.h1 = (this.h1 + h) << 0),
            (this.h2 = (this.h2 + v) << 0),
            (this.h3 = (this.h3 + p) << 0))
      }),
      (X.prototype.hex = function () {
        this.finalize()
        const l = this.h0
        const h = this.h1
        const v = this.h2
        const p = this.h3
        return (
          u[(l >>> 4) & 15] +
                        u[l & 15] +
                        u[(l >>> 12) & 15] +
                        u[(l >>> 8) & 15] +
                        u[(l >>> 20) & 15] +
                        u[(l >>> 16) & 15] +
                        u[(l >>> 28) & 15] +
                        u[(l >>> 24) & 15] +
                        u[(h >>> 4) & 15] +
                        u[h & 15] +
                        u[(h >>> 12) & 15] +
                        u[(h >>> 8) & 15] +
                        u[(h >>> 20) & 15] +
                        u[(h >>> 16) & 15] +
                        u[(h >>> 28) & 15] +
                        u[(h >>> 24) & 15] +
                        u[(v >>> 4) & 15] +
                        u[v & 15] +
                        u[(v >>> 12) & 15] +
                        u[(v >>> 8) & 15] +
                        u[(v >>> 20) & 15] +
                        u[(v >>> 16) & 15] +
                        u[(v >>> 28) & 15] +
                        u[(v >>> 24) & 15] +
                        u[(p >>> 4) & 15] +
                        u[p & 15] +
                        u[(p >>> 12) & 15] +
                        u[(p >>> 8) & 15] +
                        u[(p >>> 20) & 15] +
                        u[(p >>> 16) & 15] +
                        u[(p >>> 28) & 15] +
                        u[(p >>> 24) & 15]
        )
      }),
      (X.prototype.toString = X.prototype.hex),
      (X.prototype.digest = function () {
        this.finalize()
        const l = this.h0
        const h = this.h1
        const v = this.h2
        const p = this.h3
        return [
          l & 255,
          (l >>> 8) & 255,
          (l >>> 16) & 255,
          (l >>> 24) & 255,
          h & 255,
          (h >>> 8) & 255,
          (h >>> 16) & 255,
          (h >>> 24) & 255,
          v & 255,
          (v >>> 8) & 255,
          (v >>> 16) & 255,
          (v >>> 24) & 255,
          p & 255,
          (p >>> 8) & 255,
          (p >>> 16) & 255,
          (p >>> 24) & 255
        ]
      }),
      (X.prototype.array = X.prototype.digest),
      (X.prototype.arrayBuffer = function () {
        this.finalize()
        const l = new ArrayBuffer(16)
        const h = new Uint32Array(l)
        return (
          (h[0] = this.h0),
          (h[1] = this.h1),
          (h[2] = this.h2),
          (h[3] = this.h3),
          l
        )
      }),
      (X.prototype.buffer = X.prototype.arrayBuffer),
      (X.prototype.base64 = function () {
        for (
          var l, h, v, p = '', j = this.array(), P = 0;
          P < 15;

        ) {
          (l = j[P++]),
          (h = j[P++]),
          (v = j[P++]),
          (p +=
                                O[l >>> 2] +
                                O[((l << 4) | (h >>> 4)) & 63] +
                                O[((h << 2) | (v >>> 6)) & 63] +
                                O[v & 63])
        }
        return (
          (l = j[P]),
          (p += O[l >>> 2] + O[(l << 4) & 63] + '=='),
          p
        )
      })
      function Z (l, h) {
        let v
        const p = k(l)
        if (((l = p[0]), p[1])) {
          const j = []
          const P = l.length
          let M = 0
          let Q
          for (v = 0; v < P; ++v) {
            (Q = l.charCodeAt(v)),
            Q < 128
              ? (j[M++] = Q)
              : Q < 2048
                ? ((j[M++] = 192 | (Q >>> 6)),
                  (j[M++] = 128 | (Q & 63)))
                : Q < 55296 || Q >= 57344
                  ? ((j[M++] = 224 | (Q >>> 12)),
                    (j[M++] = 128 | ((Q >>> 6) & 63)),
                    (j[M++] = 128 | (Q & 63)))
                  : ((Q =
                                          65536 +
                                          (((Q & 1023) << 10) |
                                              (l.charCodeAt(++v) & 1023))),
                    (j[M++] = 240 | (Q >>> 18)),
                    (j[M++] = 128 | ((Q >>> 12) & 63)),
                    (j[M++] = 128 | ((Q >>> 6) & 63)),
                    (j[M++] = 128 | (Q & 63)))
          }
          l = j
        }
        l.length > 64 && (l = new X(!0).update(l).array())
        const ze = []
        const Mt = []
        for (v = 0; v < 64; ++v) {
          const Ut = l[v] || 0;
          (ze[v] = 92 ^ Ut), (Mt[v] = 54 ^ Ut)
        }
        X.call(this, h),
        this.update(Mt),
        (this.oKeyPad = ze),
        (this.inner = !0),
        (this.sharedMemory = h)
      }
      (Z.prototype = new X()),
      (Z.prototype.finalize = function () {
        if ((X.prototype.finalize.call(this), this.inner)) {
          this.inner = !1
          const l = this.array()
          X.call(this, this.sharedMemory),
          this.update(this.oKeyPad),
          this.update(l),
          X.prototype.finalize.call(this)
        }
      })
      const me = ne();
      (me.md5 = me),
      (me.md5.hmac = de()),
      a
        ? (yr.exports = me)
        : ((n.md5 = me),
          d &&
                          define(function () {
                            return me
                          }))
    })()
  })
  const Hi = ['top', 'right', 'bottom', 'left']
  const Pi = ['start', 'end']
  const Ri = Hi.reduce(
    (e, t) => e.concat(t, t + '-' + Pi[0], t + '-' + Pi[1]),
    []
  )
  const Et = Math.min
  const tt = Math.max
  const hr = Math.round
  const pr = Math.floor
  const nn = (e) => ({ x: e, y: e })
  const Zo = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
  const Qo = { start: 'end', end: 'start' }
  function Jr (e, t, r) {
    return tt(e, Et(t, r))
  }
  function jt (e, t) {
    return typeof e === 'function' ? e(t) : e
  }
  function pt (e) {
    return e.split('-')[0]
  }
  function xt (e) {
    return e.split('-')[1]
  }
  function $i (e) {
    return e === 'x' ? 'y' : 'x'
  }
  function Zr (e) {
    return e === 'y' ? 'height' : 'width'
  }
  function Pn (e) {
    return ['top', 'bottom'].includes(pt(e)) ? 'y' : 'x'
  }
  function Qr (e) {
    return $i(Pn(e))
  }
  function Wi (e, t, r) {
    r === void 0 && (r = !1)
    const n = xt(e)
    const i = Qr(e)
    const o = Zr(i)
    let a =
            i === 'x'
              ? n === (r ? 'end' : 'start')
                ? 'right'
                : 'left'
              : n === 'start'
                ? 'bottom'
                : 'top'
    return t.reference[o] > t.floating[o] && (a = mr(a)), [a, mr(a)]
  }
  function ea (e) {
    const t = mr(e)
    return [vr(e), t, vr(t)]
  }
  function vr (e) {
    return e.replace(/start|end/g, (t) => Qo[t])
  }
  function ta (e, t, r) {
    const n = ['left', 'right']
    const i = ['right', 'left']
    const o = ['top', 'bottom']
    const a = ['bottom', 'top']
    switch (e) {
      case 'top':
      case 'bottom':
        return r ? (t ? i : n) : t ? n : i
      case 'left':
      case 'right':
        return t ? o : a
      default:
        return []
    }
  }
  function na (e, t, r, n) {
    const i = xt(e)
    let o = ta(pt(e), r === 'start', n)
    return (
      i &&
                ((o = o.map((a) => a + '-' + i)),
                t && (o = o.concat(o.map(vr)))),
      o
    )
  }
  function mr (e) {
    return e.replace(/left|right|bottom|top/g, (t) => Zo[t])
  }
  function ra (e) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...e }
  }
  function ei (e) {
    return typeof e !== 'number'
      ? ra(e)
      : { top: e, right: e, bottom: e, left: e }
  }
  function Cn (e) {
    return {
      ...e,
      top: e.y,
      left: e.x,
      right: e.x + e.width,
      bottom: e.y + e.height
    }
  }
  function Mi (e, t, r) {
    const { reference: n, floating: i } = e
    const o = Pn(t)
    const a = Qr(t)
    const d = Zr(a)
    const f = pt(t)
    const u = o === 'y'
    const w = n.x + n.width / 2 - i.width / 2
    const m = n.y + n.height / 2 - i.height / 2
    const E = n[d] / 2 - i[d] / 2
    let O
    switch (f) {
      case 'top':
        O = { x: w, y: n.y - i.height }
        break
      case 'bottom':
        O = { x: w, y: n.y + n.height }
        break
      case 'right':
        O = { x: n.x + n.width, y: m }
        break
      case 'left':
        O = { x: n.x - i.width, y: m }
        break
      default:
        O = { x: n.x, y: n.y }
    }
    switch (xt(t)) {
      case 'start':
        O[a] -= E * (r && u ? -1 : 1)
        break
      case 'end':
        O[a] += E * (r && u ? -1 : 1)
        break
    }
    return O
  }
  const ia = async (e, t, r) => {
    const {
      placement: n = 'bottom',
      strategy: i = 'absolute',
      middleware: o = [],
      platform: a
    } = r
    const d = o.filter(Boolean)
    const f = await (a.isRTL == null ? void 0 : a.isRTL(t))
    let u = await a.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    })
    let { x: w, y: m } = Mi(u, n, f)
    let E = n
    let O = {}
    let S = 0
    for (let R = 0; R < d.length; R++) {
      const { name: I, fn: $ } = d[R]
      const {
        x: A,
        y: k,
        data: Y,
        reset: ne
      } = await $({
        x: w,
        y: m,
        initialPlacement: n,
        placement: E,
        strategy: i,
        middlewareData: O,
        rects: u,
        platform: a,
        elements: { reference: e, floating: t }
      });
      (w = A ?? w),
      (m = k ?? m),
      (O = { ...O, [I]: { ...O[I], ...Y } }),
      ne &&
                    S <= 50 &&
                    (S++,
                    typeof ne === 'object' &&
                        (ne.placement && (E = ne.placement),
                        ne.rects &&
                            (u =
                                ne.rects === !0
                                  ? await a.getElementRects({
                                    reference: e,
                                    floating: t,
                                    strategy: i
                                  })
                                  : ne.rects),
                        ({ x: w, y: m } = Mi(u, E, f))),
                    (R = -1))
    }
    return { x: w, y: m, placement: E, strategy: i, middlewareData: O }
  }
  async function _n (e, t) {
    let r
    t === void 0 && (t = {})
    const {
      x: n,
      y: i,
      platform: o,
      rects: a,
      elements: d,
      strategy: f
    } = e
    const {
      boundary: u = 'clippingAncestors',
      rootBoundary: w = 'viewport',
      elementContext: m = 'floating',
      altBoundary: E = !1,
      padding: O = 0
    } = jt(t, e)
    const S = ei(O)
    const I = d[E ? (m === 'floating' ? 'reference' : 'floating') : m]
    const $ = Cn(
      await o.getClippingRect({
        element:
                    (r = await (o.isElement == null
                      ? void 0
                      : o.isElement(I))) == null || r
                      ? I
                      : I.contextElement ||
                          (await (o.getDocumentElement == null
                            ? void 0
                            : o.getDocumentElement(d.floating))),
        boundary: u,
        rootBoundary: w,
        strategy: f
      })
    )
    const A =
            m === 'floating' ? { ...a.floating, x: n, y: i } : a.reference
    const k = await (o.getOffsetParent == null
      ? void 0
      : o.getOffsetParent(d.floating))
    const Y = (await (o.isElement == null ? void 0 : o.isElement(k)))
      ? (await (o.getScale == null ? void 0 : o.getScale(k))) || {
          x: 1,
          y: 1
        }
      : { x: 1, y: 1 }
    const ne = Cn(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect(
          {
            elements: d,
            rect: A,
            offsetParent: k,
            strategy: f
          }
        )
        : A
    )
    return {
      top: ($.top - ne.top + S.top) / Y.y,
      bottom: (ne.bottom - $.bottom + S.bottom) / Y.y,
      left: ($.left - ne.left + S.left) / Y.x,
      right: (ne.right - $.right + S.right) / Y.x
    }
  }
  const oa = (e) => ({
    name: 'arrow',
    options: e,
    async fn (t) {
      const {
        x: r,
        y: n,
        placement: i,
        rects: o,
        platform: a,
        elements: d,
        middlewareData: f
      } = t
      const { element: u, padding: w = 0 } = jt(e, t) || {}
      if (u == null) return {}
      const m = ei(w)
      const E = { x: r, y: n }
      const O = Qr(i)
      const S = Zr(O)
      const R = await a.getDimensions(u)
      const I = O === 'y'
      const $ = I ? 'top' : 'left'
      const A = I ? 'bottom' : 'right'
      const k = I ? 'clientHeight' : 'clientWidth'
      const Y = o.reference[S] + o.reference[O] - E[O] - o.floating[S]
      const ne = E[O] - o.reference[O]
      const J = await (a.getOffsetParent == null
        ? void 0
        : a.getOffsetParent(u))
      let V = J ? J[k] : 0;
      (!V || !(await (a.isElement == null ? void 0 : a.isElement(J)))) &&
                (V = d.floating[k] || o.floating[S])
      const de = Y / 2 - ne / 2
      const X = V / 2 - R[S] / 2 - 1
      const Z = Et(m[$], X)
      const me = Et(m[A], X)
      const l = Z
      const h = V - R[S] - me
      const v = V / 2 - R[S] / 2 + de
      const p = Jr(l, v, h)
      const j =
                !f.arrow &&
                xt(i) != null &&
                v !== p &&
                o.reference[S] / 2 - (v < l ? Z : me) - R[S] / 2 < 0
      const P = j ? (v < l ? v - l : v - h) : 0
      return {
        [O]: E[O] + P,
        data: {
          [O]: p,
          centerOffset: v - p - P,
          ...(j && { alignmentOffset: P })
        },
        reset: j
      }
    }
  })
  function aa (e, t, r) {
    return (
      e
        ? [
            ...r.filter((i) => xt(i) === e),
            ...r.filter((i) => xt(i) !== e)
          ]
        : r.filter((i) => pt(i) === i)
    ).filter((i) => (e ? xt(i) === e || (t ? vr(i) !== i : !1) : !0))
  }
  const sa = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'autoPlacement',
        options: e,
        async fn (t) {
          let r, n, i
          const {
            rects: o,
            middlewareData: a,
            placement: d,
            platform: f,
            elements: u
          } = t
          const {
            crossAxis: w = !1,
            alignment: m,
            allowedPlacements: E = Ri,
            autoAlignment: O = !0,
            ...S
          } = jt(e, t)
          const R =
                        m !== void 0 || E === Ri ? aa(m || null, O, E) : E
          const I = await _n(t, S)
          const $ =
                        ((r = a.autoPlacement) == null ? void 0 : r.index) || 0
          const A = R[$]
          if (A == null) return {}
          const k = Wi(
            A,
            o,
            await (f.isRTL == null ? void 0 : f.isRTL(u.floating))
          )
          if (d !== A) return { reset: { placement: R[0] } }
          const Y = [I[pt(A)], I[k[0]], I[k[1]]]
          const ne = [
            ...(((n = a.autoPlacement) == null
              ? void 0
              : n.overflows) || []),
            { placement: A, overflows: Y }
          ]
          const J = R[$ + 1]
          if (J) {
            return {
              data: { index: $ + 1, overflows: ne },
              reset: { placement: J }
            }
          }
          const V = ne
            .map((Z) => {
              const me = xt(Z.placement)
              return [
                Z.placement,
                me && w
                  ? Z.overflows
                    .slice(0, 2)
                    .reduce((l, h) => l + h, 0)
                  : Z.overflows[0],
                Z.overflows
              ]
            })
            .sort((Z, me) => Z[1] - me[1])
          const X =
                        ((i = V.filter((Z) =>
                          Z[2]
                            .slice(0, xt(Z[0]) ? 2 : 3)
                            .every((me) => me <= 0)
                        )[0]) == null
                          ? void 0
                          : i[0]) || V[0][0]
          return X !== d
            ? {
                data: { index: $ + 1, overflows: ne },
                reset: { placement: X }
              }
            : {}
        }
      }
    )
  }
  const la = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn (t) {
          let r, n
          const {
            placement: i,
            middlewareData: o,
            rects: a,
            initialPlacement: d,
            platform: f,
            elements: u
          } = t
          const {
            mainAxis: w = !0,
            crossAxis: m = !0,
            fallbackPlacements: E,
            fallbackStrategy: O = 'bestFit',
            fallbackAxisSideDirection: S = 'none',
            flipAlignment: R = !0,
            ...I
          } = jt(e, t)
          if ((r = o.arrow) != null && r.alignmentOffset) {
            return {}
          }
          const $ = pt(i)
          const A = pt(d) === d
          const k = await (f.isRTL == null
            ? void 0
            : f.isRTL(u.floating))
          const Y = E || (A || !R ? [mr(d)] : ea(d))
          !E && S !== 'none' && Y.push(...na(d, R, S, k))
          const ne = [d, ...Y]
          const J = await _n(t, I)
          const V = []
          let de =
                        ((n = o.flip) == null ? void 0 : n.overflows) || []
          if ((w && V.push(J[$]), m)) {
            const l = Wi(i, a, k)
            V.push(J[l[0]], J[l[1]])
          }
          if (
            ((de = [...de, { placement: i, overflows: V }]),
            !V.every((l) => l <= 0))
          ) {
            let X, Z
            const l =
                            (((X = o.flip) == null ? void 0 : X.index) || 0) +
                            1
            const h = ne[l]
            if (h) {
              return {
                data: { index: l, overflows: de },
                reset: { placement: h }
              }
            }
            let v =
                            (Z = de
                              .filter((p) => p.overflows[0] <= 0)
                              .sort(
                                (p, j) => p.overflows[1] - j.overflows[1]
                              )[0]) == null
                              ? void 0
                              : Z.placement
            if (!v) {
              switch (O) {
                case 'bestFit': {
                  let me
                  const p =
                                        (me = de
                                          .map((j) => [
                                            j.placement,
                                            j.overflows
                                              .filter((P) => P > 0)
                                              .reduce((P, M) => P + M, 0)
                                          ])
                                          .sort((j, P) => j[1] - P[1])[0]) ==
                                        null
                                          ? void 0
                                          : me[0]
                  p && (v = p)
                  break
                }
                case 'initialPlacement':
                  v = d
                  break
              }
            }
            if (i !== v) return { reset: { placement: v } }
          }
          return {}
        }
      }
    )
  }
  function Ii (e, t) {
    return {
      top: e.top - t.height,
      right: e.right - t.width,
      bottom: e.bottom - t.height,
      left: e.left - t.width
    }
  }
  function Fi (e) {
    return Hi.some((t) => e[t] >= 0)
  }
  const ca = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn (t) {
          const { rects: r } = t
          const { strategy: n = 'referenceHidden', ...i } = jt(e, t)
          switch (n) {
            case 'referenceHidden': {
              const o = await _n(t, {
                ...i,
                elementContext: 'reference'
              })
              const a = Ii(o, r.reference)
              return {
                data: {
                  referenceHiddenOffsets: a,
                  referenceHidden: Fi(a)
                }
              }
            }
            case 'escaped': {
              const o = await _n(t, { ...i, altBoundary: !0 })
              const a = Ii(o, r.floating)
              return {
                data: { escapedOffsets: a, escaped: Fi(a) }
              }
            }
            default:
              return {}
          }
        }
      }
    )
  }
  function Ui (e) {
    const t = Et(...e.map((o) => o.left))
    const r = Et(...e.map((o) => o.top))
    const n = tt(...e.map((o) => o.right))
    const i = tt(...e.map((o) => o.bottom))
    return { x: t, y: r, width: n - t, height: i - r }
  }
  function fa (e) {
    const t = e.slice().sort((i, o) => i.y - o.y)
    const r = []
    let n = null
    for (let i = 0; i < t.length; i++) {
      const o = t[i]
      !n || o.y - n.y > n.height / 2
        ? r.push([o])
        : r[r.length - 1].push(o),
      (n = o)
    }
    return r.map((i) => Cn(Ui(i)))
  }
  const ua = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'inline',
        options: e,
        async fn (t) {
          const {
            placement: r,
            elements: n,
            rects: i,
            platform: o,
            strategy: a
          } = t
          const { padding: d = 2, x: f, y: u } = jt(e, t)
          const w = Array.from(
            (await (o.getClientRects == null
              ? void 0
              : o.getClientRects(n.reference))) || []
          )
          const m = fa(w)
          const E = Cn(Ui(w))
          const O = ei(d)
          function S () {
            if (
              m.length === 2 &&
                            m[0].left > m[1].right &&
                            f != null &&
                            u != null
            ) {
              return (
                m.find(
                  (I) =>
                    f > I.left - O.left &&
                                        f < I.right + O.right &&
                                        u > I.top - O.top &&
                                        u < I.bottom + O.bottom
                ) || E
              )
            }
            if (m.length >= 2) {
              if (Pn(r) === 'y') {
                const Z = m[0]
                const me = m[m.length - 1]
                const l = pt(r) === 'top'
                const h = Z.top
                const v = me.bottom
                const p = l ? Z.left : me.left
                const j = l ? Z.right : me.right
                const P = j - p
                const M = v - h
                return {
                  top: h,
                  bottom: v,
                  left: p,
                  right: j,
                  width: P,
                  height: M,
                  x: p,
                  y: h
                }
              }
              const I = pt(r) === 'left'
              const $ = tt(...m.map((Z) => Z.right))
              const A = Et(...m.map((Z) => Z.left))
              const k = m.filter((Z) =>
                I ? Z.left === A : Z.right === $
              )
              const Y = k[0].top
              const ne = k[k.length - 1].bottom
              const J = A
              const V = $
              const de = V - J
              const X = ne - Y
              return {
                top: Y,
                bottom: ne,
                left: J,
                right: V,
                width: de,
                height: X,
                x: J,
                y: Y
              }
            }
            return E
          }
          const R = await o.getElementRects({
            reference: { getBoundingClientRect: S },
            floating: n.floating,
            strategy: a
          })
          return i.reference.x !== R.reference.x ||
                        i.reference.y !== R.reference.y ||
                        i.reference.width !== R.reference.width ||
                        i.reference.height !== R.reference.height
            ? { reset: { rects: R } }
            : {}
        }
      }
    )
  }
  async function da (e, t) {
    const { placement: r, platform: n, elements: i } = e
    const o = await (n.isRTL == null ? void 0 : n.isRTL(i.floating))
    const a = pt(r)
    const d = xt(r)
    const f = Pn(r) === 'y'
    const u = ['left', 'top'].includes(a) ? -1 : 1
    const w = o && f ? -1 : 1
    const m = jt(t, e)
    let {
      mainAxis: E,
      crossAxis: O,
      alignmentAxis: S
    } = typeof m === 'number'
      ? { mainAxis: m, crossAxis: 0, alignmentAxis: null }
      : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...m }
    return (
      d && typeof S === 'number' && (O = d === 'end' ? S * -1 : S),
      f ? { x: O * w, y: E * u } : { x: E * u, y: O * w }
    )
  }
  const Vi = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn (t) {
          let r, n
          const { x: i, y: o, placement: a, middlewareData: d } = t
          const f = await da(t, e)
          return a ===
                        ((r = d.offset) == null ? void 0 : r.placement) &&
                        (n = d.arrow) != null &&
                        n.alignmentOffset
            ? {}
            : {
                x: i + f.x,
                y: o + f.y,
                data: { ...f, placement: a }
              }
        }
      }
    )
  }
  const pa = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn (t) {
          const { x: r, y: n, placement: i } = t
          const {
            mainAxis: o = !0,
            crossAxis: a = !1,
            limiter: d = {
              fn: (I) => {
                const { x: $, y: A } = I
                return { x: $, y: A }
              }
            },
            ...f
          } = jt(e, t)
          const u = { x: r, y: n }
          const w = await _n(t, f)
          const m = Pn(pt(i))
          const E = $i(m)
          let O = u[E]
          let S = u[m]
          if (o) {
            const I = E === 'y' ? 'top' : 'left'
            const $ = E === 'y' ? 'bottom' : 'right'
            const A = O + w[I]
            const k = O - w[$]
            O = Jr(A, O, k)
          }
          if (a) {
            const I = m === 'y' ? 'top' : 'left'
            const $ = m === 'y' ? 'bottom' : 'right'
            const A = S + w[I]
            const k = S - w[$]
            S = Jr(A, S, k)
          }
          const R = d.fn({ ...t, [E]: O, [m]: S })
          return { ...R, data: { x: R.x - r, y: R.y - n } }
        }
      }
    )
  }
  const ha = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn (t) {
          const {
            placement: r,
            rects: n,
            platform: i,
            elements: o
          } = t
          const { apply: a = () => {}, ...d } = jt(e, t)
          const f = await _n(t, d)
          const u = pt(r)
          const w = xt(r)
          const m = Pn(r) === 'y'
          const { width: E, height: O } = n.floating
          let S
          let R
          u === 'top' || u === 'bottom'
            ? ((S = u),
              (R =
                              w ===
                              ((await (i.isRTL == null
                                ? void 0
                                : i.isRTL(o.floating)))
                                ? 'start'
                                : 'end')
                                ? 'left'
                                : 'right'))
            : ((R = u), (S = w === 'end' ? 'top' : 'bottom'))
          const I = O - f[S]
          const $ = E - f[R]
          const A = !t.middlewareData.shift
          let k = I
          let Y = $
          if (m) {
            const J = E - f.left - f.right
            Y = w || A ? Et($, J) : J
          } else {
            const J = O - f.top - f.bottom
            k = w || A ? Et(I, J) : J
          }
          if (A && !w) {
            const J = tt(f.left, 0)
            const V = tt(f.right, 0)
            const de = tt(f.top, 0)
            const X = tt(f.bottom, 0)
            m
              ? (Y =
                                  E -
                                  2 *
                                      (J !== 0 || V !== 0
                                        ? J + V
                                        : tt(f.left, f.right)))
              : (k =
                                  O -
                                  2 *
                                      (de !== 0 || X !== 0
                                        ? de + X
                                        : tt(f.top, f.bottom)))
          }
          await a({
            ...t,
            availableWidth: Y,
            availableHeight: k
          })
          const ne = await i.getDimensions(o.floating)
          return E !== ne.width || O !== ne.height
            ? { reset: { rects: !0 } }
            : {}
        }
      }
    )
  }
  function rn (e) {
    return zi(e) ? (e.nodeName || '').toLowerCase() : '#document'
  }
  function ct (e) {
    let t
    return (
      (e == null || (t = e.ownerDocument) == null
        ? void 0
        : t.defaultView) || window
    )
  }
  function Bt (e) {
    let t
    return (t =
            (zi(e) ? e.ownerDocument : e.document) || window.document) == null
      ? void 0
      : t.documentElement
  }
  function zi (e) {
    return e instanceof Node || e instanceof ct(e).Node
  }
  function kt (e) {
    return e instanceof Element || e instanceof ct(e).Element
  }
  function Tt (e) {
    return e instanceof HTMLElement || e instanceof ct(e).HTMLElement
  }
  function Li (e) {
    return typeof ShadowRoot > 'u'
      ? !1
      : e instanceof ShadowRoot || e instanceof ct(e).ShadowRoot
  }
  function zn (e) {
    const { overflow: t, overflowX: r, overflowY: n, display: i } = ht(e)
    return (
      /auto|scroll|overlay|hidden|clip/.test(t + n + r) &&
            !['inline', 'contents'].includes(i)
    )
  }
  function va (e) {
    return ['table', 'td', 'th'].includes(rn(e))
  }
  function ti (e) {
    const t = ni()
    const r = ht(e)
    return (
      r.transform !== 'none' ||
            r.perspective !== 'none' ||
            (r.containerType ? r.containerType !== 'normal' : !1) ||
            (!t && (r.backdropFilter ? r.backdropFilter !== 'none' : !1)) ||
            (!t && (r.filter ? r.filter !== 'none' : !1)) ||
            ['transform', 'perspective', 'filter'].some((n) =>
              (r.willChange || '').includes(n)
            ) ||
            ['paint', 'layout', 'strict', 'content'].some((n) =>
              (r.contain || '').includes(n)
            )
    )
  }
  function ma (e) {
    let t = Tn(e)
    for (; Tt(t) && !gr(t);) {
      if (ti(t)) return t
      t = Tn(t)
    }
    return null
  }
  function ni () {
    return typeof CSS > 'u' || !CSS.supports
      ? !1
      : CSS.supports('-webkit-backdrop-filter', 'none')
  }
  function gr (e) {
    return ['html', 'body', '#document'].includes(rn(e))
  }
  function ht (e) {
    return ct(e).getComputedStyle(e)
  }
  function br (e) {
    return kt(e)
      ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
      : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset }
  }
  function Tn (e) {
    if (rn(e) === 'html') return e
    const t = e.assignedSlot || e.parentNode || (Li(e) && e.host) || Bt(e)
    return Li(t) ? t.host : t
  }
  function Yi (e) {
    const t = Tn(e)
    return gr(t)
      ? e.ownerDocument
        ? e.ownerDocument.body
        : e.body
      : Tt(t) && zn(t)
        ? t
        : Yi(t)
  }
  function Vn (e, t, r) {
    let n
    t === void 0 && (t = []), r === void 0 && (r = !0)
    const i = Yi(e)
    const o = i === ((n = e.ownerDocument) == null ? void 0 : n.body)
    const a = ct(i)
    return o
      ? t.concat(
        a,
        a.visualViewport || [],
        zn(i) ? i : [],
        a.frameElement && r ? Vn(a.frameElement) : []
      )
      : t.concat(i, Vn(i, [], r))
  }
  function Xi (e) {
    const t = ht(e)
    let r = parseFloat(t.width) || 0
    let n = parseFloat(t.height) || 0
    const i = Tt(e)
    const o = i ? e.offsetWidth : r
    const a = i ? e.offsetHeight : n
    const d = hr(r) !== o || hr(n) !== a
    return d && ((r = o), (n = a)), { width: r, height: n, $: d }
  }
  function ri (e) {
    return kt(e) ? e : e.contextElement
  }
  function Dn (e) {
    const t = ri(e)
    if (!Tt(t)) return nn(1)
    const r = t.getBoundingClientRect()
    const { width: n, height: i, $: o } = Xi(t)
    let a = (o ? hr(r.width) : r.width) / n
    let d = (o ? hr(r.height) : r.height) / i
    return (
      (!a || !Number.isFinite(a)) && (a = 1),
      (!d || !Number.isFinite(d)) && (d = 1),
      { x: a, y: d }
    )
  }
  const ga = nn(0)
  function qi (e) {
    const t = ct(e)
    return !ni() || !t.visualViewport
      ? ga
      : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
  }
  function ba (e, t, r) {
    return t === void 0 && (t = !1), !r || (t && r !== ct(e)) ? !1 : t
  }
  function vn (e, t, r, n) {
    t === void 0 && (t = !1), r === void 0 && (r = !1)
    const i = e.getBoundingClientRect()
    const o = ri(e)
    let a = nn(1)
    t && (n ? kt(n) && (a = Dn(n)) : (a = Dn(e)))
    const d = ba(o, r, n) ? qi(o) : nn(0)
    let f = (i.left + d.x) / a.x
    let u = (i.top + d.y) / a.y
    let w = i.width / a.x
    let m = i.height / a.y
    if (o) {
      const E = ct(o)
      const O = n && kt(n) ? ct(n) : n
      let S = E
      let R = S.frameElement
      for (; R && n && O !== S;) {
        const I = Dn(R)
        const $ = R.getBoundingClientRect()
        const A = ht(R)
        const k =
                    $.left + (R.clientLeft + parseFloat(A.paddingLeft)) * I.x
        const Y =
                    $.top + (R.clientTop + parseFloat(A.paddingTop)) * I.y;
        (f *= I.x),
        (u *= I.y),
        (w *= I.x),
        (m *= I.y),
        (f += k),
        (u += Y),
        (S = ct(R)),
        (R = S.frameElement)
      }
    }
    return Cn({ width: w, height: m, x: f, y: u })
  }
  const ya = [':popover-open', ':modal']
  function Gi (e) {
    return ya.some((t) => {
      try {
        return e.matches(t)
      } catch {
        return !1
      }
    })
  }
  function wa (e) {
    const { elements: t, rect: r, offsetParent: n, strategy: i } = e
    const o = i === 'fixed'
    const a = Bt(n)
    const d = t ? Gi(t.floating) : !1
    if (n === a || (d && o)) return r
    let f = { scrollLeft: 0, scrollTop: 0 }
    let u = nn(1)
    const w = nn(0)
    const m = Tt(n)
    if (
      (m || (!m && !o)) &&
            ((rn(n) !== 'body' || zn(a)) && (f = br(n)), Tt(n))
    ) {
      const E = vn(n);
      (u = Dn(n)), (w.x = E.x + n.clientLeft), (w.y = E.y + n.clientTop)
    }
    return {
      width: r.width * u.x,
      height: r.height * u.y,
      x: r.x * u.x - f.scrollLeft * u.x + w.x,
      y: r.y * u.y - f.scrollTop * u.y + w.y
    }
  }
  function xa (e) {
    return Array.from(e.getClientRects())
  }
  function Ki (e) {
    return vn(Bt(e)).left + br(e).scrollLeft
  }
  function Ea (e) {
    const t = Bt(e)
    const r = br(e)
    const n = e.ownerDocument.body
    const i = tt(
      t.scrollWidth,
      t.clientWidth,
      n.scrollWidth,
      n.clientWidth
    )
    const o = tt(
      t.scrollHeight,
      t.clientHeight,
      n.scrollHeight,
      n.clientHeight
    )
    let a = -r.scrollLeft + Ki(e)
    const d = -r.scrollTop
    return (
      ht(n).direction === 'rtl' &&
                (a += tt(t.clientWidth, n.clientWidth) - i),
      { width: i, height: o, x: a, y: d }
    )
  }
  function Oa (e, t) {
    const r = ct(e)
    const n = Bt(e)
    const i = r.visualViewport
    let o = n.clientWidth
    let a = n.clientHeight
    let d = 0
    let f = 0
    if (i) {
      (o = i.width), (a = i.height)
      const u = ni();
      (!u || (u && t === 'fixed')) &&
                ((d = i.offsetLeft), (f = i.offsetTop))
    }
    return { width: o, height: a, x: d, y: f }
  }
  function Sa (e, t) {
    const r = vn(e, !0, t === 'fixed')
    const n = r.top + e.clientTop
    const i = r.left + e.clientLeft
    const o = Tt(e) ? Dn(e) : nn(1)
    const a = e.clientWidth * o.x
    const d = e.clientHeight * o.y
    const f = i * o.x
    const u = n * o.y
    return { width: a, height: d, x: f, y: u }
  }
  function Ni (e, t, r) {
    let n
    if (t === 'viewport') n = Oa(e, r)
    else if (t === 'document') n = Ea(Bt(e))
    else if (kt(t)) n = Sa(t, r)
    else {
      const i = qi(e)
      n = { ...t, x: t.x - i.x, y: t.y - i.y }
    }
    return Cn(n)
  }
  function Ji (e, t) {
    const r = Tn(e)
    return r === t || !kt(r) || gr(r)
      ? !1
      : ht(r).position === 'fixed' || Ji(r, t)
  }
  function Aa (e, t) {
    const r = t.get(e)
    if (r) return r
    let n = Vn(e, [], !1).filter((d) => kt(d) && rn(d) !== 'body')
    let i = null
    const o = ht(e).position === 'fixed'
    let a = o ? Tn(e) : e
    for (; kt(a) && !gr(a);) {
      const d = ht(a)
      const f = ti(a)
      !f && d.position === 'fixed' && (i = null),
      (
        o
          ? !f && !i
          : (!f &&
                              d.position === 'static' &&
                              !!i &&
                              ['absolute', 'fixed'].includes(i.position)) ||
                          (zn(a) && !f && Ji(e, a))
      )
        ? (n = n.filter((w) => w !== a))
        : (i = d),
      (a = Tn(a))
    }
    return t.set(e, n), n
  }
  function Da (e) {
    const { element: t, boundary: r, rootBoundary: n, strategy: i } = e
    const a = [
      ...(r === 'clippingAncestors' ? Aa(t, this._c) : [].concat(r)),
      n
    ]
    const d = a[0]
    const f = a.reduce(
      (u, w) => {
        const m = Ni(t, w, i)
        return (
          (u.top = tt(m.top, u.top)),
          (u.right = Et(m.right, u.right)),
          (u.bottom = Et(m.bottom, u.bottom)),
          (u.left = tt(m.left, u.left)),
          u
        )
      },
      Ni(t, d, i)
    )
    return {
      width: f.right - f.left,
      height: f.bottom - f.top,
      x: f.left,
      y: f.top
    }
  }
  function Ca (e) {
    const { width: t, height: r } = Xi(e)
    return { width: t, height: r }
  }
  function _a (e, t, r) {
    const n = Tt(t)
    const i = Bt(t)
    const o = r === 'fixed'
    const a = vn(e, !0, o, t)
    let d = { scrollLeft: 0, scrollTop: 0 }
    const f = nn(0)
    if (n || (!n && !o)) {
      if (((rn(t) !== 'body' || zn(i)) && (d = br(t)), n)) {
        const m = vn(t, !0, o, t);
        (f.x = m.x + t.clientLeft), (f.y = m.y + t.clientTop)
      } else i && (f.x = Ki(i))
    }
    const u = a.left + d.scrollLeft - f.x
    const w = a.top + d.scrollTop - f.y
    return { x: u, y: w, width: a.width, height: a.height }
  }
  function ki (e, t) {
    return !Tt(e) || ht(e).position === 'fixed'
      ? null
      : t
        ? t(e)
        : e.offsetParent
  }
  function Zi (e, t) {
    const r = ct(e)
    if (!Tt(e) || Gi(e)) return r
    let n = ki(e, t)
    for (; n && va(n) && ht(n).position === 'static';) n = ki(n, t)
    return n &&
            (rn(n) === 'html' ||
                (rn(n) === 'body' && ht(n).position === 'static' && !ti(n)))
      ? r
      : n || ma(e) || r
  }
  const Ta = async function (e) {
    const t = this.getOffsetParent || Zi
    const r = this.getDimensions
    return {
      reference: _a(e.reference, await t(e.floating), e.strategy),
      floating: { x: 0, y: 0, ...(await r(e.floating)) }
    }
  }
  function Pa (e) {
    return ht(e).direction === 'rtl'
  }
  const Ra = {
    convertOffsetParentRelativeRectToViewportRelativeRect: wa,
    getDocumentElement: Bt,
    getClippingRect: Da,
    getOffsetParent: Zi,
    getElementRects: Ta,
    getClientRects: xa,
    getDimensions: Ca,
    getScale: Dn,
    isElement: kt,
    isRTL: Pa
  }
  function Ma (e, t) {
    let r = null
    let n
    const i = Bt(e)
    function o () {
      let d
      clearTimeout(n), (d = r) == null || d.disconnect(), (r = null)
    }
    function a (d, f) {
      d === void 0 && (d = !1), f === void 0 && (f = 1), o()
      const {
        left: u,
        top: w,
        width: m,
        height: E
      } = e.getBoundingClientRect()
      if ((d || t(), !m || !E)) return
      const O = pr(w)
      const S = pr(i.clientWidth - (u + m))
      const R = pr(i.clientHeight - (w + E))
      const I = pr(u)
      const A = {
        rootMargin: -O + 'px ' + -S + 'px ' + -R + 'px ' + -I + 'px',
        threshold: tt(0, Et(1, f)) || 1
      }
      let k = !0
      function Y (ne) {
        const J = ne[0].intersectionRatio
        if (J !== f) {
          if (!k) return a()
          J
            ? a(!1, J)
            : (n = setTimeout(() => {
                a(!1, 1e-7)
              }, 100))
        }
        k = !1
      }
      try {
        r = new IntersectionObserver(Y, {
          ...A,
          root: i.ownerDocument
        })
      } catch {
        r = new IntersectionObserver(Y, A)
      }
      r.observe(e)
    }
    return a(!0), o
  }
  function ji (e, t, r, n) {
    n === void 0 && (n = {})
    const {
      ancestorScroll: i = !0,
      ancestorResize: o = !0,
      elementResize: a = typeof ResizeObserver === 'function',
      layoutShift: d = typeof IntersectionObserver === 'function',
      animationFrame: f = !1
    } = n
    const u = ri(e)
    const w = i || o ? [...(u ? Vn(u) : []), ...Vn(t)] : []
    w.forEach(($) => {
      i && $.addEventListener('scroll', r, { passive: !0 }),
      o && $.addEventListener('resize', r)
    })
    const m = u && d ? Ma(u, r) : null
    let E = -1
    let O = null
    a &&
            ((O = new ResizeObserver(($) => {
              const [A] = $
              A &&
                    A.target === u &&
                    O &&
                    (O.unobserve(t),
                    cancelAnimationFrame(E),
                    (E = requestAnimationFrame(() => {
                      let k;
                      (k = O) == null || k.observe(t)
                    }))),
              r()
            })),
            u && !f && O.observe(u),
            O.observe(t))
    let S
    let R = f ? vn(e) : null
    f && I()
    function I () {
      const $ = vn(e)
      R &&
                ($.x !== R.x ||
                    $.y !== R.y ||
                    $.width !== R.width ||
                    $.height !== R.height) &&
                r(),
      (R = $),
      (S = requestAnimationFrame(I))
    }
    return (
      r(),
      () => {
        let $
        w.forEach((A) => {
          i && A.removeEventListener('scroll', r),
          o && A.removeEventListener('resize', r)
        }),
        m?.(),
        ($ = O) == null || $.disconnect(),
        (O = null),
        f && cancelAnimationFrame(S)
      }
    )
  }
  const ii = sa
  const Qi = pa
  const eo = la
  const to = ha
  const no = ca
  const ro = oa
  const io = ua
  const Bi = (e, t, r) => {
    const n = new Map()
    const i = { platform: Ra, ...r }
    const o = { ...i.platform, _c: n }
    return ia(e, t, { ...i, platform: o })
  }
  const Ia = (e) => {
    const t = {
      placement: 'bottom',
      strategy: 'absolute',
      middleware: []
    }
    const r = Object.keys(e)
    const n = (i) => e[i]
    return (
      r.includes('offset') && t.middleware.push(Vi(n('offset'))),
      r.includes('teleport') && (t.strategy = 'fixed'),
      r.includes('placement') && (t.placement = n('placement')),
      r.includes('autoPlacement') &&
                !r.includes('flip') &&
                t.middleware.push(ii(n('autoPlacement'))),
      r.includes('flip') && t.middleware.push(eo(n('flip'))),
      r.includes('shift') && t.middleware.push(Qi(n('shift'))),
      r.includes('inline') && t.middleware.push(io(n('inline'))),
      r.includes('arrow') && t.middleware.push(ro(n('arrow'))),
      r.includes('hide') && t.middleware.push(no(n('hide'))),
      r.includes('size') && t.middleware.push(to(n('size'))),
      t
    )
  }
  const Fa = (e, t) => {
    const r = {
      component: { trap: !1 },
      float: {
        placement: 'bottom',
        strategy: 'absolute',
        middleware: []
      }
    }
    const n = (i) => e[e.indexOf(i) + 1]
    if (
      (e.includes('trap') && (r.component.trap = !0),
      e.includes('teleport') && (r.float.strategy = 'fixed'),
      e.includes('offset') && r.float.middleware.push(Vi(t.offset || 10)),
      e.includes('placement') && (r.float.placement = n('placement')),
      e.includes('autoPlacement') &&
                !e.includes('flip') &&
                r.float.middleware.push(ii(t.autoPlacement)),
      e.includes('flip') && r.float.middleware.push(eo(t.flip)),
      e.includes('shift') && r.float.middleware.push(Qi(t.shift)),
      e.includes('inline') && r.float.middleware.push(io(t.inline)),
      e.includes('arrow') && r.float.middleware.push(ro(t.arrow)),
      e.includes('hide') && r.float.middleware.push(no(t.hide)),
      e.includes('size'))
    ) {
      const i = t.size?.availableWidth ?? null
      const o = t.size?.availableHeight ?? null
      i && delete t.size.availableWidth,
      o && delete t.size.availableHeight,
      r.float.middleware.push(
        to({
          ...t.size,
          apply ({
            availableWidth: a,
            availableHeight: d,
            elements: f
          }) {
            Object.assign(f.floating.style, {
              maxWidth: `${i ?? a}px`,
              maxHeight: `${o ?? d}px`
            })
          }
        })
      )
    }
    return r
  }
  const La = (e) => {
    const t =
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split(
              ''
            )
    let r = ''
    e || (e = Math.floor(Math.random() * t.length))
    for (let n = 0; n < e; n++) {
      r += t[Math.floor(Math.random() * t.length)]
    }
    return r
  }
  function Na (e, t = () => {}) {
    let r = !1
    return function () {
      r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments))
    }
  }
  function ka (e) {
    const t = { dismissable: !0, trap: !1 }
    function r (n, i = null) {
      if (n) {
        if (
          (n.hasAttribute('aria-expanded') ||
                        n.setAttribute('aria-expanded', !1),
          i.hasAttribute('id'))
        ) {
          n.setAttribute('aria-controls', i.getAttribute('id'))
        } else {
          const o = `panel-${La(8)}`
          n.setAttribute('aria-controls', o), i.setAttribute('id', o)
        }
        i.setAttribute('aria-modal', !0),
        i.setAttribute('role', 'dialog')
      }
    }
    e.magic('float', (n) => (i = {}, o = {}) => {
      const a = { ...t, ...o }
      const d =
                Object.keys(i).length > 0 ? Ia(i) : { middleware: [ii()] }
      const f = n
      const u = n.parentElement.closest('[x-data]')
      const w = u.querySelector('[x-ref="panel"]')
      r(f, w)
      function m () {
        return w.style.display == 'block'
      }
      function E () {
        (w.style.display = 'none'),
        f.setAttribute('aria-expanded', 'false'),
        a.trap && w.setAttribute('x-trap', 'false'),
        ji(n, w, R)
      }
      function O () {
        (w.style.display = 'block'),
        f.setAttribute('aria-expanded', 'true'),
        a.trap && w.setAttribute('x-trap', 'true'),
        R()
      }
      function S () {
        m() ? E() : O()
      }
      async function R () {
        return await Bi(n, w, d).then(
          ({ middlewareData: I, placement: $, x: A, y: k }) => {
            if (I.arrow) {
              const Y = I.arrow?.x
              const ne = I.arrow?.y
              const J = d.middleware.filter(
                (de) => de.name == 'arrow'
              )[0].options.element
              const V = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
              }[$.split('-')[0]]
              Object.assign(J.style, {
                left: Y != null ? `${Y}px` : '',
                top: ne != null ? `${ne}px` : '',
                right: '',
                bottom: '',
                [V]: '-4px'
              })
            }
            if (I.hide) {
              const { referenceHidden: Y } = I.hide
              Object.assign(w.style, {
                visibility: Y ? 'hidden' : 'visible'
              })
            }
            Object.assign(w.style, {
              left: `${A}px`,
              top: `${k}px`
            })
          }
        )
      }
      a.dismissable &&
                (window.addEventListener('click', (I) => {
                  !u.contains(I.target) && m() && S()
                }),
                window.addEventListener(
                  'keydown',
                  (I) => {
                    I.key === 'Escape' && m() && S()
                  },
                  !0
                )),
      S()
    }),
    e.directive(
      'float',
      (
        n,
        { modifiers: i, expression: o },
        { evaluate: a, effect: d }
      ) => {
        const f = o ? a(o) : {}
        const u = i.length > 0 ? Fa(i, f) : {}
        let w = null
        u.float.strategy == 'fixed' && (n.style.position = 'fixed')
        const m = (V) =>
          n.parentElement &&
                        !n.parentElement.closest('[x-data]').contains(V.target)
            ? n.close()
            : null
        const E = (V) => (V.key === 'Escape' ? n.close() : null)
        const O = n.getAttribute('x-ref')
        const S = n.parentElement.closest('[x-data]')
        const R = S.querySelectorAll(`[\\@click^="$refs.${O}"]`)
        const I = S.querySelectorAll(
                        `[x-on\\:click^="$refs.${O}"]`
        )
        n.style.setProperty('display', 'none'),
        r([...R, ...I][0], n),
        (n._x_isShown = !1),
        (n.trigger = null),
        n._x_doHide ||
                            (n._x_doHide = () => {
                              n.style.setProperty(
                                'display',
                                'none',
                                i.includes('important')
                                  ? 'important'
                                  : void 0
                              )
                            }),
        n._x_doShow ||
                            (n._x_doShow = () => {
                              n.style.setProperty(
                                'display',
                                'block',
                                i.includes('important')
                                  ? 'important'
                                  : void 0
                              )
                            })
        const $ = () => {
          n._x_doHide(), (n._x_isShown = !1)
        }
        const A = () => {
          n._x_doShow(), (n._x_isShown = !0)
        }
        const k = () => setTimeout(A)
        const Y = Na(
          (V) => (V ? A() : $()),
          (V) => {
            typeof n._x_toggleAndCascadeWithTransitions ===
                            'function'
              ? n._x_toggleAndCascadeWithTransitions(
                n,
                V,
                A,
                $
              )
              : V
                ? k()
                : $()
          }
        )
        let ne
        let J = !0
        d(() =>
          a((V) => {
            (!J && V === ne) ||
                                (i.includes('immediate') && (V ? k() : $()),
                                Y(V),
                                (ne = V),
                                (J = !1))
          })
        ),
        (n.open = async function (V) {
          (n.trigger = V.currentTarget ? V.currentTarget : V),
          Y(!0),
          n.trigger.setAttribute('aria-expanded', 'true'),
          u.component.trap &&
                                    n.setAttribute('x-trap', 'true'),
          (w = ji(n.trigger, n, () => {
            Bi(n.trigger, n, u.float).then(
              ({
                middlewareData: de,
                placement: X,
                x: Z,
                y: me
              }) => {
                if (de.arrow) {
                  const l = de.arrow?.x
                  const h = de.arrow?.y
                  const v =
                                                    u.float.middleware.filter(
                                                      (j) =>
                                                        j.name == 'arrow'
                                                    )[0].options.element
                  const p = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                  }[X.split('-')[0]]
                  Object.assign(v.style, {
                    left:
                                                        l != null
                                                          ? `${l}px`
                                                          : '',
                    top:
                                                        h != null
                                                          ? `${h}px`
                                                          : '',
                    right: '',
                    bottom: '',
                    [p]: '-4px'
                  })
                }
                if (de.hide) {
                  const { referenceHidden: l } =
                                                    de.hide
                  Object.assign(n.style, {
                    visibility: l
                      ? 'hidden'
                      : 'visible'
                  })
                }
                Object.assign(n.style, {
                  left: `${Z}px`,
                  top: `${me}px`
                })
              }
            )
          })),
          window.addEventListener('click', m),
          window.addEventListener('keydown', E, !0)
        }),
        (n.close = function () {
          if (!n._x_isShown) return !1
          Y(!1),
          n.trigger.setAttribute(
            'aria-expanded',
            'false'
          ),
          u.component.trap &&
                                    n.setAttribute('x-trap', 'false'),
          w(),
          window.removeEventListener('click', m),
          window.removeEventListener('keydown', E, !1)
        }),
        (n.toggle = function (V) {
          n._x_isShown ? n.close() : n.open(V)
        })
      }
    )
  }
  const oo = ka
  function ja (e) {
    e.store('lazyLoadedAssets', {
      loaded: new Set(),
      check (a) {
        return Array.isArray(a)
          ? a.every((d) => this.loaded.has(d))
          : this.loaded.has(a)
      },
      markLoaded (a) {
        Array.isArray(a)
          ? a.forEach((d) => this.loaded.add(d))
          : this.loaded.add(a)
      }
    })
    const t = (a) =>
      new CustomEvent(a, {
        bubbles: !0,
        composed: !0,
        cancelable: !0
      })
    const r = (a, d = {}, f, u) => {
      const w = document.createElement(a)
      return (
        Object.entries(d).forEach(([m, E]) => (w[m] = E)),
        f && (u ? f.insertBefore(w, u) : f.appendChild(w)),
        w
      )
    }
    const n = (a, d, f = {}, u = null, w = null) => {
      const m = a === 'link' ? `link[href="${d}"]` : `script[src="${d}"]`
      if (
        document.querySelector(m) ||
                e.store('lazyLoadedAssets').check(d)
      ) {
        return Promise.resolve()
      }
      const E = a === 'link' ? { ...f, href: d } : { ...f, src: d }
      const O = r(a, E, u, w)
      return new Promise((S, R) => {
        (O.onload = () => {
          e.store('lazyLoadedAssets').markLoaded(d), S()
        }),
        (O.onerror = () => {
          R(new Error(`Failed to load ${a}: ${d}`))
        })
      })
    }
    const i = async (a, d, f = null, u = null) => {
      const w = { type: 'text/css', rel: 'stylesheet' }
      d && (w.media = d)
      let m = document.head
      let E = null
      if (f && u) {
        const O = document.querySelector(`link[href*="${u}"]`)
        O
          ? ((m = O.parentElement),
            (E = f === 'before' ? O : O.nextSibling))
          : (console.warn(
                          `Target (${u}) not found for ${a}. Appending to head.`
            ),
            (m = document.head),
            (E = null))
      }
      await n('link', a, w, m, E)
    }
    const o = async (a, d, f = null, u = null, w = null) => {
      let m = document.head
      let E = null
      if (f && u) {
        const S = document.querySelector(`script[src*="${u}"]`)
        S
          ? ((m = S.parentElement),
            (E = f === 'before' ? S : S.nextSibling))
          : (console.warn(
                          `Target (${u}) not found for ${a}. Falling back to head or body.`
            ),
            (m = document.head),
            (E = null))
      } else {
        (d.has('body-start') || d.has('body-end')) &&
                    ((m = document.body),
                    d.has('body-start') && (E = document.body.firstChild))
      }
      const O = {}
      w && (O.type = 'module'), await n('script', a, O, m, E)
    }
    e.directive('load-css', (a, { expression: d }, { evaluate: f }) => {
      const u = f(d)
      const w = a.media
      const m = a.getAttribute('data-dispatch')
      const E = a.getAttribute('data-css-before')
        ? 'before'
        : a.getAttribute('data-css-after')
          ? 'after'
          : null
      const O =
                a.getAttribute('data-css-before') ||
                a.getAttribute('data-css-after') ||
                null
      Promise.all(u.map((S) => i(S, w, E, O)))
        .then(() => {
          m && window.dispatchEvent(t(`${m}-css`))
        })
        .catch(console.error)
    }),
    e.directive(
      'load-js',
      (a, { expression: d, modifiers: f }, { evaluate: u }) => {
        const w = u(d)
        const m = new Set(f)
        const E = a.getAttribute('data-js-before')
          ? 'before'
          : a.getAttribute('data-js-after')
            ? 'after'
            : null
        const O =
                        a.getAttribute('data-js-before') ||
                        a.getAttribute('data-js-after') ||
                        null
        const S =
                        a.getAttribute('data-js-as-module') ||
                        a.getAttribute('data-as-module') ||
                        !1
        const R = a.getAttribute('data-dispatch')
        Promise.all(w.map((I) => o(I, m, E, O, S)))
          .then(() => {
            R && window.dispatchEvent(t(`${R}-js`))
          })
          .catch(console.error)
      }
    )
  }
  const ao = ja
  function Ba () {
    return !0
  }
  function Ha ({ component: e, argument: t }) {
    return new Promise((r) => {
      if (t) window.addEventListener(t, () => r(), { once: !0 })
      else {
        const n = (i) => {
          i.detail.id === e.id &&
                        (window.removeEventListener('async-alpine:load', n),
                        r())
        }
        window.addEventListener('async-alpine:load', n)
      }
    })
  }
  function $a () {
    return new Promise((e) => {
      'requestIdleCallback' in window
        ? window.requestIdleCallback(e)
        : setTimeout(e, 200)
    })
  }
  function Wa ({ argument: e }) {
    return new Promise((t) => {
      if (!e) {
        return (
          console.log(
            "Async Alpine: media strategy requires a media query. Treating as 'eager'"
          ),
          t()
        )
      }
      const r = window.matchMedia(`(${e})`)
      r.matches ? t() : r.addEventListener('change', t, { once: !0 })
    })
  }
  function Ua ({ component: e, argument: t }) {
    return new Promise((r) => {
      const n = t || '0px 0px 0px 0px'
      const i = new IntersectionObserver(
        (o) => {
          o[0].isIntersecting && (i.disconnect(), r())
        },
        { rootMargin: n }
      )
      i.observe(e.el)
    })
  }
  const so = { eager: Ba, event: Ha, idle: $a, media: Wa, visible: Ua }
  async function Va (e) {
    const t = za(e.strategy)
    await oi(e, t)
  }
  async function oi (e, t) {
    if (t.type === 'expression') {
      if (t.operator === '&&') {
        return Promise.all(t.parameters.map((r) => oi(e, r)))
      }
      if (t.operator === '||') {
        return Promise.any(t.parameters.map((r) => oi(e, r)))
      }
    }
    return so[t.method]
      ? so[t.method]({ component: e, argument: t.argument })
      : !1
  }
  function za (e) {
    const t = Ya(e)
    const r = co(t)
    return r.type === 'method'
      ? { type: 'expression', operator: '&&', parameters: [r] }
      : r
  }
  function Ya (e) {
    const t =
            /\s*([()])\s*|\s*(\|\||&&|\|)\s*|\s*((?:[^()&|]+\([^()]+\))|[^()&|]+)\s*/g
    const r = []
    let n
    for (; (n = t.exec(e)) !== null;) {
      const [i, o, a, d] = n
      if (o !== void 0) r.push({ type: 'parenthesis', value: o })
      else if (a !== void 0) {
        r.push({ type: 'operator', value: a === '|' ? '&&' : a })
      } else {
        const f = { type: 'method', method: d.trim() }
        d.includes('(') &&
                    ((f.method = d.substring(0, d.indexOf('(')).trim()),
                    (f.argument = d.substring(
                      d.indexOf('(') + 1,
                      d.indexOf(')')
                    ))),
        d.method === 'immediate' && (d.method = 'eager'),
        r.push(f)
      }
    }
    return r
  }
  function co (e) {
    let t = lo(e)
    for (
      ;
      e.length > 0 &&
            (e[0].value === '&&' || e[0].value === '|' || e[0].value === '||');

    ) {
      const r = e.shift().value
      const n = lo(e)
      t.type === 'expression' && t.operator === r
        ? t.parameters.push(n)
        : (t = { type: 'expression', operator: r, parameters: [t, n] })
    }
    return t
  }
  function lo (e) {
    if (e[0].value === '(') {
      e.shift()
      const t = co(e)
      return e[0].value === ')' && e.shift(), t
    } else return e.shift()
  }
  function fo (e) {
    const t = 'load'
    const r = e.prefixed('load-src')
    const n = e.prefixed('ignore')
    let i = { defaultStrategy: 'eager', keepRelativeURLs: !1 }
    let o = !1
    const a = {}
    let d = 0
    function f () {
      return d++
    }
    (e.asyncOptions = (A) => {
      i = { ...i, ...A }
    }),
    (e.asyncData = (A, k = !1) => {
      a[A] = { loaded: !1, download: k }
    }),
    (e.asyncUrl = (A, k) => {
      !A ||
                    !k ||
                    a[A] ||
                    (a[A] = { loaded: !1, download: () => import($(k)) })
    }),
    (e.asyncAlias = (A) => {
      o = A
    })
    const u = (A) => {
      e.skipDuringClone(() => {
        A._x_async ||
                    ((A._x_async = 'init'),
                    (A._x_ignore = !0),
                    A.setAttribute(n, ''))
      })()
    }
    const w = async (A) => {
      e.skipDuringClone(async () => {
        if (A._x_async !== 'init') return
        A._x_async = 'await'
        const { name: k, strategy: Y } = m(A)
        await Va({ name: k, strategy: Y, el: A, id: A.id || f() }),
        A.isConnected &&
                        (await E(k),
                        A.isConnected && (S(A), (A._x_async = 'loaded')))
      })()
    };
    (w.inline = u), e.directive(t, w).before('ignore')
    function m (A) {
      const k = I(A.getAttribute(e.prefixed('data')))
      const Y = A.getAttribute(e.prefixed(t)) || i.defaultStrategy
      const ne = A.getAttribute(r)
      return ne && e.asyncUrl(k, ne), { name: k, strategy: Y }
    }
    async function E (A) {
      if (A.startsWith('_x_async_') || (R(A), !a[A] || a[A].loaded)) {
        return
      }
      const k = await O(A)
      e.data(A, k), (a[A].loaded = !0)
    }
    async function O (A) {
      if (!a[A]) return
      const k = await a[A].download(A)
      return typeof k === 'function'
        ? k
        : k[A] || k.default || Object.values(k)[0] || !1
    }
    function S (A) {
      e.destroyTree(A),
      (A._x_ignore = !1),
      A.removeAttribute(n),
      !A.closest(`[${n}]`) && e.initTree(A)
    }
    function R (A) {
      if (!(!o || a[A])) {
        if (typeof o === 'function') {
          e.asyncData(A, o)
          return
        }
        e.asyncUrl(A, o.replaceAll('[name]', A))
      }
    }
    function I (A) {
      return (A || '').split(/[({]/g)[0] || `_x_async_${f()}`
    }
    function $ (A) {
      return i.keepRelativeURLs ||
                new RegExp('^(?:[a-z+]+:)?//', 'i').test(A)
        ? A
        : new URL(A, document.baseURI).href
    }
  }
  const Uo = Jo(ho(), 1)
  function vo (e, t) {
    const r = Object.keys(e)
    if (Object.getOwnPropertySymbols) {
      let n = Object.getOwnPropertySymbols(e)
      t &&
                (n = n.filter(function (i) {
                  return Object.getOwnPropertyDescriptor(e, i).enumerable
                })),
      r.push.apply(r, n)
    }
    return r
  }
  function Rt (e) {
    for (let t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {}
      t % 2
        ? vo(Object(r), !0).forEach(function (n) {
          Xa(e, n, r[n])
        })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(
            e,
            Object.getOwnPropertyDescriptors(r)
          )
          : vo(Object(r)).forEach(function (n) {
            Object.defineProperty(
              e,
              n,
              Object.getOwnPropertyDescriptor(r, n)
            )
          })
    }
    return e
  }
  function Sr (e) {
    '@babel/helpers - typeof'
    return (
      typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
        ? (Sr = function (t) {
            return typeof t
          })
        : (Sr = function (t) {
            return t &&
                          typeof Symbol === 'function' &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
      Sr(e)
    )
  }
  function Xa (e, t, r) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
        : (e[t] = r),
      e
    )
  }
  function $t () {
    return (
      ($t =
                Object.assign ||
                function (e) {
                  for (let t = 1; t < arguments.length; t++) {
                    const r = arguments[t]
                    for (const n in r) {
                      Object.prototype.hasOwnProperty.call(r, n) &&
                                (e[n] = r[n])
                    }
                  }
                  return e
                }),
      $t.apply(this, arguments)
    )
  }
  function qa (e, t) {
    if (e == null) return {}
    const r = {}
    const n = Object.keys(e)
    let i
    let o
    for (o = 0; o < n.length; o++) {
      (i = n[o]), !(t.indexOf(i) >= 0) && (r[i] = e[i])
    }
    return r
  }
  function Ga (e, t) {
    if (e == null) return {}
    const r = qa(e, t)
    let n
    let i
    if (Object.getOwnPropertySymbols) {
      const o = Object.getOwnPropertySymbols(e)
      for (i = 0; i < o.length; i++) {
        (n = o[i]),
        !(t.indexOf(n) >= 0) &&
                        Object.prototype.propertyIsEnumerable.call(e, n) &&
                        (r[n] = e[n])
      }
    }
    return r
  }
  const Ka = '1.15.6'
  function Ht (e) {
    if (typeof window < 'u' && window.navigator) {
      return !!navigator.userAgent.match(e)
    }
  }
  const Wt = Ht(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i)
  const er = Ht(/Edge/i)
  const mo = Ht(/firefox/i)
  const Gn = Ht(/safari/i) && !Ht(/chrome/i) && !Ht(/android/i)
  const yi = Ht(/iP(ad|od|hone)/i)
  const So = Ht(/chrome/i) && Ht(/android/i)
  const Ao = { capture: !1, passive: !1 }
  function Oe (e, t, r) {
    e.addEventListener(t, r, !Wt && Ao)
  }
  function Ee (e, t, r) {
    e.removeEventListener(t, r, !Wt && Ao)
  }
  function Tr (e, t) {
    if (t) {
      if ((t[0] === '>' && (t = t.substring(1)), e)) {
        try {
          if (e.matches) return e.matches(t)
          if (e.msMatchesSelector) return e.msMatchesSelector(t)
          if (e.webkitMatchesSelector) {
            return e.webkitMatchesSelector(t)
          }
        } catch {
          return !1
        }
      }
      return !1
    }
  }
  function Do (e) {
    return e.host && e !== document && e.host.nodeType
      ? e.host
      : e.parentNode
  }
  function St (e, t, r, n) {
    if (e) {
      r = r || document
      do {
        if (
          (t != null &&
                        (t[0] === '>'
                          ? e.parentNode === r && Tr(e, t)
                          : Tr(e, t))) ||
                    (n && e === r)
        ) {
          return e
        }
        if (e === r) break
      } while ((e = Do(e)))
    }
    return null
  }
  const go = /\s+/g
  function ft (e, t, r) {
    if (e && t) {
      if (e.classList) e.classList[r ? 'add' : 'remove'](t)
      else {
        const n = (' ' + e.className + ' ')
          .replace(go, ' ')
          .replace(' ' + t + ' ', ' ')
        e.className = (n + (r ? ' ' + t : '')).replace(go, ' ')
      }
    }
  }
  function ae (e, t, r) {
    const n = e && e.style
    if (n) {
      if (r === void 0) {
        return (
          document.defaultView &&
                    document.defaultView.getComputedStyle
            ? (r = document.defaultView.getComputedStyle(e, ''))
            : e.currentStyle && (r = e.currentStyle),
          t === void 0 ? r : r[t]
        )
      }
      !(t in n) && t.indexOf('webkit') === -1 && (t = '-webkit-' + t),
      (n[t] = r + (typeof r === 'string' ? '' : 'px'))
    }
  }
  function Ln (e, t) {
    let r = ''
    if (typeof e === 'string') r = e
    else {
      do {
        const n = ae(e, 'transform')
        n && n !== 'none' && (r = n + ' ' + r)
      } while (!t && (e = e.parentNode))
    }
    const i =
            window.DOMMatrix ||
            window.WebKitCSSMatrix ||
            window.CSSMatrix ||
            window.MSCSSMatrix
    return i && new i(r)
  }
  function Co (e, t, r) {
    if (e) {
      const n = e.getElementsByTagName(t)
      let i = 0
      const o = n.length
      if (r) for (; i < o; i++) r(n[i], i)
      return n
    }
    return []
  }
  function Pt () {
    const e = document.scrollingElement
    return e || document.documentElement
  }
  function qe (e, t, r, n, i) {
    if (!(!e.getBoundingClientRect && e !== window)) {
      let o, a, d, f, u, w, m
      if (
        (e !== window && e.parentNode && e !== Pt()
          ? ((o = e.getBoundingClientRect()),
            (a = o.top),
            (d = o.left),
            (f = o.bottom),
            (u = o.right),
            (w = o.height),
            (m = o.width))
          : ((a = 0),
            (d = 0),
            (f = window.innerHeight),
            (u = window.innerWidth),
            (w = window.innerHeight),
            (m = window.innerWidth)),
        (t || r) && e !== window && ((i = i || e.parentNode), !Wt))
      ) {
        do {
          if (
            i &&
                        i.getBoundingClientRect &&
                        (ae(i, 'transform') !== 'none' ||
                            (r && ae(i, 'position') !== 'static'))
          ) {
            const E = i.getBoundingClientRect();
            (a -= E.top + parseInt(ae(i, 'border-top-width'))),
            (d -=
                                E.left + parseInt(ae(i, 'border-left-width'))),
            (f = a + o.height),
            (u = d + o.width)
            break
          }
        } while ((i = i.parentNode))
      }
      if (n && e !== window) {
        const O = Ln(i || e)
        const S = O && O.a
        const R = O && O.d
        O &&
                    ((a /= R),
                    (d /= S),
                    (m /= S),
                    (w /= R),
                    (f = a + w),
                    (u = d + m))
      }
      return {
        top: a,
        left: d,
        bottom: f,
        right: u,
        width: m,
        height: w
      }
    }
  }
  function bo (e, t, r) {
    for (let n = sn(e, !0), i = qe(e)[t]; n;) {
      const o = qe(n)[r]
      let a = void 0
      if (
        (r === 'top' || r === 'left' ? (a = i >= o) : (a = i <= o), !a)
      ) {
        return n
      }
      if (n === Pt()) break
      n = sn(n, !1)
    }
    return !1
  }
  function Nn (e, t, r, n) {
    for (let i = 0, o = 0, a = e.children; o < a.length;) {
      if (
        a[o].style.display !== 'none' &&
                a[o] !== se.ghost &&
                (n || a[o] !== se.dragged) &&
                St(a[o], r.draggable, e, !1)
      ) {
        if (i === t) return a[o]
        i++
      }
      o++
    }
    return null
  }
  function wi (e, t) {
    for (
      var r = e.lastElementChild;
      r &&
            (r === se.ghost || ae(r, 'display') === 'none' || (t && !Tr(r, t)));

    ) {
      r = r.previousElementSibling
    }
    return r || null
  }
  function vt (e, t) {
    let r = 0
    if (!e || !e.parentNode) return -1
    for (; (e = e.previousElementSibling);) {
      e.nodeName.toUpperCase() !== 'TEMPLATE' &&
                e !== se.clone &&
                (!t || Tr(e, t)) &&
                r++
    }
    return r
  }
  function yo (e) {
    let t = 0
    let r = 0
    const n = Pt()
    if (e) {
      do {
        const i = Ln(e)
        const o = i.a
        const a = i.d;
        (t += e.scrollLeft * o), (r += e.scrollTop * a)
      } while (e !== n && (e = e.parentNode))
    }
    return [t, r]
  }
  function Ja (e, t) {
    for (const r in e) {
      if (e.hasOwnProperty(r)) {
        for (const n in t) {
          if (t.hasOwnProperty(n) && t[n] === e[r][n]) {
            return Number(r)
          }
        }
      }
    }
    return -1
  }
  function sn (e, t) {
    if (!e || !e.getBoundingClientRect) return Pt()
    let r = e
    let n = !1
    do {
      if (
        r.clientWidth < r.scrollWidth ||
                r.clientHeight < r.scrollHeight
      ) {
        const i = ae(r)
        if (
          (r.clientWidth < r.scrollWidth &&
                        (i.overflowX == 'auto' || i.overflowX == 'scroll')) ||
                    (r.clientHeight < r.scrollHeight &&
                        (i.overflowY == 'auto' || i.overflowY == 'scroll'))
        ) {
          if (!r.getBoundingClientRect || r === document.body) {
            return Pt()
          }
          if (n || t) return r
          n = !0
        }
      }
    } while ((r = r.parentNode))
    return Pt()
  }
  function Za (e, t) {
    if (e && t) for (const r in t) t.hasOwnProperty(r) && (e[r] = t[r])
    return e
  }
  function ai (e, t) {
    return (
      Math.round(e.top) === Math.round(t.top) &&
            Math.round(e.left) === Math.round(t.left) &&
            Math.round(e.height) === Math.round(t.height) &&
            Math.round(e.width) === Math.round(t.width)
    )
  }
  let Kn
  function _o (e, t) {
    return function () {
      if (!Kn) {
        const r = arguments
        const n = this
        r.length === 1 ? e.call(n, r[0]) : e.apply(n, r),
        (Kn = setTimeout(function () {
          Kn = void 0
        }, t))
      }
    }
  }
  function Qa () {
    clearTimeout(Kn), (Kn = void 0)
  }
  function To (e, t, r) {
    (e.scrollLeft += t), (e.scrollTop += r)
  }
  function Po (e) {
    const t = window.Polymer
    const r = window.jQuery || window.Zepto
    return t && t.dom
      ? t.dom(e).cloneNode(!0)
      : r
        ? r(e).clone(!0)[0]
        : e.cloneNode(!0)
  }
  function Ro (e, t, r) {
    const n = {}
    return (
      Array.from(e.children).forEach(function (i) {
        let o, a, d, f
        if (!(!St(i, t.draggable, e, !1) || i.animated || i === r)) {
          const u = qe(i);
          (n.left = Math.min(
            (o = n.left) !== null && o !== void 0 ? o : 1 / 0,
            u.left
          )),
          (n.top = Math.min(
            (a = n.top) !== null && a !== void 0 ? a : 1 / 0,
            u.top
          )),
          (n.right = Math.max(
            (d = n.right) !== null && d !== void 0 ? d : -1 / 0,
            u.right
          )),
          (n.bottom = Math.max(
            (f = n.bottom) !== null && f !== void 0
              ? f
              : -1 / 0,
            u.bottom
          ))
        }
      }),
      (n.width = n.right - n.left),
      (n.height = n.bottom - n.top),
      (n.x = n.left),
      (n.y = n.top),
      n
    )
  }
  const st = 'Sortable' + new Date().getTime()
  function es () {
    let e = []
    let t
    return {
      captureAnimationState: function () {
        if (((e = []), !!this.options.animation)) {
          const n = [].slice.call(this.el.children)
          n.forEach(function (i) {
            if (!(ae(i, 'display') === 'none' || i === se.ghost)) {
              e.push({ target: i, rect: qe(i) })
              const o = Rt({}, e[e.length - 1].rect)
              if (i.thisAnimationDuration) {
                const a = Ln(i, !0)
                a && ((o.top -= a.f), (o.left -= a.e))
              }
              i.fromRect = o
            }
          })
        }
      },
      addAnimationState: function (n) {
        e.push(n)
      },
      removeAnimationState: function (n) {
        e.splice(Ja(e, { target: n }), 1)
      },
      animateAll: function (n) {
        const i = this
        if (!this.options.animation) {
          clearTimeout(t), typeof n === 'function' && n()
          return
        }
        let o = !1
        let a = 0
        e.forEach(function (d) {
          let f = 0
          const u = d.target
          const w = u.fromRect
          const m = qe(u)
          const E = u.prevFromRect
          const O = u.prevToRect
          const S = d.rect
          const R = Ln(u, !0)
          R && ((m.top -= R.f), (m.left -= R.e)),
          (u.toRect = m),
          u.thisAnimationDuration &&
                            ai(E, m) &&
                            !ai(w, m) &&
                            (S.top - m.top) / (S.left - m.left) ===
                                (w.top - m.top) / (w.left - m.left) &&
                            (f = ns(S, E, O, i.options)),
          ai(m, w) ||
                            ((u.prevFromRect = w),
                            (u.prevToRect = m),
                            f || (f = i.options.animation),
                            i.animate(u, S, m, f)),
          f &&
                            ((o = !0),
                            (a = Math.max(a, f)),
                            clearTimeout(u.animationResetTimer),
                            (u.animationResetTimer = setTimeout(function () {
                              (u.animationTime = 0),
                              (u.prevFromRect = null),
                              (u.fromRect = null),
                              (u.prevToRect = null),
                              (u.thisAnimationDuration = null)
                            }, f)),
                            (u.thisAnimationDuration = f))
        }),
        clearTimeout(t),
        o
          ? (t = setTimeout(function () {
              typeof n === 'function' && n()
            }, a))
          : typeof n === 'function' && n(),
        (e = [])
      },
      animate: function (n, i, o, a) {
        if (a) {
          ae(n, 'transition', ''), ae(n, 'transform', '')
          const d = Ln(this.el)
          const f = d && d.a
          const u = d && d.d
          const w = (i.left - o.left) / (f || 1)
          const m = (i.top - o.top) / (u || 1);
          (n.animatingX = !!w),
          (n.animatingY = !!m),
          ae(
            n,
            'transform',
            'translate3d(' + w + 'px,' + m + 'px,0)'
          ),
          (this.forRepaintDummy = ts(n)),
          ae(
            n,
            'transition',
            'transform ' +
                                a +
                                'ms' +
                                (this.options.easing
                                  ? ' ' + this.options.easing
                                  : '')
          ),
          ae(n, 'transform', 'translate3d(0,0,0)'),
          typeof n.animated === 'number' &&
                            clearTimeout(n.animated),
          (n.animated = setTimeout(function () {
            ae(n, 'transition', ''),
            ae(n, 'transform', ''),
            (n.animated = !1),
            (n.animatingX = !1),
            (n.animatingY = !1)
          }, a))
        }
      }
    }
  }
  function ts (e) {
    return e.offsetWidth
  }
  function ns (e, t, r, n) {
    return (
      (Math.sqrt(
        Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)
      ) /
                Math.sqrt(
                  Math.pow(t.top - r.top, 2) + Math.pow(t.left - r.left, 2)
                )) *
            n.animation
    )
  }
  const Rn = []
  const si = { initializeByDefault: !0 }
  const tr = {
    mount: function (t) {
      for (const r in si) {
        si.hasOwnProperty(r) && !(r in t) && (t[r] = si[r])
      }
      Rn.forEach(function (n) {
        if (n.pluginName === t.pluginName) {
          throw 'Sortable: Cannot mount plugin '.concat(
            t.pluginName,
            ' more than once'
          )
        }
      }),
      Rn.push(t)
    },
    pluginEvent: function (t, r, n) {
      const i = this;
      (this.eventCanceled = !1),
      (n.cancel = function () {
        i.eventCanceled = !0
      })
      const o = t + 'Global'
      Rn.forEach(function (a) {
        r[a.pluginName] &&
                    (r[a.pluginName][o] &&
                        r[a.pluginName][o](Rt({ sortable: r }, n)),
                    r.options[a.pluginName] &&
                        r[a.pluginName][t] &&
                        r[a.pluginName][t](Rt({ sortable: r }, n)))
      })
    },
    initializePlugins: function (t, r, n, i) {
      Rn.forEach(function (d) {
        const f = d.pluginName
        if (!(!t.options[f] && !d.initializeByDefault)) {
          const u = new d(t, r, t.options);
          (u.sortable = t),
          (u.options = t.options),
          (t[f] = u),
          $t(n, u.defaults)
        }
      })
      for (const o in t.options) {
        if (t.options.hasOwnProperty(o)) {
          const a = this.modifyOption(t, o, t.options[o])
          typeof a < 'u' && (t.options[o] = a)
        }
      }
    },
    getEventProperties: function (t, r) {
      const n = {}
      return (
        Rn.forEach(function (i) {
          typeof i.eventProperties === 'function' &&
                        $t(n, i.eventProperties.call(r[i.pluginName], t))
        }),
        n
      )
    },
    modifyOption: function (t, r, n) {
      let i
      return (
        Rn.forEach(function (o) {
          t[o.pluginName] &&
                        o.optionListeners &&
                        typeof o.optionListeners[r] === 'function' &&
                        (i = o.optionListeners[r].call(t[o.pluginName], n))
        }),
        i
      )
    }
  }
  function rs (e) {
    let t = e.sortable
    const r = e.rootEl
    const n = e.name
    const i = e.targetEl
    const o = e.cloneEl
    const a = e.toEl
    const d = e.fromEl
    const f = e.oldIndex
    const u = e.newIndex
    const w = e.oldDraggableIndex
    const m = e.newDraggableIndex
    const E = e.originalEvent
    const O = e.putSortable
    const S = e.extraEventProperties
    if (((t = t || (r && r[st])), !!t)) {
      let R
      const I = t.options
      const $ = 'on' + n.charAt(0).toUpperCase() + n.substr(1)
      window.CustomEvent && !Wt && !er
        ? (R = new CustomEvent(n, { bubbles: !0, cancelable: !0 }))
        : ((R = document.createEvent('Event')), R.initEvent(n, !0, !0)),
      (R.to = a || r),
      (R.from = d || r),
      (R.item = i || r),
      (R.clone = o),
      (R.oldIndex = f),
      (R.newIndex = u),
      (R.oldDraggableIndex = w),
      (R.newDraggableIndex = m),
      (R.originalEvent = E),
      (R.pullMode = O ? O.lastPutMode : void 0)
      const A = Rt(Rt({}, S), tr.getEventProperties(n, t))
      for (const k in A) R[k] = A[k]
      r && r.dispatchEvent(R), I[$] && I[$].call(t, R)
    }
  }
  const is = ['evt']
  const at = function (t, r) {
    const n =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    const i = n.evt
    const o = Ga(n, is)
    tr.pluginEvent.bind(se)(
      t,
      r,
      Rt(
        {
          dragEl: N,
          parentEl: Ve,
          ghostEl: ue,
          rootEl: ke,
          nextEl: bn,
          lastDownEl: Ar,
          cloneEl: We,
          cloneHidden: an,
          dragStarted: Yn,
          putSortable: Ze,
          activeSortable: se.active,
          originalEvent: i,
          oldIndex: Fn,
          oldDraggableIndex: Jn,
          newIndex: ut,
          newDraggableIndex: on,
          hideGhostForTarget: Lo,
          unhideGhostForTarget: No,
          cloneNowHidden: function () {
            an = !0
          },
          cloneNowShown: function () {
            an = !1
          },
          dispatchSortableEvent: function (d) {
            it({ sortable: r, name: d, originalEvent: i })
          }
        },
        o
      )
    )
  }
  function it (e) {
    rs(
      Rt(
        {
          putSortable: Ze,
          cloneEl: We,
          targetEl: N,
          rootEl: ke,
          oldIndex: Fn,
          oldDraggableIndex: Jn,
          newIndex: ut,
          newDraggableIndex: on
        },
        e
      )
    )
  }
  let N
  let Ve
  let ue
  let ke
  let bn
  let Ar
  let We
  let an
  let Fn
  let ut
  let Jn
  let on
  let wr
  let Ze
  let In = !1
  let Pr = !1
  const Rr = []
  let mn
  let Ot
  let li
  let ci
  let wo
  let xo
  let Yn
  let Mn
  let Zn
  let Qn = !1
  let xr = !1
  let Dr
  let nt
  let fi = []
  let vi = !1
  const Mr = []
  const Fr = typeof document < 'u'
  const Er = yi
  const Eo = er || Wt ? 'cssFloat' : 'float'
  const os = Fr && !So && !yi && 'draggable' in document.createElement('div')
  const Mo = (function () {
    if (Fr) {
      if (Wt) return !1
      const e = document.createElement('x')
      return (
        (e.style.cssText = 'pointer-events:auto'),
        e.style.pointerEvents === 'auto'
      )
    }
  })()
  const Io = function (t, r) {
    const n = ae(t)
    const i =
            parseInt(n.width) -
            parseInt(n.paddingLeft) -
            parseInt(n.paddingRight) -
            parseInt(n.borderLeftWidth) -
            parseInt(n.borderRightWidth)
    const o = Nn(t, 0, r)
    const a = Nn(t, 1, r)
    const d = o && ae(o)
    const f = a && ae(a)
    const u =
            d && parseInt(d.marginLeft) + parseInt(d.marginRight) + qe(o).width
    const w =
            f && parseInt(f.marginLeft) + parseInt(f.marginRight) + qe(a).width
    if (n.display === 'flex') {
      return n.flexDirection === 'column' ||
                n.flexDirection === 'column-reverse'
        ? 'vertical'
        : 'horizontal'
    }
    if (n.display === 'grid') {
      return n.gridTemplateColumns.split(' ').length <= 1
        ? 'vertical'
        : 'horizontal'
    }
    if (o && d.float && d.float !== 'none') {
      const m = d.float === 'left' ? 'left' : 'right'
      return a && (f.clear === 'both' || f.clear === m)
        ? 'vertical'
        : 'horizontal'
    }
    return o &&
            (d.display === 'block' ||
                d.display === 'flex' ||
                d.display === 'table' ||
                d.display === 'grid' ||
                (u >= i && n[Eo] === 'none') ||
                (a && n[Eo] === 'none' && u + w > i))
      ? 'vertical'
      : 'horizontal'
  }
  const as = function (t, r, n) {
    const i = n ? t.left : t.top
    const o = n ? t.right : t.bottom
    const a = n ? t.width : t.height
    const d = n ? r.left : r.top
    const f = n ? r.right : r.bottom
    const u = n ? r.width : r.height
    return i === d || o === f || i + a / 2 === d + u / 2
  }
  const ss = function (t, r) {
    let n
    return (
      Rr.some(function (i) {
        const o = i[st].options.emptyInsertThreshold
        if (!(!o || wi(i))) {
          const a = qe(i)
          const d = t >= a.left - o && t <= a.right + o
          const f = r >= a.top - o && r <= a.bottom + o
          if (d && f) return (n = i)
        }
      }),
      n
    )
  }
  const Fo = function (t) {
    function r (o, a) {
      return function (d, f, u, w) {
        const m =
                    d.options.group.name &&
                    f.options.group.name &&
                    d.options.group.name === f.options.group.name
        if (o == null && (a || m)) return !0
        if (o == null || o === !1) return !1
        if (a && o === 'clone') return o
        if (typeof o === 'function') {
          return r(o(d, f, u, w), a)(d, f, u, w)
        }
        const E = (a ? d : f).options.group.name
        return (
          o === !0 ||
                    (typeof o === 'string' && o === E) ||
                    (o.join && o.indexOf(E) > -1)
        )
      }
    }
    const n = {}
    let i = t.group;
    (!i || Sr(i) != 'object') && (i = { name: i }),
    (n.name = i.name),
    (n.checkPull = r(i.pull, !0)),
    (n.checkPut = r(i.put)),
    (n.revertClone = i.revertClone),
    (t.group = n)
  }
  var Lo = function () {
    !Mo && ue && ae(ue, 'display', 'none')
  }
  var No = function () {
    !Mo && ue && ae(ue, 'display', '')
  }
  Fr &&
        !So &&
        document.addEventListener(
          'click',
          function (e) {
            if (Pr) {
              return (
                e.preventDefault(),
                e.stopPropagation && e.stopPropagation(),
                e.stopImmediatePropagation &&
                            e.stopImmediatePropagation(),
                (Pr = !1),
                !1
              )
            }
          },
          !0
        )
  const gn = function (t) {
    if (N) {
      t = t.touches ? t.touches[0] : t
      const r = ss(t.clientX, t.clientY)
      if (r) {
        const n = {}
        for (const i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
        (n.target = n.rootEl = r),
        (n.preventDefault = void 0),
        (n.stopPropagation = void 0),
        r[st]._onDragOver(n)
      }
    }
  }
  const ls = function (t) {
    N && N.parentNode[st]._isOutsideThisEl(t.target)
  }
  function se (e, t) {
    if (!(e && e.nodeType && e.nodeType === 1)) {
      throw 'Sortable: `el` must be an HTMLElement, not '.concat(
        {}.toString.call(e)
      )
    }
    (this.el = e), (this.options = t = $t({}, t)), (e[st] = this)
    const r = {
      group: null,
      sort: !0,
      disabled: !1,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(e.nodeName) ? '>li' : '>*',
      swapThreshold: 1,
      invertSwap: !1,
      invertedSwapThreshold: null,
      removeCloneOnHide: !0,
      direction: function () {
        return Io(e, this.options)
      },
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: !0,
      animation: 0,
      easing: null,
      setData: function (a, d) {
        a.setData('Text', d.textContent)
      },
      dropBubble: !1,
      dragoverBubble: !1,
      dataIdAttr: 'data-id',
      delay: 0,
      delayOnTouchOnly: !1,
      touchStartThreshold:
                (Number.parseInt ? Number : window).parseInt(
                  window.devicePixelRatio,
                  10
                ) || 1,
      forceFallback: !1,
      fallbackClass: 'sortable-fallback',
      fallbackOnBody: !1,
      fallbackTolerance: 0,
      fallbackOffset: { x: 0, y: 0 },
      supportPointer:
                se.supportPointer !== !1 &&
                'PointerEvent' in window &&
                (!Gn || yi),
      emptyInsertThreshold: 5
    }
    tr.initializePlugins(this, e, r)
    for (const n in r) !(n in t) && (t[n] = r[n])
    Fo(t)
    for (const i in this) {
      i.charAt(0) === '_' &&
                typeof this[i] === 'function' &&
                (this[i] = this[i].bind(this))
    }
    (this.nativeDraggable = t.forceFallback ? !1 : os),
    this.nativeDraggable && (this.options.touchStartThreshold = 1),
    t.supportPointer
      ? Oe(e, 'pointerdown', this._onTapStart)
      : (Oe(e, 'mousedown', this._onTapStart),
        Oe(e, 'touchstart', this._onTapStart)),
    this.nativeDraggable &&
                (Oe(e, 'dragover', this), Oe(e, 'dragenter', this)),
    Rr.push(this.el),
    t.store && t.store.get && this.sort(t.store.get(this) || []),
    $t(this, es())
  }
  se.prototype = {
    constructor: se,
    _isOutsideThisEl: function (t) {
      !this.el.contains(t) && t !== this.el && (Mn = null)
    },
    _getDirection: function (t, r) {
      return typeof this.options.direction === 'function'
        ? this.options.direction.call(this, t, r, N)
        : this.options.direction
    },
    _onTapStart: function (t) {
      if (t.cancelable) {
        const r = this
        const n = this.el
        const i = this.options
        const o = i.preventOnFilter
        const a = t.type
        const d =
                    (t.touches && t.touches[0]) ||
                    (t.pointerType && t.pointerType === 'touch' && t)
        let f = (d || t).target
        const u =
                    (t.target.shadowRoot &&
                        ((t.path && t.path[0]) ||
                            (t.composedPath && t.composedPath()[0]))) ||
                    f
        let w = i.filter
        if (
          (ms(n),
          !N &&
                        !(
                          (/mousedown|pointerdown/.test(a) &&
                                t.button !== 0) ||
                            i.disabled
                        ) &&
                        !u.isContentEditable &&
                        !(
                          !this.nativeDraggable &&
                            Gn &&
                            f &&
                            f.tagName.toUpperCase() === 'SELECT'
                        ) &&
                        ((f = St(f, i.draggable, n, !1)),
                        !(f && f.animated) && Ar !== f))
        ) {
          if (
            ((Fn = vt(f)),
            (Jn = vt(f, i.draggable)),
            typeof w === 'function')
          ) {
            if (w.call(this, t, f, this)) {
              it({
                sortable: r,
                rootEl: u,
                name: 'filter',
                targetEl: f,
                toEl: n,
                fromEl: n
              }),
              at('filter', r, { evt: t }),
              o && t.preventDefault()
              return
            }
          } else if (
            w &&
                        ((w = w.split(',').some(function (m) {
                          if (((m = St(u, m.trim(), n, !1)), m)) {
                            return (
                              it({
                                sortable: r,
                                rootEl: m,
                                name: 'filter',
                                targetEl: f,
                                fromEl: n,
                                toEl: n
                              }),
                              at('filter', r, { evt: t }),
                              !0
                            )
                          }
                        })),
                        w)
          ) {
            o && t.preventDefault()
            return
          }
          (i.handle && !St(u, i.handle, n, !1)) ||
                        this._prepareDragStart(t, d, f)
        }
      }
    },
    _prepareDragStart: function (t, r, n) {
      const i = this
      const o = i.el
      const a = i.options
      const d = o.ownerDocument
      let f
      if (n && !N && n.parentNode === o) {
        const u = qe(n)
        if (
          ((ke = o),
          (N = n),
          (Ve = N.parentNode),
          (bn = N.nextSibling),
          (Ar = n),
          (wr = a.group),
          (se.dragged = N),
          (mn = {
            target: N,
            clientX: (r || t).clientX,
            clientY: (r || t).clientY
          }),
          (wo = mn.clientX - u.left),
          (xo = mn.clientY - u.top),
          (this._lastX = (r || t).clientX),
          (this._lastY = (r || t).clientY),
          (N.style['will-change'] = 'all'),
          (f = function () {
            if (
              (at('delayEnded', i, { evt: t }), se.eventCanceled)
            ) {
              i._onDrop()
              return
            }
            i._disableDelayedDragEvents(),
            !mo && i.nativeDraggable && (N.draggable = !0),
            i._triggerDragStart(t, r),
            it({
              sortable: i,
              name: 'choose',
              originalEvent: t
            }),
            ft(N, a.chosenClass, !0)
          }),
          a.ignore.split(',').forEach(function (w) {
            Co(N, w.trim(), ui)
          }),
          Oe(d, 'dragover', gn),
          Oe(d, 'mousemove', gn),
          Oe(d, 'touchmove', gn),
          a.supportPointer
            ? (Oe(d, 'pointerup', i._onDrop),
              !this.nativeDraggable &&
                              Oe(d, 'pointercancel', i._onDrop))
            : (Oe(d, 'mouseup', i._onDrop),
              Oe(d, 'touchend', i._onDrop),
              Oe(d, 'touchcancel', i._onDrop)),
          mo &&
                        this.nativeDraggable &&
                        ((this.options.touchStartThreshold = 4),
                        (N.draggable = !0)),
          at('delayStart', this, { evt: t }),
          a.delay &&
                        (!a.delayOnTouchOnly || r) &&
                        (!this.nativeDraggable || !(er || Wt)))
        ) {
          if (se.eventCanceled) {
            this._onDrop()
            return
          }
          a.supportPointer
            ? (Oe(d, 'pointerup', i._disableDelayedDrag),
              Oe(d, 'pointercancel', i._disableDelayedDrag))
            : (Oe(d, 'mouseup', i._disableDelayedDrag),
              Oe(d, 'touchend', i._disableDelayedDrag),
              Oe(d, 'touchcancel', i._disableDelayedDrag)),
          Oe(d, 'mousemove', i._delayedDragTouchMoveHandler),
          Oe(d, 'touchmove', i._delayedDragTouchMoveHandler),
          a.supportPointer &&
                            Oe(
                              d,
                              'pointermove',
                              i._delayedDragTouchMoveHandler
                            ),
          (i._dragStartTimer = setTimeout(f, a.delay))
        } else f()
      }
    },
    _delayedDragTouchMoveHandler: function (t) {
      const r = t.touches ? t.touches[0] : t
      Math.max(
        Math.abs(r.clientX - this._lastX),
        Math.abs(r.clientY - this._lastY)
      ) >=
                Math.floor(
                  this.options.touchStartThreshold /
                        ((this.nativeDraggable && window.devicePixelRatio) ||
                            1)
                ) && this._disableDelayedDrag()
    },
    _disableDelayedDrag: function () {
      N && ui(N),
      clearTimeout(this._dragStartTimer),
      this._disableDelayedDragEvents()
    },
    _disableDelayedDragEvents: function () {
      const t = this.el.ownerDocument
      Ee(t, 'mouseup', this._disableDelayedDrag),
      Ee(t, 'touchend', this._disableDelayedDrag),
      Ee(t, 'touchcancel', this._disableDelayedDrag),
      Ee(t, 'pointerup', this._disableDelayedDrag),
      Ee(t, 'pointercancel', this._disableDelayedDrag),
      Ee(t, 'mousemove', this._delayedDragTouchMoveHandler),
      Ee(t, 'touchmove', this._delayedDragTouchMoveHandler),
      Ee(t, 'pointermove', this._delayedDragTouchMoveHandler)
    },
    _triggerDragStart: function (t, r) {
      (r = r || (t.pointerType == 'touch' && t)),
      !this.nativeDraggable || r
        ? this.options.supportPointer
          ? Oe(document, 'pointermove', this._onTouchMove)
          : r
            ? Oe(document, 'touchmove', this._onTouchMove)
            : Oe(document, 'mousemove', this._onTouchMove)
        : (Oe(N, 'dragend', this),
          Oe(ke, 'dragstart', this._onDragStart))
      try {
        document.selection
          ? Cr(function () {
            document.selection.empty()
          })
          : window.getSelection().removeAllRanges()
      } catch {}
    },
    _dragStarted: function (t, r) {
      if (((In = !1), ke && N)) {
        at('dragStarted', this, { evt: r }),
        this.nativeDraggable && Oe(document, 'dragover', ls)
        const n = this.options
        !t && ft(N, n.dragClass, !1),
        ft(N, n.ghostClass, !0),
        (se.active = this),
        t && this._appendGhost(),
        it({ sortable: this, name: 'start', originalEvent: r })
      } else this._nulling()
    },
    _emulateDragOver: function () {
      if (Ot) {
        (this._lastX = Ot.clientX), (this._lastY = Ot.clientY), Lo()
        for (
          var t = document.elementFromPoint(Ot.clientX, Ot.clientY),
            r = t;
          t &&
                    t.shadowRoot &&
                    ((t = t.shadowRoot.elementFromPoint(
                      Ot.clientX,
                      Ot.clientY
                    )),
                    t !== r);

        ) {
          r = t
        }
        if ((N.parentNode[st]._isOutsideThisEl(t), r)) {
          do {
            if (r[st]) {
              let n = void 0
              if (
                ((n = r[st]._onDragOver({
                  clientX: Ot.clientX,
                  clientY: Ot.clientY,
                  target: t,
                  rootEl: r
                })),
                n && !this.options.dragoverBubble)
              ) {
                break
              }
            }
            t = r
          } while ((r = Do(r)))
        }
        No()
      }
    },
    _onTouchMove: function (t) {
      if (mn) {
        const r = this.options
        const n = r.fallbackTolerance
        const i = r.fallbackOffset
        const o = t.touches ? t.touches[0] : t
        let a = ue && Ln(ue, !0)
        const d = ue && a && a.a
        const f = ue && a && a.d
        const u = Er && nt && yo(nt)
        const w =
                    (o.clientX - mn.clientX + i.x) / (d || 1) +
                    (u ? u[0] - fi[0] : 0) / (d || 1)
        const m =
                    (o.clientY - mn.clientY + i.y) / (f || 1) +
                    (u ? u[1] - fi[1] : 0) / (f || 1)
        if (!se.active && !In) {
          if (
            n &&
                        Math.max(
                          Math.abs(o.clientX - this._lastX),
                          Math.abs(o.clientY - this._lastY)
                        ) < n
          ) {
            return
          }
          this._onDragStart(t, !0)
        }
        if (ue) {
          a
            ? ((a.e += w - (li || 0)), (a.f += m - (ci || 0)))
            : (a = { a: 1, b: 0, c: 0, d: 1, e: w, f: m })
          const E = 'matrix('
            .concat(a.a, ',')
            .concat(a.b, ',')
            .concat(a.c, ',')
            .concat(a.d, ',')
            .concat(a.e, ',')
            .concat(a.f, ')')
          ae(ue, 'webkitTransform', E),
          ae(ue, 'mozTransform', E),
          ae(ue, 'msTransform', E),
          ae(ue, 'transform', E),
          (li = w),
          (ci = m),
          (Ot = o)
        }
        t.cancelable && t.preventDefault()
      }
    },
    _appendGhost: function () {
      if (!ue) {
        const t = this.options.fallbackOnBody ? document.body : ke
        const r = qe(N, !0, Er, !0, t)
        const n = this.options
        if (Er) {
          for (
            nt = t;
            ae(nt, 'position') === 'static' &&
                        ae(nt, 'transform') === 'none' &&
                        nt !== document;

          ) {
            nt = nt.parentNode
          }
          nt !== document.body && nt !== document.documentElement
            ? (nt === document && (nt = Pt()),
              (r.top += nt.scrollTop),
              (r.left += nt.scrollLeft))
            : (nt = Pt()),
          (fi = yo(nt))
        }
        (ue = N.cloneNode(!0)),
        ft(ue, n.ghostClass, !1),
        ft(ue, n.fallbackClass, !0),
        ft(ue, n.dragClass, !0),
        ae(ue, 'transition', ''),
        ae(ue, 'transform', ''),
        ae(ue, 'box-sizing', 'border-box'),
        ae(ue, 'margin', 0),
        ae(ue, 'top', r.top),
        ae(ue, 'left', r.left),
        ae(ue, 'width', r.width),
        ae(ue, 'height', r.height),
        ae(ue, 'opacity', '0.8'),
        ae(ue, 'position', Er ? 'absolute' : 'fixed'),
        ae(ue, 'zIndex', '100000'),
        ae(ue, 'pointerEvents', 'none'),
        (se.ghost = ue),
        t.appendChild(ue),
        ae(
          ue,
          'transform-origin',
          (wo / parseInt(ue.style.width)) * 100 +
                            '% ' +
                            (xo / parseInt(ue.style.height)) * 100 +
                            '%'
        )
      }
    },
    _onDragStart: function (t, r) {
      const n = this
      const i = t.dataTransfer
      const o = n.options
      if ((at('dragStart', this, { evt: t }), se.eventCanceled)) {
        this._onDrop()
        return
      }
      at('setupClone', this),
      se.eventCanceled ||
                    ((We = Po(N)),
                    We.removeAttribute('id'),
                    (We.draggable = !1),
                    (We.style['will-change'] = ''),
                    this._hideClone(),
                    ft(We, this.options.chosenClass, !1),
                    (se.clone = We)),
      (n.cloneId = Cr(function () {
        at('clone', n),
        !se.eventCanceled &&
                            (n.options.removeCloneOnHide ||
                                ke.insertBefore(We, N),
                            n._hideClone(),
                            it({ sortable: n, name: 'clone' }))
      })),
      !r && ft(N, o.dragClass, !0),
      r
        ? ((Pr = !0),
          (n._loopId = setInterval(n._emulateDragOver, 50)))
        : (Ee(document, 'mouseup', n._onDrop),
          Ee(document, 'touchend', n._onDrop),
          Ee(document, 'touchcancel', n._onDrop),
          i &&
                          ((i.effectAllowed = 'move'),
                          o.setData && o.setData.call(n, i, N)),
          Oe(document, 'drop', n),
          ae(N, 'transform', 'translateZ(0)')),
      (In = !0),
      (n._dragStartId = Cr(n._dragStarted.bind(n, r, t))),
      Oe(document, 'selectstart', n),
      (Yn = !0),
      window.getSelection().removeAllRanges(),
      Gn && ae(document.body, 'user-select', 'none')
    },
    _onDragOver: function (t) {
      const r = this.el
      let n = t.target
      let i
      let o
      let a
      const d = this.options
      const f = d.group
      const u = se.active
      const w = wr === f
      const m = d.sort
      const E = Ze || u
      let O
      const S = this
      let R = !1
      if (vi) return
      function I (M, Q) {
        at(
          M,
          S,
          Rt(
            {
              evt: t,
              isOwner: w,
              axis: O ? 'vertical' : 'horizontal',
              revert: a,
              dragRect: i,
              targetRect: o,
              canSort: m,
              fromSortable: E,
              target: n,
              completed: A,
              onMove: function (Mt, Ut) {
                return Or(ke, r, N, i, Mt, qe(Mt), t, Ut)
              },
              changed: k
            },
            Q
          )
        )
      }
      function $ () {
        I('dragOverAnimationCapture'),
        S.captureAnimationState(),
        S !== E && E.captureAnimationState()
      }
      function A (M) {
        return (
          I('dragOverCompleted', { insertion: M }),
          M &&
                        (w ? u._hideClone() : u._showClone(S),
                        S !== E &&
                            (ft(
                              N,
                              Ze
                                ? Ze.options.ghostClass
                                : u.options.ghostClass,
                              !1
                            ),
                            ft(N, d.ghostClass, !0)),
                        Ze !== S && S !== se.active
                          ? (Ze = S)
                          : S === se.active && Ze && (Ze = null),
                        E === S && (S._ignoreWhileAnimating = n),
                        S.animateAll(function () {
                          I('dragOverAnimationComplete'),
                          (S._ignoreWhileAnimating = null)
                        }),
                        S !== E &&
                            (E.animateAll(), (E._ignoreWhileAnimating = null))),
          ((n === N && !N.animated) || (n === r && !n.animated)) &&
                        (Mn = null),
          !d.dragoverBubble &&
                        !t.rootEl &&
                        n !== document &&
                        (N.parentNode[st]._isOutsideThisEl(t.target),
                        !M && gn(t)),
          !d.dragoverBubble &&
                        t.stopPropagation &&
                        t.stopPropagation(),
          (R = !0)
        )
      }
      function k () {
        (ut = vt(N)),
        (on = vt(N, d.draggable)),
        it({
          sortable: S,
          name: 'change',
          toEl: r,
          newIndex: ut,
          newDraggableIndex: on,
          originalEvent: t
        })
      }
      if (
        (t.preventDefault !== void 0 &&
                    t.cancelable &&
                    t.preventDefault(),
        (n = St(n, d.draggable, r, !0)),
        I('dragOver'),
        se.eventCanceled)
      ) {
        return R
      }
      if (
        N.contains(t.target) ||
                (n.animated && n.animatingX && n.animatingY) ||
                S._ignoreWhileAnimating === n
      ) {
        return A(!1)
      }
      if (
        ((Pr = !1),
        u &&
                    !d.disabled &&
                    (w
                      ? m || (a = Ve !== ke)
                      : Ze === this ||
                          ((this.lastPutMode = wr.checkPull(this, u, N, t)) &&
                              f.checkPut(this, u, N, t))))
      ) {
        if (
          ((O = this._getDirection(t, n) === 'vertical'),
          (i = qe(N)),
          I('dragOverValid'),
          se.eventCanceled)
        ) {
          return R
        }
        if (a) {
          return (
            (Ve = ke),
            $(),
            this._hideClone(),
            I('revert'),
            se.eventCanceled ||
                            (bn ? ke.insertBefore(N, bn) : ke.appendChild(N)),
            A(!0)
          )
        }
        const Y = wi(r, d.draggable)
        if (!Y || (ds(t, O, this) && !Y.animated)) {
          if (Y === N) return A(!1)
          if (
            (Y && r === t.target && (n = Y),
            n && (o = qe(n)),
            Or(ke, r, N, i, n, o, t, !!n) !== !1)
          ) {
            return (
              $(),
              Y && Y.nextSibling
                ? r.insertBefore(N, Y.nextSibling)
                : r.appendChild(N),
              (Ve = r),
              k(),
              A(!0)
            )
          }
        } else if (Y && us(t, O, this)) {
          const ne = Nn(r, 0, d, !0)
          if (ne === N) return A(!1)
          if (
            ((n = ne),
            (o = qe(n)),
            Or(ke, r, N, i, n, o, t, !1) !== !1)
          ) {
            return $(), r.insertBefore(N, ne), (Ve = r), k(), A(!0)
          }
        } else if (n.parentNode === r) {
          o = qe(n)
          let J = 0
          let V
          const de = N.parentNode !== r
          const X = !as(
            (N.animated && N.toRect) || i,
            (n.animated && n.toRect) || o,
            O
          )
          const Z = O ? 'top' : 'left'
          const me = bo(n, 'top', 'top') || bo(N, 'top', 'top')
          const l = me ? me.scrollTop : void 0
          Mn !== n &&
                        ((V = o[Z]),
                        (Qn = !1),
                        (xr = (!X && d.invertSwap) || de)),
          (J = ps(
            t,
            n,
            o,
            O,
            X ? 1 : d.swapThreshold,
            d.invertedSwapThreshold == null
              ? d.swapThreshold
              : d.invertedSwapThreshold,
            xr,
            Mn === n
          ))
          let h
          if (J !== 0) {
            let v = vt(N)
            do (v -= J), (h = Ve.children[v])
            while (h && (ae(h, 'display') === 'none' || h === ue))
          }
          if (J === 0 || h === n) return A(!1);
          (Mn = n), (Zn = J)
          const p = n.nextElementSibling
          let j = !1
          j = J === 1
          const P = Or(ke, r, N, i, n, o, t, j)
          if (P !== !1) {
            return (
              (P === 1 || P === -1) && (j = P === 1),
              (vi = !0),
              setTimeout(fs, 30),
              $(),
              j && !p
                ? r.appendChild(N)
                : n.parentNode.insertBefore(N, j ? p : n),
              me && To(me, 0, l - me.scrollTop),
              (Ve = N.parentNode),
              V !== void 0 &&
                                !xr &&
                                (Dr = Math.abs(V - qe(n)[Z])),
              k(),
              A(!0)
            )
          }
        }
        if (r.contains(N)) return A(!1)
      }
      return !1
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function () {
      Ee(document, 'mousemove', this._onTouchMove),
      Ee(document, 'touchmove', this._onTouchMove),
      Ee(document, 'pointermove', this._onTouchMove),
      Ee(document, 'dragover', gn),
      Ee(document, 'mousemove', gn),
      Ee(document, 'touchmove', gn)
    },
    _offUpEvents: function () {
      const t = this.el.ownerDocument
      Ee(t, 'mouseup', this._onDrop),
      Ee(t, 'touchend', this._onDrop),
      Ee(t, 'pointerup', this._onDrop),
      Ee(t, 'pointercancel', this._onDrop),
      Ee(t, 'touchcancel', this._onDrop),
      Ee(document, 'selectstart', this)
    },
    _onDrop: function (t) {
      const r = this.el
      const n = this.options
      if (
        ((ut = vt(N)),
        (on = vt(N, n.draggable)),
        at('drop', this, { evt: t }),
        (Ve = N && N.parentNode),
        (ut = vt(N)),
        (on = vt(N, n.draggable)),
        se.eventCanceled)
      ) {
        this._nulling()
        return
      }
      (In = !1),
      (xr = !1),
      (Qn = !1),
      clearInterval(this._loopId),
      clearTimeout(this._dragStartTimer),
      mi(this.cloneId),
      mi(this._dragStartId),
      this.nativeDraggable &&
                    (Ee(document, 'drop', this),
                    Ee(r, 'dragstart', this._onDragStart)),
      this._offMoveEvents(),
      this._offUpEvents(),
      Gn && ae(document.body, 'user-select', ''),
      ae(N, 'transform', ''),
      t &&
                    (Yn &&
                        (t.cancelable && t.preventDefault(),
                        !n.dropBubble && t.stopPropagation()),
                    ue && ue.parentNode && ue.parentNode.removeChild(ue),
                    (ke === Ve || (Ze && Ze.lastPutMode !== 'clone')) &&
                        We &&
                        We.parentNode &&
                        We.parentNode.removeChild(We),
                    N &&
                        (this.nativeDraggable && Ee(N, 'dragend', this),
                        ui(N),
                        (N.style['will-change'] = ''),
                        Yn &&
                            !In &&
                            ft(
                              N,
                              Ze
                                ? Ze.options.ghostClass
                                : this.options.ghostClass,
                              !1
                            ),
                        ft(N, this.options.chosenClass, !1),
                        it({
                          sortable: this,
                          name: 'unchoose',
                          toEl: Ve,
                          newIndex: null,
                          newDraggableIndex: null,
                          originalEvent: t
                        }),
                        ke !== Ve
                          ? (ut >= 0 &&
                                  (it({
                                    rootEl: Ve,
                                    name: 'add',
                                    toEl: Ve,
                                    fromEl: ke,
                                    originalEvent: t
                                  }),
                                  it({
                                    sortable: this,
                                    name: 'remove',
                                    toEl: Ve,
                                    originalEvent: t
                                  }),
                                  it({
                                    rootEl: Ve,
                                    name: 'sort',
                                    toEl: Ve,
                                    fromEl: ke,
                                    originalEvent: t
                                  }),
                                  it({
                                    sortable: this,
                                    name: 'sort',
                                    toEl: Ve,
                                    originalEvent: t
                                  })),
                            Ze && Ze.save())
                          : ut !== Fn &&
                              ut >= 0 &&
                              (it({
                                sortable: this,
                                name: 'update',
                                toEl: Ve,
                                originalEvent: t
                              }),
                              it({
                                sortable: this,
                                name: 'sort',
                                toEl: Ve,
                                originalEvent: t
                              })),
                        se.active &&
                            ((ut == null || ut === -1) &&
                                ((ut = Fn), (on = Jn)),
                            it({
                              sortable: this,
                              name: 'end',
                              toEl: Ve,
                              originalEvent: t
                            }),
                            this.save()))),
      this._nulling()
    },
    _nulling: function () {
      at('nulling', this),
      (ke =
                    N =
                    Ve =
                    ue =
                    bn =
                    We =
                    Ar =
                    an =
                    mn =
                    Ot =
                    Yn =
                    ut =
                    on =
                    Fn =
                    Jn =
                    Mn =
                    Zn =
                    Ze =
                    wr =
                    se.dragged =
                    se.ghost =
                    se.clone =
                    se.active =
                        null),
      Mr.forEach(function (t) {
        t.checked = !0
      }),
      (Mr.length = li = ci = 0)
    },
    handleEvent: function (t) {
      switch (t.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(t)
          break
        case 'dragenter':
        case 'dragover':
          N && (this._onDragOver(t), cs(t))
          break
        case 'selectstart':
          t.preventDefault()
          break
      }
    },
    toArray: function () {
      for (
        var t = [],
          r,
          n = this.el.children,
          i = 0,
          o = n.length,
          a = this.options;
        i < o;
        i++
      ) {
        (r = n[i]),
        St(r, a.draggable, this.el, !1) &&
                        t.push(r.getAttribute(a.dataIdAttr) || vs(r))
      }
      return t
    },
    sort: function (t, r) {
      const n = {}
      const i = this.el
      this.toArray().forEach(function (o, a) {
        const d = i.children[a]
        St(d, this.options.draggable, i, !1) && (n[o] = d)
      }, this),
      r && this.captureAnimationState(),
      t.forEach(function (o) {
        n[o] && (i.removeChild(n[o]), i.appendChild(n[o]))
      }),
      r && this.animateAll()
    },
    save: function () {
      const t = this.options.store
      t && t.set && t.set(this)
    },
    closest: function (t, r) {
      return St(t, r || this.options.draggable, this.el, !1)
    },
    option: function (t, r) {
      const n = this.options
      if (r === void 0) return n[t]
      const i = tr.modifyOption(this, t, r)
      typeof i < 'u' ? (n[t] = i) : (n[t] = r), t === 'group' && Fo(n)
    },
    destroy: function () {
      at('destroy', this)
      let t = this.el;
      (t[st] = null),
      Ee(t, 'mousedown', this._onTapStart),
      Ee(t, 'touchstart', this._onTapStart),
      Ee(t, 'pointerdown', this._onTapStart),
      this.nativeDraggable &&
                    (Ee(t, 'dragover', this), Ee(t, 'dragenter', this)),
      Array.prototype.forEach.call(
        t.querySelectorAll('[draggable]'),
        function (r) {
          r.removeAttribute('draggable')
        }
      ),
      this._onDrop(),
      this._disableDelayedDragEvents(),
      Rr.splice(Rr.indexOf(this.el), 1),
      (this.el = t = null)
    },
    _hideClone: function () {
      if (!an) {
        if ((at('hideClone', this), se.eventCanceled)) return
        ae(We, 'display', 'none'),
        this.options.removeCloneOnHide &&
                        We.parentNode &&
                        We.parentNode.removeChild(We),
        (an = !0)
      }
    },
    _showClone: function (t) {
      if (t.lastPutMode !== 'clone') {
        this._hideClone()
        return
      }
      if (an) {
        if ((at('showClone', this), se.eventCanceled)) return
        N.parentNode == ke && !this.options.group.revertClone
          ? ke.insertBefore(We, N)
          : bn
            ? ke.insertBefore(We, bn)
            : ke.appendChild(We),
        this.options.group.revertClone && this.animate(N, We),
        ae(We, 'display', ''),
        (an = !1)
      }
    }
  }
  function cs (e) {
    e.dataTransfer && (e.dataTransfer.dropEffect = 'move'),
    e.cancelable && e.preventDefault()
  }
  function Or (e, t, r, n, i, o, a, d) {
    let f
    const u = e[st]
    const w = u.options.onMove
    let m
    return (
      window.CustomEvent && !Wt && !er
        ? (f = new CustomEvent('move', { bubbles: !0, cancelable: !0 }))
        : ((f = document.createEvent('Event')),
          f.initEvent('move', !0, !0)),
      (f.to = t),
      (f.from = e),
      (f.dragged = r),
      (f.draggedRect = n),
      (f.related = i || t),
      (f.relatedRect = o || qe(t)),
      (f.willInsertAfter = d),
      (f.originalEvent = a),
      e.dispatchEvent(f),
      w && (m = w.call(u, f, a)),
      m
    )
  }
  function ui (e) {
    e.draggable = !1
  }
  function fs () {
    vi = !1
  }
  function us (e, t, r) {
    const n = qe(Nn(r.el, 0, r.options, !0))
    const i = Ro(r.el, r.options, ue)
    const o = 10
    return t
      ? e.clientX < i.left - o ||
                  (e.clientY < n.top && e.clientX < n.right)
      : e.clientY < i.top - o ||
                  (e.clientY < n.bottom && e.clientX < n.left)
  }
  function ds (e, t, r) {
    const n = qe(wi(r.el, r.options.draggable))
    const i = Ro(r.el, r.options, ue)
    const o = 10
    return t
      ? e.clientX > i.right + o ||
                  (e.clientY > n.bottom && e.clientX > n.left)
      : e.clientY > i.bottom + o ||
                  (e.clientX > n.right && e.clientY > n.top)
  }
  function ps (e, t, r, n, i, o, a, d) {
    const f = n ? e.clientY : e.clientX
    const u = n ? r.height : r.width
    const w = n ? r.top : r.left
    const m = n ? r.bottom : r.right
    let E = !1
    if (!a) {
      if (d && Dr < u * i) {
        if (
          (!Qn &&
                        (Zn === 1
                          ? f > w + (u * o) / 2
                          : f < m - (u * o) / 2) &&
                        (Qn = !0),
          Qn)
        ) {
          E = !0
        } else if (Zn === 1 ? f < w + Dr : f > m - Dr) return -Zn
      } else if (f > w + (u * (1 - i)) / 2 && f < m - (u * (1 - i)) / 2) {
        return hs(t)
      }
    }
    return (
      (E = E || a),
      E && (f < w + (u * o) / 2 || f > m - (u * o) / 2)
        ? f > w + u / 2
          ? 1
          : -1
        : 0
    )
  }
  function hs (e) {
    return vt(N) < vt(e) ? 1 : -1
  }
  function vs (e) {
    for (
      var t = e.tagName + e.className + e.src + e.href + e.textContent,
        r = t.length,
        n = 0;
      r--;

    ) {
      n += t.charCodeAt(r)
    }
    return n.toString(36)
  }
  function ms (e) {
    Mr.length = 0
    for (let t = e.getElementsByTagName('input'), r = t.length; r--;) {
      const n = t[r]
      n.checked && Mr.push(n)
    }
  }
  function Cr (e) {
    return setTimeout(e, 0)
  }
  function mi (e) {
    return clearTimeout(e)
  }
  Fr &&
        Oe(document, 'touchmove', function (e) {
          (se.active || In) && e.cancelable && e.preventDefault()
        })
  se.utils = {
    on: Oe,
    off: Ee,
    css: ae,
    find: Co,
    is: function (t, r) {
      return !!St(t, r, t, !1)
    },
    extend: Za,
    throttle: _o,
    closest: St,
    toggleClass: ft,
    clone: Po,
    index: vt,
    nextTick: Cr,
    cancelNextTick: mi,
    detectDirection: Io,
    getChild: Nn,
    expando: st
  }
  se.get = function (e) {
    return e[st]
  }
  se.mount = function () {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
      t[r] = arguments[r]
    }
    t[0].constructor === Array && (t = t[0]),
    t.forEach(function (n) {
      if (!n.prototype || !n.prototype.constructor) {
        throw 'Sortable: Mounted plugin must be a constructor function, not '.concat(
          {}.toString.call(n)
        )
      }
      n.utils && (se.utils = Rt(Rt({}, se.utils), n.utils)),
      tr.mount(n)
    })
  }
  se.create = function (e, t) {
    return new se(e, t)
  }
  se.version = Ka
  let Xe = []
  let Xn
  let gi
  let bi = !1
  let di
  let pi
  let Ir
  let qn
  function gs () {
    function e () {
      this.defaults = {
        scroll: !0,
        forceAutoScrollFallback: !1,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: !0
      }
      for (const t in this) {
        t.charAt(0) === '_' &&
                    typeof this[t] === 'function' &&
                    (this[t] = this[t].bind(this))
      }
    }
    return (
      (e.prototype = {
        dragStarted: function (r) {
          const n = r.originalEvent
          this.sortable.nativeDraggable
            ? Oe(document, 'dragover', this._handleAutoScroll)
            : this.options.supportPointer
              ? Oe(
                document,
                'pointermove',
                this._handleFallbackAutoScroll
              )
              : n.touches
                ? Oe(
                  document,
                  'touchmove',
                  this._handleFallbackAutoScroll
                )
                : Oe(
                  document,
                  'mousemove',
                  this._handleFallbackAutoScroll
                )
        },
        dragOverCompleted: function (r) {
          const n = r.originalEvent
          !this.options.dragOverBubble &&
                        !n.rootEl &&
                        this._handleAutoScroll(n)
        },
        drop: function () {
          this.sortable.nativeDraggable
            ? Ee(document, 'dragover', this._handleAutoScroll)
            : (Ee(
                document,
                'pointermove',
                this._handleFallbackAutoScroll
              ),
              Ee(
                document,
                'touchmove',
                this._handleFallbackAutoScroll
              ),
              Ee(
                document,
                'mousemove',
                this._handleFallbackAutoScroll
              )),
          Oo(),
          _r(),
          Qa()
        },
        nulling: function () {
          (Ir = gi = Xn = bi = qn = di = pi = null), (Xe.length = 0)
        },
        _handleFallbackAutoScroll: function (r) {
          this._handleAutoScroll(r, !0)
        },
        _handleAutoScroll: function (r, n) {
          const i = this
          const o = (r.touches ? r.touches[0] : r).clientX
          const a = (r.touches ? r.touches[0] : r).clientY
          const d = document.elementFromPoint(o, a)
          if (
            ((Ir = r),
            n ||
                            this.options.forceAutoScrollFallback ||
                            er ||
                            Wt ||
                            Gn)
          ) {
            hi(r, this.options, d, n)
            let f = sn(d, !0)
            bi &&
                            (!qn || o !== di || a !== pi) &&
                            (qn && Oo(),
                            (qn = setInterval(function () {
                              const u = sn(
                                document.elementFromPoint(o, a),
                                !0
                              )
                              u !== f && ((f = u), _r()),
                              hi(r, i.options, u, n)
                            }, 10)),
                            (di = o),
                            (pi = a))
          } else {
            if (!this.options.bubbleScroll || sn(d, !0) === Pt()) {
              _r()
              return
            }
            hi(r, this.options, sn(d, !1), !1)
          }
        }
      }),
      $t(e, { pluginName: 'scroll', initializeByDefault: !0 })
    )
  }
  function _r () {
    Xe.forEach(function (e) {
      clearInterval(e.pid)
    }),
    (Xe = [])
  }
  function Oo () {
    clearInterval(qn)
  }
  var hi = _o(function (e, t, r, n) {
    if (t.scroll) {
      const i = (e.touches ? e.touches[0] : e).clientX
      const o = (e.touches ? e.touches[0] : e).clientY
      const a = t.scrollSensitivity
      const d = t.scrollSpeed
      const f = Pt()
      let u = !1
      let w
      gi !== r &&
                ((gi = r),
                _r(),
                (Xn = t.scroll),
                (w = t.scrollFn),
                Xn === !0 && (Xn = sn(r, !0)))
      let m = 0
      let E = Xn
      do {
        const O = E
        const S = qe(O)
        const R = S.top
        const I = S.bottom
        const $ = S.left
        const A = S.right
        const k = S.width
        const Y = S.height
        let ne = void 0
        let J = void 0
        const V = O.scrollWidth
        const de = O.scrollHeight
        const X = ae(O)
        const Z = O.scrollLeft
        const me = O.scrollTop
        O === f
          ? ((ne =
                          k < V &&
                          (X.overflowX === 'auto' ||
                              X.overflowX === 'scroll' ||
                              X.overflowX === 'visible')),
            (J =
                          Y < de &&
                          (X.overflowY === 'auto' ||
                              X.overflowY === 'scroll' ||
                              X.overflowY === 'visible')))
          : ((ne =
                          k < V &&
                          (X.overflowX === 'auto' || X.overflowX === 'scroll')),
            (J =
                          Y < de &&
                          (X.overflowY === 'auto' ||
                              X.overflowY === 'scroll')))
        const l =
                    ne &&
                    (Math.abs(A - i) <= a && Z + k < V) -
                        (Math.abs($ - i) <= a && !!Z)
        const h =
                    J &&
                    (Math.abs(I - o) <= a && me + Y < de) -
                        (Math.abs(R - o) <= a && !!me)
        if (!Xe[m]) {
          for (let v = 0; v <= m; v++) Xe[v] || (Xe[v] = {})
        }
        (Xe[m].vx != l || Xe[m].vy != h || Xe[m].el !== O) &&
                    ((Xe[m].el = O),
                    (Xe[m].vx = l),
                    (Xe[m].vy = h),
                    clearInterval(Xe[m].pid),
                    (l != 0 || h != 0) &&
                        ((u = !0),
                        (Xe[m].pid = setInterval(
                          function () {
                            n &&
                                    this.layer === 0 &&
                                    se.active._onTouchMove(Ir)
                            const p = Xe[this.layer].vy
                              ? Xe[this.layer].vy * d
                              : 0
                            const j = Xe[this.layer].vx
                              ? Xe[this.layer].vx * d
                              : 0;
                            (typeof w === 'function' &&
                                    w.call(
                                      se.dragged.parentNode[st],
                                      j,
                                      p,
                                      e,
                                      Ir,
                                      Xe[this.layer].el
                                    ) !== 'continue') ||
                                    To(Xe[this.layer].el, j, p)
                          }.bind({ layer: m }),
                          24
                        )))),
        m++
      } while (t.bubbleScroll && E !== f && (E = sn(E, !1)))
      bi = u
    }
  }, 30)
  const ko = function (t) {
    const r = t.originalEvent
    const n = t.putSortable
    const i = t.dragEl
    const o = t.activeSortable
    const a = t.dispatchSortableEvent
    const d = t.hideGhostForTarget
    const f = t.unhideGhostForTarget
    if (r) {
      const u = n || o
      d()
      const w =
                r.changedTouches && r.changedTouches.length
                  ? r.changedTouches[0]
                  : r
      const m = document.elementFromPoint(w.clientX, w.clientY)
      f(),
      u &&
                    !u.el.contains(m) &&
                    (a('spill'), this.onSpill({ dragEl: i, putSortable: n }))
    }
  }
  function xi () {}
  xi.prototype = {
    startIndex: null,
    dragStart: function (t) {
      const r = t.oldDraggableIndex
      this.startIndex = r
    },
    onSpill: function (t) {
      const r = t.dragEl
      const n = t.putSortable
      this.sortable.captureAnimationState(),
      n && n.captureAnimationState()
      const i = Nn(this.sortable.el, this.startIndex, this.options)
      i
        ? this.sortable.el.insertBefore(r, i)
        : this.sortable.el.appendChild(r),
      this.sortable.animateAll(),
      n && n.animateAll()
    },
    drop: ko
  }
  $t(xi, { pluginName: 'revertOnSpill' })
  function Ei () {}
  Ei.prototype = {
    onSpill: function (t) {
      const r = t.dragEl
      const n = t.putSortable
      const i = n || this.sortable
      i.captureAnimationState(),
      r.parentNode && r.parentNode.removeChild(r),
      i.animateAll()
    },
    drop: ko
  }
  $t(Ei, { pluginName: 'removeOnSpill' })
  se.mount(new gs())
  se.mount(Ei, xi)
  const Oi = se
  window.Sortable = Oi
  const jo = (e) => {
    e.directive('sortable', (t) => {
      let r = parseInt(t.dataset?.sortableAnimationDuration)
      r !== 0 && !r && (r = 300),
      (t.sortable = Oi.create(t, {
        group: t.getAttribute('x-sortable-group'),
        draggable: '[x-sortable-item]',
        handle: '[x-sortable-handle]',
        dataIdAttr: 'x-sortable-item',
        animation: r,
        ghostClass: 'fi-sortable-ghost'
      }))
    })
  }
  const bs = Object.create
  const Di = Object.defineProperty
  const ys = Object.getPrototypeOf
  const ws = Object.prototype.hasOwnProperty
  const xs = Object.getOwnPropertyNames
  const Es = Object.getOwnPropertyDescriptor
  const Os = (e) => Di(e, '__esModule', { value: !0 })
  const Bo = (e, t) => () => (
    t || ((t = { exports: {} }), e(t.exports, t)), t.exports
  )
  const Ss = (e, t, r) => {
    if ((t && typeof t === 'object') || typeof t === 'function') {
      for (const n of xs(t)) {
        !ws.call(e, n) &&
                    n !== 'default' &&
                    Di(e, n, {
                      get: () => t[n],
                      enumerable: !(r = Es(t, n)) || r.enumerable
                    })
      }
    }
    return e
  }
  const Ho = (e) =>
    Ss(
      Os(
        Di(
          e != null ? bs(ys(e)) : {},
          'default',
          e && e.__esModule && 'default' in e
            ? { get: () => e.default, enumerable: !0 }
            : { value: e, enumerable: !0 }
        )
      ),
      e
    )
  const As = Bo((e) => {
    'use strict'
    Object.defineProperty(e, '__esModule', { value: !0 })
    function t (c) {
      const s = c.getBoundingClientRect()
      return {
        width: s.width,
        height: s.height,
        top: s.top,
        right: s.right,
        bottom: s.bottom,
        left: s.left,
        x: s.left,
        y: s.top
      }
    }
    function r (c) {
      if (c == null) return window
      if (c.toString() !== '[object Window]') {
        const s = c.ownerDocument
        return (s && s.defaultView) || window
      }
      return c
    }
    function n (c) {
      const s = r(c)
      const b = s.pageXOffset
      const _ = s.pageYOffset
      return { scrollLeft: b, scrollTop: _ }
    }
    function i (c) {
      const s = r(c).Element
      return c instanceof s || c instanceof Element
    }
    function o (c) {
      const s = r(c).HTMLElement
      return c instanceof s || c instanceof HTMLElement
    }
    function a (c) {
      if (typeof ShadowRoot > 'u') return !1
      const s = r(c).ShadowRoot
      return c instanceof s || c instanceof ShadowRoot
    }
    function d (c) {
      return { scrollLeft: c.scrollLeft, scrollTop: c.scrollTop }
    }
    function f (c) {
      return c === r(c) || !o(c) ? n(c) : d(c)
    }
    function u (c) {
      return c ? (c.nodeName || '').toLowerCase() : null
    }
    function w (c) {
      return ((i(c) ? c.ownerDocument : c.document) || window.document)
        .documentElement
    }
    function m (c) {
      return t(w(c)).left + n(c).scrollLeft
    }
    function E (c) {
      return r(c).getComputedStyle(c)
    }
    function O (c) {
      const s = E(c)
      const b = s.overflow
      const _ = s.overflowX
      const T = s.overflowY
      return /auto|scroll|overlay|hidden/.test(b + T + _)
    }
    function S (c, s, b) {
      b === void 0 && (b = !1)
      const _ = w(s)
      const T = t(c)
      const L = o(s)
      let U = { scrollLeft: 0, scrollTop: 0 }
      let H = { x: 0, y: 0 }
      return (
        (L || (!L && !b)) &&
                    ((u(s) !== 'body' || O(_)) && (U = f(s)),
                    o(s)
                      ? ((H = t(s)),
                        (H.x += s.clientLeft),
                        (H.y += s.clientTop))
                      : _ && (H.x = m(_))),
        {
          x: T.left + U.scrollLeft - H.x,
          y: T.top + U.scrollTop - H.y,
          width: T.width,
          height: T.height
        }
      )
    }
    function R (c) {
      const s = t(c)
      let b = c.offsetWidth
      let _ = c.offsetHeight
      return (
        Math.abs(s.width - b) <= 1 && (b = s.width),
        Math.abs(s.height - _) <= 1 && (_ = s.height),
        { x: c.offsetLeft, y: c.offsetTop, width: b, height: _ }
      )
    }
    function I (c) {
      return u(c) === 'html'
        ? c
        : c.assignedSlot ||
                      c.parentNode ||
                      (a(c) ? c.host : null) ||
                      w(c)
    }
    function $ (c) {
      return ['html', 'body', '#document'].indexOf(u(c)) >= 0
        ? c.ownerDocument.body
        : o(c) && O(c)
          ? c
          : $(I(c))
    }
    function A (c, s) {
      let b
      s === void 0 && (s = [])
      const _ = $(c)
      const T = _ === ((b = c.ownerDocument) == null ? void 0 : b.body)
      const L = r(_)
      const U = T ? [L].concat(L.visualViewport || [], O(_) ? _ : []) : _
      const H = s.concat(U)
      return T ? H : H.concat(A(I(U)))
    }
    function k (c) {
      return ['table', 'td', 'th'].indexOf(u(c)) >= 0
    }
    function Y (c) {
      return !o(c) || E(c).position === 'fixed' ? null : c.offsetParent
    }
    function ne (c) {
      const s =
                navigator.userAgent.toLowerCase().indexOf('firefox') !== -1
      const b = navigator.userAgent.indexOf('Trident') !== -1
      if (b && o(c)) {
        const _ = E(c)
        if (_.position === 'fixed') return null
      }
      for (let T = I(c); o(T) && ['html', 'body'].indexOf(u(T)) < 0;) {
        const L = E(T)
        if (
          L.transform !== 'none' ||
                    L.perspective !== 'none' ||
                    L.contain === 'paint' ||
                    ['transform', 'perspective'].indexOf(L.willChange) !== -1 ||
                    (s && L.willChange === 'filter') ||
                    (s && L.filter && L.filter !== 'none')
        ) {
          return T
        }
        T = T.parentNode
      }
      return null
    }
    function J (c) {
      for (
        var s = r(c), b = Y(c);
        b && k(b) && E(b).position === 'static';

      ) {
        b = Y(b)
      }
      return b &&
                (u(b) === 'html' ||
                    (u(b) === 'body' && E(b).position === 'static'))
        ? s
        : b || ne(c) || s
    }
    const V = 'top'
    const de = 'bottom'
    const X = 'right'
    const Z = 'left'
    const me = 'auto'
    const l = [V, de, X, Z]
    const h = 'start'
    const v = 'end'
    const p = 'clippingParents'
    const j = 'viewport'
    const P = 'popper'
    const M = 'reference'
    const Q = l.reduce(function (c, s) {
      return c.concat([s + '-' + h, s + '-' + v])
    }, [])
    const ze = [].concat(l, [me]).reduce(function (c, s) {
      return c.concat([s, s + '-' + h, s + '-' + v])
    }, [])
    const Mt = 'beforeRead'
    const Ut = 'read'
    const Lr = 'afterRead'
    const Nr = 'beforeMain'
    const kr = 'main'
    const Vt = 'afterMain'
    const nr = 'beforeWrite'
    const jr = 'write'
    const rr = 'afterWrite'
    const It = [Mt, Ut, Lr, Nr, kr, Vt, nr, jr, rr]
    function Br (c) {
      const s = new Map()
      const b = new Set()
      const _ = []
      c.forEach(function (L) {
        s.set(L.name, L)
      })
      function T (L) {
        b.add(L.name)
        const U = [].concat(L.requires || [], L.requiresIfExists || [])
        U.forEach(function (H) {
          if (!b.has(H)) {
            const G = s.get(H)
            G && T(G)
          }
        }),
        _.push(L)
      }
      return (
        c.forEach(function (L) {
          b.has(L.name) || T(L)
        }),
        _
      )
    }
    function mt (c) {
      const s = Br(c)
      return It.reduce(function (b, _) {
        return b.concat(
          s.filter(function (T) {
            return T.phase === _
          })
        )
      }, [])
    }
    function zt (c) {
      let s
      return function () {
        return (
          s ||
                        (s = new Promise(function (b) {
                          Promise.resolve().then(function () {
                            (s = void 0), b(c())
                          })
                        })),
          s
        )
      }
    }
    function At (c) {
      for (
        var s = arguments.length,
          b = new Array(s > 1 ? s - 1 : 0),
          _ = 1;
        _ < s;
        _++
      ) {
        b[_ - 1] = arguments[_]
      }
      return [].concat(b).reduce(function (T, L) {
        return T.replace(/%s/, L)
      }, c)
    }
    const Dt =
            'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s'
    const Hr =
            'Popper: modifier "%s" requires "%s", but "%s" modifier is not available'
    const Qe = [
      'name',
      'enabled',
      'phase',
      'fn',
      'effect',
      'requires',
      'options'
    ]
    function $r (c) {
      c.forEach(function (s) {
        Object.keys(s).forEach(function (b) {
          switch (b) {
            case 'name':
              typeof s.name !== 'string' &&
                                console.error(
                                  At(
                                    Dt,
                                    String(s.name),
                                    '"name"',
                                    '"string"',
                                    '"' + String(s.name) + '"'
                                  )
                                )
              break
            case 'enabled':
              typeof s.enabled !== 'boolean' &&
                                console.error(
                                  At(
                                    Dt,
                                    s.name,
                                    '"enabled"',
                                    '"boolean"',
                                    '"' + String(s.enabled) + '"'
                                  )
                                )
            case 'phase':
              It.indexOf(s.phase) < 0 &&
                                console.error(
                                  At(
                                    Dt,
                                    s.name,
                                    '"phase"',
                                    'either ' + It.join(', '),
                                    '"' + String(s.phase) + '"'
                                  )
                                )
              break
            case 'fn':
              typeof s.fn !== 'function' &&
                                console.error(
                                  At(
                                    Dt,
                                    s.name,
                                    '"fn"',
                                    '"function"',
                                    '"' + String(s.fn) + '"'
                                  )
                                )
              break
            case 'effect':
              typeof s.effect !== 'function' &&
                                console.error(
                                  At(
                                    Dt,
                                    s.name,
                                    '"effect"',
                                    '"function"',
                                    '"' + String(s.fn) + '"'
                                  )
                                )
              break
            case 'requires':
              Array.isArray(s.requires) ||
                                console.error(
                                  At(
                                    Dt,
                                    s.name,
                                    '"requires"',
                                    '"array"',
                                    '"' + String(s.requires) + '"'
                                  )
                                )
              break
            case 'requiresIfExists':
              Array.isArray(s.requiresIfExists) ||
                                console.error(
                                  At(
                                    Dt,
                                    s.name,
                                    '"requiresIfExists"',
                                    '"array"',
                                    '"' + String(s.requiresIfExists) + '"'
                                  )
                                )
              break
            case 'options':
            case 'data':
              break
            default:
              console.error(
                'PopperJS: an invalid property has been provided to the "' +
                                    s.name +
                                    '" modifier, valid properties are ' +
                                    Qe.map(function (_) {
                                      return '"' + _ + '"'
                                    }).join(', ') +
                                    '; but "' +
                                    b +
                                    '" was provided.'
              )
          }
          s.requires &&
                        s.requires.forEach(function (_) {
                          c.find(function (T) {
                            return T.name === _
                          }) == null &&
                                console.error(At(Hr, String(s.name), _, _))
                        })
        })
      })
    }
    function Wr (c, s) {
      const b = new Set()
      return c.filter(function (_) {
        const T = s(_)
        if (!b.has(T)) return b.add(T), !0
      })
    }
    function ot (c) {
      return c.split('-')[0]
    }
    function Ur (c) {
      const s = c.reduce(function (b, _) {
        const T = b[_.name]
        return (
          (b[_.name] = T
            ? Object.assign({}, T, _, {
              options: Object.assign({}, T.options, _.options),
              data: Object.assign({}, T.data, _.data)
            })
            : _),
          b
        )
      }, {})
      return Object.keys(s).map(function (b) {
        return s[b]
      })
    }
    function ir (c) {
      const s = r(c)
      const b = w(c)
      const _ = s.visualViewport
      let T = b.clientWidth
      let L = b.clientHeight
      let U = 0
      let H = 0
      return (
        _ &&
                    ((T = _.width),
                    (L = _.height),
                    /^((?!chrome|android).)*safari/i.test(
                      navigator.userAgent
                    ) || ((U = _.offsetLeft), (H = _.offsetTop))),
        { width: T, height: L, x: U + m(c), y: H }
      )
    }
    const gt = Math.max
    const ln = Math.min
    const Yt = Math.round
    function or (c) {
      let s
      const b = w(c)
      const _ = n(c)
      const T = (s = c.ownerDocument) == null ? void 0 : s.body
      const L = gt(
        b.scrollWidth,
        b.clientWidth,
        T ? T.scrollWidth : 0,
        T ? T.clientWidth : 0
      )
      const U = gt(
        b.scrollHeight,
        b.clientHeight,
        T ? T.scrollHeight : 0,
        T ? T.clientHeight : 0
      )
      let H = -_.scrollLeft + m(c)
      const G = -_.scrollTop
      return (
        E(T || b).direction === 'rtl' &&
                    (H += gt(b.clientWidth, T ? T.clientWidth : 0) - L),
        { width: L, height: U, x: H, y: G }
      )
    }
    function kn (c, s) {
      const b = s.getRootNode && s.getRootNode()
      if (c.contains(s)) return !0
      if (b && a(b)) {
        let _ = s
        do {
          if (_ && c.isSameNode(_)) return !0
          _ = _.parentNode || _.host
        } while (_)
      }
      return !1
    }
    function Xt (c) {
      return Object.assign({}, c, {
        left: c.x,
        top: c.y,
        right: c.x + c.width,
        bottom: c.y + c.height
      })
    }
    function ar (c) {
      const s = t(c)
      return (
        (s.top = s.top + c.clientTop),
        (s.left = s.left + c.clientLeft),
        (s.bottom = s.top + c.clientHeight),
        (s.right = s.left + c.clientWidth),
        (s.width = c.clientWidth),
        (s.height = c.clientHeight),
        (s.x = s.left),
        (s.y = s.top),
        s
      )
    }
    function sr (c, s) {
      return s === j ? Xt(ir(c)) : o(s) ? ar(s) : Xt(or(w(c)))
    }
    function yn (c) {
      const s = A(I(c))
      const b = ['absolute', 'fixed'].indexOf(E(c).position) >= 0
      const _ = b && o(c) ? J(c) : c
      return i(_)
        ? s.filter(function (T) {
          return i(T) && kn(T, _) && u(T) !== 'body'
        })
        : []
    }
    function wn (c, s, b) {
      const _ = s === 'clippingParents' ? yn(c) : [].concat(s)
      const T = [].concat(_, [b])
      const L = T[0]
      const U = T.reduce(
        function (H, G) {
          const oe = sr(c, G)
          return (
            (H.top = gt(oe.top, H.top)),
            (H.right = ln(oe.right, H.right)),
            (H.bottom = ln(oe.bottom, H.bottom)),
            (H.left = gt(oe.left, H.left)),
            H
          )
        },
        sr(c, L)
      )
      return (
        (U.width = U.right - U.left),
        (U.height = U.bottom - U.top),
        (U.x = U.left),
        (U.y = U.top),
        U
      )
    }
    function cn (c) {
      return c.split('-')[1]
    }
    function dt (c) {
      return ['top', 'bottom'].indexOf(c) >= 0 ? 'x' : 'y'
    }
    function lr (c) {
      const s = c.reference
      const b = c.element
      const _ = c.placement
      const T = _ ? ot(_) : null
      const L = _ ? cn(_) : null
      const U = s.x + s.width / 2 - b.width / 2
      const H = s.y + s.height / 2 - b.height / 2
      let G
      switch (T) {
        case V:
          G = { x: U, y: s.y - b.height }
          break
        case de:
          G = { x: U, y: s.y + s.height }
          break
        case X:
          G = { x: s.x + s.width, y: H }
          break
        case Z:
          G = { x: s.x - b.width, y: H }
          break
        default:
          G = { x: s.x, y: s.y }
      }
      const oe = T ? dt(T) : null
      if (oe != null) {
        const z = oe === 'y' ? 'height' : 'width'
        switch (L) {
          case h:
            G[oe] = G[oe] - (s[z] / 2 - b[z] / 2)
            break
          case v:
            G[oe] = G[oe] + (s[z] / 2 - b[z] / 2)
            break
        }
      }
      return G
    }
    function cr () {
      return { top: 0, right: 0, bottom: 0, left: 0 }
    }
    function fr (c) {
      return Object.assign({}, cr(), c)
    }
    function ur (c, s) {
      return s.reduce(function (b, _) {
        return (b[_] = c), b
      }, {})
    }
    function qt (c, s) {
      s === void 0 && (s = {})
      const b = s
      const _ = b.placement
      const T = _ === void 0 ? c.placement : _
      const L = b.boundary
      const U = L === void 0 ? p : L
      const H = b.rootBoundary
      const G = H === void 0 ? j : H
      const oe = b.elementContext
      const z = oe === void 0 ? P : oe
      const Ce = b.altBoundary
      const Le = Ce === void 0 ? !1 : Ce
      const De = b.padding
      const xe = De === void 0 ? 0 : De
      const Re = fr(typeof xe !== 'number' ? xe : ur(xe, l))
      const Se = z === P ? M : P
      const Be = c.elements.reference
      const Me = c.rects.popper
      const He = c.elements[Le ? Se : z]
      const ce = wn(
        i(He) ? He : He.contextElement || w(c.elements.popper),
        U,
        G
      )
      const Pe = t(Be)
      const _e = lr({
        reference: Pe,
        element: Me,
        strategy: 'absolute',
        placement: T
      })
      const Ne = Xt(Object.assign({}, Me, _e))
      const Fe = z === P ? Ne : Pe
      const Ye = {
        top: ce.top - Fe.top + Re.top,
        bottom: Fe.bottom - ce.bottom + Re.bottom,
        left: ce.left - Fe.left + Re.left,
        right: Fe.right - ce.right + Re.right
      }
      const $e = c.modifiersData.offset
      if (z === P && $e) {
        const Ue = $e[T]
        Object.keys(Ye).forEach(function (wt) {
          const et = [X, de].indexOf(wt) >= 0 ? 1 : -1
          const Lt = [V, de].indexOf(wt) >= 0 ? 'y' : 'x'
          Ye[wt] += Ue[Lt] * et
        })
      }
      return Ye
    }
    const dr =
            'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.'
    const Vr =
            'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.'
    const xn = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    }
    function fn () {
      for (
        var c = arguments.length, s = new Array(c), b = 0;
        b < c;
        b++
      ) {
        s[b] = arguments[b]
      }
      return !s.some(function (_) {
        return !(_ && typeof _.getBoundingClientRect === 'function')
      })
    }
    function En (c) {
      c === void 0 && (c = {})
      const s = c
      const b = s.defaultModifiers
      const _ = b === void 0 ? [] : b
      const T = s.defaultOptions
      const L = T === void 0 ? xn : T
      return function (H, G, oe) {
        oe === void 0 && (oe = L)
        let z = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, xn, L),
          modifiersData: {},
          elements: { reference: H, popper: G },
          attributes: {},
          styles: {}
        }
        let Ce = []
        let Le = !1
        var De = {
          state: z,
          setOptions: function (Be) {
            Re(),
            (z.options = Object.assign({}, L, z.options, Be)),
            (z.scrollParents = {
              reference: i(H)
                ? A(H)
                : H.contextElement
                  ? A(H.contextElement)
                  : [],
              popper: A(G)
            })
            const Me = mt(Ur([].concat(_, z.options.modifiers)))
            z.orderedModifiers = Me.filter(function ($e) {
              return $e.enabled
            })
            const He = Wr(
              [].concat(Me, z.options.modifiers),
              function ($e) {
                const Ue = $e.name
                return Ue
              }
            )
            if (($r(He), ot(z.options.placement) === me)) {
              const ce = z.orderedModifiers.find(function ($e) {
                const Ue = $e.name
                return Ue === 'flip'
              })
              ce ||
                                console.error(
                                  [
                                    'Popper: "auto" placements require the "flip" modifier be',
                                    'present and enabled to work.'
                                  ].join(' ')
                                )
            }
            const Pe = E(G)
            const _e = Pe.marginTop
            const Ne = Pe.marginRight
            const Fe = Pe.marginBottom
            const Ye = Pe.marginLeft
            return (
              [_e, Ne, Fe, Ye].some(function ($e) {
                return parseFloat($e)
              }) &&
                                console.warn(
                                  [
                                    'Popper: CSS "margin" styles cannot be used to apply padding',
                                    'between the popper and its reference element or boundary.',
                                    'To replicate margin, use the `offset` modifier, as well as',
                                    'the `padding` option in the `preventOverflow` and `flip`',
                                    'modifiers.'
                                  ].join(' ')
                                ),
              xe(),
              De.update()
            )
          },
          forceUpdate: function () {
            if (!Le) {
              const Be = z.elements
              const Me = Be.reference
              const He = Be.popper
              if (!fn(Me, He)) {
                console.error(dr)
                return
              }
              (z.rects = {
                reference: S(
                  Me,
                  J(He),
                  z.options.strategy === 'fixed'
                ),
                popper: R(He)
              }),
              (z.reset = !1),
              (z.placement = z.options.placement),
              z.orderedModifiers.forEach(function (Ue) {
                return (z.modifiersData[Ue.name] =
                                        Object.assign({}, Ue.data))
              })
              for (
                let ce = 0, Pe = 0;
                Pe < z.orderedModifiers.length;
                Pe++
              ) {
                if (((ce += 1), ce > 100)) {
                  console.error(Vr)
                  break
                }
                if (z.reset === !0) {
                  (z.reset = !1), (Pe = -1)
                  continue
                }
                const _e = z.orderedModifiers[Pe]
                const Ne = _e.fn
                const Fe = _e.options
                const Ye = Fe === void 0 ? {} : Fe
                const $e = _e.name
                typeof Ne === 'function' &&
                                    (z =
                                        Ne({
                                          state: z,
                                          options: Ye,
                                          name: $e,
                                          instance: De
                                        }) || z)
              }
            }
          },
          update: zt(function () {
            return new Promise(function (Se) {
              De.forceUpdate(), Se(z)
            })
          }),
          destroy: function () {
            Re(), (Le = !0)
          }
        }
        if (!fn(H, G)) return console.error(dr), De
        De.setOptions(oe).then(function (Se) {
          !Le && oe.onFirstUpdate && oe.onFirstUpdate(Se)
        })
        function xe () {
          z.orderedModifiers.forEach(function (Se) {
            const Be = Se.name
            const Me = Se.options
            const He = Me === void 0 ? {} : Me
            const ce = Se.effect
            if (typeof ce === 'function') {
              const Pe = ce({
                state: z,
                name: Be,
                instance: De,
                options: He
              })
              const _e = function () {}
              Ce.push(Pe || _e)
            }
          })
        }
        function Re () {
          Ce.forEach(function (Se) {
            return Se()
          }),
          (Ce = [])
        }
        return De
      }
    }
    const On = { passive: !0 }
    function zr (c) {
      const s = c.state
      const b = c.instance
      const _ = c.options
      const T = _.scroll
      const L = T === void 0 ? !0 : T
      const U = _.resize
      const H = U === void 0 ? !0 : U
      const G = r(s.elements.popper)
      const oe = [].concat(
        s.scrollParents.reference,
        s.scrollParents.popper
      )
      return (
        L &&
                    oe.forEach(function (z) {
                      z.addEventListener('scroll', b.update, On)
                    }),
        H && G.addEventListener('resize', b.update, On),
        function () {
          L &&
                        oe.forEach(function (z) {
                          z.removeEventListener('scroll', b.update, On)
                        }),
          H && G.removeEventListener('resize', b.update, On)
        }
      )
    }
    const jn = {
      name: 'eventListeners',
      enabled: !0,
      phase: 'write',
      fn: function () {},
      effect: zr,
      data: {}
    }
    function Yr (c) {
      const s = c.state
      const b = c.name
      s.modifiersData[b] = lr({
        reference: s.rects.reference,
        element: s.rects.popper,
        strategy: 'absolute',
        placement: s.placement
      })
    }
    const Bn = {
      name: 'popperOffsets',
      enabled: !0,
      phase: 'read',
      fn: Yr,
      data: {}
    }
    const Xr = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }
    function qr (c) {
      const s = c.x
      const b = c.y
      const _ = window
      const T = _.devicePixelRatio || 1
      return { x: Yt(Yt(s * T) / T) || 0, y: Yt(Yt(b * T) / T) || 0 }
    }
    function Hn (c) {
      let s
      const b = c.popper
      const _ = c.popperRect
      const T = c.placement
      const L = c.offsets
      const U = c.position
      const H = c.gpuAcceleration
      const G = c.adaptive
      const oe = c.roundOffsets
      const z = oe === !0 ? qr(L) : typeof oe === 'function' ? oe(L) : L
      const Ce = z.x
      let Le = Ce === void 0 ? 0 : Ce
      const De = z.y
      let xe = De === void 0 ? 0 : De
      const Re = L.hasOwnProperty('x')
      const Se = L.hasOwnProperty('y')
      let Be = Z
      let Me = V
      const He = window
      if (G) {
        let ce = J(b)
        let Pe = 'clientHeight'
        let _e = 'clientWidth'
        ce === r(b) &&
                    ((ce = w(b)),
                    E(ce).position !== 'static' &&
                        ((Pe = 'scrollHeight'), (_e = 'scrollWidth'))),
        (ce = ce),
        T === V &&
                        ((Me = de),
                        (xe -= ce[Pe] - _.height),
                        (xe *= H ? 1 : -1)),
        T === Z &&
                        ((Be = X),
                        (Le -= ce[_e] - _.width),
                        (Le *= H ? 1 : -1))
      }
      const Ne = Object.assign({ position: U }, G && Xr)
      if (H) {
        let Fe
        return Object.assign(
          {},
          Ne,
          ((Fe = {}),
          (Fe[Me] = Se ? '0' : ''),
          (Fe[Be] = Re ? '0' : ''),
          (Fe.transform =
                        (He.devicePixelRatio || 1) < 2
                          ? 'translate(' + Le + 'px, ' + xe + 'px)'
                          : 'translate3d(' + Le + 'px, ' + xe + 'px, 0)'),
          Fe)
        )
      }
      return Object.assign(
        {},
        Ne,
        ((s = {}),
        (s[Me] = Se ? xe + 'px' : ''),
        (s[Be] = Re ? Le + 'px' : ''),
        (s.transform = ''),
        s)
      )
    }
    function g (c) {
      const s = c.state
      const b = c.options
      const _ = b.gpuAcceleration
      const T = _ === void 0 ? !0 : _
      const L = b.adaptive
      const U = L === void 0 ? !0 : L
      const H = b.roundOffsets
      const G = H === void 0 ? !0 : H
      const oe = E(s.elements.popper).transitionProperty || ''
      U &&
                ['transform', 'top', 'right', 'bottom', 'left'].some(
                  function (Ce) {
                    return oe.indexOf(Ce) >= 0
                  }
                ) &&
                console.warn(
                  [
                    'Popper: Detected CSS transitions on at least one of the following',
                    'CSS properties: "transform", "top", "right", "bottom", "left".',
                        `

`,
                        'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
                        'for smooth transitions, or remove these properties from the CSS',
                        'transition declaration on the popper element if only transitioning',
                        'opacity or background-color for example.',
                        `

`,
                        'We recommend using the popper element as a wrapper around an inner',
                        'element that can have any CSS property transitioned for animations.'
                  ].join(' ')
                )
      const z = {
        placement: ot(s.placement),
        popper: s.elements.popper,
        popperRect: s.rects.popper,
        gpuAcceleration: T
      }
      s.modifiersData.popperOffsets != null &&
                (s.styles.popper = Object.assign(
                  {},
                  s.styles.popper,
                  Hn(
                    Object.assign({}, z, {
                      offsets: s.modifiersData.popperOffsets,
                      position: s.options.strategy,
                      adaptive: U,
                      roundOffsets: G
                    })
                  )
                )),
      s.modifiersData.arrow != null &&
                    (s.styles.arrow = Object.assign(
                      {},
                      s.styles.arrow,
                      Hn(
                        Object.assign({}, z, {
                          offsets: s.modifiersData.arrow,
                          position: 'absolute',
                          adaptive: !1,
                          roundOffsets: G
                        })
                      )
                    )),
      (s.attributes.popper = Object.assign({}, s.attributes.popper, {
        'data-popper-placement': s.placement
      }))
    }
    const y = {
      name: 'computeStyles',
      enabled: !0,
      phase: 'beforeWrite',
      fn: g,
      data: {}
    }
    function D (c) {
      const s = c.state
      Object.keys(s.elements).forEach(function (b) {
        const _ = s.styles[b] || {}
        const T = s.attributes[b] || {}
        const L = s.elements[b]
        !o(L) ||
                    !u(L) ||
                    (Object.assign(L.style, _),
                    Object.keys(T).forEach(function (U) {
                      const H = T[U]
                      H === !1
                        ? L.removeAttribute(U)
                        : L.setAttribute(U, H === !0 ? '' : H)
                    }))
      })
    }
    function F (c) {
      const s = c.state
      const b = {
        popper: {
          position: s.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: { position: 'absolute' },
        reference: {}
      }
      return (
        Object.assign(s.elements.popper.style, b.popper),
        (s.styles = b),
        s.elements.arrow &&
                    Object.assign(s.elements.arrow.style, b.arrow),
        function () {
          Object.keys(s.elements).forEach(function (_) {
            const T = s.elements[_]
            const L = s.attributes[_] || {}
            const U = Object.keys(
              s.styles.hasOwnProperty(_) ? s.styles[_] : b[_]
            )
            const H = U.reduce(function (G, oe) {
              return (G[oe] = ''), G
            }, {})
            !o(T) ||
                            !u(T) ||
                            (Object.assign(T.style, H),
                            Object.keys(L).forEach(function (G) {
                              T.removeAttribute(G)
                            }))
          })
        }
      )
    }
    const q = {
      name: 'applyStyles',
      enabled: !0,
      phase: 'write',
      fn: D,
      effect: F,
      requires: ['computeStyles']
    }
    function W (c, s, b) {
      const _ = ot(c)
      const T = [Z, V].indexOf(_) >= 0 ? -1 : 1
      const L =
                typeof b === 'function'
                  ? b(Object.assign({}, s, { placement: c }))
                  : b
      let U = L[0]
      let H = L[1]
      return (
        (U = U || 0),
        (H = (H || 0) * T),
        [Z, X].indexOf(_) >= 0 ? { x: H, y: U } : { x: U, y: H }
      )
    }
    function B (c) {
      const s = c.state
      const b = c.options
      const _ = c.name
      const T = b.offset
      const L = T === void 0 ? [0, 0] : T
      const U = ze.reduce(function (z, Ce) {
        return (z[Ce] = W(Ce, s.rects, L)), z
      }, {})
      const H = U[s.placement]
      const G = H.x
      const oe = H.y
      s.modifiersData.popperOffsets != null &&
                ((s.modifiersData.popperOffsets.x += G),
                (s.modifiersData.popperOffsets.y += oe)),
      (s.modifiersData[_] = U)
    }
    const be = {
      name: 'offset',
      enabled: !0,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: B
    }
    const le = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    }
    function pe (c) {
      return c.replace(/left|right|bottom|top/g, function (s) {
        return le[s]
      })
    }
    const ye = { start: 'end', end: 'start' }
    function Te (c) {
      return c.replace(/start|end/g, function (s) {
        return ye[s]
      })
    }
    function je (c, s) {
      s === void 0 && (s = {})
      const b = s
      const _ = b.placement
      const T = b.boundary
      const L = b.rootBoundary
      const U = b.padding
      const H = b.flipVariations
      const G = b.allowedAutoPlacements
      const oe = G === void 0 ? ze : G
      const z = cn(_)
      const Ce = z
        ? H
          ? Q
          : Q.filter(function (xe) {
            return cn(xe) === z
          })
        : l
      let Le = Ce.filter(function (xe) {
        return oe.indexOf(xe) >= 0
      })
      Le.length === 0 &&
                ((Le = Ce),
                console.error(
                  [
                    'Popper: The `allowedAutoPlacements` option did not allow any',
                    'placements. Ensure the `placement` option matches the variation',
                    'of the allowed placements.',
                    'For example, "auto" cannot be used to allow "bottom-start".',
                    'Use "auto-start" instead.'
                  ].join(' ')
                ))
      const De = Le.reduce(function (xe, Re) {
        return (
          (xe[Re] = qt(c, {
            placement: Re,
            boundary: T,
            rootBoundary: L,
            padding: U
          })[ot(Re)]),
          xe
        )
      }, {})
      return Object.keys(De).sort(function (xe, Re) {
        return De[xe] - De[Re]
      })
    }
    function Ae (c) {
      if (ot(c) === me) return []
      const s = pe(c)
      return [Te(c), s, Te(s)]
    }
    function Ie (c) {
      const s = c.state
      const b = c.options
      const _ = c.name
      if (!s.modifiersData[_]._skip) {
        for (
          var T = b.mainAxis,
            L = T === void 0 ? !0 : T,
            U = b.altAxis,
            H = U === void 0 ? !0 : U,
            G = b.fallbackPlacements,
            oe = b.padding,
            z = b.boundary,
            Ce = b.rootBoundary,
            Le = b.altBoundary,
            De = b.flipVariations,
            xe = De === void 0 ? !0 : De,
            Re = b.allowedAutoPlacements,
            Se = s.options.placement,
            Be = ot(Se),
            Me = Be === Se,
            He = G || (Me || !xe ? [pe(Se)] : Ae(Se)),
            ce = [Se].concat(He).reduce(function (te, ge) {
              return te.concat(
                ot(ge) === me
                  ? je(s, {
                    placement: ge,
                    boundary: z,
                    rootBoundary: Ce,
                    padding: oe,
                    flipVariations: xe,
                    allowedAutoPlacements: Re
                  })
                  : ge
              )
            }, []),
            Pe = s.rects.reference,
            _e = s.rects.popper,
            Ne = new Map(),
            Fe = !0,
            Ye = ce[0],
            $e = 0;
          $e < ce.length;
          $e++
        ) {
          const Ue = ce[$e]
          const wt = ot(Ue)
          const et = cn(Ue) === h
          const Lt = [V, de].indexOf(wt) >= 0
          const dn = Lt ? 'width' : 'height'
          const Zt = qt(s, {
            placement: Ue,
            boundary: z,
            rootBoundary: Ce,
            altBoundary: Le,
            padding: oe
          })
          let Nt = Lt ? (et ? X : Z) : et ? de : V
          Pe[dn] > _e[dn] && (Nt = pe(Nt))
          const $n = pe(Nt)
          const Qt = []
          if (
            (L && Qt.push(Zt[wt] <= 0),
            H && Qt.push(Zt[Nt] <= 0, Zt[$n] <= 0),
            Qt.every(function (te) {
              return te
            }))
          ) {
            (Ye = Ue), (Fe = !1)
            break
          }
          Ne.set(Ue, Qt)
        }
        if (Fe) {
          for (
            let Sn = xe ? 3 : 1,
              Wn = function (ge) {
                const we = ce.find(function (Ke) {
                  const Je = Ne.get(Ke)
                  if (Je) {
                    return Je.slice(0, ge).every(
                      function (Ct) {
                        return Ct
                      }
                    )
                  }
                })
                if (we) return (Ye = we), 'break'
              },
              C = Sn;
            C > 0;
            C--
          ) {
            const K = Wn(C)
            if (K === 'break') break
          }
        }
        s.placement !== Ye &&
                    ((s.modifiersData[_]._skip = !0),
                    (s.placement = Ye),
                    (s.reset = !0))
      }
    }
    const re = {
      name: 'flip',
      enabled: !0,
      phase: 'main',
      fn: Ie,
      requiresIfExists: ['offset'],
      data: { _skip: !1 }
    }
    function he (c) {
      return c === 'x' ? 'y' : 'x'
    }
    function ve (c, s, b) {
      return gt(c, ln(s, b))
    }
    function ee (c) {
      const s = c.state
      const b = c.options
      const _ = c.name
      const T = b.mainAxis
      const L = T === void 0 ? !0 : T
      const U = b.altAxis
      const H = U === void 0 ? !1 : U
      const G = b.boundary
      const oe = b.rootBoundary
      const z = b.altBoundary
      const Ce = b.padding
      const Le = b.tether
      const De = Le === void 0 ? !0 : Le
      const xe = b.tetherOffset
      const Re = xe === void 0 ? 0 : xe
      const Se = qt(s, {
        boundary: G,
        rootBoundary: oe,
        padding: Ce,
        altBoundary: z
      })
      const Be = ot(s.placement)
      const Me = cn(s.placement)
      const He = !Me
      const ce = dt(Be)
      const Pe = he(ce)
      const _e = s.modifiersData.popperOffsets
      const Ne = s.rects.reference
      const Fe = s.rects.popper
      const Ye =
                typeof Re === 'function'
                  ? Re(
                    Object.assign({}, s.rects, {
                      placement: s.placement
                    })
                  )
                  : Re
      const $e = { x: 0, y: 0 }
      if (_e) {
        if (L || H) {
          const Ue = ce === 'y' ? V : Z
          const wt = ce === 'y' ? de : X
          const et = ce === 'y' ? 'height' : 'width'
          const Lt = _e[ce]
          const dn = _e[ce] + Se[Ue]
          const Zt = _e[ce] - Se[wt]
          const Nt = De ? -Fe[et] / 2 : 0
          const $n = Me === h ? Ne[et] : Fe[et]
          const Qt = Me === h ? -Fe[et] : -Ne[et]
          const Sn = s.elements.arrow
          const Wn = De && Sn ? R(Sn) : { width: 0, height: 0 }
          const C = s.modifiersData['arrow#persistent']
            ? s.modifiersData['arrow#persistent'].padding
            : cr()
          const K = C[Ue]
          const te = C[wt]
          const ge = ve(0, Ne[et], Wn[et])
          const we = He
            ? Ne[et] / 2 - Nt - ge - K - Ye
            : $n - ge - K - Ye
          const Ke = He
            ? -Ne[et] / 2 + Nt + ge + te + Ye
            : Qt + ge + te + Ye
          const Je = s.elements.arrow && J(s.elements.arrow)
          const Ct = Je
            ? ce === 'y'
              ? Je.clientTop || 0
              : Je.clientLeft || 0
            : 0
          const Un = s.modifiersData.offset
            ? s.modifiersData.offset[s.placement][ce]
            : 0
          const _t = _e[ce] + we - Un - Ct
          const An = _e[ce] + Ke - Un
          if (L) {
            const pn = ve(
              De ? ln(dn, _t) : dn,
              Lt,
              De ? gt(Zt, An) : Zt
            );
            (_e[ce] = pn), ($e[ce] = pn - Lt)
          }
          if (H) {
            const en = ce === 'x' ? V : Z
            const Gr = ce === 'x' ? de : X
            const tn = _e[Pe]
            const hn = tn + Se[en]
            const Ci = tn - Se[Gr]
            const _i = ve(
              De ? ln(hn, _t) : hn,
              tn,
              De ? gt(Ci, An) : Ci
            );
            (_e[Pe] = _i), ($e[Pe] = _i - tn)
          }
        }
        s.modifiersData[_] = $e
      }
    }
    const ie = {
      name: 'preventOverflow',
      enabled: !0,
      phase: 'main',
      fn: ee,
      requiresIfExists: ['offset']
    }
    const x = function (s, b) {
      return (
        (s =
                    typeof s === 'function'
                      ? s(
                        Object.assign({}, b.rects, {
                          placement: b.placement
                        })
                      )
                      : s),
        fr(typeof s !== 'number' ? s : ur(s, l))
      )
    }
    function Ge (c) {
      let s
      const b = c.state
      const _ = c.name
      const T = c.options
      const L = b.elements.arrow
      const U = b.modifiersData.popperOffsets
      const H = ot(b.placement)
      const G = dt(H)
      const oe = [Z, X].indexOf(H) >= 0
      const z = oe ? 'height' : 'width'
      if (!(!L || !U)) {
        const Ce = x(T.padding, b)
        const Le = R(L)
        const De = G === 'y' ? V : Z
        const xe = G === 'y' ? de : X
        const Re =
                    b.rects.reference[z] +
                    b.rects.reference[G] -
                    U[G] -
                    b.rects.popper[z]
        const Se = U[G] - b.rects.reference[G]
        const Be = J(L)
        const Me = Be
          ? G === 'y'
            ? Be.clientHeight || 0
            : Be.clientWidth || 0
          : 0
        const He = Re / 2 - Se / 2
        const ce = Ce[De]
        const Pe = Me - Le[z] - Ce[xe]
        const _e = Me / 2 - Le[z] / 2 + He
        const Ne = ve(ce, _e, Pe)
        const Fe = G
        b.modifiersData[_] =
                    ((s = {}), (s[Fe] = Ne), (s.centerOffset = Ne - _e), s)
      }
    }
    function fe (c) {
      const s = c.state
      const b = c.options
      const _ = b.element
      let T = _ === void 0 ? '[data-popper-arrow]' : _
      if (
        T != null &&
                !(
                  typeof T === 'string' &&
                    ((T = s.elements.popper.querySelector(T)), !T)
                )
      ) {
        if (
          (o(T) ||
                        console.error(
                          [
                            'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
                            'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
                            'the arrow.'
                          ].join(' ')
                        ),
          !kn(s.elements.popper, T))
        ) {
          console.error(
            [
              'Popper: "arrow" modifier\'s `element` must be a child of the popper',
              'element.'
            ].join(' ')
          )
          return
        }
        s.elements.arrow = T
      }
    }
    const Ft = {
      name: 'arrow',
      enabled: !0,
      phase: 'main',
      fn: Ge,
      effect: fe,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    }
    function bt (c, s, b) {
      return (
        b === void 0 && (b = { x: 0, y: 0 }),
        {
          top: c.top - s.height - b.y,
          right: c.right - s.width + b.x,
          bottom: c.bottom - s.height + b.y,
          left: c.left - s.width - b.x
        }
      )
    }
    function Gt (c) {
      return [V, X, de, Z].some(function (s) {
        return c[s] >= 0
      })
    }
    function Kt (c) {
      const s = c.state
      const b = c.name
      const _ = s.rects.reference
      const T = s.rects.popper
      const L = s.modifiersData.preventOverflow
      const U = qt(s, { elementContext: 'reference' })
      const H = qt(s, { altBoundary: !0 })
      const G = bt(U, _)
      const oe = bt(H, T, L)
      const z = Gt(G)
      const Ce = Gt(oe);
      (s.modifiersData[b] = {
        referenceClippingOffsets: G,
        popperEscapeOffsets: oe,
        isReferenceHidden: z,
        hasPopperEscaped: Ce
      }),
      (s.attributes.popper = Object.assign({}, s.attributes.popper, {
        'data-popper-reference-hidden': z,
        'data-popper-escaped': Ce
      }))
    }
    const Jt = {
      name: 'hide',
      enabled: !0,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: Kt
    }
    const rt = [jn, Bn, y, q]
    const lt = En({ defaultModifiers: rt })
    const yt = [jn, Bn, y, q, be, re, ie, Ft, Jt]
    const un = En({ defaultModifiers: yt });
    (e.applyStyles = q),
    (e.arrow = Ft),
    (e.computeStyles = y),
    (e.createPopper = un),
    (e.createPopperLite = lt),
    (e.defaultModifiers = yt),
    (e.detectOverflow = qt),
    (e.eventListeners = jn),
    (e.flip = re),
    (e.hide = Jt),
    (e.offset = be),
    (e.popperGenerator = En),
    (e.popperOffsets = Bn),
    (e.preventOverflow = ie)
  })
  const $o = Bo((e) => {
    'use strict'
    Object.defineProperty(e, '__esModule', { value: !0 })
    const t = As()
    const r =
            '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'
    const n = 'tippy-box'
    const i = 'tippy-content'
    const o = 'tippy-backdrop'
    const a = 'tippy-arrow'
    const d = 'tippy-svg-arrow'
    const f = { passive: !0, capture: !0 }
    function u (g, y) {
      return {}.hasOwnProperty.call(g, y)
    }
    function w (g, y, D) {
      if (Array.isArray(g)) {
        const F = g[y]
        return F ?? (Array.isArray(D) ? D[y] : D)
      }
      return g
    }
    function m (g, y) {
      const D = {}.toString.call(g)
      return D.indexOf('[object') === 0 && D.indexOf(y + ']') > -1
    }
    function E (g, y) {
      return typeof g === 'function' ? g.apply(void 0, y) : g
    }
    function O (g, y) {
      if (y === 0) return g
      let D
      return function (F) {
        clearTimeout(D),
        (D = setTimeout(function () {
          g(F)
        }, y))
      }
    }
    function S (g, y) {
      const D = Object.assign({}, g)
      return (
        y.forEach(function (F) {
          delete D[F]
        }),
        D
      )
    }
    function R (g) {
      return g.split(/\s+/).filter(Boolean)
    }
    function I (g) {
      return [].concat(g)
    }
    function $ (g, y) {
      g.indexOf(y) === -1 && g.push(y)
    }
    function A (g) {
      return g.filter(function (y, D) {
        return g.indexOf(y) === D
      })
    }
    function k (g) {
      return g.split('-')[0]
    }
    function Y (g) {
      return [].slice.call(g)
    }
    function ne (g) {
      return Object.keys(g).reduce(function (y, D) {
        return g[D] !== void 0 && (y[D] = g[D]), y
      }, {})
    }
    function J () {
      return document.createElement('div')
    }
    function V (g) {
      return ['Element', 'Fragment'].some(function (y) {
        return m(g, y)
      })
    }
    function de (g) {
      return m(g, 'NodeList')
    }
    function X (g) {
      return m(g, 'MouseEvent')
    }
    function Z (g) {
      return !!(g && g._tippy && g._tippy.reference === g)
    }
    function me (g) {
      return V(g)
        ? [g]
        : de(g)
          ? Y(g)
          : Array.isArray(g)
            ? g
            : Y(document.querySelectorAll(g))
    }
    function l (g, y) {
      g.forEach(function (D) {
        D && (D.style.transitionDuration = y + 'ms')
      })
    }
    function h (g, y) {
      g.forEach(function (D) {
        D && D.setAttribute('data-state', y)
      })
    }
    function v (g) {
      let y
      const D = I(g)
      const F = D[0]
      return !(F == null || (y = F.ownerDocument) == null) && y.body
        ? F.ownerDocument
        : document
    }
    function p (g, y) {
      const D = y.clientX
      const F = y.clientY
      return g.every(function (q) {
        const W = q.popperRect
        const B = q.popperState
        const be = q.props
        const le = be.interactiveBorder
        const pe = k(B.placement)
        const ye = B.modifiersData.offset
        if (!ye) return !0
        const Te = pe === 'bottom' ? ye.top.y : 0
        const je = pe === 'top' ? ye.bottom.y : 0
        const Ae = pe === 'right' ? ye.left.x : 0
        const Ie = pe === 'left' ? ye.right.x : 0
        const re = W.top - F + Te > le
        const he = F - W.bottom - je > le
        const ve = W.left - D + Ae > le
        const ee = D - W.right - Ie > le
        return re || he || ve || ee
      })
    }
    function j (g, y, D) {
      const F = y + 'EventListener';
      ['transitionend', 'webkitTransitionEnd'].forEach(function (q) {
        g[F](q, D)
      })
    }
    const P = { isTouch: !1 }
    let M = 0
    function Q () {
      P.isTouch ||
                ((P.isTouch = !0),
                window.performance &&
                    document.addEventListener('mousemove', ze))
    }
    function ze () {
      const g = performance.now()
      g - M < 20 &&
                ((P.isTouch = !1),
                document.removeEventListener('mousemove', ze)),
      (M = g)
    }
    function Mt () {
      const g = document.activeElement
      if (Z(g)) {
        const y = g._tippy
        g.blur && !y.state.isVisible && g.blur()
      }
    }
    function Ut () {
      document.addEventListener('touchstart', Q, f),
      window.addEventListener('blur', Mt)
    }
    const Lr = typeof window < 'u' && typeof document < 'u'
    const Nr = Lr ? navigator.userAgent : ''
    const kr = /MSIE |Trident\//.test(Nr)
    function Vt (g) {
      const y = g === 'destroy' ? 'n already-' : ' '
      return [
        g +
                    '() was called on a' +
                    y +
                    'destroyed instance. This is a no-op but',
        'indicates a potential memory leak.'
      ].join(' ')
    }
    function nr (g) {
      const y = /[ \t]{2,}/g
      const D = /^[ \t]*/gm
      return g.replace(y, ' ').replace(D, '').trim()
    }
    function jr (g) {
      return nr(
                `
  %ctippy.js

  %c` +
                    nr(g) +
                    `

  %c\u{1F477}\u200D This is a development-only message. It will be removed in production.
  `
      )
    }
    function rr (g) {
      return [
        jr(g),
        'color: #00C584; font-size: 1.3em; font-weight: bold;',
        'line-height: 1.5',
        'color: #a6a095;'
      ]
    }
    let It
    Br()
    function Br () {
      It = new Set()
    }
    function mt (g, y) {
      if (g && !It.has(y)) {
        let D
        It.add(y), (D = console).warn.apply(D, rr(y))
      }
    }
    function zt (g, y) {
      if (g && !It.has(y)) {
        let D
        It.add(y), (D = console).error.apply(D, rr(y))
      }
    }
    function At (g) {
      const y = !g
      const D =
                Object.prototype.toString.call(g) === '[object Object]' &&
                !g.addEventListener
      zt(
        y,
        [
          'tippy() was passed',
          '`' + String(g) + '`',
          'as its targets (first) argument. Valid types are: String, Element,',
          'Element[], or NodeList.'
        ].join(' ')
      ),
      zt(
        D,
        [
          'tippy() was passed a plain object which is not supported as an argument',
          'for virtual positioning. Use props.getReferenceClientRect instead.'
        ].join(' ')
      )
    }
    const Dt = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1
    }
    const Hr = {
      allowHTML: !1,
      animation: 'fade',
      arrow: !0,
      content: '',
      inertia: !1,
      maxWidth: 350,
      role: 'tooltip',
      theme: '',
      zIndex: 9999
    }
    const Qe = Object.assign(
      {
        appendTo: function () {
          return document.body
        },
        aria: { content: 'auto', expanded: 'auto' },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: '',
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: 'top',
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: 'mouseenter focus',
        triggerTarget: null
      },
      Dt,
      {},
      Hr
    )
    const $r = Object.keys(Qe)
    const Wr = function (y) {
      gt(y, [])
      const D = Object.keys(y)
      D.forEach(function (F) {
        Qe[F] = y[F]
      })
    }
    function ot (g) {
      const y = g.plugins || []
      const D = y.reduce(function (F, q) {
        const W = q.name
        const B = q.defaultValue
        return W && (F[W] = g[W] !== void 0 ? g[W] : B), F
      }, {})
      return Object.assign({}, g, {}, D)
    }
    function Ur (g, y) {
      const D = y
        ? Object.keys(ot(Object.assign({}, Qe, { plugins: y })))
        : $r
      const F = D.reduce(function (q, W) {
        const B = (g.getAttribute('data-tippy-' + W) || '').trim()
        if (!B) return q
        if (W === 'content') q[W] = B
        else {
          try {
            q[W] = JSON.parse(B)
          } catch {
            q[W] = B
          }
        }
        return q
      }, {})
      return F
    }
    function ir (g, y) {
      const D = Object.assign(
        {},
        y,
        { content: E(y.content, [g]) },
        y.ignoreAttributes ? {} : Ur(g, y.plugins)
      )
      return (
        (D.aria = Object.assign({}, Qe.aria, {}, D.aria)),
        (D.aria = {
          expanded:
                        D.aria.expanded === 'auto'
                          ? y.interactive
                          : D.aria.expanded,
          content:
                        D.aria.content === 'auto'
                          ? y.interactive
                            ? null
                            : 'describedby'
                          : D.aria.content
        }),
        D
      )
    }
    function gt (g, y) {
      g === void 0 && (g = {}), y === void 0 && (y = [])
      const D = Object.keys(g)
      D.forEach(function (F) {
        const q = S(Qe, Object.keys(Dt))
        let W = !u(q, F)
        W &&
                    (W =
                        y.filter(function (B) {
                          return B.name === F
                        }).length === 0),
        mt(
          W,
          [
            '`' + F + '`',
            "is not a valid prop. You may have spelled it incorrectly, or if it's",
            'a plugin, forgot to pass it in an array as props.plugins.',
                            `

`,
                            `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`,
                            'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'
          ].join(' ')
        )
      })
    }
    const ln = function () {
      return 'innerHTML'
    }
    function Yt (g, y) {
      g[ln()] = y
    }
    function or (g) {
      const y = J()
      return (
        g === !0
          ? (y.className = a)
          : ((y.className = d), V(g) ? y.appendChild(g) : Yt(y, g)),
        y
      )
    }
    function kn (g, y) {
      V(y.content)
        ? (Yt(g, ''), g.appendChild(y.content))
        : typeof y.content !== 'function' &&
                  (y.allowHTML
                    ? Yt(g, y.content)
                    : (g.textContent = y.content))
    }
    function Xt (g) {
      const y = g.firstElementChild
      const D = Y(y.children)
      return {
        box: y,
        content: D.find(function (F) {
          return F.classList.contains(i)
        }),
        arrow: D.find(function (F) {
          return F.classList.contains(a) || F.classList.contains(d)
        }),
        backdrop: D.find(function (F) {
          return F.classList.contains(o)
        })
      }
    }
    function ar (g) {
      const y = J()
      const D = J();
      (D.className = n),
      D.setAttribute('data-state', 'hidden'),
      D.setAttribute('tabindex', '-1')
      const F = J();
      (F.className = i),
      F.setAttribute('data-state', 'hidden'),
      kn(F, g.props),
      y.appendChild(D),
      D.appendChild(F),
      q(g.props, g.props)
      function q (W, B) {
        const be = Xt(y)
        const le = be.box
        const pe = be.content
        const ye = be.arrow
        B.theme
          ? le.setAttribute('data-theme', B.theme)
          : le.removeAttribute('data-theme'),
        typeof B.animation === 'string'
          ? le.setAttribute('data-animation', B.animation)
          : le.removeAttribute('data-animation'),
        B.inertia
          ? le.setAttribute('data-inertia', '')
          : le.removeAttribute('data-inertia'),
        (le.style.maxWidth =
                        typeof B.maxWidth === 'number'
                          ? B.maxWidth + 'px'
                          : B.maxWidth),
        B.role
          ? le.setAttribute('role', B.role)
          : le.removeAttribute('role'),
        (W.content !== B.content || W.allowHTML !== B.allowHTML) &&
                        kn(pe, g.props),
        B.arrow
          ? ye
            ? W.arrow !== B.arrow &&
                              (le.removeChild(ye), le.appendChild(or(B.arrow)))
            : le.appendChild(or(B.arrow))
          : ye && le.removeChild(ye)
      }
      return { popper: y, onUpdate: q }
    }
    ar.$$tippy = !0
    let sr = 1
    let yn = []
    let wn = []
    function cn (g, y) {
      const D = ir(g, Object.assign({}, Qe, {}, ot(ne(y))))
      let F
      let q
      let W
      let B = !1
      let be = !1
      let le = !1
      let pe = !1
      let ye
      let Te
      let je
      let Ae = []
      let Ie = O(Me, D.interactiveDebounce)
      let re
      const he = sr++
      const ve = null
      const ee = A(D.plugins)
      const ie = {
        isEnabled: !0,
        isVisible: !1,
        isDestroyed: !1,
        isMounted: !1,
        isShown: !1
      }
      const x = {
        id: he,
        reference: g,
        popper: J(),
        popperInstance: ve,
        props: D,
        state: ie,
        plugins: ee,
        clearDelayTimeouts: Lt,
        setProps: dn,
        setContent: Zt,
        show: Nt,
        hide: $n,
        hideWithInteractivity: Qt,
        enable: wt,
        disable: et,
        unmount: Sn,
        destroy: Wn
      }
      if (!D.render) {
        return zt(!0, 'render() function has not been supplied.'), x
      }
      const Ge = D.render(x)
      const fe = Ge.popper
      const Ft = Ge.onUpdate
      fe.setAttribute('data-tippy-root', ''),
      (fe.id = 'tippy-' + x.id),
      (x.popper = fe),
      (g._tippy = x),
      (fe._tippy = x)
      const bt = ee.map(function (C) {
        return C.fn(x)
      })
      const Gt = g.hasAttribute('aria-expanded')
      return (
        Re(),
        T(),
        s(),
        b('onCreate', [x]),
        D.showOnCreate && $e(),
        fe.addEventListener('mouseenter', function () {
          x.props.interactive &&
                        x.state.isVisible &&
                        x.clearDelayTimeouts()
        }),
        fe.addEventListener('mouseleave', function (C) {
          x.props.interactive &&
                        x.props.trigger.indexOf('mouseenter') >= 0 &&
                        (yt().addEventListener('mousemove', Ie), Ie(C))
        }),
        x
      )
      function Kt () {
        const C = x.props.touch
        return Array.isArray(C) ? C : [C, 0]
      }
      function Jt () {
        return Kt()[0] === 'hold'
      }
      function rt () {
        let C
        return !!((C = x.props.render) != null && C.$$tippy)
      }
      function lt () {
        return re || g
      }
      function yt () {
        const C = lt().parentNode
        return C ? v(C) : document
      }
      function un () {
        return Xt(fe)
      }
      function c (C) {
        return (x.state.isMounted && !x.state.isVisible) ||
                    P.isTouch ||
                    (ye && ye.type === 'focus')
          ? 0
          : w(x.props.delay, C ? 0 : 1, Qe.delay)
      }
      function s () {
        (fe.style.pointerEvents =
                    x.props.interactive && x.state.isVisible ? '' : 'none'),
        (fe.style.zIndex = '' + x.props.zIndex)
      }
      function b (C, K, te) {
        if (
          (te === void 0 && (te = !0),
          bt.forEach(function (we) {
            we[C] && we[C].apply(void 0, K)
          }),
          te)
        ) {
          let ge;
          (ge = x.props)[C].apply(ge, K)
        }
      }
      function _ () {
        const C = x.props.aria
        if (C.content) {
          const K = 'aria-' + C.content
          const te = fe.id
          const ge = I(x.props.triggerTarget || g)
          ge.forEach(function (we) {
            const Ke = we.getAttribute(K)
            if (x.state.isVisible) {
              we.setAttribute(K, Ke ? Ke + ' ' + te : te)
            } else {
              const Je = Ke && Ke.replace(te, '').trim()
              Je ? we.setAttribute(K, Je) : we.removeAttribute(K)
            }
          })
        }
      }
      function T () {
        if (!(Gt || !x.props.aria.expanded)) {
          const C = I(x.props.triggerTarget || g)
          C.forEach(function (K) {
            x.props.interactive
              ? K.setAttribute(
                'aria-expanded',
                x.state.isVisible && K === lt()
                  ? 'true'
                  : 'false'
              )
              : K.removeAttribute('aria-expanded')
          })
        }
      }
      function L () {
        yt().removeEventListener('mousemove', Ie),
        (yn = yn.filter(function (C) {
          return C !== Ie
        }))
      }
      function U (C) {
        if (
          !(P.isTouch && (le || C.type === 'mousedown')) &&
                    !(x.props.interactive && fe.contains(C.target))
        ) {
          if (lt().contains(C.target)) {
            if (
              P.isTouch ||
                            (x.state.isVisible &&
                                x.props.trigger.indexOf('click') >= 0)
            ) {
              return
            }
          } else b('onClickOutside', [x, C])
          x.props.hideOnClick === !0 &&
                        (x.clearDelayTimeouts(),
                        x.hide(),
                        (be = !0),
                        setTimeout(function () {
                          be = !1
                        }),
                        x.state.isMounted || z())
        }
      }
      function H () {
        le = !0
      }
      function G () {
        le = !1
      }
      function oe () {
        const C = yt()
        C.addEventListener('mousedown', U, !0),
        C.addEventListener('touchend', U, f),
        C.addEventListener('touchstart', G, f),
        C.addEventListener('touchmove', H, f)
      }
      function z () {
        const C = yt()
        C.removeEventListener('mousedown', U, !0),
        C.removeEventListener('touchend', U, f),
        C.removeEventListener('touchstart', G, f),
        C.removeEventListener('touchmove', H, f)
      }
      function Ce (C, K) {
        De(C, function () {
          !x.state.isVisible &&
                        fe.parentNode &&
                        fe.parentNode.contains(fe) &&
                        K()
        })
      }
      function Le (C, K) {
        De(C, K)
      }
      function De (C, K) {
        const te = un().box
        function ge (we) {
          we.target === te && (j(te, 'remove', ge), K())
        }
        if (C === 0) return K()
        j(te, 'remove', Te), j(te, 'add', ge), (Te = ge)
      }
      function xe (C, K, te) {
        te === void 0 && (te = !1)
        const ge = I(x.props.triggerTarget || g)
        ge.forEach(function (we) {
          we.addEventListener(C, K, te),
          Ae.push({
            node: we,
            eventType: C,
            handler: K,
            options: te
          })
        })
      }
      function Re () {
        Jt() &&
                    (xe('touchstart', Be, { passive: !0 }),
                    xe('touchend', He, { passive: !0 })),
        R(x.props.trigger).forEach(function (C) {
          if (C !== 'manual') {
            switch ((xe(C, Be), C)) {
              case 'mouseenter':
                xe('mouseleave', He)
                break
              case 'focus':
                xe(kr ? 'focusout' : 'blur', ce)
                break
              case 'focusin':
                xe('focusout', ce)
                break
            }
          }
        })
      }
      function Se () {
        Ae.forEach(function (C) {
          const K = C.node
          const te = C.eventType
          const ge = C.handler
          const we = C.options
          K.removeEventListener(te, ge, we)
        }),
        (Ae = [])
      }
      function Be (C) {
        let K
        let te = !1
        if (!(!x.state.isEnabled || Pe(C) || be)) {
          const ge = ((K = ye) == null ? void 0 : K.type) === 'focus';
          (ye = C),
          (re = C.currentTarget),
          T(),
          !x.state.isVisible &&
                            X(C) &&
                            yn.forEach(function (we) {
                              return we(C)
                            }),
          C.type === 'click' &&
                        (x.props.trigger.indexOf('mouseenter') < 0 || B) &&
                        x.props.hideOnClick !== !1 &&
                        x.state.isVisible
            ? (te = !0)
            : $e(C),
          C.type === 'click' && (B = !te),
          te && !ge && Ue(C)
        }
      }
      function Me (C) {
        const K = C.target
        const te = lt().contains(K) || fe.contains(K)
        if (!(C.type === 'mousemove' && te)) {
          const ge = Ye()
            .concat(fe)
            .map(function (we) {
              let Ke
              const Je = we._tippy
              const Ct =
                                (Ke = Je.popperInstance) == null
                                  ? void 0
                                  : Ke.state
              return Ct
                ? {
                    popperRect: we.getBoundingClientRect(),
                    popperState: Ct,
                    props: D
                  }
                : null
            })
            .filter(Boolean)
          p(ge, C) && (L(), Ue(C))
        }
      }
      function He (C) {
        const K = Pe(C) || (x.props.trigger.indexOf('click') >= 0 && B)
        if (!K) {
          if (x.props.interactive) {
            x.hideWithInteractivity(C)
            return
          }
          Ue(C)
        }
      }
      function ce (C) {
        (x.props.trigger.indexOf('focusin') < 0 && C.target !== lt()) ||
                    (x.props.interactive &&
                        C.relatedTarget &&
                        fe.contains(C.relatedTarget)) ||
                    Ue(C)
      }
      function Pe (C) {
        return P.isTouch ? Jt() !== C.type.indexOf('touch') >= 0 : !1
      }
      function _e () {
        Ne()
        const C = x.props
        const K = C.popperOptions
        const te = C.placement
        const ge = C.offset
        const we = C.getReferenceClientRect
        const Ke = C.moveTransition
        const Je = rt() ? Xt(fe).arrow : null
        const Ct = we
          ? {
              getBoundingClientRect: we,
              contextElement: we.contextElement || lt()
            }
          : g
        const Un = {
          name: '$$tippy',
          enabled: !0,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: function (pn) {
            const en = pn.state
            if (rt()) {
              const Gr = un()
              const tn = Gr.box;
              [
                'placement',
                'reference-hidden',
                'escaped'
              ].forEach(function (hn) {
                hn === 'placement'
                  ? tn.setAttribute(
                    'data-placement',
                    en.placement
                  )
                  : en.attributes.popper['data-popper-' + hn]
                    ? tn.setAttribute('data-' + hn, '')
                    : tn.removeAttribute('data-' + hn)
              }),
              (en.attributes.popper = {})
            }
          }
        }
        const _t = [
          { name: 'offset', options: { offset: ge } },
          {
            name: 'preventOverflow',
            options: {
              padding: {
                top: 2,
                bottom: 2,
                left: 5,
                right: 5
              }
            }
          },
          { name: 'flip', options: { padding: 5 } },
          {
            name: 'computeStyles',
            options: { adaptive: !Ke }
          },
          Un
        ]
        rt() &&
                    Je &&
                    _t.push({
                      name: 'arrow',
                      options: { element: Je, padding: 3 }
                    }),
        _t.push.apply(_t, K?.modifiers || []),
        (x.popperInstance = t.createPopper(
          Ct,
          fe,
          Object.assign({}, K, {
            placement: te,
            onFirstUpdate: je,
            modifiers: _t
          })
        ))
      }
      function Ne () {
        x.popperInstance &&
                    (x.popperInstance.destroy(), (x.popperInstance = null))
      }
      function Fe () {
        const C = x.props.appendTo
        let K
        const te = lt();
        (x.props.interactive && C === Qe.appendTo) || C === 'parent'
          ? (K = te.parentNode)
          : (K = E(C, [te])),
        K.contains(fe) || K.appendChild(fe),
        _e(),
        mt(
          x.props.interactive &&
                            C === Qe.appendTo &&
                            te.nextElementSibling !== fe,
          [
            'Interactive tippy element may not be accessible via keyboard',
            'navigation because it is not directly after the reference element',
            'in the DOM source order.',
                            `

`,
                            'Using a wrapper <div> or <span> tag around the reference element',
                            'solves this by creating a new parentNode context.',
                            `

`,
                            'Specifying `appendTo: document.body` silences this warning, but it',
                            'assumes you are using a focus management solution to handle',
                            'keyboard navigation.',
                            `

`,
                            'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'
          ].join(' ')
        )
      }
      function Ye () {
        return Y(fe.querySelectorAll('[data-tippy-root]'))
      }
      function $e (C) {
        x.clearDelayTimeouts(), C && b('onTrigger', [x, C]), oe()
        let K = c(!0)
        const te = Kt()
        const ge = te[0]
        const we = te[1]
        P.isTouch && ge === 'hold' && we && (K = we),
        K
          ? (F = setTimeout(function () {
              x.show()
            }, K))
          : x.show()
      }
      function Ue (C) {
        if (
          (x.clearDelayTimeouts(),
          b('onUntrigger', [x, C]),
          !x.state.isVisible)
        ) {
          z()
          return
        }
        if (
          !(
            x.props.trigger.indexOf('mouseenter') >= 0 &&
                        x.props.trigger.indexOf('click') >= 0 &&
                        ['mouseleave', 'mousemove'].indexOf(C.type) >= 0 &&
                        B
          )
        ) {
          const K = c(!1)
          K
            ? (q = setTimeout(function () {
                x.state.isVisible && x.hide()
              }, K))
            : (W = requestAnimationFrame(function () {
                x.hide()
              }))
        }
      }
      function wt () {
        x.state.isEnabled = !0
      }
      function et () {
        x.hide(), (x.state.isEnabled = !1)
      }
      function Lt () {
        clearTimeout(F), clearTimeout(q), cancelAnimationFrame(W)
      }
      function dn (C) {
        if (
          (mt(x.state.isDestroyed, Vt('setProps')),
          !x.state.isDestroyed)
        ) {
          b('onBeforeUpdate', [x, C]), Se()
          const K = x.props
          const te = ir(
            g,
            Object.assign({}, x.props, {}, C, {
              ignoreAttributes: !0
            })
          );
          (x.props = te),
          Re(),
          K.interactiveDebounce !== te.interactiveDebounce &&
                            (L(), (Ie = O(Me, te.interactiveDebounce))),
          K.triggerTarget && !te.triggerTarget
            ? I(K.triggerTarget).forEach(function (ge) {
              ge.removeAttribute('aria-expanded')
            })
            : te.triggerTarget &&
                              g.removeAttribute('aria-expanded'),
          T(),
          s(),
          Ft && Ft(K, te),
          x.popperInstance &&
                            (_e(),
                            Ye().forEach(function (ge) {
                              requestAnimationFrame(
                                ge._tippy.popperInstance.forceUpdate
                              )
                            })),
          b('onAfterUpdate', [x, C])
        }
      }
      function Zt (C) {
        x.setProps({ content: C })
      }
      function Nt () {
        mt(x.state.isDestroyed, Vt('show'))
        const C = x.state.isVisible
        const K = x.state.isDestroyed
        const te = !x.state.isEnabled
        const ge = P.isTouch && !x.props.touch
        const we = w(x.props.duration, 0, Qe.duration)
        if (
          !(C || K || te || ge) &&
                    !lt().hasAttribute('disabled') &&
                    (b('onShow', [x], !1), x.props.onShow(x) !== !1)
        ) {
          if (
            ((x.state.isVisible = !0),
            rt() && (fe.style.visibility = 'visible'),
            s(),
            oe(),
            x.state.isMounted || (fe.style.transition = 'none'),
            rt())
          ) {
            const Ke = un()
            const Je = Ke.box
            const Ct = Ke.content
            l([Je, Ct], 0)
          }
          (je = function () {
            let _t
            if (!(!x.state.isVisible || pe)) {
              if (
                ((pe = !0),
                fe.offsetHeight,
                (fe.style.transition = x.props.moveTransition),
                rt() && x.props.animation)
              ) {
                const An = un()
                const pn = An.box
                const en = An.content
                l([pn, en], we), h([pn, en], 'visible')
              }
              _(),
              T(),
              $(wn, x),
              (_t = x.popperInstance) == null ||
                                    _t.forceUpdate(),
              (x.state.isMounted = !0),
              b('onMount', [x]),
              x.props.animation &&
                                    rt() &&
                                    Le(we, function () {
                                      (x.state.isShown = !0),
                                      b('onShown', [x])
                                    })
            }
          }),
          Fe()
        }
      }
      function $n () {
        mt(x.state.isDestroyed, Vt('hide'))
        const C = !x.state.isVisible
        const K = x.state.isDestroyed
        const te = !x.state.isEnabled
        const ge = w(x.props.duration, 1, Qe.duration)
        if (
          !(C || K || te) &&
                    (b('onHide', [x], !1), x.props.onHide(x) !== !1)
        ) {
          if (
            ((x.state.isVisible = !1),
            (x.state.isShown = !1),
            (pe = !1),
            (B = !1),
            rt() && (fe.style.visibility = 'hidden'),
            L(),
            z(),
            s(),
            rt())
          ) {
            const we = un()
            const Ke = we.box
            const Je = we.content
            x.props.animation &&
                            (l([Ke, Je], ge), h([Ke, Je], 'hidden'))
          }
          _(),
          T(),
          x.props.animation
            ? rt() && Ce(ge, x.unmount)
            : x.unmount()
        }
      }
      function Qt (C) {
        mt(x.state.isDestroyed, Vt('hideWithInteractivity')),
        yt().addEventListener('mousemove', Ie),
        $(yn, Ie),
        Ie(C)
      }
      function Sn () {
        mt(x.state.isDestroyed, Vt('unmount')),
        x.state.isVisible && x.hide(),
        x.state.isMounted &&
                        (Ne(),
                        Ye().forEach(function (C) {
                          C._tippy.unmount()
                        }),
                        fe.parentNode && fe.parentNode.removeChild(fe),
                        (wn = wn.filter(function (C) {
                          return C !== x
                        })),
                        (x.state.isMounted = !1),
                        b('onHidden', [x]))
      }
      function Wn () {
        mt(x.state.isDestroyed, Vt('destroy')),
        !x.state.isDestroyed &&
                        (x.clearDelayTimeouts(),
                        x.unmount(),
                        Se(),
                        delete g._tippy,
                        (x.state.isDestroyed = !0),
                        b('onDestroy', [x]))
      }
    }
    function dt (g, y) {
      y === void 0 && (y = {})
      const D = Qe.plugins.concat(y.plugins || [])
      At(g), gt(y, D), Ut()
      const F = Object.assign({}, y, { plugins: D })
      const q = me(g)
      const W = V(F.content)
      const B = q.length > 1
      mt(
        W && B,
        [
          'tippy() was passed an Element as the `content` prop, but more than',
          'one tippy instance was created by this invocation. This means the',
          'content element will only be appended to the last tippy instance.',
                    `

`,
                    'Instead, pass the .innerHTML of the element, or use a function that',
                    'returns a cloned version of the element instead.',
                    `

`,
                    `1) content: element.innerHTML
`,
                    '2) content: () => element.cloneNode(true)'
        ].join(' ')
      )
      const be = q.reduce(function (le, pe) {
        const ye = pe && cn(pe, F)
        return ye && le.push(ye), le
      }, [])
      return V(g) ? be[0] : be
    }
    (dt.defaultProps = Qe),
    (dt.setDefaultProps = Wr),
    (dt.currentInput = P)
    const lr = function (y) {
      const D = y === void 0 ? {} : y
      const F = D.exclude
      const q = D.duration
      wn.forEach(function (W) {
        let B = !1
        if (
          (F &&
                        (B = Z(F) ? W.reference === F : W.popper === F.popper),
          !B)
        ) {
          const be = W.props.duration
          W.setProps({ duration: q }),
          W.hide(),
          W.state.isDestroyed || W.setProps({ duration: be })
        }
      })
    }
    const cr = Object.assign({}, t.applyStyles, {
      effect: function (y) {
        const D = y.state
        const F = {
          popper: {
            position: D.options.strategy,
            left: '0',
            top: '0',
            margin: '0'
          },
          arrow: { position: 'absolute' },
          reference: {}
        }
        Object.assign(D.elements.popper.style, F.popper),
        (D.styles = F),
        D.elements.arrow &&
                        Object.assign(D.elements.arrow.style, F.arrow)
      }
    })
    const fr = function (y, D) {
      let F
      D === void 0 && (D = {}),
      zt(
        !Array.isArray(y),
        [
          'The first argument passed to createSingleton() must be an array of',
          'tippy instances. The passed value was',
          String(y)
        ].join(' ')
      )
      let q = y
      let W = []
      let B
      let be = D.overrides
      let le = []
      let pe = !1
      function ye () {
        W = q.map(function (ee) {
          return ee.reference
        })
      }
      function Te (ee) {
        q.forEach(function (ie) {
          ee ? ie.enable() : ie.disable()
        })
      }
      function je (ee) {
        return q.map(function (ie) {
          const x = ie.setProps
          return (
            (ie.setProps = function (Ge) {
              x(Ge), ie.reference === B && ee.setProps(Ge)
            }),
            function () {
              ie.setProps = x
            }
          )
        })
      }
      function Ae (ee, ie) {
        const x = W.indexOf(ie)
        if (ie !== B) {
          B = ie
          const Ge = (be || []).concat('content').reduce(function (
            fe,
            Ft
          ) {
            return (fe[Ft] = q[x].props[Ft]), fe
          }, {})
          ee.setProps(
            Object.assign({}, Ge, {
              getReferenceClientRect:
                                typeof Ge.getReferenceClientRect === 'function'
                                  ? Ge.getReferenceClientRect
                                  : function () {
                                    return ie.getBoundingClientRect()
                                  }
            })
          )
        }
      }
      Te(!1), ye()
      const Ie = {
        fn: function () {
          return {
            onDestroy: function () {
              Te(!0)
            },
            onHidden: function () {
              B = null
            },
            onClickOutside: function (x) {
              x.props.showOnCreate &&
                                !pe &&
                                ((pe = !0), (B = null))
            },
            onShow: function (x) {
              x.props.showOnCreate &&
                                !pe &&
                                ((pe = !0), Ae(x, W[0]))
            },
            onTrigger: function (x, Ge) {
              Ae(x, Ge.currentTarget)
            }
          }
        }
      }
      const re = dt(
        J(),
        Object.assign({}, S(D, ['overrides']), {
          plugins: [Ie].concat(D.plugins || []),
          triggerTarget: W,
          popperOptions: Object.assign({}, D.popperOptions, {
            modifiers: [].concat(
              ((F = D.popperOptions) == null
                ? void 0
                : F.modifiers) || [],
              [cr]
            )
          })
        })
      )
      const he = re.show;
      (re.show = function (ee) {
        if ((he(), !B && ee == null)) return Ae(re, W[0])
        if (!(B && ee == null)) {
          if (typeof ee === 'number') {
            return W[ee] && Ae(re, W[ee])
          }
          if (q.includes(ee)) {
            const ie = ee.reference
            return Ae(re, ie)
          }
          if (W.includes(ee)) return Ae(re, ee)
        }
      }),
      (re.showNext = function () {
        const ee = W[0]
        if (!B) return re.show(0)
        const ie = W.indexOf(B)
        re.show(W[ie + 1] || ee)
      }),
      (re.showPrevious = function () {
        const ee = W[W.length - 1]
        if (!B) return re.show(ee)
        const ie = W.indexOf(B)
        const x = W[ie - 1] || ee
        re.show(x)
      })
      const ve = re.setProps
      return (
        (re.setProps = function (ee) {
          (be = ee.overrides || be), ve(ee)
        }),
        (re.setInstances = function (ee) {
          Te(!0),
          le.forEach(function (ie) {
            return ie()
          }),
          (q = ee),
          Te(!1),
          ye(),
          je(re),
          re.setProps({ triggerTarget: W })
        }),
        (le = je(re)),
        re
      )
    }
    const ur = {
      mouseover: 'mouseenter',
      focusin: 'focus',
      click: 'click'
    }
    function qt (g, y) {
      zt(
        !(y && y.target),
        [
          'You must specity a `target` prop indicating a CSS selector string matching',
          'the target elements that should receive a tippy.'
        ].join(' ')
      )
      let D = []
      let F = []
      let q = !1
      const W = y.target
      const B = S(y, ['target'])
      const be = Object.assign({}, B, { trigger: 'manual', touch: !1 })
      const le = Object.assign({}, B, { showOnCreate: !0 })
      const pe = dt(g, be)
      const ye = I(pe)
      function Te (he) {
        if (!(!he.target || q)) {
          const ve = he.target.closest(W)
          if (ve) {
            const ee =
                            ve.getAttribute('data-tippy-trigger') ||
                            y.trigger ||
                            Qe.trigger
            if (
              !ve._tippy &&
                            !(
                              he.type === 'touchstart' &&
                                typeof le.touch === 'boolean'
                            ) &&
                            !(
                              he.type !== 'touchstart' &&
                                ee.indexOf(ur[he.type]) < 0
                            )
            ) {
              const ie = dt(ve, le)
              ie && (F = F.concat(ie))
            }
          }
        }
      }
      function je (he, ve, ee, ie) {
        ie === void 0 && (ie = !1),
        he.addEventListener(ve, ee, ie),
        D.push({
          node: he,
          eventType: ve,
          handler: ee,
          options: ie
        })
      }
      function Ae (he) {
        const ve = he.reference
        je(ve, 'touchstart', Te, f),
        je(ve, 'mouseover', Te),
        je(ve, 'focusin', Te),
        je(ve, 'click', Te)
      }
      function Ie () {
        D.forEach(function (he) {
          const ve = he.node
          const ee = he.eventType
          const ie = he.handler
          const x = he.options
          ve.removeEventListener(ee, ie, x)
        }),
        (D = [])
      }
      function re (he) {
        const ve = he.destroy
        const ee = he.enable
        const ie = he.disable;
        (he.destroy = function (x) {
          x === void 0 && (x = !0),
          x &&
                            F.forEach(function (Ge) {
                              Ge.destroy()
                            }),
          (F = []),
          Ie(),
          ve()
        }),
        (he.enable = function () {
          ee(),
          F.forEach(function (x) {
            return x.enable()
          }),
          (q = !1)
        }),
        (he.disable = function () {
          ie(),
          F.forEach(function (x) {
            return x.disable()
          }),
          (q = !0)
        }),
        Ae(he)
      }
      return ye.forEach(re), pe
    }
    const dr = {
      name: 'animateFill',
      defaultValue: !1,
      fn: function (y) {
        let D
        if (!((D = y.props.render) != null && D.$$tippy)) {
          return (
            zt(
              y.props.animateFill,
              'The `animateFill` plugin requires the default render function.'
            ),
            {}
          )
        }
        const F = Xt(y.popper)
        const q = F.box
        const W = F.content
        const B = y.props.animateFill ? Vr() : null
        return {
          onCreate: function () {
            B &&
                            (q.insertBefore(B, q.firstElementChild),
                            q.setAttribute('data-animatefill', ''),
                            (q.style.overflow = 'hidden'),
                            y.setProps({
                              arrow: !1,
                              animation: 'shift-away'
                            }))
          },
          onMount: function () {
            if (B) {
              const le = q.style.transitionDuration
              const pe = Number(le.replace('ms', ''));
              (W.style.transitionDelay =
                                Math.round(pe / 10) + 'ms'),
              (B.style.transitionDuration = le),
              h([B], 'visible')
            }
          },
          onShow: function () {
            B && (B.style.transitionDuration = '0ms')
          },
          onHide: function () {
            B && h([B], 'hidden')
          }
        }
      }
    }
    function Vr () {
      const g = J()
      return (g.className = o), h([g], 'hidden'), g
    }
    let xn = { clientX: 0, clientY: 0 }
    let fn = []
    function En (g) {
      const y = g.clientX
      const D = g.clientY
      xn = { clientX: y, clientY: D }
    }
    function On (g) {
      g.addEventListener('mousemove', En)
    }
    function zr (g) {
      g.removeEventListener('mousemove', En)
    }
    const jn = {
      name: 'followCursor',
      defaultValue: !1,
      fn: function (y) {
        const D = y.reference
        const F = v(y.props.triggerTarget || D)
        let q = !1
        let W = !1
        let B = !0
        let be = y.props
        function le () {
          return (
            y.props.followCursor === 'initial' && y.state.isVisible
          )
        }
        function pe () {
          F.addEventListener('mousemove', je)
        }
        function ye () {
          F.removeEventListener('mousemove', je)
        }
        function Te () {
          (q = !0),
          y.setProps({ getReferenceClientRect: null }),
          (q = !1)
        }
        function je (re) {
          const he = re.target ? D.contains(re.target) : !0
          const ve = y.props.followCursor
          const ee = re.clientX
          const ie = re.clientY
          const x = D.getBoundingClientRect()
          const Ge = ee - x.left
          const fe = ie - x.top;
          (he || !y.props.interactive) &&
                        y.setProps({
                          getReferenceClientRect: function () {
                            const bt = D.getBoundingClientRect()
                            let Gt = ee
                            let Kt = ie
                            ve === 'initial' &&
                                    ((Gt = bt.left + Ge), (Kt = bt.top + fe))
                            const Jt = ve === 'horizontal' ? bt.top : Kt
                            const rt = ve === 'vertical' ? bt.right : Gt
                            const lt = ve === 'horizontal' ? bt.bottom : Kt
                            const yt = ve === 'vertical' ? bt.left : Gt
                            return {
                              width: rt - yt,
                              height: lt - Jt,
                              top: Jt,
                              right: rt,
                              bottom: lt,
                              left: yt
                            }
                          }
                        })
        }
        function Ae () {
          y.props.followCursor &&
                        (fn.push({ instance: y, doc: F }), On(F))
        }
        function Ie () {
          (fn = fn.filter(function (re) {
            return re.instance !== y
          })),
          fn.filter(function (re) {
            return re.doc === F
          }).length === 0 && zr(F)
        }
        return {
          onCreate: Ae,
          onDestroy: Ie,
          onBeforeUpdate: function () {
            be = y.props
          },
          onAfterUpdate: function (he, ve) {
            const ee = ve.followCursor
            q ||
                            (ee !== void 0 &&
                                be.followCursor !== ee &&
                                (Ie(),
                                ee
                                  ? (Ae(),
                                    y.state.isMounted && !W && !le() && pe())
                                  : (ye(), Te())))
          },
          onMount: function () {
            y.props.followCursor &&
                            !W &&
                            (B && (je(xn), (B = !1)), le() || pe())
          },
          onTrigger: function (he, ve) {
            X(ve) &&
                            (xn = {
                              clientX: ve.clientX,
                              clientY: ve.clientY
                            }),
            (W = ve.type === 'focus')
          },
          onHidden: function () {
            y.props.followCursor && (Te(), ye(), (B = !0))
          }
        }
      }
    }
    function Yr (g, y) {
      let D
      return {
        popperOptions: Object.assign({}, g.popperOptions, {
          modifiers: [].concat(
            (
              ((D = g.popperOptions) == null
                ? void 0
                : D.modifiers) || []
            ).filter(function (F) {
              const q = F.name
              return q !== y.name
            }),
            [y]
          )
        })
      }
    }
    const Bn = {
      name: 'inlinePositioning',
      defaultValue: !1,
      fn: function (y) {
        const D = y.reference
        function F () {
          return !!y.props.inlinePositioning
        }
        let q
        let W = -1
        let B = !1
        const be = {
          name: 'tippyInlinePositioning',
          enabled: !0,
          phase: 'afterWrite',
          fn: function (je) {
            const Ae = je.state
            F() &&
                            (q !== Ae.placement &&
                                y.setProps({
                                  getReferenceClientRect: function () {
                                    return le(Ae.placement)
                                  }
                                }),
                            (q = Ae.placement))
          }
        }
        function le (Te) {
          return Xr(
            k(Te),
            D.getBoundingClientRect(),
            Y(D.getClientRects()),
            W
          )
        }
        function pe (Te) {
          (B = !0), y.setProps(Te), (B = !1)
        }
        function ye () {
          B || pe(Yr(y.props, be))
        }
        return {
          onCreate: ye,
          onAfterUpdate: ye,
          onTrigger: function (je, Ae) {
            if (X(Ae)) {
              const Ie = Y(y.reference.getClientRects())
              const re = Ie.find(function (he) {
                return (
                  he.left - 2 <= Ae.clientX &&
                                    he.right + 2 >= Ae.clientX &&
                                    he.top - 2 <= Ae.clientY &&
                                    he.bottom + 2 >= Ae.clientY
                )
              })
              W = Ie.indexOf(re)
            }
          },
          onUntrigger: function () {
            W = -1
          }
        }
      }
    }
    function Xr (g, y, D, F) {
      if (D.length < 2 || g === null) return y
      if (D.length === 2 && F >= 0 && D[0].left > D[1].right) {
        return D[F] || y
      }
      switch (g) {
        case 'top':
        case 'bottom': {
          const q = D[0]
          const W = D[D.length - 1]
          const B = g === 'top'
          const be = q.top
          const le = W.bottom
          const pe = B ? q.left : W.left
          const ye = B ? q.right : W.right
          const Te = ye - pe
          const je = le - be
          return {
            top: be,
            bottom: le,
            left: pe,
            right: ye,
            width: Te,
            height: je
          }
        }
        case 'left':
        case 'right': {
          const Ae = Math.min.apply(
            Math,
            D.map(function (fe) {
              return fe.left
            })
          )
          const Ie = Math.max.apply(
            Math,
            D.map(function (fe) {
              return fe.right
            })
          )
          const re = D.filter(function (fe) {
            return g === 'left' ? fe.left === Ae : fe.right === Ie
          })
          const he = re[0].top
          const ve = re[re.length - 1].bottom
          const ee = Ae
          const ie = Ie
          const x = ie - ee
          const Ge = ve - he
          return {
            top: he,
            bottom: ve,
            left: ee,
            right: ie,
            width: x,
            height: Ge
          }
        }
        default:
          return y
      }
    }
    const qr = {
      name: 'sticky',
      defaultValue: !1,
      fn: function (y) {
        const D = y.reference
        const F = y.popper
        function q () {
          return y.popperInstance
            ? y.popperInstance.state.elements.reference
            : D
        }
        function W (pe) {
          return y.props.sticky === !0 || y.props.sticky === pe
        }
        let B = null
        let be = null
        function le () {
          const pe = W('reference')
            ? q().getBoundingClientRect()
            : null
          const ye = W('popper') ? F.getBoundingClientRect() : null;
          ((pe && Hn(B, pe)) || (ye && Hn(be, ye))) &&
                        y.popperInstance &&
                        y.popperInstance.update(),
          (B = pe),
          (be = ye),
          y.state.isMounted && requestAnimationFrame(le)
        }
        return {
          onMount: function () {
            y.props.sticky && le()
          }
        }
      }
    }
    function Hn (g, y) {
      return g && y
        ? g.top !== y.top ||
                      g.right !== y.right ||
                      g.bottom !== y.bottom ||
                      g.left !== y.left
        : !0
    }
    dt.setDefaultProps({ render: ar }),
    (e.animateFill = dr),
    (e.createSingleton = fr),
    (e.default = dt),
    (e.delegate = qt),
    (e.followCursor = jn),
    (e.hideAll = lr),
    (e.inlinePositioning = Bn),
    (e.roundArrow = r),
    (e.sticky = qr)
  })
  const Si = Ho($o())
  const Ds = Ho($o())
  const Cs = (e) => {
    const t = { plugins: [] }
    const r = (i) => e[e.indexOf(i) + 1]
    if (
      (e.includes('animation') && (t.animation = r('animation')),
      e.includes('duration') && (t.duration = parseInt(r('duration'))),
      e.includes('delay'))
    ) {
      const i = r('delay')
      t.delay = i.includes('-')
        ? i.split('-').map((o) => parseInt(o))
        : parseInt(i)
    }
    if (e.includes('cursor')) {
      t.plugins.push(Ds.followCursor)
      const i = r('cursor');
      ['x', 'initial'].includes(i)
        ? (t.followCursor = i === 'x' ? 'horizontal' : 'initial')
        : (t.followCursor = !0)
    }
    e.includes('on') && (t.trigger = r('on')),
    e.includes('arrowless') && (t.arrow = !1),
    e.includes('html') && (t.allowHTML = !0),
    e.includes('interactive') && (t.interactive = !0),
    e.includes('border') &&
                t.interactive &&
                (t.interactiveBorder = parseInt(r('border'))),
    e.includes('debounce') &&
                t.interactive &&
                (t.interactiveDebounce = parseInt(r('debounce'))),
    e.includes('max-width') && (t.maxWidth = parseInt(r('max-width'))),
    e.includes('theme') && (t.theme = r('theme')),
    e.includes('placement') && (t.placement = r('placement'))
    const n = {}
    return (
      e.includes('no-flip') &&
                (n.modifiers || (n.modifiers = []),
                n.modifiers.push({ name: 'flip', enabled: !1 })),
      (t.popperOptions = n),
      t
    )
  }
  function Ai (e) {
    e.magic('tooltip', (t) => (r, n = {}) => {
      const i = n.timeout
      delete n.timeout
      const o = (0, Si.default)(t, {
        content: r,
        trigger: 'manual',
        ...n
      })
      o.show(),
      setTimeout(() => {
        o.hide(), setTimeout(() => o.destroy(), n.duration || 300)
      }, i || 2e3)
    }),
    e.directive(
      'tooltip',
      (
        t,
        { modifiers: r, expression: n },
        { evaluateLater: i, effect: o, cleanup: a }
      ) => {
        const d = r.length > 0 ? Cs(r) : {}
        t.__x_tippy || (t.__x_tippy = (0, Si.default)(t, d)),
        a(() => {
          t.__x_tippy &&
                                (t.__x_tippy.destroy(), delete t.__x_tippy)
        })
        const f = () => t.__x_tippy.enable()
        const u = () => t.__x_tippy.disable()
        const w = (m) => {
          m ? (f(), t.__x_tippy.setContent(m)) : u()
        }
        if (r.includes('raw')) w(n)
        else {
          const m = i(n)
          o(() => {
            m((E) => {
              typeof E === 'object'
                ? (t.__x_tippy.setProps(E), f())
                : w(E)
            })
          })
        }
      }
    )
  }
  Ai.defaultProps = (e) => (Si.default.setDefaultProps(e), Ai)
  const _s = Ai
  const Wo = _s
  const Vo = () => {
    document.querySelectorAll('[ax-load][x-ignore]').forEach((e) => {
      e.removeAttribute('x-ignore'),
      e.setAttribute('x-load', e.getAttribute('ax-load')),
      e.setAttribute('x-load-src', e.getAttribute('ax-load-src'))
    }),
    document.querySelectorAll('[ax-load]').forEach((e) => {
      e.setAttribute('x-load', e.getAttribute('ax-load')),
      e.setAttribute('x-load-src', e.getAttribute('ax-load-src'))
    })
  }
  Vo()
  const Ts = new MutationObserver(Vo)
  Ts.observe(document.body, { childList: !0, subtree: !0 })
  document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(oo),
    window.Alpine.plugin(ao),
    window.Alpine.plugin(fo),
    window.Alpine.plugin(jo),
    window.Alpine.plugin(Wo)
  })
  const Ps = function (e, t, r) {
    function n (w, m) {
      for (const E of w) {
        const O = i(E, m)
        if (O !== null) return O
      }
    }
    function i (w, m) {
      const E = w.match(/^[\{\[]([^\[\]\{\}]*)[\}\]](.*)/s)
      if (E === null || E.length !== 3) return null
      const O = E[1]
      const S = E[2]
      if (O.includes(',')) {
        const [R, I] = O.split(',', 2)
        if (I === '*' && m >= R) return S
        if (R === '*' && m <= I) return S
        if (m >= R && m <= I) return S
      }
      return O == m ? S : null
    }
    function o (w) {
      return w.toString().charAt(0).toUpperCase() + w.toString().slice(1)
    }
    function a (w, m) {
      if (m.length === 0) return w
      const E = {}
      for (const [O, S] of Object.entries(m)) {
        (E[':' + o(O ?? '')] = o(S ?? '')),
        (E[':' + O.toUpperCase()] = S.toString().toUpperCase()),
        (E[':' + O] = S)
      }
      return (
        Object.entries(E).forEach(([O, S]) => {
          w = w.replaceAll(O, S)
        }),
        w
      )
    }
    function d (w) {
      return w.map((m) => m.replace(/^[\{\[]([^\[\]\{\}]*)[\}\]]/, ''))
    }
    let f = e.split('|')
    const u = n(f, t)
    return u != null
      ? a(u.trim(), r)
      : ((f = d(f)), a(f.length > 1 && t > 1 ? f[1] : f[0], r))
  }
  window.jsMd5 = Uo.md5
  window.pluralize = Ps
})()
/*! Bundled license information:

js-md5/src/md5.js:
  (**
   * [js-md5]{@link https://github.com/emn178/js-md5}
   *
   * @namespace md5
   * @version 0.8.3
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2023
   * @license MIT
   *)

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.6
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
