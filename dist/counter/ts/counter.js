(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var COUNTER_SELECTOR = '.counter';
        var COUNTER_VALUE_SELECTOR = '.counter-value';
        var intersectionObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    if (entry.target instanceof HTMLElement) {
                        countUp(entry.target);
                    }
                    observer.unobserve(entry.target);
                }
            });
        });
        var countUp = function (element) {
            var duration = 2000;
            var span = parseInt(element.dataset.final) - parseInt(element.dataset.initial);
            var interval = duration / span;
            var intervalId = setInterval(function () {
                var value = element.querySelector(COUNTER_VALUE_SELECTOR);
                var currentValue = parseInt(value.innerHTML);
                currentValue++;
                value.innerHTML = currentValue.toString();
                if (currentValue >= parseInt(element.dataset.final)) {
                    clearInterval(intervalId);
                }
            }, interval);
        };
        var counter = document.querySelectorAll(COUNTER_SELECTOR);
        counter.forEach(function (element) {
            var _a;
            var value = element.querySelector(COUNTER_VALUE_SELECTOR);
            if (value instanceof HTMLElement) {
                value.innerHTML = (_a = element.dataset.initial) !== null && _a !== void 0 ? _a : '';
                intersectionObserver.observe(element);
            }
        });
    });
})();
//# sourceMappingURL=counter.js.map