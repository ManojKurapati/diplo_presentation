import React, { useState } from 'react';
import { Layers, Database, Code, ShieldCheck, Cpu, Terminal, ArrowDown, LayoutDashboard } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface StackLayer {
  id: string;
  name: string;
  sub: string;
  techs: string[];
  details: string;
  icon: React.ReactNode;
}

export const Slide11Architecture: React.FC<SlideProps> = ({ active }) => {
  const [selectedLayer, setSelectedLayer] = useState<string>('fabric');

  const layers: StackLayer[] = [
    {
      id: 'dash',
      name: 'User Interface & API Gateway',
      sub: 'Dashboard + APIs',
      techs: ['React.js', 'WebSockets', 'GraphQL', 'OAuth2'],
      details: 'Secure web frontends and programmatic REST interfaces. Delivers real-time reasoning outputs, chat consoles, and notification updates to human diplomats.',
      icon: <LayoutDashboard size={18} />
    },
    {
      id: 'human',
      name: 'Human Approval Layer',
      sub: 'Traceability & Verification Gate',
      techs: ['GPG Cryptography', 'Verification ledger', 'Approval flows'],
      details: 'Strict veto system. Intercepts any proposed document edits or recommendations, requiring digital key signatures and audit validations before final commit.',
      icon: <ShieldCheck size={18} />
    },
    {
      id: 'agent',
      name: 'Multi-Agent Orchestration Stack',
      sub: 'LangGraph + Temporal orchestration',
      techs: ['LangGraph', 'Temporal.io', 'LlamaIndex', 'gRPC'],
      details: 'Reliable distributed state machines. LangGraph manages the agent communication loops, while Temporal guarantees transaction reliability and retry metrics.',
      icon: <Cpu size={18} />
    },
    {
      id: 'fabric',
      name: 'Knowledge Fabric Core',
      sub: 'Postgres + Vector DB + Graph DB',
      techs: ['PostgreSQL', 'pgvector', 'Neo4j / AGE', 'Redis cache'],
      details: 'Tri-layer database framework. PostgreSQL houses strict metadata, pgvector processes semantic clause similarities, and Neo4j tracks political alliances.',
      icon: <Database size={18} />
    },
    {
      id: 'clean',
      name: 'Data Preparation & Ingestion Engine',
      sub: 'OCR + Machine Translation',
      techs: ['Tesseract / OCR', 'HuggingFace', 'Apache Tika', 'Pandas'],
      details: 'Cleans, OCRs scanned PDFs, and performs machine translation. Segments texts into semantic node chunks with language detection tags.',
      icon: <Terminal size={18} />
    },
    {
      id: 'source',
      name: 'Global Raw Data Sources',
      sub: 'Reuters, UN, WTO, Government Feeds',
      techs: ['RSS Scrapers', 'Sovereign APIs', 'PDF Crawlers', 'Web scraping'],
      details: 'Continuous monitoring pipelines collecting material from multi-lingual news agencies, treaty repository databases, and gazette archives.',
      icon: <Layers size={18} />
    }
  ];

  const currentLayer = layers.find(l => l.id === selectedLayer) || layers[3];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Code size={14} style={{ marginRight: '0.4rem' }} /> Technical Architecture
        </div>
        <h2 className="slide-title">Agentic AI <span>Stack</span></h2>
        <p className="slide-subtitle">The software layers bridging geopolitical raw feeds with human approval protocols</p>
      </div>

      {/* Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left Side: Physical stack visual */}
        <div 
          className="glass-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.4rem',
            justifyContent: 'center', 
            padding: '1.5rem',
            background: 'rgba(10, 20, 36, 0.4)',
          }}
        >
          {layers.map((layer, idx) => {
            const isSelected = selectedLayer === layer.id;
            
            return (
              <div key={layer.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  onClick={() => setSelectedLayer(layer.id)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: isSelected ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: isSelected ? '#fff' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 4px 15px var(--accent-glow)' : 'none',
                    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  className="interactive-source-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ opacity: isSelected ? 1 : 0.6 }}>{layer.icon}</div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                      {layer.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', opacity: isSelected ? 0.9 : 0.5, fontStyle: 'italic' }}>
                    {layer.sub}
                  </span>
                </div>
                {idx < layers.length - 1 && (
                  <ArrowDown size={12} style={{ color: 'var(--card-border)', margin: '0.1rem 0', opacity: 0.5 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Stack Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
          
          {/* Expanded details container */}
          <div className="glass-card" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.05em' }}>
              Stack Layer Blueprint Inspector
            </span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.4rem', marginBottom: '1rem' }}>
              <div style={{ color: 'var(--accent)', background: 'var(--btn-bg)', padding: '0.5rem', borderRadius: '8px' }}>
                {currentLayer.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--display-font)' }}>
                {currentLayer.name}
              </h3>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {currentLayer.details}
            </p>

            {/* Subscribed technologies badges */}
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.6rem' }}>
                Core System Integrations:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {currentLayer.techs.map((tech, i) => (
                  <span 
                    key={i}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      fontFamily: 'var(--display-font)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '50px',
                      background: 'var(--btn-bg)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--accent)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Architecture Tagline */}
          <div className="glass-card" style={{ padding: '1.2rem 1.8rem', background: 'rgba(59, 130, 246, 0.03)', borderColor: 'rgba(59, 130, 246, 0.15)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              💡 <strong>Robust Transactions:</strong> By pairing LangGraph loop structures with Temporal.io workflow schedules, DIPLO.AI guarantees execution state even if power grids fail mid-negotiation.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
