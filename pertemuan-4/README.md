# 🚪 Pertemuan 4: Konsep Port Server & Mengatasi Bentrok (Port in Use)

## 🎯 Tujuan Pembelajaran
Mahasiswa memahami konsep Port (3000, 8000, 8080) dan cara menyelesaikan error `EADDRINUSE / Port already in use`.

---

## 💡 Penjelasan Singkat (Analogi Nomor Pintu Kamar)
Jika IP adalah **Alamat Gedung**, maka **Port** adalah **Nomor Pintu Kamar** di dalam gedung tersebut.

Satu nomor pintu hanya bisa ditempati oleh **SATU aplikasi server** dalam satu waktu. Jika aplikasi Node.js sudah pakai Port 3000, lalu kamu jalankan aplikasi React di Port 3000 juga, akan terjadi tabrakan!

---

## 📊 Diagram Sederhana (ASCII)
```text
 Laptop (IP: 192.168.1.10)
  +-----------------------------------+
  |  Port 80   : Server Web Default   |
  |  Port 3000 : App React / Node.js  |
  |  Port 8000 : App Laravel / Python |
  |  Port 8080 : App Vue / Java       |
  +-----------------------------------+
  *(Jika 2 aplikasi coba pakai Port 3000 = ERROR BENTROK!)*
```

---

## 🛠️ Praktik (Mengganti Port yang Bentrok)
1. Jalankan server python pertama:
   ```bash
   python -m http.server 8000
   ```
2. Buka terminal kedua, ketik perintah yang sama untuk memancing error:
   ```bash
   python -m http.server 8000
   # Error: OSError: [Errno 98] Address already in use
   ```
3. Solusi: Pindahkan server kedua ke port `8081`:
   ```bash
   python -m http.server 8081
   ```
