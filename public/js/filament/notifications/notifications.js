(() => {
  const O = Object.create
  const N = Object.defineProperty
  const V = Object.getOwnPropertyDescriptor
  const Y = Object.getOwnPropertyNames
  const H = Object.getPrototypeOf
  const W = Object.prototype.hasOwnProperty
  const d = (i, t) => () => (
    t || i((t = { exports: {} }).exports, t), t.exports
  )
  const j = (i, t, e, s) => {
    if ((t && typeof t === 'object') || typeof t === 'function') {
      for (const n of Y(t)) {
        !W.call(i, n) &&
                    n !== e &&
                    N(i, n, {
                      get: () => t[n],
                      enumerable: !(s = V(t, n)) || s.enumerable
                    })
      }
    }
    return i
  }
  const J = (i, t, e) => (
    (e = i != null ? O(H(i)) : {}),
    j(
      t || !i || !i.__esModule
        ? N(e, 'default', { value: i, enumerable: !0 })
        : e,
      i
    )
  )
  const S = d((ut, _) => {
    let v
    const g = typeof global < 'u' && (global.crypto || global.msCrypto)
    g &&
            g.getRandomValues &&
            ((y = new Uint8Array(16)),
            (v = function () {
              return g.getRandomValues(y), y
            }))
    let y
    v ||
            ((T = new Array(16)),
            (v = function () {
              for (var i = 0, t; i < 16; i++) {
                i & 3 || (t = Math.random() * 4294967296),
                (T[i] = (t >>> ((i & 3) << 3)) & 255)
              }
              return T
            }))
    let T
    _.exports = v
  })
  const C = d((ct, U) => {
    const P = []
    for (f = 0; f < 256; ++f) P[f] = (f + 256).toString(16).substr(1)
    let f
    function K (i, t) {
      let e = t || 0
      const s = P
      return (
        s[i[e++]] +
                s[i[e++]] +
                s[i[e++]] +
                s[i[e++]] +
                '-' +
                s[i[e++]] +
                s[i[e++]] +
                '-' +
                s[i[e++]] +
                s[i[e++]] +
                '-' +
                s[i[e++]] +
                s[i[e++]] +
                '-' +
                s[i[e++]] +
                s[i[e++]] +
                s[i[e++]] +
                s[i[e++]] +
                s[i[e++]] +
                s[i[e++]]
      )
    }
    U.exports = K
  })
  const R = d((lt, b) => {
    const Q = S()
    const X = C()
    const a = Q()
    const Z = [a[0] | 1, a[1], a[2], a[3], a[4], a[5]]
    let F = ((a[6] << 8) | a[7]) & 16383
    let D = 0
    let A = 0
    function tt (i, t, e) {
      let s = (t && e) || 0
      const n = t || []
      i = i || {}
      let r = i.clockseq !== void 0 ? i.clockseq : F
      let o = i.msecs !== void 0 ? i.msecs : new Date().getTime()
      let h = i.nsecs !== void 0 ? i.nsecs : A + 1
      const l = o - D + (h - A) / 1e4
      if (
        (l < 0 && i.clockseq === void 0 && (r = (r + 1) & 16383),
        (l < 0 || o > D) && i.nsecs === void 0 && (h = 0),
        h >= 1e4)
      ) {
        throw new Error(
          "uuid.v1(): Can't create more than 10M uuids/sec"
        )
      }
      (D = o), (A = h), (F = r), (o += 122192928e5)
      const c = ((o & 268435455) * 1e4 + h) % 4294967296;
      (n[s++] = (c >>> 24) & 255),
      (n[s++] = (c >>> 16) & 255),
      (n[s++] = (c >>> 8) & 255),
      (n[s++] = c & 255)
      const u = ((o / 4294967296) * 1e4) & 268435455;
      (n[s++] = (u >>> 8) & 255),
      (n[s++] = u & 255),
      (n[s++] = ((u >>> 24) & 15) | 16),
      (n[s++] = (u >>> 16) & 255),
      (n[s++] = (r >>> 8) | 128),
      (n[s++] = r & 255)
      for (let $ = i.node || Z, m = 0; m < 6; ++m) n[s + m] = $[m]
      return t || X(n)
    }
    b.exports = tt
  })
  const I = d((dt, G) => {
    const it = S()
    const et = C()
    function st (i, t, e) {
      const s = (t && e) || 0
      typeof i === 'string' &&
                ((t = i == 'binary' ? new Array(16) : null), (i = null)),
      (i = i || {})
      const n = i.random || (i.rng || it)()
      if (((n[6] = (n[6] & 15) | 64), (n[8] = (n[8] & 63) | 128), t)) {
        for (let r = 0; r < 16; ++r) t[s + r] = n[r]
      }
      return t || et(n)
    }
    G.exports = st
  })
  const z = d((ft, M) => {
    const nt = R()
    const L = I()
    const E = L
    E.v1 = nt
    E.v4 = L
    M.exports = E
  })
  function k (i, t = () => {}) {
    let e = !1
    return function () {
      e ? t.apply(this, arguments) : ((e = !0), i.apply(this, arguments))
    }
  }
  const q = (i) => {
    i.data('notificationComponent', ({ notification: t }) => ({
      isShown: !1,
      computedStyle: null,
      transitionDuration: null,
      transitionEasing: null,
      init: function () {
        (this.computedStyle = window.getComputedStyle(this.$el)),
        (this.transitionDuration =
                        parseFloat(this.computedStyle.transitionDuration) *
                        1e3),
        (this.transitionEasing =
                        this.computedStyle.transitionTimingFunction),
        this.configureTransitions(),
        this.configureAnimations(),
        t.duration &&
                        t.duration !== 'persistent' &&
                        setTimeout(() => {
                          if (!this.$el.matches(':hover')) {
                            this.close()
                            return
                          }
                          this.$el.addEventListener('mouseleave', () =>
                            this.close()
                          )
                        }, t.duration),
        (this.isShown = !0)
      },
      configureTransitions: function () {
        const e = this.computedStyle.display
        const s = () => {
          i.mutateDom(() => {
            this.$el.style.setProperty('display', e),
            this.$el.style.setProperty('visibility', 'visible')
          }),
          (this.$el._x_isShown = !0)
        }
        const n = () => {
          i.mutateDom(() => {
            this.$el._x_isShown
              ? this.$el.style.setProperty('visibility', 'hidden')
              : this.$el.style.setProperty('display', 'none')
          })
        }
        const r = k(
          (o) => (o ? s() : n()),
          (o) => {
            this.$el._x_toggleAndCascadeWithTransitions(
              this.$el,
              o,
              s,
              n
            )
          }
        )
        i.effect(() => r(this.isShown))
      },
      configureAnimations: function () {
        let e
        Livewire.hook(
          'commit',
          ({
            component: s,
            commit: n,
            succeed: r,
            fail: o,
            respond: h
          }) => {
            s.snapshot.data.isFilamentNotificationsComponent &&
                            requestAnimationFrame(() => {
                              const l = () =>
                                this.$el.getBoundingClientRect().top
                              const c = l()
                              h(() => {
                                (e = () => {
                                  this.isShown &&
                                            this.$el.animate(
                                              [
                                                {
                                                  transform: `translateY(${c - l()}px)`
                                                },
                                                {
                                                  transform:
                                                            'translateY(0px)'
                                                }
                                              ],
                                              {
                                                duration:
                                                        this.transitionDuration,
                                                easing: this
                                                  .transitionEasing
                                              }
                                            )
                                }),
                                this.$el
                                  .getAnimations()
                                  .forEach((u) => u.finish())
                              }),
                              r(({ snapshot: u, effect: $ }) => {
                                e()
                              })
                            })
          }
        )
      },
      close: function () {
        (this.isShown = !1),
        setTimeout(
          () =>
            window.dispatchEvent(
              new CustomEvent('notificationClosed', {
                detail: { id: t.id }
              })
            ),
          this.transitionDuration
        )
      },
      markAsRead: function () {
        window.dispatchEvent(
          new CustomEvent('markedNotificationAsRead', {
            detail: { id: t.id }
          })
        )
      },
      markAsUnread: function () {
        window.dispatchEvent(
          new CustomEvent('markedNotificationAsUnread', {
            detail: { id: t.id }
          })
        )
      }
    }))
  }
  const B = J(z(), 1)
  const p = class {
    constructor () {
      return this.id((0, B.v4)()), this
    }

    id (t) {
      return (this.id = t), this
    }

    title (t) {
      return (this.title = t), this
    }

    body (t) {
      return (this.body = t), this
    }

    actions (t) {
      return (this.actions = t), this
    }

    status (t) {
      return (this.status = t), this
    }

    color (t) {
      return (this.color = t), this
    }

    icon (t) {
      return (this.icon = t), this
    }

    iconColor (t) {
      return (this.iconColor = t), this
    }

    duration (t) {
      return (this.duration = t), this
    }

    seconds (t) {
      return this.duration(t * 1e3), this
    }

    persistent () {
      return this.duration('persistent'), this
    }

    danger () {
      return this.status('danger'), this
    }

    info () {
      return this.status('info'), this
    }

    success () {
      return this.status('success'), this
    }

    warning () {
      return this.status('warning'), this
    }

    view (t) {
      return (this.view = t), this
    }

    viewData (t) {
      return (this.viewData = t), this
    }

    send () {
      return (
        window.dispatchEvent(
          new CustomEvent('notificationSent', {
            detail: { notification: this }
          })
        ),
        this
      )
    }
  }
  const w = class {
    constructor (t) {
      return this.name(t), this
    }

    name (t) {
      return (this.name = t), this
    }

    color (t) {
      return (this.color = t), this
    }

    dispatch (t, e) {
      return this.event(t), this.eventData(e), this
    }

    dispatchSelf (t, e) {
      return this.dispatch(t, e), (this.dispatchDirection = 'self'), this
    }

    dispatchTo (t, e, s) {
      return (
        this.dispatch(e, s),
        (this.dispatchDirection = 'to'),
        (this.dispatchToComponent = t),
        this
      )
    }

    emit (t, e) {
      return this.dispatch(t, e), this
    }

    emitSelf (t, e) {
      return this.dispatchSelf(t, e), this
    }

    emitTo (t, e, s) {
      return this.dispatchTo(t, e, s), this
    }

    dispatchDirection (t) {
      return (this.dispatchDirection = t), this
    }

    dispatchToComponent (t) {
      return (this.dispatchToComponent = t), this
    }

    event (t) {
      return (this.event = t), this
    }

    eventData (t) {
      return (this.eventData = t), this
    }

    extraAttributes (t) {
      return (this.extraAttributes = t), this
    }

    icon (t) {
      return (this.icon = t), this
    }

    iconPosition (t) {
      return (this.iconPosition = t), this
    }

    outlined (t = !0) {
      return (this.isOutlined = t), this
    }

    disabled (t = !0) {
      return (this.isDisabled = t), this
    }

    label (t) {
      return (this.label = t), this
    }

    close (t = !0) {
      return (this.shouldClose = t), this
    }

    openUrlInNewTab (t = !0) {
      return (this.shouldOpenUrlInNewTab = t), this
    }

    size (t) {
      return (this.size = t), this
    }

    url (t) {
      return (this.url = t), this
    }

    view (t) {
      return (this.view = t), this
    }

    button () {
      return this.view('filament-actions::button-action'), this
    }

    grouped () {
      return this.view('filament-actions::grouped-action'), this
    }

    link () {
      return this.view('filament-actions::link-action'), this
    }
  }
  const x = class {
    constructor (t) {
      return this.actions(t), this
    }

    actions (t) {
      return (this.actions = t.map((e) => e.grouped())), this
    }

    color (t) {
      return (this.color = t), this
    }

    icon (t) {
      return (this.icon = t), this
    }

    iconPosition (t) {
      return (this.iconPosition = t), this
    }

    label (t) {
      return (this.label = t), this
    }

    tooltip (t) {
      return (this.tooltip = t), this
    }
  }
  window.FilamentNotificationAction = w
  window.FilamentNotificationActionGroup = x
  window.FilamentNotification = p
  document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(q)
  })
})()
