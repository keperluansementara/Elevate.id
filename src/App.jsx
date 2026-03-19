import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Smartphone,
  Zap,
  Target,
  LineChart,
  CheckCircle,
  ChevronDown,
  Star,
  Layout,
  MessageCircle,
  Menu,
  X,
  Shield,
  Clock,
  ArrowUpRight,
  Building2,
  Briefcase,
  Store,
  Coffee,
  XCircle
} from 'lucide-react';

// ==========================================
// 1. DATA STATIS (Di luar komponen)
// ==========================================
const WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor WA asli
const WA_LINK_GENERAL = `https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Elevate%20Studio,%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20landing%20page.`;
const WA_LINK_GROWTH = `https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Elevate%20Studio,%20saya%20tertarik%20dengan%20paket%20Growth%20Partner.`;

const FEATURES_DATA = [
  {
    icon: <Target className="w-6 h-6 text-indigo-600" />,
    title: 'Fokus pada Konversi',
    description: 'Bukan sekadar desain cantik. Setiap elemen dirancang dengan psikologi marketing untuk mengubah pengunjung menjadi pembeli.'
  },
  {
    icon: <Zap className="w-6 h-6 text-indigo-600" />,
    title: 'Performa Kilat',
    description: 'Kecepatan muat di bawah 2 detik. Memastikan Anda tidak kehilangan calon pelanggan karena website yang lambat.'
  },
  {
    icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
    title: 'Mobile-First Design',
    description: '70% traffic berasal dari smartphone. Kami mengoptimalkan pengalaman mobile agar mulus tanpa hambatan.'
  },
  {
    icon: <LineChart className="w-6 h-6 text-indigo-600" />,
    title: 'Data-Driven & Analytics',
    description: 'Terintegrasi penuh dengan Google Analytics dan Meta Pixel untuk melacak performa iklan Anda dengan akurat.'
  }
];

const PROCESS_DATA = [
  {
    step: '01',
    title: 'Discovery & Strategi',
    description: 'Menganalisis bisnis Anda, target pasar, dan kompetitor untuk merumuskan angle penawaran yang paling menarik.'
  },
  {
    step: '02',
    title: 'Desain & Copywriting',
    description: 'Merancang UI/UX premium dan menulis copy yang persuasif, disesuaikan dengan identitas brand Anda.'
  },
  {
    step: '03',
    title: 'Development & Launch',
    description: 'Coding dengan standar performa tinggi, Quality Control ketat, dan website siap menghasilkan profit.'
  }
];

