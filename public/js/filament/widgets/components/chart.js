function At () {}
const Do = (function () {
  let s = 0
  return function () {
    return s++
  }
})()
function N (s) {
  return s === null || typeof s > 'u'
}
function $ (s) {
  if (Array.isArray && Array.isArray(s)) return !0
  const t = Object.prototype.toString.call(s)
  return t.slice(0, 7) === '[object' && t.slice(-6) === 'Array]'
}
function A (s) {
  return (
    s !== null && Object.prototype.toString.call(s) === '[object Object]'
  )
}
const K = (s) => (typeof s === 'number' || s instanceof Number) && isFinite(+s)
function mt (s, t) {
  return K(s) ? s : t
}
function C (s, t) {
  return typeof s > 'u' ? t : s
}
const Eo = (s, t) =>
  typeof s === 'string' && s.endsWith('%') ? parseFloat(s) / 100 : s / t
const En = (s, t) =>
  typeof s === 'string' && s.endsWith('%') ? (parseFloat(s) / 100) * t : +s
function j (s, t, e) {
  if (s && typeof s.call === 'function') return s.apply(e, t)
}
function H (s, t, e, i) {
  let n, r, o
  if ($(s)) {
    if (((r = s.length), i)) {
      for (n = r - 1; n >= 0; n--) t.call(e, s[n], n)
    } else for (n = 0; n < r; n++) t.call(e, s[n], n)
  } else if (A(s)) {
    for (o = Object.keys(s), r = o.length, n = 0; n < r; n++) {
      t.call(e, s[o[n]], o[n])
    }
  }
}
function ws (s, t) {
  let e, i, n, r
  if (!s || !t || s.length !== t.length) return !1
  for (e = 0, i = s.length; e < i; ++e) {
    if (
      ((n = s[e]),
      (r = t[e]),
      n.datasetIndex !== r.datasetIndex || n.index !== r.index)
    ) {
      return !1
    }
  }
  return !0
}
function ki (s) {
  if ($(s)) return s.map(ki)
  if (A(s)) {
    const t = Object.create(null)
    const e = Object.keys(s)
    const i = e.length
    let n = 0
    for (; n < i; ++n) t[e[n]] = ki(s[e[n]])
    return t
  }
  return s
}
function Co (s) {
  return ['__proto__', 'prototype', 'constructor'].indexOf(s) === -1
}
function Dc (s, t, e, i) {
  if (!Co(s)) return
  const n = t[s]
  const r = e[s]
  A(n) && A(r) ? Ie(n, r, i) : (t[s] = ki(r))
}
function Ie (s, t, e) {
  const i = $(t) ? t : [t]
  const n = i.length
  if (!A(s)) return s
  e = e || {}
  const r = e.merger || Dc
  for (let o = 0; o < n; ++o) {
    if (((t = i[o]), !A(t))) continue
    const a = Object.keys(t)
    for (let l = 0, c = a.length; l < c; ++l) r(a[l], s, t, e)
  }
  return s
}
function Pe (s, t) {
  return Ie(s, t, { merger: Ec })
}
function Ec (s, t, e) {
  if (!Co(s)) return
  const i = t[s]
  const n = e[s]
  A(i) && A(n)
    ? Pe(i, n)
    : Object.prototype.hasOwnProperty.call(t, s) || (t[s] = ki(n))
}
const mo = { '': (s) => s, x: (s) => s.x, y: (s) => s.y }
function Bt (s, t) {
  return (mo[t] || (mo[t] = Cc(t)))(s)
}
function Cc (s) {
  const t = Ic(s)
  return (e) => {
    for (const i of t) {
      if (i === '') break
      e = e && e[i]
    }
    return e
  }
}
function Ic (s) {
  const t = s.split('.')
  const e = []
  let i = ''
  for (const n of t) {
    (i += n),
    i.endsWith('\\')
      ? (i = i.slice(0, -1) + '.')
      : (e.push(i), (i = ''))
  }
  return e
}
function Oi (s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const ft = (s) => typeof s < 'u'
const Ht = (s) => typeof s === 'function'
const Cn = (s, t) => {
  if (s.size !== t.size) return !1
  for (const e of s) if (!t.has(e)) return !1
  return !0
}
function Io (s) {
  return (
    s.type === 'mouseup' || s.type === 'click' || s.type === 'contextmenu'
  )
}
const Y = Math.PI
const B = 2 * Y
const Fc = B + Y
const Mi = Number.POSITIVE_INFINITY
const Ac = Y / 180
const Z = Y / 2
const ys = Y / 4
const go = (Y * 2) / 3
const gt = Math.log10
const Tt = Math.sign
function In (s) {
  const t = Math.round(s)
  s = Re(s, t, s / 1e3) ? t : s
  const e = Math.pow(10, Math.floor(gt(s)))
  const i = s / e
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * e
}
function Fo (s) {
  const t = []
  const e = Math.sqrt(s)
  let i
  for (i = 1; i < e; i++) s % i === 0 && (t.push(i), t.push(s / i))
  return e === (e | 0) && t.push(e), t.sort((n, r) => n - r).pop(), t
}
function pe (s) {
  return !isNaN(parseFloat(s)) && isFinite(s)
}
function Re (s, t, e) {
  return Math.abs(s - t) < e
}
function Ao (s, t) {
  const e = Math.round(s)
  return e - t <= s && e + t >= s
}
function Fn (s, t, e) {
  let i, n, r
  for (i = 0, n = s.length; i < n; i++) {
    (r = s[i][e]),
    isNaN(r) ||
                ((t.min = Math.min(t.min, r)), (t.max = Math.max(t.max, r)))
  }
}
function wt (s) {
  return s * (Y / 180)
}
function Di (s) {
  return s * (180 / Y)
}
function An (s) {
  if (!K(s)) return
  let t = 1
  let e = 0
  for (; Math.round(s * t) / t !== s;) (t *= 10), e++
  return e
}
function Ln (s, t) {
  const e = t.x - s.x
  const i = t.y - s.y
  const n = Math.sqrt(e * e + i * i)
  let r = Math.atan2(i, e)
  return r < -0.5 * Y && (r += B), { angle: r, distance: n }
}
function Ti (s, t) {
  return Math.sqrt(Math.pow(t.x - s.x, 2) + Math.pow(t.y - s.y, 2))
}
function Lc (s, t) {
  return ((s - t + Fc) % B) - Y
}
function ht (s) {
  return ((s % B) + B) % B
}
function Ne (s, t, e, i) {
  const n = ht(s)
  const r = ht(t)
  const o = ht(e)
  const a = ht(r - n)
  const l = ht(o - n)
  const c = ht(n - r)
  const h = ht(n - o)
  return n === r || n === o || (i && r === o) || (a > l && c < h)
}
function it (s, t, e) {
  return Math.max(t, Math.min(e, s))
}
function Lo (s) {
  return it(s, -32768, 32767)
}
function Lt (s, t, e, i = 1e-6) {
  return s >= Math.min(t, e) - i && s <= Math.max(t, e) + i
}
function Ei (s, t, e) {
  e = e || ((o) => s[o] < t)
  let i = s.length - 1
  let n = 0
  let r
  for (; i - n > 1;) (r = (n + i) >> 1), e(r) ? (n = r) : (i = r)
  return { lo: n, hi: i }
}
const Ft = (s, t, e, i) =>
  Ei(s, e, i ? (n) => s[n][t] <= e : (n) => s[n][t] < e)
const Po = (s, t, e) => Ei(s, e, (i) => s[i][t] >= e)
function Ro (s, t, e) {
  let i = 0
  let n = s.length
  for (; i < n && s[i] < t;) i++
  for (; n > i && s[n - 1] > e;) n--
  return i > 0 || n < s.length ? s.slice(i, n) : s
}
const No = ['push', 'pop', 'shift', 'splice', 'unshift']
function Wo (s, t) {
  if (s._chartjs) {
    s._chartjs.listeners.push(t)
    return
  }
  Object.defineProperty(s, '_chartjs', {
    configurable: !0,
    enumerable: !1,
    value: { listeners: [t] }
  }),
  No.forEach((e) => {
    const i = '_onData' + Oi(e)
    const n = s[e]
    Object.defineProperty(s, e, {
      configurable: !0,
      enumerable: !1,
      value (...r) {
        const o = n.apply(this, r)
        return (
          s._chartjs.listeners.forEach((a) => {
            typeof a[i] === 'function' && a[i](...r)
          }),
          o
        )
      }
    })
  })
}
function Pn (s, t) {
  const e = s._chartjs
  if (!e) return
  const i = e.listeners
  const n = i.indexOf(t)
  n !== -1 && i.splice(n, 1),
  !(i.length > 0) &&
            (No.forEach((r) => {
              delete s[r]
            }),
            delete s._chartjs)
}
function Rn (s) {
  const t = new Set()
  let e
  let i
  for (e = 0, i = s.length; e < i; ++e) t.add(s[e])
  return t.size === i ? s : Array.from(t)
}
const Nn = (function () {
  return typeof window > 'u'
    ? function (s) {
      return s()
    }
    : window.requestAnimationFrame
})()
function Wn (s, t, e) {
  const i = e || ((o) => Array.prototype.slice.call(o))
  let n = !1
  let r = []
  return function (...o) {
    (r = i(o)),
    n ||
                ((n = !0),
                Nn.call(window, () => {
                  (n = !1), s.apply(t, r)
                }))
  }
}
function zo (s, t) {
  let e
  return function (...i) {
    return (
      t ? (clearTimeout(e), (e = setTimeout(s, t, i))) : s.apply(this, i),
      t
    )
  }
}
const Ci = (s) => (s === 'start' ? 'left' : s === 'end' ? 'right' : 'center')
const ot = (s, t, e) => (s === 'start' ? t : s === 'end' ? e : (t + e) / 2)
const Vo = (s, t, e, i) =>
  s === (i ? 'left' : 'right') ? e : s === 'center' ? (t + e) / 2 : t
function zn (s, t, e) {
  const i = t.length
  let n = 0
  let r = i
  if (s._sorted) {
    const { iScale: o, _parsed: a } = s
    const l = o.axis
    const {
      min: c,
      max: h,
      minDefined: u,
      maxDefined: d
    } = o.getUserBounds()
    u &&
            (n = it(
              Math.min(
                Ft(a, o.axis, c).lo,
                e ? i : Ft(t, l, o.getPixelForValue(c)).lo
              ),
              0,
              i - 1
            )),
    d
      ? (r =
                      it(
                        Math.max(
                          Ft(a, o.axis, h, !0).hi + 1,
                          e
                            ? 0
                            : Ft(t, l, o.getPixelForValue(h), !0).hi + 1
                        ),
                        n,
                        i
                      ) - n)
      : (r = i - n)
  }
  return { start: n, count: r }
}
function Vn (s) {
  const { xScale: t, yScale: e, _scaleRanges: i } = s
  const n = { xmin: t.min, xmax: t.max, ymin: e.min, ymax: e.max }
  if (!i) return (s._scaleRanges = n), !0
  const r =
        i.xmin !== t.min ||
        i.xmax !== t.max ||
        i.ymin !== e.min ||
        i.ymax !== e.max
  return Object.assign(i, n), r
}
const bi = (s) => s === 0 || s === 1
const po = (s, t, e) =>
  -(Math.pow(2, 10 * (s -= 1)) * Math.sin(((s - t) * B) / e))
const yo = (s, t, e) => Math.pow(2, -10 * s) * Math.sin(((s - t) * B) / e) + 1
var Ce = {
  linear: (s) => s,
  easeInQuad: (s) => s * s,
  easeOutQuad: (s) => -s * (s - 2),
  easeInOutQuad: (s) =>
    (s /= 0.5) < 1 ? 0.5 * s * s : -0.5 * (--s * (s - 2) - 1),
  easeInCubic: (s) => s * s * s,
  easeOutCubic: (s) => (s -= 1) * s * s + 1,
  easeInOutCubic: (s) =>
    (s /= 0.5) < 1 ? 0.5 * s * s * s : 0.5 * ((s -= 2) * s * s + 2),
  easeInQuart: (s) => s * s * s * s,
  easeOutQuart: (s) => -((s -= 1) * s * s * s - 1),
  easeInOutQuart: (s) =>
    (s /= 0.5) < 1
      ? 0.5 * s * s * s * s
      : -0.5 * ((s -= 2) * s * s * s - 2),
  easeInQuint: (s) => s * s * s * s * s,
  easeOutQuint: (s) => (s -= 1) * s * s * s * s + 1,
  easeInOutQuint: (s) =>
    (s /= 0.5) < 1
      ? 0.5 * s * s * s * s * s
      : 0.5 * ((s -= 2) * s * s * s * s + 2),
  easeInSine: (s) => -Math.cos(s * Z) + 1,
  easeOutSine: (s) => Math.sin(s * Z),
  easeInOutSine: (s) => -0.5 * (Math.cos(Y * s) - 1),
  easeInExpo: (s) => (s === 0 ? 0 : Math.pow(2, 10 * (s - 1))),
  easeOutExpo: (s) => (s === 1 ? 1 : -Math.pow(2, -10 * s) + 1),
  easeInOutExpo: (s) =>
    bi(s)
      ? s
      : s < 0.5
        ? 0.5 * Math.pow(2, 10 * (s * 2 - 1))
        : 0.5 * (-Math.pow(2, -10 * (s * 2 - 1)) + 2),
  easeInCirc: (s) => (s >= 1 ? s : -(Math.sqrt(1 - s * s) - 1)),
  easeOutCirc: (s) => Math.sqrt(1 - (s -= 1) * s),
  easeInOutCirc: (s) =>
    (s /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - s * s) - 1)
      : 0.5 * (Math.sqrt(1 - (s -= 2) * s) + 1),
  easeInElastic: (s) => (bi(s) ? s : po(s, 0.075, 0.3)),
  easeOutElastic: (s) => (bi(s) ? s : yo(s, 0.075, 0.3)),
  easeInOutElastic (s) {
    return bi(s)
      ? s
      : s < 0.5
        ? 0.5 * po(s * 2, 0.1125, 0.45)
        : 0.5 + 0.5 * yo(s * 2 - 1, 0.1125, 0.45)
  },
  easeInBack (s) {
    return s * s * ((1.70158 + 1) * s - 1.70158)
  },
  easeOutBack (s) {
    return (s -= 1) * s * ((1.70158 + 1) * s + 1.70158) + 1
  },
  easeInOutBack (s) {
    let t = 1.70158
    return (s /= 0.5) < 1
      ? 0.5 * (s * s * (((t *= 1.525) + 1) * s - t))
      : 0.5 * ((s -= 2) * s * (((t *= 1.525) + 1) * s + t) + 2)
  },
  easeInBounce: (s) => 1 - Ce.easeOutBounce(1 - s),
  easeOutBounce (s) {
    return s < 1 / 2.75
      ? 7.5625 * s * s
      : s < 2 / 2.75
        ? 7.5625 * (s -= 1.5 / 2.75) * s + 0.75
        : s < 2.5 / 2.75
          ? 7.5625 * (s -= 2.25 / 2.75) * s + 0.9375
          : 7.5625 * (s -= 2.625 / 2.75) * s + 0.984375
  },
  easeInOutBounce: (s) =>
    s < 0.5
      ? Ce.easeInBounce(s * 2) * 0.5
      : Ce.easeOutBounce(s * 2 - 1) * 0.5 + 0.5
}
function Ss (s) {
  return (s + 0.5) | 0
}
const Kt = (s, t, e) => Math.max(Math.min(s, e), t)
function bs (s) {
  return Kt(Ss(s * 2.55), 0, 255)
}
function Jt (s) {
  return Kt(Ss(s * 255), 0, 255)
}
function Vt (s) {
  return Kt(Ss(s / 2.55) / 100, 0, 1)
}
function bo (s) {
  return Kt(Ss(s * 100), 0, 100)
}
const _t = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15
}
const On = [...'0123456789ABCDEF']
const Pc = (s) => On[s & 15]
const Rc = (s) => On[(s & 240) >> 4] + On[s & 15]
const xi = (s) => (s & 240) >> 4 === (s & 15)
const Nc = (s) => xi(s.r) && xi(s.g) && xi(s.b) && xi(s.a)
function Wc (s) {
  const t = s.length
  let e
  return (
    s[0] === '#' &&
            (t === 4 || t === 5
              ? (e = {
                  r: 255 & (_t[s[1]] * 17),
                  g: 255 & (_t[s[2]] * 17),
                  b: 255 & (_t[s[3]] * 17),
                  a: t === 5 ? _t[s[4]] * 17 : 255
                })
              : (t === 7 || t === 9) &&
                  (e = {
                    r: (_t[s[1]] << 4) | _t[s[2]],
                    g: (_t[s[3]] << 4) | _t[s[4]],
                    b: (_t[s[5]] << 4) | _t[s[6]],
                    a: t === 9 ? (_t[s[7]] << 4) | _t[s[8]] : 255
                  })),
    e
  )
}
const zc = (s, t) => (s < 255 ? t(s) : '')
function Vc (s) {
  const t = Nc(s) ? Pc : Rc
  return s ? '#' + t(s.r) + t(s.g) + t(s.b) + zc(s.a, t) : void 0
}
const Hc =
    /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/
function Ho (s, t, e) {
  const i = t * Math.min(e, 1 - e)
  const n = (r, o = (r + s / 30) % 12) =>
    e - i * Math.max(Math.min(o - 3, 9 - o, 1), -1)
  return [n(0), n(8), n(4)]
}
function Bc (s, t, e) {
  const i = (n, r = (n + s / 60) % 6) =>
    e - e * t * Math.max(Math.min(r, 4 - r, 1), 0)
  return [i(5), i(3), i(1)]
}
function $c (s, t, e) {
  const i = Ho(s, 1, 0.5)
  let n
  for (
    t + e > 1 && ((n = 1 / (t + e)), (t *= n), (e *= n)), n = 0;
    n < 3;
    n++
  ) {
    (i[n] *= 1 - t - e), (i[n] += t)
  }
  return i
}
function jc (s, t, e, i, n) {
  return s === n
    ? (t - e) / i + (t < e ? 6 : 0)
    : t === n
      ? (e - s) / i + 2
      : (s - t) / i + 4
}
function Hn (s) {
  const e = s.r / 255
  const i = s.g / 255
  const n = s.b / 255
  const r = Math.max(e, i, n)
  const o = Math.min(e, i, n)
  const a = (r + o) / 2
  let l
  let c
  let h
  return (
    r !== o &&
            ((h = r - o),
            (c = a > 0.5 ? h / (2 - r - o) : h / (r + o)),
            (l = jc(e, i, n, h, r)),
            (l = l * 60 + 0.5)),
    [l | 0, c || 0, a]
  )
}
function Bn (s, t, e, i) {
  return (Array.isArray(t) ? s(t[0], t[1], t[2]) : s(t, e, i)).map(Jt)
}
function $n (s, t, e) {
  return Bn(Ho, s, t, e)
}
function Uc (s, t, e) {
  return Bn($c, s, t, e)
}
function Yc (s, t, e) {
  return Bn(Bc, s, t, e)
}
function Bo (s) {
  return ((s % 360) + 360) % 360
}
function Zc (s) {
  const t = Hc.exec(s)
  let e = 255
  let i
  if (!t) return
  t[5] !== i && (e = t[6] ? bs(+t[5]) : Jt(+t[5]))
  const n = Bo(+t[2])
  const r = +t[3] / 100
  const o = +t[4] / 100
  return (
    t[1] === 'hwb'
      ? (i = Uc(n, r, o))
      : t[1] === 'hsv'
        ? (i = Yc(n, r, o))
        : (i = $n(n, r, o)),
    { r: i[0], g: i[1], b: i[2], a: e }
  )
}
function qc (s, t) {
  let e = Hn(s);
  (e[0] = Bo(e[0] + t)),
  (e = $n(e)),
  (s.r = e[0]),
  (s.g = e[1]),
  (s.b = e[2])
}
function Gc (s) {
  if (!s) return
  const t = Hn(s)
  const e = t[0]
  const i = bo(t[1])
  const n = bo(t[2])
  return s.a < 255
    ? `hsla(${e}, ${i}%, ${n}%, ${Vt(s.a)})`
    : `hsl(${e}, ${i}%, ${n}%)`
}
const xo = {
  x: 'dark',
  Z: 'light',
  Y: 're',
  X: 'blu',
  W: 'gr',
  V: 'medium',
  U: 'slate',
  A: 'ee',
  T: 'ol',
  S: 'or',
  B: 'ra',
  C: 'lateg',
  D: 'ights',
  R: 'in',
  Q: 'turquois',
  E: 'hi',
  P: 'ro',
  O: 'al',
  N: 'le',
  M: 'de',
  L: 'yello',
  F: 'en',
  K: 'ch',
  G: 'arks',
  H: 'ea',
  I: 'ightg',
  J: 'wh'
}
const _o = {
  OiceXe: 'f0f8ff',
  antiquewEte: 'faebd7',
  aqua: 'ffff',
  aquamarRe: '7fffd4',
  azuY: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '0',
  blanKedOmond: 'ffebcd',
  Xe: 'ff',
  XeviTet: '8a2be2',
  bPwn: 'a52a2a',
  burlywood: 'deb887',
  caMtXe: '5f9ea0',
  KartYuse: '7fff00',
  KocTate: 'd2691e',
  cSO: 'ff7f50',
  cSnflowerXe: '6495ed',
  cSnsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: 'ffff',
  xXe: '8b',
  xcyan: '8b8b',
  xgTMnPd: 'b8860b',
  xWay: 'a9a9a9',
  xgYF: '6400',
  xgYy: 'a9a9a9',
  xkhaki: 'bdb76b',
  xmagFta: '8b008b',
  xTivegYF: '556b2f',
  xSange: 'ff8c00',
  xScEd: '9932cc',
  xYd: '8b0000',
  xsOmon: 'e9967a',
  xsHgYF: '8fbc8f',
  xUXe: '483d8b',
  xUWay: '2f4f4f',
  xUgYy: '2f4f4f',
  xQe: 'ced1',
  xviTet: '9400d3',
  dAppRk: 'ff1493',
  dApskyXe: 'bfff',
  dimWay: '696969',
  dimgYy: '696969',
  dodgerXe: '1e90ff',
  fiYbrick: 'b22222',
  flSOwEte: 'fffaf0',
  foYstWAn: '228b22',
  fuKsia: 'ff00ff',
  gaRsbSo: 'dcdcdc',
  ghostwEte: 'f8f8ff',
  gTd: 'ffd700',
  gTMnPd: 'daa520',
  Way: '808080',
  gYF: '8000',
  gYFLw: 'adff2f',
  gYy: '808080',
  honeyMw: 'f0fff0',
  hotpRk: 'ff69b4',
  RdianYd: 'cd5c5c',
  Rdigo: '4b0082',
  ivSy: 'fffff0',
  khaki: 'f0e68c',
  lavFMr: 'e6e6fa',
  lavFMrXsh: 'fff0f5',
  lawngYF: '7cfc00',
  NmoncEffon: 'fffacd',
  ZXe: 'add8e6',
  ZcSO: 'f08080',
  Zcyan: 'e0ffff',
  ZgTMnPdLw: 'fafad2',
  ZWay: 'd3d3d3',
  ZgYF: '90ee90',
  ZgYy: 'd3d3d3',
  ZpRk: 'ffb6c1',
  ZsOmon: 'ffa07a',
  ZsHgYF: '20b2aa',
  ZskyXe: '87cefa',
  ZUWay: '778899',
  ZUgYy: '778899',
  ZstAlXe: 'b0c4de',
  ZLw: 'ffffe0',
  lime: 'ff00',
  limegYF: '32cd32',
  lRF: 'faf0e6',
  magFta: 'ff00ff',
  maPon: '800000',
  VaquamarRe: '66cdaa',
  VXe: 'cd',
  VScEd: 'ba55d3',
  VpurpN: '9370db',
  VsHgYF: '3cb371',
  VUXe: '7b68ee',
  VsprRggYF: 'fa9a',
  VQe: '48d1cc',
  VviTetYd: 'c71585',
  midnightXe: '191970',
  mRtcYam: 'f5fffa',
  mistyPse: 'ffe4e1',
  moccasR: 'ffe4b5',
  navajowEte: 'ffdead',
  navy: '80',
  Tdlace: 'fdf5e6',
  Tive: '808000',
  TivedBb: '6b8e23',
  Sange: 'ffa500',
  SangeYd: 'ff4500',
  ScEd: 'da70d6',
  pOegTMnPd: 'eee8aa',
  pOegYF: '98fb98',
  pOeQe: 'afeeee',
  pOeviTetYd: 'db7093',
  papayawEp: 'ffefd5',
  pHKpuff: 'ffdab9',
  peru: 'cd853f',
  pRk: 'ffc0cb',
  plum: 'dda0dd',
  powMrXe: 'b0e0e6',
  purpN: '800080',
  YbeccapurpN: '663399',
  Yd: 'ff0000',
  Psybrown: 'bc8f8f',
  PyOXe: '4169e1',
  saddNbPwn: '8b4513',
  sOmon: 'fa8072',
  sandybPwn: 'f4a460',
  sHgYF: '2e8b57',
  sHshell: 'fff5ee',
  siFna: 'a0522d',
  silver: 'c0c0c0',
  skyXe: '87ceeb',
  UXe: '6a5acd',
  UWay: '708090',
  UgYy: '708090',
  snow: 'fffafa',
  sprRggYF: 'ff7f',
  stAlXe: '4682b4',
  tan: 'd2b48c',
  teO: '8080',
  tEstN: 'd8bfd8',
  tomato: 'ff6347',
  Qe: '40e0d0',
  viTet: 'ee82ee',
  JHt: 'f5deb3',
  wEte: 'ffffff',
  wEtesmoke: 'f5f5f5',
  Lw: 'ffff00',
  LwgYF: '9acd32'
}
function Xc () {
  const s = {}
  const t = Object.keys(_o)
  const e = Object.keys(xo)
  let i
  let n
  let r
  let o
  let a
  for (i = 0; i < t.length; i++) {
    for (o = a = t[i], n = 0; n < e.length; n++) {
      (r = e[n]), (a = a.replace(r, xo[r]))
    }
    (r = parseInt(_o[o], 16)),
    (s[a] = [(r >> 16) & 255, (r >> 8) & 255, r & 255])
  }
  return s
}
let _i
function Kc (s) {
  _i || ((_i = Xc()), (_i.transparent = [0, 0, 0, 0]))
  const t = _i[s.toLowerCase()]
  return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 }
}
const Jc =
    /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/
function Qc (s) {
  const t = Jc.exec(s)
  let e = 255
  let i
  let n
  let r
  if (t) {
    if (t[7] !== i) {
      const o = +t[7]
      e = t[8] ? bs(o) : Kt(o * 255, 0, 255)
    }
    return (
      (i = +t[1]),
      (n = +t[3]),
      (r = +t[5]),
      (i = 255 & (t[2] ? bs(i) : Kt(i, 0, 255))),
      (n = 255 & (t[4] ? bs(n) : Kt(n, 0, 255))),
      (r = 255 & (t[6] ? bs(r) : Kt(r, 0, 255))),
      { r: i, g: n, b: r, a: e }
    )
  }
}
function th (s) {
  return (
    s &&
        (s.a < 255
          ? `rgba(${s.r}, ${s.g}, ${s.b}, ${Vt(s.a)})`
          : `rgb(${s.r}, ${s.g}, ${s.b})`)
  )
}
const kn = (s) =>
  s <= 0.0031308 ? s * 12.92 : Math.pow(s, 1 / 2.4) * 1.055 - 0.055
const Ee = (s) =>
  s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
function eh (s, t, e) {
  const i = Ee(Vt(s.r))
  const n = Ee(Vt(s.g))
  const r = Ee(Vt(s.b))
  return {
    r: Jt(kn(i + e * (Ee(Vt(t.r)) - i))),
    g: Jt(kn(n + e * (Ee(Vt(t.g)) - n))),
    b: Jt(kn(r + e * (Ee(Vt(t.b)) - r))),
    a: s.a + e * (t.a - s.a)
  }
}
function wi (s, t, e) {
  if (s) {
    let i = Hn(s);
    (i[t] = Math.max(0, Math.min(i[t] + i[t] * e, t === 0 ? 360 : 1))),
    (i = $n(i)),
    (s.r = i[0]),
    (s.g = i[1]),
    (s.b = i[2])
  }
}
function $o (s, t) {
  return s && Object.assign(t || {}, s)
}
function wo (s) {
  let t = { r: 0, g: 0, b: 0, a: 255 }
  return (
    Array.isArray(s)
      ? s.length >= 3 &&
              ((t = { r: s[0], g: s[1], b: s[2], a: 255 }),
              s.length > 3 && (t.a = Jt(s[3])))
      : ((t = $o(s, { r: 0, g: 0, b: 0, a: 1 })), (t.a = Jt(t.a))),
    t
  )
}
function sh (s) {
  return s.charAt(0) === 'r' ? Qc(s) : Zc(s)
}
var Fe = class {
  constructor (t) {
    if (t instanceof Fe) return t
    const e = typeof t
    let i
    e === 'object'
      ? (i = wo(t))
      : e === 'string' && (i = Wc(t) || Kc(t) || sh(t)),
    (this._rgb = i),
    (this._valid = !!i)
  }

  get valid () {
    return this._valid
  }

  get rgb () {
    const t = $o(this._rgb)
    return t && (t.a = Vt(t.a)), t
  }

  set rgb (t) {
    this._rgb = wo(t)
  }

  rgbString () {
    return this._valid ? th(this._rgb) : void 0
  }

  hexString () {
    return this._valid ? Vc(this._rgb) : void 0
  }

  hslString () {
    return this._valid ? Gc(this._rgb) : void 0
  }

  mix (t, e) {
    if (t) {
      const i = this.rgb
      const n = t.rgb
      let r
      const o = e === r ? 0.5 : e
      const a = 2 * o - 1
      const l = i.a - n.a
      const c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      (r = 1 - c),
      (i.r = 255 & (c * i.r + r * n.r + 0.5)),
      (i.g = 255 & (c * i.g + r * n.g + 0.5)),
      (i.b = 255 & (c * i.b + r * n.b + 0.5)),
      (i.a = o * i.a + (1 - o) * n.a),
      (this.rgb = i)
    }
    return this
  }

  interpolate (t, e) {
    return t && (this._rgb = eh(this._rgb, t._rgb, e)), this
  }

  clone () {
    return new Fe(this.rgb)
  }

  alpha (t) {
    return (this._rgb.a = Jt(t)), this
  }

  clearer (t) {
    const e = this._rgb
    return (e.a *= 1 - t), this
  }

  greyscale () {
    const t = this._rgb
    const e = Ss(t.r * 0.3 + t.g * 0.59 + t.b * 0.11)
    return (t.r = t.g = t.b = e), this
  }

  opaquer (t) {
    const e = this._rgb
    return (e.a *= 1 + t), this
  }

  negate () {
    const t = this._rgb
    return (t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this
  }

  lighten (t) {
    return wi(this._rgb, 2, t), this
  }

  darken (t) {
    return wi(this._rgb, 2, -t), this
  }

  saturate (t) {
    return wi(this._rgb, 1, t), this
  }

  desaturate (t) {
    return wi(this._rgb, 1, -t), this
  }

  rotate (t) {
    return qc(this._rgb, t), this
  }
}
function jo (s) {
  return new Fe(s)
}
function Uo (s) {
  if (s && typeof s === 'object') {
    const t = s.toString()
    return (
      t === '[object CanvasPattern]' || t === '[object CanvasGradient]'
    )
  }
  return !1
}
function jn (s) {
  return Uo(s) ? s : jo(s)
}
function Mn (s) {
  return Uo(s) ? s : jo(s).saturate(0.5).darken(0.1).hexString()
}
const Qt = Object.create(null)
const Ii = Object.create(null)
function xs (s, t) {
  if (!t) return s
  const e = t.split('.')
  for (let i = 0, n = e.length; i < n; ++i) {
    const r = e[i]
    s = s[r] || (s[r] = Object.create(null))
  }
  return s
}
function Tn (s, t, e) {
  return typeof t === 'string' ? Ie(xs(s, t), e) : Ie(xs(s, ''), t)
}
const Dn = class {
  constructor (t) {
    (this.animation = void 0),
    (this.backgroundColor = 'rgba(0,0,0,0.1)'),
    (this.borderColor = 'rgba(0,0,0,0.1)'),
    (this.color = '#666'),
    (this.datasets = {}),
    (this.devicePixelRatio = (e) =>
      e.chart.platform.getDevicePixelRatio()),
    (this.elements = {}),
    (this.events = [
      'mousemove',
      'mouseout',
      'click',
      'touchstart',
      'touchmove'
    ]),
    (this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: 'normal',
      lineHeight: 1.2,
      weight: null
    }),
    (this.hover = {}),
    (this.hoverBackgroundColor = (e, i) => Mn(i.backgroundColor)),
    (this.hoverBorderColor = (e, i) => Mn(i.borderColor)),
    (this.hoverColor = (e, i) => Mn(i.color)),
    (this.indexAxis = 'x'),
    (this.interaction = {
      mode: 'nearest',
      intersect: !0,
      includeInvisible: !1
    }),
    (this.maintainAspectRatio = !0),
    (this.onHover = null),
    (this.onClick = null),
    (this.parsing = !0),
    (this.plugins = {}),
    (this.responsive = !0),
    (this.scale = void 0),
    (this.scales = {}),
    (this.showLine = !0),
    (this.drawActiveElementsOnTop = !0),
    this.describe(t)
  }

  set (t, e) {
    return Tn(this, t, e)
  }

  get (t) {
    return xs(this, t)
  }

  describe (t, e) {
    return Tn(Ii, t, e)
  }

  override (t, e) {
    return Tn(Qt, t, e)
  }

  route (t, e, i, n) {
    const r = xs(this, t)
    const o = xs(this, i)
    const a = '_' + e
    Object.defineProperties(r, {
      [a]: { value: r[e], writable: !0 },
      [e]: {
        enumerable: !0,
        get () {
          const l = this[a]
          const c = o[n]
          return A(l) ? Object.assign({}, c, l) : C(l, c)
        },
        set (l) {
          this[a] = l
        }
      }
    })
  }
}
const L = new Dn({
  _scriptable: (s) => !s.startsWith('on'),
  _indexable: (s) => s !== 'events',
  hover: { _fallback: 'interaction' },
  interaction: { _scriptable: !1, _indexable: !1 }
})
function ih (s) {
  return !s || N(s.size) || N(s.family)
    ? null
    : (s.style ? s.style + ' ' : '') +
              (s.weight ? s.weight + ' ' : '') +
              s.size +
              'px ' +
              s.family
}
function _s (s, t, e, i, n) {
  let r = t[n]
  return (
    r || ((r = t[n] = s.measureText(n).width), e.push(n)),
    r > i && (i = r),
    i
  )
}
function Yo (s, t, e, i) {
  i = i || {}
  let n = (i.data = i.data || {})
  let r = (i.garbageCollect = i.garbageCollect || [])
  i.font !== t &&
        ((n = i.data = {}), (r = i.garbageCollect = []), (i.font = t)),
  s.save(),
  (s.font = t)
  let o = 0
  const a = e.length
  let l
  let c
  let h
  let u
  let d
  for (l = 0; l < a; l++) {
    if (((u = e[l]), u != null && $(u) !== !0)) o = _s(s, n, r, o, u)
    else if ($(u)) {
      for (c = 0, h = u.length; c < h; c++) {
        (d = u[c]), d != null && !$(d) && (o = _s(s, n, r, o, d))
      }
    }
  }
  s.restore()
  const f = r.length / 2
  if (f > e.length) {
    for (l = 0; l < f; l++) delete n[r[l]]
    r.splice(0, f)
  }
  return o
}
function te (s, t, e) {
  const i = s.currentDevicePixelRatio
  const n = e !== 0 ? Math.max(e / 2, 0.5) : 0
  return Math.round((t - n) * i) / i + n
}
function Un (s, t) {
  (t = t || s.getContext('2d')),
  t.save(),
  t.resetTransform(),
  t.clearRect(0, 0, s.width, s.height),
  t.restore()
}
function Fi (s, t, e, i) {
  Yn(s, t, e, i, null)
}
function Yn (s, t, e, i, n) {
  let r
  let o
  let a
  let l
  let c
  let h
  const u = t.pointStyle
  const d = t.rotation
  const f = t.radius
  let m = (d || 0) * Ac
  if (
    u &&
        typeof u === 'object' &&
        ((r = u.toString()),
        r === '[object HTMLImageElement]' || r === '[object HTMLCanvasElement]')
  ) {
    s.save(),
    s.translate(e, i),
    s.rotate(m),
    s.drawImage(u, -u.width / 2, -u.height / 2, u.width, u.height),
    s.restore()
    return
  }
  if (!(isNaN(f) || f <= 0)) {
    switch ((s.beginPath(), u)) {
      default:
        n ? s.ellipse(e, i, n / 2, f, 0, 0, B) : s.arc(e, i, f, 0, B),
        s.closePath()
        break
      case 'triangle':
        s.moveTo(e + Math.sin(m) * f, i - Math.cos(m) * f),
        (m += go),
        s.lineTo(e + Math.sin(m) * f, i - Math.cos(m) * f),
        (m += go),
        s.lineTo(e + Math.sin(m) * f, i - Math.cos(m) * f),
        s.closePath()
        break
      case 'rectRounded':
        (c = f * 0.516),
        (l = f - c),
        (o = Math.cos(m + ys) * l),
        (a = Math.sin(m + ys) * l),
        s.arc(e - o, i - a, c, m - Y, m - Z),
        s.arc(e + a, i - o, c, m - Z, m),
        s.arc(e + o, i + a, c, m, m + Z),
        s.arc(e - a, i + o, c, m + Z, m + Y),
        s.closePath()
        break
      case 'rect':
        if (!d) {
          (l = Math.SQRT1_2 * f),
          (h = n ? n / 2 : l),
          s.rect(e - h, i - l, 2 * h, 2 * l)
          break
        }
        m += ys
      case 'rectRot':
        (o = Math.cos(m) * f),
        (a = Math.sin(m) * f),
        s.moveTo(e - o, i - a),
        s.lineTo(e + a, i - o),
        s.lineTo(e + o, i + a),
        s.lineTo(e - a, i + o),
        s.closePath()
        break
      case 'crossRot':
        m += ys
      case 'cross':
        (o = Math.cos(m) * f),
        (a = Math.sin(m) * f),
        s.moveTo(e - o, i - a),
        s.lineTo(e + o, i + a),
        s.moveTo(e + a, i - o),
        s.lineTo(e - a, i + o)
        break
      case 'star':
        (o = Math.cos(m) * f),
        (a = Math.sin(m) * f),
        s.moveTo(e - o, i - a),
        s.lineTo(e + o, i + a),
        s.moveTo(e + a, i - o),
        s.lineTo(e - a, i + o),
        (m += ys),
        (o = Math.cos(m) * f),
        (a = Math.sin(m) * f),
        s.moveTo(e - o, i - a),
        s.lineTo(e + o, i + a),
        s.moveTo(e + a, i - o),
        s.lineTo(e - a, i + o)
        break
      case 'line':
        (o = n ? n / 2 : Math.cos(m) * f),
        (a = Math.sin(m) * f),
        s.moveTo(e - o, i - a),
        s.lineTo(e + o, i + a)
        break
      case 'dash':
        s.moveTo(e, i),
        s.lineTo(e + Math.cos(m) * f, i + Math.sin(m) * f)
        break
    }
    s.fill(), t.borderWidth > 0 && s.stroke()
  }
}
function Ae (s, t, e) {
  return (
    (e = e || 0.5),
    !t ||
            (s &&
                s.x > t.left - e &&
                s.x < t.right + e &&
                s.y > t.top - e &&
                s.y < t.bottom + e)
  )
}
function ks (s, t) {
  s.save(),
  s.beginPath(),
  s.rect(t.left, t.top, t.right - t.left, t.bottom - t.top),
  s.clip()
}
function Ms (s) {
  s.restore()
}
function Zo (s, t, e, i, n) {
  if (!t) return s.lineTo(e.x, e.y)
  if (n === 'middle') {
    const r = (t.x + e.x) / 2
    s.lineTo(r, t.y), s.lineTo(r, e.y)
  } else (n === 'after') != !!i ? s.lineTo(t.x, e.y) : s.lineTo(e.x, t.y)
  s.lineTo(e.x, e.y)
}
function qo (s, t, e, i) {
  if (!t) return s.lineTo(e.x, e.y)
  s.bezierCurveTo(
    i ? t.cp1x : t.cp2x,
    i ? t.cp1y : t.cp2y,
    i ? e.cp2x : e.cp1x,
    i ? e.cp2y : e.cp1y,
    e.x,
    e.y
  )
}
function ee (s, t, e, i, n, r = {}) {
  const o = $(t) ? t : [t]
  const a = r.strokeWidth > 0 && r.strokeColor !== ''
  let l
  let c
  for (s.save(), s.font = n.string, nh(s, r), l = 0; l < o.length; ++l) {
    (c = o[l]),
    a &&
                (r.strokeColor && (s.strokeStyle = r.strokeColor),
                N(r.strokeWidth) || (s.lineWidth = r.strokeWidth),
                s.strokeText(c, e, i, r.maxWidth)),
    s.fillText(c, e, i, r.maxWidth),
    rh(s, e, i, c, r),
    (i += n.lineHeight)
  }
  s.restore()
}
function nh (s, t) {
  t.translation && s.translate(t.translation[0], t.translation[1]),
  N(t.rotation) || s.rotate(t.rotation),
  t.color && (s.fillStyle = t.color),
  t.textAlign && (s.textAlign = t.textAlign),
  t.textBaseline && (s.textBaseline = t.textBaseline)
}
function rh (s, t, e, i, n) {
  if (n.strikethrough || n.underline) {
    const r = s.measureText(i)
    const o = t - r.actualBoundingBoxLeft
    const a = t + r.actualBoundingBoxRight
    const l = e - r.actualBoundingBoxAscent
    const c = e + r.actualBoundingBoxDescent
    const h = n.strikethrough ? (l + c) / 2 : c;
    (s.strokeStyle = s.fillStyle),
    s.beginPath(),
    (s.lineWidth = n.decorationWidth || 2),
    s.moveTo(o, h),
    s.lineTo(a, h),
    s.stroke()
  }
}
function We (s, t) {
  const { x: e, y: i, w: n, h: r, radius: o } = t
  s.arc(e + o.topLeft, i + o.topLeft, o.topLeft, -Z, Y, !0),
  s.lineTo(e, i + r - o.bottomLeft),
  s.arc(e + o.bottomLeft, i + r - o.bottomLeft, o.bottomLeft, Y, Z, !0),
  s.lineTo(e + n - o.bottomRight, i + r),
  s.arc(
    e + n - o.bottomRight,
    i + r - o.bottomRight,
    o.bottomRight,
    Z,
    0,
    !0
  ),
  s.lineTo(e + n, i + o.topRight),
  s.arc(e + n - o.topRight, i + o.topRight, o.topRight, 0, -Z, !0),
  s.lineTo(e + o.topLeft, i)
}
const oh = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/)
const ah = new RegExp(
  /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/
)
function lh (s, t) {
  const e = ('' + s).match(oh)
  if (!e || e[1] === 'normal') return t * 1.2
  switch (((s = +e[2]), e[3])) {
    case 'px':
      return s
    case '%':
      s /= 100
      break
  }
  return t * s
}
const ch = (s) => +s || 0
function Ai (s, t) {
  const e = {}
  const i = A(t)
  const n = i ? Object.keys(t) : t
  const r = A(s) ? (i ? (o) => C(s[o], s[t[o]]) : (o) => s[o]) : () => s
  for (const o of n) e[o] = ch(r(o))
  return e
}
function Zn (s) {
  return Ai(s, { top: 'y', right: 'x', bottom: 'y', left: 'x' })
}
function se (s) {
  return Ai(s, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'])
}
function at (s) {
  const t = Zn(s)
  return (t.width = t.left + t.right), (t.height = t.top + t.bottom), t
}
function st (s, t) {
  (s = s || {}), (t = t || L.font)
  let e = C(s.size, t.size)
  typeof e === 'string' && (e = parseInt(e, 10))
  let i = C(s.style, t.style)
  i &&
        !('' + i).match(ah) &&
        (console.warn('Invalid font style specified: "' + i + '"'), (i = ''))
  const n = {
    family: C(s.family, t.family),
    lineHeight: lh(C(s.lineHeight, t.lineHeight), e),
    size: e,
    style: i,
    weight: C(s.weight, t.weight),
    string: ''
  }
  return (n.string = ih(n)), n
}
function ze (s, t, e, i) {
  let n = !0
  let r
  let o
  let a
  for (r = 0, o = s.length; r < o; ++r) {
    if (
      ((a = s[r]),
      a !== void 0 &&
                (t !== void 0 &&
                    typeof a === 'function' &&
                    ((a = a(t)), (n = !1)),
                e !== void 0 && $(a) && ((a = a[e % a.length]), (n = !1)),
                a !== void 0))
    ) {
      return i && !n && (i.cacheable = !1), a
    }
  }
}
function Go (s, t, e) {
  const { min: i, max: n } = s
  const r = En(t, (n - i) / 2)
  const o = (a, l) => (e && a === 0 ? 0 : a + l)
  return { min: o(i, -Math.abs(r)), max: o(n, r) }
}
function $t (s, t) {
  return Object.assign(Object.create(s), t)
}
function Li (s, t = [''], e = s, i, n = () => s[0]) {
  ft(i) || (i = Jo('_fallback', s))
  const r = {
    [Symbol.toStringTag]: 'Object',
    _cacheable: !0,
    _scopes: s,
    _rootScopes: e,
    _fallback: i,
    _getTarget: n,
    override: (o) => Li([o, ...s], t, e, i)
  }
  return new Proxy(r, {
    deleteProperty (o, a) {
      return delete o[a], delete o._keys, delete s[0][a], !0
    },
    get (o, a) {
      return Xo(o, a, () => yh(a, t, s, o))
    },
    getOwnPropertyDescriptor (o, a) {
      return Reflect.getOwnPropertyDescriptor(o._scopes[0], a)
    },
    getPrototypeOf () {
      return Reflect.getPrototypeOf(s[0])
    },
    has (o, a) {
      return ko(o).includes(a)
    },
    ownKeys (o) {
      return ko(o)
    },
    set (o, a, l) {
      const c = o._storage || (o._storage = n())
      return (o[a] = c[a] = l), delete o._keys, !0
    }
  })
}
function ge (s, t, e, i) {
  const n = {
    _cacheable: !1,
    _proxy: s,
    _context: t,
    _subProxy: e,
    _stack: new Set(),
    _descriptors: qn(s, i),
    setContext: (r) => ge(s, r, e, i),
    override: (r) => ge(s.override(r), t, e, i)
  }
  return new Proxy(n, {
    deleteProperty (r, o) {
      return delete r[o], delete s[o], !0
    },
    get (r, o, a) {
      return Xo(r, o, () => uh(r, o, a))
    },
    getOwnPropertyDescriptor (r, o) {
      return r._descriptors.allKeys
        ? Reflect.has(s, o)
          ? { enumerable: !0, configurable: !0 }
          : void 0
        : Reflect.getOwnPropertyDescriptor(s, o)
    },
    getPrototypeOf () {
      return Reflect.getPrototypeOf(s)
    },
    has (r, o) {
      return Reflect.has(s, o)
    },
    ownKeys () {
      return Reflect.ownKeys(s)
    },
    set (r, o, a) {
      return (s[o] = a), delete r[o], !0
    }
  })
}
function qn (s, t = { scriptable: !0, indexable: !0 }) {
  const {
    _scriptable: e = t.scriptable,
    _indexable: i = t.indexable,
    _allKeys: n = t.allKeys
  } = s
  return {
    allKeys: n,
    scriptable: e,
    indexable: i,
    isScriptable: Ht(e) ? e : () => e,
    isIndexable: Ht(i) ? i : () => i
  }
}
const hh = (s, t) => (s ? s + Oi(t) : t)
const Gn = (s, t) =>
  A(t) &&
    s !== 'adapters' &&
    (Object.getPrototypeOf(t) === null || t.constructor === Object)
function Xo (s, t, e) {
  if (Object.prototype.hasOwnProperty.call(s, t)) return s[t]
  const i = e()
  return (s[t] = i), i
}
function uh (s, t, e) {
  const { _proxy: i, _context: n, _subProxy: r, _descriptors: o } = s
  let a = i[t]
  return (
    Ht(a) && o.isScriptable(t) && (a = dh(t, a, s, e)),
    $(a) && a.length && (a = fh(t, a, s, o.isIndexable)),
    Gn(t, a) && (a = ge(a, n, r && r[t], o)),
    a
  )
}
function dh (s, t, e, i) {
  const { _proxy: n, _context: r, _subProxy: o, _stack: a } = e
  if (a.has(s)) {
    throw new Error(
      'Recursion detected: ' + Array.from(a).join('->') + '->' + s
    )
  }
  return (
    a.add(s),
    (t = t(r, o || i)),
    a.delete(s),
    Gn(s, t) && (t = Xn(n._scopes, n, s, t)),
    t
  )
}
function fh (s, t, e, i) {
  const { _proxy: n, _context: r, _subProxy: o, _descriptors: a } = e
  if (ft(r.index) && i(s)) t = t[r.index % t.length]
  else if (A(t[0])) {
    const l = t
    const c = n._scopes.filter((h) => h !== l)
    t = []
    for (const h of l) {
      const u = Xn(c, n, s, h)
      t.push(ge(u, r, o && o[s], a))
    }
  }
  return t
}
function Ko (s, t, e) {
  return Ht(s) ? s(t, e) : s
}
const mh = (s, t) => (s === !0 ? t : typeof s === 'string' ? Bt(t, s) : void 0)
function gh (s, t, e, i, n) {
  for (const r of t) {
    const o = mh(e, r)
    if (o) {
      s.add(o)
      const a = Ko(o._fallback, e, n)
      if (ft(a) && a !== e && a !== i) return a
    } else if (o === !1 && ft(i) && e !== i) return null
  }
  return !1
}
function Xn (s, t, e, i) {
  const n = t._rootScopes
  const r = Ko(t._fallback, e, i)
  const o = [...s, ...n]
  const a = new Set()
  a.add(i)
  let l = So(a, o, e, r || e, i)
  return l === null ||
        (ft(r) && r !== e && ((l = So(a, o, r, l, i)), l === null))
    ? !1
    : Li(Array.from(a), [''], n, r, () => ph(t, e, i))
}
function So (s, t, e, i, n) {
  for (; e;) e = gh(s, t, e, i, n)
  return e
}
function ph (s, t, e) {
  const i = s._getTarget()
  t in i || (i[t] = {})
  const n = i[t]
  return $(n) && A(e) ? e : n
}
function yh (s, t, e, i) {
  let n
  for (const r of t) {
    if (((n = Jo(hh(r, s), e)), ft(n))) {
      return Gn(s, n) ? Xn(e, i, s, n) : n
    }
  }
}
function Jo (s, t) {
  for (const e of t) {
    if (!e) continue
    const i = e[s]
    if (ft(i)) return i
  }
}
function ko (s) {
  let t = s._keys
  return t || (t = s._keys = bh(s._scopes)), t
}
function bh (s) {
  const t = new Set()
  for (const e of s) {
    for (const i of Object.keys(e).filter((n) => !n.startsWith('_'))) {
      t.add(i)
    }
  }
  return Array.from(t)
}
function Kn (s, t, e, i) {
  const { iScale: n } = s
  const { key: r = 'r' } = this._parsing
  const o = new Array(i)
  let a
  let l
  let c
  let h
  for (a = 0, l = i; a < l; ++a) {
    (c = a + e), (h = t[c]), (o[a] = { r: n.parse(Bt(h, r), c) })
  }
  return o
}
const xh = Number.EPSILON || 1e-14
const Le = (s, t) => t < s.length && !s[t].skip && s[t]
const Qo = (s) => (s === 'x' ? 'y' : 'x')
function _h (s, t, e, i) {
  const n = s.skip ? t : s
  const r = t
  const o = e.skip ? t : e
  const a = Ti(r, n)
  const l = Ti(o, r)
  let c = a / (a + l)
  let h = l / (a + l);
  (c = isNaN(c) ? 0 : c), (h = isNaN(h) ? 0 : h)
  const u = i * c
  const d = i * h
  return {
    previous: { x: r.x - u * (o.x - n.x), y: r.y - u * (o.y - n.y) },
    next: { x: r.x + d * (o.x - n.x), y: r.y + d * (o.y - n.y) }
  }
}
function wh (s, t, e) {
  const i = s.length
  let n
  let r
  let o
  let a
  let l
  let c = Le(s, 0)
  for (let h = 0; h < i - 1; ++h) {
    if (((l = c), (c = Le(s, h + 1)), !(!l || !c))) {
      if (Re(t[h], 0, xh)) {
        e[h] = e[h + 1] = 0
        continue
      }
      (n = e[h] / t[h]),
      (r = e[h + 1] / t[h]),
      (a = Math.pow(n, 2) + Math.pow(r, 2)),
      !(a <= 9) &&
                    ((o = 3 / Math.sqrt(a)),
                    (e[h] = n * o * t[h]),
                    (e[h + 1] = r * o * t[h]))
    }
  }
}
function Sh (s, t, e = 'x') {
  const i = Qo(e)
  const n = s.length
  let r
  let o
  let a
  let l = Le(s, 0)
  for (let c = 0; c < n; ++c) {
    if (((o = a), (a = l), (l = Le(s, c + 1)), !a)) continue
    const h = a[e]
    const u = a[i]
    o &&
            ((r = (h - o[e]) / 3),
            (a[`cp1${e}`] = h - r),
            (a[`cp1${i}`] = u - r * t[c])),
    l &&
                ((r = (l[e] - h) / 3),
                (a[`cp2${e}`] = h + r),
                (a[`cp2${i}`] = u + r * t[c]))
  }
}
function kh (s, t = 'x') {
  const e = Qo(t)
  const i = s.length
  const n = Array(i).fill(0)
  const r = Array(i)
  let o
  let a
  let l
  let c = Le(s, 0)
  for (o = 0; o < i; ++o) {
    if (((a = l), (l = c), (c = Le(s, o + 1)), !!l)) {
      if (c) {
        const h = c[t] - l[t]
        n[o] = h !== 0 ? (c[e] - l[e]) / h : 0
      }
      r[o] = a
        ? c
          ? Tt(n[o - 1]) !== Tt(n[o])
            ? 0
            : (n[o - 1] + n[o]) / 2
          : n[o - 1]
        : n[o]
    }
  }
  wh(s, n, r), Sh(s, r, t)
}
function Si (s, t, e) {
  return Math.max(Math.min(s, e), t)
}
function Mh (s, t) {
  let e
  let i
  let n
  let r
  let o
  let a = Ae(s[0], t)
  for (e = 0, i = s.length; e < i; ++e) {
    (o = r),
    (r = a),
    (a = e < i - 1 && Ae(s[e + 1], t)),
    r &&
                ((n = s[e]),
                o &&
                    ((n.cp1x = Si(n.cp1x, t.left, t.right)),
                    (n.cp1y = Si(n.cp1y, t.top, t.bottom))),
                a &&
                    ((n.cp2x = Si(n.cp2x, t.left, t.right)),
                    (n.cp2y = Si(n.cp2y, t.top, t.bottom))))
  }
}
function ta (s, t, e, i, n) {
  let r, o, a, l
  if (
    (t.spanGaps && (s = s.filter((c) => !c.skip)),
    t.cubicInterpolationMode === 'monotone')
  ) {
    kh(s, n)
  } else {
    let c = i ? s[s.length - 1] : s[0]
    for (r = 0, o = s.length; r < o; ++r) {
      (a = s[r]),
      (l = _h(
        c,
        a,
        s[Math.min(r + 1, o - (i ? 0 : 1)) % o],
        t.tension
      )),
      (a.cp1x = l.previous.x),
      (a.cp1y = l.previous.y),
      (a.cp2x = l.next.x),
      (a.cp2y = l.next.y),
      (c = a)
    }
  }
  t.capBezierPoints && Mh(s, e)
}
function Jn () {
  return typeof window < 'u' && typeof document < 'u'
}
function Pi (s) {
  let t = s.parentNode
  return t && t.toString() === '[object ShadowRoot]' && (t = t.host), t
}
function vi (s, t, e) {
  let i
  return (
    typeof s === 'string'
      ? ((i = parseInt(s, 10)),
        s.indexOf('%') !== -1 && (i = (i / 100) * t.parentNode[e]))
      : (i = s),
    i
  )
}
const Ri = (s) => window.getComputedStyle(s, null)
function Th (s, t) {
  return Ri(s).getPropertyValue(t)
}
const vh = ['top', 'right', 'bottom', 'left']
function me (s, t, e) {
  const i = {}
  e = e ? '-' + e : ''
  for (let n = 0; n < 4; n++) {
    const r = vh[n]
    i[r] = parseFloat(s[t + '-' + r + e]) || 0
  }
  return (i.width = i.left + i.right), (i.height = i.top + i.bottom), i
}
const Oh = (s, t, e) => (s > 0 || t > 0) && (!e || !e.shadowRoot)
function Dh (s, t) {
  const e = s.touches
  const i = e && e.length ? e[0] : s
  const { offsetX: n, offsetY: r } = i
  let o = !1
  let a
  let l
  if (Oh(n, r, s.target)) (a = n), (l = r)
  else {
    const c = t.getBoundingClientRect();
    (a = i.clientX - c.left), (l = i.clientY - c.top), (o = !0)
  }
  return { x: a, y: l, box: o }
}
function ie (s, t) {
  if ('native' in s) return s
  const { canvas: e, currentDevicePixelRatio: i } = t
  const n = Ri(e)
  const r = n.boxSizing === 'border-box'
  const o = me(n, 'padding')
  const a = me(n, 'border', 'width')
  const { x: l, y: c, box: h } = Dh(s, e)
  const u = o.left + (h && a.left)
  const d = o.top + (h && a.top)
  let { width: f, height: m } = t
  return (
    r && ((f -= o.width + a.width), (m -= o.height + a.height)),
    {
      x: Math.round((((l - u) / f) * e.width) / i),
      y: Math.round((((c - d) / m) * e.height) / i)
    }
  )
}
function Eh (s, t, e) {
  let i, n
  if (t === void 0 || e === void 0) {
    const r = Pi(s)
    if (!r) (t = s.clientWidth), (e = s.clientHeight)
    else {
      const o = r.getBoundingClientRect()
      const a = Ri(r)
      const l = me(a, 'border', 'width')
      const c = me(a, 'padding');
      (t = o.width - c.width - l.width),
      (e = o.height - c.height - l.height),
      (i = vi(a.maxWidth, r, 'clientWidth')),
      (n = vi(a.maxHeight, r, 'clientHeight'))
    }
  }
  return { width: t, height: e, maxWidth: i || Mi, maxHeight: n || Mi }
}
const vn = (s) => Math.round(s * 10) / 10
function ea (s, t, e, i) {
  const n = Ri(s)
  const r = me(n, 'margin')
  const o = vi(n.maxWidth, s, 'clientWidth') || Mi
  const a = vi(n.maxHeight, s, 'clientHeight') || Mi
  const l = Eh(s, t, e)
  let { width: c, height: h } = l
  if (n.boxSizing === 'content-box') {
    const u = me(n, 'border', 'width')
    const d = me(n, 'padding');
    (c -= d.width + u.width), (h -= d.height + u.height)
  }
  return (
    (c = Math.max(0, c - r.width)),
    (h = Math.max(0, i ? Math.floor(c / i) : h - r.height)),
    (c = vn(Math.min(c, o, l.maxWidth))),
    (h = vn(Math.min(h, a, l.maxHeight))),
    c && !h && (h = vn(c / 2)),
    { width: c, height: h }
  )
}
function Qn (s, t, e) {
  const i = t || 1
  const n = Math.floor(s.height * i)
  const r = Math.floor(s.width * i);
  (s.height = n / i), (s.width = r / i)
  const o = s.canvas
  return (
    o.style &&
            (e || (!o.style.height && !o.style.width)) &&
            ((o.style.height = `${s.height}px`),
            (o.style.width = `${s.width}px`)),
    s.currentDevicePixelRatio !== i || o.height !== n || o.width !== r
      ? ((s.currentDevicePixelRatio = i),
        (o.height = n),
        (o.width = r),
        s.ctx.setTransform(i, 0, 0, i, 0, 0),
        !0)
      : !1
  )
}
const sa = (function () {
  let s = !1
  try {
    const t = {
      get passive () {
        return (s = !0), !1
      }
    }
    window.addEventListener('test', null, t),
    window.removeEventListener('test', null, t)
  } catch {}
  return s
})()
function tr (s, t) {
  const e = Th(s, t)
  const i = e && e.match(/^(\d+)(\.\d+)?px$/)
  return i ? +i[1] : void 0
}
function Xt (s, t, e, i) {
  return { x: s.x + e * (t.x - s.x), y: s.y + e * (t.y - s.y) }
}
function ia (s, t, e, i) {
  return {
    x: s.x + e * (t.x - s.x),
    y:
            i === 'middle'
              ? e < 0.5
                ? s.y
                : t.y
              : i === 'after'
                ? e < 1
                  ? s.y
                  : t.y
                : e > 0
                  ? t.y
                  : s.y
  }
}
function na (s, t, e, i) {
  const n = { x: s.cp2x, y: s.cp2y }
  const r = { x: t.cp1x, y: t.cp1y }
  const o = Xt(s, n, e)
  const a = Xt(n, r, e)
  const l = Xt(r, t, e)
  const c = Xt(o, a, e)
  const h = Xt(a, l, e)
  return Xt(c, h, e)
}
const Mo = new Map()
function Ch (s, t) {
  t = t || {}
  const e = s + JSON.stringify(t)
  let i = Mo.get(e)
  return i || ((i = new Intl.NumberFormat(s, t)), Mo.set(e, i)), i
}
function Ve (s, t, e) {
  return Ch(t, e).format(s)
}
const Ih = function (s, t) {
  return {
    x (e) {
      return s + s + t - e
    },
    setWidth (e) {
      t = e
    },
    textAlign (e) {
      return e === 'center' ? e : e === 'right' ? 'left' : 'right'
    },
    xPlus (e, i) {
      return e - i
    },
    leftForLtr (e, i) {
      return e - i
    }
  }
}
const Fh = function () {
  return {
    x (s) {
      return s
    },
    setWidth (s) {},
    textAlign (s) {
      return s
    },
    xPlus (s, t) {
      return s + t
    },
    leftForLtr (s, t) {
      return s
    }
  }
}
function ye (s, t, e) {
  return s ? Ih(t, e) : Fh()
}
function er (s, t) {
  let e, i;
  (t === 'ltr' || t === 'rtl') &&
        ((e = s.canvas.style),
        (i = [
          e.getPropertyValue('direction'),
          e.getPropertyPriority('direction')
        ]),
        e.setProperty('direction', t, 'important'),
        (s.prevTextDirection = i))
}
function sr (s, t) {
  t !== void 0 &&
        (delete s.prevTextDirection,
        s.canvas.style.setProperty('direction', t[0], t[1]))
}
function ra (s) {
  return s === 'angle'
    ? { between: Ne, compare: Lc, normalize: ht }
    : { between: Lt, compare: (t, e) => t - e, normalize: (t) => t }
}
function To ({ start: s, end: t, count: e, loop: i, style: n }) {
  return {
    start: s % e,
    end: t % e,
    loop: i && (t - s + 1) % e === 0,
    style: n
  }
}
function Ah (s, t, e) {
  const { property: i, start: n, end: r } = e
  const { between: o, normalize: a } = ra(i)
  const l = t.length
  let { start: c, end: h, loop: u } = s
  let d
  let f
  if (u) {
    for (
      c += l, h += l, d = 0, f = l;
      d < f && o(a(t[c % l][i]), n, r);
      ++d
    ) {
      c--, h--
    }
    (c %= l), (h %= l)
  }
  return h < c && (h += l), { start: c, end: h, loop: u, style: s.style }
}
function ir (s, t, e) {
  if (!e) return [s]
  const { property: i, start: n, end: r } = e
  const o = t.length
  const { compare: a, between: l, normalize: c } = ra(i)
  const { start: h, end: u, loop: d, style: f } = Ah(s, t, e)
  const m = []
  let g = !1
  let p = null
  let y
  let b
  let _
  const w = () => l(n, _, y) && a(n, _) !== 0
  const x = () => a(r, y) === 0 || l(r, _, y)
  const S = () => g || w()
  const k = () => !g || x()
  for (let O = h, v = h; O <= u; ++O) {
    (b = t[O % o]),
    !b.skip &&
                ((y = c(b[i])),
                y !== _ &&
                    ((g = l(y, n, r)),
                    p === null && S() && (p = a(y, n) === 0 ? O : v),
                    p !== null &&
                        k() &&
                        (m.push(
                          To({
                            start: p,
                            end: O,
                            loop: d,
                            count: o,
                            style: f
                          })
                        ),
                        (p = null)),
                    (v = O),
                    (_ = y)))
  }
  return (
    p !== null &&
            m.push(To({ start: p, end: u, loop: d, count: o, style: f })),
    m
  )
}
function nr (s, t) {
  const e = []
  const i = s.segments
  for (let n = 0; n < i.length; n++) {
    const r = ir(i[n], s.points, t)
    r.length && e.push(...r)
  }
  return e
}
function Lh (s, t, e, i) {
  let n = 0
  let r = t - 1
  if (e && !i) for (; n < t && !s[n].skip;) n++
  for (; n < t && s[n].skip;) n++
  for (n %= t, e && (r += n); r > n && s[r % t].skip;) r--
  return (r %= t), { start: n, end: r }
}
function Ph (s, t, e, i) {
  const n = s.length
  const r = []
  let o = t
  let a = s[t]
  let l
  for (l = t + 1; l <= e; ++l) {
    const c = s[l % n]
    c.skip || c.stop
      ? a.skip ||
              ((i = !1),
              r.push({ start: t % n, end: (l - 1) % n, loop: i }),
              (t = o = c.stop ? l : null))
      : ((o = l), a.skip && (t = l)),
    (a = c)
  }
  return o !== null && r.push({ start: t % n, end: o % n, loop: i }), r
}
function oa (s, t) {
  const e = s.points
  const i = s.options.spanGaps
  const n = e.length
  if (!n) return []
  const r = !!s._loop
  const { start: o, end: a } = Lh(e, n, r, i)
  if (i === !0) return vo(s, [{ start: o, end: a, loop: r }], e, t)
  const l = a < o ? a + n : a
  const c = !!s._fullLoop && o === 0 && a === n - 1
  return vo(s, Ph(e, o, l, c), e, t)
}
function vo (s, t, e, i) {
  return !i || !i.setContext || !e ? t : Rh(s, t, e, i)
}
function Rh (s, t, e, i) {
  const n = s._chart.getContext()
  const r = Oo(s.options)
  const {
    _datasetIndex: o,
    options: { spanGaps: a }
  } = s
  const l = e.length
  const c = []
  let h = r
  let u = t[0].start
  let d = u
  function f (m, g, p, y) {
    const b = a ? -1 : 1
    if (m !== g) {
      for (m += l; e[m % l].skip;) m -= b
      for (; e[g % l].skip;) g += b
      m % l !== g % l &&
                (c.push({ start: m % l, end: g % l, loop: p, style: y }),
                (h = y),
                (u = g % l))
    }
  }
  for (const m of t) {
    u = a ? u : m.start
    let g = e[u % l]
    let p
    for (d = u + 1; d <= m.end; d++) {
      const y = e[d % l];
      (p = Oo(
        i.setContext(
          $t(n, {
            type: 'segment',
            p0: g,
            p1: y,
            p0DataIndex: (d - 1) % l,
            p1DataIndex: d % l,
            datasetIndex: o
          })
        )
      )),
      Nh(p, h) && f(u, d - 1, m.loop, h),
      (g = y),
      (h = p)
    }
    u < d - 1 && f(u, d - 1, m.loop, h)
  }
  return c
}
function Oo (s) {
  return {
    backgroundColor: s.backgroundColor,
    borderCapStyle: s.borderCapStyle,
    borderDash: s.borderDash,
    borderDashOffset: s.borderDashOffset,
    borderJoinStyle: s.borderJoinStyle,
    borderWidth: s.borderWidth,
    borderColor: s.borderColor
  }
}
function Nh (s, t) {
  return t && JSON.stringify(s) !== JSON.stringify(t)
}
const mr = class {
  constructor () {
    (this._request = null),
    (this._charts = new Map()),
    (this._running = !1),
    (this._lastDate = void 0)
  }

  _notify (t, e, i, n) {
    const r = e.listeners[n]
    const o = e.duration
    r.forEach((a) =>
      a({
        chart: t,
        initial: e.initial,
        numSteps: o,
        currentStep: Math.min(i - e.start, o)
      })
    )
  }

  _refresh () {
    this._request ||
            ((this._running = !0),
            (this._request = Nn.call(window, () => {
              this._update(),
              (this._request = null),
              this._running && this._refresh()
            })))
  }

  _update (t = Date.now()) {
    let e = 0
    this._charts.forEach((i, n) => {
      if (!i.running || !i.items.length) return
      const r = i.items
      let o = r.length - 1
      let a = !1
      let l
      for (; o >= 0; --o) {
        (l = r[o]),
        l._active
          ? (l._total > i.duration && (i.duration = l._total),
            l.tick(t),
            (a = !0))
          : ((r[o] = r[r.length - 1]), r.pop())
      }
      a && (n.draw(), this._notify(n, i, t, 'progress')),
      r.length ||
                    ((i.running = !1),
                    this._notify(n, i, t, 'complete'),
                    (i.initial = !1)),
      (e += r.length)
    }),
    (this._lastDate = t),
    e === 0 && (this._running = !1)
  }

  _getAnims (t) {
    const e = this._charts
    let i = e.get(t)
    return (
      i ||
                ((i = {
                  running: !1,
                  initial: !0,
                  items: [],
                  listeners: { complete: [], progress: [] }
                }),
                e.set(t, i)),
      i
    )
  }

  listen (t, e, i) {
    this._getAnims(t).listeners[e].push(i)
  }

  add (t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e)
  }

  has (t) {
    return this._getAnims(t).items.length > 0
  }

  start (t) {
    const e = this._charts.get(t)
    e &&
            ((e.running = !0),
            (e.start = Date.now()),
            (e.duration = e.items.reduce(
              (i, n) => Math.max(i, n._duration),
              0
            )),
            this._refresh())
  }

  running (t) {
    if (!this._running) return !1
    const e = this._charts.get(t)
    return !(!e || !e.running || !e.items.length)
  }

  stop (t) {
    const e = this._charts.get(t)
    if (!e || !e.items.length) return
    const i = e.items
    let n = i.length - 1
    for (; n >= 0; --n) i[n].cancel();
    (e.items = []), this._notify(t, e, Date.now(), 'complete')
  }

  remove (t) {
    return this._charts.delete(t)
  }
}
const jt = new mr()
const aa = 'transparent'
const Wh = {
  boolean (s, t, e) {
    return e > 0.5 ? t : s
  },
  color (s, t, e) {
    const i = jn(s || aa)
    const n = i.valid && jn(t || aa)
    return n && n.valid ? n.mix(i, e).hexString() : t
  },
  number (s, t, e) {
    return s + (t - s) * e
  }
}
const gr = class {
  constructor (t, e, i, n) {
    const r = e[i]
    n = ze([t.to, n, r, t.from])
    const o = ze([t.from, r, n]);
    (this._active = !0),
    (this._fn = t.fn || Wh[t.type || typeof o]),
    (this._easing = Ce[t.easing] || Ce.linear),
    (this._start = Math.floor(Date.now() + (t.delay || 0))),
    (this._duration = this._total = Math.floor(t.duration)),
    (this._loop = !!t.loop),
    (this._target = e),
    (this._prop = i),
    (this._from = o),
    (this._to = n),
    (this._promises = void 0)
  }

  active () {
    return this._active
  }

  update (t, e, i) {
    if (this._active) {
      this._notify(!1)
      const n = this._target[this._prop]
      const r = i - this._start
      const o = this._duration - r;
      (this._start = i),
      (this._duration = Math.floor(Math.max(o, t.duration))),
      (this._total += r),
      (this._loop = !!t.loop),
      (this._to = ze([t.to, e, n, t.from])),
      (this._from = ze([t.from, n, e]))
    }
  }

  cancel () {
    this._active &&
            (this.tick(Date.now()), (this._active = !1), this._notify(!1))
  }

  tick (t) {
    const e = t - this._start
    const i = this._duration
    const n = this._prop
    const r = this._from
    const o = this._loop
    const a = this._to
    let l
    if (((this._active = r !== a && (o || e < i)), !this._active)) {
      (this._target[n] = a), this._notify(!0)
      return
    }
    if (e < 0) {
      this._target[n] = r
      return
    }
    (l = (e / i) % 2),
    (l = o && l > 1 ? 2 - l : l),
    (l = this._easing(Math.min(1, Math.max(0, l)))),
    (this._target[n] = this._fn(r, a, l))
  }

  wait () {
    const t = this._promises || (this._promises = [])
    return new Promise((e, i) => {
      t.push({ res: e, rej: i })
    })
  }

  _notify (t) {
    const e = t ? 'res' : 'rej'
    const i = this._promises || []
    for (let n = 0; n < i.length; n++) i[n][e]()
  }
}
const zh = ['x', 'y', 'borderWidth', 'radius', 'tension']
const Vh = ['color', 'borderColor', 'backgroundColor']
L.set('animation', {
  delay: void 0,
  duration: 1e3,
  easing: 'easeOutQuart',
  fn: void 0,
  from: void 0,
  loop: void 0,
  to: void 0,
  type: void 0
})
const Hh = Object.keys(L.animation)
L.describe('animation', {
  _fallback: !1,
  _indexable: !1,
  _scriptable: (s) => s !== 'onProgress' && s !== 'onComplete' && s !== 'fn'
})
L.set('animations', {
  colors: { type: 'color', properties: Vh },
  numbers: { type: 'number', properties: zh }
})
L.describe('animations', { _fallback: 'animation' })
L.set('transitions', {
  active: { animation: { duration: 400 } },
  resize: { animation: { duration: 0 } },
  show: {
    animations: {
      colors: { from: 'transparent' },
      visible: { type: 'boolean', duration: 0 }
    }
  },
  hide: {
    animations: {
      colors: { to: 'transparent' },
      visible: { type: 'boolean', easing: 'linear', fn: (s) => s | 0 }
    }
  }
})
const ji = class {
  constructor (t, e) {
    (this._chart = t), (this._properties = new Map()), this.configure(e)
  }

  configure (t) {
    if (!A(t)) return
    const e = this._properties
    Object.getOwnPropertyNames(t).forEach((i) => {
      const n = t[i]
      if (!A(n)) return
      const r = {}
      for (const o of Hh) r[o] = n[o];
      (($(n.properties) && n.properties) || [i]).forEach((o) => {
        (o === i || !e.has(o)) && e.set(o, r)
      })
    })
  }

  _animateOptions (t, e) {
    const i = e.options
    const n = $h(t, i)
    if (!n) return []
    const r = this._createAnimations(n, i)
    return (
      i.$shared &&
                Bh(t.options.$animations, i).then(
                  () => {
                    t.options = i
                  },
                  () => {}
                ),
      r
    )
  }

  _createAnimations (t, e) {
    const i = this._properties
    const n = []
    const r = t.$animations || (t.$animations = {})
    const o = Object.keys(e)
    const a = Date.now()
    let l
    for (l = o.length - 1; l >= 0; --l) {
      const c = o[l]
      if (c.charAt(0) === '$') continue
      if (c === 'options') {
        n.push(...this._animateOptions(t, e))
        continue
      }
      const h = e[c]
      let u = r[c]
      const d = i.get(c)
      if (u) {
        if (d && u.active()) {
          u.update(d, h, a)
          continue
        } else u.cancel()
      }
      if (!d || !d.duration) {
        t[c] = h
        continue
      }
      (r[c] = u = new gr(d, t, c, h)), n.push(u)
    }
    return n
  }

  update (t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e)
      return
    }
    const i = this._createAnimations(t, e)
    if (i.length) return jt.add(this._chart, i), !0
  }
}
function Bh (s, t) {
  const e = []
  const i = Object.keys(t)
  for (let n = 0; n < i.length; n++) {
    const r = s[i[n]]
    r && r.active() && e.push(r.wait())
  }
  return Promise.all(e)
}
function $h (s, t) {
  if (!t) return
  let e = s.options
  if (!e) {
    s.options = t
    return
  }
  return (
    e.$shared &&
            (s.options = e =
                Object.assign({}, e, { $shared: !1, $animations: {} })),
    e
  )
}
function la (s, t) {
  const e = (s && s.options) || {}
  const i = e.reverse
  const n = e.min === void 0 ? t : 0
  const r = e.max === void 0 ? t : 0
  return { start: i ? r : n, end: i ? n : r }
}
function jh (s, t, e) {
  if (e === !1) return !1
  const i = la(s, e)
  const n = la(t, e)
  return { top: n.end, right: i.end, bottom: n.start, left: i.start }
}
function Uh (s) {
  let t, e, i, n
  return (
    A(s)
      ? ((t = s.top), (e = s.right), (i = s.bottom), (n = s.left))
      : (t = e = i = n = s),
    { top: t, right: e, bottom: i, left: n, disabled: s === !1 }
  )
}
function Ja (s, t) {
  const e = []
  const i = s._getSortedDatasetMetas(t)
  let n
  let r
  for (n = 0, r = i.length; n < r; ++n) e.push(i[n].index)
  return e
}
function ca (s, t, e, i = {}) {
  const n = s.keys
  const r = i.mode === 'single'
  let o
  let a
  let l
  let c
  if (t !== null) {
    for (o = 0, a = n.length; o < a; ++o) {
      if (((l = +n[o]), l === e)) {
        if (i.all) continue
        break
      }
      (c = s.values[l]),
      K(c) && (r || t === 0 || Tt(t) === Tt(c)) && (t += c)
    }
    return t
  }
}
function Yh (s) {
  const t = Object.keys(s)
  const e = new Array(t.length)
  let i
  let n
  let r
  for (i = 0, n = t.length; i < n; ++i) {
    (r = t[i]), (e[i] = { x: r, y: s[r] })
  }
  return e
}
function ha (s, t) {
  const e = s && s.options.stacked
  return e || (e === void 0 && t.stack !== void 0)
}
function Zh (s, t, e) {
  return `${s.id}.${t.id}.${e.stack || e.type}`
}
function qh (s) {
  const { min: t, max: e, minDefined: i, maxDefined: n } = s.getUserBounds()
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY
  }
}
function Gh (s, t, e) {
  const i = s[t] || (s[t] = {})
  return i[e] || (i[e] = {})
}
function ua (s, t, e, i) {
  for (const n of t.getMatchingVisibleMetas(i).reverse()) {
    const r = s[n.index]
    if ((e && r > 0) || (!e && r < 0)) return n.index
  }
  return null
}
function da (s, t) {
  const { chart: e, _cachedMeta: i } = s
  const n = e._stacks || (e._stacks = {})
  const { iScale: r, vScale: o, index: a } = i
  const l = r.axis
  const c = o.axis
  const h = Zh(r, o, i)
  const u = t.length
  let d
  for (let f = 0; f < u; ++f) {
    const m = t[f]
    const { [l]: g, [c]: p } = m
    const y = m._stacks || (m._stacks = {});
    (d = y[c] = Gh(n, h, g)),
    (d[a] = p),
    (d._top = ua(d, o, !0, i.type)),
    (d._bottom = ua(d, o, !1, i.type))
  }
}
function rr (s, t) {
  const e = s.scales
  return Object.keys(e)
    .filter((i) => e[i].axis === t)
    .shift()
}
function Xh (s, t) {
  return $t(s, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: 'default',
    type: 'dataset'
  })
}
function Kh (s, t, e) {
  return $t(s, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: 'default',
    type: 'data'
  })
}
function Ts (s, t) {
  const e = s.controller.index
  const i = s.vScale && s.vScale.axis
  if (i) {
    t = t || s._parsed
    for (const n of t) {
      const r = n._stacks
      if (!r || r[i] === void 0 || r[i][e] === void 0) return
      delete r[i][e]
    }
  }
}
const or = (s) => s === 'reset' || s === 'none'
const fa = (s, t) => (t ? s : Object.assign({}, s))
const Jh = (s, t, e) =>
  s && !t.hidden && t._stacked && { keys: Ja(e, !0), values: null }
const pt = class {
  constructor (t, e) {
    (this.chart = t),
    (this._ctx = t.ctx),
    (this.index = e),
    (this._cachedDataOpts = {}),
    (this._cachedMeta = this.getMeta()),
    (this._type = this._cachedMeta.type),
    (this.options = void 0),
    (this._parsing = !1),
    (this._data = void 0),
    (this._objectData = void 0),
    (this._sharedOptions = void 0),
    (this._drawStart = void 0),
    (this._drawCount = void 0),
    (this.enableOptionSharing = !1),
    (this.supportsDecimation = !1),
    (this.$context = void 0),
    (this._syncList = []),
    this.initialize()
  }

  initialize () {
    const t = this._cachedMeta
    this.configure(),
    this.linkScales(),
    (t._stacked = ha(t.vScale, t)),
    this.addElements()
  }

  updateIndex (t) {
    this.index !== t && Ts(this._cachedMeta), (this.index = t)
  }

  linkScales () {
    const t = this.chart
    const e = this._cachedMeta
    const i = this.getDataset()
    const n = (u, d, f, m) => (u === 'x' ? d : u === 'r' ? m : f)
    const r = (e.xAxisID = C(i.xAxisID, rr(t, 'x')))
    const o = (e.yAxisID = C(i.yAxisID, rr(t, 'y')))
    const a = (e.rAxisID = C(i.rAxisID, rr(t, 'r')))
    const l = e.indexAxis
    const c = (e.iAxisID = n(l, r, o, a))
    const h = (e.vAxisID = n(l, o, r, a));
    (e.xScale = this.getScaleForId(r)),
    (e.yScale = this.getScaleForId(o)),
    (e.rScale = this.getScaleForId(a)),
    (e.iScale = this.getScaleForId(c)),
    (e.vScale = this.getScaleForId(h))
  }

  getDataset () {
    return this.chart.data.datasets[this.index]
  }

  getMeta () {
    return this.chart.getDatasetMeta(this.index)
  }

  getScaleForId (t) {
    return this.chart.scales[t]
  }

  _getOtherScale (t) {
    const e = this._cachedMeta
    return t === e.iScale ? e.vScale : e.iScale
  }

  reset () {
    this._update('reset')
  }

  _destroy () {
    const t = this._cachedMeta
    this._data && Pn(this._data, this), t._stacked && Ts(t)
  }

  _dataCheck () {
    const t = this.getDataset()
    const e = t.data || (t.data = [])
    const i = this._data
    if (A(e)) this._data = Yh(e)
    else if (i !== e) {
      if (i) {
        Pn(i, this)
        const n = this._cachedMeta
        Ts(n), (n._parsed = [])
      }
      e && Object.isExtensible(e) && Wo(e, this),
      (this._syncList = []),
      (this._data = e)
    }
  }

  addElements () {
    const t = this._cachedMeta
    this._dataCheck(),
    this.datasetElementType &&
                (t.dataset = new this.datasetElementType())
  }

  buildOrUpdateElements (t) {
    const e = this._cachedMeta
    const i = this.getDataset()
    let n = !1
    this._dataCheck()
    const r = e._stacked;
    (e._stacked = ha(e.vScale, e)),
    e.stack !== i.stack && ((n = !0), Ts(e), (e.stack = i.stack)),
    this._resyncElements(t),
    (n || r !== e._stacked) && da(this, e._parsed)
  }

  configure () {
    const t = this.chart.config
    const e = t.datasetScopeKeys(this._type)
    const i = t.getOptionScopes(this.getDataset(), e, !0);
    (this.options = t.createResolver(i, this.getContext())),
    (this._parsing = this.options.parsing),
    (this._cachedDataOpts = {})
  }

  parse (t, e) {
    const { _cachedMeta: i, _data: n } = this
    const { iScale: r, _stacked: o } = i
    const a = r.axis
    let l = t === 0 && e === n.length ? !0 : i._sorted
    let c = t > 0 && i._parsed[t - 1]
    let h
    let u
    let d
    if (this._parsing === !1) {
      (i._parsed = n), (i._sorted = !0), (d = n)
    } else {
      $(n[t])
        ? (d = this.parseArrayData(i, n, t, e))
        : A(n[t])
          ? (d = this.parseObjectData(i, n, t, e))
          : (d = this.parsePrimitiveData(i, n, t, e))
      const f = () => u[a] === null || (c && u[a] < c[a])
      for (h = 0; h < e; ++h) {
        (i._parsed[h + t] = u = d[h]), l && (f() && (l = !1), (c = u))
      }
      i._sorted = l
    }
    o && da(this, d)
  }

  parsePrimitiveData (t, e, i, n) {
    const { iScale: r, vScale: o } = t
    const a = r.axis
    const l = o.axis
    const c = r.getLabels()
    const h = r === o
    const u = new Array(n)
    let d
    let f
    let m
    for (d = 0, f = n; d < f; ++d) {
      (m = d + i),
      (u[d] = {
        [a]: h || r.parse(c[m], m),
        [l]: o.parse(e[m], m)
      })
    }
    return u
  }

  parseArrayData (t, e, i, n) {
    const { xScale: r, yScale: o } = t
    const a = new Array(n)
    let l
    let c
    let h
    let u
    for (l = 0, c = n; l < c; ++l) {
      (h = l + i),
      (u = e[h]),
      (a[l] = { x: r.parse(u[0], h), y: o.parse(u[1], h) })
    }
    return a
  }

  parseObjectData (t, e, i, n) {
    const { xScale: r, yScale: o } = t
    const { xAxisKey: a = 'x', yAxisKey: l = 'y' } = this._parsing
    const c = new Array(n)
    let h
    let u
    let d
    let f
    for (h = 0, u = n; h < u; ++h) {
      (d = h + i),
      (f = e[d]),
      (c[h] = {
        x: r.parse(Bt(f, a), d),
        y: o.parse(Bt(f, l), d)
      })
    }
    return c
  }

  getParsed (t) {
    return this._cachedMeta._parsed[t]
  }

  getDataElement (t) {
    return this._cachedMeta.data[t]
  }

  applyStack (t, e, i) {
    const n = this.chart
    const r = this._cachedMeta
    const o = e[t.axis]
    const a = { keys: Ja(n, !0), values: e._stacks[t.axis] }
    return ca(a, o, r.index, { mode: i })
  }

  updateRangeFromParsed (t, e, i, n) {
    const r = i[e.axis]
    let o = r === null ? NaN : r
    const a = n && i._stacks[e.axis]
    n && a && ((n.values = a), (o = ca(n, r, this._cachedMeta.index))),
    (t.min = Math.min(t.min, o)),
    (t.max = Math.max(t.max, o))
  }

  getMinMax (t, e) {
    const i = this._cachedMeta
    const n = i._parsed
    const r = i._sorted && t === i.iScale
    const o = n.length
    const a = this._getOtherScale(t)
    const l = Jh(e, i, this.chart)
    const c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }
    const { min: h, max: u } = qh(a)
    let d
    let f
    function m () {
      f = n[d]
      const g = f[a.axis]
      return !K(f[t.axis]) || h > g || u < g
    }
    for (
      d = 0;
      d < o && !(!m() && (this.updateRangeFromParsed(c, t, f, l), r));
      ++d
    );
    if (r) {
      for (d = o - 1; d >= 0; --d) {
        if (!m()) {
          this.updateRangeFromParsed(c, t, f, l)
          break
        }
      }
    }
    return c
  }

  getAllParsedValues (t) {
    const e = this._cachedMeta._parsed
    const i = []
    let n
    let r
    let o
    for (n = 0, r = e.length; n < r; ++n) {
      (o = e[n][t.axis]), K(o) && i.push(o)
    }
    return i
  }

  getMaxOverflow () {
    return !1
  }

  getLabelAndValue (t) {
    const e = this._cachedMeta
    const i = e.iScale
    const n = e.vScale
    const r = this.getParsed(t)
    return {
      label: i ? '' + i.getLabelForValue(r[i.axis]) : '',
      value: n ? '' + n.getLabelForValue(r[n.axis]) : ''
    }
  }

  _update (t) {
    const e = this._cachedMeta
    this.update(t || 'default'),
    (e._clip = Uh(
      C(
        this.options.clip,
        jh(e.xScale, e.yScale, this.getMaxOverflow())
      )
    ))
  }

  update (t) {}
  draw () {
    const t = this._ctx
    const e = this.chart
    const i = this._cachedMeta
    const n = i.data || []
    const r = e.chartArea
    const o = []
    const a = this._drawStart || 0
    const l = this._drawCount || n.length - a
    const c = this.options.drawActiveElementsOnTop
    let h
    for (i.dataset && i.dataset.draw(t, r, a, l), h = a; h < a + l; ++h) {
      const u = n[h]
      u.hidden || (u.active && c ? o.push(u) : u.draw(t, r))
    }
    for (h = 0; h < o.length; ++h) o[h].draw(t, r)
  }

  getStyle (t, e) {
    const i = e ? 'active' : 'default'
    return t === void 0 && this._cachedMeta.dataset
      ? this.resolveDatasetElementOptions(i)
      : this.resolveDataElementOptions(t || 0, i)
  }

  getContext (t, e, i) {
    const n = this.getDataset()
    let r
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      (r = o.$context || (o.$context = Kh(this.getContext(), t, o))),
      (r.parsed = this.getParsed(t)),
      (r.raw = n.data[t]),
      (r.index = r.dataIndex = t)
    } else {
      (r =
                this.$context ||
                (this.$context = Xh(this.chart.getContext(), this.index))),
      (r.dataset = n),
      (r.index = r.datasetIndex = this.index)
    }
    return (r.active = !!e), (r.mode = i), r
  }

  resolveDatasetElementOptions (t) {
    return this._resolveElementOptions(this.datasetElementType.id, t)
  }

  resolveDataElementOptions (t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t)
  }

  _resolveElementOptions (t, e = 'default', i) {
    const n = e === 'active'
    const r = this._cachedDataOpts
    const o = t + '-' + e
    const a = r[o]
    const l = this.enableOptionSharing && ft(i)
    if (a) return fa(a, l)
    const c = this.chart.config
    const h = c.datasetElementScopeKeys(this._type, t)
    const u = n ? [`${t}Hover`, 'hover', t, ''] : [t, '']
    const d = c.getOptionScopes(this.getDataset(), h)
    const f = Object.keys(L.elements[t])
    const m = () => this.getContext(i, n)
    const g = c.resolveNamedOptions(d, f, m, u)
    return (
      g.$shared && ((g.$shared = l), (r[o] = Object.freeze(fa(g, l)))), g
    )
  }

  _resolveAnimations (t, e, i) {
    const n = this.chart
    const r = this._cachedDataOpts
    const o = `animation-${e}`
    const a = r[o]
    if (a) return a
    let l
    if (n.options.animation !== !1) {
      const h = this.chart.config
      const u = h.datasetAnimationScopeKeys(this._type, e)
      const d = h.getOptionScopes(this.getDataset(), u)
      l = h.createResolver(d, this.getContext(t, i, e))
    }
    const c = new ji(n, l && l.animations)
    return l && l._cacheable && (r[o] = Object.freeze(c)), c
  }

  getSharedOptions (t) {
    if (t.$shared) {
      return (
        this._sharedOptions ||
                (this._sharedOptions = Object.assign({}, t))
      )
    }
  }

  includeOptions (t, e) {
    return !e || or(t) || this.chart._animationsDisabled
  }

  _getSharedOptions (t, e) {
    const i = this.resolveDataElementOptions(t, e)
    const n = this._sharedOptions
    const r = this.getSharedOptions(i)
    const o = this.includeOptions(e, r) || r !== n
    return (
      this.updateSharedOptions(r, e, i),
      { sharedOptions: r, includeOptions: o }
    )
  }

  updateElement (t, e, i, n) {
    or(n)
      ? Object.assign(t, i)
      : this._resolveAnimations(e, n).update(t, i)
  }

  updateSharedOptions (t, e, i) {
    t && !or(e) && this._resolveAnimations(void 0, e).update(t, i)
  }

  _setStyle (t, e, i, n) {
    t.active = n
    const r = this.getStyle(e, n)
    this._resolveAnimations(e, i, n).update(t, {
      options: (!n && this.getSharedOptions(r)) || r
    })
  }

  removeHoverStyle (t, e, i) {
    this._setStyle(t, i, 'active', !1)
  }

  setHoverStyle (t, e, i) {
    this._setStyle(t, i, 'active', !0)
  }

  _removeDatasetHoverStyle () {
    const t = this._cachedMeta.dataset
    t && this._setStyle(t, void 0, 'active', !1)
  }

  _setDatasetHoverStyle () {
    const t = this._cachedMeta.dataset
    t && this._setStyle(t, void 0, 'active', !0)
  }

  _resyncElements (t) {
    const e = this._data
    const i = this._cachedMeta.data
    for (const [a, l, c] of this._syncList) this[a](l, c)
    this._syncList = []
    const n = i.length
    const r = e.length
    const o = Math.min(r, n)
    o && this.parse(0, o),
    r > n
      ? this._insertElements(n, r - n, t)
      : r < n && this._removeElements(r, n - r)
  }

  _insertElements (t, e, i = !0) {
    const n = this._cachedMeta
    const r = n.data
    const o = t + e
    let a
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= o; a--) {
        c[a] = c[a - e]
      }
    }
    for (l(r), a = t; a < o; ++a) r[a] = new this.dataElementType()
    this._parsing && l(n._parsed),
    this.parse(t, e),
    i && this.updateElements(r, t, e, 'reset')
  }

  updateElements (t, e, i, n) {}
  _removeElements (t, e) {
    const i = this._cachedMeta
    if (this._parsing) {
      const n = i._parsed.splice(t, e)
      i._stacked && Ts(i, n)
    }
    i.data.splice(t, e)
  }

  _sync (t) {
    if (this._parsing) this._syncList.push(t)
    else {
      const [e, i, n] = t
      this[e](i, n)
    }
    this.chart._dataChanges.push([this.index, ...t])
  }

  _onDataPush () {
    const t = arguments.length
    this._sync(['_insertElements', this.getDataset().data.length - t, t])
  }

  _onDataPop () {
    this._sync(['_removeElements', this._cachedMeta.data.length - 1, 1])
  }

  _onDataShift () {
    this._sync(['_removeElements', 0, 1])
  }

  _onDataSplice (t, e) {
    e && this._sync(['_removeElements', t, e])
    const i = arguments.length - 2
    i && this._sync(['_insertElements', t, i])
  }

  _onDataUnshift () {
    this._sync(['_insertElements', 0, arguments.length])
  }
}
pt.defaults = {}
pt.prototype.datasetElementType = null
pt.prototype.dataElementType = null
function Qh (s, t) {
  if (!s._cache.$bar) {
    const e = s.getMatchingVisibleMetas(t)
    let i = []
    for (let n = 0, r = e.length; n < r; n++) {
      i = i.concat(e[n].controller.getAllParsedValues(s))
    }
    s._cache.$bar = Rn(i.sort((n, r) => n - r))
  }
  return s._cache.$bar
}
function tu (s) {
  const t = s.iScale
  const e = Qh(t, s.type)
  let i = t._length
  let n
  let r
  let o
  let a
  const l = () => {
    o === 32767 ||
            o === -32768 ||
            (ft(a) && (i = Math.min(i, Math.abs(o - a) || i)), (a = o))
  }
  for (n = 0, r = e.length; n < r; ++n) (o = t.getPixelForValue(e[n])), l()
  for (a = void 0, n = 0, r = t.ticks.length; n < r; ++n) {
    (o = t.getPixelForTick(n)), l()
  }
  return i
}
function eu (s, t, e, i) {
  const n = e.barThickness
  let r
  let o
  return (
    N(n)
      ? ((r = t.min * e.categoryPercentage), (o = e.barPercentage))
      : ((r = n * i), (o = 1)),
    { chunk: r / i, ratio: o, start: t.pixels[s] - r / 2 }
  )
}
function su (s, t, e, i) {
  const n = t.pixels
  const r = n[s]
  let o = s > 0 ? n[s - 1] : null
  let a = s < n.length - 1 ? n[s + 1] : null
  const l = e.categoryPercentage
  o === null && (o = r - (a === null ? t.end - t.start : a - r)),
  a === null && (a = r + r - o)
  const c = r - ((r - Math.min(o, a)) / 2) * l
  return {
    chunk: ((Math.abs(a - o) / 2) * l) / i,
    ratio: e.barPercentage,
    start: c
  }
}
function iu (s, t, e, i) {
  const n = e.parse(s[0], i)
  const r = e.parse(s[1], i)
  const o = Math.min(n, r)
  const a = Math.max(n, r)
  let l = o
  let c = a
  Math.abs(o) > Math.abs(a) && ((l = a), (c = o)),
  (t[e.axis] = c),
  (t._custom = {
    barStart: l,
    barEnd: c,
    start: n,
    end: r,
    min: o,
    max: a
  })
}
function Qa (s, t, e, i) {
  return $(s) ? iu(s, t, e, i) : (t[e.axis] = e.parse(s, i)), t
}
function ma (s, t, e, i) {
  const n = s.iScale
  const r = s.vScale
  const o = n.getLabels()
  const a = n === r
  const l = []
  let c
  let h
  let u
  let d
  for (c = e, h = e + i; c < h; ++c) {
    (d = t[c]),
    (u = {}),
    (u[n.axis] = a || n.parse(o[c], c)),
    l.push(Qa(d, u, r, c))
  }
  return l
}
function ar (s) {
  return s && s.barStart !== void 0 && s.barEnd !== void 0
}
function nu (s, t, e) {
  return s !== 0
    ? Tt(s)
    : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1)
}
function ru (s) {
  let t, e, i, n, r
  return (
    s.horizontal
      ? ((t = s.base > s.x), (e = 'left'), (i = 'right'))
      : ((t = s.base < s.y), (e = 'bottom'), (i = 'top')),
    t ? ((n = 'end'), (r = 'start')) : ((n = 'start'), (r = 'end')),
    { start: e, end: i, reverse: t, top: n, bottom: r }
  )
}
function ou (s, t, e, i) {
  let n = t.borderSkipped
  const r = {}
  if (!n) {
    s.borderSkipped = r
    return
  }
  if (n === !0) {
    s.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 }
    return
  }
  const { start: o, end: a, reverse: l, top: c, bottom: h } = ru(s)
  n === 'middle' &&
        e &&
        ((s.enableBorderRadius = !0),
        (e._top || 0) === i
          ? (n = c)
          : (e._bottom || 0) === i
              ? (n = h)
              : ((r[ga(h, o, a, l)] = !0), (n = c))),
  (r[ga(n, o, a, l)] = !0),
  (s.borderSkipped = r)
}
function ga (s, t, e, i) {
  return i ? ((s = au(s, t, e)), (s = pa(s, e, t))) : (s = pa(s, t, e)), s
}
function au (s, t, e) {
  return s === t ? e : s === e ? t : s
}
function pa (s, t, e) {
  return s === 'start' ? t : s === 'end' ? e : s
}
function lu (s, { inflateAmount: t }, e) {
  s.inflateAmount = t === 'auto' ? (e === 1 ? 0.33 : 0) : t
}
const $e = class extends pt {
  parsePrimitiveData (t, e, i, n) {
    return ma(t, e, i, n)
  }

  parseArrayData (t, e, i, n) {
    return ma(t, e, i, n)
  }

  parseObjectData (t, e, i, n) {
    const { iScale: r, vScale: o } = t
    const { xAxisKey: a = 'x', yAxisKey: l = 'y' } = this._parsing
    const c = r.axis === 'x' ? a : l
    const h = o.axis === 'x' ? a : l
    const u = []
    let d
    let f
    let m
    let g
    for (d = i, f = i + n; d < f; ++d) {
      (g = e[d]),
      (m = {}),
      (m[r.axis] = r.parse(Bt(g, c), d)),
      u.push(Qa(Bt(g, h), m, o, d))
    }
    return u
  }

  updateRangeFromParsed (t, e, i, n) {
    super.updateRangeFromParsed(t, e, i, n)
    const r = i._custom
    r &&
            e === this._cachedMeta.vScale &&
            ((t.min = Math.min(t.min, r.min)),
            (t.max = Math.max(t.max, r.max)))
  }

  getMaxOverflow () {
    return 0
  }

  getLabelAndValue (t) {
    const e = this._cachedMeta
    const { iScale: i, vScale: n } = e
    const r = this.getParsed(t)
    const o = r._custom
    const a = ar(o)
      ? '[' + o.start + ', ' + o.end + ']'
      : '' + n.getLabelForValue(r[n.axis])
    return { label: '' + i.getLabelForValue(r[i.axis]), value: a }
  }

  initialize () {
    (this.enableOptionSharing = !0), super.initialize()
    const t = this._cachedMeta
    t.stack = this.getDataset().stack
  }

  update (t) {
    const e = this._cachedMeta
    this.updateElements(e.data, 0, e.data.length, t)
  }

  updateElements (t, e, i, n) {
    const r = n === 'reset'
    const {
      index: o,
      _cachedMeta: { vScale: a }
    } = this
    const l = a.getBasePixel()
    const c = a.isHorizontal()
    const h = this._getRuler()
    const { sharedOptions: u, includeOptions: d } = this._getSharedOptions(
      e,
      n
    )
    for (let f = e; f < e + i; f++) {
      const m = this.getParsed(f)
      const g =
                r || N(m[a.axis])
                  ? { base: l, head: l }
                  : this._calculateBarValuePixels(f)
      const p = this._calculateBarIndexPixels(f, h)
      const y = (m._stacks || {})[a.axis]
      const b = {
        horizontal: c,
        base: g.base,
        enableBorderRadius:
                    !y || ar(m._custom) || o === y._top || o === y._bottom,
        x: c ? g.head : p.center,
        y: c ? p.center : g.head,
        height: c ? p.size : Math.abs(g.size),
        width: c ? Math.abs(g.size) : p.size
      }
      d &&
                (b.options =
                    u ||
                    this.resolveDataElementOptions(
                      f,
                      t[f].active ? 'active' : n
                    ))
      const _ = b.options || t[f].options
      ou(b, _, y, o),
      lu(b, _, h.ratio),
      this.updateElement(t[f], f, b, n)
    }
  }

  _getStacks (t, e) {
    const { iScale: i } = this._cachedMeta
    const n = i
      .getMatchingVisibleMetas(this._type)
      .filter((l) => l.controller.options.grouped)
    const r = i.options.stacked
    const o = []
    const a = (l) => {
      const c = l.controller.getParsed(e)
      const h = c && c[l.vScale.axis]
      if (N(h) || isNaN(h)) return !0
    }
    for (const l of n) {
      if (
        !(e !== void 0 && a(l)) &&
                ((r === !1 ||
                    o.indexOf(l.stack) === -1 ||
                    (r === void 0 && l.stack === void 0)) &&
                    o.push(l.stack),
                l.index === t)
      ) {
        break
      }
    }
    return o.length || o.push(void 0), o
  }

  _getStackCount (t) {
    return this._getStacks(void 0, t).length
  }

  _getStackIndex (t, e, i) {
    const n = this._getStacks(t, i)
    const r = e !== void 0 ? n.indexOf(e) : -1
    return r === -1 ? n.length - 1 : r
  }

  _getRuler () {
    const t = this.options
    const e = this._cachedMeta
    const i = e.iScale
    const n = []
    let r
    let o
    for (r = 0, o = e.data.length; r < o; ++r) {
      n.push(i.getPixelForValue(this.getParsed(r)[i.axis], r))
    }
    const a = t.barThickness
    return {
      min: a || tu(e),
      pixels: n,
      start: i._startPixel,
      end: i._endPixel,
      stackCount: this._getStackCount(),
      scale: i,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage
    }
  }

  _calculateBarValuePixels (t) {
    const {
      _cachedMeta: { vScale: e, _stacked: i },
      options: { base: n, minBarLength: r }
    } = this
    const o = n || 0
    const a = this.getParsed(t)
    const l = a._custom
    const c = ar(l)
    let h = a[e.axis]
    let u = 0
    let d = i ? this.applyStack(e, a, i) : h
    let f
    let m
    d !== h && ((u = d - h), (d = h)),
    c &&
                ((h = l.barStart),
                (d = l.barEnd - l.barStart),
                h !== 0 && Tt(h) !== Tt(l.barEnd) && (u = 0),
                (u += h))
    const g = !N(n) && !c ? n : u
    let p = e.getPixelForValue(g)
    if (
      (this.chart.getDataVisibility(t)
        ? (f = e.getPixelForValue(u + d))
        : (f = p),
      (m = f - p),
      Math.abs(m) < r)
    ) {
      (m = nu(m, e, o) * r), h === o && (p -= m / 2)
      const y = e.getPixelForDecimal(0)
      const b = e.getPixelForDecimal(1)
      const _ = Math.min(y, b)
      const w = Math.max(y, b);
      (p = Math.max(Math.min(p, w), _)), (f = p + m)
    }
    if (p === e.getPixelForValue(o)) {
      const y = (Tt(m) * e.getLineWidthForValue(o)) / 2;
      (p += y), (m -= y)
    }
    return { size: m, base: p, head: f, center: f + m / 2 }
  }

  _calculateBarIndexPixels (t, e) {
    const i = e.scale
    const n = this.options
    const r = n.skipNull
    const o = C(n.maxBarThickness, 1 / 0)
    let a
    let l
    if (e.grouped) {
      const c = r ? this._getStackCount(t) : e.stackCount
      const h =
                n.barThickness === 'flex' ? su(t, e, n, c) : eu(t, e, n, c)
      const u = this._getStackIndex(
        this.index,
        this._cachedMeta.stack,
        r ? t : void 0
      );
      (a = h.start + h.chunk * u + h.chunk / 2),
      (l = Math.min(o, h.chunk * h.ratio))
    } else {
      (a = i.getPixelForValue(this.getParsed(t)[i.axis], t)),
      (l = Math.min(o, e.min * e.ratio))
    }
    return { base: a - l / 2, head: a + l / 2, center: a, size: l }
  }

  draw () {
    const t = this._cachedMeta
    const e = t.vScale
    const i = t.data
    const n = i.length
    let r = 0
    for (; r < n; ++r) {
      this.getParsed(r)[e.axis] !== null && i[r].draw(this._ctx)
    }
  }
}
$e.id = 'bar'
$e.defaults = {
  datasetElementType: !1,
  dataElementType: 'bar',
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: 'number',
      properties: ['x', 'y', 'base', 'width', 'height']
    }
  }
}
$e.overrides = {
  scales: {
    _index_: { type: 'category', offset: !0, grid: { offset: !0 } },
    _value_: { type: 'linear', beginAtZero: !0 }
  }
}
const je = class extends pt {
  initialize () {
    (this.enableOptionSharing = !0), super.initialize()
  }

  parsePrimitiveData (t, e, i, n) {
    const r = super.parsePrimitiveData(t, e, i, n)
    for (let o = 0; o < r.length; o++) {
      r[o]._custom = this.resolveDataElementOptions(o + i).radius
    }
    return r
  }

  parseArrayData (t, e, i, n) {
    const r = super.parseArrayData(t, e, i, n)
    for (let o = 0; o < r.length; o++) {
      const a = e[i + o]
      r[o]._custom = C(
        a[2],
        this.resolveDataElementOptions(o + i).radius
      )
    }
    return r
  }

  parseObjectData (t, e, i, n) {
    const r = super.parseObjectData(t, e, i, n)
    for (let o = 0; o < r.length; o++) {
      const a = e[i + o]
      r[o]._custom = C(
        a && a.r && +a.r,
        this.resolveDataElementOptions(o + i).radius
      )
    }
    return r
  }

  getMaxOverflow () {
    const t = this._cachedMeta.data
    let e = 0
    for (let i = t.length - 1; i >= 0; --i) {
      e = Math.max(e, t[i].size(this.resolveDataElementOptions(i)) / 2)
    }
    return e > 0 && e
  }

  getLabelAndValue (t) {
    const e = this._cachedMeta
    const { xScale: i, yScale: n } = e
    const r = this.getParsed(t)
    const o = i.getLabelForValue(r.x)
    const a = n.getLabelForValue(r.y)
    const l = r._custom
    return {
      label: e.label,
      value: '(' + o + ', ' + a + (l ? ', ' + l : '') + ')'
    }
  }

  update (t) {
    const e = this._cachedMeta.data
    this.updateElements(e, 0, e.length, t)
  }

  updateElements (t, e, i, n) {
    const r = n === 'reset'
    const { iScale: o, vScale: a } = this._cachedMeta
    const { sharedOptions: l, includeOptions: c } = this._getSharedOptions(
      e,
      n
    )
    const h = o.axis
    const u = a.axis
    for (let d = e; d < e + i; d++) {
      const f = t[d]
      const m = !r && this.getParsed(d)
      const g = {}
      const p = (g[h] = r
        ? o.getPixelForDecimal(0.5)
        : o.getPixelForValue(m[h]))
      const y = (g[u] = r ? a.getBasePixel() : a.getPixelForValue(m[u]));
      (g.skip = isNaN(p) || isNaN(y)),
      c &&
                    ((g.options =
                        l ||
                        this.resolveDataElementOptions(
                          d,
                          f.active ? 'active' : n
                        )),
                    r && (g.options.radius = 0)),
      this.updateElement(f, d, g, n)
    }
  }

  resolveDataElementOptions (t, e) {
    const i = this.getParsed(t)
    let n = super.resolveDataElementOptions(t, e)
    n.$shared && (n = Object.assign({}, n, { $shared: !1 }))
    const r = n.radius
    return (
      e !== 'active' && (n.radius = 0),
      (n.radius += C(i && i._custom, r)),
      n
    )
  }
}
je.id = 'bubble'
je.defaults = {
  datasetElementType: !1,
  dataElementType: 'point',
  animations: {
    numbers: {
      type: 'number',
      properties: ['x', 'y', 'borderWidth', 'radius']
    }
  }
}
je.overrides = {
  scales: { x: { type: 'linear' }, y: { type: 'linear' } },
  plugins: {
    tooltip: {
      callbacks: {
        title () {
          return ''
        }
      }
    }
  }
}
function cu (s, t, e) {
  let i = 1
  let n = 1
  let r = 0
  let o = 0
  if (t < B) {
    const a = s
    const l = a + t
    const c = Math.cos(a)
    const h = Math.sin(a)
    const u = Math.cos(l)
    const d = Math.sin(l)
    const f = (_, w, x) =>
      Ne(_, a, l, !0) ? 1 : Math.max(w, w * e, x, x * e)
    const m = (_, w, x) =>
      Ne(_, a, l, !0) ? -1 : Math.min(w, w * e, x, x * e)
    const g = f(0, c, u)
    const p = f(Z, h, d)
    const y = m(Y, c, u)
    const b = m(Y + Z, h, d);
    (i = (g - y) / 2),
    (n = (p - b) / 2),
    (r = -(g + y) / 2),
    (o = -(p + b) / 2)
  }
  return { ratioX: i, ratioY: n, offsetX: r, offsetY: o }
}
const oe = class extends pt {
  constructor (t, e) {
    super(t, e),
    (this.enableOptionSharing = !0),
    (this.innerRadius = void 0),
    (this.outerRadius = void 0),
    (this.offsetX = void 0),
    (this.offsetY = void 0)
  }

  linkScales () {}
  parse (t, e) {
    const i = this.getDataset().data
    const n = this._cachedMeta
    if (this._parsing === !1) n._parsed = i
    else {
      let r = (l) => +i[l]
      if (A(i[t])) {
        const { key: l = 'value' } = this._parsing
        r = (c) => +Bt(i[c], l)
      }
      let o, a
      for (o = t, a = t + e; o < a; ++o) n._parsed[o] = r(o)
    }
  }

  _getRotation () {
    return wt(this.options.rotation - 90)
  }

  _getCircumference () {
    return wt(this.options.circumference)
  }

  _getRotationExtents () {
    let t = B
    let e = -B
    for (let i = 0; i < this.chart.data.datasets.length; ++i) {
      if (this.chart.isDatasetVisible(i)) {
        const n = this.chart.getDatasetMeta(i).controller
        const r = n._getRotation()
        const o = n._getCircumference();
        (t = Math.min(t, r)), (e = Math.max(e, r + o))
      }
    }
    return { rotation: t, circumference: e - t }
  }

  update (t) {
    const e = this.chart
    const { chartArea: i } = e
    const n = this._cachedMeta
    const r = n.data
    const o =
            this.getMaxBorderWidth() +
            this.getMaxOffset(r) +
            this.options.spacing
    const a = Math.max((Math.min(i.width, i.height) - o) / 2, 0)
    const l = Math.min(Eo(this.options.cutout, a), 1)
    const c = this._getRingWeight(this.index)
    const { circumference: h, rotation: u } = this._getRotationExtents()
    const { ratioX: d, ratioY: f, offsetX: m, offsetY: g } = cu(u, h, l)
    const p = (i.width - o) / d
    const y = (i.height - o) / f
    const b = Math.max(Math.min(p, y) / 2, 0)
    const _ = En(this.options.radius, b)
    const w = Math.max(_ * l, 0)
    const x = (_ - w) / this._getVisibleDatasetWeightTotal();
    (this.offsetX = m * _),
    (this.offsetY = g * _),
    (n.total = this.calculateTotal()),
    (this.outerRadius = _ - x * this._getRingWeightOffset(this.index)),
    (this.innerRadius = Math.max(this.outerRadius - x * c, 0)),
    this.updateElements(r, 0, r.length, t)
  }

  _circumference (t, e) {
    const i = this.options
    const n = this._cachedMeta
    const r = this._getCircumference()
    return (e && i.animation.animateRotate) ||
            !this.chart.getDataVisibility(t) ||
            n._parsed[t] === null ||
            n.data[t].hidden
      ? 0
      : this.calculateCircumference((n._parsed[t] * r) / B)
  }

  updateElements (t, e, i, n) {
    const r = n === 'reset'
    const o = this.chart
    const a = o.chartArea
    const c = o.options.animation
    const h = (a.left + a.right) / 2
    const u = (a.top + a.bottom) / 2
    const d = r && c.animateScale
    const f = d ? 0 : this.innerRadius
    const m = d ? 0 : this.outerRadius
    const { sharedOptions: g, includeOptions: p } = this._getSharedOptions(
      e,
      n
    )
    let y = this._getRotation()
    let b
    for (b = 0; b < e; ++b) y += this._circumference(b, r)
    for (b = e; b < e + i; ++b) {
      const _ = this._circumference(b, r)
      const w = t[b]
      const x = {
        x: h + this.offsetX,
        y: u + this.offsetY,
        startAngle: y,
        endAngle: y + _,
        circumference: _,
        outerRadius: m,
        innerRadius: f
      }
      p &&
                (x.options =
                    g ||
                    this.resolveDataElementOptions(b, w.active ? 'active' : n)),
      (y += _),
      this.updateElement(w, b, x, n)
    }
  }

  calculateTotal () {
    const t = this._cachedMeta
    const e = t.data
    let i = 0
    let n
    for (n = 0; n < e.length; n++) {
      const r = t._parsed[n]
      r !== null &&
                !isNaN(r) &&
                this.chart.getDataVisibility(n) &&
                !e[n].hidden &&
                (i += Math.abs(r))
    }
    return i
  }

  calculateCircumference (t) {
    const e = this._cachedMeta.total
    return e > 0 && !isNaN(t) ? B * (Math.abs(t) / e) : 0
  }

  getLabelAndValue (t) {
    const e = this._cachedMeta
    const i = this.chart
    const n = i.data.labels || []
    const r = Ve(e._parsed[t], i.options.locale)
    return { label: n[t] || '', value: r }
  }

  getMaxBorderWidth (t) {
    let e = 0
    const i = this.chart
    let n
    let r
    let o
    let a
    let l
    if (!t) {
      for (n = 0, r = i.data.datasets.length; n < r; ++n) {
        if (i.isDatasetVisible(n)) {
          (o = i.getDatasetMeta(n)), (t = o.data), (a = o.controller)
          break
        }
      }
    }
    if (!t) return 0
    for (n = 0, r = t.length; n < r; ++n) {
      (l = a.resolveDataElementOptions(n)),
      l.borderAlign !== 'inner' &&
                    (e = Math.max(
                      e,
                      l.borderWidth || 0,
                      l.hoverBorderWidth || 0
                    ))
    }
    return e
  }

  getMaxOffset (t) {
    let e = 0
    for (let i = 0, n = t.length; i < n; ++i) {
      const r = this.resolveDataElementOptions(i)
      e = Math.max(e, r.offset || 0, r.hoverOffset || 0)
    }
    return e
  }

  _getRingWeightOffset (t) {
    let e = 0
    for (let i = 0; i < t; ++i) {
      this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i))
    }
    return e
  }

  _getRingWeight (t) {
    return Math.max(C(this.chart.data.datasets[t].weight, 1), 0)
  }

  _getVisibleDatasetWeightTotal () {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1
  }
}
oe.id = 'doughnut'
oe.defaults = {
  datasetElementType: !1,
  dataElementType: 'arc',
  animation: { animateRotate: !0, animateScale: !1 },
  animations: {
    numbers: {
      type: 'number',
      properties: [
        'circumference',
        'endAngle',
        'innerRadius',
        'outerRadius',
        'startAngle',
        'x',
        'y',
        'offset',
        'borderWidth',
        'spacing'
      ]
    }
  },
  cutout: '50%',
  rotation: 0,
  circumference: 360,
  radius: '100%',
  spacing: 0,
  indexAxis: 'r'
}
oe.descriptors = {
  _scriptable: (s) => s !== 'spacing',
  _indexable: (s) => s !== 'spacing'
}
oe.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels (s) {
          const t = s.data
          if (t.labels.length && t.datasets.length) {
            const {
              labels: { pointStyle: e }
            } = s.legend.options
            return t.labels.map((i, n) => {
              const o = s
                .getDatasetMeta(0)
                .controller.getStyle(n)
              return {
                text: i,
                fillStyle: o.backgroundColor,
                strokeStyle: o.borderColor,
                lineWidth: o.borderWidth,
                pointStyle: e,
                hidden: !s.getDataVisibility(n),
                index: n
              }
            })
          }
          return []
        }
      },
      onClick (s, t, e) {
        e.chart.toggleDataVisibility(t.index), e.chart.update()
      }
    },
    tooltip: {
      callbacks: {
        title () {
          return ''
        },
        label (s) {
          let t = s.label
          const e = ': ' + s.formattedValue
          return $(t) ? ((t = t.slice()), (t[0] += e)) : (t += e), t
        }
      }
    }
  }
}
const Ue = class extends pt {
  initialize () {
    (this.enableOptionSharing = !0),
    (this.supportsDecimation = !0),
    super.initialize()
  }

  update (t) {
    const e = this._cachedMeta
    const { dataset: i, data: n = [], _dataset: r } = e
    const o = this.chart._animationsDisabled
    let { start: a, count: l } = zn(e, n, o);
    (this._drawStart = a),
    (this._drawCount = l),
    Vn(e) && ((a = 0), (l = n.length)),
    (i._chart = this.chart),
    (i._datasetIndex = this.index),
    (i._decimated = !!r._decimated),
    (i.points = n)
    const c = this.resolveDatasetElementOptions(t)
    this.options.showLine || (c.borderWidth = 0),
    (c.segment = this.options.segment),
    this.updateElement(i, void 0, { animated: !o, options: c }, t),
    this.updateElements(n, a, l, t)
  }

  updateElements (t, e, i, n) {
    const r = n === 'reset'
    const {
      iScale: o,
      vScale: a,
      _stacked: l,
      _dataset: c
    } = this._cachedMeta
    const { sharedOptions: h, includeOptions: u } = this._getSharedOptions(
      e,
      n
    )
    const d = o.axis
    const f = a.axis
    const { spanGaps: m, segment: g } = this.options
    const p = pe(m) ? m : Number.POSITIVE_INFINITY
    const y = this.chart._animationsDisabled || r || n === 'none'
    let b = e > 0 && this.getParsed(e - 1)
    for (let _ = e; _ < e + i; ++_) {
      const w = t[_]
      const x = this.getParsed(_)
      const S = y ? w : {}
      const k = N(x[f])
      const O = (S[d] = o.getPixelForValue(x[d], _))
      const v = (S[f] =
                r || k
                  ? a.getBasePixel()
                  : a.getPixelForValue(
                    l ? this.applyStack(a, x, l) : x[f],
                    _
                  ));
      (S.skip = isNaN(O) || isNaN(v) || k),
      (S.stop = _ > 0 && Math.abs(x[d] - b[d]) > p),
      g && ((S.parsed = x), (S.raw = c.data[_])),
      u &&
                    (S.options =
                        h ||
                        this.resolveDataElementOptions(
                          _,
                          w.active ? 'active' : n
                        )),
      y || this.updateElement(w, _, S, n),
      (b = x)
    }
  }

  getMaxOverflow () {
    const t = this._cachedMeta
    const e = t.dataset
    const i = (e.options && e.options.borderWidth) || 0
    const n = t.data || []
    if (!n.length) return i
    const r = n[0].size(this.resolveDataElementOptions(0))
    const o = n[n.length - 1].size(
      this.resolveDataElementOptions(n.length - 1)
    )
    return Math.max(i, r, o) / 2
  }

  draw () {
    const t = this._cachedMeta
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis),
    super.draw()
  }
}
Ue.id = 'line'
Ue.defaults = {
  datasetElementType: 'line',
  dataElementType: 'point',
  showLine: !0,
  spanGaps: !1
}
Ue.overrides = {
  scales: { _index_: { type: 'category' }, _value_: { type: 'linear' } }
}
const Ye = class extends pt {
  constructor (t, e) {
    super(t, e), (this.innerRadius = void 0), (this.outerRadius = void 0)
  }

  getLabelAndValue (t) {
    const e = this._cachedMeta
    const i = this.chart
    const n = i.data.labels || []
    const r = Ve(e._parsed[t].r, i.options.locale)
    return { label: n[t] || '', value: r }
  }

  parseObjectData (t, e, i, n) {
    return Kn.bind(this)(t, e, i, n)
  }

  update (t) {
    const e = this._cachedMeta.data
    this._updateRadius(), this.updateElements(e, 0, e.length, t)
  }

  getMinMax () {
    const t = this._cachedMeta
    const e = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }
    return (
      t.data.forEach((i, n) => {
        const r = this.getParsed(n).r
        !isNaN(r) &&
                    this.chart.getDataVisibility(n) &&
                    (r < e.min && (e.min = r), r > e.max && (e.max = r))
      }),
      e
    )
  }

  _updateRadius () {
    const t = this.chart
    const e = t.chartArea
    const i = t.options
    const n = Math.min(e.right - e.left, e.bottom - e.top)
    const r = Math.max(n / 2, 0)
    const o = Math.max(
      i.cutoutPercentage ? (r / 100) * i.cutoutPercentage : 1,
      0
    )
    const a = (r - o) / t.getVisibleDatasetCount();
    (this.outerRadius = r - a * this.index),
    (this.innerRadius = this.outerRadius - a)
  }

  updateElements (t, e, i, n) {
    const r = n === 'reset'
    const o = this.chart
    const l = o.options.animation
    const c = this._cachedMeta.rScale
    const h = c.xCenter
    const u = c.yCenter
    const d = c.getIndexAngle(0) - 0.5 * Y
    let f = d
    let m
    const g = 360 / this.countVisibleElements()
    for (m = 0; m < e; ++m) f += this._computeAngle(m, n, g)
    for (m = e; m < e + i; m++) {
      const p = t[m]
      let y = f
      let b = f + this._computeAngle(m, n, g)
      let _ = o.getDataVisibility(m)
        ? c.getDistanceFromCenterForValue(this.getParsed(m).r)
        : 0;
      (f = b),
      r &&
                    (l.animateScale && (_ = 0), l.animateRotate && (y = b = d))
      const w = {
        x: h,
        y: u,
        innerRadius: 0,
        outerRadius: _,
        startAngle: y,
        endAngle: b,
        options: this.resolveDataElementOptions(
          m,
          p.active ? 'active' : n
        )
      }
      this.updateElement(p, m, w, n)
    }
  }

  countVisibleElements () {
    const t = this._cachedMeta
    let e = 0
    return (
      t.data.forEach((i, n) => {
        !isNaN(this.getParsed(n).r) &&
                    this.chart.getDataVisibility(n) &&
                    e++
      }),
      e
    )
  }

  _computeAngle (t, e, i) {
    return this.chart.getDataVisibility(t)
      ? wt(this.resolveDataElementOptions(t, e).angle || i)
      : 0
  }
}
Ye.id = 'polarArea'
Ye.defaults = {
  dataElementType: 'arc',
  animation: { animateRotate: !0, animateScale: !0 },
  animations: {
    numbers: {
      type: 'number',
      properties: [
        'x',
        'y',
        'startAngle',
        'endAngle',
        'innerRadius',
        'outerRadius'
      ]
    }
  },
  indexAxis: 'r',
  startAngle: 0
}
Ye.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels (s) {
          const t = s.data
          if (t.labels.length && t.datasets.length) {
            const {
              labels: { pointStyle: e }
            } = s.legend.options
            return t.labels.map((i, n) => {
              const o = s
                .getDatasetMeta(0)
                .controller.getStyle(n)
              return {
                text: i,
                fillStyle: o.backgroundColor,
                strokeStyle: o.borderColor,
                lineWidth: o.borderWidth,
                pointStyle: e,
                hidden: !s.getDataVisibility(n),
                index: n
              }
            })
          }
          return []
        }
      },
      onClick (s, t, e) {
        e.chart.toggleDataVisibility(t.index), e.chart.update()
      }
    },
    tooltip: {
      callbacks: {
        title () {
          return ''
        },
        label (s) {
          return (
            s.chart.data.labels[s.dataIndex] +
                        ': ' +
                        s.formattedValue
          )
        }
      }
    }
  },
  scales: {
    r: {
      type: 'radialLinear',
      angleLines: { display: !1 },
      beginAtZero: !0,
      grid: { circular: !0 },
      pointLabels: { display: !1 },
      startAngle: 0
    }
  }
}
const Fs = class extends oe {}
Fs.id = 'pie'
Fs.defaults = { cutout: 0, rotation: 0, circumference: 360, radius: '100%' }
const Ze = class extends pt {
  getLabelAndValue (t) {
    const e = this._cachedMeta.vScale
    const i = this.getParsed(t)
    return {
      label: e.getLabels()[t],
      value: '' + e.getLabelForValue(i[e.axis])
    }
  }

  parseObjectData (t, e, i, n) {
    return Kn.bind(this)(t, e, i, n)
  }

  update (t) {
    const e = this._cachedMeta
    const i = e.dataset
    const n = e.data || []
    const r = e.iScale.getLabels()
    if (((i.points = n), t !== 'resize')) {
      const o = this.resolveDatasetElementOptions(t)
      this.options.showLine || (o.borderWidth = 0)
      const a = {
        _loop: !0,
        _fullLoop: r.length === n.length,
        options: o
      }
      this.updateElement(i, void 0, a, t)
    }
    this.updateElements(n, 0, n.length, t)
  }

  updateElements (t, e, i, n) {
    const r = this._cachedMeta.rScale
    const o = n === 'reset'
    for (let a = e; a < e + i; a++) {
      const l = t[a]
      const c = this.resolveDataElementOptions(
        a,
        l.active ? 'active' : n
      )
      const h = r.getPointPositionForValue(a, this.getParsed(a).r)
      const u = o ? r.xCenter : h.x
      const d = o ? r.yCenter : h.y
      const f = {
        x: u,
        y: d,
        angle: h.angle,
        skip: isNaN(u) || isNaN(d),
        options: c
      }
      this.updateElement(l, a, f, n)
    }
  }
}
Ze.id = 'radar'
Ze.defaults = {
  datasetElementType: 'line',
  dataElementType: 'point',
  indexAxis: 'r',
  showLine: !0,
  elements: { line: { fill: 'start' } }
}
Ze.overrides = { aspectRatio: 1, scales: { r: { type: 'radialLinear' } } }
const yt = class {
  constructor () {
    (this.x = void 0),
    (this.y = void 0),
    (this.active = !1),
    (this.options = void 0),
    (this.$animations = void 0)
  }

  tooltipPosition (t) {
    const { x: e, y: i } = this.getProps(['x', 'y'], t)
    return { x: e, y: i }
  }

  hasValue () {
    return pe(this.x) && pe(this.y)
  }

  getProps (t, e) {
    const i = this.$animations
    if (!e || !i) return this
    const n = {}
    return (
      t.forEach((r) => {
        n[r] = i[r] && i[r].active() ? i[r]._to : this[r]
      }),
      n
    )
  }
}
yt.defaults = {}
yt.defaultRoutes = void 0
var tl = {
  values (s) {
    return $(s) ? s : '' + s
  },
  numeric (s, t, e) {
    if (s === 0) return '0'
    const i = this.chart.options.locale
    let n
    let r = s
    if (e.length > 1) {
      const c = Math.max(
        Math.abs(e[0].value),
        Math.abs(e[e.length - 1].value)
      );
      (c < 1e-4 || c > 1e15) && (n = 'scientific'), (r = hu(s, e))
    }
    const o = gt(Math.abs(r))
    const a = Math.max(Math.min(-1 * Math.floor(o), 20), 0)
    const l = {
      notation: n,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    }
    return Object.assign(l, this.options.ticks.format), Ve(s, i, l)
  },
  logarithmic (s, t, e) {
    if (s === 0) return '0'
    const i = s / Math.pow(10, Math.floor(gt(s)))
    return i === 1 || i === 2 || i === 5
      ? tl.numeric.call(this, s, t, e)
      : ''
  }
}
function hu (s, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value
  return (
    Math.abs(e) >= 1 && s !== Math.floor(s) && (e = s - Math.floor(s)), e
  )
}
const Xi = { formatters: tl }
L.set('scale', {
  display: !0,
  offset: !1,
  reverse: !1,
  beginAtZero: !1,
  bounds: 'ticks',
  grace: 0,
  grid: {
    display: !0,
    lineWidth: 1,
    drawBorder: !0,
    drawOnChartArea: !0,
    drawTicks: !0,
    tickLength: 8,
    tickWidth: (s, t) => t.lineWidth,
    tickColor: (s, t) => t.color,
    offset: !1,
    borderDash: [],
    borderDashOffset: 0,
    borderWidth: 1
  },
  title: { display: !1, text: '', padding: { top: 4, bottom: 4 } },
  ticks: {
    minRotation: 0,
    maxRotation: 50,
    mirror: !1,
    textStrokeWidth: 0,
    textStrokeColor: '',
    padding: 3,
    display: !0,
    autoSkip: !0,
    autoSkipPadding: 3,
    labelOffset: 0,
    callback: Xi.formatters.values,
    minor: {},
    major: {},
    align: 'center',
    crossAlign: 'near',
    showLabelBackdrop: !1,
    backdropColor: 'rgba(255, 255, 255, 0.75)',
    backdropPadding: 2
  }
})
L.route('scale.ticks', 'color', '', 'color')
L.route('scale.grid', 'color', '', 'borderColor')
L.route('scale.grid', 'borderColor', '', 'borderColor')
L.route('scale.title', 'color', '', 'color')
L.describe('scale', {
  _fallback: !1,
  _scriptable: (s) =>
    !s.startsWith('before') &&
        !s.startsWith('after') &&
        s !== 'callback' &&
        s !== 'parser',
  _indexable: (s) => s !== 'borderDash' && s !== 'tickBorderDash'
})
L.describe('scales', { _fallback: 'scale' })
L.describe('scale.ticks', {
  _scriptable: (s) => s !== 'backdropPadding' && s !== 'callback',
  _indexable: (s) => s !== 'backdropPadding'
})
function uu (s, t) {
  const e = s.options.ticks
  const i = e.maxTicksLimit || du(s)
  const n = e.major.enabled ? mu(t) : []
  const r = n.length
  const o = n[0]
  const a = n[r - 1]
  const l = []
  if (r > i) return gu(t, l, n, r / i), l
  const c = fu(n, t, i)
  if (r > 0) {
    let h
    let u
    const d = r > 1 ? Math.round((a - o) / (r - 1)) : null
    for (Ni(t, l, c, N(d) ? 0 : o - d, o), h = 0, u = r - 1; h < u; h++) {
      Ni(t, l, c, n[h], n[h + 1])
    }
    return Ni(t, l, c, a, N(d) ? t.length : a + d), l
  }
  return Ni(t, l, c), l
}
function du (s) {
  const t = s.options.offset
  const e = s._tickSize()
  const i = s._length / e + (t ? 0 : 1)
  const n = s._maxLength / e
  return Math.floor(Math.min(i, n))
}
function fu (s, t, e) {
  const i = pu(s)
  const n = t.length / e
  if (!i) return Math.max(n, 1)
  const r = Fo(i)
  for (let o = 0, a = r.length - 1; o < a; o++) {
    const l = r[o]
    if (l > n) return l
  }
  return Math.max(n, 1)
}
function mu (s) {
  const t = []
  let e
  let i
  for (e = 0, i = s.length; e < i; e++) s[e].major && t.push(e)
  return t
}
function gu (s, t, e, i) {
  let n = 0
  let r = e[0]
  let o
  for (i = Math.ceil(i), o = 0; o < s.length; o++) {
    o === r && (t.push(s[o]), n++, (r = e[n * i]))
  }
}
function Ni (s, t, e, i, n) {
  const r = C(i, 0)
  const o = Math.min(C(n, s.length), s.length)
  let a = 0
  let l
  let c
  let h
  for (
    e = Math.ceil(e),
    n && ((l = n - i), (e = l / Math.floor(l / e))),
    h = r;
    h < 0;

  ) {
    a++, (h = Math.round(r + a * e))
  }
  for (c = Math.max(r, 0); c < o; c++) {
    c === h && (t.push(s[c]), a++, (h = Math.round(r + a * e)))
  }
}
function pu (s) {
  const t = s.length
  let e
  let i
  if (t < 2) return !1
  for (i = s[0], e = 1; e < t; ++e) if (s[e] - s[e - 1] !== i) return !1
  return i
}
const yu = (s) => (s === 'left' ? 'right' : s === 'right' ? 'left' : s)
const ya = (s, t, e) => (t === 'top' || t === 'left' ? s[t] + e : s[t] - e)
function ba (s, t) {
  const e = []
  const i = s.length / t
  const n = s.length
  let r = 0
  for (; r < n; r += i) e.push(s[Math.floor(r)])
  return e
}
function bu (s, t, e) {
  const i = s.ticks.length
  const n = Math.min(t, i - 1)
  const r = s._startPixel
  const o = s._endPixel
  const a = 1e-6
  let l = s.getPixelForTick(n)
  let c
  if (
    !(
      e &&
            (i === 1
              ? (c = Math.max(l - r, o - l))
              : t === 0
                ? (c = (s.getPixelForTick(1) - l) / 2)
                : (c = (l - s.getPixelForTick(n - 1)) / 2),
            (l += n < t ? c : -c),
            l < r - a || l > o + a)
    )
  ) {
    return l
  }
}
function xu (s, t) {
  H(s, (e) => {
    const i = e.gc
    const n = i.length / 2
    let r
    if (n > t) {
      for (r = 0; r < n; ++r) delete e.data[i[r]]
      i.splice(0, n)
    }
  })
}
function vs (s) {
  return s.drawTicks ? s.tickLength : 0
}
function xa (s, t) {
  if (!s.display) return 0
  const e = st(s.font, t)
  const i = at(s.padding)
  return ($(s.text) ? s.text.length : 1) * e.lineHeight + i.height
}
function _u (s, t) {
  return $t(s, { scale: t, type: 'scale' })
}
function wu (s, t, e) {
  return $t(s, { tick: e, index: t, type: 'tick' })
}
function Su (s, t, e) {
  let i = Ci(s)
  return ((e && t !== 'right') || (!e && t === 'right')) && (i = yu(i)), i
}
function ku (s, t, e, i) {
  const { top: n, left: r, bottom: o, right: a, chart: l } = s
  const { chartArea: c, scales: h } = l
  let u = 0
  let d
  let f
  let m
  const g = o - n
  const p = a - r
  if (s.isHorizontal()) {
    if (((f = ot(i, r, a)), A(e))) {
      const y = Object.keys(e)[0]
      const b = e[y]
      m = h[y].getPixelForValue(b) + g - t
    } else {
      e === 'center'
        ? (m = (c.bottom + c.top) / 2 + g - t)
        : (m = ya(s, e, t))
    }
    d = a - r
  } else {
    if (A(e)) {
      const y = Object.keys(e)[0]
      const b = e[y]
      f = h[y].getPixelForValue(b) - p + t
    } else {
      e === 'center'
        ? (f = (c.left + c.right) / 2 - p + t)
        : (f = ya(s, e, t))
    }
    (m = ot(i, o, n)), (u = e === 'left' ? -Z : Z)
  }
  return { titleX: f, titleY: m, maxWidth: d, rotation: u }
}
var Yt = class extends yt {
  constructor (t) {
    super(),
    (this.id = t.id),
    (this.type = t.type),
    (this.options = void 0),
    (this.ctx = t.ctx),
    (this.chart = t.chart),
    (this.top = void 0),
    (this.bottom = void 0),
    (this.left = void 0),
    (this.right = void 0),
    (this.width = void 0),
    (this.height = void 0),
    (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
    (this.maxWidth = void 0),
    (this.maxHeight = void 0),
    (this.paddingTop = void 0),
    (this.paddingBottom = void 0),
    (this.paddingLeft = void 0),
    (this.paddingRight = void 0),
    (this.axis = void 0),
    (this.labelRotation = void 0),
    (this.min = void 0),
    (this.max = void 0),
    (this._range = void 0),
    (this.ticks = []),
    (this._gridLineItems = null),
    (this._labelItems = null),
    (this._labelSizes = null),
    (this._length = 0),
    (this._maxLength = 0),
    (this._longestTextCache = {}),
    (this._startPixel = void 0),
    (this._endPixel = void 0),
    (this._reversePixels = !1),
    (this._userMax = void 0),
    (this._userMin = void 0),
    (this._suggestedMax = void 0),
    (this._suggestedMin = void 0),
    (this._ticksLength = 0),
    (this._borderValue = 0),
    (this._cache = {}),
    (this._dataLimitsCached = !1),
    (this.$context = void 0)
  }

  init (t) {
    (this.options = t.setContext(this.getContext())),
    (this.axis = t.axis),
    (this._userMin = this.parse(t.min)),
    (this._userMax = this.parse(t.max)),
    (this._suggestedMin = this.parse(t.suggestedMin)),
    (this._suggestedMax = this.parse(t.suggestedMax))
  }

  parse (t, e) {
    return t
  }

  getUserBounds () {
    let {
      _userMin: t,
      _userMax: e,
      _suggestedMin: i,
      _suggestedMax: n
    } = this
    return (
      (t = mt(t, Number.POSITIVE_INFINITY)),
      (e = mt(e, Number.NEGATIVE_INFINITY)),
      (i = mt(i, Number.POSITIVE_INFINITY)),
      (n = mt(n, Number.NEGATIVE_INFINITY)),
      {
        min: mt(t, i),
        max: mt(e, n),
        minDefined: K(t),
        maxDefined: K(e)
      }
    )
  }

  getMinMax (t) {
    let {
      min: e,
      max: i,
      minDefined: n,
      maxDefined: r
    } = this.getUserBounds()
    let o
    if (n && r) return { min: e, max: i }
    const a = this.getMatchingVisibleMetas()
    for (let l = 0, c = a.length; l < c; ++l) {
      (o = a[l].controller.getMinMax(this, t)),
      n || (e = Math.min(e, o.min)),
      r || (i = Math.max(i, o.max))
    }
    return (
      (e = r && e > i ? i : e),
      (i = n && e > i ? e : i),
      { min: mt(e, mt(i, e)), max: mt(i, mt(e, i)) }
    )
  }

  getPadding () {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    }
  }

  getTicks () {
    return this.ticks
  }

  getLabels () {
    const t = this.chart.data
    return (
      this.options.labels ||
            (this.isHorizontal() ? t.xLabels : t.yLabels) ||
            t.labels ||
            []
    )
  }

  beforeLayout () {
    (this._cache = {}), (this._dataLimitsCached = !1)
  }

  beforeUpdate () {
    j(this.options.beforeUpdate, [this])
  }

  update (t, e, i) {
    const { beginAtZero: n, grace: r, ticks: o } = this.options
    const a = o.sampleSize
    this.beforeUpdate(),
    (this.maxWidth = t),
    (this.maxHeight = e),
    (this._margins = i =
                Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
    (this.ticks = null),
    (this._labelSizes = null),
    (this._gridLineItems = null),
    (this._labelItems = null),
    this.beforeSetDimensions(),
    this.setDimensions(),
    this.afterSetDimensions(),
    (this._maxLength = this.isHorizontal()
      ? this.width + i.left + i.right
      : this.height + i.top + i.bottom),
    this._dataLimitsCached ||
                (this.beforeDataLimits(),
                this.determineDataLimits(),
                this.afterDataLimits(),
                (this._range = Go(this, r, n)),
                (this._dataLimitsCached = !0)),
    this.beforeBuildTicks(),
    (this.ticks = this.buildTicks() || []),
    this.afterBuildTicks()
    const l = a < this.ticks.length
    this._convertTicksToLabels(l ? ba(this.ticks, a) : this.ticks),
    this.configure(),
    this.beforeCalculateLabelRotation(),
    this.calculateLabelRotation(),
    this.afterCalculateLabelRotation(),
    o.display &&
                (o.autoSkip || o.source === 'auto') &&
                ((this.ticks = uu(this, this.ticks)),
                (this._labelSizes = null),
                this.afterAutoSkip()),
    l && this._convertTicksToLabels(this.ticks),
    this.beforeFit(),
    this.fit(),
    this.afterFit(),
    this.afterUpdate()
  }

  configure () {
    let t = this.options.reverse
    let e
    let i
    this.isHorizontal()
      ? ((e = this.left), (i = this.right))
      : ((e = this.top), (i = this.bottom), (t = !t)),
    (this._startPixel = e),
    (this._endPixel = i),
    (this._reversePixels = t),
    (this._length = i - e),
    (this._alignToPixels = this.options.alignToPixels)
  }

  afterUpdate () {
    j(this.options.afterUpdate, [this])
  }

  beforeSetDimensions () {
    j(this.options.beforeSetDimensions, [this])
  }

  setDimensions () {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = 0),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = 0),
        (this.bottom = this.height)),
    (this.paddingLeft = 0),
    (this.paddingTop = 0),
    (this.paddingRight = 0),
    (this.paddingBottom = 0)
  }

  afterSetDimensions () {
    j(this.options.afterSetDimensions, [this])
  }

  _callHooks (t) {
    this.chart.notifyPlugins(t, this.getContext()),
    j(this.options[t], [this])
  }

  beforeDataLimits () {
    this._callHooks('beforeDataLimits')
  }

  determineDataLimits () {}
  afterDataLimits () {
    this._callHooks('afterDataLimits')
  }

  beforeBuildTicks () {
    this._callHooks('beforeBuildTicks')
  }

  buildTicks () {
    return []
  }

  afterBuildTicks () {
    this._callHooks('afterBuildTicks')
  }

  beforeTickToLabelConversion () {
    j(this.options.beforeTickToLabelConversion, [this])
  }

  generateTickLabels (t) {
    const e = this.options.ticks
    let i
    let n
    let r
    for (i = 0, n = t.length; i < n; i++) {
      (r = t[i]), (r.label = j(e.callback, [r.value, i, t], this))
    }
  }

  afterTickToLabelConversion () {
    j(this.options.afterTickToLabelConversion, [this])
  }

  beforeCalculateLabelRotation () {
    j(this.options.beforeCalculateLabelRotation, [this])
  }

  calculateLabelRotation () {
    const t = this.options
    const e = t.ticks
    const i = this.ticks.length
    const n = e.minRotation || 0
    const r = e.maxRotation
    let o = n
    let a
    let l
    let c
    if (
      !this._isVisible() ||
            !e.display ||
            n >= r ||
            i <= 1 ||
            !this.isHorizontal()
    ) {
      this.labelRotation = n
      return
    }
    const h = this._getLabelSizes()
    const u = h.widest.width
    const d = h.highest.height
    const f = it(this.chart.width - u, 0, this.maxWidth);
    (a = t.offset ? this.maxWidth / i : f / (i - 1)),
    u + 6 > a &&
                ((a = f / (i - (t.offset ? 0.5 : 1))),
                (l =
                    this.maxHeight -
                    vs(t.grid) -
                    e.padding -
                    xa(t.title, this.chart.options.font)),
                (c = Math.sqrt(u * u + d * d)),
                (o = Di(
                  Math.min(
                    Math.asin(it((h.highest.height + 6) / a, -1, 1)),
                    Math.asin(it(l / c, -1, 1)) -
                            Math.asin(it(d / c, -1, 1))
                  )
                )),
                (o = Math.max(n, Math.min(r, o)))),
    (this.labelRotation = o)
  }

  afterCalculateLabelRotation () {
    j(this.options.afterCalculateLabelRotation, [this])
  }

  afterAutoSkip () {}
  beforeFit () {
    j(this.options.beforeFit, [this])
  }

  fit () {
    const t = { width: 0, height: 0 }
    const {
      chart: e,
      options: { ticks: i, title: n, grid: r }
    } = this
    const o = this._isVisible()
    const a = this.isHorizontal()
    if (o) {
      const l = xa(n, e.options.font)
      if (
        (a
          ? ((t.width = this.maxWidth), (t.height = vs(r) + l))
          : ((t.height = this.maxHeight), (t.width = vs(r) + l)),
        i.display && this.ticks.length)
      ) {
        const {
          first: c,
          last: h,
          widest: u,
          highest: d
        } = this._getLabelSizes()
        const f = i.padding * 2
        const m = wt(this.labelRotation)
        const g = Math.cos(m)
        const p = Math.sin(m)
        if (a) {
          const y = i.mirror ? 0 : p * u.width + g * d.height
          t.height = Math.min(this.maxHeight, t.height + y + f)
        } else {
          const y = i.mirror ? 0 : g * u.width + p * d.height
          t.width = Math.min(this.maxWidth, t.width + y + f)
        }
        this._calculatePadding(c, h, p, g)
      }
    }
    this._handleMargins(),
    a
      ? ((this.width = this._length =
                      e.width - this._margins.left - this._margins.right),
        (this.height = t.height))
      : ((this.width = t.width),
        (this.height = this._length =
                      e.height - this._margins.top - this._margins.bottom))
  }

  _calculatePadding (t, e, i, n) {
    const {
      ticks: { align: r, padding: o },
      position: a
    } = this.options
    const l = this.labelRotation !== 0
    const c = a !== 'top' && this.axis === 'x'
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left
      const u = this.right - this.getPixelForTick(this.ticks.length - 1)
      let d = 0
      let f = 0
      l
        ? c
          ? ((d = n * t.width), (f = i * e.height))
          : ((d = i * t.height), (f = n * e.width))
        : r === 'start'
          ? (f = e.width)
          : r === 'end'
            ? (d = t.width)
            : r !== 'inner' && ((d = t.width / 2), (f = e.width / 2)),
      (this.paddingLeft = Math.max(
        ((d - h + o) * this.width) / (this.width - h),
        0
      )),
      (this.paddingRight = Math.max(
        ((f - u + o) * this.width) / (this.width - u),
        0
      ))
    } else {
      let h = e.height / 2
      let u = t.height / 2
      r === 'start'
        ? ((h = 0), (u = t.height))
        : r === 'end' && ((h = e.height), (u = 0)),
      (this.paddingTop = h + o),
      (this.paddingBottom = u + o)
    }
  }

  _handleMargins () {
    this._margins &&
            ((this._margins.left = Math.max(
              this.paddingLeft,
              this._margins.left
            )),
            (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
            (this._margins.right = Math.max(
              this.paddingRight,
              this._margins.right
            )),
            (this._margins.bottom = Math.max(
              this.paddingBottom,
              this._margins.bottom
            )))
  }

  afterFit () {
    j(this.options.afterFit, [this])
  }

  isHorizontal () {
    const { axis: t, position: e } = this.options
    return e === 'top' || e === 'bottom' || t === 'x'
  }

  isFullSize () {
    return this.options.fullSize
  }

  _convertTicksToLabels (t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t)
    let e, i
    for (e = 0, i = t.length; e < i; e++) {
      N(t[e].label) && (t.splice(e, 1), i--, e--)
    }
    this.afterTickToLabelConversion()
  }

  _getLabelSizes () {
    let t = this._labelSizes
    if (!t) {
      const e = this.options.ticks.sampleSize
      let i = this.ticks
      e < i.length && (i = ba(i, e)),
      (this._labelSizes = t = this._computeLabelSizes(i, i.length))
    }
    return t
  }

  _computeLabelSizes (t, e) {
    const { ctx: i, _longestTextCache: n } = this
    const r = []
    const o = []
    let a = 0
    let l = 0
    let c
    let h
    let u
    let d
    let f
    let m
    let g
    let p
    let y
    let b
    let _
    for (c = 0; c < e; ++c) {
      if (
        ((d = t[c].label),
        (f = this._resolveTickFontOptions(c)),
        (i.font = m = f.string),
        (g = n[m] = n[m] || { data: {}, gc: [] }),
        (p = f.lineHeight),
        (y = b = 0),
        !N(d) && !$(d))
      ) {
        (y = _s(i, g.data, g.gc, y, d)), (b = p)
      } else if ($(d)) {
        for (h = 0, u = d.length; h < u; ++h) {
          (_ = d[h]),
          !N(_) &&
                            !$(_) &&
                            ((y = _s(i, g.data, g.gc, y, _)), (b += p))
        }
      }
      r.push(y), o.push(b), (a = Math.max(y, a)), (l = Math.max(b, l))
    }
    xu(n, e)
    const w = r.indexOf(a)
    const x = o.indexOf(l)
    const S = (k) => ({ width: r[k] || 0, height: o[k] || 0 })
    return {
      first: S(0),
      last: S(e - 1),
      widest: S(w),
      highest: S(x),
      widths: r,
      heights: o
    }
  }

  getLabelForValue (t) {
    return t
  }

  getPixelForValue (t, e) {
    return NaN
  }

  getValueForPixel (t) {}
  getPixelForTick (t) {
    const e = this.ticks
    return t < 0 || t > e.length - 1
      ? null
      : this.getPixelForValue(e[t].value)
  }

  getPixelForDecimal (t) {
    this._reversePixels && (t = 1 - t)
    const e = this._startPixel + t * this._length
    return Lo(this._alignToPixels ? te(this.chart, e, 0) : e)
  }

  getDecimalForPixel (t) {
    const e = (t - this._startPixel) / this._length
    return this._reversePixels ? 1 - e : e
  }

  getBasePixel () {
    return this.getPixelForValue(this.getBaseValue())
  }

  getBaseValue () {
    const { min: t, max: e } = this
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
  }

  getContext (t) {
    const e = this.ticks || []
    if (t >= 0 && t < e.length) {
      const i = e[t]
      return i.$context || (i.$context = wu(this.getContext(), t, i))
    }
    return (
      this.$context || (this.$context = _u(this.chart.getContext(), this))
    )
  }

  _tickSize () {
    const t = this.options.ticks
    const e = wt(this.labelRotation)
    const i = Math.abs(Math.cos(e))
    const n = Math.abs(Math.sin(e))
    const r = this._getLabelSizes()
    const o = t.autoSkipPadding || 0
    const a = r ? r.widest.width + o : 0
    const l = r ? r.highest.height + o : 0
    return this.isHorizontal()
      ? l * i > a * n
        ? a / i
        : l / n
      : l * n < a * i
        ? l / i
        : a / n
  }

  _isVisible () {
    const t = this.options.display
    return t !== 'auto' ? !!t : this.getMatchingVisibleMetas().length > 0
  }

  _computeGridLineItems (t) {
    const e = this.axis
    const i = this.chart
    const n = this.options
    const { grid: r, position: o } = n
    const a = r.offset
    const l = this.isHorizontal()
    const h = this.ticks.length + (a ? 1 : 0)
    const u = vs(r)
    const d = []
    const f = r.setContext(this.getContext())
    const m = f.drawBorder ? f.borderWidth : 0
    const g = m / 2
    const p = function (E) {
      return te(i, E, m)
    }
    let y
    let b
    let _
    let w
    let x
    let S
    let k
    let O
    let v
    let F
    let W
    let R
    if (o === 'top') {
      (y = p(this.bottom)),
      (S = this.bottom - u),
      (O = y - g),
      (F = p(t.top) + g),
      (R = t.bottom)
    } else if (o === 'bottom') {
      (y = p(this.top)),
      (F = t.top),
      (R = p(t.bottom) - g),
      (S = y + g),
      (O = this.top + u)
    } else if (o === 'left') {
      (y = p(this.right)),
      (x = this.right - u),
      (k = y - g),
      (v = p(t.left) + g),
      (W = t.right)
    } else if (o === 'right') {
      (y = p(this.left)),
      (v = t.left),
      (W = p(t.right) - g),
      (x = y + g),
      (k = this.left + u)
    } else if (e === 'x') {
      if (o === 'center') y = p((t.top + t.bottom) / 2 + 0.5)
      else if (A(o)) {
        const E = Object.keys(o)[0]
        const et = o[E]
        y = p(this.chart.scales[E].getPixelForValue(et))
      }
      (F = t.top), (R = t.bottom), (S = y + g), (O = S + u)
    } else if (e === 'y') {
      if (o === 'center') y = p((t.left + t.right) / 2)
      else if (A(o)) {
        const E = Object.keys(o)[0]
        const et = o[E]
        y = p(this.chart.scales[E].getPixelForValue(et))
      }
      (x = y - g), (k = x - u), (v = t.left), (W = t.right)
    }
    const tt = C(n.ticks.maxTicksLimit, h)
    const ct = Math.max(1, Math.ceil(h / tt))
    for (b = 0; b < h; b += ct) {
      const E = r.setContext(this.getContext(b))
      const et = E.lineWidth
      const Q = E.color
      const fe = E.borderDash || []
      const xn = E.borderDashOffset
      const Oe = E.tickWidth
      const yi = E.tickColor
      const De = E.tickBorderDash || []
      const ps = E.tickBorderDashOffset;
      (_ = bu(this, b, a)),
      _ !== void 0 &&
                    ((w = te(i, _, et)),
                    l ? (x = k = v = W = w) : (S = O = F = R = w),
                    d.push({
                      tx1: x,
                      ty1: S,
                      tx2: k,
                      ty2: O,
                      x1: v,
                      y1: F,
                      x2: W,
                      y2: R,
                      width: et,
                      color: Q,
                      borderDash: fe,
                      borderDashOffset: xn,
                      tickWidth: Oe,
                      tickColor: yi,
                      tickBorderDash: De,
                      tickBorderDashOffset: ps
                    }))
    }
    return (this._ticksLength = h), (this._borderValue = y), d
  }

  _computeLabelItems (t) {
    const e = this.axis
    const i = this.options
    const { position: n, ticks: r } = i
    const o = this.isHorizontal()
    const a = this.ticks
    const { align: l, crossAlign: c, padding: h, mirror: u } = r
    const d = vs(i.grid)
    const f = d + h
    const m = u ? -h : f
    const g = -wt(this.labelRotation)
    const p = []
    let y
    let b
    let _
    let w
    let x
    let S
    let k
    let O
    let v
    let F
    let W
    let R
    let tt = 'middle'
    if (n === 'top') {
      (S = this.bottom - m), (k = this._getXAxisLabelAlignment())
    } else if (n === 'bottom') {
      (S = this.top + m), (k = this._getXAxisLabelAlignment())
    } else if (n === 'left') {
      const E = this._getYAxisLabelAlignment(d);
      (k = E.textAlign), (x = E.x)
    } else if (n === 'right') {
      const E = this._getYAxisLabelAlignment(d);
      (k = E.textAlign), (x = E.x)
    } else if (e === 'x') {
      if (n === 'center') S = (t.top + t.bottom) / 2 + f
      else if (A(n)) {
        const E = Object.keys(n)[0]
        const et = n[E]
        S = this.chart.scales[E].getPixelForValue(et) + f
      }
      k = this._getXAxisLabelAlignment()
    } else if (e === 'y') {
      if (n === 'center') x = (t.left + t.right) / 2 - f
      else if (A(n)) {
        const E = Object.keys(n)[0]
        const et = n[E]
        x = this.chart.scales[E].getPixelForValue(et)
      }
      k = this._getYAxisLabelAlignment(d).textAlign
    }
    e === 'y' &&
            (l === 'start' ? (tt = 'top') : l === 'end' && (tt = 'bottom'))
    const ct = this._getLabelSizes()
    for (y = 0, b = a.length; y < b; ++y) {
      (_ = a[y]), (w = _.label)
      const E = r.setContext(this.getContext(y));
      (O = this.getPixelForTick(y) + r.labelOffset),
      (v = this._resolveTickFontOptions(y)),
      (F = v.lineHeight),
      (W = $(w) ? w.length : 1)
      const et = W / 2
      const Q = E.color
      const fe = E.textStrokeColor
      const xn = E.textStrokeWidth
      let Oe = k
      o
        ? ((x = O),
          k === 'inner' &&
                      (y === b - 1
                        ? (Oe = this.options.reverse ? 'left' : 'right')
                        : y === 0
                          ? (Oe = this.options.reverse ? 'right' : 'left')
                          : (Oe = 'center')),
          n === 'top'
            ? c === 'near' || g !== 0
              ? (R = -W * F + F / 2)
              : c === 'center'
                ? (R = -ct.highest.height / 2 - et * F + F)
                : (R = -ct.highest.height + F / 2)
            : c === 'near' || g !== 0
              ? (R = F / 2)
              : c === 'center'
                ? (R = ct.highest.height / 2 - et * F)
                : (R = ct.highest.height - W * F),
          u && (R *= -1))
        : ((S = O), (R = ((1 - W) * F) / 2))
      let yi
      if (E.showLabelBackdrop) {
        const De = at(E.backdropPadding)
        const ps = ct.heights[y]
        const _n = ct.widths[y]
        let wn = S + R - De.top
        let Sn = x - De.left
        switch (tt) {
          case 'middle':
            wn -= ps / 2
            break
          case 'bottom':
            wn -= ps
            break
        }
        switch (k) {
          case 'center':
            Sn -= _n / 2
            break
          case 'right':
            Sn -= _n
            break
        }
        yi = {
          left: Sn,
          top: wn,
          width: _n + De.width,
          height: ps + De.height,
          color: E.backdropColor
        }
      }
      p.push({
        rotation: g,
        label: w,
        font: v,
        color: Q,
        strokeColor: fe,
        strokeWidth: xn,
        textOffset: R,
        textAlign: Oe,
        textBaseline: tt,
        translation: [x, S],
        backdrop: yi
      })
    }
    return p
  }

  _getXAxisLabelAlignment () {
    const { position: t, ticks: e } = this.options
    if (-wt(this.labelRotation)) return t === 'top' ? 'left' : 'right'
    let n = 'center'
    return (
      e.align === 'start'
        ? (n = 'left')
        : e.align === 'end'
          ? (n = 'right')
          : e.align === 'inner' && (n = 'inner'),
      n
    )
  }

  _getYAxisLabelAlignment (t) {
    const {
      position: e,
      ticks: { crossAlign: i, mirror: n, padding: r }
    } = this.options
    const o = this._getLabelSizes()
    const a = t + r
    const l = o.widest.width
    let c
    let h
    return (
      e === 'left'
        ? n
          ? ((h = this.right + r),
            i === 'near'
              ? (c = 'left')
              : i === 'center'
                ? ((c = 'center'), (h += l / 2))
                : ((c = 'right'), (h += l)))
          : ((h = this.right - a),
            i === 'near'
              ? (c = 'right')
              : i === 'center'
                ? ((c = 'center'), (h -= l / 2))
                : ((c = 'left'), (h = this.left)))
        : e === 'right'
          ? n
            ? ((h = this.left + r),
              i === 'near'
                ? (c = 'right')
                : i === 'center'
                  ? ((c = 'center'), (h -= l / 2))
                  : ((c = 'left'), (h -= l)))
            : ((h = this.left + a),
              i === 'near'
                ? (c = 'left')
                : i === 'center'
                  ? ((c = 'center'), (h += l / 2))
                  : ((c = 'right'), (h = this.right)))
          : (c = 'right'),
      { textAlign: c, x: h }
    )
  }

  _computeLabelArea () {
    if (this.options.ticks.mirror) return
    const t = this.chart
    const e = this.options.position
    if (e === 'left' || e === 'right') {
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      }
    }
    if (e === 'top' || e === 'bottom') {
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      }
    }
  }

  drawBackground () {
    const {
      ctx: t,
      options: { backgroundColor: e },
      left: i,
      top: n,
      width: r,
      height: o
    } = this
    e && (t.save(), (t.fillStyle = e), t.fillRect(i, n, r, o), t.restore())
  }

  getLineWidthForValue (t) {
    const e = this.options.grid
    if (!this._isVisible() || !e.display) return 0
    const n = this.ticks.findIndex((r) => r.value === t)
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0
  }

  drawGrid (t) {
    const e = this.options.grid
    const i = this.ctx
    const n =
            this._gridLineItems ||
            (this._gridLineItems = this._computeGridLineItems(t))
    let r
    let o
    const a = (l, c, h) => {
      !h.width ||
                !h.color ||
                (i.save(),
                (i.lineWidth = h.width),
                (i.strokeStyle = h.color),
                i.setLineDash(h.borderDash || []),
                (i.lineDashOffset = h.borderDashOffset),
                i.beginPath(),
                i.moveTo(l.x, l.y),
                i.lineTo(c.x, c.y),
                i.stroke(),
                i.restore())
    }
    if (e.display) {
      for (r = 0, o = n.length; r < o; ++r) {
        const l = n[r]
        e.drawOnChartArea &&
                    a({ x: l.x1, y: l.y1 }, { x: l.x2, y: l.y2 }, l),
        e.drawTicks &&
                        a(
                          { x: l.tx1, y: l.ty1 },
                          { x: l.tx2, y: l.ty2 },
                          {
                            color: l.tickColor,
                            width: l.tickWidth,
                            borderDash: l.tickBorderDash,
                            borderDashOffset: l.tickBorderDashOffset
                          }
                        )
      }
    }
  }

  drawBorder () {
    const {
      chart: t,
      ctx: e,
      options: { grid: i }
    } = this
    const n = i.setContext(this.getContext())
    const r = i.drawBorder ? n.borderWidth : 0
    if (!r) return
    const o = i.setContext(this.getContext(0)).lineWidth
    const a = this._borderValue
    let l
    let c
    let h
    let u
    this.isHorizontal()
      ? ((l = te(t, this.left, r) - r / 2),
        (c = te(t, this.right, o) + o / 2),
        (h = u = a))
      : ((h = te(t, this.top, r) - r / 2),
        (u = te(t, this.bottom, o) + o / 2),
        (l = c = a)),
    e.save(),
    (e.lineWidth = n.borderWidth),
    (e.strokeStyle = n.borderColor),
    e.beginPath(),
    e.moveTo(l, h),
    e.lineTo(c, u),
    e.stroke(),
    e.restore()
  }

  drawLabels (t) {
    if (!this.options.ticks.display) return
    const i = this.ctx
    const n = this._computeLabelArea()
    n && ks(i, n)
    const r =
            this._labelItems || (this._labelItems = this._computeLabelItems(t))
    let o
    let a
    for (o = 0, a = r.length; o < a; ++o) {
      const l = r[o]
      const c = l.font
      const h = l.label
      l.backdrop &&
                ((i.fillStyle = l.backdrop.color),
                i.fillRect(
                  l.backdrop.left,
                  l.backdrop.top,
                  l.backdrop.width,
                  l.backdrop.height
                ))
      const u = l.textOffset
      ee(i, h, 0, u, c, l)
    }
    n && Ms(i)
  }

  drawTitle () {
    const {
      ctx: t,
      options: { position: e, title: i, reverse: n }
    } = this
    if (!i.display) return
    const r = st(i.font)
    const o = at(i.padding)
    const a = i.align
    let l = r.lineHeight / 2
    e === 'bottom' || e === 'center' || A(e)
      ? ((l += o.bottom),
        $(i.text) && (l += r.lineHeight * (i.text.length - 1)))
      : (l += o.top)
    const {
      titleX: c,
      titleY: h,
      maxWidth: u,
      rotation: d
    } = ku(this, l, e, a)
    ee(t, i.text, 0, 0, r, {
      color: i.color,
      maxWidth: u,
      rotation: d,
      textAlign: Su(a, e, n),
      textBaseline: 'middle',
      translation: [c, h]
    })
  }

  draw (t) {
    this._isVisible() &&
            (this.drawBackground(),
            this.drawGrid(t),
            this.drawBorder(),
            this.drawTitle(),
            this.drawLabels(t))
  }

  _layers () {
    const t = this.options
    const e = (t.ticks && t.ticks.z) || 0
    const i = C(t.grid && t.grid.z, -1)
    return !this._isVisible() || this.draw !== Yt.prototype.draw
      ? [
          {
            z: e,
            draw: (n) => {
              this.draw(n)
            }
          }
        ]
      : [
          {
            z: i,
            draw: (n) => {
              this.drawBackground(),
              this.drawGrid(n),
              this.drawTitle()
            }
          },
          {
            z: i + 1,
            draw: () => {
              this.drawBorder()
            }
          },
          {
            z: e,
            draw: (n) => {
              this.drawLabels(n)
            }
          }
        ]
  }

  getMatchingVisibleMetas (t) {
    const e = this.chart.getSortedVisibleDatasetMetas()
    const i = this.axis + 'AxisID'
    const n = []
    let r
    let o
    for (r = 0, o = e.length; r < o; ++r) {
      const a = e[r]
      a[i] === this.id && (!t || a.type === t) && n.push(a)
    }
    return n
  }

  _resolveTickFontOptions (t) {
    const e = this.options.ticks.setContext(this.getContext(t))
    return st(e.font)
  }

  _maxDigits () {
    const t = this._resolveTickFontOptions(0).lineHeight
    return (this.isHorizontal() ? this.width : this.height) / t
  }
}
const Be = class {
  constructor (t, e, i) {
    (this.type = t),
    (this.scope = e),
    (this.override = i),
    (this.items = Object.create(null))
  }

  isForType (t) {
    return Object.prototype.isPrototypeOf.call(
      this.type.prototype,
      t.prototype
    )
  }

  register (t) {
    const e = Object.getPrototypeOf(t)
    let i
    vu(e) && (i = this.register(e))
    const n = this.items
    const r = t.id
    const o = this.scope + '.' + r
    if (!r) throw new Error('class does not have id: ' + t)
    return (
      r in n ||
                ((n[r] = t),
                Mu(t, o, i),
                this.override && L.override(t.id, t.overrides)),
      o
    )
  }

  get (t) {
    return this.items[t]
  }

  unregister (t) {
    const e = this.items
    const i = t.id
    const n = this.scope
    i in e && delete e[i],
    n && i in L[n] && (delete L[n][i], this.override && delete Qt[i])
  }
}
function Mu (s, t, e) {
  const i = Ie(Object.create(null), [
    e ? L.get(e) : {},
    L.get(t),
    s.defaults
  ])
  L.set(t, i),
  s.defaultRoutes && Tu(t, s.defaultRoutes),
  s.descriptors && L.describe(t, s.descriptors)
}
function Tu (s, t) {
  Object.keys(t).forEach((e) => {
    const i = e.split('.')
    const n = i.pop()
    const r = [s].concat(i).join('.')
    const o = t[e].split('.')
    const a = o.pop()
    const l = o.join('.')
    L.route(r, n, l, a)
  })
}
function vu (s) {
  return 'id' in s && 'defaults' in s
}
const pr = class {
  constructor () {
    (this.controllers = new Be(pt, 'datasets', !0)),
    (this.elements = new Be(yt, 'elements')),
    (this.plugins = new Be(Object, 'plugins')),
    (this.scales = new Be(Yt, 'scales')),
    (this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ])
  }

  add (...t) {
    this._each('register', t)
  }

  remove (...t) {
    this._each('unregister', t)
  }

  addControllers (...t) {
    this._each('register', t, this.controllers)
  }

  addElements (...t) {
    this._each('register', t, this.elements)
  }

  addPlugins (...t) {
    this._each('register', t, this.plugins)
  }

  addScales (...t) {
    this._each('register', t, this.scales)
  }

  getController (t) {
    return this._get(t, this.controllers, 'controller')
  }

  getElement (t) {
    return this._get(t, this.elements, 'element')
  }

  getPlugin (t) {
    return this._get(t, this.plugins, 'plugin')
  }

  getScale (t) {
    return this._get(t, this.scales, 'scale')
  }

  removeControllers (...t) {
    this._each('unregister', t, this.controllers)
  }

  removeElements (...t) {
    this._each('unregister', t, this.elements)
  }

  removePlugins (...t) {
    this._each('unregister', t, this.plugins)
  }

  removeScales (...t) {
    this._each('unregister', t, this.scales)
  }

  _each (t, e, i) {
    [...e].forEach((n) => {
      const r = i || this._getRegistryForType(n)
      i || r.isForType(n) || (r === this.plugins && n.id)
        ? this._exec(t, r, n)
        : H(n, (o) => {
          const a = i || this._getRegistryForType(o)
          this._exec(t, a, o)
        })
    })
  }

  _exec (t, e, i) {
    const n = Oi(t)
    j(i['before' + n], [], i), e[t](i), j(i['after' + n], [], i)
  }

  _getRegistryForType (t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const i = this._typedRegistries[e]
      if (i.isForType(t)) return i
    }
    return this.plugins
  }

  _get (t, e, i) {
    const n = e.get(t)
    if (n === void 0) {
      throw new Error('"' + t + '" is not a registered ' + i + '.')
    }
    return n
  }
}
const Rt = new pr()
const qe = class extends pt {
  update (t) {
    const e = this._cachedMeta
    const { data: i = [] } = e
    const n = this.chart._animationsDisabled
    let { start: r, count: o } = zn(e, i, n)
    if (
      ((this._drawStart = r),
      (this._drawCount = o),
      Vn(e) && ((r = 0), (o = i.length)),
      this.options.showLine)
    ) {
      const { dataset: a, _dataset: l } = e;
      (a._chart = this.chart),
      (a._datasetIndex = this.index),
      (a._decimated = !!l._decimated),
      (a.points = i)
      const c = this.resolveDatasetElementOptions(t);
      (c.segment = this.options.segment),
      this.updateElement(a, void 0, { animated: !n, options: c }, t)
    }
    this.updateElements(i, r, o, t)
  }

  addElements () {
    const { showLine: t } = this.options
    !this.datasetElementType &&
            t &&
            (this.datasetElementType = Rt.getElement('line')),
    super.addElements()
  }

  updateElements (t, e, i, n) {
    const r = n === 'reset'
    const {
      iScale: o,
      vScale: a,
      _stacked: l,
      _dataset: c
    } = this._cachedMeta
    const h = this.resolveDataElementOptions(e, n)
    const u = this.getSharedOptions(h)
    const d = this.includeOptions(n, u)
    const f = o.axis
    const m = a.axis
    const { spanGaps: g, segment: p } = this.options
    const y = pe(g) ? g : Number.POSITIVE_INFINITY
    const b = this.chart._animationsDisabled || r || n === 'none'
    let _ = e > 0 && this.getParsed(e - 1)
    for (let w = e; w < e + i; ++w) {
      const x = t[w]
      const S = this.getParsed(w)
      const k = b ? x : {}
      const O = N(S[m])
      const v = (k[f] = o.getPixelForValue(S[f], w))
      const F = (k[m] =
                r || O
                  ? a.getBasePixel()
                  : a.getPixelForValue(
                    l ? this.applyStack(a, S, l) : S[m],
                    w
                  ));
      (k.skip = isNaN(v) || isNaN(F) || O),
      (k.stop = w > 0 && Math.abs(S[f] - _[f]) > y),
      p && ((k.parsed = S), (k.raw = c.data[w])),
      d &&
                    (k.options =
                        u ||
                        this.resolveDataElementOptions(
                          w,
                          x.active ? 'active' : n
                        )),
      b || this.updateElement(x, w, k, n),
      (_ = S)
    }
    this.updateSharedOptions(u, n, h)
  }

  getMaxOverflow () {
    const t = this._cachedMeta
    const e = t.data || []
    if (!this.options.showLine) {
      let a = 0
      for (let l = e.length - 1; l >= 0; --l) {
        a = Math.max(
          a,
          e[l].size(this.resolveDataElementOptions(l)) / 2
        )
      }
      return a > 0 && a
    }
    const i = t.dataset
    const n = (i.options && i.options.borderWidth) || 0
    if (!e.length) return n
    const r = e[0].size(this.resolveDataElementOptions(0))
    const o = e[e.length - 1].size(
      this.resolveDataElementOptions(e.length - 1)
    )
    return Math.max(n, r, o) / 2
  }
}
qe.id = 'scatter'
qe.defaults = {
  datasetElementType: !1,
  dataElementType: 'point',
  showLine: !1,
  fill: !1
}
qe.overrides = {
  interaction: { mode: 'point' },
  plugins: {
    tooltip: {
      callbacks: {
        title () {
          return ''
        },
        label (s) {
          return '(' + s.label + ', ' + s.formattedValue + ')'
        }
      }
    }
  },
  scales: { x: { type: 'linear' }, y: { type: 'linear' } }
}
const Ou = Object.freeze({
  __proto__: null,
  BarController: $e,
  BubbleController: je,
  DoughnutController: oe,
  LineController: Ue,
  PolarAreaController: Ye,
  PieController: Fs,
  RadarController: Ze,
  ScatterController: qe
})
function be () {
  throw new Error(
    'This method is not implemented: Check that a complete date adapter is provided.'
  )
}
const As = class {
  constructor (t) {
    this.options = t || {}
  }

  init (t) {}
  formats () {
    return be()
  }

  parse (t, e) {
    return be()
  }

  format (t, e) {
    return be()
  }

  add (t, e, i) {
    return be()
  }

  diff (t, e, i) {
    return be()
  }

  startOf (t, e, i) {
    return be()
  }

  endOf (t, e) {
    return be()
  }
}
As.override = function (s) {
  Object.assign(As.prototype, s)
}
const Or = { _date: As }
function Du (s, t, e, i) {
  const { controller: n, data: r, _sorted: o } = s
  const a = n._cachedMeta.iScale
  if (a && t === a.axis && t !== 'r' && o && r.length) {
    const l = a._reversePixels ? Po : Ft
    if (i) {
      if (n._sharedOptions) {
        const c = r[0]
        const h = typeof c.getRange === 'function' && c.getRange(t)
        if (h) {
          const u = l(r, t, e - h)
          const d = l(r, t, e + h)
          return { lo: u.lo, hi: d.hi }
        }
      }
    } else return l(r, t, e)
  }
  return { lo: 0, hi: r.length - 1 }
}
function Vs (s, t, e, i, n) {
  const r = s.getSortedVisibleDatasetMetas()
  const o = e[t]
  for (let a = 0, l = r.length; a < l; ++a) {
    const { index: c, data: h } = r[a]
    const { lo: u, hi: d } = Du(r[a], t, o, n)
    for (let f = u; f <= d; ++f) {
      const m = h[f]
      m.skip || i(m, c, f)
    }
  }
}
function Eu (s) {
  const t = s.indexOf('x') !== -1
  const e = s.indexOf('y') !== -1
  return function (i, n) {
    const r = t ? Math.abs(i.x - n.x) : 0
    const o = e ? Math.abs(i.y - n.y) : 0
    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2))
  }
}
function lr (s, t, e, i, n) {
  const r = []
  return (
    (!n && !s.isPointInArea(t)) ||
            Vs(
              s,
              e,
              t,
              function (a, l, c) {
                (!n && !Ae(a, s.chartArea, 0)) ||
                        (a.inRange(t.x, t.y, i) &&
                            r.push({ element: a, datasetIndex: l, index: c }))
              },
              !0
            ),
    r
  )
}
function Cu (s, t, e, i) {
  const n = []
  function r (o, a, l) {
    const { startAngle: c, endAngle: h } = o.getProps(
      ['startAngle', 'endAngle'],
      i
    )
    const { angle: u } = Ln(o, { x: t.x, y: t.y })
    Ne(u, c, h) && n.push({ element: o, datasetIndex: a, index: l })
  }
  return Vs(s, e, t, r), n
}
function Iu (s, t, e, i, n, r) {
  let o = []
  const a = Eu(e)
  let l = Number.POSITIVE_INFINITY
  function c (h, u, d) {
    const f = h.inRange(t.x, t.y, n)
    if (i && !f) return
    const m = h.getCenterPoint(n)
    if (!(!!r || s.isPointInArea(m)) && !f) return
    const p = a(t, m)
    p < l
      ? ((o = [{ element: h, datasetIndex: u, index: d }]), (l = p))
      : p === l && o.push({ element: h, datasetIndex: u, index: d })
  }
  return Vs(s, e, t, c), o
}
function cr (s, t, e, i, n, r) {
  return !r && !s.isPointInArea(t)
    ? []
    : e === 'r' && !i
      ? Cu(s, t, e, n)
      : Iu(s, t, e, i, n, r)
}
function _a (s, t, e, i, n) {
  const r = []
  const o = e === 'x' ? 'inXRange' : 'inYRange'
  let a = !1
  return (
    Vs(s, e, t, (l, c, h) => {
      l[o](t[e], n) &&
                (r.push({ element: l, datasetIndex: c, index: h }),
                (a = a || l.inRange(t.x, t.y, n)))
    }),
    i && !a ? [] : r
  )
}
const Fu = {
  evaluateInteractionItems: Vs,
  modes: {
    index (s, t, e, i) {
      const n = ie(t, s)
      const r = e.axis || 'x'
      const o = e.includeInvisible || !1
      const a = e.intersect ? lr(s, n, r, i, o) : cr(s, n, r, !1, i, o)
      const l = []
      return a.length
        ? (s.getSortedVisibleDatasetMetas().forEach((c) => {
            const h = a[0].index
            const u = c.data[h]
            u &&
                          !u.skip &&
                          l.push({
                            element: u,
                            datasetIndex: c.index,
                            index: h
                          })
          }),
          l)
        : []
    },
    dataset (s, t, e, i) {
      const n = ie(t, s)
      const r = e.axis || 'xy'
      const o = e.includeInvisible || !1
      let a = e.intersect ? lr(s, n, r, i, o) : cr(s, n, r, !1, i, o)
      if (a.length > 0) {
        const l = a[0].datasetIndex
        const c = s.getDatasetMeta(l).data
        a = []
        for (let h = 0; h < c.length; ++h) {
          a.push({ element: c[h], datasetIndex: l, index: h })
        }
      }
      return a
    },
    point (s, t, e, i) {
      const n = ie(t, s)
      const r = e.axis || 'xy'
      const o = e.includeInvisible || !1
      return lr(s, n, r, i, o)
    },
    nearest (s, t, e, i) {
      const n = ie(t, s)
      const r = e.axis || 'xy'
      const o = e.includeInvisible || !1
      return cr(s, n, r, e.intersect, i, o)
    },
    x (s, t, e, i) {
      const n = ie(t, s)
      return _a(s, n, 'x', e.intersect, i)
    },
    y (s, t, e, i) {
      const n = ie(t, s)
      return _a(s, n, 'y', e.intersect, i)
    }
  }
}
const el = ['left', 'top', 'right', 'bottom']
function Os (s, t) {
  return s.filter((e) => e.pos === t)
}
function wa (s, t) {
  return s.filter((e) => el.indexOf(e.pos) === -1 && e.box.axis === t)
}
function Ds (s, t) {
  return s.sort((e, i) => {
    const n = t ? i : e
    const r = t ? e : i
    return n.weight === r.weight ? n.index - r.index : n.weight - r.weight
  })
}
function Au (s) {
  const t = []
  let e
  let i
  let n
  let r
  let o
  let a
  for (e = 0, i = (s || []).length; e < i; ++e) {
    (n = s[e]),
    ({
      position: r,
      options: { stack: o, stackWeight: a = 1 }
    } = n),
    t.push({
      index: e,
      box: n,
      pos: r,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: o && r + o,
      stackWeight: a
    })
  }
  return t
}
function Lu (s) {
  const t = {}
  for (const e of s) {
    const { stack: i, pos: n, stackWeight: r } = e
    if (!i || !el.includes(n)) continue
    const o = t[i] || (t[i] = { count: 0, placed: 0, weight: 0, size: 0 })
    o.count++, (o.weight += r)
  }
  return t
}
function Pu (s, t) {
  const e = Lu(s)
  const { vBoxMaxWidth: i, hBoxMaxHeight: n } = t
  let r
  let o
  let a
  for (r = 0, o = s.length; r < o; ++r) {
    a = s[r]
    const { fullSize: l } = a.box
    const c = e[a.stack]
    const h = c && a.stackWeight / c.weight
    a.horizontal
      ? ((a.width = h ? h * i : l && t.availableWidth), (a.height = n))
      : ((a.width = i), (a.height = h ? h * n : l && t.availableHeight))
  }
  return e
}
function Ru (s) {
  const t = Au(s)
  const e = Ds(
    t.filter((c) => c.box.fullSize),
    !0
  )
  const i = Ds(Os(t, 'left'), !0)
  const n = Ds(Os(t, 'right'))
  const r = Ds(Os(t, 'top'), !0)
  const o = Ds(Os(t, 'bottom'))
  const a = wa(t, 'x')
  const l = wa(t, 'y')
  return {
    fullSize: e,
    leftAndTop: i.concat(r),
    rightAndBottom: n.concat(l).concat(o).concat(a),
    chartArea: Os(t, 'chartArea'),
    vertical: i.concat(n).concat(l),
    horizontal: r.concat(o).concat(a)
  }
}
function Sa (s, t, e, i) {
  return Math.max(s[e], t[e]) + Math.max(s[i], t[i])
}
function sl (s, t) {
  (s.top = Math.max(s.top, t.top)),
  (s.left = Math.max(s.left, t.left)),
  (s.bottom = Math.max(s.bottom, t.bottom)),
  (s.right = Math.max(s.right, t.right))
}
function Nu (s, t, e, i) {
  const { pos: n, box: r } = e
  const o = s.maxPadding
  if (!A(n)) {
    e.size && (s[n] -= e.size)
    const u = i[e.stack] || { size: 0, count: 1 };
    (u.size = Math.max(u.size, e.horizontal ? r.height : r.width)),
    (e.size = u.size / u.count),
    (s[n] += e.size)
  }
  r.getPadding && sl(o, r.getPadding())
  const a = Math.max(0, t.outerWidth - Sa(o, s, 'left', 'right'))
  const l = Math.max(0, t.outerHeight - Sa(o, s, 'top', 'bottom'))
  const c = a !== s.w
  const h = l !== s.h
  return (
    (s.w = a),
    (s.h = l),
    e.horizontal ? { same: c, other: h } : { same: h, other: c }
  )
}
function Wu (s) {
  const t = s.maxPadding
  function e (i) {
    const n = Math.max(t[i] - s[i], 0)
    return (s[i] += n), n
  }
  (s.y += e('top')), (s.x += e('left')), e('right'), e('bottom')
}
function zu (s, t) {
  const e = t.maxPadding
  function i (n) {
    const r = { left: 0, top: 0, right: 0, bottom: 0 }
    return (
      n.forEach((o) => {
        r[o] = Math.max(t[o], e[o])
      }),
      r
    )
  }
  return i(s ? ['left', 'right'] : ['top', 'bottom'])
}
function Cs (s, t, e, i) {
  const n = []
  let r
  let o
  let a
  let l
  let c
  let h
  for (r = 0, o = s.length, c = 0; r < o; ++r) {
    (a = s[r]),
    (l = a.box),
    l.update(a.width || t.w, a.height || t.h, zu(a.horizontal, t))
    const { same: u, other: d } = Nu(t, e, a, i);
    (c |= u && n.length), (h = h || d), l.fullSize || n.push(a)
  }
  return (c && Cs(n, t, e, i)) || h
}
function Wi (s, t, e, i, n) {
  (s.top = e),
  (s.left = t),
  (s.right = t + i),
  (s.bottom = e + n),
  (s.width = i),
  (s.height = n)
}
function ka (s, t, e, i) {
  const n = e.padding
  let { x: r, y: o } = t
  for (const a of s) {
    const l = a.box
    const c = i[a.stack] || { count: 1, placed: 0, weight: 1 }
    const h = a.stackWeight / c.weight || 1
    if (a.horizontal) {
      const u = t.w * h
      const d = c.size || l.height
      ft(c.start) && (o = c.start),
      l.fullSize
        ? Wi(l, n.left, o, e.outerWidth - n.right - n.left, d)
        : Wi(l, t.left + c.placed, o, u, d),
      (c.start = o),
      (c.placed += u),
      (o = l.bottom)
    } else {
      const u = t.h * h
      const d = c.size || l.width
      ft(c.start) && (r = c.start),
      l.fullSize
        ? Wi(l, r, n.top, d, e.outerHeight - n.bottom - n.top)
        : Wi(l, r, t.top + c.placed, d, u),
      (c.start = r),
      (c.placed += u),
      (r = l.right)
    }
  }
  (t.x = r), (t.y = o)
}
L.set('layout', {
  autoPadding: !0,
  padding: { top: 0, right: 0, bottom: 0, left: 0 }
})
const lt = {
  addBox (s, t) {
    s.boxes || (s.boxes = []),
    (t.fullSize = t.fullSize || !1),
    (t.position = t.position || 'top'),
    (t.weight = t.weight || 0),
    (t._layers =
                t._layers ||
                function () {
                  return [
                    {
                      z: 0,
                      draw (e) {
                        t.draw(e)
                      }
                    }
                  ]
                }),
    s.boxes.push(t)
  },
  removeBox (s, t) {
    const e = s.boxes ? s.boxes.indexOf(t) : -1
    e !== -1 && s.boxes.splice(e, 1)
  },
  configure (s, t, e) {
    (t.fullSize = e.fullSize),
    (t.position = e.position),
    (t.weight = e.weight)
  },
  update (s, t, e, i) {
    if (!s) return
    const n = at(s.options.layout.padding)
    const r = Math.max(t - n.width, 0)
    const o = Math.max(e - n.height, 0)
    const a = Ru(s.boxes)
    const l = a.vertical
    const c = a.horizontal
    H(s.boxes, (g) => {
      typeof g.beforeLayout === 'function' && g.beforeLayout()
    })
    const h =
            l.reduce(
              (g, p) =>
                p.box.options && p.box.options.display === !1 ? g : g + 1,
              0
            ) || 1
    const u = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: n,
      availableWidth: r,
      availableHeight: o,
      vBoxMaxWidth: r / 2 / h,
      hBoxMaxHeight: o / 2
    })
    const d = Object.assign({}, n)
    sl(d, at(i))
    const f = Object.assign(
      { maxPadding: d, w: r, h: o, x: n.left, y: n.top },
      n
    )
    const m = Pu(l.concat(c), u)
    Cs(a.fullSize, f, u, m),
    Cs(l, f, u, m),
    Cs(c, f, u, m) && Cs(l, f, u, m),
    Wu(f),
    ka(a.leftAndTop, f, u, m),
    (f.x += f.w),
    (f.y += f.h),
    ka(a.rightAndBottom, f, u, m),
    (s.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }),
    H(a.chartArea, (g) => {
      const p = g.box
      Object.assign(p, s.chartArea),
      p.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      })
    })
  }
}
const Ui = class {
  acquireContext (t, e) {}
  releaseContext (t) {
    return !1
  }

  addEventListener (t, e, i) {}
  removeEventListener (t, e, i) {}
  getDevicePixelRatio () {
    return 1
  }

  getMaximumSize (t, e, i, n) {
    return (
      (e = Math.max(0, e || t.width)),
      (i = i || t.height),
      { width: e, height: Math.max(0, n ? Math.floor(e / n) : i) }
    )
  }

  isAttached (t) {
    return !0
  }

  updateConfig (t) {}
}
const yr = class extends Ui {
  acquireContext (t) {
    return (t && t.getContext && t.getContext('2d')) || null
  }

  updateConfig (t) {
    t.options.animation = !1
  }
}
const $i = '$chartjs'
const Vu = {
  touchstart: 'mousedown',
  touchmove: 'mousemove',
  touchend: 'mouseup',
  pointerenter: 'mouseenter',
  pointerdown: 'mousedown',
  pointermove: 'mousemove',
  pointerup: 'mouseup',
  pointerleave: 'mouseout',
  pointerout: 'mouseout'
}
const Ma = (s) => s === null || s === ''
function Hu (s, t) {
  const e = s.style
  const i = s.getAttribute('height')
  const n = s.getAttribute('width')
  if (
    ((s[$i] = {
      initial: {
        height: i,
        width: n,
        style: { display: e.display, height: e.height, width: e.width }
      }
    }),
    (e.display = e.display || 'block'),
    (e.boxSizing = e.boxSizing || 'border-box'),
    Ma(n))
  ) {
    const r = tr(s, 'width')
    r !== void 0 && (s.width = r)
  }
  if (Ma(i)) {
    if (s.style.height === '') s.height = s.width / (t || 2)
    else {
      const r = tr(s, 'height')
      r !== void 0 && (s.height = r)
    }
  }
  return s
}
const il = sa ? { passive: !0 } : !1
function Bu (s, t, e) {
  s.addEventListener(t, e, il)
}
function $u (s, t, e) {
  s.canvas.removeEventListener(t, e, il)
}
function ju (s, t) {
  const e = Vu[s.type] || s.type
  const { x: i, y: n } = ie(s, t)
  return {
    type: e,
    chart: t,
    native: s,
    x: i !== void 0 ? i : null,
    y: n !== void 0 ? n : null
  }
}
function Yi (s, t) {
  for (const e of s) if (e === t || e.contains(t)) return !0
}
function Uu (s, t, e) {
  const i = s.canvas
  const n = new MutationObserver((r) => {
    let o = !1
    for (const a of r) {
      (o = o || Yi(a.addedNodes, i)), (o = o && !Yi(a.removedNodes, i))
    }
    o && e()
  })
  return n.observe(document, { childList: !0, subtree: !0 }), n
}
function Yu (s, t, e) {
  const i = s.canvas
  const n = new MutationObserver((r) => {
    let o = !1
    for (const a of r) {
      (o = o || Yi(a.removedNodes, i)), (o = o && !Yi(a.addedNodes, i))
    }
    o && e()
  })
  return n.observe(document, { childList: !0, subtree: !0 }), n
}
const Ls = new Map()
let Ta = 0
function nl () {
  const s = window.devicePixelRatio
  s !== Ta &&
        ((Ta = s),
        Ls.forEach((t, e) => {
          e.currentDevicePixelRatio !== s && t()
        }))
}
function Zu (s, t) {
  Ls.size || window.addEventListener('resize', nl), Ls.set(s, t)
}
function qu (s) {
  Ls.delete(s), Ls.size || window.removeEventListener('resize', nl)
}
function Gu (s, t, e) {
  const i = s.canvas
  const n = i && Pi(i)
  if (!n) return
  const r = Wn((a, l) => {
    const c = n.clientWidth
    e(a, l), c < n.clientWidth && e()
  }, window)
  const o = new ResizeObserver((a) => {
    const l = a[0]
    const c = l.contentRect.width
    const h = l.contentRect.height;
    (c === 0 && h === 0) || r(c, h)
  })
  return o.observe(n), Zu(s, r), o
}
function hr (s, t, e) {
  e && e.disconnect(), t === 'resize' && qu(s)
}
function Xu (s, t, e) {
  const i = s.canvas
  const n = Wn(
    (r) => {
      s.ctx !== null && e(ju(r, s))
    },
    s,
    (r) => {
      const o = r[0]
      return [o, o.offsetX, o.offsetY]
    }
  )
  return Bu(i, t, n), n
}
const br = class extends Ui {
  acquireContext (t, e) {
    const i = t && t.getContext && t.getContext('2d')
    return i && i.canvas === t ? (Hu(t, e), i) : null
  }

  releaseContext (t) {
    const e = t.canvas
    if (!e[$i]) return !1
    const i = e[$i].initial;
    ['height', 'width'].forEach((r) => {
      const o = i[r]
      N(o) ? e.removeAttribute(r) : e.setAttribute(r, o)
    })
    const n = i.style || {}
    return (
      Object.keys(n).forEach((r) => {
        e.style[r] = n[r]
      }),
      (e.width = e.width),
      delete e[$i],
      !0
    )
  }

  addEventListener (t, e, i) {
    this.removeEventListener(t, e)
    const n = t.$proxies || (t.$proxies = {})
    const o = { attach: Uu, detach: Yu, resize: Gu }[e] || Xu
    n[e] = o(t, e, i)
  }

  removeEventListener (t, e) {
    const i = t.$proxies || (t.$proxies = {})
    const n = i[e]
    if (!n) return;
    (({ attach: hr, detach: hr, resize: hr })[e] || $u)(t, e, n),
    (i[e] = void 0)
  }

  getDevicePixelRatio () {
    return window.devicePixelRatio
  }

  getMaximumSize (t, e, i, n) {
    return ea(t, e, i, n)
  }

  isAttached (t) {
    const e = Pi(t)
    return !!(e && e.isConnected)
  }
}
function Ku (s) {
  return !Jn() ||
        (typeof OffscreenCanvas < 'u' && s instanceof OffscreenCanvas)
    ? yr
    : br
}
const xr = class {
  constructor () {
    this._init = []
  }

  notify (t, e, i, n) {
    e === 'beforeInit' &&
            ((this._init = this._createDescriptors(t, !0)),
            this._notify(this._init, t, 'install'))
    const r = n ? this._descriptors(t).filter(n) : this._descriptors(t)
    const o = this._notify(r, t, e, i)
    return (
      e === 'afterDestroy' &&
                (this._notify(r, t, 'stop'),
                this._notify(this._init, t, 'uninstall')),
      o
    )
  }

  _notify (t, e, i, n) {
    n = n || {}
    for (const r of t) {
      const o = r.plugin
      const a = o[i]
      const l = [e, n, r.options]
      if (j(a, l, o) === !1 && n.cancelable) return !1
    }
    return !0
  }

  invalidate () {
    N(this._cache) ||
            ((this._oldCache = this._cache), (this._cache = void 0))
  }

  _descriptors (t) {
    if (this._cache) return this._cache
    const e = (this._cache = this._createDescriptors(t))
    return this._notifyStateChanges(t), e
  }

  _createDescriptors (t, e) {
    const i = t && t.config
    const n = C(i.options && i.options.plugins, {})
    const r = Ju(i)
    return n === !1 && !e ? [] : td(t, r, n, e)
  }

  _notifyStateChanges (t) {
    const e = this._oldCache || []
    const i = this._cache
    const n = (r, o) =>
      r.filter((a) => !o.some((l) => a.plugin.id === l.plugin.id))
    this._notify(n(e, i), t, 'stop'), this._notify(n(i, e), t, 'start')
  }
}
function Ju (s) {
  const t = {}
  const e = []
  const i = Object.keys(Rt.plugins.items)
  for (let r = 0; r < i.length; r++) e.push(Rt.getPlugin(i[r]))
  const n = s.plugins || []
  for (let r = 0; r < n.length; r++) {
    const o = n[r]
    e.indexOf(o) === -1 && (e.push(o), (t[o.id] = !0))
  }
  return { plugins: e, localIds: t }
}
function Qu (s, t) {
  return !t && s === !1 ? null : s === !0 ? {} : s
}
function td (s, { plugins: t, localIds: e }, i, n) {
  const r = []
  const o = s.getContext()
  for (const a of t) {
    const l = a.id
    const c = Qu(i[l], n)
    c !== null &&
            r.push({
              plugin: a,
              options: ed(s.config, { plugin: a, local: e[l] }, c, o)
            })
  }
  return r
}
function ed (s, { plugin: t, local: e }, i, n) {
  const r = s.pluginScopeKeys(t)
  const o = s.getOptionScopes(i, r)
  return (
    e && t.defaults && o.push(t.defaults),
    s.createResolver(o, n, [''], {
      scriptable: !1,
      indexable: !1,
      allKeys: !0
    })
  )
}
function _r (s, t) {
  const e = L.datasets[s] || {}
  return (
    ((t.datasets || {})[s] || {}).indexAxis ||
        t.indexAxis ||
        e.indexAxis ||
        'x'
  )
}
function sd (s, t) {
  let e = s
  return (
    s === '_index_'
      ? (e = t)
      : s === '_value_' && (e = t === 'x' ? 'y' : 'x'),
    e
  )
}
function id (s, t) {
  return s === t ? '_index_' : '_value_'
}
function nd (s) {
  if (s === 'top' || s === 'bottom') return 'x'
  if (s === 'left' || s === 'right') return 'y'
}
function wr (s, t) {
  return s === 'x' || s === 'y'
    ? s
    : t.axis || nd(t.position) || s.charAt(0).toLowerCase()
}
function rd (s, t) {
  const e = Qt[s.type] || { scales: {} }
  const i = t.scales || {}
  const n = _r(s.type, t)
  const r = Object.create(null)
  const o = Object.create(null)
  return (
    Object.keys(i).forEach((a) => {
      const l = i[a]
      if (!A(l)) {
        return console.error(
                    `Invalid scale configuration for scale: ${a}`
        )
      }
      if (l._proxy) {
        return console.warn(
                    `Ignoring resolver passed as options for scale: ${a}`
        )
      }
      const c = wr(a, l)
      const h = id(c, n)
      const u = e.scales || {};
      (r[c] = r[c] || a),
      (o[a] = Pe(Object.create(null), [{ axis: c }, l, u[c], u[h]]))
    }),
    s.data.datasets.forEach((a) => {
      const l = a.type || s.type
      const c = a.indexAxis || _r(l, t)
      const u = (Qt[l] || {}).scales || {}
      Object.keys(u).forEach((d) => {
        const f = sd(d, c)
        const m = a[f + 'AxisID'] || r[f] || f;
        (o[m] = o[m] || Object.create(null)),
        Pe(o[m], [{ axis: f }, i[m], u[d]])
      })
    }),
    Object.keys(o).forEach((a) => {
      const l = o[a]
      Pe(l, [L.scales[l.type], L.scale])
    }),
    o
  )
}
function rl (s) {
  const t = s.options || (s.options = {});
  (t.plugins = C(t.plugins, {})), (t.scales = rd(s, t))
}
function ol (s) {
  return (
    (s = s || {}),
    (s.datasets = s.datasets || []),
    (s.labels = s.labels || []),
    s
  )
}
function od (s) {
  return (s = s || {}), (s.data = ol(s.data)), rl(s), s
}
const va = new Map()
const al = new Set()
function zi (s, t) {
  let e = va.get(s)
  return e || ((e = t()), va.set(s, e), al.add(e)), e
}
const Es = (s, t, e) => {
  const i = Bt(t, e)
  i !== void 0 && s.add(i)
}
const Sr = class {
  constructor (t) {
    (this._config = od(t)),
    (this._scopeCache = new Map()),
    (this._resolverCache = new Map())
  }

  get platform () {
    return this._config.platform
  }

  get type () {
    return this._config.type
  }

  set type (t) {
    this._config.type = t
  }

  get data () {
    return this._config.data
  }

  set data (t) {
    this._config.data = ol(t)
  }

  get options () {
    return this._config.options
  }

  set options (t) {
    this._config.options = t
  }

  get plugins () {
    return this._config.plugins
  }

  update () {
    const t = this._config
    this.clearCache(), rl(t)
  }

  clearCache () {
    this._scopeCache.clear(), this._resolverCache.clear()
  }

  datasetScopeKeys (t) {
    return zi(t, () => [[`datasets.${t}`, '']])
  }

  datasetAnimationScopeKeys (t, e) {
    return zi(`${t}.transition.${e}`, () => [
      [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
      [`datasets.${t}`, '']
    ])
  }

  datasetElementScopeKeys (t, e) {
    return zi(`${t}-${e}`, () => [
      [
                `datasets.${t}.elements.${e}`,
                `datasets.${t}`,
                `elements.${e}`,
                ''
      ]
    ])
  }

  pluginScopeKeys (t) {
    const e = t.id
    const i = this.type
    return zi(`${i}-plugin-${e}`, () => [
      [`plugins.${e}`, ...(t.additionalOptionScopes || [])]
    ])
  }

  _cachedScopes (t, e) {
    const i = this._scopeCache
    let n = i.get(t)
    return (!n || e) && ((n = new Map()), i.set(t, n)), n
  }

  getOptionScopes (t, e, i) {
    const { options: n, type: r } = this
    const o = this._cachedScopes(t, i)
    const a = o.get(e)
    if (a) return a
    const l = new Set()
    e.forEach((h) => {
      t && (l.add(t), h.forEach((u) => Es(l, t, u))),
      h.forEach((u) => Es(l, n, u)),
      h.forEach((u) => Es(l, Qt[r] || {}, u)),
      h.forEach((u) => Es(l, L, u)),
      h.forEach((u) => Es(l, Ii, u))
    })
    const c = Array.from(l)
    return (
      c.length === 0 && c.push(Object.create(null)),
      al.has(e) && o.set(e, c),
      c
    )
  }

  chartOptionScopes () {
    const { options: t, type: e } = this
    return [t, Qt[e] || {}, L.datasets[e] || {}, { type: e }, L, Ii]
  }

  resolveNamedOptions (t, e, i, n = ['']) {
    const r = { $shared: !0 }
    const { resolver: o, subPrefixes: a } = Oa(this._resolverCache, t, n)
    let l = o
    if (ld(o, e)) {
      (r.$shared = !1), (i = Ht(i) ? i() : i)
      const c = this.createResolver(t, i, a)
      l = ge(o, i, c)
    }
    for (const c of e) r[c] = l[c]
    return r
  }

  createResolver (t, e, i = [''], n) {
    const { resolver: r } = Oa(this._resolverCache, t, i)
    return A(e) ? ge(r, e, void 0, n) : r
  }
}
function Oa (s, t, e) {
  let i = s.get(t)
  i || ((i = new Map()), s.set(t, i))
  const n = e.join()
  let r = i.get(n)
  return (
    r ||
            ((r = {
              resolver: Li(t, e),
              subPrefixes: e.filter(
                (a) => !a.toLowerCase().includes('hover')
              )
            }),
            i.set(n, r)),
    r
  )
}
const ad = (s) =>
  A(s) && Object.getOwnPropertyNames(s).reduce((t, e) => t || Ht(s[e]), !1)
function ld (s, t) {
  const { isScriptable: e, isIndexable: i } = qn(s)
  for (const n of t) {
    const r = e(n)
    const o = i(n)
    const a = (o || r) && s[n]
    if ((r && (Ht(a) || ad(a))) || (o && $(a))) return !0
  }
  return !1
}
const cd = '3.9.1'
const hd = ['top', 'bottom', 'left', 'right', 'chartArea']
function Da (s, t) {
  return s === 'top' || s === 'bottom' || (hd.indexOf(s) === -1 && t === 'x')
}
function Ea (s, t) {
  return function (e, i) {
    return e[s] === i[s] ? e[t] - i[t] : e[s] - i[s]
  }
}
function Ca (s) {
  const t = s.chart
  const e = t.options.animation
  t.notifyPlugins('afterRender'), j(e && e.onComplete, [s], t)
}
function ud (s) {
  const t = s.chart
  const e = t.options.animation
  j(e && e.onProgress, [s], t)
}
function ll (s) {
  return (
    Jn() && typeof s === 'string'
      ? (s = document.getElementById(s))
      : s && s.length && (s = s[0]),
    s && s.canvas && (s = s.canvas),
    s
  )
}
const Zi = {}
const cl = (s) => {
  const t = ll(s)
  return Object.values(Zi)
    .filter((e) => e.canvas === t)
    .pop()
}
function dd (s, t, e) {
  const i = Object.keys(s)
  for (const n of i) {
    const r = +n
    if (r >= t) {
      const o = s[n]
      delete s[n], (e > 0 || r > t) && (s[r + e] = o)
    }
  }
}
function fd (s, t, e, i) {
  return !e || s.type === 'mouseout' ? null : i ? t : s
}
const xe = class {
  constructor (t, e) {
    const i = (this.config = new Sr(e))
    const n = ll(t)
    const r = cl(n)
    if (r) {
      throw new Error(
        "Canvas is already in use. Chart with ID '" +
                    r.id +
                    "' must be destroyed before the canvas with ID '" +
                    r.canvas.id +
                    "' can be reused."
      )
    }
    const o = i.createResolver(i.chartOptionScopes(), this.getContext());
    (this.platform = new (i.platform || Ku(n))()),
    this.platform.updateConfig(i)
    const a = this.platform.acquireContext(n, o.aspectRatio)
    const l = a && a.canvas
    const c = l && l.height
    const h = l && l.width
    if (
      ((this.id = Do()),
      (this.ctx = a),
      (this.canvas = l),
      (this.width = h),
      (this.height = c),
      (this._options = o),
      (this._aspectRatio = this.aspectRatio),
      (this._layers = []),
      (this._metasets = []),
      (this._stacks = void 0),
      (this.boxes = []),
      (this.currentDevicePixelRatio = void 0),
      (this.chartArea = void 0),
      (this._active = []),
      (this._lastEvent = void 0),
      (this._listeners = {}),
      (this._responsiveListeners = void 0),
      (this._sortedMetasets = []),
      (this.scales = {}),
      (this._plugins = new xr()),
      (this.$proxies = {}),
      (this._hiddenIndices = {}),
      (this.attached = !1),
      (this._animationsDisabled = void 0),
      (this.$context = void 0),
      (this._doResize = zo((u) => this.update(u), o.resizeDelay || 0)),
      (this._dataChanges = []),
      (Zi[this.id] = this),
      !a || !l)
    ) {
      console.error(
        "Failed to create chart: can't acquire context from the given item"
      )
      return
    }
    jt.listen(this, 'complete', Ca),
    jt.listen(this, 'progress', ud),
    this._initialize(),
    this.attached && this.update()
  }

  get aspectRatio () {
    const {
      options: { aspectRatio: t, maintainAspectRatio: e },
      width: i,
      height: n,
      _aspectRatio: r
    } = this
    return N(t) ? (e && r ? r : n ? i / n : null) : t
  }

  get data () {
    return this.config.data
  }

  set data (t) {
    this.config.data = t
  }

  get options () {
    return this._options
  }

  set options (t) {
    this.config.options = t
  }

  _initialize () {
    return (
      this.notifyPlugins('beforeInit'),
      this.options.responsive
        ? this.resize()
        : Qn(this, this.options.devicePixelRatio),
      this.bindEvents(),
      this.notifyPlugins('afterInit'),
      this
    )
  }

  clear () {
    return Un(this.canvas, this.ctx), this
  }

  stop () {
    return jt.stop(this), this
  }

  resize (t, e) {
    jt.running(this)
      ? (this._resizeBeforeDraw = { width: t, height: e })
      : this._resize(t, e)
  }

  _resize (t, e) {
    const i = this.options
    const n = this.canvas
    const r = i.maintainAspectRatio && this.aspectRatio
    const o = this.platform.getMaximumSize(n, t, e, r)
    const a = i.devicePixelRatio || this.platform.getDevicePixelRatio()
    const l = this.width ? 'resize' : 'attach';
    (this.width = o.width),
    (this.height = o.height),
    (this._aspectRatio = this.aspectRatio),
    Qn(this, a, !0) &&
                (this.notifyPlugins('resize', { size: o }),
                j(i.onResize, [this, o], this),
                this.attached && this._doResize(l) && this.render())
  }

  ensureScalesHaveIDs () {
    const e = this.options.scales || {}
    H(e, (i, n) => {
      i.id = n
    })
  }

  buildOrUpdateScales () {
    const t = this.options
    const e = t.scales
    const i = this.scales
    const n = Object.keys(i).reduce((o, a) => ((o[a] = !1), o), {})
    let r = []
    e &&
            (r = r.concat(
              Object.keys(e).map((o) => {
                const a = e[o]
                const l = wr(o, a)
                const c = l === 'r'
                const h = l === 'x'
                return {
                  options: a,
                  dposition: c ? 'chartArea' : h ? 'bottom' : 'left',
                  dtype: c ? 'radialLinear' : h ? 'category' : 'linear'
                }
              })
            )),
    H(r, (o) => {
      const a = o.options
      const l = a.id
      const c = wr(l, a)
      const h = C(a.type, o.dtype);
      (a.position === void 0 ||
                    Da(a.position, c) !== Da(o.dposition)) &&
                    (a.position = o.dposition),
      (n[l] = !0)
      let u = null
      if (l in i && i[l].type === h) u = i[l]
      else {
        const d = Rt.getScale(h);
        (u = new d({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        })),
        (i[u.id] = u)
      }
      u.init(a, t)
    }),
    H(n, (o, a) => {
      o || delete i[a]
    }),
    H(i, (o) => {
      lt.configure(this, o, o.options), lt.addBox(this, o)
    })
  }

  _updateMetasets () {
    const t = this._metasets
    const e = this.data.datasets.length
    const i = t.length
    if ((t.sort((n, r) => n.index - r.index), i > e)) {
      for (let n = e; n < i; ++n) this._destroyDatasetMeta(n)
      t.splice(e, i - e)
    }
    this._sortedMetasets = t.slice(0).sort(Ea('order', 'index'))
  }

  _removeUnreferencedMetasets () {
    const {
      _metasets: t,
      data: { datasets: e }
    } = this
    t.length > e.length && delete this._stacks,
    t.forEach((i, n) => {
      e.filter((r) => r === i._dataset).length === 0 &&
                    this._destroyDatasetMeta(n)
    })
  }

  buildOrUpdateControllers () {
    const t = []
    const e = this.data.datasets
    let i
    let n
    for (
      this._removeUnreferencedMetasets(), i = 0, n = e.length;
      i < n;
      i++
    ) {
      const r = e[i]
      let o = this.getDatasetMeta(i)
      const a = r.type || this.config.type
      if (
        (o.type &&
                    o.type !== a &&
                    (this._destroyDatasetMeta(i), (o = this.getDatasetMeta(i))),
        (o.type = a),
        (o.indexAxis = r.indexAxis || _r(a, this.options)),
        (o.order = r.order || 0),
        (o.index = i),
        (o.label = '' + r.label),
        (o.visible = this.isDatasetVisible(i)),
        o.controller)
      ) {
        o.controller.updateIndex(i), o.controller.linkScales()
      } else {
        const l = Rt.getController(a)
        const { datasetElementType: c, dataElementType: h } =
                    L.datasets[a]
        Object.assign(l.prototype, {
          dataElementType: Rt.getElement(h),
          datasetElementType: c && Rt.getElement(c)
        }),
        (o.controller = new l(this, i)),
        t.push(o.controller)
      }
    }
    return this._updateMetasets(), t
  }

  _resetElements () {
    H(
      this.data.datasets,
      (t, e) => {
        this.getDatasetMeta(e).controller.reset()
      },
      this
    )
  }

  reset () {
    this._resetElements(), this.notifyPlugins('reset')
  }

  update (t) {
    const e = this.config
    e.update()
    const i = (this._options = e.createResolver(
      e.chartOptionScopes(),
      this.getContext()
    ))
    const n = (this._animationsDisabled = !i.animation)
    if (
      (this._updateScales(),
      this._checkEventBindings(),
      this._updateHiddenIndices(),
      this._plugins.invalidate(),
      this.notifyPlugins('beforeUpdate', {
        mode: t,
        cancelable: !0
      }) === !1)
    ) {
      return
    }
    const r = this.buildOrUpdateControllers()
    this.notifyPlugins('beforeElementsUpdate')
    let o = 0
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: u } = this.getDatasetMeta(c)
      const d = !n && r.indexOf(u) === -1
      u.buildOrUpdateElements(d), (o = Math.max(+u.getMaxOverflow(), o))
    }
    (o = this._minPadding = i.layout.autoPadding ? o : 0),
    this._updateLayout(o),
    n ||
                H(r, (c) => {
                  c.reset()
                }),
    this._updateDatasets(t),
    this.notifyPlugins('afterUpdate', { mode: t }),
    this._layers.sort(Ea('z', '_idx'))
    const { _active: a, _lastEvent: l } = this
    l
      ? this._eventHandler(l, !0)
      : a.length && this._updateHoverStyles(a, a, !0),
    this.render()
  }

  _updateScales () {
    H(this.scales, (t) => {
      lt.removeBox(this, t)
    }),
    this.ensureScalesHaveIDs(),
    this.buildOrUpdateScales()
  }

  _checkEventBindings () {
    const t = this.options
    const e = new Set(Object.keys(this._listeners))
    const i = new Set(t.events);
    (!Cn(e, i) || !!this._responsiveListeners !== t.responsive) &&
            (this.unbindEvents(), this.bindEvents())
  }

  _updateHiddenIndices () {
    const { _hiddenIndices: t } = this
    const e = this._getUniformDataChanges() || []
    for (const { method: i, start: n, count: r } of e) {
      const o = i === '_removeElements' ? -r : r
      dd(t, n, o)
    }
  }

  _getUniformDataChanges () {
    const t = this._dataChanges
    if (!t || !t.length) return
    this._dataChanges = []
    const e = this.data.datasets.length
    const i = (r) =>
      new Set(
        t
          .filter((o) => o[0] === r)
          .map((o, a) => a + ',' + o.splice(1).join(','))
      )
    const n = i(0)
    for (let r = 1; r < e; r++) if (!Cn(n, i(r))) return
    return Array.from(n)
      .map((r) => r.split(','))
      .map((r) => ({ method: r[1], start: +r[2], count: +r[3] }))
  }

  _updateLayout (t) {
    if (this.notifyPlugins('beforeLayout', { cancelable: !0 }) === !1) {
      return
    }
    lt.update(this, this.width, this.height, t)
    const e = this.chartArea
    const i = e.width <= 0 || e.height <= 0;
    (this._layers = []),
    H(
      this.boxes,
      (n) => {
        (i && n.position === 'chartArea') ||
                        (n.configure && n.configure(),
                        this._layers.push(...n._layers()))
      },
      this
    ),
    this._layers.forEach((n, r) => {
      n._idx = r
    }),
    this.notifyPlugins('afterLayout')
  }

  _updateDatasets (t) {
    if (
      this.notifyPlugins('beforeDatasetsUpdate', {
        mode: t,
        cancelable: !0
      }) !== !1
    ) {
      for (let e = 0, i = this.data.datasets.length; e < i; ++e) {
        this.getDatasetMeta(e).controller.configure()
      }
      for (let e = 0, i = this.data.datasets.length; e < i; ++e) {
        this._updateDataset(e, Ht(t) ? t({ datasetIndex: e }) : t)
      }
      this.notifyPlugins('afterDatasetsUpdate', { mode: t })
    }
  }

  _updateDataset (t, e) {
    const i = this.getDatasetMeta(t)
    const n = { meta: i, index: t, mode: e, cancelable: !0 }
    this.notifyPlugins('beforeDatasetUpdate', n) !== !1 &&
            (i.controller._update(e),
            (n.cancelable = !1),
            this.notifyPlugins('afterDatasetUpdate', n))
  }

  render () {
    this.notifyPlugins('beforeRender', { cancelable: !0 }) !== !1 &&
            (jt.has(this)
              ? this.attached && !jt.running(this) && jt.start(this)
              : (this.draw(), Ca({ chart: this })))
  }

  draw () {
    let t
    if (this._resizeBeforeDraw) {
      const { width: i, height: n } = this._resizeBeforeDraw
      this._resize(i, n), (this._resizeBeforeDraw = null)
    }
    if (
      (this.clear(),
      this.width <= 0 ||
                this.height <= 0 ||
                this.notifyPlugins('beforeDraw', { cancelable: !0 }) === !1)
    ) {
      return
    }
    const e = this._layers
    for (t = 0; t < e.length && e[t].z <= 0; ++t) {
      e[t].draw(this.chartArea)
    }
    for (this._drawDatasets(); t < e.length; ++t) {
      e[t].draw(this.chartArea)
    }
    this.notifyPlugins('afterDraw')
  }

  _getSortedDatasetMetas (t) {
    const e = this._sortedMetasets
    const i = []
    let n
    let r
    for (n = 0, r = e.length; n < r; ++n) {
      const o = e[n];
      (!t || o.visible) && i.push(o)
    }
    return i
  }

  getSortedVisibleDatasetMetas () {
    return this._getSortedDatasetMetas(!0)
  }

  _drawDatasets () {
    if (
      this.notifyPlugins('beforeDatasetsDraw', { cancelable: !0 }) === !1
    ) {
      return
    }
    const t = this.getSortedVisibleDatasetMetas()
    for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e])
    this.notifyPlugins('afterDatasetsDraw')
  }

  _drawDataset (t) {
    const e = this.ctx
    const i = t._clip
    const n = !i.disabled
    const r = this.chartArea
    const o = { meta: t, index: t.index, cancelable: !0 }
    this.notifyPlugins('beforeDatasetDraw', o) !== !1 &&
            (n &&
                ks(e, {
                  left: i.left === !1 ? 0 : r.left - i.left,
                  right: i.right === !1 ? this.width : r.right + i.right,
                  top: i.top === !1 ? 0 : r.top - i.top,
                  bottom: i.bottom === !1 ? this.height : r.bottom + i.bottom
                }),
            t.controller.draw(),
            n && Ms(e),
            (o.cancelable = !1),
            this.notifyPlugins('afterDatasetDraw', o))
  }

  isPointInArea (t) {
    return Ae(t, this.chartArea, this._minPadding)
  }

  getElementsAtEventForMode (t, e, i, n) {
    const r = Fu.modes[e]
    return typeof r === 'function' ? r(this, t, i, n) : []
  }

  getDatasetMeta (t) {
    const e = this.data.datasets[t]
    const i = this._metasets
    let n = i.filter((r) => r && r._dataset === e).pop()
    return (
      n ||
                ((n = {
                  type: null,
                  data: [],
                  dataset: null,
                  controller: null,
                  hidden: null,
                  xAxisID: null,
                  yAxisID: null,
                  order: (e && e.order) || 0,
                  index: t,
                  _dataset: e,
                  _parsed: [],
                  _sorted: !1
                }),
                i.push(n)),
      n
    )
  }

  getContext () {
    return (
      this.$context ||
            (this.$context = $t(null, { chart: this, type: 'chart' }))
    )
  }

  getVisibleDatasetCount () {
    return this.getSortedVisibleDatasetMetas().length
  }

  isDatasetVisible (t) {
    const e = this.data.datasets[t]
    if (!e) return !1
    const i = this.getDatasetMeta(t)
    return typeof i.hidden === 'boolean' ? !i.hidden : !e.hidden
  }

  setDatasetVisibility (t, e) {
    const i = this.getDatasetMeta(t)
    i.hidden = !e
  }

  toggleDataVisibility (t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t]
  }

  getDataVisibility (t) {
    return !this._hiddenIndices[t]
  }

  _updateVisibility (t, e, i) {
    const n = i ? 'show' : 'hide'
    const r = this.getDatasetMeta(t)
    const o = r.controller._resolveAnimations(void 0, n)
    ft(e)
      ? ((r.data[e].hidden = !i), this.update())
      : (this.setDatasetVisibility(t, i),
        o.update(r, { visible: i }),
        this.update((a) => (a.datasetIndex === t ? n : void 0)))
  }

  hide (t, e) {
    this._updateVisibility(t, e, !1)
  }

  show (t, e) {
    this._updateVisibility(t, e, !0)
  }

  _destroyDatasetMeta (t) {
    const e = this._metasets[t]
    e && e.controller && e.controller._destroy(), delete this._metasets[t]
  }

  _stop () {
    let t, e
    for (
      this.stop(), jt.remove(this), t = 0, e = this.data.datasets.length;
      t < e;
      ++t
    ) {
      this._destroyDatasetMeta(t)
    }
  }

  destroy () {
    this.notifyPlugins('beforeDestroy')
    const { canvas: t, ctx: e } = this
    this._stop(),
    this.config.clearCache(),
    t &&
                (this.unbindEvents(),
                Un(t, e),
                this.platform.releaseContext(e),
                (this.canvas = null),
                (this.ctx = null)),
    this.notifyPlugins('destroy'),
    delete Zi[this.id],
    this.notifyPlugins('afterDestroy')
  }

  toBase64Image (...t) {
    return this.canvas.toDataURL(...t)
  }

  bindEvents () {
    this.bindUserEvents(),
    this.options.responsive
      ? this.bindResponsiveEvents()
      : (this.attached = !0)
  }

  bindUserEvents () {
    const t = this._listeners
    const e = this.platform
    const i = (r, o) => {
      e.addEventListener(this, r, o), (t[r] = o)
    }
    const n = (r, o, a) => {
      (r.offsetX = o), (r.offsetY = a), this._eventHandler(r)
    }
    H(this.options.events, (r) => i(r, n))
  }

  bindResponsiveEvents () {
    this._responsiveListeners || (this._responsiveListeners = {})
    const t = this._responsiveListeners
    const e = this.platform
    const i = (l, c) => {
      e.addEventListener(this, l, c), (t[l] = c)
    }
    const n = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l])
    }
    const r = (l, c) => {
      this.canvas && this.resize(l, c)
    }
    let o
    const a = () => {
      n('attach', a),
      (this.attached = !0),
      this.resize(),
      i('resize', r),
      i('detach', o)
    };
    (o = () => {
      (this.attached = !1),
      n('resize', r),
      this._stop(),
      this._resize(0, 0),
      i('attach', a)
    }),
    e.isAttached(this.canvas) ? a() : o()
  }

  unbindEvents () {
    H(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t)
    }),
    (this._listeners = {}),
    H(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t)
    }),
    (this._responsiveListeners = void 0)
  }

  updateHoverStyle (t, e, i) {
    const n = i ? 'set' : 'remove'
    let r
    let o
    let a
    let l
    for (
      e === 'dataset' &&
                ((r = this.getDatasetMeta(t[0].datasetIndex)),
                r.controller['_' + n + 'DatasetHoverStyle']()),
      a = 0,
      l = t.length;
      a < l;
      ++a
    ) {
      o = t[a]
      const c = o && this.getDatasetMeta(o.datasetIndex).controller
      c && c[n + 'HoverStyle'](o.element, o.datasetIndex, o.index)
    }
  }

  getActiveElements () {
    return this._active || []
  }

  setActiveElements (t) {
    const e = this._active || []
    const i = t.map(({ datasetIndex: r, index: o }) => {
      const a = this.getDatasetMeta(r)
      if (!a) throw new Error('No dataset found at index ' + r)
      return { datasetIndex: r, element: a.data[o], index: o }
    })
    !ws(i, e) &&
            ((this._active = i),
            (this._lastEvent = null),
            this._updateHoverStyles(i, e))
  }

  notifyPlugins (t, e, i) {
    return this._plugins.notify(this, t, e, i)
  }

  _updateHoverStyles (t, e, i) {
    const n = this.options.hover
    const r = (l, c) =>
      l.filter(
        (h) =>
          !c.some(
            (u) =>
              h.datasetIndex === u.datasetIndex &&
                            h.index === u.index
          )
      )
    const o = r(e, t)
    const a = i ? t : r(t, e)
    o.length && this.updateHoverStyle(o, n.mode, !1),
    a.length && n.mode && this.updateHoverStyle(a, n.mode, !0)
  }

  _eventHandler (t, e) {
    const i = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }
    const n = (o) =>
      (o.options.events || this.options.events).includes(t.native.type)
    if (this.notifyPlugins('beforeEvent', i, n) === !1) return
    const r = this._handleEvent(t, e, i.inChartArea)
    return (
      (i.cancelable = !1),
      this.notifyPlugins('afterEvent', i, n),
      (r || i.changed) && this.render(),
      this
    )
  }

  _handleEvent (t, e, i) {
    const { _active: n = [], options: r } = this
    const o = e
    const a = this._getActiveElements(t, n, i, o)
    const l = Io(t)
    const c = fd(t, this._lastEvent, i, l)
    i &&
            ((this._lastEvent = null),
            j(r.onHover, [t, a, this], this),
            l && j(r.onClick, [t, a, this], this))
    const h = !ws(a, n)
    return (
      (h || e) && ((this._active = a), this._updateHoverStyles(a, n, e)),
      (this._lastEvent = c),
      h
    )
  }

  _getActiveElements (t, e, i, n) {
    if (t.type === 'mouseout') return []
    if (!i) return e
    const r = this.options.hover
    return this.getElementsAtEventForMode(t, r.mode, r, n)
  }
}
const Ia = () => H(xe.instances, (s) => s._plugins.invalidate())
const ne = !0
Object.defineProperties(xe, {
  defaults: { enumerable: ne, value: L },
  instances: { enumerable: ne, value: Zi },
  overrides: { enumerable: ne, value: Qt },
  registry: { enumerable: ne, value: Rt },
  version: { enumerable: ne, value: cd },
  getChart: { enumerable: ne, value: cl },
  register: {
    enumerable: ne,
    value: (...s) => {
      Rt.add(...s), Ia()
    }
  },
  unregister: {
    enumerable: ne,
    value: (...s) => {
      Rt.remove(...s), Ia()
    }
  }
})
function hl (s, t, e) {
  const {
    startAngle: i,
    pixelMargin: n,
    x: r,
    y: o,
    outerRadius: a,
    innerRadius: l
  } = t
  let c = n / a
  s.beginPath(),
  s.arc(r, o, a, i - c, e + c),
  l > n
    ? ((c = n / l), s.arc(r, o, l, e + c, i - c, !0))
    : s.arc(r, o, n, e + Z, i - Z),
  s.closePath(),
  s.clip()
}
function md (s) {
  return Ai(s, ['outerStart', 'outerEnd', 'innerStart', 'innerEnd'])
}
function gd (s, t, e, i) {
  const n = md(s.options.borderRadius)
  const r = (e - t) / 2
  const o = Math.min(r, (i * t) / 2)
  const a = (l) => {
    const c = ((e - Math.min(r, l)) * i) / 2
    return it(l, 0, Math.min(r, c))
  }
  return {
    outerStart: a(n.outerStart),
    outerEnd: a(n.outerEnd),
    innerStart: it(n.innerStart, 0, o),
    innerEnd: it(n.innerEnd, 0, o)
  }
}
function He (s, t, e, i) {
  return { x: e + s * Math.cos(t), y: i + s * Math.sin(t) }
}
function kr (s, t, e, i, n, r) {
  const { x: o, y: a, startAngle: l, pixelMargin: c, innerRadius: h } = t
  const u = Math.max(t.outerRadius + i + e - c, 0)
  const d = h > 0 ? h + i + e + c : 0
  let f = 0
  const m = n - l
  if (i) {
    const E = h > 0 ? h - i : 0
    const et = u > 0 ? u - i : 0
    const Q = (E + et) / 2
    const fe = Q !== 0 ? (m * Q) / (Q + i) : m
    f = (m - fe) / 2
  }
  const g = Math.max(0.001, m * u - e / Y) / u
  const p = (m - g) / 2
  const y = l + p + f
  const b = n - p - f
  const {
    outerStart: _,
    outerEnd: w,
    innerStart: x,
    innerEnd: S
  } = gd(t, d, u, b - y)
  const k = u - _
  const O = u - w
  const v = y + _ / k
  const F = b - w / O
  const W = d + x
  const R = d + S
  const tt = y + x / W
  const ct = b - S / R
  if ((s.beginPath(), r)) {
    if ((s.arc(o, a, u, v, F), w > 0)) {
      const Q = He(O, F, o, a)
      s.arc(Q.x, Q.y, w, F, b + Z)
    }
    const E = He(R, b, o, a)
    if ((s.lineTo(E.x, E.y), S > 0)) {
      const Q = He(R, ct, o, a)
      s.arc(Q.x, Q.y, S, b + Z, ct + Math.PI)
    }
    if ((s.arc(o, a, d, b - S / d, y + x / d, !0), x > 0)) {
      const Q = He(W, tt, o, a)
      s.arc(Q.x, Q.y, x, tt + Math.PI, y - Z)
    }
    const et = He(k, y, o, a)
    if ((s.lineTo(et.x, et.y), _ > 0)) {
      const Q = He(k, v, o, a)
      s.arc(Q.x, Q.y, _, y - Z, v)
    }
  } else {
    s.moveTo(o, a)
    const E = Math.cos(v) * u + o
    const et = Math.sin(v) * u + a
    s.lineTo(E, et)
    const Q = Math.cos(F) * u + o
    const fe = Math.sin(F) * u + a
    s.lineTo(Q, fe)
  }
  s.closePath()
}
function pd (s, t, e, i, n) {
  const { fullCircles: r, startAngle: o, circumference: a } = t
  let l = t.endAngle
  if (r) {
    kr(s, t, e, i, o + B, n)
    for (let c = 0; c < r; ++c) s.fill()
    isNaN(a) || ((l = o + (a % B)), a % B === 0 && (l += B))
  }
  return kr(s, t, e, i, l, n), s.fill(), l
}
function yd (s, t, e) {
  const { x: i, y: n, startAngle: r, pixelMargin: o, fullCircles: a } = t
  const l = Math.max(t.outerRadius - o, 0)
  const c = t.innerRadius + o
  let h
  for (
    e && hl(s, t, r + B),
    s.beginPath(),
    s.arc(i, n, c, r + B, r, !0),
    h = 0;
    h < a;
    ++h
  ) {
    s.stroke()
  }
  for (s.beginPath(), s.arc(i, n, l, r, r + B), h = 0; h < a; ++h) s.stroke()
}
function bd (s, t, e, i, n, r) {
  const { options: o } = t
  const { borderWidth: a, borderJoinStyle: l } = o
  const c = o.borderAlign === 'inner'
  a &&
        (c
          ? ((s.lineWidth = a * 2), (s.lineJoin = l || 'round'))
          : ((s.lineWidth = a), (s.lineJoin = l || 'bevel')),
        t.fullCircles && yd(s, t, c),
        c && hl(s, t, n),
        kr(s, t, e, i, n, r),
        s.stroke())
}
const Ge = class extends yt {
  constructor (t) {
    super(),
    (this.options = void 0),
    (this.circumference = void 0),
    (this.startAngle = void 0),
    (this.endAngle = void 0),
    (this.innerRadius = void 0),
    (this.outerRadius = void 0),
    (this.pixelMargin = 0),
    (this.fullCircles = 0),
    t && Object.assign(this, t)
  }

  inRange (t, e, i) {
    const n = this.getProps(['x', 'y'], i)
    const { angle: r, distance: o } = Ln(n, { x: t, y: e })
    const {
      startAngle: a,
      endAngle: l,
      innerRadius: c,
      outerRadius: h,
      circumference: u
    } = this.getProps(
      [
        'startAngle',
        'endAngle',
        'innerRadius',
        'outerRadius',
        'circumference'
      ],
      i
    )
    const d = this.options.spacing / 2
    const m = C(u, l - a) >= B || Ne(r, a, l)
    const g = Lt(o, c + d, h + d)
    return m && g
  }

  getCenterPoint (t) {
    const {
      x: e,
      y: i,
      startAngle: n,
      endAngle: r,
      innerRadius: o,
      outerRadius: a
    } = this.getProps(
      [
        'x',
        'y',
        'startAngle',
        'endAngle',
        'innerRadius',
        'outerRadius',
        'circumference'
      ],
      t
    )
    const { offset: l, spacing: c } = this.options
    const h = (n + r) / 2
    const u = (o + a + c + l) / 2
    return { x: e + Math.cos(h) * u, y: i + Math.sin(h) * u }
  }

  tooltipPosition (t) {
    return this.getCenterPoint(t)
  }

  draw (t) {
    const { options: e, circumference: i } = this
    const n = (e.offset || 0) / 2
    const r = (e.spacing || 0) / 2
    const o = e.circular
    if (
      ((this.pixelMargin = e.borderAlign === 'inner' ? 0.33 : 0),
      (this.fullCircles = i > B ? Math.floor(i / B) : 0),
      i === 0 || this.innerRadius < 0 || this.outerRadius < 0)
    ) {
      return
    }
    t.save()
    let a = 0
    if (n) {
      a = n / 2
      const c = (this.startAngle + this.endAngle) / 2
      t.translate(Math.cos(c) * a, Math.sin(c) * a),
      this.circumference >= Y && (a = n)
    }
    (t.fillStyle = e.backgroundColor), (t.strokeStyle = e.borderColor)
    const l = pd(t, this, a, r, o)
    bd(t, this, a, r, l, o), t.restore()
  }
}
Ge.id = 'arc'
Ge.defaults = {
  borderAlign: 'center',
  borderColor: '#fff',
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0
}
Ge.defaultRoutes = { backgroundColor: 'backgroundColor' }
function ul (s, t, e = t) {
  (s.lineCap = C(e.borderCapStyle, t.borderCapStyle)),
  s.setLineDash(C(e.borderDash, t.borderDash)),
  (s.lineDashOffset = C(e.borderDashOffset, t.borderDashOffset)),
  (s.lineJoin = C(e.borderJoinStyle, t.borderJoinStyle)),
  (s.lineWidth = C(e.borderWidth, t.borderWidth)),
  (s.strokeStyle = C(e.borderColor, t.borderColor))
}
function xd (s, t, e) {
  s.lineTo(e.x, e.y)
}
function _d (s) {
  return s.stepped
    ? Zo
    : s.tension || s.cubicInterpolationMode === 'monotone'
      ? qo
      : xd
}
function dl (s, t, e = {}) {
  const i = s.length
  const { start: n = 0, end: r = i - 1 } = e
  const { start: o, end: a } = t
  const l = Math.max(n, o)
  const c = Math.min(r, a)
  const h = (n < o && r < o) || (n > a && r > a)
  return {
    count: i,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? i + c - l : c - l
  }
}
function wd (s, t, e, i) {
  const { points: n, options: r } = t
  const { count: o, start: a, loop: l, ilen: c } = dl(n, e, i)
  const h = _d(r)
  let { move: u = !0, reverse: d } = i || {}
  let f
  let m
  let g
  for (f = 0; f <= c; ++f) {
    (m = n[(a + (d ? c - f : f)) % o]),
    !m.skip &&
                (u ? (s.moveTo(m.x, m.y), (u = !1)) : h(s, g, m, d, r.stepped),
                (g = m))
  }
  return l && ((m = n[(a + (d ? c : 0)) % o]), h(s, g, m, d, r.stepped)), !!l
}
function Sd (s, t, e, i) {
  const n = t.points
  const { count: r, start: o, ilen: a } = dl(n, e, i)
  const { move: l = !0, reverse: c } = i || {}
  let h = 0
  let u = 0
  let d
  let f
  let m
  let g
  let p
  let y
  const b = (w) => (o + (c ? a - w : w)) % r
  const _ = () => {
    g !== p && (s.lineTo(h, p), s.lineTo(h, g), s.lineTo(h, y))
  }
  for (l && ((f = n[b(0)]), s.moveTo(f.x, f.y)), d = 0; d <= a; ++d) {
    if (((f = n[b(d)]), f.skip)) continue
    const w = f.x
    const x = f.y
    const S = w | 0
    S === m
      ? (x < g ? (g = x) : x > p && (p = x), (h = (u * h + w) / ++u))
      : (_(), s.lineTo(w, x), (m = S), (u = 0), (g = p = x)),
    (y = x)
  }
  _()
}
function Mr (s) {
  const t = s.options
  const e = t.borderDash && t.borderDash.length
  return !s._decimated &&
        !s._loop &&
        !t.tension &&
        t.cubicInterpolationMode !== 'monotone' &&
        !t.stepped &&
        !e
    ? Sd
    : wd
}
function kd (s) {
  return s.stepped
    ? ia
    : s.tension || s.cubicInterpolationMode === 'monotone'
      ? na
      : Xt
}
function Md (s, t, e, i) {
  let n = t._path
  n || ((n = t._path = new Path2D()), t.path(n, e, i) && n.closePath()),
  ul(s, t.options),
  s.stroke(n)
}
function Td (s, t, e, i) {
  const { segments: n, options: r } = t
  const o = Mr(t)
  for (const a of n) {
    ul(s, r, a.style),
    s.beginPath(),
    o(s, t, a, { start: e, end: e + i - 1 }) && s.closePath(),
    s.stroke()
  }
}
const vd = typeof Path2D === 'function'
function Od (s, t, e, i) {
  vd && !t.options.segment ? Md(s, t, e, i) : Td(s, t, e, i)
}
const Nt = class extends yt {
  constructor (t) {
    super(),
    (this.animated = !0),
    (this.options = void 0),
    (this._chart = void 0),
    (this._loop = void 0),
    (this._fullLoop = void 0),
    (this._path = void 0),
    (this._points = void 0),
    (this._segments = void 0),
    (this._decimated = !1),
    (this._pointsUpdated = !1),
    (this._datasetIndex = void 0),
    t && Object.assign(this, t)
  }

  updateControlPoints (t, e) {
    const i = this.options
    if (
      (i.tension || i.cubicInterpolationMode === 'monotone') &&
            !i.stepped &&
            !this._pointsUpdated
    ) {
      const n = i.spanGaps ? this._loop : this._fullLoop
      ta(this._points, i, t, n, e), (this._pointsUpdated = !0)
    }
  }

  set points (t) {
    (this._points = t),
    delete this._segments,
    delete this._path,
    (this._pointsUpdated = !1)
  }

  get points () {
    return this._points
  }

  get segments () {
    return (
      this._segments || (this._segments = oa(this, this.options.segment))
    )
  }

  first () {
    const t = this.segments
    const e = this.points
    return t.length && e[t[0].start]
  }

  last () {
    const t = this.segments
    const e = this.points
    const i = t.length
    return i && e[t[i - 1].end]
  }

  interpolate (t, e) {
    const i = this.options
    const n = t[e]
    const r = this.points
    const o = nr(this, { property: e, start: n, end: n })
    if (!o.length) return
    const a = []
    const l = kd(i)
    let c
    let h
    for (c = 0, h = o.length; c < h; ++c) {
      const { start: u, end: d } = o[c]
      const f = r[u]
      const m = r[d]
      if (f === m) {
        a.push(f)
        continue
      }
      const g = Math.abs((n - f[e]) / (m[e] - f[e]))
      const p = l(f, m, g, i.stepped);
      (p[e] = t[e]), a.push(p)
    }
    return a.length === 1 ? a[0] : a
  }

  pathSegment (t, e, i) {
    return Mr(this)(t, this, e, i)
  }

  path (t, e, i) {
    const n = this.segments
    const r = Mr(this)
    let o = this._loop;
    (e = e || 0), (i = i || this.points.length - e)
    for (const a of n) o &= r(t, this, a, { start: e, end: e + i - 1 })
    return !!o
  }

  draw (t, e, i, n) {
    const r = this.options || {};
    (this.points || []).length &&
            r.borderWidth &&
            (t.save(), Od(t, this, i, n), t.restore()),
    this.animated &&
                ((this._pointsUpdated = !1), (this._path = void 0))
  }
}
Nt.id = 'line'
Nt.defaults = {
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: 'default',
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}
Nt.defaultRoutes = {
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor'
}
Nt.descriptors = {
  _scriptable: !0,
  _indexable: (s) => s !== 'borderDash' && s !== 'fill'
}
function Fa (s, t, e, i) {
  const n = s.options
  const { [e]: r } = s.getProps([e], i)
  return Math.abs(t - r) < n.radius + n.hitRadius
}
const Xe = class extends yt {
  constructor (t) {
    super(),
    (this.options = void 0),
    (this.parsed = void 0),
    (this.skip = void 0),
    (this.stop = void 0),
    t && Object.assign(this, t)
  }

  inRange (t, e, i) {
    const n = this.options
    const { x: r, y: o } = this.getProps(['x', 'y'], i)
    return (
      Math.pow(t - r, 2) + Math.pow(e - o, 2) <
            Math.pow(n.hitRadius + n.radius, 2)
    )
  }

  inXRange (t, e) {
    return Fa(this, t, 'x', e)
  }

  inYRange (t, e) {
    return Fa(this, t, 'y', e)
  }

  getCenterPoint (t) {
    const { x: e, y: i } = this.getProps(['x', 'y'], t)
    return { x: e, y: i }
  }

  size (t) {
    t = t || this.options || {}
    let e = t.radius || 0
    e = Math.max(e, (e && t.hoverRadius) || 0)
    const i = (e && t.borderWidth) || 0
    return (e + i) * 2
  }

  draw (t, e) {
    const i = this.options
    this.skip ||
            i.radius < 0.1 ||
            !Ae(this, e, this.size(i) / 2) ||
            ((t.strokeStyle = i.borderColor),
            (t.lineWidth = i.borderWidth),
            (t.fillStyle = i.backgroundColor),
            Fi(t, i, this.x, this.y))
  }

  getRange () {
    const t = this.options || {}
    return t.radius + t.hitRadius
  }
}
Xe.id = 'point'
Xe.defaults = {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: 'circle',
  radius: 3,
  rotation: 0
}
Xe.defaultRoutes = {
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor'
}
function fl (s, t) {
  const {
    x: e,
    y: i,
    base: n,
    width: r,
    height: o
  } = s.getProps(['x', 'y', 'base', 'width', 'height'], t)
  let a
  let l
  let c
  let h
  let u
  return (
    s.horizontal
      ? ((u = o / 2),
        (a = Math.min(e, n)),
        (l = Math.max(e, n)),
        (c = i - u),
        (h = i + u))
      : ((u = r / 2),
        (a = e - u),
        (l = e + u),
        (c = Math.min(i, n)),
        (h = Math.max(i, n))),
    { left: a, top: c, right: l, bottom: h }
  )
}
function re (s, t, e, i) {
  return s ? 0 : it(t, e, i)
}
function Dd (s, t, e) {
  const i = s.options.borderWidth
  const n = s.borderSkipped
  const r = Zn(i)
  return {
    t: re(n.top, r.top, 0, e),
    r: re(n.right, r.right, 0, t),
    b: re(n.bottom, r.bottom, 0, e),
    l: re(n.left, r.left, 0, t)
  }
}
function Ed (s, t, e) {
  const { enableBorderRadius: i } = s.getProps(['enableBorderRadius'])
  const n = s.options.borderRadius
  const r = se(n)
  const o = Math.min(t, e)
  const a = s.borderSkipped
  const l = i || A(n)
  return {
    topLeft: re(!l || a.top || a.left, r.topLeft, 0, o),
    topRight: re(!l || a.top || a.right, r.topRight, 0, o),
    bottomLeft: re(!l || a.bottom || a.left, r.bottomLeft, 0, o),
    bottomRight: re(!l || a.bottom || a.right, r.bottomRight, 0, o)
  }
}
function Cd (s) {
  const t = fl(s)
  const e = t.right - t.left
  const i = t.bottom - t.top
  const n = Dd(s, e / 2, i / 2)
  const r = Ed(s, e / 2, i / 2)
  return {
    outer: { x: t.left, y: t.top, w: e, h: i, radius: r },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: e - n.l - n.r,
      h: i - n.t - n.b,
      radius: {
        topLeft: Math.max(0, r.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, r.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, r.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, r.bottomRight - Math.max(n.b, n.r))
      }
    }
  }
}
function ur (s, t, e, i) {
  const n = t === null
  const r = e === null
  const a = s && !(n && r) && fl(s, i)
  return a && (n || Lt(t, a.left, a.right)) && (r || Lt(e, a.top, a.bottom))
}
function Id (s) {
  return s.topLeft || s.topRight || s.bottomLeft || s.bottomRight
}
function Fd (s, t) {
  s.rect(t.x, t.y, t.w, t.h)
}
function dr (s, t, e = {}) {
  const i = s.x !== e.x ? -t : 0
  const n = s.y !== e.y ? -t : 0
  const r = (s.x + s.w !== e.x + e.w ? t : 0) - i
  const o = (s.y + s.h !== e.y + e.h ? t : 0) - n
  return { x: s.x + i, y: s.y + n, w: s.w + r, h: s.h + o, radius: s.radius }
}
const Ke = class extends yt {
  constructor (t) {
    super(),
    (this.options = void 0),
    (this.horizontal = void 0),
    (this.base = void 0),
    (this.width = void 0),
    (this.height = void 0),
    (this.inflateAmount = void 0),
    t && Object.assign(this, t)
  }

  draw (t) {
    const {
      inflateAmount: e,
      options: { borderColor: i, backgroundColor: n }
    } = this
    const { inner: r, outer: o } = Cd(this)
    const a = Id(o.radius) ? We : Fd
    t.save(),
    (o.w !== r.w || o.h !== r.h) &&
                (t.beginPath(),
                a(t, dr(o, e, r)),
                t.clip(),
                a(t, dr(r, -e, o)),
                (t.fillStyle = i),
                t.fill('evenodd')),
    t.beginPath(),
    a(t, dr(r, e)),
    (t.fillStyle = n),
    t.fill(),
    t.restore()
  }

  inRange (t, e, i) {
    return ur(this, t, e, i)
  }

  inXRange (t, e) {
    return ur(this, t, null, e)
  }

  inYRange (t, e) {
    return ur(this, null, t, e)
  }

  getCenterPoint (t) {
    const {
      x: e,
      y: i,
      base: n,
      horizontal: r
    } = this.getProps(['x', 'y', 'base', 'horizontal'], t)
    return { x: r ? (e + n) / 2 : e, y: r ? i : (i + n) / 2 }
  }

  getRange (t) {
    return t === 'x' ? this.width / 2 : this.height / 2
  }
}
Ke.id = 'bar'
Ke.defaults = {
  borderSkipped: 'start',
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: 'auto',
  pointStyle: void 0
}
Ke.defaultRoutes = {
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor'
}
const Ad = Object.freeze({
  __proto__: null,
  ArcElement: Ge,
  LineElement: Nt,
  PointElement: Xe,
  BarElement: Ke
})
function Ld (s, t, e, i, n) {
  const r = n.samples || i
  if (r >= e) return s.slice(t, t + e)
  const o = []
  const a = (e - 2) / (r - 2)
  let l = 0
  const c = t + e - 1
  let h = t
  let u
  let d
  let f
  let m
  let g
  for (o[l++] = s[h], u = 0; u < r - 2; u++) {
    let p = 0
    let y = 0
    let b
    const _ = Math.floor((u + 1) * a) + 1 + t
    const w = Math.min(Math.floor((u + 2) * a) + 1, e) + t
    const x = w - _
    for (b = _; b < w; b++) (p += s[b].x), (y += s[b].y);
    (p /= x), (y /= x)
    const S = Math.floor(u * a) + 1 + t
    const k = Math.min(Math.floor((u + 1) * a) + 1, e) + t
    const { x: O, y: v } = s[h]
    for (f = m = -1, b = S; b < k; b++) {
      (m =
                0.5 *
                Math.abs((O - p) * (s[b].y - v) - (O - s[b].x) * (y - v))),
      m > f && ((f = m), (d = s[b]), (g = b))
    }
    (o[l++] = d), (h = g)
  }
  return (o[l++] = s[c]), o
}
function Pd (s, t, e, i) {
  let n = 0
  let r = 0
  let o
  let a
  let l
  let c
  let h
  let u
  let d
  let f
  let m
  let g
  const p = []
  const y = t + e - 1
  const b = s[t].x
  const w = s[y].x - b
  for (o = t; o < t + e; ++o) {
    (a = s[o]), (l = ((a.x - b) / w) * i), (c = a.y)
    const x = l | 0
    if (x === h) {
      c < m ? ((m = c), (u = o)) : c > g && ((g = c), (d = o)),
      (n = (r * n + a.x) / ++r)
    } else {
      const S = o - 1
      if (!N(u) && !N(d)) {
        const k = Math.min(u, d)
        const O = Math.max(u, d)
        k !== f && k !== S && p.push({ ...s[k], x: n }),
        O !== f && O !== S && p.push({ ...s[O], x: n })
      }
      o > 0 && S !== f && p.push(s[S]),
      p.push(a),
      (h = x),
      (r = 0),
      (m = g = c),
      (u = d = f = o)
    }
  }
  return p
}
function ml (s) {
  if (s._decimated) {
    const t = s._data
    delete s._decimated,
    delete s._data,
    Object.defineProperty(s, 'data', { value: t })
  }
}
function Aa (s) {
  s.data.datasets.forEach((t) => {
    ml(t)
  })
}
function Rd (s, t) {
  const e = t.length
  let i = 0
  let n
  const { iScale: r } = s
  const { min: o, max: a, minDefined: l, maxDefined: c } = r.getUserBounds()
  return (
    l && (i = it(Ft(t, r.axis, o).lo, 0, e - 1)),
    c ? (n = it(Ft(t, r.axis, a).hi + 1, i, e) - i) : (n = e - i),
    { start: i, count: n }
  )
}
const Nd = {
  id: 'decimation',
  defaults: { algorithm: 'min-max', enabled: !1 },
  beforeElementsUpdate: (s, t, e) => {
    if (!e.enabled) {
      Aa(s)
      return
    }
    const i = s.width
    s.data.datasets.forEach((n, r) => {
      const { _data: o, indexAxis: a } = n
      const l = s.getDatasetMeta(r)
      const c = o || n.data
      if (
        ze([a, s.options.indexAxis]) === 'y' ||
                !l.controller.supportsDecimation
      ) {
        return
      }
      const h = s.scales[l.xAxisID]
      if (
        (h.type !== 'linear' && h.type !== 'time') ||
                s.options.parsing
      ) {
        return
      }
      const { start: u, count: d } = Rd(l, c)
      const f = e.threshold || 4 * i
      if (d <= f) {
        ml(n)
        return
      }
      N(o) &&
                ((n._data = c),
                delete n.data,
                Object.defineProperty(n, 'data', {
                  configurable: !0,
                  enumerable: !0,
                  get: function () {
                    return this._decimated
                  },
                  set: function (g) {
                    this._data = g
                  }
                }))
      let m
      switch (e.algorithm) {
        case 'lttb':
          m = Ld(c, u, d, i, e)
          break
        case 'min-max':
          m = Pd(c, u, d, i)
          break
        default:
          throw new Error(
                        `Unsupported decimation algorithm '${e.algorithm}'`
          )
      }
      n._decimated = m
    })
  },
  destroy (s) {
    Aa(s)
  }
}
function Wd (s, t, e) {
  const i = s.segments
  const n = s.points
  const r = t.points
  const o = []
  for (const a of i) {
    let { start: l, end: c } = a
    c = Dr(l, c, n)
    const h = Tr(e, n[l], n[c], a.loop)
    if (!t.segments) {
      o.push({ source: a, target: h, start: n[l], end: n[c] })
      continue
    }
    const u = nr(t, h)
    for (const d of u) {
      const f = Tr(e, r[d.start], r[d.end], d.loop)
      const m = ir(a, n, f)
      for (const g of m) {
        o.push({
          source: g,
          target: d,
          start: { [e]: La(h, f, 'start', Math.max) },
          end: { [e]: La(h, f, 'end', Math.min) }
        })
      }
    }
  }
  return o
}
function Tr (s, t, e, i) {
  if (i) return
  let n = t[s]
  let r = e[s]
  return (
    s === 'angle' && ((n = ht(n)), (r = ht(r))),
    { property: s, start: n, end: r }
  )
}
function zd (s, t) {
  const { x: e = null, y: i = null } = s || {}
  const n = t.points
  const r = []
  return (
    t.segments.forEach(({ start: o, end: a }) => {
      a = Dr(o, a, n)
      const l = n[o]
      const c = n[a]
      i !== null
        ? (r.push({ x: l.x, y: i }), r.push({ x: c.x, y: i }))
        : e !== null &&
                  (r.push({ x: e, y: l.y }), r.push({ x: e, y: c.y }))
    }),
    r
  )
}
function Dr (s, t, e) {
  for (; t > s; t--) {
    const i = e[t]
    if (!isNaN(i.x) && !isNaN(i.y)) break
  }
  return t
}
function La (s, t, e, i) {
  return s && t ? i(s[e], t[e]) : s ? s[e] : t ? t[e] : 0
}
function gl (s, t) {
  let e = []
  let i = !1
  return (
    $(s) ? ((i = !0), (e = s)) : (e = zd(s, t)),
    e.length
      ? new Nt({
        points: e,
        options: { tension: 0 },
        _loop: i,
        _fullLoop: i
      })
      : null
  )
}
function Pa (s) {
  return s && s.fill !== !1
}
function Vd (s, t, e) {
  let n = s[t].fill
  const r = [t]
  let o
  if (!e) return n
  for (; n !== !1 && r.indexOf(n) === -1;) {
    if (!K(n)) return n
    if (((o = s[n]), !o)) return !1
    if (o.visible) return n
    r.push(n), (n = o.fill)
  }
  return !1
}
function Hd (s, t, e) {
  const i = Ud(s)
  if (A(i)) return isNaN(i.value) ? !1 : i
  const n = parseFloat(i)
  return K(n) && Math.floor(n) === n
    ? Bd(i[0], t, n, e)
    : ['origin', 'start', 'end', 'stack', 'shape'].indexOf(i) >= 0 && i
}
function Bd (s, t, e, i) {
  return (
    (s === '-' || s === '+') && (e = t + e),
    e === t || e < 0 || e >= i ? !1 : e
  )
}
function $d (s, t) {
  let e = null
  return (
    s === 'start'
      ? (e = t.bottom)
      : s === 'end'
        ? (e = t.top)
        : A(s)
          ? (e = t.getPixelForValue(s.value))
          : t.getBasePixel && (e = t.getBasePixel()),
    e
  )
}
function jd (s, t, e) {
  let i
  return (
    s === 'start'
      ? (i = e)
      : s === 'end'
        ? (i = t.options.reverse ? t.min : t.max)
        : A(s)
          ? (i = s.value)
          : (i = t.getBaseValue()),
    i
  )
}
function Ud (s) {
  const t = s.options
  const e = t.fill
  let i = C(e && e.target, e)
  return (
    i === void 0 && (i = !!t.backgroundColor),
    i === !1 || i === null ? !1 : i === !0 ? 'origin' : i
  )
}
function Yd (s) {
  const { scale: t, index: e, line: i } = s
  const n = []
  const r = i.segments
  const o = i.points
  const a = Zd(t, e)
  a.push(gl({ x: null, y: t.bottom }, i))
  for (let l = 0; l < r.length; l++) {
    const c = r[l]
    for (let h = c.start; h <= c.end; h++) qd(n, o[h], a)
  }
  return new Nt({ points: n, options: {} })
}
function Zd (s, t) {
  const e = []
  const i = s.getMatchingVisibleMetas('line')
  for (let n = 0; n < i.length; n++) {
    const r = i[n]
    if (r.index === t) break
    r.hidden || e.unshift(r.dataset)
  }
  return e
}
function qd (s, t, e) {
  const i = []
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    const { first: o, last: a, point: l } = Gd(r, t, 'x')
    if (!(!l || (o && a))) {
      if (o) i.unshift(l)
      else if ((s.push(l), !a)) break
    }
  }
  s.push(...i)
}
function Gd (s, t, e) {
  const i = s.interpolate(t, e)
  if (!i) return {}
  const n = i[e]
  const r = s.segments
  const o = s.points
  let a = !1
  let l = !1
  for (let c = 0; c < r.length; c++) {
    const h = r[c]
    const u = o[h.start][e]
    const d = o[h.end][e]
    if (Lt(n, u, d)) {
      (a = n === u), (l = n === d)
      break
    }
  }
  return { first: a, last: l, point: i }
}
const qi = class {
  constructor (t) {
    (this.x = t.x), (this.y = t.y), (this.radius = t.radius)
  }

  pathSegment (t, e, i) {
    const { x: n, y: r, radius: o } = this
    return (
      (e = e || { start: 0, end: B }),
      t.arc(n, r, o, e.end, e.start, !0),
      !i.bounds
    )
  }

  interpolate (t) {
    const { x: e, y: i, radius: n } = this
    const r = t.angle
    return { x: e + Math.cos(r) * n, y: i + Math.sin(r) * n, angle: r }
  }
}
function Xd (s) {
  const { chart: t, fill: e, line: i } = s
  if (K(e)) return Kd(t, e)
  if (e === 'stack') return Yd(s)
  if (e === 'shape') return !0
  const n = Jd(s)
  return n instanceof qi ? n : gl(n, i)
}
function Kd (s, t) {
  const e = s.getDatasetMeta(t)
  return e && s.isDatasetVisible(t) ? e.dataset : null
}
function Jd (s) {
  return (s.scale || {}).getPointPositionForValue ? tf(s) : Qd(s)
}
function Qd (s) {
  const { scale: t = {}, fill: e } = s
  const i = $d(e, t)
  if (K(i)) {
    const n = t.isHorizontal()
    return { x: n ? i : null, y: n ? null : i }
  }
  return null
}
function tf (s) {
  const { scale: t, fill: e } = s
  const i = t.options
  const n = t.getLabels().length
  const r = i.reverse ? t.max : t.min
  const o = jd(e, t, r)
  const a = []
  if (i.grid.circular) {
    const l = t.getPointPositionForValue(0, r)
    return new qi({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(o)
    })
  }
  for (let l = 0; l < n; ++l) a.push(t.getPointPositionForValue(l, o))
  return a
}
function fr (s, t, e) {
  const i = Xd(t)
  const { line: n, scale: r, axis: o } = t
  const a = n.options
  const l = a.fill
  const c = a.backgroundColor
  const { above: h = c, below: u = c } = l || {}
  i &&
        n.points.length &&
        (ks(s, e),
        ef(s, {
          line: n,
          target: i,
          above: h,
          below: u,
          area: e,
          scale: r,
          axis: o
        }),
        Ms(s))
}
function ef (s, t) {
  const { line: e, target: i, above: n, below: r, area: o, scale: a } = t
  const l = e._loop ? 'angle' : t.axis
  s.save(),
  l === 'x' &&
            r !== n &&
            (Ra(s, i, o.top),
            Na(s, { line: e, target: i, color: n, scale: a, property: l }),
            s.restore(),
            s.save(),
            Ra(s, i, o.bottom)),
  Na(s, { line: e, target: i, color: r, scale: a, property: l }),
  s.restore()
}
function Ra (s, t, e) {
  const { segments: i, points: n } = t
  let r = !0
  let o = !1
  s.beginPath()
  for (const a of i) {
    const { start: l, end: c } = a
    const h = n[l]
    const u = n[Dr(l, c, n)]
    r
      ? (s.moveTo(h.x, h.y), (r = !1))
      : (s.lineTo(h.x, e), s.lineTo(h.x, h.y)),
    (o = !!t.pathSegment(s, a, { move: o })),
    o ? s.closePath() : s.lineTo(u.x, e)
  }
  s.lineTo(t.first().x, e), s.closePath(), s.clip()
}
function Na (s, t) {
  const { line: e, target: i, property: n, color: r, scale: o } = t
  const a = Wd(e, i, n)
  for (const { source: l, target: c, start: h, end: u } of a) {
    const { style: { backgroundColor: d = r } = {} } = l
    const f = i !== !0
    s.save(), (s.fillStyle = d), sf(s, o, f && Tr(n, h, u)), s.beginPath()
    const m = !!e.pathSegment(s, l)
    let g
    if (f) {
      m ? s.closePath() : Wa(s, i, u, n)
      const p = !!i.pathSegment(s, c, { move: m, reverse: !0 });
      (g = m && p), g || Wa(s, i, h, n)
    }
    s.closePath(), s.fill(g ? 'evenodd' : 'nonzero'), s.restore()
  }
}
function sf (s, t, e) {
  const { top: i, bottom: n } = t.chart.chartArea
  const { property: r, start: o, end: a } = e || {}
  r === 'x' && (s.beginPath(), s.rect(o, i, a - o, n - i), s.clip())
}
function Wa (s, t, e, i) {
  const n = t.interpolate(e, i)
  n && s.lineTo(n.x, n.y)
}
const nf = {
  id: 'filler',
  afterDatasetsUpdate (s, t, e) {
    const i = (s.data.datasets || []).length
    const n = []
    let r
    let o
    let a
    let l
    for (o = 0; o < i; ++o) {
      (r = s.getDatasetMeta(o)),
      (a = r.dataset),
      (l = null),
      a &&
                    a.options &&
                    a instanceof Nt &&
                    (l = {
                      visible: s.isDatasetVisible(o),
                      index: o,
                      fill: Hd(a, o, i),
                      chart: s,
                      axis: r.controller.options.indexAxis,
                      scale: r.vScale,
                      line: a
                    }),
      (r.$filler = l),
      n.push(l)
    }
    for (o = 0; o < i; ++o) {
      (l = n[o]),
      !(!l || l.fill === !1) && (l.fill = Vd(n, o, e.propagate))
    }
  },
  beforeDraw (s, t, e) {
    const i = e.drawTime === 'beforeDraw'
    const n = s.getSortedVisibleDatasetMetas()
    const r = s.chartArea
    for (let o = n.length - 1; o >= 0; --o) {
      const a = n[o].$filler
      a &&
                (a.line.updateControlPoints(r, a.axis),
                i && a.fill && fr(s.ctx, a, r))
    }
  },
  beforeDatasetsDraw (s, t, e) {
    if (e.drawTime !== 'beforeDatasetsDraw') return
    const i = s.getSortedVisibleDatasetMetas()
    for (let n = i.length - 1; n >= 0; --n) {
      const r = i[n].$filler
      Pa(r) && fr(s.ctx, r, s.chartArea)
    }
  },
  beforeDatasetDraw (s, t, e) {
    const i = t.meta.$filler
    !Pa(i) ||
            e.drawTime !== 'beforeDatasetDraw' ||
            fr(s.ctx, i, s.chartArea)
  },
  defaults: { propagate: !0, drawTime: 'beforeDatasetDraw' }
}
const za = (s, t) => {
  let { boxHeight: e = t, boxWidth: i = t } = s
  return (
    s.usePointStyle &&
            ((e = Math.min(e, t)), (i = s.pointStyleWidth || Math.min(i, t))),
    { boxWidth: i, boxHeight: e, itemHeight: Math.max(t, e) }
  )
}
const rf = (s, t) =>
  s !== null &&
    t !== null &&
    s.datasetIndex === t.datasetIndex &&
    s.index === t.index
const Gi = class extends yt {
  constructor (t) {
    super(),
    (this._added = !1),
    (this.legendHitBoxes = []),
    (this._hoveredItem = null),
    (this.doughnutMode = !1),
    (this.chart = t.chart),
    (this.options = t.options),
    (this.ctx = t.ctx),
    (this.legendItems = void 0),
    (this.columnSizes = void 0),
    (this.lineWidths = void 0),
    (this.maxHeight = void 0),
    (this.maxWidth = void 0),
    (this.top = void 0),
    (this.bottom = void 0),
    (this.left = void 0),
    (this.right = void 0),
    (this.height = void 0),
    (this.width = void 0),
    (this._margins = void 0),
    (this.position = void 0),
    (this.weight = void 0),
    (this.fullSize = void 0)
  }

  update (t, e, i) {
    (this.maxWidth = t),
    (this.maxHeight = e),
    (this._margins = i),
    this.setDimensions(),
    this.buildLabels(),
    this.fit()
  }

  setDimensions () {
    this.isHorizontal()
      ? ((this.width = this.maxWidth),
        (this.left = this._margins.left),
        (this.right = this.width))
      : ((this.height = this.maxHeight),
        (this.top = this._margins.top),
        (this.bottom = this.height))
  }

  buildLabels () {
    const t = this.options.labels || {}
    let e = j(t.generateLabels, [this.chart], this) || []
    t.filter && (e = e.filter((i) => t.filter(i, this.chart.data))),
    t.sort && (e = e.sort((i, n) => t.sort(i, n, this.chart.data))),
    this.options.reverse && e.reverse(),
    (this.legendItems = e)
  }

  fit () {
    const { options: t, ctx: e } = this
    if (!t.display) {
      this.width = this.height = 0
      return
    }
    const i = t.labels
    const n = st(i.font)
    const r = n.size
    const o = this._computeTitleHeight()
    const { boxWidth: a, itemHeight: l } = za(i, r)
    let c
    let h;
    (e.font = n.string),
    this.isHorizontal()
      ? ((c = this.maxWidth), (h = this._fitRows(o, r, a, l) + 10))
      : ((h = this.maxHeight), (c = this._fitCols(o, r, a, l) + 10)),
    (this.width = Math.min(c, t.maxWidth || this.maxWidth)),
    (this.height = Math.min(h, t.maxHeight || this.maxHeight))
  }

  _fitRows (t, e, i, n) {
    const {
      ctx: r,
      maxWidth: o,
      options: {
        labels: { padding: a }
      }
    } = this
    const l = (this.legendHitBoxes = [])
    const c = (this.lineWidths = [0])
    const h = n + a
    let u = t;
    (r.textAlign = 'left'), (r.textBaseline = 'middle')
    let d = -1
    let f = -h
    return (
      this.legendItems.forEach((m, g) => {
        const p = i + e / 2 + r.measureText(m.text).width;
        (g === 0 || c[c.length - 1] + p + 2 * a > o) &&
                    ((u += h),
                    (c[c.length - (g > 0 ? 0 : 1)] = 0),
                    (f += h),
                    d++),
        (l[g] = {
          left: 0,
          top: f,
          row: d,
          width: p,
          height: n
        }),
        (c[c.length - 1] += p + a)
      }),
      u
    )
  }

  _fitCols (t, e, i, n) {
    const {
      ctx: r,
      maxHeight: o,
      options: {
        labels: { padding: a }
      }
    } = this
    const l = (this.legendHitBoxes = [])
    const c = (this.columnSizes = [])
    const h = o - t
    let u = a
    let d = 0
    let f = 0
    let m = 0
    let g = 0
    return (
      this.legendItems.forEach((p, y) => {
        const b = i + e / 2 + r.measureText(p.text).width
        y > 0 &&
                    f + n + 2 * a > h &&
                    ((u += d + a),
                    c.push({ width: d, height: f }),
                    (m += d + a),
                    g++,
                    (d = f = 0)),
        (l[y] = {
          left: m,
          top: f,
          col: g,
          width: b,
          height: n
        }),
        (d = Math.max(d, b)),
        (f += n + a)
      }),
      (u += d),
      c.push({ width: d, height: f }),
      u
    )
  }

  adjustHitBoxes () {
    if (!this.options.display) return
    const t = this._computeTitleHeight()
    const {
      legendHitBoxes: e,
      options: {
        align: i,
        labels: { padding: n },
        rtl: r
      }
    } = this
    const o = ye(r, this.left, this.width)
    if (this.isHorizontal()) {
      let a = 0
      let l = ot(i, this.left + n, this.right - this.lineWidths[a])
      for (const c of e) {
        a !== c.row &&
                    ((a = c.row),
                    (l = ot(
                      i,
                      this.left + n,
                      this.right - this.lineWidths[a]
                    ))),
        (c.top += this.top + t + n),
        (c.left = o.leftForLtr(o.x(l), c.width)),
        (l += c.width + n)
      }
    } else {
      let a = 0
      let l = ot(
        i,
        this.top + t + n,
        this.bottom - this.columnSizes[a].height
      )
      for (const c of e) {
        c.col !== a &&
                    ((a = c.col),
                    (l = ot(
                      i,
                      this.top + t + n,
                      this.bottom - this.columnSizes[a].height
                    ))),
        (c.top = l),
        (c.left += this.left + n),
        (c.left = o.leftForLtr(o.x(c.left), c.width)),
        (l += c.height + n)
      }
    }
  }

  isHorizontal () {
    return (
      this.options.position === 'top' ||
            this.options.position === 'bottom'
    )
  }

  draw () {
    if (this.options.display) {
      const t = this.ctx
      ks(t, this), this._draw(), Ms(t)
    }
  }

  _draw () {
    const { options: t, columnSizes: e, lineWidths: i, ctx: n } = this
    const { align: r, labels: o } = t
    const a = L.color
    const l = ye(t.rtl, this.left, this.width)
    const c = st(o.font)
    const { color: h, padding: u } = o
    const d = c.size
    const f = d / 2
    let m
    this.drawTitle(),
    (n.textAlign = l.textAlign('left')),
    (n.textBaseline = 'middle'),
    (n.lineWidth = 0.5),
    (n.font = c.string)
    const { boxWidth: g, boxHeight: p, itemHeight: y } = za(o, d)
    const b = function (k, O, v) {
      if (isNaN(g) || g <= 0 || isNaN(p) || p < 0) return
      n.save()
      const F = C(v.lineWidth, 1)
      if (
        ((n.fillStyle = C(v.fillStyle, a)),
        (n.lineCap = C(v.lineCap, 'butt')),
        (n.lineDashOffset = C(v.lineDashOffset, 0)),
        (n.lineJoin = C(v.lineJoin, 'miter')),
        (n.lineWidth = F),
        (n.strokeStyle = C(v.strokeStyle, a)),
        n.setLineDash(C(v.lineDash, [])),
        o.usePointStyle)
      ) {
        const W = {
          radius: (p * Math.SQRT2) / 2,
          pointStyle: v.pointStyle,
          rotation: v.rotation,
          borderWidth: F
        }
        const R = l.xPlus(k, g / 2)
        const tt = O + f
        Yn(n, W, R, tt, o.pointStyleWidth && g)
      } else {
        const W = O + Math.max((d - p) / 2, 0)
        const R = l.leftForLtr(k, g)
        const tt = se(v.borderRadius)
        n.beginPath(),
        Object.values(tt).some((ct) => ct !== 0)
          ? We(n, { x: R, y: W, w: g, h: p, radius: tt })
          : n.rect(R, W, g, p),
        n.fill(),
        F !== 0 && n.stroke()
      }
      n.restore()
    }
    const _ = function (k, O, v) {
      ee(n, v.text, k, O + y / 2, c, {
        strikethrough: v.hidden,
        textAlign: l.textAlign(v.textAlign)
      })
    }
    const w = this.isHorizontal()
    const x = this._computeTitleHeight()
    w
      ? (m = {
          x: ot(r, this.left + u, this.right - i[0]),
          y: this.top + u + x,
          line: 0
        })
      : (m = {
          x: this.left + u,
          y: ot(r, this.top + x + u, this.bottom - e[0].height),
          line: 0
        }),
    er(this.ctx, t.textDirection)
    const S = y + u
    this.legendItems.forEach((k, O) => {
      (n.strokeStyle = k.fontColor || h),
      (n.fillStyle = k.fontColor || h)
      const v = n.measureText(k.text).width
      const F = l.textAlign(k.textAlign || (k.textAlign = o.textAlign))
      const W = g + f + v
      let R = m.x
      let tt = m.y
      l.setWidth(this.width),
      w
        ? O > 0 &&
                      R + W + u > this.right &&
                      ((tt = m.y += S),
                      m.line++,
                      (R = m.x = ot(r, this.left + u, this.right - i[m.line])))
        : O > 0 &&
                      tt + S > this.bottom &&
                      ((R = m.x = R + e[m.line].width + u),
                      m.line++,
                      (tt = m.y =
                          ot(
                            r,
                            this.top + x + u,
                            this.bottom - e[m.line].height
                          )))
      const ct = l.x(R)
      b(ct, tt, k),
      (R = Vo(F, R + g + f, w ? R + W : this.right, t.rtl)),
      _(l.x(R), tt, k),
      w ? (m.x += W + u) : (m.y += S)
    }),
    sr(this.ctx, t.textDirection)
  }

  drawTitle () {
    const t = this.options
    const e = t.title
    const i = st(e.font)
    const n = at(e.padding)
    if (!e.display) return
    const r = ye(t.rtl, this.left, this.width)
    const o = this.ctx
    const a = e.position
    const l = i.size / 2
    const c = n.top + l
    let h
    let u = this.left
    let d = this.width
    if (this.isHorizontal()) {
      (d = Math.max(...this.lineWidths)),
      (h = this.top + c),
      (u = ot(t.align, u, this.right - d))
    } else {
      const m = this.columnSizes.reduce(
        (g, p) => Math.max(g, p.height),
        0
      )
      h =
                c +
                ot(
                  t.align,
                  this.top,
                  this.bottom -
                        m -
                        t.labels.padding -
                        this._computeTitleHeight()
                )
    }
    const f = ot(a, u, u + d);
    (o.textAlign = r.textAlign(Ci(a))),
    (o.textBaseline = 'middle'),
    (o.strokeStyle = e.color),
    (o.fillStyle = e.color),
    (o.font = i.string),
    ee(o, e.text, f, h, i)
  }

  _computeTitleHeight () {
    const t = this.options.title
    const e = st(t.font)
    const i = at(t.padding)
    return t.display ? e.lineHeight + i.height : 0
  }

  _getLegendItemAt (t, e) {
    let i, n, r
    if (Lt(t, this.left, this.right) && Lt(e, this.top, this.bottom)) {
      for (r = this.legendHitBoxes, i = 0; i < r.length; ++i) {
        if (
          ((n = r[i]),
          Lt(t, n.left, n.left + n.width) &&
                        Lt(e, n.top, n.top + n.height))
        ) {
          return this.legendItems[i]
        }
      }
    }
    return null
  }

  handleEvent (t) {
    const e = this.options
    if (!of(t.type, e)) return
    const i = this._getLegendItemAt(t.x, t.y)
    if (t.type === 'mousemove' || t.type === 'mouseout') {
      const n = this._hoveredItem
      const r = rf(n, i)
      n && !r && j(e.onLeave, [t, n, this], this),
      (this._hoveredItem = i),
      i && !r && j(e.onHover, [t, i, this], this)
    } else i && j(e.onClick, [t, i, this], this)
  }
}
function of (s, t) {
  return !!(
    ((s === 'mousemove' || s === 'mouseout') && (t.onHover || t.onLeave)) ||
        (t.onClick && (s === 'click' || s === 'mouseup'))
  )
}
const af = {
  id: 'legend',
  _element: Gi,
  start (s, t, e) {
    const i = (s.legend = new Gi({ ctx: s.ctx, options: e, chart: s }))
    lt.configure(s, i, e), lt.addBox(s, i)
  },
  stop (s) {
    lt.removeBox(s, s.legend), delete s.legend
  },
  beforeUpdate (s, t, e) {
    const i = s.legend
    lt.configure(s, i, e), (i.options = e)
  },
  afterUpdate (s) {
    const t = s.legend
    t.buildLabels(), t.adjustHitBoxes()
  },
  afterEvent (s, t) {
    t.replay || s.legend.handleEvent(t.event)
  },
  defaults: {
    display: !0,
    position: 'top',
    align: 'center',
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick (s, t, e) {
      const i = t.datasetIndex
      const n = e.chart
      n.isDatasetVisible(i)
        ? (n.hide(i), (t.hidden = !0))
        : (n.show(i), (t.hidden = !1))
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (s) => s.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels (s) {
        const t = s.data.datasets
        const {
          labels: {
            usePointStyle: e,
            pointStyle: i,
            textAlign: n,
            color: r
          }
        } = s.legend.options
        return s._getSortedDatasetMetas().map((o) => {
          const a = o.controller.getStyle(e ? 0 : void 0)
          const l = at(a.borderWidth)
          return {
            text: t[o.index].label,
            fillStyle: a.backgroundColor,
            fontColor: r,
            hidden: !o.visible,
            lineCap: a.borderCapStyle,
            lineDash: a.borderDash,
            lineDashOffset: a.borderDashOffset,
            lineJoin: a.borderJoinStyle,
            lineWidth: (l.width + l.height) / 4,
            strokeStyle: a.borderColor,
            pointStyle: i || a.pointStyle,
            rotation: a.rotation,
            textAlign: n || a.textAlign,
            borderRadius: 0,
            datasetIndex: o.index
          }
        }, this)
      }
    },
    title: {
      color: (s) => s.chart.options.color,
      display: !1,
      position: 'center',
      text: ''
    }
  },
  descriptors: {
    _scriptable: (s) => !s.startsWith('on'),
    labels: {
      _scriptable: (s) =>
        !['generateLabels', 'filter', 'sort'].includes(s)
    }
  }
}
const Ps = class extends yt {
  constructor (t) {
    super(),
    (this.chart = t.chart),
    (this.options = t.options),
    (this.ctx = t.ctx),
    (this._padding = void 0),
    (this.top = void 0),
    (this.bottom = void 0),
    (this.left = void 0),
    (this.right = void 0),
    (this.width = void 0),
    (this.height = void 0),
    (this.position = void 0),
    (this.weight = void 0),
    (this.fullSize = void 0)
  }

  update (t, e) {
    const i = this.options
    if (((this.left = 0), (this.top = 0), !i.display)) {
      this.width = this.height = this.right = this.bottom = 0
      return
    }
    (this.width = this.right = t), (this.height = this.bottom = e)
    const n = $(i.text) ? i.text.length : 1
    this._padding = at(i.padding)
    const r = n * st(i.font).lineHeight + this._padding.height
    this.isHorizontal() ? (this.height = r) : (this.width = r)
  }

  isHorizontal () {
    const t = this.options.position
    return t === 'top' || t === 'bottom'
  }

  _drawArgs (t) {
    const { top: e, left: i, bottom: n, right: r, options: o } = this
    const a = o.align
    let l = 0
    let c
    let h
    let u
    return (
      this.isHorizontal()
        ? ((h = ot(a, i, r)), (u = e + t), (c = r - i))
        : (o.position === 'left'
            ? ((h = i + t), (u = ot(a, n, e)), (l = Y * -0.5))
            : ((h = r - t), (u = ot(a, e, n)), (l = Y * 0.5)),
          (c = n - e)),
      { titleX: h, titleY: u, maxWidth: c, rotation: l }
    )
  }

  draw () {
    const t = this.ctx
    const e = this.options
    if (!e.display) return
    const i = st(e.font)
    const r = i.lineHeight / 2 + this._padding.top
    const {
      titleX: o,
      titleY: a,
      maxWidth: l,
      rotation: c
    } = this._drawArgs(r)
    ee(t, e.text, 0, 0, i, {
      color: e.color,
      maxWidth: l,
      rotation: c,
      textAlign: Ci(e.align),
      textBaseline: 'middle',
      translation: [o, a]
    })
  }
}
function lf (s, t) {
  const e = new Ps({ ctx: s.ctx, options: t, chart: s })
  lt.configure(s, e, t), lt.addBox(s, e), (s.titleBlock = e)
}
const cf = {
  id: 'title',
  _element: Ps,
  start (s, t, e) {
    lf(s, e)
  },
  stop (s) {
    const t = s.titleBlock
    lt.removeBox(s, t), delete s.titleBlock
  },
  beforeUpdate (s, t, e) {
    const i = s.titleBlock
    lt.configure(s, i, e), (i.options = e)
  },
  defaults: {
    align: 'center',
    display: !1,
    font: { weight: 'bold' },
    fullSize: !0,
    padding: 10,
    position: 'top',
    text: '',
    weight: 2e3
  },
  defaultRoutes: { color: 'color' },
  descriptors: { _scriptable: !0, _indexable: !1 }
}
const Vi = new WeakMap()
const hf = {
  id: 'subtitle',
  start (s, t, e) {
    const i = new Ps({ ctx: s.ctx, options: e, chart: s })
    lt.configure(s, i, e), lt.addBox(s, i), Vi.set(s, i)
  },
  stop (s) {
    lt.removeBox(s, Vi.get(s)), Vi.delete(s)
  },
  beforeUpdate (s, t, e) {
    const i = Vi.get(s)
    lt.configure(s, i, e), (i.options = e)
  },
  defaults: {
    align: 'center',
    display: !1,
    font: { weight: 'normal' },
    fullSize: !0,
    padding: 0,
    position: 'top',
    text: '',
    weight: 1500
  },
  defaultRoutes: { color: 'color' },
  descriptors: { _scriptable: !0, _indexable: !1 }
}
const Is = {
  average (s) {
    if (!s.length) return !1
    let t
    let e
    let i = 0
    let n = 0
    let r = 0
    for (t = 0, e = s.length; t < e; ++t) {
      const o = s[t].element
      if (o && o.hasValue()) {
        const a = o.tooltipPosition();
        (i += a.x), (n += a.y), ++r
      }
    }
    return { x: i / r, y: n / r }
  },
  nearest (s, t) {
    if (!s.length) return !1
    let e = t.x
    let i = t.y
    let n = Number.POSITIVE_INFINITY
    let r
    let o
    let a
    for (r = 0, o = s.length; r < o; ++r) {
      const l = s[r].element
      if (l && l.hasValue()) {
        const c = l.getCenterPoint()
        const h = Ti(t, c)
        h < n && ((n = h), (a = l))
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      (e = l.x), (i = l.y)
    }
    return { x: e, y: i }
  }
}
function Pt (s, t) {
  return t && ($(t) ? Array.prototype.push.apply(s, t) : s.push(t)), s
}
function Ut (s) {
  return (typeof s === 'string' || s instanceof String) &&
        s.indexOf(`
`) > -1
    ? s.split(`
`)
    : s
}
function uf (s, t) {
  const { element: e, datasetIndex: i, index: n } = t
  const r = s.getDatasetMeta(i).controller
  const { label: o, value: a } = r.getLabelAndValue(n)
  return {
    chart: s,
    label: o,
    parsed: r.getParsed(n),
    raw: s.data.datasets[i].data[n],
    formattedValue: a,
    dataset: r.getDataset(),
    dataIndex: n,
    datasetIndex: i,
    element: e
  }
}
function Va (s, t) {
  const e = s.chart.ctx
  const { body: i, footer: n, title: r } = s
  const { boxWidth: o, boxHeight: a } = t
  const l = st(t.bodyFont)
  const c = st(t.titleFont)
  const h = st(t.footerFont)
  const u = r.length
  const d = n.length
  const f = i.length
  const m = at(t.padding)
  let g = m.height
  let p = 0
  let y = i.reduce(
    (w, x) => w + x.before.length + x.lines.length + x.after.length,
    0
  )
  if (
    ((y += s.beforeBody.length + s.afterBody.length),
    u &&
            (g +=
                u * c.lineHeight +
                (u - 1) * t.titleSpacing +
                t.titleMarginBottom),
    y)
  ) {
    const w = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight
    g += f * w + (y - f) * l.lineHeight + (y - 1) * t.bodySpacing
  }
  d &&
        (g += t.footerMarginTop + d * h.lineHeight + (d - 1) * t.footerSpacing)
  let b = 0
  const _ = function (w) {
    p = Math.max(p, e.measureText(w).width + b)
  }
  return (
    e.save(),
    (e.font = c.string),
    H(s.title, _),
    (e.font = l.string),
    H(s.beforeBody.concat(s.afterBody), _),
    (b = t.displayColors ? o + 2 + t.boxPadding : 0),
    H(i, (w) => {
      H(w.before, _), H(w.lines, _), H(w.after, _)
    }),
    (b = 0),
    (e.font = h.string),
    H(s.footer, _),
    e.restore(),
    (p += m.width),
    { width: p, height: g }
  )
}
function df (s, t) {
  const { y: e, height: i } = t
  return e < i / 2 ? 'top' : e > s.height - i / 2 ? 'bottom' : 'center'
}
function ff (s, t, e, i) {
  const { x: n, width: r } = i
  const o = e.caretSize + e.caretPadding
  if (
    (s === 'left' && n + r + o > t.width) ||
        (s === 'right' && n - r - o < 0)
  ) {
    return !0
  }
}
function mf (s, t, e, i) {
  const { x: n, width: r } = e
  const {
    width: o,
    chartArea: { left: a, right: l }
  } = s
  let c = 'center'
  return (
    i === 'center'
      ? (c = n <= (a + l) / 2 ? 'left' : 'right')
      : n <= r / 2
        ? (c = 'left')
        : n >= o - r / 2 && (c = 'right'),
    ff(c, s, t, e) && (c = 'center'),
    c
  )
}
function Ha (s, t, e) {
  const i = e.yAlign || t.yAlign || df(s, e)
  return { xAlign: e.xAlign || t.xAlign || mf(s, t, e, i), yAlign: i }
}
function gf (s, t) {
  let { x: e, width: i } = s
  return t === 'right' ? (e -= i) : t === 'center' && (e -= i / 2), e
}
function pf (s, t, e) {
  let { y: i, height: n } = s
  return (
    t === 'top' ? (i += e) : t === 'bottom' ? (i -= n + e) : (i -= n / 2), i
  )
}
function Ba (s, t, e, i) {
  const { caretSize: n, caretPadding: r, cornerRadius: o } = s
  const { xAlign: a, yAlign: l } = e
  const c = n + r
  const { topLeft: h, topRight: u, bottomLeft: d, bottomRight: f } = se(o)
  let m = gf(t, a)
  const g = pf(t, l, c)
  return (
    l === 'center'
      ? a === 'left'
        ? (m += c)
        : a === 'right' && (m -= c)
      : a === 'left'
        ? (m -= Math.max(h, d) + n)
        : a === 'right' && (m += Math.max(u, f) + n),
    { x: it(m, 0, i.width - t.width), y: it(g, 0, i.height - t.height) }
  )
}
function Hi (s, t, e) {
  const i = at(e.padding)
  return t === 'center'
    ? s.x + s.width / 2
    : t === 'right'
      ? s.x + s.width - i.right
      : s.x + i.left
}
function $a (s) {
  return Pt([], Ut(s))
}
function yf (s, t, e) {
  return $t(s, { tooltip: t, tooltipItems: e, type: 'tooltip' })
}
function ja (s, t) {
  const e =
        t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks
  return e ? s.override(e) : s
}
const Rs = class extends yt {
  constructor (t) {
    super(),
    (this.opacity = 0),
    (this._active = []),
    (this._eventPosition = void 0),
    (this._size = void 0),
    (this._cachedAnimations = void 0),
    (this._tooltipItems = []),
    (this.$animations = void 0),
    (this.$context = void 0),
    (this.chart = t.chart || t._chart),
    (this._chart = this.chart),
    (this.options = t.options),
    (this.dataPoints = void 0),
    (this.title = void 0),
    (this.beforeBody = void 0),
    (this.body = void 0),
    (this.afterBody = void 0),
    (this.footer = void 0),
    (this.xAlign = void 0),
    (this.yAlign = void 0),
    (this.x = void 0),
    (this.y = void 0),
    (this.height = void 0),
    (this.width = void 0),
    (this.caretX = void 0),
    (this.caretY = void 0),
    (this.labelColors = void 0),
    (this.labelPointStyles = void 0),
    (this.labelTextColors = void 0)
  }

  initialize (t) {
    (this.options = t),
    (this._cachedAnimations = void 0),
    (this.$context = void 0)
  }

  _resolveAnimations () {
    const t = this._cachedAnimations
    if (t) return t
    const e = this.chart
    const i = this.options.setContext(this.getContext())
    const n = i.enabled && e.options.animation && i.animations
    const r = new ji(this.chart, n)
    return n._cacheable && (this._cachedAnimations = Object.freeze(r)), r
  }

  getContext () {
    return (
      this.$context ||
            (this.$context = yf(
              this.chart.getContext(),
              this,
              this._tooltipItems
            ))
    )
  }

  getTitle (t, e) {
    const { callbacks: i } = e
    const n = i.beforeTitle.apply(this, [t])
    const r = i.title.apply(this, [t])
    const o = i.afterTitle.apply(this, [t])
    let a = []
    return (a = Pt(a, Ut(n))), (a = Pt(a, Ut(r))), (a = Pt(a, Ut(o))), a
  }

  getBeforeBody (t, e) {
    return $a(e.callbacks.beforeBody.apply(this, [t]))
  }

  getBody (t, e) {
    const { callbacks: i } = e
    const n = []
    return (
      H(t, (r) => {
        const o = { before: [], lines: [], after: [] }
        const a = ja(i, r)
        Pt(o.before, Ut(a.beforeLabel.call(this, r))),
        Pt(o.lines, a.label.call(this, r)),
        Pt(o.after, Ut(a.afterLabel.call(this, r))),
        n.push(o)
      }),
      n
    )
  }

  getAfterBody (t, e) {
    return $a(e.callbacks.afterBody.apply(this, [t]))
  }

  getFooter (t, e) {
    const { callbacks: i } = e
    const n = i.beforeFooter.apply(this, [t])
    const r = i.footer.apply(this, [t])
    const o = i.afterFooter.apply(this, [t])
    let a = []
    return (a = Pt(a, Ut(n))), (a = Pt(a, Ut(r))), (a = Pt(a, Ut(o))), a
  }

  _createItems (t) {
    const e = this._active
    const i = this.chart.data
    const n = []
    const r = []
    const o = []
    let a = []
    let l
    let c
    for (l = 0, c = e.length; l < c; ++l) a.push(uf(this.chart, e[l]))
    return (
      t.filter && (a = a.filter((h, u, d) => t.filter(h, u, d, i))),
      t.itemSort && (a = a.sort((h, u) => t.itemSort(h, u, i))),
      H(a, (h) => {
        const u = ja(t.callbacks, h)
        n.push(u.labelColor.call(this, h)),
        r.push(u.labelPointStyle.call(this, h)),
        o.push(u.labelTextColor.call(this, h))
      }),
      (this.labelColors = n),
      (this.labelPointStyles = r),
      (this.labelTextColors = o),
      (this.dataPoints = a),
      a
    )
  }

  update (t, e) {
    const i = this.options.setContext(this.getContext())
    const n = this._active
    let r
    let o = []
    if (!n.length) this.opacity !== 0 && (r = { opacity: 0 })
    else {
      const a = Is[i.position].call(this, n, this._eventPosition);
      (o = this._createItems(i)),
      (this.title = this.getTitle(o, i)),
      (this.beforeBody = this.getBeforeBody(o, i)),
      (this.body = this.getBody(o, i)),
      (this.afterBody = this.getAfterBody(o, i)),
      (this.footer = this.getFooter(o, i))
      const l = (this._size = Va(this, i))
      const c = Object.assign({}, a, l)
      const h = Ha(this.chart, i, c)
      const u = Ba(i, c, h, this.chart);
      (this.xAlign = h.xAlign),
      (this.yAlign = h.yAlign),
      (r = {
        opacity: 1,
        x: u.x,
        y: u.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      })
    }
    (this._tooltipItems = o),
    (this.$context = void 0),
    r && this._resolveAnimations().update(this, r),
    t &&
                i.external &&
                i.external.call(this, {
                  chart: this.chart,
                  tooltip: this,
                  replay: e
                })
  }

  drawCaret (t, e, i, n) {
    const r = this.getCaretPosition(t, i, n)
    e.lineTo(r.x1, r.y1), e.lineTo(r.x2, r.y2), e.lineTo(r.x3, r.y3)
  }

  getCaretPosition (t, e, i) {
    const { xAlign: n, yAlign: r } = this
    const { caretSize: o, cornerRadius: a } = i
    const {
      topLeft: l,
      topRight: c,
      bottomLeft: h,
      bottomRight: u
    } = se(a)
    const { x: d, y: f } = t
    const { width: m, height: g } = e
    let p
    let y
    let b
    let _
    let w
    let x
    return (
      r === 'center'
        ? ((w = f + g / 2),
          n === 'left'
            ? ((p = d), (y = p - o), (_ = w + o), (x = w - o))
            : ((p = d + m), (y = p + o), (_ = w - o), (x = w + o)),
          (b = p))
        : (n === 'left'
            ? (y = d + Math.max(l, h) + o)
            : n === 'right'
              ? (y = d + m - Math.max(c, u) - o)
              : (y = this.caretX),
          r === 'top'
            ? ((_ = f), (w = _ - o), (p = y - o), (b = y + o))
            : ((_ = f + g), (w = _ + o), (p = y + o), (b = y - o)),
          (x = _)),
      { x1: p, x2: y, x3: b, y1: _, y2: w, y3: x }
    )
  }

  drawTitle (t, e, i) {
    const n = this.title
    const r = n.length
    let o
    let a
    let l
    if (r) {
      const c = ye(i.rtl, this.x, this.width)
      for (
        t.x = Hi(this, i.titleAlign, i),
        e.textAlign = c.textAlign(i.titleAlign),
        e.textBaseline = 'middle',
        o = st(i.titleFont),
        a = i.titleSpacing,
        e.fillStyle = i.titleColor,
        e.font = o.string,
        l = 0;
        l < r;
        ++l
      ) {
        e.fillText(n[l], c.x(t.x), t.y + o.lineHeight / 2),
        (t.y += o.lineHeight + a),
        l + 1 === r && (t.y += i.titleMarginBottom - a)
      }
    }
  }

  _drawColorBox (t, e, i, n, r) {
    const o = this.labelColors[i]
    const a = this.labelPointStyles[i]
    const { boxHeight: l, boxWidth: c, boxPadding: h } = r
    const u = st(r.bodyFont)
    const d = Hi(this, 'left', r)
    const f = n.x(d)
    const m = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0
    const g = e.y + m
    if (r.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }
      const y = n.leftForLtr(f, c) + c / 2
      const b = g + l / 2;
      (t.strokeStyle = r.multiKeyBackground),
      (t.fillStyle = r.multiKeyBackground),
      Fi(t, p, y, b),
      (t.strokeStyle = o.borderColor),
      (t.fillStyle = o.backgroundColor),
      Fi(t, p, y, b)
    } else {
      (t.lineWidth = A(o.borderWidth)
        ? Math.max(...Object.values(o.borderWidth))
        : o.borderWidth || 1),
      (t.strokeStyle = o.borderColor),
      t.setLineDash(o.borderDash || []),
      (t.lineDashOffset = o.borderDashOffset || 0)
      const p = n.leftForLtr(f, c - h)
      const y = n.leftForLtr(n.xPlus(f, 1), c - h - 2)
      const b = se(o.borderRadius)
      Object.values(b).some((_) => _ !== 0)
        ? (t.beginPath(),
          (t.fillStyle = r.multiKeyBackground),
          We(t, { x: p, y: g, w: c, h: l, radius: b }),
          t.fill(),
          t.stroke(),
          (t.fillStyle = o.backgroundColor),
          t.beginPath(),
          We(t, { x: y, y: g + 1, w: c - 2, h: l - 2, radius: b }),
          t.fill())
        : ((t.fillStyle = r.multiKeyBackground),
          t.fillRect(p, g, c, l),
          t.strokeRect(p, g, c, l),
          (t.fillStyle = o.backgroundColor),
          t.fillRect(y, g + 1, c - 2, l - 2))
    }
    t.fillStyle = this.labelTextColors[i]
  }

  drawBody (t, e, i) {
    const { body: n } = this
    const {
      bodySpacing: r,
      bodyAlign: o,
      displayColors: a,
      boxHeight: l,
      boxWidth: c,
      boxPadding: h
    } = i
    const u = st(i.bodyFont)
    let d = u.lineHeight
    let f = 0
    const m = ye(i.rtl, this.x, this.width)
    const g = function (O) {
      e.fillText(O, m.x(t.x + f), t.y + d / 2), (t.y += d + r)
    }
    const p = m.textAlign(o)
    let y
    let b
    let _
    let w
    let x
    let S
    let k
    for (
      e.textAlign = o,
      e.textBaseline = 'middle',
      e.font = u.string,
      t.x = Hi(this, p, i),
      e.fillStyle = i.bodyColor,
      H(this.beforeBody, g),
      f =
                    a && p !== 'right'
                      ? o === 'center'
                        ? c / 2 + h
                        : c + 2 + h
                      : 0,
      w = 0,
      S = n.length;
      w < S;
      ++w
    ) {
      for (
        y = n[w],
        b = this.labelTextColors[w],
        e.fillStyle = b,
        H(y.before, g),
        _ = y.lines,
        a &&
                        _.length &&
                        (this._drawColorBox(e, t, w, m, i),
                        (d = Math.max(u.lineHeight, l))),
        x = 0,
        k = _.length;
        x < k;
        ++x
      ) {
        g(_[x]), (d = u.lineHeight)
      }
      H(y.after, g)
    }
    (f = 0), (d = u.lineHeight), H(this.afterBody, g), (t.y -= r)
  }

  drawFooter (t, e, i) {
    const n = this.footer
    const r = n.length
    let o
    let a
    if (r) {
      const l = ye(i.rtl, this.x, this.width)
      for (
        t.x = Hi(this, i.footerAlign, i),
        t.y += i.footerMarginTop,
        e.textAlign = l.textAlign(i.footerAlign),
        e.textBaseline = 'middle',
        o = st(i.footerFont),
        e.fillStyle = i.footerColor,
        e.font = o.string,
        a = 0;
        a < r;
        ++a
      ) {
        e.fillText(n[a], l.x(t.x), t.y + o.lineHeight / 2),
        (t.y += o.lineHeight + i.footerSpacing)
      }
    }
  }

  drawBackground (t, e, i, n) {
    const { xAlign: r, yAlign: o } = this
    const { x: a, y: l } = t
    const { width: c, height: h } = i
    const {
      topLeft: u,
      topRight: d,
      bottomLeft: f,
      bottomRight: m
    } = se(n.cornerRadius);
    (e.fillStyle = n.backgroundColor),
    (e.strokeStyle = n.borderColor),
    (e.lineWidth = n.borderWidth),
    e.beginPath(),
    e.moveTo(a + u, l),
    o === 'top' && this.drawCaret(t, e, i, n),
    e.lineTo(a + c - d, l),
    e.quadraticCurveTo(a + c, l, a + c, l + d),
    o === 'center' && r === 'right' && this.drawCaret(t, e, i, n),
    e.lineTo(a + c, l + h - m),
    e.quadraticCurveTo(a + c, l + h, a + c - m, l + h),
    o === 'bottom' && this.drawCaret(t, e, i, n),
    e.lineTo(a + f, l + h),
    e.quadraticCurveTo(a, l + h, a, l + h - f),
    o === 'center' && r === 'left' && this.drawCaret(t, e, i, n),
    e.lineTo(a, l + u),
    e.quadraticCurveTo(a, l, a + u, l),
    e.closePath(),
    e.fill(),
    n.borderWidth > 0 && e.stroke()
  }

  _updateAnimationTarget (t) {
    const e = this.chart
    const i = this.$animations
    const n = i && i.x
    const r = i && i.y
    if (n || r) {
      const o = Is[t.position].call(
        this,
        this._active,
        this._eventPosition
      )
      if (!o) return
      const a = (this._size = Va(this, t))
      const l = Object.assign({}, o, this._size)
      const c = Ha(e, t, l)
      const h = Ba(t, l, c, e);
      (n._to !== h.x || r._to !== h.y) &&
                ((this.xAlign = c.xAlign),
                (this.yAlign = c.yAlign),
                (this.width = a.width),
                (this.height = a.height),
                (this.caretX = o.x),
                (this.caretY = o.y),
                this._resolveAnimations().update(this, h))
    }
  }

  _willRender () {
    return !!this.opacity
  }

  draw (t) {
    const e = this.options.setContext(this.getContext())
    let i = this.opacity
    if (!i) return
    this._updateAnimationTarget(e)
    const n = { width: this.width, height: this.height }
    const r = { x: this.x, y: this.y }
    i = Math.abs(i) < 0.001 ? 0 : i
    const o = at(e.padding)
    const a =
            this.title.length ||
            this.beforeBody.length ||
            this.body.length ||
            this.afterBody.length ||
            this.footer.length
    e.enabled &&
            a &&
            (t.save(),
            (t.globalAlpha = i),
            this.drawBackground(r, t, n, e),
            er(t, e.textDirection),
            (r.y += o.top),
            this.drawTitle(r, t, e),
            this.drawBody(r, t, e),
            this.drawFooter(r, t, e),
            sr(t, e.textDirection),
            t.restore())
  }

  getActiveElements () {
    return this._active || []
  }

  setActiveElements (t, e) {
    const i = this._active
    const n = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a)
      if (!c) throw new Error('Cannot find a dataset at index ' + a)
      return { datasetIndex: a, element: c.data[l], index: l }
    })
    const r = !ws(i, n)
    const o = this._positionChanged(n, e);
    (r || o) &&
            ((this._active = n),
            (this._eventPosition = e),
            (this._ignoreReplayEvents = !0),
            this.update(!0))
  }

  handleEvent (t, e, i = !0) {
    if (e && this._ignoreReplayEvents) return !1
    this._ignoreReplayEvents = !1
    const n = this.options
    const r = this._active || []
    const o = this._getActiveElements(t, r, e, i)
    const a = this._positionChanged(o, t)
    const l = e || !ws(o, r) || a
    return (
      l &&
                ((this._active = o),
                (n.enabled || n.external) &&
                    ((this._eventPosition = { x: t.x, y: t.y }),
                    this.update(!0, e))),
      l
    )
  }

  _getActiveElements (t, e, i, n) {
    const r = this.options
    if (t.type === 'mouseout') return []
    if (!n) return e
    const o = this.chart.getElementsAtEventForMode(t, r.mode, r, i)
    return r.reverse && o.reverse(), o
  }

  _positionChanged (t, e) {
    const { caretX: i, caretY: n, options: r } = this
    const o = Is[r.position].call(this, t, e)
    return o !== !1 && (i !== o.x || n !== o.y)
  }
}
Rs.positioners = Is
const bf = {
  id: 'tooltip',
  _element: Rs,
  positioners: Is,
  afterInit (s, t, e) {
    e && (s.tooltip = new Rs({ chart: s, options: e }))
  },
  beforeUpdate (s, t, e) {
    s.tooltip && s.tooltip.initialize(e)
  },
  reset (s, t, e) {
    s.tooltip && s.tooltip.initialize(e)
  },
  afterDraw (s) {
    const t = s.tooltip
    if (t && t._willRender()) {
      const e = { tooltip: t }
      if (s.notifyPlugins('beforeTooltipDraw', e) === !1) return
      t.draw(s.ctx), s.notifyPlugins('afterTooltipDraw', e)
    }
  },
  afterEvent (s, t) {
    if (s.tooltip) {
      const e = t.replay
      s.tooltip.handleEvent(t.event, e, t.inChartArea) &&
                (t.changed = !0)
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: 'average',
    backgroundColor: 'rgba(0,0,0,0.8)',
    titleColor: '#fff',
    titleFont: { weight: 'bold' },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: 'left',
    bodyColor: '#fff',
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: 'left',
    footerColor: '#fff',
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: { weight: 'bold' },
    footerAlign: 'left',
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (s, t) => t.bodyFont.size,
    boxWidth: (s, t) => t.bodyFont.size,
    multiKeyBackground: '#fff',
    displayColors: !0,
    boxPadding: 0,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    animation: { duration: 400, easing: 'easeOutQuart' },
    animations: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY']
      },
      opacity: { easing: 'linear', duration: 200 }
    },
    callbacks: {
      beforeTitle: At,
      title (s) {
        if (s.length > 0) {
          const t = s[0]
          const e = t.chart.data.labels
          const i = e ? e.length : 0
          if (
            this &&
                        this.options &&
                        this.options.mode === 'dataset'
          ) {
            return t.dataset.label || ''
          }
          if (t.label) return t.label
          if (i > 0 && t.dataIndex < i) return e[t.dataIndex]
        }
        return ''
      },
      afterTitle: At,
      beforeBody: At,
      beforeLabel: At,
      label (s) {
        if (this && this.options && this.options.mode === 'dataset') {
          return (
            s.label + ': ' + s.formattedValue || s.formattedValue
          )
        }
        let t = s.dataset.label || ''
        t && (t += ': ')
        const e = s.formattedValue
        return N(e) || (t += e), t
      },
      labelColor (s) {
        const e = s.chart
          .getDatasetMeta(s.datasetIndex)
          .controller.getStyle(s.dataIndex)
        return {
          borderColor: e.borderColor,
          backgroundColor: e.backgroundColor,
          borderWidth: e.borderWidth,
          borderDash: e.borderDash,
          borderDashOffset: e.borderDashOffset,
          borderRadius: 0
        }
      },
      labelTextColor () {
        return this.options.bodyColor
      },
      labelPointStyle (s) {
        const e = s.chart
          .getDatasetMeta(s.datasetIndex)
          .controller.getStyle(s.dataIndex)
        return { pointStyle: e.pointStyle, rotation: e.rotation }
      },
      afterLabel: At,
      afterBody: At,
      beforeFooter: At,
      footer: At,
      afterFooter: At
    }
  },
  defaultRoutes: {
    bodyFont: 'font',
    footerFont: 'font',
    titleFont: 'font'
  },
  descriptors: {
    _scriptable: (s) =>
      s !== 'filter' && s !== 'itemSort' && s !== 'external',
    _indexable: !1,
    callbacks: { _scriptable: !1, _indexable: !1 },
    animation: { _fallback: !1 },
    animations: { _fallback: 'animation' }
  },
  additionalOptionScopes: ['interaction']
}
const xf = Object.freeze({
  __proto__: null,
  Decimation: Nd,
  Filler: nf,
  Legend: af,
  SubTitle: hf,
  Title: cf,
  Tooltip: bf
})
const _f = (s, t, e, i) => (
  typeof t === 'string'
    ? ((e = s.push(t) - 1), i.unshift({ index: e, label: t }))
    : isNaN(t) && (e = null),
  e
)
function wf (s, t, e, i) {
  const n = s.indexOf(t)
  if (n === -1) return _f(s, t, e, i)
  const r = s.lastIndexOf(t)
  return n !== r ? e : n
}
const Sf = (s, t) => (s === null ? null : it(Math.round(s), 0, t))
const Je = class extends Yt {
  constructor (t) {
    super(t),
    (this._startValue = void 0),
    (this._valueRange = 0),
    (this._addedLabels = [])
  }

  init (t) {
    const e = this._addedLabels
    if (e.length) {
      const i = this.getLabels()
      for (const { index: n, label: r } of e) {
        i[n] === r && i.splice(n, 1)
      }
      this._addedLabels = []
    }
    super.init(t)
  }

  parse (t, e) {
    if (N(t)) return null
    const i = this.getLabels()
    return (
      (e =
                isFinite(e) && i[e] === t
                  ? e
                  : wf(i, t, C(e, t), this._addedLabels)),
      Sf(e, i.length - 1)
    )
  }

  determineDataLimits () {
    const { minDefined: t, maxDefined: e } = this.getUserBounds()
    let { min: i, max: n } = this.getMinMax(!0)
    this.options.bounds === 'ticks' &&
            (t || (i = 0), e || (n = this.getLabels().length - 1)),
    (this.min = i),
    (this.max = n)
  }

  buildTicks () {
    const t = this.min
    const e = this.max
    const i = this.options.offset
    const n = []
    let r = this.getLabels();
    (r = t === 0 && e === r.length - 1 ? r : r.slice(t, e + 1)),
    (this._valueRange = Math.max(r.length - (i ? 0 : 1), 1)),
    (this._startValue = this.min - (i ? 0.5 : 0))
    for (let o = t; o <= e; o++) n.push({ value: o })
    return n
  }

  getLabelForValue (t) {
    const e = this.getLabels()
    return t >= 0 && t < e.length ? e[t] : t
  }

  configure () {
    super.configure(),
    this.isHorizontal() || (this._reversePixels = !this._reversePixels)
  }

  getPixelForValue (t) {
    return (
      typeof t !== 'number' && (t = this.parse(t)),
      t === null
        ? NaN
        : this.getPixelForDecimal(
          (t - this._startValue) / this._valueRange
        )
    )
  }

  getPixelForTick (t) {
    const e = this.ticks
    return t < 0 || t > e.length - 1
      ? null
      : this.getPixelForValue(e[t].value)
  }

  getValueForPixel (t) {
    return Math.round(
      this._startValue + this.getDecimalForPixel(t) * this._valueRange
    )
  }

  getBasePixel () {
    return this.bottom
  }
}
Je.id = 'category'
Je.defaults = { ticks: { callback: Je.prototype.getLabelForValue } }
function kf (s, t) {
  const e = []
  const {
    bounds: n,
    step: r,
    min: o,
    max: a,
    precision: l,
    count: c,
    maxTicks: h,
    maxDigits: u,
    includeBounds: d
  } = s
  const f = r || 1
  const m = h - 1
  const { min: g, max: p } = t
  const y = !N(o)
  const b = !N(a)
  const _ = !N(c)
  const w = (p - g) / (u + 1)
  let x = In((p - g) / m / f) * f
  let S
  let k
  let O
  let v
  if (x < 1e-14 && !y && !b) return [{ value: g }, { value: p }];
  (v = Math.ceil(p / x) - Math.floor(g / x)),
  v > m && (x = In((v * x) / m / f) * f),
  N(l) || ((S = Math.pow(10, l)), (x = Math.ceil(x * S) / S)),
  n === 'ticks'
    ? ((k = Math.floor(g / x) * x), (O = Math.ceil(p / x) * x))
    : ((k = g), (O = p)),
  y && b && r && Ao((a - o) / r, x / 1e3)
    ? ((v = Math.round(Math.min((a - o) / x, h))),
      (x = (a - o) / v),
      (k = o),
      (O = a))
    : _
      ? ((k = y ? o : k),
        (O = b ? a : O),
        (v = c - 1),
        (x = (O - k) / v))
      : ((v = (O - k) / x),
        Re(v, Math.round(v), x / 1e3)
          ? (v = Math.round(v))
          : (v = Math.ceil(v)))
  const F = Math.max(An(x), An(k));
  (S = Math.pow(10, N(l) ? F : l)),
  (k = Math.round(k * S) / S),
  (O = Math.round(O * S) / S)
  let W = 0
  for (
    y &&
        (d && k !== o
          ? (e.push({ value: o }),
            k < o && W++,
            Re(Math.round((k + W * x) * S) / S, o, Ua(o, w, s)) && W++)
          : k < o && W++);
    W < v;
    ++W
  ) {
    e.push({ value: Math.round((k + W * x) * S) / S })
  }
  return (
    b && d && O !== a
      ? e.length && Re(e[e.length - 1].value, a, Ua(a, w, s))
        ? (e[e.length - 1].value = a)
        : e.push({ value: a })
      : (!b || O === a) && e.push({ value: O }),
    e
  )
}
function Ua (s, t, { horizontal: e, minRotation: i }) {
  const n = wt(i)
  const r = (e ? Math.sin(n) : Math.cos(n)) || 0.001
  const o = 0.75 * t * ('' + s).length
  return Math.min(t / r, o)
}
const Qe = class extends Yt {
  constructor (t) {
    super(t),
    (this.start = void 0),
    (this.end = void 0),
    (this._startValue = void 0),
    (this._endValue = void 0),
    (this._valueRange = 0)
  }

  parse (t, e) {
    return N(t) ||
            ((typeof t === 'number' || t instanceof Number) && !isFinite(+t))
      ? null
      : +t
  }

  handleTickRangeOptions () {
    const { beginAtZero: t } = this.options
    const { minDefined: e, maxDefined: i } = this.getUserBounds()
    let { min: n, max: r } = this
    const o = (l) => (n = e ? n : l)
    const a = (l) => (r = i ? r : l)
    if (t) {
      const l = Tt(n)
      const c = Tt(r)
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && o(0)
    }
    if (n === r) {
      let l = 1;
      (r >= Number.MAX_SAFE_INTEGER || n <= Number.MIN_SAFE_INTEGER) &&
                (l = Math.abs(r * 0.05)),
      a(r + l),
      t || o(n - l)
    }
    (this.min = n), (this.max = r)
  }

  getTickLimit () {
    const t = this.options.ticks
    let { maxTicksLimit: e, stepSize: i } = t
    let n
    return (
      i
        ? ((n = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1),
          n > 1e3 &&
                      (console.warn(
                          `scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${n} ticks. Limiting to 1000.`
                      ),
                      (n = 1e3)))
        : ((n = this.computeTickLimit()), (e = e || 11)),
      e && (n = Math.min(e, n)),
      n
    )
  }

  computeTickLimit () {
    return Number.POSITIVE_INFINITY
  }

  buildTicks () {
    const t = this.options
    const e = t.ticks
    let i = this.getTickLimit()
    i = Math.max(2, i)
    const n = {
      maxTicks: i,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }
    const r = this._range || this
    const o = kf(n, r)
    return (
      t.bounds === 'ticks' && Fn(o, this, 'value'),
      t.reverse
        ? (o.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      o
    )
  }

  configure () {
    const t = this.ticks
    let e = this.min
    let i = this.max
    if ((super.configure(), this.options.offset && t.length)) {
      const n = (i - e) / Math.max(t.length - 1, 1) / 2;
      (e -= n), (i += n)
    }
    (this._startValue = e),
    (this._endValue = i),
    (this._valueRange = i - e)
  }

  getLabelForValue (t) {
    return Ve(t, this.chart.options.locale, this.options.ticks.format)
  }
}
const Ns = class extends Qe {
  determineDataLimits () {
    const { min: t, max: e } = this.getMinMax(!0);
    (this.min = K(t) ? t : 0),
    (this.max = K(e) ? e : 1),
    this.handleTickRangeOptions()
  }

  computeTickLimit () {
    const t = this.isHorizontal()
    const e = t ? this.width : this.height
    const i = wt(this.options.ticks.minRotation)
    const n = (t ? Math.sin(i) : Math.cos(i)) || 0.001
    const r = this._resolveTickFontOptions(0)
    return Math.ceil(e / Math.min(40, r.lineHeight / n))
  }

  getPixelForValue (t) {
    return t === null
      ? NaN
      : this.getPixelForDecimal(
        (t - this._startValue) / this._valueRange
      )
  }

  getValueForPixel (t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange
  }
}
Ns.id = 'linear'
Ns.defaults = { ticks: { callback: Xi.formatters.numeric } }
function Ya (s) {
  return s / Math.pow(10, Math.floor(gt(s))) === 1
}
function Mf (s, t) {
  const e = Math.floor(gt(t.max))
  const i = Math.ceil(t.max / Math.pow(10, e))
  const n = []
  let r = mt(s.min, Math.pow(10, Math.floor(gt(t.min))))
  let o = Math.floor(gt(r))
  let a = Math.floor(r / Math.pow(10, o))
  let l = o < 0 ? Math.pow(10, Math.abs(o)) : 1
  do {
    n.push({ value: r, major: Ya(r) }),
    ++a,
    a === 10 && ((a = 1), ++o, (l = o >= 0 ? 1 : l)),
    (r = Math.round(a * Math.pow(10, o) * l) / l)
  } while (o < e || (o === e && a < i))
  const c = mt(s.max, r)
  return n.push({ value: c, major: Ya(r) }), n
}
const Ws = class extends Yt {
  constructor (t) {
    super(t),
    (this.start = void 0),
    (this.end = void 0),
    (this._startValue = void 0),
    (this._valueRange = 0)
  }

  parse (t, e) {
    const i = Qe.prototype.parse.apply(this, [t, e])
    if (i === 0) {
      this._zero = !0
      return
    }
    return K(i) && i > 0 ? i : null
  }

  determineDataLimits () {
    const { min: t, max: e } = this.getMinMax(!0);
    (this.min = K(t) ? Math.max(0, t) : null),
    (this.max = K(e) ? Math.max(0, e) : null),
    this.options.beginAtZero && (this._zero = !0),
    this.handleTickRangeOptions()
  }

  handleTickRangeOptions () {
    const { minDefined: t, maxDefined: e } = this.getUserBounds()
    let i = this.min
    let n = this.max
    const r = (l) => (i = t ? i : l)
    const o = (l) => (n = e ? n : l)
    const a = (l, c) => Math.pow(10, Math.floor(gt(l)) + c)
    i === n && (i <= 0 ? (r(1), o(10)) : (r(a(i, -1)), o(a(n, 1)))),
    i <= 0 && r(a(n, -1)),
    n <= 0 && o(a(i, 1)),
    this._zero &&
                this.min !== this._suggestedMin &&
                i === a(this.min, 0) &&
                r(a(i, -1)),
    (this.min = i),
    (this.max = n)
  }

  buildTicks () {
    const t = this.options
    const e = { min: this._userMin, max: this._userMax }
    const i = Mf(e, this)
    return (
      t.bounds === 'ticks' && Fn(i, this, 'value'),
      t.reverse
        ? (i.reverse(), (this.start = this.max), (this.end = this.min))
        : ((this.start = this.min), (this.end = this.max)),
      i
    )
  }

  getLabelForValue (t) {
    return t === void 0
      ? '0'
      : Ve(t, this.chart.options.locale, this.options.ticks.format)
  }

  configure () {
    const t = this.min
    super.configure(),
    (this._startValue = gt(t)),
    (this._valueRange = gt(this.max) - gt(t))
  }

  getPixelForValue (t) {
    return (
      (t === void 0 || t === 0) && (t = this.min),
      t === null || isNaN(t)
        ? NaN
        : this.getPixelForDecimal(
          t === this.min
            ? 0
            : (gt(t) - this._startValue) / this._valueRange
        )
    )
  }

  getValueForPixel (t) {
    const e = this.getDecimalForPixel(t)
    return Math.pow(10, this._startValue + e * this._valueRange)
  }
}
Ws.id = 'logarithmic'
Ws.defaults = {
  ticks: { callback: Xi.formatters.logarithmic, major: { enabled: !0 } }
}
function vr (s) {
  const t = s.ticks
  if (t.display && s.display) {
    const e = at(t.backdropPadding)
    return C(t.font && t.font.size, L.font.size) + e.height
  }
  return 0
}
function Tf (s, t, e) {
  return (
    (e = $(e) ? e : [e]),
    { w: Yo(s, t.string, e), h: e.length * t.lineHeight }
  )
}
function Za (s, t, e, i, n) {
  return s === i || s === n
    ? { start: t - e / 2, end: t + e / 2 }
    : s < i || s > n
      ? { start: t - e, end: t }
      : { start: t, end: t + e }
}
function vf (s) {
  const t = {
    l: s.left + s._padding.left,
    r: s.right - s._padding.right,
    t: s.top + s._padding.top,
    b: s.bottom - s._padding.bottom
  }
  const e = Object.assign({}, t)
  const i = []
  const n = []
  const r = s._pointLabels.length
  const o = s.options.pointLabels
  const a = o.centerPointLabels ? Y / r : 0
  for (let l = 0; l < r; l++) {
    const c = o.setContext(s.getPointLabelContext(l))
    n[l] = c.padding
    const h = s.getPointPosition(l, s.drawingArea + n[l], a)
    const u = st(c.font)
    const d = Tf(s.ctx, u, s._pointLabels[l])
    i[l] = d
    const f = ht(s.getIndexAngle(l) + a)
    const m = Math.round(Di(f))
    const g = Za(m, h.x, d.w, 0, 180)
    const p = Za(m, h.y, d.h, 90, 270)
    Of(e, t, f, g, p)
  }
  s.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b),
  (s._pointLabelItems = Df(s, i, n))
}
function Of (s, t, e, i, n) {
  const r = Math.abs(Math.sin(e))
  const o = Math.abs(Math.cos(e))
  let a = 0
  let l = 0
  i.start < t.l
    ? ((a = (t.l - i.start) / r), (s.l = Math.min(s.l, t.l - a)))
    : i.end > t.r &&
          ((a = (i.end - t.r) / r), (s.r = Math.max(s.r, t.r + a))),
  n.start < t.t
    ? ((l = (t.t - n.start) / o), (s.t = Math.min(s.t, t.t - l)))
    : n.end > t.b &&
              ((l = (n.end - t.b) / o), (s.b = Math.max(s.b, t.b + l)))
}
function Df (s, t, e) {
  const i = []
  const n = s._pointLabels.length
  const r = s.options
  const o = vr(r) / 2
  const a = s.drawingArea
  const l = r.pointLabels.centerPointLabels ? Y / n : 0
  for (let c = 0; c < n; c++) {
    const h = s.getPointPosition(c, a + o + e[c], l)
    const u = Math.round(Di(ht(h.angle + Z)))
    const d = t[c]
    const f = If(h.y, d.h, u)
    const m = Ef(u)
    const g = Cf(h.x, d.w, m)
    i.push({
      x: h.x,
      y: f,
      textAlign: m,
      left: g,
      top: f,
      right: g + d.w,
      bottom: f + d.h
    })
  }
  return i
}
function Ef (s) {
  return s === 0 || s === 180 ? 'center' : s < 180 ? 'left' : 'right'
}
function Cf (s, t, e) {
  return e === 'right' ? (s -= t) : e === 'center' && (s -= t / 2), s
}
function If (s, t, e) {
  return (
    e === 90 || e === 270 ? (s -= t / 2) : (e > 270 || e < 90) && (s -= t),
    s
  )
}
function Ff (s, t) {
  const {
    ctx: e,
    options: { pointLabels: i }
  } = s
  for (let n = t - 1; n >= 0; n--) {
    const r = i.setContext(s.getPointLabelContext(n))
    const o = st(r.font)
    const {
      x: a,
      y: l,
      textAlign: c,
      left: h,
      top: u,
      right: d,
      bottom: f
    } = s._pointLabelItems[n]
    const { backdropColor: m } = r
    if (!N(m)) {
      const g = se(r.borderRadius)
      const p = at(r.backdropPadding)
      e.fillStyle = m
      const y = h - p.left
      const b = u - p.top
      const _ = d - h + p.width
      const w = f - u + p.height
      Object.values(g).some((x) => x !== 0)
        ? (e.beginPath(),
          We(e, { x: y, y: b, w: _, h: w, radius: g }),
          e.fill())
        : e.fillRect(y, b, _, w)
    }
    ee(e, s._pointLabels[n], a, l + o.lineHeight / 2, o, {
      color: r.color,
      textAlign: c,
      textBaseline: 'middle'
    })
  }
}
function pl (s, t, e, i) {
  const { ctx: n } = s
  if (e) n.arc(s.xCenter, s.yCenter, t, 0, B)
  else {
    let r = s.getPointPosition(0, t)
    n.moveTo(r.x, r.y)
    for (let o = 1; o < i; o++) {
      (r = s.getPointPosition(o, t)), n.lineTo(r.x, r.y)
    }
  }
}
function Af (s, t, e, i) {
  const n = s.ctx
  const r = t.circular
  const { color: o, lineWidth: a } = t;
  (!r && !i) ||
        !o ||
        !a ||
        e < 0 ||
        (n.save(),
        (n.strokeStyle = o),
        (n.lineWidth = a),
        n.setLineDash(t.borderDash),
        (n.lineDashOffset = t.borderDashOffset),
        n.beginPath(),
        pl(s, e, r, i),
        n.closePath(),
        n.stroke(),
        n.restore())
}
function Lf (s, t, e) {
  return $t(s, { label: e, index: t, type: 'pointLabel' })
}
const _e = class extends Qe {
  constructor (t) {
    super(t),
    (this.xCenter = void 0),
    (this.yCenter = void 0),
    (this.drawingArea = void 0),
    (this._pointLabels = []),
    (this._pointLabelItems = [])
  }

  setDimensions () {
    const t = (this._padding = at(vr(this.options) / 2))
    const e = (this.width = this.maxWidth - t.width)
    const i = (this.height = this.maxHeight - t.height);
    (this.xCenter = Math.floor(this.left + e / 2 + t.left)),
    (this.yCenter = Math.floor(this.top + i / 2 + t.top)),
    (this.drawingArea = Math.floor(Math.min(e, i) / 2))
  }

  determineDataLimits () {
    const { min: t, max: e } = this.getMinMax(!1);
    (this.min = K(t) && !isNaN(t) ? t : 0),
    (this.max = K(e) && !isNaN(e) ? e : 0),
    this.handleTickRangeOptions()
  }

  computeTickLimit () {
    return Math.ceil(this.drawingArea / vr(this.options))
  }

  generateTickLabels (t) {
    Qe.prototype.generateTickLabels.call(this, t),
    (this._pointLabels = this.getLabels()
      .map((e, i) => {
        const n = j(
          this.options.pointLabels.callback,
          [e, i],
          this
        )
        return n || n === 0 ? n : ''
      })
      .filter((e, i) => this.chart.getDataVisibility(i)))
  }

  fit () {
    const t = this.options
    t.display && t.pointLabels.display
      ? vf(this)
      : this.setCenterPoint(0, 0, 0, 0)
  }

  setCenterPoint (t, e, i, n) {
    (this.xCenter += Math.floor((t - e) / 2)),
    (this.yCenter += Math.floor((i - n) / 2)),
    (this.drawingArea -= Math.min(
      this.drawingArea / 2,
      Math.max(t, e, i, n)
    ))
  }

  getIndexAngle (t) {
    const e = B / (this._pointLabels.length || 1)
    const i = this.options.startAngle || 0
    return ht(t * e + wt(i))
  }

  getDistanceFromCenterForValue (t) {
    if (N(t)) return NaN
    const e = this.drawingArea / (this.max - this.min)
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e
  }

  getValueForDistanceFromCenter (t) {
    if (N(t)) return NaN
    const e = t / (this.drawingArea / (this.max - this.min))
    return this.options.reverse ? this.max - e : this.min + e
  }

  getPointLabelContext (t) {
    const e = this._pointLabels || []
    if (t >= 0 && t < e.length) {
      const i = e[t]
      return Lf(this.getContext(), t, i)
    }
  }

  getPointPosition (t, e, i = 0) {
    const n = this.getIndexAngle(t) - Z + i
    return {
      x: Math.cos(n) * e + this.xCenter,
      y: Math.sin(n) * e + this.yCenter,
      angle: n
    }
  }

  getPointPositionForValue (t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
  }

  getBasePosition (t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue())
  }

  getPointLabelPosition (t) {
    const {
      left: e,
      top: i,
      right: n,
      bottom: r
    } = this._pointLabelItems[t]
    return { left: e, top: i, right: n, bottom: r }
  }

  drawBackground () {
    const {
      backgroundColor: t,
      grid: { circular: e }
    } = this.options
    if (t) {
      const i = this.ctx
      i.save(),
      i.beginPath(),
      pl(
        this,
        this.getDistanceFromCenterForValue(this._endValue),
        e,
        this._pointLabels.length
      ),
      i.closePath(),
      (i.fillStyle = t),
      i.fill(),
      i.restore()
    }
  }

  drawGrid () {
    const t = this.ctx
    const e = this.options
    const { angleLines: i, grid: n } = e
    const r = this._pointLabels.length
    let o
    let a
    let l
    if (
      (e.pointLabels.display && Ff(this, r),
      n.display &&
                this.ticks.forEach((c, h) => {
                  if (h !== 0) {
                    a = this.getDistanceFromCenterForValue(c.value)
                    const u = n.setContext(this.getContext(h - 1))
                    Af(this, u, a, r)
                  }
                }),
      i.display)
    ) {
      for (t.save(), o = r - 1; o >= 0; o--) {
        const c = i.setContext(this.getPointLabelContext(o))
        const { color: h, lineWidth: u } = c
        !u ||
                    !h ||
                    ((t.lineWidth = u),
                    (t.strokeStyle = h),
                    t.setLineDash(c.borderDash),
                    (t.lineDashOffset = c.borderDashOffset),
                    (a = this.getDistanceFromCenterForValue(
                      e.ticks.reverse ? this.min : this.max
                    )),
                    (l = this.getPointPosition(o, a)),
                    t.beginPath(),
                    t.moveTo(this.xCenter, this.yCenter),
                    t.lineTo(l.x, l.y),
                    t.stroke())
      }
      t.restore()
    }
  }

  drawBorder () {}
  drawLabels () {
    const t = this.ctx
    const e = this.options
    const i = e.ticks
    if (!i.display) return
    const n = this.getIndexAngle(0)
    let r
    let o
    t.save(),
    t.translate(this.xCenter, this.yCenter),
    t.rotate(n),
    (t.textAlign = 'center'),
    (t.textBaseline = 'middle'),
    this.ticks.forEach((a, l) => {
      if (l === 0 && !e.reverse) return
      const c = i.setContext(this.getContext(l))
      const h = st(c.font)
      if (
        ((r = this.getDistanceFromCenterForValue(
          this.ticks[l].value
        )),
        c.showLabelBackdrop)
      ) {
        (t.font = h.string),
        (o = t.measureText(a.label).width),
        (t.fillStyle = c.backdropColor)
        const u = at(c.backdropPadding)
        t.fillRect(
          -o / 2 - u.left,
          -r - h.size / 2 - u.top,
          o + u.width,
          h.size + u.height
        )
      }
      ee(t, a.label, 0, -r, h, { color: c.color })
    }),
    t.restore()
  }

  drawTitle () {}
}
_e.id = 'radialLinear'
_e.defaults = {
  display: !0,
  animate: !0,
  position: 'chartArea',
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: { circular: !1 },
  startAngle: 0,
  ticks: { showLabelBackdrop: !0, callback: Xi.formatters.numeric },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: { size: 10 },
    callback (s) {
      return s
    },
    padding: 5,
    centerPointLabels: !1
  }
}
_e.defaultRoutes = {
  'angleLines.color': 'borderColor',
  'pointLabels.color': 'color',
  'ticks.color': 'color'
}
_e.descriptors = { angleLines: { _fallback: 'grid' } }
const Ki = {
  millisecond: { common: !0, size: 1, steps: 1e3 },
  second: { common: !0, size: 1e3, steps: 60 },
  minute: { common: !0, size: 6e4, steps: 60 },
  hour: { common: !0, size: 36e5, steps: 24 },
  day: { common: !0, size: 864e5, steps: 30 },
  week: { common: !1, size: 6048e5, steps: 4 },
  month: { common: !0, size: 2628e6, steps: 12 },
  quarter: { common: !1, size: 7884e6, steps: 4 },
  year: { common: !0, size: 3154e7 }
}
const ut = Object.keys(Ki)
function Pf (s, t) {
  return s - t
}
function qa (s, t) {
  if (N(t)) return null
  const e = s._adapter
  const { parser: i, round: n, isoWeekday: r } = s._parseOpts
  let o = t
  return (
    typeof i === 'function' && (o = i(o)),
    K(o) || (o = typeof i === 'string' ? e.parse(o, i) : e.parse(o)),
    o === null
      ? null
      : (n &&
                  (o =
                      n === 'week' && (pe(r) || r === !0)
                        ? e.startOf(o, 'isoWeek', r)
                        : e.startOf(o, n)),
        +o)
  )
}
function Ga (s, t, e, i) {
  const n = ut.length
  for (let r = ut.indexOf(s); r < n - 1; ++r) {
    const o = Ki[ut[r]]
    const a = o.steps ? o.steps : Number.MAX_SAFE_INTEGER
    if (o.common && Math.ceil((e - t) / (a * o.size)) <= i) return ut[r]
  }
  return ut[n - 1]
}
function Rf (s, t, e, i, n) {
  for (let r = ut.length - 1; r >= ut.indexOf(e); r--) {
    const o = ut[r]
    if (Ki[o].common && s._adapter.diff(n, i, o) >= t - 1) return o
  }
  return ut[e ? ut.indexOf(e) : 0]
}
function Nf (s) {
  for (let t = ut.indexOf(s) + 1, e = ut.length; t < e; ++t) {
    if (Ki[ut[t]].common) return ut[t]
  }
}
function Xa (s, t, e) {
  if (!e) s[t] = !0
  else if (e.length) {
    const { lo: i, hi: n } = Ei(e, t)
    const r = e[i] >= t ? e[i] : e[n]
    s[r] = !0
  }
}
function Wf (s, t, e, i) {
  const n = s._adapter
  const r = +n.startOf(t[0].value, i)
  const o = t[t.length - 1].value
  let a
  let l
  for (a = r; a <= o; a = +n.add(a, 1, i)) {
    (l = e[a]), l >= 0 && (t[l].major = !0)
  }
  return t
}
function Ka (s, t, e) {
  const i = []
  const n = {}
  const r = t.length
  let o
  let a
  for (o = 0; o < r; ++o) {
    (a = t[o]), (n[a] = o), i.push({ value: a, major: !1 })
  }
  return r === 0 || !e ? i : Wf(s, i, n, e)
}
const we = class extends Yt {
  constructor (t) {
    super(t),
    (this._cache = { data: [], labels: [], all: [] }),
    (this._unit = 'day'),
    (this._majorUnit = void 0),
    (this._offsets = {}),
    (this._normalized = !1),
    (this._parseOpts = void 0)
  }

  init (t, e) {
    const i = t.time || (t.time = {})
    const n = (this._adapter = new Or._date(t.adapters.date))
    n.init(e),
    Pe(i.displayFormats, n.formats()),
    (this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }),
    super.init(t),
    (this._normalized = e.normalized)
  }

  parse (t, e) {
    return t === void 0 ? null : qa(this, t)
  }

  beforeLayout () {
    super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] })
  }

  determineDataLimits () {
    const t = this.options
    const e = this._adapter
    const i = t.time.unit || 'day'
    let {
      min: n,
      max: r,
      minDefined: o,
      maxDefined: a
    } = this.getUserBounds()
    function l (c) {
      !o && !isNaN(c.min) && (n = Math.min(n, c.min)),
      !a && !isNaN(c.max) && (r = Math.max(r, c.max))
    }
    (!o || !a) &&
            (l(this._getLabelBounds()),
            (t.bounds !== 'ticks' || t.ticks.source !== 'labels') &&
                l(this.getMinMax(!1))),
    (n = K(n) && !isNaN(n) ? n : +e.startOf(Date.now(), i)),
    (r = K(r) && !isNaN(r) ? r : +e.endOf(Date.now(), i) + 1),
    (this.min = Math.min(n, r - 1)),
    (this.max = Math.max(n + 1, r))
  }

  _getLabelBounds () {
    const t = this.getLabelTimestamps()
    let e = Number.POSITIVE_INFINITY
    let i = Number.NEGATIVE_INFINITY
    return (
      t.length && ((e = t[0]), (i = t[t.length - 1])), { min: e, max: i }
    )
  }

  buildTicks () {
    const t = this.options
    const e = t.time
    const i = t.ticks
    const n =
            i.source === 'labels'
              ? this.getLabelTimestamps()
              : this._generate()
    t.bounds === 'ticks' &&
            n.length &&
            ((this.min = this._userMin || n[0]),
            (this.max = this._userMax || n[n.length - 1]))
    const r = this.min
    const o = this.max
    const a = Ro(n, r, o)
    return (
      (this._unit =
                e.unit ||
                (i.autoSkip
                  ? Ga(
                    e.minUnit,
                    this.min,
                    this.max,
                    this._getLabelCapacity(r)
                  )
                  : Rf(this, a.length, e.minUnit, this.min, this.max))),
      (this._majorUnit =
                !i.major.enabled || this._unit === 'year'
                  ? void 0
                  : Nf(this._unit)),
      this.initOffsets(n),
      t.reverse && a.reverse(),
      Ka(this, a, this._majorUnit)
    )
  }

  afterAutoSkip () {
    this.options.offsetAfterAutoskip &&
            this.initOffsets(this.ticks.map((t) => +t.value))
  }

  initOffsets (t) {
    let e = 0
    let i = 0
    let n
    let r
    this.options.offset &&
            t.length &&
            ((n = this.getDecimalForValue(t[0])),
            t.length === 1
              ? (e = 1 - n)
              : (e = (this.getDecimalForValue(t[1]) - n) / 2),
            (r = this.getDecimalForValue(t[t.length - 1])),
            t.length === 1
              ? (i = r)
              : (i = (r - this.getDecimalForValue(t[t.length - 2])) / 2))
    const o = t.length < 3 ? 0.5 : 0.25;
    (e = it(e, 0, o)),
    (i = it(i, 0, o)),
    (this._offsets = { start: e, end: i, factor: 1 / (e + 1 + i) })
  }

  _generate () {
    const t = this._adapter
    const e = this.min
    const i = this.max
    const n = this.options
    const r = n.time
    const o = r.unit || Ga(r.minUnit, e, i, this._getLabelCapacity(e))
    const a = C(r.stepSize, 1)
    const l = o === 'week' ? r.isoWeekday : !1
    const c = pe(l) || l === !0
    const h = {}
    let u = e
    let d
    let f
    if (
      (c && (u = +t.startOf(u, 'isoWeek', l)),
      (u = +t.startOf(u, c ? 'day' : o)),
      t.diff(i, e, o) > 1e5 * a)
    ) {
      throw new Error(
        e +
                    ' and ' +
                    i +
                    ' are too far apart with stepSize of ' +
                    a +
                    ' ' +
                    o
      )
    }
    const m = n.ticks.source === 'data' && this.getDataTimestamps()
    for (d = u, f = 0; d < i; d = +t.add(d, a, o), f++) Xa(h, d, m)
    return (
      (d === i || n.bounds === 'ticks' || f === 1) && Xa(h, d, m),
      Object.keys(h)
        .sort((g, p) => g - p)
        .map((g) => +g)
    )
  }

  getLabelForValue (t) {
    const e = this._adapter
    const i = this.options.time
    return i.tooltipFormat
      ? e.format(t, i.tooltipFormat)
      : e.format(t, i.displayFormats.datetime)
  }

  _tickFormatFunction (t, e, i, n) {
    const r = this.options
    const o = r.time.displayFormats
    const a = this._unit
    const l = this._majorUnit
    const c = a && o[a]
    const h = l && o[l]
    const u = i[e]
    const d = l && h && u && u.major
    const f = this._adapter.format(t, n || (d ? h : c))
    const m = r.ticks.callback
    return m ? j(m, [f, e, i], this) : f
  }

  generateTickLabels (t) {
    let e, i, n
    for (e = 0, i = t.length; e < i; ++e) {
      (n = t[e]), (n.label = this._tickFormatFunction(n.value, e, t))
    }
  }

  getDecimalForValue (t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min)
  }

  getPixelForValue (t) {
    const e = this._offsets
    const i = this.getDecimalForValue(t)
    return this.getPixelForDecimal((e.start + i) * e.factor)
  }

  getValueForPixel (t) {
    const e = this._offsets
    const i = this.getDecimalForPixel(t) / e.factor - e.end
    return this.min + i * (this.max - this.min)
  }

  _getLabelSize (t) {
    const e = this.options.ticks
    const i = this.ctx.measureText(t).width
    const n = wt(this.isHorizontal() ? e.maxRotation : e.minRotation)
    const r = Math.cos(n)
    const o = Math.sin(n)
    const a = this._resolveTickFontOptions(0).size
    return { w: i * r + a * o, h: i * o + a * r }
  }

  _getLabelCapacity (t) {
    const e = this.options.time
    const i = e.displayFormats
    const n = i[e.unit] || i.millisecond
    const r = this._tickFormatFunction(
      t,
      0,
      Ka(this, [t], this._majorUnit),
      n
    )
    const o = this._getLabelSize(r)
    const a =
            Math.floor(
              this.isHorizontal() ? this.width / o.w : this.height / o.h
            ) - 1
    return a > 0 ? a : 1
  }

  getDataTimestamps () {
    let t = this._cache.data || []
    let e
    let i
    if (t.length) return t
    const n = this.getMatchingVisibleMetas()
    if (this._normalized && n.length) {
      return (this._cache.data =
                n[0].controller.getAllParsedValues(this))
    }
    for (e = 0, i = n.length; e < i; ++e) {
      t = t.concat(n[e].controller.getAllParsedValues(this))
    }
    return (this._cache.data = this.normalize(t))
  }

  getLabelTimestamps () {
    const t = this._cache.labels || []
    let e
    let i
    if (t.length) return t
    const n = this.getLabels()
    for (e = 0, i = n.length; e < i; ++e) t.push(qa(this, n[e]))
    return (this._cache.labels = this._normalized ? t : this.normalize(t))
  }

  normalize (t) {
    return Rn(t.sort(Pf))
  }
}
we.id = 'time'
we.defaults = {
  bounds: 'data',
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: 'millisecond',
    displayFormats: {}
  },
  ticks: { source: 'auto', major: { enabled: !1 } }
}
function Bi (s, t, e) {
  let i = 0
  let n = s.length - 1
  let r
  let o
  let a
  let l
  e
    ? (t >= s[i].pos &&
              t <= s[n].pos &&
              ({ lo: i, hi: n } = Ft(s, 'pos', t)),
      ({ pos: r, time: a } = s[i]),
      ({ pos: o, time: l } = s[n]))
    : (t >= s[i].time &&
              t <= s[n].time &&
              ({ lo: i, hi: n } = Ft(s, 'time', t)),
      ({ time: r, pos: a } = s[i]),
      ({ time: o, pos: l } = s[n]))
  const c = o - r
  return c ? a + ((l - a) * (t - r)) / c : a
}
const zs = class extends we {
  constructor (t) {
    super(t),
    (this._table = []),
    (this._minPos = void 0),
    (this._tableRange = void 0)
  }

  initOffsets () {
    const t = this._getTimestampsForTable()
    const e = (this._table = this.buildLookupTable(t));
    (this._minPos = Bi(e, this.min)),
    (this._tableRange = Bi(e, this.max) - this._minPos),
    super.initOffsets(t)
  }

  buildLookupTable (t) {
    const { min: e, max: i } = this
    const n = []
    const r = []
    let o
    let a
    let l
    let c
    let h
    for (o = 0, a = t.length; o < a; ++o) {
      (c = t[o]), c >= e && c <= i && n.push(c)
    }
    if (n.length < 2) {
      return [
        { time: e, pos: 0 },
        { time: i, pos: 1 }
      ]
    }
    for (o = 0, a = n.length; o < a; ++o) {
      (h = n[o + 1]),
      (l = n[o - 1]),
      (c = n[o]),
      Math.round((h + l) / 2) !== c &&
                    r.push({ time: c, pos: o / (a - 1) })
    }
    return r
  }

  _getTimestampsForTable () {
    let t = this._cache.all || []
    if (t.length) return t
    const e = this.getDataTimestamps()
    const i = this.getLabelTimestamps()
    return (
      e.length && i.length
        ? (t = this.normalize(e.concat(i)))
        : (t = e.length ? e : i),
      (t = this._cache.all = t),
      t
    )
  }

  getDecimalForValue (t) {
    return (Bi(this._table, t) - this._minPos) / this._tableRange
  }

  getValueForPixel (t) {
    const e = this._offsets
    const i = this.getDecimalForPixel(t) / e.factor - e.end
    return Bi(this._table, i * this._tableRange + this._minPos, !0)
  }
}
zs.id = 'timeseries'
zs.defaults = we.defaults
const zf = Object.freeze({
  __proto__: null,
  CategoryScale: Je,
  LinearScale: Ns,
  LogarithmicScale: Ws,
  RadialLinearScale: _e,
  TimeScale: we,
  TimeSeriesScale: zs
})
const yl = [Ou, Ad, xf, zf]
xe.register(...yl)
const Wt = xe
const Zt = class extends Error {}
const Ji = class extends Zt {
  constructor (t) {
    super(`Invalid DateTime: ${t.toMessage()}`)
  }
}
const Qi = class extends Zt {
  constructor (t) {
    super(`Invalid Interval: ${t.toMessage()}`)
  }
}
const tn = class extends Zt {
  constructor (t) {
    super(`Invalid Duration: ${t.toMessage()}`)
  }
}
const vt = class extends Zt {}
const ts = class extends Zt {
  constructor (t) {
    super(`Invalid unit ${t}`)
  }
}
const J = class extends Zt {}
const Ot = class extends Zt {
  constructor () {
    super('Zone is an abstract class')
  }
}
const M = 'numeric'
const Dt = 'short'
const bt = 'long'
const ae = { year: M, month: M, day: M }
const Hs = { year: M, month: Dt, day: M }
const Er = { year: M, month: Dt, day: M, weekday: Dt }
const Bs = { year: M, month: bt, day: M }
const $s = { year: M, month: bt, day: M, weekday: bt }
const js = { hour: M, minute: M }
const Us = { hour: M, minute: M, second: M }
const Ys = { hour: M, minute: M, second: M, timeZoneName: Dt }
const Zs = { hour: M, minute: M, second: M, timeZoneName: bt }
const qs = { hour: M, minute: M, hourCycle: 'h23' }
const Gs = { hour: M, minute: M, second: M, hourCycle: 'h23' }
const Xs = {
  hour: M,
  minute: M,
  second: M,
  hourCycle: 'h23',
  timeZoneName: Dt
}
const Ks = {
  hour: M,
  minute: M,
  second: M,
  hourCycle: 'h23',
  timeZoneName: bt
}
const Js = { year: M, month: M, day: M, hour: M, minute: M }
const Qs = { year: M, month: M, day: M, hour: M, minute: M, second: M }
const ti = { year: M, month: Dt, day: M, hour: M, minute: M }
const ei = { year: M, month: Dt, day: M, hour: M, minute: M, second: M }
const Cr = { year: M, month: Dt, day: M, weekday: Dt, hour: M, minute: M }
const si = { year: M, month: bt, day: M, hour: M, minute: M, timeZoneName: Dt }
const ii = {
  year: M,
  month: bt,
  day: M,
  hour: M,
  minute: M,
  second: M,
  timeZoneName: Dt
}
const ni = {
  year: M,
  month: bt,
  day: M,
  weekday: bt,
  hour: M,
  minute: M,
  timeZoneName: bt
}
const ri = {
  year: M,
  month: bt,
  day: M,
  weekday: bt,
  hour: M,
  minute: M,
  second: M,
  timeZoneName: bt
}
const dt = class {
  get type () {
    throw new Ot()
  }

  get name () {
    throw new Ot()
  }

  get ianaName () {
    return this.name
  }

  get isUniversal () {
    throw new Ot()
  }

  offsetName (t, e) {
    throw new Ot()
  }

  formatOffset (t, e) {
    throw new Ot()
  }

  offset (t) {
    throw new Ot()
  }

  equals (t) {
    throw new Ot()
  }

  get isValid () {
    throw new Ot()
  }
}
let Ir = null
var zt = class extends dt {
  static get instance () {
    return Ir === null && (Ir = new zt()), Ir
  }

  get type () {
    return 'system'
  }

  get name () {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  get isUniversal () {
    return !1
  }

  offsetName (t, { format: e, locale: i }) {
    return sn(t, e, i)
  }

  formatOffset (t, e) {
    return le(this.offset(t), e)
  }

  offset (t) {
    return -new Date(t).getTimezoneOffset()
  }

  equals (t) {
    return t.type === 'system'
  }

  get isValid () {
    return !0
  }
}
let rn = {}
function Vf (s) {
  return (
    rn[s] ||
            (rn[s] = new Intl.DateTimeFormat('en-US', {
              hour12: !1,
              timeZone: s,
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              era: 'short'
            })),
    rn[s]
  )
}
const Hf = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 }
function Bf (s, t) {
  const e = s.format(t).replace(/\u200E/g, '')
  const i = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(e)
  const [, n, r, o, a, l, c, h] = i
  return [o, n, r, a, l, c, h]
}
function $f (s, t) {
  const e = s.formatToParts(t)
  const i = []
  for (let n = 0; n < e.length; n++) {
    const { type: r, value: o } = e[n]
    const a = Hf[r]
    r === 'era' ? (i[a] = o) : D(a) || (i[a] = parseInt(o, 10))
  }
  return i
}
let nn = {}
var nt = class extends dt {
  static create (t) {
    return nn[t] || (nn[t] = new nt(t)), nn[t]
  }

  static resetCache () {
    (nn = {}), (rn = {})
  }

  static isValidSpecifier (t) {
    return this.isValidZone(t)
  }

  static isValidZone (t) {
    if (!t) return !1
    try {
      return (
        new Intl.DateTimeFormat('en-US', { timeZone: t }).format(), !0
      )
    } catch {
      return !1
    }
  }

  constructor (t) {
    super(), (this.zoneName = t), (this.valid = nt.isValidZone(t))
  }

  get type () {
    return 'iana'
  }

  get name () {
    return this.zoneName
  }

  get isUniversal () {
    return !1
  }

  offsetName (t, { format: e, locale: i }) {
    return sn(t, e, i, this.name)
  }

  formatOffset (t, e) {
    return le(this.offset(t), e)
  }

  offset (t) {
    const e = new Date(t)
    if (isNaN(e)) return NaN
    const i = Vf(this.name)
    let [n, r, o, a, l, c, h] = i.formatToParts ? $f(i, e) : Bf(i, e)
    a === 'BC' && (n = -Math.abs(n) + 1)
    const d = es({
      year: n,
      month: r,
      day: o,
      hour: l === 24 ? 0 : l,
      minute: c,
      second: h,
      millisecond: 0
    })
    let f = +e
    const m = f % 1e3
    return (f -= m >= 0 ? m : 1e3 + m), (d - f) / (60 * 1e3)
  }

  equals (t) {
    return t.type === 'iana' && t.name === this.name
  }

  get isValid () {
    return this.valid
  }
}
const bl = {}
function jf (s, t = {}) {
  const e = JSON.stringify([s, t])
  let i = bl[e]
  return i || ((i = new Intl.ListFormat(s, t)), (bl[e] = i)), i
}
let Fr = {}
function Ar (s, t = {}) {
  const e = JSON.stringify([s, t])
  let i = Fr[e]
  return i || ((i = new Intl.DateTimeFormat(s, t)), (Fr[e] = i)), i
}
let Lr = {}
function Uf (s, t = {}) {
  const e = JSON.stringify([s, t])
  let i = Lr[e]
  return i || ((i = new Intl.NumberFormat(s, t)), (Lr[e] = i)), i
}
let Pr = {}
function Yf (s, t = {}) {
  const { base: e, ...i } = t
  const n = JSON.stringify([s, i])
  let r = Pr[n]
  return r || ((r = new Intl.RelativeTimeFormat(s, t)), (Pr[n] = r)), r
}
let oi = null
function Zf () {
  return (
    oi || ((oi = new Intl.DateTimeFormat().resolvedOptions().locale), oi)
  )
}
const xl = {}
function qf (s) {
  let t = xl[s]
  if (!t) {
    const e = new Intl.Locale(s);
    (t = 'getWeekInfo' in e ? e.getWeekInfo() : e.weekInfo), (xl[s] = t)
  }
  return t
}
function Gf (s) {
  const t = s.indexOf('-x-')
  t !== -1 && (s = s.substring(0, t))
  const e = s.indexOf('-u-')
  if (e === -1) return [s]
  {
    let i, n
    try {
      (i = Ar(s).resolvedOptions()), (n = s)
    } catch {
      const l = s.substring(0, e);
      (i = Ar(l).resolvedOptions()), (n = l)
    }
    const { numberingSystem: r, calendar: o } = i
    return [n, r, o]
  }
}
function Xf (s, t, e) {
  return (
    (e || t) &&
            (s.includes('-u-') || (s += '-u'),
            e && (s += `-ca-${e}`),
            t && (s += `-nu-${t}`)),
    s
  )
}
function Kf (s) {
  const t = []
  for (let e = 1; e <= 12; e++) {
    const i = T.utc(2009, e, 1)
    t.push(s(i))
  }
  return t
}
function Jf (s) {
  const t = []
  for (let e = 1; e <= 7; e++) {
    const i = T.utc(2016, 11, 13 + e)
    t.push(s(i))
  }
  return t
}
function on (s, t, e, i) {
  const n = s.listingMode()
  return n === 'error' ? null : n === 'en' ? e(t) : i(t)
}
function Qf (s) {
  return s.numberingSystem && s.numberingSystem !== 'latn'
    ? !1
    : s.numberingSystem === 'latn' ||
              !s.locale ||
              s.locale.startsWith('en') ||
              new Intl.DateTimeFormat(s.intl).resolvedOptions()
                .numberingSystem === 'latn'
}
const Rr = class {
  constructor (t, e, i) {
    (this.padTo = i.padTo || 0), (this.floor = i.floor || !1)
    const { padTo: n, floor: r, ...o } = i
    if (!e || Object.keys(o).length > 0) {
      const a = { useGrouping: !1, ...i }
      i.padTo > 0 && (a.minimumIntegerDigits = i.padTo),
      (this.inf = Uf(t, a))
    }
  }

  format (t) {
    if (this.inf) {
      const e = this.floor ? Math.floor(t) : t
      return this.inf.format(e)
    } else {
      const e = this.floor ? Math.floor(t) : ss(t, 3)
      return q(e, this.padTo)
    }
  }
}
const Nr = class {
  constructor (t, e, i) {
    (this.opts = i), (this.originalZone = void 0)
    let n
    if (this.opts.timeZone) this.dt = t
    else if (t.zone.type === 'fixed') {
      const o = -1 * (t.offset / 60)
      const a = o >= 0 ? `Etc/GMT+${o}` : `Etc/GMT${o}`
      t.offset !== 0 && nt.create(a).valid
        ? ((n = a), (this.dt = t))
        : ((n = 'UTC'),
          (this.dt =
                      t.offset === 0
                        ? t
                        : t.setZone('UTC').plus({ minutes: t.offset })),
          (this.originalZone = t.zone))
    } else {
      t.zone.type === 'system'
        ? (this.dt = t)
        : t.zone.type === 'iana'
          ? ((this.dt = t), (n = t.zone.name))
          : ((n = 'UTC'),
            (this.dt = t.setZone('UTC').plus({ minutes: t.offset })),
            (this.originalZone = t.zone))
    }
    const r = { ...this.opts };
    (r.timeZone = r.timeZone || n), (this.dtf = Ar(e, r))
  }

  format () {
    return this.originalZone
      ? this.formatToParts()
        .map(({ value: t }) => t)
        .join('')
      : this.dtf.format(this.dt.toJSDate())
  }

  formatToParts () {
    const t = this.dtf.formatToParts(this.dt.toJSDate())
    return this.originalZone
      ? t.map((e) => {
        if (e.type === 'timeZoneName') {
          const i = this.originalZone.offsetName(this.dt.ts, {
            locale: this.dt.locale,
            format: this.opts.timeZoneName
          })
          return { ...e, value: i }
        } else return e
      })
      : t
  }

  resolvedOptions () {
    return this.dtf.resolvedOptions()
  }
}
const Wr = class {
  constructor (t, e, i) {
    (this.opts = { style: 'long', ...i }),
    !e && an() && (this.rtf = Yf(t, i))
  }

  format (t, e) {
    return this.rtf
      ? this.rtf.format(t, e)
      : _l(e, t, this.opts.numeric, this.opts.style !== 'long')
  }

  formatToParts (t, e) {
    return this.rtf ? this.rtf.formatToParts(t, e) : []
  }
}
const tm = { firstDay: 1, minimalDays: 4, weekend: [6, 7] }
var P = class {
  static fromOpts (t) {
    return P.create(
      t.locale,
      t.numberingSystem,
      t.outputCalendar,
      t.weekSettings,
      t.defaultToEN
    )
  }

  static create (t, e, i, n, r = !1) {
    const o = t || z.defaultLocale
    const a = o || (r ? 'en-US' : Zf())
    const l = e || z.defaultNumberingSystem
    const c = i || z.defaultOutputCalendar
    const h = ai(n) || z.defaultWeekSettings
    return new P(a, l, c, h, o)
  }

  static resetCache () {
    (oi = null), (Fr = {}), (Lr = {}), (Pr = {})
  }

  static fromObject ({
    locale: t,
    numberingSystem: e,
    outputCalendar: i,
    weekSettings: n
  } = {}) {
    return P.create(t, e, i, n)
  }

  constructor (t, e, i, n, r) {
    const [o, a, l] = Gf(t);
    (this.locale = o),
    (this.numberingSystem = e || a || null),
    (this.outputCalendar = i || l || null),
    (this.weekSettings = n),
    (this.intl = Xf(
      this.locale,
      this.numberingSystem,
      this.outputCalendar
    )),
    (this.weekdaysCache = { format: {}, standalone: {} }),
    (this.monthsCache = { format: {}, standalone: {} }),
    (this.meridiemCache = null),
    (this.eraCache = {}),
    (this.specifiedLocale = r),
    (this.fastNumbersCached = null)
  }

  get fastNumbers () {
    return (
      this.fastNumbersCached == null &&
                (this.fastNumbersCached = Qf(this)),
      this.fastNumbersCached
    )
  }

  listingMode () {
    const t = this.isEnglish()
    const e =
            (this.numberingSystem === null ||
                this.numberingSystem === 'latn') &&
            (this.outputCalendar === null || this.outputCalendar === 'gregory')
    return t && e ? 'en' : 'intl'
  }

  clone (t) {
    return !t || Object.getOwnPropertyNames(t).length === 0
      ? this
      : P.create(
        t.locale || this.specifiedLocale,
        t.numberingSystem || this.numberingSystem,
        t.outputCalendar || this.outputCalendar,
        ai(t.weekSettings) || this.weekSettings,
        t.defaultToEN || !1
      )
  }

  redefaultToEN (t = {}) {
    return this.clone({ ...t, defaultToEN: !0 })
  }

  redefaultToSystem (t = {}) {
    return this.clone({ ...t, defaultToEN: !1 })
  }

  months (t, e = !1) {
    return on(this, t, zr, () => {
      const i = e ? { month: t, day: 'numeric' } : { month: t }
      const n = e ? 'format' : 'standalone'
      return (
        this.monthsCache[n][t] ||
                    (this.monthsCache[n][t] = Kf((r) =>
                      this.extract(r, i, 'month')
                    )),
        this.monthsCache[n][t]
      )
    })
  }

  weekdays (t, e = !1) {
    return on(this, t, Vr, () => {
      const i = e
        ? {
            weekday: t,
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        : { weekday: t }
      const n = e ? 'format' : 'standalone'
      return (
        this.weekdaysCache[n][t] ||
                    (this.weekdaysCache[n][t] = Jf((r) =>
                      this.extract(r, i, 'weekday')
                    )),
        this.weekdaysCache[n][t]
      )
    })
  }

  meridiems () {
    return on(
      this,
      void 0,
      () => Hr,
      () => {
        if (!this.meridiemCache) {
          const t = { hour: 'numeric', hourCycle: 'h12' }
          this.meridiemCache = [
            T.utc(2016, 11, 13, 9),
            T.utc(2016, 11, 13, 19)
          ].map((e) => this.extract(e, t, 'dayperiod'))
        }
        return this.meridiemCache
      }
    )
  }

  eras (t) {
    return on(this, t, Br, () => {
      const e = { era: t }
      return (
        this.eraCache[t] ||
                    (this.eraCache[t] = [
                      T.utc(-40, 1, 1),
                      T.utc(2017, 1, 1)
                    ].map((i) => this.extract(i, e, 'era'))),
        this.eraCache[t]
      )
    })
  }

  extract (t, e, i) {
    const n = this.dtFormatter(t, e)
    const r = n.formatToParts()
    const o = r.find((a) => a.type.toLowerCase() === i)
    return o ? o.value : null
  }

  numberFormatter (t = {}) {
    return new Rr(this.intl, t.forceSimple || this.fastNumbers, t)
  }

  dtFormatter (t, e = {}) {
    return new Nr(t, this.intl, e)
  }

  relFormatter (t = {}) {
    return new Wr(this.intl, this.isEnglish(), t)
  }

  listFormatter (t = {}) {
    return jf(this.intl, t)
  }

  isEnglish () {
    return (
      this.locale === 'en' ||
            this.locale.toLowerCase() === 'en-us' ||
            new Intl.DateTimeFormat(this.intl)
              .resolvedOptions()
              .locale.startsWith('en-us')
    )
  }

  getWeekSettings () {
    return this.weekSettings
      ? this.weekSettings
      : ln()
        ? qf(this.locale)
        : tm
  }

  getStartOfWeek () {
    return this.getWeekSettings().firstDay
  }

  getMinDaysInFirstWeek () {
    return this.getWeekSettings().minimalDays
  }

  getWeekendDays () {
    return this.getWeekSettings().weekend
  }

  equals (t) {
    return (
      this.locale === t.locale &&
            this.numberingSystem === t.numberingSystem &&
            this.outputCalendar === t.outputCalendar
    )
  }

  toString () {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`
  }
}
let jr = null
var G = class extends dt {
  static get utcInstance () {
    return jr === null && (jr = new G(0)), jr
  }

  static instance (t) {
    return t === 0 ? G.utcInstance : new G(t)
  }

  static parseSpecifier (t) {
    if (t) {
      const e = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i)
      if (e) return new G(Se(e[1], e[2]))
    }
    return null
  }

  constructor (t) {
    super(), (this.fixed = t)
  }

  get type () {
    return 'fixed'
  }

  get name () {
    return this.fixed === 0 ? 'UTC' : `UTC${le(this.fixed, 'narrow')}`
  }

  get ianaName () {
    return this.fixed === 0
      ? 'Etc/UTC'
      : `Etc/GMT${le(-this.fixed, 'narrow')}`
  }

  offsetName () {
    return this.name
  }

  formatOffset (t, e) {
    return le(this.fixed, e)
  }

  get isUniversal () {
    return !0
  }

  offset () {
    return this.fixed
  }

  equals (t) {
    return t.type === 'fixed' && t.fixed === this.fixed
  }

  get isValid () {
    return !0
  }
}
const is = class extends dt {
  constructor (t) {
    super(), (this.zoneName = t)
  }

  get type () {
    return 'invalid'
  }

  get name () {
    return this.zoneName
  }

  get isUniversal () {
    return !1
  }

  offsetName () {
    return null
  }

  formatOffset () {
    return ''
  }

  offset () {
    return NaN
  }

  equals () {
    return !1
  }

  get isValid () {
    return !1
  }
}
function Et (s, t) {
  let e
  if (D(s) || s === null) return t
  if (s instanceof dt) return s
  if (wl(s)) {
    const i = s.toLowerCase()
    return i === 'default'
      ? t
      : i === 'local' || i === 'system'
        ? zt.instance
        : i === 'utc' || i === 'gmt'
          ? G.utcInstance
          : G.parseSpecifier(i) || nt.create(s)
  } else {
    return Ct(s)
      ? G.instance(s)
      : typeof s === 'object' &&
                'offset' in s &&
                typeof s.offset === 'function'
        ? s
        : new is(s)
  }
}
const Ur = {
  arab: '[\u0660-\u0669]',
  arabext: '[\u06F0-\u06F9]',
  bali: '[\u1B50-\u1B59]',
  beng: '[\u09E6-\u09EF]',
  deva: '[\u0966-\u096F]',
  fullwide: '[\uFF10-\uFF19]',
  gujr: '[\u0AE6-\u0AEF]',
  hanidec:
        '[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]',
  khmr: '[\u17E0-\u17E9]',
  knda: '[\u0CE6-\u0CEF]',
  laoo: '[\u0ED0-\u0ED9]',
  limb: '[\u1946-\u194F]',
  mlym: '[\u0D66-\u0D6F]',
  mong: '[\u1810-\u1819]',
  mymr: '[\u1040-\u1049]',
  orya: '[\u0B66-\u0B6F]',
  tamldec: '[\u0BE6-\u0BEF]',
  telu: '[\u0C66-\u0C6F]',
  thai: '[\u0E50-\u0E59]',
  tibt: '[\u0F20-\u0F29]',
  latn: '\\d'
}
const Sl = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}
const em = Ur.hanidec.replace(/[\[|\]]/g, '').split('')
function kl (s) {
  let t = parseInt(s, 10)
  if (isNaN(t)) {
    t = ''
    for (let e = 0; e < s.length; e++) {
      const i = s.charCodeAt(e)
      if (s[e].search(Ur.hanidec) !== -1) t += em.indexOf(s[e])
      else {
        for (const n in Sl) {
          const [r, o] = Sl[n]
          i >= r && i <= o && (t += i - r)
        }
      }
    }
    return parseInt(t, 10)
  } else return t
}
let ns = {}
function Ml () {
  ns = {}
}
function St ({ numberingSystem: s }, t = '') {
  const e = s || 'latn'
  return (
    ns[e] || (ns[e] = {}),
    ns[e][t] || (ns[e][t] = new RegExp(`${Ur[e]}${t}`)),
    ns[e][t]
  )
}
let Tl = () => Date.now()
let vl = 'system'
let Ol = null
let Dl = null
let El = null
let Cl = 60
let Il
let Fl = null
var z = class {
  static get now () {
    return Tl
  }

  static set now (t) {
    Tl = t
  }

  static set defaultZone (t) {
    vl = t
  }

  static get defaultZone () {
    return Et(vl, zt.instance)
  }

  static get defaultLocale () {
    return Ol
  }

  static set defaultLocale (t) {
    Ol = t
  }

  static get defaultNumberingSystem () {
    return Dl
  }

  static set defaultNumberingSystem (t) {
    Dl = t
  }

  static get defaultOutputCalendar () {
    return El
  }

  static set defaultOutputCalendar (t) {
    El = t
  }

  static get defaultWeekSettings () {
    return Fl
  }

  static set defaultWeekSettings (t) {
    Fl = ai(t)
  }

  static get twoDigitCutoffYear () {
    return Cl
  }

  static set twoDigitCutoffYear (t) {
    Cl = t % 100
  }

  static get throwOnInvalid () {
    return Il
  }

  static set throwOnInvalid (t) {
    Il = t
  }

  static resetCaches () {
    P.resetCache(), nt.resetCache(), T.resetCache(), Ml()
  }
}
const rt = class {
  constructor (t, e) {
    (this.reason = t), (this.explanation = e)
  }

  toMessage () {
    return this.explanation
      ? `${this.reason}: ${this.explanation}`
      : this.reason
  }
}
const Al = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
const Ll = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
function kt (s, t) {
  return new rt(
    'unit out of range',
        `you specified ${t} (of type ${typeof t}) as a ${s}, which is invalid`
  )
}
function cn (s, t, e) {
  const i = new Date(Date.UTC(s, t - 1, e))
  s < 100 && s >= 0 && i.setUTCFullYear(i.getUTCFullYear() - 1900)
  const n = i.getUTCDay()
  return n === 0 ? 7 : n
}
function Pl (s, t, e) {
  return e + (Me(s) ? Ll : Al)[t - 1]
}
function Rl (s, t) {
  const e = Me(s) ? Ll : Al
  const i = e.findIndex((r) => r < t)
  const n = t - e[i]
  return { month: i + 1, day: n }
}
function hn (s, t) {
  return ((s - t + 7) % 7) + 1
}
function li (s, t = 4, e = 1) {
  const { year: i, month: n, day: r } = s
  const o = Pl(i, n, r)
  const a = hn(cn(i, n, r), e)
  let l = Math.floor((o - a + 14 - t) / 7)
  let c
  return (
    l < 1
      ? ((c = i - 1), (l = ke(c, t, e)))
      : l > ke(i, t, e)
        ? ((c = i + 1), (l = 1))
        : (c = i),
    { weekYear: c, weekNumber: l, weekday: a, ...hi(s) }
  )
}
function Yr (s, t = 4, e = 1) {
  const { weekYear: i, weekNumber: n, weekday: r } = s
  const o = hn(cn(i, 1, t), e)
  const a = ce(i)
  let l = n * 7 + r - o - 7 + t
  let c
  l < 1
    ? ((c = i - 1), (l += ce(c)))
    : l > a
      ? ((c = i + 1), (l -= ce(i)))
      : (c = i)
  const { month: h, day: u } = Rl(c, l)
  return { year: c, month: h, day: u, ...hi(s) }
}
function un (s) {
  const { year: t, month: e, day: i } = s
  const n = Pl(t, e, i)
  return { year: t, ordinal: n, ...hi(s) }
}
function Zr (s) {
  const { year: t, ordinal: e } = s
  const { month: i, day: n } = Rl(t, e)
  return { year: t, month: i, day: n, ...hi(s) }
}
function qr (s, t) {
  if (!D(s.localWeekday) || !D(s.localWeekNumber) || !D(s.localWeekYear)) {
    if (!D(s.weekday) || !D(s.weekNumber) || !D(s.weekYear)) {
      throw new vt(
        'Cannot mix locale-based week fields with ISO-based week fields'
      )
    }
    return (
      D(s.localWeekday) || (s.weekday = s.localWeekday),
      D(s.localWeekNumber) || (s.weekNumber = s.localWeekNumber),
      D(s.localWeekYear) || (s.weekYear = s.localWeekYear),
      delete s.localWeekday,
      delete s.localWeekNumber,
      delete s.localWeekYear,
      {
        minDaysInFirstWeek: t.getMinDaysInFirstWeek(),
        startOfWeek: t.getStartOfWeek()
      }
    )
  } else return { minDaysInFirstWeek: 4, startOfWeek: 1 }
}
function Nl (s, t = 4, e = 1) {
  const i = ci(s.weekYear)
  const n = xt(s.weekNumber, 1, ke(s.weekYear, t, e))
  const r = xt(s.weekday, 1, 7)
  return i
    ? n
      ? r
        ? !1
        : kt('weekday', s.weekday)
      : kt('week', s.weekNumber)
    : kt('weekYear', s.weekYear)
}
function Wl (s) {
  const t = ci(s.year)
  const e = xt(s.ordinal, 1, ce(s.year))
  return t ? (e ? !1 : kt('ordinal', s.ordinal)) : kt('year', s.year)
}
function Gr (s) {
  const t = ci(s.year)
  const e = xt(s.month, 1, 12)
  const i = xt(s.day, 1, rs(s.year, s.month))
  return t
    ? e
      ? i
        ? !1
        : kt('day', s.day)
      : kt('month', s.month)
    : kt('year', s.year)
}
function Xr (s) {
  const { hour: t, minute: e, second: i, millisecond: n } = s
  const r = xt(t, 0, 23) || (t === 24 && e === 0 && i === 0 && n === 0)
  const o = xt(e, 0, 59)
  const a = xt(i, 0, 59)
  const l = xt(n, 0, 999)
  return r
    ? o
      ? a
        ? l
          ? !1
          : kt('millisecond', n)
        : kt('second', i)
      : kt('minute', e)
    : kt('hour', t)
}
function D (s) {
  return typeof s > 'u'
}
function Ct (s) {
  return typeof s === 'number'
}
function ci (s) {
  return typeof s === 'number' && s % 1 === 0
}
function wl (s) {
  return typeof s === 'string'
}
function Vl (s) {
  return Object.prototype.toString.call(s) === '[object Date]'
}
function an () {
  try {
    return typeof Intl < 'u' && !!Intl.RelativeTimeFormat
  } catch {
    return !1
  }
}
function ln () {
  try {
    return (
      typeof Intl < 'u' &&
            !!Intl.Locale &&
            ('weekInfo' in Intl.Locale.prototype ||
                'getWeekInfo' in Intl.Locale.prototype)
    )
  } catch {
    return !1
  }
}
function Hl (s) {
  return Array.isArray(s) ? s : [s]
}
function Kr (s, t, e) {
  if (s.length !== 0) {
    return s.reduce((i, n) => {
      const r = [t(n), n]
      return i && e(i[0], r[0]) === i[0] ? i : r
    }, null)[1]
  }
}
function Bl (s, t) {
  return t.reduce((e, i) => ((e[i] = s[i]), e), {})
}
function he (s, t) {
  return Object.prototype.hasOwnProperty.call(s, t)
}
function ai (s) {
  if (s == null) return null
  if (typeof s !== 'object') throw new J('Week settings must be an object')
  if (
    !xt(s.firstDay, 1, 7) ||
        !xt(s.minimalDays, 1, 7) ||
        !Array.isArray(s.weekend) ||
        s.weekend.some((t) => !xt(t, 1, 7))
  ) {
    throw new J('Invalid week settings')
  }
  return {
    firstDay: s.firstDay,
    minimalDays: s.minimalDays,
    weekend: Array.from(s.weekend)
  }
}
function xt (s, t, e) {
  return ci(s) && s >= t && s <= e
}
function sm (s, t) {
  return s - t * Math.floor(s / t)
}
function q (s, t = 2) {
  const e = s < 0
  let i
  return (
    e
      ? (i = '-' + ('' + -s).padStart(t, '0'))
      : (i = ('' + s).padStart(t, '0')),
    i
  )
}
function qt (s) {
  if (!(D(s) || s === null || s === '')) return parseInt(s, 10)
}
function ue (s) {
  if (!(D(s) || s === null || s === '')) return parseFloat(s)
}
function ui (s) {
  if (!(D(s) || s === null || s === '')) {
    const t = parseFloat('0.' + s) * 1e3
    return Math.floor(t)
  }
}
function ss (s, t, e = !1) {
  const i = 10 ** t
  return (e ? Math.trunc : Math.round)(s * i) / i
}
function Me (s) {
  return s % 4 === 0 && (s % 100 !== 0 || s % 400 === 0)
}
function ce (s) {
  return Me(s) ? 366 : 365
}
function rs (s, t) {
  const e = sm(t - 1, 12) + 1
  const i = s + (t - e) / 12
  return e === 2
    ? Me(i)
      ? 29
      : 28
    : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e - 1]
}
function es (s) {
  let t = Date.UTC(
    s.year,
    s.month - 1,
    s.day,
    s.hour,
    s.minute,
    s.second,
    s.millisecond
  )
  return (
    s.year < 100 &&
            s.year >= 0 &&
            ((t = new Date(t)), t.setUTCFullYear(s.year, s.month - 1, s.day)),
    +t
  )
}
function zl (s, t, e) {
  return -hn(cn(s, 1, t), e) + t - 1
}
function ke (s, t = 4, e = 1) {
  const i = zl(s, t, e)
  const n = zl(s + 1, t, e)
  return (ce(s) - i + n) / 7
}
function di (s) {
  return s > 99 ? s : s > z.twoDigitCutoffYear ? 1900 + s : 2e3 + s
}
function sn (s, t, e, i = null) {
  const n = new Date(s)
  const r = {
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }
  i && (r.timeZone = i)
  const o = { timeZoneName: t, ...r }
  const a = new Intl.DateTimeFormat(e, o)
    .formatToParts(n)
    .find((l) => l.type.toLowerCase() === 'timezonename')
  return a ? a.value : null
}
function Se (s, t) {
  let e = parseInt(s, 10)
  Number.isNaN(e) && (e = 0)
  const i = parseInt(t, 10) || 0
  const n = e < 0 || Object.is(e, -0) ? -i : i
  return e * 60 + n
}
function Jr (s) {
  const t = Number(s)
  if (typeof s === 'boolean' || s === '' || Number.isNaN(t)) {
    throw new J(`Invalid unit value ${s}`)
  }
  return t
}
function os (s, t) {
  const e = {}
  for (const i in s) {
    if (he(s, i)) {
      const n = s[i]
      if (n == null) continue
      e[t(i)] = Jr(n)
    }
  }
  return e
}
function le (s, t) {
  const e = Math.trunc(Math.abs(s / 60))
  const i = Math.trunc(Math.abs(s % 60))
  const n = s >= 0 ? '+' : '-'
  switch (t) {
    case 'short':
      return `${n}${q(e, 2)}:${q(i, 2)}`
    case 'narrow':
      return `${n}${e}${i > 0 ? `:${i}` : ''}`
    case 'techie':
      return `${n}${q(e, 2)}${q(i, 2)}`
    default:
      throw new RangeError(
                `Value format ${t} is out of range for property format`
      )
  }
}
function hi (s) {
  return Bl(s, ['hour', 'minute', 'second', 'millisecond'])
}
const im = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const Qr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const nm = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
function zr (s) {
  switch (s) {
    case 'narrow':
      return [...nm]
    case 'short':
      return [...Qr]
    case 'long':
      return [...im]
    case 'numeric':
      return [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
      ]
    case '2-digit':
      return [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ]
    default:
      return null
  }
}
const to = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
const eo = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const rm = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
function Vr (s) {
  switch (s) {
    case 'narrow':
      return [...rm]
    case 'short':
      return [...eo]
    case 'long':
      return [...to]
    case 'numeric':
      return ['1', '2', '3', '4', '5', '6', '7']
    default:
      return null
  }
}
var Hr = ['AM', 'PM']
const om = ['Before Christ', 'Anno Domini']
const am = ['BC', 'AD']
const lm = ['B', 'A']
function Br (s) {
  switch (s) {
    case 'narrow':
      return [...lm]
    case 'short':
      return [...am]
    case 'long':
      return [...om]
    default:
      return null
  }
}
function $l (s) {
  return Hr[s.hour < 12 ? 0 : 1]
}
function jl (s, t) {
  return Vr(t)[s.weekday - 1]
}
function Ul (s, t) {
  return zr(t)[s.month - 1]
}
function Yl (s, t) {
  return Br(t)[s.year < 0 ? 0 : 1]
}
function _l (s, t, e = 'always', i = !1) {
  const n = {
    years: ['year', 'yr.'],
    quarters: ['quarter', 'qtr.'],
    months: ['month', 'mo.'],
    weeks: ['week', 'wk.'],
    days: ['day', 'day', 'days'],
    hours: ['hour', 'hr.'],
    minutes: ['minute', 'min.'],
    seconds: ['second', 'sec.']
  }
  const r = ['hours', 'minutes', 'seconds'].indexOf(s) === -1
  if (e === 'auto' && r) {
    const u = s === 'days'
    switch (t) {
      case 1:
        return u ? 'tomorrow' : `next ${n[s][0]}`
      case -1:
        return u ? 'yesterday' : `last ${n[s][0]}`
      case 0:
        return u ? 'today' : `this ${n[s][0]}`
      default:
    }
  }
  const o = Object.is(t, -0) || t < 0
  const a = Math.abs(t)
  const l = a === 1
  const c = n[s]
  const h = i ? (l ? c[1] : c[2] || c[1]) : l ? n[s][0] : s
  return o ? `${a} ${h} ago` : `in ${a} ${h}`
}
function Zl (s, t) {
  let e = ''
  for (const i of s) i.literal ? (e += i.val) : (e += t(i.val))
  return e
}
const cm = {
  D: ae,
  DD: Hs,
  DDD: Bs,
  DDDD: $s,
  t: js,
  tt: Us,
  ttt: Ys,
  tttt: Zs,
  T: qs,
  TT: Gs,
  TTT: Xs,
  TTTT: Ks,
  f: Js,
  ff: ti,
  fff: si,
  ffff: ni,
  F: Qs,
  FF: ei,
  FFF: ii,
  FFFF: ri
}
var X = class {
  static create (t, e = {}) {
    return new X(t, e)
  }

  static parseFormat (t) {
    let e = null
    let i = ''
    let n = !1
    const r = []
    for (let o = 0; o < t.length; o++) {
      const a = t.charAt(o)
      a === "'"
        ? (i.length > 0 &&
                      r.push({ literal: n || /^\s+$/.test(i), val: i }),
          (e = null),
          (i = ''),
          (n = !n))
        : n || a === e
          ? (i += a)
          : (i.length > 0 &&
                        r.push({ literal: /^\s+$/.test(i), val: i }),
            (i = a),
            (e = a))
    }
    return (
      i.length > 0 && r.push({ literal: n || /^\s+$/.test(i), val: i }), r
    )
  }

  static macroTokenToFormatOpts (t) {
    return cm[t]
  }

  constructor (t, e) {
    (this.opts = e), (this.loc = t), (this.systemLoc = null)
  }

  formatWithSystemDefault (t, e) {
    return (
      this.systemLoc === null &&
                (this.systemLoc = this.loc.redefaultToSystem()),
      this.systemLoc.dtFormatter(t, { ...this.opts, ...e }).format()
    )
  }

  dtFormatter (t, e = {}) {
    return this.loc.dtFormatter(t, { ...this.opts, ...e })
  }

  formatDateTime (t, e) {
    return this.dtFormatter(t, e).format()
  }

  formatDateTimeParts (t, e) {
    return this.dtFormatter(t, e).formatToParts()
  }

  formatInterval (t, e) {
    return this.dtFormatter(t.start, e).dtf.formatRange(
      t.start.toJSDate(),
      t.end.toJSDate()
    )
  }

  resolvedOptions (t, e) {
    return this.dtFormatter(t, e).resolvedOptions()
  }

  num (t, e = 0) {
    if (this.opts.forceSimple) return q(t, e)
    const i = { ...this.opts }
    return e > 0 && (i.padTo = e), this.loc.numberFormatter(i).format(t)
  }

  formatDateTimeFromString (t, e) {
    const i = this.loc.listingMode() === 'en'
    const n =
            this.loc.outputCalendar && this.loc.outputCalendar !== 'gregory'
    const r = (f, m) => this.loc.extract(t, f, m)
    const o = (f) =>
      t.isOffsetFixed && t.offset === 0 && f.allowZ
        ? 'Z'
        : t.isValid
          ? t.zone.formatOffset(t.ts, f.format)
          : ''
    const a = () =>
      i ? $l(t) : r({ hour: 'numeric', hourCycle: 'h12' }, 'dayperiod')
    const l = (f, m) =>
      i
        ? Ul(t, f)
        : r(m ? { month: f } : { month: f, day: 'numeric' }, 'month')
    const c = (f, m) =>
      i
        ? jl(t, f)
        : r(
          m
            ? { weekday: f }
            : {
                weekday: f,
                month: 'long',
                day: 'numeric'
              },
          'weekday'
        )
    const h = (f) => {
      const m = X.macroTokenToFormatOpts(f)
      return m ? this.formatWithSystemDefault(t, m) : f
    }
    const u = (f) => (i ? Yl(t, f) : r({ era: f }, 'era'))
    const d = (f) => {
      switch (f) {
        case 'S':
          return this.num(t.millisecond)
        case 'u':
        case 'SSS':
          return this.num(t.millisecond, 3)
        case 's':
          return this.num(t.second)
        case 'ss':
          return this.num(t.second, 2)
        case 'uu':
          return this.num(Math.floor(t.millisecond / 10), 2)
        case 'uuu':
          return this.num(Math.floor(t.millisecond / 100))
        case 'm':
          return this.num(t.minute)
        case 'mm':
          return this.num(t.minute, 2)
        case 'h':
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12)
        case 'hh':
          return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12, 2)
        case 'H':
          return this.num(t.hour)
        case 'HH':
          return this.num(t.hour, 2)
        case 'Z':
          return o({
            format: 'narrow',
            allowZ: this.opts.allowZ
          })
        case 'ZZ':
          return o({
            format: 'short',
            allowZ: this.opts.allowZ
          })
        case 'ZZZ':
          return o({
            format: 'techie',
            allowZ: this.opts.allowZ
          })
        case 'ZZZZ':
          return t.zone.offsetName(t.ts, {
            format: 'short',
            locale: this.loc.locale
          })
        case 'ZZZZZ':
          return t.zone.offsetName(t.ts, {
            format: 'long',
            locale: this.loc.locale
          })
        case 'z':
          return t.zoneName
        case 'a':
          return a()
        case 'd':
          return n ? r({ day: 'numeric' }, 'day') : this.num(t.day)
        case 'dd':
          return n
            ? r({ day: '2-digit' }, 'day')
            : this.num(t.day, 2)
        case 'c':
          return this.num(t.weekday)
        case 'ccc':
          return c('short', !0)
        case 'cccc':
          return c('long', !0)
        case 'ccccc':
          return c('narrow', !0)
        case 'E':
          return this.num(t.weekday)
        case 'EEE':
          return c('short', !1)
        case 'EEEE':
          return c('long', !1)
        case 'EEEEE':
          return c('narrow', !1)
        case 'L':
          return n
            ? r({ month: 'numeric', day: 'numeric' }, 'month')
            : this.num(t.month)
        case 'LL':
          return n
            ? r({ month: '2-digit', day: 'numeric' }, 'month')
            : this.num(t.month, 2)
        case 'LLL':
          return l('short', !0)
        case 'LLLL':
          return l('long', !0)
        case 'LLLLL':
          return l('narrow', !0)
        case 'M':
          return n
            ? r({ month: 'numeric' }, 'month')
            : this.num(t.month)
        case 'MM':
          return n
            ? r({ month: '2-digit' }, 'month')
            : this.num(t.month, 2)
        case 'MMM':
          return l('short', !1)
        case 'MMMM':
          return l('long', !1)
        case 'MMMMM':
          return l('narrow', !1)
        case 'y':
          return n
            ? r({ year: 'numeric' }, 'year')
            : this.num(t.year)
        case 'yy':
          return n
            ? r({ year: '2-digit' }, 'year')
            : this.num(t.year.toString().slice(-2), 2)
        case 'yyyy':
          return n
            ? r({ year: 'numeric' }, 'year')
            : this.num(t.year, 4)
        case 'yyyyyy':
          return n
            ? r({ year: 'numeric' }, 'year')
            : this.num(t.year, 6)
        case 'G':
          return u('short')
        case 'GG':
          return u('long')
        case 'GGGGG':
          return u('narrow')
        case 'kk':
          return this.num(t.weekYear.toString().slice(-2), 2)
        case 'kkkk':
          return this.num(t.weekYear, 4)
        case 'W':
          return this.num(t.weekNumber)
        case 'WW':
          return this.num(t.weekNumber, 2)
        case 'n':
          return this.num(t.localWeekNumber)
        case 'nn':
          return this.num(t.localWeekNumber, 2)
        case 'ii':
          return this.num(t.localWeekYear.toString().slice(-2), 2)
        case 'iiii':
          return this.num(t.localWeekYear, 4)
        case 'o':
          return this.num(t.ordinal)
        case 'ooo':
          return this.num(t.ordinal, 3)
        case 'q':
          return this.num(t.quarter)
        case 'qq':
          return this.num(t.quarter, 2)
        case 'X':
          return this.num(Math.floor(t.ts / 1e3))
        case 'x':
          return this.num(t.ts)
        default:
          return h(f)
      }
    }
    return Zl(X.parseFormat(e), d)
  }

  formatDurationFromString (t, e) {
    const i = (l) => {
      switch (l[0]) {
        case 'S':
          return 'millisecond'
        case 's':
          return 'second'
        case 'm':
          return 'minute'
        case 'h':
          return 'hour'
        case 'd':
          return 'day'
        case 'w':
          return 'week'
        case 'M':
          return 'month'
        case 'y':
          return 'year'
        default:
          return null
      }
    }
    const n = (l) => (c) => {
      const h = i(c)
      return h ? this.num(l.get(h), c.length) : c
    }
    const r = X.parseFormat(e)
    const o = r.reduce(
      (l, { literal: c, val: h }) => (c ? l : l.concat(h)),
      []
    )
    const a = t.shiftTo(...o.map(i).filter((l) => l))
    return Zl(r, n(a))
  }
}
const Gl =
    /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/
function ls (...s) {
  const t = s.reduce((e, i) => e + i.source, '')
  return RegExp(`^${t}$`)
}
function cs (...s) {
  return (t) =>
    s
      .reduce(
        ([e, i, n], r) => {
          const [o, a, l] = r(t, n)
          return [{ ...e, ...o }, a || i, l]
        },
        [{}, null, 1]
      )
      .slice(0, 2)
}
function hs (s, ...t) {
  if (s == null) return [null, null]
  for (const [e, i] of t) {
    const n = e.exec(s)
    if (n) return i(n)
  }
  return [null, null]
}
function Xl (...s) {
  return (t, e) => {
    const i = {}
    let n
    for (n = 0; n < s.length; n++) i[s[n]] = qt(t[e + n])
    return [i, null, e + n]
  }
}
const Kl = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/
const hm = `(?:${Kl.source}?(?:\\[(${Gl.source})\\])?)?`
const so = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/
const Jl = RegExp(`${so.source}${hm}`)
const io = RegExp(`(?:T${Jl.source})?`)
const um = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/
const dm = /(\d{4})-?W(\d\d)(?:-?(\d))?/
const fm = /(\d{4})-?(\d{3})/
const mm = Xl('weekYear', 'weekNumber', 'weekDay')
const gm = Xl('year', 'ordinal')
const pm = /(\d{4})-(\d\d)-(\d\d)/
const Ql = RegExp(`${so.source} ?(?:${Kl.source}|(${Gl.source}))?`)
const ym = RegExp(`(?: ${Ql.source})?`)
function as (s, t, e) {
  const i = s[t]
  return D(i) ? e : qt(i)
}
function bm (s, t) {
  return [
    { year: as(s, t), month: as(s, t + 1, 1), day: as(s, t + 2, 1) },
    null,
    t + 3
  ]
}
function us (s, t) {
  return [
    {
      hours: as(s, t, 0),
      minutes: as(s, t + 1, 0),
      seconds: as(s, t + 2, 0),
      milliseconds: ui(s[t + 3])
    },
    null,
    t + 4
  ]
}
function fi (s, t) {
  const e = !s[t] && !s[t + 1]
  const i = Se(s[t + 1], s[t + 2])
  const n = e ? null : G.instance(i)
  return [{}, n, t + 3]
}
function mi (s, t) {
  const e = s[t] ? nt.create(s[t]) : null
  return [{}, e, t + 1]
}
const xm = RegExp(`^T?${so.source}$`)
const _m =
    /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/
function wm (s) {
  const [t, e, i, n, r, o, a, l, c] = s
  const h = t[0] === '-'
  const u = l && l[0] === '-'
  const d = (f, m = !1) => (f !== void 0 && (m || (f && h)) ? -f : f)
  return [
    {
      years: d(ue(e)),
      months: d(ue(i)),
      weeks: d(ue(n)),
      days: d(ue(r)),
      hours: d(ue(o)),
      minutes: d(ue(a)),
      seconds: d(ue(l), l === '-0'),
      milliseconds: d(ui(c), u)
    }
  ]
}
const Sm = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
}
function no (s, t, e, i, n, r, o) {
  const a = {
    year: t.length === 2 ? di(qt(t)) : qt(t),
    month: Qr.indexOf(e) + 1,
    day: qt(i),
    hour: qt(n),
    minute: qt(r)
  }
  return (
    o && (a.second = qt(o)),
    s && (a.weekday = s.length > 3 ? to.indexOf(s) + 1 : eo.indexOf(s) + 1),
    a
  )
}
const km =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/
function Mm (s) {
  const [, t, e, i, n, r, o, a, l, c, h, u] = s
  const d = no(t, n, i, e, r, o, a)
  let f
  return l ? (f = Sm[l]) : c ? (f = 0) : (f = Se(h, u)), [d, new G(f)]
}
function Tm (s) {
  return s
    .replace(/\([^()]*\)|[\n\t]/g, ' ')
    .replace(/(\s\s+)/g, ' ')
    .trim()
}
const vm =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/
const Om =
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/
const Dm =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/
function ql (s) {
  const [, t, e, i, n, r, o, a] = s
  return [no(t, n, i, e, r, o, a), G.utcInstance]
}
function Em (s) {
  const [, t, e, i, n, r, o, a] = s
  return [no(t, a, e, i, n, r, o), G.utcInstance]
}
const Cm = ls(um, io)
const Im = ls(dm, io)
const Fm = ls(fm, io)
const Am = ls(Jl)
const tc = cs(bm, us, fi, mi)
const Lm = cs(mm, us, fi, mi)
const Pm = cs(gm, us, fi, mi)
const Rm = cs(us, fi, mi)
function ec (s) {
  return hs(s, [Cm, tc], [Im, Lm], [Fm, Pm], [Am, Rm])
}
function sc (s) {
  return hs(Tm(s), [km, Mm])
}
function ic (s) {
  return hs(s, [vm, ql], [Om, ql], [Dm, Em])
}
function nc (s) {
  return hs(s, [_m, wm])
}
const Nm = cs(us)
function rc (s) {
  return hs(s, [xm, Nm])
}
const Wm = ls(pm, ym)
const zm = ls(Ql)
const Vm = cs(us, fi, mi)
function oc (s) {
  return hs(s, [Wm, tc], [zm, Vm])
}
const ac = 'Invalid Duration'
const cc = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}
const Hm = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...cc
}
const Mt = 146097 / 400
const ds = 146097 / 4800
const Bm = {
  years: {
    quarters: 4,
    months: 12,
    weeks: Mt / 7,
    days: Mt,
    hours: Mt * 24,
    minutes: Mt * 24 * 60,
    seconds: Mt * 24 * 60 * 60,
    milliseconds: Mt * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: Mt / 28,
    days: Mt / 4,
    hours: (Mt * 24) / 4,
    minutes: (Mt * 24 * 60) / 4,
    seconds: (Mt * 24 * 60 * 60) / 4,
    milliseconds: (Mt * 24 * 60 * 60 * 1e3) / 4
  },
  months: {
    weeks: ds / 7,
    days: ds,
    hours: ds * 24,
    minutes: ds * 24 * 60,
    seconds: ds * 24 * 60 * 60,
    milliseconds: ds * 24 * 60 * 60 * 1e3
  },
  ...cc
}
const Te = [
  'years',
  'quarters',
  'months',
  'weeks',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds'
]
const $m = Te.slice(0).reverse()
function de (s, t, e = !1) {
  const i = {
    values: e ? t.values : { ...s.values, ...(t.values || {}) },
    loc: s.loc.clone(t.loc),
    conversionAccuracy: t.conversionAccuracy || s.conversionAccuracy,
    matrix: t.matrix || s.matrix
  }
  return new I(i)
}
function hc (s, t) {
  let e = t.milliseconds ?? 0
  for (const i of $m.slice(1)) t[i] && (e += t[i] * s[i].milliseconds)
  return e
}
function lc (s, t) {
  const e = hc(s, t) < 0 ? -1 : 1
  Te.reduceRight((i, n) => {
    if (D(t[n])) return i
    if (i) {
      const r = t[i] * e
      const o = s[n][i]
      const a = Math.floor(r / o);
      (t[n] += a * e), (t[i] -= a * o * e)
    }
    return n
  }, null),
  Te.reduce((i, n) => {
    if (D(t[n])) return i
    if (i) {
      const r = t[i] % 1;
      (t[i] -= r), (t[n] += r * s[i][n])
    }
    return n
  }, null)
}
function jm (s) {
  const t = {}
  for (const [e, i] of Object.entries(s)) i !== 0 && (t[e] = i)
  return t
}
var I = class {
  constructor (t) {
    const e = t.conversionAccuracy === 'longterm' || !1
    let i = e ? Bm : Hm
    t.matrix && (i = t.matrix),
    (this.values = t.values),
    (this.loc = t.loc || P.create()),
    (this.conversionAccuracy = e ? 'longterm' : 'casual'),
    (this.invalid = t.invalid || null),
    (this.matrix = i),
    (this.isLuxonDuration = !0)
  }

  static fromMillis (t, e) {
    return I.fromObject({ milliseconds: t }, e)
  }

  static fromObject (t, e = {}) {
    if (t == null || typeof t !== 'object') {
      throw new J(
                `Duration.fromObject: argument expected to be an object, got ${t === null ? 'null' : typeof t}`
      )
    }
    return new I({
      values: os(t, I.normalizeUnit),
      loc: P.fromObject(e),
      conversionAccuracy: e.conversionAccuracy,
      matrix: e.matrix
    })
  }

  static fromDurationLike (t) {
    if (Ct(t)) return I.fromMillis(t)
    if (I.isDuration(t)) return t
    if (typeof t === 'object') return I.fromObject(t)
    throw new J(`Unknown duration argument ${t} of type ${typeof t}`)
  }

  static fromISO (t, e) {
    const [i] = nc(t)
    return i
      ? I.fromObject(i, e)
      : I.invalid(
        'unparsable',
                  `the input "${t}" can't be parsed as ISO 8601`
      )
  }

  static fromISOTime (t, e) {
    const [i] = rc(t)
    return i
      ? I.fromObject(i, e)
      : I.invalid(
        'unparsable',
                  `the input "${t}" can't be parsed as ISO 8601`
      )
  }

  static invalid (t, e = null) {
    if (!t) throw new J('need to specify a reason the Duration is invalid')
    const i = t instanceof rt ? t : new rt(t, e)
    if (z.throwOnInvalid) throw new tn(i)
    return new I({ invalid: i })
  }

  static normalizeUnit (t) {
    const e = {
      year: 'years',
      years: 'years',
      quarter: 'quarters',
      quarters: 'quarters',
      month: 'months',
      months: 'months',
      week: 'weeks',
      weeks: 'weeks',
      day: 'days',
      days: 'days',
      hour: 'hours',
      hours: 'hours',
      minute: 'minutes',
      minutes: 'minutes',
      second: 'seconds',
      seconds: 'seconds',
      millisecond: 'milliseconds',
      milliseconds: 'milliseconds'
    }[t && t.toLowerCase()]
    if (!e) throw new ts(t)
    return e
  }

  static isDuration (t) {
    return (t && t.isLuxonDuration) || !1
  }

  get locale () {
    return this.isValid ? this.loc.locale : null
  }

  get numberingSystem () {
    return this.isValid ? this.loc.numberingSystem : null
  }

  toFormat (t, e = {}) {
    const i = { ...e, floor: e.round !== !1 && e.floor !== !1 }
    return this.isValid
      ? X.create(this.loc, i).formatDurationFromString(this, t)
      : ac
  }

  toHuman (t = {}) {
    if (!this.isValid) return ac
    const e = Te.map((i) => {
      const n = this.values[i]
      return D(n)
        ? null
        : this.loc
          .numberFormatter({
            style: 'unit',
            unitDisplay: 'long',
            ...t,
            unit: i.slice(0, -1)
          })
          .format(n)
    }).filter((i) => i)
    return this.loc
      .listFormatter({
        type: 'conjunction',
        style: t.listStyle || 'narrow',
        ...t
      })
      .format(e)
  }

  toObject () {
    return this.isValid ? { ...this.values } : {}
  }

  toISO () {
    if (!this.isValid) return null
    let t = 'P'
    return (
      this.years !== 0 && (t += this.years + 'Y'),
      (this.months !== 0 || this.quarters !== 0) &&
                (t += this.months + this.quarters * 3 + 'M'),
      this.weeks !== 0 && (t += this.weeks + 'W'),
      this.days !== 0 && (t += this.days + 'D'),
      (this.hours !== 0 ||
                this.minutes !== 0 ||
                this.seconds !== 0 ||
                this.milliseconds !== 0) &&
                (t += 'T'),
      this.hours !== 0 && (t += this.hours + 'H'),
      this.minutes !== 0 && (t += this.minutes + 'M'),
      (this.seconds !== 0 || this.milliseconds !== 0) &&
                (t += ss(this.seconds + this.milliseconds / 1e3, 3) + 'S'),
      t === 'P' && (t += 'T0S'),
      t
    )
  }

  toISOTime (t = {}) {
    if (!this.isValid) return null
    const e = this.toMillis()
    return e < 0 || e >= 864e5
      ? null
      : ((t = {
          suppressMilliseconds: !1,
          suppressSeconds: !1,
          includePrefix: !1,
          format: 'extended',
          ...t,
          includeOffset: !1
        }),
        T.fromMillis(e, { zone: 'UTC' }).toISOTime(t))
  }

  toJSON () {
    return this.toISO()
  }

  toString () {
    return this.toISO()
  }

  [Symbol.for('nodejs.util.inspect.custom')] () {
    return this.isValid
      ? `Duration { values: ${JSON.stringify(this.values)} }`
      : `Duration { Invalid, reason: ${this.invalidReason} }`
  }

  toMillis () {
    return this.isValid ? hc(this.matrix, this.values) : NaN
  }

  valueOf () {
    return this.toMillis()
  }

  plus (t) {
    if (!this.isValid) return this
    const e = I.fromDurationLike(t)
    const i = {}
    for (const n of Te) {
      (he(e.values, n) || he(this.values, n)) &&
                (i[n] = e.get(n) + this.get(n))
    }
    return de(this, { values: i }, !0)
  }

  minus (t) {
    if (!this.isValid) return this
    const e = I.fromDurationLike(t)
    return this.plus(e.negate())
  }

  mapUnits (t) {
    if (!this.isValid) return this
    const e = {}
    for (const i of Object.keys(this.values)) {
      e[i] = Jr(t(this.values[i], i))
    }
    return de(this, { values: e }, !0)
  }

  get (t) {
    return this[I.normalizeUnit(t)]
  }

  set (t) {
    if (!this.isValid) return this
    const e = { ...this.values, ...os(t, I.normalizeUnit) }
    return de(this, { values: e })
  }

  reconfigure ({
    locale: t,
    numberingSystem: e,
    conversionAccuracy: i,
    matrix: n
  } = {}) {
    const o = {
      loc: this.loc.clone({ locale: t, numberingSystem: e }),
      matrix: n,
      conversionAccuracy: i
    }
    return de(this, o)
  }

  as (t) {
    return this.isValid ? this.shiftTo(t).get(t) : NaN
  }

  normalize () {
    if (!this.isValid) return this
    const t = this.toObject()
    return lc(this.matrix, t), de(this, { values: t }, !0)
  }

  rescale () {
    if (!this.isValid) return this
    const t = jm(this.normalize().shiftToAll().toObject())
    return de(this, { values: t }, !0)
  }

  shiftTo (...t) {
    if (!this.isValid) return this
    if (t.length === 0) return this
    t = t.map((o) => I.normalizeUnit(o))
    const e = {}
    const i = {}
    const n = this.toObject()
    let r
    for (const o of Te) {
      if (t.indexOf(o) >= 0) {
        r = o
        let a = 0
        for (const c in i) (a += this.matrix[c][o] * i[c]), (i[c] = 0)
        Ct(n[o]) && (a += n[o])
        const l = Math.trunc(a);
        (e[o] = l), (i[o] = (a * 1e3 - l * 1e3) / 1e3)
      } else Ct(n[o]) && (i[o] = n[o])
    }
    for (const o in i) {
      i[o] !== 0 && (e[r] += o === r ? i[o] : i[o] / this.matrix[r][o])
    }
    return lc(this.matrix, e), de(this, { values: e }, !0)
  }

  shiftToAll () {
    return this.isValid
      ? this.shiftTo(
        'years',
        'months',
        'weeks',
        'days',
        'hours',
        'minutes',
        'seconds',
        'milliseconds'
      )
      : this
  }

  negate () {
    if (!this.isValid) return this
    const t = {}
    for (const e of Object.keys(this.values)) {
      t[e] = this.values[e] === 0 ? 0 : -this.values[e]
    }
    return de(this, { values: t }, !0)
  }

  get years () {
    return this.isValid ? this.values.years || 0 : NaN
  }

  get quarters () {
    return this.isValid ? this.values.quarters || 0 : NaN
  }

  get months () {
    return this.isValid ? this.values.months || 0 : NaN
  }

  get weeks () {
    return this.isValid ? this.values.weeks || 0 : NaN
  }

  get days () {
    return this.isValid ? this.values.days || 0 : NaN
  }

  get hours () {
    return this.isValid ? this.values.hours || 0 : NaN
  }

  get minutes () {
    return this.isValid ? this.values.minutes || 0 : NaN
  }

  get seconds () {
    return this.isValid ? this.values.seconds || 0 : NaN
  }

  get milliseconds () {
    return this.isValid ? this.values.milliseconds || 0 : NaN
  }

  get isValid () {
    return this.invalid === null
  }

  get invalidReason () {
    return this.invalid ? this.invalid.reason : null
  }

  get invalidExplanation () {
    return this.invalid ? this.invalid.explanation : null
  }

  equals (t) {
    if (!this.isValid || !t.isValid || !this.loc.equals(t.loc)) return !1
    function e (i, n) {
      return i === void 0 || i === 0 ? n === void 0 || n === 0 : i === n
    }
    for (const i of Te) if (!e(this.values[i], t.values[i])) return !1
    return !0
  }
}
const fs = 'Invalid Interval'
function Um (s, t) {
  return !s || !s.isValid
    ? U.invalid('missing or invalid start')
    : !t || !t.isValid
        ? U.invalid('missing or invalid end')
        : t < s
          ? U.invalid(
            'end before start',
                  `The end of an interval must be after its start, but you had start=${s.toISO()} and end=${t.toISO()}`
          )
          : null
}
var U = class {
  constructor (t) {
    (this.s = t.start),
    (this.e = t.end),
    (this.invalid = t.invalid || null),
    (this.isLuxonInterval = !0)
  }

  static invalid (t, e = null) {
    if (!t) throw new J('need to specify a reason the Interval is invalid')
    const i = t instanceof rt ? t : new rt(t, e)
    if (z.throwOnInvalid) throw new Qi(i)
    return new U({ invalid: i })
  }

  static fromDateTimes (t, e) {
    const i = ms(t)
    const n = ms(e)
    const r = Um(i, n)
    return r ?? new U({ start: i, end: n })
  }

  static after (t, e) {
    const i = I.fromDurationLike(e)
    const n = ms(t)
    return U.fromDateTimes(n, n.plus(i))
  }

  static before (t, e) {
    const i = I.fromDurationLike(e)
    const n = ms(t)
    return U.fromDateTimes(n.minus(i), n)
  }

  static fromISO (t, e) {
    const [i, n] = (t || '').split('/', 2)
    if (i && n) {
      let r, o
      try {
        (r = T.fromISO(i, e)), (o = r.isValid)
      } catch {
        o = !1
      }
      let a, l
      try {
        (a = T.fromISO(n, e)), (l = a.isValid)
      } catch {
        l = !1
      }
      if (o && l) return U.fromDateTimes(r, a)
      if (o) {
        const c = I.fromISO(n, e)
        if (c.isValid) return U.after(r, c)
      } else if (l) {
        const c = I.fromISO(i, e)
        if (c.isValid) return U.before(a, c)
      }
    }
    return U.invalid(
      'unparsable',
            `the input "${t}" can't be parsed as ISO 8601`
    )
  }

  static isInterval (t) {
    return (t && t.isLuxonInterval) || !1
  }

  get start () {
    return this.isValid ? this.s : null
  }

  get end () {
    return this.isValid ? this.e : null
  }

  get isValid () {
    return this.invalidReason === null
  }

  get invalidReason () {
    return this.invalid ? this.invalid.reason : null
  }

  get invalidExplanation () {
    return this.invalid ? this.invalid.explanation : null
  }

  length (t = 'milliseconds') {
    return this.isValid ? this.toDuration(t).get(t) : NaN
  }

  count (t = 'milliseconds', e) {
    if (!this.isValid) return NaN
    const i = this.start.startOf(t, e)
    let n
    return (
      e?.useLocaleWeeks
        ? (n = this.end.reconfigure({ locale: i.locale }))
        : (n = this.end),
      (n = n.startOf(t, e)),
      Math.floor(n.diff(i, t).get(t)) +
                (n.valueOf() !== this.end.valueOf())
    )
  }

  hasSame (t) {
    return this.isValid
      ? this.isEmpty() || this.e.minus(1).hasSame(this.s, t)
      : !1
  }

  isEmpty () {
    return this.s.valueOf() === this.e.valueOf()
  }

  isAfter (t) {
    return this.isValid ? this.s > t : !1
  }

  isBefore (t) {
    return this.isValid ? this.e <= t : !1
  }

  contains (t) {
    return this.isValid ? this.s <= t && this.e > t : !1
  }

  set ({ start: t, end: e } = {}) {
    return this.isValid ? U.fromDateTimes(t || this.s, e || this.e) : this
  }

  splitAt (...t) {
    if (!this.isValid) return []
    const e = t
      .map(ms)
      .filter((o) => this.contains(o))
      .sort((o, a) => o.toMillis() - a.toMillis())
    const i = []
    let { s: n } = this
    let r = 0
    for (; n < this.e;) {
      const o = e[r] || this.e
      const a = +o > +this.e ? this.e : o
      i.push(U.fromDateTimes(n, a)), (n = a), (r += 1)
    }
    return i
  }

  splitBy (t) {
    const e = I.fromDurationLike(t)
    if (!this.isValid || !e.isValid || e.as('milliseconds') === 0) {
      return []
    }
    let { s: i } = this
    let n = 1
    let r
    const o = []
    for (; i < this.e;) {
      const a = this.start.plus(e.mapUnits((l) => l * n));
      (r = +a > +this.e ? this.e : a),
      o.push(U.fromDateTimes(i, r)),
      (i = r),
      (n += 1)
    }
    return o
  }

  divideEqually (t) {
    return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : []
  }

  overlaps (t) {
    return this.e > t.s && this.s < t.e
  }

  abutsStart (t) {
    return this.isValid ? +this.e == +t.s : !1
  }

  abutsEnd (t) {
    return this.isValid ? +t.e == +this.s : !1
  }

  engulfs (t) {
    return this.isValid ? this.s <= t.s && this.e >= t.e : !1
  }

  equals (t) {
    return !this.isValid || !t.isValid
      ? !1
      : this.s.equals(t.s) && this.e.equals(t.e)
  }

  intersection (t) {
    if (!this.isValid) return this
    const e = this.s > t.s ? this.s : t.s
    const i = this.e < t.e ? this.e : t.e
    return e >= i ? null : U.fromDateTimes(e, i)
  }

  union (t) {
    if (!this.isValid) return this
    const e = this.s < t.s ? this.s : t.s
    const i = this.e > t.e ? this.e : t.e
    return U.fromDateTimes(e, i)
  }

  static merge (t) {
    const [e, i] = t
      .sort((n, r) => n.s - r.s)
      .reduce(
        ([n, r], o) =>
          r
            ? r.overlaps(o) || r.abutsStart(o)
              ? [n, r.union(o)]
              : [n.concat([r]), o]
            : [n, o],
        [[], null]
      )
    return i && e.push(i), e
  }

  static xor (t) {
    let e = null
    let i = 0
    const n = []
    const r = t.map((l) => [
      { time: l.s, type: 's' },
      { time: l.e, type: 'e' }
    ])
    const o = Array.prototype.concat(...r)
    const a = o.sort((l, c) => l.time - c.time)
    for (const l of a) {
      (i += l.type === 's' ? 1 : -1),
      i === 1
        ? (e = l.time)
        : (e && +e != +l.time && n.push(U.fromDateTimes(e, l.time)),
          (e = null))
    }
    return U.merge(n)
  }

  difference (...t) {
    return U.xor([this].concat(t))
      .map((e) => this.intersection(e))
      .filter((e) => e && !e.isEmpty())
  }

  toString () {
    return this.isValid
      ? `[${this.s.toISO()} \u2013 ${this.e.toISO()})`
      : fs
  }

  [Symbol.for('nodejs.util.inspect.custom')] () {
    return this.isValid
      ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`
      : `Interval { Invalid, reason: ${this.invalidReason} }`
  }

  toLocaleString (t = ae, e = {}) {
    return this.isValid
      ? X.create(this.s.loc.clone(e), t).formatInterval(this)
      : fs
  }

  toISO (t) {
    return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : fs
  }

  toISODate () {
    return this.isValid
      ? `${this.s.toISODate()}/${this.e.toISODate()}`
      : fs
  }

  toISOTime (t) {
    return this.isValid
      ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}`
      : fs
  }

  toFormat (t, { separator: e = ' \u2013 ' } = {}) {
    return this.isValid
      ? `${this.s.toFormat(t)}${e}${this.e.toFormat(t)}`
      : fs
  }

  toDuration (t, e) {
    return this.isValid
      ? this.e.diff(this.s, t, e)
      : I.invalid(this.invalidReason)
  }

  mapEndpoints (t) {
    return U.fromDateTimes(t(this.s), t(this.e))
  }
}
const Gt = class {
  static hasDST (t = z.defaultZone) {
    const e = T.now().setZone(t).set({ month: 12 })
    return !t.isUniversal && e.offset !== e.set({ month: 6 }).offset
  }

  static isValidIANAZone (t) {
    return nt.isValidZone(t)
  }

  static normalizeZone (t) {
    return Et(t, z.defaultZone)
  }

  static getStartOfWeek ({ locale: t = null, locObj: e = null } = {}) {
    return (e || P.create(t)).getStartOfWeek()
  }

  static getMinimumDaysInFirstWeek ({
    locale: t = null,
    locObj: e = null
  } = {}) {
    return (e || P.create(t)).getMinDaysInFirstWeek()
  }

  static getWeekendWeekdays ({ locale: t = null, locObj: e = null } = {}) {
    return (e || P.create(t)).getWeekendDays().slice()
  }

  static months (
    t = 'long',
    {
      locale: e = null,
      numberingSystem: i = null,
      locObj: n = null,
      outputCalendar: r = 'gregory'
    } = {}
  ) {
    return (n || P.create(e, i, r)).months(t)
  }

  static monthsFormat (
    t = 'long',
    {
      locale: e = null,
      numberingSystem: i = null,
      locObj: n = null,
      outputCalendar: r = 'gregory'
    } = {}
  ) {
    return (n || P.create(e, i, r)).months(t, !0)
  }

  static weekdays (
    t = 'long',
    { locale: e = null, numberingSystem: i = null, locObj: n = null } = {}
  ) {
    return (n || P.create(e, i, null)).weekdays(t)
  }

  static weekdaysFormat (
    t = 'long',
    { locale: e = null, numberingSystem: i = null, locObj: n = null } = {}
  ) {
    return (n || P.create(e, i, null)).weekdays(t, !0)
  }

  static meridiems ({ locale: t = null } = {}) {
    return P.create(t).meridiems()
  }

  static eras (t = 'short', { locale: e = null } = {}) {
    return P.create(e, null, 'gregory').eras(t)
  }

  static features () {
    return { relative: an(), localeWeek: ln() }
  }
}
function uc (s, t) {
  const e = (n) => n.toUTC(0, { keepLocalTime: !0 }).startOf('day').valueOf()
  const i = e(t) - e(s)
  return Math.floor(I.fromMillis(i).as('days'))
}
function Ym (s, t, e) {
  const i = [
    ['years', (l, c) => c.year - l.year],
    ['quarters', (l, c) => c.quarter - l.quarter + (c.year - l.year) * 4],
    ['months', (l, c) => c.month - l.month + (c.year - l.year) * 12],
    [
      'weeks',
      (l, c) => {
        const h = uc(l, c)
        return (h - (h % 7)) / 7
      }
    ],
    ['days', uc]
  ]
  const n = {}
  const r = s
  let o
  let a
  for (const [l, c] of i) {
    e.indexOf(l) >= 0 &&
            ((o = l),
            (n[l] = c(s, t)),
            (a = r.plus(n)),
            a > t
              ? (n[l]--,
                (s = r.plus(n)),
                s > t && ((a = s), n[l]--, (s = r.plus(n))))
              : (s = a))
  }
  return [s, n, a, o]
}
function dc (s, t, e, i) {
  let [n, r, o, a] = Ym(s, t, e)
  const l = t - n
  const c = e.filter(
    (u) => ['hours', 'minutes', 'seconds', 'milliseconds'].indexOf(u) >= 0
  )
  c.length === 0 &&
        (o < t && (o = n.plus({ [a]: 1 })),
        o !== n && (r[a] = (r[a] || 0) + l / (o - n)))
  const h = I.fromObject(r, i)
  return c.length > 0
    ? I.fromMillis(l, i)
      .shiftTo(...c)
      .plus(h)
    : h
}
const Zm = 'missing Intl.DateTimeFormat.formatToParts support'
function V (s, t = (e) => e) {
  return { regex: s, deser: ([e]) => t(kl(e)) }
}
const qm = String.fromCharCode(160)
const gc = `[ ${qm}]`
const pc = new RegExp(gc, 'g')
function Gm (s) {
  return s.replace(/\./g, '\\.?').replace(pc, gc)
}
function fc (s) {
  return s.replace(/\./g, '').replace(pc, ' ').toLowerCase()
}
function It (s, t) {
  return s === null
    ? null
    : {
        regex: RegExp(s.map(Gm).join('|')),
        deser: ([e]) => s.findIndex((i) => fc(e) === fc(i)) + t
      }
}
function mc (s, t) {
  return { regex: s, deser: ([, e, i]) => Se(e, i), groups: t }
}
function dn (s) {
  return { regex: s, deser: ([t]) => t }
}
function Xm (s) {
  return s.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
}
function Km (s, t) {
  const e = St(t)
  const i = St(t, '{2}')
  const n = St(t, '{3}')
  const r = St(t, '{4}')
  const o = St(t, '{6}')
  const a = St(t, '{1,2}')
  const l = St(t, '{1,3}')
  const c = St(t, '{1,6}')
  const h = St(t, '{1,9}')
  const u = St(t, '{2,4}')
  const d = St(t, '{4,6}')
  const f = (p) => ({
    regex: RegExp(Xm(p.val)),
    deser: ([y]) => y,
    literal: !0
  })
  const g = ((p) => {
    if (s.literal) return f(p)
    switch (p.val) {
      case 'G':
        return It(t.eras('short'), 0)
      case 'GG':
        return It(t.eras('long'), 0)
      case 'y':
        return V(c)
      case 'yy':
        return V(u, di)
      case 'yyyy':
        return V(r)
      case 'yyyyy':
        return V(d)
      case 'yyyyyy':
        return V(o)
      case 'M':
        return V(a)
      case 'MM':
        return V(i)
      case 'MMM':
        return It(t.months('short', !0), 1)
      case 'MMMM':
        return It(t.months('long', !0), 1)
      case 'L':
        return V(a)
      case 'LL':
        return V(i)
      case 'LLL':
        return It(t.months('short', !1), 1)
      case 'LLLL':
        return It(t.months('long', !1), 1)
      case 'd':
        return V(a)
      case 'dd':
        return V(i)
      case 'o':
        return V(l)
      case 'ooo':
        return V(n)
      case 'HH':
        return V(i)
      case 'H':
        return V(a)
      case 'hh':
        return V(i)
      case 'h':
        return V(a)
      case 'mm':
        return V(i)
      case 'm':
        return V(a)
      case 'q':
        return V(a)
      case 'qq':
        return V(i)
      case 's':
        return V(a)
      case 'ss':
        return V(i)
      case 'S':
        return V(l)
      case 'SSS':
        return V(n)
      case 'u':
        return dn(h)
      case 'uu':
        return dn(a)
      case 'uuu':
        return V(e)
      case 'a':
        return It(t.meridiems(), 0)
      case 'kkkk':
        return V(r)
      case 'kk':
        return V(u, di)
      case 'W':
        return V(a)
      case 'WW':
        return V(i)
      case 'E':
      case 'c':
        return V(e)
      case 'EEE':
        return It(t.weekdays('short', !1), 1)
      case 'EEEE':
        return It(t.weekdays('long', !1), 1)
      case 'ccc':
        return It(t.weekdays('short', !0), 1)
      case 'cccc':
        return It(t.weekdays('long', !0), 1)
      case 'Z':
      case 'ZZ':
        return mc(
          new RegExp(`([+-]${a.source})(?::(${i.source}))?`),
          2
        )
      case 'ZZZ':
        return mc(new RegExp(`([+-]${a.source})(${i.source})?`), 2)
      case 'z':
        return dn(/[a-z_+-/]{1,256}?/i)
      case ' ':
        return dn(/[^\S\n\r]/)
      default:
        return f(p)
    }
  })(s) || { invalidReason: Zm }
  return (g.token = s), g
}
const Jm = {
  year: { '2-digit': 'yy', numeric: 'yyyyy' },
  month: { numeric: 'M', '2-digit': 'MM', short: 'MMM', long: 'MMMM' },
  day: { numeric: 'd', '2-digit': 'dd' },
  weekday: { short: 'EEE', long: 'EEEE' },
  dayperiod: 'a',
  dayPeriod: 'a',
  hour12: { numeric: 'h', '2-digit': 'hh' },
  hour24: { numeric: 'H', '2-digit': 'HH' },
  minute: { numeric: 'm', '2-digit': 'mm' },
  second: { numeric: 's', '2-digit': 'ss' },
  timeZoneName: { long: 'ZZZZZ', short: 'ZZZ' }
}
function Qm (s, t, e) {
  const { type: i, value: n } = s
  if (i === 'literal') {
    const l = /^\s+$/.test(n)
    return { literal: !l, val: l ? ' ' : n }
  }
  const r = t[i]
  let o = i
  i === 'hour' &&
        (t.hour12 != null
          ? (o = t.hour12 ? 'hour12' : 'hour24')
          : t.hourCycle != null
            ? t.hourCycle === 'h11' || t.hourCycle === 'h12'
              ? (o = 'hour12')
              : (o = 'hour24')
            : (o = e.hour12 ? 'hour12' : 'hour24'))
  let a = Jm[o]
  if ((typeof a === 'object' && (a = a[r]), a)) {
    return { literal: !1, val: a }
  }
}
function tg (s) {
  return [
        `^${s.map((e) => e.regex).reduce((e, i) => `${e}(${i.source})`, '')}$`,
        s
  ]
}
function eg (s, t, e) {
  const i = s.match(t)
  if (i) {
    const n = {}
    let r = 1
    for (const o in e) {
      if (he(e, o)) {
        const a = e[o]
        const l = a.groups ? a.groups + 1 : 1
        !a.literal &&
                    a.token &&
                    (n[a.token.val[0]] = a.deser(i.slice(r, r + l))),
        (r += l)
      }
    }
    return [i, n]
  } else return [i, {}]
}
function sg (s) {
  const t = (r) => {
    switch (r) {
      case 'S':
        return 'millisecond'
      case 's':
        return 'second'
      case 'm':
        return 'minute'
      case 'h':
      case 'H':
        return 'hour'
      case 'd':
        return 'day'
      case 'o':
        return 'ordinal'
      case 'L':
      case 'M':
        return 'month'
      case 'y':
        return 'year'
      case 'E':
      case 'c':
        return 'weekday'
      case 'W':
        return 'weekNumber'
      case 'k':
        return 'weekYear'
      case 'q':
        return 'quarter'
      default:
        return null
    }
  }
  let e = null
  let i
  return (
    D(s.z) || (e = nt.create(s.z)),
    D(s.Z) || (e || (e = new G(s.Z)), (i = s.Z)),
    D(s.q) || (s.M = (s.q - 1) * 3 + 1),
    D(s.h) ||
            (s.h < 12 && s.a === 1
              ? (s.h += 12)
              : s.h === 12 && s.a === 0 && (s.h = 0)),
    s.G === 0 && s.y && (s.y = -s.y),
    D(s.u) || (s.S = ui(s.u)),
    [
      Object.keys(s).reduce((r, o) => {
        const a = t(o)
        return a && (r[a] = s[o]), r
      }, {}),
      e,
      i
    ]
  )
}
let ro = null
function ig () {
  return ro || (ro = T.fromMillis(1555555555555)), ro
}
function ng (s, t) {
  if (s.literal) return s
  const e = X.macroTokenToFormatOpts(s.val)
  const i = lo(e, t)
  return i == null || i.includes(void 0) ? s : i
}
function oo (s, t) {
  return Array.prototype.concat(...s.map((e) => ng(e, t)))
}
const gi = class {
  constructor (t, e) {
    if (
      ((this.locale = t),
      (this.format = e),
      (this.tokens = oo(X.parseFormat(e), t)),
      (this.units = this.tokens.map((i) => Km(i, t))),
      (this.disqualifyingUnit = this.units.find((i) => i.invalidReason)),
      !this.disqualifyingUnit)
    ) {
      const [i, n] = tg(this.units);
      (this.regex = RegExp(i, 'i')), (this.handlers = n)
    }
  }

  explainFromTokens (t) {
    if (this.isValid) {
      const [e, i] = eg(t, this.regex, this.handlers)
      const [n, r, o] = i ? sg(i) : [null, null, void 0]
      if (he(i, 'a') && he(i, 'H')) {
        throw new vt(
          "Can't include meridiem when specifying 24-hour format"
        )
      }
      return {
        input: t,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches: e,
        matches: i,
        result: n,
        zone: r,
        specificOffset: o
      }
    } else {
      return {
        input: t,
        tokens: this.tokens,
        invalidReason: this.invalidReason
      }
    }
  }

  get isValid () {
    return !this.disqualifyingUnit
  }

  get invalidReason () {
    return this.disqualifyingUnit
      ? this.disqualifyingUnit.invalidReason
      : null
  }
}
function ao (s, t, e) {
  return new gi(s, e).explainFromTokens(t)
}
function yc (s, t, e) {
  const {
    result: i,
    zone: n,
    specificOffset: r,
    invalidReason: o
  } = ao(s, t, e)
  return [i, n, r, o]
}
function lo (s, t) {
  if (!s) return null
  const i = X.create(t, s).dtFormatter(ig())
  const n = i.formatToParts()
  const r = i.resolvedOptions()
  return n.map((o) => Qm(o, s, r))
}
const co = 'Invalid DateTime'
const bc = 864e13
function pi (s) {
  return new rt('unsupported zone', `the zone "${s.name}" is not supported`)
}
function ho (s) {
  return s.weekData === null && (s.weekData = li(s.c)), s.weekData
}
function uo (s) {
  return (
    s.localWeekData === null &&
            (s.localWeekData = li(
              s.c,
              s.loc.getMinDaysInFirstWeek(),
              s.loc.getStartOfWeek()
            )),
    s.localWeekData
  )
}
function ve (s, t) {
  const e = {
    ts: s.ts,
    zone: s.zone,
    c: s.c,
    o: s.o,
    loc: s.loc,
    invalid: s.invalid
  }
  return new T({ ...e, ...t, old: e })
}
function Tc (s, t, e) {
  let i = s - t * 60 * 1e3
  const n = e.offset(i)
  if (t === n) return [i, t]
  i -= (n - t) * 60 * 1e3
  const r = e.offset(i)
  return n === r ? [i, n] : [s - Math.min(n, r) * 60 * 1e3, Math.max(n, r)]
}
function fn (s, t) {
  s += t * 60 * 1e3
  const e = new Date(s)
  return {
    year: e.getUTCFullYear(),
    month: e.getUTCMonth() + 1,
    day: e.getUTCDate(),
    hour: e.getUTCHours(),
    minute: e.getUTCMinutes(),
    second: e.getUTCSeconds(),
    millisecond: e.getUTCMilliseconds()
  }
}
function gn (s, t, e) {
  return Tc(es(s), t, e)
}
function xc (s, t) {
  const e = s.o
  const i = s.c.year + Math.trunc(t.years)
  const n = s.c.month + Math.trunc(t.months) + Math.trunc(t.quarters) * 3
  const r = {
    ...s.c,
    year: i,
    month: n,
    day:
            Math.min(s.c.day, rs(i, n)) +
            Math.trunc(t.days) +
            Math.trunc(t.weeks) * 7
  }
  const o = I.fromObject({
    years: t.years - Math.trunc(t.years),
    quarters: t.quarters - Math.trunc(t.quarters),
    months: t.months - Math.trunc(t.months),
    weeks: t.weeks - Math.trunc(t.weeks),
    days: t.days - Math.trunc(t.days),
    hours: t.hours,
    minutes: t.minutes,
    seconds: t.seconds,
    milliseconds: t.milliseconds
  }).as('milliseconds')
  const a = es(r)
  let [l, c] = Tc(a, e, s.zone)
  return o !== 0 && ((l += o), (c = s.zone.offset(l))), { ts: l, o: c }
}
function gs (s, t, e, i, n, r) {
  const { setZone: o, zone: a } = e
  if ((s && Object.keys(s).length !== 0) || t) {
    const l = t || a
    const c = T.fromObject(s, { ...e, zone: l, specificOffset: r })
    return o ? c : c.setZone(a)
  } else {
    return T.invalid(
      new rt('unparsable', `the input "${n}" can't be parsed as ${i}`)
    )
  }
}
function mn (s, t, e = !0) {
  return s.isValid
    ? X.create(P.create('en-US'), {
      allowZ: e,
      forceSimple: !0
    }).formatDateTimeFromString(s, t)
    : null
}
function fo (s, t) {
  const e = s.c.year > 9999 || s.c.year < 0
  let i = ''
  return (
    e && s.c.year >= 0 && (i += '+'),
    (i += q(s.c.year, e ? 6 : 4)),
    t
      ? ((i += '-'), (i += q(s.c.month)), (i += '-'), (i += q(s.c.day)))
      : ((i += q(s.c.month)), (i += q(s.c.day))),
    i
  )
}
function _c (s, t, e, i, n, r) {
  let o = q(s.c.hour)
  return (
    t
      ? ((o += ':'),
        (o += q(s.c.minute)),
        (s.c.millisecond !== 0 || s.c.second !== 0 || !e) && (o += ':'))
      : (o += q(s.c.minute)),
    (s.c.millisecond !== 0 || s.c.second !== 0 || !e) &&
            ((o += q(s.c.second)),
            (s.c.millisecond !== 0 || !i) &&
                ((o += '.'), (o += q(s.c.millisecond, 3)))),
    n &&
            (s.isOffsetFixed && s.offset === 0 && !r
              ? (o += 'Z')
              : s.o < 0
                ? ((o += '-'),
                  (o += q(Math.trunc(-s.o / 60))),
                  (o += ':'),
                  (o += q(Math.trunc(-s.o % 60))))
                : ((o += '+'),
                  (o += q(Math.trunc(s.o / 60))),
                  (o += ':'),
                  (o += q(Math.trunc(s.o % 60))))),
    r && (o += '[' + s.zone.ianaName + ']'),
    o
  )
}
const vc = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }
const rg = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}
const og = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }
const Oc = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond']
const ag = [
  'weekYear',
  'weekNumber',
  'weekday',
  'hour',
  'minute',
  'second',
  'millisecond'
]
const lg = ['year', 'ordinal', 'hour', 'minute', 'second', 'millisecond']
function cg (s) {
  const t = {
    year: 'year',
    years: 'year',
    month: 'month',
    months: 'month',
    day: 'day',
    days: 'day',
    hour: 'hour',
    hours: 'hour',
    minute: 'minute',
    minutes: 'minute',
    quarter: 'quarter',
    quarters: 'quarter',
    second: 'second',
    seconds: 'second',
    millisecond: 'millisecond',
    milliseconds: 'millisecond',
    weekday: 'weekday',
    weekdays: 'weekday',
    weeknumber: 'weekNumber',
    weeksnumber: 'weekNumber',
    weeknumbers: 'weekNumber',
    weekyear: 'weekYear',
    weekyears: 'weekYear',
    ordinal: 'ordinal'
  }[s.toLowerCase()]
  if (!t) throw new ts(s)
  return t
}
function wc (s) {
  switch (s.toLowerCase()) {
    case 'localweekday':
    case 'localweekdays':
      return 'localWeekday'
    case 'localweeknumber':
    case 'localweeknumbers':
      return 'localWeekNumber'
    case 'localweekyear':
    case 'localweekyears':
      return 'localWeekYear'
    default:
      return cg(s)
  }
}
function hg (s) {
  return (
    yn[s] || (pn === void 0 && (pn = z.now()), (yn[s] = s.offset(pn))),
    yn[s]
  )
}
function Sc (s, t) {
  const e = Et(t.zone, z.defaultZone)
  if (!e.isValid) return T.invalid(pi(e))
  const i = P.fromObject(t)
  let n
  let r
  if (D(s.year)) n = z.now()
  else {
    for (const l of Oc) D(s[l]) && (s[l] = vc[l])
    const o = Gr(s) || Xr(s)
    if (o) return T.invalid(o)
    const a = hg(e);
    [n, r] = gn(s, a, e)
  }
  return new T({ ts: n, zone: e, loc: i, o: r })
}
function kc (s, t, e) {
  const i = D(e.round) ? !0 : e.round
  const n = (o, a) => (
    (o = ss(o, i || e.calendary ? 0 : 2, !0)),
    t.loc.clone(e).relFormatter(e).format(o, a)
  )
  const r = (o) =>
    e.calendary
      ? t.hasSame(s, o)
        ? 0
        : t.startOf(o).diff(s.startOf(o), o).get(o)
      : t.diff(s, o).get(o)
  if (e.unit) return n(r(e.unit), e.unit)
  for (const o of e.units) {
    const a = r(o)
    if (Math.abs(a) >= 1) return n(a, o)
  }
  return n(s > t ? -0 : 0, e.units[e.units.length - 1])
}
function Mc (s) {
  let t = {}
  let e
  return (
    s.length > 0 && typeof s[s.length - 1] === 'object'
      ? ((t = s[s.length - 1]),
        (e = Array.from(s).slice(0, s.length - 1)))
      : (e = Array.from(s)),
    [t, e]
  )
}
let pn
var yn = {}
var T = class {
  constructor (t) {
    const e = t.zone || z.defaultZone
    let i =
            t.invalid ||
            (Number.isNaN(t.ts) ? new rt('invalid input') : null) ||
            (e.isValid ? null : pi(e))
    this.ts = D(t.ts) ? z.now() : t.ts
    let n = null
    let r = null
    if (!i) {
      if (t.old && t.old.ts === this.ts && t.old.zone.equals(e)) {
        [n, r] = [t.old.c, t.old.o]
      } else {
        const a = Ct(t.o) && !t.old ? t.o : e.offset(this.ts);
        (n = fn(this.ts, a)),
        (i = Number.isNaN(n.year) ? new rt('invalid input') : null),
        (n = i ? null : n),
        (r = i ? null : a)
      }
    }
    (this._zone = e),
    (this.loc = t.loc || P.create()),
    (this.invalid = i),
    (this.weekData = null),
    (this.localWeekData = null),
    (this.c = n),
    (this.o = r),
    (this.isLuxonDateTime = !0)
  }

  static now () {
    return new T({})
  }

  static local () {
    const [t, e] = Mc(arguments)
    const [i, n, r, o, a, l, c] = e
    return Sc(
      {
        year: i,
        month: n,
        day: r,
        hour: o,
        minute: a,
        second: l,
        millisecond: c
      },
      t
    )
  }

  static utc () {
    const [t, e] = Mc(arguments)
    const [i, n, r, o, a, l, c] = e
    return (
      (t.zone = G.utcInstance),
      Sc(
        {
          year: i,
          month: n,
          day: r,
          hour: o,
          minute: a,
          second: l,
          millisecond: c
        },
        t
      )
    )
  }

  static fromJSDate (t, e = {}) {
    const i = Vl(t) ? t.valueOf() : NaN
    if (Number.isNaN(i)) return T.invalid('invalid input')
    const n = Et(e.zone, z.defaultZone)
    return n.isValid
      ? new T({ ts: i, zone: n, loc: P.fromObject(e) })
      : T.invalid(pi(n))
  }

  static fromMillis (t, e = {}) {
    if (Ct(t)) {
      return t < -bc || t > bc
        ? T.invalid('Timestamp out of range')
        : new T({
          ts: t,
          zone: Et(e.zone, z.defaultZone),
          loc: P.fromObject(e)
        })
    }
    throw new J(
            `fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`
    )
  }

  static fromSeconds (t, e = {}) {
    if (Ct(t)) {
      return new T({
        ts: t * 1e3,
        zone: Et(e.zone, z.defaultZone),
        loc: P.fromObject(e)
      })
    }
    throw new J('fromSeconds requires a numerical input')
  }

  static fromObject (t, e = {}) {
    t = t || {}
    const i = Et(e.zone, z.defaultZone)
    if (!i.isValid) return T.invalid(pi(i))
    const n = P.fromObject(e)
    const r = os(t, wc)
    const { minDaysInFirstWeek: o, startOfWeek: a } = qr(r, n)
    const l = z.now()
    const c = D(e.specificOffset) ? i.offset(l) : e.specificOffset
    const h = !D(r.ordinal)
    const u = !D(r.year)
    const d = !D(r.month) || !D(r.day)
    const f = u || d
    const m = r.weekYear || r.weekNumber
    if ((f || h) && m) {
      throw new vt(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      )
    }
    if (d && h) throw new vt("Can't mix ordinal dates with month/day")
    const g = m || (r.weekday && !f)
    let p
    let y
    let b = fn(l, c)
    g
      ? ((p = ag), (y = rg), (b = li(b, o, a)))
      : h
        ? ((p = lg), (y = og), (b = un(b)))
        : ((p = Oc), (y = vc))
    let _ = !1
    for (const F of p) {
      const W = r[F]
      D(W) ? (_ ? (r[F] = y[F]) : (r[F] = b[F])) : (_ = !0)
    }
    const w = g ? Nl(r, o, a) : h ? Wl(r) : Gr(r)
    const x = w || Xr(r)
    if (x) return T.invalid(x)
    const S = g ? Yr(r, o, a) : h ? Zr(r) : r
    const [k, O] = gn(S, c, i)
    const v = new T({ ts: k, zone: i, o: O, loc: n })
    return r.weekday && f && t.weekday !== v.weekday
      ? T.invalid(
        'mismatched weekday',
                  `you can't specify both a weekday of ${r.weekday} and a date of ${v.toISO()}`
      )
      : v.isValid
        ? v
        : T.invalid(v.invalid)
  }

  static fromISO (t, e = {}) {
    const [i, n] = ec(t)
    return gs(i, n, e, 'ISO 8601', t)
  }

  static fromRFC2822 (t, e = {}) {
    const [i, n] = sc(t)
    return gs(i, n, e, 'RFC 2822', t)
  }

  static fromHTTP (t, e = {}) {
    const [i, n] = ic(t)
    return gs(i, n, e, 'HTTP', e)
  }

  static fromFormat (t, e, i = {}) {
    if (D(t) || D(e)) {
      throw new J('fromFormat requires an input string and a format')
    }
    const { locale: n = null, numberingSystem: r = null } = i
    const o = P.fromOpts({
      locale: n,
      numberingSystem: r,
      defaultToEN: !0
    })
    const [a, l, c, h] = yc(o, t, e)
    return h ? T.invalid(h) : gs(a, l, i, `format ${e}`, t, c)
  }

  static fromString (t, e, i = {}) {
    return T.fromFormat(t, e, i)
  }

  static fromSQL (t, e = {}) {
    const [i, n] = oc(t)
    return gs(i, n, e, 'SQL', t)
  }

  static invalid (t, e = null) {
    if (!t) {
      throw new J('need to specify a reason the DateTime is invalid')
    }
    const i = t instanceof rt ? t : new rt(t, e)
    if (z.throwOnInvalid) throw new Ji(i)
    return new T({ invalid: i })
  }

  static isDateTime (t) {
    return (t && t.isLuxonDateTime) || !1
  }

  static parseFormatForOpts (t, e = {}) {
    const i = lo(t, P.fromObject(e))
    return i ? i.map((n) => (n ? n.val : null)).join('') : null
  }

  static expandFormat (t, e = {}) {
    return oo(X.parseFormat(t), P.fromObject(e))
      .map((n) => n.val)
      .join('')
  }

  static resetCache () {
    (pn = void 0), (yn = {})
  }

  get (t) {
    return this[t]
  }

  get isValid () {
    return this.invalid === null
  }

  get invalidReason () {
    return this.invalid ? this.invalid.reason : null
  }

  get invalidExplanation () {
    return this.invalid ? this.invalid.explanation : null
  }

  get locale () {
    return this.isValid ? this.loc.locale : null
  }

  get numberingSystem () {
    return this.isValid ? this.loc.numberingSystem : null
  }

  get outputCalendar () {
    return this.isValid ? this.loc.outputCalendar : null
  }

  get zone () {
    return this._zone
  }

  get zoneName () {
    return this.isValid ? this.zone.name : null
  }

  get year () {
    return this.isValid ? this.c.year : NaN
  }

  get quarter () {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN
  }

  get month () {
    return this.isValid ? this.c.month : NaN
  }

  get day () {
    return this.isValid ? this.c.day : NaN
  }

  get hour () {
    return this.isValid ? this.c.hour : NaN
  }

  get minute () {
    return this.isValid ? this.c.minute : NaN
  }

  get second () {
    return this.isValid ? this.c.second : NaN
  }

  get millisecond () {
    return this.isValid ? this.c.millisecond : NaN
  }

  get weekYear () {
    return this.isValid ? ho(this).weekYear : NaN
  }

  get weekNumber () {
    return this.isValid ? ho(this).weekNumber : NaN
  }

  get weekday () {
    return this.isValid ? ho(this).weekday : NaN
  }

  get isWeekend () {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday)
  }

  get localWeekday () {
    return this.isValid ? uo(this).weekday : NaN
  }

  get localWeekNumber () {
    return this.isValid ? uo(this).weekNumber : NaN
  }

  get localWeekYear () {
    return this.isValid ? uo(this).weekYear : NaN
  }

  get ordinal () {
    return this.isValid ? un(this.c).ordinal : NaN
  }

  get monthShort () {
    return this.isValid
      ? Gt.months('short', { locObj: this.loc })[this.month - 1]
      : null
  }

  get monthLong () {
    return this.isValid
      ? Gt.months('long', { locObj: this.loc })[this.month - 1]
      : null
  }

  get weekdayShort () {
    return this.isValid
      ? Gt.weekdays('short', { locObj: this.loc })[this.weekday - 1]
      : null
  }

  get weekdayLong () {
    return this.isValid
      ? Gt.weekdays('long', { locObj: this.loc })[this.weekday - 1]
      : null
  }

  get offset () {
    return this.isValid ? +this.o : NaN
  }

  get offsetNameShort () {
    return this.isValid
      ? this.zone.offsetName(this.ts, {
        format: 'short',
        locale: this.locale
      })
      : null
  }

  get offsetNameLong () {
    return this.isValid
      ? this.zone.offsetName(this.ts, {
        format: 'long',
        locale: this.locale
      })
      : null
  }

  get isOffsetFixed () {
    return this.isValid ? this.zone.isUniversal : null
  }

  get isInDST () {
    return this.isOffsetFixed
      ? !1
      : this.offset > this.set({ month: 1, day: 1 }).offset ||
                  this.offset > this.set({ month: 5 }).offset
  }

  getPossibleOffsets () {
    if (!this.isValid || this.isOffsetFixed) return [this]
    const t = 864e5
    const e = 6e4
    const i = es(this.c)
    const n = this.zone.offset(i - t)
    const r = this.zone.offset(i + t)
    const o = this.zone.offset(i - n * e)
    const a = this.zone.offset(i - r * e)
    if (o === a) return [this]
    const l = i - o * e
    const c = i - a * e
    const h = fn(l, o)
    const u = fn(c, a)
    return h.hour === u.hour &&
            h.minute === u.minute &&
            h.second === u.second &&
            h.millisecond === u.millisecond
      ? [ve(this, { ts: l }), ve(this, { ts: c })]
      : [this]
  }

  get isInLeapYear () {
    return Me(this.year)
  }

  get daysInMonth () {
    return rs(this.year, this.month)
  }

  get daysInYear () {
    return this.isValid ? ce(this.year) : NaN
  }

  get weeksInWeekYear () {
    return this.isValid ? ke(this.weekYear) : NaN
  }

  get weeksInLocalWeekYear () {
    return this.isValid
      ? ke(
        this.localWeekYear,
        this.loc.getMinDaysInFirstWeek(),
        this.loc.getStartOfWeek()
      )
      : NaN
  }

  resolvedLocaleOptions (t = {}) {
    const {
      locale: e,
      numberingSystem: i,
      calendar: n
    } = X.create(this.loc.clone(t), t).resolvedOptions(this)
    return { locale: e, numberingSystem: i, outputCalendar: n }
  }

  toUTC (t = 0, e = {}) {
    return this.setZone(G.instance(t), e)
  }

  toLocal () {
    return this.setZone(z.defaultZone)
  }

  setZone (t, { keepLocalTime: e = !1, keepCalendarTime: i = !1 } = {}) {
    if (((t = Et(t, z.defaultZone)), t.equals(this.zone))) return this
    if (t.isValid) {
      let n = this.ts
      if (e || i) {
        const r = t.offset(this.ts)
        const o = this.toObject();
        [n] = gn(o, r, t)
      }
      return ve(this, { ts: n, zone: t })
    } else return T.invalid(pi(t))
  }

  reconfigure ({ locale: t, numberingSystem: e, outputCalendar: i } = {}) {
    const n = this.loc.clone({
      locale: t,
      numberingSystem: e,
      outputCalendar: i
    })
    return ve(this, { loc: n })
  }

  setLocale (t) {
    return this.reconfigure({ locale: t })
  }

  set (t) {
    if (!this.isValid) return this
    const e = os(t, wc)
    const { minDaysInFirstWeek: i, startOfWeek: n } = qr(e, this.loc)
    const r = !D(e.weekYear) || !D(e.weekNumber) || !D(e.weekday)
    const o = !D(e.ordinal)
    const a = !D(e.year)
    const l = !D(e.month) || !D(e.day)
    const c = a || l
    const h = e.weekYear || e.weekNumber
    if ((c || o) && h) {
      throw new vt(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      )
    }
    if (l && o) throw new vt("Can't mix ordinal dates with month/day")
    let u
    r
      ? (u = Yr({ ...li(this.c, i, n), ...e }, i, n))
      : D(e.ordinal)
        ? ((u = { ...this.toObject(), ...e }),
          D(e.day) && (u.day = Math.min(rs(u.year, u.month), u.day)))
        : (u = Zr({ ...un(this.c), ...e }))
    const [d, f] = gn(u, this.o, this.zone)
    return ve(this, { ts: d, o: f })
  }

  plus (t) {
    if (!this.isValid) return this
    const e = I.fromDurationLike(t)
    return ve(this, xc(this, e))
  }

  minus (t) {
    if (!this.isValid) return this
    const e = I.fromDurationLike(t).negate()
    return ve(this, xc(this, e))
  }

  startOf (t, { useLocaleWeeks: e = !1 } = {}) {
    if (!this.isValid) return this
    const i = {}
    const n = I.normalizeUnit(t)
    switch (n) {
      case 'years':
        i.month = 1
      case 'quarters':
      case 'months':
        i.day = 1
      case 'weeks':
      case 'days':
        i.hour = 0
      case 'hours':
        i.minute = 0
      case 'minutes':
        i.second = 0
      case 'seconds':
        i.millisecond = 0
        break
      case 'milliseconds':
        break
    }
    if (n === 'weeks') {
      if (e) {
        const r = this.loc.getStartOfWeek()
        const { weekday: o } = this
        o < r && (i.weekNumber = this.weekNumber - 1), (i.weekday = r)
      } else i.weekday = 1
    }
    if (n === 'quarters') {
      const r = Math.ceil(this.month / 3)
      i.month = (r - 1) * 3 + 1
    }
    return this.set(i)
  }

  endOf (t, e) {
    return this.isValid
      ? this.plus({ [t]: 1 })
        .startOf(t, e)
        .minus(1)
      : this
  }

  toFormat (t, e = {}) {
    return this.isValid
      ? X.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(
        this,
        t
      )
      : co
  }

  toLocaleString (t = ae, e = {}) {
    return this.isValid
      ? X.create(this.loc.clone(e), t).formatDateTime(this)
      : co
  }

  toLocaleParts (t = {}) {
    return this.isValid
      ? X.create(this.loc.clone(t), t).formatDateTimeParts(this)
      : []
  }

  toISO ({
    format: t = 'extended',
    suppressSeconds: e = !1,
    suppressMilliseconds: i = !1,
    includeOffset: n = !0,
    extendedZone: r = !1
  } = {}) {
    if (!this.isValid) return null
    const o = t === 'extended'
    let a = fo(this, o)
    return (a += 'T'), (a += _c(this, o, e, i, n, r)), a
  }

  toISODate ({ format: t = 'extended' } = {}) {
    return this.isValid ? fo(this, t === 'extended') : null
  }

  toISOWeekDate () {
    return mn(this, "kkkk-'W'WW-c")
  }

  toISOTime ({
    suppressMilliseconds: t = !1,
    suppressSeconds: e = !1,
    includeOffset: i = !0,
    includePrefix: n = !1,
    extendedZone: r = !1,
    format: o = 'extended'
  } = {}) {
    return this.isValid
      ? (n ? 'T' : '') + _c(this, o === 'extended', e, t, i, r)
      : null
  }

  toRFC2822 () {
    return mn(this, 'EEE, dd LLL yyyy HH:mm:ss ZZZ', !1)
  }

  toHTTP () {
    return mn(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'")
  }

  toSQLDate () {
    return this.isValid ? fo(this, !0) : null
  }

  toSQLTime ({
    includeOffset: t = !0,
    includeZone: e = !1,
    includeOffsetSpace: i = !0
  } = {}) {
    let n = 'HH:mm:ss.SSS'
    return (
      (e || t) && (i && (n += ' '), e ? (n += 'z') : t && (n += 'ZZ')),
      mn(this, n, !0)
    )
  }

  toSQL (t = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null
  }

  toString () {
    return this.isValid ? this.toISO() : co
  }

  [Symbol.for('nodejs.util.inspect.custom')] () {
    return this.isValid
      ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`
      : `DateTime { Invalid, reason: ${this.invalidReason} }`
  }

  valueOf () {
    return this.toMillis()
  }

  toMillis () {
    return this.isValid ? this.ts : NaN
  }

  toSeconds () {
    return this.isValid ? this.ts / 1e3 : NaN
  }

  toUnixInteger () {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN
  }

  toJSON () {
    return this.toISO()
  }

  toBSON () {
    return this.toJSDate()
  }

  toObject (t = {}) {
    if (!this.isValid) return {}
    const e = { ...this.c }
    return (
      t.includeConfig &&
                ((e.outputCalendar = this.outputCalendar),
                (e.numberingSystem = this.loc.numberingSystem),
                (e.locale = this.loc.locale)),
      e
    )
  }

  toJSDate () {
    return new Date(this.isValid ? this.ts : NaN)
  }

  diff (t, e = 'milliseconds', i = {}) {
    if (!this.isValid || !t.isValid) {
      return I.invalid('created by diffing an invalid DateTime')
    }
    const n = {
      locale: this.locale,
      numberingSystem: this.numberingSystem,
      ...i
    }
    const r = Hl(e).map(I.normalizeUnit)
    const o = t.valueOf() > this.valueOf()
    const a = o ? this : t
    const l = o ? t : this
    const c = dc(a, l, r, n)
    return o ? c.negate() : c
  }

  diffNow (t = 'milliseconds', e = {}) {
    return this.diff(T.now(), t, e)
  }

  until (t) {
    return this.isValid ? U.fromDateTimes(this, t) : this
  }

  hasSame (t, e, i) {
    if (!this.isValid) return !1
    const n = t.valueOf()
    const r = this.setZone(t.zone, { keepLocalTime: !0 })
    return r.startOf(e, i) <= n && n <= r.endOf(e, i)
  }

  equals (t) {
    return (
      this.isValid &&
            t.isValid &&
            this.valueOf() === t.valueOf() &&
            this.zone.equals(t.zone) &&
            this.loc.equals(t.loc)
    )
  }

  toRelative (t = {}) {
    if (!this.isValid) return null
    const e = t.base || T.fromObject({}, { zone: this.zone })
    const i = t.padding ? (this < e ? -t.padding : t.padding) : 0
    let n = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
    let r = t.unit
    return (
      Array.isArray(t.unit) && ((n = t.unit), (r = void 0)),
      kc(e, this.plus(i), {
        ...t,
        numeric: 'always',
        units: n,
        unit: r
      })
    )
  }

  toRelativeCalendar (t = {}) {
    return this.isValid
      ? kc(t.base || T.fromObject({}, { zone: this.zone }), this, {
        ...t,
        numeric: 'auto',
        units: ['years', 'months', 'days'],
        calendary: !0
      })
      : null
  }

  static min (...t) {
    if (!t.every(T.isDateTime)) {
      throw new J('min requires all arguments be DateTimes')
    }
    return Kr(t, (e) => e.valueOf(), Math.min)
  }

  static max (...t) {
    if (!t.every(T.isDateTime)) {
      throw new J('max requires all arguments be DateTimes')
    }
    return Kr(t, (e) => e.valueOf(), Math.max)
  }

  static fromFormatExplain (t, e, i = {}) {
    const { locale: n = null, numberingSystem: r = null } = i
    const o = P.fromOpts({
      locale: n,
      numberingSystem: r,
      defaultToEN: !0
    })
    return ao(o, t, e)
  }

  static fromStringExplain (t, e, i = {}) {
    return T.fromFormatExplain(t, e, i)
  }

  static buildFormatParser (t, e = {}) {
    const { locale: i = null, numberingSystem: n = null } = e
    const r = P.fromOpts({
      locale: i,
      numberingSystem: n,
      defaultToEN: !0
    })
    return new gi(r, t)
  }

  static fromFormatParser (t, e, i = {}) {
    if (D(t) || D(e)) {
      throw new J(
        'fromFormatParser requires an input string and a format parser'
      )
    }
    const { locale: n = null, numberingSystem: r = null } = i
    const o = P.fromOpts({
      locale: n,
      numberingSystem: r,
      defaultToEN: !0
    })
    if (!o.equals(e.locale)) {
      throw new J(
                `fromFormatParser called with a locale of ${o}, but the format parser was created for ${e.locale}`
      )
    }
    const {
      result: a,
      zone: l,
      specificOffset: c,
      invalidReason: h
    } = e.explainFromTokens(t)
    return h ? T.invalid(h) : gs(a, l, i, `format ${e.format}`, t, c)
  }

  static get DATE_SHORT () {
    return ae
  }

  static get DATE_MED () {
    return Hs
  }

  static get DATE_MED_WITH_WEEKDAY () {
    return Er
  }

  static get DATE_FULL () {
    return Bs
  }

  static get DATE_HUGE () {
    return $s
  }

  static get TIME_SIMPLE () {
    return js
  }

  static get TIME_WITH_SECONDS () {
    return Us
  }

  static get TIME_WITH_SHORT_OFFSET () {
    return Ys
  }

  static get TIME_WITH_LONG_OFFSET () {
    return Zs
  }

  static get TIME_24_SIMPLE () {
    return qs
  }

  static get TIME_24_WITH_SECONDS () {
    return Gs
  }

  static get TIME_24_WITH_SHORT_OFFSET () {
    return Xs
  }

  static get TIME_24_WITH_LONG_OFFSET () {
    return Ks
  }

  static get DATETIME_SHORT () {
    return Js
  }

  static get DATETIME_SHORT_WITH_SECONDS () {
    return Qs
  }

  static get DATETIME_MED () {
    return ti
  }

  static get DATETIME_MED_WITH_SECONDS () {
    return ei
  }

  static get DATETIME_MED_WITH_WEEKDAY () {
    return Cr
  }

  static get DATETIME_FULL () {
    return si
  }

  static get DATETIME_FULL_WITH_SECONDS () {
    return ii
  }

  static get DATETIME_HUGE () {
    return ni
  }

  static get DATETIME_HUGE_WITH_SECONDS () {
    return ri
  }
}
function ms (s) {
  if (T.isDateTime(s)) return s
  if (s && s.valueOf && Ct(s.valueOf())) return T.fromJSDate(s)
  if (s && typeof s === 'object') return T.fromObject(s)
  throw new J(`Unknown datetime argument: ${s}, of type ${typeof s}`)
}
const ug = {
  datetime: T.DATETIME_MED_WITH_SECONDS,
  millisecond: 'h:mm:ss.SSS a',
  second: T.TIME_WITH_SECONDS,
  minute: T.TIME_SIMPLE,
  hour: { hour: 'numeric' },
  day: { day: 'numeric', month: 'short' },
  week: 'DD',
  month: { month: 'short', year: 'numeric' },
  quarter: "'Q'q - yyyy",
  year: { year: 'numeric' }
}
Or._date.override({
  _id: 'luxon',
  _create: function (s) {
    return T.fromMillis(s, this.options)
  },
  init (s) {
    this.options.locale || (this.options.locale = s.locale)
  },
  formats: function () {
    return ug
  },
  parse: function (s, t) {
    const e = this.options
    const i = typeof s
    return s === null || i === 'undefined'
      ? null
      : (i === 'number'
          ? (s = this._create(s))
          : i === 'string'
            ? typeof t === 'string'
              ? (s = T.fromFormat(s, t, e))
              : (s = T.fromISO(s, e))
            : s instanceof Date
              ? (s = T.fromJSDate(s, e))
              : i === 'object' &&
                        !(s instanceof T) &&
                        (s = T.fromObject(s, e)),
        s.isValid ? s.valueOf() : null)
  },
  format: function (s, t) {
    const e = this._create(s)
    return typeof t === 'string' ? e.toFormat(t) : e.toLocaleString(t)
  },
  add: function (s, t, e) {
    const i = {}
    return (i[e] = t), this._create(s).plus(i).valueOf()
  },
  diff: function (s, t, e) {
    return this._create(s).diff(this._create(t)).as(e).valueOf()
  },
  startOf: function (s, t, e) {
    if (t === 'isoWeek') {
      e = Math.trunc(Math.min(Math.max(0, e), 6))
      const i = this._create(s)
      return i
        .minus({ days: (i.weekday - e + 7) % 7 })
        .startOf('day')
        .valueOf()
    }
    return t ? this._create(s).startOf(t).valueOf() : s
  },
  endOf: function (s, t) {
    return this._create(s).endOf(t).valueOf()
  }
})
function bn ({ cachedData: s, options: t, type: e }) {
  return {
    init: function () {
      this.initChart(),
      this.$wire.$on('updateChartData', ({ data: i }) => {
        (bn = this.getChart()), (bn.data = i), bn.update('resize')
      }),
      Alpine.effect(() => {
        Alpine.store('theme'),
        this.$nextTick(() => {
          this.getChart() &&
                                (this.getChart().destroy(), this.initChart())
        })
      }),
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          Alpine.store('theme') === 'system' &&
                            this.$nextTick(() => {
                              this.getChart().destroy(), this.initChart()
                            })
        })
    },
    initChart: function (i = null) {
      let o, a, l, c, h, u, d, f, m;
      (Wt.defaults.animation.duration = 0),
      (Wt.defaults.backgroundColor = getComputedStyle(
        this.$refs.backgroundColorElement
      ).color)
      const n = getComputedStyle(this.$refs.borderColorElement).color;
      (Wt.defaults.borderColor = n),
      (Wt.defaults.color = getComputedStyle(
        this.$refs.textColorElement
      ).color),
      (Wt.defaults.font.family = getComputedStyle(
        this.$el
      ).fontFamily),
      (Wt.defaults.plugins.legend.labels.boxWidth = 12),
      (Wt.defaults.plugins.legend.position = 'bottom')
      const r = getComputedStyle(this.$refs.gridColorElement).color
      return (
        t ?? (t = {}),
        t.borderWidth ?? (t.borderWidth = 2),
        t.pointBackgroundColor ?? (t.pointBackgroundColor = n),
        t.pointHitRadius ?? (t.pointHitRadius = 4),
        t.pointRadius ?? (t.pointRadius = 2),
        t.scales ?? (t.scales = {}),
        (o = t.scales).x ?? (o.x = {}),
        (a = t.scales.x).grid ?? (a.grid = {}),
        (l = t.scales.x.grid).color ?? (l.color = r),
        (c = t.scales.x.grid).display ?? (c.display = !1),
        (h = t.scales.x.grid).drawBorder ?? (h.drawBorder = !1),
        (u = t.scales).y ?? (u.y = {}),
        (d = t.scales.y).grid ?? (d.grid = {}),
        (f = t.scales.y.grid).color ?? (f.color = r),
        (m = t.scales.y.grid).drawBorder ?? (m.drawBorder = !1),
        new Wt(this.$refs.canvas, {
          type: e,
          data: i ?? s,
          options: t,
          plugins: window.filamentChartJsPlugins ?? []
        })
      )
    },
    getChart: function () {
      return Wt.getChart(this.$refs.canvas)
    }
  }
}
export { bn as default }
/*! Bundled license information:

chart.js/dist/chunks/helpers.segment.mjs:
  (*!
   * Chart.js v3.9.1
   * https://www.chartjs.org
   * (c) 2022 Chart.js Contributors
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.segment.mjs:
  (*!
   * @kurkle/color v0.2.1
   * https://github.com/kurkle/color#readme
   * (c) 2022 Jukka Kurkela
   * Released under the MIT License
   *)

chart.js/dist/chart.mjs:
  (*!
   * Chart.js v3.9.1
   * https://www.chartjs.org
   * (c) 2022 Chart.js Contributors
   * Released under the MIT License
   *)

chartjs-adapter-luxon/dist/chartjs-adapter-luxon.esm.js:
  (*!
   * chartjs-adapter-luxon v1.3.1
   * https://www.chartjs.org
   * (c) 2023 chartjs-adapter-luxon Contributors
   * Released under the MIT license
   *)
*/
