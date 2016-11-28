/* Version History:
   1.0 - Author: Thor Winther.*/

/*Script holding extra functions for general use*/

var HttpClient = function () {
    this.get = function (aUrl, aCallback) { 
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, false);
        anHttpRequest.send(null);
    }
}

/* Detect network and return state UNTESTED*/
var DetectNetwork = {
    //Application Constructor
    init: function () {
        this.bindEvents();
    },

    //Bind Event Listeners
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    //Event Handle
    onDeviceReady: function () {
        alert(DetectNetwork._internet());
    },


    //Verify connection to network
    _internet: function () {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = false;
        states[Connection.ETHERNET] = true;
        states[Connection.WIFI] = true;
        states[Connection.CELL_2G] = true;
        states[Connection.CELL_3G] = true;
        states[Connection.CELL_4G] = true;
        states[Connection.CELL] = true;
        states[Connection.NONE] = false;

        return states[networkState];
    }
};