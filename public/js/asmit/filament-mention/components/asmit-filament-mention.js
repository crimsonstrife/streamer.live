Array.prototype.find ||
    (Array.prototype.find = function (p) {
      if (this === null) {
        throw new TypeError(
          'Array.prototype.find called on null or undefined'
        )
      }
      if (typeof p !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      for (
        var e = Object(this),
          t = e.length >>> 0,
          i = arguments[1],
          n,
          r = 0;
        r < t;
        r++
      ) {
        if (((n = e[r]), p.call(i, n, r, e))) return n
      }
    })
if (window && typeof window.CustomEvent !== 'function') {
  const p = function (e, t) {
    t = t || { bubbles: !1, cancelable: !1, detail: void 0 }
    const i = document.createEvent('CustomEvent')
    return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
  }
  typeof window.Event < 'u' && (p.prototype = window.Event.prototype),
  (window.CustomEvent = p)
}
const O = class p {
  constructor (e) {
    (this.tribute = e), (this.tribute.events = this)
  }

  static keys () {
    return [
      { key: 9, value: 'TAB' },
      { key: 8, value: 'DELETE' },
      { key: 13, value: 'ENTER' },
      { key: 27, value: 'ESCAPE' },
      { key: 32, value: 'SPACE' },
      { key: 38, value: 'UP' },
      { key: 40, value: 'DOWN' }
    ]
  }

  bind (e) {
    (e.boundKeydown = this.keydown.bind(e, this)),
    (e.boundKeyup = this.keyup.bind(e, this)),
    (e.boundInput = this.input.bind(e, this)),
    e.addEventListener('keydown', e.boundKeydown, !1),
    e.addEventListener('keyup', e.boundKeyup, !1),
    e.addEventListener('input', e.boundInput, !1)
  }

  unbind (e) {
    e.removeEventListener('keydown', e.boundKeydown, !1),
    e.removeEventListener('keyup', e.boundKeyup, !1),
    e.removeEventListener('input', e.boundInput, !1),
    delete e.boundKeydown,
    delete e.boundKeyup,
    delete e.boundInput
  }

  keydown (e, t) {
    e.shouldDeactivate(t) &&
            ((e.tribute.isActive = !1), e.tribute.hideMenu())
    const i = this;
    (e.commandEvent = !1),
    p.keys().forEach((n) => {
      n.key === t.keyCode &&
                    ((e.commandEvent = !0),
                    e.callbacks()[n.value.toLowerCase()](t, i))
    })
  }

  input (e, t) {
    (e.inputEvent = !0), e.keyup.call(this, e, t)
  }

  click (e, t) {
    const i = e.tribute
    if (i.menu && i.menu.contains(t.target)) {
      let n = t.target
      for (
        t.preventDefault(), t.stopPropagation();
        n.nodeName.toLowerCase() !== 'li';

      ) {
        if (((n = n.parentNode), !n || n === i.menu)) {
          throw new Error(
            'cannot find the <li> container for the click'
          )
        }
      }
      i.selectItemAtIndex(n.getAttribute('data-index'), t), i.hideMenu()
    } else {
      i.current.element &&
                !i.current.externalTrigger &&
                ((i.current.externalTrigger = !1),
                setTimeout(() => i.hideMenu()))
    }
  }

  keyup (e, t) {
    if (
      (e.inputEvent && (e.inputEvent = !1),
      e.updateSelection(this),
      t.keyCode !== 27)
    ) {
      if (!e.tribute.allowSpaces && e.tribute.hasTrailingSpace) {
        (e.tribute.hasTrailingSpace = !1),
        (e.commandEvent = !0),
        e.callbacks().space(t, this)
        return
      }
      if (!e.tribute.isActive) {
        if (e.tribute.autocompleteMode) {
          e.callbacks().triggerChar(t, this, '')
        } else {
          const i = e.getKeyCode(e, this, t)
          if (isNaN(i) || !i) return
          const n = e.tribute
            .triggers()
            .find((r) => r.charCodeAt(0) === i)
          typeof n < 'u' && e.callbacks().triggerChar(t, this, n)
        }
      }
      e.tribute.current.mentionText.length <
                e.tribute.current.collection.menuShowMinLength ||
                ((((e.tribute.current.trigger || e.tribute.autocompleteMode) &&
                    e.commandEvent === !1) ||
                    (e.tribute.isActive && t.keyCode === 8)) &&
                    e.tribute.showMenuFor(this, !0))
    }
  }

  shouldDeactivate (e) {
    if (!this.tribute.isActive) return !1
    if (this.tribute.current.mentionText.length === 0) {
      let t = !1
      return (
        p.keys().forEach((i) => {
          e.keyCode === i.key && (t = !0)
        }),
        !t
      )
    }
    return !1
  }

  getKeyCode (e, t, i) {
    const n = e.tribute
    const r = n.range.getTriggerInfo(
      !1,
      n.hasTrailingSpace,
      !0,
      n.allowSpaces,
      n.autocompleteMode
    )
    return r ? r.mentionTriggerChar.charCodeAt(0) : !1
  }

  updateSelection (e) {
    this.tribute.current.element = e
    const t = this.tribute.range.getTriggerInfo(
      !1,
      this.tribute.hasTrailingSpace,
      !0,
      this.tribute.allowSpaces,
      this.tribute.autocompleteMode
    )
    t &&
            ((this.tribute.current.selectedPath = t.mentionSelectedPath),
            (this.tribute.current.mentionText = t.mentionText),
            (this.tribute.current.selectedOffset = t.mentionSelectedOffset))
  }

  callbacks () {
    return {
      triggerChar: (e, t, i) => {
        const n = this.tribute
        n.current.trigger = i
        const r = n.collection.find((o) => o.trigger === i);
        (n.current.collection = r),
        n.current.mentionText.length >=
                        n.current.collection.menuShowMinLength &&
                        n.inputEvent &&
                        n.showMenuFor(t, !0)
      },
      enter: (e, t) => {
        this.tribute.isActive &&
                    this.tribute.current.filteredItems &&
                    (e.preventDefault(),
                    e.stopPropagation(),
                    setTimeout(() => {
                      this.tribute.selectItemAtIndex(
                        this.tribute.menuSelected,
                        e
                      ),
                      this.tribute.hideMenu()
                    }, 0))
      },
      escape: (e, t) => {
        this.tribute.isActive &&
                    (e.preventDefault(),
                    e.stopPropagation(),
                    (this.tribute.isActive = !1),
                    this.tribute.hideMenu())
      },
      tab: (e, t) => {
        this.callbacks().enter(e, t)
      },
      space: (e, t) => {
        this.tribute.isActive &&
                    (this.tribute.spaceSelectsMatch
                      ? this.callbacks().enter(e, t)
                      : this.tribute.allowSpaces ||
                          (e.stopPropagation(),
                          setTimeout(() => {
                            this.tribute.hideMenu(),
                            (this.tribute.isActive = !1)
                          }, 0)))
      },
      up: (e, t) => {
        if (
          this.tribute.isActive &&
                    this.tribute.current.filteredItems
        ) {
          e.preventDefault(), e.stopPropagation()
          const i = this.tribute.current.filteredItems.length
          const n = this.tribute.menuSelected
          i > n && n > 0
            ? (this.tribute.menuSelected--, this.setActiveLi())
            : n === 0 &&
                          ((this.tribute.menuSelected = i - 1),
                          this.setActiveLi(),
                          (this.tribute.menu.scrollTop =
                              this.tribute.menu.scrollHeight))
        }
      },
      down: (e, t) => {
        if (
          this.tribute.isActive &&
                    this.tribute.current.filteredItems
        ) {
          e.preventDefault(), e.stopPropagation()
          const i = this.tribute.current.filteredItems.length - 1
          const n = this.tribute.menuSelected
          i > n
            ? (this.tribute.menuSelected++, this.setActiveLi())
            : i === n &&
                          ((this.tribute.menuSelected = 0),
                          this.setActiveLi(),
                          (this.tribute.menu.scrollTop = 0))
        }
      },
      delete: (e, t) => {
        this.tribute.isActive &&
                this.tribute.current.mentionText.length < 1
          ? this.tribute.hideMenu()
          : this.tribute.isActive && this.tribute.showMenuFor(t)
      }
    }
  }

  setActiveLi (e) {
    const t = this.tribute.menu.querySelectorAll('li')
    const i = t.length >>> 0
    e && (this.tribute.menuSelected = parseInt(e))
    for (let n = 0; n < i; n++) {
      const r = t[n]
      if (n === this.tribute.menuSelected) {
        r.classList.add(this.tribute.current.collection.selectClass)
        const o = r.getBoundingClientRect()
        const l = this.tribute.menu.getBoundingClientRect()
        if (o.bottom > l.bottom) {
          const s = o.bottom - l.bottom
          this.tribute.menu.scrollTop += s
        } else if (o.top < l.top) {
          const s = l.top - o.top
          this.tribute.menu.scrollTop -= s
        }
      } else {
        r.classList.remove(this.tribute.current.collection.selectClass)
      }
    }
  }

  getFullHeight (e, t) {
    const i = e.getBoundingClientRect().height
    if (t) {
      const n = e.currentStyle || window.getComputedStyle(e)
      return i + parseFloat(n.marginTop) + parseFloat(n.marginBottom)
    }
    return i
  }
}
const $ = class {
  constructor (e) {
    (this.tribute = e),
    (this.tribute.menuEvents = this),
    (this.menu = this.tribute.menu)
  }

  bind (e) {
    (this.menuClickEvent = this.tribute.events.click.bind(null, this)),
    (this.menuContainerScrollEvent = this.debounce(
      () => {
        this.tribute.isActive &&
                        this.tribute.showMenuFor(
                          this.tribute.current.element,
                          !1
                        )
      },
      300,
      !1
    )),
    (this.windowResizeEvent = this.debounce(
      () => {
        this.tribute.isActive &&
                        this.tribute.range.positionMenuAtCaret(!0)
      },
      300,
      !1
    )),
    this.tribute.range
      .getDocument()
      .addEventListener('MSPointerDown', this.menuClickEvent, !1),
    this.tribute.range
      .getDocument()
      .addEventListener('mousedown', this.menuClickEvent, !1),
    window.addEventListener('resize', this.windowResizeEvent),
    this.menuContainer
      ? this.menuContainer.addEventListener(
        'scroll',
        this.menuContainerScrollEvent,
        !1
      )
      : window.addEventListener(
        'scroll',
        this.menuContainerScrollEvent
      )
  }

  unbind (e) {
    this.tribute.range
      .getDocument()
      .removeEventListener('mousedown', this.menuClickEvent, !1),
    this.tribute.range
      .getDocument()
      .removeEventListener('MSPointerDown', this.menuClickEvent, !1),
    window.removeEventListener('resize', this.windowResizeEvent),
    this.menuContainer
      ? this.menuContainer.removeEventListener(
        'scroll',
        this.menuContainerScrollEvent,
        !1
      )
      : window.removeEventListener(
        'scroll',
        this.menuContainerScrollEvent
      )
  }

  debounce (e, t, i) {
    let n
    return () => {
      const r = this
      const o = arguments
      const l = () => {
        (n = null), i || e.apply(r, o)
      }
      const s = i && !n
      clearTimeout(n), (n = setTimeout(l, t)), s && e.apply(r, o)
    }
  }
}
const R = class {
  constructor (e) {
    (this.tribute = e), (this.tribute.range = this)
  }

  getDocument () {
    let e
    return (
      this.tribute.current.collection &&
                (e = this.tribute.current.collection.iframe),
      e ? e.contentWindow.document : document
    )
  }

  positionMenuAtCaret (e) {
    const t = this.tribute.current
    let i
    const n = this.getTriggerInfo(
      !1,
      this.tribute.hasTrailingSpace,
      !0,
      this.tribute.allowSpaces,
      this.tribute.autocompleteMode
    )
    if (typeof n < 'u') {
      if (!this.tribute.positionMenu) {
        this.tribute.menu.style.cssText = 'display: block;'
        return
      }
      this.isContentEditable(t.element)
        ? (i = this.getContentEditableCaretPosition(n.mentionPosition))
        : (i = this.getTextAreaOrInputUnderlinePosition(
            this.tribute.current.element,
            n.mentionPosition
          )),
      (this.tribute.menu.style.cssText = `top: ${i.top}px;
                                     left: ${i.left}px;
                                     right: ${i.right}px;
                                     bottom: ${i.bottom}px;
                                     position: absolute;
                                     display: block;`),
      i.left === 'auto' && (this.tribute.menu.style.left = 'auto'),
      i.top === 'auto' && (this.tribute.menu.style.top = 'auto'),
      e && this.scrollIntoView(),
      window.setTimeout(() => {
        const r = {
          width: this.tribute.menu.offsetWidth,
          height: this.tribute.menu.offsetHeight
        }
        const o = this.isMenuOffScreen(i, r)
        const l =
                        window.innerWidth > r.width && (o.left || o.right)
        const s =
                        window.innerHeight > r.height && (o.top || o.bottom);
        (l || s) &&
                        ((this.tribute.menu.style.cssText = 'display: none'),
                        this.positionMenuAtCaret(e))
      }, 0)
    } else this.tribute.menu.style.cssText = 'display: none'
  }

  get menuContainerIsBody () {
    return (
      this.tribute.menuContainer === document.body ||
            !this.tribute.menuContainer
    )
  }

  selectElement (e, t, i) {
    let n
    let r = e
    if (t) {
      for (let o = 0; o < t.length; o++) {
        if (((r = r.childNodes[t[o]]), r === void 0)) return
        for (; r.length < i;) (i -= r.length), (r = r.nextSibling)
        r.childNodes.length === 0 &&
                    !r.length &&
                    (r = r.previousSibling)
      }
    }
    const l = this.getWindowSelection();
    (n = this.getDocument().createRange()),
    n.setStart(r, i),
    n.setEnd(r, i),
    n.collapse(!0)
    try {
      l.removeAllRanges()
    } catch {}
    l.addRange(n), e.focus()
  }

  replaceTriggerText (e, t, i, n, r) {
    const o = this.getTriggerInfo(
      !0,
      i,
      t,
      this.tribute.allowSpaces,
      this.tribute.autocompleteMode
    )
    if (o !== void 0) {
      const l = this.tribute.current
      const s = new CustomEvent('tribute-replaced', {
        detail: { item: r, instance: l, context: o, event: n }
      })
      if (this.isContentEditable(l.element)) {
        const a =
                    typeof this.tribute.replaceTextSuffix === 'string'
                      ? this.tribute.replaceTextSuffix
                      : '\xA0'
        e += a
        let u = o.mentionPosition + o.mentionText.length
        this.tribute.autocompleteMode ||
                    (u += o.mentionTriggerChar.length),
        this.pasteHtml(e, o.mentionPosition, u)
      } else {
        const a = this.tribute.current.element
        const u =
                    typeof this.tribute.replaceTextSuffix === 'string'
                      ? this.tribute.replaceTextSuffix
                      : ' '
        e += u
        const d = o.mentionPosition
        let h = o.mentionPosition + o.mentionText.length + u.length
        this.tribute.autocompleteMode ||
                    (h += o.mentionTriggerChar.length - 1),
        (a.value =
                        a.value.substring(0, d) +
                        e +
                        a.value.substring(h, a.value.length)),
        (a.selectionStart = d + e.length),
        (a.selectionEnd = d + e.length)
      }
      l.element.dispatchEvent(new CustomEvent('input', { bubbles: !0 })),
      l.element.dispatchEvent(s)
    }
  }

  pasteHtml (e, t, i) {
    let n, r;
    (r = this.getWindowSelection()),
    (n = this.getDocument().createRange()),
    n.setStart(r.anchorNode, t),
    n.setEnd(r.anchorNode, i),
    n.deleteContents()
    const o = this.getDocument().createElement('div')
    o.innerHTML = e
    const l = this.getDocument().createDocumentFragment()
    let s
    let a
    for (; (s = o.firstChild);) a = l.appendChild(s)
    n.insertNode(l),
    a &&
                ((n = n.cloneRange()),
                n.setStartAfter(a),
                n.collapse(!0),
                r.removeAllRanges(),
                r.addRange(n))
  }

  getWindowSelection () {
    return this.tribute.collection.iframe
      ? this.tribute.collection.iframe.contentWindow.getSelection()
      : window.getSelection()
  }

  getNodePositionInParent (e) {
    if (e.parentNode === null) return 0
    for (let t = 0; t < e.parentNode.childNodes.length; t++) {
      if (e.parentNode.childNodes[t] === e) return t
    }
  }

  getContentEditableSelectedPath (e) {
    const t = this.getWindowSelection()
    let i = t.anchorNode
    const n = []
    let r
    if (i != null) {
      let o
      let l = i.contentEditable
      for (; i !== null && l !== 'true';) {
        (o = this.getNodePositionInParent(i)),
        n.push(o),
        (i = i.parentNode),
        i !== null && (l = i.contentEditable)
      }
      return (
        n.reverse(),
        (r = t.getRangeAt(0).startOffset),
        { selected: i, path: n, offset: r }
      )
    }
  }

  getTextPrecedingCurrentSelection () {
    const e = this.tribute.current
    let t = ''
    if (this.isContentEditable(e.element)) {
      const i = this.getWindowSelection().anchorNode
      if (i != null) {
        const n = i.textContent
        const r = this.getWindowSelection().getRangeAt(0).startOffset
        n && r >= 0 && (t = n.substring(0, r))
      }
    } else {
      const i = this.tribute.current.element
      if (i) {
        const n = i.selectionStart
        i.value && n >= 0 && (t = i.value.substring(0, n))
      }
    }
    return t
  }

  getLastWordInText (e) {
    e = e.replace(/\u00A0/g, ' ')
    const t = e.split(/\s+/)
    const i = t.length - 1
    return t[i].trim()
  }

  getTriggerInfo (e, t, i, n, r) {
    const o = this.tribute.current
    let l
    let s
    let a
    if (!this.isContentEditable(o.element)) {
      l = this.tribute.current.element
    } else {
      const h = this.getContentEditableSelectedPath(o)
      h && ((l = h.selected), (s = h.path), (a = h.offset))
    }
    const u = this.getTextPrecedingCurrentSelection()
    const d = this.getLastWordInText(u)
    if (r) {
      return {
        mentionPosition: u.length - d.length,
        mentionText: d,
        mentionSelectedElement: l,
        mentionSelectedPath: s,
        mentionSelectedOffset: a
      }
    }
    if (u != null) {
      let h = -1
      let m
      if (
        (this.tribute.collection.forEach((f) => {
          const w = f.trigger
          const b = f.requireLeadingSpace
            ? this.lastIndexWithLeadingSpace(u, w)
            : u.lastIndexOf(w)
          b > h && ((h = b), (m = w), (i = f.requireLeadingSpace))
        }),
        h >= 0 &&
                    (h === 0 || !i || /[\xA0\s]/g.test(u.substring(h - 1, h))))
      ) {
        let f = u.substring(h + m.length, u.length)
        m = u.substring(h, h + m.length)
        const w = f.substring(0, 1)
        const b = f.length > 0 && (w === ' ' || w === '\xA0')
        t && (f = f.trim())
        const E = n ? /[^\S ]/g : /[\xA0\s]/g
        if (
          ((this.tribute.hasTrailingSpace = E.test(f)),
          !b && (e || !E.test(f)))
        ) {
          return {
            mentionPosition: h,
            mentionText: f,
            mentionSelectedElement: l,
            mentionSelectedPath: s,
            mentionSelectedOffset: a,
            mentionTriggerChar: m
          }
        }
      }
    }
  }

  lastIndexWithLeadingSpace (e, t) {
    const i = e.split('').reverse().join('')
    let n = -1
    for (let r = 0, o = e.length; r < o; r++) {
      const l = r === e.length - 1
      const s = /\s/.test(i[r + 1])
      let a = !0
      for (let u = t.length - 1; u >= 0; u--) {
        if (t[u] !== i[r - u]) {
          a = !1
          break
        }
      }
      if (a && (l || s)) {
        n = e.length - 1 - r
        break
      }
    }
    return n
  }

  isContentEditable (e) {
    return e.nodeName !== 'INPUT' && e.nodeName !== 'TEXTAREA'
  }

  isMenuOffScreen (e, t) {
    const i = window.innerWidth
    const n = window.innerHeight
    const r = document.documentElement
    const o = (window.pageXOffset || r.scrollLeft) - (r.clientLeft || 0)
    const l = (window.pageYOffset || r.scrollTop) - (r.clientTop || 0)
    const s =
            typeof e.top === 'number' ? e.top : l + n - e.bottom - t.height
    const a = typeof e.right === 'number' ? e.right : e.left + t.width
    const u = typeof e.bottom === 'number' ? e.bottom : e.top + t.height
    const d =
            typeof e.left === 'number' ? e.left : o + i - e.right - t.width
    return {
      top: s < Math.floor(l),
      right: a > Math.ceil(o + i),
      bottom: u > Math.ceil(l + n),
      left: d < Math.floor(o)
    }
  }

  getMenuDimensions () {
    const e = { width: null, height: null }
    return (
      (this.tribute.menu.style.cssText = `top: 0px;
                                 left: 0px;
                                 position: fixed;
                                 display: block;
                                 visibility; hidden;`),
      (e.width = this.tribute.menu.offsetWidth),
      (e.height = this.tribute.menu.offsetHeight),
      (this.tribute.menu.style.cssText = 'display: none;'),
      e
    )
  }

  getTextAreaOrInputUnderlinePosition (e, t, i) {
    const n = [
      'direction',
      'boxSizing',
      'width',
      'height',
      'overflowX',
      'overflowY',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'fontSize',
      'fontSizeAdjust',
      'lineHeight',
      'fontFamily',
      'textAlign',
      'textTransform',
      'textIndent',
      'textDecoration',
      'letterSpacing',
      'wordSpacing'
    ]
    const r = window.mozInnerScreenX !== null
    const o = this.getDocument().createElement('div');
    (o.id = 'input-textarea-caret-position-mirror-div'),
    this.getDocument().body.appendChild(o)
    const l = o.style
    const s = window.getComputedStyle
      ? getComputedStyle(e)
      : e.currentStyle;
    (l.whiteSpace = 'pre-wrap'),
    e.nodeName !== 'INPUT' && (l.wordWrap = 'break-word'),
    (l.position = 'absolute'),
    (l.visibility = 'hidden'),
    n.forEach((L) => {
      l[L] = s[L]
    }),
    r
      ? ((l.width = `${parseInt(s.width) - 2}px`),
        e.scrollHeight > parseInt(s.height) &&
                      (l.overflowY = 'scroll'))
      : (l.overflow = 'hidden'),
    (o.textContent = e.value.substring(0, t)),
    e.nodeName === 'INPUT' &&
                (o.textContent = o.textContent.replace(/\s/g, '\xA0'))
    const a = this.getDocument().createElement('span');
    (a.textContent = e.value.substring(t) || '.'), o.appendChild(a)
    const u = e.getBoundingClientRect()
    const d = document.documentElement
    const h = (window.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
    const m = (window.pageYOffset || d.scrollTop) - (d.clientTop || 0)
    let f = 0
    let w = 0
    this.menuContainerIsBody && ((f = u.top), (w = u.left))
    const b = {
      top:
                f +
                m +
                a.offsetTop +
                parseInt(s.borderTopWidth) +
                parseInt(s.fontSize) -
                e.scrollTop,
      left: w + h + a.offsetLeft + parseInt(s.borderLeftWidth)
    }
    const E = window.innerWidth
    const x = window.innerHeight
    const A = this.getMenuDimensions()
    let M = this.isMenuOffScreen(b, A)
    M.right && ((b.right = E - b.left), (b.left = 'auto'))
    const N = this.tribute.menuContainer
      ? this.tribute.menuContainer.offsetHeight
      : this.getDocument().body.offsetHeight
    if (M.bottom) {
      const L = this.tribute.menuContainer
        ? this.tribute.menuContainer.getBoundingClientRect()
        : this.getDocument().body.getBoundingClientRect()
      const c = N - (x - L.top);
      (b.bottom = c + (x - u.top - a.offsetTop)), (b.top = 'auto')
    }
    return (
      (M = this.isMenuOffScreen(b, A)),
      M.left &&
                ((b.left = E > A.width ? h + E - A.width : h), delete b.right),
      M.top &&
                ((b.top = x > A.height ? m + x - A.height : m),
                delete b.bottom),
      this.getDocument().body.removeChild(o),
      b
    )
  }

  getContentEditableCaretPosition (e) {
    let t
    const i = this.getWindowSelection();
    (t = this.getDocument().createRange()),
    t.setStart(i.anchorNode, e),
    t.setEnd(i.anchorNode, e),
    t.collapse(!1)
    const n = t.getBoundingClientRect()
    const r = document.documentElement
    const o = (window.pageXOffset || r.scrollLeft) - (r.clientLeft || 0)
    const l = (window.pageYOffset || r.scrollTop) - (r.clientTop || 0)
    const s = n.left
    const a = n.top
    const u = { left: s + o, top: a + n.height + l }
    const d = window.innerWidth
    const h = window.innerHeight
    const m = this.getMenuDimensions()
    let f = this.isMenuOffScreen(u, m)
    f.right && ((u.left = 'auto'), (u.right = d - n.left - o))
    const w = this.tribute.menuContainer
      ? this.tribute.menuContainer.offsetHeight
      : this.getDocument().body.offsetHeight
    if (f.bottom) {
      const b = this.tribute.menuContainer
        ? this.tribute.menuContainer.getBoundingClientRect()
        : this.getDocument().body.getBoundingClientRect()
      const E = w - (h - b.top);
      (u.top = 'auto'), (u.bottom = E + (h - n.top))
    }
    return (
      (f = this.isMenuOffScreen(u, m)),
      f.left &&
                ((u.left = d > m.width ? o + d - m.width : o), delete u.right),
      f.top &&
                ((u.top = h > m.height ? l + h - m.height : l),
                delete u.bottom),
      this.menuContainerIsBody ||
                ((u.left = u.left
                  ? u.left - this.tribute.menuContainer.offsetLeft
                  : u.left),
                (u.top = u.top
                  ? u.top - this.tribute.menuContainer.offsetTop
                  : u.top)),
      u
    )
  }

  scrollIntoView (e) {
    const t = 20
    let i
    const n = 100
    let r = this.menu
    if (typeof r > 'u') return
    for (; i === void 0 || i.height === 0;) {
      if (
        ((i = r.getBoundingClientRect()),
        i.height === 0 &&
                    ((r = r.childNodes[0]),
                    r === void 0 || !r.getBoundingClientRect))
      ) {
        return
      }
    }
    const o = i.top
    const l = o + i.height
    if (o < 0) window.scrollTo(0, window.pageYOffset + i.top - t)
    else if (l > window.innerHeight) {
      let s = window.pageYOffset + i.top - t
      s - window.pageYOffset > n && (s = window.pageYOffset + n)
      let a = window.pageYOffset - (window.innerHeight - l)
      a > s && (a = s), window.scrollTo(0, a)
    }
  }
}
const H = class {
  constructor (e) {
    (this.tribute = e), (this.tribute.search = this)
  }

  simpleFilter (e, t) {
    return t.filter((i) => this.test(e, i))
  }

  test (e, t) {
    return this.match(e, t) !== null
  }

  match (e, t, i) {
    i = i || {}
    const n = t.length
    const r = i.pre || ''
    const o = i.post || ''
    const l = (i.caseSensitive && t) || t.toLowerCase()
    if (i.skip) return { rendered: t, score: 0 }
    e = (i.caseSensitive && e) || e.toLowerCase()
    const s = this.traverse(l, e, 0, 0, [])
    return s
      ? { rendered: this.render(t, s.cache, r, o), score: s.score }
      : null
  }

  traverse (e, t, i, n, r) {
    if (t.length === n) {
      return { score: this.calculateScore(r), cache: r.slice() }
    }
    if (e.length === i || t.length - n > e.length - i) return
    const o = t[n]
    let l = e.indexOf(o, i)
    let s
    let a
    for (; l > -1;) {
      if (
        (r.push(l),
        (a = this.traverse(e, t, l + 1, n + 1, r)),
        r.pop(),
        !a)
      ) {
        return s
      }
      (!s || s.score < a.score) && (s = a), (l = e.indexOf(o, l + 1))
    }
    return s
  }

  calculateScore (e) {
    let t = 0
    let i = 1
    return (
      e.forEach((n, r) => {
        r > 0 && (e[r - 1] + 1 === n ? (i += i + 1) : (i = 1)),
        (t += i)
      }),
      t
    )
  }

  render (e, t, i, n) {
    let r = e.substring(0, t[0])
    return (
      t.forEach((o, l) => {
        r +=
                    i +
                    e[o] +
                    n +
                    e.substring(o + 1, t[l + 1] ? t[l + 1] : e.length)
      }),
      r
    )
  }

  filter (e, t, i) {
    return (
      (i = i || {}),
      t
        .reduce((n, r, o, l) => {
          let s = r
          i.extract && ((s = i.extract(r)), s || (s = ''))
          const a = this.match(e, s, i)
          return (
            a != null &&
                            (n[n.length] = {
                              string: a.rendered,
                              score: a.score,
                              index: o,
                              original: r
                            }),
            n
          )
        }, [])
        .sort((n, r) => {
          const o = r.score - n.score
          return o || n.index - r.index
        })
    )
  }
}
const W = class p {
  constructor ({
    values: e = null,
    iframe: t = null,
    selectClass: i = 'highlight',
    containerClass: n = 'tribute-container',
    itemClass: r = '',
    trigger: o = '@',
    autocompleteMode: l = !1,
    selectTemplate: s = null,
    menuItemTemplate: a = null,
    lookup: u = 'key',
    fillAttr: d = 'value',
    collection: h = null,
    menuContainer: m = null,
    noMatchTemplate: f = null,
    requireLeadingSpace: w = !0,
    allowSpaces: b = !1,
    replaceTextSuffix: E = null,
    positionMenu: x = !0,
    spaceSelectsMatch: A = !1,
    searchOpts: M = {},
    menuItemLimit: N = null,
    menuShowMinLength: L = 0
  }) {
    if (
      ((this.autocompleteMode = l),
      (this.menuSelected = 0),
      (this.current = {}),
      (this.inputEvent = !1),
      (this.isActive = !1),
      (this.menuContainer = m),
      (this.allowSpaces = b),
      (this.replaceTextSuffix = E),
      (this.positionMenu = x),
      (this.hasTrailingSpace = !1),
      (this.spaceSelectsMatch = A),
      this.autocompleteMode && ((o = ''), (b = !1)),
      e)
    ) {
      this.collection = [
        {
          trigger: o,
          iframe: t,
          selectClass: i,
          containerClass: n,
          itemClass: r,
          selectTemplate: (s || p.defaultSelectTemplate).bind(this),
          menuItemTemplate: (a || p.defaultMenuItemTemplate).bind(
            this
          ),
          noMatchTemplate: ((c) =>
            typeof c === 'string'
              ? c.trim() === ''
                ? null
                : c
              : typeof c === 'function'
                ? c.bind(this)
                : f ||
                                function () {
                                  return '<li>No Match Found!</li>'
                                })(f),
          lookup: u,
          fillAttr: d,
          values: e,
          requireLeadingSpace: w,
          searchOpts: M,
          menuItemLimit: N,
          menuShowMinLength: L
        }
      ]
    } else if (h) {
      this.autocompleteMode &&
                console.warn(
                  'Tribute in autocomplete mode does not work for collections'
                ),
      (this.collection = h.map((c) => ({
        trigger: c.trigger || o,
        iframe: c.iframe || t,
        selectClass: c.selectClass || i,
        containerClass: c.containerClass || n,
        itemClass: c.itemClass || r,
        selectTemplate: (
          c.selectTemplate || p.defaultSelectTemplate
        ).bind(this),
        menuItemTemplate: (
          c.menuItemTemplate || p.defaultMenuItemTemplate
        ).bind(this),
        noMatchTemplate: ((g) =>
          typeof g === 'string'
            ? g.trim() === ''
              ? null
              : g
            : typeof g === 'function'
              ? g.bind(this)
              : f ||
                                function () {
                                  return '<li>No Match Found!</li>'
                                })(f),
        lookup: c.lookup || u,
        fillAttr: c.fillAttr || d,
        values: c.values,
        requireLeadingSpace: c.requireLeadingSpace,
        searchOpts: c.searchOpts || M,
        menuItemLimit: c.menuItemLimit || N,
        menuShowMinLength: c.menuShowMinLength || L
      })))
    } else throw new Error('[Tribute] No collection specified.')
    new R(this), new O(this), new $(this), new H(this)
  }

  get isActive () {
    return this._isActive
  }

  set isActive (e) {
    if (
      this._isActive != e &&
            ((this._isActive = e), this.current.element)
    ) {
      const t = new CustomEvent(`tribute-active-${e}`)
      this.current.element.dispatchEvent(t)
    }
  }

  static defaultSelectTemplate (e) {
    return typeof e > 'u'
      ? `${this.current.collection.trigger}${this.current.mentionText}`
      : this.range.isContentEditable(this.current.element)
        ? '<span class="tribute-mention">' +
                (this.current.collection.trigger +
                    e.original[this.current.collection.fillAttr]) +
                '</span>'
        : this.current.collection.trigger +
                e.original[this.current.collection.fillAttr]
  }

  static defaultMenuItemTemplate (e) {
    return e.string
  }

  static inputTypes () {
    return ['TEXTAREA', 'INPUT']
  }

  triggers () {
    return this.collection.map((e) => e.trigger)
  }

  attach (e) {
    if (!e) {
      throw new Error('[Tribute] Must pass in a DOM node or NodeList.')
    }
    if (
      (typeof jQuery < 'u' && e instanceof jQuery && (e = e.get()),
      e.constructor === NodeList ||
                e.constructor === HTMLCollection ||
                e.constructor === Array)
    ) {
      const i = e.length
      for (let t = 0; t < i; ++t) this._attach(e[t])
    } else this._attach(e)
  }

  _attach (e) {
    e.hasAttribute('data-tribute') &&
            console.warn('Tribute was already bound to ' + e.nodeName),
    this.ensureEditable(e),
    this.events.bind(e),
    e.setAttribute('data-tribute', !0)
  }

  ensureEditable (e) {
    if (p.inputTypes().indexOf(e.nodeName) === -1) {
      if (e.contentEditable) e.contentEditable = !0
      else throw new Error('[Tribute] Cannot bind to ' + e.nodeName)
    }
  }

  createMenu (e) {
    const t = this.range.getDocument().createElement('div')
    const i = this.range.getDocument().createElement('ul')
    return (
      (t.className = e),
      t.appendChild(i),
      this.menuContainer
        ? this.menuContainer.appendChild(t)
        : this.range.getDocument().body.appendChild(t)
    )
  }

  showMenuFor (e, t) {
    if (
      this.isActive &&
            this.current.element === e &&
            this.current.mentionText === this.currentMentionTextSnapshot
    ) {
      return
    }
    (this.currentMentionTextSnapshot = this.current.mentionText),
    this.menu ||
                ((this.menu = this.createMenu(
                  this.current.collection.containerClass
                )),
                (e.tributeMenu = this.menu),
                this.menuEvents.bind(this.menu)),
    (this.isActive = !0),
    (this.menuSelected = 0),
    this.current.mentionText || (this.current.mentionText = '')
    const i = (n) => {
      if (!this.isActive) return
      let r = this.search.filter(this.current.mentionText, n, {
        pre: this.current.collection.searchOpts.pre || '<span>',
        post: this.current.collection.searchOpts.post || '</span>',
        skip: this.current.collection.searchOpts.skip,
        extract: (s) => {
          if (typeof this.current.collection.lookup === 'string') {
            return s[this.current.collection.lookup]
          }
          if (typeof this.current.collection.lookup === 'function') {
            return this.current.collection.lookup(
              s,
              this.current.mentionText
            )
          }
          throw new Error(
            'Invalid lookup attribute, lookup must be string or function.'
          )
        }
      })
      this.current.collection.menuItemLimit &&
                (r = r.slice(0, this.current.collection.menuItemLimit)),
      (this.current.filteredItems = r)
      const o = this.menu.querySelector('ul')
      if ((this.range.positionMenuAtCaret(t), !r.length)) {
        const s = new CustomEvent('tribute-no-match', {
          detail: this.menu
        })
        this.current.element.dispatchEvent(s),
        (typeof this.current.collection.noMatchTemplate ===
                        'function' &&
                        !this.current.collection.noMatchTemplate()) ||
                    !this.current.collection.noMatchTemplate
          ? this.hideMenu()
          : typeof this.current.collection.noMatchTemplate ===
                            'function'
            ? (o.innerHTML =
                                this.current.collection.noMatchTemplate())
            : (o.innerHTML =
                                this.current.collection.noMatchTemplate)
        return
      }
      o.innerHTML = ''
      const l = this.range.getDocument().createDocumentFragment()
      r.forEach((s, a) => {
        const u = this.range.getDocument().createElement('li')
        u.setAttribute('data-index', a),
        (u.className = this.current.collection.itemClass),
        u.addEventListener('mousemove', (d) => {
          const [h, m] = this._findLiTarget(d.target)
          d.movementY !== 0 && this.events.setActiveLi(m)
        }),
        this.menuSelected === a &&
                        u.classList.add(this.current.collection.selectClass),
        (u.innerHTML = this.current.collection.menuItemTemplate(s)),
        l.appendChild(u)
      }),
      o.appendChild(l)
    }
    typeof this.current.collection.values === 'function'
      ? this.current.collection.values(this.current.mentionText, i)
      : i(this.current.collection.values)
  }

  _findLiTarget (e) {
    if (!e) return []
    const t = e.getAttribute('data-index')
    return t ? [e, t] : this._findLiTarget(e.parentNode)
  }

  showMenuForCollection (e, t) {
    e !== document.activeElement && this.placeCaretAtEnd(e),
    (this.current.collection = this.collection[t || 0]),
    (this.current.externalTrigger = !0),
    (this.current.element = e),
    e.isContentEditable
      ? this.insertTextAtCursor(this.current.collection.trigger)
      : this.insertAtCaret(e, this.current.collection.trigger),
    this.showMenuFor(e)
  }

  placeCaretAtEnd (e) {
    if (
      (e.focus(),
      typeof window.getSelection < 'u' &&
                typeof document.createRange < 'u')
    ) {
      const t = document.createRange()
      t.selectNodeContents(e), t.collapse(!1)
      const i = window.getSelection()
      i.removeAllRanges(), i.addRange(t)
    } else if (typeof document.body.createTextRange < 'u') {
      const n = document.body.createTextRange()
      n.moveToElementText(e), n.collapse(!1), n.select()
    }
  }

  insertTextAtCursor (e) {
    let t, i;
    (t = window.getSelection()), (i = t.getRangeAt(0)), i.deleteContents()
    const n = document.createTextNode(e)
    i.insertNode(n),
    i.selectNodeContents(n),
    i.collapse(!1),
    t.removeAllRanges(),
    t.addRange(i)
  }

  insertAtCaret (e, t) {
    const i = e.scrollTop
    let n = e.selectionStart
    const r = e.value.substring(0, n)
    const o = e.value.substring(e.selectionEnd, e.value.length);
    (e.value = r + t + o),
    (n = n + t.length),
    (e.selectionStart = n),
    (e.selectionEnd = n),
    e.focus(),
    (e.scrollTop = i)
  }

  hideMenu () {
    this.menu &&
            ((this.menu.style.cssText = 'display: none;'),
            (this.isActive = !1),
            (this.menuSelected = 0),
            (this.current = {}))
  }

  selectItemAtIndex (e, t) {
    if (((e = parseInt(e)), typeof e !== 'number' || isNaN(e))) return
    const i = this.current.filteredItems[e]
    const n = this.current.collection.selectTemplate(i)
    n !== null && this.replaceText(n, t, i)
  }

  replaceText (e, t, i) {
    this.range.replaceTriggerText(e, !0, !0, t, i)
  }

  _append (e, t, i) {
    if (typeof e.values === 'function') {
      throw new Error('Unable to append to values, as it is a function.')
    }
    i ? (e.values = t) : (e.values = e.values.concat(t))
  }

  append (e, t, i) {
    const n = parseInt(e)
    if (typeof n !== 'number') {
      throw new Error(
        'please provide an index for the collection to update.'
      )
    }
    const r = this.collection[n]
    this._append(r, t, i)
  }

  appendCurrent (e, t) {
    if (this.isActive) this._append(this.current.collection, e, t)
    else {
      throw new Error(
        'No active state. Please use append instead and pass an index.'
      )
    }
  }

  detach (e) {
    if (!e) {
      throw new Error('[Tribute] Must pass in a DOM node or NodeList.')
    }
    if (
      (typeof jQuery < 'u' && e instanceof jQuery && (e = e.get()),
      e.constructor === NodeList ||
                e.constructor === HTMLCollection ||
                e.constructor === Array)
    ) {
      const i = e.length
      for (let t = 0; t < i; ++t) this._detach(e[t])
    } else this._detach(e)
  }

  _detach (e) {
    this.events.unbind(e),
    e.tributeMenu && this.menuEvents.unbind(e.tributeMenu),
    setTimeout(() => {
      e.removeAttribute('data-tribute'),
      (this.isActive = !1),
      e.tributeMenu && e.tributeMenu.remove()
    })
  }
}
const _ = W
function F ({
  fieldName: p,
  triggerWith: e,
  pluck: t,
  menuShowMinLength: i,
  menuItemLimit: n,
  lookupKey: r,
  loadingItemString: o,
  noResultsString: l,
  valuesFunction: s,
  triggerConfigs: a = null,
  prefix: u = '',
  suffix: d = '',
  titleField: h = 'title',
  hintField: m = null
}) {
  const f = document.getElementById(p)
  const w = i != null ? parseInt(i) : 0
  const b = n != null ? parseInt(n) : 10
  function E (c, g) {
    if (!g) return !0
    const y = g.toLowerCase()
    for (const v in c) {
      if (typeof c[v] === 'string' && c[v].toLowerCase().includes(y)) {
        return !0
      }
    }
    return !1
  }
  function x (c, g) {
    if (g && c[g]) return c[g]
    if (c.value) return c.value
    if (c.username) return c.username
    if (c.name) return c.name
    if (c.key) return c.key
    for (const y in c) if (typeof c[y] === 'string') return c[y]
    return 'Unknown'
  }
  function A (c, g) {
    return g && c[g]
      ? c[g]
      : c.title
        ? c.title
        : c.name
          ? c.name
          : c.label
            ? c.label
            : x(c, null)
  }
  function M (c, g, y, v, C) {
    if (g && c[g]) return `${y}${c[g]}${v}`
    const I = x(c, C)
    return `${y}${I}${v}`
  }
  if (!Array.isArray(e)) {
    const c = u || ''
    const g = d || ''
    const y = new _({
      trigger: e,
      values: function (v, C) {
        s(v, function (I) {
          const P = I.filter((T) => E(T, v))
          C(P)
        })
      },
      menuShowMinLength: w,
      menuItemLimit: b,
      loadingItemTemplate: `<div class="loading-item">${o}</div>`,
      lookup: function (v, C) {
        return x(v, r)
      },
      menuContainer: document.body,
      menuItemTemplate: function (v) {
        const C = A(v.original, h)
        const I = M(v.original, m, c, g, r)
        return `
                    <div class='mention-item'>
                        ${v.original.avatar ? `<img class="mention-item__avatar" src="${v.original.avatar}" alt="${C}"/>` : ''}
                        <div class='mention-item__info'>
                            <div class='mention-item__info-title'>${C}</div>
                            <div class='mention-item__info-hint'>${I}</div>
                        </div>
                    </div>
                `
      },
      selectTemplate: function (v) {
        if (typeof v > 'u') return null
        const C = x(v.original, r)
        return v.original.url !== null
          ? `<a href="${v.original.url}(--${v.original[t]}--)" data-trix-attribute="bold">${c}${C}${g}</a>`
          : `${c}${C}${g}`
      },
      noMatchTemplate: function () {
        return `<span class="no-match">${l}</span>`
      }
    })
    return y.attach(f), B(f, y), y
  }
  const N = []
  for (let c = 0; c < e.length; c++) {
    const g = e[c]
    let y = r
    let v = u || ''
    let C = d || ''
    let I = h
    let P = m
    let T = null
    a &&
            a[g] &&
            ((T = a[g]),
            T.lookupKey && (y = T.lookupKey),
            T.prefix !== void 0 && (v = T.prefix),
            T.suffix !== void 0 && (C = T.suffix),
            T.titleField
              ? (I = T.titleField)
              : T.title_field && (I = T.title_field),
            T.hintField
              ? (P = T.hintField)
              : T.hint_field && (P = T.hint_field)),
    N.push({
      trigger: g,
      values: function (S, k) {
        if (T && typeof T.filter === 'function') {
          return T.filter(S, k, s)
        }
        s(S, function (D) {
          const Y = D.filter((V) => E(V, S))
          k(Y)
        })
      },
      lookup: function (S, k) {
        return x(S, y)
      },
      menuShowMinLength: w,
      menuItemLimit: b,
      loadingItemTemplate: `<div class="loading-item">${o}</div>`,
      menuContainer: document.body,
      menuItemTemplate: function (S) {
        const k = A(S.original, I)
        const D = M(S.original, P, v, C, y)
        return `
                    <div class='mention-item'>
                        ${S.original.avatar ? `<img class="mention-item__avatar" src="${S.original.avatar}" alt="${k}"/>` : ''}
                        <div class='mention-item__info'>
                            <div class='mention-item__info-title'>${k}</div>
                            <div class='mention-item__info-hint'>${D}</div>
                        </div>
                    </div>
                `
      },
      selectTemplate: function (S) {
        if (typeof S > 'u') return null
        const k = x(S.original, y)
        return S.original.url !== null
          ? `<a href="${S.original.url}(--${S.original[t]}--)" data-trix-attribute="bold">${v}${k}${C}</a>`
          : `${v}${k}${C}`
      },
      noMatchTemplate: function () {
        return `<span class="no-match">${l}</span>`
      }
    })
  }
  const L = new _({ collection: N })
  return L.attach(f), B(f, L), L
}
function B (p, e) {
  p.addEventListener('tribute-active-true', function () {
    e.menu.classList.add('tribute-active')
  }),
  p.addEventListener('tribute-active-false', function () {
    e.menu.classList.remove('tribute-active')
  }),
  p.addEventListener('keydown', function (t) {
    if (!e.isActive) return
    const i = e.menu.querySelector('.highlight')
    if (i) {
      if (t.key === 'ArrowDown') {
        const n = i.nextElementSibling
        n &&
                        n.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest'
                        })
      } else if (t.key === 'ArrowUp') {
        const n = i.previousElementSibling
        n &&
                        n.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest'
                        })
      }
    }
  })
}
function j ({
  fieldName: p,
  mentionableItems: e,
  triggerWith: t,
  pluck: i,
  menuShowMinLength: n,
  menuItemLimit: r,
  lookupKey: o,
  loadingItemString: l,
  noResultsString: s,
  triggerConfigs: a = null,
  prefix: u = '',
  suffix: d = '',
  titleField: h = 'title',
  hintField: m = null
}) {
  return {
    fieldName: p,
    pluck: i,
    menuShowMinLength: n,
    lookupKey: o,
    menuItemLimit: r,
    init () {
      F({
        fieldName: this.fieldName,
        triggerWith: t,
        pluck: i,
        menuShowMinLength: n,
        lookupKey: o,
        menuItemLimit: r,
        loadingItemString: l,
        noResultsString: s,
        triggerConfigs: a,
        prefix: u,
        suffix: d,
        titleField: h,
        hintField: m,
        valuesFunction: function (f, w) {
          w(e)
        }
      })
    }
  }
}
function q ({
  fieldName: p,
  triggerWith: e,
  pluck: t,
  menuShowMinLength: i,
  menuItemLimit: n,
  lookupKey: r,
  loadingItemString: o,
  noResultsString: l,
  triggerConfigs: s = null,
  prefix: a = '',
  suffix: u = '',
  titleField: d = 'title',
  hintField: h = null
}) {
  return {
    fieldName: p,
    pluck: t,
    menuShowMinLength: i,
    menuItemLimit: n,
    lookupKey: r,
    init () {
      const m = this.$wire
      F({
        fieldName: this.fieldName,
        triggerWith: e,
        pluck: t,
        menuShowMinLength: i,
        lookupKey: r,
        menuItemLimit: n,
        loadingItemString: o,
        noResultsString: l,
        triggerConfigs: s,
        prefix: a,
        suffix: u,
        titleField: d,
        hintField: h,
        valuesFunction: function (f, w) {
          m.getMentionableItems(f).then(function (b) {
            w(b)
          })
        }
      })
    }
  }
}
export { q as fetchMention, j as mention }
