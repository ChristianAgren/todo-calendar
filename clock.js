
/**
 * Defines the hours and minutes of the current time
 */
function defineClock() {
    const   date = new Date(),
            day = date.getDate(),
            month = date.getMonth() + 1,
            hours = date.getHours(),
            mins = date.getMinutes();            

    buildClock(day, month, hours, mins)
}

/**
 * Builds the appearance of the clock
 * @param {Number} day Current day generated from date function
 * @param {Number} month Current month generated from date function
 * @param {Number} hours Time in hours generated from date function
 * @param {Number} mins Time in minutes generated from date function
 */
function buildClock(day, month, hours, mins) {
    hours = (hours < 10) ? "0" + hours : hours;
    mins = (mins < 10) ? "0" + mins : mins;

    const time = month + "-" + day + " " + hours + ":" + mins;
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