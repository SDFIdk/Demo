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
VisStedet.Ticket = VisStedet.Utils.Class ({

    /**
     * Property: ticket
     * {String} Unique user ticket
     */
    ticket: null,
    
    /**
     * APIProperty: cookieName
     * {String} The name of the cookie set on server. Default is "kfticket".
     */
    cookieName: 'kfticket',
    
    /**
     * Constructor: VisStedet.Ticket
     * Constructor for a new VisStedet.Ticket instance. There are two possible
     *     ways to call the map constructor.  See the examples below.
     *
     * Parameters:
     * options - {Object} Optional object with properties to add to the VisStedet.Ticket instance.
     *
     * Examples:
     * (code)
     * // Get a ticket to the client
     * var ticket = new VisStedet.Ticket ();
     *
     * // Get a ticket to the client using a custom cookie name
     * var ticket = new VisStedet.Ticket ({cookieName: 'MyCookieName'});
     * (end)
     */    
    initialize: function (options) {
        VisStedet.Utils.extend (this,options);
        this.loadTicket ();
    },
    
    /**
     * Method: loadTicket
     * Read the cookie and set this.ticket.
     */
    loadTicket: function () {
        var cookie = document.cookie.match(new RegExp('(?:^|; | )' + escape(this.cookieName) + '=([^;\\s]*)'));
        this.ticket = (cookie ? unescape(cookie[1]) : null);
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