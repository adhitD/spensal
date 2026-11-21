/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BerandaTab from './components/BerandaTab';
import ProfilTab from './components/ProfilTab';
import GuruTab from './components/GuruTab';
import SiswaTab from './components/SiswaTab';
import PPDBTab from './components/PPDBTab';
import ArsipTab from './components/ArsipTab';
import NilaiTab from './components/NilaiTab';

import { 
  Building2, 
  BookOpen, 
  Users, 
  Search, 
  Leaf, 
  Award, 
  FolderLock,
  Globe
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Beranda');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State fetched from server
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [gtk, setGtk] = useState([]);
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [archives, setArchives] = useState([]);
  const [ppdb, setPpdb] = useState([]);
  const [principals, setPrincipals] = useState([]);
  const [achievements, setAchievements] = useState([]);
  
  const [loading, setLoading] = useState(true);

  // Fetch all endpoints from database server on load
  const loadDatabase = async () => {
    try {
      const [
        newsRes, 
        annRes, 
        gtkRes, 
        studRes, 
        matRes, 
        arcRes, 
        ppdbRes, 
        prinRes, 
        achRes
      ] = await Promise.all([
        fetch('/api/news').then(r => r.json()),
        fetch('/api/announcements').then(r => r.json()),
        fetch('/api/gtk').then(r => r.json()),
        fetch('/api/students').then(r => r.json()),
        fetch('/api/materials').then(r => r.json()),
        fetch('/api/archives').then(r => r.json()),
        fetch('/api/ppdb').then(r => r.json()),
        fetch('/api/principals').then(r => r.json()),
        fetch('/api/achievements').then(r => r.json())
      ]);

      setNews(newsRes);
      setAnnouncements(annRes);
      setGtk(gtkRes);
      setStudents(studRes);
      setMaterials(matRes);
      setArchives(arcRes);
      setPpdb(ppdbRes);
      setPrincipals(prinRes);
      setAchievements(achRes);
    } catch (e) {
      console.error('Failed to connect to school server APIs, falling back to static configurations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  // Global search criteria inside local state
  const isSearching = searchQuery.trim().length > 0;

  // Filter lists based on global navbar query (Pencarian)
  const matchingNews = news.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()));
  const matchingGtk = gtk.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const matchingStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nisn.includes(searchQuery));
  const matchingAchievements = achievements.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase()));

  // Handlers
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Gallery items matching "galeri"
  const galleryImages = [
    { 
      title: 'Halaman Gedung Utama & Rindang Pepohonan', 
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600',
      tag: 'Sapras'
    },
    { 
      title: 'Taman Hidroponik Adiwiyata Mandiri', 
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600',
      tag: 'Green'
    },
    { 
      title: 'Lab TIK & Komputer Baru', 
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      tag: 'Smart'
    },
    { 
      title: 'Siswa Berdiskusi di Selasar Bersih', 
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
      tag: 'Clean'
    },
    { 
      title: 'Penyerahan Tumpeng Juara Sekolah Sehat', 
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
      tag: 'Prestasi'
    },
    { 
      title: 'E-Library & Ruang Baca Nyaman', 
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600',
      tag: 'Smart'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-emerald-600 selection:text-white" id="main-applet-root">
      
      {/* Header component with universal props */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery(''); // Reset search on tab transitions
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchFocus={() => {
          // If search is selected, remain on active or helper transition
        }}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" id="tab-router-workspace">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4" id="fallback-loading">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-emerald-800">Menghubungkan ke server data SMPN 1 Limboto...</p>
          </div>
        ) : (
          <>
            {/* GLOBAL SEARCH RESULTS (If search query has inputs, hijack active tab to show matching elements) */}
            {isSearching ? (
              <div className="space-y-8 animate-fadeIn" id="global-search-results">
                
                {/* Search Meta Header */}
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl flex justify-between items-center">
                  <div>
                    <h2 className="font-sans font-bold text-lg text-emerald-950 flex items-center gap-2">
                      <Search className="w-5 h-5 text-emerald-700" />
                      <span>Hasil Pencarian Global: "{searchQuery}"</span>
                    </h2>
                    <p className="text-xs text-emerald-800 mt-1">Kami mendeteksi dokumen, artikel berita, staf, dan siswa yang relevan dengan kata kunci Anda.</p>
                  </div>
                  <button
                    onClick={handleClearSearch}
                    className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Hapus Pencarian
                  </button>
                </div>

                {/* News matches */}
                {matchingNews.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest font-mono">Berita Terkait ({matchingNews.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchingNews.map(item => (
                        <div key={item.id} className="bg-white border rounded-2xl p-4 flex gap-3 cursor-pointer hover:border-emerald-500" onClick={() => alert(item.content)}>
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[9px] bg-emerald-50 text-emerald-850 px-2 py-0.5 rounded font-bold">{item.category}</span>
                            <h4 className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">{item.title}</h4>
                            <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{item.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GTK matches */}
                {matchingGtk.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest font-mono">Pendidik & GTK Terkait ({matchingGtk.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {matchingGtk.map(teacher => (
                        <div key={teacher.id} className="bg-white border rounded-2xl p-4 flex items-center gap-3">
                          <img src={teacher.photo} alt={teacher.name} className="w-10 h-10 rounded-full object-cover border" />
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 leading-tight">{teacher.name}</h4>
                            <span className="text-[9px] text-emerald-800 font-semibold">{teacher.subject} &bull; {teacher.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Students matches */}
                {matchingStudents.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest font-mono">Siswa Terdaftar ({matchingStudents.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {matchingStudents.map(student => (
                        <div 
                          key={student.id} 
                          className="bg-white border rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-emerald-500"
                          onClick={() => {
                            setActiveTab('Nilai');
                            setSearchQuery('');
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <img src={student.photo} alt={student.name} className="w-9 h-9 rounded-full object-cover border" />
                            <div>
                              <h4 className="font-bold text-xs text-slate-900 leading-tight">{student.name}</h4>
                              <span className="text-[9px] text-slate-400 font-mono">NISN: {student.nisn} &bull; Kelas {student.className}</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Cek Nilai &rarr;</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements matches */}
                {matchingAchievements.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest font-mono">Prestasi Terkait ({matchingAchievements.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {matchingAchievements.map(ach => (
                        <div key={ach.id} className="bg-white border rounded-2xl p-4 space-y-1">
                          <span className="text-[9px] text-amber-700 font-bold">{ach.year}</span>
                          <h4 className="font-bold text-xs text-slate-900">{ach.title}</h4>
                          <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">{ach.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No matching results alert */}
                {matchingNews.length === 0 && matchingGtk.length === 0 && matchingStudents.length === 0 && matchingAchievements.length === 0 && (
                  <div className="bg-white border p-12 text-center text-slate-400 rounded-3xl" id="search-not-found">
                    Kombinasi kata kunci pencarian Anda tidak menghasilkan berkas atau file digital apa pun.
                  </div>
                )}

              </div>
            ) : (
              // TAB STATE MACHINE ROUTER
              <div id="tab-router-outlet">
                
                {/* 1. Beranda */}
                {activeTab === 'Beranda' && (
                  <BerandaTab 
                    news={news} 
                    announcements={announcements} 
                    achievements={achievements}
                    setActiveTab={setActiveTab}
                  />
                )}

                {/* 2. Profil sub-tabs */}
                {activeTab.startsWith('Profil') && (
                  <ProfilTab 
                    subSection={activeTab} 
                    principals={principals}
                    achievements={achievements}
                  />
                )}

                {/* 3. Guru & Staf sub-tabs */}
                {activeTab.startsWith('Guru') && (
                  <GuruTab 
                    initialGtk={gtk} 
                    materials={materials}
                  />
                )}

                {/* 4. Peserta didik / Siswa sub-tabs */}
                {activeTab.startsWith('Siswa') && (
                  <SiswaTab 
                    students={students} 
                  />
                )}

                {/* 5. PPDB Online */}
                {activeTab === 'PPDB' && (
                  <PPDBTab 
                    initialPpdb={ppdb} 
                  />
                )}

                {/* 6. Galeri Foto */}
                {activeTab === 'Galeri' && (
                  <div className="space-y-6 animate-fadeIn" id="galeri-school-page">
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl">
                      <h3 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
                        <Building2 className="w-5.5 h-5.5 text-emerald-700" />
                        <span>Katalog Fasilitas & Galeri Kegiatan</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">Dokumentasi sarana prasarana penunjang kenyamanan kesiswaan bermotif Be Green, Be Clean, Be Smart.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {galleryImages.map((gal, idx) => (
                        <div key={idx} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:scale-[1.01] transition duration-200">
                          <div className="h-48 bg-slate-100 relative">
                            <img src={gal.image} alt={gal.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <span className="absolute top-3 left-3 bg-slate-900/85 text-white text-[9px] uppercase font-mono tracking-widest font-extrabold px-3 py-1 rounded">
                              {gal.tag}
                            </span>
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-slate-900 text-xs tracking-tight">{gal.title}</h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-1">SMP Negeri 1 Limboto &bull; Adiwiyata</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Arsip Kelulusan */}
                {activeTab === 'Arsip' && (
                  <ArsipTab 
                    initialArchives={archives} 
                  />
                )}

                {/* 8. Portal Nilai */}
                {activeTab === 'Nilai' && (
                  <NilaiTab 
                    initialStudents={students}
                    onGradesUpdated={loadDatabase}
                  />
                )}

              </div>
            )}
          </>
        )}

      </div>

      {/* Footer component standard */}
      <Footer />
    </div>
  );
}
