/* Copyright (c) */

/**
 * @requires VisStedet/Utils.js
 * @requires VisStedet/Search.js
 */

/**
 * Class: VisStedet.Search.AWS
 */
VisStedet.Search.AWS = VisStedet.Utils.Class (VisStedet.Search,{
    /**
     * Constructor: VisStedet.Search.AWS
     * Instances of VisStedet.Search.AWS gives access to seach in AWS (read more on http://www.ebst.dk/aws)
     *
     * Parameters:
     * options - {Object} Optional object with properties to add to the VisStedet.Search instance.
     *
     * Returns:
     * An instance of VisStedet.Search.AWS
     * 
     * Examples:
     * (code)
     * var AWS = new VisStedet.Search.AWS ();
     * AWS.search('TEXT TO SEARCH WITH',function (response) {
     *     var html = '';
     *     for (var i=0;i<object.data.length;i++) {
     *         html += object.data[i].presentationString+'<br/>';
     *     }
     *     document.getElementById('list').innerHTML = html;
     * });
     * (end)
     */    
    initialize: function (options) {
        this.url = '../server/search/aws.ashx';
		VisStedet.Search.prototype.initialize.apply(this, arguments);
    },
    
    /**
     * APIMethod: search
     * Do a search on AWS
     *
     * Parameters:
     * searchstring - {String} The string to search with
     * callback - {Function} The function to call back with the result {<VisStedet.Search.response>}. 
     * params - {Object} OPTIONAL parameter list of parameters to send to the service
     */
    search: function (searchstring, callback, params) {
		if (this.currentRequest !== null) {
			this.destroyRequest (this.currentRequest);
			this.currentRequest = null;
		}
		var url = this.url+'?searchstring='+searchstring+'&'+this.callbackKey+'=';
		this.currentRequest = this.createRequest (url, VisStedet.Utils.bind (function (callback,response) {
			this.destroyRequest (this.currentRequest);
			this.currentRequest = null;
			callback(response);
		},this,callback));
    },

    CLASS_NAME: 'VisStedet.Search.AWS'
});