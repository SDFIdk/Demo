#-------------------------------------------------------------------------------
# Name:         Get_Matr_zip_from_Atomfeed
# Purpose:      Henter matrikelopdateringer fra kortforsyningens atomfeed til en
#               forudbestemt mappe.
#
#               Første gang scriptet kører opretter den mappen "Til_Opdatering"
#               og tekstfilen MatrikelDownload.log.
#               MatrikelDownload.log bruges til at undersøge hvornår scriptet sidst
#               er kørt, for at se om matrikelopdateringen er nyere. Derfor vil
#               scriptet ikke hente nogen opdateringer første gang det bliver kørt.
#
#               for at sciptet kan kører skal du installere python http://www.python.org
#               Dernæst skal du udfylde brugnavn og password til kortforsyningen,
#               samt listen med ejerlav der skal opdateres.
#
# Author:      Sebastian Mariendal Kristensen, Vejle Kommune - semkr@vejle.dk
#
# Created:     10-09-2013
# Copyright:   (c) semkr 2013
#
# Update        13-11-2014: Det er tidsstemplet på filen MatrikelDownload.log der sammenlignes med værdien
#               af updated i RSS feeded. Til aftestning af dette script kan du med fordel anvende
#               vedlagte python script Set_log_modifydate.py til at tilbagedatere tidsstemplet på
#               MatrikelDownload mhp at fremprovokere en download. Datoen kan ændres - er default sat
#               til '2014-08-24 18:00:00'
# Author:       Poul Toft Laustsen, Geodatastyrelsen - potla@gst.dk
#-------------------------------------------------------------------------------
import urllib
import xml.etree.ElementTree as ET
import datetime
import os
import ftplib
import traceback, sys
#Ejerlav = ['Landsejerlavnr1','Landsejerlavnr2','Landsejerlavnr3'] # Skriv de landsejerlav nr der skal opdateres
Ejerlav = [ '990551','2005059' ]
init_folder =  os.path.dirname(os.path.realpath(__file__)) # finder mappen hvor dette script er placeret
Output_folder =  init_folder + os.sep + "Til_Opdatering" # mappe hvor zipfiler downloades til
logfil = init_folder + os.sep +"MatrikelDownload.log" # logfil bruges ogs? til at se hvorn?r scriptet sidst har downloadet en zipfil
Brugernavn = "Brugernavn" # brugernavn til kortforsyningen
Password = "********"  #password til kortforsyningen

def read_Lastupdate(filepath):# hvornår er logfilen sidst opdateret
	return datetime.datetime.fromtimestamp(os.path.getmtime(filepath))

def skriv_log(filepath, tekst):# opdatere logfil
    f = open(filepath, 'a')
    f.writelines(tekst)
    f.close

def hent_matr_zipfiler(ejerlav,Outputfolder, lastupdate):
    try:
        ftp = ftplib.FTP('ftp.kortforsyningen.dk', Brugernavn, Password)
        ftp.cwd('atomfeeds/MATRIKELKORT/ATOM/GML')
        tree=ET.parse(urllib.urlopen("http://download.kortforsyningen.dk/sites/default/files/feeds/MATRIKELKORT_GML.xml"))
        entries = tree.findall('{http://www.w3.org/2005/Atom}entry')
        for node in entries:
             id = node.find('{http://www.w3.org/2005/Atom}id')
             updated =node.find('{http://www.w3.org/2005/Atom}updated')
             zipurl = id.text
             dato=datetime.datetime.strptime(updated.text, "%Y-%m-%dT%H:%M:%S+01:00" )
             Ejerlavnr = zipurl[zipurl.find("GML")+4:len(zipurl)-22]
             if Ejerlavnr in ejerlav:
                if dato  > lastupdate:
                   filename = Ejerlavnr + "_GML_UTM32-EUREF89.zip"
                   file = open(Outputfolder + os.sep + filename, 'wb')
                   ftp.retrbinary('RETR %s' % filename, file.write)
                   skriv_log(logfil, "downloader ejerlav : " + Ejerlavnr + " d. " + str(dato))
                   file.close
        ftp.close
    except:
        tb = sys.exc_info()[2]
        tbinfo = traceback.format_tb(tb)[0]
        print tbinfo + "\n" + str(sys.exc_type)+ ": " + str(sys.exc_value)

try:
    Lastupdate =read_Lastupdate(logfil) # Tjekker dato for hvornår logfil sidst er opdateret
    if not os.path.exists(Output_folder): # opretter output mappen hvis den ikke findes
        os.makedirs(Output_folder)
    hent_matr_zipfiler(Ejerlav, Output_folder,Lastupdate)

except:
    # Get the traceback object
    #
    tb = sys.exc_info()[2]
    tbinfo = traceback.format_tb(tb)[0]

    # Concatenate information together concerning the error into a
    #   message string
    #
    pymsg = tbinfo + "\n" + str(sys.exc_type)+ ": " + str(sys.exc_value)


    #
    print pymsg