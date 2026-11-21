/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// No type imports needed in normal JS

const PORT = 3000;
const DATA_FILE_PATH = path.join(process.cwd(), 'school_database.json');

// Initial seed data
const initialNews = [
  {
    id: 'n1',
    title: 'SMPN 1 Limboto Meraih Penghargaan Adiwiyata Mandiri 2026',
    content: 'SMPN 1 Limboto kembali menorehkan prestasi gemilang di tingkat nasional dengan meraih penghargaan Sekolah Adiwiyata Mandiri. Kepala Sekolah menyatakan bahwa pencapaian ini merupakan bukti kerja keras seluruh warga sekolah dalam menjaga komitmen "BE GREEN, BE CLEAN, BE SMART" melalui pengelolaan sampah mandiri, penanaman pohon hidroponik, dan kurikulum berbasis lingkungan hidup.',
    category: 'Prestasi',
    date: '2026-05-28',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200',
    author: 'Admin Humas'
  },
  {
    id: 'n2',
    title: 'Peluncuran Kebijakan "Zero Plastic Zone" di Lingkungan Sekolah',
    content: 'Mulai hari ini, SMPN 1 Limboto resmi menerapkan program kawasan bebas sampah plastik sekali pakai. Seluruh siswa, guru, dan staf diwajibkan membawa tumbler (botol minum) dan wadah makanan sendiri dari rumah. Kantin sekolah kini hanya menyajikan makanan sehat dengan wadah biodegradable ramah lingkungan.',
    category: 'Kegiatan',
    date: '2026-05-15',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200',
    author: 'Komite Adiwiyata'
  },
  {
    id: 'n3',
    title: 'Siswa SMPN 1 Limboto Juara 1 Olimpiade Fisika Tingkat Provinsi',
    content: 'Ananda Rifky Pakaya, siswa kelas IX Unggulan, berhasil meraih medali emas dalam Olimpiade Sains Nasional (OSN) tingkat Provinsi Gorontalo cabang Fisika Terapan. Rifky membawakan desain alat penyaring air limbah sederhana hemat energi yang selaras dengan nilai Adiwiyata sekolah.',
    category: 'Prestasi',
    date: '2026-05-10',
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1200',
    author: 'Kesiswaan'
  },
  {
    id: 'n4',
    title: 'Persiapan Penilaian Akhir Semester Genap Tahun Ajaran 2025/2026',
    content: 'Asesmen Akhir Semester (AAS) Genap akan dilaksanakan secara semi-digital berbasis komputer dan ponsel pintar mulai 8 Juni 2026. Kepala urusan kurikulum menghimbau para siswa untuk mengunduh aplikasi portal ujian resmi dan memastikan perangkat dalam keadaan siap pakai sebelum tenggat pelaksanaan.',
    category: 'Akademik',
    date: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    author: 'Urusan Kurikulum'
  }
];

const initialAnnouncements = [
  {
    id: 'a1',
    title: 'Pendaftaran SPMB Jalur Reguler Mulai Dibuka!',
    content: 'Diberitahukan kepada seluruh calon siswa baru angkatan 2026/2027, pendaftaran Seleksi Penerimaan Murid Baru (SPMB) kini resmi dibuka sampai dengan tanggal 15 Juni 2026. Pendaftaran dapat dilakukan secara online melalui tab portal PPDB di website ini. Silakan berkas dipersiapkan dengan lengkap.',
    date: '2026-05-29',
    isImportant: true,
    category: 'PPDB'
  },
  {
    id: 'a2',
    title: 'Panduan Pelaksanaan Masa Pengenalan Lingkungan Sekolah (MPLS) 2026',
    content: 'Bagi siswa yang lolos seleksi berkas PPDB, diwajibkan mengikuti taklimat awal persiapan MPLS yang akan diselenggarakan secara fisik pada tanggal 5 Juli 2026 bertempat di Lapangan Upacara Hijau SMPN 1 Limboto dengan pakaian seragam sekolah asal.',
    date: '2026-05-25',
    isImportant: true,
    category: 'PPDB'
  },
  {
    id: 'a3',
    title: 'Jadwal Pengambilan Rapor Semester Genap 2025/2026',
    content: 'Pembagian lembar hasil belajar (rapor) akan dibagikan langsung oleh wali kelas kepada orang tua/wali murid pada hari Jumat, 19 Juni 2026. Pembagian dibagi menjadi dua sesi (Sesi Pagi kelas VII & VIII, Sesi Siang untuk Kelas IX). Orang tua diwajibkan membawa kartu wali.',
    date: '2026-05-20',
    isImportant: false,
    category: 'Akademik'
  }
];

