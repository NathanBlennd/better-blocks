const ACCORDION_TIMEOUT = 300;
const ACCORDION_ARIA_EXPANDED = 'aria-expanded';

const ACCORDION_CLASS = 'wp-block-blennder-blocks-accordion';
const ACCORDION_ITEM_CLASS = 'accordion-item';
const ACCORDION_BODY_CLASS = 'accordion-body';
const ACCORDION_BUTTON_CLASS = 'accordion-button';
const ACCORDION_COLLAPSIBLE_CLASS = 'accordion-collapse';

const ACCORDION_COLLAPSE_CLASS = 'collapse';
const ACCORDION_COLLAPSED_CLASS = 'collapsed';
const ACCORDION_COLLAPSING_CLASS = 'collapsing';
const ACCORDION_SHOW_CLASS = 'show';

const ACCORDION_SELECTOR = '.' + ACCORDION_CLASS;
const ACCORDION_ITEM_SELECTOR = '.' + ACCORDION_ITEM_CLASS;
const ACCORDION_BODY_SELECTOR = '.' + ACCORDION_BODY_CLASS;
const ACCORDION_BUTTON_SELECTOR = '.' + ACCORDION_BUTTON_CLASS;
const ACCORDION_COLLAPSIBLE_SELECTOR = '.' + ACCORDION_COLLAPSIBLE_CLASS;

const expand_accordion_item = function( item ) {

	let button = item.querySelector( ACCORDION_BUTTON_SELECTOR );
	let collapse = item.querySelector( ACCORDION_COLLAPSIBLE_SELECTOR );

	collapse.classList.add( ACCORDION_COLLAPSING_CLASS );
	collapse.classList.remove( ACCORDION_COLLAPSE_CLASS );
	let scrollHeight = collapse.querySelector( ACCORDION_BODY_SELECTOR ).scrollHeight

	collapse.style.height = scrollHeight + "px"
	collapse.classList.add( ACCORDION_SHOW_CLASS )

	setTimeout(function(){
		collapse.classList.remove( ACCORDION_COLLAPSING_CLASS )
		collapse.style.height = null
		collapse.classList.add( ACCORDION_COLLAPSE_CLASS );
	}, ACCORDION_TIMEOUT );

	button.classList.remove( ACCORDION_COLLAPSED_CLASS )
	button.setAttribute( ACCORDION_ARIA_EXPANDED, 'true' )
}

const collapse_accordion_item = function( item ) {

	let button = item.querySelector( ACCORDION_BUTTON_SELECTOR );
	let collapse = item.querySelector( ACCORDION_COLLAPSIBLE_SELECTOR );

	let scrollHeight = collapse.querySelector( ACCORDION_BODY_SELECTOR ).scrollHeight
	collapse.style.height = scrollHeight + "px"
	collapse.classList.add( ACCORDION_COLLAPSING_CLASS )

	setTimeout(() => { collapse.style.height = null }, 1 );

	setTimeout(() => {
		collapse.classList.remove( ACCORDION_SHOW_CLASS )
		collapse.classList.remove( ACCORDION_COLLAPSING_CLASS )
	}, ACCORDION_TIMEOUT );

	button.classList.add( ACCORDION_COLLAPSED_CLASS )
	button.setAttribute( ACCORDION_ARIA_EXPANDED, 'false' )
}

const accordions = document.querySelectorAll( ACCORDION_SELECTOR );
accordions.forEach( function(e) {
	if( e.children.length > 0 ) {
		expand_accordion_item( e.children[0] )
	}
});

document.addEventListener('click',function(e){
	let target = e.target as Element;
	let button = target.closest( ACCORDION_BUTTON_SELECTOR );

	if( button == undefined ) {
		return;
	}

	let accordion_item = button.closest( ACCORDION_ITEM_SELECTOR );
	let accordion_collapse = accordion_item.querySelector( ACCORDION_COLLAPSIBLE_SELECTOR );

	if( accordion_collapse.classList.contains( ACCORDION_SHOW_CLASS ) ) {
		collapse_accordion_item( accordion_item );
		return;
	}

	let parent = target.closest( ACCORDION_SELECTOR );
	let children = parent.querySelectorAll( ACCORDION_ITEM_SELECTOR );
	children.forEach( function( child ) {
		if( child !== accordion_item ) {
			collapse_accordion_item( child );
		}
		else {
			expand_accordion_item( child );
		}
	});
});
