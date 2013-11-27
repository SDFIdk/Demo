 var layerattributes = new Array();
 OpenLayers.ProxyHost = "proxy/proxy.php?url=";

function offentligeinfo(lonmin,latmin)
{
    var lonlat = new OpenLayers.LonLat(lonmin,latmin);
    var pixels = map.getViewPortPxFromLonLat(lonlat);
    
    initializeCheckboxes(); 
   // Get Terrænhøjde
    GetHeight(lonmin,latmin);
   
    var mapControls = map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo");
    for (var index = 0; index< mapControls.length; index++)
   		{
			mapControls[index].request(new OpenLayers.Pixel(pixels.x,pixels.y));
		}
}

function InformationDialogs()
{
	// Initialize Buttons with Jquery Them 	
	$('#btnGetDetailedInfo').button();
	$('#btnejendom').button();
	$('#btnbbr').button();
	$('#btnsogne').button();
	$('#btnPrintInformation').button();
	
	
	// Initialize Information dialogs
	$("#divOffentligeInformation ui-dialog-titlebar").show();
	$( "#divOffentligeInformation" ).dialog({
	        autoOpen: false,
	        show: 'slide',
	        resizable: false,
	        stack: true,
	        height: '630',
	        width: '430',
	        position:
	        {
						 my:'left',
						 at:'left',
						 offset:'0 -30',
						 collision:'none'
					},
				  open: function () 
				  {
          	$(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar").addClass("titlemenu");
          }
     });
        
	$("#divDetailedInformation").dialog({
	        autoOpen: false,
	        show: 'slide',
	        resizable: false,
	        position: 'center',
	        stack: true,
	        height: '500',
	        width: '450',
	        modal: true,
 				  open: function () 
				  {
          	$(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar").addClass("subtitlemenu");
          }

	 });
        

	// Initialize Information dialogs Click Events
	//$("#btnOffentligeInformation").click(function() {
    //        $("#divOffentligeInformation" ).dialog('open');
    // });

   	$('#btnGetDetailedInfo').click(function () 
   		{
		    var checkedflag = 0;
    		$("#divDetailedInformation").empty();
    		$.each($("input[name=checkboxlist]"), function() {
                if ($(this).attr('checked'))
                {
            		checkedflag = 1;
            		var Heading = $(this).val();
            		var KeyValueArray = layerattributes[$(this).val()];
            		GetDetailedInfoForGeoKey(Heading,KeyValueArray);
        		}
	        });
    
    		if (checkedflag == 0)
    			alert('Du har ingen checkbox valgt');
    		else
    			$("#divDetailedInformation").dialog('open');
		});

    $("#btnOffentligeInformation").click(function () {
    	var popElement = $("#divOffentligeInformation");
        if (popElement) 
        {
        	if (popElement.is(":visible")) 
        	{
            	popElement.dialog("close");
                return false;
            } 
            else 
            {
            	popElement.dialog("open");
                return false;
            }
        }
    });

		
	// Print information
	
	 
$("#btnPrintInformation").click(function () {
	    		$("#divDetailedInformation").empty();
					
					//$("#divDetailedInformation").append('<div><input type="image" id="btnprint" src="img/icon_printer.gif" /></div>');
	    		$.each($("input[name=checkboxlist]"), function() {
					if (!($(this).attr('disabled')))
						{
            				var Heading = $(this).val();
            				var KeyValueArray = layerattributes[$(this).val()];
           					GetDetailedInfoForGeoKey(Heading,KeyValueArray);
           				}
	        });
			$("#divDetailedInformation").printElement();
});

$('#btnejendom').click(function (){
	
	var komnr = $('body').data('KMNR').substr(1);
	var ejendomnr = $('body').data('EJDNR').substr(3);
	var url = 'http://www.vurdering.skat.dk/Ejendomsvurdering?KMNR='+ komnr +'&EJDNR='+ ejendomnr +'&sideNavn=vstartp';
	window.open(url,'mywindow','width=400,height=200,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes');	
});

$('#btnbbr').click(function (){
	var komnr = $('body').data('KMNR').substr(1);
	var ejendomnr = $('body').data('EJDNR').substr(3);
	var url = 'http://www.ois.dk/ui/linkpartner/linkpartner.aspx?CBKORT=TRUE&komnr='+ komnr+'&ejdnr='+ ejendomnr;
	window.open(url,'mywindow','width=400,height=200,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes');	
});
	
$('#btnsogne').click(function (){
	var url = 'http://sogn.dk/index.html?road=' + $('body').data('road') +'&number='+ $('body').data('number') + '&zip='+ $('body').data('zip') +'&city='+ $('body').data('city') +'&type=sba';
	window.open(url,'mywindow','width=400,height=200,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes');	
});
	
} // Function Close

function RequiredLayers()
{
    var adresseLayer = new OpenLayers.Layer.WMS("Address",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'topomat','layers': 'OSAK-ADRESSE','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false});

    var jordstykkeLayer = new OpenLayers.Layer.WMS("JordStykke",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'topomat','layers': 'JORDSTYKKE','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

    var bygningLayer = new OpenLayers.Layer.WMS("Bygning",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'topomat','layers': 'BYGNING','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

    // DAGI Layers

    var regionLayer = new OpenLayers.Layer.WMS("Region",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'dagi','layers': 'region','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

    var kommuneLayer = new OpenLayers.Layer.WMS("Kommune",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'dagi','layers': 'kommune','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

    var sognLayer = new OpenLayers.Layer.WMS("Sogn",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'dagi','layers': 'sogn','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

    var politikredsLayer = new OpenLayers.Layer.WMS("Politikreds",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'dagi','layers': 'politikreds','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

    var retskredsLayer = new OpenLayers.Layer.WMS("Retskreds",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'dagi','layers': 'retskreds','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

    var opstillingskredsLayer = new OpenLayers.Layer.WMS("Opstillingkreds",
                                        "http://kortforsyningen.kms.dk/service",
                                        {servicename:'dagi','layers': 'opstillingskreds','styles': 'default',transparent: true,format: "image/png",login:"demo",password:"demo"},
                                        {displayInLayerSwitcher : false,isBaseLayer: false,visibility:false});

   map.addLayers([bygningLayer,adresseLayer,jordstykkeLayer,regionLayer,kommuneLayer,sognLayer,politikredsLayer,retskredsLayer,opstillingskredsLayer]);    

   var layersNames = new Array(adresseLayer,jordstykkeLayer,bygningLayer,regionLayer,kommuneLayer,sognLayer,politikredsLayer,retskredsLayer,opstillingskredsLayer);	    
   var  info;
   //kmsticket = new VisStedet.Ticket();		
   for (var i=0; i<layersNames.length; i++) { 
        if (i < 3)
        {
        	serviceName =   'topomat';
        }
        else
        { 
        	serviceName =   'dagi';
        }
         info =  new OpenLayers.Control.WMSGetFeatureInfo({
                url: 'http://kortforsyningen.kms.dk/service', 
                id:i,
                vendorParams:{servicename:serviceName,login:"demo",password:"demo"},
                layers: [layersNames[i]],
                query_layers:[layersNames[i]],
                drillDown: true, 
                infoFormat: 'application/vnd.ogc.gml', 
                queryVisible: false,
                
            eventListeners: {
                getfeatureinfo: function(event) {
                    //alert(event.features[0].type);
                    var featureType = event.features[0].type;
                    var attributes = event.features[0].attributes;
                    if (featureType == "OSAK-ADRESSE")
                        {   layerattributes["Adresse INFO"] =  {
                            'AddressID'        :attributes.ADRKODE,
                            'Kommunenummer'    :attributes.KOMNR,
                            'Kommunenavn'      :attributes.KOMNAVN,
                            'Vejkode'          :attributes.VEJKODE,
                            'Vejnavn'          :attributes.VEJNAVN,
                            'Husnummer'        :attributes.HUSNR,
                            'Postnummer'       :attributes.POSTNR,
                            'Sognenummer'      :attributes.SOGNEKODE,
                            'Sognenavn'        :attributes.SOGNNAVN,
                            'X-koordinat'      :attributes.EUTM,
                            'Y-koordinat'      :attributes.NUTM,
                            'Kvadratnet 100 m' :attributes.KN100MDK,
                            'Kvadratnet 1 km'  :attributes.KN1KMDK,
                            'Kvadratnet 10 km' :attributes.KN10KMDK
                        };
                            $('body').data('road', attributes.VEJNAVN);
                            $('body').data('number', attributes.HUSNR);
                            $('body').data('zip', attributes.POSTNR);
                            $('body').data('city', attributes.POSTDISTRIKT);
                            
                            AddRowToGeoKeysTable(0,attributes.VEJNAVN + " "+ attributes.HUSNR + " "+ attributes.POSTNR+ " "+attributes.POSTDISTRIKT);
                        }
                    else if (featureType == "JORDSTYKKE")
                        {
                           layerattributes["Jordstykke INFO"] =  {
                            'Ejerlavnavn'   :attributes.ejerlavsnavn,
                            'Ejerlavkode'   :attributes.landsejerlavskode,
                            'Matrikelnummer':attributes.matrikelnummer,
                            'Journalnummer' :attributes.kms_journalnummer,
                            'Kommunenavn'   :attributes.kommunenavn,
                            'Kommunekode'   :attributes.kommunekode,
                            'Sognenavn'     :attributes.sognenavn,
                            'Sognekode'     :attributes.sognekode,
                            'Regionnavn'    :attributes.regionsnavn,
                            'Regionkode'    :attributes.regionskode,
                            'Retskredsnavn' :attributes.retskredsnavn,
                            'Retskredskode' :attributes.retskredskode,
                            'Moderjord'     :attributes.moderjordstykke,
                            'Areal m²'      :attributes.registreretareal,
                            'Vejareal m²'   :attributes.vejareal,
                            'Fælleslod'     :attributes.faelleslod,
                            'Ejendomsnummer':attributes.esr_ejendomsnummer,
                            'Arealtype'     :attributes.arealtype
                        };
                            $('body').data('EJDNR', attributes.esr_ejendomsnummer);
                            $('body').data('KMNR', attributes.kommunekode);
                            AddRowToGeoKeysTable(2,attributes.matrikelnummer);
                            AddRowToGeoKeysTable(3,attributes.ejerlavsnavn);
                            AddRowToGeoKeysTable(4,attributes.esr_ejendomsnummer);
                        }
                    else if (featureType == "BYGNING")
                        {
                           layerattributes["Bygning INFO"] = {
                            'Bygningstype':attributes.bygningstype_tekst,
                            'Tank/silo':attributes.tank_silo_type_tekst,
                            'BBR-reference':attributes.bbr_reference_tekst,
                            'Bygnings-id':attributes.id_nr
                        };
                             AddRowToGeoKeysTable(11,attributes.bygningstype_tekst);   
                        }
                    else if (featureType == "Region_10")
                        {
                             layerattributes["Region INFO"] = {
                                'Regionnavn':attributes.NAVN,
                                'Regionkode':attributes.CPR_NOEGLE,
                                'Areal km²' :(Number(attributes.AREAL.replace(/\,/g,'.'))/1000000).toFixed(2)
                            }
                            AddRowToGeoKeysTable(5,attributes.NAVN);
                        }
                    else if (featureType == "Kommune_10")
                        {
                             layerattributes["Kommune INFO"] = {
                                'Kommunenavn':attributes.NAVN,
                                'Kommunekode':attributes.CPR_NOEGLE,
                                'Areal km²'  :(Number(attributes.AREAL.replace(/\,/g,'.'))/1000000).toFixed(2),
                                'Regionnavn' :attributes.REGIONSNAVN,
                                'Regionkode' :attributes.REGIONSKODE
                            }
                            AddRowToGeoKeysTable(6,attributes.NAVN);
                        }

                    else if (featureType == "Sogn_10")
                        {
                             layerattributes["Sogne INFO"] = {
                                'Sognenavn':attributes.NAVN,
                                'Sognekode':attributes.CPR_NOEGLE,
                                'Areal km²':(Number(attributes.AREAL.replace(/\,/g,'.'))/1000000).toFixed(2)
                            }
                            AddRowToGeoKeysTable(7,attributes.NAVN);
                        }

                    else if (featureType == "Politikreds_10")
                        {
                           layerattributes["Politikreds INFO"] = {
                                'Politikredsnavn':attributes.NAVN,
                                'Politikredskode':attributes.CPR_NOEGLE,
                                'Areal km²'      :(Number(attributes.AREAL.replace(/\,/g,'.'))/1000000).toFixed(2)
                            }
                            AddRowToGeoKeysTable(8,attributes.NAVN);
                        }

                    else if (featureType == "Retskreds_10")
                        {
                           layerattributes["Retskreds INFO"] = {
                                'Retskredsnavn' :attributes.NAVN,
                                'Myndighedskode':attributes.CPR_NOEGLE,
                                'Areal km²'      :(Number(attributes.AREAL.replace(/\,/g,'.'))/1000000).toFixed(2)
                            }
                           AddRowToGeoKeysTable(9,attributes.NAVN);
                        }

                    else if (featureType == "Opstillingskreds_10")
                        {
                           layerattributes["Opstillingskreds INFO"] = {
                                'Opstillingskreds nr'  :attributes.OPSTILLINGSKREDSNUMMER,
                                'Opstillingskreds navn':attributes.NAVN,
                                'Areal km²'            :(Number(attributes.AREAL.replace(/\,/g,'.'))/1000000).toFixed(2),
                                'Valgkreds nr.'        :attributes.VALGKREDSNUMMER,
                                'Storkreds nr.'        :attributes.STORKREDSNUMMER,
                                'Storkreds navn'       :attributes.STORKREDSNUMMER_TEKST,
                                'Landsdelsnr'          :attributes.LANDSDELSNUMMER,
                                'Landsdelsnavn'        :attributes.LANDSDELSNUMMER_TEKST
                                
                            }
                            AddRowToGeoKeysTable(10,attributes.NAVN);
                        }
                }
            }
        });

        map.addControl(info);
        info.activate();
} // For Loop
	// When User will click on map All checkboxes in Display Table and Third column will be reinitialized 
	// and coordinates will be collected to calculate Terrænhøjde
	map.events.register("click", map , function(e)
	{	
   		var lonlat = map.getLonLatFromViewPortPx(e.xy);

		initializeCheckboxes();
    	$('#tableGeoKeys tr').each(function() 
    	{
    		$(this).find("td:eq(2)").html('');    
     	});
   
   		var lonlat = map.getLonLatFromViewPortPx(e.xy);
   		GetHeight(lonlat.lon,lonlat.lat);
	
	});
}
   
function AddRowToGeoKeysTable(index,attributeValue)
{
	$("#"+index + "_cbx" ).attr("disabled", false);
	var keyvalues = '#tableGeoKeys tr:eq('+ index +') td:eq(2)';
	$(keyvalues).text(attributeValue);
}

function GetDetailedInfoForGeoKey(heading,keyvaluearray)
{
	var HtmlText = '<div style="line-height:1.5;color:#333333;margin:0;padding:0;border:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline;"><h1 style="color: #003a6b;background-color: transparent; font:Lucida Grande, Verdana, Geneva, Lucida, Arial, Helvetica, sans-serif;margin-bottom: 0.5em;border-bottom: 1px solid #0C3A6D;padding-top: 0.5em;font-size:200%" >'+ heading + '</h1></div>';
	HtmlText +='<table style="border-collapse:separate;border-spacing:0;"><tbody>'; 
 	
 	for(var key in keyvaluearray)
		HtmlText += '<tr><td style="text-align:left;font-weight:normal;">' + key + '</td><td style="padding-left:20px;">' + keyvaluearray[key] + '</td></tr>';
	
	HtmlText += '</tbody></table>';
	$("#divDetailedInformation").append(HtmlText);

}

function GetHeight(x,y)
{
	var height = $.ajax({
    					type: "POST",
    					data: {lon: x, lat: y},
    					url: 'proxy/SoapService.php',
   						async: false,
   						cache: false
    					}).responseText;

	AddRowToGeoKeysTable(1,height);
}

function initializeCheckboxes()
{
	// All checkboxes needs to be unchked and enabled
	$.each($("input[name=checkboxlist]"), function() 
		{
	    	$(this).attr('checked',false);
	        $(this).attr("disabled", true);
        });
}


