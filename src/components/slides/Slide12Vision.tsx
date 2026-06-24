import React, { useState } from 'react';
import { Globe, Award, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface OrbitAgent {
  name: string;
  emoji: string;
  role: string;
  angle: number;
}

export const Slide12Vision: React.FC<SlideProps> = ({ active }) => {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const steps = [
    { label: "Search Engine", desc: "Simple database keyword matches." },
    { label: "Institutional Memory", desc: "Linked databases of historical precedents." },
    { label: "Negotiation Copilot", desc: "Recommends clauses and checks compliance." },
    { label: "Strategic Platform", desc: "Simulates game-theory outcomes in real-time." },
    { label: "Operating System", desc: "Integrated multi-agent stack for diplomacy." }
  ];

  const orbitingAgents: OrbitAgent[] = [
    { name: "Intelligence", emoji: "👁️", role: "Continuous Ingest & Alerts", angle: 0 },
    { name: "Treaty Agent", emoji: "📜", role: "Precedent Analysis", angle: 51 },
    { name: "Clause Agent", emoji: "⚖️", role: "Legal Terms Analysis", angle: 102 },
    { name: "Negotiation", emoji: "🤝", role: "Proposals & Options", angle: 153 },
    { name: "Scenario Agent", emoji: "🔮", role: "Impact Simulation", angle: 204 },
    { name: "Translation", emoji: "🌍", role: "Legal Translation", angle: 255 },
    { name: "Human Expert", emoji: "👤", role: "Final Veto Control", angle: 306 }
  ];

  const getAgentCoords = (angle: number, radius = 135) => {
    // Offset by 90deg to start top
    const radian = ((angle - 90) * Math.PI) / 180;
    const x = 200 + radius * Math.cos(radian);
    const y = 200 + radius * Math.sin(radian);
    return { x, y };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Sparkles size={14} style={{ marginRight: '0.4rem' }} /> Geopolitical Vision
        </div>
        <h2 className="slide-title">The Future of Diplomacy is <span>Agentic</span></h2>
        <p className="slide-subtitle">Transitioning sovereign statecraft from siloed searches to coordinated strategic intelligence</p>
      </div>

      {/* Main Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left Side: Progression Steps Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
          
          <div className="glass-card" style={{ padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.2rem', fontFamily: 'var(--display-font)' }}>
              Evolutionary Path
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {steps.map((st, idx) => {
                const isCurrent = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--card-border)',
                      background: isCurrent ? 'var(--btn-hover)' : 'rgba(255, 255, 255, 0.01)',
                      borderColor: isCurrent ? 'var(--accent)' : 'var(--card-border)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="interactive-source-item"
                  >
                    <div style={{
                      color: isCurrent ? 'var(--accent)' : isPassed ? 'var(--success)' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center'
                    }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isCurrent ? 'var(--accent)' : 'var(--text-primary)' }}>
                        {st.label}
                      </span>
                      {isCurrent && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem', animation: 'slideEnterRight 0.2s' }}>
                          {st.desc}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Globe with orbiting nodes */}
        <div 
          className="glass-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '1.5rem',
            background: 'radial-gradient(circle at center, rgba(10, 20, 36, 0.7) 0%, #020617 100%)',
            position: 'relative',
            border: '2px solid var(--card-border)'
          }}
        >
          {/* Globe Canvas Container */}
          <div style={{ width: '400px', height: '400px', position: 'relative' }}>
            
            <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
              
              {/* Draw Orbit Path Ring */}
              <circle cx="200" cy="200" r="135" fill="none" stroke="var(--card-border)" strokeWidth="1" strokeDasharray="4, 4" opacity="0.4" />
              
              {/* Draw Data Beams to Center */}
              {orbitingAgents.map((ag) => {
                const coords = getAgentCoords(ag.angle);
                const isHovered = hoveredAgent === ag.name;
                
                if (isHovered) {
                  return (
                    <line
                      key={`beam-${ag.name}`}
                      x1="200" y1="200"
                      x2={coords.x} y2={coords.y}
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      className="flow-line-active"
                    />
                  );
                }
                return (
                  <line
                    key={`beam-idle-${ag.name}`}
                    x1="200" y1="200"
                    x2={coords.x} y2={coords.y}
                    stroke="var(--card-border)"
                    strokeWidth="1"
                    opacity="0.15"
                  />
                );
              })}

              {/* Wireframe Spinning Globe (represented visually in SVG) */}
              <g transform="translate(200, 200)">
                {/* Globe outer boundaries */}
                <circle r="65" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.75" className="animate-pulse-node" />
                
                {/* Rotating vertical ellipses */}
                <ellipse rx="65" ry="30" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" className="animate-spin-slow" />
                <ellipse rx="30" ry="65" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" className="animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                
                {/* Horizontal grid line */}
                <line x1="-65" y1="0" x2="65" y2="0" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
                <line x1="0" y1="-65" x2="0" y2="65" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
              </g>

              {/* Agent Orbit Nodes */}
              {orbitingAgents.map((ag) => {
                const coords = getAgentCoords(ag.angle);
                const isHovered = hoveredAgent === ag.name;

                return (
                  <g
                    key={ag.name}
                    transform={`translate(${coords.x}, ${coords.y})`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredAgent(ag.name)}
                    onMouseLeave={() => setHoveredAgent(null)}
                  >
                    <circle
                      r="18"
                      fill={isHovered ? 'var(--accent)' : 'var(--bg-secondary)'}
                      stroke={isHovered ? '#fff' : 'var(--card-border)'}
                      strokeWidth={isHovered ? 2 : 1}
                      style={{ transition: 'all 0.2s' }}
                    />
                    <text textAnchor="middle" y="5" style={{ fontSize: '1rem', userSelect: 'none' }}>
                      {ag.emoji}
                    </text>
                    {isHovered && (
                      <g transform="translate(0, -25)">
                        <rect x="-55" y="-12" width="110" height="18" rx="4" fill="var(--bg-secondary)" stroke="var(--card-border)" strokeWidth="1" />
                        <text textAnchor="middle" fill="var(--accent)" style={{ fontSize: '0.58rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}>
                          {ag.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central overlay text info */}
            <div 
              style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                textAlign: 'center', 
                pointerEvents: 'none',
                width: '120px'
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--display-font)', color: '#fff', textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                DIPLO.AI
              </h3>
            </div>

          </div>

          {/* Tagline footer block */}
          <div style={{ textAlign: 'center', marginTop: '1rem', zIndex: 10 }}>
            <h4 style={{ fontFamily: 'var(--display-font)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              DIPLO.AI
            </h4>
            <p style={{ fontFamily: 'var(--serif-font)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Institutional Memory for Modern Diplomacy
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
