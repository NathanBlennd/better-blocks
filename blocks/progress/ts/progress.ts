(function() {

	document.addEventListener("DOMContentLoaded", function() {
		const PROGRESS_SELECTOR = 'progress';

		const intersectionObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {

				if (entry.intersectionRatio > 0) {

					if ( entry.target instanceof HTMLProgressElement) {
						entry.target.value = parseInt( entry.target.dataset.value );
					}

					observer.unobserve(entry.target);
				}
			});
		});

		const progress = document.querySelectorAll( PROGRESS_SELECTOR )
		progress.forEach( function( element:HTMLProgressElement ) {
			element.dataset.value = element.value.toString();
			element.value = 0;
			intersectionObserver.observe(element);
		});
	});

})();
