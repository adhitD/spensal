/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Search, Download, BookOpen, Plus, FileText, Check, AlertCircle } from 'lucide-react';
export default function GuruTab({ initialGtk, materials }) {
  // Tabs: 'direktori' or 'materi'
  const [activeSub, setActiveSub] = useState('direktori');
  
  // Search state
  const [gtkSearch, setGtkSearch] = useState('');
  const [materiSearch, setMateriSearch] = useState('');

  // 10 Limit for GTK Directory
  const [gtkLimit, setGtkLimit] = useState(10);
  const [localGtk, setLocalGtk] = useState(initialGtk);

  // Material Creation Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: 'Matematika',
    topic: '',
    description: '',
    teacherName: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [materiList, setMateriList] = useState(materials);

  useEffect(() => {
    setLocalGtk(initialGtk);
  }, [initialGtk]);

  useEffect(() => {
    setMateriList(materials);
  }, [materials]);

  // Filtering GTK Directory
  const filteredGtk = localGtk.filter(teacher => {
    const searchVal = gtkSearch.toLowerCase();
    return (
      teacher.name.toLowerCase().includes(searchVal) ||
      teacher.subject.toLowerCase().includes(searchVal) ||
      teacher.type.toLowerCase().includes(searchVal)
    );
  });

  // Filtering Materials list
  const filteredMaterials = materiList.filter(mat => {
    const searchVal = materiSearch.toLowerCase();
    return (
      mat.subject.toLowerCase().includes(searchVal) ||
      mat.topic.toLowerCase().includes(searchVal) ||
      mat.teacherName.toLowerCase().includes(searchVal)
    );
  });

  // Handle material publication
  const handleAddMaterialSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!formData.topic || !formData.teacherName) {
      setFormError('Semua kolom formulir wajib diisi.');
      return;
    }

    try {
      const response = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const added = await response.json();
        setMateriList([added, ...materiList]);
        setFormSuccess(true);
        setFormData({ subject: 'Matematika', topic: '', description: '', teacherName: '' });
        setTimeout(() => {
          setShowAddForm(false);
          setFormSuccess(false);
        }, 1500);
      } else {
        setFormError('Gagal memproses pengiriman materi.');
      }
    } catch (e) {
      setFormError('Hubungan server bermasalah.');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="guru-tab-root">
      
      {/* Sub menu selector */}
      <div className="flex border-b border-slate-100 pb-px" id="guru-submenu">
        <button
          onClick={() => setActiveSub('direktori')}
          className={`px-5 py-3 text-xs font-bold border-b-2 tracking-wide cursor-pointer transition ${
            activeSub === 'direktori' 
              ? 'border-emerald-700 text-emerald-800' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Direktori GTK (Guru & Staff)
        </button>
        <button
          onClick={() => setActiveSub('materi')}
          className={`px-5 py-3 text-xs font-bold border-b-2 tracking-wide cursor-pointer transition ${
            activeSub === 'materi' 
              ? 'border-emerald-700 text-emerald-800' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Repositon Materi Pembelajaran
        </button>
      </div>

      {/* GTK DIRECTORY VIEW */}
      {activeSub === 'direktori' && (
        <div className="space-y-6" id="gtk-directory-view">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">Direktori Guru & Tenaga Kependidikan</h3>
              <p className="text-xs text-slate-500">Daftar asisten, staf administrasi, serta bapak/ibu guru pengajar SMPN 1 Limboto.</p>
            </div>
            
            <div className="relative max-w-sm w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </span>
              <input 
                type="text" 
                placeholder="Cari guru berdasarkan nama / mata pelajaran..." 
                value={gtkSearch}
                onChange={(e) => setGtkSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>

          {/* Cards Grid of GTK */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {filteredGtk.slice(0, gtkLimit).map((teacher) => (
              <div 
                key={teacher.id} 
                className="bg-white border border-slate-150/60 rounded-2xl p-4 flex flex-col items-center text-center justify-between space-y-4 shadow-sm hover:border-emerald-600/30 transition duration-200"
                id={`gtk-teacher-${teacher.id}`}
              >
                <div className="w-24 h-24 rounded-2xl border-2 border-emerald-100 overflow-hidden shadow-inner">
                  <img 
                    src={teacher.photo} 
                    alt={teacher.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="space-y-1 w-full">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    teacher.type === 'Kepala Sekolah' 
                      ? 'bg-amber-100 text-amber-800' 
                      : teacher.type === 'Guru' 
                        ? 'bg-emerald-50 text-emerald-800' 
                        : 'bg-slate-100 text-slate-800'
                  }`}>
                    {teacher.type}
                  </span>
                  
                  <h4 className="font-bold text-slate-900 text-xs tracking-tight line-clamp-1 mt-1.5" title={teacher.name}>
                    {teacher.name}
                  </h4>
                  
                  <p className="text-[10px] text-slate-500 font-medium font-sans h-8 line-clamp-2">
                    {teacher.subject}
                  </p>
                </div>

                <div className="border-t border-slate-50 pt-2 w-full text-[9px] font-mono text-slate-400 text-left space-y-0.5">
                  <p>Gender: <strong className="text-slate-600">{teacher.gender}</strong></p>
                  <p>Lahir: <strong className="text-slate-600 font-sans">{teacher.pob}, {teacher.dob.split('-').reverse().join('/')}</strong></p>
                </div>
              </div>
            ))}
          </div>

          {/* Shown only 10, expand more using limit */}
          {filteredGtk.length > gtkLimit && (
            <div className="text-center pt-4" id="gtk-limit-helper">
              <button
                onClick={() => setGtkLimit(gtkLimit === 10 ? 999 : 10)}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition animate-pulse"
              >
                {gtkLimit === 10 ? 'Lihat Selengkapnya Guru & Staff...' : 'Sembunyikan Sebagian Guru'}
              </button>
            </div>
          )}

        </div>
      )}

      {/* LEARNING MATERIAL REPOSITORY */}
      {activeSub === 'materi' && (
        <div className="space-y-6" id="learning-materials-view">
          
          {/* Header & upload bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">Materi Referensi Pembelajaran</h3>
              <p className="text-xs text-slate-500">Materi ajar digital interaktif yang siap diunduh siswa secara mandiri.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative max-w-xs w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </span>
                <input 
                  type="text" 
                  placeholder="Cari mapel / materi / guru..." 
                  value={materiSearch}
                  onChange={(e) => setMateriSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>

              {/* Add trigger */}
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Bahan Ajar</span>
              </button>
            </div>
          </div>

          {/* Add Material Modal-like Form if toggled */}
          {showAddForm && (
            <form 
              onSubmit={handleAddMaterialSubmit}
              className="bg-slate-50 border border-emerald-100 p-6 rounded-2xl space-y-4 max-w-xl animate-fadeIn"
              id="material-upload-form"
            >
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Publikasikan Bahan Ajar / Modul PDF</span>
              </h4>

              {formSuccess && (
                <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 p-3 rounded-lg text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Materi pembelajaran berhasil diunggah ke database sekolah!</span>
                </div>
              )}

              {formError && (
                <div className="bg-red-50 text-red-800 border border-red-200 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mata Pelajaran</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="IPA (Fisika)">IPA (Fisika)</option>
                    <option value="IPA (Biologi)">IPA (Biologi)</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="IPS">IPS</option>
                    <option value="Seni Budaya">Seni Budaya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nama Tenaga Pendidik</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Drs. H. Yusuf Habibie, M.Si"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Topik Pembahasan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Listrik Statis dan Hukum Coulomb"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Deskripsi Singkat / Lembar Panduan</label>
                <textarea
                  placeholder="Tuliskan petunjuk pengisian latihan atau tinjauan modul..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white h-20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-950 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Publikasikan Modul
                </button>
              </div>

            </form>
          )}

          {/* Materials List Table View */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden" id="materials-table-root">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-[10px] text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4">Topik Pembahasan & Penjelasan</th>
                  <th className="py-3 px-4">Guru Penanggung-jawab</th>
                  <th className="py-3 px-4 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMaterials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-slate-50 transition">
                    <td className="py-4.5 px-4 font-bold text-emerald-800">
                      <span className="bg-emerald-50 px-2.5 py-1 rounded">
                        {mat.subject}
                      </span>
                    </td>
                    <td className="py-4.5 px-4 space-y-1 max-w-sm">
                      <h4 className="font-bold text-slate-900 leading-snug">{mat.topic}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{mat.description}</p>
                    </td>
                    <td className="py-4.5 px-4 text-slate-700 font-semibold flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{mat.teacherName}</span>
                    </td>
                    <td className="py-4.5 px-4 text-center">
                      <button
                        onClick={() => alert(`Mengunduh file: ${mat.downloadUrl}\nInstansi: SMPN 1 Limboto`)}
                        className="p-2.5 bg-emerald-700 text-white hover:bg-emerald-900 font-bold rounded-xl transition inline-flex items-center justify-center shadow-sm cursor-pointer"
                        title="Unduh Modul PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredMaterials.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      Bahan ajar tidak ditemukan dengan kata kunci pencarian tersebut.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
