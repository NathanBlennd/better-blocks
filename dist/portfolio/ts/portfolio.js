(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var PORTFOLIO_SELECTOR = '.wp-block-better-blocks-portfolio__wrapper';
        var PORTFOLIO_TEMPLATE = "\n\t\t<div class=\"wp-block-better-blocks-portfolio__item\" data-skills={post.skill}>\n\t\t\t<div class=\"wp-block-better-blocks-portfolio__image\">{post.cover_image.rendered}</div>\n\t\t</div>";
        var PORTFOLIO_ITEM_SELECTOR = '.wp-block-better-blocks-portfolio__item';
        var SKILL_SELECTOR = '.wp-block-better-blocks-portfolio__skills';
        var SKILL_TEMPLATE = "\n\t\t<li class=\"wp-block-better-blocks-portfolio__skills-item\">\n\t\t\t<button class=\"wp-block-better-blocks-portfolio__skills-item-button\" data-skill={skill.id}>\n\t\t\t\t{skill.name}\n\t\t\t</button>\n\t\t</li>\n\t\t";
        var SKILL_BUTTON_SELECTOR = '.wp-block-better-blocks-portfolio__skills-item-button';
        var skillsURL = window.location.origin + '/wp-json/wp/v2/skill';
        fetch(skillsURL)
            .then(function (response) { return response.json(); })
            .then(function (skills) {
            skills.forEach(function (skill) {
                var template = SKILL_TEMPLATE;
                template = template.replace('{skill.name}', skill.name);
                template = template.replace('{skill.id}', skill.id);
                document.querySelector(SKILL_SELECTOR).innerHTML += template;
            });
        })
            .then(function () {
            var skillButtons = document.querySelectorAll(SKILL_BUTTON_SELECTOR);
            skillButtons.forEach(function (button) {
                button.addEventListener('click', function (e) {
                    var skill = this.dataset.skill;
                    var portfolioItems = document.querySelectorAll(PORTFOLIO_ITEM_SELECTOR);
                    portfolioItems.forEach(function (item) {
                        if (typeof skill === 'undefined' ||
                            item.dataset.skills.includes(skill)) {
                            item.style.display = 'block';
                        }
                        else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        });
        var projectURL = window.location.origin + '/wp-json/wp/v2/project?per_page=100';
        fetch(projectURL)
            .then(function (response) { return response.json(); })
            .then(function (posts) {
            posts.forEach(function (post) {
                if (post.cover_image.rendered === '') {
                    return;
                }
                var template = PORTFOLIO_TEMPLATE;
                template = template.replace('{post.title.rendered}', post.title.rendered);
                template = template.replace('{post.cover_image.rendered}', post.cover_image.rendered);
                template = template.replace('{post.skill}', JSON.stringify(post.skill));
                document.querySelector(PORTFOLIO_SELECTOR).innerHTML += template;
            });
        });
    });
})();
//# sourceMappingURL=portfolio.js.map