# C:\Users\ekr53\AppData\Local\Programs\Python\Python35-32\python.exe O:\GIS_Schedule\Get_SHAPE_Matr_zip_from_Atomfeed_GST.py
# C:\Python27\python.exe E:\GIS_Schedule\Get_SHAPE_Matr_zip_from_Atomfeed_GST.py
#
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
# Update        03-12-2014: Oprindeligt udviklet til GML formattet. Denne version et tilpasset til at hente matrikeldata i Shape formattet.
#               Til MapInfo brugere findes scriptet Get_MAPINFO_Matr_zip_from_Atomfeed_GST.py   
# Author:       Poul Toft Laustsen, Geodatastyrelsen - potla@gst.dk
# Update        29-11-2016: Opdateret til afvikling under Python 3 og senere
# Author:		Erling T.L.Kristensen, Helsingør Kommune - ekr53@helsingor.dk
#-------------------------------------------------------------------------------
import urllib.request
import xml.etree.ElementTree as ET
import datetime
import os
import ftplib
import traceback, sys
#Ejerlav = ['Landsejerlavnr1','Landsejerlavnr2','Landsejerlavnr3'] # Skriv de landsejerlav nr der skal opdateres
Ejerlav = ['120251','120252','120253','120254','120255','120256','120257','120451','120452','120453','120454','120455','120456','120457',
'120458','120459','120460','120551','120552','120553','120554','120555','120556','120557','120558','120559','120560','120561','120562',
'120651','120652','120653','120654','120655','120656','120657','120658','120659','120660','120661','120662','120663','120664','120664',
'120666','120667','120668','120669','120670','120671','120672','120673','120674','120675','120676','120677','120678','120679','120851',
'120852','120853','120854','120855','2000651','2000652','2000653','2000654','2000655','2000656','2000657','2000658','2000659','2000660']
init_folder =  os.path.dirname(os.path.realpath(__file__)) # finder mappen hvor dette script er placeret
Output_folder =  init_folder + os.sep + "Til_Opdatering" # mappe hvor zipfiler downloades til
logfil = init_folder + os.sep + "MatrikelDownload.log" # logfil bruges ogs? til at se hvorn?r scriptet sidst har downloadet en zipfil
Brugernavn = "brugernavn" #brugernavn til kortforsyningen
Password = "password"  #password til kortforsyningen

def read_Lastupdate(filepath):# hvornår er logfilen sidst opdateret
	return datetime.datetime.fromtimestamp(os.path.getmtime(filepath))

def skriv_log(filepath, tekst):# opdatere logfil
    f = open(filepath, 'a')
    f.writelines(tekst)
    f.close

def hent_matr_zipfiler(ejerlav,Outputfolder, lastupdate):
    try:
        ftp = ftplib.FTP('ftp.kortforsyningen.dk', Brugernavn, Password)
        ftp.cwd('atomfeeds/MATRIKELKORT/ATOM/SHAPE')
        tree=ET.parse(urllib.request.urlopen("http://download.kortforsyningen.dk/sites/default/files/feeds/MATRIKELKORT_SHAPE.xml"))
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
        print (tbinfo + "\n" + str(sys.exc_type)+ ": " + str(sys.exc_value))

try:
    if not os.path.isfile(logfil):
        file = open(logfil, 'w+')
		#file.close
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
    print (pymsg)