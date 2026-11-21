/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  User, 
  Edit, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  Undo,
  FileSpreadsheet,
  TrendingUp,
  Award
} from 'lucide-react';

export default function NilaiTab({ initialStudents, onGradesUpdated }) {
  const [portalMode, setPortalMode] = useState('siswa');
  const [students, setStudents] = useState(initialStudents);

  // Student portal states
  const [nisnQuery, setNisnQuery] = useState('');
  const [activeStudent, setActiveStudent] = useState(null);
  const [studentError, setStudentError] = useState('');

  // Teacher portal states
  const [teacherVerified, setTeacherVerified] = useState(false);
  const [teacherPass, setTeacherPass] = useState('');
  const [teacherError, setTeacherError] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editGrades, setEditGrades] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Settle updated students list locally when props refresh
  React.useEffect(() => {
    setStudents(initialStudents);
    if (activeStudent) {
      const updated = initialStudents.find(s => s.id === activeStudent.id);
      if (updated) setActiveStudent(updated);
    }
  }, [initialStudents]);

  // SISWA PORTAL: Search grade by NISN
  const handleNisnSearch = (e) => {
    e.preventDefault();
    setStudentError('');
    setActiveStudent(null);

    if (!nisnQuery) {
      setStudentError('Harap lampirkan NISN siswa.');
      return;
    }

    const found = students.find(s => s.nisn === nisnQuery);
    if (!found) {
      setStudentError('NISN tidak terdaftar pada basis data nilai sekolah. Pastikan nomor yang dimasukkan benar.');
    } else {
      setActiveStudent(found);
    }
  };

  // GURU PORTAL: Password authentication
  const handleTeacherAuth = (e) => {
    e.preventDefault();
    setTeacherError('');

    if (teacherPass === 'smpn1limboto' || teacherPass === 'admin') {
      setTeacherVerified(true);
    } else {
      setTeacherError('Kata sandi salah. Gunakan sandi "smpn1limboto" untuk masuk Portal Guru.');
    }
  };

  const handleSelectStudentForEdit = (student) => {
    setEditingStudent(student);
    setEditGrades({ ...student.grades });
    setSaveSuccess(false);
    setSaveError('');
  };

  // Handles score changes in edit inputs
  const handleScoreChange = (subject, field, value) => {
    const rawValue = Math.min(100, Math.max(0, value));
    const currentSubjectScores = editGrades[subject] || { assignment: 0, midterm: 0, finalExam: 0, average: 0 };
    
    const updatedSubject = {
      ...currentSubjectScores,
      [field]: rawValue
    };

    // Recalculate average
    updatedSubject.average = Math.round((updatedSubject.assignment + updatedSubject.midterm + updatedSubject.finalExam) / 3);

    setEditGrades({
      ...editGrades,
      [subject]: updatedSubject
    });
  };

  // Commit updated grades back to database
  const handleSaveGrades = async () => {
    if (!editingStudent) return;
    setSaveError('');
    setSaveSuccess(false);

    try {
      const response = await fetch(`/api/students/grade/${editingStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ grades: editGrades })
      });

      if (response.ok) {
        setSaveSuccess(true);
        onGradesUpdated(); // Refresh parent component data
        
        // Update local state is crucial
        const updatedStudents = students.map(s => {
          if (s.id === editingStudent.id) {
            return { ...s, grades: editGrades };
          }
          return s;
        });
        setStudents(updatedStudents);

        setTimeout(() => {
          setEditingStudent(null);
          setSaveSuccess(false);
        }, 1500);
      } else {
        setSaveError('Gagal memperbaharui rekapitulasi nilai.');
      }
    } catch (e) {
      setSaveError('Gagal menyambungkan ke API server.');
    }
  };

  // Search filter for teacher student directory
  const filteredStudentsForTeacher = students.filter(s => 
    s.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    s.nisn.includes(teacherSearch) ||
    s.className.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn" id="nilai-tab-root">
      
      {/* Upper header section */}
      <section className="bg-slate-50 border border-slate-100 p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4" id="nilai-header">
        <div>
          <h3 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5.5 h-5.5 text-emerald-700" />
            <span>Sistem Informasi & Manajemen Nilai Akademik</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">Akses verifikasi evaluasi hasil belajar, nilai tengah semester, dan penilaian akhir kesiswaan.</p>
        </div>

        {/* Portal selector */}
        <div className="flex bg-slate-200/60 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setPortalMode('siswa')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              portalMode === 'siswa' 
                ? 'bg-emerald-800 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Portal Siswa / Orang Tua
          </button>
          <button
            onClick={() => setPortalMode('guru')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              portalMode === 'guru' 
                ? 'bg-emerald-800 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Portal Guru (Input Nilai)
          </button>
        </div>
      </section>

      {/* PORTAL SISWA: Look up transcript via NISN */}
      {portalMode === 'siswa' && (
        <div className="space-y-6" id="siswa-grade-portal">
          
          {/* Card search */}
          {!activeStudent && (
            <div className="max-w-xl mx-auto bg-white border border-slate-150 p-8 rounded-3xl shadow-sm space-y-5">
              <div className="text-center space-y-1">
                <GraduationCap className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Cek Hasil Belajar Siswa</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Masukkan Nomor Induk Siswa Nasional (NISN) siswa aktif untuk mengunduh rekapitulasi penilaian rapor sementara.
                </p>
              </div>

              {studentError && (
                <div className="bg-red-50 text-red-800 border border-red-200 p-3 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{studentError}</span>
                </div>
              )}

              <form onSubmit={handleNisnSearch} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Nomor Induk Siswa Nasional (NISN)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      maxLength={10}
                      required
                      placeholder="Masukkan 10 digit NISN. Contoh: 0081234501"
                      value={nisnQuery}
                      onChange={(e) => setNisnQuery(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-350 bg-slate-50 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition shadow"
                >
                  Buka Transkrip Nilai &rarr;
                </button>
              </form>

              {/* Informative helper */}
              <div className="bg-emerald-50 text-emerald-900 border border-emerald-100 p-4.5 rounded-xl text-[11px] leading-relaxed">
                <strong>Panduan NISN:</strong> NISN tertera pada kartu pelajar siswa atau silakan hubungi wali kelas Anda untuk meminta lembar digital data pokok pendidikan (Dapodik).
              </div>
            </div>
          )}

          {/* Active transcript view if student is fetched */}
          {activeStudent && (
            <div className="space-y-6 animate-scaleUp" id="siswa-transcript-view">
              
              {/* Back to search */}
              <button
                onClick={() => { setActiveStudent(null); setNisnQuery(''); }}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-bold cursor-pointer"
              >
                <Undo className="w-4 h-4" />
                <span>Cari NISN Lain</span>
              </button>

              {/* Student Header Summary Card */}
              <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6.5 shadow flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-emerald-500/30 overflow-hidden shrink-0">
                    <img 
                      src={activeStudent.photo} 
                      alt={activeStudent.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-lg leading-snug">{activeStudent.name}</h4>
                    <span className="text-xs text-emerald-250 font-mono">NISN: {activeStudent.nisn} &bull; Kelas {activeStudent.className}</span>
                    <p className="text-[10px] text-teal-200 mt-1 uppercase font-semibold font-mono tracking-wider">SMP Negeri 1 Limboto &bull; Angkatan {activeStudent.batch}</p>
                  </div>
                </div>

                {/* Grade Statistics display */}
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center shrink-0 w-full md:w-44">
                  <span className="text-[10px] text-emerald-200 uppercase font-mono block">Rata-Rata Rapor</span>
                  <p className="text-white font-extrabold text-2xl font-mono mt-0.5" id="overall-average">
                    {Math.round(
                      Object.values(activeStudent.grades).reduce((acc, current) => acc + current.average, 0) / 
                      (Object.keys(activeStudent.grades).length || 1)
                    ) || 0}
                  </p>
                  <span className="text-[9px] text-slate-350 block mt-1 border-t border-white/10 pt-1">Hasil Evaluas Semester</span>
                </div>
              </div>

              {/* Transkrip Detail Table */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 font-bold text-[10px] text-slate-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-5">Mata Pelajaran</th>
                      <th className="py-4 px-5 text-center">Tugas Mandiri</th>
                      <th className="py-4 px-5 text-center">Ujian Tengah Semester</th>
                      <th className="py-4 px-5 text-center">Ujian Akhir Semester</th>
                      <th className="py-4 px-5 text-center">Nilai Rata-Rata Mapel</th>
                      <th className="py-4 px-5 text-center">Status Kelulusan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Object.keys(activeStudent.grades).length > 0 ? (
                      Object.entries(activeStudent.grades).map(([mapel, scores]) => (
                        <tr key={mapel} className="hover:bg-slate-55/40 transition">
                          <td className="py-4 px-5 font-bold text-slate-900 text-xs">
                            {mapel}
                          </td>
                          <td className="py-4 px-5 text-center font-mono font-medium text-slate-700">
                            {scores.assignment}
                          </td>
                          <td className="py-4 px-5 text-center font-mono font-medium text-slate-705">
                            {scores.midterm}
                          </td>
                          <td className="py-4 px-5 text-center font-mono font-medium text-slate-705">
                            {scores.finalExam}
                          </td>
                          <td className="py-4 px-5 text-center font-mono font-bold text-emerald-800 text-sm">
                            {scores.average}
                          </td>
                          <td className="py-4 px-5 text-center shrink-0">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              scores.average >= 75 ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                            }`}>
                              {scores.average >= 75 ? 'KBM Tercapai' : 'Perlu Remedial'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-slate-400">
                          Siswa ini belum diisikan modul rekapitulasi penilaian oleh guru.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[11px] text-slate-450 leading-normal">
                  <strong>* Catatan KBM:</strong> Kriteria Belajar Minimal (KBM) rata-rata adalah <strong>75</strong>. Silakan hubungi koordinator kurikulum untuk validasi ijazah basah.
                </p>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Unduh / Cetak Transkrip</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* PORTAL GURU: Admin/Teacher Management interface (Auth required) */}
      {portalMode === 'guru' && (
        <div className="space-y-6" id="guru-grade-management">
          
          {/* Password authentication */}
          {!teacherVerified && (
            <div className="max-w-sm mx-auto bg-white border border-slate-150 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="text-center space-y-1">
                <Lock className="w-10 h-10 text-emerald-850 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Verifikasi Akses Guru</h4>
                <p className="text-xs text-slate-500">Gunakan kata sandi instruktur Anda untuk membuka prapustakaan pengeditan nilai.</p>
              </div>

              {teacherError && (
                <div className="bg-red-50 text-red-800 border border-red-200 p-2.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{teacherError}</span>
                </div>
              )}

              <form onSubmit={handleTeacherAuth} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Gunakan Sandi Demo: <strong>smpn1limboto</strong></label>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan sandi..."
                    value={teacherPass}
                    onChange={(e) => setTeacherPass(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-350 bg-slate-50 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Verifikasi & Masuk
                </button>
              </form>
            </div>
          )}

          {/* Teacher Grading Space */}
          {teacherVerified && !editingStudent && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-950 text-sm">Laboratorium Pengisian Hasil Nilai</h4>
                  <p className="text-xs text-slate-500">Pilih salah satu siswa dari daftar kesiswaan di bawah untuk merevisi nilai semester secara instan.</p>
                </div>

                <div className="relative max-w-xs w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cari siswa/nisn/kelas..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-205 bg-white"
                  />
                </div>
              </div>

              {/* Student grading cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredStudentsForTeacher.map((student) => {
                  const mapelCount = Object.keys(student.grades).length;
                  return (
                    <div 
                      key={student.id} 
                      className="bg-white border border-slate-150 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:border-emerald-700 transition"
                      id={`teacher-student-card-${student.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border-2 border-emerald-100 overflow-hidden shrink-0">
                          <img 
                            src={student.photo} 
                            alt={student.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-950 text-xs leading-tight">{student.name}</h5>
                          <span className="text-[10px] text-slate-500 font-mono">NISN: {student.nisn} &bull; Kelas {student.className}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectStudentForEdit(student)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-800 hover:text-white text-slate-700 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit ({mapelCount})</span>
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ACTIVE EDIT WORKSPACE */}
          {teacherVerified && editingStudent && (
            <div className="bg-white border border-emerald-100 p-6 rounded-3xl shadow-sm space-y-6 max-w-2xl mx-auto animate-scaleUp" id="editing-workspace-panel">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border-2 border-slate-200 overflow-hidden">
                    <img 
                      src={editingStudent.photo} 
                      alt={editingStudent.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Manajemen Nilai: {editingStudent.name}</h4>
                    <span className="text-[11px] text-slate-450 font-mono">NISN: {editingStudent.nisn} &bull; Kelas: {editingStudent.className}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="text-xs text-slate-500 hover:text-emerald-700 font-bold"
                >
                  Batal
                </button>
              </div>

              {saveSuccess && (
                <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 p-3 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Perubahan nilai sukses disinkronkan ke database server sekolah!</span>
                </div>
              )}

              {saveError && (
                <div className="bg-red-50 text-red-800 border border-red-200 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{saveError}</span>
                </div>
              )}

              <div className="space-y-4">
                
                {/* Subjects edit fields */}
                {Object.keys(editGrades).length > 0 ? (
                  Object.entries(editGrades).map(([subject, scores]) => (
                    <div 
                      key={subject} 
                      className="bg-slate-50 border border-slate-100/80 p-4 rounded-2xl relative space-y-3"
                    >
                      <h5 className="font-bold text-emerald-950 text-xs">{subject}</h5>
                      
                      <div className="grid grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Tugas</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={scores.assignment}
                            onChange={(e) => handleScoreChange(subject, 'assignment', parseInt(e.target.value) || 0)}
                            className="w-full p-2 bg-white text-xs border border-slate-205 rounded font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">UTS</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={scores.midterm}
                            onChange={(e) => handleScoreChange(subject, 'midterm', parseInt(e.target.value) || 0)}
                            className="w-full p-2 bg-white text-xs border border-slate-205 rounded font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">UAS</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={scores.finalExam}
                            onChange={(e) => handleScoreChange(subject, 'finalExam', parseInt(e.target.value) || 0)}
                            className="w-full p-2 bg-white text-xs border border-slate-205 rounded font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Rata-Rata</label>
                          <div className="w-full p-2 bg-emerald-50 text-emerald-800 text-xs rounded font-mono font-bold text-center border border-emerald-100">
                            {scores.average}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-4 text-center">Siswa ini tidak memiliki data subjek awal.</p>
                )}

              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveGrades}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-950 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Rekap Nilai</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
