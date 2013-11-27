/* Copyright (c) */

/**
 * @requires VisStedet/Utils.js
 */

/**
 * Class: VisStedet.Search
 */
VisStedet.Search = VisStedet.Utils.Class ({
    
    /**
     * APIProperty: url
     * {String} The URL to call to get a response.
     */
    url: null,
    
    /**
     * APIProperty: url
     * {String} The URL to call to get a response.
     */
    limit: 25,

    /**
     * APIProperty: url
     * {String} The URL to call to get a response.
     */
    callbackKey: 'callback',

    /**
     * Property: pendingRequests
     * {Object} An internal list of pending requests.
     */
    pendingRequests: {},
    
    /**
     * Property: currentRequest
     * {String} The footprint of the current script tag. Is used for cleaning up.
     */
    currentRequest: null,
    
    /**
     * APIProperty: response
     * {Object} The response from a search is structured as described here.
     * 
     * Containing:
     * status - {String} Message about the search result 
     * data - {Array} An array of objects, that contains at least presentionsString property
     */
    response: {},
    
    /**
     * Constructor: VisStedet.Search
     * Instances of this class are not useful. See one of the subclasses.
     *
     * Parameters:
     * options - {Object} Optional object with properties to add to the VisStedet.Search instance.
     *
     * Returns:
     * An instance of VisStedet.Search
     */    
    initialize: function (options) {
        VisStedet.Utils.extend (this,options);
    },
    
    /**
     * APIMethod: search
     * This method is not useful. See one of the subclasses.
     *
     * Parameters:
     * searchstring - {String} The string to search with
     * callback - {Function} The function to call back with the result {<VisStedet.Search.response>}. 
     * params - {Object} OPTIONAL parameter list of parameters to send to the service
     */
    search: function (searchstring, callback, params) {
    },
    
    /** 
     * Method: createRequest
     * Issues a request for features by creating injecting a script in the 
     *     document head.
     *
     * Parameters:
     * url - {String} Service URL. ex: http://find.spatialsuite.com/service/locations/2/detect/json/ren?apikey=A02273BE-8AA1-42C1-8D20-6256A307D5D5&limit=50&callback=
     * callback - {Function} Callback to be called with resulting data.
     *
     * Returns:
     * {HTMLScriptElement} The script pending execution.
     */
    createRequest: function(url, callback) {
        var id = VisStedet.Search.JSONP.register(callback);
        var name = "VisStedet.Search.JSONP.registry[" + id + "]";
        url += name;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = "VisStedet_Search_JSONP_" + id;
        this.pendingRequests[script.id] = script;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
        return script;
    },
    
    /** 
     * Method: destroyRequest
     * Remove a script node associated with a response from the document.  Also
     *     unregisters the callback and removes the script from the 
     *     <pendingRequests> object.
     *
     * Parameters:
     * script - {HTMLScriptElement}
     */
    destroyRequest: function(script) {
        VisStedet.Search.JSONP.unregister(script.id.split("_").pop());
        delete this.pendingRequests[script.id];
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
    },

    CLASS_NAME: 'VisStedet.Search'
});

(function() {
    VisStedet.Search.JSONP = {};
    var o = VisStedet.Search.JSONP;
    var counter = 0;
    o.registry = [];
    
    /**
     * Function: VisStedet.Search.JSONP.register
     * Register a callback for a newly created script.
     *
     * Parameters:
     * callback: {Function} The callback to be executed when the newly added
     *     script loads.  This callback will be called with a single argument
     *     that is the JSON returned by the service.
     *
     * Returns:
     * {Number} An identifier for retrieving the registered callback.
     */
    o.register = function(callback) {
        var id = ++counter;
        o.registry[id] = function() {
            o.unregister(id);
            callback.apply(this, arguments);
        };
        return id;
    };
    
    /**
     * Function: VisStedet.Search.JSONP.unregister
     * Unregister a callback previously registered with the register function.
     *
     * Parameters:
     * id: {Number} The identifier returned by the register function.
     */
    o.unregister = function(id) {
        o.registry[id] = function () {};
    };
})();
