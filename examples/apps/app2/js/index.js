var slider;
var currentindex = 0;
var numberOfLayers = 0;
$(document).ready(function () {
	
	var e = jQuery('#slider ul');
	var bulletContainer = jQuery('#position');
	
	var i = 0;
	for (var name in VisStedet.App.LAYERS) {
		//Add images to DOM
		var img = jQuery('<li id="'+name+'" class="catalog" style=""><div class="slideelement"><img src="'+VisStedet.App.LAYERS[name].largeImg+'"/><h2>'+VisStedet.App.LAYERS[name].title+'</h2><p>'+VisStedet.App.LAYERS[name].text+'</p></div></li>');
		e.append(img);
		
		//Add bullets to DOM
		var bullet = jQuery('<div class="bullet"></div>');
		bullet.click({index: i},function (event) {
			setFocus(event.data.index);
		});
		bulletContainer.append(bullet);
		i++;
	}
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
    
    jQuery("li.catalog").click(function (){
			
		url = "map.html?layer="+this.id; 
		window.location.replace(url);
	})
	
    jQuery("#slider ul").css({
			'margin-left':'50px'
    })
    
     jQuery(".slideelement").css({
			'min-height':'260px'
    })
});

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

})();
