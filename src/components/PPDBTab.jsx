/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  HelpCircle, 
  Send, 
  Info, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  School,
  MapPin,
  ClipboardList
} from 'lucide-react';
export default function PPDBTab({ initialPpdb }) {
  const [activeSub, setActiveSub] = useState('info');
  const [ppdbList, setPpdbList] = useState(initialPpdb);
  
  // Form submission state
  const [formData, setFormData] = useState({
    nisn: '',
    name: '',
    gender: 'Laki-laki',
    email: '',
    phone: '',
    pob: '',
    dob: '',
    previousSchool: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Status Lookup state
  const [lookupNisn, setLookupNisn] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    setPpdbList(initialPpdb);
  }, [initialPpdb]);

  const fetchUpdatedPPDB = async () => {
    try {
      const response = await fetch('/api/ppdb');
      if (response.ok) {
        const data = await response.json();
        setPpdbList(data);
      }
    } catch (e) {
      console.log('Failed to fetch PPDB updates.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Pre-validation
    if (!formData.nisn || formData.nisn.length < 10) {
      setErrorMsg('NISN wajib diisi minimal 10 digit.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/ppdb/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMsg(`Pendaftaran atas nama ${result.name} sukses dikirim! Simpan nomor registrasi Anda.`);
        setFormData({
          nisn: '',
          name: '',
          gender: 'Laki-laki',
          email: '',
          phone: '',
          pob: '',
          dob: '',
          previousSchool: '',
          address: ''
        });
        fetchUpdatedPPDB();
      } else {
        const errData = await response.json();
        setErrorMsg(errData.error || 'Terjadi kesalahan sistem saat registrasi.');
      }
    } catch (err) {
      setErrorMsg('Gagal menyambungkan ke server, coba lagi beberapa saat.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    setLookupError('');
    setLookupResult(null);

    if (!lookupNisn) {
      setLookupError('Harap isi nomor NISN.');
      return;
    }

    const found = ppdbList.find(p => p.nisn === lookupNisn);
    if (!found) {
      setLookupError('Data pendaftaran dengan NISN tersebut tidak terdeteksi dalam arsip seleksi.');
    } else {
      setLookupResult(found);
    }
  };

  const timelineSteps = [
    {
      title: 'Tahap 1: Pengisian SPMB Online',
      date: '1 Mei - 15 Juni 2026',
      desc: 'Pengisian berkas formulir dan administrasi kelulusan SD/asal sekolah dasar secara daring melalui portal ini.',
      status: 'Aktif'
    },
    {
      title: 'Tahap 2: Penilaian & Seleksi Berkas',
      date: '18 Juni 2026',
      desc: 'Rapat pleno panitia PPDB mengumumkan daftar nominasi hasil kelulusan administrasi seleksi berbobot rapor.',
      status: 'Mendatang'
    },
    {
      title: 'Tahap 3: Daftar Ulang & Wawancara Fisik',
      date: '22 - 25 Juni 2026',
      desc: 'Orang tua dan calon peserta didik datang ke sekolah menyerahkan dokumen fisik resmi dan kartu pendaftaran.',
      status: 'Mendatang'
    },
    {
      title: 'Tahap 4: Pembagian Kelas & MPLS',
      date: '5 - 8 Juli 2026',
      desc: 'Masa Pengenalan Lingkungan Sekolah (MPLS) mengenalkan moto BE GREEN, BE CLEAN, BE SMART, tata tertib, dan asrama.',
      status: 'Mendatang'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn" id="ppdb-tab-root">
      
      {/* Sub tabs view selector */}
      <div className="flex border-b border-slate-100 pb-px" id="ppdb-subtabs">
        <button
          onClick={() => setActiveSub('info')}
          className={`px-5 py-3 text-xs font-bold border-b-2 tracking-wide cursor-pointer transition ${
            activeSub === 'info' 
              ? 'border-emerald-700 text-emerald-800' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Alur SPMB & MPLS
        </button>
        <button
          onClick={() => setActiveSub('daftar')}
          className={`px-5 py-3 text-xs font-bold border-b-2 tracking-wide cursor-pointer transition ${
            activeSub === 'daftar' 
              ? 'border-emerald-700 text-emerald-800' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Formulir Pendaftaran Siswa Baru
        </button>
        <button
          onClick={() => setActiveSub('status')}
          className={`px-5 py-3 text-xs font-bold border-b-2 tracking-wide cursor-pointer transition ${
            activeSub === 'status' 
              ? 'border-emerald-700 text-emerald-800' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Cek Status Seleksi PPDB
        </button>
      </div>

      {/* INFO SPMB TO MPLS */}
      {activeSub === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="ppdb-info-module">
          
          {/* Timeline steps (di dalam PPDB tampilkan info pendaftaran spmb sampai di tahap MPLS) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-5.5 h-5.5 text-emerald-700 font-bold" />
              <span>Garis Waktu Penerimaan (SPMB &rarr; MPLS)</span>
            </h3>

            <div className="relative border-l border-emerald-250 ml-4 space-y-6" id="ppdb-vertical-timeline">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative pl-6" id={`ppdb-step-${idx}`}>
                  {/* node dot */}
                  <span className={`absolute -left-3.5 top-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                    step.status === 'Aktif' 
                      ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse' 
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}>
                    {idx + 1}
                  </span>
                  
                  <div className="space-y-1.5 bg-white border border-slate-150 p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center">
                      <h4 className="font-extrabold text-slate-900 text-xs leading-none">{step.title}</h4>
                      <span className="text-[10px] text-emerald-700 font-bold font-mono text-right">{step.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-inner space-y-3">
              <h4 className="font-bold text-emerald-950 text-xs flex items-center gap-1">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Dokumen Persyaratan</span>
              </h4>
              <p className="text-[10.5px] text-emerald-900 leading-relaxed">
                Sebelum melakukan pendaftaran secara daring, harap siapkan dokumen scan digital berikut (format PDF/JPG):
              </p>
              <ul className="space-y-1.5 text-[10px] text-emerald-850 list-disc list-inside">
                <li>Ijazah/Surat Keterangan Lulus (SKL) SD</li>
                <li>Kartu Keluarga (KK) & Akta Kelahiran</li>
                <li>Pas Foto Berwarna Ukuran 3x4 (2 Lembar)</li>
                <li>Rapor Kelas IV, V, & VI Semester Genap</li>
                <li>Piagam Prestasi (Bagi Jalur Keprestasian)</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-250 p-5 rounded-2xl space-y-3.5">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Butuh Bantuan Panitia?</span>
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Apabila mengalami kendala jaringan atau kesalahan entri data pengisian, hubungi Call Center PPDB Online SMPN 1 Limboto.
              </p>
              <div className="text-[10.5px] font-mono text-emerald-800">
                <p>Hotline: <strong>0852-1234-5678</strong></p>
                <p>Waktu Layanan: <strong>08:00 - 13:00 WITA</strong></p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ONLINE ADMISSION FORM (PENDAFTARAN SISWA BARU) */}
      {activeSub === 'daftar' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-150 p-8 rounded-3xl shadow-md space-y-6" id="ppdb-form-panel">
          <div className="space-y-1 border-b border-slate-100 pb-3.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-5.5 h-5.5 text-emerald-700" />
              <span>Formulir Pendaftaran Siswa Baru (PPDB Online)</span>
            </h3>
            <p className="text-xs text-slate-500">Mohon mengisikan data calon siswa baru secara lengkap sesuai dokumen kependudukan resmi.</p>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-850 border border-emerald-250 p-4 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-2.5 font-bold text-emerald-950">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Pendaftaran Berhasil Terkirim!</span>
              </div>
              <p className="leading-relaxed pl-7">{successMsg}</p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-xl text-xs flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Gagal Melakukan Pengiriman</span>
                <span className="leading-normal block mt-0.5">{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NISN */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">NISN Siswa *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 0123456789"
                  maxLength={10}
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value.replace(/\D/g, '') })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Dunggio Pakaya"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gender */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Jenis Kelamin</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-2.5 text-xs bg-white border border-slate-350 rounded-lg"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              {/* Email */}
              <div className="space-y-1 col-span-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Aktif Orang Tua *</label>
                <input
                  type="email"
                  required
                  placeholder="Contoh: walimurid@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">No. Telepon / HP *</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 0852401122xx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>

              {/* POB */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tempat Lahir</label>
                <input
                  type="text"
                  placeholder="Contoh: Limboto"
                  value={formData.pob}
                  onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>

              {/* DOB */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tanggal Lahir</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>
            </div>

            {/* School Origin */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Sekolah Asal (SD/MI/Sederajat) *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SDN 1 Limboto Barat"
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-lg border border-slate-350 bg-white"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Alamat Rumah Lengkap</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-1.5 pt-2.5 pointer-events-none">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </span>
                <textarea
                  placeholder="Isikan nama jalan, Dusun, RT/RW, banyumas..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-7 pr-4 py-2 text-xs rounded-lg border border-slate-350 bg-white h-16"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-950 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Mengirim Data...' : 'Kirim Berkas Pendaftaran'}
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      )}

      {/* LOOKUP ADMISSION SELECTIVE STATUS */}
      {activeSub === 'status' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-150 p-6 rounded-3xl shadow-md space-y-6 animate-fadeIn" id="ppdb-status-module">
          <div className="space-y-1 border-b border-slate-100 pb-3">
            <h3 className="font-sans font-bold text-base text-slate-900">Periksa Hasil Kelulusan Seleksi</h3>
            <p className="text-xs text-slate-500">Masukkan 10 digit NISN yang terdaftar pada sistem SPMB untuk mendeteksi status validasi.</p>
          </div>

          <form onSubmit={handleLookupSubmit} className="flex gap-2">
            <input
              type="text"
              required
              maxLength={10}
              placeholder="Masukkan NISN Siswa..."
              value={lookupNisn}
              onChange={(e) => setLookupNisn(e.target.value.replace(/\D/g, ''))}
              className="flex-1 p-2.5 text-xs rounded-xl border border-slate-350 bg-slate-50 focus:bg-white"
            />
            <button
              type="submit"
              className="px-5 bg-emerald-700 text-white hover:bg-emerald-900 text-xs font-bold rounded-xl transition cursor-pointer shrink-0"
            >
              Cek Status
            </button>
          </form>

          {lookupError && (
            <div className="bg-amber-50 text-amber-900 border border-amber-200 p-3.5 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}

          {lookupResult && (
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 animate-scaleUp">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hasil Penjaringan SPMB</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  lookupResult.status === 'MPLS' 
                    ? 'bg-emerald-600 text-white' 
                    : lookupResult.status === 'Lolos Seleksi' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                }`}>
                  {lookupResult.status === 'MPLS' ? 'TAHAP MPLS' : lookupResult.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">Nama Calon Siswa:</span>
                  <p className="font-bold text-slate-900">{lookupResult.name}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">NISN:</span>
                  <p className="font-mono text-slate-900">{lookupResult.nisn}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">Asal Sekolah:</span>
                  <p className="font-bold text-slate-900">{lookupResult.previousSchool}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400">Tanggal Daftar:</span>
                  <p className="font-mono text-slate-900">{lookupResult.registrationDate}</p>
                </div>
              </div>

              {lookupResult.status === 'MPLS' && (
                <div className="bg-emerald-50 border border-emerald-250 p-3 rounded-lg text-[11px] text-emerald-950 leading-relaxed font-sans">
                  <strong>Selamat!</strong> Anda telah terdaftar dan siap mengikuti rangkaian <strong>Masa Pengenalan Lingkungan Sekolah (MPLS)</strong>. Silakan hadir di Lapangan Hijau SMPN 1 Limboto tanggal 5 Juli 2026 jam 07:15 WITA mengenakan baju seragam merah-putih asal SD dengan rapi.
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
