<%@ page language="java"%><%@page import="java.net.*,java.io.*"%>
<%
    // Test is the cookie is already set, to avoid unnecessary contact to Kortforsyningen:
try {
    String ticket = null;
    Cookie[] cookies = request.getCookies();

//     if (cookies != null)  {
//         for (int i=0; i<cookies.length; i++) {
//             if ("kfticket".equals(cookies[i].getName())) {
//                 ticket = cookies[i].getValue();
//                 break;
//             }
//         }
//     }

    // Replace the XXXXX login information with your own login
    // Fetch a ticket from Kortforsyningen, using your organization's login

    if (ticket == null) {
        URL url = new URL(

                "https://services.kortforsyningen.dk/service?request=GetTicket&login=xxxx&password=yyyy");

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(url.openConnection()
                        .getInputStream()));
        ticket = reader.readLine();
        Cookie ticketCookie = new Cookie("kfticket", ticket);
        // Expires after 24 hours:
        ticketCookie.setMaxAge(86400);
        ticketCookie.setPath("/");
        response.addCookie(ticketCookie);
    }
    // Print out the ticket in the HTML for easier reference and debugging:
    // out.println("<!--<script>kfticket = '" + ticket + "';</script>-->");
}
catch(Exception e) {
    // Do nothing
}
%>