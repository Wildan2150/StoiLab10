# Product Requirements Document (PRD)
## Web Pembelajaran Kimia: Stoikiometri Interaktif Kelas 10 SMA
**Proyek:** *StoiLab 10 — Kursus & Lab Virtual Stoikiometri Kimia*  
**Versi Dokumen:** 1.0 (Final Approved Plan)  
**Status:** Siap Implementasi  

---

### 1. Ringkasan Eksekutif & Tujuan Produk
*StoiLab 10* adalah platform pembelajaran kimia digital berbasis web yang dirancang khusus untuk siswa SMA Kelas 10 (Fase E Kurikulum Merdeka). Aplikasi ini mengemas materi Stoikiometri—yang selama ini dianggap abstrak dan penuh rumus hafalan—menjadi **alur kursus interaktif berurutan (guided learning journey)** yang dilengkapi **laboratorium virtual**, **simulator molekul**, **kalkulator kimia cerdas**, serta **sistem evaluasi adaptif dengan gamifikasi**.

#### Tujuan Utama:
1. Membantu siswa memahami hubungan kuantitatif zat kimia dari tingkat makroskopis (massa dalam gram, volume) hingga tingkat mikroskopis (mol dan jumlah atom/molekul).
2. Menyediakan visualisasi interaktif pada konsep abstrak seperti penyetaraan reaksi dan penentuan **Pereaksi Pembatas (Limiting Reactant)**.
3. Memberikan pengalaman belajar mandiri terstruktur dengan umpan balik instan (*instant feedback*) dan pembahasan langkah demi langkah.

---

### 2. Sasaran Pengguna & Kebutuhan (User Persona)
- **Siswa Kelas 10 SMA:** Membutuhkan media belajar yang visual, tidak membosankan, mudah dipahami langkah demi langkah, dan bisa diakses lancar di smartphone maupun laptop.
- **Guru Kimia SMA:** Membutuhkan media peraga digital di kelas untuk mendemonstrasikan hukum dasar kimia dan stoikiometri tanpa perlu alat lab kimia basah.

---

### 3. Konsep Desain & Identitas Visual (UI/UX)
Sesuai preferensi yang dipilih, platform mengusung tema **Clean Academic Light Mode**:
- **Palet Warna:**
  - *Primary Background:* Putih bersih dan abu-abu kebiruan sangat lembut (`#F8FAFC`, `#FFFFFF`).
  - *Primary Accent:* Biru Kimia Sains Profesional (`#0284C7` / `#2563EB`) yang memberikan kesan akademis, fokus, dan kredibel.
  - *Secondary / Accent Highlights:* Cyan laboratorium (`#06B6D4`), Emerald untuk status sukses/seimbang (`#10B981`), Amber untuk peringatan/pereaksi pembatas (`#F59E0B`), dan Rose untuk reaktan habis (`#EF4444`).
  - *Typography:* Tipografi modern nan jernih (Inter / Plus Jakarta Sans) dengan hirarki keterbacaan tinggi. Format rumus kimia rapi dengan penulisan subskrip/supersprip presisi (misal: $\text{H}_2\text{SO}_4$, $\text{Ca}^{2+}$).
- **Komponen Visual:**
  - Kartu pembelajaran berbayang lembut (*soft layered cards*), borders tipis bersih, dan ikon sains modern.
  - Tata letak responsif (mobile-friendly dan desktop-optimized).

---

### 4. Struktur Arsitektur & Alur Navigasi (Sequential Course Journey)
Aplikasi menggunakan pola **Alur Berurutan ala Kursus Interaktif (Guided Course Progression)**. Siswa dipandu melalui peta perjalanan belajar (Milestone Path) yang berurutan, dengan penanda progres (*checkbox/progress bar*) yang otomatis tersimpan di peramban (`localStorage`).

