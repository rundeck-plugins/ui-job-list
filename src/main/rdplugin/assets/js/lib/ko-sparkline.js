/**
 * Initializes jquery sparkline plugin on the dom element.
 * Usage: &lt;div data-bind="jqsparkline: accessor" title="blah" &gt;
 *
 * @type {{init: ko.bindingHandlers.jqsparkline.init}}
 */
jQuery(function () {
    function sparklineOptsFromBindings(allBindings) {

        var opts = {enableTagOptions: true};
        ['numberFormatter', 'tooltipFormatter', 'tooltipFormat', 'valueSpots'].forEach(function (e, ndx) {
            var setting = allBindings.get(e);
            if (setting) {
                opts[e] = ko.unwrap(setting);
            }
        });

        var showNormal = allBindings.get('showNormal');
        if (showNormal && ko.unwrap(showNormal)) {
            var normalRangeMin = allBindings.get('normalRangeMin');
            if (normalRangeMin) {
                opts['normalRangeMin'] = ko.unwrap(normalRangeMin);
            }
            var normalRangeMax = allBindings.get('normalRangeMax');
            if (normalRangeMax) {
                opts['normalRangeMax'] = ko.unwrap(normalRangeMax);
            }
        }
        var showBarColor = allBindings.get("showBarColor");
        if (showBarColor && ko.unwrap(showBarColor)) {
            var barColorMap = allBindings.get("barColorMap");
            if (barColorMap ) {
                opts['colorMap'] = ko.unwrap(barColorMap);
            }
        }

        return opts;
    }

    ko.bindingHandlers.jqSparkline = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            "use strict";
            var val = valueAccessor();

            var opts = sparklineOptsFromBindings(allBindings);
            var clickHandler = allBindings.get('sparklineClick');

            jQuery(element).sparkline(ko.unwrap(val), opts);
            if (typeof(clickHandler) == 'function') {
                jQuery(element).bind('sparklineClick', clickHandler);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    jQuery(element).unbind("sparklineClick");
                });
            }
            var hoverHandler = allBindings.get('sparklineHover');
            var unhoverHandler = allBindings.get('sparklineUnhover');

            jQuery(element).sparkline(ko.unwrap(val), opts);

            if (typeof(hoverHandler) == 'function') {
                jQuery(element).bind('sparklineRegionChange', hoverHandler);

                if (typeof(unhoverHandler) == 'function') {
                    jQuery(element).bind('mouseleave', unhoverHandler);
                }


                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    jQuery(element).unbind("sparklineRegionChange");
                    jQuery(element).unbind("mouseleave");
                });
            }
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            "use strict";
            var val = valueAccessor();
            if (ko.isObservable(val)) {
                val = ko.unwrap(val);
                var opts = sparklineOptsFromBindings(allBindings);

                jQuery(element).sparkline(val, opts);
            }
        }
    };
});