const initialGTK = [
  {
    id: 'g1',
    name: 'Dr. Hj. Nina Bobihu, M.Pd',
    gender: 'Perempuan',
    pob: 'Limboto',
    dob: '1974-04-12',
    type: 'Kepala Sekolah',
    subject: 'Manajemen Pendidikan / Fisika',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g2',
    name: 'Drs. H. Yusuf Habibie, M.Si',
    gender: 'Laki-laki',
    pob: 'Gorontalo',
    dob: '1968-11-20',
    type: 'Guru',
    subject: 'Ilmu Pengetahuan Alam (Fisika)',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g3',
    name: 'Faisal Nento, S.Pd, M.Hum',
    gender: 'Laki-laki',
    pob: 'Limboto',
    dob: '1982-08-14',
    type: 'Guru',
    subject: 'Bahasa Indonesia',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g4',
    name: 'Andi Bobihu, S.Pd',
    gender: 'Laki-laki',
    pob: 'Isimu',
    dob: '1985-03-25',
    type: 'Guru',
    subject: 'Matematika',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g5',
    name: 'Siti Rahma Palo, S.Pd',
    gender: 'Perempuan',
    pob: 'Gorontalo Utara',
    dob: '1989-09-02',
    type: 'Guru',
    subject: 'Bahasa Inggris',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g6',
    name: 'Suryono Sutera, S.Ag',
    gender: 'Laki-laki',
    pob: 'Limboto',
    dob: '1979-05-18',
    type: 'Guru',
    subject: 'Pendidikan Agama Islam',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g7',
    name: 'Zulkifli Lasena, S.Kom',
    gender: 'Laki-laki',
    pob: 'Limboto',
    dob: '1991-12-05',
    type: 'Staf',
    subject: 'Kepala Lab Komputer & TIK',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g8',
    name: 'Indah Lestari Bobihu, S.Pd',
    gender: 'Perempuan',
    pob: 'Limboto',
    dob: '1993-02-28',
    type: 'Guru',
    subject: 'Biologi (IPA)',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g9',
    name: 'Hartati Mohamad, S.E',
    gender: 'Perempuan',
    pob: 'Gorontalo',
    dob: '1980-06-15',
    type: 'Staf',
    subject: 'Kepala Tata Usaha / Keuangan',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g10',
    name: 'Ismail Lihawa, S.Pd',
    gender: 'Laki-laki',
    pob: 'Telaga',
    dob: '1987-10-10',
    type: 'Guru',
    subject: 'Ilmu Pengetahuan Sosial (IPS)',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g11',
    name: 'Novita Usman, S.Pd',
    gender: 'Perempuan',
    pob: 'Gorontalo',
    dob: '1994-01-30',
    type: 'Guru',
    subject: 'Seni Budaya',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g12',
    name: 'Wahyudin Mooduto, S.Or',
    gender: 'Laki-laki',
    pob: 'Limboto',
    dob: '1990-07-22',
    type: 'Guru',
    subject: 'Pendidikan Jasmani (PJOK)',
    photo: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&q=80&w=300'
  }
];

