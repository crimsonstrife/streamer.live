const Gi = Object.create
const On = Object.defineProperty
const Qi = Object.getOwnPropertyDescriptor
const Ji = Object.getOwnPropertyNames
const Ki = Object.getPrototypeOf
const Zi = Object.prototype.hasOwnProperty
const er = (h, N) => () => (
  N || h((N = { exports: {} }).exports, N), N.exports
)
const tr = (h, N, D, Y) => {
  if ((N && typeof N === 'object') || typeof N === 'function') {
    for (const k of Ji(N)) {
      !Zi.call(h, k) &&
                k !== D &&
                On(h, k, {
                  get: () => N[k],
                  enumerable: !(Y = Qi(N, k)) || Y.enumerable
                })
    }
  }
  return h
}
const Mn = (h, N, D) => (
  (D = h != null ? Gi(Ki(h)) : {}),
  tr(
    N || !h || !h.__esModule
      ? On(D, 'default', { value: h, enumerable: !0 })
      : D,
    h
  )
)
const at = er((Rn, bt) => {
  (function (h, N) {
    'use strict'
    typeof bt === 'object' && typeof bt.exports === 'object'
      ? (bt.exports = h.document
          ? N(h, !0)
          : function (D) {
            if (!D.document) {
              throw new Error(
                'jQuery requires a window with a document'
              )
            }
            return N(D)
          })
      : N(h)
  })(typeof window < 'u' ? window : Rn, function (h, N) {
    'use strict'
    let D = []
    const Y = Object.getPrototypeOf
    const k = D.slice
    const W = D.flat
      ? function (e) {
        return D.flat.call(e)
      }
      : function (e) {
        return D.concat.apply([], e)
      }
    const I = D.push
    const E = D.indexOf
    const ce = {}
    const Ce = ce.toString
    const ae = ce.hasOwnProperty
    const Me = ae.toString
    const xt = Me.call(Object)
    const O = {}
    const M = function (t) {
      return (
        typeof t === 'function' &&
                typeof t.nodeType !== 'number' &&
                typeof t.item !== 'function'
      )
    }
    const Re = function (t) {
      return t != null && t === t.window
    }
    const P = h.document
    const Wn = { type: !0, src: !0, nonce: !0, noModule: !0 }
    function zt (e, t, n) {
      n = n || P
      let i
      let o
      const s = n.createElement('script')
      if (((s.text = e), t)) {
        for (i in Wn) {
          (o = t[i] || (t.getAttribute && t.getAttribute(i))),
          o && s.setAttribute(i, o)
        }
      }
      n.head.appendChild(s).parentNode.removeChild(s)
    }
    function Ie (e) {
      return e == null
        ? e + ''
        : typeof e === 'object' || typeof e === 'function'
          ? ce[Ce.call(e)] || 'object'
          : typeof e
    }
    const Ut = '3.7.1'
    const Fn = /HTML$/i
    const r = function (e, t) {
      return new r.fn.init(e, t)
    };
    (r.fn = r.prototype =
            {
              jquery: Ut,
              constructor: r,
              length: 0,
              toArray: function () {
                return k.call(this)
              },
              get: function (e) {
                return e == null
                  ? k.call(this)
                  : e < 0
                    ? this[e + this.length]
                    : this[e]
              },
              pushStack: function (e) {
                const t = r.merge(this.constructor(), e)
                return (t.prevObject = this), t
              },
              each: function (e) {
                return r.each(this, e)
              },
              map: function (e) {
                return this.pushStack(
                  r.map(this, function (t, n) {
                    return e.call(t, n, t)
                  })
                )
              },
              slice: function () {
                return this.pushStack(k.apply(this, arguments))
              },
              first: function () {
                return this.eq(0)
              },
              last: function () {
                return this.eq(-1)
              },
              even: function () {
                return this.pushStack(
                  r.grep(this, function (e, t) {
                    return (t + 1) % 2
                  })
                )
              },
              odd: function () {
                return this.pushStack(
                  r.grep(this, function (e, t) {
                    return t % 2
                  })
                )
              },
              eq: function (e) {
                const t = this.length
                const n = +e + (e < 0 ? t : 0)
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
              },
              end: function () {
                return this.prevObject || this.constructor()
              },
              push: I,
              sort: D.sort,
              splice: D.splice
            }),
    (r.extend = r.fn.extend =
                function () {
                  let e
                  let t
                  let n
                  let i
                  let o
                  let s
                  let a = arguments[0] || {}
                  let l = 1
                  const f = arguments.length
                  let d = !1
                  for (
                    typeof a === 'boolean' &&
                            ((d = a), (a = arguments[l] || {}), l++),
                    typeof a !== 'object' && !M(a) && (a = {}),
                    l === f && ((a = this), l--);
                    l < f;
                    l++
                  ) {
                    if ((e = arguments[l]) != null) {
                      for (t in e) {
                        (i = e[t]),
                        !(t === '__proto__' || a === i) &&
                                        (d &&
                                        i &&
                                        (r.isPlainObject(i) ||
                                            (o = Array.isArray(i)))
                                          ? ((n = a[t]),
                                            o && !Array.isArray(n)
                                              ? (s = [])
                                              : !o && !r.isPlainObject(n)
                                                  ? (s = {})
                                                  : (s = n),
                                            (o = !1),
                                            (a[t] = r.extend(d, s, i)))
                                          : i !== void 0 && (a[t] = i))
                      }
                    }
                  }
                  return a
                }),
    r.extend({
      expando: 'jQuery' + (Ut + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function (e) {
        throw new Error(e)
      },
      noop: function () {},
      isPlainObject: function (e) {
        let t, n
        return !e || Ce.call(e) !== '[object Object]'
          ? !1
          : ((t = Y(e)),
            t
              ? ((n =
                                    ae.call(t, 'constructor') && t.constructor),
                typeof n === 'function' && Me.call(n) === xt)
              : !0)
      },
      isEmptyObject: function (e) {
        let t
        for (t in e) return !1
        return !0
      },
      globalEval: function (e, t, n) {
        zt(e, { nonce: t && t.nonce }, n)
      },
      each: function (e, t) {
        let n
        let i = 0
        if (Ct(e)) {
          for (
            n = e.length;
            i < n && t.call(e[i], i, e[i]) !== !1;
            i++
          );
        } else for (i in e) if (t.call(e[i], i, e[i]) === !1) break
        return e
      },
      text: function (e) {
        let t
        let n = ''
        let i = 0
        const o = e.nodeType
        if (!o) for (; (t = e[i++]);) n += r.text(t)
        return o === 1 || o === 11
          ? e.textContent
          : o === 9
            ? e.documentElement.textContent
            : o === 3 || o === 4
              ? e.nodeValue
              : n
      },
      makeArray: function (e, t) {
        const n = t || []
        return (
          e != null &&
                            (Ct(Object(e))
                              ? r.merge(n, typeof e === 'string' ? [e] : e)
                              : I.call(n, e)),
          n
        )
      },
      inArray: function (e, t, n) {
        return t == null ? -1 : E.call(t, e, n)
      },
      isXMLDoc: function (e) {
        const t = e && e.namespaceURI
        const n = e && (e.ownerDocument || e).documentElement
        return !Fn.test(t || (n && n.nodeName) || 'HTML')
      },
      merge: function (e, t) {
        for (var n = +t.length, i = 0, o = e.length; i < n; i++) {
          e[o++] = t[i]
        }
        return (e.length = o), e
      },
      grep: function (e, t, n) {
        for (
          var i, o = [], s = 0, a = e.length, l = !n;
          s < a;
          s++
        ) {
          (i = !t(e[s], s)), i !== l && o.push(e[s])
        }
        return o
      },
      map: function (e, t, n) {
        let i
        let o
        let s = 0
        const a = []
        if (Ct(e)) {
          for (i = e.length; s < i; s++) {
            (o = t(e[s], s, n)), o != null && a.push(o)
          }
        } else {
          for (s in e) {
            (o = t(e[s], s, n)), o != null && a.push(o)
          }
        }
        return W(a)
      },
      guid: 1,
      support: O
    }),
    typeof Symbol === 'function' &&
                (r.fn[Symbol.iterator] = D[Symbol.iterator]),
    r.each(
      'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
        ' '
      ),
      function (e, t) {
        ce['[object ' + t + ']'] = t.toLowerCase()
      }
    )
    function Ct (e) {
      const t = !!e && 'length' in e && e.length
      const n = Ie(e)
      return M(e) || Re(e)
        ? !1
        : n === 'array' ||
                      t === 0 ||
                      (typeof t === 'number' && t > 0 && t - 1 in e)
    }
    function Q (e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    const Yn = D.pop
    const Bn = D.sort
    const $n = D.splice
    const U = '[\\x20\\t\\r\\n\\f]'
    const Ge = new RegExp(
      '^' + U + '+|((?:^|[^\\\\])(?:\\\\.)*)' + U + '+$',
      'g'
    )
    r.contains = function (e, t) {
      const n = t && t.parentNode
      return (
        e === n ||
                !!(
                  n &&
                    n.nodeType === 1 &&
                    (e.contains
                      ? e.contains(n)
                      : e.compareDocumentPosition &&
                          e.compareDocumentPosition(n) & 16)
                )
      )
    }
    const zn = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g
    function Un (e, t) {
      return t
        ? e === '\0'
          ? '\uFFFD'
          : e.slice(0, -1) +
                      '\\' +
                      e.charCodeAt(e.length - 1).toString(16) +
                      ' '
        : '\\' + e
    }
    r.escapeSelector = function (e) {
      return (e + '').replace(zn, Un)
    }
    const Te = P
    const Tt = I;
    (function () {
      let e
      let t
      let n
      let i
      let o
      let s = Tt
      let a
      let l
      let f
      let d
      let v
      const b = r.expando
      let g = 0
      let x = 0
      const H = gt()
      const B = gt()
      const R = gt()
      const Z = gt()
      let K = function (u, c) {
        return u === c && (o = !0), 0
      }
      const ye =
                'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped'
      const ve =
                '(?:\\\\[\\da-fA-F]{1,6}' +
                U +
                '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+'
      const F =
                '\\[' +
                U +
                '*(' +
                ve +
                ')(?:' +
                U +
                '*([*^$|!~]?=)' +
                U +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                ve +
                '))|)' +
                U +
                '*\\]'
      const Pe =
                ':(' +
                ve +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                F +
                ')*)|.*)\\)|)'
      const $ = new RegExp(U + '+', 'g')
      const J = new RegExp('^' + U + '*,' + U + '*')
      const rt = new RegExp('^' + U + '*([>+~]|' + U + ')' + U + '*')
      const Xt = new RegExp(U + '|>')
      const me = new RegExp(Pe)
      const ot = new RegExp('^' + ve + '$')
      const be = {
        ID: new RegExp('^#(' + ve + ')'),
        CLASS: new RegExp('^\\.(' + ve + ')'),
        TAG: new RegExp('^(' + ve + '|[*])'),
        ATTR: new RegExp('^' + F),
        PSEUDO: new RegExp('^' + Pe),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                        U +
                        '*(even|odd|(([+-]|)(\\d*)n|)' +
                        U +
                        '*(?:([+-]|)' +
                        U +
                        '*(\\d+)|))' +
                        U +
                        '*\\)|)',
          'i'
        ),
        bool: new RegExp('^(?:' + ye + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
                        U +
                        '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                        U +
                        '*((?:-\\d)?\\d*)' +
                        U +
                        '*\\)|)(?=[^-]|$)',
          'i'
        )
      }
      const De = /^(?:input|select|textarea|button)$/i
      const ke = /^h\d$/i
      const fe = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/
      const _t = /[+~]/
      const Ne = new RegExp(
        '\\\\[\\da-fA-F]{1,6}' + U + '?|\\\\([^\\r\\n\\f])',
        'g'
      )
      const Se = function (u, c) {
        const p = '0x' + u.slice(1) - 65536
        return (
          c ||
                    (p < 0
                      ? String.fromCharCode(p + 65536)
                      : String.fromCharCode(
                        (p >> 10) | 55296,
                        (p & 1023) | 56320
                      ))
        )
      }
      const Fi = function () {
        je()
      }
      const Yi = vt(
        function (u) {
          return u.disabled === !0 && Q(u, 'fieldset')
        },
        { dir: 'parentNode', next: 'legend' }
      )
      function Bi () {
        try {
          return a.activeElement
        } catch {}
      }
      try {
        s.apply((D = k.call(Te.childNodes)), Te.childNodes),
        D[Te.childNodes.length].nodeType
      } catch {
        s = {
          apply: function (c, p) {
            Tt.apply(c, k.call(p))
          },
          call: function (c) {
            Tt.apply(c, k.call(arguments, 1))
          }
        }
      }
      function z (u, c, p, y) {
        let m
        let C
        let T
        let S
        let w
        let X
        let L
        let q = c && c.ownerDocument
        const _ = c ? c.nodeType : 9
        if (
          ((p = p || []),
          typeof u !== 'string' ||
                        !u ||
                        (_ !== 1 && _ !== 9 && _ !== 11))
        ) {
          return p
        }
        if (!y && (je(c), (c = c || a), f)) {
          if (_ !== 11 && (w = fe.exec(u))) {
            if ((m = w[1])) {
              if (_ === 9) {
                if ((T = c.getElementById(m))) {
                  if (T.id === m) return s.call(p, T), p
                } else return p
              } else if (
                q &&
                                (T = q.getElementById(m)) &&
                                z.contains(c, T) &&
                                T.id === m
              ) {
                return s.call(p, T), p
              }
            } else {
              if (w[2]) {
                return s.apply(p, c.getElementsByTagName(u)), p
              }
              if ((m = w[3]) && c.getElementsByClassName) {
                return (
                  s.apply(p, c.getElementsByClassName(m)), p
                )
              }
            }
          }
          if (!Z[u + ' '] && (!d || !d.test(u))) {
            if (
              ((L = u),
              (q = c),
              _ === 1 && (Xt.test(u) || rt.test(u)))
            ) {
              for (
                q = (_t.test(u) && Wt(c.parentNode)) || c,
                (q != c || !O.scope) &&
                                        ((S = c.getAttribute('id'))
                                          ? (S = r.escapeSelector(S))
                                          : c.setAttribute('id', (S = b))),
                X = st(u),
                C = X.length;
                C--;

              ) {
                X[C] =
                                    (S ? '#' + S : ':scope') + ' ' + yt(X[C])
              }
              L = X.join(',')
            }
            try {
              return s.apply(p, q.querySelectorAll(L)), p
            } catch {
              Z(u, !0)
            } finally {
              S === b && c.removeAttribute('id')
            }
          }
        }
        return Pn(u.replace(Ge, '$1'), c, p, y)
      }
      function gt () {
        const u = []
        function c (p, y) {
          return (
            u.push(p + ' ') > t.cacheLength && delete c[u.shift()],
            (c[p + ' '] = y)
          )
        }
        return c
      }
      function pe (u) {
        return (u[b] = !0), u
      }
      function Ue (u) {
        let c = a.createElement('fieldset')
        try {
          return !!u(c)
        } catch {
          return !1
        } finally {
          c.parentNode && c.parentNode.removeChild(c), (c = null)
        }
      }
      function $i (u) {
        return function (c) {
          return Q(c, 'input') && c.type === u
        }
      }
      function zi (u) {
        return function (c) {
          return (Q(c, 'input') || Q(c, 'button')) && c.type === u
        }
      }
      function Hn (u) {
        return function (c) {
          return 'form' in c
            ? c.parentNode && c.disabled === !1
              ? 'label' in c
                ? 'label' in c.parentNode
                  ? c.parentNode.disabled === u
                  : c.disabled === u
                : c.isDisabled === u ||
                                  (c.isDisabled !== !u && Yi(c) === u)
              : c.disabled === u
            : 'label' in c
              ? c.disabled === u
              : !1
        }
      }
      function Oe (u) {
        return pe(function (c) {
          return (
            (c = +c),
            pe(function (p, y) {
              for (
                var m, C = u([], p.length, c), T = C.length;
                T--;

              ) {
                p[(m = C[T])] && (p[m] = !(y[m] = p[m]))
              }
            })
          )
        })
      }
      function Wt (u) {
        return u && typeof u.getElementsByTagName < 'u' && u
      }
      function je (u) {
        let c
        const p = u ? u.ownerDocument || u : Te
        return (
          p == a ||
                        p.nodeType !== 9 ||
                        !p.documentElement ||
                        ((a = p),
                        (l = a.documentElement),
                        (f = !r.isXMLDoc(a)),
                        (v =
                            l.matches ||
                            l.webkitMatchesSelector ||
                            l.msMatchesSelector),
                        l.msMatchesSelector &&
                            Te != a &&
                            (c = a.defaultView) &&
                            c.top !== c &&
                            c.addEventListener('unload', Fi),
                        (O.getById = Ue(function (y) {
                          return (
                            (l.appendChild(y).id = r.expando),
                            !a.getElementsByName ||
                                    !a.getElementsByName(r.expando).length
                          )
                        })),
                        (O.disconnectedMatch = Ue(function (y) {
                          return v.call(y, '*')
                        })),
                        (O.scope = Ue(function () {
                          return a.querySelectorAll(':scope')
                        })),
                        (O.cssHas = Ue(function () {
                          try {
                            return a.querySelector(':has(*,:jqfake)'), !1
                          } catch {
                            return !0
                          }
                        })),
                        O.getById
                          ? ((t.filter.ID = function (y) {
                              const m = y.replace(Ne, Se)
                              return function (C) {
                                return C.getAttribute('id') === m
                              }
                            }),
                            (t.find.ID = function (y, m) {
                              if (typeof m.getElementById < 'u' && f) {
                                const C = m.getElementById(y)
                                return C ? [C] : []
                              }
                            }))
                          : ((t.filter.ID = function (y) {
                              const m = y.replace(Ne, Se)
                              return function (C) {
                                const T =
                                          typeof C.getAttributeNode < 'u' &&
                                          C.getAttributeNode('id')
                                return T && T.value === m
                              }
                            }),
                            (t.find.ID = function (y, m) {
                              if (typeof m.getElementById < 'u' && f) {
                                let C
                                let T
                                let S
                                let w = m.getElementById(y)
                                if (w) {
                                  if (
                                    ((C = w.getAttributeNode('id')),
                                    C && C.value === y)
                                  ) {
                                    return [w]
                                  }
                                  for (
                                    S = m.getElementsByName(y), T = 0;
                                    (w = S[T++]);

                                  ) {
                                    if (
                                      ((C =
                                                      w.getAttributeNode('id')),
                                      C && C.value === y)
                                    ) {
                                      return [w]
                                    }
                                  }
                                }
                                return []
                              }
                            })),
                        (t.find.TAG = function (y, m) {
                          return typeof m.getElementsByTagName < 'u'
                            ? m.getElementsByTagName(y)
                            : m.querySelectorAll(y)
                        }),
                        (t.find.CLASS = function (y, m) {
                          if (typeof m.getElementsByClassName < 'u' && f) {
                            return m.getElementsByClassName(y)
                          }
                        }),
                        (d = []),
                        Ue(function (y) {
                          let m;
                          (l.appendChild(y).innerHTML =
                                "<a id='" +
                                b +
                                "' href='' disabled='disabled'></a><select id='" +
                                b +
                                "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                          y.querySelectorAll('[selected]').length ||
                                    d.push('\\[' + U + '*(?:value|' + ye + ')'),
                          y.querySelectorAll('[id~=' + b + '-]').length ||
                                    d.push('~='),
                          y.querySelectorAll('a#' + b + '+*').length ||
                                    d.push('.#.+[+~]'),
                          y.querySelectorAll(':checked').length ||
                                    d.push(':checked'),
                          (m = a.createElement('input')),
                          m.setAttribute('type', 'hidden'),
                          y.appendChild(m).setAttribute('name', 'D'),
                          (l.appendChild(y).disabled = !0),
                          y.querySelectorAll(':disabled').length !== 2 &&
                                    d.push(':enabled', ':disabled'),
                          (m = a.createElement('input')),
                          m.setAttribute('name', ''),
                          y.appendChild(m),
                          y.querySelectorAll("[name='']").length ||
                                    d.push(
                                      '\\[' +
                                            U +
                                            '*name' +
                                            U +
                                            '*=' +
                                            U +
                                            "*(?:''|\"\")"
                                    )
                        }),
                        O.cssHas || d.push(':has'),
                        (d = d.length && new RegExp(d.join('|'))),
                        (K = function (y, m) {
                          if (y === m) return (o = !0), 0
                          let C =
                                !y.compareDocumentPosition -
                                !m.compareDocumentPosition
                          return (
                            C ||
                                ((C =
                                    (y.ownerDocument || y) ==
                                    (m.ownerDocument || m)
                                      ? y.compareDocumentPosition(m)
                                      : 1),
                                C & 1 ||
                                (!O.sortDetached &&
                                    m.compareDocumentPosition(y) === C)
                                  ? y === a ||
                                      (y.ownerDocument == Te &&
                                          z.contains(Te, y))
                                    ? -1
                                    : m === a ||
                                            (m.ownerDocument == Te &&
                                                z.contains(Te, m))
                                      ? 1
                                      : i
                                        ? E.call(i, y) - E.call(i, m)
                                        : 0
                                  : C & 4
                                    ? -1
                                    : 1)
                          )
                        })),
          a
        )
      }
      (z.matches = function (u, c) {
        return z(u, null, null, c)
      }),
      (z.matchesSelector = function (u, c) {
        if ((je(u), f && !Z[c + ' '] && (!d || !d.test(c)))) {
          try {
            const p = v.call(u, c)
            if (
              p ||
                                O.disconnectedMatch ||
                                (u.document && u.document.nodeType !== 11)
            ) {
              return p
            }
          } catch {
            Z(c, !0)
          }
        }
        return z(c, a, null, [u]).length > 0
      }),
      (z.contains = function (u, c) {
        return (
          (u.ownerDocument || u) != a && je(u), r.contains(u, c)
        )
      }),
      (z.attr = function (u, c) {
        (u.ownerDocument || u) != a && je(u)
        const p = t.attrHandle[c.toLowerCase()]
        const y =
                        p && ae.call(t.attrHandle, c.toLowerCase())
                          ? p(u, c, !f)
                          : void 0
        return y !== void 0 ? y : u.getAttribute(c)
      }),
      (z.error = function (u) {
        throw new Error(
          'Syntax error, unrecognized expression: ' + u
        )
      }),
      (r.uniqueSort = function (u) {
        let c
        const p = []
        let y = 0
        let m = 0
        if (
          ((o = !O.sortStable),
          (i = !O.sortStable && k.call(u, 0)),
          Bn.call(u, K),
          o)
        ) {
          for (; (c = u[m++]);) c === u[m] && (y = p.push(m))
          for (; y--;) $n.call(u, p[y], 1)
        }
        return (i = null), u
      }),
      (r.fn.uniqueSort = function () {
        return this.pushStack(r.uniqueSort(k.apply(this)))
      }),
      (t = r.expr =
                    {
                      cacheLength: 50,
                      createPseudo: pe,
                      match: be,
                      attrHandle: {},
                      find: {},
                      relative: {
                        '>': { dir: 'parentNode', first: !0 },
                        ' ': { dir: 'parentNode' },
                        '+': { dir: 'previousSibling', first: !0 },
                        '~': { dir: 'previousSibling' }
                      },
                      preFilter: {
                        ATTR: function (u) {
                          return (
                            (u[1] = u[1].replace(Ne, Se)),
                            (u[3] = (
                              u[3] ||
                                        u[4] ||
                                        u[5] ||
                                        ''
                            ).replace(Ne, Se)),
                            u[2] === '~=' && (u[3] = ' ' + u[3] + ' '),
                            u.slice(0, 4)
                          )
                        },
                        CHILD: function (u) {
                          return (
                            (u[1] = u[1].toLowerCase()),
                            u[1].slice(0, 3) === 'nth'
                              ? (u[3] || z.error(u[0]),
                                (u[4] = +(u[4]
                                  ? u[5] + (u[6] || 1)
                                  : 2 *
                                                (u[3] === 'even' ||
                                                    u[3] === 'odd'))),
                                (u[5] = +(
                                  u[7] + u[8] || u[3] === 'odd'
                                )))
                              : u[3] && z.error(u[0]),
                            u
                          )
                        },
                        PSEUDO: function (u) {
                          let c
                          const p = !u[6] && u[2]
                          return be.CHILD.test(u[0])
                            ? null
                            : (u[3]
                                ? (u[2] = u[4] || u[5] || '')
                                : p &&
                                            me.test(p) &&
                                            (c = st(p, !0)) &&
                                            (c =
                                                p.indexOf(')', p.length - c) -
                                                p.length) &&
                                            ((u[0] = u[0].slice(0, c)),
                                            (u[2] = p.slice(0, c))),
                              u.slice(0, 3))
                        }
                      },
                      filter: {
                        TAG: function (u) {
                          const c = u.replace(Ne, Se).toLowerCase()
                          return u === '*'
                            ? function () {
                              return !0
                            }
                            : function (p) {
                              return Q(p, c)
                            }
                        },
                        CLASS: function (u) {
                          let c = H[u + ' ']
                          return (
                            c ||
                                    ((c = new RegExp(
                                      '(^|' + U + ')' + u + '(' + U + '|$)'
                                    )) &&
                                        H(u, function (p) {
                                          return c.test(
                                            (typeof p.className ===
                                                    'string' &&
                                                    p.className) ||
                                                    (typeof p.getAttribute <
                                                        'u' &&
                                                        p.getAttribute(
                                                          'class'
                                                        )) ||
                                                    ''
                                          )
                                        }))
                          )
                        },
                        ATTR: function (u, c, p) {
                          return function (y) {
                            let m = z.attr(y, u)
                            return m == null
                              ? c === '!='
                              : c
                                ? ((m += ''),
                                  c === '='
                                    ? m === p
                                    : c === '!='
                                      ? m !== p
                                      : c === '^='
                                        ? p && m.indexOf(p) === 0
                                        : c === '*='
                                          ? p && m.indexOf(p) > -1
                                          : c === '$='
                                            ? p &&
                                                          m.slice(-p.length) ===
                                                              p
                                            : c === '~='
                                              ? (
                                                  ' ' +
                                                                m.replace(
                                                                  $,
                                                                  ' '
                                                                ) +
                                                                ' '
                                                ).indexOf(p) > -1
                                              : c === '|='
                                                ? m === p ||
                                                              m.slice(
                                                                0,
                                                                p.length + 1
                                                              ) ===
                                                                  p + '-'
                                                : !1)
                                : !0
                          }
                        },
                        CHILD: function (u, c, p, y, m) {
                          const C = u.slice(0, 3) !== 'nth'
                          const T = u.slice(-4) !== 'last'
                          const S = c === 'of-type'
                          return y === 1 && m === 0
                            ? function (w) {
                              return !!w.parentNode
                            }
                            : function (w, X, L) {
                              let q
                              let _
                              let j
                              let V
                              let se
                              let ee =
                                              C !== T
                                                ? 'nextSibling'
                                                : 'previousSibling'
                              const le = w.parentNode
                              const xe =
                                              S && w.nodeName.toLowerCase()
                              const Ve = !L && !S
                              let te = !1
                              if (le) {
                                if (C) {
                                  for (; ee;) {
                                    for (
                                      j = w;
                                      (j = j[ee]);

                                    ) {
                                      if (
                                        S
                                          ? Q(j, xe)
                                          : j.nodeType ===
                                                                    1
                                      ) {
                                        return !1
                                      }
                                    }
                                    se = ee =
                                                          u === 'only' &&
                                                          !se &&
                                                          'nextSibling'
                                  }
                                  return !0
                                }
                                if (
                                  ((se = [
                                    T
                                      ? le.firstChild
                                      : le.lastChild
                                  ]),
                                  T && Ve)
                                ) {
                                  for (
                                    _ = le[b] || (le[b] = {}),
                                    q = _[u] || [],
                                    V =
                                                              q[0] === g &&
                                                              q[1],
                                    te = V && q[2],
                                    j =
                                                              V &&
                                                              le.childNodes[V];
                                    (j =
                                                          (++V && j && j[ee]) ||
                                                          (te = V = 0) ||
                                                          se.pop());

                                  ) {
                                    if (
                                      j.nodeType === 1 &&
                                                          ++te &&
                                                          j === w
                                    ) {
                                      _[u] = [g, V, te]
                                      break
                                    }
                                  }
                                } else if (
                                  (Ve &&
                                                      ((_ =
                                                          w[b] || (w[b] = {})),
                                                      (q = _[u] || []),
                                                      (V = q[0] === g && q[1]),
                                                      (te = V)),
                                  te === !1)
                                ) {
                                  for (
                                    ;
                                    (j =
                                                          (++V && j && j[ee]) ||
                                                          (te = V = 0) ||
                                                          se.pop()) &&
                                                      !(
                                                        (S
                                                          ? Q(j, xe)
                                                          : j.nodeType ===
                                                                1) &&
                                                          ++te &&
                                                          (Ve &&
                                                              ((_ =
                                                                  j[b] ||
                                                                  (j[b] = {})),
                                                              (_[u] = [g, te])),
                                                          j === w)
                                                      );

                                  );
                                }
                                return (
                                  (te -= m),
                                  te === y ||
                                                      (te % y === 0 &&
                                                          te / y >= 0)
                                )
                              }
                            }
                        },
                        PSEUDO: function (u, c) {
                          let p
                          const y =
                                    t.pseudos[u] ||
                                    t.setFilters[u.toLowerCase()] ||
                                    z.error('unsupported pseudo: ' + u)
                          return y[b]
                            ? y(c)
                            : y.length > 1
                              ? ((p = [u, u, '', c]),
                                t.setFilters.hasOwnProperty(
                                  u.toLowerCase()
                                )
                                  ? pe(function (m, C) {
                                    for (
                                      var T,
                                        S = y(m, c),
                                        w = S.length;
                                      w--;

                                    ) {
                                      (T = E.call(m, S[w])),
                                      (m[T] = !(C[T] =
                                                              S[w]))
                                    }
                                  })
                                  : function (m) {
                                    return y(m, 0, p)
                                  })
                              : y
                        }
                      },
                      pseudos: {
                        not: pe(function (u) {
                          const c = []
                          const p = []
                          const y = $t(u.replace(Ge, '$1'))
                          return y[b]
                            ? pe(function (m, C, T, S) {
                              for (
                                var w,
                                  X = y(m, null, S, []),
                                  L = m.length;
                                L--;

                              ) {
                                (w = X[L]) &&
                                                  (m[L] = !(C[L] = w))
                              }
                            })
                            : function (m, C, T) {
                              return (
                                (c[0] = m),
                                y(c, null, T, p),
                                (c[0] = null),
                                !p.pop()
                              )
                            }
                        }),
                        has: pe(function (u) {
                          return function (c) {
                            return z(u, c).length > 0
                          }
                        }),
                        contains: pe(function (u) {
                          return (
                            (u = u.replace(Ne, Se)),
                            function (c) {
                              return (
                                (
                                  c.textContent || r.text(c)
                                ).indexOf(u) > -1
                              )
                            }
                          )
                        }),
                        lang: pe(function (u) {
                          return (
                            ot.test(u || '') ||
                                        z.error('unsupported lang: ' + u),
                            (u = u.replace(Ne, Se).toLowerCase()),
                            function (c) {
                              let p
                              do {
                                if (
                                  (p = f
                                    ? c.lang
                                    : c.getAttribute(
                                      'xml:lang'
                                    ) ||
                                                      c.getAttribute('lang'))
                                ) {
                                  return (
                                    (p = p.toLowerCase()),
                                    p === u ||
                                                        p.indexOf(u + '-') === 0
                                  )
                                }
                              } while (
                                (c = c.parentNode) &&
                                            c.nodeType === 1
                              )
                              return !1
                            }
                          )
                        }),
                        target: function (u) {
                          const c = h.location && h.location.hash
                          return c && c.slice(1) === u.id
                        },
                        root: function (u) {
                          return u === l
                        },
                        focus: function (u) {
                          return (
                            u === Bi() &&
                                    a.hasFocus() &&
                                    !!(u.type || u.href || ~u.tabIndex)
                          )
                        },
                        enabled: Hn(!1),
                        disabled: Hn(!0),
                        checked: function (u) {
                          return (
                            (Q(u, 'input') && !!u.checked) ||
                                    (Q(u, 'option') && !!u.selected)
                          )
                        },
                        selected: function (u) {
                          return (
                            u.parentNode && u.parentNode.selectedIndex,
                            u.selected === !0
                          )
                        },
                        empty: function (u) {
                          for (u = u.firstChild; u; u = u.nextSibling) {
                            if (u.nodeType < 6) return !1
                          }
                          return !0
                        },
                        parent: function (u) {
                          return !t.pseudos.empty(u)
                        },
                        header: function (u) {
                          return ke.test(u.nodeName)
                        },
                        input: function (u) {
                          return De.test(u.nodeName)
                        },
                        button: function (u) {
                          return (
                            (Q(u, 'input') && u.type === 'button') ||
                                    Q(u, 'button')
                          )
                        },
                        text: function (u) {
                          let c
                          return (
                            Q(u, 'input') &&
                                    u.type === 'text' &&
                                    ((c = u.getAttribute('type')) == null ||
                                        c.toLowerCase() === 'text')
                          )
                        },
                        first: Oe(function () {
                          return [0]
                        }),
                        last: Oe(function (u, c) {
                          return [c - 1]
                        }),
                        eq: Oe(function (u, c, p) {
                          return [p < 0 ? p + c : p]
                        }),
                        even: Oe(function (u, c) {
                          for (let p = 0; p < c; p += 2) u.push(p)
                          return u
                        }),
                        odd: Oe(function (u, c) {
                          for (let p = 1; p < c; p += 2) u.push(p)
                          return u
                        }),
                        lt: Oe(function (u, c, p) {
                          let y
                          for (
                            p < 0
                              ? (y = p + c)
                              : p > c
                                ? (y = c)
                                : (y = p);
                            --y >= 0;

                          ) {
                            u.push(y)
                          }
                          return u
                        }),
                        gt: Oe(function (u, c, p) {
                          for (let y = p < 0 ? p + c : p; ++y < c;) {
                            u.push(y)
                          }
                          return u
                        })
                      }
                    }),
      (t.pseudos.nth = t.pseudos.eq)
      for (e in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) {
        t.pseudos[e] = $i(e)
      }
      for (e in { submit: !0, reset: !0 }) t.pseudos[e] = zi(e)
      function qn () {}
      (qn.prototype = t.filters = t.pseudos), (t.setFilters = new qn())
      function st (u, c) {
        let p
        let y
        let m
        let C
        let T
        let S
        let w
        const X = B[u + ' ']
        if (X) return c ? 0 : X.slice(0)
        for (T = u, S = [], w = t.preFilter; T;) {
          (!p || (y = J.exec(T))) &&
                        (y && (T = T.slice(y[0].length) || T),
                        S.push((m = []))),
          (p = !1),
          (y = rt.exec(T)) &&
                            ((p = y.shift()),
                            m.push({ value: p, type: y[0].replace(Ge, ' ') }),
                            (T = T.slice(p.length)))
          for (C in t.filter) {
            (y = be[C].exec(T)) &&
                            (!w[C] || (y = w[C](y))) &&
                            ((p = y.shift()),
                            m.push({ value: p, type: C, matches: y }),
                            (T = T.slice(p.length)))
          }
          if (!p) break
        }
        return c ? T.length : T ? z.error(u) : B(u, S).slice(0)
      }
      function yt (u) {
        for (var c = 0, p = u.length, y = ''; c < p; c++) {
          y += u[c].value
        }
        return y
      }
      function vt (u, c, p) {
        const y = c.dir
        const m = c.next
        const C = m || y
        const T = p && C === 'parentNode'
        const S = x++
        return c.first
          ? function (w, X, L) {
            for (; (w = w[y]);) {
              if (w.nodeType === 1 || T) return u(w, X, L)
            }
            return !1
          }
          : function (w, X, L) {
            let q
            let _
            const j = [g, S]
            if (L) {
              for (; (w = w[y]);) {
                if ((w.nodeType === 1 || T) && u(w, X, L)) {
                  return !0
                }
              }
            } else {
              for (; (w = w[y]);) {
                if (w.nodeType === 1 || T) {
                  if (
                    ((_ = w[b] || (w[b] = {})),
                    m && Q(w, m))
                  ) {
                    w = w[y] || w
                  } else {
                    if (
                      (q = _[C]) &&
                                              q[0] === g &&
                                              q[1] === S
                    ) {
                      return (j[2] = q[2])
                    }
                    if (
                      ((_[C] = j), (j[2] = u(w, X, L)))
                    ) {
                      return !0
                    }
                  }
                }
              }
            }
            return !1
          }
      }
      function Ft (u) {
        return u.length > 1
          ? function (c, p, y) {
            for (let m = u.length; m--;) {
              if (!u[m](c, p, y)) return !1
            }
            return !0
          }
          : u[0]
      }
      function Ui (u, c, p) {
        for (let y = 0, m = c.length; y < m; y++) z(u, c[y], p)
        return p
      }
      function mt (u, c, p, y, m) {
        for (
          var C, T = [], S = 0, w = u.length, X = c != null;
          S < w;
          S++
        ) {
          (C = u[S]) &&
                        (!p || p(C, y, m)) &&
                        (T.push(C), X && c.push(S))
        }
        return T
      }
      function Yt (u, c, p, y, m, C) {
        return (
          y && !y[b] && (y = Yt(y)),
          m && !m[b] && (m = Yt(m, C)),
          pe(function (T, S, w, X) {
            let L
            let q
            let _
            let j
            const V = []
            const se = []
            const ee = S.length
            const le = T || Ui(c || '*', w.nodeType ? [w] : w, [])
            const xe = u && (T || !c) ? mt(le, V, u, w, X) : le
            if (
              (p
                ? ((j = m || (T ? u : ee || y) ? [] : S),
                  p(xe, j, w, X))
                : (j = xe),
              y)
            ) {
              for (
                L = mt(j, se), y(L, [], w, X), q = L.length;
                q--;

              ) {
                (_ = L[q]) && (j[se[q]] = !(xe[se[q]] = _))
              }
            }
            if (T) {
              if (m || u) {
                if (m) {
                  for (L = [], q = j.length; q--;) {
                    (_ = j[q]) && L.push((xe[q] = _))
                  }
                  m(null, (j = []), L, X)
                }
                for (q = j.length; q--;) {
                  (_ = j[q]) &&
                                        (L = m ? E.call(T, _) : V[q]) > -1 &&
                                        (T[L] = !(S[L] = _))
                }
              }
            } else {
              (j = mt(j === S ? j.splice(ee, j.length) : j)),
              m ? m(null, S, j, X) : s.apply(S, j)
            }
          })
        )
      }
      function Bt (u) {
        for (
          var c,
            p,
            y,
            m = u.length,
            C = t.relative[u[0].type],
            T = C || t.relative[' '],
            S = C ? 1 : 0,
            w = vt(
              function (q) {
                return q === c
              },
              T,
              !0
            ),
            X = vt(
              function (q) {
                return E.call(c, q) > -1
              },
              T,
              !0
            ),
            L = [
              function (q, _, j) {
                const V =
                                    (!C && (j || _ != n)) ||
                                    ((c = _).nodeType
                                      ? w(q, _, j)
                                      : X(q, _, j))
                return (c = null), V
              }
            ];
          S < m;
          S++
        ) {
          if ((p = t.relative[u[S].type])) L = [vt(Ft(L), p)]
          else {
            if (
              ((p = t.filter[u[S].type].apply(
                null,
                u[S].matches
              )),
              p[b])
            ) {
              for (y = ++S; y < m && !t.relative[u[y].type]; y++);
              return Yt(
                S > 1 && Ft(L),
                S > 1 &&
                                    yt(
                                      u.slice(0, S - 1).concat({
                                        value:
                                                u[S - 2].type === ' '
                                                  ? '*'
                                                  : ''
                                      })
                                    ).replace(Ge, '$1'),
                p,
                S < y && Bt(u.slice(S, y)),
                y < m && Bt((u = u.slice(y))),
                y < m && yt(u)
              )
            }
            L.push(p)
          }
        }
        return Ft(L)
      }
      function Vi (u, c) {
        const p = c.length > 0
        const y = u.length > 0
        const m = function (C, T, S, w, X) {
          let L
          let q
          let _
          let j = 0
          let V = '0'
          const se = C && []
          let ee = []
          const le = n
          const xe = C || (y && t.find.TAG('*', X))
          const Ve = (g += le == null ? 1 : Math.random() || 0.1)
          const te = xe.length
          for (
            X && (n = T == a || T || X);
            V !== te && (L = xe[V]) != null;
            V++
          ) {
            if (y && L) {
              for (
                q = 0,
                !T &&
                                        L.ownerDocument != a &&
                                        (je(L), (S = !f));
                (_ = u[q++]);

              ) {
                if (_(L, T || a, S)) {
                  s.call(w, L)
                  break
                }
              }
              X && (g = Ve)
            }
            p && ((L = !_ && L) && j--, C && se.push(L))
          }
          if (((j += V), p && V !== j)) {
            for (q = 0; (_ = c[q++]);) _(se, ee, T, S)
            if (C) {
              if (j > 0) {
                for (; V--;) {
                  se[V] || ee[V] || (ee[V] = Yn.call(w))
                }
              }
              ee = mt(ee)
            }
            s.apply(w, ee),
            X &&
                                !C &&
                                ee.length > 0 &&
                                j + c.length > 1 &&
                                r.uniqueSort(w)
          }
          return X && ((g = Ve), (n = le)), se
        }
        return p ? pe(m) : m
      }
      function $t (u, c) {
        let p
        const y = []
        const m = []
        let C = R[u + ' ']
        if (!C) {
          for (c || (c = st(u)), p = c.length; p--;) {
            (C = Bt(c[p])), C[b] ? y.push(C) : m.push(C)
          }
          (C = R(u, Vi(m, y))), (C.selector = u)
        }
        return C
      }
      function Pn (u, c, p, y) {
        let m
        let C
        let T
        let S
        let w
        const X = typeof u === 'function' && u
        const L = !y && st((u = X.selector || u))
        if (((p = p || []), L.length === 1)) {
          if (
            ((C = L[0] = L[0].slice(0)),
            C.length > 2 &&
                            (T = C[0]).type === 'ID' &&
                            c.nodeType === 9 &&
                            f &&
                            t.relative[C[1].type])
          ) {
            if (
              ((c = (t.find.ID(T.matches[0].replace(Ne, Se), c) ||
                                [])[0]),
              c)
            ) {
              X && (c = c.parentNode)
            } else return p
            u = u.slice(C.shift().value.length)
          }
          for (
            m = be.needsContext.test(u) ? 0 : C.length;
            m-- && ((T = C[m]), !t.relative[(S = T.type)]);

          ) {
            if (
              (w = t.find[S]) &&
                            (y = w(
                              T.matches[0].replace(Ne, Se),
                              (_t.test(C[0].type) && Wt(c.parentNode)) || c
                            ))
            ) {
              if ((C.splice(m, 1), (u = y.length && yt(C)), !u)) {
                return s.apply(p, y), p
              }
              break
            }
          }
        }
        return (
          (X || $t(u, L))(
            y,
            c,
            !f,
            p,
            !c || (_t.test(u) && Wt(c.parentNode)) || c
          ),
          p
        )
      }
      (O.sortStable = b.split('').sort(K).join('') === b),
      je(),
      (O.sortDetached = Ue(function (u) {
        return (
          u.compareDocumentPosition(a.createElement('fieldset')) &
                        1
        )
      })),
      (r.find = z),
      (r.expr[':'] = r.expr.pseudos),
      (r.unique = r.uniqueSort),
      (z.compile = $t),
      (z.select = Pn),
      (z.setDocument = je),
      (z.tokenize = st),
      (z.escape = r.escapeSelector),
      (z.getText = r.text),
      (z.isXML = r.isXMLDoc),
      (z.selectors = r.expr),
      (z.support = r.support),
      (z.uniqueSort = r.uniqueSort)
    })()
    const Xe = function (e, t, n) {
      for (
        var i = [], o = n !== void 0;
        (e = e[t]) && e.nodeType !== 9;

      ) {
        if (e.nodeType === 1) {
          if (o && r(e).is(n)) break
          i.push(e)
        }
      }
      return i
    }
    const Vt = function (e, t) {
      for (var n = []; e; e = e.nextSibling) {
        e.nodeType === 1 && e !== t && n.push(e)
      }
      return n
    }
    const Gt = r.expr.match.needsContext
    const Qt =
            /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
    function wt (e, t, n) {
      return M(t)
        ? r.grep(e, function (i, o) {
          return !!t.call(i, o, i) !== n
        })
        : t.nodeType
          ? r.grep(e, function (i) {
            return (i === t) !== n
          })
          : typeof t !== 'string'
            ? r.grep(e, function (i) {
              return E.call(t, i) > -1 !== n
            })
            : r.filter(t, e, n)
    }
    (r.filter = function (e, t, n) {
      const i = t[0]
      return (
        n && (e = ':not(' + e + ')'),
        t.length === 1 && i.nodeType === 1
          ? r.find.matchesSelector(i, e)
            ? [i]
            : []
          : r.find.matches(
            e,
            r.grep(t, function (o) {
              return o.nodeType === 1
            })
          )
      )
    }),
    r.fn.extend({
      find: function (e) {
        let t
        let n
        const i = this.length
        const o = this
        if (typeof e !== 'string') {
          return this.pushStack(
            r(e).filter(function () {
              for (t = 0; t < i; t++) {
                if (r.contains(o[t], this)) return !0
              }
            })
          )
        }
        for (n = this.pushStack([]), t = 0; t < i; t++) {
          r.find(e, o[t], n)
        }
        return i > 1 ? r.uniqueSort(n) : n
      },
      filter: function (e) {
        return this.pushStack(wt(this, e || [], !1))
      },
      not: function (e) {
        return this.pushStack(wt(this, e || [], !0))
      },
      is: function (e) {
        return !!wt(
          this,
          typeof e === 'string' && Gt.test(e) ? r(e) : e || [],
          !1
        ).length
      }
    })
    let Jt
    const Vn = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
    const Gn = (r.fn.init = function (e, t, n) {
      let i, o
      if (!e) return this
      if (((n = n || Jt), typeof e === 'string')) {
        if (
          (e[0] === '<' && e[e.length - 1] === '>' && e.length >= 3
            ? (i = [null, e, null])
            : (i = Vn.exec(e)),
          i && (i[1] || !t))
        ) {
          if (i[1]) {
            if (
              ((t = t instanceof r ? t[0] : t),
              r.merge(
                this,
                r.parseHTML(
                  i[1],
                  t && t.nodeType ? t.ownerDocument || t : P,
                  !0
                )
              ),
              Qt.test(i[1]) && r.isPlainObject(t))
            ) {
              for (i in t) {
                M(this[i]) ? this[i](t[i]) : this.attr(i, t[i])
              }
            }
            return this
          } else {
            return (
              (o = P.getElementById(i[2])),
              o && ((this[0] = o), (this.length = 1)),
              this
            )
          }
        } else {
          return !t || t.jquery
            ? (t || n).find(e)
            : this.constructor(t).find(e)
        }
      } else {
        if (e.nodeType) {
          return (this[0] = e), (this.length = 1), this
        }
        if (M(e)) return n.ready !== void 0 ? n.ready(e) : e(r)
      }
      return r.makeArray(e, this)
    });
    (Gn.prototype = r.fn), (Jt = r(P))
    const Qn = /^(?:parents|prev(?:Until|All))/
    const Jn = { children: !0, contents: !0, next: !0, prev: !0 }
    r.fn.extend({
      has: function (e) {
        const t = r(e, this)
        const n = t.length
        return this.filter(function () {
          for (let i = 0; i < n; i++) {
            if (r.contains(this, t[i])) return !0
          }
        })
      },
      closest: function (e, t) {
        let n
        let i = 0
        const o = this.length
        const s = []
        const a = typeof e !== 'string' && r(e)
        if (!Gt.test(e)) {
          for (; i < o; i++) {
            for (n = this[i]; n && n !== t; n = n.parentNode) {
              if (
                n.nodeType < 11 &&
                                (a
                                  ? a.index(n) > -1
                                  : n.nodeType === 1 &&
                                      r.find.matchesSelector(n, e))
              ) {
                s.push(n)
                break
              }
            }
          }
        }
        return this.pushStack(s.length > 1 ? r.uniqueSort(s) : s)
      },
      index: function (e) {
        return e
          ? typeof e === 'string'
            ? E.call(r(e), this[0])
            : E.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
            ? this.first().prevAll().length
            : -1
      },
      add: function (e, t) {
        return this.pushStack(
          r.uniqueSort(r.merge(this.get(), r(e, t)))
        )
      },
      addBack: function (e) {
        return this.add(
          e == null ? this.prevObject : this.prevObject.filter(e)
        )
      }
    })
    function Kt (e, t) {
      for (; (e = e[t]) && e.nodeType !== 1;);
      return e
    }
    r.each(
      {
        parent: function (e) {
          const t = e.parentNode
          return t && t.nodeType !== 11 ? t : null
        },
        parents: function (e) {
          return Xe(e, 'parentNode')
        },
        parentsUntil: function (e, t, n) {
          return Xe(e, 'parentNode', n)
        },
        next: function (e) {
          return Kt(e, 'nextSibling')
        },
        prev: function (e) {
          return Kt(e, 'previousSibling')
        },
        nextAll: function (e) {
          return Xe(e, 'nextSibling')
        },
        prevAll: function (e) {
          return Xe(e, 'previousSibling')
        },
        nextUntil: function (e, t, n) {
          return Xe(e, 'nextSibling', n)
        },
        prevUntil: function (e, t, n) {
          return Xe(e, 'previousSibling', n)
        },
        siblings: function (e) {
          return Vt((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
          return Vt(e.firstChild)
        },
        contents: function (e) {
          return e.contentDocument != null && Y(e.contentDocument)
            ? e.contentDocument
            : (Q(e, 'template') && (e = e.content || e),
              r.merge([], e.childNodes))
        }
      },
      function (e, t) {
        r.fn[e] = function (n, i) {
          let o = r.map(this, t, n)
          return (
            e.slice(-5) !== 'Until' && (i = n),
            i && typeof i === 'string' && (o = r.filter(i, o)),
            this.length > 1 &&
                            (Jn[e] || r.uniqueSort(o),
                            Qn.test(e) && o.reverse()),
            this.pushStack(o)
          )
        }
      }
    )
    const he = /[^\x20\t\r\n\f]+/g
    function Kn (e) {
      const t = {}
      return (
        r.each(e.match(he) || [], function (n, i) {
          t[i] = !0
        }),
        t
      )
    }
    r.Callbacks = function (e) {
      e = typeof e === 'string' ? Kn(e) : r.extend({}, e)
      let t
      let n
      let i
      let o
      let s = []
      let a = []
      let l = -1
      const f = function () {
        for (o = o || e.once, i = t = !0; a.length; l = -1) {
          for (n = a.shift(); ++l < s.length;) {
            s[l].apply(n[0], n[1]) === !1 &&
                            e.stopOnFalse &&
                            ((l = s.length), (n = !1))
          }
        }
        e.memory || (n = !1), (t = !1), o && (n ? (s = []) : (s = ''))
      }
      var d = {
        add: function () {
          return (
            s &&
                            (n && !t && ((l = s.length - 1), a.push(n)),
                            (function v (b) {
                              r.each(b, function (g, x) {
                                M(x)
                                  ? (!e.unique || !d.has(x)) && s.push(x)
                                  : x &&
                                          x.length &&
                                          Ie(x) !== 'string' &&
                                          v(x)
                              })
                            })(arguments),
                            n && !t && f()),
            this
          )
        },
        remove: function () {
          return (
            r.each(arguments, function (v, b) {
              for (var g; (g = r.inArray(b, s, g)) > -1;) {
                s.splice(g, 1), g <= l && l--
              }
            }),
            this
          )
        },
        has: function (v) {
          return v ? r.inArray(v, s) > -1 : s.length > 0
        },
        empty: function () {
          return s && (s = []), this
        },
        disable: function () {
          return (o = a = []), (s = n = ''), this
        },
        disabled: function () {
          return !s
        },
        lock: function () {
          return (o = a = []), !n && !t && (s = n = ''), this
        },
        locked: function () {
          return !!o
        },
        fireWith: function (v, b) {
          return (
            o ||
                            ((b = b || []),
                            (b = [v, b.slice ? b.slice() : b]),
                            a.push(b),
                            t || f()),
            this
          )
        },
        fire: function () {
          return d.fireWith(this, arguments), this
        },
        fired: function () {
          return !!i
        }
      }
      return d
    }
    function _e (e) {
      return e
    }
    function ut (e) {
      throw e
    }
    function Zt (e, t, n, i) {
      let o
      try {
        e && M((o = e.promise))
          ? o.call(e).done(t).fail(n)
          : e && M((o = e.then))
            ? o.call(e, t, n)
            : t.apply(void 0, [e].slice(i))
      } catch (s) {
        n.apply(void 0, [s])
      }
    }
    r.extend({
      Deferred: function (e) {
        const t = [
          [
            'notify',
            'progress',
            r.Callbacks('memory'),
            r.Callbacks('memory'),
            2
          ],
          [
            'resolve',
            'done',
            r.Callbacks('once memory'),
            r.Callbacks('once memory'),
            0,
            'resolved'
          ],
          [
            'reject',
            'fail',
            r.Callbacks('once memory'),
            r.Callbacks('once memory'),
            1,
            'rejected'
          ]
        ]
        let n = 'pending'
        var i = {
          state: function () {
            return n
          },
          always: function () {
            return o.done(arguments).fail(arguments), this
          },
          catch: function (s) {
            return i.then(null, s)
          },
          pipe: function () {
            let s = arguments
            return r
              .Deferred(function (a) {
                r.each(t, function (l, f) {
                  const d = M(s[f[4]]) && s[f[4]]
                  o[f[1]](function () {
                    const v = d && d.apply(this, arguments)
                    v && M(v.promise)
                      ? v
                        .promise()
                        .progress(a.notify)
                        .done(a.resolve)
                        .fail(a.reject)
                      : a[f[0] + 'With'](
                        this,
                        d ? [v] : arguments
                      )
                  })
                }),
                (s = null)
              })
              .promise()
          },
          then: function (s, a, l) {
            let f = 0
            function d (v, b, g, x) {
              return function () {
                let H = this
                let B = arguments
                const R = function () {
                  let K, ye
                  if (!(v < f)) {
                    if (
                      ((K = g.apply(H, B)),
                      K === b.promise())
                    ) {
                      throw new TypeError(
                        'Thenable self-resolution'
                      )
                    }
                    (ye =
                                            K &&
                                            (typeof K === 'object' ||
                                                typeof K === 'function') &&
                                            K.then),
                    M(ye)
                      ? x
                        ? ye.call(
                          K,
                          d(f, b, _e, x),
                          d(f, b, ut, x)
                        )
                        : (f++,
                          ye.call(
                            K,
                            d(f, b, _e, x),
                            d(f, b, ut, x),
                            d(
                              f,
                              b,
                              _e,
                              b.notifyWith
                            )
                          ))
                      : (g !== _e &&
                                                      ((H = void 0), (B = [K])),
                        (x || b.resolveWith)(H, B))
                  }
                }
                var Z = x
                  ? R
                  : function () {
                    try {
                      R()
                    } catch (K) {
                      r.Deferred.exceptionHook &&
                                                  r.Deferred.exceptionHook(
                                                    K,
                                                    Z.error
                                                  ),
                      v + 1 >= f &&
                                                      (g !== ut &&
                                                          ((H = void 0),
                                                          (B = [K])),
                                                      b.rejectWith(H, B))
                    }
                  }
                v
                  ? Z()
                  : (r.Deferred.getErrorHook
                      ? (Z.error =
                                                r.Deferred.getErrorHook())
                      : r.Deferred.getStackHook &&
                                            (Z.error =
                                                r.Deferred.getStackHook()),
                    h.setTimeout(Z))
              }
            }
            return r
              .Deferred(function (v) {
                t[0][3].add(
                  d(0, v, M(l) ? l : _e, v.notifyWith)
                ),
                t[1][3].add(d(0, v, M(s) ? s : _e)),
                t[2][3].add(d(0, v, M(a) ? a : ut))
              })
              .promise()
          },
          promise: function (s) {
            return s != null ? r.extend(s, i) : i
          }
        }
        var o = {}
        return (
          r.each(t, function (s, a) {
            const l = a[2]
            const f = a[5];
            (i[a[1]] = l.add),
            f &&
                                l.add(
                                  function () {
                                    n = f
                                  },
                                  t[3 - s][2].disable,
                                  t[3 - s][3].disable,
                                  t[0][2].lock,
                                  t[0][3].lock
                                ),
            l.add(a[3].fire),
            (o[a[0]] = function () {
              return (
                o[a[0] + 'With'](
                  this === o ? void 0 : this,
                  arguments
                ),
                this
              )
            }),
            (o[a[0] + 'With'] = l.fireWith)
          }),
          i.promise(o),
          e && e.call(o, o),
          o
        )
      },
      when: function (e) {
        let t = arguments.length
        let n = t
        const i = Array(n)
        const o = k.call(arguments)
        const s = r.Deferred()
        const a = function (l) {
          return function (f) {
            (i[l] = this),
            (o[l] =
                                arguments.length > 1 ? k.call(arguments) : f),
            --t || s.resolveWith(i, o)
          }
        }
        if (
          t <= 1 &&
                    (Zt(e, s.done(a(n)).resolve, s.reject, !t),
                    s.state() === 'pending' || M(o[n] && o[n].then))
        ) {
          return s.then()
        }
        for (; n--;) Zt(o[n], a(n), s.reject)
        return s.promise()
      }
    })
    const Zn = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (r.Deferred.exceptionHook = function (e, t) {
      h.console &&
                h.console.warn &&
                e &&
                Zn.test(e.name) &&
                h.console.warn(
                  'jQuery.Deferred exception: ' + e.message,
                  e.stack,
                  t
                )
    }),
    (r.readyException = function (e) {
      h.setTimeout(function () {
        throw e
      })
    })
    const Et = r.Deferred();
    (r.fn.ready = function (e) {
      return (
        Et.then(e).catch(function (t) {
          r.readyException(t)
        }),
        this
      )
    }),
    r.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (e === !0 ? --r.readyWait : r.isReady) ||
                        ((r.isReady = !0),
                        !(e !== !0 && --r.readyWait > 0) &&
                            Et.resolveWith(P, [r]))
      }
    }),
    (r.ready.then = Et.then)
    function ft () {
      P.removeEventListener('DOMContentLoaded', ft),
      h.removeEventListener('load', ft),
      r.ready()
    }
    P.readyState === 'complete' ||
        (P.readyState !== 'loading' && !P.documentElement.doScroll)
      ? h.setTimeout(r.ready)
      : (P.addEventListener('DOMContentLoaded', ft),
        h.addEventListener('load', ft))
    const we = function (e, t, n, i, o, s, a) {
      let l = 0
      const f = e.length
      let d = n == null
      if (Ie(n) === 'object') {
        o = !0
        for (l in n) we(e, t, l, n[l], !0, s, a)
      } else if (
        i !== void 0 &&
                ((o = !0),
                M(i) || (a = !0),
                d &&
                    (a
                      ? (t.call(e, i), (t = null))
                      : ((d = t),
                        (t = function (v, b, g) {
                          return d.call(r(v), g)
                        }))),
                t)
      ) {
        for (; l < f; l++) {
          t(e[l], n, a ? i : i.call(e[l], l, t(e[l], n)))
        }
      }
      return o ? e : d ? t.call(e) : f ? t(e[0], n) : s
    }
    const ei = /^-ms-/
    const ti = /-([a-z])/g
    function ni (e, t) {
      return t.toUpperCase()
    }
    function ge (e) {
      return e.replace(ei, 'ms-').replace(ti, ni)
    }
    const Qe = function (e) {
      return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
    }
    function Je () {
      this.expando = r.expando + Je.uid++
    }
    (Je.uid = 1),
    (Je.prototype = {
      cache: function (e) {
        let t = e[this.expando]
        return (
          t ||
                            ((t = {}),
                            Qe(e) &&
                                (e.nodeType
                                  ? (e[this.expando] = t)
                                  : Object.defineProperty(e, this.expando, {
                                    value: t,
                                    configurable: !0
                                  }))),
          t
        )
      },
      set: function (e, t, n) {
        let i
        const o = this.cache(e)
        if (typeof t === 'string') o[ge(t)] = n
        else for (i in t) o[ge(i)] = t[i]
        return o
      },
      get: function (e, t) {
        return t === void 0
          ? this.cache(e)
          : e[this.expando] && e[this.expando][ge(t)]
      },
      access: function (e, t, n) {
        return t === void 0 ||
                        (t && typeof t === 'string' && n === void 0)
          ? this.get(e, t)
          : (this.set(e, t, n), n !== void 0 ? n : t)
      },
      remove: function (e, t) {
        let n
        const i = e[this.expando]
        if (i !== void 0) {
          if (t !== void 0) {
            for (
              Array.isArray(t)
                ? (t = t.map(ge))
                : ((t = ge(t)),
                  (t = (t in i) ? [t] : t.match(he) || [])),
              n = t.length;
              n--;

            ) {
              delete i[t[n]]
            }
          }
          (t === void 0 || r.isEmptyObject(i)) &&
                            (e.nodeType
                              ? (e[this.expando] = void 0)
                              : delete e[this.expando])
        }
      },
      hasData: function (e) {
        const t = e[this.expando]
        return t !== void 0 && !r.isEmptyObject(t)
      }
    })
    const A = new Je()
    const ie = new Je()
    const ii = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
    const ri = /[A-Z]/g
    function oi (e) {
      return e === 'true'
        ? !0
        : e === 'false'
          ? !1
          : e === 'null'
            ? null
            : e === +e + ''
              ? +e
              : ii.test(e)
                ? JSON.parse(e)
                : e
    }
    function en (e, t, n) {
      let i
      if (n === void 0 && e.nodeType === 1) {
        if (
          ((i = 'data-' + t.replace(ri, '-$&').toLowerCase()),
          (n = e.getAttribute(i)),
          typeof n === 'string')
        ) {
          try {
            n = oi(n)
          } catch {}
          ie.set(e, t, n)
        } else n = void 0
      }
      return n
    }
    r.extend({
      hasData: function (e) {
        return ie.hasData(e) || A.hasData(e)
      },
      data: function (e, t, n) {
        return ie.access(e, t, n)
      },
      removeData: function (e, t) {
        ie.remove(e, t)
      },
      _data: function (e, t, n) {
        return A.access(e, t, n)
      },
      _removeData: function (e, t) {
        A.remove(e, t)
      }
    }),
    r.fn.extend({
      data: function (e, t) {
        let n
        let i
        let o
        const s = this[0]
        const a = s && s.attributes
        if (e === void 0) {
          if (
            this.length &&
                            ((o = ie.get(s)),
                            s.nodeType === 1 && !A.get(s, 'hasDataAttrs'))
          ) {
            for (n = a.length; n--;) {
              a[n] &&
                                    ((i = a[n].name),
                                    i.indexOf('data-') === 0 &&
                                        ((i = ge(i.slice(5))), en(s, i, o[i])))
            }
            A.set(s, 'hasDataAttrs', !0)
          }
          return o
        }
        return typeof e === 'object'
          ? this.each(function () {
            ie.set(this, e)
          })
          : we(
            this,
            function (l) {
              let f
              if (s && l === void 0) {
                return (
                  (f = ie.get(s, e)),
                  f !== void 0 ||
                                          ((f = en(s, e)), f !== void 0)
                    ? f
                    : void 0
                )
              }
              this.each(function () {
                ie.set(this, e, l)
              })
            },
            null,
            t,
            arguments.length > 1,
            null,
            !0
          )
      },
      removeData: function (e) {
        return this.each(function () {
          ie.remove(this, e)
        })
      }
    }),
    r.extend({
      queue: function (e, t, n) {
        let i
        if (e) {
          return (
            (t = (t || 'fx') + 'queue'),
            (i = A.get(e, t)),
            n &&
                                (!i || Array.isArray(n)
                                  ? (i = A.access(e, t, r.makeArray(n)))
                                  : i.push(n)),
            i || []
          )
        }
      },
      dequeue: function (e, t) {
        t = t || 'fx'
        const n = r.queue(e, t)
        let i = n.length
        let o = n.shift()
        const s = r._queueHooks(e, t)
        const a = function () {
          r.dequeue(e, t)
        }
        o === 'inprogress' && ((o = n.shift()), i--),
        o &&
                            (t === 'fx' && n.unshift('inprogress'),
                            delete s.stop,
                            o.call(e, a, s)),
        !i && s && s.empty.fire()
      },
      _queueHooks: function (e, t) {
        const n = t + 'queueHooks'
        return (
          A.get(e, n) ||
                        A.access(e, n, {
                          empty: r.Callbacks('once memory').add(function () {
                            A.remove(e, [t + 'queue', n])
                          })
                        })
        )
      }
    }),
    r.fn.extend({
      queue: function (e, t) {
        let n = 2
        return (
          typeof e !== 'string' && ((t = e), (e = 'fx'), n--),
          arguments.length < n
            ? r.queue(this[0], e)
            : t === void 0
              ? this
              : this.each(function () {
                const i = r.queue(this, e, t)
                r._queueHooks(this, e),
                e === 'fx' &&
                                            i[0] !== 'inprogress' &&
                                            r.dequeue(this, e)
              })
        )
      },
      dequeue: function (e) {
        return this.each(function () {
          r.dequeue(this, e)
        })
      },
      clearQueue: function (e) {
        return this.queue(e || 'fx', [])
      },
      promise: function (e, t) {
        let n
        let i = 1
        const o = r.Deferred()
        const s = this
        let a = this.length
        const l = function () {
          --i || o.resolveWith(s, [s])
        }
        for (
          typeof e !== 'string' && ((t = e), (e = void 0)),
          e = e || 'fx';
          a--;

        ) {
          (n = A.get(s[a], e + 'queueHooks')),
          n && n.empty && (i++, n.empty.add(l))
        }
        return l(), o.promise(t)
      }
    })
    const tn = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
    const Ke = new RegExp('^(?:([+-])=|)(' + tn + ')([a-z%]*)$', 'i')
    const Ee = ['Top', 'Right', 'Bottom', 'Left']
    const Le = P.documentElement
    let We = function (e) {
      return r.contains(e.ownerDocument, e)
    }
    const si = { composed: !0 }
    Le.getRootNode &&
            (We = function (e) {
              return (
                r.contains(e.ownerDocument, e) ||
                    e.getRootNode(si) === e.ownerDocument
              )
            })
    const lt = function (e, t) {
      return (
        (e = t || e),
        e.style.display === 'none' ||
                    (e.style.display === '' &&
                        We(e) &&
                        r.css(e, 'display') === 'none')
      )
    }
    function nn (e, t, n, i) {
      let o
      let s
      let a = 20
      const l = i
        ? function () {
          return i.cur()
        }
        : function () {
          return r.css(e, t, '')
        }
      let f = l()
      let d = (n && n[3]) || (r.cssNumber[t] ? '' : 'px')
      let v =
                e.nodeType &&
                (r.cssNumber[t] || (d !== 'px' && +f)) &&
                Ke.exec(r.css(e, t))
      if (v && v[3] !== d) {
        for (f = f / 2, d = d || v[3], v = +f || 1; a--;) {
          r.style(e, t, v + d),
          (1 - s) * (1 - (s = l() / f || 0.5)) <= 0 && (a = 0),
          (v = v / s)
        }
        (v = v * 2), r.style(e, t, v + d), (n = n || [])
      }
      return (
        n &&
                    ((v = +v || +f || 0),
                    (o = n[1] ? v + (n[1] + 1) * n[2] : +n[2]),
                    i && ((i.unit = d), (i.start = v), (i.end = o))),
        o
      )
    }
    const rn = {}
    function ai (e) {
      let t
      const n = e.ownerDocument
      const i = e.nodeName
      let o = rn[i]
      return (
        o ||
                ((t = n.body.appendChild(n.createElement(i))),
                (o = r.css(t, 'display')),
                t.parentNode.removeChild(t),
                o === 'none' && (o = 'block'),
                (rn[i] = o),
                o)
      )
    }
    function Fe (e, t) {
      for (var n, i, o = [], s = 0, a = e.length; s < a; s++) {
        (i = e[s]),
        i.style &&
                        ((n = i.style.display),
                        t
                          ? (n === 'none' &&
                                  ((o[s] = A.get(i, 'display') || null),
                                  o[s] || (i.style.display = '')),
                            i.style.display === '' && lt(i) && (o[s] = ai(i)))
                          : n !== 'none' &&
                              ((o[s] = 'none'), A.set(i, 'display', n)))
      }
      for (s = 0; s < a; s++) o[s] != null && (e[s].style.display = o[s])
      return e
    }
    r.fn.extend({
      show: function () {
        return Fe(this, !0)
      },
      hide: function () {
        return Fe(this)
      },
      toggle: function (e) {
        return typeof e === 'boolean'
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
            lt(this) ? r(this).show() : r(this).hide()
          })
      }
    })
    const Ze = /^(?:checkbox|radio)$/i
    const on = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
    const sn = /^$|^module$|\/(?:java|ecma)script/i;
    (function () {
      const e = P.createDocumentFragment()
      const t = e.appendChild(P.createElement('div'))
      const n = P.createElement('input')
      n.setAttribute('type', 'radio'),
      n.setAttribute('checked', 'checked'),
      n.setAttribute('name', 't'),
      t.appendChild(n),
      (O.checkClone = t
        .cloneNode(!0)
        .cloneNode(!0).lastChild.checked),
      (t.innerHTML = '<textarea>x</textarea>'),
      (O.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue),
      (t.innerHTML = '<option></option>'),
      (O.option = !!t.lastChild)
    })()
    const ue = {
      thead: [1, '<table>', '</table>'],
      col: [2, '<table><colgroup>', '</colgroup></table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: [0, '', '']
    };
    (ue.tbody = ue.tfoot = ue.colgroup = ue.caption = ue.thead),
    (ue.th = ue.td),
    O.option ||
                (ue.optgroup = ue.option =
                    [1, "<select multiple='multiple'>", '</select>'])
    function re (e, t) {
      let n
      return (
        typeof e.getElementsByTagName < 'u'
          ? (n = e.getElementsByTagName(t || '*'))
          : typeof e.querySelectorAll < 'u'
            ? (n = e.querySelectorAll(t || '*'))
            : (n = []),
        t === void 0 || (t && Q(e, t)) ? r.merge([e], n) : n
      )
    }
    function Nt (e, t) {
      for (let n = 0, i = e.length; n < i; n++) {
        A.set(e[n], 'globalEval', !t || A.get(t[n], 'globalEval'))
      }
    }
    const ui = /<|&#?\w+;/
    function an (e, t, n, i, o) {
      for (
        var s,
          a,
          l,
          f,
          d,
          v,
          b = t.createDocumentFragment(),
          g = [],
          x = 0,
          H = e.length;
        x < H;
        x++
      ) {
        if (((s = e[x]), s || s === 0)) {
          if (Ie(s) === 'object') r.merge(g, s.nodeType ? [s] : s)
          else if (!ui.test(s)) g.push(t.createTextNode(s))
          else {
            for (
              a = a || b.appendChild(t.createElement('div')),
              l = (on.exec(s) || ['', ''])[1].toLowerCase(),
              f = ue[l] || ue._default,
              a.innerHTML = f[1] + r.htmlPrefilter(s) + f[2],
              v = f[0];
              v--;

            ) {
              a = a.lastChild
            }
            r.merge(g, a.childNodes),
            (a = b.firstChild),
            (a.textContent = '')
          }
        }
      }
      for (b.textContent = '', x = 0; (s = g[x++]);) {
        if (i && r.inArray(s, i) > -1) {
          o && o.push(s)
          continue
        }
        if (
          ((d = We(s)),
          (a = re(b.appendChild(s), 'script')),
          d && Nt(a),
          n)
        ) {
          for (v = 0; (s = a[v++]);) {
            sn.test(s.type || '') && n.push(s)
          }
        }
      }
      return b
    }
    const un = /^([^.]*)(?:\.(.+)|)/
    function Ye () {
      return !0
    }
    function Be () {
      return !1
    }
    function St (e, t, n, i, o, s) {
      let a, l
      if (typeof t === 'object') {
        typeof n !== 'string' && ((i = i || n), (n = void 0))
        for (l in t) St(e, l, n, i, t[l], s)
        return e
      }
      if (
        (i == null && o == null
          ? ((o = n), (i = n = void 0))
          : o == null &&
                      (typeof n === 'string'
                        ? ((o = i), (i = void 0))
                        : ((o = i), (i = n), (n = void 0))),
        o === !1)
      ) {
        o = Be
      } else if (!o) return e
      return (
        s === 1 &&
                    ((a = o),
                    (o = function (f) {
                      return r().off(f), a.apply(this, arguments)
                    }),
                    (o.guid = a.guid || (a.guid = r.guid++))),
        e.each(function () {
          r.event.add(this, t, o, i, n)
        })
      )
    }
    r.event = {
      global: {},
      add: function (e, t, n, i, o) {
        let s
        let a
        let l
        let f
        let d
        let v
        let b
        let g
        let x
        let H
        let B
        const R = A.get(e)
        if (Qe(e)) {
          for (
            n.handler &&
                            ((s = n), (n = s.handler), (o = s.selector)),
            o && r.find.matchesSelector(Le, o),
            n.guid || (n.guid = r.guid++),
            (f = R.events) ||
                                (f = R.events = Object.create(null)),
            (a = R.handle) ||
                                (a = R.handle =
                                    function (Z) {
                                      return typeof r < 'u' &&
                                            r.event.triggered !== Z.type
                                        ? r.event.dispatch.apply(
                                          e,
                                          arguments
                                        )
                                        : void 0
                                    }),
            t = (t || '').match(he) || [''],
            d = t.length;
            d--;

          ) {
            (l = un.exec(t[d]) || []),
            (x = B = l[1]),
            (H = (l[2] || '').split('.').sort()),
            x &&
                                ((b = r.event.special[x] || {}),
                                (x = (o ? b.delegateType : b.bindType) || x),
                                (b = r.event.special[x] || {}),
                                (v = r.extend(
                                  {
                                    type: x,
                                    origType: B,
                                    data: i,
                                    handler: n,
                                    guid: n.guid,
                                    selector: o,
                                    needsContext:
                                            o &&
                                            r.expr.match.needsContext.test(o),
                                    namespace: H.join('.')
                                  },
                                  s
                                )),
                                (g = f[x]) ||
                                    ((g = f[x] = []),
                                    (g.delegateCount = 0),
                                    (!b.setup ||
                                        b.setup.call(e, i, H, a) === !1) &&
                                        e.addEventListener &&
                                        e.addEventListener(x, a)),
                                b.add &&
                                    (b.add.call(e, v),
                                    v.handler.guid ||
                                        (v.handler.guid = n.guid)),
                                o
                                  ? g.splice(g.delegateCount++, 0, v)
                                  : g.push(v),
                                (r.event.global[x] = !0))
          }
        }
      },
      remove: function (e, t, n, i, o) {
        let s
        let a
        let l
        let f
        let d
        let v
        let b
        let g
        let x
        let H
        let B
        const R = A.hasData(e) && A.get(e)
        if (!(!R || !(f = R.events))) {
          for (t = (t || '').match(he) || [''], d = t.length; d--;) {
            if (
              ((l = un.exec(t[d]) || []),
              (x = B = l[1]),
              (H = (l[2] || '').split('.').sort()),
              !x)
            ) {
              for (x in f) r.event.remove(e, x + t[d], n, i, !0)
              continue
            }
            for (
              b = r.event.special[x] || {},
              x = (i ? b.delegateType : b.bindType) || x,
              g = f[x] || [],
              l =
                                    l[2] &&
                                    new RegExp(
                                      '(^|\\.)' +
                                            H.join('\\.(?:.*\\.|)') +
                                            '(\\.|$)'
                                    ),
              a = s = g.length;
              s--;

            ) {
              (v = g[s]),
              (o || B === v.origType) &&
                                    (!n || n.guid === v.guid) &&
                                    (!l || l.test(v.namespace)) &&
                                    (!i ||
                                        i === v.selector ||
                                        (i === '**' && v.selector)) &&
                                    (g.splice(s, 1),
                                    v.selector && g.delegateCount--,
                                    b.remove && b.remove.call(e, v))
            }
            a &&
                            !g.length &&
                            ((!b.teardown ||
                                b.teardown.call(e, H, R.handle) === !1) &&
                                r.removeEvent(e, x, R.handle),
                            delete f[x])
          }
          r.isEmptyObject(f) && A.remove(e, 'handle events')
        }
      },
      dispatch: function (e) {
        let t
        let n
        let i
        let o
        let s
        let a
        const l = new Array(arguments.length)
        const f = r.event.fix(e)
        const d =
                    (A.get(this, 'events') || Object.create(null))[f.type] ||
                    []
        const v = r.event.special[f.type] || {}
        for (l[0] = f, t = 1; t < arguments.length; t++) {
          l[t] = arguments[t]
        }
        if (
          ((f.delegateTarget = this),
          !(v.preDispatch && v.preDispatch.call(this, f) === !1))
        ) {
          for (
            a = r.event.handlers.call(this, f, d), t = 0;
            (o = a[t++]) && !f.isPropagationStopped();

          ) {
            for (
              f.currentTarget = o.elem, n = 0;
              (s = o.handlers[n++]) &&
                            !f.isImmediatePropagationStopped();

            ) {
              (!f.rnamespace ||
                                s.namespace === !1 ||
                                f.rnamespace.test(s.namespace)) &&
                                ((f.handleObj = s),
                                (f.data = s.data),
                                (i = (
                                  (r.event.special[s.origType] || {})
                                    .handle || s.handler
                                ).apply(o.elem, l)),
                                i !== void 0 &&
                                    (f.result = i) === !1 &&
                                    (f.preventDefault(), f.stopPropagation()))
            }
          }
          return (
            v.postDispatch && v.postDispatch.call(this, f), f.result
          )
        }
      },
      handlers: function (e, t) {
        let n
        let i
        let o
        let s
        let a
        const l = []
        const f = t.delegateCount
        let d = e.target
        if (f && d.nodeType && !(e.type === 'click' && e.button >= 1)) {
          for (; d !== this; d = d.parentNode || this) {
            if (
              d.nodeType === 1 &&
                            !(e.type === 'click' && d.disabled === !0)
            ) {
              for (s = [], a = {}, n = 0; n < f; n++) {
                (i = t[n]),
                (o = i.selector + ' '),
                a[o] === void 0 &&
                                        (a[o] = i.needsContext
                                          ? r(o, this).index(d) > -1
                                          : r.find(o, this, null, [d])
                                            .length),
                a[o] && s.push(i)
              }
              s.length && l.push({ elem: d, handlers: s })
            }
          }
        }
        return (
          (d = this),
          f < t.length && l.push({ elem: d, handlers: t.slice(f) }),
          l
        )
      },
      addProp: function (e, t) {
        Object.defineProperty(r.Event.prototype, e, {
          enumerable: !0,
          configurable: !0,
          get: M(t)
            ? function () {
              if (this.originalEvent) {
                return t(this.originalEvent)
              }
            }
            : function () {
              if (this.originalEvent) {
                return this.originalEvent[e]
              }
            },
          set: function (n) {
            Object.defineProperty(this, e, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: n
            })
          }
        })
      },
      fix: function (e) {
        return e[r.expando] ? e : new r.Event(e)
      },
      special: {
        load: { noBubble: !0 },
        click: {
          setup: function (e) {
            const t = this || e
            return (
              Ze.test(t.type) &&
                                t.click &&
                                Q(t, 'input') &&
                                ct(t, 'click', !0),
              !1
            )
          },
          trigger: function (e) {
            const t = this || e
            return (
              Ze.test(t.type) &&
                                t.click &&
                                Q(t, 'input') &&
                                ct(t, 'click'),
              !0
            )
          },
          _default: function (e) {
            const t = e.target
            return (
              (Ze.test(t.type) &&
                                t.click &&
                                Q(t, 'input') &&
                                A.get(t, 'click')) ||
                            Q(t, 'a')
            )
          }
        },
        beforeunload: {
          postDispatch: function (e) {
            e.result !== void 0 &&
                            e.originalEvent &&
                            (e.originalEvent.returnValue = e.result)
          }
        }
      }
    }
    function ct (e, t, n) {
      if (!n) {
        A.get(e, t) === void 0 && r.event.add(e, t, Ye)
        return
      }
      A.set(e, t, !1),
      r.event.add(e, t, {
        namespace: !1,
        handler: function (i) {
          let o
          let s = A.get(this, t)
          if (i.isTrigger & 1 && this[t]) {
            if (s) {
              (r.event.special[t] || {}).delegateType &&
                                    i.stopPropagation()
            } else if (
              ((s = k.call(arguments)),
              A.set(this, t, s),
              this[t](),
              (o = A.get(this, t)),
              A.set(this, t, !1),
              s !== o)
            ) {
              return (
                i.stopImmediatePropagation(),
                i.preventDefault(),
                o
              )
            }
          } else {
            s &&
                                (A.set(
                                  this,
                                  t,
                                  r.event.trigger(s[0], s.slice(1), this)
                                ),
                                i.stopPropagation(),
                                (i.isImmediatePropagationStopped = Ye))
          }
        }
      })
    }
    (r.removeEvent = function (e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n)
    }),
    (r.Event = function (e, t) {
      if (!(this instanceof r.Event)) return new r.Event(e, t)
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
                          e.defaultPrevented ||
                          (e.defaultPrevented === void 0 &&
                              e.returnValue === !1)
                            ? Ye
                            : Be),
          (this.target =
                          e.target && e.target.nodeType === 3
                            ? e.target.parentNode
                            : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
      t && r.extend(this, t),
      (this.timeStamp = (e && e.timeStamp) || Date.now()),
      (this[r.expando] = !0)
    }),
    (r.Event.prototype = {
      constructor: r.Event,
      isDefaultPrevented: Be,
      isPropagationStopped: Be,
      isImmediatePropagationStopped: Be,
      isSimulated: !1,
      preventDefault: function () {
        const e = this.originalEvent;
        (this.isDefaultPrevented = Ye),
        e && !this.isSimulated && e.preventDefault()
      },
      stopPropagation: function () {
        const e = this.originalEvent;
        (this.isPropagationStopped = Ye),
        e && !this.isSimulated && e.stopPropagation()
      },
      stopImmediatePropagation: function () {
        const e = this.originalEvent;
        (this.isImmediatePropagationStopped = Ye),
        e && !this.isSimulated && e.stopImmediatePropagation(),
        this.stopPropagation()
      }
    }),
    r.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
      },
      r.event.addProp
    ),
    r.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
      function n (i) {
        if (P.documentMode) {
          const o = A.get(this, 'handle')
          const s = r.event.fix(i);
          (s.type = i.type === 'focusin' ? 'focus' : 'blur'),
          (s.isSimulated = !0),
          o(i),
          s.target === s.currentTarget && o(s)
        } else r.event.simulate(t, i.target, r.event.fix(i))
      }
      (r.event.special[e] = {
        setup: function () {
          let i
          if ((ct(this, e, !0), P.documentMode)) {
            (i = A.get(this, t)),
            i || this.addEventListener(t, n),
            A.set(this, t, (i || 0) + 1)
          } else return !1
        },
        trigger: function () {
          return ct(this, e), !0
        },
        teardown: function () {
          let i
          if (P.documentMode) {
            (i = A.get(this, t) - 1),
            i
              ? A.set(this, t, i)
              : (this.removeEventListener(t, n),
                A.remove(this, t))
          } else return !1
        },
        _default: function (i) {
          return A.get(i.target, e)
        },
        delegateType: t
      }),
      (r.event.special[t] = {
        setup: function () {
          const i =
                                this.ownerDocument || this.document || this
          const o = P.documentMode ? this : i
          const s = A.get(o, t)
          s ||
                                (P.documentMode
                                  ? this.addEventListener(t, n)
                                  : i.addEventListener(e, n, !0)),
          A.set(o, t, (s || 0) + 1)
        },
        teardown: function () {
          const i =
                                this.ownerDocument || this.document || this
          const o = P.documentMode ? this : i
          const s = A.get(o, t) - 1
          s
            ? A.set(o, t, s)
            : (P.documentMode
                ? this.removeEventListener(t, n)
                : i.removeEventListener(e, n, !0),
              A.remove(o, t))
        }
      })
    }),
    r.each(
      {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
      },
      function (e, t) {
        r.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (n) {
            let i
            const o = this
            const s = n.relatedTarget
            const a = n.handleObj
            return (
              (!s || (s !== o && !r.contains(o, s))) &&
                                    ((n.type = a.origType),
                                    (i = a.handler.apply(this, arguments)),
                                    (n.type = t)),
              i
            )
          }
        }
      }
    ),
    r.fn.extend({
      on: function (e, t, n, i) {
        return St(this, e, t, n, i)
      },
      one: function (e, t, n, i) {
        return St(this, e, t, n, i, 1)
      },
      off: function (e, t, n) {
        let i, o
        if (e && e.preventDefault && e.handleObj) {
          return (
            (i = e.handleObj),
            r(e.delegateTarget).off(
              i.namespace
                ? i.origType + '.' + i.namespace
                : i.origType,
              i.selector,
              i.handler
            ),
            this
          )
        }
        if (typeof e === 'object') {
          for (o in e) this.off(o, t, e[o])
          return this
        }
        return (
          (t === !1 || typeof t === 'function') &&
                            ((n = t), (t = void 0)),
          n === !1 && (n = Be),
          this.each(function () {
            r.event.remove(this, e, n, t)
          })
        )
      }
    })
    const fi = /<script|<style|<link/i
    const li = /checked\s*(?:[^=]|=\s*.checked.)/i
    const ci = /^\s*<!\[CDATA\[|\]\]>\s*$/g
    function fn (e, t) {
      return (
        (Q(e, 'table') &&
                    Q(t.nodeType !== 11 ? t : t.firstChild, 'tr') &&
                    r(e).children('tbody')[0]) ||
                e
      )
    }
    function di (e) {
      return (
        (e.type = (e.getAttribute('type') !== null) + '/' + e.type), e
      )
    }
    function pi (e) {
      return (
        (e.type || '').slice(0, 5) === 'true/'
          ? (e.type = e.type.slice(5))
          : e.removeAttribute('type'),
        e
      )
    }
    function ln (e, t) {
      let n, i, o, s, a, l, f
      if (t.nodeType === 1) {
        if (A.hasData(e) && ((s = A.get(e)), (f = s.events), f)) {
          A.remove(t, 'handle events')
          for (o in f) {
            for (n = 0, i = f[o].length; n < i; n++) {
              r.event.add(t, o, f[o][n])
            }
          }
        }
        ie.hasData(e) &&
                    ((a = ie.access(e)), (l = r.extend({}, a)), ie.set(t, l))
      }
    }
    function hi (e, t) {
      const n = t.nodeName.toLowerCase()
      n === 'input' && Ze.test(e.type)
        ? (t.checked = e.checked)
        : (n === 'input' || n === 'textarea') &&
                  (t.defaultValue = e.defaultValue)
    }
    function $e (e, t, n, i) {
      t = W(t)
      let o
      let s
      let a
      let l
      let f
      let d
      let v = 0
      const b = e.length
      const g = b - 1
      const x = t[0]
      const H = M(x)
      if (
        H ||
                (b > 1 && typeof x === 'string' && !O.checkClone && li.test(x))
      ) {
        return e.each(function (B) {
          const R = e.eq(B)
          H && (t[0] = x.call(this, B, R.html())), $e(R, t, n, i)
        })
      }
      if (
        b &&
                ((o = an(t, e[0].ownerDocument, !1, e, i)),
                (s = o.firstChild),
                o.childNodes.length === 1 && (o = s),
                s || i)
      ) {
        for (a = r.map(re(o, 'script'), di), l = a.length; v < b; v++) {
          (f = o),
          v !== g &&
                            ((f = r.clone(f, !0, !0)),
                            l && r.merge(a, re(f, 'script'))),
          n.call(e[v], f, v)
        }
        if (l) {
          for (
            d = a[a.length - 1].ownerDocument, r.map(a, pi), v = 0;
            v < l;
            v++
          ) {
            (f = a[v]),
            sn.test(f.type || '') &&
                                !A.access(f, 'globalEval') &&
                                r.contains(d, f) &&
                                (f.src &&
                                (f.type || '').toLowerCase() !== 'module'
                                  ? r._evalUrl &&
                                      !f.noModule &&
                                      r._evalUrl(
                                        f.src,
                                        {
                                          nonce:
                                                  f.nonce ||
                                                  f.getAttribute('nonce')
                                        },
                                        d
                                      )
                                  : zt(f.textContent.replace(ci, ''), f, d))
          }
        }
      }
      return e
    }
    function cn (e, t, n) {
      for (
        var i, o = t ? r.filter(t, e) : e, s = 0;
        (i = o[s]) != null;
        s++
      ) {
        !n && i.nodeType === 1 && r.cleanData(re(i)),
        i.parentNode &&
                        (n && We(i) && Nt(re(i, 'script')),
                        i.parentNode.removeChild(i))
      }
      return e
    }
    r.extend({
      htmlPrefilter: function (e) {
        return e
      },
      clone: function (e, t, n) {
        let i
        let o
        let s
        let a
        const l = e.cloneNode(!0)
        const f = We(e)
        if (
          !O.noCloneChecked &&
                    (e.nodeType === 1 || e.nodeType === 11) &&
                    !r.isXMLDoc(e)
        ) {
          for (
            a = re(l), s = re(e), i = 0, o = s.length;
            i < o;
            i++
          ) {
            hi(s[i], a[i])
          }
        }
        if (t) {
          if (n) {
            for (
              s = s || re(e), a = a || re(l), i = 0, o = s.length;
              i < o;
              i++
            ) {
              ln(s[i], a[i])
            }
          } else ln(e, l)
        }
        return (
          (a = re(l, 'script')),
          a.length > 0 && Nt(a, !f && re(e, 'script')),
          l
        )
      },
      cleanData: function (e) {
        for (
          var t, n, i, o = r.event.special, s = 0;
          (n = e[s]) !== void 0;
          s++
        ) {
          if (Qe(n)) {
            if ((t = n[A.expando])) {
              if (t.events) {
                for (i in t.events) {
                  o[i]
                    ? r.event.remove(n, i)
                    : r.removeEvent(n, i, t.handle)
                }
              }
              n[A.expando] = void 0
            }
            n[ie.expando] && (n[ie.expando] = void 0)
          }
        }
      }
    }),
    r.fn.extend({
      detach: function (e) {
        return cn(this, e, !0)
      },
      remove: function (e) {
        return cn(this, e)
      },
      text: function (e) {
        return we(
          this,
          function (t) {
            return t === void 0
              ? r.text(this)
              : this.empty().each(function () {
                (this.nodeType === 1 ||
                                          this.nodeType === 11 ||
                                          this.nodeType === 9) &&
                                          (this.textContent = t)
              })
          },
          null,
          e,
          arguments.length
        )
      },
      append: function () {
        return $e(this, arguments, function (e) {
          if (
            this.nodeType === 1 ||
                            this.nodeType === 11 ||
                            this.nodeType === 9
          ) {
            const t = fn(this, e)
            t.appendChild(e)
          }
        })
      },
      prepend: function () {
        return $e(this, arguments, function (e) {
          if (
            this.nodeType === 1 ||
                            this.nodeType === 11 ||
                            this.nodeType === 9
          ) {
            const t = fn(this, e)
            t.insertBefore(e, t.firstChild)
          }
        })
      },
      before: function () {
        return $e(this, arguments, function (e) {
          this.parentNode &&
                            this.parentNode.insertBefore(e, this)
        })
      },
      after: function () {
        return $e(this, arguments, function (e) {
          this.parentNode &&
                            this.parentNode.insertBefore(e, this.nextSibling)
        })
      },
      empty: function () {
        for (var e, t = 0; (e = this[t]) != null; t++) {
          e.nodeType === 1 &&
                            (r.cleanData(re(e, !1)), (e.textContent = ''))
        }
        return this
      },
      clone: function (e, t) {
        return (
          (e = e ?? !1),
          (t = t ?? e),
          this.map(function () {
            return r.clone(this, e, t)
          })
        )
      },
      html: function (e) {
        return we(
          this,
          function (t) {
            let n = this[0] || {}
            let i = 0
            const o = this.length
            if (t === void 0 && n.nodeType === 1) {
              return n.innerHTML
            }
            if (
              typeof t === 'string' &&
                                !fi.test(t) &&
                                !ue[(on.exec(t) || ['', ''])[1].toLowerCase()]
            ) {
              t = r.htmlPrefilter(t)
              try {
                for (; i < o; i++) {
                  (n = this[i] || {}),
                  n.nodeType === 1 &&
                                                (r.cleanData(re(n, !1)),
                                                (n.innerHTML = t))
                }
                n = 0
              } catch {}
            }
            n && this.empty().append(t)
          },
          null,
          e,
          arguments.length
        )
      },
      replaceWith: function () {
        const e = []
        return $e(
          this,
          arguments,
          function (t) {
            const n = this.parentNode
            r.inArray(this, e) < 0 &&
                                (r.cleanData(re(this)),
                                n && n.replaceChild(t, this))
          },
          e
        )
      }
    }),
    r.each(
      {
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
      },
      function (e, t) {
        r.fn[e] = function (n) {
          for (
            var i, o = [], s = r(n), a = s.length - 1, l = 0;
            l <= a;
            l++
          ) {
            (i = l === a ? this : this.clone(!0)),
            r(s[l])[t](i),
            I.apply(o, i.get())
          }
          return this.pushStack(o)
        }
      }
    )
    const At = new RegExp('^(' + tn + ')(?!px)[a-z%]+$', 'i')
    const Dt = /^--/
    const dt = function (e) {
      let t = e.ownerDocument.defaultView
      return (!t || !t.opener) && (t = h), t.getComputedStyle(e)
    }
    const dn = function (e, t, n) {
      let i
      let o
      const s = {}
      for (o in t) (s[o] = e.style[o]), (e.style[o] = t[o])
      i = n.call(e)
      for (o in t) e.style[o] = s[o]
      return i
    }
    const gi = new RegExp(Ee.join('|'), 'i');
    (function () {
      function e () {
        if (d) {
          (f.style.cssText =
                        'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
          (d.style.cssText =
                            'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
          Le.appendChild(f).appendChild(d)
          const v = h.getComputedStyle(d);
          (n = v.top !== '1%'),
          (l = t(v.marginLeft) === 12),
          (d.style.right = '60%'),
          (s = t(v.right) === 36),
          (i = t(v.width) === 36),
          (d.style.position = 'absolute'),
          (o = t(d.offsetWidth / 3) === 12),
          Le.removeChild(f),
          (d = null)
        }
      }
      function t (v) {
        return Math.round(parseFloat(v))
      }
      let n
      let i
      let o
      let s
      let a
      let l
      var f = P.createElement('div')
      var d = P.createElement('div')
      d.style &&
                ((d.style.backgroundClip = 'content-box'),
                (d.cloneNode(!0).style.backgroundClip = ''),
                (O.clearCloneStyle = d.style.backgroundClip === 'content-box'),
                r.extend(O, {
                  boxSizingReliable: function () {
                    return e(), i
                  },
                  pixelBoxStyles: function () {
                    return e(), s
                  },
                  pixelPosition: function () {
                    return e(), n
                  },
                  reliableMarginLeft: function () {
                    return e(), l
                  },
                  scrollboxSize: function () {
                    return e(), o
                  },
                  reliableTrDimensions: function () {
                    let v, b, g, x
                    return (
                      a == null &&
                                ((v = P.createElement('table')),
                                (b = P.createElement('tr')),
                                (g = P.createElement('div')),
                                (v.style.cssText =
                                    'position:absolute;left:-11111px;border-collapse:separate'),
                                (b.style.cssText =
                                    'box-sizing:content-box;border:1px solid'),
                                (b.style.height = '1px'),
                                (g.style.height = '9px'),
                                (g.style.display = 'block'),
                                Le.appendChild(v).appendChild(b).appendChild(g),
                                (x = h.getComputedStyle(b)),
                                (a =
                                    parseInt(x.height, 10) +
                                        parseInt(x.borderTopWidth, 10) +
                                        parseInt(x.borderBottomWidth, 10) ===
                                    b.offsetHeight),
                                Le.removeChild(v)),
                      a
                    )
                  }
                }))
    })()
    function et (e, t, n) {
      let i
      let o
      let s
      let a
      const l = Dt.test(t)
      const f = e.style
      return (
        (n = n || dt(e)),
        n &&
                    ((a = n.getPropertyValue(t) || n[t]),
                    l && a && (a = a.replace(Ge, '$1') || void 0),
                    a === '' && !We(e) && (a = r.style(e, t)),
                    !O.pixelBoxStyles() &&
                        At.test(a) &&
                        gi.test(t) &&
                        ((i = f.width),
                        (o = f.minWidth),
                        (s = f.maxWidth),
                        (f.minWidth = f.maxWidth = f.width = a),
                        (a = n.width),
                        (f.width = i),
                        (f.minWidth = o),
                        (f.maxWidth = s))),
        a !== void 0 ? a + '' : a
      )
    }
    function pn (e, t) {
      return {
        get: function () {
          if (e()) {
            delete this.get
            return
          }
          return (this.get = t).apply(this, arguments)
        }
      }
    }
    const hn = ['Webkit', 'Moz', 'ms']
    const gn = P.createElement('div').style
    const yn = {}
    function yi (e) {
      for (
        let t = e[0].toUpperCase() + e.slice(1), n = hn.length;
        n--;

      ) {
        if (((e = hn[n] + t), e in gn)) return e
      }
    }
    function kt (e) {
      const t = r.cssProps[e] || yn[e]
      return t || (e in gn ? e : (yn[e] = yi(e) || e))
    }
    const vi = /^(none|table(?!-c[ea]).+)/
    const mi = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }
    const vn = { letterSpacing: '0', fontWeight: '400' }
    function mn (e, t, n) {
      const i = Ke.exec(t)
      return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || 'px') : t
    }
    function jt (e, t, n, i, o, s) {
      let a = t === 'width' ? 1 : 0
      let l = 0
      let f = 0
      let d = 0
      if (n === (i ? 'border' : 'content')) return 0
      for (; a < 4; a += 2) {
        n === 'margin' && (d += r.css(e, n + Ee[a], !0, o)),
        i
          ? (n === 'content' &&
                              (f -= r.css(e, 'padding' + Ee[a], !0, o)),
            n !== 'margin' &&
                              (f -= r.css(
                                e,
                                'border' + Ee[a] + 'Width',
                                !0,
                                o
                              )))
          : ((f += r.css(e, 'padding' + Ee[a], !0, o)),
            n !== 'padding'
              ? (f += r.css(
                  e,
                  'border' + Ee[a] + 'Width',
                  !0,
                  o
                ))
              : (l += r.css(
                  e,
                  'border' + Ee[a] + 'Width',
                  !0,
                  o
                )))
      }
      return (
        !i &&
                    s >= 0 &&
                    (f +=
                        Math.max(
                          0,
                          Math.ceil(
                            e['offset' + t[0].toUpperCase() + t.slice(1)] -
                                    s -
                                    f -
                                    l -
                                    0.5
                          )
                        ) || 0),
        f + d
      )
    }
    function bn (e, t, n) {
      const i = dt(e)
      const o = !O.boxSizingReliable() || n
      let s = o && r.css(e, 'boxSizing', !1, i) === 'border-box'
      let a = s
      let l = et(e, t, i)
      const f = 'offset' + t[0].toUpperCase() + t.slice(1)
      if (At.test(l)) {
        if (!n) return l
        l = 'auto'
      }
      return (
        ((!O.boxSizingReliable() && s) ||
                    (!O.reliableTrDimensions() && Q(e, 'tr')) ||
                    l === 'auto' ||
                    (!parseFloat(l) &&
                        r.css(e, 'display', !1, i) === 'inline')) &&
                    e.getClientRects().length &&
                    ((s = r.css(e, 'boxSizing', !1, i) === 'border-box'),
                    (a = f in e),
                    a && (l = e[f])),
        (l = parseFloat(l) || 0),
        l + jt(e, t, n || (s ? 'border' : 'content'), a, i, l) + 'px'
      )
    }
    r.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              const n = et(e, 'opacity')
              return n === '' ? '1' : n
            }
          }
        }
      },
      cssNumber: {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageSlice: !0,
        columnCount: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        scale: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0
      },
      cssProps: {},
      style: function (e, t, n, i) {
        if (!(!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)) {
          let o
          let s
          let a
          const l = ge(t)
          const f = Dt.test(t)
          const d = e.style
          if (
            (f || (t = kt(l)),
            (a = r.cssHooks[t] || r.cssHooks[l]),
            n !== void 0)
          ) {
            if (
              ((s = typeof n),
              s === 'string' &&
                                (o = Ke.exec(n)) &&
                                o[1] &&
                                ((n = nn(e, t, o)), (s = 'number')),
              n == null || n !== n)
            ) {
              return
            }
            s === 'number' &&
                            !f &&
                            (n += (o && o[3]) || (r.cssNumber[l] ? '' : 'px')),
            !O.clearCloneStyle &&
                                n === '' &&
                                t.indexOf('background') === 0 &&
                                (d[t] = 'inherit'),
            (!a ||
                                !('set' in a) ||
                                (n = a.set(e, n, i)) !== void 0) &&
                                (f ? d.setProperty(t, n) : (d[t] = n))
          } else {
            return a &&
                            'get' in a &&
                            (o = a.get(e, !1, i)) !== void 0
              ? o
              : d[t]
          }
        }
      },
      css: function (e, t, n, i) {
        let o
        let s
        let a
        const l = ge(t)
        const f = Dt.test(t)
        return (
          f || (t = kt(l)),
          (a = r.cssHooks[t] || r.cssHooks[l]),
          a && 'get' in a && (o = a.get(e, !0, n)),
          o === void 0 && (o = et(e, t, i)),
          o === 'normal' && t in vn && (o = vn[t]),
          n === '' || n
            ? ((s = parseFloat(o)),
              n === !0 || isFinite(s) ? s || 0 : o)
            : o
        )
      }
    }),
    r.each(['height', 'width'], function (e, t) {
      r.cssHooks[t] = {
        get: function (n, i, o) {
          if (i) {
            return vi.test(r.css(n, 'display')) &&
                                (!n.getClientRects().length ||
                                    !n.getBoundingClientRect().width)
              ? dn(n, mi, function () {
                return bn(n, t, o)
              })
              : bn(n, t, o)
          }
        },
        set: function (n, i, o) {
          let s
          const a = dt(n)
          const l =
                            !O.scrollboxSize() && a.position === 'absolute'
          const f = l || o
          const d =
                            f && r.css(n, 'boxSizing', !1, a) === 'border-box'
          let v = o ? jt(n, t, o, d, a) : 0
          return (
            d &&
                                l &&
                                (v -= Math.ceil(
                                  n[
                                    'offset' +
                                            t[0].toUpperCase() +
                                            t.slice(1)
                                  ] -
                                        parseFloat(a[t]) -
                                        jt(n, t, 'border', !1, a) -
                                        0.5
                                )),
            v &&
                                (s = Ke.exec(i)) &&
                                (s[3] || 'px') !== 'px' &&
                                ((n.style[t] = i), (i = r.css(n, t))),
            mn(n, i, v)
          )
        }
      }
    }),
    (r.cssHooks.marginLeft = pn(O.reliableMarginLeft, function (e, t) {
      if (t) {
        return (
          (parseFloat(et(e, 'marginLeft')) ||
                            e.getBoundingClientRect().left -
                                dn(e, { marginLeft: 0 }, function () {
                                  return e.getBoundingClientRect().left
                                })) + 'px'
        )
      }
    })),
    r.each(
      { margin: '', padding: '', border: 'Width' },
      function (e, t) {
        (r.cssHooks[e + t] = {
          expand: function (n) {
            for (
              var i = 0,
                o = {},
                s =
                                        typeof n === 'string'
                                          ? n.split(' ')
                                          : [n];
              i < 4;
              i++
            ) {
              o[e + Ee[i] + t] = s[i] || s[i - 2] || s[0]
            }
            return o
          }
        }),
        e !== 'margin' && (r.cssHooks[e + t].set = mn)
      }
    ),
    r.fn.extend({
      css: function (e, t) {
        return we(
          this,
          function (n, i, o) {
            let s
            let a
            const l = {}
            let f = 0
            if (Array.isArray(i)) {
              for (s = dt(n), a = i.length; f < a; f++) {
                l[i[f]] = r.css(n, i[f], !1, s)
              }
              return l
            }
            return o !== void 0
              ? r.style(n, i, o)
              : r.css(n, i)
          },
          e,
          t,
          arguments.length > 1
        )
      }
    })
    function oe (e, t, n, i, o) {
      return new oe.prototype.init(e, t, n, i, o)
    }
    (r.Tween = oe),
    (oe.prototype = {
      constructor: oe,
      init: function (e, t, n, i, o, s) {
        (this.elem = e),
        (this.prop = n),
        (this.easing = o || r.easing._default),
        (this.options = t),
        (this.start = this.now = this.cur()),
        (this.end = i),
        (this.unit = s || (r.cssNumber[n] ? '' : 'px'))
      },
      cur: function () {
        const e = oe.propHooks[this.prop]
        return e && e.get
          ? e.get(this)
          : oe.propHooks._default.get(this)
      },
      run: function (e) {
        let t
        const n = oe.propHooks[this.prop]
        return (
          this.options.duration
            ? (this.pos = t =
                                  r.easing[this.easing](
                                    e,
                                    this.options.duration * e,
                                    0,
                                    1,
                                    this.options.duration
                                  ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
                            this.options.step.call(this.elem, this.now, this),
          n && n.set
            ? n.set(this)
            : oe.propHooks._default.set(this),
          this
        )
      }
    }),
    (oe.prototype.init.prototype = oe.prototype),
    (oe.propHooks = {
      _default: {
        get: function (e) {
          let t
          return e.elem.nodeType !== 1 ||
                            (e.elem[e.prop] != null &&
                                e.elem.style[e.prop] == null)
            ? e.elem[e.prop]
            : ((t = r.css(e.elem, e.prop, '')),
              !t || t === 'auto' ? 0 : t)
        },
        set: function (e) {
          r.fx.step[e.prop]
            ? r.fx.step[e.prop](e)
            : e.elem.nodeType === 1 &&
                                (r.cssHooks[e.prop] ||
                                    e.elem.style[kt(e.prop)] != null)
              ? r.style(e.elem, e.prop, e.now + e.unit)
              : (e.elem[e.prop] = e.now)
        }
      }
    }),
    (oe.propHooks.scrollTop = oe.propHooks.scrollLeft =
                {
                  set: function (e) {
                    e.elem.nodeType &&
                            e.elem.parentNode &&
                            (e.elem[e.prop] = e.now)
                  }
                }),
    (r.easing = {
      linear: function (e) {
        return e
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2
      },
      _default: 'swing'
    }),
    (r.fx = oe.prototype.init),
    (r.fx.step = {})
    let ze
    let pt
    const bi = /^(?:toggle|show|hide)$/
    const xi = /queueHooks$/
    function Lt () {
      pt &&
                (P.hidden === !1 && h.requestAnimationFrame
                  ? h.requestAnimationFrame(Lt)
                  : h.setTimeout(Lt, r.fx.interval),
                r.fx.tick())
    }
    function xn () {
      return (
        h.setTimeout(function () {
          ze = void 0
        }),
        (ze = Date.now())
      )
    }
    function ht (e, t) {
      let n
      let i = 0
      const o = { height: e }
      for (t = t ? 1 : 0; i < 4; i += 2 - t) {
        (n = Ee[i]), (o['margin' + n] = o['padding' + n] = e)
      }
      return t && (o.opacity = o.width = e), o
    }
    function Cn (e, t, n) {
      for (
        var i,
          o = (de.tweeners[t] || []).concat(de.tweeners['*']),
          s = 0,
          a = o.length;
        s < a;
        s++
      ) {
        if ((i = o[s].call(n, t, e))) return i
      }
    }
    function Ci (e, t, n) {
      let i
      let o
      let s
      let a
      let l
      let f
      let d
      let v
      const b = 'width' in t || 'height' in t
      const g = this
      const x = {}
      const H = e.style
      let B = e.nodeType && lt(e)
      let R = A.get(e, 'fxshow')
      n.queue ||
                ((a = r._queueHooks(e, 'fx')),
                a.unqueued == null &&
                    ((a.unqueued = 0),
                    (l = a.empty.fire),
                    (a.empty.fire = function () {
                      a.unqueued || l()
                    })),
                a.unqueued++,
                g.always(function () {
                  g.always(function () {
                    a.unqueued--, r.queue(e, 'fx').length || a.empty.fire()
                  })
                }))
      for (i in t) {
        if (((o = t[i]), bi.test(o))) {
          if (
            (delete t[i],
            (s = s || o === 'toggle'),
            o === (B ? 'hide' : 'show'))
          ) {
            if (o === 'show' && R && R[i] !== void 0) B = !0
            else continue
          }
          x[i] = (R && R[i]) || r.style(e, i)
        }
      }
      if (((f = !r.isEmptyObject(t)), !(!f && r.isEmptyObject(x)))) {
        b &&
                    e.nodeType === 1 &&
                    ((n.overflow = [H.overflow, H.overflowX, H.overflowY]),
                    (d = R && R.display),
                    d == null && (d = A.get(e, 'display')),
                    (v = r.css(e, 'display')),
                    v === 'none' &&
                        (d
                          ? (v = d)
                          : (Fe([e], !0),
                            (d = e.style.display || d),
                            (v = r.css(e, 'display')),
                            Fe([e]))),
                    (v === 'inline' || (v === 'inline-block' && d != null)) &&
                        r.css(e, 'float') === 'none' &&
                        (f ||
                            (g.done(function () {
                              H.display = d
                            }),
                            d == null &&
                                ((v = H.display), (d = v === 'none' ? '' : v))),
                        (H.display = 'inline-block'))),
        n.overflow &&
                        ((H.overflow = 'hidden'),
                        g.always(function () {
                          (H.overflow = n.overflow[0]),
                          (H.overflowX = n.overflow[1]),
                          (H.overflowY = n.overflow[2])
                        })),
        (f = !1)
        for (i in x) {
          f ||
                        (R
                          ? 'hidden' in R && (B = R.hidden)
                          : (R = A.access(e, 'fxshow', { display: d })),
                        s && (R.hidden = !B),
                        B && Fe([e], !0),
                        g.done(function () {
                          B || Fe([e]), A.remove(e, 'fxshow')
                          for (i in x) r.style(e, i, x[i])
                        })),
          (f = Cn(B ? R[i] : 0, i, g)),
          i in R ||
                            ((R[i] = f.start),
                            B && ((f.end = f.start), (f.start = 0)))
        }
      }
    }
    function Ti (e, t) {
      let n, i, o, s, a
      for (n in e) {
        if (
          ((i = ge(n)),
          (o = t[i]),
          (s = e[n]),
          Array.isArray(s) && ((o = s[1]), (s = e[n] = s[0])),
          n !== i && ((e[i] = s), delete e[n]),
          (a = r.cssHooks[i]),
          a && 'expand' in a)
        ) {
          (s = a.expand(s)), delete e[i]
          for (n in s) n in e || ((e[n] = s[n]), (t[n] = o))
        } else t[i] = o
      }
    }
    function de (e, t, n) {
      let i
      let o
      let s = 0
      const a = de.prefilters.length
      const l = r.Deferred().always(function () {
        delete f.elem
      })
      var f = function () {
        if (o) return !1
        for (
          var b = ze || xn(),
            g = Math.max(0, d.startTime + d.duration - b),
            x = g / d.duration || 0,
            H = 1 - x,
            B = 0,
            R = d.tweens.length;
          B < R;
          B++
        ) {
          d.tweens[B].run(H)
        }
        return (
          l.notifyWith(e, [d, H, g]),
          H < 1 && R
            ? g
            : (R || l.notifyWith(e, [d, 1, 0]),
              l.resolveWith(e, [d]),
              !1)
        )
      }
      var d = l.promise({
        elem: e,
        props: r.extend({}, t),
        opts: r.extend(
          !0,
          { specialEasing: {}, easing: r.easing._default },
          n
        ),
        originalProperties: t,
        originalOptions: n,
        startTime: ze || xn(),
        duration: n.duration,
        tweens: [],
        createTween: function (b, g) {
          const x = r.Tween(
            e,
            d.opts,
            b,
            g,
            d.opts.specialEasing[b] || d.opts.easing
          )
          return d.tweens.push(x), x
        },
        stop: function (b) {
          let g = 0
          const x = b ? d.tweens.length : 0
          if (o) return this
          for (o = !0; g < x; g++) d.tweens[g].run(1)
          return (
            b
              ? (l.notifyWith(e, [d, 1, 0]),
                l.resolveWith(e, [d, b]))
              : l.rejectWith(e, [d, b]),
            this
          )
        }
      })
      const v = d.props
      for (Ti(v, d.opts.specialEasing); s < a; s++) {
        if (((i = de.prefilters[s].call(d, e, v, d.opts)), i)) {
          return (
            M(i.stop) &&
                            (r._queueHooks(d.elem, d.opts.queue).stop =
                                i.stop.bind(i)),
            i
          )
        }
      }
      return (
        r.map(v, Cn, d),
        M(d.opts.start) && d.opts.start.call(e, d),
        d
          .progress(d.opts.progress)
          .done(d.opts.done, d.opts.complete)
          .fail(d.opts.fail)
          .always(d.opts.always),
        r.fx.timer(
          r.extend(f, { elem: e, anim: d, queue: d.opts.queue })
        ),
        d
      )
    }
    (r.Animation = r.extend(de, {
      tweeners: {
        '*': [
          function (e, t) {
            const n = this.createTween(e, t)
            return nn(n.elem, e, Ke.exec(t), n), n
          }
        ]
      },
      tweener: function (e, t) {
        M(e) ? ((t = e), (e = ['*'])) : (e = e.match(he))
        for (var n, i = 0, o = e.length; i < o; i++) {
          (n = e[i]),
          (de.tweeners[n] = de.tweeners[n] || []),
          de.tweeners[n].unshift(t)
        }
      },
      prefilters: [Ci],
      prefilter: function (e, t) {
        t ? de.prefilters.unshift(e) : de.prefilters.push(e)
      }
    })),
    (r.speed = function (e, t, n) {
      const i =
                    e && typeof e === 'object'
                      ? r.extend({}, e)
                      : {
                          complete: n || (!n && t) || (M(e) && e),
                          duration: e,
                          easing: (n && t) || (t && !M(t) && t)
                        }
      return (
        r.fx.off
          ? (i.duration = 0)
          : typeof i.duration !== 'number' &&
                          (i.duration in r.fx.speeds
                            ? (i.duration = r.fx.speeds[i.duration])
                            : (i.duration = r.fx.speeds._default)),
        (i.queue == null || i.queue === !0) && (i.queue = 'fx'),
        (i.old = i.complete),
        (i.complete = function () {
          M(i.old) && i.old.call(this),
          i.queue && r.dequeue(this, i.queue)
        }),
        i
      )
    }),
    r.fn.extend({
      fadeTo: function (e, t, n, i) {
        return this.filter(lt)
          .css('opacity', 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, i)
      },
      animate: function (e, t, n, i) {
        const o = r.isEmptyObject(e)
        const s = r.speed(t, n, i)
        const a = function () {
          const l = de(this, r.extend({}, e), s);
          (o || A.get(this, 'finish')) && l.stop(!0)
        }
        return (
          (a.finish = a),
          o || s.queue === !1
            ? this.each(a)
            : this.queue(s.queue, a)
        )
      },
      stop: function (e, t, n) {
        const i = function (o) {
          const s = o.stop
          delete o.stop, s(n)
        }
        return (
          typeof e !== 'string' &&
                            ((n = t), (t = e), (e = void 0)),
          t && this.queue(e || 'fx', []),
          this.each(function () {
            let o = !0
            let s = e != null && e + 'queueHooks'
            const a = r.timers
            const l = A.get(this)
            if (s) l[s] && l[s].stop && i(l[s])
            else {
              for (s in l) {
                l[s] && l[s].stop && xi.test(s) && i(l[s])
              }
            }
            for (s = a.length; s--;) {
              a[s].elem === this &&
                                    (e == null || a[s].queue === e) &&
                                    (a[s].anim.stop(n),
                                    (o = !1),
                                    a.splice(s, 1))
            }
            (o || !n) && r.dequeue(this, e)
          })
        )
      },
      finish: function (e) {
        return (
          e !== !1 && (e = e || 'fx'),
          this.each(function () {
            let t
            const n = A.get(this)
            const i = n[e + 'queue']
            const o = n[e + 'queueHooks']
            const s = r.timers
            const a = i ? i.length : 0
            for (
              n.finish = !0,
              r.queue(this, e, []),
              o && o.stop && o.stop.call(this, !0),
              t = s.length;
              t--;

            ) {
              s[t].elem === this &&
                                    s[t].queue === e &&
                                    (s[t].anim.stop(!0), s.splice(t, 1))
            }
            for (t = 0; t < a; t++) {
              i[t] && i[t].finish && i[t].finish.call(this)
            }
            delete n.finish
          })
        )
      }
    }),
    r.each(['toggle', 'show', 'hide'], function (e, t) {
      const n = r.fn[t]
      r.fn[t] = function (i, o, s) {
        return i == null || typeof i === 'boolean'
          ? n.apply(this, arguments)
          : this.animate(ht(t, !0), i, o, s)
      }
    }),
    r.each(
      {
        slideDown: ht('show'),
        slideUp: ht('hide'),
        slideToggle: ht('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' }
      },
      function (e, t) {
        r.fn[e] = function (n, i, o) {
          return this.animate(t, n, i, o)
        }
      }
    ),
    (r.timers = []),
    (r.fx.tick = function () {
      let e
      let t = 0
      const n = r.timers
      for (ze = Date.now(); t < n.length; t++) {
        (e = n[t]), !e() && n[t] === e && n.splice(t--, 1)
      }
      n.length || r.fx.stop(), (ze = void 0)
    }),
    (r.fx.timer = function (e) {
      r.timers.push(e), r.fx.start()
    }),
    (r.fx.interval = 13),
    (r.fx.start = function () {
      pt || ((pt = !0), Lt())
    }),
    (r.fx.stop = function () {
      pt = null
    }),
    (r.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (r.fn.delay = function (e, t) {
      return (
        (e = (r.fx && r.fx.speeds[e]) || e),
        (t = t || 'fx'),
        this.queue(t, function (n, i) {
          const o = h.setTimeout(n, e)
          i.stop = function () {
            h.clearTimeout(o)
          }
        })
      )
    }),
    (function () {
      let e = P.createElement('input')
      const t = P.createElement('select')
      const n = t.appendChild(P.createElement('option'));
      (e.type = 'checkbox'),
      (O.checkOn = e.value !== ''),
      (O.optSelected = n.selected),
      (e = P.createElement('input')),
      (e.value = 't'),
      (e.type = 'radio'),
      (O.radioValue = e.value === 't')
    })()
    let Tn
    const tt = r.expr.attrHandle
    r.fn.extend({
      attr: function (e, t) {
        return we(this, r.attr, e, t, arguments.length > 1)
      },
      removeAttr: function (e) {
        return this.each(function () {
          r.removeAttr(this, e)
        })
      }
    }),
    r.extend({
      attr: function (e, t, n) {
        let i
        let o
        const s = e.nodeType
        if (!(s === 3 || s === 8 || s === 2)) {
          if (typeof e.getAttribute > 'u') return r.prop(e, t, n)
          if (
            ((s !== 1 || !r.isXMLDoc(e)) &&
                                (o =
                                    r.attrHooks[t.toLowerCase()] ||
                                    (r.expr.match.bool.test(t) ? Tn : void 0)),
            n !== void 0)
          ) {
            if (n === null) {
              r.removeAttr(e, t)
              return
            }
            return o &&
                                'set' in o &&
                                (i = o.set(e, n, t)) !== void 0
              ? i
              : (e.setAttribute(t, n + ''), n)
          }
          return o && 'get' in o && (i = o.get(e, t)) !== null
            ? i
            : ((i = r.find.attr(e, t)), i ?? void 0)
        }
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (
              !O.radioValue &&
                                t === 'radio' &&
                                Q(e, 'input')
            ) {
              const n = e.value
              return (
                e.setAttribute('type', t),
                n && (e.value = n),
                t
              )
            }
          }
        }
      },
      removeAttr: function (e, t) {
        let n
        let i = 0
        const o = t && t.match(he)
        if (o && e.nodeType === 1) {
          for (; (n = o[i++]);) e.removeAttribute(n)
        }
      }
    }),
    (Tn = {
      set: function (e, t, n) {
        return (
          t === !1 ? r.removeAttr(e, n) : e.setAttribute(n, n), n
        )
      }
    }),
    r.each(r.expr.match.bool.source.match(/\w+/g), function (e, t) {
      const n = tt[t] || r.find.attr
      tt[t] = function (i, o, s) {
        let a
        let l
        const f = o.toLowerCase()
        return (
          s ||
                            ((l = tt[f]),
                            (tt[f] = a),
                            (a = n(i, o, s) != null ? f : null),
                            (tt[f] = l)),
          a
        )
      }
    })
    const wi = /^(?:input|select|textarea|button)$/i
    const Ei = /^(?:a|area)$/i
    r.fn.extend({
      prop: function (e, t) {
        return we(this, r.prop, e, t, arguments.length > 1)
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[r.propFix[e] || e]
        })
      }
    }),
    r.extend({
      prop: function (e, t, n) {
        let i
        let o
        const s = e.nodeType
        if (!(s === 3 || s === 8 || s === 2)) {
          return (
            (s !== 1 || !r.isXMLDoc(e)) &&
                                ((t = r.propFix[t] || t), (o = r.propHooks[t])),
            n !== void 0
              ? o &&
                                  'set' in o &&
                                  (i = o.set(e, n, t)) !== void 0
                ? i
                : (e[t] = n)
              : o && 'get' in o && (i = o.get(e, t)) !== null
                ? i
                : e[t]
          )
        }
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            const t = r.find.attr(e, 'tabindex')
            return t
              ? parseInt(t, 10)
              : wi.test(e.nodeName) ||
                                    (Ei.test(e.nodeName) && e.href)
                ? 0
                : -1
          }
        }
      },
      propFix: { for: 'htmlFor', class: 'className' }
    }),
    O.optSelected ||
                (r.propHooks.selected = {
                  get: function (e) {
                    const t = e.parentNode
                    return (
                      t && t.parentNode && t.parentNode.selectedIndex,
                      null
                    )
                  },
                  set: function (e) {
                    const t = e.parentNode
                    t &&
                            (t.selectedIndex,
                            t.parentNode && t.parentNode.selectedIndex)
                  }
                }),
    r.each(
      [
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable'
      ],
      function () {
        r.propFix[this.toLowerCase()] = this
      }
    )
    function He (e) {
      const t = e.match(he) || []
      return t.join(' ')
    }
    function qe (e) {
      return (e.getAttribute && e.getAttribute('class')) || ''
    }
    function Ht (e) {
      return Array.isArray(e)
        ? e
        : typeof e === 'string'
          ? e.match(he) || []
          : []
    }
    r.fn.extend({
      addClass: function (e) {
        let t, n, i, o, s, a
        return M(e)
          ? this.each(function (l) {
            r(this).addClass(e.call(this, l, qe(this)))
          })
          : ((t = Ht(e)),
            t.length
              ? this.each(function () {
                if (
                  ((i = qe(this)),
                  (n =
                                        this.nodeType === 1 &&
                                        ' ' + He(i) + ' '),
                  n)
                ) {
                  for (s = 0; s < t.length; s++) {
                    (o = t[s]),
                    n.indexOf(' ' + o + ' ') < 0 &&
                                                (n += o + ' ')
                  }
                  (a = He(n)),
                  i !== a &&
                                            this.setAttribute('class', a)
                }
              })
              : this)
      },
      removeClass: function (e) {
        let t, n, i, o, s, a
        return M(e)
          ? this.each(function (l) {
            r(this).removeClass(e.call(this, l, qe(this)))
          })
          : arguments.length
            ? ((t = Ht(e)),
              t.length
                ? this.each(function () {
                  if (
                    ((i = qe(this)),
                    (n =
                                          this.nodeType === 1 &&
                                          ' ' + He(i) + ' '),
                    n)
                  ) {
                    for (s = 0; s < t.length; s++) {
                      for (
                        o = t[s];
                        n.indexOf(' ' + o + ' ') > -1;

                      ) {
                        n = n.replace(' ' + o + ' ', ' ')
                      }
                    }
                    (a = He(n)),
                    i !== a &&
                                              this.setAttribute('class', a)
                  }
                })
                : this)
            : this.attr('class', '')
      },
      toggleClass: function (e, t) {
        let n
        let i
        let o
        let s
        const a = typeof e
        const l = a === 'string' || Array.isArray(e)
        return M(e)
          ? this.each(function (f) {
            r(this).toggleClass(e.call(this, f, qe(this), t), t)
          })
          : typeof t === 'boolean' && l
            ? t
              ? this.addClass(e)
              : this.removeClass(e)
            : ((n = Ht(e)),
              this.each(function () {
                if (l) {
                  for (s = r(this), o = 0; o < n.length; o++) {
                    (i = n[o]),
                    s.hasClass(i)
                      ? s.removeClass(i)
                      : s.addClass(i)
                  }
                } else {
                  (e === void 0 || a === 'boolean') &&
                                    ((i = qe(this)),
                                    i && A.set(this, '__className__', i),
                                    this.setAttribute &&
                                        this.setAttribute(
                                          'class',
                                          i || e === !1
                                            ? ''
                                            : A.get(
                                              this,
                                              '__className__'
                                            ) || ''
                                        ))
                }
              }))
      },
      hasClass: function (e) {
        let t
        let n
        let i = 0
        for (t = ' ' + e + ' '; (n = this[i++]);) {
          if (
            n.nodeType === 1 &&
                        (' ' + He(qe(n)) + ' ').indexOf(t) > -1
          ) {
            return !0
          }
        }
        return !1
      }
    })
    const Ni = /\r/g
    r.fn.extend({
      val: function (e) {
        let t
        let n
        let i
        const o = this[0]
        return arguments.length
          ? ((i = M(e)),
            this.each(function (s) {
              let a
              this.nodeType === 1 &&
                              (i
                                ? (a = e.call(this, s, r(this).val()))
                                : (a = e),
                              a == null
                                ? (a = '')
                                : typeof a === 'number'
                                  ? (a += '')
                                  : Array.isArray(a) &&
                                      (a = r.map(a, function (l) {
                                        return l == null ? '' : l + ''
                                      })),
                              (t =
                                  r.valHooks[this.type] ||
                                  r.valHooks[this.nodeName.toLowerCase()]),
                              (!t ||
                                  !('set' in t) ||
                                  t.set(this, a, 'value') === void 0) &&
                                  (this.value = a))
            }))
          : o
            ? ((t =
                            r.valHooks[o.type] ||
                            r.valHooks[o.nodeName.toLowerCase()]),
              t && 'get' in t && (n = t.get(o, 'value')) !== void 0
                ? n
                : ((n = o.value),
                  typeof n === 'string'
                    ? n.replace(Ni, '')
                    : n ?? ''))
            : void 0
      }
    }),
    r.extend({
      valHooks: {
        option: {
          get: function (e) {
            const t = r.find.attr(e, 'value')
            return t ?? He(r.text(e))
          }
        },
        select: {
          get: function (e) {
            let t
            let n
            let i
            const o = e.options
            const s = e.selectedIndex
            const a = e.type === 'select-one'
            const l = a ? null : []
            const f = a ? s + 1 : o.length
            for (
              s < 0 ? (i = f) : (i = a ? s : 0);
              i < f;
              i++
            ) {
              if (
                ((n = o[i]),
                (n.selected || i === s) &&
                                        !n.disabled &&
                                        (!n.parentNode.disabled ||
                                            !Q(n.parentNode, 'optgroup')))
              ) {
                if (((t = r(n).val()), a)) return t
                l.push(t)
              }
            }
            return l
          },
          set: function (e, t) {
            for (
              var n,
                i,
                o = e.options,
                s = r.makeArray(t),
                a = o.length;
              a--;

            ) {
              (i = o[a]),
              (i.selected =
                                        r.inArray(r.valHooks.option.get(i), s) >
                                        -1) && (n = !0)
            }
            return n || (e.selectedIndex = -1), s
          }
        }
      }
    }),
    r.each(['radio', 'checkbox'], function () {
      (r.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t)) {
            return (e.checked = r.inArray(r(e).val(), t) > -1)
          }
        }
      }),
      O.checkOn ||
                        (r.valHooks[this].get = function (e) {
                          return e.getAttribute('value') === null
                            ? 'on'
                            : e.value
                        })
    })
    const nt = h.location
    const wn = { guid: Date.now() }
    const qt = /\?/
    r.parseXML = function (e) {
      let t, n
      if (!e || typeof e !== 'string') return null
      try {
        t = new h.DOMParser().parseFromString(e, 'text/xml')
      } catch {}
      return (
        (n = t && t.getElementsByTagName('parsererror')[0]),
        (!t || n) &&
                    r.error(
                      'Invalid XML: ' +
                            (n
                              ? r.map(n.childNodes, function (i) {
                                return i.textContent
                              }).join(`
`)
                              : e)
                    ),
        t
      )
    }
    const En = /^(?:focusinfocus|focusoutblur)$/
    const Nn = function (e) {
      e.stopPropagation()
    }
    r.extend(r.event, {
      trigger: function (e, t, n, i) {
        let o
        let s
        let a
        let l
        let f
        let d
        let v
        let b
        const g = [n || P]
        let x = ae.call(e, 'type') ? e.type : e
        let H = ae.call(e, 'namespace') ? e.namespace.split('.') : []
        if (
          ((s = b = a = n = n || P),
          !(n.nodeType === 3 || n.nodeType === 8) &&
                        !En.test(x + r.event.triggered) &&
                        (x.indexOf('.') > -1 &&
                            ((H = x.split('.')), (x = H.shift()), H.sort()),
                        (f = x.indexOf(':') < 0 && 'on' + x),
                        (e = e[r.expando]
                          ? e
                          : new r.Event(x, typeof e === 'object' && e)),
                        (e.isTrigger = i ? 2 : 3),
                        (e.namespace = H.join('.')),
                        (e.rnamespace = e.namespace
                          ? new RegExp(
                            '(^|\\.)' +
                                      H.join('\\.(?:.*\\.|)') +
                                      '(\\.|$)'
                          )
                          : null),
                        (e.result = void 0),
                        e.target || (e.target = n),
                        (t = t == null ? [e] : r.makeArray(t, [e])),
                        (v = r.event.special[x] || {}),
                        !(!i && v.trigger && v.trigger.apply(n, t) === !1)))
        ) {
          if (!i && !v.noBubble && !Re(n)) {
            for (
              l = v.delegateType || x,
              En.test(l + x) || (s = s.parentNode);
              s;
              s = s.parentNode
            ) {
              g.push(s), (a = s)
            }
            a === (n.ownerDocument || P) &&
                            g.push(a.defaultView || a.parentWindow || h)
          }
          for (o = 0; (s = g[o++]) && !e.isPropagationStopped();) {
            (b = s),
            (e.type = o > 1 ? l : v.bindType || x),
            (d =
                                (A.get(s, 'events') || Object.create(null))[
                                  e.type
                                ] && A.get(s, 'handle')),
            d && d.apply(s, t),
            (d = f && s[f]),
            d &&
                                d.apply &&
                                Qe(s) &&
                                ((e.result = d.apply(s, t)),
                                e.result === !1 && e.preventDefault())
          }
          return (
            (e.type = x),
            !i &&
                            !e.isDefaultPrevented() &&
                            (!v._default ||
                                v._default.apply(g.pop(), t) === !1) &&
                            Qe(n) &&
                            f &&
                            M(n[x]) &&
                            !Re(n) &&
                            ((a = n[f]),
                            a && (n[f] = null),
                            (r.event.triggered = x),
                            e.isPropagationStopped() &&
                                b.addEventListener(x, Nn),
                            n[x](),
                            e.isPropagationStopped() &&
                                b.removeEventListener(x, Nn),
                            (r.event.triggered = void 0),
                            a && (n[f] = a)),
            e.result
          )
        }
      },
      simulate: function (e, t, n) {
        const i = r.extend(new r.Event(), n, {
          type: e,
          isSimulated: !0
        })
        r.event.trigger(i, null, t)
      }
    }),
    r.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          r.event.trigger(e, t, this)
        })
      },
      triggerHandler: function (e, t) {
        const n = this[0]
        if (n) return r.event.trigger(e, t, n, !0)
      }
    })
    const Si = /\[\]$/
    const Sn = /\r?\n/g
    const Ai = /^(?:submit|button|image|reset|file)$/i
    const Di = /^(?:input|select|textarea|keygen)/i
    function Pt (e, t, n, i) {
      let o
      if (Array.isArray(t)) {
        r.each(t, function (s, a) {
          n || Si.test(e)
            ? i(e, a)
            : Pt(
              e +
                                  '[' +
                                  (typeof a === 'object' && a != null
                                    ? s
                                    : '') +
                                  ']',
              a,
              n,
              i
            )
        })
      } else if (!n && Ie(t) === 'object') {
        for (o in t) Pt(e + '[' + o + ']', t[o], n, i)
      } else i(e, t)
    }
    (r.param = function (e, t) {
      let n
      const i = []
      const o = function (s, a) {
        const l = M(a) ? a() : a
        i[i.length] =
                    encodeURIComponent(s) + '=' + encodeURIComponent(l ?? '')
      }
      if (e == null) return ''
      if (Array.isArray(e) || (e.jquery && !r.isPlainObject(e))) {
        r.each(e, function () {
          o(this.name, this.value)
        })
      } else for (n in e) Pt(n, e[n], t, o)
      return i.join('&')
    }),
    r.fn.extend({
      serialize: function () {
        return r.param(this.serializeArray())
      },
      serializeArray: function () {
        return this.map(function () {
          const e = r.prop(this, 'elements')
          return e ? r.makeArray(e) : this
        })
          .filter(function () {
            const e = this.type
            return (
              this.name &&
                                !r(this).is(':disabled') &&
                                Di.test(this.nodeName) &&
                                !Ai.test(e) &&
                                (this.checked || !Ze.test(e))
            )
          })
          .map(function (e, t) {
            const n = r(this).val()
            return n == null
              ? null
              : Array.isArray(n)
                ? r.map(n, function (i) {
                  return {
                    name: t.name,
                    value: i.replace(
                      Sn,
                                                `\r
`
                    )
                  }
                })
                : {
                    name: t.name,
                    value: n.replace(
                      Sn,
                                            `\r
`
                    )
                  }
          })
          .get()
      }
    })
    const ki = /%20/g
    const ji = /#.*$/
    const Li = /([?&])_=[^&]*/
    const Hi = /^(.*?):[ \t]*([^\r\n]*)$/gm
    const qi = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
    const Pi = /^(?:GET|HEAD)$/
    const Oi = /^\/\//
    const An = {}
    const Ot = {}
    const Dn = '*/'.concat('*')
    const Mt = P.createElement('a')
    Mt.href = nt.href
    function kn (e) {
      return function (t, n) {
        typeof t !== 'string' && ((n = t), (t = '*'))
        let i
        let o = 0
        const s = t.toLowerCase().match(he) || []
        if (M(n)) {
          for (; (i = s[o++]);) {
            i[0] === '+'
              ? ((i = i.slice(1) || '*'),
                (e[i] = e[i] || []).unshift(n))
              : (e[i] = e[i] || []).push(n)
          }
        }
      }
    }
    function jn (e, t, n, i) {
      const o = {}
      const s = e === Ot
      function a (l) {
        let f
        return (
          (o[l] = !0),
          r.each(e[l] || [], function (d, v) {
            const b = v(t, n, i)
            if (typeof b === 'string' && !s && !o[b]) {
              return t.dataTypes.unshift(b), a(b), !1
            }
            if (s) return !(f = b)
          }),
          f
        )
      }
      return a(t.dataTypes[0]) || (!o['*'] && a('*'))
    }
    function Rt (e, t) {
      let n
      let i
      const o = r.ajaxSettings.flatOptions || {}
      for (n in t) {
        t[n] !== void 0 && ((o[n] ? e : i || (i = {}))[n] = t[n])
      }
      return i && r.extend(!0, e, i), e
    }
    function Mi (e, t, n) {
      for (
        var i, o, s, a, l = e.contents, f = e.dataTypes;
        f[0] === '*';

      ) {
        f.shift(),
        i === void 0 &&
                        (i = e.mimeType || t.getResponseHeader('Content-Type'))
      }
      if (i) {
        for (o in l) {
          if (l[o] && l[o].test(i)) {
            f.unshift(o)
            break
          }
        }
      }
      if (f[0] in n) s = f[0]
      else {
        for (o in n) {
          if (!f[0] || e.converters[o + ' ' + f[0]]) {
            s = o
            break
          }
          a || (a = o)
        }
        s = s || a
      }
      if (s) return s !== f[0] && f.unshift(s), n[s]
    }
    function Ri (e, t, n, i) {
      let o
      let s
      let a
      let l
      let f
      const d = {}
      const v = e.dataTypes.slice()
      if (v[1]) {
        for (a in e.converters) d[a.toLowerCase()] = e.converters[a]
      }
      for (s = v.shift(); s;) {
        if (
          (e.responseFields[s] && (n[e.responseFields[s]] = t),
          !f &&
                        i &&
                        e.dataFilter &&
                        (t = e.dataFilter(t, e.dataType)),
          (f = s),
          (s = v.shift()),
          s)
        ) {
          if (s === '*') s = f
          else if (f !== '*' && f !== s) {
            if (((a = d[f + ' ' + s] || d['* ' + s]), !a)) {
              for (o in d) {
                if (
                  ((l = o.split(' ')),
                  l[1] === s &&
                                        ((a =
                                            d[f + ' ' + l[0]] ||
                                            d['* ' + l[0]]),
                                        a))
                ) {
                  a === !0
                    ? (a = d[o])
                    : d[o] !== !0 &&
                                          ((s = l[0]), v.unshift(l[1]))
                  break
                }
              }
            }
            if (a !== !0) {
              if (a && e.throws) t = a(t)
              else {
                try {
                  t = a(t)
                } catch (b) {
                  return {
                    state: 'parsererror',
                    error: a
                      ? b
                      : 'No conversion from ' +
                                              f +
                                              ' to ' +
                                              s
                  }
                }
              }
            }
          }
        }
      }
      return { state: 'success', data: t }
    }
    r.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: nt.href,
        type: 'GET',
        isLocal: qi.test(nt.protocol),
        global: !0,
        processData: !0,
        async: !0,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        accepts: {
          '*': Dn,
          text: 'text/plain',
          html: 'text/html',
          xml: 'application/xml, text/xml',
          json: 'application/json, text/javascript'
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: 'responseXML',
          text: 'responseText',
          json: 'responseJSON'
        },
        converters: {
          '* text': String,
          'text html': !0,
          'text json': JSON.parse,
          'text xml': r.parseXML
        },
        flatOptions: { url: !0, context: !0 }
      },
      ajaxSetup: function (e, t) {
        return t ? Rt(Rt(e, r.ajaxSettings), t) : Rt(r.ajaxSettings, e)
      },
      ajaxPrefilter: kn(An),
      ajaxTransport: kn(Ot),
      ajax: function (e, t) {
        typeof e === 'object' && ((t = e), (e = void 0)), (t = t || {})
        let n
        let i
        let o
        let s
        let a
        let l
        let f
        let d
        let v
        let b
        const g = r.ajaxSetup({}, t)
        const x = g.context || g
        const H =
                    g.context && (x.nodeType || x.jquery) ? r(x) : r.event
        const B = r.Deferred()
        const R = r.Callbacks('once memory')
        let Z = g.statusCode || {}
        const K = {}
        const ye = {}
        let ve = 'canceled'
        var F = {
          readyState: 0,
          getResponseHeader: function ($) {
            let J
            if (f) {
              if (!s) {
                for (s = {}; (J = Hi.exec(o));) {
                  s[J[1].toLowerCase() + ' '] = (
                    s[J[1].toLowerCase() + ' '] || []
                  ).concat(J[2])
                }
              }
              J = s[$.toLowerCase() + ' ']
            }
            return J == null ? null : J.join(', ')
          },
          getAllResponseHeaders: function () {
            return f ? o : null
          },
          setRequestHeader: function ($, J) {
            return (
              f == null &&
                                (($ = ye[$.toLowerCase()] =
                                    ye[$.toLowerCase()] || $),
                                (K[$] = J)),
              this
            )
          },
          overrideMimeType: function ($) {
            return f == null && (g.mimeType = $), this
          },
          statusCode: function ($) {
            let J
            if ($) {
              if (f) F.always($[F.status])
              else for (J in $) Z[J] = [Z[J], $[J]]
            }
            return this
          },
          abort: function ($) {
            const J = $ || ve
            return n && n.abort(J), Pe(0, J), this
          }
        }
        if (
          (B.promise(F),
          (g.url = ((e || g.url || nt.href) + '').replace(
            Oi,
            nt.protocol + '//'
          )),
          (g.type = t.method || t.type || g.method || g.type),
          (g.dataTypes = (g.dataType || '*')
            .toLowerCase()
            .match(he) || ['']),
          g.crossDomain == null)
        ) {
          l = P.createElement('a')
          try {
            (l.href = g.url),
            (l.href = l.href),
            (g.crossDomain =
                                Mt.protocol + '//' + Mt.host !=
                                l.protocol + '//' + l.host)
          } catch {
            g.crossDomain = !0
          }
        }
        if (
          (g.data &&
                        g.processData &&
                        typeof g.data !== 'string' &&
                        (g.data = r.param(g.data, g.traditional)),
          jn(An, g, t, F),
          f)
        ) {
          return F
        }
        (d = r.event && g.global),
        d && r.active++ === 0 && r.event.trigger('ajaxStart'),
        (g.type = g.type.toUpperCase()),
        (g.hasContent = !Pi.test(g.type)),
        (i = g.url.replace(ji, '')),
        g.hasContent
          ? g.data &&
                          g.processData &&
                          (g.contentType || '').indexOf(
                            'application/x-www-form-urlencoded'
                          ) === 0 &&
                          (g.data = g.data.replace(ki, '+'))
          : ((b = g.url.slice(i.length)),
            g.data &&
                              (g.processData || typeof g.data === 'string') &&
                              ((i += (qt.test(i) ? '&' : '?') + g.data),
                              delete g.data),
            g.cache === !1 &&
                              ((i = i.replace(Li, '$1')),
                              (b =
                                  (qt.test(i) ? '&' : '?') +
                                  '_=' +
                                  wn.guid++ +
                                  b)),
            (g.url = i + b)),
        g.ifModified &&
                        (r.lastModified[i] &&
                            F.setRequestHeader(
                              'If-Modified-Since',
                              r.lastModified[i]
                            ),
                        r.etag[i] &&
                            F.setRequestHeader('If-None-Match', r.etag[i])),
        ((g.data && g.hasContent && g.contentType !== !1) ||
                        t.contentType) &&
                        F.setRequestHeader('Content-Type', g.contentType),
        F.setRequestHeader(
          'Accept',
          g.dataTypes[0] && g.accepts[g.dataTypes[0]]
            ? g.accepts[g.dataTypes[0]] +
                                  (g.dataTypes[0] !== '*'
                                    ? ', ' + Dn + '; q=0.01'
                                    : '')
            : g.accepts['*']
        )
        for (v in g.headers) F.setRequestHeader(v, g.headers[v])
        if (g.beforeSend && (g.beforeSend.call(x, F, g) === !1 || f)) {
          return F.abort()
        }
        if (
          ((ve = 'abort'),
          R.add(g.complete),
          F.done(g.success),
          F.fail(g.error),
          (n = jn(Ot, g, t, F)),
          !n)
        ) {
          Pe(-1, 'No Transport')
        } else {
          if (
            ((F.readyState = 1),
            d && H.trigger('ajaxSend', [F, g]),
            f)
          ) {
            return F
          }
          g.async &&
                        g.timeout > 0 &&
                        (a = h.setTimeout(function () {
                          F.abort('timeout')
                        }, g.timeout))
          try {
            (f = !1), n.send(K, Pe)
          } catch ($) {
            if (f) throw $
            Pe(-1, $)
          }
        }
        function Pe ($, J, rt, Xt) {
          let me
          let ot
          let be
          let De
          let ke
          let fe = J
          f ||
                        ((f = !0),
                        a && h.clearTimeout(a),
                        (n = void 0),
                        (o = Xt || ''),
                        (F.readyState = $ > 0 ? 4 : 0),
                        (me = ($ >= 200 && $ < 300) || $ === 304),
                        rt && (De = Mi(g, F, rt)),
                        !me &&
                            r.inArray('script', g.dataTypes) > -1 &&
                            r.inArray('json', g.dataTypes) < 0 &&
                            (g.converters['text script'] = function () {}),
                        (De = Ri(g, De, F, me)),
                        me
                          ? (g.ifModified &&
                                  ((ke = F.getResponseHeader('Last-Modified')),
                                  ke && (r.lastModified[i] = ke),
                                  (ke = F.getResponseHeader('etag')),
                                  ke && (r.etag[i] = ke)),
                            $ === 204 || g.type === 'HEAD'
                              ? (fe = 'nocontent')
                              : $ === 304
                                ? (fe = 'notmodified')
                                : ((fe = De.state),
                                  (ot = De.data),
                                  (be = De.error),
                                  (me = !be)))
                          : ((be = fe),
                            ($ || !fe) && ((fe = 'error'), $ < 0 && ($ = 0))),
                        (F.status = $),
                        (F.statusText = (J || fe) + ''),
                        me
                          ? B.resolveWith(x, [ot, fe, F])
                          : B.rejectWith(x, [F, fe, be]),
                        F.statusCode(Z),
                        (Z = void 0),
                        d &&
                            H.trigger(me ? 'ajaxSuccess' : 'ajaxError', [
                              F,
                              g,
                              me ? ot : be
                            ]),
                        R.fireWith(x, [F, fe]),
                        d &&
                            (H.trigger('ajaxComplete', [F, g]),
                            --r.active || r.event.trigger('ajaxStop')))
        }
        return F
      },
      getJSON: function (e, t, n) {
        return r.get(e, t, n, 'json')
      },
      getScript: function (e, t) {
        return r.get(e, void 0, t, 'script')
      }
    }),
    r.each(['get', 'post'], function (e, t) {
      r[t] = function (n, i, o, s) {
        return (
          M(i) && ((s = s || o), (o = i), (i = void 0)),
          r.ajax(
            r.extend(
              {
                url: n,
                type: t,
                dataType: s,
                data: i,
                success: o
              },
              r.isPlainObject(n) && n
            )
          )
        )
      }
    }),
    r.ajaxPrefilter(function (e) {
      let t
      for (t in e.headers) {
        t.toLowerCase() === 'content-type' &&
                        (e.contentType = e.headers[t] || '')
      }
    }),
    (r._evalUrl = function (e, t, n) {
      return r.ajax({
        url: e,
        type: 'GET',
        dataType: 'script',
        cache: !0,
        async: !1,
        global: !1,
        converters: { 'text script': function () {} },
        dataFilter: function (i) {
          r.globalEval(i, t, n)
        }
      })
    }),
    r.fn.extend({
      wrapAll: function (e) {
        let t
        return (
          this[0] &&
                            (M(e) && (e = e.call(this[0])),
                            (t = r(e, this[0].ownerDocument).eq(0).clone(!0)),
                            this[0].parentNode && t.insertBefore(this[0]),
                            t
                              .map(function () {
                                for (var n = this; n.firstElementChild;) {
                                  n = n.firstElementChild
                                }
                                return n
                              })
                              .append(this)),
          this
        )
      },
      wrapInner: function (e) {
        return M(e)
          ? this.each(function (t) {
            r(this).wrapInner(e.call(this, t))
          })
          : this.each(function () {
            const t = r(this)
            const n = t.contents()
            n.length ? n.wrapAll(e) : t.append(e)
          })
      },
      wrap: function (e) {
        const t = M(e)
        return this.each(function (n) {
          r(this).wrapAll(t ? e.call(this, n) : e)
        })
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not('body')
            .each(function () {
              r(this).replaceWith(this.childNodes)
            }),
          this
        )
      }
    }),
    (r.expr.pseudos.hidden = function (e) {
      return !r.expr.pseudos.visible(e)
    }),
    (r.expr.pseudos.visible = function (e) {
      return !!(
        e.offsetWidth ||
                    e.offsetHeight ||
                    e.getClientRects().length
      )
    }),
    (r.ajaxSettings.xhr = function () {
      try {
        return new h.XMLHttpRequest()
      } catch {}
    })
    const Ii = { 0: 200, 1223: 204 }
    let it = r.ajaxSettings.xhr();
    (O.cors = !!it && 'withCredentials' in it),
    (O.ajax = it = !!it),
    r.ajaxTransport(function (e) {
      let t, n
      if (O.cors || (it && !e.crossDomain)) {
        return {
          send: function (i, o) {
            let s
            const a = e.xhr()
            if (
              (a.open(
                e.type,
                e.url,
                e.async,
                e.username,
                e.password
              ),
              e.xhrFields)
            ) {
              for (s in e.xhrFields) a[s] = e.xhrFields[s]
            }
            e.mimeType &&
                                a.overrideMimeType &&
                                a.overrideMimeType(e.mimeType),
            !e.crossDomain &&
                                    !i['X-Requested-With'] &&
                                    (i['X-Requested-With'] = 'XMLHttpRequest')
            for (s in i) a.setRequestHeader(s, i[s]);
            (t = function (l) {
              return function () {
                t &&
                                        ((t =
                                            n =
                                            a.onload =
                                            a.onerror =
                                            a.onabort =
                                            a.ontimeout =
                                            a.onreadystatechange =
                                                null),
                                        l === 'abort'
                                          ? a.abort()
                                          : l === 'error'
                                            ? typeof a.status !== 'number'
                                              ? o(0, 'error')
                                              : o(a.status, a.statusText)
                                            : o(
                                              Ii[a.status] || a.status,
                                              a.statusText,
                                              (a.responseType ||
                                                        'text') !== 'text' ||
                                                        typeof a.responseText !==
                                                            'string'
                                                ? { binary: a.response }
                                                : {
                                                    text: a.responseText
                                                  },
                                              a.getAllResponseHeaders()
                                            ))
              }
            }),
            (a.onload = t()),
            (n = a.onerror = a.ontimeout = t('error')),
            a.onabort !== void 0
              ? (a.onabort = n)
              : (a.onreadystatechange = function () {
                  a.readyState === 4 &&
                                              h.setTimeout(function () {
                                                t && n()
                                              })
                }),
            (t = t('abort'))
            try {
              a.send((e.hasContent && e.data) || null)
            } catch (l) {
              if (t) throw l
            }
          },
          abort: function () {
            t && t()
          }
        }
      }
    }),
    r.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1)
    }),
    r.ajaxSetup({
      accepts: {
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        'text script': function (e) {
          return r.globalEval(e), e
        }
      }
    }),
    r.ajaxPrefilter('script', function (e) {
      e.cache === void 0 && (e.cache = !1),
      e.crossDomain && (e.type = 'GET')
    }),
    r.ajaxTransport('script', function (e) {
      if (e.crossDomain || e.scriptAttrs) {
        let t, n
        return {
          send: function (i, o) {
            (t = r('<script>')
              .attr(e.scriptAttrs || {})
              .prop({ charset: e.scriptCharset, src: e.url })
              .on(
                'load error',
                (n = function (s) {
                  t.remove(),
                  (n = null),
                  s &&
                                                o(
                                                  s.type === 'error'
                                                    ? 404
                                                    : 200,
                                                  s.type
                                                )
                })
              )),
            P.head.appendChild(t[0])
          },
          abort: function () {
            n && n()
          }
        }
      }
    })
    const Ln = []
    const It = /(=)\?(?=&|$)|\?\?/
    r.ajaxSetup({
      jsonp: 'callback',
      jsonpCallback: function () {
        const e = Ln.pop() || r.expando + '_' + wn.guid++
        return (this[e] = !0), e
      }
    }),
    r.ajaxPrefilter('json jsonp', function (e, t, n) {
      let i
      let o
      let s
      const a =
                    e.jsonp !== !1 &&
                    (It.test(e.url)
                      ? 'url'
                      : typeof e.data === 'string' &&
                          (e.contentType || '').indexOf(
                            'application/x-www-form-urlencoded'
                          ) === 0 &&
                          It.test(e.data) &&
                          'data')
      if (a || e.dataTypes[0] === 'jsonp') {
        return (
          (i = e.jsonpCallback =
                            M(e.jsonpCallback)
                              ? e.jsonpCallback()
                              : e.jsonpCallback),
          a
            ? (e[a] = e[a].replace(It, '$1' + i))
            : e.jsonp !== !1 &&
                              (e.url +=
                                  (qt.test(e.url) ? '&' : '?') +
                                  e.jsonp +
                                  '=' +
                                  i),
          (e.converters['script json'] = function () {
            return s || r.error(i + ' was not called'), s[0]
          }),
          (e.dataTypes[0] = 'json'),
          (o = h[i]),
          (h[i] = function () {
            s = arguments
          }),
          n.always(function () {
            o === void 0 ? r(h).removeProp(i) : (h[i] = o),
            e[i] &&
                                    ((e.jsonpCallback = t.jsonpCallback),
                                    Ln.push(i)),
            s && M(o) && o(s[0]),
            (s = o = void 0)
          }),
          'script'
        )
      }
    }),
    (O.createHTMLDocument = (function () {
      const e = P.implementation.createHTMLDocument('').body
      return (
        (e.innerHTML = '<form></form><form></form>'),
        e.childNodes.length === 2
      )
    })()),
    (r.parseHTML = function (e, t, n) {
      if (typeof e !== 'string') return []
      typeof t === 'boolean' && ((n = t), (t = !1))
      let i, o, s
      return (
        t ||
                        (O.createHTMLDocument
                          ? ((t = P.implementation.createHTMLDocument('')),
                            (i = t.createElement('base')),
                            (i.href = P.location.href),
                            t.head.appendChild(i))
                          : (t = P)),
        (o = Qt.exec(e)),
        (s = !n && []),
        o
          ? [t.createElement(o[1])]
          : ((o = an([e], t, s)),
            s && s.length && r(s).remove(),
            r.merge([], o.childNodes))
      )
    }),
    (r.fn.load = function (e, t, n) {
      let i
      let o
      let s
      const a = this
      const l = e.indexOf(' ')
      return (
        l > -1 && ((i = He(e.slice(l))), (e = e.slice(0, l))),
        M(t)
          ? ((n = t), (t = void 0))
          : t && typeof t === 'object' && (o = 'POST'),
        a.length > 0 &&
                        r
                          .ajax({
                            url: e,
                            type: o || 'GET',
                            dataType: 'html',
                            data: t
                          })
                          .done(function (f) {
                            (s = arguments),
                            a.html(
                              i
                                ? r('<div>')
                                  .append(r.parseHTML(f))
                                  .find(i)
                                : f
                            )
                          })
                          .always(
                            n &&
                                    function (f, d) {
                                      a.each(function () {
                                        n.apply(
                                          this,
                                          s || [f.responseText, d, f]
                                        )
                                      })
                                    }
                          ),
        this
      )
    }),
    (r.expr.pseudos.animated = function (e) {
      return r.grep(r.timers, function (t) {
        return e === t.elem
      }).length
    }),
    (r.offset = {
      setOffset: function (e, t, n) {
        let i
        let o
        let s
        let a
        let l
        let f
        let d
        const v = r.css(e, 'position')
        const b = r(e)
        const g = {}
        v === 'static' && (e.style.position = 'relative'),
        (l = b.offset()),
        (s = r.css(e, 'top')),
        (f = r.css(e, 'left')),
        (d =
                            (v === 'absolute' || v === 'fixed') &&
                            (s + f).indexOf('auto') > -1),
        d
          ? ((i = b.position()), (a = i.top), (o = i.left))
          : ((a = parseFloat(s) || 0),
            (o = parseFloat(f) || 0)),
        M(t) && (t = t.call(e, n, r.extend({}, l))),
        t.top != null && (g.top = t.top - l.top + a),
        t.left != null && (g.left = t.left - l.left + o),
        'using' in t ? t.using.call(e, g) : b.css(g)
      }
    }),
    r.fn.extend({
      offset: function (e) {
        if (arguments.length) {
          return e === void 0
            ? this
            : this.each(function (o) {
              r.offset.setOffset(this, e, o)
            })
        }
        let t
        let n
        const i = this[0]
        if (i) {
          return i.getClientRects().length
            ? ((t = i.getBoundingClientRect()),
              (n = i.ownerDocument.defaultView),
              {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
              })
            : { top: 0, left: 0 }
        }
      },
      position: function () {
        if (this[0]) {
          let e
          let t
          let n
          const i = this[0]
          let o = { top: 0, left: 0 }
          if (r.css(i, 'position') === 'fixed') {
            t = i.getBoundingClientRect()
          } else {
            for (
              t = this.offset(),
              n = i.ownerDocument,
              e = i.offsetParent || n.documentElement;
              e &&
                                (e === n.body || e === n.documentElement) &&
                                r.css(e, 'position') === 'static';

            ) {
              e = e.parentNode
            }
            e &&
                                e !== i &&
                                e.nodeType === 1 &&
                                ((o = r(e).offset()),
                                (o.top += r.css(e, 'borderTopWidth', !0)),
                                (o.left += r.css(e, 'borderLeftWidth', !0)))
          }
          return {
            top: t.top - o.top - r.css(i, 'marginTop', !0),
            left: t.left - o.left - r.css(i, 'marginLeft', !0)
          }
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent;
            e && r.css(e, 'position') === 'static';

          ) {
            e = e.offsetParent
          }
          return e || Le
        })
      }
    }),
    r.each(
      { scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
      function (e, t) {
        const n = t === 'pageYOffset'
        r.fn[e] = function (i) {
          return we(
            this,
            function (o, s, a) {
              let l
              if (
                (Re(o)
                  ? (l = o)
                  : o.nodeType === 9 &&
                                          (l = o.defaultView),
                a === void 0)
              ) {
                return l ? l[t] : o[s]
              }
              l
                ? l.scrollTo(
                  n ? l.pageXOffset : a,
                  n ? a : l.pageYOffset
                )
                : (o[s] = a)
            },
            e,
            i,
            arguments.length
          )
        }
      }
    ),
    r.each(['top', 'left'], function (e, t) {
      r.cssHooks[t] = pn(O.pixelPosition, function (n, i) {
        if (i) {
          return (
            (i = et(n, t)),
            At.test(i) ? r(n).position()[t] + 'px' : i
          )
        }
      })
    }),
    r.each({ Height: 'height', Width: 'width' }, function (e, t) {
      r.each(
        { padding: 'inner' + e, content: t, '': 'outer' + e },
        function (n, i) {
          r.fn[i] = function (o, s) {
            const a =
                                arguments.length &&
                                (n || typeof o !== 'boolean')
            const l =
                                n ||
                                (o === !0 || s === !0 ? 'margin' : 'border')
            return we(
              this,
              function (f, d, v) {
                let b
                return Re(f)
                  ? i.indexOf('outer') === 0
                    ? f['inner' + e]
                    : f.document.documentElement[
                      'client' + e
                    ]
                  : f.nodeType === 9
                    ? ((b = f.documentElement),
                      Math.max(
                        f.body['scroll' + e],
                        b['scroll' + e],
                        f.body['offset' + e],
                        b['offset' + e],
                        b['client' + e]
                      ))
                    : v === void 0
                      ? r.css(f, d, l)
                      : r.style(f, d, v, l)
              },
              t,
              a ? o : void 0,
              a
            )
          }
        }
      )
    }),
    r.each(
      [
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend'
      ],
      function (e, t) {
        r.fn[t] = function (n) {
          return this.on(t, n)
        }
      }
    ),
    r.fn.extend({
      bind: function (e, t, n) {
        return this.on(e, null, t, n)
      },
      unbind: function (e, t) {
        return this.off(e, null, t)
      },
      delegate: function (e, t, n, i) {
        return this.on(t, e, n, i)
      },
      undelegate: function (e, t, n) {
        return arguments.length === 1
          ? this.off(e, '**')
          : this.off(t, e || '**', n)
      },
      hover: function (e, t) {
        return this.on('mouseenter', e).on('mouseleave', t || e)
      }
    }),
    r.each(
      'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
        ' '
      ),
      function (e, t) {
        r.fn[t] = function (n, i) {
          return arguments.length > 0
            ? this.on(t, null, n, i)
            : this.trigger(t)
        }
      }
    )
    const Xi = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    (r.proxy = function (e, t) {
      let n, i, o
      if (
        (typeof t === 'string' && ((n = e[t]), (t = e), (e = n)),
        !!M(e))
      ) {
        return (
          (i = k.call(arguments, 2)),
          (o = function () {
            return e.apply(t || this, i.concat(k.call(arguments)))
          }),
          (o.guid = e.guid = e.guid || r.guid++),
          o
        )
      }
    }),
    (r.holdReady = function (e) {
      e ? r.readyWait++ : r.ready(!0)
    }),
    (r.isArray = Array.isArray),
    (r.parseJSON = JSON.parse),
    (r.nodeName = Q),
    (r.isFunction = M),
    (r.isWindow = Re),
    (r.camelCase = ge),
    (r.type = Ie),
    (r.now = Date.now),
    (r.isNumeric = function (e) {
      const t = r.type(e)
      return (
        (t === 'number' || t === 'string') &&
                    !isNaN(e - parseFloat(e))
      )
    }),
    (r.trim = function (e) {
      return e == null ? '' : (e + '').replace(Xi, '$1')
    }),
    typeof define === 'function' &&
                define.amd &&
                define('jquery', [], function () {
                  return r
                })
    const _i = h.jQuery
    const Wi = h.$
    return (
      (r.noConflict = function (e) {
        return (
          h.$ === r && (h.$ = Wi),
          e && h.jQuery === r && (h.jQuery = _i),
          r
        )
      }),
      typeof N > 'u' && (h.jQuery = h.$ = r),
      r
    )
  })
})
const ur = Mn(at(), 1)
const sr = Mn(at(), 1)
const G = at()
const nr = 'ontouchstart' in document
const In = document.dir == 'rtl'
const Xn = (function () {
  const h = document.createElement('div')
  const N = document.documentElement
  if (!('pointerEvents' in h.style)) return !1;
  (h.style.pointerEvents = 'auto'),
  (h.style.pointerEvents = 'x'),
  N.appendChild(h)
  const D =
        window.getComputedStyle &&
        window.getComputedStyle(h, '').pointerEvents === 'auto'
  return N.removeChild(h), !!D
})()
const ir = {
  listNodeName: 'ol',
  itemNodeName: 'li',
  rootClass: 'dd',
  listClass: 'dd-list',
  itemClass: 'dd-item',
  dragClass: 'dd-dragel',
  handleClass: 'dd-handle',
  collapsedClass: 'dd-collapsed',
  placeClass: 'dd-placeholder',
  noDragClass: 'dd-nodrag',
  emptyClass: 'dd-empty',
  expandBtnHTML: '<button data-action="expand" type="button">Expand</button>',
  collapseBtnHTML:
        '<button data-action="collapse" type="button">Collapse</button>',
  group: 0,
  maxDepth: 5,
  threshold: 20
}
function _n (h, N) {
  (this.w = G(document)),
  (this.el = G(h)),
  (this.options = G.extend({}, ir, N)),
  this.init()
}
_n.prototype = {
  init: function () {
    const h = this
    h.reset(),
    h.el.data('nestable-group', this.options.group),
    (h.placeEl = G('<div class="' + h.options.placeClass + '"/>')),
    G.each(this.el.find(h.options.itemNodeName), function (k, W) {
      h.setParent(G(W))
    }),
    h.el.on('click', 'button', function (k) {
      if (!h.dragEl) {
        const W = G(k.currentTarget)
        const I = W.data('action')
        const E = W.parent(h.options.itemNodeName)
        I === 'collapse' && h.collapseItem(E),
        I === 'expand' && h.expandItem(E)
      }
    })
    const N = function (k) {
      let W = G(k.target)
      if (!W.hasClass(h.options.handleClass)) {
        if (W.closest('.' + h.options.noDragClass).length) return
        W = W.closest('.' + h.options.handleClass)
      }
      !W.length ||
                h.dragEl ||
                ((h.isTouch = /^touch/.test(k.type)),
                !(h.isTouch && k.touches.length !== 1) &&
                    (k.preventDefault(),
                    h.dragStart(k.touches ? k.touches[0] : k)))
    }
    const D = function (k) {
      h.dragEl &&
                (k.preventDefault(), h.dragMove(k.touches ? k.touches[0] : k))
    }
    const Y = function (k) {
      h.dragEl &&
                (k.preventDefault(), h.dragStop(k.touches ? k.touches[0] : k))
    }
    nr &&
            (h.el[0].addEventListener('touchstart', N, !1),
            window.addEventListener('touchmove', D, !1),
            window.addEventListener('touchend', Y, !1),
            window.addEventListener('touchcancel', Y, !1)),
    h.el.on('mousedown', N),
    h.w.on('mousemove', D),
    h.w.on('mouseup', Y)
  },
  serialize: function () {
    let h
    const N = 0
    const D = this
    const Y = function (k, W) {
      const I = []
      const E = k.children(D.options.itemNodeName)
      return (
        E.each(function () {
          const ce = G(this)
          const Ce = G.extend({}, ce.data())
          const ae = ce.children(D.options.listNodeName)
          ae.length && (Ce.children = Y(ae, W + 1)), I.push(Ce)
        }),
        I
      )
    }
    return (h = Y(D.el.find(D.options.listNodeName).first(), N)), h
  },
  serialise: function () {
    return this.serialize()
  },
  reset: function () {
    (this.mouse = {
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      nowX: 0,
      nowY: 0,
      distX: 0,
      distY: 0,
      dirAx: 0,
      dirX: 0,
      dirY: 0,
      lastDirX: 0,
      lastDirY: 0,
      distAxX: 0,
      distAxY: 0
    }),
    (this.isTouch = !1),
    (this.moving = !1),
    (this.dragEl = null),
    (this.dragRootEl = null),
    (this.dragDepth = 0),
    (this.hasNewRoot = !1),
    (this.pointEl = null)
  },
  expandItem: function (h) {
    h.removeClass(this.options.collapsedClass),
    h.children('[data-action="expand"]').hide(),
    h.children('[data-action="collapse"]').show(),
    h.children(this.options.listNodeName).show()
  },
  collapseItem: function (h) {
    const N = h.children(this.options.listNodeName)
    N.length &&
            (h.addClass(this.options.collapsedClass),
            h.children('[data-action="collapse"]').hide(),
            h.children('[data-action="expand"]').show(),
            h.children(this.options.listNodeName).hide())
  },
  expandAll: function () {
    const h = this
    h.el.find(h.options.itemNodeName).each(function () {
      h.expandItem(G(this))
    })
  },
  collapseAll: function () {
    const h = this
    h.el.find(h.options.itemNodeName).each(function () {
      h.collapseItem(G(this))
    })
  },
  setParent: function (h) {
    h.children(this.options.listNodeName).length &&
            (h.prepend(G(this.options.expandBtnHTML)),
            h.prepend(G(this.options.collapseBtnHTML))),
    h.children('[data-action="expand"]').hide()
  },
  unsetParent: function (h) {
    h.removeClass(this.options.collapsedClass),
    h.children('[data-action]').remove(),
    h.children(this.options.listNodeName).remove()
  },
  dragStart: function (h) {
    const N = this.mouse
    const D = G(h.target)
    const Y = D.closest(this.options.itemNodeName)
    this.placeEl.css('height', Y.height()),
    (N.offsetX =
                h.offsetX !== void 0 ? h.offsetX : h.pageX - D.offset().left),
    (N.offsetY =
                h.offsetY !== void 0 ? h.offsetY : h.pageY - D.offset().top),
    (N.startX = N.lastX = h.pageX),
    (N.startY = N.lastY = h.pageY),
    (this.dragRootEl = this.el),
    (this.dragEl = G(
      document.createElement(this.options.listNodeName)
    ).addClass(this.options.listClass + ' ' + this.options.dragClass)),
    this.dragEl.css('width', Y.width()),
    Y.after(this.placeEl),
    Y[0].parentNode.removeChild(Y[0]),
    Y.appendTo(this.dragEl),
    G(document.body).append(this.dragEl),
    In
      ? this.dragEl.css({
        right: G(document).width() - h.pageX - N.offsetX,
        top: h.pageY - N.offsetY
      })
      : this.dragEl.css({
        left: h.pageX - N.offsetX,
        top: h.pageY - N.offsetY
      })
    let k
    let W
    const I = this.dragEl.find(this.options.itemNodeName)
    for (k = 0; k < I.length; k++) {
      (W = G(I[k]).parents(this.options.listNodeName).length),
      W > this.dragDepth && (this.dragDepth = W)
    }
  },
  dragStop: function (h) {
    const N = this.dragEl.children(this.options.itemNodeName).first()
    N[0].parentNode.removeChild(N[0]),
    this.placeEl.replaceWith(N),
    this.dragEl.remove(),
    this.el.trigger('change'),
    this.hasNewRoot && this.dragRootEl.trigger('change'),
    this.reset()
  },
  dragMove: function (h) {
    let N
    let D
    let Y
    let k
    let W
    const I = this.options
    const E = this.mouse
    In
      ? this.dragEl.css({
        right: G(window).width() - h.pageX - E.offsetX,
        top: h.pageY - E.offsetY
      })
      : this.dragEl.css({
        left: h.pageX - E.offsetX,
        top: h.pageY - E.offsetY
      }),
    (E.lastX = E.nowX),
    (E.lastY = E.nowY),
    (E.nowX = h.pageX),
    (E.nowY = h.pageY),
    (E.distX = E.nowX - E.lastX),
    (E.distY = E.nowY - E.lastY),
    (E.lastDirX = E.dirX),
    (E.lastDirY = E.dirY),
    (E.dirX = E.distX === 0 ? 0 : E.distX > 0 ? 1 : -1),
    (E.dirY = E.distY === 0 ? 0 : E.distY > 0 ? 1 : -1)
    const ce = Math.abs(E.distX) > Math.abs(E.distY) ? 1 : 0
    if (!E.moving) {
      (E.dirAx = ce), (E.moving = !0)
      return
    }
    E.dirAx !== ce
      ? ((E.distAxX = 0), (E.distAxY = 0))
      : ((E.distAxX += Math.abs(E.distX)),
        E.dirX !== 0 && E.dirX !== E.lastDirX && (E.distAxX = 0),
        (E.distAxY += Math.abs(E.distY)),
        E.dirY !== 0 && E.dirY !== E.lastDirY && (E.distAxY = 0)),
    (E.dirAx = ce),
    E.dirAx &&
                E.distAxX >= I.threshold &&
                ((E.distAxX = 0),
                (Y = this.placeEl.prev(I.itemNodeName)),
                E.distX > 0 &&
                    Y.length &&
                    !Y.hasClass(I.collapsedClass) &&
                    ((N = Y.find(I.listNodeName).last()),
                    (W = this.placeEl.parents(I.listNodeName).length),
                    W + this.dragDepth <= I.maxDepth &&
                        (N.length
                          ? ((N = Y.children(I.listNodeName).last()),
                            N.append(this.placeEl))
                          : ((N = G('<' + I.listNodeName + '/>').addClass(
                              I.listClass
                            )),
                            N.append(this.placeEl),
                            Y.append(N),
                            this.setParent(Y)))),
                E.distX < 0 &&
                    ((k = this.placeEl.next(I.itemNodeName)),
                    k.length ||
                        ((D = this.placeEl.parent()),
                        this.placeEl
                          .closest(I.itemNodeName)
                          .after(this.placeEl),
                        D.children().length || this.unsetParent(D.parent()))))
    let Ce = !1
    if (
      (Xn || (this.dragEl[0].style.visibility = 'hidden'),
      (this.pointEl = G(
        document.elementFromPoint(
          h.pageX - document.body.scrollLeft,
          h.pageY -
                        (window.pageYOffset ||
                            document.documentElement.scrollTop)
        )
      )),
      Xn || (this.dragEl[0].style.visibility = 'visible'),
      this.pointEl.hasClass(I.handleClass) &&
                (this.pointEl = this.pointEl.parent(I.itemNodeName)),
      this.pointEl.hasClass(I.emptyClass))
    ) {
      Ce = !0
    } else if (
      !this.pointEl.length ||
            !this.pointEl.hasClass(I.itemClass)
    ) {
      return
    }
    const ae = this.pointEl.closest('.' + I.rootClass)
    const Me =
            this.dragRootEl.data('nestable-id') !== ae.data('nestable-id')
    if (!E.dirAx || Me || Ce) {
      if (
        (Me && I.group !== ae.data('nestable-group')) ||
                ((W =
                    this.dragDepth -
                    1 +
                    this.pointEl.parents(I.listNodeName).length),
                W > I.maxDepth)
      ) {
        return
      }
      const xt =
                h.pageY < this.pointEl.offset().top + this.pointEl.height() / 2;
      (D = this.placeEl.parent()),
      Ce
        ? ((N = G(document.createElement(I.listNodeName)).addClass(
            I.listClass
          )),
          N.append(this.placeEl),
          this.pointEl.replaceWith(N))
        : xt
          ? this.pointEl.before(this.placeEl)
          : this.pointEl.after(this.placeEl),
      D.children().length || this.unsetParent(D.parent()),
      this.dragRootEl.find(I.itemNodeName).length ||
                    this.dragRootEl.append(
                      '<div class="' + I.emptyClass + '"/>'
                    ),
      Me &&
                    ((this.dragRootEl = ae),
                    (this.hasNewRoot = this.el[0] !== this.dragRootEl[0]))
    }
  }
}
const Ae = class {
  constructor () {}
  static buildNestable (N, D) {
    const Y = N
    let k = N
    return (
      Y.each(function () {
        const W = G(N).data('nestable')
        W
          ? typeof D === 'string' &&
                      typeof W[D] === 'function' &&
                      (k = W[D]())
          : (G(N).data('nestable', new _n(N, D)),
            G(N).data('nestable-id', new Date().getTime()))
      }),
      k || Y
    )
  }
}
const ne = at()
function rr ({ containerKey: h, maxDepth: N }) {
  return {
    containerKey: h,
    maxDepth: N,
    nestedTreeElement: null,
    nestedTree: null,
    init: function () {
      const D = ne(this.containerKey)
      this.nestedTreeElement = D
      const Y = this.compile(this.nestedTreeElement, {
        group: h,
        maxDepth: N,
        expandBtnHTML: '',
        collapseBtnHTML: ''
      });
      (this.nestedTree = Y),
      this.nestedTreeElement.on(
        'click',
        '.dd-item-btns [data-action=expand]',
        function (k) {
          const W = ne(this).closest('li')
          W.length &&
                            (ne(this).addClass('hidden'),
                            ne(this)
                              .parent()
                              .children(
                                '.dd-item-btns [data-action=collapse]'
                              )
                              .removeClass('hidden'),
                            W.find('> .dd-list').removeClass('hidden').show(),
                            W.find('> .dd-list > .dd-item').removeClass(
                              'dd-collapsed hidden'
                            ))
        }
      ),
      this.nestedTreeElement.on(
        'click',
        '.dd-item-btns [data-action=collapse]',
        function (k) {
          const W = ne(this).closest('li')
          W.length &&
                            (ne(this).addClass('hidden'),
                            ne(this)
                              .parent()
                              .children('.dd-item-btns [data-action=expand]')
                              .removeClass('hidden'),
                            W.find('> .dd-list').addClass('hidden').hide(),
                            W.find('> .dd-list > .dd-item').addClass(
                              'dd-collapsed hidden'
                            ))
        }
      )
    },
    compile: function (D, Y) {
      return Ae.buildNestable(D, Y)
    },
    save: async function () {
      const D = Ae.buildNestable(this.nestedTree, 'serialize');
      (await this.$wire.updateTree(D)).reload === !0 &&
                Ae.buildNestable(this.nestedTree, 'reset')
    },
    collapseAll: function () {
      Ae.buildNestable(ne('.dd'), 'collapseAll'),
      ne('.dd')
        .find('.dd-item-btns [data-action=expand]')
        .removeClass('hidden'),
      ne('.dd')
        .find('.dd-item-btns [data-action=collapse]')
        .addClass('hidden'),
      ne('.dd > ol > li').find('li').addClass('hidden')
    },
    expandAll: function () {
      Ae.buildNestable(ne('.dd'), 'expandAll'),
      ne('.dd')
        .find('.dd-item-btns [data-action=expand]')
        .addClass('hidden'),
      ne('.dd')
        .find('.dd-item-btns [data-action=collapse]')
        .removeClass('hidden'),
      ne('.dd > ol > li').find('li').removeClass('hidden')
    }
  }
}
export { rr as default }
/*!
 * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 * Dual-licensed under the BSD or MIT licenses
 *
 *
 * For custom version of this plugin, is hidden the 'nestable' jQuery method and the logic to handle the plugin is moved to the 'components/filament-tree-component' js file.
 */
/*! Bundled license information:

jquery/dist/jquery.js:
  (*!
   * jQuery JavaScript Library v3.7.1
   * https://jquery.com/
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2023-08-28T13:37Z
   *)
*/
