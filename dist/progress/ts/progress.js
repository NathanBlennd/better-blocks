(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var PROGRESS_SELECTOR = 'progress';
        var intersectionObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    if (entry.target instanceof HTMLProgressElement) {
                        entry.target.value = parseInt(entry.target.dataset.value);
                    }
                    observer.unobserve(entry.target);
                }
            });
        });
        var progress = document.querySelectorAll(PROGRESS_SELECTOR);
        progress.forEach(function (element) {
            element.dataset.value = element.value.toString();
            element.value = 0;
            intersectionObserver.observe(element);
        });
    });
})();
//# sourceMappingURL=progress.js.map