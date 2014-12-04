#-------------------------------------------------------------------------------
# Name:         Get_Matr_zip_from_Atomfeed
# Purpose:      Henter matrikelopdateringer fra kortforsyningens atomfeed til en
#               forudbestemt mappe.
#
#               FÃ¸rste gang scriptet kÃ¸rer opretter den mappen "Til_Opdatering"
#               og tekstfilen MatrikelDownload.log.
#               MatrikelDownload.log bruges til at undersÃ¸ge hvornÃ¥r scriptet sidst
#               er kÃ¸rt, for at se om matrikelopdateringen er nyere. Derfor vil
#               scriptet ikke hente nogen opdateringer fÃ¸rste gang det bliver kÃ¸rt.
#
#               for at sciptet kan kÃ¸rer skal du installere python http://www.python.org
#               DernÃ¦st skal du udfylde brugnavn og password til kortforsyningen,
#               samt listen med ejerlav der skal opdateres.
#
# Author:      Sebastian Mariendal Kristensen, Vejle Kommune - semkr@vejle.dk
#
# Created:     10-09-2013
# Copyright:   (c) semkr 2013
#
# Update        13-11-2014: Det er tidsstemplet pÃ¥ filen MatrikelDownload.log der sammenlignes med vÃ¦rdien
#               af updated i RSS feeded. Til aftestning af dette script kan du med fordel anvende
#               vedlagte python script Set_log_modifydate.py til at tilbagedatere tidsstemplet pÃ¥
#               MatrikelDownload mhp at fremprovokere en download. Datoen kan Ã¦ndres - er default sat
#               til '2014-08-24 18:00:00'
# Update        03-12-2014: Oprindeligt udviklet til GML formattet. Denne version et tilpasset til at hente matrikeldata i Shape formattet.
#               Til MapInfo brugere findes scriptet Get_MAPINFO_Matr_zip_from_Atomfeed_GST.py   
# Author:       Poul Toft Laustsen, Geodatastyrelsen - potla@gst.dk
#-------------------------------------------------------------------------------
import urllib
import xml.etree.ElementTree as ET
import datetime
import os
import ftplib
import traceback, sys
#Ejerlav = ['Landsejerlavnr1','Landsejerlavnr2','Landsejerlavnr3'] # Skriv de landsejerlav nr der skal opdateres
Ejerlav = ['1211152','1181254','1181851','1181551','1181351','1180351','1180158','1180751','1181657','1180356','1181253','1211254','1210952','1211151',
'1180752','1180851','2008755','2008761','1200551','1200555','1200556','1201051','1210651','1211051','1211053','1211252','1211258']
init_folder =  os.path.dirname(os.path.realpath(__file__)) # finder mappen hvor dette script er placeret
Output_folder =  init_folder + os.sep + "Til_Opdatering" # mappe hvor zipfiler downloades til
logfil = init_folder + os.sep + "MatrikelDownload.log" # logfil bruges ogs? til at se hvorn?r scriptet sidst har downloadet en zipfil
Brugernavn = "Brugernavn" # brugernavn til kortforsyningen
Password = "Password"  #password til kortforsyningen

def read_Lastupdate(filepath):# hvornÃ¥r er logfilen sidst opdateret
	return datetime.datetime.fromtimestamp(os.path.getmtime(filepath))

def skriv_log(filepath, tekst):# opdatere logfil
    f = open(filepath, 'a')
    f.writelines(tekst)
    f.close

def hent_matr_zipfiler(ejerlav,Outputfolder, lastupdate):
    try:
        ftp = ftplib.FTP('ftp.kortforsyningen.dk', Brugernavn, Password)
        ftp.cwd('atomfeeds/MATRIKELKORT/ATOM/SHAPE')
        tree=ET.parse(urllib.urlopen("http://download.kortforsyningen.dk/sites/default/files/feeds/MATRIKELKORT_SHAPE.xml"))
        entries = tree.findall('{http://www.w3.org/2005/Atom}entry')
        for node in entries:
             id = node.find('{http://www.w3.org/2005/Atom}id')
             updated =node.find('{http://www.w3.org/2005/Atom}updated')
             zipurl = id.text
             dato=datetime.datetime.strptime(updated.text, "%Y-%m-%dT%H:%M:%S+01:00" )
             Ejerlavnr = zipurl[zipurl.find("SHAPE")+6:len(zipurl)-24]
             if Ejerlavnr in ejerlav:
                if dato  > lastupdate:
                   filename = Ejerlavnr + "_SHAPE_UTM32-EUREF89.zip"
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
    if not os.path.isfile(logfil):
        file = open(logfil, 'w+')
		#file.close
    Lastupdate =read_Lastupdate(logfil) # Tjekker dato for hvornÃ¥r logfil sidst er opdateret
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