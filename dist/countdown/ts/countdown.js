document.addEventListener("DOMContentLoaded", function () {
    var COUNTDOWN_SELECTOR = '.countdown';
    var COUNTDOWN_DAYS_SELECTOR = '.days';
    var COUNTDOWN_HOURS_SELECTOR = '.hours';
    var COUNTDOWN_MINUTES_SELECTOR = '.minutes';
    var COUNTDOWN_SECONDS_SELECTOR = '.seconds';
    var countdowns = document.querySelectorAll(COUNTDOWN_SELECTOR);
    countdowns.forEach(function (countdown) {
        var date = Date.parse(countdown.dataset.date);
        var days = countdown.querySelector(COUNTDOWN_DAYS_SELECTOR);
        var hours = countdown.querySelector(COUNTDOWN_HOURS_SELECTOR);
        var minutes = countdown.querySelector(COUNTDOWN_MINUTES_SELECTOR);
        var seconds = countdown.querySelector(COUNTDOWN_SECONDS_SELECTOR);
        var interval = setInterval(function () {
            var diff = date - Date.now();
            var diff_as_date = new Date(diff);
            var daysString = diff_as_date.getDate().toString();
            var hoursString = diff_as_date.getHours().toString();
            var minutesString = diff_as_date.getMinutes().toString();
            var secondsString = diff_as_date.getSeconds().toString();
            if (diff < 0) {
                daysString = '0';
                hoursString = '0';
                minutesString = '0';
                secondsString = '0';
                clearInterval(interval);
            }
            days.textContent = daysString;
            hours.textContent = hoursString;
            minutes.textContent = minutesString;
            seconds.textContent = secondsString;
        }, 1000);
    });
});
//# sourceMappingURL=countdown.js.map