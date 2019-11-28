
/**
 * Defines the hours and minutes of the current time
 */
function defineClock() {
    const   date = new Date(),
            hours = date.getHours(),
            mins = date.getMinutes();

    buildClock(hours, mins)
}

/**
 * Builds the appearance of the clock
 * @param {Number} hours Time in hours generated from date function
 * @param {Number} mins Time in minutes generated from date function
 */
function buildClock(hours, mins) {
    hours = (hours < 10) ? "0" + hours : hours;
    mins = (mins < 10) ? "0" + mins : mins;

    const time = hours + ":" + mins;
    showClock(time)
}

/**
 * Sends time into DOM and refreshes clock each second
 * @param {String} time The generated timestring
 */
function showClock(time) {
    document.querySelector('div.clock').innerText = time
    console.log(time);
    
    setTimeout(defineClock, 1000)
}