const PORTFOLIO_DATA = [
  {
    title: 'Aura Skin Clinic',
    category: 'Health & Beauty',
    metric: '+145% Lead Rate',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    title: 'Fintech Flow App',
    category: 'SaaS / B2B',
    metric: '3x App Downloads',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    title: 'Kopi Kenari Roastery',
    category: 'F&B Franchise',
    metric: 'Sold Out in 2 Days',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

const FAQ_DATA = [
  {
    question: 'Berapa lama waktu pengerjaan sebuah landing page?',
    answer: 'Kualitas membutuhkan waktu. Rata-rata pengerjaan kami adalah 5-7 hari kerja untuk memastikan riset strategi, desain, copywriting, dan performa teknis berada di standar tertinggi sebelum kami serahkan kepada Anda.'
  },
  {
    question: 'Apakah saya perlu menyiapkan teks dan gambar sendiri?',
    answer: 'Tidak wajib. Tim copywriter kami akan membantu menyusun teks persuasif (sales copy) berdasarkan brief bisnis Anda. Untuk gambar, kami menggunakan aset premium, namun Anda sangat disarankan memberikan foto produk/layanan asli agar lebih otentik.'
  },
  {
    question: 'Bagaimana jika saya ingin mengubah desain setelah selesai?',
    answer: 'Setiap paket kami lengkapi dengan masa garansi revisi dan dukungan teknis. Selain itu, kami membangun landing page dengan sistem yang memungkinkan Anda untuk mengubah teks atau gambar dengan sangat mudah tanpa harus mengerti coding.'
  },
  {
    question: 'Apakah sudah termasuk domain dan server hosting?',
    answer: 'Tentu. Paket kami bersifat "Done-For-You". Anda sudah mendapatkan gratis domain (.com/.id) dan cloud hosting berkecepatan tinggi selama 1 tahun pertama. Anda cukup fokus pada bisnis, urusan teknis kami yang tangani.'
  }
];

// ==========================================
// 2. REUSABLE MICRO-COMPONENTS
// ==========================================

// Animasi Fade-In saat scroll
const FadeInSection = ({ children, delay = "delay-0" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${delay}`}
    >
      {children}
    </div>
  );
};

const SectionHeading = ({ title, subtitle, highlight }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    {highlight && <h2 className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-3">{highlight}</h2>}
    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{title}</h3>
    <p className="text-lg text-slate-600">{subtitle}</p>
  </div>
);

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showWaBubble, setShowWaBubble] = useState(false);

  // Optimized Scroll Listener (Throttled with requestAnimationFrame)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Timer for smart WA bubble
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaBubble(true);
    }, 5000); // Muncul setelah 5 detik
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth">

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer z-50">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Elevate<span className="text-indigo-600">.</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-600">
              <a href="#pendekatan" className="hover:text-slate-900 transition-colors p-2">Pendekatan</a>
              <a href="#fitur" className="hover:text-slate-900 transition-colors p-2">Layanan</a>
              <a href="#portfolio" className="hover:text-slate-900 transition-colors p-2">Karya</a>
              <a href="#harga" className="hover:text-slate-900 transition-colors p-2">Investasi</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a href={WA_LINK_GENERAL} target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-slate-900/20">
                Mulai Projek
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden z-50 p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out pt-24 px-6 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col space-y-4 text-lg font-medium text-slate-800">
            <a href="#pendekatan" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-50 rounded-xl">Pendekatan</a>
            <a href="#fitur" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-50 rounded-xl">Layanan</a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-50 rounded-xl">Karya</a>
            <a href="#harga" onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-50 rounded-xl">Investasi</a>
            <div className="pt-6 border-t border-slate-100">
              <a href={WA_LINK_GENERAL} target="_blank" rel="noreferrer" className="flex justify-center items-center w-full bg-slate-900 text-white py-4 rounded-xl font-medium">
                Konsultasi Sekarang
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
        {/* Subtle Grid Pattern Background (Premium Feel) */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-indigo-50/50 via-transparent to-white pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Tersedia untuk 2 slot klien bulan ini
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Desain Premium. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-800 to-indigo-600">
                  Konversi Maksimal.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Bukan sekadar website biasa. Kami merancang landing page eksklusif yang meyakinkan calon pelanggan Anda dan melipatgandakan penjualan sejak detik pertama.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={WA_LINK_GENERAL} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium text-lg transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group">
                  Konsultasi Gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-full font-medium text-lg transition-all flex items-center justify-center gap-2">
                  Lihat Portfolio
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Trusted By Section (Social Proof Above the Fold) */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Dipercaya oleh brand yang terus bertumbuh
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><Building2 className="w-6 h-6" /> TechCorp</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><Store className="w-6 h-6" /> RetailHub</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><Briefcase className="w-6 h-6" /> FinServe</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-700"><Coffee className="w-6 h-6" /> DailyBrew</div>
          </div>
        </div>
      </section>

      {/* Problem Perspective Section */}
      <section id="pendekatan" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/20 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Banyak traffic dari iklan, tapi sedikit yang membeli?</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Masalahnya bukan pada produk Anda. Pengunjung hanya butuh waktu 3 detik untuk menilai kredibilitas bisnis Anda. Desain website yang murah, copy yang membingungkan, dan loading lambat adalah pembunuh konversi terbesar.
              </p>
              <div className="flex items-center gap-4 text-indigo-300 font-medium">
                <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
                Saatnya beralih ke desain berbasis data.
              </div>
            </FadeInSection>

            <div className="grid sm:grid-cols-2 gap-6">
              <FadeInSection delay="delay-100">
                <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm shadow-xl h-full">
                  <Shield className="w-10 h-10 text-indigo-400 mb-6" />
                  <h4 className="text-xl font-bold mb-3">Kredibilitas Instan</h4>
                  <p className="text-slate-400 leading-relaxed">Desain premium membuat bisnis Anda terlihat seperti market leader di mata pelanggan. Meningkatkan trust secara instan.</p>
                </div>
              </FadeInSection>
              <FadeInSection delay="delay-200">
                <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm shadow-xl sm:translate-y-8 h-full">
                  <Target className="w-10 h-10 text-indigo-400 mb-6" />
                  <h4 className="text-xl font-bold mb-3">Penawaran Irresistible</h4>
                  <p className="text-slate-400 leading-relaxed">Copywriting yang disusun secara psikologis untuk membuat penawaran Anda sulit ditolak oleh prospek.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading
              highlight="Cara Kerja Kami"
              title="Proses sederhana untuk hasil luar biasa"
              subtitle="Kami menangani semua kerumitan teknis, sehingga Anda bisa fokus mengurus bisnis."
            />
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 z-0"></div>
            {PROCESS_DATA.map((item, i) => (
              <FadeInSection key={i} delay={`delay-${i * 100}`}>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-full border-8 border-slate-50 flex items-center justify-center shadow-lg shadow-slate-200/50 mb-6 transition-transform hover:scale-110 duration-300">
                    <span className="text-2xl font-bold text-indigo-600">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed max-w-sm">{item.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Semua yang Anda butuhkan untuk mendominasi pasar</h2>
              <p className="text-lg text-slate-600">Kami tidak menggunakan template murahan. Setiap detail dioptimasi dengan tangan ahlinya untuk memastikan bisnis Anda tampil sempurna.</p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES_DATA.map((feature, i) => (
              <FadeInSection key={i} delay={`delay-${i * 100}`}>
                <div className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-300 group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Karya Kami</h2>
                <p className="text-lg text-slate-600">Melihat langsung bagaimana kami mengubah identitas digital brand dari yang biasa menjadi berkelas.</p>
              </div>
              <a href={WA_LINK_GENERAL} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all shrink-0 p-2">
                Lihat Lebih Banyak <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.map((item, i) => (
              <FadeInSection key={i} delay={`delay-${i * 100}`}>
                <div className="group relative rounded-3xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  {/* Aspect Ratio Fixed */}
                  <div className="aspect-[4/3] w-full">
                    <img
                      src={item.image}
                      alt={`Portfolio ${item.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold tracking-wider text-indigo-400 uppercase">{item.category}</p>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> {item.metric}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading
              title="Investasi yang Menguntungkan"
              subtitle="Pilih paket yang paling sesuai dengan target pertumbuhan bisnis Anda. Harga transparan, hasil eksponensial."
            />
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">

            {/* Essential Package */}
            <FadeInSection>
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm transition-all hover:shadow-xl relative z-0">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Essential</h3>
                  <p className="text-slate-500 text-sm">Sempurna untuk validasi ide & UMKM berkembang.</p>
                </div>
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-slate-500">Mulai dari</span>
                  <span className="text-4xl font-extrabold text-slate-900">Rp 1.499<span className="text-2xl text-slate-500 font-medium">.000</span></span>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    '1 Halaman Landing Page (Single Page)',
                    'Desain High-Converting',
                    'Penulisan Copywriting Dasar',
                    'Integrasi Tombol WhatsApp',
                    'Gratis Domain & Hosting 1 Tahun',
                    '2x Kesempatan Revisi Desain'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href={WA_LINK_GENERAL} target="_blank" rel="noreferrer" className="block text-center w-full py-4 rounded-xl font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Pilih Essential
                </a>
              </div>
            </FadeInSection>

            {/* Growth Package (Most Popular) - Scaled Up for emphasis */}
            <FadeInSection delay="delay-100">
              <div className="bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-900/30 text-white relative transform md:scale-105 z-10 border border-slate-800">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg whitespace-nowrap">
                  🔥 Paling Direkomendasikan
                </div>
                <div className="mb-8 mt-2">
                  <h3 className="text-2xl font-bold text-white mb-2">Growth Partner</h3>
                  <p className="text-slate-400 text-sm">Untuk bisnis yang siap scale-up dengan iklan berbayar.</p>
                </div>
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-slate-400">Mulai dari</span>
                  <span className="text-4xl font-extrabold text-white">Rp 3.499<span className="text-2xl text-slate-400 font-medium">.000</span></span>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    'Desain Custom Eksklusif (Hingga 5 Bagian)',
                    'Advanced Persuasive Copywriting',
                    'Setup Meta Pixel & Google Analytics',
                    'Optimasi Kecepatan Ekstrem',
                    'Akses Dashboard CMS Pribadi',
                    'Gratis Domain (.com) & Cloud Hosting',
                    'Revisi Unlimited (Sesuai Konsep Awal)',
                    'Prioritas Support via WhatsApp'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href={WA_LINK_GROWTH} target="_blank" rel="noreferrer" className="block text-center w-full py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold transition-colors shadow-lg shadow-white/10">
                  Pilih Growth Partner
                </a>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan Umum</h2>
            </div>
          </FadeInSection>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <FadeInSection key={i} delay={`delay-${i * 50}`}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className={`font-semibold text-lg transition-colors ${openFaq === i ? 'text-indigo-600' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                      {faq.question}
                    </span>
                    <div className={`ml-4 shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'border-indigo-600 bg-indigo-50 text-indigo-600 rotate-180' : 'border-slate-200 text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
                    <p className="p-6 text-slate-600 leading-relaxed bg-slate-50/50">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900 rounded-b-none lg:rounded-b-[4rem] mx-0 lg:mx-4 lg:mb-4 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Berhenti Membuang Uang Iklan ke Website yang Tidak Mengonversi.
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Mari jadwalkan sesi konsultasi gratis. Kami akan membedah strategi Anda dan menunjukkan bagaimana landing page kami dapat melipatgandakan profit Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={WA_LINK_GENERAL} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold text-lg transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2">
                Mulai Diskusi Projek
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> Respon cepat dalam 15 menit. Tidak ada komitmen awal.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <Layout className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">Elevate<span className="text-indigo-600">.</span></span>
            </div>
            <div className="flex flex-wrap justify-center space-x-6 text-sm font-medium">
              <a href="#" className="hover:text-slate-900 transition-colors p-2">Instagram</a>
              <a href="#" className="hover:text-slate-900 transition-colors p-2">LinkedIn</a>
              <a href="#" className="hover:text-slate-900 transition-colors p-2">Syarat & Ketentuan</a>
            </div>
            <p className="text-sm p-2 text-center">
              © {new Date().getFullYear()} Elevate Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Interactive Smart Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">

        {/* Chat Bubble (Appears after delay) */}
        <div className={`bg-white p-4 rounded-2xl rounded-br-sm shadow-2xl border border-slate-100 transition-all duration-500 transform origin-bottom-right pointer-events-auto max-w-[240px] ${showWaBubble ? 'scale-100 opacity-100' : 'scale-0 opacity-0 hidden'}`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-900">Elevate Studio</span>
            <button onClick={() => setShowWaBubble(false)} className="text-slate-400 hover:text-slate-600">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-snug">
            Halo! Ada yang bisa kami bantu untuk peningkatan website Anda? 👋
          </p>
        </div>

        {/* Floating Button */}
        <a
          href={WA_LINK_GENERAL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 pointer-events-auto"
          aria-label="Hubungi via WhatsApp"
        >
          <span className="bg-slate-900 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 hidden md:block">
            Konsultasi via WA
          </span>
          <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all duration-300 relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            <MessageCircle className="w-7 h-7 relative z-10" />
          </div>
        </a>
      </div>

    </div>
  );
};

export default LandingPage;