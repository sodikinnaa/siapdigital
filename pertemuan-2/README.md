# 🌐 Pertemuan 2: Rahasia IP 127.0.0.1 vs 0.0.0.0 (Host Binding)

## 🎯 Tujuan Pembelajaran
Mahasiswa memahami perbedaan kritis antara IP internal `127.0.0.1` (Loopback) dengan `0.0.0.0` (Binding ke semua antarmuka jaringan).

---

## 💡 Penjelasan Singkat (Analogi Cermin vs Pintu Pagar)
- **`127.0.0.1` (IP Loopback):** Analoginya seperti kamu **bicara di depan cermin kamar**. Hanya KAMU di dalam laptop itu yang bisa mendengar. Device dari luar (seperti HP) TIDAK AKAN PERNAH bisa masuk.
- **`0.0.0.0` (Binding Semua Pagar):** Analoginya seperti kamu **membuka pintu pagar rumah lebar-lebar**. Server bilang: *"Saya mau menerima tamu dari mana saja, baik dari laptop ini sendiri MAUPUN dari jaringan WiFi luar!"*

---

## 📊 Diagram Sederhana (ASCII)
```text
--- Jika Server di-bind ke 127.0.0.1 ---
Laptop Sendiri  ---> [127.0.0.1:3000] (BISA)
HP via WiFi     ---> [127.0.0.1:3000] (DITOLAK / Connection Refused!)

--- Jika Server di-bind ke 0.0.0.0 ---
Laptop Sendiri  ---> [0.0.0.0:3000] (BISA via localhost)
HP via WiFi     ---> [IP_Laptop:3000] (BISA DIARSES! 🎉)
```

---

## 🛠️ Praktik
1. Uji Binding Internal (Laptop Only):
   ```bash
   python -m http.server 8000 --bind 127.0.0.1
   ```
2. Matikan (`Ctrl + C`), lalu uji Binding Publik (Siap Terima HP):
   ```bash
   python -m http.server 8000 --bind 0.0.0.0
   ```
