window.onload = function () {
	const CUSTOM_POST_TYPE_ARCHIVE_SELECTOR = '#custom-post-type-archive';
	const CUSTOM_POST_TYPE_ITEM_TEMPLATE = `
	<div class="wp-block-better-blocks-custom-post-type-archive__item">
		<div class="wp-block-better-blocks-custom-post-type-archive__title">{post.title.rendered}</div>
		<div class="wp-block-better-blocks-custom-post-type-archive__content">{post.content.rendered}</div>
	</div>`

	let selector : HTMLElement = document.querySelector(CUSTOM_POST_TYPE_ARCHIVE_SELECTOR)
	let customPostType = selector.dataset.customPostType;
	let url = window.location.origin + '/wp-json/wp/v2/' + customPostType;

	fetch(url)
  	.then(response => response.json())
  	.then( posts => {
		posts.forEach(function(post){
			let template = CUSTOM_POST_TYPE_ITEM_TEMPLATE;
			template = template.replace( '{post.title.rendered}', post.title.rendered );
			template = template.replace( '{post.content.rendered}', post.content.rendered );
			document.querySelector(CUSTOM_POST_TYPE_ARCHIVE_SELECTOR).innerHTML += template;
		})
	});

}
