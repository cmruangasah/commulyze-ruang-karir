import React, { useState } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Users, Filter, BarChart2, Activity, Zap, FileText, Lightbulb, Target, ArrowRight, Globe } from 'lucide-react';
import communityData from './data.json';
import './index.css';

const i18n = {
  en: {
    tabExec: "Executive Report",
    tabMatrix: "Overlap Matrix",
    tabEngage: "Engagement Tiers",
    headerTitle: "Community Health & Engagement Report",
    headerDesc: "Strategic insights for stakeholders and community managers.",
    cutoff: "Data Cutoff: July 18, 2026, 15:00 WIB",
    kpiTotal: "Total Community Base",
    kpiActive: "Active in Sub-groups",
    kpiPassive: "Passive (Announcement Only)",
    
    // Overview
    keyInsights: "Key Insights",
    keyInsightsDesc: "What the data is telling us.",
    insight1Title: "Absolute Centralization",
    insight1Desc: "100% of active sub-group members are successfully centralized within the main Announcement group. No stray members detected outside the core ecosystem.",
    insight2Title: "High Niche Overlap",
    insight2Desc: "Strong cross-pollination detected between career-focused groups. Members in one tend to join the others, indicating a highly specific, unified intent.",
    insight3Title: "The Silent Majority",
    insight3Desc: "of the community act as passive listeners, consuming announcements without joining specialized sub-groups.",
    
    actionsTitle: "Actionable Items",
    actionsDesc: "Strategic recommendations to execute.",
    action1Title: "Merge Redundant Groups",
    action1Desc: "Consolidate groups with >80% overlap into a single 'Career Center' group to reduce moderation overhead and centralize discussions.",
    action2Title: "Monetize the Highly Engaged",
    action2Desc: "Extract the contacts of members in 4+ groups and target them as early adopters/beta testers for premium programs like Ruang Karir or Bootcamp.",
    action3Title: "Activate Passive Listeners",
    action3Desc: "Broadcast a targeted campaign strictly in the Announcement group to re-engage passive members with a low-barrier lead magnet or survey.",
    
    chartSizeTitle: "Group Size Distribution",
    chartSizeDesc: "Audience volume across all active sub-groups.",

    // Matrix
    matrixTitle: "Cross-Pollination Matrix",
    matrixDesc: 'Identify group redundancies. Read as: "X% of members in [Row] are also in [Column]".',
    legendMerge: "> 90% (Merge Candidate)",
    legendHigh: "60% - 90%",
    legendMed: "30% - 60%",
    legendLow: "< 30% (Distinct)",
    
    matrixInsights: "Matrix Insights",
    mInsight1Title: "High Redundancy Zones",
    mInsight1Desc: "Notice the dark red cells? This means almost everyone in Group A is already in Group B. Broadcasting the same message to both is practically spamming the same people twice.",
    mInsight2Title: "Isolated Niches",
    mInsight2Desc: "Blue/Trace cells indicate highly distinct audiences with entirely different core interests.",
    
    mAction1Title: "Execute Group Mergers",
    mAction1Desc: "Immediately combine groups that show >85% cross-pollination to streamline moderation and prevent audience fatigue.",
    mAction2Title: "Content Personalization",
    mAction2Desc: "Stop cross-posting general announcements to isolated niches. Keep 'Learn English' strictly for language content to maintain their engagement.",

    // Engagement
    engageTitle: "Audience Engagement Loyalty",
    engageDesc: "Distribution of members based on how many sub-groups they actively participate in.",
    
    eInsights: "Engagement Insights",
    eInsight1Title: "Top-Heavy vs Broad Appeal",
    eInsight1Desc: "The distribution shape instantly shows if community health relies on a few 'Super Members' (long tail at the bottom) or a broad base of casual users (heavy at the top).",
    eInsight2Title: "Loyalty Tiers",
    eInsight2Desc: "Members actively joining 3+ groups are your true brand advocates, showing significantly higher commitment than 1-group members.",
    
    eAction1Title: "VIP Nurturing",
    eAction1Desc: "Export the list of members in 4+ groups and invite them to an exclusive inner circle, advisory board, or give them early access to premium products.",
    eAction2Title: "Upsell the Casuals",
    eAction2Desc: "Create cross-promotion content specifically aimed at members in only 1 group to encourage them to explore at least one other relevant sub-group.",
  },
  id: {
    tabExec: "Laporan Eksekutif",
    tabMatrix: "Matriks Overlap",
    tabEngage: "Tingkat Engagement",
    headerTitle: "Laporan Kesehatan & Interaksi Komunitas",
    headerDesc: "Wawasan strategis untuk para founder dan manajer komunitas.",
    cutoff: "Data Cutoff: 18 Juli 2026, 15:00 WIB",
    kpiTotal: "Total Basis Komunitas",
    kpiActive: "Aktif di Sub-grup",
    kpiPassive: "Pasif (Hanya Pengumuman)",
    
    // Overview
    keyInsights: "Wawasan Utama",
    keyInsightsDesc: "Apa arti dari data ini.",
    insight1Title: "Sentralisasi Mutlak",
    insight1Desc: "100% member sub-grup aktif berhasil disentralisasi ke dalam grup utama Announcement. Tidak ada member nyasar di luar ekosistem utama.",
    insight2Title: "Irisan Niche yang Tinggi",
    insight2Desc: "Keterkaitan silang yang sangat kuat ditemukan di antara grup-grup seputar karir. Member di satu grup cenderung bergabung ke grup lain, menunjukkan niat yang sama.",
    insight3Title: "Mayoritas Pasif",
    insight3Desc: "dari komunitas bertindak sebagai pendengar pasif, hanya mengonsumsi pengumuman tanpa bergabung dengan sub-grup spesifik.",
    
    actionsTitle: "Rekomendasi Aksi",
    actionsDesc: "Rekomendasi strategis untuk segera dieksekusi.",
    action1Title: "Gabungkan Grup Redundan",
    action1Desc: "Satukan grup dengan tingkat kesamaan >80% menjadi satu 'Pusat Karir' untuk mengurangi beban moderasi dan memusatkan diskusi.",
    action2Title: "Monetisasi Member Aktif",
    action2Desc: "Ambil kontak dari member yang ikut 4+ grup dan jadikan mereka target pengguna awal (beta tester) untuk program berbayar seperti Ruang Karir atau Bootcamp.",
    action3Title: "Aktivasi Pendengar Pasif",
    action3Desc: "Buat kampanye khusus (broadcast) di grup Announcement untuk memancing interaksi member pasif menggunakan umpan gratis (lead magnet) atau survei.",
    
    chartSizeTitle: "Distribusi Ukuran Grup",
    chartSizeDesc: "Volume audiens di seluruh sub-grup aktif.",

    // Matrix
    matrixTitle: "Matriks Keterkaitan (Cross-Pollination)",
    matrixDesc: 'Mendeteksi redundansi grup. Cara baca: "X% dari member di [Baris] juga berada di [Kolom]".',
    legendMerge: "> 90% (Kandidat Gabung)",
    legendHigh: "60% - 90%",
    legendMed: "30% - 60%",
    legendLow: "< 30% (Berbeda)",
    
    matrixInsights: "Wawasan Matriks",
    mInsight1Title: "Zona Redundansi Tinggi",
    mInsight1Desc: "Melihat kotak berwarna merah tua? Itu artinya hampir semua orang di Grup A juga ada di Grup B. Mengirim pesan yang sama ke keduanya sama saja dengan spamming.",
    mInsight2Title: "Niche yang Terisolasi",
    mInsight2Desc: "Kotak biru menandakan audiens yang sangat berbeda dengan minat utama yang tidak saling berkaitan.",
    
    mAction1Title: "Eksekusi Penggabungan Grup",
    mAction1Desc: "Segera gabungkan grup yang menunjukkan kesamaan >85% untuk merampingkan moderasi dan mencegah kebosanan audiens.",
    mAction2Title: "Personalisasi Konten",
    mAction2Desc: "Hentikan pengiriman pengumuman umum ke grup yang terisolasi. Jaga agar grup seperti 'Learn English' tetap fokus pada konten bahasa Inggris saja.",

    // Engagement
    engageTitle: "Tingkat Loyalitas & Interaksi Audiens",
    engageDesc: "Distribusi member berdasarkan seberapa banyak sub-grup yang mereka ikuti secara aktif.",
    
    eInsights: "Wawasan Engagement",
    eInsight1Title: "Top-Heavy vs Basis Luas",
    eInsight1Desc: "Bentuk grafik ini langsung menunjukkan apakah komunitas Anda ditopang oleh segelintir 'Super Member' atau memiliki basis pengguna kasual yang sangat luas.",
    eInsight2Title: "Tingkatan Loyalitas",
    eInsight2Desc: "Member yang bergabung di 3+ grup adalah pendukung merek (brand advocates) sejati Anda, menunjukkan komitmen yang jauh lebih tinggi daripada member 1 grup.",
    
    eAction1Title: "Pembinaan VIP",
    eAction1Desc: "Ekspor daftar kontak member di 4+ grup dan undang mereka ke grup khusus (inner circle) atau berikan akses lebih awal ke produk premium.",
    eAction2Title: "Upsell ke Pengguna Kasual",
    eAction2Desc: "Buat promosi silang khusus yang ditujukan bagi member yang hanya ikut 1 grup agar mereka terdorong untuk mencoba bergabung ke sub-grup relevan lainnya.",
  }
};

