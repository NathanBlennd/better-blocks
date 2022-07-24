jQuery(function () {
    var firstItem = jQuery('.accordion .wp-block-blennder-blocks-accordion-item:first-of-type');
    firstItem.find('.accordion-collapse').addClass('show');
    firstItem.find('.accordion-button').attr('aria-expanded', 'true').removeClass('collapsed');
});
//# sourceMappingURL=accordion.js.map