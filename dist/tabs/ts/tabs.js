(function () {
    var TABS_CLASS = 'wp-block-better-blocks-tabs';
    var TAB_CLASS = 'wp-block-better-blocks-tab';
    var TAB_LABEL_CLASS = 'tab-label';
    var TAB_ACTIVE_CLASS = 'active';
    var TABS_SELECTOR = '.' + TABS_CLASS;
    var TAB_SELECTOR = '.' + TAB_CLASS;
    var TAB_LABEL_SELECTOR = '.' + TAB_LABEL_CLASS;
    document.addEventListener("DOMContentLoaded", function () {
        var tabs = document.querySelectorAll(TAB_LABEL_SELECTOR);
        tabs.forEach(function (el) {
            el.addEventListener('click', function (e) {
                if (this.classList.contains(TAB_ACTIVE_CLASS)) {
                    return;
                }
                var parent = this.closest(TABS_SELECTOR);
                var tabs = parent.querySelectorAll(TAB_SELECTOR);
                tabs.forEach(function (el) {
                    el.classList.remove(TAB_ACTIVE_CLASS);
                });
                var labels = parent.querySelectorAll(TAB_LABEL_SELECTOR);
                labels.forEach(function (el) {
                    el.classList.remove(TAB_ACTIVE_CLASS);
                });
                var id = this.getAttribute('aria-controls');
                var tab = parent.querySelector('[data-tab="' + id + '"]');
                if (tab != null) {
                    tab.classList.add(TAB_ACTIVE_CLASS);
                }
                // console.log(tab.classList.length);
                // parent.querySelector( '#' + id ).classList.add( TAB_ACTIVE_CLASS );
                this.classList.add(TAB_ACTIVE_CLASS);
            });
        });
    });
})();
//# sourceMappingURL=tabs.js.map