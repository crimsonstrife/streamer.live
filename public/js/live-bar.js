// Ensure the DOM is ready and jQuery is available
document.addEventListener("DOMContentLoaded", function () {
    if (typeof jQuery === "undefined") {
        console.warn("jQuery is not loaded. Skipping live bar script.");
        return;
    }

    const $ = jQuery;

    // === Glitch Text Animation ===
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    const framesPerLetterResolve = 10;
    const framesPerRandomLetter = 2;
    let frame = 0;
    let index = 0;
    const endingString = $.trim($(".livebar .text").text());

    let currentString = "";

    const updateBar = () => {
        if (frame % framesPerRandomLetter === 0) {
            currentString = randomString(endingString, index);
            $(".livebar .text").text(currentString);
        }

        if (frame % framesPerLetterResolve === 0) {
            index++;
        }

        if (currentString === endingString) {
            return;
        }

        requestAnimationFrame(() => {
            frame++;
            updateBar();
        });
    };

    const randomString = (ending, index) => {
        let newString = "";
        const remainingIterations = ending.length - index;

        if (remainingIterations < endingString.length) {
            newString += ending.substr(0, ending.length - remainingIterations);
        }

        if (index < ending.length) {
            const random = Math.floor(Math.random() * letters.length);
            const letter = letters[random];
            newString += letter;
        }

        return newString;
    };

    // === Live Bar Pulse Effect ===
    setTimeout(() => {
        $(".livebar").addClass("on");
    }, 1000);

    let pulseFrame = 0;
    const framesPerNewPulse = 140;
    let random = Math.floor(Math.random() * framesPerNewPulse * 2);

    const addPulse = (extraClass = "") => {
        const $circle = $(`<div class='circle ${extraClass}'></div>`);
        $(".pulse").append($circle);

        // Automatically remove the pulse after animation ends
        setTimeout(() => {
            $circle.remove();
        }, 3000);
    };

    const pulseLoop = () => {
        pulseFrame++;

        if (pulseFrame === framesPerNewPulse) {
            pulseFrame = 0;
            random = Math.floor(Math.random() * framesPerNewPulse);
            addPulse();
        }

        if (pulseFrame === random) {
            // addPulse("special");
        }

        requestAnimationFrame(() => {
            pulseLoop();
        });
    };

    // Initialize animations
    updateBar();
    pulseLoop();
});
