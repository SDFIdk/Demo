
OpenLayers.ProxyHost = "proxy/proxy.php?url=";
var map;
var vectorLayer;
 /********
  jquery Main Function  
 ********/
$(document).ready(function () 
	{
    	// Load default options 
    	// By default This page has to show 3. Kvart 2012 Information
    	LoadMap();
        $('body').data('kvart', '3kvart'); 
        ResetRadioButtons();
        AddFeatureToVectorLayer(6);

		// Click event for ForbrydelseType Radio Button
        $("input:radio[name=ForbrydelseType]").click(function () 
	        {
	            var type = Number($(this).val());
    	        var kvart = $('body').data('kvart');
        	    
        	    if (kvart == "1kvart")
					{                	
                		AddFeatureToVectorLayer(type);
            		}
            	else if (kvart == "2kvart")
            		{
                		AddFeatureToVectorLayer(type+1);
            		}
            	else if (kvart == "3kvart")
            		{
                		AddFeatureToVectorLayer(type + 2);
            		}
        	});
		
        // First kvart Click Event 
        $("#show_1kvart").click(function () 
        	{
            	setKvartSelection('#show_1kvart');
            	ResetRadioButtons();
            	AddFeatureToVectorLayer(4);
            	$('fieldset:visible legend').text('1. K v a r t  2 0 1 2')
        	});
        
        // Second kvart Click Event 
        $("#show_2kvart").click(function () 
        	{
	            setKvartSelection('#show_2kvart');
     	        ResetRadioButtons();
        	    AddFeatureToVectorLayer(5);
            	$('fieldset:visible legend').text('2. K v a r t  2 0 1 2')
        	});
        
        // Third kvart Click Event
        $("#show_3kvart").click(function () 
        	{
            	setKvartSelection('#show_3kvart');
            	ResetRadioButtons();
            	AddFeatureToVectorLayer(6);
            	$('fieldset:visible legend').text('3. K v a r t  2 0 1 2')
        	});
		// Initialize Dialog 
        $("#divForbrydelseType").dialog
        	({
            	autoOpen: true,
            	show: 'slide',
            	resizable: false,
            	stack: true,
            	height: '300',
            	width: '300',
            	position:
            		{
                		my: 'top',
                		at: 'top',
                		offset: '475 45',
                		collision: 'none'
            		}
        	});
    });

/****** End of Jquery Main Function **********************/

/******** 
 Function to initialize Map and Kommune Layer 
 ********/
function LoadMap() 
	{
		// Adding a base Map information
		map = new OpenLayers.Map({
	    	  	div: 'map',
	            projection: 'EPSG:25832',
	            units: 'm',
	            startExt: new OpenLayers.Bounds(420000, 6025000, 905000, 6450000),
	            maxExtent: new OpenLayers.Bounds(120000.0, 5661139.2, 1000000, 6500000.0),
	            maxResolution: 3277
	        });
	
	    // Adding kommune layer to show kommune boundries
	    var kommuneLayer = new OpenLayers.Layer.WMS
	    						(
	    							"Kommune","http://services.kortforsyningen.dk/adm_500_2008_r",
	                            	{ 'layers': 'KOM500_2008', 'styles': 'default', transparent: true, format: "image/png", ignoreillegallayers:true,login: "demo", password: "demo" },
	                            	{ isBaseLayer: true, displayInLayerSwitcher: true }
	                            );
		
		// Here we are adding a vector layer to show numbers(Actual data) on the map 
    	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
        	renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

        	vectorLayer = new OpenLayers.Layer.Vector
        	("Simple Geometry", 
        	{
	            styleMap: new OpenLayers.StyleMap({ 'default': 
	            {
                   	strokeColor: "#00FF00",
	                strokeOpacity: 1,
	                strokeWidth: 5,
	                fillColor: "#000000",
	                fillOpacity: 0.5,
	                pointRadius: 0,
	                pointerEvents: "visiblePainted",
	                label: "${name}",
	                fontColor: "red",
	                fontSize: "18px",
	                fontFamily: "Arial, Helvetica, sans-serif",
	                fontWeight: "bold",
	                labelOutlineWidth: 10,
	            }
	            }),
	            renderers: renderer
	        });

        map.addLayer(kommuneLayer);
        map.addLayer(vectorLayer);

		// Finally Zoomin map control at a visible level	
	    map.zoomTo(3);
	    map.setCenter(new OpenLayers.LonLat(724500, 6176450));
	    map.panTo(new OpenLayers.LonLat(623500, 6176450));
    }

