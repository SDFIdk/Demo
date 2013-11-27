import os

# Either add NaturalDocs installation directory to your PATH environment variable
# or change variable to point to NaturalDocs.bat in the installation directory
NaturalDocs = "NaturalDocs"

cmd = "%s -i ../lib/VisStedet -o HTML ../doc/api -p ../doc/api_config" % NaturalDocs

print(cmd)

os.system(cmd)