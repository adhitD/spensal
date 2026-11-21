/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Quote, ShieldAlert, History, Key, CheckCircle, ChevronRight, GraduationCap } from 'lucide-react';
export default function ProfilTab({ subSection, principals, achievements }) {
  // Local state to navigate sub-views inside Profil if requested
  const [activeSub, setActiveSub] = useState(subSection || 'vismis');

  useEffect(() => {
    if (subSection) {
      if (subSection.includes('Misi')) setActiveSub('vismis');
      else if (subSection.includes('Sejarah')) setActiveSub('sejarah');
      else if (subSection.includes('Kepsek')) setActiveSub('kepsek');
      else if (subSection.includes('Prestasi')) setActiveSub('prestasi');
    }
  }, [subSection]);

  const activePrincipal = principals.find(p => p.status === 'Aktif');
  const formerPrincipals = principals.filter(p => p.status === 'Mantan');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn" id="profil-tab-root">
      
      {/* Sidebar Navigation */}
      <aside className="lg:col-span-1 space-y-2 shrink-0">
        <div className="bg-emerald-850 text-white rounded-2xl p-5 border border-emerald-800 shadow-sm">
          <h4 className="font-sans font-bold text-sm tracking-wide text-emerald-200 uppercase font-mono">Profil Sekolah</h4>
          <h3 className="font-bold text-lg leading-tight mt-1 text-white">SMP Negeri 1 Limboto</h3>
          <p className="text-[10px] text-emerald-300 font-mono mt-1">NPSN: 40501122</p>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col gap-1.5" id="profil-sidebar-menu">
          <button
            onClick={() => setActiveSub('vismis')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeSub === 'vismis' ? 'bg-emerald-800 text-white shadow-md' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Visi & Misi Sekolah</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveSub('sejarah')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeSub === 'sejarah' ? 'bg-emerald-800 text-white shadow-md' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <History className="w-4 h-4 shrink-0" />
              <span>Sejarah Singkat</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveSub('kepsek')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeSub === 'kepsek' ? 'bg-emerald-800 text-white shadow-md' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>Kepala Sekolah</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setActiveSub('prestasi')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeSub === 'prestasi' ? 'bg-emerald-800 text-white shadow-md' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 shrink-0" />
              <span>Prestasi & Penghargaan</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main content display area */}
      <main className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-8 shadow-sm">
        
        {/* Visi Misi Tab */}
        {activeSub === 'vismis' && (
          <div className="space-y-6 animate-fadeIn" id="vismis-view">
            <h3 className="font-sans font-extrabold text-2xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <span>Visi & Misi SMPN 1 Limboto</span>
            </h3>

            {/* Visi */}
            <div className="bg-emerald-50/55 rounded-2xl p-6 border border-emerald-100/50 space-y-3 relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-5">
                <GraduationCap className="w-24 h-24 text-emerald-900" />
              </div>
              <h4 className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase font-mono">Visi Sekolah</h4>
              <p className="font-sans font-extrabold text-slate-900 text-lg md:text-xl leading-relaxed italic">
                “Terwujudnya Peserta Didik yang Berkarakter Unggul, Cerdas secara Keilmuan, dan Peduli Lingkungan Hidup Berlandaskan Adiwiyata”
              </p>
            </div>

            {/* Misi */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase font-mono">Misi Sekolah</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Menyelenggarakan pembelajaran berkualitas berdasarkan Standar Nasional Pendidikan yang berwawasan lingkungan kelestarian.',
                  'Mengembangkan kultur sekolah adiwiyata yang asri, bersih, hijau, sehat, menyenangkan, dan berdaya guna tinggi.',
                  'Meningkatkan pembinaan olimpiade sains terstrukur (Smart) untuk melahirkan prestasi akademik taraf provinsi dan nasional.',
                  'Menanamkan kecintaan tradisi budaya Gorontalo abad-21 dan moralitas agamis yang toleran.',
                  'Mengurangi penggunaan sampah kemasan plastik sekali pakai (Zero Plastic) di seluruh area sekolah.',
                  'Membentuk ruang laboratorium TIK yang adaptif serta didukung materi ajar digital inovatif.'
                ].map((misiText, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-4.5 rounded-xl flex items-start gap-3.5">
                    <span className="w-7 h-7 bg-emerald-600/10 text-emerald-800 font-extrabold text-xs rounded-full flex items-center justify-center shrink-0 border border-emerald-600/15">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-600 leading-normal">{misiText}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slogan */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-2 mt-4">
              <p className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">Doktrin Komitmen Seluruh Siswa & Guru</p>
              <h4 className="font-extrabold text-xl font-mono tracking-tight text-emerald-200">“BE GREEN, BE CLEAN, BE SMART”</h4>
            </div>
          </div>
        )}

        {/* Sejarah Singkat Tab */}
        {activeSub === 'sejarah' && (
          <div className="space-y-6 animate-fadeIn" id="sejarah-view">
            <h3 className="font-sans font-extrabold text-2xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <History className="w-6 h-6 text-emerald-600" />
              <span>Sejarah Singkat Sekolah</span>
            </h3>

            <div className="prose prose-emerald max-w-none text-xs leading-relaxed text-slate-600 space-y-4">
              <p>
                SMP Negeri 1 Limboto didirikan pada tahun <strong>1950</strong> di bawah asuhan Departemen Pendidikan dan Kebudayaan Indonesia masa awal kemerdekaan. Sebagai lembaga pendidikan menengah tertua di Kabupaten Gorontalo, sekolah ini dirancang untuk menjadi mercusuar kecerdasan masyarakat (Smart) dan penghasil kader terbaik di kawasan Sulawesi Utara dan Gorontalo.
              </p>
              <p>
                Awal mulanya, bangunan sekolah berupa fasilitator asrama sementara yang sangat terbatas. Melalui dukungan masyarakat, tokoh adat Limboto, serta hibah pemerintahan daerah Kab. Gorontalo, secara bertahap sekolah berpindah lokasi ke wilayah strategis <strong>Kelurahan Dutulanaa</strong>, berdiri kokoh di atas hamparan pekarangan seluas lebih dari 2 hektar.
              </p>
              
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-emerald-950 align-middle py-6 max-w-lg mx-auto text-center space-y-2 my-6">
                <span className="font-bold text-sm text-emerald-900 block">Status Akreditasi "A" & Sekolah Adiwiyata</span>
                <p className="text-[11px] leading-relaxed">
                  Tahun 2018 mendapatkan predikat Sekolah Adiwiyata Nasional, dilanjutkan dengan Penghargaan prestisius Adiwiyata Mandiri di tahun 2026 berkat keteguhan mewujudkan "Zero Waste System".
                </p>
              </div>

              <p>
                Hingga angkatan kelulusan ke-75 saat ini, alumni SMPN 1 Limboto telah banyak menduduki posisi penting dalam birokrasi pemerintahan, kedokteran, kemiliteran, budayawan, hingga pengusaha terkemuka di Gorontalo maupun nasional. Estafet kepemimpinan terus berjalan dinamis guna mencetak generasi tangguh, menguasai ilmu sains modern, namun bersahabat akrab dengan penyelamatan lingkungan hidup.
              </p>
            </div>
          </div>
        )}

        {/* Kepala Sekolah Tab */}
        {activeSub === 'kepsek' && (
          <div className="space-y-8 animate-fadeIn" id="kepsek-view">
            
            {/* Current Principal */}
            <div>
              <h3 className="font-sans font-extrabold text-2xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
                <span>Kepala Sekolah Saat Ini</span>
              </h3>

              {activePrincipal && (
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col md:flex-row gap-6 items-center mt-6">
                  <div className="w-36 h-36 border-4 border-emerald-600 rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <img 
                      src={activePrincipal.photo} 
                      alt={activePrincipal.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="space-y-3 text-center md:text-left flex-1">
                    <span className="bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Kepala Sekolah Aktif (Periode {activePrincipal.period})
                    </span>
                    <h4 className="font-sans font-bold text-lg text-slate-900 mt-1">{activePrincipal.name}</h4>
                    
                    <div className="relative text-xs text-slate-600 bg-white border border-slate-150/60 p-4 rounded-xl italic">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-emerald-100 fill-emerald-100 -z-0" />
                      <p className="relative z-10 leading-relaxed shrink-0">
                        "{activePrincipal.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Former Principals */}
            <div className="space-y-4">
              <h4 className="font-sans font-bold text-sm text-slate-400 uppercase tracking-widest font-mono">
                Daftar Mantan Kepala Sekolah (Alumni Pejabat)
              </h4>
              <p className="text-xs text-slate-500">
                Berikut adalah daftar bapak/ibu pendidik yang pernah menjabat dan memberikan sumbangsih emas kepemimpinan di SMPN 1 Limboto sejak awal pembentukan:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {formerPrincipals.map((former, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-slate-150 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:border-emerald-500/25 transition duration-200"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100 text-emerald-700 font-bold font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{former.name}</h5>
                      <span className="text-[10px] text-slate-500 font-mono block">Masa Jabatan: {former.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Prestasi dan Penghargaan Tab */}
        {activeSub === 'prestasi' && (
          <div className="space-y-6 animate-fadeIn" id="prestasi-view">
            <h3 className="font-sans font-extrabold text-2xl text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>Prestasi & Penghargaan Sekolah</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((item) => (
                <div key={item.id} className="bg-white border border-slate-150/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="h-40 bg-slate-100 relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white font-mono text-[9px] px-2.5 py-1 rounded">
                      Kelas: {item.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-emerald-700 font-bold">
                        <span>Penerima: {item.recipient}</span>
                        <span className="bg-emerald-50 px-2 py-0.5 rounded text-emerald-800">{item.year}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
