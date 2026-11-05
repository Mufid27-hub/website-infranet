# Petunjuk Pengembangan — Website Reservasi Infrastruktur Jaringan

## 1. Cakupan dan urutan kerja
Gunakan dokumentasi ini sebagai panduan implementasi website reservasi infrastruktur jaringan. Baca berurutan: `prd.md` → `tech_stack.md` → `arsitektur.md` → `ui.ux.md`. `README.md` menjelaskan tujuan proyek; `verification.md` menjadi catatan hasil pengujian yang benar-benar dilakukan.

Dokumen ini tidak menyatakan website telah selesai atau dipublikasikan.

## 2. Data yang harus disediakan vendor IT
Sebelum rilis, minta pemilik vendor IT mengonfirmasi:
- Nama dan identitas vendor IT.
- Alamat, peta/link lokasi, jam operasional, dan kontak publik.
- Nomor WhatsApp dengan kode negara dan digit saja.
- Daftar perangkat, deskripsi, tarif bila ada, durasi bila diketahui, dan jenis perangkat/sistem yang diterima.
- Aturan pembatalan/keterlambatan dan instruksi persiapan kunjungan.
- Prosedur untuk kasus darurat dan kontak yang benar-benar aktif.
- Foto yang memiliki izin penggunaan.

Jangan mengarang data vendor IT, tarif, engineer IT, jadwal, ulasan, atau ketersediaan slot. Jika nomor WhatsApp belum tersedia, nonaktifkan tombol pengajuan.

## 3. Langkah implementasi
1. Buat struktur file sesuai `arsitektur.md`.
2. Isi `js/config.js` dengan data vendor IT yang telah diverifikasi.
3. Isi `js/data.js` dengan perangkat yang benar-benar tersedia; gunakan ID unik dan tandai data contoh secara jelas selama pengembangan.
4. Buat HTML semantik untuk header, hero, katalog perangkat, formulir, ringkasan, FAQ, kontak, footer, dan `noscript`.
5. Terapkan CSS mobile-first, status validasi, fokus terlihat, dan layout responsif.
6. Implementasikan pencarian/filter perangkat dan keadaan kosong.
7. Implementasikan formulir pemilik, perangkat/sistem, tanggal, serta waktu preferensi.
8. Validasi tanggal nyata dan tolak tanggal sebelum hari ini.
9. Buat ringkasan yang menegaskan bahwa permintaan belum menjadi reservasi terkonfirmasi.
10. Bentuk draf WhatsApp dari data terbaru dengan `encodeURIComponent`; pengguna harus menekan kirim sendiri.
11. Jangan menyimpan data kontak atau informasi topologi jaringan ke localStorage maupun console.
12. Jalankan pemeriksaan di bawah, perbaiki masalah, dan catat hasil aktual.

## 4. Menjalankan lokal
Dari root proyek:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Buka `http://localhost:5500`. Jangan mengandalkan pembukaan `index.html` melalui `file://` karena ES modules membutuhkan HTTP.

## 5. Aturan penulisan kode
- UTF-8, indentasi 2 spasi, nama file huruf kecil, kelas CSS kebab-case.
- Variabel/fungsi JavaScript camelCase; gunakan `const` secara default.
- Gunakan ES modules dan pisahkan data, state, validasi, serta render.
- Gunakan DOM API atau `textContent` untuk data dinamis; hindari `innerHTML` dengan input pengguna.
- Jangan mencatat nama, nomor kontak, atau catatan perangkat ke console.
- Tangani kesalahan tanggal, nomor vendor IT kosong, dan kegagalan penyimpanan secara eksplisit.
- Jangan memasukkan token, password, atau rahasia ke frontend/repository.

## 6. Pemeriksaan sebelum rilis
- Semua perangkat yang ditampilkan sudah diverifikasi vendor IT.
- Pencarian dan filter bekerja bersama; keadaan kosong menyediakan reset.
- Formulir menolak kolom wajib yang kosong dan tanggal lampau.
- Ringkasan menampilkan perangkat, tanggal/waktu preferensi, kontak, dan data perangkat/sistem yang diperlukan.
- Perubahan formulir setelah ringkasan ditinjau membatalkan pemeriksaan sebelumnya.
- Nomor vendor IT kosong membuat tombol WhatsApp nonaktif.
- Draf WhatsApp ter-encode dan tidak terkirim otomatis.
- Tidak ada data kontak/catatan perangkat di localStorage atau log.
- Uji pada lebar 320, 360, 768, dan 1280 CSS px serta zoom 200%.
- Uji semua kontrol dengan keyboard dan periksa fokus serta label formulir.
- Tidak ada error console atau aset hilang pada alur utama.

Catat perangkat/browser yang tidak sempat diuji; jangan mengklaim pengujian yang belum dilakukan.

## 7. Deployment dan pemeliharaan
Gunakan hosting statis HTTPS untuk MVP. Unggah hanya berkas runtime, bukan dokumentasi internal atau data pribadi. Setelah rilis, lakukan smoke test halaman, pencarian, validasi formulir, ringkasan, dan pembukaan draf WhatsApp tanpa mengirim pesan uji ke pihak lain.

Untuk reservasi terpusat dan ketersediaan jadwal real-time, rencanakan backend dan database. Jangan memperlakukan localStorage atau klik WhatsApp sebagai bukti reservasi.

## 8. Definition of Done
MVP siap dipertimbangkan untuk rilis setelah data vendor IT dikonfirmasi, fitur dan kriteria penerimaan terpenuhi, aksesibilitas dasar diperiksa, alur utama diuji, dan hasilnya dicatat. Website hanya disebut sudah dipublikasikan setelah URL hosting dapat diakses dan smoke test produksi lulus.
