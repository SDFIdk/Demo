import os
import  time, datetime

ThisFolder = os.getcwd()
LastUpdate = ThisFolder + os.sep + "MatrikelDownload.log"

#                 year,month,date,hour,minute,second,
tid = time.mktime((2014, 8, 24, 18, 0, 0, 0, 0,1)) # Ret dato og tid


def modification_date(filename):
    t = os.path.getmtime(filename)
    return datetime.datetime.fromtimestamp(t)
def setmodification_date(filemane, date):
    os.utime(filemane, (date, date))

setmodification_date(LastUpdate, tid)
print modification_date(LastUpdate)