const initialStudents = [
  {
    id: 's1',
    nisn: '0081234501',
    name: 'Ananda Rifky Pakaya',
    className: 'IX-1',
    batch: '2023',
    pob: 'Gorontalo',
    dob: '2011-04-15',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 92, midterm: 88, finalExam: 95, average: 92 },
      'IPA': { assignment: 95, midterm: 94, finalExam: 96, average: 95 },
      'Bahasa Indonesia': { assignment: 88, midterm: 90, finalExam: 89, average: 89 },
      'Bahasa Inggris': { assignment: 90, midterm: 85, finalExam: 92, average: 89 }
    }
  },
  {
    id: 's2',
    nisn: '0081234502',
    name: 'Siti Amelia Isa',
    className: 'IX-1',
    batch: '2023',
    pob: 'Limboto',
    dob: '2011-08-20',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 85, midterm: 80, finalExam: 84, average: 83 },
      'IPA': { assignment: 89, midterm: 90, finalExam: 88, average: 89 },
      'Bahasa Indonesia': { assignment: 92, midterm: 91, finalExam: 94, average: 92 },
      'Bahasa Inggris': { assignment: 95, midterm: 96, finalExam: 98, average: 96 }
    }
  },
  {
    id: 's3',
    nisn: '0091234503',
    name: 'Fadel Mohamad Ali',
    className: 'VIII-1',
    batch: '2024',
    pob: 'Isimu',
    dob: '2012-05-12',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 78, midterm: 75, finalExam: 80, average: 78 },
      'IPA': { assignment: 82, midterm: 84, finalExam: 81, average: 82 },
      'Bahasa Indonesia': { assignment: 80, midterm: 82, finalExam: 84, average: 82 },
      'Bahasa Inggris': { assignment: 76, midterm: 78, finalExam: 82, average: 79 }
    }
  },
  {
    id: 's4',
    nisn: '0091234504',
    name: 'Putri Salsabila Nento',
    className: 'VIII-2',
    batch: '2024',
    pob: 'Limboto',
    dob: '2012-10-02',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 88, midterm: 82, finalExam: 86, average: 85 },
      'IPA': { assignment: 85, midterm: 86, finalExam: 84, average: 85 },
      'Bahasa Indonesia': { assignment: 94, midterm: 92, finalExam: 95, average: 94 },
      'Bahasa Inggris': { assignment: 91, midterm: 88, finalExam: 93, average: 91 }
    }
  },
  {
    id: 's5',
    nisn: '0101234505',
    name: 'Zainuddin Bobihu',
    className: 'VII-1',
    batch: '2025',
    pob: 'Telaga',
    dob: '2013-01-20',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 70, midterm: 68, finalExam: 72, average: 70 },
      'IPA': { assignment: 75, midterm: 74, finalExam: 73, average: 74 },
      'Bahasa Indonesia': { assignment: 78, midterm: 75, finalExam: 80, average: 78 },
      'Bahasa Inggris': { assignment: 72, midterm: 70, finalExam: 75, average: 72 }
    }
  },
  {
    id: 's6',
    nisn: '0101234506',
    name: 'Gita Lestari Palo',
    className: 'VII-2',
    batch: '2025',
    pob: 'Gorontalo',
    dob: '2013-03-14',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 82, midterm: 85, finalExam: 80, average: 82 },
      'IPA': { assignment: 80, midterm: 82, finalExam: 84, average: 82 },
      'Bahasa Indonesia': { assignment: 85, midterm: 88, finalExam: 86, average: 86 },
      'Bahasa Inggris': { assignment: 88, midterm: 90, finalExam: 87, average: 88 }
    }
  },
  {
    id: 's7',
    nisn: '0081234507',
    name: 'Rahmat Ferdiansyah',
    className: 'IX-2',
    batch: '2023',
    pob: 'Limboto',
    dob: '2011-09-09',
    photo: 'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 90, midterm: 92, finalExam: 94, average: 92 },
      'IPA': { assignment: 91, midterm: 89, finalExam: 93, average: 91 },
      'Bahasa Indonesia': { assignment: 86, midterm: 88, finalExam: 90, average: 88 },
      'Bahasa Inggris': { assignment: 87, midterm: 91, finalExam: 89, average: 89 }
    }
  },
  {
    id: 's8',
    nisn: '0081234508',
    name: 'Hana Khairunnisa',
    className: 'IX-2',
    batch: '2023',
    pob: 'Gorontalo Utara',
    dob: '2011-06-25',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 82, midterm: 80, finalExam: 85, average: 82 },
      'IPA': { assignment: 88, midterm: 85, finalExam: 89, average: 87 },
      'Bahasa Indonesia': { assignment: 90, midterm: 92, finalExam: 91, average: 91 },
      'Bahasa Inggris': { assignment: 94, midterm: 92, finalExam: 96, average: 94 }
    }
  },
  // Additional students for archive / list rendering
  {
    id: 's9',
    nisn: '0081234509',
    name: 'Lukman Hakim Gobel',
    className: 'IX-3',
    batch: '2023',
    pob: 'Kabila',
    dob: '2011-02-12',
    photo: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 75, midterm: 70, finalExam: 72, average: 72 }
    }
  },
  {
    id: 's10',
    nisn: '0081234510',
    name: 'Nuralisa Habibie',
    className: 'IX-3',
    batch: '2023',
    pob: 'Limboto',
    dob: '2011-07-27',
    photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 80, midterm: 81, finalExam: 82, average: 81 }
    }
  },
  {
    id: 's11',
    nisn: '0081234511',
    name: 'Syaiful Malapu',
    className: 'IX-3',
    batch: '2023',
    pob: 'Isimu',
    dob: '2011-12-01',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 78, midterm: 77, finalExam: 79, average: 78 }
    }
  },
  {
    id: 's12',
    nisn: '0081234512',
    name: 'Dewi Sartika Bobihoe',
    className: 'IX-4',
    batch: '2023',
    pob: 'Gorontalo',
    dob: '2011-10-18',
    photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 84, midterm: 86, finalExam: 88, average: 86 }
    }
  },
  {
    id: 's13',
    nisn: '0081234513',
    name: 'Rian Dunggio',
    className: 'IX-4',
    batch: '2023',
    pob: 'Limboto',
    dob: '2011-05-04',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 72, midterm: 75, finalExam: 74, average: 74 }
    }
  },
  {
    id: 's14',
    nisn: '0081234514',
    name: 'Indri Syarif',
    className: 'IX-4',
    batch: '2023',
    pob: 'Suwawa',
    dob: '2011-11-20',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300',
    grades: {
      'Matematika': { assignment: 79, midterm: 80, finalExam: 82, average: 80 }
    }
  }
];

