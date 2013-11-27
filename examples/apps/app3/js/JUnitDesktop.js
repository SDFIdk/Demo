var selectedFeature = null;

$(document).ready(function () {

	// Added to Show "Offentlige Informatione"
	// Added By salman Khan 12-17-2012
	InformationDialogs();

    // fix height of content
    function fixContentHeight() {
        var footer = $("div[data-role='footer']:visible"),
            content = $("div[data-role='content']:visible:visible"),
            viewHeight = $(window).height(),
            contentHeight = viewHeight - footer.outerHeight();

        if ((content.outerHeight() + footer.outerHeight()) !== viewHeight) {
            contentHeight -= (content.outerHeight() - content.height() + 1);
            content.height(contentHeight);
        }

        if (window.map && window.map instanceof OpenLayers.Map) {
            map.updateSize();
        } else {
            // initialize map
            var mapControls = [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.Geolocate({
                    id: 'locate-control',
                    geolocationOptions: {
                        enableHighAccuracy: false,
                        maximumAge: 0,
                        timeout: 7000
                    }
                })
            ];

            findstedet = new FindStedet.Map({ mapControls: mapControls, findStedet_layers: findStedet_layers });
            initLayerList();
        }

		// Added to Show "Offentlige Informatione"
  	   // Added By salman Khan 12-17-2012
		RequiredLayers();
		
        search = new FindStedet.Search({
            map: map,
            delay: 1,
            minLength: 1
        });
        search.set();
    }

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") >= 0) {
        document.body.onload = fixContentHeight;
    } else {
        $(window).bind("orientationchange resize pageshow", fixContentHeight);
        document.body.onload = fixContentHeight;
    }

    $("#plus").button({
        icons: {
            primary: "ui-icon-plus"
        },
        text: false
    })

    $("#minus").button({
        icons: {
            primary: "ui-icon-minus"
        },
        text: false
    })

    // Map zoom  
    $("#plus").click(function () {
        map.zoomIn();
    });
    $("#minus").click(function () {
        map.zoomOut();
    });

    $("#locate").click(function () {
        alert('locate');
        var control = map.getControlsBy("id", "locate-control")[0];
        findstedet.firstGeolocation = true;
        if (control.active) {
            control.getCurrentLocation();
        } else {
            control.activate();
        }
    });

    $('#search_address').click(function () {
        setSearchButtons('#search_address');
        search.set('address');
        return false;
    });
    $('#search_place').click(function () {
        setSearchButtons('#search_place');
        search.set('place');
        return false;
    });
    $('#search_cadastral').click(function () {
        setSearchButtons('#search_cadastral');
        search.set('cadastral');
        return false;
    });

    function initLayerList() {
        

        
        var baseLayers = map.getLayersBy("isBaseLayer", true);

        $.each(baseLayers, function () {
            addLayerToList(this);
        });

        var overlayLayers = map.getLayersBy("isBaseLayer", false);

        $.each(overlayLayers, function () {
            addLayerToList(this);
        });

        map.events.register("addlayer", this, function (e) {
            addLayerToList(e.layer);
        });
        $("#dialogLayer").hide();
    }
	
    function addLayerToList(layer) {
        if (layer.displayInLayerSwitcher == false) {
            return;
        }
        var item = $('<li>', {
            "class": layer.visibility ? "ui-widget-contentLayer checked" : "ui-widget-contentLayer"//"ui-widget-content"//layer.visibility ? "checked" : ""
        }).click(function () {
            if (layer.isBaseLayer) {
                var test = map.getLayersBy("layerid", 1)
                if (test.length > 0 && layer.options.layerid) {
                    var matlayer = map.getLayersBy("layerid", 3);
                    if (layer.options.layerid == 1) {
                        if (matlayer.length > 0) {
                            matlayer[0].params.STYLES = "sorte_centroider,sorte_skel,default";
                        }
                    } else {
                        if (matlayer.length > 0) {
                            matlayer[0].params.STYLES = "gule_centroider,gule_skel,Gul_OptagetVej,default";
                        }
                    }
                }
                map.setBaseLayer(layer);
            } else {
                layer.setVisibility(!layer.getVisibility());
            }
        })

        .append($('<a />', {
            text: layer.name,
            "class": "layerLinkstyle"
        }
        )
        ).append($('<span />', {
            "class": "ui-icon-layer ui-icon-check", //ui-icon-check ui-icon-shadow
            text: ''
        })
        ).appendTo('#layerslist');

        layer.events.on({
            'visibilitychanged': function () {
                $(item).toggleClass('checked');
            }
        });
    }

    $.fx.speeds._default = 10;
    $(function () {
        $("#dialogLayer").dialog({
            autoOpen: false,
            show: "Slide",
            hide: "Slide",
            resizable: false,
            maxHeight: 400,
            title: 'Kort temaer',
            dialogClass: 'dialogOpacity'
        });

        mainDiv = document.getElementById("findstedet_div")
        topDiv = 40; //parseInt(mainDiv.style.top) + 40;
        leftDiv = 50; //parseInt(mainDiv.style.left) + 45;
        test2 = $("#dialogLayer").dialog({ position: [topDiv, leftDiv] });

        $("#dialogLayer").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
        //$(".ui-dialog-titlebar").hide();
        

        $("#layerPopup").click(function () {
            var popElement = $("#dialogLayer");
            if (popElement) {
                if (popElement.is(":visible")) {
                    popElement.dialog("close");
                    return false;
                } else {
                    popElement.dialog("open");
                    
                    return false;
                }
            }
        });
    });


    function setSearchButtons(id) {
        var c = 'inactive_' + id.replace(/#/, '');
        $(id).toggleClass(c);
    }
    




});
