document.addEventListener("DOMContentLoaded", function() {

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

		let interval = setInterval(function(){
			let diff = date-Date.now();
			let diff_as_date = new Date(diff);

			let daysString = Math.floor( diff / (1000 * 60 * 60 * 24) ).toString();
			let hoursString = diff_as_date.getHours().toString();
			let minutesString = diff_as_date.getMinutes().toString();
			let secondsString = diff_as_date.getSeconds().toString();

			if( diff < 0 ) {
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