const initialMaterials = [
  {
    id: 'm1',
    subject: 'Matematika',
    topic: 'Aljabar dan Persamaan Kuadrat',
    description: 'Bahan ajar lengkap mengenai faktorisasi persamaan kuadrat berpangkat dua beserta latihan soal mandiri.',
    teacherName: 'Andi Bobihu, S.Pd',
    downloadUrl: '/files/matematika_kuadrat_kelas9.pdf'
  },
  {
    id: 'm2',
    subject: 'IPA (Fisika)',
    topic: 'Listrik Statis dan Hukum Coulomb',
    description: 'Materi interaktif tentang interaksi muatan listrik statis dilengkapi simulasi perhitungan gaya Coulomb.',
    teacherName: 'Drs. H. Yusuf Habibie, M.Si',
    downloadUrl: '/files/ipa_listrik_statis_kelas9.pdf'
  },
  {
    id: 'm3',
    subject: 'Bahasa Inggris',
    topic: 'Narrative Text & Indonesian Folklores',
    description: 'Latihan membaca dan menyusun teks narasi berbahasa Inggris berdasarkan cerita rakyat Gorontalo dan Nusantara.',
    teacherName: 'Siti Rahma Palo, S.Pd',
    downloadUrl: '/files/english_narrative_text.pdf'
  },
  {
    id: 'm4',
    subject: 'Bahasa Indonesia',
    topic: 'Menulis Teks Laporan Hasil Observasi',
    description: 'Panduan tata cara mengamati ekosistem Adiwiyata sekolah dan merangkumnya menjadi teks laporan baku.',
    teacherName: 'Faisal Nento, S.Pd, M.Hum',
    downloadUrl: '/files/bahasa_laporan_observasi.pdf'
  }
];

