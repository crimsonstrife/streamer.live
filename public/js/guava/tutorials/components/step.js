// resources/js/components/step.js
function stepComponent ({
  key,
  selector,
  shouldInterceptClick,
  interceptClickAction
}) {
  return {
    target: null,
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    init: async function () {
      this.target = this.findElement(key)
      if (!this.target) {
        console.error('Tutorial step was not found:', key)
        return
      }
      document.documentElement
        .querySelectorAll('input')
        .forEach((element) => element.blur())
      if (this.target) {
        this.target.focus()
      }
      this.configure()
      const dialog = this.$el.querySelector('[data-dialog]')
      const clipPath = this.$el.querySelector('[data-clip-path]')
      if (shouldInterceptClick) {
        this.target.addEventListener('click', (event) => {
          event.preventDefault()
          this.$wire.call(interceptClickAction)
          this.target.blur()
          const descendants = this.target.querySelectorAll(':hover')
          for (let i = 0; i < descendants.length; i++) {
            const descendant = descendants[i]
            descendant.blur()
          }
        })
      }
      this.initializeDialog()
      this.$nextTick(() => {
        clipPath.setAttribute('d', this.clipPath())
        this.$dispatch('tutorial::render')
      })
      clipPath.setAttribute('d', this.clipPath())
    },
    timeouts: [],
    configure: function () {
      document.addEventListener('keydown', function (event) {
        const key2 = event.key
        const isShiftKey = event.shiftKey
        const isCtrlKey = false
        const isAltKey = false
        if (key2 === 'Tab') {
          event.preventDefault()
        }
      })
      if (this.target instanceof HTMLSelectElement) {
        if (this.target.hasAttribute('data-choice')) {
          this.target = this.target.parentElement.parentElement
          const dropdown = this.target.querySelector(
            '.choices__list.choices__list--dropdown'
          )
          dropdown.style.zIndex = 100
        }
      }
      if (this.target.tagName === 'TRIX-EDITOR') {
        this.timeouts.trix = this.target.clientHeight
        this.target = this.target.parentElement
        const observer = new MutationObserver(
          (mutationsList, observer2) => {
            mutationsList.forEach((mutation) => {
              if (this.timeouts.trix) {
                clearTimeout(this.timeouts.trix)
              }
              this.timeouts.trix = setTimeout(() => {
                this.timeouts.trix = null
                this.init()
              }, 500)
            })
          }
        )
        const config = {
          attributes: true,
          attributeFilter: ['height'],
          childList: true,
          subtree: true
        }
        observer.observe(this.target, config)
      }
      if (this.target instanceof HTMLTextAreaElement || this.t) {
        let initialWidth = this.target.offsetWidth
        let initialHeight = this.target.offsetHeight
        const observer = new MutationObserver(() => {
          if (
            this.target.offsetWidth !== initialWidth ||
                        this.target.offsetHeight !== initialHeight
          ) {
            initialWidth = this.target.offsetWidth
            initialHeight = this.target.offsetHeight
            if (this.timeouts.textarea) {
              clearTimeout(this.timeouts.textarea)
            }
            this.timeouts.textarea = setTimeout(() => {
              this.timeouts.textarea = null
              this.init()
            }, 100)
          }
        })
        observer.observe(this.target, {
          attributes: true,
          attributeFilter: ['style']
        })
      }
    },
    // You can define any other Alpine.js functions here.
    initializeDialog: function (dialog = null) {
      if (!dialog) {
        dialog = this.$el.querySelector('[data-dialog]')
      }
      const dialogPath = dialog.querySelector('[data-dialog-path]')
      const rect = this.elementRect()
      const stroke = dialog.querySelector('[data-dialog-stroke]')
      window.scrollTo({
        top: rect[0].y - window.innerHeight / 3,
        left: rect[0].x,
        behavior: 'smooth'
      })
      const width = rect[1].x - rect[0].x
      const height = rect[2].y - rect[0].y
      const x = rect[0].x
      const y = rect[0].y
      dialog.style.width = `${width}px`
      dialog.style.transform = `translate(${x}px, ${y}px)`
      stroke.style.height = `${height}px`
      dialogPath.setAttribute(
        'd',
        this.elementPath(null, { relative: true, positive: true })
      )
    },
    clipPath: function (element = null, options = {}) {
      element = element || this.target
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      }
      return `${this.windowPath()} ${this.elementPath(element, options)}`.trim()
    },
    windowPath: function () {
      const documentHeight = Math.max(
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )
      let path = 'M 0 0 '
      path += 'L 0 ' + documentHeight + ' '
      path += 'L ' + window.innerWidth + ' ' + documentHeight + ' '
      path += 'L ' + window.innerWidth + ' 0 '
      path += 'L 0 0 '
      return path.trim()
    },
    findElement: function (name) {
      return (
        document.querySelector(selector.replace(/\\/g, '\\\\').replace(/\./g, '\\$&')) ??
                document.querySelector(selector)
      )
    },
    elementPath: function (element = null, options = {}) {
      element = element || this.target
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        ...options
      }
      const rect = this.elementRect(element, {
        relative: false,
        ...options
      })
      let path = ''
      path += 'M ' + rect[0].x + ' ' + (rect[0].y + options.radius) + ' '
      path +=
                'C ' +
                rect[0].x +
                ' ' +
                rect[0].y +
                ' ' +
                rect[0].x +
                ' ' +
                rect[0].y +
                ' ' +
                (rect[0].x + options.radius) +
                ' ' +
                rect[0].y +
                ' '
      path += 'L ' + (rect[1].x - options.radius) + ' ' + rect[1].y + ' '
      path +=
                'C ' +
                rect[1].x +
                ' ' +
                rect[1].y +
                ' ' +
                rect[1].x +
                ' ' +
                rect[1].y +
                ' ' +
                rect[1].x +
                ' ' +
                (rect[1].y + options.radius) +
                ' '
      path += 'L ' + rect[2].x + ' ' + (rect[2].y - options.radius) + ' '
      path +=
                'C ' +
                rect[2].x +
                ' ' +
                rect[2].y +
                ' ' +
                rect[2].x +
                ' ' +
                rect[2].y +
                ' ' +
                (rect[2].x - options.radius) +
                ' ' +
                rect[2].y +
                ' '
      path += 'L ' + (rect[3].x + options.radius) + ' ' + rect[3].y + ' '
      path +=
                'C ' +
                rect[3].x +
                ' ' +
                rect[3].y +
                ' ' +
                rect[3].x +
                ' ' +
                rect[3].y +
                ' ' +
                rect[3].x +
                ' ' +
                (rect[3].y - options.radius) +
                ' '
      path += 'L ' + rect[0].x + ' ' + (rect[0].y + options.radius) + ' '
      return path.trim()
    },
    elementRect: function (element = null, options = {}) {
      element = element || this.target
      const bounds = element.getBoundingClientRect()
      options = {
        radius: 24,
        margin: 10,
        offset: { x: 0, y: 0 },
        relative: false,
        ...options
      }
      const left = options.relative ? 0 : bounds.left
      const top = options.relative ? 0 : element.offsetTop
      const result = [
        {
          x: left - options.margin + options.offset.x,
          y: top - options.margin + options.offset.y
        },
        {
          x:
                        left +
                        element.clientWidth +
                        options.margin +
                        options.offset.x,
          y: top - options.margin + options.offset.y
        },
        {
          x:
                        left +
                        element.clientWidth +
                        options.margin +
                        options.offset.x,
          y:
                        top +
                        element.clientHeight +
                        options.margin +
                        options.offset.y
        },
        {
          x: left - options.margin + options.offset.x,
          y:
                        top +
                        element.clientHeight +
                        options.margin +
                        options.offset.y
        }
      ]
      if (options.positive) {
        let minX = 0
        let minY = 0
        for (let i = 0; i < result.length; i++) {
          if (result[i].x < minX) {
            minX = result[i].x
          }
          if (result[i].y < minY) {
            minY = result[i].y
          }
        }
        for (let i = 0; i < result.length; i++) {
          result[i].x -= minX
          result[i].y -= minY
        }
      }
      return result
    }
  }
}
export { stepComponent as default }
// # sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tcG9uZW50cy9zdGVwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGVwQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkSW50ZXJjZXB0Q2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHRDbGlja0FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogbnVsbCxcblxuICAgICAgICBzbGVlcDogZnVuY3Rpb24gKG1zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLmZpbmRFbGVtZW50KGtleSk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUdXRvcmlhbCBzdGVwIHdhcyBub3QgZm91bmQ6Jywga2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdpbmRvdy5ibHVyKCk7XG4gICAgICAgICAgICAvLyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5ibHVyKCkpO1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcblxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nXScpO1xuICAgICAgICAgICAgY29uc3QgY2xpcFBhdGggPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jbGlwLXBhdGhdJyk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRJbnRlcmNlcHRDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHdpcmUuY2FsbChpbnRlcmNlcHRDbGlja0FjdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjZW5kYW50cyA9IHRoaXMudGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6aG92ZXJcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjZW5kYW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY2VuZGFudCA9IGRlc2NlbmRhbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY2VuZGFudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplRGlhbG9nKCk7XG5cbiAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjbGlwUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLmNsaXBQYXRoKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGRpc3BhdGNoKCd0dXRvcmlhbDo6cmVuZGVyJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2xpcFBhdGguc2V0QXR0cmlidXRlKCdkJywgdGhpcy5jbGlwUGF0aCgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0aW1lb3V0czogW10sXG5cbiAgICAgICAgY29uZmlndXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBrZXkgY29kZSBvZiB0aGUga2V5IHByZXNzZWRcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZXZlbnQua2V5O1xuXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBzdGF0ZSBvZiB0aGUgbW9kaWZpZXIga2V5c1xuICAgICAgICAgICAgICAgIC8vIHZhciBpc0N0cmxLZXkgPSBldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGlzQWx0S2V5ID0gZXZlbnQuYWx0S2V5O1xuICAgICAgICAgICAgICAgIHZhciBpc1NoaWZ0S2V5ID0gZXZlbnQuc2hpZnRLZXk7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ3RybEtleSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBpc0FsdEtleSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGNvbWJpbmF0aW9uIG9mIG1vZGlmaWVyIGtleXMgYW5kIG5vcm1hbCBrZXlzIHdlcmUgcHJlc3NlZFxuICAgICAgICAgICAgICAgIC8vIGlmIChpc0N0cmxLZXkgfHwgaXNBbHRLZXkgfHwgaXNTaGlmdEtleSB8fCBrZXkgPT09ICdUYWInKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGtleSA9PT0gJ1RhYicgfHwgaXNTaGlmdEtleSAmJiBrZXkgPT09ICdUYWInKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ1RhYicpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBldmVudCBiZWhhdmlvclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jaG9pY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSB0aGlzLnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuY2hvaWNlc19fbGlzdC5jaG9pY2VzX19saXN0LS1kcm9wZG93bicpO1xuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5zdHlsZS56SW5kZXggPSAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQudGFnTmFtZSA9PT0gJ1RSSVgtRURJVE9SJykge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ3RyaXgnXSA9IHRoaXMudGFyZ2V0LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMudGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIG11dGF0aW9uc0xpc3QuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dHNbJ3RyaXgnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRzWyd0cml4J10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRzWyd0cml4J10gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRzWyd0cml4J10gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydoZWlnaHQnXSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMudGFyZ2V0LCBjb25maWcpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHwgdGhpcy50KSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbml0aWFsIHNpemUgb2YgdGhlIHRleHRhcmVhXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxXaWR0aCA9IHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsSGVpZ2h0ID0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgTXV0YXRpb25PYnNlcnZlciB0byBtb25pdG9yIHNpemUgY2hhbmdlc1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXQub2Zmc2V0V2lkdGggIT09IGluaXRpYWxXaWR0aCB8fCB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQgIT09IGluaXRpYWxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxXaWR0aCA9IHRoaXMudGFyZ2V0Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEhlaWdodCA9IHRoaXMudGFyZ2V0Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dHNbJ3RleHRhcmVhJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0c1sndGV4dGFyZWEnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZW91dHNbJ3RleHRhcmVhJ10gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRzWyd0ZXh0YXJlYSddID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IG9ic2VydmluZyBjaGFuZ2VzIGluIHRoZSB0ZXh0YXJlYSBlbGVtZW50XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLnRhcmdldCwge2F0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIFlvdSBjYW4gZGVmaW5lIGFueSBvdGhlciBBbHBpbmUuanMgZnVuY3Rpb25zIGhlcmUuXG5cbiAgICAgICAgaW5pdGlhbGl6ZURpYWxvZzogZnVuY3Rpb24gKGRpYWxvZyA9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZGlhbG9nKSB7XG4gICAgICAgICAgICAgICAgZGlhbG9nID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignW2RhdGEtZGlhbG9nXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGlhbG9nUGF0aCA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ctcGF0aF0nKTtcblxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFJlY3QoKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IGhlYWRlciA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaWFsb2ctaGVhZGVyXScpO1xuICAgICAgICAgICAgY29uc3Qgc3Ryb2tlID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpYWxvZy1zdHJva2VdJyk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgdG9wOiByZWN0WzBdLnkgLSAod2luZG93LmlubmVySGVpZ2h0IC8gMyksXG4gICAgICAgICAgICAgICAgbGVmdDogcmVjdFswXS54LFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gcmVjdFsxXS54IC0gcmVjdFswXS54O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gcmVjdFsyXS55IC0gcmVjdFswXS55O1xuXG4gICAgICAgICAgICBjb25zdCB4ID0gcmVjdFswXS54O1xuICAgICAgICAgICAgY29uc3QgeSA9IHJlY3RbMF0ueTtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgICAgICAgIGRpYWxvZy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICAgICAgICBzdHJva2Uuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcblxuICAgICAgICAgICAgZGlhbG9nUGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCB0aGlzLmVsZW1lbnRQYXRoKG51bGwsIHtyZWxhdGl2ZTogdHJ1ZSwgcG9zaXRpdmU6IHRydWV9KSlcbiAgICAgICAgfSxcblxuICAgICAgICBjbGlwUGF0aDogZnVuY3Rpb24gKGVsZW1lbnQgPSBudWxsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMudGFyZ2V0O1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICByYWRpdXM6IDI0LFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB7eDogMCwgeTogMH0sXG4gICAgICAgICAgICAgICAgcmVsYXRpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLndpbmRvd1BhdGgoKX0gJHt0aGlzLmVsZW1lbnRQYXRoKGVsZW1lbnQsIG9wdGlvbnMpfWAudHJpbSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHdpbmRvd1BhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50SGVpZ2h0ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBhZGQgb3B0aW9uIHRvIHNlbGVjdCBjbG9ja3dpc2UgL2NvdW50ZXIgY2xvY2t3aXNlXG4gICAgICAgICAgICAvL00gMCA4IEMgMCAwIDAgMCA4IDAgTCAzOCAwIEMgNDYgMCA0NiAwIDQ2IDggQyA0NiAxNiA0NiAxNiAzOCAxNiBMIDggMTYgQyAwIDE2IDAgMTYgMCA4XG4gICAgICAgICAgICBsZXQgcGF0aCA9ICdNIDAgMCAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAwICcgKyBkb2N1bWVudEhlaWdodCArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIHdpbmRvdy5pbm5lcldpZHRoICsgJyAnICsgZG9jdW1lbnRIZWlnaHQgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyB3aW5kb3cuaW5uZXJXaWR0aCArICcgMCAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAwIDAgJztcblxuICAgICAgICAgICAgcmV0dXJuIHBhdGgudHJpbSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGZpbmRFbGVtZW50OiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IucmVwbGFjZSgvXFwuL2csICdcXFxcJCYnKSlcbiAgICAgICAgICAgICAgICA/PyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfSxcblxuICAgICAgICBlbGVtZW50UGF0aDogZnVuY3Rpb24gKGVsZW1lbnQgPSBudWxsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IHRoaXMudGFyZ2V0O1xuICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICByYWRpdXM6IDI0LFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB7eDogMCwgeTogMH0sXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFJlY3QoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgIHJlbGF0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCBwYXRoID0gJyc7XG4gICAgICAgICAgICBwYXRoICs9ICdNICcgKyByZWN0WzBdLnggKyAnICcgKyAocmVjdFswXS55ICsgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgcmVjdFswXS54ICsgJyAnICsgcmVjdFswXS55ICsgJyAnICsgKHJlY3RbMF0ueCArIG9wdGlvbnMucmFkaXVzKSArICcgJyArIHJlY3RbMF0ueSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0wgJyArIChyZWN0WzFdLnggLSBvcHRpb25zLnJhZGl1cykgKyAnICcgKyByZWN0WzFdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdDICcgKyByZWN0WzFdLnggKyAnICcgKyByZWN0WzFdLnkgKyAnICcgKyByZWN0WzFdLnggKyAnICcgKyByZWN0WzFdLnkgKyAnICcgKyByZWN0WzFdLnggKyAnICcgKyAocmVjdFsxXS55ICsgb3B0aW9ucy5yYWRpdXMpICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgcmVjdFsyXS54ICsgJyAnICsgKHJlY3RbMl0ueSAtIG9wdGlvbnMucmFkaXVzKSArICcgJztcbiAgICAgICAgICAgIHBhdGggKz0gJ0MgJyArIHJlY3RbMl0ueCArICcgJyArIHJlY3RbMl0ueSArICcgJyArIHJlY3RbMl0ueCArICcgJyArIHJlY3RbMl0ueSArICcgJyArIChyZWN0WzJdLnggLSBvcHRpb25zLnJhZGl1cykgKyAnICcgKyByZWN0WzJdLnkgKyAnICc7XG4gICAgICAgICAgICBwYXRoICs9ICdMICcgKyAocmVjdFszXS54ICsgb3B0aW9ucy5yYWRpdXMpICsgJyAnICsgcmVjdFszXS55ICsgJyAnO1xuICAgICAgICAgICAgcGF0aCArPSAnQyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgcmVjdFszXS55ICsgJyAnICsgcmVjdFszXS54ICsgJyAnICsgKHJlY3RbM10ueSAtIG9wdGlvbnMucmFkaXVzKSArICcgJztcbiAgICAgICAgICAgIC8vIHBhdGggKz0gJ1onO1xuICAgICAgICAgICAgcGF0aCArPSAnTCAnICsgcmVjdFswXS54ICsgJyAnICsgKHJlY3RbMF0ueSArIG9wdGlvbnMucmFkaXVzKSArICcgJztcblxuICAgICAgICAgICAgcmV0dXJuIHBhdGgudHJpbSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVsZW1lbnRSZWN0OiBmdW5jdGlvbiAoZWxlbWVudCA9IG51bGwsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJhZGl1czogMjQsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHt4OiAwLCB5OiAwfSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IG9wdGlvbnMucmVsYXRpdmUgPyAwIDogYm91bmRzLmxlZnQ7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBvcHRpb25zLnJlbGF0aXZlID8gMCA6IGVsZW1lbnQub2Zmc2V0VG9wO1xuXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCAtIG9wdGlvbnMubWFyZ2luICsgb3B0aW9ucy5vZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG9wIC0gb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3AgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LnlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogbGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGggKyBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgLSBvcHRpb25zLm1hcmdpbiArIG9wdGlvbnMub2Zmc2V0LngsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvcCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgb3B0aW9ucy5tYXJnaW4gKyBvcHRpb25zLm9mZnNldC55XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucG9zaXRpdmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWluWCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IG1pblkgPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS54IDwgbWluWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWCA9IHJlc3VsdFtpXS54O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpXS55IDwgbWluWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWSA9IHJlc3VsdFtpXS55O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnggLT0gbWluWDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2ldLnkgLT0gbWluWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNB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
