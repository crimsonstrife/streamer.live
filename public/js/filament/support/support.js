(() => {
  const Bo = Object.create
  const Ti = Object.defineProperty
  const Ho = Object.getOwnPropertyDescriptor
  const $o = Object.getOwnPropertyNames
  const Wo = Object.getPrototypeOf
  const Vo = Object.prototype.hasOwnProperty
  const Kr = (t, e) => () => (
    e || t((e = { exports: {} }).exports, e), e.exports
  )
  const zo = (t, e, r, n) => {
    if ((e && typeof e === 'object') || typeof e === 'function') {
      for (const i of $o(e)) {
        !Vo.call(t, i) &&
                    i !== r &&
                    Ti(t, i, {
                      get: () => e[i],
                      enumerable: !(n = Ho(e, i)) || n.enumerable
                    })
      }
    }
    return t
  }
  const Uo = (t, e, r) => (
    (r = t != null ? Bo(Wo(t)) : {}),
    zo(
      e || !t || !t.__esModule
        ? Ti(r, 'default', { value: t, enumerable: !0 })
        : r,
      t
    )
  )
  const ao = Kr(() => {})
  const so = Kr(() => {})
  const lo = Kr((Os, yr) => {
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
      const s =
                !n.JS_MD5_NO_COMMON_JS && typeof yr === 'object' && yr.exports
      const h = typeof define === 'function' && define.amd
      const u = !n.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer < 'u'
      const f = '0123456789abcdef'.split('')
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
      let P
      if (u) {
        const R = new ArrayBuffer(68);
        (P = new Uint8Array(R)), (S = new Uint32Array(R))
      }
      let $ = Array.isArray;
      (n.JS_MD5_NO_NODE_JS || !$) &&
                ($ = function (l) {
                  return (
                    Object.prototype.toString.call(l) === '[object Array]'
                  )
                })
      let B = ArrayBuffer.isView
      u &&
                (n.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !B) &&
                (B = function (l) {
                  return (
                    typeof l === 'object' &&
                        l.buffer &&
                        l.buffer.constructor === ArrayBuffer
                  )
                })
      const K = function (l) {
        const p = typeof l
        if (p === 'string') return [l, !0]
        if (p !== 'object' || l === null) throw new Error(t)
        if (u && l.constructor === ArrayBuffer) {
          return [new Uint8Array(l), !1]
        }
        if (!$(l) && !B(l)) throw new Error(t)
        return [l, !1]
      }
      const X = function (l) {
        return function (p) {
          return new U(!0).update(p)[l]()
        }
      }
      const ne = function () {
        let l = X('hex')
        o && (l = J(l)),
        (l.create = function () {
          return new U()
        }),
        (l.update = function (d) {
          return l.create().update(d)
        })
        for (let p = 0; p < E.length; ++p) {
          const v = E[p]
          l[v] = X(v)
        }
        return l
      }
      var J = function (l) {
        const p = ao()
        const v = so().Buffer
        let d
        v.from && !n.JS_MD5_NO_BUFFER_FROM
          ? (d = v.from)
          : (d = function (_) {
              return new v(_)
            })
        const N = function (_) {
          if (typeof _ === 'string') {
            return p
              .createHash('md5')
              .update(_, 'utf8')
              .digest('hex')
          }
          if (_ == null) throw new Error(t)
          return (
            _.constructor === ArrayBuffer &&
                            (_ = new Uint8Array(_)),
            $(_) || B(_) || _.constructor === v
              ? p.createHash('md5').update(d(_)).digest('hex')
              : l(_)
          )
        }
        return N
      }
      const V = function (l) {
        return function (p, v) {
          return new Z(p, !0).update(v)[l]()
        }
      }
      const de = function () {
        const l = V('hex');
        (l.create = function (d) {
          return new Z(d)
        }),
        (l.update = function (d, N) {
          return l.create(d).update(N)
        })
        for (let p = 0; p < E.length; ++p) {
          const v = E[p]
          l[v] = V(v)
        }
        return l
      }
      function U (l) {
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
          (this.buffer8 = P)
        } else if (u) {
          const p = new ArrayBuffer(68);
          (this.buffer8 = new Uint8Array(p)),
          (this.blocks = new Uint32Array(p))
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
      (U.prototype.update = function (l) {
        if (this.finalized) throw new Error(e)
        const p = K(l)
        l = p[0]
        for (
          var v = p[1],
            d,
            N = 0,
            _,
            M = l.length,
            Q = this.blocks,
            Ue = this.buffer8;
          N < M;

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
            if (u) {
              for (_ = this.start; N < M && _ < 64; ++N) {
                (d = l.charCodeAt(N)),
                d < 128
                  ? (Ue[_++] = d)
                  : d < 2048
                    ? ((Ue[_++] = 192 | (d >>> 6)),
                      (Ue[_++] = 128 | (d & 63)))
                    : d < 55296 || d >= 57344
                      ? ((Ue[_++] = 224 | (d >>> 12)),
                        (Ue[_++] =
                                                  128 | ((d >>> 6) & 63)),
                        (Ue[_++] = 128 | (d & 63)))
                      : ((d =
                                                  65536 +
                                                  (((d & 1023) << 10) |
                                                      (l.charCodeAt(++N) &
                                                          1023))),
                        (Ue[_++] = 240 | (d >>> 18)),
                        (Ue[_++] =
                                                  128 | ((d >>> 12) & 63)),
                        (Ue[_++] =
                                                  128 | ((d >>> 6) & 63)),
                        (Ue[_++] = 128 | (d & 63)))
              }
            } else {
              for (_ = this.start; N < M && _ < 64; ++N) {
                (d = l.charCodeAt(N)),
                d < 128
                  ? (Q[_ >>> 2] |= d << m[_++ & 3])
                  : d < 2048
                    ? ((Q[_ >>> 2] |=
                                                (192 | (d >>> 6)) <<
                                                m[_++ & 3]),
                      (Q[_ >>> 2] |=
                                                (128 | (d & 63)) << m[_++ & 3]))
                    : d < 55296 || d >= 57344
                      ? ((Q[_ >>> 2] |=
                                                  (224 | (d >>> 12)) <<
                                                  m[_++ & 3]),
                        (Q[_ >>> 2] |=
                                                  (128 | ((d >>> 6) & 63)) <<
                                                  m[_++ & 3]),
                        (Q[_ >>> 2] |=
                                                  (128 | (d & 63)) <<
                                                  m[_++ & 3]))
                      : ((d =
                                                  65536 +
                                                  (((d & 1023) << 10) |
                                                      (l.charCodeAt(++N) &
                                                          1023))),
                        (Q[_ >>> 2] |=
                                                  (240 | (d >>> 18)) <<
                                                  m[_++ & 3]),
                        (Q[_ >>> 2] |=
                                                  (128 | ((d >>> 12) & 63)) <<
                                                  m[_++ & 3]),
                        (Q[_ >>> 2] |=
                                                  (128 | ((d >>> 6) & 63)) <<
                                                  m[_++ & 3]),
                        (Q[_ >>> 2] |=
                                                  (128 | (d & 63)) <<
                                                  m[_++ & 3]))
              }
            }
          } else if (u) {
            for (_ = this.start; N < M && _ < 64; ++N) {
              Ue[_++] = l[N]
            }
          } else {
            for (_ = this.start; N < M && _ < 64; ++N) {
              Q[_ >>> 2] |= l[N] << m[_++ & 3]
            }
          }
          (this.lastByteIndex = _),
          (this.bytes += _ - this.start),
          _ >= 64
            ? ((this.start = _ - 64),
              this.hash(),
              (this.hashed = !0))
            : (this.start = _)
        }
        return (
          this.bytes > 4294967295 &&
                        ((this.hBytes += (this.bytes / 4294967296) << 0),
                        (this.bytes = this.bytes % 4294967296)),
          this
        )
      }),
      (U.prototype.finalize = function () {
        if (!this.finalized) {
          this.finalized = !0
          const l = this.blocks
          const p = this.lastByteIndex;
          (l[p >>> 2] |= w[p & 3]),
          p >= 56 &&
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
      (U.prototype.hash = function () {
        let l
        let p
        let v
        let d
        let N
        let _
        const M = this.blocks
        this.first
          ? ((l = M[0] - 680876937),
            (l = (((l << 7) | (l >>> 25)) - 271733879) << 0),
            (d =
                              (-1732584194 ^ (l & 2004318071)) +
                              M[1] -
                              117830708),
            (d = (((d << 12) | (d >>> 20)) + l) << 0),
            (v =
                              (-271733879 ^ (d & (l ^ -271733879))) +
                              M[2] -
                              1126478375),
            (v = (((v << 17) | (v >>> 15)) + d) << 0),
            (p = (l ^ (v & (d ^ l))) + M[3] - 1316259209),
            (p = (((p << 22) | (p >>> 10)) + v) << 0))
          : ((l = this.h0),
            (p = this.h1),
            (v = this.h2),
            (d = this.h3),
            (l += (d ^ (p & (v ^ d))) + M[0] - 680876936),
            (l = (((l << 7) | (l >>> 25)) + p) << 0),
            (d += (v ^ (l & (p ^ v))) + M[1] - 389564586),
            (d = (((d << 12) | (d >>> 20)) + l) << 0),
            (v += (p ^ (d & (l ^ p))) + M[2] + 606105819),
            (v = (((v << 17) | (v >>> 15)) + d) << 0),
            (p += (l ^ (v & (d ^ l))) + M[3] - 1044525330),
            (p = (((p << 22) | (p >>> 10)) + v) << 0)),
        (l += (d ^ (p & (v ^ d))) + M[4] - 176418897),
        (l = (((l << 7) | (l >>> 25)) + p) << 0),
        (d += (v ^ (l & (p ^ v))) + M[5] + 1200080426),
        (d = (((d << 12) | (d >>> 20)) + l) << 0),
        (v += (p ^ (d & (l ^ p))) + M[6] - 1473231341),
        (v = (((v << 17) | (v >>> 15)) + d) << 0),
        (p += (l ^ (v & (d ^ l))) + M[7] - 45705983),
        (p = (((p << 22) | (p >>> 10)) + v) << 0),
        (l += (d ^ (p & (v ^ d))) + M[8] + 1770035416),
        (l = (((l << 7) | (l >>> 25)) + p) << 0),
        (d += (v ^ (l & (p ^ v))) + M[9] - 1958414417),
        (d = (((d << 12) | (d >>> 20)) + l) << 0),
        (v += (p ^ (d & (l ^ p))) + M[10] - 42063),
        (v = (((v << 17) | (v >>> 15)) + d) << 0),
        (p += (l ^ (v & (d ^ l))) + M[11] - 1990404162),
        (p = (((p << 22) | (p >>> 10)) + v) << 0),
        (l += (d ^ (p & (v ^ d))) + M[12] + 1804603682),
        (l = (((l << 7) | (l >>> 25)) + p) << 0),
        (d += (v ^ (l & (p ^ v))) + M[13] - 40341101),
        (d = (((d << 12) | (d >>> 20)) + l) << 0),
        (v += (p ^ (d & (l ^ p))) + M[14] - 1502002290),
        (v = (((v << 17) | (v >>> 15)) + d) << 0),
        (p += (l ^ (v & (d ^ l))) + M[15] + 1236535329),
        (p = (((p << 22) | (p >>> 10)) + v) << 0),
        (l += (v ^ (d & (p ^ v))) + M[1] - 165796510),
        (l = (((l << 5) | (l >>> 27)) + p) << 0),
        (d += (p ^ (v & (l ^ p))) + M[6] - 1069501632),
        (d = (((d << 9) | (d >>> 23)) + l) << 0),
        (v += (l ^ (p & (d ^ l))) + M[11] + 643717713),
        (v = (((v << 14) | (v >>> 18)) + d) << 0),
        (p += (d ^ (l & (v ^ d))) + M[0] - 373897302),
        (p = (((p << 20) | (p >>> 12)) + v) << 0),
        (l += (v ^ (d & (p ^ v))) + M[5] - 701558691),
        (l = (((l << 5) | (l >>> 27)) + p) << 0),
        (d += (p ^ (v & (l ^ p))) + M[10] + 38016083),
        (d = (((d << 9) | (d >>> 23)) + l) << 0),
        (v += (l ^ (p & (d ^ l))) + M[15] - 660478335),
        (v = (((v << 14) | (v >>> 18)) + d) << 0),
        (p += (d ^ (l & (v ^ d))) + M[4] - 405537848),
        (p = (((p << 20) | (p >>> 12)) + v) << 0),
        (l += (v ^ (d & (p ^ v))) + M[9] + 568446438),
        (l = (((l << 5) | (l >>> 27)) + p) << 0),
        (d += (p ^ (v & (l ^ p))) + M[14] - 1019803690),
        (d = (((d << 9) | (d >>> 23)) + l) << 0),
        (v += (l ^ (p & (d ^ l))) + M[3] - 187363961),
        (v = (((v << 14) | (v >>> 18)) + d) << 0),
        (p += (d ^ (l & (v ^ d))) + M[8] + 1163531501),
        (p = (((p << 20) | (p >>> 12)) + v) << 0),
        (l += (v ^ (d & (p ^ v))) + M[13] - 1444681467),
        (l = (((l << 5) | (l >>> 27)) + p) << 0),
        (d += (p ^ (v & (l ^ p))) + M[2] - 51403784),
        (d = (((d << 9) | (d >>> 23)) + l) << 0),
        (v += (l ^ (p & (d ^ l))) + M[7] + 1735328473),
        (v = (((v << 14) | (v >>> 18)) + d) << 0),
        (p += (d ^ (l & (v ^ d))) + M[12] - 1926607734),
        (p = (((p << 20) | (p >>> 12)) + v) << 0),
        (N = p ^ v),
        (l += (N ^ d) + M[5] - 378558),
        (l = (((l << 4) | (l >>> 28)) + p) << 0),
        (d += (N ^ l) + M[8] - 2022574463),
        (d = (((d << 11) | (d >>> 21)) + l) << 0),
        (_ = d ^ l),
        (v += (_ ^ p) + M[11] + 1839030562),
        (v = (((v << 16) | (v >>> 16)) + d) << 0),
        (p += (_ ^ v) + M[14] - 35309556),
        (p = (((p << 23) | (p >>> 9)) + v) << 0),
        (N = p ^ v),
        (l += (N ^ d) + M[1] - 1530992060),
        (l = (((l << 4) | (l >>> 28)) + p) << 0),
        (d += (N ^ l) + M[4] + 1272893353),
        (d = (((d << 11) | (d >>> 21)) + l) << 0),
        (_ = d ^ l),
        (v += (_ ^ p) + M[7] - 155497632),
        (v = (((v << 16) | (v >>> 16)) + d) << 0),
        (p += (_ ^ v) + M[10] - 1094730640),
        (p = (((p << 23) | (p >>> 9)) + v) << 0),
        (N = p ^ v),
        (l += (N ^ d) + M[13] + 681279174),
        (l = (((l << 4) | (l >>> 28)) + p) << 0),
        (d += (N ^ l) + M[0] - 358537222),
        (d = (((d << 11) | (d >>> 21)) + l) << 0),
        (_ = d ^ l),
        (v += (_ ^ p) + M[3] - 722521979),
        (v = (((v << 16) | (v >>> 16)) + d) << 0),
        (p += (_ ^ v) + M[6] + 76029189),
        (p = (((p << 23) | (p >>> 9)) + v) << 0),
        (N = p ^ v),
        (l += (N ^ d) + M[9] - 640364487),
        (l = (((l << 4) | (l >>> 28)) + p) << 0),
        (d += (N ^ l) + M[12] - 421815835),
        (d = (((d << 11) | (d >>> 21)) + l) << 0),
        (_ = d ^ l),
        (v += (_ ^ p) + M[15] + 530742520),
        (v = (((v << 16) | (v >>> 16)) + d) << 0),
        (p += (_ ^ v) + M[2] - 995338651),
        (p = (((p << 23) | (p >>> 9)) + v) << 0),
        (l += (v ^ (p | ~d)) + M[0] - 198630844),
        (l = (((l << 6) | (l >>> 26)) + p) << 0),
        (d += (p ^ (l | ~v)) + M[7] + 1126891415),
        (d = (((d << 10) | (d >>> 22)) + l) << 0),
        (v += (l ^ (d | ~p)) + M[14] - 1416354905),
        (v = (((v << 15) | (v >>> 17)) + d) << 0),
        (p += (d ^ (v | ~l)) + M[5] - 57434055),
        (p = (((p << 21) | (p >>> 11)) + v) << 0),
        (l += (v ^ (p | ~d)) + M[12] + 1700485571),
        (l = (((l << 6) | (l >>> 26)) + p) << 0),
        (d += (p ^ (l | ~v)) + M[3] - 1894986606),
        (d = (((d << 10) | (d >>> 22)) + l) << 0),
        (v += (l ^ (d | ~p)) + M[10] - 1051523),
        (v = (((v << 15) | (v >>> 17)) + d) << 0),
        (p += (d ^ (v | ~l)) + M[1] - 2054922799),
        (p = (((p << 21) | (p >>> 11)) + v) << 0),
        (l += (v ^ (p | ~d)) + M[8] + 1873313359),
        (l = (((l << 6) | (l >>> 26)) + p) << 0),
        (d += (p ^ (l | ~v)) + M[15] - 30611744),
        (d = (((d << 10) | (d >>> 22)) + l) << 0),
        (v += (l ^ (d | ~p)) + M[6] - 1560198380),
        (v = (((v << 15) | (v >>> 17)) + d) << 0),
        (p += (d ^ (v | ~l)) + M[13] + 1309151649),
        (p = (((p << 21) | (p >>> 11)) + v) << 0),
        (l += (v ^ (p | ~d)) + M[4] - 145523070),
        (l = (((l << 6) | (l >>> 26)) + p) << 0),
        (d += (p ^ (l | ~v)) + M[11] - 1120210379),
        (d = (((d << 10) | (d >>> 22)) + l) << 0),
        (v += (l ^ (d | ~p)) + M[2] + 718787259),
        (v = (((v << 15) | (v >>> 17)) + d) << 0),
        (p += (d ^ (v | ~l)) + M[9] - 343485551),
        (p = (((p << 21) | (p >>> 11)) + v) << 0),
        this.first
          ? ((this.h0 = (l + 1732584193) << 0),
            (this.h1 = (p - 271733879) << 0),
            (this.h2 = (v - 1732584194) << 0),
            (this.h3 = (d + 271733878) << 0),
            (this.first = !1))
          : ((this.h0 = (this.h0 + l) << 0),
            (this.h1 = (this.h1 + p) << 0),
            (this.h2 = (this.h2 + v) << 0),
            (this.h3 = (this.h3 + d) << 0))
      }),
      (U.prototype.hex = function () {
        this.finalize()
        const l = this.h0
        const p = this.h1
        const v = this.h2
        const d = this.h3
        return (
          f[(l >>> 4) & 15] +
                        f[l & 15] +
                        f[(l >>> 12) & 15] +
                        f[(l >>> 8) & 15] +
                        f[(l >>> 20) & 15] +
                        f[(l >>> 16) & 15] +
                        f[(l >>> 28) & 15] +
                        f[(l >>> 24) & 15] +
                        f[(p >>> 4) & 15] +
                        f[p & 15] +
                        f[(p >>> 12) & 15] +
                        f[(p >>> 8) & 15] +
                        f[(p >>> 20) & 15] +
                        f[(p >>> 16) & 15] +
                        f[(p >>> 28) & 15] +
                        f[(p >>> 24) & 15] +
                        f[(v >>> 4) & 15] +
                        f[v & 15] +
                        f[(v >>> 12) & 15] +
                        f[(v >>> 8) & 15] +
                        f[(v >>> 20) & 15] +
                        f[(v >>> 16) & 15] +
                        f[(v >>> 28) & 15] +
                        f[(v >>> 24) & 15] +
                        f[(d >>> 4) & 15] +
                        f[d & 15] +
                        f[(d >>> 12) & 15] +
                        f[(d >>> 8) & 15] +
                        f[(d >>> 20) & 15] +
                        f[(d >>> 16) & 15] +
                        f[(d >>> 28) & 15] +
                        f[(d >>> 24) & 15]
        )
      }),
      (U.prototype.toString = U.prototype.hex),
      (U.prototype.digest = function () {
        this.finalize()
        const l = this.h0
        const p = this.h1
        const v = this.h2
        const d = this.h3
        return [
          l & 255,
          (l >>> 8) & 255,
          (l >>> 16) & 255,
          (l >>> 24) & 255,
          p & 255,
          (p >>> 8) & 255,
          (p >>> 16) & 255,
          (p >>> 24) & 255,
          v & 255,
          (v >>> 8) & 255,
          (v >>> 16) & 255,
          (v >>> 24) & 255,
          d & 255,
          (d >>> 8) & 255,
          (d >>> 16) & 255,
          (d >>> 24) & 255
        ]
      }),
      (U.prototype.array = U.prototype.digest),
      (U.prototype.arrayBuffer = function () {
        this.finalize()
        const l = new ArrayBuffer(16)
        const p = new Uint32Array(l)
        return (
          (p[0] = this.h0),
          (p[1] = this.h1),
          (p[2] = this.h2),
          (p[3] = this.h3),
          l
        )
      }),
      (U.prototype.buffer = U.prototype.arrayBuffer),
      (U.prototype.base64 = function () {
        for (
          var l, p, v, d = '', N = this.array(), _ = 0;
          _ < 15;

        ) {
          (l = N[_++]),
          (p = N[_++]),
          (v = N[_++]),
          (d +=
                                O[l >>> 2] +
                                O[((l << 4) | (p >>> 4)) & 63] +
                                O[((p << 2) | (v >>> 6)) & 63] +
                                O[v & 63])
        }
        return (
          (l = N[_]),
          (d += O[l >>> 2] + O[(l << 4) & 63] + '=='),
          d
        )
      })
      function Z (l, p) {
        let v
        const d = K(l)
        if (((l = d[0]), d[1])) {
          const N = []
          const _ = l.length
          let M = 0
          let Q
          for (v = 0; v < _; ++v) {
            (Q = l.charCodeAt(v)),
            Q < 128
              ? (N[M++] = Q)
              : Q < 2048
                ? ((N[M++] = 192 | (Q >>> 6)),
                  (N[M++] = 128 | (Q & 63)))
                : Q < 55296 || Q >= 57344
                  ? ((N[M++] = 224 | (Q >>> 12)),
                    (N[M++] = 128 | ((Q >>> 6) & 63)),
                    (N[M++] = 128 | (Q & 63)))
                  : ((Q =
                                          65536 +
                                          (((Q & 1023) << 10) |
                                              (l.charCodeAt(++v) & 1023))),
                    (N[M++] = 240 | (Q >>> 18)),
                    (N[M++] = 128 | ((Q >>> 12) & 63)),
                    (N[M++] = 128 | ((Q >>> 6) & 63)),
                    (N[M++] = 128 | (Q & 63)))
          }
          l = N
        }
        l.length > 64 && (l = new U(!0).update(l).array())
        const Ue = []
        const Rt = []
        for (v = 0; v < 64; ++v) {
          const Vt = l[v] || 0;
          (Ue[v] = 92 ^ Vt), (Rt[v] = 54 ^ Vt)
        }
        U.call(this, p),
        this.update(Rt),
        (this.oKeyPad = Ue),
        (this.inner = !0),
        (this.sharedMemory = p)
      }
      (Z.prototype = new U()),
      (Z.prototype.finalize = function () {
        if ((U.prototype.finalize.call(this), this.inner)) {
          this.inner = !1
          const l = this.array()
          U.call(this, this.sharedMemory),
          this.update(this.oKeyPad),
          this.update(l),
          U.prototype.finalize.call(this)
        }
      })
      const me = ne();
      (me.md5 = me),
      (me.md5.hmac = de()),
      s
        ? (yr.exports = me)
        : ((n.md5 = me),
          h &&
                          define(function () {
                            return me
                          }))
    })()
  })
  const Bi = ['top', 'right', 'bottom', 'left']
  const _i = ['start', 'end']
  const Pi = Bi.reduce(
    (t, e) => t.concat(e, e + '-' + _i[0], e + '-' + _i[1]),
    []
  )
  const Et = Math.min
  const tt = Math.max
  const hr = Math.round
  const pr = Math.floor
  const nn = (t) => ({ x: t, y: t })
  const Yo = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
  const Xo = { start: 'end', end: 'start' }
  function Jr (t, e, r) {
    return tt(t, Et(e, r))
  }
  function jt (t, e) {
    return typeof t === 'function' ? t(e) : t
  }
  function pt (t) {
    return t.split('-')[0]
  }
  function xt (t) {
    return t.split('-')[1]
  }
  function Hi (t) {
    return t === 'x' ? 'y' : 'x'
  }
  function Zr (t) {
    return t === 'y' ? 'height' : 'width'
  }
  function Pn (t) {
    return ['top', 'bottom'].includes(pt(t)) ? 'y' : 'x'
  }
  function Qr (t) {
    return Hi(Pn(t))
  }
  function $i (t, e, r) {
    r === void 0 && (r = !1)
    const n = xt(t)
    const i = Qr(t)
    const o = Zr(i)
    let s =
            i === 'x'
              ? n === (r ? 'end' : 'start')
                ? 'right'
                : 'left'
              : n === 'start'
                ? 'bottom'
                : 'top'
    return e.reference[o] > e.floating[o] && (s = mr(s)), [s, mr(s)]
  }
  function qo (t) {
    const e = mr(t)
    return [vr(t), e, vr(e)]
  }
  function vr (t) {
    return t.replace(/start|end/g, (e) => Xo[e])
  }
  function Go (t, e, r) {
    const n = ['left', 'right']
    const i = ['right', 'left']
    const o = ['top', 'bottom']
    const s = ['bottom', 'top']
    switch (t) {
      case 'top':
      case 'bottom':
        return r ? (e ? i : n) : e ? n : i
      case 'left':
      case 'right':
        return e ? o : s
      default:
        return []
    }
  }
  function Ko (t, e, r, n) {
    const i = xt(t)
    let o = Go(pt(t), r === 'start', n)
    return (
      i &&
                ((o = o.map((s) => s + '-' + i)),
                e && (o = o.concat(o.map(vr)))),
      o
    )
  }
  function mr (t) {
    return t.replace(/left|right|bottom|top/g, (e) => Yo[e])
  }
  function Jo (t) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...t }
  }
  function ei (t) {
    return typeof t !== 'number'
      ? Jo(t)
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
  function Mi (t, e, r) {
    const { reference: n, floating: i } = t
    const o = Pn(e)
    const s = Qr(e)
    const h = Zr(s)
    const u = pt(e)
    const f = o === 'y'
    const w = n.x + n.width / 2 - i.width / 2
    const m = n.y + n.height / 2 - i.height / 2
    const E = n[h] / 2 - i[h] / 2
    let O
    switch (u) {
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
    switch (xt(e)) {
      case 'start':
        O[s] -= E * (r && f ? -1 : 1)
        break
      case 'end':
        O[s] += E * (r && f ? -1 : 1)
        break
    }
    return O
  }
  const Zo = async (t, e, r) => {
    const {
      placement: n = 'bottom',
      strategy: i = 'absolute',
      middleware: o = [],
      platform: s
    } = r
    const h = o.filter(Boolean)
    const u = await (s.isRTL == null ? void 0 : s.isRTL(e))
    let f = await s.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    })
    let { x: w, y: m } = Mi(f, n, u)
    let E = n
    let O = {}
    let S = 0
    for (let P = 0; P < h.length; P++) {
      const { name: R, fn: $ } = h[P]
      const {
        x: B,
        y: K,
        data: X,
        reset: ne
      } = await $({
        x: w,
        y: m,
        initialPlacement: n,
        placement: E,
        strategy: i,
        middlewareData: O,
        rects: f,
        platform: s,
        elements: { reference: t, floating: e }
      });
      (w = B ?? w),
      (m = K ?? m),
      (O = { ...O, [R]: { ...O[R], ...X } }),
      ne &&
                    S <= 50 &&
                    (S++,
                    typeof ne === 'object' &&
                        (ne.placement && (E = ne.placement),
                        ne.rects &&
                            (f =
                                ne.rects === !0
                                  ? await s.getElementRects({
                                    reference: t,
                                    floating: e,
                                    strategy: i
                                  })
                                  : ne.rects),
                        ({ x: w, y: m } = Mi(f, E, u))),
                    (P = -1))
    }
    return { x: w, y: m, placement: E, strategy: i, middlewareData: O }
  }
  async function Tn (t, e) {
    let r
    e === void 0 && (e = {})
    const {
      x: n,
      y: i,
      platform: o,
      rects: s,
      elements: h,
      strategy: u
    } = t
    const {
      boundary: f = 'clippingAncestors',
      rootBoundary: w = 'viewport',
      elementContext: m = 'floating',
      altBoundary: E = !1,
      padding: O = 0
    } = jt(e, t)
    const S = ei(O)
    const R = h[E ? (m === 'floating' ? 'reference' : 'floating') : m]
    const $ = Cn(
      await o.getClippingRect({
        element:
                    (r = await (o.isElement == null
                      ? void 0
                      : o.isElement(R))) == null || r
                      ? R
                      : R.contextElement ||
                          (await (o.getDocumentElement == null
                            ? void 0
                            : o.getDocumentElement(h.floating))),
        boundary: f,
        rootBoundary: w,
        strategy: u
      })
    )
    const B =
            m === 'floating' ? { ...s.floating, x: n, y: i } : s.reference
    const K = await (o.getOffsetParent == null
      ? void 0
      : o.getOffsetParent(h.floating))
    const X = (await (o.isElement == null ? void 0 : o.isElement(K)))
      ? (await (o.getScale == null ? void 0 : o.getScale(K))) || {
          x: 1,
          y: 1
        }
      : { x: 1, y: 1 }
    const ne = Cn(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect(
          {
            elements: h,
            rect: B,
            offsetParent: K,
            strategy: u
          }
        )
        : B
    )
    return {
      top: ($.top - ne.top + S.top) / X.y,
      bottom: (ne.bottom - $.bottom + S.bottom) / X.y,
      left: ($.left - ne.left + S.left) / X.x,
      right: (ne.right - $.right + S.right) / X.x
    }
  }
  const Qo = (t) => ({
    name: 'arrow',
    options: t,
    async fn (e) {
      const {
        x: r,
        y: n,
        placement: i,
        rects: o,
        platform: s,
        elements: h,
        middlewareData: u
      } = e
      const { element: f, padding: w = 0 } = jt(t, e) || {}
      if (f == null) return {}
      const m = ei(w)
      const E = { x: r, y: n }
      const O = Qr(i)
      const S = Zr(O)
      const P = await s.getDimensions(f)
      const R = O === 'y'
      const $ = R ? 'top' : 'left'
      const B = R ? 'bottom' : 'right'
      const K = R ? 'clientHeight' : 'clientWidth'
      const X = o.reference[S] + o.reference[O] - E[O] - o.floating[S]
      const ne = E[O] - o.reference[O]
      const J = await (s.getOffsetParent == null
        ? void 0
        : s.getOffsetParent(f))
      let V = J ? J[K] : 0;
      (!V || !(await (s.isElement == null ? void 0 : s.isElement(J)))) &&
                (V = h.floating[K] || o.floating[S])
      const de = X / 2 - ne / 2
      const U = V / 2 - P[S] / 2 - 1
      const Z = Et(m[$], U)
      const me = Et(m[B], U)
      const l = Z
      const p = V - P[S] - me
      const v = V / 2 - P[S] / 2 + de
      const d = Jr(l, v, p)
      const N =
                !u.arrow &&
                xt(i) != null &&
                v !== d &&
                o.reference[S] / 2 - (v < l ? Z : me) - P[S] / 2 < 0
      const _ = N ? (v < l ? v - l : v - p) : 0
      return {
        [O]: E[O] + _,
        data: {
          [O]: d,
          centerOffset: v - d - _,
          ...(N && { alignmentOffset: _ })
        },
        reset: N
      }
    }
  })
  function ea (t, e, r) {
    return (
      t
        ? [
            ...r.filter((i) => xt(i) === t),
            ...r.filter((i) => xt(i) !== t)
          ]
        : r.filter((i) => pt(i) === i)
    ).filter((i) => (t ? xt(i) === t || (e ? vr(i) !== i : !1) : !0))
  }
  const ta = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'autoPlacement',
        options: t,
        async fn (e) {
          let r, n, i
          const {
            rects: o,
            middlewareData: s,
            placement: h,
            platform: u,
            elements: f
          } = e
          const {
            crossAxis: w = !1,
            alignment: m,
            allowedPlacements: E = Pi,
            autoAlignment: O = !0,
            ...S
          } = jt(t, e)
          const P =
                        m !== void 0 || E === Pi ? ea(m || null, O, E) : E
          const R = await Tn(e, S)
          const $ =
                        ((r = s.autoPlacement) == null ? void 0 : r.index) || 0
          const B = P[$]
          if (B == null) return {}
          const K = $i(
            B,
            o,
            await (u.isRTL == null ? void 0 : u.isRTL(f.floating))
          )
          if (h !== B) return { reset: { placement: P[0] } }
          const X = [R[pt(B)], R[K[0]], R[K[1]]]
          const ne = [
            ...(((n = s.autoPlacement) == null
              ? void 0
              : n.overflows) || []),
            { placement: B, overflows: X }
          ]
          const J = P[$ + 1]
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
                    .reduce((l, p) => l + p, 0)
                  : Z.overflows[0],
                Z.overflows
              ]
            })
            .sort((Z, me) => Z[1] - me[1])
          const U =
                        ((i = V.filter((Z) =>
                          Z[2]
                            .slice(0, xt(Z[0]) ? 2 : 3)
                            .every((me) => me <= 0)
                        )[0]) == null
                          ? void 0
                          : i[0]) || V[0][0]
          return U !== h
            ? {
                data: { index: $ + 1, overflows: ne },
                reset: { placement: U }
              }
            : {}
        }
      }
    )
  }
  const na = function (t) {
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
            rects: s,
            initialPlacement: h,
            platform: u,
            elements: f
          } = e
          const {
            mainAxis: w = !0,
            crossAxis: m = !0,
            fallbackPlacements: E,
            fallbackStrategy: O = 'bestFit',
            fallbackAxisSideDirection: S = 'none',
            flipAlignment: P = !0,
            ...R
          } = jt(t, e)
          if ((r = o.arrow) != null && r.alignmentOffset) {
            return {}
          }
          const $ = pt(i)
          const B = pt(h) === h
          const K = await (u.isRTL == null
            ? void 0
            : u.isRTL(f.floating))
          const X = E || (B || !P ? [mr(h)] : qo(h))
          !E && S !== 'none' && X.push(...Ko(h, P, S, K))
          const ne = [h, ...X]
          const J = await Tn(e, R)
          const V = []
          let de =
                        ((n = o.flip) == null ? void 0 : n.overflows) || []
          if ((w && V.push(J[$]), m)) {
            const l = $i(i, s, K)
            V.push(J[l[0]], J[l[1]])
          }
          if (
            ((de = [...de, { placement: i, overflows: V }]),
            !V.every((l) => l <= 0))
          ) {
            let U, Z
            const l =
                            (((U = o.flip) == null ? void 0 : U.index) || 0) +
                            1
            const p = ne[l]
            if (p) {
              return {
                data: { index: l, overflows: de },
                reset: { placement: p }
              }
            }
            let v =
                            (Z = de
                              .filter((d) => d.overflows[0] <= 0)
                              .sort(
                                (d, N) => d.overflows[1] - N.overflows[1]
                              )[0]) == null
                              ? void 0
                              : Z.placement
            if (!v) {
              switch (O) {
                case 'bestFit': {
                  let me
                  const d =
                                        (me = de
                                          .map((N) => [
                                            N.placement,
                                            N.overflows
                                              .filter((_) => _ > 0)
                                              .reduce((_, M) => _ + M, 0)
                                          ])
                                          .sort((N, _) => N[1] - _[1])[0]) ==
                                        null
                                          ? void 0
                                          : me[0]
                  d && (v = d)
                  break
                }
                case 'initialPlacement':
                  v = h
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
  function Ri (t, e) {
    return {
      top: t.top - e.height,
      right: t.right - e.width,
      bottom: t.bottom - e.height,
      left: t.left - e.width
    }
  }
  function Ii (t) {
    return Bi.some((e) => t[e] >= 0)
  }
  const ra = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'hide',
        options: t,
        async fn (e) {
          const { rects: r } = e
          const { strategy: n = 'referenceHidden', ...i } = jt(t, e)
          switch (n) {
            case 'referenceHidden': {
              const o = await Tn(e, {
                ...i,
                elementContext: 'reference'
              })
              const s = Ri(o, r.reference)
              return {
                data: {
                  referenceHiddenOffsets: s,
                  referenceHidden: Ii(s)
                }
              }
            }
            case 'escaped': {
              const o = await Tn(e, { ...i, altBoundary: !0 })
              const s = Ri(o, r.floating)
              return {
                data: { escapedOffsets: s, escaped: Ii(s) }
              }
            }
            default:
              return {}
          }
        }
      }
    )
  }
  function Wi (t) {
    const e = Et(...t.map((o) => o.left))
    const r = Et(...t.map((o) => o.top))
    const n = tt(...t.map((o) => o.right))
    const i = tt(...t.map((o) => o.bottom))
    return { x: e, y: r, width: n - e, height: i - r }
  }
  function ia (t) {
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
    return r.map((i) => Cn(Wi(i)))
  }
  const oa = function (t) {
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
            strategy: s
          } = e
          const { padding: h = 2, x: u, y: f } = jt(t, e)
          const w = Array.from(
            (await (o.getClientRects == null
              ? void 0
              : o.getClientRects(n.reference))) || []
          )
          const m = ia(w)
          const E = Cn(Wi(w))
          const O = ei(h)
          function S () {
            if (
              m.length === 2 &&
                            m[0].left > m[1].right &&
                            u != null &&
                            f != null
            ) {
              return (
                m.find(
                  (R) =>
                    u > R.left - O.left &&
                                        u < R.right + O.right &&
                                        f > R.top - O.top &&
                                        f < R.bottom + O.bottom
                ) || E
              )
            }
            if (m.length >= 2) {
              if (Pn(r) === 'y') {
                const Z = m[0]
                const me = m[m.length - 1]
                const l = pt(r) === 'top'
                const p = Z.top
                const v = me.bottom
                const d = l ? Z.left : me.left
                const N = l ? Z.right : me.right
                const _ = N - d
                const M = v - p
                return {
                  top: p,
                  bottom: v,
                  left: d,
                  right: N,
                  width: _,
                  height: M,
                  x: d,
                  y: p
                }
              }
              const R = pt(r) === 'left'
              const $ = tt(...m.map((Z) => Z.right))
              const B = Et(...m.map((Z) => Z.left))
              const K = m.filter((Z) =>
                R ? Z.left === B : Z.right === $
              )
              const X = K[0].top
              const ne = K[K.length - 1].bottom
              const J = B
              const V = $
              const de = V - J
              const U = ne - X
              return {
                top: X,
                bottom: ne,
                left: J,
                right: V,
                width: de,
                height: U,
                x: J,
                y: X
              }
            }
            return E
          }
          const P = await o.getElementRects({
            reference: { getBoundingClientRect: S },
            floating: n.floating,
            strategy: s
          })
          return i.reference.x !== P.reference.x ||
                        i.reference.y !== P.reference.y ||
                        i.reference.width !== P.reference.width ||
                        i.reference.height !== P.reference.height
            ? { reset: { rects: P } }
            : {}
        }
      }
    )
  }
  async function aa (t, e) {
    const { placement: r, platform: n, elements: i } = t
    const o = await (n.isRTL == null ? void 0 : n.isRTL(i.floating))
    const s = pt(r)
    const h = xt(r)
    const u = Pn(r) === 'y'
    const f = ['left', 'top'].includes(s) ? -1 : 1
    const w = o && u ? -1 : 1
    const m = jt(e, t)
    let {
      mainAxis: E,
      crossAxis: O,
      alignmentAxis: S
    } = typeof m === 'number'
      ? { mainAxis: m, crossAxis: 0, alignmentAxis: null }
      : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...m }
    return (
      h && typeof S === 'number' && (O = h === 'end' ? S * -1 : S),
      u ? { x: O * w, y: E * f } : { x: E * f, y: O * w }
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
          const { x: i, y: o, placement: s, middlewareData: h } = e
          const u = await aa(e, t)
          return s ===
                        ((r = h.offset) == null ? void 0 : r.placement) &&
                        (n = h.arrow) != null &&
                        n.alignmentOffset
            ? {}
            : {
                x: i + u.x,
                y: o + u.y,
                data: { ...u, placement: s }
              }
        }
      }
    )
  }
  const sa = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'shift',
        options: t,
        async fn (e) {
          const { x: r, y: n, placement: i } = e
          const {
            mainAxis: o = !0,
            crossAxis: s = !1,
            limiter: h = {
              fn: (R) => {
                const { x: $, y: B } = R
                return { x: $, y: B }
              }
            },
            ...u
          } = jt(t, e)
          const f = { x: r, y: n }
          const w = await Tn(e, u)
          const m = Pn(pt(i))
          const E = Hi(m)
          let O = f[E]
          let S = f[m]
          if (o) {
            const R = E === 'y' ? 'top' : 'left'
            const $ = E === 'y' ? 'bottom' : 'right'
            const B = O + w[R]
            const K = O - w[$]
            O = Jr(B, O, K)
          }
          if (s) {
            const R = m === 'y' ? 'top' : 'left'
            const $ = m === 'y' ? 'bottom' : 'right'
            const B = S + w[R]
            const K = S - w[$]
            S = Jr(B, S, K)
          }
          const P = h.fn({ ...e, [E]: O, [m]: S })
          return { ...P, data: { x: P.x - r, y: P.y - n } }
        }
      }
    )
  }
  const la = function (t) {
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
          const { apply: s = () => {}, ...h } = jt(t, e)
          const u = await Tn(e, h)
          const f = pt(r)
          const w = xt(r)
          const m = Pn(r) === 'y'
          const { width: E, height: O } = n.floating
          let S
          let P
          f === 'top' || f === 'bottom'
            ? ((S = f),
              (P =
                              w ===
                              ((await (i.isRTL == null
                                ? void 0
                                : i.isRTL(o.floating)))
                                ? 'start'
                                : 'end')
                                ? 'left'
                                : 'right'))
            : ((P = f), (S = w === 'end' ? 'top' : 'bottom'))
          const R = O - u[S]
          const $ = E - u[P]
          const B = !e.middlewareData.shift
          let K = R
          let X = $
          if (m) {
            const J = E - u.left - u.right
            X = w || B ? Et($, J) : J
          } else {
            const J = O - u.top - u.bottom
            K = w || B ? Et(R, J) : J
          }
          if (B && !w) {
            const J = tt(u.left, 0)
            const V = tt(u.right, 0)
            const de = tt(u.top, 0)
            const U = tt(u.bottom, 0)
            m
              ? (X =
                                  E -
                                  2 *
                                      (J !== 0 || V !== 0
                                        ? J + V
                                        : tt(u.left, u.right)))
              : (K =
                                  O -
                                  2 *
                                      (de !== 0 || U !== 0
                                        ? de + U
                                        : tt(u.top, u.bottom)))
          }
          await s({
            ...e,
            availableWidth: X,
            availableHeight: K
          })
          const ne = await i.getDimensions(o.floating)
          return E !== ne.width || O !== ne.height
            ? { reset: { rects: !0 } }
            : {}
        }
      }
    )
  }
  function rn (t) {
    return zi(t) ? (t.nodeName || '').toLowerCase() : '#document'
  }
  function ct (t) {
    let e
    return (
      (t == null || (e = t.ownerDocument) == null
        ? void 0
        : e.defaultView) || window
    )
  }
  function Bt (t) {
    let e
    return (e =
            (zi(t) ? t.ownerDocument : t.document) || window.document) == null
      ? void 0
      : e.documentElement
  }
  function zi (t) {
    return t instanceof Node || t instanceof ct(t).Node
  }
  function kt (t) {
    return t instanceof Element || t instanceof ct(t).Element
  }
  function _t (t) {
    return t instanceof HTMLElement || t instanceof ct(t).HTMLElement
  }
  function Fi (t) {
    return typeof ShadowRoot > 'u'
      ? !1
      : t instanceof ShadowRoot || t instanceof ct(t).ShadowRoot
  }
  function Un (t) {
    const { overflow: e, overflowX: r, overflowY: n, display: i } = ht(t)
    return (
      /auto|scroll|overlay|hidden|clip/.test(e + n + r) &&
            !['inline', 'contents'].includes(i)
    )
  }
  function ca (t) {
    return ['table', 'td', 'th'].includes(rn(t))
  }
  function ti (t) {
    const e = ni()
    const r = ht(t)
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
  function fa (t) {
    let e = _n(t)
    for (; _t(e) && !gr(e);) {
      if (ti(e)) return e
      e = _n(e)
    }
    return null
  }
  function ni () {
    return typeof CSS > 'u' || !CSS.supports
      ? !1
      : CSS.supports('-webkit-backdrop-filter', 'none')
  }
  function gr (t) {
    return ['html', 'body', '#document'].includes(rn(t))
  }
  function ht (t) {
    return ct(t).getComputedStyle(t)
  }
  function br (t) {
    return kt(t)
      ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
      : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
  }
  function _n (t) {
    if (rn(t) === 'html') return t
    const e = t.assignedSlot || t.parentNode || (Fi(t) && t.host) || Bt(t)
    return Fi(e) ? e.host : e
  }
  function Ui (t) {
    const e = _n(t)
    return gr(e)
      ? t.ownerDocument
        ? t.ownerDocument.body
        : t.body
      : _t(e) && Un(e)
        ? e
        : Ui(e)
  }
  function zn (t, e, r) {
    let n
    e === void 0 && (e = []), r === void 0 && (r = !0)
    const i = Ui(t)
    const o = i === ((n = t.ownerDocument) == null ? void 0 : n.body)
    const s = ct(i)
    return o
      ? e.concat(
        s,
        s.visualViewport || [],
        Un(i) ? i : [],
        s.frameElement && r ? zn(s.frameElement) : []
      )
      : e.concat(i, zn(i, [], r))
  }
  function Yi (t) {
    const e = ht(t)
    let r = parseFloat(e.width) || 0
    let n = parseFloat(e.height) || 0
    const i = _t(t)
    const o = i ? t.offsetWidth : r
    const s = i ? t.offsetHeight : n
    const h = hr(r) !== o || hr(n) !== s
    return h && ((r = o), (n = s)), { width: r, height: n, $: h }
  }
  function ri (t) {
    return kt(t) ? t : t.contextElement
  }
  function Dn (t) {
    const e = ri(t)
    if (!_t(e)) return nn(1)
    const r = e.getBoundingClientRect()
    const { width: n, height: i, $: o } = Yi(e)
    let s = (o ? hr(r.width) : r.width) / n
    let h = (o ? hr(r.height) : r.height) / i
    return (
      (!s || !Number.isFinite(s)) && (s = 1),
      (!h || !Number.isFinite(h)) && (h = 1),
      { x: s, y: h }
    )
  }
  const ua = nn(0)
  function Xi (t) {
    const e = ct(t)
    return !ni() || !e.visualViewport
      ? ua
      : { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop }
  }
  function da (t, e, r) {
    return e === void 0 && (e = !1), !r || (e && r !== ct(t)) ? !1 : e
  }
  function vn (t, e, r, n) {
    e === void 0 && (e = !1), r === void 0 && (r = !1)
    const i = t.getBoundingClientRect()
    const o = ri(t)
    let s = nn(1)
    e && (n ? kt(n) && (s = Dn(n)) : (s = Dn(t)))
    const h = da(o, r, n) ? Xi(o) : nn(0)
    let u = (i.left + h.x) / s.x
    let f = (i.top + h.y) / s.y
    let w = i.width / s.x
    let m = i.height / s.y
    if (o) {
      const E = ct(o)
      const O = n && kt(n) ? ct(n) : n
      let S = E
      let P = S.frameElement
      for (; P && n && O !== S;) {
        const R = Dn(P)
        const $ = P.getBoundingClientRect()
        const B = ht(P)
        const K =
                    $.left + (P.clientLeft + parseFloat(B.paddingLeft)) * R.x
        const X =
                    $.top + (P.clientTop + parseFloat(B.paddingTop)) * R.y;
        (u *= R.x),
        (f *= R.y),
        (w *= R.x),
        (m *= R.y),
        (u += K),
        (f += X),
        (S = ct(P)),
        (P = S.frameElement)
      }
    }
    return Cn({ width: w, height: m, x: u, y: f })
  }
  const pa = [':popover-open', ':modal']
  function qi (t) {
    return pa.some((e) => {
      try {
        return t.matches(e)
      } catch {
        return !1
      }
    })
  }
  function ha (t) {
    const { elements: e, rect: r, offsetParent: n, strategy: i } = t
    const o = i === 'fixed'
    const s = Bt(n)
    const h = e ? qi(e.floating) : !1
    if (n === s || (h && o)) return r
    let u = { scrollLeft: 0, scrollTop: 0 }
    let f = nn(1)
    const w = nn(0)
    const m = _t(n)
    if (
      (m || (!m && !o)) &&
            ((rn(n) !== 'body' || Un(s)) && (u = br(n)), _t(n))
    ) {
      const E = vn(n);
      (f = Dn(n)), (w.x = E.x + n.clientLeft), (w.y = E.y + n.clientTop)
    }
    return {
      width: r.width * f.x,
      height: r.height * f.y,
      x: r.x * f.x - u.scrollLeft * f.x + w.x,
      y: r.y * f.y - u.scrollTop * f.y + w.y
    }
  }
  function va (t) {
    return Array.from(t.getClientRects())
  }
  function Gi (t) {
    return vn(Bt(t)).left + br(t).scrollLeft
  }
  function ma (t) {
    const e = Bt(t)
    const r = br(t)
    const n = t.ownerDocument.body
    const i = tt(
      e.scrollWidth,
      e.clientWidth,
      n.scrollWidth,
      n.clientWidth
    )
    const o = tt(
      e.scrollHeight,
      e.clientHeight,
      n.scrollHeight,
      n.clientHeight
    )
    let s = -r.scrollLeft + Gi(t)
    const h = -r.scrollTop
    return (
      ht(n).direction === 'rtl' &&
                (s += tt(e.clientWidth, n.clientWidth) - i),
      { width: i, height: o, x: s, y: h }
    )
  }
  function ga (t, e) {
    const r = ct(t)
    const n = Bt(t)
    const i = r.visualViewport
    let o = n.clientWidth
    let s = n.clientHeight
    let h = 0
    let u = 0
    if (i) {
      (o = i.width), (s = i.height)
      const f = ni();
      (!f || (f && e === 'fixed')) &&
                ((h = i.offsetLeft), (u = i.offsetTop))
    }
    return { width: o, height: s, x: h, y: u }
  }
  function ba (t, e) {
    const r = vn(t, !0, e === 'fixed')
    const n = r.top + t.clientTop
    const i = r.left + t.clientLeft
    const o = _t(t) ? Dn(t) : nn(1)
    const s = t.clientWidth * o.x
    const h = t.clientHeight * o.y
    const u = i * o.x
    const f = n * o.y
    return { width: s, height: h, x: u, y: f }
  }
  function Li (t, e, r) {
    let n
    if (e === 'viewport') n = ga(t, r)
    else if (e === 'document') n = ma(Bt(t))
    else if (kt(e)) n = ba(e, r)
    else {
      const i = Xi(t)
      n = { ...e, x: e.x - i.x, y: e.y - i.y }
    }
    return Cn(n)
  }
  function Ki (t, e) {
    const r = _n(t)
    return r === e || !kt(r) || gr(r)
      ? !1
      : ht(r).position === 'fixed' || Ki(r, e)
  }
  function ya (t, e) {
    const r = e.get(t)
    if (r) return r
    let n = zn(t, [], !1).filter((h) => kt(h) && rn(h) !== 'body')
    let i = null
    const o = ht(t).position === 'fixed'
    let s = o ? _n(t) : t
    for (; kt(s) && !gr(s);) {
      const h = ht(s)
      const u = ti(s)
      !u && h.position === 'fixed' && (i = null),
      (
        o
          ? !u && !i
          : (!u &&
                              h.position === 'static' &&
                              !!i &&
                              ['absolute', 'fixed'].includes(i.position)) ||
                          (Un(s) && !u && Ki(t, s))
      )
        ? (n = n.filter((w) => w !== s))
        : (i = h),
      (s = _n(s))
    }
    return e.set(t, n), n
  }
  function wa (t) {
    const { element: e, boundary: r, rootBoundary: n, strategy: i } = t
    const s = [
      ...(r === 'clippingAncestors' ? ya(e, this._c) : [].concat(r)),
      n
    ]
    const h = s[0]
    const u = s.reduce(
      (f, w) => {
        const m = Li(e, w, i)
        return (
          (f.top = tt(m.top, f.top)),
          (f.right = Et(m.right, f.right)),
          (f.bottom = Et(m.bottom, f.bottom)),
          (f.left = tt(m.left, f.left)),
          f
        )
      },
      Li(e, h, i)
    )
    return {
      width: u.right - u.left,
      height: u.bottom - u.top,
      x: u.left,
      y: u.top
    }
  }
  function xa (t) {
    const { width: e, height: r } = Yi(t)
    return { width: e, height: r }
  }
  function Ea (t, e, r) {
    const n = _t(e)
    const i = Bt(e)
    const o = r === 'fixed'
    const s = vn(t, !0, o, e)
    let h = { scrollLeft: 0, scrollTop: 0 }
    const u = nn(0)
    if (n || (!n && !o)) {
      if (((rn(e) !== 'body' || Un(i)) && (h = br(e)), n)) {
        const m = vn(e, !0, o, e);
        (u.x = m.x + e.clientLeft), (u.y = m.y + e.clientTop)
      } else i && (u.x = Gi(i))
    }
    const f = s.left + h.scrollLeft - u.x
    const w = s.top + h.scrollTop - u.y
    return { x: f, y: w, width: s.width, height: s.height }
  }
  function Ni (t, e) {
    return !_t(t) || ht(t).position === 'fixed'
      ? null
      : e
        ? e(t)
        : t.offsetParent
  }
  function Ji (t, e) {
    const r = ct(t)
    if (!_t(t) || qi(t)) return r
    let n = Ni(t, e)
    for (; n && ca(n) && ht(n).position === 'static';) n = Ni(n, e)
    return n &&
            (rn(n) === 'html' ||
                (rn(n) === 'body' && ht(n).position === 'static' && !ti(n)))
      ? r
      : n || fa(t) || r
  }
  const Oa = async function (t) {
    const e = this.getOffsetParent || Ji
    const r = this.getDimensions
    return {
      reference: Ea(t.reference, await e(t.floating), t.strategy),
      floating: { x: 0, y: 0, ...(await r(t.floating)) }
    }
  }
  function Sa (t) {
    return ht(t).direction === 'rtl'
  }
  const Aa = {
    convertOffsetParentRelativeRectToViewportRelativeRect: ha,
    getDocumentElement: Bt,
    getClippingRect: wa,
    getOffsetParent: Ji,
    getElementRects: Oa,
    getClientRects: va,
    getDimensions: xa,
    getScale: Dn,
    isElement: kt,
    isRTL: Sa
  }
  function Da (t, e) {
    let r = null
    let n
    const i = Bt(t)
    function o () {
      let h
      clearTimeout(n), (h = r) == null || h.disconnect(), (r = null)
    }
    function s (h, u) {
      h === void 0 && (h = !1), u === void 0 && (u = 1), o()
      const {
        left: f,
        top: w,
        width: m,
        height: E
      } = t.getBoundingClientRect()
      if ((h || e(), !m || !E)) return
      const O = pr(w)
      const S = pr(i.clientWidth - (f + m))
      const P = pr(i.clientHeight - (w + E))
      const R = pr(f)
      const B = {
        rootMargin: -O + 'px ' + -S + 'px ' + -P + 'px ' + -R + 'px',
        threshold: tt(0, Et(1, u)) || 1
      }
      let K = !0
      function X (ne) {
        const J = ne[0].intersectionRatio
        if (J !== u) {
          if (!K) return s()
          J
            ? s(!1, J)
            : (n = setTimeout(() => {
                s(!1, 1e-7)
              }, 100))
        }
        K = !1
      }
      try {
        r = new IntersectionObserver(X, {
          ...B,
          root: i.ownerDocument
        })
      } catch {
        r = new IntersectionObserver(X, B)
      }
      r.observe(t)
    }
    return s(!0), o
  }
  function ki (t, e, r, n) {
    n === void 0 && (n = {})
    const {
      ancestorScroll: i = !0,
      ancestorResize: o = !0,
      elementResize: s = typeof ResizeObserver === 'function',
      layoutShift: h = typeof IntersectionObserver === 'function',
      animationFrame: u = !1
    } = n
    const f = ri(t)
    const w = i || o ? [...(f ? zn(f) : []), ...zn(e)] : []
    w.forEach(($) => {
      i && $.addEventListener('scroll', r, { passive: !0 }),
      o && $.addEventListener('resize', r)
    })
    const m = f && h ? Da(f, r) : null
    let E = -1
    let O = null
    s &&
            ((O = new ResizeObserver(($) => {
              const [B] = $
              B &&
                    B.target === f &&
                    O &&
                    (O.unobserve(e),
                    cancelAnimationFrame(E),
                    (E = requestAnimationFrame(() => {
                      let K;
                      (K = O) == null || K.observe(e)
                    }))),
              r()
            })),
            f && !u && O.observe(f),
            O.observe(e))
    let S
    let P = u ? vn(t) : null
    u && R()
    function R () {
      const $ = vn(t)
      P &&
                ($.x !== P.x ||
                    $.y !== P.y ||
                    $.width !== P.width ||
                    $.height !== P.height) &&
                r(),
      (P = $),
      (S = requestAnimationFrame(R))
    }
    return (
      r(),
      () => {
        let $
        w.forEach((B) => {
          i && B.removeEventListener('scroll', r),
          o && B.removeEventListener('resize', r)
        }),
        m?.(),
        ($ = O) == null || $.disconnect(),
        (O = null),
        u && cancelAnimationFrame(S)
      }
    )
  }
  const ii = ta
  const Zi = sa
  const Qi = na
  const eo = la
  const to = ra
  const no = Qo
  const ro = oa
  const ji = (t, e, r) => {
    const n = new Map()
    const i = { platform: Aa, ...r }
    const o = { ...i.platform, _c: n }
    return Zo(t, e, { ...i, platform: o })
  }
  const Ca = (t) => {
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
                e.middleware.push(ii(n('autoPlacement'))),
      r.includes('flip') && e.middleware.push(Qi(n('flip'))),
      r.includes('shift') && e.middleware.push(Zi(n('shift'))),
      r.includes('inline') && e.middleware.push(ro(n('inline'))),
      r.includes('arrow') && e.middleware.push(no(n('arrow'))),
      r.includes('hide') && e.middleware.push(to(n('hide'))),
      r.includes('size') && e.middleware.push(eo(n('size'))),
      e
    )
  }
  const Ta = (t, e) => {
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
                r.float.middleware.push(ii(e.autoPlacement)),
      t.includes('flip') && r.float.middleware.push(Qi(e.flip)),
      t.includes('shift') && r.float.middleware.push(Zi(e.shift)),
      t.includes('inline') && r.float.middleware.push(ro(e.inline)),
      t.includes('arrow') && r.float.middleware.push(no(e.arrow)),
      t.includes('hide') && r.float.middleware.push(to(e.hide)),
      t.includes('size'))
    ) {
      const i = e.size?.availableWidth ?? null
      const o = e.size?.availableHeight ?? null
      i && delete e.size.availableWidth,
      o && delete e.size.availableHeight,
      r.float.middleware.push(
        eo({
          ...e.size,
          apply ({
            availableWidth: s,
            availableHeight: h,
            elements: u
          }) {
            Object.assign(u.floating.style, {
              maxWidth: `${i ?? s}px`,
              maxHeight: `${o ?? h}px`
            })
          }
        })
      )
    }
    return r
  }
  const _a = (t) => {
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
  function Pa (t, e = () => {}) {
    let r = !1
    return function () {
      r ? e.apply(this, arguments) : ((r = !0), t.apply(this, arguments))
    }
  }
  function Ma (t) {
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
          const o = `panel-${_a(8)}`
          n.setAttribute('aria-controls', o), i.setAttribute('id', o)
        }
        i.setAttribute('aria-modal', !0),
        i.setAttribute('role', 'dialog')
      }
    }
    t.magic('float', (n) => (i = {}, o = {}) => {
      const s = { ...e, ...o }
      const h =
                Object.keys(i).length > 0 ? Ca(i) : { middleware: [ii()] }
      const u = n
      const f = n.parentElement.closest('[x-data]')
      const w = f.querySelector('[x-ref="panel"]')
      r(u, w)
      function m () {
        return w.style.display == 'block'
      }
      function E () {
        (w.style.display = 'none'),
        u.setAttribute('aria-expanded', 'false'),
        s.trap && w.setAttribute('x-trap', 'false'),
        ki(n, w, P)
      }
      function O () {
        (w.style.display = 'block'),
        u.setAttribute('aria-expanded', 'true'),
        s.trap && w.setAttribute('x-trap', 'true'),
        P()
      }
      function S () {
        m() ? E() : O()
      }
      async function P () {
        return await ji(n, w, h).then(
          ({ middlewareData: R, placement: $, x: B, y: K }) => {
            if (R.arrow) {
              const X = R.arrow?.x
              const ne = R.arrow?.y
              const J = h.middleware.filter(
                (de) => de.name == 'arrow'
              )[0].options.element
              const V = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
              }[$.split('-')[0]]
              Object.assign(J.style, {
                left: X != null ? `${X}px` : '',
                top: ne != null ? `${ne}px` : '',
                right: '',
                bottom: '',
                [V]: '-4px'
              })
            }
            if (R.hide) {
              const { referenceHidden: X } = R.hide
              Object.assign(w.style, {
                visibility: X ? 'hidden' : 'visible'
              })
            }
            Object.assign(w.style, {
              left: `${B}px`,
              top: `${K}px`
            })
          }
        )
      }
      s.dismissable &&
                (window.addEventListener('click', (R) => {
                  !f.contains(R.target) && m() && S()
                }),
                window.addEventListener(
                  'keydown',
                  (R) => {
                    R.key === 'Escape' && m() && S()
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
        { evaluate: s, effect: h }
      ) => {
        const u = o ? s(o) : {}
        const f = i.length > 0 ? Ta(i, u) : {}
        let w = null
        f.float.strategy == 'fixed' && (n.style.position = 'fixed')
        const m = (V) =>
          n.parentElement &&
                        !n.parentElement.closest('[x-data]').contains(V.target)
            ? n.close()
            : null
        const E = (V) => (V.key === 'Escape' ? n.close() : null)
        const O = n.getAttribute('x-ref')
        const S = n.parentElement.closest('[x-data]')
        const P = S.querySelectorAll(`[\\@click^="$refs.${O}"]`)
        const R = S.querySelectorAll(
                        `[x-on\\:click^="$refs.${O}"]`
        )
        n.style.setProperty('display', 'none'),
        r([...P, ...R][0], n),
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
        const B = () => {
          n._x_doShow(), (n._x_isShown = !0)
        }
        const K = () => setTimeout(B)
        const X = Pa(
          (V) => (V ? B() : $()),
          (V) => {
            typeof n._x_toggleAndCascadeWithTransitions ===
                            'function'
              ? n._x_toggleAndCascadeWithTransitions(
                n,
                V,
                B,
                $
              )
              : V
                ? K()
                : $()
          }
        )
        let ne
        let J = !0
        h(() =>
          s((V) => {
            (!J && V === ne) ||
                                (i.includes('immediate') && (V ? K() : $()),
                                X(V),
                                (ne = V),
                                (J = !1))
          })
        ),
        (n.open = async function (V) {
          (n.trigger = V.currentTarget ? V.currentTarget : V),
          X(!0),
          n.trigger.setAttribute('aria-expanded', 'true'),
          f.component.trap &&
                                    n.setAttribute('x-trap', 'true'),
          (w = ki(n.trigger, n, () => {
            ji(n.trigger, n, f.float).then(
              ({
                middlewareData: de,
                placement: U,
                x: Z,
                y: me
              }) => {
                if (de.arrow) {
                  const l = de.arrow?.x
                  const p = de.arrow?.y
                  const v =
                                                    f.float.middleware.filter(
                                                      (N) =>
                                                        N.name == 'arrow'
                                                    )[0].options.element
                  const d = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                  }[U.split('-')[0]]
                  Object.assign(v.style, {
                    left:
                                                        l != null
                                                          ? `${l}px`
                                                          : '',
                    top:
                                                        p != null
                                                          ? `${p}px`
                                                          : '',
                    right: '',
                    bottom: '',
                    [d]: '-4px'
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
          X(!1),
          n.trigger.setAttribute(
            'aria-expanded',
            'false'
          ),
          f.component.trap &&
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
  const io = Ma
  function Ra (t) {
    t.store('lazyLoadedAssets', {
      loaded: new Set(),
      check (s) {
        return Array.isArray(s)
          ? s.every((h) => this.loaded.has(h))
          : this.loaded.has(s)
      },
      markLoaded (s) {
        Array.isArray(s)
          ? s.forEach((h) => this.loaded.add(h))
          : this.loaded.add(s)
      }
    })
    const e = (s) =>
      new CustomEvent(s, {
        bubbles: !0,
        composed: !0,
        cancelable: !0
      })
    const r = (s, h = {}, u, f) => {
      const w = document.createElement(s)
      return (
        Object.entries(h).forEach(([m, E]) => (w[m] = E)),
        u && (f ? u.insertBefore(w, f) : u.appendChild(w)),
        w
      )
    }
    const n = (s, h, u = {}, f = null, w = null) => {
      const m = s === 'link' ? `link[href="${h}"]` : `script[src="${h}"]`
      if (
        document.querySelector(m) ||
                t.store('lazyLoadedAssets').check(h)
      ) {
        return Promise.resolve()
      }
      const E = s === 'link' ? { ...u, href: h } : { ...u, src: h }
      const O = r(s, E, f, w)
      return new Promise((S, P) => {
        (O.onload = () => {
          t.store('lazyLoadedAssets').markLoaded(h), S()
        }),
        (O.onerror = () => {
          P(new Error(`Failed to load ${s}: ${h}`))
        })
      })
    }
    const i = async (s, h, u = null, f = null) => {
      const w = { type: 'text/css', rel: 'stylesheet' }
      h && (w.media = h)
      let m = document.head
      let E = null
      if (u && f) {
        const O = document.querySelector(`link[href*="${f}"]`)
        O
          ? ((m = O.parentElement),
            (E = u === 'before' ? O : O.nextSibling))
          : (console.warn(
                          `Target (${f}) not found for ${s}. Appending to head.`
            ),
            (m = document.head),
            (E = null))
      }
      await n('link', s, w, m, E)
    }
    const o = async (s, h, u = null, f = null, w = null) => {
      let m = document.head
      let E = null
      if (u && f) {
        const S = document.querySelector(`script[src*="${f}"]`)
        S
          ? ((m = S.parentElement),
            (E = u === 'before' ? S : S.nextSibling))
          : (console.warn(
                          `Target (${f}) not found for ${s}. Falling back to head or body.`
            ),
            (m = document.head),
            (E = null))
      } else {
        (h.has('body-start') || h.has('body-end')) &&
                    ((m = document.body),
                    h.has('body-start') && (E = document.body.firstChild))
      }
      const O = {}
      w && (O.type = 'module'), await n('script', s, O, m, E)
    }
    t.directive('load-css', (s, { expression: h }, { evaluate: u }) => {
      const f = u(h)
      const w = s.media
      const m = s.getAttribute('data-dispatch')
      const E = s.getAttribute('data-css-before')
        ? 'before'
        : s.getAttribute('data-css-after')
          ? 'after'
          : null
      const O =
                s.getAttribute('data-css-before') ||
                s.getAttribute('data-css-after') ||
                null
      Promise.all(f.map((S) => i(S, w, E, O)))
        .then(() => {
          m && window.dispatchEvent(e(`${m}-css`))
        })
        .catch(console.error)
    }),
    t.directive(
      'load-js',
      (s, { expression: h, modifiers: u }, { evaluate: f }) => {
        const w = f(h)
        const m = new Set(u)
        const E = s.getAttribute('data-js-before')
          ? 'before'
          : s.getAttribute('data-js-after')
            ? 'after'
            : null
        const O =
                        s.getAttribute('data-js-before') ||
                        s.getAttribute('data-js-after') ||
                        null
        const S =
                        s.getAttribute('data-js-as-module') ||
                        s.getAttribute('data-as-module') ||
                        !1
        const P = s.getAttribute('data-dispatch')
        Promise.all(w.map((R) => o(R, m, E, O, S)))
          .then(() => {
            P && window.dispatchEvent(e(`${P}-js`))
          })
          .catch(console.error)
      }
    )
  }
  const oo = Ra
  const jo = Uo(lo(), 1)
  function co (t, e) {
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
  function Mt (t) {
    for (let e = 1; e < arguments.length; e++) {
      var r = arguments[e] != null ? arguments[e] : {}
      e % 2
        ? co(Object(r), !0).forEach(function (n) {
          Ia(t, n, r[n])
        })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(
            t,
            Object.getOwnPropertyDescriptors(r)
          )
          : co(Object(r)).forEach(function (n) {
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
  function Ia (t, e, r) {
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
  function $t () {
    return (
      ($t =
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
      $t.apply(this, arguments)
    )
  }
  function Fa (t, e) {
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
  function La (t, e) {
    if (t == null) return {}
    const r = Fa(t, e)
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
  const Na = '1.15.6'
  function Ht (t) {
    if (typeof window < 'u' && window.navigator) {
      return !!navigator.userAgent.match(t)
    }
  }
  const Wt = Ht(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i)
  const er = Ht(/Edge/i)
  const fo = Ht(/firefox/i)
  const Gn = Ht(/safari/i) && !Ht(/chrome/i) && !Ht(/android/i)
  const bi = Ht(/iP(ad|od|hone)/i)
  const yo = Ht(/chrome/i) && Ht(/android/i)
  const wo = { capture: !1, passive: !1 }
  function Oe (t, e, r) {
    t.addEventListener(e, r, !Wt && wo)
  }
  function Ee (t, e, r) {
    t.removeEventListener(e, r, !Wt && wo)
  }
  function _r (t, e) {
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
  function xo (t) {
    return t.host && t !== document && t.host.nodeType
      ? t.host
      : t.parentNode
  }
  function St (t, e, r, n) {
    if (t) {
      r = r || document
      do {
        if (
          (e != null &&
                        (e[0] === '>'
                          ? t.parentNode === r && _r(t, e)
                          : _r(t, e))) ||
                    (n && t === r)
        ) {
          return t
        }
        if (t === r) break
      } while ((t = xo(t)))
    }
    return null
  }
  const uo = /\s+/g
  function ft (t, e, r) {
    if (t && e) {
      if (t.classList) t.classList[r ? 'add' : 'remove'](e)
      else {
        const n = (' ' + t.className + ' ')
          .replace(uo, ' ')
          .replace(' ' + e + ' ', ' ')
        t.className = (n + (r ? ' ' + e : '')).replace(uo, ' ')
      }
    }
  }
  function ae (t, e, r) {
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
        const n = ae(t, 'transform')
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
  function Eo (t, e, r) {
    if (t) {
      const n = t.getElementsByTagName(e)
      let i = 0
      const o = n.length
      if (r) for (; i < o; i++) r(n[i], i)
      return n
    }
    return []
  }
  function Pt () {
    const t = document.scrollingElement
    return t || document.documentElement
  }
  function qe (t, e, r, n, i) {
    if (!(!t.getBoundingClientRect && t !== window)) {
      let o, s, h, u, f, w, m
      if (
        (t !== window && t.parentNode && t !== Pt()
          ? ((o = t.getBoundingClientRect()),
            (s = o.top),
            (h = o.left),
            (u = o.bottom),
            (f = o.right),
            (w = o.height),
            (m = o.width))
          : ((s = 0),
            (h = 0),
            (u = window.innerHeight),
            (f = window.innerWidth),
            (w = window.innerHeight),
            (m = window.innerWidth)),
        (e || r) && t !== window && ((i = i || t.parentNode), !Wt))
      ) {
        do {
          if (
            i &&
                        i.getBoundingClientRect &&
                        (ae(i, 'transform') !== 'none' ||
                            (r && ae(i, 'position') !== 'static'))
          ) {
            const E = i.getBoundingClientRect();
            (s -= E.top + parseInt(ae(i, 'border-top-width'))),
            (h -=
                                E.left + parseInt(ae(i, 'border-left-width'))),
            (u = s + o.height),
            (f = h + o.width)
            break
          }
        } while ((i = i.parentNode))
      }
      if (n && t !== window) {
        const O = Ln(i || t)
        const S = O && O.a
        const P = O && O.d
        O &&
                    ((s /= P),
                    (h /= S),
                    (m /= S),
                    (w /= P),
                    (u = s + w),
                    (f = h + m))
      }
      return {
        top: s,
        left: h,
        bottom: u,
        right: f,
        width: m,
        height: w
      }
    }
  }
  function po (t, e, r) {
    for (let n = sn(t, !0), i = qe(t)[e]; n;) {
      const o = qe(n)[r]
      let s = void 0
      if (
        (r === 'top' || r === 'left' ? (s = i >= o) : (s = i <= o), !s)
      ) {
        return n
      }
      if (n === Pt()) break
      n = sn(n, !1)
    }
    return !1
  }
  function Nn (t, e, r, n) {
    for (let i = 0, o = 0, s = t.children; o < s.length;) {
      if (
        s[o].style.display !== 'none' &&
                s[o] !== se.ghost &&
                (n || s[o] !== se.dragged) &&
                St(s[o], r.draggable, t, !1)
      ) {
        if (i === e) return s[o]
        i++
      }
      o++
    }
    return null
  }
  function yi (t, e) {
    for (
      var r = t.lastElementChild;
      r &&
            (r === se.ghost || ae(r, 'display') === 'none' || (e && !_r(r, e)));

    ) {
      r = r.previousElementSibling
    }
    return r || null
  }
  function vt (t, e) {
    let r = 0
    if (!t || !t.parentNode) return -1
    for (; (t = t.previousElementSibling);) {
      t.nodeName.toUpperCase() !== 'TEMPLATE' &&
                t !== se.clone &&
                (!e || _r(t, e)) &&
                r++
    }
    return r
  }
  function ho (t) {
    let e = 0
    let r = 0
    const n = Pt()
    if (t) {
      do {
        const i = Ln(t)
        const o = i.a
        const s = i.d;
        (e += t.scrollLeft * o), (r += t.scrollTop * s)
      } while (t !== n && (t = t.parentNode))
    }
    return [e, r]
  }
  function ka (t, e) {
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
    if (!t || !t.getBoundingClientRect) return Pt()
    let r = t
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
          if (n || e) return r
          n = !0
        }
      }
    } while ((r = r.parentNode))
    return Pt()
  }
  function ja (t, e) {
    if (t && e) for (const r in e) e.hasOwnProperty(r) && (t[r] = e[r])
    return t
  }
  function oi (t, e) {
    return (
      Math.round(t.top) === Math.round(e.top) &&
            Math.round(t.left) === Math.round(e.left) &&
            Math.round(t.height) === Math.round(e.height) &&
            Math.round(t.width) === Math.round(e.width)
    )
  }
  let Kn
  function Oo (t, e) {
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
  function Ba () {
    clearTimeout(Kn), (Kn = void 0)
  }
  function So (t, e, r) {
    (t.scrollLeft += e), (t.scrollTop += r)
  }
  function Ao (t) {
    const e = window.Polymer
    const r = window.jQuery || window.Zepto
    return e && e.dom
      ? e.dom(t).cloneNode(!0)
      : r
        ? r(t).clone(!0)[0]
        : t.cloneNode(!0)
  }
  function Do (t, e, r) {
    const n = {}
    return (
      Array.from(t.children).forEach(function (i) {
        let o, s, h, u
        if (!(!St(i, e.draggable, t, !1) || i.animated || i === r)) {
          const f = qe(i);
          (n.left = Math.min(
            (o = n.left) !== null && o !== void 0 ? o : 1 / 0,
            f.left
          )),
          (n.top = Math.min(
            (s = n.top) !== null && s !== void 0 ? s : 1 / 0,
            f.top
          )),
          (n.right = Math.max(
            (h = n.right) !== null && h !== void 0 ? h : -1 / 0,
            f.right
          )),
          (n.bottom = Math.max(
            (u = n.bottom) !== null && u !== void 0
              ? u
              : -1 / 0,
            f.bottom
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
  function Ha () {
    let t = []
    let e
    return {
      captureAnimationState: function () {
        if (((t = []), !!this.options.animation)) {
          const n = [].slice.call(this.el.children)
          n.forEach(function (i) {
            if (!(ae(i, 'display') === 'none' || i === se.ghost)) {
              t.push({ target: i, rect: qe(i) })
              const o = Mt({}, t[t.length - 1].rect)
              if (i.thisAnimationDuration) {
                const s = Ln(i, !0)
                s && ((o.top -= s.f), (o.left -= s.e))
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
        t.splice(ka(t, { target: n }), 1)
      },
      animateAll: function (n) {
        const i = this
        if (!this.options.animation) {
          clearTimeout(e), typeof n === 'function' && n()
          return
        }
        let o = !1
        let s = 0
        t.forEach(function (h) {
          let u = 0
          const f = h.target
          const w = f.fromRect
          const m = qe(f)
          const E = f.prevFromRect
          const O = f.prevToRect
          const S = h.rect
          const P = Ln(f, !0)
          P && ((m.top -= P.f), (m.left -= P.e)),
          (f.toRect = m),
          f.thisAnimationDuration &&
                            oi(E, m) &&
                            !oi(w, m) &&
                            (S.top - m.top) / (S.left - m.left) ===
                                (w.top - m.top) / (w.left - m.left) &&
                            (u = Wa(S, E, O, i.options)),
          oi(m, w) ||
                            ((f.prevFromRect = w),
                            (f.prevToRect = m),
                            u || (u = i.options.animation),
                            i.animate(f, S, m, u)),
          u &&
                            ((o = !0),
                            (s = Math.max(s, u)),
                            clearTimeout(f.animationResetTimer),
                            (f.animationResetTimer = setTimeout(function () {
                              (f.animationTime = 0),
                              (f.prevFromRect = null),
                              (f.fromRect = null),
                              (f.prevToRect = null),
                              (f.thisAnimationDuration = null)
                            }, u)),
                            (f.thisAnimationDuration = u))
        }),
        clearTimeout(e),
        o
          ? (e = setTimeout(function () {
              typeof n === 'function' && n()
            }, s))
          : typeof n === 'function' && n(),
        (t = [])
      },
      animate: function (n, i, o, s) {
        if (s) {
          ae(n, 'transition', ''), ae(n, 'transform', '')
          const h = Ln(this.el)
          const u = h && h.a
          const f = h && h.d
          const w = (i.left - o.left) / (u || 1)
          const m = (i.top - o.top) / (f || 1);
          (n.animatingX = !!w),
          (n.animatingY = !!m),
          ae(
            n,
            'transform',
            'translate3d(' + w + 'px,' + m + 'px,0)'
          ),
          (this.forRepaintDummy = $a(n)),
          ae(
            n,
            'transition',
            'transform ' +
                                s +
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
          }, s))
        }
      }
    }
  }
  function $a (t) {
    return t.offsetWidth
  }
  function Wa (t, e, r, n) {
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
  const ai = { initializeByDefault: !0 }
  const tr = {
    mount: function (e) {
      for (const r in ai) {
        ai.hasOwnProperty(r) && !(r in e) && (e[r] = ai[r])
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
      Mn.forEach(function (s) {
        r[s.pluginName] &&
                    (r[s.pluginName][o] &&
                        r[s.pluginName][o](Mt({ sortable: r }, n)),
                    r.options[s.pluginName] &&
                        r[s.pluginName][e] &&
                        r[s.pluginName][e](Mt({ sortable: r }, n)))
      })
    },
    initializePlugins: function (e, r, n, i) {
      Mn.forEach(function (h) {
        const u = h.pluginName
        if (!(!e.options[u] && !h.initializeByDefault)) {
          const f = new h(e, r, e.options);
          (f.sortable = e),
          (f.options = e.options),
          (e[u] = f),
          $t(n, f.defaults)
        }
      })
      for (const o in e.options) {
        if (e.options.hasOwnProperty(o)) {
          const s = this.modifyOption(e, o, e.options[o])
          typeof s < 'u' && (e.options[o] = s)
        }
      }
    },
    getEventProperties: function (e, r) {
      const n = {}
      return (
        Mn.forEach(function (i) {
          typeof i.eventProperties === 'function' &&
                        $t(n, i.eventProperties.call(r[i.pluginName], e))
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
  function Va (t) {
    let e = t.sortable
    const r = t.rootEl
    const n = t.name
    const i = t.targetEl
    const o = t.cloneEl
    const s = t.toEl
    const h = t.fromEl
    const u = t.oldIndex
    const f = t.newIndex
    const w = t.oldDraggableIndex
    const m = t.newDraggableIndex
    const E = t.originalEvent
    const O = t.putSortable
    const S = t.extraEventProperties
    if (((e = e || (r && r[st])), !!e)) {
      let P
      const R = e.options
      const $ = 'on' + n.charAt(0).toUpperCase() + n.substr(1)
      window.CustomEvent && !Wt && !er
        ? (P = new CustomEvent(n, { bubbles: !0, cancelable: !0 }))
        : ((P = document.createEvent('Event')), P.initEvent(n, !0, !0)),
      (P.to = s || r),
      (P.from = h || r),
      (P.item = i || r),
      (P.clone = o),
      (P.oldIndex = u),
      (P.newIndex = f),
      (P.oldDraggableIndex = w),
      (P.newDraggableIndex = m),
      (P.originalEvent = E),
      (P.pullMode = O ? O.lastPutMode : void 0)
      const B = Mt(Mt({}, S), tr.getEventProperties(n, e))
      for (const K in B) P[K] = B[K]
      r && r.dispatchEvent(P), R[$] && R[$].call(e, P)
    }
  }
  const za = ['evt']
  const at = function (e, r) {
    const n =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    const i = n.evt
    const o = La(n, za)
    tr.pluginEvent.bind(se)(
      e,
      r,
      Mt(
        {
          dragEl: L,
          parentEl: ze,
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
          hideGhostForTarget: Po,
          unhideGhostForTarget: Mo,
          cloneNowHidden: function () {
            an = !0
          },
          cloneNowShown: function () {
            an = !1
          },
          dispatchSortableEvent: function (h) {
            it({ sortable: r, name: h, originalEvent: i })
          }
        },
        o
      )
    )
  }
  function it (t) {
    Va(
      Mt(
        {
          putSortable: Ze,
          cloneEl: We,
          targetEl: L,
          rootEl: ke,
          oldIndex: Fn,
          oldDraggableIndex: Jn,
          newIndex: ut,
          newDraggableIndex: on
        },
        t
      )
    )
  }
  let L
  let ze
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
  const Mr = []
  let mn
  let Ot
  let si
  let li
  let vo
  let mo
  let Yn
  let Rn
  let Zn
  let Qn = !1
  let xr = !1
  let Dr
  let nt
  let ci = []
  let hi = !1
  const Rr = []
  const Fr = typeof document < 'u'
  const Er = bi
  const go = er || Wt ? 'cssFloat' : 'float'
  const Ua = Fr && !yo && !bi && 'draggable' in document.createElement('div')
  const Co = (function () {
    if (Fr) {
      if (Wt) return !1
      const t = document.createElement('x')
      return (
        (t.style.cssText = 'pointer-events:auto'),
        t.style.pointerEvents === 'auto'
      )
    }
  })()
  const To = function (e, r) {
    const n = ae(e)
    const i =
            parseInt(n.width) -
            parseInt(n.paddingLeft) -
            parseInt(n.paddingRight) -
            parseInt(n.borderLeftWidth) -
            parseInt(n.borderRightWidth)
    const o = Nn(e, 0, r)
    const s = Nn(e, 1, r)
    const h = o && ae(o)
    const u = s && ae(s)
    const f =
            h && parseInt(h.marginLeft) + parseInt(h.marginRight) + qe(o).width
    const w =
            u && parseInt(u.marginLeft) + parseInt(u.marginRight) + qe(s).width
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
    if (o && h.float && h.float !== 'none') {
      const m = h.float === 'left' ? 'left' : 'right'
      return s && (u.clear === 'both' || u.clear === m)
        ? 'vertical'
        : 'horizontal'
    }
    return o &&
            (h.display === 'block' ||
                h.display === 'flex' ||
                h.display === 'table' ||
                h.display === 'grid' ||
                (f >= i && n[go] === 'none') ||
                (s && n[go] === 'none' && f + w > i))
      ? 'vertical'
      : 'horizontal'
  }
  const Ya = function (e, r, n) {
    const i = n ? e.left : e.top
    const o = n ? e.right : e.bottom
    const s = n ? e.width : e.height
    const h = n ? r.left : r.top
    const u = n ? r.right : r.bottom
    const f = n ? r.width : r.height
    return i === h || o === u || i + s / 2 === h + f / 2
  }
  const Xa = function (e, r) {
    let n
    return (
      Mr.some(function (i) {
        const o = i[st].options.emptyInsertThreshold
        if (!(!o || yi(i))) {
          const s = qe(i)
          const h = e >= s.left - o && e <= s.right + o
          const u = r >= s.top - o && r <= s.bottom + o
          if (h && u) return (n = i)
        }
      }),
      n
    )
  }
  const _o = function (e) {
    function r (o, s) {
      return function (h, u, f, w) {
        const m =
                    h.options.group.name &&
                    u.options.group.name &&
                    h.options.group.name === u.options.group.name
        if (o == null && (s || m)) return !0
        if (o == null || o === !1) return !1
        if (s && o === 'clone') return o
        if (typeof o === 'function') {
          return r(o(h, u, f, w), s)(h, u, f, w)
        }
        const E = (s ? h : u).options.group.name
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
  var Po = function () {
    !Co && ue && ae(ue, 'display', 'none')
  }
  var Mo = function () {
    !Co && ue && ae(ue, 'display', '')
  }
  Fr &&
        !yo &&
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
    if (L) {
      e = e.touches ? e.touches[0] : e
      const r = Xa(e.clientX, e.clientY)
      if (r) {
        const n = {}
        for (const i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
        (n.target = n.rootEl = r),
        (n.preventDefault = void 0),
        (n.stopPropagation = void 0),
        r[st]._onDragOver(n)
      }
    }
  }
  const qa = function (e) {
    L && L.parentNode[st]._isOutsideThisEl(e.target)
  }
  function se (t, e) {
    if (!(t && t.nodeType && t.nodeType === 1)) {
      throw 'Sortable: `el` must be an HTMLElement, not '.concat(
        {}.toString.call(t)
      )
    }
    (this.el = t), (this.options = e = $t({}, e)), (t[st] = this)
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
        return To(t, this.options)
      },
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: !0,
      animation: 0,
      easing: null,
      setData: function (s, h) {
        s.setData('Text', h.textContent)
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
                (!Gn || bi),
      emptyInsertThreshold: 5
    }
    tr.initializePlugins(this, t, r)
    for (const n in r) !(n in e) && (e[n] = r[n])
    _o(e)
    for (const i in this) {
      i.charAt(0) === '_' &&
                typeof this[i] === 'function' &&
                (this[i] = this[i].bind(this))
    }
    (this.nativeDraggable = e.forceFallback ? !1 : Ua),
    this.nativeDraggable && (this.options.touchStartThreshold = 1),
    e.supportPointer
      ? Oe(t, 'pointerdown', this._onTapStart)
      : (Oe(t, 'mousedown', this._onTapStart),
        Oe(t, 'touchstart', this._onTapStart)),
    this.nativeDraggable &&
                (Oe(t, 'dragover', this), Oe(t, 'dragenter', this)),
    Mr.push(this.el),
    e.store && e.store.get && this.sort(e.store.get(this) || []),
    $t(this, Ha())
  }
  se.prototype = {
    constructor: se,
    _isOutsideThisEl: function (e) {
      !this.el.contains(e) && e !== this.el && (Rn = null)
    },
    _getDirection: function (e, r) {
      return typeof this.options.direction === 'function'
        ? this.options.direction.call(this, e, r, L)
        : this.options.direction
    },
    _onTapStart: function (e) {
      if (e.cancelable) {
        const r = this
        const n = this.el
        const i = this.options
        const o = i.preventOnFilter
        const s = e.type
        const h =
                    (e.touches && e.touches[0]) ||
                    (e.pointerType && e.pointerType === 'touch' && e)
        let u = (h || e).target
        const f =
                    (e.target.shadowRoot &&
                        ((e.path && e.path[0]) ||
                            (e.composedPath && e.composedPath()[0]))) ||
                    u
        let w = i.filter
        if (
          (ns(n),
          !L &&
                        !(
                          (/mousedown|pointerdown/.test(s) &&
                                e.button !== 0) ||
                            i.disabled
                        ) &&
                        !f.isContentEditable &&
                        !(
                          !this.nativeDraggable &&
                            Gn &&
                            u &&
                            u.tagName.toUpperCase() === 'SELECT'
                        ) &&
                        ((u = St(u, i.draggable, n, !1)),
                        !(u && u.animated) && Ar !== u))
        ) {
          if (
            ((Fn = vt(u)),
            (Jn = vt(u, i.draggable)),
            typeof w === 'function')
          ) {
            if (w.call(this, e, u, this)) {
              it({
                sortable: r,
                rootEl: f,
                name: 'filter',
                targetEl: u,
                toEl: n,
                fromEl: n
              }),
              at('filter', r, { evt: e }),
              o && e.preventDefault()
              return
            }
          } else if (
            w &&
                        ((w = w.split(',').some(function (m) {
                          if (((m = St(f, m.trim(), n, !1)), m)) {
                            return (
                              it({
                                sortable: r,
                                rootEl: m,
                                name: 'filter',
                                targetEl: u,
                                fromEl: n,
                                toEl: n
                              }),
                              at('filter', r, { evt: e }),
                              !0
                            )
                          }
                        })),
                        w)
          ) {
            o && e.preventDefault()
            return
          }
          (i.handle && !St(f, i.handle, n, !1)) ||
                        this._prepareDragStart(e, h, u)
        }
      }
    },
    _prepareDragStart: function (e, r, n) {
      const i = this
      const o = i.el
      const s = i.options
      const h = o.ownerDocument
      let u
      if (n && !L && n.parentNode === o) {
        const f = qe(n)
        if (
          ((ke = o),
          (L = n),
          (ze = L.parentNode),
          (bn = L.nextSibling),
          (Ar = n),
          (wr = s.group),
          (se.dragged = L),
          (mn = {
            target: L,
            clientX: (r || e).clientX,
            clientY: (r || e).clientY
          }),
          (vo = mn.clientX - f.left),
          (mo = mn.clientY - f.top),
          (this._lastX = (r || e).clientX),
          (this._lastY = (r || e).clientY),
          (L.style['will-change'] = 'all'),
          (u = function () {
            if (
              (at('delayEnded', i, { evt: e }), se.eventCanceled)
            ) {
              i._onDrop()
              return
            }
            i._disableDelayedDragEvents(),
            !fo && i.nativeDraggable && (L.draggable = !0),
            i._triggerDragStart(e, r),
            it({
              sortable: i,
              name: 'choose',
              originalEvent: e
            }),
            ft(L, s.chosenClass, !0)
          }),
          s.ignore.split(',').forEach(function (w) {
            Eo(L, w.trim(), fi)
          }),
          Oe(h, 'dragover', gn),
          Oe(h, 'mousemove', gn),
          Oe(h, 'touchmove', gn),
          s.supportPointer
            ? (Oe(h, 'pointerup', i._onDrop),
              !this.nativeDraggable &&
                              Oe(h, 'pointercancel', i._onDrop))
            : (Oe(h, 'mouseup', i._onDrop),
              Oe(h, 'touchend', i._onDrop),
              Oe(h, 'touchcancel', i._onDrop)),
          fo &&
                        this.nativeDraggable &&
                        ((this.options.touchStartThreshold = 4),
                        (L.draggable = !0)),
          at('delayStart', this, { evt: e }),
          s.delay &&
                        (!s.delayOnTouchOnly || r) &&
                        (!this.nativeDraggable || !(er || Wt)))
        ) {
          if (se.eventCanceled) {
            this._onDrop()
            return
          }
          s.supportPointer
            ? (Oe(h, 'pointerup', i._disableDelayedDrag),
              Oe(h, 'pointercancel', i._disableDelayedDrag))
            : (Oe(h, 'mouseup', i._disableDelayedDrag),
              Oe(h, 'touchend', i._disableDelayedDrag),
              Oe(h, 'touchcancel', i._disableDelayedDrag)),
          Oe(h, 'mousemove', i._delayedDragTouchMoveHandler),
          Oe(h, 'touchmove', i._delayedDragTouchMoveHandler),
          s.supportPointer &&
                            Oe(
                              h,
                              'pointermove',
                              i._delayedDragTouchMoveHandler
                            ),
          (i._dragStartTimer = setTimeout(u, s.delay))
        } else u()
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
      L && fi(L),
      clearTimeout(this._dragStartTimer),
      this._disableDelayedDragEvents()
    },
    _disableDelayedDragEvents: function () {
      const e = this.el.ownerDocument
      Ee(e, 'mouseup', this._disableDelayedDrag),
      Ee(e, 'touchend', this._disableDelayedDrag),
      Ee(e, 'touchcancel', this._disableDelayedDrag),
      Ee(e, 'pointerup', this._disableDelayedDrag),
      Ee(e, 'pointercancel', this._disableDelayedDrag),
      Ee(e, 'mousemove', this._delayedDragTouchMoveHandler),
      Ee(e, 'touchmove', this._delayedDragTouchMoveHandler),
      Ee(e, 'pointermove', this._delayedDragTouchMoveHandler)
    },
    _triggerDragStart: function (e, r) {
      (r = r || (e.pointerType == 'touch' && e)),
      !this.nativeDraggable || r
        ? this.options.supportPointer
          ? Oe(document, 'pointermove', this._onTouchMove)
          : r
            ? Oe(document, 'touchmove', this._onTouchMove)
            : Oe(document, 'mousemove', this._onTouchMove)
        : (Oe(L, 'dragend', this),
          Oe(ke, 'dragstart', this._onDragStart))
      try {
        document.selection
          ? Cr(function () {
            document.selection.empty()
          })
          : window.getSelection().removeAllRanges()
      } catch {}
    },
    _dragStarted: function (e, r) {
      if (((In = !1), ke && L)) {
        at('dragStarted', this, { evt: r }),
        this.nativeDraggable && Oe(document, 'dragover', qa)
        const n = this.options
        !e && ft(L, n.dragClass, !1),
        ft(L, n.ghostClass, !0),
        (se.active = this),
        e && this._appendGhost(),
        it({ sortable: this, name: 'start', originalEvent: r })
      } else this._nulling()
    },
    _emulateDragOver: function () {
      if (Ot) {
        (this._lastX = Ot.clientX), (this._lastY = Ot.clientY), Po()
        for (
          var e = document.elementFromPoint(Ot.clientX, Ot.clientY),
            r = e;
          e &&
                    e.shadowRoot &&
                    ((e = e.shadowRoot.elementFromPoint(
                      Ot.clientX,
                      Ot.clientY
                    )),
                    e !== r);

        ) {
          r = e
        }
        if ((L.parentNode[st]._isOutsideThisEl(e), r)) {
          do {
            if (r[st]) {
              let n = void 0
              if (
                ((n = r[st]._onDragOver({
                  clientX: Ot.clientX,
                  clientY: Ot.clientY,
                  target: e,
                  rootEl: r
                })),
                n && !this.options.dragoverBubble)
              ) {
                break
              }
            }
            e = r
          } while ((r = xo(r)))
        }
        Mo()
      }
    },
    _onTouchMove: function (e) {
      if (mn) {
        const r = this.options
        const n = r.fallbackTolerance
        const i = r.fallbackOffset
        const o = e.touches ? e.touches[0] : e
        let s = ue && Ln(ue, !0)
        const h = ue && s && s.a
        const u = ue && s && s.d
        const f = Er && nt && ho(nt)
        const w =
                    (o.clientX - mn.clientX + i.x) / (h || 1) +
                    (f ? f[0] - ci[0] : 0) / (h || 1)
        const m =
                    (o.clientY - mn.clientY + i.y) / (u || 1) +
                    (f ? f[1] - ci[1] : 0) / (u || 1)
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
          this._onDragStart(e, !0)
        }
        if (ue) {
          s
            ? ((s.e += w - (si || 0)), (s.f += m - (li || 0)))
            : (s = { a: 1, b: 0, c: 0, d: 1, e: w, f: m })
          const E = 'matrix('
            .concat(s.a, ',')
            .concat(s.b, ',')
            .concat(s.c, ',')
            .concat(s.d, ',')
            .concat(s.e, ',')
            .concat(s.f, ')')
          ae(ue, 'webkitTransform', E),
          ae(ue, 'mozTransform', E),
          ae(ue, 'msTransform', E),
          ae(ue, 'transform', E),
          (si = w),
          (li = m),
          (Ot = o)
        }
        e.cancelable && e.preventDefault()
      }
    },
    _appendGhost: function () {
      if (!ue) {
        const e = this.options.fallbackOnBody ? document.body : ke
        const r = qe(L, !0, Er, !0, e)
        const n = this.options
        if (Er) {
          for (
            nt = e;
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
          (ci = ho(nt))
        }
        (ue = L.cloneNode(!0)),
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
        e.appendChild(ue),
        ae(
          ue,
          'transform-origin',
          (vo / parseInt(ue.style.width)) * 100 +
                            '% ' +
                            (mo / parseInt(ue.style.height)) * 100 +
                            '%'
        )
      }
    },
    _onDragStart: function (e, r) {
      const n = this
      const i = e.dataTransfer
      const o = n.options
      if ((at('dragStart', this, { evt: e }), se.eventCanceled)) {
        this._onDrop()
        return
      }
      at('setupClone', this),
      se.eventCanceled ||
                    ((We = Ao(L)),
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
                                ke.insertBefore(We, L),
                            n._hideClone(),
                            it({ sortable: n, name: 'clone' }))
      })),
      !r && ft(L, o.dragClass, !0),
      r
        ? ((Pr = !0),
          (n._loopId = setInterval(n._emulateDragOver, 50)))
        : (Ee(document, 'mouseup', n._onDrop),
          Ee(document, 'touchend', n._onDrop),
          Ee(document, 'touchcancel', n._onDrop),
          i &&
                          ((i.effectAllowed = 'move'),
                          o.setData && o.setData.call(n, i, L)),
          Oe(document, 'drop', n),
          ae(L, 'transform', 'translateZ(0)')),
      (In = !0),
      (n._dragStartId = Cr(n._dragStarted.bind(n, r, e))),
      Oe(document, 'selectstart', n),
      (Yn = !0),
      window.getSelection().removeAllRanges(),
      Gn && ae(document.body, 'user-select', 'none')
    },
    _onDragOver: function (e) {
      const r = this.el
      let n = e.target
      let i
      let o
      let s
      const h = this.options
      const u = h.group
      const f = se.active
      const w = wr === u
      const m = h.sort
      const E = Ze || f
      let O
      const S = this
      let P = !1
      if (hi) return
      function R (M, Q) {
        at(
          M,
          S,
          Mt(
            {
              evt: e,
              isOwner: w,
              axis: O ? 'vertical' : 'horizontal',
              revert: s,
              dragRect: i,
              targetRect: o,
              canSort: m,
              fromSortable: E,
              target: n,
              completed: B,
              onMove: function (Rt, Vt) {
                return Or(ke, r, L, i, Rt, qe(Rt), e, Vt)
              },
              changed: K
            },
            Q
          )
        )
      }
      function $ () {
        R('dragOverAnimationCapture'),
        S.captureAnimationState(),
        S !== E && E.captureAnimationState()
      }
      function B (M) {
        return (
          R('dragOverCompleted', { insertion: M }),
          M &&
                        (w ? f._hideClone() : f._showClone(S),
                        S !== E &&
                            (ft(
                              L,
                              Ze
                                ? Ze.options.ghostClass
                                : f.options.ghostClass,
                              !1
                            ),
                            ft(L, h.ghostClass, !0)),
                        Ze !== S && S !== se.active
                          ? (Ze = S)
                          : S === se.active && Ze && (Ze = null),
                        E === S && (S._ignoreWhileAnimating = n),
                        S.animateAll(function () {
                          R('dragOverAnimationComplete'),
                          (S._ignoreWhileAnimating = null)
                        }),
                        S !== E &&
                            (E.animateAll(), (E._ignoreWhileAnimating = null))),
          ((n === L && !L.animated) || (n === r && !n.animated)) &&
                        (Rn = null),
          !h.dragoverBubble &&
                        !e.rootEl &&
                        n !== document &&
                        (L.parentNode[st]._isOutsideThisEl(e.target),
                        !M && gn(e)),
          !h.dragoverBubble &&
                        e.stopPropagation &&
                        e.stopPropagation(),
          (P = !0)
        )
      }
      function K () {
        (ut = vt(L)),
        (on = vt(L, h.draggable)),
        it({
          sortable: S,
          name: 'change',
          toEl: r,
          newIndex: ut,
          newDraggableIndex: on,
          originalEvent: e
        })
      }
      if (
        (e.preventDefault !== void 0 &&
                    e.cancelable &&
                    e.preventDefault(),
        (n = St(n, h.draggable, r, !0)),
        R('dragOver'),
        se.eventCanceled)
      ) {
        return P
      }
      if (
        L.contains(e.target) ||
                (n.animated && n.animatingX && n.animatingY) ||
                S._ignoreWhileAnimating === n
      ) {
        return B(!1)
      }
      if (
        ((Pr = !1),
        f &&
                    !h.disabled &&
                    (w
                      ? m || (s = ze !== ke)
                      : Ze === this ||
                          ((this.lastPutMode = wr.checkPull(this, f, L, e)) &&
                              u.checkPut(this, f, L, e))))
      ) {
        if (
          ((O = this._getDirection(e, n) === 'vertical'),
          (i = qe(L)),
          R('dragOverValid'),
          se.eventCanceled)
        ) {
          return P
        }
        if (s) {
          return (
            (ze = ke),
            $(),
            this._hideClone(),
            R('revert'),
            se.eventCanceled ||
                            (bn ? ke.insertBefore(L, bn) : ke.appendChild(L)),
            B(!0)
          )
        }
        const X = yi(r, h.draggable)
        if (!X || (Za(e, O, this) && !X.animated)) {
          if (X === L) return B(!1)
          if (
            (X && r === e.target && (n = X),
            n && (o = qe(n)),
            Or(ke, r, L, i, n, o, e, !!n) !== !1)
          ) {
            return (
              $(),
              X && X.nextSibling
                ? r.insertBefore(L, X.nextSibling)
                : r.appendChild(L),
              (ze = r),
              K(),
              B(!0)
            )
          }
        } else if (X && Ja(e, O, this)) {
          const ne = Nn(r, 0, h, !0)
          if (ne === L) return B(!1)
          if (
            ((n = ne),
            (o = qe(n)),
            Or(ke, r, L, i, n, o, e, !1) !== !1)
          ) {
            return $(), r.insertBefore(L, ne), (ze = r), K(), B(!0)
          }
        } else if (n.parentNode === r) {
          o = qe(n)
          let J = 0
          let V
          const de = L.parentNode !== r
          const U = !Ya(
            (L.animated && L.toRect) || i,
            (n.animated && n.toRect) || o,
            O
          )
          const Z = O ? 'top' : 'left'
          const me = po(n, 'top', 'top') || po(L, 'top', 'top')
          const l = me ? me.scrollTop : void 0
          Rn !== n &&
                        ((V = o[Z]),
                        (Qn = !1),
                        (xr = (!U && h.invertSwap) || de)),
          (J = Qa(
            e,
            n,
            o,
            O,
            U ? 1 : h.swapThreshold,
            h.invertedSwapThreshold == null
              ? h.swapThreshold
              : h.invertedSwapThreshold,
            xr,
            Rn === n
          ))
          let p
          if (J !== 0) {
            let v = vt(L)
            do (v -= J), (p = ze.children[v])
            while (p && (ae(p, 'display') === 'none' || p === ue))
          }
          if (J === 0 || p === n) return B(!1);
          (Rn = n), (Zn = J)
          const d = n.nextElementSibling
          let N = !1
          N = J === 1
          const _ = Or(ke, r, L, i, n, o, e, N)
          if (_ !== !1) {
            return (
              (_ === 1 || _ === -1) && (N = _ === 1),
              (hi = !0),
              setTimeout(Ka, 30),
              $(),
              N && !d
                ? r.appendChild(L)
                : n.parentNode.insertBefore(L, N ? d : n),
              me && So(me, 0, l - me.scrollTop),
              (ze = L.parentNode),
              V !== void 0 &&
                                !xr &&
                                (Dr = Math.abs(V - qe(n)[Z])),
              K(),
              B(!0)
            )
          }
        }
        if (r.contains(L)) return B(!1)
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
      const e = this.el.ownerDocument
      Ee(e, 'mouseup', this._onDrop),
      Ee(e, 'touchend', this._onDrop),
      Ee(e, 'pointerup', this._onDrop),
      Ee(e, 'pointercancel', this._onDrop),
      Ee(e, 'touchcancel', this._onDrop),
      Ee(document, 'selectstart', this)
    },
    _onDrop: function (e) {
      const r = this.el
      const n = this.options
      if (
        ((ut = vt(L)),
        (on = vt(L, n.draggable)),
        at('drop', this, { evt: e }),
        (ze = L && L.parentNode),
        (ut = vt(L)),
        (on = vt(L, n.draggable)),
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
      vi(this.cloneId),
      vi(this._dragStartId),
      this.nativeDraggable &&
                    (Ee(document, 'drop', this),
                    Ee(r, 'dragstart', this._onDragStart)),
      this._offMoveEvents(),
      this._offUpEvents(),
      Gn && ae(document.body, 'user-select', ''),
      ae(L, 'transform', ''),
      e &&
                    (Yn &&
                        (e.cancelable && e.preventDefault(),
                        !n.dropBubble && e.stopPropagation()),
                    ue && ue.parentNode && ue.parentNode.removeChild(ue),
                    (ke === ze || (Ze && Ze.lastPutMode !== 'clone')) &&
                        We &&
                        We.parentNode &&
                        We.parentNode.removeChild(We),
                    L &&
                        (this.nativeDraggable && Ee(L, 'dragend', this),
                        fi(L),
                        (L.style['will-change'] = ''),
                        Yn &&
                            !In &&
                            ft(
                              L,
                              Ze
                                ? Ze.options.ghostClass
                                : this.options.ghostClass,
                              !1
                            ),
                        ft(L, this.options.chosenClass, !1),
                        it({
                          sortable: this,
                          name: 'unchoose',
                          toEl: ze,
                          newIndex: null,
                          newDraggableIndex: null,
                          originalEvent: e
                        }),
                        ke !== ze
                          ? (ut >= 0 &&
                                  (it({
                                    rootEl: ze,
                                    name: 'add',
                                    toEl: ze,
                                    fromEl: ke,
                                    originalEvent: e
                                  }),
                                  it({
                                    sortable: this,
                                    name: 'remove',
                                    toEl: ze,
                                    originalEvent: e
                                  }),
                                  it({
                                    rootEl: ze,
                                    name: 'sort',
                                    toEl: ze,
                                    fromEl: ke,
                                    originalEvent: e
                                  }),
                                  it({
                                    sortable: this,
                                    name: 'sort',
                                    toEl: ze,
                                    originalEvent: e
                                  })),
                            Ze && Ze.save())
                          : ut !== Fn &&
                              ut >= 0 &&
                              (it({
                                sortable: this,
                                name: 'update',
                                toEl: ze,
                                originalEvent: e
                              }),
                              it({
                                sortable: this,
                                name: 'sort',
                                toEl: ze,
                                originalEvent: e
                              })),
                        se.active &&
                            ((ut == null || ut === -1) &&
                                ((ut = Fn), (on = Jn)),
                            it({
                              sortable: this,
                              name: 'end',
                              toEl: ze,
                              originalEvent: e
                            }),
                            this.save()))),
      this._nulling()
    },
    _nulling: function () {
      at('nulling', this),
      (ke =
                    L =
                    ze =
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
                    Rn =
                    Zn =
                    Ze =
                    wr =
                    se.dragged =
                    se.ghost =
                    se.clone =
                    se.active =
                        null),
      Rr.forEach(function (e) {
        e.checked = !0
      }),
      (Rr.length = si = li = 0)
    },
    handleEvent: function (e) {
      switch (e.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(e)
          break
        case 'dragenter':
        case 'dragover':
          L && (this._onDragOver(e), Ga(e))
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
          s = this.options;
        i < o;
        i++
      ) {
        (r = n[i]),
        St(r, s.draggable, this.el, !1) &&
                        e.push(r.getAttribute(s.dataIdAttr) || ts(r))
      }
      return e
    },
    sort: function (e, r) {
      const n = {}
      const i = this.el
      this.toArray().forEach(function (o, s) {
        const h = i.children[s]
        St(h, this.options.draggable, i, !1) && (n[o] = h)
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
      return St(e, r || this.options.draggable, this.el, !1)
    },
    option: function (e, r) {
      const n = this.options
      if (r === void 0) return n[e]
      const i = tr.modifyOption(this, e, r)
      typeof i < 'u' ? (n[e] = i) : (n[e] = r), e === 'group' && _o(n)
    },
    destroy: function () {
      at('destroy', this)
      let e = this.el;
      (e[st] = null),
      Ee(e, 'mousedown', this._onTapStart),
      Ee(e, 'touchstart', this._onTapStart),
      Ee(e, 'pointerdown', this._onTapStart),
      this.nativeDraggable &&
                    (Ee(e, 'dragover', this), Ee(e, 'dragenter', this)),
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
        if ((at('hideClone', this), se.eventCanceled)) return
        ae(We, 'display', 'none'),
        this.options.removeCloneOnHide &&
                        We.parentNode &&
                        We.parentNode.removeChild(We),
        (an = !0)
      }
    },
    _showClone: function (e) {
      if (e.lastPutMode !== 'clone') {
        this._hideClone()
        return
      }
      if (an) {
        if ((at('showClone', this), se.eventCanceled)) return
        L.parentNode == ke && !this.options.group.revertClone
          ? ke.insertBefore(We, L)
          : bn
            ? ke.insertBefore(We, bn)
            : ke.appendChild(We),
        this.options.group.revertClone && this.animate(L, We),
        ae(We, 'display', ''),
        (an = !1)
      }
    }
  }
  function Ga (t) {
    t.dataTransfer && (t.dataTransfer.dropEffect = 'move'),
    t.cancelable && t.preventDefault()
  }
  function Or (t, e, r, n, i, o, s, h) {
    let u
    const f = t[st]
    const w = f.options.onMove
    let m
    return (
      window.CustomEvent && !Wt && !er
        ? (u = new CustomEvent('move', { bubbles: !0, cancelable: !0 }))
        : ((u = document.createEvent('Event')),
          u.initEvent('move', !0, !0)),
      (u.to = e),
      (u.from = t),
      (u.dragged = r),
      (u.draggedRect = n),
      (u.related = i || e),
      (u.relatedRect = o || qe(e)),
      (u.willInsertAfter = h),
      (u.originalEvent = s),
      t.dispatchEvent(u),
      w && (m = w.call(f, u, s)),
      m
    )
  }
  function fi (t) {
    t.draggable = !1
  }
  function Ka () {
    hi = !1
  }
  function Ja (t, e, r) {
    const n = qe(Nn(r.el, 0, r.options, !0))
    const i = Do(r.el, r.options, ue)
    const o = 10
    return e
      ? t.clientX < i.left - o ||
                  (t.clientY < n.top && t.clientX < n.right)
      : t.clientY < i.top - o ||
                  (t.clientY < n.bottom && t.clientX < n.left)
  }
  function Za (t, e, r) {
    const n = qe(yi(r.el, r.options.draggable))
    const i = Do(r.el, r.options, ue)
    const o = 10
    return e
      ? t.clientX > i.right + o ||
                  (t.clientY > n.bottom && t.clientX > n.left)
      : t.clientY > i.bottom + o ||
                  (t.clientX > n.right && t.clientY > n.top)
  }
  function Qa (t, e, r, n, i, o, s, h) {
    const u = n ? t.clientY : t.clientX
    const f = n ? r.height : r.width
    const w = n ? r.top : r.left
    const m = n ? r.bottom : r.right
    let E = !1
    if (!s) {
      if (h && Dr < f * i) {
        if (
          (!Qn &&
                        (Zn === 1
                          ? u > w + (f * o) / 2
                          : u < m - (f * o) / 2) &&
                        (Qn = !0),
          Qn)
        ) {
          E = !0
        } else if (Zn === 1 ? u < w + Dr : u > m - Dr) return -Zn
      } else if (u > w + (f * (1 - i)) / 2 && u < m - (f * (1 - i)) / 2) {
        return es(e)
      }
    }
    return (
      (E = E || s),
      E && (u < w + (f * o) / 2 || u > m - (f * o) / 2)
        ? u > w + f / 2
          ? 1
          : -1
        : 0
    )
  }
  function es (t) {
    return vt(L) < vt(t) ? 1 : -1
  }
  function ts (t) {
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
  function ns (t) {
    Rr.length = 0
    for (let e = t.getElementsByTagName('input'), r = e.length; r--;) {
      const n = e[r]
      n.checked && Rr.push(n)
    }
  }
  function Cr (t) {
    return setTimeout(t, 0)
  }
  function vi (t) {
    return clearTimeout(t)
  }
  Fr &&
        Oe(document, 'touchmove', function (t) {
          (se.active || In) && t.cancelable && t.preventDefault()
        })
  se.utils = {
    on: Oe,
    off: Ee,
    css: ae,
    find: Eo,
    is: function (e, r) {
      return !!St(e, r, e, !1)
    },
    extend: ja,
    throttle: Oo,
    closest: St,
    toggleClass: ft,
    clone: Ao,
    index: vt,
    nextTick: Cr,
    cancelNextTick: vi,
    detectDirection: To,
    getChild: Nn,
    expando: st
  }
  se.get = function (t) {
    return t[st]
  }
  se.mount = function () {
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
      n.utils && (se.utils = Mt(Mt({}, se.utils), n.utils)),
      tr.mount(n)
    })
  }
  se.create = function (t, e) {
    return new se(t, e)
  }
  se.version = Na
  let Xe = []
  let Xn
  let mi
  let gi = !1
  let ui
  let di
  let Ir
  let qn
  function rs () {
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
          bo(),
          Tr(),
          Ba()
        },
        nulling: function () {
          (Ir = mi = Xn = gi = qn = ui = di = null), (Xe.length = 0)
        },
        _handleFallbackAutoScroll: function (r) {
          this._handleAutoScroll(r, !0)
        },
        _handleAutoScroll: function (r, n) {
          const i = this
          const o = (r.touches ? r.touches[0] : r).clientX
          const s = (r.touches ? r.touches[0] : r).clientY
          const h = document.elementFromPoint(o, s)
          if (
            ((Ir = r),
            n ||
                            this.options.forceAutoScrollFallback ||
                            er ||
                            Wt ||
                            Gn)
          ) {
            pi(r, this.options, h, n)
            let u = sn(h, !0)
            gi &&
                            (!qn || o !== ui || s !== di) &&
                            (qn && bo(),
                            (qn = setInterval(function () {
                              const f = sn(
                                document.elementFromPoint(o, s),
                                !0
                              )
                              f !== u && ((u = f), Tr()),
                              pi(r, i.options, f, n)
                            }, 10)),
                            (ui = o),
                            (di = s))
          } else {
            if (!this.options.bubbleScroll || sn(h, !0) === Pt()) {
              Tr()
              return
            }
            pi(r, this.options, sn(h, !1), !1)
          }
        }
      }),
      $t(t, { pluginName: 'scroll', initializeByDefault: !0 })
    )
  }
  function Tr () {
    Xe.forEach(function (t) {
      clearInterval(t.pid)
    }),
    (Xe = [])
  }
  function bo () {
    clearInterval(qn)
  }
  var pi = Oo(function (t, e, r, n) {
    if (e.scroll) {
      const i = (t.touches ? t.touches[0] : t).clientX
      const o = (t.touches ? t.touches[0] : t).clientY
      const s = e.scrollSensitivity
      const h = e.scrollSpeed
      const u = Pt()
      let f = !1
      let w
      mi !== r &&
                ((mi = r),
                Tr(),
                (Xn = e.scroll),
                (w = e.scrollFn),
                Xn === !0 && (Xn = sn(r, !0)))
      let m = 0
      let E = Xn
      do {
        const O = E
        const S = qe(O)
        const P = S.top
        const R = S.bottom
        const $ = S.left
        const B = S.right
        const K = S.width
        const X = S.height
        let ne = void 0
        let J = void 0
        const V = O.scrollWidth
        const de = O.scrollHeight
        const U = ae(O)
        const Z = O.scrollLeft
        const me = O.scrollTop
        O === u
          ? ((ne =
                          K < V &&
                          (U.overflowX === 'auto' ||
                              U.overflowX === 'scroll' ||
                              U.overflowX === 'visible')),
            (J =
                          X < de &&
                          (U.overflowY === 'auto' ||
                              U.overflowY === 'scroll' ||
                              U.overflowY === 'visible')))
          : ((ne =
                          K < V &&
                          (U.overflowX === 'auto' || U.overflowX === 'scroll')),
            (J =
                          X < de &&
                          (U.overflowY === 'auto' ||
                              U.overflowY === 'scroll')))
        const l =
                    ne &&
                    (Math.abs(B - i) <= s && Z + K < V) -
                        (Math.abs($ - i) <= s && !!Z)
        const p =
                    J &&
                    (Math.abs(R - o) <= s && me + X < de) -
                        (Math.abs(P - o) <= s && !!me)
        if (!Xe[m]) {
          for (let v = 0; v <= m; v++) Xe[v] || (Xe[v] = {})
        }
        (Xe[m].vx != l || Xe[m].vy != p || Xe[m].el !== O) &&
                    ((Xe[m].el = O),
                    (Xe[m].vx = l),
                    (Xe[m].vy = p),
                    clearInterval(Xe[m].pid),
                    (l != 0 || p != 0) &&
                        ((f = !0),
                        (Xe[m].pid = setInterval(
                          function () {
                            n &&
                                    this.layer === 0 &&
                                    se.active._onTouchMove(Ir)
                            const d = Xe[this.layer].vy
                              ? Xe[this.layer].vy * h
                              : 0
                            const N = Xe[this.layer].vx
                              ? Xe[this.layer].vx * h
                              : 0;
                            (typeof w === 'function' &&
                                    w.call(
                                      se.dragged.parentNode[st],
                                      N,
                                      d,
                                      t,
                                      Ir,
                                      Xe[this.layer].el
                                    ) !== 'continue') ||
                                    So(Xe[this.layer].el, N, d)
                          }.bind({ layer: m }),
                          24
                        )))),
        m++
      } while (e.bubbleScroll && E !== u && (E = sn(E, !1)))
      gi = f
    }
  }, 30)
  const Ro = function (e) {
    const r = e.originalEvent
    const n = e.putSortable
    const i = e.dragEl
    const o = e.activeSortable
    const s = e.dispatchSortableEvent
    const h = e.hideGhostForTarget
    const u = e.unhideGhostForTarget
    if (r) {
      const f = n || o
      h()
      const w =
                r.changedTouches && r.changedTouches.length
                  ? r.changedTouches[0]
                  : r
      const m = document.elementFromPoint(w.clientX, w.clientY)
      u(),
      f &&
                    !f.el.contains(m) &&
                    (s('spill'), this.onSpill({ dragEl: i, putSortable: n }))
    }
  }
  function wi () {}
  wi.prototype = {
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
    drop: Ro
  }
  $t(wi, { pluginName: 'revertOnSpill' })
  function xi () {}
  xi.prototype = {
    onSpill: function (e) {
      const r = e.dragEl
      const n = e.putSortable
      const i = n || this.sortable
      i.captureAnimationState(),
      r.parentNode && r.parentNode.removeChild(r),
      i.animateAll()
    },
    drop: Ro
  }
  $t(xi, { pluginName: 'removeOnSpill' })
  se.mount(new rs())
  se.mount(xi, wi)
  const Ei = se
  window.Sortable = Ei
  const Io = (t) => {
    t.directive('sortable', (e) => {
      let r = parseInt(e.dataset?.sortableAnimationDuration)
      r !== 0 && !r && (r = 300),
      (e.sortable = Ei.create(e, {
        group: e.getAttribute('x-sortable-group'),
        draggable: '[x-sortable-item]',
        handle: '[x-sortable-handle]',
        dataIdAttr: 'x-sortable-item',
        animation: r,
        ghostClass: 'fi-sortable-ghost'
      }))
    })
  }
  const is = Object.create
  const Ai = Object.defineProperty
  const os = Object.getPrototypeOf
  const as = Object.prototype.hasOwnProperty
  const ss = Object.getOwnPropertyNames
  const ls = Object.getOwnPropertyDescriptor
  const cs = (t) => Ai(t, '__esModule', { value: !0 })
  const Fo = (t, e) => () => (
    e || ((e = { exports: {} }), t(e.exports, e)), e.exports
  )
  const fs = (t, e, r) => {
    if ((e && typeof e === 'object') || typeof e === 'function') {
      for (const n of ss(e)) {
        !as.call(t, n) &&
                    n !== 'default' &&
                    Ai(t, n, {
                      get: () => e[n],
                      enumerable: !(r = ls(e, n)) || r.enumerable
                    })
      }
    }
    return t
  }
  const Lo = (t) =>
    fs(
      cs(
        Ai(
          t != null ? is(os(t)) : {},
          'default',
          t && t.__esModule && 'default' in t
            ? { get: () => t.default, enumerable: !0 }
            : { value: t, enumerable: !0 }
        )
      ),
      t
    )
  const us = Fo((t) => {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    function e (c) {
      const a = c.getBoundingClientRect()
      return {
        width: a.width,
        height: a.height,
        top: a.top,
        right: a.right,
        bottom: a.bottom,
        left: a.left,
        x: a.left,
        y: a.top
      }
    }
    function r (c) {
      if (c == null) return window
      if (c.toString() !== '[object Window]') {
        const a = c.ownerDocument
        return (a && a.defaultView) || window
      }
      return c
    }
    function n (c) {
      const a = r(c)
      const b = a.pageXOffset
      const C = a.pageYOffset
      return { scrollLeft: b, scrollTop: C }
    }
    function i (c) {
      const a = r(c).Element
      return c instanceof a || c instanceof Element
    }
    function o (c) {
      const a = r(c).HTMLElement
      return c instanceof a || c instanceof HTMLElement
    }
    function s (c) {
      if (typeof ShadowRoot > 'u') return !1
      const a = r(c).ShadowRoot
      return c instanceof a || c instanceof ShadowRoot
    }
    function h (c) {
      return { scrollLeft: c.scrollLeft, scrollTop: c.scrollTop }
    }
    function u (c) {
      return c === r(c) || !o(c) ? n(c) : h(c)
    }
    function f (c) {
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
      const a = E(c)
      const b = a.overflow
      const C = a.overflowX
      const T = a.overflowY
      return /auto|scroll|overlay|hidden/.test(b + T + C)
    }
    function S (c, a, b) {
      b === void 0 && (b = !1)
      const C = w(a)
      const T = e(c)
      const F = o(a)
      let W = { scrollLeft: 0, scrollTop: 0 }
      let j = { x: 0, y: 0 }
      return (
        (F || (!F && !b)) &&
                    ((f(a) !== 'body' || O(C)) && (W = u(a)),
                    o(a)
                      ? ((j = e(a)),
                        (j.x += a.clientLeft),
                        (j.y += a.clientTop))
                      : C && (j.x = m(C))),
        {
          x: T.left + W.scrollLeft - j.x,
          y: T.top + W.scrollTop - j.y,
          width: T.width,
          height: T.height
        }
      )
    }
    function P (c) {
      const a = e(c)
      let b = c.offsetWidth
      let C = c.offsetHeight
      return (
        Math.abs(a.width - b) <= 1 && (b = a.width),
        Math.abs(a.height - C) <= 1 && (C = a.height),
        { x: c.offsetLeft, y: c.offsetTop, width: b, height: C }
      )
    }
    function R (c) {
      return f(c) === 'html'
        ? c
        : c.assignedSlot ||
                      c.parentNode ||
                      (s(c) ? c.host : null) ||
                      w(c)
    }
    function $ (c) {
      return ['html', 'body', '#document'].indexOf(f(c)) >= 0
        ? c.ownerDocument.body
        : o(c) && O(c)
          ? c
          : $(R(c))
    }
    function B (c, a) {
      let b
      a === void 0 && (a = [])
      const C = $(c)
      const T = C === ((b = c.ownerDocument) == null ? void 0 : b.body)
      const F = r(C)
      const W = T ? [F].concat(F.visualViewport || [], O(C) ? C : []) : C
      const j = a.concat(W)
      return T ? j : j.concat(B(R(W)))
    }
    function K (c) {
      return ['table', 'td', 'th'].indexOf(f(c)) >= 0
    }
    function X (c) {
      return !o(c) || E(c).position === 'fixed' ? null : c.offsetParent
    }
    function ne (c) {
      const a =
                navigator.userAgent.toLowerCase().indexOf('firefox') !== -1
      const b = navigator.userAgent.indexOf('Trident') !== -1
      if (b && o(c)) {
        const C = E(c)
        if (C.position === 'fixed') return null
      }
      for (let T = R(c); o(T) && ['html', 'body'].indexOf(f(T)) < 0;) {
        const F = E(T)
        if (
          F.transform !== 'none' ||
                    F.perspective !== 'none' ||
                    F.contain === 'paint' ||
                    ['transform', 'perspective'].indexOf(F.willChange) !== -1 ||
                    (a && F.willChange === 'filter') ||
                    (a && F.filter && F.filter !== 'none')
        ) {
          return T
        }
        T = T.parentNode
      }
      return null
    }
    function J (c) {
      for (
        var a = r(c), b = X(c);
        b && K(b) && E(b).position === 'static';

      ) {
        b = X(b)
      }
      return b &&
                (f(b) === 'html' ||
                    (f(b) === 'body' && E(b).position === 'static'))
        ? a
        : b || ne(c) || a
    }
    const V = 'top'
    const de = 'bottom'
    const U = 'right'
    const Z = 'left'
    const me = 'auto'
    const l = [V, de, U, Z]
    const p = 'start'
    const v = 'end'
    const d = 'clippingParents'
    const N = 'viewport'
    const _ = 'popper'
    const M = 'reference'
    const Q = l.reduce(function (c, a) {
      return c.concat([a + '-' + p, a + '-' + v])
    }, [])
    const Ue = [].concat(l, [me]).reduce(function (c, a) {
      return c.concat([a, a + '-' + p, a + '-' + v])
    }, [])
    const Rt = 'beforeRead'
    const Vt = 'read'
    const Lr = 'afterRead'
    const Nr = 'beforeMain'
    const kr = 'main'
    const zt = 'afterMain'
    const nr = 'beforeWrite'
    const jr = 'write'
    const rr = 'afterWrite'
    const It = [Rt, Vt, Lr, Nr, kr, zt, nr, jr, rr]
    function Br (c) {
      const a = new Map()
      const b = new Set()
      const C = []
      c.forEach(function (F) {
        a.set(F.name, F)
      })
      function T (F) {
        b.add(F.name)
        const W = [].concat(F.requires || [], F.requiresIfExists || [])
        W.forEach(function (j) {
          if (!b.has(j)) {
            const q = a.get(j)
            q && T(q)
          }
        }),
        C.push(F)
      }
      return (
        c.forEach(function (F) {
          b.has(F.name) || T(F)
        }),
        C
      )
    }
    function mt (c) {
      const a = Br(c)
      return It.reduce(function (b, C) {
        return b.concat(
          a.filter(function (T) {
            return T.phase === C
          })
        )
      }, [])
    }
    function Ut (c) {
      let a
      return function () {
        return (
          a ||
                        (a = new Promise(function (b) {
                          Promise.resolve().then(function () {
                            (a = void 0), b(c())
                          })
                        })),
          a
        )
      }
    }
    function At (c) {
      for (
        var a = arguments.length,
          b = new Array(a > 1 ? a - 1 : 0),
          C = 1;
        C < a;
        C++
      ) {
        b[C - 1] = arguments[C]
      }
      return [].concat(b).reduce(function (T, F) {
        return T.replace(/%s/, F)
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
      c.forEach(function (a) {
        Object.keys(a).forEach(function (b) {
          switch (b) {
            case 'name':
              typeof a.name !== 'string' &&
                                console.error(
                                  At(
                                    Dt,
                                    String(a.name),
                                    '"name"',
                                    '"string"',
                                    '"' + String(a.name) + '"'
                                  )
                                )
              break
            case 'enabled':
              typeof a.enabled !== 'boolean' &&
                                console.error(
                                  At(
                                    Dt,
                                    a.name,
                                    '"enabled"',
                                    '"boolean"',
                                    '"' + String(a.enabled) + '"'
                                  )
                                )
            case 'phase':
              It.indexOf(a.phase) < 0 &&
                                console.error(
                                  At(
                                    Dt,
                                    a.name,
                                    '"phase"',
                                    'either ' + It.join(', '),
                                    '"' + String(a.phase) + '"'
                                  )
                                )
              break
            case 'fn':
              typeof a.fn !== 'function' &&
                                console.error(
                                  At(
                                    Dt,
                                    a.name,
                                    '"fn"',
                                    '"function"',
                                    '"' + String(a.fn) + '"'
                                  )
                                )
              break
            case 'effect':
              typeof a.effect !== 'function' &&
                                console.error(
                                  At(
                                    Dt,
                                    a.name,
                                    '"effect"',
                                    '"function"',
                                    '"' + String(a.fn) + '"'
                                  )
                                )
              break
            case 'requires':
              Array.isArray(a.requires) ||
                                console.error(
                                  At(
                                    Dt,
                                    a.name,
                                    '"requires"',
                                    '"array"',
                                    '"' + String(a.requires) + '"'
                                  )
                                )
              break
            case 'requiresIfExists':
              Array.isArray(a.requiresIfExists) ||
                                console.error(
                                  At(
                                    Dt,
                                    a.name,
                                    '"requiresIfExists"',
                                    '"array"',
                                    '"' + String(a.requiresIfExists) + '"'
                                  )
                                )
              break
            case 'options':
            case 'data':
              break
            default:
              console.error(
                'PopperJS: an invalid property has been provided to the "' +
                                    a.name +
                                    '" modifier, valid properties are ' +
                                    Qe.map(function (C) {
                                      return '"' + C + '"'
                                    }).join(', ') +
                                    '; but "' +
                                    b +
                                    '" was provided.'
              )
          }
          a.requires &&
                        a.requires.forEach(function (C) {
                          c.find(function (T) {
                            return T.name === C
                          }) == null &&
                                console.error(At(Hr, String(a.name), C, C))
                        })
        })
      })
    }
    function Wr (c, a) {
      const b = new Set()
      return c.filter(function (C) {
        const T = a(C)
        if (!b.has(T)) return b.add(T), !0
      })
    }
    function ot (c) {
      return c.split('-')[0]
    }
    function Vr (c) {
      const a = c.reduce(function (b, C) {
        const T = b[C.name]
        return (
          (b[C.name] = T
            ? Object.assign({}, T, C, {
              options: Object.assign({}, T.options, C.options),
              data: Object.assign({}, T.data, C.data)
            })
            : C),
          b
        )
      }, {})
      return Object.keys(a).map(function (b) {
        return a[b]
      })
    }
    function ir (c) {
      const a = r(c)
      const b = w(c)
      const C = a.visualViewport
      let T = b.clientWidth
      let F = b.clientHeight
      let W = 0
      let j = 0
      return (
        C &&
                    ((T = C.width),
                    (F = C.height),
                    /^((?!chrome|android).)*safari/i.test(
                      navigator.userAgent
                    ) || ((W = C.offsetLeft), (j = C.offsetTop))),
        { width: T, height: F, x: W + m(c), y: j }
      )
    }
    const gt = Math.max
    const ln = Math.min
    const Yt = Math.round
    function or (c) {
      let a
      const b = w(c)
      const C = n(c)
      const T = (a = c.ownerDocument) == null ? void 0 : a.body
      const F = gt(
        b.scrollWidth,
        b.clientWidth,
        T ? T.scrollWidth : 0,
        T ? T.clientWidth : 0
      )
      const W = gt(
        b.scrollHeight,
        b.clientHeight,
        T ? T.scrollHeight : 0,
        T ? T.clientHeight : 0
      )
      let j = -C.scrollLeft + m(c)
      const q = -C.scrollTop
      return (
        E(T || b).direction === 'rtl' &&
                    (j += gt(b.clientWidth, T ? T.clientWidth : 0) - F),
        { width: F, height: W, x: j, y: q }
      )
    }
    function kn (c, a) {
      const b = a.getRootNode && a.getRootNode()
      if (c.contains(a)) return !0
      if (b && s(b)) {
        let C = a
        do {
          if (C && c.isSameNode(C)) return !0
          C = C.parentNode || C.host
        } while (C)
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
      const a = e(c)
      return (
        (a.top = a.top + c.clientTop),
        (a.left = a.left + c.clientLeft),
        (a.bottom = a.top + c.clientHeight),
        (a.right = a.left + c.clientWidth),
        (a.width = c.clientWidth),
        (a.height = c.clientHeight),
        (a.x = a.left),
        (a.y = a.top),
        a
      )
    }
    function sr (c, a) {
      return a === N ? Xt(ir(c)) : o(a) ? ar(a) : Xt(or(w(c)))
    }
    function yn (c) {
      const a = B(R(c))
      const b = ['absolute', 'fixed'].indexOf(E(c).position) >= 0
      const C = b && o(c) ? J(c) : c
      return i(C)
        ? a.filter(function (T) {
          return i(T) && kn(T, C) && f(T) !== 'body'
        })
        : []
    }
    function wn (c, a, b) {
      const C = a === 'clippingParents' ? yn(c) : [].concat(a)
      const T = [].concat(C, [b])
      const F = T[0]
      const W = T.reduce(
        function (j, q) {
          const oe = sr(c, q)
          return (
            (j.top = gt(oe.top, j.top)),
            (j.right = ln(oe.right, j.right)),
            (j.bottom = ln(oe.bottom, j.bottom)),
            (j.left = gt(oe.left, j.left)),
            j
          )
        },
        sr(c, F)
      )
      return (
        (W.width = W.right - W.left),
        (W.height = W.bottom - W.top),
        (W.x = W.left),
        (W.y = W.top),
        W
      )
    }
    function cn (c) {
      return c.split('-')[1]
    }
    function dt (c) {
      return ['top', 'bottom'].indexOf(c) >= 0 ? 'x' : 'y'
    }
    function lr (c) {
      const a = c.reference
      const b = c.element
      const C = c.placement
      const T = C ? ot(C) : null
      const F = C ? cn(C) : null
      const W = a.x + a.width / 2 - b.width / 2
      const j = a.y + a.height / 2 - b.height / 2
      let q
      switch (T) {
        case V:
          q = { x: W, y: a.y - b.height }
          break
        case de:
          q = { x: W, y: a.y + a.height }
          break
        case U:
          q = { x: a.x + a.width, y: j }
          break
        case Z:
          q = { x: a.x - b.width, y: j }
          break
        default:
          q = { x: a.x, y: a.y }
      }
      const oe = T ? dt(T) : null
      if (oe != null) {
        const z = oe === 'y' ? 'height' : 'width'
        switch (F) {
          case p:
            q[oe] = q[oe] - (a[z] / 2 - b[z] / 2)
            break
          case v:
            q[oe] = q[oe] + (a[z] / 2 - b[z] / 2)
            break
        }
      }
      return q
    }
    function cr () {
      return { top: 0, right: 0, bottom: 0, left: 0 }
    }
    function fr (c) {
      return Object.assign({}, cr(), c)
    }
    function ur (c, a) {
      return a.reduce(function (b, C) {
        return (b[C] = c), b
      }, {})
    }
    function qt (c, a) {
      a === void 0 && (a = {})
      const b = a
      const C = b.placement
      const T = C === void 0 ? c.placement : C
      const F = b.boundary
      const W = F === void 0 ? d : F
      const j = b.rootBoundary
      const q = j === void 0 ? N : j
      const oe = b.elementContext
      const z = oe === void 0 ? _ : oe
      const Ce = b.altBoundary
      const Le = Ce === void 0 ? !1 : Ce
      const De = b.padding
      const xe = De === void 0 ? 0 : De
      const Me = fr(typeof xe !== 'number' ? xe : ur(xe, l))
      const Se = z === _ ? M : _
      const Be = c.elements.reference
      const Re = c.rects.popper
      const He = c.elements[Le ? Se : z]
      const ce = wn(
        i(He) ? He : He.contextElement || w(c.elements.popper),
        W,
        q
      )
      const Pe = e(Be)
      const Te = lr({
        reference: Pe,
        element: Re,
        strategy: 'absolute',
        placement: T
      })
      const Ne = Xt(Object.assign({}, Re, Te))
      const Fe = z === _ ? Ne : Pe
      const Ye = {
        top: ce.top - Fe.top + Me.top,
        bottom: Fe.bottom - ce.bottom + Me.bottom,
        left: ce.left - Fe.left + Me.left,
        right: Fe.right - ce.right + Me.right
      }
      const $e = c.modifiersData.offset
      if (z === _ && $e) {
        const Ve = $e[T]
        Object.keys(Ye).forEach(function (wt) {
          const et = [U, de].indexOf(wt) >= 0 ? 1 : -1
          const Lt = [V, de].indexOf(wt) >= 0 ? 'y' : 'x'
          Ye[wt] += Ve[Lt] * et
        })
      }
      return Ye
    }
    const dr =
            'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.'
    const zr =
            'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.'
    const xn = {
      placement: 'bottom',
      modifiers: [],
      strategy: 'absolute'
    }
    function fn () {
      for (
        var c = arguments.length, a = new Array(c), b = 0;
        b < c;
        b++
      ) {
        a[b] = arguments[b]
      }
      return !a.some(function (C) {
        return !(C && typeof C.getBoundingClientRect === 'function')
      })
    }
    function En (c) {
      c === void 0 && (c = {})
      const a = c
      const b = a.defaultModifiers
      const C = b === void 0 ? [] : b
      const T = a.defaultOptions
      const F = T === void 0 ? xn : T
      return function (j, q, oe) {
        oe === void 0 && (oe = F)
        let z = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, xn, F),
          modifiersData: {},
          elements: { reference: j, popper: q },
          attributes: {},
          styles: {}
        }
        let Ce = []
        let Le = !1
        var De = {
          state: z,
          setOptions: function (Be) {
            Me(),
            (z.options = Object.assign({}, F, z.options, Be)),
            (z.scrollParents = {
              reference: i(j)
                ? B(j)
                : j.contextElement
                  ? B(j.contextElement)
                  : [],
              popper: B(q)
            })
            const Re = mt(Vr([].concat(C, z.options.modifiers)))
            z.orderedModifiers = Re.filter(function ($e) {
              return $e.enabled
            })
            const He = Wr(
              [].concat(Re, z.options.modifiers),
              function ($e) {
                const Ve = $e.name
                return Ve
              }
            )
            if (($r(He), ot(z.options.placement) === me)) {
              const ce = z.orderedModifiers.find(function ($e) {
                const Ve = $e.name
                return Ve === 'flip'
              })
              ce ||
                                console.error(
                                  [
                                    'Popper: "auto" placements require the "flip" modifier be',
                                    'present and enabled to work.'
                                  ].join(' ')
                                )
            }
            const Pe = E(q)
            const Te = Pe.marginTop
            const Ne = Pe.marginRight
            const Fe = Pe.marginBottom
            const Ye = Pe.marginLeft
            return (
              [Te, Ne, Fe, Ye].some(function ($e) {
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
              const Re = Be.reference
              const He = Be.popper
              if (!fn(Re, He)) {
                console.error(dr)
                return
              }
              (z.rects = {
                reference: S(
                  Re,
                  J(He),
                  z.options.strategy === 'fixed'
                ),
                popper: P(He)
              }),
              (z.reset = !1),
              (z.placement = z.options.placement),
              z.orderedModifiers.forEach(function (Ve) {
                return (z.modifiersData[Ve.name] =
                                        Object.assign({}, Ve.data))
              })
              for (
                let ce = 0, Pe = 0;
                Pe < z.orderedModifiers.length;
                Pe++
              ) {
                if (((ce += 1), ce > 100)) {
                  console.error(zr)
                  break
                }
                if (z.reset === !0) {
                  (z.reset = !1), (Pe = -1)
                  continue
                }
                const Te = z.orderedModifiers[Pe]
                const Ne = Te.fn
                const Fe = Te.options
                const Ye = Fe === void 0 ? {} : Fe
                const $e = Te.name
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
          update: Ut(function () {
            return new Promise(function (Se) {
              De.forceUpdate(), Se(z)
            })
          }),
          destroy: function () {
            Me(), (Le = !0)
          }
        }
        if (!fn(j, q)) return console.error(dr), De
        De.setOptions(oe).then(function (Se) {
          !Le && oe.onFirstUpdate && oe.onFirstUpdate(Se)
        })
        function xe () {
          z.orderedModifiers.forEach(function (Se) {
            const Be = Se.name
            const Re = Se.options
            const He = Re === void 0 ? {} : Re
            const ce = Se.effect
            if (typeof ce === 'function') {
              const Pe = ce({
                state: z,
                name: Be,
                instance: De,
                options: He
              })
              const Te = function () {}
              Ce.push(Pe || Te)
            }
          })
        }
        function Me () {
          Ce.forEach(function (Se) {
            return Se()
          }),
          (Ce = [])
        }
        return De
      }
    }
    const On = { passive: !0 }
    function Ur (c) {
      const a = c.state
      const b = c.instance
      const C = c.options
      const T = C.scroll
      const F = T === void 0 ? !0 : T
      const W = C.resize
      const j = W === void 0 ? !0 : W
      const q = r(a.elements.popper)
      const oe = [].concat(
        a.scrollParents.reference,
        a.scrollParents.popper
      )
      return (
        F &&
                    oe.forEach(function (z) {
                      z.addEventListener('scroll', b.update, On)
                    }),
        j && q.addEventListener('resize', b.update, On),
        function () {
          F &&
                        oe.forEach(function (z) {
                          z.removeEventListener('scroll', b.update, On)
                        }),
          j && q.removeEventListener('resize', b.update, On)
        }
      )
    }
    const jn = {
      name: 'eventListeners',
      enabled: !0,
      phase: 'write',
      fn: function () {},
      effect: Ur,
      data: {}
    }
    function Yr (c) {
      const a = c.state
      const b = c.name
      a.modifiersData[b] = lr({
        reference: a.rects.reference,
        element: a.rects.popper,
        strategy: 'absolute',
        placement: a.placement
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
      const a = c.x
      const b = c.y
      const C = window
      const T = C.devicePixelRatio || 1
      return { x: Yt(Yt(a * T) / T) || 0, y: Yt(Yt(b * T) / T) || 0 }
    }
    function Hn (c) {
      let a
      const b = c.popper
      const C = c.popperRect
      const T = c.placement
      const F = c.offsets
      const W = c.position
      const j = c.gpuAcceleration
      const q = c.adaptive
      const oe = c.roundOffsets
      const z = oe === !0 ? qr(F) : typeof oe === 'function' ? oe(F) : F
      const Ce = z.x
      let Le = Ce === void 0 ? 0 : Ce
      const De = z.y
      let xe = De === void 0 ? 0 : De
      const Me = F.hasOwnProperty('x')
      const Se = F.hasOwnProperty('y')
      let Be = Z
      let Re = V
      const He = window
      if (q) {
        let ce = J(b)
        let Pe = 'clientHeight'
        let Te = 'clientWidth'
        ce === r(b) &&
                    ((ce = w(b)),
                    E(ce).position !== 'static' &&
                        ((Pe = 'scrollHeight'), (Te = 'scrollWidth'))),
        (ce = ce),
        T === V &&
                        ((Re = de),
                        (xe -= ce[Pe] - C.height),
                        (xe *= j ? 1 : -1)),
        T === Z &&
                        ((Be = U),
                        (Le -= ce[Te] - C.width),
                        (Le *= j ? 1 : -1))
      }
      const Ne = Object.assign({ position: W }, q && Xr)
      if (j) {
        let Fe
        return Object.assign(
          {},
          Ne,
          ((Fe = {}),
          (Fe[Re] = Se ? '0' : ''),
          (Fe[Be] = Me ? '0' : ''),
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
        ((a = {}),
        (a[Re] = Se ? xe + 'px' : ''),
        (a[Be] = Me ? Le + 'px' : ''),
        (a.transform = ''),
        a)
      )
    }
    function g (c) {
      const a = c.state
      const b = c.options
      const C = b.gpuAcceleration
      const T = C === void 0 ? !0 : C
      const F = b.adaptive
      const W = F === void 0 ? !0 : F
      const j = b.roundOffsets
      const q = j === void 0 ? !0 : j
      const oe = E(a.elements.popper).transitionProperty || ''
      W &&
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
        placement: ot(a.placement),
        popper: a.elements.popper,
        popperRect: a.rects.popper,
        gpuAcceleration: T
      }
      a.modifiersData.popperOffsets != null &&
                (a.styles.popper = Object.assign(
                  {},
                  a.styles.popper,
                  Hn(
                    Object.assign({}, z, {
                      offsets: a.modifiersData.popperOffsets,
                      position: a.options.strategy,
                      adaptive: W,
                      roundOffsets: q
                    })
                  )
                )),
      a.modifiersData.arrow != null &&
                    (a.styles.arrow = Object.assign(
                      {},
                      a.styles.arrow,
                      Hn(
                        Object.assign({}, z, {
                          offsets: a.modifiersData.arrow,
                          position: 'absolute',
                          adaptive: !1,
                          roundOffsets: q
                        })
                      )
                    )),
      (a.attributes.popper = Object.assign({}, a.attributes.popper, {
        'data-popper-placement': a.placement
      }))
    }
    const y = {
      name: 'computeStyles',
      enabled: !0,
      phase: 'beforeWrite',
      fn: g,
      data: {}
    }
    function A (c) {
      const a = c.state
      Object.keys(a.elements).forEach(function (b) {
        const C = a.styles[b] || {}
        const T = a.attributes[b] || {}
        const F = a.elements[b]
        !o(F) ||
                    !f(F) ||
                    (Object.assign(F.style, C),
                    Object.keys(T).forEach(function (W) {
                      const j = T[W]
                      j === !1
                        ? F.removeAttribute(W)
                        : F.setAttribute(W, j === !0 ? '' : j)
                    }))
      })
    }
    function I (c) {
      const a = c.state
      const b = {
        popper: {
          position: a.options.strategy,
          left: '0',
          top: '0',
          margin: '0'
        },
        arrow: { position: 'absolute' },
        reference: {}
      }
      return (
        Object.assign(a.elements.popper.style, b.popper),
        (a.styles = b),
        a.elements.arrow &&
                    Object.assign(a.elements.arrow.style, b.arrow),
        function () {
          Object.keys(a.elements).forEach(function (C) {
            const T = a.elements[C]
            const F = a.attributes[C] || {}
            const W = Object.keys(
              a.styles.hasOwnProperty(C) ? a.styles[C] : b[C]
            )
            const j = W.reduce(function (q, oe) {
              return (q[oe] = ''), q
            }, {})
            !o(T) ||
                            !f(T) ||
                            (Object.assign(T.style, j),
                            Object.keys(F).forEach(function (q) {
                              T.removeAttribute(q)
                            }))
          })
        }
      )
    }
    const Y = {
      name: 'applyStyles',
      enabled: !0,
      phase: 'write',
      fn: A,
      effect: I,
      requires: ['computeStyles']
    }
    function H (c, a, b) {
      const C = ot(c)
      const T = [Z, V].indexOf(C) >= 0 ? -1 : 1
      const F =
                typeof b === 'function'
                  ? b(Object.assign({}, a, { placement: c }))
                  : b
      let W = F[0]
      let j = F[1]
      return (
        (W = W || 0),
        (j = (j || 0) * T),
        [Z, U].indexOf(C) >= 0 ? { x: j, y: W } : { x: W, y: j }
      )
    }
    function k (c) {
      const a = c.state
      const b = c.options
      const C = c.name
      const T = b.offset
      const F = T === void 0 ? [0, 0] : T
      const W = Ue.reduce(function (z, Ce) {
        return (z[Ce] = H(Ce, a.rects, F)), z
      }, {})
      const j = W[a.placement]
      const q = j.x
      const oe = j.y
      a.modifiersData.popperOffsets != null &&
                ((a.modifiersData.popperOffsets.x += q),
                (a.modifiersData.popperOffsets.y += oe)),
      (a.modifiersData[C] = W)
    }
    const be = {
      name: 'offset',
      enabled: !0,
      phase: 'main',
      requires: ['popperOffsets'],
      fn: k
    }
    const le = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    }
    function pe (c) {
      return c.replace(/left|right|bottom|top/g, function (a) {
        return le[a]
      })
    }
    const ye = { start: 'end', end: 'start' }
    function _e (c) {
      return c.replace(/start|end/g, function (a) {
        return ye[a]
      })
    }
    function je (c, a) {
      a === void 0 && (a = {})
      const b = a
      const C = b.placement
      const T = b.boundary
      const F = b.rootBoundary
      const W = b.padding
      const j = b.flipVariations
      const q = b.allowedAutoPlacements
      const oe = q === void 0 ? Ue : q
      const z = cn(C)
      const Ce = z
        ? j
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
      const De = Le.reduce(function (xe, Me) {
        return (
          (xe[Me] = qt(c, {
            placement: Me,
            boundary: T,
            rootBoundary: F,
            padding: W
          })[ot(Me)]),
          xe
        )
      }, {})
      return Object.keys(De).sort(function (xe, Me) {
        return De[xe] - De[Me]
      })
    }
    function Ae (c) {
      if (ot(c) === me) return []
      const a = pe(c)
      return [_e(c), a, _e(a)]
    }
    function Ie (c) {
      const a = c.state
      const b = c.options
      const C = c.name
      if (!a.modifiersData[C]._skip) {
        for (
          var T = b.mainAxis,
            F = T === void 0 ? !0 : T,
            W = b.altAxis,
            j = W === void 0 ? !0 : W,
            q = b.fallbackPlacements,
            oe = b.padding,
            z = b.boundary,
            Ce = b.rootBoundary,
            Le = b.altBoundary,
            De = b.flipVariations,
            xe = De === void 0 ? !0 : De,
            Me = b.allowedAutoPlacements,
            Se = a.options.placement,
            Be = ot(Se),
            Re = Be === Se,
            He = q || (Re || !xe ? [pe(Se)] : Ae(Se)),
            ce = [Se].concat(He).reduce(function (te, ge) {
              return te.concat(
                ot(ge) === me
                  ? je(a, {
                    placement: ge,
                    boundary: z,
                    rootBoundary: Ce,
                    padding: oe,
                    flipVariations: xe,
                    allowedAutoPlacements: Me
                  })
                  : ge
              )
            }, []),
            Pe = a.rects.reference,
            Te = a.rects.popper,
            Ne = new Map(),
            Fe = !0,
            Ye = ce[0],
            $e = 0;
          $e < ce.length;
          $e++
        ) {
          const Ve = ce[$e]
          const wt = ot(Ve)
          const et = cn(Ve) === p
          const Lt = [V, de].indexOf(wt) >= 0
          const dn = Lt ? 'width' : 'height'
          const Zt = qt(a, {
            placement: Ve,
            boundary: z,
            rootBoundary: Ce,
            altBoundary: Le,
            padding: oe
          })
          let Nt = Lt ? (et ? U : Z) : et ? de : V
          Pe[dn] > Te[dn] && (Nt = pe(Nt))
          const $n = pe(Nt)
          const Qt = []
          if (
            (F && Qt.push(Zt[wt] <= 0),
            j && Qt.push(Zt[Nt] <= 0, Zt[$n] <= 0),
            Qt.every(function (te) {
              return te
            }))
          ) {
            (Ye = Ve), (Fe = !1)
            break
          }
          Ne.set(Ve, Qt)
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
              D = Sn;
            D > 0;
            D--
          ) {
            const G = Wn(D)
            if (G === 'break') break
          }
        }
        a.placement !== Ye &&
                    ((a.modifiersData[C]._skip = !0),
                    (a.placement = Ye),
                    (a.reset = !0))
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
    function ve (c, a, b) {
      return gt(c, ln(a, b))
    }
    function ee (c) {
      const a = c.state
      const b = c.options
      const C = c.name
      const T = b.mainAxis
      const F = T === void 0 ? !0 : T
      const W = b.altAxis
      const j = W === void 0 ? !1 : W
      const q = b.boundary
      const oe = b.rootBoundary
      const z = b.altBoundary
      const Ce = b.padding
      const Le = b.tether
      const De = Le === void 0 ? !0 : Le
      const xe = b.tetherOffset
      const Me = xe === void 0 ? 0 : xe
      const Se = qt(a, {
        boundary: q,
        rootBoundary: oe,
        padding: Ce,
        altBoundary: z
      })
      const Be = ot(a.placement)
      const Re = cn(a.placement)
      const He = !Re
      const ce = dt(Be)
      const Pe = he(ce)
      const Te = a.modifiersData.popperOffsets
      const Ne = a.rects.reference
      const Fe = a.rects.popper
      const Ye =
                typeof Me === 'function'
                  ? Me(
                    Object.assign({}, a.rects, {
                      placement: a.placement
                    })
                  )
                  : Me
      const $e = { x: 0, y: 0 }
      if (Te) {
        if (F || j) {
          const Ve = ce === 'y' ? V : Z
          const wt = ce === 'y' ? de : U
          const et = ce === 'y' ? 'height' : 'width'
          const Lt = Te[ce]
          const dn = Te[ce] + Se[Ve]
          const Zt = Te[ce] - Se[wt]
          const Nt = De ? -Fe[et] / 2 : 0
          const $n = Re === p ? Ne[et] : Fe[et]
          const Qt = Re === p ? -Fe[et] : -Ne[et]
          const Sn = a.elements.arrow
          const Wn = De && Sn ? P(Sn) : { width: 0, height: 0 }
          const D = a.modifiersData['arrow#persistent']
            ? a.modifiersData['arrow#persistent'].padding
            : cr()
          const G = D[Ve]
          const te = D[wt]
          const ge = ve(0, Ne[et], Wn[et])
          const we = He
            ? Ne[et] / 2 - Nt - ge - G - Ye
            : $n - ge - G - Ye
          const Ke = He
            ? -Ne[et] / 2 + Nt + ge + te + Ye
            : Qt + ge + te + Ye
          const Je = a.elements.arrow && J(a.elements.arrow)
          const Ct = Je
            ? ce === 'y'
              ? Je.clientTop || 0
              : Je.clientLeft || 0
            : 0
          const Vn = a.modifiersData.offset
            ? a.modifiersData.offset[a.placement][ce]
            : 0
          const Tt = Te[ce] + we - Vn - Ct
          const An = Te[ce] + Ke - Vn
          if (F) {
            const pn = ve(
              De ? ln(dn, Tt) : dn,
              Lt,
              De ? gt(Zt, An) : Zt
            );
            (Te[ce] = pn), ($e[ce] = pn - Lt)
          }
          if (j) {
            const en = ce === 'x' ? V : Z
            const Gr = ce === 'x' ? de : U
            const tn = Te[Pe]
            const hn = tn + Se[en]
            const Di = tn - Se[Gr]
            const Ci = ve(
              De ? ln(hn, Tt) : hn,
              tn,
              De ? gt(Di, An) : Di
            );
            (Te[Pe] = Ci), ($e[Pe] = Ci - tn)
          }
        }
        a.modifiersData[C] = $e
      }
    }
    const ie = {
      name: 'preventOverflow',
      enabled: !0,
      phase: 'main',
      fn: ee,
      requiresIfExists: ['offset']
    }
    const x = function (a, b) {
      return (
        (a =
                    typeof a === 'function'
                      ? a(
                        Object.assign({}, b.rects, {
                          placement: b.placement
                        })
                      )
                      : a),
        fr(typeof a !== 'number' ? a : ur(a, l))
      )
    }
    function Ge (c) {
      let a
      const b = c.state
      const C = c.name
      const T = c.options
      const F = b.elements.arrow
      const W = b.modifiersData.popperOffsets
      const j = ot(b.placement)
      const q = dt(j)
      const oe = [Z, U].indexOf(j) >= 0
      const z = oe ? 'height' : 'width'
      if (!(!F || !W)) {
        const Ce = x(T.padding, b)
        const Le = P(F)
        const De = q === 'y' ? V : Z
        const xe = q === 'y' ? de : U
        const Me =
                    b.rects.reference[z] +
                    b.rects.reference[q] -
                    W[q] -
                    b.rects.popper[z]
        const Se = W[q] - b.rects.reference[q]
        const Be = J(F)
        const Re = Be
          ? q === 'y'
            ? Be.clientHeight || 0
            : Be.clientWidth || 0
          : 0
        const He = Me / 2 - Se / 2
        const ce = Ce[De]
        const Pe = Re - Le[z] - Ce[xe]
        const Te = Re / 2 - Le[z] / 2 + He
        const Ne = ve(ce, Te, Pe)
        const Fe = q
        b.modifiersData[C] =
                    ((a = {}), (a[Fe] = Ne), (a.centerOffset = Ne - Te), a)
      }
    }
    function fe (c) {
      const a = c.state
      const b = c.options
      const C = b.element
      let T = C === void 0 ? '[data-popper-arrow]' : C
      if (
        T != null &&
                !(
                  typeof T === 'string' &&
                    ((T = a.elements.popper.querySelector(T)), !T)
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
          !kn(a.elements.popper, T))
        ) {
          console.error(
            [
              'Popper: "arrow" modifier\'s `element` must be a child of the popper',
              'element.'
            ].join(' ')
          )
          return
        }
        a.elements.arrow = T
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
    function bt (c, a, b) {
      return (
        b === void 0 && (b = { x: 0, y: 0 }),
        {
          top: c.top - a.height - b.y,
          right: c.right - a.width + b.x,
          bottom: c.bottom - a.height + b.y,
          left: c.left - a.width - b.x
        }
      )
    }
    function Gt (c) {
      return [V, U, de, Z].some(function (a) {
        return c[a] >= 0
      })
    }
    function Kt (c) {
      const a = c.state
      const b = c.name
      const C = a.rects.reference
      const T = a.rects.popper
      const F = a.modifiersData.preventOverflow
      const W = qt(a, { elementContext: 'reference' })
      const j = qt(a, { altBoundary: !0 })
      const q = bt(W, C)
      const oe = bt(j, T, F)
      const z = Gt(q)
      const Ce = Gt(oe);
      (a.modifiersData[b] = {
        referenceClippingOffsets: q,
        popperEscapeOffsets: oe,
        isReferenceHidden: z,
        hasPopperEscaped: Ce
      }),
      (a.attributes.popper = Object.assign({}, a.attributes.popper, {
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
    const rt = [jn, Bn, y, Y]
    const lt = En({ defaultModifiers: rt })
    const yt = [jn, Bn, y, Y, be, re, ie, Ft, Jt]
    const un = En({ defaultModifiers: yt });
    (t.applyStyles = Y),
    (t.arrow = Ft),
    (t.computeStyles = y),
    (t.createPopper = un),
    (t.createPopperLite = lt),
    (t.defaultModifiers = yt),
    (t.detectOverflow = qt),
    (t.eventListeners = jn),
    (t.flip = re),
    (t.hide = Jt),
    (t.offset = be),
    (t.popperGenerator = En),
    (t.popperOffsets = Bn),
    (t.preventOverflow = ie)
  })
  const No = Fo((t) => {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    const e = us()
    const r =
            '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>'
    const n = 'tippy-box'
    const i = 'tippy-content'
    const o = 'tippy-backdrop'
    const s = 'tippy-arrow'
    const h = 'tippy-svg-arrow'
    const u = { passive: !0, capture: !0 }
    function f (g, y) {
      return {}.hasOwnProperty.call(g, y)
    }
    function w (g, y, A) {
      if (Array.isArray(g)) {
        const I = g[y]
        return I ?? (Array.isArray(A) ? A[y] : A)
      }
      return g
    }
    function m (g, y) {
      const A = {}.toString.call(g)
      return A.indexOf('[object') === 0 && A.indexOf(y + ']') > -1
    }
    function E (g, y) {
      return typeof g === 'function' ? g.apply(void 0, y) : g
    }
    function O (g, y) {
      if (y === 0) return g
      let A
      return function (I) {
        clearTimeout(A),
        (A = setTimeout(function () {
          g(I)
        }, y))
      }
    }
    function S (g, y) {
      const A = Object.assign({}, g)
      return (
        y.forEach(function (I) {
          delete A[I]
        }),
        A
      )
    }
    function P (g) {
      return g.split(/\s+/).filter(Boolean)
    }
    function R (g) {
      return [].concat(g)
    }
    function $ (g, y) {
      g.indexOf(y) === -1 && g.push(y)
    }
    function B (g) {
      return g.filter(function (y, A) {
        return g.indexOf(y) === A
      })
    }
    function K (g) {
      return g.split('-')[0]
    }
    function X (g) {
      return [].slice.call(g)
    }
    function ne (g) {
      return Object.keys(g).reduce(function (y, A) {
        return g[A] !== void 0 && (y[A] = g[A]), y
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
    function U (g) {
      return m(g, 'MouseEvent')
    }
    function Z (g) {
      return !!(g && g._tippy && g._tippy.reference === g)
    }
    function me (g) {
      return V(g)
        ? [g]
        : de(g)
          ? X(g)
          : Array.isArray(g)
            ? g
            : X(document.querySelectorAll(g))
    }
    function l (g, y) {
      g.forEach(function (A) {
        A && (A.style.transitionDuration = y + 'ms')
      })
    }
    function p (g, y) {
      g.forEach(function (A) {
        A && A.setAttribute('data-state', y)
      })
    }
    function v (g) {
      let y
      const A = R(g)
      const I = A[0]
      return !(I == null || (y = I.ownerDocument) == null) && y.body
        ? I.ownerDocument
        : document
    }
    function d (g, y) {
      const A = y.clientX
      const I = y.clientY
      return g.every(function (Y) {
        const H = Y.popperRect
        const k = Y.popperState
        const be = Y.props
        const le = be.interactiveBorder
        const pe = K(k.placement)
        const ye = k.modifiersData.offset
        if (!ye) return !0
        const _e = pe === 'bottom' ? ye.top.y : 0
        const je = pe === 'top' ? ye.bottom.y : 0
        const Ae = pe === 'right' ? ye.left.x : 0
        const Ie = pe === 'left' ? ye.right.x : 0
        const re = H.top - I + _e > le
        const he = I - H.bottom - je > le
        const ve = H.left - A + Ae > le
        const ee = A - H.right - Ie > le
        return re || he || ve || ee
      })
    }
    function N (g, y, A) {
      const I = y + 'EventListener';
      ['transitionend', 'webkitTransitionEnd'].forEach(function (Y) {
        g[I](Y, A)
      })
    }
    const _ = { isTouch: !1 }
    let M = 0
    function Q () {
      _.isTouch ||
                ((_.isTouch = !0),
                window.performance &&
                    document.addEventListener('mousemove', Ue))
    }
    function Ue () {
      const g = performance.now()
      g - M < 20 &&
                ((_.isTouch = !1),
                document.removeEventListener('mousemove', Ue)),
      (M = g)
    }
    function Rt () {
      const g = document.activeElement
      if (Z(g)) {
        const y = g._tippy
        g.blur && !y.state.isVisible && g.blur()
      }
    }
    function Vt () {
      document.addEventListener('touchstart', Q, u),
      window.addEventListener('blur', Rt)
    }
    const Lr = typeof window < 'u' && typeof document < 'u'
    const Nr = Lr ? navigator.userAgent : ''
    const kr = /MSIE |Trident\//.test(Nr)
    function zt (g) {
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
      const A = /^[ \t]*/gm
      return g.replace(y, ' ').replace(A, '').trim()
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
        let A
        It.add(y), (A = console).warn.apply(A, rr(y))
      }
    }
    function Ut (g, y) {
      if (g && !It.has(y)) {
        let A
        It.add(y), (A = console).error.apply(A, rr(y))
      }
    }
    function At (g) {
      const y = !g
      const A =
                Object.prototype.toString.call(g) === '[object Object]' &&
                !g.addEventListener
      Ut(
        y,
        [
          'tippy() was passed',
          '`' + String(g) + '`',
          'as its targets (first) argument. Valid types are: String, Element,',
          'Element[], or NodeList.'
        ].join(' ')
      ),
      Ut(
        A,
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
      const A = Object.keys(y)
      A.forEach(function (I) {
        Qe[I] = y[I]
      })
    }
    function ot (g) {
      const y = g.plugins || []
      const A = y.reduce(function (I, Y) {
        const H = Y.name
        const k = Y.defaultValue
        return H && (I[H] = g[H] !== void 0 ? g[H] : k), I
      }, {})
      return Object.assign({}, g, {}, A)
    }
    function Vr (g, y) {
      const A = y
        ? Object.keys(ot(Object.assign({}, Qe, { plugins: y })))
        : $r
      const I = A.reduce(function (Y, H) {
        const k = (g.getAttribute('data-tippy-' + H) || '').trim()
        if (!k) return Y
        if (H === 'content') Y[H] = k
        else {
          try {
            Y[H] = JSON.parse(k)
          } catch {
            Y[H] = k
          }
        }
        return Y
      }, {})
      return I
    }
    function ir (g, y) {
      const A = Object.assign(
        {},
        y,
        { content: E(y.content, [g]) },
        y.ignoreAttributes ? {} : Vr(g, y.plugins)
      )
      return (
        (A.aria = Object.assign({}, Qe.aria, {}, A.aria)),
        (A.aria = {
          expanded:
                        A.aria.expanded === 'auto'
                          ? y.interactive
                          : A.aria.expanded,
          content:
                        A.aria.content === 'auto'
                          ? y.interactive
                            ? null
                            : 'describedby'
                          : A.aria.content
        }),
        A
      )
    }
    function gt (g, y) {
      g === void 0 && (g = {}), y === void 0 && (y = [])
      const A = Object.keys(g)
      A.forEach(function (I) {
        const Y = S(Qe, Object.keys(Dt))
        let H = !f(Y, I)
        H &&
                    (H =
                        y.filter(function (k) {
                          return k.name === I
                        }).length === 0),
        mt(
          H,
          [
            '`' + I + '`',
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
          ? (y.className = s)
          : ((y.className = h), V(g) ? y.appendChild(g) : Yt(y, g)),
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
      const A = X(y.children)
      return {
        box: y,
        content: A.find(function (I) {
          return I.classList.contains(i)
        }),
        arrow: A.find(function (I) {
          return I.classList.contains(s) || I.classList.contains(h)
        }),
        backdrop: A.find(function (I) {
          return I.classList.contains(o)
        })
      }
    }
    function ar (g) {
      const y = J()
      const A = J();
      (A.className = n),
      A.setAttribute('data-state', 'hidden'),
      A.setAttribute('tabindex', '-1')
      const I = J();
      (I.className = i),
      I.setAttribute('data-state', 'hidden'),
      kn(I, g.props),
      y.appendChild(A),
      A.appendChild(I),
      Y(g.props, g.props)
      function Y (H, k) {
        const be = Xt(y)
        const le = be.box
        const pe = be.content
        const ye = be.arrow
        k.theme
          ? le.setAttribute('data-theme', k.theme)
          : le.removeAttribute('data-theme'),
        typeof k.animation === 'string'
          ? le.setAttribute('data-animation', k.animation)
          : le.removeAttribute('data-animation'),
        k.inertia
          ? le.setAttribute('data-inertia', '')
          : le.removeAttribute('data-inertia'),
        (le.style.maxWidth =
                        typeof k.maxWidth === 'number'
                          ? k.maxWidth + 'px'
                          : k.maxWidth),
        k.role
          ? le.setAttribute('role', k.role)
          : le.removeAttribute('role'),
        (H.content !== k.content || H.allowHTML !== k.allowHTML) &&
                        kn(pe, g.props),
        k.arrow
          ? ye
            ? H.arrow !== k.arrow &&
                              (le.removeChild(ye), le.appendChild(or(k.arrow)))
            : le.appendChild(or(k.arrow))
          : ye && le.removeChild(ye)
      }
      return { popper: y, onUpdate: Y }
    }
    ar.$$tippy = !0
    let sr = 1
    let yn = []
    let wn = []
    function cn (g, y) {
      const A = ir(g, Object.assign({}, Qe, {}, ot(ne(y))))
      let I
      let Y
      let H
      let k = !1
      let be = !1
      let le = !1
      let pe = !1
      let ye
      let _e
      let je
      let Ae = []
      let Ie = O(Re, A.interactiveDebounce)
      let re
      const he = sr++
      const ve = null
      const ee = B(A.plugins)
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
        props: A,
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
      if (!A.render) {
        return Ut(!0, 'render() function has not been supplied.'), x
      }
      const Ge = A.render(x)
      const fe = Ge.popper
      const Ft = Ge.onUpdate
      fe.setAttribute('data-tippy-root', ''),
      (fe.id = 'tippy-' + x.id),
      (x.popper = fe),
      (g._tippy = x),
      (fe._tippy = x)
      const bt = ee.map(function (D) {
        return D.fn(x)
      })
      const Gt = g.hasAttribute('aria-expanded')
      return (
        Me(),
        T(),
        a(),
        b('onCreate', [x]),
        A.showOnCreate && $e(),
        fe.addEventListener('mouseenter', function () {
          x.props.interactive &&
                        x.state.isVisible &&
                        x.clearDelayTimeouts()
        }),
        fe.addEventListener('mouseleave', function (D) {
          x.props.interactive &&
                        x.props.trigger.indexOf('mouseenter') >= 0 &&
                        (yt().addEventListener('mousemove', Ie), Ie(D))
        }),
        x
      )
      function Kt () {
        const D = x.props.touch
        return Array.isArray(D) ? D : [D, 0]
      }
      function Jt () {
        return Kt()[0] === 'hold'
      }
      function rt () {
        let D
        return !!((D = x.props.render) != null && D.$$tippy)
      }
      function lt () {
        return re || g
      }
      function yt () {
        const D = lt().parentNode
        return D ? v(D) : document
      }
      function un () {
        return Xt(fe)
      }
      function c (D) {
        return (x.state.isMounted && !x.state.isVisible) ||
                    _.isTouch ||
                    (ye && ye.type === 'focus')
          ? 0
          : w(x.props.delay, D ? 0 : 1, Qe.delay)
      }
      function a () {
        (fe.style.pointerEvents =
                    x.props.interactive && x.state.isVisible ? '' : 'none'),
        (fe.style.zIndex = '' + x.props.zIndex)
      }
      function b (D, G, te) {
        if (
          (te === void 0 && (te = !0),
          bt.forEach(function (we) {
            we[D] && we[D].apply(void 0, G)
          }),
          te)
        ) {
          let ge;
          (ge = x.props)[D].apply(ge, G)
        }
      }
      function C () {
        const D = x.props.aria
        if (D.content) {
          const G = 'aria-' + D.content
          const te = fe.id
          const ge = R(x.props.triggerTarget || g)
          ge.forEach(function (we) {
            const Ke = we.getAttribute(G)
            if (x.state.isVisible) {
              we.setAttribute(G, Ke ? Ke + ' ' + te : te)
            } else {
              const Je = Ke && Ke.replace(te, '').trim()
              Je ? we.setAttribute(G, Je) : we.removeAttribute(G)
            }
          })
        }
      }
      function T () {
        if (!(Gt || !x.props.aria.expanded)) {
          const D = R(x.props.triggerTarget || g)
          D.forEach(function (G) {
            x.props.interactive
              ? G.setAttribute(
                'aria-expanded',
                x.state.isVisible && G === lt()
                  ? 'true'
                  : 'false'
              )
              : G.removeAttribute('aria-expanded')
          })
        }
      }
      function F () {
        yt().removeEventListener('mousemove', Ie),
        (yn = yn.filter(function (D) {
          return D !== Ie
        }))
      }
      function W (D) {
        if (
          !(_.isTouch && (le || D.type === 'mousedown')) &&
                    !(x.props.interactive && fe.contains(D.target))
        ) {
          if (lt().contains(D.target)) {
            if (
              _.isTouch ||
                            (x.state.isVisible &&
                                x.props.trigger.indexOf('click') >= 0)
            ) {
              return
            }
          } else b('onClickOutside', [x, D])
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
      function j () {
        le = !0
      }
      function q () {
        le = !1
      }
      function oe () {
        const D = yt()
        D.addEventListener('mousedown', W, !0),
        D.addEventListener('touchend', W, u),
        D.addEventListener('touchstart', q, u),
        D.addEventListener('touchmove', j, u)
      }
      function z () {
        const D = yt()
        D.removeEventListener('mousedown', W, !0),
        D.removeEventListener('touchend', W, u),
        D.removeEventListener('touchstart', q, u),
        D.removeEventListener('touchmove', j, u)
      }
      function Ce (D, G) {
        De(D, function () {
          !x.state.isVisible &&
                        fe.parentNode &&
                        fe.parentNode.contains(fe) &&
                        G()
        })
      }
      function Le (D, G) {
        De(D, G)
      }
      function De (D, G) {
        const te = un().box
        function ge (we) {
          we.target === te && (N(te, 'remove', ge), G())
        }
        if (D === 0) return G()
        N(te, 'remove', _e), N(te, 'add', ge), (_e = ge)
      }
      function xe (D, G, te) {
        te === void 0 && (te = !1)
        const ge = R(x.props.triggerTarget || g)
        ge.forEach(function (we) {
          we.addEventListener(D, G, te),
          Ae.push({
            node: we,
            eventType: D,
            handler: G,
            options: te
          })
        })
      }
      function Me () {
        Jt() &&
                    (xe('touchstart', Be, { passive: !0 }),
                    xe('touchend', He, { passive: !0 })),
        P(x.props.trigger).forEach(function (D) {
          if (D !== 'manual') {
            switch ((xe(D, Be), D)) {
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
        Ae.forEach(function (D) {
          const G = D.node
          const te = D.eventType
          const ge = D.handler
          const we = D.options
          G.removeEventListener(te, ge, we)
        }),
        (Ae = [])
      }
      function Be (D) {
        let G
        let te = !1
        if (!(!x.state.isEnabled || Pe(D) || be)) {
          const ge = ((G = ye) == null ? void 0 : G.type) === 'focus';
          (ye = D),
          (re = D.currentTarget),
          T(),
          !x.state.isVisible &&
                            U(D) &&
                            yn.forEach(function (we) {
                              return we(D)
                            }),
          D.type === 'click' &&
                        (x.props.trigger.indexOf('mouseenter') < 0 || k) &&
                        x.props.hideOnClick !== !1 &&
                        x.state.isVisible
            ? (te = !0)
            : $e(D),
          D.type === 'click' && (k = !te),
          te && !ge && Ve(D)
        }
      }
      function Re (D) {
        const G = D.target
        const te = lt().contains(G) || fe.contains(G)
        if (!(D.type === 'mousemove' && te)) {
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
                    props: A
                  }
                : null
            })
            .filter(Boolean)
          d(ge, D) && (F(), Ve(D))
        }
      }
      function He (D) {
        const G = Pe(D) || (x.props.trigger.indexOf('click') >= 0 && k)
        if (!G) {
          if (x.props.interactive) {
            x.hideWithInteractivity(D)
            return
          }
          Ve(D)
        }
      }
      function ce (D) {
        (x.props.trigger.indexOf('focusin') < 0 && D.target !== lt()) ||
                    (x.props.interactive &&
                        D.relatedTarget &&
                        fe.contains(D.relatedTarget)) ||
                    Ve(D)
      }
      function Pe (D) {
        return _.isTouch ? Jt() !== D.type.indexOf('touch') >= 0 : !1
      }
      function Te () {
        Ne()
        const D = x.props
        const G = D.popperOptions
        const te = D.placement
        const ge = D.offset
        const we = D.getReferenceClientRect
        const Ke = D.moveTransition
        const Je = rt() ? Xt(fe).arrow : null
        const Ct = we
          ? {
              getBoundingClientRect: we,
              contextElement: we.contextElement || lt()
            }
          : g
        const Vn = {
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
        const Tt = [
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
          Vn
        ]
        rt() &&
                    Je &&
                    Tt.push({
                      name: 'arrow',
                      options: { element: Je, padding: 3 }
                    }),
        Tt.push.apply(Tt, G?.modifiers || []),
        (x.popperInstance = e.createPopper(
          Ct,
          fe,
          Object.assign({}, G, {
            placement: te,
            onFirstUpdate: je,
            modifiers: Tt
          })
        ))
      }
      function Ne () {
        x.popperInstance &&
                    (x.popperInstance.destroy(), (x.popperInstance = null))
      }
      function Fe () {
        const D = x.props.appendTo
        let G
        const te = lt();
        (x.props.interactive && D === Qe.appendTo) || D === 'parent'
          ? (G = te.parentNode)
          : (G = E(D, [te])),
        G.contains(fe) || G.appendChild(fe),
        Te(),
        mt(
          x.props.interactive &&
                            D === Qe.appendTo &&
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
        return X(fe.querySelectorAll('[data-tippy-root]'))
      }
      function $e (D) {
        x.clearDelayTimeouts(), D && b('onTrigger', [x, D]), oe()
        let G = c(!0)
        const te = Kt()
        const ge = te[0]
        const we = te[1]
        _.isTouch && ge === 'hold' && we && (G = we),
        G
          ? (I = setTimeout(function () {
              x.show()
            }, G))
          : x.show()
      }
      function Ve (D) {
        if (
          (x.clearDelayTimeouts(),
          b('onUntrigger', [x, D]),
          !x.state.isVisible)
        ) {
          z()
          return
        }
        if (
          !(
            x.props.trigger.indexOf('mouseenter') >= 0 &&
                        x.props.trigger.indexOf('click') >= 0 &&
                        ['mouseleave', 'mousemove'].indexOf(D.type) >= 0 &&
                        k
          )
        ) {
          const G = c(!1)
          G
            ? (Y = setTimeout(function () {
                x.state.isVisible && x.hide()
              }, G))
            : (H = requestAnimationFrame(function () {
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
        clearTimeout(I), clearTimeout(Y), cancelAnimationFrame(H)
      }
      function dn (D) {
        if (
          (mt(x.state.isDestroyed, zt('setProps')),
          !x.state.isDestroyed)
        ) {
          b('onBeforeUpdate', [x, D]), Se()
          const G = x.props
          const te = ir(
            g,
            Object.assign({}, x.props, {}, D, {
              ignoreAttributes: !0
            })
          );
          (x.props = te),
          Me(),
          G.interactiveDebounce !== te.interactiveDebounce &&
                            (F(), (Ie = O(Re, te.interactiveDebounce))),
          G.triggerTarget && !te.triggerTarget
            ? R(G.triggerTarget).forEach(function (ge) {
              ge.removeAttribute('aria-expanded')
            })
            : te.triggerTarget &&
                              g.removeAttribute('aria-expanded'),
          T(),
          a(),
          Ft && Ft(G, te),
          x.popperInstance &&
                            (Te(),
                            Ye().forEach(function (ge) {
                              requestAnimationFrame(
                                ge._tippy.popperInstance.forceUpdate
                              )
                            })),
          b('onAfterUpdate', [x, D])
        }
      }
      function Zt (D) {
        x.setProps({ content: D })
      }
      function Nt () {
        mt(x.state.isDestroyed, zt('show'))
        const D = x.state.isVisible
        const G = x.state.isDestroyed
        const te = !x.state.isEnabled
        const ge = _.isTouch && !x.props.touch
        const we = w(x.props.duration, 0, Qe.duration)
        if (
          !(D || G || te || ge) &&
                    !lt().hasAttribute('disabled') &&
                    (b('onShow', [x], !1), x.props.onShow(x) !== !1)
        ) {
          if (
            ((x.state.isVisible = !0),
            rt() && (fe.style.visibility = 'visible'),
            a(),
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
            let Tt
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
                l([pn, en], we), p([pn, en], 'visible')
              }
              C(),
              T(),
              $(wn, x),
              (Tt = x.popperInstance) == null ||
                                    Tt.forceUpdate(),
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
        mt(x.state.isDestroyed, zt('hide'))
        const D = !x.state.isVisible
        const G = x.state.isDestroyed
        const te = !x.state.isEnabled
        const ge = w(x.props.duration, 1, Qe.duration)
        if (
          !(D || G || te) &&
                    (b('onHide', [x], !1), x.props.onHide(x) !== !1)
        ) {
          if (
            ((x.state.isVisible = !1),
            (x.state.isShown = !1),
            (pe = !1),
            (k = !1),
            rt() && (fe.style.visibility = 'hidden'),
            F(),
            z(),
            a(),
            rt())
          ) {
            const we = un()
            const Ke = we.box
            const Je = we.content
            x.props.animation &&
                            (l([Ke, Je], ge), p([Ke, Je], 'hidden'))
          }
          C(),
          T(),
          x.props.animation
            ? rt() && Ce(ge, x.unmount)
            : x.unmount()
        }
      }
      function Qt (D) {
        mt(x.state.isDestroyed, zt('hideWithInteractivity')),
        yt().addEventListener('mousemove', Ie),
        $(yn, Ie),
        Ie(D)
      }
      function Sn () {
        mt(x.state.isDestroyed, zt('unmount')),
        x.state.isVisible && x.hide(),
        x.state.isMounted &&
                        (Ne(),
                        Ye().forEach(function (D) {
                          D._tippy.unmount()
                        }),
                        fe.parentNode && fe.parentNode.removeChild(fe),
                        (wn = wn.filter(function (D) {
                          return D !== x
                        })),
                        (x.state.isMounted = !1),
                        b('onHidden', [x]))
      }
      function Wn () {
        mt(x.state.isDestroyed, zt('destroy')),
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
      const A = Qe.plugins.concat(y.plugins || [])
      At(g), gt(y, A), Vt()
      const I = Object.assign({}, y, { plugins: A })
      const Y = me(g)
      const H = V(I.content)
      const k = Y.length > 1
      mt(
        H && k,
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
      const be = Y.reduce(function (le, pe) {
        const ye = pe && cn(pe, I)
        return ye && le.push(ye), le
      }, [])
      return V(g) ? be[0] : be
    }
    (dt.defaultProps = Qe),
    (dt.setDefaultProps = Wr),
    (dt.currentInput = _)
    const lr = function (y) {
      const A = y === void 0 ? {} : y
      const I = A.exclude
      const Y = A.duration
      wn.forEach(function (H) {
        let k = !1
        if (
          (I &&
                        (k = Z(I) ? H.reference === I : H.popper === I.popper),
          !k)
        ) {
          const be = H.props.duration
          H.setProps({ duration: Y }),
          H.hide(),
          H.state.isDestroyed || H.setProps({ duration: be })
        }
      })
    }
    const cr = Object.assign({}, e.applyStyles, {
      effect: function (y) {
        const A = y.state
        const I = {
          popper: {
            position: A.options.strategy,
            left: '0',
            top: '0',
            margin: '0'
          },
          arrow: { position: 'absolute' },
          reference: {}
        }
        Object.assign(A.elements.popper.style, I.popper),
        (A.styles = I),
        A.elements.arrow &&
                        Object.assign(A.elements.arrow.style, I.arrow)
      }
    })
    const fr = function (y, A) {
      let I
      A === void 0 && (A = {}),
      Ut(
        !Array.isArray(y),
        [
          'The first argument passed to createSingleton() must be an array of',
          'tippy instances. The passed value was',
          String(y)
        ].join(' ')
      )
      let Y = y
      let H = []
      let k
      let be = A.overrides
      let le = []
      let pe = !1
      function ye () {
        H = Y.map(function (ee) {
          return ee.reference
        })
      }
      function _e (ee) {
        Y.forEach(function (ie) {
          ee ? ie.enable() : ie.disable()
        })
      }
      function je (ee) {
        return Y.map(function (ie) {
          const x = ie.setProps
          return (
            (ie.setProps = function (Ge) {
              x(Ge), ie.reference === k && ee.setProps(Ge)
            }),
            function () {
              ie.setProps = x
            }
          )
        })
      }
      function Ae (ee, ie) {
        const x = H.indexOf(ie)
        if (ie !== k) {
          k = ie
          const Ge = (be || []).concat('content').reduce(function (
            fe,
            Ft
          ) {
            return (fe[Ft] = Y[x].props[Ft]), fe
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
      _e(!1), ye()
      const Ie = {
        fn: function () {
          return {
            onDestroy: function () {
              _e(!0)
            },
            onHidden: function () {
              k = null
            },
            onClickOutside: function (x) {
              x.props.showOnCreate &&
                                !pe &&
                                ((pe = !0), (k = null))
            },
            onShow: function (x) {
              x.props.showOnCreate &&
                                !pe &&
                                ((pe = !0), Ae(x, H[0]))
            },
            onTrigger: function (x, Ge) {
              Ae(x, Ge.currentTarget)
            }
          }
        }
      }
      const re = dt(
        J(),
        Object.assign({}, S(A, ['overrides']), {
          plugins: [Ie].concat(A.plugins || []),
          triggerTarget: H,
          popperOptions: Object.assign({}, A.popperOptions, {
            modifiers: [].concat(
              ((I = A.popperOptions) == null
                ? void 0
                : I.modifiers) || [],
              [cr]
            )
          })
        })
      )
      const he = re.show;
      (re.show = function (ee) {
        if ((he(), !k && ee == null)) return Ae(re, H[0])
        if (!(k && ee == null)) {
          if (typeof ee === 'number') {
            return H[ee] && Ae(re, H[ee])
          }
          if (Y.includes(ee)) {
            const ie = ee.reference
            return Ae(re, ie)
          }
          if (H.includes(ee)) return Ae(re, ee)
        }
      }),
      (re.showNext = function () {
        const ee = H[0]
        if (!k) return re.show(0)
        const ie = H.indexOf(k)
        re.show(H[ie + 1] || ee)
      }),
      (re.showPrevious = function () {
        const ee = H[H.length - 1]
        if (!k) return re.show(ee)
        const ie = H.indexOf(k)
        const x = H[ie - 1] || ee
        re.show(x)
      })
      const ve = re.setProps
      return (
        (re.setProps = function (ee) {
          (be = ee.overrides || be), ve(ee)
        }),
        (re.setInstances = function (ee) {
          _e(!0),
          le.forEach(function (ie) {
            return ie()
          }),
          (Y = ee),
          _e(!1),
          ye(),
          je(re),
          re.setProps({ triggerTarget: H })
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
      Ut(
        !(y && y.target),
        [
          'You must specity a `target` prop indicating a CSS selector string matching',
          'the target elements that should receive a tippy.'
        ].join(' ')
      )
      let A = []
      let I = []
      let Y = !1
      const H = y.target
      const k = S(y, ['target'])
      const be = Object.assign({}, k, { trigger: 'manual', touch: !1 })
      const le = Object.assign({}, k, { showOnCreate: !0 })
      const pe = dt(g, be)
      const ye = R(pe)
      function _e (he) {
        if (!(!he.target || Y)) {
          const ve = he.target.closest(H)
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
              ie && (I = I.concat(ie))
            }
          }
        }
      }
      function je (he, ve, ee, ie) {
        ie === void 0 && (ie = !1),
        he.addEventListener(ve, ee, ie),
        A.push({
          node: he,
          eventType: ve,
          handler: ee,
          options: ie
        })
      }
      function Ae (he) {
        const ve = he.reference
        je(ve, 'touchstart', _e, u),
        je(ve, 'mouseover', _e),
        je(ve, 'focusin', _e),
        je(ve, 'click', _e)
      }
      function Ie () {
        A.forEach(function (he) {
          const ve = he.node
          const ee = he.eventType
          const ie = he.handler
          const x = he.options
          ve.removeEventListener(ee, ie, x)
        }),
        (A = [])
      }
      function re (he) {
        const ve = he.destroy
        const ee = he.enable
        const ie = he.disable;
        (he.destroy = function (x) {
          x === void 0 && (x = !0),
          x &&
                            I.forEach(function (Ge) {
                              Ge.destroy()
                            }),
          (I = []),
          Ie(),
          ve()
        }),
        (he.enable = function () {
          ee(),
          I.forEach(function (x) {
            return x.enable()
          }),
          (Y = !1)
        }),
        (he.disable = function () {
          ie(),
          I.forEach(function (x) {
            return x.disable()
          }),
          (Y = !0)
        }),
        Ae(he)
      }
      return ye.forEach(re), pe
    }
    const dr = {
      name: 'animateFill',
      defaultValue: !1,
      fn: function (y) {
        let A
        if (!((A = y.props.render) != null && A.$$tippy)) {
          return (
            Ut(
              y.props.animateFill,
              'The `animateFill` plugin requires the default render function.'
            ),
            {}
          )
        }
        const I = Xt(y.popper)
        const Y = I.box
        const H = I.content
        const k = y.props.animateFill ? zr() : null
        return {
          onCreate: function () {
            k &&
                            (Y.insertBefore(k, Y.firstElementChild),
                            Y.setAttribute('data-animatefill', ''),
                            (Y.style.overflow = 'hidden'),
                            y.setProps({
                              arrow: !1,
                              animation: 'shift-away'
                            }))
          },
          onMount: function () {
            if (k) {
              const le = Y.style.transitionDuration
              const pe = Number(le.replace('ms', ''));
              (H.style.transitionDelay =
                                Math.round(pe / 10) + 'ms'),
              (k.style.transitionDuration = le),
              p([k], 'visible')
            }
          },
          onShow: function () {
            k && (k.style.transitionDuration = '0ms')
          },
          onHide: function () {
            k && p([k], 'hidden')
          }
        }
      }
    }
    function zr () {
      const g = J()
      return (g.className = o), p([g], 'hidden'), g
    }
    let xn = { clientX: 0, clientY: 0 }
    let fn = []
    function En (g) {
      const y = g.clientX
      const A = g.clientY
      xn = { clientX: y, clientY: A }
    }
    function On (g) {
      g.addEventListener('mousemove', En)
    }
    function Ur (g) {
      g.removeEventListener('mousemove', En)
    }
    const jn = {
      name: 'followCursor',
      defaultValue: !1,
      fn: function (y) {
        const A = y.reference
        const I = v(y.props.triggerTarget || A)
        let Y = !1
        let H = !1
        let k = !0
        let be = y.props
        function le () {
          return (
            y.props.followCursor === 'initial' && y.state.isVisible
          )
        }
        function pe () {
          I.addEventListener('mousemove', je)
        }
        function ye () {
          I.removeEventListener('mousemove', je)
        }
        function _e () {
          (Y = !0),
          y.setProps({ getReferenceClientRect: null }),
          (Y = !1)
        }
        function je (re) {
          const he = re.target ? A.contains(re.target) : !0
          const ve = y.props.followCursor
          const ee = re.clientX
          const ie = re.clientY
          const x = A.getBoundingClientRect()
          const Ge = ee - x.left
          const fe = ie - x.top;
          (he || !y.props.interactive) &&
                        y.setProps({
                          getReferenceClientRect: function () {
                            const bt = A.getBoundingClientRect()
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
                        (fn.push({ instance: y, doc: I }), On(I))
        }
        function Ie () {
          (fn = fn.filter(function (re) {
            return re.instance !== y
          })),
          fn.filter(function (re) {
            return re.doc === I
          }).length === 0 && Ur(I)
        }
        return {
          onCreate: Ae,
          onDestroy: Ie,
          onBeforeUpdate: function () {
            be = y.props
          },
          onAfterUpdate: function (he, ve) {
            const ee = ve.followCursor
            Y ||
                            (ee !== void 0 &&
                                be.followCursor !== ee &&
                                (Ie(),
                                ee
                                  ? (Ae(),
                                    y.state.isMounted && !H && !le() && pe())
                                  : (ye(), _e())))
          },
          onMount: function () {
            y.props.followCursor &&
                            !H &&
                            (k && (je(xn), (k = !1)), le() || pe())
          },
          onTrigger: function (he, ve) {
            U(ve) &&
                            (xn = {
                              clientX: ve.clientX,
                              clientY: ve.clientY
                            }),
            (H = ve.type === 'focus')
          },
          onHidden: function () {
            y.props.followCursor && (_e(), ye(), (k = !0))
          }
        }
      }
    }
    function Yr (g, y) {
      let A
      return {
        popperOptions: Object.assign({}, g.popperOptions, {
          modifiers: [].concat(
            (
              ((A = g.popperOptions) == null
                ? void 0
                : A.modifiers) || []
            ).filter(function (I) {
              const Y = I.name
              return Y !== y.name
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
        const A = y.reference
        function I () {
          return !!y.props.inlinePositioning
        }
        let Y
        let H = -1
        let k = !1
        const be = {
          name: 'tippyInlinePositioning',
          enabled: !0,
          phase: 'afterWrite',
          fn: function (je) {
            const Ae = je.state
            I() &&
                            (Y !== Ae.placement &&
                                y.setProps({
                                  getReferenceClientRect: function () {
                                    return le(Ae.placement)
                                  }
                                }),
                            (Y = Ae.placement))
          }
        }
        function le (_e) {
          return Xr(
            K(_e),
            A.getBoundingClientRect(),
            X(A.getClientRects()),
            H
          )
        }
        function pe (_e) {
          (k = !0), y.setProps(_e), (k = !1)
        }
        function ye () {
          k || pe(Yr(y.props, be))
        }
        return {
          onCreate: ye,
          onAfterUpdate: ye,
          onTrigger: function (je, Ae) {
            if (U(Ae)) {
              const Ie = X(y.reference.getClientRects())
              const re = Ie.find(function (he) {
                return (
                  he.left - 2 <= Ae.clientX &&
                                    he.right + 2 >= Ae.clientX &&
                                    he.top - 2 <= Ae.clientY &&
                                    he.bottom + 2 >= Ae.clientY
                )
              })
              H = Ie.indexOf(re)
            }
          },
          onUntrigger: function () {
            H = -1
          }
        }
      }
    }
    function Xr (g, y, A, I) {
      if (A.length < 2 || g === null) return y
      if (A.length === 2 && I >= 0 && A[0].left > A[1].right) {
        return A[I] || y
      }
      switch (g) {
        case 'top':
        case 'bottom': {
          const Y = A[0]
          const H = A[A.length - 1]
          const k = g === 'top'
          const be = Y.top
          const le = H.bottom
          const pe = k ? Y.left : H.left
          const ye = k ? Y.right : H.right
          const _e = ye - pe
          const je = le - be
          return {
            top: be,
            bottom: le,
            left: pe,
            right: ye,
            width: _e,
            height: je
          }
        }
        case 'left':
        case 'right': {
          const Ae = Math.min.apply(
            Math,
            A.map(function (fe) {
              return fe.left
            })
          )
          const Ie = Math.max.apply(
            Math,
            A.map(function (fe) {
              return fe.right
            })
          )
          const re = A.filter(function (fe) {
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
        const A = y.reference
        const I = y.popper
        function Y () {
          return y.popperInstance
            ? y.popperInstance.state.elements.reference
            : A
        }
        function H (pe) {
          return y.props.sticky === !0 || y.props.sticky === pe
        }
        let k = null
        let be = null
        function le () {
          const pe = H('reference')
            ? Y().getBoundingClientRect()
            : null
          const ye = H('popper') ? I.getBoundingClientRect() : null;
          ((pe && Hn(k, pe)) || (ye && Hn(be, ye))) &&
                        y.popperInstance &&
                        y.popperInstance.update(),
          (k = pe),
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
    (t.animateFill = dr),
    (t.createSingleton = fr),
    (t.default = dt),
    (t.delegate = qt),
    (t.followCursor = jn),
    (t.hideAll = lr),
    (t.inlinePositioning = Bn),
    (t.roundArrow = r),
    (t.sticky = qr)
  })
  const Oi = Lo(No())
  const ds = Lo(No())
  const ps = (t) => {
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
      e.plugins.push(ds.followCursor)
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
  function Si (t) {
    t.magic('tooltip', (e) => (r, n = {}) => {
      const i = n.timeout
      delete n.timeout
      const o = (0, Oi.default)(e, {
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
        { evaluateLater: i, effect: o, cleanup: s }
      ) => {
        const h = r.length > 0 ? ps(r) : {}
        e.__x_tippy || (e.__x_tippy = (0, Oi.default)(e, h)),
        s(() => {
          e.__x_tippy &&
                                (e.__x_tippy.destroy(), delete e.__x_tippy)
        })
        const u = () => e.__x_tippy.enable()
        const f = () => e.__x_tippy.disable()
        const w = (m) => {
          m ? (u(), e.__x_tippy.setContent(m)) : f()
        }
        if (r.includes('raw')) w(n)
        else {
          const m = i(n)
          o(() => {
            m((E) => {
              typeof E === 'object'
                ? (e.__x_tippy.setProps(E), u())
                : w(E)
            })
          })
        }
      }
    )
  }
  Si.defaultProps = (t) => (Oi.default.setDefaultProps(t), Si)
  const hs = Si
  const ko = hs
  document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(io),
    window.Alpine.plugin(oo),
    window.Alpine.plugin(Io),
    window.Alpine.plugin(ko)
  })
  const vs = function (t, e, r) {
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
        const [P, R] = O.split(',', 2)
        if (R === '*' && m >= P) return S
        if (P === '*' && m <= R) return S
        if (m >= P && m <= R) return S
      }
      return O == m ? S : null
    }
    function o (w) {
      return w.toString().charAt(0).toUpperCase() + w.toString().slice(1)
    }
    function s (w, m) {
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
    function h (w) {
      return w.map((m) => m.replace(/^[\{\[]([^\[\]\{\}]*)[\}\]]/, ''))
    }
    let u = t.split('|')
    const f = n(u, e)
    return f != null
      ? s(f.trim(), r)
      : ((u = h(u)), s(u.length > 1 && e > 1 ? u[1] : u[0], r))
  }
  window.jsMd5 = jo.md5
  window.pluralize = vs
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