```
[ Beranda / Peta Belajar Kursus ]
          │
          ▼
[ Bab 1: Laboratorium Hukum Dasar Kimia ]
  ├── 1.1 Hukum Kekekalan Massa (Lavoisier) [Virtual Scale Lab]
  ├── 1.2 Hukum Perbandingan Tetap (Proust) [Rasio Pembentukan]
  ├── 1.3 Hukum Dalton & Gay-Lussac / Avogadro
  └── Kuis Cek Pemahaman Bab 1
          │
          ▼
[ Bab 2: Peta Jembatan Mol (The Mole Highway) ]
  ├── 2.1 Konsep Dasar Mol & Bilangan Avogadro
  ├── 2.2 Hubungan Mol & Massa Molar (Ar & Mr)
  ├── 2.3 Hubungan Mol & Volume Gas (STP, RTP, Ideal PV=nRT)
  ├── 2.4 Hubungan Mol & Molaritas Larutan
  ├── Simulator Interaktif: Jembatan Konversi Mol Dinamis
  └── Kuis Cek Pemahaman Bab 2
          │
          ▼
[ Bab 3: Komposisi Senyawa & Rumus Kimia ]
  ├── 3.1 Persentase Massa Unsur (% Komposisi)
  ├── 3.2 Menentukan Rumus Empiris (RE) & Rumus Molekul (RM)
  ├── 3.3 Penentuan Senyawa Hidrat (Air Kristal)
  ├── Alat Cerdas: Kalkulator Mr & Analisis Rumus Senyawa
  └── Kuis Cek Pemahaman Bab 3
          │
          ▼
[ Bab 4: Stoikiometri Reaksi & Pereaksi Pembatas ]
  ├── 4.1 Persamaan Reaksi Kimia & Penyetaraan Koefisien
  ├── 4.2 Perbandingan Koefisien = Perbandingan Mol
  ├── 4.3 Menghitung Pereaksi Pembatas & Zat Sisa (Tabel M-R-S)
  ├── 4.4 Perhitungan Persen Hasil (Theoretical vs Actual Yield)
  ├── Simulator Interaktif: Laboratorium Reaksi & Molekul Visual
  └── Kuis Cek Pemahaman Bab 4
          │
          ▼
[ Bab 5: Evaluasi Akhir & Penghargaan Prestasi ]
  ├── Ujian Komprehensif Stoikiometri Kelas 10
  ├── Hasil Evaluasi, Analisis Kelemahan, & Pembahasan Lengkap
  └── Sertifikat Kelulusan Digital & Badge Koleksi
```

---

### 5. Detail Spesifikasi Fitur Utama

#### 5.1. Laboratorium Virtual Hukum Dasar Kimia (Bab 1)
- **Eksperimen Virtual Neraca Lavoisier:**
  - Siswa dapat memilih wadah tertutup vs wadah terbuka (misal reaksi cangkang telur $\text{CaCO}_3 + \text{HCl}$).
  - Menimbang massa sebelum reaksi dan sesudah reaksi dengan neraca digital interaktif.
  - Membuktikan langsung bahwa dalam sistem tertutup, massa reaktan = massa produk.
- **Simulasi Rasio Proust:**
  - Mengubah slider massa Besi ($Fe$) dan Belerang ($S$).
  - Sistem menampilkan berapa massa $FeS$ yang terbentuk dan unsur mana yang tersisa.

#### 5.2. Simulator Jembatan Mol Interaktif (Bab 2)
- **Interactive Mole Highway Diagram:**
  - Visual diagram 4 arah terpusat di "MOL":
    - Massa (gram) $\leftrightarrow$ Mol (dibagi/dikali $Mr$).
    - Partikel (atom/molekul) $\leftrightarrow$ Mol (dibagi/dikali $6{,}022 \times 10^{23}$).
    - Volume Gas (Liter) $\leftrightarrow$ Mol (kondisi STP 22,4 L atau RTP 24,4 L).
    - Molaritas ($M$) $\leftrightarrow$ Mol (dibagi/dikali volume larutan $L$).
  - Siswa memasukkan nilai di satu titik, memilih titik tujuan, dan sistem menampilkan animasi alur perpindahan beserta rumus dan tahapan perhitungan langkah demi langkah.

#### 5.3. Alat Bantu Kimia Cerdas (Smart Chemistry Tools - Bab 3)
- **Kalkulator Massa Molar ($Mr$) Cerdas:**
  - Pengguna mengetik rumus kimia (contoh: $\text{Ca(OH)}_2$, $\text{Al}_2(\text{SO}_4)_3$, $\text{CuSO}_4 \cdot 5\text{H}_2\text{O}$).
  - Parser otomatis memisahkan atom, menampilkan bobot $Ar$ tiap unsur dari data periodik bawaan, menghitung total $Mr$, dan menampilkan diagram persentase massa unsur.
