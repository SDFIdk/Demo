
var myScroll;
var activeGeoPosition = false;
$(document).ready(function () {
    $.mobile.hidePageLoadingMsg();

    // myScroll = new iScroll('popup', { hScrollbar: false, vScrollbar: true });
    // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);



    var selectedFeature = null;
    // Start with the map page
    window.location.replace(window.location.href.split("#")[0] + "#mappage");


    // fix height of content
    function fixContentHeight() {

        var footer = $("div[data-role='footer']:visible"),
            content = $("div[data-role='content']:visible:visible"),
            viewHeight = window.innerHeight ? window.innerHeight : $(window).height(),
            contentHeight = viewHeight - footer.outerHeight();

        if ((content.outerHeight() + footer.outerHeight()) !== viewHeight) {
            contentHeight -= (content.outerHeight() - content.height() + 1);
            content.height(contentHeight);
        }

        if (window.map && window.map instanceof OpenLayers.Map) {
            map.updateSize();
        } else {
            // initialize map

            findstedet = new FindStedet.Map({ findStedet_layers: findStedet_layers });
            initLayerList();
        }
    }

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") >= 0) {
        document.body.onload = fixContentHeight;
    } else {
        $(window).bind("orientationchange resize pageshow", fixContentHeight);
        document.body.onload = fixContentHeight;
    }

    setTimeout(fixContentHeight, 2500);


    // Map zoom  
    $("#plus").click(function () {
        map.zoomIn();
    });
    $("#minus").click(function () {
        map.zoomOut();
    });
    $("#locate").click(function () {
        activeGeoPosition ? activeGeoPosition = false : activeGeoPosition = true;
        var control = map.getControlsBy("id", "locate-control")[0];
        if (activeGeoPosition) {
            $('#locate').toggleClass("locateBtnOn", true);
            $('#locate').toggleClass("locateBtn", false);
            activeGPS();
        } else {
            $('#locate').toggleClass("locateBtn", true);
            $('#locate').toggleClass("locateBtnOn", false);
            control.deactivate();
        }
    });
    $("#searchpageBtn").click(function () {
        $.mobile.changePage($('#searchpage'));
    });
    $("#layerspageBtn").click(function () {
        $.mobile.changePage($('#layerspage'));
    });
    $("#morepageBtn").click(function () {
        $.mobile.changePage($('#morepage'));
    });
    $(".backBtn").click(function () {
        $.mobile.changePage($('#mappage'), { reverse: true });
    });


    $('#layerPopup').click(function () {
        var popElement = $("#popup")
        if (popElement) {
            if (popElement.is(":visible")) {
                popElement.hide();
            } else {
                popElement.show();
            }
        }
    });

    var search = null;
    $('#searchpage').live('pageshow', function (event, ui) {
        $("#query").focus();
        if (search === null) {
            search = new FindStedet.Search({
                map: map,
                selectCallback: function () {
                    $.mobile.changePage($('#mappage'), { reverse: true });
                }
            });
        }
        search.set();
    });


    $('#search_address').click(function () {
        setSearchButtons('#search_address');
        search.set('address');
    });
    $('#search_place').click(function () {
        setSearchButtons('#search_place');
        search.set('place');
    });
    $('#search_cadastral').click(function () {
        setSearchButtons('#search_cadastral');
        search.set('cadastral');
    });
    $("#filterimg").click(function () {
        search.close();
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

        //$('#layerslist').listview('refresh');

        map.events.register("addlayer", this, function (e) {
            addLayerToList(e.layer);
        });
        $("#popup").hide();
    }

    function addLayerToList(layer) {

        if (layer.displayInLayerSwitcher == false) {
            return;
        }
        var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        }).append($('<a />', {
            text: layer.name
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
        ).appendTo('#layerslist');
        layer.events.on({
            'visibilitychanged': function () {
                $(item).toggleClass('checked');
            }
        });
    }

    function setSearchButtons(id) {
        var c = 'inactive_' + id.replace(/#/, '');
        $(id).toggleClass(c);
    }

});

function activeGPS() {
    if (activeGeoPosition) {
        var control = map.getControlsBy("id", "locate-control")[0];
        if (control.active) {
            control.getCurrentLocation();
        } else {
            control.activate();
        }
        setTimeout("activeGPS()", 10000);
    }
}