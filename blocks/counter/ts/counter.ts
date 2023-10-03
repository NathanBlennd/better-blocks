(function() {

	document.addEventListener("DOMContentLoaded", function() { 
		const COUNTER_SELECTOR = '.counter';
		const COUNTER_VALUE_SELECTOR = '.counter-value';

		const intersectionObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
			  
				if (entry.intersectionRatio > 0) {

					if ( entry.target instanceof HTMLElement) {
						countUp(entry.target);
					}

				observer.unobserve(entry.target);
			  }
			});
		  });

		const countUp = function( element:HTMLElement ) {
			let duration = 2000;
			let span = parseInt(element.dataset.final) - parseInt(element.dataset.initial);
			let interval = duration / span;

			let intervalId = setInterval(function(){
				let value = element.querySelector(COUNTER_VALUE_SELECTOR);
				let currentValue = parseInt(value.innerHTML);
				currentValue ++;
				value.innerHTML = currentValue.toString();

				if( currentValue >= parseInt(element.dataset.final) ) {
					clearInterval(intervalId);
				}
			},interval);
		}

		const counter = document.querySelectorAll( COUNTER_SELECTOR )
		counter.forEach( function( element:HTMLElement ) {
			let value = element.querySelector( COUNTER_VALUE_SELECTOR );
			if (value instanceof HTMLElement) {
				value.innerHTML = element.dataset.initial ?? ''
				intersectionObserver.observe(element);
			}
		});
	});

})();