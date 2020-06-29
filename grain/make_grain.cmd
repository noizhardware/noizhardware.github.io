nativefier --name "grain" --platform windows --icon "grain.ico" --app-copyright "noizHARDWARE" --verbose --disable-context-menu --disable-dev-tools --clear-cache --insecure --ignore-certificate index.html && cp grain_orange.png ./grain-win32-x64/grain_orange.png && cp grain.css ./grain-win32-x64/grain.css && cp grain.js ./grain-win32-x64/grain.js && cp grain.png ./grain-win32-x64/grain.png && cp index.html ./grain-win32-x64/index.html && cp nopull.css ./grain-win32-x64/nopull.css && cp nativefier.json ./grain-win32-x64/resources/app/nativefier.json && PAUSE


REM * run the present "make_grain.cmd", it will package the app from a bogus url
REM * Navigate to the folder that was created and copy all your site-files into the base directory (so they are at the same level as grain.exe)
REM * Navigate to resources\app\nativefier.json
REM   - Change the targetURL to "targetUrl":"file:///index.html"
REM * now it will successfully run offline!