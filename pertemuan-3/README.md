# 📱 Pertemuan 3: IP Local & Akses Web dari HP via 192.168.x.x

## 🎯 Tujuan Pembelajaran
Mahasiswa menemukan IP Local komputernya dan mengakses web lokal langsung dari HP atau device lain dalam satu jaringan WiFi.

---

## 💡 Penjelasan Singkat (Analogi Alamat Rumah di Perumahan)
WiFi rumah/kampus kamu itu seperti sebuah **Komplek Perumahan**. Router WiFi memberikan "Nomor Rumah Local" (IP Local) kepada setiap device yang terhubung (berawalan `192.168.x.x` atau `10.x.x.x`).

Agar HP bisa berkunjung ke laptopmu, HP harus tahu IP Local si laptop!

---

## 📊 Diagram Sederhana (ASCII)
```text
               [ Router WiFi Kampus ]
                         |
      +------------------+------------------+
      |                                     |
 [ Laptop Kamu ]                     [ Smartphone HP ]
 IP: 192.168.1.10                    IP: 192.168.1.25
 (Server Port 8000)                        |
      ^                                    |
      +=== Buka http://192.168.1.10:8000 ===+
```

---

## 🛠️ Praktik (Cari IP & Akses dari HP)
1. Cek IP Laptop di terminal:
   - **Windows:** `ipconfig` (lihat IPv4 Address, contoh: `192.168.1.15`).
   - **Mac/Linux:** `ifconfig` atau `ip a`.
2. Jalankan server dengan bind `0.0.0.0`:
   ```bash
   python -m http.server 8000 --bind 0.0.0.0
   ```
3. Buka Chrome di HP-mu, ketik: `http://192.168.1.15:8000` (sesuaikan dengan IP laptopmu).
