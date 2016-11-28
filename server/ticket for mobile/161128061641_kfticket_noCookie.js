
/* Version History:
   1.0 - Author: Thor Winther.*/

/*Script to load a ticket from KortForsyningen.dk when run
/*It is saved in localstorage rather than as a cookie*/

var login = "xxxx";
var pwd = "yyyy";

window.onload = getTicket();

/*
This function request a ticket 
*/

function getTicket() {
        var url = "https://services.kortforsyningen.dk/service?request=GetTicket";
        url += "&login=" + login;
        url += "&password=" + pwd;
        console.log("URL: " + url);

        var aClient = new HttpClient();
        aClient.get(url, function (response) {
            //console.log("RECEIVED RESP: " + response);
            parseResponse(response);
        });
}

/* This function saves the ticket in local storage 
*  since cookies don't work with Cordova
*/

function parseResponse(response) {

    //console.log("PARSING RESP: " + response);
    
    //AW: INSERT CHECK OF DEVICE TO MAKE SURE LOCALSTORAGE WORKS? OTHERWISE USE COOKIE

        window.localStorage.setItem("kfticket", response);
        console.log("Testing ticket is saved: " + window.localStorage.getItem("kfticket"));
    }