var kmsticket = new VisStedet.Ticket();
var baselayer = "";
var crs = new L.Proj.CRS.TMS('EPSG:25832',
    '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', [120000, 5900000, 1000000, 6500000], {
        resolutions: [
   1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6,
   12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1
  ]
    });
var map = new L.Map('map', {
    crs: crs
});

var matrikelkort = L.tileLayer.wms('http://{s}.kortforsyningen.kms.dk/service', {
    service: 'WMS',
    transparent: true,
    servicename: 'mat',
    layers: 'Centroide,MatrikelSkel,OptagetVej',
    version: '1.1.0',
    ticket: kmsticket,
    styles: 'sorte_centroider,sorte_skel,default',
    format: 'image/png',
    attribution: "Geodatastyrelsen"
}).addTo(map);

var ortofoto = L.tileLayer('http://{s}.kortforsyningen.kms.dk/orto_foraar?ticket=' + kmsticket + '&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
    attribution: 'Geodatastyrelsen',
    maxZoom: 13,
    zoom: function () {
        var zoom = map.getZoom();
        if (zoom < 10)
            return 'L0' + zoom;
        else
            return 'L' + zoom;
    }
});

var skaermkort = L.tileLayer('http://{s}.kortforsyningen.kms.dk/topo_skaermkort?ticket=' + kmsticket + '&request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
    attribution: 'Geodatastyrelsen',
    maxZoom: 13,
    zoom: function () {
        var zoom = map.getZoom();
        if (zoom < 10)
            return 'L0' + zoom;
        else
            return 'L' + zoom;
    }
}).addTo(map);


var baselayers = {
    "Skærmkort": skaermkort,
    "Flyfoto": ortofoto
};

var overlays = {
    "Matrikelkort": matrikelkort
};

var layers = L.control.layers(baselayers, overlays).addTo(map);

map.on('baselayerchange', function (e) {
    if (e.name === 'Skærmkort') {
        matrikelkort.setParams({
            styles: 'sorte_centroider,sorte_skel,default'
        });
    } else if (e.name === 'Ortofoto') {
        matrikelkort.setParams({
            styles: 'gule_centroider,gule_skel,Gul_OptagetVej,default'
        });
    }
});

map.setView(L.latLng(55.9, 11.8), 1);