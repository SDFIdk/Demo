
if(typeof FindStedet=='undefined') {
    window.FindStedet = {};
}

FindStedet.Search = VisStedet.Utils.Class({
    
    id: 'query',
    map: null,
    types: {
        address: true,
        place: true,
        cadastral: true
    },
    service: null,
    serviceOptions: {
    	ticket: null
    },
    minLength: 2,
    delay: 750,
    selectCallback: null,

    initialize: function (options) {
    	this.serviceOptions.ticket = new VisStedet.Ticket();
        VisStedet.Utils.extend (this,options);
    },
    
    close: function () {
        window.scrollTo(0,0);
        if ($('#'+this.id)) {
            $('#'+this.id).autocomplete('close');
        }
    },
    
    set: function (type,options) {
        if (type) {
            this.types[type] = !this.types[type]
        }
        VisStedet.Utils.extend (this,options);
        
        if (this.service === null) {
            this.service = new VisStedet.Search.GeoSearch (VisStedet.Utils.extend ({},this.serviceOptions));
        }
        //['Adresser','Kommuner','Opstillingskredse','Politikredse','Postdistrikter','Regioner','Retskredse','Stednavne'],
        this.service.resources = [];
        if (this.types['address'] === true) {
            this.service.resources.push ('Adresser');
        }
        if (this.types['cadastral'] === true) {
            this.service.resources.push ('Matrikelnumre');
        }
        if (this.types['place'] === true) {
            this.service.resources.push ('Stednavne');
            this.service.resources.push ('Kommuner');
            this.service.resources.push ('Opstillingskredse');
            this.service.resources.push ('Politikredse');
            this.service.resources.push ('Postdistrikter');
            this.service.resources.push ('Regioner');
            this.service.resources.push ('Retskredse');
        }
        
        if (this.service !== null) {
            $('#'+this.id).autocomplete({
                autoFocus: true,
                delay: this.delay,
                minLength: this.minLength,
                source : VisStedet.Utils.bind(this.getSource,this),
                select : VisStedet.Utils.bind(this.select,this)
            });
            $('#'+this.id).click(function () {
                window.scrollTo(0,0);
            });
            
            $('#'+this.id).autocomplete('search');
        } else {
            $('#'+this.id).autocomplete('destroy');
        }
    },
    
    getSource: function (request, response) {
        this.service.search(request.term, function (result) {
            response( $.map( result.data, function(item) {
                displayLabel = item.presentationString;
                displayValue = item.presentationString;
                return {
                    label : displayLabel,
                    value : displayValue,
                    data : item
                };
            }));
        });
    },
    
    select: function(event, ui) {
        if (this.map !== null) {
            findstedet.pointlayer.destroyFeatures();

            if (ui.item.data.x && ui.item.data.y) {
                
                var feature = new OpenLayers.Feature.Vector(
                    new OpenLayers.Geometry.Point(ui.item.data.x,ui.item.data.y), {
                        type: 3
                    }
                );
                findstedet.pointlayer.addFeatures([feature]);
                this.map.zoomToExtent(feature.geometry.bounds);
                offentligeinfo(ui.item.data.x,ui.item.data.y);
            } else if (ui.item.data.geometryWkt) {
                var a = ui.item.data.geometryWkt.split ('(');
                a = a[a.length-1].split(')')[0];
                a = a.split (',');
                var minx = 999999999999;
                var miny = 999999999999;
                var maxx = 0;
                var maxy = 0;
                for (var i=0;i<a.length;i++) {
                    var b = a[i].split (' ');
                    minx = Math.min(minx,b[0]-0);
                    miny = Math.min(miny,b[1]-0);
                    maxx = Math.max(maxx,b[0]-0);
                    maxy = Math.max(maxy,b[1]-0);
                }
                var bounds = new OpenLayers.Bounds(minx, miny, maxx, maxy);
                this.map.zoomToExtent(bounds);
            } else {
                
                var bounds = new OpenLayers.Bounds(ui.item.data.xMin, ui.item.data.yMin, ui.item.data.xMax, ui.item.data.yMax);
                this.map.zoomToExtent(bounds);
            }
        }
        if (this.selectCallback !== null) {
            this.selectCallback(ui.item);
        }
    },

    CLASS_NAME: "FindStedet.Search"

});