const initialArchives = [
  { id: 'arc1', batch: '2021', studentName: 'Rivaldo Bobihu', pdfName: 'ijazah_rivaldo_2021.pdf' },
  { id: 'arc2', batch: '2021', studentName: 'Farhan Pakaya', pdfName: 'ijazah_farhan_2021.pdf' },
  { id: 'arc3', batch: '2021', studentName: 'Sri Wahyuni Palo', pdfName: 'ijazah_yuni_2021.pdf' },
  { id: 'arc4', batch: '2021', studentName: 'Haris Lihawa', pdfName: 'ijazah_haris_2021.pdf' },
  { id: 'arc5', batch: '2021', studentName: 'Fiona Nento', pdfName: 'ijazah_fiona_2021.pdf' },
  { id: 'arc6', batch: '2021', studentName: 'Yusuf Bobihoe', pdfName: 'ijazah_yusuf_2021.pdf' },
  { id: 'arc7', batch: '2021', studentName: 'Mega Mustika', pdfName: 'ijazah_mega_2021.pdf' },
  
  { id: 'arc8', batch: '2022', studentName: 'Alya Gobel', pdfName: 'ijazah_alya_2022.pdf' },
  { id: 'arc9', batch: '2022', studentName: 'Rizal Dunggio', pdfName: 'ijazah_rizal_2022.pdf' },
  { id: 'arc10', batch: '2022', studentName: 'Widya Mohamad', pdfName: 'ijazah_widya_2022.pdf' },
  { id: 'arc11', batch: '2022', studentName: 'Sahrul Lasena', pdfName: 'ijazah_sahrul_2022.pdf' },
  { id: 'arc12', batch: '2022', studentName: 'Ningsih Pakaya', pdfName: 'ijazah_ningsih_2022.pdf' },
  { id: 'arc13', batch: '2022', studentName: 'Andika Mooduto', pdfName: 'ijazah_andika_2022.pdf' },
  { id: 'arc14', batch: '2022', studentName: 'Taufik Lihawa', pdfName: 'ijazah_taufik_2022.pdf' },

  { id: 'arc15', batch: '2023', studentName: 'Ananda Rifky Pakaya', pdfName: 'rapor_rifky_2023.pdf' },
  { id: 'arc16', batch: '2023', studentName: 'Siti Amelia Isa', pdfName: 'rapor_amelia_2023.pdf' },
  { id: 'arc17', batch: '2023', studentName: 'Rahmat Ferdiansyah', pdfName: 'rapor_rahmat_2023.pdf' },
  { id: 'arc18', batch: '2023', studentName: 'Hana Khairunnisa', pdfName: 'rapor_hana_2023.pdf' },
  { id: 'arc19', batch: '2023', studentName: 'Lukman Hakim Gobel', pdfName: 'rapor_lukman_2023.pdf' },
  { id: 'arc20', batch: '2023', studentName: 'Nuralisa Habibie', pdfName: 'rapor_alisa_2023.pdf' },
  { id: 'arc21', batch: '2023', studentName: 'Syaiful Malapu', pdfName: 'rapor_syaiful_2023.pdf' }
];