const CustomXAxisTick = ({ x, y, payload }) => {
  const words = payload.value.split(' ');
  const lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    if ((currentLine + word).length > 16 && currentLine !== '') {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine) lines.push(currentLine.trim());

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="middle" fill="var(--text-muted)" fontSize={11}>
        {lines.map((line, index) => (
          <tspan x={0} y={16 + (index * 14)} key={index}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState('en');
  
  const t = i18n[lang];

  const chartData = [...communityData.groups]
    .sort((a, b) => b.size - a.size)
    .filter(g => g.name !== 'Announcement');

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#14b8a6', '#0ea5e9'];

  const getHeatmapColor = (percentage) => {
    if (percentage >= 90) return 'var(--matrix-high)';
    if (percentage >= 60) return 'var(--matrix-med)';
    if (percentage >= 30) return 'var(--matrix-low)';
    if (percentage > 0) return 'var(--matrix-trace)';
    return 'var(--bg-card-hover)';
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar / Navigation */}
      <nav className="sidebar">
        <div className="logo">
          <Activity size={24} color="var(--primary)" />
          <h2>CommuLyze</h2>
        </div>
        <div className="nav-items">
          <button 
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FileText size={18} /> {t.tabExec}
          </button>
          <button 
            className={`nav-btn ${activeTab === 'matrix' ? 'active' : ''}`}
            onClick={() => setActiveTab('matrix')}
          >
            <Filter size={18} /> {t.tabMatrix}
          </button>
          <button 
            className={`nav-btn ${activeTab === 'engagement' ? 'active' : ''}`}
            onClick={() => setActiveTab('engagement')}
          >
            <Zap size={18} /> {t.tabEngage}
          </button>
        </div>
        
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <div className="header-text">
            <h1>{t.headerTitle}</h1>
            <p>{t.headerDesc}</p>
            <p className="cutoff-text">{t.cutoff}</p>
          </div>
          
          {/* Language Switcher */}
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              <Globe size={14} /> EN
            </button>
            <button 
              className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => setLang('id')}
            >
              <Globe size={14} /> ID
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="kpi-grid">
          <div className="kpi-card glass">
            <div className="kpi-icon"><Users size={24} /></div>
            <div className="kpi-data">
              <h3>{communityData.announcementMembers.toLocaleString()}</h3>
              <p>{t.kpiTotal}</p>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon purple"><Activity size={24} /></div>
            <div className="kpi-data">
              <h3>{communityData.activeInSubgroups.toLocaleString()}</h3>
              <p>{t.kpiActive}</p>
            </div>
          </div>
          <div className="kpi-card glass">
            <div className="kpi-icon blue"><Zap size={24} /></div>
            <div className="kpi-data">
              <h3>{communityData.passiveListeners.toLocaleString()}</h3>
              <p>{t.kpiPassive}</p>
            </div>
          </div>
        </section>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <div className="insights-grid">
              
              <section className="summary-section glass" style={{ marginBottom: 0, borderLeft: '4px solid var(--primary)' }}>
                <div className="section-header">
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lightbulb size={20} color="var(--primary)" /> {t.keyInsights}
                  </h2>
                  <p>{t.keyInsightsDesc}</p>
                </div>
                <ul className="insights-list">
                  <li>
                    <ArrowRight size={16} className="insight-icon" />
                    <div className="insight-content">
                      <strong>{t.insight1Title}</strong>
                      <p>{t.insight1Desc}</p>
                    </div>
                  </li>
                  <li>
                    <ArrowRight size={16} className="insight-icon" />
                    <div className="insight-content">
                      <strong>{t.insight2Title}</strong>
                      <p>{t.insight2Desc}</p>
                    </div>
                  </li>
                  <li>
                    <ArrowRight size={16} className="insight-icon" />
                    <div className="insight-content">
                      <strong>{t.insight3Title}</strong>
                      <p><strong>{Math.round((communityData.passiveListeners / communityData.announcementMembers) * 100)}%</strong> {t.insight3Desc}</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="summary-section glass" style={{ marginBottom: 0, borderLeft: '4px solid #10b981' }}>
                <div className="section-header">
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={20} color="#10b981" /> {t.actionsTitle}
                  </h2>
                  <p>{t.actionsDesc}</p>
                </div>
                <ul className="insights-list">
                  <li>
                    <div className="insight-icon" style={{ color: '#10b981' }}>1</div>
                    <div className="insight-content">
                      <strong>{t.action1Title}</strong>
                      <p>{t.action1Desc}</p>
                    </div>
                  </li>
                  <li>
                    <div className="insight-icon" style={{ color: '#10b981' }}>2</div>
                    <div className="insight-content">
                      <strong>{t.action2Title}</strong>
                      <p>{t.action2Desc}</p>
                    </div>
                  </li>
                  <li>
                    <div className="insight-icon" style={{ color: '#10b981' }}>3</div>
                    <div className="insight-content">
                      <strong>{t.action3Title}</strong>
                      <p>{t.action3Desc}</p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            <section className="chart-section glass mt-4">
              <div className="section-header">
                <h2>{t.chartSizeTitle}</h2>
                <p>{t.chartSizeDesc}</p>
              </div>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--text-muted)" 
                      interval={0}
                      height={80}
                      tick={{ angle: -45, textAnchor: 'end', fontSize: 11, dy: 10, dx: -5 }}
                    />
                    <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                    <Tooltip 
                      cursor={{ fill: 'var(--bg-card-hover)' }}
                      contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                      itemStyle={{ color: 'var(--text)' }}
                    />
                    <Bar dataKey="size" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="var(--primary)" className="bar-hover" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        )}

        {/* Tab: Matrix */}
        {activeTab === 'matrix' && (
          <div className="animate-fade-in">
            <section className="matrix-section glass">
              <div className="section-header">
                <h2>{t.matrixTitle}</h2>
                <p>{t.matrixDesc}</p>
              </div>
              
              <div className="matrix-wrapper scrollbar-hide">
                <table className="overlap-matrix">
                  <thead>
                    <tr>
                      <th>Group</th>
                      {communityData.groups.map(g => (
                        <th key={g.name} className="vertical-header">
                          <span>{g.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {communityData.overlapMatrix.map(row => (
                      <tr key={row.group}>
                        <td className="row-header">{row.group}</td>
                        {communityData.groups.map(col => {
                          const cellData = row.overlaps[col.name];
                          const isSelf = row.group === col.name;
                          return (
                            <td 
                              key={col.name} 
                              style={{ 
                                backgroundColor: isSelf ? 'transparent' : getHeatmapColor(cellData.percentage) 
                              }}
                              className={isSelf ? 'diagonal' : 'data-cell'}
                              title={`${cellData.count} members (${cellData.percentage}%)`}
                            >
                              {!isSelf && (
                                <span className="percentage">{cellData.percentage}%</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="legend">
                <div className="legend-item"><span className="swatch" style={{ background: 'var(--matrix-high)' }}></span> {t.legendMerge}</div>
                <div className="legend-item"><span className="swatch" style={{ background: 'var(--matrix-med)' }}></span> {t.legendHigh}</div>
                <div className="legend-item"><span className="swatch" style={{ background: 'var(--matrix-low)' }}></span> {t.legendMed}</div>
                <div className="legend-item"><span className="swatch" style={{ background: 'var(--matrix-trace)' }}></span> {t.legendLow}</div>
              </div>
            </section>

            <div className="insights-grid">
              <section className="summary-section glass" style={{ marginBottom: 0, borderLeft: '4px solid var(--primary)' }}>
                <div className="section-header">
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lightbulb size={20} color="var(--primary)" /> {t.matrixInsights}
                  </h2>
                </div>
                <ul className="insights-list">
                  <li>
                    <ArrowRight size={16} className="insight-icon" />
                    <div className="insight-content">
                      <strong>{t.mInsight1Title}</strong>
                      <p>{t.mInsight1Desc}</p>
                    </div>
                  </li>
                  <li>
                    <ArrowRight size={16} className="insight-icon" />
                    <div className="insight-content">
                      <strong>{t.mInsight2Title}</strong>
                      <p>{t.mInsight2Desc}</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="summary-section glass" style={{ marginBottom: 0, borderLeft: '4px solid #10b981' }}>
                <div className="section-header">
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={20} color="#10b981" /> {t.actionsTitle}
                  </h2>
                </div>
                <ul className="insights-list">
                  <li>
                    <div className="insight-icon" style={{ color: '#10b981' }}>1</div>
                    <div className="insight-content">
                      <strong>{t.mAction1Title}</strong>
                      <p>{t.mAction1Desc}</p>
                    </div>
                  </li>
                  <li>
                    <div className="insight-icon" style={{ color: '#10b981' }}>2</div>
                    <div className="insight-content">
                      <strong>{t.mAction2Title}</strong>
                      <p>{t.mAction2Desc}</p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        )}

        {/* Tab: Engagement */}
        {activeTab === 'engagement' && (
          <div className="animate-fade-in">
            <section className="super-section glass">
              <div className="section-header">
                <h2>{t.engageTitle}</h2>
                <p>{t.engageDesc}</p>
              </div>
              
              <div className="chart-wrapper engage-chart-wrapper">
                
                <div className="engage-bar-chart">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={communityData.engagementDistribution} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                      <XAxis type="number" stroke="var(--text-muted)" />
                      <YAxis dataKey="label" type="category" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} width={80} />
                      <Tooltip 
                        cursor={{ fill: 'var(--bg-card-hover)' }}
                        contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                        itemStyle={{ color: 'var(--text)' }}
                        formatter={(value) => [`${value} Users`, 'Count']}
                      />
                      <Bar dataKey="userCount" radius={[0, 4, 4, 0]}>
                        {communityData.engagementDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="engage-pie-chart">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={communityData.engagementDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="userCount"
                        nameKey="label"
                      >
                        {communityData.engagementDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                        itemStyle={{ color: 'var(--text)' }}
                      />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <div className="insights-grid">
              <section className="summary-section glass" style={{ marginBottom: 0, borderLeft: '4px solid var(--primary)' }}>
                <div className="section-header">
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lightbulb size={20} color="var(--primary)" /> {t.eInsights}
                  </h2>
                </div>
                <ul className="insights-list">
                  <li>
                    <ArrowRight size={16} className="insight-icon" />
                    <div className="insight-content">
                      <strong>{t.eInsight1Title}</strong>
                      <p>{t.eInsight1Desc}</p>
                    </div>
                  </li>
                  <li>
                    <ArrowRight size={16} className="insight-icon" />
                    <div className="insight-content">
                      <strong>{t.eInsight2Title}</strong>
                      <p>{t.eInsight2Desc}</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="summary-section glass" style={{ marginBottom: 0, borderLeft: '4px solid #10b981' }}>
                <div className="section-header">
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Target size={20} color="#10b981" /> {t.actionsTitle}
                  </h2>
                </div>
                <ul className="insights-list">
                  <li>
                    <div className="insight-icon" style={{ color: '#10b981' }}>1</div>
                    <div className="insight-content">
                      <strong>{t.eAction1Title}</strong>
                      <p>{t.eAction1Desc}</p>
                    </div>
                  </li>
                  <li>
                    <div className="insight-icon" style={{ color: '#10b981' }}>2</div>
                    <div className="insight-content">
                      <strong>{t.eAction2Title}</strong>
                      <p>{t.eAction2Desc}</p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
