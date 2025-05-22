const po = '2.1.15'
const Rt = '[data-trix-attachment]'
const mi = {
  preview: { presentation: 'gallery', caption: { name: !0, size: !0 } },
  file: { caption: { size: !0 } }
}
var U = {
  default: { tagName: 'div', parse: !1 },
  quote: { tagName: 'blockquote', nestable: !0 },
  heading1: { tagName: 'h1', terminal: !0, breakOnReturn: !0, group: !1 },
  code: {
    tagName: 'pre',
    terminal: !0,
    htmlAttributes: ['language'],
    text: { plaintext: !0 }
  },
  bulletList: { tagName: 'ul', parse: !1 },
  bullet: {
    tagName: 'li',
    listAttribute: 'bulletList',
    group: !1,
    nestable: !0,
    test (i) {
      return Gi(i.parentNode) === U[this.listAttribute].tagName
    }
  },
  numberList: { tagName: 'ol', parse: !1 },
  number: {
    tagName: 'li',
    listAttribute: 'numberList',
    group: !1,
    nestable: !0,
    test (i) {
      return Gi(i.parentNode) === U[this.listAttribute].tagName
    }
  },
  attachmentGallery: {
    tagName: 'div',
    exclusive: !0,
    terminal: !0,
    parse: !1,
    group: !1
  }
}
var Gi = (i) => {
  let t
  return i == null || (t = i.tagName) === null || t === void 0
    ? void 0
    : t.toLowerCase()
}
const Yi = navigator.userAgent.match(/android\s([0-9]+.*Chrome)/i)
const Sn = Yi && parseInt(Yi[1])
const xe = {
  composesExistingText: /Android.*Chrome/.test(navigator.userAgent),
  recentAndroid: Sn && Sn > 12,
  samsungAndroid: Sn && navigator.userAgent.match(/Android.*SM-/),
  forcesObjectResizing: /Trident.*rv:11/.test(navigator.userAgent),
  supportsInputEvents:
        typeof InputEvent < 'u' &&
        ['data', 'getTargetRanges', 'inputType'].every(
          (i) => i in InputEvent.prototype
        )
}
const Lr = { ADD_ATTR: ['language'], SAFE_FOR_XML: !1, RETURN_DOM: !0 }
const m = {
  attachFiles: 'Attach Files',
  bold: 'Bold',
  bullets: 'Bullets',
  byte: 'Byte',
  bytes: 'Bytes',
  captionPlaceholder: 'Add a caption\u2026',
  code: 'Code',
  heading1: 'Heading',
  indent: 'Increase Level',
  italic: 'Italic',
  link: 'Link',
  numbers: 'Numbers',
  outdent: 'Decrease Level',
  quote: 'Quote',
  redo: 'Redo',
  remove: 'Remove',
  strike: 'Strikethrough',
  undo: 'Undo',
  unlink: 'Unlink',
  url: 'URL',
  urlPlaceholder: 'Enter a URL\u2026',
  GB: 'GB',
  KB: 'KB',
  MB: 'MB',
  PB: 'PB',
  TB: 'TB'
}
const fo = [m.bytes, m.KB, m.MB, m.GB, m.TB, m.PB]
const Dr = {
  prefix: 'IEC',
  precision: 2,
  formatter (i) {
    switch (i) {
      case 0:
        return '0 '.concat(m.bytes)
      case 1:
        return '1 '.concat(m.byte)
      default:
        let t
        this.prefix === 'SI'
          ? (t = 1e3)
          : this.prefix === 'IEC' && (t = 1024)
        const e = Math.floor(Math.log(i) / Math.log(t))
        const n = (i / Math.pow(t, e))
          .toFixed(this.precision)
          .replace(/0*$/, '')
          .replace(/\.$/, '')
        return ''.concat(n, ' ').concat(fo[e])
    }
  }
}
const ln = '\uFEFF'
const ft = '\xA0'
const Nr = function (i) {
  for (const t in i) {
    const e = i[t]
    this[t] = e
  }
  return this
}
const pi = document.documentElement
const bo = pi.matches
const S = function (i) {
  let {
    onElement: t,
    matchingSelector: e,
    withCallback: n,
    inPhase: r,
    preventDefault: o,
    times: s
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const l = t || pi
  const c = e
  const u = r === 'capturing'
  const d = function (C) {
    s != null && --s == 0 && d.destroy()
    const T = vt(C.target, { matchingSelector: c })
    T != null && (n?.call(T, C, T), o && C.preventDefault())
  }
  return (
    (d.destroy = () => l.removeEventListener(i, d, u)),
    l.addEventListener(i, d, u),
    d
  )
}
const de = function (i) {
  let {
    onElement: t,
    bubbles: e,
    cancelable: n,
    attributes: r
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const o = t ?? pi;
  (e = e !== !1), (n = n !== !1)
  const s = document.createEvent('Events')
  return s.initEvent(i, e, n), r != null && Nr.call(s, r), o.dispatchEvent(s)
}
const Ir = function (i, t) {
  if (i?.nodeType === 1) return bo.call(i, t)
}
var vt = function (i) {
  const { matchingSelector: t, untilNode: e } =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  for (; i && i.nodeType !== Node.ELEMENT_NODE;) i = i.parentNode
  if (i != null) {
    if (t == null) return i
    if (i.closest && e == null) return i.closest(t)
    for (; i && i !== e;) {
      if (Ir(i, t)) return i
      i = i.parentNode
    }
  }
}
const fi = (i) => document.activeElement !== i && kt(i, document.activeElement)
var kt = function (i, t) {
  if (i && t) {
    for (; t;) {
      if (t === i) return !0
      t = t.parentNode
    }
  }
}
const kn = function (i) {
  let t
  if ((t = i) === null || t === void 0 || !t.parentNode) return
  let e = 0
  for (i = i.previousSibling; i;) e++, (i = i.previousSibling)
  return e
}
const At = (i) => {
  let t
  return i == null || (t = i.parentNode) === null || t === void 0
    ? void 0
    : t.removeChild(i)
}
const je = function (i) {
  const {
    onlyNodesOfType: t,
    usingFilter: e,
    expandEntityReferences: n
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  const r = (() => {
    switch (t) {
      case 'element':
        return NodeFilter.SHOW_ELEMENT
      case 'text':
        return NodeFilter.SHOW_TEXT
      case 'comment':
        return NodeFilter.SHOW_COMMENT
      default:
        return NodeFilter.SHOW_ALL
    }
  })()
  return document.createTreeWalker(i, r, e ?? null, n === !0)
}
const W = (i) => {
  let t
  return i == null || (t = i.tagName) === null || t === void 0
    ? void 0
    : t.toLowerCase()
}
const p = function (i) {
  let t
  let e
  let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  typeof i === 'object'
    ? ((n = i), (i = n.tagName))
    : (n = { attributes: n })
  const r = document.createElement(i)
  if (
    (n.editable != null &&
            (n.attributes == null && (n.attributes = {}),
            (n.attributes.contenteditable = n.editable)),
    n.attributes)
  ) {
    for (t in n.attributes) (e = n.attributes[t]), r.setAttribute(t, e)
  }
  if (n.style) for (t in n.style) (e = n.style[t]), (r.style[t] = e)
  if (n.data) for (t in n.data) (e = n.data[t]), (r.dataset[t] = e)
  return (
    n.className &&
            n.className.split(' ').forEach((o) => {
              r.classList.add(o)
            }),
    n.textContent && (r.textContent = n.textContent),
    n.childNodes &&
            [].concat(n.childNodes).forEach((o) => {
              r.appendChild(o)
            }),
    r
  )
}
let re
const ge = function () {
  if (re != null) return re
  re = []
  for (const i in U) {
    const t = U[i]
    t.tagName && re.push(t.tagName)
  }
  return re
}
const Rn = (i) => Vt(i?.firstChild)
const $i = function (i) {
  const { strict: t } =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : { strict: !0 }
  return t
    ? Vt(i)
    : Vt(i) ||
              (!Vt(i.firstChild) &&
                  (function (e) {
                    return (
                      ge().includes(W(e)) && !ge().includes(W(e.firstChild))
                    )
                  })(i))
}
var Vt = (i) => vo(i) && i?.data === 'block'
var vo = (i) => i?.nodeType === Node.COMMENT_NODE
const zt = function (i) {
  const { name: t } =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  if (i) {
    return me(i)
      ? i.data === ln
        ? !t || i.parentNode.dataset.trixCursorTarget === t
        : void 0
      : zt(i.firstChild)
  }
}
const Tt = (i) => Ir(i, Rt)
const Or = (i) => me(i) && i?.data === ''
var me = (i) => i?.nodeType === Node.TEXT_NODE
const bi = {
  level2Enabled: !0,
  getLevel () {
    return this.level2Enabled && xe.supportsInputEvents ? 2 : 0
  },
  pickFiles (i) {
    const t = p('input', {
      type: 'file',
      multiple: !0,
      hidden: !0,
      id: this.fileInputId
    })
    t.addEventListener('change', () => {
      i(t.files), At(t)
    }),
    At(document.getElementById(this.fileInputId)),
    document.body.appendChild(t),
    t.click()
  }
}
const Me = {
  removeBlankTableCells: !1,
  tableCellSeparator: ' | ',
  tableRowSeparator: `
`
}
const Dt = {
  bold: {
    tagName: 'strong',
    inheritable: !0,
    parser (i) {
      const t = window.getComputedStyle(i)
      return t.fontWeight === 'bold' || t.fontWeight >= 600
    }
  },
  italic: {
    tagName: 'em',
    inheritable: !0,
    parser: (i) => window.getComputedStyle(i).fontStyle === 'italic'
  },
  href: {
    groupTagName: 'a',
    parser (i) {
      const t = 'a:not('.concat(Rt, ')')
      const e = i.closest(t)
      if (e) return e.getAttribute('href')
    }
  },
  strike: { tagName: 'del', inheritable: !0 },
  frozen: { style: { backgroundColor: 'highlight' } }
}
const Fr = {
  getDefaultHTML: () =>
        `<div class="trix-button-row">
      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="`
          .concat(m.bold, '" tabindex="-1">')
          .concat(
            m.bold,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="`
          )
          .concat(m.italic, '" tabindex="-1">')
          .concat(
            m.italic,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="`
          )
          .concat(m.strike, '" tabindex="-1">')
          .concat(
            m.strike,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="`
          )
          .concat(m.link, '" tabindex="-1">')
          .concat(
            m.link,
                `</button>
      </span>

      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="`
          )
          .concat(m.heading1, '" tabindex="-1">')
          .concat(
            m.heading1,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="`
          )
          .concat(m.quote, '" tabindex="-1">')
          .concat(
            m.quote,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="`
          )
          .concat(m.code, '" tabindex="-1">')
          .concat(
            m.code,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="`
          )
          .concat(m.bullets, '" tabindex="-1">')
          .concat(
            m.bullets,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="`
          )
          .concat(m.numbers, '" tabindex="-1">')
          .concat(
            m.numbers,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="`
          )
          .concat(m.outdent, '" tabindex="-1">')
          .concat(
            m.outdent,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="`
          )
          .concat(m.indent, '" tabindex="-1">')
          .concat(
            m.indent,
                `</button>
      </span>

      <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="`
          )
          .concat(m.attachFiles, '" tabindex="-1">')
          .concat(
            m.attachFiles,
                `</button>
      </span>

      <span class="trix-button-group-spacer"></span>

      <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">
        <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="`
          )
          .concat(m.undo, '" tabindex="-1">')
          .concat(
            m.undo,
                `</button>
        <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="`
          )
          .concat(m.redo, '" tabindex="-1">')
          .concat(
            m.redo,
                `</button>
      </span>
    </div>

    <div class="trix-dialogs" data-trix-dialogs>
      <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">
        <div class="trix-dialog__link-fields">
          <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="`
          )
          .concat(m.urlPlaceholder, '" aria-label="')
          .concat(
            m.url,
                `" data-trix-validate-href required data-trix-input>
          <div class="trix-button-group">
            <input type="button" class="trix-button trix-button--dialog" value="`
          )
          .concat(
            m.link,
                `" data-trix-method="setAttribute">
            <input type="button" class="trix-button trix-button--dialog" value="`
          )
          .concat(
            m.unlink,
                `" data-trix-method="removeAttribute">
          </div>
        </div>
      </div>
    </div>`
          )
}
const $n = { interval: 5e3 }
const Ce = Object.freeze({
  __proto__: null,
  attachments: mi,
  blockAttributes: U,
  browser: xe,
  css: {
    attachment: 'attachment',
    attachmentCaption: 'attachment__caption',
    attachmentCaptionEditor: 'attachment__caption-editor',
    attachmentMetadata: 'attachment__metadata',
    attachmentMetadataContainer: 'attachment__metadata-container',
    attachmentName: 'attachment__name',
    attachmentProgress: 'attachment__progress',
    attachmentSize: 'attachment__size',
    attachmentToolbar: 'attachment__toolbar',
    attachmentGallery: 'attachment-gallery'
  },
  dompurify: Lr,
  fileSize: Dr,
  input: bi,
  keyNames: {
    8: 'backspace',
    9: 'tab',
    13: 'return',
    27: 'escape',
    37: 'left',
    39: 'right',
    46: 'delete',
    68: 'd',
    72: 'h',
    79: 'o'
  },
  lang: m,
  parser: Me,
  textAttributes: Dt,
  toolbar: Fr,
  undo: $n
})
const R = class {
  static proxyMethod (t) {
    const { name: e, toMethod: n, toProperty: r, optional: o } = Ao(t)
    this.prototype[e] = function () {
      let s, l
      let c, u
      return (
        n
          ? (l = o
              ? (c = this[n]) === null || c === void 0
                  ? void 0
                  : c.call(this)
              : this[n]())
          : r && (l = this[r]),
        o
          ? ((s = (u = l) === null || u === void 0 ? void 0 : u[e]),
            s ? Xi.call(s, l, arguments) : void 0)
          : ((s = l[e]), Xi.call(s, l, arguments))
      )
    }
  }
}
var Ao = function (i) {
  const t = i.match(yo)
  if (!t) {
    throw new Error("can't parse @proxyMethod expression: ".concat(i))
  }
  const e = { name: t[4] }
  return (
    t[2] != null ? (e.toMethod = t[1]) : (e.toProperty = t[1]),
    t[3] != null && (e.optional = !0),
    e
  )
}
var { apply: Xi } = Function.prototype
var yo = new RegExp('^(.+?)(\\(\\))?(\\?)?\\.(.+?)$')
let Tn
let wn
let Ln
const Nt = class extends R {
  static box () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ''
    return t instanceof this ? t : this.fromUCS2String(t?.toString())
  }

  static fromUCS2String (t) {
    return new this(t, Xn(t))
  }

  static fromCodepoints (t) {
    return new this(Zn(t), t)
  }

  constructor (t, e) {
    super(...arguments),
    (this.ucs2String = t),
    (this.codepoints = e),
    (this.length = this.codepoints.length),
    (this.ucs2Length = this.ucs2String.length)
  }

  offsetToUCS2Offset (t) {
    return Zn(this.codepoints.slice(0, Math.max(0, t))).length
  }

  offsetFromUCS2Offset (t) {
    return Xn(this.ucs2String.slice(0, Math.max(0, t))).length
  }

  slice () {
    return this.constructor.fromCodepoints(
      this.codepoints.slice(...arguments)
    )
  }

  charAt (t) {
    return this.slice(t, t + 1)
  }

  isEqualTo (t) {
    return this.constructor.box(t).ucs2String === this.ucs2String
  }

  toJSON () {
    return this.ucs2String
  }

  getCacheKey () {
    return this.ucs2String
  }

  toString () {
    return this.ucs2String
  }
}
const xo =
    ((Tn = Array.from) === null || Tn === void 0
      ? void 0
      : Tn.call(Array, '\u{1F47C}').length) === 1
const Co =
    ((wn = ' '.codePointAt) === null || wn === void 0
      ? void 0
      : wn.call(' ', 0)) != null
const Eo =
    ((Ln = String.fromCodePoint) === null || Ln === void 0
      ? void 0
      : Ln.call(String, 32, 128124)) === ' \u{1F47C}'
let Xn
let Zn;
(Xn =
    xo && Co
      ? (i) => Array.from(i).map((t) => t.codePointAt(0))
      : function (i) {
        const t = []
        let e = 0
        const { length: n } = i
        for (; e < n;) {
          let r = i.charCodeAt(e++)
          if (r >= 55296 && r <= 56319 && e < n) {
            const o = i.charCodeAt(e++);
            (64512 & o) == 56320
              ? (r = ((1023 & r) << 10) + (1023 & o) + 65536)
              : e--
          }
          t.push(r)
        }
        return t
      }),
(Zn = Eo
  ? (i) => String.fromCodePoint(...Array.from(i || []))
  : function (i) {
    return (() => {
      const t = []
      return (
        Array.from(i).forEach((e) => {
          let n = ''
          e > 65535 &&
                              ((e -= 65536),
                              (n += String.fromCharCode(
                                ((e >>> 10) & 1023) | 55296
                              )),
                              (e = 56320 | (1023 & e))),
          t.push(n + String.fromCharCode(e))
        }),
        t
      )
    })().join('')
  })
let So = 0
const ht = class extends R {
  static fromJSONString (t) {
    return this.fromJSON(JSON.parse(t))
  }

  constructor () {
    super(...arguments), (this.id = ++So)
  }

  hasSameConstructorAs (t) {
    return this.constructor === t?.constructor
  }

  isEqualTo (t) {
    return this === t
  }

  inspect () {
    const t = []
    const e = this.contentsForInspection() || {}
    for (const n in e) {
      const r = e[n]
      t.push(''.concat(n, '=').concat(r))
    }
    return '#<'
      .concat(this.constructor.name, ':')
      .concat(this.id)
      .concat(t.length ? ' '.concat(t.join(', ')) : '', '>')
  }

  contentsForInspection () {}

  toJSONString () {
    return JSON.stringify(this)
  }

  toUTF16String () {
    return Nt.box(this)
  }

  getCacheKey () {
    return this.id.toString()
  }
}
const It = function () {
  const i =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
  const t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []
  if (i.length !== t.length) return !1
  for (let e = 0; e < i.length; e++) if (i[e] !== t[e]) return !1
  return !0
}
const vi = function (i) {
  const t = i.slice(0)
  for (
    var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
    r < e;
    r++
  ) {
    n[r - 1] = arguments[r]
  }
  return t.splice(...n), t
}
const ko =
    /[\u05BE\u05C0\u05C3\u05D0-\u05EA\u05F0-\u05F4\u061B\u061F\u0621-\u063A\u0640-\u064A\u066D\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D5\u06E5\u06E6\u200F\u202B\u202E\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE72\uFE74\uFE76-\uFEFC]/
const Ro = (function () {
  const i = p('input', { dir: 'auto', name: 'x', dirName: 'x.dir' })
  const t = p('textarea', { dir: 'auto', name: 'y', dirName: 'y.dir' })
  const e = p('form')
  e.appendChild(i), e.appendChild(t)
  const n = (function () {
    try {
      return new FormData(e).has(t.dirName)
    } catch {
      return !1
    }
  })()
  const r = (function () {
    try {
      return i.matches(':dir(ltr),:dir(rtl)')
    } catch {
      return !1
    }
  })()
  return n
    ? function (o) {
      return (t.value = o), new FormData(e).get(t.dirName)
    }
    : r
      ? function (o) {
        return (i.value = o), i.matches(':dir(rtl)') ? 'rtl' : 'ltr'
      }
      : function (o) {
        const s = o.trim().charAt(0)
        return ko.test(s) ? 'rtl' : 'ltr'
      }
})()
let Dn = null
let Nn = null
let In = null
let De = null
const Qn = () => (Dn || (Dn = wo().concat(To())), Dn)
const L = (i) => U[i]
var To = () => (Nn || (Nn = Object.keys(U)), Nn)
const ti = (i) => Dt[i]
var wo = () => (In || (In = Object.keys(Dt)), In)
const Pr = function (i, t) {
  Lo(i).textContent = t.replace(/%t/g, i)
}
var Lo = function (i) {
  const t = document.createElement('style')
  t.setAttribute('type', 'text/css'),
  t.setAttribute('data-tag-name', i.toLowerCase())
  const e = Do()
  return (
    e && t.setAttribute('nonce', e),
    document.head.insertBefore(t, document.head.firstChild),
    t
  )
}
var Do = function () {
  const i = Zi('trix-csp-nonce') || Zi('csp-nonce')
  if (i) {
    const { nonce: t, content: e } = i
    return t == '' ? e : t
  }
}
var Zi = (i) => document.head.querySelector('meta[name='.concat(i, ']'))
const Qi = { 'application/x-trix-feature-detection': 'test' }
const Mr = function (i) {
  const t = i.getData('text/plain')
  const e = i.getData('text/html')
  if (!t || !e) return t?.length
  {
    const { body: n } = new DOMParser().parseFromString(e, 'text/html')
    if (n.textContent === t) return !n.querySelector('*')
  }
}
const Br = /Mac|^iP/.test(navigator.platform)
  ? (i) => i.metaKey
  : (i) => i.ctrlKey
const Ai = (i) => setTimeout(i, 1)
const _r = function () {
  const i =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
  const t = {}
  for (const e in i) {
    const n = i[e]
    t[e] = n
  }
  return t
}
const Zt = function () {
  const i =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
  const t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  if (Object.keys(i).length !== Object.keys(t).length) return !1
  for (const e in i) if (i[e] !== t[e]) return !1
  return !0
}
const y = function (i) {
  if (i != null) {
    return (
      Array.isArray(i) || (i = [i, i]),
      [tr(i[0]), tr(i[1] != null ? i[1] : i[0])]
    )
  }
}
const ut = function (i) {
  if (i == null) return
  const [t, e] = y(i)
  return ei(t, e)
}
const We = function (i, t) {
  if (i == null || t == null) return
  const [e, n] = y(i)
  const [r, o] = y(t)
  return ei(e, r) && ei(n, o)
}
var tr = function (i) {
  return typeof i === 'number' ? i : _r(i)
}
var ei = function (i, t) {
  return typeof i === 'number' ? i === t : Zt(i, t)
}
const Ue = class extends R {
  constructor () {
    super(...arguments),
    (this.update = this.update.bind(this)),
    (this.selectionManagers = [])
  }

  start () {
    this.started ||
            ((this.started = !0),
            document.addEventListener('selectionchange', this.update, !0))
  }

  stop () {
    if (this.started) {
      return (
        (this.started = !1),
        document.removeEventListener('selectionchange', this.update, !0)
      )
    }
  }

  registerSelectionManager (t) {
    if (!this.selectionManagers.includes(t)) {
      return this.selectionManagers.push(t), this.start()
    }
  }

  unregisterSelectionManager (t) {
    if (
      ((this.selectionManagers = this.selectionManagers.filter(
        (e) => e !== t
      )),
      this.selectionManagers.length === 0)
    ) {
      return this.stop()
    }
  }

  notifySelectionManagersOfSelectionChange () {
    return this.selectionManagers.map((t) => t.selectionDidChange())
  }

  update () {
    this.notifySelectionManagersOfSelectionChange()
  }

  reset () {
    this.update()
  }
}
const Ot = new Ue()
const jr = function () {
  const i = window.getSelection()
  if (i.rangeCount > 0) return i
}
const pe = function () {
  let i
  const t = (i = jr()) === null || i === void 0 ? void 0 : i.getRangeAt(0)
  if (t && !No(t)) return t
}
const Wr = function (i) {
  const t = window.getSelection()
  return t.removeAllRanges(), t.addRange(i), Ot.update()
}
var No = (i) => er(i.startContainer) || er(i.endContainer)
var er = (i) => !Object.getPrototypeOf(i)
const he = (i) =>
  i
    .replace(new RegExp(''.concat(ln), 'g'), '')
    .replace(new RegExp(''.concat(ft), 'g'), ' ')
const yi = new RegExp('[^\\S'.concat(ft, ']'))
const xi = (i) =>
  i
    .replace(new RegExp(''.concat(yi.source), 'g'), ' ')
    .replace(/\ {2,}/g, ' ')
const nr = function (i, t) {
  if (i.isEqualTo(t)) return ['', '']
  const e = On(i, t)
  const { length: n } = e.utf16String
  let r
  if (n) {
    const { offset: o } = e
    const s = i.codepoints.slice(0, o).concat(i.codepoints.slice(o + n))
    r = On(t, Nt.fromCodepoints(s))
  } else r = On(t, i)
  return [e.utf16String.toString(), r.utf16String.toString()]
}
var On = function (i, t) {
  let e = 0
  let n = i.length
  let r = t.length
  for (; e < n && i.charAt(e).isEqualTo(t.charAt(e));) e++
  for (; n > e + 1 && i.charAt(n - 1).isEqualTo(t.charAt(r - 1));) {
    n--, r--
  }
  return { utf16String: i.slice(e, n), offset: e }
}
const X = class i extends ht {
  static fromCommonAttributesOfObjects () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    if (!t.length) return new this()
    let e = oe(t[0])
    let n = e.getKeys()
    return (
      t.slice(1).forEach((r) => {
        (n = e.getKeysCommonToHash(oe(r))), (e = e.slice(n))
      }),
      e
    )
  }

  static box (t) {
    return oe(t)
  }

  constructor () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    super(...arguments), (this.values = Be(t))
  }

  add (t, e) {
    return this.merge(Io(t, e))
  }

  remove (t) {
    return new i(Be(this.values, t))
  }

  get (t) {
    return this.values[t]
  }

  has (t) {
    return t in this.values
  }

  merge (t) {
    return new i(Oo(this.values, Fo(t)))
  }

  slice (t) {
    const e = {}
    return (
      Array.from(t).forEach((n) => {
        this.has(n) && (e[n] = this.values[n])
      }),
      new i(e)
    )
  }

  getKeys () {
    return Object.keys(this.values)
  }

  getKeysCommonToHash (t) {
    return (
      (t = oe(t)),
      this.getKeys().filter((e) => this.values[e] === t.values[e])
    )
  }

  isEqualTo (t) {
    return It(this.toArray(), oe(t).toArray())
  }

  isEmpty () {
    return this.getKeys().length === 0
  }

  toArray () {
    if (!this.array) {
      const t = []
      for (const e in this.values) {
        const n = this.values[e]
        t.push(t.push(e, n))
      }
      this.array = t.slice(0)
    }
    return this.array
  }

  toObject () {
    return Be(this.values)
  }

  toJSON () {
    return this.toObject()
  }

  contentsForInspection () {
    return { values: JSON.stringify(this.values) }
  }
}
var Io = function (i, t) {
  const e = {}
  return (e[i] = t), e
}
var Oo = function (i, t) {
  const e = Be(i)
  for (const n in t) {
    const r = t[n]
    e[n] = r
  }
  return e
}
var Be = function (i, t) {
  const e = {}
  return (
    Object.keys(i)
      .sort()
      .forEach((n) => {
        n !== t && (e[n] = i[n])
      }),
    e
  )
}
var oe = function (i) {
  return i instanceof X ? i : new X(i)
}
var Fo = function (i) {
  return i instanceof X ? i.values : i
}
const be = class {
  static groupObjects () {
    let t
    const e =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    let { depth: n, asTree: r } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    r && n == null && (n = 0)
    const o = []
    return (
      Array.from(e).forEach((s) => {
        let l
        if (t) {
          let c, u, d
          if (
            (c = s.canBeGrouped) !== null &&
                        c !== void 0 &&
                        c.call(s, n) &&
                        (u = (d = t[t.length - 1]).canBeGroupedWith) !== null &&
                        u !== void 0 &&
                        u.call(d, s, n)
          ) {
            return void t.push(s)
          }
          o.push(new this(t, { depth: n, asTree: r })), (t = null)
        }
        (l = s.canBeGrouped) !== null && l !== void 0 && l.call(s, n)
          ? (t = [s])
          : o.push(s)
      }),
      t && o.push(new this(t, { depth: n, asTree: r })),
      o
    )
  }

  constructor () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    const { depth: e, asTree: n } =
            arguments.length > 1 ? arguments[1] : void 0;
    (this.objects = t),
    n &&
                ((this.depth = e),
                (this.objects = this.constructor.groupObjects(this.objects, {
                  asTree: n,
                  depth: this.depth + 1
                })))
  }

  getObjects () {
    return this.objects
  }

  getDepth () {
    return this.depth
  }

  getCacheKey () {
    const t = ['objectGroup']
    return (
      Array.from(this.getObjects()).forEach((e) => {
        t.push(e.getCacheKey())
      }),
      t.join('/')
    )
  }
}
const ni = class extends R {
  constructor () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    super(...arguments),
    (this.objects = {}),
    Array.from(t).forEach((e) => {
      const n = JSON.stringify(e)
      this.objects[n] == null && (this.objects[n] = e)
    })
  }

  find (t) {
    const e = JSON.stringify(t)
    return this.objects[e]
  }
}
const ii = class {
  constructor (t) {
    this.reset(t)
  }

  add (t) {
    const e = ir(t)
    this.elements[e] = t
  }

  remove (t) {
    const e = ir(t)
    const n = this.elements[e]
    if (n) return delete this.elements[e], n
  }

  reset () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    return (
      (this.elements = {}),
      Array.from(t).forEach((e) => {
        this.add(e)
      }),
      t
    )
  }
}
var ir = (i) => i.dataset.trixStoreKey
const Ht = class extends R {
  isPerforming () {
    return this.performing === !0
  }

  hasPerformed () {
    return this.performed === !0
  }

  hasSucceeded () {
    return this.performed && this.succeeded
  }

  hasFailed () {
    return this.performed && !this.succeeded
  }

  getPromise () {
    return (
      this.promise ||
                (this.promise = new Promise(
                  (t, e) => (
                    (this.performing = !0),
                    this.perform((n, r) => {
                      (this.succeeded = n),
                      (this.performing = !1),
                      (this.performed = !0),
                      this.succeeded ? t(r) : e(r)
                    })
                  )
                )),
      this.promise
    )
  }

  perform (t) {
    return t(!1)
  }

  release () {
    let t, e;
    (t = this.promise) === null ||
            t === void 0 ||
            (e = t.cancel) === null ||
            e === void 0 ||
            e.call(t),
    (this.promise = null),
    (this.performing = null),
    (this.performed = null),
    (this.succeeded = null)
  }
}
Ht.proxyMethod('getPromise().then'), Ht.proxyMethod('getPromise().catch')
const dt = class extends R {
  constructor (t) {
    const e =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(...arguments),
    (this.object = t),
    (this.options = e),
    (this.childViews = []),
    (this.rootView = this)
  }

  getNodes () {
    return (
      this.nodes || (this.nodes = this.createNodes()),
      this.nodes.map((t) => t.cloneNode(!0))
    )
  }

  invalidate () {
    let t
    return (
      (this.nodes = null),
      (this.childViews = []),
      (t = this.parentView) === null || t === void 0
        ? void 0
        : t.invalidate()
    )
  }

  invalidateViewForObject (t) {
    let e
    return (e = this.findViewForObject(t)) === null || e === void 0
      ? void 0
      : e.invalidate()
  }

  findOrCreateCachedChildView (t, e, n) {
    let r = this.getCachedViewForObject(e)
    return (
      r
        ? this.recordChildView(r)
        : ((r = this.createChildView(...arguments)),
          this.cacheViewForObject(r, e)),
      r
    )
  }

  createChildView (t, e) {
    const n =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    e instanceof be && ((n.viewClass = t), (t = ri))
    const r = new t(e, n)
    return this.recordChildView(r)
  }

  recordChildView (t) {
    return (
      (t.parentView = this),
      (t.rootView = this.rootView),
      this.childViews.push(t),
      t
    )
  }

  getAllChildViews () {
    let t = []
    return (
      this.childViews.forEach((e) => {
        t.push(e), (t = t.concat(e.getAllChildViews()))
      }),
      t
    )
  }

  findElement () {
    return this.findElementForObject(this.object)
  }

  findElementForObject (t) {
    const e = t?.id
    if (e) {
      return this.rootView.element.querySelector(
        "[data-trix-id='".concat(e, "']")
      )
    }
  }

  findViewForObject (t) {
    for (const e of this.getAllChildViews()) if (e.object === t) return e
  }

  getViewCache () {
    return this.rootView !== this
      ? this.rootView.getViewCache()
      : this.isViewCachingEnabled()
        ? (this.viewCache || (this.viewCache = {}), this.viewCache)
        : void 0
  }

  isViewCachingEnabled () {
    return this.shouldCacheViews !== !1
  }

  enableViewCaching () {
    this.shouldCacheViews = !0
  }

  disableViewCaching () {
    this.shouldCacheViews = !1
  }

  getCachedViewForObject (t) {
    let e
    return (e = this.getViewCache()) === null || e === void 0
      ? void 0
      : e[t.getCacheKey()]
  }

  cacheViewForObject (t, e) {
    const n = this.getViewCache()
    n && (n[e.getCacheKey()] = t)
  }

  garbageCollectCachedViews () {
    const t = this.getViewCache()
    if (t) {
      const e = this.getAllChildViews()
        .concat(this)
        .map((n) => n.object.getCacheKey())
      for (const n in t) e.includes(n) || delete t[n]
    }
  }
}
var ri = class extends dt {
  constructor () {
    super(...arguments),
    (this.objectGroup = this.object),
    (this.viewClass = this.options.viewClass),
    delete this.options.viewClass
  }

  getChildViews () {
    return (
      this.childViews.length ||
                Array.from(this.objectGroup.getObjects()).forEach((t) => {
                  this.findOrCreateCachedChildView(
                    this.viewClass,
                    t,
                    this.options
                  )
                }),
      this.childViews
    )
  }

  createNodes () {
    const t = this.createContainerElement()
    return (
      this.getChildViews().forEach((e) => {
        Array.from(e.getNodes()).forEach((n) => {
          t.appendChild(n)
        })
      }),
      [t]
    )
  }

  createContainerElement () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : this.objectGroup.getDepth()
    return this.getChildViews()[0].createContainerElement(t)
  }
}
const {
  entries: Ur,
  setPrototypeOf: rr,
  isFrozen: Po,
  getPrototypeOf: Mo,
  getOwnPropertyDescriptor: Bo
} = Object
let { freeze: z, seal: G, create: Vr } = Object
let { apply: oi, construct: si } = typeof Reflect < 'u' && Reflect
z ||
    (z = function (i) {
      return i
    }),
G ||
        (G = function (i) {
          return i
        }),
oi ||
        (oi = function (i, t, e) {
          return i.apply(t, e)
        }),
si ||
        (si = function (i, t) {
          return new i(...t)
        })
const Ne = H(Array.prototype.forEach)
const _o = H(Array.prototype.lastIndexOf)
const or = H(Array.prototype.pop)
const se = H(Array.prototype.push)
const jo = H(Array.prototype.splice)
const _e = H(String.prototype.toLowerCase)
const Fn = H(String.prototype.toString)
const sr = H(String.prototype.match)
const ae = H(String.prototype.replace)
const Wo = H(String.prototype.indexOf)
const Uo = H(String.prototype.trim)
const Y = H(Object.prototype.hasOwnProperty)
const j = H(RegExp.prototype.test)
const le =
    ((ar = TypeError),
    function () {
      for (var i = arguments.length, t = new Array(i), e = 0; e < i; e++) {
        t[e] = arguments[e]
      }
      return si(ar, t)
    })
let ar

function H (i) {
  return function (t) {
    t instanceof RegExp && (t.lastIndex = 0)
    for (
      var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
      r < e;
      r++
    ) {
      n[r - 1] = arguments[r]
    }
    return oi(i, t, n)
  }
}

function b (i, t) {
  const e =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _e
  rr && rr(i, null)
  let n = t.length
  for (; n--;) {
    let r = t[n]
    if (typeof r === 'string') {
      const o = e(r)
      o !== r && (Po(t) || (t[n] = o), (r = o))
    }
    i[r] = !0
  }
  return i
}

function Vo (i) {
  for (let t = 0; t < i.length; t++) Y(i, t) || (i[t] = null)
  return i
}

function St (i) {
  const t = Vr(null)
  for (const [e, n] of Ur(i)) {
    Y(i, e) &&
            (Array.isArray(n)
              ? (t[e] = Vo(n))
              : n && typeof n === 'object' && n.constructor === Object
                ? (t[e] = St(n))
                : (t[e] = n))
  }
  return t
}

function ce (i, t) {
  for (; i !== null;) {
    const e = Bo(i, t)
    if (e) {
      if (e.get) return H(e.get)
      if (typeof e.value === 'function') return H(e.value)
    }
    i = Mo(i)
  }
  return function () {
    return null
  }
}

