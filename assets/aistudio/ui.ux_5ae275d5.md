# Panduan UI/UX — Reservasi Infrastruktur Jaringan

## 1. Arah desain
Tampilan bersih, ramah, menenangkan, dan profesional. Gunakan bahasa Indonesia yang sederhana. Prioritasnya adalah menemukan perangkat, memahami informasi vendor IT, mengisi permintaan kunjungan, dan mengetahui langkah konfirmasi berikutnya.

## 2. Token visual awal
| Elemen | Pedoman |
|---|---|
| Latar utama | Putih hangat atau abu-abu sangat muda |
| Permukaan kartu | Putih |
| Teks utama | Hijau tua/abu-abu gelap dengan kontras tinggi |
| Warna utama | Hijau atau teal klinis; pastikan teks kontras |
| Aksen | Warna hangat untuk aksen, bukan teks kecil di latar putih |
| Kesalahan | Merah disertai penjelasan teks |
| Font | `system-ui, sans-serif` |
| Teks dasar | 16 px, line-height 1.5–1.6 |
| Radius | Kartu 16 px, input/tombol 10 px |
| Lebar konten | Maksimum sekitar 1200 px; padding sisi minimal 16 px |

Verifikasi kontras, hover, fokus, disabled, serta ukuran kontrol pada implementasi.

## 3. Susunan halaman
Header → hero → perangkat → cara reservasi → formulir permintaan → FAQ/persiapan kunjungan → kontak dan footer. Pada ponsel, gunakan satu kolom dan pastikan formulir mudah dijangkau. Hindari modal yang tidak diperlukan.

## 4. User journey
1. Mengenal: memahami jenis perangkat, lokasi, dan jam operasional.
2. Menemukan: mencari perangkat dan membaca deskripsi/tarif terverifikasi.
3. Mengisi: memasukkan kontak pemilik dan data minimum perangkat/sistem.
4. Memilih: menentukan tanggal dan waktu preferensi.
5. Memeriksa: membaca ringkasan permintaan.
6. Menghubungi: membuka WhatsApp dan mengirim pesan sendiri.
7. Menunggu konfirmasi: vendor IT memastikan jadwal secara manual.

## 5. Komponen dan keadaan
- Navigasi: tautan anchor, skip link, fokus terlihat.
- Kartu perangkat: nama, deskripsi, tarif jika terverifikasi, dan tombol pilih.
- Formulir pemilik: nama dan nomor kontak dengan label yang jelas.
- Formulir perangkat/sistem: nama dan spesies; data lain hanya jika diperlukan.
- Tanggal/waktu: label yang jelas dan pesan kesalahan dekat field.
- Ringkasan: perangkat, data perangkat/sistem minimum, tanggal/waktu preferensi, kontak, dan pernyataan belum terkonfirmasi.
- Tombol WhatsApp: nonaktif bila nomor vendor IT belum dikonfigurasi.
- FAQ: gunakan `details` dan `summary` untuk interaksi native.
- Keadaan darurat: beri arahan singkat untuk segera menghubungi perangkat perangkat IT darurat setempat; jangan membuat klaim bahwa formulir reservasi cocok untuk keadaan gawat.

## 6. Microcopy
- Formulir belum lengkap: “Periksa kembali kolom yang ditandai.”
- Tanggal lampau: “Pilih tanggal hari ini atau tanggal berikutnya.”
- Ringkasan: “Ini adalah permintaan jadwal, bukan konfirmasi reservasi.”
- Sebelum WhatsApp: “Informasi yang Anda isi akan dimasukkan ke draf WhatsApp vendor IT. Periksa pesan sebelum mengirim.”
- Nomor vendor IT belum dikonfigurasi: “Pengajuan melalui WhatsApp belum tersedia. Silakan gunakan kontak vendor IT yang telah dicantumkan.”
- Jadwal belum dipastikan: “Petugas vendor IT akan menghubungi Anda untuk mengonfirmasi jadwal.”

## 7. Aksesibilitas
- Gunakan `lang="id"`, landmark semantik, satu `h1`, dan urutan heading logis.
- Semua fungsi harus dapat digunakan dengan keyboard.
- Setiap input memiliki `label`; hubungkan pesan error dengan `aria-describedby` dan `aria-invalid`.
- Fokus terlihat dan diarahkan ke field pertama yang invalid.
- Targetkan kontras teks normal minimal 4.5:1 dan teks besar minimal 3:1.
- Target sentuh minimal 44 × 44 CSS px.
- Gambar informatif memiliki alt yang bermakna; gambar dekoratif memakai alt kosong.
- Dukung zoom 200% dan reflow hingga 320 CSS px.
- Hormati `prefers-reduced-motion`.
- Jangan mengklaim kepatuhan WCAG formal sebelum audit.

## 8. Validasi pengalaman
Uji alur pada ponsel, tablet, desktop, keyboard, dan pembesaran browser. Mintalah calon pengguna menyelesaikan tugas memilih perangkat dan mengajukan jadwal, lalu catat bagian yang membingungkan.
