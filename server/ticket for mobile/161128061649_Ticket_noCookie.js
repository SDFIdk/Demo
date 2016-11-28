/* Copyright (c) */

/**
 * @requires VisStedet/Utils.js
 */

/**
 * Class: VisStedet.Ticket
 * Instances of VisStedet.Ticket gets a ticket that can be used for relevant server requests
 * to validate the user.
 * Get a new ticket with the <VisStedet.Ticket> constructor.
 * 
 * To use a ticket (<VisStedet.Ticket>) you probably need some kind of a server component
 * to create the actual ticket string. For this purpose you can use the examples 
 * provided with this API. Read more on http://visstedet.kortforsyningen.dk. 
 */

/* Version History:
   1.0 - Original version: kortforsyningen.dk githut repository
   2.0 - Author: Thor Winther. Modified version that uses Localstorage instead of cookies*/

VisStedet.Ticket = VisStedet.Utils.Class({

    /**
     * Property: ticket
     * {String} Unique user ticket
     */
    ticket: null,

    /**
     * APIProperty: cookieName
     * {String} The name of the cookie set on server. Default is "
     ".
     */
    storageKey: 'kfticket',

    /**
     * Constructor: VisStedet.Ticket
     * Constructor for a new VisStedet.Ticket instance.
     *
     * Parameters:
     * options - {Object} Optional object with properties to add to the VisStedet.Ticket instance.
     *
     * Examples:
     * (code)
     * // Get a ticket to the client
     * var ticket = new VisStedet.Ticket ();
     *
     */
    initialize: function (options) {
        console.log("new VisStedet.ticket created");
        VisStedet.Utils.extend(this, options);
        this.loadTicket();
    },

    /**
     * Method: loadTicket
     * Read the cookie and set this.ticket.
     */
    loadTicket: function () {
        //getTicket(); //create new ticket
        this.ticket = window.localStorage.getItem(this.storageKey); //load the ticket from storage
        console.log("Ticket.nocookie: checking localstorage: " + window.localStorage.getItem("kfticket"));
        console.log("Ticket.nocookie: checking ticket: " + this.ticket);
    },

    /**
    * APIMethod: toString
    * Get a string representation of the ticket.
    * 
    * Returns:
    * {String} The ticket as a string.
    */
    toString: function () {
        return this.ticket;
    },

    CLASS_NAME: 'VisStedet.Ticket'
});