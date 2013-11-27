$(document).ready(function () {
	VisStedet.App.initMap ();
	
	var layer = VisStedet.App.getUrlParam ('layer') || 'ortofoto';
	VisStedet.App.showLayer (layer);

	
	//Use locate instead
	VisStedet.App.zoomToDefault ();
	
	//Add DOM elements
	var menu = jQuery('<div id="topDiv"></div>');
	var h1 = jQuery('<h1></h1>');
	var searchbutton = jQuery('<li id="searchBtn"></li>');
	var input = jQuery('<li id="searchinput"><div><input></input><div class="loader"/></div></li>').hide();
	var infobutton = jQuery('<li id="infoBtn"><a></a></li>').click(function(e) {
		if (VisStedet.App.currentLayer.link) {
			window.open(VisStedet.App.currentLayer.link);
		} else {
			alert("Der er ikke angivet et link til info om dette kort!");
		}
	});	
	
	//Style
    var style = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeDashstyle: 'dash',
            fillOpacity: 0.5,
            strokeColor: '#ff0',
            pointRadius: 10,
            fill: false
        })
    });
    
    var curfeature = null;
	
	
	
//	if (!geosearch) {
//		
//    	var geosearch = new VisStedet.Search.GeoSearch ({
//    		ticket: VisStedet.App.kmsticket,
//    		ticket: new VisStedet.Ticket(),
//            resources: ['Adresser','Matrikelnumre','Kommuner','Opstillingskredse','Politikredse','Postdistrikter','Regioner','Retskredse']
//		});
//	}
	var geosearch, kmsticket;
	
    kmsticket = new VisStedet.Ticket();    
    geosearch = new VisStedet.Search.GeoSearch ({
        ticket: kmsticket,
        resources: ['Adresser','Matrikelnumre','Kommuner','Opstillingskredse','Politikredse','Postdistrikter','Regioner','Retskredse','Stednavne']
    });
    
	
	var inputfield = input.find('input');
	inputfield.keyup(function (event,element) {	
		
		var val = jQuery(event.target).val();
		
		if (val.length > 2) {
		jQuery(".loader").addClass('show');
    	geosearch.search(val,function () {
    		jQuery('#searchselect').empty();
    		jQuery('#searchselect').show();
  		

    		
    		var geoarray = [];
    		var results = arguments[0].data;
    		if (results.length > 0){
    			
    			if (results.length > 3){
    				var listsize = 4;
    			} else {
    				var listsize = results.length;
    			}
    		
	    		for (var i=0; i < listsize; i++)
	    		  {
	    		  var ps = arguments[0].data[i].presentationString;
	    		
	    		  geoarray.push(arguments[0].data[i].geometryWkt);
	    		  var html = "<div id="+i+" class='resultdiv'>"+ ps + "</div>";
	    		  jQuery('#searchselect').append(html);
	    		  jQuery(".loader").removeClass('show');
	    		  }
	    		
	    		jQuery("#searchselect .resultdiv").click(function(){
	    			
	        		var id = this.id;
	        		
	        		
	        		var wkt = geoarray[id];
	        		var vector = new OpenLayers.Layer.Vector('vector', {
        	            styleMap: style,
        	            rendererOptions: { zIndexing: true }
        	        });
	        		
	        		
	        		if (wkt) {
	        			
	        			if(curfeature) {
	        				vector.removeFeatures (curfeature);
	        			}
		                
	        			var in_options = {
		                    'internalProjection': new OpenLayers.Projection('EPSG:25832'),
		                    'externalProjection': new OpenLayers.Projection('EPSG:25832')
		                };
		                if (wkt.match(/BOX/i)) {
		                    wkt = wkt.split(',')[0].replace (/BOX/,'POINT')+')';
		                }
		                
		                
		                var format = new OpenLayers.Format.WKT(in_options);
		                var feature = format.read(wkt);
		                curfeature = feature;
		               
		                if(feature) {
		                    if(feature.constructor != Array) {
		                        feature = [feature];
		                    }
		                    vector.addFeatures (feature);
		                    VisStedet.App.map.addLayer(vector);
		                    VisStedet.App.map.zoomToExtent(vector.getDataExtent());    
		                }
		        	}
	        	});
	    		
    		}
    			
	    	}); //END GEOSEARCH
		} else {
			jQuery(".loader").removeClass('show');
			jQuery('#searchselect').hide();
		} //END IF VAL.LENGTH 
    	
	})
		
	
	searchbutton.click({input:input},function (event) {
		event.data.input.toggle();

		var searchinput = jQuery("#searchinput input").is(':visible');
		if(searchinput == false) {
			jQuery('#searchselect').hide();
		}
	
	});
	menu.append(searchbutton);
	menu.append(input);
	menu.append(h1);
	menu.append(infobutton);
	jQuery('body').append(menu);
	jQuery('body').append('<div id="searchselect"></div>');
	jQuery("#topDiv h1").append(VisStedet.App.currentLayer.title);

});

