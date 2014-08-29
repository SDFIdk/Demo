set comment {
 ==============================================================================

   Navn          : Peter Laulund, KMS

   Oprettet dato : 20 maj 2014

   Beskrivelse   :

 ==============================================================================
} ; unset comment

# =============================================================================
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
set gsPath2App $::FME_MacroValues(FME_MF_DIR_UNIX)

namespace eval 7zip {
    variable navn     "TCL: rutiner til unzipning med 7zip"
    variable version  "2.0"
    variable dato     "20. maj 2014"

    set zipProg $::gsPath2App/7zip/resc/7z.exe

    FME_LogMessage fme_inform "$navn Version $version d. $dato"
}

# -----------------------------------------------------------------------------
proc 7zip::unZip {} {

     set zipName $::FME_MacroValues(tempData)
     set outDir $::gsPath2App/temp

     catch { file delete -force $outDir/MATRIKEL.gml }

     lappend cmd $::7zip::zipProg e
     lappend cmd $zipName
     lappend cmd -aoa -o$outDir *.gml -r
     lappend cmd 2> NUL:

     FME_LogMessage fme_inform $cmd

     eval exec $cmd
     file delete -force $zipName

     set url [ FME_GetAttribute LinkURI ]
     set elav [ lindex [split [lindex [file split $url ] end ] _] 0 ]
     file rename -force $outDir/$elav.gml $outDir/MATRIKEL.gml
     return

}

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# =============================================================================