const lr = z([
  'a',
  'abbr',
  'acronym',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'bdi',
  'bdo',
  'big',
  'blink',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'center',
  'cite',
  'code',
  'col',
  'colgroup',
  'content',
  'data',
  'datalist',
  'dd',
  'decorator',
  'del',
  'details',
  'dfn',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'element',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'font',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meter',
  'nav',
  'nobr',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'section',
  'select',
  'shadow',
  'small',
  'source',
  'spacer',
  'span',
  'strike',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'track',
  'tt',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
])
const Pn = z([
  'svg',
  'a',
  'altglyph',
  'altglyphdef',
  'altglyphitem',
  'animatecolor',
  'animatemotion',
  'animatetransform',
  'circle',
  'clippath',
  'defs',
  'desc',
  'ellipse',
  'filter',
  'font',
  'g',
  'glyph',
  'glyphref',
  'hkern',
  'image',
  'line',
  'lineargradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialgradient',
  'rect',
  'stop',
  'style',
  'switch',
  'symbol',
  'text',
  'textpath',
  'title',
  'tref',
  'tspan',
  'view',
  'vkern'
])
const Mn = z([
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence'
])
const zo = z([
  'animate',
  'color-profile',
  'cursor',
  'discard',
  'font-face',
  'font-face-format',
  'font-face-name',
  'font-face-src',
  'font-face-uri',
  'foreignobject',
  'hatch',
  'hatchpath',
  'mesh',
  'meshgradient',
  'meshpatch',
  'meshrow',
  'missing-glyph',
  'script',
  'set',
  'solidcolor',
  'unknown',
  'use'
])
const Bn = z([
  'math',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mglyph',
  'mi',
  'mlabeledtr',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mspace',
  'msqrt',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'mprescripts'
])
const Ho = z([
  'maction',
  'maligngroup',
  'malignmark',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'mstack',
  'msline',
  'msrow',
  'semantics',
  'annotation',
  'annotation-xml',
  'mprescripts',
  'none'
])
const cr = z(['#text'])
const ur = z([
  'accept',
  'action',
  'align',
  'alt',
  'autocapitalize',
  'autocomplete',
  'autopictureinpicture',
  'autoplay',
  'background',
  'bgcolor',
  'border',
  'capture',
  'cellpadding',
  'cellspacing',
  'checked',
  'cite',
  'class',
  'clear',
  'color',
  'cols',
  'colspan',
  'controls',
  'controlslist',
  'coords',
  'crossorigin',
  'datetime',
  'decoding',
  'default',
  'dir',
  'disabled',
  'disablepictureinpicture',
  'disableremoteplayback',
  'download',
  'draggable',
  'enctype',
  'enterkeyhint',
  'face',
  'for',
  'headers',
  'height',
  'hidden',
  'high',
  'href',
  'hreflang',
  'id',
  'inputmode',
  'integrity',
  'ismap',
  'kind',
  'label',
  'lang',
  'list',
  'loading',
  'loop',
  'low',
  'max',
  'maxlength',
  'media',
  'method',
  'min',
  'minlength',
  'multiple',
  'muted',
  'name',
  'nonce',
  'noshade',
  'novalidate',
  'nowrap',
  'open',
  'optimum',
  'pattern',
  'placeholder',
  'playsinline',
  'popover',
  'popovertarget',
  'popovertargetaction',
  'poster',
  'preload',
  'pubdate',
  'radiogroup',
  'readonly',
  'rel',
  'required',
  'rev',
  'reversed',
  'role',
  'rows',
  'rowspan',
  'spellcheck',
  'scope',
  'selected',
  'shape',
  'size',
  'sizes',
  'span',
  'srclang',
  'start',
  'src',
  'srcset',
  'step',
  'style',
  'summary',
  'tabindex',
  'title',
  'translate',
  'type',
  'usemap',
  'valign',
  'value',
  'width',
  'wrap',
  'xmlns',
  'slot'
])
const _n = z([
  'accent-height',
  'accumulate',
  'additive',
  'alignment-baseline',
  'amplitude',
  'ascent',
  'attributename',
  'attributetype',
  'azimuth',
  'basefrequency',
  'baseline-shift',
  'begin',
  'bias',
  'by',
  'class',
  'clip',
  'clippathunits',
  'clip-path',
  'clip-rule',
  'color',
  'color-interpolation',
  'color-interpolation-filters',
  'color-profile',
  'color-rendering',
  'cx',
  'cy',
  'd',
  'dx',
  'dy',
  'diffuseconstant',
  'direction',
  'display',
  'divisor',
  'dur',
  'edgemode',
  'elevation',
  'end',
  'exponent',
  'fill',
  'fill-opacity',
  'fill-rule',
  'filter',
  'filterunits',
  'flood-color',
  'flood-opacity',
  'font-family',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-weight',
  'fx',
  'fy',
  'g1',
  'g2',
  'glyph-name',
  'glyphref',
  'gradientunits',
  'gradienttransform',
  'height',
  'href',
  'id',
  'image-rendering',
  'in',
  'in2',
  'intercept',
  'k',
  'k1',
  'k2',
  'k3',
  'k4',
  'kerning',
  'keypoints',
  'keysplines',
  'keytimes',
  'lang',
  'lengthadjust',
  'letter-spacing',
  'kernelmatrix',
  'kernelunitlength',
  'lighting-color',
  'local',
  'marker-end',
  'marker-mid',
  'marker-start',
  'markerheight',
  'markerunits',
  'markerwidth',
  'maskcontentunits',
  'maskunits',
  'max',
  'mask',
  'media',
  'method',
  'mode',
  'min',
  'name',
  'numoctaves',
  'offset',
  'operator',
  'opacity',
  'order',
  'orient',
  'orientation',
  'origin',
  'overflow',
  'paint-order',
  'path',
  'pathlength',
  'patterncontentunits',
  'patterntransform',
  'patternunits',
  'points',
  'preservealpha',
  'preserveaspectratio',
  'primitiveunits',
  'r',
  'rx',
  'ry',
  'radius',
  'refx',
  'refy',
  'repeatcount',
  'repeatdur',
  'restart',
  'result',
  'rotate',
  'scale',
  'seed',
  'shape-rendering',
  'slope',
  'specularconstant',
  'specularexponent',
  'spreadmethod',
  'startoffset',
  'stddeviation',
  'stitchtiles',
  'stop-color',
  'stop-opacity',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke',
  'stroke-width',
  'style',
  'surfacescale',
  'systemlanguage',
  'tabindex',
  'tablevalues',
  'targetx',
  'targety',
  'transform',
  'transform-origin',
  'text-anchor',
  'text-decoration',
  'text-rendering',
  'textlength',
  'type',
  'u1',
  'u2',
  'unicode',
  'values',
  'viewbox',
  'visibility',
  'version',
  'vert-adv-y',
  'vert-origin-x',
  'vert-origin-y',
  'width',
  'word-spacing',
  'wrap',
  'writing-mode',
  'xchannelselector',
  'ychannelselector',
  'x',
  'x1',
  'x2',
  'xmlns',
  'y',
  'y1',
  'y2',
  'z',
  'zoomandpan'
])
const hr = z([
  'accent',
  'accentunder',
  'align',
  'bevelled',
  'close',
  'columnsalign',
  'columnlines',
  'columnspan',
  'denomalign',
  'depth',
  'dir',
  'display',
  'displaystyle',
  'encoding',
  'fence',
  'frame',
  'height',
  'href',
  'id',
  'largeop',
  'length',
  'linethickness',
  'lspace',
  'lquote',
  'mathbackground',
  'mathcolor',
  'mathsize',
  'mathvariant',
  'maxsize',
  'minsize',
  'movablelimits',
  'notation',
  'numalign',
  'open',
  'rowalign',
  'rowlines',
  'rowspacing',
  'rowspan',
  'rspace',
  'rquote',
  'scriptlevel',
  'scriptminsize',
  'scriptsizemultiplier',
  'selection',
  'separator',
  'separators',
  'stretchy',
  'subscriptshift',
  'supscriptshift',
  'symmetric',
  'voffset',
  'width',
  'xmlns'
])
const Ie = z([
  'xlink:href',
  'xml:id',
  'xlink:title',
  'xml:space',
  'xmlns:xlink'
])
const qo = G(/\{\{[\w\W]*|[\w\W]*\}\}/gm)
const Jo = G(/<%[\w\W]*|[\w\W]*%>/gm)
const Ko = G(/\$\{[\w\W]*/gm)
const Go = G(/^data-[\-\w.\u00B7-\uFFFF]+$/)
const Yo = G(/^aria-[\-\w]+$/)
const zr = G(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
)
const $o = G(/^(?:\w+script|data):/i)
const Xo = G(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g)
const Hr = G(/^html$/i)
const Zo = G(/^[a-z][.\w]*(-[.\w]+)+$/i)
const dr = Object.freeze({
  __proto__: null,
  ARIA_ATTR: Yo,
  ATTR_WHITESPACE: Xo,
  CUSTOM_ELEMENT: Zo,
  DATA_ATTR: Go,
  DOCTYPE_NAME: Hr,
  ERB_EXPR: Jo,
  IS_ALLOWED_URI: zr,
  IS_SCRIPT_OR_DATA: $o,
  MUSTACHE_EXPR: qo,
  TMPLIT_EXPR: Ko
})
const Qo = 1
const ts = 3
const es = 7
const ns = 8
const is = 9
const rs = function () {
  return typeof window > 'u' ? null : window
}
const Ve = (function i () {
  const t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : rs()
  const e = (a) => i(a)
  if (
    ((e.version = '3.2.5'),
    (e.removed = []),
    !t || !t.document || t.document.nodeType !== is || !t.Element)
  ) {
    return (e.isSupported = !1), e
  }
  let { document: n } = t
  const r = n
  const o = r.currentScript
  const {
    DocumentFragment: s,
    HTMLTemplateElement: l,
    Node: c,
    Element: u,
    NodeFilter: d,
    NamedNodeMap: C = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: T,
    DOMParser: J,
    trustedTypes: Q
  } = t
  const M = u.prototype
  const mt = ce(M, 'cloneNode')
  const yt = ce(M, 'remove')
  const Qt = ce(M, 'nextSibling')
  const te = ce(M, 'childNodes')
  const F = ce(M, 'parentNode')
  if (typeof l === 'function') {
    const a = n.createElement('template')
    a.content && a.content.ownerDocument && (n = a.content.ownerDocument)
  }
  let k
  let rt = ''
  const {
    implementation: xt,
    createNodeIterator: eo,
    createDocumentFragment: no,
    getElementsByTagName: io
  } = n
  const { importNode: ro } = r
  let B = {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  }
  e.isSupported =
        typeof Ur === 'function' &&
        typeof F === 'function' &&
        xt &&
        xt.createHTMLDocument !== void 0
  const {
    MUSTACHE_EXPR: un,
    ERB_EXPR: hn,
    TMPLIT_EXPR: dn,
    DATA_ATTR: oo,
    ARIA_ATTR: so,
    IS_SCRIPT_OR_DATA: ao,
    ATTR_WHITESPACE: Ei,
    CUSTOM_ELEMENT: lo
  } = dr
  let { IS_ALLOWED_URI: Si } = dr
  let N = null
  const ki = b({}, [...lr, ...Pn, ...Mn, ...Bn, ...cr])
  let O = null
  const Ri = b({}, [...ur, ..._n, ...hr, ...Ie])
  let w = Object.seal(
    Vr(null, {
      tagNameCheck: {
        writable: !0,
        configurable: !1,
        enumerable: !0,
        value: null
      },
      attributeNameCheck: {
        writable: !0,
        configurable: !1,
        enumerable: !0,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: !0,
        configurable: !1,
        enumerable: !0,
        value: !1
      }
    })
  )
  let ee = null
  let gn = null
  let Ti = !0
  let mn = !0
  let wi = !1
  let Li = !0
  let Pt = !1
  let pn = !0
  let Ct = !1
  let fn = !1
  let bn = !1
  let Mt = !1
  let Ee = !1
  let Se = !1
  let Di = !0
  let Ni = !1
  let vn = !0
  let ne = !1
  let Bt = {}
  let _t = null
  const Ii = b({}, [
    'annotation-xml',
    'audio',
    'colgroup',
    'desc',
    'foreignobject',
    'head',
    'iframe',
    'math',
    'mi',
    'mn',
    'mo',
    'ms',
    'mtext',
    'noembed',
    'noframes',
    'noscript',
    'plaintext',
    'script',
    'style',
    'svg',
    'template',
    'thead',
    'title',
    'video',
    'xmp'
  ])
  let Oi = null
  const Fi = b({}, ['audio', 'video', 'img', 'source', 'image', 'track'])
  let An = null
  const Pi = b({}, [
    'alt',
    'class',
    'for',
    'id',
    'label',
    'name',
    'pattern',
    'placeholder',
    'role',
    'summary',
    'title',
    'value',
    'style',
    'xmlns'
  ])
  const ke = 'http://www.w3.org/1998/Math/MathML'
  const Re = 'http://www.w3.org/2000/svg'
  const ot = 'http://www.w3.org/1999/xhtml'
  let jt = ot
  let yn = !1
  let xn = null
  const co = b({}, [ke, Re, ot], Fn)
  let Te = b({}, ['mi', 'mo', 'mn', 'ms', 'mtext'])
  let we = b({}, ['annotation-xml'])
  const uo = b({}, ['title', 'style', 'font', 'a', 'script'])
  let ie = null
  const ho = ['application/xhtml+xml', 'text/html']
  let I = null
  let Wt = null
  const go = n.createElement('form')
  const Mi = function (a) {
    return a instanceof RegExp || a instanceof Function
  }
  const Cn = function () {
    let a =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    if (!Wt || Wt !== a) {
      if (
        ((a && typeof a === 'object') || (a = {}),
        (a = St(a)),
        (ie =
                    ho.indexOf(a.PARSER_MEDIA_TYPE) === -1
                      ? 'text/html'
                      : a.PARSER_MEDIA_TYPE),
        (I = ie === 'application/xhtml+xml' ? Fn : _e),
        (N = Y(a, 'ALLOWED_TAGS') ? b({}, a.ALLOWED_TAGS, I) : ki),
        (O = Y(a, 'ALLOWED_ATTR') ? b({}, a.ALLOWED_ATTR, I) : Ri),
        (xn = Y(a, 'ALLOWED_NAMESPACES')
          ? b({}, a.ALLOWED_NAMESPACES, Fn)
          : co),
        (An = Y(a, 'ADD_URI_SAFE_ATTR')
          ? b(St(Pi), a.ADD_URI_SAFE_ATTR, I)
          : Pi),
        (Oi = Y(a, 'ADD_DATA_URI_TAGS')
          ? b(St(Fi), a.ADD_DATA_URI_TAGS, I)
          : Fi),
        (_t = Y(a, 'FORBID_CONTENTS')
          ? b({}, a.FORBID_CONTENTS, I)
          : Ii),
        (ee = Y(a, 'FORBID_TAGS') ? b({}, a.FORBID_TAGS, I) : {}),
        (gn = Y(a, 'FORBID_ATTR') ? b({}, a.FORBID_ATTR, I) : {}),
        (Bt = !!Y(a, 'USE_PROFILES') && a.USE_PROFILES),
        (Ti = a.ALLOW_ARIA_ATTR !== !1),
        (mn = a.ALLOW_DATA_ATTR !== !1),
        (wi = a.ALLOW_UNKNOWN_PROTOCOLS || !1),
        (Li = a.ALLOW_SELF_CLOSE_IN_ATTR !== !1),
        (Pt = a.SAFE_FOR_TEMPLATES || !1),
        (pn = a.SAFE_FOR_XML !== !1),
        (Ct = a.WHOLE_DOCUMENT || !1),
        (Mt = a.RETURN_DOM || !1),
        (Ee = a.RETURN_DOM_FRAGMENT || !1),
        (Se = a.RETURN_TRUSTED_TYPE || !1),
        (bn = a.FORCE_BODY || !1),
        (Di = a.SANITIZE_DOM !== !1),
        (Ni = a.SANITIZE_NAMED_PROPS || !1),
        (vn = a.KEEP_CONTENT !== !1),
        (ne = a.IN_PLACE || !1),
        (Si = a.ALLOWED_URI_REGEXP || zr),
        (jt = a.NAMESPACE || ot),
        (Te = a.MATHML_TEXT_INTEGRATION_POINTS || Te),
        (we = a.HTML_INTEGRATION_POINTS || we),
        (w = a.CUSTOM_ELEMENT_HANDLING || {}),
        a.CUSTOM_ELEMENT_HANDLING &&
                    Mi(a.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
                    (w.tagNameCheck = a.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
        a.CUSTOM_ELEMENT_HANDLING &&
                    Mi(a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
                    (w.attributeNameCheck =
                        a.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
        a.CUSTOM_ELEMENT_HANDLING &&
                    typeof a.CUSTOM_ELEMENT_HANDLING
                      .allowCustomizedBuiltInElements === 'boolean' &&
                    (w.allowCustomizedBuiltInElements =
                        a.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
        Pt && (mn = !1),
        Ee && (Mt = !0),
        Bt &&
                    ((N = b({}, cr)),
                    (O = []),
                    Bt.html === !0 && (b(N, lr), b(O, ur)),
                    Bt.svg === !0 && (b(N, Pn), b(O, _n), b(O, Ie)),
                    Bt.svgFilters === !0 && (b(N, Mn), b(O, _n), b(O, Ie)),
                    Bt.mathMl === !0 && (b(N, Bn), b(O, hr), b(O, Ie))),
        a.ADD_TAGS && (N === ki && (N = St(N)), b(N, a.ADD_TAGS, I)),
        a.ADD_ATTR && (O === Ri && (O = St(O)), b(O, a.ADD_ATTR, I)),
        a.ADD_URI_SAFE_ATTR && b(An, a.ADD_URI_SAFE_ATTR, I),
        a.FORBID_CONTENTS &&
                    (_t === Ii && (_t = St(_t)), b(_t, a.FORBID_CONTENTS, I)),
        vn && (N['#text'] = !0),
        Ct && b(N, ['html', 'head', 'body']),
        N.table && (b(N, ['tbody']), delete ee.tbody),
        a.TRUSTED_TYPES_POLICY)
      ) {
        if (typeof a.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
          throw le(
            'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
          )
        }
        if (
          typeof a.TRUSTED_TYPES_POLICY.createScriptURL !== 'function'
        ) {
          throw le(
            'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
          )
        }
        (k = a.TRUSTED_TYPES_POLICY), (rt = k.createHTML(''))
      } else {
        k === void 0 &&
                    (k = (function (g, h) {
                      if (
                        typeof g !== 'object' ||
                            typeof g.createPolicy !== 'function'
                      ) {
                        return null
                      }
                      let v = null
                      const A = 'data-tt-policy-suffix'
                      h && h.hasAttribute(A) && (v = h.getAttribute(A))
                      const f = 'dompurify' + (v ? '#' + v : '')
                      try {
                        return g.createPolicy(f, {
                          createHTML: (D) => D,
                          createScriptURL: (D) => D
                        })
                      } catch {
                        return (
                          console.warn(
                            'TrustedTypes policy ' +
                                        f +
                                        ' could not be created.'
                          ),
                          null
                        )
                      }
                    })(Q, o)),
        k !== null &&
                        typeof rt === 'string' &&
                        (rt = k.createHTML(''))
      }
      z && z(a), (Wt = a)
    }
  }
  const Bi = b({}, [...Pn, ...Mn, ...zo])
  const _i = b({}, [...Bn, ...Ho])
  const tt = function (a) {
    se(e.removed, { element: a })
    try {
      F(a).removeChild(a)
    } catch {
      yt(a)
    }
  }
  const Le = function (a, g) {
    try {
      se(e.removed, {
        attribute: g.getAttributeNode(a),
        from: g
      })
    } catch {
      se(e.removed, { attribute: null, from: g })
    }
    if ((g.removeAttribute(a), a === 'is')) {
      if (Mt || Ee) {
        try {
          tt(g)
        } catch {}
      } else {
        try {
          g.setAttribute(a, '')
        } catch {}
      }
    }
  }
  const ji = function (a) {
    let g = null
    let h = null
    if (bn) a = '<remove></remove>' + a
    else {
      const f = sr(a, /^[\r\n\t ]+/)
      h = f && f[0]
    }
    ie === 'application/xhtml+xml' &&
            jt === ot &&
            (a =
                '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
                a +
                '</body></html>')
    const v = k ? k.createHTML(a) : a
    if (jt === ot) {
      try {
        g = new J().parseFromString(v, ie)
      } catch {}
    }
    if (!g || !g.documentElement) {
      g = xt.createDocument(jt, 'template', null)
      try {
        g.documentElement.innerHTML = yn ? rt : v
      } catch {}
    }
    const A = g.body || g.documentElement
    return (
      a &&
                h &&
                A.insertBefore(n.createTextNode(h), A.childNodes[0] || null),
      jt === ot
        ? io.call(g, Ct ? 'html' : 'body')[0]
        : Ct
          ? g.documentElement
          : A
    )
  }
  const Wi = function (a) {
    return eo.call(
      a.ownerDocument || a,
      a,
      d.SHOW_ELEMENT |
                d.SHOW_COMMENT |
                d.SHOW_TEXT |
                d.SHOW_PROCESSING_INSTRUCTION |
                d.SHOW_CDATA_SECTION,
      null
    )
  }
  const En = function (a) {
    return (
      a instanceof T &&
            (typeof a.nodeName !== 'string' ||
                typeof a.textContent !== 'string' ||
                typeof a.removeChild !== 'function' ||
                !(a.attributes instanceof C) ||
                typeof a.removeAttribute !== 'function' ||
                typeof a.setAttribute !== 'function' ||
                typeof a.namespaceURI !== 'string' ||
                typeof a.insertBefore !== 'function' ||
                typeof a.hasChildNodes !== 'function')
    )
  }
  const Ui = function (a) {
    return typeof c === 'function' && a instanceof c
  }

  function st (a, g, h) {
    Ne(a, (v) => {
      v.call(e, g, h, Wt)
    })
  }

  const Vi = function (a) {
    let g = null
    if ((st(B.beforeSanitizeElements, a, null), En(a))) {
      return tt(a), !0
    }
    const h = I(a.nodeName)
    if (
      (st(B.uponSanitizeElement, a, {
        tagName: h,
        allowedTags: N
      }),
      (a.hasChildNodes() &&
                !Ui(a.firstElementChild) &&
                j(/<[/\w!]/g, a.innerHTML) &&
                j(/<[/\w!]/g, a.textContent)) ||
                a.nodeType === es ||
                (pn && a.nodeType === ns && j(/<[/\w]/g, a.data)))
    ) {
      return tt(a), !0
    }
    if (!N[h] || ee[h]) {
      if (
        !ee[h] &&
                Hi(h) &&
                ((w.tagNameCheck instanceof RegExp && j(w.tagNameCheck, h)) ||
                    (w.tagNameCheck instanceof Function && w.tagNameCheck(h)))
      ) {
        return !1
      }
      if (vn && !_t[h]) {
        const v = F(a) || a.parentNode
        const A = te(a) || a.childNodes
        if (A && v) {
          for (let f = A.length - 1; f >= 0; --f) {
            const D = mt(A[f], !0);
            (D.__removalCount = (a.__removalCount || 0) + 1),
            v.insertBefore(D, Qt(a))
          }
        }
      }
      return tt(a), !0
    }
    return a instanceof u &&
            !(function (v) {
              let A = F(v);
              (A && A.tagName) ||
                    (A = { namespaceURI: jt, tagName: 'template' })
              const f = _e(v.tagName)
              const D = _e(A.tagName)
              return (
                !!xn[v.namespaceURI] &&
                    (v.namespaceURI === Re
                      ? A.namespaceURI === ot
                        ? f === 'svg'
                        : A.namespaceURI === ke
                          ? f === 'svg' && (D === 'annotation-xml' || Te[D])
                          : !!Bi[f]
                      : v.namespaceURI === ke
                        ? A.namespaceURI === ot
                          ? f === 'math'
                          : A.namespaceURI === Re
                            ? f === 'math' && we[D]
                            : !!_i[f]
                        : v.namespaceURI === ot
                          ? !(A.namespaceURI === Re && !we[D]) &&
                              !(A.namespaceURI === ke && !Te[D]) &&
                              !_i[f] &&
                              (uo[f] || !Bi[f])
                          : !(
                              ie !== 'application/xhtml+xml' ||
                                  !xn[v.namespaceURI]
                            ))
              )
            })(a)
      ? (tt(a), !0)
      : (h !== 'noscript' && h !== 'noembed' && h !== 'noframes') ||
                !j(/<\/no(script|embed|frames)/i, a.innerHTML)
          ? (Pt &&
                    a.nodeType === ts &&
                    ((g = a.textContent),
                    Ne([un, hn, dn], (v) => {
                      g = ae(g, v, ' ')
                    }),
                    a.textContent !== g &&
                        (se(e.removed, { element: a.cloneNode() }),
                        (a.textContent = g))),
            st(B.afterSanitizeElements, a, null),
            !1)
          : (tt(a), !0)
  }
  const zi = function (a, g, h) {
    if (Di && (g === 'id' || g === 'name') && (h in n || h in go)) {
      return !1
    }
    if (!(mn && !gn[g] && j(oo, g))) {
      if (!(Ti && j(so, g))) {
        if (!O[g] || gn[g]) {
          if (
            !(
              (Hi(a) &&
                                ((w.tagNameCheck instanceof RegExp &&
                                    j(w.tagNameCheck, a)) ||
                                    (w.tagNameCheck instanceof Function &&
                                        w.tagNameCheck(a))) &&
                                ((w.attributeNameCheck instanceof RegExp &&
                                    j(w.attributeNameCheck, g)) ||
                                    (w.attributeNameCheck instanceof Function &&
                                        w.attributeNameCheck(g)))) ||
                            (g === 'is' &&
                                w.allowCustomizedBuiltInElements &&
                                ((w.tagNameCheck instanceof RegExp &&
                                    j(w.tagNameCheck, h)) ||
                                    (w.tagNameCheck instanceof Function &&
                                        w.tagNameCheck(h))))
            )
          ) {
            return !1
          }
        } else if (!An[g]) {
          if (!j(Si, ae(h, Ei, ''))) {
            if (
              ((g !== 'src' &&
                                g !== 'xlink:href' &&
                                g !== 'href') ||
                                a === 'script' ||
                                Wo(h, 'data:') !== 0 ||
                                !Oi[a]) &&
                            !(wi && !j(ao, ae(h, Ei, '')))
            ) {
              if (h) return !1
            }
          }
        }
      }
    }
    return !0
  }
  const Hi = function (a) {
    return a !== 'annotation-xml' && sr(a, lo)
  }
  const qi = function (a) {
    st(B.beforeSanitizeAttributes, a, null)
    const { attributes: g } = a
    if (!g || En(a)) return
    const h = {
      attrName: '',
      attrValue: '',
      keepAttr: !0,
      allowedAttributes: O,
      forceKeepAttr: void 0
    }
    let v = g.length
    for (; v--;) {
      const A = g[v]
      const { name: f, namespaceURI: D, value: at } = A
      const et = I(f)
      let _ = f === 'value' ? at : Uo(at)
      if (
        ((h.attrName = et),
        (h.attrValue = _),
        (h.keepAttr = !0),
        (h.forceKeepAttr = void 0),
        st(B.uponSanitizeAttribute, a, h),
        (_ = h.attrValue),
        !Ni ||
                    (et !== 'id' && et !== 'name') ||
                    (Le(f, a), (_ = 'user-content-' + _)),
        pn && j(/((--!?|])>)|<\/(style|title)/i, _))
      ) {
        Le(f, a)
        continue
      }
      if (h.forceKeepAttr || (Le(f, a), !h.keepAttr)) continue
      if (!Li && j(/\/>/i, _)) {
        Le(f, a)
        continue
      }
      Pt &&
                Ne([un, hn, dn], (Ki) => {
                  _ = ae(_, Ki, ' ')
                })
      const Ji = I(a.nodeName)
      if (zi(Ji, et, _)) {
        if (
          k &&
                    typeof Q === 'object' &&
                    typeof Q.getAttributeType === 'function' &&
                    !D
        ) {
          switch (Q.getAttributeType(Ji, et)) {
            case 'TrustedHTML':
              _ = k.createHTML(_)
              break
            case 'TrustedScriptURL':
              _ = k.createScriptURL(_)
          }
        }
        try {
          D ? a.setAttributeNS(D, f, _) : a.setAttribute(f, _),
          En(a) ? tt(a) : or(e.removed)
        } catch {}
      }
    }
    st(B.afterSanitizeAttributes, a, null)
  }
  const mo = function a (g) {
    let h = null
    const v = Wi(g)
    for (st(B.beforeSanitizeShadowDOM, g, null); (h = v.nextNode());) {
      st(B.uponSanitizeShadowNode, h, null),
      Vi(h),
      qi(h),
      h.content instanceof s && a(h.content)
    }
    st(B.afterSanitizeShadowDOM, g, null)
  }
  return (
    (e.sanitize = function (a) {
      const g =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : {}
      let h = null
      let v = null
      let A = null
      let f = null
      if (
        ((yn = !a),
        yn && (a = '<!-->'),
        typeof a !== 'string' && !Ui(a))
      ) {
        if (typeof a.toString !== 'function') {
          throw le('toString is not a function')
        }
        if (typeof (a = a.toString()) !== 'string') {
          throw le('dirty is not a string, aborting')
        }
      }
      if (!e.isSupported) return a
      if (
        (fn || Cn(g),
        (e.removed = []),
        typeof a === 'string' && (ne = !1),
        ne)
      ) {
        if (a.nodeName) {
          const et = I(a.nodeName)
          if (!N[et] || ee[et]) {
            throw le(
              'root node is forbidden and cannot be sanitized in-place'
            )
          }
        }
      } else if (a instanceof c) {
        (h = ji('<!---->')),
        (v = h.ownerDocument.importNode(a, !0)),
        (v.nodeType === Qo && v.nodeName === 'BODY') ||
                    v.nodeName === 'HTML'
          ? (h = v)
          : h.appendChild(v)
      } else {
        if (!Mt && !Pt && !Ct && a.indexOf('<') === -1) {
          return k && Se ? k.createHTML(a) : a
        }
        if (((h = ji(a)), !h)) return Mt ? null : Se ? rt : ''
      }
      h && bn && tt(h.firstChild)
      const D = Wi(ne ? a : h)
      for (; (A = D.nextNode());) {
        Vi(A), qi(A), A.content instanceof s && mo(A.content)
      }
      if (ne) return a
      if (Mt) {
        if (Ee) {
          for (f = no.call(h.ownerDocument); h.firstChild;) {
            f.appendChild(h.firstChild)
          }
        } else f = h
        return (
          (O.shadowroot || O.shadowrootmode) &&
                        (f = ro.call(r, f, !0)),
          f
        )
      }
      let at = Ct ? h.outerHTML : h.innerHTML
      return (
        Ct &&
                    N['!doctype'] &&
                    h.ownerDocument &&
                    h.ownerDocument.doctype &&
                    h.ownerDocument.doctype.name &&
                    j(Hr, h.ownerDocument.doctype.name) &&
                    (at =
                        '<!DOCTYPE ' +
                        h.ownerDocument.doctype.name +
                        `>
` +
                        at),
        Pt &&
                    Ne([un, hn, dn], (et) => {
                      at = ae(at, et, ' ')
                    }),
        k && Se ? k.createHTML(at) : at
      )
    }),
    (e.setConfig = function () {
      Cn(
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : {}
      ),
      (fn = !0)
    }),
    (e.clearConfig = function () {
      (Wt = null), (fn = !1)
    }),
    (e.isValidAttribute = function (a, g, h) {
      Wt || Cn({})
      const v = I(a)
      const A = I(g)
      return zi(v, A, h)
    }),
    (e.addHook = function (a, g) {
      typeof g === 'function' && se(B[a], g)
    }),
    (e.removeHook = function (a, g) {
      if (g !== void 0) {
        const h = _o(B[a], g)
        return h === -1 ? void 0 : jo(B[a], h, 1)[0]
      }
      return or(B[a])
    }),
    (e.removeHooks = function (a) {
      B[a] = []
    }),
    (e.removeAllHooks = function () {
      B = {
        afterSanitizeAttributes: [],
        afterSanitizeElements: [],
        afterSanitizeShadowDOM: [],
        beforeSanitizeAttributes: [],
        beforeSanitizeElements: [],
        beforeSanitizeShadowDOM: [],
        uponSanitizeAttribute: [],
        uponSanitizeElement: [],
        uponSanitizeShadowNode: []
      }
    }),
    e
  )
})()
Ve.addHook('uponSanitizeAttribute', function (i, t) {
  /^data-trix-/.test(t.attrName) && (t.forceKeepAttr = !0)
})
const os = 'style href src width height language class'.split(' ')
const ss = 'javascript:'.split(' ')
const as = 'script iframe form noscript'.split(' ')
const qt = class extends R {
  static setHTML (t, e, n) {
    const r = new this(e, n).sanitize()
    const o = r.getHTML ? r.getHTML() : r.outerHTML
    t.innerHTML = o
  }

  static sanitize (t, e) {
    const n = new this(t, e)
    return n.sanitize(), n
  }

  constructor (t) {
    const {
      allowedAttributes: e,
      forbiddenProtocols: n,
      forbiddenElements: r,
      purifyOptions: o
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(...arguments),
    (this.allowedAttributes = e || os),
    (this.forbiddenProtocols = n || ss),
    (this.forbiddenElements = r || as),
    (this.purifyOptions = o || {}),
    (this.body = ls(t))
  }

  sanitize () {
    this.sanitizeElements(), this.normalizeListElementNesting()
    const t = Object.assign({}, Lr, this.purifyOptions)
    return Ve.setConfig(t), (this.body = Ve.sanitize(this.body)), this.body
  }

  getHTML () {
    return this.body.innerHTML
  }

  getBody () {
    return this.body
  }

  sanitizeElements () {
    const t = je(this.body)
    const e = []
    for (; t.nextNode();) {
      const n = t.currentNode
      switch (n.nodeType) {
        case Node.ELEMENT_NODE:
          this.elementIsRemovable(n)
            ? e.push(n)
            : this.sanitizeElement(n)
          break
        case Node.COMMENT_NODE:
          e.push(n)
      }
    }
    return e.forEach((n) => At(n)), this.body
  }

  sanitizeElement (t) {
    return (
      t.hasAttribute('href') &&
                this.forbiddenProtocols.includes(t.protocol) &&
                t.removeAttribute('href'),
      Array.from(t.attributes).forEach((e) => {
        const { name: n } = e
        this.allowedAttributes.includes(n) ||
                    n.indexOf('data-trix') === 0 ||
                    t.removeAttribute(n)
      }),
      t
    )
  }

  normalizeListElementNesting () {
    return (
      Array.from(this.body.querySelectorAll('ul,ol')).forEach((t) => {
        const e = t.previousElementSibling
        e && W(e) === 'li' && e.appendChild(t)
      }),
      this.body
    )
  }

  elementIsRemovable (t) {
    if (t?.nodeType === Node.ELEMENT_NODE) {
      return (
        this.elementIsForbidden(t) || this.elementIsntSerializable(t)
      )
    }
  }

  elementIsForbidden (t) {
    return this.forbiddenElements.includes(W(t))
  }

  elementIsntSerializable (t) {
    return t.getAttribute('data-trix-serialize') === 'false' && !Tt(t)
  }
}
var ls = function () {
  let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ''
  i = i.replace(/<\/html[^>]*>[^]*$/i, '</html>')
  const t = document.implementation.createHTMLDocument('')
  return (
    (t.documentElement.innerHTML = i),
    Array.from(t.head.querySelectorAll('style')).forEach((e) => {
      t.body.appendChild(e)
    }),
    t.body
  )
}
const { css: pt } = Ce
const ve = class extends dt {
  constructor () {
    super(...arguments),
    (this.attachment = this.object),
    (this.attachment.uploadProgressDelegate = this),
    (this.attachmentPiece = this.options.piece)
  }

  createContentNodes () {
    return []
  }

  createNodes () {
    let t
    const e = (t = p({
      tagName: 'figure',
      className: this.getClassName(),
      data: this.getData(),
      editable: !1
    }))
    const n = this.getHref()
    return (
      n &&
                ((t = p({
                  tagName: 'a',
                  editable: !1,
                  attributes: { href: n, tabindex: -1 }
                })),
                e.appendChild(t)),
      this.attachment.hasContent()
        ? qt.setHTML(t, this.attachment.getContent())
        : this.createContentNodes().forEach((r) => {
          t.appendChild(r)
        }),
      t.appendChild(this.createCaptionElement()),
      this.attachment.isPending() &&
                ((this.progressElement = p({
                  tagName: 'progress',
                  attributes: {
                    class: pt.attachmentProgress,
                    value: this.attachment.getUploadProgress(),
                    max: 100
                  },
                  data: {
                    trixMutable: !0,
                    trixStoreKey: [
                      'progressElement',
                      this.attachment.id
                    ].join('/')
                  }
                })),
                e.appendChild(this.progressElement)),
      [gr('left'), e, gr('right')]
    )
  }

  createCaptionElement () {
    const t = p({
      tagName: 'figcaption',
      className: pt.attachmentCaption
    })
    const e = this.attachmentPiece.getCaption()
    if (e) {
      t.classList.add(''.concat(pt.attachmentCaption, '--edited')),
      (t.textContent = e)
    } else {
      let n
      let r
      const o = this.getCaptionConfig()
      if (
        (o.name && (n = this.attachment.getFilename()),
        o.size && (r = this.attachment.getFormattedFilesize()),
        n)
      ) {
        const s = p({
          tagName: 'span',
          className: pt.attachmentName,
          textContent: n
        })
        t.appendChild(s)
      }
      if (r) {
        n && t.appendChild(document.createTextNode(' '))
        const s = p({
          tagName: 'span',
          className: pt.attachmentSize,
          textContent: r
        })
        t.appendChild(s)
      }
    }
    return t
  }

  getClassName () {
    const t = [
      pt.attachment,
      ''.concat(pt.attachment, '--').concat(this.attachment.getType())
    ]
    const e = this.attachment.getExtension()
    return (
      e && t.push(''.concat(pt.attachment, '--').concat(e)), t.join(' ')
    )
  }

  getData () {
    const t = {
      trixAttachment: JSON.stringify(this.attachment),
      trixContentType: this.attachment.getContentType(),
      trixId: this.attachment.id
    }
    const { attributes: e } = this.attachmentPiece
    return (
      e.isEmpty() || (t.trixAttributes = JSON.stringify(e)),
      this.attachment.isPending() && (t.trixSerialize = !1),
      t
    )
  }

  getHref () {
    if (!cs(this.attachment.getContent(), 'a')) {
      return this.attachment.getHref()
    }
  }

  getCaptionConfig () {
    let t
    const e = this.attachment.getType()
    const n = _r((t = mi[e]) === null || t === void 0 ? void 0 : t.caption)
    return e === 'file' && (n.name = !0), n
  }

  findProgressElement () {
    let t
    return (t = this.findElement()) === null || t === void 0
      ? void 0
      : t.querySelector('progress')
  }

  attachmentDidChangeUploadProgress () {
    const t = this.attachment.getUploadProgress()
    const e = this.findProgressElement()
    e && (e.value = t)
  }
}
var gr = (i) =>
  p({
    tagName: 'span',
    textContent: ln,
    data: { trixCursorTarget: i, trixSerialize: !1 }
  })
var cs = function (i, t) {
  const e = p('div')
  return qt.setHTML(e, i || ''), e.querySelector(t)
}
const ze = class extends ve {
  constructor () {
    super(...arguments), (this.attachment.previewDelegate = this)
  }

  createContentNodes () {
    return (
      (this.image = p({
        tagName: 'img',
        attributes: { src: '' },
        data: { trixMutable: !0 }
      })),
      this.refresh(this.image),
      [this.image]
    )
  }

  createCaptionElement () {
    const t = super.createCaptionElement(...arguments)
    return (
      t.textContent ||
                t.setAttribute('data-trix-placeholder', m.captionPlaceholder),
      t
    )
  }

  refresh (t) {
    let e
    if (
      (t ||
                (t =
                    (e = this.findElement()) === null || e === void 0
                      ? void 0
                      : e.querySelector('img')),
      t)
    ) {
      return this.updateAttributesForImage(t)
    }
  }

  updateAttributesForImage (t) {
    const e = this.attachment.getURL()
    const n = this.attachment.getPreviewURL()
    if (((t.src = n || e), n === e)) {
      t.removeAttribute('data-trix-serialized-attributes')
    } else {
      const l = JSON.stringify({ src: e })
      t.setAttribute('data-trix-serialized-attributes', l)
    }
    const r = this.attachment.getWidth()
    const o = this.attachment.getHeight()
    r != null && (t.width = r), o != null && (t.height = o)
    const s = [
      'imageElement',
      this.attachment.id,
      t.src,
      t.width,
      t.height
    ].join('/')
    t.dataset.trixStoreKey = s
  }

  attachmentDidChangeAttributes () {
    return this.refresh(this.image), this.refresh()
  }
}
const He = class extends dt {
  constructor () {
    super(...arguments),
    (this.piece = this.object),
    (this.attributes = this.piece.getAttributes()),
    (this.textConfig = this.options.textConfig),
    (this.context = this.options.context),
    this.piece.attachment
      ? (this.attachment = this.piece.attachment)
      : (this.string = this.piece.toString())
  }

  createNodes () {
    let t = this.attachment
      ? this.createAttachmentNodes()
      : this.createStringNodes()
    const e = this.createElement()
    if (e) {
      const n = (function (r) {
        for (
          ;
          (o = r) !== null && o !== void 0 && o.firstElementChild;

        ) {
          var o
          r = r.firstElementChild
        }
        return r
      })(e)
      Array.from(t).forEach((r) => {
        n.appendChild(r)
      }),
      (t = [e])
    }
    return t
  }

  createAttachmentNodes () {
    const t = this.attachment.isPreviewable() ? ze : ve
    return this.createChildView(t, this.piece.attachment, {
      piece: this.piece
    }).getNodes()
  }

  createStringNodes () {
    let t
    if ((t = this.textConfig) !== null && t !== void 0 && t.plaintext) {
      return [document.createTextNode(this.string)]
    }
    {
      const e = []
      const n = this.string.split(`
`)
      for (let r = 0; r < n.length; r++) {
        const o = n[r]
        if (r > 0) {
          const s = p('br')
          e.push(s)
        }
        if (o.length) {
          const s = document.createTextNode(this.preserveSpaces(o))
          e.push(s)
        }
      }
      return e
    }
  }

  createElement () {
    let t
    let e
    let n
    const r = {}
    for (e in this.attributes) {
      n = this.attributes[e]
      const s = ti(e)
      if (s) {
        if (s.tagName) {
          var o
          const l = p(s.tagName)
          o ? (o.appendChild(l), (o = l)) : (t = o = l)
        }
        if ((s.styleProperty && (r[s.styleProperty] = n), s.style)) {
          for (e in s.style) (n = s.style[e]), (r[e] = n)
        }
      }
    }
    if (Object.keys(r).length) {
      for (e in (t || (t = p('span')), r)) {
        (n = r[e]), (t.style[e] = n)
      }
    }
    return t
  }

  createContainerElement () {
    for (const t in this.attributes) {
      const e = this.attributes[t]
      const n = ti(t)
      if (n && n.groupTagName) {
        const r = {}
        return (r[t] = e), p(n.groupTagName, r)
      }
    }
  }

  preserveSpaces (t) {
    return (
      this.context.isLast && (t = t.replace(/\ $/, ft)),
      (t = t
        .replace(/(\S)\ {3}(\S)/g, '$1 '.concat(ft, ' $2'))
        .replace(/\ {2}/g, ''.concat(ft, ' '))
        .replace(/\ {2}/g, ' '.concat(ft))),
      (this.context.isFirst || this.context.followsWhitespace) &&
                (t = t.replace(/^\ /, ft)),
      t
    )
  }
}
const qe = class extends dt {
  constructor () {
    super(...arguments),
    (this.text = this.object),
    (this.textConfig = this.options.textConfig)
  }

  createNodes () {
    const t = []
    const e = be.groupObjects(this.getPieces())
    const n = e.length - 1
    for (let o = 0; o < e.length; o++) {
      const s = e[o]
      const l = {}
      o === 0 && (l.isFirst = !0),
      o === n && (l.isLast = !0),
      us(r) && (l.followsWhitespace = !0)
      const c = this.findOrCreateCachedChildView(He, s, {
        textConfig: this.textConfig,
        context: l
      })
      t.push(...Array.from(c.getNodes() || []))
      var r = s
    }
    return t
  }

  getPieces () {
    return Array.from(this.text.getPieces()).filter(
      (t) => !t.hasAttribute('blockBreak')
    )
  }
}
var us = (i) => /\s$/.test(i?.toString())
const { css: mr } = Ce
const Je = class extends dt {
  constructor () {
    super(...arguments),
    (this.block = this.object),
    (this.attributes = this.block.getAttributes())
  }

  createNodes () {
    const t = [document.createComment('block')]
    if (this.block.isEmpty()) t.push(p('br'))
    else {
      let e
      const n =
                (e = L(this.block.getLastAttribute())) === null || e === void 0
                  ? void 0
                  : e.text
      const r = this.findOrCreateCachedChildView(qe, this.block.text, {
        textConfig: n
      })
      t.push(...Array.from(r.getNodes() || [])),
      this.shouldAddExtraNewlineElement() && t.push(p('br'))
    }
    if (this.attributes.length) return t
    {
      let n
      const { tagName: r } = U.default
      this.block.isRTL() && (n = { dir: 'rtl' })
      const o = p({ tagName: r, attributes: n })
      return t.forEach((s) => o.appendChild(s)), [o]
    }
  }

  createContainerElement (t) {
    const e = {}
    let n
    const r = this.attributes[t]
    const { tagName: o, htmlAttributes: s = [] } = L(r)
    if (
      (t === 0 && this.block.isRTL() && Object.assign(e, { dir: 'rtl' }),
      r === 'attachmentGallery')
    ) {
      const l = this.block.getBlockBreakPosition()
      n = ''
        .concat(mr.attachmentGallery, ' ')
        .concat(mr.attachmentGallery, '--')
        .concat(l)
    }
    return (
      Object.entries(this.block.htmlAttributes).forEach((l) => {
        const [c, u] = l
        s.includes(c) && (e[c] = u)
      }),
      p({ tagName: o, className: n, attributes: e })
    )
  }

  shouldAddExtraNewlineElement () {
    return /\n\n$/.test(this.block.toString())
  }
}
const Jt = class extends dt {
  static render (t) {
    const e = p('div')
    const n = new this(t, { element: e })
    return n.render(), n.sync(), e
  }

  constructor () {
    super(...arguments),
    (this.element = this.options.element),
    (this.elementStore = new ii()),
    this.setDocument(this.object)
  }

  setDocument (t) {
    t.isEqualTo(this.document) || (this.document = this.object = t)
  }

  render () {
    if (
      ((this.childViews = []),
      (this.shadowElement = p('div')),
      !this.document.isEmpty())
    ) {
      const t = be.groupObjects(this.document.getBlocks(), {
        asTree: !0
      })
      Array.from(t).forEach((e) => {
        const n = this.findOrCreateCachedChildView(Je, e)
        Array.from(n.getNodes()).map((r) =>
          this.shadowElement.appendChild(r)
        )
      })
    }
  }

  isSynced () {
    return hs(this.shadowElement, this.element)
  }

  sync () {
    const t = this.createDocumentFragmentForSync()
    for (; this.element.lastChild;) {
      this.element.removeChild(this.element.lastChild)
    }
    return this.element.appendChild(t), this.didSync()
  }

  didSync () {
    return (
      this.elementStore.reset(pr(this.element)),
      Ai(() => this.garbageCollectCachedViews())
    )
  }

  createDocumentFragmentForSync () {
    const t = document.createDocumentFragment()
    return (
      Array.from(this.shadowElement.childNodes).forEach((e) => {
        t.appendChild(e.cloneNode(!0))
      }),
      Array.from(pr(t)).forEach((e) => {
        const n = this.elementStore.remove(e)
        n && e.parentNode.replaceChild(n, e)
      }),
      t
    )
  }
}
var pr = (i) => i.querySelectorAll('[data-trix-store-key]')
var hs = (i, t) => fr(i.innerHTML) === fr(t.innerHTML)
var fr = (i) => i.replace(/&nbsp;/g, ' ')

function Oe (i) {
  let t, e

  function n (o, s) {
    try {
      const l = i[o](s)
      const c = l.value
      const u = c instanceof ds
      Promise.resolve(u ? c.v : c).then(
        function (d) {
          if (u) {
            const C = o === 'return' ? 'return' : 'next'
            if (!c.k || d.done) return n(C, d)
            d = i[C](d).value
          }
          r(l.done ? 'return' : 'normal', d)
        },
        function (d) {
          n('throw', d)
        }
      )
    } catch (d) {
      r('throw', d)
    }
  }

  function r (o, s) {
    switch (o) {
      case 'return':
        t.resolve({ value: s, done: !0 })
        break
      case 'throw':
        t.reject(s)
        break
      default:
        t.resolve({ value: s, done: !1 })
    }
    (t = t.next) ? n(t.key, t.arg) : (e = null)
  }

  (this._invoke = function (o, s) {
    return new Promise(function (l, c) {
      const u = { key: o, arg: s, resolve: l, reject: c, next: null }
      e ? (e = e.next = u) : ((t = e = u), n(o, s))
    })
  }),
  typeof i.return !== 'function' && (this.return = void 0)
}

function ds (i, t) {
  (this.v = i), (this.k = t)
}

function V (i, t, e) {
  return (
    (t = gs(t)) in i
      ? Object.defineProperty(i, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      })
      : (i[t] = e),
    i
  )
}

function gs (i) {
  const t = (function (e, n) {
    if (typeof e !== 'object' || e === null) return e
    const r = e[Symbol.toPrimitive]
    if (r !== void 0) {
      const o = r.call(e, n || 'default')
      if (typeof o !== 'object') return o
      throw new TypeError('@@toPrimitive must return a primitive value.')
    }
    return (n === 'string' ? String : Number)(e)
  })(i, 'string')
  return typeof t === 'symbol' ? t : String(t)
}

(Oe.prototype[
  (typeof Symbol === 'function' && Symbol.asyncIterator) || '@@asyncIterator'
] = function () {
  return this
}),
(Oe.prototype.next = function (i) {
  return this._invoke('next', i)
}),
(Oe.prototype.throw = function (i) {
  return this._invoke('throw', i)
}),
(Oe.prototype.return = function (i) {
  return this._invoke('return', i)
})

function x (i, t) {
  return ms(i, qr(i, t, 'get'))
}

function Ci (i, t, e) {
  return ps(i, qr(i, t, 'set'), e), e
}

function qr (i, t, e) {
  if (!t.has(i)) {
    throw new TypeError(
      'attempted to ' + e + ' private field on non-instance'
    )
  }
  return t.get(i)
}

function ms (i, t) {
  return t.get ? t.get.call(i) : t.value
}

function ps (i, t, e) {
  if (t.set) t.set.call(i, e)
  else {
    if (!t.writable) {
      throw new TypeError('attempted to set read only private field')
    }
    t.value = e
  }
}

function Fe (i, t, e) {
  if (!t.has(i)) {
    throw new TypeError('attempted to get private field on non-instance')
  }
  return e
}

function Jr (i, t) {
  if (t.has(i)) {
    throw new TypeError(
      'Cannot initialize the same private elements twice on an object'
    )
  }
}

function fe (i, t, e) {
  Jr(i, t), t.set(i, e)
}

const gt = class extends ht {
  static registerType (t, e) {
    (e.type = t), (this.types[t] = e)
  }

  static fromJSON (t) {
    const e = this.types[t.type]
    if (e) return e.fromJSON(t)
  }

  constructor (t) {
    const e =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(...arguments), (this.attributes = X.box(e))
  }

  copyWithAttributes (t) {
    return new this.constructor(this.getValue(), t)
  }

  copyWithAdditionalAttributes (t) {
    return this.copyWithAttributes(this.attributes.merge(t))
  }

  copyWithoutAttribute (t) {
    return this.copyWithAttributes(this.attributes.remove(t))
  }

  copy () {
    return this.copyWithAttributes(this.attributes)
  }

  getAttribute (t) {
    return this.attributes.get(t)
  }

  getAttributesHash () {
    return this.attributes
  }

  getAttributes () {
    return this.attributes.toObject()
  }

  hasAttribute (t) {
    return this.attributes.has(t)
  }

  hasSameStringValueAsPiece (t) {
    return t && this.toString() === t.toString()
  }

  hasSameAttributesAsPiece (t) {
    return (
      t &&
            (this.attributes === t.attributes ||
                this.attributes.isEqualTo(t.attributes))
    )
  }

  isBlockBreak () {
    return !1
  }

  isEqualTo (t) {
    return (
      super.isEqualTo(...arguments) ||
            (this.hasSameConstructorAs(t) &&
                this.hasSameStringValueAsPiece(t) &&
                this.hasSameAttributesAsPiece(t))
    )
  }

  isEmpty () {
    return this.length === 0
  }

  isSerializable () {
    return !0
  }

  toJSON () {
    return {
      type: this.constructor.type,
      attributes: this.getAttributes()
    }
  }

  contentsForInspection () {
    return {
      type: this.constructor.type,
      attributes: this.attributes.inspect()
    }
  }

  canBeGrouped () {
    return this.hasAttribute('href')
  }

  canBeGroupedWith (t) {
    return this.getAttribute('href') === t.getAttribute('href')
  }

  getLength () {
    return this.length
  }

  canBeConsolidatedWith (t) {
    return !1
  }
}
V(gt, 'types', {})
const Ke = class extends Ht {
  constructor (t) {
    super(...arguments), (this.url = t)
  }

  perform (t) {
    const e = new Image();
    (e.onload = () => (
      (e.width = this.width = e.naturalWidth),
      (e.height = this.height = e.naturalHeight),
      t(!0, e)
    )),
    (e.onerror = () => t(!1)),
    (e.src = this.url)
  }
}
const Kt = class i extends ht {
  static attachmentForFile (t) {
    const e = new this(this.attributesForFile(t))
    return e.setFile(t), e
  }

  static attributesForFile (t) {
    return new X({
      filename: t.name,
      filesize: t.size,
      contentType: t.type
    })
  }

  static fromJSON (t) {
    return new this(t)
  }

  constructor () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    super(t),
    (this.releaseFile = this.releaseFile.bind(this)),
    (this.attributes = X.box(t)),
    this.didChangeAttributes()
  }

  getAttribute (t) {
    return this.attributes.get(t)
  }

  hasAttribute (t) {
    return this.attributes.has(t)
  }

  getAttributes () {
    return this.attributes.toObject()
  }

  setAttributes () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    const e = this.attributes.merge(t)
    let n, r, o, s
    if (!this.attributes.isEqualTo(e)) {
      return (
        (this.attributes = e),
        this.didChangeAttributes(),
        (n = this.previewDelegate) === null ||
                    n === void 0 ||
                    (r = n.attachmentDidChangeAttributes) === null ||
                    r === void 0 ||
                    r.call(n, this),
        (o = this.delegate) === null ||
                o === void 0 ||
                (s = o.attachmentDidChangeAttributes) === null ||
                s === void 0
          ? void 0
          : s.call(o, this)
      )
    }
  }

  didChangeAttributes () {
    if (this.isPreviewable()) return this.preloadURL()
  }

  isPending () {
    return this.file != null && !(this.getURL() || this.getHref())
  }

  isPreviewable () {
    return this.attributes.has('previewable')
      ? this.attributes.get('previewable')
      : i.previewablePattern.test(this.getContentType())
  }

  getType () {
    return this.hasContent()
      ? 'content'
      : this.isPreviewable()
        ? 'preview'
        : 'file'
  }

  getURL () {
    return this.attributes.get('url')
  }

  getHref () {
    return this.attributes.get('href')
  }

  getFilename () {
    return this.attributes.get('filename') || ''
  }

  getFilesize () {
    return this.attributes.get('filesize')
  }

  getFormattedFilesize () {
    const t = this.attributes.get('filesize')
    return typeof t === 'number' ? Dr.formatter(t) : ''
  }

  getExtension () {
    let t
    return (t = this.getFilename().match(/\.(\w+)$/)) === null ||
            t === void 0
      ? void 0
      : t[1].toLowerCase()
  }

  getContentType () {
    return this.attributes.get('contentType')
  }

  hasContent () {
    return this.attributes.has('content')
  }

  getContent () {
    return this.attributes.get('content')
  }

  getWidth () {
    return this.attributes.get('width')
  }

  getHeight () {
    return this.attributes.get('height')
  }

  getFile () {
    return this.file
  }

  setFile (t) {
    if (((this.file = t), this.isPreviewable())) {
      return this.preloadFile()
    }
  }

  releaseFile () {
    this.releasePreloadedFile(), (this.file = null)
  }

  getUploadProgress () {
    return this.uploadProgress != null ? this.uploadProgress : 0
  }

  setUploadProgress (t) {
    let e, n
    if (this.uploadProgress !== t) {
      return (
        (this.uploadProgress = t),
        (e = this.uploadProgressDelegate) === null ||
                e === void 0 ||
                (n = e.attachmentDidChangeUploadProgress) === null ||
                n === void 0
          ? void 0
          : n.call(e, this)
      )
    }
  }

  toJSON () {
    return this.getAttributes()
  }

  getCacheKey () {
    return [
      super.getCacheKey(...arguments),
      this.attributes.getCacheKey(),
      this.getPreviewURL()
    ].join('/')
  }

  getPreviewURL () {
    return this.previewURL || this.preloadingURL
  }

  setPreviewURL (t) {
    let e, n, r, o
    if (t !== this.getPreviewURL()) {
      return (
        (this.previewURL = t),
        (e = this.previewDelegate) === null ||
                    e === void 0 ||
                    (n = e.attachmentDidChangeAttributes) === null ||
                    n === void 0 ||
                    n.call(e, this),
        (r = this.delegate) === null ||
                r === void 0 ||
                (o = r.attachmentDidChangePreviewURL) === null ||
                o === void 0
          ? void 0
          : o.call(r, this)
      )
    }
  }

  preloadURL () {
    return this.preload(this.getURL(), this.releaseFile)
  }

  preloadFile () {
    if (this.file) {
      return (
        (this.fileObjectURL = URL.createObjectURL(this.file)),
        this.preload(this.fileObjectURL)
      )
    }
  }

  releasePreloadedFile () {
    this.fileObjectURL &&
            (URL.revokeObjectURL(this.fileObjectURL),
            (this.fileObjectURL = null))
  }

  preload (t, e) {
    if (t && t !== this.getPreviewURL()) {
      return (
        (this.preloadingURL = t),
        new Ke(t)
          .then((n) => {
            const { width: r, height: o } = n
            return (
              (this.getWidth() && this.getHeight()) ||
                                this.setAttributes({
                                  width: r,
                                  height: o
                                }),
              (this.preloadingURL = null),
              this.setPreviewURL(t),
              e?.()
            )
          })
          .catch(() => ((this.preloadingURL = null), e?.()))
      )
    }
  }
}
V(Kt, 'previewablePattern', /^image(\/(gif|png|webp|jpe?g)|$)/)
const Gt = class i extends gt {
  static fromJSON (t) {
    return new this(Kt.fromJSON(t.attachment), t.attributes)
  }

  constructor (t) {
    super(...arguments),
    (this.attachment = t),
    (this.length = 1),
    this.ensureAttachmentExclusivelyHasAttribute('href'),
    this.attachment.hasContent() || this.removeProhibitedAttributes()
  }

  ensureAttachmentExclusivelyHasAttribute (t) {
    this.hasAttribute(t) &&
            (this.attachment.hasAttribute(t) ||
                this.attachment.setAttributes(this.attributes.slice([t])),
            (this.attributes = this.attributes.remove(t)))
  }

  removeProhibitedAttributes () {
    const t = this.attributes.slice(i.permittedAttributes)
    t.isEqualTo(this.attributes) || (this.attributes = t)
  }

  getValue () {
    return this.attachment
  }

  isSerializable () {
    return !this.attachment.isPending()
  }

  getCaption () {
    return this.attributes.get('caption') || ''
  }

  isEqualTo (t) {
    let e
    return (
      super.isEqualTo(t) &&
            this.attachment.id ===
                (t == null || (e = t.attachment) === null || e === void 0
                  ? void 0
                  : e.id)
    )
  }

  toString () {
    return '\uFFFC'
  }

  toJSON () {
    const t = super.toJSON(...arguments)
    return (t.attachment = this.attachment), t
  }

  getCacheKey () {
    return [
      super.getCacheKey(...arguments),
      this.attachment.getCacheKey()
    ].join('/')
  }

  toConsole () {
    return JSON.stringify(this.toString())
  }
}
V(Gt, 'permittedAttributes', ['caption', 'presentation']),
gt.registerType('attachment', Gt)
const Ae = class extends gt {
  static fromJSON (t) {
    return new this(t.string, t.attributes)
  }

  constructor (t) {
    super(...arguments),
    (this.string = ((e) =>
      e.replace(
        /\r\n?/g,
                    `
`
      ))(t)),
    (this.length = this.string.length)
  }

  getValue () {
    return this.string
  }

  toString () {
    return this.string.toString()
  }

  isBlockBreak () {
    return (
      this.toString() ===
                `
` && this.getAttribute('blockBreak') === !0
    )
  }

  toJSON () {
    const t = super.toJSON(...arguments)
    return (t.string = this.string), t
  }

  canBeConsolidatedWith (t) {
    return (
      t &&
            this.hasSameConstructorAs(t) &&
            this.hasSameAttributesAsPiece(t)
    )
  }

  consolidateWith (t) {
    return new this.constructor(
      this.toString() + t.toString(),
      this.attributes
    )
  }

  splitAtOffset (t) {
    let e, n
    return (
      t === 0
        ? ((e = null), (n = this))
        : t === this.length
          ? ((e = this), (n = null))
          : ((e = new this.constructor(
              this.string.slice(0, t),
              this.attributes
            )),
            (n = new this.constructor(
              this.string.slice(t),
              this.attributes
            ))),
      [e, n]
    )
  }

  toConsole () {
    let { string: t } = this
    return (
      t.length > 15 && (t = t.slice(0, 14) + '\u2026'),
      JSON.stringify(t.toString())
    )
  }
}
gt.registerType('string', Ae)
const Yt = class extends ht {
  static box (t) {
    return t instanceof this ? t : new this(t)
  }

  constructor () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    super(...arguments),
    (this.objects = t.slice(0)),
    (this.length = this.objects.length)
  }

  indexOf (t) {
    return this.objects.indexOf(t)
  }

  splice () {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) {
      e[n] = arguments[n]
    }
    return new this.constructor(vi(this.objects, ...e))
  }

  eachObject (t) {
    return this.objects.map((e, n) => t(e, n))
  }

  insertObjectAtIndex (t, e) {
    return this.splice(e, 0, t)
  }

  insertSplittableListAtIndex (t, e) {
    return this.splice(e, 0, ...t.objects)
  }

  insertSplittableListAtPosition (t, e) {
    const [n, r] = this.splitObjectAtPosition(e)
    return new this.constructor(n).insertSplittableListAtIndex(t, r)
  }

  editObjectAtIndex (t, e) {
    return this.replaceObjectAtIndex(e(this.objects[t]), t)
  }

  replaceObjectAtIndex (t, e) {
    return this.splice(e, 1, t)
  }

  removeObjectAtIndex (t) {
    return this.splice(t, 1)
  }

  getObjectAtIndex (t) {
    return this.objects[t]
  }

  getSplittableListInRange (t) {
    const [e, n, r] = this.splitObjectsAtRange(t)
    return new this.constructor(e.slice(n, r + 1))
  }

  selectSplittableList (t) {
    const e = this.objects.filter((n) => t(n))
    return new this.constructor(e)
  }

  removeObjectsInRange (t) {
    const [e, n, r] = this.splitObjectsAtRange(t)
    return new this.constructor(e).splice(n, r - n + 1)
  }

  transformObjectsInRange (t, e) {
    const [n, r, o] = this.splitObjectsAtRange(t)
    const s = n.map((l, c) => (r <= c && c <= o ? e(l) : l))
    return new this.constructor(s)
  }

  splitObjectsAtRange (t) {
    let e
    let [n, r, o] = this.splitObjectAtPosition(bs(t))
    return (
      ([n, e] = new this.constructor(n).splitObjectAtPosition(vs(t) + o)),
      [n, r, e - 1]
    )
  }

  getObjectAtPosition (t) {
    const { index: e } = this.findIndexAndOffsetAtPosition(t)
    return this.objects[e]
  }

  splitObjectAtPosition (t) {
    let e
    let n
    const { index: r, offset: o } = this.findIndexAndOffsetAtPosition(t)
    const s = this.objects.slice(0)
    if (r != null) {
      if (o === 0) (e = r), (n = 0)
      else {
        const l = this.getObjectAtIndex(r)
        const [c, u] = l.splitAtOffset(o)
        s.splice(r, 1, c, u), (e = r + 1), (n = c.getLength() - o)
      }
    } else (e = s.length), (n = 0)
    return [s, e, n]
  }

  consolidate () {
    const t = []
    let e = this.objects[0]
    return (
      this.objects.slice(1).forEach((n) => {
        let r, o;
        (r = (o = e).canBeConsolidatedWith) !== null &&
                r !== void 0 &&
                r.call(o, n)
          ? (e = e.consolidateWith(n))
          : (t.push(e), (e = n))
      }),
      e && t.push(e),
      new this.constructor(t)
    )
  }

  consolidateFromIndexToIndex (t, e) {
    const n = this.objects.slice(0).slice(t, e + 1)
    const r = new this.constructor(n).consolidate().toArray()
    return this.splice(t, n.length, ...r)
  }

  findIndexAndOffsetAtPosition (t) {
    let e
    let n = 0
    for (e = 0; e < this.objects.length; e++) {
      const r = n + this.objects[e].getLength()
      if (n <= t && t < r) return { index: e, offset: t - n }
      n = r
    }
    return { index: null, offset: null }
  }

  findPositionAtIndexAndOffset (t, e) {
    let n = 0
    for (let r = 0; r < this.objects.length; r++) {
      const o = this.objects[r]
      if (r < t) n += o.getLength()
      else if (r === t) {
        n += e
        break
      }
    }
    return n
  }

  getEndPosition () {
    return (
      this.endPosition == null &&
                ((this.endPosition = 0),
                this.objects.forEach(
                  (t) => (this.endPosition += t.getLength())
                )),
      this.endPosition
    )
  }

  toString () {
    return this.objects.join('')
  }

  toArray () {
    return this.objects.slice(0)
  }

  toJSON () {
    return this.toArray()
  }

  isEqualTo (t) {
    return super.isEqualTo(...arguments) || fs(this.objects, t?.objects)
  }

  contentsForInspection () {
    return {
      objects: '['.concat(
        this.objects.map((t) => t.inspect()).join(', '),
        ']'
      )
    }
  }
}
var fs = function (i) {
  const t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : []
  if (i.length !== t.length) return !1
  let e = !0
  for (let n = 0; n < i.length; n++) {
    const r = i[n]
    e && !r.isEqualTo(t[n]) && (e = !1)
  }
  return e
}
var bs = (i) => i[0]
var vs = (i) => i[1]
const K = class extends ht {
  static textForAttachmentWithAttributes (t, e) {
    return new this([new Gt(t, e)])
  }

  static textForStringWithAttributes (t, e) {
    return new this([new Ae(t, e)])
  }

  static fromJSON (t) {
    return new this(Array.from(t).map((e) => gt.fromJSON(e)))
  }

  constructor () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    super(...arguments)
    const e = t.filter((n) => !n.isEmpty())
    this.pieceList = new Yt(e)
  }

  copy () {
    return this.copyWithPieceList(this.pieceList)
  }

  copyWithPieceList (t) {
    return new this.constructor(t.consolidate().toArray())
  }

  copyUsingObjectMap (t) {
    const e = this.getPieces().map((n) => t.find(n) || n)
    return new this.constructor(e)
  }

  appendText (t) {
    return this.insertTextAtPosition(t, this.getLength())
  }

  insertTextAtPosition (t, e) {
    return this.copyWithPieceList(
      this.pieceList.insertSplittableListAtPosition(t.pieceList, e)
    )
  }

  removeTextAtRange (t) {
    return this.copyWithPieceList(this.pieceList.removeObjectsInRange(t))
  }

  replaceTextAtRange (t, e) {
    return this.removeTextAtRange(e).insertTextAtPosition(t, e[0])
  }

  moveTextFromRangeToPosition (t, e) {
    if (t[0] <= e && e <= t[1]) return
    const n = this.getTextAtRange(t)
    const r = n.getLength()
    return (
      t[0] < e && (e -= r),
      this.removeTextAtRange(t).insertTextAtPosition(n, e)
    )
  }

  addAttributeAtRange (t, e, n) {
    const r = {}
    return (r[t] = e), this.addAttributesAtRange(r, n)
  }

  addAttributesAtRange (t, e) {
    return this.copyWithPieceList(
      this.pieceList.transformObjectsInRange(e, (n) =>
        n.copyWithAdditionalAttributes(t)
      )
    )
  }

  removeAttributeAtRange (t, e) {
    return this.copyWithPieceList(
      this.pieceList.transformObjectsInRange(e, (n) =>
        n.copyWithoutAttribute(t)
      )
    )
  }

  setAttributesAtRange (t, e) {
    return this.copyWithPieceList(
      this.pieceList.transformObjectsInRange(e, (n) =>
        n.copyWithAttributes(t)
      )
    )
  }

  getAttributesAtPosition (t) {
    let e
    return (
      ((e = this.pieceList.getObjectAtPosition(t)) === null ||
            e === void 0
        ? void 0
        : e.getAttributes()) || {}
    )
  }

  getCommonAttributes () {
    const t = Array.from(this.pieceList.toArray()).map((e) =>
      e.getAttributes()
    )
    return X.fromCommonAttributesOfObjects(t).toObject()
  }

  getCommonAttributesAtRange (t) {
    return this.getTextAtRange(t).getCommonAttributes() || {}
  }

  getExpandedRangeForAttributeAtOffset (t, e) {
    let n
    let r = (n = e)
    const o = this.getLength()
    for (; r > 0 && this.getCommonAttributesAtRange([r - 1, n])[t];) {
      r--
    }
    for (; n < o && this.getCommonAttributesAtRange([e, n + 1])[t];) {
      n++
    }
    return [r, n]
  }

  getTextAtRange (t) {
    return this.copyWithPieceList(
      this.pieceList.getSplittableListInRange(t)
    )
  }

  getStringAtRange (t) {
    return this.pieceList.getSplittableListInRange(t).toString()
  }

  getStringAtPosition (t) {
    return this.getStringAtRange([t, t + 1])
  }

  startsWithString (t) {
    return this.getStringAtRange([0, t.length]) === t
  }

  endsWithString (t) {
    const e = this.getLength()
    return this.getStringAtRange([e - t.length, e]) === t
  }

  getAttachmentPieces () {
    return this.pieceList.toArray().filter((t) => !!t.attachment)
  }

  getAttachments () {
    return this.getAttachmentPieces().map((t) => t.attachment)
  }

  getAttachmentAndPositionById (t) {
    let e = 0
    for (const r of this.pieceList.toArray()) {
      var n
      if (
        ((n = r.attachment) === null || n === void 0
          ? void 0
          : n.id) === t
      ) {
        return {
          attachment: r.attachment,
          position: e
        }
      }
      e += r.length
    }
    return { attachment: null, position: null }
  }

  getAttachmentById (t) {
    const { attachment: e } = this.getAttachmentAndPositionById(t)
    return e
  }

  getRangeOfAttachment (t) {
    const e = this.getAttachmentAndPositionById(t.id)
    const n = e.position
    if ((t = e.attachment)) return [n, n + 1]
  }

  updateAttributesForAttachment (t, e) {
    const n = this.getRangeOfAttachment(e)
    return n ? this.addAttributesAtRange(t, n) : this
  }

  getLength () {
    return this.pieceList.getEndPosition()
  }

  isEmpty () {
    return this.getLength() === 0
  }

  isEqualTo (t) {
    let e
    return (
      super.isEqualTo(t) ||
            (t == null || (e = t.pieceList) === null || e === void 0
              ? void 0
              : e.isEqualTo(this.pieceList))
    )
  }

  isBlockBreak () {
    return (
      this.getLength() === 1 &&
            this.pieceList.getObjectAtIndex(0).isBlockBreak()
    )
  }

  eachPiece (t) {
    return this.pieceList.eachObject(t)
  }

  getPieces () {
    return this.pieceList.toArray()
  }

  getPieceAtPosition (t) {
    return this.pieceList.getObjectAtPosition(t)
  }

  contentsForInspection () {
    return { pieceList: this.pieceList.inspect() }
  }

  toSerializableText () {
    const t = this.pieceList.selectSplittableList((e) =>
      e.isSerializable()
    )
    return this.copyWithPieceList(t)
  }

  toString () {
    return this.pieceList.toString()
  }

  toJSON () {
    return this.pieceList.toJSON()
  }

  toConsole () {
    return JSON.stringify(
      this.pieceList.toArray().map((t) => JSON.parse(t.toConsole()))
    )
  }

  getDirection () {
    return Ro(this.toString())
  }

  isRTL () {
    return this.getDirection() === 'rtl'
  }
}
const bt = class i extends ht {
  static fromJSON (t) {
    return new this(K.fromJSON(t.text), t.attributes, t.htmlAttributes)
  }

  constructor (t, e, n) {
    super(...arguments),
    (this.text = As(t || new K())),
    (this.attributes = e || []),
    (this.htmlAttributes = n || {})
  }

  isEmpty () {
    return this.text.isBlockBreak()
  }

  isEqualTo (t) {
    return (
      !!super.isEqualTo(t) ||
            (this.text.isEqualTo(t?.text) &&
                It(this.attributes, t?.attributes) &&
                Zt(this.htmlAttributes, t?.htmlAttributes))
    )
  }

  copyWithText (t) {
    return new i(t, this.attributes, this.htmlAttributes)
  }

  copyWithoutText () {
    return this.copyWithText(null)
  }

  copyWithAttributes (t) {
    return new i(this.text, t, this.htmlAttributes)
  }

  copyWithoutAttributes () {
    return this.copyWithAttributes(null)
  }

  copyUsingObjectMap (t) {
    const e = t.find(this.text)
    return e
      ? this.copyWithText(e)
      : this.copyWithText(this.text.copyUsingObjectMap(t))
  }

  addAttribute (t) {
    const e = this.attributes.concat(br(t))
    return this.copyWithAttributes(e)
  }

  addHTMLAttribute (t, e) {
    const n = Object.assign({}, this.htmlAttributes, { [t]: e })
    return new i(this.text, this.attributes, n)
  }

  removeAttribute (t) {
    const { listAttribute: e } = L(t)
    const n = Ar(Ar(this.attributes, t), e)
    return this.copyWithAttributes(n)
  }

  removeLastAttribute () {
    return this.removeAttribute(this.getLastAttribute())
  }

  getLastAttribute () {
    return vr(this.attributes)
  }

  getAttributes () {
    return this.attributes.slice(0)
  }

  getAttributeLevel () {
    return this.attributes.length
  }

  getAttributeAtLevel (t) {
    return this.attributes[t - 1]
  }

  hasAttribute (t) {
    return this.attributes.includes(t)
  }

  hasAttributes () {
    return this.getAttributeLevel() > 0
  }

  getLastNestableAttribute () {
    return vr(this.getNestableAttributes())
  }

  getNestableAttributes () {
    return this.attributes.filter((t) => L(t).nestable)
  }

  getNestingLevel () {
    return this.getNestableAttributes().length
  }

  decreaseNestingLevel () {
    const t = this.getLastNestableAttribute()
    return t ? this.removeAttribute(t) : this
  }

  increaseNestingLevel () {
    const t = this.getLastNestableAttribute()
    if (t) {
      const e = this.attributes.lastIndexOf(t)
      const n = vi(this.attributes, e + 1, 0, ...br(t))
      return this.copyWithAttributes(n)
    }
    return this
  }

  getListItemAttributes () {
    return this.attributes.filter((t) => L(t).listAttribute)
  }

  isListItem () {
    let t
    return (t = L(this.getLastAttribute())) === null || t === void 0
      ? void 0
      : t.listAttribute
  }

  isTerminalBlock () {
    let t
    return (t = L(this.getLastAttribute())) === null || t === void 0
      ? void 0
      : t.terminal
  }

  breaksOnReturn () {
    let t
    return (t = L(this.getLastAttribute())) === null || t === void 0
      ? void 0
      : t.breakOnReturn
  }

  findLineBreakInDirectionFromPosition (t, e) {
    const n = this.toString()
    let r
    switch (t) {
      case 'forward':
        r = n.indexOf(
                    `
`,
                    e
        )
        break
      case 'backward':
        r = n.slice(0, e).lastIndexOf(`
`)
    }
    if (r !== -1) return r
  }

  contentsForInspection () {
    return { text: this.text.inspect(), attributes: this.attributes }
  }

  toString () {
    return this.text.toString()
  }

  toJSON () {
    return {
      text: this.text,
      attributes: this.attributes,
      htmlAttributes: this.htmlAttributes
    }
  }

  getDirection () {
    return this.text.getDirection()
  }

  isRTL () {
    return this.text.isRTL()
  }

  getLength () {
    return this.text.getLength()
  }

  canBeConsolidatedWith (t) {
    return (
      !this.hasAttributes() &&
            !t.hasAttributes() &&
            this.getDirection() === t.getDirection()
    )
  }

  consolidateWith (t) {
    const e = K.textForStringWithAttributes(`
`)
    const n = this.getTextWithoutBlockBreak().appendText(e)
    return this.copyWithText(n.appendText(t.text))
  }

  splitAtOffset (t) {
    let e, n
    return (
      t === 0
        ? ((e = null), (n = this))
        : t === this.getLength()
          ? ((e = this), (n = null))
          : ((e = this.copyWithText(this.text.getTextAtRange([0, t]))),
            (n = this.copyWithText(
              this.text.getTextAtRange([t, this.getLength()])
            ))),
      [e, n]
    )
  }

  getBlockBreakPosition () {
    return this.text.getLength() - 1
  }

  getTextWithoutBlockBreak () {
    return Kr(this.text)
      ? this.text.getTextAtRange([0, this.getBlockBreakPosition()])
      : this.text.copy()
  }

  canBeGrouped (t) {
    return this.attributes[t]
  }

  canBeGroupedWith (t, e) {
    const n = t.getAttributes()
    const r = n[e]
    const o = this.attributes[e]
    return (
      o === r &&
            !(
              L(o).group === !1 &&
                !(() => {
                  if (!De) {
                    De = []
                    for (const s in U) {
                      const { listAttribute: l } = U[s]
                      l != null && De.push(l)
                    }
                  }
                  return De
                })().includes(n[e + 1])
            ) &&
            (this.getDirection() === t.getDirection() || t.isEmpty())
    )
  }
}
var As = function (i) {
  return (i = ys(i)), (i = Cs(i))
}
var ys = function (i) {
  let t = !1
  const e = i.getPieces()
  let n = e.slice(0, e.length - 1)
  const r = e[e.length - 1]
  return r
    ? ((n = n.map((o) => (o.isBlockBreak() ? ((t = !0), Es(o)) : o))),
      t ? new K([...n, r]) : i)
    : i
}
const xs = K.textForStringWithAttributes(
    `
`,
    { blockBreak: !0 }
)
var Cs = function (i) {
  return Kr(i) ? i : i.appendText(xs)
}
var Kr = function (i) {
  const t = i.getLength()
  return t === 0 ? !1 : i.getTextAtRange([t - 1, t]).isBlockBreak()
}
var Es = (i) => i.copyWithoutAttribute('blockBreak')
var br = function (i) {
  const { listAttribute: t } = L(i)
  return t ? [t, i] : [i]
}
var vr = (i) => i.slice(-1)[0]
var Ar = function (i, t) {
  const e = i.lastIndexOf(t)
  return e === -1 ? i : vi(i, e, 1)
}
const q = class extends ht {
  static fromJSON (t) {
    return new this(Array.from(t).map((e) => bt.fromJSON(e)))
  }

  static fromString (t, e) {
    const n = K.textForStringWithAttributes(t, e)
    return new this([new bt(n)])
  }

  constructor () {
    let t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    super(...arguments),
    t.length === 0 && (t = [new bt()]),
    (this.blockList = Yt.box(t))
  }

  isEmpty () {
    const t = this.getBlockAtIndex(0)
    return this.blockList.length === 1 && t.isEmpty() && !t.hasAttributes()
  }

  copy () {
    const t = (arguments.length > 0 && arguments[0] !== void 0
      ? arguments[0]
      : {}
    ).consolidateBlocks
      ? this.blockList.consolidate().toArray()
      : this.blockList.toArray()
    return new this.constructor(t)
  }

  copyUsingObjectsFromDocument (t) {
    const e = new ni(t.getObjects())
    return this.copyUsingObjectMap(e)
  }

  copyUsingObjectMap (t) {
    const e = this.getBlocks().map(
      (n) => t.find(n) || n.copyUsingObjectMap(t)
    )
    return new this.constructor(e)
  }

  copyWithBaseBlockAttributes () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    const e = this.getBlocks().map((n) => {
      const r = t.concat(n.getAttributes())
      return n.copyWithAttributes(r)
    })
    return new this.constructor(e)
  }

  replaceBlock (t, e) {
    const n = this.blockList.indexOf(t)
    return n === -1
      ? this
      : new this.constructor(this.blockList.replaceObjectAtIndex(e, n))
  }

  insertDocumentAtRange (t, e) {
    const { blockList: n } = t
    e = y(e)
    let [r] = e
    const { index: o, offset: s } = this.locationFromPosition(r)
    let l = this
    const c = this.getBlockAtPosition(r)
    return (
      ut(e) && c.isEmpty() && !c.hasAttributes()
        ? (l = new this.constructor(l.blockList.removeObjectAtIndex(o)))
        : c.getBlockBreakPosition() === s && r++,
      (l = l.removeTextAtRange(e)),
      new this.constructor(
        l.blockList.insertSplittableListAtPosition(n, r)
      )
    )
  }

  mergeDocumentAtRange (t, e) {
    let n, r
    e = y(e)
    const [o] = e
    const s = this.locationFromPosition(o)
    const l = this.getBlockAtIndex(s.index).getAttributes()
    const c = t.getBaseBlockAttributes()
    const u = l.slice(-c.length)
    if (It(c, u)) {
      const T = l.slice(0, -c.length)
      n = t.copyWithBaseBlockAttributes(T)
    } else {
      n = t
        .copy({ consolidateBlocks: !0 })
        .copyWithBaseBlockAttributes(l)
    }
    const d = n.getBlockCount()
    const C = n.getBlockAtIndex(0)
    if (It(l, C.getAttributes())) {
      const T = C.getTextWithoutBlockBreak()
      if (((r = this.insertTextAtRange(T, e)), d > 1)) {
        n = new this.constructor(n.getBlocks().slice(1))
        const J = o + T.getLength()
        r = r.insertDocumentAtRange(n, J)
      }
    } else r = this.insertDocumentAtRange(n, e)
    return r
  }

  insertTextAtRange (t, e) {
    e = y(e)
    const [n] = e
    const { index: r, offset: o } = this.locationFromPosition(n)
    const s = this.removeTextAtRange(e)
    return new this.constructor(
      s.blockList.editObjectAtIndex(r, (l) =>
        l.copyWithText(l.text.insertTextAtPosition(t, o))
      )
    )
  }

  removeTextAtRange (t) {
    let e
    t = y(t)
    const [n, r] = t
    if (ut(t)) return this
    const [o, s] = Array.from(this.locationRangeFromRange(t))
    const l = o.index
    const c = o.offset
    const u = this.getBlockAtIndex(l)
    const d = s.index
    const C = s.offset
    const T = this.getBlockAtIndex(d)
    if (
      r - n == 1 &&
            u.getBlockBreakPosition() === c &&
            T.getBlockBreakPosition() !== C &&
            T.text.getStringAtPosition(C) ===
                `
`
    ) {
      e = this.blockList.editObjectAtIndex(d, (J) =>
        J.copyWithText(J.text.removeTextAtRange([C, C + 1]))
      )
    } else {
      let J
      const Q = u.text.getTextAtRange([0, c])
      const M = T.text.getTextAtRange([C, T.getLength()])
      const mt = Q.appendText(M)
      J =
                l !== d &&
                c === 0 &&
                u.getAttributeLevel() >= T.getAttributeLevel()
                  ? T.copyWithText(mt)
                  : u.copyWithText(mt)
      const yt = d + 1 - l
      e = this.blockList.splice(l, yt, J)
    }
    return new this.constructor(e)
  }

  moveTextFromRangeToPosition (t, e) {
    let n
    t = y(t)
    const [r, o] = t
    if (r <= e && e <= o) return this
    let s = this.getDocumentAtRange(t)
    let l = this.removeTextAtRange(t)
    const c = r < e
    c && (e -= s.getLength())
    const [u, ...d] = s.getBlocks()
    return (
      d.length === 0
        ? ((n = u.getTextWithoutBlockBreak()), c && (e += 1))
        : (n = u.text),
      (l = l.insertTextAtRange(n, e)),
      d.length === 0
        ? l
        : ((s = new this.constructor(d)),
          (e += n.getLength()),
          l.insertDocumentAtRange(s, e))
    )
  }

  addAttributeAtRange (t, e, n) {
    let { blockList: r } = this
    return (
      this.eachBlockAtRange(
        n,
        (o, s, l) =>
          (r = r.editObjectAtIndex(l, function () {
            return L(t)
              ? o.addAttribute(t, e)
              : s[0] === s[1]
                ? o
                : o.copyWithText(
                  o.text.addAttributeAtRange(t, e, s)
                )
          }))
      ),
      new this.constructor(r)
    )
  }

  addAttribute (t, e) {
    let { blockList: n } = this
    return (
      this.eachBlock(
        (r, o) =>
          (n = n.editObjectAtIndex(o, () => r.addAttribute(t, e)))
      ),
      new this.constructor(n)
    )
  }

  removeAttributeAtRange (t, e) {
    let { blockList: n } = this
    return (
      this.eachBlockAtRange(e, function (r, o, s) {
        L(t)
          ? (n = n.editObjectAtIndex(s, () => r.removeAttribute(t)))
          : o[0] !== o[1] &&
                      (n = n.editObjectAtIndex(s, () =>
                        r.copyWithText(r.text.removeAttributeAtRange(t, o))
                      ))
      }),
      new this.constructor(n)
    )
  }

  updateAttributesForAttachment (t, e) {
    const n = this.getRangeOfAttachment(e)
    const [r] = Array.from(n)
    const { index: o } = this.locationFromPosition(r)
    const s = this.getTextAtIndex(o)
    return new this.constructor(
      this.blockList.editObjectAtIndex(o, (l) =>
        l.copyWithText(s.updateAttributesForAttachment(t, e))
      )
    )
  }

  removeAttributeForAttachment (t, e) {
    const n = this.getRangeOfAttachment(e)
    return this.removeAttributeAtRange(t, n)
  }

  setHTMLAttributeAtPosition (t, e, n) {
    const r = this.getBlockAtPosition(t)
    const o = r.addHTMLAttribute(e, n)
    return this.replaceBlock(r, o)
  }

  insertBlockBreakAtRange (t) {
    let e
    t = y(t)
    const [n] = t
    const { offset: r } = this.locationFromPosition(n)
    const o = this.removeTextAtRange(t)
    return (
      r === 0 && (e = [new bt()]),
      new this.constructor(
        o.blockList.insertSplittableListAtPosition(new Yt(e), n)
      )
    )
  }

  applyBlockAttributeAtRange (t, e, n) {
    const r = this.expandRangeToLineBreaksAndSplitBlocks(n)
    let o = r.document
    n = r.range
    const s = L(t)
    if (s.listAttribute) {
      o = o.removeLastListAttributeAtRange(n, {
        exceptAttributeName: t
      })
      const l = o.convertLineBreaksToBlockBreaksInRange(n);
      (o = l.document), (n = l.range)
    } else {
      o = s.exclusive
        ? o.removeBlockAttributesAtRange(n)
        : s.terminal
          ? o.removeLastTerminalAttributeAtRange(n)
          : o.consolidateBlocksAtRange(n)
    }
    return o.addAttributeAtRange(t, e, n)
  }

  removeLastListAttributeAtRange (t) {
    const e =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    let { blockList: n } = this
    return (
      this.eachBlockAtRange(t, function (r, o, s) {
        const l = r.getLastAttribute()
        l &&
                    L(l).listAttribute &&
                    l !== e.exceptAttributeName &&
                    (n = n.editObjectAtIndex(s, () => r.removeAttribute(l)))
      }),
      new this.constructor(n)
    )
  }

  removeLastTerminalAttributeAtRange (t) {
    let { blockList: e } = this
    return (
      this.eachBlockAtRange(t, function (n, r, o) {
        const s = n.getLastAttribute()
        s &&
                    L(s).terminal &&
                    (e = e.editObjectAtIndex(o, () => n.removeAttribute(s)))
      }),
      new this.constructor(e)
    )
  }

  removeBlockAttributesAtRange (t) {
    let { blockList: e } = this
    return (
      this.eachBlockAtRange(t, function (n, r, o) {
        n.hasAttributes() &&
                    (e = e.editObjectAtIndex(o, () =>
                      n.copyWithoutAttributes()
                    ))
      }),
      new this.constructor(e)
    )
  }

  expandRangeToLineBreaksAndSplitBlocks (t) {
    let e
    t = y(t)
    let [n, r] = t
    const o = this.locationFromPosition(n)
    const s = this.locationFromPosition(r)
    let l = this
    const c = l.getBlockAtIndex(o.index)
    if (
      ((o.offset = c.findLineBreakInDirectionFromPosition(
        'backward',
        o.offset
      )),
      o.offset != null &&
                ((e = l.positionFromLocation(o)),
                (l = l.insertBlockBreakAtRange([e, e + 1])),
                (s.index += 1),
                (s.offset -= l.getBlockAtIndex(o.index).getLength()),
                (o.index += 1)),
      (o.offset = 0),
      s.offset === 0 && s.index > o.index)
    ) {
      (s.index -= 1),
      (s.offset = l.getBlockAtIndex(s.index).getBlockBreakPosition())
    } else {
      const u = l.getBlockAtIndex(s.index)
      u.text.getStringAtRange([s.offset - 1, s.offset]) ===
            `
`
        ? (s.offset -= 1)
        : (s.offset = u.findLineBreakInDirectionFromPosition(
            'forward',
            s.offset
          )),
      s.offset !== u.getBlockBreakPosition() &&
                    ((e = l.positionFromLocation(s)),
                    (l = l.insertBlockBreakAtRange([e, e + 1])))
    }
    return (
      (n = l.positionFromLocation(o)),
      (r = l.positionFromLocation(s)),
      { document: l, range: (t = y([n, r])) }
    )
  }

  convertLineBreaksToBlockBreaksInRange (t) {
    t = y(t)
    let [e] = t
    const n = this.getStringAtRange(t).slice(0, -1)
    let r = this
    return (
      n.replace(/.*?\n/g, function (o) {
        (e += o.length), (r = r.insertBlockBreakAtRange([e - 1, e]))
      }),
      { document: r, range: t }
    )
  }

  consolidateBlocksAtRange (t) {
    t = y(t)
    const [e, n] = t
    const r = this.locationFromPosition(e).index
    const o = this.locationFromPosition(n).index
    return new this.constructor(
      this.blockList.consolidateFromIndexToIndex(r, o)
    )
  }

  getDocumentAtRange (t) {
    t = y(t)
    const e = this.blockList.getSplittableListInRange(t).toArray()
    return new this.constructor(e)
  }

  getStringAtRange (t) {
    let e
    const n = (t = y(t))
    return (
      n[n.length - 1] !== this.getLength() && (e = -1),
      this.getDocumentAtRange(t).toString().slice(0, e)
    )
  }

  getBlockAtIndex (t) {
    return this.blockList.getObjectAtIndex(t)
  }

  getBlockAtPosition (t) {
    const { index: e } = this.locationFromPosition(t)
    return this.getBlockAtIndex(e)
  }

  getTextAtIndex (t) {
    let e
    return (e = this.getBlockAtIndex(t)) === null || e === void 0
      ? void 0
      : e.text
  }

  getTextAtPosition (t) {
    const { index: e } = this.locationFromPosition(t)
    return this.getTextAtIndex(e)
  }

  getPieceAtPosition (t) {
    const { index: e, offset: n } = this.locationFromPosition(t)
    return this.getTextAtIndex(e).getPieceAtPosition(n)
  }

  getCharacterAtPosition (t) {
    const { index: e, offset: n } = this.locationFromPosition(t)
    return this.getTextAtIndex(e).getStringAtRange([n, n + 1])
  }

  getLength () {
    return this.blockList.getEndPosition()
  }

  getBlocks () {
    return this.blockList.toArray()
  }

  getBlockCount () {
    return this.blockList.length
  }

  getEditCount () {
    return this.editCount
  }

  eachBlock (t) {
    return this.blockList.eachObject(t)
  }

  eachBlockAtRange (t, e) {
    let n, r
    t = y(t)
    const [o, s] = t
    const l = this.locationFromPosition(o)
    const c = this.locationFromPosition(s)
    if (l.index === c.index) {
      return (
        (n = this.getBlockAtIndex(l.index)),
        (r = [l.offset, c.offset]),
        e(n, r, l.index)
      )
    }
    for (let u = l.index; u <= c.index; u++) {
      if (((n = this.getBlockAtIndex(u)), n)) {
        switch (u) {
          case l.index:
            r = [l.offset, n.text.getLength()]
            break
          case c.index:
            r = [0, c.offset]
            break
          default:
            r = [0, n.text.getLength()]
        }
        e(n, r, u)
      }
    }
  }

  getCommonAttributesAtRange (t) {
    t = y(t)
    const [e] = t
    if (ut(t)) return this.getCommonAttributesAtPosition(e)
    {
      const n = []
      const r = []
      return (
        this.eachBlockAtRange(t, function (o, s) {
          if (s[0] !== s[1]) {
            return (
              n.push(o.text.getCommonAttributesAtRange(s)),
              r.push(yr(o))
            )
          }
        }),
        X.fromCommonAttributesOfObjects(n)
          .merge(X.fromCommonAttributesOfObjects(r))
          .toObject()
      )
    }
  }

  getCommonAttributesAtPosition (t) {
    let e
    let n
    const { index: r, offset: o } = this.locationFromPosition(t)
    const s = this.getBlockAtIndex(r)
    if (!s) return {}
    const l = yr(s)
    const c = s.text.getAttributesAtPosition(o)
    const u = s.text.getAttributesAtPosition(o - 1)
    const d = Object.keys(Dt).filter((C) => Dt[C].inheritable)
    for (e in u) {
      (n = u[e]), (n === c[e] || d.includes(e)) && (l[e] = n)
    }
    return l
  }

  getRangeOfCommonAttributeAtPosition (t, e) {
    const { index: n, offset: r } = this.locationFromPosition(e)
    const o = this.getTextAtIndex(n)
    const [s, l] = Array.from(o.getExpandedRangeForAttributeAtOffset(t, r))
    const c = this.positionFromLocation({ index: n, offset: s })
    const u = this.positionFromLocation({ index: n, offset: l })
    return y([c, u])
  }

  getBaseBlockAttributes () {
    let t = this.getBlockAtIndex(0).getAttributes()
    for (let e = 1; e < this.getBlockCount(); e++) {
      const n = this.getBlockAtIndex(e).getAttributes()
      const r = Math.min(t.length, n.length)
      t = (() => {
        const o = []
        for (let s = 0; s < r && n[s] === t[s]; s++) o.push(n[s])
        return o
      })()
    }
    return t
  }

  getAttachmentById (t) {
    for (const e of this.getAttachments()) if (e.id === t) return e
  }

  getAttachmentPieces () {
    let t = []
    return (
      this.blockList.eachObject((e) => {
        const { text: n } = e
        return (t = t.concat(n.getAttachmentPieces()))
      }),
      t
    )
  }

  getAttachments () {
    return this.getAttachmentPieces().map((t) => t.attachment)
  }

  getRangeOfAttachment (t) {
    let e = 0
    const n = this.blockList.toArray()
    for (let r = 0; r < n.length; r++) {
      const { text: o } = n[r]
      const s = o.getRangeOfAttachment(t)
      if (s) return y([e + s[0], e + s[1]])
      e += o.getLength()
    }
  }

  getLocationRangeOfAttachment (t) {
    const e = this.getRangeOfAttachment(t)
    return this.locationRangeFromRange(e)
  }

  getAttachmentPieceForAttachment (t) {
    for (const e of this.getAttachmentPieces()) {
      if (e.attachment === t) return e
    }
  }

  findRangesForBlockAttribute (t) {
    let e = 0
    const n = []
    return (
      this.getBlocks().forEach((r) => {
        const o = r.getLength()
        r.hasAttribute(t) && n.push([e, e + o]), (e += o)
      }),
      n
    )
  }

  findRangesForTextAttribute (t) {
    const { withValue: e } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    let n = 0
    let r = []
    const o = []
    return (
      this.getPieces().forEach((s) => {
        const l = s.getLength();
        (function (c) {
          return e ? c.getAttribute(t) === e : c.hasAttribute(t)
        })(s) &&
                    (r[1] === n ? (r[1] = n + l) : o.push((r = [n, n + l]))),
        (n += l)
      }),
      o
    )
  }

  locationFromPosition (t) {
    const e = this.blockList.findIndexAndOffsetAtPosition(Math.max(0, t))
    if (e.index != null) return e
    {
      const n = this.getBlocks()
      return {
        index: n.length - 1,
        offset: n[n.length - 1].getLength()
      }
    }
  }

  positionFromLocation (t) {
    return this.blockList.findPositionAtIndexAndOffset(t.index, t.offset)
  }

  locationRangeFromPosition (t) {
    return y(this.locationFromPosition(t))
  }

  locationRangeFromRange (t) {
    if (!(t = y(t))) return
    const [e, n] = Array.from(t)
    const r = this.locationFromPosition(e)
    const o = this.locationFromPosition(n)
    return y([r, o])
  }

  rangeFromLocationRange (t) {
    let e
    t = y(t)
    const n = this.positionFromLocation(t[0])
    return ut(t) || (e = this.positionFromLocation(t[1])), y([n, e])
  }

  isEqualTo (t) {
    return this.blockList.isEqualTo(t?.blockList)
  }

  getTexts () {
    return this.getBlocks().map((t) => t.text)
  }

  getPieces () {
    const t = []
    return (
      Array.from(this.getTexts()).forEach((e) => {
        t.push(...Array.from(e.getPieces() || []))
      }),
      t
    )
  }

  getObjects () {
    return this.getBlocks()
      .concat(this.getTexts())
      .concat(this.getPieces())
  }

  toSerializableDocument () {
    const t = []
    return (
      this.blockList.eachObject((e) =>
        t.push(e.copyWithText(e.text.toSerializableText()))
      ),
      new this.constructor(t)
    )
  }

  toString () {
    return this.blockList.toString()
  }

  toJSON () {
    return this.blockList.toJSON()
  }

  toConsole () {
    return JSON.stringify(
      this.blockList.toArray().map((t) => JSON.parse(t.text.toConsole()))
    )
  }
}
var yr = function (i) {
  const t = {}
  const e = i.getLastAttribute()
  return e && (t[e] = !0), t
}
const jn = function (i) {
  const t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  return { string: (i = he(i)), attributes: t, type: 'string' }
}
const xr = (i, t) => {
  try {
    return JSON.parse(i.getAttribute('data-trix-'.concat(t)))
  } catch {
    return {}
  }
}
const Ft = class extends R {
  static parse (t, e) {
    const n = new this(t, e)
    return n.parse(), n
  }

  constructor (t) {
    const { referenceElement: e, purifyOptions: n } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    super(...arguments),
    (this.html = t),
    (this.referenceElement = e),
    (this.purifyOptions = n),
    (this.blocks = []),
    (this.blockElements = []),
    (this.processedElements = [])
  }

  getDocument () {
    return q.fromJSON(this.blocks)
  }

  parse () {
    try {
      this.createHiddenContainer(),
      qt.setHTML(this.containerElement, this.html, {
        purifyOptions: this.purifyOptions
      })
      const t = je(this.containerElement, { usingFilter: ks })
      for (; t.nextNode();) this.processNode(t.currentNode)
      return this.translateBlockElementMarginsToNewlines()
    } finally {
      this.removeHiddenContainer()
    }
  }

  createHiddenContainer () {
    return this.referenceElement
      ? ((this.containerElement = this.referenceElement.cloneNode(!1)),
        this.containerElement.removeAttribute('id'),
        this.containerElement.setAttribute('data-trix-internal', ''),
        (this.containerElement.style.display = 'none'),
        this.referenceElement.parentNode.insertBefore(
          this.containerElement,
          this.referenceElement.nextSibling
        ))
      : ((this.containerElement = p({
          tagName: 'div',
          style: { display: 'none' }
        })),
        document.body.appendChild(this.containerElement))
  }

  removeHiddenContainer () {
    return At(this.containerElement)
  }

  processNode (t) {
    switch (t.nodeType) {
      case Node.TEXT_NODE:
        if (!this.isInsignificantTextNode(t)) {
          return (
            this.appendBlockForTextNode(t), this.processTextNode(t)
          )
        }
        break
      case Node.ELEMENT_NODE:
        return this.appendBlockForElement(t), this.processElement(t)
    }
  }

  appendBlockForTextNode (t) {
    const e = t.parentNode
    if (
      e === this.currentBlockElement &&
            this.isBlockElement(t.previousSibling)
    ) {
      return this.appendStringWithAttributes(`
`)
    }
    if (e === this.containerElement || this.isBlockElement(e)) {
      let n
      const r = this.getBlockAttributes(e)
      const o = this.getBlockHTMLAttributes(e)
      It(
        r,
        (n = this.currentBlock) === null || n === void 0
          ? void 0
          : n.attributes
      ) ||
                ((this.currentBlock = this.appendBlockForAttributesWithElement(
                  r,
                  e,
                  o
                )),
                (this.currentBlockElement = e))
    }
  }

  appendBlockForElement (t) {
    const e = this.isBlockElement(t)
    const n = kt(this.currentBlockElement, t)
    if (e && !this.isBlockElement(t.firstChild)) {
      if (
        !this.isInsignificantTextNode(t.firstChild) ||
                !this.isBlockElement(t.firstElementChild)
      ) {
        const r = this.getBlockAttributes(t)
        const o = this.getBlockHTMLAttributes(t)
        if (t.firstChild) {
          if (n && It(r, this.currentBlock.attributes)) {
            return this.appendStringWithAttributes(`
`)
          }
          (this.currentBlock =
                        this.appendBlockForAttributesWithElement(r, t, o)),
          (this.currentBlockElement = t)
        }
      }
    } else if (this.currentBlockElement && !n && !e) {
      const r = this.findParentBlockElement(t)
      if (r) return this.appendBlockForElement(r);
      (this.currentBlock = this.appendEmptyBlock()),
      (this.currentBlockElement = null)
    }
  }

  findParentBlockElement (t) {
    let { parentElement: e } = t
    for (; e && e !== this.containerElement;) {
      if (this.isBlockElement(e) && this.blockElements.includes(e)) {
        return e
      }
      e = e.parentElement
    }
    return null
  }

  processTextNode (t) {
    let e = t.data
    let n
    return (
      Cr(t.parentNode) ||
                ((e = xi(e)),
                Gr(
                  (n = t.previousSibling) === null || n === void 0
                    ? void 0
                    : n.textContent
                ) && (e = Rs(e))),
      this.appendStringWithAttributes(
        e,
        this.getTextAttributes(t.parentNode)
      )
    )
  }

  processElement (t) {
    let e
    if (Tt(t)) {
      if (((e = xr(t, 'attachment')), Object.keys(e).length)) {
        const n = this.getTextAttributes(t)
        this.appendAttachmentWithAttributes(e, n), (t.innerHTML = '')
      }
      return this.processedElements.push(t)
    }
    switch (W(t)) {
      case 'br':
        return (
          this.isExtraBR(t) ||
                        this.isBlockElement(t.nextSibling) ||
                        this.appendStringWithAttributes(
                            `
`,
                            this.getTextAttributes(t)
                        ),
          this.processedElements.push(t)
        )
      case 'img':
        e = { url: t.getAttribute('src'), contentType: 'image' }
        const n = ((r) => {
          const o = r.getAttribute('width')
          const s = r.getAttribute('height')
          const l = {}
          return (
            o && (l.width = parseInt(o, 10)),
            s && (l.height = parseInt(s, 10)),
            l
          )
        })(t)
        for (const r in n) {
          const o = n[r]
          e[r] = o
        }
        return (
          this.appendAttachmentWithAttributes(
            e,
            this.getTextAttributes(t)
          ),
          this.processedElements.push(t)
        )
      case 'tr':
        if (this.needsTableSeparator(t)) {
          return this.appendStringWithAttributes(
            Me.tableRowSeparator
          )
        }
        break
      case 'td':
        if (this.needsTableSeparator(t)) {
          return this.appendStringWithAttributes(
            Me.tableCellSeparator
          )
        }
    }
  }

  appendBlockForAttributesWithElement (t, e) {
    const n =
            arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}
    this.blockElements.push(e)
    const r = (function () {
      return {
        text: [],
        attributes:
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : {},
        htmlAttributes:
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : {}
      }
    })(t, n)
    return this.blocks.push(r), r
  }

  appendEmptyBlock () {
    return this.appendBlockForAttributesWithElement([], null)
  }

  appendStringWithAttributes (t, e) {
    return this.appendPiece(jn(t, e))
  }

  appendAttachmentWithAttributes (t, e) {
    return this.appendPiece(
      (function (n) {
        return {
          attachment: n,
          attributes:
                        arguments.length > 1 && arguments[1] !== void 0
                          ? arguments[1]
                          : {},
          type: 'attachment'
        }
      })(t, e)
    )
  }

  appendPiece (t) {
    return (
      this.blocks.length === 0 && this.appendEmptyBlock(),
      this.blocks[this.blocks.length - 1].text.push(t)
    )
  }

  appendStringToTextAtIndex (t, e) {
    const { text: n } = this.blocks[e]
    const r = n[n.length - 1]
    if (r?.type !== 'string') return n.push(jn(t))
    r.string += t
  }

  prependStringToTextAtIndex (t, e) {
    const { text: n } = this.blocks[e]
    const r = n[0]
    if (r?.type !== 'string') return n.unshift(jn(t))
    r.string = t + r.string
  }

  getTextAttributes (t) {
    let e
    const n = {}
    for (const r in Dt) {
      const o = Dt[r]
      if (
        o.tagName &&
                vt(t, {
                  matchingSelector: o.tagName,
                  untilNode: this.containerElement
                })
      ) {
        n[r] = !0
      } else if (o.parser) {
        if (((e = o.parser(t)), e)) {
          let s = !1
          for (const l of this.findBlockElementAncestors(t)) {
            if (o.parser(l) === e) {
              s = !0
              break
            }
          }
          s || (n[r] = e)
        }
      } else {
        o.styleProperty &&
                    ((e = t.style[o.styleProperty]), e && (n[r] = e))
      }
    }
    if (Tt(t)) {
      const r = xr(t, 'attributes')
      for (const o in r) (e = r[o]), (n[o] = e)
    }
    return n
  }

  getBlockAttributes (t) {
    const e = []
    for (; t && t !== this.containerElement;) {
      for (const r in U) {
        const o = U[r]
        var n
        o.parse !== !1 &&
                    W(t) === o.tagName &&
                    (((n = o.test) !== null && n !== void 0 && n.call(o, t)) ||
                        !o.test) &&
                    (e.push(r), o.listAttribute && e.push(o.listAttribute))
      }
      t = t.parentNode
    }
    return e.reverse()
  }

  getBlockHTMLAttributes (t) {
    const e = {}
    const n = Object.values(U).find((r) => r.tagName === W(t))
    return (
      (n?.htmlAttributes || []).forEach((r) => {
        t.hasAttribute(r) && (e[r] = t.getAttribute(r))
      }),
      e
    )
  }

  findBlockElementAncestors (t) {
    const e = []
    for (; t && t !== this.containerElement;) {
      const n = W(t)
      ge().includes(n) && e.push(t), (t = t.parentNode)
    }
    return e
  }

  isBlockElement (t) {
    if (
      t?.nodeType === Node.ELEMENT_NODE &&
            !Tt(t) &&
            !vt(t, {
              matchingSelector: 'td',
              untilNode: this.containerElement
            })
    ) {
      return (
        ge().includes(W(t)) ||
                window.getComputedStyle(t).display === 'block'
      )
    }
  }

  isInsignificantTextNode (t) {
    if (t?.nodeType !== Node.TEXT_NODE || !Ts(t.data)) return
    const { parentNode: e, previousSibling: n, nextSibling: r } = t
    return (Ss(e.previousSibling) &&
            !this.isBlockElement(e.previousSibling)) ||
            Cr(e)
      ? void 0
      : !n || this.isBlockElement(n) || !r || this.isBlockElement(r)
  }

  isExtraBR (t) {
    return (
      W(t) === 'br' &&
            this.isBlockElement(t.parentNode) &&
            t.parentNode.lastChild === t
    )
  }

  needsTableSeparator (t) {
    if (Me.removeBlankTableCells) {
      let e
      const n =
                (e = t.previousSibling) === null || e === void 0
                  ? void 0
                  : e.textContent
      return n && /\S/.test(n)
    }
    return t.previousSibling
  }

  translateBlockElementMarginsToNewlines () {
    const t = this.getMarginOfDefaultBlockElement()
    for (let e = 0; e < this.blocks.length; e++) {
      const n = this.getMarginOfBlockElementAtIndex(e)
      n &&
                (n.top > 2 * t.top &&
                    this.prependStringToTextAtIndex(
                        `
`,
                        e
                    ),
                n.bottom > 2 * t.bottom &&
                    this.appendStringToTextAtIndex(
                        `
`,
                        e
                    ))
    }
  }

  getMarginOfBlockElementAtIndex (t) {
    const e = this.blockElements[t]
    if (
      e &&
            e.textContent &&
            !ge().includes(W(e)) &&
            !this.processedElements.includes(e)
    ) {
      return Er(e)
    }
  }

  getMarginOfDefaultBlockElement () {
    const t = p(U.default.tagName)
    return this.containerElement.appendChild(t), Er(t)
  }
}
var Cr = function (i) {
  const { whiteSpace: t } = window.getComputedStyle(i)
  return ['pre', 'pre-wrap', 'pre-line'].includes(t)
}
var Ss = (i) => i && !Gr(i.textContent)
var Er = function (i) {
  const t = window.getComputedStyle(i)
  if (t.display === 'block') {
    return {
      top: parseInt(t.marginTop),
      bottom: parseInt(t.marginBottom)
    }
  }
}
var ks = function (i) {
  return W(i) === 'style'
    ? NodeFilter.FILTER_REJECT
    : NodeFilter.FILTER_ACCEPT
}
var Rs = (i) => i.replace(new RegExp('^'.concat(yi.source, '+')), '')
var Ts = (i) => new RegExp('^'.concat(yi.source, '*$')).test(i)
var Gr = (i) => /\s$/.test(i)
const ws = [
  'contenteditable',
  'data-trix-id',
  'data-trix-store-key',
  'data-trix-mutable',
  'data-trix-placeholder',
  'tabindex'
]
const ai = 'data-trix-serialized-attributes'
const Ls = '['.concat(ai, ']')
const Ds = new RegExp('<!--block-->', 'g')
const Ns = {
  'application/json': function (i) {
    let t
    if (i instanceof q) t = i
    else {
      if (!(i instanceof HTMLElement)) {
        throw new Error('unserializable object')
      }
      t = Ft.parse(i.innerHTML).getDocument()
    }
    return t.toSerializableDocument().toJSONString()
  },
  'text/html': function (i) {
    let t
    if (i instanceof q) t = Jt.render(i)
    else {
      if (!(i instanceof HTMLElement)) {
        throw new Error('unserializable object')
      }
      t = i.cloneNode(!0)
    }
    return (
      Array.from(
        t.querySelectorAll('[data-trix-serialize=false]')
      ).forEach((e) => {
        At(e)
      }),
      ws.forEach((e) => {
        Array.from(t.querySelectorAll('['.concat(e, ']'))).forEach(
          (n) => {
            n.removeAttribute(e)
          }
        )
      }),
      Array.from(t.querySelectorAll(Ls)).forEach((e) => {
        try {
          const n = JSON.parse(e.getAttribute(ai))
          e.removeAttribute(ai)
          for (const r in n) {
            const o = n[r]
            e.setAttribute(r, o)
          }
        } catch {}
      }),
      t.innerHTML.replace(Ds, '')
    )
  }
}
const Is = Object.freeze({ __proto__: null })
const E = class extends R {
  constructor (t, e) {
    super(...arguments),
    (this.attachmentManager = t),
    (this.attachment = e),
    (this.id = this.attachment.id),
    (this.file = this.attachment.file)
  }

  remove () {
    return this.attachmentManager.requestRemovalOfAttachment(
      this.attachment
    )
  }
}
E.proxyMethod('attachment.getAttribute'),
E.proxyMethod('attachment.hasAttribute'),
E.proxyMethod('attachment.setAttribute'),
E.proxyMethod('attachment.getAttributes'),
E.proxyMethod('attachment.setAttributes'),
E.proxyMethod('attachment.isPending'),
E.proxyMethod('attachment.isPreviewable'),
E.proxyMethod('attachment.getURL'),
E.proxyMethod('attachment.getHref'),
E.proxyMethod('attachment.getFilename'),
E.proxyMethod('attachment.getFilesize'),
E.proxyMethod('attachment.getFormattedFilesize'),
E.proxyMethod('attachment.getExtension'),
E.proxyMethod('attachment.getContentType'),
E.proxyMethod('attachment.getFile'),
E.proxyMethod('attachment.setFile'),
E.proxyMethod('attachment.releaseFile'),
E.proxyMethod('attachment.getUploadProgress'),
E.proxyMethod('attachment.setUploadProgress')
const Ge = class extends R {
  constructor () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
    super(...arguments),
    (this.managedAttachments = {}),
    Array.from(t).forEach((e) => {
      this.manageAttachment(e)
    })
  }

  getAttachments () {
    const t = []
    for (const e in this.managedAttachments) {
      const n = this.managedAttachments[e]
      t.push(n)
    }
    return t
  }

  manageAttachment (t) {
    return (
      this.managedAttachments[t.id] ||
                (this.managedAttachments[t.id] = new E(this, t)),
      this.managedAttachments[t.id]
    )
  }

  attachmentIsManaged (t) {
    return t.id in this.managedAttachments
  }

  requestRemovalOfAttachment (t) {
    let e, n
    if (this.attachmentIsManaged(t)) {
      return (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.attachmentManagerDidRequestRemovalOfAttachment) ===
                    null ||
                n === void 0
        ? void 0
        : n.call(e, t)
    }
  }

  unmanageAttachment (t) {
    const e = this.managedAttachments[t.id]
    return delete this.managedAttachments[t.id], e
  }
}
const Ye = class {
  constructor (t) {
    (this.composition = t), (this.document = this.composition.document)
    const e = this.composition.getSelectedRange();
    (this.startPosition = e[0]),
    (this.endPosition = e[1]),
    (this.startLocation = this.document.locationFromPosition(
      this.startPosition
    )),
    (this.endLocation = this.document.locationFromPosition(
      this.endPosition
    )),
    (this.block = this.document.getBlockAtIndex(
      this.endLocation.index
    )),
    (this.breaksOnReturn = this.block.breaksOnReturn()),
    (this.previousCharacter = this.block.text.getStringAtPosition(
      this.endLocation.offset - 1
    )),
    (this.nextCharacter = this.block.text.getStringAtPosition(
      this.endLocation.offset
    ))
  }

  shouldInsertBlockBreak () {
    return this.block.hasAttributes() &&
            this.block.isListItem() &&
            !this.block.isEmpty()
      ? this.startLocation.offset !== 0
      : this.breaksOnReturn &&
                  this.nextCharacter !==
                      `
`
  }

  shouldBreakFormattedBlock () {
    return (
      this.block.hasAttributes() &&
            !this.block.isListItem() &&
            ((this.breaksOnReturn &&
                this.nextCharacter ===
                    `
`) ||
                this.previousCharacter ===
                    `
`)
    )
  }

  shouldDecreaseListLevel () {
    return (
      this.block.hasAttributes() &&
            this.block.isListItem() &&
            this.block.isEmpty()
    )
  }

  shouldPrependListItem () {
    return (
      this.block.isListItem() &&
            this.startLocation.offset === 0 &&
            !this.block.isEmpty()
    )
  }

  shouldRemoveLastBlockAttribute () {
    return (
      this.block.hasAttributes() &&
            !this.block.isListItem() &&
            this.block.isEmpty()
    )
  }
}
const it = class extends R {
  constructor () {
    super(...arguments),
    (this.document = new q()),
    (this.attachments = []),
    (this.currentAttributes = {}),
    (this.revision = 0)
  }

  setDocument (t) {
    let e, n
    if (!t.isEqualTo(this.document)) {
      return (
        (this.document = t),
        this.refreshAttachments(),
        this.revision++,
        (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.compositionDidChangeDocument) === null ||
                n === void 0
          ? void 0
          : n.call(e, t)
      )
    }
  }

  getSnapshot () {
    return {
      document: this.document,
      selectedRange: this.getSelectedRange()
    }
  }

  loadSnapshot (t) {
    let e, n, r, o
    const { document: s, selectedRange: l } = t
    return (
      (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.compositionWillLoadSnapshot) === null ||
                n === void 0 ||
                n.call(e),
      this.setDocument(s ?? new q()),
      this.setSelection(l ?? [0, 0]),
      (r = this.delegate) === null ||
            r === void 0 ||
            (o = r.compositionDidLoadSnapshot) === null ||
            o === void 0
        ? void 0
        : o.call(r)
    )
  }

  insertText (t) {
    const { updatePosition: e } =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : { updatePosition: !0 }
    const n = this.getSelectedRange()
    this.setDocument(this.document.insertTextAtRange(t, n))
    const r = n[0]
    const o = r + t.getLength()
    return (
      e && this.setSelection(o),
      this.notifyDelegateOfInsertionAtRange([r, o])
    )
  }

  insertBlock () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : new bt()
    const e = new q([t])
    return this.insertDocument(e)
  }

  insertDocument () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : new q()
    const e = this.getSelectedRange()
    this.setDocument(this.document.insertDocumentAtRange(t, e))
    const n = e[0]
    const r = n + t.getLength()
    return (
      this.setSelection(r), this.notifyDelegateOfInsertionAtRange([n, r])
    )
  }

  insertString (t, e) {
    const n = this.getCurrentTextAttributes()
    const r = K.textForStringWithAttributes(t, n)
    return this.insertText(r, e)
  }

  insertBlockBreak () {
    const t = this.getSelectedRange()
    this.setDocument(this.document.insertBlockBreakAtRange(t))
    const e = t[0]
    const n = e + 1
    return (
      this.setSelection(n), this.notifyDelegateOfInsertionAtRange([e, n])
    )
  }

  insertLineBreak () {
    const t = new Ye(this)
    if (t.shouldDecreaseListLevel()) {
      return this.decreaseListLevel(), this.setSelection(t.startPosition)
    }
    if (t.shouldPrependListItem()) {
      const e = new q([t.block.copyWithoutText()])
      return this.insertDocument(e)
    }
    return t.shouldInsertBlockBreak()
      ? this.insertBlockBreak()
      : t.shouldRemoveLastBlockAttribute()
        ? this.removeLastBlockAttribute()
        : t.shouldBreakFormattedBlock()
          ? this.breakFormattedBlock(t)
          : this.insertString(`
`)
  }

  insertHTML (t) {
    const e = Ft.parse(t, {
      purifyOptions: { SAFE_FOR_XML: !0 }
    }).getDocument()
    const n = this.getSelectedRange()
    this.setDocument(this.document.mergeDocumentAtRange(e, n))
    const r = n[0]
    const o = r + e.getLength() - 1
    return (
      this.setSelection(o), this.notifyDelegateOfInsertionAtRange([r, o])
    )
  }

  replaceHTML (t) {
    const e = Ft.parse(t)
      .getDocument()
      .copyUsingObjectsFromDocument(this.document)
    const n = this.getLocationRange({ strict: !1 })
    const r = this.document.rangeFromLocationRange(n)
    return this.setDocument(e), this.setSelection(r)
  }

  insertFile (t) {
    return this.insertFiles([t])
  }

  insertFiles (t) {
    const e = []
    return (
      Array.from(t).forEach((n) => {
        let r
        if (
          (r = this.delegate) !== null &&
                    r !== void 0 &&
                    r.compositionShouldAcceptFile(n)
        ) {
          const o = Kt.attachmentForFile(n)
          e.push(o)
        }
      }),
      this.insertAttachments(e)
    )
  }

  insertAttachment (t) {
    return this.insertAttachments([t])
  }

  insertAttachments (t) {
    let e = new K()
    return (
      Array.from(t).forEach((n) => {
        let r
        const o = n.getType()
        const s =
                    (r = mi[o]) === null || r === void 0
                      ? void 0
                      : r.presentation
        const l = this.getCurrentTextAttributes()
        s && (l.presentation = s)
        const c = K.textForAttachmentWithAttributes(n, l)
        e = e.appendText(c)
      }),
      this.insertText(e)
    )
  }

  shouldManageDeletingInDirection (t) {
    const e = this.getLocationRange()
    if (ut(e)) {
      if (
        (t === 'backward' && e[0].offset === 0) ||
                this.shouldManageMovingCursorInDirection(t)
      ) {
        return !0
      }
    } else if (e[0].index !== e[1].index) return !0
    return !1
  }

  deleteInDirection (t) {
    let e
    let n
    let r
    const { length: o } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const s = this.getLocationRange()
    let l = this.getSelectedRange()
    const c = ut(l)
    if (
      (c
        ? (n = t === 'backward' && s[0].offset === 0)
        : (r = s[0].index !== s[1].index),
      n && this.canDecreaseBlockAttributeLevel())
    ) {
      const u = this.getBlock()
      if (
        (u.isListItem()
          ? this.decreaseListLevel()
          : this.decreaseBlockAttributeLevel(),
        this.setSelection(l[0]),
        u.isEmpty())
      ) {
        return !1
      }
    }
    return (
      c &&
                ((l = this.getExpandedRangeInDirection(t, { length: o })),
                t === 'backward' && (e = this.getAttachmentAtRange(l))),
      e
        ? (this.editAttachment(e), !1)
        : (this.setDocument(this.document.removeTextAtRange(l)),
          this.setSelection(l[0]),
          !n && !r && void 0)
    )
  }

  moveTextFromRange (t) {
    const [e] = Array.from(this.getSelectedRange())
    return (
      this.setDocument(this.document.moveTextFromRangeToPosition(t, e)),
      this.setSelection(e)
    )
  }

  removeAttachment (t) {
    const e = this.document.getRangeOfAttachment(t)
    if (e) {
      return (
        this.stopEditingAttachment(),
        this.setDocument(this.document.removeTextAtRange(e)),
        this.setSelection(e[0])
      )
    }
  }

  removeLastBlockAttribute () {
    const [t, e] = Array.from(this.getSelectedRange())
    const n = this.document.getBlockAtPosition(e)
    return (
      this.removeCurrentAttribute(n.getLastAttribute()),
      this.setSelection(t)
    )
  }

  insertPlaceholder () {
    return (
      (this.placeholderPosition = this.getPosition()),
      this.insertString(' ')
    )
  }

  selectPlaceholder () {
    if (this.placeholderPosition != null) {
      return (
        this.setSelectedRange([
          this.placeholderPosition,
          this.placeholderPosition + 1
        ]),
        this.getSelectedRange()
      )
    }
  }

  forgetPlaceholder () {
    this.placeholderPosition = null
  }

  hasCurrentAttribute (t) {
    const e = this.currentAttributes[t]
    return e != null && e !== !1
  }

  toggleCurrentAttribute (t) {
    const e = !this.currentAttributes[t]
    return e
      ? this.setCurrentAttribute(t, e)
      : this.removeCurrentAttribute(t)
  }

  canSetCurrentAttribute (t) {
    return L(t)
      ? this.canSetCurrentBlockAttribute(t)
      : this.canSetCurrentTextAttribute(t)
  }

  canSetCurrentTextAttribute (t) {
    const e = this.getSelectedDocument()
    if (e) {
      for (const n of Array.from(e.getAttachments())) {
        if (!n.hasContent()) return !1
      }
      return !0
    }
  }

  canSetCurrentBlockAttribute (t) {
    const e = this.getBlock()
    if (e) return !e.isTerminalBlock()
  }

  setCurrentAttribute (t, e) {
    return L(t)
      ? this.setBlockAttribute(t, e)
      : (this.setTextAttribute(t, e),
        (this.currentAttributes[t] = e),
        this.notifyDelegateOfCurrentAttributesChange())
  }

  setHTMLAtributeAtPosition (t, e, n) {
    let r
    const o = this.document.getBlockAtPosition(t)
    const s =
            (r = L(o.getLastAttribute())) === null || r === void 0
              ? void 0
              : r.htmlAttributes
    if (o && s != null && s.includes(e)) {
      const l = this.document.setHTMLAttributeAtPosition(t, e, n)
      this.setDocument(l)
    }
  }

  setTextAttribute (t, e) {
    const n = this.getSelectedRange()
    if (!n) return
    const [r, o] = Array.from(n)
    if (r !== o) {
      return this.setDocument(this.document.addAttributeAtRange(t, e, n))
    }
    if (t === 'href') {
      const s = K.textForStringWithAttributes(e, { href: e })
      return this.insertText(s)
    }
  }

  setBlockAttribute (t, e) {
    const n = this.getSelectedRange()
    if (this.canSetCurrentAttribute(t)) {
      return (
        this.setDocument(
          this.document.applyBlockAttributeAtRange(t, e, n)
        ),
        this.setSelection(n)
      )
    }
  }

  removeCurrentAttribute (t) {
    return L(t)
      ? (this.removeBlockAttribute(t), this.updateCurrentAttributes())
      : (this.removeTextAttribute(t),
        delete this.currentAttributes[t],
        this.notifyDelegateOfCurrentAttributesChange())
  }

  removeTextAttribute (t) {
    const e = this.getSelectedRange()
    if (e) {
      return this.setDocument(this.document.removeAttributeAtRange(t, e))
    }
  }

  removeBlockAttribute (t) {
    const e = this.getSelectedRange()
    if (e) {
      return this.setDocument(this.document.removeAttributeAtRange(t, e))
    }
  }

  canDecreaseNestingLevel () {
    let t
    return (
      ((t = this.getBlock()) === null || t === void 0
        ? void 0
        : t.getNestingLevel()) > 0
    )
  }

  canIncreaseNestingLevel () {
    let t
    const e = this.getBlock()
    if (e) {
      if (
        (t = L(e.getLastNestableAttribute())) === null ||
                t === void 0 ||
                !t.listAttribute
      ) {
        return e.getNestingLevel() > 0
      }
      {
        const n = this.getPreviousBlock()
        if (n) {
          return (function () {
            const r =
                            arguments.length > 1 && arguments[1] !== void 0
                              ? arguments[1]
                              : []
            return It(
              (arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : []
              ).slice(0, r.length),
              r
            )
          })(n.getListItemAttributes(), e.getListItemAttributes())
        }
      }
    }
  }

  decreaseNestingLevel () {
    const t = this.getBlock()
    if (t) {
      return this.setDocument(
        this.document.replaceBlock(t, t.decreaseNestingLevel())
      )
    }
  }

  increaseNestingLevel () {
    const t = this.getBlock()
    if (t) {
      return this.setDocument(
        this.document.replaceBlock(t, t.increaseNestingLevel())
      )
    }
  }

  canDecreaseBlockAttributeLevel () {
    let t
    return (
      ((t = this.getBlock()) === null || t === void 0
        ? void 0
        : t.getAttributeLevel()) > 0
    )
  }

  decreaseBlockAttributeLevel () {
    let t
    const e =
            (t = this.getBlock()) === null || t === void 0
              ? void 0
              : t.getLastAttribute()
    if (e) return this.removeCurrentAttribute(e)
  }

  decreaseListLevel () {
    let [t] = Array.from(this.getSelectedRange())
    const { index: e } = this.document.locationFromPosition(t)
    let n = e
    const r = this.getBlock().getAttributeLevel()
    let o = this.document.getBlockAtIndex(n + 1)
    for (; o && o.isListItem() && !(o.getAttributeLevel() <= r);) {
      n++, (o = this.document.getBlockAtIndex(n + 1))
    }
    t = this.document.positionFromLocation({ index: e, offset: 0 })
    const s = this.document.positionFromLocation({ index: n, offset: 0 })
    return this.setDocument(
      this.document.removeLastListAttributeAtRange([t, s])
    )
  }

  updateCurrentAttributes () {
    const t = this.getSelectedRange({ ignoreLock: !0 })
    if (t) {
      const e = this.document.getCommonAttributesAtRange(t)
      if (
        (Array.from(Qn()).forEach((n) => {
          e[n] || this.canSetCurrentAttribute(n) || (e[n] = !1)
        }),
        !Zt(e, this.currentAttributes))
      ) {
        return (
          (this.currentAttributes = e),
          this.notifyDelegateOfCurrentAttributesChange()
        )
      }
    }
  }

  getCurrentAttributes () {
    return Nr.call({}, this.currentAttributes)
  }

  getCurrentTextAttributes () {
    const t = {}
    for (const e in this.currentAttributes) {
      const n = this.currentAttributes[e]
      n !== !1 && ti(e) && (t[e] = n)
    }
    return t
  }

  freezeSelection () {
    return this.setCurrentAttribute('frozen', !0)
  }

  thawSelection () {
    return this.removeCurrentAttribute('frozen')
  }

  hasFrozenSelection () {
    return this.hasCurrentAttribute('frozen')
  }

  setSelection (t) {
    let e
    const n = this.document.locationRangeFromRange(t)
    return (e = this.delegate) === null || e === void 0
      ? void 0
      : e.compositionDidRequestChangingSelectionToLocationRange(n)
  }

  getSelectedRange () {
    const t = this.getLocationRange()
    if (t) return this.document.rangeFromLocationRange(t)
  }

  setSelectedRange (t) {
    const e = this.document.locationRangeFromRange(t)
    return this.getSelectionManager().setLocationRange(e)
  }

  getPosition () {
    const t = this.getLocationRange()
    if (t) return this.document.positionFromLocation(t[0])
  }

  getLocationRange (t) {
    return this.targetLocationRange
      ? this.targetLocationRange
      : this.getSelectionManager().getLocationRange(t) ||
                  y({
                    index: 0,
                    offset: 0
                  })
  }

  withTargetLocationRange (t, e) {
    let n
    this.targetLocationRange = t
    try {
      n = e()
    } finally {
      this.targetLocationRange = null
    }
    return n
  }

  withTargetRange (t, e) {
    const n = this.document.locationRangeFromRange(t)
    return this.withTargetLocationRange(n, e)
  }

  withTargetDOMRange (t, e) {
    const n = this.createLocationRangeFromDOMRange(t, { strict: !1 })
    return this.withTargetLocationRange(n, e)
  }

  getExpandedRangeInDirection (t) {
    const { length: e } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    let [n, r] = Array.from(this.getSelectedRange())
    return (
      t === 'backward'
        ? e
          ? (n -= e)
          : (n = this.translateUTF16PositionFromOffset(n, -1))
        : e
          ? (r += e)
          : (r = this.translateUTF16PositionFromOffset(r, 1)),
      y([n, r])
    )
  }

  shouldManageMovingCursorInDirection (t) {
    if (this.editingAttachment) return !0
    const e = this.getExpandedRangeInDirection(t)
    return this.getAttachmentAtRange(e) != null
  }

  moveCursorInDirection (t) {
    let e, n
    if (this.editingAttachment) {
      n = this.document.getRangeOfAttachment(this.editingAttachment)
    } else {
      const r = this.getSelectedRange();
      (n = this.getExpandedRangeInDirection(t)), (e = !We(r, n))
    }
    if (
      (t === 'backward'
        ? this.setSelectedRange(n[0])
        : this.setSelectedRange(n[1]),
      e)
    ) {
      const r = this.getAttachmentAtRange(n)
      if (r) return this.editAttachment(r)
    }
  }

  expandSelectionInDirection (t) {
    const { length: e } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const n = this.getExpandedRangeInDirection(t, { length: e })
    return this.setSelectedRange(n)
  }

  expandSelectionForEditing () {
    if (this.hasCurrentAttribute('href')) {
      return this.expandSelectionAroundCommonAttribute('href')
    }
  }

  expandSelectionAroundCommonAttribute (t) {
    const e = this.getPosition()
    const n = this.document.getRangeOfCommonAttributeAtPosition(t, e)
    return this.setSelectedRange(n)
  }

  selectionContainsAttachments () {
    let t
    return (
      ((t = this.getSelectedAttachments()) === null || t === void 0
        ? void 0
        : t.length) > 0
    )
  }

  selectionIsInCursorTarget () {
    return (
      this.editingAttachment ||
            this.positionIsCursorTarget(this.getPosition())
    )
  }

  positionIsCursorTarget (t) {
    const e = this.document.locationFromPosition(t)
    if (e) return this.locationIsCursorTarget(e)
  }

  positionIsBlockBreak (t) {
    let e
    return (e = this.document.getPieceAtPosition(t)) === null ||
            e === void 0
      ? void 0
      : e.isBlockBreak()
  }

  getSelectedDocument () {
    const t = this.getSelectedRange()
    if (t) return this.document.getDocumentAtRange(t)
  }

  getSelectedAttachments () {
    let t
    return (t = this.getSelectedDocument()) === null || t === void 0
      ? void 0
      : t.getAttachments()
  }

  getAttachments () {
    return this.attachments.slice(0)
  }

  refreshAttachments () {
    const t = this.document.getAttachments()
    const { added: e, removed: n } = (function () {
      const r =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : []
      const o =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : []
      const s = []
      const l = []
      const c = new Set()
      r.forEach((d) => {
        c.add(d)
      })
      const u = new Set()
      return (
        o.forEach((d) => {
          u.add(d), c.has(d) || s.push(d)
        }),
        r.forEach((d) => {
          u.has(d) || l.push(d)
        }),
        { added: s, removed: l }
      )
    })(this.attachments, t)
    return (
      (this.attachments = t),
      Array.from(n).forEach((r) => {
        let o, s;
        (r.delegate = null),
        (o = this.delegate) === null ||
                        o === void 0 ||
                        (s = o.compositionDidRemoveAttachment) === null ||
                        s === void 0 ||
                        s.call(o, r)
      }),
      (() => {
        const r = []
        return (
          Array.from(e).forEach((o) => {
            let s, l;
            (o.delegate = this),
            r.push(
              (s = this.delegate) === null ||
                                    s === void 0 ||
                                    (l = s.compositionDidAddAttachment) ===
                                        null ||
                                    l === void 0
                ? void 0
                : l.call(s, o)
            )
          }),
          r
        )
      })()
    )
  }

  attachmentDidChangeAttributes (t) {
    let e, n
    return (
      this.revision++,
      (e = this.delegate) === null ||
            e === void 0 ||
            (n = e.compositionDidEditAttachment) === null ||
            n === void 0
        ? void 0
        : n.call(e, t)
    )
  }

  attachmentDidChangePreviewURL (t) {
    let e, n
    return (
      this.revision++,
      (e = this.delegate) === null ||
            e === void 0 ||
            (n = e.compositionDidChangeAttachmentPreviewURL) === null ||
            n === void 0
        ? void 0
        : n.call(e, t)
    )
  }

  editAttachment (t, e) {
    let n, r
    if (t !== this.editingAttachment) {
      return (
        this.stopEditingAttachment(),
        (this.editingAttachment = t),
        (n = this.delegate) === null ||
                n === void 0 ||
                (r = n.compositionDidStartEditingAttachment) === null ||
                r === void 0
          ? void 0
          : r.call(n, this.editingAttachment, e)
      )
    }
  }

  stopEditingAttachment () {
    let t, e
    this.editingAttachment &&
            ((t = this.delegate) === null ||
                t === void 0 ||
                (e = t.compositionDidStopEditingAttachment) === null ||
                e === void 0 ||
                e.call(t, this.editingAttachment),
            (this.editingAttachment = null))
  }

  updateAttributesForAttachment (t, e) {
    return this.setDocument(
      this.document.updateAttributesForAttachment(t, e)
    )
  }

  removeAttributeForAttachment (t, e) {
    return this.setDocument(
      this.document.removeAttributeForAttachment(t, e)
    )
  }

  breakFormattedBlock (t) {
    let { document: e } = t
    const { block: n } = t
    let r = t.startPosition
    let o = [r - 1, r]
    n.getBlockBreakPosition() === t.startLocation.offset
      ? (n.breaksOnReturn() &&
              t.nextCharacter ===
                  `
`
          ? (r += 1)
          : (e = e.removeTextAtRange(o)),
        (o = [r, r]))
      : t.nextCharacter ===
                `
`
        ? t.previousCharacter ===
                `
`
          ? (o = [r - 1, r + 1])
          : ((o = [r, r + 1]), (r += 1))
        : t.startLocation.offset - 1 != 0 && (r += 1)
    const s = new q([n.removeLastAttribute().copyWithoutText()])
    return (
      this.setDocument(e.insertDocumentAtRange(s, o)),
      this.setSelection(r)
    )
  }

  getPreviousBlock () {
    const t = this.getLocationRange()
    if (t) {
      const { index: e } = t[0]
      if (e > 0) return this.document.getBlockAtIndex(e - 1)
    }
  }

  getBlock () {
    const t = this.getLocationRange()
    if (t) return this.document.getBlockAtIndex(t[0].index)
  }

  getAttachmentAtRange (t) {
    const e = this.document.getDocumentAtRange(t)
    if (
      e.toString() ===
            ''.concat(
              '\uFFFC',
                `
`
            )
    ) {
      return e.getAttachments()[0]
    }
  }

  notifyDelegateOfCurrentAttributesChange () {
    let t, e
    return (t = this.delegate) === null ||
            t === void 0 ||
            (e = t.compositionDidChangeCurrentAttributes) === null ||
            e === void 0
      ? void 0
      : e.call(t, this.currentAttributes)
  }

  notifyDelegateOfInsertionAtRange (t) {
    let e, n
    return (e = this.delegate) === null ||
            e === void 0 ||
            (n = e.compositionDidPerformInsertionAtRange) === null ||
            n === void 0
      ? void 0
      : n.call(e, t)
  }

  translateUTF16PositionFromOffset (t, e) {
    const n = this.document.toUTF16String()
    const r = n.offsetFromUCS2Offset(t)
    return n.offsetToUCS2Offset(r + e)
  }
}
it.proxyMethod('getSelectionManager().getPointRange'),
it.proxyMethod('getSelectionManager().setLocationRangeFromPointRange'),
it.proxyMethod('getSelectionManager().createLocationRangeFromDOMRange'),
it.proxyMethod('getSelectionManager().locationIsCursorTarget'),
it.proxyMethod('getSelectionManager().selectionIsExpanded'),
it.proxyMethod('delegate?.getSelectionManager')
const ye = class extends R {
  constructor (t) {
    super(...arguments),
    (this.composition = t),
    (this.undoEntries = []),
    (this.redoEntries = [])
  }

  recordUndoEntry (t) {
    const { context: e, consolidatable: n } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    const r = this.undoEntries.slice(-1)[0]
    if (!n || !Os(r, t, e)) {
      const o = this.createEntry({ description: t, context: e })
      this.undoEntries.push(o), (this.redoEntries = [])
    }
  }

  undo () {
    const t = this.undoEntries.pop()
    if (t) {
      const e = this.createEntry(t)
      return (
        this.redoEntries.push(e),
        this.composition.loadSnapshot(t.snapshot)
      )
    }
  }

  redo () {
    const t = this.redoEntries.pop()
    if (t) {
      const e = this.createEntry(t)
      return (
        this.undoEntries.push(e),
        this.composition.loadSnapshot(t.snapshot)
      )
    }
  }

  canUndo () {
    return this.undoEntries.length > 0
  }

  canRedo () {
    return this.redoEntries.length > 0
  }

  createEntry () {
    const { description: t, context: e } =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    return {
      description: t?.toString(),
      context: JSON.stringify(e),
      snapshot: this.composition.getSnapshot()
    }
  }
}
var Os = (i, t, e) =>
  i?.description === t?.toString() && i?.context === JSON.stringify(e)
