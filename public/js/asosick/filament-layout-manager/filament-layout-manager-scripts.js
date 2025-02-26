function se (o, t) {
  const e = Object.keys(o)
  if (Object.getOwnPropertySymbols) {
    let n = Object.getOwnPropertySymbols(o)
    t &&
            (n = n.filter(function (i) {
              return Object.getOwnPropertyDescriptor(o, i).enumerable
            })),
    e.push.apply(e, n)
  }
  return e
}
function W (o) {
  for (let t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? se(Object(e), !0).forEach(function (n) {
        ke(o, n, e[n])
      })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(e))
        : se(Object(e)).forEach(function (n) {
          Object.defineProperty(
            o,
            n,
            Object.getOwnPropertyDescriptor(e, n)
          )
        })
  }
  return o
}
function Pt (o) {
  '@babel/helpers - typeof'
  return (
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? (Pt = function (t) {
          return typeof t
        })
      : (Pt = function (t) {
          return t &&
                      typeof Symbol === 'function' &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
            ? 'symbol'
            : typeof t
        }),
    Pt(o)
  )
}
function ke (o, t, e) {
  return (
    t in o
      ? Object.defineProperty(o, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      })
      : (o[t] = e),
    o
  )
}
function $ () {
  return (
    ($ =
            Object.assign ||
            function (o) {
              for (let t = 1; t < arguments.length; t++) {
                const e = arguments[t]
                for (const n in e) {
                  Object.prototype.hasOwnProperty.call(e, n) &&
                            (o[n] = e[n])
                }
              }
              return o
            }),
    $.apply(this, arguments)
  )
}
function Be (o, t) {
  if (o == null) return {}
  const e = {}
  const n = Object.keys(o)
  let i
  let r
  for (r = 0; r < n.length; r++) {
    (i = n[r]), !(t.indexOf(i) >= 0) && (e[i] = o[i])
  }
  return e
}
function Xe (o, t) {
  if (o == null) return {}
  const e = Be(o, t)
  let n
  let i
  if (Object.getOwnPropertySymbols) {
    const r = Object.getOwnPropertySymbols(o)
    for (i = 0; i < r.length; i++) {
      (n = r[i]),
      !(t.indexOf(n) >= 0) &&
                    Object.prototype.propertyIsEnumerable.call(o, n) &&
                    (e[n] = o[n])
    }
  }
  return e
}
const Ye = '1.15.6'
function U (o) {
  if (typeof window < 'u' && window.navigator) {
    return !!navigator.userAgent.match(o)
  }
}
const q = U(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i)
const Ot = U(/Edge/i)
const ue = U(/firefox/i)
const Et = U(/safari/i) && !U(/chrome/i) && !U(/android/i)
const oe = U(/iP(ad|od|hone)/i)
const ve = U(/chrome/i) && U(/android/i)
const be = { capture: !1, passive: !1 }
function v (o, t, e) {
  o.addEventListener(t, e, !q && be)
}
function m (o, t, e) {
  o.removeEventListener(t, e, !q && be)
}
function Xt (o, t) {
  if (t) {
    if ((t[0] === '>' && (t = t.substring(1)), o)) {
      try {
        if (o.matches) return o.matches(t)
        if (o.msMatchesSelector) return o.msMatchesSelector(t)
        if (o.webkitMatchesSelector) return o.webkitMatchesSelector(t)
      } catch {
        return !1
      }
    }
    return !1
  }
}
function ye (o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode
}
function G (o, t, e, n) {
  if (o) {
    e = e || document
    do {
      if (
        (t != null &&
                    (t[0] === '>'
                      ? o.parentNode === e && Xt(o, t)
                      : Xt(o, t))) ||
                (n && o === e)
      ) {
        return o
      }
      if (o === e) break
    } while ((o = ye(o)))
  }
  return null
}
const fe = /\s+/g
function R (o, t, e) {
  if (o && t) {
    if (o.classList) o.classList[e ? 'add' : 'remove'](t)
    else {
      const n = (' ' + o.className + ' ')
        .replace(fe, ' ')
        .replace(' ' + t + ' ', ' ')
      o.className = (n + (e ? ' ' + t : '')).replace(fe, ' ')
    }
  }
}
function h (o, t, e) {
  const n = o && o.style
  if (n) {
    if (e === void 0) {
      return (
        document.defaultView && document.defaultView.getComputedStyle
          ? (e = document.defaultView.getComputedStyle(o, ''))
          : o.currentStyle && (e = o.currentStyle),
        t === void 0 ? e : e[t]
      )
    }
    !(t in n) && t.indexOf('webkit') === -1 && (t = '-webkit-' + t),
    (n[t] = e + (typeof e === 'string' ? '' : 'px'))
  }
}
function ct (o, t) {
  let e = ''
  if (typeof o === 'string') e = o
  else {
    do {
      const n = h(o, 'transform')
      n && n !== 'none' && (e = n + ' ' + e)
    } while (!t && (o = o.parentNode))
  }
  const i =
        window.DOMMatrix ||
        window.WebKitCSSMatrix ||
        window.CSSMatrix ||
        window.MSCSSMatrix
  return i && new i(e)
}
function we (o, t, e) {
  if (o) {
    const n = o.getElementsByTagName(t)
    let i = 0
    const r = n.length
    if (e) for (; i < r; i++) e(n[i], i)
    return n
  }
  return []
}
function K () {
  const o = document.scrollingElement
  return o || document.documentElement
}
function O (o, t, e, n, i) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    let r, a, l, s, u, d, c
    if (
      (o !== window && o.parentNode && o !== K()
        ? ((r = o.getBoundingClientRect()),
          (a = r.top),
          (l = r.left),
          (s = r.bottom),
          (u = r.right),
          (d = r.height),
          (c = r.width))
        : ((a = 0),
          (l = 0),
          (s = window.innerHeight),
          (u = window.innerWidth),
          (d = window.innerHeight),
          (c = window.innerWidth)),
      (t || e) && o !== window && ((i = i || o.parentNode), !q))
    ) {
      do {
        if (
          i &&
                    i.getBoundingClientRect &&
                    (h(i, 'transform') !== 'none' ||
                        (e && h(i, 'position') !== 'static'))
        ) {
          const b = i.getBoundingClientRect();
          (a -= b.top + parseInt(h(i, 'border-top-width'))),
          (l -= b.left + parseInt(h(i, 'border-left-width'))),
          (s = a + r.height),
          (u = l + r.width)
          break
        }
      } while ((i = i.parentNode))
    }
    if (n && o !== window) {
      const E = ct(i || o)
      const y = E && E.a
      const w = E && E.d
      E &&
                ((a /= w),
                (l /= y),
                (c /= y),
                (d /= w),
                (s = a + d),
                (u = l + c))
    }
    return { top: a, left: l, bottom: s, right: u, width: c, height: d }
  }
}
function ce (o, t, e) {
  for (let n = tt(o, !0), i = O(o)[t]; n;) {
    const r = O(n)[e]
    let a = void 0
    if ((e === 'top' || e === 'left' ? (a = i >= r) : (a = i <= r), !a)) {
      return n
    }
    if (n === K()) break
    n = tt(n, !1)
  }
  return !1
}
function dt (o, t, e, n) {
  for (let i = 0, r = 0, a = o.children; r < a.length;) {
    if (
      a[r].style.display !== 'none' &&
            a[r] !== p.ghost &&
            (n || a[r] !== p.dragged) &&
            G(a[r], e.draggable, o, !1)
    ) {
      if (i === t) return a[r]
      i++
    }
    r++
  }
  return null
}
function ie (o, t) {
  for (
    var e = o.lastElementChild;
    e && (e === p.ghost || h(e, 'display') === 'none' || (t && !Xt(e, t)));

  ) {
    e = e.previousElementSibling
  }
  return e || null
}
function B (o, t) {
  let e = 0
  if (!o || !o.parentNode) return -1
  for (; (o = o.previousElementSibling);) {
    o.nodeName.toUpperCase() !== 'TEMPLATE' &&
            o !== p.clone &&
            (!t || Xt(o, t)) &&
            e++
  }
  return e
}
function de (o) {
  let t = 0
  let e = 0
  const n = K()
  if (o) {
    do {
      const i = ct(o)
      const r = i.a
      const a = i.d;
      (t += o.scrollLeft * r), (e += o.scrollTop * a)
    } while (o !== n && (o = o.parentNode))
  }
  return [t, e]
}
function He (o, t) {
  for (const e in o) {
    if (o.hasOwnProperty(e)) {
      for (const n in t) {
        if (t.hasOwnProperty(n) && t[n] === o[e][n]) return Number(e)
      }
    }
  }
  return -1
}
function tt (o, t) {
  if (!o || !o.getBoundingClientRect) return K()
  let e = o
  let n = !1
  do {
    if (e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight) {
      const i = h(e)
      if (
        (e.clientWidth < e.scrollWidth &&
                    (i.overflowX == 'auto' || i.overflowX == 'scroll')) ||
                (e.clientHeight < e.scrollHeight &&
                    (i.overflowY == 'auto' || i.overflowY == 'scroll'))
      ) {
        if (!e.getBoundingClientRect || e === document.body) return K()
        if (n || t) return e
        n = !0
      }
    }
  } while ((e = e.parentNode))
  return K()
}
function Ge (o, t) {
  if (o && t) for (const e in t) t.hasOwnProperty(e) && (o[e] = t[e])
  return o
}
function Wt (o, t) {
  return (
    Math.round(o.top) === Math.round(t.top) &&
        Math.round(o.left) === Math.round(t.left) &&
        Math.round(o.height) === Math.round(t.height) &&
        Math.round(o.width) === Math.round(t.width)
  )
}
let Dt
function Ee (o, t) {
  return function () {
    if (!Dt) {
      const e = arguments
      const n = this
      e.length === 1 ? o.call(n, e[0]) : o.apply(n, e),
      (Dt = setTimeout(function () {
        Dt = void 0
      }, t))
    }
  }
}
function Le () {
  clearTimeout(Dt), (Dt = void 0)
}
function De (o, t, e) {
  (o.scrollLeft += t), (o.scrollTop += e)
}
function Se (o) {
  const t = window.Polymer
  const e = window.jQuery || window.Zepto
  return t && t.dom
    ? t.dom(o).cloneNode(!0)
    : e
      ? e(o).clone(!0)[0]
      : o.cloneNode(!0)
}
function _e (o, t, e) {
  const n = {}
  return (
    Array.from(o.children).forEach(function (i) {
      let r, a, l, s
      if (!(!G(i, t.draggable, o, !1) || i.animated || i === e)) {
        const u = O(i);
        (n.left = Math.min(
          (r = n.left) !== null && r !== void 0 ? r : 1 / 0,
          u.left
        )),
        (n.top = Math.min(
          (a = n.top) !== null && a !== void 0 ? a : 1 / 0,
          u.top
        )),
        (n.right = Math.max(
          (l = n.right) !== null && l !== void 0 ? l : -1 / 0,
          u.right
        )),
        (n.bottom = Math.max(
          (s = n.bottom) !== null && s !== void 0 ? s : -1 / 0,
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
const x = 'Sortable' + new Date().getTime()
function Ke () {
  let o = []
  let t
  return {
    captureAnimationState: function () {
      if (((o = []), !!this.options.animation)) {
        const n = [].slice.call(this.el.children)
        n.forEach(function (i) {
          if (!(h(i, 'display') === 'none' || i === p.ghost)) {
            o.push({ target: i, rect: O(i) })
            const r = W({}, o[o.length - 1].rect)
            if (i.thisAnimationDuration) {
              const a = ct(i, !0)
              a && ((r.top -= a.f), (r.left -= a.e))
            }
            i.fromRect = r
          }
        })
      }
    },
    addAnimationState: function (n) {
      o.push(n)
    },
    removeAnimationState: function (n) {
      o.splice(He(o, { target: n }), 1)
    },
    animateAll: function (n) {
      const i = this
      if (!this.options.animation) {
        clearTimeout(t), typeof n === 'function' && n()
        return
      }
      let r = !1
      let a = 0
      o.forEach(function (l) {
        let s = 0
        const u = l.target
        const d = u.fromRect
        const c = O(u)
        const b = u.prevFromRect
        const E = u.prevToRect
        const y = l.rect
        const w = ct(u, !0)
        w && ((c.top -= w.f), (c.left -= w.e)),
        (u.toRect = c),
        u.thisAnimationDuration &&
                        Wt(b, c) &&
                        !Wt(d, c) &&
                        (y.top - c.top) / (y.left - c.left) ===
                            (d.top - c.top) / (d.left - c.left) &&
                        (s = je(y, b, E, i.options)),
        Wt(c, d) ||
                        ((u.prevFromRect = d),
                        (u.prevToRect = c),
                        s || (s = i.options.animation),
                        i.animate(u, y, c, s)),
        s &&
                        ((r = !0),
                        (a = Math.max(a, s)),
                        clearTimeout(u.animationResetTimer),
                        (u.animationResetTimer = setTimeout(function () {
                          (u.animationTime = 0),
                          (u.prevFromRect = null),
                          (u.fromRect = null),
                          (u.prevToRect = null),
                          (u.thisAnimationDuration = null)
                        }, s)),
                        (u.thisAnimationDuration = s))
      }),
      clearTimeout(t),
      r
        ? (t = setTimeout(function () {
            typeof n === 'function' && n()
          }, a))
        : typeof n === 'function' && n(),
      (o = [])
    },
    animate: function (n, i, r, a) {
      if (a) {
        h(n, 'transition', ''), h(n, 'transform', '')
        const l = ct(this.el)
        const s = l && l.a
        const u = l && l.d
        const d = (i.left - r.left) / (s || 1)
        const c = (i.top - r.top) / (u || 1);
        (n.animatingX = !!d),
        (n.animatingY = !!c),
        h(n, 'transform', 'translate3d(' + d + 'px,' + c + 'px,0)'),
        (this.forRepaintDummy = We(n)),
        h(
          n,
          'transition',
          'transform ' +
                            a +
                            'ms' +
                            (this.options.easing
                              ? ' ' + this.options.easing
                              : '')
        ),
        h(n, 'transform', 'translate3d(0,0,0)'),
        typeof n.animated === 'number' && clearTimeout(n.animated),
        (n.animated = setTimeout(function () {
          h(n, 'transition', ''),
          h(n, 'transform', ''),
          (n.animated = !1),
          (n.animatingX = !1),
          (n.animatingY = !1)
        }, a))
      }
    }
  }
}
function We (o) {
  return o.offsetWidth
}
function je (o, t, e, n) {
  return (
    (Math.sqrt(Math.pow(t.top - o.top, 2) + Math.pow(t.left - o.left, 2)) /
            Math.sqrt(
              Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)
            )) *
        n.animation
  )
}
const lt = []
const jt = { initializeByDefault: !0 }
const Tt = {
  mount: function (t) {
    for (const e in jt) {
      jt.hasOwnProperty(e) && !(e in t) && (t[e] = jt[e])
    }
    lt.forEach(function (n) {
      if (n.pluginName === t.pluginName) {
        throw 'Sortable: Cannot mount plugin '.concat(
          t.pluginName,
          ' more than once'
        )
      }
    }),
    lt.push(t)
  },
  pluginEvent: function (t, e, n) {
    const i = this;
    (this.eventCanceled = !1),
    (n.cancel = function () {
      i.eventCanceled = !0
    })
    const r = t + 'Global'
    lt.forEach(function (a) {
      e[a.pluginName] &&
                (e[a.pluginName][r] &&
                    e[a.pluginName][r](W({ sortable: e }, n)),
                e.options[a.pluginName] &&
                    e[a.pluginName][t] &&
                    e[a.pluginName][t](W({ sortable: e }, n)))
    })
  },
  initializePlugins: function (t, e, n, i) {
    lt.forEach(function (l) {
      const s = l.pluginName
      if (!(!t.options[s] && !l.initializeByDefault)) {
        const u = new l(t, e, t.options);
        (u.sortable = t),
        (u.options = t.options),
        (t[s] = u),
        $(n, u.defaults)
      }
    })
    for (const r in t.options) {
      if (t.options.hasOwnProperty(r)) {
        const a = this.modifyOption(t, r, t.options[r])
        typeof a < 'u' && (t.options[r] = a)
      }
    }
  },
  getEventProperties: function (t, e) {
    const n = {}
    return (
      lt.forEach(function (i) {
        typeof i.eventProperties === 'function' &&
                    $(n, i.eventProperties.call(e[i.pluginName], t))
      }),
      n
    )
  },
  modifyOption: function (t, e, n) {
    let i
    return (
      lt.forEach(function (r) {
        t[r.pluginName] &&
                    r.optionListeners &&
                    typeof r.optionListeners[e] === 'function' &&
                    (i = r.optionListeners[e].call(t[r.pluginName], n))
      }),
      i
    )
  }
}
function ze (o) {
  let t = o.sortable
  const e = o.rootEl
  const n = o.name
  const i = o.targetEl
  const r = o.cloneEl
  const a = o.toEl
  const l = o.fromEl
  const s = o.oldIndex
  const u = o.newIndex
  const d = o.oldDraggableIndex
  const c = o.newDraggableIndex
  const b = o.originalEvent
  const E = o.putSortable
  const y = o.extraEventProperties
  if (((t = t || (e && e[x])), !!t)) {
    let w
    const X = t.options
    const j = 'on' + n.charAt(0).toUpperCase() + n.substr(1)
    window.CustomEvent && !q && !Ot
      ? (w = new CustomEvent(n, { bubbles: !0, cancelable: !0 }))
      : ((w = document.createEvent('Event')), w.initEvent(n, !0, !0)),
    (w.to = a || e),
    (w.from = l || e),
    (w.item = i || e),
    (w.clone = r),
    (w.oldIndex = s),
    (w.newIndex = u),
    (w.oldDraggableIndex = d),
    (w.newDraggableIndex = c),
    (w.originalEvent = b),
    (w.pullMode = E ? E.lastPutMode : void 0)
    const I = W(W({}, y), Tt.getEventProperties(n, t))
    for (const Y in I) w[Y] = I[Y]
    e && e.dispatchEvent(w), X[j] && X[j].call(t, w)
  }
}
const Ue = ['evt']
const M = function (t, e) {
  const n =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
  const i = n.evt
  const r = Xe(n, Ue)
  Tt.pluginEvent.bind(p)(
    t,
    e,
    W(
      {
        dragEl: f,
        parentEl: _,
        ghostEl: g,
        rootEl: D,
        nextEl: at,
        lastDownEl: Ft,
        cloneEl: S,
        cloneHidden: J,
        dragStarted: bt,
        putSortable: T,
        activeSortable: p.active,
        originalEvent: i,
        oldIndex: ft,
        oldDraggableIndex: St,
        newIndex: k,
        newDraggableIndex: Q,
        hideGhostForTarget: Ae,
        unhideGhostForTarget: Ie,
        cloneNowHidden: function () {
          J = !0
        },
        cloneNowShown: function () {
          J = !1
        },
        dispatchSortableEvent: function (l) {
          N({ sortable: e, name: l, originalEvent: i })
        }
      },
      r
    )
  )
}
function N (o) {
  ze(
    W(
      {
        putSortable: T,
        cloneEl: S,
        targetEl: f,
        rootEl: D,
        oldIndex: ft,
        oldDraggableIndex: St,
        newIndex: k,
        newDraggableIndex: Q
      },
      o
    )
  )
}
let f
let _
let g
let D
let at
let Ft
let S
let J
let ft
let k
let St
let Q
let It
let T
let ut = !1
let Yt = !1
const Ht = []
let it
let H
let zt
let Ut
let he
let pe
let bt
let st
let _t
let Ct = !1
let Nt = !1
let Rt
let A
let $t = []
let Jt = !1
const Gt = []
const Kt = typeof document < 'u'
const Mt = oe
const ge = Ot || q ? 'cssFloat' : 'float'
const $e = Kt && !ve && !oe && 'draggable' in document.createElement('div')
const Ce = (function () {
  if (Kt) {
    if (q) return !1
    const o = document.createElement('x')
    return (
      (o.style.cssText = 'pointer-events:auto'),
      o.style.pointerEvents === 'auto'
    )
  }
})()
const Oe = function (t, e) {
  const n = h(t)
  const i =
        parseInt(n.width) -
        parseInt(n.paddingLeft) -
        parseInt(n.paddingRight) -
        parseInt(n.borderLeftWidth) -
        parseInt(n.borderRightWidth)
  const r = dt(t, 0, e)
  const a = dt(t, 1, e)
  const l = r && h(r)
  const s = a && h(a)
  const u =
        l && parseInt(l.marginLeft) + parseInt(l.marginRight) + O(r).width
  const d =
        s && parseInt(s.marginLeft) + parseInt(s.marginRight) + O(a).width
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
  if (r && l.float && l.float !== 'none') {
    const c = l.float === 'left' ? 'left' : 'right'
    return a && (s.clear === 'both' || s.clear === c)
      ? 'vertical'
      : 'horizontal'
  }
  return r &&
        (l.display === 'block' ||
            l.display === 'flex' ||
            l.display === 'table' ||
            l.display === 'grid' ||
            (u >= i && n[ge] === 'none') ||
            (a && n[ge] === 'none' && u + d > i))
    ? 'vertical'
    : 'horizontal'
}
const qe = function (t, e, n) {
  const i = n ? t.left : t.top
  const r = n ? t.right : t.bottom
  const a = n ? t.width : t.height
  const l = n ? e.left : e.top
  const s = n ? e.right : e.bottom
  const u = n ? e.width : e.height
  return i === l || r === s || i + a / 2 === l + u / 2
}
const Ve = function (t, e) {
  let n
  return (
    Ht.some(function (i) {
      const r = i[x].options.emptyInsertThreshold
      if (!(!r || ie(i))) {
        const a = O(i)
        const l = t >= a.left - r && t <= a.right + r
        const s = e >= a.top - r && e <= a.bottom + r
        if (l && s) return (n = i)
      }
    }),
    n
  )
}
const Te = function (t) {
  function e (r, a) {
    return function (l, s, u, d) {
      const c =
                l.options.group.name &&
                s.options.group.name &&
                l.options.group.name === s.options.group.name
      if (r == null && (a || c)) return !0
      if (r == null || r === !1) return !1
      if (a && r === 'clone') return r
      if (typeof r === 'function') {
        return e(r(l, s, u, d), a)(l, s, u, d)
      }
      const b = (a ? l : s).options.group.name
      return (
        r === !0 ||
                (typeof r === 'string' && r === b) ||
                (r.join && r.indexOf(b) > -1)
      )
    }
  }
  const n = {}
  let i = t.group;
  (!i || Pt(i) != 'object') && (i = { name: i }),
  (n.name = i.name),
  (n.checkPull = e(i.pull, !0)),
  (n.checkPut = e(i.put)),
  (n.revertClone = i.revertClone),
  (t.group = n)
}
var Ae = function () {
  !Ce && g && h(g, 'display', 'none')
}
var Ie = function () {
  !Ce && g && h(g, 'display', '')
}
Kt &&
    !ve &&
    document.addEventListener(
      'click',
      function (o) {
        if (Yt) {
          return (
            o.preventDefault(),
            o.stopPropagation && o.stopPropagation(),
            o.stopImmediatePropagation && o.stopImmediatePropagation(),
            (Yt = !1),
            !1
          )
        }
      },
      !0
    )
const rt = function (t) {
  if (f) {
    t = t.touches ? t.touches[0] : t
    const e = Ve(t.clientX, t.clientY)
    if (e) {
      const n = {}
      for (const i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
      (n.target = n.rootEl = e),
      (n.preventDefault = void 0),
      (n.stopPropagation = void 0),
      e[x]._onDragOver(n)
    }
  }
}
const Ze = function (t) {
  f && f.parentNode[x]._isOutsideThisEl(t.target)
}
function p (o, t) {
  if (!(o && o.nodeType && o.nodeType === 1)) {
    throw 'Sortable: `el` must be an HTMLElement, not '.concat(
      {}.toString.call(o)
    )
  }
  (this.el = o), (this.options = t = $({}, t)), (o[x] = this)
  const e = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(o.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    invertSwap: !1,
    invertedSwapThreshold: null,
    removeCloneOnHide: !0,
    direction: function () {
      return Oe(o, this.options)
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function (a, l) {
      a.setData('Text', l.textContent)
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
            p.supportPointer !== !1 && 'PointerEvent' in window && (!Et || oe),
    emptyInsertThreshold: 5
  }
  Tt.initializePlugins(this, o, e)
  for (const n in e) !(n in t) && (t[n] = e[n])
  Te(t)
  for (const i in this) {
    i.charAt(0) === '_' &&
            typeof this[i] === 'function' &&
            (this[i] = this[i].bind(this))
  }
  (this.nativeDraggable = t.forceFallback ? !1 : $e),
  this.nativeDraggable && (this.options.touchStartThreshold = 1),
  t.supportPointer
    ? v(o, 'pointerdown', this._onTapStart)
    : (v(o, 'mousedown', this._onTapStart),
      v(o, 'touchstart', this._onTapStart)),
  this.nativeDraggable &&
            (v(o, 'dragover', this), v(o, 'dragenter', this)),
  Ht.push(this.el),
  t.store && t.store.get && this.sort(t.store.get(this) || []),
  $(this, Ke())
}
p.prototype = {
  constructor: p,
  _isOutsideThisEl: function (t) {
    !this.el.contains(t) && t !== this.el && (st = null)
  },
  _getDirection: function (t, e) {
    return typeof this.options.direction === 'function'
      ? this.options.direction.call(this, t, e, f)
      : this.options.direction
  },
  _onTapStart: function (t) {
    if (t.cancelable) {
      const e = this
      const n = this.el
      const i = this.options
      const r = i.preventOnFilter
      const a = t.type
      const l =
                (t.touches && t.touches[0]) ||
                (t.pointerType && t.pointerType === 'touch' && t)
      let s = (l || t).target
      const u =
                (t.target.shadowRoot &&
                    ((t.path && t.path[0]) ||
                        (t.composedPath && t.composedPath()[0]))) ||
                s
      let d = i.filter
      if (
        (an(n),
        !f &&
                    !(
                      (/mousedown|pointerdown/.test(a) && t.button !== 0) ||
                        i.disabled
                    ) &&
                    !u.isContentEditable &&
                    !(
                      !this.nativeDraggable &&
                        Et &&
                        s &&
                        s.tagName.toUpperCase() === 'SELECT'
                    ) &&
                    ((s = G(s, i.draggable, n, !1)),
                    !(s && s.animated) && Ft !== s))
      ) {
        if (
          ((ft = B(s)),
          (St = B(s, i.draggable)),
          typeof d === 'function')
        ) {
          if (d.call(this, t, s, this)) {
            N({
              sortable: e,
              rootEl: u,
              name: 'filter',
              targetEl: s,
              toEl: n,
              fromEl: n
            }),
            M('filter', e, { evt: t }),
            r && t.preventDefault()
            return
          }
        } else if (
          d &&
                    ((d = d.split(',').some(function (c) {
                      if (((c = G(u, c.trim(), n, !1)), c)) {
                        return (
                          N({
                            sortable: e,
                            rootEl: c,
                            name: 'filter',
                            targetEl: s,
                            fromEl: n,
                            toEl: n
                          }),
                          M('filter', e, { evt: t }),
                          !0
                        )
                      }
                    })),
                    d)
        ) {
          r && t.preventDefault()
          return
        }
        (i.handle && !G(u, i.handle, n, !1)) ||
                    this._prepareDragStart(t, l, s)
      }
    }
  },
  _prepareDragStart: function (t, e, n) {
    const i = this
    const r = i.el
    const a = i.options
    const l = r.ownerDocument
    let s
    if (n && !f && n.parentNode === r) {
      const u = O(n)
      if (
        ((D = r),
        (f = n),
        (_ = f.parentNode),
        (at = f.nextSibling),
        (Ft = n),
        (It = a.group),
        (p.dragged = f),
        (it = {
          target: f,
          clientX: (e || t).clientX,
          clientY: (e || t).clientY
        }),
        (he = it.clientX - u.left),
        (pe = it.clientY - u.top),
        (this._lastX = (e || t).clientX),
        (this._lastY = (e || t).clientY),
        (f.style['will-change'] = 'all'),
        (s = function () {
          if ((M('delayEnded', i, { evt: t }), p.eventCanceled)) {
            i._onDrop()
            return
          }
          i._disableDelayedDragEvents(),
          !ue && i.nativeDraggable && (f.draggable = !0),
          i._triggerDragStart(t, e),
          N({ sortable: i, name: 'choose', originalEvent: t }),
          R(f, a.chosenClass, !0)
        }),
        a.ignore.split(',').forEach(function (d) {
          we(f, d.trim(), qt)
        }),
        v(l, 'dragover', rt),
        v(l, 'mousemove', rt),
        v(l, 'touchmove', rt),
        a.supportPointer
          ? (v(l, 'pointerup', i._onDrop),
            !this.nativeDraggable && v(l, 'pointercancel', i._onDrop))
          : (v(l, 'mouseup', i._onDrop),
            v(l, 'touchend', i._onDrop),
            v(l, 'touchcancel', i._onDrop)),
        ue &&
                    this.nativeDraggable &&
                    ((this.options.touchStartThreshold = 4),
                    (f.draggable = !0)),
        M('delayStart', this, { evt: t }),
        a.delay &&
                    (!a.delayOnTouchOnly || e) &&
                    (!this.nativeDraggable || !(Ot || q)))
      ) {
        if (p.eventCanceled) {
          this._onDrop()
          return
        }
        a.supportPointer
          ? (v(l, 'pointerup', i._disableDelayedDrag),
            v(l, 'pointercancel', i._disableDelayedDrag))
          : (v(l, 'mouseup', i._disableDelayedDrag),
            v(l, 'touchend', i._disableDelayedDrag),
            v(l, 'touchcancel', i._disableDelayedDrag)),
        v(l, 'mousemove', i._delayedDragTouchMoveHandler),
        v(l, 'touchmove', i._delayedDragTouchMoveHandler),
        a.supportPointer &&
                        v(l, 'pointermove', i._delayedDragTouchMoveHandler),
        (i._dragStartTimer = setTimeout(s, a.delay))
      } else s()
    }
  },
  _delayedDragTouchMoveHandler: function (t) {
    const e = t.touches ? t.touches[0] : t
    Math.max(
      Math.abs(e.clientX - this._lastX),
      Math.abs(e.clientY - this._lastY)
    ) >=
            Math.floor(
              this.options.touchStartThreshold /
                    ((this.nativeDraggable && window.devicePixelRatio) || 1)
            ) && this._disableDelayedDrag()
  },
  _disableDelayedDrag: function () {
    f && qt(f),
    clearTimeout(this._dragStartTimer),
    this._disableDelayedDragEvents()
  },
  _disableDelayedDragEvents: function () {
    const t = this.el.ownerDocument
    m(t, 'mouseup', this._disableDelayedDrag),
    m(t, 'touchend', this._disableDelayedDrag),
    m(t, 'touchcancel', this._disableDelayedDrag),
    m(t, 'pointerup', this._disableDelayedDrag),
    m(t, 'pointercancel', this._disableDelayedDrag),
    m(t, 'mousemove', this._delayedDragTouchMoveHandler),
    m(t, 'touchmove', this._delayedDragTouchMoveHandler),
    m(t, 'pointermove', this._delayedDragTouchMoveHandler)
  },
  _triggerDragStart: function (t, e) {
    (e = e || (t.pointerType == 'touch' && t)),
    !this.nativeDraggable || e
      ? this.options.supportPointer
        ? v(document, 'pointermove', this._onTouchMove)
        : e
          ? v(document, 'touchmove', this._onTouchMove)
          : v(document, 'mousemove', this._onTouchMove)
      : (v(f, 'dragend', this), v(D, 'dragstart', this._onDragStart))
    try {
      document.selection
        ? kt(function () {
          document.selection.empty()
        })
        : window.getSelection().removeAllRanges()
    } catch {}
  },
  _dragStarted: function (t, e) {
    if (((ut = !1), D && f)) {
      M('dragStarted', this, { evt: e }),
      this.nativeDraggable && v(document, 'dragover', Ze)
      const n = this.options
      !t && R(f, n.dragClass, !1),
      R(f, n.ghostClass, !0),
      (p.active = this),
      t && this._appendGhost(),
      N({ sortable: this, name: 'start', originalEvent: e })
    } else this._nulling()
  },
  _emulateDragOver: function () {
    if (H) {
      (this._lastX = H.clientX), (this._lastY = H.clientY), Ae()
      for (
        var t = document.elementFromPoint(H.clientX, H.clientY), e = t;
        t &&
                t.shadowRoot &&
                ((t = t.shadowRoot.elementFromPoint(H.clientX, H.clientY)),
                t !== e);

      ) {
        e = t
      }
      if ((f.parentNode[x]._isOutsideThisEl(t), e)) {
        do {
          if (e[x]) {
            let n = void 0
            if (
              ((n = e[x]._onDragOver({
                clientX: H.clientX,
                clientY: H.clientY,
                target: t,
                rootEl: e
              })),
              n && !this.options.dragoverBubble)
            ) {
              break
            }
          }
          t = e
        } while ((e = ye(e)))
      }
      Ie()
    }
  },
  _onTouchMove: function (t) {
    if (it) {
      const e = this.options
      const n = e.fallbackTolerance
      const i = e.fallbackOffset
      const r = t.touches ? t.touches[0] : t
      let a = g && ct(g, !0)
      const l = g && a && a.a
      const s = g && a && a.d
      const u = Mt && A && de(A)
      const d =
                (r.clientX - it.clientX + i.x) / (l || 1) +
                (u ? u[0] - $t[0] : 0) / (l || 1)
      const c =
                (r.clientY - it.clientY + i.y) / (s || 1) +
                (u ? u[1] - $t[1] : 0) / (s || 1)
      if (!p.active && !ut) {
        if (
          n &&
                    Math.max(
                      Math.abs(r.clientX - this._lastX),
                      Math.abs(r.clientY - this._lastY)
                    ) < n
        ) {
          return
        }
        this._onDragStart(t, !0)
      }
      if (g) {
        a
          ? ((a.e += d - (zt || 0)), (a.f += c - (Ut || 0)))
          : (a = { a: 1, b: 0, c: 0, d: 1, e: d, f: c })
        const b = 'matrix('
          .concat(a.a, ',')
          .concat(a.b, ',')
          .concat(a.c, ',')
          .concat(a.d, ',')
          .concat(a.e, ',')
          .concat(a.f, ')')
        h(g, 'webkitTransform', b),
        h(g, 'mozTransform', b),
        h(g, 'msTransform', b),
        h(g, 'transform', b),
        (zt = d),
        (Ut = c),
        (H = r)
      }
      t.cancelable && t.preventDefault()
    }
  },
  _appendGhost: function () {
    if (!g) {
      const t = this.options.fallbackOnBody ? document.body : D
      const e = O(f, !0, Mt, !0, t)
      const n = this.options
      if (Mt) {
        for (
          A = t;
          h(A, 'position') === 'static' &&
                    h(A, 'transform') === 'none' &&
                    A !== document;

        ) {
          A = A.parentNode
        }
        A !== document.body && A !== document.documentElement
          ? (A === document && (A = K()),
            (e.top += A.scrollTop),
            (e.left += A.scrollLeft))
          : (A = K()),
        ($t = de(A))
      }
      (g = f.cloneNode(!0)),
      R(g, n.ghostClass, !1),
      R(g, n.fallbackClass, !0),
      R(g, n.dragClass, !0),
      h(g, 'transition', ''),
      h(g, 'transform', ''),
      h(g, 'box-sizing', 'border-box'),
      h(g, 'margin', 0),
      h(g, 'top', e.top),
      h(g, 'left', e.left),
      h(g, 'width', e.width),
      h(g, 'height', e.height),
      h(g, 'opacity', '0.8'),
      h(g, 'position', Mt ? 'absolute' : 'fixed'),
      h(g, 'zIndex', '100000'),
      h(g, 'pointerEvents', 'none'),
      (p.ghost = g),
      t.appendChild(g),
      h(
        g,
        'transform-origin',
        (he / parseInt(g.style.width)) * 100 +
                        '% ' +
                        (pe / parseInt(g.style.height)) * 100 +
                        '%'
      )
    }
  },
  _onDragStart: function (t, e) {
    const n = this
    const i = t.dataTransfer
    const r = n.options
    if ((M('dragStart', this, { evt: t }), p.eventCanceled)) {
      this._onDrop()
      return
    }
    M('setupClone', this),
    p.eventCanceled ||
                ((S = Se(f)),
                S.removeAttribute('id'),
                (S.draggable = !1),
                (S.style['will-change'] = ''),
                this._hideClone(),
                R(S, this.options.chosenClass, !1),
                (p.clone = S)),
    (n.cloneId = kt(function () {
      M('clone', n),
      !p.eventCanceled &&
                        (n.options.removeCloneOnHide || D.insertBefore(S, f),
                        n._hideClone(),
                        N({ sortable: n, name: 'clone' }))
    })),
    !e && R(f, r.dragClass, !0),
    e
      ? ((Yt = !0), (n._loopId = setInterval(n._emulateDragOver, 50)))
      : (m(document, 'mouseup', n._onDrop),
        m(document, 'touchend', n._onDrop),
        m(document, 'touchcancel', n._onDrop),
        i &&
                      ((i.effectAllowed = 'move'),
                      r.setData && r.setData.call(n, i, f)),
        v(document, 'drop', n),
        h(f, 'transform', 'translateZ(0)')),
    (ut = !0),
    (n._dragStartId = kt(n._dragStarted.bind(n, e, t))),
    v(document, 'selectstart', n),
    (bt = !0),
    window.getSelection().removeAllRanges(),
    Et && h(document.body, 'user-select', 'none')
  },
  _onDragOver: function (t) {
    const e = this.el
    let n = t.target
    let i
    let r
    let a
    const l = this.options
    const s = l.group
    const u = p.active
    const d = It === s
    const c = l.sort
    const b = T || u
    let E
    const y = this
    let w = !1
    if (Jt) return
    function X (vt, Fe) {
      M(
        vt,
        y,
        W(
          {
            evt: t,
            isOwner: d,
            axis: E ? 'vertical' : 'horizontal',
            revert: a,
            dragRect: i,
            targetRect: r,
            canSort: c,
            fromSortable: b,
            target: n,
            completed: I,
            onMove: function (le, Re) {
              return xt(D, e, f, i, le, O(le), t, Re)
            },
            changed: Y
          },
          Fe
        )
      )
    }
    function j () {
      X('dragOverAnimationCapture'),
      y.captureAnimationState(),
      y !== b && b.captureAnimationState()
    }
    function I (vt) {
      return (
        X('dragOverCompleted', { insertion: vt }),
        vt &&
                    (d ? u._hideClone() : u._showClone(y),
                    y !== b &&
                        (R(
                          f,
                          T ? T.options.ghostClass : u.options.ghostClass,
                          !1
                        ),
                        R(f, l.ghostClass, !0)),
                    T !== y && y !== p.active
                      ? (T = y)
                      : y === p.active && T && (T = null),
                    b === y && (y._ignoreWhileAnimating = n),
                    y.animateAll(function () {
                      X('dragOverAnimationComplete'),
                      (y._ignoreWhileAnimating = null)
                    }),
                    y !== b &&
                        (b.animateAll(), (b._ignoreWhileAnimating = null))),
        ((n === f && !f.animated) || (n === e && !n.animated)) &&
                    (st = null),
        !l.dragoverBubble &&
                    !t.rootEl &&
                    n !== document &&
                    (f.parentNode[x]._isOutsideThisEl(t.target), !vt && rt(t)),
        !l.dragoverBubble && t.stopPropagation && t.stopPropagation(),
        (w = !0)
      )
    }
    function Y () {
      (k = B(f)),
      (Q = B(f, l.draggable)),
      N({
        sortable: y,
        name: 'change',
        toEl: e,
        newIndex: k,
        newDraggableIndex: Q,
        originalEvent: t
      })
    }
    if (
      (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(),
      (n = G(n, l.draggable, e, !0)),
      X('dragOver'),
      p.eventCanceled)
    ) {
      return w
    }
    if (
      f.contains(t.target) ||
            (n.animated && n.animatingX && n.animatingY) ||
            y._ignoreWhileAnimating === n
    ) {
      return I(!1)
    }
    if (
      ((Yt = !1),
      u &&
                !l.disabled &&
                (d
                  ? c || (a = _ !== D)
                  : T === this ||
                      ((this.lastPutMode = It.checkPull(this, u, f, t)) &&
                          s.checkPut(this, u, f, t))))
    ) {
      if (
        ((E = this._getDirection(t, n) === 'vertical'),
        (i = O(f)),
        X('dragOverValid'),
        p.eventCanceled)
      ) {
        return w
      }
      if (a) {
        return (
          (_ = D),
          j(),
          this._hideClone(),
          X('revert'),
          p.eventCanceled ||
                        (at ? D.insertBefore(f, at) : D.appendChild(f)),
          I(!0)
        )
      }
      const P = ie(e, l.draggable)
      if (!P || (en(t, E, this) && !P.animated)) {
        if (P === f) return I(!1)
        if (
          (P && e === t.target && (n = P),
          n && (r = O(n)),
          xt(D, e, f, i, n, r, t, !!n) !== !1)
        ) {
          return (
            j(),
            P && P.nextSibling
              ? e.insertBefore(f, P.nextSibling)
              : e.appendChild(f),
            (_ = e),
            Y(),
            I(!0)
          )
        }
      } else if (P && tn(t, E, this)) {
        const et = dt(e, 0, l, !0)
        if (et === f) return I(!1)
        if (
          ((n = et), (r = O(n)), xt(D, e, f, i, n, r, t, !1) !== !1)
        ) {
          return j(), e.insertBefore(f, et), (_ = e), Y(), I(!0)
        }
      } else if (n.parentNode === e) {
        r = O(n)
        let L = 0
        let nt
        const ht = f.parentNode !== e
        const F = !qe(
          (f.animated && f.toRect) || i,
          (n.animated && n.toRect) || r,
          E
        )
        const pt = E ? 'top' : 'left'
        const V = ce(n, 'top', 'top') || ce(f, 'top', 'top')
        const gt = V ? V.scrollTop : void 0
        st !== n &&
                    ((nt = r[pt]),
                    (Ct = !1),
                    (Nt = (!F && l.invertSwap) || ht)),
        (L = nn(
          t,
          n,
          r,
          E,
          F ? 1 : l.swapThreshold,
          l.invertedSwapThreshold == null
            ? l.swapThreshold
            : l.invertedSwapThreshold,
          Nt,
          st === n
        ))
        let z
        if (L !== 0) {
          let ot = B(f)
          do (ot -= L), (z = _.children[ot])
          while (z && (h(z, 'display') === 'none' || z === g))
        }
        if (L === 0 || z === n) return I(!1);
        (st = n), (_t = L)
        const mt = n.nextElementSibling
        let Z = !1
        Z = L === 1
        const At = xt(D, e, f, i, n, r, t, Z)
        if (At !== !1) {
          return (
            (At === 1 || At === -1) && (Z = At === 1),
            (Jt = !0),
            setTimeout(Je, 30),
            j(),
            Z && !mt
              ? e.appendChild(f)
              : n.parentNode.insertBefore(f, Z ? mt : n),
            V && De(V, 0, gt - V.scrollTop),
            (_ = f.parentNode),
            nt !== void 0 && !Nt && (Rt = Math.abs(nt - O(n)[pt])),
            Y(),
            I(!0)
          )
        }
      }
      if (e.contains(f)) return I(!1)
    }
    return !1
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function () {
    m(document, 'mousemove', this._onTouchMove),
    m(document, 'touchmove', this._onTouchMove),
    m(document, 'pointermove', this._onTouchMove),
    m(document, 'dragover', rt),
    m(document, 'mousemove', rt),
    m(document, 'touchmove', rt)
  },
  _offUpEvents: function () {
    const t = this.el.ownerDocument
    m(t, 'mouseup', this._onDrop),
    m(t, 'touchend', this._onDrop),
    m(t, 'pointerup', this._onDrop),
    m(t, 'pointercancel', this._onDrop),
    m(t, 'touchcancel', this._onDrop),
    m(document, 'selectstart', this)
  },
  _onDrop: function (t) {
    const e = this.el
    const n = this.options
    if (
      ((k = B(f)),
      (Q = B(f, n.draggable)),
      M('drop', this, { evt: t }),
      (_ = f && f.parentNode),
      (k = B(f)),
      (Q = B(f, n.draggable)),
      p.eventCanceled)
    ) {
      this._nulling()
      return
    }
    (ut = !1),
    (Nt = !1),
    (Ct = !1),
    clearInterval(this._loopId),
    clearTimeout(this._dragStartTimer),
    te(this.cloneId),
    te(this._dragStartId),
    this.nativeDraggable &&
                (m(document, 'drop', this),
                m(e, 'dragstart', this._onDragStart)),
    this._offMoveEvents(),
    this._offUpEvents(),
    Et && h(document.body, 'user-select', ''),
    h(f, 'transform', ''),
    t &&
                (bt &&
                    (t.cancelable && t.preventDefault(),
                    !n.dropBubble && t.stopPropagation()),
                g && g.parentNode && g.parentNode.removeChild(g),
                (D === _ || (T && T.lastPutMode !== 'clone')) &&
                    S &&
                    S.parentNode &&
                    S.parentNode.removeChild(S),
                f &&
                    (this.nativeDraggable && m(f, 'dragend', this),
                    qt(f),
                    (f.style['will-change'] = ''),
                    bt &&
                        !ut &&
                        R(
                          f,
                          T ? T.options.ghostClass : this.options.ghostClass,
                          !1
                        ),
                    R(f, this.options.chosenClass, !1),
                    N({
                      sortable: this,
                      name: 'unchoose',
                      toEl: _,
                      newIndex: null,
                      newDraggableIndex: null,
                      originalEvent: t
                    }),
                    D !== _
                      ? (k >= 0 &&
                              (N({
                                rootEl: _,
                                name: 'add',
                                toEl: _,
                                fromEl: D,
                                originalEvent: t
                              }),
                              N({
                                sortable: this,
                                name: 'remove',
                                toEl: _,
                                originalEvent: t
                              }),
                              N({
                                rootEl: _,
                                name: 'sort',
                                toEl: _,
                                fromEl: D,
                                originalEvent: t
                              }),
                              N({
                                sortable: this,
                                name: 'sort',
                                toEl: _,
                                originalEvent: t
                              })),
                        T && T.save())
                      : k !== ft &&
                          k >= 0 &&
                          (N({
                            sortable: this,
                            name: 'update',
                            toEl: _,
                            originalEvent: t
                          }),
                          N({
                            sortable: this,
                            name: 'sort',
                            toEl: _,
                            originalEvent: t
                          })),
                    p.active &&
                        ((k == null || k === -1) && ((k = ft), (Q = St)),
                        N({
                          sortable: this,
                          name: 'end',
                          toEl: _,
                          originalEvent: t
                        }),
                        this.save()))),
    this._nulling()
  },
  _nulling: function () {
    M('nulling', this),
    (D =
                f =
                _ =
                g =
                at =
                S =
                Ft =
                J =
                it =
                H =
                bt =
                k =
                Q =
                ft =
                St =
                st =
                _t =
                T =
                It =
                p.dragged =
                p.ghost =
                p.clone =
                p.active =
                    null),
    Gt.forEach(function (t) {
      t.checked = !0
    }),
    (Gt.length = zt = Ut = 0)
  },
  handleEvent: function (t) {
    switch (t.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(t)
        break
      case 'dragenter':
      case 'dragover':
        f && (this._onDragOver(t), Qe(t))
        break
      case 'selectstart':
        t.preventDefault()
        break
    }
  },
  toArray: function () {
    for (
      var t = [],
        e,
        n = this.el.children,
        i = 0,
        r = n.length,
        a = this.options;
      i < r;
      i++
    ) {
      (e = n[i]),
      G(e, a.draggable, this.el, !1) &&
                    t.push(e.getAttribute(a.dataIdAttr) || rn(e))
    }
    return t
  },
  sort: function (t, e) {
    const n = {}
    const i = this.el
    this.toArray().forEach(function (r, a) {
      const l = i.children[a]
      G(l, this.options.draggable, i, !1) && (n[r] = l)
    }, this),
    e && this.captureAnimationState(),
    t.forEach(function (r) {
      n[r] && (i.removeChild(n[r]), i.appendChild(n[r]))
    }),
    e && this.animateAll()
  },
  save: function () {
    const t = this.options.store
    t && t.set && t.set(this)
  },
  closest: function (t, e) {
    return G(t, e || this.options.draggable, this.el, !1)
  },
  option: function (t, e) {
    const n = this.options
    if (e === void 0) return n[t]
    const i = Tt.modifyOption(this, t, e)
    typeof i < 'u' ? (n[t] = i) : (n[t] = e), t === 'group' && Te(n)
  },
  destroy: function () {
    M('destroy', this)
    let t = this.el;
    (t[x] = null),
    m(t, 'mousedown', this._onTapStart),
    m(t, 'touchstart', this._onTapStart),
    m(t, 'pointerdown', this._onTapStart),
    this.nativeDraggable &&
                (m(t, 'dragover', this), m(t, 'dragenter', this)),
    Array.prototype.forEach.call(
      t.querySelectorAll('[draggable]'),
      function (e) {
        e.removeAttribute('draggable')
      }
    ),
    this._onDrop(),
    this._disableDelayedDragEvents(),
    Ht.splice(Ht.indexOf(this.el), 1),
    (this.el = t = null)
  },
  _hideClone: function () {
    if (!J) {
      if ((M('hideClone', this), p.eventCanceled)) return
      h(S, 'display', 'none'),
      this.options.removeCloneOnHide &&
                    S.parentNode &&
                    S.parentNode.removeChild(S),
      (J = !0)
    }
  },
  _showClone: function (t) {
    if (t.lastPutMode !== 'clone') {
      this._hideClone()
      return
    }
    if (J) {
      if ((M('showClone', this), p.eventCanceled)) return
      f.parentNode == D && !this.options.group.revertClone
        ? D.insertBefore(S, f)
        : at
          ? D.insertBefore(S, at)
          : D.appendChild(S),
      this.options.group.revertClone && this.animate(f, S),
      h(S, 'display', ''),
      (J = !1)
    }
  }
}
function Qe (o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = 'move'),
  o.cancelable && o.preventDefault()
}
function xt (o, t, e, n, i, r, a, l) {
  let s
  const u = o[x]
  const d = u.options.onMove
  let c
  return (
    window.CustomEvent && !q && !Ot
      ? (s = new CustomEvent('move', { bubbles: !0, cancelable: !0 }))
      : ((s = document.createEvent('Event')),
        s.initEvent('move', !0, !0)),
    (s.to = t),
    (s.from = o),
    (s.dragged = e),
    (s.draggedRect = n),
    (s.related = i || t),
    (s.relatedRect = r || O(t)),
    (s.willInsertAfter = l),
    (s.originalEvent = a),
    o.dispatchEvent(s),
    d && (c = d.call(u, s, a)),
    c
  )
}
function qt (o) {
  o.draggable = !1
}
function Je () {
  Jt = !1
}
function tn (o, t, e) {
  const n = O(dt(e.el, 0, e.options, !0))
  const i = _e(e.el, e.options, g)
  const r = 10
  return t
    ? o.clientX < i.left - r || (o.clientY < n.top && o.clientX < n.right)
    : o.clientY < i.top - r || (o.clientY < n.bottom && o.clientX < n.left)
}
function en (o, t, e) {
  const n = O(ie(e.el, e.options.draggable))
  const i = _e(e.el, e.options, g)
  const r = 10
  return t
    ? o.clientX > i.right + r ||
              (o.clientY > n.bottom && o.clientX > n.left)
    : o.clientY > i.bottom + r ||
              (o.clientX > n.right && o.clientY > n.top)
}
function nn (o, t, e, n, i, r, a, l) {
  const s = n ? o.clientY : o.clientX
  const u = n ? e.height : e.width
  const d = n ? e.top : e.left
  const c = n ? e.bottom : e.right
  let b = !1
  if (!a) {
    if (l && Rt < u * i) {
      if (
        (!Ct &&
                    (_t === 1 ? s > d + (u * r) / 2 : s < c - (u * r) / 2) &&
                    (Ct = !0),
        Ct)
      ) {
        b = !0
      } else if (_t === 1 ? s < d + Rt : s > c - Rt) return -_t
    } else if (s > d + (u * (1 - i)) / 2 && s < c - (u * (1 - i)) / 2) {
      return on(t)
    }
  }
  return (
    (b = b || a),
    b && (s < d + (u * r) / 2 || s > c - (u * r) / 2)
      ? s > d + u / 2
        ? 1
        : -1
      : 0
  )
}
function on (o) {
  return B(f) < B(o) ? 1 : -1
}
function rn (o) {
  for (
    var t = o.tagName + o.className + o.src + o.href + o.textContent,
      e = t.length,
      n = 0;
    e--;

  ) {
    n += t.charCodeAt(e)
  }
  return n.toString(36)
}
function an (o) {
  Gt.length = 0
  for (let t = o.getElementsByTagName('input'), e = t.length; e--;) {
    const n = t[e]
    n.checked && Gt.push(n)
  }
}
function kt (o) {
  return setTimeout(o, 0)
}
function te (o) {
  return clearTimeout(o)
}
Kt &&
    v(document, 'touchmove', function (o) {
      (p.active || ut) && o.cancelable && o.preventDefault()
    })
p.utils = {
  on: v,
  off: m,
  css: h,
  find: we,
  is: function (t, e) {
    return !!G(t, e, t, !1)
  },
  extend: Ge,
  throttle: Ee,
  closest: G,
  toggleClass: R,
  clone: Se,
  index: B,
  nextTick: kt,
  cancelNextTick: te,
  detectDirection: Oe,
  getChild: dt,
  expando: x
}
p.get = function (o) {
  return o[x]
}
p.mount = function () {
  for (var o = arguments.length, t = new Array(o), e = 0; e < o; e++) {
    t[e] = arguments[e]
  }
  t[0].constructor === Array && (t = t[0]),
  t.forEach(function (n) {
    if (!n.prototype || !n.prototype.constructor) {
      throw 'Sortable: Mounted plugin must be a constructor function, not '.concat(
        {}.toString.call(n)
      )
    }
    n.utils && (p.utils = W(W({}, p.utils), n.utils)), Tt.mount(n)
  })
}
p.create = function (o, t) {
  return new p(o, t)
}
p.version = Ye
let C = []
let yt
let ee
let ne = !1
let Vt
let Zt
let Lt
let wt
function ln () {
  function o () {
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
    (o.prototype = {
      dragStarted: function (e) {
        const n = e.originalEvent
        this.sortable.nativeDraggable
          ? v(document, 'dragover', this._handleAutoScroll)
          : this.options.supportPointer
            ? v(
              document,
              'pointermove',
              this._handleFallbackAutoScroll
            )
            : n.touches
              ? v(
                document,
                'touchmove',
                this._handleFallbackAutoScroll
              )
              : v(
                document,
                'mousemove',
                this._handleFallbackAutoScroll
              )
      },
      dragOverCompleted: function (e) {
        const n = e.originalEvent
        !this.options.dragOverBubble &&
                    !n.rootEl &&
                    this._handleAutoScroll(n)
      },
      drop: function () {
        this.sortable.nativeDraggable
          ? m(document, 'dragover', this._handleAutoScroll)
          : (m(
              document,
              'pointermove',
              this._handleFallbackAutoScroll
            ),
            m(document, 'touchmove', this._handleFallbackAutoScroll),
            m(document, 'mousemove', this._handleFallbackAutoScroll)),
        me(),
        Bt(),
        Le()
      },
      nulling: function () {
        (Lt = ee = yt = ne = wt = Vt = Zt = null), (C.length = 0)
      },
      _handleFallbackAutoScroll: function (e) {
        this._handleAutoScroll(e, !0)
      },
      _handleAutoScroll: function (e, n) {
        const i = this
        const r = (e.touches ? e.touches[0] : e).clientX
        const a = (e.touches ? e.touches[0] : e).clientY
        const l = document.elementFromPoint(r, a)
        if (
          ((Lt = e),
          n || this.options.forceAutoScrollFallback || Ot || q || Et)
        ) {
          Qt(e, this.options, l, n)
          let s = tt(l, !0)
          ne &&
                        (!wt || r !== Vt || a !== Zt) &&
                        (wt && me(),
                        (wt = setInterval(function () {
                          const u = tt(document.elementFromPoint(r, a), !0)
                          u !== s && ((s = u), Bt()), Qt(e, i.options, u, n)
                        }, 10)),
                        (Vt = r),
                        (Zt = a))
        } else {
          if (!this.options.bubbleScroll || tt(l, !0) === K()) {
            Bt()
            return
          }
          Qt(e, this.options, tt(l, !1), !1)
        }
      }
    }),
    $(o, { pluginName: 'scroll', initializeByDefault: !0 })
  )
}
function Bt () {
  C.forEach(function (o) {
    clearInterval(o.pid)
  }),
  (C = [])
}
function me () {
  clearInterval(wt)
}
var Qt = Ee(function (o, t, e, n) {
  if (t.scroll) {
    const i = (o.touches ? o.touches[0] : o).clientX
    const r = (o.touches ? o.touches[0] : o).clientY
    const a = t.scrollSensitivity
    const l = t.scrollSpeed
    const s = K()
    let u = !1
    let d
    ee !== e &&
            ((ee = e),
            Bt(),
            (yt = t.scroll),
            (d = t.scrollFn),
            yt === !0 && (yt = tt(e, !0)))
    let c = 0
    let b = yt
    do {
      const E = b
      const y = O(E)
      const w = y.top
      const X = y.bottom
      const j = y.left
      const I = y.right
      const Y = y.width
      const P = y.height
      let et = void 0
      let L = void 0
      const nt = E.scrollWidth
      const ht = E.scrollHeight
      const F = h(E)
      const pt = E.scrollLeft
      const V = E.scrollTop
      E === s
        ? ((et =
                      Y < nt &&
                      (F.overflowX === 'auto' ||
                          F.overflowX === 'scroll' ||
                          F.overflowX === 'visible')),
          (L =
                      P < ht &&
                      (F.overflowY === 'auto' ||
                          F.overflowY === 'scroll' ||
                          F.overflowY === 'visible')))
        : ((et =
                      Y < nt &&
                      (F.overflowX === 'auto' || F.overflowX === 'scroll')),
          (L =
                      P < ht &&
                      (F.overflowY === 'auto' || F.overflowY === 'scroll')))
      const gt =
                et &&
                (Math.abs(I - i) <= a && pt + Y < nt) -
                    (Math.abs(j - i) <= a && !!pt)
      const z =
                L &&
                (Math.abs(X - r) <= a && V + P < ht) -
                    (Math.abs(w - r) <= a && !!V)
      if (!C[c]) {
        for (let ot = 0; ot <= c; ot++) C[ot] || (C[ot] = {})
      }
      (C[c].vx != gt || C[c].vy != z || C[c].el !== E) &&
                ((C[c].el = E),
                (C[c].vx = gt),
                (C[c].vy = z),
                clearInterval(C[c].pid),
                (gt != 0 || z != 0) &&
                    ((u = !0),
                    (C[c].pid = setInterval(
                      function () {
                        n && this.layer === 0 && p.active._onTouchMove(Lt)
                        const mt = C[this.layer].vy
                          ? C[this.layer].vy * l
                          : 0
                        const Z = C[this.layer].vx
                          ? C[this.layer].vx * l
                          : 0;
                        (typeof d === 'function' &&
                                d.call(
                                  p.dragged.parentNode[x],
                                  Z,
                                  mt,
                                  o,
                                  Lt,
                                  C[this.layer].el
                                ) !== 'continue') ||
                                De(C[this.layer].el, Z, mt)
                      }.bind({ layer: c }),
                      24
                    )))),
      c++
    } while (t.bubbleScroll && b !== s && (b = tt(b, !1)))
    ne = u
  }
}, 30)
const Ne = function (t) {
  const e = t.originalEvent
  const n = t.putSortable
  const i = t.dragEl
  const r = t.activeSortable
  const a = t.dispatchSortableEvent
  const l = t.hideGhostForTarget
  const s = t.unhideGhostForTarget
  if (e) {
    const u = n || r
    l()
    const d =
            e.changedTouches && e.changedTouches.length
              ? e.changedTouches[0]
              : e
    const c = document.elementFromPoint(d.clientX, d.clientY)
    s(),
    u &&
                !u.el.contains(c) &&
                (a('spill'), this.onSpill({ dragEl: i, putSortable: n }))
  }
}
function re () {}
re.prototype = {
  startIndex: null,
  dragStart: function (t) {
    const e = t.oldDraggableIndex
    this.startIndex = e
  },
  onSpill: function (t) {
    const e = t.dragEl
    const n = t.putSortable
    this.sortable.captureAnimationState(), n && n.captureAnimationState()
    const i = dt(this.sortable.el, this.startIndex, this.options)
    i
      ? this.sortable.el.insertBefore(e, i)
      : this.sortable.el.appendChild(e),
    this.sortable.animateAll(),
    n && n.animateAll()
  },
  drop: Ne
}
$(re, { pluginName: 'revertOnSpill' })
function ae () {}
ae.prototype = {
  onSpill: function (t) {
    const e = t.dragEl
    const n = t.putSortable
    const i = n || this.sortable
    i.captureAnimationState(),
    e.parentNode && e.parentNode.removeChild(e),
    i.animateAll()
  },
  drop: Ne
}
$(ae, { pluginName: 'removeOnSpill' })
p.mount(new ln())
p.mount(ae, re)
const Me = p
let xe
const sn = (o) => {
  const t = Array.from(o.childNodes).filter(
    (e) =>
      e.nodeType === 8 &&
            ['[if ENDBLOCK]><![endif]', '__ENDBLOCK__'].includes(
              e.nodeValue?.trim()
            )
  )[0]
  t && o.appendChild(t)
}
function Pe () {
  const o = document.querySelector('[x-ref="grid"]')
  o &&
        (xe = new Me(o, {
          animation: 150,
          handle: '.handle',
          ghostClass: 'opacity-50',
          onEnd: (t) => {
            const e = Array.from(o.children).map((n) => n.dataset.id)
            sn(o), Livewire.dispatch('updateLayout', { orderedIds: e })
          }
        }))
}
Pe()
document.addEventListener('livewire:update', function () {
  Livewire.getByName('editMode') ? Pe() : xe?.destroy()
})
/*! Bundled license information:

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.6
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
