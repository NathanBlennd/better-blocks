(function() {

	const TABS_CLASS = 'wp-block-better-blocks-tabs';
	const TAB_CLASS = 'wp-block-better-blocks-tab';
	const TAB_LABEL_CLASS = 'tab-label';
	const TAB_ACTIVE_CLASS = 'active';

	const TABS_SELECTOR = '.' + TABS_CLASS;
	const TAB_SELECTOR = '.' + TAB_CLASS;
	const TAB_LABEL_SELECTOR = '.' + TAB_LABEL_CLASS;

	document.addEventListener("DOMContentLoaded", function() { 
		const tabs = document.querySelectorAll( TAB_LABEL_SELECTOR );

		tabs.forEach( function(el) {
			el.addEventListener('click',function(e){

				if( this.classList.contains( TAB_ACTIVE_CLASS ) ) {
					return;
				}

				let parent = this.closest( TABS_SELECTOR );
				
				let tabs = parent.querySelectorAll( TAB_SELECTOR );
				tabs.forEach(function(el){
					el.classList.remove( TAB_ACTIVE_CLASS );
				});
				let labels = parent.querySelectorAll( TAB_LABEL_SELECTOR );
				labels.forEach(function(el) {
					el.classList.remove( TAB_ACTIVE_CLASS );
				});
				let id = this.getAttribute('aria-controls');
				parent.querySelector( '#' + id ).classList.add( TAB_ACTIVE_CLASS );
				this.classList.add( TAB_ACTIVE_CLASS );
			});
		});
	});

})();