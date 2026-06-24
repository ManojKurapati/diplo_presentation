import React, { useState, useEffect } from 'react';
import { Network, ArrowRight, Rss, Laptop, FileText, Database, Languages, RefreshCw, Cpu } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface IngestItem {
  id: number;
  source: string;
  type: 'RSS' | 'API' | 'PDF' | 'WEB' | 'SCAN';
  status: 'PENDING' | 'OCR' | 'TRANSLATION' | 'INDEXED';
  title: string;
  size: string;
}

export const Slide4Acquisition: React.FC<SlideProps> = ({ active }) => {
  const [pipeline, setPipeline] = useState<IngestItem[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [ingestedCount, setIngestedCount] = useState<number>(14290);
  const [speedMs, setSpeedMs] = useState<number>(3000);

  const mockDocs = [
    { source: 'Reuters RSS', type: 'RSS', title: 'South China Sea bilateral talks draft summary', size: '12 KB' },
    { source: 'UN Treaty API', type: 'API', title: 'Article 12 Amendment: Paris Agreement', size: '142 KB' },
    { source: 'WTO Gateway', type: 'PDF', title: 'Tariff Schedule Schedule-IV Update', size: '2.4 MB' },
    { source: 'Al Jazeera Feed', type: 'RSS', title: 'Diplomats meet in Geneva over climate pacts', size: '8 KB' },
    { source: 'EU Gazette website', type: 'WEB', title: 'Digital Single Market Privacy protocols', size: '94 KB' },
    { source: 'Gov Scanner Port', type: 'SCAN', title: 'Signed Bilateral Security Treaty (Scanned PDF)', size: '15.4 MB' },
  ];

  // Pipeline simulation tick
  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      // Trigger a random ingest item
      const template = mockDocs[Math.floor(Math.random() * mockDocs.length)];
      
      const newDoc: IngestItem = {
        id: Date.now(),
        source: template.source,
        type: template.type as any,
        status: 'PENDING',
        title: template.title,
        size: template.size,
      };

      setPipeline((prev) => [newDoc, ...prev.slice(0, 4)]);
      setIngestedCount((c) => c + 1);

      // Cascade statuses down the pipeline
      setTimeout(() => {
        setPipeline((prev) => 
          prev.map((item) => item.id === newDoc.id ? { ...item, status: 'OCR' } : item)
        );
      }, 1000);

      setTimeout(() => {
        setPipeline((prev) => 
          prev.map((item) => item.id === newDoc.id ? { ...item, status: 'TRANSLATION' } : item)
        );
      }, 2000);

      setTimeout(() => {
        setPipeline((prev) => 
          prev.map((item) => item.id === newDoc.id ? { ...item, status: 'INDEXED' } : item)
        );
      }, 3000);

    }, speedMs);

    return () => clearInterval(interval);
  }, [active, speedMs]);

  const triggerManualIngest = () => {
    const template = mockDocs[Math.floor(Math.random() * mockDocs.length)];
    const newDoc: IngestItem = {
      id: Date.now(),
      source: template.source,
      type: template.type as any,
      status: 'PENDING',
      title: `${template.title} [User Triggered]`,
      size: template.size,
    };
    setPipeline((prev) => [newDoc, ...prev.slice(0, 4)]);
    setIngestedCount((c) => c + 1);

    setTimeout(() => {
      setPipeline((prev) => prev.map((item) => item.id === newDoc.id ? { ...item, status: 'OCR' } : item));
    }, 800);
    setTimeout(() => {
      setPipeline((prev) => prev.map((item) => item.id === newDoc.id ? { ...item, status: 'TRANSLATION' } : item));
    }, 1600);
    setTimeout(() => {
      setPipeline((prev) => prev.map((item) => item.id === newDoc.id ? { ...item, status: 'INDEXED' } : item));
    }, 2400);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OCR': return '#f59e0b';
      case 'TRANSLATION': return '#8b5cf6';
      case 'INDEXED': return '#10b981';
      default: return '#3b82f6';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Network size={14} style={{ marginRight: '0.4rem' }} /> Ingestion Pipeline
        </div>
        <h2 className="slide-title">Knowledge Acquisition <span>Agents</span></h2>
        <p className="slide-subtitle">How specialized agents continuously monitor, ingest, clean, and map global materials</p>
      </div>

      {/* Content Layout */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left column: Sources mapping */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          
          <div className="glass-card" style={{ padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', fontFamily: 'var(--display-font)', color: 'var(--text-primary)' }}>
              1. Observed Channels
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { name: 'Global News Agencies', channels: 'Reuters, Al Jazeera, Associated Press', type: 'RSS', icon: <Rss size={16} /> },
                { name: 'Multilateral Portals', channels: 'United Nations, WTO Gateway, World Bank', type: 'API', icon: <Laptop size={16} /> },
                { name: 'Sovereign Archives', channels: 'Bilateral Treaty Repositories, Gazette publications', type: 'PDF', icon: <FileText size={16} /> }
              ].map((src, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.01)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'var(--btn-bg)', color: 'var(--accent)' }}>
                    {src.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{src.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{src.channels}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive controls */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button 
              className="nav-btn" 
              onClick={triggerManualIngest} 
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <RefreshCw size={16} className="animate-spin-slow" /> Trigger Ingestion Test
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Memory Bank:</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--display-font)', color: 'var(--accent)' }}>
                {ingestedCount.toLocaleString()} Documents
              </div>
            </div>
          </div>

        </div>

        {/* Right column: Dynamic Pipeline Stream visual */}
        <div className="glass-card" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between', border: '2px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--display-font)', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
            2. Real-Time Processing Console
          </h3>

          {/* Pipeline flow steps graphic */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
            {[
              { label: 'Crawl', icon: <Network size={16} /> },
              { label: 'OCR Extraction', icon: <Cpu size={16} /> },
              { label: 'Translation', icon: <Languages size={16} /> },
              { label: 'Graph Ingest', icon: <Database size={16} /> }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', background: 'var(--btn-bg)', border: '1px solid var(--card-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)'
                  }}>
                    {step.icon}
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{step.label}</span>
                </div>
                {idx < 3 && <ArrowRight size={14} style={{ color: 'var(--card-border)', marginTop: '-15px' }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Ingestion stream logs */}
          <div 
            className="dark-terminal"
            style={{ 
              borderRadius: '12px', 
              padding: '1rem', 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.6rem',
              overflowY: 'hidden',
              maxHeight: '230px',
            }}
          >
            {pipeline.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Waiting for incoming streams...
              </div>
            ) : (
              pipeline.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.8rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderLeft: `3px solid ${getStatusColor(item.status)}`,
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    animation: 'slideEnterRight 0.3s forwards',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      Source: {item.source} ({item.size})
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px',
                    backgroundColor: `${getStatusColor(item.status)}20`, color: getStatusColor(item.status),
                    border: `1px solid ${getStatusColor(item.status)}40`
                  }}>
                    {item.status}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Auto-poll intervals: 3 seconds</span>
            <span style={{ color: 'var(--success)' }}>● System Online</span>
          </div>

        </div>

      </div>
    </div>
  );
};
