/* Copyright (c) */

/**
 * @requires VisStedet/Utils.js
 * @requires VisStedet/Search.js
 */

/**
 * Class: VisStedet.Search.GeoSearch
 */
VisStedet.Search.GeoSearch = VisStedet.Utils.Class (VisStedet.Search,{
    
    /**
     * APIProperty: ticket
     * {String} REQUIRED
     */
    ticket: null,
    
    /**
     * APIProperty: resources
     * {Array} Array of resources to search in. Default is all of them, but you can define a list suitable for your purpose.
     *         Available resources are:
     *          - 'Adresser'
     *          - 'Matrikelnumre'
     *          - 'Kommuner'
     *          - 'Opstillingskredse'
     *          - 'Politikredse'
     *          - 'Postdistrikter'
     *          - 'Regioner'
     *          - 'Retskredse'
     *          - 'Stednavne'
     */
    resources: ['Adresser','Matrikelnumre','Kommuner','Opstillingskredse','Politikredse','Postdistrikter','Regioner','Retskredse','Stednavne'],
    
    /**
     * Constructor: VisStedet.Search.GeoSearch
     * Instances of VisStedet.Search.GeoSearch gives access to seach in GeoSearch
     *     To use GeoSearch you need an TICKET.
     *
     * Parameters:
     * options - {Object} Optional object with properties to add to the VisStedet.Search instance.
     *
     * Returns:
     * An instance of VisStedet.Search.GeoSearch
     * 
     * Examples:
     * (code)
     * var geoSearch = new VisStedet.Search.GeoSearch ({
     *     ticket: 'INSERT TICKET HERE!'
     * });
     * geoSearch.search('TEXT TO SEARCH WITH',function (response) {
     *     var html = '';
     *     for (var i=0;i<object.data.length;i++) {
     *         html += object.data[i].presentationString+'<br/>';
     *     }
     *     document.getElementById('list').innerHTML = html;
     * });
     * (end)
     */    
    initialize: function (options) {
        this.url = 'http://kortforsyningen.kms.dk/Geosearch?service=GEO';
        VisStedet.Search.prototype.initialize.apply(this, arguments);
    },
    
    /**
     * APIMethod: search
     * Do a search on GeoSearch
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
        if (this.resources.length > 0) {
            var resources = this.resources.join (',');
            var url = this.url+'&search='+encodeURIComponent(searchstring)+'&resources='+resources+'&limit='+this.limit;
            if (this.ticket != null) {
            	url += '&ticket='+this.ticket;
            }
            url += '&'+this.callbackKey+'=';
            this.currentRequest = this.createRequest (url, VisStedet.Utils.bind (function (callback,response) {
                this.destroyRequest (this.currentRequest);
                this.currentRequest = null;
                if (response.data === null) {
                	response.data = [];
                }
                callback(response);
            },this,callback));
        } else {
            callback ({status: 'ERROR - No resources added'});
        }
    },

    CLASS_NAME: 'VisStedet.Search.GeoSearch'
});