$("#dragUpExpandIcon").click(function () {
    $("#dragUpSlideDiv").slideDown(200, function () { 
    	
    	if (!slider) {    	
			var e = jQuery('#slider ul');
			var bulletContainer = jQuery('#position');
			
			var i = 0;
			for (var name in VisStedet.App.LAYERS) {
				
				var layer = VisStedet.App.getUrlParam ('layer');
				
				//Add images to DOM
				var lihtml = '<li id="'+name+'" class="swiper">'+
							 
						 	'<div class="slideelement">'+
						 		'<img src="'+VisStedet.App.LAYERS[name].smallImg+'"/>'+
						 		'<h3>'+VisStedet.App.LAYERS[name].title+'</h3>'+
						 	'</div>'+
				
						 '</li>';
				
				var li = jQuery(lihtml);
				e.append(li);
				
				//Add bullets to DOM
				var bullet = jQuery('<div class="bullet"></div>');
				bullet.click({index: i},function (event) {
					setFocus(event.data.index);
				});
				bulletContainer.append(bullet);
				i++;
				
				if(layer==name) {
					currentindex = i-1;
				}
			}
			
			 //* Set selected on load
			jQuery(".slideelement").removeClass("selected");
        	jQuery("#slider ul > li:eq("+ currentindex +") .slideelement").addClass("selected");
			
			numberOfLayers = i;
			
			//Add slider
		    slider = new Swipe(document.getElementById('slider'), {
		        callback: function(e, pos) {
		        	setFocus (pos);
		        }
		    });
			slider.slide(currentindex,10);
		    
		    jQuery('a#prev').click(function (){
		    	var i = currentindex-1;
		    	if (i >= 0) {
		    		slider.slide(i);
		    	}
		    })
		    jQuery('a#next').click(function (){
		    	var i = currentindex+1;
		    	if (i < numberOfLayers) {
		    		slider.slide(i);
		    	}
		    })
		    
		     jQuery("li.swiper").click(function (){		
		    	jQuery(".slideelement").removeClass("selected");
		    	jQuery(".slideelement", this).addClass("selected");
			    VisStedet.App.showLayer(this.id, currentindex);			    
			 })
			 
			 jQuery("#slider ul").css({
				 'margin-left':'50px'
			 })
			 
    	}
    });
    $("#dragUpExpandIcon").hide();
    $("#dragUpMapDisable").show();
    
    //tilføj bg på dragup
    $("#gallery").css({
    	"background-image":"url('img/bg_1024_75.png')",
    	"background-repeat":"repeat"
    });
});

$("#dragUpCollapseIcon").click(function () {
    $("#dragUpSlideDiv").slideUp(200, function () {
    });
    $("#dragUpExpandIcon").show();
    $("#dragUpMapDisable").hide();
});

$("#dragUpButtonKatalog").click(function () {
    DeSelect();
    $("#dragUpButtonKatalog").addClass("dragUpButtonSelected");
});

$("#dragUpButtonKort").click(function () {
    DeSelect();
    $("#dragUpButtonKort").addClass("dragUpButtonSelected");
});

$("#dragUpButtonOmKMS").click(function () {
    DeSelect();
    $("#dragUpButtonOmKMS").addClass("dragUpButtonSelected");
});


function DeSelect() {
    $("#dragUpButtonKatalog").removeClass("dragUpButtonSelected");
    $("#dragUpButtonKort").removeClass("dragUpButtonSelected");
    $("#dragUpButtonOmKMS").removeClass("dragUpButtonSelected");
}

function setFocus (index) {
	var bullet = jQuery('#position .bullet');
	for (var i=0;i<bullet.length;i++) {
		if (i===index) {
			jQuery(bullet[i]).addClass('on');
		} else {
			jQuery(bullet[i]).removeClass('on');
		}
	}
	currentindex = index;
	slider.slide(index);
	
}

