# -*- coding: utf-8 -*-

# FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
# blazeos.com.tr - https://github.com/DarkMorpheus-pc
# (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.

#
# FireHub icin Pisi Linux paketleme betigi.
#
# pisilinux/chroot Docker/Podman imajinda `pisi build --ignore-safety -y
# pspec.xml` ile GERCEKTEN TEST EDILDI VE BASARILI OLDU (2026-08-15).
#
# Elektron uygulamasi burada DERLENMIYOR — electron-builder zaten onceden
# derleyip hazirladigi icin (bkz. pspec.xml'deki Archive), install() sadece
# hazir dosyalari doğru yerlere kopyaliyor. Bu yuzden setup()/build() yok.
#
# install() calisirken CWD, extract edilmis kaynak klasorunun icinde olur
# (/var/pisi/<pkg>/work/firehub-1.8.0). get.srcDIR() bu klasorun sadece ADINI
# (bir yol degil) dondurur — o yuzden asagida dogrudan CWD'ye goreli yollar
# kullaniliyor. pspec.xml'deki <AdditionalFiles>, firehub.desktop/firehub.png
# dosyalarini pisi build sirasinda otomatik olarak bu AYNI CWD'ye kopyalar
# (bkz. pspec.xml'deki not) — ikisi de bizzat test edilerek dogrulandi.

from pisi.actionsapi import pisitools
from pisi.actionsapi import shelltools
from pisi.actionsapi import get


def install():
    # electron-builder'in tar.gz ciktisi tek bir ust klasor icinde gelir
    # (ornegin "firehub-1.8.0/"), icinde firehub binary'si + Electron/Chromium
    # dosyalari duz halde bulunur. AdditionalFiles ile gelen firehub.desktop/
    # firehub.png de CWD'de oldugu icin, onlari /opt/FireHub'a KOPYALAMAMAK
    # icin app dosyalarini kopyaladiktan SONRA siliyoruz (asagida).
    pisitools.dodir("/opt/FireHub")
    shelltools.system('bash -c "cp -a * %s/opt/FireHub/"' % get.installDIR())
    shelltools.system('bash -c "rm -f %s/opt/FireHub/firehub.desktop %s/opt/FireHub/firehub.png"'
                       % (get.installDIR(), get.installDIR()))

    # chrome-sandbox: Electron'un OS-seviyesi sandbox'i icin sart (bkz.
    # electron/main.js'teki webPreferences.sandbox). electron-builder'in .deb
    # postinst'i kernel user-namespace destegine gore kosullu davraniyor
    # (destekliyorsa duz 0755, desteklemiyorsa setuid 4755) — burada basitlik
    # icin HER ZAMAN 4755 kullaniliyor; iki durumda da sandbox calisir, tek
    # fark modern cekirdeklerde daha az yaygin olan (setuid) yolun
    # kullanilmasi. Calistigi dogrulandiktan sonra, gercek kosullu davranis
    # icin bir comar postInstall script'ine tasinabilir.
    shelltools.system('chmod 4755 "%s/opt/FireHub/chrome-sandbox"' % get.installDIR())
    shelltools.system('chmod 0755 "%s/opt/FireHub/firehub"' % get.installDIR())

    # /usr/bin uzerinden calistirilabilir olmasi icin sembolik link.
    pisitools.dodir("/usr/bin")
    pisitools.dosym("/opt/FireHub/firehub", "/usr/bin/firehub")

    # .desktop girisi ve ikon — AdditionalFiles tarafindan CWD'ye zaten
    # kopyalandi, o yuzden duz dosya adiyla referans yeterli.
    pisitools.insinto("/usr/share/applications", "firehub.desktop")
    pisitools.insinto("/usr/share/icons/hicolor/512x512/apps", "firehub.png")
