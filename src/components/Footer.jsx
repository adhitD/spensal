/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Mail, Phone, MapPin, Globe, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t-4 border-blue-900" id="main-footer-component">
      {/* Upper professional section */}
      <div className="bg-blue-950 text-white/90 py-8 px-4 border-b border-white/5" id="footer-motifs-container">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900 rounded-2xl flex items-center justify-center border border-blue-850 shadow-sm">
              <Leaf className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-sans font-extrabold text-lg leading-tight">Motto Sekolah Adiwiyata</h4>
              <p className="text-xs text-amber-400 uppercase font-mono tracking-wider">BE GREEN &bull; BE CLEAN &bull; BE SMART</p>
            </div>
          </div>
          <div className="text-center md:text-right max-w-md">
            <p className="text-sm italic text-slate-200">
              "Menumbuhkan kecerdasan intelektual sekaligus membentuk karakter peduli kelestarian lingkungan dan kenyamanan belajar."
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer widgets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="footer-widgets">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight uppercase border-b-2 border-blue-500 pb-2 inline-block font-sans">
              SMPN 1 LIMBOTO
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sekolah Menengah Pertama Negeri 1 Limboto merupakan institusi pendidikan unggulan di Kabupaten Gorontalo dengan komitmen akademik tangguh dan pengelolaan lingkungan hidup Adiwiyata Mandiri berpilar kelestarian.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 text-blue-400 hover:bg-blue-600 hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 text-blue-400 hover:bg-blue-600 hover:text-white transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 text-blue-400 hover:bg-blue-600 hover:text-white transition">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Kontak */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight uppercase border-b-2 border-blue-500 pb-2 inline-block font-sans">
              Hubungi Kami
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-400 font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>Jl. Ahmad Yani No. 122, Kel. Dutulanaa, Kec. Limboto, Kab. Gorontalo, Gorontalo 96213</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>(0435) 881234</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>humas@smpn1limboto.sch.id</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight uppercase border-b-2 border-blue-500 pb-2 inline-block font-sans">
              Tautan Cepat
            </h3>
            <ul className="space-y-2 text-xs text-slate-450">
              <li>
                <a href="#profil" className="hover:text-blue-400 hover:underline">Visi Misi & Sejarah</a>
              </li>
              <li>
                <a href="#ppdb" className="hover:text-blue-400 hover:underline">PPDB Online</a>
              </li>
              <li>
                <a href="#nilai" className="hover:text-blue-400 hover:underline">Cek Rapor Siswa</a>
              </li>
              <li>
                <a href="#guru" className="hover:text-blue-400 hover:underline">Materi Pembelajaran</a>
              </li>
              <li>
                <a href="#arsip" className="hover:text-blue-400 hover:underline">Arsip Kelulusan</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Akreditasi & Jam Layanan */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-tight uppercase border-b-2 border-blue-500 pb-2 inline-block font-sans">
              Layanan Administrasi
            </h3>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Senin - Kamis</span>
                <span className="font-semibold text-blue-400">07:15 - 14:00 WITA</span>
              </div>
              <div className="flex justify-between">
                <span>Jumat</span>
                <span className="font-semibold text-blue-400">07:15 - 11:30 WITA</span>
              </div>
              <div className="border-t border-slate-800 my-2 pt-2 flex justify-between items-center">
                <span>Akreditasi Sekolah:</span>
                <span className="bg-amber-400/25 text-amber-450 font-bold px-2 py-0.5 rounded text-[10px]">A (UNGGUL)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-850 mt-12 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 SMP Negeri 1 Limboto. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4 font-mono text-[10px] text-slate-600">
            <span>Server CJS Engine Active</span>
            <span>&bull;</span>
            <span>NPSN ID: 40501122</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
