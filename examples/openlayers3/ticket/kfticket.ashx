<%@ WebHandler Language="C#" Class="kfticket" %>

using System;
using System.Web;
using System.Net;
using System.IO;

public class kfticket : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
	
	
        HttpCookie kfticketCookie = null;//context.Request.Cookies["kfticket"];
        //if (kfticketCookie == null)
        //{


	// 
	// Replace the XXXXX login information with your own login
	// Fetch a ticket from Kortforsyningen, using your organization's login

            WebRequest kfticketRequest = WebRequest.Create("http://kortforsyningen.kms.dk/service?request=GetTicket&login=VisStedet&password=VisStedet");
            WebResponse kfticketResponse = kfticketRequest.GetResponse();

            using (StreamReader sr = new StreamReader(kfticketResponse.GetResponseStream()))
            {
                kfticketCookie = new HttpCookie("kfticket");
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