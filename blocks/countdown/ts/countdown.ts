window.onload = function () {

	const COUNTDOWN_SELECTOR = '.countdown';
	const COUNTDOWN_DAYS_SELECTOR = '.days';
	const COUNTDOWN_HOURS_SELECTOR = '.hours';
	const COUNTDOWN_MINUTES_SELECTOR = '.minutes';
	const COUNTDOWN_SECONDS_SELECTOR = '.seconds';

	let countdowns = document.querySelectorAll(COUNTDOWN_SELECTOR);
	countdowns.forEach( function( countdown : HTMLElement) {
		let date = Date.parse( countdown.dataset.date );

		let days : HTMLElement = countdown.querySelector(COUNTDOWN_DAYS_SELECTOR);
		let hours : HTMLElement = countdown.querySelector(COUNTDOWN_HOURS_SELECTOR);
		let minutes : HTMLElement = countdown.querySelector(COUNTDOWN_MINUTES_SELECTOR);
		let seconds : HTMLElement = countdown.querySelector(COUNTDOWN_SECONDS_SELECTOR);

		setInterval(function(){
			let diff = date-Date.now();
			if( diff < 0 ) {
				diff = 0;
			}
			let diff_as_date = new Date(diff);

			days.textContent = diff_as_date.getDate().toString();
			hours.textContent = diff_as_date.getHours().toString();
			minutes.textContent = diff_as_date.getMinutes().toString();
			seconds.textContent = diff_as_date.getSeconds().toString();

		}, 1000);
	});

};
