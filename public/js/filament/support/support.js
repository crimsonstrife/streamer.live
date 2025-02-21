(() => {
  const Vo = Object.create
  const Pi = Object.defineProperty
  const Yo = Object.getOwnPropertyDescriptor
  const Xo = Object.getOwnPropertyNames
  const qo = Object.getPrototypeOf
  const Go = Object.prototype.hasOwnProperty
  const Jr = (t, e) => () => (
    e || t((e = { exports: {} }).exports, e), e.exports
  )
  const Ko = (t, e, r, n) => {
    if ((e && typeof e === 'object') || typeof e === 'function') {
      for (const i of Xo(e)) {
        !Go.call(t, i) &&
                    i !== r &&
                    Pi(t, i, {
                      get: () => e[i],
                      enumerable: !(n = Yo(e, i)) || n.enumerable
                    })
      }
    }
    return t
  }
  const Jo = (t, e, r) => (
    (r = t != null ? Vo(qo(t)) : {}),
    Ko(
      e || !t || !t.__esModule
        ? Pi(r, 'default', { value: t, enumerable: !0 })
        : r,
      t
    )
  )
  const po = Jr(() => {})
  const ho = Jr(() => {})
  const vo = Jr((js, yr) => {
    (function () {
      'use strict'
      const t = 'input is invalid type'
      const e = 'finalize already called'
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
      let M
      if (f) {
        const I = new ArrayBuffer(68);
        (M = new Uint8Array(I)), (S = new Uint32Array(I))
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
        if (h !== 'object' || l === null) throw new Error(t)
        if (f && l.constructor === ArrayBuffer) {
          return [new Uint8Array(l), !1]
        }
        if (!$(l) && !A(l)) throw new Error(t)
        return [l, !1]
      }
      const Y = function (l) {
        return function (h) {
          return new X(!0).update(h)[l]()
        }
      }
      const nt = function () {
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
        const h = po()
        const v = ho().Buffer
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
          if (P == null) throw new Error(t)
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
      const U = function (l) {
        return function (h, v) {
          return new Z(h, !0).update(v)[l]()
        }
      }
      const dt = function () {
        const l = U('hex');
        (l.create = function (p) {
          return new Z(p)
        }),
        (l.update = function (p, j) {
          return l.create(p).update(j)
        })
        for (let h = 0; h < E.length; ++h) {
          const v = E[h]
          l[v] = U(v)
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
          (this.buffer8 = M)
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
        if (this.finalized) throw new Error(e)
        const h = k(l)
        l = h[0]
        for (
          var v = h[1],
            p,
            j = 0,
            P,
            R = l.length,
            Q = this.blocks,
            Vt = this.buffer8;
          j < R;

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
              for (P = this.start; j < R && P < 64; ++j) {
                (p = l.charCodeAt(j)),
                p < 128
                  ? (Vt[P++] = p)
                  : p < 2048
                    ? ((Vt[P++] = 192 | (p >>> 6)),
                      (Vt[P++] = 128 | (p & 63)))
                    : p < 55296 || p >= 57344
                      ? ((Vt[P++] = 224 | (p >>> 12)),
                        (Vt[P++] =
                                                  128 | ((p >>> 6) & 63)),
                        (Vt[P++] = 128 | (p & 63)))
                      : ((p =
                                                  65536 +
                                                  (((p & 1023) << 10) |
                                                      (l.charCodeAt(++j) &
                                                          1023))),
                        (Vt[P++] = 240 | (p >>> 18)),
                        (Vt[P++] =
                                                  128 | ((p >>> 12) & 63)),
                        (Vt[P++] =
                                                  128 | ((p >>> 6) & 63)),
                        (Vt[P++] = 128 | (p & 63)))
              }
            } else {
              for (P = this.start; j < R && P < 64; ++j) {
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
            for (P = this.start; j < R && P < 64; ++j) {
              Vt[P++] = l[j]
            }
          } else {
            for (P = this.start; j < R && P < 64; ++j) {
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
        const R = this.blocks
        this.first
          ? ((l = R[0] - 680876937),
            (l = (((l << 7) | (l >>> 25)) - 271733879) << 0),
            (p =
                              (-1732584194 ^ (l & 2004318071)) +
                              R[1] -
                              117830708),
            (p = (((p << 12) | (p >>> 20)) + l) << 0),
            (v =
                              (-271733879 ^ (p & (l ^ -271733879))) +
                              R[2] -
                              1126478375),
            (v = (((v << 17) | (v >>> 15)) + p) << 0),
            (h = (l ^ (v & (p ^ l))) + R[3] - 1316259209),
            (h = (((h << 22) | (h >>> 10)) + v) << 0))
          : ((l = this.h0),
            (h = this.h1),
            (v = this.h2),
            (p = this.h3),
            (l += (p ^ (h & (v ^ p))) + R[0] - 680876936),
            (l = (((l << 7) | (l >>> 25)) + h) << 0),
            (p += (v ^ (l & (h ^ v))) + R[1] - 389564586),
            (p = (((p << 12) | (p >>> 20)) + l) << 0),
            (v += (h ^ (p & (l ^ h))) + R[2] + 606105819),
            (v = (((v << 17) | (v >>> 15)) + p) << 0),
            (h += (l ^ (v & (p ^ l))) + R[3] - 1044525330),
            (h = (((h << 22) | (h >>> 10)) + v) << 0)),
        (l += (p ^ (h & (v ^ p))) + R[4] - 176418897),
        (l = (((l << 7) | (l >>> 25)) + h) << 0),
        (p += (v ^ (l & (h ^ v))) + R[5] + 1200080426),
        (p = (((p << 12) | (p >>> 20)) + l) << 0),
        (v += (h ^ (p & (l ^ h))) + R[6] - 1473231341),
        (v = (((v << 17) | (v >>> 15)) + p) << 0),
        (h += (l ^ (v & (p ^ l))) + R[7] - 45705983),
        (h = (((h << 22) | (h >>> 10)) + v) << 0),
        (l += (p ^ (h & (v ^ p))) + R[8] + 1770035416),
        (l = (((l << 7) | (l >>> 25)) + h) << 0),
        (p += (v ^ (l & (h ^ v))) + R[9] - 1958414417),
        (p = (((p << 12) | (p >>> 20)) + l) << 0),
        (v += (h ^ (p & (l ^ h))) + R[10] - 42063),
        (v = (((v << 17) | (v >>> 15)) + p) << 0),
        (h += (l ^ (v & (p ^ l))) + R[11] - 1990404162),
        (h = (((h << 22) | (h >>> 10)) + v) << 0),
        (l += (p ^ (h & (v ^ p))) + R[12] + 1804603682),
        (l = (((l << 7) | (l >>> 25)) + h) << 0),
        (p += (v ^ (l & (h ^ v))) + R[13] - 40341101),
        (p = (((p << 12) | (p >>> 20)) + l) << 0),
        (v += (h ^ (p & (l ^ h))) + R[14] - 1502002290),
        (v = (((v << 17) | (v >>> 15)) + p) << 0),
        (h += (l ^ (v & (p ^ l))) + R[15] + 1236535329),
        (h = (((h << 22) | (h >>> 10)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + R[1] - 165796510),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + R[6] - 1069501632),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + R[11] + 643717713),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + R[0] - 373897302),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + R[5] - 701558691),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + R[10] + 38016083),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + R[15] - 660478335),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + R[4] - 405537848),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + R[9] + 568446438),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + R[14] - 1019803690),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + R[3] - 187363961),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + R[8] + 1163531501),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (l += (v ^ (p & (h ^ v))) + R[13] - 1444681467),
        (l = (((l << 5) | (l >>> 27)) + h) << 0),
        (p += (h ^ (v & (l ^ h))) + R[2] - 51403784),
        (p = (((p << 9) | (p >>> 23)) + l) << 0),
        (v += (l ^ (h & (p ^ l))) + R[7] + 1735328473),
        (v = (((v << 14) | (v >>> 18)) + p) << 0),
        (h += (p ^ (l & (v ^ p))) + R[12] - 1926607734),
        (h = (((h << 20) | (h >>> 12)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + R[5] - 378558),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + R[8] - 2022574463),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + R[11] + 1839030562),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + R[14] - 35309556),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + R[1] - 1530992060),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + R[4] + 1272893353),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + R[7] - 155497632),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + R[10] - 1094730640),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + R[13] + 681279174),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + R[0] - 358537222),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + R[3] - 722521979),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + R[6] + 76029189),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (j = h ^ v),
        (l += (j ^ p) + R[9] - 640364487),
        (l = (((l << 4) | (l >>> 28)) + h) << 0),
        (p += (j ^ l) + R[12] - 421815835),
        (p = (((p << 11) | (p >>> 21)) + l) << 0),
        (P = p ^ l),
        (v += (P ^ h) + R[15] + 530742520),
        (v = (((v << 16) | (v >>> 16)) + p) << 0),
        (h += (P ^ v) + R[2] - 995338651),
        (h = (((h << 23) | (h >>> 9)) + v) << 0),
        (l += (v ^ (h | ~p)) + R[0] - 198630844),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + R[7] + 1126891415),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + R[14] - 1416354905),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + R[5] - 57434055),
        (h = (((h << 21) | (h >>> 11)) + v) << 0),
        (l += (v ^ (h | ~p)) + R[12] + 1700485571),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + R[3] - 1894986606),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + R[10] - 1051523),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + R[1] - 2054922799),
        (h = (((h << 21) | (h >>> 11)) + v) << 0),
        (l += (v ^ (h | ~p)) + R[8] + 1873313359),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + R[15] - 30611744),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + R[6] - 1560198380),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + R[13] + 1309151649),
        (h = (((h << 21) | (h >>> 11)) + v) << 0),
        (l += (v ^ (h | ~p)) + R[4] - 145523070),
        (l = (((l << 6) | (l >>> 26)) + h) << 0),
        (p += (h ^ (l | ~v)) + R[11] - 1120210379),
        (p = (((p << 10) | (p >>> 22)) + l) << 0),
        (v += (l ^ (p | ~h)) + R[2] + 718787259),
        (v = (((v << 15) | (v >>> 17)) + p) << 0),
        (h += (p ^ (v | ~l)) + R[9] - 343485551),
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
          let R = 0
          let Q
          for (v = 0; v < P; ++v) {
            (Q = l.charCodeAt(v)),
            Q < 128
              ? (j[R++] = Q)
              : Q < 2048
                ? ((j[R++] = 192 | (Q >>> 6)),
                  (j[R++] = 128 | (Q & 63)))
                : Q < 55296 || Q >= 57344
                  ? ((j[R++] = 224 | (Q >>> 12)),
                    (j[R++] = 128 | ((Q >>> 6) & 63)),
                    (j[R++] = 128 | (Q & 63)))
                  : ((Q =
                                          65536 +
                                          (((Q & 1023) << 10) |
                                              (l.charCodeAt(++v) & 1023))),
                    (j[R++] = 240 | (Q >>> 18)),
                    (j[R++] = 128 | ((Q >>> 12) & 63)),
                    (j[R++] = 128 | ((Q >>> 6) & 63)),
                    (j[R++] = 128 | (Q & 63)))
          }
          l = j
        }
        l.length > 64 && (l = new X(!0).update(l).array())
        const Vt = []
        const Re = []
        for (v = 0; v < 64; ++v) {
          const ze = l[v] || 0;
          (Vt[v] = 92 ^ ze), (Re[v] = 54 ^ ze)
        }
        X.call(this, h),
        this.update(Re),
        (this.oKeyPad = Vt),
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
      const mt = nt();
      (mt.md5 = mt),
      (mt.md5.hmac = dt()),
      a
        ? (yr.exports = mt)
        : ((n.md5 = mt),
          d &&
                          define(function () {
                            return mt
                          }))
    })()
  })
  const $i = ['top', 'right', 'bottom', 'left']
  const Mi = ['start', 'end']
  const Ri = $i.reduce(
    (t, e) => t.concat(e, e + '-' + Mi[0], e + '-' + Mi[1]),
    []
  )
  const Ee = Math.min
  const ee = Math.max
  const hr = Math.round
  const pr = Math.floor
  const nn = (t) => ({ x: t, y: t })
  const Zo = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
  const Qo = { start: 'end', end: 'start' }
  function Zr (t, e, r) {
    return ee(t, Ee(e, r))
  }
  function je (t, e) {
    return typeof t === 'function' ? t(e) : t
  }
  function pe (t) {
    return t.split('-')[0]
  }
  function xe (t) {
    return t.split('-')[1]
  }
  function Wi (t) {
    return t === 'x' ? 'y' : 'x'
  }
  function Qr (t) {
    return t === 'y' ? 'height' : 'width'
  }
  function Pn (t) {
    return ['top', 'bottom'].includes(pe(t)) ? 'y' : 'x'
  }
  function ti (t) {
    return Wi(Pn(t))
  }
  function zi (t, e, r) {
    r === void 0 && (r = !1)
    const n = xe(t)
    const i = ti(t)
    const o = Qr(i)
    let a =
            i === 'x'
              ? n === (r ? 'end' : 'start')
                ? 'right'
                : 'left'
              : n === 'start'
                ? 'bottom'
                : 'top'
    return e.reference[o] > e.floating[o] && (a = mr(a)), [a, mr(a)]
  }
  function ta (t) {
    const e = mr(t)
    return [vr(t), e, vr(e)]
  }
  function vr (t) {
    return t.replace(/start|end/g, (e) => Qo[e])
  }
  function ea (t, e, r) {
    const n = ['left', 'right']
    const i = ['right', 'left']
    const o = ['top', 'bottom']
    const a = ['bottom', 'top']
    switch (t) {
      case 'top':
      case 'bottom':
        return r ? (e ? i : n) : e ? n : i
      case 'left':
      case 'right':
        return e ? o : a
      default:
        return []
    }
  }
  function na (t, e, r, n) {
    const i = xe(t)
    let o = ea(pe(t), r === 'start', n)
    return (
      i &&
                ((o = o.map((a) => a + '-' + i)),
                e && (o = o.concat(o.map(vr)))),
      o
    )
  }
  function mr (t) {
    return t.replace(/left|right|bottom|top/g, (e) => Zo[e])
  }
  function ra (t) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...t }
  }
  function ei (t) {
    return typeof t !== 'number'
      ? ra(t)
      : { top: t, right: t, bottom: t, left: t }
  }
  function Cn (t) {
    return {
      ...t,
      top: t.y,
      left: t.x,
      right: t.x + t.width,
      bottom: t.y + t.height
    }
  }
  function Ii (t, e, r) {
    const { reference: n, floating: i } = t
    const o = Pn(e)
    const a = ti(e)
    const d = Qr(a)
    const f = pe(e)
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
    switch (xe(e)) {
      case 'start':
        O[a] -= E * (r && u ? -1 : 1)
        break
      case 'end':
        O[a] += E * (r && u ? -1 : 1)
        break
    }
    return O
  }
  const ia = async (t, e, r) => {
    const {
      placement: n = 'bottom',
      strategy: i = 'absolute',
      middleware: o = [],
      platform: a
    } = r
    const d = o.filter(Boolean)
    const f = await (a.isRTL == null ? void 0 : a.isRTL(e))
    let u = await a.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    })
    let { x: w, y: m } = Ii(u, n, f)
    let E = n
    let O = {}
    let S = 0
    for (let M = 0; M < d.length; M++) {
      const { name: I, fn: $ } = d[M]
      const {
        x: A,
        y: k,
        data: Y,
        reset: nt
      } = await $({
        x: w,
        y: m,
        initialPlacement: n,
        placement: E,
        strategy: i,
        middlewareData: O,
        rects: u,
        platform: a,
        elements: { reference: t, floating: e }
      });
      (w = A ?? w),
      (m = k ?? m),
      (O = { ...O, [I]: { ...O[I], ...Y } }),
      nt &&
                    S <= 50 &&
                    (S++,
                    typeof nt === 'object' &&
                        (nt.placement && (E = nt.placement),
                        nt.rects &&
                            (u =
                                nt.rects === !0
                                  ? await a.getElementRects({
                                    reference: t,
                                    floating: e,
                                    strategy: i
                                  })
                                  : nt.rects),
                        ({ x: w, y: m } = Ii(u, E, f))),
                    (M = -1))
    }
    return { x: w, y: m, placement: E, strategy: i, middlewareData: O }
  }
  async function _n (t, e) {
    let r
    e === void 0 && (e = {})
    const {
      x: n,
      y: i,
      platform: o,
      rects: a,
      elements: d,
      strategy: f
    } = t
    const {
      boundary: u = 'clippingAncestors',
      rootBoundary: w = 'viewport',
      elementContext: m = 'floating',
      altBoundary: E = !1,
      padding: O = 0
    } = je(e, t)
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
    const nt = Cn(
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
      top: ($.top - nt.top + S.top) / Y.y,
      bottom: (nt.bottom - $.bottom + S.bottom) / Y.y,
      left: ($.left - nt.left + S.left) / Y.x,
      right: (nt.right - $.right + S.right) / Y.x
    }
  }
  const oa = (t) => ({
    name: 'arrow',
    options: t,
    async fn (e) {
      const {
        x: r,
        y: n,
        placement: i,
        rects: o,
        platform: a,
        elements: d,
        middlewareData: f
      } = e
      const { element: u, padding: w = 0 } = je(t, e) || {}
      if (u == null) return {}
      const m = ei(w)
      const E = { x: r, y: n }
      const O = ti(i)
      const S = Qr(O)
      const M = await a.getDimensions(u)
      const I = O === 'y'
      const $ = I ? 'top' : 'left'
      const A = I ? 'bottom' : 'right'
      const k = I ? 'clientHeight' : 'clientWidth'
      const Y = o.reference[S] + o.reference[O] - E[O] - o.floating[S]
      const nt = E[O] - o.reference[O]
      const J = await (a.getOffsetParent == null
        ? void 0
        : a.getOffsetParent(u))
      let U = J ? J[k] : 0;
      (!U || !(await (a.isElement == null ? void 0 : a.isElement(J)))) &&
                (U = d.floating[k] || o.floating[S])
      const dt = Y / 2 - nt / 2
      const X = U / 2 - M[S] / 2 - 1
      const Z = Ee(m[$], X)
      const mt = Ee(m[A], X)
      const l = Z
      const h = U - M[S] - mt
      const v = U / 2 - M[S] / 2 + dt
      const p = Zr(l, v, h)
      const j =
                !f.arrow &&
                xe(i) != null &&
                v !== p &&
                o.reference[S] / 2 - (v < l ? Z : mt) - M[S] / 2 < 0
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
  function aa (t, e, r) {
    return (
      t
        ? [
            ...r.filter((i) => xe(i) === t),
            ...r.filter((i) => xe(i) !== t)
          ]
        : r.filter((i) => pe(i) === i)
    ).filter((i) => (t ? xe(i) === t || (e ? vr(i) !== i : !1) : !0))
  }
  const sa = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'autoPlacement',
        options: t,
        async fn (e) {
          let r, n, i
          const {
            rects: o,
            middlewareData: a,
            placement: d,
            platform: f,
            elements: u
          } = e
          const {
            crossAxis: w = !1,
            alignment: m,
            allowedPlacements: E = Ri,
            autoAlignment: O = !0,
            ...S
          } = je(t, e)
          const M =
                        m !== void 0 || E === Ri ? aa(m || null, O, E) : E
          const I = await _n(e, S)
          const $ =
                        ((r = a.autoPlacement) == null ? void 0 : r.index) || 0
          const A = M[$]
          if (A == null) return {}
          const k = zi(
            A,
            o,
            await (f.isRTL == null ? void 0 : f.isRTL(u.floating))
          )
          if (d !== A) return { reset: { placement: M[0] } }
          const Y = [I[pe(A)], I[k[0]], I[k[1]]]
          const nt = [
            ...(((n = a.autoPlacement) == null
              ? void 0
              : n.overflows) || []),
            { placement: A, overflows: Y }
          ]
          const J = M[$ + 1]
          if (J) {
            return {
              data: { index: $ + 1, overflows: nt },
              reset: { placement: J }
            }
          }
          const U = nt
            .map((Z) => {
              const mt = xe(Z.placement)
              return [
                Z.placement,
                mt && w
                  ? Z.overflows
                    .slice(0, 2)
                    .reduce((l, h) => l + h, 0)
                  : Z.overflows[0],
                Z.overflows
              ]
            })
            .sort((Z, mt) => Z[1] - mt[1])
          const X =
                        ((i = U.filter((Z) =>
                          Z[2]
                            .slice(0, xe(Z[0]) ? 2 : 3)
                            .every((mt) => mt <= 0)
                        )[0]) == null
                          ? void 0
                          : i[0]) || U[0][0]
          return X !== d
            ? {
                data: { index: $ + 1, overflows: nt },
                reset: { placement: X }
              }
            : {}
        }
      }
    )
  }
  const la = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'flip',
        options: t,
        async fn (e) {
          let r, n
          const {
            placement: i,
            middlewareData: o,
            rects: a,
            initialPlacement: d,
            platform: f,
            elements: u
          } = e
          const {
            mainAxis: w = !0,
            crossAxis: m = !0,
            fallbackPlacements: E,
            fallbackStrategy: O = 'bestFit',
            fallbackAxisSideDirection: S = 'none',
            flipAlignment: M = !0,
            ...I
          } = je(t, e)
          if ((r = o.arrow) != null && r.alignmentOffset) {
            return {}
          }
          const $ = pe(i)
          const A = pe(d) === d
          const k = await (f.isRTL == null
            ? void 0
            : f.isRTL(u.floating))
          const Y = E || (A || !M ? [mr(d)] : ta(d))
          !E && S !== 'none' && Y.push(...na(d, M, S, k))
          const nt = [d, ...Y]
          const J = await _n(e, I)
          const U = []
          let dt =
                        ((n = o.flip) == null ? void 0 : n.overflows) || []
          if ((w && U.push(J[$]), m)) {
            const l = zi(i, a, k)
            U.push(J[l[0]], J[l[1]])
          }
          if (
            ((dt = [...dt, { placement: i, overflows: U }]),
            !U.every((l) => l <= 0))
          ) {
            let X, Z
            const l =
                            (((X = o.flip) == null ? void 0 : X.index) || 0) +
                            1
            const h = nt[l]
            if (h) {
              return {
                data: { index: l, overflows: dt },
                reset: { placement: h }
              }
            }
            let v =
                            (Z = dt
                              .filter((p) => p.overflows[0] <= 0)
                              .sort(
                                (p, j) => p.overflows[1] - j.overflows[1]
                              )[0]) == null
                              ? void 0
                              : Z.placement
            if (!v) {
              switch (O) {
                case 'bestFit': {
                  let mt
                  const p =
                                        (mt = dt
                                          .map((j) => [
                                            j.placement,
                                            j.overflows
                                              .filter((P) => P > 0)
                                              .reduce((P, R) => P + R, 0)
                                          ])
                                          .sort((j, P) => j[1] - P[1])[0]) ==
                                        null
                                          ? void 0
                                          : mt[0]
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
  function Fi (t, e) {
    return {
      top: t.top - e.height,
      right: t.right - e.width,
      bottom: t.bottom - e.height,
      left: t.left - e.width
    }
  }
  function Li (t) {
    return $i.some((e) => t[e] >= 0)
  }
  const ca = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'hide',
        options: t,
        async fn (e) {
          const { rects: r } = e
          const { strategy: n = 'referenceHidden', ...i } = je(t, e)
          switch (n) {
            case 'referenceHidden': {
              const o = await _n(e, {
                ...i,
                elementContext: 'reference'
              })
              const a = Fi(o, r.reference)
              return {
                data: {
                  referenceHiddenOffsets: a,
                  referenceHidden: Li(a)
                }
              }
            }
            case 'escaped': {
              const o = await _n(e, { ...i, altBoundary: !0 })
              const a = Fi(o, r.floating)
              return {
                data: { escapedOffsets: a, escaped: Li(a) }
              }
            }
            default:
              return {}
          }
        }
      }
    )
  }
  function Ui (t) {
    const e = Ee(...t.map((o) => o.left))
    const r = Ee(...t.map((o) => o.top))
    const n = ee(...t.map((o) => o.right))
    const i = ee(...t.map((o) => o.bottom))
    return { x: e, y: r, width: n - e, height: i - r }
  }
  function fa (t) {
    const e = t.slice().sort((i, o) => i.y - o.y)
    const r = []
    let n = null
    for (let i = 0; i < e.length; i++) {
      const o = e[i]
      !n || o.y - n.y > n.height / 2
        ? r.push([o])
        : r[r.length - 1].push(o),
      (n = o)
    }
    return r.map((i) => Cn(Ui(i)))
  }
  const ua = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'inline',
        options: t,
        async fn (e) {
          const {
            placement: r,
            elements: n,
            rects: i,
            platform: o,
            strategy: a
          } = e
          const { padding: d = 2, x: f, y: u } = je(t, e)
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
                const mt = m[m.length - 1]
                const l = pe(r) === 'top'
                const h = Z.top
                const v = mt.bottom
                const p = l ? Z.left : mt.left
                const j = l ? Z.right : mt.right
                const P = j - p
                const R = v - h
                return {
                  top: h,
                  bottom: v,
                  left: p,
                  right: j,
                  width: P,
                  height: R,
                  x: p,
                  y: h
                }
              }
              const I = pe(r) === 'left'
              const $ = ee(...m.map((Z) => Z.right))
              const A = Ee(...m.map((Z) => Z.left))
              const k = m.filter((Z) =>
                I ? Z.left === A : Z.right === $
              )
              const Y = k[0].top
              const nt = k[k.length - 1].bottom
              const J = A
              const U = $
              const dt = U - J
              const X = nt - Y
              return {
                top: Y,
                bottom: nt,
                left: J,
                right: U,
                width: dt,
                height: X,
                x: J,
                y: Y
              }
            }
            return E
          }
          const M = await o.getElementRects({
            reference: { getBoundingClientRect: S },
            floating: n.floating,
            strategy: a
          })
          return i.reference.x !== M.reference.x ||
                        i.reference.y !== M.reference.y ||
                        i.reference.width !== M.reference.width ||
                        i.reference.height !== M.reference.height
            ? { reset: { rects: M } }
            : {}
        }
      }
    )
  }
  async function da (t, e) {
    const { placement: r, platform: n, elements: i } = t
    const o = await (n.isRTL == null ? void 0 : n.isRTL(i.floating))
    const a = pe(r)
    const d = xe(r)
    const f = Pn(r) === 'y'
    const u = ['left', 'top'].includes(a) ? -1 : 1
    const w = o && f ? -1 : 1
    const m = je(e, t)
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
  const Vi = function (t) {
    return (
      t === void 0 && (t = 0),
      {
        name: 'offset',
        options: t,
        async fn (e) {
          let r, n
          const { x: i, y: o, placement: a, middlewareData: d } = e
          const f = await da(e, t)
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
  const pa = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'shift',
        options: t,
        async fn (e) {
          const { x: r, y: n, placement: i } = e
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
          } = je(t, e)
          const u = { x: r, y: n }
          const w = await _n(e, f)
          const m = Pn(pe(i))
          const E = Wi(m)
          let O = u[E]
          let S = u[m]
          if (o) {
            const I = E === 'y' ? 'top' : 'left'
            const $ = E === 'y' ? 'bottom' : 'right'
            const A = O + w[I]
            const k = O - w[$]
            O = Zr(A, O, k)
          }
          if (a) {
            const I = m === 'y' ? 'top' : 'left'
            const $ = m === 'y' ? 'bottom' : 'right'
            const A = S + w[I]
            const k = S - w[$]
            S = Zr(A, S, k)
          }
          const M = d.fn({ ...e, [E]: O, [m]: S })
          return { ...M, data: { x: M.x - r, y: M.y - n } }
        }
      }
    )
  }
  const ha = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'size',
        options: t,
        async fn (e) {
          const {
            placement: r,
            rects: n,
            platform: i,
            elements: o
          } = e
          const { apply: a = () => {}, ...d } = je(t, e)
          const f = await _n(e, d)
          const u = pe(r)
          const w = xe(r)
          const m = Pn(r) === 'y'
          const { width: E, height: O } = n.floating
          let S
          let M
          u === 'top' || u === 'bottom'
            ? ((S = u),
              (M =
                              w ===
                              ((await (i.isRTL == null
                                ? void 0
                                : i.isRTL(o.floating)))
                                ? 'start'
                                : 'end')
                                ? 'left'
                                : 'right'))
            : ((M = u), (S = w === 'end' ? 'top' : 'bottom'))
          const I = O - f[S]
          const $ = E - f[M]
          const A = !e.middlewareData.shift
          let k = I
          let Y = $
          if (m) {
            const J = E - f.left - f.right
            Y = w || A ? Ee($, J) : J
          } else {
            const J = O - f.top - f.bottom
            k = w || A ? Ee(I, J) : J
          }
          if (A && !w) {
            const J = ee(f.left, 0)
            const U = ee(f.right, 0)
            const dt = ee(f.top, 0)
            const X = ee(f.bottom, 0)
            m
              ? (Y =
                                  E -
                                  2 *
                                      (J !== 0 || U !== 0
                                        ? J + U
                                        : ee(f.left, f.right)))
              : (k =
                                  O -
                                  2 *
                                      (dt !== 0 || X !== 0
                                        ? dt + X
                                        : ee(f.top, f.bottom)))
          }
          await a({
            ...e,
            availableWidth: Y,
            availableHeight: k
          })
          const nt = await i.getDimensions(o.floating)
          return E !== nt.width || O !== nt.height
            ? { reset: { rects: !0 } }
            : {}
        }
      }
    )
  }
  function rn (t) {
    return Yi(t) ? (t.nodeName || '').toLowerCase() : '#document'
  }
  function ce (t) {
    let e
    return (
      (t == null || (e = t.ownerDocument) == null
        ? void 0
        : e.defaultView) || window
    )
  }
  function Be (t) {
    let e
    return (e =
            (Yi(t) ? t.ownerDocument : t.document) || window.document) == null
      ? void 0
      : e.documentElement
  }
  function Yi (t) {
    return t instanceof Node || t instanceof ce(t).Node
  }
  function ke (t) {
    return t instanceof Element || t instanceof ce(t).Element
  }
  function Te (t) {
    return t instanceof HTMLElement || t instanceof ce(t).HTMLElement
  }
  function Ni (t) {
    return typeof ShadowRoot > 'u'
      ? !1
      : t instanceof ShadowRoot || t instanceof ce(t).ShadowRoot
  }
  function Vn (t) {
    const { overflow: e, overflowX: r, overflowY: n, display: i } = he(t)
    return (
      /auto|scroll|overlay|hidden|clip/.test(e + n + r) &&
            !['inline', 'contents'].includes(i)
    )
  }
  function va (t) {
    return ['table', 'td', 'th'].includes(rn(t))
  }
  function ni (t) {
    const e = ri()
    const r = he(t)
    return (
      r.transform !== 'none' ||
            r.perspective !== 'none' ||
            (r.containerType ? r.containerType !== 'normal' : !1) ||
            (!e && (r.backdropFilter ? r.backdropFilter !== 'none' : !1)) ||
            (!e && (r.filter ? r.filter !== 'none' : !1)) ||
            ['transform', 'perspective', 'filter'].some((n) =>
              (r.willChange || '').includes(n)
            ) ||
            ['paint', 'layout', 'strict', 'content'].some((n) =>
              (r.contain || '').includes(n)
            )
    )
  }
  function ma (t) {
    let e = Tn(t)
    for (; Te(e) && !gr(e);) {
      if (ni(e)) return e
      e = Tn(e)
    }
    return null
  }
  function ri () {
    return typeof CSS > 'u' || !CSS.supports
      ? !1
      : CSS.supports('-webkit-backdrop-filter', 'none')
  }
  function gr (t) {
    return ['html', 'body', '#document'].includes(rn(t))
  }
  function he (t) {
    return ce(t).getComputedStyle(t)
  }
  function br (t) {
    return ke(t)
      ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
      : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
  }
  function Tn (t) {
    if (rn(t) === 'html') return t
    const e = t.assignedSlot || t.parentNode || (Ni(t) && t.host) || Be(t)
    return Ni(e) ? e.host : e
  }
  function Xi (t) {
    const e = Tn(t)
    return gr(e)
      ? t.ownerDocument
        ? t.ownerDocument.body
        : t.body
      : Te(e) && Vn(e)
        ? e
        : Xi(e)
  }
  function Un (t, e, r) {
    let n
    e === void 0 && (e = []), r === void 0 && (r = !0)
    const i = Xi(t)
    const o = i === ((n = t.ownerDocument) == null ? void 0 : n.body)
    const a = ce(i)
    return o
      ? e.concat(
        a,
        a.visualViewport || [],
        Vn(i) ? i : [],
        a.frameElement && r ? Un(a.frameElement) : []
      )
      : e.concat(i, Un(i, [], r))
  }
  function qi (t) {
    const e = he(t)
    let r = parseFloat(e.width) || 0
    let n = parseFloat(e.height) || 0
    const i = Te(t)
    const o = i ? t.offsetWidth : r
    const a = i ? t.offsetHeight : n
    const d = hr(r) !== o || hr(n) !== a
    return d && ((r = o), (n = a)), { width: r, height: n, $: d }
  }
  function ii (t) {
    return ke(t) ? t : t.contextElement
  }
  function Dn (t) {
    const e = ii(t)
    if (!Te(e)) return nn(1)
    const r = e.getBoundingClientRect()
    const { width: n, height: i, $: o } = qi(e)
    let a = (o ? hr(r.width) : r.width) / n
    let d = (o ? hr(r.height) : r.height) / i
    return (
      (!a || !Number.isFinite(a)) && (a = 1),
      (!d || !Number.isFinite(d)) && (d = 1),
      { x: a, y: d }
    )
  }
  const ga = nn(0)
  function Gi (t) {
    const e = ce(t)
    return !ri() || !e.visualViewport
      ? ga
      : { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop }
  }
  function ba (t, e, r) {
    return e === void 0 && (e = !1), !r || (e && r !== ce(t)) ? !1 : e
  }
  function vn (t, e, r, n) {
    e === void 0 && (e = !1), r === void 0 && (r = !1)
    const i = t.getBoundingClientRect()
    const o = ii(t)
    let a = nn(1)
    e && (n ? ke(n) && (a = Dn(n)) : (a = Dn(t)))
    const d = ba(o, r, n) ? Gi(o) : nn(0)
    let f = (i.left + d.x) / a.x
    let u = (i.top + d.y) / a.y
    let w = i.width / a.x
    let m = i.height / a.y
    if (o) {
      const E = ce(o)
      const O = n && ke(n) ? ce(n) : n
      let S = E
      let M = S.frameElement
      for (; M && n && O !== S;) {
        const I = Dn(M)
        const $ = M.getBoundingClientRect()
        const A = he(M)
        const k =
                    $.left + (M.clientLeft + parseFloat(A.paddingLeft)) * I.x
        const Y =
                    $.top + (M.clientTop + parseFloat(A.paddingTop)) * I.y;
        (f *= I.x),
        (u *= I.y),
        (w *= I.x),
        (m *= I.y),
        (f += k),
        (u += Y),
        (S = ce(M)),
        (M = S.frameElement)
      }
    }
    return Cn({ width: w, height: m, x: f, y: u })
  }
  const ya = [':popover-open', ':modal']
  function Ki (t) {
    return ya.some((e) => {
      try {
        return t.matches(e)
      } catch {
        return !1
      }
    })
  }
  function wa (t) {
    const { elements: e, rect: r, offsetParent: n, strategy: i } = t
    const o = i === 'fixed'
    const a = Be(n)
    const d = e ? Ki(e.floating) : !1
    if (n === a || (d && o)) return r
    let f = { scrollLeft: 0, scrollTop: 0 }
    let u = nn(1)
    const w = nn(0)
    const m = Te(n)
    if (
      (m || (!m && !o)) &&
            ((rn(n) !== 'body' || Vn(a)) && (f = br(n)), Te(n))
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
  function xa (t) {
    return Array.from(t.getClientRects())
  }
  function Ji (t) {
    return vn(Be(t)).left + br(t).scrollLeft
  }
  function Ea (t) {
    const e = Be(t)
    const r = br(t)
    const n = t.ownerDocument.body
    const i = ee(
      e.scrollWidth,
      e.clientWidth,
      n.scrollWidth,
      n.clientWidth
    )
    const o = ee(
      e.scrollHeight,
      e.clientHeight,
      n.scrollHeight,
      n.clientHeight
    )
    let a = -r.scrollLeft + Ji(t)
    const d = -r.scrollTop
    return (
      he(n).direction === 'rtl' &&
                (a += ee(e.clientWidth, n.clientWidth) - i),
      { width: i, height: o, x: a, y: d }
    )
  }
  function Oa (t, e) {
    const r = ce(t)
    const n = Be(t)
    const i = r.visualViewport
    let o = n.clientWidth
    let a = n.clientHeight
    let d = 0
    let f = 0
    if (i) {
      (o = i.width), (a = i.height)
      const u = ri();
      (!u || (u && e === 'fixed')) &&
                ((d = i.offsetLeft), (f = i.offsetTop))
    }
    return { width: o, height: a, x: d, y: f }
  }
  function Sa (t, e) {
    const r = vn(t, !0, e === 'fixed')
    const n = r.top + t.clientTop
    const i = r.left + t.clientLeft
    const o = Te(t) ? Dn(t) : nn(1)
    const a = t.clientWidth * o.x
    const d = t.clientHeight * o.y
    const f = i * o.x
    const u = n * o.y
    return { width: a, height: d, x: f, y: u }
  }
  function ki (t, e, r) {
    let n
    if (e === 'viewport') n = Oa(t, r)
    else if (e === 'document') n = Ea(Be(t))
    else if (ke(e)) n = Sa(e, r)
    else {
      const i = Gi(t)
      n = { ...e, x: e.x - i.x, y: e.y - i.y }
    }
    return Cn(n)
  }
  function Zi (t, e) {
    const r = Tn(t)
    return r === e || !ke(r) || gr(r)
      ? !1
      : he(r).position === 'fixed' || Zi(r, e)
  }
  function Aa (t, e) {
    const r = e.get(t)
    if (r) return r
    let n = Un(t, [], !1).filter((d) => ke(d) && rn(d) !== 'body')
    let i = null
    const o = he(t).position === 'fixed'
    let a = o ? Tn(t) : t
    for (; ke(a) && !gr(a);) {
      const d = he(a)
      const f = ni(a)
      !f && d.position === 'fixed' && (i = null),
      (
        o
          ? !f && !i
          : (!f &&
                              d.position === 'static' &&
                              !!i &&
                              ['absolute', 'fixed'].includes(i.position)) ||
                          (Vn(a) && !f && Zi(t, a))
      )
        ? (n = n.filter((w) => w !== a))
        : (i = d),
      (a = Tn(a))
    }
    return e.set(t, n), n
  }
  function Da (t) {
    const { element: e, boundary: r, rootBoundary: n, strategy: i } = t
    const a = [
      ...(r === 'clippingAncestors' ? Aa(e, this._c) : [].concat(r)),
      n
    ]
    const d = a[0]
    const f = a.reduce(
      (u, w) => {
        const m = ki(e, w, i)
        return (
          (u.top = ee(m.top, u.top)),
          (u.right = Ee(m.right, u.right)),
          (u.bottom = Ee(m.bottom, u.bottom)),
          (u.left = ee(m.left, u.left)),
          u
        )
      },
      ki(e, d, i)
    )
    return {
      width: f.right - f.left,
      height: f.bottom - f.top,
      x: f.left,
      y: f.top
    }
  }
  function Ca (t) {
    const { width: e, height: r } = qi(t)
    return { width: e, height: r }
  }
  function _a (t, e, r) {
    const n = Te(e)
    const i = Be(e)
    const o = r === 'fixed'
    const a = vn(t, !0, o, e)
    let d = { scrollLeft: 0, scrollTop: 0 }
    const f = nn(0)
    if (n || (!n && !o)) {
      if (((rn(e) !== 'body' || Vn(i)) && (d = br(e)), n)) {
        const m = vn(e, !0, o, e);
        (f.x = m.x + e.clientLeft), (f.y = m.y + e.clientTop)
      } else i && (f.x = Ji(i))
    }
    const u = a.left + d.scrollLeft - f.x
    const w = a.top + d.scrollTop - f.y
    return { x: u, y: w, width: a.width, height: a.height }
  }
  function ji (t, e) {
    return !Te(t) || he(t).position === 'fixed'
      ? null
      : e
        ? e(t)
        : t.offsetParent
  }
  function Qi (t, e) {
    const r = ce(t)
    if (!Te(t) || Ki(t)) return r
    let n = ji(t, e)
    for (; n && va(n) && he(n).position === 'static';) n = ji(n, e)
    return n &&
            (rn(n) === 'html' ||
                (rn(n) === 'body' && he(n).position === 'static' && !ni(n)))
      ? r
      : n || ma(t) || r
  }
  const Ta = async function (t) {
    const e = this.getOffsetParent || Qi
    const r = this.getDimensions
    return {
      reference: _a(t.reference, await e(t.floating), t.strategy),
      floating: { x: 0, y: 0, ...(await r(t.floating)) }
    }
  }
  function Pa (t) {
    return he(t).direction === 'rtl'
  }
  const Ma = {
    convertOffsetParentRelativeRectToViewportRelativeRect: wa,
    getDocumentElement: Be,
    getClippingRect: Da,
    getOffsetParent: Qi,
    getElementRects: Ta,
    getClientRects: xa,
    getDimensions: Ca,
    getScale: Dn,
    isElement: ke,
    isRTL: Pa
  }
  function Ra (t, e) {
    let r = null
    let n
    const i = Be(t)
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
      } = t.getBoundingClientRect()
      if ((d || e(), !m || !E)) return
      const O = pr(w)
      const S = pr(i.clientWidth - (u + m))
      const M = pr(i.clientHeight - (w + E))
      const I = pr(u)
      const A = {
        rootMargin: -O + 'px ' + -S + 'px ' + -M + 'px ' + -I + 'px',
        threshold: ee(0, Ee(1, f)) || 1
      }
      let k = !0
      function Y (nt) {
        const J = nt[0].intersectionRatio
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
      r.observe(t)
    }
    return a(!0), o
  }
  function Bi (t, e, r, n) {
    n === void 0 && (n = {})
    const {
      ancestorScroll: i = !0,
      ancestorResize: o = !0,
      elementResize: a = typeof ResizeObserver === 'function',
      layoutShift: d = typeof IntersectionObserver === 'function',
      animationFrame: f = !1
    } = n
    const u = ii(t)
    const w = i || o ? [...(u ? Un(u) : []), ...Un(e)] : []
    w.forEach(($) => {
      i && $.addEventListener('scroll', r, { passive: !0 }),
      o && $.addEventListener('resize', r)
    })
    const m = u && d ? Ra(u, r) : null
    let E = -1
    let O = null
    a &&
            ((O = new ResizeObserver(($) => {
              const [A] = $
              A &&
                    A.target === u &&
                    O &&
                    (O.unobserve(e),
                    cancelAnimationFrame(E),
                    (E = requestAnimationFrame(() => {
                      let k;
                      (k = O) == null || k.observe(e)
                    }))),
              r()
            })),
            u && !f && O.observe(u),
            O.observe(e))
    let S
    let M = f ? vn(t) : null
    f && I()
    function I () {
      const $ = vn(t)
      M &&
                ($.x !== M.x ||
                    $.y !== M.y ||
                    $.width !== M.width ||
                    $.height !== M.height) &&
                r(),
      (M = $),
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
  const oi = sa
  const to = pa
  const eo = la
  const no = ha
  const ro = ca
  const io = oa
  const oo = ua
  const Hi = (t, e, r) => {
    const n = new Map()
    const i = { platform: Ma, ...r }
    const o = { ...i.platform, _c: n }
    return ia(t, e, { ...i, platform: o })
  }
  const Ia = (t) => {
    const e = {
      placement: 'bottom',
      strategy: 'absolute',
      middleware: []
    }
    const r = Object.keys(t)
    const n = (i) => t[i]
    return (
      r.includes('offset') && e.middleware.push(Vi(n('offset'))),
      r.includes('teleport') && (e.strategy = 'fixed'),
      r.includes('placement') && (e.placement = n('placement')),
      r.includes('autoPlacement') &&
                !r.includes('flip') &&
                e.middleware.push(oi(n('autoPlacement'))),
      r.includes('flip') && e.middleware.push(eo(n('flip'))),
      r.includes('shift') && e.middleware.push(to(n('shift'))),
      r.includes('inline') && e.middleware.push(oo(n('inline'))),
      r.includes('arrow') && e.middleware.push(io(n('arrow'))),
      r.includes('hide') && e.middleware.push(ro(n('hide'))),
      r.includes('size') && e.middleware.push(no(n('size'))),
      e
    )
  }
  const Fa = (t, e) => {
    const r = {
      component: { trap: !1 },
      float: {
        placement: 'bottom',
        strategy: 'absolute',
        middleware: []
      }
    }
    const n = (i) => t[t.indexOf(i) + 1]
    if (
      (t.includes('trap') && (r.component.trap = !0),
      t.includes('teleport') && (r.float.strategy = 'fixed'),
      t.includes('offset') && r.float.middleware.push(Vi(e.offset || 10)),
      t.includes('placement') && (r.float.placement = n('placement')),
      t.includes('autoPlacement') &&
                !t.includes('flip') &&
                r.float.middleware.push(oi(e.autoPlacement)),
      t.includes('flip') && r.float.middleware.push(eo(e.flip)),
      t.includes('shift') && r.float.middleware.push(to(e.shift)),
      t.includes('inline') && r.float.middleware.push(oo(e.inline)),
      t.includes('arrow') && r.float.middleware.push(io(e.arrow)),
      t.includes('hide') && r.float.middleware.push(ro(e.hide)),
      t.includes('size'))
    ) {
      const i = e.size?.availableWidth ?? null
      const o = e.size?.availableHeight ?? null
      i && delete e.size.availableWidth,
      o && delete e.size.availableHeight,
      r.float.middleware.push(
        no({
          ...e.size,
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
  const La = (t) => {
    const e =
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split(
              ''
            )
    let r = ''
    t || (t = Math.floor(Math.random() * e.length))
    for (let n = 0; n < t; n++) {
      r += e[Math.floor(Math.random() * e.length)]
    }
    return r
  }
  function Na (t, e = () => {}) {
    let r = !1
    return function () {
      r ? e.apply(this, arguments) : ((r = !0), t.apply(this, arguments))
    }
  }
  function ka (t) {
    const e = { dismissable: !0, trap: !1 }
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
    t.magic('float', (n) => (i = {}, o = {}) => {
      const a = { ...e, ...o }
      const d =
                Object.keys(i).length > 0 ? Ia(i) : { middleware: [oi()] }
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
        Bi(n, w, M)
      }
      function O () {
        (w.style.display = 'block'),
        f.setAttribute('aria-expanded', 'true'),
        a.trap && w.setAttribute('x-trap', 'true'),
        M()
      }
      function S () {
        m() ? E() : O()
      }
      async function M () {
        return await Hi(n, w, d).then(
          ({ middlewareData: I, placement: $, x: A, y: k }) => {
            if (I.arrow) {
              const Y = I.arrow?.x
              const nt = I.arrow?.y
              const J = d.middleware.filter(
                (dt) => dt.name == 'arrow'
              )[0].options.element
              const U = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
              }[$.split('-')[0]]
              Object.assign(J.style, {
                left: Y != null ? `${Y}px` : '',
                top: nt != null ? `${nt}px` : '',
                right: '',
                bottom: '',
                [U]: '-4px'
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
    t.directive(
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
        const m = (U) =>
          n.parentElement &&
                        !n.parentElement.closest('[x-data]').contains(U.target)
            ? n.close()
            : null
        const E = (U) => (U.key === 'Escape' ? n.close() : null)
        const O = n.getAttribute('x-ref')
        const S = n.parentElement.closest('[x-data]')
        const M = S.querySelectorAll(`[\\@click^="$refs.${O}"]`)
        const I = S.querySelectorAll(
                        `[x-on\\:click^="$refs.${O}"]`
        )
        n.style.setProperty('display', 'none'),
        r([...M, ...I][0], n),
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
          (U) => (U ? A() : $()),
          (U) => {
            typeof n._x_toggleAndCascadeWithTransitions ===
                            'function'
              ? n._x_toggleAndCascadeWithTransitions(
                n,
                U,
                A,
                $
              )
              : U
                ? k()
                : $()
          }
        )
        let nt
        let J = !0
        d(() =>
          a((U) => {
            (!J && U === nt) ||
                                (i.includes('immediate') && (U ? k() : $()),
                                Y(U),
                                (nt = U),
                                (J = !1))
          })
        ),
        (n.open = async function (U) {
          (n.trigger = U.currentTarget ? U.currentTarget : U),
          Y(!0),
          n.trigger.setAttribute('aria-expanded', 'true'),
          u.component.trap &&
                                    n.setAttribute('x-trap', 'true'),
          (w = Bi(n.trigger, n, () => {
            Hi(n.trigger, n, u.float).then(
              ({
                middlewareData: dt,
                placement: X,
                x: Z,
                y: mt
              }) => {
                if (dt.arrow) {
                  const l = dt.arrow?.x
                  const h = dt.arrow?.y
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
                if (dt.hide) {
                  const { referenceHidden: l } =
                                                    dt.hide
                  Object.assign(n.style, {
                    visibility: l
                      ? 'hidden'
                      : 'visible'
                  })
                }
                Object.assign(n.style, {
                  left: `${Z}px`,
                  top: `${mt}px`
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
        (n.toggle = function (U) {
          n._x_isShown ? n.close() : n.open(U)
        })
      }
    )
  }
  const ao = ka
  function ja (t) {
    t.store('lazyLoadedAssets', {
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
    const e = (a) =>
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
                t.store('lazyLoadedAssets').check(d)
      ) {
        return Promise.resolve()
      }
      const E = a === 'link' ? { ...f, href: d } : { ...f, src: d }
      const O = r(a, E, u, w)
      return new Promise((S, M) => {
        (O.onload = () => {
          t.store('lazyLoadedAssets').markLoaded(d), S()
        }),
        (O.onerror = () => {
          M(new Error(`Failed to load ${a}: ${d}`))
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
    t.directive('load-css', (a, { expression: d }, { evaluate: f }) => {
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
          m && window.dispatchEvent(e(`${m}-css`))
        })
        .catch(console.error)
    }),
    t.directive(
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
        const M = a.getAttribute('data-dispatch')
        Promise.all(w.map((I) => o(I, m, E, O, S)))
          .then(() => {
            M && window.dispatchEvent(e(`${M}-js`))
          })
          .catch(console.error)
      }
    )
  }
  const so = ja
  function Ba () {
    return !0
  }
  function Ha ({ component: t, argument: e }) {
    return new Promise((r) => {
      if (e) window.addEventListener(e, () => r(), { once: !0 })
      else {
        const n = (i) => {
          i.detail.id === t.id &&
                        (window.removeEventListener('async-alpine:load', n),
                        r())
        }
        window.addEventListener('async-alpine:load', n)
      }
    })
  }
  function $a () {
    return new Promise((t) => {
      'requestIdleCallback' in window
        ? window.requestIdleCallback(t)
        : setTimeout(t, 200)
    })
  }
  function Wa ({ argument: t }) {
    return new Promise((e) => {
      if (!t) {
        return (
          console.log(
            "Async Alpine: media strategy requires a media query. Treating as 'eager'"
          ),
          e()
        )
      }
      const r = window.matchMedia(`(${t})`)
      r.matches ? e() : r.addEventListener('change', e, { once: !0 })
    })
  }
  function za ({ component: t, argument: e }) {
    return new Promise((r) => {
      const n = e || '0px 0px 0px 0px'
      const i = new IntersectionObserver(
        (o) => {
          o[0].isIntersecting && (i.disconnect(), r())
        },
        { rootMargin: n }
      )
      i.observe(t.el)
    })
  }
  const lo = { eager: Ba, event: Ha, idle: $a, media: Wa, visible: za }
  async function Ua (t) {
    const e = Va(t.strategy)
    await ai(t, e)
  }
  async function ai (t, e) {
    if (e.type === 'expression') {
      if (e.operator === '&&') {
        return Promise.all(e.parameters.map((r) => ai(t, r)))
      }
      if (e.operator === '||') {
        return Promise.any(e.parameters.map((r) => ai(t, r)))
      }
    }
    return lo[e.method]
      ? lo[e.method]({ component: t, argument: e.argument })
      : !1
  }
  function Va (t) {
    const e = Ya(t)
    const r = fo(e)
    return r.type === 'method'
      ? { type: 'expression', operator: '&&', parameters: [r] }
      : r
  }
  function Ya (t) {
    const e =
            /\s*([()])\s*|\s*(\|\||&&|\|)\s*|\s*((?:[^()&|]+\([^()]+\))|[^()&|]+)\s*/g
    const r = []
    let n
    for (; (n = e.exec(t)) !== null;) {
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
  function fo (t) {
    let e = co(t)
    for (
      ;
      t.length > 0 &&
            (t[0].value === '&&' || t[0].value === '|' || t[0].value === '||');

    ) {
      const r = t.shift().value
      const n = co(t)
      e.type === 'expression' && e.operator === r
        ? e.parameters.push(n)
        : (e = { type: 'expression', operator: r, parameters: [e, n] })
    }
    return e
  }
  function co (t) {
    if (t[0].value === '(') {
      t.shift()
      const e = fo(t)
      return t[0].value === ')' && t.shift(), e
    } else return t.shift()
  }
  function uo (t) {
    const e = 'load'
    const r = t.prefixed('load-src')
    const n = t.prefixed('ignore')
    let i = { defaultStrategy: 'eager', keepRelativeURLs: !1 }
    let o = !1
    const a = {}
    let d = 0
    function f () {
      return d++
    }
    (t.asyncOptions = (A) => {
      i = { ...i, ...A }
    }),
    (t.asyncData = (A, k = !1) => {
      a[A] = { loaded: !1, download: k }
    }),
    (t.asyncUrl = (A, k) => {
      !A ||
                    !k ||
                    a[A] ||
                    (a[A] = { loaded: !1, download: () => import($(k)) })
    }),
    (t.asyncAlias = (A) => {
      o = A
    })
    const u = (A) => {
      t.skipDuringClone(() => {
        A._x_async ||
                    ((A._x_async = 'init'),
                    (A._x_ignore = !0),
                    A.setAttribute(n, ''))
      })()
    }
    const w = async (A) => {
      t.skipDuringClone(async () => {
        if (A._x_async !== 'init') return
        A._x_async = 'await'
        const { name: k, strategy: Y } = m(A)
        await Ua({ name: k, strategy: Y, el: A, id: A.id || f() }),
        A.isConnected &&
                        (await E(k),
                        A.isConnected && (S(A), (A._x_async = 'loaded')))
      })()
    };
    (w.inline = u), t.directive(e, w).before('ignore')
    function m (A) {
      const k = I(A.getAttribute(t.prefixed('data')))
      const Y = A.getAttribute(t.prefixed(e)) || i.defaultStrategy
      const nt = A.getAttribute(r)
      return nt && t.asyncUrl(k, nt), { name: k, strategy: Y }
    }
    async function E (A) {
      if (A.startsWith('_x_async_') || (M(A), !a[A] || a[A].loaded)) {
        return
      }
      const k = await O(A)
      t.data(A, k), (a[A].loaded = !0)
    }
    async function O (A) {
      if (!a[A]) return
      const k = await a[A].download(A)
      return typeof k === 'function'
        ? k
        : k[A] || k.default || Object.values(k)[0] || !1
    }
    function S (A) {
      t.destroyTree(A),
      (A._x_ignore = !1),
      A.removeAttribute(n),
      !A.closest(`[${n}]`) && t.initTree(A)
    }
    function M (A) {
      if (!(!o || a[A])) {
        if (typeof o === 'function') {
          t.asyncData(A, o)
          return
        }
        t.asyncUrl(A, o.replaceAll('[name]', A))
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
  const Uo = Jo(vo(), 1)
  function mo (t, e) {
    const r = Object.keys(t)
    if (Object.getOwnPropertySymbols) {
      let n = Object.getOwnPropertySymbols(t)
      e &&
                (n = n.filter(function (i) {
                  return Object.getOwnPropertyDescriptor(t, i).enumerable
                })),
      r.push.apply(r, n)
    }
    return r
  }
  function Me (t) {
    for (let e = 1; e < arguments.length; e++) {
      var r = arguments[e] != null ? arguments[e] : {}
      e % 2
        ? mo(Object(r), !0).forEach(function (n) {
          Xa(t, n, r[n])
        })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(
            t,
            Object.getOwnPropertyDescriptors(r)
          )
          : mo(Object(r)).forEach(function (n) {
            Object.defineProperty(
              t,
              n,
              Object.getOwnPropertyDescriptor(r, n)
            )
          })
    }
    return t
  }
  function Sr (t) {
    '@babel/helpers - typeof'
    return (
      typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
        ? (Sr = function (e) {
            return typeof e
          })
        : (Sr = function (e) {
            return e &&
                          typeof Symbol === 'function' &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
              ? 'symbol'
              : typeof e
          }),
      Sr(t)
    )
  }
  function Xa (t, e, r) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
        : (t[e] = r),
      t
    )
  }
  function $e () {
    return (
      ($e =
                Object.assign ||
                function (t) {
                  for (let e = 1; e < arguments.length; e++) {
                    const r = arguments[e]
                    for (const n in r) {
                      Object.prototype.hasOwnProperty.call(r, n) &&
                                (t[n] = r[n])
                    }
                  }
                  return t
                }),
      $e.apply(this, arguments)
    )
  }
  function qa (t, e) {
    if (t == null) return {}
    const r = {}
    const n = Object.keys(t)
    let i
    let o
    for (o = 0; o < n.length; o++) {
      (i = n[o]), !(e.indexOf(i) >= 0) && (r[i] = t[i])
    }
    return r
  }
  function Ga (t, e) {
    if (t == null) return {}
    const r = qa(t, e)
    let n
    let i
    if (Object.getOwnPropertySymbols) {
      const o = Object.getOwnPropertySymbols(t)
      for (i = 0; i < o.length; i++) {
        (n = o[i]),
        !(e.indexOf(n) >= 0) &&
                        Object.prototype.propertyIsEnumerable.call(t, n) &&
                        (r[n] = t[n])
      }
    }
    return r
  }
  const Ka = '1.15.6'
  function He (t) {
    if (typeof window < 'u' && window.navigator) {
      return !!navigator.userAgent.match(t)
    }
  }
  const We = He(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i)
  const tr = He(/Edge/i)
  const go = He(/firefox/i)
  const Gn = He(/safari/i) && !He(/chrome/i) && !He(/android/i)
  const wi = He(/iP(ad|od|hone)/i)
  const Ao = He(/chrome/i) && He(/android/i)
  const Do = { capture: !1, passive: !1 }
  function Ot (t, e, r) {
    t.addEventListener(e, r, !We && Do)
  }
  function Et (t, e, r) {
    t.removeEventListener(e, r, !We && Do)
  }
  function Tr (t, e) {
    if (e) {
      if ((e[0] === '>' && (e = e.substring(1)), t)) {
        try {
          if (t.matches) return t.matches(e)
          if (t.msMatchesSelector) return t.msMatchesSelector(e)
          if (t.webkitMatchesSelector) {
            return t.webkitMatchesSelector(e)
          }
        } catch {
          return !1
        }
      }
      return !1
    }
  }
  function Co (t) {
    return t.host && t !== document && t.host.nodeType
      ? t.host
      : t.parentNode
  }
  function Se (t, e, r, n) {
    if (t) {
      r = r || document
      do {
        if (
          (e != null &&
                        (e[0] === '>'
                          ? t.parentNode === r && Tr(t, e)
                          : Tr(t, e))) ||
                    (n && t === r)
        ) {
          return t
        }
        if (t === r) break
      } while ((t = Co(t)))
    }
    return null
  }
  const bo = /\s+/g
  function fe (t, e, r) {
    if (t && e) {
      if (t.classList) t.classList[r ? 'add' : 'remove'](e)
      else {
        const n = (' ' + t.className + ' ')
          .replace(bo, ' ')
          .replace(' ' + e + ' ', ' ')
        t.className = (n + (r ? ' ' + e : '')).replace(bo, ' ')
      }
    }
  }
  function at (t, e, r) {
    const n = t && t.style
    if (n) {
      if (r === void 0) {
        return (
          document.defaultView &&
                    document.defaultView.getComputedStyle
            ? (r = document.defaultView.getComputedStyle(t, ''))
            : t.currentStyle && (r = t.currentStyle),
          e === void 0 ? r : r[e]
        )
      }
      !(e in n) && e.indexOf('webkit') === -1 && (e = '-webkit-' + e),
      (n[e] = r + (typeof r === 'string' ? '' : 'px'))
    }
  }
  function Ln (t, e) {
    let r = ''
    if (typeof t === 'string') r = t
    else {
      do {
        const n = at(t, 'transform')
        n && n !== 'none' && (r = n + ' ' + r)
      } while (!e && (t = t.parentNode))
    }
    const i =
            window.DOMMatrix ||
            window.WebKitCSSMatrix ||
            window.CSSMatrix ||
            window.MSCSSMatrix
    return i && new i(r)
  }
  function _o (t, e, r) {
    if (t) {
      const n = t.getElementsByTagName(e)
      let i = 0
      const o = n.length
      if (r) for (; i < o; i++) r(n[i], i)
      return n
    }
    return []
  }
  function Pe () {
    const t = document.scrollingElement
    return t || document.documentElement
  }
  function qt (t, e, r, n, i) {
    if (!(!t.getBoundingClientRect && t !== window)) {
      let o, a, d, f, u, w, m
      if (
        (t !== window && t.parentNode && t !== Pe()
          ? ((o = t.getBoundingClientRect()),
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
        (e || r) && t !== window && ((i = i || t.parentNode), !We))
      ) {
        do {
          if (
            i &&
                        i.getBoundingClientRect &&
                        (at(i, 'transform') !== 'none' ||
                            (r && at(i, 'position') !== 'static'))
          ) {
            const E = i.getBoundingClientRect();
            (a -= E.top + parseInt(at(i, 'border-top-width'))),
            (d -=
                                E.left + parseInt(at(i, 'border-left-width'))),
            (f = a + o.height),
            (u = d + o.width)
            break
          }
        } while ((i = i.parentNode))
      }
      if (n && t !== window) {
        const O = Ln(i || t)
        const S = O && O.a
        const M = O && O.d
        O &&
                    ((a /= M),
                    (d /= S),
                    (m /= S),
                    (w /= M),
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
  function yo (t, e, r) {
    for (let n = sn(t, !0), i = qt(t)[e]; n;) {
      const o = qt(n)[r]
      let a = void 0
      if (
        (r === 'top' || r === 'left' ? (a = i >= o) : (a = i <= o), !a)
      ) {
        return n
      }
      if (n === Pe()) break
      n = sn(n, !1)
    }
    return !1
  }
  function Nn (t, e, r, n) {
    for (let i = 0, o = 0, a = t.children; o < a.length;) {
      if (
        a[o].style.display !== 'none' &&
                a[o] !== st.ghost &&
                (n || a[o] !== st.dragged) &&
                Se(a[o], r.draggable, t, !1)
      ) {
        if (i === e) return a[o]
        i++
      }
      o++
    }
    return null
  }
  function xi (t, e) {
    for (
      var r = t.lastElementChild;
      r &&
            (r === st.ghost || at(r, 'display') === 'none' || (e && !Tr(r, e)));

    ) {
      r = r.previousElementSibling
    }
    return r || null
  }
  function ve (t, e) {
    let r = 0
    if (!t || !t.parentNode) return -1
    for (; (t = t.previousElementSibling);) {
      t.nodeName.toUpperCase() !== 'TEMPLATE' &&
                t !== st.clone &&
                (!e || Tr(t, e)) &&
                r++
    }
    return r
  }
  function wo (t) {
    let e = 0
    let r = 0
    const n = Pe()
    if (t) {
      do {
        const i = Ln(t)
        const o = i.a
        const a = i.d;
        (e += t.scrollLeft * o), (r += t.scrollTop * a)
      } while (t !== n && (t = t.parentNode))
    }
    return [e, r]
  }
  function Ja (t, e) {
    for (const r in t) {
      if (t.hasOwnProperty(r)) {
        for (const n in e) {
          if (e.hasOwnProperty(n) && e[n] === t[r][n]) {
            return Number(r)
          }
        }
      }
    }
    return -1
  }
  function sn (t, e) {
    if (!t || !t.getBoundingClientRect) return Pe()
    let r = t
    let n = !1
    do {
      if (
        r.clientWidth < r.scrollWidth ||
                r.clientHeight < r.scrollHeight
      ) {
        const i = at(r)
        if (
          (r.clientWidth < r.scrollWidth &&
                        (i.overflowX == 'auto' || i.overflowX == 'scroll')) ||
                    (r.clientHeight < r.scrollHeight &&
                        (i.overflowY == 'auto' || i.overflowY == 'scroll'))
        ) {
          if (!r.getBoundingClientRect || r === document.body) {
            return Pe()
          }
          if (n || e) return r
          n = !0
        }
      }
    } while ((r = r.parentNode))
    return Pe()
  }
  function Za (t, e) {
    if (t && e) for (const r in e) e.hasOwnProperty(r) && (t[r] = e[r])
    return t
  }
  function si (t, e) {
    return (
      Math.round(t.top) === Math.round(e.top) &&
            Math.round(t.left) === Math.round(e.left) &&
            Math.round(t.height) === Math.round(e.height) &&
            Math.round(t.width) === Math.round(e.width)
    )
  }
  let Kn
  function To (t, e) {
    return function () {
      if (!Kn) {
        const r = arguments
        const n = this
        r.length === 1 ? t.call(n, r[0]) : t.apply(n, r),
        (Kn = setTimeout(function () {
          Kn = void 0
        }, e))
      }
    }
  }
  function Qa () {
    clearTimeout(Kn), (Kn = void 0)
  }
  function Po (t, e, r) {
    (t.scrollLeft += e), (t.scrollTop += r)
  }
  function Mo (t) {
    const e = window.Polymer
    const r = window.jQuery || window.Zepto
    return e && e.dom
      ? e.dom(t).cloneNode(!0)
      : r
        ? r(t).clone(!0)[0]
        : t.cloneNode(!0)
  }
  function Ro (t, e, r) {
    const n = {}
    return (
      Array.from(t.children).forEach(function (i) {
        let o, a, d, f
        if (!(!Se(i, e.draggable, t, !1) || i.animated || i === r)) {
          const u = qt(i);
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
  const se = 'Sortable' + new Date().getTime()
  function ts () {
    let t = []
    let e
    return {
      captureAnimationState: function () {
        if (((t = []), !!this.options.animation)) {
          const n = [].slice.call(this.el.children)
          n.forEach(function (i) {
            if (!(at(i, 'display') === 'none' || i === st.ghost)) {
              t.push({ target: i, rect: qt(i) })
              const o = Me({}, t[t.length - 1].rect)
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
        t.push(n)
      },
      removeAnimationState: function (n) {
        t.splice(Ja(t, { target: n }), 1)
      },
      animateAll: function (n) {
        const i = this
        if (!this.options.animation) {
          clearTimeout(e), typeof n === 'function' && n()
          return
        }
        let o = !1
        let a = 0
        t.forEach(function (d) {
          let f = 0
          const u = d.target
          const w = u.fromRect
          const m = qt(u)
          const E = u.prevFromRect
          const O = u.prevToRect
          const S = d.rect
          const M = Ln(u, !0)
          M && ((m.top -= M.f), (m.left -= M.e)),
          (u.toRect = m),
          u.thisAnimationDuration &&
                            si(E, m) &&
                            !si(w, m) &&
                            (S.top - m.top) / (S.left - m.left) ===
                                (w.top - m.top) / (w.left - m.left) &&
                            (f = ns(S, E, O, i.options)),
          si(m, w) ||
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
        clearTimeout(e),
        o
          ? (e = setTimeout(function () {
              typeof n === 'function' && n()
            }, a))
          : typeof n === 'function' && n(),
        (t = [])
      },
      animate: function (n, i, o, a) {
        if (a) {
          at(n, 'transition', ''), at(n, 'transform', '')
          const d = Ln(this.el)
          const f = d && d.a
          const u = d && d.d
          const w = (i.left - o.left) / (f || 1)
          const m = (i.top - o.top) / (u || 1);
          (n.animatingX = !!w),
          (n.animatingY = !!m),
          at(
            n,
            'transform',
            'translate3d(' + w + 'px,' + m + 'px,0)'
          ),
          (this.forRepaintDummy = es(n)),
          at(
            n,
            'transition',
            'transform ' +
                                a +
                                'ms' +
                                (this.options.easing
                                  ? ' ' + this.options.easing
                                  : '')
          ),
          at(n, 'transform', 'translate3d(0,0,0)'),
          typeof n.animated === 'number' &&
                            clearTimeout(n.animated),
          (n.animated = setTimeout(function () {
            at(n, 'transition', ''),
            at(n, 'transform', ''),
            (n.animated = !1),
            (n.animatingX = !1),
            (n.animatingY = !1)
          }, a))
        }
      }
    }
  }
  function es (t) {
    return t.offsetWidth
  }
  function ns (t, e, r, n) {
    return (
      (Math.sqrt(
        Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)
      ) /
                Math.sqrt(
                  Math.pow(e.top - r.top, 2) + Math.pow(e.left - r.left, 2)
                )) *
            n.animation
    )
  }
  const Mn = []
  const li = { initializeByDefault: !0 }
  const er = {
    mount: function (e) {
      for (const r in li) {
        li.hasOwnProperty(r) && !(r in e) && (e[r] = li[r])
      }
      Mn.forEach(function (n) {
        if (n.pluginName === e.pluginName) {
          throw 'Sortable: Cannot mount plugin '.concat(
            e.pluginName,
            ' more than once'
          )
        }
      }),
      Mn.push(e)
    },
    pluginEvent: function (e, r, n) {
      const i = this;
      (this.eventCanceled = !1),
      (n.cancel = function () {
        i.eventCanceled = !0
      })
      const o = e + 'Global'
      Mn.forEach(function (a) {
        r[a.pluginName] &&
                    (r[a.pluginName][o] &&
                        r[a.pluginName][o](Me({ sortable: r }, n)),
                    r.options[a.pluginName] &&
                        r[a.pluginName][e] &&
                        r[a.pluginName][e](Me({ sortable: r }, n)))
      })
    },
    initializePlugins: function (e, r, n, i) {
      Mn.forEach(function (d) {
        const f = d.pluginName
        if (!(!e.options[f] && !d.initializeByDefault)) {
          const u = new d(e, r, e.options);
          (u.sortable = e),
          (u.options = e.options),
          (e[f] = u),
          $e(n, u.defaults)
        }
      })
      for (const o in e.options) {
        if (e.options.hasOwnProperty(o)) {
          const a = this.modifyOption(e, o, e.options[o])
          typeof a < 'u' && (e.options[o] = a)
        }
      }
    },
    getEventProperties: function (e, r) {
      const n = {}
      return (
        Mn.forEach(function (i) {
          typeof i.eventProperties === 'function' &&
                        $e(n, i.eventProperties.call(r[i.pluginName], e))
        }),
        n
      )
    },
    modifyOption: function (e, r, n) {
      let i
      return (
        Mn.forEach(function (o) {
          e[o.pluginName] &&
                        o.optionListeners &&
                        typeof o.optionListeners[r] === 'function' &&
                        (i = o.optionListeners[r].call(e[o.pluginName], n))
        }),
        i
      )
    }
  }
  function rs (t) {
    let e = t.sortable
    const r = t.rootEl
    const n = t.name
    const i = t.targetEl
    const o = t.cloneEl
    const a = t.toEl
    const d = t.fromEl
    const f = t.oldIndex
    const u = t.newIndex
    const w = t.oldDraggableIndex
    const m = t.newDraggableIndex
    const E = t.originalEvent
    const O = t.putSortable
    const S = t.extraEventProperties
    if (((e = e || (r && r[se])), !!e)) {
      let M
      const I = e.options
      const $ = 'on' + n.charAt(0).toUpperCase() + n.substr(1)
      window.CustomEvent && !We && !tr
        ? (M = new CustomEvent(n, { bubbles: !0, cancelable: !0 }))
        : ((M = document.createEvent('Event')), M.initEvent(n, !0, !0)),
      (M.to = a || r),
      (M.from = d || r),
      (M.item = i || r),
      (M.clone = o),
      (M.oldIndex = f),
      (M.newIndex = u),
      (M.oldDraggableIndex = w),
      (M.newDraggableIndex = m),
      (M.originalEvent = E),
      (M.pullMode = O ? O.lastPutMode : void 0)
      const A = Me(Me({}, S), er.getEventProperties(n, e))
      for (const k in A) M[k] = A[k]
      r && r.dispatchEvent(M), I[$] && I[$].call(e, M)
    }
  }
  const is = ['evt']
  const ae = function (e, r) {
    const n =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    const i = n.evt
    const o = Ga(n, is)
    er.pluginEvent.bind(st)(
      e,
      r,
      Me(
        {
          dragEl: N,
          parentEl: Ut,
          ghostEl: ut,
          rootEl: kt,
          nextEl: bn,
          lastDownEl: Ar,
          cloneEl: Wt,
          cloneHidden: an,
          dragStarted: Yn,
          putSortable: Zt,
          activeSortable: st.active,
          originalEvent: i,
          oldIndex: Fn,
          oldDraggableIndex: Jn,
          newIndex: ue,
          newDraggableIndex: on,
          hideGhostForTarget: No,
          unhideGhostForTarget: ko,
          cloneNowHidden: function () {
            an = !0
          },
          cloneNowShown: function () {
            an = !1
          },
          dispatchSortableEvent: function (d) {
            ie({ sortable: r, name: d, originalEvent: i })
          }
        },
        o
      )
    )
  }
  function ie (t) {
    rs(
      Me(
        {
          putSortable: Zt,
          cloneEl: Wt,
          targetEl: N,
          rootEl: kt,
          oldIndex: Fn,
          oldDraggableIndex: Jn,
          newIndex: ue,
          newDraggableIndex: on
        },
        t
      )
    )
  }
  let N
  let Ut
  let ut
  let kt
  let bn
  let Ar
  let Wt
  let an
  let Fn
  let ue
  let Jn
  let on
  let wr
  let Zt
  let In = !1
  let Pr = !1
  const Mr = []
  let mn
  let Oe
  let ci
  let fi
  let xo
  let Eo
  let Yn
  let Rn
  let Zn
  let Qn = !1
  let xr = !1
  let Dr
  let ne
  let ui = []
  let mi = !1
  const Rr = []
  const Fr = typeof document < 'u'
  const Er = wi
  const Oo = tr || We ? 'cssFloat' : 'float'
  const os = Fr && !Ao && !wi && 'draggable' in document.createElement('div')
  const Io = (function () {
    if (Fr) {
      if (We) return !1
      const t = document.createElement('x')
      return (
        (t.style.cssText = 'pointer-events:auto'),
        t.style.pointerEvents === 'auto'
      )
    }
  })()
  const Fo = function (e, r) {
    const n = at(e)
    const i =
            parseInt(n.width) -
            parseInt(n.paddingLeft) -
            parseInt(n.paddingRight) -
            parseInt(n.borderLeftWidth) -
            parseInt(n.borderRightWidth)
    const o = Nn(e, 0, r)
    const a = Nn(e, 1, r)
    const d = o && at(o)
    const f = a && at(a)
    const u =
            d && parseInt(d.marginLeft) + parseInt(d.marginRight) + qt(o).width
    const w =
            f && parseInt(f.marginLeft) + parseInt(f.marginRight) + qt(a).width
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
                (u >= i && n[Oo] === 'none') ||
                (a && n[Oo] === 'none' && u + w > i))
      ? 'vertical'
      : 'horizontal'
  }
  const as = function (e, r, n) {
    const i = n ? e.left : e.top
    const o = n ? e.right : e.bottom
    const a = n ? e.width : e.height
    const d = n ? r.left : r.top
    const f = n ? r.right : r.bottom
    const u = n ? r.width : r.height
    return i === d || o === f || i + a / 2 === d + u / 2
  }
  const ss = function (e, r) {
    let n
    return (
      Mr.some(function (i) {
        const o = i[se].options.emptyInsertThreshold
        if (!(!o || xi(i))) {
          const a = qt(i)
          const d = e >= a.left - o && e <= a.right + o
          const f = r >= a.top - o && r <= a.bottom + o
          if (d && f) return (n = i)
        }
      }),
      n
    )
  }
  const Lo = function (e) {
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
    let i = e.group;
    (!i || Sr(i) != 'object') && (i = { name: i }),
    (n.name = i.name),
    (n.checkPull = r(i.pull, !0)),
    (n.checkPut = r(i.put)),
    (n.revertClone = i.revertClone),
    (e.group = n)
  }
  var No = function () {
    !Io && ut && at(ut, 'display', 'none')
  }
  var ko = function () {
    !Io && ut && at(ut, 'display', '')
  }
  Fr &&
        !Ao &&
        document.addEventListener(
          'click',
          function (t) {
            if (Pr) {
              return (
                t.preventDefault(),
                t.stopPropagation && t.stopPropagation(),
                t.stopImmediatePropagation &&
                            t.stopImmediatePropagation(),
                (Pr = !1),
                !1
              )
            }
          },
          !0
        )
  const gn = function (e) {
    if (N) {
      e = e.touches ? e.touches[0] : e
      const r = ss(e.clientX, e.clientY)
      if (r) {
        const n = {}
        for (const i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
        (n.target = n.rootEl = r),
        (n.preventDefault = void 0),
        (n.stopPropagation = void 0),
        r[se]._onDragOver(n)
      }
    }
  }
  const ls = function (e) {
    N && N.parentNode[se]._isOutsideThisEl(e.target)
  }
  function st (t, e) {
    if (!(t && t.nodeType && t.nodeType === 1)) {
      throw 'Sortable: `el` must be an HTMLElement, not '.concat(
        {}.toString.call(t)
      )
    }
    (this.el = t), (this.options = e = $e({}, e)), (t[se] = this)
    const r = {
      group: null,
      sort: !0,
      disabled: !1,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(t.nodeName) ? '>li' : '>*',
      swapThreshold: 1,
      invertSwap: !1,
      invertedSwapThreshold: null,
      removeCloneOnHide: !0,
      direction: function () {
        return Fo(t, this.options)
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
                st.supportPointer !== !1 &&
                'PointerEvent' in window &&
                (!Gn || wi),
      emptyInsertThreshold: 5
    }
    er.initializePlugins(this, t, r)
    for (const n in r) !(n in e) && (e[n] = r[n])
    Lo(e)
    for (const i in this) {
      i.charAt(0) === '_' &&
                typeof this[i] === 'function' &&
                (this[i] = this[i].bind(this))
    }
    (this.nativeDraggable = e.forceFallback ? !1 : os),
    this.nativeDraggable && (this.options.touchStartThreshold = 1),
    e.supportPointer
      ? Ot(t, 'pointerdown', this._onTapStart)
      : (Ot(t, 'mousedown', this._onTapStart),
        Ot(t, 'touchstart', this._onTapStart)),
    this.nativeDraggable &&
                (Ot(t, 'dragover', this), Ot(t, 'dragenter', this)),
    Mr.push(this.el),
    e.store && e.store.get && this.sort(e.store.get(this) || []),
    $e(this, ts())
  }
  st.prototype = {
    constructor: st,
    _isOutsideThisEl: function (e) {
      !this.el.contains(e) && e !== this.el && (Rn = null)
    },
    _getDirection: function (e, r) {
      return typeof this.options.direction === 'function'
        ? this.options.direction.call(this, e, r, N)
        : this.options.direction
    },
    _onTapStart: function (e) {
      if (e.cancelable) {
        const r = this
        const n = this.el
        const i = this.options
        const o = i.preventOnFilter
        const a = e.type
        const d =
                    (e.touches && e.touches[0]) ||
                    (e.pointerType && e.pointerType === 'touch' && e)
        let f = (d || e).target
        const u =
                    (e.target.shadowRoot &&
                        ((e.path && e.path[0]) ||
                            (e.composedPath && e.composedPath()[0]))) ||
                    f
        let w = i.filter
        if (
          (ms(n),
          !N &&
                        !(
                          (/mousedown|pointerdown/.test(a) &&
                                e.button !== 0) ||
                            i.disabled
                        ) &&
                        !u.isContentEditable &&
                        !(
                          !this.nativeDraggable &&
                            Gn &&
                            f &&
                            f.tagName.toUpperCase() === 'SELECT'
                        ) &&
                        ((f = Se(f, i.draggable, n, !1)),
                        !(f && f.animated) && Ar !== f))
        ) {
          if (
            ((Fn = ve(f)),
            (Jn = ve(f, i.draggable)),
            typeof w === 'function')
          ) {
            if (w.call(this, e, f, this)) {
              ie({
                sortable: r,
                rootEl: u,
                name: 'filter',
                targetEl: f,
                toEl: n,
                fromEl: n
              }),
              ae('filter', r, { evt: e }),
              o && e.preventDefault()
              return
            }
          } else if (
            w &&
                        ((w = w.split(',').some(function (m) {
                          if (((m = Se(u, m.trim(), n, !1)), m)) {
                            return (
                              ie({
                                sortable: r,
                                rootEl: m,
                                name: 'filter',
                                targetEl: f,
                                fromEl: n,
                                toEl: n
                              }),
                              ae('filter', r, { evt: e }),
                              !0
                            )
                          }
                        })),
                        w)
          ) {
            o && e.preventDefault()
            return
          }
          (i.handle && !Se(u, i.handle, n, !1)) ||
                        this._prepareDragStart(e, d, f)
        }
      }
    },
    _prepareDragStart: function (e, r, n) {
      const i = this
      const o = i.el
      const a = i.options
      const d = o.ownerDocument
      let f
      if (n && !N && n.parentNode === o) {
        const u = qt(n)
        if (
          ((kt = o),
          (N = n),
          (Ut = N.parentNode),
          (bn = N.nextSibling),
          (Ar = n),
          (wr = a.group),
          (st.dragged = N),
          (mn = {
            target: N,
            clientX: (r || e).clientX,
            clientY: (r || e).clientY
          }),
          (xo = mn.clientX - u.left),
          (Eo = mn.clientY - u.top),
          (this._lastX = (r || e).clientX),
          (this._lastY = (r || e).clientY),
          (N.style['will-change'] = 'all'),
          (f = function () {
            if (
              (ae('delayEnded', i, { evt: e }), st.eventCanceled)
            ) {
              i._onDrop()
              return
            }
            i._disableDelayedDragEvents(),
            !go && i.nativeDraggable && (N.draggable = !0),
            i._triggerDragStart(e, r),
            ie({
              sortable: i,
              name: 'choose',
              originalEvent: e
            }),
            fe(N, a.chosenClass, !0)
          }),
          a.ignore.split(',').forEach(function (w) {
            _o(N, w.trim(), di)
          }),
          Ot(d, 'dragover', gn),
          Ot(d, 'mousemove', gn),
          Ot(d, 'touchmove', gn),
          a.supportPointer
            ? (Ot(d, 'pointerup', i._onDrop),
              !this.nativeDraggable &&
                              Ot(d, 'pointercancel', i._onDrop))
            : (Ot(d, 'mouseup', i._onDrop),
              Ot(d, 'touchend', i._onDrop),
              Ot(d, 'touchcancel', i._onDrop)),
          go &&
                        this.nativeDraggable &&
                        ((this.options.touchStartThreshold = 4),
                        (N.draggable = !0)),
          ae('delayStart', this, { evt: e }),
          a.delay &&
                        (!a.delayOnTouchOnly || r) &&
                        (!this.nativeDraggable || !(tr || We)))
        ) {
          if (st.eventCanceled) {
            this._onDrop()
            return
          }
          a.supportPointer
            ? (Ot(d, 'pointerup', i._disableDelayedDrag),
              Ot(d, 'pointercancel', i._disableDelayedDrag))
            : (Ot(d, 'mouseup', i._disableDelayedDrag),
              Ot(d, 'touchend', i._disableDelayedDrag),
              Ot(d, 'touchcancel', i._disableDelayedDrag)),
          Ot(d, 'mousemove', i._delayedDragTouchMoveHandler),
          Ot(d, 'touchmove', i._delayedDragTouchMoveHandler),
          a.supportPointer &&
                            Ot(
                              d,
                              'pointermove',
                              i._delayedDragTouchMoveHandler
                            ),
          (i._dragStartTimer = setTimeout(f, a.delay))
        } else f()
      }
    },
    _delayedDragTouchMoveHandler: function (e) {
      const r = e.touches ? e.touches[0] : e
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
      N && di(N),
      clearTimeout(this._dragStartTimer),
      this._disableDelayedDragEvents()
    },
    _disableDelayedDragEvents: function () {
      const e = this.el.ownerDocument
      Et(e, 'mouseup', this._disableDelayedDrag),
      Et(e, 'touchend', this._disableDelayedDrag),
      Et(e, 'touchcancel', this._disableDelayedDrag),
      Et(e, 'pointerup', this._disableDelayedDrag),
      Et(e, 'pointercancel', this._disableDelayedDrag),
      Et(e, 'mousemove', this._delayedDragTouchMoveHandler),
      Et(e, 'touchmove', this._delayedDragTouchMoveHandler),
      Et(e, 'pointermove', this._delayedDragTouchMoveHandler)
    },
    _triggerDragStart: function (e, r) {
      (r = r || (e.pointerType == 'touch' && e)),
      !this.nativeDraggable || r
        ? this.options.supportPointer
          ? Ot(document, 'pointermove', this._onTouchMove)
          : r
            ? Ot(document, 'touchmove', this._onTouchMove)
            : Ot(document, 'mousemove', this._onTouchMove)
        : (Ot(N, 'dragend', this),
          Ot(kt, 'dragstart', this._onDragStart))
      try {
        document.selection
          ? Cr(function () {
            document.selection.empty()
          })
          : window.getSelection().removeAllRanges()
      } catch {}
    },
    _dragStarted: function (e, r) {
      if (((In = !1), kt && N)) {
        ae('dragStarted', this, { evt: r }),
        this.nativeDraggable && Ot(document, 'dragover', ls)
        const n = this.options
        !e && fe(N, n.dragClass, !1),
        fe(N, n.ghostClass, !0),
        (st.active = this),
        e && this._appendGhost(),
        ie({ sortable: this, name: 'start', originalEvent: r })
      } else this._nulling()
    },
    _emulateDragOver: function () {
      if (Oe) {
        (this._lastX = Oe.clientX), (this._lastY = Oe.clientY), No()
        for (
          var e = document.elementFromPoint(Oe.clientX, Oe.clientY),
            r = e;
          e &&
                    e.shadowRoot &&
                    ((e = e.shadowRoot.elementFromPoint(
                      Oe.clientX,
                      Oe.clientY
                    )),
                    e !== r);

        ) {
          r = e
        }
        if ((N.parentNode[se]._isOutsideThisEl(e), r)) {
          do {
            if (r[se]) {
              let n = void 0
              if (
                ((n = r[se]._onDragOver({
                  clientX: Oe.clientX,
                  clientY: Oe.clientY,
                  target: e,
                  rootEl: r
                })),
                n && !this.options.dragoverBubble)
              ) {
                break
              }
            }
            e = r
          } while ((r = Co(r)))
        }
        ko()
      }
    },
    _onTouchMove: function (e) {
      if (mn) {
        const r = this.options
        const n = r.fallbackTolerance
        const i = r.fallbackOffset
        const o = e.touches ? e.touches[0] : e
        let a = ut && Ln(ut, !0)
        const d = ut && a && a.a
        const f = ut && a && a.d
        const u = Er && ne && wo(ne)
        const w =
                    (o.clientX - mn.clientX + i.x) / (d || 1) +
                    (u ? u[0] - ui[0] : 0) / (d || 1)
        const m =
                    (o.clientY - mn.clientY + i.y) / (f || 1) +
                    (u ? u[1] - ui[1] : 0) / (f || 1)
        if (!st.active && !In) {
          if (
            n &&
                        Math.max(
                          Math.abs(o.clientX - this._lastX),
                          Math.abs(o.clientY - this._lastY)
                        ) < n
          ) {
            return
          }
          this._onDragStart(e, !0)
        }
        if (ut) {
          a
            ? ((a.e += w - (ci || 0)), (a.f += m - (fi || 0)))
            : (a = { a: 1, b: 0, c: 0, d: 1, e: w, f: m })
          const E = 'matrix('
            .concat(a.a, ',')
            .concat(a.b, ',')
            .concat(a.c, ',')
            .concat(a.d, ',')
            .concat(a.e, ',')
            .concat(a.f, ')')
          at(ut, 'webkitTransform', E),
          at(ut, 'mozTransform', E),
          at(ut, 'msTransform', E),
          at(ut, 'transform', E),
          (ci = w),
          (fi = m),
          (Oe = o)
        }
        e.cancelable && e.preventDefault()
      }
    },
    _appendGhost: function () {
      if (!ut) {
        const e = this.options.fallbackOnBody ? document.body : kt
        const r = qt(N, !0, Er, !0, e)
        const n = this.options
        if (Er) {
          for (
            ne = e;
            at(ne, 'position') === 'static' &&
                        at(ne, 'transform') === 'none' &&
                        ne !== document;

          ) {
            ne = ne.parentNode
          }
          ne !== document.body && ne !== document.documentElement
            ? (ne === document && (ne = Pe()),
              (r.top += ne.scrollTop),
              (r.left += ne.scrollLeft))
            : (ne = Pe()),
          (ui = wo(ne))
        }
        (ut = N.cloneNode(!0)),
        fe(ut, n.ghostClass, !1),
        fe(ut, n.fallbackClass, !0),
        fe(ut, n.dragClass, !0),
        at(ut, 'transition', ''),
        at(ut, 'transform', ''),
        at(ut, 'box-sizing', 'border-box'),
        at(ut, 'margin', 0),
        at(ut, 'top', r.top),
        at(ut, 'left', r.left),
        at(ut, 'width', r.width),
        at(ut, 'height', r.height),
        at(ut, 'opacity', '0.8'),
        at(ut, 'position', Er ? 'absolute' : 'fixed'),
        at(ut, 'zIndex', '100000'),
        at(ut, 'pointerEvents', 'none'),
        (st.ghost = ut),
        e.appendChild(ut),
        at(
          ut,
          'transform-origin',
          (xo / parseInt(ut.style.width)) * 100 +
                            '% ' +
                            (Eo / parseInt(ut.style.height)) * 100 +
                            '%'
        )
      }
    },
    _onDragStart: function (e, r) {
      const n = this
      const i = e.dataTransfer
      const o = n.options
      if ((ae('dragStart', this, { evt: e }), st.eventCanceled)) {
        this._onDrop()
        return
      }
      ae('setupClone', this),
      st.eventCanceled ||
                    ((Wt = Mo(N)),
                    Wt.removeAttribute('id'),
                    (Wt.draggable = !1),
                    (Wt.style['will-change'] = ''),
                    this._hideClone(),
                    fe(Wt, this.options.chosenClass, !1),
                    (st.clone = Wt)),
      (n.cloneId = Cr(function () {
        ae('clone', n),
        !st.eventCanceled &&
                            (n.options.removeCloneOnHide ||
                                kt.insertBefore(Wt, N),
                            n._hideClone(),
                            ie({ sortable: n, name: 'clone' }))
      })),
      !r && fe(N, o.dragClass, !0),
      r
        ? ((Pr = !0),
          (n._loopId = setInterval(n._emulateDragOver, 50)))
        : (Et(document, 'mouseup', n._onDrop),
          Et(document, 'touchend', n._onDrop),
          Et(document, 'touchcancel', n._onDrop),
          i &&
                          ((i.effectAllowed = 'move'),
                          o.setData && o.setData.call(n, i, N)),
          Ot(document, 'drop', n),
          at(N, 'transform', 'translateZ(0)')),
      (In = !0),
      (n._dragStartId = Cr(n._dragStarted.bind(n, r, e))),
      Ot(document, 'selectstart', n),
      (Yn = !0),
      window.getSelection().removeAllRanges(),
      Gn && at(document.body, 'user-select', 'none')
    },
    _onDragOver: function (e) {
      const r = this.el
      let n = e.target
      let i
      let o
      let a
      const d = this.options
      const f = d.group
      const u = st.active
      const w = wr === f
      const m = d.sort
      const E = Zt || u
      let O
      const S = this
      let M = !1
      if (mi) return
      function I (R, Q) {
        ae(
          R,
          S,
          Me(
            {
              evt: e,
              isOwner: w,
              axis: O ? 'vertical' : 'horizontal',
              revert: a,
              dragRect: i,
              targetRect: o,
              canSort: m,
              fromSortable: E,
              target: n,
              completed: A,
              onMove: function (Re, ze) {
                return Or(kt, r, N, i, Re, qt(Re), e, ze)
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
      function A (R) {
        return (
          I('dragOverCompleted', { insertion: R }),
          R &&
                        (w ? u._hideClone() : u._showClone(S),
                        S !== E &&
                            (fe(
                              N,
                              Zt
                                ? Zt.options.ghostClass
                                : u.options.ghostClass,
                              !1
                            ),
                            fe(N, d.ghostClass, !0)),
                        Zt !== S && S !== st.active
                          ? (Zt = S)
                          : S === st.active && Zt && (Zt = null),
                        E === S && (S._ignoreWhileAnimating = n),
                        S.animateAll(function () {
                          I('dragOverAnimationComplete'),
                          (S._ignoreWhileAnimating = null)
                        }),
                        S !== E &&
                            (E.animateAll(), (E._ignoreWhileAnimating = null))),
          ((n === N && !N.animated) || (n === r && !n.animated)) &&
                        (Rn = null),
          !d.dragoverBubble &&
                        !e.rootEl &&
                        n !== document &&
                        (N.parentNode[se]._isOutsideThisEl(e.target),
                        !R && gn(e)),
          !d.dragoverBubble &&
                        e.stopPropagation &&
                        e.stopPropagation(),
          (M = !0)
        )
      }
      function k () {
        (ue = ve(N)),
        (on = ve(N, d.draggable)),
        ie({
          sortable: S,
          name: 'change',
          toEl: r,
          newIndex: ue,
          newDraggableIndex: on,
          originalEvent: e
        })
      }
      if (
        (e.preventDefault !== void 0 &&
                    e.cancelable &&
                    e.preventDefault(),
        (n = Se(n, d.draggable, r, !0)),
        I('dragOver'),
        st.eventCanceled)
      ) {
        return M
      }
      if (
        N.contains(e.target) ||
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
                      ? m || (a = Ut !== kt)
                      : Zt === this ||
                          ((this.lastPutMode = wr.checkPull(this, u, N, e)) &&
                              f.checkPut(this, u, N, e))))
      ) {
        if (
          ((O = this._getDirection(e, n) === 'vertical'),
          (i = qt(N)),
          I('dragOverValid'),
          st.eventCanceled)
        ) {
          return M
        }
        if (a) {
          return (
            (Ut = kt),
            $(),
            this._hideClone(),
            I('revert'),
            st.eventCanceled ||
                            (bn ? kt.insertBefore(N, bn) : kt.appendChild(N)),
            A(!0)
          )
        }
        const Y = xi(r, d.draggable)
        if (!Y || (ds(e, O, this) && !Y.animated)) {
          if (Y === N) return A(!1)
          if (
            (Y && r === e.target && (n = Y),
            n && (o = qt(n)),
            Or(kt, r, N, i, n, o, e, !!n) !== !1)
          ) {
            return (
              $(),
              Y && Y.nextSibling
                ? r.insertBefore(N, Y.nextSibling)
                : r.appendChild(N),
              (Ut = r),
              k(),
              A(!0)
            )
          }
        } else if (Y && us(e, O, this)) {
          const nt = Nn(r, 0, d, !0)
          if (nt === N) return A(!1)
          if (
            ((n = nt),
            (o = qt(n)),
            Or(kt, r, N, i, n, o, e, !1) !== !1)
          ) {
            return $(), r.insertBefore(N, nt), (Ut = r), k(), A(!0)
          }
        } else if (n.parentNode === r) {
          o = qt(n)
          let J = 0
          let U
          const dt = N.parentNode !== r
          const X = !as(
            (N.animated && N.toRect) || i,
            (n.animated && n.toRect) || o,
            O
          )
          const Z = O ? 'top' : 'left'
          const mt = yo(n, 'top', 'top') || yo(N, 'top', 'top')
          const l = mt ? mt.scrollTop : void 0
          Rn !== n &&
                        ((U = o[Z]),
                        (Qn = !1),
                        (xr = (!X && d.invertSwap) || dt)),
          (J = ps(
            e,
            n,
            o,
            O,
            X ? 1 : d.swapThreshold,
            d.invertedSwapThreshold == null
              ? d.swapThreshold
              : d.invertedSwapThreshold,
            xr,
            Rn === n
          ))
          let h
          if (J !== 0) {
            let v = ve(N)
            do (v -= J), (h = Ut.children[v])
            while (h && (at(h, 'display') === 'none' || h === ut))
          }
          if (J === 0 || h === n) return A(!1);
          (Rn = n), (Zn = J)
          const p = n.nextElementSibling
          let j = !1
          j = J === 1
          const P = Or(kt, r, N, i, n, o, e, j)
          if (P !== !1) {
            return (
              (P === 1 || P === -1) && (j = P === 1),
              (mi = !0),
              setTimeout(fs, 30),
              $(),
              j && !p
                ? r.appendChild(N)
                : n.parentNode.insertBefore(N, j ? p : n),
              mt && Po(mt, 0, l - mt.scrollTop),
              (Ut = N.parentNode),
              U !== void 0 &&
                                !xr &&
                                (Dr = Math.abs(U - qt(n)[Z])),
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
      Et(document, 'mousemove', this._onTouchMove),
      Et(document, 'touchmove', this._onTouchMove),
      Et(document, 'pointermove', this._onTouchMove),
      Et(document, 'dragover', gn),
      Et(document, 'mousemove', gn),
      Et(document, 'touchmove', gn)
    },
    _offUpEvents: function () {
      const e = this.el.ownerDocument
      Et(e, 'mouseup', this._onDrop),
      Et(e, 'touchend', this._onDrop),
      Et(e, 'pointerup', this._onDrop),
      Et(e, 'pointercancel', this._onDrop),
      Et(e, 'touchcancel', this._onDrop),
      Et(document, 'selectstart', this)
    },
    _onDrop: function (e) {
      const r = this.el
      const n = this.options
      if (
        ((ue = ve(N)),
        (on = ve(N, n.draggable)),
        ae('drop', this, { evt: e }),
        (Ut = N && N.parentNode),
        (ue = ve(N)),
        (on = ve(N, n.draggable)),
        st.eventCanceled)
      ) {
        this._nulling()
        return
      }
      (In = !1),
      (xr = !1),
      (Qn = !1),
      clearInterval(this._loopId),
      clearTimeout(this._dragStartTimer),
      gi(this.cloneId),
      gi(this._dragStartId),
      this.nativeDraggable &&
                    (Et(document, 'drop', this),
                    Et(r, 'dragstart', this._onDragStart)),
      this._offMoveEvents(),
      this._offUpEvents(),
      Gn && at(document.body, 'user-select', ''),
      at(N, 'transform', ''),
      e &&
                    (Yn &&
                        (e.cancelable && e.preventDefault(),
                        !n.dropBubble && e.stopPropagation()),
                    ut && ut.parentNode && ut.parentNode.removeChild(ut),
                    (kt === Ut || (Zt && Zt.lastPutMode !== 'clone')) &&
                        Wt &&
                        Wt.parentNode &&
                        Wt.parentNode.removeChild(Wt),
                    N &&
                        (this.nativeDraggable && Et(N, 'dragend', this),
                        di(N),
                        (N.style['will-change'] = ''),
                        Yn &&
                            !In &&
                            fe(
                              N,
                              Zt
                                ? Zt.options.ghostClass
                                : this.options.ghostClass,
                              !1
                            ),
                        fe(N, this.options.chosenClass, !1),
                        ie({
                          sortable: this,
                          name: 'unchoose',
                          toEl: Ut,
                          newIndex: null,
                          newDraggableIndex: null,
                          originalEvent: e
                        }),
                        kt !== Ut
                          ? (ue >= 0 &&
                                  (ie({
                                    rootEl: Ut,
                                    name: 'add',
                                    toEl: Ut,
                                    fromEl: kt,
                                    originalEvent: e
                                  }),
                                  ie({
                                    sortable: this,
                                    name: 'remove',
                                    toEl: Ut,
                                    originalEvent: e
                                  }),
                                  ie({
                                    rootEl: Ut,
                                    name: 'sort',
                                    toEl: Ut,
                                    fromEl: kt,
                                    originalEvent: e
                                  }),
                                  ie({
                                    sortable: this,
                                    name: 'sort',
                                    toEl: Ut,
                                    originalEvent: e
                                  })),
                            Zt && Zt.save())
                          : ue !== Fn &&
                              ue >= 0 &&
                              (ie({
                                sortable: this,
                                name: 'update',
                                toEl: Ut,
                                originalEvent: e
                              }),
                              ie({
                                sortable: this,
                                name: 'sort',
                                toEl: Ut,
                                originalEvent: e
                              })),
                        st.active &&
                            ((ue == null || ue === -1) &&
                                ((ue = Fn), (on = Jn)),
                            ie({
                              sortable: this,
                              name: 'end',
                              toEl: Ut,
                              originalEvent: e
                            }),
                            this.save()))),
      this._nulling()
    },
    _nulling: function () {
      ae('nulling', this),
      (kt =
                    N =
                    Ut =
                    ut =
                    bn =
                    Wt =
                    Ar =
                    an =
                    mn =
                    Oe =
                    Yn =
                    ue =
                    on =
                    Fn =
                    Jn =
                    Rn =
                    Zn =
                    Zt =
                    wr =
                    st.dragged =
                    st.ghost =
                    st.clone =
                    st.active =
                        null),
      Rr.forEach(function (e) {
        e.checked = !0
      }),
      (Rr.length = ci = fi = 0)
    },
    handleEvent: function (e) {
      switch (e.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(e)
          break
        case 'dragenter':
        case 'dragover':
          N && (this._onDragOver(e), cs(e))
          break
        case 'selectstart':
          e.preventDefault()
          break
      }
    },
    toArray: function () {
      for (
        var e = [],
          r,
          n = this.el.children,
          i = 0,
          o = n.length,
          a = this.options;
        i < o;
        i++
      ) {
        (r = n[i]),
        Se(r, a.draggable, this.el, !1) &&
                        e.push(r.getAttribute(a.dataIdAttr) || vs(r))
      }
      return e
    },
    sort: function (e, r) {
      const n = {}
      const i = this.el
      this.toArray().forEach(function (o, a) {
        const d = i.children[a]
        Se(d, this.options.draggable, i, !1) && (n[o] = d)
      }, this),
      r && this.captureAnimationState(),
      e.forEach(function (o) {
        n[o] && (i.removeChild(n[o]), i.appendChild(n[o]))
      }),
      r && this.animateAll()
    },
    save: function () {
      const e = this.options.store
      e && e.set && e.set(this)
    },
    closest: function (e, r) {
      return Se(e, r || this.options.draggable, this.el, !1)
    },
    option: function (e, r) {
      const n = this.options
      if (r === void 0) return n[e]
      const i = er.modifyOption(this, e, r)
      typeof i < 'u' ? (n[e] = i) : (n[e] = r), e === 'group' && Lo(n)
    },
    destroy: function () {
      ae('destroy', this)
      let e = this.el;
      (e[se] = null),
      Et(e, 'mousedown', this._onTapStart),
      Et(e, 'touchstart', this._onTapStart),
      Et(e, 'pointerdown', this._onTapStart),
      this.nativeDraggable &&
                    (Et(e, 'dragover', this), Et(e, 'dragenter', this)),
      Array.prototype.forEach.call(
        e.querySelectorAll('[draggable]'),
        function (r) {
          r.removeAttribute('draggable')
        }
      ),
      this._onDrop(),
      this._disableDelayedDragEvents(),
      Mr.splice(Mr.indexOf(this.el), 1),
      (this.el = e = null)
    },
    _hideClone: function () {
      if (!an) {
        if ((ae('hideClone', this), st.eventCanceled)) return
        at(Wt, 'display', 'none'),
        this.options.removeCloneOnHide &&
                        Wt.parentNode &&
                        Wt.parentNode.removeChild(Wt),
        (an = !0)
      }
    },
    _showClone: function (e) {
      if (e.lastPutMode !== 'clone') {
        this._hideClone()
        return
      }
      if (an) {
        if ((ae('showClone', this), st.eventCanceled)) return
        N.parentNode == kt && !this.options.group.revertClone
          ? kt.insertBefore(Wt, N)
          : bn
            ? kt.insertBefore(Wt, bn)
            : kt.appendChild(Wt),
        this.options.group.revertClone && this.animate(N, Wt),
        at(Wt, 'display', ''),
        (an = !1)
      }
    }
  }
  function cs (t) {
    t.dataTransfer && (t.dataTransfer.dropEffect = 'move'),
    t.cancelable && t.preventDefault()
  }
  function Or (t, e, r, n, i, o, a, d) {
    let f
    const u = t[se]
    const w = u.options.onMove
    let m
    return (
      window.CustomEvent && !We && !tr
        ? (f = new CustomEvent('move', { bubbles: !0, cancelable: !0 }))
        : ((f = document.createEvent('Event')),
          f.initEvent('move', !0, !0)),
      (f.to = e),
      (f.from = t),
      (f.dragged = r),
      (f.draggedRect = n),
      (f.related = i || e),
      (f.relatedRect = o || qt(e)),
      (f.willInsertAfter = d),
      (f.originalEvent = a),
      t.dispatchEvent(f),
      w && (m = w.call(u, f, a)),
      m
    )
  }
  function di (t) {
    t.draggable = !1
  }
  function fs () {
    mi = !1
  }
  function us (t, e, r) {
    const n = qt(Nn(r.el, 0, r.options, !0))
    const i = Ro(r.el, r.options, ut)
    const o = 10
    return e
      ? t.clientX < i.left - o ||
                  (t.clientY < n.top && t.clientX < n.right)
      : t.clientY < i.top - o ||
                  (t.clientY < n.bottom && t.clientX < n.left)
  }
  function ds (t, e, r) {
    const n = qt(xi(r.el, r.options.draggable))
    const i = Ro(r.el, r.options, ut)
    const o = 10
    return e
      ? t.clientX > i.right + o ||
                  (t.clientY > n.bottom && t.clientX > n.left)
      : t.clientY > i.bottom + o ||
                  (t.clientX > n.right && t.clientY > n.top)
  }
  function ps (t, e, r, n, i, o, a, d) {
    const f = n ? t.clientY : t.clientX
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
        return hs(e)
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
  function hs (t) {
    return ve(N) < ve(t) ? 1 : -1
  }
  function vs (t) {
    for (
      var e = t.tagName + t.className + t.src + t.href + t.textContent,
        r = e.length,
        n = 0;
      r--;

    ) {
      n += e.charCodeAt(r)
    }
    return n.toString(36)
  }
  function ms (t) {
    Rr.length = 0
    for (let e = t.getElementsByTagName('input'), r = e.length; r--;) {
      const n = e[r]
      n.checked && Rr.push(n)
    }
  }
  function Cr (t) {
    return setTimeout(t, 0)
  }
  function gi (t) {
    return clearTimeout(t)
  }
  Fr &&
        Ot(document, 'touchmove', function (t) {
          (st.active || In) && t.cancelable && t.preventDefault()
        })
  st.utils = {
    on: Ot,
    off: Et,
    css: at,
    find: _o,
    is: function (e, r) {
      return !!Se(e, r, e, !1)
    },
    extend: Za,
    throttle: To,
    closest: Se,
    toggleClass: fe,
    clone: Mo,
    index: ve,
    nextTick: Cr,
    cancelNextTick: gi,
    detectDirection: Fo,
    getChild: Nn,
    expando: se
  }
  st.get = function (t) {
    return t[se]
  }
  st.mount = function () {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) {
      e[r] = arguments[r]
    }
    e[0].constructor === Array && (e = e[0]),
    e.forEach(function (n) {
      if (!n.prototype || !n.prototype.constructor) {
        throw 'Sortable: Mounted plugin must be a constructor function, not '.concat(
          {}.toString.call(n)
        )
      }
      n.utils && (st.utils = Me(Me({}, st.utils), n.utils)),
      er.mount(n)
    })
  }
  st.create = function (t, e) {
    return new st(t, e)
  }
  st.version = Ka
  let Xt = []
  let Xn
  let bi
  let yi = !1
  let pi
  let hi
  let Ir
  let qn
  function gs () {
    function t () {
      this.defaults = {
        scroll: !0,
        forceAutoScrollFallback: !1,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: !0
      }
      for (const e in this) {
        e.charAt(0) === '_' &&
                    typeof this[e] === 'function' &&
                    (this[e] = this[e].bind(this))
      }
    }
    return (
      (t.prototype = {
        dragStarted: function (r) {
          const n = r.originalEvent
          this.sortable.nativeDraggable
            ? Ot(document, 'dragover', this._handleAutoScroll)
            : this.options.supportPointer
              ? Ot(
                document,
                'pointermove',
                this._handleFallbackAutoScroll
              )
              : n.touches
                ? Ot(
                  document,
                  'touchmove',
                  this._handleFallbackAutoScroll
                )
                : Ot(
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
            ? Et(document, 'dragover', this._handleAutoScroll)
            : (Et(
                document,
                'pointermove',
                this._handleFallbackAutoScroll
              ),
              Et(
                document,
                'touchmove',
                this._handleFallbackAutoScroll
              ),
              Et(
                document,
                'mousemove',
                this._handleFallbackAutoScroll
              )),
          So(),
          _r(),
          Qa()
        },
        nulling: function () {
          (Ir = bi = Xn = yi = qn = pi = hi = null), (Xt.length = 0)
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
                            tr ||
                            We ||
                            Gn)
          ) {
            vi(r, this.options, d, n)
            let f = sn(d, !0)
            yi &&
                            (!qn || o !== pi || a !== hi) &&
                            (qn && So(),
                            (qn = setInterval(function () {
                              const u = sn(
                                document.elementFromPoint(o, a),
                                !0
                              )
                              u !== f && ((f = u), _r()),
                              vi(r, i.options, u, n)
                            }, 10)),
                            (pi = o),
                            (hi = a))
          } else {
            if (!this.options.bubbleScroll || sn(d, !0) === Pe()) {
              _r()
              return
            }
            vi(r, this.options, sn(d, !1), !1)
          }
        }
      }),
      $e(t, { pluginName: 'scroll', initializeByDefault: !0 })
    )
  }
  function _r () {
    Xt.forEach(function (t) {
      clearInterval(t.pid)
    }),
    (Xt = [])
  }
  function So () {
    clearInterval(qn)
  }
  var vi = To(function (t, e, r, n) {
    if (e.scroll) {
      const i = (t.touches ? t.touches[0] : t).clientX
      const o = (t.touches ? t.touches[0] : t).clientY
      const a = e.scrollSensitivity
      const d = e.scrollSpeed
      const f = Pe()
      let u = !1
      let w
      bi !== r &&
                ((bi = r),
                _r(),
                (Xn = e.scroll),
                (w = e.scrollFn),
                Xn === !0 && (Xn = sn(r, !0)))
      let m = 0
      let E = Xn
      do {
        const O = E
        const S = qt(O)
        const M = S.top
        const I = S.bottom
        const $ = S.left
        const A = S.right
        const k = S.width
        const Y = S.height
        let nt = void 0
        let J = void 0
        const U = O.scrollWidth
        const dt = O.scrollHeight
        const X = at(O)
        const Z = O.scrollLeft
        const mt = O.scrollTop
        O === f
          ? ((nt =
                          k < U &&
                          (X.overflowX === 'auto' ||
                              X.overflowX === 'scroll' ||
                              X.overflowX === 'visible')),
            (J =
                          Y < dt &&
                          (X.overflowY === 'auto' ||
                              X.overflowY === 'scroll' ||
                              X.overflowY === 'visible')))
          : ((nt =
                          k < U &&
                          (X.overflowX === 'auto' || X.overflowX === 'scroll')),
            (J =
                          Y < dt &&
                          (X.overflowY === 'auto' ||
                              X.overflowY === 'scroll')))
        const l =
                    nt &&
                    (Math.abs(A - i) <= a && Z + k < U) -
                        (Math.abs($ - i) <= a && !!Z)
        const h =
                    J &&
                    (Math.abs(I - o) <= a && mt + Y < dt) -
                        (Math.abs(M - o) <= a && !!mt)
        if (!Xt[m]) {
          for (let v = 0; v <= m; v++) Xt[v] || (Xt[v] = {})
        }
        (Xt[m].vx != l || Xt[m].vy != h || Xt[m].el !== O) &&
                    ((Xt[m].el = O),
                    (Xt[m].vx = l),
                    (Xt[m].vy = h),
                    clearInterval(Xt[m].pid),
                    (l != 0 || h != 0) &&
                        ((u = !0),
                        (Xt[m].pid = setInterval(
                          function () {
                            n &&
                                    this.layer === 0 &&
                                    st.active._onTouchMove(Ir)
                            const p = Xt[this.layer].vy
                              ? Xt[this.layer].vy * d
                              : 0
                            const j = Xt[this.layer].vx
                              ? Xt[this.layer].vx * d
                              : 0;
                            (typeof w === 'function' &&
                                    w.call(
                                      st.dragged.parentNode[se],
                                      j,
                                      p,
                                      t,
                                      Ir,
                                      Xt[this.layer].el
                                    ) !== 'continue') ||
                                    Po(Xt[this.layer].el, j, p)
                          }.bind({ layer: m }),
                          24
                        )))),
        m++
      } while (e.bubbleScroll && E !== f && (E = sn(E, !1)))
      yi = u
    }
  }, 30)
  const jo = function (e) {
    const r = e.originalEvent
    const n = e.putSortable
    const i = e.dragEl
    const o = e.activeSortable
    const a = e.dispatchSortableEvent
    const d = e.hideGhostForTarget
    const f = e.unhideGhostForTarget
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
  function Ei () {}
  Ei.prototype = {
    startIndex: null,
    dragStart: function (e) {
      const r = e.oldDraggableIndex
      this.startIndex = r
    },
    onSpill: function (e) {
      const r = e.dragEl
      const n = e.putSortable
      this.sortable.captureAnimationState(),
      n && n.captureAnimationState()
      const i = Nn(this.sortable.el, this.startIndex, this.options)
      i
        ? this.sortable.el.insertBefore(r, i)
        : this.sortable.el.appendChild(r),
      this.sortable.animateAll(),
      n && n.animateAll()
    },
    drop: jo
  }
  $e(Ei, { pluginName: 'revertOnSpill' })
  function Oi () {}
  Oi.prototype = {
    onSpill: function (e) {
      const r = e.dragEl
      const n = e.putSortable
      const i = n || this.sortable
      i.captureAnimationState(),
      r.parentNode && r.parentNode.removeChild(r),
      i.animateAll()
    },
    drop: jo
  }
  $e(Oi, { pluginName: 'removeOnSpill' })
  st.mount(new gs())
  st.mount(Oi, Ei)
  const Si = st
  window.Sortable = Si
  const Bo = (t) => {
    t.directive('sortable', (e) => {
      let r = parseInt(e.dataset?.sortableAnimationDuration)
      r !== 0 && !r && (r = 300),
      (e.sortable = Si.create(e, {
        group: e.getAttribute('x-sortable-group'),
        draggable: '[x-sortable-item]',
        handle: '[x-sortable-handle]',
        dataIdAttr: 'x-sortable-item',
        animation: r,
        ghostClass: 'fi-sortable-ghost'
      }))
    })
  }
  const bs = Object.create
  const Ci = Object.defineProperty
  const ys = Object.getPrototypeOf
  const ws = Object.prototype.hasOwnProperty
  const xs = Object.getOwnPropertyNames
  const Es = Object.getOwnPropertyDescriptor
  const Os = (t) => Ci(t, '__esModule', { value: !0 })
  const Ho = (t, e) => () => (
    e || ((e = { exports: {} }), t(e.exports, e)), e.exports
  )
  const Ss = (t, e, r) => {
    if ((e && typeof e === 'object') || typeof e === 'function') {
      for (const n of xs(e)) {
        !ws.call(t, n) &&
                    n !== 'default' &&
                    Ci(t, n, {
                      get: () => e[n],
                      enumerable: !(r = Es(e, n)) || r.enumerable
                    })
      }
    }
    return t
  }
  const $o = (t) =>
    Ss(
      Os(
        Ci(
          t != null ? bs(ys(t)) : {},
          'default',
          t && t.__esModule && 'default' in t
            ? { get: () => t.default, enumerable: !0 }
            : { value: t, enumerable: !0 }
        )
      ),
      t
    )
  const As = Ho((t) => {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    function e (c) {
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
      return e(w(c)).left + n(c).scrollLeft
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
      const T = e(c)
      const L = o(s)
      let z = { scrollLeft: 0, scrollTop: 0 }
      let H = { x: 0, y: 0 }
      return (
        (L || (!L && !b)) &&
                    ((u(s) !== 'body' || O(_)) && (z = f(s)),
                    o(s)
                      ? ((H = e(s)),
                        (H.x += s.clientLeft),
                        (H.y += s.clientTop))
                      : _ && (H.x = m(_))),
        {
          x: T.left + z.scrollLeft - H.x,
          y: T.top + z.scrollTop - H.y,
          width: T.width,
          height: T.height
        }
      )
    }
    function M (c) {
      const s = e(c)
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
      const z = T ? [L].concat(L.visualViewport || [], O(_) ? _ : []) : _
      const H = s.concat(z)
      return T ? H : H.concat(A(I(z)))
    }
    function k (c) {
      return ['table', 'td', 'th'].indexOf(u(c)) >= 0
    }
    function Y (c) {
      return !o(c) || E(c).position === 'fixed' ? null : c.offsetParent
    }
    function nt (c) {
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
        : b || nt(c) || s
    }
    const U = 'top'
    const dt = 'bottom'
    const X = 'right'
    const Z = 'left'
    const mt = 'auto'
    const l = [U, dt, X, Z]
    const h = 'start'
    const v = 'end'
    const p = 'clippingParents'
    const j = 'viewport'
    const P = 'popper'
    const R = 'reference'
    const Q = l.reduce(function (c, s) {
      return c.concat([s + '-' + h, s + '-' + v])
    }, [])
    const Vt = [].concat(l, [mt]).reduce(function (c, s) {
      return c.concat([s, s + '-' + h, s + '-' + v])
    }, [])
    const Re = 'beforeRead'
    const ze = 'read'
    const Nr = 'afterRead'
    const kr = 'beforeMain'
    const jr = 'main'
    const Ue = 'afterMain'
    const nr = 'beforeWrite'
    const Br = 'write'
    const rr = 'afterWrite'
    const Ie = [Re, ze, Nr, kr, jr, Ue, nr, Br, rr]
    function Hr (c) {
      const s = new Map()
      const b = new Set()
      const _ = []
      c.forEach(function (L) {
        s.set(L.name, L)
      })
      function T (L) {
        b.add(L.name)
        const z = [].concat(L.requires || [], L.requiresIfExists || [])
        z.forEach(function (H) {
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
    function me (c) {
      const s = Hr(c)
      return Ie.reduce(function (b, _) {
        return b.concat(
          s.filter(function (T) {
            return T.phase === _
          })
        )
      }, [])
    }
    function Ve (c) {
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
    function Ae (c) {
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
    const De =
            'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s'
    const $r =
            'Popper: modifier "%s" requires "%s", but "%s" modifier is not available'
    const Qt = [
      'name',
      'enabled',
      'phase',
      'fn',
      'effect',
      'requires',
      'options'
    ]
    function Wr (c) {
      c.forEach(function (s) {
        Object.keys(s).forEach(function (b) {
          switch (b) {
            case 'name':
              typeof s.name !== 'string' &&
                                console.error(
                                  Ae(
                                    De,
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
                                  Ae(
                                    De,
                                    s.name,
                                    '"enabled"',
                                    '"boolean"',
                                    '"' + String(s.enabled) + '"'
                                  )
                                )
            case 'phase':
              Ie.indexOf(s.phase) < 0 &&
                                console.error(
                                  Ae(
                                    De,
                                    s.name,
                                    '"phase"',
                                    'either ' + Ie.join(', '),
                                    '"' + String(s.phase) + '"'
                                  )
                                )
              break
            case 'fn':
              typeof s.fn !== 'function' &&
                                console.error(
                                  Ae(
                                    De,
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
                                  Ae(
                                    De,
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
                                  Ae(
                                    De,
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
                                  Ae(
                                    De,
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
                                    Qt.map(function (_) {
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
                                console.error(Ae($r, String(s.name), _, _))
                        })
        })
      })
    }
    function zr (c, s) {
      const b = new Set()
      return c.filter(function (_) {
        const T = s(_)
        if (!b.has(T)) return b.add(T), !0
      })
    }
    function oe (c) {
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
      let z = 0
      let H = 0
      return (
        _ &&
                    ((T = _.width),
                    (L = _.height),
                    /^((?!chrome|android).)*safari/i.test(
                      navigator.userAgent
                    ) || ((z = _.offsetLeft), (H = _.offsetTop))),
        { width: T, height: L, x: z + m(c), y: H }
      )
    }
    const ge = Math.max
    const ln = Math.min
    const Ye = Math.round
    function or (c) {
      let s
      const b = w(c)
      const _ = n(c)
      const T = (s = c.ownerDocument) == null ? void 0 : s.body
      const L = ge(
        b.scrollWidth,
        b.clientWidth,
        T ? T.scrollWidth : 0,
        T ? T.clientWidth : 0
      )
      const z = ge(
        b.scrollHeight,
        b.clientHeight,
        T ? T.scrollHeight : 0,
        T ? T.clientHeight : 0
      )
      let H = -_.scrollLeft + m(c)
      const G = -_.scrollTop
      return (
        E(T || b).direction === 'rtl' &&
                    (H += ge(b.clientWidth, T ? T.clientWidth : 0) - L),
        { width: L, height: z, x: H, y: G }
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
    function Xe (c) {
      return Object.assign({}, c, {
        left: c.x,
        top: c.y,
        right: c.x + c.width,
        bottom: c.y + c.height
      })
    }
    function ar (c) {
      const s = e(c)
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
      return s === j ? Xe(ir(c)) : o(s) ? ar(s) : Xe(or(w(c)))
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
      const z = T.reduce(
        function (H, G) {
          const ot = sr(c, G)
          return (
            (H.top = ge(ot.top, H.top)),
            (H.right = ln(ot.right, H.right)),
            (H.bottom = ln(ot.bottom, H.bottom)),
            (H.left = ge(ot.left, H.left)),
            H
          )
        },
        sr(c, L)
      )
      return (
        (z.width = z.right - z.left),
        (z.height = z.bottom - z.top),
        (z.x = z.left),
        (z.y = z.top),
        z
      )
    }
    function cn (c) {
      return c.split('-')[1]
    }
    function de (c) {
      return ['top', 'bottom'].indexOf(c) >= 0 ? 'x' : 'y'
    }
    function lr (c) {
      const s = c.reference
      const b = c.element
      const _ = c.placement
      const T = _ ? oe(_) : null
      const L = _ ? cn(_) : null
      const z = s.x + s.width / 2 - b.width / 2
      const H = s.y + s.height / 2 - b.height / 2
      let G
      switch (T) {
        case U:
          G = { x: z, y: s.y - b.height }
          break
        case dt:
          G = { x: z, y: s.y + s.height }
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
      const ot = T ? de(T) : null
      if (ot != null) {
        const V = ot === 'y' ? 'height' : 'width'
        switch (L) {
          case h:
            G[ot] = G[ot] - (s[V] / 2 - b[V] / 2)
            break
          case v:
            G[ot] = G[ot] + (s[V] / 2 - b[V] / 2)
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
    function qe (c, s) {
      s === void 0 && (s = {})
      const b = s
      const _ = b.placement
      const T = _ === void 0 ? c.placement : _
      const L = b.boundary
      const z = L === void 0 ? p : L
      const H = b.rootBoundary
      const G = H === void 0 ? j : H
      const ot = b.elementContext
      const V = ot === void 0 ? P : ot
      const Ct = b.altBoundary
      const Lt = Ct === void 0 ? !1 : Ct
      const Dt = b.padding
      const xt = Dt === void 0 ? 0 : Dt
      const Mt = fr(typeof xt !== 'number' ? xt : ur(xt, l))
      const St = V === P ? R : P
      const Bt = c.elements.reference
      const Rt = c.rects.popper
      const Ht = c.elements[Lt ? St : V]
      const ct = wn(
        i(Ht) ? Ht : Ht.contextElement || w(c.elements.popper),
        z,
        G
      )
      const Pt = e(Bt)
      const _t = lr({
        reference: Pt,
        element: Rt,
        strategy: 'absolute',
        placement: T
      })
      const Nt = Xe(Object.assign({}, Rt, _t))
      const Ft = V === P ? Nt : Pt
      const Yt = {
        top: ct.top - Ft.top + Mt.top,
        bottom: Ft.bottom - ct.bottom + Mt.bottom,
        left: ct.left - Ft.left + Mt.left,
        right: Ft.right - ct.right + Mt.right
      }
      const $t = c.modifiersData.offset
      if (V === P && $t) {
        const zt = $t[T]
        Object.keys(Yt).forEach(function (we) {
          const te = [X, dt].indexOf(we) >= 0 ? 1 : -1
          const Le = [U, dt].indexOf(we) >= 0 ? 'y' : 'x'
          Yt[we] += zt[Le] * te
        })
      }
      return Yt
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
      return function (H, G, ot) {
        ot === void 0 && (ot = L)
        let V = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, xn, L),
          modifiersData: {},
          elements: { reference: H, popper: G },
          attributes: {},
          styles: {}
        }
        let Ct = []
        let Lt = !1
        var Dt = {
          state: V,
          setOptions: function (Bt) {
            Mt(),
            (V.options = Object.assign({}, L, V.options, Bt)),
            (V.scrollParents = {
              reference: i(H)
                ? A(H)
                : H.contextElement
                  ? A(H.contextElement)
                  : [],
              popper: A(G)
            })
            const Rt = me(Ur([].concat(_, V.options.modifiers)))
            V.orderedModifiers = Rt.filter(function ($t) {
              return $t.enabled
            })
            const Ht = zr(
              [].concat(Rt, V.options.modifiers),
              function ($t) {
                const zt = $t.name
                return zt
              }
            )
            if ((Wr(Ht), oe(V.options.placement) === mt)) {
              const ct = V.orderedModifiers.find(function ($t) {
                const zt = $t.name
                return zt === 'flip'
              })
              ct ||
                                console.error(
                                  [
                                    'Popper: "auto" placements require the "flip" modifier be',
                                    'present and enabled to work.'
                                  ].join(' ')
                                )
            }
            const Pt = E(G)
            const _t = Pt.marginTop
            const Nt = Pt.marginRight
            const Ft = Pt.marginBottom
            const Yt = Pt.marginLeft
            return (
              [_t, Nt, Ft, Yt].some(function ($t) {
                return parseFloat($t)
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
              xt(),
              Dt.update()
            )
          },
          forceUpdate: function () {
            if (!Lt) {
              const Bt = V.elements
              const Rt = Bt.reference
              const Ht = Bt.popper
              if (!fn(Rt, Ht)) {
                console.error(dr)
                return
              }
              (V.rects = {
                reference: S(
                  Rt,
                  J(Ht),
                  V.options.strategy === 'fixed'
                ),
                popper: M(Ht)
              }),
              (V.reset = !1),
              (V.placement = V.options.placement),
              V.orderedModifiers.forEach(function (zt) {
                return (V.modifiersData[zt.name] =
                                        Object.assign({}, zt.data))
              })
              for (
                let ct = 0, Pt = 0;
                Pt < V.orderedModifiers.length;
                Pt++
              ) {
                if (((ct += 1), ct > 100)) {
                  console.error(Vr)
                  break
                }
                if (V.reset === !0) {
                  (V.reset = !1), (Pt = -1)
                  continue
                }
                const _t = V.orderedModifiers[Pt]
                const Nt = _t.fn
                const Ft = _t.options
                const Yt = Ft === void 0 ? {} : Ft
                const $t = _t.name
                typeof Nt === 'function' &&
                                    (V =
                                        Nt({
                                          state: V,
                                          options: Yt,
                                          name: $t,
                                          instance: Dt
                                        }) || V)
              }
            }
          },
          update: Ve(function () {
            return new Promise(function (St) {
              Dt.forceUpdate(), St(V)
            })
          }),
          destroy: function () {
            Mt(), (Lt = !0)
          }
        }
        if (!fn(H, G)) return console.error(dr), Dt
        Dt.setOptions(ot).then(function (St) {
          !Lt && ot.onFirstUpdate && ot.onFirstUpdate(St)
        })
        function xt () {
          V.orderedModifiers.forEach(function (St) {
            const Bt = St.name
            const Rt = St.options
            const Ht = Rt === void 0 ? {} : Rt
            const ct = St.effect
            if (typeof ct === 'function') {
              const Pt = ct({
                state: V,
                name: Bt,
                instance: Dt,
                options: Ht
              })
              const _t = function () {}
              Ct.push(Pt || _t)
            }
          })
        }
        function Mt () {
          Ct.forEach(function (St) {
            return St()
          }),
          (Ct = [])
        }
        return Dt
      }
    }
    const On = { passive: !0 }
    function Yr (c) {
      const s = c.state
      const b = c.instance
      const _ = c.options
      const T = _.scroll
      const L = T === void 0 ? !0 : T
      const z = _.resize
      const H = z === void 0 ? !0 : z
      const G = r(s.elements.popper)
      const ot = [].concat(
        s.scrollParents.reference,
        s.scrollParents.popper
      )
      return (
        L &&
                    ot.forEach(function (V) {
                      V.addEventListener('scroll', b.update, On)
                    }),
        H && G.addEventListener('resize', b.update, On),
        function () {
          L &&
                        ot.forEach(function (V) {
                          V.removeEventListener('scroll', b.update, On)
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
      effect: Yr,
      data: {}
    }
    function Xr (c) {
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
      fn: Xr,
      data: {}
    }
    const qr = {
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto'
    }
    function Gr (c) {
      const s = c.x
      const b = c.y
      const _ = window
      const T = _.devicePixelRatio || 1
      return { x: Ye(Ye(s * T) / T) || 0, y: Ye(Ye(b * T) / T) || 0 }
    }
    function Hn (c) {
      let s
      const b = c.popper
      const _ = c.popperRect
      const T = c.placement
      const L = c.offsets
      const z = c.position
      const H = c.gpuAcceleration
      const G = c.adaptive
      const ot = c.roundOffsets
      const V = ot === !0 ? Gr(L) : typeof ot === 'function' ? ot(L) : L
      const Ct = V.x
      let Lt = Ct === void 0 ? 0 : Ct
      const Dt = V.y
      let xt = Dt === void 0 ? 0 : Dt
      const Mt = L.hasOwnProperty('x')
      const St = L.hasOwnProperty('y')
      let Bt = Z
      let Rt = U
      const Ht = window
      if (G) {
        let ct = J(b)
        let Pt = 'clientHeight'
        let _t = 'clientWidth'
        ct === r(b) &&
                    ((ct = w(b)),
                    E(ct).position !== 'static' &&
                        ((Pt = 'scrollHeight'), (_t = 'scrollWidth'))),
        (ct = ct),
        T === U &&
                        ((Rt = dt),
                        (xt -= ct[Pt] - _.height),
                        (xt *= H ? 1 : -1)),
        T === Z &&
                        ((Bt = X),
                        (Lt -= ct[_t] - _.width),
                        (Lt *= H ? 1 : -1))
      }
      const Nt = Object.assign({ position: z }, G && qr)
      if (H) {
        let Ft
        return Object.assign(
          {},
          Nt,
          ((Ft = {}),
          (Ft[Rt] = St ? '0' : ''),
          (Ft[Bt] = Mt ? '0' : ''),
          (Ft.transform =
                        (Ht.devicePixelRatio || 1) < 2
                          ? 'translate(' + Lt + 'px, ' + xt + 'px)'
                          : 'translate3d(' + Lt + 'px, ' + xt + 'px, 0)'),
          Ft)
        )
      }
      return Object.assign(
        {},
        Nt,
        ((s = {}),
        (s[Rt] = St ? xt + 'px' : ''),
        (s[Bt] = Mt ? Lt + 'px' : ''),
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
      const z = L === void 0 ? !0 : L
      const H = b.roundOffsets
      const G = H === void 0 ? !0 : H
      const ot = E(s.elements.popper).transitionProperty || ''
      z &&
                ['transform', 'top', 'right', 'bottom', 'left'].some(
                  function (Ct) {
                    return ot.indexOf(Ct) >= 0
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
      const V = {
        placement: oe(s.placement),
        popper: s.elements.popper,
        popperRect: s.rects.popper,
        gpuAcceleration: T
      }
      s.modifiersData.popperOffsets != null &&
                (s.styles.popper = Object.assign(
                  {},
                  s.styles.popper,
                  Hn(
                    Object.assign({}, V, {
                      offsets: s.modifiersData.popperOffsets,
                      position: s.options.strategy,
                      adaptive: z,
                      roundOffsets: G
                    })
                  )
                )),
      s.modifiersData.arrow != null &&
                    (s.styles.arrow = Object.assign(
                      {},
                      s.styles.arrow,
                      Hn(
                        Object.assign({}, V, {
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
                    Object.keys(T).forEach(function (z) {
                      const H = T[z]
                      H === !1
                        ? L.removeAttribute(z)
                        : L.setAttribute(z, H === !0 ? '' : H)
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
            const z = Object.keys(
              s.styles.hasOwnProperty(_) ? s.styles[_] : b[_]
            )
            const H = z.reduce(function (G, ot) {
              return (G[ot] = ''), G
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
      const _ = oe(c)
      const T = [Z, U].indexOf(_) >= 0 ? -1 : 1
      const L =
                typeof b === 'function'
                  ? b(Object.assign({}, s, { placement: c }))
                  : b
      let z = L[0]
      let H = L[1]
      return (
        (z = z || 0),
        (H = (H || 0) * T),
        [Z, X].indexOf(_) >= 0 ? { x: H, y: z } : { x: z, y: H }
      )
    }
    function B (c) {
      const s = c.state
      const b = c.options
      const _ = c.name
      const T = b.offset
      const L = T === void 0 ? [0, 0] : T
      const z = Vt.reduce(function (V, Ct) {
        return (V[Ct] = W(Ct, s.rects, L)), V
      }, {})
      const H = z[s.placement]
      const G = H.x
      const ot = H.y
      s.modifiersData.popperOffsets != null &&
                ((s.modifiersData.popperOffsets.x += G),
                (s.modifiersData.popperOffsets.y += ot)),
      (s.modifiersData[_] = z)
    }
    const bt = {
      name: 'offset',
      enabled: !0,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: B
    }
    const lt = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    }
    function pt (c) {
      return c.replace(/left|right|bottom|top/g, function (s) {
        return lt[s]
      })
    }
    const yt = { start: 'end', end: 'start' }
    function Tt (c) {
      return c.replace(/start|end/g, function (s) {
        return yt[s]
      })
    }
    function jt (c, s) {
      s === void 0 && (s = {})
      const b = s
      const _ = b.placement
      const T = b.boundary
      const L = b.rootBoundary
      const z = b.padding
      const H = b.flipVariations
      const G = b.allowedAutoPlacements
      const ot = G === void 0 ? Vt : G
      const V = cn(_)
      const Ct = V
        ? H
          ? Q
          : Q.filter(function (xt) {
            return cn(xt) === V
          })
        : l
      let Lt = Ct.filter(function (xt) {
        return ot.indexOf(xt) >= 0
      })
      Lt.length === 0 &&
                ((Lt = Ct),
                console.error(
                  [
                    'Popper: The `allowedAutoPlacements` option did not allow any',
                    'placements. Ensure the `placement` option matches the variation',
                    'of the allowed placements.',
                    'For example, "auto" cannot be used to allow "bottom-start".',
                    'Use "auto-start" instead.'
                  ].join(' ')
                ))
      const Dt = Lt.reduce(function (xt, Mt) {
        return (
          (xt[Mt] = qe(c, {
            placement: Mt,
            boundary: T,
            rootBoundary: L,
            padding: z
          })[oe(Mt)]),
          xt
        )
      }, {})
      return Object.keys(Dt).sort(function (xt, Mt) {
        return Dt[xt] - Dt[Mt]
      })
    }
    function At (c) {
      if (oe(c) === mt) return []
      const s = pt(c)
      return [Tt(c), s, Tt(s)]
    }
    function It (c) {
      const s = c.state
      const b = c.options
      const _ = c.name
      if (!s.modifiersData[_]._skip) {
        for (
          var T = b.mainAxis,
            L = T === void 0 ? !0 : T,
            z = b.altAxis,
            H = z === void 0 ? !0 : z,
            G = b.fallbackPlacements,
            ot = b.padding,
            V = b.boundary,
            Ct = b.rootBoundary,
            Lt = b.altBoundary,
            Dt = b.flipVariations,
            xt = Dt === void 0 ? !0 : Dt,
            Mt = b.allowedAutoPlacements,
            St = s.options.placement,
            Bt = oe(St),
            Rt = Bt === St,
            Ht = G || (Rt || !xt ? [pt(St)] : At(St)),
            ct = [St].concat(Ht).reduce(function (et, gt) {
              return et.concat(
                oe(gt) === mt
                  ? jt(s, {
                    placement: gt,
                    boundary: V,
                    rootBoundary: Ct,
                    padding: ot,
                    flipVariations: xt,
                    allowedAutoPlacements: Mt
                  })
                  : gt
              )
            }, []),
            Pt = s.rects.reference,
            _t = s.rects.popper,
            Nt = new Map(),
            Ft = !0,
            Yt = ct[0],
            $t = 0;
          $t < ct.length;
          $t++
        ) {
          const zt = ct[$t]
          const we = oe(zt)
          const te = cn(zt) === h
          const Le = [U, dt].indexOf(we) >= 0
          const dn = Le ? 'width' : 'height'
          const Ze = qe(s, {
            placement: zt,
            boundary: V,
            rootBoundary: Ct,
            altBoundary: Lt,
            padding: ot
          })
          let Ne = Le ? (te ? X : Z) : te ? dt : U
          Pt[dn] > _t[dn] && (Ne = pt(Ne))
          const $n = pt(Ne)
          const Qe = []
          if (
            (L && Qe.push(Ze[we] <= 0),
            H && Qe.push(Ze[Ne] <= 0, Ze[$n] <= 0),
            Qe.every(function (et) {
              return et
            }))
          ) {
            (Yt = zt), (Ft = !1)
            break
          }
          Nt.set(zt, Qe)
        }
        if (Ft) {
          for (
            let Sn = xt ? 3 : 1,
              Wn = function (gt) {
                const wt = ct.find(function (Kt) {
                  const Jt = Nt.get(Kt)
                  if (Jt) {
                    return Jt.slice(0, gt).every(
                      function (Ce) {
                        return Ce
                      }
                    )
                  }
                })
                if (wt) return (Yt = wt), 'break'
              },
              C = Sn;
            C > 0;
            C--
          ) {
            const K = Wn(C)
            if (K === 'break') break
          }
        }
        s.placement !== Yt &&
                    ((s.modifiersData[_]._skip = !0),
                    (s.placement = Yt),
                    (s.reset = !0))
      }
    }
    const rt = {
      name: 'flip',
      enabled: !0,
      phase: 'main',
      fn: It,
      requiresIfExists: ['offset'],
      data: { _skip: !1 }
    }
    function ht (c) {
      return c === 'x' ? 'y' : 'x'
    }
    function vt (c, s, b) {
      return ge(c, ln(s, b))
    }
    function tt (c) {
      const s = c.state
      const b = c.options
      const _ = c.name
      const T = b.mainAxis
      const L = T === void 0 ? !0 : T
      const z = b.altAxis
      const H = z === void 0 ? !1 : z
      const G = b.boundary
      const ot = b.rootBoundary
      const V = b.altBoundary
      const Ct = b.padding
      const Lt = b.tether
      const Dt = Lt === void 0 ? !0 : Lt
      const xt = b.tetherOffset
      const Mt = xt === void 0 ? 0 : xt
      const St = qe(s, {
        boundary: G,
        rootBoundary: ot,
        padding: Ct,
        altBoundary: V
      })
      const Bt = oe(s.placement)
      const Rt = cn(s.placement)
      const Ht = !Rt
      const ct = de(Bt)
      const Pt = ht(ct)
      const _t = s.modifiersData.popperOffsets
      const Nt = s.rects.reference
      const Ft = s.rects.popper
      const Yt =
                typeof Mt === 'function'
                  ? Mt(
                    Object.assign({}, s.rects, {
                      placement: s.placement
                    })
                  )
                  : Mt
      const $t = { x: 0, y: 0 }
      if (_t) {
        if (L || H) {
          const zt = ct === 'y' ? U : Z
          const we = ct === 'y' ? dt : X
          const te = ct === 'y' ? 'height' : 'width'
          const Le = _t[ct]
          const dn = _t[ct] + St[zt]
          const Ze = _t[ct] - St[we]
          const Ne = Dt ? -Ft[te] / 2 : 0
          const $n = Rt === h ? Nt[te] : Ft[te]
          const Qe = Rt === h ? -Ft[te] : -Nt[te]
          const Sn = s.elements.arrow
          const Wn = Dt && Sn ? M(Sn) : { width: 0, height: 0 }
          const C = s.modifiersData['arrow#persistent']
            ? s.modifiersData['arrow#persistent'].padding
            : cr()
          const K = C[zt]
          const et = C[we]
          const gt = vt(0, Nt[te], Wn[te])
          const wt = Ht
            ? Nt[te] / 2 - Ne - gt - K - Yt
            : $n - gt - K - Yt
          const Kt = Ht
            ? -Nt[te] / 2 + Ne + gt + et + Yt
            : Qe + gt + et + Yt
          const Jt = s.elements.arrow && J(s.elements.arrow)
          const Ce = Jt
            ? ct === 'y'
              ? Jt.clientTop || 0
              : Jt.clientLeft || 0
            : 0
          const zn = s.modifiersData.offset
            ? s.modifiersData.offset[s.placement][ct]
            : 0
          const _e = _t[ct] + wt - zn - Ce
          const An = _t[ct] + Kt - zn
          if (L) {
            const pn = vt(
              Dt ? ln(dn, _e) : dn,
              Le,
              Dt ? ge(Ze, An) : Ze
            );
            (_t[ct] = pn), ($t[ct] = pn - Le)
          }
          if (H) {
            const tn = ct === 'x' ? U : Z
            const Kr = ct === 'x' ? dt : X
            const en = _t[Pt]
            const hn = en + St[tn]
            const _i = en - St[Kr]
            const Ti = vt(
              Dt ? ln(hn, _e) : hn,
              en,
              Dt ? ge(_i, An) : _i
            );
            (_t[Pt] = Ti), ($t[Pt] = Ti - en)
          }
        }
        s.modifiersData[_] = $t
      }
    }
    const it = {
      name: 'preventOverflow',
      enabled: !0,
      phase: 'main',
      fn: tt,
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
    function Gt (c) {
      let s
      const b = c.state
      const _ = c.name
      const T = c.options
      const L = b.elements.arrow
      const z = b.modifiersData.popperOffsets
      const H = oe(b.placement)
      const G = de(H)
      const ot = [Z, X].indexOf(H) >= 0
      const V = ot ? 'height' : 'width'
      if (!(!L || !z)) {
        const Ct = x(T.padding, b)
        const Lt = M(L)
        const Dt = G === 'y' ? U : Z
        const xt = G === 'y' ? dt : X
        const Mt =
                    b.rects.reference[V] +
                    b.rects.reference[G] -
                    z[G] -
                    b.rects.popper[V]
        const St = z[G] - b.rects.reference[G]
        const Bt = J(L)
        const Rt = Bt
          ? G === 'y'
            ? Bt.clientHeight || 0
            : Bt.clientWidth || 0
          : 0
        const Ht = Mt / 2 - St / 2
        const ct = Ct[Dt]
        const Pt = Rt - Lt[V] - Ct[xt]
        const _t = Rt / 2 - Lt[V] / 2 + Ht
        const Nt = vt(ct, _t, Pt)
        const Ft = G
        b.modifiersData[_] =
                    ((s = {}), (s[Ft] = Nt), (s.centerOffset = Nt - _t), s)
      }
    }
    function ft (c) {
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
    const Fe = {
      name: 'arrow',
      enabled: !0,
      phase: 'main',
      fn: Gt,
      effect: ft,
      requires: ['popperOffsets'],
      requiresIfExists: ['preventOverflow']
    }
    function be (c, s, b) {
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
    function Ge (c) {
      return [U, X, dt, Z].some(function (s) {
        return c[s] >= 0
      })
    }
    function Ke (c) {
      const s = c.state
      const b = c.name
      const _ = s.rects.reference
      const T = s.rects.popper
      const L = s.modifiersData.preventOverflow
      const z = qe(s, { elementContext: 'reference' })
      const H = qe(s, { altBoundary: !0 })
      const G = be(z, _)
      const ot = be(H, T, L)
      const V = Ge(G)
      const Ct = Ge(ot);
      (s.modifiersData[b] = {
        referenceClippingOffsets: G,
        popperEscapeOffsets: ot,
        isReferenceHidden: V,
        hasPopperEscaped: Ct
      }),
      (s.attributes.popper = Object.assign({}, s.attributes.popper, {
        'data-popper-reference-hidden': V,
        'data-popper-escaped': Ct
      }))
    }
    const Je = {
      name: 'hide',
      enabled: !0,
      phase: 'main',
      requiresIfExists: ['preventOverflow'],
      fn: Ke
    }
    const re = [jn, Bn, y, q]
    const le = En({ defaultModifiers: re })
    const ye = [jn, Bn, y, q, bt, rt, it, Fe, Je]
    const un = En({ defaultModifiers: ye });
    (t.applyStyles = q),
    (t.arrow = Fe),
    (t.computeStyles = y),
    (t.createPopper = un),
    (t.createPopperLite = le),
    (t.defaultModifiers = ye),
    (t.detectOverflow = qe),
    (t.eventListeners = jn),
    (t.flip = rt),
    (t.hide = Je),
    (t.offset = bt),
    (t.popperGenerator = En),
    (t.popperOffsets = Bn),
    (t.preventOverflow = it)
  })
  const Wo = Ho((t) => {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    const e = As()
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
    function M (g) {
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
    function nt (g) {
      return Object.keys(g).reduce(function (y, D) {
        return g[D] !== void 0 && (y[D] = g[D]), y
      }, {})
    }
    function J () {
      return document.createElement('div')
    }
    function U (g) {
      return ['Element', 'Fragment'].some(function (y) {
        return m(g, y)
      })
    }
    function dt (g) {
      return m(g, 'NodeList')
    }
    function X (g) {
      return m(g, 'MouseEvent')
    }
    function Z (g) {
      return !!(g && g._tippy && g._tippy.reference === g)
    }
    function mt (g) {
      return U(g)
        ? [g]
        : dt(g)
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
        const bt = q.props
        const lt = bt.interactiveBorder
        const pt = k(B.placement)
        const yt = B.modifiersData.offset
        if (!yt) return !0
        const Tt = pt === 'bottom' ? yt.top.y : 0
        const jt = pt === 'top' ? yt.bottom.y : 0
        const At = pt === 'right' ? yt.left.x : 0
        const It = pt === 'left' ? yt.right.x : 0
        const rt = W.top - F + Tt > lt
        const ht = F - W.bottom - jt > lt
        const vt = W.left - D + At > lt
        const tt = D - W.right - It > lt
        return rt || ht || vt || tt
      })
    }
    function j (g, y, D) {
      const F = y + 'EventListener';
      ['transitionend', 'webkitTransitionEnd'].forEach(function (q) {
        g[F](q, D)
      })
    }
    const P = { isTouch: !1 }
    let R = 0
    function Q () {
      P.isTouch ||
                ((P.isTouch = !0),
                window.performance &&
                    document.addEventListener('mousemove', Vt))
    }
    function Vt () {
      const g = performance.now()
      g - R < 20 &&
                ((P.isTouch = !1),
                document.removeEventListener('mousemove', Vt)),
      (R = g)
    }
    function Re () {
      const g = document.activeElement
      if (Z(g)) {
        const y = g._tippy
        g.blur && !y.state.isVisible && g.blur()
      }
    }
    function ze () {
      document.addEventListener('touchstart', Q, f),
      window.addEventListener('blur', Re)
    }
    const Nr = typeof window < 'u' && typeof document < 'u'
    const kr = Nr ? navigator.userAgent : ''
    const jr = /MSIE |Trident\//.test(kr)
    function Ue (g) {
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
    function Br (g) {
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
        Br(g),
        'color: #00C584; font-size: 1.3em; font-weight: bold;',
        'line-height: 1.5',
        'color: #a6a095;'
      ]
    }
    let Ie
    Hr()
    function Hr () {
      Ie = new Set()
    }
    function me (g, y) {
      if (g && !Ie.has(y)) {
        let D
        Ie.add(y), (D = console).warn.apply(D, rr(y))
      }
    }
    function Ve (g, y) {
      if (g && !Ie.has(y)) {
        let D
        Ie.add(y), (D = console).error.apply(D, rr(y))
      }
    }
    function Ae (g) {
      const y = !g
      const D =
                Object.prototype.toString.call(g) === '[object Object]' &&
                !g.addEventListener
      Ve(
        y,
        [
          'tippy() was passed',
          '`' + String(g) + '`',
          'as its targets (first) argument. Valid types are: String, Element,',
          'Element[], or NodeList.'
        ].join(' ')
      ),
      Ve(
        D,
        [
          'tippy() was passed a plain object which is not supported as an argument',
          'for virtual positioning. Use props.getReferenceClientRect instead.'
        ].join(' ')
      )
    }
    const De = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1
    }
    const $r = {
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
    const Qt = Object.assign(
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
      De,
      {},
      $r
    )
    const Wr = Object.keys(Qt)
    const zr = function (y) {
      ge(y, [])
      const D = Object.keys(y)
      D.forEach(function (F) {
        Qt[F] = y[F]
      })
    }
    function oe (g) {
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
        ? Object.keys(oe(Object.assign({}, Qt, { plugins: y })))
        : Wr
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
        (D.aria = Object.assign({}, Qt.aria, {}, D.aria)),
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
    function ge (g, y) {
      g === void 0 && (g = {}), y === void 0 && (y = [])
      const D = Object.keys(g)
      D.forEach(function (F) {
        const q = S(Qt, Object.keys(De))
        let W = !u(q, F)
        W &&
                    (W =
                        y.filter(function (B) {
                          return B.name === F
                        }).length === 0),
        me(
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
    function Ye (g, y) {
      g[ln()] = y
    }
    function or (g) {
      const y = J()
      return (
        g === !0
          ? (y.className = a)
          : ((y.className = d), U(g) ? y.appendChild(g) : Ye(y, g)),
        y
      )
    }
    function kn (g, y) {
      U(y.content)
        ? (Ye(g, ''), g.appendChild(y.content))
        : typeof y.content !== 'function' &&
                  (y.allowHTML
                    ? Ye(g, y.content)
                    : (g.textContent = y.content))
    }
    function Xe (g) {
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
        const bt = Xe(y)
        const lt = bt.box
        const pt = bt.content
        const yt = bt.arrow
        B.theme
          ? lt.setAttribute('data-theme', B.theme)
          : lt.removeAttribute('data-theme'),
        typeof B.animation === 'string'
          ? lt.setAttribute('data-animation', B.animation)
          : lt.removeAttribute('data-animation'),
        B.inertia
          ? lt.setAttribute('data-inertia', '')
          : lt.removeAttribute('data-inertia'),
        (lt.style.maxWidth =
                        typeof B.maxWidth === 'number'
                          ? B.maxWidth + 'px'
                          : B.maxWidth),
        B.role
          ? lt.setAttribute('role', B.role)
          : lt.removeAttribute('role'),
        (W.content !== B.content || W.allowHTML !== B.allowHTML) &&
                        kn(pt, g.props),
        B.arrow
          ? yt
            ? W.arrow !== B.arrow &&
                              (lt.removeChild(yt), lt.appendChild(or(B.arrow)))
            : lt.appendChild(or(B.arrow))
          : yt && lt.removeChild(yt)
      }
      return { popper: y, onUpdate: q }
    }
    ar.$$tippy = !0
    let sr = 1
    let yn = []
    let wn = []
    function cn (g, y) {
      const D = ir(g, Object.assign({}, Qt, {}, oe(nt(y))))
      let F
      let q
      let W
      let B = !1
      let bt = !1
      let lt = !1
      let pt = !1
      let yt
      let Tt
      let jt
      let At = []
      let It = O(Rt, D.interactiveDebounce)
      let rt
      const ht = sr++
      const vt = null
      const tt = A(D.plugins)
      const it = {
        isEnabled: !0,
        isVisible: !1,
        isDestroyed: !1,
        isMounted: !1,
        isShown: !1
      }
      const x = {
        id: ht,
        reference: g,
        popper: J(),
        popperInstance: vt,
        props: D,
        state: it,
        plugins: tt,
        clearDelayTimeouts: Le,
        setProps: dn,
        setContent: Ze,
        show: Ne,
        hide: $n,
        hideWithInteractivity: Qe,
        enable: we,
        disable: te,
        unmount: Sn,
        destroy: Wn
      }
      if (!D.render) {
        return Ve(!0, 'render() function has not been supplied.'), x
      }
      const Gt = D.render(x)
      const ft = Gt.popper
      const Fe = Gt.onUpdate
      ft.setAttribute('data-tippy-root', ''),
      (ft.id = 'tippy-' + x.id),
      (x.popper = ft),
      (g._tippy = x),
      (ft._tippy = x)
      const be = tt.map(function (C) {
        return C.fn(x)
      })
      const Ge = g.hasAttribute('aria-expanded')
      return (
        Mt(),
        T(),
        s(),
        b('onCreate', [x]),
        D.showOnCreate && $t(),
        ft.addEventListener('mouseenter', function () {
          x.props.interactive &&
                        x.state.isVisible &&
                        x.clearDelayTimeouts()
        }),
        ft.addEventListener('mouseleave', function (C) {
          x.props.interactive &&
                        x.props.trigger.indexOf('mouseenter') >= 0 &&
                        (ye().addEventListener('mousemove', It), It(C))
        }),
        x
      )
      function Ke () {
        const C = x.props.touch
        return Array.isArray(C) ? C : [C, 0]
      }
      function Je () {
        return Ke()[0] === 'hold'
      }
      function re () {
        let C
        return !!((C = x.props.render) != null && C.$$tippy)
      }
      function le () {
        return rt || g
      }
      function ye () {
        const C = le().parentNode
        return C ? v(C) : document
      }
      function un () {
        return Xe(ft)
      }
      function c (C) {
        return (x.state.isMounted && !x.state.isVisible) ||
                    P.isTouch ||
                    (yt && yt.type === 'focus')
          ? 0
          : w(x.props.delay, C ? 0 : 1, Qt.delay)
      }
      function s () {
        (ft.style.pointerEvents =
                    x.props.interactive && x.state.isVisible ? '' : 'none'),
        (ft.style.zIndex = '' + x.props.zIndex)
      }
      function b (C, K, et) {
        if (
          (et === void 0 && (et = !0),
          be.forEach(function (wt) {
            wt[C] && wt[C].apply(void 0, K)
          }),
          et)
        ) {
          let gt;
          (gt = x.props)[C].apply(gt, K)
        }
      }
      function _ () {
        const C = x.props.aria
        if (C.content) {
          const K = 'aria-' + C.content
          const et = ft.id
          const gt = I(x.props.triggerTarget || g)
          gt.forEach(function (wt) {
            const Kt = wt.getAttribute(K)
            if (x.state.isVisible) {
              wt.setAttribute(K, Kt ? Kt + ' ' + et : et)
            } else {
              const Jt = Kt && Kt.replace(et, '').trim()
              Jt ? wt.setAttribute(K, Jt) : wt.removeAttribute(K)
            }
          })
        }
      }
      function T () {
        if (!(Ge || !x.props.aria.expanded)) {
          const C = I(x.props.triggerTarget || g)
          C.forEach(function (K) {
            x.props.interactive
              ? K.setAttribute(
                'aria-expanded',
                x.state.isVisible && K === le()
                  ? 'true'
                  : 'false'
              )
              : K.removeAttribute('aria-expanded')
          })
        }
      }
      function L () {
        ye().removeEventListener('mousemove', It),
        (yn = yn.filter(function (C) {
          return C !== It
        }))
      }
      function z (C) {
        if (
          !(P.isTouch && (lt || C.type === 'mousedown')) &&
                    !(x.props.interactive && ft.contains(C.target))
        ) {
          if (le().contains(C.target)) {
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
                        (bt = !0),
                        setTimeout(function () {
                          bt = !1
                        }),
                        x.state.isMounted || V())
        }
      }
      function H () {
        lt = !0
      }
      function G () {
        lt = !1
      }
      function ot () {
        const C = ye()
        C.addEventListener('mousedown', z, !0),
        C.addEventListener('touchend', z, f),
        C.addEventListener('touchstart', G, f),
        C.addEventListener('touchmove', H, f)
      }
      function V () {
        const C = ye()
        C.removeEventListener('mousedown', z, !0),
        C.removeEventListener('touchend', z, f),
        C.removeEventListener('touchstart', G, f),
        C.removeEventListener('touchmove', H, f)
      }
      function Ct (C, K) {
        Dt(C, function () {
          !x.state.isVisible &&
                        ft.parentNode &&
                        ft.parentNode.contains(ft) &&
                        K()
        })
      }
      function Lt (C, K) {
        Dt(C, K)
      }
      function Dt (C, K) {
        const et = un().box
        function gt (wt) {
          wt.target === et && (j(et, 'remove', gt), K())
        }
        if (C === 0) return K()
        j(et, 'remove', Tt), j(et, 'add', gt), (Tt = gt)
      }
      function xt (C, K, et) {
        et === void 0 && (et = !1)
        const gt = I(x.props.triggerTarget || g)
        gt.forEach(function (wt) {
          wt.addEventListener(C, K, et),
          At.push({
            node: wt,
            eventType: C,
            handler: K,
            options: et
          })
        })
      }
      function Mt () {
        Je() &&
                    (xt('touchstart', Bt, { passive: !0 }),
                    xt('touchend', Ht, { passive: !0 })),
        M(x.props.trigger).forEach(function (C) {
          if (C !== 'manual') {
            switch ((xt(C, Bt), C)) {
              case 'mouseenter':
                xt('mouseleave', Ht)
                break
              case 'focus':
                xt(jr ? 'focusout' : 'blur', ct)
                break
              case 'focusin':
                xt('focusout', ct)
                break
            }
          }
        })
      }
      function St () {
        At.forEach(function (C) {
          const K = C.node
          const et = C.eventType
          const gt = C.handler
          const wt = C.options
          K.removeEventListener(et, gt, wt)
        }),
        (At = [])
      }
      function Bt (C) {
        let K
        let et = !1
        if (!(!x.state.isEnabled || Pt(C) || bt)) {
          const gt = ((K = yt) == null ? void 0 : K.type) === 'focus';
          (yt = C),
          (rt = C.currentTarget),
          T(),
          !x.state.isVisible &&
                            X(C) &&
                            yn.forEach(function (wt) {
                              return wt(C)
                            }),
          C.type === 'click' &&
                        (x.props.trigger.indexOf('mouseenter') < 0 || B) &&
                        x.props.hideOnClick !== !1 &&
                        x.state.isVisible
            ? (et = !0)
            : $t(C),
          C.type === 'click' && (B = !et),
          et && !gt && zt(C)
        }
      }
      function Rt (C) {
        const K = C.target
        const et = le().contains(K) || ft.contains(K)
        if (!(C.type === 'mousemove' && et)) {
          const gt = Yt()
            .concat(ft)
            .map(function (wt) {
              let Kt
              const Jt = wt._tippy
              const Ce =
                                (Kt = Jt.popperInstance) == null
                                  ? void 0
                                  : Kt.state
              return Ce
                ? {
                    popperRect: wt.getBoundingClientRect(),
                    popperState: Ce,
                    props: D
                  }
                : null
            })
            .filter(Boolean)
          p(gt, C) && (L(), zt(C))
        }
      }
      function Ht (C) {
        const K = Pt(C) || (x.props.trigger.indexOf('click') >= 0 && B)
        if (!K) {
          if (x.props.interactive) {
            x.hideWithInteractivity(C)
            return
          }
          zt(C)
        }
      }
      function ct (C) {
        (x.props.trigger.indexOf('focusin') < 0 && C.target !== le()) ||
                    (x.props.interactive &&
                        C.relatedTarget &&
                        ft.contains(C.relatedTarget)) ||
                    zt(C)
      }
      function Pt (C) {
        return P.isTouch ? Je() !== C.type.indexOf('touch') >= 0 : !1
      }
      function _t () {
        Nt()
        const C = x.props
        const K = C.popperOptions
        const et = C.placement
        const gt = C.offset
        const wt = C.getReferenceClientRect
        const Kt = C.moveTransition
        const Jt = re() ? Xe(ft).arrow : null
        const Ce = wt
          ? {
              getBoundingClientRect: wt,
              contextElement: wt.contextElement || le()
            }
          : g
        const zn = {
          name: '$$tippy',
          enabled: !0,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn: function (pn) {
            const tn = pn.state
            if (re()) {
              const Kr = un()
              const en = Kr.box;
              [
                'placement',
                'reference-hidden',
                'escaped'
              ].forEach(function (hn) {
                hn === 'placement'
                  ? en.setAttribute(
                    'data-placement',
                    tn.placement
                  )
                  : tn.attributes.popper['data-popper-' + hn]
                    ? en.setAttribute('data-' + hn, '')
                    : en.removeAttribute('data-' + hn)
              }),
              (tn.attributes.popper = {})
            }
          }
        }
        const _e = [
          { name: 'offset', options: { offset: gt } },
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
            options: { adaptive: !Kt }
          },
          zn
        ]
        re() &&
                    Jt &&
                    _e.push({
                      name: 'arrow',
                      options: { element: Jt, padding: 3 }
                    }),
        _e.push.apply(_e, K?.modifiers || []),
        (x.popperInstance = e.createPopper(
          Ce,
          ft,
          Object.assign({}, K, {
            placement: et,
            onFirstUpdate: jt,
            modifiers: _e
          })
        ))
      }
      function Nt () {
        x.popperInstance &&
                    (x.popperInstance.destroy(), (x.popperInstance = null))
      }
      function Ft () {
        const C = x.props.appendTo
        let K
        const et = le();
        (x.props.interactive && C === Qt.appendTo) || C === 'parent'
          ? (K = et.parentNode)
          : (K = E(C, [et])),
        K.contains(ft) || K.appendChild(ft),
        _t(),
        me(
          x.props.interactive &&
                            C === Qt.appendTo &&
                            et.nextElementSibling !== ft,
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
      function Yt () {
        return Y(ft.querySelectorAll('[data-tippy-root]'))
      }
      function $t (C) {
        x.clearDelayTimeouts(), C && b('onTrigger', [x, C]), ot()
        let K = c(!0)
        const et = Ke()
        const gt = et[0]
        const wt = et[1]
        P.isTouch && gt === 'hold' && wt && (K = wt),
        K
          ? (F = setTimeout(function () {
              x.show()
            }, K))
          : x.show()
      }
      function zt (C) {
        if (
          (x.clearDelayTimeouts(),
          b('onUntrigger', [x, C]),
          !x.state.isVisible)
        ) {
          V()
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
      function we () {
        x.state.isEnabled = !0
      }
      function te () {
        x.hide(), (x.state.isEnabled = !1)
      }
      function Le () {
        clearTimeout(F), clearTimeout(q), cancelAnimationFrame(W)
      }
      function dn (C) {
        if (
          (me(x.state.isDestroyed, Ue('setProps')),
          !x.state.isDestroyed)
        ) {
          b('onBeforeUpdate', [x, C]), St()
          const K = x.props
          const et = ir(
            g,
            Object.assign({}, x.props, {}, C, {
              ignoreAttributes: !0
            })
          );
          (x.props = et),
          Mt(),
          K.interactiveDebounce !== et.interactiveDebounce &&
                            (L(), (It = O(Rt, et.interactiveDebounce))),
          K.triggerTarget && !et.triggerTarget
            ? I(K.triggerTarget).forEach(function (gt) {
              gt.removeAttribute('aria-expanded')
            })
            : et.triggerTarget &&
                              g.removeAttribute('aria-expanded'),
          T(),
          s(),
          Fe && Fe(K, et),
          x.popperInstance &&
                            (_t(),
                            Yt().forEach(function (gt) {
                              requestAnimationFrame(
                                gt._tippy.popperInstance.forceUpdate
                              )
                            })),
          b('onAfterUpdate', [x, C])
        }
      }
      function Ze (C) {
        x.setProps({ content: C })
      }
      function Ne () {
        me(x.state.isDestroyed, Ue('show'))
        const C = x.state.isVisible
        const K = x.state.isDestroyed
        const et = !x.state.isEnabled
        const gt = P.isTouch && !x.props.touch
        const wt = w(x.props.duration, 0, Qt.duration)
        if (
          !(C || K || et || gt) &&
                    !le().hasAttribute('disabled') &&
                    (b('onShow', [x], !1), x.props.onShow(x) !== !1)
        ) {
          if (
            ((x.state.isVisible = !0),
            re() && (ft.style.visibility = 'visible'),
            s(),
            ot(),
            x.state.isMounted || (ft.style.transition = 'none'),
            re())
          ) {
            const Kt = un()
            const Jt = Kt.box
            const Ce = Kt.content
            l([Jt, Ce], 0)
          }
          (jt = function () {
            let _e
            if (!(!x.state.isVisible || pt)) {
              if (
                ((pt = !0),
                ft.offsetHeight,
                (ft.style.transition = x.props.moveTransition),
                re() && x.props.animation)
              ) {
                const An = un()
                const pn = An.box
                const tn = An.content
                l([pn, tn], wt), h([pn, tn], 'visible')
              }
              _(),
              T(),
              $(wn, x),
              (_e = x.popperInstance) == null ||
                                    _e.forceUpdate(),
              (x.state.isMounted = !0),
              b('onMount', [x]),
              x.props.animation &&
                                    re() &&
                                    Lt(wt, function () {
                                      (x.state.isShown = !0),
                                      b('onShown', [x])
                                    })
            }
          }),
          Ft()
        }
      }
      function $n () {
        me(x.state.isDestroyed, Ue('hide'))
        const C = !x.state.isVisible
        const K = x.state.isDestroyed
        const et = !x.state.isEnabled
        const gt = w(x.props.duration, 1, Qt.duration)
        if (
          !(C || K || et) &&
                    (b('onHide', [x], !1), x.props.onHide(x) !== !1)
        ) {
          if (
            ((x.state.isVisible = !1),
            (x.state.isShown = !1),
            (pt = !1),
            (B = !1),
            re() && (ft.style.visibility = 'hidden'),
            L(),
            V(),
            s(),
            re())
          ) {
            const wt = un()
            const Kt = wt.box
            const Jt = wt.content
            x.props.animation &&
                            (l([Kt, Jt], gt), h([Kt, Jt], 'hidden'))
          }
          _(),
          T(),
          x.props.animation
            ? re() && Ct(gt, x.unmount)
            : x.unmount()
        }
      }
      function Qe (C) {
        me(x.state.isDestroyed, Ue('hideWithInteractivity')),
        ye().addEventListener('mousemove', It),
        $(yn, It),
        It(C)
      }
      function Sn () {
        me(x.state.isDestroyed, Ue('unmount')),
        x.state.isVisible && x.hide(),
        x.state.isMounted &&
                        (Nt(),
                        Yt().forEach(function (C) {
                          C._tippy.unmount()
                        }),
                        ft.parentNode && ft.parentNode.removeChild(ft),
                        (wn = wn.filter(function (C) {
                          return C !== x
                        })),
                        (x.state.isMounted = !1),
                        b('onHidden', [x]))
      }
      function Wn () {
        me(x.state.isDestroyed, Ue('destroy')),
        !x.state.isDestroyed &&
                        (x.clearDelayTimeouts(),
                        x.unmount(),
                        St(),
                        delete g._tippy,
                        (x.state.isDestroyed = !0),
                        b('onDestroy', [x]))
      }
    }
    function de (g, y) {
      y === void 0 && (y = {})
      const D = Qt.plugins.concat(y.plugins || [])
      Ae(g), ge(y, D), ze()
      const F = Object.assign({}, y, { plugins: D })
      const q = mt(g)
      const W = U(F.content)
      const B = q.length > 1
      me(
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
      const bt = q.reduce(function (lt, pt) {
        const yt = pt && cn(pt, F)
        return yt && lt.push(yt), lt
      }, [])
      return U(g) ? bt[0] : bt
    }
    (de.defaultProps = Qt),
    (de.setDefaultProps = zr),
    (de.currentInput = P)
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
          const bt = W.props.duration
          W.setProps({ duration: q }),
          W.hide(),
          W.state.isDestroyed || W.setProps({ duration: bt })
        }
      })
    }
    const cr = Object.assign({}, e.applyStyles, {
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
      Ve(
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
      let bt = D.overrides
      let lt = []
      let pt = !1
      function yt () {
        W = q.map(function (tt) {
          return tt.reference
        })
      }
      function Tt (tt) {
        q.forEach(function (it) {
          tt ? it.enable() : it.disable()
        })
      }
      function jt (tt) {
        return q.map(function (it) {
          const x = it.setProps
          return (
            (it.setProps = function (Gt) {
              x(Gt), it.reference === B && tt.setProps(Gt)
            }),
            function () {
              it.setProps = x
            }
          )
        })
      }
      function At (tt, it) {
        const x = W.indexOf(it)
        if (it !== B) {
          B = it
          const Gt = (bt || []).concat('content').reduce(function (
            ft,
            Fe
          ) {
            return (ft[Fe] = q[x].props[Fe]), ft
          }, {})
          tt.setProps(
            Object.assign({}, Gt, {
              getReferenceClientRect:
                                typeof Gt.getReferenceClientRect === 'function'
                                  ? Gt.getReferenceClientRect
                                  : function () {
                                    return it.getBoundingClientRect()
                                  }
            })
          )
        }
      }
      Tt(!1), yt()
      const It = {
        fn: function () {
          return {
            onDestroy: function () {
              Tt(!0)
            },
            onHidden: function () {
              B = null
            },
            onClickOutside: function (x) {
              x.props.showOnCreate &&
                                !pt &&
                                ((pt = !0), (B = null))
            },
            onShow: function (x) {
              x.props.showOnCreate &&
                                !pt &&
                                ((pt = !0), At(x, W[0]))
            },
            onTrigger: function (x, Gt) {
              At(x, Gt.currentTarget)
            }
          }
        }
      }
      const rt = de(
        J(),
        Object.assign({}, S(D, ['overrides']), {
          plugins: [It].concat(D.plugins || []),
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
      const ht = rt.show;
      (rt.show = function (tt) {
        if ((ht(), !B && tt == null)) return At(rt, W[0])
        if (!(B && tt == null)) {
          if (typeof tt === 'number') {
            return W[tt] && At(rt, W[tt])
          }
          if (q.includes(tt)) {
            const it = tt.reference
            return At(rt, it)
          }
          if (W.includes(tt)) return At(rt, tt)
        }
      }),
      (rt.showNext = function () {
        const tt = W[0]
        if (!B) return rt.show(0)
        const it = W.indexOf(B)
        rt.show(W[it + 1] || tt)
      }),
      (rt.showPrevious = function () {
        const tt = W[W.length - 1]
        if (!B) return rt.show(tt)
        const it = W.indexOf(B)
        const x = W[it - 1] || tt
        rt.show(x)
      })
      const vt = rt.setProps
      return (
        (rt.setProps = function (tt) {
          (bt = tt.overrides || bt), vt(tt)
        }),
        (rt.setInstances = function (tt) {
          Tt(!0),
          lt.forEach(function (it) {
            return it()
          }),
          (q = tt),
          Tt(!1),
          yt(),
          jt(rt),
          rt.setProps({ triggerTarget: W })
        }),
        (lt = jt(rt)),
        rt
      )
    }
    const ur = {
      mouseover: 'mouseenter',
      focusin: 'focus',
      click: 'click'
    }
    function qe (g, y) {
      Ve(
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
      const bt = Object.assign({}, B, { trigger: 'manual', touch: !1 })
      const lt = Object.assign({}, B, { showOnCreate: !0 })
      const pt = de(g, bt)
      const yt = I(pt)
      function Tt (ht) {
        if (!(!ht.target || q)) {
          const vt = ht.target.closest(W)
          if (vt) {
            const tt =
                            vt.getAttribute('data-tippy-trigger') ||
                            y.trigger ||
                            Qt.trigger
            if (
              !vt._tippy &&
                            !(
                              ht.type === 'touchstart' &&
                                typeof lt.touch === 'boolean'
                            ) &&
                            !(
                              ht.type !== 'touchstart' &&
                                tt.indexOf(ur[ht.type]) < 0
                            )
            ) {
              const it = de(vt, lt)
              it && (F = F.concat(it))
            }
          }
        }
      }
      function jt (ht, vt, tt, it) {
        it === void 0 && (it = !1),
        ht.addEventListener(vt, tt, it),
        D.push({
          node: ht,
          eventType: vt,
          handler: tt,
          options: it
        })
      }
      function At (ht) {
        const vt = ht.reference
        jt(vt, 'touchstart', Tt, f),
        jt(vt, 'mouseover', Tt),
        jt(vt, 'focusin', Tt),
        jt(vt, 'click', Tt)
      }
      function It () {
        D.forEach(function (ht) {
          const vt = ht.node
          const tt = ht.eventType
          const it = ht.handler
          const x = ht.options
          vt.removeEventListener(tt, it, x)
        }),
        (D = [])
      }
      function rt (ht) {
        const vt = ht.destroy
        const tt = ht.enable
        const it = ht.disable;
        (ht.destroy = function (x) {
          x === void 0 && (x = !0),
          x &&
                            F.forEach(function (Gt) {
                              Gt.destroy()
                            }),
          (F = []),
          It(),
          vt()
        }),
        (ht.enable = function () {
          tt(),
          F.forEach(function (x) {
            return x.enable()
          }),
          (q = !1)
        }),
        (ht.disable = function () {
          it(),
          F.forEach(function (x) {
            return x.disable()
          }),
          (q = !0)
        }),
        At(ht)
      }
      return yt.forEach(rt), pt
    }
    const dr = {
      name: 'animateFill',
      defaultValue: !1,
      fn: function (y) {
        let D
        if (!((D = y.props.render) != null && D.$$tippy)) {
          return (
            Ve(
              y.props.animateFill,
              'The `animateFill` plugin requires the default render function.'
            ),
            {}
          )
        }
        const F = Xe(y.popper)
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
              const lt = q.style.transitionDuration
              const pt = Number(lt.replace('ms', ''));
              (W.style.transitionDelay =
                                Math.round(pt / 10) + 'ms'),
              (B.style.transitionDuration = lt),
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
    function Yr (g) {
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
        let bt = y.props
        function lt () {
          return (
            y.props.followCursor === 'initial' && y.state.isVisible
          )
        }
        function pt () {
          F.addEventListener('mousemove', jt)
        }
        function yt () {
          F.removeEventListener('mousemove', jt)
        }
        function Tt () {
          (q = !0),
          y.setProps({ getReferenceClientRect: null }),
          (q = !1)
        }
        function jt (rt) {
          const ht = rt.target ? D.contains(rt.target) : !0
          const vt = y.props.followCursor
          const tt = rt.clientX
          const it = rt.clientY
          const x = D.getBoundingClientRect()
          const Gt = tt - x.left
          const ft = it - x.top;
          (ht || !y.props.interactive) &&
                        y.setProps({
                          getReferenceClientRect: function () {
                            const be = D.getBoundingClientRect()
                            let Ge = tt
                            let Ke = it
                            vt === 'initial' &&
                                    ((Ge = be.left + Gt), (Ke = be.top + ft))
                            const Je = vt === 'horizontal' ? be.top : Ke
                            const re = vt === 'vertical' ? be.right : Ge
                            const le = vt === 'horizontal' ? be.bottom : Ke
                            const ye = vt === 'vertical' ? be.left : Ge
                            return {
                              width: re - ye,
                              height: le - Je,
                              top: Je,
                              right: re,
                              bottom: le,
                              left: ye
                            }
                          }
                        })
        }
        function At () {
          y.props.followCursor &&
                        (fn.push({ instance: y, doc: F }), On(F))
        }
        function It () {
          (fn = fn.filter(function (rt) {
            return rt.instance !== y
          })),
          fn.filter(function (rt) {
            return rt.doc === F
          }).length === 0 && Yr(F)
        }
        return {
          onCreate: At,
          onDestroy: It,
          onBeforeUpdate: function () {
            bt = y.props
          },
          onAfterUpdate: function (ht, vt) {
            const tt = vt.followCursor
            q ||
                            (tt !== void 0 &&
                                bt.followCursor !== tt &&
                                (It(),
                                tt
                                  ? (At(),
                                    y.state.isMounted && !W && !lt() && pt())
                                  : (yt(), Tt())))
          },
          onMount: function () {
            y.props.followCursor &&
                            !W &&
                            (B && (jt(xn), (B = !1)), lt() || pt())
          },
          onTrigger: function (ht, vt) {
            X(vt) &&
                            (xn = {
                              clientX: vt.clientX,
                              clientY: vt.clientY
                            }),
            (W = vt.type === 'focus')
          },
          onHidden: function () {
            y.props.followCursor && (Tt(), yt(), (B = !0))
          }
        }
      }
    }
    function Xr (g, y) {
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
        const bt = {
          name: 'tippyInlinePositioning',
          enabled: !0,
          phase: 'afterWrite',
          fn: function (jt) {
            const At = jt.state
            F() &&
                            (q !== At.placement &&
                                y.setProps({
                                  getReferenceClientRect: function () {
                                    return lt(At.placement)
                                  }
                                }),
                            (q = At.placement))
          }
        }
        function lt (Tt) {
          return qr(
            k(Tt),
            D.getBoundingClientRect(),
            Y(D.getClientRects()),
            W
          )
        }
        function pt (Tt) {
          (B = !0), y.setProps(Tt), (B = !1)
        }
        function yt () {
          B || pt(Xr(y.props, bt))
        }
        return {
          onCreate: yt,
          onAfterUpdate: yt,
          onTrigger: function (jt, At) {
            if (X(At)) {
              const It = Y(y.reference.getClientRects())
              const rt = It.find(function (ht) {
                return (
                  ht.left - 2 <= At.clientX &&
                                    ht.right + 2 >= At.clientX &&
                                    ht.top - 2 <= At.clientY &&
                                    ht.bottom + 2 >= At.clientY
                )
              })
              W = It.indexOf(rt)
            }
          },
          onUntrigger: function () {
            W = -1
          }
        }
      }
    }
    function qr (g, y, D, F) {
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
          const bt = q.top
          const lt = W.bottom
          const pt = B ? q.left : W.left
          const yt = B ? q.right : W.right
          const Tt = yt - pt
          const jt = lt - bt
          return {
            top: bt,
            bottom: lt,
            left: pt,
            right: yt,
            width: Tt,
            height: jt
          }
        }
        case 'left':
        case 'right': {
          const At = Math.min.apply(
            Math,
            D.map(function (ft) {
              return ft.left
            })
          )
          const It = Math.max.apply(
            Math,
            D.map(function (ft) {
              return ft.right
            })
          )
          const rt = D.filter(function (ft) {
            return g === 'left' ? ft.left === At : ft.right === It
          })
          const ht = rt[0].top
          const vt = rt[rt.length - 1].bottom
          const tt = At
          const it = It
          const x = it - tt
          const Gt = vt - ht
          return {
            top: ht,
            bottom: vt,
            left: tt,
            right: it,
            width: x,
            height: Gt
          }
        }
        default:
          return y
      }
    }
    const Gr = {
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
        function W (pt) {
          return y.props.sticky === !0 || y.props.sticky === pt
        }
        let B = null
        let bt = null
        function lt () {
          const pt = W('reference')
            ? q().getBoundingClientRect()
            : null
          const yt = W('popper') ? F.getBoundingClientRect() : null;
          ((pt && Hn(B, pt)) || (yt && Hn(bt, yt))) &&
                        y.popperInstance &&
                        y.popperInstance.update(),
          (B = pt),
          (bt = yt),
          y.state.isMounted && requestAnimationFrame(lt)
        }
        return {
          onMount: function () {
            y.props.sticky && lt()
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
    de.setDefaultProps({ render: ar }),
    (t.animateFill = dr),
    (t.createSingleton = fr),
    (t.default = de),
    (t.delegate = qe),
    (t.followCursor = jn),
    (t.hideAll = lr),
    (t.inlinePositioning = Bn),
    (t.roundArrow = r),
    (t.sticky = Gr)
  })
  const Ai = $o(Wo())
  const Ds = $o(Wo())
  const Cs = (t) => {
    const e = { plugins: [] }
    const r = (i) => t[t.indexOf(i) + 1]
    if (
      (t.includes('animation') && (e.animation = r('animation')),
      t.includes('duration') && (e.duration = parseInt(r('duration'))),
      t.includes('delay'))
    ) {
      const i = r('delay')
      e.delay = i.includes('-')
        ? i.split('-').map((o) => parseInt(o))
        : parseInt(i)
    }
    if (t.includes('cursor')) {
      e.plugins.push(Ds.followCursor)
      const i = r('cursor');
      ['x', 'initial'].includes(i)
        ? (e.followCursor = i === 'x' ? 'horizontal' : 'initial')
        : (e.followCursor = !0)
    }
    t.includes('on') && (e.trigger = r('on')),
    t.includes('arrowless') && (e.arrow = !1),
    t.includes('html') && (e.allowHTML = !0),
    t.includes('interactive') && (e.interactive = !0),
    t.includes('border') &&
                e.interactive &&
                (e.interactiveBorder = parseInt(r('border'))),
    t.includes('debounce') &&
                e.interactive &&
                (e.interactiveDebounce = parseInt(r('debounce'))),
    t.includes('max-width') && (e.maxWidth = parseInt(r('max-width'))),
    t.includes('theme') && (e.theme = r('theme')),
    t.includes('placement') && (e.placement = r('placement'))
    const n = {}
    return (
      t.includes('no-flip') &&
                (n.modifiers || (n.modifiers = []),
                n.modifiers.push({ name: 'flip', enabled: !1 })),
      (e.popperOptions = n),
      e
    )
  }
  function Di (t) {
    t.magic('tooltip', (e) => (r, n = {}) => {
      const i = n.timeout
      delete n.timeout
      const o = (0, Ai.default)(e, {
        content: r,
        trigger: 'manual',
        ...n
      })
      o.show(),
      setTimeout(() => {
        o.hide(), setTimeout(() => o.destroy(), n.duration || 300)
      }, i || 2e3)
    }),
    t.directive(
      'tooltip',
      (
        e,
        { modifiers: r, expression: n },
        { evaluateLater: i, effect: o, cleanup: a }
      ) => {
        const d = r.length > 0 ? Cs(r) : {}
        e.__x_tippy || (e.__x_tippy = (0, Ai.default)(e, d)),
        a(() => {
          e.__x_tippy &&
                                (e.__x_tippy.destroy(), delete e.__x_tippy)
        })
        const f = () => e.__x_tippy.enable()
        const u = () => e.__x_tippy.disable()
        const w = (m) => {
          m ? (f(), e.__x_tippy.setContent(m)) : u()
        }
        if (r.includes('raw')) w(n)
        else {
          const m = i(n)
          o(() => {
            m((E) => {
              typeof E === 'object'
                ? (e.__x_tippy.setProps(E), f())
                : w(E)
            })
          })
        }
      }
    )
  }
  Di.defaultProps = (t) => (Ai.default.setDefaultProps(t), Di)
  const _s = Di
  const zo = _s
  const Lr = () => {
    document.querySelectorAll('[ax-load][x-ignore]').forEach((t) => {
      t.removeAttribute('x-ignore'),
      t.setAttribute('x-load', t.getAttribute('ax-load')),
      t.setAttribute('x-load-src', t.getAttribute('ax-load-src'))
    }),
    document.querySelectorAll('[ax-load]').forEach((t) => {
      t.setAttribute('x-load', t.getAttribute('ax-load')),
      t.setAttribute('x-load-src', t.getAttribute('ax-load-src'))
    })
  }
  document.body
    ? (Lr(),
      new MutationObserver(Lr).observe(document.body, {
        childList: !0,
        subtree: !0
      }))
    : document.addEventListener('DOMContentLoaded', () => {
      Lr(),
      new MutationObserver(Lr).observe(document.body, {
        childList: !0,
        subtree: !0
      })
    })
  document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(ao),
    window.Alpine.plugin(so),
    window.Alpine.plugin(uo),
    window.Alpine.plugin(Bo),
    window.Alpine.plugin(zo)
  })
  const Ts = function (t, e, r) {
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
        const [M, I] = O.split(',', 2)
        if (I === '*' && m >= M) return S
        if (M === '*' && m <= I) return S
        if (m >= M && m <= I) return S
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
    let f = t.split('|')
    const u = n(f, e)
    return u != null
      ? a(u.trim(), r)
      : ((f = d(f)), a(f.length > 1 && e > 1 ? f[1] : f[0], r))
  }
  window.jsMd5 = Uo.md5
  window.pluralize = Ts
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