const Wn = 'attachmentGallery'
const $e = class {
  constructor (t) {
    (this.document = t.document), (this.selectedRange = t.selectedRange)
  }

  perform () {
    return this.removeBlockAttribute(), this.applyBlockAttribute()
  }

  getSnapshot () {
    return {
      document: this.document,
      selectedRange: this.selectedRange
    }
  }

  removeBlockAttribute () {
    return this.findRangesOfBlocks().map(
      (t) =>
        (this.document = this.document.removeAttributeAtRange(Wn, t))
    )
  }

  applyBlockAttribute () {
    let t = 0
    this.findRangesOfPieces().forEach((e) => {
      e[1] - e[0] > 1 &&
                ((e[0] += t),
                (e[1] += t),
                this.document.getCharacterAtPosition(e[1]) !==
                    `
` &&
                    ((this.document = this.document.insertBlockBreakAtRange(
                      e[1]
                    )),
                    e[1] < this.selectedRange[1] &&
                        this.moveSelectedRangeForward(),
                    e[1]++,
                    t++),
                e[0] !== 0 &&
                    this.document.getCharacterAtPosition(e[0] - 1) !==
                        `
` &&
                    ((this.document = this.document.insertBlockBreakAtRange(
                      e[0]
                    )),
                    e[0] < this.selectedRange[0] &&
                        this.moveSelectedRangeForward(),
                    e[0]++,
                    t++),
                (this.document = this.document.applyBlockAttributeAtRange(
                  Wn,
                  !0,
                  e
                )))
    })
  }

  findRangesOfBlocks () {
    return this.document.findRangesForBlockAttribute(Wn)
  }

  findRangesOfPieces () {
    return this.document.findRangesForTextAttribute('presentation', {
      withValue: 'gallery'
    })
  }

  moveSelectedRangeForward () {
    (this.selectedRange[0] += 1), (this.selectedRange[1] += 1)
  }
}
const Yr = function (i) {
  const t = new $e(i)
  return t.perform(), t.getSnapshot()
}
const Fs = [Yr]
const Xe = class {
  constructor (t, e, n) {
    (this.insertFiles = this.insertFiles.bind(this)),
    (this.composition = t),
    (this.selectionManager = e),
    (this.element = n),
    (this.undoManager = new ye(this.composition)),
    (this.filters = Fs.slice(0))
  }

  loadDocument (t) {
    return this.loadSnapshot({ document: t, selectedRange: [0, 0] })
  }

  loadHTML () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ''
    const e = Ft.parse(t, {
      referenceElement: this.element
    }).getDocument()
    return this.loadDocument(e)
  }

  loadJSON (t) {
    let { document: e, selectedRange: n } = t
    return (
      (e = q.fromJSON(e)),
      this.loadSnapshot({ document: e, selectedRange: n })
    )
  }

  loadSnapshot (t) {
    return (
      (this.undoManager = new ye(this.composition)),
      this.composition.loadSnapshot(t)
    )
  }

  getDocument () {
    return this.composition.document
  }

  getSelectedDocument () {
    return this.composition.getSelectedDocument()
  }

  getSnapshot () {
    return this.composition.getSnapshot()
  }

  toJSON () {
    return this.getSnapshot()
  }

  deleteInDirection (t) {
    return this.composition.deleteInDirection(t)
  }

  insertAttachment (t) {
    return this.composition.insertAttachment(t)
  }

  insertAttachments (t) {
    return this.composition.insertAttachments(t)
  }

  insertDocument (t) {
    return this.composition.insertDocument(t)
  }

  insertFile (t) {
    return this.composition.insertFile(t)
  }

  insertFiles (t) {
    return this.composition.insertFiles(t)
  }

  insertHTML (t) {
    return this.composition.insertHTML(t)
  }

  insertString (t) {
    return this.composition.insertString(t)
  }

  insertText (t) {
    return this.composition.insertText(t)
  }

  insertLineBreak () {
    return this.composition.insertLineBreak()
  }

  getSelectedRange () {
    return this.composition.getSelectedRange()
  }

  getPosition () {
    return this.composition.getPosition()
  }

  getClientRectAtPosition (t) {
    const e = this.getDocument().locationRangeFromRange([t, t + 1])
    return this.selectionManager.getClientRectAtLocationRange(e)
  }

  expandSelectionInDirection (t) {
    return this.composition.expandSelectionInDirection(t)
  }

  moveCursorInDirection (t) {
    return this.composition.moveCursorInDirection(t)
  }

  setSelectedRange (t) {
    return this.composition.setSelectedRange(t)
  }

  activateAttribute (t) {
    const e =
            !(arguments.length > 1 && arguments[1] !== void 0) || arguments[1]
    return this.composition.setCurrentAttribute(t, e)
  }

  attributeIsActive (t) {
    return this.composition.hasCurrentAttribute(t)
  }

  canActivateAttribute (t) {
    return this.composition.canSetCurrentAttribute(t)
  }

  deactivateAttribute (t) {
    return this.composition.removeCurrentAttribute(t)
  }

  setHTMLAtributeAtPosition (t, e, n) {
    this.composition.setHTMLAtributeAtPosition(t, e, n)
  }

  canDecreaseNestingLevel () {
    return this.composition.canDecreaseNestingLevel()
  }

  canIncreaseNestingLevel () {
    return this.composition.canIncreaseNestingLevel()
  }

  decreaseNestingLevel () {
    if (this.canDecreaseNestingLevel()) {
      return this.composition.decreaseNestingLevel()
    }
  }

  increaseNestingLevel () {
    if (this.canIncreaseNestingLevel()) {
      return this.composition.increaseNestingLevel()
    }
  }

  canRedo () {
    return this.undoManager.canRedo()
  }

  canUndo () {
    return this.undoManager.canUndo()
  }

  recordUndoEntry (t) {
    const { context: e, consolidatable: n } =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    return this.undoManager.recordUndoEntry(t, {
      context: e,
      consolidatable: n
    })
  }

  redo () {
    if (this.canRedo()) return this.undoManager.redo()
  }

  undo () {
    if (this.canUndo()) return this.undoManager.undo()
  }
}
const Ze = class {
  constructor (t) {
    this.element = t
  }

  findLocationFromContainerAndOffset (t, e) {
    const { strict: n } =
            arguments.length > 2 && arguments[2] !== void 0
              ? arguments[2]
              : { strict: !0 }
    let r = 0
    let o = !1
    const s = { index: 0, offset: 0 }
    const l = this.findAttachmentElementParentForNode(t)
    l && ((t = l.parentNode), (e = kn(l)))
    const c = je(this.element, { usingFilter: $r })
    for (; c.nextNode();) {
      const u = c.currentNode
      if (u === t && me(t)) {
        zt(u) || (s.offset += e)
        break
      }
      if (u.parentNode === t) {
        if (r++ === e) break
      } else if (!kt(t, u) && r > 0) break
      $i(u, { strict: n })
        ? (o && s.index++, (s.offset = 0), (o = !0))
        : (s.offset += Un(u))
    }
    return s
  }

  findContainerAndOffsetFromLocation (t) {
    let e, n
    if (t.index === 0 && t.offset === 0) {
      for (e = this.element, n = 0; e.firstChild;) {
        if (((e = e.firstChild), Rn(e))) {
          n = 1
          break
        }
      }
      return [e, n]
    }
    let [r, o] = this.findNodeAndOffsetFromLocation(t)
    if (r) {
      if (me(r)) {
        Un(r) === 0
          ? ((e = r.parentNode.parentNode),
            (n = kn(r.parentNode)),
            zt(r, { name: 'right' }) && n++)
          : ((e = r), (n = t.offset - o))
      } else {
        if (((e = r.parentNode), !$i(r.previousSibling) && !Rn(e))) {
          for (
            ;
            r === e.lastChild &&
                        ((r = e), (e = e.parentNode), !Rn(e));

          );
        }
        (n = kn(r)), t.offset !== 0 && n++
      }
      return [e, n]
    }
  }

  findNodeAndOffsetFromLocation (t) {
    let e
    let n
    let r = 0
    for (const o of this.getSignificantNodesForIndex(t.index)) {
      const s = Un(o)
      if (t.offset <= r + s) {
        if (me(o)) {
          if (((e = o), (n = r), t.offset === n && zt(e))) break
        } else e || ((e = o), (n = r))
      }
      if (((r += s), r > t.offset)) break
    }
    return [e, n]
  }

  findAttachmentElementParentForNode (t) {
    for (; t && t !== this.element;) {
      if (Tt(t)) return t
      t = t.parentNode
    }
  }

  getSignificantNodesForIndex (t) {
    const e = []
    const n = je(this.element, { usingFilter: Ps })
    let r = !1
    for (; n.nextNode();) {
      const s = n.currentNode
      var o
      if (Vt(s)) {
        if ((o != null ? o++ : (o = 0), o === t)) r = !0
        else if (r) break
      } else r && e.push(s)
    }
    return e
  }
}
var Un = function (i) {
  return i.nodeType === Node.TEXT_NODE
    ? zt(i)
      ? 0
      : i.textContent.length
    : W(i) === 'br' || Tt(i)
      ? 1
      : 0
}
var Ps = function (i) {
  return Ms(i) === NodeFilter.FILTER_ACCEPT
    ? $r(i)
    : NodeFilter.FILTER_REJECT
}
var Ms = function (i) {
  return Or(i) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
}
var $r = function (i) {
  return Tt(i.parentNode)
    ? NodeFilter.FILTER_REJECT
    : NodeFilter.FILTER_ACCEPT
}
const Qe = class {
  createDOMRangeFromPoint (t) {
    let e
    const { x: n, y: r } = t
    if (document.caretPositionFromPoint) {
      const { offsetNode: o, offset: s } =
                document.caretPositionFromPoint(n, r)
      return (e = document.createRange()), e.setStart(o, s), e
    }
    if (document.caretRangeFromPoint) {
      return document.caretRangeFromPoint(n, r)
    }
    if (document.body.createTextRange) {
      const o = pe()
      try {
        const s = document.body.createTextRange()
        s.moveToPoint(n, r), s.select()
      } catch {}
      return (e = pe()), Wr(o), e
    }
  }

  getClientRectsForDOMRange (t) {
    const e = Array.from(t.getClientRects())
    return [e[0], e[e.length - 1]]
  }
}
const ct = class extends R {
  constructor (t) {
    super(...arguments),
    (this.didMouseDown = this.didMouseDown.bind(this)),
    (this.selectionDidChange = this.selectionDidChange.bind(this)),
    (this.element = t),
    (this.locationMapper = new Ze(this.element)),
    (this.pointMapper = new Qe()),
    (this.lockCount = 0),
    S('mousedown', {
      onElement: this.element,
      withCallback: this.didMouseDown
    })
  }

  getLocationRange () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    return t.strict === !1
      ? this.createLocationRangeFromDOMRange(pe())
      : t.ignoreLock
        ? this.currentLocationRange
        : this.lockedLocationRange
          ? this.lockedLocationRange
          : this.currentLocationRange
  }

  setLocationRange (t) {
    if (this.lockedLocationRange) return
    t = y(t)
    const e = this.createDOMRangeFromLocationRange(t)
    e && (Wr(e), this.updateCurrentLocationRange(t))
  }

  setLocationRangeFromPointRange (t) {
    t = y(t)
    const e = this.getLocationAtPoint(t[0])
    const n = this.getLocationAtPoint(t[1])
    this.setLocationRange([e, n])
  }

  getClientRectAtLocationRange (t) {
    const e = this.createDOMRangeFromLocationRange(t)
    if (e) return this.getClientRectsForDOMRange(e)[1]
  }

  locationIsCursorTarget (t) {
    const e = Array.from(this.findNodeAndOffsetFromLocation(t))[0]
    return zt(e)
  }

  lock () {
    this.lockCount++ == 0 &&
            (this.updateCurrentLocationRange(),
            (this.lockedLocationRange = this.getLocationRange()))
  }

  unlock () {
    if (--this.lockCount == 0) {
      const { lockedLocationRange: t } = this
      if (((this.lockedLocationRange = null), t != null)) {
        return this.setLocationRange(t)
      }
    }
  }

  clearSelection () {
    let t
    return (t = jr()) === null || t === void 0
      ? void 0
      : t.removeAllRanges()
  }

  selectionIsCollapsed () {
    let t
    return (
      ((t = pe()) === null || t === void 0 ? void 0 : t.collapsed) === !0
    )
  }

  selectionIsExpanded () {
    return !this.selectionIsCollapsed()
  }

  createLocationRangeFromDOMRange (t, e) {
    if (t == null || !this.domRangeWithinElement(t)) return
    const n = this.findLocationFromContainerAndOffset(
      t.startContainer,
      t.startOffset,
      e
    )
    if (!n) return
    const r = t.collapsed
      ? void 0
      : this.findLocationFromContainerAndOffset(
        t.endContainer,
        t.endOffset,
        e
      )
    return y([n, r])
  }

  didMouseDown () {
    return this.pauseTemporarily()
  }

  pauseTemporarily () {
    let t
    this.paused = !0
    const e = () => {
      if (
        ((this.paused = !1),
        clearTimeout(n),
        Array.from(t).forEach((r) => {
          r.destroy()
        }),
        kt(document, this.element))
      ) {
        return this.selectionDidChange()
      }
    }
    const n = setTimeout(e, 200)
    t = ['mousemove', 'keydown'].map((r) =>
      S(r, { onElement: document, withCallback: e })
    )
  }

  selectionDidChange () {
    if (!this.paused && !fi(this.element)) {
      return this.updateCurrentLocationRange()
    }
  }

  updateCurrentLocationRange (t) {
    let e, n
    if (
      (t ?? (t = this.createLocationRangeFromDOMRange(pe()))) &&
            !We(t, this.currentLocationRange)
    ) {
      return (
        (this.currentLocationRange = t),
        (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.locationRangeDidChange) === null ||
                n === void 0
          ? void 0
          : n.call(e, this.currentLocationRange.slice(0))
      )
    }
  }

  createDOMRangeFromLocationRange (t) {
    const e = this.findContainerAndOffsetFromLocation(t[0])
    const n = ut(t)
      ? e
      : this.findContainerAndOffsetFromLocation(t[1]) || e
    if (e != null && n != null) {
      const r = document.createRange()
      return (
        r.setStart(...Array.from(e || [])),
        r.setEnd(...Array.from(n || [])),
        r
      )
    }
  }

  getLocationAtPoint (t) {
    const e = this.createDOMRangeFromPoint(t)
    let n
    if (e) {
      return (n = this.createLocationRangeFromDOMRange(e)) === null ||
                n === void 0
        ? void 0
        : n[0]
    }
  }

  domRangeWithinElement (t) {
    return t.collapsed
      ? kt(this.element, t.startContainer)
      : kt(this.element, t.startContainer) &&
                  kt(this.element, t.endContainer)
  }
}
ct.proxyMethod('locationMapper.findLocationFromContainerAndOffset'),
ct.proxyMethod('locationMapper.findContainerAndOffsetFromLocation'),
ct.proxyMethod('locationMapper.findNodeAndOffsetFromLocation'),
ct.proxyMethod('pointMapper.createDOMRangeFromPoint'),
ct.proxyMethod('pointMapper.getClientRectsForDOMRange')
const Xr = Object.freeze({
  __proto__: null,
  Attachment: Kt,
  AttachmentManager: Ge,
  AttachmentPiece: Gt,
  Block: bt,
  Composition: it,
  Document: q,
  Editor: Xe,
  HTMLParser: Ft,
  HTMLSanitizer: qt,
  LineBreakInsertion: Ye,
  LocationMapper: Ze,
  ManagedAttachment: E,
  Piece: gt,
  PointMapper: Qe,
  SelectionManager: ct,
  SplittableList: Yt,
  StringPiece: Ae,
  Text: K,
  UndoManager: ye
})
const Bs = Object.freeze({
  __proto__: null,
  ObjectView: dt,
  AttachmentView: ve,
  BlockView: Je,
  DocumentView: Jt,
  PieceView: He,
  PreviewableAttachmentView: ze,
  TextView: qe
})
const { lang: Vn, css: Et, keyNames: _s } = Ce
const zn = function (i) {
  return function () {
    const t = i.apply(this, arguments)
    t.do(), this.undos || (this.undos = []), this.undos.push(t.undo)
  }
}
const tn = class extends R {
  constructor (t, e, n) {
    const r =
            arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}
    super(...arguments),
    V(
      this,
      'makeElementMutable',
      zn(() => ({
        do: () => {
          this.element.dataset.trixMutable = !0
        },
        undo: () => delete this.element.dataset.trixMutable
      }))
    ),
    V(
      this,
      'addToolbar',
      zn(() => {
        const o = p({
          tagName: 'div',
          className: Et.attachmentToolbar,
          data: { trixMutable: !0 },
          childNodes: p({
            tagName: 'div',
            className: 'trix-button-row',
            childNodes: p({
              tagName: 'span',
              className:
                                    'trix-button-group trix-button-group--actions',
              childNodes: p({
                tagName: 'button',
                className:
                                        'trix-button trix-button--remove',
                textContent: Vn.remove,
                attributes: { title: Vn.remove },
                data: { trixAction: 'remove' }
              })
            })
          })
        })
        return (
          this.attachment.isPreviewable() &&
                            o.appendChild(
                              p({
                                tagName: 'div',
                                className: Et.attachmentMetadataContainer,
                                childNodes: p({
                                  tagName: 'span',
                                  className: Et.attachmentMetadata,
                                  childNodes: [
                                    p({
                                      tagName: 'span',
                                      className: Et.attachmentName,
                                      textContent:
                                                    this.attachment.getFilename(),
                                      attributes: {
                                        title: this.attachment.getFilename()
                                      }
                                    }),
                                    p({
                                      tagName: 'span',
                                      className: Et.attachmentSize,
                                      textContent:
                                                    this.attachment.getFormattedFilesize()
                                    })
                                  ]
                                })
                              })
                            ),
          S('click', {
            onElement: o,
            withCallback: this.didClickToolbar
          }),
          S('click', {
            onElement: o,
            matchingSelector: '[data-trix-action]',
            withCallback: this.didClickActionButton
          }),
          de('trix-attachment-before-toolbar', {
            onElement: this.element,
            attributes: {
              toolbar: o,
              attachment: this.attachment
            }
          }),
          {
            do: () => this.element.appendChild(o),
            undo: () => At(o)
          }
        )
      })
    ),
    V(
      this,
      'installCaptionEditor',
      zn(() => {
        const o = p({
          tagName: 'textarea',
          className: Et.attachmentCaptionEditor,
          attributes: { placeholder: Vn.captionPlaceholder },
          data: { trixMutable: !0 }
        })
        o.value = this.attachmentPiece.getCaption()
        const s = o.cloneNode()
        s.classList.add('trix-autoresize-clone'), (s.tabIndex = -1)
        const l = function () {
          (s.value = o.value),
          (o.style.height = s.scrollHeight + 'px')
        }
        S('input', { onElement: o, withCallback: l }),
        S('input', {
          onElement: o,
          withCallback: this.didInputCaption
        }),
        S('keydown', {
          onElement: o,
          withCallback: this.didKeyDownCaption
        }),
        S('change', {
          onElement: o,
          withCallback: this.didChangeCaption
        }),
        S('blur', {
          onElement: o,
          withCallback: this.didBlurCaption
        })
        const c = this.element.querySelector('figcaption')
        const u = c.cloneNode()
        return {
          do: () => {
            if (
              ((c.style.display = 'none'),
              u.appendChild(o),
              u.appendChild(s),
              u.classList.add(
                ''.concat(
                  Et.attachmentCaption,
                  '--editing'
                )
              ),
              c.parentElement.insertBefore(u, c),
              l(),
              this.options.editCaption)
            ) {
              return Ai(() => o.focus())
            }
          },
          undo () {
            At(u), (c.style.display = null)
          }
        }
      })
    ),
    (this.didClickToolbar = this.didClickToolbar.bind(this)),
    (this.didClickActionButton = this.didClickActionButton.bind(this)),
    (this.didKeyDownCaption = this.didKeyDownCaption.bind(this)),
    (this.didInputCaption = this.didInputCaption.bind(this)),
    (this.didChangeCaption = this.didChangeCaption.bind(this)),
    (this.didBlurCaption = this.didBlurCaption.bind(this)),
    (this.attachmentPiece = t),
    (this.element = e),
    (this.container = n),
    (this.options = r),
    (this.attachment = this.attachmentPiece.attachment),
    W(this.element) === 'a' && (this.element = this.element.firstChild),
    this.install()
  }

  install () {
    this.makeElementMutable(),
    this.addToolbar(),
    this.attachment.isPreviewable() && this.installCaptionEditor()
  }

  uninstall () {
    let t
    let e = this.undos.pop()
    for (this.savePendingCaption(); e;) e(), (e = this.undos.pop());
    (t = this.delegate) === null ||
            t === void 0 ||
            t.didUninstallAttachmentEditor(this)
  }

  savePendingCaption () {
    if (this.pendingCaption != null) {
      const o = this.pendingCaption
      let t, e, n, r;
      (this.pendingCaption = null),
      o
        ? (t = this.delegate) === null ||
                      t === void 0 ||
                      (e =
                          t.attachmentEditorDidRequestUpdatingAttributesForAttachment) ===
                          null ||
                      e === void 0 ||
                      e.call(t, { caption: o }, this.attachment)
        : (n = this.delegate) === null ||
                      n === void 0 ||
                      (r =
                          n.attachmentEditorDidRequestRemovingAttributeForAttachment) ===
                          null ||
                      r === void 0 ||
                      r.call(n, 'caption', this.attachment)
    }
  }

  didClickToolbar (t) {
    return t.preventDefault(), t.stopPropagation()
  }

  didClickActionButton (t) {
    let e
    if (t.target.getAttribute('data-trix-action') === 'remove') {
      return (e = this.delegate) === null || e === void 0
        ? void 0
        : e.attachmentEditorDidRequestRemovalOfAttachment(
          this.attachment
        )
    }
  }

  didKeyDownCaption (t) {
    let e, n
    if (_s[t.keyCode] === 'return') {
      return (
        t.preventDefault(),
        this.savePendingCaption(),
        (e = this.delegate) === null ||
                e === void 0 ||
                (n = e.attachmentEditorDidRequestDeselectingAttachment) ===
                    null ||
                n === void 0
          ? void 0
          : n.call(e, this.attachment)
      )
    }
  }

  didInputCaption (t) {
    this.pendingCaption = t.target.value.replace(/\s/g, ' ').trim()
  }

  didChangeCaption (t) {
    return this.savePendingCaption()
  }

  didBlurCaption (t) {
    return this.savePendingCaption()
  }
}
const en = class extends R {
  constructor (t, e) {
    super(...arguments),
    (this.didFocus = this.didFocus.bind(this)),
    (this.didBlur = this.didBlur.bind(this)),
    (this.didClickAttachment = this.didClickAttachment.bind(this)),
    (this.element = t),
    (this.composition = e),
    (this.documentView = new Jt(this.composition.document, {
      element: this.element
    })),
    S('focus', {
      onElement: this.element,
      withCallback: this.didFocus
    }),
    S('blur', {
      onElement: this.element,
      withCallback: this.didBlur
    }),
    S('click', {
      onElement: this.element,
      matchingSelector: 'a[contenteditable=false]',
      preventDefault: !0
    }),
    S('mousedown', {
      onElement: this.element,
      matchingSelector: Rt,
      withCallback: this.didClickAttachment
    }),
    S('click', {
      onElement: this.element,
      matchingSelector: 'a'.concat(Rt),
      preventDefault: !0
    })
  }

  didFocus (t) {
    let e
    const n = () => {
      let r, o
      if (!this.focused) {
        return (
          (this.focused = !0),
          (r = this.delegate) === null ||
                    r === void 0 ||
                    (o = r.compositionControllerDidFocus) === null ||
                    o === void 0
            ? void 0
            : o.call(r)
        )
      }
    }
    return (
      ((e = this.blurPromise) === null || e === void 0
        ? void 0
        : e.then(n)) || n()
    )
  }

  didBlur (t) {
    this.blurPromise = new Promise((e) =>
      Ai(() => {
        let n, r
        return (
          fi(this.element) ||
                        ((this.focused = null),
                        (n = this.delegate) === null ||
                            n === void 0 ||
                            (r = n.compositionControllerDidBlur) === null ||
                            r === void 0 ||
                            r.call(n)),
          (this.blurPromise = null),
          e()
        )
      })
    )
  }

  didClickAttachment (t, e) {
    let n, r
    const o = this.findAttachmentForElement(e)
    const s = !!vt(t.target, { matchingSelector: 'figcaption' })
    return (n = this.delegate) === null ||
            n === void 0 ||
            (r = n.compositionControllerDidSelectAttachment) === null ||
            r === void 0
      ? void 0
      : r.call(n, o, { editCaption: s })
  }

  getSerializableElement () {
    return this.isEditingAttachment()
      ? this.documentView.shadowElement
      : this.element
  }

  render () {
    let t, e, n, r, o, s
    return (
      this.revision !== this.composition.revision &&
                (this.documentView.setDocument(this.composition.document),
                this.documentView.render(),
                (this.revision = this.composition.revision)),
      this.canSyncDocumentView() &&
                !this.documentView.isSynced() &&
                ((n = this.delegate) === null ||
                    n === void 0 ||
                    (r = n.compositionControllerWillSyncDocumentView) ===
                        null ||
                    r === void 0 ||
                    r.call(n),
                this.documentView.sync(),
                (o = this.delegate) === null ||
                    o === void 0 ||
                    (s = o.compositionControllerDidSyncDocumentView) === null ||
                    s === void 0 ||
                    s.call(o)),
      (t = this.delegate) === null ||
            t === void 0 ||
            (e = t.compositionControllerDidRender) === null ||
            e === void 0
        ? void 0
        : e.call(t)
    )
  }

  rerenderViewForObject (t) {
    return this.invalidateViewForObject(t), this.render()
  }

  invalidateViewForObject (t) {
    return this.documentView.invalidateViewForObject(t)
  }

  isViewCachingEnabled () {
    return this.documentView.isViewCachingEnabled()
  }

  enableViewCaching () {
    return this.documentView.enableViewCaching()
  }

  disableViewCaching () {
    return this.documentView.disableViewCaching()
  }

  refreshViewCache () {
    return this.documentView.garbageCollectCachedViews()
  }

  isEditingAttachment () {
    return !!this.attachmentEditor
  }

  installAttachmentEditorForAttachment (t, e) {
    let n
    if (
      ((n = this.attachmentEditor) === null || n === void 0
        ? void 0
        : n.attachment) === t
    ) {
      return
    }
    const r = this.documentView.findElementForObject(t)
    if (!r) return
    this.uninstallAttachmentEditor()
    const o = this.composition.document.getAttachmentPieceForAttachment(t);
    (this.attachmentEditor = new tn(o, r, this.element, e)),
    (this.attachmentEditor.delegate = this)
  }

  uninstallAttachmentEditor () {
    let t
    return (t = this.attachmentEditor) === null || t === void 0
      ? void 0
      : t.uninstall()
  }

  didUninstallAttachmentEditor () {
    return (this.attachmentEditor = null), this.render()
  }

  attachmentEditorDidRequestUpdatingAttributesForAttachment (t, e) {
    let n, r
    return (
      (n = this.delegate) === null ||
                n === void 0 ||
                (r = n.compositionControllerWillUpdateAttachment) === null ||
                r === void 0 ||
                r.call(n, e),
      this.composition.updateAttributesForAttachment(t, e)
    )
  }

  attachmentEditorDidRequestRemovingAttributeForAttachment (t, e) {
    let n, r
    return (
      (n = this.delegate) === null ||
                n === void 0 ||
                (r = n.compositionControllerWillUpdateAttachment) === null ||
                r === void 0 ||
                r.call(n, e),
      this.composition.removeAttributeForAttachment(t, e)
    )
  }

  attachmentEditorDidRequestRemovalOfAttachment (t) {
    let e, n
    return (e = this.delegate) === null ||
            e === void 0 ||
            (n = e.compositionControllerDidRequestRemovalOfAttachment) ===
                null ||
            n === void 0
      ? void 0
      : n.call(e, t)
  }

  attachmentEditorDidRequestDeselectingAttachment (t) {
    let e, n
    return (e = this.delegate) === null ||
            e === void 0 ||
            (n = e.compositionControllerDidRequestDeselectingAttachment) ===
                null ||
            n === void 0
      ? void 0
      : n.call(e, t)
  }

  canSyncDocumentView () {
    return !this.isEditingAttachment()
  }

  findAttachmentForElement (t) {
    return this.composition.document.getAttachmentById(
      parseInt(t.dataset.trixId, 10)
    )
  }
}
const nn = class extends R {}
const Zr = 'data-trix-mutable'
const js = '['.concat(Zr, ']')
const Ws = {
  attributes: !0,
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  subtree: !0
}
const rn = class extends R {
  constructor (t) {
    super(t),
    (this.didMutate = this.didMutate.bind(this)),
    (this.element = t),
    (this.observer = new window.MutationObserver(this.didMutate)),
    this.start()
  }

  start () {
    return this.reset(), this.observer.observe(this.element, Ws)
  }

  stop () {
    return this.observer.disconnect()
  }

  didMutate (t) {
    let e, n
    if (
      (this.mutations.push(
        ...Array.from(this.findSignificantMutations(t) || [])
      ),
      this.mutations.length)
    ) {
      return (
        (e = this.delegate) === null ||
                    e === void 0 ||
                    (n = e.elementDidMutate) === null ||
                    n === void 0 ||
                    n.call(e, this.getMutationSummary()),
        this.reset()
      )
    }
  }

  reset () {
    this.mutations = []
  }

  findSignificantMutations (t) {
    return t.filter((e) => this.mutationIsSignificant(e))
  }

  mutationIsSignificant (t) {
    if (this.nodeIsMutable(t.target)) return !1
    for (const e of Array.from(this.nodesModifiedByMutation(t))) {
      if (this.nodeIsSignificant(e)) return !0
    }
    return !1
  }

  nodeIsSignificant (t) {
    return t !== this.element && !this.nodeIsMutable(t) && !Or(t)
  }

  nodeIsMutable (t) {
    return vt(t, { matchingSelector: js })
  }

  nodesModifiedByMutation (t) {
    const e = []
    switch (t.type) {
      case 'attributes':
        t.attributeName !== Zr && e.push(t.target)
        break
      case 'characterData':
        e.push(t.target.parentNode), e.push(t.target)
        break
      case 'childList':
        e.push(...Array.from(t.addedNodes || [])),
        e.push(...Array.from(t.removedNodes || []))
    }
    return e
  }

  getMutationSummary () {
    return this.getTextMutationSummary()
  }

  getTextMutationSummary () {
    const { additions: t, deletions: e } =
            this.getTextChangesFromCharacterData()
    const n = this.getTextChangesFromChildList()
    Array.from(n.additions).forEach((l) => {
      Array.from(t).includes(l) || t.push(l)
    }),
    e.push(...Array.from(n.deletions || []))
    const r = {}
    const o = t.join('')
    o && (r.textAdded = o)
    const s = e.join('')
    return s && (r.textDeleted = s), r
  }

  getMutationsByType (t) {
    return Array.from(this.mutations).filter((e) => e.type === t)
  }

  getTextChangesFromChildList () {
    let t
    let e
    const n = []
    const r = []
    Array.from(this.getMutationsByType('childList')).forEach((l) => {
      n.push(...Array.from(l.addedNodes || [])),
      r.push(...Array.from(l.removedNodes || []))
    }),
    n.length === 0 && r.length === 1 && Vt(r[0])
      ? ((t = []),
        (e = [
                      `
`
        ]))
      : ((t = li(n)), (e = li(r)))
    const o = t.filter((l, c) => l !== e[c]).map(he)
    const s = e.filter((l, c) => l !== t[c]).map(he)
    return { additions: o, deletions: s }
  }

  getTextChangesFromCharacterData () {
    let t
    let e
    const n = this.getMutationsByType('characterData')
    if (n.length) {
      const r = n[0]
      const o = n[n.length - 1]
      const s = (function (l, c) {
        let u, d
        return (
          (l = Nt.box(l)),
          (c = Nt.box(c)).length < l.length
            ? ([d, u] = nr(l, c))
            : ([u, d] = nr(c, l)),
          {
            added: u,
            removed: d
          }
        )
      })(he(r.oldValue), he(o.target.data));
      (t = s.added), (e = s.removed)
    }
    return { additions: t ? [t] : [], deletions: e ? [e] : [] }
  }
}
var li = function () {
  const i =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
  const t = []
  for (const e of Array.from(i)) {
    switch (e.nodeType) {
      case Node.TEXT_NODE:
        t.push(e.data)
        break
      case Node.ELEMENT_NODE:
        W(e) === 'br'
          ? t.push(`
`)
          : t.push(...Array.from(li(e.childNodes) || []))
    }
  }
  return t
}
const on = class extends Ht {
  constructor (t) {
    super(...arguments), (this.file = t)
  }

  perform (t) {
    const e = new FileReader()
    return (
      (e.onerror = () => t(!1)),
      (e.onload = () => {
        e.onerror = null
        try {
          e.abort()
        } catch {}
        return t(!0, this.file)
      }),
      e.readAsArrayBuffer(this.file)
    )
  }
}
const ci = class {
  constructor (t) {
    this.element = t
  }

  shouldIgnore (t) {
    return (
      !!xe.samsungAndroid &&
            ((this.previousEvent = this.event),
            (this.event = t),
            this.checkSamsungKeyboardBuggyModeStart(),
            this.checkSamsungKeyboardBuggyModeEnd(),
            this.buggyMode)
    )
  }

  checkSamsungKeyboardBuggyModeStart () {
    this.insertingLongTextAfterUnidentifiedChar() &&
            Us(this.element.innerText, this.event.data) &&
            ((this.buggyMode = !0), this.event.preventDefault())
  }

  checkSamsungKeyboardBuggyModeEnd () {
    this.buggyMode &&
            this.event.inputType !== 'insertText' &&
            (this.buggyMode = !1)
  }

  insertingLongTextAfterUnidentifiedChar () {
    let t
    return (
      this.isBeforeInputInsertText() &&
            this.previousEventWasUnidentifiedKeydown() &&
            ((t = this.event.data) === null || t === void 0
              ? void 0
              : t.length) > 50
    )
  }

  isBeforeInputInsertText () {
    return (
      this.event.type === 'beforeinput' &&
            this.event.inputType === 'insertText'
    )
  }

  previousEventWasUnidentifiedKeydown () {
    let t, e
    return (
      ((t = this.previousEvent) === null || t === void 0
        ? void 0
        : t.type) === 'keydown' &&
            ((e = this.previousEvent) === null || e === void 0
              ? void 0
              : e.key) === 'Unidentified'
    )
  }
}
var Us = (i, t) => Sr(i) === Sr(t)
const Vs = new RegExp(
  '('.concat('\uFFFC', '|').concat(ln, '|').concat(ft, '|\\s)+'),
  'g'
)
var Sr = (i) => i.replace(Vs, ' ').trim()
const $t = class extends R {
  constructor (t) {
    super(...arguments),
    (this.element = t),
    (this.mutationObserver = new rn(this.element)),
    (this.mutationObserver.delegate = this),
    (this.flakyKeyboardDetector = new ci(this.element))
    for (const e in this.constructor.events) {
      S(e, {
        onElement: this.element,
        withCallback: this.handlerFor(e)
      })
    }
  }

  elementDidMutate (t) {}

  editorWillSyncDocumentView () {
    return this.mutationObserver.stop()
  }

  editorDidSyncDocumentView () {
    return this.mutationObserver.start()
  }

  requestRender () {
    let t, e
    return (t = this.delegate) === null ||
            t === void 0 ||
            (e = t.inputControllerDidRequestRender) === null ||
            e === void 0
      ? void 0
      : e.call(t)
  }

  requestReparse () {
    let t, e
    return (
      (t = this.delegate) === null ||
                t === void 0 ||
                (e = t.inputControllerDidRequestReparse) === null ||
                e === void 0 ||
                e.call(t),
      this.requestRender()
    )
  }

  attachFiles (t) {
    const e = Array.from(t).map((n) => new on(n))
    return Promise.all(e).then((n) => {
      this.handleInput(function () {
        let r, o
        return (
          (r = this.delegate) === null ||
                        r === void 0 ||
                        r.inputControllerWillAttachFiles(),
          (o = this.responder) === null ||
                        o === void 0 ||
                        o.insertFiles(n),
          this.requestRender()
        )
      })
    })
  }

  handlerFor (t) {
    return (e) => {
      e.defaultPrevented ||
                this.handleInput(() => {
                  if (!fi(this.element)) {
                    if (this.flakyKeyboardDetector.shouldIgnore(e)) {
                      return
                    }
                    (this.eventName = t),
                    this.constructor.events[t].call(this, e)
                  }
                })
    }
  }

  handleInput (t) {
    try {
      let e;
      (e = this.delegate) === null ||
                e === void 0 ||
                e.inputControllerWillHandleInput(),
      t.call(this)
    } finally {
      let n;
      (n = this.delegate) === null ||
                n === void 0 ||
                n.inputControllerDidHandleInput()
    }
  }

  createLinkHTML (t, e) {
    const n = document.createElement('a')
    return (n.href = t), (n.textContent = e || t), n.outerHTML
  }
}
let Hn
V($t, 'events', {})
const { browser: zs, keyNames: Qr } = Ce
let Hs = 0
const $ = class extends $t {
  constructor () {
    super(...arguments), this.resetInputSummary()
  }

  setInputSummary () {
    const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    this.inputSummary.eventName = this.eventName
    for (const e in t) {
      const n = t[e]
      this.inputSummary[e] = n
    }
    return this.inputSummary
  }

  resetInputSummary () {
    this.inputSummary = {}
  }

  reset () {
    return this.resetInputSummary(), Ot.reset()
  }

  elementDidMutate (t) {
    let e, n
    return this.isComposing()
      ? (e = this.delegate) === null ||
              e === void 0 ||
              (n = e.inputControllerDidAllowUnhandledInput) === null ||
              n === void 0
          ? void 0
          : n.call(e)
      : this.handleInput(function () {
        return (
          this.mutationIsSignificant(t) &&
                          (this.mutationIsExpected(t)
                            ? this.requestRender()
                            : this.requestReparse()),
          this.reset()
        )
      })
  }

  mutationIsExpected (t) {
    const { textAdded: e, textDeleted: n } = t
    if (this.inputSummary.preferDocument) return !0
    const r =
            e != null
              ? e === this.inputSummary.textAdded
              : !this.inputSummary.textAdded
    const o =
            n != null
              ? this.inputSummary.didDelete
              : !this.inputSummary.didDelete
    const s =
            [
                `
`,
                `
`
            ].includes(e) && !r
    const l =
            n ===
                `
` && !o
    if ((s && !l) || (l && !s)) {
      const u = this.getSelectedRange()
      if (u) {
        let c
        const d = s
          ? e.replace(/\n$/, '').length || -1
          : e?.length || 1
        if (
          (c = this.responder) !== null &&
                    c !== void 0 &&
                    c.positionIsBlockBreak(u[1] + d)
        ) {
          return !0
        }
      }
    }
    return r && o
  }

  mutationIsSignificant (t) {
    let e
    const n = Object.keys(t).length > 0
    const r =
            ((e = this.compositionInput) === null || e === void 0
              ? void 0
              : e.getEndData()) === ''
    return n || !r
  }

  getCompositionInput () {
    if (this.isComposing()) return this.compositionInput
    this.compositionInput = new nt(this)
  }

  isComposing () {
    return this.compositionInput && !this.compositionInput.isEnded()
  }

  deleteInDirection (t, e) {
    let n
    return ((n = this.responder) === null || n === void 0
      ? void 0
      : n.deleteInDirection(t)) !== !1
      ? this.setInputSummary({ didDelete: !0 })
      : e
        ? (e.preventDefault(), this.requestRender())
        : void 0
  }

  serializeSelectionToDataTransfer (t) {
    let e
    if (
      !(function (r) {
        if (r == null || !r.setData) return !1
        for (const o in Qi) {
          const s = Qi[o]
          try {
            if ((r.setData(o, s), !r.getData(o) === s)) {
              return !1
            }
          } catch {
            return !1
          }
        }
        return !0
      })(t)
    ) {
      return
    }
    const n =
            (e = this.responder) === null || e === void 0
              ? void 0
              : e.getSelectedDocument().toSerializableDocument()
    return (
      t.setData('application/x-trix-document', JSON.stringify(n)),
      t.setData('text/html', Jt.render(n).innerHTML),
      t.setData('text/plain', n.toString().replace(/\n$/, '')),
      !0
    )
  }

  canAcceptDataTransfer (t) {
    const e = {}
    return (
      Array.from(t?.types || []).forEach((n) => {
        e[n] = !0
      }),
      e.Files ||
                e['application/x-trix-document'] ||
                e['text/html'] ||
                e['text/plain']
    )
  }

  getPastedHTMLUsingHiddenElement (t) {
    const e = this.getSelectedRange()
    const n = {
      position: 'absolute',
      left: ''.concat(window.pageXOffset, 'px'),
      top: ''.concat(window.pageYOffset, 'px'),
      opacity: 0
    }
    const r = p({ style: n, tagName: 'div', editable: !0 })
    return (
      document.body.appendChild(r),
      r.focus(),
      requestAnimationFrame(() => {
        const o = r.innerHTML
        return At(r), this.setSelectedRange(e), t(o)
      })
    )
  }
}
V($, 'events', {
  keydown (i) {
    this.isComposing() || this.resetInputSummary(),
    (this.inputSummary.didInput = !0)
    const t = Qr[i.keyCode]
    if (t) {
      let e
      let r = this.keys;
      ['ctrl', 'alt', 'shift', 'meta'].forEach((o) => {
        let s
        i[''.concat(o, 'Key')] &&
                    (o === 'ctrl' && (o = 'control'),
                    (r = (s = r) === null || s === void 0 ? void 0 : s[o]))
      }),
      ((e = r) === null || e === void 0 ? void 0 : e[t]) != null &&
                    (this.setInputSummary({ keyName: t }),
                    Ot.reset(),
                    r[t].call(this, i))
    }
    if (Br(i)) {
      const r = String.fromCharCode(i.keyCode).toLowerCase()
      if (r) {
        let n
        const o = ['alt', 'shift']
          .map((s) => {
            if (i[''.concat(s, 'Key')]) return s
          })
          .filter((s) => s)
        o.push(r),
        (n = this.delegate) !== null &&
                        n !== void 0 &&
                        n.inputControllerDidReceiveKeyboardCommand(o) &&
                        i.preventDefault()
      }
    }
  },
  keypress (i) {
    if (
      this.inputSummary.eventName != null ||
            i.metaKey ||
            (i.ctrlKey && !i.altKey)
    ) {
      return
    }
    const t = Ks(i)
    let e, n
    return t
      ? ((e = this.delegate) === null ||
                  e === void 0 ||
                  e.inputControllerWillPerformTyping(),
        (n = this.responder) === null ||
                  n === void 0 ||
                  n.insertString(t),
        this.setInputSummary({
          textAdded: t,
          didDelete: this.selectionIsExpanded()
        }))
      : void 0
  },
  textInput (i) {
    const { data: t } = i
    const { textAdded: e } = this.inputSummary
    if (e && e !== t && e.toUpperCase() === t) {
      let n
      const r = this.getSelectedRange()
      return (
        this.setSelectedRange([r[0], r[1] + e.length]),
        (n = this.responder) === null ||
                    n === void 0 ||
                    n.insertString(t),
        this.setInputSummary({ textAdded: t }),
        this.setSelectedRange(r)
      )
    }
  },
  dragenter (i) {
    i.preventDefault()
  },
  dragstart (i) {
    let t, e
    return (
      this.serializeSelectionToDataTransfer(i.dataTransfer),
      (this.draggedRange = this.getSelectedRange()),
      (t = this.delegate) === null ||
            t === void 0 ||
            (e = t.inputControllerDidStartDrag) === null ||
            e === void 0
        ? void 0
        : e.call(t)
    )
  },
  dragover (i) {
    if (this.draggedRange || this.canAcceptDataTransfer(i.dataTransfer)) {
      i.preventDefault()
      const n = { x: i.clientX, y: i.clientY }
      let t, e
      if (!Zt(n, this.draggingPoint)) {
        return (
          (this.draggingPoint = n),
          (t = this.delegate) === null ||
                    t === void 0 ||
                    (e = t.inputControllerDidReceiveDragOverPoint) === null ||
                    e === void 0
            ? void 0
            : e.call(t, this.draggingPoint)
        )
      }
    }
  },
  dragend (i) {
    let t, e;
    (t = this.delegate) === null ||
            t === void 0 ||
            (e = t.inputControllerDidCancelDrag) === null ||
            e === void 0 ||
            e.call(t),
    (this.draggedRange = null),
    (this.draggingPoint = null)
  },
  drop (i) {
    let t, e
    i.preventDefault()
    const n =
            (t = i.dataTransfer) === null || t === void 0 ? void 0 : t.files
    const r = i.dataTransfer.getData('application/x-trix-document')
    const o = { x: i.clientX, y: i.clientY }
    if (
      ((e = this.responder) === null ||
                e === void 0 ||
                e.setLocationRangeFromPointRange(o),
      n != null && n.length)
    ) {
      this.attachFiles(n)
    } else if (this.draggedRange) {
      let s, l;
      (s = this.delegate) === null ||
                s === void 0 ||
                s.inputControllerWillMoveText(),
      (l = this.responder) === null ||
                    l === void 0 ||
                    l.moveTextFromRange(this.draggedRange),
      (this.draggedRange = null),
      this.requestRender()
    } else if (r) {
      let c
      const u = q.fromJSONString(r);
      (c = this.responder) === null ||
                c === void 0 ||
                c.insertDocument(u),
      this.requestRender()
    }
    (this.draggedRange = null), (this.draggingPoint = null)
  },
  cut (i) {
    let t, e
    if (
      (t = this.responder) !== null &&
            t !== void 0 &&
            t.selectionIsExpanded() &&
            (this.serializeSelectionToDataTransfer(i.clipboardData) &&
                i.preventDefault(),
            (e = this.delegate) === null ||
                e === void 0 ||
                e.inputControllerWillCutText(),
            this.deleteInDirection('backward'),
            i.defaultPrevented)
    ) {
      return this.requestRender()
    }
  },
  copy (i) {
    let t;
    (t = this.responder) !== null &&
            t !== void 0 &&
            t.selectionIsExpanded() &&
            this.serializeSelectionToDataTransfer(i.clipboardData) &&
            i.preventDefault()
  },
  paste (i) {
    const t = i.clipboardData || i.testClipboardData
    const e = { clipboard: t }
    if (!t || Gs(i)) {
      return void this.getPastedHTMLUsingHiddenElement((F) => {
        let k, rt, xt
        return (
          (e.type = 'text/html'),
          (e.html = F),
          (k = this.delegate) === null ||
                        k === void 0 ||
                        k.inputControllerWillPaste(e),
          (rt = this.responder) === null ||
                        rt === void 0 ||
                        rt.insertHTML(e.html),
          this.requestRender(),
          (xt = this.delegate) === null || xt === void 0
            ? void 0
            : xt.inputControllerDidPaste(e)
        )
      })
    }
    const n = t.getData('URL')
    const r = t.getData('text/html')
    const o = t.getData('public.url-name')
    if (n) {
      let s, l, c
      let F;
      (e.type = 'text/html'),
      (F = o ? xi(o).trim() : n),
      (e.html = this.createLinkHTML(n, F)),
      (s = this.delegate) === null ||
                    s === void 0 ||
                    s.inputControllerWillPaste(e),
      this.setInputSummary({
        textAdded: F,
        didDelete: this.selectionIsExpanded()
      }),
      (l = this.responder) === null ||
                    l === void 0 ||
                    l.insertHTML(e.html),
      this.requestRender(),
      (c = this.delegate) === null ||
                    c === void 0 ||
                    c.inputControllerDidPaste(e)
    } else if (Mr(t)) {
      let u, d, C;
      (e.type = 'text/plain'),
      (e.string = t.getData('text/plain')),
      (u = this.delegate) === null ||
                    u === void 0 ||
                    u.inputControllerWillPaste(e),
      this.setInputSummary({
        textAdded: e.string,
        didDelete: this.selectionIsExpanded()
      }),
      (d = this.responder) === null ||
                    d === void 0 ||
                    d.insertString(e.string),
      this.requestRender(),
      (C = this.delegate) === null ||
                    C === void 0 ||
                    C.inputControllerDidPaste(e)
    } else if (r) {
      let T, J, Q;
      (e.type = 'text/html'),
      (e.html = r),
      (T = this.delegate) === null ||
                    T === void 0 ||
                    T.inputControllerWillPaste(e),
      (J = this.responder) === null ||
                    J === void 0 ||
                    J.insertHTML(e.html),
      this.requestRender(),
      (Q = this.delegate) === null ||
                    Q === void 0 ||
                    Q.inputControllerDidPaste(e)
    } else if (Array.from(t.types).includes('Files')) {
      let M, mt
      const F =
                (M = t.items) === null ||
                M === void 0 ||
                (M = M[0]) === null ||
                M === void 0 ||
                (mt = M.getAsFile) === null ||
                mt === void 0
                  ? void 0
                  : mt.call(M)
      if (F) {
        let yt, Qt, te
        const k = qs(F)
        !F.name &&
                    k &&
                    (F.name = 'pasted-file-'.concat(++Hs, '.').concat(k)),
        (e.type = 'File'),
        (e.file = F),
        (yt = this.delegate) === null ||
                        yt === void 0 ||
                        yt.inputControllerWillAttachFiles(),
        (Qt = this.responder) === null ||
                        Qt === void 0 ||
                        Qt.insertFile(e.file),
        this.requestRender(),
        (te = this.delegate) === null ||
                        te === void 0 ||
                        te.inputControllerDidPaste(e)
      }
    }
    i.preventDefault()
  },
  compositionstart (i) {
    return this.getCompositionInput().start(i.data)
  },
  compositionupdate (i) {
    return this.getCompositionInput().update(i.data)
  },
  compositionend (i) {
    return this.getCompositionInput().end(i.data)
  },
  beforeinput (i) {
    this.inputSummary.didInput = !0
  },
  input (i) {
    return (this.inputSummary.didInput = !0), i.stopPropagation()
  }
}),
V($, 'keys', {
  backspace (i) {
    let t
    return (
      (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
      this.deleteInDirection('backward', i)
    )
  },
  delete (i) {
    let t
    return (
      (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
      this.deleteInDirection('forward', i)
    )
  },
  return (i) {
    let t, e
    return (
      this.setInputSummary({ preferDocument: !0 }),
      (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
      (e = this.responder) === null || e === void 0
        ? void 0
        : e.insertLineBreak()
    )
  },
  tab (i) {
    let t, e;
    (t = this.responder) !== null &&
                t !== void 0 &&
                t.canIncreaseNestingLevel() &&
                ((e = this.responder) === null ||
                    e === void 0 ||
                    e.increaseNestingLevel(),
                this.requestRender(),
                i.preventDefault())
  },
  left (i) {
    let t
    if (this.selectionIsInCursorTarget()) {
      return (
        i.preventDefault(),
        (t = this.responder) === null || t === void 0
          ? void 0
          : t.moveCursorInDirection('backward')
      )
    }
  },
  right (i) {
    let t
    if (this.selectionIsInCursorTarget()) {
      return (
        i.preventDefault(),
        (t = this.responder) === null || t === void 0
          ? void 0
          : t.moveCursorInDirection('forward')
      )
    }
  },
  control: {
    d (i) {
      let t
      return (
        (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
        this.deleteInDirection('forward', i)
      )
    },
    h (i) {
      let t
      return (
        (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
        this.deleteInDirection('backward', i)
      )
    },
    o (i) {
      let t, e
      return (
        i.preventDefault(),
        (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
        (e = this.responder) === null ||
                        e === void 0 ||
                        e.insertString(
                            `
`,
                            { updatePosition: !1 }
                        ),
        this.requestRender()
      )
    }
  },
  shift: {
    return (i) {
      let t, e;
      (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillPerformTyping(),
      (e = this.responder) === null ||
                        e === void 0 ||
                        e.insertString(`
`),
      this.requestRender(),
      i.preventDefault()
    },
    tab (i) {
      let t, e;
      (t = this.responder) !== null &&
                    t !== void 0 &&
                    t.canDecreaseNestingLevel() &&
                    ((e = this.responder) === null ||
                        e === void 0 ||
                        e.decreaseNestingLevel(),
                    this.requestRender(),
                    i.preventDefault())
    },
    left (i) {
      if (this.selectionIsInCursorTarget()) {
        return (
          i.preventDefault(),
          this.expandSelectionInDirection('backward')
        )
      }
    },
    right (i) {
      if (this.selectionIsInCursorTarget()) {
        return (
          i.preventDefault(),
          this.expandSelectionInDirection('forward')
        )
      }
    }
  },
  alt: {
    backspace (i) {
      let t
      return (
        this.setInputSummary({ preferDocument: !1 }),
        (t = this.delegate) === null || t === void 0
          ? void 0
          : t.inputControllerWillPerformTyping()
      )
    }
  },
  meta: {
    backspace (i) {
      let t
      return (
        this.setInputSummary({ preferDocument: !1 }),
        (t = this.delegate) === null || t === void 0
          ? void 0
          : t.inputControllerWillPerformTyping()
      )
    }
  }
}),
$.proxyMethod('responder?.getSelectedRange'),
$.proxyMethod('responder?.setSelectedRange'),
$.proxyMethod('responder?.expandSelectionInDirection'),
$.proxyMethod('responder?.selectionIsInCursorTarget'),
$.proxyMethod('responder?.selectionIsExpanded')
var qs = (i) => {
  let t
  return (t = i.type) === null ||
        t === void 0 ||
        (t = t.match(/\/(\w+)$/)) === null ||
        t === void 0
    ? void 0
    : t[1]
}
const Js = !(
  (Hn = ' '.codePointAt) === null ||
    Hn === void 0 ||
    !Hn.call(' ', 0)
)
var Ks = function (i) {
  if (i.key && Js && i.key.codePointAt(0) === i.keyCode) return i.key
  {
    let t
    if (
      (i.which === null
        ? (t = i.keyCode)
        : i.which !== 0 && i.charCode !== 0 && (t = i.charCode),
      t != null && Qr[t] !== 'escape')
    ) {
      return Nt.fromCodepoints([t]).toString()
    }
  }
}
var Gs = function (i) {
  const t = i.clipboardData
  if (t) {
    if (t.types.includes('text/html')) {
      for (const e of t.types) {
        const n = /^CorePasteboardFlavorType/.test(e)
        const r = /^dyn\./.test(e) && t.getData(e)
        if (n || r) return !0
      }
      return !1
    }
    {
      const e = t.types.includes('com.apple.webarchive')
      const n = t.types.includes('com.apple.flat-rtfd')
      return e || n
    }
  }
}
var nt = class extends R {
  constructor (t) {
    super(...arguments),
    (this.inputController = t),
    (this.responder = this.inputController.responder),
    (this.delegate = this.inputController.delegate),
    (this.inputSummary = this.inputController.inputSummary),
    (this.data = {})
  }

  start (t) {
    if (((this.data.start = t), this.isSignificant())) {
      let e, n
      this.inputSummary.eventName === 'keypress' &&
                this.inputSummary.textAdded &&
                ((n = this.responder) === null ||
                    n === void 0 ||
                    n.deleteInDirection('left')),
      this.selectionIsExpanded() ||
                    (this.insertPlaceholder(), this.requestRender()),
      (this.range =
                    (e = this.responder) === null || e === void 0
                      ? void 0
                      : e.getSelectedRange())
    }
  }

  update (t) {
    if (((this.data.update = t), this.isSignificant())) {
      const e = this.selectPlaceholder()
      e && (this.forgetPlaceholder(), (this.range = e))
    }
  }

  end (t) {
    return (
      (this.data.end = t),
      this.isSignificant()
        ? (this.forgetPlaceholder(),
          this.canApplyToDocument()
            ? (this.setInputSummary({
                preferDocument: !0,
                didInput: !1
              }),
              (e = this.delegate) === null ||
                            e === void 0 ||
                            e.inputControllerWillPerformTyping(),
              (n = this.responder) === null ||
                            n === void 0 ||
                            n.setSelectedRange(this.range),
              (r = this.responder) === null ||
                            r === void 0 ||
                            r.insertString(this.data.end),
              (o = this.responder) === null || o === void 0
                ? void 0
                : o.setSelectedRange(
                  this.range[0] + this.data.end.length
                ))
            : this.data.start != null || this.data.update != null
              ? (this.requestReparse(), this.inputController.reset())
              : void 0)
        : this.inputController.reset()
    )
    let e, n, r, o
  }

  getEndData () {
    return this.data.end
  }

  isEnded () {
    return this.getEndData() != null
  }

  isSignificant () {
    return !zs.composesExistingText || this.inputSummary.didInput
  }

  canApplyToDocument () {
    let t, e
    return (
      ((t = this.data.start) === null || t === void 0
        ? void 0
        : t.length) === 0 &&
            ((e = this.data.end) === null || e === void 0 ? void 0 : e.length) >
                0 &&
            this.range
    )
  }
}
nt.proxyMethod('inputController.setInputSummary'),
nt.proxyMethod('inputController.requestRender'),
nt.proxyMethod('inputController.requestReparse'),
nt.proxyMethod('responder?.selectionIsExpanded'),
nt.proxyMethod('responder?.insertPlaceholder'),
nt.proxyMethod('responder?.selectPlaceholder'),
nt.proxyMethod('responder?.forgetPlaceholder')
const wt = class extends $t {
  constructor () {
    super(...arguments), (this.render = this.render.bind(this))
  }

  elementDidMutate () {
    return this.scheduledRender
      ? this.composing
        ? (t = this.delegate) === null ||
                  t === void 0 ||
                  (e = t.inputControllerDidAllowUnhandledInput) === null ||
                  e === void 0
            ? void 0
            : e.call(t)
        : void 0
      : this.reparse()
    let t, e
  }

  scheduleRender () {
    return this.scheduledRender
      ? this.scheduledRender
      : (this.scheduledRender = requestAnimationFrame(this.render))
  }

  render () {
    let t, e
    cancelAnimationFrame(this.scheduledRender),
    (this.scheduledRender = null),
    this.composing ||
                (e = this.delegate) === null ||
                e === void 0 ||
                e.render(),
    (t = this.afterRender) === null || t === void 0 || t.call(this),
    (this.afterRender = null)
  }

  reparse () {
    let t
    return (t = this.delegate) === null || t === void 0
      ? void 0
      : t.reparse()
  }

  insertString () {
    let t
    const e =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ''
    const n = arguments.length > 1 ? arguments[1] : void 0
    return (
      (t = this.delegate) === null ||
                t === void 0 ||
                t.inputControllerWillPerformTyping(),
      this.withTargetDOMRange(function () {
        let r
        return (r = this.responder) === null || r === void 0
          ? void 0
          : r.insertString(e, n)
      })
    )
  }

  toggleAttributeIfSupported (t) {
    let e
    if (Qn().includes(t)) {
      return (
        (e = this.delegate) === null ||
                    e === void 0 ||
                    e.inputControllerWillPerformFormatting(t),
        this.withTargetDOMRange(function () {
          let n
          return (n = this.responder) === null || n === void 0
            ? void 0
            : n.toggleCurrentAttribute(t)
        })
      )
    }
  }

  activateAttributeIfSupported (t, e) {
    let n
    if (Qn().includes(t)) {
      return (
        (n = this.delegate) === null ||
                    n === void 0 ||
                    n.inputControllerWillPerformFormatting(t),
        this.withTargetDOMRange(function () {
          let r
          return (r = this.responder) === null || r === void 0
            ? void 0
            : r.setCurrentAttribute(t, e)
        })
      )
    }
  }

  deleteInDirection (t) {
    const { recordUndoEntry: e } =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : { recordUndoEntry: !0 }
    let n
    e &&
            ((n = this.delegate) === null ||
                n === void 0 ||
                n.inputControllerWillPerformTyping())
    const r = () => {
      let s
      return (s = this.responder) === null || s === void 0
        ? void 0
        : s.deleteInDirection(t)
    }
    const o = this.getTargetDOMRange({ minLength: this.composing ? 1 : 2 })
    return o ? this.withTargetDOMRange(o, r) : r()
  }

  withTargetDOMRange (t, e) {
    let n
    return (
      typeof t === 'function' &&
                ((e = t), (t = this.getTargetDOMRange())),
      t
        ? (n = this.responder) === null || n === void 0
            ? void 0
            : n.withTargetDOMRange(t, e.bind(this))
        : (Ot.reset(), e.call(this))
    )
  }

  getTargetDOMRange () {
    let t, e
    const { minLength: n } =
            arguments.length > 0 && arguments[0] !== void 0
              ? arguments[0]
              : { minLength: 0 }
    const r =
            (t = (e = this.event).getTargetRanges) === null || t === void 0
              ? void 0
              : t.call(e)
    if (r && r.length) {
      const o = Ys(r[0])
      if (n === 0 || o.toString().length >= n) return o
    }
  }

  withEvent (t, e) {
    let n
    this.event = t
    try {
      n = e.call(this)
    } finally {
      this.event = null
    }
    return n
  }
}
V(wt, 'events', {
  keydown (i) {
    if (Br(i)) {
      let t
      const e = Zs(i);
      (t = this.delegate) !== null &&
                t !== void 0 &&
                t.inputControllerDidReceiveKeyboardCommand(e) &&
                i.preventDefault()
    } else {
      let e = i.key
      i.altKey && (e += '+Alt'), i.shiftKey && (e += '+Shift')
      const n = this.constructor.keys[e]
      if (n) return this.withEvent(i, n)
    }
  },
  paste (i) {
    let t
    let e
    const n =
            (t = i.clipboardData) === null || t === void 0
              ? void 0
              : t.getData('URL')
    return to(i)
      ? (i.preventDefault(), this.attachFiles(i.clipboardData.files))
      : Xs(i)
        ? (i.preventDefault(),
          (e = {
            type: 'text/plain',
            string: i.clipboardData.getData('text/plain')
          }),
          (r = this.delegate) === null ||
                    r === void 0 ||
                    r.inputControllerWillPaste(e),
          (o = this.responder) === null ||
                    o === void 0 ||
                    o.insertString(e.string),
          this.render(),
          (s = this.delegate) === null || s === void 0
            ? void 0
            : s.inputControllerDidPaste(e))
        : n
          ? (i.preventDefault(),
            (e = {
              type: 'text/html',
              html: this.createLinkHTML(n)
            }),
            (l = this.delegate) === null ||
                      l === void 0 ||
                      l.inputControllerWillPaste(e),
            (c = this.responder) === null ||
                      c === void 0 ||
                      c.insertHTML(e.html),
            this.render(),
            (u = this.delegate) === null || u === void 0
              ? void 0
              : u.inputControllerDidPaste(e))
          : void 0
    let r, o, s, l, c, u
  },
  beforeinput (i) {
    const t = this.constructor.inputTypes[i.inputType]
    const e =
            ((n = i),
            !(
              !/iPhone|iPad/.test(navigator.userAgent) ||
                (n.inputType && n.inputType !== 'insertParagraph')
            ))
    let n
    t && (this.withEvent(i, t), e || this.scheduleRender()),
    e && this.render()
  },
  input (i) {
    Ot.reset()
  },
  dragstart (i) {
    let t, e;
    (t = this.responder) !== null &&
            t !== void 0 &&
            t.selectionContainsAttachments() &&
            (i.dataTransfer.setData('application/x-trix-dragging', !0),
            (this.dragging = {
              range:
                    (e = this.responder) === null || e === void 0
                      ? void 0
                      : e.getSelectedRange(),
              point: Jn(i)
            }))
  },
  dragenter (i) {
    qn(i) && i.preventDefault()
  },
  dragover (i) {
    if (this.dragging) {
      i.preventDefault()
      const e = Jn(i)
      let t
      if (!Zt(e, this.dragging.point)) {
        return (
          (this.dragging.point = e),
          (t = this.responder) === null || t === void 0
            ? void 0
            : t.setLocationRangeFromPointRange(e)
        )
      }
    } else qn(i) && i.preventDefault()
  },
  drop (i) {
    let t, e
    if (this.dragging) {
      return (
        i.preventDefault(),
        (t = this.delegate) === null ||
                    t === void 0 ||
                    t.inputControllerWillMoveText(),
        (e = this.responder) === null ||
                    e === void 0 ||
                    e.moveTextFromRange(this.dragging.range),
        (this.dragging = null),
        this.scheduleRender()
      )
    }
    if (qn(i)) {
      let n
      i.preventDefault()
      const r = Jn(i)
      return (
        (n = this.responder) === null ||
                    n === void 0 ||
                    n.setLocationRangeFromPointRange(r),
        this.attachFiles(i.dataTransfer.files)
      )
    }
  },
  dragend () {
    let i
    this.dragging &&
            ((i = this.responder) === null ||
                i === void 0 ||
                i.setSelectedRange(this.dragging.range),
            (this.dragging = null))
  },
  compositionend (i) {
    this.composing &&
            ((this.composing = !1), xe.recentAndroid || this.scheduleRender())
  }
}),
V(wt, 'keys', {
  ArrowLeft () {
    let i, t
    if (
      (i = this.responder) !== null &&
                i !== void 0 &&
                i.shouldManageMovingCursorInDirection('backward')
    ) {
      return (
        this.event.preventDefault(),
        (t = this.responder) === null || t === void 0
          ? void 0
          : t.moveCursorInDirection('backward')
      )
    }
  },
  ArrowRight () {
    let i, t
    if (
      (i = this.responder) !== null &&
                i !== void 0 &&
                i.shouldManageMovingCursorInDirection('forward')
    ) {
      return (
        this.event.preventDefault(),
        (t = this.responder) === null || t === void 0
          ? void 0
          : t.moveCursorInDirection('forward')
      )
    }
  },
  Backspace () {
    let i, t, e
    if (
      (i = this.responder) !== null &&
                i !== void 0 &&
                i.shouldManageDeletingInDirection('backward')
    ) {
      return (
        this.event.preventDefault(),
        (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillPerformTyping(),
        (e = this.responder) === null ||
                        e === void 0 ||
                        e.deleteInDirection('backward'),
        this.render()
      )
    }
  },
  Tab () {
    let i, t
    if (
      (i = this.responder) !== null &&
                i !== void 0 &&
                i.canIncreaseNestingLevel()
    ) {
      return (
        this.event.preventDefault(),
        (t = this.responder) === null ||
                        t === void 0 ||
                        t.increaseNestingLevel(),
        this.render()
      )
    }
  },
  'Tab+Shift' () {
    let i, t
    if (
      (i = this.responder) !== null &&
                i !== void 0 &&
                i.canDecreaseNestingLevel()
    ) {
      return (
        this.event.preventDefault(),
        (t = this.responder) === null ||
                        t === void 0 ||
                        t.decreaseNestingLevel(),
        this.render()
      )
    }
  }
}),
V(wt, 'inputTypes', {
  deleteByComposition () {
    return this.deleteInDirection('backward', { recordUndoEntry: !1 })
  },
  deleteByCut () {
    return this.deleteInDirection('backward')
  },
  deleteByDrag () {
    return (
      this.event.preventDefault(),
      this.withTargetDOMRange(function () {
        let i
        this.deleteByDragRange =
                        (i = this.responder) === null || i === void 0
                          ? void 0
                          : i.getSelectedRange()
      })
    )
  },
  deleteCompositionText () {
    return this.deleteInDirection('backward', { recordUndoEntry: !1 })
  },
  deleteContent () {
    return this.deleteInDirection('backward')
  },
  deleteContentBackward () {
    return this.deleteInDirection('backward')
  },
  deleteContentForward () {
    return this.deleteInDirection('forward')
  },
  deleteEntireSoftLine () {
    return this.deleteInDirection('forward')
  },
  deleteHardLineBackward () {
    return this.deleteInDirection('backward')
  },
  deleteHardLineForward () {
    return this.deleteInDirection('forward')
  },
  deleteSoftLineBackward () {
    return this.deleteInDirection('backward')
  },
  deleteSoftLineForward () {
    return this.deleteInDirection('forward')
  },
  deleteWordBackward () {
    return this.deleteInDirection('backward')
  },
  deleteWordForward () {
    return this.deleteInDirection('forward')
  },
  formatBackColor () {
    return this.activateAttributeIfSupported(
      'backgroundColor',
      this.event.data
    )
  },
  formatBold () {
    return this.toggleAttributeIfSupported('bold')
  },
  formatFontColor () {
    return this.activateAttributeIfSupported('color', this.event.data)
  },
  formatFontName () {
    return this.activateAttributeIfSupported('font', this.event.data)
  },
  formatIndent () {
    let i
    if (
      (i = this.responder) !== null &&
                i !== void 0 &&
                i.canIncreaseNestingLevel()
    ) {
      return this.withTargetDOMRange(function () {
        let t
        return (t = this.responder) === null || t === void 0
          ? void 0
          : t.increaseNestingLevel()
      })
    }
  },
  formatItalic () {
    return this.toggleAttributeIfSupported('italic')
  },
  formatJustifyCenter () {
    return this.toggleAttributeIfSupported('justifyCenter')
  },
  formatJustifyFull () {
    return this.toggleAttributeIfSupported('justifyFull')
  },
  formatJustifyLeft () {
    return this.toggleAttributeIfSupported('justifyLeft')
  },
  formatJustifyRight () {
    return this.toggleAttributeIfSupported('justifyRight')
  },
  formatOutdent () {
    let i
    if (
      (i = this.responder) !== null &&
                i !== void 0 &&
                i.canDecreaseNestingLevel()
    ) {
      return this.withTargetDOMRange(function () {
        let t
        return (t = this.responder) === null || t === void 0
          ? void 0
          : t.decreaseNestingLevel()
      })
    }
  },
  formatRemove () {
    this.withTargetDOMRange(function () {
      for (const e in (i = this.responder) === null || i === void 0
        ? void 0
        : i.getCurrentAttributes()) {
        var i, t;
        (t = this.responder) === null ||
                        t === void 0 ||
                        t.removeCurrentAttribute(e)
      }
    })
  },
  formatSetBlockTextDirection () {
    return this.activateAttributeIfSupported(
      'blockDir',
      this.event.data
    )
  },
  formatSetInlineTextDirection () {
    return this.activateAttributeIfSupported(
      'textDir',
      this.event.data
    )
  },
  formatStrikeThrough () {
    return this.toggleAttributeIfSupported('strike')
  },
  formatSubscript () {
    return this.toggleAttributeIfSupported('sub')
  },
  formatSuperscript () {
    return this.toggleAttributeIfSupported('sup')
  },
  formatUnderline () {
    return this.toggleAttributeIfSupported('underline')
  },
  historyRedo () {
    let i
    return (i = this.delegate) === null || i === void 0
      ? void 0
      : i.inputControllerWillPerformRedo()
  },
  historyUndo () {
    let i
    return (i = this.delegate) === null || i === void 0
      ? void 0
      : i.inputControllerWillPerformUndo()
  },
  insertCompositionText () {
    return (this.composing = !0), this.insertString(this.event.data)
  },
  insertFromComposition () {
    return (this.composing = !1), this.insertString(this.event.data)
  },
  insertFromDrop () {
    const i = this.deleteByDragRange
    let t
    if (i) {
      return (
        (this.deleteByDragRange = null),
        (t = this.delegate) === null ||
                        t === void 0 ||
                        t.inputControllerWillMoveText(),
        this.withTargetDOMRange(function () {
          let e
          return (e = this.responder) === null || e === void 0
            ? void 0
            : e.moveTextFromRange(i)
        })
      )
    }
  },
  insertFromPaste () {
    const { dataTransfer: i } = this.event
    const t = { dataTransfer: i }
    const e = i.getData('URL')
    const n = i.getData('text/html')
    if (e) {
      let r
      let c
      this.event.preventDefault(), (t.type = 'text/html')
      const u = i.getData('public.url-name');
      (c = u ? xi(u).trim() : e),
      (t.html = this.createLinkHTML(e, c)),
      (r = this.delegate) === null ||
                        r === void 0 ||
                        r.inputControllerWillPaste(t),
      this.withTargetDOMRange(function () {
        let d
        return (d = this.responder) === null || d === void 0
          ? void 0
          : d.insertHTML(t.html)
      }),
      (this.afterRender = () => {
        let d
        return (d = this.delegate) === null || d === void 0
          ? void 0
          : d.inputControllerDidPaste(t)
      })
    } else if (Mr(i)) {
      let o;
      (t.type = 'text/plain'),
      (t.string = i.getData('text/plain')),
      (o = this.delegate) === null ||
                        o === void 0 ||
                        o.inputControllerWillPaste(t),
      this.withTargetDOMRange(function () {
        let c
        return (c = this.responder) === null || c === void 0
          ? void 0
          : c.insertString(t.string)
      }),
      (this.afterRender = () => {
        let c
        return (c = this.delegate) === null || c === void 0
          ? void 0
          : c.inputControllerDidPaste(t)
      })
    } else if ($s(this.event)) {
      let s;
      (t.type = 'File'),
      (t.file = i.files[0]),
      (s = this.delegate) === null ||
                        s === void 0 ||
                        s.inputControllerWillPaste(t),
      this.withTargetDOMRange(function () {
        let c
        return (c = this.responder) === null || c === void 0
          ? void 0
          : c.insertFile(t.file)
      }),
      (this.afterRender = () => {
        let c
        return (c = this.delegate) === null || c === void 0
          ? void 0
          : c.inputControllerDidPaste(t)
      })
    } else if (n) {
      let l
      this.event.preventDefault(),
      (t.type = 'text/html'),
      (t.html = n),
      (l = this.delegate) === null ||
                        l === void 0 ||
                        l.inputControllerWillPaste(t),
      this.withTargetDOMRange(function () {
        let c
        return (c = this.responder) === null || c === void 0
          ? void 0
          : c.insertHTML(t.html)
      }),
      (this.afterRender = () => {
        let c
        return (c = this.delegate) === null || c === void 0
          ? void 0
          : c.inputControllerDidPaste(t)
      })
    }
  },
  insertFromYank () {
    return this.insertString(this.event.data)
  },
  insertLineBreak () {
    return this.insertString(`
`)
  },
  insertLink () {
    return this.activateAttributeIfSupported('href', this.event.data)
  },
  insertOrderedList () {
    return this.toggleAttributeIfSupported('number')
  },
  insertParagraph () {
    let i
    return (
      (i = this.delegate) === null ||
                    i === void 0 ||
                    i.inputControllerWillPerformTyping(),
      this.withTargetDOMRange(function () {
        let t
        return (t = this.responder) === null || t === void 0
          ? void 0
          : t.insertLineBreak()
      })
    )
  },
  insertReplacementText () {
    const i = this.event.dataTransfer.getData('text/plain')
    const t = this.event.getTargetRanges()[0]
    this.withTargetDOMRange(t, () => {
      this.insertString(i, { updatePosition: !1 })
    })
  },
  insertText () {
    let i
    return this.insertString(
      this.event.data ||
                    ((i = this.event.dataTransfer) === null || i === void 0
                      ? void 0
                      : i.getData('text/plain'))
    )
  },
  insertTranspose () {
    return this.insertString(this.event.data)
  },
  insertUnorderedList () {
    return this.toggleAttributeIfSupported('bullet')
  }
})
var Ys = function (i) {
  const t = document.createRange()
  return (
    t.setStart(i.startContainer, i.startOffset),
    t.setEnd(i.endContainer, i.endOffset),
    t
  )
}
var qn = (i) => {
  let t
  return Array.from(
    ((t = i.dataTransfer) === null || t === void 0 ? void 0 : t.types) ||
            []
  ).includes('Files')
}
var $s = (i) => {
  let t
  return (
    ((t = i.dataTransfer.files) === null || t === void 0 ? void 0 : t[0]) &&
        !to(i) &&
        !((e) => {
          const { dataTransfer: n } = e
          return (
            n.types.includes('Files') &&
                n.types.includes('text/html') &&
                n
                  .getData('text/html')
                  .includes('urn:schemas-microsoft-com:office:office')
          )
        })(i)
  )
}
var to = function (i) {
  const t = i.clipboardData
  if (t) {
    return (
      Array.from(t.types).filter((e) => e.match(/file/i)).length ===
                t.types.length && t.files.length >= 1
    )
  }
}
var Xs = function (i) {
  const t = i.clipboardData
  if (t) return t.types.includes('text/plain') && t.types.length === 1
}
var Zs = function (i) {
  const t = []
  return (
    i.altKey && t.push('alt'),
    i.shiftKey && t.push('shift'),
    t.push(i.key),
    t
  )
}
var Jn = (i) => ({ x: i.clientX, y: i.clientY })
const ui = '[data-trix-attribute]'
const hi = '[data-trix-action]'
const Qs = ''.concat(ui, ', ').concat(hi)
const cn = '[data-trix-dialog]'
const ta = ''.concat(cn, '[data-trix-active]')
const ea = ''.concat(cn, ' [data-trix-method]')
const kr = ''.concat(cn, ' [data-trix-input]')
const Rr = (i, t) => (
  t || (t = Ut(i)),
  i.querySelector("[data-trix-input][name='".concat(t, "']"))
)
const Tr = (i) => i.getAttribute('data-trix-action')
var Ut = (i) =>
  i.getAttribute('data-trix-attribute') ||
    i.getAttribute('data-trix-dialog-attribute')
const sn = class extends R {
  constructor (t) {
    super(t),
    (this.didClickActionButton = this.didClickActionButton.bind(this)),
    (this.didClickAttributeButton =
                this.didClickAttributeButton.bind(this)),
    (this.didClickDialogButton = this.didClickDialogButton.bind(this)),
    (this.didKeyDownDialogInput =
                this.didKeyDownDialogInput.bind(this)),
    (this.element = t),
    (this.attributes = {}),
    (this.actions = {}),
    this.resetDialogInputs(),
    S('mousedown', {
      onElement: this.element,
      matchingSelector: hi,
      withCallback: this.didClickActionButton
    }),
    S('mousedown', {
      onElement: this.element,
      matchingSelector: ui,
      withCallback: this.didClickAttributeButton
    }),
    S('click', {
      onElement: this.element,
      matchingSelector: Qs,
      preventDefault: !0
    }),
    S('click', {
      onElement: this.element,
      matchingSelector: ea,
      withCallback: this.didClickDialogButton
    }),
    S('keydown', {
      onElement: this.element,
      matchingSelector: kr,
      withCallback: this.didKeyDownDialogInput
    })
  }

  didClickActionButton (t, e) {
    let n;
    (n = this.delegate) === null ||
            n === void 0 ||
            n.toolbarDidClickButton(),
    t.preventDefault()
    const r = Tr(e)
    return this.getDialog(r)
      ? this.toggleDialog(r)
      : (o = this.delegate) === null || o === void 0
          ? void 0
          : o.toolbarDidInvokeAction(r, e)
    let o
  }

  didClickAttributeButton (t, e) {
    let n;
    (n = this.delegate) === null ||
            n === void 0 ||
            n.toolbarDidClickButton(),
    t.preventDefault()
    const r = Ut(e)
    let o
    return (
      this.getDialog(r)
        ? this.toggleDialog(r)
        : (o = this.delegate) === null ||
                  o === void 0 ||
                  o.toolbarDidToggleAttribute(r),
      this.refreshAttributeButtons()
    )
  }

  didClickDialogButton (t, e) {
    const n = vt(e, { matchingSelector: cn })
    return this[e.getAttribute('data-trix-method')].call(this, n)
  }

  didKeyDownDialogInput (t, e) {
    if (t.keyCode === 13) {
      t.preventDefault()
      const n = e.getAttribute('name')
      const r = this.getDialog(n)
      this.setAttribute(r)
    }
    if (t.keyCode === 27) return t.preventDefault(), this.hideDialog()
  }

  updateActions (t) {
    return (this.actions = t), this.refreshActionButtons()
  }

  refreshActionButtons () {
    return this.eachActionButton((t, e) => {
      t.disabled = this.actions[e] === !1
    })
  }

  eachActionButton (t) {
    return Array.from(this.element.querySelectorAll(hi)).map((e) =>
      t(e, Tr(e))
    )
  }

  updateAttributes (t) {
    return (this.attributes = t), this.refreshAttributeButtons()
  }

  refreshAttributeButtons () {
    return this.eachAttributeButton(
      (t, e) => (
        (t.disabled = this.attributes[e] === !1),
        this.attributes[e] || this.dialogIsVisible(e)
          ? (t.setAttribute('data-trix-active', ''),
            t.classList.add('trix-active'))
          : (t.removeAttribute('data-trix-active'),
            t.classList.remove('trix-active'))
      )
    )
  }

  eachAttributeButton (t) {
    return Array.from(this.element.querySelectorAll(ui)).map((e) =>
      t(e, Ut(e))
    )
  }

  applyKeyboardCommand (t) {
    const e = JSON.stringify(t.sort())
    for (const n of Array.from(
      this.element.querySelectorAll('[data-trix-key]')
    )) {
      const r = n.getAttribute('data-trix-key').split('+')
      if (JSON.stringify(r.sort()) === e) {
        return de('mousedown', { onElement: n }), !0
      }
    }
    return !1
  }

  dialogIsVisible (t) {
    const e = this.getDialog(t)
    if (e) return e.hasAttribute('data-trix-active')
  }

  toggleDialog (t) {
    return this.dialogIsVisible(t) ? this.hideDialog() : this.showDialog(t)
  }

  showDialog (t) {
    let e, n
    this.hideDialog(),
    (e = this.delegate) === null ||
                e === void 0 ||
                e.toolbarWillShowDialog()
    const r = this.getDialog(t)
    r.setAttribute('data-trix-active', ''),
    r.classList.add('trix-active'),
    Array.from(r.querySelectorAll('input[disabled]')).forEach((s) => {
      s.removeAttribute('disabled')
    })
    const o = Ut(r)
    if (o) {
      const s = Rr(r, t)
      s && ((s.value = this.attributes[o] || ''), s.select())
    }
    return (n = this.delegate) === null || n === void 0
      ? void 0
      : n.toolbarDidShowDialog(t)
  }

  setAttribute (t) {
    let e
    const n = Ut(t)
    const r = Rr(t, n)
    return !r.willValidate ||
            (r.setCustomValidity(''),
            r.checkValidity() && this.isSafeAttribute(r))
      ? ((e = this.delegate) === null ||
                  e === void 0 ||
                  e.toolbarDidUpdateAttribute(n, r.value),
        this.hideDialog())
      : (r.setCustomValidity('Invalid value'),
        r.setAttribute('data-trix-validate', ''),
        r.classList.add('trix-validate'),
        r.focus())
  }

  isSafeAttribute (t) {
    return (
      !t.hasAttribute('data-trix-validate-href') ||
            Ve.isValidAttribute('a', 'href', t.value)
    )
  }

  removeAttribute (t) {
    let e
    const n = Ut(t)
    return (
      (e = this.delegate) === null ||
                e === void 0 ||
                e.toolbarDidRemoveAttribute(n),
      this.hideDialog()
    )
  }

  hideDialog () {
    const t = this.element.querySelector(ta)
    let e
    if (t) {
      return (
        t.removeAttribute('data-trix-active'),
        t.classList.remove('trix-active'),
        this.resetDialogInputs(),
        (e = this.delegate) === null || e === void 0
          ? void 0
          : e.toolbarDidHideDialog(
            ((n) => n.getAttribute('data-trix-dialog'))(t)
          )
      )
    }
  }

  resetDialogInputs () {
    Array.from(this.element.querySelectorAll(kr)).forEach((t) => {
      t.setAttribute('disabled', 'disabled'),
      t.removeAttribute('data-trix-validate'),
      t.classList.remove('trix-validate')
    })
  }

  getDialog (t) {
    return this.element.querySelector('[data-trix-dialog='.concat(t, ']'))
  }
}
const Lt = class extends nn {
  constructor (t) {
    const { editorElement: e, document: n, html: r } = t
    super(...arguments),
    (this.editorElement = e),
    (this.selectionManager = new ct(this.editorElement)),
    (this.selectionManager.delegate = this),
    (this.composition = new it()),
    (this.composition.delegate = this),
    (this.attachmentManager = new Ge(
      this.composition.getAttachments()
    )),
    (this.attachmentManager.delegate = this),
    (this.inputController =
                bi.getLevel() === 2
                  ? new wt(this.editorElement)
                  : new $(this.editorElement)),
    (this.inputController.delegate = this),
    (this.inputController.responder = this.composition),
    (this.compositionController = new en(
      this.editorElement,
      this.composition
    )),
    (this.compositionController.delegate = this),
    (this.toolbarController = new sn(
      this.editorElement.toolbarElement
    )),
    (this.toolbarController.delegate = this),
    (this.editor = new Xe(
      this.composition,
      this.selectionManager,
      this.editorElement
    )),
    n ? this.editor.loadDocument(n) : this.editor.loadHTML(r)
  }

  registerSelectionManager () {
    return Ot.registerSelectionManager(this.selectionManager)
  }

  unregisterSelectionManager () {
    return Ot.unregisterSelectionManager(this.selectionManager)
  }

  render () {
    return this.compositionController.render()
  }

  reparse () {
    return this.composition.replaceHTML(this.editorElement.innerHTML)
  }

  compositionDidChangeDocument (t) {
    if (
      (this.notifyEditorElement('document-change'), !this.handlingInput)
    ) {
      return this.render()
    }
  }

  compositionDidChangeCurrentAttributes (t) {
    return (
      (this.currentAttributes = t),
      this.toolbarController.updateAttributes(this.currentAttributes),
      this.updateCurrentActions(),
      this.notifyEditorElement('attributes-change', {
        attributes: this.currentAttributes
      })
    )
  }

  compositionDidPerformInsertionAtRange (t) {
    this.pasting && (this.pastedRange = t)
  }

  compositionShouldAcceptFile (t) {
    return this.notifyEditorElement('file-accept', { file: t })
  }

  compositionDidAddAttachment (t) {
    const e = this.attachmentManager.manageAttachment(t)
    return this.notifyEditorElement('attachment-add', {
      attachment: e
    })
  }

  compositionDidEditAttachment (t) {
    this.compositionController.rerenderViewForObject(t)
    const e = this.attachmentManager.manageAttachment(t)
    return (
      this.notifyEditorElement('attachment-edit', { attachment: e }),
      this.notifyEditorElement('change')
    )
  }

  compositionDidChangeAttachmentPreviewURL (t) {
    return (
      this.compositionController.invalidateViewForObject(t),
      this.notifyEditorElement('change')
    )
  }

  compositionDidRemoveAttachment (t) {
    const e = this.attachmentManager.unmanageAttachment(t)
    return this.notifyEditorElement('attachment-remove', {
      attachment: e
    })
  }

  compositionDidStartEditingAttachment (t, e) {
    return (
      (this.attachmentLocationRange =
                this.composition.document.getLocationRangeOfAttachment(t)),
      this.compositionController.installAttachmentEditorForAttachment(
        t,
        e
      ),
      this.selectionManager.setLocationRange(this.attachmentLocationRange)
    )
  }

  compositionDidStopEditingAttachment (t) {
    this.compositionController.uninstallAttachmentEditor(),
    (this.attachmentLocationRange = null)
  }

  compositionDidRequestChangingSelectionToLocationRange (t) {
    if (!this.loadingSnapshot || this.isFocused()) {
      return (
        (this.requestedLocationRange = t),
        (this.compositionRevisionWhenLocationRangeRequested =
                    this.composition.revision),
        this.handlingInput ? void 0 : this.render()
      )
    }
  }

  compositionWillLoadSnapshot () {
    this.loadingSnapshot = !0
  }

  compositionDidLoadSnapshot () {
    this.compositionController.refreshViewCache(),
    this.render(),
    (this.loadingSnapshot = !1)
  }

  getSelectionManager () {
    return this.selectionManager
  }

  attachmentManagerDidRequestRemovalOfAttachment (t) {
    return this.removeAttachment(t)
  }

  compositionControllerWillSyncDocumentView () {
    return (
      this.inputController.editorWillSyncDocumentView(),
      this.selectionManager.lock(),
      this.selectionManager.clearSelection()
    )
  }

  compositionControllerDidSyncDocumentView () {
    return (
      this.inputController.editorDidSyncDocumentView(),
      this.selectionManager.unlock(),
      this.updateCurrentActions(),
      this.notifyEditorElement('sync')
    )
  }

  compositionControllerDidRender () {
    this.requestedLocationRange &&
            (this.compositionRevisionWhenLocationRangeRequested ===
                this.composition.revision &&
                this.selectionManager.setLocationRange(
                  this.requestedLocationRange
                ),
            (this.requestedLocationRange = null),
            (this.compositionRevisionWhenLocationRangeRequested = null)),
    this.renderedCompositionRevision !== this.composition.revision &&
                (this.runEditorFilters(),
                this.composition.updateCurrentAttributes(),
                this.notifyEditorElement('render')),
    (this.renderedCompositionRevision = this.composition.revision)
  }

  compositionControllerDidFocus () {
    return (
      this.isFocusedInvisibly() &&
                this.setLocationRange({
                  index: 0,
                  offset: 0
                }),
      this.toolbarController.hideDialog(),
      this.notifyEditorElement('focus')
    )
  }

  compositionControllerDidBlur () {
    return this.notifyEditorElement('blur')
  }

  compositionControllerDidSelectAttachment (t, e) {
    return (
      this.toolbarController.hideDialog(),
      this.composition.editAttachment(t, e)
    )
  }

  compositionControllerDidRequestDeselectingAttachment (t) {
    const e =
            this.attachmentLocationRange ||
            this.composition.document.getLocationRangeOfAttachment(t)
    return this.selectionManager.setLocationRange(e[1])
  }

  compositionControllerWillUpdateAttachment (t) {
    return this.editor.recordUndoEntry('Edit Attachment', {
      context: t.id,
      consolidatable: !0
    })
  }

  compositionControllerDidRequestRemovalOfAttachment (t) {
    return this.removeAttachment(t)
  }

  inputControllerWillHandleInput () {
    (this.handlingInput = !0), (this.requestedRender = !1)
  }

  inputControllerDidRequestRender () {
    this.requestedRender = !0
  }

  inputControllerDidHandleInput () {
    if (((this.handlingInput = !1), this.requestedRender)) {
      return (this.requestedRender = !1), this.render()
    }
  }

  inputControllerDidAllowUnhandledInput () {
    return this.notifyEditorElement('change')
  }

  inputControllerDidRequestReparse () {
    return this.reparse()
  }

  inputControllerWillPerformTyping () {
    return this.recordTypingUndoEntry()
  }

  inputControllerWillPerformFormatting (t) {
    return this.recordFormattingUndoEntry(t)
  }

  inputControllerWillCutText () {
    return this.editor.recordUndoEntry('Cut')
  }

  inputControllerWillPaste (t) {
    return (
      this.editor.recordUndoEntry('Paste'),
      (this.pasting = !0),
      this.notifyEditorElement('before-paste', { paste: t })
    )
  }

  inputControllerDidPaste (t) {
    return (
      (t.range = this.pastedRange),
      (this.pastedRange = null),
      (this.pasting = null),
      this.notifyEditorElement('paste', { paste: t })
    )
  }

  inputControllerWillMoveText () {
    return this.editor.recordUndoEntry('Move')
  }

  inputControllerWillAttachFiles () {
    return this.editor.recordUndoEntry('Drop Files')
  }

  inputControllerWillPerformUndo () {
    return this.editor.undo()
  }

  inputControllerWillPerformRedo () {
    return this.editor.redo()
  }

  inputControllerDidReceiveKeyboardCommand (t) {
    return this.toolbarController.applyKeyboardCommand(t)
  }

  inputControllerDidStartDrag () {
    this.locationRangeBeforeDrag = this.selectionManager.getLocationRange()
  }

  inputControllerDidReceiveDragOverPoint (t) {
    return this.selectionManager.setLocationRangeFromPointRange(t)
  }

  inputControllerDidCancelDrag () {
    this.selectionManager.setLocationRange(this.locationRangeBeforeDrag),
    (this.locationRangeBeforeDrag = null)
  }

  locationRangeDidChange (t) {
    return (
      this.composition.updateCurrentAttributes(),
      this.updateCurrentActions(),
      this.attachmentLocationRange &&
                !We(this.attachmentLocationRange, t) &&
                this.composition.stopEditingAttachment(),
      this.notifyEditorElement('selection-change')
    )
  }

  toolbarDidClickButton () {
    if (!this.getLocationRange()) {
      return this.setLocationRange({ index: 0, offset: 0 })
    }
  }

  toolbarDidInvokeAction (t, e) {
    return this.invokeAction(t, e)
  }

  toolbarDidToggleAttribute (t) {
    if (
      (this.recordFormattingUndoEntry(t),
      this.composition.toggleCurrentAttribute(t),
      this.render(),
      !this.selectionFrozen)
    ) {
      return this.editorElement.focus()
    }
  }

  toolbarDidUpdateAttribute (t, e) {
    if (
      (this.recordFormattingUndoEntry(t),
      this.composition.setCurrentAttribute(t, e),
      this.render(),
      !this.selectionFrozen)
    ) {
      return this.editorElement.focus()
    }
  }

  toolbarDidRemoveAttribute (t) {
    if (
      (this.recordFormattingUndoEntry(t),
      this.composition.removeCurrentAttribute(t),
      this.render(),
      !this.selectionFrozen)
    ) {
      return this.editorElement.focus()
    }
  }

  toolbarWillShowDialog (t) {
    return (
      this.composition.expandSelectionForEditing(), this.freezeSelection()
    )
  }

  toolbarDidShowDialog (t) {
    return this.notifyEditorElement('toolbar-dialog-show', {
      dialogName: t
    })
  }

  toolbarDidHideDialog (t) {
    return (
      this.thawSelection(),
      this.editorElement.focus(),
      this.notifyEditorElement('toolbar-dialog-hide', {
        dialogName: t
      })
    )
  }

  freezeSelection () {
    if (!this.selectionFrozen) {
      return (
        this.selectionManager.lock(),
        this.composition.freezeSelection(),
        (this.selectionFrozen = !0),
        this.render()
      )
    }
  }

  thawSelection () {
    if (this.selectionFrozen) {
      return (
        this.composition.thawSelection(),
        this.selectionManager.unlock(),
        (this.selectionFrozen = !1),
        this.render()
      )
    }
  }

  canInvokeAction (t) {
    return (
      !!this.actionIsExternal(t) ||
            !(
              (e = this.actions[t]) === null ||
                e === void 0 ||
                (e = e.test) === null ||
                e === void 0 ||
                !e.call(this)
            )
    )
    let e
  }

  invokeAction (t, e) {
    return this.actionIsExternal(t)
      ? this.notifyEditorElement('action-invoke', {
        actionName: t,
        invokingElement: e
      })
      : (n = this.actions[t]) === null ||
                n === void 0 ||
                (n = n.perform) === null ||
                n === void 0
          ? void 0
          : n.call(this)
    let n
  }

  actionIsExternal (t) {
    return /^x-./.test(t)
  }

  getCurrentActions () {
    const t = {}
    for (const e in this.actions) t[e] = this.canInvokeAction(e)
    return t
  }

  updateCurrentActions () {
    const t = this.getCurrentActions()
    if (!Zt(t, this.currentActions)) {
      return (
        (this.currentActions = t),
        this.toolbarController.updateActions(this.currentActions),
        this.notifyEditorElement('actions-change', {
          actions: this.currentActions
        })
      )
    }
  }

  runEditorFilters () {
    let t = this.composition.getSnapshot()
    if (
      (Array.from(this.editor.filters).forEach((r) => {
        const { document: o, selectedRange: s } = t;
        (t = r.call(this.editor, t) || {}),
        t.document || (t.document = o),
        t.selectedRange || (t.selectedRange = s)
      }),
      (e = t),
      (n = this.composition.getSnapshot()),
      !We(e.selectedRange, n.selectedRange) ||
                !e.document.isEqualTo(n.document))
    ) {
      return this.composition.loadSnapshot(t)
    }
    let e, n
  }

  updateInputElement () {
    const t = (function (e, n) {
      const r = Ns[n]
      if (r) return r(e)
      throw new Error('unknown content type: '.concat(n))
    })(this.compositionController.getSerializableElement(), 'text/html')
    return this.editorElement.setFormValue(t)
  }

  notifyEditorElement (t, e) {
    switch (t) {
      case 'document-change':
        this.documentChangedSinceLastRender = !0
        break
      case 'render':
        this.documentChangedSinceLastRender &&
                    ((this.documentChangedSinceLastRender = !1),
                    this.notifyEditorElement('change'))
        break
      case 'change':
      case 'attachment-add':
      case 'attachment-edit':
      case 'attachment-remove':
        this.updateInputElement()
    }
    return this.editorElement.notify(t, e)
  }

  removeAttachment (t) {
    return (
      this.editor.recordUndoEntry('Delete Attachment'),
      this.composition.removeAttachment(t),
      this.render()
    )
  }

  recordFormattingUndoEntry (t) {
    const e = L(t)
    const n = this.selectionManager.getLocationRange()
    if (e || !ut(n)) {
      return this.editor.recordUndoEntry('Formatting', {
        context: this.getUndoContext(),
        consolidatable: !0
      })
    }
  }

  recordTypingUndoEntry () {
    return this.editor.recordUndoEntry('Typing', {
      context: this.getUndoContext(this.currentAttributes),
      consolidatable: !0
    })
  }

  getUndoContext () {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) {
      e[n] = arguments[n]
    }
    return [
      this.getLocationContext(),
      this.getTimeContext(),
      ...Array.from(e)
    ]
  }

  getLocationContext () {
    const t = this.selectionManager.getLocationRange()
    return ut(t) ? t[0].index : t
  }

  getTimeContext () {
    return $n.interval > 0
      ? Math.floor(new Date().getTime() / $n.interval)
      : 0
  }

  isFocused () {
    let t
    return (
      this.editorElement ===
            ((t = this.editorElement.ownerDocument) === null || t === void 0
              ? void 0
              : t.activeElement)
    )
  }

  isFocusedInvisibly () {
    return this.isFocused() && !this.getLocationRange()
  }

  get actions () {
    return this.constructor.actions
  }
}
V(Lt, 'actions', {
  undo: {
    test () {
      return this.editor.canUndo()
    },
    perform () {
      return this.editor.undo()
    }
  },
  redo: {
    test () {
      return this.editor.canRedo()
    },
    perform () {
      return this.editor.redo()
    }
  },
  link: {
    test () {
      return this.editor.canActivateAttribute('href')
    }
  },
  increaseNestingLevel: {
    test () {
      return this.editor.canIncreaseNestingLevel()
    },
    perform () {
      return this.editor.increaseNestingLevel() && this.render()
    }
  },
  decreaseNestingLevel: {
    test () {
      return this.editor.canDecreaseNestingLevel()
    },
    perform () {
      return this.editor.decreaseNestingLevel() && this.render()
    }
  },
  attachFiles: {
    test: () => !0,
    perform () {
      return bi.pickFiles(this.editor.insertFiles)
    }
  }
}),
Lt.proxyMethod('getSelectionManager().setLocationRange'),
Lt.proxyMethod('getSelectionManager().getLocationRange')
const na = Object.freeze({
  __proto__: null,
  AttachmentEditorController: tn,
  CompositionController: en,
  Controller: nn,
  EditorController: Lt,
  InputController: $t,
  Level0InputController: $,
  Level2InputController: wt,
  ToolbarController: sn
})
const ia = Object.freeze({
  __proto__: null,
  MutationObserver: rn,
  SelectionChangeObserver: Ue
})
const ra = Object.freeze({
  __proto__: null,
  FileVerificationOperation: on,
  ImagePreloadOperation: Ke
})
Pr(
  'trix-toolbar',
    `%t {
  display: block;
}

%t {
  white-space: nowrap;
}

%t [data-trix-dialog] {
  display: none;
}

%t [data-trix-dialog][data-trix-active] {
  display: block;
}

%t [data-trix-dialog] [data-trix-validate]:invalid {
  background-color: #ffdddd;
}`
)
const an = class extends HTMLElement {
  connectedCallback () {
    this.innerHTML === '' && (this.innerHTML = Fr.getDefaultHTML())
  }
}
let oa = 0
const sa = function (i) {
  if (!i.hasAttribute('contenteditable')) {
    return (
      i.setAttribute('contenteditable', ''),
      (function (t) {
        const e =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : {}
        return (e.times = 1), S(t, e)
      })('focus', { onElement: i, withCallback: () => aa(i) })
    )
  }
}
var aa = function (i) {
  return la(i), ca(i)
}
var la = function (i) {
  let t, e
  if (
    (t = (e = document).queryCommandSupported) !== null &&
        t !== void 0 &&
        t.call(e, 'enableObjectResizing')
  ) {
    return (
      document.execCommand('enableObjectResizing', !1, !1),
      S('mscontrolselect', {
        onElement: i,
        preventDefault: !0
      })
    )
  }
}
var ca = function (i) {
  let t, e
  if (
    (t = (e = document).queryCommandSupported) !== null &&
        t !== void 0 &&
        t.call(e, 'DefaultParagraphSeparator')
  ) {
    const { tagName: n } = U.default
    if (['div', 'p'].includes(n)) {
      return document.execCommand('DefaultParagraphSeparator', !1, n)
    }
  }
}
const wr = xe.forcesObjectResizing
  ? { display: 'inline', width: 'auto' }
  : { display: 'inline-block', width: '1px' }
Pr(
  'trix-editor',
    `%t {
    display: block;
}

%t:empty::before {
    content: attr(placeholder);
    color: graytext;
    cursor: text;
    pointer-events: none;
    white-space: pre-line;
}

%t a[contenteditable=false] {
    cursor: text;
}

%t img {
    max-width: 100%;
    height: auto;
}

%t `
      .concat(
        Rt,
            ` figcaption textarea {
    resize: none;
}

%t `
      )
      .concat(
        Rt,
            ` figcaption textarea.trix-autoresize-clone {
    position: absolute;
    left: -9999px;
    max-height: 0px;
}

%t `
      )
      .concat(
        Rt,
            ` figcaption[data-trix-placeholder]:empty::before {
    content: attr(data-trix-placeholder);
    color: graytext;
}

%t [data-trix-cursor-target] {
    display: `
      )
      .concat(
        wr.display,
            ` !important;
    width: `
      )
      .concat(
        wr.width,
            ` !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
}

%t [data-trix-cursor-target=left] {
    vertical-align: top !important;
    margin-left: -1px !important;
}

%t [data-trix-cursor-target=right] {
    vertical-align: bottom !important;
    margin-right: -1px !important;
}`
      )
)
const lt = new WeakMap()
const ue = new WeakSet()
const di = class {
  constructor (t) {
    let e, n
    Jr((e = this), (n = ue)),
    n.add(e),
    fe(this, lt, {
      writable: !0,
      value: void 0
    }),
    (this.element = t),
    Ci(this, lt, t.attachInternals())
  }

  connectedCallback () {
    Fe(this, ue, Pe).call(this)
  }

  disconnectedCallback () {}

  get labels () {
    return x(this, lt).labels
  }

  get disabled () {
    let t
    return (t = this.element.inputElement) === null || t === void 0
      ? void 0
      : t.disabled
  }

  set disabled (t) {
    this.element.toggleAttribute('disabled', t)
  }

  get required () {
    return this.element.hasAttribute('required')
  }

  set required (t) {
    this.element.toggleAttribute('required', t),
    Fe(this, ue, Pe).call(this)
  }

  get validity () {
    return x(this, lt).validity
  }

  get validationMessage () {
    return x(this, lt).validationMessage
  }

  get willValidate () {
    return x(this, lt).willValidate
  }

  setFormValue (t) {
    Fe(this, ue, Pe).call(this)
  }

  checkValidity () {
    return x(this, lt).checkValidity()
  }

  reportValidity () {
    return x(this, lt).reportValidity()
  }

  setCustomValidity (t) {
    Fe(this, ue, Pe).call(this, t)
  }
}

function Pe () {
  const i =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ''
  const { required: t, value: e } = this.element
  const n = t && !e
  const r = !!i
  const o = p('input', { required: t })
  const s = i || o.validationMessage
  x(this, lt).setValidity({ valueMissing: n, customError: r }, s)
}

const Kn = new WeakMap()
const Gn = new WeakMap()
const Yn = new WeakMap()
const gi = class {
  constructor (t) {
    fe(this, Kn, { writable: !0, value: void 0 }),
    fe(this, Gn, {
      writable: !0,
      value: (e) => {
        e.defaultPrevented ||
                        (e.target === this.element.form &&
                            this.element.reset())
      }
    }),
    fe(this, Yn, {
      writable: !0,
      value: (e) => {
        if (e.defaultPrevented || this.element.contains(e.target)) {
          return
        }
        const n = vt(e.target, { matchingSelector: 'label' })
        n &&
                        Array.from(this.labels).includes(n) &&
                        this.element.focus()
      }
    }),
    (this.element = t)
  }

  connectedCallback () {
    Ci(
      this,
      Kn,
      (function (t) {
        if (
          t.hasAttribute('aria-label') ||
                    t.hasAttribute('aria-labelledby')
        ) {
          return
        }
        const e = function () {
          const n = Array.from(t.labels)
            .map((o) => {
              if (!o.contains(t)) return o.textContent
            })
            .filter((o) => o)
          const r = n.join(' ')
          return r
            ? t.setAttribute('aria-label', r)
            : t.removeAttribute('aria-label')
        }
        return e(), S('focus', { onElement: t, withCallback: e })
      })(this.element)
    ),
    window.addEventListener('reset', x(this, Gn), !1),
    window.addEventListener('click', x(this, Yn), !1)
  }

  disconnectedCallback () {
    let t;
    (t = x(this, Kn)) === null || t === void 0 || t.destroy(),
    window.removeEventListener('reset', x(this, Gn), !1),
    window.removeEventListener('click', x(this, Yn), !1)
  }

  get labels () {
    const t = []
    this.element.id &&
            this.element.ownerDocument &&
            t.push(
              ...Array.from(
                this.element.ownerDocument.querySelectorAll(
                  "label[for='".concat(this.element.id, "']")
                ) || []
              )
            )
    const e = vt(this.element, { matchingSelector: 'label' })
    return e && [this.element, null].includes(e.control) && t.push(e), t
  }

  get disabled () {
    return (
      console.warn(
        'This browser does not support the [disabled] attribute for trix-editor elements.'
      ),
      !1
    )
  }

  set disabled (t) {
    console.warn(
      'This browser does not support the [disabled] attribute for trix-editor elements.'
    )
  }

  get required () {
    return (
      console.warn(
        'This browser does not support the [required] attribute for trix-editor elements.'
      ),
      !1
    )
  }

  set required (t) {
    console.warn(
      'This browser does not support the [required] attribute for trix-editor elements.'
    )
  }

  get validity () {
    return (
      console.warn(
        'This browser does not support the validity property for trix-editor elements.'
      ),
      null
    )
  }

  get validationMessage () {
    return (
      console.warn(
        'This browser does not support the validationMessage property for trix-editor elements.'
      ),
      ''
    )
  }

  get willValidate () {
    return (
      console.warn(
        'This browser does not support the willValidate property for trix-editor elements.'
      ),
      !1
    )
  }

  setFormValue (t) {}

  checkValidity () {
    return (
      console.warn(
        'This browser does not support checkValidity() for trix-editor elements.'
      ),
      !0
    )
  }

  reportValidity () {
    return (
      console.warn(
        'This browser does not support reportValidity() for trix-editor elements.'
      ),
      !0
    )
  }

  setCustomValidity (t) {
    console.warn(
      'This browser does not support setCustomValidity(validationMessage) for trix-editor elements.'
    )
  }
}
const P = new WeakMap()
const Xt = class extends HTMLElement {
  constructor () {
    super(),
    fe(this, P, {
      writable: !0,
      value: void 0
    }),
    Ci(
      this,
      P,
      this.constructor.formAssociated ? new di(this) : new gi(this)
    )
  }

  get trixId () {
    return this.hasAttribute('trix-id')
      ? this.getAttribute('trix-id')
      : (this.setAttribute('trix-id', ++oa), this.trixId)
  }

  get labels () {
    return x(this, P).labels
  }

  get disabled () {
    return x(this, P).disabled
  }

  set disabled (t) {
    x(this, P).disabled = t
  }

  get required () {
    return x(this, P).required
  }

  set required (t) {
    x(this, P).required = t
  }

  get validity () {
    return x(this, P).validity
  }

  get validationMessage () {
    return x(this, P).validationMessage
  }

  get willValidate () {
    return x(this, P).willValidate
  }

  get type () {
    return this.localName
  }

  get toolbarElement () {
    let t
    if (this.hasAttribute('toolbar')) {
      return (t = this.ownerDocument) === null || t === void 0
        ? void 0
        : t.getElementById(this.getAttribute('toolbar'))
    }
    if (this.parentNode) {
      const e = 'trix-toolbar-'.concat(this.trixId)
      return (
        this.setAttribute('toolbar', e),
        (this.internalToolbar = p('trix-toolbar', { id: e })),
        this.parentNode.insertBefore(this.internalToolbar, this),
        this.internalToolbar
      )
    }
  }

  get form () {
    let t
    return (t = this.inputElement) === null || t === void 0
      ? void 0
      : t.form
  }

  get inputElement () {
    let t
    if (this.hasAttribute('input')) {
      return (t = this.ownerDocument) === null || t === void 0
        ? void 0
        : t.getElementById(this.getAttribute('input'))
    }
    if (this.parentNode) {
      const e = 'trix-input-'.concat(this.trixId)
      this.setAttribute('input', e)
      const n = p('input', { type: 'hidden', id: e })
      return this.parentNode.insertBefore(n, this.nextElementSibling), n
    }
  }

  get editor () {
    let t
    return (t = this.editorController) === null || t === void 0
      ? void 0
      : t.editor
  }

  get name () {
    let t
    return (t = this.inputElement) === null || t === void 0
      ? void 0
      : t.name
  }

  get value () {
    let t
    return (t = this.inputElement) === null || t === void 0
      ? void 0
      : t.value
  }

  set value (t) {
    let e;
    (this.defaultValue = t),
    (e = this.editor) === null ||
                e === void 0 ||
                e.loadHTML(this.defaultValue)
  }

  attributeChangedCallback (t, e, n) {
    t === 'connected' &&
            this.isConnected &&
            e != null &&
            e !== n &&
            requestAnimationFrame(() => this.reconnect())
  }

  notify (t, e) {
    if (this.editorController) {
      return de('trix-'.concat(t), {
        onElement: this,
        attributes: e
      })
    }
  }

  setFormValue (t) {
    this.inputElement &&
            ((this.inputElement.value = t), x(this, P).setFormValue(t))
  }

  connectedCallback () {
    this.hasAttribute('data-trix-internal') ||
            (sa(this),
            (function (t) {
              t.hasAttribute('role') || t.setAttribute('role', 'textbox')
            })(this),
            this.editorController ||
                (de('trix-before-initialize', { onElement: this }),
                (this.editorController = new Lt({
                  editorElement: this,
                  html: (this.defaultValue = this.value)
                })),
                requestAnimationFrame(() =>
                  de('trix-initialize', { onElement: this })
                )),
            this.editorController.registerSelectionManager(),
            x(this, P).connectedCallback(),
            this.toggleAttribute('connected', !0),
            (function (t) {
              !document.querySelector(':focus') &&
                    t.hasAttribute('autofocus') &&
                    document.querySelector('[autofocus]') === t &&
                    t.focus()
            })(this))
  }

  disconnectedCallback () {
    let t;
    (t = this.editorController) === null ||
            t === void 0 ||
            t.unregisterSelectionManager(),
    x(this, P).disconnectedCallback(),
    this.toggleAttribute('connected', !1)
  }

  reconnect () {
    this.removeInternalToolbar(),
    this.disconnectedCallback(),
    this.connectedCallback()
  }

  removeInternalToolbar () {
    let t;
    (t = this.internalToolbar) === null || t === void 0 || t.remove(),
    (this.internalToolbar = null)
  }

  checkValidity () {
    return x(this, P).checkValidity()
  }

  reportValidity () {
    return x(this, P).reportValidity()
  }

  setCustomValidity (t) {
    x(this, P).setCustomValidity(t)
  }

  formDisabledCallback (t) {
    this.inputElement && (this.inputElement.disabled = t),
    this.toggleAttribute('contenteditable', !t)
  }

  formResetCallback () {
    this.reset()
  }

  reset () {
    this.value = this.defaultValue
  }
}
V(Xt, 'formAssociated', 'ElementInternals' in window),
V(Xt, 'observedAttributes', ['connected'])
const Z = {
  VERSION: po,
  config: Ce,
  core: Is,
  models: Xr,
  views: Bs,
  controllers: na,
  observers: ia,
  operations: ra,
  elements: Object.freeze({
    __proto__: null,
    TrixEditorElement: Xt,
    TrixToolbarElement: an
  }),
  filters: Object.freeze({
    __proto__: null,
    Filter: $e,
    attachmentGalleryFilter: Yr
  })
}
Object.assign(Z, Xr),
(window.Trix = Z),
setTimeout(function () {
  customElements.get('trix-toolbar') ||
            customElements.define('trix-toolbar', an),
  customElements.get('trix-editor') ||
                customElements.define('trix-editor', Xt)
}, 0)
Z.config.blockAttributes.default.tagName = 'p'
Z.config.blockAttributes.default.breakOnReturn = !0
Z.config.blockAttributes.heading = {
  tagName: 'h2',
  terminal: !0,
  breakOnReturn: !0,
  group: !1
}
Z.config.blockAttributes.subHeading = {
  tagName: 'h3',
  terminal: !0,
  breakOnReturn: !0,
  group: !1
}
Z.config.textAttributes.underline = {
  style: { textDecoration: 'underline' },
  inheritable: !0,
  parser: (i) =>
    window.getComputedStyle(i).textDecoration.includes('underline')
}
Z.Block.prototype.breaksOnReturn = function () {
  const i = this.getLastAttribute()
  return Z.config.blockAttributes[i || 'default']?.breakOnReturn ?? !1
}
Z.LineBreakInsertion.prototype.shouldInsertBlockBreak = function () {
  return this.block.hasAttributes() &&
        this.block.isListItem() &&
        !this.block.isEmpty()
    ? this.startLocation.offset > 0
    : this.shouldBreakFormattedBlock()
      ? !1
      : this.breaksOnReturn
}

function ua ({ state: i }) {
  return {
    state: i,
    init: function () {
      (this.$refs.trixValue.value = this.state),
      this.$refs.trix.editor?.loadHTML(this.state ?? ''),
      this.$watch('state', () => {
        document.activeElement !== this.$refs.trix &&
                        ((this.$refs.trixValue.value = this.state),
                        this.$refs.trix.editor?.loadHTML(this.state ?? ''))
      })
    }
  }
}

export { ua as default }
/*! Bundled license information:

trix/dist/trix.esm.min.js:
  (*! @license DOMPurify 3.2.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.5/LICENSE *)
*/
