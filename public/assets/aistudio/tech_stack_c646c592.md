# Teknologi — Reservasi Infrastruktur Jaringan

## 1. Prinsip
MVP menggunakan website statis yang sederhana, ringan, dan mudah dipelihara. Pilihan ini cocok untuk katalog perangkat dan pengajuan melalui WhatsApp, bukan untuk reservasi real-time.

## 2. Stack yang disarankan
| Lapisan | Pilihan | Catatan |
|---|---|---|
| Struktur | HTML5 semantik | Landmark dan formulir yang aksesibel |
| Tampilan | CSS3, Flexbox, Grid, media query | Mobile-first |
| Logika browser | JavaScript ES modules | Memisahkan katalog, validasi, state, dan pembentukan pesan |
| Data perangkat | Array objek lokal | Diperbarui melalui berkas sumber |
| Penyimpanan browser | localStorage opsional | Hanya preferensi non-sensitif; jangan simpan nama, kontak, atau informasi topologi jaringan |
| Pengajuan | Tautan WhatsApp `wa.me` | Pesan dibuka sebagai draf dan harus dikirim pengguna |
| Hosting rencana | Hosting statis HTTPS | Verifikasi fitur penyedia saat deployment |
| Server lokal | Python 3 `http.server` | Menyajikan ES modules melalui HTTP |
| Pemeriksaan | Browser DevTools; Node.js opsional | Uji validasi, aksesibilitas dasar, dan responsivitas |

## 3. Batasan
- Tidak ada database, backend, akun, jadwal real-time, atau reservasi otomatis pada MVP statis.
- Nomor WhatsApp vendor IT adalah konfigurasi publik, bukan rahasia.
- Jangan menaruh API key, token, atau kredensial pada frontend.
- Browser dan localStorage dapat dimodifikasi; jangan mempercayai nilai yang disimpan sebagai bukti reservasi.
- Untuk ketersediaan slot yang akurat, banyak tim support, rekam medis, atau pembayaran, gunakan backend dan database dengan validasi server.

## 4. Privasi
Kumpulkan hanya data yang dibutuhkan untuk menghubungi pemilik dan menindaklanjuti permintaan. Jangan simpan data kontak atau informasi topologi jaringan ke localStorage. Beri tahu pengguna bahwa data permintaan akan dimasukkan ke URL/draf WhatsApp ketika mereka memilih membuka WhatsApp.

## 5. Performa dan aset
Gunakan gambar lokal yang penggunaannya sah, dimensi gambar eksplisit, lazy loading untuk gambar di bawah area awal, dan font sistem. Pastikan halaman tetap berfungsi tanpa aset dekoratif.
