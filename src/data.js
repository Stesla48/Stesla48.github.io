// All facts below come from Selim's CV files (cv.docx + EN translation).
export const links = {
  email: 'selimyaglioglu@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/selimyaglioglu',
  github: 'https://github.com/Stesla48',
  thm: 'https://tryhackme.com/certificate/THM-GP1X1C0VXM',
}

export const projects = [
  { name: 'Flask-ile-Blog-Sitesi', url: 'https://github.com/Stesla48/Flask-ile-Blog-Sitesi', tech: ['Python', 'Flask', 'Auth', 'CRUD', 'Database'],
    en: 'Built a blog website using user authentication, CRUD operations and database integration.',
    tr: 'Kullanıcı kimlik doğrulama, CRUD işlemleri ve veritabanı entegrasyonu kullanılarak bir blog sitesi yapıldı.' },
  { name: 'Django-ile-YBBLOG-Sitesi', url: 'https://github.com/Stesla48/Django-ile-YBBLOG-Sitesi', tech: ['Python', 'Django'],
    en: 'Rebuilt a copy of the Flask blog website with Django.',
    tr: 'Flask ile yapılan Blog sitesinin kopyası Django ile yeniden yapıldı.' },
  { name: 'flasktodoapp', url: 'https://github.com/Stesla48/flasktodoapp', tech: ['Python', 'Flask'],
    en: 'Built a to-do list application with Flask.',
    tr: 'Flask ile yapılacaklar listesi uygulaması yapıldı.' },
  { name: 'Blockchain_webapp_vote', url: 'https://github.com/Stesla48/Blockchain_webapp_vote', tech: ['React', 'Blockchain'],
    en: 'Built a simulation of a secure and immutable vote-recording structure with React.',
    tr: 'Güvenli ve değiştirilemez oy kayıt yapısının simülasyonu React ile yapıldı.' },
  { name: 'NLP_Project', url: 'https://github.com/Stesla48/NLP_Project', tech: ['Python', 'NLP'],
    en: 'Text analysis and natural language processing in Python, following a sound roadmap starting with data preprocessing.',
    tr: 'Metin analizi ve doğal dil işleme çalışmaları Python ile, önce veri ön işlemleri yapılarak doğru yol haritası izlenip başarıya ulaşıldı.' },
  { name: 'GIHUB-FINDER', url: 'https://github.com/Stesla48/GIHUB-FINDER', tech: ['Python', 'Flask', 'GitHub API'],
    en: 'Built a user and repository search application with Flask using the GitHub API.',
    tr: 'Flask ile GitHub API kullanılarak kullanıcı ve repository arama uygulaması yapıldı.' },
  { name: 'Scrapy_ile_Kitap_yurdu_Projesi', url: 'https://github.com/Stesla48/Scrapy_ile_Kitap_yurdu_Projesi', tech: ['Python', 'Scrapy'],
    en: 'Automated data collection and processing with Python Scrapy; the collected data was then written to a file.',
    tr: 'Python Scrapy ile otomatik veri toplama ve işleme; daha sonra bu veriler bir dosyaya yazıldı.' },
]

export const experience = [
  { date: '16.07.2024 – 29.08.2024', company: 'Secunnix', place: 'Ankara',
    role: { en: 'Penetration Testing Intern', tr: 'Stajyer (Penetrasyon Testi)' },
    en: [
      'Advanced administration and security work on Linux and Windows systems.',
      'Network reconnaissance, vulnerability scanning and penetration tests in a Kali Linux environment.',
      'Applied MITM, Dictionary Attack, Privilege Escalation, SMB Relay, NTLM Hash Cracking and Pass-the-Hash attacks.',
      'Prepared vulnerability reports and technical documentation based on real-world scenarios.',
    ],
    tr: [
      'Linux ve Windows sistemlerde ileri seviye yönetim ve güvenlik çalışmaları.',
      'Kali Linux ortamında ağ keşfi, zafiyet taraması ve penetrasyon testleri.',
      'MITM, Dictionary Attack, Privilege Escalation, SMB Relay, NTLM Hash Cracking ve Pass-the-Hash saldırıları uygulandı.',
      'Gerçek dünya senaryolarına uygun zafiyet raporları ve teknik dokümantasyon hazırlandı.',
    ],
    tags: ['Kali Linux', 'Active Directory', 'MITM', 'SMB Relay', 'Pass-the-Hash'] },
  { date: '15.07.2023 – 15.08.2023', company: 'Patırtı', place: 'Muğla',
    role: { en: 'Web Development Intern', tr: 'Stajyer (Web Geliştirme)' },
    en: [
      'Frontend web-based work with WordPress.',
      'Theme customization and content management.',
    ],
    tr: [
      'WordPress ile frontend üzerine web tabanlı çalışmalar.',
      'Tema düzenlemeleri ve içerik yönetimi.',
    ],
    tags: ['WordPress', 'Frontend'] },
]

