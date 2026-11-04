# Selim YAĞLIOĞLU — Portfolyo Sitesi

Tek sayfalık, terminal temalı portfolyo sitesi: Matrix tarzı karakter yağmuru, glitch efektleri,
yazı yazma animasyonu ve Framer Motion animasyonları. **Vite + React + Framer Motion**, tamamen statik,
GitHub Pages'te ücretsiz yayınlanır. Tüm içerik CV'den alınmıştır (`src/data.js`). Site Türkçe açılır; EN/TR düğmesi dili değiştirir ve seçim tarayıcıda hatırlanır.

## Yerelde çalıştırma
```bash
npm ci            # bağımlılıkları kur
npm run dev       # geliştirme sunucusu: http://localhost:5173
npm run build     # üretim derlemesi -> dist/
npm run preview   # derlemeyi yerelde önizle: http://localhost:4173
```
Node.js 20.19+ veya 22+ gerekir.

## GitHub Pages'e yayınlama (adım adım)
1. GitHub'da yeni bir **public** repo aç:
   - Ana adres olsun istersen repo adı **`Stesla48.github.io`** olmalı → site: `https://stesla48.github.io/`
   - Ya da **`portfolio`** adında bir repo → site: `https://stesla48.github.io/portfolio/`
2. Bu klasörü repoya gönder:
   ```bash
   git init
   git add .
   git commit -m "Portfolyo sitesi"
   git branch -M main
   git remote add origin https://github.com/Stesla48/<REPO-ADI>.git
   git push -u origin main
   ```
3. Repoda **Settings → Pages → Build and deployment → Source: "GitHub Actions"** seç.
4. **Actions** sekmesinde "Deploy to GitHub Pages" iş akışı otomatik çalışır (1–2 dk). Bittiğinde link Settings → Pages'te görünür.
5. **Settings → Pages → "Enforce HTTPS"** kutusunu işaretle (GitHub Pages HTTPS sunar; bu seçenek HTTP'yi HTTPS'e zorlar).

`base` yolu otomatik ayarlanır: repo adı `*.github.io` ise `/`, değilse `/<repo-adı>/`.
Elle derlemek istersen: `BASE_PATH=/portfolio/ npm run build`.

İçeriği değiştirmek için sadece `src/data.js` dosyasını düzenle; `main`'e her push siteyi yeniden yayınlar.

## Profil fotoğrafı
Kahraman bölümündeki altıgen, `public/profile.jpg` dosyasını yükler. Dosya yoksa veya açılmazsa yerine baş harflerden oluşan **SY** avatarı gelir (karanlık ve aydınlık temaya uyar).

Kendi fotoğrafını koymak için:
1. Fotoğrafı `public/profile.jpg` yoluna kaydet (varsa üzerine yaz). `main`'e push edince site güncellenir.
2. Farklı bir dosya adı kullanacaksan `src/data.js` içindeki `profilePhoto` değerini değiştir. Yol `public/` klasörüne göredir; örneğin `public/ben.webp` için `export const profilePhoto = 'ben.webp'`.

Stok veya üretilmiş bir kişi fotoğrafı ekleme. Yalnızca kendi fotoğrafını koy.

## Güvenlik önlemleri
- Sıkı **Content-Security-Policy** meta etiketi (yalnızca üretim derlemesine eklenir):
  `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'none'; object-src 'none'; upgrade-insecure-requests`
  — satır içi script yok, dış font/script/CDN yok (sistem monospace fontları kullanılır).
- `referrer` politikası: `strict-origin-when-cross-origin`.
- `dangerouslySetInnerHTML`, `eval` ve benzeri yok; tüm içerik düz React metni olarak basılır.
- Etkileşimli terminal: yalnızca beyaz listedeki komutlar (`help, whoami, projects, skills, cert, contact, github, clear, matrix`),
  girdi 32 karakterle sınırlı, sadece a–z harfleri tutulur, hiçbir zaman çalıştırılmaz/HTML olarak işlenmez.
  `help` çıktısı `matrix` komutunu listelemez.
- Backend, form, API anahtarı, token veya izleyici (analytics/tracker) yok; iletişim yalnızca `mailto:` ve linklerle.
- Tüm dış linkler `target="_blank" rel="noopener noreferrer"`.
- Bağımlılıklar en güncel kararlı sürümler; `npm audit` → 0 açık. CI'da da `npm audit` çalışır.
- GitHub Actions sürümleri tam commit SHA'sına sabitlenmiş, `checkout` kimlik bilgisi saklamaz, minimum yetki (`permissions`).
- `.github/dependabot.yml`: npm ve GitHub Actions için haftalık güncelleme PR'ları.
- Not: GitHub Pages özel HTTP başlığı (ör. `X-Frame-Options`, `frame-ancestors`) eklemeye izin vermez; bunlar meta etiketle uygulanamaz.

## Performans / erişilebilirlik
- Matrix yağmuru tek bir `<canvas>`; masaüstünde ~30 FPS, telefon/tablet veya düşük güçlü cihazlarda ~20 FPS,
  daha az sütun, daha küçük font, devicePixelRatio sınırı (1 / 1.5).
- Sekme gizlenince animasyon durur; `prefers-reduced-motion` açıksa yağmur durağan, glitch ve yazma animasyonu kapalıdır.
- Küçük ekranlarda glitch daha seyrek, blur efektleri kapalı, animasyonlar daha kısa.
- Kırılım noktaları: ≤600px (tek sütun), ≤768px (telefon/tablet), ≤1024px (tablet), masaüstü.
