window.onload = function () {
    var CUSTOM_POST_TYPE_ARCHIVE_SELECTOR = '#custom-post-type-archive';
    var CUSTOM_POST_TYPE_ITEM_TEMPLATE = "\n\t<div class=\"wp-block-better-blocks-custom-post-type-archive__item\">\n\t\t<div class=\"wp-block-better-blocks-custom-post-type-archive__title\">{post.title.rendered}</div>\n\t\t<div class=\"wp-block-better-blocks-custom-post-type-archive__content\">{post.content.rendered}</div>\n\t</div>";
    var selector = document.querySelector(CUSTOM_POST_TYPE_ARCHIVE_SELECTOR);
    var customPostType = selector.dataset.customPostType;
    var url = window.location.origin + '/wp-json/wp/v2/' + customPostType;
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (posts) {
        posts.forEach(function (post) {
            var template = CUSTOM_POST_TYPE_ITEM_TEMPLATE;
            template = template.replace('{post.title.rendered}', post.title.rendered);
            template = template.replace('{post.content.rendered}', post.content.rendered);
            document.querySelector(CUSTOM_POST_TYPE_ARCHIVE_SELECTOR).innerHTML += template;
        });
    });
};
//# sourceMappingURL=custom-post-type-archive.js.map