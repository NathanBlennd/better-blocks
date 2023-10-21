window.onload = function () {

	let countdown : HTMLElement = document.querySelector('.countdown');
	let date = Date.parse( countdown.dataset.date );

	let days : HTMLElement = countdown.querySelector('.days');
	let hours : HTMLElement = countdown.querySelector('.hours');
	let minutes : HTMLElement = countdown.querySelector('.minutes');
	let seconds : HTMLElement = countdown.querySelector('.seconds');


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

};