- **Solver Rumus Empiris & Molekul:**
  - Menginput massa/persentase masing-masing unsur $\rightarrow$ sistem menghitung rasio mol terkecil $\rightarrow$ menghasilkan rumus empiris dan rumus molekul secara transparan.

#### 5.4. Simulator Reaksi & Tabel M-R-S Pereaksi Pembatas (Bab 4)
- **Visualisasi Molekul Reaktan vs Produk:**
  - Menampilkan partikel molekul visual (misal reaksi pembentukan air: $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$).
  - Siswa mengatur jumlah molekul $\text{H}_2$ dan $\text{O}_2$.
  - Animasi molekul berikatan membentuk $\text{H}_2\text{O}$, dengan molekul yang tidak berpasangan ditampilkan sebagai "Zat Sisa".
- **Tabel M-R-S Dinamis (Mula-mula, Reaksi, Sisa):**
  - Kalkulasi otomatis menentukan zat mana yang menjadi *Pereaksi Pembatas* (rasio mol / koefisien terkecil).
  - Dilengkapi penjelasan rinci mengapa zat tersebut menjadi pembatas dan berapa massa produk teoritis yang didapat.

#### 5.5. Arena Kuis Adaptif & Gamifikasi (Bab 5 & Tiap Modul)
- **Sistem Soal Bertingkat:**
  - Soal Konseptual (Level 1), Soal Hitungan Konversi (Level 2), dan Soal Analisis Pereaksi Pembatas (Level 3).
- **Pembahasan Langkah demi Langkah:**
  - Tombol "Lihat Pembahasan Detail" dan "Petunjuk Rumus" jika siswa membutuhkan bimbingan.
- **Sistem Poin (XP) & Lencana Keberhasilan:**
  - Badge prestasi: *"Pemberani Lavoisier"*, *"Penjelajah Jembatan Mol"*, *"Ahli Pereaksi Pembatas"*, hingga *"Master Stoikiometri Kelas 10"*.
  - Riwayat skor dan status kelulusan tersimpan di `localStorage`.

---

### 6. Spesifikasi Teknis & Stack Implementasi
- **Framework:** React 19 + Vite (Modern, modular, ringan, dan loading ultra-cepat).
- **Styling:** CSS3 Modern Vanilla (Custom Design System: CSS Variables, Flexbox/Grid, Glassmorphism, Micro-animations).
- **Penyimpanan Status:** `localStorage` (Progres bab, riwayat kuis, konfigurasi preferensi pengguna).
- **Formula & Simbol Kimia:** Komponen typography ramah subskrip dan rendering simbol kimia presisi tanpa ketergantungan library berat eksternal.
- **Performa:** 0 external bundle bloat, waktu render instan, ramah koneksi internet sekolah/kuota terbatas.

---

### 7. Rencana Roadmap Pelaksanaan (Implementation Milestones)
1. **Milestone 1:** Pembangunan Core Design System (Clean Academic Light Theme, tokens, layout header, navigasi kursus, dan sidebar progres).
2. **Milestone 2:** Implementasi Bab 1 (Teori Hukum Dasar Kimia + Laboratorium Virtual Neraca Lavoisier & Proust).
3. **Milestone 3:** Implementasi Bab 2 & Simulator Jembatan Mol Interaktif (Kalkulasi konversi 4 jalur terpadu).
4. **Milestone 4:** Implementasi Bab 3 & Kalkulator Kimia Cerdas ($Mr$ parser, % massa, RE & RM).
5. **Milestone 5:** Implementasi Bab 4 & Simulator Pereaksi Pembatas dengan Tabel M-R-S & Visual Molekul.
6. **Milestone 6:** Implementasi Bab 5 (Evaluasi Akhir, Gamifikasi, Sistem Badge, dan Sertifikat Kelulusan).
7. **Milestone 7:** Pengujian menyeluruh, uji responsivitas mobile/desktop, dan penyempurnaan UI/UX.
