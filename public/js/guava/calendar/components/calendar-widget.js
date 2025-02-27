function M ({
  view: E = 'dayGridMonth',
  locale: h = 'en',
  firstDay: p = 1,
  events: R = [],
  eventContent: a = null,
  resourceLabelContent: s = null,
  selectable: q = !1,
  eventClickEnabled: f = !1,
  eventDragEnabled: i = !1,
  eventResizeEnabled: u = !1,
  noEventsClickEnabled: y = !1,
  dateSelectEnabled: c = !1,
  dateClickEnabled: m = !1,
  viewDidMountEnabled: C = !1,
  eventAllUpdatedEnabled: D = !1,
  dayMaxEvents: S = !1,
  moreLinkContent: v = null,
  resources: x = [],
  hasDateClickContextMenu: $ = !1,
  hasDateSelectContextMenu: k = !1,
  hasEventClickContextMenu: g = !1,
  hasNoEventsClickContextMenu: b = !1,
  options: j = {},
  dayHeaderFormat: o = null,
  slotLabelFormat: w = null
}) {
  return {
    calendarEl: null,
    init: async function () {
      this.calendarEl = this.$el
      const n = this
      const t = {
        view: E,
        resources: x,
        eventSources: [
          { events: (e, r, l) => this.$wire.getEventsJs(e) }
        ],
        locale: h,
        firstDay: p,
        dayMaxEvents: S,
        selectable: c,
        eventStartEditable: i,
        eventDurationEditable: u
      }
      o && (t.dayHeaderFormat = o),
      w && (t.slotLabelFormat = w),
      m &&
                    (t.dateClick = (e) => {
                      $
                        ? n.$el
                          .querySelector('[calendar-context-menu]')
                          .dispatchEvent(
                            new CustomEvent('calendar--open-menu', {
                              detail: {
                                mountData: {
                                  date: e.date,
                                  dateStr: e.dateStr,
                                  allDay: e.allDay,
                                  view: e.view,
                                  resource: e.resource
                                },
                                jsEvent: e.jsEvent,
                                dayEl: e.dayEl,
                                context: 'dateClick'
                              }
                            })
                          )
                        : this.$wire.onDateClick({
                          date: e.date,
                          dateStr: e.dateStr,
                          allDay: e.allDay,
                          view: e.view,
                          resource: e.resource
                        })
                    }),
      c &&
                    (t.select = (e) => {
                      k
                        ? n.$el
                          .querySelector('[calendar-context-menu]')
                          .dispatchEvent(
                            new CustomEvent('calendar--open-menu', {
                              detail: {
                                mountData: {
                                  start: e.start,
                                  startStr: e.startStr,
                                  end: e.end,
                                  endStr: e.endStr,
                                  allDay: e.allDay,
                                  view: e.view,
                                  resource: e.resource
                                },
                                jsEvent: e.jsEvent,
                                context: 'dateSelect'
                              }
                            })
                          )
                        : this.$wire.onDateSelect({
                          start: e.start,
                          startStr: e.startStr,
                          end: e.end,
                          endStr: e.endStr,
                          allDay: e.allDay,
                          view: e.view,
                          resource: e.resource
                        })
                    }),
      a !== null &&
                    (t.eventContent = (e) => {
                      const r = n.getEventContent(e)
                      if (r !== void 0) return { html: r }
                    }),
      v !== null &&
                    (t.moreLinkContent = (e) => ({
                      html: n.getMoreLinkContent(e)
                    })),
      s !== null &&
                    (t.resourceLabelContent = (e) => {
                      const r = n.getResourceLabelContent(e)
                      if (r !== void 0) return { html: r }
                    }),
      f &&
                    (t.eventClick = (e) => {
                      if (e.event.extendedProps.url) {
                        const r =
                                e.event.extendedProps.url_target ?? '_blank'
                        window.open(e.event.extendedProps.url, r)
                      } else {
                        g
                          ? n.$el
                            .querySelector('[calendar-context-menu]')
                            .dispatchEvent(
                              new CustomEvent(
                                'calendar--open-menu',
                                {
                                  detail: {
                                    mountData: {
                                      event: e.event,
                                      view: e.view
                                    },
                                    jsEvent: e.jsEvent,
                                    context: 'eventClick'
                                  }
                                }
                              )
                            )
                          : this.$wire.onEventClick({
                            event: e.event,
                            view: e.view
                          })
                      }
                    }),
      y &&
                    (t.noEventsClick = (e) => {
                      b
                        ? n.$el
                          .querySelector('[calendar-context-menu]')
                          .dispatchEvent(
                            new CustomEvent('calendar--open-menu', {
                              detail: {
                                mountData: { view: e.view },
                                jsEvent: e.jsEvent,
                                context: 'noEventsClick'
                              }
                            })
                          )
                        : this.$wire.onNoEventsClick({ view: e.view })
                    }),
      (t.eventResize = async (e) => {
        const r = e.event.durationEditable
        let l = u
        r !== void 0 && (l = r),
        l &&
                            (await this.$wire
                              .onEventResize({
                                event: e.event,
                                oldEvent: e.oldEvent,
                                endDelta: e.endDelta,
                                view: e.view
                              })
                              .then((d) => {
                                d === !1 && e.revert()
                              }))
      }),
      (t.eventDrop = async (e) => {
        const r = e.event.startEditable
        let l = i
        r !== void 0 && (l = r),
        l &&
                            (await this.$wire
                              .onEventDrop({
                                event: e.event,
                                oldEvent: e.oldEvent,
                                oldResource: e.oldResource,
                                newResource: e.newResource,
                                delta: e.delta,
                                view: e.view
                              })
                              .then((d) => {
                                d === !1 && e.revert()
                              }))
      }),
      C &&
                    (t.viewDidMount = (e) => {
                      this.$wire.onViewDidMount({ view: e })
                    }),
      D &&
                    (t.eventAllUpdated = (e) => {
                      this.$wire.onEventAllUpdated({ info: e })
                    }),
      (this.ec = new EventCalendar(this.$el.querySelector('div'), {
        ...t,
        ...j
      })),
      window.addEventListener('calendar--refresh', () => {
        this.ec.refetchEvents()
      }),
      this.$wire.on('calendar--set', (e) => {
        this.ec.setOption(e.key, e.value)
      })
    },
    getEventContent: function (n) {
      if (typeof a === 'string') return this.wrapContent(a, n)
      if (typeof a === 'object') {
        const t = n.event.extendedProps.model
        const e = a[t]
        return e === void 0 ? void 0 : this.wrapContent(e, n)
      }
    },
    getResourceLabelContent: function (n) {
      if (typeof s === 'string') return this.wrapContent(s, n)
      if (typeof s === 'object') {
        const t = n.event.extendedProps.model
        const e = s[t]
        return e === void 0 ? void 0 : this.wrapContent(e, n)
      }
    },
    getMoreLinkContent: function (n) {
      return this.wrapContent(v, n)
    },
    wrapContent: function (n, t) {
      const e = document.createElement('div')
      return (
        (e.innerHTML = n),
        e.setAttribute('x-data', JSON.stringify(t)),
        e.classList.add('w-full'),
        e.outerHTML
      )
    }
  }
}
export { M as default }
