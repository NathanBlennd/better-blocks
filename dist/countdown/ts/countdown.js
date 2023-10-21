window.onload = function () {
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
        setInterval(function () {
            var diff = date - Date.now();
            if (diff < 0) {
                diff = 0;
            }
            var diff_as_date = new Date(diff);
            days.textContent = diff_as_date.getDate().toString();
            hours.textContent = diff_as_date.getHours().toString();
            minutes.textContent = diff_as_date.getMinutes().toString();
            seconds.textContent = diff_as_date.getSeconds().toString();
        }, 1000);
    });
};
//# sourceMappingURL=countdown.js.map