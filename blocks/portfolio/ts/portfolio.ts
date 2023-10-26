(function() {
	document.addEventListener("DOMContentLoaded", function() {
		const PORTFOLIO_SELECTOR = '.wp-block-better-blocks-portfolio__wrapper';
		const PORTFOLIO_TEMPLATE = `
		<div class="wp-block-better-blocks-portfolio__item" data-skills={post.skill}>
			<div class="wp-block-better-blocks-portfolio__image">{post.cover_image.rendered}</div>
		</div>`;

		const PORTFOLIO_ITEM_SELECTOR = '.wp-block-better-blocks-portfolio__item';

		const SKILL_SELECTOR = '.wp-block-better-blocks-portfolio__skills';
		const SKILL_TEMPLATE = `
		<li class="wp-block-better-blocks-portfolio__skills-item">
			<button class="wp-block-better-blocks-portfolio__skills-item-button" data-skill={skill.id}>
				{skill.name}
			</button>
		</li>
		`;

		const SKILL_BUTTON_SELECTOR = '.wp-block-better-blocks-portfolio__skills-item-button';

		let skillsURL = window.location.origin + '/wp-json/wp/v2/skill';
		fetch(skillsURL)
		.then(response => response.json())
		.then( skills => {
		  skills.forEach(function(skill){
				let template = SKILL_TEMPLATE;
				template = template.replace( '{skill.name}', skill.name );
				template = template.replace( '{skill.id}', skill.id );
				document.querySelector(SKILL_SELECTOR).innerHTML += template;
			})
		})
		.then( () => {
			const skillButtons = document.querySelectorAll( SKILL_BUTTON_SELECTOR );
			skillButtons.forEach( function(button) {
				button.addEventListener('click',function(e){
					let skill = this.dataset.skill;

					let portfolioItems = document.querySelectorAll(PORTFOLIO_ITEM_SELECTOR);
					portfolioItems.forEach( function(item:HTMLElement) {
						if(
							typeof skill === 'undefined' ||
							item.dataset.skills.includes(skill)

						) {
							item.style.display = 'block';
						}
						else {
							item.style.display = 'none';
						}
					});
				});
			});
		});

		let projectURL = window.location.origin + '/wp-json/wp/v2/project?per_page=100';
		fetch(projectURL)
		  .then(response => response.json())
		  .then( posts => {
			posts.forEach(function(post){
				if( post.cover_image.rendered === '' ) {
					return;
				}
				let template = PORTFOLIO_TEMPLATE;
				template = template.replace( '{post.title.rendered}', post.title.rendered );
				template = template.replace( '{post.cover_image.rendered}', post.cover_image.rendered );
				template = template.replace( '{post.skill}', JSON.stringify(post.skill) );
				document.querySelector(PORTFOLIO_SELECTOR).innerHTML += template;
			})
		});

	});

})();
