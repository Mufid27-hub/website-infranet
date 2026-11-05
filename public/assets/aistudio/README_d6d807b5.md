# Reservasi Infrastruktur Jaringan

Dokumentasi awal untuk membangun website reservasi infrastruktur jaringan menggunakan HTML5, CSS3, dan JavaScript ES modules.

## Tujuan
Membantu klien melihat perangkat vendor IT, memilih perangkat, mengajukan jadwal instalasi/maintenance, dan menghubungi vendor IT dengan ringkasan permintaan yang jelas.

## Status dan batasan
Dokumen ini adalah panduan pengembangan, bukan bukti bahwa website sudah dibangun atau diterbitkan. Nama vendor IT, daftar perangkat, tarif, jam praktik, alamat, nomor WhatsApp, serta identitas engineer IT harus diverifikasi oleh pihak vendor IT sebelum digunakan.

MVP statis tidak menjamin jadwal tersedia dan tidak menyimpan reservasi ke server. Pengajuan melalui WhatsApp baru menjadi permintaan; vendor IT perlu mengonfirmasi jadwal secara manual. Untuk jadwal real-time, akun, rekam medis, pembayaran, atau pengelolaan reservasi terpusat, dibutuhkan backend dan database.

## Fitur MVP yang direncanakan
- Beranda, informasi vendor IT, perangkat, cara reservasi, FAQ, dan kontak.
- Pencarian/filter perangkat.
- Formulir pemilik dan perangkat IT.
- Pilihan tanggal dan preferensi waktu kunjungan.
- Ringkasan permintaan sebelum membuka WhatsApp.
- Penyimpanan sementara pilihan perangkat/tanggal pada browser, bila diperlukan.
- Tampilan responsif dan navigasi keyboard.

## Menjalankan lokal
Setelah berkas aplikasi dibuat, dari folder root proyek jalankan:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Buka `http://localhost:5500`. Gunakan server HTTP lokal karena aplikasi memakai ES modules.
