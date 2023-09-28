// $("input.slider").on("input change", function(event) {
// 	var element = $(this).parents("div.container");
// 	var pos = event.target.value;
	
// 	element.find("div.before").css({width: pos + "%"});
// 	element.find("div.slider-button").css({left: "calc(" + pos + "% - 18px)"});
// });
(function() {

	document.addEventListener("DOMContentLoaded", function() { 
		const BEFORE_AFTER_SLIDER_SELECTOR = '.slider';

		const eventHandler = function(e) {
			let pos = e.target.value;
			let before = e.target.parentElement.querySelector('.before');
			before.style.width = pos+'%';
		}

		const beforeAfter = document.querySelectorAll( BEFORE_AFTER_SLIDER_SELECTOR )
		beforeAfter.forEach( function(element) {
			element.addEventListener('input',eventHandler);
			element.addEventListener('change',eventHandler);
		});
	});

})();