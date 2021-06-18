(function() {
    // Set Kortforsyningen token, replace with your own token
    var kftoken = '9ca510be3c4eca89b1333cadbaa60c36';

    // Set projection as we are not using the default OpenLayers projections
    // You can define it yourself or you can use the proj4 library as done below
    proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    ol.proj.proj4.register(proj4);
    var myProjection = ol.proj.get('EPSG:25832');
    var extent = [120000, 5661139.2, 1378291.2, 6500000];
    myProjection.setExtent(extent);

    
    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionText = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>';
    

    //forvaltning2 - togstation    
    var togstationer = new ol.source.Vector({
        useSpatialIndex : false,
        format: new ol.format.WFS(),
        loader: function(extent) {
           var url = 'https://api.dataforsyningen.dk/forvaltning2?token=9ca510be3c4eca89b1333cadbaa60c36&servicename=forvaltning2&SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&TYPENAMES=forvaltning:togstation&TYPENAME=forvaltning:togstation&STARTINDEX=0&COUNT=100000&SRSNAME=urn:ogc:def:crs:EPSG::25832&' +
           'bbox=' + extent.join(',')

           
           
           var xhr = new XMLHttpRequest();
           xhr.open('GET', url);
           var onError = function() {
             togstationer.removeLoadedExtent(extent);
           }
           xhr.onerror = onError;
           xhr.onload = function() {
             if (xhr.status == 200) {
           
               togstationer.addFeatures(
                   togstationer.getFormat().readFeatures(xhr.responseText));
                   
             } else {
               onError();
             }
           }
           xhr.send();
           
         },
         strategy:  ol.loadingstrategy.bbox
       });

       //forvaltning2 - jernbane
       var jernbane = new ol.source.Vector({
        format: new ol.format.WFS(),
        loader: function(extent) {
           var url = 'https://api.dataforsyningen.dk/forvaltning2?token=9ca510be3c4eca89b1333cadbaa60c36&servicename=forvaltning2&SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&TYPENAMES=forvaltning:jernbane&TYPENAME=forvaltning:jernbane&STARTINDEX=0&COUNT=100000&SRSNAME=urn:ogc:def:crs:EPSG::25832&' 
           + 'bbox=' + extent.join(',')
           
           
           var xhr = new XMLHttpRequest();
           xhr.open('GET', url);
           var onError = function() {
             jernbane.removeLoadedExtent(extent);
           }
           xhr.onerror = onError;
           xhr.onload = function() {
             if (xhr.status == 200) {
                
              
               
                console.log(jernbane.getFeatures(xhr.responseText));

               jernbane.addFeatures(
                   jernbane.getFormat().readFeatures(xhr.responseText));
                   
             } else {
               onError();
             }
           }
           xhr.send();
           
         },
         strategy:  ol.loadingstrategy.bbox
       });
       










    // Initialize the map
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps', // This title of the group is shown in the layer switcher
                layers: [
                    // Ortofoto [WMS:orto_foraar]
                    new ol.layer.Tile({
                        title:'Ortofoto', // This is the layer title shown in the layer switcher
                        type:'base', // use 'base' for base layers, otherwise 'overlay'
                        visible: false, // by default this layer is not visible
                        opacity: 1.0, // no transparency
                        source: new ol.source.TileWMS({
                            attributions: myAttributionText,
                            url: "https://services.kortforsyningen.dk/orto_foraar?token="+kftoken,
                            params:{
                                'LAYERS':'orto_foraar',
                                'VERSION':'1.1.1',
                                'TRANSPARENT':'false',
                                'FORMAT': "image/jpeg",
                                'STYLES':'' 
                            }
                        })
                    }),
                    // Skærmkort [WMS:topo_skaermkort]
                    new ol.layer.Tile({
                        opacity: 1.0,
                        title:'Skærmkort',
                        type:'base',
                        visible: true, // by default this layer is visible
                        source: new ol.source.TileWMS({
                            attributions: myAttributionText,
                            url: "https://services.kortforsyningen.dk/topo_skaermkort?token="+kftoken,
                            params:{
                                'LAYERS':'dtk_skaermkort',
                                'VERSION':'1.1.1',
                                'TRANSPARENT':'false',
                                'FORMAT': "image/png",
                                'STYLES':'' 
                            }
                        })
                    })
                ]
            }),
            new ol.layer.Group({
                'title': 'Overlays',
                layers: [
                    
                    // [WFS:forvaltning2 : togstationer]
                    new ol.layer.Vector({

                        opacity: 1.0,
                        zIndex:1000,
                        title:'togstationer',
                        visible: true,
                        type:'overlay',
                        source : togstationer,
                        style: new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 4,
                                fill: new ol.style.Fill({
                                    color: 'rgb(255,255,0)',
                                })
                            })
                        })
                       
                    }),
                    // [WFS:forvaltning2 : jernbane]
                    new ol.layer.Vector({
                        opacity: 1.0,
                        zIndex:950,
                        title:'jernbane',
                        visible: true,
                        type:'overlay',
                        source : jernbane,
                        style: new ol.style.Style({
                            Stroke: new ol.style.Stroke({
                                color: 'rgba(0, 0, 255, 1.0)',
                                width: 20,
                            })
                        })
                       
                    })
                   
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
    
    // Add additional controls to map
    map.addControl(new ol.control.ScaleLine()); // add a scale line
    map.addControl(new ol.control.LayerSwitcher()); // add a layer switcher, notice this one requires an external library
    map.addControl(new ol.control.Attribution({ collapsible: false })); // add a custom attribution 
})();    
