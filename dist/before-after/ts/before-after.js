// $("input.slider").on("input change", function(event) {
// 	var element = $(this).parents("div.container");
// 	var pos = event.target.value;
// 	element.find("div.before").css({width: pos + "%"});
// 	element.find("div.slider-button").css({left: "calc(" + pos + "% - 18px)"});
// });
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var BEFORE_AFTER_SLIDER_SELECTOR = '.slider';
        var eventHandler = function (e) {
            var pos = e.target.value;
            var before = e.target.parentElement.querySelector('.before');
            before.style.width = pos + '%';
        };
        var beforeAfter = document.querySelectorAll(BEFORE_AFTER_SLIDER_SELECTOR);
        beforeAfter.forEach(function (element) {
            element.addEventListener('input', eventHandler);
            element.addEventListener('change', eventHandler);
        });
    });
})();
//# sourceMappingURL=before-after.js.map