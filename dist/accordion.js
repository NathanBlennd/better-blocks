var ACCORDION_TIMEOUT = 300;
var ACCORDION_ARIA_EXPANDED = 'aria-expanded';
var ACCORDION_CLASS = 'wp-block-blennder-blocks-accordion';
var ACCORDION_ITEM_CLASS = 'accordion-item';
var ACCORDION_BODY_CLASS = 'accordion-body';
var ACCORDION_BUTTON_CLASS = 'accordion-button';
var ACCORDION_COLLAPSIBLE_CLASS = 'accordion-collapse';
var ACCORDION_COLLAPSE_CLASS = 'collapse';
var ACCORDION_COLLAPSED_CLASS = 'collapsed';
var ACCORDION_COLLAPSING_CLASS = 'collapsing';
var ACCORDION_SHOW_CLASS = 'show';
var ACCORDION_SELECTOR = '.' + ACCORDION_CLASS;
var ACCORDION_ITEM_SELECTOR = '.' + ACCORDION_ITEM_CLASS;
var ACCORDION_BODY_SELECTOR = '.' + ACCORDION_BODY_CLASS;
var ACCORDION_BUTTON_SELECTOR = '.' + ACCORDION_BUTTON_CLASS;
var ACCORDION_COLLAPSIBLE_SELECTOR = '.' + ACCORDION_COLLAPSIBLE_CLASS;
var expand_accordion_item = function (item) {
    var button = item.querySelector(ACCORDION_BUTTON_SELECTOR);
    var collapse = item.querySelector(ACCORDION_COLLAPSIBLE_SELECTOR);
    collapse.classList.add(ACCORDION_COLLAPSING_CLASS);
    collapse.classList.remove(ACCORDION_COLLAPSE_CLASS);
    var scrollHeight = collapse.querySelector(ACCORDION_BODY_SELECTOR).scrollHeight;
    collapse.style.height = scrollHeight + "px";
    collapse.classList.add(ACCORDION_SHOW_CLASS);
    setTimeout(function () {
        collapse.classList.remove(ACCORDION_COLLAPSING_CLASS);
        collapse.style.height = null;
        collapse.classList.add(ACCORDION_COLLAPSE_CLASS);
    }, ACCORDION_TIMEOUT);
    button.classList.remove(ACCORDION_COLLAPSED_CLASS);
    button.setAttribute(ACCORDION_ARIA_EXPANDED, 'true');
};
var collapse_accordion_item = function (item) {
    var button = item.querySelector(ACCORDION_BUTTON_SELECTOR);
    var collapse = item.querySelector(ACCORDION_COLLAPSIBLE_SELECTOR);
    var scrollHeight = collapse.querySelector(ACCORDION_BODY_SELECTOR).scrollHeight;
    collapse.style.height = scrollHeight + "px";
    collapse.classList.add(ACCORDION_COLLAPSING_CLASS);
    setTimeout(function () { collapse.style.height = null; }, 1);
    setTimeout(function () {
        collapse.classList.remove(ACCORDION_SHOW_CLASS);
        collapse.classList.remove(ACCORDION_COLLAPSING_CLASS);
    }, ACCORDION_TIMEOUT);
    button.classList.add(ACCORDION_COLLAPSED_CLASS);
    button.setAttribute(ACCORDION_ARIA_EXPANDED, 'false');
};
var accordions = document.querySelectorAll(ACCORDION_SELECTOR);
accordions.forEach(function (e) {
    if (e.children.length > 0) {
        expand_accordion_item(e.children[0]);
    }
});
document.addEventListener('click', function (e) {
    var target = e.target;
    var button = target.closest(ACCORDION_BUTTON_SELECTOR);
    if (button == undefined) {
        return;
    }
    var accordion_item = button.closest(ACCORDION_ITEM_SELECTOR);
    var accordion_collapse = accordion_item.querySelector(ACCORDION_COLLAPSIBLE_SELECTOR);
    if (accordion_collapse.classList.contains(ACCORDION_SHOW_CLASS)) {
        collapse_accordion_item(accordion_item);
        return;
    }
    var parent = target.closest(ACCORDION_SELECTOR);
    var children = parent.querySelectorAll(ACCORDION_ITEM_SELECTOR);
    children.forEach(function (child) {
        if (child !== accordion_item) {
            collapse_accordion_item(child);
        }
        else {
            expand_accordion_item(child);
        }
    });
});
//# sourceMappingURL=accordion.js.map