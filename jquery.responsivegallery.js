// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "responsiveGallery",
    defaults = {
	imageWidth: 300
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
	this.element = element;
	// jQuery has an extend method which merges the contents of two or
	// more objects, storing the result in the first object. The first object
	// is generally empty as we don't want to alter the default options for
	// future instances of the plugin
	this.settings = $.extend( {}, defaults, options );
	this._defaults = defaults;
	this._name = pluginName;
	this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
	init: function () {
	    // Place initialization logic here
	    // You already have access to the DOM element and
	    // the options via the instance, e.g. this.element
	    // and this.settings
	    // you can add more functions like the one below and
	    // call them like so: this.yourOtherFunction(this.element, this.settings).
	    var plg = this;
	    this.imagesCompleted();
	},

	calculateImageAspectRatio: function() {
	    var plg = this;
	    var $el = $(plg.element);
	    $el.css({"list-style-type": "none"});
	    var images = $el.find("img");
	    var lis = $el.find("li");
	    lis.css({"position": "absolute", "left": "0px", top: "0px"});
	    lis.css({"-o-transition": "all 2s",
			"-moz-transition": "all 2s",
			"-webkit-transition": "all 2s",
			"transition": "all 2s",
			"-webkit-transition-delay": "1s",
		       "transition-delay": "1s"});
	    $.each(images, function(index, img) {
		var image = $(img);
		var origWidth = image.width();
		var origHeight = image.height();
		var aspectRatio = origWidth / origHeight;
		image.data("aspectRatio", aspectRatio);
		image.data("origWidth", origWidth);
		image.data("origHeight", origHeight);
	    });
	},
	repositionImages: function() {
	    var plg = this;
	    var $ul = $(plg.element);
	    var lis = $ul.find("li");
	    //var images = $ul.find("img");

	    $ul.css({position: "relative"});
	    var numberOfColumns = Math.floor($ul.width() / plg.settings.imageWidth);
	    var columnHeights = new Array(numberOfColumns+1).join('0').split('').map(parseFloat);
	    lis.css({position: "absolute"});
	    $.each(lis, function(index, li) {
		var column = columnHeights.indexOf(Math.min.apply(null, columnHeights));
		var $li = $(li);
		var $image = $li.find("img").eq(0);
		var newCalculatedHeight = Math.floor(plg.settings.imageWidth / $image.data("aspectRatio"));
		$image.css({width: plg.settings.imageWidth + "px", height: newCalculatedHeight + "px"});
		var left = plg.settings.imageWidth * column;
		var top = columnHeights[column];
		$li.css({left: left + "px", top: top + "px"});
		columnHeights[column] += newCalculatedHeight;
	    });
	    
	},
	imagesCompleted: function() {
	    var plg = this;
	    plg.calculateImageAspectRatio();
	    plg.repositionImages();
	    $(window).resize(function() {
		plg.repositionImages();
	    });

	}
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });

            // If the first parameter is a string and it doesn't start
            // with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.

                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

})( jQuery, window, document );
