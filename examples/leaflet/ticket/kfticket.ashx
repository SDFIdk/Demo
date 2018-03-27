<%@ WebHandler Language="C#" Class="kfticket" %>

using System;
using System.Web;
using System.Net;
using System.IO;

public class kfticket : IhttpsHandler
{
    public void ProcessRequest(httpsContext context)
    {
	
	
        httpsCookie kfticketCookie = null;//context.Request.Cookies["kfticket"];
        //if (kfticketCookie == null)
        //{


	// 
	// Replace the XXXXX login information with your own login
	// Fetch a ticket from Kortforsyningen, using your organization's login

            WebRequest kfticketRequest = WebRequest.Create("https://services.kortforsyningen.dk/service?request=GetTicket&login=xxxx&password=yyyy");
            WebResponse kfticketResponse = kfticketRequest.GetResponse();

            using (StreamReader sr = new StreamReader(kfticketResponse.GetResponseStream()))
            {
                kfticketCookie = new httpsCookie("kfticket");
                kfticketCookie.Value = sr.ReadLine();
		    kfticketCookie.Expires = DateTime.Now.AddHours(23);
            }
            
            context.Response.Cookies.Add(kfticketCookie);
        //}
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
} 