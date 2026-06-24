import React, { useState } from 'react';
import { Network, Search, AlertCircle, Compass, HelpCircle, FileCheck, Layers } from 'lucide-react';

interface SlideProps {
  active: boolean;
}

interface HexAgent {
  id: string;
  name: string;
  emoji: string;
  shortDesc: string;
  skills: string[];
  input: string;
  output: string;
  x: number;
  y: number;
}

export const Slide6Ecosystem: React.FC<SlideProps> = ({ active }) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('treaty');

  const hexAgents: HexAgent[] = [
    {
      id: 'monitoring',
      name: 'Monitoring Agent',
      emoji: '👁️',
      shortDesc: 'Daily intelligence tracking and geopolitical briefings.',
      skills: ['RSS Feed ingestion', 'News classification', 'Anomalous event signaling'],
      input: 'Public news streams, RSS alerts',
      output: 'Geopolitical alert signals, daily brief reports',
      x: 350, y: 80
    },
    {
      id: 'treaty',
      name: 'Treaty Agent',
      emoji: '📜',
      shortDesc: 'Analyzes precedents and historical agreements.',
      skills: ['Corpus search matching', 'Parallel structural analysis', 'Precedent mapping'],
      input: 'Draft treaty PDFs, treaty index databases',
      output: 'Precedent compliance logs, structural overlaps',
      x: 480, y: 155
    },
    {
      id: 'clause',
      name: 'Clause Agent',
      emoji: '⚖️',
      shortDesc: 'Drills down into exact contract terms and clauses.',
      skills: ['Legal syntax extraction', 'Obligation categorization', 'Liability isolation'],
      input: 'Specific section text blocks',
      output: 'Isolated obligations list, risk-factor markings',
      x: 480, y: 305
    },
    {
      id: 'negotiation',
      name: 'Negotiation Agent',
      emoji: '🤝',
      shortDesc: 'Provides strategic options and recommendations.',
      skills: ['Bilateral position modeling', 'Target goal alignments', 'Compromise drafting'],
      input: 'Geopolitical stances, counterpart text draft',
      output: 'Counter-proposal phrasing, win-win suggestions',
      x: 350, y: 230 // Center hexagon
    },
    {
      id: 'scenario',
      name: 'Scenario Agent',
      emoji: '🔮',
      shortDesc: 'Runs impact simulations and game-theory outcomes.',
      skills: ['Predictive risk modeling', 'Sanction vector forecasts', 'Coalition stress tests'],
      input: 'Clause draft revisions, country stance metrics',
      output: 'Game-theory probability charts, supply chain maps',
      x: 350, y: 380
    },
    {
      id: 'translation',
      name: 'Translation Agent',
      emoji: '🌍',
      shortDesc: 'Preserves legal nuances in multilingual documents.',
      skills: ['80+ language translations', 'Diplomatic phrase maps', 'Dual-language cross audits'],
      input: 'Multi-lingual source texts',
      output: 'Aligned legal translations, phrase deviation flags',
      x: 220, y: 305
    },
    {
      id: 'redteam',
      name: 'Red-Team Agent',
      emoji: '🛡️',
      shortDesc: 'Challenges assumptions and tests tactical vulnerabilities.',
      skills: ['Adversarial exploit scans', 'Blind-spot projections', 'Sovereignty threat flags'],
      input: 'Consolidated negotiation files',
      output: 'Toxic clause warnings, loop-hole alert reviews',
      x: 220, y: 155
    }
  ];

  const currentAgent = hexAgents.find(a => a.id === selectedAgent) || hexAgents[3];

  // Helper to generate SVG hexagon path given center (x, y) and radius r
  const getHexPath = (x: number, y: number, r = 68) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - (Math.PI / 6); // offset by 30 deg
      points.push(`${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div>
        <div className="badge">
          <Network size={14} style={{ marginRight: '0.4rem' }} /> Agent Ecosystem
        </div>
        <h2 className="slide-title">Agentic <span>Ecosystem</span></h2>
        <p className="slide-subtitle">Specialized AI systems coordinating tasks to form a comprehensive diplomatic platform</p>
      </div>

      {/* Grid */}
      <div className="grid-2" style={{ flex: 1, maxHeight: '550px', alignItems: 'stretch' }}>
        
        {/* Left Side: SVG Hexagonal Honeycomb Diagram */}
        <div 
          className="glass-card" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '1rem',
            background: 'rgba(10, 20, 36, 0.4)',
            position: 'relative'
          }}
        >
          <svg viewBox="100 0 500 460" style={{ width: '100%', height: '100%' }}>
            
            {/* Draw network web connecting centers of adjacent hexes */}
            {hexAgents.map((a1, idx) => {
              return hexAgents.slice(idx + 1).map((a2) => {
                const dx = a1.x - a2.x;
                const dy = a1.y - a2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Draw connecting lines between adjacent hexes (dist ≈ 150)
                if (dist < 160) {
                  const isLineActive = selectedAgent === a1.id || selectedAgent === a2.id;
                  return (
                    <line
                      key={`link-${a1.id}-${a2.id}`}
                      x1={a1.x} y1={a1.y}
                      x2={a2.x} y2={a2.y}
                      stroke={isLineActive ? 'var(--accent)' : 'var(--card-border)'}
                      strokeWidth={isLineActive ? 2 : 1}
                      opacity={isLineActive ? 0.7 : 0.25}
                      style={{ transition: 'all 0.3s' }}
                    />
                  );
                }
                return null;
              });
            })}

            {/* Draw Hexagons */}
            {hexAgents.map((agent) => {
              const isSelected = selectedAgent === agent.id;
              
              return (
                <g 
                  key={agent.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  {/* Hexagon Shape */}
                  <path
                    d={getHexPath(agent.x, agent.y)}
                    fill={isSelected ? 'var(--accent)' : 'var(--bg-secondary)'}
                    stroke={isSelected ? '#fff' : 'var(--card-border)'}
                    strokeWidth={isSelected ? 3.5 : 1.5}
                    style={{ transition: 'all 0.3s' }}
                    className={isSelected ? "animate-pulse-node" : "node-circle"}
                  />
                  {/* Hexagon Text */}
                  <text
                    x={agent.x}
                    y={agent.y - 12}
                    textAnchor="middle"
                    style={{ fontSize: '2rem', userSelect: 'none' }}
                  >
                    {agent.emoji}
                  </text>
                  <text
                    x={agent.x}
                    y={agent.y + 15}
                    textAnchor="middle"
                    fill={isSelected ? '#fff' : 'var(--text-primary)'}
                    style={{ fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--display-font)' }}
                  >
                    {agent.name.split(' ')[0]}
                  </text>
                  <text
                    x={agent.x}
                    y={agent.y + 26}
                    textAnchor="middle"
                    fill={isSelected ? '#fff' : 'var(--accent)'}
                    style={{ fontSize: '0.58rem', fontWeight: 600, opacity: isSelected ? 0.9 : 1 }}
                  >
                    {agent.name.split(' ')[1]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Side: Agent Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
              <div 
                style={{ 
                  fontSize: '2.5rem', 
                  background: 'var(--btn-bg)', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--card-border)'
                }}
              >
                {currentAgent.emoji}
              </div>
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontFamily: 'var(--display-font)' }}>
                  {currentAgent.name}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                  Agent Identity: {currentAgent.id.toUpperCase()}_NODE
                </span>
              </div>
            </div>
            
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.2rem' }}>
              {currentAgent.shortDesc}
            </p>

            {/* Inputs & Outputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem', borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>Subscribed Inputs</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{currentAgent.input}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase' }}>Generated Outputs</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{currentAgent.output}</div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Operational Skills
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {currentAgent.skills.map((skill, index) => (
                  <div key={index} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)' }} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="glass-card" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Compass size={20} style={{ color: 'var(--accent)' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Hex communication layout maintains data mesh efficiency.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
