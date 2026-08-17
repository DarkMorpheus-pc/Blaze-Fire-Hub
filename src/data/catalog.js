/*
 * FireHub — BlazeOS icin DarkMorpheus (Bulut Ars. E.) tarafindan gelistirilmistir.
 * blazeos.com.tr - https://github.com/DarkMorpheus-pc
 * (c) Bulut Arslan Ergun — Bu program ozgur yazilimdir: GNU GPL v3.0 kosullari altinda yeniden dagitabilir ve/veya degistirebilirsiniz. Hicbir garanti verilmez; ayrintilar icin LICENSE dosyasina bakin.
 */

// FireHub — Arayüz Uygulama Kataloğu (Renderer Catalog)
// BlazeOS için tasarlanmış 80+ zengin uygulama koleksiyonu

export const APP_CATALOG = {
  // === BROWSERS ===
  firefox: {
    id: "firefox",
    name: "Mozilla Firefox",
    dev: "Mozilla Foundation",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "all",
    sz: 88,
    dn: "18.5M",
    ag: "4+",
    vr: "128.0.3",
    li: "MPL 2.0",
    src: "https://www.mozilla.org/firefox/",
    sn: "Özgür, hızlı ve gizlilik odaklı web tarayıcısı.",
    ds: "Mozilla Firefox, kullanıcı gizliliğini ilk sıraya koyan, güçlü reklam engelleme eklenti desteğine sahip bağımsız ve açık kaynaklı bir web tarayıcısıdır.",
    ic: '<i class="ti ti-brand-firefox"></i>',
    co: "ico-orange",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["browser", "privacy", "web", "mozilla"],
    screenshots: [
      "https://dl.flathub.org/media/org.mozilla.firefox-stable/1248x702/org.mozilla.firefox-af5d1ae7c121ea4864b3c5a1098f8f9c.png",
      "https://dl.flathub.org/media/org.mozilla.firefox-stable/1248x702/org.mozilla.firefox-c6f98b38b8b28b113a75a6b34037b759.png",
      "https://dl.flathub.org/media/org.mozilla.firefox-stable/1248x702/org.mozilla.firefox-60e855c1f4180607e40c9762a0fb9fa6.png"
    ],
    detect: { linux: "firefox", flatpakId: "org.mozilla.firefox" },
    install: {
      fedora: { type: "pkg", value: "firefox" },
      pisi: { type: "pkg", value: "firefox" },
      debian: { type: "pkg", value: "firefox" },
      windows: { type: "url", value: "https://download.mozilla.org/?product=firefox-latest&os=win64&lang=en-US", ext: ".exe" }
    }
  },
  brave: {
    id: "brave",
    name: "Brave Browser",
    dev: "Brave Software",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "top",
    sz: 110,
    dn: "9.2M",
    ag: "4+",
    vr: "1.68.128",
    li: "MPL 2.0",
    src: "https://brave.com/",
    sn: "Otomatik reklam ve izleyici engellemeli hızlı tarayıcı.",
    ds: "Brave, varsayılan olarak reklamları ve izleyicileri engelleyen, sayfa yükleme hızını katlayan Chromium tabanlı modern bir web tarayıcısıdır.",
    ic: '<i class="ti ti-shield-code"></i>',
    co: "ico-coral",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["browser", "crypto", "adblock", "privacy"],
    screenshots: [
      "https://dl.flathub.org/media/com/brave/Browser/94f633aaad7b8a1567a2f56b38c54fc2/screenshots/image-1_1248x877@1.png",
      "https://dl.flathub.org/media/com/brave/Browser/94f633aaad7b8a1567a2f56b38c54fc2/screenshots/image-2_1248x789@1.png"
    ],
    detect: { linux: "brave-browser", flatpakId: "com.brave.Browser" },
    install: {
      fedora: { type: "flatpak", value: "com.brave.Browser" },
      pisi: { type: "flatpak", value: "com.brave.Browser" },
      debian: { type: "flatpak", value: "com.brave.Browser" },
      windows: { type: "url", value: "https://laptop-updates.brave.com/latest/winx64", ext: ".exe" }
    }
  },
  chromium: {
    id: "chromium",
    name: "Chromium",
    dev: "Chromium Authors",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "all",
    sz: 135,
    dn: "6.4M",
    ag: "4+",
    vr: "127.0.6533",
    li: "BSD-3-Clause",
    src: "https://www.chromium.org/",
    sn: "Google Chrome'un açık kaynak kodlu temel altyapısı.",
    ds: "Chromium, Chrome ve birçok modern tarayıcının altyapısını oluşturan, yüksek performanslı açık kaynaklı tarayıcı projesidir.",
    ic: '<i class="ti ti-brand-chrome"></i>',
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["browser", "chromium", "open-source"],
    screenshots: [
      "https://dl.flathub.org/media/org/chromium/Chromium/682a2b6f2969e4a19da7b69af2f9d617/screenshots/image-1_1248x702@1.png"
    ],
    detect: { linux: "chromium-browser", flatpakId: "org.chromium.Chromium" },
    install: {
      fedora: { type: "pkg", value: "chromium" },
      pisi: { type: "flatpak", value: "org.chromium.Chromium" },
      debian: { type: "pkg", value: "chromium-browser" }
    }
  },
  vivaldi: {
    id: "vivaldi",
    name: "Vivaldi Browser",
    dev: "Vivaldi Technologies",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "all",
    sz: 140,
    dn: "3.1M",
    ag: "4+",
    vr: "6.8.3381",
    li: "Proprietary",
    src: "https://vivaldi.com/",
    sn: "Sınırsız özelleştirme olanağı sunan güç harikası tarayıcı.",
    ds: "Vivaldi, sekmelerinizi gruplama, dahili notlar alma ve arayüzü dilediğiniz gibi kişiselleştirme imkanı veren güç kullanıcılarına özel tarayıcıdır.",
    ic: '<i class="ti ti-world"></i>',
    co: "ico-rose",
    tr: [["ver", "circle-check-filled", "ver"], ["warn", "shield-alert", "warn"]],
    tags: ["browser", "customization", "power-user"],
    screenshots: [
      "https://dl.flathub.org/media/com/vivaldi/Vivaldi/55533477763ff67b77617568fb690498/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/com/vivaldi/Vivaldi/55533477763ff67b77617568fb690498/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/com/vivaldi/Vivaldi/55533477763ff67b77617568fb690498/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/com/vivaldi/Vivaldi/55533477763ff67b77617568fb690498/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "vivaldi", flatpakId: "com.vivaldi.Vivaldi" },
    install: {
      fedora: { type: "flatpak", value: "com.vivaldi.Vivaldi" },
      pisi: { type: "flatpak", value: "com.vivaldi.Vivaldi" },
      debian: { type: "flatpak", value: "com.vivaldi.Vivaldi" }
    }
  },
  torbrowser: {
    id: "torbrowser",
    name: "Tor Browser",
    dev: "The Tor Project",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "top",
    sz: 95,
    dn: "4.8M",
    ag: "16+",
    vr: "13.5.2",
    li: "BSD-3-Clause",
    src: "https://www.torproject.org/",
    sn: "Anonim gezinme ve sansürsüz internet erişimi.",
    ds: "Tor Browser, internet trafiğinizi şifreli Tor ağı üzerinden yönlendirerek kimliğinizi gizler ve çevrimiçi gözetimden korur.",
    ic: '<i class="ti ti-lock-access"></i>',
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["browser", "tor", "privacy", "security", "onion"],
    screenshots: [
      "https://dl.flathub.org/media/org/torproject/torbrowser-launcher/8bbf3d7c3768830e11a10b6b47366829/screenshots/image-1_orig.png"
    ],
    detect: { linux: "torbrowser-launcher", flatpakId: "org.torproject.torbrowser-launcher" },
    install: {
      fedora: { type: "flatpak", value: "org.torproject.torbrowser-launcher" },
      pisi: { type: "flatpak", value: "org.torproject.torbrowser-launcher" },
      debian: { type: "flatpak", value: "org.torproject.torbrowser-launcher" }
    }
  },
  librewolf: {
    id: "librewolf",
    name: "LibreWolf",
    dev: "LibreWolf Community",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "all",
    sz: 82,
    dn: "1.9M",
    ag: "4+",
    vr: "128.0.3-1",
    li: "MPL 2.0",
    src: "https://librewolf.net/",
    sn: "Telemetri barındırmayan, sertleştirilmiş Firefox çatalı.",
    ds: "LibreWolf, tüm telemetri ve izleyicilerden arındırılmış, kutudan çıktığı gibi en yüksek gizlilik ayarlarıyla gelen bağımsız tarayıcıdır.",
    ic: '<i class="ti ti-brand-firefox"></i>',
    co: "ico-cyan",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["browser", "firefox", "privacy", "hardened"],
    screenshots: [
      "https://dl.flathub.org/media/io/gitlab/librewolf-community/35e40ff00f85e575df067df656282bdb/screenshots/image-1_orig.png"
    ],
    detect: { linux: "librewolf", flatpakId: "io.gitlab.librewolf-community" },
    install: {
      fedora: { type: "flatpak", value: "io.gitlab.librewolf-community" },
      pisi: { type: "flatpak", value: "io.gitlab.librewolf-community" },
      debian: { type: "flatpak", value: "io.gitlab.librewolf-community" }
    }
  },

  // === DEVELOPER TOOLS ===
  vscode: {
    id: "vscode",
    name: "Visual Studio Code",
    dev: "Microsoft",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 125,
    dn: "24.1M",
    ag: "4+",
    vr: "1.92.0",
    li: "MIT / Proprietary",
    src: "https://code.visualstudio.com/",
    sn: "Dünyanın en popüler kaynak kod editörü ve IDE altyapısı.",
    ds: "Visual Studio Code; zengin eklenti ekosistemi, dahili Git entegrasyonu, hata ayıklayıcı (debugger) ve akıllı kod tamamlama (IntelliSense) yetenekleriyle yazılımcıların vazgeçilmezidir.",
    ic: '<i class="ti ti-brand-vscode"></i>',
    co: "ico-blue",
    tr: [["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["code", "editor", "ide", "vscode", "javascript", "python"],
    screenshots: [
      "https://dl.flathub.org/media/com/visualstudio/code/d086e55a35042d29ac5741e927b0d76f/screenshots/image-1_1248x678@1.png"
    ],
    detect: { linux: "code", flatpakId: "com.visualstudio.code" },
    install: {
      fedora: { type: "url", value: "https://update.code.visualstudio.com/latest/linux-rpm-x64/stable", ext: ".rpm" },
      pisi: { type: "flatpak", value: "com.visualstudio.code" },
      debian: { type: "url", value: "https://update.code.visualstudio.com/latest/linux-deb-x64/stable", ext: ".deb" },
      windows: { type: "url", value: "https://update.code.visualstudio.com/latest/win32-x64-user/stable", ext: ".exe" }
    }
  },
  vscodium: {
    id: "vscodium",
    name: "VSCodium",
    dev: "VSCodium Team",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 118,
    dn: "3.4M",
    ag: "4+",
    vr: "1.92.0",
    li: "MIT",
    src: "https://vscodium.com/",
    sn: "Telemetrisiz ve %100 açık kaynaklı VS Code dağıtımı.",
    ds: "VSCodium, Microsoft'un VS Code kaynak kodlarından derlenen, telemetri ve lisans kısıtlamalarından arındırılmış tam açık kaynaklı kod editörüdür.",
    ic: '<i class="ti ti-code"></i>',
    co: "ico-teal",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["code", "editor", "open-source", "telemetry-free"],
    screenshots: [
      "https://dl.flathub.org/media/com/vscodium/codium/0127475b4272afb034a4cc24582bf123/screenshots/image-1_1248x840@1.png",
      "https://dl.flathub.org/media/com/vscodium/codium/0127475b4272afb034a4cc24582bf123/screenshots/image-2_1248x840@1.png",
      "https://dl.flathub.org/media/com/vscodium/codium/0127475b4272afb034a4cc24582bf123/screenshots/image-3_1248x798@1.png",
      "https://dl.flathub.org/media/com/vscodium/codium/0127475b4272afb034a4cc24582bf123/screenshots/image-4_1248x840@1.png"
    ],
    detect: { linux: "codium", flatpakId: "com.vscodium.codium" },
    install: {
      fedora: { type: "flatpak", value: "com.vscodium.codium" },
      pisi: { type: "flatpak", value: "com.vscodium.codium" },
      debian: { type: "flatpak", value: "com.vscodium.codium" }
    }
  },
  sublimetext: {
    id: "sublimetext",
    name: "Sublime Text",
    dev: "Sublime HQ",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 45,
    dn: "8.7M",
    ag: "4+",
    vr: "Build 4169",
    li: "Proprietary",
    src: "https://www.sublimetext.com/",
    sn: "Işık hızında çalışan, hafif metin ve kod editörü.",
    ds: "Sublime Text, milisaniyeler içinde açılan, GPU hızlandırmalı işleme motoruna sahip, aşırı hızlı ve estetik bir kod düzenleyicidir.",
    ic: '<i class="ti ti-brand-sublime-text"></i>',
    co: "ico-orange",
    tr: [["ver", "circle-check-filled", "ver"]],
    tags: ["editor", "text", "fast", "sublime"],
    screenshots: [
      "https://dl.flathub.org/repo/screenshots/com.sublimetext.three-stable/1248x702/com.sublimetext.three-d90413c8f5448ae4271976b94abd2d06.png"
    ],
    detect: { linux: "subl", flatpakId: "com.sublimetext.three" },
    install: {
      fedora: { type: "flatpak", value: "com.sublimetext.three" },
      pisi: { type: "flatpak", value: "com.sublimetext.three" },
      debian: { type: "flatpak", value: "com.sublimetext.three" }
    }
  },
  intellij: {
    id: "intellij",
    name: "IntelliJ IDEA Community",
    dev: "JetBrains",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 820,
    dn: "7.1M",
    ag: "4+",
    vr: "2024.1.4",
    li: "Apache 2.0",
    src: "https://www.jetbrains.com/idea/",
    sn: "Java, Kotlin ve JVM dilleri için lider entegre geliştirme ortamı.",
    ds: "IntelliJ IDEA, akıllı kod analizi, refactoring araçları, Maven/Gradle desteği ile Java ve Android geliştiricilerinin standart IDE'sidir.",
    ic: '<i class="ti ti-box"></i>',
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["ide", "java", "kotlin", "jetbrains"],
    screenshots: [
      "https://dl.flathub.org/media/com/jetbrains/IntelliJ-IDEA-Community/e07ee33d43eb28d5220f6c361931a3e8/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/com/jetbrains/IntelliJ-IDEA-Community/e07ee33d43eb28d5220f6c361931a3e8/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/com/jetbrains/IntelliJ-IDEA-Community/e07ee33d43eb28d5220f6c361931a3e8/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/com/jetbrains/IntelliJ-IDEA-Community/e07ee33d43eb28d5220f6c361931a3e8/screenshots/image-4_orig.png"
    ],
    detect: { linux: "idea", flatpakId: "com.jetbrains.IntelliJ-IDEA-Community" },
    install: {
      fedora: { type: "flatpak", value: "com.jetbrains.IntelliJ-IDEA-Community" },
      pisi: { type: "flatpak", value: "com.jetbrains.IntelliJ-IDEA-Community" },
      debian: { type: "flatpak", value: "com.jetbrains.IntelliJ-IDEA-Community" }
    }
  },
  pycharm: {
    id: "pycharm",
    name: "PyCharm Community",
    dev: "JetBrains",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 750,
    dn: "6.8M",
    ag: "4+",
    vr: "2024.1.3",
    li: "Apache 2.0",
    src: "https://www.jetbrains.com/pycharm/",
    sn: "Python geliştiricileri için profesyonel IDE.",
    ds: "PyCharm, akıllı kod tamamlama, sanal ortam (venv) yönetimi, hata ayıklama ve Git entegrasyonuyla Python projenizi hızlandırır.",
    ic: '<i class="ti ti-brand-python"></i>',
    co: "ico-green",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["python", "ide", "data-science", "jetbrains"],
    screenshots: [
      "https://dl.flathub.org/media/com/jetbrains/PyCharm-Community/4f780a66e7914489a1010d29a3b4bc0d/screenshots/image-2_1248x728@1.webp"
    ],
    detect: { linux: "pycharm-community", flatpakId: "com.jetbrains.PyCharm-Community" },
    install: {
      fedora: { type: "flatpak", value: "com.jetbrains.PyCharm-Community" },
      pisi: { type: "flatpak", value: "com.jetbrains.PyCharm-Community" },
      debian: { type: "flatpak", value: "com.jetbrains.PyCharm-Community" }
    }
  },
  postman: {
    id: "postman",
    name: "Postman",
    dev: "Postman Inc.",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 160,
    dn: "11.2M",
    ag: "4+",
    vr: "11.2.0",
    li: "Proprietary",
    src: "https://www.postman.com/",
    sn: "API geliştirme, test ve dokümantasyon platformu.",
    ds: "Postman, REST, GraphQL ve gRPC API'lerini oluşturma, test etme, mock sunucuları çalıştırma ve ekip çalışmasını yönetme standart ortamıdır.",
    ic: '<i class="ti ti-api"></i>',
    co: "ico-orange",
    tr: [["ver", "circle-check-filled", "ver"]],
    tags: ["api", "rest", "graphql", "testing"],
    screenshots: [
      "https://dl.flathub.org/media/com/getpostman/Postman/ef89f603ab1afb7ff81954009dcee935/screenshots/image-1_1248x780@1.png"
    ],
    detect: { linux: "postman", flatpakId: "com.getpostman.Postman" },
    install: {
      fedora: { type: "flatpak", value: "com.getpostman.Postman" },
      pisi: { type: "flatpak", value: "com.getpostman.Postman" },
      debian: { type: "flatpak", value: "com.getpostman.Postman" }
    }
  },
  insomnia: {
    id: "insomnia",
    name: "Insomnia API Client",
    dev: "Kong Inc.",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 145,
    dn: "3.9M",
    ag: "4+",
    vr: "9.3.2",
    li: "MIT",
    src: "https://insomnia.rest/",
    sn: "Açık kaynaklı, zarif ve hızlı REST / GraphQL istemcisi.",
    ds: "Insomnia, HTTP, REST, GraphQL, gRPC ve WebSocket isteklerini kolayca test etmenizi sağlayan şık bir masaüstü uygulamasıdır.",
    ic: '<i class="ti ti-network"></i>',
    co: "ico-indigo",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["api", "rest", "graphql", "insomnia"],
    screenshots: [
      "https://dl.flathub.org/media/rest/insomnia/Insomnia/89eee078bfa80a2ae1376a776f7fc5ed/screenshots/image-1_1248x701@1.png"
    ],
    detect: { linux: "insomnia", flatpakId: "rest.insomnia.Insomnia" },
    install: {
      fedora: { type: "flatpak", value: "rest.insomnia.Insomnia" },
      pisi: { type: "flatpak", value: "rest.insomnia.Insomnia" },
      debian: { type: "flatpak", value: "rest.insomnia.Insomnia" }
    }
  },
  docker: {
    id: "docker",
    name: "Docker Desktop",
    dev: "Docker Inc.",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 480,
    dn: "15.6M",
    ag: "4+",
    vr: "4.32.0",
    li: "Apache 2.0 / Commercial",
    src: "https://www.docker.com/",
    sn: "Konteynerleştirme ve mikroservis geliştirme platformu.",
    ds: "Docker Desktop, uygulamalarınızı ve bağımlılıklarını izole konteynerlar (container) halinde çalıştırmanıza, derlemenize ve paylaşmanıza imkan tanır.",
    ic: '<i class="ti ti-brand-docker"></i>',
    co: "ico-blue",
    tr: [["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["docker", "container", "devops", "kubernetes"],
    detect: { linux: "docker" },
    install: {
      fedora: { type: "pkg", value: "docker-ce" },
      debian: { type: "pkg", value: "docker.io" }
    }
  },
  dbeaver: {
    id: "dbeaver",
    name: "DBeaver Community",
    dev: "DBeaver Corp",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 130,
    dn: "5.3M",
    ag: "4+",
    vr: "24.1.3",
    li: "Apache 2.0",
    src: "https://dbeaver.io/",
    sn: "Evrensel veritabanı yönetim aracı (SQL & NoSQL).",
    ds: "DBeaver; PostgreSQL, MySQL, SQLite, Oracle, MongoDB ve Redis gibi onlarca veritabanı sistemine bağlanıp sorgu çalıştırma ve şema yönetimi yapmanızı sağlar.",
    ic: '<i class="ti ti-database"></i>',
    co: "ico-amber",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["database", "sql", "postgres", "mysql", "nosql"],
    screenshots: [
      "https://dl.flathub.org/media/io/dbeaver/DBeaverCommunity/d9ccde93fc544a9e1a953763018af3f6/screenshots/image-1_1248x674@1.png",
      "https://dl.flathub.org/media/io/dbeaver/DBeaverCommunity/d9ccde93fc544a9e1a953763018af3f6/screenshots/image-2_1248x669@1.png",
      "https://dl.flathub.org/media/io/dbeaver/DBeaverCommunity/d9ccde93fc544a9e1a953763018af3f6/screenshots/image-3_1248x668@1.png",
      "https://dl.flathub.org/media/io/dbeaver/DBeaverCommunity/d9ccde93fc544a9e1a953763018af3f6/screenshots/image-4_1248x669@1.png"
    ],
    detect: { linux: "dbeaver", flatpakId: "io.dbeaver.DBeaverCommunity" },
    install: {
      fedora: { type: "flatpak", value: "io.dbeaver.DBeaverCommunity" },
      pisi: { type: "flatpak", value: "io.dbeaver.DBeaverCommunity" },
      debian: { type: "flatpak", value: "io.dbeaver.DBeaverCommunity" }
    }
  },
  zed: {
    id: "zed",
    name: "Zed Editor",
    dev: "Zed Industries",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 65,
    dn: "1.2M",
    ag: "4+",
    vr: "0.143.6",
    li: "GPL-3.0",
    src: "https://zed.dev/",
    sn: "Rust diliyle yazılmış, ışık hızında ultra modern kod editörü.",
    ds: "Zed, GPU hızlandırmalı render motoru ve eşzamanlı çok oyunculu (pair programming) kodlama yetenekleriyle neslin en hızlı editörüdür.",
    ic: '<i class="ti ti-bolt"></i>',
    co: "ico-cyan",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["editor", "rust", "ultra-fast", "zed"],
    screenshots: [
      "https://dl.flathub.org/media/dev/zed/Zed/3a196722ea69b393a44703e93e967650/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/dev/zed/Zed/3a196722ea69b393a44703e93e967650/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/dev/zed/Zed/3a196722ea69b393a44703e93e967650/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/dev/zed/Zed/3a196722ea69b393a44703e93e967650/screenshots/image-4_orig.png"
    ],
    detect: { linux: "zed", flatpakId: "dev.zed.Zed" },
    install: {
      fedora: { type: "flatpak", value: "dev.zed.Zed" },
      pisi: { type: "flatpak", value: "dev.zed.Zed" },
      debian: { type: "flatpak", value: "dev.zed.Zed" }
    }
  },

  // === PRODUCTIVITY & OFFICE ===
  libreoffice: {
    id: "libreoffice",
    name: "LibreOffice",
    dev: "The Document Foundation",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 310,
    dn: "32.0M",
    ag: "4+",
    vr: "24.2.5",
    li: "MPL 2.0",
    src: "https://www.libreoffice.org/",
    sn: "Güçlü, özgür ve açık kaynaklı tam ofis yazılım paketi.",
    ds: "LibreOffice; Writer (Kelime İşlemci), Calc (Hesap Tablosu), Impress (Sunum), Draw (Çizim) ve Math (Matematiksel Formüller) uygulamalarını içeren eksiksiz bir ofis çözümüdür.",
    ic: '<i class="ti ti-file-text"></i>',
    co: "ico-green",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["office", "word", "excel", "documents", "libreoffice"],
    screenshots: [
      "https://dl.flathub.org/media/org/libreoffice/LibreOffice/e2dd1535deab581be24dcbaab39ed8f5/screenshots/image-1_1248x873@1.png",
      "https://dl.flathub.org/media/org/libreoffice/LibreOffice/e2dd1535deab581be24dcbaab39ed8f5/screenshots/image-2_1248x724@1.png",
      "https://dl.flathub.org/media/org/libreoffice/LibreOffice/e2dd1535deab581be24dcbaab39ed8f5/screenshots/image-3_1248x906@1.png",
      "https://dl.flathub.org/media/org/libreoffice/LibreOffice/e2dd1535deab581be24dcbaab39ed8f5/screenshots/image-4_1248x826@1.png"
    ],
    detect: { linux: "libreoffice", flatpakId: "org.libreoffice.LibreOffice" },
    install: {
      fedora: { type: "pkg", value: "libreoffice" },
      pisi: { type: "pkg", value: "libreoffice" },
      debian: { type: "pkg", value: "libreoffice" }
    }
  },
  onlyoffice: {
    id: "onlyoffice",
    name: "ONLYOFFICE Desktop Editors",
    dev: "Ascensio System SIA",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 280,
    dn: "8.4M",
    ag: "4+",
    vr: "8.1.0",
    li: "AGPLv3",
    src: "https://www.onlyoffice.com/",
    sn: "MS Office formatlarıyla %100 uyumlu gelişmiş ofis paketi.",
    ds: "ONLYOFFICE; docx, xlsx ve pptx dosyalarını bozulmadan düzenleyebilen, şık Material arayüze sahip kapsamlı bir masaüstü ofis paketidir.",
    ic: '<i class="ti ti-table"></i>',
    co: "ico-coral",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["office", "docx", "xlsx", "compatibility"],
    screenshots: [
      "https://dl.flathub.org/media/org/onlyoffice/desktopeditors/5602da018a6ffaae80da2f668f0113e0/screenshots/image-1_1248x873@1.png",
      "https://dl.flathub.org/media/org/onlyoffice/desktopeditors/5602da018a6ffaae80da2f668f0113e0/screenshots/image-2_1248x873@1.png",
      "https://dl.flathub.org/media/org/onlyoffice/desktopeditors/5602da018a6ffaae80da2f668f0113e0/screenshots/image-3_1248x873@1.png",
      "https://dl.flathub.org/media/org/onlyoffice/desktopeditors/5602da018a6ffaae80da2f668f0113e0/screenshots/image-4_1248x873@1.png"
    ],
    detect: { linux: "onlyoffice-desktopeditors", flatpakId: "org.onlyoffice.desktopeditors" },
    install: {
      fedora: { type: "flatpak", value: "org.onlyoffice.desktopeditors" },
      pisi: { type: "flatpak", value: "org.onlyoffice.desktopeditors" },
      debian: { type: "flatpak", value: "org.onlyoffice.desktopeditors" }
    }
  },
  obsidian: {
    id: "obsidian",
    name: "Obsidian",
    dev: "Dynalist Inc.",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "top",
    sz: 90,
    dn: "14.2M",
    ag: "4+",
    vr: "1.6.7",
    li: "Freeware / Commercial",
    src: "https://obsidian.md/",
    sn: "İkinci beyniniz: Markdown tabanlı bilgi ağı ve not alma uygulaması.",
    ds: "Obsidian, notlarınızı yerel dosya sisteminizde Markdown formatında saklayan, zihin haritaları (graph view) ve zengin eklentileriyle düşüncelerinizi bağlayan güçlü bir not sistemidir.",
    ic: '<i class="ti ti-notes"></i>',
    co: "ico-purple",
    tr: [["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["notes", "markdown", "knowledge", "pkm"],
    screenshots: [
      "https://dl.flathub.org/media/md/obsidian/Obsidian/56e379aaf3973395285fb351884e0fb9/screenshots/image-1_1248x661@1.png",
      "https://dl.flathub.org/media/md/obsidian/Obsidian/56e379aaf3973395285fb351884e0fb9/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/md/obsidian/Obsidian/56e379aaf3973395285fb351884e0fb9/screenshots/image-3_1248x873@1.png",
      "https://dl.flathub.org/media/md/obsidian/Obsidian/56e379aaf3973395285fb351884e0fb9/screenshots/image-4_1248x835@1.png"
    ],
    detect: { linux: "obsidian", flatpakId: "md.obsidian.Obsidian" },
    install: {
      fedora: { type: "flatpak", value: "md.obsidian.Obsidian" },
      pisi: { type: "flatpak", value: "md.obsidian.Obsidian" },
      debian: { type: "flatpak", value: "md.obsidian.Obsidian" },
      windows: { type: "url", value: "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.6.7/Obsidian-1.6.7.exe", ext: ".exe" }
    }
  },
  joplin: {
    id: "joplin",
    name: "Joplin",
    dev: "Laurent Cozic",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 105,
    dn: "4.1M",
    ag: "4+",
    vr: "2.14.20",
    li: "MIT",
    src: "https://joplinapp.org/",
    sn: "Uçtan uca şifreli, açık kaynaklı not ve görev yöneticisi.",
    ds: "Joplin; Nextcloud, Dropbox veya OneDrive üzerinden senkronize olabilen, Markdown ve yapılacaklar listeleri destekleyen güvenli bir not uygulamasıdır.",
    ic: '<i class="ti ti-notebook"></i>',
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["notes", "todo", "encryption", "sync"],
    screenshots: [
      "https://dl.flathub.org/media/net/cozic/joplin_desktop/0c54b6a3692520386643044ae30f6cae/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/net/cozic/joplin_desktop/0c54b6a3692520386643044ae30f6cae/screenshots/image-2_1248x1008@1.png",
      "https://dl.flathub.org/media/net/cozic/joplin_desktop/0c54b6a3692520386643044ae30f6cae/screenshots/image-3_1248x972@1.png"
    ],
    detect: { linux: "joplin", flatpakId: "net.cozic.joplin_desktop" },
    install: {
      fedora: { type: "flatpak", value: "net.cozic.joplin_desktop" },
      pisi: { type: "flatpak", value: "net.cozic.joplin_desktop" },
      debian: { type: "flatpak", value: "net.cozic.joplin_desktop" }
    }
  },
  thunderbird: {
    id: "thunderbird",
    name: "Mozilla Thunderbird",
    dev: "MZLA Technologies",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 95,
    dn: "16.8M",
    ag: "4+",
    vr: "115.13.0",
    li: "MPL 2.0",
    src: "https://www.thunderbird.net/",
    sn: "E-posta, takvim ve kişilerinizi yöneten açık kaynak istemci.",
    ds: "Thunderbird, birden fazla e-posta hesabını OpenPGP şifreleme, entegre takvim, sohbet ve görev yönetimi ile tek çatı altında toplayan güçlü bir iletişim merkezidir.",
    ic: '<i class="ti ti-mail"></i>',
    co: "ico-indigo",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["email", "calendar", "mail", "thunderbird"],
    screenshots: [
      "https://dl.flathub.org/media/org.mozilla.Thunderbird-stable/1248x702/org.mozilla.Thunderbird-6d680df8fa5a1a0c374882c019e09714.png",
      "https://dl.flathub.org/media/org.mozilla.Thunderbird-stable/1248x702/org.mozilla.Thunderbird-70c1d7576c238e58e02e7ae0fcb7906b.png"
    ],
    detect: { linux: "thunderbird", flatpakId: "org.mozilla.Thunderbird" },
    install: {
      fedora: { type: "pkg", value: "thunderbird" },
      pisi: { type: "pkg", value: "thunderbird" },
      debian: { type: "pkg", value: "thunderbird" }
    }
  },

  // === DESIGN, PHOTO & 3D ===
  blender: {
    id: "blender",
    name: "Blender",
    dev: "Blender Foundation",
    cat: "Tasarım & 3D",
    scatKey: "cat.design",
    tab: "design",
    sz: 340,
    dn: "21.5M",
    ag: "4+",
    vr: "4.2.0",
    li: "GPL-3.0",
    src: "https://www.blender.org/",
    sn: "Dünya standartlarında 3D modelleme, animasyon ve render stüdyosu.",
    ds: "Blender; 3D modelleme, heykel (sculpting), VFX birleştirme, video düzenleme, fizik simülasyonları ve Cycles/EEVEE render motorlarıyla eksiksiz açık kaynaklı bir prodüksiyon paketidir.",
    ic: '<i class="ti ti-brand-blender"></i>',
    co: "ico-orange",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["3d", "animation", "rendering", "vfx", "blender"],
    screenshots: [
      "https://dl.flathub.org/media/org/blender/Blender/c6b07403115901571923d99f1b725b0e/screenshots/image-1_1248x703@1.png",
      "https://dl.flathub.org/media/org/blender/Blender/c6b07403115901571923d99f1b725b0e/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/org/blender/Blender/c6b07403115901571923d99f1b725b0e/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/org/blender/Blender/c6b07403115901571923d99f1b725b0e/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "blender", flatpakId: "org.blender.Blender" },
    install: {
      fedora: { type: "flatpak", value: "org.blender.Blender" },
      pisi: { type: "pkg", value: "blender" },
      debian: { type: "flatpak", value: "org.blender.Blender" },
      windows: { type: "url", value: "https://download.blender.org/release/Blender4.2/blender-4.2.1-windows-x64.msi", ext: ".msi" }
    }
  },
  gimp: {
    id: "gimp",
    name: "GIMP",
    dev: "GIMP Development Team",
    cat: "Tasarım & Fotoğraf",
    scatKey: "cat.design",
    tab: "design",
    sz: 180,
    dn: "28.3M",
    ag: "4+",
    vr: "2.10.38",
    li: "GPL-3.0",
    src: "https://www.gimp.org/",
    sn: "Özgür ve profesyonel görüntü düzenleme yazılımı.",
    ds: "GIMP (GNU Image Manipulation Program); fotoğraf rötuşlama, görsel kompozisyon oluşturma, grafik tasarım ve renk düzeltme için gelişmiş araçlar sunan efsanevi açık kaynak uygulamadır.",
    ic: '<i class="ti ti-photo"></i>',
    co: "ico-amber",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["photo", "editor", "photoshop-alternative", "gimp"],
    screenshots: [
      "https://dl.flathub.org/media/org/gimp/GIMP/ab48223ba11e3bad9493fcda45e9ac04/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/org/gimp/GIMP/ab48223ba11e3bad9493fcda45e9ac04/screenshots/image-2_1248x681@1.png",
      "https://dl.flathub.org/media/org/gimp/GIMP/ab48223ba11e3bad9493fcda45e9ac04/screenshots/image-3_1248x681@1.png",
      "https://dl.flathub.org/media/org/gimp/GIMP/ab48223ba11e3bad9493fcda45e9ac04/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "gimp", flatpakId: "org.gimp.GIMP" },
    install: {
      fedora: { type: "pkg", value: "gimp" },
      pisi: { type: "pkg", value: "gimp" },
      debian: { type: "pkg", value: "gimp" },
      windows: { type: "url", value: "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe", ext: ".exe" }
    }
  },
  inkscape: {
    id: "inkscape",
    name: "Inkscape",
    dev: "Inkscape Project",
    cat: "Tasarım & Vektör",
    scatKey: "cat.design",
    tab: "design",
    sz: 120,
    dn: "14.6M",
    ag: "4+",
    vr: "1.3.2",
    li: "GPL-3.0",
    src: "https://inkscape.org/",
    sn: "SVG odaklı profesyonel vektörel grafik editörü.",
    ds: "Inkscape, Illustrator dengi nitelikte vektörel çizimler, logo tasarımları, illüstrasyonlar ve tipografi düzenlemeleri yapabileceğiniz açık kaynak standartlı bir grafik yazılımıdır.",
    ic: '<i class="ti ti-vector"></i>',
    co: "ico-cyan",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["vector", "svg", "illustrator", "design"],
    screenshots: [
      "https://dl.flathub.org/media/org/inkscape/Inkscape/d06b79da7ad6df73032683fbcf8c4d56/screenshots/image-1_1248x767@1.png",
      "https://dl.flathub.org/media/org/inkscape/Inkscape/d06b79da7ad6df73032683fbcf8c4d56/screenshots/image-2_1248x765@1.png",
      "https://dl.flathub.org/media/org/inkscape/Inkscape/d06b79da7ad6df73032683fbcf8c4d56/screenshots/image-3_1248x764@1.png",
      "https://dl.flathub.org/media/org/inkscape/Inkscape/d06b79da7ad6df73032683fbcf8c4d56/screenshots/image-4_1248x763@1.png"
    ],
    detect: { linux: "inkscape", flatpakId: "org.inkscape.Inkscape" },
    install: {
      fedora: { type: "pkg", value: "inkscape" },
      pisi: { type: "pkg", value: "inkscape" },
      debian: { type: "pkg", value: "inkscape" }
    }
  },
  krita: {
    id: "krita",
    name: "Krita",
    dev: "Krita Foundation",
    cat: "Tasarım & İllüstrasyon",
    scatKey: "cat.design",
    tab: "design",
    sz: 195,
    dn: "11.0M",
    ag: "4+",
    vr: "5.2.3",
    li: "GPL-3.0",
    src: "https://krita.org/",
    sn: "Dijital resim, illüstrasyon ve konsept sanat için fırça ustası.",
    ds: "Krita, konsept sanatçıları, illüstratörler ve 2D animatörler için özel tasarlanmış zengin fırça motorlarına ve renk paletlerine sahip profesyonel çizim programıdır.",
    ic: '<i class="ti ti-brush"></i>',
    co: "ico-rose",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["painting", "drawing", "illustration", "art", "krita"],
    screenshots: [
      "https://dl.flathub.org/media/org/kde/krita/2d1e8935a00814a3aae96df66090a85a/screenshots/image-1_1248x677@1.png",
      "https://dl.flathub.org/media/org/kde/krita/2d1e8935a00814a3aae96df66090a85a/screenshots/image-2_1248x677@1.png",
      "https://dl.flathub.org/media/org/kde/krita/2d1e8935a00814a3aae96df66090a85a/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/org/kde/krita/2d1e8935a00814a3aae96df66090a85a/screenshots/image-4_1248x677@1.png"
    ],
    detect: { linux: "krita", flatpakId: "org.kde.krita" },
    install: {
      fedora: { type: "pkg", value: "krita" },
      pisi: { type: "pkg", value: "krita" },
      debian: { type: "pkg", value: "krita" }
    }
  },

  // === GAMES & LAUNCHERS ===
  steam: {
    id: "steam",
    name: "Steam",
    dev: "Valve Corporation",
    cat: "Oyun Mağazası",
    scatKey: "cat.games",
    tab: "games",
    sz: 45,
    dn: "45.0M",
    ag: "12+",
    vr: "1.0.0.79",
    li: "Proprietary",
    src: "https://store.steampowered.com/",
    sn: "Dünyanın en büyük dijital oyun kütüphanesi ve topluluğu.",
    ds: "Steam, binlerce PC oyununu satın alma, indirme ve Proton uyumluluk katmanı sayesinde Windows oyunlarını Linux üzerinde yüksek performansla oynama imkanı sunar.",
    ic: '<i class="ti ti-brand-steam"></i>',
    co: "ico-dark",
    tr: [["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["gaming", "steam", "store", "proton"],
    screenshots: [
      "https://dl.flathub.org/media/com/valvesoftware/Steam/f0343a4b277e822cce53b904454d3a7d/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/com/valvesoftware/Steam/f0343a4b277e822cce53b904454d3a7d/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/com/valvesoftware/Steam/f0343a4b277e822cce53b904454d3a7d/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/com/valvesoftware/Steam/f0343a4b277e822cce53b904454d3a7d/screenshots/image-4_orig.png"
    ],
    detect: { linux: "steam", flatpakId: "com.valvesoftware.Steam" },
    install: {
      fedora: { type: "pkg", value: "steam", note: "RPM Fusion gerektirir." },
      pisi: { type: "flatpak", value: "com.valvesoftware.Steam" },
      debian: { type: "url", value: "https://cdn.cloudflare.steamstatic.com/client/installer/steam.deb", ext: ".deb" },
      windows: { type: "url", value: "https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe", ext: ".exe" }
    }
  },
  heroic: {
    id: "heroic",
    name: "Heroic Games Launcher",
    dev: "Heroic Games Team",
    cat: "Oyun Başlatıcı",
    scatKey: "cat.games",
    tab: "games",
    sz: 115,
    dn: "5.8M",
    ag: "12+",
    vr: "2.14.1",
    li: "GPL-3.0",
    src: "https://heroicgameslauncher.com/",
    sn: "Epic Games, GOG ve Prime Gaming kütüphaneleriniz için açık kaynak başlatıcı.",
    ds: "Heroic, Epic Games Store, GOG ve Amazon Prime hesaplarınızdaki oyunları Linux üzerinde Wine ve Proton ile sorunsuz çalıştırmanızı sağlayan modern oyun istemcisidir.",
    ic: '<i class="ti ti-device-gamepad-2"></i>',
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["epic-games", "gog", "heroic", "launcher"],
    screenshots: [
      "https://dl.flathub.org/media/com/heroicgameslauncher/hgl/7c9401fb986461cf52a549d0514c83b9/screenshots/image-1_1248x873@1.png",
      "https://dl.flathub.org/media/com/heroicgameslauncher/hgl/7c9401fb986461cf52a549d0514c83b9/screenshots/image-2_1248x873@1.png",
      "https://dl.flathub.org/media/com/heroicgameslauncher/hgl/7c9401fb986461cf52a549d0514c83b9/screenshots/image-3_1248x873@1.png",
      "https://dl.flathub.org/media/com/heroicgameslauncher/hgl/7c9401fb986461cf52a549d0514c83b9/screenshots/image-4_1248x873@1.png"
    ],
    detect: { linux: "heroic", flatpakId: "com.heroicgameslauncher.hgl" },
    install: {
      fedora: { type: "flatpak", value: "com.heroicgameslauncher.hgl" },
      pisi: { type: "flatpak", value: "com.heroicgameslauncher.hgl" },
      debian: { type: "flatpak", value: "com.heroicgameslauncher.hgl" }
    }
  },
  lutris: {
    id: "lutris",
    name: "Lutris",
    dev: "Lutris Gaming Team",
    cat: "Oyun Platformu",
    scatKey: "cat.games",
    tab: "games",
    sz: 35,
    dn: "8.2M",
    ag: "12+",
    vr: "0.5.17",
    li: "GPL-3.0",
    src: "https://lutris.net/",
    sn: "Tüm platform oyunlarınızı tek noktada toplayan açık kaynaklı istemci.",
    ds: "Lutris; Steam, EA Play, Ubisoft Connect, emülatörler ve bağımsız oyunları otomatik Wine betikleriyle yapılandırıp kolayca başlatmanızı sağlayan açık kaynaklı oyun platformudur.",
    ic: '<i class="ti ti-swords"></i>',
    co: "ico-amber",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["wine", "lutris", "emulators", "games"],
    screenshots: [
      "https://dl.flathub.org/media/net/lutris/Lutris/3cc8d32fd68604816f0a5f6872bf91b5/screenshots/image-1_1248x807@1.png"
    ],
    detect: { linux: "lutris", flatpakId: "net.lutris.Lutris" },
    install: {
      fedora: { type: "pkg", value: "lutris" },
      pisi: { type: "pkg", value: "lutris" },
      debian: { type: "pkg", value: "lutris" }
    }
  },
  bottles: {
    id: "bottles",
    name: "Bottles",
    dev: "Bottles Devs",
    cat: "Oyun & Uyum Katmanı",
    scatKey: "cat.games",
    tab: "games",
    sz: 85,
    dn: "3.7M",
    ag: "4+",
    vr: "51.11",
    li: "GPL-3.0",
    src: "https://usebottles.com/",
    sn: "Windows yazılımlarını ve oyunlarını şişelerde izole edin.",
    ds: "Bottles, Wine ortamlarını (prefix) görsel bir arayüzle kolayca yönetmenizi, bağımlılıkları yüklemenizi ve Windows uygulamalarını Linux'ta akıcı biçimde çalıştırmanızı sağlar.",
    ic: '<i class="ti ti-bottle"></i>',
    co: "ico-coral",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["wine", "windows-apps", "bottles", "compatibility"],
    screenshots: [
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-4_orig.png"
    ],
    detect: { linux: "bottles", flatpakId: "com.usebottles.bottles" },
    install: {
      fedora: { type: "flatpak", value: "com.usebottles.bottles" },
      pisi: { type: "flatpak", value: "com.usebottles.bottles" },
      debian: { type: "flatpak", value: "com.usebottles.bottles" }
    }
  },

  // === MEDIA & AUDIO/VIDEO ===
  vlc: {
    id: "vlc",
    name: "VLC Media Player",
    dev: "VideoLAN",
    cat: "Medya Oynatıcı",
    scatKey: "cat.media",
    tab: "all",
    sz: 55,
    dn: "62.0M",
    ag: "4+",
    vr: "3.0.21",
    li: "GPL-2.0",
    src: "https://www.videolan.org/vlc/",
    sn: "Her türlü video ve ses formatını ek kodek gerekmeden oynatır.",
    ds: "VLC Media Player, hemen hemen tüm medya formatlarını (MP4, MKV, AVI, FLAC, MP3 vb.) sorunsuz çalıştıran efsanevi multimedya oynatıcısıdır.",
    ic: '<i class="ti ti-player-play"></i>',
    co: "ico-orange",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["video", "player", "vlc", "audio", "codecs"],
    screenshots: [
      "https://dl.flathub.org/media/org/videolan/VLC/34e7c2b6a026c5c290606225a84582d3/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/org/videolan/VLC/34e7c2b6a026c5c290606225a84582d3/screenshots/image-2_1248x702@1.png"
    ],
    detect: { linux: "vlc", flatpakId: "org.videolan.VLC" },
    install: {
      fedora: { type: "pkg", value: "vlc", note: "RPM Fusion gerektirir." },
      pisi: { type: "pkg", value: "vlc" },
      debian: { type: "pkg", value: "vlc" },
      windows: { type: "url", value: "https://get.videolan.org/vlc/last/win64/vlc-3.0.21-win64.exe", ext: ".exe" }
    }
  },
  obs: {
    id: "obs",
    name: "OBS Studio",
    dev: "OBS Project",
    cat: "Yayın & Kayıt",
    scatKey: "cat.media",
    tab: "top",
    sz: 140,
    dn: "29.4M",
    ag: "4+",
    vr: "30.2.2",
    li: "GPL-2.0",
    src: "https://obsproject.com/",
    sn: "Canlı yayın ve ekran kaydı için açık kaynaklı lider stüdyo.",
    ds: "OBS Studio; Twitch, YouTube, Kick yayınları yapmak veya yüksek kalitede ekran ve oyun videoları kaydetmek için çok kanallı ses ve sahne geçişi sunar.",
    ic: '<i class="ti ti-video"></i>',
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["streaming", "recording", "obs", "twitch", "youtube"],
    screenshots: [
      "https://dl.flathub.org/media/com/obsproject/Studio/b24d8f7f7f9672e48342e70759b01e5e/screenshots/image-1_orig.png"
    ],
    detect: { linux: "obs", flatpakId: "com.obsproject.Studio" },
    install: {
      fedora: { type: "pkg", value: "obs-studio" },
      pisi: { type: "pkg", value: "obs-studio" },
      debian: { type: "pkg", value: "obs-studio" }
    }
  },
  handbrake: {
    id: "handbrake",
    name: "HandBrake",
    dev: "HandBrake Team",
    cat: "Video Dönüştürücü",
    scatKey: "cat.media",
    tab: "all",
    sz: 68,
    dn: "9.5M",
    ag: "4+",
    vr: "1.8.2",
    li: "GPL-2.0",
    src: "https://handbrake.fr/",
    sn: "Açık kaynaklı, yüksek performanslı video dönüştürme aracı.",
    ds: "HandBrake, videoları farklı cihazlar ve platformlar için sıkıştırmanıza, altyazı eklemenize ve H.264/H.265/AV1 formatlarına dönüştürmenize imkan tanır.",
    ic: '<i class="ti ti-movie"></i>',
    co: "ico-coral",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["video", "transcoder", "ffmpeg", "handbrake"],
    screenshots: [
      "https://dl.flathub.org/media/fr/handbrake/ghb/ba64e7a37b2b3270d6065fdca313dfa3/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/fr/handbrake/ghb/ba64e7a37b2b3270d6065fdca313dfa3/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/fr/handbrake/ghb/ba64e7a37b2b3270d6065fdca313dfa3/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/fr/handbrake/ghb/ba64e7a37b2b3270d6065fdca313dfa3/screenshots/image-4_orig.png"
    ],
    detect: { linux: "ghb", flatpakId: "fr.handbrake.ghb" },
    install: {
      fedora: { type: "pkg", value: "HandBrake-gui", note: "RPM Fusion gerektirir." },
      pisi: { type: "pkg", value: "handbrake" },
      debian: { type: "pkg", value: "handbrake" }
    }
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    dev: "Spotify AB",
    cat: "Müzik Dinleme",
    scatKey: "cat.media",
    tab: "top",
    sz: 185,
    dn: "50.0M",
    ag: "12+",
    vr: "1.2.42.290",
    li: "Proprietary",
    src: "https://www.spotify.com/",
    sn: "Milyonlarca şarkı ve podcaste anında erişim.",
    ds: "Spotify, dünyanın en popüler çevrimiçi müzik ve podcast akış hizmetinin resmi masaüstü uygulamasıdır.",
    ic: '<i class="ti ti-brand-spotify"></i>',
    co: "ico-green",
    tr: [["ver", "circle-check-filled", "ver"]],
    tags: ["music", "streaming", "spotify", "podcast"],
    screenshots: [
      "https://dl.flathub.org/media/com/spotify/Client/2be38d678bbcc0e04cec0c19c60a80fe/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/com/spotify/Client/2be38d678bbcc0e04cec0c19c60a80fe/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/com/spotify/Client/2be38d678bbcc0e04cec0c19c60a80fe/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/com/spotify/Client/2be38d678bbcc0e04cec0c19c60a80fe/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "spotify", flatpakId: "com.spotify.Client" },
    install: {
      fedora: { type: "flatpak", value: "com.spotify.Client" },
      pisi: { type: "flatpak", value: "com.spotify.Client" },
      debian: { type: "flatpak", value: "com.spotify.Client" },
      windows: { type: "url", value: "https://download.scdn.co/SpotifySetup.exe", ext: ".exe" }
    }
  },

  // === CHAT & SOCIAL ===
  telegram: {
    id: "telegram",
    name: "Telegram Desktop",
    dev: "Telegram FZ-LLC",
    cat: "Anlık Mesajlaşma",
    scatKey: "cat.chat",
    tab: "all",
    sz: 72,
    dn: "38.0M",
    ag: "12+",
    vr: "5.2.3",
    li: "GPL-3.0",
    src: "https://desktop.telegram.org/",
    sn: "Hızlı, bulut tabanlı ve güvenli mesajlaşma istemcisi.",
    ds: "Telegram Desktop, büyük dosya paylaşımı, kanallar, gruplar ve güçlü bot entegrasyonu sunan bağımsız mesajlaşma uygulamasıdır.",
    ic: '<i class="ti ti-brand-telegram"></i>',
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["chat", "telegram", "messaging", "cloud"],
    screenshots: [
      "https://dl.flathub.org/media/org/telegram/desktop/768b473e12f24349fb5d9235a1550dff/screenshots/image-1_1248x862@1.png",
      "https://dl.flathub.org/media/org/telegram/desktop/768b473e12f24349fb5d9235a1550dff/screenshots/image-2_1248x780@1.png",
      "https://dl.flathub.org/media/org/telegram/desktop/768b473e12f24349fb5d9235a1550dff/screenshots/image-3_1248x780@1.png",
      "https://dl.flathub.org/media/org/telegram/desktop/768b473e12f24349fb5d9235a1550dff/screenshots/image-4_1248x780@1.png"
    ],
    detect: { linux: "telegram-desktop", flatpakId: "org.telegram.desktop" },
    install: {
      fedora: { type: "pkg", value: "telegram-desktop" },
      pisi: { type: "pkg", value: "telegram-desktop" },
      debian: { type: "pkg", value: "telegram-desktop" }
    }
  },
  discord: {
    id: "discord",
    name: "Discord",
    dev: "Discord Inc.",
    cat: "Sesli Sohbet & Topluluk",
    scatKey: "cat.chat",
    tab: "top",
    sz: 92,
    dn: "42.1M",
    ag: "12+",
    vr: "0.0.62",
    li: "Proprietary",
    src: "https://discord.com/",
    sn: "Oyuncular ve topluluklar için sesli ve yazılı iletişim.",
    ds: "Discord; topluluk sunucuları, arkadaşlarınızla ekran paylaşımı ve düşük gecikmeli kesintisiz sesli sohbet odaları sunar.",
    ic: '<i class="ti ti-brand-discord"></i>',
    co: "ico-indigo",
    tr: [["ver", "circle-check-filled", "ver"]],
    tags: ["chat", "voice", "discord", "gaming", "community"],
    screenshots: [
      "https://dl.flathub.org/media/com/discordapp/Discord/cdbdd79ba164f5bb18fcd4788f93de44/screenshots/image-1_1248x957@1.png",
      "https://dl.flathub.org/media/com/discordapp/Discord/cdbdd79ba164f5bb18fcd4788f93de44/screenshots/image-2_1248x957@1.png"
    ],
    detect: { linux: "discord", flatpakId: "com.discordapp.Discord" },
    install: {
      fedora: { type: "flatpak", value: "com.discordapp.Discord" },
      pisi: { type: "flatpak", value: "com.discordapp.Discord" },
      debian: { type: "flatpak", value: "com.discordapp.Discord" },
      windows: { type: "url", value: "https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x64", ext: ".exe" }
    }
  },
  signal: {
    id: "signal",
    name: "Signal Desktop",
    dev: "Signal Technology Foundation",
    cat: "Gizli Mesajlaşma",
    scatKey: "cat.chat",
    tab: "all",
    sz: 130,
    dn: "12.0M",
    ag: "12+",
    vr: "7.16.0",
    li: "GPL-3.0",
    src: "https://signal.org/",
    sn: "Uçtan uca şifreli, gizlilik öncelikli haberleşme uygulaması.",
    ds: "Signal, reklam veya izleyici barındırmayan, mesajlarınızı ve aramalarınızı askeri düzeyde uçtan uca şifreleyen bağımsız haberleşme aracıdır.",
    ic: '<i class="ti ti-shield"></i>',
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["privacy", "signal", "chat", "encrypted"],
    screenshots: [
      "https://dl.flathub.org/media/org/signal/Signal/efc6c4039e9035c3cd9601aa4dba014a/screenshots/image-1_orig.png"
    ],
    detect: { linux: "signal-desktop", flatpakId: "org.signal.Signal" },
    install: {
      fedora: { type: "flatpak", value: "org.signal.Signal" },
      pisi: { type: "flatpak", value: "org.signal.Signal" },
      debian: { type: "flatpak", value: "org.signal.Signal" }
    }
  },

  // === SYSTEM & SECURITY ===
  bitwarden: {
    id: "bitwarden",
    name: "Bitwarden",
    dev: "Bitwarden Inc.",
    cat: "Şifre Yöneticisi",
    scatKey: "cat.system",
    tab: "top",
    sz: 85,
    dn: "19.5M",
    ag: "4+",
    vr: "2024.6.0",
    li: "GPL-3.0",
    src: "https://bitwarden.com/",
    sn: "Güvenli, şifreli ve açık kaynaklı parola kasası.",
    ds: "Bitwarden, tüm parolalarınızı, kredi kartı bilgilerinizi ve güvenli notlarınızı sıfır bilgi (zero-knowledge) mimarisiyle saklayan ve cihazlar arası eşitleyen lider parola yöneticisidir.",
    ic: '<i class="ti ti-key"></i>',
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["password", "security", "vault", "bitwarden"],
    screenshots: [
      "https://dl.flathub.org/media/com/bitwarden/desktop/4a8d76590fdec22c773e4b7db7c4b834/screenshots/image-1_1248x748@1.png"
    ],
    detect: { linux: "bitwarden", flatpakId: "com.bitwarden.desktop" },
    install: {
      fedora: { type: "flatpak", value: "com.bitwarden.desktop" },
      pisi: { type: "flatpak", value: "com.bitwarden.desktop" },
      debian: { type: "flatpak", value: "com.bitwarden.desktop" }
    }
  },
  keepassxc: {
    id: "keepassxc",
    name: "KeePassXC",
    dev: "KeePassXC Team",
    cat: "Şifre Kasası",
    scatKey: "cat.system",
    tab: "system",
    sz: 38,
    dn: "7.8M",
    ag: "4+",
    vr: "2.7.9",
    li: "GPL-3.0",
    src: "https://keepassxc.org/",
    sn: "Çevrimdışı ve yerel depolamalı parolasız kasa çözümü.",
    ds: "KeePassXC, parolalarınızı buluta ihtiyaç duymadan tamamen yerel bilgisayarınızda şifreli KDBX veritabanlarında saklayan çevrimdışı parola yöneticisidir.",
    ic: '<i class="ti ti-lock"></i>',
    co: "ico-green",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["password", "offline", "keepass", "vault"],
    screenshots: [
      "https://dl.flathub.org/media/org/keepassxc/KeePassXC.desktop/4c36ed73b0a57050b7fda2be02da09f1/screenshots/image-1_1248x949@1.png",
      "https://dl.flathub.org/media/org/keepassxc/KeePassXC.desktop/4c36ed73b0a57050b7fda2be02da09f1/screenshots/image-2_1248x888@1.png",
      "https://dl.flathub.org/media/org/keepassxc/KeePassXC.desktop/4c36ed73b0a57050b7fda2be02da09f1/screenshots/image-3_1248x890@1.png",
      "https://dl.flathub.org/media/org/keepassxc/KeePassXC.desktop/4c36ed73b0a57050b7fda2be02da09f1/screenshots/image-4_1248x949@1.png"
    ],
    detect: { linux: "keepassxc", flatpakId: "org.keepassxc.KeePassXC" },
    install: {
      fedora: { type: "pkg", value: "keepassxc" },
      pisi: { type: "pkg", value: "keepassxc" },
      debian: { type: "pkg", value: "keepassxc" }
    }
  },
  stacer: {
    id: "stacer",
    name: "Stacer System Optimizer",
    dev: "Oguzhan Inan",
    cat: "Sistem İyileştirme",
    scatKey: "cat.system",
    tab: "system",
    sz: 28,
    dn: "4.2M",
    ag: "4+",
    vr: "1.1.0",
    li: "GPL-3.0",
    src: "https://github.com/oguzhaninan/Stacer",
    sn: "Linux sistem izleyici ve performans optimizasyonu.",
    ds: "Stacer, sistem kaynaklarını izleme (CPU/RAM/Disk), başlangıç uygulamalarını yönetme, sistem önbelleğini temizleme ve servisleri denetleme için görsel bir araçtır.",
    ic: '<i class="ti ti-dashboard"></i>',
    co: "ico-cyan",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["system", "optimizer", "monitor", "cleaner"],
    detect: { linux: "stacer" },
    install: {
      fedora: { type: "pkg", value: "stacer" },
      debian: { type: "pkg", value: "stacer" }
    }
  },
  wireshark: {
    id: "wireshark",
    name: "Wireshark",
    dev: "The Wireshark Team",
    cat: "Ağ Analizi",
    scatKey: "cat.system",
    tab: "system",
    sz: 65,
    dn: "14.0M",
    ag: "4+",
    vr: "4.2.6",
    li: "GPL-2.0",
    src: "https://www.wireshark.org/",
    sn: "Dünyanın en popüler ağ paket analizcisi.",
    ds: "Wireshark, ağ paketlerini canlı olarak yakalayıp derinlemesine protokol incelemesi yapmanızı sağlayan standart güvenlik aracıdır.",
    ic: '<i class="ti ti-activity"></i>',
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["network", "packet", "security", "analysis"],
    screenshots: [
      "https://dl.flathub.org/media/org/wireshark/Wireshark/4d3a25b620bd7aea2985715c2a2be9c6/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/org/wireshark/Wireshark/4d3a25b620bd7aea2985715c2a2be9c6/screenshots/image-2_1248x769@1.png",
      "https://dl.flathub.org/media/org/wireshark/Wireshark/4d3a25b620bd7aea2985715c2a2be9c6/screenshots/image-3_1248x676@1.png"
    ],
    detect: { linux: "wireshark", flatpakId: "org.wireshark.Wireshark" },
    install: {
      fedora: { type: "pkg", value: "wireshark" },
      pisi: { type: "flatpak", value: "org.wireshark.Wireshark" },
      debian: { type: "pkg", value: "wireshark" }
    }
  },
  localsend: {
    id: "localsend",
    name: "LocalSend",
    dev: "LocalSend Team",
    cat: "Ağ & Dosya Paylaşımı",
    scatKey: "cat.system",
    tab: "productivity",
    sz: 25,
    dn: "3.2M",
    ag: "4+",
    vr: "1.14.0",
    li: "MIT",
    src: "https://localsend.org/",
    sn: "Açık kaynaklı, yerel ağ üzerinden cihazlar arası hızlı ve şifreli dosya aktarımı.",
    ds: "LocalSend, internet bağlantısı olmadan aynı yerel Wi-Fi ağındaki Linux, Android, iOS ve Windows cihazları arasında AirDrop benzeri sorunsuz dosya paylaşımı sağlar.",
    ic: '<i class="ti ti-send"></i>',
    co: "ico-teal",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["sharing", "transfer", "airdrop", "localsend", "network"],
    screenshots: [
      "https://dl.flathub.org/media/org/localsend/localsend_app/2df55c2ad435ad5ec1c1e3d632e402b1/screenshots/image-1_1248x915@1.png",
      "https://dl.flathub.org/media/org/localsend/localsend_app/2df55c2ad435ad5ec1c1e3d632e402b1/screenshots/image-2_1248x915@1.png",
      "https://dl.flathub.org/media/org/localsend/localsend_app/2df55c2ad435ad5ec1c1e3d632e402b1/screenshots/image-3_1248x915@1.png"
    ],
    detect: { linux: "localsend", flatpakId: "org.localsend.localsend_app" },
    install: {
      fedora: { type: "flatpak", value: "org.localsend.localsend_app" },
      pisi: { type: "flatpak", value: "org.localsend.localsend_app" },
      debian: { type: "flatpak", value: "org.localsend.localsend_app" }
    }
  },
  bottles: {
    id: "bottles",
    name: "Bottles",
    dev: "Bottles Devs",
    cat: "Sistem & Uyumluluk",
    scatKey: "cat.system",
    tab: "developer",
    sz: 85,
    dn: "5.8M",
    ag: "4+",
    vr: "51.10",
    li: "GPL-3.0",
    src: "https://usebottles.com/",
    sn: "Linux üzerinde Windows yazılımlarını ve oyunlarını kolayca çalıştırma ortamı.",
    ds: "Bottles, özelleştirilmiş Wine ve Proton ortamları (şişeler) oluşturarak Windows uygulamalarını ve bağımlılıklarını izole biçimde Linux'ta çalıştırmanızı sağlar.",
    ic: '<i class="ti ti-bottle"></i>',
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["wine", "windows", "compatibility", "gaming", "bottles"],
    screenshots: [
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/com/usebottles/bottles/f4d44ed5b23444a01385a8b22cd083d8/screenshots/image-4_orig.png"
    ],
    detect: { linux: "bottles", flatpakId: "com.usebottles.bottles" },
    install: {
      fedora: { type: "flatpak", value: "com.usebottles.bottles" },
      pisi: { type: "flatpak", value: "com.usebottles.bottles" },
      debian: { type: "flatpak", value: "com.usebottles.bottles" }
    }
  },
  audacity: {
    id: "audacity",
    name: "Audacity",
    dev: "Muse Group & Community",
    cat: "Ses Düzenleyici",
    scatKey: "cat.media",
    tab: "productivity",
    sz: 48,
    dn: "22.1M",
    ag: "4+",
    vr: "3.5.1",
    li: "GPL-3.0",
    src: "https://www.audacityteam.org/",
    sn: "Çok kanallı ses kaydı ve profesyonel ses düzenleme yazılımı.",
    ds: "Audacity; ses kaydetme, gürültü azaltma, efektler uygulama ve podcast/müzik üretimi için dünyanın en popüler açık kaynaklı ses düzenleyicisidir.",
    ic: '<i class="ti ti-microphone"></i>',
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["audio", "sound", "editor", "podcast", "audacity"],
    screenshots: [
      "https://dl.flathub.org/media/org/audacityteam/Audacity/0ad4a24524b6c06220649dc83a08ae81/screenshots/image-1_orig.png"
    ],
    detect: { linux: "audacity", flatpakId: "org.audacityteam.Audacity" },
    install: {
      fedora: { type: "pkg", value: "audacity" },
      pisi: { type: "pkg", value: "audacity" },
      debian: { type: "pkg", value: "audacity" }
    }
  },
  timeshift: {
    id: "timeshift",
    name: "Timeshift",
    dev: "Tony George / Linux Mint Team",
    cat: "Sistem & Anlık Görüntü",
    scatKey: "cat.system",
    tab: "system",
    sz: 18,
    dn: "4.5M",
    ag: "4+",
    vr: "24.06",
    li: "GPL-3.0",
    src: "https://github.com/linuxmint/timeshift",
    sn: "Linux sisteminiz için otomatik anlık görüntü (snapshot) ve geri yükleme aracı.",
    ds: "Timeshift, RSYNC veya BTRFS ile işletim sisteminizin belirli aralıklarla yedeğini alır. Sisteminizin çökmesi durumunda tek tıkla eski haline döndürmenizi sağlar.",
    ic: '<i class="ti ti-history"></i>',
    co: "ico-rose",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["system", "backup", "restore", "snapshot", "timeshift"],
    detect: { linux: "timeshift" },
    install: {
      fedora: { type: "pkg", value: "timeshift" },
      pisi: { type: "pkg", value: "timeshift" },
      debian: { type: "pkg", value: "timeshift" }
    }
  },
  // === WEB BROWSERS (ek) ===
  opera: {
    id: "opera",
    name: "Opera Browser",
    dev: "Opera Software",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "all",
    sz: 95,
    dn: "2.1M",
    ag: "4+",
    vr: "115.0",
    li: "Proprietary",
    src: "https://www.opera.com/",
    sn: "Yerleşik ücretsiz VPN ve reklam engelleyicili hızlı tarayıcı.",
    ds: "Opera, ücretsiz yerleşik VPN, reklam engelleyici ve mesajlaşma uygulamalarına doğrudan kenar çubuğundan erişim sunan özellik dolu bir web tarayıcısıdır.",
    ic: "<i class=\"ti ti-brand-opera\"></i>",
    co: "ico-rose",
    tr: [["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["browser", "opera", "vpn"],
    screenshots: [
      "https://dl.flathub.org/media/com/opera/Opera/5f5b53cca0cfb8318927f085c8dbe6e4/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/com/opera/Opera/5f5b53cca0cfb8318927f085c8dbe6e4/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/com/opera/Opera/5f5b53cca0cfb8318927f085c8dbe6e4/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/com/opera/Opera/5f5b53cca0cfb8318927f085c8dbe6e4/screenshots/image-4_orig.png"
    ],
    detect: { linux: "opera", flatpakId: "com.opera.Opera" },
    install: {
      fedora: { type: "flatpak", value: "com.opera.Opera" },
      pisi: { type: "flatpak", value: "com.opera.Opera" },
      debian: { type: "flatpak", value: "com.opera.Opera" },
      windows: { type: "url", value: "https://net.opera.com/online_installer/Opera_Setup.exe", ext: ".exe" }
    }
  },
  waterfox: {
    id: "waterfox",
    name: "Waterfox",
    dev: "Waterfox Ltd",
    cat: "Web Tarayıcı",
    scatKey: "cat.browser",
    tab: "all",
    sz: 90,
    dn: "410K",
    ag: "4+",
    vr: "6.5.5",
    li: "MPL 2.0",
    src: "https://www.waterfox.net/",
    sn: "Gizlilik odaklı, Firefox tabanlı bağımsız tarayıcı.",
    ds: "Waterfox, Firefox'un kaynak kodundan türetilmiş, telemetri ve izlemeyi varsayılan olarak kapatan, eklenti uyumluluğunu koruyan bağımsız bir tarayıcıdır.",
    ic: "<i class=\"ti ti-brand-firefox\"></i>",
    co: "ico-orange",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["browser", "privacy", "firefox-fork"],
    screenshots: [
      "https://dl.flathub.org/media/net/waterfox/waterfox/fd3d3c9510abc0c844ae7f6aa2819846/screenshots/image-1_1248x928@1.png",
      "https://dl.flathub.org/media/net/waterfox/waterfox/fd3d3c9510abc0c844ae7f6aa2819846/screenshots/image-2_1248x928@1.png",
      "https://dl.flathub.org/media/net/waterfox/waterfox/fd3d3c9510abc0c844ae7f6aa2819846/screenshots/image-3_1248x928@1.png"
    ],
    detect: { linux: "waterfox", flatpakId: "net.waterfox.waterfox" },
    install: {
      fedora: { type: "flatpak", value: "net.waterfox.waterfox" },
      pisi: { type: "flatpak", value: "net.waterfox.waterfox" },
      debian: { type: "flatpak", value: "net.waterfox.waterfox" }
    }
  },
  // === DEVELOPER TOOLS (ek) ===
  neovide: {
    id: "neovide",
    name: "Neovide",
    dev: "Neovide Contributors",
    cat: "Kod Editörü",
    scatKey: "cat.code",
    tab: "developer",
    sz: 18,
    dn: "85K",
    ag: "4+",
    vr: "0.14.1",
    li: "MIT",
    src: "https://neovide.dev/",
    sn: "Neovim için pürüzsüz animasyonlu grafik arayüz.",
    ds: "Neovide, Neovim metin editörünü GPU hızlandırmalı render, pürüzsüz kaydırma ve imleç animasyonlarıyla zenginleştiren bağımsız bir grafik arayüzüdür.",
    ic: "<i class=\"ti ti-terminal-2\"></i>",
    co: "ico-green",
    tr: [["opn", "code", "opn"]],
    tags: ["editor", "neovim", "gui"],
    screenshots: [
      "https://dl.flathub.org/media/dev/neovide/neovide/5b731c50346bce7495824eed65971b11/screenshots/image-1_1248x785@1.png"
    ],
    detect: { linux: "neovide", flatpakId: "dev.neovide.neovide" },
    install: {
      fedora: { type: "flatpak", value: "dev.neovide.neovide" },
      pisi: { type: "flatpak", value: "dev.neovide.neovide" },
      debian: { type: "flatpak", value: "dev.neovide.neovide" }
    }
  },
  gitkraken: {
    id: "gitkraken",
    name: "GitKraken",
    dev: "Axosoft",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 165,
    dn: "1.4M",
    ag: "4+",
    vr: "10.2.0",
    li: "Proprietary",
    src: "https://www.gitkraken.com/",
    sn: "Görsel dallanma haritalı güçlü Git istemcisi.",
    ds: "GitKraken, karmaşık Git geçmişini renkli ve etkileşimli bir grafikle görselleştiren, birleştirme çakışmalarını kolayca çözmenizi sağlayan popüler bir Git GUI istemcisidir.",
    ic: "<i class=\"ti ti-git-branch\"></i>",
    co: "ico-blue",
    tr: [["warn", "shield-alert", "warn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["git", "gui", "version-control"],
    screenshots: [
      "https://dl.flathub.org/media/com/axosoft/GitKraken/6c77424f69673e885e41067d19be9f5a/screenshots/image-1_1248x667@1.png",
      "https://dl.flathub.org/media/com/axosoft/GitKraken/6c77424f69673e885e41067d19be9f5a/screenshots/image-2_1248x667@1.png",
      "https://dl.flathub.org/media/com/axosoft/GitKraken/6c77424f69673e885e41067d19be9f5a/screenshots/image-3_1248x667@1.png",
      "https://dl.flathub.org/media/com/axosoft/GitKraken/6c77424f69673e885e41067d19be9f5a/screenshots/image-4_1248x667@1.png"
    ],
    detect: { linux: "gitkraken", flatpakId: "com.axosoft.GitKraken" },
    install: {
      fedora: { type: "flatpak", value: "com.axosoft.GitKraken" },
      pisi: { type: "flatpak", value: "com.axosoft.GitKraken" },
      debian: { type: "flatpak", value: "com.axosoft.GitKraken" }
    }
  },
  bruno: {
    id: "bruno",
    name: "Bruno API Client",
    dev: "Bruno Community",
    cat: "Geliştirici Araçları",
    scatKey: "cat.code",
    tab: "developer",
    sz: 95,
    dn: "290K",
    ag: "4+",
    vr: "1.34.0",
    li: "MIT",
    src: "https://www.usebruno.com/",
    sn: "Açık kaynaklı, hızlı ve offline-first API istemcisi.",
    ds: "Bruno, API koleksiyonlarını buluta değil doğrudan dosya sistemine kaydeden, Git ile sürüm kontrolüne uygun, Postman'e açık kaynaklı bir alternatiftir.",
    ic: "<i class=\"ti ti-api\"></i>",
    co: "ico-orange",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["api", "testing", "postman-alternative"],
    screenshots: [
      "https://dl.flathub.org/media/com/usebruno/Bruno/cab08618e005b6b363e53b1fc80bcc63/screenshots/image-1_1248x793@1.png"
    ],
    detect: { linux: "bruno", flatpakId: "com.usebruno.Bruno" },
    install: {
      fedora: { type: "flatpak", value: "com.usebruno.Bruno" },
      pisi: { type: "flatpak", value: "com.usebruno.Bruno" },
      debian: { type: "flatpak", value: "com.usebruno.Bruno" }
    }
  },
  // === PRODUCTIVITY & OFFICE (ek) ===
  notion: {
    id: "notion",
    name: "Notion",
    dev: "Notion Labs",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 130,
    dn: "3.8M",
    ag: "4+",
    vr: "2.5.20",
    li: "Proprietary",
    src: "https://www.notion.so/",
    sn: "Notlar, wiki ve proje yönetimini tek yerde birleştiren çalışma alanı.",
    ds: "Notion, notlar, veritabanları, kanban panoları ve wiki sayfalarını tek bir esnek çalışma alanında birleştiren popüler bir üretkenlik uygulamasıdır. Resmi bir Linux istemcisi olmadığı için topluluk tarafından geliştirilen bir sarmalayıcı kullanılır.",
    ic: "<i class=\"ti ti-notes\"></i>",
    co: "ico-dark",
    tr: [["warn", "shield-alert", "warn"]],
    tags: ["notes", "wiki", "productivity"],
    detect: { linux: "notion-app", flatpakId: "io.github.vancei.Notion" },
    install: {
      fedora: { type: "flatpak", value: "io.github.vancei.Notion" },
      pisi: { type: "flatpak", value: "io.github.vancei.Notion" },
      debian: { type: "flatpak", value: "io.github.vancei.Notion" }
    }
  },
  logseq: {
    id: "logseq",
    name: "Logseq",
    dev: "Logseq Inc.",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 145,
    dn: "260K",
    ag: "4+",
    vr: "0.10.9",
    li: "AGPL-3.0",
    src: "https://logseq.com/",
    sn: "Yerel-öncelikli, bağlantılı not alma ve bilgi yönetimi aracı.",
    ds: "Logseq, düz metin dosyalarında yerel olarak çalışan, notlarınızı çift yönlü bağlantılarla ilişkilendirmenizi sağlayan açık kaynaklı bir bilgi yönetim aracıdır.",
    ic: "<i class=\"ti ti-network\"></i>",
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["notes", "knowledge-base", "local-first"],
    screenshots: [
      "https://dl.flathub.org/media/com/logseq/Logseq/e9fd7754757f106ceb422f684122ed63/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/com/logseq/Logseq/e9fd7754757f106ceb422f684122ed63/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/com/logseq/Logseq/e9fd7754757f106ceb422f684122ed63/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/com/logseq/Logseq/e9fd7754757f106ceb422f684122ed63/screenshots/image-4_orig.png"
    ],
    detect: { linux: "logseq", flatpakId: "com.logseq.Logseq" },
    install: {
      fedora: { type: "flatpak", value: "com.logseq.Logseq" },
      pisi: { type: "flatpak", value: "com.logseq.Logseq" },
      debian: { type: "flatpak", value: "com.logseq.Logseq" }
    }
  },
  mailspring: {
    id: "mailspring",
    name: "Mailspring",
    dev: "Foundry 376",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 105,
    dn: "195K",
    ag: "4+",
    vr: "1.14.4",
    li: "GPL-3.0",
    src: "https://getmailspring.com/",
    sn: "Hızlı ve modern arayüzlü e-posta istemcisi.",
    ds: "Mailspring, birden fazla e-posta hesabını tek bir hızlı arayüzde birleştiren, okundu bilgisi ve gönderim erteleme gibi gelişmiş özellikler sunan bir masaüstü e-posta istemcisidir.",
    ic: "<i class=\"ti ti-mail\"></i>",
    co: "ico-blue",
    tr: [["suc", "shield-check", "suc"]],
    tags: ["email", "client"],
    screenshots: [
      "https://dl.flathub.org/media/com/getmailspring/Mailspring/cbb2a2163d8727e52d3947346fe22022/screenshots/image-1_orig.png"
    ],
    detect: { linux: "mailspring", flatpakId: "com.getmailspring.Mailspring" },
    install: {
      fedora: { type: "pkg", value: "mailspring" },
      debian: { type: "pkg", value: "mailspring" }
    }
  },
  todoist: {
    id: "todoist",
    name: "Todoist",
    dev: "Doist",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 88,
    dn: "2.6M",
    ag: "4+",
    vr: "9.15.0",
    li: "Proprietary",
    src: "https://todoist.com/",
    sn: "Basit ve güçlü görev/yapılacaklar listesi yönetimi.",
    ds: "Todoist, günlük görevlerinizi doğal dil girişiyle hızlıca ekleyip önceliklendirmenizi, projelere ayırmanızı ve ekiplerle paylaşmanızı sağlayan popüler bir görev yönetim uygulamasıdır.",
    ic: "<i class=\"ti ti-checklist\"></i>",
    co: "ico-rose",
    tr: [["ver", "circle-check-filled", "ver"], ["suc", "shield-check", "suc"]],
    tags: ["tasks", "todo", "productivity"],
    screenshots: [
      "https://dl.flathub.org/media/com/todoist/Todoist/282575ca6124b8693cb933706a93aa44/screenshots/image-1_1248x728@1.png",
      "https://dl.flathub.org/media/com/todoist/Todoist/282575ca6124b8693cb933706a93aa44/screenshots/image-2_1248x728@1.png",
      "https://dl.flathub.org/media/com/todoist/Todoist/282575ca6124b8693cb933706a93aa44/screenshots/image-3_1248x728@1.png",
      "https://dl.flathub.org/media/com/todoist/Todoist/282575ca6124b8693cb933706a93aa44/screenshots/image-4_1248x728@1.png"
    ],
    detect: { linux: "todoist", flatpakId: "com.todoist.Todoist" },
    install: {
      fedora: { type: "flatpak", value: "com.todoist.Todoist" },
      pisi: { type: "flatpak", value: "com.todoist.Todoist" },
      debian: { type: "flatpak", value: "com.todoist.Todoist" }
    }
  },
  masterpdf: {
    id: "masterpdf",
    name: "Master PDF Editor",
    dev: "Code Industry",
    cat: "Üretkenlik & Ofis",
    scatKey: "cat.productivity",
    tab: "productivity",
    sz: 210,
    dn: "620K",
    ag: "4+",
    vr: "5.9.75",
    li: "Proprietary",
    src: "https://code-industry.net/masterpdfeditor/",
    sn: "PDF düzenleme, form doldurma ve imzalama aracı.",
    ds: "Master PDF Editor, PDF belgelerini düzenlemenizi, sayfa ekleyip çıkarmanızı, formlar oluşturmanızı ve dijital imza eklemenizi sağlayan tam özellikli bir PDF düzenleyicisidir.",
    ic: "<i class=\"ti ti-file-type-pdf\"></i>",
    co: "ico-rose",
    tr: [["warn", "shield-alert", "warn"]],
    tags: ["pdf", "editor", "office"],
    screenshots: [
      "https://dl.flathub.org/media/net/code_industry/MasterPDFEditor/2f1b2d0a2abd1e397c3cb755b74a7871/screenshots/image-1_1248x709@1.png"
    ],
    detect: { linux: "masterpdfeditor5", flatpakId: "net.code_industry.MasterPDFEditor" },
    install: {
      fedora: { type: "flatpak", value: "net.code_industry.MasterPDFEditor" },
      pisi: { type: "flatpak", value: "net.code_industry.MasterPDFEditor" },
      debian: { type: "flatpak", value: "net.code_industry.MasterPDFEditor" }
    }
  },
  // === DESIGN, PHOTO & 3D (ek) ===
  figma: {
    id: "figma",
    name: "Figma",
    dev: "Figma, Inc.",
    cat: "Tasarım & Arayüz",
    scatKey: "cat.design",
    tab: "design",
    sz: 175,
    dn: "1.9M",
    ag: "4+",
    vr: "0.11.3",
    li: "Proprietary",
    src: "https://www.figma.com/",
    sn: "İşbirlikli arayüz tasarım ve prototipleme aracı.",
    ds: "Figma, ekiplerin gerçek zamanlı olarak birlikte arayüz tasarlayıp prototipleyebildiği tarayıcı tabanlı bir tasarım aracıdır. Resmi bir Linux istemcisi olmadığı için topluluk tarafından geliştirilen bir sarmalayıcı kullanılır.",
    ic: "<i class=\"ti ti-brand-figma\"></i>",
    co: "ico-purple",
    tr: [["warn", "shield-alert", "warn"]],
    tags: ["design", "ui", "prototyping"],
    detect: { linux: "figma-linux", flatpakId: "io.github.figma_linux.figma_linux" },
    install: {
      fedora: { type: "flatpak", value: "io.github.figma_linux.figma_linux" },
      pisi: { type: "flatpak", value: "io.github.figma_linux.figma_linux" },
      debian: { type: "flatpak", value: "io.github.figma_linux.figma_linux" }
    }
  },
  darktable: {
    id: "darktable",
    name: "Darktable",
    dev: "darktable team",
    cat: "Tasarım & Fotoğraf",
    scatKey: "cat.design",
    tab: "design",
    sz: 145,
    dn: "480K",
    ag: "4+",
    vr: "4.8.1",
    li: "GPL-3.0",
    src: "https://www.darktable.org/",
    sn: "Fotoğrafçılar için açık kaynaklı RAW işleme stüdyosu.",
    ds: "darktable, dijital fotoğrafların RAW dosyalarını yıkıcı olmayan bir iş akışıyla işlemenizi ve düzenlemenizi sağlayan, Lightroom'a açık kaynaklı bir alternatiftir.",
    ic: "<i class=\"ti ti-aperture\"></i>",
    co: "ico-dark",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["photo", "raw", "editing"],
    screenshots: [
      "https://dl.flathub.org/media/org/darktable/Darktable/53f80d9707953230d099b57c67b63f55/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/org/darktable/Darktable/53f80d9707953230d099b57c67b63f55/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/org/darktable/Darktable/53f80d9707953230d099b57c67b63f55/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/org/darktable/Darktable/53f80d9707953230d099b57c67b63f55/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "darktable", flatpakId: "org.darktable.Darktable" },
    install: {
      fedora: { type: "pkg", value: "darktable" },
      pisi: { type: "flatpak", value: "org.darktable.Darktable" },
      debian: { type: "pkg", value: "darktable" }
    }
  },
  rawtherapee: {
    id: "rawtherapee",
    name: "RawTherapee",
    dev: "RawTherapee Team",
    cat: "Tasarım & Fotoğraf",
    scatKey: "cat.design",
    tab: "design",
    sz: 120,
    dn: "310K",
    ag: "4+",
    vr: "5.11",
    li: "GPL-3.0",
    src: "https://rawtherapee.com/",
    sn: "Gelişmiş RAW fotoğraf işleme yazılımı.",
    ds: "RawTherapee, geniş renk yönetimi ve gürültü azaltma araçlarıyla RAW fotoğraflardan en iyi sonucu almanızı sağlayan güçlü, açık kaynaklı bir fotoğraf işleme programıdır.",
    ic: "<i class=\"ti ti-camera\"></i>",
    co: "ico-teal",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["photo", "raw", "editing"],
    screenshots: [
      "https://dl.flathub.org/media/com/rawtherapee/RawTherapee/1690c20ece4741e6dcb2ed7346d3747e/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/com/rawtherapee/RawTherapee/1690c20ece4741e6dcb2ed7346d3747e/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/com/rawtherapee/RawTherapee/1690c20ece4741e6dcb2ed7346d3747e/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/com/rawtherapee/RawTherapee/1690c20ece4741e6dcb2ed7346d3747e/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "rawtherapee", flatpakId: "com.rawtherapee.RawTherapee" },
    install: {
      fedora: { type: "flatpak", value: "com.rawtherapee.RawTherapee" },
      pisi: { type: "flatpak", value: "com.rawtherapee.RawTherapee" },
      debian: { type: "flatpak", value: "com.rawtherapee.RawTherapee" }
    }
  },
  penpot: {
    id: "penpot",
    name: "Penpot Desktop",
    dev: "Kaleidos / Penpot",
    cat: "Tasarım & Arayüz",
    scatKey: "cat.design",
    tab: "design",
    sz: 60,
    dn: "175K",
    ag: "4+",
    vr: "2.3.2",
    li: "MPL 2.0",
    src: "https://penpot.app/",
    sn: "Açık kaynaklı arayüz tasarım ve prototipleme platformu.",
    ds: "Penpot, Figma'ya açık kaynaklı bir alternatif olarak geliştirilen, SVG tabanlı çalışan, tasarımcı ve geliştiricilerin birlikte kullanabildiği web tabanlı bir tasarım aracıdır.",
    ic: "<i class=\"ti ti-layout-grid\"></i>",
    co: "ico-coral",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["design", "ui", "open-source", "figma-alternative"],
    screenshots: [
      "https://dl.flathub.org/media/com/authormore/penpotdesktop/08724978a680a0b84c27296c33136d80/screenshots/image-1_1248x809@1.png",
      "https://dl.flathub.org/media/com/authormore/penpotdesktop/08724978a680a0b84c27296c33136d80/screenshots/image-2_1248x809@1.png"
    ],
    detect: { linux: "penpot-desktop", flatpakId: "com.authormore.penpotdesktop" },
    install: {
      fedora: { type: "flatpak", value: "com.authormore.penpotdesktop" },
      pisi: { type: "flatpak", value: "com.authormore.penpotdesktop" },
      debian: { type: "flatpak", value: "com.authormore.penpotdesktop" }
    }
  },
  freecad: {
    id: "freecad",
    name: "FreeCAD",
    dev: "FreeCAD Project",
    cat: "Tasarım & 3D",
    scatKey: "cat.design",
    tab: "design",
    sz: 480,
    dn: "390K",
    ag: "4+",
    vr: "1.0.0",
    li: "LGPL-2.1",
    src: "https://www.freecad.org/",
    sn: "Parametrik 3B CAD tasarım yazılımı.",
    ds: "FreeCAD, mühendislik ve ürün tasarımı için parametrik 3B modelleme sunan, açık kaynaklı ve genişletilebilir bir CAD (Bilgisayar Destekli Tasarım) uygulamasıdır.",
    ic: "<i class=\"ti ti-3d-cube-sphere\"></i>",
    co: "ico-green",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["cad", "3d", "engineering"],
    screenshots: [
      "https://dl.flathub.org/media/org/freecad/FreeCAD/6383556ee1dc0730acd26e49e26da201/screenshots/image-1_1248x767@1.png",
      "https://dl.flathub.org/media/org/freecad/FreeCAD/6383556ee1dc0730acd26e49e26da201/screenshots/image-2_1248x767@1.png",
      "https://dl.flathub.org/media/org/freecad/FreeCAD/6383556ee1dc0730acd26e49e26da201/screenshots/image-3_1248x766@1.png",
      "https://dl.flathub.org/media/org/freecad/FreeCAD/6383556ee1dc0730acd26e49e26da201/screenshots/image-4_1248x767@1.png"
    ],
    detect: { linux: "freecad", flatpakId: "org.freecad.FreeCAD" },
    install: {
      fedora: { type: "pkg", value: "freecad" },
      pisi: { type: "flatpak", value: "org.freecad.FreeCAD" },
      debian: { type: "pkg", value: "freecad" }
    }
  },
  natron: {
    id: "natron",
    name: "Natron",
    dev: "Natron Team",
    cat: "Tasarım & 3D",
    scatKey: "cat.design",
    tab: "design",
    sz: 210,
    dn: "95K",
    ag: "4+",
    vr: "2.5.2",
    li: "GPL-2.0",
    src: "https://natrongithub.github.io/",
    sn: "Düğüm tabanlı görsel efekt ve kompozisyon yazılımı.",
    ds: "Natron, film ve video prodüksiyonu için düğüm tabanlı bir iş akışıyla görsel efekt kompozisyonu ve motion graphics oluşturmanızı sağlayan açık kaynaklı bir araçtır.",
    ic: "<i class=\"ti ti-movie\"></i>",
    co: "ico-dark",
    tr: [["opn", "code", "opn"]],
    tags: ["vfx", "compositing", "video"],
    screenshots: [
      "https://dl.flathub.org/media/fr/natron/Natron/e1c66133a7851966660edb790e7037dc/screenshots/image-1_1248x702@1.png"
    ],
    detect: { linux: "natron", flatpakId: "fr.natron.Natron" },
    install: {
      fedora: { type: "flatpak", value: "fr.natron.Natron" },
      pisi: { type: "flatpak", value: "fr.natron.Natron" },
      debian: { type: "flatpak", value: "fr.natron.Natron" }
    }
  },
  digikam: {
    id: "digikam",
    name: "digiKam",
    dev: "digiKam Team (KDE)",
    cat: "Tasarım & Fotoğraf",
    scatKey: "cat.design",
    tab: "design",
    sz: 220,
    dn: "340K",
    ag: "4+",
    vr: "8.5.0",
    li: "GPL-2.0",
    src: "https://www.digikam.org/",
    sn: "Gelişmiş fotoğraf yönetimi ve düzenleme uygulaması.",
    ds: "digiKam, binlerce fotoğrafı etiketleme, yüz tanıma ve coğrafi konum bilgisiyle organize etmenizi, ayrıca temel düzenlemeler yapmanızı sağlayan güçlü bir fotoğraf yöneticisidir.",
    ic: "<i class=\"ti ti-photo\"></i>",
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["photo", "management", "kde"],
    screenshots: [
      "https://dl.flathub.org/media/org/kde/digikam.desktop/bfdc34e6e097e2ce8fae542d45980247/screenshots/image-1_1248x664@1.png",
      "https://dl.flathub.org/media/org/kde/digikam.desktop/bfdc34e6e097e2ce8fae542d45980247/screenshots/image-2_1248x605@1.png",
      "https://dl.flathub.org/media/org/kde/digikam.desktop/bfdc34e6e097e2ce8fae542d45980247/screenshots/image-3_1248x804@1.png",
      "https://dl.flathub.org/media/org/kde/digikam.desktop/bfdc34e6e097e2ce8fae542d45980247/screenshots/image-4_1248x746@1.png"
    ],
    detect: { linux: "digikam", flatpakId: "org.kde.digikam" },
    install: {
      fedora: { type: "pkg", value: "digikam" },
      pisi: { type: "flatpak", value: "org.kde.digikam" },
      debian: { type: "pkg", value: "digikam" }
    }
  },
  // === GAMES & LAUNCHERS (ek) ===
  playonlinux: {
    id: "playonlinux",
    name: "PlayOnLinux",
    dev: "PlayOnLinux Team",
    cat: "Oyun & Uyum Katmanı",
    scatKey: "cat.games",
    tab: "games",
    sz: 25,
    dn: "150K",
    ag: "4+",
    vr: "4.4",
    li: "GPL-3.0",
    src: "https://www.playonlinux.com/",
    sn: "Windows oyunlarını Wine üzerinde kolayca kurup yönetin.",
    ds: "PlayOnLinux, Wine'ı kullanarak Windows oyun ve uygulamalarını Linux'ta kolayca kurup her biri için ayrı, izole sanal sürücüler yönetmenizi sağlayan bir arayüzdür.",
    ic: "<i class=\"ti ti-device-gamepad-2\"></i>",
    co: "ico-rose",
    tr: [["opn", "code", "opn"]],
    tags: ["wine", "windows-games", "compatibility"],
    detect: { linux: "playonlinux", flatpakId: null },
    install: {
      fedora: { type: "pkg", value: "playonlinux" },
      debian: { type: "pkg", value: "playonlinux" }
    }
  },
  minetest: {
    id: "minetest",
    name: "Minetest",
    dev: "Minetest/Luanti Contributors",
    cat: "Oyun",
    scatKey: "cat.games",
    tab: "games",
    sz: 45,
    dn: "610K",
    ag: "4+",
    vr: "5.10.0",
    li: "LGPL-2.1",
    src: "https://www.minetest.net/",
    sn: "Açık kaynaklı, sonsuz özelleştirilebilir voksel sandbox oyunu.",
    ds: "Minetest (Luanti), Minecraft'a benzer açık kaynaklı bir voksel oyun motorudur; binlerce mod ve eklentiyle tamamen özelleştirilebilir dünyalar sunar.",
    ic: "<i class=\"ti ti-cube\"></i>",
    co: "ico-green",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["sandbox", "voxel", "open-source"],
    screenshots: [
      "https://dl.flathub.org/media/net/minetest/Minetest/623a66cfbd16e5b6530208b7cc29a2e2/screenshots/image-1_1248x659@1.webp",
      "https://dl.flathub.org/media/net/minetest/Minetest/623a66cfbd16e5b6530208b7cc29a2e2/screenshots/image-2_1248x759@1.webp",
      "https://dl.flathub.org/media/net/minetest/Minetest/623a66cfbd16e5b6530208b7cc29a2e2/screenshots/image-3_orig.webp"
    ],
    detect: { linux: "minetest", flatpakId: "net.minetest.Minetest" },
    install: {
      fedora: { type: "pkg", value: "minetest" },
      pisi: { type: "flatpak", value: "net.minetest.Minetest" },
      debian: { type: "pkg", value: "minetest" }
    }
  },
  supertuxkart: {
    id: "supertuxkart",
    name: "SuperTuxKart",
    dev: "SuperTuxKart Team",
    cat: "Oyun",
    scatKey: "cat.games",
    tab: "games",
    sz: 950,
    dn: "780K",
    ag: "4+",
    vr: "1.4",
    li: "GPL-3.0",
    src: "https://supertuxkart.net/",
    sn: "Ücretsiz ve eğlenceli 3B kart yarışı oyunu.",
    ds: "SuperTuxKart, Tux ve diğer açık kaynak maskotlarıyla yarıştığınız, güçlendiriciler ve çok oyunculu modlar içeren ücretsiz bir kart yarışı oyunudur.",
    ic: "<i class=\"ti ti-steering-wheel\"></i>",
    co: "ico-orange",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["racing", "kart", "open-source"],
    screenshots: [
      "https://dl.flathub.org/media/net/supertuxkart/SuperTuxKart/ed6e8f73eecfb93757794648174bcf0e/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/net/supertuxkart/SuperTuxKart/ed6e8f73eecfb93757794648174bcf0e/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/net/supertuxkart/SuperTuxKart/ed6e8f73eecfb93757794648174bcf0e/screenshots/image-3_1248x702@1.png"
    ],
    detect: { linux: "supertuxkart", flatpakId: "net.supertuxkart.SuperTuxKart" },
    install: {
      fedora: { type: "pkg", value: "supertuxkart" },
      pisi: { type: "flatpak", value: "net.supertuxkart.SuperTuxKart" },
      debian: { type: "pkg", value: "supertuxkart" }
    }
  },
  "0ad": {
    id: "0ad",
    name: "0 A.D.",
    dev: "Wildfire Games",
    cat: "Oyun",
    scatKey: "cat.games",
    tab: "games",
    sz: 1800,
    dn: "420K",
    ag: "12+",
    vr: "0.27.0",
    li: "GPL-2.0",
    src: "https://play0ad.com/",
    sn: "Tarihi çağlarda geçen ücretsiz gerçek zamanlı strateji oyunu.",
    ds: "0 A.D., antik çağ uygarlıklarını yönettiğiniz, tamamen ücretsiz ve açık kaynaklı, yüksek kaliteli grafiklere sahip bir gerçek zamanlı strateji oyunudur.",
    ic: "<i class=\"ti ti-sword\"></i>",
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["strategy", "historical", "open-source"],
    screenshots: [
      "https://dl.flathub.org/media/com/play0ad/zeroad/fc68768a9464543510de651f0390401c/screenshots/image-1_1248x702@1.png",
      "https://dl.flathub.org/media/com/play0ad/zeroad/fc68768a9464543510de651f0390401c/screenshots/image-2_1248x702@1.png",
      "https://dl.flathub.org/media/com/play0ad/zeroad/fc68768a9464543510de651f0390401c/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/com/play0ad/zeroad/fc68768a9464543510de651f0390401c/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "pyrogenesis", flatpakId: "com.play0ad.zeroad" },
    install: {
      fedora: { type: "pkg", value: "0ad" },
      pisi: { type: "flatpak", value: "com.play0ad.zeroad" },
      debian: { type: "pkg", value: "0ad" }
    }
  },
  veloren: {
    id: "veloren",
    name: "Veloren",
    dev: "Veloren Community",
    cat: "Oyun",
    scatKey: "cat.games",
    tab: "games",
    sz: 850,
    dn: "230K",
    ag: "12+",
    vr: "0.16.0",
    li: "GPL-3.0",
    src: "https://veloren.net/",
    sn: "Açık kaynaklı, voksel tabanlı çok oyunculu RPG.",
    ds: "Veloren, Rust ile geliştirilen, Minecraft ve Cube World'den ilham alan, prosedürel olarak üretilen dünyalarda maceraya atıldığınız açık kaynaklı bir çok oyunculu RPG'dir.",
    ic: "<i class=\"ti ti-sword\"></i>",
    co: "ico-teal",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["rpg", "multiplayer", "voxel", "open-source"],
    screenshots: [
      "https://dl.flathub.org/media/net/veloren/airshipper/4cb2b65c1a19600eff2bc81db6479756/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/net/veloren/airshipper/4cb2b65c1a19600eff2bc81db6479756/screenshots/image-2_1248x522@1.png",
      "https://dl.flathub.org/media/net/veloren/airshipper/4cb2b65c1a19600eff2bc81db6479756/screenshots/image-3_1248x702@1.png",
      "https://dl.flathub.org/media/net/veloren/airshipper/4cb2b65c1a19600eff2bc81db6479756/screenshots/image-4_1248x702@1.png"
    ],
    detect: { linux: "airshipper", flatpakId: "net.veloren.airshipper" },
    install: {
      fedora: { type: "flatpak", value: "net.veloren.airshipper" },
      pisi: { type: "flatpak", value: "net.veloren.airshipper" },
      debian: { type: "flatpak", value: "net.veloren.airshipper" }
    }
  },
  retroarch: {
    id: "retroarch",
    name: "RetroArch",
    dev: "Libretro Team",
    cat: "Oyun",
    scatKey: "cat.games",
    tab: "games",
    sz: 65,
    dn: "1.1M",
    ag: "4+",
    vr: "1.19.1",
    li: "GPL-3.0",
    src: "https://www.retroarch.com/",
    sn: "Tüm retro konsolları tek çatı altında toplayan emülatör.",
    ds: "RetroArch, Libretro çekirdekleri aracılığıyla düzinelerce klasik oyun konsolunu ve bilgisayarı tek, birleşik bir arayüzden emüle etmenizi sağlayan güçlü bir platformdur.",
    ic: "<i class=\"ti ti-device-gamepad\"></i>",
    co: "ico-dark",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["emulation", "retro", "libretro"],
    screenshots: [
      "https://dl.flathub.org/media/org/libretro/RetroArch/0f9e059f4695b7116bab0d3d1cae1936/screenshots/image-1_1248x686@1.png",
      "https://dl.flathub.org/media/org/libretro/RetroArch/0f9e059f4695b7116bab0d3d1cae1936/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/org/libretro/RetroArch/0f9e059f4695b7116bab0d3d1cae1936/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/org/libretro/RetroArch/0f9e059f4695b7116bab0d3d1cae1936/screenshots/image-4_orig.png"
    ],
    detect: { linux: "retroarch", flatpakId: "org.libretro.RetroArch" },
    install: {
      fedora: { type: "pkg", value: "retroarch" },
      pisi: { type: "flatpak", value: "org.libretro.RetroArch" },
      debian: { type: "pkg", value: "retroarch" }
    }
  },
  // === MEDIA & AUDIO/VIDEO (ek) ===
  kdenlive: {
    id: "kdenlive",
    name: "Kdenlive",
    dev: "KDE Community",
    cat: "Video Düzenleme",
    scatKey: "cat.media",
    tab: "all",
    sz: 285,
    dn: "540K",
    ag: "4+",
    vr: "24.08.2",
    li: "GPL-3.0",
    src: "https://kdenlive.org/",
    sn: "Profesyonel, açık kaynaklı video düzenleme yazılımı.",
    ds: "Kdenlive, çok izli zaman çizelgesi, geniş efekt kütüphanesi ve renk düzeltme araçlarıyla profesyonel düzeyde video düzenleme sunan açık kaynaklı bir uygulamadır.",
    ic: "<i class=\"ti ti-movie\"></i>",
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"], ["ver", "circle-check-filled", "ver"]],
    tags: ["video", "editing", "kde"],
    screenshots: [
      "https://dl.flathub.org/media/org/kde/kdenlive.desktop/5c110e8e1bd7d642a117db2546705958/screenshots/image-1_1248x738@1.png",
      "https://dl.flathub.org/media/org/kde/kdenlive.desktop/5c110e8e1bd7d642a117db2546705958/screenshots/image-2_1248x712@1.png",
      "https://dl.flathub.org/media/org/kde/kdenlive.desktop/5c110e8e1bd7d642a117db2546705958/screenshots/image-3_1248x716@1.png",
      "https://dl.flathub.org/media/org/kde/kdenlive.desktop/5c110e8e1bd7d642a117db2546705958/screenshots/image-4_1248x734@1.png"
    ],
    detect: { linux: "kdenlive", flatpakId: "org.kde.kdenlive" },
    install: {
      fedora: { type: "pkg", value: "kdenlive" },
      pisi: { type: "flatpak", value: "org.kde.kdenlive" },
      debian: { type: "pkg", value: "kdenlive" },
      windows: { type: "url", value: "https://download.kde.org/stable/kdenlive/24.08/windows/kdenlive-24.08.1-x86_64.exe", ext: ".exe" }
    }
  },
  tidal: {
    id: "tidal",
    name: "Tidal",
    dev: "TIDAL-hifi (topluluk)",
    cat: "Müzik Dinleme",
    scatKey: "cat.media",
    tab: "top",
    sz: 155,
    dn: "88K",
    ag: "4+",
    vr: "5.13.0",
    li: "Proprietary",
    src: "https://tidal.com/",
    sn: "Yüksek çözünürlüklü ses akışı sunan müzik platformu.",
    ds: "TIDAL, kayıpsız ve Master kalitede yüksek çözünürlüklü müzik akışı sunan bir servistir; bu masaüstü istemcisi topluluk tarafından geliştirilen gayriresmi bir sarmalayıcıdır.",
    ic: "<i class=\"ti ti-wave-square\"></i>",
    co: "ico-dark",
    tr: [["warn", "shield-alert", "warn"]],
    tags: ["music", "streaming", "hifi"],
    screenshots: [
      "https://dl.flathub.org/media/com/mastermindzh/tidal-hifi/c56f914171c6bd6e2f50a58458b8134f/screenshots/image-1_1248x998@1.png",
      "https://dl.flathub.org/media/com/mastermindzh/tidal-hifi/c56f914171c6bd6e2f50a58458b8134f/screenshots/image-2_1248x813@1.png",
      "https://dl.flathub.org/media/com/mastermindzh/tidal-hifi/c56f914171c6bd6e2f50a58458b8134f/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/com/mastermindzh/tidal-hifi/c56f914171c6bd6e2f50a58458b8134f/screenshots/image-4_1248x665@1.png"
    ],
    detect: { linux: "tidal-hifi", flatpakId: "com.mastermindzh.tidal-hifi" },
    install: {
      fedora: { type: "flatpak", value: "com.mastermindzh.tidal-hifi" },
      pisi: { type: "flatpak", value: "com.mastermindzh.tidal-hifi" },
      debian: { type: "flatpak", value: "com.mastermindzh.tidal-hifi" }
    }
  },
  mpv: {
    id: "mpv",
    name: "MPV Player",
    dev: "mpv Community",
    cat: "Medya Oynatıcı",
    scatKey: "cat.media",
    tab: "all",
    sz: 35,
    dn: "870K",
    ag: "4+",
    vr: "0.39.0",
    li: "GPL-2.0",
    src: "https://mpv.io/",
    sn: "Minimalist, yüksek performanslı medya oynatıcı.",
    ds: "mpv, komut satırından tam kontrol edilebilen, geniş codec desteğine ve düşük kaynak tüketimine sahip, güç kullanıcıları için tasarlanmış açık kaynaklı bir medya oynatıcıdır.",
    ic: "<i class=\"ti ti-player-play\"></i>",
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["video", "player", "minimal"],
    screenshots: [
      "https://dl.flathub.org/media/io/mpv/Mpv/4021dec7d90c2c9591fef27ba6a04f5b/screenshots/image-1_orig.png"
    ],
    detect: { linux: "mpv", flatpakId: "io.mpv.Mpv" },
    install: {
      fedora: { type: "pkg", value: "mpv" },
      pisi: { type: "flatpak", value: "io.mpv.Mpv" },
      debian: { type: "pkg", value: "mpv" }
    }
  },
  shotcut: {
    id: "shotcut",
    name: "Shotcut",
    dev: "Meltytech, LLC",
    cat: "Video Düzenleme",
    scatKey: "cat.media",
    tab: "all",
    sz: 195,
    dn: "410K",
    ag: "4+",
    vr: "24.09.28",
    li: "GPL-3.0",
    src: "https://www.shotcut.org/",
    sn: "Çapraz platform, açık kaynaklı video düzenleyici.",
    ds: "Shotcut, geniş format desteği, çoklu izleme ve GPU hızlandırmalı işleme sunan, MLT çerçevesi üzerine inşa edilmiş özgür bir video düzenleme yazılımıdır.",
    ic: "<i class=\"ti ti-scissors\"></i>",
    co: "ico-teal",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["video", "editing", "cross-platform"],
    screenshots: [
      "https://dl.flathub.org/media/org/shotcut/Shotcut/82429da08141af7bb3cfa003b5fd58e3/screenshots/image-1_1248x770@1.png",
      "https://dl.flathub.org/media/org/shotcut/Shotcut/82429da08141af7bb3cfa003b5fd58e3/screenshots/image-2_orig.png",
      "https://dl.flathub.org/media/org/shotcut/Shotcut/82429da08141af7bb3cfa003b5fd58e3/screenshots/image-3_orig.png",
      "https://dl.flathub.org/media/org/shotcut/Shotcut/82429da08141af7bb3cfa003b5fd58e3/screenshots/image-4_orig.png"
    ],
    detect: { linux: "shotcut", flatpakId: "org.shotcut.Shotcut" },
    install: {
      fedora: { type: "flatpak", value: "org.shotcut.Shotcut" },
      pisi: { type: "flatpak", value: "org.shotcut.Shotcut" },
      debian: { type: "flatpak", value: "org.shotcut.Shotcut" }
    }
  },
  clementine: {
    id: "clementine",
    name: "Clementine",
    dev: "Clementine Team",
    cat: "Müzik Dinleme",
    scatKey: "cat.media",
    tab: "top",
    sz: 55,
    dn: "290K",
    ag: "4+",
    vr: "1.4.0",
    li: "GPL-3.0",
    src: "https://www.clementine-player.org/",
    sn: "Büyük müzik kütüphaneleri için klasik müzik oynatıcı.",
    ds: "Clementine, geniş müzik kütüphanelerini hızlıca aramanızı, akıllı çalma listeleri oluşturmanızı ve internet radyolarını dinlemenizi sağlayan zamansız bir müzik oynatıcısıdır.",
    ic: "<i class=\"ti ti-flower\"></i>",
    co: "ico-rose",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["music", "player", "library"],
    screenshots: [
      "https://dl.flathub.org/media/org/clementine_player/Clementine/763141e7753efbf77490d08aa6affaf4/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/org/clementine_player/Clementine/763141e7753efbf77490d08aa6affaf4/screenshots/image-2_orig.png"
    ],
    detect: { linux: "clementine", flatpakId: "org.clementine_player.Clementine" },
    install: {
      fedora: { type: "pkg", value: "clementine" },
      pisi: { type: "flatpak", value: "org.clementine_player.Clementine" },
      debian: { type: "pkg", value: "clementine" }
    }
  },
  strawberry: {
    id: "strawberry",
    name: "Strawberry Music Player",
    dev: "Strawberry Music Player",
    cat: "Müzik Dinleme",
    scatKey: "cat.media",
    tab: "top",
    sz: 62,
    dn: "165K",
    ag: "4+",
    vr: "1.2.9",
    li: "GPL-3.0",
    src: "https://www.strawberrymusicplayer.org/",
    sn: "Ses tutkunları için Clementine tabanlı müzik oynatıcı.",
    ds: "Strawberry, Clementine'den çatallanan, kayıpsız ses formatlarına ve gelişmiş ses cihazı desteğine odaklanan, koleksiyoncular ve ses tutkunları için bir müzik oynatıcısıdır.",
    ic: "<i class=\"ti ti-music\"></i>",
    co: "ico-coral",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["music", "player", "audiophile"],
    screenshots: [
      "https://dl.flathub.org/media/org/strawberrymusicplayer/strawberry/56a07886e3e347fd025975758edd8bb7/screenshots/image-1_1248x726@1.png",
      "https://dl.flathub.org/media/org/strawberrymusicplayer/strawberry/56a07886e3e347fd025975758edd8bb7/screenshots/image-2_1248x726@1.png"
    ],
    detect: { linux: "strawberry", flatpakId: "org.strawberrymusicplayer.strawberry" },
    install: {
      fedora: { type: "pkg", value: "strawberry" },
      pisi: { type: "flatpak", value: "org.strawberrymusicplayer.strawberry" },
      debian: { type: "pkg", value: "strawberry" }
    }
  },
  // === CHAT & SOCIAL (ek) ===
  element: {
    id: "element",
    name: "Element",
    dev: "Element / Matrix.org",
    cat: "Güvenli Mesajlaşma",
    scatKey: "cat.chat",
    tab: "all",
    sz: 145,
    dn: "620K",
    ag: "4+",
    vr: "1.11.86",
    li: "AGPL-3.0",
    src: "https://element.io/",
    sn: "Merkeziyetsiz Matrix protokolü üzerinde güvenli mesajlaşma.",
    ds: "Element, uçtan uca şifreli, merkeziyetsiz Matrix protokolü üzerinde çalışan, kendi sunucunuzu barındırabildiğiniz açık kaynaklı bir mesajlaşma ve takım çalışması uygulamasıdır.",
    ic: "<i class=\"ti ti-message-2\"></i>",
    co: "ico-green",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"], ["ver", "circle-check-filled", "ver"]],
    tags: ["chat", "matrix", "decentralized"],
    screenshots: [
      "https://dl.flathub.org/media/im/riot/Riot/f7d28d5e93f22b33a9070a725ff3563f/screenshots/image-1_1248x679@1.png"
    ],
    detect: { linux: "element-desktop", flatpakId: "im.riot.Riot" },
    install: {
      fedora: { type: "flatpak", value: "im.riot.Riot" },
      pisi: { type: "flatpak", value: "im.riot.Riot" },
      debian: { type: "flatpak", value: "im.riot.Riot" },
      windows: { type: "url", value: "https://packages.element.io/desktop/install/win32/x64/Element%20Setup.exe", ext: ".exe" }
    }
  },
  slack: {
    id: "slack",
    name: "Slack",
    dev: "Slack Technologies",
    cat: "Takım İletişimi",
    scatKey: "cat.chat",
    tab: "top",
    sz: 175,
    dn: "4.2M",
    ag: "4+",
    vr: "4.40.130",
    li: "Proprietary",
    src: "https://slack.com/",
    sn: "Takımlar için kanal tabanlı iş iletişim platformu.",
    ds: "Slack, kanallar, doğrudan mesajlar ve binlerce uygulama entegrasyonuyla takımların iş iletişimini tek bir platformda toplamasını sağlayan popüler bir kurumsal mesajlaşma aracıdır.",
    ic: "<i class=\"ti ti-brand-slack\"></i>",
    co: "ico-purple",
    tr: [["warn", "shield-alert", "warn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["chat", "team", "business"],
    screenshots: [
      "https://dl.flathub.org/media/com/slack/Slack/eeba94d6ab4f3ea87fe4eea130ba2a74/screenshots/image-1_1248x902@1.png",
      "https://dl.flathub.org/media/com/slack/Slack/eeba94d6ab4f3ea87fe4eea130ba2a74/screenshots/image-2_1248x902@1.png"
    ],
    detect: { linux: "slack", flatpakId: "com.slack.Slack" },
    install: {
      fedora: { type: "flatpak", value: "com.slack.Slack" },
      pisi: { type: "flatpak", value: "com.slack.Slack" },
      debian: { type: "flatpak", value: "com.slack.Slack" },
      windows: { type: "url", value: "https://downloads.slack-edge.com/desktop-releases/windows/x64/4.40.130/SlackSetup.exe", ext: ".exe" }
    }
  },
  zoom: {
    id: "zoom",
    name: "Zoom Workplace",
    dev: "Zoom Video Communications",
    cat: "Görüntülü Görüşme",
    scatKey: "cat.chat",
    tab: "top",
    sz: 165,
    dn: "5.6M",
    ag: "4+",
    vr: "6.2.6",
    li: "Proprietary",
    src: "https://zoom.us/",
    sn: "Video konferans ve online toplantı platformu.",
    ds: "Zoom, HD görüntülü/sesli görüşmeler, ekran paylaşımı ve webinar düzenleme özellikleriyle uzaktan toplantılar için sektör standardı haline gelmiş bir platformdur.",
    ic: "<i class=\"ti ti-video\"></i>",
    co: "ico-blue",
    tr: [["warn", "shield-alert", "warn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["video-call", "meetings", "business"],
    screenshots: [
      "https://dl.flathub.org/media/us/zoom/Zoom/bad8e8668f794234d21019662f46a305/screenshots/image-1_orig.png",
      "https://dl.flathub.org/media/us/zoom/Zoom/bad8e8668f794234d21019662f46a305/screenshots/image-2_orig.png"
    ],
    detect: { linux: "zoom", flatpakId: "us.zoom.Zoom" },
    install: {
      fedora: { type: "flatpak", value: "us.zoom.Zoom" },
      pisi: { type: "flatpak", value: "us.zoom.Zoom" },
      debian: { type: "flatpak", value: "us.zoom.Zoom" }
    }
  },
  session: {
    id: "session",
    name: "Session",
    dev: "Session Technology Foundation",
    cat: "Gizli Mesajlaşma",
    scatKey: "cat.chat",
    tab: "all",
    sz: 130,
    dn: "310K",
    ag: "4+",
    vr: "1.14.3",
    li: "GPL-3.0",
    src: "https://getsession.org/",
    sn: "Telefon numarası gerektirmeyen, merkeziyetsiz anonim mesajlaşma.",
    ds: "Session, telefon numarası veya e-posta gerektirmeden, merkezi sunucular olmadan onion-routing benzeri bir ağ üzerinden anonim ve uçtan uca şifreli mesajlaşma sağlayan bir uygulamadır.",
    ic: "<i class=\"ti ti-shield-lock\"></i>",
    co: "ico-dark",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["chat", "privacy", "anonymous", "decentralized"],
    screenshots: [
      "https://dl.flathub.org/media/n/ne/network.loki.session/89601e6ce1cf083b3bd2da2de6d01889/screenshots/image-1_1248x801@1.png"
    ],
    detect: { linux: "session-desktop", flatpakId: "network.loki.Session" },
    install: {
      fedora: { type: "flatpak", value: "network.loki.Session" },
      pisi: { type: "flatpak", value: "network.loki.Session" },
      debian: { type: "flatpak", value: "network.loki.Session" }
    }
  },
  revolt: {
    id: "revolt",
    name: "Revolt Chat",
    dev: "Revolt Community",
    cat: "Sesli Sohbet & Topluluk",
    scatKey: "cat.chat",
    tab: "top",
    sz: 120,
    dn: "95K",
    ag: "12+",
    vr: "1.0.10",
    li: "AGPL-3.0",
    src: "https://revolt.chat/",
    sn: "Açık kaynaklı, Discord'a benzer topluluk sohbet platformu.",
    ds: "Revolt, sunucular, kanallar ve sesli sohbet gibi tanıdık özellikleriyle Discord'a açık kaynaklı ve gizlilik odaklı bir alternatif olarak geliştirilen bir topluluk platformudur.",
    ic: "<i class=\"ti ti-message-circle-2\"></i>",
    co: "ico-indigo",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["chat", "discord-alternative", "open-source"],
    screenshots: [
      "https://dl.flathub.org/media/chat/revolt/RevoltDesktop/7c7c0d0ba7d0669217b36ed549f4bfb4/screenshots/image-1_1248x702@1.png"
    ],
    detect: { linux: "revolt-desktop", flatpakId: "chat.revolt.RevoltDesktop" },
    install: {
      fedora: { type: "flatpak", value: "chat.revolt.RevoltDesktop" },
      pisi: { type: "flatpak", value: "chat.revolt.RevoltDesktop" },
      debian: { type: "flatpak", value: "chat.revolt.RevoltDesktop" }
    }
  },
  // === SYSTEM & SECURITY (ek) ===
  powertoys: {
    id: "powertoys",
    name: "PowerToys",
    dev: "Microsoft",
    cat: "Sistem Araçları",
    scatKey: "cat.system",
    tab: "system",
    sz: 145,
    dn: "3.1M",
    ag: "4+",
    vr: "0.81.0",
    li: "MIT",
    src: "https://learn.microsoft.com/windows/powertoys/",
    sn: "Windows için üretkenlik artırıcı sistem araçları paketi.",
    ds: "PowerToys, pencere yönetimi, dosya yeniden adlandırma ve renk seçici gibi Windows'un günlük kullanımını hızlandıran araçlardan oluşan Microsoft'un açık kaynaklı yardımcı programlar setidir. Yalnızca Windows'ta çalışır.",
    ic: "<i class=\"ti ti-settings-2\"></i>",
    co: "ico-blue",
    tr: [["opn", "code", "opn"], ["ver", "circle-check-filled", "ver"]],
    tags: ["windows", "utilities", "productivity"],
    detect: { linux: null, flatpakId: null },
    install: {
      windows: { type: "url", value: "https://github.com/microsoft/PowerToys/releases/download/v0.81.0/PowerToysUserSetup-0.81.0-x64.exe", ext: ".exe" }
    }
  },
  bleachbit: {
    id: "bleachbit",
    name: "BleachBit",
    dev: "BleachBit Team",
    cat: "Sistem İyileştirme",
    scatKey: "cat.system",
    tab: "system",
    sz: 15,
    dn: "540K",
    ag: "4+",
    vr: "4.6.1",
    li: "GPL-3.0",
    src: "https://www.bleachbit.org/",
    sn: "Disk alanı boşaltan ve gizlilik izlerini temizleyen araç.",
    ds: "BleachBit, geçici dosyaları, önbellekleri ve tarayıcı geçmişini temizleyerek disk alanı kazandıran ve gizliliğinizi koruyan hızlı, açık kaynaklı bir sistem temizleme aracıdır.",
    ic: "<i class=\"ti ti-trash-x\"></i>",
    co: "ico-green",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["cleaner", "privacy", "disk-space"],
    screenshots: [
      "https://dl.flathub.org/media/org/bleachbit/BleachBit/41354259f57d33d2fc4df84becaae6ee/screenshots/image-1_orig.png"
    ],
    detect: { linux: "bleachbit", flatpakId: "org.bleachbit.BleachBit" },
    install: {
      fedora: { type: "pkg", value: "bleachbit" },
      pisi: { type: "flatpak", value: "org.bleachbit.BleachBit" },
      debian: { type: "pkg", value: "bleachbit" }
    }
  },
  gparted: {
    id: "gparted",
    name: "GParted",
    dev: "GParted Team",
    cat: "Disk Yönetimi",
    scatKey: "cat.system",
    tab: "system",
    sz: 22,
    dn: "620K",
    ag: "4+",
    vr: "1.6.0",
    li: "GPL-2.0",
    src: "https://gparted.org/",
    sn: "Grafik arayüzlü disk bölümleme aracı.",
    ds: "GParted, disk bölümlerini oluşturma, yeniden boyutlandırma, taşıma ve biçimlendirme işlemlerini görsel bir arayüzle güvenle yapmanızı sağlayan güçlü bir disk yönetim aracıdır.",
    ic: "<i class=\"ti ti-disc\"></i>",
    co: "ico-orange",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["disk", "partition", "system"],
    detect: { linux: "gparted", flatpakId: null },
    install: {
      fedora: { type: "pkg", value: "gparted" },
      debian: { type: "pkg", value: "gparted" }
    }
  },
  protonvpn: {
    id: "protonvpn",
    name: "Proton VPN",
    dev: "Proton AG",
    cat: "VPN & Gizlilik",
    scatKey: "cat.system",
    tab: "top",
    sz: 65,
    dn: "1.3M",
    ag: "4+",
    vr: "4.4.0",
    li: "GPL-3.0",
    src: "https://protonvpn.com/",
    sn: "İsviçre merkezli, gizlilik odaklı VPN servisi.",
    ds: "Proton VPN, günlük tutmama politikası ve açık kaynaklı istemcileriyle İsviçre gizlilik yasalarının koruması altında güvenli internet erişimi sağlayan bir VPN hizmetidir.",
    ic: "<i class=\"ti ti-shield-check\"></i>",
    co: "ico-purple",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"], ["ver", "circle-check-filled", "ver"]],
    tags: ["vpn", "privacy", "security"],
    screenshots: [
      "https://dl.flathub.org/media/com/protonvpn/www/5ce51fb701e7e7a41ea583742dc17cef/screenshots/image-1_orig.png"
    ],
    detect: { linux: "protonvpn-app", flatpakId: "com.protonvpn.www" },
    install: {
      fedora: { type: "flatpak", value: "com.protonvpn.www" },
      pisi: { type: "flatpak", value: "com.protonvpn.www" },
      debian: { type: "flatpak", value: "com.protonvpn.www" }
    }
  },
  mullvadvpn: {
    id: "mullvadvpn",
    name: "Mullvad VPN",
    dev: "Mullvad VPN AB",
    cat: "VPN & Gizlilik",
    scatKey: "cat.system",
    tab: "top",
    sz: 45,
    dn: "480K",
    ag: "4+",
    vr: "2024.6",
    li: "GPL-3.0",
    src: "https://mullvad.net/",
    sn: "Hesap bile gerektirmeyen anonim VPN servisi.",
    ds: "Mullvad VPN, e-posta adresi bile istemeden rastgele bir hesap numarasıyla kayıt olmanıza izin veren, WireGuard destekli, gizlilik konusunda son derece titiz bir VPN sağlayıcısıdır.",
    ic: "<i class=\"ti ti-eye-off\"></i>",
    co: "ico-dark",
    tr: [["opn", "code", "opn"], ["suc", "shield-check", "suc"]],
    tags: ["vpn", "privacy", "anonymous"],
    detect: { linux: "mullvad-vpn", flatpakId: "net.mullvad.MullvadVPN" },
    install: {
      fedora: { type: "flatpak", value: "net.mullvad.MullvadVPN" },
      pisi: { type: "flatpak", value: "net.mullvad.MullvadVPN" },
      debian: { type: "flatpak", value: "net.mullvad.MullvadVPN" }
    }
  },
};
