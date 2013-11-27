<%@ WebHandler Language="C#" Class="Proxy" %>
using System;
using System.Configuration;
using System.Web;
using System.Net;
using System.IO;

/// <summary>
/// An http proxy class. 
/// Used for cross-domain requesting by OpenLayers
/// </summary>
public class Proxy : IHttpHandler
{

	/// <summary>
	/// Implements IHttpHandler.ProcessRequest
	/// 
	/// Method that processes the incoming request.
	/// </summary>  
	/// <param name="context">The HttpContext of the request</param>
	public void ProcessRequest(HttpContext context)
	{
		// Get the Url
		string url = (context.Request.QueryString["url"] != null) ? context.Request.QueryString["url"]: context.Request.Form["url"];

		if (!context.Request.Url.Authority.ToLower().Contains("http"))
		{
			bool isValidHost = true;

            if (!string.IsNullOrEmpty(url))
            {
                if (isValidHost)
                {

                    try
                    {
                        WebRequest request = WebRequest.Create(url);
                        request.Credentials = CredentialCache.DefaultCredentials;
                        request.Method = context.Request.RequestType;

                        // If the body of the incoming request contains data write it to the stream of the proxy-request
                        if (context.Request.ContentLength > 0)
                        {
                            byte[] buffer = new byte[context.Request.InputStream.Length];
                            context.Request.InputStream.Read(buffer, 0, buffer.Length);
                            Stream reqstr = request.GetRequestStream();
                            reqstr.Write(buffer, 0, buffer.Length);
                            reqstr.Close();
                        }

                        // Get the response and content-type
                        WebResponse response = request.GetResponse();
                        Stream stream = response.GetResponseStream();
                       
                        // "TEXT" proxy
                        // Always read and write stream as UTF-8, i.e. the external WFS/WMS services must use UTF-8 encoding
                        context.Response.ContentType = response.ContentType.Replace("iso-8859-1", "utf-8");
                        context.Response.Charset = "UTF-8";
                        context.Response.ContentEncoding = System.Text.Encoding.GetEncoding(context.Response.Charset);

                        // Open the stream using a StreamReader and read the for easy access.
                        StreamReader reader = new StreamReader(stream, context.Response.ContentEncoding);

                        string responseFromServer = reader.ReadToEnd();
                        reader.Close();
                        // Write the response to the original request
                        context.Response.Write(responseFromServer);

                        context.Response.Flush();


                        stream.Close();
                        response.Close();
                    }
                    catch (WebException)
                    {
                        // In case of a web exception the server error (code=500) is returned.
                        context.Response.StatusCode = 500;
                        return;
                    }                 
                }
                else
                {
                    context.Response.StatusCode = 403;
                }
            }
            else
            {
                context.Response.StatusCode = 404;
            }
		}
	}

	/// <summary>
	/// Implements IHttpHandler.IsReusable
	/// Returns false
	/// </summary>
	public bool IsReusable
	{
		get
		{
			return false;
		}
	}

}