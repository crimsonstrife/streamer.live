Array.prototype.find ||
    (Array.prototype.find = function (h) {
      if (this === null) {
        throw new TypeError(
          'Array.prototype.find called on null or undefined'
        )
      }
      if (typeof h !== 'function') {
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
        if (((n = e[r]), h.call(i, n, r, e))) return n
      }
    })
if (window && typeof window.CustomEvent !== 'function') {
  const h = function (e, t) {
    t = t || { bubbles: !1, cancelable: !1, detail: void 0 }
    const i = document.createEvent('CustomEvent')
    return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
  }
  typeof window.Event < 'u' && (h.prototype = window.Event.prototype),
  (window.CustomEvent = h)
}
const x = class h {
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
    h.keys().forEach((n) => {
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
        h.keys().forEach((i) => {
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
        const s = this.tribute.menu.getBoundingClientRect()
        if (o.bottom > s.bottom) {
          const l = o.bottom - s.bottom
          this.tribute.menu.scrollTop += l
        } else if (o.top < s.top) {
          const l = s.top - o.top
          this.tribute.menu.scrollTop -= l
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
const A = class {
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
      const s = () => {
        (n = null), i || e.apply(r, o)
      }
      const l = i && !n
      clearTimeout(n), (n = setTimeout(s, t)), l && e.apply(r, o)
    }
  }
}
const M = class {
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
        const s =
                        window.innerWidth > r.width && (o.left || o.right)
        const l =
                        window.innerHeight > r.height && (o.top || o.bottom);
        (s || l) &&
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
    const s = this.getWindowSelection();
    (n = this.getDocument().createRange()),
    n.setStart(r, i),
    n.setEnd(r, i),
    n.collapse(!0)
    try {
      s.removeAllRanges()
    } catch {}
    s.addRange(n), e.focus()
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
      const s = this.tribute.current
      const l = new CustomEvent('tribute-replaced', {
        detail: { item: r, instance: s, context: o, event: n }
      })
      if (this.isContentEditable(s.element)) {
        const c =
                    typeof this.tribute.replaceTextSuffix === 'string'
                      ? this.tribute.replaceTextSuffix
                      : '\xA0'
        e += c
        let u = o.mentionPosition + o.mentionText.length
        this.tribute.autocompleteMode ||
                    (u += o.mentionTriggerChar.length),
        this.pasteHtml(e, o.mentionPosition, u)
      } else {
        const c = this.tribute.current.element
        const u =
                    typeof this.tribute.replaceTextSuffix === 'string'
                      ? this.tribute.replaceTextSuffix
                      : ' '
        e += u
        const f = o.mentionPosition
        let a = o.mentionPosition + o.mentionText.length + u.length
        this.tribute.autocompleteMode ||
                    (a += o.mentionTriggerChar.length - 1),
        (c.value =
                        c.value.substring(0, f) +
                        e +
                        c.value.substring(a, c.value.length)),
        (c.selectionStart = f + e.length),
        (c.selectionEnd = f + e.length)
      }
      s.element.dispatchEvent(new CustomEvent('input', { bubbles: !0 })),
      s.element.dispatchEvent(l)
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
    const s = this.getDocument().createDocumentFragment()
    let l
    let c
    for (; (l = o.firstChild);) c = s.appendChild(l)
    n.insertNode(s),
    c &&
                ((n = n.cloneRange()),
                n.setStartAfter(c),
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
      let s = i.contentEditable
      for (; i !== null && s !== 'true';) {
        (o = this.getNodePositionInParent(i)),
        n.push(o),
        (i = i.parentNode),
        i !== null && (s = i.contentEditable)
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
    let s
    let l
    let c
    if (!this.isContentEditable(o.element)) {
      s = this.tribute.current.element
    } else {
      const a = this.getContentEditableSelectedPath(o)
      a && ((s = a.selected), (l = a.path), (c = a.offset))
    }
    const u = this.getTextPrecedingCurrentSelection()
    const f = this.getLastWordInText(u)
    if (r) {
      return {
        mentionPosition: u.length - f.length,
        mentionText: f,
        mentionSelectedElement: s,
        mentionSelectedPath: l,
        mentionSelectedOffset: c
      }
    }
    if (u != null) {
      let a = -1
      let p
      if (
        (this.tribute.collection.forEach((d) => {
          const b = d.trigger
          const g = d.requireLeadingSpace
            ? this.lastIndexWithLeadingSpace(u, b)
            : u.lastIndexOf(b)
          g > a && ((a = g), (p = b), (i = d.requireLeadingSpace))
        }),
        a >= 0 &&
                    (a === 0 || !i || /[\xA0\s]/g.test(u.substring(a - 1, a))))
      ) {
        let d = u.substring(a + p.length, u.length)
        p = u.substring(a, a + p.length)
        const b = d.substring(0, 1)
        const g = d.length > 0 && (b === ' ' || b === '\xA0')
        t && (d = d.trim())
        const w = n ? /[^\S ]/g : /[\xA0\s]/g
        if (
          ((this.tribute.hasTrailingSpace = w.test(d)),
          !g && (e || !w.test(d)))
        ) {
          return {
            mentionPosition: a,
            mentionText: d,
            mentionSelectedElement: s,
            mentionSelectedPath: l,
            mentionSelectedOffset: c,
            mentionTriggerChar: p
          }
        }
      }
    }
  }

  lastIndexWithLeadingSpace (e, t) {
    const i = e.split('').reverse().join('')
    let n = -1
    for (let r = 0, o = e.length; r < o; r++) {
      const s = r === e.length - 1
      const l = /\s/.test(i[r + 1])
      let c = !0
      for (let u = t.length - 1; u >= 0; u--) {
        if (t[u] !== i[r - u]) {
          c = !1
          break
        }
      }
      if (c && (s || l)) {
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
    const s = (window.pageYOffset || r.scrollTop) - (r.clientTop || 0)
    const l =
            typeof e.top === 'number' ? e.top : s + n - e.bottom - t.height
    const c = typeof e.right === 'number' ? e.right : e.left + t.width
    const u = typeof e.bottom === 'number' ? e.bottom : e.top + t.height
    const f =
            typeof e.left === 'number' ? e.left : o + i - e.right - t.width
    return {
      top: l < Math.floor(s),
      right: c > Math.ceil(o + i),
      bottom: u > Math.ceil(s + n),
      left: f < Math.floor(o)
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
    const s = o.style
    const l = window.getComputedStyle
      ? getComputedStyle(e)
      : e.currentStyle;
    (s.whiteSpace = 'pre-wrap'),
    e.nodeName !== 'INPUT' && (s.wordWrap = 'break-word'),
    (s.position = 'absolute'),
    (s.visibility = 'hidden'),
    n.forEach((C) => {
      s[C] = l[C]
    }),
    r
      ? ((s.width = `${parseInt(l.width) - 2}px`),
        e.scrollHeight > parseInt(l.height) &&
                      (s.overflowY = 'scroll'))
      : (s.overflow = 'hidden'),
    (o.textContent = e.value.substring(0, t)),
    e.nodeName === 'INPUT' &&
                (o.textContent = o.textContent.replace(/\s/g, '\xA0'))
    const c = this.getDocument().createElement('span');
    (c.textContent = e.value.substring(t) || '.'), o.appendChild(c)
    const u = e.getBoundingClientRect()
    const f = document.documentElement
    const a = (window.pageXOffset || f.scrollLeft) - (f.clientLeft || 0)
    const p = (window.pageYOffset || f.scrollTop) - (f.clientTop || 0)
    let d = 0
    let b = 0
    this.menuContainerIsBody && ((d = u.top), (b = u.left))
    const g = {
      top:
                d +
                p +
                c.offsetTop +
                parseInt(l.borderTopWidth) +
                parseInt(l.fontSize) -
                e.scrollTop,
      left: b + a + c.offsetLeft + parseInt(l.borderLeftWidth)
    }
    const w = window.innerWidth
    const S = window.innerHeight
    const v = this.getMenuDimensions()
    let T = this.isMenuOffScreen(g, v)
    T.right && ((g.right = w - g.left), (g.left = 'auto'))
    const E = this.tribute.menuContainer
      ? this.tribute.menuContainer.offsetHeight
      : this.getDocument().body.offsetHeight
    if (T.bottom) {
      const C = this.tribute.menuContainer
        ? this.tribute.menuContainer.getBoundingClientRect()
        : this.getDocument().body.getBoundingClientRect()
      const m = E - (S - C.top);
      (g.bottom = m + (S - u.top - c.offsetTop)), (g.top = 'auto')
    }
    return (
      (T = this.isMenuOffScreen(g, v)),
      T.left &&
                ((g.left = w > v.width ? a + w - v.width : a), delete g.right),
      T.top &&
                ((g.top = S > v.height ? p + S - v.height : p),
                delete g.bottom),
      this.getDocument().body.removeChild(o),
      g
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
    const s = (window.pageYOffset || r.scrollTop) - (r.clientTop || 0)
    const l = n.left
    const c = n.top
    const u = { left: l + o, top: c + n.height + s }
    const f = window.innerWidth
    const a = window.innerHeight
    const p = this.getMenuDimensions()
    let d = this.isMenuOffScreen(u, p)
    d.right && ((u.left = 'auto'), (u.right = f - n.left - o))
    const b = this.tribute.menuContainer
      ? this.tribute.menuContainer.offsetHeight
      : this.getDocument().body.offsetHeight
    if (d.bottom) {
      const g = this.tribute.menuContainer
        ? this.tribute.menuContainer.getBoundingClientRect()
        : this.getDocument().body.getBoundingClientRect()
      const w = b - (a - g.top);
      (u.top = 'auto'), (u.bottom = w + (a - n.top))
    }
    return (
      (d = this.isMenuOffScreen(u, p)),
      d.left &&
                ((u.left = f > p.width ? o + f - p.width : o), delete u.right),
      d.top &&
                ((u.top = a > p.height ? s + a - p.height : s),
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
    const s = o + i.height
    if (o < 0) window.scrollTo(0, window.pageYOffset + i.top - t)
    else if (s > window.innerHeight) {
      let l = window.pageYOffset + i.top - t
      l - window.pageYOffset > n && (l = window.pageYOffset + n)
      let c = window.pageYOffset - (window.innerHeight - s)
      c > l && (c = l), window.scrollTo(0, c)
    }
  }
}
const L = class {
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
    const s = (i.caseSensitive && t) || t.toLowerCase()
    if (i.skip) return { rendered: t, score: 0 }
    e = (i.caseSensitive && e) || e.toLowerCase()
    const l = this.traverse(s, e, 0, 0, [])
    return l
      ? { rendered: this.render(t, l.cache, r, o), score: l.score }
      : null
  }

  traverse (e, t, i, n, r) {
    if (t.length === n) {
      return { score: this.calculateScore(r), cache: r.slice() }
    }
    if (e.length === i || t.length - n > e.length - i) return
    const o = t[n]
    let s = e.indexOf(o, i)
    let l
    let c
    for (; s > -1;) {
      if (
        (r.push(s),
        (c = this.traverse(e, t, s + 1, n + 1, r)),
        r.pop(),
        !c)
      ) {
        return l
      }
      (!l || l.score < c.score) && (l = c), (s = e.indexOf(o, s + 1))
    }
    return l
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
      t.forEach((o, s) => {
        r +=
                    i +
                    e[o] +
                    n +
                    e.substring(o + 1, t[s + 1] ? t[s + 1] : e.length)
      }),
      r
    )
  }

  filter (e, t, i) {
    return (
      (i = i || {}),
      t
        .reduce((n, r, o, s) => {
          let l = r
          i.extract && ((l = i.extract(r)), l || (l = ''))
          const c = this.match(e, l, i)
          return (
            c != null &&
                            (n[n.length] = {
                              string: c.rendered,
                              score: c.score,
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
const I = class h {
  constructor ({
    values: e = null,
    iframe: t = null,
    selectClass: i = 'highlight',
    containerClass: n = 'tribute-container',
    itemClass: r = '',
    trigger: o = '@',
    autocompleteMode: s = !1,
    selectTemplate: l = null,
    menuItemTemplate: c = null,
    lookup: u = 'key',
    fillAttr: f = 'value',
    collection: a = null,
    menuContainer: p = null,
    noMatchTemplate: d = null,
    requireLeadingSpace: b = !0,
    allowSpaces: g = !1,
    replaceTextSuffix: w = null,
    positionMenu: S = !0,
    spaceSelectsMatch: v = !1,
    searchOpts: T = {},
    menuItemLimit: E = null,
    menuShowMinLength: C = 0
  }) {
    if (
      ((this.autocompleteMode = s),
      (this.menuSelected = 0),
      (this.current = {}),
      (this.inputEvent = !1),
      (this.isActive = !1),
      (this.menuContainer = p),
      (this.allowSpaces = g),
      (this.replaceTextSuffix = w),
      (this.positionMenu = S),
      (this.hasTrailingSpace = !1),
      (this.spaceSelectsMatch = v),
      this.autocompleteMode && ((o = ''), (g = !1)),
      e)
    ) {
      this.collection = [
        {
          trigger: o,
          iframe: t,
          selectClass: i,
          containerClass: n,
          itemClass: r,
          selectTemplate: (l || h.defaultSelectTemplate).bind(this),
          menuItemTemplate: (c || h.defaultMenuItemTemplate).bind(
            this
          ),
          noMatchTemplate: ((m) =>
            typeof m === 'string'
              ? m.trim() === ''
                ? null
                : m
              : typeof m === 'function'
                ? m.bind(this)
                : d ||
                                function () {
                                  return '<li>No Match Found!</li>'
                                })(d),
          lookup: u,
          fillAttr: f,
          values: e,
          requireLeadingSpace: b,
          searchOpts: T,
          menuItemLimit: E,
          menuShowMinLength: C
        }
      ]
    } else if (a) {
      this.autocompleteMode &&
                console.warn(
                  'Tribute in autocomplete mode does not work for collections'
                ),
      (this.collection = a.map((m) => ({
        trigger: m.trigger || o,
        iframe: m.iframe || t,
        selectClass: m.selectClass || i,
        containerClass: m.containerClass || n,
        itemClass: m.itemClass || r,
        selectTemplate: (
          m.selectTemplate || h.defaultSelectTemplate
        ).bind(this),
        menuItemTemplate: (
          m.menuItemTemplate || h.defaultMenuItemTemplate
        ).bind(this),
        noMatchTemplate: ((y) =>
          typeof y === 'string'
            ? y.trim() === ''
              ? null
              : y
            : typeof y === 'function'
              ? y.bind(this)
              : d ||
                                function () {
                                  return '<li>No Match Found!</li>'
                                })(d),
        lookup: m.lookup || u,
        fillAttr: m.fillAttr || f,
        values: m.values,
        requireLeadingSpace: m.requireLeadingSpace,
        searchOpts: m.searchOpts || T,
        menuItemLimit: m.menuItemLimit || E,
        menuShowMinLength: m.menuShowMinLength || C
      })))
    } else throw new Error('[Tribute] No collection specified.')
    new M(this), new x(this), new A(this), new L(this)
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
    if (h.inputTypes().indexOf(e.nodeName) === -1) {
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
        extract: (l) => {
          if (typeof this.current.collection.lookup === 'string') {
            return l[this.current.collection.lookup]
          }
          if (typeof this.current.collection.lookup === 'function') {
            return this.current.collection.lookup(
              l,
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
        const l = new CustomEvent('tribute-no-match', {
          detail: this.menu
        })
        this.current.element.dispatchEvent(l),
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
      const s = this.range.getDocument().createDocumentFragment()
      r.forEach((l, c) => {
        const u = this.range.getDocument().createElement('li')
        u.setAttribute('data-index', c),
        (u.className = this.current.collection.itemClass),
        u.addEventListener('mousemove', (f) => {
          const [a, p] = this._findLiTarget(f.target)
          f.movementY !== 0 && this.events.setActiveLi(p)
        }),
        this.menuSelected === c &&
                        u.classList.add(this.current.collection.selectClass),
        (u.innerHTML = this.current.collection.menuItemTemplate(l)),
        s.appendChild(u)
      }),
      o.appendChild(s)
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
const k = I
function P (h, e) {
  return `
        <div class='mention-item'>
            ${h.original.avatar ? `<img class="mention-item__avatar" src="${h.original.avatar}" alt="${h.original[e]}"/>` : ''}
            <div class='mention-item__info'>
                <div class='mention-item__info-name'>${h.original.name}</div>
                <div class='mention-item__info-email'>@${h.original[e]}</div>
            </div>
        </div>
    `
}
function D (h, e, t) {
  return typeof h > 'u'
    ? null
    : `<a href="${h.original.url}(--${h.original[e]}--)" data-trix-attribute="bold">@${h.original[t]}</a>`
}
function N ({
  fieldName: h,
  triggerWith: e,
  pluck: t,
  menuShowMinLength: i,
  menuItemLimit: n,
  lookupKey: r,
  valuesFunction: o
}) {
  const s = document.getElementById(h)
  const l = new k({
    trigger: e,
    values: o,
    menuShowMinLength: i,
    menuItemLimit: n,
    loadingItemTemplate: '<div class="loading-item">Loading...</div>',
    lookup: r,
    menuContainer: document.body,
    menuItemTemplate: (c) => P(c, r),
    selectTemplate: (c) => D(c, t, r),
    noMatchTemplate: () => '<span class="no-match">No results found</span>'
  })
  l.attach(s),
  s.addEventListener('tribute-active-true', () =>
    l.menu.classList.add('tribute-active')
  ),
  s.addEventListener('tribute-active-false', () =>
    l.menu.classList.remove('tribute-active')
  ),
  s.addEventListener('keydown', (c) => {
    if (!l.isActive) return
    const u = l.menu.querySelector('.highlight')
    if (!u) return
    const f = l.menu
    if (c.key === 'ArrowDown') {
      const a = u.nextElementSibling
      a && a.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    } else if (c.key === 'ArrowUp') {
      const a = u.previousElementSibling
      a && a.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  })
}
function W ({
  fieldName: h,
  mentionableItems: e,
  triggerWith: t,
  pluck: i,
  menuShowMinLength: n,
  menuItemLimit: r,
  lookupKey: o
}) {
  return {
    fieldName: h,
    pluck: i,
    menuShowMinLength: n,
    lookupKey: o,
    menuItemLimit: r,
    init () {
      N({
        fieldName: this.fieldName,
        triggerWith: t,
        pluck: i,
        menuShowMinLength: n,
        lookupKey: o,
        menuItemLimit: r,
        valuesFunction: (s, l) => {
          const c = e.filter((u) =>
            u[o].toLowerCase().includes(s.toLowerCase())
          )
          l(c)
        }
      })
    }
  }
}
function H ({
  fieldName: h,
  triggerWith: e,
  pluck: t,
  menuShowMinLength: i,
  menuItemLimit: n,
  lookupKey: r
}) {
  return {
    fieldName: h,
    pluck: t,
    menuShowMinLength: i,
    menuItemLimit: n,
    lookupKey: r,
    init () {
      const o = this.$wire
      N({
        fieldName: this.fieldName,
        triggerWith: e,
        pluck: t,
        menuShowMinLength: i,
        menuItemLimit: n,
        lookupKey: r,
        valuesFunction: (s, l) => {
          o.getMentionableItems(s).then((c) => {
            l(c)
          })
        }
      })
    }
  }
}
export { H as fetchMention, W as mention }
