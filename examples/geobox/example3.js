
var x=[],y=[];

function showData (vejnavn, husnr, postnr, text) {
    
    $.ajax({
        url: 'https://services.kortforsyningen.dk',
        dataType: 'jsonp',
        contentType: 'application/json; charset=utf-8',
        data: {
            servicename: 'RestGeokeys_v2',
            method: 'adresse',
            vejnavn: vejnavn,
            husnr: husnr,
            postnr: postnr,
            geometry: 'true',
            ticket: kmsticket.toString(),
            f: 'jsonp'
        },
        success: function (data) {
            if (data.error) {
                //Error from Geokey service
            } else {
                
                x.push(data.features[0].geometry.coordinates[0]);
                y.push(data.features[0].geometry.coordinates[1]);
                
                if (x.length === 1) {
                    setCenter(x[0],y[0],10);
                } else {
                    map.zoomToExtent([Math.min.apply(null, x),Math.min.apply(null, y),Math.max.apply(null, x),Math.max.apply(null, y)]);
                }
                
                var popup = new OpenLayers.Popup.Anchored("anchored", 
                    new OpenLayers.LonLat(data.features[0].geometry.coordinates[0],data.features[0].geometry.coordinates[1]),
                    null,
                    '<div class="infopopup"><div class="infotooltip-arrow"></div><div class="infotooltip-inner">'+text+'</div></div>',
                    {
                        size: new OpenLayers.Size(0,0),
                        offset: new OpenLayers.Pixel($('.infopopup').width()/2,0) 
                    },
                    false  //show close button
                );
                popup.autoSize = true;
                popup.backgroundColor = 'transparent';
                popup.calculateRelativePosition = new Function ('return "tl";');
                
                map.addPopup (popup);
                
                $('body > .infopopup').remove();
                
                popup.setSize(new OpenLayers.Size($('.infopopup').width(),$('.infopopup').height()+5));
                
                $('.olPopupContent').css({
                    overflow: 'hidden',
                    padding: '0'
                });
            }
        }
    })
    
}
