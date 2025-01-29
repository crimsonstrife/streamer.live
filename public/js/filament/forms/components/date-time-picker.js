const vi = Object.create
const fn = Object.defineProperty
const gi = Object.getOwnPropertyDescriptor
const Si = Object.getOwnPropertyNames
const bi = Object.getPrototypeOf
const ki = Object.prototype.hasOwnProperty
const k = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports)
const Hi = (n, t, s, i) => {
  if ((t && typeof t === 'object') || typeof t === 'function') {
    for (const e of Si(t)) {
      !ki.call(n, e) &&
                e !== s &&
                fn(n, e, {
                  get: () => t[e],
                  enumerable: !(i = gi(t, e)) || i.enumerable
                })
    }
  }
  return n
}
const de = (n, t, s) => (
  (s = n != null ? vi(bi(n)) : {}),
  Hi(
    t || !n || !n.__esModule
      ? fn(s, 'default', { value: n, enumerable: !0 })
      : s,
    n
  )
)
const bn = k((He, je) => {
  (function (n, t) {
    typeof He === 'object' && typeof je < 'u'
      ? (je.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_plugin_advancedFormat = t())
  })(He, function () {
    'use strict'
    return function (n, t) {
      const s = t.prototype
      const i = s.format
      s.format = function (e) {
        const r = this
        const a = this.$locale()
        if (!this.isValid()) return i.bind(this)(e)
        const u = this.$utils()
        const o = (e || 'YYYY-MM-DDTHH:mm:ssZ').replace(
          /\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,
          function (d) {
            switch (d) {
              case 'Q':
                return Math.ceil((r.$M + 1) / 3)
              case 'Do':
                return a.ordinal(r.$D)
              case 'gggg':
                return r.weekYear()
              case 'GGGG':
                return r.isoWeekYear()
              case 'wo':
                return a.ordinal(r.week(), 'W')
              case 'w':
              case 'ww':
                return u.s(r.week(), d === 'w' ? 1 : 2, '0')
              case 'W':
              case 'WW':
                return u.s(r.isoWeek(), d === 'W' ? 1 : 2, '0')
              case 'k':
              case 'kk':
                return u.s(
                  String(r.$H === 0 ? 24 : r.$H),
                  d === 'k' ? 1 : 2,
                  '0'
                )
              case 'X':
                return Math.floor(r.$d.getTime() / 1e3)
              case 'x':
                return r.$d.getTime()
              case 'z':
                return '[' + r.offsetName() + ']'
              case 'zzz':
                return '[' + r.offsetName('long') + ']'
              default:
                return d
            }
          }
        )
        return i.bind(this)(o)
      }
    }
  })
})
const kn = k((Te, we) => {
  (function (n, t) {
    typeof Te === 'object' && typeof we < 'u'
      ? (we.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_plugin_customParseFormat = t())
  })(Te, function () {
    'use strict'
    const n = {
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A'
    }
    const t =
            /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g
    const s = /\d/
    const i = /\d\d/
    const e = /\d\d?/
    const r = /\d*[^-_:/,()\s\d]+/
    let a = {}
    let u = function (m) {
      return (m = +m) + (m > 68 ? 1900 : 2e3)
    }
    const o = function (m) {
      return function (Y) {
        this[m] = +Y
      }
    }
    const d = [
      /[+-]\d\d:?(\d\d)?|Z/,
      function (m) {
        (this.zone || (this.zone = {})).offset = (function (Y) {
          if (!Y || Y === 'Z') return 0
          const L = Y.match(/([+-]|\d\d)/g)
          const D = 60 * L[1] + (+L[2] || 0)
          return D === 0 ? 0 : L[0] === '+' ? -D : D
        })(m)
      }
    ]
    const _ = function (m) {
      const Y = a[m]
      return Y && (Y.indexOf ? Y : Y.s.concat(Y.f))
    }
    const y = function (m, Y) {
      let L
      const D = a.meridiem
      if (D) {
        for (let w = 1; w <= 24; w += 1) {
          if (m.indexOf(D(w, 0, Y)) > -1) {
            L = w > 12
            break
          }
        }
      } else L = m === (Y ? 'pm' : 'PM')
      return L
    }
    const l = {
      A: [
        r,
        function (m) {
          this.afternoon = y(m, !1)
        }
      ],
      a: [
        r,
        function (m) {
          this.afternoon = y(m, !0)
        }
      ],
      Q: [
        s,
        function (m) {
          this.month = 3 * (m - 1) + 1
        }
      ],
      S: [
        s,
        function (m) {
          this.milliseconds = 100 * +m
        }
      ],
      SS: [
        i,
        function (m) {
          this.milliseconds = 10 * +m
        }
      ],
      SSS: [
        /\d{3}/,
        function (m) {
          this.milliseconds = +m
        }
      ],
      s: [e, o('seconds')],
      ss: [e, o('seconds')],
      m: [e, o('minutes')],
      mm: [e, o('minutes')],
      H: [e, o('hours')],
      h: [e, o('hours')],
      HH: [e, o('hours')],
      hh: [e, o('hours')],
      D: [e, o('day')],
      DD: [i, o('day')],
      Do: [
        r,
        function (m) {
          const Y = a.ordinal
          const L = m.match(/\d+/)
          if (((this.day = L[0]), Y)) {
            for (let D = 1; D <= 31; D += 1) {
              Y(D).replace(/\[|\]/g, '') === m && (this.day = D)
            }
          }
        }
      ],
      w: [e, o('week')],
      ww: [i, o('week')],
      M: [e, o('month')],
      MM: [i, o('month')],
      MMM: [
        r,
        function (m) {
          const Y = _('months')
          const L =
                        (
                          _('monthsShort') ||
                            Y.map(function (D) {
                              return D.slice(0, 3)
                            })
                        ).indexOf(m) + 1
          if (L < 1) throw new Error()
          this.month = L % 12 || L
        }
      ],
      MMMM: [
        r,
        function (m) {
          const Y = _('months').indexOf(m) + 1
          if (Y < 1) throw new Error()
          this.month = Y % 12 || Y
        }
      ],
      Y: [/[+-]?\d+/, o('year')],
      YY: [
        i,
        function (m) {
          this.year = u(m)
        }
      ],
      YYYY: [/\d{4}/, o('year')],
      Z: d,
      ZZ: d
    }
    function f (m) {
      let Y, L;
      (Y = m), (L = a && a.formats)
      for (
        var D = (m = Y.replace(
            /(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,
            function ($, H, W) {
              const U = W && W.toUpperCase()
              return (
                H ||
                                L[W] ||
                                n[W] ||
                                L[U].replace(
                                  /(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,
                                  function (v, h, c) {
                                    return h || c.slice(1)
                                  }
                                )
              )
            }
          )).match(t),
          w = D.length,
          g = 0;
        g < w;
        g += 1
      ) {
        const C = D[g]
        const A = l[C]
        const q = A && A[0]
        const x = A && A[1]
        D[g] = x ? { regex: q, parser: x } : C.replace(/^\[|\]$/g, '')
      }
      return function ($) {
        for (var H = {}, W = 0, U = 0; W < w; W += 1) {
          const v = D[W]
          if (typeof v === 'string') U += v.length
          else {
            const h = v.regex
            const c = v.parser
            const p = $.slice(U)
            const M = h.exec(p)[0]
            c.call(H, M), ($ = $.replace(M, ''))
          }
        }
        return (
          (function (S) {
            const b = S.afternoon
            if (b !== void 0) {
              const T = S.hours
              b
                ? T < 12 && (S.hours += 12)
                : T === 12 && (S.hours = 0),
              delete S.afternoon
            }
          })(H),
          H
        )
      }
    }
    return function (m, Y, L) {
      (L.p.customParseFormat = !0),
      m && m.parseTwoDigitYear && (u = m.parseTwoDigitYear)
      const D = Y.prototype
      const w = D.parse
      D.parse = function (g) {
        const C = g.date
        const A = g.utc
        const q = g.args
        this.$u = A
        const x = q[1]
        if (typeof x === 'string') {
          const $ = q[2] === !0
          const H = q[3] === !0
          const W = $ || H
          let U = q[2]
          H && (U = q[2]),
          (a = this.$locale()),
          !$ && U && (a = L.Ls[U]),
          (this.$d = (function (p, M, S, b) {
            try {
              if (['x', 'X'].indexOf(M) > -1) {
                return new Date((M === 'X' ? 1e3 : 1) * p)
              }
              const T = f(M)(p)
              const I = T.year
              const N = T.month
              const E = T.day
              const P = T.hours
              const B = T.minutes
              const Q = T.seconds
              const re = T.milliseconds
              const Z = T.zone
              const J = T.week
              const G = new Date()
              const X = E || (I || N ? 1 : G.getDate())
              const ee = I || G.getFullYear()
              let le = 0;
              (I && !N) ||
                                    (le = N > 0 ? N - 1 : G.getMonth())
              let me
              const pe = P || 0
              const De = B || 0
              const Le = Q || 0
              const ve = re || 0
              return Z
                ? new Date(
                  Date.UTC(
                    ee,
                    le,
                    X,
                    pe,
                    De,
                    Le,
                    ve + 60 * Z.offset * 1e3
                  )
                )
                : S
                  ? new Date(
                    Date.UTC(ee, le, X, pe, De, Le, ve)
                  )
                  : ((me = new Date(
                      ee,
                      le,
                      X,
                      pe,
                      De,
                      Le,
                      ve
                    )),
                    J && (me = b(me).week(J).toDate()),
                    me)
            } catch {
              return new Date('')
            }
          })(C, x, A, L)),
          this.init(),
          U && U !== !0 && (this.$L = this.locale(U).$L),
          W && C != this.format(x) && (this.$d = new Date('')),
          (a = {})
        } else if (x instanceof Array) {
          for (let v = x.length, h = 1; h <= v; h += 1) {
            q[1] = x[h - 1]
            const c = L.apply(this, q)
            if (c.isValid()) {
              (this.$d = c.$d), (this.$L = c.$L), this.init()
              break
            }
            h === v && (this.$d = new Date(''))
          }
        } else w.call(this, g)
      }
    }
  })
})
const Hn = k(($e, Ce) => {
  (function (n, t) {
    typeof $e === 'object' && typeof Ce < 'u'
      ? (Ce.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_plugin_localeData = t())
  })($e, function () {
    'use strict'
    return function (n, t, s) {
      const i = t.prototype
      const e = function (d) {
        return d && (d.indexOf ? d : d.s)
      }
      const r = function (d, _, y, l, f) {
        const m = d.name ? d : d.$locale()
        const Y = e(m[_])
        const L = e(m[y])
        const D =
                    Y ||
                    L.map(function (g) {
                      return g.slice(0, l)
                    })
        if (!f) return D
        const w = m.weekStart
        return D.map(function (g, C) {
          return D[(C + (w || 0)) % 7]
        })
      }
      const a = function () {
        return s.Ls[s.locale()]
      }
      const u = function (d, _) {
        return (
          d.formats[_] ||
                    (function (y) {
                      return y.replace(
                        /(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,
                        function (l, f, m) {
                          return f || m.slice(1)
                        }
                      )
                    })(d.formats[_.toUpperCase()])
        )
      }
      const o = function () {
        const d = this
        return {
          months: function (_) {
            return _ ? _.format('MMMM') : r(d, 'months')
          },
          monthsShort: function (_) {
            return _
              ? _.format('MMM')
              : r(d, 'monthsShort', 'months', 3)
          },
          firstDayOfWeek: function () {
            return d.$locale().weekStart || 0
          },
          weekdays: function (_) {
            return _ ? _.format('dddd') : r(d, 'weekdays')
          },
          weekdaysMin: function (_) {
            return _
              ? _.format('dd')
              : r(d, 'weekdaysMin', 'weekdays', 2)
          },
          weekdaysShort: function (_) {
            return _
              ? _.format('ddd')
              : r(d, 'weekdaysShort', 'weekdays', 3)
          },
          longDateFormat: function (_) {
            return u(d.$locale(), _)
          },
          meridiem: this.$locale().meridiem,
          ordinal: this.$locale().ordinal
        }
      };
      (i.localeData = function () {
        return o.bind(this)()
      }),
      (s.localeData = function () {
        const d = a()
        return {
          firstDayOfWeek: function () {
            return d.weekStart || 0
          },
          weekdays: function () {
            return s.weekdays()
          },
          weekdaysShort: function () {
            return s.weekdaysShort()
          },
          weekdaysMin: function () {
            return s.weekdaysMin()
          },
          months: function () {
            return s.months()
          },
          monthsShort: function () {
            return s.monthsShort()
          },
          longDateFormat: function (_) {
            return u(d, _)
          },
          meridiem: d.meridiem,
          ordinal: d.ordinal
        }
      }),
      (s.months = function () {
        return r(a(), 'months')
      }),
      (s.monthsShort = function () {
        return r(a(), 'monthsShort', 'months', 3)
      }),
      (s.weekdays = function (d) {
        return r(a(), 'weekdays', null, null, d)
      }),
      (s.weekdaysShort = function (d) {
        return r(a(), 'weekdaysShort', 'weekdays', 3, d)
      }),
      (s.weekdaysMin = function (d) {
        return r(a(), 'weekdaysMin', 'weekdays', 2, d)
      })
    }
  })
})
const jn = k((Oe, ze) => {
  (function (n, t) {
    typeof Oe === 'object' && typeof ze < 'u'
      ? (ze.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_plugin_timezone = t())
  })(Oe, function () {
    'use strict'
    const n = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }
    const t = {}
    return function (s, i, e) {
      let r
      const a = function (_, y, l) {
        l === void 0 && (l = {})
        const f = new Date(_)
        const m = (function (Y, L) {
          L === void 0 && (L = {})
          const D = L.timeZoneName || 'short'
          const w = Y + '|' + D
          let g = t[w]
          return (
            g ||
                            ((g = new Intl.DateTimeFormat('en-US', {
                              hour12: !1,
                              timeZone: Y,
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              timeZoneName: D
                            })),
                            (t[w] = g)),
            g
          )
        })(y, l)
        return m.formatToParts(f)
      }
      const u = function (_, y) {
        for (var l = a(_, y), f = [], m = 0; m < l.length; m += 1) {
          const Y = l[m]
          const L = Y.type
          const D = Y.value
          const w = n[L]
          w >= 0 && (f[w] = parseInt(D, 10))
        }
        const g = f[3]
        const C = g === 24 ? 0 : g
        const A =
                    f[0] +
                    '-' +
                    f[1] +
                    '-' +
                    f[2] +
                    ' ' +
                    C +
                    ':' +
                    f[4] +
                    ':' +
                    f[5] +
                    ':000'
        let q = +_
        return (e.utc(A).valueOf() - (q -= q % 1e3)) / 6e4
      }
      const o = i.prototype;
      (o.tz = function (_, y) {
        _ === void 0 && (_ = r)
        let l
        const f = this.utcOffset()
        const m = this.toDate()
        const Y = m.toLocaleString('en-US', { timeZone: _ })
        const L = Math.round((m - new Date(Y)) / 1e3 / 60)
        const D = 15 * -Math.round(m.getTimezoneOffset() / 15) - L
        if (!Number(D)) l = this.utcOffset(0, y)
        else if (
          ((l = e(Y, { locale: this.$L })
            .$set('millisecond', this.$ms)
            .utcOffset(D, !0)),
          y)
        ) {
          const w = l.utcOffset()
          l = l.add(f - w, 'minute')
        }
        return (l.$x.$timezone = _), l
      }),
      (o.offsetName = function (_) {
        const y = this.$x.$timezone || e.tz.guess()
        const l = a(this.valueOf(), y, { timeZoneName: _ }).find(
          function (f) {
            return f.type.toLowerCase() === 'timezonename'
          }
        )
        return l && l.value
      })
      const d = o.startOf;
      (o.startOf = function (_, y) {
        if (!this.$x || !this.$x.$timezone) return d.call(this, _, y)
        const l = e(this.format('YYYY-MM-DD HH:mm:ss:SSS'), {
          locale: this.$L
        })
        return d.call(l, _, y).tz(this.$x.$timezone, !0)
      }),
      (e.tz = function (_, y, l) {
        const f = l && y
        const m = l || y || r
        const Y = u(+e(), m)
        if (typeof _ !== 'string') return e(_).tz(m)
        const L = (function (C, A, q) {
          let x = C - 60 * A * 1e3
          const $ = u(x, q)
          if (A === $) return [x, A]
          const H = u((x -= 60 * ($ - A) * 1e3), q)
          return $ === H
            ? [x, $]
            : [C - 60 * Math.min($, H) * 1e3, Math.max($, H)]
        })(e.utc(_, f).valueOf(), Y, m)
        const D = L[0]
        const w = L[1]
        const g = e(D).utcOffset(w)
        return (g.$x.$timezone = m), g
      }),
      (e.tz.guess = function () {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
      }),
      (e.tz.setDefault = function (_) {
        r = _
      })
    }
  })
})
const Tn = k((Ae, Ie) => {
  (function (n, t) {
    typeof Ae === 'object' && typeof Ie < 'u'
      ? (Ie.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_plugin_utc = t())
  })(Ae, function () {
    'use strict'
    const n = 'minute'
    const t = /[+-]\d\d(?::?\d\d)?/g
    const s = /([+-]|\d\d)/g
    return function (i, e, r) {
      const a = e.prototype;
      (r.utc = function (f) {
        const m = { date: f, utc: !0, args: arguments }
        return new e(m)
      }),
      (a.utc = function (f) {
        const m = r(this.toDate(), { locale: this.$L, utc: !0 })
        return f ? m.add(this.utcOffset(), n) : m
      }),
      (a.local = function () {
        return r(this.toDate(), { locale: this.$L, utc: !1 })
      })
      const u = a.parse
      a.parse = function (f) {
        f.utc && (this.$u = !0),
        this.$utils().u(f.$offset) || (this.$offset = f.$offset),
        u.call(this, f)
      }
      const o = a.init
      a.init = function () {
        if (this.$u) {
          const f = this.$d;
          (this.$y = f.getUTCFullYear()),
          (this.$M = f.getUTCMonth()),
          (this.$D = f.getUTCDate()),
          (this.$W = f.getUTCDay()),
          (this.$H = f.getUTCHours()),
          (this.$m = f.getUTCMinutes()),
          (this.$s = f.getUTCSeconds()),
          (this.$ms = f.getUTCMilliseconds())
        } else o.call(this)
      }
      const d = a.utcOffset
      a.utcOffset = function (f, m) {
        const Y = this.$utils().u
        if (Y(f)) {
          return this.$u
            ? 0
            : Y(this.$offset)
              ? d.call(this)
              : this.$offset
        }
        if (
          typeof f === 'string' &&
                    ((f = (function (g) {
                      g === void 0 && (g = '')
                      const C = g.match(t)
                      if (!C) return null
                      const A = ('' + C[0]).match(s) || ['-', 0, 0]
                      const q = A[0]
                      const x = 60 * +A[1] + +A[2]
                      return x === 0 ? 0 : q === '+' ? x : -x
                    })(f)),
                    f === null)
        ) {
          return this
        }
        const L = Math.abs(f) <= 16 ? 60 * f : f
        let D = this
        if (m) return (D.$offset = L), (D.$u = f === 0), D
        if (f !== 0) {
          const w = this.$u
            ? this.toDate().getTimezoneOffset()
            : -1 * this.utcOffset();
          ((D = this.local().add(L + w, n)).$offset = L),
          (D.$x.$localOffset = w)
        } else D = this.utc()
        return D
      }
      const _ = a.format;
      (a.format = function (f) {
        const m = f || (this.$u ? 'YYYY-MM-DDTHH:mm:ss[Z]' : '')
        return _.call(this, m)
      }),
      (a.valueOf = function () {
        const f = this.$utils().u(this.$offset)
          ? 0
          : this.$offset +
                          (this.$x.$localOffset || this.$d.getTimezoneOffset())
        return this.$d.valueOf() - 6e4 * f
      }),
      (a.isUTC = function () {
        return !!this.$u
      }),
      (a.toISOString = function () {
        return this.toDate().toISOString()
      }),
      (a.toString = function () {
        return this.toDate().toUTCString()
      })
      const y = a.toDate
      a.toDate = function (f) {
        return f === 's' && this.$offset
          ? r(this.format('YYYY-MM-DD HH:mm:ss:SSS')).toDate()
          : y.call(this)
      }
      const l = a.diff
      a.diff = function (f, m, Y) {
        if (f && this.$u === f.$u) return l.call(this, f, m, Y)
        const L = this.local()
        const D = r(f).local()
        return l.call(L, D, m, Y)
      }
    }
  })
})
const j = k((qe, xe) => {
  (function (n, t) {
    typeof qe === 'object' && typeof xe < 'u'
      ? (xe.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((n = typeof globalThis < 'u' ? globalThis : n || self).dayjs =
                    t())
  })(qe, function () {
    'use strict'
    const n = 1e3
    const t = 6e4
    const s = 36e5
    const i = 'millisecond'
    const e = 'second'
    const r = 'minute'
    const a = 'hour'
    const u = 'day'
    const o = 'week'
    const d = 'month'
    const _ = 'quarter'
    const y = 'year'
    const l = 'date'
    const f = 'Invalid Date'
    const m =
            /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
    const Y =
            /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
    const L = {
      name: 'en',
      weekdays:
                'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                  '_'
                ),
      months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      ),
      ordinal: function (v) {
        const h = ['th', 'st', 'nd', 'rd']
        const c = v % 100
        return '[' + v + (h[(c - 20) % 10] || h[c] || h[0]) + ']'
      }
    }
    const D = function (v, h, c) {
      const p = String(v)
      return !p || p.length >= h
        ? v
        : '' + Array(h + 1 - p.length).join(c) + v
    }
    const w = {
      s: D,
      z: function (v) {
        const h = -v.utcOffset()
        const c = Math.abs(h)
        const p = Math.floor(c / 60)
        const M = c % 60
        return (h <= 0 ? '+' : '-') + D(p, 2, '0') + ':' + D(M, 2, '0')
      },
      m: function v (h, c) {
        if (h.date() < c.date()) return -v(c, h)
        const p = 12 * (c.year() - h.year()) + (c.month() - h.month())
        const M = h.clone().add(p, d)
        const S = c - M < 0
        const b = h.clone().add(p + (S ? -1 : 1), d)
        return +(-(p + (c - M) / (S ? M - b : b - M)) || 0)
      },
      a: function (v) {
        return v < 0 ? Math.ceil(v) || 0 : Math.floor(v)
      },
      p: function (v) {
        return (
          {
            M: d,
            y,
            w: o,
            d: u,
            D: l,
            h: a,
            m: r,
            s: e,
            ms: i,
            Q: _
          }[v] ||
                    String(v || '')
                      .toLowerCase()
                      .replace(/s$/, '')
        )
      },
      u: function (v) {
        return v === void 0
      }
    }
    let g = 'en'
    const C = {}
    C[g] = L
    const A = '$isDayjsObject'
    const q = function (v) {
      return v instanceof W || !(!v || !v[A])
    }
    const x = function v (h, c, p) {
      let M
      if (!h) return g
      if (typeof h === 'string') {
        const S = h.toLowerCase()
        C[S] && (M = S), c && ((C[S] = c), (M = S))
        const b = h.split('-')
        if (!M && b.length > 1) return v(b[0])
      } else {
        const T = h.name;
        (C[T] = h), (M = T)
      }
      return !p && M && (g = M), M || (!p && g)
    }
    const $ = function (v, h) {
      if (q(v)) return v.clone()
      const c = typeof h === 'object' ? h : {}
      return (c.date = v), (c.args = arguments), new W(c)
    }
    const H = w;
    (H.l = x),
    (H.i = q),
    (H.w = function (v, h) {
      return $(v, {
        locale: h.$L,
        utc: h.$u,
        x: h.$x,
        $offset: h.$offset
      })
    })
    var W = (function () {
      function v (c) {
        (this.$L = x(c.locale, null, !0)),
        this.parse(c),
        (this.$x = this.$x || c.x || {}),
        (this[A] = !0)
      }
      const h = v.prototype
      return (
        (h.parse = function (c) {
          (this.$d = (function (p) {
            const M = p.date
            const S = p.utc
            if (M === null) return new Date(NaN)
            if (H.u(M)) return new Date()
            if (M instanceof Date) return new Date(M)
            if (typeof M === 'string' && !/Z$/i.test(M)) {
              const b = M.match(m)
              if (b) {
                const T = b[2] - 1 || 0
                const I = (b[7] || '0').substring(0, 3)
                return S
                  ? new Date(
                    Date.UTC(
                      b[1],
                      T,
                      b[3] || 1,
                      b[4] || 0,
                      b[5] || 0,
                      b[6] || 0,
                      I
                    )
                  )
                  : new Date(
                    b[1],
                    T,
                    b[3] || 1,
                    b[4] || 0,
                    b[5] || 0,
                    b[6] || 0,
                    I
                  )
              }
            }
            return new Date(M)
          })(c)),
          this.init()
        }),
        (h.init = function () {
          const c = this.$d;
          (this.$y = c.getFullYear()),
          (this.$M = c.getMonth()),
          (this.$D = c.getDate()),
          (this.$W = c.getDay()),
          (this.$H = c.getHours()),
          (this.$m = c.getMinutes()),
          (this.$s = c.getSeconds()),
          (this.$ms = c.getMilliseconds())
        }),
        (h.$utils = function () {
          return H
        }),
        (h.isValid = function () {
          return this.$d.toString() !== f
        }),
        (h.isSame = function (c, p) {
          const M = $(c)
          return this.startOf(p) <= M && M <= this.endOf(p)
        }),
        (h.isAfter = function (c, p) {
          return $(c) < this.startOf(p)
        }),
        (h.isBefore = function (c, p) {
          return this.endOf(p) < $(c)
        }),
        (h.$g = function (c, p, M) {
          return H.u(c) ? this[p] : this.set(M, c)
        }),
        (h.unix = function () {
          return Math.floor(this.valueOf() / 1e3)
        }),
        (h.valueOf = function () {
          return this.$d.getTime()
        }),
        (h.startOf = function (c, p) {
          const M = this
          const S = !!H.u(p) || p
          const b = H.p(c)
          const T = function (Z, J) {
            const G = H.w(
              M.$u ? Date.UTC(M.$y, J, Z) : new Date(M.$y, J, Z),
              M
            )
            return S ? G : G.endOf(u)
          }
          const I = function (Z, J) {
            return H.w(
              M.toDate()[Z].apply(
                M.toDate('s'),
                (S ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(J)
              ),
              M
            )
          }
          const N = this.$W
          const E = this.$M
          const P = this.$D
          const B = 'set' + (this.$u ? 'UTC' : '')
          switch (b) {
            case y:
              return S ? T(1, 0) : T(31, 11)
            case d:
              return S ? T(1, E) : T(0, E + 1)
            case o:
              var Q = this.$locale().weekStart || 0
              var re = (N < Q ? N + 7 : N) - Q
              return T(S ? P - re : P + (6 - re), E)
            case u:
            case l:
              return I(B + 'Hours', 0)
            case a:
              return I(B + 'Minutes', 1)
            case r:
              return I(B + 'Seconds', 2)
            case e:
              return I(B + 'Milliseconds', 3)
            default:
              return this.clone()
          }
        }),
        (h.endOf = function (c) {
          return this.startOf(c, !1)
        }),
        (h.$set = function (c, p) {
          let M
          const S = H.p(c)
          const b = 'set' + (this.$u ? 'UTC' : '')
          const T = ((M = {}),
          (M[u] = b + 'Date'),
          (M[l] = b + 'Date'),
          (M[d] = b + 'Month'),
          (M[y] = b + 'FullYear'),
          (M[a] = b + 'Hours'),
          (M[r] = b + 'Minutes'),
          (M[e] = b + 'Seconds'),
          (M[i] = b + 'Milliseconds'),
          M)[S]
          const I = S === u ? this.$D + (p - this.$W) : p
          if (S === d || S === y) {
            const N = this.clone().set(l, 1)
            N.$d[T](I),
            N.init(),
            (this.$d = N.set(
              l,
              Math.min(this.$D, N.daysInMonth())
            ).$d)
          } else T && this.$d[T](I)
          return this.init(), this
        }),
        (h.set = function (c, p) {
          return this.clone().$set(c, p)
        }),
        (h.get = function (c) {
          return this[H.p(c)]()
        }),
        (h.add = function (c, p) {
          let M
          const S = this
          c = Number(c)
          const b = H.p(p)
          const T = function (E) {
            const P = $(S)
            return H.w(P.date(P.date() + Math.round(E * c)), S)
          }
          if (b === d) return this.set(d, this.$M + c)
          if (b === y) return this.set(y, this.$y + c)
          if (b === u) return T(1)
          if (b === o) return T(7)
          const I =
                        ((M = {}), (M[r] = t), (M[a] = s), (M[e] = n), M)[b] ||
                        1
          const N = this.$d.getTime() + c * I
          return H.w(N, this)
        }),
        (h.subtract = function (c, p) {
          return this.add(-1 * c, p)
        }),
        (h.format = function (c) {
          const p = this
          const M = this.$locale()
          if (!this.isValid()) return M.invalidDate || f
          const S = c || 'YYYY-MM-DDTHH:mm:ssZ'
          const b = H.z(this)
          const T = this.$H
          const I = this.$m
          const N = this.$M
          const E = M.weekdays
          const P = M.months
          const B = M.meridiem
          const Q = function (J, G, X, ee) {
            return (J && (J[G] || J(p, S))) || X[G].slice(0, ee)
          }
          const re = function (J) {
            return H.s(T % 12 || 12, J, '0')
          }
          const Z =
                        B ||
                        function (J, G, X) {
                          const ee = J < 12 ? 'AM' : 'PM'
                          return X ? ee.toLowerCase() : ee
                        }
          return S.replace(Y, function (J, G) {
            return (
              G ||
                            (function (X) {
                              switch (X) {
                                case 'YY':
                                  return String(p.$y).slice(-2)
                                case 'YYYY':
                                  return H.s(p.$y, 4, '0')
                                case 'M':
                                  return N + 1
                                case 'MM':
                                  return H.s(N + 1, 2, '0')
                                case 'MMM':
                                  return Q(M.monthsShort, N, P, 3)
                                case 'MMMM':
                                  return Q(P, N)
                                case 'D':
                                  return p.$D
                                case 'DD':
                                  return H.s(p.$D, 2, '0')
                                case 'd':
                                  return String(p.$W)
                                case 'dd':
                                  return Q(M.weekdaysMin, p.$W, E, 2)
                                case 'ddd':
                                  return Q(M.weekdaysShort, p.$W, E, 3)
                                case 'dddd':
                                  return E[p.$W]
                                case 'H':
                                  return String(T)
                                case 'HH':
                                  return H.s(T, 2, '0')
                                case 'h':
                                  return re(1)
                                case 'hh':
                                  return re(2)
                                case 'a':
                                  return Z(T, I, !0)
                                case 'A':
                                  return Z(T, I, !1)
                                case 'm':
                                  return String(I)
                                case 'mm':
                                  return H.s(I, 2, '0')
                                case 's':
                                  return String(p.$s)
                                case 'ss':
                                  return H.s(p.$s, 2, '0')
                                case 'SSS':
                                  return H.s(p.$ms, 3, '0')
                                case 'Z':
                                  return b
                              }
                              return null
                            })(J) ||
                            b.replace(':', '')
            )
          })
        }),
        (h.utcOffset = function () {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }),
        (h.diff = function (c, p, M) {
          let S
          const b = this
          const T = H.p(p)
          const I = $(c)
          const N = (I.utcOffset() - this.utcOffset()) * t
          const E = this - I
          const P = function () {
            return H.m(b, I)
          }
          switch (T) {
            case y:
              S = P() / 12
              break
            case d:
              S = P()
              break
            case _:
              S = P() / 3
              break
            case o:
              S = (E - N) / 6048e5
              break
            case u:
              S = (E - N) / 864e5
              break
            case a:
              S = E / s
              break
            case r:
              S = E / t
              break
            case e:
              S = E / n
              break
            default:
              S = E
          }
          return M ? S : H.a(S)
        }),
        (h.daysInMonth = function () {
          return this.endOf(d).$D
        }),
        (h.$locale = function () {
          return C[this.$L]
        }),
        (h.locale = function (c, p) {
          if (!c) return this.$L
          const M = this.clone()
          const S = x(c, p, !0)
          return S && (M.$L = S), M
        }),
        (h.clone = function () {
          return H.w(this.$d, this)
        }),
        (h.toDate = function () {
          return new Date(this.valueOf())
        }),
        (h.toJSON = function () {
          return this.isValid() ? this.toISOString() : null
        }),
        (h.toISOString = function () {
          return this.$d.toISOString()
        }),
        (h.toString = function () {
          return this.$d.toUTCString()
        }),
        v
      )
    })()
    const U = W.prototype
    return (
      ($.prototype = U),
      [
        ['$ms', i],
        ['$s', e],
        ['$m', r],
        ['$H', a],
        ['$W', u],
        ['$M', d],
        ['$y', y],
        ['$D', l]
      ].forEach(function (v) {
        U[v[1]] = function (h) {
          return this.$g(h, v[0], v[1])
        }
      }),
      ($.extend = function (v, h) {
        return v.$i || (v(h, W, $), (v.$i = !0)), $
      }),
      ($.locale = x),
      ($.isDayjs = q),
      ($.unix = function (v) {
        return $(1e3 * v)
      }),
      ($.en = C[g]),
      ($.Ls = C),
      ($.p = {}),
      $
    )
  })
})
const wn = k((Ne, Ee) => {
  (function (n, t) {
    typeof Ne === 'object' && typeof Ee < 'u'
      ? (Ee.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_ar = t(n.dayjs))
  })(Ne, function (n) {
    'use strict'
    function t (u) {
      return u && typeof u === 'object' && 'default' in u
        ? u
        : { default: u }
    }
    const s = t(n)
    const i =
            '\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631'.split(
              '_'
            )
    const e = {
      1: '\u0661',
      2: '\u0662',
      3: '\u0663',
      4: '\u0664',
      5: '\u0665',
      6: '\u0666',
      7: '\u0667',
      8: '\u0668',
      9: '\u0669',
      0: '\u0660'
    }
    const r = {
      '\u0661': '1',
      '\u0662': '2',
      '\u0663': '3',
      '\u0664': '4',
      '\u0665': '5',
      '\u0666': '6',
      '\u0667': '7',
      '\u0668': '8',
      '\u0669': '9',
      '\u0660': '0'
    }
    const a = {
      name: 'ar',
      weekdays:
                '\u0627\u0644\u0623\u062D\u062F_\u0627\u0644\u0625\u062B\u0646\u064A\u0646_\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062E\u0645\u064A\u0633_\u0627\u0644\u062C\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062A'.split(
                  '_'
                ),
      weekdaysShort:
                '\u0623\u062D\u062F_\u0625\u062B\u0646\u064A\u0646_\u062B\u0644\u0627\u062B\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062E\u0645\u064A\u0633_\u062C\u0645\u0639\u0629_\u0633\u0628\u062A'.split(
                  '_'
                ),
      weekdaysMin:
                '\u062D_\u0646_\u062B_\u0631_\u062E_\u062C_\u0633'.split('_'),
      months: i,
      monthsShort: i,
      weekStart: 6,
      meridiem: function (u) {
        return u > 12 ? '\u0645' : '\u0635'
      },
      relativeTime: {
        future: '\u0628\u0639\u062F %s',
        past: '\u0645\u0646\u0630 %s',
        s: '\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629',
        m: '\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629',
        mm: '%d \u062F\u0642\u0627\u0626\u0642',
        h: '\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629',
        hh: '%d \u0633\u0627\u0639\u0627\u062A',
        d: '\u064A\u0648\u0645 \u0648\u0627\u062D\u062F',
        dd: '%d \u0623\u064A\u0627\u0645',
        M: '\u0634\u0647\u0631 \u0648\u0627\u062D\u062F',
        MM: '%d \u0623\u0634\u0647\u0631',
        y: '\u0639\u0627\u0645 \u0648\u0627\u062D\u062F',
        yy: '%d \u0623\u0639\u0648\u0627\u0645'
      },
      preparse: function (u) {
        return u
          .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (o) {
            return r[o]
          })
          .replace(/،/g, ',')
      },
      postformat: function (u) {
        return u
          .replace(/\d/g, function (o) {
            return e[o]
          })
          .replace(/,/g, '\u060C')
      },
      ordinal: function (u) {
        return u
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'D/\u200FM/\u200FYYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
      }
    }
    return s.default.locale(a, null, !0), a
  })
})
const $n = k((Fe, Je) => {
  (function (n, t) {
    typeof Fe === 'object' && typeof Je < 'u'
      ? (Je.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_bs = t(n.dayjs))
  })(Fe, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'bs',
      weekdays:
                'nedjelja_ponedjeljak_utorak_srijeda_\u010Detvrtak_petak_subota'.split(
                  '_'
                ),
      months: 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split(
        '_'
      ),
      weekStart: 1,
      weekdaysShort: 'ned._pon._uto._sri._\u010Det._pet._sub.'.split('_'),
      monthsShort:
                'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split(
                  '_'
                ),
      weekdaysMin: 'ne_po_ut_sr_\u010De_pe_su'.split('_'),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Cn = k((We, Ue) => {
  (function (n, t) {
    typeof We === 'object' && typeof Ue < 'u'
      ? (Ue.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_ca = t(n.dayjs))
  })(We, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'ca',
      weekdays:
                'Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte'.split(
                  '_'
                ),
      weekdaysShort: 'Dg._Dl._Dt._Dc._Dj._Dv._Ds.'.split('_'),
      weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
      months: 'Gener_Febrer_Mar\xE7_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre'.split(
        '_'
      ),
      monthsShort:
                'Gen._Febr._Mar\xE7_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.'.split(
                  '_'
                ),
      weekStart: 1,
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM [de] YYYY',
        LLL: 'D MMMM [de] YYYY [a les] H:mm',
        LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm',
        ll: 'D MMM YYYY',
        lll: 'D MMM YYYY, H:mm',
        llll: 'ddd D MMM YYYY, H:mm'
      },
      relativeTime: {
        future: "d'aqu\xED %s",
        past: 'fa %s',
        s: 'uns segons',
        m: 'un minut',
        mm: '%d minuts',
        h: 'una hora',
        hh: '%d hores',
        d: 'un dia',
        dd: '%d dies',
        M: 'un mes',
        MM: '%d mesos',
        y: 'un any',
        yy: '%d anys'
      },
      ordinal: function (e) {
        return (
          '' +
                    e +
                    (e === 1 || e === 3
                      ? 'r'
                      : e === 2
                        ? 'n'
                        : e === 4
                          ? 't'
                          : '\xE8')
        )
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Pe = k((Ye, On) => {
  (function (n, t) {
    typeof Ye === 'object' && typeof On < 'u'
      ? t(Ye, j())
      : typeof define === 'function' && define.amd
        ? define(['exports', 'dayjs'], t)
        : t(
          ((n =
                        typeof globalThis < 'u'
                          ? globalThis
                          : n || self).dayjs_locale_ku = {}),
          n.dayjs
        )
  })(Ye, function (n, t) {
    'use strict'
    function s (o) {
      return o && typeof o === 'object' && 'default' in o
        ? o
        : { default: o }
    }
    const i = s(t)
    const e = {
      1: '\u0661',
      2: '\u0662',
      3: '\u0663',
      4: '\u0664',
      5: '\u0665',
      6: '\u0666',
      7: '\u0667',
      8: '\u0668',
      9: '\u0669',
      0: '\u0660'
    }
    const r = {
      '\u0661': '1',
      '\u0662': '2',
      '\u0663': '3',
      '\u0664': '4',
      '\u0665': '5',
      '\u0666': '6',
      '\u0667': '7',
      '\u0668': '8',
      '\u0669': '9',
      '\u0660': '0'
    }
    const a = [
      '\u06A9\u0627\u0646\u0648\u0648\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645',
      '\u0634\u0648\u0628\u0627\u062A',
      '\u0626\u0627\u062F\u0627\u0631',
      '\u0646\u06CC\u0633\u0627\u0646',
      '\u0626\u0627\u06CC\u0627\u0631',
      '\u062D\u0648\u0632\u06D5\u06CC\u0631\u0627\u0646',
      '\u062A\u06D5\u0645\u0645\u0648\u0648\u0632',
      '\u0626\u0627\u0628',
      '\u0626\u06D5\u06CC\u0644\u0648\u0648\u0644',
      '\u062A\u0634\u0631\u06CC\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645',
      '\u062A\u0634\u0631\u06CC\u0646\u06CC \u062F\u0648\u0648\u06D5\u0645',
      '\u06A9\u0627\u0646\u0648\u0648\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u0645'
    ]
    const u = {
      name: 'ku',
      months: a,
      monthsShort: a,
      weekdays:
                '\u06CC\u06D5\u06A9\u0634\u06D5\u0645\u0645\u06D5_\u062F\u0648\u0648\u0634\u06D5\u0645\u0645\u06D5_\u0633\u06CE\u0634\u06D5\u0645\u0645\u06D5_\u0686\u0648\u0627\u0631\u0634\u06D5\u0645\u0645\u06D5_\u067E\u06CE\u0646\u062C\u0634\u06D5\u0645\u0645\u06D5_\u0647\u06D5\u06CC\u0646\u06CC_\u0634\u06D5\u0645\u0645\u06D5'.split(
                  '_'
                ),
      weekdaysShort:
                '\u06CC\u06D5\u06A9\u0634\u06D5\u0645_\u062F\u0648\u0648\u0634\u06D5\u0645_\u0633\u06CE\u0634\u06D5\u0645_\u0686\u0648\u0627\u0631\u0634\u06D5\u0645_\u067E\u06CE\u0646\u062C\u0634\u06D5\u0645_\u0647\u06D5\u06CC\u0646\u06CC_\u0634\u06D5\u0645\u0645\u06D5'.split(
                  '_'
                ),
      weekStart: 6,
      weekdaysMin:
                '\u06CC_\u062F_\u0633_\u0686_\u067E_\u0647\u0640_\u0634'.split(
                  '_'
                ),
      preparse: function (o) {
        return o
          .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (d) {
            return r[d]
          })
          .replace(/،/g, ',')
      },
      postformat: function (o) {
        return o
          .replace(/\d/g, function (d) {
            return e[d]
          })
          .replace(/,/g, '\u060C')
      },
      ordinal: function (o) {
        return o
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
      },
      meridiem: function (o) {
        return o < 12 ? '\u067E.\u0646' : '\u062F.\u0646'
      },
      relativeTime: {
        future: '\u0644\u06D5 %s',
        past: '\u0644\u06D5\u0645\u06D5\u0648\u067E\u06CE\u0634 %s',
        s: '\u0686\u06D5\u0646\u062F \u0686\u0631\u06A9\u06D5\u06CC\u06D5\u06A9',
        m: '\u06CC\u06D5\u06A9 \u062E\u0648\u0644\u06D5\u06A9',
        mm: '%d \u062E\u0648\u0644\u06D5\u06A9',
        h: '\u06CC\u06D5\u06A9 \u06A9\u0627\u062A\u0698\u0645\u06CE\u0631',
        hh: '%d \u06A9\u0627\u062A\u0698\u0645\u06CE\u0631',
        d: '\u06CC\u06D5\u06A9 \u0695\u06C6\u0698',
        dd: '%d \u0695\u06C6\u0698',
        M: '\u06CC\u06D5\u06A9 \u0645\u0627\u0646\u06AF',
        MM: '%d \u0645\u0627\u0646\u06AF',
        y: '\u06CC\u06D5\u06A9 \u0633\u0627\u06B5',
        yy: '%d \u0633\u0627\u06B5'
      }
    }
    i.default.locale(u, null, !0),
    (n.default = u),
    (n.englishToArabicNumbersMap = e),
    Object.defineProperty(n, '__esModule', { value: !0 })
  })
})
const zn = k((Re, Ge) => {
  (function (n, t) {
    typeof Re === 'object' && typeof Ge < 'u'
      ? (Ge.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_cs = t(n.dayjs))
  })(Re, function (n) {
    'use strict'
    function t (a) {
      return a && typeof a === 'object' && 'default' in a
        ? a
        : { default: a }
    }
    const s = t(n)
    function i (a) {
      return a > 1 && a < 5 && ~~(a / 10) != 1
    }
    function e (a, u, o, d) {
      const _ = a + ' '
      switch (o) {
        case 's':
          return u || d ? 'p\xE1r sekund' : 'p\xE1r sekundami'
        case 'm':
          return u ? 'minuta' : d ? 'minutu' : 'minutou'
        case 'mm':
          return u || d
            ? _ + (i(a) ? 'minuty' : 'minut')
            : _ + 'minutami'
        case 'h':
          return u ? 'hodina' : d ? 'hodinu' : 'hodinou'
        case 'hh':
          return u || d
            ? _ + (i(a) ? 'hodiny' : 'hodin')
            : _ + 'hodinami'
        case 'd':
          return u || d ? 'den' : 'dnem'
        case 'dd':
          return u || d ? _ + (i(a) ? 'dny' : 'dn\xED') : _ + 'dny'
        case 'M':
          return u || d ? 'm\u011Bs\xEDc' : 'm\u011Bs\xEDcem'
        case 'MM':
          return u || d
            ? _ + (i(a) ? 'm\u011Bs\xEDce' : 'm\u011Bs\xEDc\u016F')
            : _ + 'm\u011Bs\xEDci'
        case 'y':
          return u || d ? 'rok' : 'rokem'
        case 'yy':
          return u || d ? _ + (i(a) ? 'roky' : 'let') : _ + 'lety'
      }
    }
    const r = {
      name: 'cs',
      weekdays:
                'ned\u011Ble_pond\u011Bl\xED_\xFAter\xFD_st\u0159eda_\u010Dtvrtek_p\xE1tek_sobota'.split(
                  '_'
                ),
      weekdaysShort: 'ne_po_\xFAt_st_\u010Dt_p\xE1_so'.split('_'),
      weekdaysMin: 'ne_po_\xFAt_st_\u010Dt_p\xE1_so'.split('_'),
      months: 'leden_\xFAnor_b\u0159ezen_duben_kv\u011Bten_\u010Derven_\u010Dervenec_srpen_z\xE1\u0159\xED_\u0159\xEDjen_listopad_prosinec'.split(
        '_'
      ),
      monthsShort:
                'led_\xFAno_b\u0159e_dub_kv\u011B_\u010Dvn_\u010Dvc_srp_z\xE1\u0159_\u0159\xEDj_lis_pro'.split(
                  '_'
                ),
      weekStart: 1,
      yearStart: 4,
      ordinal: function (a) {
        return a + '.'
      },
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd D. MMMM YYYY H:mm',
        l: 'D. M. YYYY'
      },
      relativeTime: {
        future: 'za %s',
        past: 'p\u0159ed %s',
        s: e,
        m: e,
        mm: e,
        h: e,
        hh: e,
        d: e,
        dd: e,
        M: e,
        MM: e,
        y: e,
        yy: e
      }
    }
    return s.default.locale(r, null, !0), r
  })
})
const An = k((Ze, Ve) => {
  (function (n, t) {
    typeof Ze === 'object' && typeof Ve < 'u'
      ? (Ve.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_cy = t(n.dayjs))
  })(Ze, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'cy',
      weekdays:
                'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split(
                  '_'
                ),
      months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split(
        '_'
      ),
      weekStart: 1,
      weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
      monthsShort:
                'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
      weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: 'mewn %s',
        past: '%s yn \xF4l',
        s: 'ychydig eiliadau',
        m: 'munud',
        mm: '%d munud',
        h: 'awr',
        hh: '%d awr',
        d: 'diwrnod',
        dd: '%d diwrnod',
        M: 'mis',
        MM: '%d mis',
        y: 'blwyddyn',
        yy: '%d flynedd'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const In = k((Ke, Qe) => {
  (function (n, t) {
    typeof Ke === 'object' && typeof Qe < 'u'
      ? (Qe.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_da = t(n.dayjs))
  })(Ke, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'da',
      weekdays:
                's\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag'.split(
                  '_'
                ),
      weekdaysShort: 's\xF8n._man._tirs._ons._tors._fre._l\xF8r.'.split(
        '_'
      ),
      weekdaysMin: 's\xF8._ma._ti._on._to._fr._l\xF8.'.split('_'),
      months: 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split(
        '_'
      ),
      monthsShort:
                'jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.'.split(
                  '_'
                ),
      weekStart: 1,
      yearStart: 4,
      ordinal: function (e) {
        return e + '.'
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
      },
      relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'f\xE5 sekunder',
        m: 'et minut',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dage',
        M: 'en m\xE5ned',
        MM: '%d m\xE5neder',
        y: 'et \xE5r',
        yy: '%d \xE5r'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const qn = k((Xe, Be) => {
  (function (n, t) {
    typeof Xe === 'object' && typeof Be < 'u'
      ? (Be.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_de = t(n.dayjs))
  })(Xe, function (n) {
    'use strict'
    function t (a) {
      return a && typeof a === 'object' && 'default' in a
        ? a
        : { default: a }
    }
    const s = t(n)
    const i = {
      s: 'ein paar Sekunden',
      m: ['eine Minute', 'einer Minute'],
      mm: '%d Minuten',
      h: ['eine Stunde', 'einer Stunde'],
      hh: '%d Stunden',
      d: ['ein Tag', 'einem Tag'],
      dd: ['%d Tage', '%d Tagen'],
      M: ['ein Monat', 'einem Monat'],
      MM: ['%d Monate', '%d Monaten'],
      y: ['ein Jahr', 'einem Jahr'],
      yy: ['%d Jahre', '%d Jahren']
    }
    function e (a, u, o) {
      let d = i[o]
      return Array.isArray(d) && (d = d[u ? 0 : 1]), d.replace('%d', a)
    }
    const r = {
      name: 'de',
      weekdays:
                'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split(
                  '_'
                ),
      weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
      weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
      months: 'Januar_Februar_M\xE4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
        '_'
      ),
      monthsShort:
                'Jan._Feb._M\xE4rz_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split(
                  '_'
                ),
      ordinal: function (a) {
        return a + '.'
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LTS: 'HH:mm:ss',
        LT: 'HH:mm',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd, D. MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: 'in %s',
        past: 'vor %s',
        s: e,
        m: e,
        mm: e,
        h: e,
        hh: e,
        d: e,
        dd: e,
        M: e,
        MM: e,
        y: e,
        yy: e
      }
    }
    return s.default.locale(r, null, !0), r
  })
})
const xn = k((et, tt) => {
  (function (n, t) {
    typeof et === 'object' && typeof tt < 'u'
      ? (tt.exports = t())
      : typeof define === 'function' && define.amd
        ? define(t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_en = t())
  })(et, function () {
    'use strict'
    return {
      name: 'en',
      weekdays:
                'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                  '_'
                ),
      months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      ),
      ordinal: function (n) {
        const t = ['th', 'st', 'nd', 'rd']
        const s = n % 100
        return '[' + n + (t[(s - 20) % 10] || t[s] || t[0]) + ']'
      }
    }
  })
})
const Nn = k((nt, it) => {
  (function (n, t) {
    typeof nt === 'object' && typeof it < 'u'
      ? (it.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_es = t(n.dayjs))
  })(nt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'es',
      monthsShort:
                'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
      weekdays:
                'domingo_lunes_martes_mi\xE9rcoles_jueves_viernes_s\xE1bado'.split(
                  '_'
                ),
      weekdaysShort: 'dom._lun._mar._mi\xE9._jue._vie._s\xE1b.'.split(
        '_'
      ),
      weekdaysMin: 'do_lu_ma_mi_ju_vi_s\xE1'.split('_'),
      months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
        '_'
      ),
      weekStart: 1,
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY H:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
      },
      relativeTime: {
        future: 'en %s',
        past: 'hace %s',
        s: 'unos segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'una hora',
        hh: '%d horas',
        d: 'un d\xEDa',
        dd: '%d d\xEDas',
        M: 'un mes',
        MM: '%d meses',
        y: 'un a\xF1o',
        yy: '%d a\xF1os'
      },
      ordinal: function (e) {
        return e + '\xBA'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const En = k((st, rt) => {
  (function (n, t) {
    typeof st === 'object' && typeof rt < 'u'
      ? (rt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_et = t(n.dayjs))
  })(st, function (n) {
    'use strict'
    function t (r) {
      return r && typeof r === 'object' && 'default' in r
        ? r
        : { default: r }
    }
    const s = t(n)
    function i (r, a, u, o) {
      const d = {
        s: ['m\xF5ne sekundi', 'm\xF5ni sekund', 'paar sekundit'],
        m: ['\xFChe minuti', '\xFCks minut'],
        mm: ['%d minuti', '%d minutit'],
        h: ['\xFChe tunni', 'tund aega', '\xFCks tund'],
        hh: ['%d tunni', '%d tundi'],
        d: ['\xFChe p\xE4eva', '\xFCks p\xE4ev'],
        M: ['kuu aja', 'kuu aega', '\xFCks kuu'],
        MM: ['%d kuu', '%d kuud'],
        y: ['\xFChe aasta', 'aasta', '\xFCks aasta'],
        yy: ['%d aasta', '%d aastat']
      }
      return a
        ? (d[u][2] ? d[u][2] : d[u][1]).replace('%d', r)
        : (o ? d[u][0] : d[u][1]).replace('%d', r)
    }
    const e = {
      name: 'et',
      weekdays:
                'p\xFChap\xE4ev_esmasp\xE4ev_teisip\xE4ev_kolmap\xE4ev_neljap\xE4ev_reede_laup\xE4ev'.split(
                  '_'
                ),
      weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
      weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
      months: 'jaanuar_veebruar_m\xE4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split(
        '_'
      ),
      monthsShort:
                'jaan_veebr_m\xE4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split(
                  '_'
                ),
      ordinal: function (r) {
        return r + '.'
      },
      weekStart: 1,
      relativeTime: {
        future: '%s p\xE4rast',
        past: '%s tagasi',
        s: i,
        m: i,
        mm: i,
        h: i,
        hh: i,
        d: i,
        dd: '%d p\xE4eva',
        M: i,
        MM: i,
        y: i,
        yy: i
      },
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY H:mm',
        LLLL: 'dddd, D. MMMM YYYY H:mm'
      }
    }
    return s.default.locale(e, null, !0), e
  })
})
const Fn = k((at, ut) => {
  (function (n, t) {
    typeof at === 'object' && typeof ut < 'u'
      ? (ut.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_fa = t(n.dayjs))
  })(at, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'fa',
      weekdays:
                '\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647'.split(
                  '_'
                ),
      weekdaysShort:
                '\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647'.split(
                  '_'
                ),
      weekdaysMin:
                '\u06CC_\u062F_\u0633_\u0686_\u067E_\u062C_\u0634'.split('_'),
      weekStart: 6,
      months: '\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631'.split(
        '_'
      ),
      monthsShort:
                '\u0698\u0627\u0646\u0648\u06CC\u0647_\u0641\u0648\u0631\u06CC\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06CC\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06CC\u0647_\u0627\u0648\u062A_\u0633\u067E\u062A\u0627\u0645\u0628\u0631_\u0627\u06A9\u062A\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062F\u0633\u0627\u0645\u0628\u0631'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: '\u062F\u0631 %s',
        past: '%s \u067E\u06CC\u0634',
        s: '\u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647',
        m: '\u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647',
        mm: '%d \u062F\u0642\u06CC\u0642\u0647',
        h: '\u06CC\u06A9 \u0633\u0627\u0639\u062A',
        hh: '%d \u0633\u0627\u0639\u062A',
        d: '\u06CC\u06A9 \u0631\u0648\u0632',
        dd: '%d \u0631\u0648\u0632',
        M: '\u06CC\u06A9 \u0645\u0627\u0647',
        MM: '%d \u0645\u0627\u0647',
        y: '\u06CC\u06A9 \u0633\u0627\u0644',
        yy: '%d \u0633\u0627\u0644'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Jn = k((ot, dt) => {
  (function (n, t) {
    typeof ot === 'object' && typeof dt < 'u'
      ? (dt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_fi = t(n.dayjs))
  })(ot, function (n) {
    'use strict'
    function t (r) {
      return r && typeof r === 'object' && 'default' in r
        ? r
        : { default: r }
    }
    const s = t(n)
    function i (r, a, u, o) {
      const d = {
        s: 'muutama sekunti',
        m: 'minuutti',
        mm: '%d minuuttia',
        h: 'tunti',
        hh: '%d tuntia',
        d: 'p\xE4iv\xE4',
        dd: '%d p\xE4iv\xE4\xE4',
        M: 'kuukausi',
        MM: '%d kuukautta',
        y: 'vuosi',
        yy: '%d vuotta',
        numbers:
                    'nolla_yksi_kaksi_kolme_nelj\xE4_viisi_kuusi_seitsem\xE4n_kahdeksan_yhdeks\xE4n'.split(
                      '_'
                    )
      }
      const _ = {
        s: 'muutaman sekunnin',
        m: 'minuutin',
        mm: '%d minuutin',
        h: 'tunnin',
        hh: '%d tunnin',
        d: 'p\xE4iv\xE4n',
        dd: '%d p\xE4iv\xE4n',
        M: 'kuukauden',
        MM: '%d kuukauden',
        y: 'vuoden',
        yy: '%d vuoden',
        numbers:
                    'nollan_yhden_kahden_kolmen_nelj\xE4n_viiden_kuuden_seitsem\xE4n_kahdeksan_yhdeks\xE4n'.split(
                      '_'
                    )
      }
      const y = o && !a ? _ : d
      const l = y[u]
      return r < 10 ? l.replace('%d', y.numbers[r]) : l.replace('%d', r)
    }
    const e = {
      name: 'fi',
      weekdays:
                'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split(
                  '_'
                ),
      weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
      weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
      months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xE4kuu_hein\xE4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split(
        '_'
      ),
      monthsShort:
                'tammi_helmi_maalis_huhti_touko_kes\xE4_hein\xE4_elo_syys_loka_marras_joulu'.split(
                  '_'
                ),
      ordinal: function (r) {
        return r + '.'
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: '%s p\xE4\xE4st\xE4',
        past: '%s sitten',
        s: i,
        m: i,
        mm: i,
        h: i,
        hh: i,
        d: i,
        dd: i,
        M: i,
        MM: i,
        y: i,
        yy: i
      },
      formats: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM[ta] YYYY',
        LLL: 'D. MMMM[ta] YYYY, [klo] HH.mm',
        LLLL: 'dddd, D. MMMM[ta] YYYY, [klo] HH.mm',
        l: 'D.M.YYYY',
        ll: 'D. MMM YYYY',
        lll: 'D. MMM YYYY, [klo] HH.mm',
        llll: 'ddd, D. MMM YYYY, [klo] HH.mm'
      }
    }
    return s.default.locale(e, null, !0), e
  })
})
const Wn = k((_t, ft) => {
  (function (n, t) {
    typeof _t === 'object' && typeof ft < 'u'
      ? (ft.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_fr = t(n.dayjs))
  })(_t, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'fr',
      weekdays:
                'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split(
                  '_'
                ),
      weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
      weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
      months: 'janvier_f\xE9vrier_mars_avril_mai_juin_juillet_ao\xFBt_septembre_octobre_novembre_d\xE9cembre'.split(
        '_'
      ),
      monthsShort:
                'janv._f\xE9vr._mars_avr._mai_juin_juil._ao\xFBt_sept._oct._nov._d\xE9c.'.split(
                  '_'
                ),
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
      },
      ordinal: function (e) {
        return '' + e + (e === 1 ? 'er' : '')
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Un = k((lt, mt) => {
  (function (n, t) {
    typeof lt === 'object' && typeof mt < 'u'
      ? (mt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_hi = t(n.dayjs))
  })(lt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'hi',
      weekdays:
                '\u0930\u0935\u093F\u0935\u093E\u0930_\u0938\u094B\u092E\u0935\u093E\u0930_\u092E\u0902\u0917\u0932\u0935\u093E\u0930_\u092C\u0941\u0927\u0935\u093E\u0930_\u0917\u0941\u0930\u0942\u0935\u093E\u0930_\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930_\u0936\u0928\u093F\u0935\u093E\u0930'.split(
                  '_'
                ),
      months: '\u091C\u0928\u0935\u0930\u0940_\u092B\u093C\u0930\u0935\u0930\u0940_\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948\u0932_\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932\u093E\u0908_\u0905\u0917\u0938\u094D\u0924_\u0938\u093F\u0924\u092E\u094D\u092C\u0930_\u0905\u0915\u094D\u091F\u0942\u092C\u0930_\u0928\u0935\u092E\u094D\u092C\u0930_\u0926\u093F\u0938\u092E\u094D\u092C\u0930'.split(
        '_'
      ),
      weekdaysShort:
                '\u0930\u0935\u093F_\u0938\u094B\u092E_\u092E\u0902\u0917\u0932_\u092C\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094D\u0930_\u0936\u0928\u093F'.split(
                  '_'
                ),
      monthsShort:
                '\u091C\u0928._\u092B\u093C\u0930._\u092E\u093E\u0930\u094D\u091A_\u0905\u092A\u094D\u0930\u0948._\u092E\u0908_\u091C\u0942\u0928_\u091C\u0941\u0932._\u0905\u0917._\u0938\u093F\u0924._\u0905\u0915\u094D\u091F\u0942._\u0928\u0935._\u0926\u093F\u0938.'.split(
                  '_'
                ),
      weekdaysMin:
                '\u0930_\u0938\u094B_\u092E\u0902_\u092C\u0941_\u0917\u0941_\u0936\u0941_\u0936'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'A h:mm \u092C\u091C\u0947',
        LTS: 'A h:mm:ss \u092C\u091C\u0947',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm \u092C\u091C\u0947',
        LLLL: 'dddd, D MMMM YYYY, A h:mm \u092C\u091C\u0947'
      },
      relativeTime: {
        future: '%s \u092E\u0947\u0902',
        past: '%s \u092A\u0939\u0932\u0947',
        s: '\u0915\u0941\u091B \u0939\u0940 \u0915\u094D\u0937\u0923',
        m: '\u090F\u0915 \u092E\u093F\u0928\u091F',
        mm: '%d \u092E\u093F\u0928\u091F',
        h: '\u090F\u0915 \u0918\u0902\u091F\u093E',
        hh: '%d \u0918\u0902\u091F\u0947',
        d: '\u090F\u0915 \u0926\u093F\u0928',
        dd: '%d \u0926\u093F\u0928',
        M: '\u090F\u0915 \u092E\u0939\u0940\u0928\u0947',
        MM: '%d \u092E\u0939\u0940\u0928\u0947',
        y: '\u090F\u0915 \u0935\u0930\u094D\u0937',
        yy: '%d \u0935\u0930\u094D\u0937'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Pn = k((ct, ht) => {
  (function (n, t) {
    typeof ct === 'object' && typeof ht < 'u'
      ? (ht.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_hu = t(n.dayjs))
  })(ct, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'hu',
      weekdays:
                'vas\xE1rnap_h\xE9tf\u0151_kedd_szerda_cs\xFCt\xF6rt\xF6k_p\xE9ntek_szombat'.split(
                  '_'
                ),
      weekdaysShort: 'vas_h\xE9t_kedd_sze_cs\xFCt_p\xE9n_szo'.split('_'),
      weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
      months: 'janu\xE1r_febru\xE1r_m\xE1rcius_\xE1prilis_m\xE1jus_j\xFAnius_j\xFAlius_augusztus_szeptember_okt\xF3ber_november_december'.split(
        '_'
      ),
      monthsShort:
                'jan_feb_m\xE1rc_\xE1pr_m\xE1j_j\xFAn_j\xFAl_aug_szept_okt_nov_dec'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e + '.'
      },
      weekStart: 1,
      relativeTime: {
        future: '%s m\xFAlva',
        past: '%s',
        s: function (e, r, a, u) {
          return 'n\xE9h\xE1ny m\xE1sodperc' + (u || r ? '' : 'e')
        },
        m: function (e, r, a, u) {
          return 'egy perc' + (u || r ? '' : 'e')
        },
        mm: function (e, r, a, u) {
          return e + ' perc' + (u || r ? '' : 'e')
        },
        h: function (e, r, a, u) {
          return 'egy ' + (u || r ? '\xF3ra' : '\xF3r\xE1ja')
        },
        hh: function (e, r, a, u) {
          return e + ' ' + (u || r ? '\xF3ra' : '\xF3r\xE1ja')
        },
        d: function (e, r, a, u) {
          return 'egy ' + (u || r ? 'nap' : 'napja')
        },
        dd: function (e, r, a, u) {
          return e + ' ' + (u || r ? 'nap' : 'napja')
        },
        M: function (e, r, a, u) {
          return 'egy ' + (u || r ? 'h\xF3nap' : 'h\xF3napja')
        },
        MM: function (e, r, a, u) {
          return e + ' ' + (u || r ? 'h\xF3nap' : 'h\xF3napja')
        },
        y: function (e, r, a, u) {
          return 'egy ' + (u || r ? '\xE9v' : '\xE9ve')
        },
        yy: function (e, r, a, u) {
          return e + ' ' + (u || r ? '\xE9v' : '\xE9ve')
        }
      },
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'YYYY.MM.DD.',
        LL: 'YYYY. MMMM D.',
        LLL: 'YYYY. MMMM D. H:mm',
        LLLL: 'YYYY. MMMM D., dddd H:mm'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Rn = k((Mt, yt) => {
  (function (n, t) {
    typeof Mt === 'object' && typeof yt < 'u'
      ? (yt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_hy_am = t(n.dayjs))
  })(Mt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'hy-am',
      weekdays:
                '\u056F\u056B\u0580\u0561\u056F\u056B_\u0565\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B_\u0570\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569'.split(
                  '_'
                ),
      months: '\u0570\u0578\u0582\u0576\u057E\u0561\u0580\u056B_\u0583\u0565\u057F\u0580\u057E\u0561\u0580\u056B_\u0574\u0561\u0580\u057F\u056B_\u0561\u057A\u0580\u056B\u056C\u056B_\u0574\u0561\u0575\u056B\u057D\u056B_\u0570\u0578\u0582\u0576\u056B\u057D\u056B_\u0570\u0578\u0582\u056C\u056B\u057D\u056B_\u0585\u0563\u0578\u057D\u057F\u0578\u057D\u056B_\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B_\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B'.split(
        '_'
      ),
      weekStart: 1,
      weekdaysShort:
                '\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569'.split(
                  '_'
                ),
      monthsShort:
                '\u0570\u0576\u057E_\u0583\u057F\u0580_\u0574\u0580\u057F_\u0561\u057A\u0580_\u0574\u0575\u057D_\u0570\u0576\u057D_\u0570\u056C\u057D_\u0585\u0563\u057D_\u057D\u057A\u057F_\u0570\u056F\u057F_\u0576\u0574\u0562_\u0564\u056F\u057F'.split(
                  '_'
                ),
      weekdaysMin:
                '\u056F\u0580\u056F_\u0565\u0580\u056F_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY \u0569.',
        LLL: 'D MMMM YYYY \u0569., HH:mm',
        LLLL: 'dddd, D MMMM YYYY \u0569., HH:mm'
      },
      relativeTime: {
        future: '%s \u0570\u0565\u057F\u0578',
        past: '%s \u0561\u057C\u0561\u057B',
        s: '\u0574\u056B \u0584\u0561\u0576\u056B \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576',
        m: '\u0580\u0578\u057A\u0565',
        mm: '%d \u0580\u0578\u057A\u0565',
        h: '\u056A\u0561\u0574',
        hh: '%d \u056A\u0561\u0574',
        d: '\u0585\u0580',
        dd: '%d \u0585\u0580',
        M: '\u0561\u0574\u056B\u057D',
        MM: '%d \u0561\u0574\u056B\u057D',
        y: '\u057F\u0561\u0580\u056B',
        yy: '%d \u057F\u0561\u0580\u056B'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Gn = k((Yt, pt) => {
  (function (n, t) {
    typeof Yt === 'object' && typeof pt < 'u'
      ? (pt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_id = t(n.dayjs))
  })(Yt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'id',
      weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
      months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split(
        '_'
      ),
      weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
      monthsShort:
                'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
      weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
      weekStart: 1,
      formats: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [pukul] HH.mm',
        LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
      },
      relativeTime: {
        future: 'dalam %s',
        past: '%s yang lalu',
        s: 'beberapa detik',
        m: 'semenit',
        mm: '%d menit',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bulan',
        y: 'setahun',
        yy: '%d tahun'
      },
      ordinal: function (e) {
        return e + '.'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Zn = k((Dt, Lt) => {
  (function (n, t) {
    typeof Dt === 'object' && typeof Lt < 'u'
      ? (Lt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_it = t(n.dayjs))
  })(Dt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'it',
      weekdays:
                'domenica_luned\xEC_marted\xEC_mercoled\xEC_gioved\xEC_venerd\xEC_sabato'.split(
                  '_'
                ),
      weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
      weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
      months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split(
        '_'
      ),
      weekStart: 1,
      monthsShort:
                'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: 'tra %s',
        past: '%s fa',
        s: 'qualche secondo',
        m: 'un minuto',
        mm: '%d minuti',
        h: "un' ora",
        hh: '%d ore',
        d: 'un giorno',
        dd: '%d giorni',
        M: 'un mese',
        MM: '%d mesi',
        y: 'un anno',
        yy: '%d anni'
      },
      ordinal: function (e) {
        return e + '\xBA'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Vn = k((vt, gt) => {
  (function (n, t) {
    typeof vt === 'object' && typeof gt < 'u'
      ? (gt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_ja = t(n.dayjs))
  })(vt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'ja',
      weekdays:
                '\u65E5\u66DC\u65E5_\u6708\u66DC\u65E5_\u706B\u66DC\u65E5_\u6C34\u66DC\u65E5_\u6728\u66DC\u65E5_\u91D1\u66DC\u65E5_\u571F\u66DC\u65E5'.split(
                  '_'
                ),
      weekdaysShort:
                '\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F'.split('_'),
      weekdaysMin:
                '\u65E5_\u6708_\u706B_\u6C34_\u6728_\u91D1_\u571F'.split('_'),
      months: '1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708'.split(
        '_'
      ),
      monthsShort:
                '1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e + '\u65E5'
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY\u5E74M\u6708D\u65E5',
        LLL: 'YYYY\u5E74M\u6708D\u65E5 HH:mm',
        LLLL: 'YYYY\u5E74M\u6708D\u65E5 dddd HH:mm',
        l: 'YYYY/MM/DD',
        ll: 'YYYY\u5E74M\u6708D\u65E5',
        lll: 'YYYY\u5E74M\u6708D\u65E5 HH:mm',
        llll: 'YYYY\u5E74M\u6708D\u65E5(ddd) HH:mm'
      },
      meridiem: function (e) {
        return e < 12 ? '\u5348\u524D' : '\u5348\u5F8C'
      },
      relativeTime: {
        future: '%s\u5F8C',
        past: '%s\u524D',
        s: '\u6570\u79D2',
        m: '1\u5206',
        mm: '%d\u5206',
        h: '1\u6642\u9593',
        hh: '%d\u6642\u9593',
        d: '1\u65E5',
        dd: '%d\u65E5',
        M: '1\u30F6\u6708',
        MM: '%d\u30F6\u6708',
        y: '1\u5E74',
        yy: '%d\u5E74'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Kn = k((St, bt) => {
  (function (n, t) {
    typeof St === 'object' && typeof bt < 'u'
      ? (bt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_ka = t(n.dayjs))
  })(St, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'ka',
      weekdays:
                '\u10D9\u10D5\u10D8\u10E0\u10D0_\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8_\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8_\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8'.split(
                  '_'
                ),
      weekdaysShort:
                '\u10D9\u10D5\u10D8_\u10DD\u10E0\u10E8_\u10E1\u10D0\u10DB_\u10DD\u10D7\u10EE_\u10EE\u10E3\u10D7_\u10DE\u10D0\u10E0_\u10E8\u10D0\u10D1'.split(
                  '_'
                ),
      weekdaysMin:
                '\u10D9\u10D5_\u10DD\u10E0_\u10E1\u10D0_\u10DD\u10D7_\u10EE\u10E3_\u10DE\u10D0_\u10E8\u10D0'.split(
                  '_'
                ),
      months: '\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8_\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8_\u10DB\u10D0\u10E0\u10E2\u10D8_\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8_\u10DB\u10D0\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8_\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8_\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD_\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8_\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8_\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8'.split(
        '_'
      ),
      monthsShort:
                '\u10D8\u10D0\u10DC_\u10D7\u10D4\u10D1_\u10DB\u10D0\u10E0_\u10D0\u10DE\u10E0_\u10DB\u10D0\u10D8_\u10D8\u10D5\u10DC_\u10D8\u10D5\u10DA_\u10D0\u10D2\u10D5_\u10E1\u10D4\u10E5_\u10DD\u10E5\u10E2_\u10DC\u10DD\u10D4_\u10D3\u10D4\u10D9'.split(
                  '_'
                ),
      weekStart: 1,
      formats: {
        LT: 'h:mm A',
        LTS: 'h:mm:ss A',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY h:mm A',
        LLLL: 'dddd, D MMMM YYYY h:mm A'
      },
      relativeTime: {
        future: '%s \u10E8\u10D4\u10DB\u10D3\u10D4\u10D2',
        past: '%s \u10EC\u10D8\u10DC',
        s: '\u10EC\u10D0\u10DB\u10D8',
        m: '\u10EC\u10E3\u10D7\u10D8',
        mm: '%d \u10EC\u10E3\u10D7\u10D8',
        h: '\u10E1\u10D0\u10D0\u10D7\u10D8',
        hh: '%d \u10E1\u10D0\u10D0\u10D7\u10D8\u10E1',
        d: '\u10D3\u10E6\u10D4\u10E1',
        dd: '%d \u10D3\u10E6\u10D8\u10E1 \u10D2\u10D0\u10DC\u10DB\u10D0\u10D5\u10DA\u10DD\u10D1\u10D0\u10E8\u10D8',
        M: '\u10D7\u10D5\u10D8\u10E1',
        MM: '%d \u10D7\u10D5\u10D8\u10E1',
        y: '\u10EC\u10D4\u10DA\u10D8',
        yy: '%d \u10EC\u10DA\u10D8\u10E1'
      },
      ordinal: function (e) {
        return e
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Qn = k((kt, Ht) => {
  (function (n, t) {
    typeof kt === 'object' && typeof Ht < 'u'
      ? (Ht.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_km = t(n.dayjs))
  })(kt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'km',
      weekdays:
                '\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799_\u1785\u17D0\u1793\u17D2\u1791_\u17A2\u1784\u17D2\u1782\u17B6\u179A_\u1796\u17BB\u1792_\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD_\u179F\u17BB\u1780\u17D2\u179A_\u179F\u17C5\u179A\u17CD'.split(
                  '_'
                ),
      months: '\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC'.split(
        '_'
      ),
      weekStart: 1,
      weekdaysShort:
                '\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F'.split(
                  '_'
                ),
      monthsShort:
                '\u1798\u1780\u179A\u17B6_\u1780\u17BB\u1798\u17D2\u1797\u17C8_\u1798\u17B8\u1793\u17B6_\u1798\u17C1\u179F\u17B6_\u17A7\u179F\u1797\u17B6_\u1798\u17B7\u1790\u17BB\u1793\u17B6_\u1780\u1780\u17D2\u1780\u178A\u17B6_\u179F\u17B8\u17A0\u17B6_\u1780\u1789\u17D2\u1789\u17B6_\u178F\u17BB\u179B\u17B6_\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6_\u1792\u17D2\u1793\u17BC'.split(
                  '_'
                ),
      weekdaysMin:
                '\u17A2\u17B6_\u1785_\u17A2_\u1796_\u1796\u17D2\u179A_\u179F\u17BB_\u179F'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: '%s\u1791\u17C0\u178F',
        past: '%s\u1798\u17BB\u1793',
        s: '\u1794\u17C9\u17BB\u1793\u17D2\u1798\u17B6\u1793\u179C\u17B7\u1793\u17B6\u1791\u17B8',
        m: '\u1798\u17BD\u1799\u1793\u17B6\u1791\u17B8',
        mm: '%d \u1793\u17B6\u1791\u17B8',
        h: '\u1798\u17BD\u1799\u1798\u17C9\u17C4\u1784',
        hh: '%d \u1798\u17C9\u17C4\u1784',
        d: '\u1798\u17BD\u1799\u1790\u17D2\u1784\u17C3',
        dd: '%d \u1790\u17D2\u1784\u17C3',
        M: '\u1798\u17BD\u1799\u1781\u17C2',
        MM: '%d \u1781\u17C2',
        y: '\u1798\u17BD\u1799\u1786\u17D2\u1793\u17B6\u17C6',
        yy: '%d \u1786\u17D2\u1793\u17B6\u17C6'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const Xn = k((jt, Tt) => {
  (function (n, t) {
    typeof jt === 'object' && typeof Tt < 'u'
      ? (Tt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_lt = t(n.dayjs))
  })(jt, function (n) {
    'use strict'
    function t (o) {
      return o && typeof o === 'object' && 'default' in o
        ? o
        : { default: o }
    }
    const s = t(n)
    const i =
            'sausio_vasario_kovo_baland\u017Eio_gegu\u017E\u0117s_bir\u017Eelio_liepos_rugpj\u016B\u010Dio_rugs\u0117jo_spalio_lapkri\u010Dio_gruod\u017Eio'.split(
              '_'
            )
    const e =
            'sausis_vasaris_kovas_balandis_gegu\u017E\u0117_bir\u017Eelis_liepa_rugpj\u016Btis_rugs\u0117jis_spalis_lapkritis_gruodis'.split(
              '_'
            )
    const r = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    const a = function (o, d) {
      return r.test(d) ? i[o.month()] : e[o.month()]
    };
    (a.s = e), (a.f = i)
    const u = {
      name: 'lt',
      weekdays:
                'sekmadienis_pirmadienis_antradienis_tre\u010Diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis'.split(
                  '_'
                ),
      weekdaysShort: 'sek_pir_ant_tre_ket_pen_\u0161e\u0161'.split('_'),
      weekdaysMin: 's_p_a_t_k_pn_\u0161'.split('_'),
      months: a,
      monthsShort:
                'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
      ordinal: function (o) {
        return o + '.'
      },
      weekStart: 1,
      relativeTime: {
        future: 'u\u017E %s',
        past: 'prie\u0161 %s',
        s: 'kelias sekundes',
        m: 'minut\u0119',
        mm: '%d minutes',
        h: 'valand\u0105',
        hh: '%d valandas',
        d: 'dien\u0105',
        dd: '%d dienas',
        M: 'm\u0117nes\u012F',
        MM: '%d m\u0117nesius',
        y: 'metus',
        yy: '%d metus'
      },
      format: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY [m.] MMMM D [d.]',
        LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
        l: 'YYYY-MM-DD',
        ll: 'YYYY [m.] MMMM D [d.]',
        lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY [m.] MMMM D [d.]',
        LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
        l: 'YYYY-MM-DD',
        ll: 'YYYY [m.] MMMM D [d.]',
        lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
        llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
      }
    }
    return s.default.locale(u, null, !0), u
  })
})
const Bn = k((wt, $t) => {
  (function (n, t) {
    typeof wt === 'object' && typeof $t < 'u'
      ? ($t.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_lv = t(n.dayjs))
  })(wt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'lv',
      weekdays:
                'sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena'.split(
                  '_'
                ),
      months: 'janv\u0101ris_febru\u0101ris_marts_apr\u012Blis_maijs_j\u016Bnijs_j\u016Blijs_augusts_septembris_oktobris_novembris_decembris'.split(
        '_'
      ),
      weekStart: 1,
      weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
      monthsShort:
                'jan_feb_mar_apr_mai_j\u016Bn_j\u016Bl_aug_sep_okt_nov_dec'.split(
                  '_'
                ),
      weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY.',
        LL: 'YYYY. [gada] D. MMMM',
        LLL: 'YYYY. [gada] D. MMMM, HH:mm',
        LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
      },
      relativeTime: {
        future: 'p\u0113c %s',
        past: 'pirms %s',
        s: 'da\u017E\u0101m sekund\u0113m',
        m: 'min\u016Btes',
        mm: '%d min\u016Bt\u0113m',
        h: 'stundas',
        hh: '%d stund\u0101m',
        d: 'dienas',
        dd: '%d dien\u0101m',
        M: 'm\u0113ne\u0161a',
        MM: '%d m\u0113ne\u0161iem',
        y: 'gada',
        yy: '%d gadiem'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ei = k((Ct, Ot) => {
  (function (n, t) {
    typeof Ct === 'object' && typeof Ot < 'u'
      ? (Ot.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_ms = t(n.dayjs))
  })(Ct, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'ms',
      weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
      weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
      weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
      months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split(
        '_'
      ),
      monthsShort:
                'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
      weekStart: 1,
      formats: {
        LT: 'HH.mm',
        LTS: 'HH.mm.ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH.mm',
        LLLL: 'dddd, D MMMM YYYY HH.mm'
      },
      relativeTime: {
        future: 'dalam %s',
        past: '%s yang lepas',
        s: 'beberapa saat',
        m: 'seminit',
        mm: '%d minit',
        h: 'sejam',
        hh: '%d jam',
        d: 'sehari',
        dd: '%d hari',
        M: 'sebulan',
        MM: '%d bulan',
        y: 'setahun',
        yy: '%d tahun'
      },
      ordinal: function (e) {
        return e + '.'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ti = k((zt, At) => {
  (function (n, t) {
    typeof zt === 'object' && typeof At < 'u'
      ? (At.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_my = t(n.dayjs))
  })(zt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'my',
      weekdays:
                '\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031_\u1010\u1014\u1004\u103A\u1039\u101C\u102C_\u1021\u1004\u103A\u1039\u1002\u102B_\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038_\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038_\u101E\u1031\u102C\u1000\u103C\u102C_\u1005\u1014\u1031'.split(
                  '_'
                ),
      months: '\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E_\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E_\u1019\u1010\u103A_\u1027\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u1007\u1030\u101C\u102D\u102F\u1004\u103A_\u101E\u103C\u1002\u102F\u1010\u103A_\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C_\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C_\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C_\u1012\u102E\u1007\u1004\u103A\u1018\u102C'.split(
        '_'
      ),
      weekStart: 1,
      weekdaysShort:
                '\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031'.split(
                  '_'
                ),
      monthsShort:
                '\u1007\u1014\u103A_\u1016\u1031_\u1019\u1010\u103A_\u1015\u103C\u102E_\u1019\u1031_\u1007\u103D\u1014\u103A_\u101C\u102D\u102F\u1004\u103A_\u101E\u103C_\u1005\u1000\u103A_\u1021\u1031\u102C\u1000\u103A_\u1014\u102D\u102F_\u1012\u102E'.split(
                  '_'
                ),
      weekdaysMin:
                '\u1014\u103D\u1031_\u101C\u102C_\u1002\u102B_\u101F\u1030\u1038_\u1000\u103C\u102C_\u101E\u1031\u102C_\u1014\u1031'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: '\u101C\u102C\u1019\u100A\u103A\u1037 %s \u1019\u103E\u102C',
        past: '\u101C\u103D\u1014\u103A\u1001\u1032\u1037\u101E\u1031\u102C %s \u1000',
        s: '\u1005\u1000\u1039\u1000\u1014\u103A.\u1021\u1014\u100A\u103A\u1038\u1004\u101A\u103A',
        m: '\u1010\u1005\u103A\u1019\u102D\u1014\u1005\u103A',
        mm: '%d \u1019\u102D\u1014\u1005\u103A',
        h: '\u1010\u1005\u103A\u1014\u102C\u101B\u102E',
        hh: '%d \u1014\u102C\u101B\u102E',
        d: '\u1010\u1005\u103A\u101B\u1000\u103A',
        dd: '%d \u101B\u1000\u103A',
        M: '\u1010\u1005\u103A\u101C',
        MM: '%d \u101C',
        y: '\u1010\u1005\u103A\u1014\u103E\u1005\u103A',
        yy: '%d \u1014\u103E\u1005\u103A'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ni = k((It, qt) => {
  (function (n, t) {
    typeof It === 'object' && typeof qt < 'u'
      ? (qt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_nl = t(n.dayjs))
  })(It, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'nl',
      weekdays:
                'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split(
                  '_'
                ),
      weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
      weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
      months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split(
        '_'
      ),
      monthsShort:
                'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_'),
      ordinal: function (e) {
        return (
          '[' +
                    e +
                    (e === 1 || e === 8 || e >= 20 ? 'ste' : 'de') +
                    ']'
        )
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD-MM-YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: 'over %s',
        past: '%s geleden',
        s: 'een paar seconden',
        m: 'een minuut',
        mm: '%d minuten',
        h: 'een uur',
        hh: '%d uur',
        d: 'een dag',
        dd: '%d dagen',
        M: 'een maand',
        MM: '%d maanden',
        y: 'een jaar',
        yy: '%d jaar'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ii = k((xt, Nt) => {
  (function (n, t) {
    typeof xt === 'object' && typeof Nt < 'u'
      ? (Nt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_nb = t(n.dayjs))
  })(xt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'nb',
      weekdays:
                's\xF8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xF8rdag'.split(
                  '_'
                ),
      weekdaysShort: 's\xF8._ma._ti._on._to._fr._l\xF8.'.split('_'),
      weekdaysMin: 's\xF8_ma_ti_on_to_fr_l\xF8'.split('_'),
      months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split(
        '_'
      ),
      monthsShort:
                'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split(
                  '_'
                ),
      ordinal: function (e) {
        return e + '.'
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
      },
      relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'noen sekunder',
        m: 'ett minutt',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dager',
        M: 'en m\xE5ned',
        MM: '%d m\xE5neder',
        y: 'ett \xE5r',
        yy: '%d \xE5r'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const si = k((Et, Ft) => {
  (function (n, t) {
    typeof Et === 'object' && typeof Ft < 'u'
      ? (Ft.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_pl = t(n.dayjs))
  })(Et, function (n) {
    'use strict'
    function t (_) {
      return _ && typeof _ === 'object' && 'default' in _
        ? _
        : { default: _ }
    }
    const s = t(n)
    function i (_) {
      return _ % 10 < 5 && _ % 10 > 1 && ~~(_ / 10) % 10 != 1
    }
    function e (_, y, l) {
      const f = _ + ' '
      switch (l) {
        case 'm':
          return y ? 'minuta' : 'minut\u0119'
        case 'mm':
          return f + (i(_) ? 'minuty' : 'minut')
        case 'h':
          return y ? 'godzina' : 'godzin\u0119'
        case 'hh':
          return f + (i(_) ? 'godziny' : 'godzin')
        case 'MM':
          return f + (i(_) ? 'miesi\u0105ce' : 'miesi\u0119cy')
        case 'yy':
          return f + (i(_) ? 'lata' : 'lat')
      }
    }
    const r =
            'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015Bnia_pa\u017Adziernika_listopada_grudnia'.split(
              '_'
            )
    const a =
            'stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017Adziernik_listopad_grudzie\u0144'.split(
              '_'
            )
    const u = /D MMMM/
    const o = function (_, y) {
      return u.test(y) ? r[_.month()] : a[_.month()]
    };
    (o.s = a), (o.f = r)
    const d = {
      name: 'pl',
      weekdays:
                'niedziela_poniedzia\u0142ek_wtorek_\u015Broda_czwartek_pi\u0105tek_sobota'.split(
                  '_'
                ),
      weekdaysShort: 'ndz_pon_wt_\u015Br_czw_pt_sob'.split('_'),
      weekdaysMin: 'Nd_Pn_Wt_\u015Ar_Cz_Pt_So'.split('_'),
      months: o,
      monthsShort:
                'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017A_lis_gru'.split(
                  '_'
                ),
      ordinal: function (_) {
        return _ + '.'
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: 'za %s',
        past: '%s temu',
        s: 'kilka sekund',
        m: e,
        mm: e,
        h: e,
        hh: e,
        d: '1 dzie\u0144',
        dd: '%d dni',
        M: 'miesi\u0105c',
        MM: e,
        y: 'rok',
        yy: e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
      }
    }
    return s.default.locale(d, null, !0), d
  })
})
const ri = k((Jt, Wt) => {
  (function (n, t) {
    typeof Jt === 'object' && typeof Wt < 'u'
      ? (Wt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_pt_br = t(n.dayjs))
  })(Jt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'pt-br',
      weekdays:
                'domingo_segunda-feira_ter\xE7a-feira_quarta-feira_quinta-feira_sexta-feira_s\xE1bado'.split(
                  '_'
                ),
      weekdaysShort: 'dom_seg_ter_qua_qui_sex_s\xE1b'.split('_'),
      weekdaysMin: 'Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_S\xE1'.split('_'),
      months: 'janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
        '_'
      ),
      monthsShort:
                'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
      ordinal: function (e) {
        return e + '\xBA'
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [\xE0s] HH:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm'
      },
      relativeTime: {
        future: 'em %s',
        past: 'h\xE1 %s',
        s: 'poucos segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um m\xEAs',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ai = k((Ut, Pt) => {
  (function (n, t) {
    typeof Ut === 'object' && typeof Pt < 'u'
      ? (Pt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_pt = t(n.dayjs))
  })(Ut, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'pt',
      weekdays:
                'domingo_segunda-feira_ter\xE7a-feira_quarta-feira_quinta-feira_sexta-feira_s\xE1bado'.split(
                  '_'
                ),
      weekdaysShort: 'dom_seg_ter_qua_qui_sex_sab'.split('_'),
      weekdaysMin: 'Do_2\xAA_3\xAA_4\xAA_5\xAA_6\xAA_Sa'.split('_'),
      months: 'janeiro_fevereiro_mar\xE7o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
        '_'
      ),
      monthsShort:
                'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
      ordinal: function (e) {
        return e + '\xBA'
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [\xE0s] HH:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm'
      },
      relativeTime: {
        future: 'em %s',
        past: 'h\xE1 %s',
        s: 'alguns segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um m\xEAs',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ui = k((Rt, Gt) => {
  (function (n, t) {
    typeof Rt === 'object' && typeof Gt < 'u'
      ? (Gt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_ro = t(n.dayjs))
  })(Rt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'ro',
      weekdays:
                'Duminic\u0103_Luni_Mar\u021Bi_Miercuri_Joi_Vineri_S\xE2mb\u0103t\u0103'.split(
                  '_'
                ),
      weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_S\xE2m'.split('_'),
      weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_S\xE2'.split('_'),
      months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split(
        '_'
      ),
      monthsShort:
                'Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.'.split(
                  '_'
                ),
      weekStart: 1,
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
      },
      relativeTime: {
        future: 'peste %s',
        past: 'acum %s',
        s: 'c\xE2teva secunde',
        m: 'un minut',
        mm: '%d minute',
        h: 'o or\u0103',
        hh: '%d ore',
        d: 'o zi',
        dd: '%d zile',
        M: 'o lun\u0103',
        MM: '%d luni',
        y: 'un an',
        yy: '%d ani'
      },
      ordinal: function (e) {
        return e
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const oi = k((Zt, Vt) => {
  (function (n, t) {
    typeof Zt === 'object' && typeof Vt < 'u'
      ? (Vt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_ru = t(n.dayjs))
  })(Zt, function (n) {
    'use strict'
    function t (l) {
      return l && typeof l === 'object' && 'default' in l
        ? l
        : { default: l }
    }
    const s = t(n)
    const i =
            '\u044F\u043D\u0432\u0430\u0440\u044F_\u0444\u0435\u0432\u0440\u0430\u043B\u044F_\u043C\u0430\u0440\u0442\u0430_\u0430\u043F\u0440\u0435\u043B\u044F_\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F_\u043E\u043A\u0442\u044F\u0431\u0440\u044F_\u043D\u043E\u044F\u0431\u0440\u044F_\u0434\u0435\u043A\u0430\u0431\u0440\u044F'.split(
              '_'
            )
    const e =
            '\u044F\u043D\u0432\u0430\u0440\u044C_\u0444\u0435\u0432\u0440\u0430\u043B\u044C_\u043C\u0430\u0440\u0442_\u0430\u043F\u0440\u0435\u043B\u044C_\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C_\u043E\u043A\u0442\u044F\u0431\u0440\u044C_\u043D\u043E\u044F\u0431\u0440\u044C_\u0434\u0435\u043A\u0430\u0431\u0440\u044C'.split(
              '_'
            )
    const r =
            '\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440._\u0430\u043F\u0440._\u043C\u0430\u044F_\u0438\u044E\u043D\u044F_\u0438\u044E\u043B\u044F_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.'.split(
              '_'
            )
    const a =
            '\u044F\u043D\u0432._\u0444\u0435\u0432\u0440._\u043C\u0430\u0440\u0442_\u0430\u043F\u0440._\u043C\u0430\u0439_\u0438\u044E\u043D\u044C_\u0438\u044E\u043B\u044C_\u0430\u0432\u0433._\u0441\u0435\u043D\u0442._\u043E\u043A\u0442._\u043D\u043E\u044F\u0431._\u0434\u0435\u043A.'.split(
              '_'
            )
    const u = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
    function o (l, f, m) {
      let Y, L
      return m === 'm'
        ? f
          ? '\u043C\u0438\u043D\u0443\u0442\u0430'
          : '\u043C\u0438\u043D\u0443\u0442\u0443'
        : l +
                      ' ' +
                      ((Y = +l),
                      (L = {
                        mm: f
                          ? '\u043C\u0438\u043D\u0443\u0442\u0430_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442'
                          : '\u043C\u0438\u043D\u0443\u0442\u0443_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442',
                        hh: '\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043E\u0432',
                        dd: '\u0434\u0435\u043D\u044C_\u0434\u043D\u044F_\u0434\u043D\u0435\u0439',
                        MM: '\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u0430_\u043C\u0435\u0441\u044F\u0446\u0435\u0432',
                        yy: '\u0433\u043E\u0434_\u0433\u043E\u0434\u0430_\u043B\u0435\u0442'
                      }[m].split('_')),
                      Y % 10 == 1 && Y % 100 != 11
                        ? L[0]
                        : Y % 10 >= 2 &&
                              Y % 10 <= 4 &&
                              (Y % 100 < 10 || Y % 100 >= 20)
                          ? L[1]
                          : L[2])
    }
    const d = function (l, f) {
      return u.test(f) ? i[l.month()] : e[l.month()]
    };
    (d.s = e), (d.f = i)
    const _ = function (l, f) {
      return u.test(f) ? r[l.month()] : a[l.month()]
    };
    (_.s = a), (_.f = r)
    const y = {
      name: 'ru',
      weekdays:
                '\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435_\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A_\u0432\u0442\u043E\u0440\u043D\u0438\u043A_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043F\u044F\u0442\u043D\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043E\u0442\u0430'.split(
                  '_'
                ),
      weekdaysShort:
                '\u0432\u0441\u043A_\u043F\u043D\u0434_\u0432\u0442\u0440_\u0441\u0440\u0434_\u0447\u0442\u0432_\u043F\u0442\u043D_\u0441\u0431\u0442'.split(
                  '_'
                ),
      weekdaysMin:
                '\u0432\u0441_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431'.split(
                  '_'
                ),
      months: d,
      monthsShort: _,
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY \u0433.',
        LLL: 'D MMMM YYYY \u0433., H:mm',
        LLLL: 'dddd, D MMMM YYYY \u0433., H:mm'
      },
      relativeTime: {
        future: '\u0447\u0435\u0440\u0435\u0437 %s',
        past: '%s \u043D\u0430\u0437\u0430\u0434',
        s: '\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434',
        m: o,
        mm: o,
        h: '\u0447\u0430\u0441',
        hh: o,
        d: '\u0434\u0435\u043D\u044C',
        dd: o,
        M: '\u043C\u0435\u0441\u044F\u0446',
        MM: o,
        y: '\u0433\u043E\u0434',
        yy: o
      },
      ordinal: function (l) {
        return l
      },
      meridiem: function (l) {
        return l < 4
          ? '\u043D\u043E\u0447\u0438'
          : l < 12
            ? '\u0443\u0442\u0440\u0430'
            : l < 17
              ? '\u0434\u043D\u044F'
              : '\u0432\u0435\u0447\u0435\u0440\u0430'
      }
    }
    return s.default.locale(y, null, !0), y
  })
})
const di = k((Kt, Qt) => {
  (function (n, t) {
    typeof Kt === 'object' && typeof Qt < 'u'
      ? (Qt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_sv = t(n.dayjs))
  })(Kt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'sv',
      weekdays:
                's\xF6ndag_m\xE5ndag_tisdag_onsdag_torsdag_fredag_l\xF6rdag'.split(
                  '_'
                ),
      weekdaysShort: 's\xF6n_m\xE5n_tis_ons_tor_fre_l\xF6r'.split('_'),
      weekdaysMin: 's\xF6_m\xE5_ti_on_to_fr_l\xF6'.split('_'),
      months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split(
        '_'
      ),
      monthsShort:
                'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
      weekStart: 1,
      yearStart: 4,
      ordinal: function (e) {
        const r = e % 10
        return '[' + e + (r === 1 || r === 2 ? 'a' : 'e') + ']'
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd D MMM YYYY HH:mm'
      },
      relativeTime: {
        future: 'om %s',
        past: 'f\xF6r %s sedan',
        s: 'n\xE5gra sekunder',
        m: 'en minut',
        mm: '%d minuter',
        h: 'en timme',
        hh: '%d timmar',
        d: 'en dag',
        dd: '%d dagar',
        M: 'en m\xE5nad',
        MM: '%d m\xE5nader',
        y: 'ett \xE5r',
        yy: '%d \xE5r'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const _i = k((Xt, Bt) => {
  (function (n, t) {
    typeof Xt === 'object' && typeof Bt < 'u'
      ? (Bt.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_th = t(n.dayjs))
  })(Xt, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'th',
      weekdays:
                '\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C'.split(
                  '_'
                ),
      weekdaysShort:
                '\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C_\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C_\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23_\u0E1E\u0E38\u0E18_\u0E1E\u0E24\u0E2B\u0E31\u0E2A_\u0E28\u0E38\u0E01\u0E23\u0E4C_\u0E40\u0E2A\u0E32\u0E23\u0E4C'.split(
                  '_'
                ),
      weekdaysMin:
                '\u0E2D\u0E32._\u0E08._\u0E2D._\u0E1E._\u0E1E\u0E24._\u0E28._\u0E2A.'.split(
                  '_'
                ),
      months: '\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21_\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C_\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21_\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19_\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21_\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19_\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21_\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21_\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19_\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21_\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19_\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21'.split(
        '_'
      ),
      monthsShort:
                '\u0E21.\u0E04._\u0E01.\u0E1E._\u0E21\u0E35.\u0E04._\u0E40\u0E21.\u0E22._\u0E1E.\u0E04._\u0E21\u0E34.\u0E22._\u0E01.\u0E04._\u0E2A.\u0E04._\u0E01.\u0E22._\u0E15.\u0E04._\u0E1E.\u0E22._\u0E18.\u0E04.'.split(
                  '_'
                ),
      formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm',
        LLLL: '\u0E27\u0E31\u0E19dddd\u0E17\u0E35\u0E48 D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H:mm'
      },
      relativeTime: {
        future: '\u0E2D\u0E35\u0E01 %s',
        past: '%s\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27',
        s: '\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E27\u0E34\u0E19\u0E32\u0E17\u0E35',
        m: '1 \u0E19\u0E32\u0E17\u0E35',
        mm: '%d \u0E19\u0E32\u0E17\u0E35',
        h: '1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07',
        hh: '%d \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07',
        d: '1 \u0E27\u0E31\u0E19',
        dd: '%d \u0E27\u0E31\u0E19',
        M: '1 \u0E40\u0E14\u0E37\u0E2D\u0E19',
        MM: '%d \u0E40\u0E14\u0E37\u0E2D\u0E19',
        y: '1 \u0E1B\u0E35',
        yy: '%d \u0E1B\u0E35'
      },
      ordinal: function (e) {
        return e + '.'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const fi = k((en, tn) => {
  (function (n, t) {
    typeof en === 'object' && typeof tn < 'u'
      ? (tn.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_tr = t(n.dayjs))
  })(en, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'tr',
      weekdays:
                'Pazar_Pazartesi_Sal\u0131_\xC7ar\u015Famba_Per\u015Fembe_Cuma_Cumartesi'.split(
                  '_'
                ),
      weekdaysShort: 'Paz_Pts_Sal_\xC7ar_Per_Cum_Cts'.split('_'),
      weekdaysMin: 'Pz_Pt_Sa_\xC7a_Pe_Cu_Ct'.split('_'),
      months: 'Ocak_\u015Eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011Fustos_Eyl\xFCl_Ekim_Kas\u0131m_Aral\u0131k'.split(
        '_'
      ),
      monthsShort:
                'Oca_\u015Eub_Mar_Nis_May_Haz_Tem_A\u011Fu_Eyl_Eki_Kas_Ara'.split(
                  '_'
                ),
      weekStart: 1,
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
      },
      relativeTime: {
        future: '%s sonra',
        past: '%s \xF6nce',
        s: 'birka\xE7 saniye',
        m: 'bir dakika',
        mm: '%d dakika',
        h: 'bir saat',
        hh: '%d saat',
        d: 'bir g\xFCn',
        dd: '%d g\xFCn',
        M: 'bir ay',
        MM: '%d ay',
        y: 'bir y\u0131l',
        yy: '%d y\u0131l'
      },
      ordinal: function (e) {
        return e + '.'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const li = k((nn, sn) => {
  (function (n, t) {
    typeof nn === 'object' && typeof sn < 'u'
      ? (sn.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_uk = t(n.dayjs))
  })(nn, function (n) {
    'use strict'
    function t (d) {
      return d && typeof d === 'object' && 'default' in d
        ? d
        : { default: d }
    }
    const s = t(n)
    const i =
            '\u0441\u0456\u0447\u043D\u044F_\u043B\u044E\u0442\u043E\u0433\u043E_\u0431\u0435\u0440\u0435\u0437\u043D\u044F_\u043A\u0432\u0456\u0442\u043D\u044F_\u0442\u0440\u0430\u0432\u043D\u044F_\u0447\u0435\u0440\u0432\u043D\u044F_\u043B\u0438\u043F\u043D\u044F_\u0441\u0435\u0440\u043F\u043D\u044F_\u0432\u0435\u0440\u0435\u0441\u043D\u044F_\u0436\u043E\u0432\u0442\u043D\u044F_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043D\u044F'.split(
              '_'
            )
    const e =
            '\u0441\u0456\u0447\u0435\u043D\u044C_\u043B\u044E\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C_\u043A\u0432\u0456\u0442\u0435\u043D\u044C_\u0442\u0440\u0430\u0432\u0435\u043D\u044C_\u0447\u0435\u0440\u0432\u0435\u043D\u044C_\u043B\u0438\u043F\u0435\u043D\u044C_\u0441\u0435\u0440\u043F\u0435\u043D\u044C_\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C_\u0436\u043E\u0432\u0442\u0435\u043D\u044C_\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043D\u044C'.split(
              '_'
            )
    const r = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
    function a (d, _, y) {
      let l, f
      return y === 'm'
        ? _
          ? '\u0445\u0432\u0438\u043B\u0438\u043D\u0430'
          : '\u0445\u0432\u0438\u043B\u0438\u043D\u0443'
        : y === 'h'
          ? _
            ? '\u0433\u043E\u0434\u0438\u043D\u0430'
            : '\u0433\u043E\u0434\u0438\u043D\u0443'
          : d +
                    ' ' +
                    ((l = +d),
                    (f = {
                      ss: _
                        ? '\u0441\u0435\u043A\u0443\u043D\u0434\u0430_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434'
                        : '\u0441\u0435\u043A\u0443\u043D\u0434\u0443_\u0441\u0435\u043A\u0443\u043D\u0434\u0438_\u0441\u0435\u043A\u0443\u043D\u0434',
                      mm: _
                        ? '\u0445\u0432\u0438\u043B\u0438\u043D\u0430_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D'
                        : '\u0445\u0432\u0438\u043B\u0438\u043D\u0443_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D',
                      hh: _
                        ? '\u0433\u043E\u0434\u0438\u043D\u0430_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D'
                        : '\u0433\u043E\u0434\u0438\u043D\u0443_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D',
                      dd: '\u0434\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u043D\u0456\u0432',
                      MM: '\u043C\u0456\u0441\u044F\u0446\u044C_\u043C\u0456\u0441\u044F\u0446\u0456_\u043C\u0456\u0441\u044F\u0446\u0456\u0432',
                      yy: '\u0440\u0456\u043A_\u0440\u043E\u043A\u0438_\u0440\u043E\u043A\u0456\u0432'
                    }[y].split('_')),
                    l % 10 == 1 && l % 100 != 11
                      ? f[0]
                      : l % 10 >= 2 &&
                            l % 10 <= 4 &&
                            (l % 100 < 10 || l % 100 >= 20)
                        ? f[1]
                        : f[2])
    }
    const u = function (d, _) {
      return r.test(_) ? i[d.month()] : e[d.month()]
    };
    (u.s = e), (u.f = i)
    const o = {
      name: 'uk',
      weekdays:
                '\u043D\u0435\u0434\u0456\u043B\u044F_\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A_\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044F_\u0441\u0443\u0431\u043E\u0442\u0430'.split(
                  '_'
                ),
      weekdaysShort:
                '\u043D\u0434\u043B_\u043F\u043D\u0434_\u0432\u0442\u0440_\u0441\u0440\u0434_\u0447\u0442\u0432_\u043F\u0442\u043D_\u0441\u0431\u0442'.split(
                  '_'
                ),
      weekdaysMin:
                '\u043D\u0434_\u043F\u043D_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043F\u0442_\u0441\u0431'.split(
                  '_'
                ),
      months: u,
      monthsShort:
                '\u0441\u0456\u0447_\u043B\u044E\u0442_\u0431\u0435\u0440_\u043A\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043B\u0438\u043F_\u0441\u0435\u0440\u043F_\u0432\u0435\u0440_\u0436\u043E\u0432\u0442_\u043B\u0438\u0441\u0442_\u0433\u0440\u0443\u0434'.split(
                  '_'
                ),
      weekStart: 1,
      relativeTime: {
        future: '\u0437\u0430 %s',
        past: '%s \u0442\u043E\u043C\u0443',
        s: '\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0441\u0435\u043A\u0443\u043D\u0434',
        m: a,
        mm: a,
        h: a,
        hh: a,
        d: '\u0434\u0435\u043D\u044C',
        dd: a,
        M: '\u043C\u0456\u0441\u044F\u0446\u044C',
        MM: a,
        y: '\u0440\u0456\u043A',
        yy: a
      },
      ordinal: function (d) {
        return d
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY \u0440.',
        LLL: 'D MMMM YYYY \u0440., HH:mm',
        LLLL: 'dddd, D MMMM YYYY \u0440., HH:mm'
      }
    }
    return s.default.locale(o, null, !0), o
  })
})
const mi = k((rn, an) => {
  (function (n, t) {
    typeof rn === 'object' && typeof an < 'u'
      ? (an.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_vi = t(n.dayjs))
  })(rn, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'vi',
      weekdays:
                'ch\u1EE7 nh\u1EADt_th\u1EE9 hai_th\u1EE9 ba_th\u1EE9 t\u01B0_th\u1EE9 n\u0103m_th\u1EE9 s\xE1u_th\u1EE9 b\u1EA3y'.split(
                  '_'
                ),
      months: 'th\xE1ng 1_th\xE1ng 2_th\xE1ng 3_th\xE1ng 4_th\xE1ng 5_th\xE1ng 6_th\xE1ng 7_th\xE1ng 8_th\xE1ng 9_th\xE1ng 10_th\xE1ng 11_th\xE1ng 12'.split(
        '_'
      ),
      weekStart: 1,
      weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
      monthsShort:
                'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split(
                  '_'
                ),
      weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
      ordinal: function (e) {
        return e
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM [n\u0103m] YYYY',
        LLL: 'D MMMM [n\u0103m] YYYY HH:mm',
        LLLL: 'dddd, D MMMM [n\u0103m] YYYY HH:mm',
        l: 'DD/M/YYYY',
        ll: 'D MMM YYYY',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd, D MMM YYYY HH:mm'
      },
      relativeTime: {
        future: '%s t\u1EDBi',
        past: '%s tr\u01B0\u1EDBc',
        s: 'v\xE0i gi\xE2y',
        m: 'm\u1ED9t ph\xFAt',
        mm: '%d ph\xFAt',
        h: 'm\u1ED9t gi\u1EDD',
        hh: '%d gi\u1EDD',
        d: 'm\u1ED9t ng\xE0y',
        dd: '%d ng\xE0y',
        M: 'm\u1ED9t th\xE1ng',
        MM: '%d th\xE1ng',
        y: 'm\u1ED9t n\u0103m',
        yy: '%d n\u0103m'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ci = k((un, on) => {
  (function (n, t) {
    typeof un === 'object' && typeof on < 'u'
      ? (on.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_zh_cn = t(n.dayjs))
  })(un, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'zh-cn',
      weekdays:
                '\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D'.split(
                  '_'
                ),
      weekdaysShort:
                '\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D'.split(
                  '_'
                ),
      weekdaysMin:
                '\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D'.split('_'),
      months: '\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708'.split(
        '_'
      ),
      monthsShort:
                '1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708'.split(
                  '_'
                ),
      ordinal: function (e, r) {
        return r === 'W' ? e + '\u5468' : e + '\u65E5'
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY\u5E74M\u6708D\u65E5',
        LLL: 'YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206',
        LLLL: 'YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206',
        l: 'YYYY/M/D',
        ll: 'YYYY\u5E74M\u6708D\u65E5',
        lll: 'YYYY\u5E74M\u6708D\u65E5 HH:mm',
        llll: 'YYYY\u5E74M\u6708D\u65E5dddd HH:mm'
      },
      relativeTime: {
        future: '%s\u5185',
        past: '%s\u524D',
        s: '\u51E0\u79D2',
        m: '1 \u5206\u949F',
        mm: '%d \u5206\u949F',
        h: '1 \u5C0F\u65F6',
        hh: '%d \u5C0F\u65F6',
        d: '1 \u5929',
        dd: '%d \u5929',
        M: '1 \u4E2A\u6708',
        MM: '%d \u4E2A\u6708',
        y: '1 \u5E74',
        yy: '%d \u5E74'
      },
      meridiem: function (e, r) {
        const a = 100 * e + r
        return a < 600
          ? '\u51CC\u6668'
          : a < 900
            ? '\u65E9\u4E0A'
            : a < 1100
              ? '\u4E0A\u5348'
              : a < 1300
                ? '\u4E2D\u5348'
                : a < 1800
                  ? '\u4E0B\u5348'
                  : '\u665A\u4E0A'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const hi = k((dn, _n) => {
  (function (n, t) {
    typeof dn === 'object' && typeof _n < 'u'
      ? (_n.exports = t(j()))
      : typeof define === 'function' && define.amd
        ? define(['dayjs'], t)
        : ((n =
                    typeof globalThis < 'u'
                      ? globalThis
                      : n || self).dayjs_locale_zh_tw = t(n.dayjs))
  })(dn, function (n) {
    'use strict'
    function t (e) {
      return e && typeof e === 'object' && 'default' in e
        ? e
        : { default: e }
    }
    const s = t(n)
    const i = {
      name: 'zh-tw',
      weekdays:
                '\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D'.split(
                  '_'
                ),
      weekdaysShort:
                '\u9031\u65E5_\u9031\u4E00_\u9031\u4E8C_\u9031\u4E09_\u9031\u56DB_\u9031\u4E94_\u9031\u516D'.split(
                  '_'
                ),
      weekdaysMin:
                '\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D'.split('_'),
      months: '\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708'.split(
        '_'
      ),
      monthsShort:
                '1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708'.split(
                  '_'
                ),
      ordinal: function (e, r) {
        return r === 'W' ? e + '\u9031' : e + '\u65E5'
      },
      formats: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY\u5E74M\u6708D\u65E5',
        LLL: 'YYYY\u5E74M\u6708D\u65E5 HH:mm',
        LLLL: 'YYYY\u5E74M\u6708D\u65E5dddd HH:mm',
        l: 'YYYY/M/D',
        ll: 'YYYY\u5E74M\u6708D\u65E5',
        lll: 'YYYY\u5E74M\u6708D\u65E5 HH:mm',
        llll: 'YYYY\u5E74M\u6708D\u65E5dddd HH:mm'
      },
      relativeTime: {
        future: '%s\u5167',
        past: '%s\u524D',
        s: '\u5E7E\u79D2',
        m: '1 \u5206\u9418',
        mm: '%d \u5206\u9418',
        h: '1 \u5C0F\u6642',
        hh: '%d \u5C0F\u6642',
        d: '1 \u5929',
        dd: '%d \u5929',
        M: '1 \u500B\u6708',
        MM: '%d \u500B\u6708',
        y: '1 \u5E74',
        yy: '%d \u5E74'
      },
      meridiem: function (e, r) {
        const a = 100 * e + r
        return a < 600
          ? '\u51CC\u6668'
          : a < 900
            ? '\u65E9\u4E0A'
            : a < 1100
              ? '\u4E0A\u5348'
              : a < 1300
                ? '\u4E2D\u5348'
                : a < 1800
                  ? '\u4E0B\u5348'
                  : '\u665A\u4E0A'
      }
    }
    return s.default.locale(i, null, !0), i
  })
})
const ln = 60
const mn = ln * 60
const cn = mn * 24
const ji = cn * 7
const ae = 1e3
const ce = ln * ae
const ge = mn * ae
const hn = cn * ae
const Mn = ji * ae
const _e = 'millisecond'
const te = 'second'
const ne = 'minute'
const ie = 'hour'
const V = 'day'
const oe = 'week'
const R = 'month'
const he = 'quarter'
const K = 'year'
const se = 'date'
const yn = 'YYYY-MM-DDTHH:mm:ssZ'
const Se = 'Invalid Date'
const Yn =
    /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
const pn =
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
const Ln = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
    '_'
  ),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
    '_'
  ),
  ordinal: function (t) {
    const s = ['th', 'st', 'nd', 'rd']
    const i = t % 100
    return '[' + t + (s[(i - 20) % 10] || s[i] || s[0]) + ']'
  }
}
const be = function (t, s, i) {
  const e = String(t)
  return !e || e.length >= s ? t : '' + Array(s + 1 - e.length).join(i) + t
}
const Ti = function (t) {
  const s = -t.utcOffset()
  const i = Math.abs(s)
  const e = Math.floor(i / 60)
  const r = i % 60
  return (s <= 0 ? '+' : '-') + be(e, 2, '0') + ':' + be(r, 2, '0')
}
const wi = function n (t, s) {
  if (t.date() < s.date()) return -n(s, t)
  const i = (s.year() - t.year()) * 12 + (s.month() - t.month())
  const e = t.clone().add(i, R)
  const r = s - e < 0
  const a = t.clone().add(i + (r ? -1 : 1), R)
  return +(-(i + (s - e) / (r ? e - a : a - e)) || 0)
}
const $i = function (t) {
  return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
}
const Ci = function (t) {
  const s = {
    M: R,
    y: K,
    w: oe,
    d: V,
    D: se,
    h: ie,
    m: ne,
    s: te,
    ms: _e,
    Q: he
  }
  return (
    s[t] ||
        String(t || '')
          .toLowerCase()
          .replace(/s$/, '')
  )
}
const Oi = function (t) {
  return t === void 0
}
const vn = { s: be, z: Ti, m: wi, a: $i, p: Ci, u: Oi }
let fe = 'en'
const ue = {}
ue[fe] = Ln
const gn = '$isDayjsObject'
const ke = function (t) {
  return t instanceof ye || !!(t && t[gn])
}
const Me = function n (t, s, i) {
  let e
  if (!t) return fe
  if (typeof t === 'string') {
    const r = t.toLowerCase()
    ue[r] && (e = r), s && ((ue[r] = s), (e = r))
    const a = t.split('-')
    if (!e && a.length > 1) return n(a[0])
  } else {
    const u = t.name;
    (ue[u] = t), (e = u)
  }
  return !i && e && (fe = e), e || (!i && fe)
}
const F = function (t, s) {
  if (ke(t)) return t.clone()
  const i = typeof s === 'object' ? s : {}
  return (i.date = t), (i.args = arguments), new ye(i)
}
const zi = function (t, s) {
  return F(t, { locale: s.$L, utc: s.$u, x: s.$x, $offset: s.$offset })
}
const z = vn
z.l = Me
z.i = ke
z.w = zi
const Ai = function (t) {
  const s = t.date
  const i = t.utc
  if (s === null) return new Date(NaN)
  if (z.u(s)) return new Date()
  if (s instanceof Date) return new Date(s)
  if (typeof s === 'string' && !/Z$/i.test(s)) {
    const e = s.match(Yn)
    if (e) {
      const r = e[2] - 1 || 0
      const a = (e[7] || '0').substring(0, 3)
      return i
        ? new Date(
          Date.UTC(
            e[1],
            r,
            e[3] || 1,
            e[4] || 0,
            e[5] || 0,
            e[6] || 0,
            a
          )
        )
        : new Date(
          e[1],
          r,
          e[3] || 1,
          e[4] || 0,
          e[5] || 0,
          e[6] || 0,
          a
        )
    }
  }
  return new Date(s)
}
var ye = (function () {
  function n (s) {
    (this.$L = Me(s.locale, null, !0)),
    this.parse(s),
    (this.$x = this.$x || s.x || {}),
    (this[gn] = !0)
  }
  const t = n.prototype
  return (
    (t.parse = function (i) {
      (this.$d = Ai(i)), this.init()
    }),
    (t.init = function () {
      const i = this.$d;
      (this.$y = i.getFullYear()),
      (this.$M = i.getMonth()),
      (this.$D = i.getDate()),
      (this.$W = i.getDay()),
      (this.$H = i.getHours()),
      (this.$m = i.getMinutes()),
      (this.$s = i.getSeconds()),
      (this.$ms = i.getMilliseconds())
    }),
    (t.$utils = function () {
      return z
    }),
    (t.isValid = function () {
      return this.$d.toString() !== Se
    }),
    (t.isSame = function (i, e) {
      const r = F(i)
      return this.startOf(e) <= r && r <= this.endOf(e)
    }),
    (t.isAfter = function (i, e) {
      return F(i) < this.startOf(e)
    }),
    (t.isBefore = function (i, e) {
      return this.endOf(e) < F(i)
    }),
    (t.$g = function (i, e, r) {
      return z.u(i) ? this[e] : this.set(r, i)
    }),
    (t.unix = function () {
      return Math.floor(this.valueOf() / 1e3)
    }),
    (t.valueOf = function () {
      return this.$d.getTime()
    }),
    (t.startOf = function (i, e) {
      const r = this
      const a = z.u(e) ? !0 : e
      const u = z.p(i)
      const o = function (D, w) {
        const g = z.w(
          r.$u ? Date.UTC(r.$y, w, D) : new Date(r.$y, w, D),
          r
        )
        return a ? g : g.endOf(V)
      }
      const d = function (D, w) {
        const g = [0, 0, 0, 0]
        const C = [23, 59, 59, 999]
        return z.w(
          r.toDate()[D].apply(r.toDate('s'), (a ? g : C).slice(w)),
          r
        )
      }
      const _ = this.$W
      const y = this.$M
      const l = this.$D
      const f = 'set' + (this.$u ? 'UTC' : '')
      switch (u) {
        case K:
          return a ? o(1, 0) : o(31, 11)
        case R:
          return a ? o(1, y) : o(0, y + 1)
        case oe: {
          const m = this.$locale().weekStart || 0
          const Y = (_ < m ? _ + 7 : _) - m
          return o(a ? l - Y : l + (6 - Y), y)
        }
        case V:
        case se:
          return d(f + 'Hours', 0)
        case ie:
          return d(f + 'Minutes', 1)
        case ne:
          return d(f + 'Seconds', 2)
        case te:
          return d(f + 'Milliseconds', 3)
        default:
          return this.clone()
      }
    }),
    (t.endOf = function (i) {
      return this.startOf(i, !1)
    }),
    (t.$set = function (i, e) {
      let r
      const a = z.p(i)
      const u = 'set' + (this.$u ? 'UTC' : '')
      const o = ((r = {}),
      (r[V] = u + 'Date'),
      (r[se] = u + 'Date'),
      (r[R] = u + 'Month'),
      (r[K] = u + 'FullYear'),
      (r[ie] = u + 'Hours'),
      (r[ne] = u + 'Minutes'),
      (r[te] = u + 'Seconds'),
      (r[_e] = u + 'Milliseconds'),
      r)[a]
      const d = a === V ? this.$D + (e - this.$W) : e
      if (a === R || a === K) {
        const _ = this.clone().set(se, 1)
        _.$d[o](d),
        _.init(),
        (this.$d = _.set(
          se,
          Math.min(this.$D, _.daysInMonth())
        ).$d)
      } else o && this.$d[o](d)
      return this.init(), this
    }),
    (t.set = function (i, e) {
      return this.clone().$set(i, e)
    }),
    (t.get = function (i) {
      return this[z.p(i)]()
    }),
    (t.add = function (i, e) {
      const r = this
      let a
      i = Number(i)
      const u = z.p(e)
      const o = function (l) {
        const f = F(r)
        return z.w(f.date(f.date() + Math.round(l * i)), r)
      }
      if (u === R) return this.set(R, this.$M + i)
      if (u === K) return this.set(K, this.$y + i)
      if (u === V) return o(1)
      if (u === oe) return o(7)
      const d =
                ((a = {}), (a[ne] = ce), (a[ie] = ge), (a[te] = ae), a)[u] || 1
      const _ = this.$d.getTime() + i * d
      return z.w(_, this)
    }),
    (t.subtract = function (i, e) {
      return this.add(i * -1, e)
    }),
    (t.format = function (i) {
      const e = this
      const r = this.$locale()
      if (!this.isValid()) return r.invalidDate || Se
      const a = i || yn
      const u = z.z(this)
      const o = this.$H
      const d = this.$m
      const _ = this.$M
      const y = r.weekdays
      const l = r.months
      const f = r.meridiem
      const m = function (g, C, A, q) {
        return (g && (g[C] || g(e, a))) || A[C].slice(0, q)
      }
      const Y = function (g) {
        return z.s(o % 12 || 12, g, '0')
      }
      const L =
                f ||
                function (w, g, C) {
                  const A = w < 12 ? 'AM' : 'PM'
                  return C ? A.toLowerCase() : A
                }
      const D = function (g) {
        switch (g) {
          case 'YY':
            return String(e.$y).slice(-2)
          case 'YYYY':
            return z.s(e.$y, 4, '0')
          case 'M':
            return _ + 1
          case 'MM':
            return z.s(_ + 1, 2, '0')
          case 'MMM':
            return m(r.monthsShort, _, l, 3)
          case 'MMMM':
            return m(l, _)
          case 'D':
            return e.$D
          case 'DD':
            return z.s(e.$D, 2, '0')
          case 'd':
            return String(e.$W)
          case 'dd':
            return m(r.weekdaysMin, e.$W, y, 2)
          case 'ddd':
            return m(r.weekdaysShort, e.$W, y, 3)
          case 'dddd':
            return y[e.$W]
          case 'H':
            return String(o)
          case 'HH':
            return z.s(o, 2, '0')
          case 'h':
            return Y(1)
          case 'hh':
            return Y(2)
          case 'a':
            return L(o, d, !0)
          case 'A':
            return L(o, d, !1)
          case 'm':
            return String(d)
          case 'mm':
            return z.s(d, 2, '0')
          case 's':
            return String(e.$s)
          case 'ss':
            return z.s(e.$s, 2, '0')
          case 'SSS':
            return z.s(e.$ms, 3, '0')
          case 'Z':
            return u
          default:
            break
        }
        return null
      }
      return a.replace(pn, function (w, g) {
        return g || D(w) || u.replace(':', '')
      })
    }),
    (t.utcOffset = function () {
      return -Math.round(this.$d.getTimezoneOffset() / 15) * 15
    }),
    (t.diff = function (i, e, r) {
      const a = this
      const u = z.p(e)
      const o = F(i)
      const d = (o.utcOffset() - this.utcOffset()) * ce
      const _ = this - o
      const y = function () {
        return z.m(a, o)
      }
      let l
      switch (u) {
        case K:
          l = y() / 12
          break
        case R:
          l = y()
          break
        case he:
          l = y() / 3
          break
        case oe:
          l = (_ - d) / Mn
          break
        case V:
          l = (_ - d) / hn
          break
        case ie:
          l = _ / ge
          break
        case ne:
          l = _ / ce
          break
        case te:
          l = _ / ae
          break
        default:
          l = _
          break
      }
      return r ? l : z.a(l)
    }),
    (t.daysInMonth = function () {
      return this.endOf(R).$D
    }),
    (t.$locale = function () {
      return ue[this.$L]
    }),
    (t.locale = function (i, e) {
      if (!i) return this.$L
      const r = this.clone()
      const a = Me(i, e, !0)
      return a && (r.$L = a), r
    }),
    (t.clone = function () {
      return z.w(this.$d, this)
    }),
    (t.toDate = function () {
      return new Date(this.valueOf())
    }),
    (t.toJSON = function () {
      return this.isValid() ? this.toISOString() : null
    }),
    (t.toISOString = function () {
      return this.$d.toISOString()
    }),
    (t.toString = function () {
      return this.$d.toUTCString()
    }),
    n
  )
})()
const Sn = ye.prototype
F.prototype = Sn;
[
  ['$ms', _e],
  ['$s', te],
  ['$m', ne],
  ['$H', ie],
  ['$W', V],
  ['$M', R],
  ['$y', K],
  ['$D', se]
].forEach(function (n) {
  Sn[n[1]] = function (t) {
    return this.$g(t, n[0], n[1])
  }
})
F.extend = function (n, t) {
  return n.$i || (n(t, ye, F), (n.$i = !0)), F
}
F.locale = Me
F.isDayjs = ke
F.unix = function (n) {
  return F(n * 1e3)
}
F.en = ue[fe]
F.Ls = ue
F.p = {}
const O = F
const yi = de(bn(), 1)
const Yi = de(kn(), 1)
const pi = de(Hn(), 1)
const Di = de(jn(), 1)
const Li = de(Tn(), 1)
O.extend(yi.default)
O.extend(Yi.default)
O.extend(pi.default)
O.extend(Di.default)
O.extend(Li.default)
window.dayjs = O
function Ii ({
  displayFormat: n,
  firstDayOfWeek: t,
  isAutofocused: s,
  locale: i,
  shouldCloseOnDateSelection: e,
  state: r
}) {
  const a = O.tz.guess()
  return {
    daysInFocusedMonth: [],
    displayText: '',
    emptyDaysInFocusedMonth: [],
    focusedDate: null,
    focusedMonth: null,
    focusedYear: null,
    hour: null,
    isClearingState: !1,
    minute: null,
    second: null,
    state: r,
    dayLabels: [],
    months: [],
    init: function () {
      O.locale(Mi[i] ?? Mi.en), (this.focusedDate = O().tz(a))
      let u =
                this.getSelectedDate() ?? O().tz(a).hour(0).minute(0).second(0);
      ((this.getMaxDate() !== null && u.isAfter(this.getMaxDate())) ||
                (this.getMinDate() !== null &&
                    u.isBefore(this.getMinDate()))) &&
                (u = null),
      (this.hour = u?.hour() ?? 0),
      (this.minute = u?.minute() ?? 0),
      (this.second = u?.second() ?? 0),
      this.setDisplayText(),
      this.setMonths(),
      this.setDayLabels(),
      s &&
                    this.$nextTick(() =>
                      this.togglePanelVisibility(this.$refs.button)
                    ),
      this.$watch('focusedMonth', () => {
        (this.focusedMonth = +this.focusedMonth),
        this.focusedDate.month() !== this.focusedMonth &&
                            (this.focusedDate = this.focusedDate.month(
                              this.focusedMonth
                            ))
      }),
      this.$watch('focusedYear', () => {
        if (
          (this.focusedYear?.length > 4 &&
                            (this.focusedYear = this.focusedYear.substring(
                              0,
                              4
                            )),
          !this.focusedYear || this.focusedYear?.length !== 4)
        ) {
          return
        }
        let o = +this.focusedYear
        Number.isInteger(o) ||
                        ((o = O().tz(a).year()), (this.focusedYear = o)),
        this.focusedDate.year() !== o &&
                            (this.focusedDate = this.focusedDate.year(o))
      }),
      this.$watch('focusedDate', () => {
        const o = this.focusedDate.month()
        const d = this.focusedDate.year()
        this.focusedMonth !== o && (this.focusedMonth = o),
        this.focusedYear !== d && (this.focusedYear = d),
        this.setupDaysGrid()
      }),
      this.$watch('hour', () => {
        const o = +this.hour
        if (
          (Number.isInteger(o)
            ? o > 23
              ? (this.hour = 0)
              : o < 0
                ? (this.hour = 23)
                : (this.hour = o)
            : (this.hour = 0),
          this.isClearingState)
        ) {
          return
        }
        const d = this.getSelectedDate() ?? this.focusedDate
        this.setState(d.hour(this.hour ?? 0))
      }),
      this.$watch('minute', () => {
        const o = +this.minute
        if (
          (Number.isInteger(o)
            ? o > 59
              ? (this.minute = 0)
              : o < 0
                ? (this.minute = 59)
                : (this.minute = o)
            : (this.minute = 0),
          this.isClearingState)
        ) {
          return
        }
        const d = this.getSelectedDate() ?? this.focusedDate
        this.setState(d.minute(this.minute ?? 0))
      }),
      this.$watch('second', () => {
        const o = +this.second
        if (
          (Number.isInteger(o)
            ? o > 59
              ? (this.second = 0)
              : o < 0
                ? (this.second = 59)
                : (this.second = o)
            : (this.second = 0),
          this.isClearingState)
        ) {
          return
        }
        const d = this.getSelectedDate() ?? this.focusedDate
        this.setState(d.second(this.second ?? 0))
      }),
      this.$watch('state', () => {
        if (this.state === void 0) return
        let o = this.getSelectedDate()
        if (o === null) {
          this.clearState()
          return
        }
        this.getMaxDate() !== null &&
                        o?.isAfter(this.getMaxDate()) &&
                        (o = null),
        this.getMinDate() !== null &&
                            o?.isBefore(this.getMinDate()) &&
                            (o = null)
        const d = o?.hour() ?? 0
        this.hour !== d && (this.hour = d)
        const _ = o?.minute() ?? 0
        this.minute !== _ && (this.minute = _)
        const y = o?.second() ?? 0
        this.second !== y && (this.second = y),
        this.setDisplayText()
      })
    },
    clearState: function () {
      (this.isClearingState = !0),
      this.setState(null),
      (this.hour = 0),
      (this.minute = 0),
      (this.second = 0),
      this.$nextTick(() => (this.isClearingState = !1))
    },
    dateIsDisabled: function (u) {
      return !!(
        (this.$refs?.disabledDates &&
                    JSON.parse(this.$refs.disabledDates.value ?? []).some(
                      (o) => (
                        (o = O(o)), o.isValid() ? o.isSame(u, 'day') : !1
                      )
                    )) ||
                (this.getMaxDate() && u.isAfter(this.getMaxDate(), 'day')) ||
                (this.getMinDate() && u.isBefore(this.getMinDate(), 'day'))
      )
    },
    dayIsDisabled: function (u) {
      return (
        this.focusedDate ?? (this.focusedDate = O().tz(a)),
        this.dateIsDisabled(this.focusedDate.date(u))
      )
    },
    dayIsSelected: function (u) {
      const o = this.getSelectedDate()
      return o === null
        ? !1
        : (this.focusedDate ?? (this.focusedDate = O().tz(a)),
          o.date() === u &&
                      o.month() === this.focusedDate.month() &&
                      o.year() === this.focusedDate.year())
    },
    dayIsToday: function (u) {
      const o = O().tz(a)
      return (
        this.focusedDate ?? (this.focusedDate = o),
        o.date() === u &&
                    o.month() === this.focusedDate.month() &&
                    o.year() === this.focusedDate.year()
      )
    },
    focusPreviousDay: function () {
      this.focusedDate ?? (this.focusedDate = O().tz(a)),
      (this.focusedDate = this.focusedDate.subtract(1, 'day'))
    },
    focusPreviousWeek: function () {
      this.focusedDate ?? (this.focusedDate = O().tz(a)),
      (this.focusedDate = this.focusedDate.subtract(1, 'week'))
    },
    focusNextDay: function () {
      this.focusedDate ?? (this.focusedDate = O().tz(a)),
      (this.focusedDate = this.focusedDate.add(1, 'day'))
    },
    focusNextWeek: function () {
      this.focusedDate ?? (this.focusedDate = O().tz(a)),
      (this.focusedDate = this.focusedDate.add(1, 'week'))
    },
    getDayLabels: function () {
      const u = O.weekdaysShort()
      return t === 0 ? u : [...u.slice(t), ...u.slice(0, t)]
    },
    getMaxDate: function () {
      const u = O(this.$refs.maxDate?.value)
      return u.isValid() ? u : null
    },
    getMinDate: function () {
      const u = O(this.$refs.minDate?.value)
      return u.isValid() ? u : null
    },
    getSelectedDate: function () {
      if (this.state === void 0 || this.state === null) return null
      const u = O(this.state)
      return u.isValid() ? u : null
    },
    togglePanelVisibility: function () {
      this.isOpen() ||
                ((this.focusedDate =
                    this.getSelectedDate() ?? this.getMinDate() ?? O().tz(a)),
                this.setupDaysGrid()),
      this.$refs.panel.toggle(this.$refs.button)
    },
    selectDate: function (u = null) {
      u && this.setFocusedDay(u),
      this.focusedDate ?? (this.focusedDate = O().tz(a)),
      this.setState(this.focusedDate),
      e && this.togglePanelVisibility()
    },
    setDisplayText: function () {
      this.displayText = this.getSelectedDate()
        ? this.getSelectedDate().format(n)
        : ''
    },
    setMonths: function () {
      this.months = O.months()
    },
    setDayLabels: function () {
      this.dayLabels = this.getDayLabels()
    },
    setupDaysGrid: function () {
      this.focusedDate ?? (this.focusedDate = O().tz(a)),
      (this.emptyDaysInFocusedMonth = Array.from(
        { length: this.focusedDate.date(8 - t).day() },
        (u, o) => o + 1
      )),
      (this.daysInFocusedMonth = Array.from(
        { length: this.focusedDate.daysInMonth() },
        (u, o) => o + 1
      ))
    },
    setFocusedDay: function (u) {
      this.focusedDate = (this.focusedDate ?? O().tz(a)).date(u)
    },
    setState: function (u) {
      if (u === null) {
        (this.state = null), this.setDisplayText()
        return
      }
      this.dateIsDisabled(u) ||
                ((this.state = u
                  .hour(this.hour ?? 0)
                  .minute(this.minute ?? 0)
                  .second(this.second ?? 0)
                  .format('YYYY-MM-DD HH:mm:ss')),
                this.setDisplayText())
    },
    isOpen: function () {
      return this.$refs.panel?.style.display === 'block'
    }
  }
}
var Mi = {
  ar: wn(),
  bs: $n(),
  ca: Cn(),
  ckb: Pe(),
  cs: zn(),
  cy: An(),
  da: In(),
  de: qn(),
  en: xn(),
  es: Nn(),
  et: En(),
  fa: Fn(),
  fi: Jn(),
  fr: Wn(),
  hi: Un(),
  hu: Pn(),
  hy: Rn(),
  id: Gn(),
  it: Zn(),
  ja: Vn(),
  ka: Kn(),
  km: Qn(),
  ku: Pe(),
  lt: Xn(),
  lv: Bn(),
  ms: ei(),
  my: ti(),
  nl: ni(),
  no: ii(),
  pl: si(),
  pt_BR: ri(),
  pt_PT: ai(),
  ro: ui(),
  ru: oi(),
  sv: di(),
  th: _i(),
  tr: fi(),
  uk: li(),
  vi: mi(),
  zh_CN: ci(),
  zh_TW: hi()
}
export { Ii as default }
