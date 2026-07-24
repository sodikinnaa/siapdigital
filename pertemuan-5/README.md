# ⚡ Pertemuan 5: Perilaku Host Binding Framework (PHP, Node.js, Python)

## 🎯 Tujuan Pembelajaran
Mahasiswa memahami kenapa framework favoritnya (PHP, Node/Vite, Python) memiliki perilaku default yang berbeda-beda saat dijalankan.

---

## 💡 Perbandingan Perintah & Kunci Binding

### 🐘 PHP / Laravel
- **Default (Laptop Only):** `php artisan serve`
- **Bisa Akses HP:** `php artisan serve --host=0.0.0.0 --port=8000`

### 🟢 Node.js / Vite / Express
- **Default (Laptop Only):** `npm run dev`
- **Bisa Akses HP:** `npm run dev -- --host 0.0.0.0`

### 🐍 Python
- **Default & Public Access:** `python -m http.server 8000 --bind 0.0.0.0`
