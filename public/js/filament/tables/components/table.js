function n () {
  return {
    checkboxClickController: null,
    collapsedGroups: [],
    isLoading: !1,
    selectedRecords: [],
    shouldCheckUniqueSelection: !0,
    lastCheckedRecord: null,
    livewireId: null,
    init: function () {
      (this.livewireId =
                this.$root.closest('[wire\\:id]').attributes['wire:id'].value),
      this.$wire.$on('deselectAllTableRecords', () =>
        this.deselectAllRecords()
      ),
      this.$watch('selectedRecords', () => {
        if (!this.shouldCheckUniqueSelection) {
          this.shouldCheckUniqueSelection = !0
          return
        }
        (this.selectedRecords = [...new Set(this.selectedRecords)]),
        (this.shouldCheckUniqueSelection = !1)
      }),
      this.$nextTick(() => this.watchForCheckboxClicks()),
      Livewire.hook('element.init', ({ component: e }) => {
        e.id === this.livewireId && this.watchForCheckboxClicks()
      })
    },
    mountAction: function (e, t = null) {
      this.$wire.set('selectedTableRecords', this.selectedRecords, !1),
      this.$wire.mountTableAction(e, t)
    },
    mountBulkAction: function (e) {
      this.$wire.set('selectedTableRecords', this.selectedRecords, !1),
      this.$wire.mountTableBulkAction(e)
    },
    toggleSelectRecordsOnPage: function () {
      const e = this.getRecordsOnPage()
      if (this.areRecordsSelected(e)) {
        this.deselectRecords(e)
        return
      }
      this.selectRecords(e)
    },
    toggleSelectRecordsInGroup: async function (e) {
      if (
        ((this.isLoading = !0),
        this.areRecordsSelected(this.getRecordsInGroupOnPage(e)))
      ) {
        this.deselectRecords(
          await this.$wire.getGroupedSelectableTableRecordKeys(e)
        )
        return
      }
      this.selectRecords(
        await this.$wire.getGroupedSelectableTableRecordKeys(e)
      ),
      (this.isLoading = !1)
    },
    getRecordsInGroupOnPage: function (e) {
      const t = []
      for (const s of this.$root?.getElementsByClassName(
        'fi-ta-record-checkbox'
      ) ?? []) {
        s.dataset.group === e && t.push(s.value)
      }
      return t
    },
    getRecordsOnPage: function () {
      const e = []
      for (const t of this.$root?.getElementsByClassName(
        'fi-ta-record-checkbox'
      ) ?? []) {
        e.push(t.value)
      }
      return e
    },
    selectRecords: function (e) {
      for (const t of e) {
        this.isRecordSelected(t) || this.selectedRecords.push(t)
      }
    },
    deselectRecords: function (e) {
      for (const t of e) {
        const s = this.selectedRecords.indexOf(t)
        s !== -1 && this.selectedRecords.splice(s, 1)
      }
    },
    selectAllRecords: async function () {
      (this.isLoading = !0),
      (this.selectedRecords =
                    await this.$wire.getAllSelectableTableRecordKeys()),
      (this.isLoading = !1)
    },
    deselectAllRecords: function () {
      this.selectedRecords = []
    },
    isRecordSelected: function (e) {
      return this.selectedRecords.includes(e)
    },
    areRecordsSelected: function (e) {
      return e.every((t) => this.isRecordSelected(t))
    },
    toggleCollapseGroup: function (e) {
      if (this.isGroupCollapsed(e)) {
        this.collapsedGroups.splice(this.collapsedGroups.indexOf(e), 1)
        return
      }
      this.collapsedGroups.push(e)
    },
    isGroupCollapsed: function (e) {
      return this.collapsedGroups.includes(e)
    },
    resetCollapsedGroups: function () {
      this.collapsedGroups = []
    },
    watchForCheckboxClicks: function () {
      this.checkboxClickController &&
                this.checkboxClickController.abort(),
      (this.checkboxClickController = new AbortController())
      const { signal: e } = this.checkboxClickController
      this.$root?.addEventListener(
        'click',
        (t) =>
          t.target?.matches('.fi-ta-record-checkbox') &&
                    this.handleCheckboxClick(t, t.target),
        { signal: e }
      )
    },
    handleCheckboxClick: function (e, t) {
      if (!this.lastChecked) {
        this.lastChecked = t
        return
      }
      if (e.shiftKey) {
        const s = Array.from(
          this.$root?.getElementsByClassName(
            'fi-ta-record-checkbox'
          ) ?? []
        )
        if (!s.includes(this.lastChecked)) {
          this.lastChecked = t
          return
        }
        const o = s.indexOf(this.lastChecked)
        const r = s.indexOf(t)
        const l = [o, r].sort((i, d) => i - d)
        const c = []
        for (let i = l[0]; i <= l[1]; i++) {
          (s[i].checked = t.checked), c.push(s[i].value)
        }
        t.checked ? this.selectRecords(c) : this.deselectRecords(c)
      }
      this.lastChecked = t
    }
  }
}
export { n as default }
