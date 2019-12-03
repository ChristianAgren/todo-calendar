
/**
 * Defines the hours and minutes of the current time
 */
function defineClock() {
    const   date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            mins = date.getMinutes();            

    buildClock(day, month, hours, mins, year)
}

/**
 * Builds the appearance of the clock
 * @param {Number} day Current day generated from date function
 * @param {Number} month Current month generated from date function
 * @param {Number} hours Time in hours generated from date function
 * @param {Number} mins Time in minutes generated from date function
 */
function buildClock(day, month, hours, mins, year) {
    hours = (hours < 10) ? "0" + hours : hours;
    mins = (mins < 10) ? "0" + mins : mins;
    month = (month < 10) ? "0" + month : month;
    day = (day < 10) ? "0" + day : day;

    const time = hours + ":" + mins  + "\n" + year + "-" + month + "-" + day;
    showClock(time)
}

/**
 * Sends time into DOM and refreshes clock each second
 * @param {String} time The generated timestring
 */
function showClock(time) {
    document.querySelector('div.clock').innerText = time    
    setTimeout(defineClock, 1000)
}