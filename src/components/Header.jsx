/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Search, Leaf, ShieldAlert, GraduationCap, Award } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery,
  onSearchFocus 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfilDropdown, setShowProfilDropdown] = useState(false);
  const [showGuruDropdown, setShowGuruDropdown] = useState(false);
  const [showSiswaDropdown, setShowSiswaDropdown] = useState(false);

  const navigations = [
    { key: 'Beranda', label: 'Beranda' },
    { 
      key: 'Profil', 
      label: 'Profil', 
      subItems: [
        { key: 'Profil-Misi', label: 'Visi & Misi' },
        { key: 'Profil-Sejarah', label: 'Sejarah Singkat' },
        { key: 'Profil-Kepsek', label: 'Kepala Sekolah' },
        { key: 'Profil-Prestasi', label: 'Prestasi & Penghargaan' }
      ]
    },
    { 
      key: 'Guru', 
      label: 'Guru & Staf',
      subItems: [
        { key: 'Guru-Direktori', label: 'Direktori GTK' },
        { key: 'Guru-Materi', label: 'Materi Pembelajaran' }
      ]
    },
    { 
      key: 'PesertaDidik', 
      label: 'Siswa',
      subItems: [
        { key: 'Siswa-Direktori', label: 'Direktori Siswa' },
        { key: 'Siswa-Osis', label: 'OSIS' }
      ]
    },
    { key: 'PPDB', label: 'PPDB' },
    { key: 'Galeri', label: 'Galeri' },
    { key: 'Arsip', label: 'Arsip Kelulusan' },
    { key: 'Nilai', label: 'Portal Nilai' }
  ];

  const handleNavClick = (tabKey) => {
    setActiveTab(tabKey);
    setIsOpen(false);
    setShowProfilDropdown(false);
    setShowGuruDropdown(false);
    setShowSiswaDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200" id="main-header">
      {/* Top professional accent bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 px-4 py-1.5 text-center text-white text-xs font-medium tracking-wide flex items-center justify-between mx-auto" id="top-bar">
        <div className="flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>SMP Negeri 1 Limboto Adiwiyata Mandiri School</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-blue-105">
          <span>Slogan resmi: <strong className="text-amber-400">BE GREEN, BE CLEAN, BE SMART</strong></span>
        </div>
        <div className="text-[10px] md:text-xs text-slate-300">
          NPSN: 40501122
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="navigation-root">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo and Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('Beranda')} id="header-branding">
            <div className="bg-blue-50 p-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-blue-900" />
            </div>
            <div>
              <h1 className="font-sans font-extrabold tracking-tight text-xl leading-none text-slate-800 flex items-center gap-1">
                <span>SMPN 1 LIMBOTO</span>
              </h1>
              <p className="font-mono text-[9px] uppercase font-bold text-blue-700 tracking-widest mt-1.5">
                Be Green &bull; Clean &bull; Smart
              </p>
            </div>
          </div>

          {/* Nav Links for Desktop */}
          <nav className="hidden lg:flex space-x-1 items-center" id="desktop-nav">
            {navigations.map((nav) => {
              const isSubSelected = nav.subItems?.some(s => activeTab === s.key);
              const isSelected = activeTab === nav.key || isSubSelected;

              if (nav.subItems) {
                const isProfil = nav.key === 'Profil';
                const isGuru = nav.key === 'Guru';
                const isSiswa = nav.key === 'PesertaDidik';

                const dropdownOpen = isProfil ? showProfilDropdown : isGuru ? showGuruDropdown : showSiswaDropdown;
                const setDropdownOpen = isProfil ? setShowProfilDropdown : isGuru ? setShowGuruDropdown : setShowSiswaDropdown;

                return (
                  <div 
                    key={nav.key} 
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    id={`nav-menu-${nav.key}`}
                  >
                    <button
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide flex items-center gap-1 transition-all duration-200 ${
                        isSelected 
                          ? 'bg-emerald-50 text-emerald-800' 
                          : 'text-gray-700 hover:bg-slate-50 hover:text-emerald-800'
                      }`}
                    >
                      {nav.label}
                      <svg className="w-4 h-4 ml-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute left-0 mt-0 w-52 rounded-xl bg-white shadow-xl ring-1 ring-black/5 py-1 z-50 border border-slate-100 transition-all">
                        {nav.subItems.map((sub) => (
                          <button
                            key={sub.key}
                            onClick={() => handleNavClick(sub.key)}
                            className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-900 flex items-center gap-1.5 transition-colors ${
                              activeTab === sub.key ? 'bg-emerald-500/10 text-emerald-700' : 'text-gray-600'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === sub.key ? 'bg-emerald-600' : 'bg-transparent'}`} />
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={nav.key}
                  onClick={() => handleNavClick(nav.key)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isSelected 
                      ? 'bg-emerald-700 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-slate-50 hover:text-emerald-800'
                  }`}
                  id={`nav-button-${nav.key}`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>

          {/* Search bar Desktop */}
          <div className="hidden md:flex items-center relative max-w-xs w-full ml-4" id="search-bar-container">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari berita, GTK, nilai..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearchFocus();
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all duration-200"
              id="search-input"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2" id="mobile-menu-trigger">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-750 hover:bg-slate-100 hover:text-emerald-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-inner px-4 pt-2 pb-6 space-y-2 transition-all" id="mobile-nav">
          <div className="relative w-full mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Cari sesuatu..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearchFocus();
              }}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
              id="search-input-mobile"
            />
          </div>

          {navigations.map((nav) => {
            if (nav.subItems) {
              return (
                <div key={nav.key} className="space-y-1 block py-1" id={`mobile-sub-group-${nav.key}`}>
                  <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase pl-2 mb-1">
                    {nav.label}
                  </p>
                  {nav.subItems.map((sub) => (
                    <button
                      key={sub.key}
                      onClick={() => handleNavClick(sub.key)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        activeTab === sub.key 
                          ? 'bg-emerald-50 text-emerald-800' 
                          : 'text-gray-700 hover:bg-slate-50'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              );
            }

            return (
              <button
                key={nav.key}
                onClick={() => handleNavClick(nav.key)}
                className={`w-full text-left block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === nav.key 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-slate-50'
                }`}
                id={`mobile-nav-btn-${nav.key}`}
              >
                {nav.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
