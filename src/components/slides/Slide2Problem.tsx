import React, { useState, useEffect, useRef } from 'react';
import { Newspaper, FileText, Scale, Handshake, Globe, Landmark, AlertTriangle } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface FallingDoc {
  id: number;
  type: string;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  label: string;
}

export const Slide2Problem: React.FC<SlideProps> = ({ active }) => {
  const [streamSpeed, setStreamSpeed] = useState<number>(2.0); // 1 to 5 scale
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [bottleneckQueue, setBottleneckQueue] = useState<number>(5);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [docs, setDocs] = useState<FallingDoc[]>([]);

  const sources = [
    { type: 'NEWS', icon: <Newspaper size={16} />, label: 'News', emoji: '📰', color: '#3b82f6' },
    { type: 'TREATIES', icon: <FileText size={16} />, label: 'Treaties', emoji: '📜', color: '#d97706' },
    { type: 'LAWS', icon: <Scale size={16} />, label: 'Laws', emoji: '⚖', color: '#10b981' },
    { type: 'AGREEMENTS', icon: <Handshake size={16} />, label: 'Agreements', emoji: '🤝', color: '#8b5cf6' },
    { type: 'LANG', icon: <Globe size={16} />, label: 'Multilingual', emoji: '🌍', color: '#ec4899' },
    { type: 'GOV', icon: <Landmark size={16} />, label: 'Gov Pubs', emoji: '🏛', color: '#f59e0b' },
  ];

  // Document particle logic
  useEffect(() => {
    if (!active) return;

    let idCounter = 0;
    const interval = setInterval(() => {
      // Add a document based on density
      const count = Math.ceil(streamSpeed / 1.5);
      for (let i = 0; i < count; i++) {
        const randSource = sources[Math.floor(Math.random() * sources.length)];
        
        if (selectedFilter !== 'ALL' && randSource.type !== selectedFilter) continue;

        const newDoc: FallingDoc = {
          id: idCounter++,
          type: randSource.type,
          emoji: randSource.emoji,
          x: Math.random() * 85 + 5, // percentage
          y: -10, // top
          speed: Math.random() * 1.5 + 1.5 + streamSpeed * 0.4,
          label: randSource.label,
        };
        setDocs((prev) => [...prev, newDoc]);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [active, streamSpeed, selectedFilter]);

  // Frame tick to move documents down towards bottleneck
  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setDocs((prevDocs) => {
        const updated: FallingDoc[] = [];
        let hitBottleneckCount = 0;

        prevDocs.forEach((doc) => {
          let nextY = doc.y + doc.speed;

          // Bottleneck region is around y = 60%, x = 40% to 60%
          const inBottleneckX = doc.x > 38 && doc.x < 62;
          const nearBottleneckY = doc.y >= 52 && doc.y <= 65;

          if (nearBottleneckY && inBottleneckX) {
            // Document gets parsed/slowed down in bottleneck
            hitBottleneckCount++;
          } else if (doc.y > 90) {
            // Finished falling
          } else {
            // Normal falling, draw towards funnel if below 35%
            if (doc.y > 35) {
              const dx = 50 - doc.x;
              doc.x += dx * 0.08; // pull to center
            }
            updated.push({ ...doc, y: nextY });
          }
        });

        // Set queue size based on document density hitting the manual research block
        if (hitBottleneckCount > 0) {
          setBottleneckQueue((q) => Math.min(Math.max(q + 1, hitBottleneckCount * 1.2), 30));
        }

        return updated;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [active]);

  // Slowly drain the bottleneck queue (manual research processing)
  useEffect(() => {
    const drain = setInterval(() => {
      setBottleneckQueue((q) => (q > 0 ? q - 1 : 0));
    }, 1200);
    return () => clearInterval(drain);
  }, []);

  const currentLoadText = () => {
    if (streamSpeed < 2) return { text: 'Moderate', color: '#10b981' };
    if (streamSpeed < 4) return { text: 'Elevated & Fragile', color: '#f59e0b' };
    return { text: 'Critical Overload', color: '#ef4444' };
  };

  const getDelayTime = () => {
    // delay matches queue build-up
    return (2.5 + bottleneckQueue * 0.8).toFixed(1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <AlertTriangle size={14} style={{ marginRight: '0.4rem' }} /> Global Intelligence Pressure
        </div>
        <h2 className="slide-title">Diplomats Are <span>Overwhelmed</span></h2>
        <p className="slide-subtitle">The Information Explosion makes manual diplomatic research a dangerous vulnerability</p>
      </div>

      {/* Main Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left Side: Sources & Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          
          <div className="glass-card" style={{ padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', fontFamily: 'var(--display-font)', color: 'var(--text-primary)' }}>
              Sources of Friction
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {sources.map((src) => (
                <div 
                  key={src.type}
                  onClick={() => setSelectedFilter(selectedFilter === src.type ? 'ALL' : src.type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border)',
                    background: selectedFilter === src.type ? 'var(--btn-hover)' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="interactive-source-item"
                >
                  <span style={{ fontSize: '1.6rem' }}>{src.emoji}</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{src.label}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Continuous stream</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', fontFamily: 'var(--display-font)' }}>
              Adjust Data Volume Stream
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="0.5"
                value={streamSpeed}
                onChange={(e) => setStreamSpeed(parseFloat(e.target.value))}
                style={{ 
                  flex: 1, 
                  accentColor: 'var(--accent)', 
                  height: '6px', 
                  borderRadius: '3px',
                  cursor: 'pointer' 
                }}
              />
              <span style={{ fontFamily: 'var(--display-font)', fontWeight: 600, minWidth: '40px', color: 'var(--accent)' }}>
                {streamSpeed * 10} Gbps
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Status: <strong style={{ color: currentLoadText().color }}>{currentLoadText().text}</strong></span>
              <span style={{ color: 'var(--text-secondary)' }}>Backlog Queue: <strong style={{ color: bottleneckQueue > 15 ? 'var(--danger)' : 'var(--text-primary)' }}>{Math.round(bottleneckQueue)} items</strong></span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Bottleneck Flow Simulation */}
        <div 
          className="glass-card" 
          ref={containerRef}
          style={{ 
            position: 'relative', 
            overflow: 'hidden', 
            background: 'radial-gradient(ellipse at bottom, rgba(10, 20, 36, 0.9) 0%, #020617 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem',
            border: '2px solid var(--card-border)',
          }}
        >
          {/* Faint Background World Map Outline */}
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.08,
              top: 0,
              left: 0,
              pointerEvents: 'none',
              background: 'radial-gradient(circle, var(--text-secondary) 1px, transparent 1px) 0 0/20px 20px',
            }}
          />

          <div style={{ zIndex: 10, textAlign: 'center', width: '100%' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Sources flow into diplomatic workflow
            </span>
          </div>

          {/* Funnel Overlay & Animated Particles scaled using viewBox */}
          <svg 
            viewBox="0 0 960 680" 
            style={{ 
              position: 'absolute', 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none', 
              zIndex: 5, 
              top: 0, 
              left: 0 
            }}
          >
            {/* Upper Funnel Boundaries */}
            <path d="M 20 80 Q 250 180 380 480" stroke="var(--card-border)" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M 940 80 Q 710 180 580 480" stroke="var(--card-border)" strokeWidth="1" fill="none" opacity="0.3" />
            
            {/* Funnel neck brackets */}
            <path d="M 380 480 L 380 620 L 410 650 L 550 650 L 580 620 L 580 480 Z" stroke="var(--card-border)" strokeWidth="2.5" fill="rgba(255, 255, 255, 0.02)" />

            {/* Falling Docs - mapped to 960x680 coordinate space */}
            {docs.map((doc) => (
              <text
                key={doc.id}
                x={doc.x * 9.6}
                y={doc.y * 6.8}
                fontSize="24"
                textAnchor="middle"
                alignmentBaseline="middle"
                opacity={doc.y > 70 ? 0.3 : 1}
                style={{ transition: 'opacity 0.2s', fill: 'var(--text-primary)' }}
              >
                {doc.emoji}
              </text>
            ))}
          </svg>

          {/* Funnel Neck Box labels */}
          <div 
            style={{
              marginTop: '190px', // Center of funnel height
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.2rem',
              width: '280px',
            }}
          >
            {/* Stage 1: Fragmented Info */}
            <div 
              style={{ 
                background: 'rgba(15, 23, 42, 0.9)', 
                border: '1px solid var(--card-border)', 
                borderRadius: '8px', 
                padding: '0.5rem 1rem', 
                textAlign: 'center', 
                width: '100%',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CONGESTION POINT</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Fragmented Information</div>
            </div>

            {/* Stage 2: Manual Research Bottleneck */}
            <div 
              style={{ 
                background: bottleneckQueue > 15 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(217, 119, 6, 0.15)', 
                border: bottleneckQueue > 15 ? '2px solid var(--danger)' : '2px solid var(--accent)', 
                borderRadius: '10px', 
                padding: '0.8rem 1rem', 
                textAlign: 'center', 
                width: '100%',
                boxShadow: bottleneckQueue > 15 ? '0 0 20px rgba(239, 68, 68, 0.3)' : '0 0 15px rgba(217, 119, 6, 0.2)',
                animation: bottleneckQueue > 15 ? 'pulse 1.5s infinite' : 'none',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>HUMAN PIPELINE LIMIT</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Manual Research</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '0.2rem' }}>Processing Capacity: ~3 files/hr</div>
            </div>

            {/* Stage 3: Slow Decisions */}
            <div 
              style={{ 
                background: 'rgba(2, 6, 17, 0.95)', 
                border: '1px dashed var(--danger)', 
                borderRadius: '8px', 
                padding: '0.5rem 1rem', 
                textAlign: 'center', 
                width: '100%',
                color: 'var(--danger)',
              }}
            >
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>DANGER STATE</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>Slow Decisions ({getDelayTime()} Days)</div>
            </div>
          </div>

          <div style={{ zIndex: 10, textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Funnel shows how scaling intelligence stream causes a bottleneck in human search.
          </div>
        </div>
      </div>
    </div>
  );
};
