window.onload = function () {
    var countdown = document.querySelector('.countdown');
    var date = Date.parse(countdown.dataset.date);
    var days = countdown.querySelector('.days');
    var hours = countdown.querySelector('.hours');
    var minutes = countdown.querySelector('.minutes');
    var seconds = countdown.querySelector('.seconds');
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
};
//# sourceMappingURL=countdown.js.map