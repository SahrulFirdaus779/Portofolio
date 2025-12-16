# Petunjuk untuk Agen AI (Copilot)

Ringkasan singkat:
- Repos ini adalah situs portfolio statis (SPA) berbasis HTML/JS/CSS.
- Konten dinamis (proyek, pengalaman, sertifikat) ditentukan langsung di file `index.html` melalui variabel `projectsData`, `experienceData`, `certificatesData`.
- Tidak ada proses build (Tailwind di-load lewat CDN). Deploy: cukup host file statis (Github Pages / Netlify / Vercel).

Arsitektur & komponen penting:
- `index.html` — satu-satunya file sumber aplikasi. Semua markup, styling (inlined), dan script berada di sana.
- `assets/img/` — tempat menyimpan gambar proyek dan aset statis.
- `/_sdk/element_sdk.js` — integrasi opsional untuk editor konfigurasi (elementSdk). Script ini bisa tidak tersedia di dev lokal; script memeriksa `if (window.elementSdk)`.

Polanya developer & data flow:
- Konten proyek/experience/sertifikat didefinisikan dalam array JS (mis. `projectsData`) dan dirender/dipasang ke DOM oleh fungsi `loadProjects()` / `loadExperience()` / `loadCertificates()`.
- Bahasa: mendukung bilingual (EN / ID). Untuk teks statis markup pakai atribut `data-en` dan `data-id`. Untuk objek dinamis, sertakan pasangan field bahasa seperti `title` / `titleId`, `description` / `descriptionId`, `insights` / `insightsId`.
- Urutan proyek default disortir berdasarkan `id` menurun (lihat `sortedProjects` dalam `loadProjects()`).

Konvensi khusus & pola yang ditemukan:
- Tambah gambar ke `assets/img/` lalu referensikan relatif dari `index.html` (mis.: `assets/img/superstore1.png`).
- Field objek proyek minimal: `{id, title, titleId, description, descriptionId, category, tools, insights, insightsId, images, links}`. `images` harus menjadi array dengan path relatif string.
- ID proyek: integer unik; gunakan nilai lebih besar untuk menampilkan proyek lebih atas (sorting menurun di-render).
- Tombol "View More/ View Less" dikendalikan oleh `INITIAL_ITEMS_COUNT` (default 3) + boolean `showAllProjects`.
- Contact form tidak mengirimkan ke backend — hanya menampilkan toast. Jika ingin integrasi, menambahkan event listener dan endpoint diperlukan.

Contoh menambah proyek (salin & modifikasi ke `index.html` pada `projectsData`):
```
{
  id: 5,
  title: "Nama Proyek",
  titleId: "Nama Proyek (ID)",
  description: "Short description in English",
  descriptionId: "Deskripsi singkat dalam Bahasa Indonesia",
  category: "Business Intelligence",
  tools: ["Python","Plotly"],
  insights: ["Insight 1", "Insight 2"],
  insightsId: ["Insight 1 ID","Insight 2 ID"],
  images: ["assets/img/new_project_1.png"],
  links: { github: "https://github.com/..", dashboard: "https://..." }
}
```

Panduan debugging lokal & preview:
- Cara cepat preview (PowerShell):
  - Python: `python -m http.server 8000`
  - Node (http-server): `npx http-server -p 8080` atau `npx serve` 
  - VSCode: gunakan Live Server extension
- Buka http://localhost:8000 (atau port lain) lalu cek:
  - Console DevTools untuk error JS dan 404 resource (gambar/SDK). 
  - Pastikan `assets/img` file path cocok.

Masalah yang sering ditemui & penanganan:
- Jika gambar tidak muncul, cek path di `project.images` (harus relatif terhadap `index.html`) dan ekstensi sensitif pada OS.
- Jika `elementSdk` tidak aktif (tidak ditemukan `/_sdk/element_sdk.js`), layout masih berjalan karena kode memeriksa kondisi `if (window.elementSdk)`.
- Bahasa tidak berubah: pastikan field `data-en` dan `data-id` untuk teks statis ada; untuk data dinamis pastikan ada pasangan `title/titleId`, `description/descriptionId`, `insights/insightsId`.

Deploy & CI:
- Tidak ada build pipeline. Deploy ke hosting statis (GitHub Pages/Netlify/Vercel) dengan branch `main` atau folder root.
- Jika ingin menambahkan CI, cukup buat action untuk menjalankan linter HTML/JS dan upload artifact untuk hosting. (Tidak ada action saat ini.)

Pesan singkat untuk agen AI:
- Fokus pada `index.html` jika diminta menambahkan konten atau memperbaiki tampilan; semua logika/markup ada di sana.
- Saat menambahkan proyek/sertifikat/pengalaman, ikuti pola field bilingual.
- Gunakan preview lokal untuk memverifikasi perubahan; simulasikan SDK hilang jika perlu.
- Jangan menghapus `data-en` / `data-id` pada teks statis.

Saran perbaikan jangka panjang (opsional):
- Pindahkan data ke file JSON terpisah (mis. `data/projects.json`) untuk mempermudah OPR dan test.
- Tambahkan bundler minimal (mis. Rollup/Vite) jika ingin mulai memakai Tailwind build dan modul JS.

Jika ada bagian yang samar atau Anda ingin saya tambahkan contoh lebih detail (mis. contoh penambahan experience/sertifikat, proses deploy GitHub Pages, atau contoh integrasi backend untuk contact form), beri tahu—saya bisa memperluas instruksi ini.