export const skills = [
  { key: 'prog', en: 'Programming & Scripting', tr: 'Programlama ve Script', items: {
    en: ['Python (Flask, Django, Automation, Security Scripts)', 'Bash & Linux Scripting', 'C / C++ (OOP – Basic)', 'C# (OOP – Basic)', 'PHP, JavaScript (Basic)'],
    tr: ['Python (Flask, Django, Otomasyon, Güvenlik Scriptleri)', 'Bash ve Linux Script Yazımı', 'C / C++ (OOP – Temel)', 'C# (OOP – Temel)', 'PHP, JavaScript (Temel)'] } },
  { key: 'sec', en: 'Cybersecurity & Systems', tr: 'Siber Güvenlik ve Sistemler', items: {
    en: ['Linux & Windows System Administration', 'Networking Fundamentals & TCP/IP', 'Penetration Testing & Vulnerability Analysis', 'Active Directory Attack Techniques', 'Firewall Configuration & System Hardening'],
    tr: ['Linux ve Windows Sistem Yönetimi', 'Ağ Temelleri ve TCP/IP', 'Penetrasyon Testi ve Zafiyet Analizi', 'Active Directory Saldırı Teknikleri', 'Firewall Yapılandırması ve Sistem Sertleştirme'] } },
  { key: 'web', en: 'Web & API', tr: 'Web ve API', items: {
    en: ['Flask & Django (REST-based web applications)', 'HTML, CSS, Bootstrap', 'React Native (Basic – Android)'],
    tr: ['Flask & Django (REST tabanlı web uygulamaları)', 'HTML, CSS, Bootstrap', 'React Native (Temel – Android)'] } },
  { key: 'tools', en: 'Tools', tr: 'Araçlar', items: {
    en: ['Kali Linux, VMware', 'Nmap, Metasploit (Basic)', 'Git, GitHub'],
    tr: ['Kali Linux, VMware', 'Nmap, Metasploit (Temel)', 'Git, GitHub'] } },
  { key: 'lang', en: 'Languages', tr: 'Diller', items: {
    en: ['English (Intermediate)'], tr: ['İngilizce (Orta Düzey)'] } },
]

export const t = {
  en: {
    nav: ['about', 'projects', 'experience', 'certs', 'skills', 'contact'],
    role: 'Cybersecurity & Software Engineer',
    tagline: 'Junior penetration tester & software engineer · Turkey · open to remote roles',
    ctaProjects: './view_projects', ctaContact: './contact_me',
    aboutTitle: 'about', aboutBody: [
      '2025 Software Engineering graduate with penetration testing (Secunnix) and web development (Patırtı) internships.',
      'I build web apps and security scripts with Python, Flask and Django.',
      'Seeking junior security or software engineering roles; open to remote work.',
    ],
    edu: 'Education', eduDeg: 'BSc, Software Engineering', eduUni: 'Gümüşhane University — Faculty of Engineering and Natural Sciences', gpa: 'GPA 3.26 / 4.00',
    projectsTitle: 'projects', viewRepo: 'view on GitHub',
    expTitle: 'experience', certTitle: 'certifications',
    certName: 'CompTIA Pentest+ Learning Path', certKind: 'TryHackMe learning path completion',
    certNote: 'Completion certificate for TryHackMe\u2019s learning path — not the CompTIA PenTest+ certification itself.',
    certDate: '21 April 2026 · 32h 25m', verify: 'verify certificate',
    eventsTitle: 'Events', event: 'Kodla.co 2022 Event',
    skillsTitle: 'skills', contactTitle: 'contact',
    contactBody: 'Open to junior cybersecurity and software engineering roles — remote or in Turkey. Fastest way to reach me:',
    termHint: 'type "help" and press Enter', footer: 'Built with React + Framer Motion · hosted on GitHub Pages',
  },
  tr: {
    nav: ['hakkımda', 'projeler', 'deneyim', 'sertifika', 'yetenekler', 'iletişim'],
    role: 'Siber Güvenlik & Yazılım Mühendisi',
    tagline: 'Junior sızma testi uzmanı & yazılım mühendisi · Türkiye · uzaktan çalışmaya açık',
    ctaProjects: './projeleri_gor', ctaContact: './iletisim',
    aboutTitle: 'hakkımda', aboutBody: [
      'Penetrasyon testi (Secunnix) ve web geliştirme (Patırtı) stajları yapmış, 2025 Yazılım Mühendisliği mezunuyum.',
      'Python, Flask ve Django ile web uygulamaları ve güvenlik scriptleri geliştiriyorum.',
      'Junior siber güvenlik veya yazılım mühendisliği pozisyonları arıyorum; uzaktan çalışmaya açığım.',
    ],
    edu: 'Eğitim', eduDeg: 'Lisans, Yazılım Mühendisliği', eduUni: 'Gümüşhane Üniversitesi — Mühendislik ve Doğa Bilimleri Fakültesi', gpa: 'GANO 3.26 / 4.00',
    projectsTitle: 'projeler', viewRepo: 'GitHub\u2019da gör',
    expTitle: 'deneyim', certTitle: 'sertifikalar',
    certName: 'CompTIA Pentest+ Learning Path', certKind: 'TryHackMe öğrenme yolu tamamlama',
    certNote: 'TryHackMe öğrenme yolunun tamamlama sertifikasıdır — CompTIA PenTest+ sertifikasının kendisi değildir.',
    certDate: '21 Nisan 2026 · 32 sa 25 dk', verify: 'sertifikayı doğrula',
    eventsTitle: 'Etkinlikler', event: 'Kodla.co 2022 Etkinliği',
    skillsTitle: 'yetenekler', contactTitle: 'iletişim',
    contactBody: 'Junior siber güvenlik ve yazılım mühendisliği pozisyonlarına açığım — uzaktan veya Türkiye\u2019de. Bana ulaşmanın en hızlı yolu:',
    termHint: '"help" yazıp Enter\u2019a bas', footer: 'React + Framer Motion ile yapıldı · GitHub Pages üzerinde',
  },
}
