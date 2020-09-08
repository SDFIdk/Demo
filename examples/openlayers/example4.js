(function() {
    // Set Kortforsyningen token, replace with your own token
    var kftoken = 'd12107f70a3ee93153f313c7c502169a';

    // Set projection as we are not using the default OpenLayers projections
    // You can define it yourself or you can use the proj4 library as done below
    proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    ol.proj.proj4.register(proj4);
    var myProjection = ol.proj.get('EPSG:25832');
    var extent = [120000, 5661139.2, 1378291.2, 6500000];
    myProjection.setExtent(extent);
    

    // Set the WMTS tile grid. We do this on an overall basis as all the 
    // Kortforsyningen WMTS are based on the same tile grid
    var myTileGrid = new ol.tilegrid.WMTS({
        extent: extent,
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
        matrixIds: ['L00','L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11','L12','L13'],
    });
    
    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionText = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>';
    
    // WMS source
    var wmsSource = new ol.source.TileWMS({
        attributions: myAttributionText,
        url: "https://services.kortforsyningen.dk/topo_skaermkort?token="+kftoken,
        params:{
            'LAYERS':'dtk_skaermkort',
            'VERSION':'1.1.1',
            'TRANSPARENT':'false',
            'FORMAT': "image/png",
            'STYLES':'' 
        }
    });

    // WMTS source
    var wmtsSource = new ol.source.WMTS({
        attributions: myAttributionText,
        url: "https://services.kortforsyningen.dk/topo_skaermkort?token="+kftoken,
        layer: "dtk_skaermkort",
        matrixSet: "View1",
        format: "image/jpeg",
        tileGrid: myTileGrid,
        style: 'default',
        size: [256, 256]
    });

    // Skærmkort layer [WMTS:topo_skaermkort]
    var skaermkort = new ol.layer.Tile({
        opacity: 1.0,
        title:'Skærmkort',
        type:'base',
        visible: true, // by default this layer is visible
        source: wmtsSource // start with wmts source
    });

    // Initialize the map
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps', // This title of the group is shown in the layer switcher
                layers: [
                    skaermkort
                ]
            })
        ],
        // turn off the default attribution control as we will create a new one later on
        controls: ol.control.defaults({ attribution: false }), 
        // make the view
        view: new ol.View({
            center: [654500, 6176450], // start center position
            zoom: 9, // start zoom level
            resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1], // Equal to WMTS resolutions with three more detailed levels
            projection: myProjection // use our custom projection defined earlier
        })
    });

    // switch to WMS when zoom level is greater than 13.
    map.on('moveend', function (e) {
        if (e.map.getView().getZoom() > 13) {
            skaermkort.setSource(wmsSource);
        } else {
            skaermkort.setSource(wmtsSource);
        }
    });
    
    // Add additional controls to map
    map.addControl(new ol.control.ScaleLine()); // add a scale line
    map.addControl(new ol.control.LayerSwitcher()); // add a layer switcher, notice this one requires an external library
    map.addControl(new ol.control.Attribution({ collapsible: false })); // add a custom attribution 
})();    
