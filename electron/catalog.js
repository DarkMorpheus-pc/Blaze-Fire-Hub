/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Main process katalog allowlist
// Renderer sadece appId gönderir; url/pkgName/flatpakId/launchCmd gibi
// tüm kurulum detayları burada, main process içinde sabit tutulur.

const APP_CATALOG = {
  // === WEB BROWSERS ===
  "firefox": {
    "name": "Firefox",
    "detect": { "linux": "firefox", "flatpakId": "org.mozilla.firefox", "windows": "firefox", "windowsPaths": ["%ProgramFiles%\\Mozilla Firefox\\firefox.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "firefox" },
      "pisi": { "type": "pkg", "value": "firefox" },
      "debian": { "type": "pkg", "value": "firefox" },
      "windows": { "type": "url", "value": "https://download.mozilla.org/?product=firefox-latest&os=win64&lang=en-US", "ext": ".exe" }
    }
  },
  "brave": {
    "name": "Brave Browser",
    "detect": { "linux": "brave-browser", "flatpakId": "com.brave.Browser", "windows": "brave", "windowsPaths": ["%ProgramFiles%\\BraveSoftware\\Brave-Browser\\Application\\brave.exe", "%LOCALAPPDATA%\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.brave.Browser" },
      "pisi": { "type": "flatpak", "value": "com.brave.Browser" },
      "debian": { "type": "flatpak", "value": "com.brave.Browser" },
      "windows": { "type": "url", "value": "https://laptop-updates.brave.com/latest/winx64", "ext": ".exe" }
    }
  },
  "chromium": {
    "name": "Chromium",
    "detect": { "linux": "chromium-browser", "flatpakId": "org.chromium.Chromium", "windows": "chrome", "windowsPaths": ["%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "chromium" },
      "pisi": { "type": "flatpak", "value": "org.chromium.Chromium" },
      "debian": { "type": "pkg", "value": "chromium-browser" },
      "windows": null
    }
  },
  "vivaldi": {
    "name": "Vivaldi Browser",
    "detect": { "linux": "vivaldi", "flatpakId": "com.vivaldi.Vivaldi", "windows": "vivaldi", "windowsPaths": ["%LOCALAPPDATA%\\Vivaldi\\Application\\vivaldi.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.vivaldi.Vivaldi" },
      "pisi": { "type": "flatpak", "value": "com.vivaldi.Vivaldi" },
      "debian": { "type": "flatpak", "value": "com.vivaldi.Vivaldi" },
      "windows": { "type": "url", "value": "https://downloads.vivaldi.com/stable/Vivaldi.6.8.3381.50.x64.exe", "ext": ".exe" }
    }
  },
  "opera": {
    "name": "Opera Browser",
    "detect": { "linux": "opera", "flatpakId": "com.opera.Opera", "windows": "opera", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\Opera\\launcher.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.opera.Opera" },
      "pisi": { "type": "flatpak", "value": "com.opera.Opera" },
      "debian": { "type": "flatpak", "value": "com.opera.Opera" },
      "windows": { "type": "url", "value": "https://net.opera.com/online_installer/Opera_Setup.exe", "ext": ".exe" }
    }
  },
  "torbrowser": {
    "name": "Tor Browser",
    "detect": { "linux": "torbrowser-launcher", "flatpakId": "org.torproject.torbrowser-launcher", "windows": "firefox", "windowsPaths": ["%Desktop%\\Tor Browser\\Browser\\firefox.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "org.torproject.torbrowser-launcher" },
      "pisi": { "type": "flatpak", "value": "org.torproject.torbrowser-launcher" },
      "debian": { "type": "flatpak", "value": "org.torproject.torbrowser-launcher" },
      "windows": null
    }
  },
  "librewolf": {
    "name": "LibreWolf",
    "detect": { "linux": "librewolf", "flatpakId": "io.gitlab.librewolf-community", "windows": "librewolf", "windowsPaths": ["%ProgramFiles%\\LibreWolf\\librewolf.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "io.gitlab.librewolf-community" },
      "pisi": { "type": "flatpak", "value": "io.gitlab.librewolf-community" },
      "debian": { "type": "flatpak", "value": "io.gitlab.librewolf-community" },
      "windows": null
    }
  },
  "waterfox": {
    "name": "Waterfox",
    "detect": { "linux": "waterfox", "flatpakId": "net.waterfox.waterfox", "windows": "waterfox", "windowsPaths": ["%ProgramFiles%\\Waterfox\\waterfox.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "net.waterfox.waterfox" },
      "pisi": { "type": "flatpak", "value": "net.waterfox.waterfox" },
      "debian": { "type": "flatpak", "value": "net.waterfox.waterfox" },
      "windows": null
    }
  },

  // === DEVELOPER TOOLS ===
  "vscode": {
    "name": "Visual Studio Code",
    "detect": { "linux": "code", "flatpakId": "com.visualstudio.code", "windows": "code", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\Microsoft VS Code\\Code.exe", "%ProgramFiles%\\Microsoft VS Code\\Code.exe"] },
    "install": {
      "fedora": { "type": "url", "value": "https://update.code.visualstudio.com/latest/linux-rpm-x64/stable", "ext": ".rpm" },
      "pisi": { "type": "flatpak", "value": "com.visualstudio.code" },
      "debian": { "type": "url", "value": "https://update.code.visualstudio.com/latest/linux-deb-x64/stable", "ext": ".deb" },
      "windows": { "type": "url", "value": "https://update.code.visualstudio.com/latest/win32-x64-user/stable", "ext": ".exe" }
    }
  },
  "vscodium": {
    "name": "VSCodium",
    "detect": { "linux": "codium", "flatpakId": "com.vscodium.codium", "windows": "codium", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\VSCodium\\VSCodium.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.vscodium.codium" },
      "pisi": { "type": "flatpak", "value": "com.vscodium.codium" },
      "debian": { "type": "flatpak", "value": "com.vscodium.codium" },
      "windows": null
    }
  },
  "sublimetext": {
    "name": "Sublime Text",
    "detect": { "linux": "subl", "flatpakId": "com.sublimetext.three", "windows": "sublime_text", "windowsPaths": ["%ProgramFiles%\\Sublime Text\\sublime_text.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.sublimetext.three" },
      "pisi": { "type": "flatpak", "value": "com.sublimetext.three" },
      "debian": { "type": "flatpak", "value": "com.sublimetext.three" },
      "windows": null
    }
  },
  "intellij": {
    "name": "IntelliJ IDEA Community",
    "detect": { "linux": "idea", "flatpakId": "com.jetbrains.IntelliJ-IDEA-Community", "windows": "idea64", "windowsPaths": ["%ProgramFiles%\\JetBrains\\IntelliJ IDEA Community Edition\\bin\\idea64.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.jetbrains.IntelliJ-IDEA-Community" },
      "pisi": { "type": "flatpak", "value": "com.jetbrains.IntelliJ-IDEA-Community" },
      "debian": { "type": "flatpak", "value": "com.jetbrains.IntelliJ-IDEA-Community" },
      "windows": null
    }
  },
  "pycharm": {
    "name": "PyCharm Community",
    "detect": { "linux": "pycharm-community", "flatpakId": "com.jetbrains.PyCharm-Community", "windows": "pycharm64", "windowsPaths": ["%ProgramFiles%\\JetBrains\\PyCharm Community Edition\\bin\\pycharm64.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.jetbrains.PyCharm-Community" },
      "pisi": { "type": "flatpak", "value": "com.jetbrains.PyCharm-Community" },
      "debian": { "type": "flatpak", "value": "com.jetbrains.PyCharm-Community" },
      "windows": null
    }
  },
  "neovide": {
    "name": "Neovide",
    "detect": { "linux": "neovide", "flatpakId": "dev.neovide.neovide", "windows": "neovide", "windowsPaths": [] },
    "install": {
      "fedora": { "type": "flatpak", "value": "dev.neovide.neovide" },
      "pisi": { "type": "flatpak", "value": "dev.neovide.neovide" },
      "debian": { "type": "flatpak", "value": "dev.neovide.neovide" },
      "windows": null
    }
  },
  "postman": {
    "name": "Postman",
    "detect": { "linux": "postman", "flatpakId": "com.getpostman.Postman", "windows": "Postman", "windowsPaths": ["%LOCALAPPDATA%\\Postman\\Postman.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.getpostman.Postman" },
      "pisi": { "type": "flatpak", "value": "com.getpostman.Postman" },
      "debian": { "type": "flatpak", "value": "com.getpostman.Postman" },
      "windows": null
    }
  },
  "insomnia": {
    "name": "Insomnia",
    "detect": { "linux": "insomnia", "flatpakId": "rest.insomnia.Insomnia", "windows": "Insomnia", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\Insomnia\\Insomnia.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "rest.insomnia.Insomnia" },
      "pisi": { "type": "flatpak", "value": "rest.insomnia.Insomnia" },
      "debian": { "type": "flatpak", "value": "rest.insomnia.Insomnia" },
      "windows": null
    }
  },
  "docker": {
    "name": "Docker Desktop",
    "detect": { "linux": "docker", "flatpakId": null, "windows": "Docker Desktop", "windowsPaths": ["%ProgramFiles%\\Docker\\Docker\\Docker Desktop.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "docker-ce" },
      "pisi": null,
      "debian": { "type": "pkg", "value": "docker.io" },
      "windows": null
    }
  },
  "gitkraken": {
    "name": "GitKraken",
    "detect": { "linux": "gitkraken", "flatpakId": "com.axosoft.GitKraken", "windows": "gitkraken", "windowsPaths": ["%LOCALAPPDATA%\\gitkraken\\gitkraken.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.axosoft.GitKraken" },
      "pisi": { "type": "flatpak", "value": "com.axosoft.GitKraken" },
      "debian": { "type": "flatpak", "value": "com.axosoft.GitKraken" },
      "windows": null
    }
  },
  "dbeaver": {
    "name": "DBeaver Community",
    "detect": { "linux": "dbeaver", "flatpakId": "io.dbeaver.DBeaverCommunity", "windows": "dbeaver", "windowsPaths": ["%ProgramFiles%\\DBeaver\\dbeaver.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "io.dbeaver.DBeaverCommunity" },
      "pisi": { "type": "flatpak", "value": "io.dbeaver.DBeaverCommunity" },
      "debian": { "type": "flatpak", "value": "io.dbeaver.DBeaverCommunity" },
      "windows": null
    }
  },
  "zed": {
    "name": "Zed Editor",
    "detect": { "linux": "zed", "flatpakId": "dev.zed.Zed", "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "flatpak", "value": "dev.zed.Zed" },
      "pisi": { "type": "flatpak", "value": "dev.zed.Zed" },
      "debian": { "type": "flatpak", "value": "dev.zed.Zed" },
      "windows": null
    }
  },
  "bruno": {
    "name": "Bruno API Client",
    "detect": { "linux": "bruno", "flatpakId": "com.usebruno.Bruno", "windows": "bruno", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\bruno\\Bruno.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.usebruno.Bruno" },
      "pisi": { "type": "flatpak", "value": "com.usebruno.Bruno" },
      "debian": { "type": "flatpak", "value": "com.usebruno.Bruno" },
      "windows": null
    }
  },

  // === PRODUCTIVITY & OFFICE ===
  "libreoffice": {
    "name": "LibreOffice",
    "detect": { "linux": "libreoffice", "flatpakId": "org.libreoffice.LibreOffice", "windows": "soffice", "windowsPaths": ["%ProgramFiles%\\LibreOffice\\program\\soffice.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "libreoffice" },
      "pisi": { "type": "pkg", "value": "libreoffice" },
      "debian": { "type": "pkg", "value": "libreoffice" },
      "windows": null
    }
  },
  "onlyoffice": {
    "name": "ONLYOFFICE",
    "detect": { "linux": "onlyoffice-desktopeditors", "flatpakId": "org.onlyoffice.desktopeditors", "windows": "DesktopEditors", "windowsPaths": ["%ProgramFiles%\\ONLYOFFICE\\DesktopEditors\\DesktopEditors.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "org.onlyoffice.desktopeditors" },
      "pisi": { "type": "flatpak", "value": "org.onlyoffice.desktopeditors" },
      "debian": { "type": "flatpak", "value": "org.onlyoffice.desktopeditors" },
      "windows": null
    }
  },
  "obsidian": {
    "name": "Obsidian",
    "detect": { "linux": "obsidian", "flatpakId": "md.obsidian.Obsidian", "windows": "obsidian", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\obsidian\\Obsidian.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "md.obsidian.Obsidian" },
      "pisi": { "type": "flatpak", "value": "md.obsidian.Obsidian" },
      "debian": { "type": "flatpak", "value": "md.obsidian.Obsidian" },
      "windows": { "type": "url", "value": "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.6.7/Obsidian-1.6.7.exe", "ext": ".exe" }
    }
  },
  "joplin": {
    "name": "Joplin",
    "detect": { "linux": "joplin", "flatpakId": "net.cozic.joplin_desktop", "windows": "Joplin", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\Joplin\\Joplin.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "net.cozic.joplin_desktop" },
      "pisi": { "type": "flatpak", "value": "net.cozic.joplin_desktop" },
      "debian": { "type": "flatpak", "value": "net.cozic.joplin_desktop" },
      "windows": { "type": "url", "value": "https://github.com/laurent22/joplin/releases/download/v2.14.20/Joplin-Setup-2.14.20.exe", "ext": ".exe" }
    }
  },
  "notion": {
    "name": "Notion",
    "detect": { "linux": "notion-app", "flatpakId": "io.github.vancei.Notion", "windows": "Notion", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\Notion\\Notion.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "io.github.vancei.Notion" },
      "pisi": { "type": "flatpak", "value": "io.github.vancei.Notion" },
      "debian": { "type": "flatpak", "value": "io.github.vancei.Notion" },
      "windows": null
    }
  },
  "logseq": {
    "name": "Logseq",
    "detect": { "linux": "logseq", "flatpakId": "com.logseq.Logseq", "windows": "Logseq", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\Logseq\\Logseq.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.logseq.Logseq" },
      "pisi": { "type": "flatpak", "value": "com.logseq.Logseq" },
      "debian": { "type": "flatpak", "value": "com.logseq.Logseq" },
      "windows": null
    }
  },
  "thunderbird": {
    "name": "Thunderbird",
    "detect": { "linux": "thunderbird", "flatpakId": "org.mozilla.Thunderbird", "windows": "thunderbird", "windowsPaths": ["%ProgramFiles%\\Mozilla Thunderbird\\thunderbird.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "thunderbird" },
      "pisi": { "type": "pkg", "value": "thunderbird" },
      "debian": { "type": "pkg", "value": "thunderbird" },
      "windows": null
    }
  },
  "mailspring": {
    "name": "Mailspring",
    "detect": { "linux": "mailspring", "flatpakId": "com.getmailspring.Mailspring", "windows": "Mailspring", "windowsPaths": ["%LOCALAPPDATA%\\Mailspring\\Mailspring.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "mailspring" },
      "pisi": null,
      "debian": { "type": "pkg", "value": "mailspring" },
      "windows": null
    }
  },
  "todoist": {
    "name": "Todoist",
    "detect": { "linux": "todoist", "flatpakId": "com.todoist.Todoist", "windows": "Todoist", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\todoist\\Todoist.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.todoist.Todoist" },
      "pisi": { "type": "flatpak", "value": "com.todoist.Todoist" },
      "debian": { "type": "flatpak", "value": "com.todoist.Todoist" },
      "windows": null
    }
  },
  "masterpdf": {
    "name": "Master PDF Editor",
    "detect": { "linux": "masterpdfeditor5", "flatpakId": "net.code_industry.MasterPDFEditor", "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "flatpak", "value": "net.code_industry.MasterPDFEditor" },
      "pisi": { "type": "flatpak", "value": "net.code_industry.MasterPDFEditor" },
      "debian": { "type": "flatpak", "value": "net.code_industry.MasterPDFEditor" },
      "windows": null
    }
  },

  // === DESIGN, PHOTO & 3D ===
  "blender": {
    "name": "Blender",
    "detect": { "linux": "blender", "flatpakId": "org.blender.Blender", "windows": "blender", "windowsPaths": ["%ProgramFiles%\\Blender Foundation\\Blender 4.2\\blender.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "org.blender.Blender" },
      "pisi": { "type": "pkg", "value": "blender" },
      "debian": { "type": "flatpak", "value": "org.blender.Blender" },
      "windows": { "type": "url", "value": "https://download.blender.org/release/Blender4.2/blender-4.2.1-windows-x64.msi", "ext": ".msi" }
    }
  },
  "gimp": {
    "name": "GIMP",
    "detect": { "linux": "gimp", "flatpakId": "org.gimp.GIMP", "windows": "gimp-2.10", "windowsPaths": ["%ProgramFiles%\\GIMP 2\\bin\\gimp-2.10.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "gimp" },
      "pisi": { "type": "pkg", "value": "gimp" },
      "debian": { "type": "pkg", "value": "gimp" },
      "windows": { "type": "url", "value": "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe", "ext": ".exe" }
    }
  },
  "inkscape": {
    "name": "Inkscape",
    "detect": { "linux": "inkscape", "flatpakId": "org.inkscape.Inkscape", "windows": "inkscape", "windowsPaths": ["%ProgramFiles%\\Inkscape\\bin\\inkscape.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "inkscape" },
      "pisi": { "type": "pkg", "value": "inkscape" },
      "debian": { "type": "pkg", "value": "inkscape" },
      "windows": { "type": "url", "value": "https://media.inkscape.org/dl/resources/file/inkscape-1.3.2_2023-11-25_091e20e-x64.exe", "ext": ".exe" }
    }
  },
  "krita": {
    "name": "Krita",
    "detect": { "linux": "krita", "flatpakId": "org.kde.krita", "windows": "krita", "windowsPaths": ["%ProgramFiles%\\Krita (x64)\\bin\\krita.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "krita" },
      "pisi": { "type": "pkg", "value": "krita" },
      "debian": { "type": "pkg", "value": "krita" },
      "windows": { "type": "url", "value": "https://download.kde.org/stable/krita/5.2.6/krita-x64-5.2.6-setup.exe", "ext": ".exe" }
    }
  },
  "figma": {
    "name": "Figma",
    "detect": { "linux": "figma-linux", "flatpakId": "io.github.figma_linux.figma_linux", "windows": "Figma", "windowsPaths": ["%LOCALAPPDATA%\\Figma\\Figma.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "io.github.figma_linux.figma_linux" },
      "pisi": { "type": "flatpak", "value": "io.github.figma_linux.figma_linux" },
      "debian": { "type": "flatpak", "value": "io.github.figma_linux.figma_linux" },
      "windows": null
    }
  },
  "darktable": {
    "name": "Darktable",
    "detect": { "linux": "darktable", "flatpakId": "org.darktable.Darktable", "windows": "darktable", "windowsPaths": ["%ProgramFiles%\\darktable\\bin\\darktable.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "darktable" },
      "pisi": { "type": "flatpak", "value": "org.darktable.Darktable" },
      "debian": { "type": "pkg", "value": "darktable" },
      "windows": null
    }
  },
  "rawtherapee": {
    "name": "RawTherapee",
    "detect": { "linux": "rawtherapee", "flatpakId": "com.rawtherapee.RawTherapee", "windows": "rawtherapee", "windowsPaths": ["%ProgramFiles%\\RawTherapee\\rawtherapee.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.rawtherapee.RawTherapee" },
      "pisi": { "type": "flatpak", "value": "com.rawtherapee.RawTherapee" },
      "debian": { "type": "flatpak", "value": "com.rawtherapee.RawTherapee" },
      "windows": null
    }
  },
  "penpot": {
    "name": "Penpot Desktop",
    "detect": { "linux": "penpot-desktop", "flatpakId": "com.authormore.penpotdesktop", "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.authormore.penpotdesktop" },
      "pisi": { "type": "flatpak", "value": "com.authormore.penpotdesktop" },
      "debian": { "type": "flatpak", "value": "com.authormore.penpotdesktop" },
      "windows": null
    }
  },
  "freecad": {
    "name": "FreeCAD",
    "detect": { "linux": "freecad", "flatpakId": "org.freecad.FreeCAD", "windows": "freecad", "windowsPaths": ["%ProgramFiles%\\FreeCAD\\bin\\FreeCAD.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "freecad" },
      "pisi": { "type": "flatpak", "value": "org.freecad.FreeCAD" },
      "debian": { "type": "pkg", "value": "freecad" },
      "windows": null
    }
  },
  "natron": {
    "name": "Natron",
    "detect": { "linux": "natron", "flatpakId": "fr.natron.Natron", "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "flatpak", "value": "fr.natron.Natron" },
      "pisi": { "type": "flatpak", "value": "fr.natron.Natron" },
      "debian": { "type": "flatpak", "value": "fr.natron.Natron" },
      "windows": null
    }
  },
  "digikam": {
    "name": "digiKam",
    "detect": { "linux": "digikam", "flatpakId": "org.kde.digikam", "windows": "digikam", "windowsPaths": ["%ProgramFiles%\\digiKam\\digikam.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "digikam" },
      "pisi": { "type": "flatpak", "value": "org.kde.digikam" },
      "debian": { "type": "pkg", "value": "digikam" },
      "windows": null
    }
  },

  // === GAMES & LAUNCHERS ===
  "steam": {
    "name": "Steam",
    "detect": { "linux": "steam", "flatpakId": "com.valvesoftware.Steam", "windows": "steam", "windowsPaths": ["%ProgramFiles(x86)%\\Steam\\steam.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "steam", "note": "RPM Fusion gerektirir." },
      "pisi": { "type": "flatpak", "value": "com.valvesoftware.Steam" },
      "debian": { "type": "url", "value": "https://cdn.cloudflare.steamstatic.com/client/installer/steam.deb", "ext": ".deb" },
      "windows": { "type": "url", "value": "https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe", "ext": ".exe" }
    }
  },
  "heroic": {
    "name": "Heroic Games Launcher",
    "detect": { "linux": "heroic", "flatpakId": "com.heroicgameslauncher.hgl", "windows": "Heroic", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\heroic\\Heroic.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.heroicgameslauncher.hgl" },
      "pisi": { "type": "flatpak", "value": "com.heroicgameslauncher.hgl" },
      "debian": { "type": "flatpak", "value": "com.heroicgameslauncher.hgl" },
      "windows": null
    }
  },
  "lutris": {
    "name": "Lutris",
    "detect": { "linux": "lutris", "flatpakId": "net.lutris.Lutris", "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "pkg", "value": "lutris" },
      "pisi": { "type": "pkg", "value": "lutris" },
      "debian": { "type": "pkg", "value": "lutris" },
      "windows": null
    }
  },
  "bottles": {
    "name": "Bottles",
    "detect": { "linux": "bottles", "flatpakId": "com.usebottles.bottles", "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.usebottles.bottles" },
      "pisi": { "type": "flatpak", "value": "com.usebottles.bottles" },
      "debian": { "type": "flatpak", "value": "com.usebottles.bottles" },
      "windows": null
    }
  },
  "playonlinux": {
    "name": "PlayOnLinux",
    "detect": { "linux": "playonlinux", "flatpakId": null, "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "pkg", "value": "playonlinux" },
      "pisi": null,
      "debian": { "type": "pkg", "value": "playonlinux" },
      "windows": null
    }
  },
  "minetest": {
    "name": "Minetest",
    "detect": { "linux": "minetest", "flatpakId": "net.minetest.Minetest", "windows": "minetest", "windowsPaths": ["C:\\Minetest\\bin\\minetest.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "minetest" },
      "pisi": { "type": "flatpak", "value": "net.minetest.Minetest" },
      "debian": { "type": "pkg", "value": "minetest" },
      "windows": null
    }
  },
  "supertuxkart": {
    "name": "SuperTuxKart",
    "detect": { "linux": "supertuxkart", "flatpakId": "net.supertuxkart.SuperTuxKart", "windows": "supertuxkart", "windowsPaths": ["%ProgramFiles%\\SuperTuxKart\\supertuxkart.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "supertuxkart" },
      "pisi": { "type": "flatpak", "value": "net.supertuxkart.SuperTuxKart" },
      "debian": { "type": "pkg", "value": "supertuxkart" },
      "windows": null
    }
  },
  "0ad": {
    "name": "0 A.D.",
    "detect": { "linux": "pyrogenesis", "flatpakId": "com.play0ad.zeroad", "windows": "pyrogenesis", "windowsPaths": ["%ProgramFiles%\\0 A.D.\\binaries\\system\\pyrogenesis.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "0ad" },
      "pisi": { "type": "flatpak", "value": "com.play0ad.zeroad" },
      "debian": { "type": "pkg", "value": "0ad" },
      "windows": null
    }
  },
  "veloren": {
    "name": "Veloren",
    "detect": { "linux": "airshipper", "flatpakId": "net.veloren.airshipper", "windows": "airshipper", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\airshipper\\airshipper.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "net.veloren.airshipper" },
      "pisi": { "type": "flatpak", "value": "net.veloren.airshipper" },
      "debian": { "type": "flatpak", "value": "net.veloren.airshipper" },
      "windows": null
    }
  },
  "retroarch": {
    "name": "RetroArch",
    "detect": { "linux": "retroarch", "flatpakId": "org.libretro.RetroArch", "windows": "retroarch", "windowsPaths": ["%ProgramFiles%\\RetroArch\\retroarch.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "retroarch" },
      "pisi": { "type": "flatpak", "value": "org.libretro.RetroArch" },
      "debian": { "type": "pkg", "value": "retroarch" },
      "windows": null
    }
  },

  // === MEDIA & AUDIO/VIDEO ===
  "vlc": {
    "name": "VLC Media Player",
    "detect": { "linux": "vlc", "flatpakId": "org.videolan.VLC", "windows": "vlc", "windowsPaths": ["%ProgramFiles%\\VideoLAN\\VLC\\vlc.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "vlc", "note": "RPM Fusion gerektirir." },
      "pisi": { "type": "pkg", "value": "vlc" },
      "debian": { "type": "pkg", "value": "vlc" },
      "windows": { "type": "url", "value": "https://get.videolan.org/vlc/last/win64/vlc-3.0.21-win64.exe", "ext": ".exe" }
    }
  },
  "obs": {
    "name": "OBS Studio",
    "detect": { "linux": "obs", "flatpakId": "com.obsproject.Studio", "windows": "obs64", "windowsPaths": ["%ProgramFiles%\\obs-studio\\bin\\64bit\\obs64.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "obs-studio" },
      "pisi": { "type": "pkg", "value": "obs-studio" },
      "debian": { "type": "pkg", "value": "obs-studio" },
      "windows": { "type": "url", "value": "https://github.com/obsproject/obs-studio/releases/download/30.2.3/OBS-Studio-30.2.3-Windows-Installer.exe", "ext": ".exe" }
    }
  },
  "handbrake": {
    "name": "HandBrake",
    "detect": { "linux": "ghb", "flatpakId": "fr.handbrake.ghb", "windows": "HandBrakeGUI", "windowsPaths": ["%ProgramFiles%\\HandBrake\\HandBrakeGUI.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "HandBrake-gui", "note": "RPM Fusion gerektirir." },
      "pisi": { "type": "pkg", "value": "handbrake" },
      "debian": { "type": "pkg", "value": "handbrake" },
      "windows": { "type": "url", "value": "https://github.com/HandBrake/HandBrake/releases/download/1.8.2/HandBrake-1.8.2-x86_64-Win_GUI.exe", "ext": ".exe" }
    }
  },
  "kdenlive": {
    "name": "Kdenlive",
    "detect": { "linux": "kdenlive", "flatpakId": "org.kde.kdenlive", "windows": "kdenlive", "windowsPaths": ["%ProgramFiles%\\kdenlive\\bin\\kdenlive.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "kdenlive" },
      "pisi": { "type": "flatpak", "value": "org.kde.kdenlive" },
      "debian": { "type": "pkg", "value": "kdenlive" },
      "windows": { "type": "url", "value": "https://download.kde.org/stable/kdenlive/24.08/windows/kdenlive-24.08.1-x86_64.exe", "ext": ".exe" }
    }
  },
  "audacity": {
    "name": "Audacity",
    "detect": { "linux": "audacity", "flatpakId": "org.audacityteam.Audacity", "windows": "audacity", "windowsPaths": ["%ProgramFiles%\\Audacity\\audacity.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "audacity" },
      "pisi": { "type": "pkg", "value": "audacity" },
      "debian": { "type": "pkg", "value": "audacity" },
      "windows": { "type": "url", "value": "https://github.com/audacity/audacity/releases/download/Audacity-3.5.1/audacity-win-3.5.1-x64.exe", "ext": ".exe" }
    }
  },
  "spotify": {
    "name": "Spotify",
    "detect": { "linux": "spotify", "flatpakId": "com.spotify.Client", "windows": "spotify", "windowsPaths": ["%LOCALAPPDATA%\\Microsoft\\WindowsApps\\spotify.exe", "%LOCALAPPDATA%\\Spotify\\Spotify.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.spotify.Client" },
      "pisi": { "type": "flatpak", "value": "com.spotify.Client" },
      "debian": { "type": "flatpak", "value": "com.spotify.Client" },
      "windows": { "type": "url", "value": "https://download.scdn.co/SpotifySetup.exe", "ext": ".exe" }
    }
  },
  "tidal": {
    "name": "Tidal",
    "detect": { "linux": "tidal-hifi", "flatpakId": "com.mastermindzh.tidal-hifi", "windows": "TIDAL", "windowsPaths": ["%LOCALAPPDATA%\\TIDAL\\TIDAL.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.mastermindzh.tidal-hifi" },
      "pisi": { "type": "flatpak", "value": "com.mastermindzh.tidal-hifi" },
      "debian": { "type": "flatpak", "value": "com.mastermindzh.tidal-hifi" },
      "windows": null
    }
  },
  "mpv": {
    "name": "MPV Player",
    "detect": { "linux": "mpv", "flatpakId": "io.mpv.Mpv", "windows": "mpv", "windowsPaths": ["C:\\mpv\\mpv.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "mpv" },
      "pisi": { "type": "flatpak", "value": "io.mpv.Mpv" },
      "debian": { "type": "pkg", "value": "mpv" },
      "windows": null
    }
  },
  "shotcut": {
    "name": "Shotcut",
    "detect": { "linux": "shotcut", "flatpakId": "org.shotcut.Shotcut", "windows": "shotcut", "windowsPaths": ["%ProgramFiles%\\Shotcut\\shotcut.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "org.shotcut.Shotcut" },
      "pisi": { "type": "flatpak", "value": "org.shotcut.Shotcut" },
      "debian": { "type": "flatpak", "value": "org.shotcut.Shotcut" },
      "windows": null
    }
  },
  "clementine": {
    "name": "Clementine",
    "detect": { "linux": "clementine", "flatpakId": "org.clementine_player.Clementine", "windows": "clementine", "windowsPaths": ["%ProgramFiles(x86)%\\Clementine\\clementine.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "clementine" },
      "pisi": { "type": "flatpak", "value": "org.clementine_player.Clementine" },
      "debian": { "type": "pkg", "value": "clementine" },
      "windows": null
    }
  },
  "strawberry": {
    "name": "Strawberry Music Player",
    "detect": { "linux": "strawberry", "flatpakId": "org.strawberrymusicplayer.strawberry", "windows": "strawberry", "windowsPaths": ["%ProgramFiles%\\Strawberry Music Player\\strawberry.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "strawberry" },
      "pisi": { "type": "flatpak", "value": "org.strawberrymusicplayer.strawberry" },
      "debian": { "type": "pkg", "value": "strawberry" },
      "windows": null
    }
  },

  // === CHAT & SOCIAL ===
  "telegram": {
    "name": "Telegram Desktop",
    "detect": { "linux": "telegram-desktop", "flatpakId": "org.telegram.desktop", "windows": "telegram", "windowsPaths": ["%LOCALAPPDATA%\\Telegram Desktop\\Telegram.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "telegram-desktop" },
      "pisi": { "type": "pkg", "value": "telegram-desktop" },
      "debian": { "type": "pkg", "value": "telegram-desktop" },
      "windows": { "type": "url", "value": "https://telegram.org/dl/desktop/win64", "ext": ".exe" }
    }
  },
  "discord": {
    "name": "Discord",
    "detect": { "linux": "discord", "flatpakId": "com.discordapp.Discord", "windows": "discord", "windowsPaths": ["%LOCALAPPDATA%\\Discord\\app-0.0.62\\Discord.exe", "%LOCALAPPDATA%\\Discord\\Discord.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.discordapp.Discord" },
      "pisi": { "type": "flatpak", "value": "com.discordapp.Discord" },
      "debian": { "type": "flatpak", "value": "com.discordapp.Discord" },
      "windows": { "type": "url", "value": "https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x64", "ext": ".exe" }
    }
  },
  "element": {
    "name": "Element",
    "detect": { "linux": "element-desktop", "flatpakId": "im.riot.Riot", "windows": "element-desktop", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\element-desktop\\Element.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "im.riot.Riot" },
      "pisi": { "type": "flatpak", "value": "im.riot.Riot" },
      "debian": { "type": "flatpak", "value": "im.riot.Riot" },
      "windows": { "type": "url", "value": "https://packages.element.io/desktop/install/win32/x64/Element%20Setup.exe", "ext": ".exe" }
    }
  },
  "signal": {
    "name": "Signal Desktop",
    "detect": { "linux": "signal-desktop", "flatpakId": "org.signal.Signal", "windows": "Signal", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\signal-desktop\\Signal.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "org.signal.Signal" },
      "pisi": { "type": "flatpak", "value": "org.signal.Signal" },
      "debian": { "type": "flatpak", "value": "org.signal.Signal" },
      "windows": { "type": "url", "value": "https://updates.signal.org/desktop/signal-desktop-win-7.16.0.exe", "ext": ".exe" }
    }
  },
  "slack": {
    "name": "Slack",
    "detect": { "linux": "slack", "flatpakId": "com.slack.Slack", "windows": "slack", "windowsPaths": ["%LOCALAPPDATA%\\slack\\slack.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.slack.Slack" },
      "pisi": { "type": "flatpak", "value": "com.slack.Slack" },
      "debian": { "type": "flatpak", "value": "com.slack.Slack" },
      "windows": { "type": "url", "value": "https://downloads.slack-edge.com/desktop-releases/windows/x64/4.40.130/SlackSetup.exe", "ext": ".exe" }
    }
  },
  "zoom": {
    "name": "Zoom Workplace",
    "detect": { "linux": "zoom", "flatpakId": "us.zoom.Zoom", "windows": "Zoom", "windowsPaths": ["%APPDATA%\\Zoom\\bin\\Zoom.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "us.zoom.Zoom" },
      "pisi": { "type": "flatpak", "value": "us.zoom.Zoom" },
      "debian": { "type": "flatpak", "value": "us.zoom.Zoom" },
      "windows": null
    }
  },
  "session": {
    "name": "Session",
    "detect": { "linux": "session-desktop", "flatpakId": "network.loki.Session", "windows": "Session", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\session-desktop\\Session.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "network.loki.Session" },
      "pisi": { "type": "flatpak", "value": "network.loki.Session" },
      "debian": { "type": "flatpak", "value": "network.loki.Session" },
      "windows": null
    }
  },
  "revolt": {
    "name": "Revolt Chat",
    "detect": { "linux": "revolt-desktop", "flatpakId": "chat.revolt.RevoltDesktop", "windows": "Revolt", "windowsPaths": [] },
    "install": {
      "fedora": { "type": "flatpak", "value": "chat.revolt.RevoltDesktop" },
      "pisi": { "type": "flatpak", "value": "chat.revolt.RevoltDesktop" },
      "debian": { "type": "flatpak", "value": "chat.revolt.RevoltDesktop" },
      "windows": null
    }
  },

  // === SYSTEM & SECURITY ===
  "bitwarden": {
    "name": "Bitwarden",
    "detect": { "linux": "bitwarden", "flatpakId": "com.bitwarden.desktop", "windows": "bitwarden", "windowsPaths": ["%LOCALAPPDATA%\\Programs\\bitwarden\\Bitwarden.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.bitwarden.desktop" },
      "pisi": { "type": "flatpak", "value": "com.bitwarden.desktop" },
      "debian": { "type": "flatpak", "value": "com.bitwarden.desktop" },
      "windows": { "type": "url", "value": "https://vault.bitwarden.com/download/?app=desktop&platform=windows", "ext": ".exe" }
    }
  },
  "keepassxc": {
    "name": "KeePassXC",
    "detect": { "linux": "keepassxc", "flatpakId": "org.keepassxc.KeePassXC", "windows": "keepassxc", "windowsPaths": ["%ProgramFiles%\\KeePassXC\\KeePassXC.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "keepassxc" },
      "pisi": { "type": "pkg", "value": "keepassxc" },
      "debian": { "type": "pkg", "value": "keepassxc" },
      "windows": { "type": "url", "value": "https://github.com/keepassxreboot/keepassxc/releases/download/2.7.9/KeePassXC-2.7.9-Win64.msi", "ext": ".msi" }
    }
  },
  "powertoys": {
    "name": "PowerToys",
    "detect": { "linux": null, "flatpakId": null, "windows": "PowerToys", "windowsPaths": ["%ProgramFiles%\\PowerToys\\PowerToys.exe", "%LOCALAPPDATA%\\Microsoft\\PowerToys\\PowerToys.exe"] },
    "install": {
      "fedora": null,
      "pisi": null,
      "debian": null,
      "windows": { "type": "url", "value": "https://github.com/microsoft/PowerToys/releases/download/v0.81.0/PowerToysUserSetup-0.81.0-x64.exe", "ext": ".exe" }
    }
  },
  "stacer": {
    "name": "Stacer System Optimizer",
    "detect": { "linux": "stacer", "flatpakId": null, "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "pkg", "value": "stacer" },
      "pisi": null,
      "debian": { "type": "pkg", "value": "stacer" },
      "windows": null
    }
  },
  "timeshift": {
    "name": "Timeshift",
    "detect": { "linux": "timeshift", "flatpakId": null, "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "pkg", "value": "timeshift" },
      "pisi": null,
      "debian": { "type": "pkg", "value": "timeshift" },
      "windows": null
    }
  },
  "bleachbit": {
    "name": "BleachBit",
    "detect": { "linux": "bleachbit", "flatpakId": "org.bleachbit.BleachBit", "windows": "bleachbit", "windowsPaths": ["%ProgramFiles(x86)%\\BleachBit\\bleachbit.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "bleachbit" },
      "pisi": { "type": "flatpak", "value": "org.bleachbit.BleachBit" },
      "debian": { "type": "pkg", "value": "bleachbit" },
      "windows": null
    }
  },
  "wireshark": {
    "name": "Wireshark",
    "detect": { "linux": "wireshark", "flatpakId": "org.wireshark.Wireshark", "windows": "Wireshark", "windowsPaths": ["%ProgramFiles%\\Wireshark\\Wireshark.exe"] },
    "install": {
      "fedora": { "type": "pkg", "value": "wireshark" },
      "pisi": { "type": "flatpak", "value": "org.wireshark.Wireshark" },
      "debian": { "type": "pkg", "value": "wireshark" },
      "windows": null
    }
  },
  "gparted": {
    "name": "GParted",
    "detect": { "linux": "gparted", "flatpakId": null, "windows": null, "windowsPaths": [] },
    "install": {
      "fedora": { "type": "pkg", "value": "gparted" },
      "pisi": null,
      "debian": { "type": "pkg", "value": "gparted" },
      "windows": null
    }
  },
  "protonvpn": {
    "name": "Proton VPN",
    "detect": { "linux": "protonvpn-app", "flatpakId": "com.protonvpn.www", "windows": "ProtonVPN", "windowsPaths": ["%ProgramFiles%\\Proton\\VPN\\ProtonVPN.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.protonvpn.www" },
      "pisi": { "type": "flatpak", "value": "com.protonvpn.www" },
      "debian": { "type": "flatpak", "value": "com.protonvpn.www" },
      "windows": null
    }
  },
  "mullvadvpn": {
    "name": "Mullvad VPN",
    "detect": { "linux": "mullvad-vpn", "flatpakId": "net.mullvad.MullvadVPN", "windows": "mullvad-vpn", "windowsPaths": ["%ProgramFiles%\\Mullvad VPN\\mullvad-vpn.exe"] },
    "install": {
      "fedora": { "type": "flatpak", "value": "net.mullvad.MullvadVPN" },
      "pisi": { "type": "flatpak", "value": "net.mullvad.MullvadVPN" },
      "debian": { "type": "flatpak", "value": "net.mullvad.MullvadVPN" },
      "windows": null
    }
  },
  "localsend": {
    "name": "LocalSend",
    "detect": { "linux": "localsend", "flatpakId": "org.localsend.localsend_app" },
    "install": {
      "fedora": { "type": "flatpak", "value": "org.localsend.localsend_app" },
      "pisi": { "type": "flatpak", "value": "org.localsend.localsend_app" },
      "debian": { "type": "flatpak", "value": "org.localsend.localsend_app" }
    }
  },
  "bottles": {
    "name": "Bottles",
    "detect": { "linux": "bottles", "flatpakId": "com.usebottles.bottles" },
    "install": {
      "fedora": { "type": "flatpak", "value": "com.usebottles.bottles" },
      "pisi": { "type": "flatpak", "value": "com.usebottles.bottles" },
      "debian": { "type": "flatpak", "value": "com.usebottles.bottles" }
    }
  },
  "audacity": {
    "name": "Audacity",
    "detect": { "linux": "audacity", "flatpakId": "org.audacityteam.Audacity" },
    "install": {
      "fedora": { "type": "pkg", "value": "audacity" },
      "pisi": { "type": "pkg", "value": "audacity" },
      "debian": { "type": "pkg", "value": "audacity" }
    }
  },
  "timeshift": {
    "name": "Timeshift",
    "detect": { "linux": "timeshift" },
    "install": {
      "fedora": { "type": "pkg", "value": "timeshift" },
      "pisi": { "type": "pkg", "value": "timeshift" },
      "debian": { "type": "pkg", "value": "timeshift" }
    }
  }
};

module.exports = { APP_CATALOG };
