/* Copyright (c) */
if(typeof VisStedet=='undefined') {
    window.VisStedet = {};
}

/** 
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Lang.js
 * @requires OpenLayers/Console.js
 * @requires OpenLayers/Events/buttonclick.js
 */

/**
 * Class: VisStedet.LayerSwitcher
 * The LayerSwitcher control displays an image for each basemap. This 
 * allows the user interface to toggle between BaseLasyers.
 *
 * Each baselayer have to have a img property with the path to an image. The
 * best result is when the images have the same size.
 *
 * To create the LayerSwitcher outside of the map, pass the Id of a html div 
 * as the first argument to the constructor.
 * 
 * Based on OpenLayers 2.12
 * 
 * Inherits from:
 *  - <OpenLayers.Control>
 */
VisStedet.LayerSwitcher = OpenLayers.Class(OpenLayers.Control, {

    /**  
     * Property: layerStates 
     * {Array(Object)} Basically a copy of the "state" of the map's layers 
     *     the last time the control was drawn. We have this in order to avoid
     *     unnecessarily redrawing the control.
     */
    layerStates: null,
    

  // DOM Elements
  
    /** 
     * Property: baseLayersDiv
     * {DOMElement}
     */
    baseLayersDiv: null,

    /** 
     * Property: baseLayers
     * {Array(Object)}
     */
    baseLayers: null,
    
    /** 
     * Property: layers
     * {Array(Object)}
     */
    layers: null,
    
    /**
     * Constructor: OpenLayers.Control.VisStedetLayerSwitcher
     * 
     * Parameters:
     * options - {Object}
     */
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.layerStates = [];
    },

    /**
     * APIMethod: destroy 
     */    
    destroy: function() {
        
        //clear out layers info and unregister their events 
        this.clearLayersArray("base");
        
        this.map.events.un({
            buttonclick: this.onButtonClick,
            addlayer: this.redraw,
            changelayer: this.redraw,
            removelayer: this.redraw,
            changebaselayer: this.redraw,
            scope: this
        });
        this.events.unregister("buttonclick", this, this.onButtonClick);
        
        OpenLayers.Control.prototype.destroy.apply(this, arguments);
    },

    /** 
     * Method: setMap
     *
     * Properties:
     * map - {<OpenLayers.Map>} 
     */
    setMap: function(map) {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);

        this.map.events.on({
            addlayer: this.redraw,
            changelayer: this.redraw,
            removelayer: this.redraw,
            changebaselayer: this.redraw,
            scope: this
        });
        if (this.outsideViewport) {
            this.events.attachToElement(this.div);
            this.events.register("buttonclick", this, this.onButtonClick);
        } else {
            this.map.events.register("buttonclick", this, this.onButtonClick);
        }
    },

    /**
     * Method: draw
     *
     * Returns:
     * {DOMElement} A reference to the DIV DOMElement containing the 
     *     switcher tabs.
     */  
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this);

        // create layout divs
        this.loadContents();

        // populate div with current info
        this.redraw();    

        return this.div;
    },

    /**
     * Method: onButtonClick
     *
     * Parameters:
     * evt - {Event}
     */
    onButtonClick: function(evt) {
        var button = evt.buttonElement;
        if (button._layerSwitcher === this.id) {
            if (button["for"]) {
                button = document.getElementById(button["for"]);
            }
            if (!button.disabled) {
                this.map.setBaseLayer(this.map.getLayer(button._layer));
                
                var buttonNumber = null;
                for (var i=0; i<this.baseLayers.length;i++) {
                    this.baseLayers[i].imgElem.style.display = "none";
                	if (button.id == this.baseLayers[i].imgElem.id) {
                		buttonNumber = i;
                	}
                }
                if (buttonNumber == this.baseLayers.length-1) {
                	buttonNumber = -1;
                }
                this.baseLayers[buttonNumber+1].imgElem.style.display = "";
            }
        }
    },

    /** 
     * Method: clearLayersArray
     * User specifies "base". we then clear all the
     *     corresponding listeners, the div, and reinitialize a new array.
     * 
     * Parameters:
     * layersType - {String}  
     */
    clearLayersArray: function(layersType) {
        this[layersType + "LayersDiv"].innerHTML = "";
        this[layersType + "Layers"] = [];
    },


    /**
     * Method: checkRedraw
     * Checks if the layer state has changed since the last redraw() call.
     * 
     * Returns:
     * {Boolean} The layer state changed since the last redraw() call. 
     */
    checkRedraw: function() {
        var redraw = false;
        if ( !this.layerStates.length ||
             (this.layers.length != this.layerStates.length) ) {
            redraw = true;
        } else {
            for (var i=0, len=this.layerStates.length; i<len; i++) {
                var layerState = this.layerStates[i];
                var layer = this.layers[i];
                if ( (layerState.name != layer.name) || 
                     (layerState.inRange != layer.inRange) || 
                     (layerState.id != layer.id) || 
                     (layerState.visibility != layer.visibility) ) {
                    redraw = true;
                    break;
                }    
            }
        }    
        return redraw;
    },
    
    /** 
     * Method: redraw
     * Goes through and takes the current state of the Map and rebuilds the
     *     control to display that state. Groups base layers into a 
     *     radio-button group and lists each data layer with a checkbox.
     *
     * Returns: 
     * {DOMElement} A reference to the DIV DOMElement containing the control
     */  
    redraw: function() {
        //if the state hasn't changed since last redraw, no need 
        // to do anything. Just return the existing div.
        if (!this.checkRedraw()) { 
            return this.div; 
        } 

        //clear out previous layers 
        this.clearLayersArray("base");
        
        var containsOverlays = false;
        var containsBaseLayers = false;
        
        // Save state -- for checking layer if the map state changed.
        // We save this before redrawing, because in the process of redrawing
        // we will trigger more visibility changes, and we want to not redraw
        // and enter an infinite loop.
        var len = this.map.layers.length;
        var layers = this.map.layers;
        if (this.layers) {
        	len = this.layers.length;
        	layers = this.layers;
        }
        
        this.layerStates = new Array(len);
        for (var i=0; i <len; i++) {
            var layer = layers[i];
            this.layerStates[i] = {
                'name': layer.name, 
                'visibility': layer.visibility,
                'inRange': layer.inRange,
                'id': layer.id
            };
        }    

        var layers = layers.slice();
        var visibleNumber = null;
        for(var i=0, len=layers.length; i<len; i++) {
            var layer = layers[i];
            var baseLayer = layer.isBaseLayer;

            if (layer.displayInLayerSwitcher && layer.isBaseLayer) {

                if (baseLayer) {
                    containsBaseLayers = true;
                } else {
                    containsOverlays = true;
                }    

                if (layer.isBaseLayer && layer.getVisibility()) {
                	visibleNumber = i;
                }
                // create input element
                var imgElem = null;
                if (layer.img) {
                	imgElem = document.createElement("img");
	                imgElem.src = layer.img;
	                imgElem.id = this.id + "_input_" + layer.name;
	                imgElem.name = (baseLayer) ? this.id + "_baseLayers" : layer.name;
	                imgElem.title = layer.name;
	                imgElem.className = "olButton";
	                imgElem._layer = layer.id;
	                imgElem._layerSwitcher = this.id;
                }

                this.baseLayers.push({
                    'layer': layer,
                    'imgElem': imgElem
                });
    
                this.baseLayersDiv.appendChild(imgElem);
            	
            	imgElem.style.display = visibleNumber === i-1 ? "" : "none";
            }
        }

        return this.div;
    },

    /** 
     * Method: loadContents
     * Set up the labels and divs for the control
     */
    loadContents: function() {

        // layers list div        
        this.layersDiv = document.createElement("div");
        this.layersDiv.id = this.id + "_layersDiv";
        OpenLayers.Element.addClass(this.layersDiv, "layersDiv");

        this.baseLbl = document.createElement("div");
        this.baseLbl.innerHTML = '';
        OpenLayers.Element.addClass(this.baseLbl, "baseLbl");
        
        this.baseLayersDiv = document.createElement("div");
        OpenLayers.Element.addClass(this.baseLayersDiv, "baseLayersDiv");

        this.layersDiv.appendChild(this.baseLayersDiv);
 
        this.div.appendChild(this.layersDiv);

    },
    
    CLASS_NAME: "VisStedet.LayerSwitcher"
});
