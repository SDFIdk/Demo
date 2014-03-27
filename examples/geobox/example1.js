
var vector;

function showData () {

    //Create a thematic layer based on a value in the data
    vector = new OpenLayers.Layer.Vector("Vector Layer", {
        styleMap: new OpenLayers.StyleMap({
            
            //The default style of a feature
            "default": new OpenLayers.Style({
                fillColor: 'rgb(0, 60, 136)',
                fillOpacity: 0,
                strokeColor: 'rgb(0, 60, 136)',
                strokeOpacity: .3,
                strokeWidth: 1,
                cursor: 'pointer'
            },{
                rules: [
                    //Style for each filter
                    new OpenLayers.Rule({
                        //A filter
                        filter: new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.LESS_THAN,
                            property: "value",
                            value: 25000
                        }),
                        //If a feature matches the above filter, use this symbolizer
                        symbolizer: {
                            fillOpacity: .1,
                        }
                    }),
                    new OpenLayers.Rule({
                        filter: new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.BETWEEN,
                            property: "value",
                            lowerBoundary: 25000,
                            upperBoundary: 50000
                        }),
                        symbolizer: {
                            fillOpacity: .3,
                        }
                    }),
                    new OpenLayers.Rule({
                        filter: new OpenLayers.Filter.Comparison({
                            type: OpenLayers.Filter.Comparison.BETWEEN,
                            property: "value",
                            lowerBoundary: 50000,
                            upperBoundary: 75000
                        }),
                        symbolizer: {
                            fillOpacity: .5,
                        }
                    }),
                    new OpenLayers.Rule({
                        //Apply this rule if no others apply
                        elseFilter: true,
                        symbolizer: {
                            fillOpacity: .7,
                        }
                    })
                ]
            }),
            //The style for the selected feature
            'select': new OpenLayers.Style({
                fillColor: '#eee',
                fillOpacity: .8
            })
        })
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
                    //Function called when a feature is selected
                    var info = $('div.info');
                    if (info.length) {
                        //Remove the info element if it already exists
                        info.remove();
                    }
                    //Append a info box to display the information
                    $('body').append('<div class="info"><div>Kommune: <strong>'+event.feature.attributes.KOMNAVN+'</strong></div><div>Indbyggertal (2013): <strong>'+event.feature.attributes.value+'</strong></div></div>');
                },
                featureunhighlighted: function () {
                    //Function called when a feature is unselected
                    var info = $('div.info');
                    if (info.length) {
                        //Remove the info element if it exists
                        info.remove();
                    }
                }
            }
        }
    );
    selectControl.handlers.feature.stopDown = false; 
    map.addControl(selectControl);
    selectControl.activate();    
    
    
    //Get the geojson file to display in the map
    $.ajax({
        url: 'data/kommune.geojson',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            
            //Convert the Geojson to features
            var geojsonFormat = new OpenLayers.Format.GeoJSON({'internalProjection': map.baseLayer.projection,'externalProjection': map.baseLayer.projection,ignoreExtraDims: true});
            var features = geojsonFormat.read(data);
            
            //Read data from csv-file using jQuery.ajax
            $.ajax({
                url: 'data/indbyggertal13.csv',
                dataType: 'text',
                success: OpenLayers.Function.bind(function (features, data) {
                    
                    //Read each line in the csv-file and add the value to the matching feature
                    var lines = data.split(/\r\n|\n/);
                    for (var i=0;i<lines.length;i++) {
                        if (lines[i].length > 0) {
                            var cols = lines[i].split(/,|;/);
                            for (var j=0;j<features.length;j++) {
                                if (features[j].attributes.KOMKODE === cols[0] || features[j].attributes.KOMKODE === '0'+cols[0]) {
                                    features[j].attributes.value = cols[2]-0;
                                    break;
                                }
                            }
                        }
                    }
                    
                    //Add the features to the map
                    vector.addFeatures(features);
                    
                },null,features)
            });
            
        }
    });
}