const initialPPDB = [
  {
    id: 'p1',
    nisn: '0123450001',
    name: 'Bayu Bobihu Pakaya',
    gender: 'Laki-laki',
    email: 'bayu.bobihu@gmail.com',
    phone: '085240112233',
    pob: 'Limboto',
    dob: '2014-03-12',
    previousSchool: 'SDN 1 Limboto Barat',
    address: 'Jl. Ahmad Yani No. 44, Kel. Dutulanaa, Limboto',
    status: 'MPLS',
    registrationDate: '2026-05-29'
  },
  {
    id: 'p2',
    nisn: '0123450002',
    name: 'Wulan Maulida Nento',
    gender: 'Perempuan',
    email: 'wulan.nento@yahoo.com',
    phone: '081344556677',
    pob: 'Gorontalo',
    dob: '2014-07-28',
    previousSchool: 'SD Laboratorium UNG',
    address: 'Jl. Kasuari No. 12, Limboto',
    status: 'Lolos Seleksi',
    registrationDate: '2026-05-30'
  }
];

const initialPrincipals = [
  {
    name: 'Dr. Hj. Nina Bobihu, M.Pd',
    period: '2024 - Sekarang',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    status: 'Aktif',
    quote: 'Mencetak generasi yang tidak hanya unggul dalam kognitif (Smart), melainkan berintegritas tinggi dalam mencintai kelestarian bumi (Green & Clean).'
  },
  {
    name: 'Drs. H. Yusuf Habibie, M.Si',
    period: '2019 - 2024',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    status: 'Mantan'
  },
  {
    name: 'Dra. Hj. Fatmah Bobihu, M.Pd',
    period: '2014 - 2019',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    status: 'Mantan'
  },
  {
    name: 'H. Syarif Gobel, S.Pd',
    period: '2008 - 2014',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    status: 'Mantan'
  }
];

const initialAchievements = [
  {
    id: 'ac1',
    title: 'Sekolah Adiwiyata Mandiri Tingkat Nasional',
    category: 'Akademik',
    year: '2026',
    recipient: 'SMPN 1 Limboto',
    description: 'Penghargaan tertinggi dari Kementerian Lingkungan Hidup atas konsistensi program "Go Green" sekolah.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ac2',
    title: 'Medali Emas Matematika Terapan OSN',
    category: 'Akademik',
    year: '2025',
    recipient: 'Ananda Rifky Pakaya',
    description: 'Juara 1 dalam menghitung efisiensi sel surya ramah lingkungan di ajang nasional.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ac3',
    title: 'Juara 1 Festival Seni Tari Saronde Tradisional',
    category: 'Non-Akademik',
    year: '2026',
    recipient: 'Komunitas Seni Saro-Limboto',
    description: 'Meraih skor sempurna dalam keaslian koreografi dan keasrian kostum adat Gorontalo.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600'
  }
];

// Database state
let database = {
  news: initialNews,
  announcements: initialAnnouncements,
  gtk: initialGTK,
  students: initialStudents,
  materials: initialMaterials,
  archives: initialArchives,
  ppdb: initialPPDB,
  principals: initialPrincipals,
  achievements: initialAchievements
};

// Save database to disk on updates
const loadDB = () => {
  if (fs.existsSync(DATA_FILE_PATH)) {
    try {
      const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      database = JSON.parse(content);
    } catch (e) {
      console.log("Database file corrupted, using defaults");
    }
  }
};

const saveDB = () => {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(database, null, 2), 'utf-8');
  } catch (e) {
    console.log("Failed to save database file");
  }
};

