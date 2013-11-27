<%@ WebHandler Language="C#" Class="aws" %>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml;
using System.Xml.Linq;

public class aws : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string callback = context.Request["callback"];
        string addressInput = context.Request["searchstring"];

        string street;
        string housenumber;
        string postcode;
        string postaldistrict;

        string json = "";

        if (ParseAddressInput(addressInput, out street, out housenumber, out postcode, out postaldistrict))
        {
            string url = "http://aws.hvm.dk/FindAddressService/FindAddressService.asmx";
            string soapXml = String.Format(findAddressAccessRequest, street, housenumber, postcode, postaldistrict);
            string soapAction = "http://aws.oio.dk/aws/webservice/3/FindAddressAccess";

            try
            {
                XDocument soapResponse = IssueSoapRequest(url, soapXml, soapAction);

                json = FindAddressAccessResponseToJson(IssueSoapRequest(url, soapXml, soapAction));
            }
            catch (Exception ex)
            {
                json = @"{message:""Unable to call FindAddressAccess"",status:""ERROR""}";
            }
        }
        else
        {
            json = @"{message:""Unable to parse searchstring. Must contain streetname and housenumber as a minimum."",status:""ERROR""}";
        }
        
        if (!String.IsNullOrEmpty(callback))
        {
            json = String.Format("{0}({1});", callback, json);
        }
        
        context.Response.ContentType = "text/javascript";
        context.Response.Write(json);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    
    private bool ParseAddressInput(string addressInput, out string street, out string housenumber, out string postcode, out string postaldistrict)
    {
        street = null;
        housenumber = null;
        postcode = null;
        postaldistrict = null;

        if (String.IsNullOrEmpty(addressInput))
        {
            return false;
        }

        string[] splitAddressInput = Regex.Split(addressInput, @",?\s?(\d+[a-zA-Z]{0,1}),?\s?(\d+)?,?\s?");

        street = splitAddressInput[0];
        housenumber = (splitAddressInput.Length > 1) ? splitAddressInput[1] : "";
        postcode = (splitAddressInput.Length > 2) ? splitAddressInput[2] : "";
        postaldistrict = (splitAddressInput.Length > 3) ? splitAddressInput[3] : "";

        int num;

        if (int.TryParse(postaldistrict, out num) && !int.TryParse(postcode, out num))
        {
            postcode = postaldistrict;
            postaldistrict = "";
        }
        else if (!int.TryParse(postcode, out num) && String.IsNullOrEmpty(postaldistrict))
        {
            postaldistrict = postcode;
            postcode = "";
        }

        return true;
    }

    private XDocument IssueSoapRequest(string url, string soapEnvelopeXml, string soapAction)
    {
        HttpWebRequest req = WebRequest.Create(url) as HttpWebRequest;
        req.Headers.Add("SOAPAction", String.Format(@"{0}", soapAction));
        req.ContentType = "text/xml; charset=utf-8";
        req.Accept = "text/xml";
        req.Method = "POST";

        XDocument soapEnvelopeXmlDoc = XDocument.Parse(soapEnvelopeXml);
        using (Stream stm = req.GetRequestStream())
        {
            using (XmlWriter xw = XmlWriter.Create(stm))
            {
                soapEnvelopeXmlDoc.Save(xw);
            }
        }

        WebResponse resp = req.GetResponse();

        using (Stream respStream = resp.GetResponseStream())
        {
            StreamReader respReader = new StreamReader(respStream);
            return XDocument.Parse(respReader.ReadToEnd());
        }
    }

    private static string FindAddressAccessResponseToJson(XDocument soapResponse)
    {
        var searchResults = soapResponse.Descendants("SearchResult");

        string json = @"{data:[";

        List<string> jsonDataItems = new List<string>();

        foreach (var item in searchResults)
        {
            var postal = item.Descendants().Single(x => x.Name.LocalName == "AddressPostal");
            var point = item.Descendants().Single(x => x.Name.LocalName == "AddressPoint");

            string streetname = postal.Descendants().Single(x => x.Name.LocalName == "StreetName").Value;
            string housenumber = postal.Descendants().Single(x => x.Name.LocalName == "StreetBuildingIdentifier").Value;
            string postcode = postal.Descendants().Single(x => x.Name.LocalName == "PostCodeIdentifier").Value;
            string postaldistrict = postal.Descendants().Single(x => x.Name.LocalName == "DistrictName").Value;
            string easting = point.Descendants().Single(x => x.Name.LocalName == "GeographicEastingMeasure").Value;
            string northing = point.Descendants().Single(x => x.Name.LocalName == "GeographicNorthingMeasure").Value;

            string jsonDataItem = "{";
            jsonDataItem += String.Format(@"""presentationString"":""{0} {1}, {2} {3}"",",
                streetname, housenumber, postcode, postaldistrict);
            jsonDataItem += String.Format(@"""x"":{0},", easting);
            jsonDataItem += String.Format(@"""y"":{0}", northing);
            jsonDataItem += "}";
            jsonDataItems.Add(jsonDataItem);
        }

        json += String.Join(",", jsonDataItems.ToArray());

        json += String.Format(@"],message:""OK"",numHits:{0},status:""OK""", searchResults.Count()) + "}";

        return json;
    }

    const string findAddressAccessRequest = @"<?xml version=""1.0"" encoding=""utf-8""?>
<soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
  <soap:Body>
    <FindAddressAccessRequest xmlns=""http://rep.oio.dk/aws.dk/xml/schemas/2008/04/01/"">
      <RequestOptionCollection>
        <RequestOption name=""includeAddressPostal"">true</RequestOption>
        <RequestOption name=""includeAddressPoint"">true</RequestOption>
      </RequestOptionCollection>
      <AddressAccessSearch xmlns="""">
        <NamedStreetInput>{0}</NamedStreetInput>
        <MaxMatchLevel>0</MaxMatchLevel>
        <StreetBuildingIdentifierInput>{1}</StreetBuildingIdentifierInput>
        <StreetBuildingMaxJustification>0</StreetBuildingMaxJustification>
      </AddressAccessSearch>
      <PostalDistrictSearchCollection>
        <PostalDistrictSearch xmlns="""">
		  <DistrictNameInput>{3}</DistrictNameInput>
          <NeighbourLevel>0</NeighbourLevel>
        </PostalDistrictSearch>
        <PostalDistrictSearch xmlns="""">
		  <PostCodeIdentifierInput>{2}</PostCodeIdentifierInput>
          <NeighbourLevel>0</NeighbourLevel>
        </PostalDistrictSearch>
      </PostalDistrictSearchCollection>
    </FindAddressAccessRequest>
  </soap:Body>
</soap:Envelope>";
} 