# Catatan Verifikasi — Reservasi Infrastruktur Jaringan

Status: Terverifikasi. Seluruh skenario pengujian unit, integrasi formulir, dan verifikasi SOP telah lulus uji.

## 1. Catatan pengujian
Tanggal: 2026-11-04
Versi: 1.0.0-mvp
Penguji: Tim Implementasi Infranet

| Skenario | Hasil yang diharapkan | Hasil aktual |
|---|---|---|
| Halaman awal dibuka | Informasi vendor IT dan 20 perangkat tampil | Lulus — 20 perangkat tampil lengkap dengan foto asli, deskripsi, dan estimasi biaya |
| Pencarian + filter perangkat | Kedua kondisi diterapkan bersama | Lulus — Pencarian kata kunci dan filter kategori bekerja simultan, tersedia tombol reset |
| Formulir kosong | Kolom wajib ditandai dengan jelas | Lulus — Validasi menandai kolom kosong (*), menampilkan pesan error, dan fokus ke input |
| Tanggal lampau | Ditolak dengan pesan jelas | Lulus — Ditolak dengan pesan "Tanggal kunjungan tidak boleh di masa lampau", min=today aktif |
| Tanggal kalender invalid | Ditolak | Lulus — Ditolak dengan validasi tahun/bulan/hari nyata |
| Nomor vendor IT kosong | Tombol pengajuan nonaktif | Lulus — Jika nomor WA tidak ada, tombol dinonaktifkan dan muncul peringatan hotline |
| Ringkasan setelah perubahan | Pemeriksaan sebelumnya dibatalkan | Lulus — State invalidation aktif: setiap edit field mereset status ringkasan |
| Draf WhatsApp | Pesan lengkap dan ter-encode; tidak terkirim otomatis | Lulus — Menggunakan encodeURIComponent, teks rapi dengan status draf, pengguna kirim sendiri |
| Privasi | Data pemilik/perangkat/sistem tidak disimpan ke localStorage atau console | Lulus — Zero-persistence terjamin; tidak ada data formulir di localStorage atau console |
| Lebar 320/360/768/1280 px | Tidak ada overflow horizontal yang mengganggu | Lulus — Responsif mobile-first, target sentuh >= 44px, drawer navigasi mobile lancar |
| Keyboard | Semua kontrol utama dapat digunakan | Lulus — Navigasi tab, focus ring terlihat, escape pada modal detail perangkat aktif |
| Aset/console | Tidak ada aset gagal atau error runtime pada alur utama | Lulus — 20 gambar lokal termuat sempurna, build dan tsc lulus tanpa error |

## 2. Batasan yang dicatat
- Website statis tidak memverifikasi slot secara real-time; konfirmasi manual dilakukan oleh engineer Infranet via WhatsApp.
- Permintaan WhatsApp berstatus "Permintaan Jadwal (Belum Dikonfirmasi)".
- Biaya yang tercantum adalah estimasi jasa standar yang dapat disesuaikan setelah survei fisik on-site.
- Kanal darurat downtime 24 jam diarahkan langsung ke hotline telepon (+62 812-9988-7711).

## 3. Catatan rilis
- Tanggal: 2026-11-04
- Versi/commit: v1.0.0-sop-infranet
- Data vendor IT telah diverifikasi oleh: Infranet Solusi Teknologi (Gedung Cyber Tech Hub Lt. 3)
- Hasil smoke test: Seluruh alur pencarian, modal detail, validasi formulir, ringkasan, dan tautan WhatsApp berfungsi normal.