function AddFeatureToVectorLayer(tryghed) 
	{
		// First We have to remove all previous features 
		vectorLayer.removeAllFeatures();

	/**** Here we are adding features to vector layer. Getting feature information from file.  
    *     Instead of creating a databse we have saved table information in a file names as information.txt.
 	*	  There are 19 columns defined in this file. Here are the names of all Column header values 
 	*     koummunekode KommuneNavn X Y TyveriK1 TyveriK2 TyveriK3 IndbrudK1 IndbrudK2 IndbrudK3 RøveriK1 RøveriK2 RøveriK3 VåbenK1 VåbenK2 VåbenK3 VoldK1 VoldK2 VoldK3 
 	*/		
        $.get('information.txt', function (data) 
        {
        	var lines = data.split('\n');
            for (var i = 0; i < lines.length; i++) 
            	{
                	var tokens = lines[i].split(',');
                	var point = new OpenLayers.Geometry.Point(tokens[2], tokens[3]);
                	var pointFeature = new OpenLayers.Feature.Vector(point);
                	pointFeature.attributes = { name: tokens[tryghed]};
                	vectorLayer.addFeatures([pointFeature]);
	            }
        });

    }


function setKvartSelection(id) 
	{
    	$('body').data('kvart', '');
   		$("#show_1kvart").attr('class','button inactive_show_1kvart'); 
   		$("#show_2kvart").attr("class","button inactive_show_2kvart"); 
   		$("#show_3kvart").attr("class","button inactive_show_3kvart");              
   		
   		$(id).attr('class',"button " + id.replace(/#/, ''));
   		$('body').data('kvart', id.replace(/#show_/, '')); 
	}
/********
 Jquery Cosmetic Function to Set Radio Button Images and appearance 
 ********/
jQuery.fn.customInput = function(){

    $(this).each(function(i){   
        if($(this).is('[type=checkbox],[type=radio]')){
            var input = $(this);
            var label = $('label[for='+input.attr('id')+']');
            var inputType = (input.is('[type=checkbox]')) ? 'checkbox' : 'radio';
            
            $('<div class="custom-'+ inputType +'"></div>').insertBefore(input).append(input, label);
            
            var allInputs = $('input[name='+input.attr('name')+']');
            label.hover(
                function(){ 
                    $(this).addClass('hover'); 
                    if(inputType == 'checkbox' && input.is(':checked')){ 
                        $(this).addClass('checkedHover'); 
                    } 
                },
                function(){ $(this).removeClass('hover checkedHover'); }
            );

            input.bind('updateState', function(){   
                if (input.is(':checked')) {
                    if (input.is(':radio')) {               
                        allInputs.each(function(){
                            $('label[for='+$(this).attr('id')+']').removeClass('checked');
                        });     
                    };
                    label.addClass('checked');
                }
                else { label.removeClass('checked checkedHover checkedFocus'); }
                                        
            })
            .trigger('updateState')
            .click(function(){ 
                $(this).trigger('updateState'); 
            })
            .focus(function(){ 
                label.addClass('focus'); 
                if(inputType == 'checkbox' && input.is(':checked')){ 
                    $(this).addClass('checkedFocus'); 
                } 
            })
            .blur(function(){ label.removeClass('focus checkedFocus'); });
        }
    });
};

function ResetRadioButtons()
	{
		$("input:radio").attr("checked", false);
		$("#rbt1").attr('checked', true);
		$('input').customInput();
	}

