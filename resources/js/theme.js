const STORAGE_KEY = 'streamer.theme'
const VALID = ['light', 'dark', 'auto']
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export function getStored() {
    const v = localStorage.getItem(STORAGE_KEY)
    return VALID.includes(v) ? v : null
}

export function setStored(value) {
    if (!VALID.includes(value)) return
    localStorage.setItem(STORAGE_KEY, value)
}

export function resolve(value) {
    if (value === 'auto') return mediaQuery.matches ? 'dark' : 'light'
    return value === 'dark' ? 'dark' : 'light'
}

export function apply(value) {
    const resolved = resolve(value)
    document.documentElement.setAttribute('data-bs-theme', resolved)
    document.querySelectorAll('[data-theme-value]').forEach((el) => {
        el.classList.toggle('active', el.dataset.themeValue === value)
        el.setAttribute('aria-pressed', el.dataset.themeValue === value ? 'true' : 'false')
    })
    document.dispatchEvent(new CustomEvent('theme:changed', { detail: { value, resolved } }))
}

function handleMediaChange() {
    if ((getStored() ?? document.documentElement.dataset.themeDefault) === 'auto') {
        apply('auto')
    }
}

export function init(serverDefault) {
    const defaultValue = VALID.includes(serverDefault) ? serverDefault : 'light'
    document.documentElement.dataset.themeDefault = defaultValue

    apply(getStored() ?? defaultValue)

    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-theme-value]')
        if (!trigger) return
        event.preventDefault()
        const value = trigger.dataset.themeValue
        if (!VALID.includes(value)) return
        setStored(value)
        apply(value)
    })

    mediaQuery.addEventListener('change', handleMediaChange)

    document.addEventListener('livewire:navigated', () => {
        apply(getStored() ?? defaultValue)
    })
}
