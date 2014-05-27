findStedet_layers = [
{ layerid: 1, type: "WMTS", name: "Sk\u00E6rmkort", url: "http://kortforsyningen.kms.dk/topo_skaermkort", params: { service: 'WMTS', version: '1.0.0',
    request: 'GetTile', format: 'image/jpeg', layer: 'dtk_skaermkort', style: 'default', BGCOLOR: '0xDCF0F9',
    matrixSet: 'View1', matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
    transparent: true, ticket: ""
}, options: { isBaseLayer: true, visibility: false, requestEncoding: 'kvp',layerid: 1 }
}
,
{ layerid: 2, type: "WMTS", name: "Flyfoto", url: "http://kortforsyningen.kms.dk/orto_foraar", params: { service: 'WMTS', version: '1.0.0',
    request: 'GetTile', format: 'image/jpeg', layer: 'orto_foraar', style: 'default', BGCOLOR: '0xDCF0F9',
    matrixSet: 'View1', matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
    transparent: true, ticket: ""
}, options: { isBaseLayer: true, visibility: false, requestEncoding: 'kvp' , layerid: 2 }
},

{ layerid: 4, type: "WMTS", name: "Hill shade", url: "http://kortforsyningen.kms.dk/dhm", params: { service: 'WMTS', version: '1.0.0',
    request: 'GetTile', format: 'image/jpeg', layer: 'hillshade_1_6m', style: 'default', BGCOLOR: '0xDCF0F9',
    matrixSet: 'View1', matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
    transparent: true, ticket: ""
}, options: { isBaseLayer: false, visibility: false, opacity: 0.3, requestEncoding: 'kvp' , layerid: 4 }
},

{ type: "WMS", name: "Matrikelkort", url: "http://kortforsyningen.kms.dk/service", params: { service: 'WMS', Transparent: true, servicename: 'mat', layers: 'Centroide,MatrikelSkel,OptagetVej',
    version: '1.1.0', ticket: "", styles: 'sorte_centroider,sorte_skel,default'
}, options: { isBaseLayer: false, maxResolution: 3.2, visibility: false, layerid: 3 }
}

];
