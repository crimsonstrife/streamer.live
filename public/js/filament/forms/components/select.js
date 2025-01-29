const lt = Object.create
const Ge = Object.defineProperty
const ct = Object.getOwnPropertyDescriptor
const ut = Object.getOwnPropertyNames
const ht = Object.getPrototypeOf
const dt = Object.prototype.hasOwnProperty
const ft = (se, ie) => () => (
  ie || se((ie = { exports: {} }).exports, ie), ie.exports
)
const pt = (se, ie, X, me) => {
  if ((ie && typeof ie === 'object') || typeof ie === 'function') {
    for (const j of ut(ie)) {
      !dt.call(se, j) &&
                j !== X &&
                Ge(se, j, {
                  get: () => ie[j],
                  enumerable: !(me = ct(ie, j)) || me.enumerable
                })
    }
  }
  return se
}
const mt = (se, ie, X) => (
  (X = se != null ? lt(ht(se)) : {}),
  pt(
    ie || !se || !se.__esModule
      ? Ge(X, 'default', { value: se, enumerable: !0 })
      : X,
    se
  )
)
const $e = ft((Ae, Ye) => {
  (function (ie, X) {
    typeof Ae === 'object' && typeof Ye === 'object'
      ? (Ye.exports = X())
      : typeof define === 'function' && define.amd
        ? define([], X)
        : typeof Ae === 'object'
          ? (Ae.Choices = X())
          : (ie.Choices = X())
  })(window, function () {
    return (function () {
      'use strict'
      const se = {
        282: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.clearChoices =
                            i.activateChoices =
                            i.filterChoices =
                            i.addChoice =
                                void 0)
          const _ = b(883)
          const h = function (c) {
            const l = c.value
            const O = c.label
            const L = c.id
            const y = c.groupId
            const D = c.disabled
            const k = c.elementId
            const Q = c.customProperties
            const Z = c.placeholder
            const ne = c.keyCode
            return {
              type: _.ACTION_TYPES.ADD_CHOICE,
              value: l,
              label: O,
              id: L,
              groupId: y,
              disabled: D,
              elementId: k,
              customProperties: Q,
              placeholder: Z,
              keyCode: ne
            }
          }
          i.addChoice = h
          const d = function (c) {
            return {
              type: _.ACTION_TYPES.FILTER_CHOICES,
              results: c
            }
          }
          i.filterChoices = d
          const a = function (c) {
            return (
              c === void 0 && (c = !0),
              {
                type: _.ACTION_TYPES.ACTIVATE_CHOICES,
                active: c
              }
            )
          }
          i.activateChoices = a
          const r = function () {
            return { type: _.ACTION_TYPES.CLEAR_CHOICES }
          }
          i.clearChoices = r
        },
        783: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.addGroup = void 0)
          const _ = b(883)
          const h = function (d) {
            const a = d.value
            const r = d.id
            const c = d.active
            const l = d.disabled
            return {
              type: _.ACTION_TYPES.ADD_GROUP,
              value: a,
              id: r,
              active: c,
              disabled: l
            }
          }
          i.addGroup = h
        },
        464: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.highlightItem = i.removeItem = i.addItem = void 0)
          const _ = b(883)
          const h = function (r) {
            const c = r.value
            const l = r.label
            const O = r.id
            const L = r.choiceId
            const y = r.groupId
            const D = r.customProperties
            const k = r.placeholder
            const Q = r.keyCode
            return {
              type: _.ACTION_TYPES.ADD_ITEM,
              value: c,
              label: l,
              id: O,
              choiceId: L,
              groupId: y,
              customProperties: D,
              placeholder: k,
              keyCode: Q
            }
          }
          i.addItem = h
          const d = function (r, c) {
            return {
              type: _.ACTION_TYPES.REMOVE_ITEM,
              id: r,
              choiceId: c
            }
          }
          i.removeItem = d
          const a = function (r, c) {
            return {
              type: _.ACTION_TYPES.HIGHLIGHT_ITEM,
              id: r,
              highlighted: c
            }
          }
          i.highlightItem = a
        },
        137: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.setIsLoading = i.resetTo = i.clearAll = void 0)
          const _ = b(883)
          const h = function () {
            return { type: _.ACTION_TYPES.CLEAR_ALL }
          }
          i.clearAll = h
          const d = function (r) {
            return { type: _.ACTION_TYPES.RESET_TO, state: r }
          }
          i.resetTo = d
          const a = function (r) {
            return {
              type: _.ACTION_TYPES.SET_IS_LOADING,
              isLoading: r
            }
          }
          i.setIsLoading = a
        },
        373: function (j, i, b) {
          const _ =
                        (this && this.__spreadArray) ||
                        function (g, e, t) {
                          if (t || arguments.length === 2) {
                            for (var n = 0, s = e.length, v; n < s; n++) {
                              (v || !(n in e)) &&
                                        (v ||
                                            (v = Array.prototype.slice.call(
                                              e,
                                              0,
                                              n
                                            )),
                                        (v[n] = e[n]))
                            }
                          }
                          return g.concat(v || Array.prototype.slice.call(e))
                        }
          const h =
                        (this && this.__importDefault) ||
                        function (g) {
                          return g && g.__esModule ? g : { default: g }
                        }
          Object.defineProperty(i, '__esModule', { value: !0 })
          const d = h(b(996))
          const a = h(b(221))
          const r = b(282)
          const c = b(783)
          const l = b(464)
          const O = b(137)
          const L = b(520)
          const y = b(883)
          const D = b(789)
          const k = b(799)
          const Q = b(655)
          const Z = h(b(744))
          const ne = h(b(686))
          const E =
                        '-ms-scroll-limit' in document.documentElement.style &&
                        '-ms-ime-align' in document.documentElement.style
          const w = {}
          const N = (function () {
            function g (e, t) {
              e === void 0 && (e = '[data-choice]'),
              t === void 0 && (t = {})
              const n = this
              t.allowHTML === void 0 &&
                                console.warn(
                                  'Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message.'
                                ),
              (this.config = d.default.all(
                [D.DEFAULT_CONFIG, g.defaults.options, t],
                {
                  arrayMerge: function (u, C) {
                    return _([], C, !0)
                  }
                }
              ))
              const s = (0, k.diff)(
                this.config,
                D.DEFAULT_CONFIG
              )
              s.length &&
                                console.warn(
                                  'Unknown config option(s) passed',
                                  s.join(', ')
                                )
              const v =
                                typeof e === 'string'
                                  ? document.querySelector(e)
                                  : e
              if (
                !(
                  v instanceof HTMLInputElement ||
                                    v instanceof HTMLSelectElement
                )
              ) {
                throw TypeError(
                  'Expected one of the following types text|select-one|select-multiple'
                )
              }
              if (
                ((this._isTextElement = v.type === y.TEXT_TYPE),
                (this._isSelectOneElement =
                                    v.type === y.SELECT_ONE_TYPE),
                (this._isSelectMultipleElement =
                                    v.type === y.SELECT_MULTIPLE_TYPE),
                (this._isSelectElement =
                                    this._isSelectOneElement ||
                                    this._isSelectMultipleElement),
                (this.config.searchEnabled =
                                    this._isSelectMultipleElement ||
                                    this.config.searchEnabled),
                ['auto', 'always'].includes(
                  ''.concat(
                    this.config.renderSelectedChoices
                  )
                ) ||
                                    (this.config.renderSelectedChoices =
                                        'auto'),
                t.addItemFilter &&
                                    typeof t.addItemFilter !== 'function')
              ) {
                const P =
                                    t.addItemFilter instanceof RegExp
                                      ? t.addItemFilter
                                      : new RegExp(t.addItemFilter)
                this.config.addItemFilter = P.test.bind(P)
              }
              if (
                (this._isTextElement
                  ? (this.passedElement = new L.WrappedInput({
                      element: v,
                      classNames: this.config.classNames,
                      delimiter: this.config.delimiter
                    }))
                  : (this.passedElement = new L.WrappedSelect(
                      {
                        element: v,
                        classNames:
                                                  this.config.classNames,
                        template: function (u) {
                          return n._templates.option(u)
                        }
                      }
                    )),
                (this.initialised = !1),
                (this._store = new Z.default()),
                (this._initialState = Q.defaultState),
                (this._currentState = Q.defaultState),
                (this._prevState = Q.defaultState),
                (this._currentValue = ''),
                (this._canSearch = !!this.config.searchEnabled),
                (this._isScrollingOnIe = !1),
                (this._highlightPosition = 0),
                (this._wasTap = !0),
                (this._placeholderValue =
                                    this._generatePlaceholderValue()),
                (this._baseId = (0, k.generateId)(
                  this.passedElement.element,
                  'choices-'
                )),
                (this._direction = this.passedElement.dir),
                !this._direction)
              ) {
                const M = window.getComputedStyle(
                  this.passedElement.element
                ).direction
                const K = window.getComputedStyle(
                  document.documentElement
                ).direction
                M !== K && (this._direction = M)
              }
              if (
                ((this._idNames = {
                  itemChoice: 'item-choice'
                }),
                this._isSelectElement &&
                                    ((this._presetGroups =
                                        this.passedElement.optionGroups),
                                    (this._presetOptions =
                                        this.passedElement.options)),
                (this._presetChoices = this.config.choices),
                (this._presetItems = this.config.items),
                this.passedElement.value && this._isTextElement)
              ) {
                const f = this.passedElement.value.split(
                  this.config.delimiter
                )
                this._presetItems = this._presetItems.concat(f)
              }
              if (
                (this.passedElement.options &&
                                    this.passedElement.options.forEach(
                                      function (u) {
                                        n._presetChoices.push({
                                          value: u.value,
                                          label: u.innerHTML,
                                          selected: !!u.selected,
                                          disabled:
                                                    u.disabled ||
                                                    u.parentNode.disabled,
                                          placeholder:
                                                    u.value === '' ||
                                                    u.hasAttribute(
                                                      'placeholder'
                                                    ),
                                          customProperties: (0,
                                          k.parseCustomProperties)(
                                            u.dataset.customProperties
                                          )
                                        })
                                      }
                                    ),
                (this._render = this._render.bind(this)),
                (this._onFocus = this._onFocus.bind(this)),
                (this._onBlur = this._onBlur.bind(this)),
                (this._onKeyUp = this._onKeyUp.bind(this)),
                (this._onKeyDown = this._onKeyDown.bind(this)),
                (this._onClick = this._onClick.bind(this)),
                (this._onTouchMove =
                                    this._onTouchMove.bind(this)),
                (this._onTouchEnd =
                                    this._onTouchEnd.bind(this)),
                (this._onMouseDown =
                                    this._onMouseDown.bind(this)),
                (this._onMouseOver =
                                    this._onMouseOver.bind(this)),
                (this._onFormReset =
                                    this._onFormReset.bind(this)),
                (this._onSelectKey =
                                    this._onSelectKey.bind(this)),
                (this._onEnterKey =
                                    this._onEnterKey.bind(this)),
                (this._onEscapeKey =
                                    this._onEscapeKey.bind(this)),
                (this._onDirectionKey =
                                    this._onDirectionKey.bind(this)),
                (this._onDeleteKey =
                                    this._onDeleteKey.bind(this)),
                this.passedElement.isActive)
              ) {
                this.config.silent ||
                                    console.warn(
                                      'Trying to initialise Choices on element already initialised',
                                      { element: e }
                                    ),
                (this.initialised = !0)
                return
              }
              this.init()
            }
            return (
              Object.defineProperty(g, 'defaults', {
                get: function () {
                  return Object.preventExtensions({
                    get options () {
                      return w
                    },
                    get templates () {
                      return ne.default
                    }
                  })
                },
                enumerable: !1,
                configurable: !0
              }),
              (g.prototype.init = function () {
                if (!this.initialised) {
                  this._createTemplates(),
                  this._createElements(),
                  this._createStructure(),
                  this._store.subscribe(this._render),
                  this._render(),
                  this._addEventListeners()
                  const e =
                                        !this.config.addItems ||
                                        this.passedElement.element.hasAttribute(
                                          'disabled'
                                        )
                  e && this.disable(),
                  (this.initialised = !0)
                  const t = this.config.callbackOnInit
                  t &&
                                        typeof t === 'function' &&
                                        t.call(this)
                }
              }),
              (g.prototype.destroy = function () {
                this.initialised &&
                                    (this._removeEventListeners(),
                                    this.passedElement.reveal(),
                                    this.containerOuter.unwrap(
                                      this.passedElement.element
                                    ),
                                    this.clearStore(),
                                    this._isSelectElement &&
                                        (this.passedElement.options =
                                            this._presetOptions),
                                    (this._templates = ne.default),
                                    (this.initialised = !1))
              }),
              (g.prototype.enable = function () {
                return (
                  this.passedElement.isDisabled &&
                                        this.passedElement.enable(),
                  this.containerOuter.isDisabled &&
                                        (this._addEventListeners(),
                                        this.input.enable(),
                                        this.containerOuter.enable()),
                  this
                )
              }),
              (g.prototype.disable = function () {
                return (
                  this.passedElement.isDisabled ||
                                        this.passedElement.disable(),
                  this.containerOuter.isDisabled ||
                                        (this._removeEventListeners(),
                                        this.input.disable(),
                                        this.containerOuter.disable()),
                  this
                )
              }),
              (g.prototype.highlightItem = function (e, t) {
                if ((t === void 0 && (t = !0), !e || !e.id)) {
                  return this
                }
                const n = e.id
                const s = e.groupId
                const v = s === void 0 ? -1 : s
                const P = e.value
                const M = P === void 0 ? '' : P
                const K = e.label
                const f = K === void 0 ? '' : K
                const u =
                                    v >= 0 ? this._store.getGroupById(v) : null
                return (
                  this._store.dispatch(
                    (0, l.highlightItem)(n, !0)
                  ),
                  t &&
                                        this.passedElement.triggerEvent(
                                          y.EVENTS.highlightItem,
                                          {
                                            id: n,
                                            value: M,
                                            label: f,
                                            groupValue:
                                                    u && u.value
                                                      ? u.value
                                                      : null
                                          }
                                        ),
                  this
                )
              }),
              (g.prototype.unhighlightItem = function (e) {
                if (!e || !e.id) return this
                const t = e.id
                const n = e.groupId
                const s = n === void 0 ? -1 : n
                const v = e.value
                const P = v === void 0 ? '' : v
                const M = e.label
                const K = M === void 0 ? '' : M
                const f =
                                    s >= 0 ? this._store.getGroupById(s) : null
                return (
                  this._store.dispatch(
                    (0, l.highlightItem)(t, !1)
                  ),
                  this.passedElement.triggerEvent(
                    y.EVENTS.highlightItem,
                    {
                      id: t,
                      value: P,
                      label: K,
                      groupValue:
                                                f && f.value ? f.value : null
                    }
                  ),
                  this
                )
              }),
              (g.prototype.highlightAll = function () {
                const e = this
                return (
                  this._store.items.forEach(function (t) {
                    return e.highlightItem(t)
                  }),
                  this
                )
              }),
              (g.prototype.unhighlightAll = function () {
                const e = this
                return (
                  this._store.items.forEach(function (t) {
                    return e.unhighlightItem(t)
                  }),
                  this
                )
              }),
              (g.prototype.removeActiveItemsByValue = function (
                e
              ) {
                const t = this
                return (
                  this._store.activeItems
                    .filter(function (n) {
                      return n.value === e
                    })
                    .forEach(function (n) {
                      return t._removeItem(n)
                    }),
                  this
                )
              }),
              (g.prototype.removeActiveItems = function (e) {
                const t = this
                return (
                  this._store.activeItems
                    .filter(function (n) {
                      const s = n.id
                      return s !== e
                    })
                    .forEach(function (n) {
                      return t._removeItem(n)
                    }),
                  this
                )
              }),
              (g.prototype.removeHighlightedItems = function (e) {
                const t = this
                return (
                  e === void 0 && (e = !1),
                  this._store.highlightedActiveItems.forEach(
                    function (n) {
                      t._removeItem(n),
                      e && t._triggerChange(n.value)
                    }
                  ),
                  this
                )
              }),
              (g.prototype.showDropdown = function (e) {
                const t = this
                return this.dropdown.isActive
                  ? this
                  : (requestAnimationFrame(function () {
                      t.dropdown.show(),
                      t.containerOuter.open(
                        t.dropdown
                          .distanceFromTopWindow
                      ),
                      !e &&
                                                  t._canSearch &&
                                                  t.input.focus(),
                      t.passedElement.triggerEvent(
                        y.EVENTS.showDropdown,
                        {}
                      )
                    }),
                    this)
              }),
              (g.prototype.hideDropdown = function (e) {
                const t = this
                return this.dropdown.isActive
                  ? (requestAnimationFrame(function () {
                      t.dropdown.hide(),
                      t.containerOuter.close(),
                      !e &&
                                                  t._canSearch &&
                                                  (t.input.removeActiveDescendant(),
                                                  t.input.blur()),
                      t.passedElement.triggerEvent(
                        y.EVENTS.hideDropdown,
                        {}
                      )
                    }),
                    this)
                  : this
              }),
              (g.prototype.getValue = function (e) {
                e === void 0 && (e = !1)
                const t = this._store.activeItems.reduce(
                  function (n, s) {
                    const v = e ? s.value : s
                    return n.push(v), n
                  },
                  []
                )
                return this._isSelectOneElement ? t[0] : t
              }),
              (g.prototype.setValue = function (e) {
                const t = this
                return this.initialised
                  ? (e.forEach(function (n) {
                      return t._setChoiceOrItem(n)
                    }),
                    this)
                  : this
              }),
              (g.prototype.setChoiceByValue = function (e) {
                const t = this
                if (!this.initialised || this._isTextElement) {
                  return this
                }
                const n = Array.isArray(e) ? e : [e]
                return (
                  n.forEach(function (s) {
                    return t._findAndSelectChoiceByValue(s)
                  }),
                  this
                )
              }),
              (g.prototype.setChoices = function (e, t, n, s) {
                const v = this
                if (
                  (e === void 0 && (e = []),
                  t === void 0 && (t = 'value'),
                  n === void 0 && (n = 'label'),
                  s === void 0 && (s = !1),
                  !this.initialised)
                ) {
                  throw new ReferenceError(
                    'setChoices was called on a non-initialized instance of Choices'
                  )
                }
                if (!this._isSelectElement) {
                  throw new TypeError(
                    "setChoices can't be used with INPUT based Choices"
                  )
                }
                if (typeof t !== 'string' || !t) {
                  throw new TypeError(
                    "value parameter must be a name of 'value' field in passed objects"
                  )
                }
                if (
                  (s && this.clearChoices(),
                  typeof e === 'function')
                ) {
                  const P = e(this)
                  if (
                    typeof Promise === 'function' &&
                                        P instanceof Promise
                  ) {
                    return new Promise(function (M) {
                      return requestAnimationFrame(M)
                    })
                      .then(function () {
                        return v._handleLoadingState(
                          !0
                        )
                      })
                      .then(function () {
                        return P
                      })
                      .then(function (M) {
                        return v.setChoices(M, t, n, s)
                      })
                      .catch(function (M) {
                        v.config.silent ||
                                                    console.error(M)
                      })
                      .then(function () {
                        return v._handleLoadingState(
                          !1
                        )
                      })
                      .then(function () {
                        return v
                      })
                  }
                  if (!Array.isArray(P)) {
                    throw new TypeError(
                      '.setChoices first argument function must return either array of choices or Promise, got: '.concat(
                        typeof P
                      )
                    )
                  }
                  return this.setChoices(P, t, n, !1)
                }
                if (!Array.isArray(e)) {
                  throw new TypeError(
                    '.setChoices must be called either with array of choices with a function resulting into Promise of array of choices'
                  )
                }
                return (
                  this.containerOuter.removeLoadingState(),
                  this._startLoading(),
                  e.forEach(function (M) {
                    if (M.choices) {
                      v._addGroup({
                        id: M.id
                          ? parseInt(
                            ''.concat(M.id),
                            10
                          )
                          : null,
                        group: M,
                        valueKey: t,
                        labelKey: n
                      })
                    } else {
                      const K = M
                      v._addChoice({
                        value: K[t],
                        label: K[n],
                        isSelected: !!K.selected,
                        isDisabled: !!K.disabled,
                        placeholder: !!K.placeholder,
                        customProperties:
                                                    K.customProperties
                      })
                    }
                  }),
                  this._stopLoading(),
                  this
                )
              }),
              (g.prototype.clearChoices = function () {
                return (
                  this._store.dispatch((0, r.clearChoices)()),
                  this
                )
              }),
              (g.prototype.clearStore = function () {
                return (
                  this._store.dispatch((0, O.clearAll)()),
                  this
                )
              }),
              (g.prototype.clearInput = function () {
                const e = !this._isSelectOneElement
                return (
                  this.input.clear(e),
                  !this._isTextElement &&
                                        this._canSearch &&
                                        ((this._isSearching = !1),
                                        this._store.dispatch(
                                          (0, r.activateChoices)(!0)
                                        )),
                  this
                )
              }),
              (g.prototype._render = function () {
                if (!this._store.isLoading()) {
                  this._currentState = this._store.state
                  const e =
                                        this._currentState.choices !==
                                            this._prevState.choices ||
                                        this._currentState.groups !==
                                            this._prevState.groups ||
                                        this._currentState.items !==
                                            this._prevState.items
                  const t = this._isSelectElement
                  const n =
                                        this._currentState.items !==
                                        this._prevState.items
                  e &&
                                        (t && this._renderChoices(),
                                        n && this._renderItems(),
                                        (this._prevState = this._currentState))
                }
              }),
              (g.prototype._renderChoices = function () {
                const e = this
                const t = this._store
                const n = t.activeGroups
                const s = t.activeChoices
                let v = document.createDocumentFragment()
                if (
                  (this.choiceList.clear(),
                  this.config.resetScrollPosition &&
                                        requestAnimationFrame(function () {
                                          return e.choiceList.scrollToTop()
                                        }),
                  n.length >= 1 && !this._isSearching)
                ) {
                  const P = s.filter(function (C) {
                    return (
                      C.placeholder === !0 &&
                                            C.groupId === -1
                    )
                  })
                  P.length >= 1 &&
                                        (v = this._createChoicesFragment(P, v)),
                  (v = this._createGroupsFragment(
                    n,
                    s,
                    v
                  ))
                } else {
                  s.length >= 1 &&
                                        (v = this._createChoicesFragment(s, v))
                }
                if (v.childNodes && v.childNodes.length > 0) {
                  const M = this._store.activeItems
                  const K = this._canAddItem(
                    M,
                    this.input.value
                  )
                  if (K.response) {
                    this.choiceList.append(v),
                    this._highlightChoice()
                  } else {
                    var f = this._getTemplate(
                      'notice',
                      K.notice
                    )
                    this.choiceList.append(f)
                  }
                } else {
                  let u = void 0
                  var f = void 0
                  this._isSearching
                    ? ((f =
                                              typeof this.config
                                                .noResultsText === 'function'
                                                ? this.config.noResultsText()
                                                : this.config.noResultsText),
                      (u = this._getTemplate(
                        'notice',
                        f,
                        'no-results'
                      )))
                    : ((f =
                                              typeof this.config
                                                .noChoicesText === 'function'
                                                ? this.config.noChoicesText()
                                                : this.config.noChoicesText),
                      (u = this._getTemplate(
                        'notice',
                        f,
                        'no-choices'
                      ))),
                  this.choiceList.append(u)
                }
              }),
              (g.prototype._renderItems = function () {
                const e = this._store.activeItems || []
                this.itemList.clear()
                const t = this._createItemsFragment(e)
                t.childNodes && this.itemList.append(t)
              }),
              (g.prototype._createGroupsFragment = function (
                e,
                t,
                n
              ) {
                const s = this
                n === void 0 &&
                                    (n = document.createDocumentFragment())
                const v = function (P) {
                  return t.filter(function (M) {
                    return s._isSelectOneElement
                      ? M.groupId === P.id
                      : M.groupId === P.id &&
                                                  (s.config
                                                    .renderSelectedChoices ===
                                                      'always' ||
                                                      !M.selected)
                  })
                }
                return (
                  this.config.shouldSort &&
                                        e.sort(this.config.sorter),
                  e.forEach(function (P) {
                    const M = v(P)
                    if (M.length >= 1) {
                      const K = s._getTemplate(
                        'choiceGroup',
                        P
                      )
                      n.appendChild(K),
                      s._createChoicesFragment(
                        M,
                        n,
                        !0
                      )
                    }
                  }),
                  n
                )
              }),
              (g.prototype._createChoicesFragment = function (
                e,
                t,
                n
              ) {
                const s = this
                t === void 0 &&
                                    (t = document.createDocumentFragment()),
                n === void 0 && (n = !1)
                const v = this.config
                const P = v.renderSelectedChoices
                const M = v.searchResultLimit
                const K = v.renderChoiceLimit
                const f = this._isSearching
                  ? k.sortByScore
                  : this.config.sorter
                const u = function (z) {
                  const ee =
                                        P === 'auto'
                                          ? s._isSelectOneElement ||
                                              !z.selected
                                          : !0
                  if (ee) {
                    const ae = s._getTemplate(
                      'choice',
                      z,
                      s.config.itemSelectText
                    )
                    t.appendChild(ae)
                  }
                }
                let C = e
                P === 'auto' &&
                                    !this._isSelectOneElement &&
                                    (C = e.filter(function (z) {
                                      return !z.selected
                                    }))
                const Y = C.reduce(
                  function (z, ee) {
                    return (
                      ee.placeholder
                        ? z.placeholderChoices.push(ee)
                        : z.normalChoices.push(ee),
                      z
                    )
                  },
                  {
                    placeholderChoices: [],
                    normalChoices: []
                  }
                )
                const V = Y.placeholderChoices
                const U = Y.normalChoices;
                (this.config.shouldSort || this._isSearching) &&
                                    U.sort(f)
                let $ = C.length
                const W = this._isSelectOneElement
                  ? _(_([], V, !0), U, !0)
                  : U
                this._isSearching
                  ? ($ = M)
                  : K && K > 0 && !n && ($ = K)
                for (let J = 0; J < $; J += 1) {
                  W[J] && u(W[J])
                }
                return t
              }),
              (g.prototype._createItemsFragment = function (
                e,
                t
              ) {
                const n = this
                t === void 0 &&
                                    (t = document.createDocumentFragment())
                const s = this.config
                const v = s.shouldSortItems
                const P = s.sorter
                const M = s.removeItemButton
                v && !this._isSelectOneElement && e.sort(P),
                this._isTextElement
                  ? (this.passedElement.value = e
                      .map(function (f) {
                        const u = f.value
                        return u
                      })
                      .join(this.config.delimiter))
                  : (this.passedElement.options = e)
                const K = function (f) {
                  const u = n._getTemplate('item', f, M)
                  t.appendChild(u)
                }
                return e.forEach(K), t
              }),
              (g.prototype._triggerChange = function (e) {
                e != null &&
                                    this.passedElement.triggerEvent(
                                      y.EVENTS.change,
                                      { value: e }
                                    )
              }),
              (g.prototype._selectPlaceholderChoice = function (
                e
              ) {
                this._addItem({
                  value: e.value,
                  label: e.label,
                  choiceId: e.id,
                  groupId: e.groupId,
                  placeholder: e.placeholder
                }),
                this._triggerChange(e.value)
              }),
              (g.prototype._handleButtonAction = function (e, t) {
                if (
                  !(
                    !e ||
                                        !t ||
                                        !this.config.removeItems ||
                                        !this.config.removeItemButton
                  )
                ) {
                  const n =
                                        t.parentNode && t.parentNode.dataset.id
                  const s =
                                        n &&
                                        e.find(function (v) {
                                          return v.id === parseInt(n, 10)
                                        })
                  s &&
                                        (this._removeItem(s),
                                        this._triggerChange(s.value),
                                        this._isSelectOneElement &&
                                            this._store.placeholderChoice &&
                                            this._selectPlaceholderChoice(
                                              this._store.placeholderChoice
                                            ))
                }
              }),
              (g.prototype._handleItemAction = function (
                e,
                t,
                n
              ) {
                const s = this
                if (
                  (n === void 0 && (n = !1),
                  !(
                    !e ||
                                        !t ||
                                        !this.config.removeItems ||
                                        this._isSelectOneElement
                  ))
                ) {
                  const v = t.dataset.id
                  e.forEach(function (P) {
                    P.id === parseInt(''.concat(v), 10) &&
                                        !P.highlighted
                      ? s.highlightItem(P)
                      : !n &&
                                              P.highlighted &&
                                              s.unhighlightItem(P)
                  }),
                  this.input.focus()
                }
              }),
              (g.prototype._handleChoiceAction = function (e, t) {
                if (!(!e || !t)) {
                  const n = t.dataset.id
                  const s = n && this._store.getChoiceById(n)
                  if (s) {
                    const v =
                                            e[0] && e[0].keyCode
                                              ? e[0].keyCode
                                              : void 0
                    const P = this.dropdown.isActive
                    if (
                      ((s.keyCode = v),
                      this.passedElement.triggerEvent(
                        y.EVENTS.choice,
                        { choice: s }
                      ),
                      !s.selected && !s.disabled)
                    ) {
                      const M = this._canAddItem(
                        e,
                        s.value
                      )
                      M.response &&
                                                (this._addItem({
                                                  value: s.value,
                                                  label: s.label,
                                                  choiceId: s.id,
                                                  groupId: s.groupId,
                                                  customProperties:
                                                        s.customProperties,
                                                  placeholder: s.placeholder,
                                                  keyCode: s.keyCode
                                                }),
                                                this._triggerChange(s.value))
                    }
                    this.clearInput(),
                    P &&
                                                this._isSelectOneElement &&
                                                (this.hideDropdown(!0),
                                                this.containerOuter.focus())
                  }
                }
              }),
              (g.prototype._handleBackspace = function (e) {
                if (!(!this.config.removeItems || !e)) {
                  const t = e[e.length - 1]
                  const n = e.some(function (s) {
                    return s.highlighted
                  })
                  this.config.editItems && !n && t
                    ? ((this.input.value = t.value),
                      this.input.setWidth(),
                      this._removeItem(t),
                      this._triggerChange(t.value))
                    : (n || this.highlightItem(t, !1),
                      this.removeHighlightedItems(!0))
                }
              }),
              (g.prototype._startLoading = function () {
                this._store.dispatch((0, O.setIsLoading)(!0))
              }),
              (g.prototype._stopLoading = function () {
                this._store.dispatch((0, O.setIsLoading)(!1))
              }),
              (g.prototype._handleLoadingState = function (e) {
                e === void 0 && (e = !0)
                let t = this.itemList.getChild(
                  '.'.concat(
                    this.config.classNames.placeholder
                  )
                )
                e
                  ? (this.disable(),
                    this.containerOuter.addLoadingState(),
                    this._isSelectOneElement
                      ? t
                        ? (t.innerHTML =
                                                    this.config.loadingText)
                        : ((t = this._getTemplate(
                            'placeholder',
                            this.config.loadingText
                          )),
                          t && this.itemList.append(t))
                      : (this.input.placeholder =
                                                this.config.loadingText))
                  : (this.enable(),
                    this.containerOuter.removeLoadingState(),
                    this._isSelectOneElement
                      ? t &&
                                            (t.innerHTML =
                                                this._placeholderValue || '')
                      : (this.input.placeholder =
                                                this._placeholderValue || ''))
              }),
              (g.prototype._handleSearch = function (e) {
                if (this.input.isFocussed) {
                  const t = this._store.choices
                  const n = this.config
                  const s = n.searchFloor
                  const v = n.searchChoices
                  const P = t.some(function (K) {
                    return !K.active
                  })
                  if (
                    e !== null &&
                                        typeof e < 'u' &&
                                        e.length >= s
                  ) {
                    const M = v
                      ? this._searchChoices(e)
                      : 0
                    this.passedElement.triggerEvent(
                      y.EVENTS.search,
                      {
                        value: e,
                        resultCount: M
                      }
                    )
                  } else {
                    P &&
                                            ((this._isSearching = !1),
                                            this._store.dispatch(
                                              (0, r.activateChoices)(!0)
                                            ))
                  }
                }
              }),
              (g.prototype._canAddItem = function (e, t) {
                let n = !0
                let s =
                                    typeof this.config.addItemText ===
                                    'function'
                                      ? this.config.addItemText(t)
                                      : this.config.addItemText
                if (!this._isSelectOneElement) {
                  const v = (0, k.existsInArray)(e, t)
                  this.config.maxItemCount > 0 &&
                                        this.config.maxItemCount <= e.length &&
                                        ((n = !1),
                                        (s =
                                            typeof this.config.maxItemText ===
                                            'function'
                                              ? this.config.maxItemText(
                                                this.config.maxItemCount
                                              )
                                              : this.config.maxItemText)),
                  !this.config.duplicateItemsAllowed &&
                                            v &&
                                            n &&
                                            ((n = !1),
                                            (s =
                                                typeof this.config
                                                  .uniqueItemText ===
                                                'function'
                                                  ? this.config.uniqueItemText(
                                                    t
                                                  )
                                                  : this.config
                                                    .uniqueItemText)),
                  this._isTextElement &&
                                            this.config.addItems &&
                                            n &&
                                            typeof this.config.addItemFilter ===
                                                'function' &&
                                            !this.config.addItemFilter(t) &&
                                            ((n = !1),
                                            (s =
                                                typeof this.config
                                                  .customAddItemText ===
                                                'function'
                                                  ? this.config.customAddItemText(
                                                    t
                                                  )
                                                  : this.config
                                                    .customAddItemText))
                }
                return { response: n, notice: s }
              }),
              (g.prototype._searchChoices = function (e) {
                const t = typeof e === 'string' ? e.trim() : e
                const n =
                                    typeof this._currentValue === 'string'
                                      ? this._currentValue.trim()
                                      : this._currentValue
                if (t.length < 1 && t === ''.concat(n, ' ')) {
                  return 0
                }
                const s = this._store.searchableChoices
                const v = t
                const P = Object.assign(
                  this.config.fuseOptions,
                  {
                    keys: _(
                      [],
                      this.config.searchFields,
                      !0
                    ),
                    includeMatches: !0
                  }
                )
                const M = new a.default(s, P)
                const K = M.search(v)
                return (
                  (this._currentValue = t),
                  (this._highlightPosition = 0),
                  (this._isSearching = !0),
                  this._store.dispatch(
                    (0, r.filterChoices)(K)
                  ),
                  K.length
                )
              }),
              (g.prototype._addEventListeners = function () {
                const e = document.documentElement
                e.addEventListener(
                  'touchend',
                  this._onTouchEnd,
                  !0
                ),
                this.containerOuter.element.addEventListener(
                  'keydown',
                  this._onKeyDown,
                  !0
                ),
                this.containerOuter.element.addEventListener(
                  'mousedown',
                  this._onMouseDown,
                  !0
                ),
                e.addEventListener('click', this._onClick, {
                  passive: !0
                }),
                e.addEventListener(
                  'touchmove',
                  this._onTouchMove,
                  { passive: !0 }
                ),
                this.dropdown.element.addEventListener(
                  'mouseover',
                  this._onMouseOver,
                  { passive: !0 }
                ),
                this._isSelectOneElement &&
                                        (this.containerOuter.element.addEventListener(
                                          'focus',
                                          this._onFocus,
                                          { passive: !0 }
                                        ),
                                        this.containerOuter.element.addEventListener(
                                          'blur',
                                          this._onBlur,
                                          { passive: !0 }
                                        )),
                this.input.element.addEventListener(
                  'keyup',
                  this._onKeyUp,
                  { passive: !0 }
                ),
                this.input.element.addEventListener(
                  'focus',
                  this._onFocus,
                  { passive: !0 }
                ),
                this.input.element.addEventListener(
                  'blur',
                  this._onBlur,
                  { passive: !0 }
                ),
                this.input.element.form &&
                                        this.input.element.form.addEventListener(
                                          'reset',
                                          this._onFormReset,
                                          { passive: !0 }
                                        ),
                this.input.addEventListeners()
              }),
              (g.prototype._removeEventListeners = function () {
                const e = document.documentElement
                e.removeEventListener(
                  'touchend',
                  this._onTouchEnd,
                  !0
                ),
                this.containerOuter.element.removeEventListener(
                  'keydown',
                  this._onKeyDown,
                  !0
                ),
                this.containerOuter.element.removeEventListener(
                  'mousedown',
                  this._onMouseDown,
                  !0
                ),
                e.removeEventListener(
                  'click',
                  this._onClick
                ),
                e.removeEventListener(
                  'touchmove',
                  this._onTouchMove
                ),
                this.dropdown.element.removeEventListener(
                  'mouseover',
                  this._onMouseOver
                ),
                this._isSelectOneElement &&
                                        (this.containerOuter.element.removeEventListener(
                                          'focus',
                                          this._onFocus
                                        ),
                                        this.containerOuter.element.removeEventListener(
                                          'blur',
                                          this._onBlur
                                        )),
                this.input.element.removeEventListener(
                  'keyup',
                  this._onKeyUp
                ),
                this.input.element.removeEventListener(
                  'focus',
                  this._onFocus
                ),
                this.input.element.removeEventListener(
                  'blur',
                  this._onBlur
                ),
                this.input.element.form &&
                                        this.input.element.form.removeEventListener(
                                          'reset',
                                          this._onFormReset
                                        ),
                this.input.removeEventListeners()
              }),
              (g.prototype._onKeyDown = function (e) {
                const t = e.keyCode
                const n = this._store.activeItems
                const s = this.input.isFocussed
                const v = this.dropdown.isActive
                const P = this.itemList.hasChildren()
                const M = String.fromCharCode(t)
                const K = /[^\x00-\x1F]/.test(M)
                const f = y.KEY_CODES.BACK_KEY
                const u = y.KEY_CODES.DELETE_KEY
                const C = y.KEY_CODES.ENTER_KEY
                const Y = y.KEY_CODES.A_KEY
                const V = y.KEY_CODES.ESC_KEY
                const U = y.KEY_CODES.UP_KEY
                const $ = y.KEY_CODES.DOWN_KEY
                const W = y.KEY_CODES.PAGE_UP_KEY
                const J = y.KEY_CODES.PAGE_DOWN_KEY
                switch (
                  (!this._isTextElement &&
                                        !v &&
                                        K &&
                                        (this.showDropdown(),
                                        this.input.isFocussed ||
                                            (this.input.value +=
                                                e.key.toLowerCase())),
                  t)
                ) {
                  case Y:
                    return this._onSelectKey(e, P)
                  case C:
                    return this._onEnterKey(e, n, v)
                  case V:
                    return this._onEscapeKey(v)
                  case U:
                  case W:
                  case $:
                  case J:
                    return this._onDirectionKey(e, v)
                  case u:
                  case f:
                    return this._onDeleteKey(e, n, s)
                  default:
                }
              }),
              (g.prototype._onKeyUp = function (e) {
                const t = e.target
                const n = e.keyCode
                const s = this.input.value
                const v = this._store.activeItems
                const P = this._canAddItem(v, s)
                const M = y.KEY_CODES.BACK_KEY
                const K = y.KEY_CODES.DELETE_KEY
                if (this._isTextElement) {
                  const f = P.notice && s
                  if (f) {
                    const u = this._getTemplate(
                      'notice',
                      P.notice
                    );
                    (this.dropdown.element.innerHTML =
                                            u.outerHTML),
                    this.showDropdown(!0)
                  } else this.hideDropdown(!0)
                } else {
                  const C = n === M || n === K
                  const Y = C && t && !t.value
                  const V =
                                        !this._isTextElement &&
                                        this._isSearching
                  const U = this._canSearch && P.response
                  Y && V
                    ? ((this._isSearching = !1),
                      this._store.dispatch(
                        (0, r.activateChoices)(!0)
                      ))
                    : U &&
                                          this._handleSearch(
                                            this.input.rawValue
                                          )
                }
                this._canSearch = this.config.searchEnabled
              }),
              (g.prototype._onSelectKey = function (e, t) {
                const n = e.ctrlKey
                const s = e.metaKey
                const v = n || s
                if (v && t) {
                  this._canSearch = !1
                  const P =
                                        this.config.removeItems &&
                                        !this.input.value &&
                                        this.input.element ===
                                            document.activeElement
                  P && this.highlightAll()
                }
              }),
              (g.prototype._onEnterKey = function (e, t, n) {
                const s = e.target
                const v = y.KEY_CODES.ENTER_KEY
                const P = s && s.hasAttribute('data-button')
                if (this._isTextElement && s && s.value) {
                  const M = this.input.value
                  const K = this._canAddItem(t, M)
                  K.response &&
                                        (this.hideDropdown(!0),
                                        this._addItem({ value: M }),
                                        this._triggerChange(M),
                                        this.clearInput())
                }
                if (
                  (P &&
                                        (this._handleButtonAction(t, s),
                                        e.preventDefault()),
                  n)
                ) {
                  const f = this.dropdown.getChild(
                    '.'.concat(
                      this.config.classNames
                        .highlightedState
                    )
                  )
                  f &&
                                        (t[0] && (t[0].keyCode = v),
                                        this._handleChoiceAction(t, f)),
                  e.preventDefault()
                } else {
                  this._isSelectOneElement &&
                                        (this.showDropdown(),
                                        e.preventDefault())
                }
              }),
              (g.prototype._onEscapeKey = function (e) {
                e &&
                                    (this.hideDropdown(!0),
                                    this.containerOuter.focus())
              }),
              (g.prototype._onDirectionKey = function (e, t) {
                const n = e.keyCode
                const s = e.metaKey
                const v = y.KEY_CODES.DOWN_KEY
                const P = y.KEY_CODES.PAGE_UP_KEY
                const M = y.KEY_CODES.PAGE_DOWN_KEY
                if (t || this._isSelectOneElement) {
                  this.showDropdown(), (this._canSearch = !1)
                  const K = n === v || n === M ? 1 : -1
                  const f = s || n === M || n === P
                  const u = '[data-choice-selectable]'
                  let C = void 0
                  if (f) {
                    K > 0
                      ? (C =
                                                  this.dropdown.element.querySelector(
                                                    ''.concat(
                                                      u,
                                                      ':last-of-type'
                                                    )
                                                  ))
                      : (C =
                                                  this.dropdown.element.querySelector(
                                                    u
                                                  ))
                  } else {
                    const Y =
                                            this.dropdown.element.querySelector(
                                              '.'.concat(
                                                this.config.classNames
                                                  .highlightedState
                                              )
                                            )
                    Y
                      ? (C = (0, k.getAdjacentEl)(
                          Y,
                          u,
                          K
                        ))
                      : (C =
                                                  this.dropdown.element.querySelector(
                                                    u
                                                  ))
                  }
                  C &&
                                        ((0, k.isScrolledIntoView)(
                                          C,
                                          this.choiceList.element,
                                          K
                                        ) ||
                                            this.choiceList.scrollToChildElement(
                                              C,
                                              K
                                            ),
                                        this._highlightChoice(C)),
                  e.preventDefault()
                }
              }),
              (g.prototype._onDeleteKey = function (e, t, n) {
                const s = e.target
                !this._isSelectOneElement &&
                                    !s.value &&
                                    n &&
                                    (this._handleBackspace(t),
                                    e.preventDefault())
              }),
              (g.prototype._onTouchMove = function () {
                this._wasTap && (this._wasTap = !1)
              }),
              (g.prototype._onTouchEnd = function (e) {
                const t = (e || e.touches[0]).target
                const n =
                                    this._wasTap &&
                                    this.containerOuter.element.contains(t)
                if (n) {
                  const s =
                                        t === this.containerOuter.element ||
                                        t === this.containerInner.element
                  s &&
                                        (this._isTextElement
                                          ? this.input.focus()
                                          : this._isSelectMultipleElement &&
                                              this.showDropdown()),
                  e.stopPropagation()
                }
                this._wasTap = !0
              }),
              (g.prototype._onMouseDown = function (e) {
                const t = e.target
                if (t instanceof HTMLElement) {
                  if (
                    E &&
                                        this.choiceList.element.contains(t)
                  ) {
                    const n =
                                            this.choiceList.element
                                              .firstElementChild
                    const s =
                                            this._direction === 'ltr'
                                              ? e.offsetX >= n.offsetWidth
                                              : e.offsetX < n.offsetLeft
                    this._isScrollingOnIe = s
                  }
                  if (t !== this.input.element) {
                    const v = t.closest(
                      '[data-button],[data-item],[data-choice]'
                    )
                    if (v instanceof HTMLElement) {
                      const P = e.shiftKey
                      const M = this._store.activeItems
                      const K = v.dataset
                      'button' in K
                        ? this._handleButtonAction(M, v)
                        : 'item' in K
                          ? this._handleItemAction(
                            M,
                            v,
                            P
                          )
                          : 'choice' in K &&
                                                    this._handleChoiceAction(
                                                      M,
                                                      v
                                                    )
                    }
                    e.preventDefault()
                  }
                }
              }),
              (g.prototype._onMouseOver = function (e) {
                const t = e.target
                t instanceof HTMLElement &&
                                    'choice' in t.dataset &&
                                    this._highlightChoice(t)
              }),
              (g.prototype._onClick = function (e) {
                const t = e.target
                const n =
                                    this.containerOuter.element.contains(t)
                if (n) {
                  !this.dropdown.isActive &&
                                    !this.containerOuter.isDisabled
                    ? this._isTextElement
                      ? document.activeElement !==
                                                  this.input.element &&
                                              this.input.focus()
                      : (this.showDropdown(),
                        this.containerOuter.focus())
                    : this._isSelectOneElement &&
                                          t !== this.input.element &&
                                          !this.dropdown.element.contains(t) &&
                                          this.hideDropdown()
                } else {
                  const s =
                                        this._store.highlightedActiveItems
                                          .length > 0
                  s && this.unhighlightAll(),
                  this.containerOuter.removeFocusState(),
                  this.hideDropdown(!0)
                }
              }),
              (g.prototype._onFocus = function (e) {
                let t
                const n = this
                const s = e.target
                const v =
                                    s &&
                                    this.containerOuter.element.contains(s)
                if (v) {
                  const P =
                                        ((t = {}),
                                        (t[y.TEXT_TYPE] = function () {
                                          s === n.input.element &&
                                                n.containerOuter.addFocusState()
                                        }),
                                        (t[y.SELECT_ONE_TYPE] = function () {
                                          n.containerOuter.addFocusState(),
                                          s === n.input.element &&
                                                    n.showDropdown(!0)
                                        }),
                                        (t[y.SELECT_MULTIPLE_TYPE] =
                                            function () {
                                              s === n.input.element &&
                                                    (n.showDropdown(!0),
                                                    n.containerOuter.addFocusState())
                                            }),
                                        t)
                  P[this.passedElement.element.type]()
                }
              }),
              (g.prototype._onBlur = function (e) {
                let t
                const n = this
                const s = e.target
                const v =
                                    s &&
                                    this.containerOuter.element.contains(s)
                if (v && !this._isScrollingOnIe) {
                  const P = this._store.activeItems
                  const M = P.some(function (f) {
                    return f.highlighted
                  })
                  const K =
                                        ((t = {}),
                                        (t[y.TEXT_TYPE] = function () {
                                          s === n.input.element &&
                                                (n.containerOuter.removeFocusState(),
                                                M && n.unhighlightAll(),
                                                n.hideDropdown(!0))
                                        }),
                                        (t[y.SELECT_ONE_TYPE] = function () {
                                          n.containerOuter.removeFocusState(),
                                          (s === n.input.element ||
                                                    (s ===
                                                        n.containerOuter
                                                          .element &&
                                                        !n._canSearch)) &&
                                                    n.hideDropdown(!0)
                                        }),
                                        (t[y.SELECT_MULTIPLE_TYPE] =
                                            function () {
                                              s === n.input.element &&
                                                    (n.containerOuter.removeFocusState(),
                                                    n.hideDropdown(!0),
                                                    M && n.unhighlightAll())
                                            }),
                                        t)
                  K[this.passedElement.element.type]()
                } else {
                  (this._isScrollingOnIe = !1),
                  this.input.element.focus()
                }
              }),
              (g.prototype._onFormReset = function () {
                this._store.dispatch(
                  (0, O.resetTo)(this._initialState)
                )
              }),
              (g.prototype._highlightChoice = function (e) {
                const t = this
                e === void 0 && (e = null)
                const n = Array.from(
                  this.dropdown.element.querySelectorAll(
                    '[data-choice-selectable]'
                  )
                )
                if (n.length) {
                  let s = e
                  const v = Array.from(
                    this.dropdown.element.querySelectorAll(
                      '.'.concat(
                        this.config.classNames
                          .highlightedState
                      )
                    )
                  )
                  v.forEach(function (P) {
                    P.classList.remove(
                      t.config.classNames
                        .highlightedState
                    ),
                    P.setAttribute(
                      'aria-selected',
                      'false'
                    )
                  }),
                  s
                    ? (this._highlightPosition =
                                                  n.indexOf(s))
                    : (n.length >
                                              this._highlightPosition
                        ? (s =
                                                        n[
                                                          this
                                                            ._highlightPosition
                                                        ])
                        : (s = n[n.length - 1]),
                      s || (s = n[0])),
                  s.classList.add(
                    this.config.classNames
                      .highlightedState
                  ),
                  s.setAttribute('aria-selected', 'true'),
                  this.passedElement.triggerEvent(
                    y.EVENTS.highlightChoice,
                    { el: s }
                  ),
                  this.dropdown.isActive &&
                                            (this.input.setActiveDescendant(
                                              s.id
                                            ),
                                            this.containerOuter.setActiveDescendant(
                                              s.id
                                            ))
                }
              }),
              (g.prototype._addItem = function (e) {
                const t = e.value
                const n = e.label
                const s = n === void 0 ? null : n
                const v = e.choiceId
                const P = v === void 0 ? -1 : v
                const M = e.groupId
                const K = M === void 0 ? -1 : M
                const f = e.customProperties
                const u = f === void 0 ? {} : f
                const C = e.placeholder
                const Y = C === void 0 ? !1 : C
                const V = e.keyCode
                const U = V === void 0 ? -1 : V
                let $ = typeof t === 'string' ? t.trim() : t
                const W = this._store.items
                const J = s || $
                const z = P || -1
                const ee =
                                    K >= 0 ? this._store.getGroupById(K) : null
                const ae = W ? W.length + 1 : 1
                this.config.prependValue &&
                                    ($ =
                                        this.config.prependValue +
                                        $.toString()),
                this.config.appendValue &&
                                        ($ +=
                                            this.config.appendValue.toString()),
                this._store.dispatch(
                  (0, l.addItem)({
                    value: $,
                    label: J,
                    id: ae,
                    choiceId: z,
                    groupId: K,
                    customProperties: u,
                    placeholder: Y,
                    keyCode: U
                  })
                ),
                this._isSelectOneElement &&
                                        this.removeActiveItems(ae),
                this.passedElement.triggerEvent(
                  y.EVENTS.addItem,
                  {
                    id: ae,
                    value: $,
                    label: J,
                    customProperties: u,
                    groupValue:
                                                ee && ee.value
                                                  ? ee.value
                                                  : null,
                    keyCode: U
                  }
                )
              }),
              (g.prototype._removeItem = function (e) {
                const t = e.id
                const n = e.value
                const s = e.label
                const v = e.customProperties
                const P = e.choiceId
                const M = e.groupId
                const K =
                                    M && M >= 0
                                      ? this._store.getGroupById(M)
                                      : null
                !t ||
                                    !P ||
                                    (this._store.dispatch(
                                      (0, l.removeItem)(t, P)
                                    ),
                                    this.passedElement.triggerEvent(
                                      y.EVENTS.removeItem,
                                      {
                                        id: t,
                                        value: n,
                                        label: s,
                                        customProperties: v,
                                        groupValue:
                                                K && K.value ? K.value : null
                                      }
                                    ))
              }),
              (g.prototype._addChoice = function (e) {
                const t = e.value
                const n = e.label
                const s = n === void 0 ? null : n
                const v = e.isSelected
                const P = v === void 0 ? !1 : v
                const M = e.isDisabled
                const K = M === void 0 ? !1 : M
                const f = e.groupId
                const u = f === void 0 ? -1 : f
                const C = e.customProperties
                const Y = C === void 0 ? {} : C
                const V = e.placeholder
                const U = V === void 0 ? !1 : V
                const $ = e.keyCode
                const W = $ === void 0 ? -1 : $
                if (!(typeof t > 'u' || t === null)) {
                  const J = this._store.choices
                  const z = s || t
                  const ee = J ? J.length + 1 : 1
                  const ae = ''
                    .concat(this._baseId, '-')
                    .concat(this._idNames.itemChoice, '-')
                    .concat(ee)
                  this._store.dispatch(
                    (0, r.addChoice)({
                      id: ee,
                      groupId: u,
                      elementId: ae,
                      value: t,
                      label: z,
                      disabled: K,
                      customProperties: Y,
                      placeholder: U,
                      keyCode: W
                    })
                  ),
                  P &&
                                            this._addItem({
                                              value: t,
                                              label: z,
                                              choiceId: ee,
                                              customProperties: Y,
                                              placeholder: U,
                                              keyCode: W
                                            })
                }
              }),
              (g.prototype._addGroup = function (e) {
                const t = this
                const n = e.group
                const s = e.id
                const v = e.valueKey
                const P = v === void 0 ? 'value' : v
                const M = e.labelKey
                const K = M === void 0 ? 'label' : M
                const f = (0, k.isType)('Object', n)
                  ? n.choices
                  : Array.from(
                    n.getElementsByTagName('OPTION')
                  )
                const u =
                                    s ||
                                    Math.floor(
                                      new Date().valueOf() * Math.random()
                                    )
                const C = n.disabled ? n.disabled : !1
                if (f) {
                  this._store.dispatch(
                    (0, c.addGroup)({
                      value: n.label,
                      id: u,
                      active: !0,
                      disabled: C
                    })
                  )
                  const Y = function (V) {
                    const U =
                                            V.disabled ||
                                            (V.parentNode &&
                                                V.parentNode.disabled)
                    t._addChoice({
                      value: V[P],
                      label: (0, k.isType)('Object', V)
                        ? V[K]
                        : V.innerHTML,
                      isSelected: V.selected,
                      isDisabled: U,
                      groupId: u,
                      customProperties:
                                                V.customProperties,
                      placeholder: V.placeholder
                    })
                  }
                  f.forEach(Y)
                } else {
                  this._store.dispatch(
                    (0, c.addGroup)({
                      value: n.label,
                      id: n.id,
                      active: !1,
                      disabled: n.disabled
                    })
                  )
                }
              }),
              (g.prototype._getTemplate = function (e) {
                for (
                  var t, n = [], s = 1;
                  s < arguments.length;
                  s++
                ) {
                  n[s - 1] = arguments[s]
                }
                return (t = this._templates[e]).call.apply(
                  t,
                  _([this, this.config], n, !1)
                )
              }),
              (g.prototype._createTemplates = function () {
                const e = this.config.callbackOnCreateTemplates
                let t = {}
                e &&
                                    typeof e === 'function' &&
                                    (t = e.call(this, k.strToEl)),
                (this._templates = (0, d.default)(
                  ne.default,
                  t
                ))
              }),
              (g.prototype._createElements = function () {
                (this.containerOuter = new L.Container({
                  element: this._getTemplate(
                    'containerOuter',
                    this._direction,
                    this._isSelectElement,
                    this._isSelectOneElement,
                    this.config.searchEnabled,
                    this.passedElement.element.type,
                    this.config.labelId
                  ),
                  classNames: this.config.classNames,
                  type: this.passedElement.element.type,
                  position: this.config.position
                })),
                (this.containerInner = new L.Container({
                  element:
                                            this._getTemplate('containerInner'),
                  classNames: this.config.classNames,
                  type: this.passedElement.element.type,
                  position: this.config.position
                })),
                (this.input = new L.Input({
                  element: this._getTemplate(
                    'input',
                    this._placeholderValue
                  ),
                  classNames: this.config.classNames,
                  type: this.passedElement.element.type,
                  preventPaste: !this.config.paste
                })),
                (this.choiceList = new L.List({
                  element: this._getTemplate(
                    'choiceList',
                    this._isSelectOneElement
                  )
                })),
                (this.itemList = new L.List({
                  element: this._getTemplate(
                    'itemList',
                    this._isSelectOneElement
                  )
                })),
                (this.dropdown = new L.Dropdown({
                  element: this._getTemplate('dropdown'),
                  classNames: this.config.classNames,
                  type: this.passedElement.element.type
                }))
              }),
              (g.prototype._createStructure = function () {
                this.passedElement.conceal(),
                this.containerInner.wrap(
                  this.passedElement.element
                ),
                this.containerOuter.wrap(
                  this.containerInner.element
                ),
                this._isSelectOneElement
                  ? (this.input.placeholder =
                                              this.config
                                                .searchPlaceholderValue || '')
                  : this._placeholderValue &&
                                          ((this.input.placeholder =
                                              this._placeholderValue),
                                          this.input.setWidth()),
                this.containerOuter.element.appendChild(
                  this.containerInner.element
                ),
                this.containerOuter.element.appendChild(
                  this.dropdown.element
                ),
                this.containerInner.element.appendChild(
                  this.itemList.element
                ),
                this._isTextElement ||
                                        this.dropdown.element.appendChild(
                                          this.choiceList.element
                                        ),
                this._isSelectOneElement
                  ? this.config.searchEnabled &&
                                          this.dropdown.element.insertBefore(
                                            this.input.element,
                                            this.dropdown.element.firstChild
                                          )
                  : this.containerInner.element.appendChild(
                    this.input.element
                  ),
                this._isSelectElement &&
                                        ((this._highlightPosition = 0),
                                        (this._isSearching = !1),
                                        this._startLoading(),
                                        this._presetGroups.length
                                          ? this._addPredefinedGroups(
                                            this._presetGroups
                                          )
                                          : this._addPredefinedChoices(
                                            this._presetChoices
                                          ),
                                        this._stopLoading()),
                this._isTextElement &&
                                        this._addPredefinedItems(
                                          this._presetItems
                                        )
              }),
              (g.prototype._addPredefinedGroups = function (e) {
                const t = this
                const n = this.passedElement.placeholderOption
                n &&
                                    n.parentNode &&
                                    n.parentNode.tagName === 'SELECT' &&
                                    this._addChoice({
                                      value: n.value,
                                      label: n.innerHTML,
                                      isSelected: n.selected,
                                      isDisabled: n.disabled,
                                      placeholder: !0
                                    }),
                e.forEach(function (s) {
                  return t._addGroup({
                    group: s,
                    id: s.id || null
                  })
                })
              }),
              (g.prototype._addPredefinedChoices = function (e) {
                const t = this
                this.config.shouldSort &&
                                    e.sort(this.config.sorter)
                const n = e.some(function (v) {
                  return v.selected
                })
                const s = e.findIndex(function (v) {
                  return v.disabled === void 0 || !v.disabled
                })
                e.forEach(function (v, P) {
                  const M = v.value
                  const K = M === void 0 ? '' : M
                  const f = v.label
                  const u = v.customProperties
                  const C = v.placeholder
                  if (t._isSelectElement) {
                    if (v.choices) {
                      t._addGroup({
                        group: v,
                        id: v.id || null
                      })
                    } else {
                      const Y =
                                                t._isSelectOneElement &&
                                                !n &&
                                                P === s
                      const V = Y ? !0 : v.selected
                      const U = v.disabled
                      t._addChoice({
                        value: K,
                        label: f,
                        isSelected: !!V,
                        isDisabled: !!U,
                        placeholder: !!C,
                        customProperties: u
                      })
                    }
                  } else {
                    t._addChoice({
                      value: K,
                      label: f,
                      isSelected: !!v.selected,
                      isDisabled: !!v.disabled,
                      placeholder: !!v.placeholder,
                      customProperties: u
                    })
                  }
                })
              }),
              (g.prototype._addPredefinedItems = function (e) {
                const t = this
                e.forEach(function (n) {
                  typeof n === 'object' &&
                                        n.value &&
                                        t._addItem({
                                          value: n.value,
                                          label: n.label,
                                          choiceId: n.id,
                                          customProperties:
                                                n.customProperties,
                                          placeholder: n.placeholder
                                        }),
                  typeof n === 'string' &&
                                            t._addItem({
                                              value: n
                                            })
                })
              }),
              (g.prototype._setChoiceOrItem = function (e) {
                const t = this
                const n = (0, k.getType)(e).toLowerCase()
                const s = {
                  object: function () {
                    e.value &&
                                            (t._isTextElement
                                              ? t._addItem({
                                                value: e.value,
                                                label: e.label,
                                                choiceId: e.id,
                                                customProperties:
                                                          e.customProperties,
                                                placeholder:
                                                          e.placeholder
                                              })
                                              : t._addChoice({
                                                value: e.value,
                                                label: e.label,
                                                isSelected: !0,
                                                isDisabled: !1,
                                                customProperties:
                                                          e.customProperties,
                                                placeholder:
                                                          e.placeholder
                                              }))
                  },
                  string: function () {
                    t._isTextElement
                      ? t._addItem({
                        value: e
                      })
                      : t._addChoice({
                        value: e,
                        label: e,
                        isSelected: !0,
                        isDisabled: !1
                      })
                  }
                }
                s[n]()
              }),
              (g.prototype._findAndSelectChoiceByValue =
                                function (e) {
                                  const t = this
                                  const n = this._store.choices
                                  const s = n.find(function (v) {
                                    return t.config.valueComparer(
                                      v.value,
                                      e
                                    )
                                  })
                                  s &&
                                        !s.selected &&
                                        this._addItem({
                                          value: s.value,
                                          label: s.label,
                                          choiceId: s.id,
                                          groupId: s.groupId,
                                          customProperties:
                                                s.customProperties,
                                          placeholder: s.placeholder,
                                          keyCode: s.keyCode
                                        })
                                }),
              (g.prototype._generatePlaceholderValue =
                                function () {
                                  if (
                                    this._isSelectElement &&
                                        this.passedElement.placeholderOption
                                  ) {
                                    const e =
                                            this.passedElement
                                              .placeholderOption
                                    return e ? e.text : null
                                  }
                                  const t = this.config
                                  const n = t.placeholder
                                  const s = t.placeholderValue
                                  const v =
                                        this.passedElement.element.dataset
                                  if (n) {
                                    if (s) return s
                                    if (v.placeholder) {
                                      return v.placeholder
                                    }
                                  }
                                  return null
                                }),
              g
            )
          })()
          i.default = N
        },
        613: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 })
          const _ = b(799)
          const h = b(883)
          const d = (function () {
            function a (r) {
              const c = r.element
              const l = r.type
              const O = r.classNames
              const L = r.position;
              (this.element = c),
              (this.classNames = O),
              (this.type = l),
              (this.position = L),
              (this.isOpen = !1),
              (this.isFlipped = !1),
              (this.isFocussed = !1),
              (this.isDisabled = !1),
              (this.isLoading = !1),
              (this._onFocus = this._onFocus.bind(this)),
              (this._onBlur = this._onBlur.bind(this))
            }
            return (
              (a.prototype.addEventListeners = function () {
                this.element.addEventListener(
                  'focus',
                  this._onFocus
                ),
                this.element.addEventListener(
                  'blur',
                  this._onBlur
                )
              }),
              (a.prototype.removeEventListeners = function () {
                this.element.removeEventListener(
                  'focus',
                  this._onFocus
                ),
                this.element.removeEventListener(
                  'blur',
                  this._onBlur
                )
              }),
              (a.prototype.shouldFlip = function (r) {
                if (typeof r !== 'number') return !1
                let c = !1
                return (
                  this.position === 'auto'
                    ? (c = !window.matchMedia(
                        '(min-height: '.concat(
                          r + 1,
                          'px)'
                        )
                      ).matches)
                    : this.position === 'top' && (c = !0),
                  c
                )
              }),
              (a.prototype.setActiveDescendant = function (r) {
                this.element.setAttribute(
                  'aria-activedescendant',
                  r
                )
              }),
              (a.prototype.removeActiveDescendant = function () {
                this.element.removeAttribute(
                  'aria-activedescendant'
                )
              }),
              (a.prototype.open = function (r) {
                this.element.classList.add(
                  this.classNames.openState
                ),
                this.element.setAttribute(
                  'aria-expanded',
                  'true'
                ),
                (this.isOpen = !0),
                this.shouldFlip(r) &&
                                        (this.element.classList.add(
                                          this.classNames.flippedState
                                        ),
                                        (this.isFlipped = !0))
              }),
              (a.prototype.close = function () {
                this.element.classList.remove(
                  this.classNames.openState
                ),
                this.element.setAttribute(
                  'aria-expanded',
                  'false'
                ),
                this.removeActiveDescendant(),
                (this.isOpen = !1),
                this.isFlipped &&
                                        (this.element.classList.remove(
                                          this.classNames.flippedState
                                        ),
                                        (this.isFlipped = !1))
              }),
              (a.prototype.focus = function () {
                this.isFocussed || this.element.focus()
              }),
              (a.prototype.addFocusState = function () {
                this.element.classList.add(
                  this.classNames.focusState
                )
              }),
              (a.prototype.removeFocusState = function () {
                this.element.classList.remove(
                  this.classNames.focusState
                )
              }),
              (a.prototype.enable = function () {
                this.element.classList.remove(
                  this.classNames.disabledState
                ),
                this.element.removeAttribute(
                  'aria-disabled'
                ),
                this.type === h.SELECT_ONE_TYPE &&
                                        this.element.setAttribute(
                                          'tabindex',
                                          '0'
                                        ),
                (this.isDisabled = !1)
              }),
              (a.prototype.disable = function () {
                this.element.classList.add(
                  this.classNames.disabledState
                ),
                this.element.setAttribute(
                  'aria-disabled',
                  'true'
                ),
                this.type === h.SELECT_ONE_TYPE &&
                                        this.element.setAttribute(
                                          'tabindex',
                                          '-1'
                                        ),
                (this.isDisabled = !0)
              }),
              (a.prototype.wrap = function (r) {
                (0, _.wrap)(r, this.element)
              }),
              (a.prototype.unwrap = function (r) {
                this.element.parentNode &&
                                    (this.element.parentNode.insertBefore(
                                      r,
                                      this.element
                                    ),
                                    this.element.parentNode.removeChild(
                                      this.element
                                    ))
              }),
              (a.prototype.addLoadingState = function () {
                this.element.classList.add(
                  this.classNames.loadingState
                ),
                this.element.setAttribute(
                  'aria-busy',
                  'true'
                ),
                (this.isLoading = !0)
              }),
              (a.prototype.removeLoadingState = function () {
                this.element.classList.remove(
                  this.classNames.loadingState
                ),
                this.element.removeAttribute('aria-busy'),
                (this.isLoading = !1)
              }),
              (a.prototype._onFocus = function () {
                this.isFocussed = !0
              }),
              (a.prototype._onBlur = function () {
                this.isFocussed = !1
              }),
              a
            )
          })()
          i.default = d
        },
        217: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
          const b = (function () {
            function _ (h) {
              const d = h.element
              const a = h.type
              const r = h.classNames;
              (this.element = d),
              (this.classNames = r),
              (this.type = a),
              (this.isActive = !1)
            }
            return (
              Object.defineProperty(
                _.prototype,
                'distanceFromTopWindow',
                {
                  get: function () {
                    return this.element.getBoundingClientRect()
                      .bottom
                  },
                  enumerable: !1,
                  configurable: !0
                }
              ),
              (_.prototype.getChild = function (h) {
                return this.element.querySelector(h)
              }),
              (_.prototype.show = function () {
                return (
                  this.element.classList.add(
                    this.classNames.activeState
                  ),
                  this.element.setAttribute(
                    'aria-expanded',
                    'true'
                  ),
                  (this.isActive = !0),
                  this
                )
              }),
              (_.prototype.hide = function () {
                return (
                  this.element.classList.remove(
                    this.classNames.activeState
                  ),
                  this.element.setAttribute(
                    'aria-expanded',
                    'false'
                  ),
                  (this.isActive = !1),
                  this
                )
              }),
              _
            )
          })()
          i.default = b
        },
        520: function (j, i, b) {
          const _ =
                        (this && this.__importDefault) ||
                        function (O) {
                          return O && O.__esModule ? O : { default: O }
                        }
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.WrappedSelect =
                            i.WrappedInput =
                            i.List =
                            i.Input =
                            i.Container =
                            i.Dropdown =
                                void 0)
          const h = _(b(217))
          i.Dropdown = h.default
          const d = _(b(613))
          i.Container = d.default
          const a = _(b(11))
          i.Input = a.default
          const r = _(b(624))
          i.List = r.default
          const c = _(b(541))
          i.WrappedInput = c.default
          const l = _(b(982))
          i.WrappedSelect = l.default
        },
        11: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 })
          const _ = b(799)
          const h = b(883)
          const d = (function () {
            function a (r) {
              const c = r.element
              const l = r.type
              const O = r.classNames
              const L = r.preventPaste;
              (this.element = c),
              (this.type = l),
              (this.classNames = O),
              (this.preventPaste = L),
              (this.isFocussed = this.element.isEqualNode(
                document.activeElement
              )),
              (this.isDisabled = c.disabled),
              (this._onPaste = this._onPaste.bind(this)),
              (this._onInput = this._onInput.bind(this)),
              (this._onFocus = this._onFocus.bind(this)),
              (this._onBlur = this._onBlur.bind(this))
            }
            return (
              Object.defineProperty(a.prototype, 'placeholder', {
                set: function (r) {
                  this.element.placeholder = r
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(a.prototype, 'value', {
                get: function () {
                  return (0, _.sanitise)(this.element.value)
                },
                set: function (r) {
                  this.element.value = r
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(a.prototype, 'rawValue', {
                get: function () {
                  return this.element.value
                },
                enumerable: !1,
                configurable: !0
              }),
              (a.prototype.addEventListeners = function () {
                this.element.addEventListener(
                  'paste',
                  this._onPaste
                ),
                this.element.addEventListener(
                  'input',
                  this._onInput,
                  { passive: !0 }
                ),
                this.element.addEventListener(
                  'focus',
                  this._onFocus,
                  { passive: !0 }
                ),
                this.element.addEventListener(
                  'blur',
                  this._onBlur,
                  { passive: !0 }
                )
              }),
              (a.prototype.removeEventListeners = function () {
                this.element.removeEventListener(
                  'input',
                  this._onInput
                ),
                this.element.removeEventListener(
                  'paste',
                  this._onPaste
                ),
                this.element.removeEventListener(
                  'focus',
                  this._onFocus
                ),
                this.element.removeEventListener(
                  'blur',
                  this._onBlur
                )
              }),
              (a.prototype.enable = function () {
                this.element.removeAttribute('disabled'),
                (this.isDisabled = !1)
              }),
              (a.prototype.disable = function () {
                this.element.setAttribute('disabled', ''),
                (this.isDisabled = !0)
              }),
              (a.prototype.focus = function () {
                this.isFocussed || this.element.focus()
              }),
              (a.prototype.blur = function () {
                this.isFocussed && this.element.blur()
              }),
              (a.prototype.clear = function (r) {
                return (
                  r === void 0 && (r = !0),
                  this.element.value &&
                                        (this.element.value = ''),
                  r && this.setWidth(),
                  this
                )
              }),
              (a.prototype.setWidth = function () {
                const r = this.element
                const c = r.style
                const l = r.value
                const O = r.placeholder;
                (c.minWidth = ''.concat(O.length + 1, 'ch')),
                (c.width = ''.concat(l.length + 1, 'ch'))
              }),
              (a.prototype.setActiveDescendant = function (r) {
                this.element.setAttribute(
                  'aria-activedescendant',
                  r
                )
              }),
              (a.prototype.removeActiveDescendant = function () {
                this.element.removeAttribute(
                  'aria-activedescendant'
                )
              }),
              (a.prototype._onInput = function () {
                this.type !== h.SELECT_ONE_TYPE &&
                                    this.setWidth()
              }),
              (a.prototype._onPaste = function (r) {
                this.preventPaste && r.preventDefault()
              }),
              (a.prototype._onFocus = function () {
                this.isFocussed = !0
              }),
              (a.prototype._onBlur = function () {
                this.isFocussed = !1
              }),
              a
            )
          })()
          i.default = d
        },
        624: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 })
          const _ = b(883)
          const h = (function () {
            function d (a) {
              const r = a.element;
              (this.element = r),
              (this.scrollPos = this.element.scrollTop),
              (this.height = this.element.offsetHeight)
            }
            return (
              (d.prototype.clear = function () {
                this.element.innerHTML = ''
              }),
              (d.prototype.append = function (a) {
                this.element.appendChild(a)
              }),
              (d.prototype.getChild = function (a) {
                return this.element.querySelector(a)
              }),
              (d.prototype.hasChildren = function () {
                return this.element.hasChildNodes()
              }),
              (d.prototype.scrollToTop = function () {
                this.element.scrollTop = 0
              }),
              (d.prototype.scrollToChildElement = function (
                a,
                r
              ) {
                const c = this
                if (a) {
                  const l = this.element.offsetHeight
                  const O = this.element.scrollTop + l
                  const L = a.offsetHeight
                  const y = a.offsetTop + L
                  const D =
                                        r > 0
                                          ? this.element.scrollTop + y - O
                                          : a.offsetTop
                  requestAnimationFrame(function () {
                    c._animateScroll(D, r)
                  })
                }
              }),
              (d.prototype._scrollDown = function (a, r, c) {
                const l = (c - a) / r
                const O = l > 1 ? l : 1
                this.element.scrollTop = a + O
              }),
              (d.prototype._scrollUp = function (a, r, c) {
                const l = (a - c) / r
                const O = l > 1 ? l : 1
                this.element.scrollTop = a - O
              }),
              (d.prototype._animateScroll = function (a, r) {
                const c = this
                const l = _.SCROLLING_SPEED
                const O = this.element.scrollTop
                let L = !1
                r > 0
                  ? (this._scrollDown(O, l, a),
                    O < a && (L = !0))
                  : (this._scrollUp(O, l, a),
                    O > a && (L = !0)),
                L &&
                                        requestAnimationFrame(function () {
                                          c._animateScroll(a, r)
                                        })
              }),
              d
            )
          })()
          i.default = h
        },
        730: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 })
          const _ = b(799)
          const h = (function () {
            function d (a) {
              const r = a.element
              const c = a.classNames
              if (
                ((this.element = r),
                (this.classNames = c),
                !(r instanceof HTMLInputElement) &&
                                    !(r instanceof HTMLSelectElement))
              ) {
                throw new TypeError('Invalid element passed')
              }
              this.isDisabled = !1
            }
            return (
              Object.defineProperty(d.prototype, 'isActive', {
                get: function () {
                  return (
                    this.element.dataset.choice === 'active'
                  )
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(d.prototype, 'dir', {
                get: function () {
                  return this.element.dir
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(d.prototype, 'value', {
                get: function () {
                  return this.element.value
                },
                set: function (a) {
                  this.element.value = a
                },
                enumerable: !1,
                configurable: !0
              }),
              (d.prototype.conceal = function () {
                this.element.classList.add(
                  this.classNames.input
                ),
                (this.element.hidden = !0),
                (this.element.tabIndex = -1)
                const a = this.element.getAttribute('style')
                a &&
                                    this.element.setAttribute(
                                      'data-choice-orig-style',
                                      a
                                    ),
                this.element.setAttribute(
                  'data-choice',
                  'active'
                )
              }),
              (d.prototype.reveal = function () {
                this.element.classList.remove(
                  this.classNames.input
                ),
                (this.element.hidden = !1),
                this.element.removeAttribute('tabindex')
                const a = this.element.getAttribute(
                  'data-choice-orig-style'
                )
                a
                  ? (this.element.removeAttribute(
                      'data-choice-orig-style'
                    ),
                    this.element.setAttribute('style', a))
                  : this.element.removeAttribute('style'),
                this.element.removeAttribute('data-choice'),
                (this.element.value = this.element.value)
              }),
              (d.prototype.enable = function () {
                this.element.removeAttribute('disabled'),
                (this.element.disabled = !1),
                (this.isDisabled = !1)
              }),
              (d.prototype.disable = function () {
                this.element.setAttribute('disabled', ''),
                (this.element.disabled = !0),
                (this.isDisabled = !0)
              }),
              (d.prototype.triggerEvent = function (a, r) {
                (0, _.dispatchEvent)(this.element, a, r)
              }),
              d
            )
          })()
          i.default = h
        },
        541: function (j, i, b) {
          const _ =
                        (this && this.__extends) ||
                        (function () {
                          let r = function (c, l) {
                            return (
                              (r =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (O, L) {
                                              O.__proto__ = L
                                            }) ||
                                        function (O, L) {
                                          for (const y in L) {
                                            Object.prototype.hasOwnProperty.call(
                                              L,
                                              y
                                            ) && (O[y] = L[y])
                                          }
                                        }),
                              r(c, l)
                            )
                          }
                          return function (c, l) {
                            if (typeof l !== 'function' && l !== null) {
                              throw new TypeError(
                                'Class extends value ' +
                                            String(l) +
                                            ' is not a constructor or null'
                              )
                            }
                            r(c, l)
                            function O () {
                              this.constructor = c
                            }
                            c.prototype =
                                    l === null
                                      ? Object.create(l)
                                      : ((O.prototype = l.prototype),
                                        new O())
                          }
                        })()
          const h =
                        (this && this.__importDefault) ||
                        function (r) {
                          return r && r.__esModule ? r : { default: r }
                        }
          Object.defineProperty(i, '__esModule', { value: !0 })
          const d = h(b(730))
          const a = (function (r) {
            _(c, r)
            function c (l) {
              const O = l.element
              const L = l.classNames
              const y = l.delimiter
              const D =
                                r.call(this, {
                                  element: O,
                                  classNames: L
                                }) || this
              return (D.delimiter = y), D
            }
            return (
              Object.defineProperty(c.prototype, 'value', {
                get: function () {
                  return this.element.value
                },
                set: function (l) {
                  this.element.setAttribute('value', l),
                  (this.element.value = l)
                },
                enumerable: !1,
                configurable: !0
              }),
              c
            )
          })(d.default)
          i.default = a
        },
        982: function (j, i, b) {
          const _ =
                        (this && this.__extends) ||
                        (function () {
                          let r = function (c, l) {
                            return (
                              (r =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (O, L) {
                                              O.__proto__ = L
                                            }) ||
                                        function (O, L) {
                                          for (const y in L) {
                                            Object.prototype.hasOwnProperty.call(
                                              L,
                                              y
                                            ) && (O[y] = L[y])
                                          }
                                        }),
                              r(c, l)
                            )
                          }
                          return function (c, l) {
                            if (typeof l !== 'function' && l !== null) {
                              throw new TypeError(
                                'Class extends value ' +
                                            String(l) +
                                            ' is not a constructor or null'
                              )
                            }
                            r(c, l)
                            function O () {
                              this.constructor = c
                            }
                            c.prototype =
                                    l === null
                                      ? Object.create(l)
                                      : ((O.prototype = l.prototype),
                                        new O())
                          }
                        })()
          const h =
                        (this && this.__importDefault) ||
                        function (r) {
                          return r && r.__esModule ? r : { default: r }
                        }
          Object.defineProperty(i, '__esModule', { value: !0 })
          const d = h(b(730))
          const a = (function (r) {
            _(c, r)
            function c (l) {
              const O = l.element
              const L = l.classNames
              const y = l.template
              const D =
                                r.call(this, {
                                  element: O,
                                  classNames: L
                                }) || this
              return (D.template = y), D
            }
            return (
              Object.defineProperty(
                c.prototype,
                'placeholderOption',
                {
                  get: function () {
                    return (
                      this.element.querySelector(
                        'option[value=""]'
                      ) ||
                                            this.element.querySelector(
                                              'option[placeholder]'
                                            )
                    )
                  },
                  enumerable: !1,
                  configurable: !0
                }
              ),
              Object.defineProperty(c.prototype, 'optionGroups', {
                get: function () {
                  return Array.from(
                    this.element.getElementsByTagName(
                      'OPTGROUP'
                    )
                  )
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(c.prototype, 'options', {
                get: function () {
                  return Array.from(this.element.options)
                },
                set: function (l) {
                  const O = this
                  const L = document.createDocumentFragment()
                  const y = function (D) {
                    const k = O.template(D)
                    L.appendChild(k)
                  }
                  l.forEach(function (D) {
                    return y(D)
                  }),
                  this.appendDocFragment(L)
                },
                enumerable: !1,
                configurable: !0
              }),
              (c.prototype.appendDocFragment = function (l) {
                (this.element.innerHTML = ''),
                this.element.appendChild(l)
              }),
              c
            )
          })(d.default)
          i.default = a
        },
        883: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.SCROLLING_SPEED =
                            i.SELECT_MULTIPLE_TYPE =
                            i.SELECT_ONE_TYPE =
                            i.TEXT_TYPE =
                            i.KEY_CODES =
                            i.ACTION_TYPES =
                            i.EVENTS =
                                void 0),
          (i.EVENTS = {
            showDropdown: 'showDropdown',
            hideDropdown: 'hideDropdown',
            change: 'change',
            choice: 'choice',
            search: 'search',
            addItem: 'addItem',
            removeItem: 'removeItem',
            highlightItem: 'highlightItem',
            highlightChoice: 'highlightChoice',
            unhighlightItem: 'unhighlightItem'
          }),
          (i.ACTION_TYPES = {
            ADD_CHOICE: 'ADD_CHOICE',
            FILTER_CHOICES: 'FILTER_CHOICES',
            ACTIVATE_CHOICES: 'ACTIVATE_CHOICES',
            CLEAR_CHOICES: 'CLEAR_CHOICES',
            ADD_GROUP: 'ADD_GROUP',
            ADD_ITEM: 'ADD_ITEM',
            REMOVE_ITEM: 'REMOVE_ITEM',
            HIGHLIGHT_ITEM: 'HIGHLIGHT_ITEM',
            CLEAR_ALL: 'CLEAR_ALL',
            RESET_TO: 'RESET_TO',
            SET_IS_LOADING: 'SET_IS_LOADING'
          }),
          (i.KEY_CODES = {
            BACK_KEY: 46,
            DELETE_KEY: 8,
            ENTER_KEY: 13,
            A_KEY: 65,
            ESC_KEY: 27,
            UP_KEY: 38,
            DOWN_KEY: 40,
            PAGE_UP_KEY: 33,
            PAGE_DOWN_KEY: 34
          }),
          (i.TEXT_TYPE = 'text'),
          (i.SELECT_ONE_TYPE = 'select-one'),
          (i.SELECT_MULTIPLE_TYPE = 'select-multiple'),
          (i.SCROLLING_SPEED = 4)
        },
        789: function (j, i, b) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.DEFAULT_CONFIG = i.DEFAULT_CLASSNAMES = void 0)
          const _ = b(799);
          (i.DEFAULT_CLASSNAMES = {
            containerOuter: 'choices',
            containerInner: 'choices__inner',
            input: 'choices__input',
            inputCloned: 'choices__input--cloned',
            list: 'choices__list',
            listItems: 'choices__list--multiple',
            listSingle: 'choices__list--single',
            listDropdown: 'choices__list--dropdown',
            item: 'choices__item',
            itemSelectable: 'choices__item--selectable',
            itemDisabled: 'choices__item--disabled',
            itemChoice: 'choices__item--choice',
            placeholder: 'choices__placeholder',
            group: 'choices__group',
            groupHeading: 'choices__heading',
            button: 'choices__button',
            activeState: 'is-active',
            focusState: 'is-focused',
            openState: 'is-open',
            disabledState: 'is-disabled',
            highlightedState: 'is-highlighted',
            selectedState: 'is-selected',
            flippedState: 'is-flipped',
            loadingState: 'is-loading',
            noResults: 'has-no-results',
            noChoices: 'has-no-choices'
          }),
          (i.DEFAULT_CONFIG = {
            items: [],
            choices: [],
            silent: !1,
            renderChoiceLimit: -1,
            maxItemCount: -1,
            addItems: !0,
            addItemFilter: null,
            removeItems: !0,
            removeItemButton: !1,
            editItems: !1,
            allowHTML: !0,
            duplicateItemsAllowed: !0,
            delimiter: ',',
            paste: !0,
            searchEnabled: !0,
            searchChoices: !0,
            searchFloor: 1,
            searchResultLimit: 4,
            searchFields: ['label', 'value'],
            position: 'auto',
            resetScrollPosition: !0,
            shouldSort: !0,
            shouldSortItems: !1,
            sorter: _.sortByAlpha,
            placeholder: !0,
            placeholderValue: null,
            searchPlaceholderValue: null,
            prependValue: null,
            appendValue: null,
            renderSelectedChoices: 'auto',
            loadingText: 'Loading...',
            noResultsText: 'No results found',
            noChoicesText: 'No choices to choose from',
            itemSelectText: 'Press to select',
            uniqueItemText: 'Only unique values can be added',
            customAddItemText:
                                'Only values matching specific conditions can be added',
            addItemText: function (h) {
              return 'Press Enter to add <b>"'.concat(
                (0, _.sanitise)(h),
                '"</b>'
              )
            },
            maxItemText: function (h) {
              return 'Only '.concat(
                h,
                ' values can be added'
              )
            },
            valueComparer: function (h, d) {
              return h === d
            },
            fuseOptions: { includeScore: !0 },
            labelId: '',
            callbackOnInit: null,
            callbackOnCreateTemplates: null,
            classNames: i.DEFAULT_CLASSNAMES
          })
        },
        18: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        978: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        948: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        359: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        285: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        533: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        187: function (j, i, b) {
          const _ =
                        (this && this.__createBinding) ||
                        (Object.create
                          ? function (d, a, r, c) {
                            c === void 0 && (c = r)
                            let l = Object.getOwnPropertyDescriptor(a, r);
                            (!l ||
                                      ('get' in l
                                        ? !a.__esModule
                                        : l.writable || l.configurable)) &&
                                      (l = {
                                        enumerable: !0,
                                        get: function () {
                                          return a[r]
                                        }
                                      }),
                            Object.defineProperty(d, c, l)
                          }
                          : function (d, a, r, c) {
                            c === void 0 && (c = r), (d[c] = a[r])
                          })
          const h =
                        (this && this.__exportStar) ||
                        function (d, a) {
                          for (const r in d) {
                            r !== 'default' &&
                                    !Object.prototype.hasOwnProperty.call(
                                      a,
                                      r
                                    ) &&
                                    _(a, d, r)
                          }
                        }
          Object.defineProperty(i, '__esModule', { value: !0 }),
          h(b(18), i),
          h(b(978), i),
          h(b(948), i),
          h(b(359), i),
          h(b(285), i),
          h(b(533), i),
          h(b(287), i),
          h(b(132), i),
          h(b(837), i),
          h(b(598), i),
          h(b(369), i),
          h(b(37), i),
          h(b(47), i),
          h(b(923), i),
          h(b(876), i)
        },
        287: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        132: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        837: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        598: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        37: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        369: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        47: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        923: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        876: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
        },
        799: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.parseCustomProperties =
                            i.diff =
                            i.cloneObject =
                            i.existsInArray =
                            i.dispatchEvent =
                            i.sortByScore =
                            i.sortByAlpha =
                            i.strToEl =
                            i.sanitise =
                            i.isScrolledIntoView =
                            i.getAdjacentEl =
                            i.wrap =
                            i.isType =
                            i.getType =
                            i.generateId =
                            i.generateChars =
                            i.getRandomNumber =
                                void 0)
          const b = function (E, w) {
            return Math.floor(Math.random() * (w - E) + E)
          }
          i.getRandomNumber = b
          const _ = function (E) {
            return Array.from({ length: E }, function () {
              return (0, i.getRandomNumber)(0, 36).toString(36)
            }).join('')
          }
          i.generateChars = _
          const h = function (E, w) {
            let N =
                            E.id ||
                            (E.name &&
                                ''
                                  .concat(E.name, '-')
                                  .concat((0, i.generateChars)(2))) ||
                            (0, i.generateChars)(4)
            return (
              (N = N.replace(/(:|\.|\[|\]|,)/g, '')),
              (N = ''.concat(w, '-').concat(N)),
              N
            )
          }
          i.generateId = h
          const d = function (E) {
            return Object.prototype.toString.call(E).slice(8, -1)
          }
          i.getType = d
          const a = function (E, w) {
            return w != null && (0, i.getType)(w) === E
          }
          i.isType = a
          const r = function (E, w) {
            return (
              w === void 0 && (w = document.createElement('div')),
              E.parentNode &&
                                (E.nextSibling
                                  ? E.parentNode.insertBefore(
                                    w,
                                    E.nextSibling
                                  )
                                  : E.parentNode.appendChild(w)),
              w.appendChild(E)
            )
          }
          i.wrap = r
          const c = function (E, w, N) {
            N === void 0 && (N = 1)
            for (
              var g = ''.concat(
                  N > 0 ? 'next' : 'previous',
                  'ElementSibling'
                ),
                e = E[g];
              e;

            ) {
              if (e.matches(w)) return e
              e = e[g]
            }
            return e
          }
          i.getAdjacentEl = c
          const l = function (E, w, N) {
            if ((N === void 0 && (N = 1), !E)) return !1
            let g
            return (
              N > 0
                ? (g =
                                      w.scrollTop + w.offsetHeight >=
                                      E.offsetTop + E.offsetHeight)
                : (g = E.offsetTop >= w.scrollTop),
              g
            )
          }
          i.isScrolledIntoView = l
          const O = function (E) {
            return typeof E !== 'string'
              ? E
              : E.replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
          };
          (i.sanitise = O),
          (i.strToEl = (function () {
            const E = document.createElement('div')
            return function (w) {
              const N = w.trim()
              E.innerHTML = N
              for (var g = E.children[0]; E.firstChild;) {
                E.removeChild(E.firstChild)
              }
              return g
            }
          })())
          const L = function (E, w) {
            const N = E.value
            const g = E.label
            const e = g === void 0 ? N : g
            const t = w.value
            const n = w.label
            const s = n === void 0 ? t : n
            return e.localeCompare(s, [], {
              sensitivity: 'base',
              ignorePunctuation: !0,
              numeric: !0
            })
          }
          i.sortByAlpha = L
          const y = function (E, w) {
            const N = E.score
            const g = N === void 0 ? 0 : N
            const e = w.score
            const t = e === void 0 ? 0 : e
            return g - t
          }
          i.sortByScore = y
          const D = function (E, w, N) {
            N === void 0 && (N = null)
            const g = new CustomEvent(w, {
              detail: N,
              bubbles: !0,
              cancelable: !0
            })
            return E.dispatchEvent(g)
          }
          i.dispatchEvent = D
          const k = function (E, w, N) {
            return (
              N === void 0 && (N = 'value'),
              E.some(function (g) {
                return typeof w === 'string'
                  ? g[N] === w.trim()
                  : g[N] === w
              })
            )
          }
          i.existsInArray = k
          const Q = function (E) {
            return JSON.parse(JSON.stringify(E))
          }
          i.cloneObject = Q
          const Z = function (E, w) {
            const N = Object.keys(E).sort()
            const g = Object.keys(w).sort()
            return N.filter(function (e) {
              return g.indexOf(e) < 0
            })
          }
          i.diff = Z
          const ne = function (E) {
            if (typeof E < 'u') {
              try {
                return JSON.parse(E)
              } catch {
                return E
              }
            }
            return {}
          }
          i.parseCustomProperties = ne
        },
        273: function (j, i) {
          const b =
                        (this && this.__spreadArray) ||
                        function (h, d, a) {
                          if (a || arguments.length === 2) {
                            for (var r = 0, c = d.length, l; r < c; r++) {
                              (l || !(r in d)) &&
                                        (l ||
                                            (l = Array.prototype.slice.call(
                                              d,
                                              0,
                                              r
                                            )),
                                        (l[r] = d[r]))
                            }
                          }
                          return h.concat(l || Array.prototype.slice.call(d))
                        }
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.defaultState = void 0),
          (i.defaultState = [])
          function _ (h, d) {
            switch (
              (h === void 0 && (h = i.defaultState),
              d === void 0 && (d = {}),
              d.type)
            ) {
              case 'ADD_CHOICE': {
                const a = d
                const r = {
                  id: a.id,
                  elementId: a.elementId,
                  groupId: a.groupId,
                  value: a.value,
                  label: a.label || a.value,
                  disabled: a.disabled || !1,
                  selected: !1,
                  active: !0,
                  score: 9999,
                  customProperties: a.customProperties,
                  placeholder: a.placeholder || !1
                }
                return b(b([], h, !0), [r], !1)
              }
              case 'ADD_ITEM': {
                const c = d
                return c.choiceId > -1
                  ? h.map(function (y) {
                    const D = y
                    return (
                      D.id ===
                                                  parseInt(
                                                    ''.concat(c.choiceId),
                                                    10
                                                  ) && (D.selected = !0),
                      D
                    )
                  })
                  : h
              }
              case 'REMOVE_ITEM': {
                const l = d
                return l.choiceId && l.choiceId > -1
                  ? h.map(function (y) {
                    const D = y
                    return (
                      D.id ===
                                                  parseInt(
                                                    ''.concat(l.choiceId),
                                                    10
                                                  ) && (D.selected = !1),
                      D
                    )
                  })
                  : h
              }
              case 'FILTER_CHOICES': {
                const O = d
                return h.map(function (y) {
                  const D = y
                  return (
                    (D.active = O.results.some(
                      function (k) {
                        const Q = k.item
                        const Z = k.score
                        return Q.id === D.id
                          ? ((D.score = Z), !0)
                          : !1
                      }
                    )),
                    D
                  )
                })
              }
              case 'ACTIVATE_CHOICES': {
                const L = d
                return h.map(function (y) {
                  const D = y
                  return (D.active = L.active), D
                })
              }
              case 'CLEAR_CHOICES':
                return i.defaultState
              default:
                return h
            }
          }
          i.default = _
        },
        871: function (j, i) {
          const b =
                        (this && this.__spreadArray) ||
                        function (h, d, a) {
                          if (a || arguments.length === 2) {
                            for (var r = 0, c = d.length, l; r < c; r++) {
                              (l || !(r in d)) &&
                                        (l ||
                                            (l = Array.prototype.slice.call(
                                              d,
                                              0,
                                              r
                                            )),
                                        (l[r] = d[r]))
                            }
                          }
                          return h.concat(l || Array.prototype.slice.call(d))
                        }
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.defaultState = void 0),
          (i.defaultState = [])
          function _ (h, d) {
            switch (
              (h === void 0 && (h = i.defaultState),
              d === void 0 && (d = {}),
              d.type)
            ) {
              case 'ADD_GROUP': {
                const a = d
                return b(
                  b([], h, !0),
                  [
                    {
                      id: a.id,
                      value: a.value,
                      active: a.active,
                      disabled: a.disabled
                    }
                  ],
                  !1
                )
              }
              case 'CLEAR_CHOICES':
                return []
              default:
                return h
            }
          }
          i.default = _
        },
        655: function (j, i, b) {
          const _ =
                        (this && this.__importDefault) ||
                        function (y) {
                          return y && y.__esModule ? y : { default: y }
                        }
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.defaultState = void 0)
          const h = b(791)
          const d = _(b(52))
          const a = _(b(871))
          const r = _(b(273))
          const c = _(b(502))
          const l = b(799)
          i.defaultState = {
            groups: [],
            items: [],
            choices: [],
            loading: !1
          }
          const O = (0, h.combineReducers)({
            items: d.default,
            groups: a.default,
            choices: r.default,
            loading: c.default
          })
          const L = function (y, D) {
            let k = y
            if (D.type === 'CLEAR_ALL') k = i.defaultState
            else if (D.type === 'RESET_TO') {
              return (0, l.cloneObject)(D.state)
            }
            return O(k, D)
          }
          i.default = L
        },
        52: function (j, i) {
          const b =
                        (this && this.__spreadArray) ||
                        function (h, d, a) {
                          if (a || arguments.length === 2) {
                            for (var r = 0, c = d.length, l; r < c; r++) {
                              (l || !(r in d)) &&
                                        (l ||
                                            (l = Array.prototype.slice.call(
                                              d,
                                              0,
                                              r
                                            )),
                                        (l[r] = d[r]))
                            }
                          }
                          return h.concat(l || Array.prototype.slice.call(d))
                        }
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.defaultState = void 0),
          (i.defaultState = [])
          function _ (h, d) {
            switch (
              (h === void 0 && (h = i.defaultState),
              d === void 0 && (d = {}),
              d.type)
            ) {
              case 'ADD_ITEM': {
                const a = d
                const r = b(
                  b([], h, !0),
                  [
                    {
                      id: a.id,
                      choiceId: a.choiceId,
                      groupId: a.groupId,
                      value: a.value,
                      label: a.label,
                      active: !0,
                      highlighted: !1,
                      customProperties:
                                                a.customProperties,
                      placeholder: a.placeholder || !1,
                      keyCode: null
                    }
                  ],
                  !1
                )
                return r.map(function (l) {
                  const O = l
                  return (O.highlighted = !1), O
                })
              }
              case 'REMOVE_ITEM':
                return h.map(function (l) {
                  const O = l
                  return O.id === d.id && (O.active = !1), O
                })
              case 'HIGHLIGHT_ITEM': {
                const c = d
                return h.map(function (l) {
                  const O = l
                  return (
                    O.id === c.id &&
                                            (O.highlighted = c.highlighted),
                    O
                  )
                })
              }
              default:
                return h
            }
          }
          i.default = _
        },
        502: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 }),
          (i.defaultState = void 0),
          (i.defaultState = !1)
          const b = function (_, h) {
            switch (
              (_ === void 0 && (_ = i.defaultState),
              h === void 0 && (h = {}),
              h.type)
            ) {
              case 'SET_IS_LOADING':
                return h.isLoading
              default:
                return _
            }
          }
          i.default = b
        },
        744: function (j, i, b) {
          const _ =
                        (this && this.__spreadArray) ||
                        function (c, l, O) {
                          if (O || arguments.length === 2) {
                            for (var L = 0, y = l.length, D; L < y; L++) {
                              (D || !(L in l)) &&
                                        (D ||
                                            (D = Array.prototype.slice.call(
                                              l,
                                              0,
                                              L
                                            )),
                                        (D[L] = l[L]))
                            }
                          }
                          return c.concat(D || Array.prototype.slice.call(l))
                        }
          const h =
                        (this && this.__importDefault) ||
                        function (c) {
                          return c && c.__esModule ? c : { default: c }
                        }
          Object.defineProperty(i, '__esModule', { value: !0 })
          const d = b(791)
          const a = h(b(655))
          const r = (function () {
            function c () {
              this._store = (0, d.createStore)(
                a.default,
                window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                    window.__REDUX_DEVTOOLS_EXTENSION__()
              )
            }
            return (
              (c.prototype.subscribe = function (l) {
                this._store.subscribe(l)
              }),
              (c.prototype.dispatch = function (l) {
                this._store.dispatch(l)
              }),
              Object.defineProperty(c.prototype, 'state', {
                get: function () {
                  return this._store.getState()
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(c.prototype, 'items', {
                get: function () {
                  return this.state.items
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(c.prototype, 'activeItems', {
                get: function () {
                  return this.items.filter(function (l) {
                    return l.active === !0
                  })
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(
                c.prototype,
                'highlightedActiveItems',
                {
                  get: function () {
                    return this.items.filter(function (l) {
                      return l.active && l.highlighted
                    })
                  },
                  enumerable: !1,
                  configurable: !0
                }
              ),
              Object.defineProperty(c.prototype, 'choices', {
                get: function () {
                  return this.state.choices
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(
                c.prototype,
                'activeChoices',
                {
                  get: function () {
                    return this.choices.filter(
                      function (l) {
                        return l.active === !0
                      }
                    )
                  },
                  enumerable: !1,
                  configurable: !0
                }
              ),
              Object.defineProperty(
                c.prototype,
                'selectableChoices',
                {
                  get: function () {
                    return this.choices.filter(
                      function (l) {
                        return l.disabled !== !0
                      }
                    )
                  },
                  enumerable: !1,
                  configurable: !0
                }
              ),
              Object.defineProperty(
                c.prototype,
                'searchableChoices',
                {
                  get: function () {
                    return this.selectableChoices.filter(
                      function (l) {
                        return l.placeholder !== !0
                      }
                    )
                  },
                  enumerable: !1,
                  configurable: !0
                }
              ),
              Object.defineProperty(
                c.prototype,
                'placeholderChoice',
                {
                  get: function () {
                    return _([], this.choices, !0)
                      .reverse()
                      .find(function (l) {
                        return l.placeholder === !0
                      })
                  },
                  enumerable: !1,
                  configurable: !0
                }
              ),
              Object.defineProperty(c.prototype, 'groups', {
                get: function () {
                  return this.state.groups
                },
                enumerable: !1,
                configurable: !0
              }),
              Object.defineProperty(c.prototype, 'activeGroups', {
                get: function () {
                  const l = this
                  const O = l.groups
                  const L = l.choices
                  return O.filter(function (y) {
                    const D =
                                            y.active === !0 &&
                                            y.disabled === !1
                    const k = L.some(function (Q) {
                      return (
                        Q.active === !0 &&
                                                Q.disabled === !1
                      )
                    })
                    return D && k
                  }, [])
                },
                enumerable: !1,
                configurable: !0
              }),
              (c.prototype.isLoading = function () {
                return this.state.loading
              }),
              (c.prototype.getChoiceById = function (l) {
                return this.activeChoices.find(function (O) {
                  return O.id === parseInt(l, 10)
                })
              }),
              (c.prototype.getGroupById = function (l) {
                return this.groups.find(function (O) {
                  return O.id === l
                })
              }),
              c
            )
          })()
          i.default = r
        },
        686: function (j, i) {
          Object.defineProperty(i, '__esModule', { value: !0 })
          const b = {
            containerOuter: function (_, h, d, a, r, c, l) {
              const O = _.classNames.containerOuter
              const L = Object.assign(
                document.createElement('div'),
                { className: O }
              )
              return (
                (L.dataset.type = c),
                h && (L.dir = h),
                a && (L.tabIndex = 0),
                d &&
                                    (L.setAttribute(
                                      'role',
                                      r ? 'combobox' : 'listbox'
                                    ),
                                    r &&
                                        L.setAttribute(
                                          'aria-autocomplete',
                                          'list'
                                        )),
                L.setAttribute('aria-haspopup', 'true'),
                L.setAttribute('aria-expanded', 'false'),
                l && L.setAttribute('aria-labelledby', l),
                L
              )
            },
            containerInner: function (_) {
              const h = _.classNames.containerInner
              return Object.assign(
                document.createElement('div'),
                { className: h }
              )
            },
            itemList: function (_, h) {
              const d = _.classNames
              const a = d.list
              const r = d.listSingle
              const c = d.listItems
              return Object.assign(
                document.createElement('div'),
                {
                  className: ''
                    .concat(a, ' ')
                    .concat(h ? r : c)
                }
              )
            },
            placeholder: function (_, h) {
              let d
              const a = _.allowHTML
              const r = _.classNames.placeholder
              return Object.assign(
                document.createElement('div'),
                ((d = { className: r }),
                (d[a ? 'innerHTML' : 'innerText'] = h),
                d)
              )
            },
            item: function (_, h, d) {
              let a
              let r
              const c = _.allowHTML
              const l = _.classNames
              const O = l.item
              const L = l.button
              const y = l.highlightedState
              const D = l.itemSelectable
              const k = l.placeholder
              const Q = h.id
              const Z = h.value
              const ne = h.label
              const E = h.customProperties
              const w = h.active
              const N = h.disabled
              const g = h.highlighted
              const e = h.placeholder
              const t = Object.assign(
                document.createElement('div'),
                ((a = { className: O }),
                (a[c ? 'innerHTML' : 'innerText'] = ne),
                a)
              )
              if (
                (Object.assign(t.dataset, {
                  item: '',
                  id: Q,
                  value: Z,
                  customProperties: E
                }),
                w && t.setAttribute('aria-selected', 'true'),
                N && t.setAttribute('aria-disabled', 'true'),
                e && t.classList.add(k),
                t.classList.add(g ? y : D),
                d)
              ) {
                N && t.classList.remove(D),
                (t.dataset.deletable = '')
                const n = 'Remove item'
                const s = Object.assign(
                  document.createElement('button'),
                  ((r = {
                    type: 'button',
                    className: L
                  }),
                  (r[c ? 'innerHTML' : 'innerText'] = n),
                  r)
                )
                s.setAttribute(
                  'aria-label',
                  ''.concat(n, ": '").concat(Z, "'")
                ),
                (s.dataset.button = ''),
                t.appendChild(s)
              }
              return t
            },
            choiceList: function (_, h) {
              const d = _.classNames.list
              const a = Object.assign(
                document.createElement('div'),
                { className: d }
              )
              return (
                h ||
                                    a.setAttribute(
                                      'aria-multiselectable',
                                      'true'
                                    ),
                a.setAttribute('role', 'listbox'),
                a
              )
            },
            choiceGroup: function (_, h) {
              let d
              const a = _.allowHTML
              const r = _.classNames
              const c = r.group
              const l = r.groupHeading
              const O = r.itemDisabled
              const L = h.id
              const y = h.value
              const D = h.disabled
              const k = Object.assign(
                document.createElement('div'),
                {
                  className: ''
                    .concat(c, ' ')
                    .concat(D ? O : '')
                }
              )
              return (
                k.setAttribute('role', 'group'),
                Object.assign(k.dataset, {
                  group: '',
                  id: L,
                  value: y
                }),
                D && k.setAttribute('aria-disabled', 'true'),
                k.appendChild(
                  Object.assign(
                    document.createElement('div'),
                    ((d = { className: l }),
                    (d[a ? 'innerHTML' : 'innerText'] = y),
                    d)
                  )
                ),
                k
              )
            },
            choice: function (_, h, d) {
              let a
              const r = _.allowHTML
              const c = _.classNames
              const l = c.item
              const O = c.itemChoice
              const L = c.itemSelectable
              const y = c.selectedState
              const D = c.itemDisabled
              const k = c.placeholder
              const Q = h.id
              const Z = h.value
              const ne = h.label
              const E = h.groupId
              const w = h.elementId
              const N = h.disabled
              const g = h.selected
              const e = h.placeholder
              const t = Object.assign(
                document.createElement('div'),
                ((a = { id: w }),
                (a[r ? 'innerHTML' : 'innerText'] = ne),
                (a.className = ''.concat(l, ' ').concat(O)),
                a)
              )
              return (
                g && t.classList.add(y),
                e && t.classList.add(k),
                t.setAttribute(
                  'role',
                  E && E > 0 ? 'treeitem' : 'option'
                ),
                Object.assign(t.dataset, {
                  choice: '',
                  id: Q,
                  value: Z,
                  selectText: d
                }),
                N
                  ? (t.classList.add(D),
                    (t.dataset.choiceDisabled = ''),
                    t.setAttribute('aria-disabled', 'true'))
                  : (t.classList.add(L),
                    (t.dataset.choiceSelectable = '')),
                t
              )
            },
            input: function (_, h) {
              const d = _.classNames
              const a = d.input
              const r = d.inputCloned
              const c = Object.assign(
                document.createElement('input'),
                {
                  type: 'search',
                  name: 'search_terms',
                  className: ''.concat(a, ' ').concat(r),
                  autocomplete: 'off',
                  autocapitalize: 'off',
                  spellcheck: !1
                }
              )
              return (
                c.setAttribute('role', 'textbox'),
                c.setAttribute('aria-autocomplete', 'list'),
                c.setAttribute('aria-label', h),
                c
              )
            },
            dropdown: function (_) {
              const h = _.classNames
              const d = h.list
              const a = h.listDropdown
              const r = document.createElement('div')
              return (
                r.classList.add(d, a),
                r.setAttribute('aria-expanded', 'false'),
                r
              )
            },
            notice: function (_, h, d) {
              let a
              const r = _.allowHTML
              const c = _.classNames
              const l = c.item
              const O = c.itemChoice
              const L = c.noResults
              const y = c.noChoices
              d === void 0 && (d = '')
              const D = [l, O]
              return (
                d === 'no-choices'
                  ? D.push(y)
                  : d === 'no-results' && D.push(L),
                Object.assign(
                  document.createElement('div'),
                  ((a = {}),
                  (a[r ? 'innerHTML' : 'innerText'] = h),
                  (a.className = D.join(' ')),
                  a)
                )
              )
            },
            option: function (_) {
              const h = _.label
              const d = _.value
              const a = _.customProperties
              const r = _.active
              const c = _.disabled
              const l = new Option(h, d, !1, r)
              return (
                a &&
                                    (l.dataset.customProperties = ''.concat(a)),
                (l.disabled = !!c),
                l
              )
            }
          }
          i.default = b
        },
        996: function (j) {
          const i = function (w) {
            return b(w) && !_(w)
          }
          function b (E) {
            return !!E && typeof E === 'object'
          }
          function _ (E) {
            const w = Object.prototype.toString.call(E)
            return (
              w === '[object RegExp]' ||
                            w === '[object Date]' ||
                            a(E)
            )
          }
          const h = typeof Symbol === 'function' && Symbol.for
          const d = h ? Symbol.for('react.element') : 60103
          function a (E) {
            return E.$$typeof === d
          }
          function r (E) {
            return Array.isArray(E) ? [] : {}
          }
          function c (E, w) {
            return w.clone !== !1 && w.isMergeableObject(E)
              ? Z(r(E), E, w)
              : E
          }
          function l (E, w, N) {
            return E.concat(w).map(function (g) {
              return c(g, N)
            })
          }
          function O (E, w) {
            if (!w.customMerge) return Z
            const N = w.customMerge(E)
            return typeof N === 'function' ? N : Z
          }
          function L (E) {
            return Object.getOwnPropertySymbols
              ? Object.getOwnPropertySymbols(E).filter(
                function (w) {
                  return E.propertyIsEnumerable(w)
                }
              )
              : []
          }
          function y (E) {
            return Object.keys(E).concat(L(E))
          }
          function D (E, w) {
            try {
              return w in E
            } catch {
              return !1
            }
          }
          function k (E, w) {
            return (
              D(E, w) &&
                            !(
                              Object.hasOwnProperty.call(E, w) &&
                                Object.propertyIsEnumerable.call(E, w)
                            )
            )
          }
          function Q (E, w, N) {
            const g = {}
            return (
              N.isMergeableObject(E) &&
                                y(E).forEach(function (e) {
                                  g[e] = c(E[e], N)
                                }),
              y(w).forEach(function (e) {
                k(E, e) ||
                                    (D(E, e) && N.isMergeableObject(w[e])
                                      ? (g[e] = O(e, N)(E[e], w[e], N))
                                      : (g[e] = c(w[e], N)))
              }),
              g
            )
          }
          function Z (E, w, N) {
            (N = N || {}),
            (N.arrayMerge = N.arrayMerge || l),
            (N.isMergeableObject = N.isMergeableObject || i),
            (N.cloneUnlessOtherwiseSpecified = c)
            const g = Array.isArray(w)
            const e = Array.isArray(E)
            const t = g === e
            return t
              ? g
                ? N.arrayMerge(E, w, N)
                : Q(E, w, N)
              : c(w, N)
          }
          Z.all = function (w, N) {
            if (!Array.isArray(w)) {
              throw new Error(
                'first argument should be an array'
              )
            }
            return w.reduce(function (g, e) {
              return Z(g, e, N)
            }, {})
          }
          const ne = Z
          j.exports = ne
        },
        221: function (j, i, b) {
          b.r(i),
          b.d(i, {
            default: function () {
              return Se
            }
          })
          function _ (p) {
            return Array.isArray
              ? Array.isArray(p)
              : k(p) === '[object Array]'
          }
          const h = 1 / 0
          function d (p) {
            if (typeof p === 'string') return p
            const o = p + ''
            return o == '0' && 1 / p == -h ? '-0' : o
          }
          function a (p) {
            return p == null ? '' : d(p)
          }
          function r (p) {
            return typeof p === 'string'
          }
          function c (p) {
            return typeof p === 'number'
          }
          function l (p) {
            return (
              p === !0 ||
                            p === !1 ||
                            (L(p) && k(p) == '[object Boolean]')
            )
          }
          function O (p) {
            return typeof p === 'object'
          }
          function L (p) {
            return O(p) && p !== null
          }
          function y (p) {
            return p != null
          }
          function D (p) {
            return !p.trim().length
          }
          function k (p) {
            return p == null
              ? p === void 0
                ? '[object Undefined]'
                : '[object Null]'
              : Object.prototype.toString.call(p)
          }
          const Q = 'Extended search is not available'
          const Z = "Incorrect 'index' type"
          const ne = (p) => `Invalid value for key ${p}`
          const E = (p) => `Pattern length exceeds max of ${p}.`
          const w = (p) => `Missing ${p} property in key`
          const N = (p) =>
                        `Property 'weight' in key '${p}' must be a positive integer`
          const g = Object.prototype.hasOwnProperty
          class e {
            constructor (o) {
              (this._keys = []), (this._keyMap = {})
              let m = 0
              o.forEach((S) => {
                const I = t(S);
                (m += I.weight),
                this._keys.push(I),
                (this._keyMap[I.id] = I),
                (m += I.weight)
              }),
              this._keys.forEach((S) => {
                S.weight /= m
              })
            }

            get (o) {
              return this._keyMap[o]
            }

            keys () {
              return this._keys
            }

            toJSON () {
              return JSON.stringify(this._keys)
            }
          }
          function t (p) {
            let o = null
            let m = null
            let S = null
            let I = 1
            let T = null
            if (r(p) || _(p)) (S = p), (o = n(p)), (m = s(p))
            else {
              if (!g.call(p, 'name')) {
                throw new Error(w('name'))
              }
              const A = p.name
              if (
                ((S = A),
                g.call(p, 'weight') && ((I = p.weight), I <= 0))
              ) {
                throw new Error(N(A))
              }
              (o = n(A)), (m = s(A)), (T = p.getFn)
            }
            return {
              path: o,
              id: m,
              weight: I,
              src: S,
              getFn: T
            }
          }
          function n (p) {
            return _(p) ? p : p.split('.')
          }
          function s (p) {
            return _(p) ? p.join('.') : p
          }
          function v (p, o) {
            const m = []
            let S = !1
            const I = (T, A, R) => {
              if (y(T)) {
                if (!A[R]) m.push(T)
                else {
                  const F = A[R]
                  const H = T[F]
                  if (!y(H)) return
                  if (
                    R === A.length - 1 &&
                                        (r(H) || c(H) || l(H))
                  ) {
                    m.push(a(H))
                  } else if (_(H)) {
                    S = !0
                    for (
                      let B = 0, x = H.length;
                      B < x;
                      B += 1
                    ) {
                      I(H[B], A, R + 1)
                    }
                  } else A.length && I(H, A, R + 1)
                }
              }
            }
            return I(p, r(o) ? o.split('.') : o, 0), S ? m : m[0]
          }
          const u = {
            ...{
              isCaseSensitive: !1,
              includeScore: !1,
              keys: [],
              shouldSort: !0,
              sortFn: (p, o) =>
                p.score === o.score
                  ? p.idx < o.idx
                    ? -1
                    : 1
                  : p.score < o.score
                    ? -1
                    : 1
            },
            ...{
              includeMatches: !1,
              findAllMatches: !1,
              minMatchCharLength: 1
            },
            ...{ location: 0, threshold: 0.6, distance: 100 },
            ...{
              useExtendedSearch: !1,
              getFn: v,
              ignoreLocation: !1,
              ignoreFieldNorm: !1,
              fieldNormWeight: 1
            }
          }
          const C = /[^ ]+/g
          function Y (p = 1, o = 3) {
            const m = new Map()
            const S = Math.pow(10, o)
            return {
              get (I) {
                const T = I.match(C).length
                if (m.has(T)) return m.get(T)
                const A = 1 / Math.pow(T, 0.5 * p)
                const R = parseFloat(Math.round(A * S) / S)
                return m.set(T, R), R
              },
              clear () {
                m.clear()
              }
            }
          }
          class V {
            constructor ({
              getFn: o = u.getFn,
              fieldNormWeight: m = u.fieldNormWeight
            } = {}) {
              (this.norm = Y(m, 3)),
              (this.getFn = o),
              (this.isCreated = !1),
              this.setIndexRecords()
            }

            setSources (o = []) {
              this.docs = o
            }

            setIndexRecords (o = []) {
              this.records = o
            }

            setKeys (o = []) {
              (this.keys = o),
              (this._keysMap = {}),
              o.forEach((m, S) => {
                this._keysMap[m.id] = S
              })
            }

            create () {
              this.isCreated ||
                                !this.docs.length ||
                                ((this.isCreated = !0),
                                r(this.docs[0])
                                  ? this.docs.forEach((o, m) => {
                                    this._addString(o, m)
                                  })
                                  : this.docs.forEach((o, m) => {
                                    this._addObject(o, m)
                                  }),
                                this.norm.clear())
            }

            add (o) {
              const m = this.size()
              r(o)
                ? this._addString(o, m)
                : this._addObject(o, m)
            }

            removeAt (o) {
              this.records.splice(o, 1)
              for (let m = o, S = this.size(); m < S; m += 1) {
                this.records[m].i -= 1
              }
            }

            getValueForItemAtKeyId (o, m) {
              return o[this._keysMap[m]]
            }

            size () {
              return this.records.length
            }

            _addString (o, m) {
              if (!y(o) || D(o)) return
              const S = { v: o, i: m, n: this.norm.get(o) }
              this.records.push(S)
            }

            _addObject (o, m) {
              const S = { i: m, $: {} }
              this.keys.forEach((I, T) => {
                const A = I.getFn
                  ? I.getFn(o)
                  : this.getFn(o, I.path)
                if (y(A)) {
                  if (_(A)) {
                    const R = []
                    const F = [
                      {
                        nestedArrIndex: -1,
                        value: A
                      }
                    ]
                    for (; F.length;) {
                      const {
                        nestedArrIndex: H,
                        value: B
                      } = F.pop()
                      if (y(B)) {
                        if (r(B) && !D(B)) {
                          const x = {
                            v: B,
                            i: H,
                            n: this.norm.get(B)
                          }
                          R.push(x)
                        } else {
                          _(B) &&
                                                        B.forEach((x, G) => {
                                                          F.push({
                                                            nestedArrIndex:
                                                                    G,
                                                            value: x
                                                          })
                                                        })
                        }
                      }
                    }
                    S.$[T] = R
                  } else if (r(A) && !D(A)) {
                    const R = {
                      v: A,
                      n: this.norm.get(A)
                    }
                    S.$[T] = R
                  }
                }
              }),
              this.records.push(S)
            }

            toJSON () {
              return {
                keys: this.keys,
                records: this.records
              }
            }
          }
          function U (
            p,
            o,
            {
              getFn: m = u.getFn,
              fieldNormWeight: S = u.fieldNormWeight
            } = {}
          ) {
            const I = new V({ getFn: m, fieldNormWeight: S })
            return (
              I.setKeys(p.map(t)), I.setSources(o), I.create(), I
            )
          }
          function $ (
            p,
            {
              getFn: o = u.getFn,
              fieldNormWeight: m = u.fieldNormWeight
            } = {}
          ) {
            const { keys: S, records: I } = p
            const T = new V({ getFn: o, fieldNormWeight: m })
            return T.setKeys(S), T.setIndexRecords(I), T
          }
          function W (
            p,
            {
              errors: o = 0,
              currentLocation: m = 0,
              expectedLocation: S = 0,
              distance: I = u.distance,
              ignoreLocation: T = u.ignoreLocation
            } = {}
          ) {
            const A = o / p.length
            if (T) return A
            const R = Math.abs(S - m)
            return I ? A + R / I : R ? 1 : A
          }
          function J (p = [], o = u.minMatchCharLength) {
            const m = []
            let S = -1
            let I = -1
            let T = 0
            for (let A = p.length; T < A; T += 1) {
              const R = p[T]
              R && S === -1
                ? (S = T)
                : !R &&
                                  S !== -1 &&
                                  ((I = T - 1),
                                  I - S + 1 >= o && m.push([S, I]),
                                  (S = -1))
            }
            return p[T - 1] && T - S >= o && m.push([S, T - 1]), m
          }
          const z = 32
          function ee (
            p,
            o,
            m,
            {
              location: S = u.location,
              distance: I = u.distance,
              threshold: T = u.threshold,
              findAllMatches: A = u.findAllMatches,
              minMatchCharLength: R = u.minMatchCharLength,
              includeMatches: F = u.includeMatches,
              ignoreLocation: H = u.ignoreLocation
            } = {}
          ) {
            if (o.length > z) throw new Error(E(z))
            const B = o.length
            const x = p.length
            const G = Math.max(0, Math.min(S, x))
            let q = T
            let re = G
            const ue = R > 1 || F
            const Ee = ue ? Array(x) : []
            let ve
            for (; (ve = p.indexOf(o, re)) > -1;) {
              const he = W(o, {
                currentLocation: ve,
                expectedLocation: G,
                distance: I,
                ignoreLocation: H
              })
              if (((q = Math.min(he, q)), (re = ve + B), ue)) {
                let ge = 0
                for (; ge < B;) {
                  (Ee[ve + ge] = 1), (ge += 1)
                }
              }
            }
            re = -1
            let Ie = []
            let be = 1
            let we = B + x
            const at = 1 << (B - 1)
            for (let he = 0; he < B; he += 1) {
              let ge = 0
              let ye = we
              for (; ge < ye;) {
                W(o, {
                  errors: he,
                  currentLocation: G + ye,
                  expectedLocation: G,
                  distance: I,
                  ignoreLocation: H
                }) <= q
                  ? (ge = ye)
                  : (we = ye),
                (ye = Math.floor((we - ge) / 2 + ge))
              }
              we = ye
              let Ue = Math.max(1, G - ye + 1)
              const Fe = A ? x : Math.min(G + ye, x) + B
              const Oe = Array(Fe + 2)
              Oe[Fe + 1] = (1 << he) - 1
              for (let fe = Fe; fe >= Ue; fe -= 1) {
                const Le = fe - 1
                const We = m[p.charAt(Le)]
                if (
                  (ue && (Ee[Le] = +!!We),
                  (Oe[fe] = ((Oe[fe + 1] << 1) | 1) & We),
                  he &&
                                        (Oe[fe] |=
                                            ((Ie[fe + 1] | Ie[fe]) << 1) |
                                            1 |
                                            Ie[fe + 1]),
                  Oe[fe] & at &&
                                        ((be = W(o, {
                                          errors: he,
                                          currentLocation: Le,
                                          expectedLocation: G,
                                          distance: I,
                                          ignoreLocation: H
                                        })),
                                        be <= q))
                ) {
                  if (((q = be), (re = Le), re <= G)) {
                    break
                  }
                  Ue = Math.max(1, 2 * G - re)
                }
              }
              if (
                W(o, {
                  errors: he + 1,
                  currentLocation: G,
                  expectedLocation: G,
                  distance: I,
                  ignoreLocation: H
                }) > q
              ) {
                break
              }
              Ie = Oe
            }
            const Ke = {
              isMatch: re >= 0,
              score: Math.max(0.001, be)
            }
            if (ue) {
              const he = J(Ee, R)
              he.length
                ? F && (Ke.indices = he)
                : (Ke.isMatch = !1)
            }
            return Ke
          }
          function ae (p) {
            const o = {}
            for (let m = 0, S = p.length; m < S; m += 1) {
              const I = p.charAt(m)
              o[I] = (o[I] || 0) | (1 << (S - m - 1))
            }
            return o
          }
          class ce {
            constructor (
              o,
              {
                location: m = u.location,
                threshold: S = u.threshold,
                distance: I = u.distance,
                includeMatches: T = u.includeMatches,
                findAllMatches: A = u.findAllMatches,
                minMatchCharLength: R = u.minMatchCharLength,
                isCaseSensitive: F = u.isCaseSensitive,
                ignoreLocation: H = u.ignoreLocation
              } = {}
            ) {
              if (
                ((this.options = {
                  location: m,
                  threshold: S,
                  distance: I,
                  includeMatches: T,
                  findAllMatches: A,
                  minMatchCharLength: R,
                  isCaseSensitive: F,
                  ignoreLocation: H
                }),
                (this.pattern = F ? o : o.toLowerCase()),
                (this.chunks = []),
                !this.pattern.length)
              ) {
                return
              }
              const B = (G, q) => {
                this.chunks.push({
                  pattern: G,
                  alphabet: ae(G),
                  startIndex: q
                })
              }
              const x = this.pattern.length
              if (x > z) {
                let G = 0
                const q = x % z
                const re = x - q
                for (; G < re;) {
                  B(this.pattern.substr(G, z), G), (G += z)
                }
                if (q) {
                  const ue = x - z
                  B(this.pattern.substr(ue), ue)
                }
              } else B(this.pattern, 0)
            }

            searchIn (o) {
              const { isCaseSensitive: m, includeMatches: S } =
                                this.options
              if (
                (m || (o = o.toLowerCase()), this.pattern === o)
              ) {
                const re = { isMatch: !0, score: 0 }
                return (
                  S && (re.indices = [[0, o.length - 1]]), re
                )
              }
              const {
                location: I,
                distance: T,
                threshold: A,
                findAllMatches: R,
                minMatchCharLength: F,
                ignoreLocation: H
              } = this.options
              let B = []
              let x = 0
              let G = !1
              this.chunks.forEach(
                ({
                  pattern: re,
                  alphabet: ue,
                  startIndex: Ee
                }) => {
                  const {
                    isMatch: ve,
                    score: Ie,
                    indices: be
                  } = ee(o, re, ue, {
                    location: I + Ee,
                    distance: T,
                    threshold: A,
                    findAllMatches: R,
                    minMatchCharLength: F,
                    includeMatches: S,
                    ignoreLocation: H
                  })
                  ve && (G = !0),
                  (x += Ie),
                  ve && be && (B = [...B, ...be])
                }
              )
              const q = {
                isMatch: G,
                score: G ? x / this.chunks.length : 1
              }
              return G && S && (q.indices = B), q
            }
          }
          class le {
            constructor (o) {
              this.pattern = o
            }

            static isMultiMatch (o) {
              return _e(o, this.multiRegex)
            }

            static isSingleMatch (o) {
              return _e(o, this.singleRegex)
            }

            search () {}
          }
          function _e (p, o) {
            const m = p.match(o)
            return m ? m[1] : null
          }
          class te extends le {
            constructor (o) {
              super(o)
            }

            static get type () {
              return 'exact'
            }

            static get multiRegex () {
              return /^="(.*)"$/
            }

            static get singleRegex () {
              return /^=(.*)$/
            }

            search (o) {
              const m = o === this.pattern
              return {
                isMatch: m,
                score: m ? 0 : 1,
                indices: [0, this.pattern.length - 1]
              }
            }
          }
          class de extends le {
            constructor (o) {
              super(o)
            }

            static get type () {
              return 'inverse-exact'
            }

            static get multiRegex () {
              return /^!"(.*)"$/
            }

            static get singleRegex () {
              return /^!(.*)$/
            }

            search (o) {
              const S = o.indexOf(this.pattern) === -1
              return {
                isMatch: S,
                score: S ? 0 : 1,
                indices: [0, o.length - 1]
              }
            }
          }
          class pe extends le {
            constructor (o) {
              super(o)
            }

            static get type () {
              return 'prefix-exact'
            }

            static get multiRegex () {
              return /^\^"(.*)"$/
            }

            static get singleRegex () {
              return /^\^(.*)$/
            }

            search (o) {
              const m = o.startsWith(this.pattern)
              return {
                isMatch: m,
                score: m ? 0 : 1,
                indices: [0, this.pattern.length - 1]
              }
            }
          }
          class oe extends le {
            constructor (o) {
              super(o)
            }

            static get type () {
              return 'inverse-prefix-exact'
            }

            static get multiRegex () {
              return /^!\^"(.*)"$/
            }

            static get singleRegex () {
              return /^!\^(.*)$/
            }

            search (o) {
              const m = !o.startsWith(this.pattern)
              return {
                isMatch: m,
                score: m ? 0 : 1,
                indices: [0, o.length - 1]
              }
            }
          }
          class Te extends le {
            constructor (o) {
              super(o)
            }

            static get type () {
              return 'suffix-exact'
            }

            static get multiRegex () {
              return /^"(.*)"\$$/
            }

            static get singleRegex () {
              return /^(.*)\$$/
            }

            search (o) {
              const m = o.endsWith(this.pattern)
              return {
                isMatch: m,
                score: m ? 0 : 1,
                indices: [
                  o.length - this.pattern.length,
                  o.length - 1
                ]
              }
            }
          }
          class Pe extends le {
            constructor (o) {
              super(o)
            }

            static get type () {
              return 'inverse-suffix-exact'
            }

            static get multiRegex () {
              return /^!"(.*)"\$$/
            }

            static get singleRegex () {
              return /^!(.*)\$$/
            }

            search (o) {
              const m = !o.endsWith(this.pattern)
              return {
                isMatch: m,
                score: m ? 0 : 1,
                indices: [0, o.length - 1]
              }
            }
          }
          class He extends le {
            constructor (
              o,
              {
                location: m = u.location,
                threshold: S = u.threshold,
                distance: I = u.distance,
                includeMatches: T = u.includeMatches,
                findAllMatches: A = u.findAllMatches,
                minMatchCharLength: R = u.minMatchCharLength,
                isCaseSensitive: F = u.isCaseSensitive,
                ignoreLocation: H = u.ignoreLocation
              } = {}
            ) {
              super(o),
              (this._bitapSearch = new ce(o, {
                location: m,
                threshold: S,
                distance: I,
                includeMatches: T,
                findAllMatches: A,
                minMatchCharLength: R,
                isCaseSensitive: F,
                ignoreLocation: H
              }))
            }

            static get type () {
              return 'fuzzy'
            }

            static get multiRegex () {
              return /^"(.*)"$/
            }

            static get singleRegex () {
              return /^(.*)$/
            }

            search (o) {
              return this._bitapSearch.searchIn(o)
            }
          }
          class Be extends le {
            constructor (o) {
              super(o)
            }

            static get type () {
              return 'include'
            }

            static get multiRegex () {
              return /^'"(.*)"$/
            }

            static get singleRegex () {
              return /^'(.*)$/
            }

            search (o) {
              let m = 0
              let S
              const I = []
              const T = this.pattern.length
              for (; (S = o.indexOf(this.pattern, m)) > -1;) {
                (m = S + T), I.push([S, m - 1])
              }
              const A = !!I.length
              return {
                isMatch: A,
                score: A ? 0 : 1,
                indices: I
              }
            }
          }
          const Me = [te, Be, pe, oe, Pe, Te, de, He]
          const Ve = Me.length
          const Xe = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/
          const Je = '|'
          function Qe (p, o = {}) {
            return p.split(Je).map((m) => {
              const S = m
                .trim()
                .split(Xe)
                .filter((T) => T && !!T.trim())
              const I = []
              for (let T = 0, A = S.length; T < A; T += 1) {
                const R = S[T]
                let F = !1
                let H = -1
                for (; !F && ++H < Ve;) {
                  const B = Me[H]
                  const x = B.isMultiMatch(R)
                  x && (I.push(new B(x, o)), (F = !0))
                }
                if (!F) {
                  for (H = -1; ++H < Ve;) {
                    const B = Me[H]
                    const x = B.isSingleMatch(R)
                    if (x) {
                      I.push(new B(x, o))
                      break
                    }
                  }
                }
              }
              return I
            })
          }
          const Ze = new Set([He.type, Be.type])
          class qe {
            constructor (
              o,
              {
                isCaseSensitive: m = u.isCaseSensitive,
                includeMatches: S = u.includeMatches,
                minMatchCharLength: I = u.minMatchCharLength,
                ignoreLocation: T = u.ignoreLocation,
                findAllMatches: A = u.findAllMatches,
                location: R = u.location,
                threshold: F = u.threshold,
                distance: H = u.distance
              } = {}
            ) {
              (this.query = null),
              (this.options = {
                isCaseSensitive: m,
                includeMatches: S,
                minMatchCharLength: I,
                findAllMatches: A,
                ignoreLocation: T,
                location: R,
                threshold: F,
                distance: H
              }),
              (this.pattern = m ? o : o.toLowerCase()),
              (this.query = Qe(this.pattern, this.options))
            }

            static condition (o, m) {
              return m.useExtendedSearch
            }

            searchIn (o) {
              const m = this.query
              if (!m) return { isMatch: !1, score: 1 }
              const { includeMatches: S, isCaseSensitive: I } =
                                this.options
              o = I ? o : o.toLowerCase()
              let T = 0
              let A = []
              let R = 0
              for (let F = 0, H = m.length; F < H; F += 1) {
                const B = m[F];
                (A.length = 0), (T = 0)
                for (let x = 0, G = B.length; x < G; x += 1) {
                  const q = B[x]
                  const {
                    isMatch: re,
                    indices: ue,
                    score: Ee
                  } = q.search(o)
                  if (re) {
                    if (((T += 1), (R += Ee), S)) {
                      const ve = q.constructor.type
                      Ze.has(ve)
                        ? (A = [...A, ...ue])
                        : A.push(ue)
                    }
                  } else {
                    (R = 0), (T = 0), (A.length = 0)
                    break
                  }
                }
                if (T) {
                  const x = { isMatch: !0, score: R / T }
                  return S && (x.indices = A), x
                }
              }
              return { isMatch: !1, score: 1 }
            }
          }
          const De = []
          function et (...p) {
            De.push(...p)
          }
          function Ne (p, o) {
            for (let m = 0, S = De.length; m < S; m += 1) {
              const I = De[m]
              if (I.condition(p, o)) return new I(p, o)
            }
            return new ce(p, o)
          }
          const Ce = { AND: '$and', OR: '$or' }
          const je = { PATH: '$path', PATTERN: '$val' }
          const Re = (p) => !!(p[Ce.AND] || p[Ce.OR])
          const tt = (p) => !!p[je.PATH]
          const it = (p) => !_(p) && O(p) && !Re(p)
          const ke = (p) => ({
            [Ce.AND]: Object.keys(p).map((o) => ({
              [o]: p[o]
            }))
          })
          function xe (p, o, { auto: m = !0 } = {}) {
            const S = (I) => {
              const T = Object.keys(I)
              const A = tt(I)
              if (!A && T.length > 1 && !Re(I)) {
                return S(ke(I))
              }
              if (it(I)) {
                const F = A ? I[je.PATH] : T[0]
                const H = A ? I[je.PATTERN] : I[F]
                if (!r(H)) throw new Error(ne(F))
                const B = { keyId: s(F), pattern: H }
                return m && (B.searcher = Ne(H, o)), B
              }
              const R = { children: [], operator: T[0] }
              return (
                T.forEach((F) => {
                  const H = I[F]
                  _(H) &&
                                        H.forEach((B) => {
                                          R.children.push(S(B))
                                        })
                }),
                R
              )
            }
            return Re(p) || (p = ke(p)), S(p)
          }
          function nt (p, { ignoreFieldNorm: o = u.ignoreFieldNorm }) {
            p.forEach((m) => {
              let S = 1
              m.matches.forEach(
                ({ key: I, norm: T, score: A }) => {
                  const R = I ? I.weight : null
                  S *= Math.pow(
                    A === 0 && R ? Number.EPSILON : A,
                    (R || 1) * (o ? 1 : T)
                  )
                }
              ),
              (m.score = S)
            })
          }
          function rt (p, o) {
            const m = p.matches;
            (o.matches = []),
            y(m) &&
                                m.forEach((S) => {
                                  if (!y(S.indices) || !S.indices.length) {
                                    return
                                  }
                                  const { indices: I, value: T } = S
                                  const A = { indices: I, value: T }
                                  S.key && (A.key = S.key.src),
                                  S.idx > -1 && (A.refIndex = S.idx),
                                  o.matches.push(A)
                                })
          }
          function st (p, o) {
            o.score = p.score
          }
          function ot (
            p,
            o,
            {
              includeMatches: m = u.includeMatches,
              includeScore: S = u.includeScore
            } = {}
          ) {
            const I = []
            return (
              m && I.push(rt),
              S && I.push(st),
              p.map((T) => {
                const { idx: A } = T
                const R = { item: o[A], refIndex: A }
                return (
                  I.length &&
                                        I.forEach((F) => {
                                          F(T, R)
                                        }),
                  R
                )
              })
            )
          }
          class Se {
            constructor (o, m = {}, S) {
              (this.options = { ...u, ...m }),
              this.options.useExtendedSearch,
              (this._keyStore = new e(this.options.keys)),
              this.setCollection(o, S)
            }

            setCollection (o, m) {
              if (((this._docs = o), m && !(m instanceof V))) {
                throw new Error(Z)
              }
              this._myIndex =
                                m ||
                                U(this.options.keys, this._docs, {
                                  getFn: this.options.getFn,
                                  fieldNormWeight:
                                        this.options.fieldNormWeight
                                })
            }

            add (o) {
              y(o) && (this._docs.push(o), this._myIndex.add(o))
            }

            remove (o = () => !1) {
              const m = []
              for (
                let S = 0, I = this._docs.length;
                S < I;
                S += 1
              ) {
                const T = this._docs[S]
                o(T, S) &&
                                    (this.removeAt(S),
                                    (S -= 1),
                                    (I -= 1),
                                    m.push(T))
              }
              return m
            }

            removeAt (o) {
              this._docs.splice(o, 1), this._myIndex.removeAt(o)
            }

            getIndex () {
              return this._myIndex
            }

            search (o, { limit: m = -1 } = {}) {
              const {
                includeMatches: S,
                includeScore: I,
                shouldSort: T,
                sortFn: A,
                ignoreFieldNorm: R
              } = this.options
              let F = r(o)
                ? r(this._docs[0])
                  ? this._searchStringList(o)
                  : this._searchObjectList(o)
                : this._searchLogical(o)
              return (
                nt(F, { ignoreFieldNorm: R }),
                T && F.sort(A),
                c(m) && m > -1 && (F = F.slice(0, m)),
                ot(F, this._docs, {
                  includeMatches: S,
                  includeScore: I
                })
              )
            }

            _searchStringList (o) {
              const m = Ne(o, this.options)
              const { records: S } = this._myIndex
              const I = []
              return (
                S.forEach(({ v: T, i: A, n: R }) => {
                  if (!y(T)) return
                  const {
                    isMatch: F,
                    score: H,
                    indices: B
                  } = m.searchIn(T)
                  F &&
                                        I.push({
                                          item: T,
                                          idx: A,
                                          matches: [
                                            {
                                              score: H,
                                              value: T,
                                              norm: R,
                                              indices: B
                                            }
                                          ]
                                        })
                }),
                I
              )
            }

            _searchLogical (o) {
              const m = xe(o, this.options)
              const S = (R, F, H) => {
                if (!R.children) {
                  const { keyId: x, searcher: G } = R
                  const q = this._findMatches({
                    key: this._keyStore.get(x),
                    value: this._myIndex.getValueForItemAtKeyId(
                      F,
                      x
                    ),
                    searcher: G
                  })
                  return q && q.length
                    ? [
                        {
                          idx: H,
                          item: F,
                          matches: q
                        }
                      ]
                    : []
                }
                const B = []
                for (
                  let x = 0, G = R.children.length;
                  x < G;
                  x += 1
                ) {
                  const q = R.children[x]
                  const re = S(q, F, H)
                  if (re.length) B.push(...re)
                  else if (R.operator === Ce.AND) {
                    return []
                  }
                }
                return B
              }
              const I = this._myIndex.records
              const T = {}
              const A = []
              return (
                I.forEach(({ $: R, i: F }) => {
                  if (y(R)) {
                    const H = S(m, R, F)
                    H.length &&
                                            (T[F] ||
                                                ((T[F] = {
                                                  idx: F,
                                                  item: R,
                                                  matches: []
                                                }),
                                                A.push(T[F])),
                                            H.forEach(({ matches: B }) => {
                                              T[F].matches.push(...B)
                                            }))
                  }
                }),
                A
              )
            }

            _searchObjectList (o) {
              const m = Ne(o, this.options)
              const { keys: S, records: I } = this._myIndex
              const T = []
              return (
                I.forEach(({ $: A, i: R }) => {
                  if (!y(A)) return
                  const F = []
                  S.forEach((H, B) => {
                    F.push(
                      ...this._findMatches({
                        key: H,
                        value: A[B],
                        searcher: m
                      })
                    )
                  }),
                  F.length &&
                                            T.push({
                                              idx: R,
                                              item: A,
                                              matches: F
                                            })
                }),
                T
              )
            }

            _findMatches ({ key: o, value: m, searcher: S }) {
              if (!y(m)) return []
              const I = []
              if (_(m)) {
                m.forEach(({ v: T, i: A, n: R }) => {
                  if (!y(T)) return
                  const {
                    isMatch: F,
                    score: H,
                    indices: B
                  } = S.searchIn(T)
                  F &&
                                        I.push({
                                          score: H,
                                          key: o,
                                          value: T,
                                          idx: A,
                                          norm: R,
                                          indices: B
                                        })
                })
              } else {
                const { v: T, n: A } = m
                const {
                  isMatch: R,
                  score: F,
                  indices: H
                } = S.searchIn(T)
                R &&
                                    I.push({
                                      score: F,
                                      key: o,
                                      value: T,
                                      norm: A,
                                      indices: H
                                    })
              }
              return I
            }
          }
          (Se.version = '6.6.2'),
          (Se.createIndex = U),
          (Se.parseIndex = $),
          (Se.config = u),
          (Se.parseQuery = xe),
          et(qe)
        },
        791: function (j, i, b) {
          b.r(i),
          b.d(i, {
            __DO_NOT_USE__ActionTypes: function () {
              return y
            },
            applyMiddleware: function () {
              return M
            },
            bindActionCreators: function () {
              return v
            },
            combineReducers: function () {
              return n
            },
            compose: function () {
              return P
            },
            createStore: function () {
              return w
            },
            legacy_createStore: function () {
              return N
            }
          })
          function _ (f) {
            '@babel/helpers - typeof'
            return (
              (_ =
                                typeof Symbol === 'function' &&
                                typeof Symbol.iterator === 'symbol'
                                  ? function (u) {
                                    return typeof u
                                  }
                                  : function (u) {
                                    return u &&
                                              typeof Symbol === 'function' &&
                                              u.constructor === Symbol &&
                                              u !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof u
                                  }),
              _(f)
            )
          }
          function h (f, u) {
            if (_(f) !== 'object' || f === null) return f
            const C = f[Symbol.toPrimitive]
            if (C !== void 0) {
              const Y = C.call(f, u || 'default')
              if (_(Y) !== 'object') return Y
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              )
            }
            return (u === 'string' ? String : Number)(f)
          }
          function d (f) {
            const u = h(f, 'string')
            return _(u) === 'symbol' ? u : String(u)
          }
          function a (f, u, C) {
            return (
              (u = d(u)),
              u in f
                ? Object.defineProperty(f, u, {
                  value: C,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                })
                : (f[u] = C),
              f
            )
          }
          function r (f, u) {
            const C = Object.keys(f)
            if (Object.getOwnPropertySymbols) {
              let Y = Object.getOwnPropertySymbols(f)
              u &&
                                (Y = Y.filter(function (V) {
                                  return Object.getOwnPropertyDescriptor(f, V)
                                    .enumerable
                                })),
              C.push.apply(C, Y)
            }
            return C
          }
          function c (f) {
            for (let u = 1; u < arguments.length; u++) {
              var C = arguments[u] != null ? arguments[u] : {}
              u % 2
                ? r(Object(C), !0).forEach(function (Y) {
                  a(f, Y, C[Y])
                })
                : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                    f,
                    Object.getOwnPropertyDescriptors(C)
                  )
                  : r(Object(C)).forEach(function (Y) {
                    Object.defineProperty(
                      f,
                      Y,
                      Object.getOwnPropertyDescriptor(
                        C,
                        Y
                      )
                    )
                  })
            }
            return f
          }
          function l (f) {
            return (
              'Minified Redux error #' +
                            f +
                            '; visit https://redux.js.org/Errors?code=' +
                            f +
                            ' for the full message or use the non-minified dev environment for full errors. '
            )
          }
          const O = (function () {
            return (
              (typeof Symbol === 'function' &&
                                Symbol.observable) ||
                            '@@observable'
            )
          })()
          const L = function () {
            return Math.random()
              .toString(36)
              .substring(7)
              .split('')
              .join('.')
          }
          var y = {
            INIT: '@@redux/INIT' + L(),
            REPLACE: '@@redux/REPLACE' + L(),
            PROBE_UNKNOWN_ACTION: function () {
              return '@@redux/PROBE_UNKNOWN_ACTION' + L()
            }
          }
          function D (f) {
            if (typeof f !== 'object' || f === null) return !1
            for (var u = f; Object.getPrototypeOf(u) !== null;) {
              u = Object.getPrototypeOf(u)
            }
            return Object.getPrototypeOf(f) === u
          }
          function k (f) {
            if (f === void 0) return 'undefined'
            if (f === null) return 'null'
            const u = typeof f
            switch (u) {
              case 'boolean':
              case 'string':
              case 'number':
              case 'symbol':
              case 'function':
                return u
            }
            if (Array.isArray(f)) return 'array'
            if (ne(f)) return 'date'
            if (Z(f)) return 'error'
            const C = Q(f)
            switch (C) {
              case 'Symbol':
              case 'Promise':
              case 'WeakMap':
              case 'WeakSet':
              case 'Map':
              case 'Set':
                return C
            }
            return u.slice(8, -1).toLowerCase().replace(/\s/g, '')
          }
          function Q (f) {
            return typeof f.constructor === 'function'
              ? f.constructor.name
              : null
          }
          function Z (f) {
            return (
              f instanceof Error ||
                            (typeof f.message === 'string' &&
                                f.constructor &&
                                typeof f.constructor.stackTraceLimit ===
                                    'number')
            )
          }
          function ne (f) {
            return f instanceof Date
              ? !0
              : typeof f.toDateString === 'function' &&
                                  typeof f.getDate === 'function' &&
                                  typeof f.setDate === 'function'
          }
          function E (f) {
            const u = typeof f
            return u
          }
          function w (f, u, C) {
            let Y
            if (
              (typeof u === 'function' &&
                                typeof C === 'function') ||
                            (typeof C === 'function' &&
                                typeof arguments[3] === 'function')
            ) {
              throw new Error(l(0))
            }
            if (
              (typeof u === 'function' &&
                                typeof C > 'u' &&
                                ((C = u), (u = void 0)),
              typeof C < 'u')
            ) {
              if (typeof C !== 'function') {
                throw new Error(l(1))
              }
              return C(w)(f, u)
            }
            if (typeof f !== 'function') throw new Error(l(2))
            let V = f
            let U = u
            let $ = []
            let W = $
            let J = !1
            function z () {
              W === $ && (W = $.slice())
            }
            function ee () {
              if (J) throw new Error(l(3))
              return U
            }
            function ae (te) {
              if (typeof te !== 'function') {
                throw new Error(l(4))
              }
              if (J) throw new Error(l(5))
              let de = !0
              return (
                z(),
                W.push(te),
                function () {
                  if (de) {
                    if (J) throw new Error(l(6));
                    (de = !1), z()
                    const oe = W.indexOf(te)
                    W.splice(oe, 1), ($ = null)
                  }
                }
              )
            }
            function ce (te) {
              if (!D(te)) throw new Error(l(7))
              if (typeof te.type > 'u') throw new Error(l(8))
              if (J) throw new Error(l(9))
              try {
                (J = !0), (U = V(U, te))
              } finally {
                J = !1
              }
              for (
                let de = ($ = W), pe = 0;
                pe < de.length;
                pe++
              ) {
                const oe = de[pe]
                oe()
              }
              return te
            }
            function le (te) {
              if (typeof te !== 'function') {
                throw new Error(l(10))
              }
              (V = te), ce({ type: y.REPLACE })
            }
            function _e () {
              let te
              const de = ae
              return (
                (te = {
                  subscribe: function (oe) {
                    if (
                      typeof oe !== 'object' ||
                                            oe === null
                    ) {
                      throw new Error(l(11))
                    }
                    function Te () {
                      oe.next && oe.next(ee())
                    }
                    Te()
                    const Pe = de(Te)
                    return { unsubscribe: Pe }
                  }
                }),
                (te[O] = function () {
                  return this
                }),
                te
              )
            }
            return (
              ce({ type: y.INIT }),
              (Y = {
                dispatch: ce,
                subscribe: ae,
                getState: ee,
                replaceReducer: le
              }),
              (Y[O] = _e),
              Y
            )
          }
          var N = w
          function g (f) {
            typeof console < 'u' &&
                            typeof console.error === 'function' &&
                            console.error(f)
            try {
              throw new Error(f)
            } catch {}
          }
          function e (f, u, C, Y) {
            const V = Object.keys(u)
            const U =
                            C && C.type === y.INIT
                              ? 'preloadedState argument passed to createStore'
                              : 'previous state received by the reducer'
            if (V.length === 0) {
              return 'Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.'
            }
            if (!D(f)) {
              return (
                'The ' +
                                U +
                                ' has unexpected type of "' +
                                E(f) +
                                '". Expected argument to be an object with the following ' +
                                ('keys: "' + V.join('", "') + '"')
              )
            }
            const $ = Object.keys(f).filter(function (W) {
              return !u.hasOwnProperty(W) && !Y[W]
            })
            if (
              ($.forEach(function (W) {
                Y[W] = !0
              }),
              !(C && C.type === y.REPLACE) && $.length > 0)
            ) {
              return (
                'Unexpected ' +
                                ($.length > 1 ? 'keys' : 'key') +
                                ' ' +
                                ('"' +
                                    $.join('", "') +
                                    '" found in ' +
                                    U +
                                    '. ') +
                                'Expected to find one of the known reducer keys instead: ' +
                                ('"' +
                                    V.join('", "') +
                                    '". Unexpected keys will be ignored.')
              )
            }
          }
          function t (f) {
            Object.keys(f).forEach(function (u) {
              const C = f[u]
              const Y = C(void 0, { type: y.INIT })
              if (typeof Y > 'u') throw new Error(l(12))
              if (
                typeof C(void 0, {
                  type: y.PROBE_UNKNOWN_ACTION()
                }) > 'u'
              ) {
                throw new Error(l(13))
              }
            })
          }
          function n (f) {
            for (
              var u = Object.keys(f), C = {}, Y = 0;
              Y < u.length;
              Y++
            ) {
              const V = u[Y]
              typeof f[V] === 'function' && (C[V] = f[V])
            }
            const U = Object.keys(C)
            let $
            let W
            try {
              t(C)
            } catch (J) {
              W = J
            }
            return function (z, ee) {
              if ((z === void 0 && (z = {}), W)) throw W
              if (!1) var ae
              for (
                var ce = !1, le = {}, _e = 0;
                _e < U.length;
                _e++
              ) {
                const te = U[_e]
                const de = C[te]
                const pe = z[te]
                const oe = de(pe, ee)
                if (typeof oe > 'u') {
                  const Te = ee && ee.type
                  throw new Error(l(14))
                }
                (le[te] = oe), (ce = ce || oe !== pe)
              }
              return (
                (ce = ce || U.length !== Object.keys(z).length),
                ce ? le : z
              )
            }
          }
          function s (f, u) {
            return function () {
              return u(f.apply(this, arguments))
            }
          }
          function v (f, u) {
            if (typeof f === 'function') return s(f, u)
            if (typeof f !== 'object' || f === null) {
              throw new Error(l(16))
            }
            const C = {}
            for (const Y in f) {
              const V = f[Y]
              typeof V === 'function' && (C[Y] = s(V, u))
            }
            return C
          }
          function P () {
            for (
              var f = arguments.length, u = new Array(f), C = 0;
              C < f;
              C++
            ) {
              u[C] = arguments[C]
            }
            return u.length === 0
              ? function (Y) {
                return Y
              }
              : u.length === 1
                ? u[0]
                : u.reduce(function (Y, V) {
                  return function () {
                    return Y(V.apply(void 0, arguments))
                  }
                })
          }
          function M () {
            for (
              var f = arguments.length, u = new Array(f), C = 0;
              C < f;
              C++
            ) {
              u[C] = arguments[C]
            }
            return function (Y) {
              return function () {
                const V = Y.apply(void 0, arguments)
                let U = function () {
                  throw new Error(l(15))
                }
                const $ = {
                  getState: V.getState,
                  dispatch: function () {
                    return U.apply(void 0, arguments)
                  }
                }
                const W = u.map(function (J) {
                  return J($)
                })
                return (
                  (U = P.apply(void 0, W)(V.dispatch)),
                  c(c({}, V), {}, { dispatch: U })
                )
              }
            }
          }
          function K () {}
        }
      }
      const ie = {}
      function X (j) {
        const i = ie[j]
        if (i !== void 0) return i.exports
        const b = (ie[j] = { exports: {} })
        return se[j].call(b.exports, b, b.exports, X), b.exports
      }
      (function () {
        X.n = function (j) {
          const i =
                        j && j.__esModule
                          ? function () {
                            return j.default
                          }
                          : function () {
                            return j
                          }
          return X.d(i, { a: i }), i
        }
      })(),
      (function () {
        X.d = function (j, i) {
          for (const b in i) {
            X.o(i, b) &&
                                !X.o(j, b) &&
                                Object.defineProperty(j, b, {
                                  enumerable: !0,
                                  get: i[b]
                                })
          }
        }
      })(),
      (function () {
        X.o = function (j, i) {
          return Object.prototype.hasOwnProperty.call(j, i)
        }
      })(),
      (function () {
        X.r = function (j) {
          typeof Symbol < 'u' &&
                            Symbol.toStringTag &&
                            Object.defineProperty(j, Symbol.toStringTag, {
                              value: 'Module'
                            }),
          Object.defineProperty(j, '__esModule', {
            value: !0
          })
        }
      })()
      let me = {}
      return (
        (function () {
          const j = X(373)
          const i = X.n(j)
          const b = X(187)
          const _ = X.n(b)
          const h = X(883)
          const d = X(789)
          const a = X(686)
          me.default = i()
        })(),
        (me = me.default),
        me
      )
    })()
  })
})
const ze = mt($e(), 1)
function vt ({
  canSelectPlaceholder: se,
  isHtmlAllowed: ie,
  getOptionLabelUsing: X,
  getOptionLabelsUsing: me,
  getOptionsUsing: j,
  getSearchResultsUsing: i,
  isAutofocused: b,
  isMultiple: _,
  isSearchable: h,
  hasDynamicOptions: d,
  hasDynamicSearchResults: a,
  livewireId: r,
  loadingMessage: c,
  maxItems: l,
  maxItemsMessage: O,
  noSearchResultsMessage: L,
  options: y,
  optionsLimit: D,
  placeholder: k,
  position: Q,
  searchDebounce: Z,
  searchingMessage: ne,
  searchPrompt: E,
  searchableOptionFields: w,
  state: N,
  statePath: g
}) {
  return {
    isSearching: !1,
    select: null,
    selectedOptions: [],
    isStateBeingUpdated: !1,
    state: N,
    init: async function () {
      (this.select = new ze.default(this.$refs.input, {
        allowHTML: ie,
        duplicateItemsAllowed: !1,
        itemSelectText: '',
        loadingText: c,
        maxItemCount: l ?? -1,
        maxItemText: (e) => window.pluralize(O, e, { count: e }),
        noChoicesText: E,
        noResultsText: L,
        placeholderValue: k,
        position: Q ?? 'auto',
        removeItemButton: se,
        renderChoiceLimit: D,
        searchEnabled: h,
        searchFields: w ?? ['label'],
        searchPlaceholderValue: E,
        searchResultLimit: D,
        shouldSort: !1,
        searchFloor: a ? 0 : 1
      })),
      await this.refreshChoices({ withInitialOptions: !0 }),
      [null, void 0, ''].includes(this.state) ||
                    this.select.setChoiceByValue(this.formatState(this.state)),
      this.refreshPlaceholder(),
      b && this.select.showDropdown(),
      this.$refs.input.addEventListener('change', () => {
        this.refreshPlaceholder(),
        !this.isStateBeingUpdated &&
                            ((this.isStateBeingUpdated = !0),
                            (this.state = this.select.getValue(!0) ?? null),
                            this.$nextTick(
                              () => (this.isStateBeingUpdated = !1)
                            ))
      }),
      d &&
                    this.$refs.input.addEventListener(
                      'showDropdown',
                      async () => {
                        this.select.clearChoices(),
                        await this.select.setChoices([
                          { label: c, value: '', disabled: !0 }
                        ]),
                        await this.refreshChoices()
                      }
                    ),
      a &&
                    (this.$refs.input.addEventListener('search', async (e) => {
                      const t = e.detail.value?.trim();
                      (this.isSearching = !0),
                      this.select.clearChoices(),
                      await this.select.setChoices([
                        {
                          label: [null, void 0, ''].includes(t)
                            ? c
                            : ne,
                          value: '',
                          disabled: !0
                        }
                      ])
                    }),
                    this.$refs.input.addEventListener(
                      'search',
                      Alpine.debounce(async (e) => {
                        await this.refreshChoices({
                          search: e.detail.value?.trim()
                        }),
                        (this.isSearching = !1)
                      }, Z)
                    )),
      _ ||
                    window.addEventListener(
                      'filament-forms::select.refreshSelectedOptionLabel',
                      async (e) => {
                        e.detail.livewireId === r &&
                                e.detail.statePath === g &&
                                (await this.refreshChoices({
                                  withInitialOptions: !1
                                }))
                      }
                    ),
      this.$watch('state', async () => {
        this.select &&
                        (this.refreshPlaceholder(),
                        !this.isStateBeingUpdated &&
                            (await this.refreshChoices({
                              withInitialOptions: !d
                            })))
      })
    },
    destroy: function () {
      this.select.destroy(), (this.select = null)
    },
    refreshChoices: async function (e = {}) {
      const t = await this.getChoices(e)
      this.select &&
                (this.select.clearStore(),
                this.refreshPlaceholder(),
                this.setChoices(t),
                [null, void 0, ''].includes(this.state) ||
                    this.select.setChoiceByValue(this.formatState(this.state)))
    },
    setChoices: function (e) {
      this.select.setChoices(e, 'value', 'label', !0)
    },
    getChoices: async function (e = {}) {
      const t = await this.getExistingOptions(e)
      return t.concat(await this.getMissingOptions(t))
    },
    getExistingOptions: async function ({
      search: e,
      withInitialOptions: t
    }) {
      if (t) return y
      let n = []
      return (
        e !== '' && e !== null && e !== void 0
          ? (n = await i(e))
          : (n = await j()),
        n.map((s) =>
          s.choices
            ? ((s.choices = s.choices.map(
                (v) => (
                  (v.selected = Array.isArray(this.state)
                    ? this.state.includes(v.value)
                    : this.state === v.value),
                  v
                )
              )),
              s)
            : ((s.selected = Array.isArray(this.state)
                ? this.state.includes(s.value)
                : this.state === s.value),
              s)
        )
      )
    },
    refreshPlaceholder: function () {
      _ ||
                (this.select._renderItems(),
                [null, void 0, ''].includes(this.state) &&
                    (this.$el.querySelector(
                      '.choices__list--single'
                    ).innerHTML =
                        `<div class="choices__placeholder choices__item">${k ?? ''}</div>`))
    },
    formatState: function (e) {
      return _ ? (e ?? []).map((t) => t?.toString()) : e?.toString()
    },
    getMissingOptions: async function (e) {
      const t = this.formatState(this.state)
      if ([null, void 0, '', [], {}].includes(t)) return {}
      const n = new Set()
      return (
        e.forEach((s) => {
          if (s.choices) {
            s.choices.forEach((v) => n.add(v.value))
            return
          }
          n.add(s.value)
        }),
        _
          ? t.every((s) => n.has(s))
            ? {}
            : (await me())
                .filter((s) => !n.has(s.value))
                .map((s) => ((s.selected = !0), s))
          : n.has(t)
            ? n
            : [{ label: await X(), value: t, selected: !0 }]
      )
    }
  }
}
export { vt as default }
/*! Bundled license information:

choices.js/public/assets/scripts/choices.js:
  (*! choices.js v10.2.0 | © 2022 Josh Johnson | https://github.com/jshjohnson/Choices#readme *)
*/
