# import os for access to the system shell
# import re for regular expressions, to clean up the cmd input string, this is because the compilar.jar doesnt handle newlines in the flags
# import sys for future command line arguments
import os, re, sys

def main(argv):
    # multiline string for read-ability,
    # to add a new file to the build, use the --js flag and a relative (not absolute) path!!!
    # please keep them in an order that reflects the class tree.
    cmd = """java -jar compiler.jar
        --js=../lib/VisStedet.js
        --js=../lib/VisStedet/Utils.js
        --js=../lib/VisStedet/Search.js
        --js=../lib/VisStedet/Search/GeoKey.js
        --js=../lib/VisStedet/Search/GeoKey/Address.js
        --js=../lib/VisStedet/Search/GeoKey/Cadastre.js
        --js=../lib/VisStedet/Search/SpatialAddress.js
        --js=../lib/VisStedet/Search/SpatialMap.js
        --js=../lib/VisStedet/Ticket.js
        --js_output_file=VisStedet.js"""
    
    # compile our regular expression
    pat = re.compile(r"[\r\n]+")
    
    # clean up the cmd input
    cmd = pat.sub("", cmd)
    
    # print for pleasure
    print(cmd)
    
    # execute the cmd
    os.system(cmd)

if __name__ == "__main__":
    main(sys.argv[1:])
