document.addEventListener('DOMContentLoaded', () => {
  if (typeof jQuery === 'undefined') {
    console.warn('jQuery is not loaded. Skipping live bar script.')
    return
  }

  const $ = jQuery

  const toggleLiveBarVisibility = () => {
    $('.livebar').each(function () {
      if ($(this).data('live') === 1) {
        $(this).addClass('on')
      } else {
        $(this).removeClass('on')
      }
    })
  }

  const initGlitchText = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '
    const framesPerLetterResolve = 10
    const framesPerRandomLetter = 2
    let frame = 0
    let index = 0
    const endingString = $.trim($('.livebar .text').text())

    let currentString = ''

    const randomString = (ending, index) => {
      let newString = ''
      const remainingIterations = ending.length - index

      if (remainingIterations < endingString.length) {
        newString += ending.substr(
          0,
          ending.length - remainingIterations
        )
      }

      if (index < ending.length) {
        const random = Math.floor(Math.random() * letters.length)
        newString += letters[random]
      }

      return newString
    }

    const updateBar = () => {
      if (frame % framesPerRandomLetter === 0) {
        currentString = randomString(endingString, index)
        $('.livebar .text').text(currentString)
      }

      if (frame % framesPerLetterResolve === 0) {
        index++
      }

      if (currentString !== endingString) {
        requestAnimationFrame(() => {
          frame++
          updateBar()
        })
      }
    }

    updateBar()
  }

  const initPulseEffect = () => {
    let pulseFrame = 0
    const framesPerNewPulse = 140
    let random = Math.floor(Math.random() * framesPerNewPulse * 2)

    const addPulse = (extraClass = '') => {
      const $circle = $(`<div class='circle ${extraClass}'></div>`)
      $('.pulse').append($circle)

      setTimeout(() => {
        $circle.remove()
      }, 3000)
    }

    const pulseLoop = () => {
      pulseFrame++

      if (pulseFrame === framesPerNewPulse) {
        pulseFrame = 0
        random = Math.floor(Math.random() * framesPerNewPulse)
        addPulse()
      }

      if (pulseFrame === random) {
        // Optional: addPulse("special");
      }

      requestAnimationFrame(pulseLoop)
    }

    pulseLoop()
  }

  // Run all logic
  toggleLiveBarVisibility()
  initGlitchText()
  initPulseEffect()
})
