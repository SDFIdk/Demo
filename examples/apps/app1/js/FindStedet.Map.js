
if (typeof FindStedet == 'undefined') {
    FindStedet = {};
}

var selectedFeature = null;
/** 
* Global variable: findstedet
* (<FindStedet.Map>) Holds the findstedet map class 
*/

var findstedet;
var map;



FindStedet.Map = VisStedet.Utils.Class({



    /**
    * Property: zoomlevels
    * {<Number>} Number of zoom levels available on the map
    */
    zoomlevels: 13,

    /**
    * Property: resolutions
    * {<Array of numbers>} Resolutions of the zoom levels
    */
    resolutions: null,

    /**
    * Property: maxResolution
    * {<Number>} Maximum resolution
    */
    maxResolution: null,

    /**
    * Property: resolutions
    * {OpenLayers.Bounds} Bounds for max extend
    */
    maxExt: null,

    /**
    * Property: resolutions
    * {OpenLayers.Bounds} Bounds for start extend
    */
    startExt: null,

    /**
    * Property: internalprojection
    * (String) holds the projection code of the map
    */
    internalprojection: null,

    kmsticket: '',

    findStedet_layers: null,

    mapControls: null,

    firstGeolocation: true,

    vector: null,

    pointlayer: null,

    initialize: function (options) {

        this.kmsticket = new VisStedet.Ticket();

        this.internalprojection = "EPSG:25832";
        this.resolutions = new Array(0.2,0.4,0.8, 1.6, 3.2, 6.4, 12.8, 25.6, 51.2, 102.4, 204.8, 409.6, 819.2, 1638.4);
        this.startExt = new OpenLayers.Bounds(420000, 6025000, 905000, 6450000);
        this.maxExt = new OpenLayers.Bounds(120000, 5661139.2, 958860.8, 6500000);
        this.maxResolution = (this.maxExt.top - this.maxExt.bottom) / 256;

        var geolocate = new OpenLayers.Control.Geolocate({
            id: 'locate-control',
            bind: false,
            geolocationOptions: {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: 7000
            }
        });
        
        this.mapControls = [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            geolocate
        ];


        VisStedet.Utils.extend(this, options);

        for (var i = 0; i < this.mapControls.length; i++) {

            if (this.mapControls[i].CLASS_NAME == "OpenLayers.Control.Geolocate") {
                this.mapControls[i].events.register("locationupdated", geolocate, function (e) {

                    vlayer = map.getLayersByName("geolokation")[0];
                    if (vlayer) {
                        vlayer.removeAllFeatures();
                        var circle = new OpenLayers.Feature.Vector(
                        OpenLayers.Geometry.Polygon.createRegularPolygon(
                        new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                        e.position.coords.accuracy / 2,
                        40,
                        0
                    ),
                    {},
                    {
                        fillColor: '#000',
                        fillOpacity: 0.1,
                        strokeWidth: 0
                    }
                    );

                        vlayer.addFeatures([
                        new OpenLayers.Feature.Vector(
                        e.point,
                        {},
                        {
                            graphicName: 'cross',
                            strokeColor: '#f00',
                            strokeWidth: 2,
                            fillOpacity: 0,
                            pointRadius: 10
                        }
                    ),
                    circle
                    ]);

                    var lonlat = new OpenLayers.LonLat(e.point.x, e.point.y);
                    map.panTo(lonlat);
                    }
                });

                this.mapControls[i].events.register("locationfailed", this, function () {

                });
            }
        }


        var mapoptions = {
            controls: this.mapControls,
            projection: this.internalprojection,
            resolutions: this.resolutions,
            units: "m",
            maxResolution: this.maxResolution,
            maxExtent: this.maxExt,
            numZoomLevels: this.zoomlevels
        }


        map = new OpenLayers.Map('map', mapoptions);
        
        for (var i = 0; i < this.findStedet_layers.length; i++) {
            this.addLayer(this.findStedet_layers[i]);
        }

        this.vector = new OpenLayers.Layer.Vector('geolokation');
        this.vector.displayInLayerSwitcher = false;
        map.addLayer(this.vector);
        

        var matrikelStyle = new OpenLayers.StyleMap({
            "default": new OpenLayers.Style({
                fillOpacity: 0.3,
                fillColor: '#fff',
                strokeColor: '#f00'
            })
        });
        this.matrikellayer = new OpenLayers.Layer.Vector("Matrikelnumre", {
            styleMap: matrikelStyle,
            rendererOptions: { zIndexing: true }
        });
        this.matrikellayer.displayInLayerSwitcher = false;
        map.addLayer(this.matrikellayer);
        
        
        
        var addressStyle = new OpenLayers.StyleMap({
            "default": new OpenLayers.Style({
                externalGraphic: 'img/marker.png',
                graphicWidth: 24,
                graphicHeight: 24,
                graphicOpacity: 1,
                graphicXOffset: -24,
                graphicYOffset: -24,
                label: '${text}',
                labelAlign: "tr",
                fontSize: "12px",
                fontFamily: "Verdana",
                fontWeight: "bold",
                labelXOffset: 5,
                labelYOffset: 20,
                labelOutlineColor: "white",
                labelOutlineWidth: 3
            })
        });

        // Create a vector layer and give it your style map.
        this.pointlayer = new OpenLayers.Layer.Vector("Points", {
            styleMap: addressStyle,
            rendererOptions: { zIndexing: true }
        });
        this.pointlayer.displayInLayerSwitcher = false;
        map.addLayer(this.pointlayer);
        
        map.zoomToExtent(this.startExt, true);
        
        
        var clickcontrol = new VisStedet.Click({}, VisStedet.Utils.bind(function (e) {
            findstedet.pointlayer.destroyFeatures();
            findstedet.matrikellayer.destroyFeatures();

            var point = map.getLonLatFromViewPortPx(e.xy);
            jQuery.ajax({
                url: 'http://services.kortforsyningen.dk/?servicename=RestGeokeys_v2&f=jsonp&method=hoejde&geop='+point.lon+','+point.lat,
                type: 'GET',
                data: {ticket: this.kmsticket.toString()},
                dataType: 'jsonp',
                success: VisStedet.Utils.bind(function (point, data) {
                    var h = (data.hoejde > -1000 ? 'Højde: '+data.hoejde.toFixed(1)+' meter\n' : '');
                    var feature = new OpenLayers.Feature.Vector(
                            new OpenLayers.Geometry.Point(point.lon, point.lat), {
                            type: 3,
                            text: h+'Koordinat: x='+point.lon+', y='+point.lat
                        }
                    );
                    findstedet.pointlayer.addFeatures([feature]);
                },this,point),
                error: VisStedet.Utils.bind(function (point) {
                    var feature = new OpenLayers.Feature.Vector(
                            new OpenLayers.Geometry.Point(point.lon, point.lat), {
                                type: 3,
                                text: 'Koordinat: x='+point.lon+', y='+point.lat
                        }
                    );
                    findstedet.pointlayer.addFeatures([feature]);
                },this,point)
            });
        },this));
        map.addControl(clickcontrol);
        clickcontrol.activate();
        
    },

    addLayer: function (layerConfig) {
        var type = layerConfig.type.toLocaleUpperCase();
        if (layerConfig.params.ticket == "") {
            layerConfig.params.ticket = this.kmsticket;
        }
        var layer = null;
        switch (type) {
            case "WMS":
                layer = new OpenLayers.Layer.WMS(layerConfig.name, layerConfig.url, layerConfig.params, layerConfig.options);
                break;
            case "WMTS":
                layerConfig.options.tileSize = new OpenLayers.Size(256, 256);
                layerConfig.options.tileOrigin = new OpenLayers.LonLat(this.maxExt.left, this.maxExt.top);
                layerConfig.options.tileFullExtent = this.maxExt.clone();
                for (var opts in layerConfig.options) {
                    layerConfig[opts] = layerConfig.options[opts];
                }
                for (var par in layerConfig.params) {
                    layerConfig[par] = layerConfig.params[par];
                }
                if (layerConfig["matrixIds"] != null) {
                    if (layerConfig["matrixIds"].indexOf(',') > 0) {
                        layerConfig["matrixIds"] = layerConfig["matrixIds"].split(',');
                    }
                }

                layer = new OpenLayers.Layer.WMTS(layerConfig);
                break;
        }

        map.addLayer(layer);
        if (layer.isBaseLayer && layerConfig.options && layerConfig.options.visibility) {
            map.setBaseLayer(layer);
        }
    },

    CLASS_NAME: "FindStedet.Map"

});
