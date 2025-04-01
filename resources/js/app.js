import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import Swiper from 'swiper'
import { Navigation, Thumbs } from 'swiper/modules'

Swiper.use([Navigation, Thumbs])

// Use Bootstrap globally
window.bootstrap = bootstrap

// Use jQuery globally
window.$ = window.jQuery = $

// Use Swiper globally
window.Swiper = Swiper
window.SwiperModules = { Navigation, Thumbs }
