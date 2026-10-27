# Agent Guidelines & Project Instructions (AGENT.md)
**Proyek:** *StoiLab 10 — Kursus & Lab Virtual Stoikiometri Kimia Kelas 10 SMA*  
**Dokumen Referensi:** [PRD.md](file:///d:/Downloads/New%20project/.agent/PRD.md)  
**Tujuan Dokumen:** Panduan kerja operasional, arsitektur teknis, dan standar kualitas bagi AI Agent dalam mengembangkan dan memelihara aplikasi ini.

---

## 1. Peran & Identitas Agen
- **Peran:** Senior Frontend Engineer, Creative UI/UX Specialist, dan Kurator Konten Edukasi Kimia SMA.
- **Misi:** Membangun platform web pembelajaran stoikiometri interaktif yang ramah siswa, bebas dari tampilan kaku/"AI slop", dengan kalkulator kimia presisi, laboratorium virtual responsif, dan alur belajar berurutan (*guided journey*).
- **Prinsip Inti:**
  1. **Presisi Ilmiah:** Perhitungan kimia (massa molar, rasio mol, pereaksi pembatas, volume STP/RTP) harus 100% akurat.
  2. **Interaktivitas Visual:** Utamakan manipulasi langsung (slider, timbangan interaktif, model partikel molekul visual) daripada sekadar teks panjang.
  3. **Bebas Slop:** Mengikuti standar *anti-slop* baik pada kode, estetika desain ([taste-skill](file:///d:/Downloads/New%20project/.agent/skills/taste-skill)), maupun narasi materi ([communicative-academic-writing](file:///d:/Downloads/New%20project/.agent/skills/communicative-academic-writing) & [natural-writing](file:///d:/Downloads/New%20project/.agent/skills/natural-writing)).

---

## 2. Tech Stack

| Komponen | Teknologi | Keterangan & Ketentuan |
| :--- | :--- | :--- |
| **Framework Utama** | **React 19** (`^19.3.1`) | Functional components, Hooks modern (`useState`, `useReducer`, `useMemo`, `useCallback`, `useContext`). |
| **Build Tool & Dev Server** | **Vite 8** (`^8.3.4`) | Loading cepat, modular ESM, HMR instan. |
| **Linter & Code Quality** | **Oxlint** (`^1.88.0`) | Linter cepat berbasis Rust (`npm run lint`). Pertahankan kode bebas warning dan error. |
| **Styling Engine** | **Modern Vanilla CSS3** | **DILARANG menggunakan Tailwind CSS** atau framework utility eksternal kecuali diminta khusus. Gunakan CSS Variables (Design Tokens), Flexbox, CSS Grid, scoped/modular CSS, dan CSS keyframe micro-animations. |
| **Simbol & Rumus Kimia** | **Semantic HTML / SVG** | Menggunakan subskrip (`<sub>`), superskrip (`<sup>`), entitas Unicode, dan komponen `FormulaRenderer`. Hindari ketergantungan library LaTeX berat agar bundle tetap ultra-ringan. |
| **Visualisasi Simulasi** | **HTML5 Canvas / Pure SVG** | Untuk neraca Lavoisier, partikel molekul gas, ikatan molekul air/senyawa, dan jembatan mol interaktif. |
| **Testing & Scripting** | **Node.js 22+ (ESM)** | Kompatibel dengan script bawaan `taste-skill` (`scripts/draw.mjs`, `scripts/inspect.mjs`). |

---

## 3. Storage & State Management

Aplikasi ini beroperasi penuh secara *client-side* (offline-friendly dan ramah kuota siswa):

### 3.1. LocalStorage Strategy
Gunakan helper terpusat (misal `src/utils/storage.js` atau hook `useLocalStorage.js`) dengan *namespace* yang terstruktur:

| Key Name | Struktur Data | Deskripsi |
| :--- | :--- | :--- |
| `stoilab_progress_v1` | `{ completedChapters: string[], currentChapter: string, milestoneProgress: Record<string, boolean> }` | Melacak status penyelesaian bab (Bab 1 s.d. 5) dan checkpoint materi. |
| `stoilab_quiz_history_v1`| `Record<chapterId, { score: number, total: number, answers: Record<string, any>, completedAt: string }>` | Riwayat pengerjaan kuis tiap bab dan evaluasi akhir. |
| `stoilab_gamification_v1`| `{ xp: number, badges: string[], currentRank: string }` | Poin pengalaman (XP) dan daftar lencana/badge yang telah diraih siswa. |
| `stoilab_lab_state_v1` | `Record<simId, Record<string, any>>` | Menyimpan input sementara variabel praktikum/lab virtual. |
| `stoilab_user_settings_v1`| `{ soundEnabled: boolean, showHints: boolean }` | Preferensi pengguna. |

### 3.2. Aturan Pengelolaan Storage
- **Safe Parsing:** Selalu gunakan blok `try...catch` saat membaca/menulis `localStorage` dengan *default fallback* jika JSON korup atau *private browsing* membatasi akses.
- **Reaktivitas:** Gunakan React Context (`CourseProgressContext`) agar perubahan progres langsung menyinkronkan seluruh komponen (sidebar, progress bar, badge unlock) tanpa reload halaman.

---

## 4. Struktur Direktori Proyek

Proyek diatur menggunakan pola **Modular Feature-Driven Architecture**:

```text
d:\Downloads\New project\
├── .agent/
│   ├── AGENT.md                 # Dokumen aturan & panduan agen (file ini)
│   ├── PRD.md                   # Spesifikasi produk lengkap
│   └── skills/                  # Direktori skills lokal (taste-skill, natural-writing, dll.)
├── public/                      # Aset statis publik (favicon, audio effects jika ada)
├── src/
│   ├── assets/                  # Grafis, logo, ilustrasi molekul SVG
│   ├── components/              # Komponen modular UI yang dapat digunakan ulang
│   │   ├── common/              # Button, Card, Modal, Tooltip, Badge, ProgressBar
│   │   ├── chemistry/           # FormulaRenderer, PeriodicTableMini, ReactionArrow, ParticleCanvas
│   │   └── layout/              # Header, CourseSidebar, MilestoneMap, Footer
│   ├── features/                # Modul materi & simulator per bab (sesuai PRD)
│   │   ├── chapter1-laws/       # Hukum Dasar Kimia (Neraca Lavoisier & Rasio Proust)
│   │   ├── chapter2-mole/       # Jembatan Mol Interaktif (4 arah konversi: Massa, Partikel, Vol, M)
│   │   ├── chapter3-formula/    # Kalkulator Mr Cerdas, Solver Rumus Empiris & Molekul
│   │   ├── chapter4-reaction/   # Penyetaraan Reaksi, Pereaksi Pembatas & Tabel M-R-S
│   │   └── chapter5-evaluation/ # Evaluasi Akhir Komprehensif, Review Soal, Sertifikat Digital
│   ├── context/                 # State global React (CourseContext, GamificationContext)
│   ├── hooks/                   # Custom hooks (useCourseProgress, useLocalStorage, useFormulaParser)
│   ├── data/                    # Data statis terverifikasi
│   │   ├── periodicTable.json   # Data massa atom relatif (Ar), nomor atom, nama unsur
│   │   ├── courseChapters.js    # Silabus, milestone, dan checkpoint tiap bab
│   │   ├── quizBank.js          # Bank soal berjenjang (Level 1, 2, 3) beserta pembahasan
│   │   └── badges.js            # Definisi lencana gamifikasi dan syarat membukanya
│   ├── utils/                   # Utilitas & logika kalkulasi kimia murni
│   │   ├── formulaParser.js     # Parser string rumus kimia -> hitung Ar/Mr
│   │   ├── stoichiometry.js     # Solver stoikiometri reaksi & tabel M-R-S
│   │   ├── unitConverter.js     # Konversi satuan mol, gram, volume STP/RTP, partikel
│   │   └── storage.js           # Wrapper aman localStorage
│   ├── styles/                  # Arsitektur CSS Modern
│   │   ├── variables.css        # Design tokens: palet warna, spacing, shadows, radius
│   │   ├── typography.css       # Tipografi, styling rumus kimia & keterbacaan
│   │   ├── components.css       # Styling kartu, tombol, badge, input sains
│   │   └── animations.css       # Micro-animations, transisi pergerakan molekul
│   ├── App.jsx                  # Root component & pengatur navigasi antar-bab
│   ├── index.css                # Global reset & baseline styles
│   └── main.jsx                 # Entry point aplikasi
├── index.html                   # HTML template dengan title, meta SEO & Google Fonts
├── package.json                 # Dependensi & script proyek
└── vite.config.js               # Konfigurasi Vite
```

---

## 5. Standar Bahasa & Penulisan

### 5.1. Bahasa Antarmuka & Konten Edukasi (Bahasa Indonesia)
- **Target Pembaca:** Siswa SMA Kelas 10 (Fase E Kurikulum Merdeka).
- **Gaya Bahasa:** Bahasa Indonesia baku yang **hidup, akrab, komunikatif, dan membumi** (mematuhi pedoman `.agent/skills/communicative-academic-writing`).
  - Hindari kalimat pasif-terjemahan kaku ("Zat tersebut telah direaksikan oleh...").
  - Hindari gaya hiper-formal berlebihan atau kata-kata arkais/latinate yang tidak lazim di kelas kimia Indonesia.
  - Gunakan analogi konkret sehari-hari (misal: "Resep membuat kue roti" untuk analogi pereaksi pembatas, atau "Jembatan kota" untuk konversi jembatan mol).
- **Terminologi Kimia Resmi (Baku Kemdikbud/IUPAC):**
  - Gunakan istilah baku: *Pereaksi Pembatas* (bukan pereaksi limitan), *Massa Molar* ($g/\text{mol}$), *Massa Atom Relatif* ($Ar$), *Massa Molekul Relatif* ($Mr$), *Bilangan Avogadro* ($6{,}022 \times 10^{23}$ partikel/mol), *Keadaan Standar* (STP, $0^\circ\text{C}, 1\text{ atm}$, $22{,}4\text{ L/mol}$), *Keadaan Kamar* (RTP, $25^\circ\text{C}, 1\text{ atm}$, $24{,}4\text{ L/mol}$).
- **Anti-AI Tells (Bebas Klise AI):**
  - Mengikuti aturan `.agent/skills/stop-slop` dan `.agent/skills/natural-writing`.
  - Jangan gunakan pembuka basa-basi: *"Dalam dunia kimia yang penuh keajaiban...", "Perlu dipahami bahwa...", "Menyelami samudera stoikiometri..."*.
  - Langsung masuk ke inti konsep, pertanyaan pemantik, atau demonstrasi lab.

### 5.2. Bahasa Kode & Pemrograman (Bahasa Inggris)
- Seluruh kode pemrograman (nama file, nama komponen, fungsi, variabel, props, dan komentar teknis) **wajib menggunakan bahasa Inggris**:
  - Contoh: `calculateMolarMass()`, `BalanceScaleSimulator`, `useCourseProgress`, `isLimitingReactant`.
- Konten teks yang ditampilkan kepada pengguna (string UI, pesan error, soal kuis, label tombol) berada dalam bahasa Indonesia.

---

## 6. Standar Desain UI/UX & Desain Grafis (Taste Skill Guidelines)
Mengacu pada preferensi PRD dan keahlian [taste-skill](file:///d:/Downloads/New%20project/.agent/skills/taste-skill):
- **Tema Desain:** *Clean Academic Light Mode*
  - Background bersih (`#F8FAFC`, `#FFFFFF`), kartu berbayang halus tanpa efek murahan.
  - Warna aksen sains profesional: Biru Kimia (`#0284C7`), Cyan Laboratorium (`#06B6D4`), Emerald Seimbang (`#10B981`), Amber Pembatas (`#F59E0B`), Rose Reaktan Habis (`#EF4444`).
- **Keterbacaan Rumus:** Seluruh rumus kimia harus memiliki kontras tinggi dan jarak antar elemen yang proporsional.
- **Responsivitas:** Tampilan harus bekerja mulus di layar smartphone (lebar 360px+) hingga monitor desktop (1920px). Simulasi dan diagram harus responsif (tidak terpotong).

---

## 7. Alur Kerja Implementasi Agen
Setiap kali menambahkan atau memodifikasi modul fitur:
1. **Verifikasi PRD:** Pastikan fitur sesuai dengan milestone di [PRD.md](file:///d:/Downloads/New%20project/.agent/PRD.md).
2. **Kalkulasi Mandiri:** Tulis unit logic perhitungan stoikiometri di `src/utils/` sebelum menghubungkannya ke komponen UI visual.
3. **Uji Linter & Build:** Jalankan `npm run lint` (Oxlint) untuk memastikan tidak ada syntax/import error.
4. **Validasi Persistensi:** Pastikan setiap aksi pengguna (menyelesaikan sub-bab, kuis, eksperimen) tersimpan dengan benar di `localStorage`.
