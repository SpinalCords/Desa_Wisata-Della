# Desa Wisata Della - Panduan Pengelolaan Konten

Repository ini berisi kode sumber untuk website Desa Wisata Della. Panduan ini menjelaskan cara menambahkan atau mengubah file gambar serta mengubah atau menambahkan data/informasi baru.

## Struktur Proyek

```
desa_wisata-della/
├── index.html                 # Halaman utama
├── fasilitas/
│   ├── index.html            # Halaman fasilitas
│   ├── translations.js       # Terjemahan untuk halaman fasilitas
│   └── style.css             # Styling halaman fasilitas
├── adat/
│   ├── index.html            # Halaman budaya adat
│   ├── translations.js       # Terjemahan untuk halaman budaya adat
│   └── style.css             # Styling halaman budaya adat
├── gambar/                   # Folder untuk semua gambar
├── global-elements/          # Elemen global (navbar, footer)
├── translations.js           # Terjemahan utama
├── styles.css                # Styling utama
└── script.js                 # JavaScript utama
```

## 1. Mengelola File Gambar

### Menambahkan Gambar Baru

1. **Simpan gambar** ke folder `gambar/`:
   - Pastikan nama file gambar menggunakan huruf kecil, tanpa spasi, dan ekstensi yang sesuai (.jpg, .png, .jpeg)
   - Contoh nama file yang baik: `pantai_baru.jpg`, `homestay_luxury.png`

2. **Referensikan gambar di HTML**:
   - Untuk halaman utama (`index.html`): gunakan `src="gambar/namafile.jpg"`
   - Untuk halaman di subfolder (`fasilitas/index.html`, `adat/index.html`): gunakan `src="../gambar/namafile.jpg"`

### Mengubah Gambar yang Sudah Ada

1. **Ganti file gambar** di folder `gambar/` dengan gambar baru (gunakan nama file yang sama)
2. **Periksa referensi** di file HTML untuk memastikan path-nya benar

### Tips untuk Gambar

- **Ukuran optimal**: Maksimal 2MB per gambar untuk performa website
- **Format**: Gunakan JPG untuk foto, PNG untuk gambar dengan transparansi
- **Nama file**: Gunakan nama deskriptif dalam bahasa Inggris atau Indonesia
- **Kompresi**: Kompres gambar sebelum upload untuk mengurangi ukuran file

## 2. Mengubah atau Menambahkan Data/Informasi

### A. Mengubah Teks yang Bisa Diterjemahkan (Melalui Translations)

Website ini menggunakan sistem terjemahan multi-bahasa. Untuk mengubah teks:

1. **Identifikasi file translations yang relevan**:
   - `translations.js` - untuk halaman utama
   - `fasilitas/translations.js` - untuk halaman fasilitas
   - `adat/translations.js` - untuk halaman budaya adat

2. **Cari key yang sesuai** di file translations:
   - Setiap teks memiliki `data-i18n="key"` di HTML
   - Cari key tersebut di file translations.js

3. **Update teks** untuk semua bahasa (id, en, zh):
   ```javascript
   id: {
     namaKey: "Teks baru dalam Bahasa Indonesia"
   },
   en: {
     namaKey: "New text in English"
   },
   zh: {
     namaKey: "新文本用中文"
   }
   ```

### B. Mengubah Informasi Statis (Kontak, Harga, dll.)

1. **Edit langsung di HTML** untuk informasi yang tidak berubah berdasarkan bahasa
2. **Contoh perubahan**:
   - Nomor telepon: cari di `index.html` bagian contact
   - Harga fasilitas: edit di `fasilitas/index.html` atau `fasilitas/translations.js`
   - Alamat: cari di bagian footer

### C. Menambahkan Fasilitas Baru

1. **Edit `fasilitas/index.html`**:
   - Tambahkan artikel baru dengan struktur yang sama
   - Gunakan class `facility-card`

2. **Update translations** di `fasilitas/translations.js`:
   - Tambahkan entries baru untuk nama, deskripsi, dan harga fasilitas
   - Ikuti pola penamaan: `facility{N}Name`, `facility{N}Desc`, `facility{N}Price`

3. **Tambahkan gambar** ke folder `gambar/` dan referensikan di HTML

### D. Menambahkan Konten Budaya Baru

1. **Edit `adat/index.html`**:
   - Tambahkan section atau card baru sesuai struktur yang ada

2. **Update `adat/translations.js`**:
   - Tambahkan terjemahan untuk konten baru

### E. Mengubah Informasi Kontak

1. **Edit bagian contact** di `index.html`
2. **Update footer** di semua halaman HTML
3. **Periksa translations** jika ada teks yang perlu diubah

## 3. Testing Perubahan

Setelah melakukan perubahan:

1. **Buka website** secara lokal dengan membuka `index.html` di browser
2. **Test multi-bahasa** dengan mengklik tombol bahasa
3. **Periksa responsivitas** di berbagai ukuran layar
4. **Verifikasi gambar** ter-load dengan benar
5. **Test link internal** antar halaman

## 4. Best Practices

- **Backup dulu** sebelum melakukan perubahan besar
- **Gunakan Git** untuk version control
- **Test di multiple browser** (Chrome, Firefox, Safari)
- **Optimalkan gambar** sebelum upload
- **Pastikan konsistensi** terjemahan di semua bahasa
- **Update dokumentasi** jika ada perubahan struktur

## 5. Troubleshooting

- **Gambar tidak muncul**: Periksa path relatif dan nama file
- **Terjemahan tidak berubah**: Pastikan key di HTML sesuai dengan translations.js
- **Layout rusak**: Periksa syntax HTML dan CSS
- **JavaScript error**: Buka Developer Tools di browser untuk melihat error

## Kontak

Jika ada pertanyaan atau kesulitan, hubungi tim development atau admin Desa Wisata Della.
