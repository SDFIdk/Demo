var map;
var kmsticket = new VisStedet.Ticket();

/**
 * To add a map on the web page call addMap with two arguments
 * @param elementID - the ID of the element to put the map into.
 * @param params - an object containing login and password parameter for the map.
**/
function addMap (elementID, params) {
    
    elementID = elementID || 'map';
    
    //The main map setup - do not change 
    map = new OpenLayers.Map({
        div: elementID,
        projection: 'EPSG:25832',
        units: 'm',
        maxExtent: new OpenLayers.Bounds(120000,5900000,1000000,6500000),
        maxResolution: 1638.4,
        numZoomLevels: 14
    });

    //Layer definition
    var layer = new OpenLayers.Layer.WMTS({
        name: "WMTS",
        url: ["https://a.services.kortforsyningen.dk/topo_skaermkort", "https://b.services.kortforsyningen.dk/topo_skaermkort", "https://c.services.kortforsyningen.dk/topo_skaermkort"],
        style: "default",
        layer: "dtk_skaermkort",
        matrixSet: "View1",
        format: "image/jpeg",
        params: params,
        matrixIds: [
            {identifier: "L00", scaleDenominator: 1638.4 / 0.00028},
            {identifier: "L01", scaleDenominator: 819.2 / 0.00028},
            {identifier: "L02", scaleDenominator: 409.6 / 0.00028},
            {identifier: "L03", scaleDenominator: 204.8 / 0.00028},
            {identifier: "L04", scaleDenominator: 102.4 / 0.00028},
            {identifier: "L05", scaleDenominator: 51.2 / 0.00028},
            {identifier: "L06", scaleDenominator: 25.6 / 0.00028},
            {identifier: "L07", scaleDenominator: 12.8 / 0.00028},
            {identifier: "L08", scaleDenominator: 6.4 / 0.00028},
            {identifier: "L09", scaleDenominator: 3.2 / 0.00028},
            {identifier: "L10", scaleDenominator: 1.6 / 0.00028},
            {identifier: "L11", scaleDenominator: 0.8 / 0.00028},
            {identifier: "L12", scaleDenominator: 0.4 / 0.00028},
			{identifier: "L12", scaleDenominator: 0.4/0.00028},
			{identifier: "L13", scaleDenominator: 0.2/0.00028}
        ],
        isBaseLayer: true,
        displayInLayerSwitcher: true,
        transitionEffect: 'resize'
    });
    map.addLayer(layer);

}

/**
 * Set the center and zoom level of the map
 * @param x
 * @param y
 * @param zoomLevel
 */
function setCenter (x, y, zoomLevel) {
    map.zoomTo(zoomLevel || 5);
    map.setCenter(new OpenLayers.LonLat(x || 526619, y || 6254396));
}