var slider;
var currentindex = 0;
var numberOfLayers = 0;
var geosearch;


if (typeof VisStedet == 'undefined') {
	VisStedet = {};
}

VisStedet.App = {
	
	map: null,
	
	mapOptions: null,
	
	kmsticket: null,
	
	currentLayer: null,
		
	initMap: function () {
		this.mapOptions = {
        	div: 'map',
            projection: 'EPSG:25832',
            resolutions: [0.8, 1.6, 3.2, 6.4, 12.8, 25.6, 51.2, 102.4, 204.8, 409.6, 819.2, 1638.4],
            units: "m",
            maxResolution: 1638.4,
            maxExtent: new OpenLayers.Bounds(120000, 5661139.2, 958860.8, 6500000),
            numZoomLevels: 12,
            controls: [
                       new OpenLayers.Control.Attribution(),
                       new OpenLayers.Control.TouchNavigation({
                           dragPanOptions: {
                               enableKinetic: true
                           }
                       }),
                       new OpenLayers.Control.Zoom()
                   ]
        }
        this.map = new OpenLayers.Map(this.mapOptions);
		

		//restyle zoom controls
		jQuery('div.olControlZoom a').css({'background':'#000', 'padding':'10px'});
		jQuery('div.olControlZoom').css({'bottom':'13px', 'top':'auto', 'right':'8px', 'left':'auto', 'position':'fixed'});	
		jQuery("#map").append('<div id="locate" class="olControlZoom"><a></a></div>');	
		
		//LOCATE ME!
		var style = {
			    fillColor: '#000',
			    fillOpacity: 0.1,
			    strokeWidth: 0
			};

		var vector = new OpenLayers.Layer.Vector('vector');
		this.map.addLayers([vector]);
		
		var pulsate = function(feature) {
		    var point = feature.geometry.getCentroid(),
		        bounds = feature.geometry.getBounds(),
		        radius = Math.abs((bounds.right - bounds.left)/2),
		        count = 0,
		        grow = 'up';

		    var resize = function(){
		        if (count>16) {
		            clearInterval(window.resizeInterval);
		        }
		        var interval = radius * 0.03;
		        var ratio = interval/radius;
		        switch(count) {
		            case 4:
		            case 12:
		                grow = 'down'; break;
		            case 8:
		                grow = 'up'; break;
		        }
		        if (grow!=='up') {
		            ratio = - Math.abs(ratio);
		        }
		        feature.geometry.resize(1+ratio, point);
		        vector.drawFeature(feature);
		        count++;
		    };
		    window.resizeInterval = window.setInterval(resize, 50, point, radius);
		};

		var geolocate = new OpenLayers.Control.Geolocate({
		    bind: false,
		    geolocationOptions: {
		        enableHighAccuracy: false,
		        maximumAge: 0,
		        timeout: 7000
		    }
		});
		this.map.addControl(geolocate);
		var firstGeolocation = true;
		geolocate.events.register("locationupdated",geolocate,function(e) {
		    vector.removeAllFeatures();
		    var circle = new OpenLayers.Feature.Vector(
		        OpenLayers.Geometry.Polygon.createRegularPolygon(
		            new OpenLayers.Geometry.Point(e.point.x, e.point.y),
		            e.position.coords.accuracy/2,
		            40,
		            0
		        ),
		        {},
		        style
		    );
		    vector.addFeatures([
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
		    if (firstGeolocation) {
		        this.map.zoomToExtent(vector.getDataExtent());
		        pulsate(circle);
		        firstGeolocation = false;
		        this.bind = true;
		    }
		});
		geolocate.events.register("locationfailed",this,function() {
		    OpenLayers.Console.log('Location detection failed');
		});
		document.getElementById('locate').onclick = function() {
		    vector.removeAllFeatures();
		    geolocate.deactivate();
		    geolocate.watch = false;
		    firstGeolocation = true;
		    geolocate.activate();
		};
		// END LOCATE ME //
		
	},
	
	showLayer: function (name, curindex) {
	
		for (var i = this.map.layers.length - 1; i > -1; i--) {
            if (this.map.layers[i].CLASS_NAME != 'OpenLayers.Layer.Vector') {
                this.map.removeLayer(this.map.layers[i]);
            }
        }
		var layer = VisStedet.App.LAYERS[name];
		
		jQuery("#topDiv h1").html(VisStedet.App.LAYERS[name].title);
		
		this.currentLayer = layer;
		if (layer) {
			for (var i=0;i<layer.layers.length;i++) {
				this.addLayer(layer.layers[i], curindex)
			}
		}
	},
	
    addLayer: function(layerConfig, curindex) {
    	
        var type = layerConfig.type.toLocaleUpperCase();
        if (this.kmsticket == null) {
            this.kmsticket = new VisStedet.Ticket().toString();
        }
   
        if (layerConfig.params.ticket == "") {
            layerConfig.params.ticket = this.kmsticket;
            layerConfig.params.login = 'gmcb3';
            layerConfig.params.password = '3bcmg';
        }
        var layer = null;
        switch (type) {
            case "WMS":
                layer = new OpenLayers.Layer.WMS(layerConfig.name, layerConfig.url, layerConfig.params, layerConfig.options);
                break;
            case "WMTS":
                layerConfig.options.tileSize = new OpenLayers.Size(256, 256);
                layerConfig.options.tileOrigin = new OpenLayers.LonLat(this.mapOptions.maxExtent.left, this.mapOptions.maxExtent.top);
                layerConfig.options.tileFullExtent = this.mapOptions.maxExtent.clone();
                for (var opts in layerConfig.options) {
                    layerConfig[opts] = layerConfig.options[opts];
                }
                for (var par in layerConfig.params) {
                    layerConfig[par] = layerConfig.params[par];
                }
                if (typeof layerConfig["matrixIds"] == "string") {
                    if (layerConfig["matrixIds"].indexOf(',') > 0) {
                        layerConfig["matrixIds"] = layerConfig["matrixIds"].split(',');
                    }
                }
                layer = new OpenLayers.Layer.WMTS(layerConfig);
                break;
        }

        this.map.addLayer(layer);
        if (layer.isBaseLayer) {
            this.map.setBaseLayer(layer);
        }
    },
    
    zoomToDefault: function () {
		//this.map.zoomToExtent(new OpenLayers.Bounds(724446,6175995,724447,6175996), true);
		this.map.setCenter(new OpenLayers.LonLat(724446,6175995), 9);
    },
	
	getUrlParam: function(name){		
		return (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
	},
	

  
};


// url bar hiding
(function() {
    
  var win = window,
      doc = win.document;

  // If there's a hash, or addEventListener is undefined, stop here
  if ( !location.hash || !win.addEventListener ) {

    //scroll to 1
    window.scrollTo( 0, 1 );
    var scrollTop = 1,

    //reset to 0 on bodyready, if needed
    bodycheck = setInterval(function(){
      if( doc.body ){
        clearInterval( bodycheck );
        scrollTop = "scrollTop" in doc.body ? doc.body.scrollTop : 1;
        win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
      } 
    }, 15 );

    if (win.addEventListener) {
      win.addEventListener("load", function(){
        setTimeout(function(){
          //reset to hide addr bar at onload
          win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
        }, 0);
      }, false );
    }
  }

});
