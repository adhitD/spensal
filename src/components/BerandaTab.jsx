/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Leaf, 
  Sparkles, 
  BookOpen, 
  FileText, 
  ArrowRight, 
  User, 
  Calendar, 
  Award, 
  GraduationCap
} from 'lucide-react';
export default function BerandaTab({ 
  news, 
  announcements, 
  achievements,
  setActiveTab 
}) {
  
  // Important Announcements
  const importantAnns = announcements.filter(a => a.isImportant);
  const otherAnns = announcements.filter(a => !a.isImportant);

  return (
    <div className="space-y-12 animate-fadeIn" id="beranda-tab-root">
      
      {/* Hero Jumbotron Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl shadow-xl py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8" id="hero-banner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_120%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute top-5 right-5 opacity-10 pointer-events-none">
          <Leaf className="w-64 h-64 text-emerald-400 rotate-12" />
        </div>

        <div className="max-w-2xl space-y-6 z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-semibold text-xs uppercase font-mono tracking-widest px-3 py-1 rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
            <span>Penerimaan Siswa Baru TA 2026/2027 Dibuka</span>
          </div>

          <h2 className="font-sans font-extrabold text-3xl md:text-5xl leading-tight tracking-tight">
            Selamat Datang di <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
              SMP Negeri 1 Limboto
            </span>
          </h2>
          
          <p className="text-emerald-100 text-sm md:text-base leading-relaxed max-w-lg">
            Terakreditasi A (Unggul). Wadah pendidikan yang memadukan keunggulan akademik, kompetensi abad-21, dan kelestarian hidup berpilar Adiwiyata.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <button
              onClick={() => setActiveTab('PPDB')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <span>Daftar PPDB Online</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={() => setActiveTab('Nilai')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition border border-white/15 cursor-pointer"
            >
              Cek Rapor & Nilai
            </button>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto max-w-sm z-10" id="hero-metrics">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-transform hover:scale-105">
            <span className="text-emerald-400 font-bold text-3xl font-mono block">A</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-200">Akreditasi BAN-S/M</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-transform hover:scale-105">
            <span className="text-emerald-400 font-bold text-3xl font-mono block">100%</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-200">E-Learning & Lab</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-transform hover:scale-105">
            <span className="text-emerald-400 font-bold text-3xl font-mono block">Adiwiyata</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-200">Kualifikasi Mandiri</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 transition-transform hover:scale-105">
            <span className="text-emerald-400 font-bold text-3xl font-mono block">800+</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-200">Siswa Aktif</span>
          </div>
        </div>
      </section>

      {/* Slogan Pillars Card Grid (Go Green, Go Clean, Go Smart) */}
      <section className="space-y-4" id="slogan-pillars">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs uppercase font-mono font-bold text-emerald-600 tracking-widest">Pedoman Utama</p>
          <h3 className="font-sans font-bold text-2xl text-slate-900 tracking-tight">Karakter Utama SMPN 1 Limboto</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-6 flex items-start gap-4 transition hover:bg-emerald-50">
            <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-emerald-950 text-base">BE GREEN</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Membiasakan perilaku cinta bumi melalui penanaman pohon hidroponik, pengelolaan sampah organik, dan pemanfaatan panel surya di lingkungan sekolah.
              </p>
            </div>
          </div>

          <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-6 flex items-start gap-4 transition hover:bg-teal-50">
            <div className="p-3 bg-teal-600 text-white rounded-xl shadow-md shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-teal-950 text-base">BE CLEAN</h4>
              <p className="text-xs text-teal-800 leading-relaxed">
                Membina hidup higienis dengan toilet sekolah bersih kelas bintang lima, pelarangan plastik habis pakai, dan agenda jumat bersih kolektif terpadu.
              </p>
            </div>
          </div>

          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 flex items-start gap-4 transition hover:bg-sky-50">
            <div className="p-3 bg-sky-600 text-white rounded-xl shadow-md shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sky-950 text-base">BE SMART</h4>
              <p className="text-xs text-sky-800 leading-relaxed">
                Mengejar kecakapan ilmu pengetahuan masa depan (STEM), olimpiade sains berskala nasional, penggunaan portal ujian digital, dan e-library modern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Split: News Grid vs Announcements Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="beranda-split-view">
        
        {/* Left/Center: News (Konten Berita) */}
        <div className="lg:col-span-2 space-y-6" id="news-section">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Berita Pendidikan Terkini</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Update Terbaru</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
                <div className="relative h-44 overflow-hidden bg-slate-100 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-400 text-[10px] font-semibold font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {item.author}
                      </span>
                    </div>

                    <h4 className="font-sans font-bold text-sm text-slate-900 leading-snug hover:text-emerald-700 transition line-clamp-2">
                      {item.title}
                    </h4>
                    
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-50 mt-4 flex justify-end">
                    <button 
                      onClick={() => {
                        alert(`Berita Lengkap:\n\n${item.title}\n\n${item.content}`);
                      }}
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-950 flex items-center gap-1 group/btn"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Announcements (Portal Pengumuman Akademik) */}
        <div className="space-y-6" id="announcements-section">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Pengumuman Akademik</span>
            </h3>
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
          </div>

          <div className="space-y-4">
            
            {/* Important notices */}
            {importantAnns.map((ann) => (
              <div 
                key={ann.id} 
                className="bg-amber-50/90 border-l-4 border-amber-500 rounded-xl p-4.5 shadow-sm space-y-2 relative"
                id={`ann-notice-${ann.id}`}
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="bg-amber-100 text-amber-800 text-[9px] uppercase font-bold font-mono px-2 py-0.5 rounded-full border border-amber-200">
                    Penting
                  </span>
                  <span className="font-mono text-[9px] text-amber-700 font-bold">{ann.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-snug">{ann.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{ann.content}</p>
              </div>
            ))}

            {/* Standard notices */}
            {otherAnns.map((ann) => (
              <div 
                key={ann.id} 
                className="bg-white border border-slate-100 rounded-xl p-4.5 shadow-sm space-y-2"
                id={`ann-notice-${ann.id}`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                    {ann.category}
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">{ann.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-normal">{ann.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{ann.content}</p>
              </div>
            ))}

            {/* Link to view academic results */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden space-y-3">
              <div className="absolute right-3 bottom-0 opacity-10 pointer-events-none">
                <Award className="w-24 h-24 text-white" />
              </div>
              <h4 className="font-bold text-sm tracking-tight">Cek Nilai Semester & Raport?</h4>
              <p className="text-[11px] text-emerald-100 leading-relaxed">
                Gunakan nomor NISN resmi siswa untuk melihat transkrip penilaian tengah semester, tugas harian, dan rapor akhir secara instan.
              </p>
              <button
                onClick={() => setActiveTab('Nilai')}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[11px] transition inline-block cursor-pointer shadow-md"
              >
                Masuk Portal Nilai &rarr;
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Prestasi dan Penghargaan Slider Section */}
      <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100 space-y-6" id="achievements-slider">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-900 flex items-center gap-2">
              <Award className="w-5.5 h-5.5 text-amber-500" />
              <span>Prestasi & Penghargaan Sekolah</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">SMPN 1 Limboto berkemauan keras melahirkan talenta juara berskala Gorontalo dan Nasional.</p>
          </div>
          <button 
            onClick={() => setActiveTab('Profil-Prestasi')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 uppercase"
          >
            <span>Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.slice(0, 3).map((ach) => (
            <div key={ach.id} className="bg-white rounded-xl overflow-hidden border border-slate-150/55 p-4 space-y-3 shadow-sm hover:scale-[1.02] transition duration-200">
              <div className="h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={ach.image} 
                  alt={ach.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-amber-700">
                  <span>{ach.recipient}</span>
                  <span>{ach.year}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight line-clamp-1">{ach.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
