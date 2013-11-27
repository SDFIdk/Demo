/* Copyright (c) */
if(typeof VisStedet=='undefined') {
    window.VisStedet = {};
}

/*
 * Utility functions for VisStedet
 */
VisStedet.Utils = {

    /**
     * Constructor: VisStedet.Utils.Class
     * Base class used to construct all other classes. Includes support for 
     *     multiple inheritance. 
     *     
     * > var MyClass = VisStedet.Utils.Class(prototype);
     * > var MyClass = VisStedet.Utils.Class(Class1, Class2, prototype);
     * Note that instanceof reflection will only reveil Class1 as superclass.
     * Class2 ff are mixins.
     *
     */
    Class: function () {
        var len = arguments.length;
        var P = arguments[0];
        var F = arguments[len-1];

        var C = typeof F.initialize == "function" ?
            F.initialize :
            function(){ P.apply(this, arguments); };

        if (len > 1) {
            var newArgs = [C, P].concat(
                    Array.prototype.slice.call(arguments).slice(1, len-1), F);
            VisStedet.Utils.inherit.apply(null, newArgs);
        } else {
            C.prototype = F;
        }
        return C;
    },
 
    /**
     * APIFunction: extend
     * Copy all properties of a source object to a destination object.  Modifies
     *     the passed in destination object.  Any properties on the source object
     *     that are set to undefined will not be (re)set on the destination object.
     *     From OpenLayers.
     *
     * Parameters:
     * destination - {Object} The object that will be modified
     * source - {Object} The object with properties to be set on the destination
     *
     * Returns:
     * {Object} The destination object.
     */
    extend: function (destination, source) {
        destination = destination || {};
        if (source) {
            for (var property in source) {
                var value = source[property];
                if (value !== undefined) {
                    destination[property] = value;
                }
            }

            /**
             * IE doesn't include the toString property when iterating over an object's
             * properties with the for(property in object) syntax.  Explicitly check if
             * the source has its own toString property.
             */

            /*
             * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
             * prototype object" when calling hawOwnProperty if the source object
             * is an instance of window.Event.
             */

            var sourceIsEvt = typeof window.Event == "function"
                              && source instanceof window.Event;

            if (!sourceIsEvt
               && source.hasOwnProperty && source.hasOwnProperty("toString")) {
                destination.toString = source.toString;
            }
        }
        return destination;
    },
    
    /**
     * APIFunction: bind
     * Bind a function to an object.  Method to easily create closures with
     *     'this' altered.
     * 
     * Parameters:
     * func - {Function} Input function.
     * object - {Object} The object to bind to the input function (as this).
     * 
     * Returns:
     * {Function} A closure with 'this' set to the passed in object.
     */
    bind: function(func, object) {
        // create a reference to all arguments past the second one
        var args = Array.prototype.slice.apply(arguments, [2]);
        return function() {
            // Push on any additional arguments from the actual function call.
            // These will come after those sent to the bind call.
            var newArgs = args.concat(
                Array.prototype.slice.apply(arguments, [0])
            );
            return func.apply(object, newArgs);
        };
    },
    
    /**
     * Function: VisStedet.Utils.inherit
     *
     * Parameters:
     * C - {Object} the class that inherits
     * P - {Object} the superclass to inherit from
     *
     * In addition to the mandatory C and P parameters, an arbitrary number of
     * objects can be passed, which will extend C.
     */
    inherit: function(C, P) {
       var F = function() {};
       F.prototype = P.prototype;
       C.prototype = new F;
       var i, l, o;
       for(i=2, l=arguments.length; i<l; i++) {
           o = arguments[i];
           if(typeof o === "function") {
               o = o.prototype;
           }
           VisStedet.Utils.extend(C.prototype, o);
       }
    }
};
