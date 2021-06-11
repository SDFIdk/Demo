(function() {

    // Set Kortforsyningen token, replace with your own token
    var kftoken = '9ca510be3c4eca89b1333cadbaa60c36';

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionText = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>';


    // Make the map object using the custom projection
    //proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    var crs = new L.Proj.CRS('EPSG:25832',
	'+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', {
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
        origin: [120000,6500000],
        bounds: L.bounds([120000, 5661139.2],[1378291.2, 6500000])
    });


    // Make the map object using the custom projection
    var map = new L.Map('map', {
        crs: crs,
        continuousWorld: true,
        center: [55.709155, 11.459081], // Set center location
        zoom: 9, // Set zoom level
        minzoom: 0,
        maxzoom: 13
    });

    // Define layers
    // Ortofoto [WMTS:orto_foraar]
    var ortofotowmts = L.tileLayer('https://services.kortforsyningen.dk/orto_foraar?token=' + kftoken + '&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    minZoom: 0,
        maxZoom: 13,
        attribution: myAttributionText,
        crossOrigin: true,
        zoom: function () {
            var zoomlevel = map._animateToZoom ? map._animateToZoom : map.getZoom();
            if (zoomlevel < 10)
                return 'L0' + zoomlevel;
            else
                return 'L' + zoomlevel;
        }
    }).addTo(map);


    // Skærmkort [WMTS:topo_skaermkort]
    var toposkaermkortwmts = L.tileLayer('https://services.kortforsyningen.dk/topo_skaermkort?token=' + kftoken + '&request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    minZoom: 0,
        maxZoom: 13,
        attribution: myAttributionText,
        crossOrigin: true,
        zoom: function (data) {
            var zoomlevel = data.z;
            if (zoomlevel < 10)
                return 'L0' + zoomlevel;
            else
                return 'L' + zoomlevel;
        }
    }).addTo(map);

    // Matrikelskel overlay [WMS:mat]
    var matrikel = L.tileLayer.wms('https://services.kortforsyningen.dk/mat', {
        transparent: true,
        layers: 'MatrikelSkel,Centroide',
        token: kftoken,
        format: 'image/png',
        attribution: myAttributionText,
        continuousWorld: true,
        minZoom: 9
    }).addTo(map); // addTo means that the layer is visible by default

    // Hillshade overlay [WMS:dhm]
    var hillshade = L.tileLayer.wms('https://services.kortforsyningen.dk/dhm', {
        transparent: true,
        layers: 'dhm_terraen_skyggekort_transparent_overdrevet',
        token: kftoken,
        format: 'image/png',
        attribution: myAttributionText,
        continuousWorld: true,
    });

    // Define layer groups for layer control
    var baseLayers = {
        "Ortofoto WMTS": ortofotowmts,
        "Skærmkort WMTS": toposkaermkortwmts
    };
    var overlays = {
        "Matrikel": matrikel,
        "Hillshade": hillshade
    };

    // Add layer control to map
    L.control.layers(baseLayers, overlays).addTo(map);

    // Add scale line to map
    L.control.scale({imperial: false}).addTo(map); // disable feet units

})();
