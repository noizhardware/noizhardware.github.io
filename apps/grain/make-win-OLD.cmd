REM nativefier -n "floowSWH" -p windows "https://www.noizhardware.com/swh/index.html" && rename floowSWH-win32-x64 floowSWH && COPY "icons\grain.ico" "floowSWH\grain.ico" && COPY "rcedit-x64.exe" "floowSWH\rcedit-x64.exe" && rcedit-x64.exe floowSWH.exe --set-icon grain.ico && PAUSE

REM https://github.com/jiahaog/nativefier/blob/master/docs/api.md

REM --platform :
REM Automatically determined based on the current OS. Can be overwritten by specifying either linux, windows, osx or mas for a Mac App Store specific build.
REM The alternative values win32 (for Windows) or darwin, mac (for macOS) can also be used.

REM -i, --icon <path>
REM Packaging for Windows
REM      The icon parameter should be a path to a .ico file.
REM Packaging for Linux
REM      The icon parameter should be a path to a .png file.
REM Packaging for macOS
REM      The icon parameter can either be a .icns or a .png file if the optional dependencies are installed.

nativefier --name "grain" --platform windows --icon "grain.ico" --app-copyright "noizHARDWARE" --verbose --disable-context-menu --disable-dev-tools --clear-cache --insecure --ignore-certificate index.html && PAUSE

REM * run the present "make_grain.cmd", it will package the app from a bogus url
REM * Navigate to the folder that was created and copy all your site-files into the base directory (so they are at the same level as grain.exe)
REM * Navigate to resources\app\nativefier.json
REM   - Change the targetURL to "targetUrl":"file:///index.html"
REM * now it will successfully run offline!