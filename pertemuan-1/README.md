# 🖥️ Pertemuan 1: Pengenalan Server & Konsep Localhost

## 🎯 Tujuan Pembelajaran
Mahasiswa memahami bahwa laptopnya sendiri bisa menjadi "server" dan mengerti arti istilah `localhost`.

---

## 💡 Penjelasan Singkat (Analogi Warung Makan)
Bayangkan **Server** itu seperti **Warung Makan** yang siap melayani pesanan kapan saja. **Browser** (Chrome/Firefox) adalah **Pembeli** yang minta makanan (halaman web).

Istilah **`localhost`** hanyalah nama panggilan sayang untuk **"Komputer Saya Sendiri"**. Jadi saat kamu mengetik `localhost` di browser, kamu sebenarnya sedang bilang ke browser:
> *"Hei Chrome, tolong ambilkan halaman web yang tersimpan di laptop ini sendiri ya, tidak usah cari ke internet!"*

---

## 📊 Diagram Sederhana (ASCII)
```text
 [ Browser Mahasiswa ] 
           |
     Minta: "localhost:8000"
           |
           v
 +-------------------------------------+
 | Laptop (Bertindak sbg Server)       |
 |  -> Aplikasi Web Melayani Pesanan  |
 +-------------------------------------+
```

---

## 🛠️ Praktik (Jalankan Server Pertama)
1. Buka **Terminal** (Mac/Linux) atau **Command Prompt / PowerShell** (Windows).
2. Masuk ke folder ini:
   ```bash
   cd pertemuan-1
   ```
3. Jalankan server web sederhana bawaan Python:
   ```bash
   python -m http.server 8000
   ```
4. Buka browser di laptopmu, ketik: `http://localhost:8000`

---

## ✅ Hasil Yang Diharapkan
Browser menampilkan tampilan website dari folder `pertemuan-1`!

---

## ⚠️ Kesalahan Yang Sering Terjadi
Lupa menyalakan server di terminal, tapi langsung mengetik `localhost:8000` di browser.

---

## 🔧 Cara Memperbaikinya
Pastikan jendela Terminal tidak ditutup dan perintah python masih aktif berjalan (jangan ditekan `Ctrl + C` dulu).

---

## 🎯 Mini Challenge Pertemuan 1
Ubah teks `Halo Server!` di dalam file `contoh-code/index.html` menjadi nama lengkap dan NIM kamu. Refresh browser, apa yang terjadi?
