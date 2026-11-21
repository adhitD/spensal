/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Folder, FileText, ChevronLeft, ChevronRight, Archive, Inbox, Search } from 'lucide-react';

export default function ArsipTab({ initialArchives }) {
  const [selectedBatch, setSelectedBatch] = useState('2023'); // Default to 2023
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const recordsPerPage = 6;

  // Filter archives by selected batch and optional search query
  const filteredArchives = initialArchives.filter(item => {
    const matchesBatch = item.batch === selectedBatch;
    const matchesSearch = item.studentName.toLowerCase().includes(search.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  // Calculate pagination bounds
  const totalRecords = filteredArchives.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage) || 1;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredArchives.slice(startIndex, endIndex);

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    setCurrentPage(1); // Reset page on batch change
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const batches = ['2021', '2022', '2023'];

  return (
    <div className="space-y-8 animate-fadeIn" id="arsip-tab-root">
      
      {/* Intro section */}
      <section className="bg-slate-50 border border-slate-100 p-5 rounded-3xl" id="arsip-intro">
        <h3 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
          <Archive className="w-5.5 h-5.5 text-emerald-700" />
          <span>Arsip Digital & Dokumen Kelulusan</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Akses folder digital alumni dan lembar kelulusan berkas sah SMPN 1 Limboto yang telah terintegrasi dalam database arsip resmi.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="arsip-layout-grid">
        
        {/* Left Side: Folder list (Angkatan folders as requested) */}
        <div className="lg:col-span-1 space-y-4" id="arsip-folders-box">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Direktori Folder</span>
            <h4 className="font-bold text-xs text-slate-700">Pilih Folder Angkatan:</h4>
          </div>

          <div className="flex flex-col gap-2.5">
            {batches.map((batch) => (
              <button
                key={batch}
                onClick={() => handleBatchSelect(batch)}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-center gap-3 cursor-pointer ${
                  selectedBatch === batch 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-extrabold shadow-sm' 
                    : 'bg-white border-slate-205/60 text-slate-650 hover:bg-slate-50'
                }`}
              >
                <Folder className={`w-5 h-5 shrink-0 transition ${
                  selectedBatch === batch ? 'text-emerald-700 fill-emerald-100' : 'text-slate-400'
                }`} />
                <div>
                  <h5 className="text-xs">Angkatan {batch}</h5>
                  <p className="text-[10px] text-slate-400 font-normal">Arsip alumni {batch}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Records of the folder showing EXACTLY 6 students with pagination */}
        <div className="lg:col-span-3 space-y-4" id="arsip-records-display">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4.5 rounded-2xl border border-slate-150">
            <div>
              <h4 className="font-sans font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-emerald-700" />
                <span>Isi Folder Angkatan &bull; {selectedBatch}</span>
              </h4>
              <p className="text-[10px] text-slate-400">Menampilkan lembar ijazah & rapor kelulusan sah siswa berlisensi.</p>
            </div>

            {/* In-folder Search */}
            <div className="relative max-w-xs w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 h-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Cari nama alumni di folder..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* List of Student Names and PDF file (Display exact 6) */}
          <div className="bg-white border border-slate-200 rounded-3xl divide-y divide-slate-100" id="arsip-documents-list">
            
            {currentRecords.map((item) => (
              <div 
                key={item.id} 
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-xl border border-red-1 00 shadow-sm">
                    <FileText className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-950 text-xs leading-snug">{item.studentName}</h5>
                    <span className="text-[10px] text-slate-450 font-mono flex items-center gap-1 mt-0.5">
                      <span>Dokumen: </span>
                      <strong className="text-slate-605">{item.pdfName}</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Mengunduh dokumen Arsip Kelulusan:\n\nNama Siswa: ${item.studentName}\nBerkas: ${item.pdfName}\nStatus: Terverifikasi Negara`)}
                  className="px-4.5 py-2 hover:bg-emerald-800 hover:text-white border border-emerald-500/20 text-emerald-850 font-extrabold text-[10.5px] rounded-xl transition cursor-pointer"
                >
                  Unduh PDF
                </button>
              </div>
            ))}

            {currentRecords.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                <Inbox className="w-8 h-8 text-slate-300" />
                <span>Dokumen arsip kosong atau tidak ditemukan dengan nama ini.</span>
              </div>
            )}

          </div>

          {/* PAGINATION PANEL (tampilkan hanya 6 siswa dan buatkan tombol paginate untuk menampilkan 6 siswa berikutnya) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-3 border-t border-slate-150" id="arsip-pagination-controls">
              <span className="text-[10.5px] text-slate-500 font-mono">
                Menampilkan <strong className="text-slate-800">{startIndex + 1}-{Math.min(endIndex, totalRecords)}</strong> dari <strong className="text-slate-800">{totalRecords}</strong> alumni
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                  className="p-2 border border-slate-205 rounded-xl bg-white hover:bg-slate-50 disabled:slate-100 disabled:opacity-40 transition cursor-pointer inline-flex items-center justify-center text-slate-700"
                  title="Sebelumnya (Halaman Mundur)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="text-xs font-bold text-slate-700 px-3 py-1 bg-slate-100 rounded-lg">
                  Halaman {currentPage} dari {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                  className="p-2 border border-slate-205 rounded-xl bg-white hover:bg-slate-50 disabled:slate-100 disabled:opacity-40 transition cursor-pointer inline-flex items-center justify-center text-slate-700"
                  title="Berikutnya (Halaman Maju)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
