import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import Swiper from 'swiper'
import { Navigation, Thumbs } from 'swiper/modules'
import * as theme from './theme.js'

Swiper.use([Navigation, Thumbs])

// Use Bootstrap globally
window.bootstrap = bootstrap

// Use jQuery globally
window.$ = window.jQuery = $

// Use Swiper globally
window.Swiper = Swiper
window.SwiperModules = { Navigation, Thumbs }

const startTheme = () => theme.init(document.documentElement.dataset.themeDefault)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTheme)
} else {
    startTheme()
}

