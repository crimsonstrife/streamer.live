(() => {
  const j = (i, e) => () => (
    e || ((e = { exports: {} }), i(e.exports, e)), e.exports
  )
  const M = j((re, R) => {
    const D = 'Expected a function'
    const k = 0 / 0
    const B = '[object Symbol]'
    const _ = /^\s+|\s+$/g
    const F = /^[-+]0x[0-9a-f]+$/i
    const U = /^0b[01]+$/i
    const H = /^0o[0-7]+$/i
    const X = parseInt
    const K =
            typeof global === 'object' &&
            global &&
            global.Object === Object &&
            global
    const N =
            typeof self === 'object' && self && self.Object === Object && self
    const q = K || N || Function('return this')()
    const $ = Object.prototype
    const G = $.toString
    const Y = Math.max
    const J = Math.min
    const w = function () {
      return q.Date.now()
    }
    function Q (i, e, t) {
      let n
      let f
      let p
      let l
      let s
      let d
      let h = 0
      let E = !1
      let u = !1
      let b = !0
      if (typeof i !== 'function') throw new TypeError(D);
      (e = x(e) || 0),
      S(t) &&
                    ((E = !!t.leading),
                    (u = 'maxWait' in t),
                    (p = u ? Y(x(t.maxWait) || 0, e) : p),
                    (b = 'trailing' in t ? !!t.trailing : b))
      function y (r) {
        const a = n
        const m = f
        return (n = f = void 0), (h = r), (l = i.apply(m, a)), l
      }
      function C (r) {
        return (h = r), (s = setTimeout(g, e)), E ? y(r) : l
      }
      function L (r) {
        const a = r - d
        const m = r - h
        const I = e - a
        return u ? J(I, p - m) : I
      }
      function T (r) {
        const a = r - d
        const m = r - h
        return d === void 0 || a >= e || a < 0 || (u && m >= p)
      }
      function g () {
        const r = w()
        if (T(r)) return P(r)
        s = setTimeout(g, L(r))
      }
      function P (r) {
        return (s = void 0), b && n ? y(r) : ((n = f = void 0), l)
      }
      function z () {
        s !== void 0 && clearTimeout(s),
        (h = 0),
        (n = d = f = s = void 0)
      }
      function A () {
        return s === void 0 ? l : P(w())
      }
      function v () {
        const r = w()
        const a = T(r)
        if (((n = arguments), (f = this), (d = r), a)) {
          if (s === void 0) return C(d)
          if (u) return (s = setTimeout(g, e)), y(d)
        }
        return s === void 0 && (s = setTimeout(g, e)), l
      }
      return (v.cancel = z), (v.flush = A), v
    }
    function S (i) {
      const e = typeof i
      return !!i && (e == 'object' || e == 'function')
    }
    function V (i) {
      return !!i && typeof i === 'object'
    }
    function Z (i) {
      return typeof i === 'symbol' || (V(i) && G.call(i) == B)
    }
    function x (i) {
      if (typeof i === 'number') return i
      if (Z(i)) return k
      if (S(i)) {
        const e = typeof i.valueOf === 'function' ? i.valueOf() : i
        i = S(e) ? e + '' : e
      }
      if (typeof i !== 'string') return i === 0 ? i : +i
      i = i.replace(_, '')
      const t = U.test(i)
      return t || H.test(i)
        ? X(i.slice(2), t ? 2 : 8)
        : F.test(i)
          ? k
          : +i
    }
    R.exports = Q
  })
  function o (i, e, t = {}) {
    i.dispatchEvent(
      new CustomEvent(e, {
        detail: t,
        bubbles: !0,
        composed: !0,
        cancelable: !0
      })
    )
  }
  const ee = M()
  const W = []
  const O = {
    onEditorFocusOut (i) {
      W.push(i)
    }
  }
  const c = { initialWidth: 0, initialX: 0 }
  document.addEventListener('alpine:init', () => {
    o(document, 'peek:initializing'),
    Alpine.data('PeekPreviewModal', (i) => ({
      config: i,
      isOpen: !1,
      withEditor: !1,
      editorHasSidebarActions: !1,
      editorIsResizable: !1,
      editorIsResizing: !1,
      canRotatePreset: !1,
      activeDevicePreset: null,
      editorTitle: null,
      modalTitle: null,
      iframeUrl: null,
      iframeContent: null,
      modalStyle: { display: 'none' },
      iframeStyle: {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%'
      },
      editorStyle: { display: 'none' },
      init () {
        o(document, 'peek:modal-initializing', { modal: this })
        const e = this.config.editorAutoRefreshDebounceTime || 500
        const t = this.config.editorSidebarMinWidth || '30rem'
        const n = this.config.editorSidebarInitialWidth || '30rem';
        (this.refreshBuilderPreview = ee(
          () => Livewire.dispatch('refreshBuilderPreview'),
          e
        )),
        (this.editorStyle.width = n),
        this.config.canResizeEditorSidebar &&
                            ((this.editorStyle.minWidth = t),
                            (this.editorIsResizable = !0)),
        this.setDevicePreset(),
        document.documentElement.getAttribute('dir') ===
                            'rtl' && (this.documentIsRtl = !0),
        setTimeout(
          () =>
            o(document, 'peek:modal-initialized', {
              modal: this
            }),
          0
        )
      },
      setIframeDimensions (e, t) {
        (this.iframeStyle.maxWidth = e),
        (this.iframeStyle.maxHeight = t),
        this.config.allowIframeOverflow &&
                            ((this.iframeStyle.width = e),
                            (this.iframeStyle.height = t))
      },
      setDevicePreset (e) {
        (e = e || this.config.initialDevicePreset),
        !!this.config.devicePresets &&
                            (!this.config.devicePresets[e] ||
                                !this.config.devicePresets[e].width ||
                                !this.config.devicePresets[e].height ||
                                (this.setIframeDimensions(
                                  this.config.devicePresets[e].width,
                                  this.config.devicePresets[e].height
                                ),
                                (this.canRotatePreset =
                                    this.config.devicePresets[e]
                                      .canRotatePreset || !1),
                                (this.activeDevicePreset = e)))
      },
      isActiveDevicePreset (e) {
        return this.activeDevicePreset === e
      },
      rotateDevicePreset () {
        const e = this.iframeStyle.maxHeight
        const t = this.iframeStyle.maxWidth
        this.setIframeDimensions(e, t)
      },
      onOpenPreviewTab (e) {
        o(document, 'peek:tab-opening', { modal: this }),
        (this.previewTabUrl = e.detail.url),
        this.previewTab && this.previewTab.closed === !1
          ? (this.previewTab.location = this.previewTabUrl)
          : (this.previewTab = window.open(
              this.previewTabUrl
            )),
        setTimeout(
          () =>
            o(document, 'peek:tab-opened', { modal: this }),
          0
        )
      },
      onOpenPreviewModal (e) {
        o(document, 'peek:modal-opening', { modal: this }),
        document.body.classList.add(
          'is-filament-peek-preview-modal-open'
        ),
        (this.withEditor = !!e.detail.withEditor),
        (this.editorHasSidebarActions =
                            !!e.detail.editorHasSidebarActions),
        (this.editorIsResizing = !1),
        (this.editorTitle = e.detail.editorTitle),
        (this.editorStyle.display = this.withEditor
          ? 'flex'
          : 'none'),
        (this.modalTitle = e.detail.modalTitle),
        (this.iframeUrl = e.detail.iframeUrl),
        (this.iframeContent = e.detail.iframeContent),
        (this.modalStyle.display = 'flex'),
        (this.isOpen = !0),
        setTimeout(
          () =>
            o(document, 'peek:modal-opened', {
              modal: this
            }),
          0
        ),
        setTimeout(() => this._focusEditorFirstInput(), 0),
        setTimeout(
          () => this._attachIframeEscapeKeyListener(),
          500
        )
      },
      _focusEditorFirstInput () {
        if (!this.withEditor) return
        const e = this.$el.querySelector(
          '.filament-peek-builder-editor input'
        )
        e && e.focus()
      },
      _attachIframeEscapeKeyListener () {
        if (this.config.shouldCloseModalWithEscapeKey) {
          try {
            const e =
                                this.$refs.previewModalBody.querySelector(
                                  'iframe'
                                )
            if (!(e && e.contentWindow)) return
            e.contentWindow.addEventListener('keyup', (t) => {
              t.key === 'Escape' && this.handleEscapeKey()
            })
          } catch (e) {}
        }
      },
      onRefreshPreviewModal (e) {
        this.config.shouldRestoreIframePositionOnRefresh &&
                        this._restoreIframeScrollPosition(),
        (this.iframeUrl = e.detail.iframeUrl),
        (this.iframeContent = e.detail.iframeContent)
      },
      _restoreIframeScrollPosition () {
        try {
          const e =
                            this.$refs.previewModalBody.querySelector('iframe')
          e &&
                            e.contentWindow &&
                            ((this._iframeScrollPosition =
                                e.contentWindow.scrollY),
                            (e.onload = () => {
                              e?.contentWindow?.scrollTo(
                                0,
                                this._iframeScrollPosition || 0
                              )
                            }))
        } catch (e) {}
      },
      onClosePreviewModal (e) {
        setTimeout(
          () => this._closeModal(),
          e?.detail?.delay ? 250 : 0
        )
      },
      _closeModal () {
        o(document, 'peek:modal-closing', { modal: this }),
        document.body.classList.remove(
          'is-filament-peek-preview-modal-open'
        ),
        (this.withEditor = !1),
        (this.editorHasSidebarActions = !1),
        (this.editorIsResizing = !1),
        (this.editorStyle.display = 'none'),
        (this.editorTitle = null),
        (this.modalStyle.display = 'none'),
        (this.modalTitle = null),
        (this.iframeUrl = null),
        (this.iframeContent = null),
        (this.isOpen = !1),
        setTimeout(
          () =>
            o(document, 'peek:modal-closed', {
              modal: this
            }),
          0
        )
      },
      onEditorFocusOut (e) {
        if (
          !!this.editorShouldAutoRefresh() &&
                        this.getAutoRefreshStrategy() !== 'reactive'
        ) {
          for (const t of W) {
            typeof t === 'function' && t(e, this)
          }
        }
      },
      editorShouldAutoRefresh () {
        if (!!this.withEditor && !!this.$refs.builderEditor) {
          return !!this.$refs.builderEditor.dataset
            .shouldAutoRefresh
        }
      },
      getAutoRefreshStrategy () {
        if (!!this.withEditor && !!this.$refs.builderEditor) {
          return (
            this.$refs.builderEditor.dataset
              .autoRefreshStrategy || 'simple'
          )
        }
      },
      handleEscapeKey () {
        !this.isOpen ||
                        !this.config.shouldCloseModalWithEscapeKey ||
                        this.withEditor ||
                        this.onClosePreviewModal()
      },
      acceptEditorChanges () {
        Livewire.dispatch('closeBuilderEditor')
      },
      discardEditorChanges () {
        this.$dispatch('close-preview-modal'),
        Livewire.dispatch('resetBuilderEditor')
      },
      closePreviewModal () {
        this.$dispatch('close-preview-modal')
      },
      onEditorResizerMouseDown (e) {
        !this.$refs.builderEditor ||
                        ((this.editorIsResizing = !0),
                        (c.initialWidth = parseFloat(
                          getComputedStyle(this.$refs.builderEditor).width
                        )),
                        (c.initialX = e.clientX))
      },
      onMouseUp (e) {
        !this.editorIsResizing || (this.editorIsResizing = !1)
      },
      onMouseMove (e) {
        !this.editorIsResizing ||
                        (this.documentIsRtl
                          ? (this.editorStyle.width =
                                  c.initialWidth -
                                  (e.clientX - c.initialX) +
                                  'px')
                          : (this.editorStyle.width =
                                  c.initialWidth +
                                  (e.clientX - c.initialX) +
                                  'px'))
      }
    })),
    o(document, 'peek:initialized')
  })
  document.addEventListener('peek:initializing', () => {
    O.onEditorFocusOut((i, e) => {
      if (
        [
          'input',
          'select',
          'textarea',
          'trix-editor',
          'hex-color-picker'
        ].includes(i.target.tagName.toLowerCase())
      ) {
        e.refreshBuilderPreview()
        return
      }
      if (
        i.target.tagName.toLowerCase() === 'button' &&
                i.target.getAttribute('role') === 'switch'
      ) {
        e.refreshBuilderPreview()
        return
      }
      if (i.target.classList.contains('ProseMirror')) {
        e.refreshBuilderPreview()
      }
    })
  })
  window.FilamentPeek = O
})()