// Ensure database loaded
loadDB();

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  // 1. News
  app.get('/api/news', (req, res) => {
    res.json(database.news);
  });

  // 2. Announcements
  app.get('/api/announcements', (req, res) => {
    res.json(database.announcements);
  });

  app.post('/api/announcements', (req, res) => {
    const { title, content, isImportant, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const newAnn = {
      id: 'a' + (database.announcements.length + 1),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      isImportant: !!isImportant,
      category: category || 'Pengumuman'
    };
    database.announcements.unshift(newAnn);
    saveDB();
    res.status(211).json(newAnn);
  });

  // 3. GTK
  app.get('/api/gtk', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const search = req.query.search ? req.query.search.toLowerCase() : '';
    
    let list = database.gtk;
    if (search) {
      list = list.filter(g => 
        g.name.toLowerCase().includes(search) || 
        g.subject.toLowerCase().includes(search) ||
        g.type.toLowerCase().includes(search)
      );
    }
    
    if (limit) {
      return res.json(list.slice(0, limit));
    }
    res.json(list);
  });

  // 4. Students & Grade Queries
  app.get('/api/students', (req, res) => {
    const search = req.query.search ? req.query.search.toLowerCase() : '';
    let list = database.students;
    if (search) {
      list = list.filter(s => 
        s.name.toLowerCase().includes(search) || 
        s.nisn.includes(search) ||
        s.className.toLowerCase().includes(search)
      );
    }
    res.json(list);
  });

  app.get('/api/students/grade/:nisn', (req, res) => {
    const { nisn } = req.params;
    const student = database.students.find(s => s.nisn === nisn);
    if (!student) {
      return res.status(404).json({ error: 'Siswa dengan NISN ini tidak ditemukan.' });
    }
    res.json(student);
  });

  app.put('/api/students/grade/:id', (req, res) => {
    const { id } = req.params;
    const { grades } = req.body;
    
    const index = database.students.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Siswa tidak ditemukan.' });
    }

    database.students[index].grades = grades;
    saveDB();
    res.json(database.students[index]);
  });

  // 5. Learning Materials
  app.get('/api/materials', (req, res) => {
    res.json(database.materials);
  });

  app.post('/api/materials', (req, res) => {
    const { subject, topic, description, teacherName } = req.body;
    if (!subject || !topic || !teacherName) {
      return res.status(400).json({ error: 'Subject, topic, and teacher name are required' });
    }
    const newMaterial = {
      id: 'm' + (database.materials.length + 1),
      subject,
      topic,
      description: description || '',
      teacherName,
      downloadUrl: `/files/${subject.toLowerCase().replace(/ /g, '_')}_materi.pdf`
    };
    database.materials.unshift(newMaterial);
    saveDB();
    res.status(211).json(newMaterial);
  });

  // 6. Archives by Batch
  app.get('/api/archives', (req, res) => {
    res.json(database.archives);
  });

  // 7. PPDB Inline Registry
  app.get('/api/ppdb', (req, res) => {
    res.json(database.ppdb);
  });

  app.post('/api/ppdb/register', (req, res) => {
    const { nisn, name, gender, email, phone, pob, dob, previousSchool, address } = req.body;
    
    if (!nisn || !name || !email || !phone || !previousSchool) {
      return res.status(400).json({ error: 'Mohon isi semua field wajib (NISN, Nama, Email, Telepon, Sekolah Asal).' });
    }

    // Check if NISN already exists
    const duplicate = database.ppdb.find(p => p.nisn === nisn);
    if (duplicate) {
      return res.status(400).json({ error: 'Siswa dengan NISN ini sudah terdaftar dalam sistem PPDB.' });
    }

    const newReg = {
      id: 'p' + (database.ppdb.length + 1),
      nisn,
      name,
      gender: gender || 'Laki-laki',
      email,
      phone,
      pob: pob || 'Limboto',
      dob: dob || '2014-01-01',
      previousSchool,
      address: address || '',
      status: 'Diproses',
      registrationDate: new Date().toISOString().split('T')[0]
    };

    database.ppdb.unshift(newReg);
    saveDB();
    res.status(211).json(newReg);
  });

  // Promotes PPDB candidates (eg setting to MPLS status)
  app.put('/api/ppdb/status/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const index = database.ppdb.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Registrasi PPDB tidak ditemukan' });
    }

    database.ppdb[index].status = status;
    saveDB();
    res.json(database.ppdb[index]);
  });

  // 8. General Principals list & achievements
  app.get('/api/principals', (req, res) => {
    res.json(database.principals);
  });

  app.get('/api/achievements', (req, res) => {
    res.json(database.achievements);
  });

  // Vite development vs production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SMPN 1 Limboto Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
