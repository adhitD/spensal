/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, User, Filter, Share2, Award, Calendar, Users, GraduationCap, ChevronRight } from 'lucide-react';
export default function SiswaTab({ students }) {
  const [activeSub, setActiveSub] = useState('direktori');
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedBatch, setSelectedBatch] = useState('ALL');

  // Filter students based on search query, class selector, and batch
  const filteredStudents = students.filter(student => {
    const sName = student.name.toLowerCase();
    const sNisn = student.nisn;
    const query = search.toLowerCase();

    const matchesSearch = sName.includes(query) || sNisn.includes(query);
    const matchesClass = selectedClass === 'ALL' || student.className.startsWith(selectedClass);
    const matchesBatch = selectedBatch === 'ALL' || student.batch === selectedBatch;

    return matchesSearch && matchesClass && matchesBatch;
  });

  return (
    <div className="space-y-8 animate-fadeIn" id="siswa-tab-head">
      
      {/* Tab Menu Options */}
      <div className="flex border-b border-slate-100 pb-px" id="siswa-tab-menu">
        <button
          onClick={() => setActiveSub('direktori')}
          className={`px-5 py-3 text-xs font-bold border-b-2 tracking-wide cursor-pointer transition ${
            activeSub === 'direktori' 
              ? 'border-emerald-700 text-emerald-800' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Direktori Peserta Didik
        </button>
        <button
          onClick={() => setActiveSub('osis')}
          className={`px-5 py-3 text-xs font-bold border-b-2 tracking-wide cursor-pointer transition ${
            activeSub === 'osis' 
              ? 'border-emerald-700 text-emerald-800' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Organisasi Siswa Intra Sekolah (OSIS)
        </button>
      </div>

      {/* DIRECTORY DISPLAY */}
      {activeSub === 'direktori' && (
        <div className="space-y-6" id="direktori-siswa-sub">
          
          {/* Filters card */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-4" id="filters-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-sans font-bold text-base text-slate-900">Direktori Kesiswaan Terpadu</h3>
                <p className="text-xs text-slate-500">Pencarian rekam identitas siswa aktif SMPN 1 Limboto terdaftar resmi.</p>
              </div>

              {/* Text Search */}
              <div className="relative max-w-sm w-full md:w-72">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Cari nama siswa atau NISN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Select Dropdowns */}
            <div className="flex flex-wrap items-center gap-3 border-t border-slate-200/60 pt-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold shrink-0">
                <Filter className="w-3.5 h-3.5 text-emerald-700" />
                <span>Saring Data:</span>
              </div>

              {/* Class Filter */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="p-1.5 px-3 text-xs bg-white border border-slate-250 rounded-lg text-slate-700 focus:outline-none"
              >
                <option value="ALL">Semua Tingkat Kelas</option>
                <option value="IX">Kelas IX</option>
                <option value="VIII">Kelas VIII</option>
                <option value="VII">Kelas VII</option>
              </select>

              {/* Batch Filter */}
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="p-1.5 px-3 text-xs bg-white border border-slate-250 rounded-lg text-slate-700 focus:outline-none"
              >
                <option value="ALL">Semua Angkatan</option>
                <option value="2023">Angkatan 2023 (Kelas IX)</option>
                <option value="2024">Angkatan 2024 (Kelas VIII)</option>
                <option value="2025">Angkatan 2025 (Kelas VII)</option>
              </select>

              {/* Metrics Count */}
              <span className="ml-auto text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                Menemukan: {filteredStudents.length} Siswa
              </span>
            </div>
          </div>

          {/* Student list grid (Specified database fields: nama, kelas, angkatan, tempat lahir, tanggal lahir, foto siswa) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="student-grid-root">
            {filteredStudents.map((stud) => (
              <div 
                key={stud.id} 
                className="bg-white border border-slate-150/70 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-emerald-600/30 hover:shadow-md transition duration-200"
                id={`student-id-${stud.id}`}
              >
                {/* Photo Header */}
                <div className="h-44 bg-emerald-950/5 relative shrink-0">
                  <img
                    src={stud.photo}
                    alt={stud.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white font-mono font-bold text-[9px] px-2.5 py-1 rounded">
                    Kelas: {stud.className}
                  </span>
                </div>

                {/* Profile Information */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-xs tracking-tight line-clamp-1">
                      {stud.name}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                      Angkatan {stud.batch}
                    </span>
                    <div className="border-t border-slate-50 pt-2.5 mt-2 space-y-1 text-[10px] text-slate-500 font-mono">
                      <p>Tempat Lahir: <strong className="text-slate-700 font-sans">{stud.pob}</strong></p>
                      <p>Tanggal Lahir: <strong className="text-slate-700">{stud.dob.split('-').reverse().join('/')}</strong></p>
                      <p>NISN: <strong className="text-slate-700">{stud.nisn}</strong></p>
                    </div>
                  </div>

                  <div className="border-t border-slate-50 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">SMPN 1 Limboto</span>
                    <button 
                      onClick={() => alert(`Informasi Siswa:\n\nNama: ${stud.name}\nNISN: ${stud.nisn}\nKelas: ${stud.className}\nAngkatan: ${stud.batch}`)}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Kartu Siswa &rarr;
                    </button>
                  </div>
                </div>

              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                Tidak ada data peserta didik yang cocok berdasarkan filter pencarian Anda.
              </div>
            )}
          </div>

        </div>
      )}

      {/* OSIS SECTION */}
      {activeSub === 'osis' && (
        <div className="space-y-8 animate-fadeIn" id="osis-view-sub">
          
          {/* OSIS Greeting Card */}
          <section className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="absolute right-5 bottom-0 opacity-5 pointer-events-none">
              <Users className="w-64 h-64 text-white" />
            </div>

            <div className="space-y-4 max-w-xl z-10">
              <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 uppercase">
                Kepanitiaan Siswa Mandiri
              </span>
              <h3 className="font-sans font-extrabold text-2xl md:text-3xl leading-tight">
                OSIS SMPN 1 Limboto <br />
                <span className="text-teal-300">Kabinet Muda Bestari 2025/2026</span>
              </h3>
              <p className="text-sm text-teal-100 leading-relaxed">
                OSIS merupakan wadah utama pengembangan jiwa kepemimpinan (Leadership), toleransi kebhinnekaan, dan kepedulian sosial berpadu aktivitas olahraga, seni tari tradisi Gorontalo, dan pelestarian Adiwiyata.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-center w-full md:w-56 z-10">
              <span className="text-[10px] uppercase text-emerald-300 font-bold block">Ketua OSIS Saat Ini</span>
              <h4 className="font-bold text-sm mt-1">Ananda Rifky Pakaya</h4>
              <p className="text-[10px] text-teal-200 mt-0.5">Kelas IX Unggulan 1</p>
              <div className="border-t border-white/10 mt-3 pt-2.5 flex justify-between text-xs text-white/80">
                <span>Anggota</span>
                <span className="font-bold text-white">45 Pengurus</span>
              </div>
            </div>
          </section>

          {/* OSIS Programs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Jumat Bersih & Hijau (Green Day)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Program mingguan koordinasi OSIS untuk mengumpulkan sampah anorganik sekolah, dilanjutkan pembersihan taman hidroponik dan toilet asrama.
              </p>
            </div>

            <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Pentas Seni Saronde Budaya</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ajang kreasi tahunan mementaskan tarian khas Gorontalo, pencak silat, pembacaan puisi Adiwiyata, dan kompetisi melukis poster penyelamatan lingkungan.
              </p>
            </div>

            <div className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 w-12 h-12 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">LDK Kepemimpinan Pengurus</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Latihan Dasar Kepemimpinan (LDK) melatih ketrampilan manajerial rapat formal, organisasi krisis, kerja tim kolaboratif, dan pemahaman etika sosial.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
