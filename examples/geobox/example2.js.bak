
var vector;

function showData () {

    //Create a layer for the points
    vector = new OpenLayers.Layer.Vector("Vector Layer", {
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style({
                graphicWidth: 24,
                graphicHeight: 24,
                graphicYOffset: -12,
                externalGraphic: 'MapMarkerBubbleBlue24.png',
                cursor: 'pointer'
            }),
            'select': new OpenLayers.Style({
                externalGraphic: 'MapMarkerBubblePink24.png',
                graphicZIndex: 100
            })
        }),
        rendererOptions: {yOrdering: true}
    });
    map.addLayer(vector);

    //Add the select functionality
    var selectControl = new OpenLayers.Control.SelectFeature(
        [vector],
        {
            clickout: true, toggle: false,
            multiple: false, hover: !('ontouchstart' in document.documentElement),
            eventListeners: {
                featurehighlighted: function (event) {
                    var info = $('div.info');
                    if (info.length) {
                        info.remove();
                    }
                    $('body').append('<div class="info point"><div><strong>'+event.feature.attributes.navn_tekst+'</strong></div><div>'+event.feature.attributes.vej_navn+' '+event.feature.attributes.husnr+', '+event.feature.attributes.postdistrikt_kode+' '+event.feature.attributes.postdistrikt_navn+'</div></div>');
                },
                featureunhighlighted: function () {
                    var info = $('div.info');
                    if (info.length) {
                        info.remove();
                    }
                }
            }
        }
    );
    selectControl.handlers.feature.stopDown = false; 
    map.addControl(selectControl);
    selectControl.activate();
    
    //Read data from csv-file using jQuery.ajax
    $.ajax({
        url: 'data/virksomheder.csv',
        dataType: 'text',
        success: function (data) {
            
            //Read each line in the csv-file and add the values to an object
            var lines = data.split(/\r\n|\n/);
            var colnames = lines[0].split(',');
            var result = [];
            
            for (var i=1;i<lines.length;i++) {
                if (lines[i].length > 0) {
                    var cols = lines[i].split(',');
                    var obj = {};
                    for (var j=0;j<cols.length;j++) {
                        obj[colnames[j]] = cols[j];
                    }
                    result.push(obj);
                }
            }

            //For each line in the csv-file call the GeoRest service to get the coordinate for address
            if (result.length) {
                max = result.length;
                for (var i=0;i<max;i++) {
                    getAddress(result[i]);
                }
            }
        }
    });
}

function getAddress (row,exit) {
    
    //Call GeoRest service to get the correct coordinate for the address
    $.ajax({
        url: 'http://kortforsyningen.kms.dk',
        dataType: 'jsonp',
        contentType: 'application/json; charset=utf-8',
        data: {
            servicename: 'RestGeokeys_v2',
            method: 'adresse',
            vejkode: ((10000+(row.beliggenhedsadresse_vejkode-0))+'').slice(1),
            husnr: row.beliggenhedsadresse_husnummerFra,
            komkode: '0'+row.beliggenhedsadresse_kommune_kode,
            geometry: 'true',
            login: 'demo',
            password: 'demo',
            f: 'jsonp'
        },
        success: OpenLayers.Function.bind(function (row,exit,data) {
            if (data.error) {
                //Error from GeoRest service
            } else {
                if (data.type) {
                    var in_options = {
                        'internalProjection': map.baseLayer.projection,
                        'externalProjection': map.baseLayer.projection
                    };
                    var geojsonFormat = new OpenLayers.Format.GeoJSON(in_options);
                    var features = geojsonFormat.read(data);
                    for (var i=0;i<features.length;i++) {
                        OpenLayers.Util.extend(features[i].attributes,row);
                    }
                    vector.addFeatures(features);
                } else {
                    //The service returns an empty object
                    if (!exit || exit < 3) {
                        exit = (exit ? exit+1 : 1);
                        //Try again to make sure that it wasn't just an error
                        getAddress(row,exit);
                    } else {
                        //No more attempts
                    }
                }
            }
        },null,row,exit)
    })
}
